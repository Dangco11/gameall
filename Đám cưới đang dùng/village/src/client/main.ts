import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { COMMAND_HELP, COMMAND_MORE, GIFT, PROJECTS } from '../shared/balance.ts';
import type { ProjectKey } from '../shared/balance.ts';
import type { ActKind, Delta, FestivalState, Fx, ProjectState, PubPlayer, Settings, Snapshot, WeddingState, WorldState } from '../shared/types.ts';
import { Sound } from './audio.ts';
import { FarmLayer } from './farm.ts';
import { Effects } from './fx.ts';
import { HouseLayer } from './houses.ts';
import { Kit } from './kit.ts';
import { IN_LOT, LOTS, LOT_SIZE, MARKET, PLOTS, POND, SQUARE, at } from './layout.ts';
import { shared } from './materials.ts';
import { Net } from './net.ts';
import { People } from './people.ts';
import type { Person } from './people.ts';
import { $, UI, el } from './ui.ts';
import { World } from './world.ts';
import { COUPLE, ENTRANCE, SEATS, VIEW, WeddingStage } from './wedding.ts';
import type { StageSpot } from './people.ts';

const params = new URLSearchParams(location.search);
const LIVE = params.has('live');
if (LIVE) document.body.classList.add('live');

/* ------------------------------------------------------------ scene */
const canvas = $<HTMLCanvasElement>('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
// ?lite=1 cho máy yếu: tắt đổ bóng và hiệu ứng tỏa sáng
const LITE = params.has('lite');
renderer.shadowMap.enabled = !LITE;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fc8ee);
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 900);
// Tỏa sáng cho đèn lồng, đèn đường, cửa sổ, pháo hoa: chỉ những chỗ rất sáng mới lan ra, ban đêm mạnh hơn ban ngày
const composer = LITE ? null : new EffectComposer(renderer);
const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.3, 0.45, 0.9);
if (composer){ composer.addPass(new RenderPass(scene, camera)); composer.addPass(bloom); composer.addPass(new OutputPass()); }
const CAM_DIR = new THREE.Vector3(0.62, 0.78, 1).normalize();

const kit = new Kit();
const world = new World(kit);
const weddingStage = new WeddingStage(kit);
const houses = new HouseLayer(kit);
const farm = new FarmLayer();
const people = new People();
const fx = new Effects(scene, [...world.lamps, ...weddingStage.lights]);
scene.add(kit.group, weddingStage.group, world.group, farm.group, people.group, fx.group);

const ui = new UI();
const sound = new Sound();
const net = new Net(LIVE ? 'view' : 'control');

/* ------------------------------------------------------------ state */
const players = new Map<string, PubPlayer>();
let lots = new Map<number, PubPlayer>();
let lotsDirty = true;
let worldState: WorldState | null = null;
let projects: ProjectState[] = [];
let festival: FestivalState | null = null;
let festKey = '';
let controlRole = false;
let settings: Settings = { idleBots: true, voice: true, readChat: true, scene: 'village' };
let wedding: WeddingState | null = null, weddingAt = 0;

function activeProject(list: ProjectState[]): ProjectKey | null {
  return list.filter(b => b.stage < PROJECTS[b.key].stages.length).sort((a, b) => a.stage - b.stage)[0]?.key ?? null;
}

function upsert(p: PubPlayer){
  const prev = players.get(p.id);
  players.set(p.id, p);
  if (!prev || prev.lot !== p.lot || prev.houseLevel !== p.houseLevel || prev.decor.length !== p.decor.length || prev.rice.stage !== p.rice.stage
    || prev.rice.progress !== p.rice.progress || prev.rice.water !== p.rice.water || prev.coop.eggs !== p.coop.eggs) lotsDirty = true;
  if (p.lot >= 0) people.sync(p, performance.now());
}

function rebuildLots(){
  lots = new Map();
  for (const p of players.values()) if (p.lot >= 0) lots.set(p.lot, p);
  houses.update(lots);
  farm.update(lots);
  lotsDirty = false;
}

function onHello(s: Snapshot){
  controlRole = s.role === 'control';
  players.clear(); for (const id of [...people.list.keys()]) people.remove(id);
  for (const p of s.players) upsert(p);
  apply({ t: 'delta', world: s.world, projects: s.projects, market: s.market, festival: s.festival, boards: s.boards, live: s.live, stats: s.stats, reserve: s.reserve });
  rebuildLots();
  settings = s.settings; wedding = s.wedding; weddingAt = performance.now(); applyScene();
  if (controlRole) buildSimPanel();
}

