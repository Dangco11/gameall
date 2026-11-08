import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { shared } from '../../client/materials.ts';

// Tài nguyên đồ họa chân thực (CC0, Poly Haven) trong public/hd/, tải bằng: npm run assets
// Có thì dùng: vân PBR (màu, pháp tuyến, độ nhám, AO), bầu trời HDR làm nguồn sáng môi trường, đá và bụi cây quét 3D,
// ảnh lá và vỏ cây thật để dựng cây nhiều lớp lá. Không có thì game dùng vật liệu dựng sẵn như cũ.
export interface PBR { map: THREE.Texture; normal?: THREE.Texture; rough?: THREE.Texture; ao?: THREE.Texture }
interface Manifest { textures: Record<string, Partial<Record<'map' | 'normal' | 'rough' | 'ao', string>>>; hdri: string; models: Record<string, string>; foliage: Record<string, Record<string, string>> }

export class HD {
  ok = false;
  env: THREE.Texture | null = null;
  readonly tex = new Map<string, PBR>();
  readonly models = new Map<string, THREE.Group>();
  readonly foliage = new Map<string, { leaves: THREE.Texture; bark: PBR }>();
  private loader = new THREE.TextureLoader();

  async load(renderer: THREE.WebGLRenderer, base = '/'){
    let m: Manifest;
    try { const r = await fetch(base + 'hd/manifest.json', { cache: 'no-cache' }); if (!r.ok) return false; m = await r.json(); } catch { return false; }
    const T = (url: string | undefined, srgb: boolean) => url ? this.loader.loadAsync(base + url).then(t => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; if (srgb) t.colorSpace = THREE.SRGBColorSpace; return t; }).catch(() => undefined) : Promise.resolve(undefined);
    await Promise.all(Object.entries(m.textures).map(async ([k, v]) => {
      const [map, normal, rough, ao] = await Promise.all([T(v.map, true), T(v.normal, false), T(v.rough, false), T(v.ao, false)]);
      if (map) this.tex.set(k, { map, normal, rough, ao });
    }));
    if (m.hdri){
      try {
        const hdr = await new RGBELoader().loadAsync(base + m.hdri);
        const pm = new THREE.PMREMGenerator(renderer); this.env = pm.fromEquirectangular(hdr).texture; hdr.dispose(); pm.dispose();
      } catch (e) { console.warn('Không nạp được bầu trời HDR', e); }
    }
    const gl = new GLTFLoader();
    await Promise.all(Object.entries(m.models).map(async ([k, url]) => { try { this.models.set(k, (await gl.loadAsync(base + url)).scene); } catch (e) { console.warn('Không nạp được model', url, e); } }));
    await Promise.all(Object.entries(m.foliage ?? {}).map(async ([k, v]) => {
      const [leafImg, bmap, bnor] = await Promise.all([loadImage(base + v.leaves_map), T(v.bark_map, true), T(v.bark_normal, false)]);
      if (leafImg && bmap) this.foliage.set(k, { leaves: leafCluster(leafImg, k.length * 7 + 3), bark: { map: bmap, normal: bnor } });
    }));
    this.ok = this.tex.size > 0;
    return this.ok;
  }

  // Vật liệu PBR từ một bộ vân; repeat: số lần lặp trên 1 đơn vị UV
  material(name: string, o: { repeat?: number; color?: number; normalScale?: number; rough?: number; metal?: number } = {}): THREE.MeshStandardMaterial | null {
    const t = this.tex.get(name); if (!t) return null;
    const rep = (x?: THREE.Texture) => { if (!x) return undefined; const c = x.clone(); c.repeat.set(o.repeat ?? 1, o.repeat ?? 1); c.needsUpdate = true; return c; };
    const mat = new THREE.MeshStandardMaterial({ map: rep(t.map), normalMap: rep(t.normal), roughnessMap: rep(t.rough), aoMap: rep(t.ao), color: o.color ?? 0xffffff, roughness: o.rough ?? 1, metalness: o.metal ?? 0 });
    if (o.normalScale) mat.normalScale.setScalar(o.normalScale);
    return mat;
  }
}

function loadImage(url: string){ return new Promise<HTMLImageElement | null>(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = url; }); }

