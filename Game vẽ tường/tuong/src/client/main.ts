import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ART_AREA, CANVAS, KEEP, TIERS, WALL } from '../shared/game.ts';
import type { Art, Boards, ControlMessage, Fx, ServerMessage } from '../shared/types.ts';
import { Sound } from './audio.ts';
import { GlbActor, loadModels, modelsWith, hasModel } from './glb.ts';
import { Net } from './net.ts';
import { buildArt } from './paint.ts';
import type { Built } from './paint.ts';
import { SceneView, buildJet, segX, toWorld } from './scene.ts';
import type { Seg } from './scene.ts';

const Q = new URLSearchParams(location.search);
const LIVE = Q.has('live'), LITE = Q.has('lite');
document.body.classList.toggle('live', LIVE);
const $ = (id: string) => document.getElementById(id)!;
const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/* ------------------------------------------------------------ dựng cảnh */
const renderer = new THREE.WebGLRenderer({ canvas: $('scene') as HTMLCanvasElement, antialias: !LITE });
renderer.setPixelRatio(Math.min(devicePixelRatio, LITE ? 1 : 1.5));
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0; renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = !LITE; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, 1, 0.3, 1500);
const view = new SceneView(scene, LITE);
let composer: EffectComposer | null = null;
if (!LITE) { composer = new EffectComposer(renderer); composer.addPass(new RenderPass(scene, camera)); composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.35, 0.4, 0.92)); composer.addPass(new OutputPass()); }
const portrait = () => innerWidth / innerHeight < 0.8;
function resize() { renderer.setSize(innerWidth, innerHeight, false); composer?.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.fov = portrait() ? 60 : 45; camera.updateProjectionMatrix(); }
addEventListener('resize', resize); resize();
const sound = new Sound();

