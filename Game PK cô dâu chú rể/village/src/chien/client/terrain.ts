import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { COURTYARD, FIELD, LAKE, LaneManager, OBSTACLES } from '../battle/LaneManager.ts';
import type { LaneId } from '../types.ts';
import { shared, waterMaterial } from '../../client/materials.ts';
import type { HD } from './hd.ts';
import { buildTree } from './hd.ts';

// Thế giới quanh sân cưới: cánh đồng cỏ khô vàng xen mảng xanh, đồi thoải dần lên núi, hồ nước có bờ đá,
// rừng thông tán dù, bách, bụi cây, đá tảng, cỏ lay theo gió, núi xa mờ sương, trời hoàng hôn.
// Chiến trường (ba làn, hai căn cứ, sân cưới) luôn phẳng ở độ cao 0 để mô phỏng chỉ cần tính trên mặt phẳng.

/* ------------------------------------------------------------ nhiễu */
function hash2(x: number, y: number){ let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263); h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
function vnoise(x: number, y: number){
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
export function fbm(x: number, y: number, oct = 5){ let s = 0, a = 0.5, f = 1, n = 0; for (let i = 0; i < oct; i++){ s += a * vnoise(x * f, y * f); n += a; a *= 0.5; f *= 2.03; } return s / n; }
const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const rand = (seed: number) => () => ((seed = (Math.imul(seed, 16807) + 11) % 2147483647) & 0x7fffffff) / 2147483647;

// Khoảng cách tới vùng phải giữ phẳng (chiến trường + sân cưới + dải sau đình)
function flatDist(x: number, z: number){
  const r = (minX: number, maxX: number, minZ: number, maxZ: number) => Math.hypot(Math.max(minX - x, 0, x - maxX), Math.max(minZ - z, 0, z - maxZ));
  return Math.min(r(FIELD.minX - 6, FIELD.maxX + 6, FIELD.minZ - 5, FIELD.maxZ + 3), r(-32, 32, -20, 0));
}
// Độ cao mặt đất: phẳng ở chiến trường, ra xa thì đồi nhấp nhô cao dần, có lòng hồ trũng
export function heightAt(x: number, z: number){
  const d = flatDist(x, z);
  let h = 0;
  if (d > 0){
    const k = smooth(0, 38, d);
    h = k * (fbm(x * 0.012 + 3, z * 0.012 - 7) * 26 - 6) + smooth(30, 160, d) * fbm(x * 0.006, z * 0.006, 3) * 40 + k * Math.pow(fbm(x * 0.05, z * 0.05, 3), 2) * 5;
  }
  const ld = Math.hypot(x - LAKE.x, z - LAKE.z);
  if (ld < LAKE.r + 10){ const t = smooth(LAKE.r + 10, LAKE.r - 4, ld); h = h * (1 - t) - t * 2.2; }
  return h;
}
// Khoảng cách tới đường làn gần nhất (đất mòn thành lối đi)
const lanes = ([0, 1, 2] as LaneId[]).map(l => LaneManager.path(l));
function laneDist(x: number, z: number){
  let best = Infinity;
  for (const pts of lanes) for (let i = 1; i < pts.length; i++){
    const a = pts[i - 1], b = pts[i], dx = b.x - a.x, dz = b.z - a.z, L2 = dx * dx + dz * dz || 1;
    const k = Math.max(0, Math.min(1, ((x - a.x) * dx + (z - a.z) * dz) / L2));
    best = Math.min(best, Math.hypot(x - a.x - dx * k, z - a.z - dz * k));
  }
  return best;
}

/* ------------------------------------------------------------ vân bề mặt */
function canvasTex(size: number, draw: (g: CanvasRenderingContext2D, r: () => number) => void, repeat = 1, seed = 1){
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d')!;
  draw(g, rand(seed));
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 8;
  return t;
}
// Vân cỏ khô: hàng nghìn nét cỏ nhỏ sáng tối đan nhau, nhân với màu đỉnh của địa hình
function grassDetail(repeat: number){
  return canvasTex(512, (g, r) => {
    g.fillStyle = '#f0f0f0'; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 26000; i++){
      const x = r() * 512, y = r() * 512, l = 3 + r() * 9, a = -Math.PI / 2 + (r() - 0.5) * 1.2, v = 175 + r() * 80 | 0;
      g.strokeStyle = `rgba(${v},${v},${v * 0.92 | 0},${0.35 + r() * 0.4})`; g.lineWidth = 0.6 + r() * 1.1;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
    }
    for (let i = 0; i < 900; i++){ const v = 110 + r() * 60 | 0; g.fillStyle = `rgba(${v},${v - 10},${v - 25},0.5)`; g.beginPath(); g.arc(r() * 512, r() * 512, 0.8 + r() * 2.2, 0, 7); g.fill(); }
  }, repeat, 5);
}

