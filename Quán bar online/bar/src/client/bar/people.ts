import * as THREE from 'three';
import { DRINKS, drinkOf } from '../../shared/bar.ts';
import type { DrinkKey } from '../../shared/bar.ts';
import type { BarBattle, BarGuest, Gender } from '../../shared/types.ts';
import type { DanceDef, DanceGroup } from '../../shared/dances.ts';
import { DANCES } from '../../shared/dances.ts';
import { DanceController } from './danceControl.ts';
import { Aura, auraTick } from './aura.ts';
import type { Section } from './stage.ts';
import { GlbFigure, cloneProp, guestModels, hasTemplate, hash, roleModels } from '../rig/glb.ts';
import type { Outfit, Pose, StaffRole, TrickKind } from '../rig/glb.ts';
import { buildDrink, buildShaker, drinkUrl } from './drinks.ts';
import { BAR_STATIONS, COUNTER, DJ_SPOTS, FLOOR, FLOOR_SPOTS, GUARD_SPOTS, HOST_SPOT, NODES, PICKUP, SHELF_SPOT, SOFA_SPOTS, STAND_SPOTS, STOOLS, TABLE_SPOTS, VIP_SPOTS, WAITER_HOME, floorY, route } from './layout.ts';
import type { Spot } from './layout.ts';

// nhịp nhạc truyền cho người nhảy
export interface MusicSync { beat: boolean; phase: number; bpm: number; section: Section; dropHit: boolean }

// Người trong quán: nhân viên (2 bartender, 2 DJ, 2 phục vụ, 2 bảo vệ, lễ tân), khách là người xem thật trong live
// và vài khách vãng lai (không tên) cho quán khỏi vắng khi mới mở. Mỗi người một mẫu người 3D như thật (Rocketbox),
// trang phục tô lại theo vai và theo người (cùng id luôn cùng mẫu, cùng bộ đồ), cao thấp, đậm mảnh khác nhau.
// Động tác có trong file (đứng thở, đi, vỗ tay, cổ vũ, ba điệu nhảy, uống, chào) phát bằng AnimationMixer;
// pha chế (lắc shaker, rót, lau quầy, xếp chai), bê khay, chơi DJ, ngồi, chụp ảnh, khoanh tay... dựng bằng góc khớp.

export type Act = 'idle' | 'walk' | 'talk' | 'sip' | 'clap' | 'hype' | 'dance' | 'greet' | 'shake' | 'pour' | 'wipe' | 'arrange' | 'serve' | 'carry'
  | 'dj' | 'djhype' | 'photo' | 'guard' | 'earpiece' | 'toast' | 'sit' | 'sitTalk' | 'sitSip' | 'sitClap';
const CLIP_ACTS = new Set<Act>(['idle', 'walk', 'clap', 'hype', 'dance', 'greet', 'sip']);
const CLIP_NAME: Partial<Record<Act, string>> = { idle: 'idle', walk: 'walk', clap: 'clap', hype: 'hype', dance: 'dance', greet: 'greet', sip: 'sip' };

function pose(act: Act, t: number): Pose {
  const p: Pose = { legL: 0, legR: 0, armL: 0.06, armR: 0.06, armLz: 0.12, armRz: -0.12, bend: 0, bob: 0, headTilt: 0, spin: 0, tilt: 0, lift: 0, foreL: 0, foreR: 0 };
  const s = Math.sin, sit = act === 'sit' || act === 'sitTalk' || act === 'sitSip' || act === 'sitClap';
  if (sit){ p.legL = p.legR = -1.45; p.armL = p.armR = -0.55; p.foreL = p.foreR = 0.55; p.armLz = 0.2; p.armRz = -0.2; }
  switch (act){
    case 'walk': { const w = s(t * 8.5); p.legL = w * 0.5; p.legR = -w * 0.5; p.armL = -w * 0.4; p.armR = w * 0.4; p.bob = Math.abs(w) * 0.03; break; }
    case 'idle': p.armL = p.armR = 0.06 + s(t * 1.4) * 0.03; p.headTilt = s(t * 0.5) * 0.06; break;
    case 'talk': p.armR = -0.5 + s(t * 2.3) * 0.25; p.foreR = 0.9 + s(t * 3.1) * 0.2; p.armRz = -0.2; p.headTilt = s(t * 1.7) * 0.1; break;
    case 'sip': { const k = Math.max(0, s(t * 1.2)); p.armR = -0.6 - k * 0.2; p.foreR = 1.2 + k * 0.8; p.armRz = -0.25; p.headTilt = -k * 0.2; break; }
    case 'clap': { const k = Math.max(0, s(t * 7)); p.armL = p.armR = -1.05; p.armLz = 0.55 - k * 0.35; p.armRz = -0.55 + k * 0.35; break; }
    case 'hype': p.armL = p.armR = Math.PI - 0.35 + s(t * 10) * 0.25; p.armLz = 0.25; p.armRz = -0.25; p.bob = Math.abs(s(t * 10)) * 0.08; break;
    case 'dance': { const k = s(t * 6.5); p.legL = Math.max(0, k) * 0.25; p.legR = Math.max(0, -k) * 0.25; p.armL = -0.6 + k * 0.3; p.armR = -0.6 - k * 0.3; p.armLz = 0.3; p.armRz = -0.3; p.foreL = p.foreR = 0.6; p.bob = Math.abs(s(t * 13)) * 0.05; p.spin = k * 0.15; break; }
    case 'greet': p.armR = Math.PI - 0.4 + s(t * 8) * 0.25; p.armRz = -0.3; break;
    case 'shake': { const k = s(t * 16); p.armR = -1.75 + k * 0.22; p.armL = -1.6 + k * 0.22; p.armRz = -0.32; p.armLz = 0.32; p.foreR = 1.25; p.foreL = 1.25; p.bob = Math.abs(k) * 0.012; p.headTilt = 0.05; break; }
    case 'pour': p.armR = -1.25; p.armRz = -0.05; p.foreR = 0.55; p.armL = -0.75; p.foreL = 0.9; p.armLz = 0.25; p.bend = 0.12; p.headTilt = 0.2; break;
    case 'wipe': { const c = t * 3.2; p.armL = -0.85 + s(c) * 0.12; p.armLz = 0.2 + Math.cos(c) * 0.2; p.foreL = 0.35; p.armR = -0.15; p.bend = 0.28; p.headTilt = 0.15; break; }
    case 'arrange': p.armR = -2.55 + s(t * 1.5) * 0.15; p.armRz = -0.1; p.foreR = 0.2; p.armL = -0.2; p.headTilt = -0.25; break;
    case 'serve': p.armR = -1.25; p.armRz = -0.1; p.foreR = 0.2; p.bend = 0.12; p.armL = -0.2; break;
    case 'carry': p.armL = -0.4; p.armLz = -0.1; p.foreL = 1.35; p.armR = 0.06; break;
    case 'dj': { const n = s(t * 13); p.armL = -0.95; p.armR = -0.9 + s(t * 0.7) * 0.1; p.armLz = 0.3; p.armRz = -0.3; p.foreL = 0.75 + n * 0.05; p.foreR = 0.75; p.headTilt = 0.18 + n * 0.1; p.bob = Math.abs(n) * 0.02; p.bend = 0.15; break; }
    case 'djhype': p.armR = Math.PI - 0.25 + s(t * 13) * 0.15; p.armRz = -0.2; p.armL = -0.95; p.armLz = 0.3; p.foreL = 0.75; p.headTilt = -0.1 + s(t * 13) * 0.12; p.bob = Math.abs(s(t * 6.5)) * 0.05; break;
    case 'photo': p.armL = p.armR = -1.55; p.armLz = 0.42; p.armRz = -0.42; p.foreL = p.foreR = 1.2; p.headTilt = 0.05; break;
    case 'guard': p.armL = p.armR = -0.5; p.armLz = 0.6; p.armRz = -0.6; p.foreL = p.foreR = 1.7; p.bend = -0.03; p.headTilt = s(t * 0.3) * 0.1; break;
    case 'earpiece': p.armR = -1.3; p.armRz = 0.5; p.foreR = 2.2; p.headTilt = 0.1; p.armL = 0.06; break;
    case 'toast': p.armR = -2.2 + s(t * 2) * 0.1; p.armRz = -0.3; p.foreR = 0.4; p.armL = -0.3; break;
    case 'sitTalk': p.armR = -0.7 + s(t * 2.3) * 0.2; p.foreR = 1.1; break;
    case 'sitSip': { const k = Math.max(0, s(t * 1.3)); p.armR = -0.6 - k * 0.25; p.foreR = 1.3 + k * 0.75; p.armRz = -0.25; p.headTilt = -k * 0.22; break; }
    case 'sitClap': { const k = Math.max(0, s(t * 7)); p.armL = p.armR = -1.05; p.armLz = 0.55 - k * 0.35; p.armRz = -0.55 + k * 0.35; break; }
  }
  return p;
}

