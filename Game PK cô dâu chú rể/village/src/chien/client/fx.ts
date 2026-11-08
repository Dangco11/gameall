import * as THREE from 'three';

// Hiệu ứng dùng pool cố định: hạt sáng, bụi khói, vòng sóng xung kích, cột sáng triệu hồi, mũi tên bay.
// Mảng được cấp sẵn một lần; hết chỗ thì hiệu ứng mới ghi đè hiệu ứng cũ nhất, không tạo đối tượng mới mỗi khung hình.
const _m = new THREE.Matrix4(), _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _c = new THREE.Color(), _e = new THREE.Euler();

class Particles {
  readonly mesh: THREE.InstancedMesh;
  private x: Float32Array; private y: Float32Array; private z: Float32Array; private vx: Float32Array; private vy: Float32Array; private vz: Float32Array;
  private age: Float32Array; private life: Float32Array; private size: Float32Array; private grav: Float32Array; private grow: Float32Array; private col: Uint32Array;
  private next = 0; readonly cap: number;
  constructor(geo: THREE.BufferGeometry, mat: THREE.Material, cap: number){
    this.cap = cap;
    this.mesh = new THREE.InstancedMesh(geo, mat, cap); this.mesh.frustumCulled = false; this.mesh.count = 0;
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.mesh.setColorAt(0, _c.set(1, 1, 1));
    const f = () => new Float32Array(cap);
    this.x = f(); this.y = f(); this.z = f(); this.vx = f(); this.vy = f(); this.vz = f(); this.age = f(); this.life = f(); this.size = f(); this.grav = f(); this.grow = f(); this.col = new Uint32Array(cap);
  }
  add(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, size: number, color: number, grav = 9, grow = 0){
    const i = this.next; this.next = (this.next + 1) % this.cap;
    this.x[i] = x; this.y[i] = y; this.z[i] = z; this.vx[i] = vx; this.vy[i] = vy; this.vz[i] = vz;
    this.age[i] = 0; this.life[i] = life; this.size[i] = size; this.col[i] = color; this.grav[i] = grav; this.grow[i] = grow;
  }
  update(dt: number, fadeByColor: boolean){
    let n = 0;
    for (let i = 0; i < this.cap; i++){
      if (this.life[i] <= 0) continue;
      this.age[i] += dt;
      if (this.age[i] >= this.life[i]){ this.life[i] = 0; continue; }
      this.vy[i] -= this.grav[i] * dt;
      this.x[i] += this.vx[i] * dt; this.y[i] += this.vy[i] * dt; this.z[i] += this.vz[i] * dt;
      if (this.y[i] < 0.02){ this.y[i] = 0.02; this.vy[i] *= -0.25; this.vx[i] *= 0.7; this.vz[i] *= 0.7; }
      const k = 1 - this.age[i] / this.life[i];
      const s = this.size[i] * (fadeByColor ? 1 + this.grow[i] * (1 - k) : (1 + this.grow[i] * (1 - k)) * Math.min(1, k * 2.2));
      this.mesh.setMatrixAt(n, _m.compose(_p.set(this.x[i], this.y[i], this.z[i]), _q.identity(), _s.setScalar(s)));
      _c.setHex(this.col[i]); if (fadeByColor) _c.multiplyScalar(k);   // cộng sáng: tối dần là mờ dần
      this.mesh.setColorAt(n++, _c);
    }
    this.mesh.count = n; this.mesh.instanceMatrix.needsUpdate = true; if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }
}

