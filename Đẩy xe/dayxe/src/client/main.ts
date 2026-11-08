import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { LIKE_M, LIKE_STEP, TEAMS, TIERS } from '../shared/game.ts';
import type { PushFx, Team } from '../shared/game.ts';
import type { Boards, ControlMessage, Fx, Round, ServerMessage } from '../shared/types.ts';
import { Sound } from './audio.ts';
import { GlbActor, hasModel, loadModels, modelsWith, templateScene } from './glb.ts';
import { Net } from './net.ts';
import { FX } from './fx.ts';
import { CAR_LEN, Car, World, WL, ground } from './scene.ts';

const Q = new URLSearchParams(location.search);
const LIVE = Q.has('live'), LITE = Q.has('lite');
document.body.classList.toggle('live', LIVE);
const $ = (id: string) => document.getElementById(id)!;
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const fmt = (m: number) => Math.round(m).toLocaleString('vi-VN');

/* ------------------------------------------------------------ dựng cảnh */
const renderer = new THREE.WebGLRenderer({ canvas: $('scene') as HTMLCanvasElement, antialias: !LITE });
renderer.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0; renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = !LITE; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.3, 1500);
const world = new World(scene, LITE);
// môi trường phản chiếu cho vật liệu PBR (sơn xe, kim loại, vảy rồng sáng bóng, nét hơn)
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.18;
let composer: EffectComposer | null = null;
if (!LITE) { const rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, { samples: 4, type: THREE.HalfFloatType }); composer = new EffectComposer(renderer, rt); composer.addPass(new RenderPass(scene, camera)); composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.28, 0.3, 0.95)); composer.addPass(new OutputPass()); }
const portrait = () => innerWidth / innerHeight < 0.8;
function uiScale() { const base = portrait() ? 540 : 1280; document.documentElement.style.setProperty('--z', String(Math.max(0.75, Math.min(3, innerWidth / base)))); }
function resize() { uiScale(); renderer.setSize(innerWidth, innerHeight, false); composer?.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.fov = portrait() ? 58 : 42; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const sound = new Sound();

/* ------------------------------------------------------------ hạt: bụi, khói, lửa, pháo hoa */
class Particles {
  N = 6000; i = 0; pos = new Float32Array(this.N * 3); col = new Float32Array(this.N * 3); vel = new Float32Array(this.N * 3); life = new Float32Array(this.N); grav = new Float32Array(this.N);
  geo = new THREE.BufferGeometry(); points: THREE.Points; tex: THREE.Texture;
  constructor(size = 0.55, additive = true) {
    const tex = this.tex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d')!; const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3)); this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.points = new THREE.Points(this.geo, new THREE.PointsMaterial({ size, map: tex, vertexColors: true, transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, opacity: additive ? 1 : 0.75 }));
    this.points.frustumCulled = false; scene.add(this.points);
    for (let k = 0; k < this.N; k++) this.pos[k * 3 + 1] = -999;
  }
  emit(p: THREE.Vector3, v: THREE.Vector3, c: THREE.Color, life: number, grav = 0) {
    const k = this.i = (this.i + 1) % this.N;
    this.pos.set([p.x, p.y, p.z], k * 3); this.vel.set([v.x, v.y, v.z], k * 3); this.col.set([c.r, c.g, c.b], k * 3); this.life[k] = life; this.grav[k] = grav;
  }
  burst(p: THREE.Vector3, c: THREE.Color, n: number, sp: number, grav = -6) { for (let j = 0; j < n; j++) this.emit(p, new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.3, Math.random() - 0.5).normalize().multiplyScalar(sp * (0.4 + Math.random())), c, 0.7 + Math.random() * 0.8, grav); }
  update(dt: number) {
    for (let k = 0; k < this.N; k++) {
      if (this.life[k] <= 0) continue;
      this.life[k] -= dt;
      if (this.life[k] <= 0) { this.pos[k * 3 + 1] = -999; continue; }
      this.vel[k * 3 + 1] += this.grav[k] * dt;
      for (let a = 0; a < 3; a++) this.pos[k * 3 + a] += this.vel[k * 3 + a] * dt;
    }
    this.geo.attributes.position.needsUpdate = true; this.geo.attributes.color.needsUpdate = true;
  }
}
const sparks = new Particles(0.75, true);          // lửa, tia sáng, pháo hoa
const dust = new Particles(1.4, false);           // bụi đất, khói
const C = (hex: string | number) => new THREE.Color(hex);

/* ------------------------------------------------------------ ảnh đại diện → huy hiệu nổi trên đầu */
const avatars = new Map<string, Promise<HTMLImageElement | null>>();
function avatarOf(id: string) {
  let p = avatars.get(id);
  if (!p) { p = new Promise(res => { const im = new Image(); const to = setTimeout(() => res(null), 3000); im.onload = () => { clearTimeout(to); res(im); }; im.onerror = () => { clearTimeout(to); res(null); }; im.src = '/avatar/' + encodeURIComponent(id); }); avatars.set(id, p); }
  return p;
}
function badgeSprite(id: string, name: string, team: Team, big = false) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 300; const g = c.getContext('2d')!, col = TEAMS[team].color;
  const draw = (im: HTMLImageElement | null) => {
    g.clearRect(0, 0, 256, 300);
    g.save(); g.shadowColor = col; g.shadowBlur = 26; g.fillStyle = col; g.beginPath(); g.arc(128, 112, 104, 0, Math.PI * 2); g.fill(); g.restore();
    g.fillStyle = '#fff'; g.beginPath(); g.arc(128, 112, 92, 0, Math.PI * 2); g.fill();
    g.save(); g.beginPath(); g.arc(128, 112, 84, 0, Math.PI * 2); g.clip();
    if (im) g.drawImage(im, 44, 28, 168, 168); else { g.fillStyle = TEAMS[team].dark; g.fillRect(40, 20, 180, 180); g.fillStyle = '#fff'; g.font = '900 100px Arial Black, Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText((name[0] ?? '?').toUpperCase(), 128, 120); }
    g.restore();
    g.font = '900 34px "Segoe UI", Arial'; g.textAlign = 'center'; g.lineJoin = 'round';
    const nm = name.length > 12 ? name.slice(0, 11) + '…' : name;
    g.lineWidth = 9; g.strokeStyle = '#000'; g.strokeText(nm, 128, 262); g.fillStyle = '#fff'; g.fillText(nm, 128, 262);
    tex.needsUpdate = true;
  };
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  draw(null); void avatarOf(id).then(im => { if (im) draw(im); });
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  s.scale.set(big ? 4.4 : 3.4, big ? 5.1 : 4, 1); s.renderOrder = 10;
  return s;
}
function textSprite(text: string, color: string, h = 1.4) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128; const g = c.getContext('2d')!;
  g.font = '900 86px "Arial Black", Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round';
  g.lineWidth = 16; g.strokeStyle = '#000'; g.strokeText(text, 256, 66); g.fillStyle = color; g.fillText(text, 256, 66);
  g.fillStyle = 'rgba(255,255,255,.5)'; g.fillRect(0, 0, 0, 0);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true })); s.scale.set(h * 4, h, 1); s.renderOrder = 11;
  return s;
}

