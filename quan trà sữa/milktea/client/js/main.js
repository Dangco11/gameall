// Màn hình game: nhận trạng thái từ server và diễn lại trong quán 3D. Server quyết định mọi thứ (ai ngồi đâu, đơn tới bước nào),
// trình duyệt chỉ vẽ, nên tải lại trang giữa chừng vẫn khớp.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildShop, buildLights } from './shop.js';
import { Crowd } from './crowd.js';
import { ItemPool, renderThumbnails } from './items.js';
import { Fx } from './fx.js';
import { Director } from './director.js';
import { Labels } from './labels.js';
import { UI } from './ui.js';
import { Sfx } from './sfx.js';
import { SEAT_BY_ID, POINTS, pathToSeat, pathOut, pathForWaiter } from '/shared/layout.mjs';
import { itemById, reactionFor, vipOf } from '/shared/menu.mjs';

const params = new URLSearchParams(location.search);
const QUALITY = params.get('q') || 'high';
const MAX_WALKERS = 12;

// Tivi ở quầy: ?tv=0 để ẩn, ?cam=1 để tivi tự chiếu webcam (khi LIVE Studio không giữ camera)
const tv = document.getElementById('tv');
tv.hidden = params.get('tv') === '0';
if (!tv.hidden && params.get('cam') === '1') {
  navigator.mediaDevices?.getUserMedia({ video: true, audio: false }).then(stream => {
    const v = document.getElementById('tvCam');
    v.srcObject = stream; v.hidden = false;
    document.getElementById('tvHint').hidden = true;
  }).catch(e => console.warn('Không mở được camera:', e.message));
}
await document.fonts.load('700 20px "Baloo 2"').catch(() => {});

/* ------------------------------------------------------------ cảnh 3D */
const canvas = document.querySelector('#gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: QUALITY === 'low', powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, QUALITY === 'low' ? 1 : 1.5));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .9;
renderer.shadowMap.enabled = QUALITY !== 'low';
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#2a1d4a');
scene.fog = new THREE.Fog('#3b2a5a', 110, 230);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
scene.environmentIntensity = .25;
const camera = new THREE.PerspectiveCamera(40, 1, .5, 220);
const shop = buildShop(scene);
const lights = buildLights(scene, renderer, QUALITY);
const crowd = new Crowd(scene);
const items = new ItemPool(scene);
const fx = new Fx(scene, lights);
const director = new Director(camera);
const labels = new Labels(document.querySelector('#labels'));
const thumbs = renderThumbnails();
const ui = new UI({ thumbs });
const sfx = new Sfx();
// Nút bật tiếng chỉ hiện khi trình duyệt chặn tự phát; cửa sổ mở bằng mo-tra-sua.cmd thì không cần bấm.
const soundBtn = document.querySelector('#sound');
const syncSoundBtn = () => { soundBtn.hidden = sfx.running; };
sfx.onState = syncSoundBtn;
addEventListener('pointerdown', () => { sfx.unlock(); setTimeout(syncSoundBtn, 200); });
sfx.unlock();
setTimeout(syncSoundBtn, 800);
director.onShot = kind => { shop.facade.visible = kind === 'facade'; };
shop.facade.visible = false;

let composer = null;
if (QUALITY !== 'low') {
  const target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), .32, .5, .92));
  composer.addPass(new OutputPass());
}

