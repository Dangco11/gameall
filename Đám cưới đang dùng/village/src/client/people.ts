import * as THREE from 'three';
import { COSTUMES, OUTFIT } from '../shared/balance.ts';
import type { ActKind, FestivalState, PubPlayer } from '../shared/types.ts';
import { GATE, IN_LOT, LOTS, MARKET, PLOTS, PLOT_SIZE, POND, POND_R, SQUARE, at, fishingSpot, riverZ, route } from './layout.ts';
import type { V2 } from './layout.ts';

const CAP = 700;
const SKIN = 0xf0c8a0, STRAW = 0xe6cf8f, SCARF = 0x2e4f7d, HAIR = 0x2a2420, SHOE = 0x3a2a20;
type Anim = 'idle' | 'walk' | 'dig' | 'water' | 'toss' | 'fish' | 'cheer' | 'pull' | 'row' | 'grab' | 'eat' | 'couple';
export type Role = '' | 'bride' | 'groom' | 'guest';
export interface StageSpot { x: number; z: number; yaw: number; role: Role; lift: number }
// Trang phục ngày cưới, chỉ mặc khi đang ở sân cưới
const WEDDING_WEAR = {
  bride: { shirt: 0xd61f2c, pants: 0xf6f1e6, hat: 4, hatColor: 0xe2b23c, long: true },
  groom: { shirt: 0x1f4fa0, pants: 0xf6f1e6, hat: 4, hatColor: 0x1f4fa0, long: true },
};
const ACT_ANIM: Partial<Record<ActKind, Anim>> = {
  plow: 'dig', sow: 'toss', harvest: 'dig', water: 'water', fert: 'toss', feedFish: 'toss', harvestFish: 'pull', buyFish: 'toss',
  catch: 'fish', feedAnimals: 'toss', collectEggs: 'dig', buyAnimal: 'cheer', market: 'cheer', shop: 'cheer', build: 'dig',
  donate: 'cheer', festival: 'cheer', enter: 'cheer', home: 'idle', chat: 'idle',
};

export interface Person {
  id: string; name: string; sim: boolean; lot: number; level: number;
  x: number; z: number; yaw: number; path: V2[]; speed: number;
  anim: Anim; animUntil: number; phase: number; visible: boolean; online: boolean;
  goal: string; idleSince: number; activeAt: number; giftAt: number;
  bubble: string; bubbleUntil: number; outfit: PubPlayer['outfit']; slot: number;
  role: Role; lift: number; spot: StageSpot | null;
}

const _m = new THREE.Matrix4(), _root = new THREE.Matrix4(), _upper = new THREE.Matrix4(), _piv = new THREE.Matrix4(), _tmp = new THREE.Matrix4(), _c = new THREE.Color();
const _q = new THREE.Quaternion(), _v = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler();
const local = (x: number, y: number, z: number, rx: number, rz: number, sx: number, sy: number, sz: number) =>
  _tmp.compose(_v.set(x, y, z), _q.setFromEuler(_e.set(rx, 0, rz)), _s.set(sx, sy, sz));

// Nhân vật dựng bằng 8 khối instanced: hai chân, thân, hai tay, đầu, nón, đồ nghề. Hàng trăm người chỉ tốn 8 lượt vẽ.
export class People {
  readonly group = new THREE.Group();
  readonly list = new Map<string, Person>();
  private parts: Record<'legL' | 'legR' | 'footL' | 'footR' | 'body' | 'armL' | 'armR' | 'handL' | 'handR' | 'head' | 'hair' | 'face' | 'hat' | 'tool' | 'tunic', THREE.InstancedMesh>;
  private now = 0;