let reserve = 0;
function apply(d: Delta){
  if (d.players) for (const p of d.players) upsert(p);
  if (d.removed) for (const id of d.removed){ const p = players.get(id); if (p){ p.lot = -1; lotsDirty = true; } people.remove(id); }
  if (d.world){
    if (!worldState || worldState.season !== d.world.season) world.setSeason(d.world.season);
    worldState = d.world; fx.setWorld(d.world);
  }
  if (d.reserve !== undefined) reserve = d.reserve;
  if (d.projects){ projects = d.projects; world.updateProjects(projects, activeProject(projects)); ui.projects(projects, reserve); }
  if (d.market) ui.market(d.market);
  if (d.boards) ui.setBoards(d.boards);
  if (d.stats){ ui.stats(d.stats); statsLine(d.stats); }
  if (d.wedding){ wedding = d.wedding; weddingAt = performance.now(); ui.wedding(wedding, 0); weddingStage.setCouple(wedding); }
  if (d.settings){ const was = settings.scene; settings = d.settings; if (was !== settings.scene) applyScene(); for (const k of ['idleBots', 'voice'] as const){ const b = document.getElementById('set_' + k) as HTMLInputElement | null; if (b) b.checked = settings[k]; } }
  if (d.live){ liveState = d.live; ui.live(d.live, !LIVE); updateLiveForm(); }
  if (d.festival) onFestival(d.festival);
  if (d.fx) for (const f of d.fx) onFx(f);
  if (d.players || d.removed || d.wedding || d.settings) updateStage();
}

/* --------------------------------------------------------- đám cưới */
const isWedding = () => settings.scene === 'wedding';
function applyScene(){
  document.body.classList.toggle('wedding', isWedding());
  const title = document.querySelector('.brand b'), logo = document.querySelector('.brand .logo');
  if (title) title.textContent = isWedding() ? 'Đám Cưới Làng Quê' : 'Làng Quê Việt Nam';
  document.title = isWedding() ? 'Đám Cưới Làng Quê' : 'Làng Quê Việt Nam';
  if (logo) logo.textContent = isWedding() ? '💒' : '🌾';
  sound.setMode(isWedding() ? 'wedding' : 'village');
  document.querySelectorAll<HTMLButtonElement>('[data-scene]').forEach(b => b.classList.toggle('on', b.dataset.scene === settings.scene));
  if (wedding){ ui.wedding(wedding, 0); weddingStage.setCouple(wedding); }
  updateStage();
}

// Chỗ ngồi cố định cho từng khách: ai đến trước ngồi trước, ai rời live thì nhường ghế, người khác không phải đổi chỗ.
const seatOf = new Map<string, number>();
function updateStage(){
  if (!isWedding() || !wedding){ seatOf.clear(); people.stage(null, ENTRANCE); return; }
  const spots = new Map<string, StageSpot>();
  if (wedding.bride && players.has(wedding.bride.id)) spots.set(wedding.bride.id, { ...COUPLE.bride, role: 'bride', lift: 0.5 });
  if (wedding.groom && players.has(wedding.groom.id)) spots.set(wedding.groom.id, { ...COUPLE.groom, role: 'groom', lift: 0.5 });
  const want = wedding.guests.filter(id => !spots.has(id) && players.get(id)?.online && players.get(id)!.lot >= 0);
  for (const id of [...seatOf.keys()]) if (!want.includes(id)) seatOf.delete(id);
  const used = new Set(seatOf.values());
  for (const id of want){
    if (seatOf.has(id)) continue;
    let s = 0; while (used.has(s) && s < SEATS.length) s++;
    if (s >= SEATS.length) break;
    seatOf.set(id, s); used.add(s);
  }
  for (const [id, s] of seatOf) spots.set(id, { ...SEATS[s], role: 'guest', lift: 0 });
  people.stage(spots, ENTRANCE);
}

function onWeddingFx(f: Extract<Fx, { k: 'wedding' }>){
  if (f.ev === 'guest'){ people.say(f.id, ['Ăn cỗ thôi!', 'Chúc mừng hạnh phúc!', 'Dô dô!', 'Cỗ ngon quá!'][Math.floor(Math.random() * 4)], 3000); return; }
  ui.feed(f.text, f.ev === 'mung' ? 'gift' : 'note');
  sound.wedding(f.ev);
  const bride = COUPLE.bride, groom = COUPLE.groom, mid = { x: (bride.x + groom.x) / 2, z: bride.z };
  if (f.ev === 'bride'){ ui.weddingBanner('👰', `${f.name} làm cô dâu!`, 'Ai tặng quà tiếp sẽ làm chú rể', 'bride'); fx.weddingFx('hearts', mid); }
  if (f.ev === 'groom'){ ui.weddingBanner('🤵', `${f.name} làm chú rể!`, `Rước cô dâu ${f.other ?? ''}, lễ thành hôn bắt đầu`, 'groom'); fx.weddingFx('hearts', mid); fx.fireworks(mid.x, mid.z - 4); }
  if (f.ev === 'steal'){ ui.weddingBanner('🏃', `${f.name} cướp dâu!`, `Giành cô dâu từ tay ${f.other ?? ''}`, 'steal'); fx.weddingFx('steal', mid); }
  if (f.ev === 'mung'){ const c = people.list.get(f.id); fx.weddingFx('envelope', mid, c ? { x: c.x, z: c.z } : undefined); people.say(f.id, `🧧 Mừng cưới ${f.amount ?? ''} xu`, 3500); }
  if (f.ev === 'end'){ ui.weddingBanner('🎉', 'Trăm năm hạnh phúc!', `${f.name} và ${f.other ?? ''} rước dâu về nhà`, 'groom'); fx.fireworks(mid.x, mid.z - 4); fx.weddingFx('hearts', mid); }
}

