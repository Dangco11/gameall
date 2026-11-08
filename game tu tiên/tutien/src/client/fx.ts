import * as THREE from 'three';
import type { Vfx } from '../shared/game.ts';
import { runeTex, smokeTex, softTex } from './mats.ts';

// Hiệu ứng chiêu thức 3D. Mỗi kiểu một cách dựng riêng (kiếm khí, phi kiếm, mưa kiếm, sét, rồng linh khí, thiên thạch,
// cột lửa, gai băng, lốc xoáy, bàn tay ma, phượng hoàng...). Hạt dùng chung một hệ Points (pool 6000 hạt),
// đèn chớp dùng pool 6 đèn, hình học dùng chung, vật liệu riêng của hiệu ứng được giải phóng khi hết.
const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
const rnd = (a = 1) => (Math.random() - 0.5) * 2 * a;
const GEO = {
  sph: new THREE.SphereGeometry(1, 20, 14), ring: new THREE.RingGeometry(0.85, 1, 64), disc: new THREE.CircleGeometry(1, 48),
  cone: new THREE.ConeGeometry(1, 1, 10), cyl: new THREE.CylinderGeometry(1, 1, 1, 24, 1, true), box: new THREE.BoxGeometry(1, 1, 1),
  arc: new THREE.TorusGeometry(1, 0.08, 6, 40, Math.PI * 0.9), plane: new THREE.PlaneGeometry(1, 1),
  sword: (() => { const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(0.08, 0.15); s.lineTo(0.05, 1.6); s.lineTo(0, 1.85); s.lineTo(-0.05, 1.6); s.lineTo(-0.08, 0.15); s.closePath(); const g = new THREE.ExtrudeGeometry(s, { depth: 0.02, bevelEnabled: false }); g.translate(0, -0.9, -0.01); g.rotateX(Math.PI / 2); return g; })(),
};
const add = (c: number, o = 1) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });

