// Nhân vật chibi dựng từ các bộ phận InstancedMesh. Mỗi bộ phận là một lệnh vẽ cho mọi nhân vật, nhân vật lấy từ một kho cố định
// (object pool), nên một trăm khách vẫn chỉ khoảng hai chục lệnh vẽ. Hoạt ảnh tính bằng công thức, không có bộ xương.
import * as THREE from 'three';
import { floorY } from '/shared/layout.mjs';
import { vipOf } from '/shared/menu.mjs';

export const CAPACITY = 120;
const SKIN = ['#f9d7bd', '#f1c19c', '#e2a77f', '#c98b62', '#fbe0cc'];
const HAIR = ['#2b1d16', '#3d2a1f', '#5a3a24', '#1c1c24', '#7a4b2a', '#d9a066', '#8e5ad6', '#e06a8a'];
const hash = s => { let h = 2166136261; for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; };

function faceTexture() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.fillRect(0, 0, 512, 256);
  // u = 0.25 là phía trước của SphereGeometry. Máy quay nhìn từ trên cao nên mắt đặt hơi cao và to kiểu chibi.
  const cx = 128, cy = 116;
  g.fillStyle = '#2a1a14';
  for (const dx of [-30, 30]) { g.beginPath(); g.ellipse(cx + dx, cy, 14, 19, 0, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = '#fff';
  for (const dx of [-25, 35]) { g.beginPath(); g.arc(cx + dx, cy - 7, 5.5, 0, Math.PI * 2); g.fill(); }
  g.fillStyle = 'rgba(255,110,125,.5)';
  for (const dx of [-54, 54]) { g.beginPath(); g.ellipse(cx + dx, cy + 26, 15, 9, 0, 0, Math.PI * 2); g.fill(); }
  g.strokeStyle = '#7a3324'; g.lineWidth = 6; g.lineCap = 'round';
  g.beginPath(); g.arc(cx, cy + 24, 12, .2 * Math.PI, .8 * Math.PI); g.stroke();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function capsule(r, len, drop) { const g = new THREE.CapsuleGeometry(r, len, 4, 10); g.translate(0, -drop, 0); return g; }

const std = (o = {}) => new THREE.MeshStandardMaterial({ color: '#fff', roughness: .65, ...o });
function partDefs() {
  const half = (r, start, len) => new THREE.SphereGeometry(r, 20, 12, start, len);
  const cap = new THREE.CylinderGeometry(.42, .44, .16, 18); cap.translate(0, .32, 0);
  const brim = new THREE.CylinderGeometry(.3, .3, .03, 16); brim.scale(1, 1, 1.4); brim.translate(0, .26, .34);
  const crown = new THREE.CylinderGeometry(.27, .24, .2, 8, 1, true); crown.translate(0, .5, 0);
  const beret = new THREE.SphereGeometry(.4, 16, 8); beret.scale(1.1, .35, 1.1); beret.rotateZ(.25); beret.translate(.05, .4, -.02);
  const bowG = new THREE.SphereGeometry(.12, 10, 8); bowG.scale(2.2, 1, .6); bowG.translate(.26, .38, .05);
  const shades = new THREE.BoxGeometry(.56, .12, .04); shades.translate(0, .02, .42);
  const cape = new THREE.CylinderGeometry(.3, .52, .85, 14, 1, true, Math.PI / 2, Math.PI); cape.translate(0, .2, -.03);
  const apron = new THREE.BoxGeometry(.44, .55, .03); apron.translate(0, .18, .3);
  const cup = new THREE.CylinderGeometry(.11, .085, .3, 12); cup.translate(0, .15, 0);
  const tray = new THREE.CylinderGeometry(.42, .42, .03, 18);
  const aura = new THREE.RingGeometry(.55, .78, 40); aura.rotateX(-Math.PI / 2);
  return {
    legL: [capsule(.13, .3, .3), std()], legR: [capsule(.13, .3, .3), std()],
    torso: [new THREE.CylinderGeometry(.26, .34, .62, 14).translate(0, .31, 0), std()],
    armL: [capsule(.09, .32, .25), std()], armR: [capsule(.09, .32, .25), std()],
    handL: [new THREE.SphereGeometry(.1, 10, 8), std()], handR: [new THREE.SphereGeometry(.1, 10, 8), std()],
    head: [new THREE.SphereGeometry(.44, 28, 18), std({ map: faceTexture(), roughness: .55 })],
    hair: [half(.47, 0, Math.PI * 2), std({ roughness: .5 })],
    cap: [cap, std()], brim: [brim, std()], crown: [crown, std({ color: '#f5c542', metalness: .9, roughness: .2, side: THREE.DoubleSide })],
    beret: [beret, std()], bow: [bowG, std()], shades: [shades, std({ color: '#111', metalness: .6, roughness: .15 })],
    cape: [cape, std({ side: THREE.DoubleSide })], apron: [apron, std()], cup: [cup, std({ roughness: .35 })], tray: [tray, std({ color: '#b98454' })],
    aura: [aura, new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: .55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })],
  };
}

