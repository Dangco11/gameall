import * as THREE from 'three';
import { BASES, FIELD, HOUSE_HALF, LaneManager } from '../battle/LaneManager.ts';
import type { LaneId } from '../types.ts';

// CameraController: năm chế độ
//   auto      đạo diễn (mặc định): bám chỗ đang đánh nhau, khung đủ rộng để thấy cả trận địa quanh đó,
//             thỉnh thoảng lùi ra toàn cảnh vài giây; voi xuất hiện thì zoom vào voi
//   overview  toàn cảnh: tự tính khoảng cách để trọn ba làn và hai căn cứ nằm gọn trong vùng không bị bảng điểm che
//   lane      trọn một làn từ cổng này sang cổng kia
//   combat    sát chỗ đánh nhau đông nhất
//   boss      voi chiến xuất hiện: zoom vào voi 2,6 giây rồi trả về chế độ trước
// Chuột: con lăn chỉnh góc nghiêng, Ctrl/Shift + con lăn để phóng to, kéo trái để di chuyển, kéo phải để xoay.
// Phím: mũi tên đẩy camera trái/phải/lên/xuống (giữ để chạy liên tục), PageUp/PageDown nghiêng, +/− phóng to, Q/E xoay.
// Điện thoại: hai ngón để phóng to và di chuyển; trang điều khiển có cụm nút camera nhấn giữ.
// Mọi góc xoay và khoảng cách đều có giới hạn; bấm đúp hoặc nút Reset để về chế độ đạo diễn.
export type CamMode = 'auto' | 'overview' | 'lane' | 'combat' | 'boss';
export type CamHold = 'left' | 'right' | 'up' | 'down' | 'tiltUp' | 'tiltDown' | 'zoomIn' | 'zoomOut' | 'rotL' | 'rotR';
export interface SafeRect { x0: number; x1: number; y0: number; y1: number }   // NDC, vùng màn hình không bị UI che

const LIM = { pitchMin: 0.3, pitchMax: 1.38, yawMax: 1.1, distMin: 6, distMax: 260 };
const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const FIT_POINTS = [
  v3(FIELD.minX + 1, 0, FIELD.minZ), v3(FIELD.maxX - 1, 0, FIELD.minZ), v3(FIELD.minX + 1, 0, FIELD.maxZ - 1), v3(FIELD.maxX - 1, 0, FIELD.maxZ - 1),
  // nhà chính hai bên: mép ngoài sát đất và nóc mái
  v3(BASES.trai.house.x - HOUSE_HALF, 0, BASES.trai.house.z), v3(BASES.gai.house.x + HOUSE_HALF, 0, BASES.gai.house.z),
  v3(BASES.trai.house.x, 5.2, BASES.trai.house.z), v3(BASES.gai.house.x, 5.2, BASES.gai.house.z),
];
const lanePoints = (l: LaneId) => LaneManager.path(l).flatMap(p => [v3(p.x, 0, p.z - 2.5), v3(p.x, 0, p.z + 2.5)]);

export class CameraController {
  readonly cam: THREE.PerspectiveCamera;
  mode: CamMode = 'auto';
  lane: LaneId = 0;
  manual = false;                     // người dùng đã tự kéo, zoom: không tự điều khiển nữa cho tới khi Reset
  auto = false;                       // chế độ tổng quan: thỉnh thoảng ghé chỗ giao tranh
  safe: SafeRect = { x0: -1, x1: 1, y0: -1, y1: 1 };
  shake = 0;
  // tư thế hiện tại và đích: điểm nhìn, góc ngẩng (pitch), góc ngang (yaw), khoảng cách
  private tgt = new THREE.Vector3(0, 0, 10); private pitch = 0.95; private yaw = 0; private dist = 60;
  private gTgt = new THREE.Vector3(0, 0, 10); private gPitch = 0.95; private gYaw = 0; private gDist = 60;
  private fits = new Map<string, { tgt: THREE.Vector3; dist: number; pitch: number }>();
  private bossUntil = 0; private bossPos: () => THREE.Vector3 | null = () => null; private before: CamMode = 'auto';
  private combatAt = new THREE.Vector3(); private combatOk = false; private autoNext = 0; private autoUntil = 0;
  private focus = new THREE.Vector3(0, 0, 10); private focusW = 0; private wideUntil = 0; private wideNext = 45_000;
  private pointers = new Map<number, { x: number; y: number }>(); private drag: { btn: number } | null = null; private pinch = 0;
  private first = true;
  onManual: () => void = () => {};