  constructor(){
    // Mặt mịn, tròn trịa: chân tay hình trụ, thân thon dần xuống eo, đầu tròn có tóc, mắt và má hồng
    const m = new THREE.MeshStandardMaterial({ roughness: 0.75 });
    const box = new THREE.BoxGeometry(1, 1, 1).translate(0, -0.5, 0);
    const limbGeo = new THREE.CylinderGeometry(0.5, 0.42, 1, 10).translate(0, -0.5, 0);
    const torso = new THREE.CylinderGeometry(0.5, 0.42, 1, 14).translate(0, 0.5, 0);
    const ball = new THREE.SphereGeometry(0.5, 16, 12);
    const head = new THREE.SphereGeometry(0.5, 18, 14).translate(0, 0.5, 0);
    const hair = new THREE.SphereGeometry(0.5, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.55).rotateX(-0.35).translate(0, 0.5, 0);
    const foot = new THREE.SphereGeometry(0.5, 12, 8).translate(0, 0.5, 0);
    const skirt = new THREE.CylinderGeometry(0.45, 0.6, 1, 14).translate(0, -0.5, 0);
    const mk = (g: THREE.BufferGeometry, mat: THREE.Material = m) => { const x = new THREE.InstancedMesh(g, mat, CAP); x.frustumCulled = false; x.castShadow = true; x.count = 0; return x; };
    const faceMat = new THREE.MeshBasicMaterial({ vertexColors: true });
    this.parts = {
      legL: mk(limbGeo), legR: mk(limbGeo), footL: mk(foot), footR: mk(foot), body: mk(torso), armL: mk(limbGeo), armR: mk(limbGeo),
      handL: mk(ball), handR: mk(ball), head: mk(head), hair: mk(hair), face: mk(faceGeometry(), faceMat),
      hat: mk(new THREE.ConeGeometry(0.5, 1, 18, 1).translate(0, 0.5, 0)), tool: mk(box), tunic: mk(skirt),
    };
    this.parts.face.castShadow = false;
    for (const p of Object.values(this.parts)) this.group.add(p);
  }

  homeOf(lot: number): V2 { const y = at(LOTS[lot], IN_LOT.yard); return { x: y.x + ((lot * 37) % 5 - 2) * 0.5, z: y.z }; }

  sync(p: PubPlayer, now: number){
    let c = this.list.get(p.id);
    if (!c){
      const h = this.homeOf(p.lot);
      c = { id: p.id, name: p.name, sim: p.sim, lot: p.lot, level: p.level, x: h.x, z: h.z + 6, yaw: 0, path: [], speed: 5, anim: 'idle', animUntil: 0,
        phase: Math.random() * 6, visible: p.online, online: p.online, goal: 'home', idleSince: now, activeAt: 0, giftAt: 0, bubble: '', bubbleUntil: 0, outfit: p.outfit, slot: -1, role: '', lift: 0, spot: null };
      this.list.set(p.id, c);
      if (p.online) this.goTo(c, h, 'home');
    }
    const lotChanged = c.lot !== p.lot;
    Object.assign(c, { name: p.name, sim: p.sim, lot: p.lot, level: p.level, outfit: p.outfit });
    // vừa vào live: đi từ cổng làng về nhà, như người mới tới
    if (p.online && !c.online && c.goal !== 'stage'){ c.visible = true; c.x = GATE.x + (Math.random() - 0.5) * 4; c.z = GATE.z + 2; c.online = true; this.goTo(c, this.homeOf(p.lot), 'home'); }
    if (!p.online && c.online && c.goal !== 'stage') this.goTo(c, this.homeOf(p.lot), 'leave');
    if (lotChanged) this.goTo(c, this.homeOf(p.lot), 'home');
    c.online = p.online;
  }

  remove(id: string){ this.list.delete(id); }

  say(id: string, text: string, ms = 4000){
    const c = this.list.get(id);
    if (!c || !text) return;
    c.bubble = text; c.bubbleUntil = this.now + ms; c.activeAt = this.now;
  }

  goTo(c: Person, target: V2, goal: string, anim: Anim = 'idle'){
    c.path = route({ x: c.x, z: c.z }, target);
    let len = 0, px = c.x, pz = c.z;
    for (const q of c.path){ len += Math.hypot(q.x - px, q.z - pz); px = q.x; pz = q.z; }
    c.speed = Math.max(4.5, len / 9);          // đường xa thì đi nhanh hơn, tối đa 9 giây là tới
    c.goal = goal; c.anim = anim; c.visible = true;
  }

  targetFor(act: ActKind, c: Person): V2 {
    const lot = c.lot, plot = PLOTS[lot] ?? PLOTS[0];
    switch (act){
      case 'plow': case 'sow': case 'water': case 'fert': case 'harvest': return { x: plot.x + ((lot % 3) - 1) * 1.4, z: plot.z + PLOT_SIZE / 2 + 0.4 };
      case 'feedFish': case 'harvestFish': case 'buyFish': { const p = at(LOTS[lot], IN_LOT.pond); return { x: p.x + 0.4, z: p.z + 1.5 }; }
      case 'feedAnimals': case 'collectEggs': case 'buyAnimal': { const p = at(LOTS[lot], IN_LOT.coop); return { x: p.x, z: p.z + 1.4 }; }
      case 'catch': return fishingSpot(lot);
      case 'market': case 'shop': return { x: MARKET.x - 12 + (lot % 5) * 6, z: MARKET.z + (lot % 2 ? 5.6 : -6.6) + ((lot * 13) % 7 - 3) * 0.15 };
      case 'festival': return { x: SQUARE.x + ((lot * 7) % 24) - 12, z: SQUARE.z + ((lot * 5) % 8) - 4 };
      default: return this.homeOf(lot);
    }
  }

