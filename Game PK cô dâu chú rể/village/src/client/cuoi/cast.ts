import * as THREE from 'three';

// Nhân vật chibi cho đám cưới: đầu to, mắt to có điểm sáng, má hồng, tóc ngắn hoặc dài, áo dài có tà.
// Mỗi bộ phận là một InstancedMesh dùng chung, nên vài chục người vẫn chỉ tốn khoảng 20 lượt vẽ.
export type Role = 'bride' | 'groom' | 'guest' | 'seat' | 'band' | 'extra' | 'waiter';
export type Anim = 'idle' | 'walk' | 'clap' | 'eat' | 'couple' | 'play' | 'drum' | 'cheer' | 'bow' | 'toast' | 'cut' | 'drink' | 'raise' | 'kick' | 'hurt' | 'swing' | 'pull' | 'disco' | 'twist' | 'wave';

export interface Look {
  skin: number; hair: number; longHair: boolean; shirt: number; pants: number; tunic: boolean;
  hat: 'none' | 'man' | 'khan' | 'non'; hatColor: number; scale: number; bouquet: boolean; trim: number;
}
export interface Actor {
  id: string; name: string; role: Role; look: Look; key: string;
  x: number; z: number; yaw: number; tx: number; tz: number; tyaw: number;
  anim: Anim; pose: Anim | ''; phase: number; seen: number; bubble: string; bubbleUntil: number; giftAt: number; cheerUntil: number;
  speed: number; load: '' | 'beer' | 'food'; glassUntil: number; hold: '' | 'stick';   // hold: cầm gậy lúc PK   // phục vụ chạy nhanh hơn, bê két bia hay mâm món; khách cầm ly khi nâng ly
}

const CAP = 96;
const SKINS = [0xf6d2b4, 0xf0c39e, 0xe8b58f, 0xf8dcc4];
const AO_DAI = [0xf28cb4, 0xf2c84b, 0x9b6fd0, 0x7fb6e8, 0xf6f1e6, 0x8fd3b6, 0xff9e7a, 0xe25a7a];
const MEN = [0x6b4228, 0x24365e, 0xf4f0e6, 0x2f6f8f, 0x5c3a6e];