// Ảnh lá chụp thật nằm trên nền đen: tách nền thành trong suốt, rồi xếp hàng chục lá xoay, nghiêng, đậm nhạt khác nhau
// thành một "chùm lá" vuông. Mỗi tấm lá trên cây là một chùm như vậy, nhìn gần vẫn thấy từng chiếc lá riêng.
function leafCluster(img: HTMLImageElement, seed: number){
  const W = img.width, H = img.height, src = document.createElement('canvas'); src.width = W; src.height = H;
  const sg = src.getContext('2d')!; sg.drawImage(img, 0, 0);
  const d = sg.getImageData(0, 0, W, H), px = d.data;
  for (let i = 0; i < px.length; i += 4){ const v = Math.max(px[i], px[i + 1], px[i + 2]); px[i + 3] = Math.max(0, Math.min(255, (v - 14) * 9)); }
  sg.putImageData(d, 0, 0);
  // tìm các chiếc lá: quét theo lưới cột, mỗi ô một lá (ảnh lá Poly Haven xếp thành hàng)
  const cells: [number, number, number, number][] = [];
  const cols = 5, rows = 2, cw = W / cols, ch = H / rows;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
    const x0 = c * cw, y0 = r * ch, s = sg.getImageData(x0, y0, cw, ch).data;
    let n = 0; for (let i = 3; i < s.length; i += 16) if (s[i] > 128) n++;
    if (n > 200) cells.push([x0, y0, cw, ch]);
  }
  if (!cells.length) cells.push([0, 0, W, H]);
  const S = 512, out = document.createElement('canvas'); out.width = out.height = S;
  const g = out.getContext('2d')!;
  let s = seed; const r = () => ((s = (Math.imul(s, 16807) + 11) % 2147483647) & 0x7fffffff) / 2147483647;
  for (let i = 0; i < 46; i++){
    const [x0, y0, w, h] = cells[Math.floor(r() * cells.length)];
    const a = r() * Math.PI * 2, sc = 0.16 + r() * 0.12, cx = S * (0.14 + r() * 0.72), cy = S * (0.14 + r() * 0.72);
    g.save(); g.translate(cx, cy); g.rotate(a); g.filter = `brightness(${0.62 + r() * 0.55}) saturate(${0.85 + r() * 0.3})`;
    g.drawImage(src, x0, y0, w, h, -w * sc / 2, -h * sc / 2, w * sc, h * sc); g.restore();
  }
  const t = new THREE.CanvasTexture(out); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.generateMipmaps = true;
  return t;
}