/* ------------------------------------------------------------ xe */
// hai xe đấu đầu nhau: carX là điểm tì cản của hai xe (chính là vị trí xe của server). Xe Đỏ bên trái hướng sang phải, Xe Xanh bên phải hướng sang trái.
const cars: Record<Team, Car> = { do: new Car('do'), xanh: new Car('xanh') };
scene.add(cars.do.root, cars.xanh.root);
const HALF = CAR_LEN / 2;
const carCenter = (team: Team) => carX - TEAMS[team].dir * (HALF + 0.02);       // tâm xe của phe (lệch ra sau điểm tì)
const rearX = (team: Team) => carX - TEAMS[team].dir * (CAR_LEN + 0.1);        // đuôi xe của phe (chỗ người đẩy, tên lửa)
let carX = 0, carV = 0, hopY = 0, hopV = 0, target = 0, round: Round | null = null, strain = 0;
const toX = (pos: number, track: number) => pos / track * WL;
function hop(v: number) { if (hopY < 0.05) hopV = Math.max(hopV, v); }
// vết lốp trượt trên đường (xe bị đẩy lùi để lại), dùng lại một bể mảnh nhỏ
const skidG = new THREE.PlaneGeometry(0.5, 0.42); skidG.rotateX(-Math.PI / 2);
const skids: { m: THREE.Mesh; life: number }[] = [];
function skid(x: number, z: number) {
  let s = skids.find(k => k.life <= 0);
  if (!s) { if (skids.length >= 240) s = skids.reduce((p, q) => (p.life < q.life ? p : q)); else { s = { m: new THREE.Mesh(skidG, new THREE.MeshBasicMaterial({ color: 0x2a1a10, transparent: true, opacity: 0.5, depthWrite: false })), life: 0 }; scene.add(s.m); skids.push(s); } }
  s.m.position.set(x, 0.025, z); s.life = 7; (s.m.material as THREE.MeshBasicMaterial).opacity = 0.5;
}
function tickCar(dt: number, t: number) {
  // lò xo tắt dần kéo điểm tì về vị trí server: cú đẩy mạnh thì hai xe lao nhanh rồi chậm dần
  const a = (target - carX) * 3.2 - carV * 2.6;
  carV = THREE.MathUtils.clamp(carV + a * dt, -70, 70); carX += carV * dt;
  hopV -= 30 * dt; hopY = Math.max(0, hopY + hopV * dt); if (hopY === 0 && hopV < 0) { if (hopV < -6) { dust.burst(new THREE.Vector3(carX, 0.3, 0), C(0x9a7a5a), 30, 5, 1); sound.thud(0.4); } hopV = 0; }
  const sp = Math.abs(carV), push: Team | null = sp > 0.6 ? (carV > 0 ? 'do' : 'xanh') : null;
  strain = Math.min(1, Math.max(0, strain + (sp > 0.6 ? dt * 3 : -dt * 1.5)));
  for (const team of ['do', 'xanh'] as const) {
    const c = cars[team], dir = TEAMS[team].dir, winning = push === team, losing = push !== null && !winning;
    c.root.position.set(carCenter(team), hopY * (winning ? 1 : 0.6), 0);
    // xe đang đẩy: chúi đầu bám đường; xe bị đẩy: chổng đầu lên, rung mạnh hơn (rotation.z dương = ngóc đầu theo hệ của xe)
    const pitch = winning ? -0.03 - Math.min(0.04, sp * 0.002) : losing ? 0.04 + Math.min(0.05, sp * 0.002) : 0;
    c.root.rotation.z = pitch + (hopY > 0 ? Math.sin(t * 6 + dir) * 0.03 : 0);
    c.body.position.y = Math.sin(t * (losing ? 40 : 24) + dir) * (0.012 + strain * 0.012) + (losing ? 0.02 : 0);
    // bánh xe: xe thắng quay nhanh hơn tốc độ thật (trượt bốc bụi), xe thua lăn lùi chậm hơn (bị kéo lết, để vết lốp), giằng co thì quay tại chỗ
    const along = carV * dir;
    const wheelV = winning ? along + 6 + sp * 0.4 : losing ? along * 0.35 : 2.5 + Math.sin(t * 3 + dir) * 1.5;
    for (const w of c.wheels) w.rotation.z -= wheelV * dt / 0.62;
    const spray = winning ? 1 : losing ? 0.8 : 0.3;
    if (Math.random() < spray * 0.9) for (const rw of c.rearWheels) { const p = c.root.localToWorld(rw.clone()); dust.emit(p, new THREE.Vector3(-dir * (1.5 + Math.random() * (winning ? 5 : 2)), 0.6 + Math.random() * 1.6, (Math.random() - 0.5) * 1.4), C(losing ? 0x9a9aa0 : 0xb08a62), 0.8 + Math.random() * 0.6, -0.6); }
    if (losing && sp > 1.5 && Math.random() < 0.7) for (const w of [...c.rearWheels, ...c.rearWheels.map(v => v.clone().setX(-v.x))]) { const p = c.root.localToWorld(w.clone()); skid(p.x, p.z); }
    if (Math.random() < 0.12 + sp * 0.02) for (const e of c.exhaust) { const p = c.root.localToWorld(e.clone()); dust.emit(p, new THREE.Vector3(-dir * (1 + Math.random()), 0.8 + Math.random(), (Math.random() - 0.5) * 0.5), C(0x8a8a90), 0.9, 0.5); }
  }
  // tia lửa ở chỗ hai cản tì nhau
  if (Math.random() < 0.15 + sp * 0.05) sparks.emit(new THREE.Vector3(carX, 0.95 + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 1.8), new THREE.Vector3((Math.random() - 0.5) * 4, 2 + Math.random() * 3, (Math.random() - 0.5) * 4), C(0xffd070), 0.35, -9);
  for (const k of skids) if (k.life > 0) { k.life -= dt; (k.m.material as THREE.MeshBasicMaterial).opacity = Math.max(0, k.life / 7) * 0.5; if (k.life <= 0) k.m.position.y = -5; }
  sound.engine = Math.min(1, 0.25 + sp / 25);
}

/* ------------------------------------------------------------ người đẩy xe (đồ đua màu phe, dùng cho tim / follow / chia sẻ) */
const HUMAN_H = 2.5;
const crewOf = (team: Team) => modelsWith('tho-' + team + '-');
class Pusher {
  root = new THREE.Group(); lean = new THREE.Group(); actor: GlbActor | null = null; badge: THREE.Sprite;
  t = 0; dead = false; dx: number; z: number; team: Team; dir: 1 | -1; life: number; native = false;
  constructor(id: string, name: string, team: Team, life: number, slot: number) {
    this.team = team; this.dir = TEAMS[team].dir; this.life = life;
    this.dx = 3.0 + slot * 1.5; this.z = [0.9, -0.7, 1.9, -1.5][slot % 4];
    this.root.add(this.lean); scene.add(this.root);
    const crew = crewOf(team);
    if (crew.length) { this.native = true; this.actor = new GlbActor(crew[Math.floor(Math.random() * crew.length)], HUMAN_H); this.actor.play('run'); this.lean.add(this.actor.root); this.actor.root.traverse(o => { if ((o as THREE.Mesh).isMesh) o.castShadow = true; }); }
    else { const m = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 1.3, 6, 12), new THREE.MeshStandardMaterial({ color: TEAMS[team].color })); m.position.y = HUMAN_H / 2; this.lean.add(m); }
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.75, 32), new THREE.MeshBasicMaterial({ color: TEAMS[team].color, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; this.root.add(ring);
    this.badge = badgeSprite(id, name, team); this.badge.position.y = HUMAN_H + 1.3; this.root.add(this.badge);
    this.root.rotation.y = this.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
  }
  update(dt: number, t: number) {
    this.t += dt;
    const hx = rearX(this.team) - this.dir * (this.dx - 1.6), enter = Math.min(1, this.t / 0.4), e = enter * enter * (3 - 2 * enter);
    this.root.position.set(hx - this.dir * 6 * (1 - e), 0, this.z);
    if (this.actor) this.actor.play(winFx?.team === this.team ? 'cheer' : enter < 1 ? 'run' : 'push');
    this.lean.rotation.x = this.native ? 0 : 0.38 + Math.sin(t * 9) * 0.05;
    const out = this.t > this.life ? Math.min(1, (this.t - this.life) / 0.4) : 0;
    this.root.scale.setScalar(1 - out * 0.95);
    this.actor?.update(dt * (1 + Math.min(1, Math.abs(carV) / 20)));
    if (Math.random() < dt * 8) dust.emit(new THREE.Vector3(this.root.position.x - this.dir * 0.3, 0.1, this.z), new THREE.Vector3(-this.dir * (1 + Math.random() * 2), 0.6 + Math.random(), Math.random() - 0.5), C(0xb08a62), 0.7, -0.5);
    if (out >= 1) { this.dead = true; sparks.burst(this.root.position.clone().setY(1.2), C(TEAMS[this.team].color), 20, 3); this.root.removeFromParent(); this.actor?.dispose(); }
  }
}
const pushers: Pusher[] = [];
function slotFor(team: Team) { const used = new Set(pushers.filter(p => p.team === team && !p.dead).map(p => Math.round((p.dx - 3) / 1.5))); for (let s = 0; s < 6; s++) if (!used.has(s)) return s; return 5; }
function addPusher(id: string, name: string, team: Team, life: number) {
  const mine = pushers.filter(p => p.team === team && !p.dead);
  if (mine.length >= 4) { const old = mine.sort((a, b) => b.t - a.t)[0]; old.life = Math.min(old.life, old.t); }
  const p = new Pusher(id, name, team, life, slotFor(team)); pushers.push(p); return p;
}