/* ------------------------------------------------------------ hạt (bụi sơn, pháo hoa, lửa) */
class Particles {
  N = 4000; i = 0; pos = new Float32Array(this.N * 3); col = new Float32Array(this.N * 3); vel = new Float32Array(this.N * 3); life = new Float32Array(this.N); max = new Float32Array(this.N); grav = new Float32Array(this.N);
  geo = new THREE.BufferGeometry(); points: THREE.Points; tex: THREE.Texture;
  constructor() {
    const tex = this.tex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d')!; const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(c); })();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3)); this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    this.points = new THREE.Points(this.geo, new THREE.PointsMaterial({ size: 0.6, map: tex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.points.frustumCulled = false; scene.add(this.points);
    for (let k = 0; k < this.N; k++) this.pos[k * 3 + 1] = -999;
  }
  emit(p: THREE.Vector3, v: THREE.Vector3, c: THREE.Color, life: number, grav = 0) {
    const k = this.i = (this.i + 1) % this.N;
    this.pos.set([p.x, p.y, p.z], k * 3); this.vel.set([v.x, v.y, v.z], k * 3); this.col.set([c.r, c.g, c.b], k * 3); this.life[k] = this.max[k] = life; this.grav[k] = grav;
  }
  burst(p: THREE.Vector3, c: THREE.Color, n: number, sp: number) { for (let j = 0; j < n; j++) this.emit(p, new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(sp * (0.4 + Math.random())), c, 0.8 + Math.random() * 0.8, -6); }
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
const parts = new Particles();

/* ------------------------------------------------------------ xạ thủ graffiti: đứng xa bắn sơn lên tường */
const HERO_H = 7.5;            // chiều cao nhân vật (m)
const HERO_Z = 16;           // đứng cách tường
const HERO_DX = -4;          // lệch trái so với tâm mảng để khỏi che giữa bức tranh
const GUN_K = HERO_H / 1.7;  // súng dựng theo người cao 1,7 m rồi phóng theo nhân vật
const GUN_LEN = 0.8 * GUN_K;
// súng sơn: thân đen bóng, nòng dài, bình sơn phát sáng trên lưng súng (đổi màu theo bức đang vẽ), vạch neon
function buildGun() {
  const g = new THREE.Group(), k = GUN_K;
  const dark = new THREE.MeshStandardMaterial({ color: 0x15161c, roughness: 0.3, metalness: 0.7 }), chrome = new THREE.MeshStandardMaterial({ color: 0xd8dde6, roughness: 0.15, metalness: 1 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xff2d55, emissive: 0xff2d55, emissiveIntensity: 1.1, roughness: 0.2, transparent: true, opacity: 0.92 });
  const neon = new THREE.MeshStandardMaterial({ color: 0x1fe0ff, emissive: 0x1fe0ff, emissiveIntensity: 1.3 });
  const add = (geo: THREE.BufferGeometry, m: THREE.Material, x: number, y: number, z: number, rx = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x * k, y * k, z * k); o.rotation.x = rx; o.castShadow = true; g.add(o); return o; };
  add(new THREE.BoxGeometry(0.09 * k, 0.12 * k, 0.5 * k), dark, 0, 0.05, 0.18);                       // thân súng
  add(new THREE.BoxGeometry(0.06 * k, 0.14 * k, 0.07 * k), dark, 0, -0.05, -0.02, 0.25);              // báng cầm
  add(new THREE.CylinderGeometry(0.028 * k, 0.034 * k, 0.36 * k, 14), chrome, 0, 0.05, 0.6, Math.PI / 2);   // nòng
  add(new THREE.TorusGeometry(0.04 * k, 0.012 * k, 8, 18), neon, 0, 0.05, 0.78);                      // miệng nòng neon
  add(new THREE.CylinderGeometry(0.055 * k, 0.055 * k, 0.24 * k, 18), glow, 0, 0.16, 0.15, Math.PI / 2);   // bình sơn
  add(new THREE.BoxGeometry(0.095 * k, 0.012 * k, 0.4 * k), neon, 0, 0.115, 0.2);                     // vạch neon dọc thân
  g.userData.glow = glow;
  return g;
}
class Hero {
  root = new THREE.Group(); actor: GlbActor | null = null; fallback: THREE.Group | null = null;
  b: Record<string, THREE.Object3D | null> = {};
  gun = buildGun(); flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: parts.tex, color: 0xffffff, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  x: number; tx: number; vx = 0; busy = 0; firing = false; cheer = 0; yaw = Math.PI;
  aim = new THREE.Vector3(); aimS = new THREE.Vector3(); aimW = 0; color = new THREE.Color('#ff2d55');
  private helper = new THREE.Object3D();
  constructor(model: string, x: number) {
    this.x = this.tx = x;
    this.root.position.set(x, 0, HERO_Z); scene.add(this.root); scene.add(this.gun); scene.add(this.flash);
    if (model) {
      this.actor = new GlbActor(model, HERO_H); this.root.add(this.actor.root);
      this.actor.root.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) m.castShadow = true; });
      for (const n of ['Spine', 'Spine1', 'Spine2', 'R_Hand', 'L_Hand']) this.b[n] = this.actor.root.getObjectByName('Bip01_' + n) ?? null;
    } else {
      const f = new THREE.Group(); const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.4 * GUN_K, 1.0 * GUN_K, 6, 12), new THREE.MeshStandardMaterial({ color: 0x15161c })); body.position.y = 0.9 * GUN_K; f.add(body);
      const h = new THREE.Mesh(new THREE.SphereGeometry(0.15 * GUN_K, 14, 12), new THREE.MeshStandardMaterial({ color: 0xf0c8a0 })); h.position.y = 1.6 * GUN_K; f.add(h); this.fallback = f; this.root.add(f);
    }
  }
  muzzle(out = new THREE.Vector3()) { return this.gun.localToWorld(out.set(0, 0.05 * GUN_K, 0.8 * GUN_K)); }
  get arrived() { return Math.abs(this.tx - this.x) < 0.8 && Math.abs(this.vx) < 1.5; }
  setColor(c: string) { this.color.set(c); const m = this.gun.userData.glow as THREE.MeshStandardMaterial; m.color.set(c); m.emissive.set(c); }
  // xoay thân trên (3 đốt sống) để nòng súng (từ tay phải sang tay trái) chĩa đúng điểm bắn
  private aimChest(w: number) {
    const { Spine, Spine1, Spine2, R_Hand, L_Hand } = this.b; if (!Spine || !Spine1 || !Spine2 || !R_Hand || !L_Hand) return;
    this.actor!.root.updateMatrixWorld(true);
    const a = new THREE.Vector3(), c = new THREE.Vector3();
    for (const [bone, k] of [[Spine, 0.34], [Spine1, 0.5], [Spine2, 1]] as const) {
      const cur = L_Hand.getWorldPosition(a).sub(R_Hand.getWorldPosition(c)).normalize();
      // thân chỉ ngửa / cúi vừa phải (không ngả hẳn ra sau khi bắn lên cao); phần còn lại súng tự chĩa
      const raw = this.aimS.clone().sub(R_Hand.getWorldPosition(c)).normalize(), pc = THREE.MathUtils.clamp(Math.asin(THREE.MathUtils.clamp(raw.y, -1, 1)), -0.15, 0.3);
      const want = new THREE.Vector3(raw.x, 0, raw.z).normalize().multiplyScalar(Math.cos(pc)).setY(Math.sin(pc));
      const part = new THREE.Quaternion().slerp(new THREE.Quaternion().setFromUnitVectors(cur, want), k * w);
      const wq = bone.getWorldQuaternion(new THREE.Quaternion()), pq = bone.parent!.getWorldQuaternion(new THREE.Quaternion());
      bone.quaternion.copy(pq.invert().multiply(part.multiply(wq)));
      bone.updateMatrixWorld(true);
    }
  }
  // súng gắn tay phải, nòng hướng từ tay phải sang tay trái (khi ăn mừng: giơ thẳng lên trời)
  private placeGun(dt: number) {
    const R = this.b.R_Hand, L = this.b.L_Hand;
    const p = new THREE.Vector3(), d = new THREE.Vector3();
    if (R && L) { R.getWorldPosition(p); L.getWorldPosition(d).sub(p).normalize(); }
    else { p.set(this.x + 0.3 * GUN_K, 1.2 * GUN_K, HERO_Z - 0.3 * GUN_K); d.copy(this.aimS).sub(p).normalize(); }
    if (this.aimW > 0) d.lerp(this.aimS.clone().sub(p).normalize(), this.aimW).normalize();
    if (this.cheer > 0) d.set(0, 1, 0).addScaledVector(new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw)), 0.25).normalize();
    this.helper.position.copy(p); this.helper.lookAt(p.clone().add(d));
    this.gun.position.copy(p); this.gun.quaternion.slerp(this.helper.quaternion, Math.min(1, dt * 18));
  }
  shot() { this.flash.material.opacity = 1; this.flash.scale.setScalar(1.4 + Math.random() * 0.8); }
  update(dt: number, t: number) {
    // đi: tăng tốc / giảm tốc mượt
    const want = THREE.MathUtils.clamp((this.tx - this.x) * 1.6, -15, 15);
    this.vx += (want - this.vx) * Math.min(1, dt * 3); this.x += this.vx * dt;
    const moving = Math.abs(this.vx) > 1.2;
    this.root.position.x = this.x;
    if (this.aimS.lengthSq() === 0) this.aimS.copy(this.aim);
    this.aimS.lerp(this.aim, 1 - Math.exp(-dt * 9));
    this.aimW = THREE.MathUtils.clamp(this.aimW + (this.firing && !moving && this.cheer <= 0 ? dt : -dt) * 4, 0, 1);
    if (this.cheer > 0) this.cheer -= dt;
    // hướng mặt: đi thì quay theo hướng đi, đứng thì quay về phía điểm bắn
    const dx = this.aimS.x - this.x, face = moving ? (this.vx > 0 ? Math.PI / 2 : -Math.PI / 2) : Math.PI + Math.atan2(dx, HERO_Z) * -0.6 * this.aimW;
    let dy = face - this.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); this.yaw += dy * Math.min(1, dt * 6);
    if (this.actor) {
      this.actor.root.rotation.y = this.yaw;
      this.actor.play(this.cheer > 0 ? 'cheer' : moving ? 'walk' : this.firing ? 'shoot' : 'idle'); this.actor.update(dt);
      if (this.aimW > 0) this.aimChest(this.aimW * this.aimW * (3 - 2 * this.aimW));
    }
    if (this.fallback) this.fallback.rotation.y = this.yaw;
    this.placeGun(dt);
    // chớp lửa đầu nòng
    const fm = this.flash.material; fm.opacity = Math.max(0, fm.opacity - dt * 9); fm.color.copy(this.color).lerp(new THREE.Color(1, 1, 1), 0.5); this.muzzle(this.flash.position);
    void t;
  }
}
let hero: Hero | null = null;
let parkSeg = 0;                     // mảng tường sẽ vẽ bức tiếp theo (server báo): rảnh thì đứng chờ trước mảng đó
const standX = (seg: number) => segX(seg) + HERO_DX;
const park = () => { if (hero && !hero.busy) { hero.tx = standX(parkSeg); if (Math.abs(hero.tx - hero.x) > WALL.w * 2.5) hero.x = hero.tx - WALL.w; } };
let models: string[] = [];