function onFestival(f: FestivalState){
  const prev = festival?.phase;
  festival = f;
  ui.festival(f); fx.setFestival(f);
  const key = `${f.phase}|${f.entrants.map(e => e.id).join(',')}`;
  if (key !== festKey){ festKey = key; people.festival(f); }
  if (prev !== f.phase){
    if (f.phase === 'lobby' || f.phase === 'contest'){
      sound.festival();
      const [x, z, zoom] = f.type === 'cauca' ? [POND.x, POND.z, 1.4] : f.type === 'duathuyen' ? [-5, -31, 1.3] : f.type === 'trangtri' ? [0, 30, 1.2] : [SQUARE.x, SQUARE.z, 1.7];
      director.focus(x, z, 3, zoom, f.phase === 'contest' ? 60000 : 12000);
    }
    if (f.phase === 'idle' && prev) people.endFestival();
  }
}

/* --------------------------------------------------------- game fx */
function personPos(id: string){ const c = people.list.get(id); return c ? { x: c.x, z: c.z } : null; }
function siteOf(act: ActKind){
  if (act !== 'donate') return null;
  const key = activeProject(projects);
  const s = key ? world.sites[key] : null;
  return s ? { x: s.x + (Math.random() - 0.5) * 8, z: s.z + 6 } : null;
}

function onFx(f: Fx){
  switch (f.k){
    case 'act': {
      const c = people.act(f.id, f.act, f.ok, f.bubble, siteOf);
      if (f.text) ui.feed(f.text, f.ok ? '' : 'fail');
      if (f.ok && f.act !== 'chat'){
        if (f.act === 'enter') sound.welcome(); else sound.pop();
        if (c){ c.activeAt = performance.now(); director.follow(c, 1, 6000); }
        if (f.act === 'market') sound.coin();
        if (f.act === 'home'){ const p = players.get(f.id); if (p && p.lot >= 0){ const h = LOTS[p.lot]; director.focus(h.x, h.z, 2, 2.2, 8000); ui.card(p, cardActions(p), 8000); } }
        if (f.act === 'build' && c) fx.sparkle(c.x, c.z);
      }
      break;
    }
    case 'gift': {
      // cảnh đám cưới: quà đã có bảng và nhạc riêng của đám cưới, không chồng hiệu ứng làng lên
      if (isWedding()){ const c = people.list.get(f.id); if (c) c.giftAt = performance.now(); break; }
      const info = GIFT.tiers.find(t => t.key === f.tier) ?? GIFT.tiers[0];
      ui.giftBanner(f.name, f.gift, f.count, info);
      ui.feed(f.text, 'gift');
      sound.gift(info.level, info.fx);
      const c = people.list.get(f.id), owner = players.get(f.id);
      const from = c ? { x: c.x, z: c.z } : { x: director.target.x, z: director.target.z };
      const home = owner && owner.lot >= 0 ? at(LOTS[owner.lot], IN_LOT.house) : null;
      if (c){ c.giftAt = performance.now(); c.anim = 'cheer'; c.animUntil = performance.now() + 4000; people.say(f.id, `${info.icon} Tặng ${f.gift}!`, 5000); }
      // quà nâng nhà thì camera quay về ngôi nhà vừa lên cấp, còn lại quay người tặng
      if (info.house && home) director.focus(home.x, home.z, 3, 2.1, 10000);
      else if (c) director.follow(c, 3, info.level >= 3 ? 10000 : 7000);
      const near = f.targets.map(personPos).filter((p): p is { x: number; z: number } => !!p);
      fx.giftFx(info.fx, info.level, from, near, home);
      // nhà xóm được hưởng quà cũng lên tiếng cảm ơn
      for (const id of f.targets.slice(0, 3)) people.say(id, ['Cảm ơn nha!', 'Mát ruộng quá!', `Cảm ơn ${f.name}!`][Math.floor(Math.random() * 3)], 3500);
      break;
    }
    case 'leave': ui.feed(`👋 ${f.name} rời làng, hẹn gặp lại!`); people.say(f.id, 'Tạm biệt bà con!', 3500); break;
    case 'back': ui.feed(`🏡 ${f.name} đã quay lại làng!`); people.say(f.id, 'Tui về rồi nè!', 3500); sound.welcome(); break;
    case 'join':
      if (!f.known) ui.feed(`👋 ${f.name} vừa vào xem, bình luận VÀO LÀNG để nhận nhà`);
      break;
    case 'like': hearts(f.id, f.count); break;
    case 'level': {
      const p = players.get(f.id);
      ui.feed(`⭐ ${p?.name ?? ''} lên cấp ${f.level}: ${f.title}`, 'note');
      sound.levelUp();
      const c = people.list.get(f.id); if (c){ fx.sparkle(c.x, c.z, 0xffe08a); people.say(f.id, `Cấp ${f.level}!`); }
      break;
    }
    case 'built': {
      ui.banner(`Cả làng xây xong ${f.stageName}!`, PROJECTS[f.project].perk, 3);
      const s = world.sites[f.project]; director.focus(s.x, s.z, 3, 1.6, 9000);
      break;
    }
    case 'note': ui.feed(f.text, 'note'); break;
    case 'fireworks': fx.fireworks(director.target.x, director.target.z - 10); for (let i = 0; i < 5; i++) setTimeout(() => sound.boom(), 300 + i * 380); break;
    case 'voice': sound.voice(f.url); break;
    case 'wedding': onWeddingFx(f); break;
  }
}

