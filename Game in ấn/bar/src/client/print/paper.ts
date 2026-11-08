import * as THREE from 'three';
import { PRINT } from '../../shared/print.ts';
import type { PassSet } from './art.ts';

// Giấy in chạy theo một đường cố định nhìn từ bên hông máy (trục z: từ sau ra trước, y: cao):
//   cuộn giấy (sau) → trục lăn nạp giấy → mặt bàn in phẳng → dao cắt → vòng qua trục lăn lớn phía trước → thả xuống → khay thành phẩm.
// Toạ độ trên đường là s (mét, tính từ cuộn giấy). Mỗi điểm trên giấy có toạ độ giấy p cố định; giấy chạy thêm một đoạn
// (feed tăng) thì điểm đó nằm ở s = p + feed. Dải giấy, các bản in, tờ đã cắt đều là lưới uốn theo đường này nên
// lúc giấy cuộn qua trục, gập xuống khay, ảnh in trên đó uốn theo y như giấy thật.
export const W = PRINT.paperW, SHEET = PRINT.sheetL;
export const PLATEN_Y = 1.0, PLATEN_Z0 = -1.02, PLATEN_Z1 = 0.92;
export const FEED_ROLLER = { z: -1.02, y: 0.93, r: 0.07 };
export const FRONT_ROLLER = { z: 0.92, y: 0.89, r: 0.11 };
export const ROLL = { z: -1.55, y: 0.8, r: 0.18 };
export const TRAY_Y = 0.074;
export const CUT_Z = 0.885;                     // dao cắt chạy ngang mép trước bàn in
export const SHEET_TOP_Z = -0.80;            // mép trên vùng in của tờ (sau khi nạp giấy)

type Seg = { kind: 'line'; a: [number, number]; b: [number, number] } | { kind: 'arc'; c: [number, number]; r: number; a0: number; a1: number };
const SEGS: Seg[] = [
  { kind: 'line', a: [ROLL.z + 0.02, ROLL.y + ROLL.r], b: [PLATEN_Z0, PLATEN_Y] },
  { kind: 'line', a: [PLATEN_Z0, PLATEN_Y], b: [FRONT_ROLLER.z, PLATEN_Y] },
  { kind: 'arc', c: [FRONT_ROLLER.z, FRONT_ROLLER.y], r: FRONT_ROLLER.r + 0.002, a0: Math.PI / 2, a1: 0 },
  { kind: 'line', a: [FRONT_ROLLER.z + FRONT_ROLLER.r + 0.002, FRONT_ROLLER.y], b: [FRONT_ROLLER.z + FRONT_ROLLER.r + 0.002, 0.24] },
  { kind: 'arc', c: [FRONT_ROLLER.z + FRONT_ROLLER.r + 0.002 + 0.166, 0.24], r: 0.166, a0: Math.PI, a1: Math.PI * 1.5 },
  { kind: 'line', a: [FRONT_ROLLER.z + FRONT_ROLLER.r + 0.168, TRAY_Y], b: [4.4, TRAY_Y] },
];
// lấy mẫu đường mỗi 5 mm: vị trí (z, y) và pháp tuyến mặt in
const STEP = 0.005;
const PZ: number[] = [], PY: number[] = [];
(() => {
  for (const s of SEGS){
    const n = s.kind === 'line' ? Math.ceil(Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]) / STEP) : Math.ceil(Math.abs(s.a1 - s.a0) * s.r / STEP);
    for (let i = PZ.length ? 1 : 0; i <= n; i++){
      const t = i / n;
      if (s.kind === 'line'){ PZ.push(s.a[0] + (s.b[0] - s.a[0]) * t); PY.push(s.a[1] + (s.b[1] - s.a[1]) * t); }
      else { const a = s.a0 + (s.a1 - s.a0) * t; PZ.push(s.c[0] + Math.cos(a) * s.r); PY.push(s.c[1] + Math.sin(a) * s.r); }
    }
  }
})();
const SL: number[] = [0];
for (let i = 1; i < PZ.length; i++) SL.push(SL[i - 1] + Math.hypot(PZ[i] - PZ[i - 1], PY[i] - PY[i - 1]));
export const PATH_LEN = SL[SL.length - 1];
const sAt = (z: number, y: number) => { let best = 0, bd = Infinity; for (let i = 0; i < PZ.length; i++){ const d = (PZ[i] - z) ** 2 + (PY[i] - y) ** 2; if (d < bd){ bd = d; best = i; } } return SL[best]; };
export const S_PLATEN0 = sAt(PLATEN_Z0, PLATEN_Y);
export const zToS = (z: number) => S_PLATEN0 + (z - PLATEN_Z0);
export const S_CUT = zToS(CUT_Z);
export const S_SHEET_TOP = zToS(SHEET_TOP_Z);
export const PRIME_ADV = 0.06;
export const EJECT_ADV = S_CUT + 0.04 - S_SHEET_TOP;            // đẩy đủ để mép trên tờ qua dao cắt 4 cm
export const SLIDE_ADV = zToS(PLATEN_Z1) + 1.12 - S_CUT;        // tờ đã cắt trượt hẳn xuống khay