// ?ratio=9:16 hoặc ?ratio=16:9: ép khung đúng tỉ lệ giữa cửa sổ (phần thừa màu đen), để cửa sổ nằm ngang vẫn phát được màn hình dọc.
// Không có tham số thì khung lấp đầy cửa sổ và tự chọn bố cục dọc hay ngang theo hình dạng cửa sổ.
const RATIO = { '9:16': 9 / 16, '16:9': 16 / 9 }[params.get('ratio')] || 0;
let stageH = innerHeight;
function resize() {
  let w = innerWidth, h = innerHeight;
  if (RATIO) {
    if (w / h > RATIO) w = Math.round(h * RATIO); else h = Math.round(w / RATIO);
    Object.assign(document.body.style, { width: `${w}px`, height: `${h}px` });
  }
  stageH = h;
  // Đơn vị giao diện tính theo khung: dọc thì theo bề ngang 1080, ngang thì theo chiều cao 1080
  document.body.style.setProperty('--u', `${(w < h ? w : h) / 1080}px`);
  document.body.classList.toggle('framed', !!RATIO);
  renderer.setSize(w, h, false);
  composer?.setSize(w, h);
  camera.aspect = w / h;
  camera.fov = w < h ? 44 : 38;
  // Bảng giao diện che trên và dưới không đều nhau: dời tâm hình xuống một chút để quán nằm giữa phần còn trống
  camera.setViewOffset(w, h, 0, h * (w < h ? .035 : .06), w, h);
  camera.updateProjectionMatrix();
  labels.resize(w, h, Math.min(devicePixelRatio, 2));
  document.body.classList.toggle('portrait', w < h);
}
addEventListener('resize', resize);
resize();

/* ------------------------------------------------------------ nhân viên */
const staff = { baristas: [], waiters: [], cashier: null, greeter: null };
POINTS.baristas.forEach((p, i) => staff.baristas.push(crowd.spawn({ id: `barista${i}`, kind: 'staff', role: 'barista', x: p.x, z: p.z })));
POINTS.waiters.forEach((p, i) => { const w = crowd.spawn({ id: `waiter${i}`, kind: 'staff', role: 'waiter', x: p.x, z: p.z }); w.home = p; w.busy = null; staff.waiters.push(w); });
staff.cashier = crowd.spawn({ id: 'cashier', kind: 'staff', role: 'cashier', x: POINTS.cashier.x, z: POINTS.cashier.z });
staff.greeter = crowd.spawn({ id: 'greeter', kind: 'staff', role: 'greeter', x: POINTS.greeter.x, z: POINTS.greeter.z, ry: .4 });
for (const s of [...staff.baristas, ...staff.waiters, staff.cashier, staff.greeter]) s.label = false;

/* ------------------------------------------------------------ khách */
const guests = new Map();      // TikTokID -> nhân vật
const leaving = new Set();
let walkers = 0;

function seatPoint(seat) { return { x: seat.x, y: seat.y + .86, z: seat.table.z - .15 }; }