/* ------------------------------------------------------------ hiệu ứng chung */
interface Effect { t: number; dur: number; update(dt: number, k: number): void; end?(): void }
const effects: Effect[] = [];
const fx = new FX(scene);
let shake = 0, punch = 0, timeScale = 1, slowLeft = 0;
const flash = (a: number, color = '#ffffff') => { const f = $('flash'); f.style.background = color; f.style.transition = 'none'; f.style.opacity = String(a); void f.offsetWidth; f.style.transition = 'opacity .5s'; f.style.opacity = '0'; };
const slowmo = (sec: number) => { slowLeft = Math.max(slowLeft, sec); };
// sắc trời theo quà lớn (bão ngọc, hoàng hôn lửa, tím vàng)
const moodC = new THREE.Color(), moodState = { k: 0, want: 0, until: 0 };
function mood(color: number, sec: number, k = 0.75) { moodC.set(color); moodState.want = k; moodState.until = performance.now() + sec * 1000; }
// thẻ quà lớn giữa màn hình (ảnh đại diện, tên quà, số mét)
function giftCard(f: Extract<Fx, { k: 'push' }>, level: number) {
  const el = $('giftcard'), T = TEAMS[f.team];
  el.className = 'lv' + level; el.style.setProperty('--c', T.color);
  el.innerHTML = `<div class="rays"></div><div class="av">${avImg(f.id, f.name)}</div><div class="nm">@${esc(f.name)}</div><div class="tt">${esc(f.icon)} ${esc(f.tier)}</div><div class="mm">${T.dir > 0 ? '' : '◀ '}+${fmt(f.m)}m${T.dir > 0 ? ' ▶' : ''}</div>`;
  el.hidden = false; void el.offsetWidth; el.classList.add('on');
  clearTimeout((el as unknown as { _t: number })._t); (el as unknown as { _t: number })._t = window.setTimeout(() => { el.classList.remove('on'); setTimeout(() => { el.hidden = true; }, 400); }, 1800 + level * 500);
}
// gió: vệt khí trắng thổi theo hướng đẩy
let lastGust = 0;
function wind(p: THREE.Vector3, dir: number, n: number, spread = 1.5, speed = 14) {
  const now = performance.now();
  if (now - lastGust > 200 && fx.glb('fx-gio', { at: p.clone().add(new THREE.Vector3(0, (Math.random() - 0.5) * spread * 0.5, (Math.random() - 0.5) * spread * 0.5)), vel: new THREE.Vector3(dir * speed, 0, 0), dur: 0.9, scale: [0.45, 0.6 + spread * 0.15], sx: 1.2, rotY: dir > 0 ? 0 : Math.PI, opacity: 0.85, speed: 1.6 })) lastGust = now;
  for (let i = 0; i < Math.ceil(n / 2); i++) sparks.emit(p.clone().add(new THREE.Vector3((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread)), new THREE.Vector3(dir * speed * (0.7 + Math.random() * 0.6), (Math.random() - 0.3), (Math.random() - 0.5)), C(0x8aa8c8), 0.4, 0);
}
const fire = (p: THREE.Vector3, v: THREE.Vector3, n: number, life = 0.6) => { for (let i = 0; i < n; i++) sparks.emit(p, v.clone().add(new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3)), C(Math.random() < 0.35 ? 0xffe066 : Math.random() < 0.6 ? 0xff7a1a : 0xff3a1a), life * (0.6 + Math.random() * 0.6), 0); };

/* ------------------------------------------------------------ linh vật / phương tiện triệu hồi */
// Mỗi quà một linh vật GLB (AnimationMixer phát clip), xuất hiện đúng phía xe của người tặng, sống đúng thời gian lực đẩy của quà
// rồi tự huỷ (gỡ khỏi cảnh, dừng mixer). Linh vật bay cao hoặc ở làn sau (z âm) để không che xe.
interface Summon { t: number; dur: number; team: Team; update(dt: number, t: number, k: number): void; end(): void }
const summons: Summon[] = [];
function creature(name: string, h: number, clip: string, scale = 1) {
  const holder = new THREE.Group(); let actor: GlbActor | null = null;
  if (hasModel(name)) { actor = new GlbActor(name, h); actor.root.scale.multiplyScalar(scale); actor.play(clip); holder.add(actor.root); actor.root.traverse(o => { if ((o as THREE.Mesh).isMesh) o.castShadow = true; }); }
  else holder.add(new THREE.Mesh(new THREE.IcosahedronGeometry(Math.max(1, h * 0.4), 1), new THREE.MeshStandardMaterial({ color: 0xffd23a, emissive: 0x553300, flatShading: true })));
  scene.add(holder); return { holder, actor };
}
const PET_K = 1.4;                       // linh vật to hơn chút cho dễ nhìn khi camera xa
let lastPet: THREE.Object3D | null = null;
const facing = (dir: number) => (dir > 0 ? Math.PI / 2 : -Math.PI / 2);
function summon(f: Extract<Fx, { k: 'push' }>, s: { model: string; h: number; clip: string; scale?: number; badgeY: number; dur?: number; aura?: { name: string; y: number; scale: number; tint?: number }; tick(o: { holder: THREE.Group; actor: GlbActor | null }, k: number, dt: number, t: number, el: number): void; done?(o: { holder: THREE.Group; actor: GlbActor | null }): void }) {
  const o = creature(s.model, s.h * PET_K, s.clip, (s.scale ?? 1) * (s.h ? 1 : PET_K)), dir = TEAMS[f.team].dir; lastPet = o.holder;
  o.holder.rotation.y = facing(dir);
  const badge = badgeSprite(f.id, f.name, f.team, f.xu >= 99); badge.position.y = s.badgeY * PET_K + 2; o.holder.add(badge);
  if (f.xu >= 10) fx.glb('fx-phap-tran', { at: new THREE.Vector3(rearX(f.team) - dir * 2, 0.06, -1.6), dur: Math.min(3.2, s.dur ?? f.dur), scale: [0.7, 1.1 + Math.min(1.6, f.xu / 250)], tint: TEAMS[f.team].color });
  if (s.aura) { const a = s.aura; fx.glb(a.name, { at: () => o.holder.position.clone().add(new THREE.Vector3(0, a.y, 0)), dur: s.dur ?? f.dur, scale: a.scale, tint: a.tint }); }
  let el = 0;
  summons.push({ t: 0, dur: s.dur ?? f.dur, team: f.team, update(dt, t, k) { el += dt; o.actor?.update(dt); s.tick(o, k, dt, t, el); badge.material.opacity = k > 0.9 ? 1 - (k - 0.9) / 0.1 : 1; },
    end() { s.done?.(o); o.holder.removeFromParent(); o.actor?.dispose(); badge.material.map?.dispose(); badge.material.dispose(); } });
  return o;
}
const ease = (x: number) => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
let planes = 0;

