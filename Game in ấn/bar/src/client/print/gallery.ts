import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { templateOf, tierOf } from '../../shared/print.ts';
import type { PrintRecord, PrintState, TopRow } from '../../shared/types.ts';
import { ART_H, artData, avatarImage, renderFlat } from './art.ts';
import { M } from './mats.ts';
import { panels, softDot, wood } from './tex.ts';
import { loadDecor } from '../rig/glb.ts';

// Phòng trưng bày quanh máy in: tường sau treo 12 bản in mới nhất trong khung đúc có kính và đèn rọi tranh,
// chính giữa là khung lớn đặt bản in đẹp nhất của người TOP 1 tháng. Tường trái: bảng TOP người tặng quà.
// Tường phải: bảng TOP sản phẩm hiếm và tủ kính trên bục đá trưng bày 5 bản hiếm nhất.
export const ROOM = { x0: -5.2, x1: 5.2, z0: -4.4, z1: 6, h: 4.2 };
const ASPECT = 1000 / ART_H;

type Pose = { pos: THREE.Vector3; quat: THREE.Quaternion; w: number };
interface Slot { group: THREE.Group; pic: THREE.Mesh; frameMat: THREE.MeshPhysicalMaterial; n: number; key: string; pose: Pose; px: number; lamp?: THREE.MeshStandardMaterial }

const frameGeo = (w: number, h: number, b: number, d: number) => {
  const s = new THREE.Shape(); s.moveTo(-w / 2 - b, -h / 2 - b); s.lineTo(w / 2 + b, -h / 2 - b); s.lineTo(w / 2 + b, h / 2 + b); s.lineTo(-w / 2 - b, h / 2 + b); s.closePath();
  s.holes.push(new THREE.Path().moveTo(-w / 2, -h / 2).lineTo(-w / 2, h / 2).lineTo(w / 2, h / 2).lineTo(w / 2, -h / 2).closePath());
  return new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelSize: b * 0.35, bevelThickness: d * 0.6, bevelSegments: 3 });
};
const blankMat = () => new THREE.MeshStandardMaterial({ color: 0x15161a, roughness: 0.9 });
const FRAME_COL: Record<string, number> = { basic: 0x2a1c12, silver: 0xd0d6de, gold: 0xffc860, diamond: 0xe8f4ff, legend: 0xff9a40, vip: 0xffd0f0 };

export class Gallery {
  readonly group = new THREE.Group();
  readonly slots: Slot[] = [];
  readonly cases: Slot[] = [];
  hall!: Slot;
  /** bản in đang nằm trên máy / đang bay tới tường: chưa treo */
  readonly hold = new Set<number>();
  private boards: { tex: THREE.CanvasTexture; g: CanvasRenderingContext2D; key: string }[] = [];
  private queue: (() => Promise<void>)[] = []; private busy = false; private paused = true;
  private last: PrintState | null = null;
  private glows: THREE.MeshStandardMaterial[] = [];

  constructor(){
    this.room(); this.wall(); this.rightSide(); this.leftSide();
    void loadDecor().then(list => list.forEach((o, i) => { o.position.set(i % 2 ? 4.4 : -4.4, 0, 3.6 - Math.floor(i / 2) * 1.6); this.group.add(o); }));
  }