  // Lệnh của người xem: đi tới đúng chỗ rồi làm động tác.
  act(id: string, act: ActKind, ok: boolean, bubble: string | undefined, siteOf: (act: ActKind) => V2 | null){
    const c = this.list.get(id);
    if (!c) return null;
    c.activeAt = this.now; c.online = true; c.visible = true;
    if (bubble && (c.goal !== 'stage' || act === 'chat')) this.say(id, bubble);   // ở đám cưới chỉ hiện lời nói, không hiện việc đồng áng
    if (act === 'chat' || !ok || c.goal === 'stage') return c;   // đang ở sân cưới thì chỉ nói, không bỏ mâm đi làm
    const target = siteOf(act) ?? this.targetFor(act, c);
    this.goTo(c, target, 'act:' + act, ACT_ANIM[act] ?? 'idle');
    return c;
  }

  // Sân cưới: ai có chỗ thì đi vào (xa quá thì xuất hiện ở cổng hoa rồi bước vào), ai mất chỗ thì về nhà.
  stage(spots: Map<string, StageSpot> | null, entrance: V2){
    for (const c of this.list.values()){
      const s = spots?.get(c.id);
      if (!s){
        if (c.goal === 'stage'){ c.role = ''; c.lift = 0; c.spot = null; c.animUntil = 0; this.goTo(c, this.homeOf(c.lot), c.online ? 'home' : 'leave'); }
        continue;
      }
      c.role = s.role; c.visible = true;
      if (c.goal === 'stage' && c.spot && c.spot.x === s.x && c.spot.z === s.z) continue;
      c.spot = s; c.goal = 'stage'; c.lift = 0;
      if (Math.hypot(c.x - entrance.x, c.z - entrance.z) > 25){ c.x = entrance.x; c.z = entrance.z; }
      c.path = [{ x: entrance.x - 2, z: entrance.z }, { x: s.x, z: s.z }].filter(p => Math.hypot(p.x - c.x, p.z - c.z) > 0.3);
      if (Math.hypot(c.x - s.x, c.z - s.z) < 6) c.path = [{ x: s.x, z: s.z }];
      c.speed = 3.2;
    }
  }

  // Chỗ đứng cấp một lần cho mỗi người, không đổi theo bảng điểm, để nhân vật không chạy qua chạy lại.
  private festSlots = new Map<string, number>();
  private teamSize: [number, number] = [0, 0];

  festival(f: FestivalState){
    if (f.phase === 'idle' || f.phase === 'result') return;
    for (const e of f.entrants){
      const c = this.list.get(e.id);
      if (!c || this.festSlots.has(e.id) || c.goal === 'stage') continue;
      const i = f.type === 'keoco' ? this.teamSize[e.team]++ : this.festSlots.size;
      this.festSlots.set(e.id, i);
      c.slot = i;
      let spot: V2, anim: Anim = 'cheer';
      if (f.type === 'keoco'){
        const side = e.team ? 1 : -1, k = i;
        spot = { x: SQUARE.x + side * (1.5 + k * 0.9), z: SQUARE.z + (k % 2 ? 0.25 : -0.25) }; anim = 'pull';
      } else if (f.type === 'cauca'){
        const a = i / Math.max(8, f.entrants.length) * Math.PI * 2;
        spot = { x: POND.x + Math.cos(a) * (POND_R.x + 1.2), z: POND.z + Math.sin(a) * (POND_R.z + 1.2) }; anim = 'fish';
      } else if (f.type === 'duathuyen'){
        const x = -40 + (i % 8) * 10; spot = { x, z: riverZ(x) }; anim = 'row';
      } else if (f.type === 'batvit'){
        spot = { x: SQUARE.x + ((i * 37) % 24) - 12, z: SQUARE.z + ((i * 17) % 10) - 5 }; anim = 'grab';
      } else spot = this.homeOf(c.lot);
      this.goTo(c, spot, 'fest', anim);
    }
  }