/* ---------------------------------------------------------- camera */
// Đạo diễn camera: có quà thì quay người tặng, có lệnh thì quay người làm, rảnh thì lia một vòng làng.
const TOUR: [number, number, number][] = [[0, -6, 1], [0, -62, 1.5], [SQUARE.x, SQUARE.z, 1.7], [MARKET.x, MARKET.z, 1.7], [0, 34, 1.4], [-60, -8, 1.5], [68, -5, 1.6]];
const director = {
  target: new THREE.Vector3(0, 0, -6), zoom: 1, goal: new THREE.Vector3(0, 0, -6), goalZoom: 1,
  priority: 0, until: 0, follow_: null as Person | null, manualUntil: 0, tour: 0, nextTour: 0,
  focus(x: number, z: number, pri: number, zoom: number, ms: number){
    const now = performance.now();
    if (now < this.manualUntil || (pri < this.priority && now < this.until)) return;
    this.goal.set(x, 0, z); this.goalZoom = zoom; this.priority = pri; this.until = now + ms; this.follow_ = null;
  },
  follow(c: Person, pri: number, ms: number){
    const now = performance.now();
    if (now < this.manualUntil || (pri < this.priority && now < this.until)) return;
    this.follow_ = c; this.goalZoom = pri >= 3 ? 2.2 : 1.9; this.priority = pri; this.until = now + ms;
  },
  update(dt: number, now: number){
    if (isWedding() && now > this.manualUntil){
      // đám cưới: một khung hình cố định gói trọn sân khấu và các mâm cỗ
      const portrait = innerWidth / innerHeight < 0.8;
      this.goal.set(VIEW.x, 0, VIEW.z); this.goalZoom = portrait ? 1.62 : 2.3;
      this.follow_ = null; this.priority = 9; this.until = now + 1000;
    } else if (now > this.until){
      this.priority = 0; this.follow_ = null;
      if (now > this.nextTour && now > this.manualUntil){ const [x, z, zm] = TOUR[this.tour++ % TOUR.length]; this.goal.set(x, 0, z); this.goalZoom = zm; this.nextTour = now + 14000; }
    }
    if (this.follow_ && now >= this.manualUntil) this.goal.set(this.follow_.x, 0, this.follow_.z);
    const k = 1 - Math.exp(-dt * 1.8);
    if (now > this.manualUntil){ this.target.lerp(this.goal, k); this.zoom += (this.goalZoom - this.zoom) * k; }
  },
};

// ?cam=x,z,zoom cố định camera một chỗ, ví dụ ?live=1&cam=26,1,1.8 chỉ quay sân hội
const camParam = params.get('cam')?.split(',').map(Number);
if (camParam && camParam.length >= 2 && camParam.every(Number.isFinite)){
  director.target.set(camParam[0], 0, camParam[1]); director.goal.copy(director.target);
  director.zoom = director.goalZoom = camParam[2] || 1.5; director.manualUntil = Infinity;
}

let viewH = 80;
function resize(){
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false);
  composer?.setPixelRatio(Math.min(devicePixelRatio, 2)); composer?.setSize(w, h);
  viewH = w / h < 0.8 ? 64 : 80;
  const aspect = w / h;
  camera.left = -viewH * aspect / 2; camera.right = viewH * aspect / 2; camera.top = viewH / 2; camera.bottom = -viewH / 2;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// kéo để di chuyển, cuộn để phóng to, bấm vào người hoặc nhà để xem thông tin
