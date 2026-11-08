import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { ARCHETYPES, BOSSES, VIP_COLORS, VIP_NAMES, artifactByKey, bossByKey, ELEMENT_COLORS, GIFT_TIERS, REALM_COLORS, realmOf, sectByKey } from '../shared/game.ts';
import type { Element, Vfx } from '../shared/game.ts';
import type { BossPub, ControlMessage, CultPub, Fx, ModeState, ServerMessage, Settings } from '../shared/types.ts';
import { Sound } from './audio.ts';
import { BossView } from './boss.ts';
import { Cultivator } from './character.ts';
import { FxSystem } from './fx.ts';
import { loadModels, modelsWith } from './glb.ts';
import { hex, uTime } from './mats.ts';
import { Net } from './net.ts';
import { UI } from './ui.ts';
import { WorldView } from './world.ts';

const Q = new URLSearchParams(location.search);
const LIVE = Q.has('live'), LITE = Q.has('lite');
// ?debug: hiện lỗi JavaScript ngay trên màn hình (dò lỗi khi thêm model mới)
if (Q.has('debug')) for (const ev of ['error', 'unhandledrejection'] as const) addEventListener(ev, (e: Event) => { const d = document.createElement('pre'); d.style.cssText = 'position:fixed;left:0;right:0;top:30%;z-index:99;color:#f66;background:#000c;font-size:12px;white-space:pre-wrap;padding:8px'; const er = e as ErrorEvent & PromiseRejectionEvent; d.textContent = String(er.error?.stack ?? er.reason?.stack ?? er.message ?? er.reason); document.body.append(d); });
const canvas = document.getElementById('scene') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !LITE, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1 : 1.5));
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.88;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = !LITE; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.22;
const camera = new THREE.PerspectiveCamera(50, 1, 0.3, 1500);
const world = new WorldView(scene, LITE);
const fx = new FxSystem(scene);
const ui = new UI(LIVE);
const sound = new Sound();
let composer: EffectComposer | null = null, bloom: UnrealBloomPass | null = null;
if (!LITE) {
  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.28, 0.35, 0.97); composer.addPass(bloom);
  composer.addPass(new OutputPass());
}
function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); composer?.setSize(w, h);
  camera.aspect = w / h; camera.fov = w / h < 0.8 ? 62 : 48; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

