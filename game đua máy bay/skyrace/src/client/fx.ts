import * as THREE from 'three';

// Hạt sáng (lửa, tia, khói), vệt khói đầu cánh và các đòn skill bay trên trời.

/* -------------------------------------------------------------- hạt */
export class Particles {
  readonly points: THREE.Points;
  private n: number; private i = 0;
  private pos: Float32Array; private vel: Float32Array; private col: Float32Array; private size: Float32Array; private alpha: Float32Array;
  private life: Float32Array; private max: Float32Array; private drag: Float32Array; private grow: Float32Array; private grav: Float32Array; private base: Float32Array;
  private geo = new THREE.BufferGeometry();

  constructor(n: number, additive: boolean){
    this.n = n;
    this.pos = new Float32Array(n * 3); this.vel = new Float32Array(n * 3); this.col = new Float32Array(n * 3);
    this.size = new Float32Array(n); this.alpha = new Float32Array(n); this.life = new Float32Array(n); this.max = new Float32Array(n).fill(1);
    this.drag = new Float32Array(n); this.grow = new Float32Array(n); this.grav = new Float32Array(n); this.base = new Float32Array(n);
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: { scale: { value: 600 } },
      vertexShader: `attribute float size; attribute float alpha; attribute vec3 color; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vC = color; vA = alpha; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = size * scale / max(1.0, -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying vec3 vC; varying float vA;
        void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d, d) * 4.0; if (r > 1.0) discard; gl_FragColor = vec4(vC, vA * (1.0 - r) * (1.0 - r)); }`,
    });
    this.points = new THREE.Points(this.geo, mat);
    this.points.frustumCulled = false;
  }
  setScale(h: number){ (this.points.material as THREE.ShaderMaterial).uniforms.scale.value = h * 0.9; }

  emit(p: THREE.Vector3, v: THREE.Vector3, color: THREE.Color | number, size: number, life: number, o: { drag?: number; grow?: number; grav?: number; alpha?: number } = {}){
    const i = this.i; this.i = (this.i + 1) % this.n;
    const c = typeof color === 'number' ? tmpC.setHex(color) : color;
    this.pos.set([p.x, p.y, p.z], i * 3); this.vel.set([v.x, v.y, v.z], i * 3); this.col.set([c.r, c.g, c.b], i * 3);
    this.size[i] = size; this.base[i] = o.alpha ?? 1; this.alpha[i] = this.base[i]; this.life[i] = life; this.max[i] = life;
    this.drag[i] = o.drag ?? 1.5; this.grow[i] = o.grow ?? 0; this.grav[i] = o.grav ?? 0;
  }
  burst(p: THREE.Vector3, colors: number[], n: number, speed: number, size: number, life = 1, o: { drag?: number; grow?: number; grav?: number; alpha?: number } = {}){
    for (let k = 0; k < n; k++){
      tmpV.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(speed * (0.3 + Math.random() * 0.7));
      this.emit(p, tmpV, colors[k % colors.length], size * (0.6 + Math.random() * 0.8), life * (0.6 + Math.random() * 0.6), o);
    }
  }
  update(dt: number){
    for (let i = 0; i < this.n; i++){
      if (this.life[i] <= 0){ if (this.alpha[i] !== 0) this.alpha[i] = 0; continue; }
      this.life[i] -= dt;
      const k = Math.max(0, 1 - this.drag[i] * dt), j = i * 3;
      this.vel[j] *= k; this.vel[j + 1] = this.vel[j + 1] * k - this.grav[i] * dt; this.vel[j + 2] *= k;
      this.pos[j] += this.vel[j] * dt; this.pos[j + 1] += this.vel[j + 1] * dt; this.pos[j + 2] += this.vel[j + 2] * dt;
      this.size[i] += this.grow[i] * dt;
      this.alpha[i] = this.base[i] * Math.max(0, this.life[i] / this.max[i]);
    }
    for (const a of ['position', 'color', 'size', 'alpha']) (this.geo.attributes[a] as THREE.BufferAttribute).needsUpdate = true;
  }
}
const tmpV = new THREE.Vector3(), tmpC = new THREE.Color();

/* ------------------------------------------------------------ vệt khói */
// Dải băng mỏng nối các điểm vừa đi qua, mờ dần về cuối
export class Trail {
  readonly mesh: THREE.Mesh;
  private n: number; private pts: THREE.Vector3[] = []; private sides: THREE.Vector3[] = [];
  private pos: Float32Array; private col: Float32Array; private acc = 0;
  color = new THREE.Color(1, 1, 1); width: number; opacity = 0.55;

