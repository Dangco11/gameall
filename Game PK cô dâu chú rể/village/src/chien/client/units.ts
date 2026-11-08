import * as THREE from 'three';
import { UNITS } from '../config/UnitConfig.ts';
import type { SkillKey, UnitDef, UnitKind } from '../config/UnitConfig.ts';
import { FLAG, STATE_CODES, TEAM_INFO, UNIT_STRIDE } from '../types.ts';
import type { TeamKey, UnitInfo, UnitState } from '../types.ts';
import type { ModelLibrary } from './models.ts';

// Bộ vẽ quân bằng GPU instancing: mọi bộ phận (hộp, cầu, trụ, nón...) của mọi quân dùng chung vài InstancedMesh,
// nên 300 quân vẫn chỉ khoảng 12 lượt vẽ. Mỗi khung hình tính lại ma trận các bộ phận theo hoạt ảnh.
// Quân ngoài khung hình bị bỏ qua (frustum culling); quân ở xa bớt chi tiết nhỏ và hoạt ảnh nhịp thưa (LOD).
// Loại quân nào có file model .glb (xem models.ts) thì vẽ bằng model đó thay cho model dựng sẵn.

export interface CUnit {
  id: number; info: UnitInfo; def: UnitDef; team: TeamKey;
  px: number; pz: number; py: number; pyaw: number;          // khung trước
  x: number; z: number; y: number; yaw: number;              // khung mới nhất
  rx: number; rz: number; ry: number; ryaw: number;          // vị trí đang vẽ (nội suy)
  hp: number; state: UnitState; flags: number; stateAt: number; seen: number;
  atkAt: number; atkV: number; hitAt: number; spawnAt: number; deadAt: number; killAt: number;
  skill: SkillKey | ''; skillAt: number; odo: number; seed: number; lod: number; visible: boolean; dmgAt: number; speed: number;
}

const ANCHOR: Record<UnitKind, number> = { danbinh: 1.75, xathu: 1.95, dausi: 2.3, xechien: 2.5, trau: 3.1, voi: 5.4 };
const CULL_R: Record<UnitKind, number> = { danbinh: 1.1, xathu: 1.2, dausi: 1.4, xechien: 1.8, trau: 2.3, voi: 4 };
export const anchorHeight = (k: UnitKind) => ANCHOR[k];

class Pool {
  readonly mesh: THREE.InstancedMesh; n = 0; readonly cap: number;
  constructor(geo: THREE.BufferGeometry, mat: THREE.Material, cap: number, shadow: boolean){
    this.cap = cap;
    this.mesh = new THREE.InstancedMesh(geo, mat, cap);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false; this.mesh.castShadow = shadow; this.mesh.receiveShadow = false;
    this.mesh.setColorAt(0, new THREE.Color(1, 1, 1)); this.mesh.count = 0;
  }
  push(m: THREE.Matrix4, c: THREE.Color){ if (this.n >= this.cap) return; this.mesh.setMatrixAt(this.n, m); this.mesh.setColorAt(this.n, c); this.n++; }
  end(){ this.mesh.count = this.n; this.mesh.instanceMatrix.needsUpdate = true; if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true; this.n = 0; }
}