function addGuest(p, { quiet = false } = {}) {
  const seat = SEAT_BY_ID.get(p.seat);
  if (!seat) return;
  let c = guests.get(p.id);
  if (c) { c.name = p.name; if (c.level !== p.level) crowd.restyle(c, p.level); }
  else {
    c = crowd.spawn({ id: p.id, name: p.name, level: p.level, x: POINTS.street.x, z: POINTS.street.z });
    if (!c) return;     // hết chỗ vẽ: khách vẫn có ghế ở server, chỉ là không hiện
    guests.set(p.id, c);
  }
  c.data = p;
  if ((p.rank || 0) !== (c.rank || 0)) { c.rank = p.rank || 0; crowd.restyle(c, c.level); }
  if (p.look) crowd.setLook(c, p.look);
  // Khách vãng lai không có tên trên đầu, chỉ ngồi nhâm nhi ly trà đá cho quán có không khí
  if (p.npc) { c.label = false; c.holding = true; c.cupColor = '#d8c75a'; crowd.restyle(c, 1); }
  // Khách top tháng và VIP luôn đi bộ vào cho người xem thấy, dù đang đông người đi lại
  const grand = !p.npc && (p.rank > 0 || p.level >= 5);
  if (quiet || (walkers >= MAX_WALKERS && !grand)) { crowd.sit(c, seat); if (!quiet) fx.sparkle(seatPoint(seat), 16); return; }
  walkers++;
  crowd.walkTo(c, pathToSeat(seat), () => { walkers--; crowd.sit(c, seat); crowd.act(c, grand ? 'cheer' : 'wave', grand ? 2.4 : 1.6); }, grand ? 2.9 : c.old ? 2.6 : 3.6);
  crowd.act(staff.greeter, 'greet', 2);
  crowd.say(staff.greeter, '👋', 1800);
  sfx.play('door');
}
function removeGuest(id) {
  const c = guests.get(id);
  if (!c) return;
  guests.delete(id);
  if (c.held) { items.put(c.held); c.held = null; }
  const seat = c.seat || SEAT_BY_ID.get(c.data?.seat);
  if (!seat || leaving.size > 20) { crowd.release(c); return; }
  leaving.add(c);
  c.holding = false;
  crowd.walkTo(c, pathOut(seat), () => { leaving.delete(c); crowd.release(c); }, 3.8);
}
function moveGuest(id, seatId, level) {
  const c = guests.get(id), seat = SEAT_BY_ID.get(seatId);
  if (!c || !seat) return;
  if (c.data) c.data.seat = seatId;
  if (level) crowd.restyle(c, level);
  const from = c.seat;
  const route = (from ? pathOut(from).slice(0, 2) : []).concat(pathToSeat(seat).filter(p => p.z < 22.9 && !(p.x === 0 && p.z === 15)));
  if (c.held) { items.put(c.held); c.held = null; }
  crowd.walkTo(c, route, () => { crowd.sit(c, seat); crowd.act(c, 'wow', 2); fx.sparkle(seatPoint(seat), 30); }, 4);
}

/* ------------------------------------------------------------ đơn hàng */
const orders = new Map();      // id -> { o, mesh, stage }
const STAGES = [['Rót trà', 'pour'], ['Lắc bình trà', 'brew'], ['Thêm trân châu', 'pour'], ['Đóng nắp ly', 'press']];
const counterSpot = b => ({ x: POINTS.pickups[b ?? 0].x, y: 1.22, z: -13.8 });

function orderUpdate(o, fromSnapshot = false) {
  const item = itemById(o.itemId);
  if (!item) return;
  ui.order(o);
  let r = orders.get(o.id);
  if (!r) { r = { o, mesh: null }; orders.set(o.id, r); }
  r.o = o;
  switch (o.status) {
    case 'BREWING': {
      const b = staff.baristas[o.baristaId] || staff.baristas[0];
      r.mesh ||= items.get(o.itemId);
      const spot = counterSpot(o.baristaId);
      r.mesh.position.set(spot.x, spot.y, spot.z);
      r.mesh.scale.setScalar(.01);
      r.brew = { b, t: 0, dur: Math.max(.8, (o.ms || 3000) / 1000), stage: -1 };
      break;
    }
    case 'READY': {
      r.mesh ||= items.get(o.itemId);
      const spot = counterSpot(o.baristaId);
      r.mesh.position.set(spot.x, spot.y, spot.z); r.mesh.scale.setScalar(1);
      r.brew = null;
      if (!fromSnapshot) { sfx.play('ding'); fx.sparkle(spot, 12); }
      break;
    }
    case 'DELIVERING': deliver(r, fromSnapshot); break;
    case 'SERVED': served(r); break;
  }
}