  endFestival(){
    this.festSlots.clear(); this.teamSize = [0, 0];
    for (const c of this.list.values()) if (c.goal === 'fest'){ c.slot = -1; this.goTo(c, this.homeOf(c.lot), 'home'); }
  }

  update(dt: number, now: number, contest: { keoco: number } | null){
    this.now = now;
    let n = 0;
    for (const c of this.list.values()){
      this.step(c, dt, now);
      if (!c.visible) continue;
      this.draw(n++, c, now, contest);
      if (n >= CAP) break;
    }
    for (const p of Object.values(this.parts)){ p.count = n; p.instanceMatrix.needsUpdate = true; if (p.instanceColor) p.instanceColor.needsUpdate = true; }
  }

  private step(c: Person, dt: number, now: number){
    if (c.path.length){
      const q = c.path[0], dx = q.x - c.x, dz = q.z - c.z, d = Math.hypot(dx, dz), stepLen = c.speed * dt;
      if (d > 0.01) c.yaw = Math.atan2(dx, dz);
      if (d <= stepLen){ c.x = q.x; c.z = q.z; c.path.shift(); }
      else { c.x += dx / d * stepLen; c.z += dz / d * stepLen; }
      if (!c.path.length){
        c.idleSince = now;
        if (c.goal === 'leave'){ c.visible = false; return; }
        if (c.goal.startsWith('act:')){ c.animUntil = now + 4000; c.yaw = c.goal === 'act:catch' ? Math.PI : c.goal.includes('plow') || c.goal.includes('sow') || c.goal.includes('water') || c.goal.includes('fert') || c.goal.includes('harvest') ? Math.PI : c.yaw; }
        if (c.goal === 'stage' && c.spot){ c.yaw = c.spot.yaw; c.lift = c.spot.lift; c.anim = c.role === 'guest' ? 'eat' : 'couple'; c.animUntil = Infinity; }
        if (c.goal === 'fest'){ c.animUntil = Infinity; c.yaw = c.anim === 'pull' ? (c.x < SQUARE.x ? -Math.PI / 2 : Math.PI / 2) : c.anim === 'row' ? Math.PI / 2 : Math.PI; }
      }
      return;
    }
    if (c.goal.startsWith('act:') && now > c.animUntil){
      // làm xong: đứng nghỉ một lúc rồi thong thả về nhà
      c.anim = c.goal === 'act:catch' ? 'fish' : 'idle';
      if (now - c.idleSince > (c.goal === 'act:catch' ? 45_000 : 20_000)) this.goTo(c, this.homeOf(c.lot), c.online ? 'home' : 'leave');
    }
    if (c.goal === 'stage') return;
    if (c.goal === 'home' && !c.online) this.goTo(c, this.homeOf(c.lot), 'leave');
    if (c.goal === 'home' && now - c.idleSince > 9000 + (c.phase * 1000)){
      // đi dạo quanh sân nhà
      const h = this.homeOf(c.lot); c.idleSince = now;
      c.path = [{ x: h.x + (Math.random() - 0.5) * 6, z: h.z + (Math.random() - 0.3) * 2 }]; c.speed = 1.4;
    }
  }

