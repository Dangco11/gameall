import * as THREE from 'three';

// Nhiễu, địa hình và các tiện ích dựng cảnh dùng chung cho 5 bản đồ.

/* ---------------------------------------------------------------- nhiễu */
export const hash2 = (x: number, y: number) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
export function vnoise(x: number, y: number){
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
  const a = hash2(ix, iy), b = hash2(ix + 1, iy), c = hash2(ix, iy + 1), d = hash2(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}
export const fbm = (x: number, y: number, o = 5) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++){ s += a * vnoise(x * f, y * f); f *= 2.03; a *= 0.5; } return s; };
export const ridged = (x: number, y: number, o = 5) => { let s = 0, a = 0.5, f = 1; for (let i = 0; i < o; i++){ s += a * (1 - Math.abs(vnoise(x * f, y * f) * 2 - 1)) ** 2; f *= 2.07; a *= 0.5; } return s; };
export const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
export function rng(seed: number){ let s = seed % 2147483647 || 1; return () => { s = (s * 16807) % 2147483647; return s / 2147483647; }; }

/* ------------------------------------------------- khoảng cách tới đường bay */
// Mẫu đường bay chia theo ô lưới 80 m để tra nhanh: địa hình hàng trăm nghìn đỉnh vẫn dựng trong tích tắc
export class TrackField {
  private cells = new Map<string, number[]>();
  private pts: THREE.Vector3[];
  private runway: THREE.Vector3[];
  readonly runwayY: number;
  private static C = 80;
  constructor(pts: THREE.Vector3[], runway: THREE.Vector3[], runwayY: number){
    this.pts = pts; this.runway = runway; this.runwayY = runwayY;
    pts.forEach((p, i) => { const k = `${Math.floor(p.x / TrackField.C)},${Math.floor(p.z / TrackField.C)}`; const l = this.cells.get(k) ?? []; l.push(i); this.cells.set(k, l); });
  }
  near(x: number, z: number, reach = 3){
    const cx = Math.floor(x / TrackField.C), cz = Math.floor(z / TrackField.C);
    let best = Infinity, y = 0;
    for (let i = -reach; i <= reach; i++) for (let j = -reach; j <= reach; j++){
      const l = this.cells.get(`${cx + i},${cz + j}`); if (!l) continue;
      for (const k of l){ const p = this.pts[k], dx = p.x - x, dz = p.z - z, d = dx * dx + dz * dz; if (d < best){ best = d; y = p.y; } }
    }
    return { dist: Math.sqrt(best), y };
  }
  runwayDist(x: number, z: number){
    let best = Infinity;
    for (let i = 0; i < this.runway.length - 1; i++){
      const a = this.runway[i], b = this.runway[i + 1], abx = b.x - a.x, abz = b.z - a.z;
      const t = Math.max(0, Math.min(1, ((x - a.x) * abx + (z - a.z) * abz) / (abx * abx + abz * abz)));
      const dx = a.x + abx * t - x, dz = a.z + abz * t - z;
      best = Math.min(best, dx * dx + dz * dz);
    }
    return Math.sqrt(best);
  }
  // Độ cao cho phép: thấp hơn đường bay ít nhất `margin` m, càng xa đường bay càng được cao (thành vách hẻm núi).
  // Quanh đường băng thì san phẳng rồi chuyển dần về địa hình tự nhiên.
  clamp(x: number, z: number, h: number, margin = 26){
    const n = this.near(x, z);
    const allowed = n.y - margin + Math.max(0, n.dist - 42) * 1.25;
    let out = Math.min(h, allowed);
    const rd = this.runwayDist(x, z);
    if (rd < 150){ const k = smooth(60, 150, rd); out = (this.runwayY - 0.35) * (1 - k) + out * k; }
    return out;
  }
}

/* ------------------------------------------------------------- địa hình */
export interface TerrainSpec {
  size: number; seg: number; cx: number; cz: number;
  height: (x: number, z: number) => number;
  color: (h: number, slope: number, x: number, z: number, out: THREE.Color) => void;
}
export interface Terrain { mesh: THREE.Mesh; at: (x: number, z: number) => number; slope: (x: number, z: number) => number }
export function buildTerrain(spec: TerrainSpec, field: TrackField, detail: THREE.Texture, normal: THREE.Texture): Terrain {
  const { size, seg, cx, cz } = spec, N = seg + 1;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg).rotateX(-Math.PI / 2);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const H = new Float32Array(N * N);
  for (let i = 0; i < pos.count; i++){
    const x = pos.getX(i) + cx, z = pos.getZ(i) + cz;
    const h = field.clamp(x, z, spec.height(x, z));
    H[i] = h; pos.setXYZ(i, x, h, z);
  }
  geo.computeVertexNormals();
  const nor = geo.attributes.normal as THREE.BufferAttribute, col = new Float32Array(pos.count * 3), c = new THREE.Color();
  for (let i = 0; i < pos.count; i++){
    spec.color(H[i], 1 - nor.getY(i), pos.getX(i), pos.getZ(i), c);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * size / 24, uv.getY(i) * size / 24);   // ô chi tiết 24 m
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, map: detail, normalMap: normal, normalScale: new THREE.Vector2(0.9, 0.9), roughness: 0.95, metalness: 0 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  const step = size / seg;
  const at = (x: number, z: number) => {
    const gx = (x - cx + size / 2) / step, gz = (z - cz + size / 2) / step;
    const ix = Math.max(0, Math.min(seg - 1, Math.floor(gx))), iz = Math.max(0, Math.min(seg - 1, Math.floor(gz))), fx = Math.min(1, Math.max(0, gx - ix)), fz = Math.min(1, Math.max(0, gz - iz));
    const a = H[iz * N + ix], b = H[iz * N + ix + 1], c2 = H[(iz + 1) * N + ix], d = H[(iz + 1) * N + ix + 1];
    return a + (b - a) * fx + (c2 - a) * fz + (a - b - c2 + d) * fx * fz;
  };
  const slope = (x: number, z: number) => { const e = step; return Math.hypot(at(x + e, z) - at(x - e, z), at(x, z + e) - at(x, z - e)) / (2 * e); };
  return { mesh, at, slope };
}

