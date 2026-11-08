import * as THREE from 'three';
import { ARCHETYPES, bossByKey } from '../shared/game.ts';
import type { BossDef } from '../shared/game.ts';
import type { BossPub } from '../shared/types.ts';
import { Cultivator } from './character.ts';
import { GlbActor, hasModel } from './glb.ts';
import { cloth, softTex } from './mats.ts';

// Boss 3D khổng lồ dựng bằng code theo 6 kiểu thân: rồng (thân rắn uốn lượn), mãnh thú 4 chân, hồ ly nhiều đuôi,
// rùa thần, chim thần, ma thần hình người. Hoạt ảnh: di chuyển, tấn công, gầm, thi pháp, trúng đòn, nổi giận, tử vong.
// Có models/<khoá boss>.glb thì dùng model đó.
const SPH = new THREE.SphereGeometry(1, 24, 18), CAP = new THREE.CapsuleGeometry(1, 1, 6, 14), CONE = new THREE.ConeGeometry(1, 1, 16), CYL = new THREE.CylinderGeometry(1, 1, 1, 14);
type P = BossPub['p'];

export class BossView {
  root = new THREE.Group();
  body = new THREE.Group();
  def: BossDef;
  private mats: THREE.MeshStandardMaterial[] = [];
  private accent: THREE.MeshStandardMaterial;
  private parts: Record<string, THREE.Object3D> = {};
  private segs: THREE.Object3D[] = [];
  private tails: THREE.Object3D[][] = [];
  private giant: Cultivator | null = null;
  private glb: GlbActor | null = null;
  private rageGlow: THREE.Sprite;
  private pose: P = 'idle'; private poseT = 0; private hitT = 0; private deadT = 0;
  x = 0; z = -4; ry = 0; tx = 0; tz = -4; tRy = 0; phase = 1;
  height = 10; private baseScale = 1;
  tgt = new THREE.Vector3();

