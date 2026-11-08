import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { F, PLANES, norm } from '../shared/game.ts';
import type { PlaneKey } from '../shared/game.ts';
import { buildBlueprint } from './aircraft.ts';
import type { Blueprint, MoverDef } from './aircraft.ts';
import { disposeMaterials, lightSprite, planeMaterials, sharedMaterials } from './livery.ts';
import type { PlaneMaterials, Slot } from './livery.ts';

// Quản lý model máy bay:
//  - Bản thiết kế dựng bằng code (aircraft.ts) tính MỘT lần cho mỗi loại rồi dùng chung hình học cho mọi máy bay cùng loại.
//  - Có file GLB chất lượng cao trong skyrace/models/ thì dùng thay (tên file = loại máy bay, vd fighter.glb, airliner.glb,
//    hoặc từ khoá như f16.glb, boeing.glb). Nạp một lần, cache, clone bằng SkeletonUtils cho từng người chơi,
//    có AnimationMixer phát động tác trong file. Thiếu file hay file lỗi thì tự dùng bản dựng bằng code, không làm hỏng game.
//  - LOD: gần thì vẽ bản chi tiết, xa thì bản đơn giản 1–3 lệnh vẽ.
//  - Hoạt ảnh máy bay: đứng chờ, cất cánh, bay, tăng tốc, Boost, nghiêng cánh, lộn vòng, xoay thùng, nhào vòng,
//    hạ cánh, va chạm, chiến thắng. Cánh, thân, động cơ, bánh đáp nằm chung một khung nên chuyển động không tách rời.
//  - dispose() trả lại vật liệu, texture riêng của từng chiếc; hình học dùng chung giữ trong cache (tối đa 10 loại).

/* ------------------------------------------------------ cache bản thiết kế */
const blueprints = new Map<PlaneKey, Blueprint>();
export function blueprint(k: PlaneKey){
  let b = blueprints.get(k);
  if (!b){ b = buildBlueprint(k); blueprints.set(k, b); }
  return b;
}
export function warmBlueprints(){ for (const p of PLANES) blueprint(p.key); }

/* ------------------------------------------------------------ file GLB */
interface GlbTemplate { scene: THREE.Object3D; clips: THREE.AnimationClip[]; scale: number; turn: number; offset: THREE.Vector3; box: THREE.Box3 }
const glbTemplates = new Map<PlaneKey, GlbTemplate>();
let loading: Promise<string[]> | null = null;
export const hasGlb = (k: PlaneKey) => glbTemplates.has(k);
// models.json (không bắt buộc): { "fighter.glb": { "turn": 180, "scale": 1.1 } } — xoay (độ) quanh trục đứng, phóng to
export function loadPlaneModels(): Promise<string[]> {
  return loading ??= (async () => {
    if (new URLSearchParams(location.search).has('nomodel')) return [];
    let files: string[] = [], conf: Record<string, { turn?: number; scale?: number }> = {};
    try { files = await (await fetch('/models/list.json')).json(); } catch { return []; }
    try { const r = await fetch('/models/models.json'); if (r.ok) conf = await r.json(); } catch { /* không có cũng được */ }
    const loader = new GLTFLoader(), done: string[] = [];
    for (const f of files){
      const base = norm(f.replace(/\.glb$/i, ''));
      const p = PLANES.find(x => norm(x.key) === base || x.words.includes(base));
      if (!p || glbTemplates.has(p.key)) continue;
      try {
        const g = await loader.loadAsync('/models/' + encodeURIComponent(f));
        glbTemplates.set(p.key, prepareGlb(g.scene, g.animations, blueprint(p.key).size, conf[f]));
        done.push(`${f} → ${p.name}`);
      } catch (e) { console.warn('Không đọc được model', f, e); }
    }
    return done;
  })();
}
function prepareGlb(scene: THREE.Object3D, clips: THREE.AnimationClip[], size: number, c?: { turn?: number; scale?: number }): GlbTemplate {
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene), dim = box.getSize(new THREE.Vector3());
  // đa số file để mũi theo trục dài nhất; trục X dài hơn Z thì xoay 90° cho mũi về +Z
  const turn = (c?.turn ?? (dim.x > dim.z ? -90 : 0)) * Math.PI / 180;
  const len = Math.abs(Math.sin(turn)) > 0.5 ? dim.x : dim.z;
  const scale = size / Math.max(0.01, len) * (c?.scale ?? 1);
  const offset = box.getCenter(new THREE.Vector3()).multiplyScalar(-1);
  scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ m.castShadow = true; m.frustumCulled = true; } });
  return { scene, clips, scale, turn, offset, box };
}

