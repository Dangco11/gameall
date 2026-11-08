import * as THREE from 'three';
import { BAR_GIFTS } from '../../shared/bar.ts';
import { levelInfo } from '../../shared/levels.ts';
import type { BarShowKey } from '../../shared/bar.ts';
import { Confetti } from './confetti.ts';
import { FLOOR, ROOM, STAGE } from './layout.ts';
import { Particles } from './particles.ts';
import type { People } from './people.ts';
import type { Stage } from './stage.ts';
import { softDot } from './tex.ts';

// Hiệu ứng quà TikTok đặt đúng chỗ trong cảnh (quanh người tặng, trên sàn nhảy, trên sân khấu), không phủ lên giao diện:
//   nhỏ (1–9 xu): bong bóng sáng, vòng sáng dưới chân, đèn rọi theo người tặng
//   trung bình (10–49): pháo giấy từ trần, quạt laser, laser show
//   lớn (50–198): sân khấu đổi màu, đèn chớp, cả quán nâng ly
//   VIP (199–499): CO2, pháo lạnh, cả quán nhảy, pháo hoa trong quán và trên trời, tên người tặng lên màn LED
//   đặc biệt (500): tắt đèn, đếm ngược 3-2-1, DROP: mọi hiệu ứng cùng lúc, DJ quẩy, mở màn DJ SHOW
export interface FxSound { cannon(): void; clink(n?: number): void; boom(): void; fwLaunch(): void; fwBurst(kind: string, big?: boolean): void; applause(sec?: number): void; pop(): void }
export type Cue = 'giver' | 'stage' | 'floor' | 'wide' | 'vip' | 'bar' | 'outside' | 'sky' | 'djshow' | 'battle';