/* ------------------------------------------------------------ thế giới */
export class World {
  readonly group = new THREE.Group();
  readonly sunDir = new THREE.Vector3(-0.72, 0.36, -0.6).normalize();
  private grassMat: THREE.MeshStandardMaterial;

  constructor(quality: 'high' | 'low'){
    const hi = quality === 'high';
    this.terrainMesh = this.terrain(hi ? 280 : 180);
    this.group.add(this.sky(), this.terrainMesh, this.water(), this.mountains());
    this.grassMat = this.grassMaterial();
    this.tufts = this.grass(hi ? 6000 : 2500);
    this.treeMeshes = this.trees(hi);
    this.rockMesh = this.rocks();
    this.group.add(this.tufts, ...this.treeMeshes, this.rockMesh);
  }
  private terrainMesh: THREE.Mesh; private tufts: THREE.InstancedMesh; private treeMeshes: THREE.InstancedMesh[]; private rockMesh: THREE.InstancedMesh;

  // Có tài nguyên HD (npm run assets): mặt đất trộn vân thật, cây dựng từ ảnh lá và vỏ thật, đá và bụi quét 3D,
  // đặt đúng những chỗ của bản dựng sẵn (bản dựng sẵn được gỡ ra). detail: 0..1 theo mức đồ họa (Medium ít bụi cỏ hơn).
  // Thêm cây HD ở các vị trí cho sẵn (thay cây khối của sân cưới gốc): s là cỡ cây
  plantTrees(hd: HD, spots: { x: number; z: number; s: number; tall?: boolean }[]){
    const mk = (list: typeof spots, kind: string, shape: 'umbrella' | 'tall', seed: number) => list.length ? treeGroup(hd, kind, shape, list.map(p => new THREE.Matrix4().compose(new THREE.Vector3(p.x, heightAt(p.x, p.z) - 0.2, p.z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, p.x * 1.7, 0)), new THREE.Vector3().setScalar(p.s))), seed) : null;
    const a = mk(spots.filter(p => !p.tall), 'tree2', 'umbrella', 23) ?? mk(spots.filter(p => !p.tall), 'tree1', 'umbrella', 23), b = mk(spots.filter(p => p.tall), 'tree3', 'tall', 29);
    for (const g of [a, b]) if (g) this.group.add(g);
    return !!(a || b);
  }

  applyHD(hd: HD, detail: number){
    const T = (k: string) => hd.tex.get(k);
    if (T('drygrass') && T('grass') && T('dirt') && T('rock') && T('sand')) this.terrainMesh.material = splatMaterial(hd);
    this.tufts.visible = false;
    const mats = (m: THREE.InstancedMesh) => { const out: THREE.Matrix4[] = []; for (let i = 0; i < m.count; i++){ const x = new THREE.Matrix4(); m.getMatrixAt(i, x); out.push(x); } return out; };
    const [umbrella, cypress, bush] = this.treeMeshes;
    const swap = (old: THREE.InstancedMesh, add: THREE.Object3D | null) => { if (!add) return; old.visible = false; this.group.add(add); };
    swap(umbrella, treeGroup(hd, 'tree1', 'umbrella', mats(umbrella), 7) ?? treeGroup(hd, 'tree2', 'umbrella', mats(umbrella), 7));
    swap(cypress, treeGroup(hd, 'tree3', 'tall', mats(cypress), 11) ?? treeGroup(hd, 'tree2', 'tall', mats(cypress), 11));
    const bm = mats(bush), half = Math.ceil(bm.length / 2);
    const shrubs = new THREE.Group();
    for (const [k, list, rad] of [['shrub2', bm.slice(0, half), 1.3], ['shrub1', bm.slice(half), 1.2]] as const){ const g = hd.models.get(k); if (g) shrubs.add(instanceModel(g, list.filter((_, i) => i < 400 * detail), rad)); }
    if (shrubs.children.length) swap(bush, shrubs);
    // đá: tảng lớn và cụm đá rêu thay khối đá dựng sẵn
    const rm = mats(this.rockMesh), rocks = new THREE.Group();
    const b2 = hd.models.get('boulder2'), rs = hd.models.get('rocks');
    if (b2) rocks.add(instanceModel(b2, rm.filter((_, i) => i % 3 !== 2), 1.05));
    if (rs) rocks.add(instanceModel(rs, rm.filter((_, i) => i % 3 === 2), 1.3));
    if (rocks.children.length) swap(this.rockMesh, rocks);
    // cỏ cao và dương xỉ quét 3D rải ngoài chiến trường, gần hồ và chân đồi
    const fern = hd.models.get('fern'), grass = hd.models.get('grass');
    const r = rand(91), list: THREE.Matrix4[] = [], list2: THREE.Matrix4[] = [];
    for (let t = 0; list.length + list2.length < 260 * detail && t < 6000; t++){
      const x = (r() - 0.5) * 240, z = -50 + r() * 150; if (!this.free(x, z, 10) || flatDist(x, z) < 8) continue;
      const m = new THREE.Matrix4().compose(new THREE.Vector3(x, heightAt(x, z) - 0.05, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, r() * 6.28, 0)), new THREE.Vector3().setScalar(0.8 + r() * 0.8));
      (r() < 0.5 ? list : list2).push(m);
    }
    if (fern) this.group.add(instanceModel(fern, list, 0.8));
    if (grass) this.group.add(instanceModel(grass, list2, 0.9));
  }

  // Bầu trời hoàng hôn: xanh đậm trên cao, cam vàng sát chân trời, quầng sáng quanh mặt trời, mây mỏng
  private sky(){
    const m = new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false,
      uniforms: { uSun: { value: this.sunDir }, uTime: shared.time },
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `
        varying vec3 vD; uniform vec3 uSun; uniform float uTime;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
        float fb(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ s += a * n(p); p *= 2.1; a *= 0.5; } return s; }
        void main(){
          vec3 d = normalize(vD); float y = max(d.y, -0.1);
          vec3 zen = vec3(0.30, 0.42, 0.66), mid = vec3(0.62, 0.66, 0.74), hor = vec3(0.98, 0.78, 0.52);
          vec3 c = mix(hor, mid, smoothstep(0.0, 0.22, y)); c = mix(c, zen, smoothstep(0.2, 0.75, y));
          float s = max(dot(d, uSun), 0.0);
          c += vec3(1.0, 0.62, 0.28) * pow(s, 6.0) * 0.55 + vec3(1.0, 0.85, 0.6) * pow(s, 60.0) * 0.8 + vec3(1.0, 0.95, 0.85) * smoothstep(0.9993, 0.9998, s) * 2.0;
          // mây tầng mỏng, sáng viền phía mặt trời
          vec2 cp = d.xz / max(0.08, d.y + 0.12) * 1.6 + vec2(uTime * 0.004, 0.0);
          float cl = smoothstep(0.52, 0.78, fb(cp)) * smoothstep(0.02, 0.18, y) * (1.0 - smoothstep(0.55, 0.9, y));
          vec3 cc = mix(vec3(0.62, 0.6, 0.66), vec3(1.0, 0.8, 0.6), pow(s, 3.0) * 0.8 + 0.2);
          c = mix(c, cc, cl * 0.75);
          c = mix(c, vec3(0.78, 0.68, 0.58), smoothstep(0.02, -0.08, d.y));
          gl_FragColor = vec4(c, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
    });
    const s = new THREE.Mesh(new THREE.SphereGeometry(1400, 48, 24), m); s.renderOrder = -10; s.frustumCulled = false;
    return s;
  }

  // Địa hình: lưới 560 m, màu từng đỉnh pha giữa cỏ khô, cỏ xanh, đất lối đi, cát bờ hồ, đá sườn dốc
  private terrain(seg: number){
    const size = 560, g = new THREE.PlaneGeometry(size, size, seg, seg).rotateX(-Math.PI / 2);
    g.translate(0, 0, 10);
    const pos = g.attributes.position as THREE.BufferAttribute, cols = new Float32Array(pos.count * 3), splat = new Float32Array(pos.count * 4);
    const C = (h: number) => new THREE.Color(h);
    const dry = C(0xd8b264), straw = C(0xead08e), green = C(0xa6b45e), dgreen = C(0x7d9244), dirt = C(0xb08e62), rock = C(0x9a9184), sand = C(0xdcc79c), tmp = new THREE.Color();
    for (let i = 0; i < pos.count; i++){
      const x = pos.getX(i), z = pos.getZ(i), h = heightAt(x, z);
      pos.setY(i, h);
      const e = 1.2, slope = Math.hypot(heightAt(x + e, z) - heightAt(x - e, z), heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e);
      const big = fbm(x * 0.018 + 11, z * 0.018 + 4, 4), fine = fbm(x * 0.11, z * 0.11, 3);
      tmp.copy(dry).lerp(straw, smooth(0.35, 0.75, fine));
      tmp.lerp(green, smooth(0.56, 0.76, big) * 0.7);
      tmp.lerp(dgreen, smooth(0.7, 0.88, big) * 0.45);
      const ld = laneDist(x, z);
      const wDirt = ld < 3.2 && flatDist(x, z) < 1 ? smooth(3.2, 0.6, ld) * (0.65 + fine * 0.3) : 0;
      tmp.lerp(dirt, wDirt);
      const lk = Math.hypot(x - LAKE.x, z - LAKE.z), wSand = lk < LAKE.r + 5 ? smooth(LAKE.r + 5, LAKE.r + 0.5, lk) : 0;
      tmp.lerp(sand, wSand);
      const wRock = smooth(0.45, 0.9, slope);
      tmp.lerp(rock, wRock);
      // trọng số trộn vân thật (đất, đá, cát, cỏ xanh) cho chế độ HD
      splat[i * 4] = wDirt; splat[i * 4 + 1] = wRock; splat[i * 4 + 2] = wSand; splat[i * 4 + 3] = smooth(0.56, 0.8, big) * 0.75;
      tmp.multiplyScalar(0.92 + fbm(x * 0.4, z * 0.4, 2) * 0.16);
      cols[i * 3] = tmp.r; cols[i * 3 + 1] = tmp.g; cols[i * 3 + 2] = tmp.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(cols, 3));
    g.setAttribute('splat', new THREE.BufferAttribute(splat, 4));
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, map: grassDetail(140), roughness: 0.97, metalness: 0 }));
    m.receiveShadow = true;
    m.position.y = -0.025;                                         // dưới mặt sân lát đá và lối đi một chút
    return m;
  }

  private water(){
    const g = new THREE.Group();
    const w = new THREE.Mesh(new THREE.CircleGeometry(LAKE.r + 2, 64).rotateX(-Math.PI / 2), waterMaterial(0x2f5a66, 0x7fa9a3));
    w.position.set(LAKE.x, -0.55, LAKE.z); g.add(w);
    return g;
  }

  // Núi xa: vành đai quanh bản đồ, đỉnh nhấp nhô, màu xanh xám, sương làm mờ dần
  private mountains(){
    const seg = 220, g = new THREE.BufferGeometry(), v: number[] = [], idx: number[] = [], col: number[] = [];
    const near = new THREE.Color(0x6f7a62), far = new THREE.Color(0x7f8aa6);
    for (let ring = 0; ring < 2; ring++){
      const base = v.length / 3, R0 = ring ? 620 : 420, R1 = R0 + 160;
      for (let i = 0; i <= seg; i++){
        const a = i / seg * Math.PI * 2, n = fbm(Math.cos(a) * 3 + ring * 9, Math.sin(a) * 3, 5), hgt = (ring ? 110 : 55) * Math.pow(n, 1.6) + 15;
        const c = ring ? far : near;
        v.push(Math.cos(a) * R0, -2, 10 + Math.sin(a) * R0, Math.cos(a) * (R0 + 60), hgt, 10 + Math.sin(a) * (R0 + 60), Math.cos(a) * R1, -2, 10 + Math.sin(a) * R1);
        for (let k = 0; k < 3; k++) col.push(c.r, c.g, c.b);
        if (i < seg) for (const [p, q] of [[0, 1], [1, 2]]){ const A = base + i * 3 + p, B = base + i * 3 + q, Cc = A + 3, D = B + 3; idx.push(A, Cc, B, B, Cc, D); }
      }
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3)); g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3)); g.setIndex(idx); g.computeVertexNormals();
    return new THREE.Mesh(g, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, flatShading: true, side: THREE.DoubleSide }));
  }

  /* ---------------------------------------------------------- cây cỏ, đá */
  // chỗ được trồng: ngoài chiến trường, ngoài lối đi, ngoài hồ
  private free(x: number, z: number, clear = 3){
    if (flatDist(x, z) < clear && x > FIELD.minX - 8 && x < FIELD.maxX + 8 && z > FIELD.minZ - 6 && z < FIELD.maxZ + 4) return false;
    if (x > COURTYARD.minX - 2 && x < COURTYARD.maxX + 2 && z > -24 && z < COURTYARD.maxZ + 2) return false;
    if (Math.hypot(x - LAKE.x, z - LAKE.z) < LAKE.r + 1.5) return false;
    return true;
  }
  private grassMaterial(){
    const tex = canvasTex(256, (g, r) => {
      g.clearRect(0, 0, 256, 256);
      for (let i = 0; i < 70; i++){
        const x = 20 + r() * 216, w = 2 + r() * 4, h = 120 + r() * 130, bend = (r() - 0.5) * 50, v = 170 + r() * 80 | 0;
        const gr = g.createLinearGradient(0, 256, 0, 256 - h); gr.addColorStop(0, `rgb(${v * 0.8 | 0},${v * 0.74 | 0},${v * 0.5 | 0})`); gr.addColorStop(1, `rgb(${v},${v * 0.93 | 0},${v * 0.7 | 0})`);
        g.fillStyle = gr; g.beginPath(); g.moveTo(x - w, 256); g.quadraticCurveTo(x + bend * 0.4, 256 - h * 0.6, x + bend, 256 - h); g.quadraticCurveTo(x + bend * 0.4 + w * 0.3, 256 - h * 0.6, x + w, 256); g.fill();
      }
    }, 1, 9);
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    const m = new THREE.MeshStandardMaterial({ map: tex, alphaTest: 0.45, side: THREE.DoubleSide, roughness: 0.95 });
    m.onBeforeCompile = sh => {
      sh.uniforms.uTime = shared.time;
      sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
        vec3 transformed = vec3(position);
        vec3 ip = vec3(instanceMatrix[3][0], 0.0, instanceMatrix[3][2]);
        float h = clamp(position.y, 0.0, 1.0);
        transformed.x += sin(uTime * 1.8 + ip.x * 0.21 + ip.z * 0.13) * 0.16 * h * h;
        transformed.z += cos(uTime * 1.3 + ip.z * 0.17) * 0.08 * h * h;`);
    };
    return m;
  }
  // Bụi cỏ: ba tấm cỏ cắm chéo nhau, rải dày ngoài chiến trường, thưa dần trên sườn đồi
  private grass(n: number){
    const quads = [0, 1, 2].map(i => new THREE.PlaneGeometry(1.1, 0.8).translate(0, 0.4, 0).rotateY(i * Math.PI / 3));
    // pháp tuyến hướng lên trời: cụm cỏ sáng đều như mặt đất, không bị tối khi nhìn ngược nắng
    const geo = mergeGeometries(quads)!, nor = geo.attributes.normal as THREE.BufferAttribute;
    for (let i = 0; i < nor.count; i++) nor.setXYZ(i, 0, 1, 0);
    const mesh = new THREE.InstancedMesh(geo, this.grassMat, n);
    const r = rand(77), m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), c = new THREE.Color(), e = new THREE.Euler();
    let k = 0;
    for (let tries = 0; k < n && tries < n * 6; tries++){
      const x = (r() - 0.5) * 260, z = -60 + r() * 170;
      // trong chiến trường cũng có cỏ nhưng tránh lối đi và vật cản, để quân như đi giữa đồng
      // nhìn từ trên cao cụm cỏ dựng đứng thành đốm: chỉ cho mọc ngoài xa, sát chiến trường đã có vân cỏ của mặt đất
      if (flatDist(x, z) < 26) continue;
      const inField = !this.free(x, z, 0);
      if (inField && (laneDist(x, z) < 3.5 || (x > COURTYARD.minX - 1 && x < COURTYARD.maxX + 1 && z > COURTYARD.minZ - 3 && z < COURTYARD.maxZ + 1) || r() < 0.85)) continue;
      if (Math.hypot(x - LAKE.x, z - LAKE.z) < LAKE.r + 0.5) continue;
      const h = heightAt(x, z), big = fbm(x * 0.018 + 11, z * 0.018 + 4, 4), sc = 0.6 + r() * 0.9;
      c.setHex(big > 0.58 ? 0x9cb45a : r() < 0.5 ? 0xe3c47c : 0xcfae66).multiplyScalar(0.85 + r() * 0.3);
      mesh.setMatrixAt(k, m.compose(p.set(x, h - 0.03, z), q.setFromEuler(e.set(0, r() * 6.28, 0)), s.set(sc, sc * (0.7 + r() * 0.7), sc)));
      mesh.setColorAt(k++, c);
    }
    mesh.count = k; mesh.receiveShadow = true;
    return mesh;
  }
  // Cây: thông tán dù (thân cao, tán phẳng rộng), bách (thon cao sẫm màu), bụi tròn. Mọc thành từng đám rừng.
  private trees(hi: boolean){
    const r = rand(31);
    const jitter = (geo: THREE.BufferGeometry, amt: number, seed: number) => {
      const p = geo.attributes.position as THREE.BufferAttribute, rr = rand(seed);
      for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) + (rr() - 0.5) * amt, p.getY(i) + (rr() - 0.5) * amt, p.getZ(i) + (rr() - 0.5) * amt);
      geo.computeVertexNormals(); return geo;
    };
    const paint = (geo: THREE.BufferGeometry, hex: number) => { const c = new THREE.Color(hex), n = geo.attributes.position.count, a = new Float32Array(n * 3); for (let i = 0; i < n; i++){ const k = 0.85 + Math.random() * 0.25; a[i * 3] = c.r * k; a[i * 3 + 1] = c.g * k; a[i * 3 + 2] = c.b * k; } geo.setAttribute('color', new THREE.BufferAttribute(a, 3)); return geo; };
    const ni = (g: THREE.BufferGeometry) => g.index ? g.toNonIndexed() : g;
    const umbrella = mergeGeometries([
      paint(ni(new THREE.CylinderGeometry(0.18, 0.32, 6.5, 8).translate(0, 3.25, 0)), 0x5a4030),
      paint(ni(jitter(new THREE.IcosahedronGeometry(1, 2).scale(3.4, 1.1, 3.4).translate(0, 6.8, 0), 0.35, 1)), 0x4d6b2c),
      paint(ni(jitter(new THREE.IcosahedronGeometry(1, 2).scale(2.4, 0.9, 2.2).translate(1.2, 7.5, 0.6), 0.3, 2)), 0x5a7a34),
      paint(ni(jitter(new THREE.IcosahedronGeometry(1, 1).scale(1.8, 0.8, 1.9).translate(-1.3, 7.2, -0.7), 0.3, 3)), 0x46632a),
    ])!;
    const cypress = mergeGeometries([
      paint(ni(new THREE.CylinderGeometry(0.12, 0.2, 1.2, 6).translate(0, 0.6, 0)), 0x4a3424),
      paint(ni(jitter(new THREE.IcosahedronGeometry(1, 2).scale(1.1, 4.6, 1.1).translate(0, 4.6, 0), 0.25, 4)), 0x2f4a26),
    ])!;
    const bush = mergeGeometries([
      paint(ni(jitter(new THREE.IcosahedronGeometry(1, 2).scale(1.5, 1.0, 1.4).translate(0, 0.7, 0), 0.3, 5)), 0x5f7a32),
      paint(ni(jitter(new THREE.IcosahedronGeometry(1, 1).scale(1.0, 0.8, 1.0).translate(0.9, 0.6, 0.4), 0.25, 6)), 0x6f8a3a),
    ])!;
    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, flatShading: true });
    const make = (geo: THREE.BufferGeometry, n: number, cluster: number, spread: number, smin: number, smax: number) => {
      const mesh = new THREE.InstancedMesh(geo, mat, n); mesh.castShadow = true; mesh.receiveShadow = true;
      const m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3(), e = new THREE.Euler();
      let k = 0, cx = 0, cz = 0;
      for (let t = 0; k < n && t < n * 30; t++){
        if (k % cluster === 0 || t % 40 === 0){ cx = (r() - 0.5) * 420; cz = -120 + r() * 300; }
        const x = cx + (r() - 0.5) * spread, z = cz + (r() - 0.5) * spread;
        if (!this.free(x, z, 6) || Math.abs(x) > 270 || z > 200) continue;
        const sc = smin + r() * (smax - smin);
        mesh.setMatrixAt(k++, m.compose(p.set(x, heightAt(x, z) - 0.2, z), q.setFromEuler(e.set((r() - 0.5) * 0.08, r() * 6.28, (r() - 0.5) * 0.08)), s.set(sc, sc * (0.85 + r() * 0.3), sc)));
      }
      mesh.count = k;
      return mesh;
    };
    return [make(umbrella, hi ? 420 : 200, 14, 46, 0.7, 1.3), make(cypress, hi ? 260 : 120, 6, 22, 0.7, 1.3), make(bush, hi ? 700 : 300, 10, 34, 0.5, 1.4)];
  }
  // Đá tảng: khối đá méo vân xám nâu; bờ hồ có vách đá lớn; ngoài đồng có các tảng đá đúng chỗ vật cản của mô phỏng
  private rocks(){
    const geo = new THREE.IcosahedronGeometry(1, 3), p = geo.attributes.position as THREE.BufferAttribute, v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++){ v.fromBufferAttribute(p, i); const k = 0.75 + fbm(v.x * 2 + 5, v.y * 2 + v.z * 1.7, 4) * 0.6; v.multiplyScalar(k); v.y = Math.max(v.y, -0.35) * (v.y > 0 ? 0.8 : 1); p.setXYZ(i, v.x, v.y, v.z); }
    geo.computeVertexNormals();
    const tex = canvasTex(256, (g, r) => { g.fillStyle = '#b8b0a2'; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 4000; i++){ const c = 120 + r() * 110 | 0; g.fillStyle = `rgba(${c},${c - 6},${c - 14},0.35)`; g.fillRect(r() * 256, r() * 256, 1 + r() * 4, 1 + r() * 3); } for (let i = 0; i < 60; i++){ g.strokeStyle = 'rgba(70,62,54,0.35)'; g.lineWidth = 1 + r() * 2; g.beginPath(); const x = r() * 256, y = r() * 256; g.moveTo(x, y); g.lineTo(x + (r() - 0.5) * 60, y + (r() - 0.5) * 40); g.stroke(); } }, 2, 13);
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ map: tex, roughness: 0.92, color: 0xd8d0c0 }), 420);
    mesh.castShadow = true; mesh.receiveShadow = true;
    const r = rand(55), m = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), pp = new THREE.Vector3(), e = new THREE.Euler(), c = new THREE.Color();
    let k = 0;
    const put = (x: number, z: number, sx: number, sy: number, sz: number) => { if (k >= 420) return; mesh.setMatrixAt(k, m.compose(pp.set(x, heightAt(x, z) - sy * 0.15, z), q.setFromEuler(e.set((r() - 0.5) * 0.4, r() * 6.28, (r() - 0.5) * 0.4)), s.set(sx, sy, sz))); mesh.setColorAt(k++, c.setHSL(0.08, 0.1 + r() * 0.1, 0.55 + r() * 0.2)); };
    // vật cản đá ngoài đồng (khớp với OBSTACLES của mô phỏng)
    for (const o of OBSTACLES) if (!o.enemyOf && ((Math.abs(o.x) > 15 && Math.abs(o.x) < 40) || (o.x === 0 && o.z === 25))) put(o.x, o.z, o.r * 1.1, o.r * 0.9, o.r);
    // vách đá bờ hồ phía sau và bên trái
    for (let i = 0; i < 26; i++){ const a = Math.PI * 0.75 + i / 26 * Math.PI * 1.1, d = LAKE.r + 1 + r() * 3; const sc = 2 + r() * 3.5; put(LAKE.x + Math.cos(a) * d, LAKE.z + Math.sin(a) * d, sc * 1.4, sc * (0.8 + r() * 0.8), sc); }
    // đá rải trên đồi
    for (let t = 0; k < 420 && t < 3000; t++){ const x = (r() - 0.5) * 400, z = -100 + r() * 260; if (!this.free(x, z, 8)) continue; const sc = 0.3 + Math.pow(r(), 3) * 4; put(x, z, sc * (1 + r()), sc * (0.6 + r() * 0.6), sc); }
    mesh.count = k;
    return mesh;
  }
}

