import * as THREE from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import type { WeddingState } from '../../shared/types.ts';
import { shared } from '../../client/materials.ts';
import { Cast } from '../../client/cuoi/cast.ts';
import { Sign } from '../../client/cuoi/sign.ts';
import { BAND, ENTRANCE, Stage } from '../../client/cuoi/stage.ts';
import { BASES, BATTLE_TABLES, COURTYARD, LANE_NAMES_SHORT, LaneManager } from '../battle/LaneManager.ts';
import { DEFAULT_GIFTS, SIM_GIFTS } from '../config/GiftConfig.ts';
import { UNITS } from '../config/UnitConfig.ts';
import { FLAG, TEAM_INFO, TEAM_KEYS } from '../types.ts';
import type { ChienControl, ChienServerMsg, Hud, LaneId, SimEvent, TeamKey } from '../types.ts';
import { BaseView, applyBaseHD } from './bases.ts';
import { HD } from './hd.ts';
import { QUALITY, makeComposer, nextLower } from './quality.ts';
import type { Quality } from './quality.ts';
import { CameraController } from './camera.ts';
import type { CamHold } from './camera.ts';
import { Fx } from './fx.ts';
import { $, BattleHUD, el } from './hud.ts';
import { ChienSound } from './sound.ts';
import { ModelLibrary } from './models.ts';
import { World } from './terrain.ts';
import { UnitRenderer, anchorHeight } from './units.ts';

// Đại Chiến Nhà Trai – Nhà Gái: màn hình 3D. Server mô phỏng trận đấu, ở đây chỉ nội suy vị trí, vẽ, phát hiệu ứng và âm thanh.
const params = new URLSearchParams(location.search);
const LIVE = params.has('live');
// mức đồ họa: ?q=medium|high|ultra (hoặc chọn trong bảng điều khiển); ?lite=1 là medium
const storedQ = (() => { try { return localStorage.getItem('chien.q'); } catch { return null; } })();
let quality: Quality = ((q => q === 'medium' || q === 'high' || q === 'ultra' ? q : null)(params.get('q') ?? (params.has('lite') ? 'medium' : storedQ)) ?? 'high') as Quality;
const LITE = quality === 'medium';
const BENCH = Math.max(0, Math.min(1000, +(params.get('bench') ?? 0) | 0));   // ?bench=500: đo hiệu năng với quân giả, không cần server
document.body.classList.toggle('live', LIVE);

/* ------------------------------------------------------------ cảnh */
const canvas = $<HTMLCanvasElement>('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !LITE, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, QUALITY[quality].pixel));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = LITE ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.18;
const scene = new THREE.Scene();
// thế giới rộng quanh sân cưới: đồng cỏ, đồi, hồ, rừng, núi xa, trời hoàng hôn; sương mỏng màu nắng chiều cho xa gần
const world = new World(LITE ? 'low' : 'high');
scene.add(world.group);
scene.background = new THREE.Color(0xe8c9a0);
scene.fog = new THREE.Fog(0xdcc4a0, 150, 760);
const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 3000);
const hemi = new THREE.HemisphereLight(0xdfe8ff, 0xb08a5a, 1.35); scene.add(hemi);
// nắng chiều thấp từ phía sau bên trái, vàng cam; bóng đổ dài, khung bóng đi theo chỗ camera đang nhìn
const sun = new THREE.DirectionalLight(0xffd9a8, 3.0);
sun.castShadow = true; sun.shadow.mapSize.setScalar(QUALITY[quality].shadow);
Object.assign(sun.shadow.camera, { left: -55, right: 55, top: 55, bottom: -55, near: 1, far: 400 });
sun.shadow.camera.updateProjectionMatrix(); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);
const fill = new THREE.DirectionalLight(0xbcd0ff, 0.55); fill.position.set(30, 25, 60); scene.add(fill);
function aimSun(at: THREE.Vector3){ sun.target.position.set(at.x, 0, at.z); sun.position.copy(sun.target.position).addScaledVector(world.sunDir, 160); sun.target.updateMatrixWorld(); }
// Giữ nguyên sân cưới: đình, cổng hoa, bàn thờ, trống, cây đa, chuối, cánh hoa rơi; kê lại 4 mâm cỗ giữa các làn làm vật cản
const sign = new Sign();
const stage = new Stage(sign.canvas, sign.frames);
sign.onChange = () => { stage.sign.needsUpdate = true; for (const t of stage.frames) t.needsUpdate = true; };
stage.showTables(BATTLE_TABLES);
// sân lát đá thu gọn quanh đình, nền cỏ phẳng cũ nhường chỗ cho địa hình
stage.grassMesh.visible = false;
{ const g = stage.groundMesh, w = COURTYARD.maxX - COURTYARD.minX, d = COURTYARD.maxZ - COURTYARD.minZ; g.scale.set(w / 60, 1, d / 60); g.position.set(0, 0, (COURTYARD.minZ + COURTYARD.maxZ) / 2); const m = g.material as THREE.MeshStandardMaterial; m.map?.repeat.set(10 * w / 60, 10 * d / 60); m.color.setHex(0xf0dcb8); }   // gạch ngả màu đất nung ấm cho hợp đồng cỏ
const cast = new Cast();                                          // cô dâu chú rể đứng dưới cổng hoa cổ vũ, ban nhạc chơi bên phải
scene.add(stage.group, cast.group);
const bases = { trai: new BaseView('trai'), gai: new BaseView('gai') };
scene.add(bases.trai.group, bases.gai.group);
scene.add(lanePaths());
const units = new UnitRenderer(!LITE); scene.add(units.group);
// model .glb trong public/models/ (nếu có) thay cho model dựng sẵn
const models = new ModelLibrary(); scene.add(models.group); units.models = models; models.skinCap = QUALITY[quality].skins;
void models.load().then(list => { if (list.length) hud.feed(`🧩 Đã nạp model 3D: ${list.map(k => UNITS[k].name).join(', ')}`, 'note'); });
const fx = new Fx(); scene.add(fx.group);
const sound = new ChienSound();
// âm thanh theo vị trí: lệch trái/phải theo chỗ trên màn hình, ngoài khung hình hoặc xa thì nhỏ đi
const _sp = new THREE.Vector3();
sound.locate = (x, z) => {
  _sp.set(x, 1, z); const d = camera.position.distanceTo(_sp); _sp.project(camera);
  const off = Math.max(Math.abs(_sp.x), Math.abs(_sp.y)) > 1.1 || _sp.z > 1;
  const near = Math.min(1.25, Math.max(0.45, 1.5 - 0.5 * d / Math.max(20, cam.distance)));
  return { pan: Math.max(-1, Math.min(1, _sp.x)) * 0.75, gain: (off ? 0.3 : 1) * near };
};
fx.onArrowLand = (x, z) => sound.play('thunk', 0.8, x, z);
// voi đi: đếm quãng đường để phát bước chân ình ình
const stepOdo = new Map<number, number>();
let composer: EffectComposer = makeComposer(renderer, scene, camera, quality, innerWidth, innerHeight);
// Đổi mức đồ họa: dựng lại chuỗi hậu kỳ, đổi độ nét và độ phân giải bóng (không đổi gì trong trận đấu)
function setQuality(q: Quality, why = ''){
  if (q === quality) return;
  quality = q;
  try { if (!why) localStorage.setItem('chien.q', q); } catch { /* chế độ riêng tư */ }
  const Q = QUALITY[q];
  renderer.setPixelRatio(Math.min(devicePixelRatio, Q.pixel));
  sun.shadow.mapSize.setScalar(Q.shadow); sun.shadow.map?.dispose(); sun.shadow.map = null as unknown as THREE.WebGLRenderTarget;
  renderer.shadowMap.type = q === 'medium' ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
  composer.dispose(); composer = makeComposer(renderer, scene, camera, q, innerWidth, innerHeight); resize();
  if (models) models.skinCap = Q.skins;
  const sel = document.getElementById('qSel') as HTMLSelectElement | null; if (sel) sel.value = q;
  hud.feed(`🎨 Đồ họa: ${Q.label}${why ? ' · ' + why : ''}`, 'note');
}
// Tài nguyên HD (npm run assets): vân PBR thật, bầu trời HDR chiếu sáng, cây đá quét 3D. Không có thì giữ bản dựng sẵn.
const hd = new HD();
void hd.load(renderer).then(ok => {
  if (!ok){ console.info('Chưa có tài nguyên HD (chạy: npm run assets). Dùng vật liệu dựng sẵn.'); return; }
  if (hd.env){ scene.environment = hd.env; scene.environmentIntensity = 0.6; hemi.intensity = 0.55; }
  world.applyHD(hd, QUALITY[quality].detail);
  applyBaseHD(hd);
  const g = stage.groundMesh, w = COURTYARD.maxX - COURTYARD.minX, d = COURTYARD.maxZ - COURTYARD.minZ;
  const yard = hd.material('courtyard', { normalScale: 1 }); if (yard){ for (const t of [yard.map, yard.normalMap, yard.roughnessMap, yard.aoMap]) t?.repeat.set(w / 2.2, d / 2.2); g.material = yard; }
  const rug = hd.material('carpet', { color: 0xb81c18, rough: 1 }); if (rug){ for (const t of [rug.map, rug.normalMap, rug.roughnessMap]) t?.repeat.set(1.5, 8); stage.carpetMesh.material = rug; }
  // cây đa và rặng cây sau đình của sân cưới gốc (khối đa giác) đổi thành cây HD ở đúng chỗ
  const spots = [{ x: -9.2, z: -1.6, s: 1.45 }];
  { let seed = 5; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 26; i++){ const x = -26 + i * 2.1 + rnd(), s = 3 + rnd() * 2.5, z = -11 - rnd() * 4; spots.push({ x, z, s: 0.55 + s * 0.12, ...(i % 3 === 1 ? { tall: true } : {}) }); } }
  if (world.plantTrees(hd, spots)) stage.group.traverse(o => { const m = o as THREE.InstancedMesh; if (m.isInstancedMesh && (m.material as THREE.MeshStandardMaterial).flatShading && m.instanceMatrix.count === 120) m.visible = false; });
  hud.feed('✨ Đã nạp đồ họa HD: vân thật, ánh sáng HDR, cây đá quét 3D', 'note');
});
const cam = new CameraController(camera, canvas);
// ?cam=overview | combat | lane1..lane3 | auto: chọn sẵn chế độ camera (ví dụ cố định cho OBS)
{ const lk = (params.get('look') ?? '').split(',').map(Number); if (lk.length >= 3 && lk.every(Number.isFinite)) cam.fixAt(lk[0], lk[1], lk[2], lk[3] || 0.6); }
{ const m = params.get('cam') ?? ''; if (/^lane[123]$/.test(m)) cam.setMode('lane', (+m.slice(4) - 1) as LaneId); else if (m === 'overview' || m === 'combat' || m === 'auto') cam.setMode(m); }
const hud = new BattleHUD(LIVE);