// Bụi, khói: hạt mềm tròn mờ (luôn quay mặt về camera), nở to và trong dần theo tuổi
class SoftParticles {
  readonly points: THREE.Points;
  private pos: Float32Array; private col: Float32Array; private size: Float32Array; private alpha: Float32Array;
  private vel: Float32Array; private age: Float32Array; private life: Float32Array; private base: Float32Array; private grow: Float32Array; private grav: Float32Array;
  private next = 0; readonly cap: number;
  constructor(cap: number){
    this.cap = cap;
    const f = (n: number) => new Float32Array(cap * n);
    this.pos = f(3); this.col = f(3); this.size = f(1); this.alpha = f(1); this.vel = f(3); this.age = f(1); this.life = f(1); this.base = f(1); this.grow = f(1); this.grav = f(1);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(this.col, 3));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1)); g.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, fog: true,
      uniforms: { ...THREE.UniformsLib.fog, uScale: { value: 600 } },
      vertexShader: `attribute float size; attribute float alpha; attribute vec3 color; varying vec3 vC; varying float vA;
        #include <fog_pars_vertex>
        uniform float uScale;
        void main(){ vC = color; vA = alpha; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * uScale / -mvPosition.z; gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
        }`,
      fragmentShader: `varying vec3 vC; varying float vA;
        #include <fog_pars_fragment>
        void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d) * 4.0; if (r > 1.0) discard; gl_FragColor = vec4(vC, vA * (1.0 - r) * (1.0 - r));
        #include <fog_fragment>
        }`,
    });
    this.points = new THREE.Points(g, m); this.points.frustumCulled = false;
  }
  add(x: number, y: number, z: number, vx: number, vy: number, vz: number, life: number, size: number, color: number, grav = 0.5, grow = 1.5){
    const i = this.next; this.next = (this.next + 1) % this.cap;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z; this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    _c.setHex(color); this.col[i * 3] = _c.r; this.col[i * 3 + 1] = _c.g; this.col[i * 3 + 2] = _c.b;
    this.age[i] = 0; this.life[i] = life; this.base[i] = size; this.grow[i] = grow; this.grav[i] = grav;
  }
  update(dt: number){
    for (let i = 0; i < this.cap; i++){
      if (this.life[i] <= 0){ this.alpha[i] = 0; continue; }
      this.age[i] += dt;
      if (this.age[i] >= this.life[i]){ this.life[i] = 0; this.alpha[i] = 0; continue; }
      const k = this.age[i] / this.life[i], drag = Math.exp(-2.5 * dt);
      this.vel[i * 3] *= drag; this.vel[i * 3 + 2] *= drag; this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * drag - this.grav[i] * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt; this.pos[i * 3 + 1] = Math.max(0.05, this.pos[i * 3 + 1] + this.vel[i * 3 + 1] * dt); this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      this.size[i] = this.base[i] * (1 + this.grow[i] * k);
      this.alpha[i] = Math.min(1, k * 6) * (1 - k) * 0.75;
    }
    const g = this.points.geometry;
    for (const n of ['position', 'size', 'alpha', 'color']) (g.attributes[n] as THREE.BufferAttribute).needsUpdate = true;
  }
}

interface Ring { x: number; z: number; r: number; age: number; life: number; color: number; y: number }
interface Arrow { x0: number; z0: number; x1: number; z1: number; get: (() => { x: number; z: number } | null) | null; t: number; dur: number; color: number }
interface Pillar { x: number; z: number; age: number; life: number; color: number; big: boolean }
interface Slash { x: number; y: number; z: number; yaw: number; age: number; life: number; color: number; s: number; flip: boolean }