const SUMMON: Record<Exclude<PushFx, 'push'>, (f: Extract<Fx, { k: 'push' }>) => void> = {
  // 1 xu · Thỏ vàng chạy sau xe, quạt gió đẩy xe
  tho: f => { const dir = TEAMS[f.team].dir; sound.play('coin', 0.5);
    summon(f, { model: 'tho-vang', h: 2.3, clip: 'run', badgeY: 3.9, tick: (o, k, _dt, t) => {
      const e = ease(k * 6), x = rearX(f.team) - dir * (1.6 + Math.sin(t * 3) * 0.3) - dir * 16 * (1 - e);
      o.holder.position.set(x, Math.abs(Math.sin(t * 9)) * 0.45, 0); o.holder.scale.setScalar(k > 0.9 ? 1 - (k - 0.9) * 9 : 1);
      if (Math.random() < 0.7) wind(new THREE.Vector3(x + dir * 0.8, 1.1, 0), dir, 2, 1, 11);
      if (Math.random() < 0.4) sparks.emit(new THREE.Vector3(x, 0.8, 0), new THREE.Vector3(-dir * 2, 1.5, 0), C(0xffd23a), 0.6, -2);
    }, done: o => sparks.burst(o.holder.position.clone().setY(1), C(0xffd23a), 30, 4) }); },
  // 5 xu · Đại bàng sà xuống qua đầu xe rồi vút lên, kéo theo luồng gió
  daibang: f => { const dir = TEAMS[f.team].dir; sound.play('warp', 0.6);
    summon(f, { model: 'dai-bang', h: 3.8, clip: 'fly', badgeY: 3.6, tick: (o, k) => {
      const e = ease(k * 5), out = k > 0.85 ? (k - 0.85) / 0.15 : 0, x = rearX(f.team) - dir * (3.2 + 22 * (1 - e)) + dir * out * 30, y = 3.2 + 9 * (1 - e) + out * 14 + Math.sin(k * 30) * 0.3, z = 0;
      o.holder.position.set(x, y, z); o.holder.rotation.z = -dir * 0.25 * Math.cos(Math.PI * k);
      wind(new THREE.Vector3(x, y - 0.5, z), dir, 3, 2, 16);
      if (y < 5 && Math.random() < 0.6) for (let i = 0; i < 3; i++) dust.emit(new THREE.Vector3(x + (Math.random() - 0.5) * 4, 0.2, (Math.random() - 0.5) * 8), new THREE.Vector3(dir * (6 + Math.random() * 6), 1 + Math.random() * 2, (Math.random() - 0.5) * 2), C(0xb08a62), 1, -1);
    } }); },
  // 10 xu · Rồng con bay theo xe, truyền năng lượng xanh ngọc vào đuôi xe
  rongcon: f => { const dir = TEAMS[f.team].dir; sound.play('shield', 0.6); fx.ring(rearX(f.team), 0, 0x3affb0, 5);
    summon(f, { model: 'rong-con', h: 2.2, clip: 'fly', badgeY: 2.6, tick: (o, k, _dt, t) => {
      const e = ease(k * 5), x = rearX(f.team) - dir * 3.8, y = 3.2 + Math.sin(t * 2.2) * 0.4 + 12 * (1 - e) + (k > 0.9 ? (k - 0.9) * 120 : 0);
      o.holder.position.set(x, y, 0);
      if (e > 0.9) { const p = o.holder.position.clone().add(new THREE.Vector3(dir * 1.5, -0.4, 0)), to = new THREE.Vector3(rearX(f.team), 1.2, 0), v = to.sub(p).multiplyScalar(1.8); for (let i = 0; i < 3; i++) sparks.emit(p, v.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2)), C(Math.random() < 0.5 ? 0x3affb0 : 0xbfffe8), 0.55, 0); }
      if (Math.random() < 0.05) fx.light(new THREE.Vector3(x, 2, 0), 0x3affb0, 25, 0.4);
    } }); },
  // 30 xu · Máy bay mini bay ngang sân, cánh quạt quay, kéo khói và gió
  maybay: f => { const dir = TEAMS[f.team].dir; planes++; sound.play('boost', 0.6); giftCard(f, 1);
    let tip: THREE.Vector3 | null = null; fx.trail(() => tip, 0xffffff, 0.35, f.dur);
    summon(f, { model: 'may-bay-mini', h: 0, clip: 'fly', scale: 1.15, badgeY: 2.6, tick: (o, k, _dt, t) => {
      const e = ease(k * 4), out = k > 0.85 ? (k - 0.85) / 0.15 : 0, x = rearX(f.team) - dir * (4.5 + 40 * (1 - e)) + dir * out * 40, y = 2.6 + Math.sin(t * 1.6) * 0.3 + out * 10;
      o.holder.position.set(x, y, 0); tip = o.holder.position.clone().add(new THREE.Vector3(-dir * 3, 0, 0));
      if (Math.random() < 0.5) dust.emit(tip, new THREE.Vector3(-dir * 2, 0.3, 0), C(0xdddde4), 1.6, 0.2);
      wind(new THREE.Vector3(x - dir * 1, y - 1.5, -2), dir, 2, 2.5, 18);
    }, done: () => { planes--; } }); },
  // 50 xu · Phượng hoàng hiện trên xe, vỗ cánh, hào quang lửa
  phuong: f => { const dir = TEAMS[f.team].dir; sound.play('warp', 0.8); giftCard(f, 1);
    fx.pillar(carCenter(f.team), -2.5, 0xff8a20, 2.4, 1.6); fx.light(new THREE.Vector3(carCenter(f.team), 6, 0), 0xff8a20, 80, 1.2);
    summon(f, { model: 'phuong-hoang', h: 5, clip: 'fly', badgeY: 4.6, aura: { name: 'fx-lua', y: -1.2, scale: 1.5 }, tick: (o, k, _dt, t) => {
      const e = ease(k * 5), x = rearX(f.team) - dir * 3, y = 4 + Math.sin(t * 2) * 0.4 + (1 - e) * 10 + (k > 0.88 ? (k - 0.88) * 90 : 0);
      o.holder.position.set(x, y, 0);
      fire(new THREE.Vector3(x + (Math.random() - 0.5) * 4, y + (Math.random() - 0.5) * 2, -3), new THREE.Vector3(0, 1.5, 0), 4, 0.5);
      if (Math.random() < 0.5) sparks.emit(new THREE.Vector3(x + (Math.random() - 0.5) * 5, y, -3), new THREE.Vector3((Math.random() - 0.5) * 2, -2, 0), C(0xffb040), 1.4, -3);      // lông lửa rơi
      if (e > 0.9) fire(new THREE.Vector3(x, y - 1, -3), new THREE.Vector3(rearX(f.team) - x, 1 - y, 3).multiplyScalar(1.6), 3, 0.5);
      if (Math.random() < 0.08) fx.light(new THREE.Vector3(x, y, -1), 0xff7a1a, 40, 0.3);
    } }); },
  // 69 xu · Rồng vàng bay dọc sân đấu, uốn thân, kéo vệt vàng
  rongvang: f => { const dir = TEAMS[f.team].dir; sound.roar(); giftCard(f, 2); mood(0x6a4a10, f.dur, 0.35);
    let head: THREE.Vector3 | null = null; fx.trail(() => head, 0xffd23a, 0.9, f.dur, 36);
    summon(f, { model: 'rong-vang', h: 4.4, clip: 'fly', badgeY: 4.5, tick: (o, k, _dt, t) => {
      const e = ease(k * 4), out = k > 0.86 ? (k - 0.86) / 0.14 : 0, x = rearX(f.team) - dir * (2.5 + 40 * (1 - e)) + dir * out * 50, y = 3.4 + Math.sin(t * 2) * 0.5 + out * 8, z = -0.5 + Math.sin(t * 1.3) * 0.8;
      o.holder.position.set(x, y, z); o.holder.rotation.x = Math.cos(k * Math.PI * 3) * 0.15;
      head = o.holder.position.clone().add(new THREE.Vector3(dir * 3, 0.2, 0));
      for (let i = 0; i < 2; i++) sparks.emit(o.holder.position.clone().add(new THREE.Vector3(-dir * Math.random() * 12, (Math.random() - 0.5) * 2, 0)), new THREE.Vector3(0, -2, 0), C(0xffe080), 1.2, -2);
      if (Math.abs(x - carCenter(f.team)) < 10) wind(new THREE.Vector3(x, 4, -1), dir, 3, 3, 15);
    } }); },
  // 79 xu · Phi cơ lớn bay sát đầu, bóng đổ, thổi luồng khí mạnh
  phico: f => { const dir = TEAMS[f.team].dir; planes += 2; sound.play('boost', 1); giftCard(f, 2);
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 32), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25, depthWrite: false })); shadow.rotation.x = -Math.PI / 2; shadow.scale.set(13, 9, 1); scene.add(shadow);
    summon(f, { model: 'phi-co-lon', h: 0, clip: 'fly', scale: 0.75, badgeY: 5, tick: (o, k) => {
      const e = ease(k * 4), out = k > 0.85 ? (k - 0.85) / 0.15 : 0, x = rearX(f.team) - dir * (11 + 60 * (1 - e)) + dir * out * 70, y = 5 + out * 12;
      o.holder.position.set(x, y, 0); shadow.position.set(x + 4, 0.05, 0);
      for (const ex of [-7, -4, 4, 7]) if (Math.random() < 0.6) dust.emit(new THREE.Vector3(x - dir * 4, y - 1.2, -3.5 + ex * 0.75), new THREE.Vector3(-dir * 6, -0.5, 0), C(0xf0f0f4), 1.4, 0.1);
      const over = e > 0.95 && out === 0 ? 0.6 : 0;
      if (over > 0) { shake = Math.max(shake, over * 0.35); for (let i = 0; i < 6 * over; i++) dust.emit(new THREE.Vector3(x + (Math.random() - 0.5) * 18, 0.3, (Math.random() - 0.5) * 12), new THREE.Vector3(dir * (10 + Math.random() * 10), 1 + Math.random() * 3, (Math.random() - 0.5) * 3), C(0xb08a62), 1.2, -1); wind(new THREE.Vector3(x, 3, 0), dir, 4, 6, 22); }
    }, done: () => { planes -= 2; shadow.removeFromParent(); shadow.geometry.dispose(); (shadow.material as THREE.Material).dispose(); } }); },
  // 99 xu · Sư tử vàng gầm rồi chạy song song cạnh xe (làn sau), bụi tung, hào quang vàng
  sutu: f => { const dir = TEAMS[f.team].dir; sound.roar(); giftCard(f, 2);
    fx.ring(rearX(f.team) - dir * 4, 0, 0xffc23a, 8); fx.light(new THREE.Vector3(rearX(f.team) - dir * 4, 3, 0), 0xffc23a, 60, 0.8);
    const aura = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparks.tex, color: 0xffc23a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    const o = summon(f, { model: 'su-tu', h: 3.7, clip: 'roar', badgeY: 4.4, aura: { name: 'fx-hao-quang', y: 1.8, scale: 1.3, tint: 0xffd23a }, tick: (o, k, _dt, t, el) => {
      if (el > 1.1) o.actor?.play('run');
      const run = ease((el - 1.1) / 0.6), x = rearX(f.team) - dir * (6 - run * 2.6) + Math.sin(t * 1.3) * 0.2;
      o.holder.position.set(x, 0, 0); aura.scale.setScalar(7 + Math.sin(t * 8) * 0.6); aura.material.opacity = (0.45 + Math.sin(t * 6) * 0.1) * (k > 0.9 ? 1 - (k - 0.9) * 10 : 1);
      if (el > 1.1) { for (let i = 0; i < 3; i++) dust.emit(new THREE.Vector3(x - dir * 2, 0.3, (Math.random() - 0.5) * 2), new THREE.Vector3(-dir * (3 + Math.random() * 4), 1 + Math.random() * 2, (Math.random() - 0.5) * 2), C(0xc09060), 1, -1); wind(new THREE.Vector3(x + dir * 2, 2, -2.5), dir, 2, 2, 14); }
    } });
    aura.position.y = 1.8; o.holder.add(aura); },
  // 199 xu · Thần long khổng lồ giáng xuống, trời chuyển ngọc, phun long tức vào đuôi xe
  thanlong: f => { const dir = TEAMS[f.team].dir; sound.roar(); sound.play('bomb-low', 1); giftCard(f, 3); mood(0x0f5a46, f.dur, 0.7);
    fx.pillar(rearX(f.team) - dir * 2, -6, 0x3affc0, 4, f.dur * 0.6); flash(0.35, '#a0ffe0');
    let mouth: { from: THREE.Vector3; to: THREE.Vector3 } | null = null; fx.breath(() => mouth, f.dur);
    summon(f, { model: 'thuongcothanlong', h: 5.2, clip: 'fly', badgeY: 7, tick: (o, k, _dt, t, el) => {
      const e = ease(el / 1.3), x = rearX(f.team) - dir * 3.6, y = 4.6 + Math.sin(t * 1.5) * 0.4 + (1 - e) * 30 + (k > 0.9 ? (k - 0.9) * 200 : 0);
      o.holder.position.set(x, y, -1.5); if (el > 1.3 && el < 2.6) o.actor?.play('roar'); else if (el >= 2.6) o.actor?.play('fly');
      const head = o.holder.position.clone().add(new THREE.Vector3(dir * 2.8, -0.3, 0.5));
      mouth = e > 0.95 && k < 0.92 ? { from: head, to: new THREE.Vector3(rearX(f.team) - dir * 0.5, 1, 0) } : null;
      if (mouth) { shake = Math.max(shake, 0.18); if (Math.random() < 0.3) fx.decal(rearX(f.team) - dir * (1 + Math.random() * 3), (Math.random() - 0.5) * 4, 'crater', 2 + Math.random() * 2, 4); sound.fire = 1; }
      for (let i = 0; i < 2; i++) sparks.emit(new THREE.Vector3(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 6, -8), new THREE.Vector3(0, 1, 0), C(0x9fffe0), 1.2, 0);
    }, done: () => { sound.fire = 0; } }); },
  // 299 xu · Phượng hoàng lửa tung cánh rực trời, mưa lửa, vòng lửa trên đường
  phuonglua: f => { const dir = TEAMS[f.team].dir; sound.play('warp', 1); sound.play('boom-2', 0.7); giftCard(f, 3); mood(0x8a2a08, f.dur, 0.7);
    fx.fireball(new THREE.Vector3(rearX(f.team) - dir * 1.5, 3, -4), 6, 1.2); fx.ring(rearX(f.team) - dir * 1.5, -4, 0xff7a1a, 14, 1.2); flash(0.4, '#ffb070'); shake = Math.max(shake, 0.6);
    let mouth: { from: THREE.Vector3; to: THREE.Vector3 } | null = null; fx.breath(() => mouth, f.dur);
    summon(f, { model: 'chutuoc', h: 6.5, clip: 'fly', badgeY: 8, aura: { name: 'fx-lua', y: -1.8, scale: 2.4 }, tick: (o, k, _dt, t, el) => {
      const e = ease(el / 1.1), x = rearX(f.team) - dir * 4.5, y = 4.6 + Math.sin(t * 2) * 0.5 - (1 - e) * 5 + (k > 0.9 ? (k - 0.9) * 160 : 0);
      o.holder.position.set(x, y, -1);
      mouth = e > 0.95 && k < 0.92 ? { from: o.holder.position.clone().add(new THREE.Vector3(dir * 2.5, -1, 1)), to: new THREE.Vector3(rearX(f.team) - dir * 0.5, 0.8, 0) } : null;
      fire(new THREE.Vector3(x + (Math.random() - 0.5) * 12, y + (Math.random() - 0.5) * 3, -7.5), new THREE.Vector3(0, 2, 0), 6, 0.6);
      for (let i = 0; i < 3; i++) sparks.emit(new THREE.Vector3(rearX(f.team) - dir * Math.random() * 14, 16, (Math.random() - 0.5) * 10), new THREE.Vector3(dir * 2, -12, 0), C(Math.random() < 0.5 ? 0xff7a1a : 0xffd04a), 1.4, -6);     // mưa lửa
      if (Math.random() < 0.06) fx.decal(rearX(f.team) - dir * Math.random() * 10, (Math.random() - 0.5) * 9, 'crater', 1.5 + Math.random() * 2, 3);
      if (Math.random() < 0.1) fx.light(new THREE.Vector3(x, 4, -2), 0xff6a1a, 70, 0.35);
      if (mouth) sound.fire = 1;
    }, done: () => { sound.fire = 0; } }); },
  // 399 xu · Siêu phản lực xé gió hai lượt, nổ âm thanh (vòm hơi nước), bão bụi
  phanluc: f => { const dir = TEAMS[f.team].dir; planes += 2; giftCard(f, 3);
    let tail: THREE.Vector3 | null = null; fx.trail(() => tail, 0x9fd8ff, 0.7, f.dur, 34);
    const booms = [false, false];
    summon(f, { model: 'sieu-phan-luc', h: 0, clip: 'fly', scale: 0.8, badgeY: 3.4, tick: (o, k) => {
      const e = ease(k * 3.2), out = k > 0.86 ? (k - 0.86) / 0.14 : 0, pass = 0, kk = e, x = rearX(f.team) - dir * (7.5 + 90 * (1 - e)) + dir * out * 90, y = 2.4 + out * 14;
      o.holder.position.set(x, y, 0); o.holder.rotation.z = -dir * out * 0.5;
      tail = o.holder.position.clone().add(new THREE.Vector3(-dir * 6.5, 0, 0));
      fire(tail, new THREE.Vector3(-dir * 10, 0, 0), 4, 0.25);
      if (!booms[pass] && e > 0.97) { void kk; booms[pass] = true; fx.dome(new THREE.Vector3(x, y, o.holder.position.z), 0xe8f6ff, 5, 0.6); fx.ring(x, 0, 0xffffff, 16, 0.9); flash(0.3); shake = Math.max(shake, 0.8); punch = 1; sound.play('boom-3', 1); sound.play('bomb-low', 0.8); }
      const over = Math.max(0, 1 - Math.abs(x - carX) / 16);
      if (over > 0) for (let i = 0; i < 8 * over; i++) dust.emit(new THREE.Vector3(x + (Math.random() - 0.5) * 20, 0.3, (Math.random() - 0.5) * 12), new THREE.Vector3(dir * (14 + Math.random() * 12), 1 + Math.random() * 3, (Math.random() - 0.5) * 4), C(0xb08a62), 1.1, -1);
    }, done: () => { planes -= 2; } }); },
  // 500 xu · Long phụng hội tụ: rồng vàng + phượng hoàng xoắn ốc hội tụ, vòm vàng, pháo hoa, rồi cùng truyền năng lượng
  longphung: f => { const dir = TEAMS[f.team].dir; sound.roar(); sound.play('warp', 1); giftCard(f, 4); mood(0x4a1a6a, f.dur, 0.8);
    const cx = () => rearX(f.team) - dir * 6;
    fx.pillar(cx(), -5, 0xffd23a, 5, f.dur * 0.8); flash(0.4, '#fff2b0');
    let hd: THREE.Vector3 | null = null, hp: THREE.Vector3 | null = null; fx.trail(() => hd, 0xffd23a, 0.9, f.dur, 40); fx.trail(() => hp, 0xff6a1a, 0.9, f.dur, 40);
    let beamD: { from: THREE.Vector3; to: THREE.Vector3 } | null = null, beamP: { from: THREE.Vector3; to: THREE.Vector3 } | null = null; fx.breath(() => beamD, f.dur); fx.breath(() => beamP, f.dur);
    let met = false;
    const step = (o: { holder: THREE.Group }, k: number, t: number, phase: number, isDragon: boolean) => {
      const conv = ease(k / 0.45), r = 12 - conv * 8, a = t * 2.2 + phase, c = new THREE.Vector3(cx(), 4.5 + (1 - conv) * 2, -1);
      o.holder.position.set(c.x + Math.cos(a) * r, c.y + Math.sin(a * 0.5) * 1.2 + (k > 0.9 ? (k - 0.9) * 150 : 0), c.z + Math.sin(a) * r * 0.35);
      o.holder.rotation.y = Math.atan2(-Math.sin(a), Math.cos(a)) + (isDragon ? 0 : 0);
      if (k > 0.45 && k < 0.92) { o.holder.position.set(c.x + (isDragon ? -3 : 3), c.y + (isDragon ? 1.5 : -0.5), c.z); o.holder.rotation.y = facing(dir); }
      return o.holder.position.clone();
    };
    summon(f, { model: 'rong-vang', h: 4.2, clip: 'fly', badgeY: 5.5, aura: { name: 'fx-hao-quang', y: 0.5, scale: 1.6, tint: 0xffd23a }, tick: (o, k, _dt, t) => {
      hd = step(o, k, t, 0, true);
      if (!met && k > 0.45) { met = true; const c = new THREE.Vector3(cx(), 4.5, -1); fx.dome(c, 0xffd23a, 14, 1.2); fx.ring(cx(), -2, 0xffd23a, 20, 1.2); fx.ring(cx(), -2, 0xff6a1a, 14, 1.4); fx.light(c, 0xffe080, 160, 1.2); flash(0.7, '#fff6c8'); shake = Math.max(shake, 1.2); slowmo(0.9); punch = 1.4; sound.play('boom-4', 1); sound.play('coin-big', 1);
        for (let i = 0; i < 6; i++) setTimeout(() => sparks.burst(new THREE.Vector3(cx() + (Math.random() - 0.5) * 30, 14 + Math.random() * 8, -6), new THREE.Color().setHSL(Math.random(), 1, 0.6), 110, 10, -4), i * 220); }
      beamD = k > 0.5 && k < 0.92 ? { from: hd.clone().add(new THREE.Vector3(dir * 3, 0, 1)), to: new THREE.Vector3(rearX(f.team), 1.2, 0) } : null;
    } });
    summon(f, { model: 'phuong-hoang', h: 5, clip: 'fly', badgeY: 6.5, aura: { name: 'fx-lua', y: -1.2, scale: 1.5 }, tick: (o, k, _dt, t) => {
      hp = step(o, k, t, Math.PI, false);
      fire(hp, new THREE.Vector3(0, 1.5, 0), 3, 0.5);
      beamP = k > 0.5 && k < 0.92 ? { from: hp.clone().add(new THREE.Vector3(dir * 1.5, -1, 1)), to: new THREE.Vector3(rearX(f.team), 1.6, 0.5) } : null;
    } }); },
};