function hash(s: string){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

// Trang phục theo vai và theo id (cùng người luôn mặc cùng bộ)
// Trang phục theo vai, giới tính tự chọn (nam / nữ) và số lần đổi đồ (quà từ 20 xu). Cùng người cùng lần đổi thì luôn cùng bộ.
const BRIDE = [[0xfbf7f0, 0xfbf7f0, 0xf4c6d4], [0xd61f2c, 0xf2c94c, 0xf2c94c], [0xf28cb4, 0xfbf7f0, 0xffffff], [0xf2c84b, 0xd61f2c, 0xd61f2c]];   // áo, mấn, viền
const GROOM = [[0xd01e24, 0xd01e24, 0xf2c94c], [0x2f63c8, 0x2f63c8, 0xf2c94c], [0xe2a93a, 0xd01e24, 0xd01e24], [0x1f2a3a, 0x1f2a3a, 0xf2c94c]];
// Top 3 quà cưới tháng: áo dài gấm sặc sỡ theo hạng (vàng đỏ, hồng sen viền vàng, xanh ngọc viền vàng), khăn đóng cùng màu
const TOP_LOOK: Record<number, { shirt: number; trim: number; pants: number; hat: number }> = {
  1: { shirt: 0xffc21a, trim: 0xd61f2c, pants: 0xb3141f, hat: 0xffd84a },
  2: { shirt: 0xff3fa4, trim: 0xffe14a, pants: 0xfff1f6, hat: 0xff3fa4 },
  3: { shirt: 0x18c4d8, trim: 0xffd45a, pants: 0x2a2a6a, hat: 0x18c4d8 },
};
export function lookFor(id: string, role: Role, gender: '' | 'nam' | 'nu' = '', look = 0, rank = 0): Look {
  const h = hash(id) + look * 7919, pick = <T>(a: T[], k: number) => a[(h >>> k) % a.length];
  const base: Look = { skin: SKINS[hash(id) % SKINS.length], hair: 0x2a1c14, longHair: false, shirt: 0xffffff, pants: 0x2a2420, tunic: false, hat: 'none', hatColor: 0, scale: 1, bouquet: false, trim: 0 };
  if (role === 'bride'){ const [shirt, man, trim] = BRIDE[look % BRIDE.length]; return { ...base, longHair: true, shirt, pants: 0xfbf7f0, tunic: true, hat: 'man', hatColor: man, bouquet: true, trim }; }
  if (role === 'groom'){ const [shirt, hat, trim] = GROOM[look % GROOM.length]; return { ...base, shirt, pants: 0x1e1a18, tunic: true, hat: 'khan', hatColor: hat, trim }; }
  if (role === 'band') return { ...base, shirt: 0x2f63c8, pants: 0xf4f0e6, tunic: true, hat: 'khan', hatColor: 0x2f63c8, trim: 0xd8e4ff };
  if (role === 'waiter') return { ...base, hair: 0x1a1210, shirt: 0xffffff, pants: 0x1c1c22, trim: 0xd61f2c };          // phục vụ: áo trắng, nơ đỏ, quần đen
  const woman = { ...base, longHair: true, hair: pick([0x2a1c14, 0x3a2418, 0x1e1410], 6), shirt: pick(AO_DAI, 13), pants: 0xf6f1e6, tunic: true, hat: (h >>> 17) % 6 === 0 ? 'non' as const : 'none' as const, hatColor: 0xe9d39a };
  const man = { ...base, shirt: pick(MEN, 15), pants: pick([0x2a2420, 0x3b3f4a, 0x5b4632], 19), tunic: (h >>> 21) % 3 === 0, hat: (h >>> 23) % 5 === 0 ? 'khan' as const : 'none' as const, hatColor: 0x2a2420 };
  const top = TOP_LOOK[rank];
  if (top && (role === 'guest' || role === 'seat')){
    const b = gender === 'nam' ? man : woman;
    return { ...b, shirt: top.shirt, trim: top.trim, pants: top.pants, tunic: true, hat: 'khan', hatColor: top.hat, scale: 1.08 };
  }
  if (gender === 'nu') return woman;
  if (gender === 'nam') return man;
  const kind = hash(id) % 100;
  if (kind < 14) return { ...base, hair: 0xd9d4cc, longHair: (h >>> 7) % 2 === 0, shirt: pick([0x6b4228, 0x5c3a6e, 0x3b3a52], 9), pants: 0xf0ebe0, tunic: true, hat: 'khan', hatColor: 0x2a2420 };   // cụ già
  if (kind < 26) return { ...base, scale: 0.72, longHair: (h >>> 5) % 2 === 0, shirt: pick(AO_DAI, 11), pants: 0xf6f1e6, tunic: true };                                                  // trẻ con
  return kind < 66 ? woman : man;
}

const _m = new THREE.Matrix4(), _root = new THREE.Matrix4(), _up = new THREE.Matrix4(), _piv = new THREE.Matrix4(), _tmp = new THREE.Matrix4();
const _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler(), _c = new THREE.Color(), _hand = new THREE.Vector3(), _arm = new THREE.Matrix4();
const L = (x: number, y: number, z: number, rx: number, ry: number, rz: number, sx: number, sy: number, sz: number) =>
  _tmp.compose(_v.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));

type PartName = 'legL' | 'legR' | 'shoeL' | 'shoeR' | 'tunic' | 'body' | 'collar' | 'armL' | 'armR' | 'handL' | 'handR'
  | 'head' | 'face' | 'hair' | 'hairBack' | 'hat' | 'hatRing' | 'bouquet' | 'prop' | 'load';

export class Cast {
  readonly group = new THREE.Group();
  readonly actors = new Map<string, Actor>();
  readonly ranks = new Map<string, number>();         // hạng top quà cưới tháng: 1, 2, 3
  private parts: Record<PartName, THREE.InstancedMesh>;