// điểm trên đường ở toạ độ s: vị trí (z, y) và pháp tuyến (nz, ny)
const _o = { z: 0, y: 0, nz: 0, ny: 1 };
export function pathAt(s: number){
  const f = Math.max(0, Math.min(PZ.length - 1.001, s / STEP));
  let i = Math.floor(f);
  // các đoạn mẫu gần như đều 5 mm; chỉnh lại theo độ dài thật
  while (i > 0 && SL[i] > s) i--;
  while (i < PZ.length - 2 && SL[i + 1] < s) i++;
  const seg = SL[i + 1] - SL[i] || 1, t = Math.max(0, Math.min(1, (s - SL[i]) / seg));
  const dz = PZ[i + 1] - PZ[i], dy = PY[i + 1] - PY[i], l = Math.hypot(dz, dy) || 1;
  _o.z = PZ[i] + dz * t; _o.y = PY[i] + dy * t; _o.nz = -dy / l; _o.ny = dz / l;
  if (s > PATH_LEN){ _o.z += (s - PATH_LEN); }
  return _o;
}

/* ------------------------------------------------------------ lưới giấy uốn theo đường */
// Lưới chữ nhật: cột theo bề ngang (x), hàng theo chiều giấy (p). Mỗi khung hình chỉ tính lại vị trí đỉnh khi giấy chạy.
export type Mapper = (x: number, p: number, lift: number, out: THREE.Vector3, n: THREE.Vector3) => void;
export const onPath = (feed: number): Mapper => (x, p, lift, out, n) => { const o = pathAt(p + feed); out.set(x, o.y + o.ny * lift, o.z + o.nz * lift); n.set(0, o.ny, o.nz); };