function resize(){
  const w = innerWidth, h = innerHeight, portrait = w / h < 0.8;
  renderer.setSize(w, h, false); composer.setSize(w, h);
  camera.aspect = w / h; camera.fov = portrait ? 50 : 36; camera.updateProjectionMatrix();
  fx.setViewport(h * Math.min(devicePixelRatio, LITE ? 1 : 2), camera.fov);
  // màn dọc: thanh PK gọn ở trên (CSS), bảng quà một hàng 6 ô xuống đáy màn hình; màn ngang trả bảng quà về dưới bảng Nhà Trai
  const gl = $('gl_trai'), bottom = $('hudBottom'), top = $('hudTop');
  if (portrait){ if (gl.parentElement !== bottom) bottom.insertBefore(gl, $('howto')); }
  else if (gl.parentElement !== top) top.insertBefore(gl, $('gl_gai'));
  // quà vừa tặng: màn dọc nằm ở dải dưới cạnh bảng tin (không che cổng gọi quân Nhà Trai ở trên), màn ngang ở giữa trên
  const lg = $('lastGift'), center = document.querySelector('#hudTop .center') as HTMLElement;
  if (portrait){ if (lg.parentElement !== bottom) bottom.insertBefore(lg, gl); }
  else if (lg.parentElement !== center) center.append(lg);
  computeSafe();
}
// vùng màn hình không bị bảng điểm và bảng tin che: camera tổng quan đặt cả ba làn vào đây
// Dọc 9:16: tránh cả dải bảng điểm phía trên và bảng tin phía dưới. Ngang 16:9: bảng hai phe và bảng tin nằm ở góc,
// chỉ tránh cột giữa (đồng hồ, thanh tiến độ) và hàng nút dưới cùng.
function computeSafe(){
  const H = innerHeight, portrait = innerWidth / H < 0.8;
  const topEl = portrait ? $('pk') : document.querySelector('#hudTop .center') as HTMLElement;
  scene.traverse(o => { if (o.userData.laneLabel) o.rotation.y = cam.base; });   // nhãn làn luôn đọc xuôi theo hướng camera
  const top = topEl.getBoundingClientRect().bottom + 6, bot = portrait ? $('hudBottom').getBoundingClientRect().top - 6 : H - 46;   // dải dưới cao cố định: camera không nhích theo bảng tin
  cam.safe = { x0: -0.97, x1: 0.97, y0: 1 - 2 * Math.max(H * 0.6, bot) / H, y1: 1 - 2 * Math.min(H * 0.45, top) / H };
}
addEventListener('resize', resize); resize();
setInterval(computeSafe, 2000);