/* ------------------------------------------------------------ hình người */
// Người dựng tạm bằng khối (khi máy chưa có file nhân vật 3D trong bar/models/): vẫn đi lại, ngồi, cầm ly được
class Mannequin {
  readonly root = new THREE.Group(); readonly held = new THREE.Group(); readonly heldL = new THREE.Group();
  lodStep = 1;
  private body: THREE.Group;
  private h: number;
  constructor(height: number, color: number){
    this.h = height;
    const skin = new THREE.MeshStandardMaterial({ color: 0xd8b49a, roughness: 0.6 }), cloth = new THREE.MeshPhysicalMaterial({ color, roughness: 0.6, sheen: 0.5 });
    this.body = new THREE.Group(); this.root.add(this.body);
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, height * 0.32, 6, 16), cloth); torso.position.y = height * 0.62; this.body.add(torso);
    const legs = new THREE.Mesh(new THREE.CapsuleGeometry(0.13, height * 0.38, 6, 12), cloth); legs.position.y = height * 0.27; this.body.add(legs);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 16), skin); head.position.y = height * 0.91; this.body.add(head);
    this.body.traverse(o => { (o as THREE.Mesh).castShadow = true; });
    this.root.add(this.held, this.heldL);
  }
  update(x: number, z: number, yaw: number, p: Pose, sit: boolean, o: { y?: number; seat?: number; dance?: unknown }){
    this.root.position.set(x, (o.y ?? 0) + p.bob - (sit ? Math.max(0, this.h * 0.5 - (o.seat ?? 0.46)) : 0), z);
    this.root.rotation.y = yaw + p.spin;
    this.held.position.set(0.22, this.h * (p.armR < -1.6 ? 0.85 : 0.55), 0.2);
    this.heldL.position.set(-0.22, this.h * 0.6, 0.25);
  }
  handWorld(_r = true, out = new THREE.Vector3()){ return this.held.getWorldPosition(out); }
  headWorld(out = new THREE.Vector3()){ return this.root.getWorldPosition(out).setY(this.root.position.y + this.h * 0.92); }
  hasClip(){ return false; }
  dress(){}
  attach(){ return false; }
  trick(_k: TrickKind, _s: number){}
  detach(o: THREE.Object3D){ o.removeFromParent(); }
  dispose(){ this.root.removeFromParent(); this.root.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ m.geometry.dispose(); (m.material as THREE.Material).dispose(); } }); }
}
type Figure = GlbFigure | Mannequin;

/* ------------------------------------------------------------ đồ dùng */
const drinkCache = new Map<DrinkKey, THREE.Group>();
export function makeDrink(k: DrinkKey): THREE.Object3D {
  const fromGlb = cloneProp(drinkUrl(k));
  if (fromGlb) return fromGlb;
  let base = drinkCache.get(k);
  if (!base){ base = buildDrink(k); drinkCache.set(k, base); }
  return base.clone(true);
}
function headphones(){
  const g = new THREE.Group(), m = new THREE.MeshPhysicalMaterial({ color: 0x111114, roughness: 0.35, clearcoat: 0.6 }), pad = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.098, 0.009, 8, 32, Math.PI), m); band.position.y = 0.1; g.add(band);
  for (const s of [-1, 1]){
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.03, 24).rotateZ(Math.PI / 2), m); cup.position.set(s * 0.093, 0.085, 0); g.add(cup);
    const p = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.01, 8, 20).rotateY(Math.PI / 2), pad); p.position.set(s * 0.078, 0.085, 0); g.add(p);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.003, 6, 24).rotateY(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x3ad8ff, emissiveIntensity: 3 })); ring.position.set(s * 0.109, 0.085, 0); g.add(ring);
  }
  return g;
}
function bowtie(){
  const g = new THREE.Group(), m = new THREE.MeshPhysicalMaterial({ color: 0x0a0a0a, roughness: 0.4, sheen: 1, sheenColor: new THREE.Color(0x404040) });
  for (const s of [-1, 1]){ const w = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.05, 4).rotateZ(s * Math.PI / 2), m); w.position.x = s * 0.025; g.add(w); }
  g.add(new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 6), m));
  return g;
}
function earpiece(){
  const g = new THREE.Group(), m = new THREE.MeshStandardMaterial({ color: 0xd8d8d0, roughness: 0.3, transparent: true, opacity: 0.85 });
  const coil = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 24 }, (_, i) => new THREE.Vector3(0.078 + Math.cos(i * 1.6) * 0.004, 0.06 - i * 0.008, -0.02 + Math.sin(i * 1.6) * 0.004))), 60, 0.0018, 4);
  g.add(new THREE.Mesh(coil, m));
  const bud = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 6), m); bud.position.set(0.078, 0.065, 0); g.add(bud);
  return g;
}
function tray(){
  const g = new THREE.Group(), m = new THREE.MeshPhysicalMaterial({ color: 0xc8ccd2, metalness: 0.9, roughness: 0.32 });
  const d = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.18, 0.012, 40), m); d.castShadow = true; g.add(d);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.185, 0.006, 6, 40).rotateX(Math.PI / 2), m); rim.position.y = 0.008; g.add(rim);
  g.position.set(0.02, 0.0, 0.12);
  return g;
}
function phone(){
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.15, 0.008), new THREE.MeshPhysicalMaterial({ color: 0x101014, metalness: 0.6, roughness: 0.2, clearcoat: 1 })); g.add(b);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.068, 0.14), new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xbad0ff, emissiveIntensity: 1.6 })); scr.position.z = -0.0045; scr.rotation.y = Math.PI; g.add(scr);
  const flash = new THREE.Mesh(new THREE.CircleGeometry(0.006, 10), new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveIntensity: 0 })); flash.position.set(0.025, 0.06, 0.0045); flash.name = 'flash'; g.add(flash);
  g.position.set(-0.04, 0.06, 0.06);
  return g;
}

/* ------------------------------------------------------------ trang phục */
const PAL_M: Outfit[] = [
  { dark: 0x0a0a0c, light: 0x2c2c34 }, { dark: 0x0b1a3a, light: 0x8aa0c8 }, { dark: 0x2a0a10, light: 0xc8a070 }, { dark: 0x0a0a0a, light: 0xe8e4dc },
  { dark: 0x18241a, light: 0xa8b898 }, { dark: 0x2a1a3a, light: 0xc8b0e0 }, { dark: 0x3a2a1a, light: 0xe0c8a0 }, { dark: 0x101820, light: 0x40b8d0 },
];
const PAL_F: Outfit[] = [
  { dark: 0x0a0a0c, light: 0xd0c0e0, sheen: 0.8 }, { dark: 0x3a0612, light: 0xff4060, sheen: 0.9 }, { dark: 0x0a0a20, light: 0x4a68ff, sheen: 0.8 }, { dark: 0x200a2a, light: 0xff60d0, sheen: 0.9 },
  { dark: 0x2a2010, light: 0xffd080, shiny: 0.6, sheen: 1 }, { dark: 0x0a2a20, light: 0x40e0b0, sheen: 0.8 }, { dark: 0x1a1a1a, light: 0xffffff, sheen: 0.6 }, { dark: 0x2a0a3a, light: 0xa060ff, sheen: 0.9 },
];
// bộ dạ tiệc lấp lánh (tặng từ 10 xu): vải kim sa, ánh kim, đẹp hơn đồ đi chơi thường
const PAL_GLAM_M: Outfit[] = [{ dark: 0x0a0a14, light: 0x9fb4ff, shiny: 0.65, sheen: 1, mix: 0.9 }, { dark: 0x140008, light: 0xff5a8a, shiny: 0.6, sheen: 1, mix: 0.9 }, { dark: 0x050505, light: 0xd8dce8, shiny: 0.75, sheen: 1, mix: 0.9 }];
const PAL_GLAM_F: Outfit[] = [{ dark: 0x1a0018, light: 0xff40c0, shiny: 0.75, sheen: 1, mix: 0.95 }, { dark: 0x0a0a12, light: 0xe8ecff, shiny: 0.8, sheen: 1, mix: 0.95 }, { dark: 0x200a00, light: 0xffb040, shiny: 0.75, sheen: 1, mix: 0.95 }, { dark: 0x00101a, light: 0x40e0ff, shiny: 0.75, sheen: 1, mix: 0.95 }];
const PAL_VIP: Outfit[] = [{ dark: 0x050505, light: 0xffc860, shiny: 0.7, sheen: 1 }, { dark: 0x1a1208, light: 0xfff0c0, shiny: 0.5, sheen: 1 }, { dark: 0x2a0008, light: 0xffd070, shiny: 0.6, sheen: 1 }];

/* ------------------------------------------------------------ người */
type Kind = 'guest' | 'npc' | 'staff';
interface Person {
  id: string; kind: Kind; role: string; name: string; gender: Gender; fig: Figure; height: number;
  x: number; z: number; yaw: number; tyaw: number; path: THREE.Vector2[]; speed: number;
  act: Act; actUntil: number; baseAct: Act; spot: Spot | null; floor: Spot | null; mode: 'arrive' | 'stay' | 'dance' | 'leave' | 'work' | 'battle';
  dance: DanceDef | null; battleSpot: { x: number; z: number; yaw: number } | null; pendingDance: number;
  danceUntil: number; nextIdle: number; vip: boolean; drink: THREE.Object3D | null; drinkKey: DrinkKey | ''; sipAt: number;
  look: string; t0: number; gone: boolean; hl: number;
  lvl: number; aura: Aura | null;      // cấp độ và hào quang của cấp đó
  avatar: THREE.Object3D | null; avatarWant: boolean;   // ảnh đại diện TikTok trên mặt
  skill: { x: number; z: number; until: number } | null;   // đang ra chỗ trống múa skill quà
}
interface Job { n: number; guest: string; drink: DrinkKey; phase: 'walk' | 'shake' | 'pour' | 'slide' | 'wait' | 'carry' | 'hand' | 'done'; t: number; obj: THREE.Object3D | null; by: number; waiter: number; from: THREE.Vector3; to: THREE.Vector3 }