function deliver(r, fromSnapshot) {
  const o = r.o, w = staff.waiters[o.waiterId] || staff.waiters[0];
  r.mesh ||= items.get(o.itemId);
  r.brew = null;
  const guest = guests.get(o.pid), seat = guest?.seat || SEAT_BY_ID.get(guest?.data?.seat) || SEAT_BY_ID.get(o.seat);
  const pickup = POINTS.pickups[o.baristaId ?? 0] || POINTS.pickups[0];
  const pts = [{ x: pickup.x, z: pickup.z + .4 }];
  const tail = seat ? pathForWaiter(seat, pickup) : [{ x: 0, z: -12 }, { x: 0, z: 15 }, { x: -7.3, z: 15.3 }];
  const total = [w, ...pts, ...tail].reduce((acc, p, i, arr) => i ? acc + Math.hypot(p.x - arr[i - 1].x, p.z - arr[i - 1].z) : 0, 0);
  const secs = Math.max(1, (fromSnapshot ? 2500 : o.ms || 4500) / 1000 - .35);
  const speed = Math.min(11, Math.max(2.6, total / secs));
  if (w.busy && w.busy !== r) finishDelivery(w.busy);
  w.busy = r;
  r.waiter = w; r.seat = seat;
  crowd.walkTo(w, pts, () => {
    w.carry = true; r.carried = true;
    crowd.walkTo(w, tail, () => { w.carry = false; r.carried = false; dropAtTable(r); crowd.act(w, 'greet', 1); crowd.say(w, '🙏', 1500); goHome(w); }, speed);
  }, speed);
}
function dropAtTable(r) {
  if (r.placed) return;
  r.placed = true;
  if (!r.seat) { items.put(r.mesh); r.mesh = null; return; }
  const p = seatPoint(r.seat);
  r.mesh.position.set(p.x, p.y - .06, p.z + .1);
  r.mesh.scale.setScalar(itemById(r.o.itemId).art.big > 2 ? .8 : 1.15);
}
function finishDelivery(r) { r.waiter.carry = false; r.carried = false; dropAtTable(r); }
function goHome(w) { w.busy = null; crowd.walkTo(w, [{ x: 0, z: w.z < -11.5 ? w.z : -11 }, { x: 0, z: -12 }, w.home], () => { w.ry = 0; }, 3.6); }

function served(r) {
  const o = r.o, item = itemById(o.itemId);
  if (r.waiter && r.waiter.busy === r) { finishDelivery(r); goHome(r.waiter); }
  if (!r.mesh) { r.mesh = items.get(o.itemId); r.seat = guests.get(o.pid)?.seat; r.placed = false; dropAtTable(r); }
  orders.delete(o.id);
  const c = guests.get(o.pid);
  if (c && c.seat) {
    // Khách vừa đổi bàn (lên cấp) trong lúc món đang mang ra: món đi theo khách sang bàn mới
    if (r.seat !== c.seat && r.mesh) { r.seat = c.seat; r.placed = false; dropAtTable(r); }
    if (c.held) items.put(c.held);
    c.held = r.mesh;
    const reaction = reactionFor(item.coins);
    crowd.act(c, reaction.anim, reaction.anim === 'fly' ? 4.5 : 3.4);
    crowd.say(c, reaction.emoji, 4200);
    if (['cup', 'combo', 'tower'].includes(item.art.k)) { c.holding = true; c.cupColor = item.art.c || '#c79a6b'; crowd.meshes.cup.setColorAt(c.slot, new THREE.Color(c.cupColor)); crowd.meshes.cup.instanceColor.needsUpdate = true; }
    fx.serve(seatPoint(c.seat), item.fx);
    if (!item.party) director.request('focus', { at: c, follow: c, seconds: 3.5, priority: 1 });
    if (item.fx >= 3 && item.coins >= 500) fx.beam({ x: c.x, y: c.y, z: c.z }, 4, vipOf(c.level).aura || '#fff3c4');
    sfx.play('serve');
    if (['cup', 'combo', 'tower'].includes(item.art.k)) setTimeout(() => sfx.play('slurp'), 900); else setTimeout(() => sfx.play('clink'), 600);
    if (item.coins >= 200) setTimeout(() => sfx.play('applause', { seconds: item.coins >= 1000 ? 3.5 : 2, size: item.coins >= 1000 ? 1.4 : .8 }), 400);
    const mesh = r.mesh;
    setTimeout(() => { if (c.held === mesh) { c.held = null; c.holding = false; } items.put(mesh); }, 45_000);
  } else if (r.mesh) setTimeout(() => items.put(r.mesh), 4000);
}

