import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { F, FX_MS, PICKABLE, RACE, SKILLS, planeName, skillOf } from '../shared/game.ts';
import type { PlaneKey } from '../shared/game.ts';
import { MAPS, lapFrac, mapOf } from '../shared/maps.ts';
import type { MapKey } from '../shared/maps.ts';
import type { Fx, RaceState, RacerPub, ServerMessage, Settings } from '../shared/types.ts';
import { Sound } from './audio.ts';
import type { MusicScene } from './audio.ts';
import { Champion } from './champion.ts';
import { Particles, SkillFx, Trail } from './fx.ts';
import { PlaneRig, blueprint, loadPlaneModels } from './glb.ts';
import type { Maneuver } from './glb.ts';
import { Net } from './net.ts';
import { Track } from './track.ts';
import { $, Minimap, UI, el, fitView, view } from './ui.ts';
import { World } from './world.ts';

// Đua Máy Bay: màn hình vẽ cuộc đua server gửi xuống. ?live=1 là cửa sổ cho TikTok LIVE Studio (không có bảng điều khiển).
const params = new URLSearchParams(location.search);
const LIVE = params.has('live'), LITE = params.has('lite');
if (LIVE) document.body.classList.add('live');

/* -------------------------------------------------------------- cảnh */
const canvas = $<HTMLCanvasElement>('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, 1, 0.5, 14000);
const hemi = new THREE.HemisphereLight(0xdcefff, 0x4a6a50, 1.1);
const sun = new THREE.DirectionalLight(0xfff1dc, 3);
// bóng đổ bám theo máy quay: vùng 240 m quanh máy bay đang quay
sun.castShadow = true; sun.shadow.mapSize.set(LITE ? 1024 : 2048, LITE ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -120, right: 120, top: 120, bottom: -120, near: 10, far: 1200 });
sun.shadow.bias = -0.0006; sun.shadow.normalBias = 0.6;
scene.add(hemi, sun, sun.target);

const fire = new Particles(LITE ? 2500 : 6000, true), smoke = new Particles(LITE ? 1500 : 3500, false);
scene.add(smoke.points, fire.points);
const skills = new SkillFx(fire, smoke); scene.add(skills.group);
let shake = 0, flash = 0;
skills.onBoom = (p, big) => { const d = p.distanceTo(camera.position); if (d < 400){ shake = Math.max(shake, (big ? 1.6 : 0.8) * (1 - d / 400)); sound.boom(big); } flash = Math.max(flash, big ? 0.5 : 0.2); };