const WALK = 1.25;
const _v = new THREE.Vector3();

export class People {
  readonly group = new THREE.Group();
  readonly persons = new Map<string, Person>();
  private staff: Person[] = [];
  private bartenders: Person[] = []; private waiters: Person[] = []; private djs: Person[] = []; private guards: Person[] = []; private host: Person | null = null;
  private jobs: Job[] = [];
  private loose: { obj: THREE.Object3D; until: number }[] = [];
  private used = new Set<Spot>(); private usedFloor = new Set<Spot>();
  private realModels = false;
  private npcTarget: number;
  private maxGuests: number;
  private npcN = 0;
  private showMode = 'idle';
  private clock = 0;
  readonly dances = new DanceController();
  private music: MusicSync = { beat: false, phase: 0, bpm: 124, section: 'groove', dropHit: false };
  battleState: BarBattle | null = null;
  private battleKey = '';
  onArriveDoor: ((id: string) => void) | null = null;

  constructor(opts: { npc: number; maxGuests: number }){ this.npcTarget = opts.npc; this.maxGuests = opts.maxGuests; }

  // gọi sau khi nạp xong nhân vật 3D (hoặc biết chắc là không có): dựng nhân viên
  init(){
    const nam = guestModels('nam'), nu = guestModels('nu'), any = [...nam, ...nu, ...guestModels('chung')];
    this.realModels = any.length > 0;
    const pick = (role: StaffRole, list: string[], i: number) => roleModels(role)[0] ?? (list.length ? list[i % list.length] : any[i % Math.max(1, any.length)] ?? '');
    const S: { id: string; role: StaffRole; key: string; h: number; out: Outfit; build?: number; acc: ('headphones' | 'bowtie' | 'earpiece')[]; g: Gender }[] = [
      { id: 'bt1', role: 'bartenderNam', key: pick('bartenderNam', nam, 0), h: 1.8, out: { dark: 0x0b0b0e, light: 0xf2efe8, mix: 0.95 }, acc: ['bowtie'], g: 'nam' },
      { id: 'bt2', role: 'bartenderNu', key: pick('bartenderNu', nu, 1), h: 1.68, out: { dark: 0x050507, light: 0x3a3a40, sheen: 0.6 }, acc: [], g: 'nu' },
      { id: 'dj1', role: 'djNam', key: pick('djNam', nam, 2), h: 1.82, out: { dark: 0x08080a, light: 0x26262c }, acc: ['headphones'], g: 'nam' },
      { id: 'dj2', role: 'djNu', key: pick('djNu', nu, 3), h: 1.7, out: { dark: 0x0a0610, light: 0xb8bcc8, sheen: 0.7, shiny: 0.4 }, acc: ['headphones'], g: 'nu' },
      { id: 'wt1', role: 'phucVu', key: pick('phucVu', nam, 4), h: 1.76, out: { dark: 0x060606, light: 0xf4f4f0 }, acc: ['bowtie'], g: 'nam' },
      { id: 'wt2', role: 'phucVu', key: roleModels('phucVu')[1] ?? pick('phucVu', nu, 0), h: 1.66, out: { dark: 0x050505, light: 0xeeeeee }, acc: [], g: 'nu' },
      { id: 'sec1', role: 'baoVe', key: roleModels('baoVe')[0] ?? pick('baoVe', nam, 5), h: 1.9, out: { dark: 0x050505, light: 0x1c1c20 }, build: 1.12, acc: ['earpiece'], g: 'nam' },
      { id: 'sec2', role: 'baoVe', key: roleModels('baoVe')[1] ?? pick('baoVe', nam, 3), h: 1.86, out: { dark: 0x050505, light: 0x1c1c20 }, build: 1.1, acc: ['earpiece'], g: 'nam' },
      { id: 'host', role: 'leTan', key: pick('leTan', nu, 2), h: 1.7, out: { dark: 0x14020a, light: 0x9a1838, sheen: 0.8 }, acc: [], g: 'nu' },
    ];
    for (const s of S){
      const own = s.key.startsWith('role:');
      const fig = this.figure(s.key, s.h, own ? undefined : s.out, s.build ?? 1, s.out.light);
      if (fig instanceof GlbFigure) for (const a of s.acc){
        if (a === 'headphones') fig.attach(headphones(), 'head', new THREE.Vector3(0, 0.02, -0.005));
        if (a === 'bowtie') fig.attach(bowtie(), 'head', new THREE.Vector3(0, -0.075, 0.06));
        if (a === 'earpiece') fig.attach(earpiece(), 'head', new THREE.Vector3(0, 0.02, 0));
      }
      const p = this.person(s.id, 'staff', s.role, '', s.g, fig, s.h);
      this.staff.push(p);
      if (s.role.startsWith('bartender')) this.bartenders.push(p);
      else if (s.role.startsWith('dj')) this.djs.push(p);
      else if (s.role === 'phucVu') this.waiters.push(p);
      else if (s.role === 'baoVe') this.guards.push(p);
      else this.host = p;
    }
    this.bartenders.forEach((p, i) => { const s = BAR_STATIONS[i]; this.place(p, s.x, s.z, Math.PI / 2); p.baseAct = 'wipe'; p.mode = 'work'; });
    this.djs.forEach((p, i) => { const s = DJ_SPOTS[i]; this.place(p, s.x, s.z, 0); p.baseAct = 'dj'; p.mode = 'work'; });
    this.waiters.forEach((p, i) => { const s = WAITER_HOME[i]; this.place(p, s.x, s.z, s.yaw); p.baseAct = 'carry'; p.mode = 'work'; p.fig.heldL.add(tray()); });
    this.guards.forEach((p, i) => { const s = GUARD_SPOTS[i]; this.place(p, s.x, s.z, s.yaw); p.baseAct = 'guard'; p.mode = 'work'; });
    if (this.host){ this.place(this.host, HOST_SPOT.x, HOST_SPOT.z, HOST_SPOT.yaw); this.host.baseAct = 'idle'; this.host.mode = 'work'; }
    // bartender cầm sẵn shaker (ẩn khi không pha)
    for (const b of this.bartenders){ const sh = buildShaker(); sh.visible = false; sh.name = 'shaker'; b.fig.held.add(sh); }
  }

  private figure(key: string, h: number, outfit: Outfit | undefined, build: number, color: number): Figure {
    if (key && hasTemplate(key)){
      const f = new GlbFigure('staff', key, h, { unit: 1, outfit, build, seat: 0.46 });
      // phụ kiện đi kèm vài mẫu (hoa cài áo, voan, vương miện) không hợp quán bar
      f.root.traverse(o => { const m = o as THREE.Mesh; if (!m.isMesh) return; const mats = Array.isArray(m.material) ? m.material : [m.material]; if (mats.some(x => /flower|rose|leaf|veil|tulle|tiara|pearl/i.test(x.name))) m.visible = false; });
      return f;
    }
    return new Mannequin(h, color);
  }
  private person(id: string, kind: Kind, role: string, name: string, gender: Gender, fig: Figure, height: number): Person {
    const p: Person = { id, kind, role, name, gender, fig, height, x: 0, z: 14, yaw: 0, tyaw: 0, path: [], speed: WALK * (0.9 + (hash(id) % 20) / 100),
      act: 'idle', actUntil: 0, baseAct: 'idle', spot: null, floor: null, mode: 'arrive', dance: null, battleSpot: null, pendingDance: 0, danceUntil: 0, nextIdle: 0, vip: false, drink: null, drinkKey: '', sipAt: 0,
      look: '', t0: (hash(id) % 1000) / 37, gone: false, hl: 0, lvl: 0, aura: null, avatar: null, avatarWant: false, skill: null };
    this.persons.set(id, p);
    this.group.add(fig.root);
    return p;
  }
  private place(p: Person, x: number, z: number, yaw: number){ p.x = x; p.z = z; p.yaw = p.tyaw = yaw; p.path = []; }