  constructor(){
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.62 });
    const cloth = new THREE.MeshStandardMaterial({ roughness: 0.55, side: THREE.DoubleSide });
    const mk = (g: THREE.BufferGeometry, m: THREE.Material = mat, shadow = true) => { const x = new THREE.InstancedMesh(g, m, CAP); x.frustumCulled = false; x.castShadow = shadow; x.count = 0; return x; };
    const limb = new THREE.CylinderGeometry(0.5, 0.42, 1, 12).translate(0, -0.5, 0);
    this.parts = {
      legL: mk(limb), legR: mk(limb),
      shoeL: mk(new THREE.SphereGeometry(0.5, 12, 8).scale(1, 0.6, 1.5)), shoeR: mk(new THREE.SphereGeometry(0.5, 12, 8).scale(1, 0.6, 1.5)),
      tunic: mk(new THREE.CylinderGeometry(0.38, 0.62, 1, 18, 1, true).translate(0, -0.5, 0), cloth),        // tà áo dài xòe từ eo xuống
      body: mk(new THREE.CylinderGeometry(0.42, 0.5, 1, 18).translate(0, 0.5, 0)),
      collar: mk(new THREE.CylinderGeometry(0.5, 0.5, 1, 14).translate(0, 0.5, 0)),
      armL: mk(limb), armR: mk(limb),
      handL: mk(new THREE.SphereGeometry(0.5, 10, 8)), handR: mk(new THREE.SphereGeometry(0.5, 10, 8)),
      head: mk(new THREE.SphereGeometry(0.34, 28, 20)),
      face: mk(faceGeometry(), new THREE.MeshBasicMaterial({ vertexColors: true }), false),
      hair: mk(new THREE.SphereGeometry(0.365, 26, 14, 0, Math.PI * 2, 0, Math.PI * 0.56).rotateX(-0.42)),
      hairBack: mk(new THREE.SphereGeometry(0.5, 16, 12)),
      hat: mk(new THREE.CylinderGeometry(0.5, 0.5, 1, 26)), hatRing: mk(new THREE.TorusGeometry(0.5, 0.18, 12, 30).rotateX(Math.PI / 2)),
      bouquet: mk(bouquetGeometry(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 })),
      prop: mk(new THREE.BoxGeometry(1, 1, 1)),
      load: mk(new THREE.CylinderGeometry(0.5, 0.5, 1, 14)),                                               // chai bia trong két, đĩa món, bọt bia
    };
    for (const p of Object.values(this.parts)) this.group.add(p);
    this.parts.hat.castShadow = false; this.parts.hatRing.castShadow = false;   // mũ khăn không đổ bóng làm tối mặt
  }

  // Thêm hoặc cập nhật một người. Người mới bước vào từ cuối thảm đỏ.
  set(id: string, name: string, role: Role, spot: { x: number; z: number; yaw: number }, entrance: { x: number; z: number }, now: number, gender: '' | 'nam' | 'nu' = '', look = 0){
    let a = this.actors.get(id);
    const rank = this.ranks.get(id) ?? 0, key = `${role}|${gender}|${look}|${rank}`;
    if (!a){
      const far = role === 'band' || role === 'extra';
      a = { id, name, role, key, look: lookFor(id, role, gender, look, rank), x: far ? spot.x : entrance.x + (Math.random() - 0.5), z: far ? spot.z : entrance.z, yaw: Math.PI,
        tx: spot.x, tz: spot.z, tyaw: spot.yaw, anim: 'idle', pose: '', phase: Math.random() * 6, seen: now, bubble: '', bubbleUntil: 0, giftAt: 0, cheerUntil: 0, speed: 2.4, load: '', glassUntil: 0, hold: '' };
      this.actors.set(id, a);
    }
    if (a.key !== key){ a.role = role; a.key = key; a.look = lookFor(id, role, gender, look, rank); }
    a.name = name; a.tx = spot.x; a.tz = spot.z; a.tyaw = spot.yaw; a.seen = now;
    return a;
  }

  // Ai không còn trong danh sách lần cập nhật này thì rời sân
  prune(now: number){
    for (const [id, a] of this.actors) if (a.seen < now){ this.actors.delete(id); const f = this.faces.get(id); if (f){ this.group.remove(f); f.geometry.dispose(); (f.material as THREE.Material).dispose(); this.faces.delete(id); } }
  }

  say(id: string, text: string, ms = 3500, now = performance.now()){ const a = this.actors.get(id); if (a && text){ a.bubble = text; a.bubbleUntil = now + ms; } }
  cheer(id: string, ms = 3000, now = performance.now()){ const a = this.actors.get(id); if (a) a.cheerUntil = now + ms; }

  update(dt: number, now: number){
    let i = 0;
    for (const a of this.actors.values()){
      const dx = a.tx - a.x, dz = a.tz - a.z, d = Math.hypot(dx, dz);
      const walking = d > 0.05;
      if (walking){
        const step = Math.min(d, a.speed * dt);
        a.x += dx / d * step; a.z += dz / d * step;
        a.yaw = turn(a.yaw, Math.atan2(dx, dz), dt * 8);
      } else a.yaw = turn(a.yaw, a.tyaw, dt * 5);
      a.anim = walking ? 'walk' : a.pose ? (a.pose === 'toast' && a.role === 'seat' ? 'drink' : a.pose) : now < a.cheerUntil ? 'cheer'
        : a.role === 'bride' || a.role === 'groom' ? 'couple' : a.role === 'seat' ? 'eat' : a.role === 'band' ? (a.id === 'band-1' ? 'drum' : 'play') : 'clap';
      if (a.z < -3.4) continue;                           // đã vào trong đình: khuất sau vách
      this.draw(i++, a, now / 1000 + a.phase, now);
      if (i >= CAP) break;
    }
    for (const p of Object.values(this.parts)){ p.count = i; p.instanceMatrix.needsUpdate = true; if (p.instanceColor) p.instanceColor.needsUpdate = true; }
  }

  private draw(i: number, a: Actor, t: number, now: number){
    const lk = a.look, sit = a.anim === 'eat' || a.anim === 'drink';
    let legL = 0, legR = 0, armL = 0.08, armR = 0.08, armLz = 0.12, armRz = -0.12, bend = 0, bob = 0, headTilt = 0, spin = 0;
    const sw = Math.sin(t * 9);
    switch (a.anim){
      case 'walk': legL = sw * 0.55; legR = -sw * 0.55; armL = -sw * 0.45; armR = sw * 0.45; bob = Math.abs(sw) * 0.04; break;
      case 'clap': { const k = Math.max(0, Math.sin(t * 7)); armL = armR = -1.05; armLz = 0.55 - k * 0.35; armRz = -0.55 + k * 0.35; headTilt = Math.sin(t * 1.3) * 0.08; break; }
      case 'eat': { const k = Math.max(0, Math.sin(t * 2.4)); legL = legR = -1.45; armR = -1.1 - k * 0.9; armL = -0.8; bend = 0.12; break; }
      case 'couple': {
        if (lk.bouquet){ armL = armR = -0.95; armLz = 0.42; armRz = -0.42; }
        else { const w = (t % 8) < 1.8; armR = w ? Math.PI - 0.5 + Math.sin(t * 7) * 0.3 : -0.2; armRz = w ? -0.25 : -0.3; armL = -0.2; armLz = 0.3; }
        bend = (t % 13) < 1.1 ? 0.35 : 0; headTilt = Math.sin(t * 0.9) * 0.1; break;
      }
      case 'play': armL = -1.1 + Math.sin(t * 6) * 0.15; armR = -0.9; armLz = 0.5; armRz = -0.45; headTilt = Math.sin(t * 2) * 0.12; break;
      case 'drum': { const k = Math.sin(t * 5); armL = -1.5 - k * 0.6; armR = -1.5 + k * 0.6; break; }
      case 'bow': { const k = Math.max(0, Math.sin(t * 1.6)); bend = 0.15 + k * 0.55; armL = armR = -0.9; armLz = 0.45; armRz = -0.45; break; }   // chắp tay vái
      case 'raise':                                                                                                    // cả sân đứng dậy nâng ly
      case 'toast': armR = -2.0 + Math.sin(t * 2) * 0.12; armRz = -0.35; armL = -0.4; headTilt = 0.1; break;                                        // nâng ly mời nhau
      case 'drink': { const k = Math.max(0, Math.sin(t * 1.8)); legL = legR = -1.45; armR = -1.6 - k * 0.9; armRz = -0.2; armL = -0.5; headTilt = -k * 0.25; break; }   // ngồi nâng ly bia, ngửa cổ uống
      case 'cut': { const k = Math.sin(t * 3); armL = armR = -1.2 - k * 0.25; armLz = 0.3; armRz = -0.3; bend = 0.2; break; }                         // cùng cầm dao cắt bánh
      // PK cướp dâu: đá vào mông, ôm đầu kêu đau, vung gậy, kéo tai
      case 'kick': legR = -1.5; legL = 0.25; armL = -0.7; armR = 0.6; armLz = 0.5; armRz = -0.5; bend = -0.15; break;
      case 'hurt': armL = armR = Math.PI - 0.5; armLz = -0.45; armRz = 0.45; headTilt = Math.sin(t * 14) * 0.3; bob = Math.abs(Math.sin(t * 12)) * 0.06; bend = Math.sin(t * 7) * 0.12; break;
      case 'swing': { const k = Math.abs(Math.sin(t * 8)); armR = -3.0 + k * 2.3; armRz = -0.15; armL = -0.5; bend = 0.05 + k * 0.2; break; }
      case 'pull': armR = -2.1 + Math.sin(t * 9) * 0.12; armRz = 0.3; armL = -0.3; armLz = 0.3; bend = -0.18; headTilt = 0.15; break;
      // điệu nhảy sàn xưa, nhịp 124 (13 rad/giây là một phách): chỉ tay lên trời rồi chéo xuống, lắc twist, giơ hai tay lắc lư
      case 'disco': { const k = Math.sin(t * 6.5) > 0; armR = k ? Math.PI - 0.3 : -0.5; armRz = k ? -0.35 : 0.5; armL = -0.4; armLz = 0.25; bob = Math.abs(Math.sin(t * 13)) * 0.07; spin = Math.sin(t * 6.5) * 0.35; headTilt = k ? -0.15 : 0.15; break; }
      case 'twist': { const k = Math.sin(t * 13); armL = armR = -1.3; armLz = 0.6 + k * 0.3; armRz = -0.6 + k * 0.3; legL = k * 0.35; legR = -k * 0.35; spin = k * 0.55; bend = 0.12; bob = Math.abs(k) * 0.05; break; }
      case 'wave': { const k = Math.sin(t * 6.5); armL = armR = Math.PI - 0.25; armLz = 0.2 + k * 0.4; armRz = -0.2 + k * 0.4; bob = Math.abs(Math.sin(t * 13)) * 0.09; headTilt = k * 0.2; legL = Math.max(0, k) * 0.3; legR = Math.max(0, -k) * 0.3; break; }
      case 'cheer': armL = armR = Math.PI - 0.35 + Math.sin(t * 10) * 0.25; armLz = 0.25; armRz = -0.25; bob = Math.abs(Math.sin(t * 10)) * 0.12; break;
      default: armL = armR = 0.06 + Math.sin(t * 1.4) * 0.03;
    }
    if (a.load){ armL = armR = -1.3; armLz = 0.32; armRz = -0.32; }   // bê két bia, mâm món bằng hai tay trước ngực
    const s = lk.scale * (a.role === 'bride' || a.role === 'groom' ? 1.12 : 1);
    _root.compose(_v.set(a.x, bob + (sit ? -0.22 : 0) * s, a.z), _q.setFromEuler(_e.set(0, a.yaw + spin, 0)), _s.set(s, s, s));
    _up.copy(_root).multiply(L(0, 0.62, 0, bend, 0, 0, 1, 1, 1));
    const set = (p: PartName, base: THREE.Matrix4, l: THREE.Matrix4, col: number) => { _m.multiplyMatrices(base, l); this.parts[p].setMatrixAt(i, _m); this.parts[p].setColorAt(i, _c.set(col)); };
    const hide = (p: PartName) => set(p, _root, L(0, 0, 0, 0, 0, 0, 0, 0, 0), 0);
    const limb = (base: THREE.Matrix4, x: number, y: number, rx: number, rz: number, p: PartName, end: PartName, len: number, w: number, col: number, endCol: number, foot: boolean) => {
      _piv.copy(base).multiply(L(x, y, 0, rx, 0, rz, 1, 1, 1));
      set(p, _piv, L(0, 0, 0, 0, 0, 0, w, len, w), col);
      set(end, _piv, foot ? L(0, -len, 0.05, 0, 0, 0, 0.17, 0.17, 0.17) : L(0, -len - 0.02, 0, 0, 0, 0, 0.12, 0.12, 0.12), endCol);
    };
    limb(_root, -0.1, 0.62, legL, 0, 'legL', 'shoeL', 0.58, 0.15, lk.pants, a.role === 'bride' ? 0xfbf7f0 : 0x2a1c14, true);
    limb(_root, 0.1, 0.62, legR, 0, 'legR', 'shoeR', 0.58, 0.15, lk.pants, a.role === 'bride' ? 0xfbf7f0 : 0x2a1c14, true);
    set('body', _up, L(0, 0, 0, 0, 0, 0, 0.42, 0.48, 0.3), lk.shirt);
    set('collar', _up, L(0, 0.47, 0, 0, 0, 0, 0.16, 0.06, 0.14), lk.trim || lk.shirt);
    if (lk.tunic) set('tunic', _up, L(0, 0.04, 0, -Math.abs(legL) * 0.3 - (sit ? 0.9 : 0), 0, 0, 0.62, sit ? 0.32 : 0.56, 0.5), lk.shirt); else hide('tunic');
    limb(_up, -0.24, 0.42, armL, armLz, 'armL', 'handL', 0.4, 0.12, lk.shirt, lk.skin, false);
    limb(_up, 0.24, 0.42, armR, armRz, 'armR', 'handR', 0.4, 0.12, lk.shirt, lk.skin, false);
    _arm.copy(_piv);
    _hand.setFromMatrixPosition(_tmp.multiplyMatrices(_piv, L(0, -0.44, 0, 0, 0, 0, 1, 1, 1)));
    // đầu to, mặt, tóc
    const hb = L(0, 0.86, 0, headTilt * 0.4, headTilt, 0, 1, 1, 1);
    _piv.copy(_up).multiply(hb);
    const head = _piv.clone();
    set('head', head, L(0, 0, 0, 0, 0, 0, 1, 0.96, 0.96), lk.skin);
    // có ảnh đại diện TikTok thì mặt là ảnh tròn gắn trước đầu, không thì vẽ mặt chibi
    if (this.faceOf(a, head)) hide('face'); else set('face', head, L(0, 0, 0, 0, 0, 0, 1, 1, 1), 0xffffff);
    set('hair', head, L(0, 0.01, -0.01, 0, 0, 0, 1, 1, 1), lk.hair);
    if (lk.longHair && lk.hat !== 'khan') set('hairBack', head, L(0, -0.2, -0.16, 0.12, 0, 0, 0.62, 0.95, 0.34), lk.hair); else hide('hairBack');
    // mấn cô dâu: vành tròn dày; khăn đóng: trụ thấp có viền; nón lá: chóp nón
    if (lk.hat === 'man'){ set('hatRing', head, L(0, 0.2, -0.02, -0.25, 0, 0, 0.62, 0.62, 0.62), lk.hatColor); hide('hat'); }
    else if (lk.hat === 'khan'){ set('hat', head, L(0, 0.22, -0.02, -0.18, 0, 0, 0.7, 0.18, 0.7), lk.hatColor); set('hatRing', head, L(0, 0.17, -0.01, -0.18, 0, 0, 0.66, 0.4, 0.66), lk.trim || lk.hatColor); }
    else if (lk.hat === 'non'){ set('hat', head, L(0, 0.3, 0, 0, 0, 0, 1.05, 0.06, 1.05), lk.hatColor); hide('hatRing'); }
    else { hide('hat'); hide('hatRing'); }
    if (lk.bouquet) set('bouquet', _up, L(0, 0.08, 0.42, 0.3, 0, 0, 1, 1, 1), 0xffffff); else hide('bouquet');
    // nhạc cụ: đàn nguyệt, sáo, dùi trống
    if (a.role === 'band') set('prop', _up, a.anim === 'drum' ? L(0.25, 0.25, 0.35, -0.6, 0, 0, 0.05, 0.05, 0.5) : a.id === 'band-0' ? L(-0.05, 0.25, 0.3, 0, 0, 0.9, 0.36, 0.36, 0.06) : L(0.1, 0.5, 0.32, 0, 0, 1.4, 0.04, 0.6, 0.04), a.id === 'band-0' ? 0xb07a3a : 0x6e4428);
    else if (a.hold === 'stick') set('prop', _arm, L(0, -0.75, 0.02, 0, 0, 0, 0.07, 0.95, 0.07), 0x8a5a2a);   // gậy tre dài nối theo cánh tay
    else if (a.load === 'beer') set('prop', _up, L(0, 0.22, 0.42, 0, 0, 0, 0.52, 0.24, 0.36), 0xd42a2a);          // két bia nhựa đỏ
    else if (a.load === 'food') set('prop', _up, L(0, 0.3, 0.44, 0, 0, 0, 0.6, 0.03, 0.6), 0xd8dade);             // mâm nhôm
    else if (a.anim === 'toast' || a.anim === 'drink' || now < a.glassUntil){
      // ly bia vàng luôn dựng đứng trong tay phải
      set('prop', _root.clone().setPosition(_hand), L(0, 0.02, 0, 0, 0, 0, 0.11 / s, 0.16 / s, 0.11 / s), 0xf2a92a);
    } else hide('prop');
    if (a.load === 'beer') set('load', _up, L(0, 0.4, 0.42, 0, 0, 0, 0.42, 0.14, 0.28), 0x2f7a3a);             // cổ chai xanh nhô khỏi két
    else if (a.load === 'food') set('load', _up, L(0, 0.38, 0.44, 0, 0, 0, 0.34, 0.14, 0.34), 0xe8742a);         // đĩa gà quay, tôm
    else if (a.anim === 'toast' || a.anim === 'drink' || now < a.glassUntil) set('load', _root.clone().setPosition(_hand), L(0, 0.1, 0, 0, 0, 0, 0.12 / s, 0.04 / s, 0.12 / s), 0xfffbea);   // bọt bia
    else hide('load');
  }

  // Ảnh đại diện làm mặt: tải /avatar/<id> một lần (không có thì thử lại sau 1 phút), cắt tròn có viền màu theo vai.
  private faces = new Map<string, THREE.Mesh>();
  private avatars = new Map<string, { tex: THREE.Texture | null; retryAt: number; loading: boolean; ring: number }>();
  private faceGeo = new THREE.CircleGeometry(0.3, 32);

  private avatarFor(a: Actor): THREE.Texture | null {
    if (a.role === 'band' || a.role === 'extra' || a.role === 'waiter') return null;
    const ring = a.role === 'bride' ? 0xff8fb0 : a.role === 'groom' ? 0xf2c94c : 0xffffff;
    let rec = this.avatars.get(a.id);
    const now = performance.now();
    if (rec && rec.tex && rec.ring !== ring){ rec.tex.dispose(); rec.tex = null; rec.retryAt = 0; }   // đổi vai thì vẽ lại viền
    if (!rec){ rec = { tex: null, retryAt: 0, loading: false, ring }; this.avatars.set(a.id, rec); if (this.avatars.size > 200) this.avatars.delete(this.avatars.keys().next().value as string); }
    if (!rec.tex && !rec.loading && now >= rec.retryAt){
      rec.loading = true; rec.ring = ring;
      const img = new Image(), r = rec;
      img.onload = () => { r.loading = false; r.tex = circleTexture(img, ring); };
      img.onerror = () => { r.loading = false; r.retryAt = performance.now() + 60_000; };
      img.src = '/avatar/' + encodeURIComponent(a.id);
    }
    return rec.tex;
  }

  private faceOf(a: Actor, head: THREE.Matrix4){
    const tex = this.avatarFor(a);
    let mesh = this.faces.get(a.id);
    if (!tex){ if (mesh) mesh.visible = false; return false; }
    if (!mesh){
      mesh = new THREE.Mesh(this.faceGeo, new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
      mesh.matrixAutoUpdate = false; this.faces.set(a.id, mesh); this.group.add(mesh);
    }
    const m = mesh.material as THREE.MeshBasicMaterial;
    if (m.map !== tex){ m.map = tex; m.needsUpdate = true; }
    mesh.visible = true;
    mesh.matrix.multiplyMatrices(head, L(0, -0.01, 0.325, 0, 0, 0, 1, 1, 1));
    return true;
  }

  // Ai đang được hiện tên: cô dâu chú rể luôn hiện, khách hiện khi vừa nói hay vừa tặng quà
  // Mọi người xem đều có tên trên đầu; cô dâu chú rể và người vừa nói, vừa tặng quà xếp trước để luôn được hiện
  labeled(now: number){
    const rank = (a: Actor) => a.role === 'bride' || a.role === 'groom' ? 0 : now < a.bubbleUntil || now - a.giftAt < 8000 ? 1 : 2;
    return [...this.actors.values()].filter(a => a.role !== 'band' && a.role !== 'extra' && a.name && a.z >= -3.4 && (a.role !== 'waiter' || now < a.bubbleUntil)).sort((x, y) => rank(x) - rank(y));   // phục vụ chỉ hiện chữ lúc đang hô   // đã vào trong đình thì thôi hiện tên
  }
}