// Hậu kỳ: bloom cho đèn neon, lửa phản lực; làm nhoè hướng tâm (motion blur) khi bay tốc độ cao
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.55, 0.45, 2.6);   // ngưỡng cao: chỉ vật phát sáng mới loé
composer.addPass(bloom);
const blur = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, strength: { value: 0 }, center: { value: new THREE.Vector2(0.5, 0.47) } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float strength; uniform vec2 center; varying vec2 vUv;
    void main(){ vec2 d = vUv - center; float r = length(d); vec4 c = vec4(0.0); float w = 0.0;
      for (int i = 0; i < 10; i++){ float t = float(i) / 9.0; float k = 1.0 - t * 0.6; c += texture2D(tDiffuse, vUv - d * strength * t * smoothstep(0.08, 0.6, r)) * k; w += k; }
      gl_FragColor = c / w; }`,
});
composer.addPass(blur); composer.addPass(new OutputPass());

let quality = Math.min(devicePixelRatio, LITE ? 1 : 2);
function resize(){
  fitView();
  renderer.setPixelRatio(quality); renderer.setSize(innerWidth, innerHeight, false);
  composer.setPixelRatio(quality); composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  fire.setScale(innerHeight * quality); smoke.setScale(innerHeight * quality);
  speedCv.width = innerWidth; speedCv.height = innerHeight;
}
const speedCv = $<HTMLCanvasElement>('speed'), speedCtx = speedCv.getContext('2d')!;
addEventListener('resize', resize);
const ui = new UI();
const sound = new Sound();

/* ------------------------------------------------------------ bản đồ */
let mapKey: MapKey = MAPS[0].key;
let track = new Track(mapOf(mapKey).pts);
let world = new World(scene, renderer, track, mapOf(mapKey), { sun, hemi }, LITE);
let minimap = new Minimap($<HTMLCanvasElement>('minimap'), track.samples(300));
function setMap(k: MapKey){
  if (k === mapKey) return;
  mapKey = k;
  const fade = $('fade'); fade.classList.add('on');
  // đợi màn đen phủ kín rồi mới dựng cảnh mới để không thấy giật
  setTimeout(() => {
    world.dispose(scene);
    track = new Track(mapOf(k).pts);
    world = new World(scene, renderer, track, mapOf(k), { sun, hemi }, LITE);
    minimap = new Minimap($<HTMLCanvasElement>('minimap'), track.samples(300));
    for (const v of views.values()){ v.trails.forEach(t => t.reset()); v.prev.set(0, -999, 0); }
    ui.map(mapOf(k));
    setTimeout(() => fade.classList.remove('on'), 120);
  }, 380);
}
ui.map(mapOf(mapKey));

/* ---------------------------------------------------------- máy bay */
interface View {
  pub: RacerPub; rig: PlaneRig; trails: Trail[]; label: HTMLDivElement; escorts: PlaneRig[];
  disp: number; d0: number; v0: number; t0: number; lx: number; ly: number; rollA: number; warpUntil: number;
  seed: number; pos: THREE.Vector3; prev: THREE.Vector3; fwd: THREE.Vector3; up: THREE.Vector3; right: THREE.Vector3;
  plane: PlaneKey; color: number; num: string; rank: number; lastF: number; lastPlace: number; frac: number; gold: number; stuntAt: number; mode: string;
}
const views = new Map<string, View>();
const labels = $('labels');
const numFor = (id: string) => { let h = 7; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 997; return String(10 + h % 90); };
function makeRig(v: { pub: RacerPub; num: string }){
  const rig = new PlaneRig(v.pub.plane, v.pub.color, v.num);
  scene.add(rig.root);
  return rig;
}
function addView(p: RacerPub): View {
  const num = numFor(p.id), rig = makeRig({ pub: p, num });
  const trails = [new Trail(26, 0.22), new Trail(26, 0.22), new Trail(30, 0.5), new Trail(30, 0.5)];
  for (const t of trails) scene.add(t.mesh);
  const label = el('div', 'tag'); labels.append(label);
  let seed = 0; for (const ch of p.id) seed = (seed * 31 + ch.charCodeAt(0)) % 10007;
  const v: View = { pub: p, rig, trails, label, escorts: [], disp: p.d, d0: p.d, v0: p.v, t0: performance.now(), lx: (p.lane - (RACE.gridCols - 1) / 2) * RACE.gridLane, ly: 0, rollA: 0, warpUntil: 0,
    seed, pos: new THREE.Vector3(), prev: new THREE.Vector3(0, -999, 0), fwd: new THREE.Vector3(1, 0, 0), up: new THREE.Vector3(0, 1, 0), right: new THREE.Vector3(0, 0, 1),
    plane: p.plane, color: p.color, num, rank: 0, lastF: 0, lastPlace: p.place, frac: 0, gold: 0, stuntAt: performance.now() + 5000 + Math.random() * 10_000, mode: 'grid' };
  views.set(p.id, v);
  return v;
}
function rebuild(v: View){
  v.rig.dispose();
  v.rig = makeRig(v); v.plane = v.pub.plane; v.color = v.pub.color;
  for (const e of v.escorts) e.dispose(); v.escorts = [];
}
function removeView(v: View){
  v.rig.dispose(); for (const e of v.escorts) e.dispose();
  for (const t of v.trails){ scene.remove(t.mesh); t.mesh.geometry.dispose(); (t.mesh.material as THREE.Material).dispose(); }
  v.label.remove(); views.delete(v.pub.id);
}
// Phi đội hộ tống của máy bay VIP: 2 máy bay vàng nhỏ bay ngang hai bên cánh (không lùi sau, để khỏi che máy quay bám đuôi)
function escortsFor(v: View){
  return [1, -1].map(s => { const r = new PlaneRig('golden', 0xd4a63a, 'VIP'); r.root.scale.setScalar(0.55); r.root.position.set(s * 17, 1.5, 2); v.rig.root.add(r.root); return r; });
}

/* ------------------------------------------------------------ dữ liệu */
let race: RaceState = { phase: 'lobby', leftMs: 0, raceNo: 0, raceMs: 0, laps: RACE.laps, lapLen: RACE.lapLen, podium: [], map: mapKey };
let raceAt = performance.now();
let racers: RacerPub[] = [];
let settings: Settings = { voice: true, bots: 4, laps: 3, map: 'auto' };
let lastPhase = '';
const net = new Net(LIVE ? 'view' : 'control');
net.onStatus = up => { $('offline').hidden = up; };
net.onState = (m: ServerMessage) => {
  const now = performance.now();
  race = m.race; raceAt = now; racers = m.racers;
  if (race.map && race.map !== mapKey) setMap(race.map);
  const seen = new Set<string>();
  for (const p of m.racers){
    seen.add(p.id);
    const v = views.get(p.id) ?? addView(p);
    v.pub = p; v.d0 = p.d; v.v0 = p.v; v.t0 = now;
    if (p.plane !== v.plane || p.color !== v.color) rebuild(v);
  }
  for (const v of [...views.values()]) if (!seen.has(v.pub.id)) removeView(v);
  if (m.boards) ui.records(m.boards);
  if (m.live) ui.live(m.live);
  if (m.viewers !== undefined) ui.viewers(m.viewers);
  if (m.settings){ settings = m.settings; syncSettings(); }
  if (race.phase !== lastPhase){ onPhase(race.phase, !!m.hello); lastPhase = race.phase; }
  for (const f of m.fx) onFx(f);
  ui.board(racers, race, focusId);
};

/* --------------------------------------------------------- máy quay */
// Đạo diễn hình như truyền hình đua thật: cắt cảnh 4–8 giây một lần giữa nhiều góc máy, ưu tiên các cặp đang bám sát
// nhau (sắp vượt), thỉnh thoảng mới quay top 1. Có quà / bị tấn công thì cắt sang người đó.
// Đang quay người khác thì góc màn hình có khung nhỏ quay trực tiếp top 1.
type Shot = 'chase' | 'side' | 'front' | 'heli' | 'trackside' | 'low';
const SHOT_NAME: Record<Shot, string> = { chase: 'Bám đuôi', side: 'Ngang sườn', front: 'Chính diện', heli: 'Trực thăng', trackside: 'Ven đường', low: 'Góc thấp' };
let focusId = '', focusUntil = 0;
const dir = { shot: 'chase' as Shot, until: 0, side: 1, fixed: new THREE.Vector3(), cut: true, tag: '' };
function cutTo(id: string, shot: Shot, ms: number, tag = ''){
  focusId = id; dir.shot = shot; dir.until = performance.now() + ms; dir.side = Math.random() < 0.5 ? 1 : -1; dir.cut = true; dir.tag = tag;
  const v = views.get(id);
  // máy quay ven đường: đặt sẵn phía trước, máy bay lao tới rồi vụt qua
  // gần cổng đường tắt (vòm bên phải đường bay) thì quay từ bên trái
  if (v && Math.abs(lapFrac(v.disp, race.lapLen || RACE.lapLen) - mapOf(race.map).shortcut.at - 0.02) < 0.06) dir.side = -1;
  if (v && shot === 'trackside'){
    track.pose((v.disp + 160 + v.v0 * 1.5) / (race.lapLen || RACE.lapLen), pose);
    dir.fixed.copy(pose.p).addScaledVector(pose.r, dir.side * 38).addScaledVector(pose.u, 6);
    dir.fixed.y = Math.max(dir.fixed.y, world.terrain.at(dir.fixed.x, dir.fixed.z) + 6);
  }
}
// Hàng chờ "xem": ai bình luận xem thì máy quay lần lượt soi máy bay của người đó 7 giây (tối đa 8 người chờ)
const watchQ: { id: string; name: string }[] = [];
let watchUntil = 0;
function serveWatch(now: number){
  while (watchQ.length){
    const w = watchQ.shift()!, v = views.get(w.id);
    if (!v || v.pub.fin) continue;
    cutTo(w.id, 'chase', 7000, `👀 Theo yêu cầu: ${w.name}`);
    focusUntil = watchUntil = now + 7000;
    return true;
  }
  return false;
}
const want = (id: string, ms: number) => {
  if (!views.has(id)) return;
  if (performance.now() < watchUntil) return;    // đang soi theo yêu cầu "xem" thì để người đó xem hết lượt
  focusUntil = performance.now() + ms;
  cutTo(id, 'chase', ms, '🎁');                 // dùng quà: luôn quay từ phía sau cho thấy rõ máy bay và hiệu ứng
};
const pickW = <T>(list: [T, number][]) => { let s = 0; for (const [, w] of list) s += w; let r = Math.random() * s; for (const [x, w] of list){ r -= w; if (r <= 0) return x; } return list[0][0]; };
function direct(now: number){
  const racing = race.phase === 'race' || race.phase === 'finish';
  if (!racing){ const lead = race.phase === 'result' ? racers[0] : racers.find(r => !r.fin) ?? racers[0]; focusId = lead?.id ?? ''; dir.shot = 'chase'; dir.tag = ''; return; }
  const cur = views.get(focusId);
  const curOk = !!cur && !cur.pub.fin;                 // đang cất cánh cũng hợp lệ (trước đây cắt cảnh liên tục gây giật)
  // có người bình luận "xem" thì cắt ngang cảnh thường để phục vụ ngay
  // (chỉ chờ khi đang quay người tặng quà, đang soi cho người khác, hoặc 7 giây đầu lúc cất cánh)
  if (watchQ.length && race.raceMs >= 7000 && now >= watchUntil && now >= focusUntil && serveWatch(now)) return;
  if (now < dir.until && (curOk || now < focusUntil)) return;
  // 7 giây đầu: bám mượt người dẫn đầu lúc cất cánh, không cắt cảnh
  if (race.raceMs < 7000 && racers[0]){ focusId = racers[0].id; dir.shot = 'chase'; dir.tag = '🛫 Cất cánh'; dir.until = now + 300; return; }
  const alive = racers.filter(r => !r.fin && views.get(r.id)?.mode === 'fly');
  if (!alive.length){ const l = racers[0]; if (l) cutTo(l.id, 'chase', 4000); return; }
  // các cặp cận chiến: hai máy bay liền hạng, cách nhau dưới 45 m
  const fights: { a: RacerPub; b: RacerPub; gap: number }[] = [];
  for (let i = 1; i < alive.length; i++){ const gap = alive[i - 1].d - alive[i].d; if (gap < 45) fights.push({ a: alive[i - 1], b: alive[i], gap }); }
  const kind = pickW<'fight' | 'leader' | 'pack' | 'any'>([['fight', fights.length ? 5 : 0], ['leader', 1.5], ['pack', 1.5], ['any', 2]]);
  const ms = 4500 + Math.random() * 3500;
  if (kind === 'fight'){
    const f = fights.sort((x, y) => x.b.place - y.b.place)[Math.floor(Math.random() * Math.min(3, fights.length))];
    cutTo(f.b.id, pickW<Shot>([['chase', 3], ['side', 2], ['low', 1.5], ['trackside', 1.5]]), ms, `⚔️ Cận chiến #${f.a.place} – #${f.b.place}`);
  } else if (kind === 'leader') cutTo(alive[0].id, pickW<Shot>([['front', 3], ['side', 2], ['chase', 1], ['trackside', 1.5]]), ms, '🥇 Dẫn đầu');
  else if (kind === 'pack'){ const mid = alive[Math.floor(alive.length / 2)]; cutTo(mid.id, 'heli', ms, '🚁 Toàn cảnh đoàn đua'); }
  else { const r = alive[Math.floor(Math.random() * alive.length)]; cutTo(r.id, pickW<Shot>([['chase', 2], ['side', 2], ['front', 1.5], ['low', 1], ['trackside', 1.5]]), ms); }
}
const camPos = new THREE.Vector3(0, 80, -120), camLook = new THREE.Vector3();
const ray = new THREE.Raycaster();
const camRel = new THREE.Vector3(0, 6, -25), lookRel = new THREE.Vector3(), pipRel = new THREE.Vector3(0, 6, -25), pipLookRel = new THREE.Vector3(), tmp3 = new THREE.Vector3();
let pull = 1;
let occAt = 0;
function blocked(from: THREE.Vector3, to: THREE.Vector3){
  const d = to.clone().sub(from), len = d.length();
  ray.set(from, d.normalize()); ray.far = Math.max(0, len - 8);
  return ray.intersectObjects(world.blockers, true).length > 0;
}
let orbit = 0;
// máy quay khung nhỏ: luôn bám đuôi top 1
const pipCam = new THREE.PerspectiveCamera(55, 16 / 10, 0.5, 9000);
const pipPos = new THREE.Vector3(), pipLook = new THREE.Vector3();

