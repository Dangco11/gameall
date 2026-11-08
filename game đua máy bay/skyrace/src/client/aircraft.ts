import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { PlaneKey } from '../shared/game.ts';
import type { LiveryKind, Slot } from './livery.ts';

// Hình học máy bay dựng bằng code, đúng cấu trúc máy bay thật:
//  - thân: mặt cắt elip thay đổi dọc thân (mũi thuôn, đuôi vểnh), có toạ độ UV để sơn hoa văn
//  - cánh, đuôi: tiết diện cánh NACA thật (dày ở mép trước, mỏng dần về mép sau), cánh vuốt, góc nhị diện
//  - cánh liệng, cánh tà, cánh lái độ cao, bánh lái hướng là các mảnh riêng quay quanh đúng đường bản lề
//  - động cơ có chiều sâu: quạt turbofan trong vỏ, miệng phản lực có lửa đốt sau bên trong, cánh quạt xoắn
//  - buồng lái kính có ghế và phi công, bánh đáp thu vào thân, đèn tín hiệu, decal số hiệu trên đuôi
// Mũi máy bay hướng +Z, phía trên +Y, cánh trái của phi công ở +X. Đơn vị: mét.
// Hình học tính một lần cho mỗi loại (cache trong glb.ts), các phần cùng vật liệu được gộp lại để giảm lệnh vẽ.

export type MoverKind = 'aileron' | 'elevator' | 'rudder' | 'flap' | 'spin' | 'blur' | 'gear';
export interface MoverDef {
  kind: MoverKind; side: 1 | -1; pivot: THREE.Vector3; axis: THREE.Vector3; max: number;
  geos: Partial<Record<Slot, THREE.BufferGeometry>>;    // toạ độ đã dời về bản lề / trục quay
}
export interface Blueprint {
  key: PlaneKey; livery: LiveryKind; size: number; gearH: number; retract: boolean; prop: boolean;
  statics: Partial<Record<Slot, THREE.BufferGeometry>>;
  movers: MoverDef[];
  lights: { pos: THREE.Vector3; kind: 'red' | 'green' | 'white' | 'strobe' | 'beacon' }[];
  exhaust: { pos: THREE.Vector3; r: number; kind: 'jet' | 'fan' | 'prop' }[];
  tips: [THREE.Vector3, THREE.Vector3];
  decals: { pos: THREE.Vector3; w: number; h: number; side: 1 | -1 }[];
  booster: THREE.Vector3;          // chỗ gắn tên lửa đẩy (skill 50 xu)
  low: Partial<Record<'paint' | 'dark' | 'metal', THREE.BufferGeometry>>;   // bản đơn giản cho máy bay ở xa
  tris: number;
}

/* ---------------------------------------------------------------- tiện ích */
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const sm = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
// Mặt cắt thân: phình dần từ đuôi lên rMax, rồi thuôn về mũi theo đường cong ogive
const prof = (rTail: number, rMax: number, tailLen: number, noseStart: number, nosePow = 0.6, rNose = 0) => (t: number) => {
  const tail = rTail / rMax + (1 - rTail / rMax) * sm(0, tailLen, t);
  const n = t < noseStart ? 1 : Math.max(0, 1 - ((t - noseStart) / (1 - noseStart)) ** 2) ** nosePow;
  return rMax * Math.min(tail, Math.max(n, t < 1 ? rNose / rMax : 0));
};

// chỉ giữ position, normal, uv; không đánh chỉ số để gộp được với nhau
function prep(g: THREE.BufferGeometry){
  const out = g.index ? g.toNonIndexed() : g;
  if (!out.attributes.normal) out.computeVertexNormals();
  if (!out.attributes.uv) out.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(out.attributes.position.count * 2), 2));
  for (const k of Object.keys(out.attributes)) if (k !== 'position' && k !== 'normal' && k !== 'uv') out.deleteAttribute(k);
  out.morphAttributes = {}; out.clearGroups();
  return out;
}
// Khối kín: đảo chiều tam giác nếu thể tích âm (mặt ngoài đang quay vào trong)
function orient(g: THREE.BufferGeometry){
  const p = g.attributes.position as THREE.BufferAttribute, idx = g.index!;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let vol = 0;
  for (let i = 0; i < idx.count; i += 3){ a.fromBufferAttribute(p, idx.getX(i)); b.fromBufferAttribute(p, idx.getX(i + 1)); c.fromBufferAttribute(p, idx.getX(i + 2)); vol += a.dot(b.cross(c)); }
  if (vol < 0) for (let i = 0; i < idx.count; i += 3){ const t = idx.getX(i + 1); idx.setX(i + 1, idx.getX(i + 2)); idx.setX(i + 2, t); }
}
function mirrorX(g: THREE.BufferGeometry){
  const m = g.clone(); m.scale(-1, 1, 1);
  // lật gương làm đảo chiều mặt: đổi thứ tự hai đỉnh của mỗi tam giác
  const p = m.attributes.position as THREE.BufferAttribute, n = m.attributes.normal as THREE.BufferAttribute, uv = m.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i += 3) for (const at of [p, n, uv]){
    for (let k = 0; k < at.itemSize; k++){ const t = at.getComponent(i + 1, k); at.setComponent(i + 1, k, at.getComponent(i + 2, k)); at.setComponent(i + 2, k, t); }
  }
  return m;
}