  /* ---------------------------------------------------------- khách */
  // đồng bộ danh sách khách từ server: thêm người mới (đi từ ngoài phố vào), người về thì đi ra, VIP thì lên khu VIP.
  // initial: lần đầu mở trang, khách đã ở trong quán thì ngồi sẵn chỗ, không đi từ ngoài phố vào
  sync(list: BarGuest[], initial = false){
    const want = new Map(list.slice(0, this.maxGuests).map(g => [g.id, g]));
    for (const p of this.persons.values()) if (p.kind === 'guest' && !want.has(p.id) && p.mode !== 'leave') this.leave(p);
    for (const g of want.values()){
      let p = this.persons.get(g.id);
      const look = `${g.gender}|${g.vip ? 1 : 0}|${g.glam ? 1 : 0}`;
      if (p && p.look !== look && p.kind === 'guest' && p.mode !== 'leave'){
        // đổi nam/nữ: đổi luôn mẫu người; lên VIP: thay bộ đồ dạ tiệc và lên khu VIP
        // đổi nam/nữ thật sự (so với giới tính server báo lần trước, không so với giới tính máy tự chọn khi chưa khai)
        if (p.look.split('|')[0] !== g.gender){ this.dispose(p); p = undefined; }
        else { const seatAgain = p.vip !== g.vip; p.vip = g.vip; p.look = look; p.fig.dress(this.outfitFor(g.id, g.gender, g.vip, g.glam)); if (seatAgain && p.mode === 'stay') this.seat(p, true); }
      }
      if (!p){
        p = this.guest(g.id, g.name, g.gender, g.vip, 'guest', initial, g.glam);
        p.look = look;
        if (g.drink) this.giveDrink(p, g.drink);
      }
      p.name = g.name;
      this.setLevel(p, g.lvl ?? 0);
      this.setAvatar(p, !!g.avatar);
    }
    // khách vãng lai: đủ cho quán ấm cúng, có khách thật thì bớt dần
    const real = [...this.persons.values()].filter(p => p.kind === 'guest' && p.mode !== 'leave').length;
    const npcs = [...this.persons.values()].filter(p => p.kind === 'npc' && p.mode !== 'leave' && p.id !== 'house');
    const target = Math.max(0, this.npcTarget - real);
    for (let i = npcs.length; i < target; i++) this.guest('npc' + (this.npcN++), '', this.npcN % 2 ? 'nu' : 'nam', false, 'npc', this.npcN <= this.npcTarget);
    for (const p of npcs.slice(target)) this.leave(p);
  }
  private outfitFor(id: string, gender: Gender, vip: boolean, glam = false){
    const h = hash(id + '#o');
    if (vip) return PAL_VIP[h % PAL_VIP.length];
    if (glam){ const l = gender === 'nu' ? PAL_GLAM_F : PAL_GLAM_M; return l[h % l.length]; }
    return (gender === 'nu' ? PAL_F : PAL_M)[h % 8];
  }
  private guest(id: string, name: string, gender: Gender, vip: boolean, kind: 'guest' | 'npc', already = false, glam = false){
    const h = hash(id), nam = guestModels('nam'), nu = guestModels('nu'), chung = guestModels('chung');
    const g: Gender = gender || (h % 2 ? 'nu' : 'nam');
    const list = (g === 'nu' ? nu : nam).length ? (g === 'nu' ? nu : nam) : [...nam, ...nu, ...chung];
    const key = list.length ? list[h % list.length] : '';
    const height = g === 'nu' ? 1.58 + (h % 15) / 100 : 1.7 + (h % 17) / 100, build = 0.94 + ((h >> 5) % 15) / 100;
    const out = this.outfitFor(id, g, vip, glam);
    const fig = this.figure(key, height, out, build, out.light);
    const p = this.person(id, kind, kind, name, g, fig, height);
    p.vip = vip;
    // khách vãng lai lúc mở trang đã ngồi sẵn trong quán; người mới vào thì đi từ ngoài phố vào cửa
    if (already){ this.seat(p, false); if (p.spot){ this.place(p, p.spot.x, p.spot.z, p.spot.yaw); p.mode = 'stay'; } if (kind === 'npc' && h % 3) this.giveDrink(p, DRINKS[h % 8].key); }
    else { this.place(p, (h % 2 ? -1 : 1) * (2.5 + (h % 50) / 10), 14.2, Math.PI); this.seat(p, true); p.mode = 'arrive'; }
    return p;
  }
  // chọn chỗ: VIP lên khu VIP; còn lại ghế quầy, bàn đứng, sofa, chỗ đứng (theo thứ tự xáo trộn riêng của từng người)
  private seat(p: Person, walk: boolean){
    if (p.spot) this.used.delete(p.spot);
    // khách thường chia đều: ghế quầy, bàn đứng, sofa lounge, đứng quanh sàn (mỗi người một thứ tự ưa thích riêng)
    const h = hash(p.id + '#s');
    const ORDER = [[STOOLS, TABLE_SPOTS, SOFA_SPOTS, STAND_SPOTS], [TABLE_SPOTS, STAND_SPOTS, STOOLS, SOFA_SPOTS], [SOFA_SPOTS, TABLE_SPOTS, STOOLS, STAND_SPOTS], [TABLE_SPOTS, STOOLS, STAND_SPOTS, SOFA_SPOTS], [STAND_SPOTS, TABLE_SPOTS, SOFA_SPOTS, STOOLS]];
    const pools = p.vip ? [VIP_SPOTS, SOFA_SPOTS, STOOLS] : ORDER[(h >>> 3) % ORDER.length];
    let spot: Spot | null = null;
    for (const pool of pools){
      const free = pool.filter(s => !this.used.has(s));
      if (free.length){ spot = free[h % free.length]; break; }
    }
    p.spot = spot;
    if (spot) this.used.add(spot);
    if (walk) this.goTo(p, spot ? spot.x : (h % 9) - 4, spot ? spot.z : 3 + (h % 5));
  }
  private goTo(p: Person, x: number, z: number){ p.path = route(p.x, p.z, x, z); }
  // tặng quà: người đang đi từ ngoài phố vào (hay chưa tới sàn) hiện ngay trên sàn nhảy, nhảy luôn
  toFloor(id: string){
    const p = this.persons.get(id);
    if (!p || p.kind === 'staff' || p.mode === 'leave' || p.mode === 'battle') return;
    if (p.mode === 'dance' && p.floor && !p.path.length) return;
    if (!p.floor){
      const free = FLOOR_SPOTS.filter(s => !this.usedFloor.has(s));
      if (!free.length) return;
      p.floor = free.sort((a, b) => a.z - b.z)[Math.min(free.length - 1, hash(p.id) % Math.max(1, Math.ceil(free.length / 3)))];
      this.usedFloor.add(p.floor);
    }
    this.place(p, p.floor.x, p.floor.z, p.floor.yaw);
    p.mode = 'dance'; p.danceUntil = this.clock + 3600; p.pendingDance = 0;
  }
  private leave(p: Person){
    p.mode = 'leave'; p.skill = null;
    if (p.spot){ this.used.delete(p.spot); p.spot = null; }
    if (p.floor){ this.usedFloor.delete(p.floor); p.floor = null; }
    p.path = route(p.x, p.z, NODES.street.x + (hash(p.id) % 2 ? -6 : 6), NODES.street.y + 0.5);
  }
  // đổi cấp: bỏ hào quang cũ, dựng hào quang cấp mới
  private setLevel(p: Person, lv: number){
    if (p.lvl === lv && (p.aura || !lv)) return;
    p.aura?.dispose(); p.aura = null; p.lvl = lv;
    if (lv > 0) p.aura = new Aura(p.fig, lv, p.height);
  }
  level(id: string){ return this.persons.get(id)?.lvl ?? 0; }
  // Ảnh đại diện TikTok phủ lên mặt: đĩa tròn có viền vàng, gắn vào xương đầu nên quay, nghiêng theo đầu khi nhảy, nhào lộn.
  // Ảnh tải qua server (/avatar/<id>, chỉ từ máy chủ ảnh TikTok); không có ảnh thì giữ mặt của mẫu người.
  private static avatarLoader = new THREE.TextureLoader();
  private static AV_GEO = new THREE.CircleGeometry(0.105, 40);
  private static AV_RING = new THREE.RingGeometry(0.105, 0.122, 40);
  private setAvatar(p: Person, want: boolean){
    if (p.avatarWant === want) return;
    p.avatarWant = want;
    if (!want){ this.dropAvatar(p); return; }
    People.avatarLoader.load('/avatar/' + encodeURIComponent(p.id), tex => {
      if (p.gone || !p.avatarWant || p.avatar){ tex.dispose(); return; }
      tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
      const g = new THREE.Group();
      const face = new THREE.Mesh(People.AV_GEO, new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
      const ring = new THREE.Mesh(People.AV_RING, new THREE.MeshBasicMaterial({ color: p.vip ? 0xffc860 : 0xff5aa8, toneMapped: false, side: THREE.DoubleSide }));
      // nhóm trong hơi ngửa lên cho dễ nhìn từ máy quay cao (nhóm ngoài xoay theo xương đầu mỗi khung hình)
      const tilt = new THREE.Group(); tilt.rotation.x = -0.12; ring.position.z = 0.001; tilt.add(face, ring); g.add(tilt);
      if (!p.fig.attach(g, 'head', new THREE.Vector3(0, 0.085, 0.125), false)){ g.position.set(0, p.height * 0.93, 0.13); p.fig.root.add(g); }
      p.avatar = g;
    }, undefined, () => { /* không tải được ảnh: giữ mặt mẫu người */ });
  }
  private dropAvatar(p: Person){
    const g = p.avatar; if (!g) return;
    p.fig.detach(g);
    g.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ const mat = m.material as THREE.MeshBasicMaterial; mat.map?.dispose(); mat.dispose(); } });
    p.avatar = null;
  }
  private dispose(p: Person){
    p.aura?.dispose(); p.aura = null; p.avatarWant = false; this.dropAvatar(p);
    if (p.spot) this.used.delete(p.spot);
    if (p.floor) this.usedFloor.delete(p.floor);
    p.fig.dispose(); this.persons.delete(p.id); p.gone = true; this.dances.forget(p.id);
  }

  giveDrink(p: Person | string, k: DrinkKey, obj?: THREE.Object3D){
    const q = typeof p === 'string' ? this.persons.get(p) : p;
    if (!q){ if (obj) obj.removeFromParent(); return; }
    if (q.drink) q.drink.removeFromParent();
    const d = obj ?? makeDrink(k);
    d.position.set(0, -0.05, 0); d.rotation.set(0, 0, 0); d.scale.setScalar(1);
    q.fig.held.add(d); q.drink = d; q.drinkKey = k; q.sipAt = this.clock + 2;
  }

  /* ---------------------------------------------------------- sự kiện */
  // server báo bắt đầu pha một ly: giao cho bartender rảnh nhất
  make(n: number, guest: string, drink: DrinkKey){
    if (this.jobs.some(j => j.n === n) || !this.bartenders.length) return;
    const load = this.bartenders.map((_, i) => this.jobs.filter(j => j.by === i && j.phase !== 'done').length);
    const by = load.indexOf(Math.min(...load));
    this.jobs.push({ n, guest, drink, phase: 'walk', t: this.clock, obj: null, by, waiter: -1, from: new THREE.Vector3(), to: new THREE.Vector3() });
  }
  // server báo đã giao xong: nếu màn hình còn chậm (đi đường xa) thì đưa ly luôn vào tay
  served(n: number, guest: string, drink: DrinkKey){
    const j = this.jobs.find(x => x.n === n);
    if (!j){ const p = this.persons.get(guest); if (p && p.drinkKey !== drink) this.giveDrink(p, drink); return; }
    setTimeout(() => { if (j.phase !== 'done'){ this.finish(j); } }, 15_000);
  }
  // giơ tay cổ vũ, vỗ tay (quà của người khác); người tặng thì ra sàn nhảy
  cheer(giver: string, ms = 3500){
    const until = this.clock + ms / 1000;
    for (const p of this.persons.values()){
      if (p.kind === 'staff' || p.mode !== 'stay' && p.mode !== 'dance') continue;
      if (p.id === giver) continue;
      if (Math.random() < 0.7) this.doAct(p, p.spot?.sit && p.mode === 'stay' ? 'sitClap' : Math.random() < 0.5 ? 'clap' : 'hype', until);
    }
    for (const d of this.djs) this.doAct(d, 'djhype', until);
    // người tặng: khách thường ra sàn nhảy; khách VIP lên khu VIP (giơ tay ăn mừng khi tới chỗ)
    const g = this.persons.get(giver);
    if (g && g.mode !== 'leave'){ if (g.vip) this.doAct(g, 'hype', this.clock + 3); else this.dance(g, 30); }
  }
  toast(ms = 6000){
    const until = this.clock + ms / 1000;
    for (const p of this.persons.values()) if (p.kind !== 'staff' && (p.mode === 'stay' || p.mode === 'dance')){ if (!p.drink) this.giveDrink(p, 'champagne'); this.doAct(p, 'toast', until); }
  }
  // màn diễn: nhiều người kéo ra sàn nhảy (show lớn thì gần hết), vài người giơ điện thoại quay phim
  show(mode: string, sec: number){
    this.showMode = mode;
    if (mode === 'idle') return;
    const share = mode === 'djshow' || mode === 'co2' ? 0.85 : mode === 'stage' || mode === 'vip' || mode === 'lasershow' ? 0.55 : 0.3;
    for (const p of this.persons.values()){
      if (p.kind === 'staff' || p.mode !== 'stay') continue;
      const r = Math.random();
      if (r < share) this.dance(p, sec);
      else if (r < share + 0.15) this.doAct(p, p.spot?.sit ? 'sitClap' : 'photo', this.clock + 6);
    }
    for (const d of this.djs) this.doAct(d, mode === 'djshow' ? 'djhype' : 'dj', this.clock + Math.min(sec, 12));
  }
  dance(p: Person, sec: number){
    // còn đang đi từ ngoài phố vào: nhớ lời mời, vào tới nơi thì ra sàn nhảy luôn
    if (p.mode === 'arrive'){ p.pendingDance = Math.max(p.pendingDance, sec); return; }
    if (p.kind === 'staff' || p.mode === 'leave') return;
    if (!p.floor){
      const free = FLOOR_SPOTS.filter(s => !this.usedFloor.has(s));
      // sàn kín chỗ: nhảy ngay tại chỗ đứng (ghế thì đứng dậy nhảy cạnh ghế)
      if (!free.length){ p.floor = { x: p.spot?.x ?? p.x, z: (p.spot?.z ?? p.z) + (p.spot?.sit ? 0.45 : 0), yaw: p.spot?.yaw ?? p.yaw, y: 0, sit: false, kind: 'stand' }; p.mode = 'dance'; p.danceUntil = this.clock + sec; this.goTo(p, p.floor.x, p.floor.z); return; }
      // người tặng quà ra hàng đầu gần sân khấu
      p.floor = free.sort((a, b) => a.z - b.z)[Math.min(free.length - 1, hash(p.id) % Math.max(1, Math.ceil(free.length / 3)))];
      this.usedFloor.add(p.floor);
    }
    p.mode = 'dance'; p.danceUntil = this.clock + sec;
    this.goTo(p, p.floor.x, p.floor.z);
  }
  private doAct(p: Person, a: Act, until: number){ p.act = a; p.actUntil = until; }

  /* ---------------------------------------------------------- nhảy theo lệnh, theo quà */
  // bình luận "nhảy 12" / "nhảy edm": người đó ra sàn nhảy đúng điệu / đúng nhóm đó một lúc
  danceCmd(id: string, dance?: number, group?: DanceGroup){
    const p = this.persons.get(id); if (!p) return;
    this.dances.lock(id, this.music.phase, { dance, group }, 32);
    if (p.mode !== 'battle') this.dance(p, 45);
    this.highlight(id, 10);
  }
  // quà: nhỏ đổi điệu, vừa nhảy sung hơn (người xung quanh sung theo), lớn biểu diễn điệu đặc biệt và cả sàn hưởng ứng cùng nhóm
  // Combo skill theo quà, nhỏ tới to: mỗi lần tặng là 10 giây nhảy hip-hop / breakdance đủ kiểu, chen các động tác nhào lộn;
  // quà càng to combo càng dài, càng khó (từ xoay người tới lộn ngửa, cối xay gió, trồng chuối xoay đầu cắt kéo, tạo dáng)
  static readonly TRICKS: Record<string, [TrickKind, number][]> = {
    dance1:   [['spin', 1.0]],
    dance5:   [['spin', 1.0], ['tuck', 0.8], ['spin', 1.0]],
    outfit:   [['spin', 1.0], ['backflip', 1.1], ['freeze', 1.2]],
    laser:    [['backflip', 1.1], ['spin', 1.0], ['cartwheel', 1.2], ['freeze', 1.2]],
    vipdance: [['windmill', 2.2], ['backflip', 1.1], ['headspin', 2.4], ['freeze', 1.2]],
    stage:    [['backflip', 1.1], ['headspin', 2.8], ['frontflip', 1.1], ['cartwheel', 1.2], ['freeze', 1.3]],
    faceoff:  [['backflip', 1.1], ['headspin', 2.6], ['cartwheel', 1.2], ['windmill', 2.2], ['freeze', 1.3]],
    co2:      [['backflip', 1.1], ['backflip', 1.1], ['windmill', 2.2], ['headspin', 2.6], ['freeze', 1.3]],
    vip:      [['frontflip', 1.1], ['cartwheel', 1.2], ['windmill', 2.2], ['headspin', 2.6], ['backflip', 1.1], ['freeze', 1.3]],
    djshow:   [['backflip', 1.1], ['backflip', 1.1], ['cartwheel', 1.2], ['windmill', 2.4], ['headspin', 3.0], ['frontflip', 1.1], ['spin', 1.0], ['freeze', 1.4]],
  };
  private trickTimers = new Map<string, number[]>();
  // xếp các động tác nhào lộn rải đều trong sec giây, giữa các lần là nhảy điệu của combo; trồng chuối, cối xay gió thì
  // chân đá theo điệu Kick Out cho ra dáng cắt kéo
  tricks(id: string, list: [TrickKind, number][], sec: number, delay = 0){
    for (const h of this.trickTimers.get(id) ?? []) clearTimeout(h);
    const busy = list.reduce((a, [, d]) => a + d, 0), gap = Math.max(0.3, (sec - busy) / (list.length + 1)), hs: number[] = [];
    let at = delay + gap;
    for (const [kind, d] of list){
      hs.push(window.setTimeout(() => {
        const p = this.persons.get(id); if (!p || p.mode === 'leave') return;
        if (kind === 'headspin' || kind === 'windmill'){ const k = DANCES.find(x => x.name === 'Kick Out') ?? DANCES.find(x => x.group === 'break'); if (k) this.dances.lock(id, this.music.phase, { dance: k.no }, 8); }
        p.fig.trick(kind, d);
      }, at * 1000));
      at += d + gap;
    }
    this.trickTimers.set(id, hs);
  }
  giftDance(id: string, level: number, key = ''){
    // mọi quà (trừ đối đầu, có màn riêng): 10 giây combo hip-hop / breakdance + nhào lộn theo cỡ quà
    { const p = this.persons.get(id);
      if (p && key !== 'faceoff'){
        if (p.mode !== 'battle') this.dance(p, 30);
        this.skillMove(id, 10);
        this.combo(id, ['hiphop', 'break', 'hiphop', 'tiktok', 'break'], 10);
        this.tricks(id, People.TRICKS[key] ?? People.TRICKS.dance1, 10);
        this.highlight(id, 10);
        return;
      } }
    const p = this.persons.get(id), b = this.music.phase; if (!p) return;
    // 1 xu: một điệu tàm tạm; 5 xu: điệu sung, đẹp hơn; 30 xu: skill VIP đổi điệu liên tục; 99 xu: màn đối đầu lo phần nhảy
    if (key === 'dance1'){ if (p.mode !== 'battle') this.dance(p, 20); this.combo(id, [(['tiktok', 'party', 'edm', 'hiphop'] as DanceGroup[])[Math.floor(Math.random() * 4)]], 5); this.highlight(id, 6); return; }
    if (key === 'dance5'){ if (p.mode !== 'battle') this.dance(p, 25); this.combo(id, ['tiktok', 'edm', 'hiphop', 'party'], 6); this.highlight(id, 8); return; }
    if (key === 'vipdance'){ if (p.mode !== 'battle') this.dance(p, 30); this.combo(id, ['vip', 'break', 'tiktok', 'edm', 'hiphop'], 12); this.highlight(id, 12); return; }
    if (key === 'faceoff' || key === 'outfit'){ if (key === 'outfit' && p.mode !== 'battle') this.dance(p, 25); this.highlight(id, 8); return; }
    if (level <= 1) this.dances.lock(id, b, { minEnergy: 0, group: undefined }, 16);
    else if (level === 2) this.dances.lock(id, b, { minEnergy: 4 }, 24);
    else { const g: DanceGroup = Math.random() < 0.5 ? 'vip' : 'break'; this.dances.lock(id, b, { group: g, minEnergy: 4 }, 32);
    }
    if (p.mode !== 'battle' && !p.vip) this.dance(p, 30);
  }
  // Quà: chạy nhanh ra chỗ trống nhất trên sàn để múa skill, không bị ai che. Chấm điểm các điểm trên lưới sàn:
  // xa người khác (và chỗ skill của người tặng khác), không có ai đứng phía trước (giữa người đó và máy quay),
  // ưu tiên phía trước sàn, gần giữa; hết sec giây thì về chỗ cũ.
  skillMove(id: string, sec: number){
    const p = this.persons.get(id);
    if (!p || p.kind === 'staff' || p.mode !== 'dance' || !p.floor) return;
    const others = [...this.persons.values()].filter(q => q !== p && !q.gone && q.mode !== 'leave');
    const pts = others.map(q => q.skill && q.skill.until > this.clock ? { x: q.skill.x, z: q.skill.z } : { x: q.x, z: q.z });
    let best = { x: p.x, z: p.z }, bestS = -Infinity;
    for (let x = FLOOR.x0 + 0.9; x <= FLOOR.x1 - 0.9; x += 0.5) for (let z = FLOOR.z0 + 1.2; z <= FLOOR.z1 + 0.6; z += 0.5){
      let near = 9, block = 0;
      for (const o of pts){
        const dx = o.x - x, dz = o.z - z, d = Math.hypot(dx, dz);
        near = Math.min(near, d);
        // người đứng phía trước (gần máy quay hơn) trong dải ngang 1 m: che mất người múa
        if (dz > 0.2 && dz < 7 && Math.abs(dx) < 0.55 + dz * 0.12) block += 1.4 - Math.min(1, dz / 7) * 0.6;
      }
      const s = Math.min(near, 2.2) * 2 - block * 3 + (z - FLOOR.z0) * 0.35 - Math.abs(x) * 0.18 - Math.hypot(x - p.x, z - p.z) * 0.08;
      if (s > bestS){ bestS = s; best = { x, z }; }
    }
    p.skill = { x: best.x, z: best.z, until: this.clock + sec };
    p.path = [new THREE.Vector2(best.x, best.z)];
  }
  // thả trên 10 tim: hiện trên sàn, múa một điệu đơn giản, nhẹ nhàng (năng lượng thấp) khoảng 5 giây
  likeDance(id: string){
    const p = this.persons.get(id); if (!p || p.kind === 'staff') return false;
    this.toFloor(id);
    if (p.mode !== 'battle') this.dance(p, 3600);
    const easy = DANCES.filter(d => d.energy <= 3 && d.group !== 'vip' && d.group !== 'break');
    const pick = (easy.length ? easy : DANCES)[Math.floor(Math.random() * (easy.length || DANCES.length))];
    this.dances.lock(id, this.music.phase, { dance: pick.no }, 16);
    this.highlight(id, 5);
    return true;
  }
  // múa đủ kiểu: đổi điệu sung mỗi 2,5 giây, mỗi lần một nhóm khác (sec giây)
  private comboTimers = new Map<string, number[]>();
  // skill chỉ của người tặng: mỗi 2,5 giây một điệu sung khác nhau (người khác vẫn nhảy theo gu riêng của họ)
  combo(id: string, groups: DanceGroup[], sec: number){
    for (const h of this.comboTimers.get(id) ?? []) clearTimeout(h);
    const n = Math.max(1, Math.round(sec / 2.5)), start = Math.floor(Math.random() * groups.length), hs: number[] = [], used = new Set<number>();
    for (let i = 0; i < n; i++) hs.push(window.setTimeout(() => {
      if (!this.persons.has(id)) return;
      const no = this.pickDance(groups[(start + i) % groups.length], used); used.add(no);
      this.dances.lock(id, this.music.phase, { dance: no }, 8);
    }, i * 2500));
    this.comboTimers.set(id, hs);
  }
  // điệu sung (năng lượng từ 4) trong nhóm, chưa dùng trong lượt này
  private pickDance(group: DanceGroup, used: Set<number>){
    const top = DANCES.filter(d => d.group === group && d.energy === 5 && !used.has(d.no));
    const pool = top.length ? top : DANCES.filter(d => d.group === group && d.energy >= 4 && !used.has(d.no));
    const list = pool.length ? pool : DANCES.filter(d => d.energy >= 4 && !used.has(d.no));
    return (list[Math.floor(Math.random() * list.length)] ?? DANCES[0]).no;
  }
  // Đối đầu siêu VIP (99 xu): hai người ra giữa sàn nhảy, quay mặt vào nhau cách 1,6 m, thay phiên múa điệu siêu VIP
  // (mỗi 2,5 giây đổi điệu); hết giờ thì về nhảy chung trên sàn
  faceoff(a: string, b: string, sec: number){
    if (b === 'house' && !this.persons.has('house')){ const h = this.guest('house', 'Vũ công Bar Online', 'nu', false, 'npc', true); h.name = 'Vũ công Bar Online'; }
    const C = { x: 0, z: -4.2 }, pair = [a, b];
    pair.forEach((id, i) => {
      const p = this.persons.get(id); if (!p || p.mode === 'leave') return;
      if (p.floor){ this.usedFloor.delete(p.floor); p.floor = null; }
      const side = i === 0 ? -1 : 1, x = C.x + side * 0.8;
      // quay vào nhau, hơi chếch ra phía máy quay để thấy mặt cả hai
      p.mode = 'battle'; p.skill = null; p.battleSpot = { x, z: C.z, yaw: Math.atan2(-side, 0.35) };
      this.goTo(p, x, C.z);
      this.combo(id, i === 0 ? ['break', 'hiphop', 'vip', 'break'] : ['hiphop', 'break', 'break', 'vip'], sec);
      this.tricks(id, People.TRICKS.faceoff, sec, i ? 1.2 : 0);
      this.highlight(id, sec);
    });
    // người xung quanh vây xem, vỗ tay
    for (const q of this.persons.values()) if (!pair.includes(q.id) && q.kind !== 'staff' && q.mode === 'stay' && Math.random() < 0.4) this.doAct(q, q.spot?.sit ? 'sitClap' : 'clap', this.clock + sec);
    window.setTimeout(() => {
      for (const id of pair){ const p = this.persons.get(id); if (p && p.mode === 'battle' && !this.battleState){ p.mode = 'stay'; p.battleSpot = null; this.dance(p, 3600); } }
    }, sec * 1000);
  }
  // đang nhảy điệu gì (nhãn tên, hiệu ứng theo nhóm)
  danceOf(id: string){ const p = this.persons.get(id); return p && (p.mode === 'dance' || p.mode === 'battle') && p.dance ? p.dance : null; }
  hand(id: string, right: boolean, out = new THREE.Vector3()){ const p = this.persons.get(id); return p ? p.fig.handWorld(right, out) : null; }
  dancers(){ return [...this.persons.values()].filter(p => (p.mode === 'dance' || p.mode === 'battle') && p.dance && !p.path.length); }

  /* ---------------------------------------------------------- Dance Battle */
  // người thi đứng giữa sàn nhảy: người tới lượt bước lên trước, người khác lùi hai bên; khán giả đứng vòng phía sau và hai bên
  // (máy quay ở phía trước nên không ai che người đang nhảy)
  battle(b: BarBattle | null){
    this.battleState = b;
    const key = b ? `${b.n}:${b.phase}:${b.turn}:${b.round}` : '';
    if (key === this.battleKey) return;
    this.battleKey = key;
    const C = { x: 0, z: -4.4 };
    if (!b){
      for (const p of this.persons.values()) if (p.mode === 'battle'){ p.mode = 'stay'; p.battleSpot = null; this.dance(p, 3600); }
      return;
    }
    const ids = b.performers.map(x => x.id);
    if (ids.includes('house') && !this.persons.has('house')){ const h = this.guest('house', 'Vũ công Bar Online', 'nu', false, 'npc', true); h.name = 'Vũ công Bar Online'; }
    const cur = b.performers[b.turn]?.id;
    ids.forEach((id, i) => {
      const p = this.persons.get(id); if (!p || p.mode === 'leave') return;
      if (p.floor){ this.usedFloor.delete(p.floor); p.floor = null; }
      const front = id === cur && b.phase !== 'intro';
      const side = i === 0 ? -1 : i === 1 ? 1 : 0, back = i === 2;
      const s = front ? { x: C.x, z: C.z + 0.7, yaw: 0 } : { x: C.x + side * 1.7, z: C.z - (back ? 1.3 : 0.3), yaw: Math.atan2(C.x - (C.x + side * 1.7), (C.z + 0.7) - (C.z - (back ? 1.3 : 0.3))) };
      p.mode = 'battle'; p.skill = null; p.battleSpot = s; this.goTo(p, s.x, s.z);
      if (front && b.dance) this.dances.lock(id, this.music.phase, { dance: b.dance }, 64);
    });
    // khán giả trên sàn: đứng vòng cung phía sau, quay vào giữa cổ vũ
    let k = 0;
    for (const p of this.persons.values()){
      if (p.kind === 'staff' || ids.includes(p.id) || (p.mode !== 'dance' && !(p.mode === 'stay' && Math.random() < 0.4))) continue;
      if (p.floor){ this.usedFloor.delete(p.floor); p.floor = null; }
      const a = -1.75 + (k++ % 14) * 0.27, R = 3.1 + Math.floor(k / 14) * 0.8;
      const x = C.x + Math.sin(a) * R, z = C.z - Math.cos(a) * R * 0.75;
      p.mode = 'dance'; p.danceUntil = this.clock + 40; p.floor = { x, z, yaw: Math.atan2(C.x - x, C.z - z), y: 0, sit: false, kind: 'stand' };
      this.goTo(p, x, z);
    }
  }
  highlight(id: string, sec = 8){ const p = this.persons.get(id); if (p) p.hl = this.clock + sec; }
  isHighlighted(p: { hl: number }){ return p.hl > this.clock; }

  // vị trí đầu người (máy quay lia tới, đèn rọi theo, nhãn tên bám theo)
  head(id: string, out = new THREE.Vector3()){ const p = this.persons.get(id); return p ? p.fig.headWorld(out) : null; }
  yaw(id: string){ return this.persons.get(id)?.yaw ?? 0; }
  feet(id: string){ const p = this.persons.get(id); return p ? new THREE.Vector3(p.x, floorY(p.x, p.z), p.z) : null; }
  guests(){ return [...this.persons.values()].filter(p => p.kind === 'guest' && !p.gone); }

  /* ---------------------------------------------------------- khung hình */
  update(dt: number, t: number, camera: THREE.Camera, frustum: THREE.Frustum, music: MusicSync){
    this.clock = t; this.music = music;
    if (music.dropHit) this.dances.drop(music.phase);
    const beat = music.beat;
    this.work(dt, t);
    auraTick(t);
    for (const p of [...this.persons.values()]){ this.step(p, dt, t, camera, frustum, beat); if (p.aura && !p.gone && p.fig.root.visible) p.aura.update(t); }
    for (const l of this.loose) if (t > l.until) l.obj.removeFromParent();
    this.loose = this.loose.filter(l => t <= l.until);
  }

  private step(p: Person, dt: number, t: number, camera: THREE.Camera, frustum: THREE.Frustum, beat: boolean){
    // đi theo đường
    let walking = false;
    if (p.path.length){
      const tgt = p.path[0], dx = tgt.x - p.x, dz = tgt.y - p.z, d = Math.hypot(dx, dz);
      if (d < 0.08){ p.path.shift(); }
      else {
        walking = true;
        const sp = Math.min(d, p.speed * dt * (p.skill ? 3.2 : p.mode === 'leave' ? 1.1 : 1));
        p.x += dx / d * sp; p.z += dz / d * sp; p.tyaw = Math.atan2(dx, dz);
        if (p.kind !== 'staff' && p.z < 11.4 && p.z > 10.6 && p.mode === 'arrive') this.onArriveDoor?.(p.id);
      }
    }
    if (!walking){
      if (p.mode === 'leave' && p.z > 13){ this.dispose(p); return; }
      // khách vào tới nơi là ra sàn quẩy luôn, không nghỉ
      if (p.mode === 'arrive'){ p.mode = 'stay'; const sec = Math.max(p.pendingDance, 3600); p.pendingDance = 0; if (p.kind !== 'staff') this.dance(p, sec); }
      if (p.mode === 'dance' && t > p.danceUntil && p.kind !== 'staff'){ p.danceUntil = t + 3600; }
      if (p.mode === 'dance' && t > p.danceUntil){ p.mode = 'stay'; if (p.floor){ this.usedFloor.delete(p.floor); p.floor = null; } if (p.spot) this.goTo(p, p.spot.x, p.spot.z); else this.seat(p, true); }
      if (p.mode === 'stay' && p.spot && Math.hypot(p.spot.x - p.x, p.spot.z - p.z) < 0.15) p.tyaw = p.spot.yaw;
      // hết giờ skill: về lại chỗ nhảy cũ trên sàn
      if (p.skill && t > p.skill.until){ p.skill = null; if (p.mode === 'dance' && p.floor) this.goTo(p, p.floor.x, p.floor.z); }
      if (p.mode === 'dance' && p.floor) p.tyaw = p.floor.yaw;
      if (p.skill && p.mode === 'dance') p.tyaw = Math.atan2(0 - p.x, 9 - p.z);      // múa skill: quay thẳng ra máy quay
      if (p.mode === 'battle' && p.battleSpot) p.tyaw = p.battleSpot.yaw;
    }
    // quay người mượt
    let dy = p.tyaw - p.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    p.yaw += dy * Math.min(1, dt * (walking ? 8 : 4));
    // chọn động tác
    const seated = !walking && p.mode === 'stay' && !!p.spot?.sit && Math.hypot((p.spot?.x ?? 0) - p.x, (p.spot?.z ?? 0) - p.z) < 0.15;
    let act: Act;
    if (walking) act = 'walk';
    else if (t < p.actUntil) act = p.act;
    else if (p.kind === 'staff') act = p.baseAct;
    // đang Dance Battle: khán giả quanh sàn phần đông vỗ tay, giơ tay cổ vũ, vài người nhảy theo (đổi vai mỗi 8 phách)
    else if (p.mode === 'dance') act = !this.battleState ? 'dance' : (hash(p.id) + Math.floor(this.music.phase / 8)) % 5 < 2 ? 'dance' : (hash(p.id) + Math.floor(this.music.phase / 8)) % 2 ? 'clap' : 'hype';
    else if (p.mode === 'battle'){
      // tới lượt (hoặc thắng cuộc) thì nhảy điệu của lượt; chưa tới lượt thì đứng cổ vũ, vỗ tay theo nhịp
      const b = this.battleState, cur = b?.performers[b.turn]?.id;
      act = b && cur === p.id && b.phase !== 'intro' ? 'dance' : (Math.floor(this.music.phase / 4) + hash(p.id)) % 3 === 0 ? 'hype' : 'clap';
    }
    else act = this.idleAct(p, t, seated);
    if (seated && !act.startsWith('sit') && act !== 'toast') act = act === 'sip' ? 'sitSip' : act === 'clap' ? 'sitClap' : 'sit';
    if (!seated && act.startsWith('sit')) act = act === 'sitSip' ? 'sip' : act === 'sitClap' ? 'clap' : 'idle';
    // người ở xa hay khuất: cập nhật động tác thưa hơn cho nhẹ máy
    const d = camera.position.distanceTo(_v.set(p.x, 1, p.z)), seen = frustum.containsPoint(_v.set(p.x, 1.2, p.z));
    p.fig.lodStep = !seen ? 8 : d < 9 ? 1 : d < 18 ? 2 : 3;
    p.fig.root.visible = seen || d < 4;
    const y = floorY(p.x, p.z);
    const sit = act.startsWith('sit');
    const pp = pose(act, t + p.t0);
    const clip = CLIP_ACTS.has(act) ? CLIP_NAME[act] : act;
    // nhảy: điệu do bộ chọn điệu quyết định (100 điệu dựng trên khung xương), đúng nhịp nhạc; ly cất đi khi nhảy
    let sync = null;
    if (act === 'dance' && p.fig instanceof GlbFigure){
      p.dance = this.dances.current(p.id, this.music.section, this.music.phase);
      sync = { id: p.dance.id, bpm: this.music.bpm, beat: this.music.phase, offset: this.dances.offset(p.id) };
    } else p.dance = null;
    if (p.drink) p.drink.visible = act !== 'dance' && act !== 'photo';
    p.fig.update(p.x, p.z, p.yaw, pp, sit, { anim: clip, y, seat: p.spot?.seatH ?? 0.46, speed: walking && p.skill ? 2.4 : act === 'dance' && beat ? 1.05 : 1, dance: sync });
    // bong bóng khí trong ly cầm tay sủi lên
    if (p.drink) fizz(p.drink, t);
    // điện thoại khi chụp ảnh
    const ph = p.fig.held.getObjectByName('phone');
    if (act === 'photo' && !ph){ const o = phone(); o.name = 'phone'; p.fig.held.add(o); if (p.drink) p.drink.visible = false; }
    if (act !== 'photo' && ph){ ph.removeFromParent(); }
    if (ph){ const f = ph.getObjectByName('flash') as THREE.Mesh | undefined; if (f) (f.material as THREE.MeshStandardMaterial).emissiveIntensity = Math.sin(t * 3 + p.t0) > 0.97 ? 30 : 0; }
  }

  // khách đứng / ngồi yên: lúc nói chuyện, lúc nhấp ly, lúc vỗ tay theo nhạc; thỉnh thoảng tự ra sàn nhảy
  private idleAct(p: Person, t: number, seated: boolean): Act {
    if (t > p.nextIdle){
      const r = Math.random();
      p.nextIdle = t + 4 + Math.random() * 7;
      if (p.mode === 'stay' && !p.vip && r < (this.showMode === 'idle' ? 0.06 : 0.25)){ this.dance(p, 25 + Math.random() * 35); return 'walk'; }
      p.baseAct = p.drink && r < 0.45 ? 'sip' : r < 0.75 ? (seated ? 'sitTalk' : 'talk') : r < 0.85 ? 'clap' : 'idle';
    }
    return p.baseAct;
  }

  /* ---------------------------------------------------------- pha chế và phục vụ */
  private work(dt: number, t: number){
    for (let i = 0; i < this.bartenders.length; i++){
      const b = this.bartenders[i], st = BAR_STATIONS[i], job = this.jobs.find(j => j.by === i && (j.phase === 'walk' || j.phase === 'shake' || j.phase === 'pour' || j.phase === 'slide'));
      const shaker = b.fig.held.getObjectByName('shaker');
      if (!job){
        if (shaker){ shaker.visible = false; shaker.rotation.z = 0; }
        // lúc rảnh: lau quầy, quay ra kệ xếp chai, nói chuyện với khách
        if (!b.path.length && t > b.nextIdle){
          const r = Math.random();
          b.nextIdle = t + 5 + Math.random() * 6;
          if (r < 0.3){ const s = SHELF_SPOT(st.z + (Math.random() - 0.5) * 2); this.goTo(b, s.x, s.z); b.baseAct = 'arrange'; b.tyaw = s.yaw; }
          else { this.goTo(b, st.x, st.z); b.baseAct = r < 0.7 ? 'wipe' : 'talk'; }
        }
        if (!b.path.length) b.tyaw = b.baseAct === 'arrange' ? -Math.PI / 2 : Math.PI / 2;
        continue;
      }
      const at = Math.hypot(b.x - st.x, b.z - st.z) < 0.1;
      if (job.phase === 'walk'){ if (!at && !b.path.length) this.goTo(b, st.x, st.z); if (at){ job.phase = 'shake'; job.t = t; b.tyaw = Math.PI / 2; } }
      else if (job.phase === 'shake'){
        b.baseAct = 'shake'; if (shaker){ shaker.visible = true; shaker.rotation.z = 0; }
        if (t - job.t > 2.6){ job.phase = 'pour'; job.t = t; job.obj = makeDrink(job.drink); job.obj.position.set(COUNTER.back + 0.25, COUNTER.top, st.z + 0.22); this.group.add(job.obj); fillLevel(job.obj, 0); }
      } else if (job.phase === 'pour'){
        b.baseAct = 'pour'; if (shaker) shaker.rotation.z = -Math.min(1.9, (t - job.t) * 3);
        if (job.obj) fillLevel(job.obj, Math.min(1, (t - job.t) / 1.6));
        if (t - job.t > 1.8){
          if (shaker){ shaker.visible = false; shaker.rotation.z = 0; }
          const g = this.persons.get(job.guest);
          const stool = g?.spot && STOOLS.includes(g.spot) && g.mode === 'stay' ? g.spot : null;
          job.from.copy(job.obj!.position);
          if (stool){ job.phase = 'slide'; job.to.set(COUNTER.front - 0.12, COUNTER.top, stool.z); }
          else { job.phase = 'wait'; job.to.set(PICKUP.counterX, COUNTER.top, PICKUP.counterZ); }
          job.t = t; b.baseAct = 'serve';
        }
      } else if (job.phase === 'slide'){
        // trượt ly dọc mặt quầy tới trước mặt khách ngồi ghế quầy
        const k = Math.min(1, (t - job.t) / 1.2); job.obj!.position.lerpVectors(job.from, job.to, 1 - (1 - k) ** 3);
        if (k >= 1){ this.finish(job); b.baseAct = 'wipe'; }
      }
      void dt;
    }
    // ly chờ phục vụ ở cuối quầy: trượt tới chỗ lấy, phục vụ rảnh tới bê
    for (const job of this.jobs.filter(j => j.phase === 'wait')){
      const k = Math.min(1, (t - job.t) / 1.0);
      if (job.obj && job.obj.parent === this.group) job.obj.position.lerpVectors(job.from, job.to, k);
      if (job.waiter < 0){
        const free = this.waiters.findIndex((w, i) => !this.jobs.some(j => j.waiter === i && j.phase !== 'done'));
        if (free >= 0){ job.waiter = free; const w = this.waiters[free]; this.goTo(w, PICKUP.x, PICKUP.z); }
        continue;
      }
      const w = this.waiters[job.waiter];
      if (!w.path.length && Math.hypot(w.x - PICKUP.x, w.z - PICKUP.z) < 0.15 && k >= 1){
        // đặt ly lên khay
        const tr = w.fig.heldL.children[0];
        if (job.obj && tr){ job.obj.removeFromParent(); job.obj.position.set(0, 0.012, 0); tr.add(job.obj); }
        job.phase = 'carry';
        const g = this.persons.get(job.guest);
        if (!g){ job.phase = 'done'; job.obj?.removeFromParent(); this.goHome(w, job.waiter); continue; }
        const a = this.approach(g); this.goTo(w, a.x, a.y);
      } else if (!w.path.length && Math.hypot(w.x - PICKUP.x, w.z - PICKUP.z) >= 0.15) this.goTo(w, PICKUP.x, PICKUP.z);
    }
    for (const job of this.jobs.filter(j => j.phase === 'carry' || j.phase === 'hand')){
      const w = this.waiters[job.waiter], g = this.persons.get(job.guest);
      if (!g){ job.obj?.removeFromParent(); job.phase = 'done'; this.goHome(w, job.waiter); continue; }
      if (job.phase === 'carry'){
        if (!w.path.length){
          const a = this.approach(g);
          if (Math.hypot(w.x - a.x, w.z - a.y) > 0.5){ this.goTo(w, a.x, a.y); continue; }      // khách đã đi chỗ khác
          w.tyaw = Math.atan2(g.x - w.x, g.z - w.z); job.phase = 'hand'; job.t = t; this.doAct(w, 'serve', t + 1.2);
        }
      } else if (t - job.t > 1.0){ this.finish(job); this.goHome(w, job.waiter); }
    }
    this.jobs = this.jobs.filter(j => j.phase !== 'done');
  }
  private approach(g: Person){
    // đứng trước mặt khách 70 cm (khách ngồi khu VIP thì đứng ở mép bàn)
    const fx = Math.sin(g.yaw), fz = Math.cos(g.yaw);
    return new THREE.Vector2(g.x + fx * 0.75, g.z + fz * 0.75);
  }
  private goHome(w: Person, i: number){ const h = WAITER_HOME[i] ?? WAITER_HOME[0]; this.goTo(w, h.x, h.z); w.tyaw = h.yaw; }
  private finish(job: Job){
    job.phase = 'done';
    const g = this.persons.get(job.guest);
    if (!g){ job.obj?.removeFromParent(); return; }
    const obj = job.obj ?? undefined;
    if (obj){ obj.removeFromParent(); fillLevel(obj, 1); }
    this.giveDrink(g, job.drink, obj);
    this.highlight(g.id, 6);
  }

  get count(){ return this.persons.size; }
  stats(){ let v = 0; for (const p of this.persons.values()) if (p.fig.root.visible) v++; return { people: this.persons.size, visible: v, jobs: this.jobs.length, models: this.realModels }; }
  drinkName(id: string){ const p = this.persons.get(id); return p?.drinkKey ? drinkOf(p.drinkKey).icon : ''; }
  staffPos(role: 'bar' | 'dj' | 'door' | 'vip'){ const p = role === 'bar' ? this.bartenders[0] : role === 'dj' ? this.djs[0] : role === 'door' ? this.guards[0] : this.guards[1]; return p ? new THREE.Vector3(p.x, floorY(p.x, p.z), p.z) : null; }
  greet(){ if (this.host) this.doAct(this.host, 'greet', this.clock + 2.5); const g = this.guards[0]; if (g) this.doAct(g, 'earpiece', this.clock + 2); }
}

// mực nước trong ly lúc rót (0..1)
function fillLevel(o: THREE.Object3D, k: number){
  o.traverse(c => {
    if (c.name !== 'liquid' && c.name !== 'foam' && c.name !== 'bubbles' && c.name !== 'ice' && c.name !== 'garnish' && c.name !== 'straw') return;
    if (c.name === 'liquid'){ c.scale.y = Math.max(0.001, k); }
    else c.visible = k > 0.95 || c.name === 'ice';
  });
}
function fizz(o: THREE.Object3D, t: number){
  const b = o.getObjectByName('bubbles');
  if (!b) return;
  const fill = b.userData.fill ?? 0.1, yb = b.userData.yb ?? 0;
  b.position.y = ((t * 0.035) % ((fill - yb) * 0.3));
}
