import * as THREE from 'three';
import { levelInfo } from '../../shared/levels.ts';

// Hào quang theo cấp độ người chơi. Mọi phần cộng sáng (additive), không đổ bóng, dùng chung hình khối, ảnh và một đồng hồ
// cho cả quán, nên 60 người có hào quang vẫn nhẹ. Gắn vào gốc người (đi, xoay theo người); cánh gắn vào xương lưng nên
// vỗ theo người đang nhảy; vầng hào quang bám đầu.
//   1 Tân Binh     vòng sáng trắng mờ dưới chân
//   2 Đồng         vòng đồng + bụi sáng bay lên
//   3 Bạc          hai vòng bạc xoay ngược nhau + lấp lánh
//   4 Ngọc Bích    vòng ngọc + cột sáng xanh
//   5 Hoàng Kim    trận pháp vàng có ký tự + cột vàng + vầng hào quang trên đầu
//   6 Hỏa Thần     trận pháp lửa + lửa bốc lên + vầng hào quang
//   7 Pha Lê       trận pháp tím + 6 viên pha lê bay quanh người + vầng hào quang
//   8 Thiên Thần   đôi cánh lông vũ trắng vàng vỗ chậm + vầng hào quang + lông vũ sáng bay
//   9 Phượng Hoàng đôi cánh lửa + lửa cháy quanh người + trận pháp đỏ vàng
//  10 Long Vương   rồng thần cuộn quanh người, đầu rồng ngẩng trên vai + trận pháp ngọc + vầng hào quang

const TIME = { value: 0 };
export function auraTick(t: number){ TIME.value = t; }