export class Fx {
  readonly group = new THREE.Group();
  private sparks = new Particles(new THREE.OctahedronGeometry(0.1, 0), new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }), 1600);
  private dust = new SoftParticles(900);
  private ringMesh = new THREE.InstancedMesh(new THREE.RingGeometry(0.85, 1, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }), 48);
  private arrowMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.05, 0.6), new THREE.MeshBasicMaterial({ toneMapped: false }), 200);
  private pillarMesh = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.6, 0.9, 1, 20, 1, true).translate(0, 0.5, 0), new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }), 40);
  // vệt chém: cung trăng mỏng quét ngang trước mặt người ra đòn
  private slashMesh = new THREE.InstancedMesh(new THREE.RingGeometry(0.62, 0.95, 24, 1, -1.1, 2.2).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }), 64);
  private rings: Ring[] = []; private arrows: Arrow[] = []; private pillars: Pillar[] = []; private slashes: Slash[] = [];
  /** mũi tên chạm đất / trúng đích (main.ts gán để phát tiếng cắm) */
  onArrowLand: ((x: number, z: number) => void) | null = null;
  budget = 1;
  // quy đổi cỡ hạt mềm (mét) ra điểm ảnh theo chiều cao màn hình và góc nhìn camera
  setViewport(heightPx: number, fovDeg: number){ (this.dust.points.material as THREE.ShaderMaterial).uniforms.uScale.value = heightPx / (2 * Math.tan(fovDeg * Math.PI / 360)); }                                                     // máy yếu (fps thấp) thì giảm số hạt mỗi hiệu ứng

  constructor(){
    for (const m of [this.ringMesh, this.arrowMesh, this.pillarMesh, this.slashMesh]){ m.frustumCulled = false; m.count = 0; m.instanceMatrix.setUsage(THREE.DynamicDrawUsage); m.setColorAt(0, _c.set(1, 1, 1)); }
    this.group.add(this.sparks.mesh, this.dust.points, this.ringMesh, this.arrowMesh, this.pillarMesh, this.slashMesh);
  }
  private n(k: number){ return Math.max(1, Math.round(k * this.budget)); }

  burst(x: number, y: number, z: number, cols: number[], n: number, speed: number, life = 0.7, size = 1){
    for (let i = 0; i < this.n(n); i++){
      _p.randomDirection().multiplyScalar(speed * (0.4 + Math.random() * 0.6));
      this.sparks.add(x, y, z, _p.x, Math.abs(_p.y) * 1.2 + speed * 0.3, _p.z, life * (0.6 + Math.random() * 0.6), size, cols[i % cols.length]);
    }
  }
  puff(x: number, z: number, n: number, color = 0xb9a58c, spread = 0.6, up = 1.2, size = 1){
    for (let i = 0; i < this.n(n); i++){
      const a = Math.random() * Math.PI * 2, r = Math.random() * spread;
      this.dust.add(x + Math.cos(a) * r, 0.15 + Math.random() * 0.3, z + Math.sin(a) * r, Math.cos(a) * 1.2, up * (0.4 + Math.random()), Math.sin(a) * 1.2, 0.9 + Math.random() * 0.6, size * (1.1 + Math.random() * 0.8), color, 0.6, 1.6);
    }
  }
  smoke(x: number, y: number, z: number, color = 0x3a3634){ this.dust.add(x + (Math.random() - 0.5) * 0.8, y, z + (Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 0.4, 1.4 + Math.random(), (Math.random() - 0.5) * 0.4, 2.6, 1.6, color, -0.25, 2.6); }
  fire(x: number, y: number, z: number){ this.sparks.add(x + (Math.random() - 0.5) * 1.6, y, z + (Math.random() - 0.5) * 1.2, (Math.random() - 0.5) * 0.6, 2 + Math.random() * 1.5, (Math.random() - 0.5) * 0.6, 0.7, 2.2, Math.random() < 0.5 ? 0xff7a1a : 0xffc23a, -1, -0.5); }
  ring(x: number, z: number, r: number, color: number, life = 0.6, y = 0.08){ if (this.rings.length > 40) this.rings.shift(); this.rings.push({ x, z, r, age: 0, life, color, y }); }
  pillar(x: number, z: number, color: number, big = false){ if (this.pillars.length > 36) this.pillars.shift(); this.pillars.push({ x, z, age: 0, life: big ? 1.6 : 0.9, color, big }); }
  arrow(x0: number, z0: number, x1: number, z1: number, ms: number, get: Arrow['get'], color = 0x6e4428){ if (this.arrows.length >= 200) this.arrows.shift(); this.arrows.push({ x0, z0, x1, z1, get, t: 0, dur: Math.max(0.08, ms / 1000), color }); }
  trail(x: number, z: number, color: number){ this.dust.add(x + (Math.random() - 0.5) * 0.6, 0.1, z + (Math.random() - 0.5) * 0.6, (Math.random() - 0.5), 0.5 + Math.random(), (Math.random() - 0.5), 0.8, 0.9, color, 0.3, 1.6); }

  // Hiệu ứng ghép sẵn
  spawn(x: number, z: number, team: number, tier: number){
    const big = tier >= 5;
    this.pillar(x, z, team, big);
    this.puff(x, z, big ? 26 : 6 + tier, 0xe8e0d0, big ? 1.8 : 0.6, 1.3, big ? 1.6 : 0.8);
    this.burst(x, 1, z, [team, 0xffffff, 0xffe08a], big ? 70 : 8 + tier * 3, big ? 6 : 3, 0.8, big ? 1.6 : 1);
    if (tier >= 3) this.ring(x, z, big ? 4 : 1.6, team, 0.7);
  }
  impact(x: number, z: number, big: boolean, crit: boolean, block: boolean){
    const cols = block ? [0xffffff, 0xbfe4ff] : crit ? [0xffe14a, 0xff7a1a, 0xffffff] : [0xffd9a0, 0xffffff];
    this.burst(x, 0.9, z, cols, big ? 16 : crit ? 10 : 4, big ? 5 : 3, 0.45, big ? 1.4 : 0.9);
    // chớp sáng ngắn ngay điểm trúng: nhìn rõ "đòn ăn"
    this.sparks.add(x, 1, z, 0, 0, 0, 0.09, big ? 4.5 : crit ? 3.4 : 2.2, block ? 0xbfe4ff : crit ? 0xffd060 : 0xfff4dc, 0);
    if (block) this.ring(x, z, 0.9, 0xbfe4ff, 0.25, 1);
  }
  slash(x: number, z: number, yaw: number, color: number, big: boolean){
    if (this.slashes.length >= 64) this.slashes.shift();
    this.slashes.push({ x: x + Math.sin(yaw) * 0.35, y: big ? 1.25 : 1.05, z: z + Math.cos(yaw) * 0.35, yaw, age: 0, life: big ? 0.24 : 0.17, color, s: big ? 1.5 : 1, flip: Math.random() < 0.5 });
  }
  // cung bắn: chớp nhỏ ở đầu cung, cả loạt thì thêm vòng sáng
  muzzle(x: number, z: number, yaw: number, volley: boolean, team: number){
    const fx = x + Math.sin(yaw) * 0.5, fz = z + Math.cos(yaw) * 0.5;
    this.sparks.add(fx, 1.2, fz, Math.sin(yaw) * 2, 0.4, Math.cos(yaw) * 2, 0.12, 1.2, 0xfff0c0, 0);
    if (volley){ this.ring(x, z, 1.4, team, 0.4, 0.1); this.burst(fx, 1.3, fz, [0xfff0c0, team], 6, 2, 0.35, 0.7); }
  }
  // trâu húc: rung đất, bụi văng hình nón về phía trước, đá vụn
  charge(x: number, z: number, yaw: number, team: number){
    this.ring(x, z, 2.2, team, 0.5); this.ring(x, z, 1.3, 0xffffff, 0.35);
    this.puff(x - Math.sin(yaw) * 0.8, z - Math.cos(yaw) * 0.8, 16, 0xb39d7a, 1, 1.4, 1.4);
    for (let i = 0; i < this.n(4); i++) this.dust.add(x + Math.sin(yaw) * 1.4, 0.9, z + Math.cos(yaw) * 1.4, Math.sin(yaw) * 1.5 + (Math.random() - 0.5), 0.6, Math.cos(yaw) * 1.5 + (Math.random() - 0.5), 0.6, 0.6, 0xf2efe8, 0.2, 1.5);   // hơi phì từ mũi
  }
  gore(x: number, z: number, yaw: number){
    this.ring(x, z, 1.8, 0xffd27a, 0.45); this.sparks.add(x, 1, z, 0, 0, 0, 0.12, 5, 0xfff0c8, 0);
    this.burst(x, 0.9, z, [0xffe0a0, 0xffffff, 0xb39d7a], 18, 6, 0.5, 1.1);
    for (let i = 0; i < this.n(14); i++){ const a = yaw + (Math.random() - 0.5) * 1.6, v = 3 + Math.random() * 5; this.dust.add(x, 0.3, z, Math.sin(a) * v, 1.5 + Math.random() * 2, Math.cos(a) * v, 0.8, 1.1, 0xa8946f, 0.5, 1.8); }
  }
  // bước chân voi: vòng bụi nhỏ dưới chân
  footstep(x: number, z: number, heavy: boolean){ this.puff(x, z, heavy ? 8 : 4, 0xa8946f, heavy ? 1.1 : 0.6, 0.6, heavy ? 1.3 : 0.9); if (heavy) this.ring(x, z, 1.6, 0xd8c39a, 0.4, 0.06); }
  stomp(x: number, z: number, r: number){
    this.ring(x, z, r, 0xffd27a, 0.7); this.ring(x, z, r * 0.6, 0xffffff, 0.45);
    this.puff(x, z, 34, 0xa8946f, r * 0.8, 1.8, 1.5);
    for (let i = 0; i < this.n(18); i++){ const a = i / 18 * Math.PI * 2; this.dust.add(x + Math.cos(a) * r * 0.5, 0.2, z + Math.sin(a) * r * 0.5, Math.cos(a) * 7, 1.2, Math.sin(a) * 7, 0.9, 1.4, 0xb8a27e, 0.2, 2); }
  }
  roar(x: number, z: number, r: number, team: number){ this.ring(x, z, r, team, 1.0, 1.2); this.ring(x, z, r * 0.7, 0xffffff, 0.8, 2.2); this.ring(x, z, r * 0.4, team, 0.6, 3.2); }
  death(x: number, z: number, big: boolean){ this.puff(x, z, big ? 30 : 5, 0x9a8f80, big ? 1.8 : 0.4, 1, big ? 1.6 : 0.7); if (big) this.burst(x, 1.5, z, [0xffffff, 0xffd34d], 40, 5); }
  explosion(x: number, y: number, z: number){
    this.puff(x, z, 60, 0x6a5a4a, 3, 2.5, 2.2); this.burst(x, y, z, [0xff7a1a, 0xffc23a, 0xffffff], 120, 9, 1.2, 1.6); this.ring(x, z, 6, 0xffa03a, 1.1);
  }

  update(dt: number){
    this.sparks.update(dt, true);
    this.dust.update(dt);
    let n = 0;
    this.rings = this.rings.filter(r => (r.age += dt) < r.life);
    for (const r of this.rings){
      const k = r.age / r.life, s = r.r * (0.2 + 0.8 * Math.sqrt(k));
      this.ringMesh.setMatrixAt(n, _m.compose(_p.set(r.x, r.y, r.z), _q.identity(), _s.set(s, 1, s)));
      this.ringMesh.setColorAt(n++, _c.setHex(r.color).multiplyScalar(1 - k));
    }
    this.ringMesh.count = n;
    n = 0;
    this.pillars = this.pillars.filter(p => (p.age += dt) < p.life);
    for (const p of this.pillars){
      const k = p.age / p.life, w = (p.big ? 1.6 : 0.7) * (1 - k * 0.5), h = (p.big ? 14 : 6) * Math.min(1, k * 4);
      this.pillarMesh.setMatrixAt(n, _m.compose(_p.set(p.x, 0, p.z), _q.identity(), _s.set(w, h, w)));
      this.pillarMesh.setColorAt(n++, _c.setHex(p.color).multiplyScalar((1 - k) * 0.8));
    }
    this.pillarMesh.count = n;
    // mũi tên bay vòng cung, bám theo mục tiêu đang chạy
    n = 0;
    this.arrows = this.arrows.filter(a => {
      if ((a.t += dt) < a.dur) return true;
      // cắm xuống: bụi nhỏ + tia lửa, báo cho âm thanh
      this.puff(a.x1, a.z1, 2, 0xb9a58c, 0.2, 0.6, 0.6); this.sparks.add(a.x1, 0.9, a.z1, 0, 1, 0, 0.12, 1, 0xffe8b0, 2);
      this.onArrowLand?.(a.x1, a.z1);
      return false;
    });
    const trail = (this.arrows.length > 80 ? 0.15 : 0.4) * this.budget;
    for (const a of this.arrows){
      const g = a.get?.(); if (g){ a.x1 = g.x; a.z1 = g.z; }
      const k = a.t / a.dur, x = a.x0 + (a.x1 - a.x0) * k, z = a.z0 + (a.z1 - a.z0) * k, y = 1.15 + Math.sin(k * Math.PI) * Math.min(2.2, Math.hypot(a.x1 - a.x0, a.z1 - a.z0) * 0.18);
      const dy = Math.cos(k * Math.PI) * Math.PI * Math.min(2.2, Math.hypot(a.x1 - a.x0, a.z1 - a.z0) * 0.18), dl = Math.hypot(a.x1 - a.x0, a.z1 - a.z0) || 1;
      _q.setFromEuler(_e.set(-Math.atan2(dy, dl), Math.atan2(a.x1 - a.x0, a.z1 - a.z0), 0, 'YXZ'));
      this.arrowMesh.setMatrixAt(n, _m.compose(_p.set(x, y, z), _q, _s.set(1, 1, 1)));
      this.arrowMesh.setColorAt(n++, _c.setHex(a.color));
      if (Math.random() < trail) this.sparks.add(x, y, z, 0, 0, 0, 0.16, 0.55, 0xfff2c8, 0, -0.8);   // vệt sáng sau đuôi tên
    }
    this.arrowMesh.count = n;
    n = 0;
    this.slashes = this.slashes.filter(s => (s.age += dt) < s.life);
    for (const s of this.slashes){
      const k = s.age / s.life, sc = s.s * (0.7 + 0.5 * k);
      // quét ngang 1.4 rad trong thời gian sống, mờ dần
      _q.setFromEuler(_e.set(s.flip ? 0.35 : -0.35, s.yaw + (s.flip ? -1 : 1) * (k - 0.5) * 1.4 - Math.PI / 2, 0, 'YXZ'));
      this.slashMesh.setMatrixAt(n, _m.compose(_p.set(s.x, s.y, s.z), _q, _s.set(sc, sc, sc)));
      this.slashMesh.setColorAt(n++, _c.setHex(s.color).multiplyScalar((1 - k) * 1.2));
    }
    this.slashMesh.count = n;
    for (const m of [this.ringMesh, this.arrowMesh, this.pillarMesh, this.slashMesh]){ m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
  }
}