// Tóc là một nửa quả cầu trùm đỉnh đầu và phía sau, chừa mặt.
function hairGeometry() {
  const g = new THREE.SphereGeometry(.475, 24, 14, 0, Math.PI * 2, 0, Math.PI * .62);
  const pos = g.attributes.position, v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    if (v.z > .15 && v.y < .18) v.y = Math.max(v.y, .18 + (v.z - .15) * .2);   // mái ngang trán
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  g.translate(0, .02, -.02);
  return g;
}

export class Crowd {
  constructor(scene) {
    const defs = partDefs();
    defs.hair[0] = hairGeometry();
    this.meshes = {};
    for (const [name, [geo, mat]] of Object.entries(defs)) {
      const mesh = new THREE.InstancedMesh(geo, mat, CAPACITY);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.frustumCulled = false;
      mesh.castShadow = name !== 'aura';
      mesh.setColorAt(0, new THREE.Color('#fff'));
      for (let i = 0; i < CAPACITY; i++) mesh.setMatrixAt(i, new THREE.Matrix4().makeScale(0, 0, 0));
      scene.add(mesh);
      this.meshes[name] = mesh;
    }
    this.free = [];
    for (let i = CAPACITY - 1; i >= 0; i--) this.free.push(i);
    this.list = [];
    [this._m, this._b, this._t, this._v, this._torso, this._head, this._handR] = Array.from({ length: 7 }, () => new THREE.Matrix4());
    this._e = new THREE.Euler(); this._q = new THREE.Quaternion(); this._s = new THREE.Vector3(); this._p = new THREE.Vector3(); this._c = new THREE.Color();
    this.zero = new THREE.Matrix4().makeScale(0, 0, 0);
  }

  get available() { return this.free.length; }

  // kind: guest | staff. role (nhân viên): barista, waiter, cashier, greeter
  spawn({ id, name = '', level = 1, kind = 'guest', role = '', x = 0, z = 0, ry = 0 }) {
    const slot = this.free.pop();
    if (slot === undefined) return null;
    const h = hash(id);
    const c = {
      slot, id, name, level, kind, role, x, y: floorY(x, z), z, ry, path: [], speed: 3.2, onArrive: null, state: 'stand', seat: null,
      action: null, actionT: 0, actionDur: 0, phase: (h % 100) / 16, skin: SKIN[h % SKIN.length], hairColor: HAIR[(h >>> 4) % HAIR.length],
      longHair: ((h >>> 8) & 3) === 0, holding: false, cupColor: '#c79a6b', carry: false, emoji: '', emojiUntil: 0, chat: '', chatUntil: 0,
      idleNext: 2 + (h % 40) / 5, visible: true, lift: 0, label: true,
    };
    this.list.push(c);
    this.restyle(c, level);
    return c;
  }

  release(c) {
    for (const mesh of Object.values(this.meshes)) mesh.setMatrixAt(c.slot, this.zero);
    this.free.push(c.slot);
    this.list.splice(this.list.indexOf(c), 1);
  }

