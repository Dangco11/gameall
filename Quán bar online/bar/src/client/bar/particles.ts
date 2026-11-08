import * as THREE from 'three';

// Hạt sáng / khói dạng điểm: mỗi hạt có vị trí, vận tốc, màu, cỡ lớn dần, mờ dần, trọng lực và lực cản riêng.
// Một hệ là một lệnh vẽ. additive: cộng sáng (tia lửa, bong bóng sáng); thường: khói CO2, khói sân khấu.
interface Part { p: THREE.Vector3; v: THREE.Vector3; age: number; life: number; c: THREE.Color; s0: number; s1: number; a: number; g: number; drag: number; fade: number }
export interface Emit { at: THREE.Vector3; v: THREE.Vector3; life: number; color: number | THREE.Color; size: number; grow?: number; alpha?: number; gravity?: number; drag?: number; fade?: number; delay?: number }

export class Particles {
  readonly points: THREE.Points;
  private list: Part[] = [];
  private pos: Float32Array; private col: Float32Array; private siz: Float32Array; private alp: Float32Array;
  private geo = new THREE.BufferGeometry();
  readonly mat: THREE.ShaderMaterial;
  private max: number;

  constructor(max: number, map: THREE.Texture, additive: boolean){
    this.max = max;
    this.pos = new Float32Array(max * 3); this.col = new Float32Array(max * 3); this.siz = new Float32Array(max); this.alp = new Float32Array(max);
    const attr = (a: Float32Array, n: number) => new THREE.BufferAttribute(a, n).setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', attr(this.pos, 3)); this.geo.setAttribute('color', attr(this.col, 3));
    this.geo.setAttribute('size', attr(this.siz, 1)); this.geo.setAttribute('alpha', attr(this.alp, 1));
    this.geo.setDrawRange(0, 0);
    this.mat = new THREE.ShaderMaterial({
      uniforms: { map: { value: map }, scale: { value: 600 }, gain: { value: 1 } },
      vertexShader: `attribute float size; attribute float alpha; attribute vec3 color; varying vec3 vC; varying float vA; uniform float scale;
        void main(){ vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); float d = -mv.z;
          // hạt sát ống kính mờ dần (khói không phủ trắng cả khung hình)
          vA = alpha * smoothstep(0.6, 2.6, d - size * 0.35); gl_PointSize = clamp(size * scale / d, 1.0, 700.0); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D map; uniform float gain; varying vec3 vC; varying float vA;
        void main(){ vec4 t = texture2D(map, gl_PointCoord); float a = t.a * vA; if (a < 0.003) discard; gl_FragColor = vec4(vC * t.rgb * gain, a); }`,
      transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.points = new THREE.Points(this.geo, this.mat);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 6 : 5;
  }

  get count(){ return this.list.length; }
  emit(e: Emit){
    if (this.list.length >= this.max) this.list.shift();
    this.list.push({ p: e.at.clone(), v: e.v.clone(), age: -(e.delay ?? 0), life: e.life, c: e.color instanceof THREE.Color ? e.color.clone() : new THREE.Color(e.color),
      s0: e.size, s1: e.size * (e.grow ?? 1), a: e.alpha ?? 1, g: e.gravity ?? 0, drag: e.drag ?? 0, fade: e.fade ?? 0.3 });
  }

  // scale: theo chiều cao khung hình để cỡ hạt đúng mét ở mọi độ phân giải
  update(dt: number, viewH: number, fov: number){
    this.mat.uniforms.scale.value = viewH / (2 * Math.tan(THREE.MathUtils.degToRad(fov) / 2));
    let n = 0;
    for (let i = 0; i < this.list.length; i++){
      const q = this.list[i];
      q.age += dt;
      if (q.age >= q.life){ this.list[i] = this.list[this.list.length - 1]; this.list.pop(); i--; continue; }
      if (q.age < 0) continue;
      q.v.y -= q.g * dt;
      if (q.drag) q.v.multiplyScalar(Math.max(0, 1 - q.drag * dt));
      q.p.addScaledVector(q.v, dt);
      const k = q.age / q.life, fin = Math.min(1, q.age / 0.08), fout = k > 1 - q.fade ? (1 - k) / q.fade : 1;
      this.pos.set([q.p.x, q.p.y, q.p.z], n * 3); this.col.set([q.c.r, q.c.g, q.c.b], n * 3);
      this.siz[n] = q.s0 + (q.s1 - q.s0) * k; this.alp[n] = q.a * fin * fout;
      n++;
    }
    this.geo.setDrawRange(0, n);
    for (const k of ['position', 'color', 'size', 'alpha']) (this.geo.attributes[k] as THREE.BufferAttribute).needsUpdate = true;
  }
}