/* ------------------------------------------------------------ việc vẽ */
interface Job { art: Art; sg: Seg; t: number; dur: number; built?: Built; brush?: { x: number; y: number }[]; done: number; byHero?: boolean; jets?: THREE.Group[]; dragon?: GlbActor; r?: number }
const jobs: Job[] = [];
const waiting: Job[] = [];
const DUR: Record<string, number> = { tag: 1.6, splat: 1.4, portrait: 3, gold: 3.4, angel: 3.8, demon: 4.2, mural: 7, squad: 3.4, bomber: 2.8, dragon: 3.6 };
const avatars = new Map<string, Promise<HTMLImageElement | null>>();
function avatarOf(id: string) {
  let p = avatars.get(id);
  if (!p) { p = new Promise(res => { const im = new Image(); const to = setTimeout(() => res(null), 2500); im.onload = () => { clearTimeout(to); res(im); }; im.onerror = () => { clearTimeout(to); res(null); }; im.src = '/avatar/' + encodeURIComponent(id); }); avatars.set(id, p); }
  return p;
}
// đường bắn: quét qua lại phủ kín khung tranh
function brushPath(b: Built, step: number) {
  const pts: { x: number; y: number }[] = [];
  for (let y = b.y + step * 0.5, row = 0; y < b.y + b.c.height; y += step * 0.8, row++) {
    const xs = row % 2 ? [b.x + b.c.width, b.x] : [b.x, b.x + b.c.width];
    for (let k = 0; k <= 1; k += step / b.c.width) pts.push({ x: xs[0] + (xs[1] - xs[0]) * k, y: y + Math.sin(k * 20) * step * 0.15 });
  }
  return pts;
}
function stamp(sg: Seg, b: Built, x: number, y: number, r: number, col = '#ffffff') {
  const g = sg.paint(), sx = Math.max(0, x - r - b.x), sy = Math.max(0, y - r - b.y), sw = Math.min(b.c.width - sx, r * 2), sh = Math.min(b.c.height - sy, r * 2);
  if (sw <= 0 || sh <= 0) return;
  g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.clip(); g.drawImage(b.c, sx, sy, sw, sh, b.x + sx, b.y + sy, sw, sh); g.restore();
  sg.mark(x - r * 1.5, y - r * 1.5, r * 3, r * 3);
  // sơn văng li ti quanh vết bắn
  g.save(); g.fillStyle = col;
  for (let k = 0; k < 14; k++) { const a = Math.random() * Math.PI * 2, d = r * (0.95 + Math.random() * 0.45); g.globalAlpha = 0.25 + Math.random() * 0.4; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 1.5 + Math.random() * 4, 0, Math.PI * 2); g.fill(); }
  g.restore();
}
// tranh dựng xong: cắt sát phần có sơn rồi phóng cho vừa kín vùng đặt tranh của mảng (giữ tỉ lệ, căn giữa)
function fitBuilt(b: Built): Built {
  const W = b.c.width, H = b.c.height, d = b.c.getContext('2d', { willReadFrequently: true })!.getImageData(0, 0, W, H).data;
  // khung cắt theo các ô 24 px phủ sơn dày (bỏ qua hạt sơn lác đác và quầng mờ ở xa)
  const C = 24, cw = Math.ceil(W / C), ch = Math.ceil(H / C);
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let cy = 0; cy < ch; cy++) for (let cx = 0; cx < cw; cx++) {
    let n = 0, t = 0;
    for (let y = cy * C; y < Math.min(H, cy * C + C); y += 4) for (let x = cx * C; x < Math.min(W, cx * C + C); x += 4) { t++; if (d[(y * W + x) * 4 + 3] > 140) n++; }
    if (n > t * 0.5) { x0 = Math.min(x0, cx * C); y0 = Math.min(y0, cy * C); x1 = Math.max(x1, cx * C + C); y1 = Math.max(y1, cy * C + C); }
  }
  if (x1 < 0) return b;
  x0 = Math.max(0, x0 - 4); y0 = Math.max(0, y0 - 4); x1 = Math.min(W, x1 + 6); y1 = Math.min(H, y1 + 6);
  const aw = CANVAS.w * (ART_AREA.x1 - ART_AREA.x0), ah = CANVAS.h * (ART_AREA.y1 - ART_AREA.y0), k = Math.min(aw / (x1 - x0), ah / (y1 - y0));
  const c = document.createElement('canvas'); c.width = Math.round((x1 - x0) * k); c.height = Math.round((y1 - y0) * k);
  const g = c.getContext('2d')!; g.imageSmoothingQuality = 'high'; g.drawImage(b.c, x0, y0, x1 - x0, y1 - y0, 0, 0, c.width, c.height);
  return { c, x: Math.round(CANVAS.w * ART_AREA.x0 + (aw - c.width) / 2), y: Math.round(CANVAS.h * ART_AREA.y0 + (ah - c.height) / 2) };
}
async function drawInstant(a: Art) {
  const sg = view.seg(a.seg), b0 = buildArt(a, await avatarOf(a.av)), b = b0 && fitBuilt(b0); if (b) sg.paint().drawImage(b.c, b.x, b.y);
  sg.mark();
}
async function startJob(a: Art) {
  const job: Job = { art: a, sg: view.seg(a.seg), t: 0, dur: DUR[a.kind] ?? 4, done: 0 };
  const b0 = buildArt(a, await avatarOf(a.av)); job.built = b0 ? fitBuilt(b0) : undefined;
  if (!job.built) return;
  job.r = THREE.MathUtils.clamp(a.size * 0.3, 70, 120); job.brush = brushPath(job.built, job.r);
  if (jobs.length || show || waiting.length) { waiting.push(job); return; }     // đang vẽ / đang khoe tranh: xếp hàng
  begin(job);
}
// bắt đầu một bức (quà kế tiếp trong hàng): nhân vật đi sang mảng tường của bức này
function begin(job: Job) {
  const a = job.art;
  if (waiting.length > 5) job.dur *= 0.6;                 // hàng dài quá thì vẽ nhanh hơn
  view.keepAround(a.seg, KEEP - 1);
  job.sg = view.seg(a.seg); job.sg.paint(); job.sg.clear();
  if (a.kind === 'squad' || a.kind === 'bomber') {
    const cols = a.kind === 'squad' ? ['#ff2d55', '#ff4fc3', '#1fa2ff'] : [a.color];
    job.jets = cols.map((c, i) => { const j = buildJet(c); j.position.copy(toWorld(i % 2 ? CANVAS.w + 900 : -900, job.built!.y, 6, a.seg)); scene.add(j); return j; });
  } else if (a.kind === 'dragon') {
    if (hasModel('rong-son')) { job.dragon = new GlbActor('rong-son', 0); job.dragon.root.scale.setScalar(0.45); job.dragon.play('move'); job.dragon.root.position.copy(toWorld(-900, job.built!.y, 9, a.seg)); scene.add(job.dragon.root); }
    else { const j = buildJet('#ff8a1f'); scene.add(j); job.jets = [j]; }
    sound.roar();
  } else job.byHero = true;
  if (hero) { hero.busy = 1; hero.cheer = 0; hero.tx = standX(a.seg); hero.setColor(a.color); }
  jobs.push(job);
  if (a.kind === 'mural') announce('🌟 BÍCH HOẠ HUYỀN THOẠI 🌟', '@' + a.name + ' vẽ kín bức tường!', '#ffd60a');
}
function finish(job: Job) {
  const b = job.built!;
  job.sg.paint().drawImage(b.c, b.x, b.y); job.sg.mark(b.x, b.y, b.c.width, b.c.height);
  for (const j of job.jets ?? []) scene.remove(j);
  if (job.dragon) job.dragon.dispose();
  if (hero) { hero.firing = false; hero.cheer = 99; }               // ăn mừng, vẫn "bận" tới hết màn khoe
  const c = toWorld(b.x + b.c.width / 2, b.y + b.c.height * 0.4, 0.5, job.art.seg); parts.burst(c, new THREE.Color(job.art.color), job.art.kind === 'mural' ? 260 : 80, job.art.kind === 'mural' ? 14 : 9); sound.done(job.art.kind === 'mural');
  const k = job.art.kind, rush = waiting.length > 5 ? 0.5 : 1;
  show = { t: 0, dur: (k === 'mural' ? 5 : k === 'splat' || k === 'tag' ? 1.8 : 3.2) * rush, job, pops: 0 };
  const tier = TIERS.find(x => x.kind === k);
  if (k !== 'mural') announce('✨ HOÀN THÀNH ✨', '@' + job.art.name + (tier && k !== 'tag' ? ' · ' + tier.icon + ' ' + tier.name : ''), job.art.color);
  // vệt sáng lướt qua bức tranh như vừa đánh bóng
  const lt = toWorld(b.x, b.y + b.c.height, 0.3, job.art.seg), rb = toWorld(b.x + b.c.width, b.y, 0.3, job.art.seg);
  glint.visible = true; glint.scale.set((lt.y - rb.y) * 0.35, (rb.y - lt.y) * -1.25, 1); glint.userData = { x0: lt.x, x1: rb.x, y: (lt.y + rb.y) / 2 };
}
// màn khoe tranh: vệt sáng lướt qua, lấp lánh + pháo giấy, nhân vật ăn mừng; hết màn mới đi sang mảng sau vẽ quà kế tiếp
let show: { t: number; dur: number; job: Job; pops: number } | null = null;
const glint = (() => {
  const c = document.createElement('canvas'); c.width = 128; c.height = 8; const g = c.getContext('2d')!;
  const gr = g.createLinearGradient(0, 0, 128, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 8);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, opacity: 0.5 }));
  m.rotation.z = -0.35; m.visible = false; scene.add(m); return m;
})();
function tickShow(dt: number) {
  if (!show) return;
  show.t += dt;
  const b = show.job.built!, seg = show.job.art.seg, k = Math.min(1, show.t / show.dur);
  const cx = toWorld(b.x + b.c.width / 2, b.y + b.c.height / 2, 0, seg);
  const lt = toWorld(b.x, b.y + b.c.height, 0.4, seg), rb = toWorld(b.x + b.c.width, b.y, 0.4, seg);
  const gk = Math.min(1, show.t / 1.1); const u = glint.userData as { x0: number; x1: number; y: number };
  glint.position.set(u.x0 + (u.x1 - u.x0) * gk, u.y, 0.3); glint.visible = gk < 1;
  if (Math.random() < dt * 30) parts.emit(new THREE.Vector3(lt.x + Math.random() * (rb.x - lt.x), rb.y + Math.random() * (lt.y - rb.y), 0.5), new THREE.Vector3(0, 0.6, 0.8), new THREE.Color().setHSL(0.13, 1, 0.55 + Math.random() * 0.2), 0.7, 0);
  const big = show.job.art.kind !== 'splat' && show.job.art.kind !== 'tag';
  if (big && show.pops < 3 && show.t > 0.35 + show.pops * 0.45) { const p = new THREE.Vector3(show.pops === 1 ? cx.x : show.pops === 0 ? lt.x : rb.x, lt.y + 1.5, 2); parts.burst(p, new THREE.Color().setHSL(Math.random(), 0.9, 0.6), 50, 7); sound.play(show.pops === 1 ? 'coin' : 'boom-1', 0.35); show.pops++; }
  if (k >= 1) {
    show = null; glint.visible = false;
    if (hero) { hero.busy = 0; hero.cheer = 0; }
    const w = waiting.shift(); if (w) begin(w); else park();          // vẽ xong: đi sang phải tới mảng kế tiếp
  }
}
let focus = new THREE.Vector3(0, 11, 0);
// viên sơn bắn ra: bay theo đường cong nhẹ, chạm tường thì in màu tranh + bắn tung bụi sơn
const shotGeo = new THREE.SphereGeometry(0.32, 10, 8);
const shotMats = new Map<string, THREE.MeshBasicMaterial>();
const shotMat = (c: THREE.Color) => { const k = c.getHexString(); let m = shotMats.get(k); if (!m) { m = new THREE.MeshBasicMaterial({ color: c }); shotMats.set(k, m); } return m; };
const shots: { from: THREE.Vector3; to: THREE.Vector3; t: number; dur: number; arc: number; sg: Seg; b: Built; x: number; y: number; r: number; col: THREE.Color; m?: THREE.Mesh }[] = [];
function tickShots(dt: number) {
  for (let i = shots.length - 1; i >= 0; i--) {
    const s = shots[i]; s.t += dt / s.dur;
    if (!s.m) { s.m = new THREE.Mesh(shotGeo, shotMat(s.col)); s.m.scale.set(1, 1, 2.6); scene.add(s.m); }
    const k = Math.min(1, s.t), prev = s.m.position.clone();
    s.m.position.lerpVectors(s.from, s.to, k); s.m.position.y += Math.sin(k * Math.PI) * s.arc;
    s.m.lookAt(s.m.position.clone().add(s.m.position.clone().sub(prev)));
    if (Math.random() < 0.6) parts.emit(s.m.position, new THREE.Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, 0), s.col.clone().multiplyScalar(0.6), 0.25, 0);
    if (s.t >= 1) { stamp(s.sg, s.b, s.x, s.y, s.r, '#' + s.col.getHexString()); sound.splat(); if (Math.random() < 0.5) parts.burst(s.to, s.col, 6, 3.5); scene.remove(s.m); shots.splice(i, 1); }
  }
}
function tickJobs(dt: number, t: number) {
  for (let i = jobs.length - 1; i >= 0; i--) {
    const job = jobs[i];
    if (hero && job.t === 0 && !hero.arrived) continue;          // chờ nhân vật đi tới đúng mảng tường rồi mới bắt đầu
    job.t += dt;
    const k = Math.min(1, job.t / job.dur), seg = job.art.seg;
    if (job.brush && job.built) {
      const n = Math.floor(k * job.brush.length);
      const col = new THREE.Color(job.art.color);
      for (let q = job.done; q < n; q++) {
        const p = job.brush[q], to = toWorld(p.x, p.y, 0.05, seg);
        if (job.byHero && hero) { const from = hero.muzzle(); shots.push({ from, to, t: 0, dur: 0.2 + from.distanceTo(to) * 0.004, arc: 0.6, sg: job.sg, b: job.built, x: p.x, y: p.y, r: job.r!, col }); if (q % 2 === 0) { hero.shot(); sound.pew(); } }
        else if (job.jets || job.dragon) {
          const shooters = job.jets ?? [job.dragon!.root], s = shooters[q % shooters.length];
          shots.push({ from: s.position.clone(), to, t: 0, dur: 0.25, arc: 0, sg: job.sg, b: job.built, x: p.x, y: p.y, r: job.r!, col: new THREE.Color(job.dragon ? (Math.random() < 0.5 ? 0xff5a1a : 0xffd04a) : (job.jets![q % job.jets!.length].userData.col ?? job.art.color)) });
        } else stamp(job.sg, job.built, p.x, p.y, job.r!, job.art.color);
      }
      job.done = n;
      const cur = job.brush[Math.min(job.brush.length - 1, n)], w = toWorld(cur.x, cur.y, 0, seg);
      if (hero) { hero.firing = !!job.byHero; hero.aim.copy(job.byHero ? w : toWorld(CANVAS.w / 2, CANVAS.h * 0.4, 0, seg)); }
      if (job.jets) job.jets.forEach((j, q) => { const p = job.brush![Math.min(job.brush!.length - 1, n + q * 3)]; const wp = toWorld(p.x, p.y, 7 + q * 1.5, seg).add(new THREE.Vector3(Math.sin(t * 2 + q) * 3, Math.cos(t * 1.7 + q) * 1.5, 0)); j.position.lerp(wp, Math.min(1, dt * 4)); j.lookAt(toWorld(p.x, p.y, 0, seg)); const fl = j.userData.flame as THREE.Mesh; fl.scale.setScalar(0.8 + Math.random() * 0.4); });
      if (job.dragon) { const p = job.brush![Math.min(job.brush!.length - 1, n)]; const wp = toWorld(p.x, p.y, 10, seg).add(new THREE.Vector3(Math.sin(t) * 4, -4, 0)); job.dragon.root.position.lerp(wp, Math.min(1, dt * 2.5)); job.dragon.root.rotation.y = Math.PI; job.dragon.update(dt); }
    }
    if (job.art.kind === 'mural' && Math.random() < dt * 3) { const c = new THREE.Color().setHSL(Math.random(), 1, 0.6); const p = new THREE.Vector3(segX(seg) + (Math.random() - 0.5) * WALL.w, 18 + Math.random() * 12, 4); parts.burst(p, c, 70, 9); sound.play('boom-0', 0.5); }
    if (k >= 1) { finish(job); jobs.splice(i, 1); }
  }
  tickShow(dt);
  sound.spraying = 0;
  sound.jets = jobs.reduce((n, j) => n + (j.jets?.length ?? 0), 0); sound.fire = jobs.some(j => j.dragon) ? 1 : 0;
  sound.motor = 0;
}