/* ------------------------------------------------- vinh danh vô địch */
let champ: Champion | null = null, champRecord = false;
function showChampion(){
  champ?.dispose(scene); champ = null;
  const p = race.podium[0];
  if (!p) return;
  // sân khấu giữa trời, cạnh đường băng: nền là bầu trời cho máy bay nổi bật
  track.pose(0.06, pose);
  const at = pose.p.clone().addScaledVector(pose.r, -170);
  at.y = Math.max(world.runwayY + 115, world.terrain.at(at.x, at.z) + 75);
  champ = new Champion(scene, at, p, numFor(p.id), fire, smoke);
  document.body.classList.add('champ');
  ui.result(race, { avatar: racers.find(r => r.id === p.id)?.avatar ?? '', record: champRecord });
  sound.fanfare(); setTimeout(() => sound.fanfare(), 900);
}
function hideChampion(){ champ?.dispose(scene); champ = null; document.body.classList.remove('champ'); ui.result(null); champRecord = false; }

/* ---------------------------------------------------------- sự kiện */
let countN = -1;
function onPhase(p: string, hello: boolean){
  if (p === 'lobby'){ hideChampion(); if (!hello) ui.center(`${mapOf(race.map).icon} ${mapOf(race.map).name.toUpperCase()}\nGÕ 1 ĐỂ VÀO ĐUA`, 'info', 3200); }
  if (p === 'result') showChampion();
  if (p === 'race' && !hello){ ui.center('CẤT CÁNH!', 'go', 1200); sound.beep(true); }
  countN = -1;
}
const posOf = (id: string | undefined) => () => { const v = id ? views.get(id) : undefined; return v ? v.pos.clone() : null; };
const bigTxt = (s: string) => s.toUpperCase();
const man = (v: View | undefined, m: Maneuver, chance = 1) => { if (v && Math.random() < chance && v.mode === 'fly') v.rig.maneuver(m); };
function onFx(f: Fx){
  const v = 'id' in f ? views.get(f.id) : undefined;
  switch (f.k){
    case 'join': ui.feed(`✈️ ${f.name} vào đua · ${planeName(f.plane)}${f.late ? ' (vào giữa chừng)' : ''}`, 'join'); break;
    case 'plane': if (f.plane !== 'golden') ui.feed(`🔧 ${f.name} đổi sang ${planeName(f.plane)}`, 'join'); break;
    case 'gift': {
      ui.pop(f); sound.coin(f.xu >= 99);
      const s = skillOf(f.skill);
      ui.feed(`🎁 ${f.name} tặng ${f.count > 1 ? f.count + 'x ' : ''}${f.gift} → ${s.icon} ${s.name}${f.banked ? ' (bung khi xuất phát)' : ''}`, 'gift');
      if (!f.banked && f.xu >= 5) want(f.id, f.xu >= 99 ? 9000 : 6000);
      break;
    }
    case 'skill': {
      const n = f.n && f.n > 1 ? ` x${f.n}` : '';
      if (!v) break;
      switch (f.skill){
        case 'boost': sound.boost(); puff(v, 6); ui.feed(`💨 ${f.name} tăng tốc nhẹ${n}`, 'skill'); break;
        case 'engine': sound.boost(); puff(v, 14); skills.ring(v.pos, v.fwd, 0xffffff, 5, 0.5, 2); ui.feed(`⚙️ ${f.name} TĂNG TỐC ĐỘNG CƠ${n}!`, 'skill'); break;
        case 'nitro': sound.nitro(); skills.ring(v.pos, v.fwd, 0x4fb4ff, 7, 0.6, 2.2); man(v, 'barrel', 0.5); shake = Math.max(shake, 0.3); ui.feed(`🔥 ${f.name} BOOST${n}!`, 'skill'); break;
        case 'rocket': sound.launch(); sound.nitro(); skills.ring(v.pos, v.fwd, 0xff8a2a, 9, 0.7, 2.5); ui.feed(`🚀 ${f.name} gắn TÊN LỬA TĂNG TỐC!`, 'skill'); ui.center('🚀 TÊN LỬA TĂNG TỐC', 'go', 1300); want(f.id, 4000); break;
        case 'super': sound.nitro(); skills.ring(v.pos, v.fwd, 0xffe066, 10, 0.8, 3); man(v, 'barrel'); ui.feed(`🌟 ${f.name} SIÊU BOOST!`, 'big'); ui.center(`🌟 SIÊU BOOST\n${f.name}`, 'big', 1800); want(f.id, 7000); break;
        case 'jet': sound.fanfare(); sound.nitro(); skills.ring(v.pos, v.fwd, 0x5fc8ff, 12, 0.9, 3); man(v, 'roll'); ui.feed(`🛩️ ${f.name} bật CHẾ ĐỘ PHẢN LỰC!`, 'big'); ui.center(`🛩️ CHẾ ĐỘ PHẢN LỰC\n${f.name}`, 'big', 2400); want(f.id, 10_000); break;
        case 'vip':
          sound.fanfare(); ui.feed(`👑 ${f.name} triệu hồi MÁY BAY VIP!`, 'big'); ui.center(`👑 MÁY BAY VIP MẠ VÀNG\n${f.name}`, 'big', 3000); want(f.id, 12_000);
          setTimeout(() => { const w = views.get(f.id); man(w, 'loop'); if (w) for (let i = 0; i < 5; i++) setTimeout(() => fire.burst(w.pos, [0xffd23a, 0xfff1b8, 0xffffff], 50, 30, 2, 1.2, { grav: 6 }), i * 200); }, 400);
          break;
        case 'missile':
          sound.launch();
          if (f.target){ skills.missile(v.pos.clone().addScaledVector(v.up, -1.5), posOf(f.target), FX_MS.missileFlight); ui.feed(`🎯 ${f.name} bắn TÊN LỬA vào ${f.targetName}!`, 'atk'); want(f.target, 3500); }
          break;
        case 'thunder': ui.feed(`⚡ ${f.name} gọi SÉT đánh Top 3!`, 'atk'); ui.center('⚡ SÉT ĐÁNH TOP 3', 'atk', 1500); break;
        case 'bomb': if (f.target){ skills.bomb(posOf(f.target), FX_MS.bombFall); ui.feed(`💣 ${f.name} ném BOM TẤN vào ${f.targetName}!`, 'atk'); ui.center(`💣 BOM VÀO ${bigTxt(f.targetName ?? '')}`, 'atk', 1800); want(f.target, 4000); } break;
        case 'meteor': {
          ui.feed(`☄️ ${f.name} gọi MƯA THIÊN THẠCH!`, 'big'); ui.center(`☄️ MƯA THIÊN THẠCH\n${f.name}`, 'big', 2800); want(f.id, 9000);
          const list = [...views.values()].filter(x => x !== v);
          for (let i = 0; i < 22; i++) setTimeout(() => { const t = list[Math.floor(Math.random() * list.length)]; if (t){ const p = t.pos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 60, -10 - Math.random() * 30, (Math.random() - 0.5) * 60)); skills.meteor(() => p, 900); } }, i * 110);
          break;
        }
      }
      break;
    }
    case 'hit': {
      if (!v) break;
      if (f.blocked){ skills.ring(v.pos, null, 0x9ff3ff, 7, 0.5, 2.5); sound.shield(); ui.feed(`🛡️ ${f.name} chặn được ${skillOf(f.skill).name.toLowerCase()} của ${f.byName}`, 'skill'); break; }
      if (f.skill === 'thunder'){ skills.bolt(v.pos); sound.zap(); }
      if (f.skill === 'meteor') skills.meteor(posOf(f.id), 500);
      if (f.skill === 'missile') fire.burst(v.pos, [0xffffff, 0xffd36a], 20, 25, 1.4, 0.5);
      man(v, 'crash');
      break;
    }
    case 'event':
      if (!v) break;
      if (f.ev === 'pad'){ fire.burst(v.pos, [0xb8ff3a, 0xffffff], 18, 18, 1.2, 0.5); if (f.id === focusId) sound.boost(); }
      else if (f.ev === 'obstacle'){ skills.boom(v.pos.clone().addScaledVector(v.right, 3), false); man(v, 'crash'); ui.feed(`💥 ${f.name} va phải bãi mìn!`, 'atk'); }
      else if (v.pub.bot) break;               // bot đi đường tắt: không lên bảng tin cho đỡ rối
      else if (f.ev === 'shortcut'){ ui.feed(`⚠️ ${f.name} liều bay đường tắt!`, 'skill'); if (!v.pub.bot) want(f.id, 3500); }
      else if (f.ev === 'shortcrash'){ skills.boom(v.pos, false); man(v, 'crash'); ui.feed(`💥 ${f.name} đâm vào vách đường tắt!`, 'atk'); }
      else if (f.ev === 'shortok'){ ui.feed(`✅ ${f.name} đi tắt thành công, vượt lên!`, 'big'); man(v, 'roll'); }
      break;
    case 'like': if (v) fire.burst(v.pos, [0xff4f8a, 0xff9ac0], 10, 8, 1.6, 0.8); break;
    case 'watch':
      if (!watchQ.some(w => w.id === f.id) && watchQ.length < 8) watchQ.push({ id: f.id, name: f.name });
      ui.feed(`👀 ${f.name} muốn xem máy bay của mình${watchQ.length > 1 ? ` (chờ lượt ${watchQ.length})` : ''}`, 'join');
      break;
    case 'lap':
      if (f.lap === race.laps - 1 && racers.find(r => !r.fin)?.id === f.id) ui.center('🔔 VÒNG CUỐI!', 'info', 1800);
      ui.feed(`🔁 ${f.name} vào vòng ${f.lap + 1}/${race.laps}`);
      if (f.id === focusId) sound.lap();
      break;
    case 'lead': ui.feed(`👑 ${f.name} vươn lên DẪN ĐẦU!`, 'big'); break;
    case 'finish':
      ui.feed(`🏁 ${f.name} về đích hạng ${f.place} · ${(f.ms / 1000).toFixed(1)}s${f.record ? ' · KỶ LỤC!' : ''}`, f.place <= 3 ? 'big' : '');
      if (f.place === 1){
        champRecord = f.record;
        ui.center(`🏆 ${bigTxt(f.name)}\nVỀ NHẤT!`, 'big', 3200); sound.fanfare(); want(f.id, 7000);
        if (v){ v.rig.maneuver('victory'); for (let i = 0; i < 6; i++) setTimeout(() => fire.burst(v.pos.clone().add(new THREE.Vector3(0, 10, 0)), [0xffd23a, 0xff4fd8, 0x37e6ff, 0xffffff], 70, 50, 2, 1.4, { grav: 12 }), i * 250); }
      } else if (f.place <= 3 && v) v.rig.maneuver('roll');
      break;
    case 'voice': sound.voice(f.url); ui.caption(f.text); break;
    case 'note': ui.feed(f.text); break;
    case 'phase': break;
  }
}
// khói trắng phụt ra từ động cơ khi tăng tốc
const tmpA = new THREE.Vector3(), tmpB = new THREE.Vector3();
function puff(v: View, n: number){
  v.rig.root.updateMatrixWorld();
  for (const e of v.rig.exhaust.slice(0, 2)){
    tmpA.copy(e.pos).applyMatrix4(v.rig.body.matrixWorld);
    for (let i = 0; i < n; i++) smoke.emit(tmpA, tmpB.copy(v.fwd).multiplyScalar(-8 - Math.random() * 8).add(new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4)), 0xf2f2f2, 2.5, 1.6, { grow: 7, drag: 1.4, alpha: 0.55 });
  }
}