/* ------------------------------------------------------------ hệ hạt */
class Particles {
  N = 6000; i = 0;
  pos: Float32Array; col: Float32Array; size: Float32Array; alpha: Float32Array;
  vel: Float32Array; life: Float32Array; max: Float32Array; grav: Float32Array; drag: Float32Array; s0: Float32Array;
  geo = new THREE.BufferGeometry(); points: THREE.Points;
  constructor() {
    const N = this.N;
    this.pos = new Float32Array(N * 3); this.col = new Float32Array(N * 3); this.size = new Float32Array(N); this.alpha = new Float32Array(N);
    this.vel = new Float32Array(N * 3); this.life = new Float32Array(N); this.max = new Float32Array(N); this.grav = new Float32Array(N); this.drag = new Float32Array(N); this.s0 = new Float32Array(N);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    const mat = new THREE.ShaderMaterial({
      uniforms: { map: { value: softTex() }, scale: { value: 600 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, vertexColors: true,
      vertexShader: `attribute float size; attribute float alpha; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vC = color; vA = alpha; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * scale / -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D map; varying vec3 vC; varying float vA; void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC * 1.6, t.a * vA); if (gl_FragColor.a < 0.01) discard; }`,
    });
    this.points = new THREE.Points(this.geo, mat); this.points.frustumCulled = false; this.points.renderOrder = 5;
  }
  emit(p: THREE.Vector3, v: THREE.Vector3, color: THREE.Color, size: number, life: number, grav = 0, drag = 0.5) {
    const i = this.i = (this.i + 1) % this.N, k = i * 3;
    this.pos[k] = p.x; this.pos[k + 1] = p.y; this.pos[k + 2] = p.z;
    this.vel[k] = v.x; this.vel[k + 1] = v.y; this.vel[k + 2] = v.z;
    this.col[k] = color.r; this.col[k + 1] = color.g; this.col[k + 2] = color.b;
    this.size[i] = this.s0[i] = size; this.life[i] = this.max[i] = life; this.grav[i] = grav; this.drag[i] = drag; this.alpha[i] = 1;
  }
  burst(p: THREE.Vector3, color: THREE.Color, n: number, speed: number, size = 0.5, life = 0.9, grav = -4) {
    for (let j = 0; j < n; j++) { const d = V(rnd(), rnd(), rnd()).normalize().multiplyScalar(speed * (0.3 + Math.random())); this.emit(p, d, color, size * (0.5 + Math.random()), life * (0.5 + Math.random() * 0.8), grav, 1.2); }
  }
  update(dt: number) {
    for (let i = 0; i < this.N; i++) {
      if (this.life[i] <= 0) { if (this.alpha[i]) { this.alpha[i] = 0; } continue; }
      this.life[i] -= dt;
      const k = i * 3, dr = Math.exp(-this.drag[i] * dt);
      this.vel[k] *= dr; this.vel[k + 1] = this.vel[k + 1] * dr + this.grav[i] * dt; this.vel[k + 2] *= dr;
      this.pos[k] += this.vel[k] * dt; this.pos[k + 1] += this.vel[k + 1] * dt; this.pos[k + 2] += this.vel[k + 2] * dt;
      const r = Math.max(0, this.life[i] / this.max[i]);
      this.alpha[i] = Math.min(1, r * 2.2); this.size[i] = this.s0[i] * (0.4 + r * 0.6);
    }
    for (const n of ['position', 'color', 'size', 'alpha']) (this.geo.attributes[n] as THREE.BufferAttribute).needsUpdate = true;
  }
}

/* ------------------------------------------------------------ hiệu ứng */
interface Effect { t: number; dur: number; obj: THREE.Object3D; mats: THREE.Material[]; tick: (k: number, dt: number, t: number) => void; done?: () => void }

export class FxSystem {
  scene: THREE.Scene;
  parts = new Particles();
  list: Effect[] = [];
  shake = 0;
  flash = 0;               // chớp sáng toàn màn hình (0..1)
  private lights: { l: THREE.PointLight; t: number; dur: number; i0: number }[] = [];
  private telegraphs: Effect[] = [];
  constructor(scene: THREE.Scene) {
    this.scene = scene; scene.add(this.parts.points);
    for (let i = 0; i < 6; i++) { const l = new THREE.PointLight(0xffffff, 0, 30, 1.6); scene.add(l); this.lights.push({ l, t: 1, dur: 1, i0: 0 }); }
  }
  private eff(dur: number, obj: THREE.Object3D, mats: THREE.Material[], tick: Effect['tick'], done?: () => void) {
    this.scene.add(obj); const e = { t: 0, dur, obj, mats, tick, done }; this.list.push(e); return e;
  }
  light(p: THREE.Vector3, color: number, intensity = 60, dur = 0.5) {
    const s = this.lights.reduce((a, b) => (a.t / a.dur > b.t / b.dur ? a : b));
    s.l.position.copy(p); s.l.color.setHex(color); s.l.intensity = intensity; s.i0 = intensity; s.t = 0; s.dur = dur;
  }
  update(dt: number, t: number) {
    this.parts.update(dt);
    this.shake = Math.max(0, this.shake - dt * 2.2); this.flash = Math.max(0, this.flash - dt * 2.5);
    for (const s of this.lights) { if (s.t >= s.dur) { s.l.intensity = 0; continue; } s.t += dt; s.l.intensity = s.i0 * Math.max(0, 1 - s.t / s.dur); }
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i]; e.t += dt;
      const k = Math.min(1, e.t / e.dur);
      e.tick(k, dt, t);
      if (k >= 1) { e.done?.(); e.obj.removeFromParent(); for (const m of e.mats) m.dispose(); this.list.splice(i, 1); }
    }
  }
  get count() { return this.list.length; }