/* ------------------------------------------------------------ một cú đẩy */
function onPush(f: Extract<Fx, { k: 'push' }>) {
  const T = TEAMS[f.team];
  if (f.fx === 'push') {                                    // tim / follow / chia sẻ: người đẩy mặc đồ đua chạy ra đẩy
    if (pushers.filter(p => p.team === f.team && !p.dead).length < 3 || f.m > LIKE_M) addPusher(f.id, f.name, f.team, Math.max(1.6, f.dur + 0.6));
    sound.thud(0.3);
  } else SUMMON[f.fx](f);
  if (f.m > LIKE_M) {
    const box = $('pushTxt'), d = document.createElement('div'); d.className = 'p'; d.style.setProperty('--c', T.color);
    d.innerHTML = `${T.dir > 0 ? '' : '◀ '}+${fmt(f.m)}m${T.dir > 0 ? ' ▶' : ''}<small>${esc(f.icon)} ${esc(f.name)} · ${esc(f.tier)}</small>`;
    box.replaceChildren(d); setTimeout(() => d.remove(), 1700);
  }
}

/* ------------------------------------------------------------ thắng ván, ván mới */
let winFx: { team: Team; t: number } | null = null;
function onWin(f: Extract<Fx, { k: 'win' }>) {
  const T = TEAMS[f.team];
  winFx = { team: f.team, t: 0 };
  const av = f.mvp ? `<img src="/avatar/${encodeURIComponent(f.mvp.id)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'${esc((f.mvp.name || '?')[0].toUpperCase())}'}))">` : '';
  announce(`🏆 ${T.name} THẮNG!`, `Tỉ số ${f.wins.do} : ${f.wins.xanh}`, T.color, f.mvp ? `<div class="mvp">${av}<span>⭐ MVP @${esc(f.mvp.name)} · ${fmt(f.mvp.m)}m</span></div>` : '', 6500);
  sound.done(true); sound.play('coin-big', 0.8);
  flash(0.5, T.color); fx.pillar(carX, 0, T.color, 3, 5); fx.ring(carX, 0, T.color, 18, 1.2);
}
function onReset(n: number) {
  flash(0.9, '#000000');
  setTimeout(() => { carX = target; carV = 0; for (const p of pushers) { p.life = Math.min(p.life, p.t); } winFx = null; }, 120);
  announce(`VÁN ${n}`, 'Gõ 1 vào Phe Đỏ · Gõ 2 vào Phe Xanh · Tặng quà để đẩy xe!', '#ffd60a', '', 2600);
  sound.play('go', 0.8);
}
function tickWin(dt: number) {
  if (!winFx) return;
  winFx.t += dt;
  if (Math.random() < dt * 6) { const p = new THREE.Vector3(carX + (Math.random() - 0.5) * 30, ground(carX) + 10 + Math.random() * 12, -3 + Math.random() * 4); sparks.burst(p, new THREE.Color().setHSL(Math.random(), 1, 0.6), 90, 9, -4); if (Math.random() < 0.5) sound.play('boom-' + Math.floor(Math.random() * 5), 0.35); }
  if (Math.random() < dt * 30) sparks.emit(new THREE.Vector3(carX + (Math.random() - 0.5) * 20, ground(carX) + 16, (Math.random() - 0.5) * 6), new THREE.Vector3((Math.random() - 0.5) * 2, -3, (Math.random() - 0.5) * 2), new THREE.Color().setHSL(Math.random(), 0.9, 0.6), 3, -1);
}
// chạy linh vật, sắc trời, chậm thời gian
function tickSummons(dt: number, t: number) {
  for (let i = summons.length - 1; i >= 0; i--) { const s = summons[i]; s.t += dt; s.update(dt, t, Math.min(1, s.t / s.dur)); if (s.t >= s.dur) { s.end(); summons.splice(i, 1); } }
  sound.jets = Math.max(0, planes);
  const want = performance.now() < moodState.until ? moodState.want : 0;
  moodState.k += (want - moodState.k) * Math.min(1, dt * 1.5); world.mood(moodC, moodState.k);
}