/* --------------------------------------------------------- vòng vẽ */
const pose = Track.pose(), mtx = new THREE.Matrix4(), tmp = new THREE.Vector3(), tmp2 = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
const trailCol = new THREE.Color(), gold = new THREE.Color(0xffd23a);
const smooth = (a: number, b: number, x: number) => { const k = Math.max(0, Math.min(1, (x - a) / (b - a))); return k * k * (3 - 2 * k); };
let last = performance.now(), fpsAcc = 0, fpsN = 0;
function frame(){
  requestAnimationFrame(frame);
  const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now;
  const elapsed = now - raceAt, racing = race.phase === 'race' || race.phase === 'finish' || race.phase === 'result';
  const t = now / 1000;
  world.update(dt, t, camera);
  direct(now);
  if (race.phase === 'countdown'){
    const n = Math.ceil(Math.max(0, race.leftMs - elapsed) / 1000);
    if (n !== countN && n >= 1 && n <= 3){ countN = n; ui.center(String(n), 'count', 900); sound.beep(); }
  }
  const lapLen = race.lapLen || RACE.lapLen, total = race.laps * lapLen, grid = race.phase === 'lobby' || race.phase === 'countdown';
  let fv: View | undefined;
  for (const v of views.values()){
    const p = v.pub;
    const target = v.d0 + (racing ? v.v0 * (now - v.t0) / 1000 : 0);
    const gap = target - v.disp;
    if (Math.abs(gap) > 600 && now > v.warpUntil) v.disp = target;
    else v.disp += gap * Math.min(1, dt * (now < v.warpUntil ? 5 : 3.5));
    track.pose(v.disp / lapLen, pose);
    // làn bay: xếp hàng trên đường băng lúc chờ; lúc đua lượn nhẹ; đi đường tắt thì lách sang vòm bên phải
    const short = (p.f & F.SHORT) !== 0;
    const tx = grid ? (p.lane - (RACE.gridCols - 1) / 2) * RACE.gridLane : short ? 34 : (p.lane - 3.5) * 3.6 + Math.sin(t * 0.31 + v.seed) * 7;
    const ty = grid ? 0 : short ? -6 : Math.sin(t * 0.23 + v.seed * 1.7) * 5;
    const k = Math.min(1, dt * (short ? 1.6 : 0.9)), dlx = (tx - v.lx) * k;
    v.lx += dlx; v.ly += (ty - v.ly) * k;
    // cất cánh: vòng đầu lăn trên đường băng rồi rời đất; về đích: hạ cánh, lăn bánh, dừng
    const groundY = world.runwayY + v.rig.gearH;
    let air = 1, mode: 'grid' | 'takeoff' | 'fly' | 'landing' | 'parked' = 'fly';
    if (grid){ air = 0; mode = 'grid'; }
    else if (p.fin || v.disp >= total){ const past = v.disp - total; air = 1 - smooth(0, RACE.landM * 0.62, past); mode = air > 0.02 ? 'landing' : v.v0 < 2 ? 'parked' : 'landing'; }
    else if (v.disp < RACE.takeoffM && p.lap === 0){ air = smooth(70, RACE.takeoffM, v.disp); mode = air > 0.98 ? 'fly' : 'takeoff'; }
    v.mode = mode;
    v.pos.copy(pose.p).addScaledVector(pose.r, v.lx).addScaledVector(pose.u, v.ly * air);
    v.pos.y = groundY + (v.pos.y - groundY) * air;
    if (air < 1) v.pos.y = Math.max(v.pos.y, groundY);
    // hướng mũi theo đúng hướng di chuyển (tự ngóc mũi khi leo, chúc mũi khi hạ)
    if (v.prev.y > -900){
      tmp.copy(v.pos).sub(v.prev);
      if (tmp.lengthSq() > 1e-4){ tmp.normalize(); if (air < 0.05) tmp.y = 0; v.fwd.lerp(tmp, Math.min(1, dt * 9)).normalize(); }
    } else v.fwd.copy(pose.t);
    if (grid || mode === 'parked') v.fwd.copy(pose.t).setY(0).normalize();
    v.prev.copy(v.pos);
    v.right.crossVectors(v.fwd, Y).normalize(); v.up.crossVectors(v.right, v.fwd).normalize();
    v.rig.root.position.copy(v.pos);
    tmp.crossVectors(v.up, v.fwd);
    mtx.makeBasis(tmp, v.up, v.fwd); v.rig.root.quaternion.setFromRotationMatrix(mtx);
    // nghiêng cánh khi vào cua và khi lượn ngang
    const wantRoll = air > 0.3 ? Math.max(-1.1, Math.min(1.1, pose.turn * 110 - dlx / Math.max(dt, 1e-3) * 0.05)) : 0;
    v.rollA += (wantRoll - v.rollA) * Math.min(1, dt * 3);
    v.rig.root.rotateZ(v.rollA);
    const climb = THREE.MathUtils.clamp(v.fwd.y * 4, -1, 1);
    v.rig.update({ dt, t, speed: v.v0, throttle: grid ? 0.08 : mode === 'parked' ? 0.05 : 1, roll: v.rollA / 1.1, pitch: climb, yaw: THREE.MathUtils.clamp(dlx * 3, -1, 1),
      gear: mode === 'grid' || mode === 'parked' || (mode === 'takeoff' && air < 0.45) || (mode === 'landing' && air < 0.75) ? 1 : 0, ground: air < 0.02, mode, flags: p.f });
    // máy bay nhào lộn thỉnh thoảng biểu diễn
    if (p.plane === 'stunt' && mode === 'fly' && now > v.stuntAt){ v.rig.maneuver(Math.random() < 0.5 ? 'barrel' : 'roll'); v.stuntAt = now + 9000 + Math.random() * 12_000; }
    // máy bay VIP: phi đội hộ tống
    const esc = (p.f & F.ESCORT) !== 0;
    if (esc && !v.escorts.length) v.escorts = escortsFor(v);
    if (!esc && v.escorts.length){ for (const e of v.escorts) e.dispose(); v.escorts = []; }
    for (const e of v.escorts) e.update({ dt, t, speed: v.v0, throttle: 1, roll: 0, pitch: 0, yaw: 0, gear: 0, ground: false, mode: 'fly', flags: F.SUPER });
    // vượt người khác: vệt sáng vàng
    if (racing && p.place < v.lastPlace && !p.fin && mode === 'fly'){ v.gold = 1.4; if (v.pub.id === focusId){ ui.toast('⚡ VƯỢT!'); fire.burst(v.pos, [0xffd23a, 0xffffff], 24, 20, 1.4, 0.6); } }
    v.lastPlace = p.place; v.gold = Math.max(0, v.gold - dt);
    // tăng tốc vừa bật: phụt khói trắng
    if ((p.f & (F.BOOST | F.ENGINE)) && !(v.lastF & (F.BOOST | F.ENGINE))) puff(v, 10);
    v.lastF = p.f;
    // qua checkpoint: vòng loé sáng
    const frac = lapFrac(v.disp, lapLen);
    if (racing && mode === 'fly' && v.pos.distanceToSquared(camera.position) < 700 * 700) for (let i = 0; i < world.rings.length; i++){
      const u = world.rings[i].u;
      if (v.frac < u && frac >= u && frac - v.frac < 0.05){ world.flashRing(i); if (v.pub.id === focusId){ sound.lap(); fire.burst(v.pos, [world.rings[i].base.getHex(), 0xffffff], 30, 26, 1.3, 0.6); } }
    }
    v.frac = frac;
    trailsUpdate(v, dt, mode === 'fly' || mode === 'landing' || mode === 'takeoff');
    if ((p.f & F.STUN) && Math.random() < dt * 30){ smoke.emit(v.pos, tmp.set((Math.random() - 0.5) * 4, 3, (Math.random() - 0.5) * 4), 0x2f2f2f, 4, 1.4, { grow: 6, alpha: 0.7 }); fire.emit(v.pos, tmp.set((Math.random() - 0.5) * 10, Math.random() * 6, (Math.random() - 0.5) * 10), 0xffc04a, 1.4, 0.4); }
    if ((p.f & F.SLOW) && Math.random() < dt * 10) smoke.emit(v.pos, tmp.set(0, 1, 0), 0x6a6a7a, 3, 1, { grow: 3, alpha: 0.5 });
    if ((p.f & F.SUPER) && Math.random() < dt * 40) fire.emit(v.pos.clone().addScaledVector(v.fwd, -v.rig.size * 0.5), tmp.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8), trailCol.setHSL((t * 0.5) % 1, 1, 0.6), 1.6, 0.7);
    if (v.pub.id === focusId) fv = v;
  }
  if (champ) champ.update(dt, camera);
  bloom.strength += ((champ ? 0.6 : 0.55) - bloom.strength) * Math.min(1, dt * 2);
  cameraUpdate(fv, dt, t);
  fire.update(dt); smoke.update(dt); skills.update(dt);
  clearView(camera, focusId);
  composer.render();
  renderPip(dt);
  labelsUpdate();
  speedLines(fv, dt);
  flash = Math.max(0, flash - dt * 2); $('flash').style.opacity = String(flash);
  const kmh = fv ? Math.max(0, fv.v0) * 3.6 * (track.length / lapLen) * 1.9 : 0;   // ×1.9 cho cảm giác máy bay
  ui.cam(race.phase === 'race' || race.phase === 'finish' ? fv?.pub : undefined, kmh, dir.tag || (fv ? SHOT_NAME[dir.shot] : ''));
  sound.engineAt(fv ? fv.v0 : 0, racing);
  ui.status(race, racers, elapsed);
  // nhạc nền theo giai đoạn: chuẩn bị → đang đua → chặng cuối (dẫn đầu qua 85% đường) → vinh danh
  const leadD = (racers.find(r => !r.fin) ?? racers[0])?.d ?? 0;
  const scene: MusicScene = race.phase === 'result' ? 'result' : race.phase === 'race' || race.phase === 'finish' ? (leadD >= total * 0.85 ? 'final' : 'race') : 'lobby';
  sound.setScene(scene);
  minimap.draw([...views.values()].map(v => ({ x: v.pos.x, z: v.pos.z, color: v.pub.color, place: v.pub.place, focus: v.pub.id === focusId })));
  // máy yếu thì tự hạ độ nét
  fpsAcc += dt; fpsN++;
  if (fpsAcc > 3){ const fps = fpsN / fpsAcc; fpsAcc = 0; fpsN = 0; if (fps < 38 && quality > 1){ quality = Math.max(1, quality - 0.5); resize(); } }
}