/* ------------------------------------------------------------ dữ liệu */
let hudState: Hud | null = null, role: 'control' | 'view' = LIVE ? 'view' : 'control', lastResync = 0;
const plated = units.plated;
let ws: WebSocket | null = null, retry = 0;
function connect(){
  const s = new WebSocket(`${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws?role=${LIVE ? 'view' : 'control'}`);
  ws = s;
  s.onopen = () => { retry = 0; $('offline').hidden = true; };
  s.onclose = () => { $('offline').hidden = false; setTimeout(connect, Math.min(8000, 500 * 2 ** retry++)); };
  s.onmessage = e => { let m: ChienServerMsg; try { m = JSON.parse(e.data as string); } catch { return; } onMsg(m); };
}
const send = (m: ChienControl | { t: 'resync' }) => { if (ws?.readyState === 1) ws.send(JSON.stringify(m)); };
function onMsg(m: ChienServerMsg){
  const now = performance.now();
  switch (m.t){
    case 'hello':
      role = m.role; units.clear();
      for (const i of m.units) units.add(i, 0, 0, now - 5000);
      units.applyFrame(m.frame.u, m.frame.tick, now); units.applyFrame(m.frame.u, m.frame.tick, now);
      onHud(m.hud);
      if (role === 'control') buildPanel();
      break;
    case 'f': {
      for (const ev of m.ev) onEvent(ev, now);
      const unknown = units.applyFrame(m.u, m.tick, now);
      if (unknown && now - lastResync > 3000){ lastResync = now; send({ t: 'resync' }); }   // lỡ mất tin xuất hiện: xin lại ảnh chụp đầy đủ
      break;
    }
    case 'h': onHud(m.hud); break;
    case 'log': { const box = document.getElementById('log'); if (box){ box.prepend(el('div', '', m.text)); while (box.childElementCount > 40) box.lastElementChild!.remove(); } break; }
  }
}
let signKey = '';
function onHud(h: Hud){
  hudState = h;
  units.tickMs = h.tickMs;
  units.winner = h.round.state === 'ended' && h.result ? h.result.winner : '';
  for (const t of TEAM_KEYS) bases[t].set(h.teams[t]);
  hud.showOnLive = h.settings.showBoard;
  hud.render(h);
  units.honor = hud.honor;
  const lb = document.getElementById('liveBoard') as HTMLInputElement | null; if (lb) lb.checked = h.settings.showBoard;
  sound.intensity = h.round.state !== 'running' ? 0 : ({ taphop: 1, giaotranh: 1, tongtancong: 2, boss: 3, quyetchien: 4 } as const)[h.round.phase];
  // bảng Lễ Thành Hôn: người tặng nhiều nhất mỗi nhà làm cô dâu, chú rể danh dự
  const lead = (t: TeamKey) => { const p = h.teams[t].top[0]; return p ? { id: p.id, name: p.name, gifted: p.gift, avatar: p.avatar.startsWith('/avatar/') } : null; };
  const bride = lead('gai'), groom = lead('trai'), key = JSON.stringify([bride?.id, bride?.name, groom?.id, groom?.name]);
  if (key !== signKey){ signKey = key; sign.draw({ bride, groom } as unknown as WeddingState); decor(); }
  const st = document.getElementById('ttStatus');
  if (st) st.textContent = h.live.status === 'connected' ? `✅ Đang nhận quà từ @${h.live.uniqueId}` : h.live.status === 'idle' ? 'Chưa kết nối TikTok. Gift Simulator dùng được.' : `${h.live.status}${h.live.error ? ': ' + h.live.error : ''}${h.live.attempt ? ` (lần ${h.live.attempt})` : ''}`;
  document.body.classList.toggle('simLocked', h.settings.simLocked);
  const pill = $('livePill'); pill.textContent = h.live.status === 'connected' ? '🔴 LIVE' : h.live.status === 'reconnecting' ? '🟠 Đang nối lại' : '⚪ Chưa LIVE'; pill.className = 'pill ' + h.live.status;
}

// cô dâu chú rể (top quà mỗi nhà) đứng dưới cổng hoa; ban nhạc bên phải
let coupleIds = { bride: 'co-dau', groom: 'chu-re' };
function decor(){
  const now = performance.now(), h = hudState;
  const b = h?.teams.gai.top[0], g = h?.teams.trai.top[0];
  coupleIds = { bride: b?.id ?? 'co-dau', groom: g?.id ?? 'chu-re' };
  cast.set(coupleIds.bride, b?.name ?? 'Cô dâu', 'bride', { x: -0.75, z: 2.1, yaw: 0 }, ENTRANCE, now);
  cast.set(coupleIds.groom, g?.name ?? 'Chú rể', 'groom', { x: 0.75, z: 2.1, yaw: 0 }, ENTRANCE, now);
  BAND.forEach((s, i) => cast.set('band-' + i, '', 'band', s, ENTRANCE, now));
  cast.prune(now);
}
decor();

