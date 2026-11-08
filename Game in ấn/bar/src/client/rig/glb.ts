import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Nạp model .glb cho studio (tải lại trang là dùng, không cần mở lại server). Mỗi file chỉ tải và chuẩn hoá MỘT lần,
// giữ trong bộ nhớ; mỗi lần dùng là một bản sao chung hình khối, chất liệu, ảnh với bản gốc (không tạo lại model mỗi khung hình,
// không tải lại ảnh). File thiếu hay hỏng thì trả null để bên gọi dùng phần dựng bằng code.
//
// File trong bar/models/ (xem DOC-TRUOC.txt):
//   may-in.glb / printer.glb     thân máy in thay cho thân dựng sẵn. Các nút đặt tên theo quy ước sẽ được game điều khiển:
//                                Gantry (giàn in chạy dọc), Head (đầu in chạy ngang), Roller* (trục lăn quay), Gear* (bánh răng quay),
//                                Cutter (dao cắt), Roll (cuộn giấy), Led* (đèn báo). Thiếu nút nào thì phần đó dùng bản dựng sẵn.
//   trang-tri-*.glb / decor-*.glb  đồ trang trí đặt quanh phòng trưng bày
const loader = new GLTFLoader();
const cache = new Map<string, Promise<THREE.Object3D | null>>();
let list: Promise<string[]> | null = null;

export const modelUrl = (f: string) => '/models/' + encodeURIComponent(f);
const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[\s_-]/g, '').replace(/\.(glb|gltf)$/, '');

/** danh sách file .glb trong bar/models/ (đọc một lần) */
export function modelFiles(){
  return list ??= (async () => {
    if (new URLSearchParams(location.search).has('nomodel')) return [];
    try {
      const r = await fetch('/models/list.json');
      if (!r.ok) return [];
      return (await r.json() as unknown[]).filter((f): f is string => typeof f === 'string' && /\.glb$/i.test(f)).sort();
    } catch { return []; }
  })();
}

// Chất liệu PBR của file: bật bóng đổ, ảnh màu đúng không gian sRGB, lọc ảnh dị hướng cho mặt nghiêng nhìn sắc nét
function prepare(root: THREE.Object3D){
  root.traverse(o => {
    const m = o as THREE.Mesh;
    if (!m.isMesh) return;
    m.castShadow = true; m.receiveShadow = true;
    for (const mat of Array.isArray(m.material) ? m.material : [m.material]){
      const s = mat as THREE.MeshStandardMaterial;
      if (s.map) s.map.colorSpace = THREE.SRGBColorSpace;
      if (s.emissiveMap) s.emissiveMap.colorSpace = THREE.SRGBColorSpace;
      for (const t of [s.map, s.normalMap, s.roughnessMap, s.metalnessMap, s.aoMap]) if (t) t.anisotropy = 8;
      if (s.isMeshStandardMaterial) s.envMapIntensity ??= 1;
    }
  });
  return root;
}

/** nạp một file (một lần), trả bản gốc đã chuẩn hoá */
export function loadProp(url: string): Promise<THREE.Object3D | null> {
  let p = cache.get(url);
  if (!p){
    p = loader.loadAsync(url).then(g => {
      const root = prepare(g.scene);
      root.userData.clips = g.animations;
      return root as THREE.Object3D;
    }).catch(e => { console.warn('Không nạp được model', url, e); return null; });
    cache.set(url, p);
  }
  return p;
}
const loaded = new Map<string, THREE.Object3D>();
export async function preloadProps(urls: string[]){ await Promise.all(urls.map(async u => { const o = await loadProp(u); if (o) loaded.set(u, o); })); }
/** bản sao dùng ngay (đã nạp trước bằng preloadProps), chưa có thì null */
export function cloneProp(url: string): THREE.Object3D | null { const o = loaded.get(url); if (!o) return null; const c = o.clone(true); c.userData.clips = o.userData.clips; return c; }

/** thân máy in từ file may-in.glb / printer.glb nếu có */
export async function loadPrinterModel(): Promise<THREE.Object3D | null> {
  const f = (await modelFiles()).find(n => /^(mayin|printer)/.test(plain(n)));
  if (!f) return null;
  const o = await loadProp(modelUrl(f));
  if (o) console.info('Dùng model máy in', f);
  return o ? o.clone(true) : null;
}
/** đồ trang trí phòng trưng bày (trang-tri-*.glb, decor-*.glb) */
export async function loadDecor(): Promise<THREE.Object3D[]> {
  const files = (await modelFiles()).filter(n => /^(trangtri|decor)/.test(plain(n))).slice(0, 8);
  const out = await Promise.all(files.map(f => loadProp(modelUrl(f))));
  return out.filter((o): o is THREE.Object3D => !!o).map(o => o.clone(true));
}
/** tìm nút theo tên (không phân biệt hoa thường, bỏ dấu gạch): Gantry, Head, Roller*, Gear*... */
export function findNodes(root: THREE.Object3D, prefix: string){
  const p = plain(prefix), out: THREE.Object3D[] = [];
  root.traverse(o => { if (plain(o.name).startsWith(p)) out.push(o); });
  return out;
}
/** đặt model vừa khít một hộp: canh đáy chạm y = 0, giữa x/z, thu phóng theo cạnh dài nhất */
export function fitTo(root: THREE.Object3D, size: THREE.Vector3){
  const b = new THREE.Box3().setFromObject(root), s = b.getSize(new THREE.Vector3());
  const k = Math.min(size.x / Math.max(1e-3, s.x), size.y / Math.max(1e-3, s.y), size.z / Math.max(1e-3, s.z));
  root.scale.multiplyScalar(k);
  const b2 = new THREE.Box3().setFromObject(root), c = b2.getCenter(new THREE.Vector3());
  root.position.x -= c.x; root.position.z -= c.z; root.position.y -= b2.min.y;
  return root;
}
export function hash(s: string){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
/** huỷ hẳn hình khối, chất liệu, ảnh của một cây vật thể */
export function disposeTree(o: THREE.Object3D){
  o.traverse(c => {
    const m = c as THREE.Mesh;
    if (!m.isMesh) return;
    m.geometry.dispose();
    for (const mat of Array.isArray(m.material) ? m.material : [m.material]){
      for (const v of Object.values(mat)) if ((v as THREE.Texture)?.isTexture) (v as THREE.Texture).dispose();
      mat.dispose();
    }
  });
}