if (!LIVE){
  let drag: { x: number; y: number; moved: number } | null = null;
  canvas.addEventListener('pointerdown', e => { drag = { x: e.clientX, y: e.clientY, moved: 0 }; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y; drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
    if (drag.moved < 4) return;
    const per = viewH / camera.zoom / innerHeight;
    const right = new THREE.Vector3(CAM_DIR.z, 0, -CAM_DIR.x).normalize(), fwd = new THREE.Vector3(-CAM_DIR.x, 0, -CAM_DIR.z).normalize();
    director.target.addScaledVector(right, -dx * per).addScaledVector(fwd, dy * per / CAM_DIR.y);
    director.goal.copy(director.target); director.manualUntil = performance.now() + 25000;
  });
  canvas.addEventListener('pointerup', e => { if (drag && drag.moved < 6) pick(e.clientX, e.clientY); drag = null; });
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    director.zoom = Math.max(0.45, Math.min(4, director.zoom * Math.exp(-e.deltaY * 0.0012)));
    director.goalZoom = director.zoom; director.goal.copy(director.target); director.manualUntil = performance.now() + 25000;
  }, { passive: false });
}

const ray = new THREE.Raycaster(), ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
function pick(cx: number, cy: number){
  ray.setFromCamera(new THREE.Vector2(cx / innerWidth * 2 - 1, -(cy / innerHeight) * 2 + 1), camera);
  const hit = new THREE.Vector3();
  if (!ray.ray.intersectPlane(ground, hit)) return;
  let best: Person | null = null, bd = 2.5;
  for (const c of people.list.values()) if (c.visible){ const d = Math.hypot(c.x - hit.x, c.z - hit.z); if (d < bd){ bd = d; best = c; } }
  let p = best ? players.get(best.id) : undefined;
  if (!p) for (const [lot, q] of lots){
    const l = LOTS[lot], plot = PLOTS[lot];
    if ((Math.abs(l.x - hit.x) < LOT_SIZE.w / 2 && Math.abs(l.z - hit.z) < LOT_SIZE.d / 2) || (Math.abs(plot.x - hit.x) < 3 && Math.abs(plot.z - hit.z) < 3)){ p = q; break; }
  }
  if (p) ui.card(p, cardActions(p)); else ui.hideCard();
}

// Nút trên thẻ chỉ có với cư dân mô phỏng: bấm là gửi bình luận thật vào hàng đợi như người xem gõ.
function cardActions(p: PubPlayer): [string, () => void][] | null {
  if (!controlRole || !p.sim) return null;
  const say = (text: string) => () => net.send({ t: 'sim', kind: 'comment', id: p.id, name: p.name, text });
  return [...['TRỒNG LÚA', 'TƯỚI NƯỚC', 'BÓN PHÂN', 'CHO CÁ ĂN', 'CHO GÀ ĂN', 'MUA VỊT', 'THU TRỨNG', 'CÂU CÁ', 'RA CHỢ', 'XÂY NHÀ', 'GÓP 50', 'MUA ĐÈN LỒNG'].map(c => [c, say(c)] as [string, () => void]),
    ['🎁 Hoa hồng', () => net.send({ t: 'sim', kind: 'gift', id: p.id, name: p.name, gift: 'Hoa hồng', diamonds: 1, count: 1 })]];
}

/* ----------------------------------------------------------- labels */
const TAGS = 40;
const tagPool: { box: HTMLDivElement; nm: HTMLSpanElement; lv: HTMLElement; bb: HTMLSpanElement; id: string; role: string }[] = [];
for (let i = 0; i < TAGS; i++){
  const box = el('div', 'tag') as HTMLDivElement, bb = el('span', 'bb') as HTMLSpanElement, nm = el('span', 'nm') as HTMLSpanElement, lv = el('i');
  box.append(bb, nm); box.style.display = 'none';
  $('labels').append(box);
  tagPool.push({ box, nm, lv, bb, id: '', role: '' });
}
let ranked: Person[] = [], rankAt = 0;
const _v = new THREE.Vector3();
function drawLabels(now: number){
  if (now - rankAt > 400){
    ranked = people.ranked(); rankAt = now;
    // đám cưới: luôn hiện cô dâu chú rể, khách chỉ hiện lúc vừa nói hay vừa tặng quà, cho khung hình gọn
    if (isWedding()) ranked = ranked.filter(c => c.role === 'bride' || c.role === 'groom' || now < c.bubbleUntil || now - c.giftAt < 8000).slice(0, 14);
  }
  let n = 0;
  for (const c of ranked){
    if (n >= TAGS) break;
    _v.set(c.x, 2.35 + (c.level > 0 ? Math.min(0.3, c.level * 0.008) : 0), c.z).project(camera);
    if (_v.x < -1.05 || _v.x > 1.05 || _v.y < -1.05 || _v.y > 1.1) continue;
    const t = tagPool[n++];
    const role = c.role === 'bride' || c.role === 'groom' ? c.role : '';
    if (t.id !== c.id || t.role !== role){ t.id = c.id; t.role = role; t.nm.textContent = (role === 'bride' ? '👰 ' : role === 'groom' ? '🤵 ' : '') + c.name; t.lv.textContent = `${c.level}`; t.nm.append(t.lv); t.box.className = 'tag' + (role ? ' ' + role : c.sim ? ' sim' : ''); }
    t.lv.textContent = `${c.level}`;
    const bubble = now < c.bubbleUntil ? c.bubble : '';
    if (t.bb.textContent !== bubble) t.bb.textContent = bubble;
    t.box.style.display = '';
    t.box.style.transform = `translate(${(_v.x + 1) / 2 * innerWidth}px, ${(1 - _v.y) / 2 * innerHeight}px) translate(-50%, -100%)`;
  }
  for (let i = n; i < TAGS; i++) if (tagPool[i].box.style.display !== 'none'){ tagPool[i].box.style.display = 'none'; tagPool[i].id = ''; }
}

