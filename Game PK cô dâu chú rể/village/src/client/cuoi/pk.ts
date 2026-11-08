import * as THREE from 'three';
import { PK_SKILLS } from '../../shared/balance.ts';
import type { PkSkillKey } from '../../shared/balance.ts';
import type { PkState, PkTeam } from '../../shared/types.ts';
import type { Actor, Anim, Cast } from './cast.ts';
import type { SparkSystem } from './sparks.ts';
import { $, el } from './ui.ts';

// PK cướp dâu, cướp rể: kẻ cướp phi lên sân khấu, khách đứng gần dạt ra cho thấy rõ ba người:
// người bị cướp đứng giữa, người đang giữ vai (đội bảo vệ) bên trái, kẻ cướp bên phải, hai người quay mặt vào nhau.
// Mỗi quà là một chiêu đánh vui: đá vào mông, ném dép tổ ong, chảo đập đầu, cầm gậy đuổi đánh, kéo tai, đánh hội đồng.
// Sân đấu giữa thảm đỏ, trước dãy mâm đầu, gần camera hơn chỗ làm lễ cho thấy rõ ba người
export const ARENA = { stolen: { x: 0, z: 4.0, yaw: 0 }, def: { x: -1.6, z: 5.0, yaw: 1.1 }, thief: { x: 1.6, z: 5.0, yaw: -1.1 } };
export const ARENA_C = { x: 0, z: 4.8 }, ARENA_R = 3.4;
type Spot = { x: number; z: number; yaw: number };
type Hooks = { sound: (k: PkSkillKey | 'start' | 'win' | 'lose') => void; flash: (a: number) => void; shake: (s: number) => void; confetti: (n: number, icons: string[]) => void; reassign: () => void };
interface Prop { obj: THREE.Object3D; t: number; life: number; step: (p: Prop, dt: number) => void }

const fwd = (yaw: number) => ({ x: Math.sin(yaw), z: Math.cos(yaw) });
const face = (from: { x: number; z: number }, to: { x: number; z: number }) => Math.atan2(to.x - from.x, to.z - from.z);

export class PkView {
  readonly group = new THREE.Group();
  private spots = new Map<string, Spot & { until: number }>();          // chỗ đứng tạm khi đang ra chiêu, assign() dùng thay chỗ thường
  private poses = new Map<string, { pose: Anim; until: number }>();
  private props: Prop[] = [];
  private queue: (() => number)[] = [];
  private busyUntil = 0;
  private chase: { leader: string; target: string; t: number; a0: number } | null = null;
  private stars: { id: string; until: number }[] = [];
  private dashUntil = 0; private thiefId = '';
  private cast: Cast; private sparks: SparkSystem; private hooks: Hooks;

  constructor(cast: Cast, sparks: SparkSystem, hooks: Hooks){ this.cast = cast; this.sparks = sparks; this.hooks = hooks; }

  spot(id: string){ const s = this.spots.get(id); return s && performance.now() < s.until ? s : null; }
  pose(id: string): Anim | '' { const p = this.poses.get(id); return p && performance.now() < p.until ? p.pose : ''; }

  private hold(id: string, s: Spot, ms: number){
    this.spots.set(id, { ...s, until: performance.now() + ms });
    const a = this.cast.actors.get(id);
    if (a){ a.tx = s.x; a.tz = s.z; a.tyaw = s.yaw; }
  }
  private release(...ids: string[]){ for (const id of ids) this.spots.delete(id); this.hooks.reassign(); }
  private setPose(id: string, pose: Anim, ms: number){
    const a = this.cast.actors.get(id), until = performance.now() + ms;
    this.poses.set(id, { pose, until });
    if (a) a.pose = pose;
    setTimeout(() => { const p = this.poses.get(id); if (p && p.until === until){ this.poses.delete(id); if (a && a.pose === pose) a.pose = ''; } }, ms);
  }
  private hurt(id: string, ms: number, text: string){
    this.setPose(id, 'hurt', ms); this.cast.say(id, text, Math.max(1400, ms));
    const a = this.cast.actors.get(id);
    if (a) this.sparks.burst(new THREE.Vector3(a.x, 1.7, a.z), [0xffe14a, 0xffffff, 0xff6a3a], 18, 2.2);
  }
  private walkMs(a: Actor, s: { x: number; z: number }, speed: number){ a.speed = speed; return Math.hypot(a.x - s.x, a.z - s.z) / speed * 1000 + 80; }