/* ------------------------------------------------------------ sự kiện trận */
let killFeedAt = 0, likeFeedAt = 0;
const charging = new Set<number>();          // trâu đang húc (để nhận ra cú húc trúng)
const killStreak = new Map<string, { n: number; at: number; best: keyof typeof UNITS }>();
function onEvent(ev: SimEvent, now: number){
  switch (ev.e){
    case 'spawn': {
      const u = units.add(ev.u, ev.x, ev.z, now), d = UNITS[ev.u.kind];
      fx.spawn(ev.x, ev.z, TEAM_INFO[ev.u.team].color, d.tier);
      sound.play('spawn');
      void u; break;
    }
    case 'merge': { const u = units.units.get(ev.id); if (u){ u.info = { ...u.info, stack: ev.stack, maxHp: ev.maxHp }; fx.burst(u.rx, 1.4, u.rz, [TEAM_INFO[u.team].color, 0xffffff], 8, 2.5); } break; }
    case 'atk': {
      const u = units.units.get(ev.id); if (!u) break;
      u.atkAt = now; u.atkV = ev.v;
      if (u.def.projectile) break;
      const k = u.info.kind, tc = TEAM_INFO[u.team].color;
      if (k === 'danbinh' || k === 'dausi'){
        // vệt chém trắng pha màu phe; đấu sĩ chém rộng hơn, tiếng keng kim loại
        if (u.visible) fx.slash(u.rx, u.rz, u.ryaw, k === 'dausi' ? 0xfff0c8 : tc, k === 'dausi');
        sound.play('swing', 0.7, u.rx, u.rz);
        if (k === 'dausi' || Math.random() < 0.35) sound.play('clash', k === 'dausi' ? 0.9 : 0.5, u.rx, u.rz);
      } else if (k === 'trau' || k === 'voi'){
        const fx0 = u.rx + Math.sin(u.ryaw) * 1.4, fz0 = u.rz + Math.cos(u.ryaw) * 1.4;
        fx.gore(fx0, fz0, u.ryaw); sound.play('gore', k === 'voi' ? 1 : 0.8, fx0, fz0);
        cam.shake = Math.max(cam.shake, k === 'voi' ? 0.3 : 0.18);
      } else { sound.play('slam', 0.6, u.rx, u.rz); if (u.visible) fx.slash(u.rx, u.rz, u.ryaw, 0xffc890, true); }
      break;
    }
    case 'shot': {
      const t = ev.t > 0 ? ev.t : 0;
      fx.arrow(ev.x, ev.z, ev.tx, ev.tz, ev.ms, t ? () => { const x = units.units.get(t); return x && x.state !== 'dead' ? { x: x.rx, z: x.rz } : null; } : null);
      const s = units.units.get(ev.id), volley = !!s && !!(s.flags & FLAG.volley);
      if (s?.visible) fx.muzzle(ev.x, ev.z, s.ryaw, false, TEAM_INFO[s.team].color);
      sound.play('twang', volley ? 0.6 : 0.8, ev.x, ev.z);
      break;
    }
    case 'hit': {
      const u = ev.id > 0 ? units.units.get(ev.id) : null;
      const y = u ? u.ry + anchorHeight(u.info.kind) * 0.7 : 2.4;
      if (u){ u.hitAt = now; u.dmgAt = now; }
      fx.impact(ev.x, ev.z, ev.big, ev.crit, ev.block);
      if (ev.block) sound.play('block', 1, ev.x, ev.z); else sound.play('hit', Math.min(1.5, 0.4 + ev.dmg / 300), ev.x, ev.z);
      if (ev.crit && !ev.block) sound.play('clash', 0.8, ev.x, ev.z);
      // trâu đang húc mà trúng ai gần đầu nó: tiếng húc + bụi văng + rung màn
      for (const c of charging){ const b = units.units.get(c); if (!b || !(b.flags & FLAG.charge)){ charging.delete(c); continue; }
        if (Math.hypot(b.rx - ev.x, b.rz - ev.z) < 2.6){ fx.gore(ev.x, ev.z, b.ryaw); sound.play('gore', 1, ev.x, ev.z); cam.shake = Math.max(cam.shake, 0.4); break; } }
      if (ev.big || ev.crit || ev.block || ev.id < 0 || (u && u.def.boss) || Math.random() < 0.25) hud.damage(ev.x, y, ev.z, ev.dmg, ev.crit, ev.block, ev.big);
      break;
    }
    case 'skill': {
      const u = units.units.get(ev.id); if (!u) break;
      const tc = TEAM_INFO[u.team].color;
      if (ev.phase === 'start'){
        u.skill = ev.k; u.skillAt = now;
        if (ev.k === 'boost'){ sound.play('cart', 1, u.rx, u.rz); fx.puff(u.rx, u.rz, 10, 0xb9a58c, 0.6, 0.8); }
        if (ev.k === 'charge'){
          // trâu cúi sừng: phì hơi, rống, vó dồn dập
          charging.add(u.id); sound.play('snort', 1, u.rx, u.rz); sound.play('moo', 1, u.rx, u.rz); sound.play('gallop', 1, u.rx, u.rz);
          fx.charge(u.rx, u.rz, u.ryaw, tc); cam.shake = Math.max(cam.shake, 0.2);
        }
        if (ev.k === 'roar') sound.play('trumpet', 1.1, u.rx, u.rz);
        if (ev.k === 'stomp') sound.play('trumpet', 1, u.rx, u.rz);
        if (ev.k === 'volley'){ sound.play('volley', 1, u.rx, u.rz); fx.muzzle(u.rx, u.rz, u.ryaw, true, tc); }
      } else if (ev.phase === 'hit'){
        if (ev.k === 'slam'){ fx.ring(ev.x, ev.z, ev.r, 0xffd27a, 0.5); fx.puff(ev.x, ev.z, 10, 0xa8946f, 0.8, 1.2); sound.play('slam', 1, ev.x, ev.z); cam.shake = Math.max(cam.shake, 0.25); }
        if (ev.k === 'stomp'){ fx.stomp(ev.x, ev.z, ev.r); sound.play('stomp', 1.2, ev.x, ev.z); cam.shake = Math.max(cam.shake, 0.9); }
        if (ev.k === 'roar'){ fx.roar(ev.x, ev.z, ev.r, tc); sound.play('roar', 1, ev.x, ev.z); cam.shake = Math.max(cam.shake, 0.45); }
        if (ev.k === 'boost'){ fx.ring(ev.x, ev.z, ev.r, 0xffa03a, 0.5); fx.burst(ev.x, 0.8, ev.z, [0xffc23a, 0xffffff], 24, 6); fx.puff(ev.x, ev.z, 12, 0xa8946f, 1, 1.5); sound.play('slam', 1, ev.x, ev.z); cam.shake = Math.max(cam.shake, 0.3); }
      }
      break;
    }
    case 'die': {
      const u = units.units.get(ev.id), k = units.units.get(ev.by);
      if (k) k.killAt = now;
      fx.death(ev.x, ev.z, !!u?.def.boss);
      sound.play('die', 0.6, ev.x, ev.z); stepOdo.delete(ev.id); charging.delete(ev.id);
      if (u?.def.boss){ sound.play(u.info.kind === 'voi' ? 'trumpet' : 'moo', 1, ev.x, ev.z); cam.shake = Math.max(cam.shake, 0.6); }
      break;
    }
    case 'kill': {
      // gộp theo người hạ: boss quét cả đám thì một dòng "hạ 6 quân", không tràn bảng tin
      const k = killStreak.get(ev.killer) ?? { n: 0, at: -1e9, best: ev.vkind };
      k.n++; if (UNITS[ev.vkind].tier > UNITS[k.best].tier) k.best = ev.vkind;
      killStreak.set(ev.killer, k);
      if (now - k.at < 3500 || now - killFeedAt < 1200) break;
      hud.feed(k.n > 1 ? `⚔️ ${ev.killerName} ${UNITS[ev.kind].icon} hạ ${k.n} quân (có ${UNITS[k.best].icon} ${UNITS[k.best].name})` : `⚔️ ${ev.killerName} ${UNITS[ev.kind].icon} hạ ${UNITS[ev.vkind].icon} ${ev.victimName}`, 'kill ' + ev.team);
      k.n = 0; k.at = now; k.best = 'danbinh'; killFeedAt = now;
      if (killStreak.size > 300) killStreak.clear();
      sound.play('kill');
      break;
    }
    case 'base': {
      const T = TEAM_INFO[ev.team], p = BASES[ev.team][ev.part];
      if (ev.destroyed){
        fx.explosion(p.x, 2, p.z); cam.shake = Math.max(cam.shake, ev.part === 'house' ? 1.2 : 0.8);
        sound.play(ev.part === 'house' ? 'house' : 'gate');
        hud.banner(ev.part === 'gate' ? `💥 Cổng ${T.name} đã vỡ!` : `🏚️ Nhà chính ${T.name} sụp đổ!`, ev.part === 'gate' ? 'Tấn công nhà chính!' : '', ev.team, 2600);
        hud.feed(ev.part === 'gate' ? `💥 Cổng ${T.name} đã vỡ!` : `🏚️ Nhà chính ${T.name} sụp đổ!`, 'alert ' + ev.team);
      }
      break;
    }
    case 'boss': {
      hud.boss(ev.name, ev.avatar, ev.team, ev.kind);
      hud.feed(`👑 ${ev.name} triệu hồi ${UNITS[ev.kind].icon} ${UNITS[ev.kind].name}!`, 'boss ' + ev.team);
      sound.play('boss'); sound.play(ev.kind === 'voi' ? 'trumpet' : 'moo');
      fx.pillar(BASES[ev.team].spawn.x, BASES[ev.team].spawn.z, 0xffd34d, true);
      if (ev.kind === 'voi' && camera.aspect >= 0.8){   // màn dọc giữ toàn cảnh, không giật vào cổng gọi quân
        const id = ev.id; cam.boss(() => { const u = units.units.get(id); return u ? new THREE.Vector3(u.rx, 0, u.rz) : null; }); }
      cheer(ev.team, 4000);
      break;
    }
    case 'gift': {
      hud.gift(ev.name, ev.avatar, ev.team, ev.kind, ev.count, ev.giftName, ev.units ?? ev.count);
      hud.feed(`🎁 ${ev.name}: ${ev.count > 1 ? ev.count + ' × ' : ''}${ev.giftName} → ${UNITS[ev.kind].icon} ${ev.units ?? ev.count} ${UNITS[ev.kind].name}`, 'gift ' + ev.team);
      sound.play('gift');
      cheer(ev.team, 2000);
      break;
    }
    case 'honor': {
      const rk = ev.rank <= 3 ? ['🥇', '🥈', '🥉'][ev.rank - 1] : '🏆';
      hud.banner(`${rk} Top ${ev.rank} lực chiến tháng`, `${ev.name} đã vào chiến trường · ${ev.power.toLocaleString('vi-VN')} lực chiến`, 'phase', 3500);
      hud.feed(`${rk} Top ${ev.rank} lực chiến tháng ${ev.name} đã vào!`, 'boss');
      sound.play('boss');
      break;
    }
    case 'like': {
      // tim bay lên từ cổng phe đó; bảng tin gộp lại, không tràn
      const sp = BASES[ev.team].spawn;
      fx.burst(sp.x, 2, sp.z, [0xff4d7a, 0xff9fc0, 0xffffff], 10, 3, 1);
      sound.play('spawn', 0.7, sp.x, sp.z);
      if (now - likeFeedAt > 1500){ likeFeedAt = now; hud.feed(`❤️ ${ev.name} thả tim → +${ev.units} 🥢 Dân binh cho ${TEAM_INFO[ev.team].name}`, ev.team); }
      break;
    }
    case 'threat': hud.feed(`🚨 Căn cứ ${TEAM_INFO[ev.team].name} đang bị tấn công!`, 'alert ' + ev.team); sound.play('alarm'); break;
    case 'team': hud.feed(ev.locked ? `🔒 ${ev.name} đang có quân bên ${TEAM_INFO[ev.team].name}, đổi phe từ vòng sau` : `${TEAM_INFO[ev.team].icon} ${ev.name} gia nhập ${TEAM_INFO[ev.team].name}`, ev.team); break;
    case 'phase': hud.banner(`⚔️ ${ev.name}`, ev.text, 'phase', 2600); hud.feed(`📯 ${ev.name}: ${ev.text}`, 'note'); sound.play('go'); break;
    case 'round':
      if (ev.state === 'countdown'){ hud.banner(`Vòng ${ev.round}`, 'Chuẩn bị! Bình luận 1 vào Nhà Trai · 2 vào Nhà Gái', 'phase', 3000); sound.play('beep'); }
      if (ev.state === 'running'){ hud.banner('⚔️ XUẤT TRẬN!', 'Tập hợp quân trước cổng', 'phase', 2200); sound.play('go'); }
      if (ev.state === 'ended'){
        const w = ev.winner;
        if (w && w !== 'draw'){ sound.play('win'); cheer(w, 15000); for (let i = 0; i < 6; i++) setTimeout(() => fx.burst((Math.random() - 0.5) * 20, 8 + Math.random() * 3, 4 + Math.random() * 8, [0xffd45a, TEAM_INFO[w].color, 0xffffff], 50, 5, 1.4), i * 350); }
        else sound.play('lose');
      }
      if (ev.state === 'idle'){ units.clear(); hud.feed('🔄 Trận đã được đặt lại', 'note'); }
      if (ev.state === 'paused') hud.banner('⏸ Tạm dừng', '', 'phase', 1500);
      break;
  }
}
function cheer(team: TeamKey, ms: number){ cast.cheer(team === 'gai' ? coupleIds.bride : coupleIds.groom, ms); }