  /* ---------------------------------------------------------- khối dựng */
  explode(p: THREE.Vector3, color: number, size = 2, opts: { ring?: boolean; shake?: number } = {}) {
    const c = new THREE.Color(color);
    const m1 = add(color, 0.9), m2 = add(0xffffff, 0.9);
    const g = new THREE.Group(); g.position.copy(p);
    const ball = new THREE.Mesh(GEO.sph, m1), core = new THREE.Mesh(GEO.sph, m2); g.add(ball, core);
    let ring: THREE.Mesh | null = null, m3: THREE.MeshBasicMaterial | null = null;
    if (opts.ring !== false) { m3 = add(color, 0.8); ring = new THREE.Mesh(GEO.ring, m3); ring.rotation.x = -Math.PI / 2; ring.position.y = -p.y + 0.1; g.add(ring); }
    this.parts.burst(p, c, Math.round(20 + size * 14), 6 + size * 3, 0.5 + size * 0.12, 0.9, -5);
    this.light(p, color, 40 + size * 25, 0.45);
    this.shake = Math.max(this.shake, opts.shake ?? size * 0.08);
    this.eff(0.7, g, [m1, m2, ...(m3 ? [m3] : [])], k => {
      const e = 1 - Math.pow(1 - k, 3);
      ball.scale.setScalar(size * (0.4 + e)); core.scale.setScalar(size * 0.5 * (1 - k));
      m1.opacity = 0.9 * (1 - k); m2.opacity = 1 - k;
      if (ring && m3) { ring.scale.setScalar(size * (0.5 + e * 2.4)); m3.opacity = 0.8 * (1 - k); }
    });
  }
  // vòng trận pháp trên mặt đất
  formation(p: THREE.Vector3, r: number, color: number, dur = 1.4, y = 0.08) {
    const m = new THREE.MeshBasicMaterial({ map: runeTex(), color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const disc = new THREE.Mesh(GEO.plane, m); disc.rotation.x = -Math.PI / 2; disc.position.set(p.x, y, p.z);
    this.eff(dur, disc, [m], (k, _dt, t) => { disc.scale.setScalar(r * 2 * Math.min(1, k * 4)); disc.rotation.z = t * 0.8; m.opacity = k < 0.8 ? 0.95 : (1 - k) * 4.75; });
  }
  private projectile(from: THREE.Vector3, to: THREE.Vector3, dur: number, obj: THREE.Object3D, mats: THREE.Material[], opts: { arc?: number; color: number; trail?: number; size?: number; spin?: boolean; impact?: number }) {
    const c = new THREE.Color(opts.color), mid = from.clone().lerp(to, 0.5); mid.y += opts.arc ?? 0;
    const curve = new THREE.QuadraticBezierCurve3(from.clone(), mid, to.clone());
    obj.position.copy(from);
    this.eff(dur, obj, mats, (k, _dt, t) => {
      const p = curve.getPoint(k), ahead = curve.getPoint(Math.min(1, k + 0.02));
      obj.position.copy(p); if (!ahead.equals(p)) obj.lookAt(ahead);
      if (opts.spin) obj.rotateZ(t * 20);
      for (let i = 0; i < (opts.trail ?? 2); i++) this.parts.emit(p, V(rnd(0.6), rnd(0.6), rnd(0.6)), c, opts.size ?? 0.5, 0.45, 0, 2);
    }, () => { if (opts.impact) this.explode(to, opts.color, opts.impact); });
  }
  private bolt(a: THREE.Vector3, b: THREE.Vector3, color: number, width = 0.12, dur = 0.35) {
    const pts: THREE.Vector3[] = [], n = 12, len = a.distanceTo(b);
    for (let i = 0; i <= n; i++) { const p = a.clone().lerp(b, i / n); if (i && i < n) p.add(V(rnd(len * 0.04), rnd(len * 0.04), rnd(len * 0.04))); pts.push(p); }
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1), 40, width, 5, false);
    const m = add(0xffffff, 1), m2 = add(color, 0.8);
    const g = new THREE.Group(); const core = new THREE.Mesh(geo, m), outer = new THREE.Mesh(geo, m2); outer.scale.setScalar(1); g.add(core, outer);
    // nhánh phụ
    for (let j = 0; j < 3; j++) { const s = pts[3 + j * 3], e = s.clone().add(V(rnd(len * 0.15), -Math.random() * len * 0.1, rnd(len * 0.15))); g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(s, e), 4, width * 0.5, 4), m2)); }
    this.eff(dur, g, [m, m2], k => { const f = Math.random() > 0.3 ? 1 : 0.3; m.opacity = (1 - k) * f; m2.opacity = 0.8 * (1 - k) * f; }, () => { geo.dispose(); g.children.forEach(c => (c as THREE.Mesh).geometry.dispose()); });
    this.light(b, color, 80, 0.25);
  }
  // rồng linh khí: chuỗi cầu sáng bay theo đường xoắn từ người tung chiêu tới mục tiêu
  private spiritDragon(from: THREE.Vector3, to: THREE.Vector3, color: number, scale: number, dur = 1.6) {
    const N = 42, m = add(color, 0.85), mh = add(0xffffff, 0.9);
    const inst = new THREE.InstancedMesh(GEO.sph, m, N); inst.frustumCulled = false;
    const head = new THREE.Mesh(GEO.sph, mh); const g = new THREE.Group(); g.add(inst, head);
    const c = new THREE.Color(color), dummy = new THREE.Object3D();
    const up = V(0, 9 * scale, 0), side = V(to.z - from.z, 0, from.x - to.x).normalize().multiplyScalar(5 * scale);
    const path = (u: number) => {
      const p = from.clone().lerp(to, u);
      p.add(up.clone().multiplyScalar(Math.sin(u * Math.PI) * 1.0)).add(side.clone().multiplyScalar(Math.sin(u * Math.PI * 2)));
      const coil = u > 0.75 ? (u - 0.75) * 4 : 0;
      p.x += Math.sin(u * 28) * coil * 2 * scale; p.z += Math.cos(u * 28) * coil * 2 * scale;
      return p;
    };
    this.eff(dur, g, [m, mh], k => {
      const hu = Math.min(1, k * 1.25);
      for (let i = 0; i < N; i++) {
        const u = Math.max(0, hu - i * 0.012);
        dummy.position.copy(path(u)); dummy.scale.setScalar(scale * (0.9 - i / N * 0.7) * (i === 0 ? 1.5 : 1)); dummy.updateMatrix(); inst.setMatrixAt(i, dummy.matrix);
        if (i % 6 === 0) this.parts.emit(dummy.position, V(rnd(0.5), rnd(0.5), rnd(0.5)), c, 0.7 * scale, 0.5, 0, 2);
      }
      inst.instanceMatrix.needsUpdate = true;
      head.position.copy(path(hu)); head.scale.setScalar(scale * 0.8);
      m.opacity = k > 0.85 ? (1 - k) * 5.6 : 0.85;
    }, () => this.explode(to, color, 2.5 * scale, { shake: 0.4 * scale }));
  }

  /* ---------------------------------------------------------- chiêu thức */
  cast(vfx: Vfx, from: THREE.Vector3, to: THREE.Vector3, color: number, r: number, big = false) {
    const S = big ? 1.6 : 1;
    const c = new THREE.Color(color);
    switch (vfx) {
      case 'qiwave': case 'slash': case 'claw': {
        const n = vfx === 'claw' ? 3 : vfx === 'slash' ? 2 : 1;
        for (let j = 0; j < n; j++) {
          const m = add(color, 0.95), arc = new THREE.Mesh(GEO.arc, m); arc.scale.setScalar(vfx === 'qiwave' ? 1.1 * S : 1.6 * S);
          const g = new THREE.Group(); g.add(arc); arc.rotation.set(Math.PI / 2, 0, vfx === 'claw' ? -0.6 + j * 0.15 : rnd(0.8));
          if (vfx === 'qiwave') this.projectile(from, to, 0.42, g, [m], { color, trail: 3, impact: 0.8 * S });
          else {
            g.position.copy(to).add(V((j - 1) * 0.5, 0.2, 0)); g.lookAt(from);
            this.eff(0.4, g, [m], k => { arc.scale.setScalar((1 + k * 1.5) * 1.6 * S); m.opacity = 1 - k; });
            this.parts.burst(to, c, 18, 6, 0.4, 0.5, -3);
          }
        }
        break;
      }
      case 'flysword': {
        for (let j = 0; j < (big ? 5 : 1); j++) {
          const m = add(color, 1), s = new THREE.Mesh(GEO.sword, m); s.scale.setScalar(1.1 * S);
          const g = new THREE.Group(); g.add(s);
          const f = from.clone().add(V(rnd(1.5), 2 + j * 0.5, rnd(1.5)));
          this.projectile(f, to, 0.55 + j * 0.08, g, [m], { arc: 6, color, trail: 3, impact: 1.1 * S });
        }
        break;
      }
      case 'swordrain': {
        const N = big ? 90 : 50, m = add(color, 1), inst = new THREE.InstancedMesh(GEO.sword, m, N); inst.frustumCulled = false;
        const R = Math.max(4, r), d = new THREE.Object3D();
        const drops = Array.from({ length: N }, () => ({ x: to.x + rnd(R), z: to.z + rnd(R), delay: Math.random() * 0.9, hit: false }));
        this.formation(to, R, color, 2.2);
        this.eff(2.0, inst, [m], k => {
          const t = k * 2.0;
          drops.forEach((dp, i) => {
            const u = Math.max(0, Math.min(1, (t - dp.delay) / 0.45));
            d.position.set(dp.x, 26 - u * 26, dp.z); d.rotation.set(Math.PI, 0, 0); d.scale.setScalar(u > 0 && u < 1 ? 1.3 : 0.001); d.updateMatrix(); inst.setMatrixAt(i, d.matrix);
            if (u >= 1 && !dp.hit) { dp.hit = true; this.parts.burst(V(dp.x, 0.3, dp.z), c, 6, 5, 0.4, 0.4, -6); }
          });
          inst.instanceMatrix.needsUpdate = true;
        }, () => this.explode(to, color, 3 * S, { shake: 0.5 }));
        this.shake = Math.max(this.shake, 0.3);
        break;
      }
      case 'swordarray': {
        const N = 12, m = add(color, 1), inst = new THREE.InstancedMesh(GEO.sword, m, N); inst.frustumCulled = false; const d = new THREE.Object3D();
        const R = Math.max(3, r);
        this.formation(to, R, color, 1.8);
        this.eff(1.6, inst, [m], (k, _dt, t) => {
          for (let i = 0; i < N; i++) {
            const a = i / N * Math.PI * 2 + t * 2, dive = Math.max(0, (k - 0.6) / 0.4), rr = R * (1 - dive);
            d.position.set(to.x + Math.sin(a) * rr, 6 - dive * 5.6, to.z + Math.cos(a) * rr);
            d.lookAt(to.x, 0, to.z); d.scale.setScalar(1.2 * S); d.updateMatrix(); inst.setMatrixAt(i, d.matrix);
          }
          inst.instanceMatrix.needsUpdate = true;
        }, () => this.explode(to, color, 2.6 * S));
        break;
      }
      case 'bolt': this.bolt(from, to, color, 0.08 * S); this.parts.burst(to, c, 14, 7, 0.4, 0.4); break;
      case 'thunder': {
        const R = Math.max(2, r), n = big ? 9 : 4;
        this.formation(to, R, color, 1.6);
        if (big) this.cloud(to, R * 1.3, 0x1a1030, 1.8);
        for (let i = 0; i < n; i++) setTimeout(() => {
          const p = to.clone().add(V(rnd(R * 0.8), 0, rnd(R * 0.8))); p.y = 0.2;
          this.bolt(p.clone().add(V(rnd(2), 34, rnd(2))), p, color, 0.18 * S, 0.3);
          this.explode(p, color, 1.4 * S, { shake: 0.25 });
        }, i * 140);
        this.flash = Math.max(this.flash, big ? 0.6 : 0.25);
        break;
      }
      case 'fireball': case 'icearrow': {
        const m = add(color, 1), core = add(0xffffff, 1);
        const g = new THREE.Group();
        if (vfx === 'fireball') { const b = new THREE.Mesh(GEO.sph, m); b.scale.setScalar(0.45 * S); const cc = new THREE.Mesh(GEO.sph, core); cc.scale.setScalar(0.25 * S); g.add(b, cc); }
        else { const b = new THREE.Mesh(GEO.cone, m); b.scale.set(0.15 * S, 1.2 * S, 0.15 * S); b.rotation.x = Math.PI / 2; g.add(b); }
        this.projectile(from, to, 0.5, g, [m, core], { arc: vfx === 'fireball' ? 2 : 0.5, color, trail: 4, size: 0.7, impact: 1.3 * S });
        break;
      }
      case 'meteor': {
        const m = add(color, 1), core = add(0xfff3b0, 1), g = new THREE.Group();
        const b = new THREE.Mesh(GEO.sph, m), cc = new THREE.Mesh(GEO.sph, core); b.scale.setScalar(2.2 * S); cc.scale.setScalar(1.4 * S); g.add(b, cc);
        this.formation(to, Math.max(4, r), color, 1.4);
        this.projectile(to.clone().add(V(-14, 36, -8)), to, 1.1, g, [m, core], { color, trail: 10, size: 1.6, impact: 5 * S });
        setTimeout(() => { this.flash = Math.max(this.flash, 0.5); this.shake = 1; }, 1100);
        break;
      }
      case 'flamepillar': case 'holybeam': {
        const m = add(color, 0.8), m2 = add(0xffffff, 0.7), g = new THREE.Group(); g.position.set(to.x, 0, to.z);
        const outer = new THREE.Mesh(GEO.cyl, m), inner = new THREE.Mesh(GEO.cyl, m2); g.add(outer, inner);
        const R = Math.max(1.2, r * 0.5) * S;
        this.formation(to, R * 1.6, color, 1.4);
        this.eff(1.3, g, [m, m2], (k, _dt, t) => {
          const h = 20 * Math.min(1, k * 3), w = k < 0.8 ? 1 : (1 - k) * 5;
          outer.scale.set(R * w, h, R * w); outer.position.y = h / 2; inner.scale.set(R * 0.45 * w, h, R * 0.45 * w); inner.position.y = h / 2;
          outer.rotation.y = t * 4;
          for (let i = 0; i < 4; i++) this.parts.emit(V(to.x + rnd(R), Math.random() * h, to.z + rnd(R)), V(0, 6, 0), c, 0.8, 0.6, 2, 0.5);
        });
        this.light(V(to.x, 3, to.z), color, 120, 1.2);
        break;
      }
      case 'icefield': case 'quake': case 'rockfall': {
        const R = Math.max(3, r) * (big ? 1.3 : 1), n = vfx === 'icefield' ? 22 : 16;
        const mat = vfx === 'icefield' ? new THREE.MeshStandardMaterial({ color: 0xbff4ff, emissive: color, emissiveIntensity: 0.6, roughness: 0.1, metalness: 0.1, transparent: true, opacity: 0.9 })
          : new THREE.MeshStandardMaterial({ color: 0x5a4632, emissive: vfx === 'quake' ? color : 0x220800, emissiveIntensity: 0.4, roughness: 0.9 });
        const g = new THREE.Group();
        const items = Array.from({ length: n }, () => { const mm = new THREE.Mesh(vfx === 'icefield' ? GEO.cone : GEO.box, mat); const a = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.random()) * R; mm.position.set(to.x + Math.sin(a) * rr, 0, to.z + Math.cos(a) * rr); mm.rotation.set(rnd(0.3), Math.random() * 3, rnd(0.3)); g.add(mm); return { mm, s: 0.6 + Math.random() * 1.2, d: Math.random() * 0.35 }; });
        this.formation(to, R, color, 1.6);
        if (vfx !== 'rockfall') this.explode(V(to.x, 0.2, to.z), color, R * 0.4, { shake: 0.5 });
        this.eff(1.6, g, [mat], k => {
          const t = k * 1.6;
          for (const it of items) {
            const u = Math.max(0, Math.min(1, (t - it.d) / 0.25));
            if (vfx === 'rockfall') { it.mm.position.y = Math.max(it.s * 0.5, 22 * (1 - u)); it.mm.scale.setScalar(it.s * (u > 0 ? 1 : 0.001)); }
            else { const out = k > 0.75 ? 1 - (k - 0.75) * 4 : 1; it.mm.scale.set(it.s * 0.5 * out + 0.001, it.s * 2.2 * u * out + 0.001, it.s * 0.5 * out + 0.001); it.mm.position.y = it.mm.scale.y / 2; }
          }
          if (vfx === 'icefield' && k > 0.75) mat.opacity = (1 - k) * 3.6;
        }, () => this.parts.burst(V(to.x, 1, to.z), c, 40, 8, 0.5, 0.8, -8));
        break;
      }
      case 'tornado': case 'leafstorm': {
        const R = Math.max(2, r) * S, m = add(color, 0.35), g = new THREE.Group(); g.position.set(to.x, 0, to.z);
        const funnel = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 0.25, 10, 28, 6, true), m); funnel.position.y = 5;
        if (vfx === 'tornado') g.add(funnel);
        this.eff(2.0, g, [m], (k, dt, t) => {
          funnel.rotation.y = t * 9; m.opacity = 0.35 * Math.sin(k * Math.PI);
          for (let i = 0; i < 8; i++) { const a = t * 8 + i * 0.8, h = Math.random() * 9, rr = R * (0.3 + h / 12); this.parts.emit(V(to.x + Math.sin(a) * rr, h, to.z + Math.cos(a) * rr), V(Math.cos(a) * 6, 2, -Math.sin(a) * 6), vfx === 'leafstorm' && i % 2 ? new THREE.Color(0xff9ad5) : c, 0.45, 0.6, 0, 1); }
          void dt;
        });
        break;
      }
      case 'roar': {
        for (let j = 0; j < 4; j++) {
          const m = add(color, 0.7), ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.1, 6, 40), m), g = new THREE.Group(); g.add(ring);
          g.position.copy(from); g.lookAt(to);
          setTimeout(() => this.eff(0.6, g, [m], k => { ring.scale.setScalar(1 + k * 6 * S); ring.position.z = k * from.distanceTo(to); m.opacity = 0.7 * (1 - k); }, () => ring.geometry.dispose()), j * 90);
        }
        this.shake = Math.max(this.shake, 0.25);
        break;
      }
      case 'demonpalm': {
        const m = add(color, 0.8), g = new THREE.Group(), palm = new THREE.Group(); g.add(palm);
        const pm = new THREE.Mesh(GEO.box, m); pm.scale.set(1.6, 1.8, 0.4); palm.add(pm);
        for (let f = 0; f < 5; f++) { const fg = new THREE.Mesh(GEO.box, m); fg.scale.set(0.3, f === 0 ? 1.0 : 1.4, 0.3); fg.position.set(f === 0 ? -1.0 : -0.6 + (f - 1) * 0.4, f === 0 ? 0.2 : 1.6, 0); fg.rotation.z = f === 0 ? 0.6 : 0; palm.add(fg); }
        palm.scale.setScalar(1.3 * S); palm.rotation.x = -Math.PI / 2;
        this.projectile(from.clone().add(V(0, 3, 0)), to, 0.7, g, [m], { arc: 3, color, trail: 6, size: 1, impact: 2.4 * S });
        break;
      }
      case 'darkbeam': case 'bloodwave': {
        if (vfx === 'bloodwave') { this.spiritDragon(from, to, color, 0.9 * S); break; }
        const m = add(color, 0.9), m2 = add(0xffffff, 0.8), g = new THREE.Group();
        const beam = new THREE.Mesh(GEO.cyl, m), core = new THREE.Mesh(GEO.cyl, m2); g.add(beam, core);
        const len = from.distanceTo(to); g.position.copy(from).lerp(to, 0.5); g.lookAt(to); g.rotateX(Math.PI / 2);
        this.eff(1.0, g, [m, m2], (k, _dt, t) => {
          const w = (k < 0.15 ? k / 0.15 : k > 0.8 ? (1 - k) * 5 : 1) * (0.9 + Math.sin(t * 40) * 0.1) * S;
          beam.scale.set(w * 0.9, len, w * 0.9); core.scale.set(w * 0.35, len, w * 0.35);
          this.parts.emit(from.clone().lerp(to, Math.random()), V(rnd(2), rnd(2), rnd(2)), c, 0.8, 0.4, 0, 1);
        }, () => this.explode(to, color, 2.2 * S));
        this.light(to, color, 100, 1);
        break;
      }
      case 'firedragon': case 'icedragon': case 'lightdragon': case 'dragon': this.spiritDragon(from, to, color, (vfx === 'dragon' ? 1.4 : 1) * S, vfx === 'dragon' ? 2 : 1.6); break;
      case 'lotus': case 'heal': {
        const m = add(color, 0.8), g = new THREE.Group(); g.position.set(to.x, 0.1, to.z);
        const ring = new THREE.Mesh(GEO.ring, m); ring.rotation.x = -Math.PI / 2; g.add(ring);
        if (vfx === 'lotus') for (let i = 0; i < 12; i++) { const p = new THREE.Mesh(GEO.sph, m); p.scale.set(0.5, 0.12, 1.4); const a = i / 12 * Math.PI * 2; p.position.set(Math.sin(a) * 1.2, 0.3, Math.cos(a) * 1.2); p.rotation.set(-0.6, a, 0); g.add(p); }
        const R = Math.max(2, r);
        this.eff(1.4, g, [m], k => {
          g.scale.setScalar(R * Math.min(1, k * 3) * 0.6); m.opacity = 0.8 * (1 - k);
          for (let i = 0; i < 3; i++) this.parts.emit(V(to.x + rnd(R), 0.2, to.z + rnd(R)), V(0, 3 + Math.random() * 3, 0), vfx === 'heal' ? new THREE.Color(0x6dff9a) : c, 0.5, 0.9, 0, 0.5);
        });
        break;
      }
      case 'shield': {
        const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false });
        const b = new THREE.Mesh(GEO.sph, m); b.position.set(to.x, 1.1, to.z);
        this.eff(1.6, b, [m], (k, _dt, t) => { b.scale.setScalar(Math.max(1.6, r * 0.5) * Math.min(1, k * 5)); m.opacity = 0.28 * (1 - k) + Math.sin(t * 10) * 0.04; });
        break;
      }
      case 'phoenix': {
        const body = add(color, 1), wing = add(0xffd04a, 0.85), g = new THREE.Group(), bird = new THREE.Group(); g.add(bird);
        const b = new THREE.Mesh(GEO.sph, body); b.scale.set(0.7, 0.6, 1.6); bird.add(b);
        const wl = new THREE.Group(), wr = new THREE.Group();
        for (const [w, s] of [[wl, 1], [wr, -1]] as const) { for (let f = 0; f < 5; f++) { const fe = new THREE.Mesh(GEO.box, wing); fe.scale.set(2.6 - f * 0.25, 0.06, 0.5); fe.position.set(s * (1.4 + f * 0.1), 0, -f * 0.45); fe.rotation.y = s * f * 0.12; w.add(fe); } bird.add(w); }
        for (let f = 0; f < 5; f++) { const tl = new THREE.Mesh(GEO.box, wing); tl.scale.set(0.25, 0.05, 3); tl.position.set((f - 2) * 0.3, 0, -2.4); tl.rotation.y = (f - 2) * 0.15; bird.add(tl); }
        bird.scale.setScalar(1.5 * S);
        this.projectile(to.clone().add(V(-18, 18, -10)), to, 1.6, g, [body, wing], { arc: 8, color, trail: 10, size: 1.2, impact: 4 * S });
        this.eff(1.6, new THREE.Group(), [], (_k, _dt, t) => { const fl = Math.sin(t * 14) * 0.6; wl.rotation.z = fl; wr.rotation.z = -fl; });
        break;
      }
    }
  }
  // mây đen thiên kiếp
  cloud(p: THREE.Vector3, r: number, color: number, dur: number) {
    const m = new THREE.SpriteMaterial({ map: smokeTex(), color, transparent: true, depthWrite: false, opacity: 0 });
    const g = new THREE.Group(); g.position.set(p.x, 18, p.z);
    for (let i = 0; i < 14; i++) { const s = new THREE.Sprite(m); const a = i * 2.4, rr = Math.sqrt(i / 14) * r; s.position.set(Math.sin(a) * rr, rnd(1), Math.cos(a) * rr); s.scale.setScalar(r * 0.9); g.add(s); }
    this.eff(dur, g, [m], (k, _dt, t) => { m.opacity = Math.sin(k * Math.PI) * 0.85; g.rotation.y = t * 0.2; });
  }
  // đột phá cảnh giới: linh khí hội tụ, trận pháp, sét thiên kiếp, cột sáng
  breakthrough(p: THREE.Vector3, color: number, realm: boolean) {
    const c = new THREE.Color(color);
    this.formation(V(p.x, 0, p.z), realm ? 5 : 2.4, color, realm ? 3 : 1.6);
    const n = realm ? 160 : 60;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, r = 4 + Math.random() * 6, from = V(p.x + Math.sin(a) * r, 0.5 + Math.random() * 5, p.z + Math.cos(a) * r);
      const v = V(p.x, 1.3, p.z).sub(from).multiplyScalar(1.4);
      this.parts.emit(from, v, c, 0.45, 0.7, 0, 0);
    }
    if (!realm) { setTimeout(() => this.explode(V(p.x, 1.2, p.z), color, 1.4, { shake: 0.1 }), 600); return; }
    this.cloud(p, 6, 0x140c26, 3);
    for (let i = 0; i < 6; i++) setTimeout(() => { const g = V(p.x + rnd(0.3), 0.5, p.z + rnd(0.3)); this.bolt(g.clone().add(V(rnd(3), 30, rnd(3))), g, 0xb48cff, 0.2, 0.3); this.shake = Math.max(this.shake, 0.35); this.flash = Math.max(this.flash, 0.35); }, 500 + i * 320);
    setTimeout(() => { this.cast('holybeam', p, p, color, 3, true); this.explode(V(p.x, 1.2, p.z), color, 3.5, { shake: 0.6 }); }, 2500);
  }
  // vùng cảnh báo đòn Boss: vòng đỏ lấp dần
  telegraph(p: THREE.Vector3, r: number, dur: number, color = 0xff2a2a) {
    const m1 = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.25, depthWrite: false, side: THREE.DoubleSide });
    const m2 = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide });
    const g = new THREE.Group(); g.position.set(p.x, 0.12, p.z); g.rotation.x = -Math.PI / 2;
    const fill = new THREE.Mesh(GEO.disc, m1), edge = new THREE.Mesh(GEO.ring, m2); edge.scale.setScalar(r); g.add(fill, edge);
    this.eff(dur, g, [m1, m2], k => { fill.scale.setScalar(Math.max(0.01, r * k)); m2.opacity = 0.5 + Math.sin(k * 30) * 0.35; });
  }
}