/* ------------------------------------------------------------ ảnh vẽ sẵn */
function canvasTex(size: number, draw: (g: CanvasRenderingContext2D, s: number) => void){
  const c = document.createElement('canvas'); c.width = c.height = size;
  draw(c.getContext('2d')!, size);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
let _ring: THREE.Texture | null = null, _rune: THREE.Texture | null = null, _wing: THREE.Texture | null = null, _dot: THREE.Texture | null = null;
// vòng sáng mềm
const ringTex = () => _ring ??= canvasTex(256, (g, s) => {
  const c = s / 2;
  const grd = g.createRadialGradient(c, c, s * 0.3, c, c, s * 0.5);
  grd.addColorStop(0, 'rgba(255,255,255,0)'); grd.addColorStop(0.72, 'rgba(255,255,255,0.9)'); grd.addColorStop(0.8, 'rgba(255,255,255,1)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, s, s);
});
// trận pháp: ba vòng, ký tự quanh vòng, ngôi sao tám cánh ở giữa
const runeTex = () => _rune ??= canvasTex(512, (g, s) => {
  const c = s / 2;
  g.strokeStyle = '#fff'; g.fillStyle = '#fff'; g.shadowColor = '#fff'; g.shadowBlur = 8;
  for (const [r, w] of [[0.48, 5], [0.42, 2], [0.3, 3], [0.17, 2]] as const){ g.lineWidth = w; g.beginPath(); g.arc(c, c, r * s, 0, Math.PI * 2); g.stroke(); }
  // ký tự giữa vòng 0.42 và 0.48
  for (let i = 0; i < 36; i++){
    const a = i / 36 * Math.PI * 2, r = 0.45 * s;
    g.save(); g.translate(c + Math.cos(a) * r, c + Math.sin(a) * r); g.rotate(a + Math.PI / 2);
    g.lineWidth = 2.5; g.beginPath();
    const k = (i * 7) % 5;
    g.moveTo(-6, -7); g.lineTo(k > 1 ? 6 : 0, -7); g.moveTo(0, -7); g.lineTo(0, 7);
    if (k % 2) { g.moveTo(-6, 0); g.lineTo(6, 0); } else { g.moveTo(-5, 7); g.lineTo(5, 3); }
    g.stroke(); g.restore();
  }
  // ngôi sao tám cánh nối hai vòng trong
  g.lineWidth = 2.5; g.beginPath();
  for (let i = 0; i <= 16; i++){ const a = i / 16 * Math.PI * 2, r = (i % 2 ? 0.17 : 0.3) * s; i ? g.lineTo(c + Math.cos(a) * r, c + Math.sin(a) * r) : g.moveTo(c + Math.cos(a) * r, c + Math.sin(a) * r); }
  g.stroke();
  for (let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2; g.beginPath(); g.arc(c + Math.cos(a) * 0.36 * s, c + Math.sin(a) * 0.36 * s, 7, 0, Math.PI * 2); g.stroke(); }
});
// cánh lông vũ: gốc cánh ở góc dưới trái, lông chính xoè ra phải và lên trên, lông phủ ngắn ở gốc
const wingTex = () => _wing ??= canvasTex(512, (g, s) => {
  const ox = s * 0.04, oy = s * 0.62;
  const feather = (ang: number, len: number, wid: number, alpha: number) => {
    g.save(); g.translate(ox, oy); g.rotate(ang);
    const grd = g.createLinearGradient(0, 0, len, 0);
    grd.addColorStop(0, `rgba(255,255,255,${alpha})`); grd.addColorStop(0.75, `rgba(255,255,255,${alpha * 0.85})`); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.beginPath(); g.moveTo(0, 0);
    g.quadraticCurveTo(len * 0.5, -wid, len, -wid * 0.15); g.quadraticCurveTo(len * 0.55, wid * 0.55, 0, 0); g.fill();
    g.strokeStyle = `rgba(255,255,255,${alpha})`; g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, 0); g.lineTo(len * 0.95, -wid * 0.2); g.stroke();   // sống lông
    g.restore();
  };
  for (let i = 0; i < 12; i++){ const k = i / 11; feather(-1.25 + k * 1.15, s * (0.95 - k * 0.42), s * 0.07, 0.75); }        // lông chính
  for (let i = 0; i < 10; i++){ const k = i / 9; feather(-1.15 + k * 1.05, s * (0.48 - k * 0.2), s * 0.06, 0.9); }          // lông phủ
  for (let i = 0; i < 8; i++){ const k = i / 7; feather(-1.0 + k * 0.9, s * (0.24 - k * 0.06), s * 0.05, 1); }             // lông tơ gốc cánh
});
const dotTex = () => _dot ??= canvasTex(64, (g, s) => {
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.3, 'rgba(255,255,255,0.6)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, s, s);
});

/* ------------------------------------------------------------ chất liệu */
const add = (map: THREE.Texture | null, color: number, opacity = 1) => new THREE.MeshBasicMaterial({ map, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
const PLANE = new THREE.PlaneGeometry(1, 1);
// cột sáng: sáng ở chân, mờ dần lên trên, vạch sáng chạy lên
const COLUMN_GEO = new THREE.CylinderGeometry(0.5, 0.42, 1, 32, 1, true).translate(0, 0.5, 0);
function columnMat(color: number, strength: number){
  return new THREE.ShaderMaterial({
    uniforms: { uT: TIME, uC: { value: new THREE.Color(color) }, uS: { value: strength } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform float uT; uniform vec3 uC; uniform float uS; varying vec2 vUv;
      void main(){ float h = clamp(vUv.y, 0.0, 1.0); float a = pow(max(1.0 - h, 0.0001), 2.2) * 0.55;
        a += smoothstep(0.92, 1.0, fract(h * 3.0 - uT * 0.8)) * (1.0 - h) * 0.6;          // vạch sáng chạy lên
        a *= 0.75 + 0.25 * sin(vUv.x * 62.83 + uT * 2.0);
        gl_FragColor = vec4(uC * a * uS, a * uS); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false,
  });
}
// hạt bay lên quanh người (bụi sáng, lửa, lông vũ sáng): chuyển động tính hết trong shader, không tốn CPU
function motes(n: number, color: number, o: { r?: number; h?: number; speed?: number; size?: number; spin?: number; fire?: boolean } = {}){
  const g = new THREE.BufferGeometry(), seed = new Float32Array(n * 3);
  for (let i = 0; i < n; i++){ seed[i * 3] = Math.random() * Math.PI * 2; seed[i * 3 + 1] = Math.random(); seed[i * 3 + 2] = Math.random(); }
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
  g.setAttribute('seed', new THREE.BufferAttribute(seed, 3));
  const m = new THREE.ShaderMaterial({
    uniforms: { uT: TIME, uC: { value: new THREE.Color(color) }, uR: { value: o.r ?? 0.5 }, uH: { value: o.h ?? 2 }, uV: { value: o.speed ?? 0.35 }, uS: { value: o.size ?? 0.05 }, uW: { value: o.spin ?? 0.6 }, uF: { value: o.fire ? 1 : 0 }, map: { value: dotTex() } },
    vertexShader: `attribute vec3 seed; uniform float uT, uR, uH, uV, uS, uW, uF; varying float vA; varying float vK;
      void main(){ float k = fract(seed.y + uT * uV * (0.7 + seed.z * 0.6)); vK = k;
        float a = seed.x + uT * uW * (seed.z - 0.5) * 2.0, r = uR * (0.55 + seed.z * 0.6) * (1.0 - uF * k * 0.7);
        vec3 p = vec3(cos(a) * r, k * uH, sin(a) * r);
        vA = sin(3.14159 * k);
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = uS * (1.0 + uF * (1.0 - k) * 1.5) * 900.0 / -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uC; uniform float uF; uniform sampler2D map; varying float vA; varying float vK;
      void main(){ vec4 t = texture2D(map, gl_PointCoord); vec3 c = mix(uC, mix(vec3(1.0, 0.9, 0.5), vec3(1.0, 0.15, 0.05), vK), uF);
        gl_FragColor = vec4(c * t.a * vA, t.a * vA); }`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false,
  });
  const p = new THREE.Points(g, m); p.frustumCulled = false; p.renderOrder = 7;
  return p;
}

/* ------------------------------------------------------------ rồng thần */
const DRAGON_N = 46;
const SEG_GEO = new THREE.SphereGeometry(1, 10, 8), FIN_GEO = new THREE.ConeGeometry(0.5, 1, 4).rotateX(-Math.PI / 2);
class Dragon {
  readonly group = new THREE.Group();
  private body: THREE.InstancedMesh; private glow: THREE.InstancedMesh; private fins: THREE.InstancedMesh;
  private head = new THREE.Group();
  private m = new THREE.Matrix4(); private q = new THREE.Quaternion(); private s = new THREE.Vector3(); private p = new THREE.Vector3(); private n = new THREE.Vector3();
  private pts: THREE.Vector3[] = Array.from({ length: DRAGON_N + 1 }, () => new THREE.Vector3());
  constructor(h: number){
    const scale = h / 1.7;
    // thân vảy ngọc lục bảo ánh vàng, quầng sáng ngoài cộng sáng, vây lưng vàng
    this.body = new THREE.InstancedMesh(SEG_GEO, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x0a7a58, emissiveIntensity: 0.45, roughness: 0.35, metalness: 0.6 }), DRAGON_N);
    this.glow = new THREE.InstancedMesh(SEG_GEO, add(null, 0x20a080, 0.12), DRAGON_N);
    this.fins = new THREE.InstancedMesh(FIN_GEO, new THREE.MeshStandardMaterial({ color: 0xffc23a, emissive: 0xffa020, emissiveIntensity: 1.2, metalness: 0.8, roughness: 0.3 }), DRAGON_N);
    const col = new THREE.Color();
    for (let i = 0; i < DRAGON_N; i++){ col.setHSL(0.45 - i / DRAGON_N * 0.1, 0.9, 0.55 - i / DRAGON_N * 0.15); this.body.setColorAt(i, col); }
    for (const m of [this.body, this.glow, this.fins]){ m.frustumCulled = false; this.group.add(m); }
    // đầu rồng: mõm dài, hai sừng vàng, mắt đỏ rực, hai râu
    const skin = this.body.material as THREE.Material, gold = this.fins.material as THREE.Material;
    const skull = new THREE.Mesh(SEG_GEO, skin); skull.scale.set(0.13, 0.11, 0.17); this.head.add(skull);
    const snout = new THREE.Mesh(SEG_GEO, skin); snout.scale.set(0.08, 0.06, 0.13); snout.position.set(0, -0.02, 0.15); this.head.add(snout);
    for (const sx of [-1, 1]){
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.22, 6), gold); horn.position.set(sx * 0.07, 0.11, -0.08); horn.rotation.set(-0.9, 0, sx * -0.3); this.head.add(horn);
      const eye = new THREE.Mesh(SEG_GEO, add(null, 0xff3020)); eye.scale.setScalar(0.022); eye.position.set(sx * 0.07, 0.04, 0.09); this.head.add(eye);
      const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.001, 0.32, 4).rotateX(Math.PI / 2).translate(0, 0, 0.16), gold); wh.position.set(sx * 0.05, -0.04, 0.22); wh.rotation.set(0.3, sx * 0.6, 0); this.head.add(wh);
    }
    const halo = new THREE.Mesh(PLANE, add(dotTex(), 0x40ffd0, 0.7)); halo.scale.setScalar(0.7); this.head.add(halo);
    this.group.add(this.head);
    this.group.scale.setScalar(scale);
  }
  // thân cuộn xoắn ốc quanh người từ chân (đuôi) lên vai (đầu), bơi vòng quanh, uốn lượn lên xuống
  update(t: number){
    const N = DRAGON_N;
    for (let i = 0; i <= N; i++){
      const s = i / N, u = t * 0.8 - s * 4.6;
      const r = 0.78 + 0.12 * Math.sin(u * 2 + t), y = 0.25 + (1 - s) * 1.55 + 0.12 * Math.sin(t * 2.1 + s * 9);
      this.pts[i].set(Math.cos(u) * r, y, Math.sin(u) * r);
    }
    for (let i = 0; i < N; i++){
      const a = this.pts[i], b = this.pts[i + 1], s = i / N, w = 0.085 * (1 - s * 0.75) * (i < 2 ? 0.9 : 1);
      this.n.subVectors(a, b).normalize(); this.q.setFromUnitVectors(Z, this.n);
      this.p.copy(a);
      this.m.compose(this.p, this.q, this.s.set(w, w, w * 1.6)); this.body.setMatrixAt(i, this.m);
      this.m.compose(this.p, this.q, this.s.set(w * 1.7, w * 1.7, w * 2.2)); this.glow.setMatrixAt(i, this.m);
      // vây lưng cứ hai đốt một chiếc, dựng lên trên lưng
      const fw = i % 2 ? 0 : w * 0.9;
      this.m.compose(this.p.clone().add(new THREE.Vector3(0, w * 0.9, 0)), this.q, this.s.set(fw * 0.4, fw, fw * 1.4)); this.fins.setMatrixAt(i, this.m);
    }
    for (const m of [this.body, this.glow, this.fins]) m.instanceMatrix.needsUpdate = true;
    this.head.position.copy(this.pts[0]);
    this.head.lookAt(this.group.localToWorld(this.p.copy(this.pts[0]).multiplyScalar(2).sub(this.pts[1])));
  }
  dispose(){ for (const m of [this.body, this.glow, this.fins]) m.dispose(); this.head.traverse(o => { const x = o as THREE.Mesh; if (x.isMesh && x.geometry !== SEG_GEO && x.geometry !== PLANE) x.geometry.dispose(); }); }
}
const Z = new THREE.Vector3(0, 0, 1);