/* ------------------------------------------------------------ camera giao tranh */
// Mỗi nửa giây tìm ô 4 m có nhiều quân đang đánh nhất để camera Giao tranh bám theo
function findCombat(){
  // w: độ "nóng" của ô (quân cấp cao tính nhiều hơn), k: số quân để lấy tâm
  const cells = new Map<number, { w: number; k: number; x: number; z: number }>();
  for (const u of units.units.values()){
    if (u.state !== 'attack' && u.state !== 'skill') continue;
    const key = Math.floor(u.rx / 4) * 1000 + Math.floor(u.rz / 4), c = cells.get(key) ?? { w: 0, k: 0, x: 0, z: 0 };
    c.w += u.def.tier; c.k++; c.x += u.rx; c.z += u.rz; cells.set(key, c);
  }
  let best: { w: number; k: number; x: number; z: number } | null = null;
  for (const c of cells.values()) if (!best || c.w > best.w) best = c;
  cam.setCombat(best && best.w >= 4 ? new THREE.Vector3(best.x / best.k, 0, best.z / best.k) : null);
  // Camera đạo diễn: vùng 12 m đánh nhau đông nhất; chưa đánh nhau thì khung trọn cả hai đạo quân, cách quá xa thì toàn cảnh
  const big = new Map<number, { w: number; k: number; x: number; z: number }>();
  let x0 = Infinity, x1 = -Infinity, sz = 0, n = 0;
  for (const u of units.units.values()){
    if (u.state === 'dead') continue;
    x0 = Math.min(x0, u.rx); x1 = Math.max(x1, u.rx); sz += u.rz; n++;
    if (u.state !== 'attack' && u.state !== 'skill' && u.state !== 'approach') continue;
    const key = Math.floor(u.rx / 12) * 1000 + Math.floor(u.rz / 12), c = big.get(key) ?? { w: 0, k: 0, x: 0, z: 0 };
    c.w += u.def.tier * (u.state === 'approach' ? 0.5 : 1); c.k++; c.x += u.rx; c.z += u.rz; big.set(key, c);
  }
  let hot: { w: number; k: number; x: number; z: number } | null = null;
  for (const c of big.values()) if (!hot || c.w > hot.w) hot = c;
  if (hot && hot.w >= 6) cam.setFocus(new THREE.Vector3(hot.x / hot.k, 0, hot.z / hot.k), 40);
  else if (n && x1 - x0 < 70) cam.setFocus(new THREE.Vector3((x0 + x1) / 2, 0, sz / n), x1 - x0 + 18);
  else cam.setFocus(new THREE.Vector3(0, 0, 10), 0);
}
setInterval(findCombat, 500);