  restyle(c, level) {
    c.level = level;
    const v = vipOf(level), staff = c.kind === 'staff';
    const col = (part, color) => { this.meshes[part].setColorAt(c.slot, this._c.set(color)); this.meshes[part].instanceColor.needsUpdate = true; };
    const top = staff ? (c.role === 'cashier' ? '#ff8fab' : '#4fb393') : v.top;
    col('torso', top); col('armL', top); col('armR', top);
    col('legL', staff ? '#3b3f4f' : v.pants); col('legR', staff ? '#3b3f4f' : v.pants);
    for (const p of ['head', 'handL', 'handR']) col(p, c.skin);
    col('hair', c.hairColor);
    col('cap', staff ? '#ffffff' : '#ff7aa2'); col('brim', staff ? '#4fb393' : '#ff7aa2');
    col('beret', level >= 5 ? '#e9b949' : '#c9d6df'); col('bow', '#ff4f8b'); col('cape', v.cape || '#fff');
    col('apron', '#fffaf2'); col('cup', c.cupColor); col('aura', c.rank ? (c.rank <= 3 ? ['#ffd23f', '#e6eef5', '#e7a36a'][c.rank - 1] : '#ffe9a8') : v.aura || '#fff');
    c.hat = staff ? (c.role === 'barista' ? 'cap' : null) : v.hat;
    c.cape = !staff && !!v.cape;
    c.aura = !staff && (!!v.aura || c.rank > 0);   // top 10 tháng luôn có hào quang dưới chân
  }

  walkTo(c, points, onArrive, speed = 3.2) {
    c.path = points.map(p => ({ x: p.x, z: p.z }));
    c.onArrive = onArrive || null;
    c.speed = speed;
    c.state = 'walk';
    c.seat = null;
  }
  place(c, x, z, ry = 0) { c.x = x; c.z = z; c.y = floorY(x, z); c.ry = ry; c.path = []; }
  sit(c, seat) {
    this.place(c, seat.x, seat.z, seat.ry);
    c.y = seat.y;
    c.seat = seat;
    c.state = seat.stand ? 'stand' : 'sit';
  }
  // Dáng người xem tự chọn: nữ tóc dài, nam tóc ngắn, già tóc bạc và đi chậm hơn, trẻ lấy lại màu tóc riêng.
  setLook(c, look) {
    if (!look) return;
    const h = hash(c.id);
    if (look.g) c.longHair = look.g === 'f';
    if (look.a) c.hairColor = look.a === 'old' ? ['#d9d9d9', '#c7c7cc', '#ececec'][h % 3] : HAIR[(h >>> 4) % HAIR.length];
    c.old = look.a === 'old';
    this.restyle(c, c.level);
  }
  act(c, name, dur = 2.5) { c.action = name; c.actionT = 0; c.actionDur = dur; }
  say(c, emoji, ms = 3000) { c.emoji = emoji; c.emojiUntil = performance.now() + ms; }
  // Người mới bình luận còn đang đi từ phố vào: giữ chữ suốt đường đi, ngồi xuống rồi mới bắt đầu đếm giờ
  bubble(c, text, ms = 6000) { c.chat = text; c.chatMs = ms; c.chatUntil = performance.now() + ms; }

  update(dt, time) {
    for (const c of this.list) {
      if (c.path.length) this.move(c, dt);
      if (c.chat && c.state === 'walk') c.chatUntil = performance.now() + c.chatMs;
      if (c.action) { c.actionT += dt; if (c.actionT >= c.actionDur) c.action = null; }
      else if (c.kind === 'guest' && c.state !== 'walk' && (c.idleNext -= dt) <= 0) {
        c.idleNext = 5 + Math.random() * 9;
        if (c.holding) this.act(c, 'sip', 2.2);
        else if (Math.random() < .35) this.act(c, 'look', 2.4);
      }
      this.pose(c, time);
    }
    for (const mesh of Object.values(this.meshes)) mesh.instanceMatrix.needsUpdate = true;
  }