/* ---------------------------------------------------------------- cây */
// Cây dựng từ ảnh thật: thân và cành nhánh (trụ thuôn có vân vỏ cây), tán là nhiều lớp tấm chùm lá cắm chéo nhau,
// gió lay nhẹ. Mỗi loài một lưới gộp, vẽ bằng instancing: vài trăm cây vẫn chỉ vài lượt vẽ.
export interface TreeKind { wood: THREE.BufferGeometry; leaves: THREE.BufferGeometry; woodMat: THREE.Material; leafMat: THREE.Material }
export function buildTree(hd: HD, kind: string, seed: number, shape: 'round' | 'tall' | 'umbrella'): TreeKind | null {
  const f = hd.foliage.get(kind); if (!f) return null;
  let s = seed; const r = () => ((s = (Math.imul(s, 16807) + 11) % 2147483647) & 0x7fffffff) / 2147483647;
  const wood: THREE.BufferGeometry[] = [], cards: THREE.BufferGeometry[] = [];
  const up = new THREE.Vector3(0, 1, 0);
  // nhánh: trụ thuôn từ a tới b
  const limb = (a: THREE.Vector3, b: THREE.Vector3, r0: number, r1: number) => {
    const len = a.distanceTo(b), g = new THREE.CylinderGeometry(r1, r0, len, 7, 1, true);
    g.translate(0, len / 2, 0);
    const uv = g.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 1.5, uv.getY(i) * len / 1.2);
    g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(up, b.clone().sub(a).normalize())); g.translate(a.x, a.y, a.z);
    wood.push(g);
  };
  const leafCard = (c: THREE.Vector3, size: number) => {
    for (let k = 0; k < 2; k++){
      const g = new THREE.PlaneGeometry(size, size);
      g.rotateY(r() * Math.PI); g.rotateX((r() - 0.5) * 1.2); g.rotateZ((r() - 0.5) * 0.6);
      g.translate(c.x, c.y, c.z);
      // pháp tuyến hướng ra ngoài tán: tán sáng tự nhiên, không bị đen mặt sau
      const n = g.attributes.normal as THREE.BufferAttribute, p = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < n.count; i++){ const v = new THREE.Vector3(p.getX(i), (p.getY(i) - crownY) * 0.7 + 0.6, p.getZ(i)).normalize(); n.setXYZ(i, v.x, v.y, v.z); }
      cards.push(g);
    }
  };
  const H = shape === 'tall' ? 7 + r() * 2 : shape === 'umbrella' ? 6 + r() * 1.5 : 4.5 + r() * 1.5;
  const crownY = shape === 'tall' ? H * 0.6 : H * 0.85;
  const trunkTop = new THREE.Vector3((r() - 0.5) * 0.6, H * (shape === 'tall' ? 0.9 : 0.62), (r() - 0.5) * 0.6);
  limb(new THREE.Vector3(0, -0.3, 0), trunkTop, shape === 'tall' ? 0.22 : 0.3, 0.16);
  const nb = shape === 'tall' ? 9 : 7;
  for (let i = 0; i < nb; i++){
    const a = i / nb * Math.PI * 2 + r() * 0.6, h = trunkTop.y * (shape === 'tall' ? 0.35 + i / nb * 0.6 : 0.85 + r() * 0.15);
    const reach = shape === 'umbrella' ? 2.6 + r() * 1.2 : shape === 'tall' ? 0.8 + r() * 0.6 * (1 - i / nb) : 1.6 + r() * 1;
    const from = new THREE.Vector3(trunkTop.x * h / trunkTop.y, h, trunkTop.z * h / trunkTop.y);
    const to = from.clone().add(new THREE.Vector3(Math.cos(a) * reach, (shape === 'umbrella' ? 0.6 : 1.2) + r() * 0.8, Math.sin(a) * reach));
    limb(from, to, 0.1, 0.04);
    // chùm lá phủ quanh đầu cành
    const n = shape === 'tall' ? 5 : 7;
    for (let k = 0; k < n; k++){
      const c = to.clone().add(new THREE.Vector3((r() - 0.5) * reach * 1.1, (r() - 0.3) * (shape === 'umbrella' ? 0.7 : 1.4), (r() - 0.5) * reach * 1.1));
      leafCard(c, (shape === 'tall' ? 1.5 : 1.9) + r() * 0.8);
    }
  }
  // lõi tán dày ở giữa cho khỏi lộ khoảng trống
  for (let k = 0; k < (shape === 'tall' ? 10 : 12); k++){
    const c = new THREE.Vector3((r() - 0.5) * (shape === 'tall' ? 1.6 : 3.6), crownY + (r() - 0.5) * (shape === 'tall' ? H * 0.5 : 1.4), (r() - 0.5) * (shape === 'tall' ? 1.6 : 3.6));
    leafCard(c, 2.2 + r());
  }
  const woodMat = new THREE.MeshStandardMaterial({ map: f.bark.map, normalMap: f.bark.normal, roughness: 0.95 });
  const leafMat = new THREE.MeshStandardMaterial({ map: f.leaves, alphaTest: 0.42, side: THREE.DoubleSide, roughness: 0.75, transparent: false });
  leafMat.onBeforeCompile = sh => {
    sh.uniforms.uTime = shared.time;
    sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `
      vec3 transformed = vec3(position);
      vec3 ip = vec3(instanceMatrix[3][0], 0.0, instanceMatrix[3][2]);
      float h = max(0.0, position.y - 2.0) * 0.06;
      transformed.x += sin(uTime * 1.4 + ip.x * 0.3 + position.y) * h;
      transformed.z += cos(uTime * 1.1 + ip.z * 0.3 + position.x) * h * 0.6;`);
  };
  return { wood: mergeGeometries(wood)!, leaves: mergeGeometries(cards)!, woodMat, leafMat };
}