  constructor(n = 28, width = 0.5){
    this.n = n; this.width = width;
    this.pos = new Float32Array(n * 2 * 3); this.col = new Float32Array(n * 2 * 4);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage));
    const idx: number[] = [];
    for (let i = 0; i < n - 1; i++){ const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    g.setIndex(idx);
    this.mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    this.mesh.frustumCulled = false;
  }
  reset(){ this.pts = []; this.sides = []; }
  push(p: THREE.Vector3, side: THREE.Vector3, dt: number){
    this.acc += dt;
    if (this.acc > 0.035 || !this.pts.length){ this.acc = 0; this.pts.unshift(p.clone()); this.sides.unshift(side.clone()); if (this.pts.length > this.n){ this.pts.pop(); this.sides.pop(); } }
    else { this.pts[0].copy(p); this.sides[0].copy(side); }
    const m = this.pts.length;
    for (let i = 0; i < this.n; i++){
      const q = this.pts[Math.min(i, m - 1)], s = this.sides[Math.min(i, m - 1)], f = i / (this.n - 1), w = this.width * (1 - f * 0.6);
      this.pos.set([q.x + s.x * w, q.y + s.y * w, q.z + s.z * w, q.x - s.x * w, q.y - s.y * w, q.z - s.z * w], i * 6);
      const a = i < m ? this.opacity * (1 - f) : 0;
      this.col.set([this.color.r, this.color.g, this.color.b, a, this.color.r, this.color.g, this.color.b, a], i * 8);
    }
    const g = this.mesh.geometry;
    (g.attributes.position as THREE.BufferAttribute).needsUpdate = true; (g.attributes.color as THREE.BufferAttribute).needsUpdate = true;
  }
}

/* -------------------------------------------------------- các đòn skill */
type Target = () => THREE.Vector3 | null;
interface Shot { kind: 'missile' | 'bomb' | 'meteor'; mesh: THREE.Object3D; from: THREE.Vector3; to: Target; t: number; dur: number; last: THREE.Vector3; done?: () => void }
interface Flash { mesh: THREE.Mesh; t: number; dur: number; grow: number; fade: number }

export class SkillFx {
  readonly group = new THREE.Group();
  private shots: Shot[] = [];
  private flashes: Flash[] = [];
  private missileGeo: THREE.BufferGeometry;
  private bombGeo: THREE.BufferGeometry;
  private meteorGeo = new THREE.IcosahedronGeometry(3, 0);
  onBoom: (p: THREE.Vector3, big: boolean) => void = () => {};

  private fire: Particles; private smoke: Particles;
  constructor(fire: Particles, smoke: Particles){
    this.fire = fire; this.smoke = smoke;
    const body = new THREE.CylinderGeometry(0.35, 0.35, 3, 8).rotateX(Math.PI / 2);
    const nose = new THREE.ConeGeometry(0.35, 1, 8).rotateX(Math.PI / 2).translate(0, 0, 2);
    this.missileGeo = mergeGeos([body, nose]);
    this.bombGeo = mergeGeos([new THREE.SphereGeometry(1.6, 14, 10).scale(1, 1, 1.5), new THREE.BoxGeometry(2.6, 0.15, 1).translate(0, 0, -2.2), new THREE.BoxGeometry(0.15, 2.6, 1).translate(0, 0, -2.2)]);
  }