// Máy bay khác lọt sát ống kính thì tạm ẩn (như truyền hình đua cắt vật chắn), để không che kín màn hình
function clearView(cam: THREE.Camera, keep: string){
  for (const v of views.values()){
    if (v.pub.id === keep){ v.rig.root.visible = true; continue; }
    const near = Math.max(18, v.rig.size * 1.8);
    const hide = v.pos.distanceToSquared(cam.position) < near * near;
    v.rig.root.visible = !hide;
    for (const t of v.trails) if (hide) t.mesh.visible = false;
  }
}

// Khung nhỏ quay trực tiếp top 1 khi máy quay chính đang quay người khác
function renderPip(dt: number){
  const box = $('pip'), racingNow = race.phase === 'race' || race.phase === 'finish';
  const leadPub = racers.find(r => !r.fin) ?? racers[0], lead = leadPub ? views.get(leadPub.id) : undefined;
  const show = !champ && racingNow && !!lead && lead.pub.id !== focusId && lead.mode === 'fly';
  box.hidden = !show;
  if (!show || !lead) return;
  ui.pip(lead.pub);
  const sz = Math.max(0.8, lead.rig.size / 13);
  const dp = lead.pos.clone().addScaledVector(lead.fwd, -20 * sz).addScaledVector(lead.up, 6 * sz), dl = lead.pos.clone().addScaledVector(lead.fwd, 25);
  // như máy quay chính: làm mượt vị trí tương đối với thân máy bay top 1
  const lb = lead.rig.body.getWorldPosition(tmp3), wr = dp.sub(lead.pos), wl = dl.sub(lead.pos);
  if (pipRel.distanceTo(wr) > 300){ pipRel.copy(wr); pipLookRel.copy(wl); }
  pipRel.lerp(wr, 1 - Math.exp(-dt * 5)); pipLookRel.lerp(wl, 1 - Math.exp(-dt * 7));
  pipPos.copy(lb).add(pipRel); pipLook.copy(lb).add(pipLookRel);
  pipCam.position.copy(pipPos); pipCam.lookAt(pipLook);
  // vị trí khung trên canvas (tính cả phóng to giao diện), vẽ cảnh lần hai chỉ trong ô đó
  const r = (box.querySelector('.pv') as HTMLElement).getBoundingClientRect();
  const x = r.left, y = innerHeight - r.bottom, w = r.width, h = r.height;
  if (w < 4 || h < 4) return;
  pipCam.aspect = w / h; pipCam.updateProjectionMatrix();
  renderer.setScissorTest(true); renderer.setScissor(x, y, w, h); renderer.setViewport(x, y, w, h);
  const ac = renderer.autoClear; renderer.autoClear = true;
  clearView(pipCam, lead.pub.id); world.follow(pipCam);
  renderer.render(scene, pipCam);
  clearView(camera, focusId); world.follow(camera);
  renderer.autoClear = ac;
  renderer.setScissorTest(false); renderer.setViewport(0, 0, innerWidth, innerHeight);
}