let heartBudget = 0;
function hearts(id: string, count: number){
  const c = people.list.get(id);
  let x = innerWidth * 0.85, y = innerHeight * 0.7;
  if (c && c.visible){ _v.set(c.x, 2.4, c.z).project(camera); x = (_v.x + 1) / 2 * innerWidth; y = (1 - _v.y) / 2 * innerHeight; }
  const n = Math.min(4, Math.ceil(count / 10));
  for (let i = 0; i < n && heartBudget < 40; i++){
    heartBudget++;
    const h = el('span', 'heart', ['❤️', '💛', '💚', '🧡'][Math.floor(Math.random() * 4)]);
    h.style.left = `${x + (Math.random() - 0.5) * 20}px`; h.style.top = `${y}px`; h.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
    $('hearts').append(h);
    setTimeout(() => { h.remove(); heartBudget--; }, 1800);
  }
}

/* ------------------------------------------------------- sim panel */
let liveState = { status: 'idle', uniqueId: '', error: '', attempt: 0 };
let simBuilt = false;
function buildSimPanel(){
  if (simBuilt) return;
  simBuilt = true;
  const sim = $('sim'), body = $('simBody');
  sim.hidden = false; body.hidden = !(localStorageGet('simOpen') ?? true);
  $('simToggle').onclick = () => { body.hidden = !body.hidden; localStorageSet('simOpen', !body.hidden); };
  const label = (t: string) => el('label', '', t);
  const button = (t: string, fn: () => void, cls = 'btn2 ghost') => { const b = el('button', cls, t); b.onclick = fn; return b; };
  const line = (...k: HTMLElement[]) => { const d = el('div', 'line'); d.append(...k); return d; };

  const user = el('input') as HTMLInputElement; user.placeholder = '@username TikTok'; user.id = 'ttUser'; user.value = localStorageGet('ttUser') ?? '';
  const status = el('div', 'note'); status.id = 'ttStatus';
  const name = el('input') as HTMLInputElement; name.value = localStorageGet('simName') ?? 'Bạn'; name.onchange = () => localStorageSet('simName', name.value);
  const who = () => { const n = name.value.trim() || 'Bạn'; return { id: n, name: n }; };
  const say = (text: string) => net.send({ t: 'sim', kind: 'comment', ...who(), text });
  // Gọn: lệnh chính hiện sẵn, lệnh phụ bấm "Thêm" mới hiện; mỗi nhóm thu gọn được và nhớ trạng thái.
  const cmds = el('div', 'acts');
  for (const c of COMMAND_HELP) cmds.append(button(c, () => say(c), ''));
  const more = el('div', 'acts'); more.hidden = true;
  for (const c of COMMAND_MORE) more.append(button(c, () => say(c), ''));
  cmds.append(button('Thêm…', () => { more.hidden = !more.hidden; }, 'more'));
  const free = el('input') as HTMLInputElement; free.placeholder = 'Bình luận tự do, Enter để gửi';
  free.onkeydown = e => { if (e.key === 'Enter' && free.value.trim()){ say(free.value.trim()); free.value = ''; } };
  const gift = (g: string, d: number, n = 1) => () => net.send({ t: 'sim', kind: 'gift', ...who(), gift: g, diamonds: d, count: n });
  const tip = (b: HTMLElement, t: string) => { b.title = t; return b; };
  // Nút quà ghi rõ tên quà, số xu và mức quà sẽ kích hoạt
  const gifts = el('div', 'giftGrid');
  const giftBtn = (icon: string, g: string, d: number, n = 1) => {
    const total = d * n, tier = [...GIFT.tiers].reverse().find(t => total >= t.min)!;
    const b = el('button', 'gb'); b.onclick = gift(g, d, n); b.title = `${tier.name}: ${tier.desc}`;
    b.append(el('span', 'gn', `${icon} ${g}${n > 1 ? ' ×' + n : ''}`), el('b', 'gx', `${total} xu`), el('small', 'gt', tier.name));
    return b;
  };
  gifts.append(giftBtn('🌹', 'Hoa hồng', 1), giftBtn('🍬', 'Kẹo bông', 5), giftBtn('🍦', 'Kem', 10), giftBtn('🎩', 'Mũ', 30), giftBtn('🧴', 'Nước hoa', 50),
    giftBtn('💍', 'Nhẫn', 100), giftBtn('🐶', 'Cún con', 199), giftBtn('👑', 'Vương miện', 299), giftBtn('🎆', 'Pháo hoa', 500), giftBtn('🌌', 'Thiên hà', 1000),
    giftBtn('🌹', 'Hoa hồng', 1, 10), giftBtn('🍦', 'Kem', 10, 5));
  const social = el('div', 'acts');
  social.append(tip(button('👋 Vào', () => net.send({ t: 'sim', kind: 'join', ...who() }), ''), 'Vào xem live'),
    tip(button('❤️ Tim', () => net.send({ t: 'sim', kind: 'like', ...who(), count: 30 }), ''), 'Thả 30 tim'),
    button('📣 Chia sẻ', () => net.send({ t: 'sim', kind: 'share', ...who() }), ''),
    tip(button('🏠 Nhà', () => say('XEM NHÀ'), ''), 'Xem nhà mình'));
  const bots = el('select') as HTMLSelectElement;
  for (const n of [0, 10, 30, 80, 150, 300]){ const o = el('option', '', n ? `${n} người xem ảo` : 'Không bot'); o.setAttribute('value', String(n)); bots.append(o); }
  bots.onchange = () => net.send({ t: 'ctl', cmd: 'bots', count: +bots.value });
  const world2 = el('div', 'acts');
  world2.append(button('🏮 Mở hội', () => net.send({ t: 'ctl', cmd: 'festival' }), ''),
    ...([['☀️', 'clear', 'Nắng'], ['⛅', 'cloudy', 'Mây'], ['🍃', 'wind', 'Gió'], ['🌧', 'rain', 'Mưa']] as const).map(([t, w, h]) => tip(button(t, () => net.send({ t: 'ctl', cmd: 'weather', weather: w }), ''), h)),
    ...([['🌅', 0.255, 'Bình minh'], ['🌞', 0.5, 'Trưa'], ['🌇', 0.735, 'Hoàng hôn'], ['🌙', 0.88, 'Đêm']] as const).map(([t, c, h]) => tip(button(t, () => net.send({ t: 'ctl', cmd: 'clock', clock: c }), ''), h)));
  const toggle = (key: 'idleBots' | 'voice', text: string) => {
    const lab = el('label', 'toggle'), box = el('input') as HTMLInputElement;
    box.type = 'checkbox'; box.id = 'set_' + key; box.checked = settings[key];
    box.onchange = () => net.send({ t: 'ctl', cmd: 'settings', settings: { [key]: box.checked } });
    lab.append(box, document.createTextNode(text)); return lab;
  };
  const stats = el('div', 'stats'); stats.id = 'simStats';
  const live = el('a', 'note', '↗ Mở màn hình LIVE 9:16') as HTMLAnchorElement;
  live.href = '/?live=1'; live.target = '_blank'; live.rel = 'noopener';
  live.onclick = e => { e.preventDefault(); window.open('/?live=1', 'langque-live', 'width=540,height=960'); };
  const section = (key: string, title: string, open: boolean, ...kids: HTMLElement[]) => {
    const d = el('details') as HTMLDetailsElement, s = el('summary', '', title);
    d.open = localStorageGet('sec.' + key) ?? open;
    d.ontoggle = () => localStorageSet('sec.' + key, d.open);
    d.append(s, ...kids); return d;
  };
  const nameRow = line(el('span', 'lbl', 'Tên'), name);
  // chọn cảnh LIVE: làng quê hoặc đám cưới trong một khung hình
  const sceneBtn = (scene: Settings['scene'], text: string) => { const b = button(text, () => net.send({ t: 'ctl', cmd: 'settings', settings: { scene } }), 'btn2 ghost scene'); b.dataset.scene = scene; b.classList.toggle('on', settings.scene === scene); return b; };
  const sceneRow = line(sceneBtn('village', '🏡 Làng quê'), sceneBtn('wedding', '💒 Đám cưới'));
  const weddingActs = el('div', 'acts');
  weddingActs.append(button('🍲 ĂN CỖ', () => say('ĂN CỖ'), ''), button('🔄 Mở đám cưới mới', () => net.send({ t: 'ctl', cmd: 'newWedding' }), ''));

  body.replaceChildren(
    section('scene', 'Cảnh LIVE', true, sceneRow, weddingActs),
    section('tt', 'Kết nối TikTok LIVE', true, line(user, button('Kết nối', () => { localStorageSet('ttUser', user.value); net.send({ t: 'ctl', cmd: 'connect', user: user.value }); }, 'btn2'), button('Ngắt', () => net.send({ t: 'ctl', cmd: 'disconnect' }))), status),
    section('play', 'Thử như người xem', true, nameRow, cmds, more, free, social, el('div', 'lbl2', 'Tặng quà (xu TikTok)'), gifts),
    section('village', 'Làng và bot', false, bots, toggle('idleBots', 'Vắng người thì 2 bot giữ làng'), toggle('voice', 'Giọng đọc cảm ơn quà'), world2,
      line(button('Xóa cư dân DEMO', () => { if (confirm('Xóa mọi cư dân DEMO và dữ liệu của họ?')) net.send({ t: 'ctl', cmd: 'clearSim' }); }))),
    live, stats,
  );
  updateLiveForm();
}
function updateLiveForm(){
  const s = document.getElementById('ttStatus');
  if (s) s.textContent = liveState.status === 'connected' ? `Đang nhận sự kiện từ @${liveState.uniqueId}` : liveState.status === 'idle' ? 'Chưa kết nối. Các nút bên dưới chạy thật như sự kiện TikTok.' : `${liveState.status}${liveState.error ? ': ' + liveState.error : ''}`;
}
let fps = 60;
function statsLine(s: { queue: number; processed: number; duplicates: number; dropped: number; tickMs: number; bots: number }){
  const e = document.getElementById('simStats');
  if (e) e.textContent = `Hàng đợi ${s.queue} · đã xử lý ${s.processed} · trùng ${s.duplicates} · bỏ ${s.dropped} · tick ${s.tickMs} ms · ${Math.round(fps)} fps · ${people.list.size} nhân vật`;
}
function localStorageGet(k: string){ try { const v = localStorage.getItem('langque.' + k); return v === null ? null : JSON.parse(v); } catch { return null; } }
function localStorageSet(k: string, v: unknown){ try { localStorage.setItem('langque.' + k, JSON.stringify(v)); } catch { /* chế độ riêng tư */ } }