export class PaperMesh {
  readonly geo = new THREE.BufferGeometry();
  readonly mesh: THREE.Mesh;
  readonly xs: Float32Array; readonly ps: Float32Array;
  x0: number; x1: number; p0: number; p1: number; lift: number;
  private nx: number; private ny: number;
  constructor(mat: THREE.Material, x0: number, x1: number, p0: number, p1: number, cols: number, rows: number, lift = 0, uvScale: [number, number] | null = null){
    this.x0 = x0; this.x1 = x1; this.p0 = p0; this.p1 = p1; this.lift = lift; this.nx = cols; this.ny = rows;
    const n = (cols + 1) * (rows + 1);
    this.xs = new Float32Array(n); this.ps = new Float32Array(n);
    const uv = new Float32Array(n * 2), idx: number[] = [];
    for (let r = 0; r <= rows; r++) for (let c = 0; c <= cols; c++){
      const i = r * (cols + 1) + c;
      this.xs[i] = x0 + (x1 - x0) * c / cols; this.ps[i] = p0 + (p1 - p0) * r / rows;
      // ảnh canvas: v = 1 ở mép trên ảnh (phía sau máy, p nhỏ), v = 0 ở mép dưới
      if (uvScale){ uv[i * 2] = this.xs[i] * uvScale[0]; uv[i * 2 + 1] = -this.ps[i] * uvScale[1]; }
      else { uv[i * 2] = c / cols; uv[i * 2 + 1] = 1 - r / rows; }
    }
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
      const a = r * (cols + 1) + c, b = a + 1, d = a + cols + 1, e = d + 1;
      idx.push(a, d, b, b, d, e);
    }
    this.geo.setIndex(idx);
    this.geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.geo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    this.geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    this.mesh = new THREE.Mesh(this.geo, mat);
    this.mesh.frustumCulled = false; this.mesh.castShadow = true; this.mesh.receiveShadow = true;
  }
  // đặt lại dải p (dải giấy chính: đuôi dính cuộn giấy, đầu là mép đã cắt); toạ độ uv đi theo p để vân giấy chạy cùng giấy
  setRange(p0: number, p1: number, uvScale?: [number, number]){
    this.p0 = p0; this.p1 = p1;
    const uv = this.geo.attributes.uv as THREE.BufferAttribute;
    for (let r = 0; r <= this.ny; r++) for (let c = 0; c <= this.nx; c++){
      const i = r * (this.nx + 1) + c; this.ps[i] = p0 + (p1 - p0) * r / this.ny;
      if (uvScale) uv.setY(i, -this.ps[i] * uvScale[1]);
    }
    if (uvScale) uv.needsUpdate = true;
  }
  private v = new THREE.Vector3(); private nn = new THREE.Vector3();
  place(map: Mapper){
    const pos = this.geo.attributes.position as THREE.BufferAttribute, nor = this.geo.attributes.normal as THREE.BufferAttribute;
    for (let i = 0; i < this.xs.length; i++){ map(this.xs[i], this.ps[i], this.lift, this.v, this.nn); pos.setXYZ(i, this.v.x, this.v.y, this.v.z); nor.setXYZ(i, this.nn.x, this.nn.y, this.nn.z); }
    pos.needsUpdate = true; nor.needsUpdate = true;
  }
  dispose(){ this.geo.dispose(); }
}

/* ------------------------------------------------------------ chất liệu bản in: hiện dần theo đường quét của đầu in */
// rows: số đường quét; rev: tiến độ (0..rows, phần lẻ là vị trí đầu in trên đường đang quét, đường chẵn quét trái → phải,
// đường lẻ phải → trái). Mực vừa phun còn ướt: sẫm và bóng hơn một chút, đèn UV trên đầu in hắt tím; lớp ảnh in theo
// từng lượt màu (xanh → hồng → vàng rồi mới đủ màu) như máy in CMYK.
export interface InkUniforms { uRows: { value: number }; uRev: { value: number }; uWet: { value: number }; uCmyk: { value: number } }
export function inkMaterial(set: PassSet, opts: { cmyk?: boolean; glow?: number; depth?: number }): THREE.MeshStandardMaterial & { userData: { ink: InkUniforms } } {
  const tex = (c: HTMLCanvasElement, srgb: boolean) => { const t = new THREE.CanvasTexture(c); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; t.generateMipmaps = true; return t; };
  const pbr = tex(set.pbr, false);
  const m = new THREE.MeshStandardMaterial({
    map: tex(set.color, true), roughnessMap: pbr, metalnessMap: pbr, emissiveMap: tex(set.glow, true), emissive: 0xffffff, emissiveIntensity: opts.glow ?? 0,
    roughness: 1, metalness: 1, transparent: true, alphaTest: 0.02, side: THREE.DoubleSide, depthWrite: true,
    polygonOffset: true, polygonOffsetFactor: -1 - (opts.depth ?? 0), polygonOffsetUnits: -2 - (opts.depth ?? 0) * 2, envMapIntensity: 1.1,
  }) as THREE.MeshStandardMaterial & { userData: { ink: InkUniforms } };
  const u: InkUniforms = { uRows: { value: 16 }, uRev: { value: 1e6 }, uWet: { value: 0 }, uCmyk: { value: opts.cmyk ? 1 : 0 } };
  m.userData.ink = u;
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, u);
    sh.fragmentShader = 'uniform float uRows; uniform float uRev; uniform float uWet; uniform float uCmyk;\nfloat inkFresh = 0.0;\n' + sh.fragmentShader
      .replace('#include <map_fragment>', `#include <map_fragment>
        {
          float d = 1.0 - vMapUv.y;
          float row = floor(d * uRows);
          float cur = floor(uRev);
          float along = mod(row, 2.0) < 0.5 ? vMapUv.x : 1.0 - vMapUv.x;
          float t = row + along;
          if (uRev < uRows && t > uRev) discard;
          inkFresh = (1.0 - clamp((uRev - t) / 1.6, 0.0, 1.0)) * uWet;
          // vệt phun mực lấm tấm sát đầu in
          float spray = step(0.45, fract(sin(dot(floor(vMapUv * vec2(320.0, 400.0)), vec2(12.9898, 78.233))) * 43758.5453));
          diffuseColor.a *= mix(1.0, 0.55 + 0.45 * spray, inkFresh);
          vec3 tint = inkFresh > 0.66 ? vec3(0.25, 0.85, 1.0) : inkFresh > 0.33 ? vec3(1.0, 0.35, 0.85) : vec3(1.0, 0.95, 0.4);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * tint, inkFresh * uCmyk * 0.85);
          diffuseColor.rgb *= 1.0 - inkFresh * 0.18;
        }`)
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor = mix(roughnessFactor, 0.12, inkFresh * 0.8);')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n totalEmissiveRadiance += vec3(0.42, 0.18, 1.0) * inkFresh * inkFresh * 0.9;');
  };
  m.customProgramCacheKey = () => 'ink-v1';
  return m;
}
export function disposeInk(m: THREE.MeshStandardMaterial){ for (const t of [m.map, m.roughnessMap, m.emissiveMap]) t?.dispose(); m.dispose(); }