  // Kẻ cướp phi lên sân khấu: chạy thật nhanh, bụi bay mù mịt, cả ba người la lên
  start(thief: string, holder: string, stolen: string){
    this.thiefId = thief; this.dashUntil = performance.now() + 3500;
    const a = this.cast.actors.get(thief); if (a) a.speed = 7.5;
    setTimeout(() => { const b = this.cast.actors.get(thief); if (b && b.speed > 3) b.speed = 2.4; }, 3500);
    this.cast.say(thief, '🏃 Cướp đây!!!', 3500); this.cast.say(holder, '😠 Đứa nào dám!', 3500); this.cast.say(stolen, '😱 Ối giời ơi!', 3500);
    this.hooks.sound('start');
  }

  end(win: PkTeam, thief: string, holder: string){
    this.queue = []; this.chase = null;
    for (const id of [thief, holder]){ const a = this.cast.actors.get(id); if (a){ a.hold = ''; a.speed = 2.4; } }
    this.spots.clear(); this.poses.clear();
    if (win === 'cuop'){ this.cast.say(thief, '😎 Cướp được rồi nhé!', 4000); this.cast.cheer(thief, 4000); this.setPose(holder, 'hurt', 2500); this.cast.say(holder, '😭 Trời ơi!', 3000); this.hooks.sound('win'); }
    else {
      this.cast.say(thief, '😭 Thôi em về mâm!', 4000); this.cast.say(holder, '💪 Đi về!', 3000); this.cast.cheer(holder, 4000);
      const a = this.cast.actors.get(holder); if (a){ a.hold = 'stick'; this.setPose(holder, 'swing', 2500); setTimeout(() => { a.hold = ''; }, 2500); }
      const t = this.cast.actors.get(thief); if (t) t.speed = 6;
      this.hooks.sound('lose');
    }
  }

  // Một chiêu: leader là thủ lĩnh đội ra chiêu (người giữ vai hoặc kẻ cướp), target là người bị đánh,
  // sender là người tặng quà (ném dép từ chỗ người đó), helper là người cùng đội lao vào đánh hội đồng.
  hit(skill: PkSkillKey, leader: string, target: string, sender: string, helper: string | null){
    if (!this.cast.actors.get(target)) return;
    if (skill === 'dep'){ this.slipper(sender, target); return; }
    if (skill === 'chao'){ this.pan(target); return; }
    // các chiêu phải chạy tới chỗ đối thủ: xếp hàng lần lượt, dồn quá nhiều thì đánh nhanh tại chỗ
    if (this.queue.length >= 4){ this.quick(skill, target); return; }
    this.queue.push(() => skill === 'kick' ? this.kick(leader, target) : skill === 'gay' ? this.stick(leader, target) : skill === 'tai' ? this.ear(leader, target) : this.gang(leader, helper, target));
  }

  private quick(skill: PkSkillKey, target: string){
    this.hurt(target, 900, skill === 'kick' ? '😵 Ui da!' : '😵 Á!'); this.hooks.sound(skill === 'hoidong' ? 'kick' : skill);
  }

  // 1 xu: chạy ra sau lưng đối thủ, tung chân đá vào mông, đối thủ nảy về phía trước
  private kick(leader: string, target: string){
    const L = this.cast.actors.get(leader), T = this.cast.actors.get(target);
    if (!L || !T || leader === target){ this.quick('kick', target); return 600; }
    const f = fwd(T.yaw), back = { x: T.x - f.x * 0.7, z: T.z - f.z * 0.7, yaw: T.yaw };
    const go = this.walkMs(L, back, 6.5);
    this.hold(leader, back, go + 1200);
    setTimeout(() => {
      this.setPose(leader, 'kick', 450); this.hooks.sound('kick');
      this.hurt(target, 1300, '😵 Ui da cái mông!');
      this.hold(target, { x: T.x + f.x * 0.6, z: T.z + f.z * 0.6, yaw: T.yaw }, 900); T.speed = 6;
    }, go);
    setTimeout(() => { L.speed = 2.4; T.speed = 2.4; this.release(leader, target); }, go + 1100);
    return go + 1300;
  }