/* ------------------------------------------------------------ sound */
const soundBtn = $('soundBtn');
soundBtn.onclick = () => { if (sound.on){ sound.stop(); soundBtn.textContent = '🔈'; } else { sound.start(); soundBtn.textContent = '🔊'; } };
// nút nhạc nền: nhớ lựa chọn trên máy này; bật nhạc thì cũng bật tiếng
const musicBtn = $('musicBtn');
const showMusic = () => { musicBtn.style.opacity = sound.music ? '1' : '0.45'; musicBtn.title = sound.music ? 'Đang bật nhạc nền' : 'Đang tắt nhạc nền'; };
sound.setMusic(localStorageGet('music') ?? true); showMusic();
musicBtn.onclick = () => { sound.setMusic(!sound.music); localStorageSet('music', sound.music); if (sound.music && !sound.on){ sound.start(); soundBtn.textContent = '🔊'; } showMusic(); };
if (LIVE){ sound.start(); soundBtn.textContent = '🔊'; addEventListener('pointerdown', () => sound.start(), { once: true }); }

/* ------------------------------------------------------------- loop */
net.onHello = onHello;
net.onDelta = apply;
net.onStatus = up => ui.offline(!up);
net.connect();

let last = performance.now(), lotTimer = 0, uiClock = 0;
function frame(now: number){
  const dt = Math.min(0.25, (now - last) / 1000); last = now;   // máy yếu ít khung hình vẫn chạy đúng nhịp
  fps += ((1 / Math.max(dt, 1e-3)) - fps) * 0.05;
  shared.time.value = now / 1000;
  lotTimer -= dt;
  if (lotsDirty && lotTimer <= 0){ rebuildLots(); lotTimer = 0.5; }

  director.update(dt, now);
  camera.position.copy(director.target).addScaledVector(CAM_DIR, 300);
  camera.zoom = director.zoom; camera.updateProjectionMatrix();
  camera.lookAt(director.target);

  people.update(dt, now, festival?.phase === 'contest' ? { keoco: festival.teams[1] - festival.teams[0] } : null);
  farm.animate(now / 1000);
  fx.update(dt, now / 1000, director.target, houses.chimneys.values(), 0.5);
  kit.setNight(fx.night);
  kit.flush();
  for (const b of Object.values(world.veg)) b.flush();
  sound.ambience(dt, fx.night, worldState?.weather === 'rain');
  if ((uiClock -= dt) <= 0 && worldState){ ui.world(worldState, fx.clock); if (wedding && isWedding()) ui.wedding(wedding, now - weddingAt); uiClock = 1; }

  if (composer){ bloom.strength = 0.12 + 0.4 * fx.night; composer.render(); } else renderer.render(scene, camera);
  drawLabels(now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// tiện kiểm tra trong console
Object.assign(window, { __lang: { players, people, director, fx, IN_LOT, at } });
