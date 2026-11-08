import * as THREE from 'three';
import { showFor } from '../../shared/balance.ts';
import type { ShowKey } from '../../shared/balance.ts';
import type { Cast } from './cast.ts';
import type { SparkSystem } from './sparks.ts';

// Các màn hiệu ứng quà đám cưới: gọi bia, gọi món, pháo giấy, pháo hoa, cả sân nâng ly, hào quang VIP, múa lân, hoàng hôn thả đèn trời,
// cầu vồng, pháo hoa trái tim kèm tên người tặng trên trời. Mỗi màn dựng sẵn một lần, chỉ bật lên khi có quà.
export interface Env { scene: THREE.Scene; hemi: THREE.HemisphereLight; sun: THREE.DirectionalLight; fog: THREE.Fog }
type Hooks = {
  beer: (id: string, name: string) => void; food: (id: string, name: string) => void; paper: (giver: THREE.Vector3 | null) => void; fireworks: (n: number) => void;
  toast: (id: string, name: string) => void; dance: (name: string) => void; confetti: (n: number, icons: string[]) => void; sound: (key: ShowKey) => void; boom: () => void; flash: (amount: number) => void;
};

const LANTERNS = 90;
const up = new THREE.Vector3(0, 1, 0), _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _c = new THREE.Color();

export class GiftShow {
  readonly group = new THREE.Group();
  readonly vip = new Set<string>();
  wideUntil = 0;                                     // màn lớn đang diễn: camera lùi rộng, bảng chữ mờ đi
  private lanterns: THREE.InstancedMesh;
  private lanternList: { p: THREE.Vector3; vy: number; age: number; life: number; ph: number }[] = [];
  private dusk = { v: 0, until: 0, dim: 0, dimUntil: 0 };          // dim: trời sẩm nhanh cho pháo hoa nổi bật
  private duskSky: THREE.Mesh;
  readonly base: { hemi: number; sun: number; fog: THREE.Color };      // mức sáng nền (môi trường ba buổi cập nhật mỗi khung hình)
  private duskFog = new THREE.Color(0x6a4a6e);
  private lion: { g: THREE.Group; head: THREE.Group; jaw: THREE.Mesh; segs: THREE.Object3D[]; t: number; on: boolean };
  private rainbow: { g: THREE.Group; mats: THREE.MeshBasicMaterial[]; t: number; on: boolean };
  private sky: { s: THREE.Sprite; c: HTMLCanvasElement; tex: THREE.CanvasTexture; t: number; on: boolean };
  private timers: number[] = [];
  private cast: Cast; private sparks: SparkSystem; private env: Env; private hooks: Hooks;