/* ------------------------------------------------------------ bảng điều khiển */
let built = false;
function buildPanel(){
  if (built || LIVE) return;
  built = true;
  const panel = $('ctl'); panel.hidden = false;
  const body = $('ctlBody');
  $('ctlToggle').onclick = () => { body.hidden = !body.hidden; store('open', !body.hidden); computeSafe(); };
  body.hidden = store('open') === false;
  const btn = (t: string, fn: () => void, cls = 'b') => { const b = el('button', cls, t); b.onclick = fn; return b; };
  const row = (...k: HTMLElement[]) => { const d = el('div', 'line'); d.append(...k); return d; };
  const sec = (key: string, title: string, open: boolean, ...kids: HTMLElement[]) => { const d = el('details') as HTMLDetailsElement; d.open = store('s.' + key) ?? open; d.ontoggle = () => store('s.' + key, d.open); d.append(el('summary', '', title), ...kids); return d; };
  const input = (ph: string, v = '', type = 'text') => { const i = el('input') as HTMLInputElement; i.placeholder = ph; i.value = v; i.type = type; return i; };
  // TikTok
  const user = input('@username TikTok', store('tt') ?? '');
  const status = el('div', 'note'); status.id = 'ttStatus';
  // Gift Simulator
  const name = input('Tên người chơi', store('name') ?? 'Út Mít'), avatar = input('Link ảnh đại diện (tùy chọn)', store('avatar') ?? '');
  name.onchange = () => store('name', name.value); avatar.onchange = () => store('avatar', avatar.value);
  const team = el('select') as HTMLSelectElement;
  for (const [v, t] of [['auto', '🎲 Tự chia phe'], ['trai', '🤵 Nhà Trai'], ['gai', '👰 Nhà Gái']]){ const o = el('option', '', t) as HTMLOptionElement; o.value = v; team.append(o); }
  team.value = store('team') ?? 'auto'; team.onchange = () => store('team', team.value);
  const count = input('Số lượng', '1', 'number'); count.min = '1'; count.max = '100'; count.style.width = '64px';
  const comboLab = el('label', 'tg'), combo = el('input') as HTMLInputElement; combo.type = 'checkbox'; comboLab.append(combo, document.createTextNode(' Gửi dạng combo'));
  const gifts = el('div', 'gifts');
  SIM_GIFTS.forEach((g, i) => {
    const d = Object.values(UNITS)[i];
    const b = el('button', 'gb'); b.onclick = () => send({ t: 'sim', kind: 'gift', user: '', name: name.value, avatar: avatar.value, team: team.value as TeamKey | 'auto', value: g.value, count: +count.value || 1, combo: combo.checked });
    const per = DEFAULT_GIFTS.byValue.find(t => t.unit === d.key)?.count ?? 1;
    b.append(el('b', '', `${d.label}`), el('span', '', `${d.icon} ${per} ${d.name}`), el('small', '', `${g.icon} ${g.value} xu`)); gifts.append(b);
  });
  const chat = row(btn('💬 "1" vào Nhà Trai', () => send({ t: 'sim', kind: 'chat', user: '', name: name.value, text: '1' })), btn('💬 "2" vào Nhà Gái', () => send({ t: 'sim', kind: 'chat', user: '', name: name.value, text: '2' })), btn('❤️ Thả 100 tim', () => send({ t: 'sim', kind: 'like', user: '', name: name.value, team: team.value as TeamKey | 'auto', count: 100 })));
  const tests = el('div', 'tests');
  for (const [t, w] of [['TEST NHÀ TRAI', 'trai'], ['TEST NHÀ GÁI', 'gai'], ['TEST 100 QUÂN', 'u100'], ['TEST 300 QUÂN', 'u300'], ['TEST COMBO QUÀ', 'combo'], ['TEST BOSS', 'boss'], ['QUÀ NGẪU NHIÊN', 'mix']] as const) tests.append(btn(t, () => send({ t: 'test', what: w }), 'b t'));
  tests.append(btn('RESET', () => send({ t: 'ctl', cmd: 'reset' }), 'b t danger'));
  // vòng đấu
  const auto = el('input') as HTMLInputElement; auto.type = 'checkbox'; auto.checked = hudState?.settings.autoNext ?? true; auto.onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { autoNext: auto.checked } });
  const dual = el('input') as HTMLInputElement; dual.type = 'checkbox'; dual.checked = hudState?.settings.allowDualTeam ?? false; dual.onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { allowDualTeam: dual.checked } });
  const num = (key: 'countdownSec' | 'gatherSec' | 'roundSec' | 'gateHp' | 'houseHp' | 'likesPerUnit' | 'likeUnitsMax', def: number, min: number, max: number, step = 1, wpx = 76) => {
    const i = input('', String(hudState?.settings[key] ?? def), 'number'); i.min = String(min); i.max = String(max); i.step = String(step); i.style.width = wpx + 'px'; i.dataset.key = key;
    i.onchange = () => { const v = Math.max(min, Math.min(max, i.value.trim() === '' || !Number.isFinite(+i.value) ? def : +i.value)); i.value = String(v); send({ t: 'ctl', cmd: 'settings', settings: { [key]: v } }); };
    return i;
  };
  const cdSec = num('countdownSec', 5, 0, 120), gateHp = num('gateHp', 15000, 1000, 5_000_000, 1000, 100), houseHp = num('houseHp', 40000, 1000, 20_000_000, 1000, 100);
  const likePer = num('likesPerUnit', 3, 0, 10_000, 1, 70), likeMax = num('likeUnitsMax', 15, 0, 500, 1, 64);
  const gsec = input('Giây', String(hudState?.settings.gatherSec ?? 30), 'number'); gsec.min = '0'; gsec.max = '300'; gsec.style.width = '70px'; gsec.onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { gatherSec: +gsec.value } });
  const secs = input('Giây', String(hudState?.settings.roundSec ?? 270), 'number'); secs.min = '30'; secs.max = '3600'; secs.style.width = '76px'; secs.onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { roundSec: +secs.value } });
  const lab = (i: HTMLElement, t: string) => { const l = el('label', 'tg'); l.append(i, document.createTextNode(' ' + t)); return l; };
  // phân phe
  const who = input('Tên hoặc id người xem');
  // camera
  const camRow = row(btn('🎬 Đạo diễn', () => cam.setMode('auto')), btn('🗺️ Toàn cảnh', () => cam.setMode('overview')), ...([0, 1, 2] as LaneId[]).map(l => btn(LANE_NAMES_SHORT[l], () => cam.setMode('lane', l))), btn('⚔️ Giao tranh', () => cam.setMode('combat')));
  const autoCam = el('input') as HTMLInputElement; autoCam.type = 'checkbox'; autoCam.checked = cam.auto; autoCam.onchange = () => { cam.auto = autoCam.checked; };
  const liveBoard = el('input') as HTMLInputElement; liveBoard.type = 'checkbox'; liveBoard.id = 'liveBoard'; liveBoard.checked = hudState?.settings.showBoard ?? false; liveBoard.onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { showBoard: liveBoard.checked } });
  const qSel = el('select') as HTMLSelectElement; qSel.id = 'qSel';
  for (const q of ['medium', 'high', 'ultra'] as Quality[]){ const o = el('option', '', QUALITY[q].label) as HTMLOptionElement; o.value = q; qSel.append(o); }
  qSel.value = quality; qSel.onchange = () => setQuality(qSel.value as Quality);
  const live = el('a', 'note', '↗ Mở màn hình LIVE 9:16') as HTMLAnchorElement; live.href = '/?live=1';
  live.onclick = e => { e.preventDefault(); window.open('/?live=1', 'chien-live', 'width=540,height=960'); };
  const stats = el('div', 'stats'); stats.id = 'stats';
  const log = el('div', 'log'); log.id = 'log';
  body.replaceChildren(
    sec('tt', 'Kết nối TikTok LIVE', true, row(user, btn('Kết nối', () => { store('tt', user.value); send({ t: 'ctl', cmd: 'connect', user: user.value }); }, 'b main'), btn('Ngắt', () => send({ t: 'ctl', cmd: 'disconnect' }))), status),
    sec('round', 'Vòng đấu', true, row(btn('⚔️ Bắt đầu ngay', () => send({ t: 'ctl', cmd: 'go' }), 'b main'), btn('⏸', () => send({ t: 'ctl', cmd: 'pause' })), btn('⏯', () => send({ t: 'ctl', cmd: 'resume' })), btn('⏹ Kết thúc', () => send({ t: 'ctl', cmd: 'end' }))),
      row(lab(cdSec, 'giây đếm ngược'), lab(gsec, 'giây tập hợp')), row(lab(secs, 'giây giao chiến (tổng thời gian đánh)')),
      el('div', 'lbl2', 'Máu căn cứ hai bên (áp dụng ngay, giữ tỉ lệ máu đang còn)'), row(lab(gateHp, 'máu cổng'), lab(houseHp, 'máu nhà chính')),
      el('div', 'lbl2', 'Thả tim ra Dân binh (0 tim = tắt). Quân từ tim không góp lực chiến, quân từ quà luôn ra trước'), row(lab(likePer, 'tim = 1 Dân binh'), lab(likeMax, 'tối đa / người / vòng')),
      row(lab(auto, 'Tự động sang vòng mới')), row(lab(dual, 'Cho phép một người có quân ở cả hai phe'))),
    sec('sim', 'Gift Simulator', true, row(name), row(avatar), row(team, count, comboLab), gifts, chat, el('div', 'lockNote', '🔒 Đang LIVE thật: quà thử bị khóa')),
    sec('test', 'Kiểm thử nhanh', true, tests),
    sec('board', 'BXH lực chiến tháng', false, row(btn('🏆 Xem BXH', () => { hud.boardOpen = !hud.boardOpen; if (hudState) hud.render(hudState); }), lab(liveBoard, 'Hiện BXH trên màn LIVE')), row(btn('🧹 Xóa người chơi thử khỏi BXH', () => send({ t: 'ctl', cmd: 'boardClearSim' })))),
    sec('team', 'Host phân phe', false, row(who, btn('🤵 Trai', () => send({ t: 'ctl', cmd: 'assign', user: who.value, team: 'trai' })), btn('👰 Gái', () => send({ t: 'ctl', cmd: 'assign', user: who.value, team: 'gai' })))),
    sec('gfx', 'Đồ họa', true, row(qSel, el('span', 'note', 'FPS thấp kéo dài thì tự hạ một mức'))),
    sec('cam', 'Camera', false, camRow, row(lab(autoCam, 'Tự động ghé chỗ giao tranh'), btn('↺ Reset camera', () => cam.reset()))),
    live, stats, log,
  );
}
function store(k: string, v?: unknown){
  try { if (v === undefined){ const s = localStorage.getItem('chien.' + k); return s === null ? null : JSON.parse(s); } localStorage.setItem('chien.' + k, JSON.stringify(v)); } catch { /* chế độ riêng tư */ }
  return null;
}
// phím giữ để điều khiển camera: mũi tên đẩy, PageUp/PageDown nghiêng, +/− phóng to, Q/E xoay
const HOLD_KEYS: Record<string, CamHold> = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', PageUp: 'tiltUp', PageDown: 'tiltDown', '+': 'zoomIn', '=': 'zoomIn', '-': 'zoomOut', _: 'zoomOut', q: 'rotL', Q: 'rotL', e: 'rotR', E: 'rotR' };
const typing = (t: EventTarget | null) => ['INPUT', 'SELECT', 'TEXTAREA'].includes((t as HTMLElement)?.tagName ?? '');
addEventListener('keydown', e => { const h = HOLD_KEYS[e.key]; if (h && !typing(e.target)){ e.preventDefault(); cam.hold(h, true); } });
addEventListener('keyup', e => { const h = HOLD_KEYS[e.key]; if (h) cam.hold(h, false); });
addEventListener('blur', () => { for (const h of Object.values(HOLD_KEYS)) cam.hold(h, false); });
// cụm nút camera trên trang điều khiển: nhấn giữ để chạy
for (const b of document.querySelectorAll<HTMLButtonElement>('#camPad [data-hold]')){
  const k = b.dataset.hold as CamHold, off = () => cam.hold(k, false);
  b.addEventListener('pointerdown', e => { e.preventDefault(); b.setPointerCapture(e.pointerId); cam.hold(k, true); });
  b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('lostpointercapture', off);
}
document.getElementById('camPadReset')?.addEventListener('click', () => cam.reset());
addEventListener('keydown', e => {
  if (typing(e.target)) return;
  if (e.key === '1' || e.key === '2' || e.key === '3') cam.setMode('lane', (+e.key - 1) as LaneId);
  if (e.key === 'o' || e.key === 'O') cam.setMode('overview');
  if (e.key === 'a' || e.key === 'A') cam.setMode('auto');
  if (e.key === 'c' || e.key === 'C') cam.setMode('combat');
  if (e.key === 'r' || e.key === 'R') cam.reset();
});
$('camReset').onclick = () => cam.reset();
$('boardBtn').onclick = () => { hud.boardOpen = !hud.boardOpen; if (hudState) hud.render(hudState); };
// nút Bắt đầu góc dưới phải: bỏ qua Tập hợp (hoặc mở trận nếu chưa có), xuất quân ngay
$('goBtn').onclick = () => send({ t: 'ctl', cmd: 'go' });