  missile(from: THREE.Vector3, to: Target, dur: number){
    const m = new THREE.Mesh(this.missileGeo, new THREE.MeshStandardMaterial({ color: 0xdfe3ea, metalness: 0.6, roughness: 0.3, emissive: 0x331100 }));
    m.position.copy(from); this.group.add(m);
    this.shots.push({ kind: 'missile', mesh: m, from: from.clone(), to, t: 0, dur: dur / 1000, last: from.clone() });
  }
  bomb(to: Target, dur: number){
    const p = to(); if (!p) return;
    const m = new THREE.Mesh(this.bombGeo, new THREE.MeshStandardMaterial({ color: 0x23262c, metalness: 0.5, roughness: 0.4 }));
    const from = p.clone().add(new THREE.Vector3(0, 140, 0)); m.position.copy(from); this.group.add(m);
    this.shots.push({ kind: 'bomb', mesh: m, from, to, t: 0, dur: dur / 1000, last: from.clone() });
  }
  meteor(to: Target, dur: number){
    const p = to(); if (!p) return;
    const m = new THREE.Mesh(this.meteorGeo, new THREE.MeshBasicMaterial({ color: 0xff7a1a, toneMapped: false }));
    const from = p.clone().add(new THREE.Vector3((Math.random() - 0.5) * 160, 180 + Math.random() * 60, (Math.random() - 0.5) * 160));
    m.position.copy(from); this.group.add(m);
    this.shots.push({ kind: 'meteor', mesh: m, from, to, t: 0, dur: dur / 1000, last: from.clone() });
  }
  // Sét: đường gấp khúc từ mây xuống mục tiêu
  bolt(p: THREE.Vector3){
    const pts: THREE.Vector3[] = [], top = p.clone().add(new THREE.Vector3((Math.random() - 0.5) * 40, 160, (Math.random() - 0.5) * 40));
    for (let i = 0; i <= 10; i++){ const q = top.clone().lerp(p, i / 10); if (i > 0 && i < 10) q.add(new THREE.Vector3((Math.random() - 0.5) * 12, 0, (Math.random() - 0.5) * 12)); pts.push(q); }
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0), 40, 0.9, 5, false);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xbfe8ff, transparent: true, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.group.add(m); this.flashes.push({ mesh: m, t: 0, dur: 0.45, grow: 0, fade: 1 });
    this.fire.burst(p, [0xbfe8ff, 0xffffff, 0x6fb8ff], 40, 30, 1.6, 0.6);
  }
  // Vòng sáng nở ra (cổng dịch chuyển, sóng nổ, khiên vỡ)
  ring(p: THREE.Vector3, facing: THREE.Vector3 | null, color: number, size: number, dur = 0.8, grow = 3){
    const m = new THREE.Mesh(new THREE.TorusGeometry(size, size * 0.12, 8, 40), new THREE.MeshBasicMaterial({ color, transparent: true, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }));
    m.position.copy(p);
    if (facing) m.lookAt(p.clone().add(facing)); else m.rotation.x = Math.PI / 2;
    this.group.add(m); this.flashes.push({ mesh: m, t: 0, dur, grow, fade: 1 });
  }
  boom(p: THREE.Vector3, big: boolean){
    const s = big ? 2.2 : 1;
    this.fire.burst(p, [0xffd36a, 0xff7a1a, 0xff3b1a, 0xffffff], big ? 140 : 60, 45 * s, 3.5 * s, 0.9);
    this.smoke.burst(p, [0x4a4a4a, 0x6b6b6b, 0x333333], big ? 50 : 22, 14 * s, 6 * s, 2.2, { grow: 6, drag: 1.2, alpha: 0.75 });
    const fb = new THREE.Mesh(new THREE.SphereGeometry(6 * s, 18, 12), new THREE.MeshBasicMaterial({ color: 0xffb347, transparent: true, toneMapped: false, blending: THREE.AdditiveBlending, depthWrite: false }));
    fb.position.copy(p); this.group.add(fb); this.flashes.push({ mesh: fb, t: 0, dur: 0.5, grow: 2.4, fade: 1 });
    this.ring(p, null, 0xffe0a0, 6 * s, 0.7, 6);
    this.onBoom(p, big);
  }

  update(dt: number){
    for (let i = this.shots.length - 1; i >= 0; i--){
      const s = this.shots[i]; s.t += dt;
      const f = Math.min(1, s.t / s.dur), target = s.to() ?? s.last;
      s.last.copy(target);
      const prev = s.mesh.position.clone();
      if (s.kind === 'missile'){
        // bay vòng cung lên rồi lao xuống mục tiêu
        const q = s.from.clone().lerp(target, f * f * (3 - 2 * f)); q.y += Math.sin(f * Math.PI) * 14;
        s.mesh.position.copy(q);
        this.smoke.emit(q, tmpV.set((Math.random() - 0.5) * 2, 1, (Math.random() - 0.5) * 2), 0xe8e8e8, 2.4, 1.2, { grow: 4, drag: 2, alpha: 0.7 });
        this.fire.emit(q, tmpV.set(0, 0, 0), 0xffb03a, 2.2, 0.15);
      } else if (s.kind === 'bomb'){
        const q = s.from.clone().lerp(target, f * f); s.mesh.position.copy(q);
        s.mesh.rotation.z += dt * 3;
      } else {
        const q = s.from.clone().lerp(target, f); s.mesh.position.copy(q);
        for (let k = 0; k < 3; k++) this.fire.emit(q, tmpV.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6), k ? 0xff7a1a : 0xffe08a, 5, 0.5);
        this.smoke.emit(q, tmpV.set(0, 2, 0), 0x3a3a3a, 5, 1.5, { grow: 5, alpha: 0.6 });
      }
      if (s.kind !== 'bomb' && s.mesh.position.distanceToSquared(prev) > 1e-4) s.mesh.lookAt(s.mesh.position.clone().add(s.mesh.position.clone().sub(prev)));
      if (f >= 1){
        this.group.remove(s.mesh);
        if (s.kind !== 'meteor' || Math.random() < 1) this.boom(target, s.kind === 'bomb');
        this.shots.splice(i, 1);
      }
    }
    for (let i = this.flashes.length - 1; i >= 0; i--){
      const f = this.flashes[i]; f.t += dt;
      const k = f.t / f.dur;
      f.mesh.scale.setScalar(1 + f.grow * k);
      (f.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - k) * f.fade;
      if (k >= 1){ this.group.remove(f.mesh); f.mesh.geometry.dispose(); (f.mesh.material as THREE.Material).dispose(); this.flashes.splice(i, 1); }
    }
  }
}

// Gộp nhiều khối thành một (đơn giản, không cần BufferGeometryUtils)
function mergeGeos(list: THREE.BufferGeometry[]){
  const geos = list.map(g => g.index ? g.toNonIndexed() : g);
  const pos: number[] = [], nor: number[] = [];
  for (const g of geos){ g.computeVertexNormals(); pos.push(...(g.attributes.position.array as Float32Array)); nor.push(...(g.attributes.normal.array as Float32Array)); }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  return out;
}