  constructor(cast: Cast, sparks: SparkSystem, env: Env, hooks: Hooks){
    this.cast = cast; this.sparks = sparks; this.env = env; this.hooks = hooks;
    this.base = { hemi: env.hemi.intensity, sun: env.sun.intensity, fog: env.fog.color.clone() };

    // đèn trời: thân giấy cam sáng, ánh vượt ngưỡng để bloom tỏa quầng
    const lg = new THREE.CylinderGeometry(0.24, 0.17, 0.48, 10, 1, true);
    this.lanterns = new THREE.InstancedMesh(lg, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false, fog: false }), LANTERNS);
    this.lanterns.count = 0; this.lanterns.frustumCulled = false;

    // bầu trời hoàng hôn phủ lên trời xanh
    this.duskSky = new THREE.Mesh(new THREE.SphereGeometry(120, 24, 16), new THREE.MeshBasicMaterial({ map: gradient([[0, '#160f30'], [0.3, '#2e1c58'], [0.4, '#6a3478'], [0.46, '#d0607a'], [0.5, '#ffa070'], [1, '#ffc890']]), side: THREE.BackSide, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    this.duskSky.renderOrder = -1; this.duskSky.visible = false;

    this.lion = this.buildLion();
    this.rainbow = this.buildRainbow();
    const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
    const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, toneMapped: false, fog: false, opacity: 0 }));
    s.position.set(0, 9.5, -1); s.scale.set(11, 2.75, 1); s.visible = false;
    this.sky = { s, c, tex, t: 0, on: false };

    this.group.add(this.lanterns, this.duskSky, this.lion.g, this.rainbow.g, s);
  }

  // xu: tổng số xu lần tặng. Chạy màn của mức cao nhất đạt được; quà từ 200 xu có thêm pháo giấy mở màn.
  play(xu: number, id: string, name: string, from: THREE.Vector3 | null, mid: THREE.Vector3){
    const top = showFor(xu).at(-1);
    if (!top) return;
    const key = top.key, at = from ?? mid;
    this.hooks.sound(key);
    const ms = key === 'lion' ? 15_000 : key === 'lantern' ? 22_000 : key === 'rainbow' ? 20_000 : key === 'grand' ? 22_000 : 0;
    if (ms) this.wideUntil = Math.max(this.wideUntil, performance.now() + ms);
    if (top.xu >= 200) this.hooks.paper(from);
    this.after(top.xu >= 200 ? 900 : 0, () => this.run(key, id, name, at, mid, from));
  }

  // Trời sẩm lại trong ms mili giây (pháo hoa ban ngày nhìn nhạt): tối nhanh, sáng lại từ từ
  dim(ms: number, amount = 0.8){ this.dusk.dimUntil = Math.max(this.dusk.dimUntil, performance.now() + ms); this.dusk.dim = amount; }

  private after(ms: number, fn: () => void){ if (!ms){ fn(); return; } this.timers.push(window.setTimeout(fn, ms)); if (this.timers.length > 40) this.timers.shift(); }

  private run(key: ShowKey, id: string, name: string, at: THREE.Vector3, mid: THREE.Vector3, from: THREE.Vector3 | null){
    const sp = this.sparks;
    switch (key){
      case 'beer': this.hooks.beer(id, name); break;
      case 'food': this.hooks.food(id, name); break;
      case 'confetti': this.hooks.paper(from); this.hooks.confetti(14, ['🎉', '🎊', '✨']); this.hooks.flash(1); break;
      case 'fireworks': this.dim(7500); this.wideUntil = Math.max(this.wideUntil, performance.now() + 7000); this.hooks.fireworks(5); break;   // bảng chữ mờ đi cho thấy pháo hoa
      case 'toast': this.hooks.toast(id, name); break;
      case 'dance': this.dim(16_000, 0.55); this.wideUntil = Math.max(this.wideUntil, performance.now() + 16_000); this.hooks.dance(name); break;   // trời sẩm, bảng chữ mờ như sàn nhảy
      case 'heartRain': this.hooks.confetti(50, ['💖', '❤️', '💕', '💗']); sp.hearts(mid); sp.rain([0xff5a8a, 0xffa6c8, 0xffffff], 160, 4); this.hooks.flash(3); break;
      case 'lion': this.lion.t = 0; this.lion.on = true; this.lion.g.visible = true; break;
      case 'lantern': this.dusk.until = performance.now() + 24_000; for (let i = 0; i < 70; i++) this.addLantern(i * 0.12); break;
      case 'rainbow': this.rainbow.t = 0; this.rainbow.on = true; this.rainbow.g.visible = true; sp.rain([0xffd45a, 0xffe9a0, 0xffffff, 0xffc04a], 420, 8); break;
      case 'grand': this.grand(name); break;
    }
  }

  private grand(name: string){
    this.drawName(name);
    this.sky.t = 0; this.sky.on = true; this.sky.s.visible = true;
    const sp = this.sparks, cols = [0xff4f8a, 0xffd45a, 0xff7ab8];
    for (let i = 0; i < 3; i++) this.after(i * 1300, () => { sp.heart(new THREE.Vector3((i - 1) * 4.5, 9.5 + (i % 2) * 1.2, -2), cols[i]); this.hooks.boom(); this.hooks.flash(2.5); });
    this.after(4200, () => { sp.heart(new THREE.Vector3(0, 11, -2), 0xff2f6a, 0.45); this.hooks.fireworks(4); this.hooks.boom(); });
    this.hooks.confetti(40, ['👑', '💖', '✨', '🎆']);
  }

  // tên người tặng viết bằng chữ vàng trên trời: chỉ vẽ chữ lên canvas, không qua HTML
  private drawName(name: string){
    const { c, tex } = this.sky, g = c.getContext('2d')!;
    g.clearRect(0, 0, c.width, c.height);
    const text = `💖 ${name.slice(0, 24)} 💖`;
    let size = 120;
    g.font = `900 ${size}px "Segoe UI", system-ui, sans-serif`;
    while (g.measureText(text).width > c.width - 60 && size > 40){ size -= 6; g.font = `900 ${size}px "Segoe UI", system-ui, sans-serif`; }
    g.textAlign = 'center'; g.textBaseline = 'middle';
    const gr = g.createLinearGradient(0, 60, 0, 200); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.5, '#ffd45a'); gr.addColorStop(1, '#ff9a3c');
    g.shadowColor = '#ff6aa8'; g.shadowBlur = 36;
    g.lineWidth = 10; g.strokeStyle = '#8a1f3c'; g.strokeText(text, 512, 132);
    g.fillStyle = gr; g.fillText(text, 512, 132);
    tex.needsUpdate = true;
  }

  private addLantern(delay: number){
    if (this.lanternList.length >= LANTERNS) this.lanternList.shift();
    this.lanternList.push({ p: new THREE.Vector3((Math.random() - 0.5) * 18, 0.6 + Math.random() * 0.8, -1 + Math.random() * 15), vy: 0.8 + Math.random() * 0.6, age: -delay - Math.random() * 1.5, life: 20 + Math.random() * 4, ph: Math.random() * 6 });
  }

  private buildLion(){
    const g = new THREE.Group(), head = new THREE.Group();
    const red = new THREE.MeshStandardMaterial({ color: 0xd8262a, roughness: 0.6 }), gold = new THREE.MeshStandardMaterial({ color: 0xffc83a, roughness: 0.4, metalness: 0.3, emissive: 0x402800 });
    const white = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 }), black = new THREE.MeshBasicMaterial({ color: 0x111111 }), green = new THREE.MeshStandardMaterial({ color: 0x2fae5a, roughness: 0.6 });
    const box = (w: number, h: number, d: number, m: THREE.Material) => { const x = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); x.castShadow = true; return x; };
    const skull = box(1.0, 0.8, 0.9, red); head.add(skull);
    const brow = box(1.06, 0.18, 0.2, gold); brow.position.set(0, 0.32, 0.42); head.add(brow);
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.35, 8), gold); horn.position.set(0, 0.55, 0.15); head.add(horn);
    const mirror = new THREE.Mesh(new THREE.CircleGeometry(0.12, 16), new THREE.MeshBasicMaterial({ color: 0xfff6d0, toneMapped: false })); mirror.position.set(0, 0.14, 0.46); head.add(mirror);
    for (const s of [-1, 1]){
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), white); eye.position.set(s * 0.26, 0.12, 0.42); head.add(eye);
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), black); pupil.position.set(s * 0.26, 0.12, 0.55); head.add(pupil);
      const ear = box(0.12, 0.3, 0.2, green); ear.position.set(s * 0.5, 0.42, 0); ear.rotation.z = s * -0.4; head.add(ear);
      const fluff = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), white); fluff.position.set(s * 0.55, -0.1, 0.25); head.add(fluff);
    }
    const jaw = box(0.9, 0.16, 0.7, gold); jaw.position.set(0, -0.48, 0.12); head.add(jaw);
    const beard = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.45, 10), white); beard.rotation.x = Math.PI; beard.position.set(0, -0.28, 0.18); jaw.add(beard);
    g.add(head);
    // thân lân: các đoạn vải đỏ vàng xen kẽ, viền lông trắng, hai cặp chân người múa
    const segs: THREE.Object3D[] = [];
    for (let i = 0; i < 6; i++){
      const seg = new THREE.Group(), k = 1 - i * 0.09;
      const cloth = box(0.95 * k, 0.6 * k, 0.55, i % 2 ? gold : red); seg.add(cloth);
      const fringe = box(1.0 * k, 0.08, 0.58, white); fringe.position.y = -0.32 * k; seg.add(fringe);
      if (i === 1 || i === 5) for (const s of [-1, 1]){ const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8), gold); leg.position.set(s * 0.2, -0.6, 0); leg.name = 'leg'; seg.add(leg); }
      if (i === 5){ const tail = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), white); tail.position.set(0, 0.1, -0.3); seg.add(tail); }
      segs.push(seg); g.add(seg);
    }
    g.visible = false;
    return { g, head, jaw, segs, t: 0, on: false };
  }

  private buildRainbow(){
    const g = new THREE.Group(), mats: THREE.MeshBasicMaterial[] = [];
    [0xff4a4a, 0xff9a3c, 0xffe14a, 0x5ad65a, 0x4aa8ff, 0x5a5aff, 0xb05aff].forEach((col, i) => {
      const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0, depthWrite: false, fog: false });
      const arc = new THREE.Mesh(new THREE.TorusGeometry(19 - i * 0.55, 0.3, 6, 72, Math.PI), m); mats.push(m); g.add(arc);
    });
    g.position.set(0, -4, -16); g.visible = false;
    return { g, mats, t: 0, on: false };
  }

  // Lân đi dọc thảm đỏ lên trước cô dâu chú rể, lắc đầu, nhảy, rồi lui ra
  private lionPath(t: number, out: THREE.Vector3){
    const T = 15, u = Math.min(1, Math.max(0, t / T));
    out.set(Math.sin(t * 1.7) * 0.9, 0, 13 - 9 * Math.sin(Math.PI * u));
    return out;
  }

  update(dt: number, now: number){
    // đèn trời: bay lên chậm, chao nhẹ, ánh lửa chập chờn
    let n = 0;
    this.lanternList = this.lanternList.filter(l => (l.age += dt) < l.life);
    for (const l of this.lanternList){
      if (l.age < 0) continue;
      l.p.y += l.vy * dt; l.p.x += Math.sin(now / 1400 + l.ph) * dt * 0.3;
      const k = Math.min(1, l.age) * (l.age > l.life - 2 ? (l.life - l.age) / 2 : 1);
      _q.setFromAxisAngle(up, l.ph + now / 3000);
      this.lanterns.setMatrixAt(n, _m.compose(l.p, _q, _s.set(k, k, k)));
      const f = 1.5 + Math.sin(now / 90 + l.ph * 5) * 0.15;
      this.lanterns.setColorAt(n++, _c.setRGB(1.15 * f, 0.36 * f, 0.07 * f));
    }
    this.lanterns.count = n; this.lanterns.instanceMatrix.needsUpdate = true; if (this.lanterns.instanceColor) this.lanterns.instanceColor.needsUpdate = true;

    // hoàng hôn: trời tím cam, đèn dịu xuống để đèn trời tỏa sáng
    const dim = now < this.dusk.dimUntil ? this.dusk.dim : 0, goal = Math.max(now < this.dusk.until ? 1 : 0, dim);
    this.dusk.v += (goal - this.dusk.v) * Math.min(1, dt * (goal > this.dusk.v ? (dim >= goal ? 2.6 : 0.9) : 0.35));
    const d = this.dusk.v < 0.002 ? 0 : this.dusk.v;
    this.duskSky.visible = d > 0; (this.duskSky.material as THREE.MeshBasicMaterial).opacity = d;
    this.env.hemi.intensity = this.base.hemi * (1 - 0.6 * d);
    this.env.sun.intensity = this.base.sun * (1 - 0.7 * d);
    this.env.fog.color.copy(this.base.fog).lerp(this.duskFog, d);

    // múa lân
    const L = this.lion;
    if (L.on){
      L.t += dt;
      if (L.t > 15){ L.on = false; L.g.visible = false; }
      else {
        const hp = this.lionPath(L.t, _p), next = this.lionPath(L.t + 0.05, new THREE.Vector3());
        const hop = Math.abs(Math.sin(L.t * 6)) * 0.25 + (Math.sin(L.t * 1.3) > 0.85 ? 0.5 : 0);
        L.head.position.set(hp.x, 1.25 + hop, hp.z);
        L.head.lookAt(next.x, 1.25 + hop, next.z);
        L.head.rotateY(Math.PI);                                   // mặt lân hướng về phía đi tới
        L.head.rotation.z += Math.sin(L.t * 4) * 0.25;             // lắc đầu
        L.jaw.position.y = -0.48 - Math.abs(Math.sin(L.t * 5)) * 0.15;   // há miệng
        L.segs.forEach((s, i) => {
          const p = this.lionPath(L.t - (i + 1) * 0.16, new THREE.Vector3()), q = this.lionPath(L.t - (i + 1) * 0.16 + 0.05, new THREE.Vector3());
          s.position.set(p.x, 1.05 + Math.abs(Math.sin(L.t * 6 - i * 0.6)) * 0.18 - i * 0.05, p.z);
          s.lookAt(q.x, s.position.y, q.z);
          for (const c of s.children) if (c.name === 'leg') c.rotation.x = Math.sin(L.t * 10 + i) * 0.5;
        });
        if (Math.random() < dt * 8) this.sparks.burst(new THREE.Vector3(hp.x, 1.8, hp.z), [0xffd45a, 0xff4a4a], 3, 1.2);
      }
    }

    // cầu vồng: hiện dần, giữ, tan dần
    const R = this.rainbow;
    if (R.on){
      R.t += dt;
      const a = R.t < 2.5 ? R.t / 2.5 : R.t > 16 ? Math.max(0, 1 - (R.t - 16) / 3) : 1;
      for (const m of R.mats) m.opacity = a * 0.55;
      if (R.t > 19){ R.on = false; R.g.visible = false; }
    }

    // tên trên trời
    const S = this.sky;
    if (S.on){
      S.t += dt;
      const a = S.t < 1.2 ? S.t / 1.2 : S.t > 11 ? Math.max(0, 1 - (S.t - 11) / 2) : 1;
      (S.s.material as THREE.SpriteMaterial).opacity = a;
      S.s.position.y = 9.5 + Math.sin(S.t * 1.4) * 0.15;
      if (Math.random() < dt * 14) this.sparks.glow(new THREE.Vector3((Math.random() - 0.5) * 10, 10.5, -1));
      if (S.t > 13){ S.on = false; S.s.visible = false; }
    }

    // hào quang VIP: lấp lánh vàng quanh người tặng suốt đám cưới
    for (const id of this.vip){
      const a = this.cast.actors.get(id);
      if (a && Math.random() < dt * 9) this.sparks.glow(_p.set(a.x, 1.2, a.z));
    }
  }

  // mở đám cưới mới: xóa hào quang VIP của đám trước
  reset(){ this.vip.clear(); }
}

// stops: [vị trí 0..1 từ đỉnh trời xuống, màu]; chân trời nằm ở 0.5
function gradient(stops: [number, string][]){
  const c = document.createElement('canvas'); c.width = 4; c.height = 256;
  const g = c.getContext('2d')!, gr = g.createLinearGradient(0, 0, 0, 256);
  for (const [p, s] of stops) gr.addColorStop(p, s);
  g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
