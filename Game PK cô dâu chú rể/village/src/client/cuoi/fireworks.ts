import * as THREE from 'three';

// Pháo hoa như thật: quả pháo phụt lên kéo vệt lửa, lên tới đỉnh thì nổ tung thành chùm sao. Sao bay ra chậm dần vì sức cản
// không khí, rơi xuống, nhấp nháy rồi tắt. Có nhiều kiểu: hoa mẫu đơn, liễu vàng rủ dài, vòng tròn, hoa cúc đổi màu,
// kim tuyến nổ lách tách, cọ vàng. Mỗi lần nổ hắt ánh sáng màu xuống sân. Vẽ bằng điểm sáng cộng màu cho bloom tỏa quầng.
export type ShellKind = 'peony' | 'willow' | 'ring' | 'chrys' | 'crackle' | 'palm';
type Hooks = { launch: () => void; burst: (kind: ShellKind, big: boolean) => void };

const MAX = 16000;
const COLORS: [number, number, number][] = [[1, 0.25, 0.3], [1, 0.8, 0.25], [0.35, 0.7, 1], [0.5, 1, 0.45], [0.95, 0.4, 1], [1, 0.55, 0.15]];
const GOLD: [number, number, number] = [1, 0.7, 0.3];

interface Star {
  x: number; y: number; z: number; vx: number; vy: number; vz: number;
  age: number; life: number; r: number; g: number; b: number; r2: number; g2: number; b2: number;
  size: number; drag: number; grav: number; trail: number; flick: number; pop: boolean; rocket: Shell | null;
}
interface Shell { kind: ShellKind; color: [number, number, number]; color2: [number, number, number]; big: boolean }

export class Fireworks {
  readonly points: THREE.Points;
  private stars: Star[] = [];
  private pos = new Float32Array(MAX * 3); private col = new Float32Array(MAX * 3); private siz = new Float32Array(MAX);
  private geo = new THREE.BufferGeometry();
  private mat: THREE.ShaderMaterial;
  private lights: { l: THREE.PointLight; v: number }[] = [];
  private timers: number[] = [];
  private hooks: Hooks;