/* ----------------------------------------------------------- texture */
// Texture chi tiết xám nhạt (nhân với màu đỉnh) và bản đồ pháp tuyến tương ứng, tự lặp lại
export function detailTextures(seed = 1){
  const S = 256, cv = document.createElement('canvas'); cv.width = cv.height = S;
  const g = cv.getContext('2d')!, img = g.createImageData(S, S);
  const nc = document.createElement('canvas'); nc.width = nc.height = S;
  const ng = nc.getContext('2d')!, nimg = ng.createImageData(S, S);
  const h = (x: number, y: number) => fbm(x / 18 + seed, y / 18, 4) * 0.7 + fbm(x / 5, y / 5 + seed, 3) * 0.3;
  const tile = (x: number, y: number) => {   // lặp liền mạch
    const u = x / S, v = y / S;
    return h(x, y) * (1 - u) * (1 - v) + h(x - S, y) * u * (1 - v) + h(x, y - S) * (1 - u) * v + h(x - S, y - S) * u * v;
  };
  const hv = new Float32Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) hv[y * S + x] = tile(x, y);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++){
    const i = (y * S + x) * 4, v = hv[y * S + x];
    const k = 200 + v * 55;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = Math.min(255, k); img.data[i + 3] = 255;
    const dx = hv[y * S + (x + 1) % S] - hv[y * S + (x - 1 + S) % S], dy = hv[((y + 1) % S) * S + x] - hv[((y - 1 + S) % S) * S + x];
    nimg.data[i] = 128 + dx * 420; nimg.data[i + 1] = 128 + dy * 420; nimg.data[i + 2] = 255; nimg.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0); ng.putImageData(nimg, 0, 0);
  const d = new THREE.CanvasTexture(cv), n = new THREE.CanvasTexture(nc);
  d.colorSpace = THREE.SRGBColorSpace;
  for (const t of [d, n]){ t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; }
  return { detail: d, normal: n };
}
// Bản đồ pháp tuyến sóng nước
export function waterNormals(){
  const S = 256, cv = document.createElement('canvas'); cv.width = cv.height = S;
  const g = cv.getContext('2d')!, img = g.createImageData(S, S);
  const h = (x: number, y: number) => Math.sin(x / S * Math.PI * 8 + Math.sin(y / S * Math.PI * 4) * 2) * 0.5 + Math.sin(y / S * Math.PI * 10 + x / S * Math.PI * 2) * 0.35 + fbm(x / 14, y / 14, 3) * 0.6;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++){
    const dx = h(x + 1, y) - h(x - 1, y), dy = h(x, y + 1) - h(x, y - 1), i = (y * S + x) * 4;
    img.data[i] = 128 + dx * 140; img.data[i + 1] = 128 + dy * 140; img.data[i + 2] = 255; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(cv); t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ------------------------------------------------- khối có màu đỉnh */
// Gộp các mảnh có màu riêng thành một khối (cây, xương rồng, đá) để vẽ hàng nghìn bản bằng InstancedMesh
export function colored(parts: [THREE.BufferGeometry, number][]){
  const geos = parts.map(([g, hex]) => {
    const n = g.index ? g.toNonIndexed() : g.clone();
    for (const k of Object.keys(n.attributes)) if (k !== 'position' && k !== 'normal') n.deleteAttribute(k);
    if (!n.attributes.normal) n.computeVertexNormals();
    const c = new THREE.Color(hex), arr = new Float32Array(n.attributes.position.count * 3);
    for (let i = 0; i < arr.length; i += 3){ arr[i] = c.r; arr[i + 1] = c.g; arr[i + 2] = c.b; }
    n.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    return n;
  });
  const pos: number[] = [], nor: number[] = [], col: number[] = [];
  for (const g of geos){ pos.push(...(g.attributes.position.array as Float32Array)); nor.push(...(g.attributes.normal.array as Float32Array)); col.push(...(g.attributes.color.array as Float32Array)); }
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); out.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return out;
}
// Hòn đá méo tự nhiên
export function rockGeo(seed: number, detail = 1){
  const g = new THREE.IcosahedronGeometry(1, detail), p = g.attributes.position as THREE.BufferAttribute, v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++){ v.fromBufferAttribute(p, i); const k = 0.75 + fbm(v.x * 1.6 + seed, v.y * 1.6 + v.z, 3) * 0.6; v.multiplyScalar(k); p.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals();
  return g;
}