/* -------------------------------------------------------------- thân */
interface Fuse {
  z0: number; len: number; r: (t: number) => number;
  sx?: (t: number) => number; sy?: (t: number) => number; yc?: (t: number) => number; xc?: number;
  ripple?: (a: number) => number; inward?: boolean; capTail?: boolean; nl?: number; na?: number;
}
function fuse(f: Fuse, q: number){
  const NL = Math.max(6, Math.round((f.nl ?? 60) * q)), NA = Math.max(8, Math.round((f.na ?? 36) * q));
  const pos: number[] = [], uv: number[] = [], idx: number[] = [];
  for (let i = 0; i <= NL; i++){
    const t = i / NL, r = f.r(t), sx = f.sx?.(t) ?? 1, sy = f.sy?.(t) ?? 1, yc = f.yc?.(t) ?? 0, z = f.z0 + t * f.len;
    for (let j = 0; j <= NA; j++){
      const u = j / NA, th = u * Math.PI * 2 - Math.PI / 2, rr = r * (f.ripple?.(th) ?? 1);
      pos.push((f.xc ?? 0) + Math.cos(th) * rr * sx, yc + Math.sin(th) * rr * sy, z); uv.push(u, t);
    }
  }
  for (let i = 0; i < NL; i++) for (let j = 0; j < NA; j++){
    const a = i * (NA + 1) + j, b = a + NA + 1, c = a + 1, d = b + 1;
    if (f.inward) idx.push(a, b, c, c, b, d); else idx.push(a, c, b, c, d, b);
  }
  if (f.capTail && f.r(0) > 0.01){
    const ci = pos.length / 3; pos.push(f.xc ?? 0, f.yc?.(0) ?? 0, f.z0); uv.push(0.5, 0);
    for (let j = 0; j < NA; j++) idx.push(ci, j, j + 1);      // nhìn từ sau (-Z) quay ra ngoài
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
  g.computeVertexNormals();
  return prep(g);
}

/* --------------------------------------------------------------- cánh */
export interface WingSpec {
  root: [number, number, number];   // điểm mép trước ở gốc cánh
  span: number; cr: number; ct: number; sweep: number;   // sweep: mép trước ở đầu cánh lùi về sau bao nhiêu mét
  dih?: number; th?: number; vertical?: boolean; cant?: number;
  chord?: (s: number) => number; le?: (s: number) => number; twist?: (s: number) => number; ns?: number; nc?: number;
}
// độ dày NACA 4 chữ số (mép sau khép kín)
const yt = (p: number) => 5 * (0.2969 * Math.sqrt(p) - 0.126 * p - 0.3516 * p * p + 0.2843 * p ** 3 - 0.1036 * p ** 4);
function wingPoint(w: WingSpec, s: number, p: number, side: number){
  const c = w.chord ? w.chord(s) : w.cr + (w.ct - w.cr) * s, le = w.root[2] + (w.le ? w.le(s) : -w.sweep * s);
  let h = yt(p) * c * (w.th ?? 0.1) * side, zc = le - p * c;
  if (w.twist){ const a = w.twist(s), q = le - 0.25 * c, dz = zc - q; zc = q + dz * Math.cos(a) - h * Math.sin(a); h = dz * Math.sin(a) + h * Math.cos(a); }
  const v = w.vertical ? V(w.root[0] + h, w.root[1] + s * w.span, zc) : V(w.root[0] + s * w.span, w.root[1] + s * w.span * Math.tan(w.dih ?? 0) + h, zc);
  if (w.cant){ v.sub(V(w.root[0], w.root[1], 0)).applyAxisAngle(V(0, 0, 1), w.cant).add(V(w.root[0], w.root[1], 0)); }
  return v;
}
function wingPart(w: WingSpec, c0: number, c1: number, s0: number, s1: number, q: number){
  const NS = Math.max(1, Math.round((w.ns ?? 12) * q * (s1 - s0) + 0.5)), NC = Math.max(4, Math.round((w.nc ?? 16) * q));
  const ring: [number, number][] = [];
  for (let k = 0; k < NC; k++) ring.push([c0 + (c1 - c0) * (1 - Math.cos(Math.PI * k / (NC - 1))) / 2, 1]);
  for (let k = NC - 1; k >= 0; k--) ring.push([ring[k][0], -1]);
  const M = ring.length, pos: number[] = [], uv: number[] = [], idx: number[] = [];
  for (let i = 0; i <= NS; i++){
    const s = s0 + (s1 - s0) * i / NS;
    for (const [p, side] of ring){ const v = wingPoint(w, s, p, side); pos.push(v.x, v.y, v.z); uv.push(p, s); }
  }
  for (let i = 0; i < NS; i++) for (let j = 0; j < M; j++){
    const a = i * M + j, b = (i + 1) * M + j, c = i * M + (j + 1) % M, d = (i + 1) * M + (j + 1) % M;
    idx.push(a, c, b, c, d, b);
  }
  // bịt hai đầu bằng quạt tam giác quanh tâm tiết diện
  for (const i of [0, NS]){
    let cx = 0, cy = 0, cz = 0;
    for (let j = 0; j < M; j++){ cx += pos[(i * M + j) * 3]; cy += pos[(i * M + j) * 3 + 1]; cz += pos[(i * M + j) * 3 + 2]; }
    const ci = pos.length / 3; pos.push(cx / M, cy / M, cz / M); uv.push(0.5, i ? s1 : s0);
    for (let j = 0; j < M; j++) idx.push(ci, i * M + j, i * M + (j + 1) % M);
  }
  // nắp hai đầu đã tạo cùng một chiều: sửa chiều nắp gốc cho khép kín đúng
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  const capStart = NS * M * 6, capLen = M * 3;
  for (let k = capStart; k < capStart + capLen; k += 3){ const t = idx[k + 1]; idx[k + 1] = idx[k + 2]; idx[k + 2] = t; }
  g.setIndex(idx); orient(g); g.computeVertexNormals();
  return prep(g);
}

/* ------------------------------------------------------------- builder */
interface Surface { kind: 'aileron' | 'elevator' | 'rudder' | 'flap'; c: number; s0: number; s1: number; max: number }
class Builder {
  readonly q: number;
  private st = new Map<Slot, THREE.BufferGeometry[]>();
  movers: MoverDef[] = [];
  lights: Blueprint['lights'] = [];
  exhaust: Blueprint['exhaust'] = [];
  decals: Blueprint['decals'] = [];
  tips: [THREE.Vector3, THREE.Vector3] = [V(5, 0, -2), V(-5, 0, -2)];
  booster = V(0, -1, -2);
  gearBottom = 0;
  constructor(q: number){ this.q = q; }
  add(slot: Slot, g: THREE.BufferGeometry){ const l = this.st.get(slot) ?? []; l.push(prep(g)); this.st.set(slot, l); return this; }
  mover(kind: MoverKind, side: 1 | -1, pivot: THREE.Vector3, axis: THREE.Vector3, max: number, parts: [Slot, THREE.BufferGeometry][]){
    const geos: Partial<Record<Slot, THREE.BufferGeometry>> = {};
    const by = new Map<Slot, THREE.BufferGeometry[]>();
    for (const [s, g] of parts){ const c = prep(g.clone()); c.translate(-pivot.x, -pivot.y, -pivot.z); const l = by.get(s) ?? []; l.push(c); by.set(s, l); }
    for (const [s, l] of by) geos[s] = l.length === 1 ? l[0] : mergeGeometries(l)!;
    this.movers.push({ kind, side, pivot: pivot.clone(), axis: axis.clone().normalize(), max, geos });
  }
  fuse(slot: Slot, f: Fuse){ return this.add(slot, fuse(f, this.q)); }

  // Cánh (hoặc đuôi) đủ hai bên, các mặt điều khiển tách thành mảnh riêng có bản lề
  wing(slot: Slot, w: WingSpec, surfs: Surface[] = [], both = true){
    const cuts = [...new Set([0, 1, ...surfs.flatMap(s => [s.s0, s.s1])])].sort((a, b) => a - b);
    for (let i = 0; i < cuts.length - 1; i++){
      const a = cuts[i], b = cuts[i + 1], sf = surfs.find(s => s.s0 <= a && s.s1 >= b);
      if (!sf || sf.c > 0.01){       // mặt xoay toàn phần (c = 0) thì không còn phần cố định
        const body = wingPart(w, 0, sf ? sf.c : 1, a, b, this.q);
        this.add(slot, body); if (both) this.add(slot, mirrorX(body));
      }
      if (!sf) continue;
      const part = wingPart(w, sf.c, 1, a, b, this.q);
      const p0 = wingPoint(w, a, sf.c, 0), p1 = wingPoint(w, b, sf.c, 0), axis = p1.clone().sub(p0);
      this.mover(sf.kind, 1, p0, axis, sf.max, [[slot, part]]);
      if (both) this.mover(sf.kind, -1, V(-p0.x, p0.y, p0.z), V(-axis.x, axis.y, axis.z), sf.max, [[slot, mirrorX(part)]]);
    }
  }

  // Buồng lái: vòm kính, khung, ghế, bảng đồng hồ, phi công đội mũ bay
  cockpit(z: number, len: number, w: number, h: number, y: number, seats = 1){
    this.fuse('glass', { z0: z, len, r: t => Math.sin(Math.PI * Math.min(1, t * 1.05)) ** 0.55, sx: () => w, sy: () => h, yc: () => y, nl: 24, na: 28 });
    const frame = new THREE.TorusGeometry(1, 0.05, 6, 24, Math.PI).scale(w, h, 1).translate(0, y, z + len * 0.55);
    this.add('metal', frame);
    for (let k = 0; k < seats; k++){
      const sz = z + len * (seats === 1 ? 0.42 : 0.62 - k * 0.38);
      this.add('cabin', new THREE.BoxGeometry(w * 0.9, h * 1.1, 0.18).translate(0, y - h * 0.2, sz - 0.42));        // lưng ghế
      this.add('cabin', new THREE.BoxGeometry(w * 0.9, 0.16, 0.6).translate(0, y - h * 0.75, sz - 0.12));          // đệm ngồi
      this.add('suit', new THREE.CapsuleGeometry(w * 0.32, h * 0.55, 4, 10).translate(0, y - h * 0.25, sz - 0.18)); // thân phi công
      this.add('helmet', new THREE.SphereGeometry(w * 0.3, 16, 12).translate(0, y + h * 0.42, sz - 0.12));
      this.add('dark', new THREE.SphereGeometry(w * 0.31, 14, 10, -Math.PI * 0.35, Math.PI * 0.7, Math.PI * 0.32, Math.PI * 0.3).translate(0, y + h * 0.42, sz - 0.12));   // kính che mặt
    }
    this.add('cabin', new THREE.BoxGeometry(w * 1.3, h * 0.35, 0.3).translate(0, y - h * 0.15, z + len * 0.82));    // bảng đồng hồ
  }

  // Động cơ turbofan: vỏ, lòng ống, cánh quạt nhiều lá, nón xả
  turbofan(c: THREE.Vector3, r: number, len: number, cowl: Slot = 'white'){
    this.fuse(cowl, { z0: c.z - len / 2, len, r: t => r * (0.72 + 0.28 * sm(0, 0.45, t)) * (t > 0.92 ? 0.94 + 0.06 * Math.cos((t - 0.92) / 0.08 * Math.PI / 2) : 1), xc: c.x, yc: () => c.y, nl: 22, na: 28 });
    this.fuse('dark', { z0: c.z + len * 0.1, len: len * 0.4, r: () => r * 0.86, xc: c.x, yc: () => c.y, inward: true, nl: 3, na: 28 });
    const blades: [Slot, THREE.BufferGeometry][] = [];
    const nb = 18;
    for (let k = 0; k < nb; k++) blades.push(['metal', new THREE.BoxGeometry(0.06, r * 0.82, r * 0.18).rotateY(0.5).translate(0, r * 0.44, 0).rotateZ(k * Math.PI * 2 / nb)]);
    blades.push(['dark', fuse({ z0: -r * 0.05, len: r * 0.55, r: t => r * 0.3 * Math.sqrt(Math.max(0, 1 - t * t)), nl: 8, na: 16 }, this.q)]);
    const fz = c.z + len * 0.36;
    this.mover('spin', 1, V(c.x, c.y, fz), V(0, 0, 1), 0, blades.map(([s, g]) => [s, g.clone().translate(c.x, c.y, fz)] as [Slot, THREE.BufferGeometry]));
    this.fuse('metal', { z0: c.z - len / 2 - r * 0.5, len: r * 0.7, r: t => r * 0.42 * (0.2 + 0.8 * t), xc: c.x, yc: () => c.y, nl: 6, na: 16 });
    this.exhaust.push({ pos: V(c.x, c.y, c.z - len / 2 - 0.2), r: r * 0.7, kind: 'fan' });
  }

  // Miệng phản lực: các cánh vảy, lòng ống tối, lửa đốt sau ở sâu bên trong
  nozzle(c: THREE.Vector3, r: number, len: number){
    this.fuse('dark', { z0: c.z - len, len, r: t => r * (0.88 + 0.12 * t), ripple: a => 1 + 0.035 * Math.cos(a * 14), xc: c.x, yc: () => c.y, nl: 6, na: 42 });
    this.fuse('dark', { z0: c.z - len, len: len * 0.9, r: () => r * 0.8, xc: c.x, yc: () => c.y, inward: true, nl: 3, na: 28 });
    this.add('glow', new THREE.CircleGeometry(r * 0.78, 24).rotateY(Math.PI).translate(c.x, c.y, c.z - len * 0.55));
    this.add('metal', new THREE.TorusGeometry(r * 0.9, r * 0.06, 6, 28).translate(c.x, c.y, c.z - len));
    this.exhaust.push({ pos: V(c.x, c.y, c.z - len - 0.1), r: r * 0.8, kind: 'jet' });
  }

  // Cánh quạt: chóp quay và các lá xoắn đúng tiết diện, đĩa mờ khi quay nhanh
  propeller(c: THREE.Vector3, R: number, blades: number, spinner: Slot = 'paint', spinLen = R * 0.45){
    const parts: [Slot, THREE.BufferGeometry][] = [];
    parts.push([spinner, fuse({ z0: -spinLen * 0.2, len: spinLen, r: t => R * 0.2 * Math.sqrt(Math.max(0, 1 - t ** 2.2)), nl: 12, na: 20 }, this.q)]);
    const blade = wingPart({ root: [0, R * 0.12, R * 0.08], span: R * 0.88, cr: R * 0.24, ct: R * 0.09, sweep: 0.02, th: 0.12, vertical: true, twist: s => 0.95 - 0.7 * s, ns: 6, nc: 8 }, 0, 1, 0, 1, this.q);
    for (let k = 0; k < blades; k++) parts.push(['dark', blade.clone().rotateZ(k * Math.PI * 2 / blades)]);
    this.mover('spin', 1, c, V(0, 0, 1), 0, parts.map(([s, g]) => [s, g.clone().translate(c.x, c.y, c.z)] as [Slot, THREE.BufferGeometry]));
    this.mover('blur', 1, c, V(0, 0, 1), 0, [['blur', new THREE.CircleGeometry(R, 32).translate(c.x, c.y, c.z + 0.05)]]);
    this.exhaust.push({ pos: V(c.x, c.y, c.z - 0.5), r: R * 0.15, kind: 'prop' });
  }

  // Bộ bánh đáp: chân, giảm chấn, trục, bánh cao su + vành kim loại, nắp khoang. fold: hướng gập khi thu bánh.
  gear(top: THREE.Vector3, h: number, wr: number, fold: 'fwd' | 'back' | 'in' | 'out' | 'fixed', twin = false, pants = false){
    const parts: [Slot, THREE.BufferGeometry][] = [];
    parts.push(['metal', new THREE.CylinderGeometry(wr * 0.16, wr * 0.16, h * 0.62, 8).translate(top.x, top.y - h * 0.31, top.z)]);
    parts.push(['dark', new THREE.CylinderGeometry(wr * 0.11, wr * 0.11, h * 0.45, 8).translate(top.x, top.y - h * 0.75, top.z)]);
    const wy = top.y - h, offs = twin ? [-wr * 0.55, wr * 0.55] : [0];
    parts.push(['metal', new THREE.CylinderGeometry(wr * 0.08, wr * 0.08, twin ? wr * 1.6 : wr * 0.7, 6).rotateZ(Math.PI / 2).translate(top.x, wy, top.z)]);
    for (const ox of offs){
      parts.push(['rubber', new THREE.TorusGeometry(wr * 0.72, wr * 0.28, 10, 22).rotateY(Math.PI / 2).translate(top.x + ox, wy, top.z)]);
      parts.push(['metal', new THREE.CylinderGeometry(wr * 0.52, wr * 0.52, wr * 0.42, 16).rotateZ(Math.PI / 2).translate(top.x + ox, wy, top.z)]);
    }
    if (pants) parts.push(['paint', fuse({ z0: top.z - wr * 1.4, len: wr * 2.9, r: t => wr * 1.1 * Math.sin(Math.PI * Math.min(1, t)) ** 0.6, sx: () => 0.5, xc: top.x, yc: () => wy + wr * 0.15, nl: 14, na: 16 }, this.q)]);
    if (fold !== 'fixed') parts.push(['paint', new THREE.BoxGeometry(0.06, h * 0.7, wr * 2.2).translate(top.x + (top.x >= 0 ? wr * 0.75 : -wr * 0.75), top.y - h * 0.35, top.z)]);
    this.gearBottom = Math.min(this.gearBottom, wy - wr);
    const axis = fold === 'fwd' ? V(1, 0, 0) : fold === 'back' ? V(-1, 0, 0) : fold === 'in' ? V(0, 0, top.x >= 0 ? -1 : 1) : V(0, 0, top.x >= 0 ? 1 : -1);
    this.mover('gear', top.x >= 0 ? 1 : -1, top, axis, fold === 'fixed' ? 0 : Math.PI / 2 * 0.98, parts);
  }

  build(key: PlaneKey, livery: LiveryKind, size: number, retract: boolean, prop: boolean): Omit<Blueprint, 'low'> {
    const statics: Partial<Record<Slot, THREE.BufferGeometry>> = {};
    let tris = 0;
    for (const [s, l] of this.st){ statics[s] = l.length === 1 ? l[0] : mergeGeometries(l)!; tris += statics[s]!.attributes.position.count / 3; }
    for (const m of this.movers) for (const g of Object.values(m.geos)) tris += g!.attributes.position.count / 3;
    return { key, livery, size, gearH: -this.gearBottom, retract, prop, statics, movers: this.movers, lights: this.lights, exhaust: this.exhaust, tips: this.tips, decals: this.decals, booster: this.booster, tris };
  }
}

/* ------------------------------------------------------ 10 mẫu máy bay */
type Make = (b: Builder) => { livery: LiveryKind; size: number; retract?: boolean; prop?: boolean };
const lights = (b: Builder, tipL: THREE.Vector3, tail: THREE.Vector3, top: THREE.Vector3, bottom: THREE.Vector3) => {
  b.lights.push({ pos: tipL, kind: 'red' }, { pos: V(-tipL.x, tipL.y, tipL.z), kind: 'green' }, { pos: tipL.clone().add(V(0, 0, -0.3)), kind: 'strobe' },
    { pos: V(-tipL.x, tipL.y, tipL.z - 0.3), kind: 'strobe' }, { pos: tail, kind: 'white' }, { pos: top, kind: 'beacon' }, { pos: bottom, kind: 'beacon' });
};

const MAKERS: Record<PlaneKey, Make> = {
  // Tiêm kích một động cơ: cửa hút khí dưới bụng, cánh tam giác cắt đầu, cánh lái độ cao toàn phần, tên lửa ở đầu cánh
  fighter: b => {
    b.fuse('paint', { z0: -7.4, len: 15, r: prof(0.62, 1.05, 0.14, 0.62, 0.7), sx: t => 1.12 + 0.15 * sm(0.2, 0.5, t) * (1 - sm(0.6, 0.85, t)), sy: () => 0.86, yc: t => 0.12 * sm(0.45, 0.7, t) * (1 - sm(0.8, 1, t)) });
    b.add('metal', new THREE.CylinderGeometry(0.03, 0.05, 1.6, 6).rotateX(Math.PI / 2).translate(0, 0.02, 8.3));   // ống pitot
    b.fuse('paint', { z0: -1.5, len: 5.2, r: t => 0.62 * (0.85 + 0.15 * sm(0, 0.2, t)) * (t > 0.96 ? 0.97 : 1), sx: () => 1.15, sy: () => 0.75, yc: () => -0.95, nl: 18, na: 28 });
    b.fuse('dark', { z0: 2.2, len: 1.5, r: () => 0.52, sx: () => 1.15, sy: () => 0.72, yc: () => -0.95, inward: true, nl: 2, na: 28 });
    b.cockpit(2.0, 3.6, 0.6, 0.62, 0.62);
    b.wing('wing', { root: [0.95, -0.15, 1.3], span: 4.4, cr: 4.0, ct: 1.25, sweep: 2.9, th: 0.055 }, [{ kind: 'aileron', c: 0.76, s0: 0.08, s1: 0.8, max: 0.35 }]);
    b.wing('paint', { root: [0.75, 0.0, 4.6], span: 0.55, cr: 3.2, ct: 0.4, sweep: 2.6, th: 0.04 });      // gờ mép cánh (LERX)
    b.wing('wing', { root: [0.85, -0.1, -4.6], span: 2.5, cr: 2.3, ct: 0.95, sweep: 1.5, th: 0.045, dih: -0.08 }, [{ kind: 'elevator', c: 0, s0: 0, s1: 1, max: 0.3 }]);
    b.wing('paint', { root: [0, 0.75, -2.9], span: 3.3, cr: 3.2, ct: 1.15, sweep: 2.2, th: 0.055, vertical: true }, [{ kind: 'rudder', c: 0.72, s0: 0.08, s1: 0.85, max: 0.35 }], false);
    for (const s of [1, -1]){
      b.wing('paint', { root: [s * 0.6, -0.8, -4.0], span: 0.8, cr: 1.3, ct: 0.7, sweep: 0.6, th: 0.04, vertical: true, cant: s * 2.6 }, [], false);   // cánh bụng
      // tên lửa đầu cánh trên giá
      b.add('white', fuse({ z0: -2.6, len: 3.0, r: t => 0.11 * Math.min(1, (1 - t) * 6 + 0.2) * (t > 0.85 ? (1 - t) / 0.15 * 0.6 + 0.4 : 1), xc: s * 5.45, yc: () => -0.2, nl: 10, na: 10 }, b.q));
      b.add('dark', new THREE.BoxGeometry(0.06, 0.18, 1.6).translate(s * 5.42, -0.06, -1.6));
    }
    b.nozzle(V(0, 0.02, -7.35), 0.62, 1.1);
    b.gear(V(0, -0.95, 3.4), 1.55, 0.3, 'back');
    for (const s of [1, -1]) b.gear(V(s * 1.05, -0.8, -1.4), 1.6, 0.38, 'fwd');
    lights(b, V(5.35, -0.15, -1.9), V(0, 3.9, -5.3), V(0, 0.85, -0.5), V(0, -1.6, 0.2));
    b.tips = [V(5.45, -0.2, -2.6), V(-5.45, -0.2, -2.6)];
    b.decals.push({ pos: V(0, 2.3, -4.2), w: 1.6, h: 1.6, side: 1 }, { pos: V(0, 2.3, -4.2), w: 1.6, h: 1.6, side: -1 });
    b.booster = V(0, -1.6, -2.5);
    return { livery: 'military', size: 15 };
  },

  // Máy bay chở khách thân hẹp: cánh vuốt có cánh nhỏ đầu cánh, 2 động cơ turbofan treo dưới cánh
  airliner: b => {
    b.fuse('paint', { z0: -10.5, len: 21, r: prof(0.2, 1.62, 0.26, 0.86, 0.5), sy: () => 1.04, yc: t => 0.95 * (1 - sm(0, 0.26, t)) - 0.12 * sm(0.88, 1, t), nl: 70, na: 40 });
    b.fuse('glass', { z0: 8.15, len: 1.45, r: t => Math.sin(Math.PI * t) ** 0.5, sx: () => 1.05, sy: () => 0.32, yc: () => 0.7, nl: 10, na: 20 });
    b.wing('wing', { root: [1.35, -0.85, 1.6], span: 7.6, cr: 4.6, ct: 1.25, sweep: 3.9, th: 0.11, dih: 0.1 },
      [{ kind: 'flap', c: 0.74, s0: 0.04, s1: 0.58, max: 0.6 }, { kind: 'aileron', c: 0.74, s0: 0.62, s1: 0.92, max: 0.35 }]);
    b.wing('wing', { root: [8.95, 0.05, -2.2], span: 1.5, cr: 1.2, ct: 0.5, sweep: 0.9, th: 0.08, vertical: true, cant: -0.25 }, [], false);   // cánh nhỏ đầu cánh
    b.wing('wing', { root: [-8.95, 0.05, -2.2], span: 1.5, cr: 1.2, ct: 0.5, sweep: 0.9, th: 0.08, vertical: true, cant: 0.25 }, [], false);
    for (const s of [1, -1]){
      b.turbofan(V(s * 3.1, -1.75, 1.6), 0.82, 3.4);
      b.wing('wing', { root: [s * 3.1, -1.05, 1.9], span: 0.55, cr: 2.6, ct: 2.3, sweep: 0.3, th: 0.1, vertical: true }, [], false);   // giá treo động cơ
    }
    b.wing('paint', { root: [0, 1.6, -6.2], span: 4.6, cr: 4.5, ct: 1.6, sweep: 3.6, th: 0.1, vertical: true }, [{ kind: 'rudder', c: 0.7, s0: 0.05, s1: 0.95, max: 0.3 }], false);
    b.wing('wing', { root: [0.5, 0.95, -7.3], span: 3.8, cr: 2.8, ct: 1.0, sweep: 2.1, th: 0.09, dih: 0.12 }, [{ kind: 'elevator', c: 0.68, s0: 0.05, s1: 0.95, max: 0.3 }]);
    b.gear(V(0, -1.2, 7.0), 1.45, 0.38, 'fwd', true);
    for (const s of [1, -1]) b.gear(V(s * 1.9, -1.15, -0.4), 1.55, 0.5, 'in', true);
    lights(b, V(8.9, -0.05, -2.0), V(0, 0.95, -10.6), V(0, 1.7, 0), V(0, -1.75, 1));
    b.tips = [V(9.0, 1.4, -3.0), V(-9.0, 1.4, -3.0)];
    b.decals.push({ pos: V(0, 3.6, -8.2), w: 2.3, h: 2.3, side: 1 }, { pos: V(0, 3.6, -8.2), w: 2.3, h: 2.3, side: -1 });
    b.booster = V(0, -2.0, -3);
    return { livery: 'airline', size: 21 };
  },

  // Chiến đấu cơ cánh quạt cổ điển: cánh elip, mũi dài, 4 lá quạt, bánh đuôi
  prop: b => {
    b.fuse('paint', { z0: -5.0, len: 9.6, r: prof(0.12, 0.72, 0.4, 0.84, 0.35, 0.42), sy: t => 1.15 - 0.1 * t, yc: t => 0.1 * sm(0.4, 0.6, t), nl: 56 });
    b.add('dark', new THREE.BoxGeometry(0.12, 0.9, 1.6).translate(0, -0.95, -0.6));          // két tản nhiệt dưới bụng
    b.cockpit(-0.2, 2.2, 0.48, 0.55, 0.62);
    const ell = (s: number) => 2.25 * Math.sqrt(Math.max(0.04, 1 - s * s));
    b.wing('wing', { root: [0.55, -0.4, 1.35], span: 5.2, cr: 2.25, ct: 0.5, sweep: 0, chord: ell, le: s => -0.6 * (1 - Math.sqrt(Math.max(0, 1 - s * s))), th: 0.13, dih: 0.1 },
      [{ kind: 'flap', c: 0.76, s0: 0.05, s1: 0.45, max: 0.5 }, { kind: 'aileron', c: 0.76, s0: 0.5, s1: 0.9, max: 0.4 }]);
    b.wing('wing', { root: [0.25, 0.15, -3.9], span: 2.0, cr: 1.4, ct: 0.6, sweep: 0.3, th: 0.09, chord: s => 1.4 * Math.sqrt(Math.max(0.1, 1 - s * s)) }, [{ kind: 'elevator', c: 0.62, s0: 0.05, s1: 0.95, max: 0.35 }]);
    b.wing('paint', { root: [0, 0.4, -3.6], span: 1.7, cr: 1.6, ct: 0.6, sweep: 0.5, th: 0.09, vertical: true, chord: s => 1.6 * Math.sqrt(Math.max(0.15, 1 - s * s)) }, [{ kind: 'rudder', c: 0.6, s0: 0.05, s1: 0.95, max: 0.4 }], false);
    for (const s of [1, -1]) for (let k = 0; k < 3; k++) b.add('dark', new THREE.BoxGeometry(0.14, 0.12, 0.3).translate(s * 0.64, 0.22, 2.6 + k * 0.38));   // ống xả hai bên mũi
    b.propeller(V(0, 0.05, 4.75), 1.75, 4, 'paint');
    for (const s of [1, -1]) b.gear(V(s * 1.5, -0.55, 1.3), 1.55, 0.42, 'in');
    b.gear(V(0, -0.35, -4.4), 0.45, 0.16, 'fixed');
    lights(b, V(5.7, 0.15, 0.9), V(0, 0.4, -5.05), V(0, 0.75, -1.5), V(0, -0.8, -1.2));
    b.exhaust = [{ pos: V(0.7, 0.22, 2.5), r: 0.12, kind: 'prop' }, { pos: V(-0.7, 0.22, 2.5), r: 0.12, kind: 'prop' }];
    b.tips = [V(5.75, 0.15, 0.6), V(-5.75, 0.15, 0.6)];
    b.decals.push({ pos: V(0, 1.2, -4.0), w: 1.0, h: 1.0, side: 1 }, { pos: V(0, 1.2, -4.0), w: 1.0, h: 1.0, side: -1 });
    b.booster = V(0, -1.0, -1.5);
    return { livery: 'warbird', size: 10, prop: true };
  },

  // Siêu thanh: thân dài mảnh, cánh tam giác cong (ogee), 4 động cơ trong 2 hộp dưới cánh, mũi nhọn
  supersonic: b => {
    b.fuse('paint', { z0: -10.6, len: 21.6, r: prof(0.35, 0.95, 0.12, 0.7, 0.9), sy: () => 1.08, yc: t => -0.15 * sm(0.9, 1, t), nl: 72 });
    b.add('metal', new THREE.CylinderGeometry(0.02, 0.04, 1.4, 6).rotateX(Math.PI / 2).translate(0, -0.15, 11.6));
    b.fuse('glass', { z0: 6.4, len: 1.2, r: t => Math.sin(Math.PI * t) ** 0.5, sx: () => 0.7, sy: () => 0.25, yc: () => 0.75, nl: 8, na: 16 });
    const ogeeLE = (s: number) => -11.2 * (s ** 0.55) + 2.0 * s;
    b.wing('wing', { root: [0.55, -0.55, 4.6], span: 4.6, cr: 13.2, ct: 1.0, sweep: 0, chord: s => 13.2 - 12.2 * s ** 0.8, le: ogeeLE, th: 0.03, ns: 16 },
      [{ kind: 'elevator', c: 0.82, s0: 0.08, s1: 0.9, max: 0.25 }]);
    for (const s of [1, -1]){
      b.fuse('paint', { z0: -8.3, len: 4.6, r: t => 0.6 * (0.9 + 0.1 * sm(0, 0.3, t)), sx: () => 1.65, sy: () => 0.85, xc: s * 1.65, yc: () => -1.0, nl: 14, na: 24 });
      for (const ox of [-0.5, 0.5]) b.nozzle(V(s * 1.65 + ox, -1.0, -8.25), 0.4, 0.5);
    }
    b.wing('paint', { root: [0, 0.6, -5.6], span: 3.8, cr: 4.6, ct: 1.5, sweep: 3.6, th: 0.05, vertical: true }, [{ kind: 'rudder', c: 0.72, s0: 0.05, s1: 0.95, max: 0.3 }], false);
    b.gear(V(0, -0.85, 5.2), 2.1, 0.32, 'fwd', true);
    for (const s of [1, -1]) b.gear(V(s * 1.6, -1.2, -3.2), 1.95, 0.42, 'in', true);
    lights(b, V(5.15, -0.65, -6.5), V(0, 4.3, -9.5), V(0, 1.0, -1), V(0, -1.05, 0));
    b.tips = [V(5.15, -0.6, -6.8), V(-5.15, -0.6, -6.8)];
    b.decals.push({ pos: V(0, 2.4, -7.6), w: 2.0, h: 2.0, side: 1 }, { pos: V(0, 2.4, -7.6), w: 2.0, h: 2.0, side: -1 });
    b.booster = V(0, -1.6, -2);
    return { livery: 'supersonic', size: 22 };
  },

  // Phản lực tư nhân: thân thon, đuôi chữ T, 2 động cơ gắn hai bên đuôi thân, cánh nhỏ đầu cánh
  bizjet: b => bizjet(b, false),
  // VIP mạ vàng: thân phản lực tư nhân, thêm động cơ thứ 3 ở gốc đuôi, đầu cánh vàng
  golden: b => bizjet(b, true),

  // Vận tải quân sự: cánh trên thẳng, 4 động cơ cánh quạt, thân to đuôi vểnh, khoang bánh hai bên sườn
  transport: b => {
    b.fuse('paint', { z0: -9.5, len: 19, r: prof(0.3, 1.95, 0.32, 0.84, 0.55, 0.5), sy: t => 1.0 - 0.06 * sm(0.3, 0.8, t), yc: t => 1.1 * (1 - sm(0, 0.32, t)), nl: 64, na: 40 });
    b.fuse('glass', { z0: 6.6, len: 1.6, r: t => Math.sin(Math.PI * t) ** 0.5, sx: () => 1.1, sy: () => 0.42, yc: () => 1.15, nl: 10, na: 20 });
    for (const s of [1, -1]) b.fuse('paint', { z0: -2.4, len: 5.6, r: t => 0.85 * Math.sin(Math.PI * t) ** 0.4, sx: () => 0.8, sy: () => 0.85, xc: s * 1.85, yc: () => -1.25, nl: 16, na: 20 });
    b.wing('wing', { root: [1.2, 1.75, 1.6], span: 9.8, cr: 3.4, ct: 2.0, sweep: 0.5, th: 0.15, dih: -0.015 },
      [{ kind: 'flap', c: 0.74, s0: 0.04, s1: 0.55, max: 0.6 }, { kind: 'aileron', c: 0.74, s0: 0.6, s1: 0.92, max: 0.35 }]);
    for (const s of [1, -1]) for (const x of [3.4, 7.0]){
      b.fuse('paint', { z0: -1.6, len: 5.0, r: t => 0.55 * (0.4 + 0.6 * sm(0, 0.3, t)) * (t > 0.85 ? 1 - (t - 0.85) * 2.5 : 1), sy: () => 1.15, xc: s * x, yc: () => 1.55, nl: 16, na: 20 });
      b.propeller(V(s * x, 1.55, 3.55), 1.9, 4, 'paint', 0.8);
    }
    b.exhaust = [{ pos: V(3.4, 1.4, -1.6), r: 0.2, kind: 'fan' }, { pos: V(-3.4, 1.4, -1.6), r: 0.2, kind: 'fan' }];
    b.wing('paint', { root: [0, 2.2, -6.4], span: 5.2, cr: 4.4, ct: 2.1, sweep: 2.4, th: 0.11, vertical: true }, [{ kind: 'rudder', c: 0.68, s0: 0.05, s1: 0.95, max: 0.3 }], false);
    b.wing('wing', { root: [0.5, 2.0, -7.6], span: 4.6, cr: 2.8, ct: 1.5, sweep: 0.7, th: 0.1 }, [{ kind: 'elevator', c: 0.66, s0: 0.05, s1: 0.95, max: 0.3 }]);
    b.gear(V(0, -1.4, 6.4), 0.95, 0.42, 'fwd', true);
    for (const s of [1, -1]) b.gear(V(s * 1.85, -1.4, -0.2), 0.95, 0.55, 'out');
    lights(b, V(11.0, 1.6, 0.9), V(0, 7.4, -9.2), V(0, 2.0, 0), V(0, -2.0, 2));
    b.tips = [V(11.0, 1.55, 0.2), V(-11.0, 1.55, 0.2)];
    b.decals.push({ pos: V(0, 4.8, -8.3), w: 2.4, h: 2.4, side: 1 }, { pos: V(0, 4.8, -8.3), w: 2.4, h: 2.4, side: -1 });
    b.booster = V(0, -2.2, -2);
    return { livery: 'transport', size: 20, prop: true };
  },

  // Nhào lộn: thân ngắn, cánh lớn thẳng, mặt điều khiển rất to, vòm kính lớn, bánh cố định có ốp
  stunt: b => {
    b.fuse('paint', { z0: -3.9, len: 7.4, r: prof(0.1, 0.62, 0.5, 0.82, 0.3, 0.42), sx: () => 0.95, sy: t => 1.18 - 0.18 * t, yc: t => 0.08 * sm(0.3, 0.6, t), nl: 48 });
    b.cockpit(-0.4, 2.4, 0.5, 0.62, 0.6);
    b.wing('wing', { root: [0.45, -0.3, 1.5], span: 3.6, cr: 2.0, ct: 1.15, sweep: 0.1, th: 0.16 }, [{ kind: 'aileron', c: 0.7, s0: 0.05, s1: 0.95, max: 0.55 }]);
    b.wing('wing', { root: [0.2, 0.2, -2.7], span: 1.6, cr: 1.15, ct: 0.75, sweep: 0.1, th: 0.1 }, [{ kind: 'elevator', c: 0.5, s0: 0.03, s1: 0.97, max: 0.45 }]);
    b.wing('paint', { root: [0, 0.5, -2.3], span: 1.45, cr: 1.4, ct: 0.75, sweep: 0.55, th: 0.1, vertical: true }, [{ kind: 'rudder', c: 0.5, s0: 0.03, s1: 0.97, max: 0.5 }], false);
    b.propeller(V(0, 0.05, 3.65), 1.25, 3, 'white');
    for (const s of [1, -1]){ b.add('metal', new THREE.BoxGeometry(0.08, 1.1, 0.25).rotateZ(s * 0.45).translate(s * 0.55, -0.85, 1.4)); b.gear(V(s * 0.85, -0.85, 1.4), 0.55, 0.3, 'fixed', false, true); }
    b.gear(V(0, -0.15, -3.7), 0.3, 0.1, 'fixed');
    lights(b, V(4.05, -0.3, 0.9), V(0, 0.5, -3.95), V(0, 0.7, -1.0), V(0, -0.65, -0.5));
    b.exhaust = [{ pos: V(0.55, -0.4, 2.4), r: 0.1, kind: 'prop' }, { pos: V(-0.55, -0.4, 2.4), r: 0.1, kind: 'prop' }];
    b.tips = [V(4.05, -0.3, 0.7), V(-4.05, -0.3, 0.7)];
    b.decals.push({ pos: V(0, 1.15, -2.9), w: 0.9, h: 0.9, side: 1 }, { pos: V(0, 1.15, -2.9), w: 0.9, h: 0.9, side: -1 });
    b.booster = V(0, -0.9, -1);
    return { livery: 'stunt', size: 7.5, retract: false, prop: true };
  },

  // Máy bay đua phản lực: mũi rất nhọn có cần đo, cánh mũi (canard), cánh vuốt mạnh, đuôi đứng đơn, hai cửa hút khí bên sườn
  racer: b => {
    b.fuse('paint', { z0: -6.0, len: 12.4, r: prof(0.48, 0.82, 0.12, 0.42, 1.05), sx: t => 1.05 + 0.25 * sm(0.15, 0.4, t) * (1 - sm(0.45, 0.65, t)), sy: () => 0.85, yc: t => 0.1 * sm(0.4, 0.55, t), nl: 64 });
    b.add('metal', new THREE.CylinderGeometry(0.02, 0.04, 2.2, 6).rotateX(Math.PI / 2).translate(0, 0, 7.5));
    b.cockpit(0.6, 2.6, 0.5, 0.6, 0.5);
    for (const s of [1, -1]){
      b.fuse('paint', { z0: -2.5, len: 3.6, r: t => 0.42 * (0.8 + 0.2 * sm(0, 0.3, t)), sx: () => 0.75, sy: () => 1.1, xc: s * 0.95, yc: () => -0.1, nl: 12, na: 20 });
      b.fuse('dark', { z0: 0.6, len: 0.5, r: () => 0.36, sx: () => 0.75, sy: () => 1.1, xc: s * 0.95, yc: () => -0.1, inward: true, nl: 2, na: 20 });
    }
    b.wing('wing', { root: [0.95, -0.2, 2.3], span: 1.2, cr: 0.9, ct: 0.35, sweep: 0.7, th: 0.05 });   // cánh mũi
    b.wing('wing', { root: [0.95, -0.25, -0.6], span: 4.3, cr: 3.0, ct: 0.75, sweep: 2.8, th: 0.06, dih: -0.05 }, [{ kind: 'aileron', c: 0.75, s0: 0.25, s1: 0.9, max: 0.4 }]);
    b.wing('paint', { root: [0, 0.6, -3.4], span: 2.6, cr: 2.5, ct: 0.9, sweep: 2.0, th: 0.06, vertical: true }, [{ kind: 'rudder', c: 0.7, s0: 0.1, s1: 0.9, max: 0.35 }], false);
    b.wing('wing', { root: [0.5, 0.1, -4.6], span: 1.8, cr: 1.5, ct: 0.6, sweep: 1.0, th: 0.05, dih: 0.25 }, [{ kind: 'elevator', c: 0, s0: 0, s1: 1, max: 0.3 }]);
    b.nozzle(V(0, 0.0, -5.95), 0.48, 0.8);
    b.gear(V(0, -0.65, 3.0), 1.0, 0.26, 'back');
    for (const s of [1, -1]) b.gear(V(s * 1.0, -0.6, -1.4), 1.05, 0.3, 'in');
    lights(b, V(5.25, -0.4, -3.3), V(0, 3.2, -5.2), V(0, 0.75, -1), V(0, -0.75, 0));
    b.tips = [V(5.25, -0.45, -3.6), V(-5.25, -0.45, -3.6)];
    b.decals.push({ pos: V(0, 1.85, -4.2), w: 1.3, h: 1.3, side: 1 }, { pos: V(0, 1.85, -4.2), w: 1.3, h: 1.3, side: -1 });
    b.booster = V(0, -1.2, -2);
    return { livery: 'racer', size: 12.4 };
  },

  // Máy bay tương lai: thân hoà cánh, cánh xuôi về trước, hai đuôi đứng nghiêng, hai động cơ phát sáng, viền đèn neon
  future: b => {
    b.fuse('paint', { z0: -6.5, len: 13.5, r: prof(0.55, 1.05, 0.12, 0.5, 0.95), sx: t => 1.6 - 0.5 * sm(0.45, 0.9, t), sy: () => 0.6, yc: t => 0.08 * sm(0.4, 0.6, t), nl: 64 });
    b.cockpit(1.4, 3.0, 0.55, 0.45, 0.42);
    b.wing('wing', { root: [1.4, -0.1, -1.0], span: 5.0, cr: 3.4, ct: 1.2, sweep: -1.6, th: 0.05, dih: 0.04 }, [{ kind: 'aileron', c: 0.72, s0: 0.2, s1: 0.92, max: 0.4 }]);
    b.wing('wing', { root: [0.8, 0.0, 3.4], span: 1.6, cr: 1.6, ct: 0.5, sweep: 1.0, th: 0.04 });
    for (const s of [1, -1]){
      b.wing('paint', { root: [s * 1.2, 0.35, -3.4], span: 2.4, cr: 2.4, ct: 1.0, sweep: 1.6, th: 0.05, vertical: true, cant: -s * 0.45 }, [{ kind: 'rudder', c: 0.7, s0: 0.1, s1: 0.9, max: 0.3 }], false);
      b.nozzle(V(s * 0.75, 0.0, -6.45), 0.48, 0.9);
    }
    b.gear(V(0, -0.6, 3.2), 1.05, 0.28, 'back');
    for (const s of [1, -1]) b.gear(V(s * 1.3, -0.55, -1.6), 1.05, 0.32, 'in');
    lights(b, V(6.4, 0.1, -1.6), V(0, 0.2, -6.6), V(0, 0.65, 0), V(0, -0.65, 0));
    b.tips = [V(6.4, 0.1, 0.0), V(-6.4, 0.1, 0.0)];
    b.decals.push({ pos: V(1.65, 1.45, -4.4), w: 1.1, h: 1.1, side: 1 }, { pos: V(-1.65, 1.45, -4.4), w: 1.1, h: 1.1, side: -1 });
    b.booster = V(0, -1.1, -2);
    return { livery: 'future', size: 13.5 };
  },
};

function bizjet(b: Builder, vip: boolean){
  b.fuse('paint', { z0: -7.6, len: 15.4, r: prof(0.18, 1.12, 0.3, 0.8, 0.55), sy: () => 1.04, yc: t => 0.55 * (1 - sm(0, 0.3, t)) - 0.08 * sm(0.85, 1, t), nl: 64 });
  b.fuse('glass', { z0: 5.25, len: 1.25, r: t => Math.sin(Math.PI * t) ** 0.5, sx: () => 0.8, sy: () => 0.3, yc: () => 0.52, nl: 10, na: 20 });
  b.wing('wing', { root: [0.95, -0.7, 1.2], span: 6.2, cr: 3.4, ct: 0.95, sweep: 3.2, th: 0.1, dih: 0.07 },
    [{ kind: 'flap', c: 0.74, s0: 0.05, s1: 0.6, max: 0.55 }, { kind: 'aileron', c: 0.74, s0: 0.64, s1: 0.92, max: 0.35 }]);
  for (const s of [1, -1]) b.wing('wing', { root: [s * 7.1, -0.25, -2.3], span: 1.2, cr: 1.0, ct: 0.45, sweep: 0.7, th: 0.08, vertical: true, cant: -s * 0.2 }, [], false);
  for (const s of [1, -1]){
    b.turbofan(V(s * 1.75, 0.55, -4.6), 0.55, 2.6, vip ? 'metal' : 'white');
    b.wing('paint', { root: [s * 0.8, 0.45, -4.0], span: 0.75, cr: 1.4, ct: 1.2, sweep: 0.2, th: 0.1 }, [], false);
  }
  if (vip) b.turbofan(V(0, 1.55, -6.2), 0.5, 2.2, 'metal');
  b.wing('paint', { root: [0, 1.0, -5.0], span: 2.8, cr: 3.0, ct: 1.9, sweep: 2.4, th: 0.1, vertical: true }, [{ kind: 'rudder', c: 0.7, s0: 0.05, s1: 0.85, max: 0.3 }], false);
  b.wing('wing', { root: [0.2, 3.7, -7.4], span: 2.7, cr: 1.8, ct: 0.8, sweep: 1.2, th: 0.09, dih: 0.04 }, [{ kind: 'elevator', c: 0.66, s0: 0.05, s1: 0.95, max: 0.3 }]);   // đuôi chữ T
  b.gear(V(0, -0.85, 4.8), 1.0, 0.3, 'fwd', true);
  for (const s of [1, -1]) b.gear(V(s * 1.5, -0.85, -0.6), 1.05, 0.38, 'in');
  lights(b, V(7.1, -0.25, -1.9), V(0, 3.75, -9.0), V(0, 1.15, 0), V(0, -1.2, 1));
  b.tips = [V(7.25, 0.9, -2.9), V(-7.25, 0.9, -2.9)];
  b.decals.push({ pos: V(0, 2.4, -6.5), w: 1.7, h: 1.7, side: 1 }, { pos: V(0, 2.4, -6.5), w: 1.7, h: 1.7, side: -1 });
  b.booster = V(0, -1.4, -2);
  return { livery: (vip ? 'golden' : 'bizjet') as LiveryKind, size: 15.4 };
}

/* ------------------------------------------------------------ dựng */
const LOW_MAP: Record<Slot, 'paint' | 'dark' | 'metal' | null> = { paint: 'paint', wing: 'paint', white: 'paint', metal: 'metal', dark: 'dark', rubber: 'dark', glass: 'dark', cabin: 'dark', suit: 'dark', helmet: 'dark', glow: null, blur: null };

export function buildBlueprint(key: PlaneKey): Blueprint {
  const make = MAKERS[key] ?? MAKERS.fighter;
  const hi = new Builder(1), meta = make(hi);
  const bp = hi.build(key, meta.livery, meta.size, meta.retract ?? true, meta.prop ?? false);
  // bản xa: dựng lại với ít đỉnh hơn, gộp hết thành 3 vật liệu (1-3 lệnh vẽ)
  const lo = new Builder(0.32); make(lo);
  const loBp = lo.build(key, meta.livery, meta.size, true, false);
  const groups = new Map<'paint' | 'dark' | 'metal', THREE.BufferGeometry[]>();
  const put = (s: Slot, g: THREE.BufferGeometry, off?: THREE.Vector3) => { const k = LOW_MAP[s]; if (!k) return; const c = g.clone(); if (off) c.translate(off.x, off.y, off.z); const l = groups.get(k) ?? []; l.push(c); groups.set(k, l); };
  for (const [s, g] of Object.entries(loBp.statics)) put(s as Slot, g!);
  for (const m of loBp.movers) if (m.kind !== 'gear' && m.kind !== 'blur') for (const [s, g] of Object.entries(m.geos)) put(s as Slot, g!, m.pivot);
  const low: Blueprint['low'] = {};
  for (const [k, l] of groups) low[k] = mergeGeometries(l)!;
  return { ...bp, low };
}