  private draw(i: number, c: Person, now: number, contest: { keoco: number } | null){
    const walking = c.path.length > 0, t = now / 1000 + c.phase;
    let anim: Anim = walking ? 'walk' : now < c.animUntil || c.goal === 'fest' || c.goal === 'stage' || c.anim === 'fish' ? c.anim : 'idle';
    if (anim === 'cheer' && now > c.animUntil - 1000 && c.goal !== 'fest') anim = 'idle';
    let bend = 0, legL = 0, legR = 0, armL = 0.05, armR = 0.05, armLz = 0, armRz = 0, bob = 0, sit = 0, tool = 0;
    const sw = Math.sin(t * (walking ? c.speed * 1.6 : 6));
    switch (anim){
      case 'walk': legL = sw * 0.6; legR = -sw * 0.6; armL = -sw * 0.5; armR = sw * 0.5; bob = Math.abs(sw) * 0.06; break;
      case 'dig': bend = 0.45 + Math.sin(t * 5) * 0.2; armL = armR = -1 - Math.sin(t * 5) * 0.6; tool = 1; break;
      case 'water': bend = 0.15; armL = armR = -1.1; tool = 2; break;
      case 'toss': armR = -1.2 - Math.max(0, Math.sin(t * 6)) * 1.2; armL = 0.1; break;
      case 'fish': sit = 0.45; legL = legR = -1.4; armL = armR = -1.2; tool = 3; break;
      case 'cheer': armL = armR = Math.PI - 0.3 + Math.sin(t * 9) * 0.3; armLz = 0.3; armRz = -0.3; bob = Math.abs(Math.sin(t * 9)) * 0.15; break;
      case 'pull': { const tug = contest ? contest.keoco : 0; bend = -0.45 + Math.sin(t * 7) * 0.08; armL = armR = -1.4; legL = 0.4; legR = -0.3; bob = tug * 0; break; }
      case 'row': sit = 0.45; legL = legR = -1.4; armL = armR = -1 - Math.sin(t * 5) * 0.7; tool = 4; break;
      case 'eat': { sit = 0.45; legL = legR = -1.4; bend = 0.15; const k = Math.max(0, Math.sin(t * 2.2)); armR = -1.2 - k * 1.1; armL = -0.9; break; }   // ngồi ghế nhựa, gắp đồ ăn đưa lên miệng
      case 'couple': { const w = (t % 7) < 1.6; armR = w ? Math.PI - 0.4 + Math.sin(t * 8) * 0.3 : 0.1; armRz = w ? -0.3 : 0; bend = (t % 11) < 1 ? 0.35 : 0; break; }   // cô dâu chú rể vẫy chào, thỉnh thoảng cúi chào
      case 'grab': bend = 0.5; armL = armR = -1.3 + Math.sin(t * 10) * 0.4; legL = Math.sin(t * 10) * 0.5; legR = -legL; bob = Math.abs(Math.sin(t * 10)) * 0.1; break;
      default: armL = armR = 0.05 + Math.sin(t * 1.5) * 0.03;
    }
    const lvScale = (1 + Math.min(0.15, c.level * 0.004)) * (c.role === 'bride' || c.role === 'groom' ? 1.3 : 1);   // cô dâu chú rể nổi bật trên sân khấu
    _root.compose(_v.set(c.x, bob - sit + c.lift + (anim === 'row' || anim === 'eat' ? (anim === 'eat' ? 0.05 : 0.35) : 0), c.z), _q.setFromEuler(_e.set(0, c.yaw, 0)), _s.set(lvScale, lvScale, lvScale));
    _upper.copy(_root).multiply(local(0, 0.75, 0, bend, 0, 1, 1, 1));
    const cos = c.role === 'bride' || c.role === 'groom' ? WEDDING_WEAR[c.role] : c.outfit.costume ? COSTUMES[c.outfit.costume] : null;
    const shirt = cos?.shirt ?? OUTFIT.shirts[c.outfit.shirt] ?? 0xc2452d, pants = cos?.pants ?? OUTFIT.pants[c.outfit.pants] ?? 0x2c2a26;
    const set = (part: keyof People['parts'], base: THREE.Matrix4, l: THREE.Matrix4, col: number) => {
      _m.multiplyMatrices(base, l); this.parts[part].setMatrixAt(i, _m); this.parts[part].setColorAt(i, _c.set(col));
    };
    // chân và giày, tay và bàn tay: bàn tay, bàn chân đi theo khớp vai, khớp hông
    const limb = (base: THREE.Matrix4, x: number, y: number, rx: number, rz: number, part: keyof People['parts'], end: keyof People['parts'],
      len: number, sx: number, sz: number, col: number, end_: [number, number, number, number, number], endCol: number) => {
      _piv.copy(base).multiply(local(x, y, 0, rx, rz, 1, 1, 1));
      set(part, _piv, local(0, 0, 0, 0, 0, sx, len, sz), col);
      set(end, _piv, local(0, end_[0], end_[1], 0, 0, end_[2], end_[3], end_[4]), endCol);
    };
    limb(_root, -0.12, 0.78, legL, 0, 'legL', 'footL', 0.74, 0.17, 0.19, pants, [-0.76, 0.05, 0.17, 0.09, 0.27], SHOE);
    limb(_root, 0.12, 0.78, legR, 0, 'legR', 'footR', 0.74, 0.17, 0.19, pants, [-0.76, 0.05, 0.17, 0.09, 0.27], SHOE);
    set('body', _upper, local(0, 0, 0, 0, 0, 0.52, 0.62, 0.32), shirt);
    limb(_upper, -0.33, 0.56, armL, armLz, 'armL', 'handL', 0.5, 0.14, 0.15, shirt, [-0.55, 0, 0.13, 0.13, 0.13], SKIN);
    limb(_upper, 0.33, 0.56, armR, armRz, 'armR', 'handR', 0.5, 0.14, 0.15, shirt, [-0.55, 0, 0.13, 0.13, 0.13], SKIN);
    set('head', _upper, local(0, 0.62, 0, 0, 0, 0.4, 0.42, 0.38), SKIN);
    set('hair', _upper, local(0, 0.66, -0.02, 0, 0, 0.43, 0.42, 0.42), HAIR);
    set('face', _upper, local(0, 0.62, 0, 0, 0, 1, 1, 1), 0xffffff);
    const hat = cos?.hat ?? c.outfit.hat;
    // tà áo dài, áo tứ thân: buông từ eo xuống gối, lay theo bước chân
    set('tunic', _upper, cos?.long ? local(0, 0.06, 0, -Math.abs(legL) * 0.25, 0, 0.5, 0.62, 0.32) : local(0, 0, 0, 0, 0, 0, 0, 0), shirt);
    // 0 nón lá, 1 khăn rằn, 2 đầu trần, 3 nón quai thao (rộng, dẹt), 4 khăn đóng
    const hatM = hat === 0 ? local(0, 0.98, 0, 0, 0, 0.82, 0.34, 0.82) : hat === 1 ? local(0, 0.93, 0, 0, 0, 0.42, 0.12, 0.42)
      : hat === 3 ? local(0, 0.98, 0, 0, 0, 1.15, 0.1, 1.15) : hat === 4 ? local(0, 0.92, 0, 0, 0, 0.46, 0.2, 0.46) : local(0, 0, 0, 0, 0, 0, 0, 0);
    set('hat', _upper, hatM, cos ? cos.hatColor : hat === 0 ? STRAW : hat === 1 ? SCARF : HAIR);
    // đồ nghề: 1 cuốc, 2 gàu tưới, 3 cần câu, 4 mái chèo
    const toolL = tool === 3 ? local(0.33, 0.1, 0.25, -2.2, 0, 0.04, 2.6, 0.04) : tool === 4 ? local(0.33, 0.1, 0.25, -0.8, 0, 0.06, 1.6, 0.18)
      : tool === 1 ? local(0.33, 0.05, 0.2, -1.9 - Math.sin(t * 5) * 0.6, 0, 0.06, 1.1, 0.06) : tool === 2 ? local(0.2, 0.05, 0.45, 0, 0, 0.3, 0.3, 0.3) : local(0, 0, 0, 0, 0, 0, 0, 0);
    set('tool', _upper, toolL, tool === 2 ? 0x6f8fa0 : 0x7b5a33);
  }