// Vệt khói trắng đầu cánh và luồng phản lực sau động cơ; tăng tốc thì đổi màu, đậm hơn. Máy bay ở xa thì tắt cho nhẹ.
function trailsUpdate(v: View, dt: number, flying: boolean){
  // chỉ 12 chiếc gần máy quay nhất mới kéo vệt khói (đông người vẫn mượt)
  const far = v.rank >= 12 || v.pos.distanceToSquared(camera.position) > 450 * 450, f = v.pub.f;
  const boostLv = f & (F.SUPER | F.JET) ? 3 : f & (F.NITRO | F.ROCKET) ? 2 : f & (F.BOOST | F.ENGINE) ? 1 : 0;
  v.rig.body.updateMatrixWorld();
  v.trails.forEach((tr, i) => {
    const wing = i < 2, ex = v.rig.exhaust[i === 2 ? 0 : v.rig.exhaust.length - 1];
    const on = flying && !far && (wing || (!!ex && (ex.kind !== 'prop' || boostLv > 0)));
    tr.mesh.visible = on;
    if (!on){ tr.reset(); return; }
    if (v.gold > 0) trailCol.copy(gold);
    else if (boostLv === 3) trailCol.setHSL((performance.now() / 2000 + i * 0.1) % 1, 1, 0.65);
    else if (boostLv === 2) trailCol.setHex(wing ? 0xbfe6ff : 0x5fb8ff);
    else trailCol.setHex(0xffffff);
    tr.color.copy(trailCol);
    if (wing){
      tr.width = v.gold > 0 || boostLv >= 2 ? 0.55 : 0.18;
      tr.opacity = v.gold > 0 ? 0.9 : boostLv >= 2 ? 0.75 : 0.12 + Math.min(0.35, Math.abs(v.rollA) * 0.4);
      tmp2.copy(v.rig.tips[i]).applyMatrix4(v.rig.body.matrixWorld);
    } else {
      tr.width = ex.r * (boostLv >= 2 ? 1.6 : 1.0);
      tr.opacity = boostLv >= 2 ? 0.7 : boostLv === 1 ? 0.35 : 0.14;
      tmp2.copy(ex.pos).applyMatrix4(v.rig.body.matrixWorld);
    }
    tr.push(tmp2, tmp.copy(v.up), dt);
  });
}