/* ------------------------------------------------------------ HD */
// Mặt đất trộn 5 vân thật theo trọng số từng đỉnh; lấy mẫu hai tỉ lệ khác nhau để đỡ lộ vân lặp; sáng tối lớn theo màu đỉnh
function splatMaterial(hd: HD){
  const T = (k: string) => hd.tex.get(k)!;
  const m = new THREE.MeshStandardMaterial({ map: T('drygrass').map, normalMap: T('drygrass').normal, roughness: 1, metalness: 0, vertexColors: false });
  if (m.normalMap){ m.normalMap = m.normalMap.clone(); m.normalMap.repeat.set(120, 120); m.normalMap.needsUpdate = true; m.normalScale.setScalar(0.8); }
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, { tGrass: { value: T('grass').map }, tDirt: { value: T('dirt').map }, tRock: { value: T('rock').map }, tSand: { value: T('sand').map } });
    sh.vertexShader = 'attribute vec4 splat;\nattribute vec3 color;\nvarying vec4 vSplat;\nvarying vec3 vTint;\nvarying vec3 vWP;\n'
      + sh.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvSplat = splat; vTint = color; vWP = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = 'uniform sampler2D tGrass;\nuniform sampler2D tDirt;\nuniform sampler2D tRock;\nuniform sampler2D tSand;\nvarying vec4 vSplat;\nvarying vec3 vTint;\nvarying vec3 vWP;\n'
      + sh.fragmentShader.replace('#include <map_fragment>', `
      vec2 p = vWP.xz;
      vec3 dry = mix(texture2D(map, p * 0.22).rgb, texture2D(map, p * 0.047 + 0.3).rgb, 0.45) * vec3(1.1, 1.0, 0.78);
      vec3 grn = mix(texture2D(tGrass, p * 0.2).rgb, texture2D(tGrass, p * 0.05).rgb, 0.4);
      vec3 col = mix(dry, grn, vSplat.w);
      col = mix(col, texture2D(tDirt, p * 0.25).rgb, vSplat.x);
      col = mix(col, texture2D(tSand, p * 0.2).rgb, vSplat.z);
      col = mix(col, texture2D(tRock, p * 0.12).rgb, vSplat.y);
      // sáng tối lớn theo màu đỉnh (giữ mảng vàng, mảng xanh của địa hình), chỉnh về độ sáng chung
      col *= clamp(vTint / vec3(0.78, 0.66, 0.42), 0.55, 1.35);
      diffuseColor.rgb *= col;`);
  };
  return m;
}
// Cây HD tại các vị trí cho sẵn: một lưới gỗ và một lưới lá dùng instancing
function treeGroup(hd: HD, kind: string, shape: 'round' | 'tall' | 'umbrella', mats: THREE.Matrix4[], seed: number){
  const t = buildTree(hd, kind, seed, shape); if (!t) return null;
  const g = new THREE.Group();
  for (const [geo, mat] of [[t.wood, t.woodMat], [t.leaves, t.leafMat]] as const){
    const im = new THREE.InstancedMesh(geo, mat, mats.length); im.castShadow = true; im.receiveShadow = true;
    mats.forEach((m, i) => im.setMatrixAt(i, m)); im.instanceMatrix.needsUpdate = true; im.computeBoundingSphere();
    g.add(im);
  }
  return g;
}
// Model quét 3D đặt tại nhiều vị trí: mỗi lưới con một InstancedMesh; chuẩn hóa cho bán kính ngang = radius ở tỉ lệ 1
function instanceModel(scene: THREE.Object3D, mats: THREE.Matrix4[], radius: number){
  const g = new THREE.Group(); if (!mats.length) return g;
  scene.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(scene), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  const k = radius * 2 / Math.max(size.x, size.z, 1e-3);
  const norm = new THREE.Matrix4().makeScale(k, k, k).multiply(new THREE.Matrix4().makeTranslation(-c.x, -box.min.y, -c.z));
  scene.traverse(o => {
    const mesh = o as THREE.Mesh; if (!mesh.isMesh) return;
    const im = new THREE.InstancedMesh(mesh.geometry, mesh.material, mats.length); im.castShadow = true; im.receiveShadow = true;
    const local = new THREE.Matrix4().multiplyMatrices(norm, mesh.matrixWorld), tmp = new THREE.Matrix4();
    mats.forEach((m, i) => im.setMatrixAt(i, tmp.multiplyMatrices(m, local)));
    im.instanceMatrix.needsUpdate = true; im.computeBoundingSphere();
    g.add(im);
  });
  return g;
}