/* --------------------------------------------------- hình học dùng chung */
const flameGeo = new THREE.ConeGeometry(1, 1, 14, 1, true).rotateX(-Math.PI / 2).translate(0, 0, -0.5);
const diamondGeo = new THREE.SphereGeometry(1, 10, 8);
const boosterGeo = (() => {
  const g = new THREE.CylinderGeometry(0.35, 0.35, 3.2, 14).rotateX(Math.PI / 2);
  return g;
})();
const boosterNose = new THREE.ConeGeometry(0.35, 0.9, 14).rotateX(Math.PI / 2).translate(0, 0, 2.05);
const lightMats: Record<string, THREE.SpriteMaterial> = {};
const lightMat = (kind: string) => lightMats[kind] ??= new THREE.SpriteMaterial({ map: lightSprite(), color: new THREE.Color(kind === 'red' || kind === 'beacon' ? 0xff2a2a : kind === 'green' ? 0x2aff6a : 0xffffff).multiplyScalar(5), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false });

export type AnimState = 'idle' | 'takeoff' | 'flying' | 'accelerate' | 'boost' | 'banking' | 'roll' | 'barrel' | 'loop' | 'landing' | 'crash' | 'victory';
export type Maneuver = 'roll' | 'barrel' | 'loop' | 'crash' | 'victory';
const MAN_MS: Record<Maneuver, number> = { roll: 1000, barrel: 1600, loop: 2600, crash: 2200, victory: 3800 };
export interface RigInput {
  dt: number; t: number;
  speed: number;            // m/s
  throttle: number;         // 0 chạy không, 1 bay thường
  roll: number; pitch: number; yaw: number;   // lệnh lái -1..1 (để cánh liệng, cánh lái chuyển động theo)
  gear: number;             // 1 bánh hạ, 0 thu bánh
  ground: boolean;          // đang lăn trên đường băng
  mode: 'grid' | 'takeoff' | 'fly' | 'landing' | 'parked';
  flags: number;            // cờ F.* từ server
}
interface Flame { root: THREE.Group; outer: THREE.Mesh; core: THREE.Mesh; diamonds: THREE.Mesh[]; r: number; kind: 'jet' | 'fan' | 'prop' }
const ease = (x: number) => x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2;

/* --------------------------------------------------------------- PlaneRig */
export class PlaneRig {
  readonly root = new THREE.Group();      // main.ts đặt vị trí và hướng bay
  readonly body = new THREE.Group();      // các động tác nhào lộn quay khung này
  readonly key: PlaneKey;
  readonly size: number; readonly gearH: number; readonly prop: boolean;
  readonly exhaust: Blueprint['exhaust']; readonly tips: [THREE.Vector3, THREE.Vector3];
  state: AnimState = 'idle';
  private lod = new THREE.LOD();
  private mats: PlaneMaterials;
  private movers: { def: MoverDef; obj: THREE.Object3D; spin: number }[] = [];
  private flames: Flame[] = [];
  private outerMat: THREE.MeshBasicMaterial; private coreMat: THREE.MeshBasicMaterial;
  private lights: { s: THREE.Sprite; kind: string; base: number }[] = [];
  private booster: THREE.Group;
  private gear = 1; private retract: boolean;
  private man: { kind: Maneuver; t: number } | null = null;
  private mixer: THREE.AnimationMixer | null = null;
  private glbMats: THREE.Material[] = [];
  private glbProps: THREE.Object3D[] = [];
  private flameLen = 0.3;
  private tint = new THREE.Color();