/* ------------------------------------------------------------ camera: luôn đóng khung cả mảng tường nhân vật đang đứng trước */
const camPos = new THREE.Vector3(0, 9.5, 50), camLook = new THREE.Vector3(0, 10.5, 0);
function direct(dt: number, t: number) {
  const P = portrait(), dist = P ? 50 : 42;
  const fx = hero ? hero.x - HERO_DX : segX(parkSeg);
  if (Math.abs(camLook.x - fx) > 80) { camLook.x = fx; camPos.x = fx; }          // nhảy xa (mới vào): đặt thẳng, không lia
  camLook.lerp(new THREE.Vector3(fx, 10.5, 0), Math.min(1, dt * 2.5));
  camPos.lerp(new THREE.Vector3(fx + Math.sin(t * 0.1) * 1.2, 9.5, dist), Math.min(1, dt * 2));
  camera.position.copy(camPos); camera.lookAt(camLook);
  if (Q.get('cam') === 'hero' && hero) { camera.position.set(hero.x + 6, HERO_H * 0.62, HERO_Z - 14); camera.lookAt(hero.x, HERO_H * 0.5, HERO_Z); }
  focus.copy(camLook);
  view.follow(camPos.x);
}

/* ------------------------------------------------------------ giao diện */
const avImg = (id: string, name: string, cls = '') => `<img class="${cls}" src="/avatar/${encodeURIComponent(id)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'ph',textContent:'${esc((name || '?').slice(0, 1).toUpperCase())}'}))">`;
$('legL').innerHTML = TIERS.slice(0, 5).map(t => `<div class="lg"><i>${t.icon}</i><b>${t.xu} xu</b><span>${esc(t.name)}</span></div>`).join('');
$('legR').innerHTML = TIERS.slice(5).map(t => `<div class="lg"><i>${t.icon}</i><b>${t.xu} xu</b><span>${esc(t.name)}</span></div>`).join('') + '<div class="lg"><i>❤️</i><b>20 tim</b><span>Bom Sơn</span></div>';
function setBoards(b: Boards) {
  $('recent').innerHTML = b.recent.map(r => `<div>@${esc(r.name)}<em>${esc(r.label)}</em></div>`).join('');
  $('board').innerHTML = (b.painters.length ? `<span class="h">🏆 TOP HỌA SĨ</span>` + b.painters.slice(0, 5).map((r, i) => `<span class="c">${avImg(r.av, r.name)}${i + 1}. ${esc(r.name)} <small>${r.v} xu</small></span>`).join('') : '')
    + (b.hall.length ? `<span class="h">🌟 BẢNG VÀNG</span>` + b.hall.slice(0, 3).map(r => `<span class="c">${avImg(r.av, r.name)}${esc(r.name)} <small>×${r.v}</small></span>`).join('') : '');
}
function announce(t1: string, s: string, color: string) {
  const c = $('center'); c.innerHTML = `<div class="t1" style="--c:${color}">${esc(t1)}</div><div class="s">${esc(s)}</div>`; c.hidden = false; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
  clearTimeout((c as unknown as { _t: number })._t); (c as unknown as { _t: number })._t = window.setTimeout(() => { c.hidden = true; }, 3500);
}
function banner(f: Extract<Fx, { k: 'gift' }>) {
  const box = $('banners'), d = document.createElement('div');
  d.className = 'banner' + (f.xu >= 500 ? ' vip' : f.xu >= 99 ? ' big' : '');
  d.innerHTML = `${avImg(f.av, f.name)}<div><b>${esc(f.name)}</b><span>tặng ${esc(f.gift)}${f.count > 1 ? ' x' + f.count : ''}</span></div><div class="tier">${f.icon} ${esc(f.tier)}</div>`;
  box.prepend(d); while (box.children.length > 4) box.lastChild!.remove();
  setTimeout(() => d.classList.add('out'), 4200); setTimeout(() => d.remove(), 4800);
}
function onFx(f: Fx) {
  switch (f.k) {
    case 'art': void startJob(f.art); break;
    case 'gift': banner(f); sound.play(f.xu >= 99 ? 'coin-big' : 'coin', 0.7); break;
    case 'likes': $('likeN').textContent = String(f.n); break;
    case 'color': $('status').textContent = `${f.name} chọn màu sơn mới`; break;
    case 'wipe': view.clearPaint(); for (const j of [...jobs]) { for (const x of j.jets ?? []) scene.remove(x); j.dragon?.dispose(); } jobs.length = 0; waiting.length = 0; show = null; glint.visible = false; if (hero) { hero.busy = 0; hero.firing = false; hero.cheer = 0; } park(); announce('🧽 RỬA TƯỜNG', 'Bức tường sạch bong, vẽ lại từ đầu!', '#1fa2ff'); break;
    case 'voice': sound.voice(f.url); break;
    case 'note': $('status').textContent = f.text; break;
    case 'join': { const box = $('joins'), d = document.createElement('div'); d.textContent = '👋 ' + f.name + ' vừa vào xem'; box.append(d); while (box.children.length > 3) box.firstChild!.remove(); setTimeout(() => d.classList.add('out'), 2600); setTimeout(() => d.remove(), 3200); break; }
    case 'thanks': {
      const box = $('banners'), d = document.createElement('div'); d.className = 'banner fan';
      d.innerHTML = `${avImg(f.id, f.name)}<div><b>${esc(f.name)}</b><span>${f.kind === 'follow' ? 'vừa follow ❤️ cảm ơn bạn!' : 'chia sẻ live 🔗 cảm ơn bạn!'}</span></div><div class="tier">${f.kind === 'follow' ? '✍️ Ký tên' : '🎨 Bom sơn'}</div>`;
      box.prepend(d); while (box.children.length > 4) box.lastChild!.remove(); setTimeout(() => d.classList.add('out'), 4200); setTimeout(() => d.remove(), 4800); sound.play('ring', 0.5); break;
    }
    case 'goal': {
      announce(`🎉 ĐẠT MỤC TIÊU TIM ${f.level}!`, `💖 Phi đội trái tim vẽ @${f.name} — thả tim nhiều nhất!`, '#ff4fc3');
      for (let i = 0; i < 5; i++) setTimeout(() => { parts.burst(new THREE.Vector3(focus.x + (Math.random() - 0.5) * 16, 16 + Math.random() * 8, 4), new THREE.Color().setHSL(Math.random(), 1, 0.6), 70, 9); sound.play('boom-' + (i % 3), 0.45); }, i * 280);
      break;
    }
    case 'lucky':
      if (f.phase === 'open') { announce('🎁 MƯA SƠN!', 'Bình luận "vẽ" trong 30 giây để được bốc thăm vẽ chân dung MIỄN PHÍ', '#a35bff'); sound.play('go', 0.6); }
      else announce('🎁 KẾT QUẢ MƯA SƠN', f.names?.length ? 'Trúng chân dung: ' + f.names.map(n => '@' + n).join(', ') : 'Chưa ai tham gia — lượt sau nhớ bình luận "vẽ" nhé!', '#ffd60a');
      break;
  }
}