  constructor(cam: THREE.PerspectiveCamera, el: HTMLElement){
    this.cam = cam;
    // con lăn: chỉnh góc nghiêng; giữ Ctrl hoặc Shift thì phóng to, thu nhỏ
    el.addEventListener('wheel', e => { e.preventDefault(); if (e.ctrlKey || e.shiftKey) this.zoom(Math.exp((e.deltaY || e.deltaX) * 0.0012)); else this.tilt(e.deltaY * 0.0012); }, { passive: false });
    el.addEventListener('contextmenu', e => e.preventDefault());
    el.addEventListener('dblclick', () => this.reset());
    el.addEventListener('pointerdown', e => { el.setPointerCapture(e.pointerId); this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }); this.drag = { btn: e.shiftKey ? 2 : e.button }; this.pinch = 0; });
    el.addEventListener('pointermove', e => {
      const p = this.pointers.get(e.pointerId); if (!p) return;
      const prev = { ...p }; p.x = e.clientX; p.y = e.clientY;
      if (this.pointers.size >= 2){
        const [a, b] = [...this.pointers.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (this.pinch) this.zoom(this.pinch / Math.max(1, d));
        this.pinch = d;
        this.pan((p.x - prev.x) / 2, (p.y - prev.y) / 2);
        return;
      }
      if (!this.drag) return;
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      if (this.drag.btn === 2) this.rotate(dx, dy); else this.pan(dx, dy);
    });
    const up = (e: PointerEvent) => { this.pointers.delete(e.pointerId); if (!this.pointers.size) this.drag = null; this.pinch = 0; };
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  }

  // Hướng nhìn gốc: màn dọc 9:16 xoay camera 90 độ để sân dài nằm dọc, Nhà Trai ở trên, Nhà Gái ở dưới.
  // Màn ngang giữ như cũ: Nhà Trai bên trái, Nhà Gái bên phải.
  get base(){ return this.cam.aspect < 0.8 ? Math.PI / 2 : 0; }
  private takeOver(){ if (!this.manual){ this.manual = true; this.onManual(); } if (this.mode === 'boss') this.mode = this.before; }
  zoom(k: number){ this.takeOver(); this.gDist = clamp(this.gDist * k, LIM.distMin, LIM.distMax); }
  pan(dx: number, dy: number){
    this.takeOver();
    const s = this.gDist * Math.tan(THREE.MathUtils.degToRad(this.cam.fov / 2)) * 2 / (typeof innerHeight === 'number' ? innerHeight : 900);
    const right = v3(Math.cos(this.gYaw), 0, -Math.sin(this.gYaw)), fwd = v3(-Math.sin(this.gYaw), 0, -Math.cos(this.gYaw));
    this.gTgt.addScaledVector(right, -dx * s).addScaledVector(fwd, dy * s / Math.max(0.4, Math.sin(this.gPitch)));
    this.gTgt.x = clamp(this.gTgt.x, FIELD.minX - 30, FIELD.maxX + 30); this.gTgt.z = clamp(this.gTgt.z, FIELD.minZ - 30, FIELD.maxZ + 40);
  }
  // nghiêng camera: dương là cúi nhìn xuống nhiều hơn
  tilt(d: number){ this.takeOver(); this.gPitch = clamp(this.gPitch + d, LIM.pitchMin, LIM.pitchMax); }
  // giữ phím / nút để camera chạy liên tục: left right up down (đẩy), tiltUp tiltDown, zoomIn zoomOut, rotL rotR
  private held = new Set<CamHold>();
  hold(k: CamHold, on: boolean){ if (on){ this.held.add(k); this.takeOver(); } else this.held.delete(k); }
  private applyHeld(dt: number){
    if (!this.held.size) return;
    const H = this.held, px = 900 * dt;                          // tốc độ đẩy tính theo điểm ảnh màn hình mỗi giây
    const dx = (H.has('right') ? 1 : 0) - (H.has('left') ? 1 : 0), dy = (H.has('down') ? 1 : 0) - (H.has('up') ? 1 : 0);
    if (dx || dy) this.pan(-dx * px, -dy * px);
    if (H.has('tiltUp')) this.tilt(-0.9 * dt); if (H.has('tiltDown')) this.tilt(0.9 * dt);
    if (H.has('zoomIn')) this.zoom(Math.exp(-1.2 * dt)); if (H.has('zoomOut')) this.zoom(Math.exp(1.2 * dt));
    if (H.has('rotL')) this.rotate(-260 * dt, 0); if (H.has('rotR')) this.rotate(260 * dt, 0);
  }
  rotate(dx: number, dy: number){ this.takeOver(); this.gYaw = clamp(this.gYaw - dx * 0.005, this.base - LIM.yawMax, this.base + LIM.yawMax); this.gPitch = clamp(this.gPitch + dy * 0.004, LIM.pitchMin, LIM.pitchMax); }
  reset(){ this.manual = false; this.mode = 'auto'; this.gYaw = this.base; this.onManual(); }
  // đặt camera cố định nhìn vào (x, z) từ khoảng cách d (tham số ?look=x,z,d)
  fixAt(x: number, z: number, d: number, pitch = 0.6){ this.manual = true; this.gTgt.set(x, 0, z); this.gDist = clamp(d, LIM.distMin, LIM.distMax); this.gPitch = clamp(pitch, LIM.pitchMin, LIM.pitchMax); this.gYaw = this.base; }
  setMode(m: CamMode, lane?: LaneId){ this.manual = false; this.mode = m; if (lane !== undefined) this.lane = lane; this.gYaw = this.base; this.onManual(); }

  // Voi chiến xuất hiện: zoom vào 2,6 giây (người dùng đang tự điều khiển thì không giành camera)
  boss(pos: () => THREE.Vector3 | null, ms = 2600){
    if (this.manual) return;
    if (this.mode !== 'boss') this.before = this.mode;
    this.mode = 'boss'; this.bossPos = pos; this.bossUntil = performance.now() + ms;
  }
  setCombat(p: THREE.Vector3 | null){ this.combatOk = !!p; if (p) this.combatAt.copy(p); }
  // Đạo diễn: điểm cần xem và bề ngang cần thấy (m); width 0 là không có gì đáng xem, quay toàn cảnh
  setFocus(p: THREE.Vector3, width: number){ this.focus.copy(p); this.focusW = width; }

  // Tìm khoảng cách và điểm nhìn để mọi điểm nằm gọn trong vùng an toàn (lặp vài lần, hội tụ nhanh)
  private fit(points: THREE.Vector3[], pitch: number, start: THREE.Vector3, d0: number){
    const tgt = start.clone(); let d = d0;
    const c = this.cam, v = new THREE.Vector3(), half = Math.tan(THREE.MathUtils.degToRad(c.fov / 2));
    const sw = this.safe.x1 - this.safe.x0, sh = this.safe.y1 - this.safe.y0, cx = (this.safe.x0 + this.safe.x1) / 2, cy = (this.safe.y0 + this.safe.y1) / 2;
    for (let it = 0; it < 18; it++){
      const yaw = this.base, rx = Math.cos(yaw), rz = -Math.sin(yaw), fx = -Math.sin(yaw), fz = -Math.cos(yaw);
      this.place(tgt, pitch, yaw, d);
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, behind = false;
      for (const p of points){ v.copy(p).project(c); if (v.z > 1) behind = true; x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x); y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y); }
      if (behind){ d *= 1.3; continue; }
      const f = Math.max((x1 - x0) / sw, (y1 - y0) / sh);
      const ex = ((x0 + x1) / 2 - cx) * d * half * c.aspect * 0.8, ey = ((y0 + y1) / 2 - cy) * d * half / Math.max(0.3, Math.sin(pitch)) * 0.8;
      tgt.x += rx * ex + fx * ey; tgt.z += rz * ex + fz * ey;
      d = clamp(d * Math.pow(f, 0.85), LIM.distMin, LIM.distMax);
    }
    return { tgt, d };
  }
  private place(tgt: THREE.Vector3, pitch: number, yaw: number, d: number){
    const c = this.cam;
    c.position.set(tgt.x + Math.sin(yaw) * Math.cos(pitch) * d, tgt.y + Math.sin(pitch) * d, tgt.z + Math.cos(yaw) * Math.cos(pitch) * d);
    c.lookAt(tgt); c.updateMatrixWorld(); c.updateProjectionMatrix();
  }
  private fitted(name: string, points: THREE.Vector3[], pitch: number){
    const key = `${name}|${this.cam.aspect.toFixed(3)}|${Object.values(this.safe).map(v => v.toFixed(2)).join(',')}`;
    let f = this.fits.get(key);
    if (!f){ const r = this.fit(points, pitch, v3(0, 0, 10), 80); f = { tgt: r.tgt, dist: r.d, pitch }; this.fits.set(key, f); if (this.fits.size > 40) this.fits.delete(this.fits.keys().next().value as string); }
    return f;
  }
  // Khung toàn cảnh (tính lại khi đổi kích thước màn hình hoặc vùng UI thay đổi)
  overview(){ return this.fitted('ov', FIT_POINTS, this.cam.aspect < 0.8 ? 1.12 : 0.86); }

  update(dt: number, now: number){
    this.applyHeld(dt);
    const portrait = this.cam.aspect < 0.8;
    if (this.mode === 'boss' && now > this.bossUntil) this.mode = this.before;
    if (this.auto && !this.manual && this.mode === 'overview' && this.combatOk && now > this.autoNext){ this.mode = 'combat'; this.autoUntil = now + 5000; this.autoNext = now + 20_000; }
    if (this.auto && this.mode === 'combat' && now > this.autoUntil && !this.manual) this.mode = 'overview';
    const ov = this.overview();
    const pitchA = portrait ? 0.98 : 0.82;
    if (!this.manual){
      switch (this.mode){
        case 'overview': this.gTgt.copy(ov.tgt); this.gDist = ov.dist; this.gPitch = ov.pitch; this.gYaw = this.base; break;
        case 'auto': {
          // cứ 45 giây lùi ra toàn cảnh 6 giây; không có gì đáng xem (đang tập hợp, sân trống) thì xem toàn cảnh
          if (now > this.wideNext){ this.wideUntil = now + 6000; this.wideNext = now + 45_000; }
          if (portrait || now < this.wideUntil || this.focusW <= 0){   // màn dọc: luôn thấy cả hai căn cứ (Trai trên, Gái dưới)
            this.gTgt.copy(ov.tgt); this.gDist = ov.dist; this.gPitch = ov.pitch; this.gYaw = this.base; break; }
          const hfov = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(this.cam.fov / 2)) * this.cam.aspect);
          const w = clamp(this.focusW, portrait ? 30 : 48, 200), vspan = Math.tan(THREE.MathUtils.degToRad(this.cam.fov / 2)) * ((this.safe.y1 - this.safe.y0) / 2) / Math.max(0.3, Math.sin(pitchA));
          const d = Math.min(ov.dist, portrait ? w / 2 / vspan * 1.08 : w / 2 / Math.tan(hfov / 2) * 1.08);
          // đẩy điểm nhìn lên phía trên một chút cho trận địa nằm giữa vùng an toàn (bảng điểm ở trên)
          const lift = ((this.safe.y0 + this.safe.y1) / 2) * d * Math.tan(THREE.MathUtils.degToRad(this.cam.fov / 2)) / Math.max(0.3, Math.sin(pitchA));
          const fy = this.base;
          this.gTgt.set(clamp(this.focus.x, FIELD.minX + w * 0.35, FIELD.maxX - w * 0.35) + Math.sin(fy) * lift, 0, this.focus.z + Math.cos(fy) * lift);
          this.gDist = d; this.gPitch = pitchA; this.gYaw = this.base;
          break;
        }
        case 'lane': { const f = this.fitted('lane' + this.lane, lanePoints(this.lane), portrait ? 0.95 : 0.8); this.gTgt.copy(f.tgt); this.gDist = f.dist; this.gPitch = f.pitch; this.gYaw = this.base; break; }
        case 'combat': if (this.combatOk){ this.gTgt.lerp(this.combatAt, Math.min(1, dt * 1.5)); this.gDist = portrait ? 26 : 20; this.gPitch = 0.82; this.gYaw = this.base; } else this.mode = this.auto ? 'overview' : 'auto'; break;
        case 'boss': { const p = this.bossPos(); if (p){ this.gTgt.set(p.x, 1.6, p.z); this.gDist = portrait ? 18 : 14; this.gPitch = 0.55; this.gYaw = this.base; } break; }
      }
    } else if (this.mode === 'boss'){ const p = this.bossPos(); if (p){ this.gTgt.set(p.x, 1.6, p.z); this.gDist = portrait ? 18 : 14; this.gPitch = 0.55; } }
    // khung hình đầu tiên: đặt thẳng vào vị trí, không trượt từ chỗ mặc định (màn LIVE mở lên là đúng khung ngay)
    const k = this.first ? 1 : 1 - Math.exp(-dt * (this.mode === 'boss' ? 3 : 1.6));
    this.first = false;
    this.tgt.lerp(this.gTgt, k); this.dist += (this.gDist - this.dist) * k; this.pitch += (this.gPitch - this.pitch) * k; this.yaw += (this.gYaw - this.yaw) * k;
    this.place(this.tgt, this.pitch, this.yaw, this.dist);
    if (this.shake > 0){
      this.shake = Math.max(0, this.shake - dt * 1.6);
      const s = this.shake * this.shake * 0.6;
      this.cam.position.x += (Math.random() - 0.5) * s; this.cam.position.y += (Math.random() - 0.5) * s;
      this.cam.updateMatrixWorld();
    }
  }
  get distance(){ return this.dist; }
  get target(){ return this.tgt; }
}
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