  constructor(scene: THREE.Scene, hooks: Hooks){
    this.hooks = hooks;
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    this.geo.setAttribute('size', new THREE.BufferAttribute(this.siz, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo.setDrawRange(0, 0);
    this.mat = new THREE.ShaderMaterial({
      uniforms: { scale: { value: 600 } },
      vertexShader: `attribute float size; attribute vec3 color; varying vec3 vColor; uniform float scale;
        void main(){ vColor = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_PointSize = max(1.0, size * scale / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying vec3 vColor;
        void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; float a = smoothstep(0.5, 0.05, d); float core = smoothstep(0.18, 0.0, d);
          gl_FragColor = vec4(vColor * (a + core * 0.6), a); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.points = new THREE.Points(this.geo, this.mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
    for (let i = 0; i < 3; i++){ const l = new THREE.PointLight(0xffffff, 0, 60, 1.2); scene.add(l); this.lights.push({ l, v: 0 }); }
  }

  private add(s: Partial<Star> & { x: number; y: number; z: number }){
    if (this.stars.length >= MAX) return null;
    const st: Star = { vx: 0, vy: 0, vz: 0, age: 0, life: 1, r: 1, g: 1, b: 1, r2: -1, g2: 0, b2: 0, size: 0.2, drag: 0, grav: 0, trail: 0, flick: 0, pop: false, rocket: null, ...s };
    this.stars.push(st);
    return st;
  }

  // Một quả pháo: phụt lên từ sau mái đình, bay chếch ra phía sân, nổ ngay trên sân ở độ cao 7,5–11 (dưới các bảng chữ, khung dọc vẫn thấy)
  launch(kind?: ShellKind, x = (Math.random() - 0.5) * 13, big = false){
    const kinds: ShellKind[] = ['peony', 'willow', 'ring', 'chrys', 'crackle', 'palm'];
    const k = kind ?? kinds[Math.floor(Math.random() * kinds.length)];
    const c = COLORS[Math.floor(Math.random() * COLORS.length)], c2 = COLORS[Math.floor(Math.random() * COLORS.length)];
    const h = (big ? 9.5 : 7.5) + Math.random() * 2, vy = Math.sqrt(2 * 9.8 * h), T = vy / 9.8;
    this.add({ x, y: 1.5, z: -6.5, vx: (Math.random() - 0.5) * 1.5, vy, vz: (8 + Math.random() * 3) / T, life: 9, r: 1, g: 0.75, b: 0.4, size: 0.3, grav: 9.8, trail: 70,
      rocket: { kind: k, color: c, color2: c2, big } });
    this.hooks.launch();
  }

  // Loạt pháo n quả trong khoảng ms mili giây, quả cuối to nhất
  salvo(n: number, ms = 4000){
    for (let i = 0; i < n; i++){
      const last = i === n - 1 && n > 2;
      this.later(i * ms / Math.max(1, n - 1) + Math.random() * 200, () => this.launch(last ? 'chrys' : undefined, last ? 0 : undefined, last));
    }
  }

  private later(ms: number, fn: () => void){ this.timers.push(window.setTimeout(fn, ms)); if (this.timers.length > 60) this.timers.shift(); }

  private explode(r: Star){
    const s = r.rocket!, big = s.big ? 1.35 : 1;
    const [cr, cg, cb] = s.color;
    // chớp sáng giữa tâm nổ, ánh sáng màu hắt xuống sân
    this.add({ x: r.x, y: r.y, z: r.z, life: 0.18, r: 3, g: 3, b: 3, size: 5 * big });
    const L = this.lights.reduce((a, b) => (a.v < b.v ? a : b));
    L.l.position.set(r.x, r.y, r.z); L.l.color.setRGB(cr * 0.7 + 0.3, cg * 0.7 + 0.3, cb * 0.7 + 0.3); L.v = 1;
    const dir = new THREE.Vector3();
    const star = (speed: number, o: Partial<Star>) => {
      this.add({ x: r.x, y: r.y, z: r.z, vx: dir.x * speed + r.vx * 0.3, vy: dir.y * speed + r.vy * 0.3, vz: dir.z * speed, r: cr * 1.25, g: cg * 1.25, b: cb * 1.25, size: 0.42, drag: 1.9, grav: 2.4, life: 1.8 + Math.random() * 0.7, flick: 0.4, ...o });
    };
    switch (s.kind){
      case 'peony': {
        const n = Math.round(150 * big);
        for (let i = 0; i < n; i++){ dir.randomDirection(); star((8 + Math.random() * 1.2) * big, { trail: 6 }); }
        break;
      }
      case 'chrys': {                                                 // hoa cúc: sao để vệt, đổi màu giữa chừng
        const n = Math.round(180 * big), [r2, g2, b2] = s.color2;
        for (let i = 0; i < n; i++){ dir.randomDirection(); star((8.5 + Math.random()) * big, { r: 2.2, g: 1.9, b: 1.4, r2: r2 * 1.9, g2: g2 * 1.9, b2: b2 * 1.9, trail: 22, life: 2.2 + Math.random() * 0.5 }); }
        // nhân thứ hai nhỏ hơn bên trong
        for (let i = 0; i < n / 3; i++){ dir.randomDirection(); star(4 * big, { r: cr * 2, g: cg * 2, b: cb * 2, life: 1.6, trail: 0 }); }
        break;
      }
      case 'willow': {                                                // liễu vàng: sao lửa vàng rủ xuống, kéo vệt dài
        const n = Math.round(110 * big);
        for (let i = 0; i < n; i++){ dir.randomDirection(); star((6.5 + Math.random()) * big, { r: GOLD[0] * 1.6, g: GOLD[1] * 1.6, b: GOLD[2] * 1.6, drag: 2.6, grav: 1.6, life: 3.6 + Math.random() * 0.9, trail: 45, size: 0.26, flick: 0.6 }); }
        break;
      }
      case 'ring': {                                                  // vòng tròn nghiêng, có nhân sáng ở giữa
        const n = Math.round(90 * big), ax = new THREE.Vector3().randomDirection(), u = new THREE.Vector3().crossVectors(ax, new THREE.Vector3(0, 1, 0.3)).normalize(), v = new THREE.Vector3().crossVectors(ax, u);
        for (let i = 0; i < n; i++){ const a = i / n * Math.PI * 2; dir.copy(u).multiplyScalar(Math.cos(a)).addScaledVector(v, Math.sin(a)); star(8.5 * big, { trail: 8 }); }
        const [r2, g2, b2] = s.color2;
        for (let i = 0; i < 40; i++){ dir.randomDirection(); star(3 * big, { r: r2 * 2, g: g2 * 2, b: b2 * 2, life: 1.4 }); }
        break;
      }
      case 'crackle': {                                               // kim tuyến: sao bạc tách ra thành nhiều tia lách tách
        const n = Math.round(110 * big);
        for (let i = 0; i < n; i++){ dir.randomDirection(); star((7.5 + Math.random() * 1.5) * big, { r: 2, g: 2, b: 1.8, life: 1.2 + Math.random() * 0.5, pop: true, trail: 4, size: 0.24 }); }
        break;
      }
      case 'palm': {                                                  // cọ vàng: ít tia mà to, cong xuống như tàu lá dừa
        for (let i = 0; i < 14; i++){
          dir.set(Math.cos(i / 14 * Math.PI * 2), 0.5 + Math.random() * 0.4, Math.sin(i / 14 * Math.PI * 2)).normalize();
          star(9 * big, { r: 2, g: 1.5, b: 0.6, size: 0.55, drag: 1.4, grav: 3.2, life: 2.6, trail: 70, flick: 0.2 });
        }
        for (let i = 0; i < 50; i++){ dir.randomDirection(); star(5 * big, { r: cr * 2, g: cg * 2, b: cb * 2, life: 1.5 }); }
        break;
      }
    }
    this.hooks.burst(s.kind, s.big);
  }

  update(dt: number, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer){
    this.mat.uniforms.scale.value = renderer.domElement.height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
    const born: Star[] = [];
    let n = 0;
    for (const s of this.stars){
      s.age += dt;
      if (s.age >= s.life) continue;
      const k = Math.exp(-s.drag * dt);
      s.vx *= k; s.vy = s.vy * k - s.grav * dt; s.vz *= k;
      s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
      // quả pháo lên tới đỉnh thì nổ
      if (s.rocket && s.vy < 1.5){ this.explode(s); s.age = s.life; continue; }
      // vệt lửa: thả hạt nhỏ mờ dần ở chỗ vừa đi qua
      if (s.trail && Math.random() < s.trail * dt){
        const u = s.age / s.life, f = s.rocket ? 1 : 0.55 * (1 - u);
        born.push({ x: s.x, y: s.y, z: s.z, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 - (s.rocket ? 1.5 : 0.3), vz: 0, age: 0, life: s.rocket ? 0.45 : 0.5 + Math.random() * 0.6,
          r: (s.rocket ? 1.6 : s.r) * f, g: (s.rocket ? 1.0 : s.g) * f, b: (s.rocket ? 0.4 : s.b) * f, r2: -1, g2: 0, b2: 0, size: s.size * 0.6, drag: 1, grav: 1.2, trail: 0, flick: 0.3, pop: false, rocket: null });
      }
      // kim tuyến: gần tắt thì tách ra thành mấy tia trắng nhỏ
      if (s.pop && s.age > s.life * 0.75){
        s.pop = false;
        for (let i = 0; i < 4; i++) born.push({ x: s.x, y: s.y, z: s.z, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, vz: (Math.random() - 0.5) * 3, age: 0, life: 0.25 + Math.random() * 0.2, r: 2.4, g: 2.4, b: 2.2, r2: -1, g2: 0, b2: 0, size: 0.16, drag: 3, grav: 1, trail: 0, flick: 0, pop: false, rocket: null });
      }
      if (n >= MAX) continue;
      const u = s.age / s.life;
      let fade = u < 0.7 ? 1 : 1 - (u - 0.7) / 0.3;
      if (s.flick && u > 0.45) fade *= 1 - s.flick + s.flick * (Math.random() < 0.5 ? 1 : 0.2);   // nhấp nháy lúc sắp tắt
      let r = s.r, g = s.g, b = s.b;
      if (s.r2 >= 0 && u > 0.4){ const m = Math.min(1, (u - 0.4) * 4); r += (s.r2 - r) * m; g += (s.g2 - g) * m; b += (s.b2 - b) * m; }
      this.pos[n * 3] = s.x; this.pos[n * 3 + 1] = s.y; this.pos[n * 3 + 2] = s.z;
      this.col[n * 3] = r * fade; this.col[n * 3 + 1] = g * fade; this.col[n * 3 + 2] = b * fade;
      this.siz[n] = s.size * (s.rocket ? 1 : 0.6 + 0.4 * fade);
      n++;
    }
    this.stars = this.stars.filter(s => s.age < s.life);
    for (const b of born) if (this.stars.length < MAX) this.stars.push(b);
    this.geo.setDrawRange(0, n);
    for (const a of ['position', 'color', 'size']) (this.geo.attributes[a] as THREE.BufferAttribute).needsUpdate = true;
    for (const L of this.lights){ L.v *= Math.exp(-dt * 3.2); L.l.intensity = L.v < 0.01 ? 0 : L.v * 260; }
  }
}