function updateOrders(dt) {
  const captions = [];
  for (const r of orders.values()) {
    if (r.brew) {
      const br = r.brew, b = br.b;
      br.t += dt;
      const f = Math.min(1, br.t / br.dur), stage = Math.min(3, Math.floor(f * 4));
      if (stage !== br.stage) {
        br.stage = stage;
        crowd.act(b, STAGES[stage][1], br.dur / 4 + .2);
        const pearls = itemById(r.o.itemId).art.pearls;
        if (stage === 0) sfx.play('pour');
        if (stage === 1) sfx.play('shake');
        if (stage === 2 && pearls) { fx.pearls({ ...counterSpot(r.o.baristaId), y: 1.9 }); sfx.play('pearls'); }
        if (stage === 3) sfx.play('seal');
      }
      r.mesh.scale.setScalar(.3 + f * .7);
      const s = counterSpot(r.o.baristaId);
      if (stage === 0 && Math.random() < .2) fx.steam({ x: s.x, y: 1.7, z: s.z });
      captions.push({ x: s.x, y: 3.1, z: s.z - .6, text: `${STAGES[stage][0]}…` });
    }
    if (r.carried && r.waiter.trayAt) { r.mesh.position.copy(r.waiter.trayAt); r.mesh.position.y += .03; }
  }
  return captions;
}

/* ------------------------------------------------------------ tin từ server */
function onState(s) {
  sfx.apply(s.settings);
  ui.setMode(s.mode); ui.setTikTok(s.tiktok); ui.setTop(s.month); ui.setStats(s.stats);
  for (const id of [...guests.keys()]) { const c = guests.get(id); guests.delete(id); if (c.held) items.put(c.held); crowd.release(c); }
  for (const r of orders.values()) if (r.mesh) items.put(r.mesh);
  for (const w of staff.waiters) { w.busy = null; w.carry = false; crowd.place(w, w.home.x, w.home.z); }
  orders.clear(); ui.clearOrders();
  for (const p of s.players) addGuest(p, { quiet: true });
  for (const o of s.orders) orderUpdate(o, true);
  sfx.setCrowd(guests.size);
}

const zoneCenter = zone => { let x = 0, z = 0, n = 0; for (const s of SEAT_BY_ID.values()) if (s.zone === zone) { x += s.x; z += s.z; n++; } return n ? { x: x / n, y: 0, z: z / n } : { x: 0, y: 0, z: 0 }; };

function onMessage(m) {
  switch (m.t) {
    case 'state': return onState(m);
    case 'tiktok': return ui.setTikTok(m);
    case 'settings': return sfx.apply(m.settings);
    case 'tts': return sfx.speak(m.url);
    case 'join': return addGuest(m.p, { quiet: m.quiet });
    case 'leave': return removeGuest(m.id);
    case 'move': return moveGuest(m.id, m.seat, m.level);
    case 'restyle': { const c = guests.get(m.id); if (c) { crowd.restyle(c, m.level); if (c.data) c.data.level = m.level; } return; }
    case 'look': {
      const c = guests.get(m.id);
      if (c) { crowd.setLook(c, m.look); if (c.data) c.data.look = m.look; crowd.say(c, m.look.a === 'old' ? '👴' : m.look.g === 'f' ? '💁‍♀️' : m.look.g === 'm' ? '🙋‍♂️' : '✨', 2600); fx.sparkle({ x: c.x, y: c.headY, z: c.z }, 18); sfx.play('pop'); }
      return;
    }
    case 'chat': { const c = guests.get(m.id); if (c) crowd.bubble(c, m.text); return; }
    case 'like': { const c = guests.get(m.id); if (c && fx.allow(.3)) { fx.hearts({ x: c.x, y: c.headY + .3, z: c.z }, Math.min(8, 2 + m.n)); sfx.play('pop'); } return; }
    case 'rank': ui.setTop(m.month); setRanks(m.month); ui.setStats(m.stats); sfx.setCrowd(guests.size); return;
    case 'order': return orderUpdate(m.order);
    case 'event': return onEvent(m);
    case 'gift': return onGift(m);
    case 'levelup': return onLevelUp(m);
    case 'party': return onParty(m);
  }
}