  move(c, dt) {
    let step = c.speed * dt;
    while (step > 0 && c.path.length) {
      const p = c.path[0], dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz);
      if (d > 1e-3) {
        const target = Math.atan2(dx, dz);
        let diff = target - c.ry; diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        c.ry += diff * Math.min(1, dt * 12);
      }
      if (d <= step) { c.x = p.x; c.z = p.z; c.path.shift(); step -= d; }
      else { c.x += dx / d * step; c.z += dz / d * step; step = 0; }
    }
    c.y += (floorY(c.x, c.z) - c.y) * Math.min(1, dt * 10);
    c.phase += dt * c.speed * 2.6;
    if (!c.path.length) {
      c.state = 'stand';
      const done = c.onArrive; c.onArrive = null;
      done?.(c);
    }
  }

  // Một lần ghép ma trận cho từng bộ phận: gốc nhân vật x khớp x xoay x tỉ lệ.
  part(name, parent, px, py, pz, rx = 0, ry = 0, rz = 0, s = 1, out = this._m) {
    this._t.compose(this._p.set(px, py, pz), this._q.setFromEuler(this._e.set(rx, ry, rz)), this._s.set(s, s, s));
    out.multiplyMatrices(parent, this._t);
    if (out === this._m) this.meshes[name].setMatrixAt(this.cur, out);
    return out;
  }
  hide(name) { this.meshes[name].setMatrixAt(this.cur, this.zero); }

  pose(c, time) {
    this.cur = c.slot;
    const walking = c.state === 'walk' && c.path.length, sitting = c.state === 'sit';
    const t = c.actionT, a = c.action, w = Math.sin(c.phase);
    let hip = .58, legL = 0, legR = 0, armL = .05, armR = .05, armLz = .12, armRz = -.12, lean = 0, sway = 0, headX = 0, headY = 0, bob = 0, spin = 0, lift = 0, holding = false;
    if (walking) { legL = w * .7; legR = -w * .7; armL = -w * .55; armR = w * .55; bob = Math.abs(Math.cos(c.phase)) * .06; }
    else if (sitting) { hip = .5; legL = legR = -1.45; armL = armR = -.55; }
    else { bob = Math.sin(time * 2 + c.phase) * .012; }
    const standUp = ['wow', 'cheer', 'jump', 'spin', 'fly', 'dance'].includes(a);
    if (standUp && sitting) { hip = .58; legL = legR = 0; }
    const k = Math.min(1, t * 4) * Math.min(1, Math.max(0, (c.actionDur - t) * 3));   // vào và ra động tác mềm
    switch (a) {
      case 'sip': case 'giggle': armR = -2.25 * k; armRz = -.35 * k; headX = -.15 * k; holding = true; if (a === 'giggle') sway = Math.sin(t * 22) * .05 * k; break;
      case 'nod': headX = Math.sin(t * 9) * .22 * k; armR = -1.6 * k; holding = true; break;
      case 'look': headY = Math.sin(t * 2.4) * .6 * k; break;
      case 'wave': case 'greet': armR = -2.8 * k; armRz = -.3 + Math.sin(t * 12) * .35 * k; break;
      case 'clap': armL = armR = -1.35 * k; armLz = .12 - (.55 + Math.sin(t * 18) * .25) * k; armRz = -armLz; break;
      case 'heart': armL = armR = -2.9 * k; armLz = .5 * k; armRz = -.5 * k; headX = Math.sin(t * 4) * .08; break;
      case 'dance': sway = Math.sin(t * 7) * .22 * k; armL = (-1.6 + Math.sin(t * 7) * 1.2) * k; armR = (-1.6 - Math.sin(t * 7) * 1.2) * k; bob = Math.abs(Math.sin(t * 7)) * .12 * k; break;
      case 'wow': armL = armR = -2.6 * k; armLz = .6 * k; armRz = -.6 * k; lean = -.15 * k; bob = Math.abs(Math.sin(t * 6)) * .08; break;
      case 'cheer': case 'toast': armR = (a === 'toast' ? -1.7 : -2.9) * k; holding = true; bob = Math.abs(Math.sin(t * 8)) * .08 * k; armL = -.4 * k; break;
      case 'jump': lift = Math.max(0, Math.sin(t * 7)) * .55 * k; armL = armR = -2.7 * k; legL = legR = lift > .1 ? -.3 : 0; break;
      case 'spin': spin = t * 9 * k; armLz = 1.3 * k; armRz = -1.3 * k; lift = .1 * k; break;
      case 'fly': lift = Math.min(1, t / 1.5) * 2.2 * k + Math.sin(t * 3) * .1; armLz = 1.2 * k; armRz = -1.2 * k; spin = t * 1.5; legL = -.3; legR = .2; break;
      case 'brew': armL = (-1.3 + Math.sin(t * 20) * .45) * k; armR = (-1.3 - Math.sin(t * 20) * .45) * k; holding = true; break;
      case 'press': armL = armR = (-1.2 - Math.max(0, Math.sin(t * 6)) * .5) * k; break;
      case 'pour': armR = -1.5 * k; armRz = -.5 * k; holding = true; break;
    }
    if (c.carry) { armL = armR = -1.45; armLz = .25; armRz = -.25; }
    const b = this._b, torso = this._torso, head = this._head, handR = this._handR, tmp = this._v;
    this._p.set(c.x, c.y + bob + lift + c.lift, c.z);
    this._q.setFromEuler(this._e.set(0, c.ry + spin, 0));
    b.compose(this._p, this._q, this._s.set(1.15, 1.15, 1.15));
    this.part('legL', b, -.14, hip, 0, legL);
    this.part('legR', b, .14, hip, 0, legR);
    this.part('torso', b, 0, hip, 0, lean, 0, sway, 1, torso);
    this.meshes.torso.setMatrixAt(c.slot, torso);
    this.part('armL', torso, -.36, .55, 0, armL, 0, armLz);
    tmp.copy(this._m); this.part('handL', tmp, 0, -.5, 0);
    this.part('armR', torso, .36, .55, 0, armR, 0, armRz);
    handR.copy(this._m); this.part('handR', handR, 0, -.5, 0);
    this.part('head', torso, 0, 1.03, 0, headX, headY, 0, 1, head);
    this.meshes.head.setMatrixAt(c.slot, head);
    this.part('hair', head, 0, 0, 0);
    if (c.longHair) this.meshes.hair.setMatrixAt(c.slot, this._m.multiply(tmp.makeScale(1, 1.22, 1.04)).multiply(tmp.makeTranslation(0, -.06, 0)));
    for (const hat of ['cap', 'brim', 'crown', 'beret', 'bow', 'shades']) this.hide(hat);
    if (c.hat === 'cap') { this.part('cap', head, 0, 0, 0); this.part('brim', head, 0, 0, 0); }
    else if (c.hat) this.part(c.hat, head, 0, 0, 0);
    if (c.level >= 9 && c.hat === 'crown') this.part('shades', head, 0, 0, 0);
    if (c.cape) this.part('cape', torso, 0, .3, 0, -.08 + (walking ? Math.abs(w) * .15 : 0)); else this.hide('cape');
    if (c.kind === 'staff') this.part('apron', torso, 0, 0, 0); else this.hide('apron');
    if (holding || c.holding && a === 'cheer') {
      this._p.setFromMatrixPosition(tmp.copy(handR).multiply(this._t.makeTranslation(0, -.12, 0)));
      tmp.compose(this._p, this._q.setFromEuler(this._e.set(0, c.ry, 0)), this._s.set(1.15, 1.15, 1.15));
      this.meshes.cup.setMatrixAt(c.slot, tmp);
    } else this.hide('cup');
    if (c.carry) {
      tmp.copy(torso).multiply(this._t.makeTranslation(0, .5, .62));
      this.meshes.tray.setMatrixAt(c.slot, tmp);
      (c.trayAt ||= new THREE.Vector3()).setFromMatrixPosition(tmp);
    } else this.hide('tray');
    if (c.aura) {
      const s = 1 + Math.sin(time * 3 + c.phase) * .06;
      this.part('aura', tmp.makeTranslation(c.x, c.y + .03, c.z), 0, 0, 0, 0, time * .8, 0, s * (c.level >= 9 || (c.rank && c.rank <= 3) ? 1.25 : 1));
    } else this.hide('aura');
    c.headY = c.y + (hip + 1.03 + .5) * 1.15 + lift + bob;
  }
}