// Ảnh vuông cắt tròn, viền màu theo vai
function circleTexture(img: HTMLImageElement, ring: number){
  const c = document.createElement('canvas'); c.width = c.height = 160;
  const g = c.getContext('2d')!;
  g.save(); g.beginPath(); g.arc(80, 80, 72, 0, Math.PI * 2); g.clip();
  g.drawImage(img, 8, 8, 144, 144); g.restore();
  g.beginPath(); g.arc(80, 80, 74, 0, Math.PI * 2); g.lineWidth = 10; g.strokeStyle = '#' + ring.toString(16).padStart(6, '0'); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function turn(a: number, b: number, k: number){ let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * Math.min(1, k); }

// Mặt chibi: mắt to nâu đen có hai đốm sáng, lông mày, má hồng, miệng cười. Đặt trên mặt trước của đầu bán kính 0,34.
function faceGeometry(){
  const pos: number[] = [], col: number[] = [];
  const add = (g: THREE.BufferGeometry, color: number) => {
    const c = new THREE.Color(color), p = g.toNonIndexed().attributes.position;
    for (let i = 0; i < p.count; i++){ pos.push(p.getX(i), p.getY(i), p.getZ(i)); col.push(c.r, c.g, c.b); }
  };
  for (const s of [-1, 1]){
    add(new THREE.SphereGeometry(0.068, 14, 10).scale(0.85, 1.25, 0.45).translate(s * 0.12, -0.02, 0.305), 0x2a160c);
    add(new THREE.SphereGeometry(0.024, 8, 6).translate(s * 0.105, 0.03, 0.33), 0xffffff);
    add(new THREE.SphereGeometry(0.012, 6, 4).translate(s * 0.135, -0.05, 0.33), 0xffffff);
    add(new THREE.BoxGeometry(0.1, 0.018, 0.02).rotateZ(s * -0.18).translate(s * 0.125, 0.115, 0.31), 0x3a2418);
    add(new THREE.SphereGeometry(0.05, 10, 8).scale(1.4, 0.7, 0.3).translate(s * 0.2, -0.11, 0.255), 0xf59aa6);
  }
  add(new THREE.TorusGeometry(0.035, 0.009, 4, 12, Math.PI).rotateZ(Math.PI).translate(0, -0.13, 0.32), 0xb4483c);
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return out;
}

// Bó hoa cưới: chùm hoa hồng trắng hồng, cuống xanh buộc nơ
function bouquetGeometry(){
  const pos: number[] = [], col: number[] = [];
  const add = (g: THREE.BufferGeometry, color: number) => {
    const c = new THREE.Color(color), p = g.toNonIndexed().attributes.position;
    for (let i = 0; i < p.count; i++){ pos.push(p.getX(i), p.getY(i), p.getZ(i)); col.push(c.r, c.g, c.b); }
  };
  const cols = [0xffffff, 0xffc2d4, 0xff8fb0, 0xfff0f4];
  for (let k = 0; k < 12; k++){ const a = k * 2.4, r = k < 1 ? 0 : 0.07 + (k % 3) * 0.035; add(new THREE.IcosahedronGeometry(0.055, 1).translate(Math.cos(a) * r, 0.12 + (k % 2) * 0.02, Math.sin(a) * r), cols[k % cols.length]); }
  add(new THREE.CylinderGeometry(0.03, 0.02, 0.22, 8).translate(0, -0.02, 0), 0x4f8a3a);
  add(new THREE.TorusGeometry(0.035, 0.012, 6, 12).rotateX(Math.PI / 2).translate(0, 0.02, 0), 0xff7aa0);
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  out.computeVertexNormals();
  return out;
}