/* ------------------------------------------------------------ camera bám xe */
const camPos = new THREE.Vector3(0, 15, 30), camLook = new THREE.Vector3(0, 1.2, 0);
let camBias = 0;
function direct(dt: number, t: number) {
  const P = portrait();
  const H = P ? 18 : 16.5, D = P ? 45 : 42;                         // độ cao, khoảng lùi
  let side = 0; for (const s of summons) side -= TEAMS[s.team].dir; for (const p of pushers) if (!p.dead) side -= TEAMS[p.team].dir * 0.5;
  camBias += (THREE.MathUtils.clamp(side, -1, 1) * (P ? 5 : 6) - camBias) * Math.min(1, dt * 2);
  camLook.x = carX + camBias; camLook.y = 2.6; camLook.z = -1;
  camPos.set(camLook.x, H, D);
  shake = Math.max(0, shake - dt * 2.2);
  const k = shake * 0.35, sx = (Math.random() - 0.5) * k, sy = (Math.random() - 0.5) * k;
  punch = Math.max(0, punch - dt * 2.5); const fov = (portrait() ? 58 : 42) - punch * 4; if (Math.abs(camera.fov - fov) > 0.01) { camera.fov = fov; camera.updateProjectionMatrix(); }
  camera.position.copy(camPos).add(new THREE.Vector3(sx, sy, 0)); camera.lookAt(camLook.x, camLook.y, camLook.z);
  if (Q.get('cam') === 'pet' && lastPet?.parent) { lastPet.traverse(o => { if ((o as THREE.Sprite).isSprite) o.visible = false; }); const p = lastPet.position; camera.position.set(p.x + 7, p.y + 3, p.z + 10); camera.lookAt(p.x, p.y + 1.5, p.z); }
  if (Q.get('cam') === 'car') { const a = t * 0.25, cc = carCenter('do'); camera.position.set(cc + Math.cos(a) * 6, 1.9, Math.sin(a) * 6 + 1); camera.lookAt(cc, 1.0, 0); }
  world.update(t, camPos.x);
}