function bubbleTex(){
  const S = 128, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d')!, gr = g.createRadialGradient(S / 2, S / 2, S * 0.3, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,255,255,0.05)'); gr.addColorStop(0.75, 'rgba(180,220,255,0.35)'); gr.addColorStop(0.92, 'rgba(255,200,255,0.9)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.beginPath(); g.arc(S / 2, S / 2, S / 2, 0, Math.PI * 2); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.9)'; g.beginPath(); g.ellipse(S * 0.34, S * 0.32, S * 0.1, S * 0.06, -0.7, 0, Math.PI * 2); g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class GiftFx {
  readonly group = new THREE.Group();
  private bubbles = new Particles(500, bubbleTex(), false);
  private glow = new Particles(1800, softDot(), true);
  private confetti = new Confetti();
  private rings: { m: THREE.Mesh; t0: number; life: number; at: () => THREE.Vector3 | null }[] = [];
  private follow: THREE.SpotLight;
  private followBeam: THREE.Mesh;
  private followId = ''; private followUntil = 0;
  private flashLight: THREE.PointLight;
  private timers: number[] = [];
  private stage: Stage; private people: People; private sound: FxSound;
  private cue: (c: Cue, id?: string, ms?: number) => void;
  private cueTwo: (a: string, b: string, ms: number) => void;
  private toast: (title: string, sub: string, icon: string, level: number) => void;

  constructor(stage: Stage, people: People, sound: FxSound, hooks: { cue: (c: Cue, id?: string, ms?: number) => void; cueTwo: (a: string, b: string, ms: number) => void; banner: (title: string, sub: string, icon: string, level: number) => void }){
    this.stage = stage; this.people = people; this.sound = sound; this.cue = hooks.cue; this.cueTwo = hooks.cueTwo; this.toast = hooks.banner;
    this.group.add(this.bubbles.points, this.glow.points, this.confetti.group);
    // đèn rọi theo người tặng (từ trần), kèm cột sáng thấy được
    this.follow = new THREE.SpotLight(0xfff2e0, 0, 16, 0.16, 0.4, 1.3); this.follow.position.set(0, ROOM.h - 0.2, 0);
    this.group.add(this.follow, this.follow.target);
    this.followBeam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.9, 1, 24, 1, true).translate(0, -0.5, 0), new THREE.ShaderMaterial({
      uniforms: { a: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      vertexShader: 'varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float a; varying float vY; void main(){ float k = a * (0.15 + 0.85 * vY) * 0.22; gl_FragColor = vec4(vec3(1.0, 0.95, 0.85) * k, k); }',
    }));
    this.followBeam.visible = false; this.group.add(this.followBeam);
    this.flashLight = new THREE.PointLight(0xffffff, 0, 14, 1.5); this.group.add(this.flashLight);
  }

  private later(ms: number, f: () => void){ this.timers.push(window.setTimeout(f, ms)); }

  // vòng sáng dưới chân người tặng, toả ra rồi tan
  private ring(id: string, color: number, life = 2.2){
    const m = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.42, 48).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(2.5), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.group.add(m);
    this.rings.push({ m, t0: performance.now() / 1000, life, at: () => this.people.feet(id) });
  }
  private bubblesAt(at: THREE.Vector3, n: number){
    for (let i = 0; i < n; i++){
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.6;
      this.bubbles.emit({ at: at.clone().add(new THREE.Vector3(Math.cos(a) * r, 0.6 + Math.random() * 1.2, Math.sin(a) * r)), v: new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.5 + Math.random() * 0.7, (Math.random() - 0.5) * 0.4),
        life: 2.5 + Math.random() * 2, color: new THREE.Color().setHSL(Math.random(), 0.5, 0.85), size: 0.05 + Math.random() * 0.08, alpha: 0.9, drag: 0.2, gravity: -0.05, delay: Math.random() * 0.8, fade: 0.25 });
    }
  }
  private burst(at: THREE.Vector3, cols: number[], n: number, speed: number, gravity = 3, size = 0.06){
    for (let i = 0; i < n; i++){
      const d = new THREE.Vector3().randomDirection().multiplyScalar(speed * (0.75 + Math.random() * 0.25));
      this.glow.emit({ at, v: d, life: 1.4 + Math.random() * 0.8, color: cols[i % cols.length], size, gravity, drag: 0.9, fade: 0.5 });
    }
  }
  spotlight(id: string, ms: number){ this.followId = id; this.followUntil = performance.now() + ms; }

  // một lần tặng quà: hiệu ứng tức thời theo mức (màn diễn dài thì do show() lo)
  gift(id: string, name: string, show: BarShowKey, level: number, xu: number){
    const at = this.people.feet(id) ?? new THREE.Vector3(0, 0, 0);
    const g = BAR_GIFTS.find(x => x.key === show);
    this.ring(id, level >= 4 ? 0xffc860 : level >= 3 ? 0xff40c0 : 0x5ad8ff, 1.6 + level * 0.5);
    this.people.highlight(id, 6 + level * 2);
    this.stage.ripple(Math.max(FLOOR.x0, Math.min(FLOOR.x1, at.x)), Math.max(FLOOR.z0, Math.min(FLOOR.z1, at.z)), level >= 4 ? 0xffc860 : 0xff40c0);
    // 1 xu: múa một điệu, máy quay vào người tặng 5 giây
    if (show === 'dance1'){ this.bubblesAt(at, 22); this.sound.pop(); this.skill(id, 1, 5000); this.cue('giver', id, 5000); return; }
    // 5 xu: skill múa đẹp hơn, đèn rọi theo người, máy quay 5 giây
    if (show === 'dance5'){ this.bubblesAt(at, 40); this.sound.pop(); this.spotlight(id, 6000); this.skill(id, 2, 6500); this.cue('giver', id, 5000); return; }
    this.people.cheer(id);
    this.spotlight(id, 4000 + level * 1500);
    // 10 xu: thay bộ đồ dạ tiệc lấp lánh (đồ đổi theo trạng thái quán), lấp lánh quanh người, máy quay ngắm bộ đồ mới
    if (show === 'outfit'){ this.bubblesAt(at, 60); this.burst(at.clone().setY(1.2), [0xffd86a, 0xffffff, 0xff7ad8], 140, 2.4, 1.6, 0.06); this.sound.boom(); this.cue('giver', id, 5000); }
    // 30 xu: skill VIP múa đủ kiểu (đổi điệu liên tục), đèn rọi, pháo giấy nhỏ, máy quay vào 10 giây
    if (show === 'vipdance'){
      this.spotlight(id, 10_000); this.ring(id, 0xffc860, 3.2); this.skill(id, 3, 12_000); this.cue('giver', id, 10_000);
      this.ceilingConfetti(120); this.sound.applause(2);
      this.later(2500, () => this.burst(at.clone().setY(1.0), [0xffc860, 0xff40c0, 0xffffff], 160, 3, 2, 0.06));
      this.later(6000, () => this.burst(at.clone().setY(1.0), [0x5ad8ff, 0xffc860, 0xffffff], 160, 3, 2, 0.06));
    }
    if (level >= 3 && g) this.stage.screen.message(name, g.label, g.icon, 7000, level >= 4);
    if (level >= 3) this.toast(name, g?.label ?? '', g?.icon ?? '🎁', level);
    void xu;
  }

  // màn diễn chiếm sân khấu một lúc (laser, đổi màu, nâng ly, CO2, VIP, DJ show)
  show(key: BarShowKey, id: string, name: string, ms: number, vsId = '', vsName = ''){
    const st = this.stage, sec = ms / 1000;
    const g = BAR_GIFTS.find(x => x.key === key);
    switch (key){
      case 'laser': st.setMode('laser'); this.cue('stage', id, 6000); break;
      // 99 xu: đối đầu siêu VIP với top 2 quà: hai người đứng giữa sàn múa trước mặt nhau, laser show, máy quay ngang hai người
      case 'faceoff': {
        st.setMode('lasershow'); st.strobe(1200); this.flash(0xffffff, 1.2); this.sideCannons(); this.sound.boom(); this.sound.applause(4);
        const vs = vsId || 'house';
        this.people.faceoff(id, vs, sec);
        this.skill(id, 4, ms, 0); this.skill(vs, 4, ms, 1);
        this.cueTwo(id, vs, ms);
        st.screen.message('ĐỐI ĐẦU SIÊU VIP', `${name} ⚔️ ${vsName || 'Vũ công Bar Online'}`, '⚔️', Math.min(ms, 12_000), true);
        this.later(5000, () => this.ceilingConfetti(200)); this.later(ms - 2500, () => { this.sideCannons(); this.sound.applause(3); });
        break;
      }
      case 'stage': st.setMode('stage'); st.strobe(1800); st.focus(this.people.feet(id), 5000); this.flash(0xffffff, 1.5); this.cue('stage', id, 7000); this.people.show('stage', sec); break;
      case 'co2': st.setMode('co2'); st.co2(Math.ceil(sec / 4), 4000); st.sparkle(ms * 0.6); this.people.show('co2', sec); this.cue('stage', id, 9000);
        this.later(200, () => this.sound.boom()); break;
      case 'vip':
        st.setMode('vip'); st.sparkle(10_000); st.focus(this.people.feet(id), 8000);
        st.screen.message(`VIP ${name}`, 'Chào mừng khách VIP 👑 Champagne Gold đang tới', '👑', 14_000, true);
        this.indoorFireworks(8); this.skyFireworks(10);
        this.people.show('vip', sec); this.cue('vip', id, 6000); this.later(5500, () => this.cue('sky', id, 8000));
        break;
      case 'djshow': this.djShow(id, name, ms); break;
      default: break;
    }
    if (g && key !== 'djshow' && key !== 'faceoff' && g.level >= 3) this.toast(name, g.label, g.icon, g.level);
  }
  // Skill múa của người tặng (chỉ người đó): vệt sáng bám hai bàn tay theo từng động tác, sóng sáng dưới chân dội theo nhịp,
  // mức cao có lốc hạt xoáy quanh người và tia sáng bắn lên. tier 1: 1 xu, 2: 5 xu, 3: 30 xu, 4: đối đầu 99 xu.
  // side: màu riêng cho hai bên đối đầu (0 vàng hồng, 1 xanh ngọc tím)
  private skills = new Map<string, { until: number; tier: number; last: number; side: number; k: number }>();
  skill(id: string, tier: number, ms: number, side = 0){ this.skills.set(id, { until: performance.now() + ms, tier, last: 0, side, k: 0 }); }
  private static SKILL_COLS = [[0xffffff, 0x9fd8ff], [0x5ad8ff, 0xff7ad8, 0xffffff], [0xffc860, 0xff40c0, 0xffffff, 0xfff0a0], [0xffd060, 0xff3aa0, 0xffffff]];
  private static SKILL_COLS_B = [0x40ffd0, 0x8a5aff, 0xffffff];
  private _h = new THREE.Vector3();
  private skillUpdate(now: number){
    for (const [id, s] of this.skills){
      if (now > s.until || !this.people.feet(id)){ this.skills.delete(id); continue; }
      const cols = s.tier === 4 && s.side ? GiftFx.SKILL_COLS_B : GiftFx.SKILL_COLS[s.tier - 1];
      // vệt sáng hai tay: hạt đứng yên tại chỗ bàn tay vừa đi qua, mờ dần, nên thành vệt theo động tác
      const per = s.tier;
      for (const right of [true, false]){
        const h = this.people.hand(id, right, this._h); if (!h) continue;
        for (let i = 0; i < per; i++) this.glow.emit({ at: h.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03, (Math.random() - 0.5) * 0.03)), v: new THREE.Vector3((Math.random() - 0.5) * 0.1, 0.05, (Math.random() - 0.5) * 0.1),
          life: 0.35 + s.tier * 0.12, color: cols[(s.k++) % cols.length], size: 0.05 + s.tier * 0.018, gravity: 0, drag: 2, fade: 0.8 });
      }
      const at = this.people.feet(id)!;
      // lốc hạt xoáy quanh người (từ 30 xu)
      if (s.tier >= 3) for (let i = 0; i < s.tier - 1; i++){
        const a = now / 1000 * 4 + i * Math.PI + Math.random() * 0.3, r = 0.75;
        this.glow.emit({ at: at.clone().add(new THREE.Vector3(Math.cos(a) * r, 0.05 + Math.random() * 0.2, Math.sin(a) * r)), v: new THREE.Vector3(-Math.sin(a) * 1.2, 1.1 + Math.random() * 0.6, Math.cos(a) * 1.2),
          life: 1.2, color: cols[(s.k++) % cols.length], size: 0.06, gravity: -0.2, drag: 0.6, fade: 0.6 });
      }
      // sóng sáng dưới chân theo nhịp; mức cao thêm tia bắn lên
      const every = s.tier >= 3 ? 470 : 700;
      if (now - s.last > every){
        s.last = now;
        this.ring(id, cols[0], 1.0 + s.tier * 0.45);
        if (s.tier >= 2) this.stage.ripple(Math.max(FLOOR.x0, Math.min(FLOOR.x1, at.x)), Math.max(FLOOR.z0, Math.min(FLOOR.z1, at.z)), cols[1]);
        if (s.tier >= 3) this.burst(at.clone().setY(0.2), [cols[0], 0xffffff], 26 + s.tier * 8, 3.4, 4, 0.05);
      }
    }
  }
  // lên cấp: cột sáng màu của cấp, vòng toả rộng, hạt bay; cấp càng cao càng rực
  levelUp(id: string, lv: number){
    const at = this.people.feet(id); if (!at) return;
    const c = levelInfo(lv).color;
    this.ring(id, c, 2.4 + lv * 0.25);
    this.burst(at.clone().setY(1.0), [c, 0xffffff, c], 80 + lv * 25, 2.2 + lv * 0.15, 1.2, 0.06);
    if (lv >= 5) this.later(400, () => this.burst(at.clone().setY(2.0), [c, 0xffd060], 120, 3, 2, 0.07));
    if (lv >= 8){ this.flash(c, 0.8); this.sound.boom(); }
    this.people.highlight(id, 8);
  }
  // người thắng Dance Battle: pháo giấy, pháo hoa nhỏ trong quán, đèn chớp
  celebrate(){ this.ceilingConfetti(260); this.sideCannons(); this.indoorFireworks(5); this.stage.strobe(1200); this.sound.boom(); }
  end(_key: BarShowKey){ this.stage.setMode('idle'); this.people.show('idle', 0); }

  // DJ SHOW: tắt đèn 2,5 giây, màn LED đếm ngược, rồi DROP: laser, CO2, pháo lạnh, pháo giấy, strobe, cả quán nhảy
  private djShow(id: string, name: string, ms: number){
    const st = this.stage;
    st.setMode('djshow'); st.blackout(3200); st.screen.countdown();
    this.cue('djshow', id, ms);
    this.toast(name, 'mở màn DJ SHOW 🎧 Cả quán quẩy lên!', '🎧', 5);
    this.later(3200, () => {
      st.strobe(2500); st.co2(Math.floor(ms / 6000), 6000); st.sparkle(ms * 0.7);
      this.ceilingConfetti(600); this.sideCannons(); this.flash(0xffffff, 3);
      this.indoorFireworks(6); this.skyFireworks(12);
      this.sound.boom(); this.sound.applause(5);
      st.screen.message(`DJ SHOW`, `🎧 by ${name}`, '🔥', ms - 4000, true);
      this.people.show('djshow', ms / 1000);
    });
    // giữa show: thêm đợt pháo giấy, đèn chớp
    for (let k = 1; k < Math.floor(ms / 15000); k++) this.later(3200 + k * 15000, () => { this.ceilingConfetti(260); st.strobe(1500); this.indoorFireworks(3); });
  }

  private ceilingConfetti(n: number){
    for (const x of [-3.5, 0, 3.5]) this.confetti.fire(new THREE.Vector3(x, ROOM.h - 0.4, (FLOOR.z0 + FLOOR.z1) / 2), new THREE.Vector3(0, -1, 0.1).normalize(), Math.round(n / 3), 0.35);
    this.sound.cannon();
  }
  private sideCannons(){
    for (const s of [-1, 1]) this.confetti.fire(new THREE.Vector3(s * 5.8, STAGE.y + 0.3, STAGE.z1 - 0.2), new THREE.Vector3(-s * 0.35, 1, 0.45).normalize(), 380, 0.75);
    this.sound.cannon();
  }
  private flash(color: number, k: number){ this.flashLight.color.set(color); this.flashLight.position.set(0, 5, -4); this.flashLight.intensity = 45 * k; }
  // pháo hoa nhỏ nổ dưới trần (kiểu pháo sân khấu trong nhà)
  private indoorFireworks(n: number){
    for (let i = 0; i < n; i++) this.later(i * 450 + Math.random() * 200, () => {
      const at = new THREE.Vector3((Math.random() - 0.5) * 10, 5.2 + Math.random() * 1.2, -8 + Math.random() * 6);
      const c = [0xffd45a, 0xff5ab0, 0x7ad0ff, 0xb0ff7a, 0xffffff][Math.floor(Math.random() * 5)];
      this.burst(at, [c, 0xffffff], 90, 3.2, 2.2, 0.07); this.sound.fwBurst('crackle', false);
    });
  }
  // pháo hoa lớn trên trời phố (thấy rõ khi máy quay ra ngoài, trong quán thấy qua kính)
  private skyFireworks(n: number){
    for (let i = 0; i < n; i++) this.later(i * 600 + Math.random() * 300, () => {
      // nổ trên nóc quán và hai bên (máy quay ngoài phố nhìn về phía quán nên thấy trọn)
      const at = new THREE.Vector3((Math.random() - 0.5) * 36, 17 + Math.random() * 9, -3 + Math.random() * 9);
      const c = [0xffd45a, 0xff5ab0, 0x7ad0ff, 0xb0ff7a, 0xff6a3a][Math.floor(Math.random() * 5)], c2 = 0xffffff;
      this.sound.fwLaunch();
      this.later(900, () => { this.burst(at, [c, c, c2], 380, 11, 4, 0.26); this.sound.fwBurst(Math.random() < 0.5 ? 'peony' : 'willow', Math.random() < 0.3); });
    });
  }

  update(dt: number, t: number, viewH: number, fov: number){
    const now = performance.now();
    this.skillUpdate(now);
    // đèn rọi bám người tặng
    const on = now < this.followUntil && !!this.followId;
    const head = on ? this.people.head(this.followId) : null;
    this.follow.intensity += ((head ? 55 : 0) - this.follow.intensity) * Math.min(1, dt * 6);
    this.followBeam.visible = this.follow.intensity > 2;
    if (head){
      const top = new THREE.Vector3(head.x * 0.6, ROOM.h - 0.2, head.z + 2.5);
      this.follow.position.copy(top); this.follow.target.position.set(head.x, head.y - 1.2, head.z); this.follow.target.updateMatrixWorld();
      const dir = new THREE.Vector3(head.x, head.y - 1.6, head.z).sub(top), len = dir.length();
      this.followBeam.position.copy(top); this.followBeam.scale.set(1, len, 1);
      this.followBeam.quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir.normalize());
    }
    (this.followBeam.material as THREE.ShaderMaterial).uniforms.a.value = this.follow.intensity / 55;
    this.flashLight.intensity *= Math.max(0, 1 - dt * 6);
    for (const r of this.rings){
      const k = (t - r.t0) / r.life, at = r.at();
      if (at) r.m.position.set(at.x, at.y + 0.04, at.z);
      r.m.scale.setScalar(1 + k * 3.5);
      (r.m.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - k);
      if (k >= 1){ r.m.removeFromParent(); r.m.geometry.dispose(); (r.m.material as THREE.Material).dispose(); }
    }
    this.rings = this.rings.filter(r => (t - r.t0) / r.life < 1);
    this.bubbles.update(dt, viewH, fov); this.glow.update(dt, viewH, fov);
    this.confetti.update(dt, now);
  }
}