// Máy quay: chờ xuất phát thì lượn quanh hàng máy bay trên đường băng; đang đua thì bám đuôi máy bay được quay
function cameraUpdate(fv: View | undefined, dt: number, t: number){
  const lv = fv ? (fv.pub.f & (F.SUPER | F.JET | F.ROCKET) ? 3 : fv.pub.f & F.NITRO ? 2 : fv.pub.f & (F.BOOST | F.ENGINE) ? 1 : 0) : 0;
  const fov = [62, 68, 74, 80][lv];
  camera.fov += (fov - camera.fov) * Math.min(1, dt * 2); camera.updateProjectionMatrix();
  if (champ){
    // máy quay lao tới sân khấu rồi lượn vòng quanh nhà vô địch
    const dp = new THREE.Vector3(), dl = new THREE.Vector3(); champ.camera(dp, dl);
    // khung đầu cắt thẳng tới sân khấu, sau đó bám mượt
    if (champ.age < 0.05){ camPos.copy(dp); camLook.copy(dl); }
    else { const k = 1 - Math.exp(-dt * 6); camPos.lerp(dp, k); camLook.lerp(dl, k); }
  } else if (race.phase === 'lobby'){
    orbit += dt * 0.12;
    const rows = Math.ceil(views.size / RACE.gridCols);
    track.pose(-(rows * RACE.gridGap / 2 + 6) / RACE.lapLen, pose);
    const c = pose.p.clone().setY(world.runwayY + 3);
    const a = Math.sin(orbit) * 1.1, R = 60 + rows * 6;
    const dp = c.clone().addScaledVector(pose.t, -Math.cos(a) * R).addScaledVector(pose.r, Math.sin(a) * R).setY(world.runwayY + 16 + Math.sin(orbit * 0.7) * 5);
    camPos.lerp(dp, 1 - Math.exp(-dt * 1.5)); camLook.lerp(c, 1 - Math.exp(-dt * 2));
  } else if (fv){
    let crowd = 0;
    for (const o of views.values()) if (o !== fv && o.pos.distanceToSquared(fv.pos) < 70 * 70) crowd++;
    pull += ((1 + Math.min(crowd, 16) * 0.07) - pull) * Math.min(1, dt * 1.5);     // đông thì lùi xa tới 2,1 lần
    const sz = Math.max(0.6, fv.rig.size / 13) * pull, s = dir.side;
    // máy bay đang tăng tốc (dùng quà) thì chuyển êm về góc bám đuôi, không quay ngang / chính diện / ven đường
    if (lv > 0 && dir.shot !== 'chase' && dir.shot !== 'heli'){ dir.shot = 'chase'; dir.tag = '🎁'; }
    const dp = new THREE.Vector3(), dl = new THREE.Vector3();
    let zoom = 0, follow = 4;
    const shot: Shot = race.phase === 'countdown' ? 'chase' : dir.shot;
    switch (shot){
      case 'chase': {
        // đang tăng tốc thì nâng máy quay lên nhìn qua phía trên luồng lửa phản lực
        const back = (race.phase === 'countdown' ? 42 : 22 + lv * 2) * sz, high = (race.phase === 'countdown' ? 10 : 5 + lv * 2.2) * sz;
        dp.copy(fv.pos).addScaledVector(fv.fwd, -back).addScaledVector(fv.up, high).addScaledVector(fv.right, Math.sin(t * 0.2) * 4);
        dl.copy(fv.pos).addScaledVector(fv.fwd, 30).addScaledVector(fv.up, 3);
        break;
      }
      case 'side':      // song song bên sườn, đứng ngoài mép đoàn đua (cách tim đường bay 48 m), tiêu cự hẹp
        dp.copy(fv.pos).addScaledVector(fv.right, s * Math.max(26 * sz, 48 - s * fv.lx)).addScaledVector(fv.fwd, 6 * sz).addScaledVector(fv.up, 4 * sz);
        dl.copy(fv.pos).addScaledVector(fv.fwd, -4 * sz); zoom = -16; break;
      case 'front':     // chạy trước mũi, lệch ra ngoài đoàn, quay ngược lại: máy bay lao thẳng vào ống kính
        dp.copy(fv.pos).addScaledVector(fv.fwd, 46 * sz).addScaledVector(fv.up, 6 * sz).addScaledVector(fv.right, s * Math.max(8 * sz, 30 - s * fv.lx));
        dl.copy(fv.pos).addScaledVector(fv.fwd, -10 * sz); zoom = -14; break;
      case 'heli':      // trên cao phía sau: thấy cả đoàn đua
        dp.copy(fv.pos).addScaledVector(fv.fwd, -60).addScaledVector(fv.up, 55).addScaledVector(fv.right, s * 25);
        dl.copy(fv.pos).addScaledVector(fv.fwd, 25); follow = 2.5; zoom = 4; break;
      case 'low':       // góc thấp dưới bụng, hất lên cho kịch tính
        dp.copy(fv.pos).addScaledVector(fv.fwd, -15 * sz).addScaledVector(fv.up, -3.5 * sz).addScaledVector(fv.right, s * 6 * sz);
        dl.copy(fv.pos).addScaledVector(fv.fwd, 20).addScaledVector(fv.up, 4); zoom = 6; break;
      case 'trackside': {   // máy quay đứng yên ven đường, xoay theo và thu phóng khi máy bay vụt qua
        dp.copy(dir.fixed); dl.copy(fv.pos);
        const d = dir.fixed.distanceTo(fv.pos);
        zoom = THREE.MathUtils.clamp(d / 6, 0, 30) * -1 + 10;
        follow = 30;
        // vụt qua quá xa thì cắt sang góc khác
        if (d > 260 && fv.pos.clone().sub(dir.fixed).dot(fv.fwd) > 0) dir.until = 0;
        break;
      }
    }
    // không để máy quay chui xuống đất
    dp.y = Math.max(dp.y, world.terrain.at(dp.x, dp.z) + 4, world.runwayY + 3);
    // có vật to chắn giữa máy quay và máy bay thì cắt về góc bám đuôi
    if (shot !== 'chase' && t > occAt){ occAt = t + 0.25; if (blocked(dp, fv.pos)){ dir.shot = 'chase'; dir.cut = true; dir.tag = ''; } }
    // Làm mượt vị trí TƯƠNG ĐỐI so với máy bay (không phải vị trí tuyệt đối): bay 1000 km/h máy bay vẫn nằm giữa khung.
    // Điểm nhìn bám thân máy bay thật, kể cả khi đang nhào vòng, xoay thùng.
    const body = fv.rig.body.getWorldPosition(tmp3);
    dl.add(body).sub(fv.pos);
    if (shot === 'trackside'){
      if (dir.cut){ camPos.copy(dp); camLook.copy(dl); dir.cut = false; }
      camPos.lerp(dp, 1 - Math.exp(-dt * follow)); camLook.lerp(dl, 1 - Math.exp(-dt * 12));
      camRel.copy(camPos).sub(body); lookRel.copy(camLook).sub(body);
    } else {
      const wantRel = dp.sub(body), wantLook = dl.sub(body);
      if (dir.cut || camRel.distanceTo(wantRel) > 500){ camRel.copy(wantRel); lookRel.copy(wantLook); dir.cut = false; }   // cắt cảnh: nhảy thẳng sang góc mới
      camRel.lerp(wantRel, 1 - Math.exp(-dt * follow)); lookRel.lerp(wantLook, 1 - Math.exp(-dt * 6));
      camPos.copy(body).add(camRel); camLook.copy(body).add(lookRel);
      camPos.y = Math.max(camPos.y, world.terrain.at(camPos.x, camPos.z) + 4, world.runwayY + 3);
    }
    camera.fov += (zoom + (pull - 1) * 14) * Math.min(1, dt * 2);   // đông thì mở góc rộng thấy cả cụm
    camera.fov = THREE.MathUtils.clamp(camera.fov, 32, 85); camera.updateProjectionMatrix();
  }
  camera.position.copy(camPos);
  // rung nhẹ khi tăng tốc, rung mạnh khi có vụ nổ gần
  const s = shake + lv * 0.12;
  if (s > 0) camera.position.add(tmp.set((Math.random() - 0.5) * s, (Math.random() - 0.5) * s, (Math.random() - 0.5) * s));
  shake = Math.max(0, shake - dt * 2);
  camera.up.set(0, 1, 0); camera.lookAt(camLook);
  if (fv && !champ && (dir.shot === 'chase' || race.phase === 'countdown')) camera.rotateZ(-fv.rollA * 0.18);
  // motion blur theo tốc độ
  blur.uniforms.strength.value += ([0, 0.015, 0.03, 0.045][lv] - blur.uniforms.strength.value) * Math.min(1, dt * 3);
  // bóng đổ đi theo vùng máy quay đang nhìn
  const focus = champ ? champ.center : fv ? fv.pos : camLook;
  sun.target.position.copy(focus); sun.position.copy(focus).addScaledVector(world.sunDir, 600); sun.target.updateMatrixWorld();
}