/* ------------------------------------------------------------ giao diện */
const avImg = (id: string, name: string) => `<img src="/avatar/${encodeURIComponent(id)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'${esc((name || '?').slice(0, 1).toUpperCase())}'}))">`;
const lg = (t: typeof TIERS[number]) => `<div class="lg"><i>${t.icon}</i><b>${t.xu} xu</b><em>+${t.m >= 1000 ? (t.m / 1000) + 'k' : t.m}m</em><span>${esc(t.name)}</span></div>`;
$('legL').innerHTML = TIERS.slice(0, 4).map(lg).join('');
$('legR').innerHTML = TIERS.slice(4).map(lg).join('') + `<div class="lg"><i>❤️</i><b>${LIKE_STEP} tim</b><em>+${LIKE_M}m</em><span>Thả tim</span></div>`;
function setRound(r: Round) {
  const first = !round; round = r;
  target = toX(r.pos, r.track);
  if (first) { carX = target; camPos.x = camLook.x = carX; }
  $('winDo').textContent = String(r.wins.do); $('winXanh').textContent = String(r.wins.xanh); $('roundN').textContent = String(r.n);
  $('memDo').textContent = String(r.members.do); $('memXanh').textContent = String(r.members.xanh);
  $('needDo').textContent = fmt(Math.max(0, r.track - r.pos)); $('needXanh').textContent = fmt(Math.max(0, r.track + r.pos));
  ($('carMark') as HTMLElement).style.left = (50 + r.pos / r.track * 50) + '%';
  document.querySelector('#score .side.do')!.classList.toggle('lead', r.pos > 0); document.querySelector('#score .side.xanh')!.classList.toggle('lead', r.pos < 0);
  if (trackNow !== r.track) { trackNow = r.track; world.setTrack(r.track); }
  // đếm ngược khi xe chạm căn cứ đối phương
  const cd = $('countdown');
  if (r.finish && r.phase === 'play') { const T = TEAMS[r.finish.team], O = TEAMS[r.finish.team === 'do' ? 'xanh' : 'do'], n = Math.max(1, Math.ceil(r.finish.left)); cd.hidden = false; cd.style.setProperty('--c', T.color); if ($('cdN').textContent !== String(n)) { $('cdN').textContent = String(n); $('cdN').classList.remove('tick'); void ($('cdN') as HTMLElement).offsetWidth; $('cdN').classList.add('tick'); sound.play(n <= 3 ? 'ring' : 'coin', n <= 3 ? 0.8 : 0.45); } $('cdS').textContent = `${T.emoji} ${T.name} chạm căn cứ! ${O.name} đẩy lại ngay!`; }
  else cd.hidden = true;
}
let trackNow = 0;
function setBoards(b: Boards) {
  const col = (team: Team, rows: Boards['do']) => `<div class="h">${team === 'do' ? '🔴 TOP ĐẨY VÁN NÀY' : 'TOP ĐẨY VÁN NÀY 🔵'}</div>` + (rows.length ? rows.slice(0, 3).map((r, i) => `<div class="c">${avImg(r.id, r.name)}<span>${i + 1}. ${esc(r.name)}</span><small>${fmt(r.v)}m</small></div>`).join('') : `<div class="c"><span>Chưa có ai, tặng quà để đẩy!</span></div>`);
  $('bDo').innerHTML = col('do', b.do); $('bXanh').innerHTML = col('xanh', b.xanh);
}
function announce(t1: string, s: string, color: string, extra = '', ms = 3500) {
  const c = $('center'); c.innerHTML = `<div class="t1" style="--c:${color}">${esc(t1)}</div><div class="s">${esc(s)}</div>${extra}`; c.hidden = false; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
  clearTimeout((c as unknown as { _t: number })._t); (c as unknown as { _t: number })._t = window.setTimeout(() => { c.hidden = true; }, ms);
}
function banner(f: Extract<Fx, { k: 'gift' }>, m: number) {
  const box = $('banners'), d = document.createElement('div'), T = TEAMS[f.team];
  d.className = `banner ${f.team}` + (f.xu >= 99 ? ' vip' : '');
  d.innerHTML = `${avImg(f.id, f.name)}<div><b>${esc(f.name)}</b><span>${T.emoji} tặng ${esc(f.gift)}${f.count > 1 ? ' x' + f.count : ''}</span></div><div class="tier">${f.icon} ${T.dir > 0 ? '' : '◀ '}+${fmt(m)}m${T.dir > 0 ? ' ▶' : ''}</div>`;
  box.prepend(d); while (box.children.length > 4) box.lastChild!.remove();
  setTimeout(() => d.classList.add('out'), 4200); setTimeout(() => d.remove(), 4800);
}
const giftM = new Map<string, number>();
function onFx(f: Fx) {
  switch (f.k) {
    case 'gift': { const t = TIERS.find(x => x.name === f.tier); banner(f, (t?.m ?? 0) * f.count); sound.play(f.xu >= 99 ? 'coin-big' : 'coin', 0.7); giftM.set(f.id, 0); break; }
    case 'push': onPush(f); break;
    case 'join': { const box = $('joins'), d = document.createElement('div'); d.className = f.team; d.textContent = `${TEAMS[f.team].emoji} ${f.name} ${f.switched ? 'đổi sang' : 'vào'} ${TEAMS[f.team].name}`; box.append(d); while (box.children.length > 4) box.firstChild!.remove(); setTimeout(() => d.classList.add('out'), 2600); setTimeout(() => d.remove(), 3200); break; }
    case 'win': onWin(f); break;
    case 'reset': onReset(f.n); break;
    case 'finish': if (f.state === 'start') { announce('⏱️ ĐẾM NGƯỢC 10 GIÂY!', `${TEAMS[f.team].name} chạm căn cứ đối phương`, TEAMS[f.team].color, '', 2200); sound.play('warp', 0.7); fx.ring(carX, 0, TEAMS[f.team].color, 16, 1); } else { announce('🛡️ ĐẨY RA ĐƯỢC RỒI!', `${TEAMS[f.team === 'do' ? 'xanh' : 'do'].name} phá đếm ngược`, TEAMS[f.team === 'do' ? 'xanh' : 'do'].color, '', 2000); sound.play('shield', 0.8); } break;
    case 'voice': sound.voice(f.url); break;
    case 'note': $('status').textContent = f.text; break;
  }
}
const TIPS = [
  'Gõ <span class="r">1</span> vào <span class="r">PHE ĐỎ</span> · Gõ <span class="x">2</span> vào <span class="x">PHE XANH</span>',
  `Thả <b>${LIKE_STEP} tim</b> = đẩy xe <b>${LIKE_M}m</b> cho phe của bạn ❤️`,
  'Tặng quà = triệu hồi <b>linh vật 3D</b> đẩy xe phe bạn 🐰🦅🐲',
  '🐰 <b>1 xu</b> thỏ vàng · 🦅 <b>5 xu</b> đại bàng · 🐲 <b>10 xu</b> rồng con · 🦁 <b>99 xu</b> sư tử vàng',
  '🐲 <b>199 xu</b> Thần Long · 🔥 <b>299 xu</b> Phượng Hoàng Lửa',
  'Chưa chọn phe mà <b>thả tim</b> = vào ngẫu nhiên 1 trong 2 phe ❤️',
  '👑 <b>500 xu</b> LONG PHỤNG HỘI TỤ: đại cảnh rồng vàng + phượng hoàng!',
  'Xe chạm <b>căn cứ đối phương</b> = phe bạn thắng ván 🏆',
];
let tip = 0;
$('howto').innerHTML = TIPS[0];
setInterval(() => { const h = $('howto'); h.style.opacity = '0'; setTimeout(() => { h.innerHTML = TIPS[tip = (tip + 1) % TIPS.length]; h.style.opacity = '1'; }, 400); }, 6000);