/* ------------------------------------------------------------ thực thể */
const cults = new Map<string, Cultivator>();
let boss: BossView | null = null;
let mode: ModeState = { mode: 'tuluyen', title: '', leftMs: 0, round: 0, sides: [], next: '' };
let bossPub: BossPub | null = null;
let settings: Settings | null = null;
const t0Models = performance.now();
const loadedModels = loadModels().then(() => {
  world.useModels(); if (Q.has('debug')) { const d = document.createElement('div'); d.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99;color:#0f0;background:#000a;font:14px monospace;padding:4px 8px'; d.textContent = 'models: ' + modelsWith('').length + ' · ' + Math.round(performance.now() - t0Models) + ' ms'; document.body.append(d); } });

function syncCults(list: CultPub[]) {
  const seen = new Set<string>();
  for (const c of list) {
    seen.add(c.id);
    let v = cults.get(c.id);
    if (v && (v.arch.id !== c.a || v.vip !== c.vip)) { const old = v; c.x = old.x; c.z = old.z; old.dispose(); cults.delete(c.id); v = undefined; }
    if (!v) {
      v = new Cultivator(c.a, { vip: c.vip }); v.x = v.tx = c.x; v.z = v.tz = c.z; v.ry = v.tRy = c.ry;
      scene.add(v.root); cults.set(c.id, v);
    }
    v.tx = c.x; v.tz = c.z; v.tRy = c.ry;
    v.setPose(c.p); v.setInfo(c.name, c.lv, c.sect, c.npc); v.setArtifacts(c.arts);
    v.setHp(c.hp, c.mhp, c.side >= 0);
  }
  for (const [id, v] of cults) if (!seen.has(id)) { v.dispose(); cults.delete(id); }
}
function syncBoss(p: BossPub | null) {
  bossPub = p;
  if (!p) { if (boss) { boss.dispose(); boss = null; } world.setTheme(null); return; }
  if (!boss || boss.def.key !== p.key) { boss?.dispose(); boss = new BossView(p.key); boss.x = boss.tx = p.x; boss.z = boss.tz = p.z; scene.add(boss.root); }
  boss.set(p);
  world.setTheme(bossByKey.get(p.key)!.el);
}

/* ------------------------------------------------------------ đạo diễn camera */
const camPos = new THREE.Vector3(0, 16, 34), camLook = new THREE.Vector3(0, 2, 0);
const wantPos = new THREE.Vector3(), wantLook = new THREE.Vector3();
let focus: { pos: THREE.Vector3; look: THREE.Vector3; until: number; prio: number } | null = null;
function requestFocus(look: THREE.Vector3, dist: number, height: number, ms: number, prio: number, angle?: number) {
  const now = performance.now();
  if (focus && focus.until > now && focus.prio > prio) return;
  if (prio < 99) { dist *= 2.4; height *= 2.2; look = look.clone().setY(look.y * 2.6); }
  const a = angle ?? Math.atan2(camPos.x - look.x, camPos.z - look.z);
  const portrait = innerWidth / innerHeight < 0.8 ? 1.3 : 1;
  focus = { pos: new THREE.Vector3(look.x + Math.sin(a) * dist * portrait, look.y + height, look.z + Math.cos(a) * dist * portrait), look: look.clone(), until: now + ms, prio };
}
function direct(t: number, dt: number) {
  const portrait = innerWidth / innerHeight < 0.8 ? 1.32 : 1;
  const now = performance.now();
  if (focus && focus.until > now) { wantPos.copy(focus.pos); wantLook.copy(focus.look); }
  else {
    focus = null;
    const m = mode.mode;
    if (m === 'boss' && boss) {
      // từ phía nam nhìn chếch xuống: thấy Boss và vòng tu sĩ vây quanh
      const sway = Math.sin(t * 0.07) * 11, r = 42 * portrait;
      wantLook.set(boss.x * 0.5, 4.5, boss.z * 0.5 + 1);
      wantPos.set(sway, 22 + Math.sin(t * 0.1) * 1.5, boss.z + r);
    } else if (m === 'pk1') {
      const fighters = [...cults.values()].filter(c => Math.hypot(c.x, c.z) < 22);   // người xem ngồi ngoài vòng 25 m
      const mid = fighters.reduce((s, c) => s.add(new THREE.Vector3(c.x, 0, c.z)), new THREE.Vector3()).multiplyScalar(1 / Math.max(1, fighters.length));
      wantLook.set(mid.x, 4.5, mid.z);
      wantPos.set(mid.x + Math.sin(t * 0.15) * 6, 12, mid.z + 25 * portrait);
    } else if (m === 'pk3' || m === 'sect') {
      const a = t * 0.05, r = (m === 'sect' ? 42 : 32) * portrait;
      wantLook.set(0, 1.5, 0); wantPos.set(Math.sin(a) * r, m === 'sect' ? 28 : 20, Math.cos(a) * r);
    } else if (m === 'treasure') {
      const a = t * 0.15, r = 30 * portrait;
      wantLook.set(0, 3, 0); wantPos.set(Math.sin(a) * r, 9, Math.cos(a) * r);
    } else {
      const a = t * 0.045, r = 40 * portrait;
      wantLook.set(0, 1.5, 0); wantPos.set(Math.sin(a) * r, 25 + Math.sin(t * 0.08) * 3, Math.cos(a) * r);
    }
  }
  const k = 1 - Math.exp(-dt * (focus ? 2.6 : 1.4));
  camPos.lerp(wantPos, k); camLook.lerp(wantLook, k);
  camera.position.copy(camPos);
  if (fx.shake > 0) camera.position.add(new THREE.Vector3((Math.random() - 0.5) * fx.shake, (Math.random() - 0.5) * fx.shake, (Math.random() - 0.5) * fx.shake));
  camera.lookAt(camLook);
}

/* ------------------------------------------------------------ hiệu ứng từ server */
const tmp = new THREE.Vector3();
function posOf(id: string, out = new THREE.Vector3()): THREE.Vector3 {
  if (id === 'boss' && boss) return out.set(boss.x, boss.height * 0.55, boss.z);
  const c = cults.get(id);
  return c ? c.chest(out) : out.set(0, 1.2, 0);
}
function screen(p: THREE.Vector3) {
  const v = p.clone().project(camera);
  return { x: (v.x + 1) / 2 * innerWidth, y: (1 - v.y) / 2 * innerHeight, ok: v.z < 1 };
}
const SFX_FOR: Partial<Record<Vfx, string>> = { bolt: 'zap', thunder: 'zap', lightdragon: 'zap', flysword: 'launch', swordrain: 'launch', swordarray: 'launch', qiwave: 'boost', slash: 'boost', claw: 'boost',
  fireball: 'boom-0', meteor: 'bomb-low', flamepillar: 'boom-1', firedragon: 'boom-2', dragon: 'boom-2', icefield: 'bomb-crack', quake: 'bomb-low', rockfall: 'bomb-low', shield: 'shield', heal: 'ring', lotus: 'ring', phoenix: 'boom-2', darkbeam: 'warp', demonpalm: 'boom-1', tornado: 'warp' };
let lastSfx = 0;
const BOSS_VFX: Record<Element, [Vfx, Vfx, Vfx]> = {
  ma: ['demonpalm', 'darkbeam', 'bloodwave'], hoa: ['fireball', 'flamepillar', 'meteor'], loi: ['bolt', 'thunder', 'thunder'], bang: ['icearrow', 'icefield', 'icefield'],
  phong: ['qiwave', 'tornado', 'tornado'], kiem: ['claw', 'swordarray', 'swordrain'], quang: ['holybeam', 'lotus', 'holybeam'], tho: ['claw', 'quake', 'rockfall'], long: ['firedragon', 'dragon', 'dragon'],
};
function onFx(f: Fx) {
  const now = performance.now();
  switch (f.k) {
    case 'cast': {
      const from = posOf(f.id), to = f.to ? posOf(f.to) : new THREE.Vector3(f.tx, 1.2, f.tz);
      if (!f.to) { from.set(f.x, 1.3, f.z); to.set(f.tx, 1.2, f.tz); }
      if (f.vfx === 'shield' || f.vfx === 'heal' || f.vfx === 'lotus' || f.vfx === 'holybeam' && !f.to) to.y = 0;
      fx.cast(f.vfx, from, to, ELEMENT_COLORS[f.el as Element] ?? 0xffffff, f.r, f.big);
      if (f.big || now - lastSfx > 90) { lastSfx = now; const s = SFX_FOR[f.vfx]; if (s) sound.play(s, f.big ? 0.9 : 0.35); }
      if (f.big) requestFocus(to.clone().setY(2), 14, 6, 2200, 2);
      break;
    }
    case 'dmg': {
      const p = posOf(f.id, tmp).clone(); p.y += f.boss ? 3 : 0.8; p.x += (Math.random() - 0.5) * (f.boss ? 4 : 0.6);
      const s = screen(p);
      if (s.ok) ui.number(s.x, s.y, f.dodge ? 'Né!' : (f.crit ? '💥' : '') + '-' + Math.round(f.v).toLocaleString('vi-VN'), f.dodge ? 'dodge' : f.crit ? 'crit' : f.boss ? 'boss' : 'dmg');
      if (f.boss) boss?.flash(); else cults.get(f.id)?.flash();
      if (!f.boss && f.by === 'boss') fx.shake = Math.max(fx.shake, 0.15);
      break;
    }
    case 'heal': { const s = screen(posOf(f.id, tmp).clone().setY(2.2)); if (s.ok) ui.number(s.x, s.y, '+' + Math.round(f.v).toLocaleString('vi-VN'), 'heal'); break; }
    case 'down': fx.explode(posOf(f.id, tmp).clone().setY(0.6), 0xffffff, 0.8, { ring: false, shake: 0 }); break;
    case 'gift': {
      ui.gift(f.name, f.av, f.gift, f.count, f.tierName, f.icon, f.xu);
      sound.play(f.xu >= 99 ? 'coin-big' : 'coin', 0.7);
      if (f.global) { fx.flash = 0.7; fx.shake = 1.2; ui.announce(`${f.icon} ${f.tierName.toUpperCase()} ${f.icon}`, `${f.name} chấn động tiên giới!`, '#ffd04a', 4200); sound.chime(true); }
      break;
    }
    case 'break': {
      const c = cults.get(f.id), p = c ? new THREE.Vector3(c.x, 0, c.z) : new THREE.Vector3();
      fx.breakthrough(p, REALM_COLORS[realmOf(f.lv)], f.realm);
      ui.breakthrough(f.name, f.lv, f.realm);
      sound.chime(f.realm);
      if (f.realm) { requestFocus(p.clone().setY(1.6), 8, 2.5, 3800, 4); setTimeout(() => sound.play('zap', 1), 600); }
      break;
    }
    case 'artifact': {
      ui.artifact(f.name, f.art, f.lv, !!f.loot);
      const c = cults.get(f.id); if (c) fx.explode(new THREE.Vector3(c.x, 1.6, c.z), artifactByKey.get(f.art)!.color, 1.2, { ring: false, shake: 0 });
      sound.chime(false);
      break;
    }
    case 'boss': {
      const def = bossByKey.get(f.key)!, color = ELEMENT_COLORS[def.el];
      if (f.ev === 'spawn') { ui.announce(`🐉 ${f.name} XUẤT THẾ`, 'Gõ 1 để vào đánh Boss · Tặng quà tung tuyệt chiêu', hex(def.color2), 4200); sound.play('bomb-low', 1); fx.shake = 1; setTimeout(() => boss && requestFocus(boss.headPos(), 16, 1, 3600, 5, 0), 50); }
      if (f.ev === 'phase') { ui.announce(f.phase === 3 ? `🔥 ${f.name} NỔI GIẬN 🔥` : `⚠️ ${f.name} CUỒNG BẠO`, f.phase === 3 ? 'Giai đoạn 3 · Tuyệt chiêu cuối sắp tới!' : 'Giai đoạn 2 · Đòn diện rộng', f.phase === 3 ? '#ff3b3b' : '#ffb36a', 3200); fx.shake = 1.4; fx.flash = 0.4; sound.play('bomb-low', 1); if (boss) requestFocus(boss.headPos(), 18, 0, 2600, 5, 0); }
      if (f.ev === 'skill' && boss && f.x !== undefined) {
        const target = new THREE.Vector3(f.x, 0.5, f.z), r = f.r ?? 3;
        const idx = Math.max(0, def.skills.indexOf(f.skill ?? '')) as 0 | 1 | 2;
        fx.telegraph(target, Math.min(r, 26), f.ult ? 1.5 : r > 3 ? 0.9 : 0.7);
        if (idx > 0) ui.feed(`🐉 ${f.name}: ${f.skill}`);   // đòn thường không ghi vào dòng tin cho khỏi lặp
        const vfx = BOSS_VFX[def.el][idx], from = boss.headPos();
        setTimeout(() => { fx.cast(vfx, from, target, color, f.ult ? 20 : r, idx > 0); const s = SFX_FOR[vfx]; if (s) sound.play(s, idx ? 1 : 0.6); }, f.ult ? 900 : 350);
        if (f.ult) { ui.announce(`☠️ ${f.skill}`, 'Tuyệt chiêu toàn sân!', '#ff3b3b', 2400); fx.flash = 0.5; requestFocus(new THREE.Vector3(0, 4, 0), 40, 22, 2600, 6, 0); setTimeout(() => { fx.shake = 2; fx.flash = 0.9; }, 1500); }
      }
      if (f.ev === 'die') {
        const killer = f.killer ? cults.get(f.killer) : null;
        ui.announce(`💀 ${f.name} BỊ TIÊU DIỆT`, killer ? 'Đòn kết liễu!' : '', '#ffd04a', 5000);
        if (boss) { const b = boss; for (let i = 0; i < 7; i++) setTimeout(() => fx.explode(new THREE.Vector3(b.x + (Math.random() - 0.5) * 8, 2 + Math.random() * 6, b.z + (Math.random() - 0.5) * 8), i % 2 ? color : 0xffd04a, 3 + i * 0.4, { shake: 1 }), i * 260); requestFocus(b.headPos(), 22, 4, 5000, 7, 0); }
        fx.flash = 0.8; sound.play('bomb-low', 1);
      }
      if (f.ev === 'flee') ui.announce(`${f.name} đã bỏ chạy`, 'Lần sau hợp sức mạnh hơn!', '#c0c8e8');
      break;
    }
    case 'mode': ui.announce(f.title, f.mode === 'tuluyen' ? 'Tĩnh tọa hấp thu linh khí · Gõ 1 tham gia' : '', '#9fe8ff', 2600); world.treasure.visible = f.mode === 'treasure'; sound.setIntensity(f.mode === 'boss' ? 2 : f.mode === 'tuluyen' || f.mode === 'treasure' ? 0 : 1); break;
    case 'pkwin': if (f.side !== undefined) ui.announce(`🏆 ${f.name} THẮNG`, f.pts > 1 ? `+${f.pts} điểm PK` : `đánh bại ${f.loser}`, '#ffd04a', 3400); { const c = cults.get(f.id); c?.setPose('win'); } break;
    case 'join': ui.feed(`🌟 ${f.name} (${f.cls}) bước vào tiên giới`); break;
    case 'sect': ui.feed(`🏯 ${f.name} gia nhập ${sectByKey.get(f.sect)?.name ?? ''}`); break;
    case 'treasure':
      if (f.ev === 'spawn') { world.treasure.visible = true; const a = artifactByKey.get(f.art!)!; ui.announce(`💎 ${a.name} XUẤT THẾ`, 'Gõ “doat” để tranh đoạt!', hex(a.color), 3600); fx.cast('holybeam', new THREE.Vector3(), new THREE.Vector3(0, 0, 0), a.color, 4, true); requestFocus(new THREE.Vector3(0, 2.5, 0), 12, 3, 3000, 3); }
      else { const a = artifactByKey.get(f.art!)!; ui.announce(`${a.icon} ${f.name}`, `đoạt được ${a.name} (cấp ${f.lv})`, hex(a.color), 3400); world.treasure.visible = false; fx.explode(new THREE.Vector3(0, 2, 0), a.color, 3); }
      break;
    case 'vip': {
      // thăng bậc ngoại hình: cột sáng, trận pháp, nổ năng lượng, camera zoom
      const c = cults.get(f.id), p = c ? new THREE.Vector3(c.x, 0, c.z) : new THREE.Vector3(), col = VIP_COLORS[f.tier];
      fx.formation(p, 4, col, 2.4); fx.cast('holybeam', p, p, col, 4, true); setTimeout(() => fx.explode(p.clone().setY(1.4), col, 3, { shake: 0.6 }), 400);
      ui.announce(`👑 THĂNG CẤP ${VIP_NAMES[f.tier].toUpperCase()} 👑`, `${f.name} lột xác, khí chất ngút trời!`, hex(col), 4000);
      sound.chime(true); requestFocus(p.clone().setY(1.6), 7, 2, 3600, 4);
      break;
    }
    case 'reward': ui.feed(`⬆️ ${f.name} +${f.stages} kỳ tu vi (${f.why})`); break;
    case 'voice': sound.voice(f.url); break;
    case 'note': ui.feed(f.text); break;
  }
}

/* ------------------------------------------------------------ mạng */
const net = new Net(LIVE ? 'view' : 'control');
let lastBoards = 0;
net.onState = (s: ServerMessage) => {
  mode = s.mode;
  syncCults(s.cults);
  syncBoss(s.boss);
  for (const f of s.fx) onFx(f);
  if (s.boards) { ui.setBoards(s.boards, Date.now()); lastBoards = Date.now(); }
  if (s.live) ui.setLive(s.live, s.viewers, s.total);
  else if (s.viewers !== undefined) document.getElementById('viewers')!.textContent = `👥 ${s.viewers}${s.total ? ' · ' + s.total + ' tu sĩ' : ''}`;
  if (s.settings) { settings = s.settings; ui.controls(settings); }
  ui.setMode(s.mode, s.boss);
  if (s.hello && s.mode.mode === 'treasure') world.treasure.visible = true;
};
net.onStatus = up => { document.getElementById('offline')!.hidden = up; };
// ?preview=1: xưởng xem 30 mẫu tu sĩ · ?preview=boss: 15 Boss (không nối server)
const PREVIEW = Q.get('preview');
if (PREVIEW) {
  document.getElementById('app')!.style.display = 'none';
  loadedModels.finally(() => {
    if (PREVIEW === 'boss') {
      const i = +(Q.get('i') ?? 0), def = BOSSES[i % BOSSES.length];
      syncBoss({ key: def.key, name: def.name, hp: 1, mhp: 1, phase: 1, x: 0, z: 0, ry: 0.5, p: (Q.get('p') as BossPub['p']) ?? 'idle', tgt: '' });
      requestFocus(new THREE.Vector3(0, 5, 0), +(Q.get('d') ?? 26), 4, 1e9, 99, 0.6); camPos.copy(focus!.pos); camLook.copy(focus!.look);
    } else {
      const poses = ['idle', 'atk', 'cast', 'med', 'move', 'win'] as const;
      ARCHETYPES.forEach((a, i) => { const c = new Cultivator(a.id, { vip: Q.has('vip') ? i % 6 : 0 }); const col = i % 10, row = Math.floor(i / 10); c.x = c.tx = (col - 4.5) * 2.2; c.z = c.tz = (row - 1) * 3.2; c.ry = c.tRy = 0; c.setInfo(a.name, i * 2, '', false); c.setPose(poses[+(Q.get('pose') ?? 0) % poses.length]); c.setArtifacts(i % 3 ? '' : 'phikiem:3,longchau:2'); scene.add(c.root); cults.set('p' + i, c); });
      if (Q.has('debug')) setInterval(() => { const c0 = [...cults.values()][0] as unknown as { glb?: { info(): string } }; let d = document.getElementById('glbInfo'); if (!d) { d = document.createElement('div'); d.id = 'glbInfo'; d.style.cssText = 'position:fixed;left:8px;bottom:40px;z-index:99;color:#ff0;background:#000a;font:13px monospace;padding:4px 8px'; document.body.append(d); } d.textContent = c0?.glb?.info() ?? 'không có glb'; }, 500);
      requestFocus(new THREE.Vector3(+(Q.get('cx') ?? 0), 1.2, +(Q.get('cz') ?? 0)), +(Q.get('d') ?? 17), +(Q.get('h') ?? 3.5) * 0.4, 1e9, 99, 0);
      camPos.copy(focus!.pos); camLook.copy(focus!.look);
    }
  });
} else loadedModels.finally(() => net.connect());
void lastBoards;

/* ------------------------------------------------------------ âm thanh, điều khiển */
const unlockEl = document.getElementById('unlock')!;
unlockEl.hidden = false;
const unlock = () => { sound.unlock(); unlockEl.hidden = true; };
addEventListener('pointerdown', unlock); addEventListener('keydown', unlock); addEventListener('click', unlock); unlockEl.onclick = unlock;
const sBtn = document.getElementById('soundBtn')!, mBtn = document.getElementById('musicBtn')!;
sBtn.onclick = () => { sound.setMuted(!sound.muted); sBtn.textContent = sound.muted ? '🔇' : '🔈'; };
mBtn.onclick = () => { sound.setMusic(!sound.musicOn); mBtn.style.opacity = sound.musicOn ? '1' : '.4'; };

if (!LIVE) {
  const sim = document.getElementById('sim')!; sim.hidden = false;
  const send = (m: ControlMessage) => net.send(m);
  document.getElementById('simToggle')!.onclick = () => document.getElementById('simBody')!.classList.toggle('hide');
  const NAMES = ['Tiểu Long Nữ', 'Lý Tiêu Dao', 'Hoa Thiên Cốt', 'Bạch Tử Họa', 'Thanh Vân Kiếm', 'Mộ Dung Phục', 'Trương Vô Kỵ', 'Lăng Thiên', 'Phong Thanh Dương', 'Cố Thanh Hoan', 'Diệp Thần', 'Tô Mạt'];
  const who = document.getElementById('simWho') as HTMLSelectElement;
  who.innerHTML = NAMES.map(n => `<option>${n}</option>`).join('');
  const cur = () => ({ id: who.value, name: who.value });
  const $i = (id: string) => document.getElementById(id) as HTMLInputElement;
  document.getElementById('ttConnect')!.onclick = () => send({ t: 'ctl', cmd: 'connect', user: $i('ttUser').value });
  document.getElementById('ttDisconnect')!.onclick = () => send({ t: 'ctl', cmd: 'disconnect' });
  let joinN = 0;
  document.getElementById('simJoin')!.onclick = () => { for (let i = 0; i < 5; i++) { const n = NAMES[joinN++ % NAMES.length] + (joinN > NAMES.length ? ' ' + Math.ceil(joinN / NAMES.length) : ''); send({ t: 'sim', kind: 'comment', id: n, name: n, text: '1' }); } };
  document.getElementById('simLike')!.onclick = () => send({ t: 'sim', kind: 'like', ...cur(), count: 30 });
  const say = (text: string) => send({ t: 'sim', kind: 'comment', ...cur(), text });
  document.getElementById('simSend')!.onclick = () => { say($i('simText').value || '1'); $i('simText').value = ''; };
  $i('simText').onkeydown = e => { if (e.key === 'Enter') document.getElementById('simSend')!.click(); };
  document.getElementById('simQuick')!.innerHTML = ['1', 'kiem', 'phap', 'ma', 'tien nu', 'long', 'tong 1', 'tong 2', 'pk', 'doat'].map(t => `<button data-say="${t}">${t}</button>`).join('');
  document.getElementById('simQuick')!.onclick = e => { const b = (e.target as HTMLElement).closest('[data-say]') as HTMLElement | null; if (b) say(b.dataset.say!); };
  document.getElementById('simGifts')!.innerHTML = GIFT_TIERS.map(g => `<button data-xu="${g.xu}" title="${g.desc}">${g.icon} ${g.xu}</button>`).join('') + '<button data-xu="1" data-n="10">🌹 x10</button>';
  document.getElementById('simGifts')!.onclick = e => { const b = (e.target as HTMLElement).closest('[data-xu]') as HTMLElement | null; if (b) send({ t: 'sim', kind: 'gift', ...cur(), gift: GIFT_TIERS.find(g => g.xu === +b.dataset.xu!)?.name ?? 'Quà', diamonds: +b.dataset.xu!, count: +(b.dataset.n ?? 1) }); };
  for (const b of document.querySelectorAll<HTMLElement>('[data-mode]')) b.onclick = () => send({ t: 'ctl', cmd: b.dataset.mode as 'next' });
  $i('setVoice').onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { voice: $i('setVoice').checked } });
  $i('setNpc').onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { npcs: +$i('setNpc').value } });
  document.getElementById('clearSim')!.onclick = () => send({ t: 'ctl', cmd: 'clearSim' });
  (document.getElementById('openLive') as HTMLAnchorElement).onclick = e => { e.preventDefault(); window.open('/?live=1', 'tutien_live', 'popup,width=540,height=960'); };
}

/* ------------------------------------------------------------ vòng vẽ */
const clock = new THREE.Clock();
let t = 0;
function frame() {
  const dt = Math.min(0.05, clock.getDelta()); t += dt; uTime.value = t;
  world.update(dt, t);
  for (const c of cults.values()) c.update(dt, t, camera);
  boss?.update(dt, t, camera);
  fx.update(dt, t);
  direct(t, dt);
  sound.update();
  (document.getElementById('flash')!.style as CSSStyleDeclaration).opacity = (fx.flash * 0.55).toFixed(3);
  if (bloom) bloom.strength = 0.28 + fx.flash * 0.6;
  if (composer) composer.render(); else renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
void bossPub;