/* ------------------------------------------------------------ vân giấy */
let paperTex: { map: THREE.CanvasTexture; rough: THREE.CanvasTexture; bump: THREE.CanvasTexture } | null = null;
export function paperTextures(){
  if (paperTex) return paperTex;
  const S = 512, c = document.createElement('canvas'), r = document.createElement('canvas'), b = document.createElement('canvas');
  c.width = c.height = r.width = r.height = b.width = b.height = S;
  const g = c.getContext('2d')!, gr = r.getContext('2d')!, gb = b.getContext('2d')!;
  const img = g.createImageData(S, S), ri = gr.createImageData(S, S), bi = gb.createImageData(S, S);
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const fib = new Float32Array(S * S);
  // sợi giấy: nhiều vệt ngắn theo chiều chạy giấy chồng lên nhau
  for (let k = 0; k < 9000; k++){ const x = rnd() * S, y = rnd() * S, len = 4 + rnd() * 18, a = (rnd() - 0.5) * 0.9 + Math.PI / 2, v = (rnd() - 0.5) * 0.5;
    for (let t = 0; t < len; t++){ const px = Math.floor(x + Math.cos(a) * t + S) % S, py = Math.floor(y + Math.sin(a) * t + S) % S; fib[py * S + px] += v; } }
  for (let i = 0; i < S * S; i++){
    const n = fib[i] * 0.5 + (rnd() - 0.5) * 0.12;
    img.data[i * 4] = 226 + n * 14; img.data[i * 4 + 1] = 219 + n * 14; img.data[i * 4 + 2] = 200 + n * 16; img.data[i * 4 + 3] = 255;
    ri.data[i * 4 + 1] = 205 + n * 40; ri.data[i * 4 + 3] = 255;
    const bv = 128 + n * 90; bi.data[i * 4] = bi.data[i * 4 + 1] = bi.data[i * 4 + 2] = bv; bi.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0); gr.putImageData(ri, 0, 0); gb.putImageData(bi, 0, 0);
  const mk = (cv: HTMLCanvasElement, srgb: boolean) => { const t = new THREE.CanvasTexture(cv); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; };
  return paperTex = { map: mk(c, true), rough: mk(r, false), bump: mk(b, false) };
}
export function paperMaterial(){
  const t = paperTextures();
  return new THREE.MeshPhysicalMaterial({ name: 'paper', map: t.map, roughnessMap: t.rough, bumpMap: t.bump, bumpScale: 0.6, roughness: 1, metalness: 0,
    sheen: 0.35, sheenRoughness: 0.8, sheenColor: new THREE.Color(0xfff6e8), side: THREE.DoubleSide, envMapIntensity: 0.4 });
}