/* ------------------------------------------------------------ âm thanh */
const soundBtn = $('soundBtn'), musicBtn = $('musicBtn');
soundBtn.onclick = () => { if (sound.on){ sound.stop(); soundBtn.textContent = '🔈'; } else { sound.start(); soundBtn.textContent = '🔊'; } store('sound', sound.on); };
musicBtn.onclick = () => { sound.music = !sound.music; musicBtn.style.opacity = sound.music ? '1' : '0.45'; store('music', sound.music); };
sound.music = store('music') ?? true; musicBtn.style.opacity = sound.music ? '1' : '0.45';
if (LIVE || store('sound')){ addEventListener('pointerdown', () => { if (!sound.on){ sound.start(); soundBtn.textContent = '🔊'; } }, { once: true }); }
if (LIVE){ sound.start(); soundBtn.textContent = '🔊'; }

/* ------------------------------------------------------------ vòng khung hình */
let last = performance.now(), fps = 60, lowFor = 0, fpsShow = 0, qGrace = performance.now() + 12_000;
function frame(now: number){
  const dt = Math.min(0.1, Math.max(0, (now - last) / 1000)); last = now;
  fps += (1 / Math.max(dt, 1e-3) - fps) * 0.05;
  // máy yếu: tự giảm số hạt hiệu ứng
  lowFor = fps < 40 ? lowFor + dt : Math.max(0, lowFor - dt);
  fx.budget = lowFor > 3 ? 0.45 : 1;
  // FPS thấp kéo dài 6 giây: tự hạ một mức đồ họa (không đổi số quân hay kết quả trận)
  if (lowFor > 6 && now > qGrace){ const lower = nextLower(quality); if (lower){ setQuality(lower, 'tự hạ vì FPS thấp'); qGrace = now + 15_000; lowFor = 0; } }
  shared.time.value = now / 1000; shared.wind.value = 0.35;
  cam.update(dt, now);
  aimSun(cam.target);
  stage.update(dt, now / 1000, 0);
  cast.update(dt, now);
  units.draw(camera, now);
  // bụi cuốn sau xe đang tăng tốc, trâu đang húc
  for (const u of units.units.values()){
    if (!u.visible || u.state === 'dead') continue;
    if ((u.flags & 6) && Math.random() < dt * ((u.flags & FLAG.charge) ? 70 : 30)) fx.trail(u.rx, u.rz, 0xb9a58c);
    // voi, trâu bước: bụi dưới chân, voi kêu ình ình và rung nhẹ
    const kd = u.info.kind;
    if (kd === 'voi' || kd === 'trau'){
      const stride = kd === 'voi' ? 2.2 : 1.6, prev = stepOdo.get(u.id) ?? u.odo;
      if (u.odo - prev >= stride){
        stepOdo.set(u.id, u.odo);
        const side = (Math.floor(u.odo / stride) % 2 ? 1 : -1) * 0.7, c = Math.cos(u.ryaw), s = Math.sin(u.ryaw);
        fx.footstep(u.rx + c * side, u.rz - s * side, kd === 'voi');
        if (kd === 'voi'){ sound.play('step', 0.9, u.rx, u.rz); cam.shake = Math.max(cam.shake, 0.06); }
      } else if (!stepOdo.has(u.id)) stepOdo.set(u.id, u.odo);
    }
  }
  for (const t of TEAM_KEYS) bases[t].update(dt, now / 1000, fx, hudState?.teams[t].pending ?? 0);
  fx.update(dt);
  sound.update();
  composer.render();
  hud.plates3d(units.units.values(), camera, now, cam.distance, plated);
  hud.drawNums(camera, now);
  if ((fpsShow -= dt) <= 0){ fpsShow = 1; const f = document.getElementById('fps'); if (f) f.textContent = `${Math.round(fps)} fps · vẽ ${units.drawn} · ẩn ${units.culled} · cam ${cam.mode}${cam.manual ? "*" : ""} ${cam.distance.toFixed(0)}m`; }
  requestAnimationFrame(frame);
}
if (BENCH) bench(BENCH); else connect();
requestAnimationFrame(frame);