const _v = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _e = new THREE.Euler(), _c = new THREE.Color(), _white = new THREE.Color(1, 1, 1), _hp = new THREE.Vector3();
const _t = new THREE.Matrix4(), _m = new THREE.Matrix4(), _root = new THREE.Matrix4(), _upright = new THREE.Matrix4();
const M = Array.from({ length: 14 }, () => new THREE.Matrix4());     // ma trận khớp tạm (hông, vai, đầu, vòi...)
const L = (x: number, y: number, z: number, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) => _t.compose(_v.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
const S = (x: number, y: number, z: number, sx: number, sy: number, sz: number) => _t.compose(_v.set(x, y, z), _q.identity(), _s.set(sx, sy, sz));
const PI = Math.PI;

type PoolKey = 'box' | 'sph' | 'cyl' | 'frus' | 'cone' | 'tor' | 'band' | 'glow' | 'ring' | 'bar';
let flash = 0;                                                       // 0..1: vừa trúng đòn thì sáng trắng lên
const col = (hex: number) => { _c.setHex(hex); if (flash > 0) _c.lerp(_white, flash); return _c; };
const hash = (n: number) => { n = Math.imul(n ^ 0x9e3779b9, 0x85ebca6b); n ^= n >>> 13; n = Math.imul(n, 0xc2b2ae35); return ((n ^ (n >>> 16)) >>> 0) / 4294967296; };

interface Pose { legL: number; legR: number; armL: number; armR: number; armLz: number; armRz: number; bend: number; bob: number; sit: boolean; head: number; spin: number }
const pose = (): Pose => ({ legL: 0, legR: 0, armL: 0.05, armR: 0.05, armLz: 0.15, armRz: -0.15, bend: 0, bob: 0, sit: false, head: 0, spin: 0 });
interface Look {
  skin: number; shirt: number; sleeve: number; pants: number; boots: number; hair: number;
  hairStyle: 'bun' | 'short'; hat: 'non' | 'khan' | 'helm' | 'turban' | 'none'; hatColor: number; team: number;
  armor: boolean; ragged: boolean; cheeks: boolean; angry: boolean; belt: number; skirt: number;
}
const SKINS = [0xf2c9a4, 0xeab994, 0xe3ad86, 0xf5d3b6];
const HONOR = [0xffc83a, 0xdfe8ff, 0xe08a4a, 0xb07aff];           // hào quang top 1 vàng, top 2 bạc, top 3 đồng, top 4–20 tím

export class UnitRenderer {
  readonly group = new THREE.Group();
  readonly units = new Map<number, CUnit>();
  frameAt = 0; tickMs = 100; drawn = 0; culled = 0;
  winner: TeamKey | 'draw' | '' = '';
  models: ModelLibrary | null = null;
  honor = new Map<string, number>();                               // chủ quân → hạng BXH lực chiến tháng
  private P: Record<PoolKey, Pool>;
  private frustum = new THREE.Frustum(); private pm = new THREE.Matrix4(); private sphere = new THREE.Sphere();
  private camPos = new THREE.Vector3();
  private quat = new THREE.Quaternion();
  private lastNow = 0; private dt = 0.016;

  constructor(shadows: boolean){
    const solid = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.02 });
    const shiny = new THREE.MeshStandardMaterial({ roughness: 0.32, metalness: 0.75 });   // vàng, đồng, sắt
    const basic = (o: THREE.MeshBasicMaterialParameters) => new THREE.MeshBasicMaterial({ toneMapped: false, ...o });
    this.P = {
      box: new Pool(new THREE.BoxGeometry(1, 1, 1), solid, 9000, shadows),
      sph: new Pool(new THREE.SphereGeometry(0.5, 16, 12), solid, 11000, shadows),
      cyl: new Pool(new THREE.CylinderGeometry(0.5, 0.5, 1, 14), solid, 9000, shadows),
      frus: new Pool(new THREE.CylinderGeometry(0.4, 0.5, 1, 14), solid, 2400, shadows),
      cone: new Pool(new THREE.ConeGeometry(0.5, 1, 16), solid, 5000, shadows),
      tor: new Pool(new THREE.TorusGeometry(0.5, 0.14, 8, 18, Math.PI), solid, 1200, shadows),
      band: new Pool(new THREE.TorusGeometry(0.5, 0.1, 8, 24), solid, 3000, shadows),
      glow: new Pool(new THREE.OctahedronGeometry(0.5, 0), basic({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }), 900, false),
      ring: new Pool(new THREE.RingGeometry(0.78, 1, 28).rotateX(-Math.PI / 2), basic({ transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide }), 800, false),
      bar: new Pool(new THREE.PlaneGeometry(1, 1), basic({ transparent: true, depthWrite: false, depthTest: false }), 900, false),
    };
    this.gold = new Pool(new THREE.BoxGeometry(1, 1, 1), shiny, 3000, shadows);
    this.goldSph = new Pool(new THREE.SphereGeometry(0.5, 12, 8), shiny, 2400, shadows);
    this.goldCone = new Pool(new THREE.ConeGeometry(0.5, 1, 10), shiny, 1200, shadows);
    this.goldBand = new Pool(new THREE.TorusGeometry(0.5, 0.1, 8, 24), shiny, 1500, shadows);
    this.P.bar.mesh.renderOrder = 20; this.P.ring.mesh.renderOrder = 2;
    for (const p of [...Object.values(this.P), this.gold, this.goldSph, this.goldCone, this.goldBand]) this.group.add(p.mesh);
  }
  private gold: Pool; private goldSph: Pool; private goldCone: Pool; private goldBand: Pool;

  /* ------------------------------------------------------------ dữ liệu */
  add(info: UnitInfo, x: number, z: number, now: number){
    let u = this.units.get(info.id);
    if (!u){
      const def = UNITS[info.kind];
      u = { id: info.id, info, def, team: info.team, px: x, pz: z, py: 0, pyaw: 0, x, z, y: 0, yaw: info.team === 'trai' ? PI / 2 : -PI / 2, rx: x, rz: z, ry: 0, ryaw: 0,
        hp: info.maxHp, state: 'spawn', flags: 0, stateAt: now, seen: 0, atkAt: -1e9, atkV: 0, hitAt: -1e9, spawnAt: now, deadAt: 0, killAt: -1e9, skill: '', skillAt: -1e9, odo: 0, seed: hash(info.id), lod: 0, visible: false, dmgAt: -1e9, speed: 0 };
      u.pyaw = u.ryaw = u.yaw;
      this.units.set(info.id, u);
    } else u.info = info;
    return u;
  }
  // Áp khung mới từ server; trả về số quân chưa biết thông tin (khi lỡ mất tin xuất hiện)
  applyFrame(arr: number[], tick: number, now: number){
    let unknown = 0;
    for (let i = 0; i < arr.length; i += UNIT_STRIDE){
      const u = this.units.get(arr[i]);
      if (!u){ unknown++; continue; }
      u.px = u.rx; u.pz = u.rz; u.py = u.ry; u.pyaw = u.ryaw;
      u.x = arr[i + 1] / 100; u.z = arr[i + 2] / 100; u.y = arr[i + 3] / 100; u.yaw = arr[i + 4] / 100;
      u.hp = arr[i + 5];
      const st = STATE_CODES[arr[i + 6]] ?? 'move';
      if (st !== u.state){ u.state = st; u.stateAt = now; if (st === 'dead') u.deadAt = now; }
      u.flags = arr[i + 7]; u.seen = tick;
    }
    for (const [id, u] of this.units) if (u.seen !== tick && now - u.spawnAt > 400) this.units.delete(id);   // server đã xóa
    this.frameAt = now;
    return unknown;
  }
  clear(){ this.units.clear(); }

  /* ------------------------------------------------------------ vẽ */
  draw(camera: THREE.PerspectiveCamera, now: number){
    this.dt = Math.min(0.1, Math.max(0.001, (now - this.lastNow) / 1000)); this.lastNow = now;
    const a = Math.min(1, Math.max(0, (now - this.frameAt) / this.tickMs));
    this.pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); this.frustum.setFromProjectionMatrix(this.pm);
    camera.getWorldPosition(this.camPos); this.quat.copy(camera.quaternion);
    this.drawn = this.culled = 0;
    this.models?.beginFrame();
    for (const u of this.units.values()){
      const ox = u.rx, oz = u.rz;
      u.rx = u.px + (u.x - u.px) * a; u.rz = u.pz + (u.z - u.pz) * a; u.ry = u.py + (u.y - u.py) * a; u.ryaw = lerpAngle(u.pyaw, u.yaw, a);
      const step = Math.hypot(u.rx - ox, u.rz - oz);
      u.odo += step; u.speed += (step / this.dt - u.speed) * 0.2;
      this.sphere.center.set(u.rx, 1, u.rz); this.sphere.radius = CULL_R[u.info.kind];
      u.visible = this.frustum.intersectsSphere(this.sphere);
      if (!u.visible){ this.culled++; continue; }
      const d = this.camPos.distanceTo(this.sphere.center);
      u.lod = d < 34 ? 0 : d < 70 ? 1 : 2;
      this.drawUnit(u, now);
      this.drawn++;
    }
    for (const p of [...Object.values(this.P), this.gold, this.goldSph, this.goldCone, this.goldBand]) p.end();
    this.models?.endFrame();
  }

  private drawUnit(u: CUnit, now: number){
    // hoạt ảnh quân ở xa chạy nhịp 12 khung/giây cho đỡ tốn
    const t = (u.lod === 2 ? Math.floor(now / 83) * 83 : now) / 1000 + u.seed * 10;
    flash = now - u.hitAt < 110 ? 0.55 : 0;
    const dead = u.state === 'dead', dt = (now - u.deadAt) / 1000;
    const born = Math.min(1, (now - u.spawnAt) / 650), grow = born < 1 ? Math.max(0.05, 1 - Math.pow(1 - born, 3) * Math.cos(born * 9)) : 1;
    const fall = dead ? Math.min(1, dt / 0.45) : 0, sink = dead ? Math.max(0, dt - 0.7) * 1.2 : 0;
    const side = u.seed > 0.5 ? 1 : -1;
    _root.compose(_v.set(u.rx, u.ry - sink, u.rz), _q.setFromEuler(_e.set(0, u.ryaw, fall * 1.45 * side, 'YXZ')), _s.setScalar(grow));
    const tc = TEAM_INFO[u.team].color;
    // vòng màu phe dưới chân (boss có vòng kép nhấp nháy)
    if (!dead){
      const r = u.def.radius * 1.25 * grow;
      this.P.ring.push(_m.compose(_v.set(u.rx, 0.03, u.rz), _q.identity(), _s.set(r, 1, r)), _c.setHex(tc));
      if (u.def.boss){ const k = r * (1.25 + Math.sin(now / 180) * 0.08); this.P.ring.push(_m.compose(_v.set(u.rx, 0.035, u.rz), _q.identity(), _s.set(k, 1, k)), _c.setHex(0xffd34d)); }
      const hr = this.honor.get(u.info.owner);
      if (hr){
        const hc = HONOR[Math.min(hr, 4) - 1], k = r * (1.5 + Math.sin(now / 240 + u.seed * 6) * 0.12);
        this.P.ring.push(_m.compose(_v.set(u.rx, 0.04, u.rz), _q.identity(), _s.set(k, 1, k)), _c.setHex(hc));
        this.P.ring.push(_m.compose(_v.set(u.rx, 0.045, u.rz), _q.identity(), _s.set(k * 0.72, 1, k * 0.72)), _c.setHex(hc));
        // đốm sáng bay lên quanh người
        if (u.lod < 2) for (let i = 0; i < (hr <= 3 ? 4 : 2); i++){ const a = now / 700 + i * 1.57 + u.seed * 9, y = ((now / 900 + i * 0.25 + u.seed) % 1) * ANCHOR[u.info.kind] * 1.1; this.P.glow.push(_m.compose(_v.set(u.rx + Math.cos(a) * k * 0.8, y, u.rz + Math.sin(a) * k * 0.8), _q.identity(), _s.setScalar(0.09)), _c.setHex(hc)); }
      }
    }
    if (!this.drawModel(u, now, dead, sink, grow)) switch (u.info.kind){
      case 'danbinh': case 'xathu': case 'dausi': this.infantry(u, t, now); break;
      case 'xechien': this.cart(u, t, now); break;
      case 'trau': this.buffalo(u, t, now); break;
      case 'voi': this.elephant(u, t, now); break;
    }
    if (!dead && u.flags & FLAG.stun) this.stars(u, now);
    if (!dead) this.hpBar(u, now);
  }

  // Model .glb (nếu có): có xương thì chạy hoạt ảnh theo trạng thái; tĩnh thì nhún khi đi, lao tới khi đánh, ngã khi chết
  private drawModel(u: CUnit, now: number, dead: boolean, sink: number, grow: number){
    const lib = this.models, e = lib?.entries.get(u.info.kind);
    if (!lib || !e) return false;
    const atk = (now - u.atkAt) / 1000, moving = u.speed > 0.4;
    if (e.skinned){
      if (u.lod === 2 && !u.def.boss) return false;
      _upright.compose(_v.set(u.rx, u.ry - (dead ? Math.max(0, (now - u.deadAt) / 1000 - 1.6) : 0), u.rz), _q.setFromEuler(_e.set(0, u.ryaw, 0)), _s.setScalar(grow));
      const clip = dead ? 'death' : atk < u.def.windup + 0.5 ? 'attack' : now - u.hitAt < 250 ? 'hit' : moving ? 'walk' : 'idle';
      return lib.drawSkinned(u.info.kind, u.id, u.team, _upright, clip, u.atkAt, u.speed, this.dt);
    }
    const bob = moving ? Math.abs(Math.sin(u.odo * 3)) * 0.06 : 0, lunge = atk < 0.7 ? Math.sin(Math.min(1, atk / 0.7) * PI) * 0.3 : 0;
    _m.multiplyMatrices(_root, L(0, bob, lunge, atk < 0.7 ? lunge * 0.3 : 0, 0, 0));
    lib.drawStatic(u.info.kind, _m, u.team);
    void sink;
    return true;
  }

  /* ------------------------------------------------------- người chibi */
  private lookOf(u: CUnit): Look {
    const k = u.info.kind, h = u.seed, team = TEAM_INFO[u.team].color;
    const skin = SKINS[Math.floor(h * 4) % 4];
    const base: Look = { skin, shirt: 0x8a5a33, sleeve: 0x8a5a33, pants: 0xcdb98f, boots: 0x5a3a22, hair: 0x4a2e1c, hairStyle: 'bun', hat: 'none', hatColor: 0, team, armor: false, ragged: false, cheeks: false, angry: true, belt: 0x8a6a40, skirt: 0 };
    // dân binh: búi tóc, áo vải nâu rách vá, dây lưng thừng, quần ống ngắn, chùy gỗ
    if (k === 'danbinh') return { ...base, shirt: [0x8a5a33, 0x7a4e2c, 0x936238][Math.floor(h * 97) % 3], sleeve: 0xd9c49a, ragged: true, skirt: 0x7a4e2c, hat: h > 0.75 ? 'khan' : 'none', hatColor: team };
    // xạ thủ: nón lá to, áo trắng ngà vạt chéo, quần ống rộng xanh rêu, má hồng
    if (k === 'xathu') return { ...base, shirt: 0xefe5cc, sleeve: 0xefe5cc, pants: 0x5d6b58, boots: 0x6a4a2e, hairStyle: 'short', hat: 'non', hatColor: 0xd8b062, cheeks: true, angry: false, belt: 0xb08a4a, skirt: 0x5d6b58 };
    return { ...base, shirt: 0x59616e, sleeve: 0x59616e, pants: 0x2c2f36, boots: 0x2a2420, hair: 0x1e1410, hairStyle: 'short', hat: 'helm', hatColor: 0x8a929e, armor: true, belt: 0x6a4a2e };
  }
  // Dựng một người tỉ lệ chibi (đầu to): trả về ma trận bàn tay phải (M[5]) và tay trái (M[6]), thân trên ở M[3]
  private human(base: THREE.Matrix4, lk: Look, p: Pose, lod: number){
    const P = this.P;
    const root = M[0].copy(base).multiply(L(0, p.bob + (p.sit ? -0.18 : 0), 0, 0, p.spin, 0));
    const leg = (sx: number, a: number, mi: number) => {
      const pv = M[mi].copy(root).multiply(L(sx, 0.46, 0, p.sit ? -1.45 : a, 0, 0));
      _m.multiplyMatrices(pv, S(0, -0.2, 0, 0.17, 0.42, 0.17)); P.cyl.push(_m, col(lk.pants));
      _m.multiplyMatrices(pv, S(0, -0.44, 0.04, 0.19, 0.14, 0.27)); P.sph.push(_m, col(lk.boots));
    };
    leg(-0.11, p.legL, 1); leg(0.11, p.legR, 2);
    const up = M[3].copy(root).multiply(L(0, 0.46, 0, p.bend, 0, 0));
    _m.multiplyMatrices(up, S(0, 0.2, 0, 0.48, 0.44, 0.38)); P.frus.push(_m, col(lk.shirt));
    if (lk.skirt){ _m.multiplyMatrices(up, L(0, -0.02, 0, PI, 0, 0, 0.5, 0.18, 0.42)); P.frus.push(_m, col(lk.skirt)); }
    if (lk.ragged && lod < 2){
      // vạt áo rách lởm chởm, miếng vá màu sáng
      for (let i = 0; i < 6; i++){ const a = i / 6 * PI * 2 + 0.3; _m.multiplyMatrices(up, L(Math.sin(a) * 0.22, -0.13, Math.cos(a) * 0.19, PI, 0, 0, 0.1, 0.12, 0.06)); P.cone.push(_m, col(i % 2 ? 0x6a4224 : lk.shirt)); }
      _m.multiplyMatrices(up, S(0.09, 0.26, 0.17, 0.12, 0.11, 0.03)); P.box.push(_m, col(0xd9c49a));
      _m.multiplyMatrices(up, S(-0.11, 0.06, 0.19, 0.1, 0.09, 0.03)); P.box.push(_m, col(0xc9b086));
      _m.multiplyMatrices(up, L(-0.06, 0.36, 0.15, 0, 0, 0.5, 0.2, 0.1, 0.04)); P.box.push(_m, col(0xd9c49a));   // cổ áo vải lót
    }
    if (lk.armor){
      _m.multiplyMatrices(up, S(0, 0.24, 0.17, 0.4, 0.32, 0.06)); P.box.push(_m, col(lk.team));
      for (const sx of [-0.27, 0.27]){ _m.multiplyMatrices(up, S(sx, 0.42, 0, 0.24, 0.17, 0.24)); this.goldSph.push(_m, col(0x9aa2ae)); }
    } else if (!lk.ragged){
      _m.multiplyMatrices(up, L(0.03, 0.27, 0.17, 0, 0, 0.55, 0.06, 0.34, 0.04)); P.box.push(_m, col(0xd8ccb0));   // vạt áo chéo
      _m.multiplyMatrices(up, L(0, 0.25, 0, 0, 0, 0.62, 0.52, 0.06, 0.4)); P.box.push(_m, col(lk.team));          // dải khăn màu phe vắt chéo
    } else { _m.multiplyMatrices(up, L(0, 0.25, 0, 0, 0, -0.62, 0.52, 0.05, 0.4)); P.box.push(_m, col(lk.team)); }
    _m.multiplyMatrices(up, L(0, 0.04, 0, PI / 2, 0, 0, 0.5, 0.5, 0.55)); P.band.push(_m, col(lk.belt));             // dây lưng
    const arm = (sx: number, a: number, z: number, mi: number) => {
      const pv = M[mi].copy(up).multiply(L(sx, 0.36, 0, a, 0, z));
      _m.multiplyMatrices(pv, S(0, -0.16, 0, 0.14, 0.34, 0.14)); P.cyl.push(_m, col(lk.armor ? 0x59616e : lk.sleeve));
      _m.multiplyMatrices(pv, S(0, -0.36, 0, 0.15, 0.15, 0.15)); P.sph.push(_m, col(lk.skin));
      pv.multiply(L(0, -0.37, 0));                                     // khớp bàn tay
    };
    arm(-0.27, p.armL, p.armLz, 6); arm(0.27, p.armR, p.armRz, 5);
    const head = M[4].copy(up).multiply(L(0, 0.78, 0, p.head * 0.4, p.head, 0));
    _m.multiplyMatrices(head, S(0, 0, 0, 0.84, 0.8, 0.8)); P.sph.push(_m, col(lk.skin));
    if (lod < 2){
      for (const sx of [-1, 1]){
        _m.multiplyMatrices(head, S(sx * 0.14, 0.0, 0.35, 0.09, 0.13, 0.05)); P.sph.push(_m, col(0x2a160c));
        _m.multiplyMatrices(head, S(sx * 0.125, 0.035, 0.375, 0.03, 0.035, 0.02)); P.sph.push(_m, col(0xffffff));
        _m.multiplyMatrices(head, L(sx * 0.14, 0.15, 0.36, 0, 0, lk.angry ? sx * 0.35 : -sx * 0.12, 0.14, 0.035, 0.03)); P.box.push(_m, col(0x3a2216));   // lông mày
        _m.multiplyMatrices(head, S(sx * 0.42, -0.02, 0, 0.1, 0.15, 0.09)); P.sph.push(_m, col(lk.skin));           // tai
        if (lk.cheeks){ _m.multiplyMatrices(head, S(sx * 0.22, -0.11, 0.31, 0.11, 0.06, 0.03)); P.sph.push(_m, col(0xf59aa6)); }
      }
      _m.multiplyMatrices(head, S(0, -0.17, 0.37, lk.angry ? 0.1 : 0.08, 0.025, 0.02)); P.box.push(_m, col(0x8a3a2c));
    }
    if (lk.hat !== 'helm'){
      _m.multiplyMatrices(head, S(0, 0.08, -0.05, 0.88, 0.8, 0.84)); P.sph.push(_m, col(lk.hair));
      if (lk.hairStyle === 'bun' && lk.hat !== 'non'){                // búi tóc trên đỉnh, có dây buộc
        _m.multiplyMatrices(head, S(0, 0.52, -0.06, 0.32, 0.3, 0.32)); P.sph.push(_m, col(lk.hair));
        _m.multiplyMatrices(head, S(0, 0.38, -0.05, 0.2, 0.06, 0.2)); P.cyl.push(_m, col(0xb08a4a));
      }
    }
    if (lk.hat === 'non'){
      // nón lá rộng vành, có vòng nan và quai
      _m.multiplyMatrices(head, S(0, 0.48, 0, 1.95, 0.5, 1.95)); P.cone.push(_m, col(lk.hatColor));
      if (lod < 2) for (const k of [0.62, 0.85]){ _m.multiplyMatrices(head, L(0, 0.48 - 0.25 * k + 0.25, 0, PI / 2, 0, 0, 1.95 * (1 - k) + 0.02, 1.95 * (1 - k) + 0.02, 0.2)); P.band.push(_m, col(0xb08a4a)); }
      _m.multiplyMatrices(head, L(0, 0.23, 0, PI / 2, 0, 0, 1.94, 1.94, 0.25)); P.band.push(_m, col(0xb59050));
    } else if (lk.hat === 'khan'){ _m.multiplyMatrices(head, S(0, 0.28, -0.02, 0.9, 0.12, 0.9)); P.cyl.push(_m, col(lk.hatColor)); }
    else if (lk.hat === 'turban'){ _m.multiplyMatrices(head, S(0, 0.32, -0.02, 0.95, 0.42, 0.95)); P.sph.push(_m, col(lk.hatColor)); _m.multiplyMatrices(head, S(0, 0.38, 0.4, 0.14, 0.18, 0.08)); this.goldSph.push(_m, col(0xf2c94c)); }
    else if (lk.hat === 'helm'){
      _m.multiplyMatrices(head, S(0, 0.12, -0.02, 0.92, 0.72, 0.92)); this.goldSph.push(_m, col(lk.hatColor));
      _m.multiplyMatrices(head, S(0, 0.5, -0.02, 0.08, 0.18, 0.5)); P.box.push(_m, col(lk.team));
    }
  }

  // Dân binh, xạ thủ, đấu sĩ
  private infantry(u: CUnit, t: number, now: number){
    const k = u.info.kind, lk = this.lookOf(u), p = pose(), P = this.P;
    const gait = u.odo * 3.4, sw = Math.sin(gait), moving = u.speed > 0.35 && u.state !== 'attack';
    const atk = (now - u.atkAt) / 1000 / u.def.windup;                // 0..1 lấy đà, 1 là lúc trúng
    const inAtk = atk >= 0 && atk < 1.6 && u.state !== 'dead';
    const sk = (now - u.skillAt) / 1000;
    if (moving){ p.legL = sw * 0.65; p.legR = -sw * 0.65; p.armL = -sw * 0.5; p.armR = sw * 0.5; p.bob = Math.abs(sw) * 0.05; }
    else { p.armL = p.armR = 0.06 + Math.sin(t * 1.6) * 0.04; p.bob = Math.sin(t * 2) * 0.01; }
    if (k === 'xathu'){
      // tay trái giương cung ra trước, tay phải kéo dây; bắn xong dây bật lại
      p.armL = -1.45; p.armLz = 0.1;
      const draw = inAtk ? (atk < 1 ? atk : Math.max(0, 1 - (atk - 1) * 3)) : 0;
      p.armR = -1.35 + draw * 0.15; p.armRz = 0.2 + draw * 0.55;
      if (moving && !inAtk){ p.armL = -0.9 + sw * 0.1; p.armR = sw * 0.4; p.armRz = -0.15; }
    } else if (k === 'dausi'){
      p.armL = -1.1; p.armLz = 0.35;                                  // khiên đưa ra trước
      if (u.flags & FLAG.block){ p.armL = -1.45; p.armLz = 0.1; p.bend = 0.1; }
      if (inAtk){ p.armR = atk < 1 ? -2.9 * atk : -2.9 + Math.min(1, (atk - 1) * 4) * 2.4; p.bend = atk < 1 ? -0.15 * atk : 0.25; }
      if (u.skill === 'slam' && sk < 1){ const w = Math.min(1, sk / 0.55); p.armR = sk < 0.55 ? -3.1 * w : -0.5; p.armL = sk < 0.55 ? -2.6 * w : -0.6; p.bend = sk < 0.55 ? -0.2 : 0.45; p.bob = sk < 0.55 ? w * 0.25 : 0; }
    } else {
      p.armR = moving ? sw * 0.5 - 0.3 : -0.35;                       // cầm chùy ngang hông
      if (inAtk){
        // đấm, đá, vung chùy
        if (u.atkV === 0){ p.armL = atk < 1 ? 0.6 * atk : -1.6; p.spin = atk < 1 ? 0.3 * atk : -0.25; }
        else if (u.atkV === 1){ p.legR = atk < 1 ? 0.4 * atk : -1.5; p.legL = 0.15; p.bend = -0.15; p.armL = -0.5; p.armLz = 0.6; }
        else { p.armR = atk < 1 ? -3.0 * atk : -0.5; p.bend = atk < 1 ? -0.1 : 0.2; }
      }
    }
    if (u.state === 'cheer') this.cheerPose(u, p, t);
    if (u.flags & FLAG.air || u.flags & FLAG.stun){ p.armL = p.armR = -2.6 + Math.sin(t * 14) * 0.4; p.armLz = 0.5; p.armRz = -0.5; p.legL = Math.sin(t * 12) * 0.5; p.legR = -p.legL; p.head = Math.sin(t * 9) * 0.3; }
    const s = k === 'dausi' ? 1.2 : 0.95;
    this.human(M[11].copy(_root).multiply(S(0, 0, 0, s, s, s)), lk, p, u.lod);
    const hand = M[5], left = M[6];
    if (k === 'danbinh'){
      // chùy gỗ: đầu to, có mấu
      _m.multiplyMatrices(hand, L(0, 0, 0.3, -PI / 2, 0, 0, 0.19, 0.72, 0.19)); P.cone.push(_m, col(0x9a6a3e));
      if (u.lod < 2){ _m.multiplyMatrices(hand, S(0.07, 0.03, 0.55, 0.09, 0.08, 0.09)); P.sph.push(_m, col(0x7a5030)); _m.multiplyMatrices(hand, S(-0.06, -0.04, 0.45, 0.08, 0.07, 0.08)); P.sph.push(_m, col(0x7a5030)); }
    } else if (k === 'xathu'){
      // cung cầm dọc ở tay trái (dựng theo thân người cho cung luôn đứng thẳng), dây cung, mũi tên lúc kéo
      _hp.setFromMatrixPosition(left);
      const bow = M[12].copy(M[3]).setPosition(_hp);
      _m.multiplyMatrices(bow, L(0, 0, -0.38, 0, PI / 2, PI / 2, 0.82, 0.82, 0.45)); P.tor.push(_m, col(0x7a4a26));
      const atk2 = (now - u.atkAt) / 1000 / u.def.windup, draw = atk2 >= 0 && atk2 < 1 ? atk2 : 0;
      if (u.lod < 2){ _m.multiplyMatrices(bow, S(0, 0, -0.38 - draw * 0.25, 0.012, 0.8, 0.012)); P.box.push(_m, col(0xf0e8d8)); }
      if (draw > 0.05){ _m.multiplyMatrices(bow, S(0, 0, -0.1 - draw * 0.25, 0.025, 0.025, 0.7)); P.box.push(_m, col(0x6e4428)); _m.multiplyMatrices(bow, L(0, 0, 0.27 - draw * 0.25, PI / 2, 0, 0, 0.06, 0.1, 0.06)); P.cone.push(_m, col(0xc8ccd2)); }
      if (u.lod < 2){
        _m.multiplyMatrices(M[3], L(0.15, 0.28, -0.24, 0.35, 0, -0.2, 0.15, 0.5, 0.15)); P.cyl.push(_m, col(0x6e4428));   // ống tên sau lưng
        for (const [dx, dz] of [[0.1, -0.31], [0.17, -0.34], [0.22, -0.3]]){ _m.multiplyMatrices(M[3], L(dx, 0.58, dz, 0.35, 0, -0.2, 0.04, 0.14, 0.02)); P.box.push(_m, col(0xffffff)); }
      }
    } else if (k === 'dausi'){
      _m.multiplyMatrices(hand, L(0, 0, 0.25, PI / 2, 0, 0, 0.06, 0.85, 0.06)); P.cyl.push(_m, col(0x6e4428));
      _m.multiplyMatrices(hand, S(0, 0, 0.66, 0.34, 0.22, 0.22)); this.gold.push(_m, col(0x5a606a));
      _m.multiplyMatrices(left, L(-0.04, 0.02, 0.12, PI / 2, 0, 0, 0.74, 0.07, 0.74)); P.cyl.push(_m, col(u.flags & FLAG.block ? 0xffffff : lk.team));
      _m.multiplyMatrices(left, L(-0.04, 0.02, 0.15, 0, 0, 0, 0.74, 0.74, 0.5)); this.goldBand.push(_m, col(0xf2c94c));
      _m.multiplyMatrices(left, S(-0.04, 0.02, 0.18, 0.2, 0.2, 0.1)); this.goldSph.push(_m, col(0xf2c94c));
    }
  }
  private cheerPose(u: CUnit, p: Pose, t: number){
    if (this.winner === u.team || this.winner === 'draw'){ p.armL = p.armR = PI - 0.35 + Math.sin(t * 10) * 0.25; p.armLz = 0.25; p.armRz = -0.25; p.bob = Math.abs(Math.sin(t * 8)) * 0.25; p.legL = p.legR = 0; }
    else if (this.winner){ p.bend = 0.5; p.armL = p.armR = -0.4; p.head = -0.3; p.sit = false; p.legL = -0.6; p.legR = 0.2; }
  }

  /* ---------------------------------------------------------- xe gỗ cổ */
  // Xe chiến bằng gỗ: thùng ván đóng đinh, bánh gỗ có nan, mũi đâm bọc đồng, cờ phe, người lái và lính cầm giáo
  private cart(u: CUnit, t: number, now: number){
    const P = this.P, tc = TEAM_INFO[u.team].color, boost = !!(u.flags & FLAG.boost);
    const atk = (now - u.atkAt) / 1000 / u.def.windup, lunge = atk >= 0 && atk < 1.6 ? Math.sin(Math.min(1, atk / 1.6) * PI) * 0.35 : 0;
    const b = M[11].copy(_root).multiply(L(0, Math.abs(Math.sin(u.odo * 4)) * 0.03, lunge, boost ? -0.05 : 0, 0, 0));
    _m.multiplyMatrices(b, S(0, 0.55, 0, 1.3, 0.14, 1.9)); P.box.push(_m, col(0x6e4428));                     // sàn
    for (let i = 0; i < 4; i++){ _m.multiplyMatrices(b, S(0, 0.63, -0.75 + i * 0.5, 1.32, 0.03, 0.04)); P.box.push(_m, col(0x4a2c18)); }   // khe ván
    for (const sx of [-0.64, 0.64]){
      _m.multiplyMatrices(b, S(sx, 0.86, -0.05, 0.08, 0.5, 1.7)); P.box.push(_m, col(0x8a5a33));
      _m.multiplyMatrices(b, S(sx * 1.02, 0.95, -0.05, 0.03, 0.14, 1.6)); P.box.push(_m, col(tc));                // dải màu phe
      for (const z of [-0.7, 0, 0.7]){ _m.multiplyMatrices(b, S(sx * 1.04, 0.78, z, 0.05, 0.05, 0.05)); this.goldSph.push(_m, col(0xb87333)); }   // đinh đồng
    }
    _m.multiplyMatrices(b, S(0, 0.86, -0.88, 1.3, 0.5, 0.08)); P.box.push(_m, col(0x8a5a33));
    _m.multiplyMatrices(b, S(0, 0.82, 0.9, 1.3, 0.42, 0.12)); P.box.push(_m, col(0x5a3a22));
    _m.multiplyMatrices(b, L(0, 0.66, 1.25, PI / 2, 0, 0, 0.42, 0.7, 0.42)); this.goldCone.push(_m, col(0xb87333));   // mũi đâm bọc đồng
    for (const sx of [-0.4, 0.4]){ _m.multiplyMatrices(b, L(sx, 0.8, 1.1, PI / 2, 0, 0, 0.14, 0.45, 0.14)); this.goldCone.push(_m, col(0xc8ccd2)); }
    const spin = u.odo / 0.42;
    for (const [sx, sz] of [[-0.74, 0.6], [0.74, 0.6], [-0.74, -0.58], [0.74, -0.58]]){
      const w = M[7].copy(b).multiply(L(sx, 0.42, sz, spin, 0, PI / 2));
      _m.multiplyMatrices(w, S(0, 0, 0, 0.84, 0.12, 0.84)); P.cyl.push(_m, col(0x5a3a22));
      _m.multiplyMatrices(w, L(0, 0, 0, PI / 2, 0, 0, 0.84, 0.84, 0.6)); this.goldBand.push(_m, col(0x4a4a50));       // vành sắt
      if (u.lod < 2) for (let k = 0; k < 3; k++){ _m.multiplyMatrices(w, L(0, 0, 0, 0, k * PI / 3, 0, 0.78, 0.14, 0.07)); P.box.push(_m, col(0xc9a77f)); }
      _m.multiplyMatrices(w, S(0, 0, 0, 0.2, 0.18, 0.2)); P.cyl.push(_m, col(0x3a2616));
    }
    _m.multiplyMatrices(b, S(0.5, 1.55, -0.8, 0.05, 1.7, 0.05)); P.cyl.push(_m, col(0x4a2c18));
    _m.multiplyMatrices(b, L(0.5, 2.1, -1.1 - (boost ? 0.1 : 0), 0, Math.sin(t * (boost ? 18 : 7)) * 0.25, 0, 0.04, 0.45, 0.65)); P.box.push(_m, col(tc));
    const lk: Look = { ...this.lookOf(u), shirt: 0x6b3a2a, sleeve: 0x6b3a2a, pants: 0x2a2420, ragged: false, hat: 'khan', hatColor: tc, skirt: 0, armor: false, cheeks: false };
    const p = pose(); p.sit = true; p.armL = p.armR = -1.2 + Math.sin(t * (boost ? 16 : 5)) * 0.15; p.armLz = 0.25; p.armRz = -0.25; p.bend = boost ? 0.25 : 0.05;
    if (u.state === 'cheer') this.cheerPose(u, p, t);
    this.human(M[10].copy(b).multiply(S(0, 0.66, 0.2, 0.82, 0.82, 0.82)), lk, p, u.lod);
    if (u.lod < 2){
      // lính đứng sau cầm giáo
      const q = pose(); q.armR = -1.2 - (atk >= 0 && atk < 1.6 ? 0.6 : 0); q.armL = -0.6; q.armLz = 0.4;
      if (u.state === 'cheer') this.cheerPose(u, q, t + 1);
      this.human(M[13].copy(b).multiply(S(-0.15, 0.6, -0.45, 0.78, 0.78, 0.78)), { ...lk, shirt: 0x8a5a33, sleeve: 0x8a5a33, hat: 'none', hairStyle: 'bun' }, q, u.lod);
      _m.multiplyMatrices(M[5], L(0, 0, 0.4, PI / 2, 0, 0, 0.045, 1.5, 0.045)); P.cyl.push(_m, col(0x6e4428));
      _m.multiplyMatrices(M[5], L(0, 0, 1.2, PI / 2, 0, 0, 0.1, 0.24, 0.1)); P.cone.push(_m, col(0xd8dde4));
    }
  }

  /* ------------------------------------------------------- kỵ binh trâu */
  // Trâu đen ánh xanh, sừng cong lớn, giáp trán và vòng cổ vàng gắn ngọc xanh, giáp vai vàng, yên da viền vàng, đuôi có chùm lông
  private buffalo(u: CUnit, t: number, now: number){
    const P = this.P, tc = TEAM_INFO[u.team].color, charge = !!(u.flags & FLAG.charge), G = this.gold, GS = this.goldSph;
    const g = u.odo * (charge ? 1.6 : 2.4), moving = u.speed > 0.4 || charge;
    const atk = (now - u.atkAt) / 1000 / u.def.windup, butt = atk >= 0 && atk < 1.6 ? (atk < 1 ? -atk * 0.35 : Math.sin(Math.min(1, (atk - 1) * 2) * PI) * 0.6) : 0;
    const wind = u.skill === 'charge' && (now - u.skillAt) < 350 ? 0.35 : 0;
    const body = M[11].copy(_root).multiply(L(0, moving ? Math.abs(Math.sin(g)) * 0.08 : Math.sin(t * 1.5) * 0.015, 0, charge ? 0.08 : 0, 0, 0));
    const hide = 0x2b3352, hide2 = 0x353f63;
    _m.multiplyMatrices(body, S(0, 1.12, -0.1, 1.2, 1.0, 1.95)); P.sph.push(_m, col(hide));
    _m.multiplyMatrices(body, S(0, 1.3, 0.45, 1.1, 0.95, 0.85)); P.sph.push(_m, col(hide2));                       // u vai
    _m.multiplyMatrices(body, S(0, 0.9, 0.6, 0.85, 0.75, 0.7)); P.sph.push(_m, col(0x232a45));                   // ức, lông cổ
    for (const [sx, sz, ph] of [[-0.34, 0.6, 0], [0.34, 0.6, PI], [-0.34, -0.66, PI], [0.34, -0.66, 0]]){
      const a = moving ? Math.sin(g + ph) * (charge ? 0.8 : 0.55) : 0;
      const lg = M[7].copy(body).multiply(L(sx, 0.85, sz, a, 0, 0));
      _m.multiplyMatrices(lg, S(0, -0.22, 0, 0.32, 0.5, 0.34)); P.sph.push(_m, col(hide));
      _m.multiplyMatrices(lg, S(0, -0.55, 0, 0.22, 0.5, 0.22)); P.cyl.push(_m, col(hide));
      _m.multiplyMatrices(lg, S(0, -0.82, 0.02, 0.27, 0.14, 0.31)); P.cyl.push(_m, col(0x1e1e22));
    }
    const head = M[8].copy(body).multiply(L(0, 1.15, 1.05, 0.25 + butt + wind + (charge ? 0.35 : 0), Math.sin(t * 0.8) * 0.1, 0));
    _m.multiplyMatrices(head, S(0, 0, 0.15, 0.7, 0.62, 0.78)); P.sph.push(_m, col(hide));
    _m.multiplyMatrices(head, S(0, -0.12, 0.55, 0.48, 0.36, 0.34)); P.sph.push(_m, col(0xe9a6a0));                 // mõm hồng
    if (u.lod < 2){
      for (const sx of [-1, 1]){
        _m.multiplyMatrices(head, S(sx * 0.1, -0.12, 0.71, 0.07, 0.07, 0.03)); P.sph.push(_m, col(0x5a2a2a));   // lỗ mũi
        _m.multiplyMatrices(head, S(sx * 0.24, 0.12, 0.42, 0.13, 0.15, 0.08)); P.sph.push(_m, col(0xffffff));
        _m.multiplyMatrices(head, S(sx * 0.25, 0.11, 0.46, 0.08, 0.1, 0.04)); P.sph.push(_m, col(0x3a2210));
        _m.multiplyMatrices(head, L(sx * 0.4, 0.12, 0.02, 0, 0, sx * 0.7, 0.14, 0.26, 0.08)); P.sph.push(_m, col(0xd88a8a));   // tai
      }
    }
    // sừng cong vút lên hai bên
    for (const sx of [-1, 1]){ _m.multiplyMatrices(head, L(sx * 0.6, 0.38, 0.08, 0, sx > 0 ? 0 : PI, 0.95, 0.62, 0.62, 0.9)); P.tor.push(_m, col(0xe8e0cc)); }
    _m.multiplyMatrices(head, S(0, 0.3, 0.3, 0.52, 0.16, 0.14)); G.push(_m, col(0xd9a521));                        // giáp trán vàng
    _m.multiplyMatrices(head, S(0, 0.3, 0.38, 0.12, 0.12, 0.06)); P.glow.push(_m, _c.setHex(0x4af0ff));
    _m.multiplyMatrices(body, L(0, 1.1, 0.78, PI / 2 + 0.5, 0, 0, 0.78, 0.78, 0.7)); this.goldBand.push(_m, col(0xd9a521));     // vòng cổ vàng
    _m.multiplyMatrices(body, S(0, 0.86, 1.08, 0.18, 0.22, 0.1)); P.glow.push(_m, _c.setHex(0x4af0ff));               // ngọc ức
    for (const sx of [-1, 1]){ _m.multiplyMatrices(body, S(sx * 0.58, 1.42, 0.5, 0.42, 0.34, 0.55)); GS.push(_m, col(0xd9a521)); }   // giáp vai
    if (u.lod < 2){ _m.multiplyMatrices(body, L(0, 1.2, -1.05, -0.7 + Math.sin(t * 3) * 0.3, 0, Math.sin(t * 2.2) * 0.4, 0.06, 0.85, 0.06)); P.cyl.push(_m, col(hide)); _m.multiplyMatrices(body, S(0, 0.82, -1.35 + Math.sin(t * 3) * 0.1, 0.16, 0.26, 0.16)); P.sph.push(_m, col(0x3a2a60)); }
    // yên da viền vàng, vạt hai bên
    _m.multiplyMatrices(body, S(0, 1.66, -0.1, 1.05, 0.14, 1.0)); P.box.push(_m, col(0x6a4228));
    _m.multiplyMatrices(body, S(0, 1.6, -0.1, 1.12, 0.06, 1.06)); G.push(_m, col(0xd9a521));
    for (const sx of [-1, 1]){ _m.multiplyMatrices(body, S(sx * 0.6, 1.3, -0.1, 0.05, 0.6, 0.78)); P.box.push(_m, col(0x4a2c1c)); _m.multiplyMatrices(body, S(sx * 0.62, 1.3, -0.1, 0.03, 0.4, 0.5)); P.box.push(_m, col(tc)); }
    _m.multiplyMatrices(body, S(0.35, 2.3, -0.6, 0.04, 1.3, 0.04)); P.cyl.push(_m, col(0x2a8a9a));
    _m.multiplyMatrices(body, L(0.35, 2.85, -0.85, 0, Math.sin(t * 5) * 0.3, 0, 0.03, 0.3, 0.45)); P.box.push(_m, col(tc));
    const lk: Look = { ...this.lookOf(u), shirt: 0x7a2a1a, sleeve: 0x7a2a1a, pants: 0x2a2420, ragged: false, hat: 'khan', hatColor: tc, skirt: 0, armor: false };
    const p = pose(); p.sit = true; p.legL = p.legR = -1.2; p.armR = -1.3 - (charge ? 0.3 : 0) + (atk >= 0 && atk < 1.6 ? -0.5 : 0); p.armRz = -0.1; p.armL = -0.8; p.armLz = 0.3; p.bend = charge ? 0.3 : 0.05;
    if (u.state === 'cheer') this.cheerPose(u, p, t);
    this.human(M[10].copy(body).multiply(S(0, 1.55, -0.1, 0.88, 0.88, 0.88)), lk, p, u.lod);
    _m.multiplyMatrices(M[5], L(0, 0, 0.35, PI / 2, 0, 0, 0.05, 1.5, 0.05)); P.cyl.push(_m, col(0x6e4428));
    _m.multiplyMatrices(M[5], L(0, 0, 1.15, PI / 2, 0, 0, 0.12, 0.26, 0.12)); P.cone.push(_m, col(0xd8dde4));
  }

  /* ------------------------------------------------------- tượng binh voi */
  // Voi chiến: khăn trùm đầu thêu màu phe viền vàng có tua đỏ, vương miện vàng, ngà bọc vòng vàng, vòng chân đỏ có lục lạc,
  // vải phủ lưng có tua, bành ghế vàng chạm trổ, hai cờ đỏ, người cưỡi quấn khăn
  private elephant(u: CUnit, t: number, now: number){
    const P = this.P, tc = TEAM_INFO[u.team].color, grey = 0x9a9ca2, G = this.gold, GS = this.goldSph, GC = this.goldCone, lo = u.lod < 2;
    const cloth = u.team === 'trai' ? 0x2a8fc4 : 0xc93a6e, red = 0xc8201e;
    const moving = u.speed > 0.4, g = u.odo * 1.5;
    const sk = (now - u.skillAt) / 1000;
    const stomp = u.skill === 'stomp' && sk < 1.3 ? (sk < 0.8 ? Math.sin(sk / 0.8 * PI / 2) : Math.max(0, 1 - (sk - 0.8) * 4)) : 0;
    const roar = u.skill === 'roar' && sk < 1.6 ? Math.min(1, sk / 0.4) * (sk > 1.2 ? Math.max(0, (1.6 - sk) / 0.4) : 1) : 0;
    const atk = (now - u.atkAt) / 1000 / u.def.windup, swing = atk >= 0 && atk < 1.6 ? (atk < 1 ? -atk : Math.max(-1, -1 + (atk - 1) * 4)) : 0;
    const body = M[11].copy(_root).multiply(L(0, moving ? Math.abs(Math.sin(g)) * 0.06 : Math.sin(t * 1.2) * 0.02, 0, -stomp * 0.32, 0, 0));
    _m.multiplyMatrices(body, S(0, 2.05, -0.1, 2.3, 2.0, 3.15)); P.sph.push(_m, col(grey));
    for (const [sx, sz, ph] of [[-0.7, 0.95, 0], [0.7, 0.95, PI], [-0.7, -0.95, PI], [0.7, -0.95, 0]]){
      const front = sz > 0, a = moving ? Math.sin(g + ph) * 0.35 : 0, lift = front ? -stomp * 0.7 : 0;
      const lg = M[7].copy(body).multiply(L(sx, 1.45, sz, a + lift, 0, 0));
      _m.multiplyMatrices(lg, S(0, -0.72, 0, 0.66, 1.5, 0.66)); P.cyl.push(_m, col(grey));
      _m.multiplyMatrices(lg, S(0, -1.42, 0.05, 0.72, 0.12, 0.74)); P.cyl.push(_m, col(0x85888e));
      _m.multiplyMatrices(lg, L(0, -1.2, 0, PI / 2, 0, 0, 0.72, 0.72, 0.9)); P.band.push(_m, col(red));                // vòng chân đỏ
      if (lo){ for (const a2 of [0, 2.1, 4.2]){ _m.multiplyMatrices(lg, S(Math.cos(a2) * 0.36, -1.3, Math.sin(a2) * 0.36, 0.13, 0.13, 0.13)); GS.push(_m, col(0xf2c94c)); }
        for (const tx of [-0.17, 0, 0.17]){ _m.multiplyMatrices(lg, S(tx, -1.42, 0.35, 0.13, 0.1, 0.06)); P.sph.push(_m, col(0xeee8d6)); } }
    }
    const head = M[8].copy(body).multiply(L(0, 2.5, 1.6, -roar * 0.45 - stomp * 0.15, Math.sin(t * 0.6) * 0.08, 0));
    _m.multiplyMatrices(head, S(0, 0, 0.1, 1.55, 1.5, 1.4)); P.sph.push(_m, col(grey));
    // khăn trùm đầu thêu, viền vàng, tua đỏ
    _m.multiplyMatrices(head, L(0, 0.22, 0.6, -0.25, 0, 0, 1.0, 1.0, 0.12)); P.box.push(_m, col(cloth));
    _m.multiplyMatrices(head, L(0, 0.22, 0.62, -0.25, 0, 0, 0.6, 0.6, 0.12)); P.box.push(_m, col(0x2ac4b8));
    _m.multiplyMatrices(head, L(0, 0.24, 0.66, -0.25, 0, 0, 0.3, 0.3, 0.1)); GS.push(_m, col(0xd9a521));
    for (const [y, w] of [[0.72, 1.04], [-0.28, 1.04]] as const){ _m.multiplyMatrices(head, L(0, y, y > 0 ? 0.46 : 0.73, -0.25, 0, 0, w, 0.07, 0.14)); G.push(_m, col(0xd9a521)); }
    if (lo) for (let i = 0; i < 5; i++){ _m.multiplyMatrices(head, L(-0.4 + i * 0.2, -0.45, 0.76, PI, 0, 0, 0.1, 0.25, 0.1)); P.cone.push(_m, col(red)); }
    for (let i = 0; i < 5; i++){ _m.multiplyMatrices(head, L(-0.4 + i * 0.2, 0.86 + (i === 2 ? 0.08 : 0), 0.28, -0.2, 0, 0, 0.13, 0.32, 0.13)); GC.push(_m, col(0xf2c94c)); }   // vương miện
    for (const sx of [-1, 1]){
      const flap = Math.sin(t * 2.2 + sx) * 0.25 + roar * 0.7;
      const ear = M[9].copy(head).multiply(L(sx * 0.7, 0.05, -0.15, 0, sx * (0.35 + flap), 0));
      _m.multiplyMatrices(ear, S(sx * 0.45, 0, 0, 1.0, 1.2, 0.12)); P.sph.push(_m, col(0x8d9096));
      if (lo){ _m.multiplyMatrices(ear, S(sx * 0.45, 0, 0.05, 0.72, 0.88, 0.06)); P.sph.push(_m, col(0xd99aa0)); _m.multiplyMatrices(ear, L(sx * 0.6, -0.65, 0, PI, 0, 0, 0.12, 0.32, 0.12)); P.cone.push(_m, col(red)); }
      _m.multiplyMatrices(head, L(sx * 0.38, -0.42, 0.62, -0.5 - roar * 0.4, 0, -sx * 0.25, 0.15, 0.95, 0.15)); P.cone.push(_m, col(0xf6f0e0));   // ngà
      _m.multiplyMatrices(head, L(sx * 0.38, -0.36, 0.55, -0.5 - roar * 0.4 + PI / 2, 0, 0, 0.2, 0.2, 0.25)); this.goldBand.push(_m, col(0xf2c94c));
      if (lo){ _m.multiplyMatrices(head, S(sx * 0.36, 0.05, 0.6, 0.14, 0.16, 0.08)); P.sph.push(_m, col(0x1a1a1a)); }
    }
    // vòi: 6 khúc nối nhau, cuộn theo hoạt ảnh
    const tr = M[9].copy(head).multiply(L(0, -0.25, 0.68, 0.3, 0, 0));
    for (let i = 0; i < 6; i++){
      const curl = Math.sin(t * 1.6 + i * 0.5) * 0.12 + swing * 0.35 - roar * 0.55 + (i > 3 ? 0.18 : 0.05);
      tr.multiply(L(0, 0, 0, curl, Math.sin(t * 1.1 + i) * 0.05, 0));
      const r = 0.38 - i * 0.045;
      _m.multiplyMatrices(tr, S(0, -0.22, 0, r, 0.48, r)); P.cyl.push(_m, col(grey));
      if (lo && i % 2 === 0){ _m.multiplyMatrices(tr, L(0, -0.1, 0, 0, 0, 0, r * 1.02, r * 1.02, 0.06)); P.box.push(_m, col(0x85888e)); }
      tr.multiply(L(0, -0.44, 0));
    }
    if (lo){ _m.multiplyMatrices(body, L(0, 2.0, -1.65, -0.5 + Math.sin(t * 2.5) * 0.25, 0, Math.sin(t * 1.7) * 0.4, 0.08, 1.0, 0.08)); P.cyl.push(_m, col(0x85888e)); }
    // vải phủ lưng màu phe, viền vàng, hàng tua đỏ hai bên
    _m.multiplyMatrices(body, S(0, 3.0, -0.1, 2.05, 0.22, 2.55)); P.box.push(_m, col(cloth));
    for (const sx of [-1, 1]){
      _m.multiplyMatrices(body, S(sx * 1.05, 2.4, -0.1, 0.1, 1.15, 2.45)); P.box.push(_m, col(cloth));
      _m.multiplyMatrices(body, S(sx * 1.08, 2.4, -0.1, 0.06, 0.7, 1.5)); P.box.push(_m, col(0x2ac4b8));
      _m.multiplyMatrices(body, S(sx * 1.09, 1.84, -0.1, 0.08, 0.12, 2.45)); G.push(_m, col(0xd9a521));
      if (lo) for (let i = 0; i < 7; i++){ _m.multiplyMatrices(body, L(sx * 1.1, 1.62, -1.1 + i * 0.33, PI, 0, 0, 0.12, 0.32, 0.12)); P.cone.push(_m, col(red)); }
    }
    // bành ghế vàng: đế, lưng tựa cao, tay vịn, nệm đỏ, hai cột cờ
    _m.multiplyMatrices(body, S(0, 3.3, -0.25, 1.4, 0.36, 1.35)); G.push(_m, col(0xd9a521));
    _m.multiplyMatrices(body, S(0, 3.5, -0.25, 1.2, 0.12, 1.15)); P.box.push(_m, col(red));
    _m.multiplyMatrices(body, S(0, 4.2, -0.88, 1.25, 1.3, 0.14)); G.push(_m, col(0xd9a521));
    _m.multiplyMatrices(body, S(0, 4.3, -0.8, 0.8, 0.8, 0.08)); P.box.push(_m, col(cloth));
    _m.multiplyMatrices(body, S(0, 4.95, -0.88, 0.5, 0.35, 0.14)); GC.push(_m, col(0xf2c94c));
    for (const sx of [-0.62, 0.62]){ _m.multiplyMatrices(body, S(sx, 3.75, -0.25, 0.12, 0.45, 1.3)); G.push(_m, col(0xd9a521)); }
    for (const sx of [-0.55, 0.55]){
      _m.multiplyMatrices(body, S(sx, 4.9, -1.0, 0.05, 2.6, 0.05)); P.cyl.push(_m, col(0xd9a521));
      _m.multiplyMatrices(body, L(sx + (sx > 0 ? 0.04 : -0.04), 5.7, -1.45, 0, Math.sin(t * 4 + sx) * 0.3, 0, 0.04, 0.6, 0.9)); P.box.push(_m, col(red));
      _m.multiplyMatrices(body, S(sx, 6.25, -1.0, 0.12, 0.12, 0.12)); GS.push(_m, col(0xf2c94c));
    }
    const lk: Look = { ...this.lookOf(u), shirt: 0xd9a521, sleeve: 0x8a3ab8, pants: 0x8a3ab8, boots: 0x5a2a1a, ragged: false, hat: 'turban', hatColor: 0x8a3ab8, skirt: 0, armor: false, angry: false, hairStyle: 'short' };
    const p = pose(); p.sit = true; p.legL = p.legR = -1.3; p.armR = -1.6 + roar * -1.2; p.armL = -0.5; p.armLz = 0.3; p.bend = stomp * 0.2;
    if (u.state === 'cheer') this.cheerPose(u, p, t);
    this.human(M[10].copy(body).multiply(S(0, 3.5, -0.3, 1, 1, 1)), lk, p, u.lod);
    _m.multiplyMatrices(M[5], L(0, 0, 0.3, PI / 2, 0, 0, 0.05, 1.3, 0.05)); P.cyl.push(_m, col(0xf2c94c));
  }

  /* ------------------------------------------------------- choáng, thanh máu */
  private stars(u: CUnit, now: number){
    const h = ANCHOR[u.info.kind] * (u.info.kind === 'voi' ? 0.9 : 1.02);
    for (let i = 0; i < 3; i++){
      const a = now / 220 + i * 2.09;
      this.P.glow.push(_m.compose(_v.set(u.rx + Math.cos(a) * 0.35, u.ry + h, u.rz + Math.sin(a) * 0.35), _q.identity(), _s.setScalar(0.14)), _c.setHex(0xffe14a));
    }
  }
  // thanh máu 3D cho quân không có bảng tên (chỉ hiện khi vừa mất máu hoặc là boss)
  plated = new Set<number>();
  private hpBar(u: CUnit, now: number){
    if (this.plated.has(u.id)) return;
    const frac = Math.max(0, Math.min(1, u.hp / Math.max(1, u.info.maxHp)));
    if (!u.def.boss && (frac >= 0.999 || now - u.dmgAt > 4000)) return;
    const w = u.def.boss ? 1.6 : u.info.kind === 'xechien' ? 1.1 : 0.7, h = u.def.boss ? 0.14 : 0.09, y = ANCHOR[u.info.kind] + 0.2;
    _v.set(u.rx, u.ry + y, u.rz);
    this.P.bar.push(_m.compose(_v, this.quat, _s.set(w + 0.06, h + 0.05, 1)), _c.setHex(0x1a1410));
    const right = _s.set(1, 0, 0).applyQuaternion(this.quat).multiplyScalar(-(1 - frac) * w / 2);
    _v.add(right);
    this.P.bar.push(_m.compose(_v, this.quat, _s.set(w * frac, h, 1)), _c.setHex(frac > 0.5 ? TEAM_INFO[u.team].color : frac > 0.25 ? 0xffb02e : 0xff3a2a));
  }
}

function lerpAngle(a: number, b: number, k: number){ let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * k; }