/* ------------------------------------------------------------ hào quang một người */
// Nơi gắn: gốc người (đi, xoay theo người) và, nếu có, xương lưng (cho cánh)
export interface AuraHost { root: THREE.Object3D; attach(obj: THREE.Object3D, slot: 'spine', offset?: THREE.Vector3, owned?: boolean): boolean; detach(obj: THREE.Object3D): void; headWorld(out?: THREE.Vector3): THREE.Vector3 }

export class Aura {
  readonly lv: number;
  private host: AuraHost;
  private group = new THREE.Group();
  private spinners: { o: THREE.Object3D; w: number }[] = [];
  private pulses: { m: THREE.Material & { opacity: number }; base: number; f: number }[] = [];
  private halo: THREE.Object3D | null = null;
  private wings: { root: THREE.Object3D; l: THREE.Object3D; r: THREE.Object3D; attached: boolean } | null = null;
  private crystals: THREE.Object3D[] = [];
  private dragon: Dragon | null = null;
  private mats: THREE.Material[] = [];
  private geos: THREE.BufferGeometry[] = [];
  private h: number;

  constructor(host: AuraHost, lv: number, height: number){
    this.host = host; this.lv = lv; this.h = height;
    const L = levelInfo(lv), c = L.color;
    host.root.add(this.group);
    const disc = (map: THREE.Texture, color: number, size: number, op: number, spin: number, y = 0.015) => {
      const m = add(map, color, op); this.mats.push(m);
      const o = new THREE.Mesh(PLANE, m); o.rotation.x = -Math.PI / 2; o.position.y = y; o.scale.setScalar(size); o.renderOrder = 6;
      this.group.add(o); if (spin) this.spinners.push({ o, w: spin }); this.pulses.push({ m, base: op, f: 1.5 + Math.random() });
      return o;
    };
    const pts = (p: THREE.Points) => { this.group.add(p); this.mats.push(p.material as THREE.Material); this.geos.push(p.geometry); };
    const column = (color: number, strength: number, r: number, hh: number) => {
      const m = columnMat(color, strength); this.mats.push(m);
      const o = new THREE.Mesh(COLUMN_GEO, m); o.scale.set(r * 2, hh, r * 2); o.renderOrder = 6; this.group.add(o);
    };
    // vòng dưới chân (mọi cấp), to và sáng dần theo cấp
    if (lv <= 4) disc(ringTex(), c, 1.1 + lv * 0.12, 0.45 + lv * 0.08, 0.25);
    if (lv === 3) disc(ringTex(), 0xffffff, 0.9, 0.5, -0.5, 0.02);
    if (lv >= 5){ disc(runeTex(), c, 1.7 + (lv - 5) * 0.08, 0.9, 0.35); disc(ringTex(), c, 2.1, 0.5, 0, 0.012); }
    if (lv >= 7) disc(runeTex(), 0xffffff, 1.0, 0.45, -0.6, 0.02);
    if (lv === 9){ disc(runeTex(), 0xffd060, 2.3, 0.55, -0.2, 0.01); }
    if (lv === 10){ disc(runeTex(), 0xffd060, 2.6, 0.6, -0.15, 0.01); }
    // bụi sáng, lấp lánh, lửa
    if (lv === 2) pts(motes(18, c, { r: 0.45, h: 1.4, speed: 0.25, size: 0.035 }));
    if (lv === 3) pts(motes(28, 0xffffff, { r: 0.5, h: 1.9, speed: 0.3, size: 0.04, spin: 1.2 }));
    if (lv === 4 || lv === 5) pts(motes(36, c, { r: 0.5, h: 2.2, speed: 0.35, size: 0.045 }));
    if (lv === 6 || lv === 9) pts(motes(lv === 9 ? 90 : 70, 0xff6a20, { r: 0.55, h: lv === 9 ? 2.1 : 1.6, speed: 0.75, size: 0.07, spin: 0.4, fire: true }));
    if (lv === 7) pts(motes(40, c, { r: 0.6, h: 2.2, speed: 0.3, size: 0.045, spin: 1.5 }));
    if (lv === 8) pts(motes(40, 0xfff0c0, { r: 0.7, h: 2.4, speed: 0.18, size: 0.06, spin: 0.3 }));
    if (lv === 10) pts(motes(60, 0x40ffd0, { r: 0.9, h: 2.4, speed: 0.3, size: 0.05, spin: 0.8 }));
    // cột sáng
    if (lv >= 4 && lv !== 8 && lv !== 10) column(lv === 4 ? c : lv === 5 ? 0xffc23a : c, lv >= 6 ? 0.8 : 0.6, 0.5, 2.3 * height / 1.7);
    if (lv === 10) column(0x40ffd0, 0.45, 0.62, 2.6 * height / 1.7);
    // vầng hào quang trên đầu
    if (lv >= 5){
      const m = add(ringTex(), lv === 10 ? 0x80fff0 : lv === 7 ? 0xff90ff : lv === 6 || lv === 9 ? 0xffa040 : 0xffe08a, 1); this.mats.push(m);
      const halo = new THREE.Mesh(PLANE, m); halo.rotation.x = -Math.PI / 2 + 0.25; halo.scale.setScalar(0.42); halo.renderOrder = 7;
      this.group.add(halo); this.halo = halo; this.pulses.push({ m, base: 1, f: 2 });
    }
    // pha lê bay quanh người
    if (lv === 7){
      const g = new THREE.OctahedronGeometry(0.07, 0); this.geos.push(g);
      const m = new THREE.MeshStandardMaterial({ color: 0xf0c0ff, emissive: 0xb040ff, emissiveIntensity: 1.4, metalness: 0.2, roughness: 0.05, transparent: true, opacity: 0.9 }); this.mats.push(m);
      for (let i = 0; i < 6; i++){ const o = new THREE.Mesh(g, m); o.scale.set(1, 1.8, 1); this.group.add(o); this.crystals.push(o); }
    }
    // cánh: thiên thần (trắng vàng) hoặc phượng hoàng (lửa, hai lớp)
    if (lv === 8 || lv === 9){
      const root = new THREE.Group(), l = new THREE.Group(), r = new THREE.Group();
      const layer = (side: THREE.Group, color: number, op: number, k: number) => {
        const m = add(wingTex(), color, op); this.mats.push(m);
        const w = new THREE.Mesh(PLANE, m); w.scale.set(1.25 * k, 1.25 * k, 1); w.position.set(0.6 * k, 0.12 * k, 0); w.renderOrder = 7;
        side.add(w); return m;
      };
      if (lv === 8){ layer(l, 0xfff4d8, 0.95, 1); layer(r, 0xfff4d8, 0.95, 1); this.pulses.push({ m: layer(l, 0xffc860, 0.35, 1.08) as THREE.MeshBasicMaterial, base: 0.35, f: 1.2 }); layer(r, 0xffc860, 0.35, 1.08); }
      else {
        for (const s of [l, r]){ layer(s, 0xffb030, 1, 1); this.pulses.push({ m: layer(s, 0xff3010, 0.7, 1.15) as THREE.MeshBasicMaterial, base: 0.7, f: 7 }); }
      }
      r.scale.x = -1;               // cánh phải là ảnh gương cánh trái (gốc cánh ở giữa lưng)
      l.position.x = 0.05; r.position.x = -0.05;
      root.add(l, r);
      const attached = host.attach(root, 'spine', new THREE.Vector3(0, 0.22, -0.16), false);
      if (!attached){ root.position.set(0, height * 0.72, -0.16); this.group.add(root); }
      // cánh mở ra sau lưng: mặt cánh hướng ra sau, xoè chéo lên
      l.rotation.set(0, Math.PI, 0); r.rotation.set(0, Math.PI, 0);
      this.wings = { root, l, r, attached };
    }
    if (lv === 10){ this.dragon = new Dragon(height); this.group.add(this.dragon.group); }
  }