// Bảng tên trên đầu máy bay: tối đa 14 chiếc gần máy quay nhất
const proj = new THREE.Vector3();
function labelsUpdate(){
  const list = [...views.values()].map(v => ({ v, d: v.pos.distanceToSquared(camera.position) })).sort((a, b) => a.d - b.d);
  list.forEach(({ v, d }, i) => {
    v.rank = i;
    proj.copy(v.pos).addScaledVector(v.up, v.rig.size * 0.32).project(camera);
    const show = v.rig.root.visible && i < 14 && proj.z < 1 && d < 700 * 700 && Math.abs(proj.x) < 1.1 && Math.abs(proj.y) < 1.1;
    v.label.style.display = show ? '' : 'none';
    if (!show) return;
    const p = v.pub, key = `${p.place}|${p.name}|${p.f & F.SHIELD}|${p.id === focusId}|${p.plane}`;
    if (v.label.dataset.k !== key){
      v.label.dataset.k = key;
      v.label.className = 'tag' + (p.place <= 3 ? ' p' + p.place : '') + (p.id === focusId ? ' focus' : '') + (p.bot ? ' bot' : '') + (p.plane === 'golden' ? ' vip' : '');
      v.label.replaceChildren(el('b', '', `#${p.place}`), el('span', '', (p.plane === 'golden' ? '👑 ' : '') + p.name), ...(p.f & F.SHIELD ? [el('i', '', '🛡️')] : []));
    }
    const x = (proj.x * 0.5 + 0.5) * view.w, y = (-proj.y * 0.5 + 0.5) * view.h;
    v.label.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%) scale(${Math.max(0.65, Math.min(1.1, 160 / Math.sqrt(d))).toFixed(2)})`;
  });
}

// Vệt gió tỏa ra từ giữa màn hình khi máy bay đang quay tăng tốc
let streakA = 0;
function speedLines(fv: View | undefined, dt: number){
  const f = fv?.pub.f ?? 0;
  const wantA = f & (F.SUPER | F.JET | F.ROCKET) ? 1 : f & F.NITRO ? 0.75 : f & F.ENGINE ? 0.45 : f & F.BOOST ? 0.3 : 0;
  streakA += (wantA - streakA) * Math.min(1, dt * 4);
  const c = speedCtx, w = speedCv.width, h = speedCv.height;
  c.clearRect(0, 0, w, h);
  if (streakA < 0.02) return;
  const cx = w / 2, cy = h * 0.47, R = Math.hypot(w, h) / 2;
  c.strokeStyle = `rgba(255,255,255,${(0.3 * streakA).toFixed(3)})`; c.lineCap = 'round';
  for (let i = 0; i < 46; i++){
    const a = Math.random() * Math.PI * 2, r0 = R * (0.4 + Math.random() * 0.4), r1 = r0 + R * (0.15 + Math.random() * 0.3) * streakA;
    c.lineWidth = 1 + Math.random() * 2.5;
    c.beginPath(); c.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); c.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); c.stroke();
  }
}

/* ------------------------------------------------------- âm thanh */
const unlock = () => { sound.unlock(); $('unlock').hidden = true; };
addEventListener('pointerdown', unlock); addEventListener('keydown', unlock);
setTimeout(() => { sound.unlock(); if (!sound.ready) $('unlock').hidden = false; }, 300);   // cửa sổ LIVE mở bằng cờ tự phát tiếng
$('soundBtn').onclick = e => { e.stopPropagation(); unlock(); sound.setMuted(!sound.muted); $('soundBtn').textContent = sound.muted ? '🔇' : '🔈'; };
$('musicBtn').onclick = e => { e.stopPropagation(); unlock(); const on = sound.toggleMusic(); $('musicBtn').style.opacity = on ? '1' : '0.45'; };

/* ------------------------------------------------- bảng mô phỏng */
const NAMES = ['Tuấn Anh', 'Mai Linh', 'Hoàng Thiếu Gia', 'Bé Na', 'Khang Không Khùng', 'Ngọc Trinh', 'Văn Nam', 'Bảo An', 'Hùng Phi Công', 'Thu Hà', 'Minh Đức', 'Lan Chi'];
let syncSettings = () => {};
function simPanel(){
  const box = $('sim'), body = $('simBody');
  box.hidden = false;
  const store = (k: string, v?: string) => { try { if (v === undefined) return localStorage.getItem('bay-' + k); localStorage.setItem('bay-' + k, v); } catch { /* bỏ qua */ } return null; };
  body.hidden = store('open') === '0';
  $('simToggle').onclick = () => { body.hidden = !body.hidden; store('open', body.hidden ? '0' : '1'); };
  const row = (title: string, ...kids: HTMLElement[]) => { const r = el('div', 'srow'); r.append(el('b', 'st', title), ...kids); body.append(r); return r; };
  const button = (t: string, fn: () => void, cls = '') => { const b = el('button', cls, t); b.onclick = fn; return b; };
  const user = el('input'); user.placeholder = 'username TikTok'; user.value = store('user') ?? '';
  row('📡 TikTok LIVE', user, button('Kết nối', () => { store('user', user.value); net.send({ t: 'ctl', cmd: 'connect', user: user.value }); }, 'pri'), button('Ngắt', () => net.send({ t: 'ctl', cmd: 'disconnect' })));
  const who = el('select');
  for (const n of NAMES){ const o = el('option', '', n); o.value = n; who.append(o); }
  const me = () => ({ id: who.value, name: who.value });
  row('👤 Người thử', who,
    button('Gõ "1"', () => net.send({ t: 'sim', kind: 'comment', ...me(), text: '1' })),
    button('+5 người', () => { for (let i = 0; i < 5; i++){ const n = NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + Math.floor(Math.random() * 99); net.send({ t: 'sim', kind: 'comment', id: n, name: n, text: PICKABLE[Math.floor(Math.random() * PICKABLE.length)].words[0] }); } }),
    button('❤️ x30', () => net.send({ t: 'sim', kind: 'like', ...me(), count: 30 })));
  const planeSel = el('select');
  for (const p of PICKABLE){ const o = el('option', '', p.name); o.value = p.words[0]; planeSel.append(o); }
  const txt = el('input'); txt.placeholder = 'bình luận…';
  row('💬 Bình luận', planeSel, button('Chọn máy bay', () => net.send({ t: 'sim', kind: 'comment', ...me(), text: planeSel.value })), txt, button('Gửi', () => { if (txt.value) net.send({ t: 'sim', kind: 'comment', ...me(), text: txt.value }); txt.value = ''; }));
  const gifts = el('div', 'gifts');
  for (const s of SKILLS){
    const b = button(`${s.icon} ${s.xu} xu`, () => net.send({ t: 'sim', kind: 'gift', ...me(), gift: s.gift.split(',')[0], diamonds: s.xu, count: 1 }), 'gb');
    b.title = `${s.name}: ${s.desc}`; gifts.append(b);
  }
  gifts.append(button('🌹 x10 combo', () => net.send({ t: 'sim', kind: 'gift', ...me(), gift: 'Hoa hồng', diamonds: 1, count: 10 }), 'gb'));
  row('🎁 Tặng quà', gifts);
  row('🏁 Cuộc đua', button('Xuất phát ngay', () => net.send({ t: 'ctl', cmd: 'startNow' }), 'pri'), button('Cuộc đua mới', () => net.send({ t: 'ctl', cmd: 'newRace' })), button('Xóa người thử', () => net.send({ t: 'ctl', cmd: 'clearSim' })));
  const voice = el('input'); voice.type = 'checkbox';
  const bots = el('input'); bots.type = 'number'; bots.min = '0'; bots.max = '20'; bots.style.width = '52px';
  const mapSel = el('select');
  for (const [k, n] of [['auto', '🔄 Tự đổi mỗi cuộc'], ...MAPS.map(m => [m.key, `${m.icon} ${m.name}`])] as [string, string][]){ const o = el('option', '', n); o.value = k; mapSel.append(o); }
  const send = () => net.send({ t: 'ctl', cmd: 'settings', settings: { voice: voice.checked, bots: +bots.value, map: mapSel.value as MapKey | 'auto' } });
  voice.onchange = send; bots.onchange = send; mapSel.onchange = send;
  const lab = (t: string, i: HTMLElement) => { const l = el('label', 'lab'); l.append(i, el('span', '', t)); return l; };
  row('⚙️ Cài đặt', lab('Giọng bình luận', voice), lab('Bot tối thiểu', bots), lab('Bản đồ', mapSel));
  syncSettings = () => { voice.checked = settings.voice; bots.value = String(settings.bots); mapSel.value = settings.map; };
  syncSettings();
  const live = el('a', 'golive', '📺 Mở cửa sổ LIVE 9:16'); live.href = '/?live=1';
  live.onclick = e => { e.preventDefault(); window.open('/?live=1', 'bay-live', 'width=540,height=960'); };
  const hangar = el('a', 'golive', '🛠️ Xưởng máy bay'); hangar.href = '/hangar.html'; hangar.target = '_blank';
  body.append(live, el('span', '', '   '), hangar, el('div', 'note', 'Đang nối TikTok thật thì bảng thử bị khóa để live không có quà giả.'));
}
if (!LIVE) simPanel();

resize();
// ?debug: mở máy quay và cảnh ra cửa sổ để soi lỗi hiển thị
if (params.has('debug')) Object.assign(window, { __cam: camera, __scene: scene, __views: views });
// Nạp file GLB (nếu có), dựng sẵn hình học từng loại máy bay (mỗi khung hình một loại cho khỏi giật) rồi mới nối server
void (async () => {
  try { const got = await loadPlaneModels(); if (got.length) console.info('Model GLB:', got.join(', ')); } catch (e) { console.warn(e); }
  for (const p of PICKABLE){ blueprint(p.key); await new Promise(r => setTimeout(r, 0)); }
  blueprint('golden');
  net.connect();
})();
frame();