/* ------------------------------------------------------------ dòng nhắc */
const TIPS = [
  'Bình luận = <b>xịt tên</b> của bạn lên tường',
  'Thả <b>20 tim</b> = 1 quả bom sơn có ảnh của bạn ❤️',
  'Gõ màu để đổi màu sơn: <i>do cam vang xanh tim hong</i>',
  'Cả phòng thả tim đạt mục tiêu → <b>phi đội trái tim</b> vẽ người thả nhiều nhất 💖',
  '<b>Follow</b> = chữ ký to của bạn trên tường · <b>Chia sẻ</b> = bom sơn có ảnh 🔗',
  'Mỗi 5 phút có <b>Mưa sơn</b>: bình luận <i>"vẽ"</i> để trúng chân dung miễn phí 🎁',
  'Tặng quà = chân dung có cánh, máy bay phun sơn, rồng sơn, bích hoạ 🌟',
];
let tip = 0;
setInterval(() => { const h = $('howto'); h.style.opacity = '0'; setTimeout(() => { h.innerHTML = TIPS[tip = (tip + 1) % TIPS.length]; h.style.opacity = '1'; }, 400); }, 6000);
$('howto').innerHTML = TIPS[0];

/* ------------------------------------------------------------ mạng */
const net = new Net(LIVE ? 'view' : 'control');
net.onState = async (s: ServerMessage) => {
  if (s.nextSeg !== undefined) parkSeg = s.nextSeg;
  if (s.arts) { view.clearPaint(); if (!jobs.length && !show) view.keepAround(parkSeg, KEEP); for (const a of s.arts) if (view.segs.has(a.seg)) await drawInstant(a); }
  for (const f of s.fx) if (!(s.hello && f.k === 'art')) onFx(f);
  if (s.boards) setBoards(s.boards);
  if (s.live) { const L = s.live; $('live').textContent = L.status === 'connected' ? `🔴 LIVE @${L.uniqueId}` : L.status === 'connecting' ? 'Đang nối TikTok…' : L.status === 'reconnecting' ? 'Đang nối lại…' : L.status === 'error' ? 'Lỗi: ' + L.error : 'Chưa nối TikTok'; $('live').classList.toggle('on', L.status === 'connected'); }
  if (s.viewers !== undefined) $('viewers').textContent = `👥 ${s.viewers}`;
  if (s.goal) { const g = s.goal, k = Math.min(1, g.n / g.need); $('goalLv').textContent = String(g.level); $('goalN').textContent = `${g.n}/${g.need}`; $('goalFill').style.width = (k * 100).toFixed(1) + '%'; $('goal').classList.toggle('hot', k >= 0.8); }
  if (s.lucky) { const L = s.lucky, el = $('lucky'); el.hidden = false; el.classList.toggle('small', !L.open);
    el.innerHTML = L.open ? `<b>🎁 MƯA SƠN · còn <em>${L.left}s</em></b><span>Bình luận <em>"vẽ"</em> để trúng chân dung miễn phí · ${L.n} người tham gia</span>`
      : `<b>🎁 Mưa sơn sau ${Math.floor(L.left / 60)}:${String(L.left % 60).padStart(2, '0')}</b>`; }
  if (s.nextSeg !== undefined) park();
  if (s.settings) { const v = $('setVoice') as HTMLInputElement; if (v) v.checked = s.settings.voice; }
};
net.onStatus = up => { $('offline').hidden = up; };
loadModels().finally(() => {
  models = modelsWith('khach-').concat(modelsWith('bao-ve'));
  hero = new Hero(hasModel('hoa-si') ? 'hoa-si' : models.length ? models[2 % models.length] : '', standX(parkSeg));      // xạ thủ graffiti
  net.connect();
});