// Hạng top tháng đổi thì đổi hào quang và huy hiệu trên đầu khách đang ngồi
function setRanks(month) {
  if (!month) return;
  const ranks = new Map(month.top.map((p, i) => [p.id, i + 1]));
  for (const [id, c] of guests) {
    const r = ranks.get(id) || 0;
    if (r !== (c.rank || 0)) { c.rank = r; if (c.data) c.data.rank = r; crowd.restyle(c, c.level); }
  }
}

// Đón khách top 10 tháng hoặc VIP cấp 5 trở lên: tiếp viên cúi chào mời vào, cột sáng ở cửa, vệt sáng theo bước chân,
// máy quay chiếu lối vào. Top 1 đến 3 thêm pháo hoa và pháo giấy.
function onGrand(m) {
  const c = guests.get(m.id), vip = vipOf(m.level), top = m.rank > 0, podium = top && m.rank <= 3;
  const title = top ? `TOP ${m.rank} THÁNG` : m.tt ? `CẤP ${m.tt} TIKTOK` : vip.title.toUpperCase();
  const color = podium ? ['#ffd23f', '#e6eef5', '#e7a36a'][m.rank - 1] : top ? '#ffe9a8' : (vip.aura || vip.frame);
  ui.banner(`${top ? '🏆' : '👑'} ${title}`, `${m.name} đã đến quán`, { level: Math.max(m.level, top ? 10 : 1), kind: top ? 'vip' : 'level', ms: podium ? 4800 : 3600 });
  ui.ticker(`${top ? '🏆' : '👑'} ${title} ${m.name} vào quán`, 'level');
  sfx.play(podium ? 'party' : 'level');
  sfx.play('applause', { seconds: podium ? 3 : 2, size: podium ? 1.4 : 1 });
  crowd.act(staff.greeter, 'greet', 3.2);
  crowd.say(staff.greeter, '🙇', 3200);
  crowd.bubble(staff.greeter, `Mời ${top ? 'Top ' + m.rank : m.tt ? 'anh chị cấp ' + m.tt : vip.title} vào quán ạ!`, 3600);
  const door = { x: POINTS.door.x, y: 0, z: POINTS.door.z };
  fx.beam(door, podium ? 4.5 : 3, color);
  fx.ring(door, color, podium ? 5 : 3.6, 1.6);
  setTimeout(() => fx.ring(door, '#ffffff', podium ? 4 : 2.8, 1.2), 350);
  if (podium) {
    fx.confetti({ x: door.x, y: 6, z: door.z }, 160, 3);
    for (let i = 0; i < 5; i++) setTimeout(() => { fx.firework({ x: (Math.random() - .5) * 20, y: 10 + Math.random() * 4, z: 17 + Math.random() * 5 }); sfx.play('firework'); }, 400 + i * 700);
  }
  if (!c) return;
  c.trail = { until: performance.now() + (podium ? 9000 : 6500), color };
  crowd.say(c, top ? '😎' : '✨', 3000);
  director.request('focus', { at: c, follow: c, seconds: podium ? 6 : 4.5, priority: top ? 3 : 2 });
  ui.guest({ ...c.data, level: c.level, name: m.name });
}