  constructor(key: PlaneKey, color: number, num: string){
    this.key = key;
    const bp = blueprint(key), glb = glbTemplates.get(key);
    this.size = bp.size; this.gearH = bp.gearH; this.prop = bp.prop; this.retract = bp.retract;
    this.exhaust = bp.exhaust; this.tips = bp.tips;
    this.mats = planeMaterials(bp.livery, color, num);
    this.root.add(this.body); this.body.add(this.lod);
    const hi = glb ? this.fromGlb(glb, color) : this.fromBlueprint(bp);
    this.lod.addLevel(hi, 0);
    this.lod.addLevel(this.lowLevel(bp), Math.max(90, bp.size * 7));   // xa hơn ~100 m dùng bản đơn giản
    // lửa phản lực, vệt kim cương sóng xung kích
    this.outerMat = new THREE.MeshBasicMaterial({ color: 0xff8a2a, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });
    this.coreMat = new THREE.MeshBasicMaterial({ color: 0xfff2d0, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    for (const e of bp.exhaust){
      const g = new THREE.Group(); g.position.copy(e.pos);
      const outer = new THREE.Mesh(flameGeo, this.outerMat), core = new THREE.Mesh(flameGeo, this.coreMat);
      const diamonds: THREE.Mesh[] = [];
      for (let k = 0; k < 4; k++){ const d = new THREE.Mesh(diamondGeo, this.coreMat); d.visible = false; g.add(d); diamonds.push(d); }
      g.add(outer, core); this.body.add(g);
      this.flames.push({ root: g, outer, core, diamonds, r: e.r, kind: e.kind });
    }
    // đèn tín hiệu: đỏ cánh trái, xanh cánh phải, trắng đuôi, đèn chớp và đèn hiệu đỏ trên lưng, dưới bụng
    for (const l of bp.lights){
      const s = new THREE.Sprite(lightMat(l.kind)); s.position.copy(l.pos);
      const base = (l.kind === 'beacon' ? 0.45 : l.kind === 'strobe' ? 0.9 : 0.38) * Math.max(0.7, bp.size / 14);
      s.scale.setScalar(base); this.body.add(s); this.lights.push({ s, kind: l.kind, base });
    }
    // tên lửa đẩy gắn dưới bụng, chỉ hiện khi dùng skill 50 xu
    this.booster = new THREE.Group();
    const bm = new THREE.Mesh(boosterGeo, sharedMaterials().white!), bn = new THREE.Mesh(boosterNose, this.mats.slots.paint!);
    const bf = new THREE.Mesh(flameGeo, this.outerMat); bf.position.z = -1.6; bf.scale.set(0.6, 0.6, 6);
    this.booster.add(bm, bn, bf); this.booster.position.copy(bp.booster); this.booster.visible = false; this.body.add(this.booster);
  }

  private mesh(geo: THREE.BufferGeometry, slot: Slot){
    const m = new THREE.Mesh(geo, this.mats.slots[slot] ?? sharedMaterials().dark!);
    m.castShadow = slot !== 'glass' && slot !== 'blur' && slot !== 'glow';
    if (slot === 'glass' || slot === 'blur') m.renderOrder = 2;
    return m;
  }
  private fromBlueprint(bp: Blueprint){
    const g = new THREE.Group();
    for (const [slot, geo] of Object.entries(bp.statics)) g.add(this.mesh(geo!, slot as Slot));
    for (const def of bp.movers){
      const o = new THREE.Group(); o.position.copy(def.pivot);
      for (const [slot, geo] of Object.entries(def.geos)) o.add(this.mesh(geo!, slot as Slot));
      g.add(o); this.movers.push({ def, obj: o, spin: 0 });
    }
    const plane = new THREE.PlaneGeometry(1, 1);
    for (const d of bp.decals){
      const m = new THREE.Mesh(plane, this.mats.decal);
      m.scale.set(d.w, d.h, 1); m.rotation.y = d.side * Math.PI / 2; m.position.copy(d.pos).add(new THREE.Vector3(d.side * 0.09, 0, 0));
      g.add(m);
    }
    return g;
  }
  private lowLevel(bp: Blueprint){
    const g = new THREE.Group(), s = sharedMaterials();
    if (bp.low.paint) g.add(new THREE.Mesh(bp.low.paint, this.mats.slots.paint!));
    if (bp.low.dark) g.add(new THREE.Mesh(bp.low.dark, s.dark!));
    if (bp.low.metal) g.add(new THREE.Mesh(bp.low.metal, this.mats.slots.metal ?? s.metal!));
    return g;
  }
  private fromGlb(t: GlbTemplate, color: number){
    const inst = cloneSkinned(t.scene);
    this.tint.setHex(color);
    // sơn theo màu người chơi: chỉ đổi màu những vật liệu tên có chữ paint / body / livery / fuselage
    inst.traverse(o => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      const list = Array.isArray(m.material) ? m.material : [m.material];
      const out = list.map(mat => {
        if (!/paint|body|livery|fuselage|color/i.test(mat.name)) return mat;
        const c = mat.clone() as THREE.MeshStandardMaterial; if ('color' in c) c.color.copy(this.tint); this.glbMats.push(c); return c;
      });
      m.material = Array.isArray(m.material) ? out : out[0];
      if (/prop|propeller|rotor|fan|blade/i.test(o.name)) this.glbProps.push(o);
    });
    const holder = new THREE.Group(), turn = new THREE.Group();
    inst.position.copy(t.offset); turn.add(inst); turn.rotation.y = t.turn; turn.scale.setScalar(t.scale); holder.add(turn);
    if (t.clips.length){
      this.mixer = new THREE.AnimationMixer(inst);
      const idle = t.clips.find(c => /idle|fly|loop|prop/i.test(c.name)) ?? t.clips[0];
      this.mixer.clipAction(idle).play();
    }
    return holder;
  }

  /* ------------------------------------------------------- động tác */
  maneuver(kind: Maneuver){
    if (this.man && (this.man.kind === 'crash' || this.man.kind === 'victory') && kind !== 'crash') return;   // đang ngã, đang ăn mừng thì giữ
    this.man = { kind, t: 0 };
  }
  get busy(){ return !!this.man; }

  update(i: RigInput){
    const { dt, t, flags } = i;
    // bánh đáp thu / hạ từ từ, cánh tà hạ khi cất / hạ cánh
    const wantGear = this.retract ? i.gear : 1;
    this.gear += Math.sign(wantGear - this.gear) * Math.min(Math.abs(wantGear - this.gear), dt / 1.6);
    const flap = i.mode === 'fly' ? 0 : i.mode === 'parked' ? 0.2 : 0.6;
    const boostLv = flags & (F.SUPER | F.JET) ? 4 : flags & F.NITRO ? 3 : flags & F.ENGINE ? 2 : flags & F.BOOST ? 1 : 0;
    for (const m of this.movers){
      const d = m.def; let a = 0;
      switch (d.kind){
        case 'aileron': a = -i.roll * d.max; break;
        case 'elevator': a = i.pitch * d.max * d.side; break;
        case 'rudder': a = i.yaw * d.max; break;
        case 'flap': a = flap * d.max * d.side; break;
        case 'gear': a = (1 - this.gear) * d.max; m.obj.visible = this.gear > 0.02; break;
        case 'spin': case 'blur': {
          const rpm = (this.prop ? 14 : 10) + i.throttle * (this.prop ? 55 : 40) + boostLv * 10;
          m.spin += dt * rpm; a = m.spin;
          if (d.kind === 'blur') m.obj.visible = rpm > 30;
          break;
        }
      }
      m.obj.quaternion.setFromAxisAngle(d.axis, a);
    }
    for (const o of this.glbProps) o.rotation.z += dt * (12 + i.throttle * 50);
    this.mixer?.update(dt);

    // lửa phản lực theo mức tăng tốc
    const wantLen = boostLv >= 4 ? 3.2 : boostLv === 3 ? 2.6 : boostLv === 2 ? 2.0 : boostLv === 1 ? 1.5 : i.mode === 'grid' || i.mode === 'parked' ? 0.35 : 0.9 + i.throttle * 0.4;
    this.flameLen += (wantLen - this.flameLen) * Math.min(1, dt * 5);
    const hue = flags & F.JET ? 0.58 + 0.05 * Math.sin(t * 9) : flags & F.SUPER ? (t * 0.4) % 1 : boostLv === 3 ? 0.6 : boostLv === 2 ? 0.55 : 0.07;
    this.outerMat.color.setHSL(hue, 1, boostLv >= 3 ? 0.62 : 0.55).multiplyScalar(1.4 + boostLv * 0.25);   // vừa đủ loé, không trùm mất thân máy bay
    this.outerMat.opacity = 0.42 + Math.min(0.2, boostLv * 0.05);
    this.coreMat.color.setHSL(hue, 0.6, 0.85).multiplyScalar(1.8 + boostLv * 0.3);
    this.mats.glow.color.setHSL(boostLv >= 3 ? 0.58 : 0.06, 1, 0.35 + Math.min(0.35, this.flameLen * 0.06) + Math.random() * 0.05).multiplyScalar(3.5);
    for (const f of this.flames){
      const prop = f.kind === 'prop', on = !prop || boostLv >= 1;
      f.root.visible = on;
      if (!on) continue;
      const flick = 0.88 + Math.random() * 0.24, L = this.flameLen * (prop ? 0.5 : f.kind === 'fan' ? 0.7 : 1) * flick, R = f.r * (boostLv >= 3 ? 1.05 : 0.9);
      f.outer.scale.set(R, R, L * 1.8); f.core.scale.set(R * 0.5, R * 0.5, L * 1.0);
      // vệt "kim cương" sáng trong luồng phản lực khi đốt sau
      f.diamonds.forEach((d, k) => { d.visible = boostLv >= 3 && f.kind === 'jet'; if (d.visible){ d.position.z = -L * (0.35 + k * 0.42); d.scale.set(R * 0.42 * (1 - k * 0.18), R * 0.42 * (1 - k * 0.18), R * 0.9); } });
    }
    this.booster.visible = (flags & F.ROCKET) !== 0;
    if (this.booster.visible) this.booster.children[2].scale.set(0.7, 0.7, 6 + Math.random() * 2);
    // đèn: chớp trắng hai nháy mỗi 1,2 giây, đèn hiệu đỏ nhấp nháy, đèn hàng hải sáng đều
    for (const l of this.lights){
      let k = 1;
      if (l.kind === 'strobe'){ const p = (t % 1.2); k = p < 0.05 || (p > 0.15 && p < 0.2) ? 1 : 0; }
      else if (l.kind === 'beacon') k = 0.15 + 0.85 * Math.max(0, Math.sin(t * Math.PI * 1.6)) ** 6;
      l.s.visible = k > 0.02; l.s.scale.setScalar(l.base * (0.4 + k * 0.9));
    }
    this.animate(i);
  }

  // Động tác nhào lộn tác động lên khung thân (cả máy bay quay cùng nhau, không tách rời)
  private animate(i: RigInput){
    const b = this.body;
    b.position.set(0, 0, 0); b.rotation.set(0, 0, 0);
    if (this.man){
      const m = this.man, dur = MAN_MS[m.kind] / 1000;
      m.t += i.dt;
      const x = Math.min(1, m.t / dur);
      switch (m.kind){
        case 'roll': b.rotation.z = Math.PI * 2 * ease(x); break;
        case 'barrel': { const a = Math.PI * 2 * ease(x); b.rotation.z = a; b.position.set(Math.sin(a) * 4, (1 - Math.cos(a)) * 3, 0); break; }
        case 'loop': { const a = Math.PI * 2 * ease(x), R = this.size * 1.4; b.rotation.x = -a; b.position.set(0, R * (1 - Math.cos(a)), R * Math.sin(a)); break; }
        case 'crash': {
          const k = 1 - x;
          b.rotation.z = Math.PI * 5 * (1 - k * k); b.rotation.x = Math.sin(x * 18) * 0.35 * k;
          b.position.set(Math.sin(x * 11) * 1.5 * k, -Math.sin(Math.PI * x) * 6, 0);
          break;
        }
        case 'victory': {
          const loopEnd = 0.68;
          if (x < loopEnd){ const a = Math.PI * 2 * ease(x / loopEnd), R = this.size * 1.4; b.rotation.x = -a; b.position.set(0, R * (1 - Math.cos(a)), R * Math.sin(a)); }
          else b.rotation.z = Math.PI * 4 * ease((x - loopEnd) / (1 - loopEnd));
          break;
        }
      }
      this.state = m.kind;
      if (x >= 1) this.man = null;
      return;
    }
    const lv = i.flags & (F.SUPER | F.JET | F.NITRO | F.ROCKET) ? 2 : i.flags & (F.BOOST | F.ENGINE) ? 1 : 0;
    this.state = i.mode === 'grid' || i.mode === 'parked' ? 'idle' : i.mode === 'takeoff' ? 'takeoff' : i.mode === 'landing' ? 'landing'
      : lv === 2 ? 'boost' : lv === 1 ? 'accelerate' : Math.abs(i.roll) > 0.35 ? 'banking' : 'flying';
    // máy bay đang đứng chờ: động cơ chạy không, thân rung nhẹ
    if (this.state === 'idle') b.position.y = Math.sin(i.t * 31 + this.size) * 0.012;
  }

  setShadows(on: boolean){ this.root.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh && m.material !== this.outerMat && m.material !== this.coreMat) m.castShadow = on; }); }

  dispose(){
    this.root.removeFromParent();
    disposeMaterials(this.mats);
    this.outerMat.dispose(); this.coreMat.dispose();
    for (const m of this.glbMats) m.dispose();
    if (this.mixer){ this.mixer.stopAllAction(); this.mixer.uncacheRoot(this.mixer.getRoot()); this.mixer = null; }
  }
}