  // Ai đáng được hiện tên: người vừa có hành động, vừa tặng quà, rồi tới người cấp cao.
  ranked(){
    return [...this.list.values()].filter(c => c.visible).sort((a, b) => (Math.max(b.activeAt, b.giftAt + 20000) - Math.max(a.activeAt, a.giftAt + 20000)) || b.level - a.level);
  }
}


// Mắt đen, má hồng, miệng cười nhỏ: một khối gộp, tô bằng màu đỉnh, đặt ở mặt trước của đầu (đầu cao 0,42, tâm ở 0,21)
function faceGeometry(){
  const parts: THREE.BufferGeometry[] = [];
  const add = (g: THREE.BufferGeometry, color: number) => {
    const c = new THREE.Color(color), n = g.attributes.position.count, cols = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) cols.set([c.r, c.g, c.b], i * 3);
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    parts.push(g.toNonIndexed());
  };
  for (const s of [-1, 1]){
    add(new THREE.SphereGeometry(0.032, 8, 6).scale(1, 1.3, 0.6).translate(s * 0.075, 0.23, 0.185), 0x1e1612);
    add(new THREE.SphereGeometry(0.04, 8, 6).scale(1.3, 0.7, 0.4).translate(s * 0.12, 0.17, 0.17), 0xf08a8a);
  }
  add(new THREE.TorusGeometry(0.035, 0.009, 4, 10, Math.PI).rotateZ(Math.PI).translate(0, 0.15, 0.19), 0x8a3a2a);
  const pos: number[] = [], col: number[] = [];
  for (const g of parts){ pos.push(...g.attributes.position.array); col.push(...g.attributes.color.array); }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return out;
}