function onEvent(m) {
  if (m.kind === 'grand') return onGrand(m);
  const text = {
    new: `🎉 Khách mới: ${m.name}`, return: `👋 ${m.name} quay lại quán`, share: `📣 ${m.name} chia sẻ live`,
    pick: `📝 ${m.name} chọn ${itemById(m.item)?.name}, tặng ${itemById(m.item)?.coins} xu để lên món`,
    table: m.mate ? `🪑 ${m.name} sang bàn ${m.table} ngồi cùng ${m.mate}` : `🪑 ${m.name} ngồi bàn ${m.table}, chờ bạn tới nè`,
    tableFull: `🪑 Bàn ${m.table} hết chỗ rồi, ${m.name} chọn bàn khác nha`, tableVip: `👑 Bàn ${m.table} thuộc ${m.zone}, cần lên cấp mới ngồi được`,
    tableNone: `🪑 Quán không có bàn ${m.table}`,
  }[m.kind];
  if (text) ui.ticker(text, m.kind.startsWith('table') ? 'new' : m.kind);
  if (m.kind === 'pick') ui.flashItem(m.item);
}

function onGift(m) {
  const item = itemById(m.itemId), c = guests.get(m.id);
  ui.flashItem(m.itemId);
  ui.ticker(`🎁 ${m.name} tặng ${m.coins.toLocaleString('vi-VN')} xu → ${item.name}`, 'gift');
  sfx.play('coin', { coins: m.coins });
  if (c) { fx.sparkle({ x: c.x, y: c.headY, z: c.z }, 20); crowd.say(c, '🎁', 1500); }
  if (m.coins >= 100) ui.banner(`${m.name} gọi ${item.name}`, `${m.coins.toLocaleString('vi-VN')} xu · ${reactionFor(item.coins).emoji} ${reactionFor(item.coins).label}`, { level: m.level, kind: m.coins >= 1000 ? 'vip' : 'gift' });
  // Khách gọi món là máy quay về bàn khách đó; quà lớn giữ lâu hơn và không bị quà nhỏ cướp cảnh
  if (c) {
    director.request('focus', { at: c, follow: c, seconds: m.coins >= 1000 ? 9 : m.coins >= 200 ? 6 : 4, priority: m.coins >= 1000 ? 3 : m.coins >= 200 ? 2 : 1 });
    if (m.coins >= 200) ui.guest({ ...c.data, level: c.level, name: m.name });
  }
}

function onLevelUp(m) {
  const c = guests.get(m.id), vip = vipOf(m.level);
  ui.banner(`${m.name} lên cấp ${m.level}`, vip.title, { level: m.level, kind: 'level', ms: 3600 });
  ui.ticker(`⭐ ${m.name} lên ${vip.title}`, 'level');
  sfx.play('level');
  if (!c) return;
  c.level = m.level;
  if (c.data) c.data.level = m.level;
  fx.levelUp({ x: c.x, y: c.y, z: c.z }, vip.aura || vip.frame);
  crowd.act(c, 'jump', 2.4);
  crowd.say(c, '⭐', 3000);
  if (m.level >= 3) director.request('focus', { at: c, follow: c, seconds: 5, priority: 3 });
}

function onParty(m) {
  if (m.kind === 'tea') return teaRound(m);
  const all = m.kind === 'all', item = itemById(m.itemId);
  ui.banner(all ? 'ĐẠI TIỆC TOÀN QUÁN' : 'TIỆC CẢ KHU', `${m.name} mời ${all ? 'cả quán' : 'cả khu'}: ${item.name}`, { level: 10, kind: 'party', ms: 5000 });
  sfx.play('party');
  for (let i = 0; i < (all ? 6 : 2); i++) setTimeout(() => sfx.play('firework'), 600 + i * 900);
  fx.party(all ? 16 : 10);
  director.request('overview', { seconds: 8, priority: 3 });
  const center = zoneCenter(m.zone);
  for (const c of guests.values()) {
    if (!all && Math.hypot(c.x - center.x, c.z - center.z) > 9) continue;
    crowd.act(c, 'dance', 6 + Math.random() * 3);
    crowd.say(c, ['🎉', '🥳', '💃', '🕺'][c.slot % 4], 5000);
  }
  const bursts = all ? 14 : 6;
  for (let i = 0; i < bursts; i++) setTimeout(() => {
    fx.confetti({ x: all ? (Math.random() - .5) * 22 : center.x, y: 7, z: all ? -14 + Math.random() * 28 : center.z }, 140, all ? 8 : 4);
    if (all) fx.firework({ x: (Math.random() - .5) * 30, y: 11 + Math.random() * 5, z: 18 + Math.random() * 6 });
  }, i * 450);
}