/* ------------------------------------------------------------ âm thanh, điều khiển */
const unlockEl = $('unlock'); unlockEl.hidden = false;
const unlock = () => { sound.unlock(); unlockEl.hidden = true; };
addEventListener('pointerdown', unlock); addEventListener('keydown', unlock); addEventListener('click', unlock);
$('soundBtn').onclick = () => { sound.setMuted(!sound.muted); $('soundBtn').textContent = sound.muted ? '🔇' : '🔈'; };
$('musicBtn').onclick = () => { sound.setMusic(!sound.musicOn); ($('musicBtn') as HTMLElement).style.opacity = sound.musicOn ? '1' : '.4'; };
if (!LIVE) {
  $('sim').hidden = false;
  const send = (m: ControlMessage) => net.send(m);
  $('simToggle').onclick = () => $('simBody').classList.toggle('hide');
  const NAMES = ['Mèo Mập', 'Bé Sóc', 'Ken Graffiti', 'Lan Ngọc', 'Tuấn Tú', 'Ríu Rít', 'Hải Đăng', 'Phương Anh', 'Đức Huy', 'Bảo Ngân'];
  const who = $('simWho') as HTMLSelectElement; who.innerHTML = NAMES.map(n => `<option>${n}</option>`).join('');
  const cur = () => ({ id: who.value, name: who.value });
  const inp = (id: string) => $(id) as HTMLInputElement;
  $('ttConnect').onclick = () => send({ t: 'ctl', cmd: 'connect', user: inp('ttUser').value });
  $('ttDisconnect').onclick = () => send({ t: 'ctl', cmd: 'disconnect' });
  $('simLike').onclick = () => send({ t: 'sim', kind: 'like', ...cur(), count: 20 });
  $('simTag').onclick = () => send({ t: 'sim', kind: 'comment', ...cur(), text: 'hello' });
  $('simSend').onclick = () => { send({ t: 'sim', kind: 'comment', ...cur(), text: inp('simText').value || 'hi' }); inp('simText').value = ''; };
  $('simGifts').innerHTML = TIERS.map(t => `<button data-xu="${t.xu}" title="${esc(t.desc)}">${t.icon} ${t.xu}</button>`).join('') + '<button data-xu="1" data-n="5">🌹 x5</button>';
  $('simGifts').onclick = e => { const b = (e.target as HTMLElement).closest('[data-xu]') as HTMLElement | null; if (b) send({ t: 'sim', kind: 'gift', ...cur(), gift: TIERS.find(x => x.xu === +b.dataset.xu!)?.name ?? 'Quà', diamonds: +b.dataset.xu!, count: +(b.dataset.n ?? 1) }); };
  inp('setVoice').onchange = () => send({ t: 'ctl', cmd: 'settings', settings: { voice: inp('setVoice').checked } });
  $('wipe').onclick = () => { if (confirm('Rửa sạch toàn bộ bức tường?')) send({ t: 'ctl', cmd: 'wipe' }); };
  $('clearSim').onclick = () => send({ t: 'ctl', cmd: 'clearSim' });
  ($('openLive') as HTMLAnchorElement).onclick = e => { e.preventDefault(); window.open('/?live=1', 'graffiti_live', 'popup,width=540,height=960'); };
}

/* ------------------------------------------------------------ vòng vẽ */
const clock = new THREE.Clock(); let t = 0;
function frame() {
  const dt = Math.min(0.05, clock.getDelta()); t += dt;
  tickJobs(dt, t);
  tickShots(dt);
  hero?.update(dt, t);
  parts.update(dt);
  direct(dt, t);
  view.update(renderer);
  sound.update();
  if (composer) composer.render(); else renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
void CANVAS;