/* ------------------------------------------------------------ mạng */
const net = new Net(LIVE ? 'view' : 'control');
net.onState = (s: ServerMessage) => {
  if (s.round) setRound(s.round);
  for (const f of s.fx) onFx(f);
  if (s.boards) setBoards(s.boards);
  if (s.live) { const L = s.live; $('live').textContent = L.status === 'connected' ? `🔴 LIVE @${L.uniqueId}` : L.status === 'connecting' ? 'Đang nối TikTok…' : L.status === 'reconnecting' ? 'Đang nối lại…' : L.status === 'error' ? 'Lỗi: ' + L.error : 'Chưa nối TikTok'; $('live').classList.toggle('on', L.status === 'connected'); }
  if (s.viewers !== undefined) $('viewers').textContent = `👥 ${s.viewers}`;
  if (s.settings) { const v = $('setVoice') as HTMLInputElement; if (v) v.checked = s.settings.voice; const tr = $('setTrack') as HTMLSelectElement; if (tr) tr.value = String(s.settings.track); }
};
net.onStatus = up => { $('offline').hidden = up; };
loadModels().finally(() => {
  for (const team of ['do', 'xanh'] as const) { const m = templateScene(team === 'do' ? 'xe-do' : 'xe-xanh'); if (m) cars[team].useModel(m); }
  world.useModels(n => templateScene(n));
  net.connect();
});

/* ------------------------------------------------------------ âm thanh, bảng điều khiển */
const unlockEl = $('unlock'); unlockEl.hidden = false;
const unlock = () => { sound.unlock(); unlockEl.hidden = true; };
addEventListener('pointerdown', unlock); addEventListener('keydown', unlock); addEventListener('click', unlock);
$('soundBtn').onclick = () => { sound.setMuted(!sound.muted); $('soundBtn').textContent = sound.muted ? '🔇' : '🔈'; };
$('musicBtn').onclick = () => { sound.setMusic(!sound.musicOn); ($('musicBtn') as HTMLElement).style.opacity = sound.musicOn ? '1' : '.4'; };
if (!LIVE) {
  $('sim').hidden = false;
  const send = (m: ControlMessage) => net.send(m);
  $('simToggle').onclick = () => $('simBody').classList.toggle('hide');
  const NAMES = ['Mèo Mập', 'Bé Sóc', 'Ken Racing', 'Lan Ngọc', 'Tuấn Tú', 'Ríu Rít', 'Hải Đăng', 'Phương Anh', 'Đức Huy', 'Bảo Ngân', 'Tèo Em', 'Quỳnh Như'];
  const who = $('simWho') as HTMLSelectElement; who.innerHTML = NAMES.map(n => `<option>${n}</option>`).join('');
  const cur = () => ({ id: who.value, name: who.value });
  const comment = (text: string) => send({ t: 'sim', kind: 'comment', ...cur(), text });
  $('simRed').onclick = () => comment('1'); $('simBlue').onclick = () => comment('2');
  $('simLike').onclick = () => send({ t: 'sim', kind: 'like', ...cur(), count: LIKE_STEP });
  $('simFollow').onclick = () => send({ t: 'sim', kind: 'follow', ...cur() });
  $('simShare').onclick = () => send({ t: 'sim', kind: 'share', ...cur() });
  $('simRandom').onclick = () => { const n = NAMES[Math.floor(Math.random() * NAMES.length)], t = [1, 1, 1, 5, 5, 10, 99, 199][Math.floor(Math.random() * 8)]; who.value = n; send({ t: 'sim', kind: 'comment', id: n, name: n, text: Math.random() < 0.5 ? '1' : '2' }); setTimeout(() => send({ t: 'sim', kind: 'gift', id: n, name: n, gift: TIERS.find(x => x.xu === t)?.icon ?? 'Quà', diamonds: t, count: 1 }), 150); };
  $('simGifts').innerHTML = TIERS.map(t => `<button data-xu="${t.xu}" title="${esc(t.desc)}">${t.icon} ${t.xu}</button>`).join('') + '<button data-xu="1" data-n="5">🌹 x5</button>';
  $('simGifts').onclick = e => { const b = (e.target as HTMLElement).closest('[data-xu]') as HTMLElement | null; if (b) send({ t: 'sim', kind: 'gift', ...cur(), gift: TIERS.find(x => x.xu === +b.dataset.xu!)?.name ?? 'Quà', diamonds: +b.dataset.xu!, count: +(b.dataset.n ?? 1) }); };
  const inp = (id: string) => $(id) as HTMLInputElement;
  inp('setVoice').onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { voice: inp('setVoice').checked } });
  ($('setTrack') as HTMLSelectElement).onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { track: +($('setTrack') as HTMLSelectElement).value } });
  $('resetRound').onclick = () => { if (confirm('Bắt đầu ván mới (xe về giữa)?')) send({ t: 'ctl', cmd: 'reset' }); };
  $('resetWins').onclick = () => { if (confirm('Xoá tỉ số về 0 : 0?')) send({ t: 'ctl', cmd: 'resetWins' }); };
  $('clearSim').onclick = () => send({ t: 'ctl', cmd: 'clearSim' });
  ($('openLive') as HTMLAnchorElement).onclick = e => { e.preventDefault(); window.open('/?live=1', 'day_xe_live', 'popup,width=540,height=960'); };
}

/* ------------------------------------------------------------ vòng lặp */
const clock = new THREE.Clock(); let t = 0;
function frame() {
  const rdt = Math.min(0.05, clock.getDelta()); slowLeft = Math.max(0, slowLeft - rdt); timeScale += ((slowLeft > 0 ? 0.3 : 1) - timeScale) * Math.min(1, rdt * 8); const dt = rdt * timeScale; t += dt;
  tickCar(dt, t);
  for (let i = pushers.length - 1; i >= 0; i--) { pushers[i].update(dt, t); if (pushers[i].dead) pushers.splice(i, 1); }
  for (let i = effects.length - 1; i >= 0; i--) { const e = effects[i]; e.t += dt; e.update(dt, Math.min(1, e.t / e.dur)); if (e.t >= e.dur) { e.end?.(); effects.splice(i, 1); } }
  tickWin(dt); tickSummons(dt, t); fx.update(dt, t);
  sparks.update(dt); dust.update(dt);
  direct(dt, t);
  sound.update();
  if (composer) composer.render(); else renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
void giftM;
if (Q.has('debug')) (window as unknown as Record<string, unknown>).__dbg = { summons, pushers, scene, cars, get carX() { return carX; } };