// Đo hiệu năng trên máy thật: ?bench=500 dựng 500 quân giả (đủ 6 loại, hai phe) đi lại, ra đòn liên tục, không cần server.
// Xem số fps ở góc dưới phải. Không ảnh hưởng gì tới trận thật.
function bench(n: number){
  const kinds = Object.keys(UNITS) as (keyof typeof UNITS)[], now = performance.now();
  const sim: { id: number; x: number; z: number; tx: number; tz: number; yaw: number; sp: number }[] = [];
  for (let i = 0; i < n; i++){
    const team: TeamKey = i % 2 ? 'gai' : 'trai', kind = kinds[i < n * 0.02 ? 5 : i < n * 0.05 ? 4 : i < n * 0.1 ? 3 : Math.floor(Math.random() * 3)];
    const x = (team === 'trai' ? -1 : 1) * (4 + Math.random() * 30), z = -6 + Math.random() * 30;
    units.add({ id: i + 1, kind, team, owner: 'bench' + (i % 40), name: 'Quân ' + (i + 1), avatar: '', maxHp: UNITS[kind].hp, stack: 1, lane: 0 }, x, z, now - 5000);
    sim.push({ id: i + 1, x, z, tx: x, tz: z, yaw: 0, sp: UNITS[kind].speed });
  }
  let tick = 0;
  setInterval(() => {
    const arr: number[] = [];
    for (const u of sim){
      if (Math.hypot(u.tx - u.x, u.tz - u.z) < 0.5){ u.tx = (Math.random() - 0.5) * 70; u.tz = -6 + Math.random() * 30; }
      const dx = u.tx - u.x, dz = u.tz - u.z, d = Math.hypot(dx, dz), st = Math.min(d, u.sp * 0.1);
      u.x += dx / d * st; u.z += dz / d * st; u.yaw = Math.atan2(dx, dz);
      const atk = Math.random() < 0.08;
      if (atk){ const c = units.units.get(u.id); if (c) c.atkAt = performance.now(); }
      arr.push(u.id, Math.round(u.x * 100), Math.round(u.z * 100), 0, Math.round(u.yaw * 100), 9999, atk ? 4 : 2, 0);
    }
    units.applyFrame(arr, ++tick, performance.now());
  }, 100);
  hud.feed(`🧪 Đo hiệu năng: ${n} quân giả (không có server). Xem fps ở góc dưới phải.`, 'note');
}

/* ------------------------------------------------------------ phụ trợ */
// Ba đường làn: dải đất nện nhạt trên nền sân, để người xem thấy rõ quân đi đường nào
function lanePaths(){
  const g = new THREE.Group();
  for (const l of [0, 1, 2] as LaneId[]){
    // nhãn làn vẽ trên mặt sân, gần hai đầu làn
    for (const sx of [-1, 1]){
      const c = document.createElement('canvas'); c.width = 256; c.height = 96;
      const x = c.getContext('2d')!; x.fillStyle = 'rgba(255,245,220,.85)'; x.font = 'bold 64px "Be Vietnam Pro", "Segoe UI", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`LÀN ${l + 1}`, 128, 50);
      const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
      const p = LaneManager.point(l, 'trai', sx < 0 ? 14 : LaneManager.length(l) - 14);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 1.65).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false }));
      m.position.set(p.x, 0.03, p.z); m.userData.laneLabel = true; g.add(m);
    }
  }
  return g;
}