  // 5 xu: dép tổ ong xanh bay vòng cung từ chỗ người tặng, trúng đầu đánh bốp rồi rơi xuống đất
  private slipper(sender: string, target: string){
    const T = this.cast.actors.get(target)!, S = this.cast.actors.get(sender);
    const from = S && sender !== target ? new THREE.Vector3(S.x, 1.4, S.z) : new THREE.Vector3(T.x + (Math.random() < 0.5 ? -5 : 5), 1.4, T.z + 4);
    const g = new THREE.Group();
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.035, 0.28), new THREE.MeshStandardMaterial({ color: 0x7fc4ee, roughness: 0.7 }));
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.05, 0.06), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 }));
    strap.position.set(0, 0.035, 0.04); g.add(sole, strap); g.scale.setScalar(1.5);
    g.position.copy(from); this.group.add(g);
    const T0 = 0.75, head = () => new THREE.Vector3(T.x, 2.05, T.z);
    let hit = false;
    this.props.push({ obj: g, t: 0, life: T0 + 2.2, step: (p, dt) => {
      if (p.t < T0){
        const u = p.t / T0, to = head();
        g.position.lerpVectors(from, to, u); g.position.y += Math.sin(u * Math.PI) * 1.6;
        g.rotation.x += dt * 16; g.rotation.y += dt * 5;
      } else {
        if (!hit){ hit = true; this.hooks.sound('dep'); this.hurt(target, 1100, '😵 Á! Dép tổ ong!'); }
        g.position.y = Math.max(0.03, g.position.y - dt * 3.5); g.position.x += dt * 0.6; g.rotation.x = 0; g.rotation.z = 0;   // rơi xuống nằm cạnh chân
      }
    } });
  }

  // 10 xu: chảo gang từ trên trời rơi xuống đập đầu cái "boong", sao vàng quay quanh đầu
  private pan(target: string){
    const T = this.cast.actors.get(target)!;
    const g = new THREE.Group(), iron = new THREE.MeshStandardMaterial({ color: 0x26262b, metalness: 0.7, roughness: 0.35 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.27, 0.09, 24), iron);
    const inner = new THREE.Mesh(new THREE.CircleGeometry(0.29, 24).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x4a4a52, metalness: 0.8, roughness: 0.25 }));
    inner.position.y = 0.046;
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.5), new THREE.MeshStandardMaterial({ color: 0x5a3a20 }));
    handle.position.set(0, 0.02, 0.55);
    g.add(body, inner, handle); g.rotation.x = Math.PI;                // úp mặt chảo xuống đầu
    g.position.set(T.x, 3.6, T.z); this.group.add(g);
    let hit = false;
    this.props.push({ obj: g, t: 0, life: 1.3, step: (p) => {
      const top = 2.3;
      if (p.t < 0.25){ g.position.set(T.x, 3.6 - (3.6 - top) * (p.t / 0.25) ** 2, T.z); }
      else {
        if (!hit){ hit = true; this.hooks.sound('chao'); this.hooks.shake(0.25); this.hurt(target, 1700, '💫 Choáng quá!'); this.stars.push({ id: target, until: performance.now() + 1800 }); }
        g.position.set(T.x, top + Math.max(0, Math.sin((p.t - 0.25) * 18)) * 0.08, T.z); g.rotation.z = Math.sin(p.t * 20) * 0.15;
        g.scale.setScalar(p.t > 1.05 ? Math.max(0.01, 1 - (p.t - 1.05) / 0.25) : 1);
      }
    } });
  }

  // 30 xu: thủ lĩnh cầm gậy tre đuổi đánh đối thủ chạy vòng quanh sân khấu 4 giây
  private stick(leader: string, target: string){
    const L = this.cast.actors.get(leader), T = this.cast.actors.get(target);
    if (!L || !T || leader === target){ this.quick('gay', target); return 600; }
    L.hold = 'stick';
    this.chase = { leader, target, t: 0, a0: Math.atan2(T.x - ARENA_C.x, T.z - ARENA_C.z) };
    this.setPose(leader, 'swing', 4300);
    this.cast.say(leader, '😤 Đứng lại!', 2500); this.cast.say(target, '🏃 Tha cho em!', 3000);
    setTimeout(() => {
      this.chase = null; L.hold = ''; L.speed = 2.4; T.speed = 2.4;
      this.release(leader, target);
    }, 4300);
    return 4500;
  }

  // 52 xu: đi tới cạnh đối thủ, túm tai kéo lê về phía đội mình
  private ear(leader: string, target: string){
    const L = this.cast.actors.get(leader), T = this.cast.actors.get(target);
    if (!L || !T || leader === target){ this.quick('tai', target); return 600; }
    // đứng ngang bên đối thủ, phía gần mình; kéo lê về phía đội mình (đội bảo vệ bên trái, Đội Cướp bên phải)
    const side = { x: Math.cos(T.yaw), z: -Math.sin(T.yaw) }, toward = L.x < T.x ? -1 : 1;
    const sg = (L.x - T.x) * side.x + (L.z - T.z) * side.z >= 0 ? 1 : -1;
    const at = { x: T.x + side.x * 0.55 * sg, z: T.z + side.z * 0.55 * sg };
    const s0 = { ...at, yaw: face(at, T) };
    const go = this.walkMs(L, s0, 6);
    this.hold(leader, s0, go + 2600);
    setTimeout(() => {
      this.setPose(leader, 'pull', 1900); this.hurt(target, 1900, '👂 Á á đau tai!'); this.cast.say(leader, '😤 Lại đây!', 1800); this.hooks.sound('tai');
      const dx = toward * 1.1;
      L.speed = 0.75; T.speed = 0.75;
      this.hold(leader, { x: s0.x + dx, z: s0.z, yaw: s0.yaw }, 2000); this.hold(target, { x: T.x + dx, z: T.z, yaw: T.yaw }, 2000);
    }, go);
    setTimeout(() => { L.speed = 2.4; T.speed = 2.4; this.release(leader, target); }, go + 2100);
    return go + 2300;
  }

  // 100 xu: hai người lao vào đánh hội đồng, bụi mù mịt, sao và nắm đấm bay tứ tung
  private gang(leader: string, helper: string | null, target: string){
    const T = this.cast.actors.get(target);
    if (!T){ return 300; }
    const ids = [leader, helper].filter((x): x is string => !!x && x !== target && !!this.cast.actors.get(x));
    if (!ids.length){ this.quick('hoidong', target); return 600; }
    const f = fwd(T.yaw), side = { x: Math.cos(T.yaw), z: -Math.sin(T.yaw) };
    let go = 0;
    ids.forEach((id, i) => {
      const a = this.cast.actors.get(id)!, k = i === 0 ? 1 : -1;
      const s = { x: T.x + side.x * 0.6 * k + f.x * 0.3, z: T.z + side.z * 0.6 * k + f.z * 0.3, yaw: 0 };
      s.yaw = face(s, T);
      const ms = this.walkMs(a, s, 7);
      go = Math.max(go, ms);
      this.hold(id, s, ms + 3000);
      this.cast.say(id, i === 0 ? '👊 Xông lên!' : '👊 Đánh!', 2000);
    });
    setTimeout(() => {
      for (const id of ids) this.setPose(id, 'swing', 2600);
      this.hurt(target, 2700, '😭 Cứu với!'); this.hooks.sound('hoidong'); this.hooks.shake(0.4); this.hooks.flash(1.5);
      this.hooks.confetti(14, ['💥', '👊', '⭐', '💢']);
      for (let k = 0; k < 20; k++) setTimeout(() => {
        const p = new THREE.Vector3(T.x + (Math.random() - 0.5) * 0.9, 0.4 + Math.random() * 1.4, T.z + (Math.random() - 0.5) * 0.9);
        this.sparks.burst(p, [0xcfc4b0, 0xffffff, 0xa89880, 0xffe14a], 10, 1.6);
      }, k * 125);
    }, go);
    setTimeout(() => { for (const id of ids){ const a = this.cast.actors.get(id); if (a) a.speed = 2.4; } this.release(...ids); }, go + 2800);
    return go + 3000;
  }

  update(dt: number, now: number){
    if (this.queue.length && now >= this.busyUntil){ const run = this.queue.shift()!; this.busyUntil = now + run(); }
    for (const p of this.props){ p.t += dt; p.step(p, dt); }
    for (const p of this.props.filter(p => p.t >= p.life)){ this.group.remove(p.obj); p.obj.traverse(o => { if (o instanceof THREE.Mesh){ o.geometry.dispose(); (o.material as THREE.Material).dispose(); } }); }
    this.props = this.props.filter(p => p.t < p.life);
    // đuổi đánh: hai người chạy vòng quanh sân khấu, người bị đuổi chạy trước nửa vòng
    const c = this.chase;
    if (c){
      c.t += dt;
      const L = this.cast.actors.get(c.leader), T = this.cast.actors.get(c.target), a = c.a0 - c.t * 1.9, r = 1.7;
      if (L && T){
        const pt = { x: ARENA_C.x + Math.sin(a) * r, z: ARENA_C.z + 0.4 + Math.cos(a) * r }, pl = { x: ARENA_C.x + Math.sin(a + 0.9) * r, z: ARENA_C.z + 0.4 + Math.cos(a + 0.9) * r };
        T.speed = 7; L.speed = 7;
        this.hold(c.target, { ...pt, yaw: 0 }, 600); this.hold(c.leader, { ...pl, yaw: face(pl, pt) }, 600);
        if (Math.random() < dt * 1.6){ this.hooks.sound('gay'); this.sparks.burst(new THREE.Vector3(T.x, 1.5, T.z), [0xffe14a, 0xffffff], 10, 1.6); }
      }
    }
    // sao vàng quay quanh đầu người bị chảo đập
    this.stars = this.stars.filter(s => now < s.until);
    for (const s of this.stars){
      const a = this.cast.actors.get(s.id);
      if (a && Math.random() < dt * 30){ const k = now / 160; this.sparks.glow(new THREE.Vector3(a.x + Math.cos(k) * 0.35, 2.55, a.z + Math.sin(k) * 0.35)); }
    }
    // kẻ cướp phi lên: bụi tung dưới chân
    if (now < this.dashUntil){
      const a = this.cast.actors.get(this.thiefId);
      if (a && Math.hypot(a.tx - a.x, a.tz - a.z) > 0.2 && Math.random() < dt * 20) this.sparks.burst(new THREE.Vector3(a.x, 0.15, a.z), [0xcfc4b0, 0xe8dcc8], 4, 0.8);
    }
  }

  reset(){ this.queue = []; this.chase = null; this.spots.clear(); this.poses.clear(); this.stars = []; }
}