  constructor(key: string) {
    this.def = bossByKey.get(key)!;
    const d = this.def;
    this.root.add(this.body);
    this.accent = new THREE.MeshStandardMaterial({ color: d.color2, emissive: d.color2, emissiveIntensity: 1.2, roughness: 0.3, metalness: 0.3 });
    if (hasModel(d.key)) { this.glb = new GlbActor(d.key, 0); this.body.add(this.glb.root); const hd = this.glb.root.getObjectByName('head'); if (hd) this.parts.head = hd; }
    else if (d.body === 'dragon') this.buildDragon();
    else if (d.body === 'beast' || d.body === 'fox') this.buildBeast(d.body === 'fox');
    else if (d.body === 'turtle') this.buildTurtle();
    else if (d.body === 'bird') this.buildBird();
    else this.buildGiant();
    this.rageGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex(), color: d.color2, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.35 }));
    this.rageGlow.scale.set(16, 14, 1); this.rageGlow.position.y = 5; this.root.add(this.rageGlow);
    this.root.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) m.castShadow = true; });
    // viền sáng màu phụ để Boss tối màu vẫn nổi trên nền
    for (const m of this.mats) { m.emissive.setHex(d.color2); m.emissiveIntensity = 0.04; m.color.multiplyScalar(0.82); }
    this.body.scale.setScalar(1.25); this.baseScale = 1.25;
  }
  private mat(color: number, o: { rough?: number; metal?: number; ei?: number; emissive?: number } = {}) {
    const m = new THREE.MeshStandardMaterial({ color, roughness: o.rough ?? 0.45, metalness: o.metal ?? 0.35, emissive: o.emissive ?? 0, emissiveIntensity: o.ei ?? 0 });
    this.mats.push(m); return m;
  }
  private m(geo: THREE.BufferGeometry, mat: THREE.Material, s: [number, number, number], pos: [number, number, number] = [0, 0, 0], rot: [number, number, number] = [0, 0, 0], parent: THREE.Object3D = this.body) {
    const x = new THREE.Mesh(geo, mat); x.scale.set(...s); x.position.set(...pos); x.rotation.set(...rot); parent.add(x); return x;
  }
  private eyes(head: THREE.Object3D, y: number, z: number, sx: number, r = 0.18) {
    const e = new THREE.MeshBasicMaterial({ color: this.def.color2 });
    for (const s of [-1, 1]) this.m(SPH, e, [r, r * 0.7, r * 0.6], [s * sx, y, z], [0, 0, 0], head);
  }

  /* ---------------------------------------------------------- rồng */
  private buildDragon() {
    const d = this.def, scale = this.mat(d.color, { metal: 0.5, rough: 0.35 }), belly = this.mat(new THREE.Color(d.color2).lerp(new THREE.Color(0xffffff), 0.3).getHex(), { rough: 0.5 });
    const N = 40;
    for (let i = 0; i < N; i++) {
      const g = new THREE.Group(), r = 1.45 * (1 - i / N * 0.78);
      this.m(SPH, scale, [r, r * 0.9, r * 1.35], [0, 0, 0], [0, 0, 0], g);
      this.m(SPH, belly, [r * 0.8, r * 0.6, r * 1.2], [0, -r * 0.35, 0], [0, 0, 0], g);
      if (i % 2 === 0) this.m(CONE, this.accent, [r * 0.25, r * 0.9, r * 0.5], [0, r * 1.05, 0], [-0.4, 0, 0], g);
      if (i === 5 || i === 13) for (const s of [-1, 1]) {
        const leg = this.m(CAP, scale, [0.28, 0.7, 0.28], [s * r * 0.9, -r * 0.7, 0], [0, 0, s * 0.8], g);
        for (let c = 0; c < 3; c++) this.m(CONE, this.accent, [0.07, 0.35, 0.07], [(c - 1) * 0.15, -0.75, 0.15], [0.8, 0, 0], leg);
      }
      this.body.add(g); this.segs.push(g);
    }
    const head = new THREE.Group(); this.body.add(head); this.parts.head = head;
    this.m(SPH, scale, [1.2, 1.0, 1.6], [0, 0, 0.3], [0, 0, 0], head);
    this.m(SPH, scale, [0.75, 0.55, 1.2], [0, -0.1, 1.6], [0, 0, 0], head);
    const jaw = new THREE.Group(); jaw.position.set(0, -0.45, 0.6); head.add(jaw); this.parts.jaw = jaw;
    this.m(SPH, belly, [0.65, 0.3, 1.25], [0, -0.1, 0.9], [0, 0, 0], jaw);
    for (let t = 0; t < 6; t++) this.m(CONE, this.mat(0xf5f0e0), [0.06, 0.25, 0.06], [(t % 2 ? 1 : -1) * 0.4, 0.15, 0.6 + Math.floor(t / 2) * 0.4], [Math.PI, 0, 0], jaw);
    for (const s of [-1, 1]) {
      this.m(CONE, this.mat(0xd4af37, { metal: 1, rough: 0.3 }), [0.18, 1.9, 0.18], [s * 0.6, 0.9, -0.5], [-1.1, 0, s * 0.35], head);
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(s * 0.5, -0.2, 2.2), new THREE.Vector3(s * 1.4, -0.4, 2.4), new THREE.Vector3(s * 2.2, -1.2, 1.6), new THREE.Vector3(s * 2.6, -2.2, 0.6)]);
      head.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.05, 5), this.accent));
    }
    for (let i = 0; i < 7; i++) this.m(CONE, this.accent, [0.18, 1.1, 0.18], [Math.sin(i) * 0.6, 0.8, -0.6 - i * 0.15], [-1.4, 0, Math.sin(i) * 0.4], head);
    this.eyes(head, 0.35, 1.15, 0.55, 0.2);
    this.height = 9;
  }

  /* ---------------------------------------------------------- mãnh thú / hồ ly */
  private buildBeast(fox: boolean) {
    const d = this.def, fur = this.mat(d.color, { metal: 0.1, rough: 0.7 }), dark = this.mat(new THREE.Color(d.color).multiplyScalar(0.35).getHex(), { rough: 0.6 });
    const torso = new THREE.Group(); torso.position.y = 4.2; this.body.add(torso); this.parts.torso = torso;
    this.m(CAP, fur, fox ? [1.3, 2.4, 1.3] : [1.8, 2.6, 1.8], [0, 0, 0], [Math.PI / 2, 0, 0], torso);
    this.m(SPH, fur, fox ? [1.5, 1.5, 1.6] : [2.2, 2.1, 2.0], [0, 0.3, 1.9], [0, 0, 0], torso);
    if (d.key === 'bachho') for (let i = 0; i < 6; i++) this.m(new THREE.TorusGeometry(1, 0.08, 6, 24, Math.PI), dark, [1.85, 1.85, 1.85], [0, 0, -1.6 + i * 0.75], [0, Math.PI / 2, Math.PI / 2], torso);
    if (d.key === 'kylan' || d.key === 'hondoncuthu' || d.key === 'thaothiet') for (let i = 0; i < 9; i++) this.m(CONE, this.accent, [0.25, 0.8, 0.25], [0, 1.9 - Math.abs(i - 4) * 0.1, -2 + i * 0.5], [-0.5, 0, 0], torso);
    const neck = new THREE.Group(); neck.position.set(0, 0.8, 3.0); torso.add(neck); this.parts.head = neck;
    this.m(SPH, fur, fox ? [0.95, 0.85, 1.2] : [1.4, 1.25, 1.5], [0, 0.4, 0.8], [0, 0, 0], neck);
    this.m(SPH, fur, fox ? [0.5, 0.4, 0.9] : [0.9, 0.7, 0.9], [0, 0.1, 2.0], [0, 0, 0], neck);
    const jaw = new THREE.Group(); jaw.position.set(0, -0.3, 1.5); neck.add(jaw); this.parts.jaw = jaw;
    this.m(SPH, dark, fox ? [0.4, 0.2, 0.7] : [0.75, 0.3, 0.8], [0, -0.1, 0.4], [0, 0, 0], jaw);
    for (const s of [-1, 1]) this.m(CONE, this.mat(0xf5f0e0), [0.1, 0.5, 0.1], [s * 0.35, -0.2, 0.6], [Math.PI, 0, 0], jaw);
    if (fox) for (const s of [-1, 1]) this.m(CONE, fur, [0.35, 1.0, 0.18], [s * 0.55, 1.4, 0.5], [0, 0, -s * 0.2], neck);
    else for (const s of [-1, 1]) this.m(SPH, fur, [0.35, 0.4, 0.15], [s * 0.9, 1.3, 0.3], [0, 0, 0], neck);
    for (let h = 0; h < (d.horns ?? 0); h++) this.m(CONE, this.mat(0xd4af37, { metal: 1, rough: 0.3 }), [0.18, 1.6, 0.18], [(h - (d.horns! - 1) / 2) * 0.6, 1.6, 0.6], [-0.6, 0, (h - (d.horns! - 1) / 2) * 0.3], neck);
    this.eyes(neck, 0.6, fox ? 1.85 : 2.1, fox ? 0.4 : 0.6, fox ? 0.14 : 0.2);
    // chân
    const legs: THREE.Group[] = [];
    for (const [sx, sz] of [[1, 1.8], [-1, 1.8], [1, -1.8], [-1, -1.8]]) {
      const up = new THREE.Group(); up.position.set(sx * (fox ? 1.0 : 1.4), -0.6, sz); torso.add(up);
      this.m(CAP, fur, fox ? [0.45, 1.2, 0.45] : [0.65, 1.3, 0.65], [0, -1.0, 0], [0, 0, 0], up);
      const lo = new THREE.Group(); lo.position.y = -2.0; up.add(lo);
      this.m(CAP, fur, fox ? [0.35, 0.9, 0.35] : [0.5, 0.9, 0.5], [0, -0.7, 0], [0, 0, 0], lo);
      this.m(SPH, dark, fox ? [0.45, 0.25, 0.6] : [0.65, 0.3, 0.8], [0, -1.5, 0.2], [0, 0, 0], lo);
      up.userData.lo = lo; legs.push(up);
    }
    this.segs = legs;
    // đuôi: hồ ly nhiều đuôi xoè, mãnh thú một đuôi
    const nT = fox ? (d.tails ?? 9) : 1;
    for (let k = 0; k < nT; k++) {
      const chain: THREE.Object3D[] = [];
      let parent: THREE.Object3D = torso;
      const base = new THREE.Group(); base.position.set(0, 0.6, -2.8); base.rotation.set(-0.6, (k - (nT - 1) / 2) * (fox ? 0.32 : 0), 0); torso.add(base); parent = base;
      for (let i = 0; i < 7; i++) {
        const sgm = new THREE.Group(); sgm.position.z = i === 0 ? 0 : -0.75; parent.add(sgm);
        const r = fox ? 0.55 * (1 - i / 9) + 0.15 : 0.3 * (1 - i / 9);
        this.m(SPH, fox ? cloth(i > 4 ? d.color2 : d.color, i > 4 ? d.color2 : 0, 0.02) : fur, [r, r, 0.6], [0, 0, -0.3], [0, 0, 0], sgm);
        chain.push(sgm); parent = sgm;
      }
      this.tails.push(chain);
    }
    this.height = fox ? 8 : 9;
  }

  /* ---------------------------------------------------------- rùa thần */
  private buildTurtle() {
    const d = this.def, shell = this.mat(d.color, { metal: 0.4, rough: 0.35 }), skin = this.mat(new THREE.Color(d.color).lerp(new THREE.Color(0x8fd0c0), 0.4).getHex(), { rough: 0.6 });
    const torso = new THREE.Group(); torso.position.y = 2.4; this.body.add(torso); this.parts.torso = torso;
    this.m(new THREE.SphereGeometry(1, 28, 18, 0, Math.PI * 2, 0, Math.PI / 2), shell, [4.2, 3.0, 4.8], [0, 0.2, 0], [0, 0, 0], torso);
    this.m(CYL, skin, [4.2, 0.4, 4.8], [0, 0, 0], [0, 0, 0], torso);
    for (let i = 0; i < 14; i++) { const a = i * 2.4, r = 1 + (i % 3) * 1.1; this.m(new THREE.CylinderGeometry(1, 1, 0.1, 6), this.accent, [0.55, 1, 0.55], [Math.sin(a) * r, 2.4 + 0.6 - r * 0.45, Math.cos(a) * r], [-Math.cos(a) * r * 0.2, 0, Math.sin(a) * r * 0.2], torso); }
    const neck = new THREE.Group(); neck.position.set(0, 0.6, 4.4); torso.add(neck); this.parts.head = neck;
    this.m(CAP, skin, [0.7, 1.2, 0.7], [0, 0.6, 0.6], [1.0, 0, 0], neck);
    this.m(SPH, skin, [1.0, 0.8, 1.3], [0, 1.2, 1.8], [0, 0, 0], neck);
    const jaw = new THREE.Group(); jaw.position.set(0, 0.9, 2.2); neck.add(jaw); this.parts.jaw = jaw;
    this.m(SPH, skin, [0.75, 0.25, 0.8], [0, -0.1, 0.3], [0, 0, 0], jaw);
    this.eyes(neck, 1.5, 2.8, 0.55);
    const legs: THREE.Group[] = [];
    for (const [sx, sz] of [[1, 2.8], [-1, 2.8], [1, -2.8], [-1, -2.8]]) {
      const up = new THREE.Group(); up.position.set(sx * 3.4, -0.4, sz); torso.add(up);
      this.m(CAP, skin, [0.9, 1.0, 0.9], [0, -1.0, 0], [0, 0, sx * 0.3], up);
      up.userData.lo = up; legs.push(up);
    }
    this.segs = legs;
    // rắn quấn trên mai
    const chain: THREE.Object3D[] = []; let parent: THREE.Object3D = torso;
    const base = new THREE.Group(); base.position.set(0, 1.0, -4.4); torso.add(base); parent = base;
    for (let i = 0; i < 14; i++) { const s = new THREE.Group(); s.position.z = i ? -0.8 : 0; parent.add(s); this.m(SPH, this.accent, [0.45 - i * 0.02, 0.45 - i * 0.02, 0.6], [0, 0, -0.3], [0, 0, 0], s); chain.push(s); parent = s; }
    this.tails.push(chain);
    this.height = 7;
  }

  /* ---------------------------------------------------------- chim thần */
  private buildBird() {
    const d = this.def, feather = this.mat(d.color, { metal: 0.3, rough: 0.4, emissive: d.color, ei: 0.15 }), light = this.mat(d.color2, { emissive: d.color2, ei: 0.6, rough: 0.4 });
    const torso = new THREE.Group(); torso.position.y = 6; this.body.add(torso); this.parts.torso = torso;
    this.m(SPH, feather, [1.5, 1.5, 2.6], [0, 0, 0], [0, 0, 0], torso);
    const neck = new THREE.Group(); neck.position.set(0, 1.0, 2.2); torso.add(neck); this.parts.head = neck;
    this.m(CAP, feather, [0.6, 0.9, 0.6], [0, 0.6, 0.3], [0.7, 0, 0], neck);
    this.m(SPH, feather, [0.85, 0.85, 1.0], [0, 1.4, 1.0], [0, 0, 0], neck);
    this.m(CONE, this.mat(0xd4af37, { metal: 1, rough: 0.3 }), [0.3, 1.3, 0.35], [0, 1.25, 2.2], [Math.PI / 2 + 0.3, 0, 0], neck);
    for (let i = 0; i < 5; i++) this.m(CONE, light, [0.12, 1.2, 0.12], [0, 2.1, 0.6 - i * 0.3], [-0.9 - i * 0.15, 0, 0], neck);
    this.eyes(neck, 1.6, 1.85, 0.45, 0.13);
    const jaw = new THREE.Group(); neck.add(jaw); this.parts.jaw = jaw;
    // cánh: 3 khớp, mỗi khớp một hàng lông vũ
    for (const s of [-1, 1]) {
      const w1 = new THREE.Group(); w1.position.set(s * 1.2, 0.6, 0.3); torso.add(w1);
      let par: THREE.Group = w1;
      for (let j = 0; j < 3; j++) {
        const seg = new THREE.Group(); seg.position.x = j ? s * 2.4 : 0; par.add(seg);
        this.m(CAP, feather, [0.3, 1.2, 0.3], [s * 1.2, 0, 0], [0, 0, Math.PI / 2], seg);
        for (let f = 0; f < 5; f++) this.m(new THREE.BoxGeometry(1, 1, 1), f > 2 ? light : feather, [0.5, 0.08, 2.4 + j * 0.6 - f * 0.1], [s * (0.3 + f * 0.48), -0.1, -1.2 - j * 0.3], [0, s * (0.1 + f * 0.08), 0], seg);
        par = seg;
      }
      this.tails.push([w1, w1.children[0] as THREE.Object3D]);
      w1.userData.side = s;
    }
    for (let f = 0; f < 7; f++) this.m(new THREE.BoxGeometry(1, 1, 1), f % 2 ? light : feather, [0.5, 0.08, 4.2], [(f - 3) * 0.45, -0.2, -4.0], [0.2, (f - 3) * 0.13, 0], torso);
    for (const s of [-1, 1]) { const leg = this.m(CAP, this.mat(0x3a2a1a), [0.22, 1.0, 0.22], [s * 0.6, -2.0, 0.3], [0.4, 0, 0], torso); for (let c = 0; c < 3; c++) this.m(CONE, this.accent, [0.08, 0.5, 0.08], [(c - 1) * 0.2, -1.2, 0.3], [1.2, 0, 0], leg); }
    this.height = 10;
  }

  /* ---------------------------------------------------------- ma thần hình người */
  private buildGiant() {
    const d = this.def;
    const archCls: Record<string, string> = { maton: 'mavuong', thienma: 'mavuong', huyetma: 'matu', thienloithan: 'loitu', cuuthienhuyennu: 'tiennu' };
    const female = d.key === 'cuuthienhuyennu';
    const arch = ARCHETYPES.find(a => a.cls === (archCls[d.key] ?? 'mavuong') && a.female === female) ?? ARCHETYPES[0];
    this.giant = new Cultivator(arch.id, { scale: 4.6, colors: { robe: d.color, trim: d.color2 }, noLabel: true });
    this.giant.setInfo('', 59, '', true);
    this.body.add(this.giant.root);
    this.height = 9;
  }

  /* ---------------------------------------------------------- cập nhật */
  set(p: BossPub) {
    this.tx = p.x; this.tz = p.z; this.tRy = p.ry;
    if (p.p !== this.pose) { this.pose = p.p; this.poseT = 0; }
    this.phase = p.phase;
  }
  flash() { this.hitT = 0.2; }
  headPos(out = new THREE.Vector3()) {
    const h = this.parts.head;
    if (h) return h.getWorldPosition(out);
    return out.set(this.x, this.height * 0.75, this.z);
  }
  update(dt: number, t: number, cam: THREE.Camera) {
    const k = 1 - Math.exp(-dt * 3);
    this.x += (this.tx - this.x) * k; this.z += (this.tz - this.z) * k;
    let dr = this.tRy - this.ry; dr = Math.atan2(Math.sin(dr), Math.cos(dr)); this.ry += dr * Math.min(1, dt * 3);
    this.root.position.set(this.x, 0, this.z); this.body.rotation.y = this.ry;
    this.poseT += dt; this.hitT = Math.max(0, this.hitT - dt);
    const p = this.pose, pt = this.poseT;
    // nổi giận / giai đoạn 3: rực sáng, to hơn
    const rage = this.phase >= 3 || p === 'rage';
    const gm = this.rageGlow.material as THREE.SpriteMaterial;
    gm.opacity = (this.phase >= 3 ? 0.55 : this.phase === 2 ? 0.3 : 0.15) + Math.sin(t * 6) * 0.08;
    this.accent.emissiveIntensity = (rage ? 2.6 : 1.2) + Math.sin(t * 5) * 0.3;
    const ec = new THREE.Color(this.def.color2);
    for (const m of this.mats) { if (this.hitT > 0) m.emissive.setRGB(1, 0.4, 0.4); else m.emissive.copy(ec); m.emissiveIntensity = this.hitT > 0 ? this.hitT * 4 : (rage ? 0.18 : 0.04); }
    const s = (rage ? 1.08 : 1) * this.baseScale;
    this.body.scale.lerp(new THREE.Vector3(s, s, s), dt * 2);
    if (p === 'die') {
      this.deadT += dt;
      this.body.rotation.z = Math.min(1.3, this.deadT * 0.8); this.body.position.y = -Math.max(0, this.deadT - 1.2) * 2.5;
      gm.opacity = Math.max(0, 0.8 - this.deadT * 0.3);
      if (this.giant) this.giant.update(dt, t, cam);
      return;
    }
    this.deadT = 0; this.body.rotation.z = 0; this.body.position.y = 0;
    if (this.glb) { this.glb.play(p === 'move' ? 'move' : p); this.glb.update(dt); return; }
    if (this.giant) {
      this.giant.setPose(p === 'atk' ? 'atk' : p === 'cast' || p === 'roar' || p === 'rage' ? 'cast' : p === 'hit' ? 'hit' : p === 'move' ? 'move' : 'idle');
      this.giant.update(dt, t, cam);
      this.giant.root.position.y = 0.6 + Math.sin(t * 1.2) * 0.4;   // ma thần lơ lửng
      return;
    }
    const jaw = this.parts.jaw, head = this.parts.head;
    const open = p === 'roar' || p === 'rage' ? 0.7 : p === 'cast' ? 0.5 : p === 'atk' ? 0.4 * Math.sin(Math.min(1, pt / 0.6) * Math.PI) : 0.05 + Math.sin(t * 2) * 0.03;
    if (jaw) jaw.rotation.x = open;
    const lunge = p === 'atk' ? Math.sin(Math.min(1, pt / 0.7) * Math.PI) : 0;
    if (this.def.body === 'dragon') {
      // thân rắn uốn lượn sau đầu, đầu lơ lửng nhìn mục tiêu
      const hy = 7 + Math.sin(t * 0.8) * 0.8 - lunge * 3 + (p === 'roar' || p === 'rage' ? 1.5 : 0);
      head.position.set(0, hy, 2 + lunge * 5);
      head.rotation.set(lunge * 0.5 - (p === 'roar' ? 0.5 : 0) + 0.15, Math.sin(t * 0.7) * 0.2, 0);
      let prev = head.position.clone();
      const wave = t * 1.6;
      this.segs.forEach((sg, i) => {
        const u = i + 1;
        const pos = new THREE.Vector3(Math.sin(u * 0.25 - wave) * (1.5 + u * 0.14), hy - 0.3 - u * 0.09 + Math.sin(u * 0.34 - wave * 1.2) * 1.4, 1.4 - u * 0.78);
        // cuộn vòng quanh tâm ở nửa sau thân
        if (u > 19) { const a = Math.PI + (u - 19) * 0.29, k = Math.min(1, (u - 19) / 4); const lx = pos.x, ly = pos.y; pos.set(lx * (1 - k) + Math.sin(a) * 5.5 * k, ly * (1 - k) + (2.5 + Math.sin(u * 0.4 - wave) * 0.8) * k, -7.9 + Math.cos(a) * 5.5); }
        sg.position.copy(pos);
        sg.lookAt(this.body.localToWorld(prev.clone()));
        prev = pos;
      });
    } else if (this.def.body === 'bird') {
      const torso = this.parts.torso;
      torso.position.y = 6 + Math.sin(t * 2.2) * 0.6 - lunge * 2.5; torso.rotation.x = lunge * 0.4;
      const flap = Math.sin(t * (p === 'move' || p === 'atk' ? 7 : 3.5)) * (p === 'roar' || p === 'cast' ? 0.9 : 0.6);
      for (const [w1, w2] of this.tails) { const sd = w1.userData.side as number; w1.rotation.z = sd * flap; w1.children.forEach((c, j) => { if (j === 0) return; c.rotation.z = sd * flap * 0.3; }); void w2; }
      head.rotation.x = p === 'roar' ? -0.6 : lunge * 0.6;
    } else {
      // 4 chân: đi, vồ (thân chúi tới), gầm (ngẩng đầu)
      const torso = this.parts.torso;
      const walk = p === 'move' ? t * 6 : 0;
      this.segs.forEach((leg, i) => { const sw = p === 'move' ? Math.sin(walk + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI / 2 : 0)) * 0.5 : 0; leg.rotation.x = sw - (i < 2 ? lunge * 0.9 : -lunge * 0.3); (leg.userData.lo as THREE.Object3D).rotation.x = Math.max(0, -sw) * 0.6 + (i < 2 ? lunge * 0.8 : 0); });
      torso.rotation.x = -lunge * 0.25 + (p === 'roar' || p === 'rage' ? -0.12 : 0);
      torso.position.z = lunge * 2.5;
      torso.position.y = (this.def.body === 'turtle' ? 2.4 : 4.2) + Math.sin(t * 1.5) * 0.08;
      head.rotation.x = p === 'roar' || p === 'rage' ? -0.6 : p === 'cast' ? -0.3 : lunge * 0.3 + Math.sin(t) * 0.05;
      head.rotation.y = Math.sin(t * 0.6) * 0.15;
      this.tails.forEach((chain, k) => chain.forEach((sg, i) => { sg.rotation.y = Math.sin(t * 2 + i * 0.5 + k) * 0.18; sg.rotation.x = Math.sin(t * 1.4 + i * 0.4 + k * 0.7) * 0.08 + (this.tails.length > 1 ? 0.06 : -0.05); }));
    }
  }
  dispose() { this.glb?.dispose(); this.giant?.dispose(); for (const m of this.mats) m.dispose(); this.accent.dispose(); (this.rageGlow.material as THREE.SpriteMaterial).dispose(); this.root.removeFromParent(); }
}