// Bao cả quán trà đá: mỗi khách đang ngồi cầm một ly trà đá, lần lượt nâng ly cụng, ly leng keng khắp quán.
function teaRound(m) {
  ui.banner('🧊 BAO CẢ QUÁN TRÀ ĐÁ', `${m.name} mời mỗi người một ly`, { level: 6, kind: 'gift', ms: 4000 });
  ui.ticker(`🧊 ${m.name} bao cả quán trà đá`, 'gift');
  sfx.play('pour');
  director.request('overview', { seconds: 5, priority: 2 });
  let i = 0;
  for (const c of guests.values()) {
    if (c.state === 'walk') continue;
    setTimeout(() => {
      c.holding = true; c.cupColor = '#d8c75a'; crowd.restyle(c, c.level);
      crowd.act(c, 'toast', 2.4);
      crowd.say(c, c.id === m.id ? '😎' : '🧊', 2600);
      if (fx.allow(.4)) fx.sparkle({ x: c.x, y: c.headY, z: c.z }, 8, ['#fff8c0', '#d8f3ff', '#ffffff']);
      if (i % 3 === 0) sfx.play('clink');
    }, 300 + Math.min(2500, i * 90));
    i++;
  }
}

/* ------------------------------------------------------------ kết nối */
const status = document.querySelector('#conn');
function connect() {
  const ws = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws`);
  ws.onopen = () => { status.hidden = true; };
  ws.onmessage = e => { try { onMessage(JSON.parse(e.data)); } catch (err) { console.error(err); } };
  ws.onclose = () => { status.hidden = false; setTimeout(connect, 1500); };
}
connect();

/* ------------------------------------------------------------ vòng vẽ */
const clock = new THREE.Clock();
let frames = 0, fpsAt = performance.now();
function loop() {
  const dt = Math.min(.05, clock.getDelta()), time = clock.elapsedTime, now = performance.now();
  const captions = updateOrders(dt);
  crowd.update(dt, time);
  director.update(dt, camera.aspect);
  for (const c of guests.values()) {
    if (!c.trail) continue;
    if (now > c.trail.until) c.trail = null;
    else if (Math.random() < dt * 14) fx.sparkle({ x: c.x, y: c.y + .3, z: c.z }, 5, [c.trail.color, '#ffffff', '#fff6c8']);
  }
  const partying = fx.update(dt, camera, stageH);
  if (partying && Math.random() < dt * 1.5) fx.firework({ x: (Math.random() - .5) * 28, y: 11 + Math.random() * 4, z: 17 + Math.random() * 6 });
  if (composer) composer.render(); else renderer.render(scene, camera);
  // Nhãn vẽ đè lên cảnh nên không bị tường che: quay mặt tiền thì chỉ hiện tên khách ngoài vỉa hè
  const outside = director.kind === 'facade';
  labels.draw(camera, outside ? crowd.list.filter(c => c.z > 15) : crowd.list, outside ? [] : captions, now);
  frames++;
  if (now - fpsAt > 1000) { window.__fps = frames; frames = 0; fpsAt = now; }
  requestAnimationFrame(loop);
}
director.update(0, camera.aspect); director.snap();
loop();
window.__game = { crowd, guests, orders, director, fx, renderer, sfx };