  private room(){
    const m = M(), g = this.group, W = ROOM.x1 - ROOM.x0, D = ROOM.z1 - ROOM.z0;
    // sàn gỗ ghép bóng (cùng tông gỗ ấm như phim mẫu), tường thạch cao xám than, trần tối có ray đèn
    const wtex = wood('floor', [120, 74, 42]).clone(); wtex.repeat.set(5, 6); wtex.needsUpdate = true;
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshPhysicalMaterial({ map: wtex, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.18 }));
    floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, (ROOM.z0 + ROOM.z1) / 2); floor.receiveShadow = true; g.add(floor);
    const wallTex = panels('gallery', '#2a2b30', '#1c1d21', 10).clone(); wallTex.repeat.set(4, 1); wallTex.needsUpdate = true;
    const wallMat = new THREE.MeshStandardMaterial({ map: wallTex, roughness: 0.85 });
    const wall = (w: number, x: number, z: number, ry: number) => { const o = new THREE.Mesh(new THREE.PlaneGeometry(w, ROOM.h), wallMat); o.position.set(x, ROOM.h / 2, z); o.rotation.y = ry; o.receiveShadow = true; g.add(o); };
    wall(W, 0, ROOM.z0, 0); wall(D, ROOM.x0, (ROOM.z0 + ROOM.z1) / 2, Math.PI / 2); wall(D, ROOM.x1, (ROOM.z0 + ROOM.z1) / 2, -Math.PI / 2); wall(W, 0, ROOM.z1, Math.PI);
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), new THREE.MeshStandardMaterial({ color: 0x0c0c0e, roughness: 0.95 }));
    ceil.rotation.x = Math.PI / 2; ceil.position.set(0, ROOM.h, (ROOM.z0 + ROOM.z1) / 2); g.add(ceil);
    // chân tường gỗ óc chó, viền đồng
    for (const [w, x, z, ry] of [[W, 0, ROOM.z0 + 0.01, 0], [D, ROOM.x0 + 0.01, (ROOM.z0 + ROOM.z1) / 2, Math.PI / 2], [D, ROOM.x1 - 0.01, (ROOM.z0 + ROOM.z1) / 2, -Math.PI / 2]] as const){
      const o = new THREE.Mesh(new RoundedBoxGeometry(w, 0.18, 0.03, 2, 0.01), m.walnut); o.position.set(x, 0.09, z); o.rotation.y = ry; g.add(o);
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.012, 0.035), m.brass); b.position.set(x, 0.185, z); b.rotation.y = ry; g.add(b);
    }
    // ray đèn trên trần với các đèn rọi trụ
    for (const z of [-3.2, 0, 3]){
      const rail = new THREE.Mesh(new THREE.BoxGeometry(8.6, 0.03, 0.05), m.matteBlack); rail.position.set(0, ROOM.h - 0.03, z); g.add(rail);
      for (let i = -4; i <= 4; i++){
        const can = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.16, 20), m.matteBlack); can.position.set(i * 0.95, ROOM.h - 0.14, z); can.rotation.x = z < 0 ? -0.5 : 0.35; g.add(can);
        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.045, 20), new THREE.MeshBasicMaterial({ color: 0xfff1d8 })); lens.position.set(0, -0.081, 0); lens.rotation.x = Math.PI / 2; can.add(lens);
      }
    }
  }

  // khung tranh: gỗ / nhũ kim loại theo bậc, viền giấy bồi trắng, kính chống loá, đèn rọi tranh bằng đồng phía trên
  private makeSlot(w: number, pos: THREE.Vector3, ry: number, px: number, lamp = true): Slot {
    const m = M(), group = new THREE.Group(), h = w / ASPECT;
    group.position.copy(pos); group.rotation.y = ry;
    const frameMat = new THREE.MeshPhysicalMaterial({ color: 0x2a1c12, metalness: 0.2, roughness: 0.35, clearcoat: 0.8 });
    const fr = new THREE.Mesh(frameGeo(w + 0.12, h + 0.12, 0.05, 0.035), frameMat); fr.castShadow = true; group.add(fr);
    const mat = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.12, h + 0.12), new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.9 })); mat.position.z = 0.012; group.add(mat);
    const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, h), blankMat()); pic.position.z = 0.016; group.add(pic);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.12, h + 0.12), m.glass); glass.position.z = 0.04; group.add(glass);
    let lampMat: THREE.MeshStandardMaterial | undefined;
    if (lamp){
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.2, 8), m.brass); arm.position.set(0, h / 2 + 0.16, 0.08); arm.rotation.x = 0.9; group.add(arm);
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, w * 0.7, 20).rotateZ(Math.PI / 2), m.brass); bar.position.set(0, h / 2 + 0.22, 0.16); group.add(bar);
      lampMat = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xffe4b8, emissiveIntensity: 2.5 });
      const strip = new THREE.Mesh(new THREE.BoxGeometry(w * 0.66, 0.004, 0.02), lampMat); strip.position.set(0, h / 2 + 0.198, 0.165); group.add(strip);
      // vệt sáng hắt từ đèn rọi xuống tranh (mặt phẳng cộng sáng)
      const cone = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.25, h * 0.95), new THREE.MeshBasicMaterial({ map: softDot(), color: 0xffe0b0, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false }));
      cone.position.set(0, h * 0.22, 0.05); group.add(cone);
    }
    this.group.add(group);
    group.updateMatrixWorld(true);
    const quat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0));
    return { group, pic, frameMat, n: 0, key: '', pose: { pos: pos.clone().add(new THREE.Vector3(0, 0, 0.02).applyQuaternion(quat)), quat, w }, px, lamp: lampMat };
  }

  private wall(){
    const z = ROOM.z0 + 0.04;
    this.hall = this.makeSlot(1.25, new THREE.Vector3(0, 2.05, z), 0, 768);
    // bảng tên đồng dưới khung TOP 1, ánh sáng riêng
    const plate = this.board(512, 96, new THREE.Vector3(0, 1.0, z + 0.02), 0, 0.9, 0.17);
    this.drawPlate(plate, 'TOP 1 · TÁC PHẨM TRUNG TÂM', '');
    const spot = new THREE.SpotLight(0xfff0d8, 26, 9, 0.38, 0.6, 1.2); spot.position.set(0, 3.9, z + 2.4); spot.target.position.set(0, 2.0, z); this.group.add(spot, spot.target);
    const cols = [1.45, 2.35, 3.25, 4.15].slice(0, 3);
    let i = 0;
    for (const row of [2.55, 1.45]) for (const cx of cols) for (const sx of [-1, 1]){
      const s = this.makeSlot(0.62, new THREE.Vector3(sx * cx, row, z), 0, 384); this.slots.push(s); i++;
    }
    // sắp theo khoảng cách tới giữa: bản mới nhất treo gần khung TOP 1 nhất
    this.slots.sort((a, b) => Math.abs(a.group.position.x) - Math.abs(b.group.position.x) || b.group.position.y - a.group.position.y);
    for (const sx of [-1, 1]){ const s = new THREE.SpotLight(0xffe8d0, 18, 9, 0.62, 0.7, 1.3); s.position.set(sx * 2.4, 3.9, z + 2.6); s.target.position.set(sx * 2.35, 2.0, z); this.group.add(s, s.target); }
    void i;
  }

  private rightSide(){
    const m = M(), x = ROOM.x1 - 0.04;
    this.board(1024, 640, new THREE.Vector3(x, 2.35, -1.2), -Math.PI / 2, 2.4, 1.5);
    // bục đá đen vân vàng, hộp kính, đế đèn LED: 5 bản in hiếm nhất đứng trên giá
    for (let i = 0; i < 5; i++){
      const pz = -3.3 + i * 1.25, px = 3.7;
      const ped = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.95, 0.62, 3, 0.02), m.marbleBlack); ped.position.set(px, 0.475, pz); ped.castShadow = ped.receiveShadow = true; this.group.add(ped);
      const ledMat = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xffd080, emissiveIntensity: 1.8 }); this.glows.push(ledMat);
      const ring = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.01, 0.6), ledMat); ring.position.set(px, 0.955, pz); this.group.add(ring);
      const box = new THREE.Mesh(new RoundedBoxGeometry(0.58, 0.72, 0.58, 2, 0.01), m.glass); box.position.set(px, 1.32, pz); this.group.add(box);
      const s = this.makeSlot(0.38, new THREE.Vector3(px, 1.3, pz), -Math.PI / 2 + 0.25, 384, false);
      s.group.rotation.x = -0.08;
      this.cases.push(s);
    }
    const sp = new THREE.SpotLight(0xfff0d8, 20, 10, 0.75, 0.6, 1.2); sp.position.set(2.2, 3.9, -0.8); sp.target.position.set(3.7, 1.0, -0.8); this.group.add(sp, sp.target);
  }
  private leftSide(){
    const x = ROOM.x0 + 0.04;
    this.board(1024, 640, new THREE.Vector3(x, 2.35, -1.2), Math.PI / 2, 2.4, 1.5);
    const sp = new THREE.SpotLight(0xd8e8ff, 14, 10, 0.7, 0.6, 1.2); sp.position.set(-2.4, 3.9, -1.2); sp.target.position.set(x, 2.3, -1.2); this.group.add(sp, sp.target);
  }

  // bảng điện tử: màn LED trong khung nhôm, chữ vẽ bằng canvas
  private board(w: number, h: number, pos: THREE.Vector3, ry: number, sw: number, sh: number){
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    const b = { tex, g: cv.getContext('2d')!, key: '' };
    const grp = new THREE.Group(); grp.position.copy(pos); grp.rotation.y = ry;
    const frame = new THREE.Mesh(new RoundedBoxGeometry(sw + 0.08, sh + 0.08, 0.06, 3, 0.02), M().darkSteel); frame.castShadow = true; grp.add(frame);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(sw, sh), new THREE.MeshStandardMaterial({ map: tex, emissiveMap: tex, emissive: 0xffffff, emissiveIntensity: 0.85, roughness: 0.25 }));
    scr.position.z = 0.032; grp.add(scr);
    this.group.add(grp);
    this.boards.push(b);
    return b;
  }
  private drawPlate(b: { tex: THREE.CanvasTexture; g: CanvasRenderingContext2D }, title: string, sub: string){
    const g = b.g, W = g.canvas.width, H = g.canvas.height;
    const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, '#6a4a16'); gr.addColorStop(0.5, '#e8c070'); gr.addColorStop(1, '#6a4a16');
    g.fillStyle = gr; g.fillRect(0, 0, W, H); g.fillStyle = '#2a1a06'; g.textAlign = 'center'; g.font = '800 34px Georgia, serif'; g.fillText(title, W / 2, sub ? 44 : 60);
    if (sub){ g.font = '600 26px "Segoe UI", "Segoe UI Emoji", Arial'; g.fillText(sub, W / 2, 80); }
    b.tex.needsUpdate = true;
  }
  private drawBoard(b: { tex: THREE.CanvasTexture; g: CanvasRenderingContext2D; key: string }, title: string, rows: { icon: string; name: string; right: string; color: string }[], empty: string){
    const key = title + JSON.stringify(rows);
    if (key === b.key) return;
    b.key = key;
    const g = b.g, W = g.canvas.width, H = g.canvas.height;
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0e1018'); bg.addColorStop(1, '#05060a'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    // lưới điểm LED
    g.fillStyle = 'rgba(255,255,255,0.03)'; for (let y = 0; y < H; y += 6) for (let x = 0; x < W; x += 6) g.fillRect(x, y, 2, 2);
    const tg = g.createLinearGradient(0, 0, W, 0); tg.addColorStop(0, '#ffcf5a'); tg.addColorStop(0.5, '#fff4c8'); tg.addColorStop(1, '#ffcf5a');
    g.fillStyle = tg; g.font = '900 64px "Segoe UI", Arial'; g.textAlign = 'center'; g.fillText(title, W / 2, 86);
    g.fillStyle = '#ffcf5a'; g.fillRect(80, 108, W - 160, 3);
    g.textAlign = 'left';
    if (!rows.length){ g.fillStyle = '#9aa4b4'; g.font = '600 36px "Segoe UI", Arial'; g.textAlign = 'center'; g.fillText(empty, W / 2, 330); }
    rows.forEach((r, i) => {
      const y = 175 + i * 92;
      g.fillStyle = i === 0 ? 'rgba(255,200,90,0.16)' : 'rgba(255,255,255,0.05)'; g.beginPath(); g.roundRect(60, y - 52, W - 120, 78, 14); g.fill();
      g.font = '700 46px "Segoe UI Emoji", "Segoe UI", Arial'; g.fillStyle = '#fff'; g.fillText(r.icon, 82, y + 2);
      g.font = '800 42px "Segoe UI", "Segoe UI Emoji", Arial'; g.fillStyle = r.color;
      let nm = r.name; while (g.measureText(nm).width > 560 && nm.length > 3) nm = nm.slice(0, -2) + '…';
      g.fillText(nm, 170, y);
      g.textAlign = 'right'; g.font = '700 38px "Segoe UI", Arial'; g.fillStyle = '#ffd77a'; g.fillText(r.right, W - 84, y); g.textAlign = 'left';
    });
    b.tex.needsUpdate = true;
  }

  // gán bản in vào khung; vẽ ảnh lần lượt mỗi khung hình một bản để không giật
  private assign(s: Slot, r: PrintRecord | null){
    const key = r ? `${r.n}` : '';
    if (s.key === key) return;
    s.key = key; s.n = r?.n ?? 0;
    if (!r){ this.setPic(s, null); return; }
    const tier = tierOf(r.tier);
    s.frameMat.color.set(FRAME_COL[r.tier] ?? 0x2a1c12); s.frameMat.metalness = tier.no >= 2 ? 1 : 0.2; s.frameMat.roughness = tier.no >= 2 ? 0.22 : 0.4;
    this.queue.push(async () => {
      const img = await avatarImage(r.id, r.avatar);
      if (s.key !== key) return;
      const set = renderFlat(artData(r, img), s.px);
      if (s.key !== key) return;
      const tx = (c: HTMLCanvasElement, srgb: boolean) => { const t = new THREE.CanvasTexture(c); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; };
      const pbr = tx(set.pbr, false), tpl = templateOf(r.tpl);
      this.setPic(s, new THREE.MeshStandardMaterial({ map: tx(set.color, true), roughnessMap: pbr, metalnessMap: pbr, emissiveMap: tx(set.glow, true), emissive: 0xffffff,
        emissiveIntensity: tpl.glow === 'none' ? 0 : tier.no >= 4 ? 0.9 : 0.4, roughness: 1, metalness: 1, envMapIntensity: 1.2 }));
    });
    this.pump();
  }
  private setPic(s: Slot, mat: THREE.MeshStandardMaterial | null){
    const old = s.pic.material as THREE.MeshStandardMaterial;
    s.pic.material = mat ?? blankMat();
    for (const t of [old.map, old.roughnessMap, old.emissiveMap]) t?.dispose();
    old.dispose();
  }
  /** bắt đầu treo tranh (sau khi cảnh đã dịch shader xong: đổi vật liệu giữa lúc dịch làm compileAsync của three.js treo) */
  start(){ this.paused = false; this.pump(); }
  private pump(){
    if (this.busy || this.paused) return;
    const job = this.queue.shift();
    if (!job) return;
    this.busy = true;
    void job().catch(e => console.warn('Không vẽ được bản in trưng bày', e)).finally(() => { this.busy = false; requestAnimationFrame(() => this.pump()); });
  }

  set(st: PrintState){
    this.last = st;
    const hold = (r: PrintRecord) => this.hold.has(r.n);
    const hall = st.hall && !hold(st.hall) ? st.hall : null;
    this.assign(this.hall, hall);
    const list = st.recent.filter(r => !hold(r) && r.n !== hall?.n);
    this.slots.forEach((s, i) => this.assign(s, list[i] ?? null));
    const rare = st.rare.filter(r => !hold(r));
    this.cases.forEach((s, i) => this.assign(s, rare[i] ?? null));
    const medal = ['🥇', '🥈', '🥉', '🏅', '🏅'];
    this.drawBoard(this.boards[2], `👑 TOP NGƯỜI TẶNG · ${st.month.slice(5)}/${st.month.slice(0, 4)}`, st.top.map((r: TopRow, i) => ({ icon: medal[i], name: r.name, right: `${r.xu.toLocaleString('vi-VN')} xu`, color: i ? '#ffffff' : '#ffd77a' })), 'Tặng quà để lên bảng vàng!');
    this.drawBoard(this.boards[1], '💎 TOP SẢN PHẨM HIẾM', st.rare.map(r => { const t = tierOf(r.tier); return { icon: t.icon, name: `${templateOf(r.tpl).name} · ${r.name}`, right: t.rarity, color: t.color }; }), 'Chưa có bản in hiếm');
    if (hall) this.drawPlate(this.boards[0], 'TOP 1 · TÁC PHẨM TRUNG TÂM', `${hall.name} · ${templateOf(hall.tpl).name}`);
  }
  release(n: number){ if (this.hold.delete(n) && this.last) this.set(this.last); }

  /** vị trí treo kế tiếp cho bản in vừa xong (bản mới nhất vào khung gần giữa nhất) */
  nextPose(big: boolean): Pose { return big ? this.slots[0].pose : this.slots[0].pose; }
  hallPose(){ return this.hall.pose; }

  update(t: number){
    for (const [i, m] of this.glows.entries()) m.emissiveIntensity = 1.5 + Math.sin(t * 1.6 + i) * 0.4;
  }
}