  private _v = new THREE.Vector3();
  update(t: number){
    for (const s of this.spinners) s.o.rotation.z = t * s.w;
    for (const p of this.pulses) p.m.opacity = p.base * (0.78 + 0.22 * Math.sin(t * p.f));
    if (this.halo){
      this.host.root.updateWorldMatrix(true, false);
      const h = this.host.headWorld(this._v);
      this.group.worldToLocal(h);
      this.halo.position.set(h.x, h.y + 0.3 + Math.sin(t * 2) * 0.02, h.z - 0.03);
    }
    if (this.wings){
      // vỗ cánh chậm, hai cánh lệch pha chút cho tự nhiên; phượng hoàng vỗ nhanh, mạnh hơn
      const f = this.lv === 9 ? 2.6 : 1.6, amp = this.lv === 9 ? 0.32 : 0.22;
      const a = Math.sin(t * f) * amp;
      this.wings.l.rotation.y = Math.PI - 0.55 - a; this.wings.r.rotation.y = Math.PI + 0.55 + a;
      this.wings.l.rotation.z = 0.25 + a * 0.4; this.wings.r.rotation.z = -0.25 - a * 0.4;
    }
    this.crystals.forEach((o, i) => {
      const a = t * 1.1 + i / 6 * Math.PI * 2, r = 0.62 + Math.sin(t * 1.7 + i) * 0.06;
      o.position.set(Math.cos(a) * r, this.h * 0.55 + Math.sin(t * 2 + i * 1.3) * 0.25, Math.sin(a) * r);
      o.rotation.y = t * 2 + i;
    });
    this.dragon?.update(t);
  }

  dispose(){
    this.group.removeFromParent();
    if (this.wings){ if (this.wings.attached) this.host.detach(this.wings.root); this.wings.root.removeFromParent(); }
    this.dragon?.dispose();
    for (const m of this.mats) m.dispose();
    for (const g of this.geos) g.dispose();
  }
}