// Thanh PK: điểm hai đội, thời gian, người dẫn đầu mỗi đội, cách vào đội và bảng chiêu theo quà
export class PkUI {
  private box: HTMLElement | null = null;
  render(pk: PkState, elapsed: number){
    if (!this.box){ this.box = el('div'); this.box.id = 'pkBox'; $('app').append(this.box); }
    const left = Math.max(0, pk.leftMs - elapsed), s = Math.ceil(left / 1000);
    const def = pk.kind === 'dau' ? 'Đội Dâu' : 'Đội Rể', defIcon = pk.kind === 'dau' ? '👰' : '🤵';
    const total = pk.score.def + pk.score.cuop, pct = total ? pk.score.def / total * 100 : 50;
    const head = el('div', 'pkh', `⚔️ PK ${pk.kind === 'dau' ? 'CƯỚP DÂU' : 'CƯỚP RỂ'} · ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`);
    const bar = el('div', 'pkbar');
    const l = el('div', 'pkl'), r = el('div', 'pkr');
    l.style.width = `${Math.max(8, Math.min(92, pct))}%`;
    l.append(el('b', '', `${defIcon} ${def}`), el('span', '', String(pk.score.def)));
    r.append(el('span', '', String(pk.score.cuop)), el('b', '', '🎭 Đội Cướp'));
    bar.append(l, r);
    const who = el('div', 'pkwho');
    who.append(el('span', '', `🛡️ ${pk.holder.name} · ${pk.count.def} người${pk.top.def ? ` · ⭐ ${pk.top.def}` : ''}`), el('span', '', `${pk.count.cuop} người · 🏃 ${pk.thief.name}${pk.top.cuop && pk.top.cuop !== pk.thief.name ? ` · ⭐ ${pk.top.cuop}` : ''}`));
    const how = el('div', 'pkhow', `💬 Bình luận 1 vào ${def} · 2 vào Đội Cướp. Quà cộng điểm cho đội mình. Hết giờ Đội Cướp hơn điểm thì cướp được ${pk.stolen.name}`);
    const skills = el('div', 'pkskills');
    for (const k of PK_SKILLS){ const row = el('div', 'pks'); row.append(el('span', 'pki', k.icon), el('b', '', `${k.xu} xu`), el('span', '', k.name)); skills.append(row); }
    this.box.replaceChildren(head, bar, who, how, skills);
    this.box.classList.toggle('last', s <= 10);
    this.box.hidden = false;
  }
  hide(){ if (this.box) this.box.hidden = true; }
}
