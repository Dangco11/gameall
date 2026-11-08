import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { DANCE_BPM, bakeDance, buildRig, type ProceduralDance, type Rig } from './dancerig.ts';
// Tư thế dựng bằng code (khi file không có động tác phù hợp): góc các khớp theo radian, bob / lift là độ nhún, nhấc người
export interface Pose { legL: number; legR: number; armL: number; armR: number; armLz: number; armRz: number; bend: number; bob: number; headTilt: number; spin: number; tilt: number; lift: number; foreL?: number; foreR?: number }
// bob / lift trong Pose tính theo cỡ người cũ (2,44 đơn vị một người); đổi ra mét thật
const POSE_SCALE = 2.44, LIFT = 2.24;

// Nhân vật 3D như thật nạp từ file .glb / .vrm trong bar/models/ (tải lại trang là dùng, không cần mở lại server):
//   khach-nam-*.glb, khach-nu-*.glb     khách nam, khách nữ (càng nhiều file càng đa dạng; mỗi người khách luôn giữ đúng một mẫu)
//   khach-gia-*.glb, khach-tre-*.glb    người lớn tuổi, trẻ con (tuỳ chọn)
//   khach-*.glb                         khách chung, dùng cho cả nam lẫn nữ khi thiếu mẫu riêng
//   dong-tac*.glb                       thư viện động tác (ví dụ tải từ Mixamo), dùng chung cho mọi nhân vật cùng kiểu khung xương
// Nhân viên quán bar (không có file riêng thì quán mượn mẫu khách rồi thay đồng phục, xem ROLE_FILES):
//   bartender-nam.glb, bartender-nu.glb, dj-nam.glb, dj-nu.glb, phuc-vu*.glb, bao-ve*.glb, le-tan*.glb, khach-vip*.glb
// Nhận khung xương MakeHuman / MPFB, Mixamo, VRoid, Rigify, Character Creator. Động tác có sẵn trong file (idle, walk, dance, clap,
// cheer, wave…) được phát bằng AnimationMixer; động tác nào file không có thì các khớp nhận góc tư thế dựng bằng code.
// Thiếu file hoặc file hỏng thì người đó không được dựng (quán vẫn chạy, chỉ vắng người).

interface Template {
  scene: THREE.Object3D; clips: THREE.AnimationClip[];
  // chuẩn hoá một lần cho mỗi file: hướng mặt, tỉ lệ, độ lệch để chân chạm đất, độ cao hông
  flip: boolean; scale: number; offset: THREE.Vector3; hipY: number;
  skin?: THREE.Color;        // màu da đo từ ảnh mặt của chính mẫu (để tô đồ không lẹm vào da tay, chân)
}
const templates = new Map<string, Template>();
const library: THREE.AnimationClip[] = [];          // động tác dùng chung từ dong-tac*.glb
const guestKeys = { nam: [] as string[], nu: [] as string[], gia: [] as string[], tre: [] as string[], chung: [] as string[] };
export type GuestCat = keyof typeof guestKeys;

// Vai nhân viên quán bar: tên file (đã bỏ dấu, gạch) bắt đầu bằng một trong các chữ này thì thành mẫu riêng cho vai đó
export type StaffRole = 'bartenderNam' | 'bartenderNu' | 'djNam' | 'djNu' | 'phucVu' | 'baoVe' | 'leTan' | 'vip';
export const ROLE_FILES: Record<StaffRole, RegExp> = {
  bartenderNam: /^bartender(nam|male|m)?\d*$/, bartenderNu: /^bartender(nu|female|f)\d*$/,
  djNam: /^dj(nam|male|m)?\d*$/, djNu: /^dj(nu|female|f)\d*$/,
  phucVu: /^(phucvu|waiter|waitress)/, baoVe: /^(baove|security|bouncer)/, leTan: /^(letan|reception|hostess)/, vip: /^(khachvip|vip)/,
};
const roleKeys = new Map<StaffRole, string[]>();
export const hasTemplate = (k: string) => templates.has(k);
export const hasGuestModels = () => Object.values(guestKeys).some(l => l.length > 0);
export const guestModels = (cat: GuestCat) => guestKeys[cat].slice();
export const roleModels = (r: StaffRole) => roleKeys.get(r)?.slice() ?? [];

const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[\s_-]/g, '').replace(/\.(glb|vrm)$/, '');
export interface LoadOptions { skip?: RegExp; parallel?: number }
let loading: Promise<void> | null = null;
// Nạp một lần duy nhất, gọi lại chỉ nhận lại cùng lời hứa (đổi khu vực, dựng lại cảnh không tải lại model).
// skip: bỏ những file không cần (vd. trẻ con), so với tên đã bỏ dấu. parallel: số file tải cùng lúc.
export function loadModels(opts: LoadOptions = {}){
  return loading ??= (async () => {
    if (new URLSearchParams(location.search).has('nomodel')) return;
    let files: string[] = [];
    try {
      const r = await fetch('/models/list.json');
      if (!r.ok) throw new Error(String(r.status));
      files = (await r.json() as unknown[]).filter((f): f is string => typeof f === 'string');
    } catch (e){ console.warn('Không đọc được danh sách nhân vật 3D', e); return; }
    files = files.filter(f => !opts.skip?.test(plain(f))).sort();
    const loader = new GLTFLoader();
    const url = (f: string) => '/models/' + encodeURIComponent(f);
    // động tác trước để nhân vật tạo ra sau đã có sẵn
    for (const f of files.filter(n => /^(dongtac|anim)/.test(plain(n)))) await loadAnimations(url(f), loader);
    const jobs: (() => Promise<void>)[] = [];
    for (const f of files){
      const p = plain(f);
      const role = (Object.keys(ROLE_FILES) as StaffRole[]).find(r => ROLE_FILES[r].test(p));
      if (role){ jobs.push(async () => { const key = 'role:' + f; if (await loadModel(key, url(f), loader)) roleKeys.set(role, [...(roleKeys.get(role) ?? []), key].sort()); }); continue; }
      if (!/^(khach|guest)/.test(p)) continue;
      const key = 'guest:' + f, tail = p.replace(/^(khach|guest)/, '');
      const cat: GuestCat = /^(nam|male|man)/.test(tail) ? 'nam' : /^(nu|female|woman)/.test(tail) ? 'nu' : /^(gia|old|elder)/.test(tail) ? 'gia' : /^(tre|kid|child)/.test(tail) ? 'tre' : 'chung';
      jobs.push(async () => { if (await loadModel(key, url(f), loader)){ guestKeys[cat].push(key); guestKeys[cat].sort(); } });
    }
    // tải song song vài file một lúc (mỗi file vài chục MB), thứ tự danh sách giữ ổn định để mỗi người luôn cùng một mẫu
    const n = Math.max(1, opts.parallel ?? 4);
    let i = 0;
    await Promise.all(Array.from({ length: n }, async () => { while (i < jobs.length) await jobs[i++](); }));
  })();
}
export async function loadModel(k: string, url: string, loader = new GLTFLoader()): Promise<boolean>{
  try {
    const t0 = performance.now();
    const g = await loader.loadAsync(url);
    const t1 = performance.now();
    fixMaterials(g.scene);
    const tpl = prepare(g.scene, g.animations);
    tpl.skin = skinTone(g.scene);
    templates.set(k, tpl);
    console.info('Nạp nhân vật 3D', k, url, g.animations.length ? `(${g.animations.length} động tác)` : '', `tải ${Math.round(t1 - t0)} ms, chuẩn hoá ${Math.round(performance.now() - t1)} ms`);
    return true;
  } catch (e){ console.warn('Không nạp được nhân vật', url, e); return false; }
}
async function loadAnimations(url: string, loader: GLTFLoader){
  try { const g = await loader.loadAsync(url); library.push(...g.animations.map(inPlace).map(noDrift)); console.info('Nạp động tác', url, g.animations.map(c => c.name)); }
  catch (e){ console.warn('Không nạp được động tác', url, e); }
}

export function hash(s: string){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

/* ------------------------------------------------------------ đạo cụ .glb (ly, đồ uống...) */
// Mỗi file nạp đúng một lần, giữ trong bộ nhớ; mỗi lần dùng là một bản sao chung hình khối, chất liệu với bản gốc
// (rẻ, không tốn bộ nhớ). File thiếu hay hỏng thì trả null để bên gọi tự dựng bằng code.
const props = new Map<string, Promise<THREE.Object3D | null>>();
export function loadProp(url: string, loader = new GLTFLoader()): Promise<THREE.Object3D | null> {
  let p = props.get(url);
  if (!p){
    p = loader.loadAsync(url).then(g => {
      g.scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ m.castShadow = true; m.receiveShadow = true; } });
      return g.scene as THREE.Object3D;
    }).catch(e => { console.warn('Không nạp được đạo cụ', url, e); return null; });
    props.set(url, p);
  }
  return p;
}
const loadedProps = new Map<string, THREE.Object3D>();
export async function preloadProps(urls: string[]){ await Promise.all(urls.map(async u => { const o = await loadProp(u); if (o) loadedProps.set(u, o); })); }
// bản sao dùng ngay (đã nạp trước bằng preloadProps), chưa có thì null
export function cloneProp(url: string): THREE.Object3D | null { const o = loadedProps.get(url); return o ? o.clone(true) : null; }
// huỷ hẳn hình khối, chất liệu, ảnh của mọi đạo cụ đã nạp (đóng cảnh)
export function disposeProps(){
  for (const o of loadedProps.values()) disposeTree(o);
  loadedProps.clear(); props.clear();
}
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

/* ------------------------------------------------------------ nhảy dựng bằng khung xương */
// Điệu nhảy đăng ký một lần (bar/dances.ts: 100 điệu); mỗi mẫu người nướng clip riêng khi lần đầu có người nhảy điệu đó
// (khung xương mỗi mẫu dài ngắn khác nhau), rồi giữ trong bộ nhớ đệm: mọi bản sao của mẫu dùng chung clip, không nướng lại.
const danceDefs = new Map<string, ProceduralDance>();
export function registerDances(list: ProceduralDance[]){ for (const d of list) danceDefs.set(d.id, d); }
export const hasDance = (id: string) => danceDefs.has(id);
const rigs = new Map<string, Rig | null>();
const danceClips = new Map<string, Map<string, THREE.AnimationClip>>();
function rigFor(key: string): Rig | null {
  if (!rigs.has(key)){
    const t = templates.get(key);
    let r: Rig | null = null;
    try { r = t ? buildRig(t.scene, t.flip, 1 / t.scale, new THREE.Vector3(-t.offset.x, -t.offset.y, -t.offset.z)) : null; }
    catch (e){ console.warn('Không dựng được khung xương nhảy cho', key, e); }
    rigs.set(key, r);
  }
  return rigs.get(key)!;
}
export const canDance = (key: string) => !!rigFor(key);
export function danceClip(key: string, id: string): THREE.AnimationClip | undefined {
  const def = danceDefs.get(id);
  if (!def) return undefined;
  let m = danceClips.get(key);
  if (!m) danceClips.set(key, m = new Map());
  let c = m.get(id);
  if (!c){ const r = rigFor(key); if (!r) return undefined; c = bakeDance(r, def); m.set(id, c); }
  return c;
}
export const danceCacheSize = () => { let n = 0; for (const m of danceClips.values()) n += m.size; return n; };
// thông tin để nhảy đúng nhịp: điệu nào, nhịp nhạc (BPM), đang ở phách thứ mấy, người này nhấn sớm hay trễ chút (phách)
export interface DanceSync { id: string; bpm: number; beat: number; offset?: number }

/* ------------------------------------------------------------ chất liệu */
// Da: thêm lớp sheen ấm cho cảm giác ánh sáng thấm dưới da; vải: sheen mềm như lụa, nhung; tóc, mi: alpha-to-coverage (đi cùng MSAA)
// cho mép tóc mịn không lỗi thứ tự vẽ; voan, ren mỏng: giữ trong suốt, vẽ hai mặt, không ghi chiều sâu.
const STD_KEYS = ['color', 'map', 'normalMap', 'normalScale', 'roughness', 'roughnessMap', 'metalness', 'metalnessMap', 'aoMap', 'aoMapIntensity',
  'emissive', 'emissiveMap', 'emissiveIntensity', 'alphaMap', 'opacity', 'transparent', 'alphaTest', 'side', 'name', 'vertexColors', 'envMapIntensity'] as const;
function toPhysical(m: THREE.MeshStandardMaterial): THREE.MeshPhysicalMaterial {
  if ((m as THREE.MeshPhysicalMaterial).isMeshPhysicalMaterial) return m as THREE.MeshPhysicalMaterial;
  const p = new THREE.MeshPhysicalMaterial();
  for (const k of STD_KEYS){ const v = (m as any)[k]; if (v !== undefined) (p as any)[k] = v && typeof v.clone === 'function' && !(v as THREE.Texture).isTexture ? v.clone() : v; }
  return p;
}
function fixMaterials(o: THREE.Object3D){
  o.traverse(c => {
    const mesh = c as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.castShadow = true; mesh.receiveShadow = true;
    const fix = (src: THREE.Material) => {
      let mat = src as THREE.MeshStandardMaterial;
      if (!mat.isMeshStandardMaterial) return src;
      const n = plain(mat.name + ' ' + mesh.name);
      if (/veil|voan|tulle|lace|sheer|chiffon/.test(n)){
        mat.transparent = true; mat.depthWrite = false; mat.side = THREE.DoubleSide; mat.opacity = Math.min(mat.opacity, 0.85);
      } else if (/hair|lash|brow|fur/.test(n) || mat.transparent && mat.map){
        mat.transparent = false; mat.alphaTest = Math.max(mat.alphaTest, 0.3); mat.alphaToCoverage = true; mat.depthWrite = true; mat.side = THREE.DoubleSide;
        mat = toPhysical(mat); const p = mat as THREE.MeshPhysicalMaterial;
        p.sheen = 0.6; p.sheenRoughness = 0.35; p.sheenColor.set(0x806050);
      } else if (/dress|gown|cloth|fabric|silk|satin|suit|vest|shirt|pant|skirt|aodai/.test(n)){
        // vải: sheen mềm nhẹ (thân áo thường chung ảnh với bàn tay nên không để quá bóng)
        mat = toPhysical(mat); const p = mat as THREE.MeshPhysicalMaterial;
        p.sheen = /dress|gown|silk|satin|aodai/.test(n) ? 0.6 : 0.25; p.sheenRoughness = 0.5; p.sheenColor.copy(p.color).lerp(new THREE.Color(0xffffff), 0.5);
      } else if (/skin|face|head|body/.test(n)){
        mat = toPhysical(mat); const p = mat as THREE.MeshPhysicalMaterial;
        p.roughness = Math.max(p.roughness, 0.42); p.sheen = 0.35; p.sheenRoughness = 0.55; p.sheenColor.set(0xffb8a0);
      }
      for (const t of [mat.map, mat.emissiveMap]) if (t) t.colorSpace = THREE.SRGBColorSpace;
      return mat;
    };
    mesh.material = Array.isArray(mesh.material) ? mesh.material.map(fix) : fix(mesh.material);
  });
}

// Màu da của mẫu: trung bình vùng giữa ảnh mặt (má, trán), bỏ điểm quá tối (mắt, lông mày) và quá sáng (lóa)
function skinTone(o: THREE.Object3D): THREE.Color | undefined {
  let img: CanvasImageSource | undefined;
  o.traverse(c => { const m = (c as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined; if (!img && m?.map?.image && /skin|head|face/.test(plain(m.name))) img = m.map.image as CanvasImageSource; });
  if (!img || typeof document === 'undefined') return undefined;
  try {
    const S = 48, cv = document.createElement('canvas'); cv.width = cv.height = S;
    const g = cv.getContext('2d', { willReadFrequently: true })!; g.drawImage(img, 0, 0, S, S);
    const d = g.getImageData(Math.floor(S * 0.3), Math.floor(S * 0.3), Math.floor(S * 0.4), Math.floor(S * 0.4)).data;
    let r = 0, gg = 0, b = 0, n = 0;
    for (let i = 0; i < d.length; i += 4){ const l = (d[i] + d[i + 1] + d[i + 2]) / 3; if (l < 35 || l > 235 || d[i] < d[i + 2]) continue; r += d[i]; gg += d[i + 1]; b += d[i + 2]; n++; }
    if (n < 20) return undefined;
    return new THREE.Color().setRGB(r / n / 255, gg / n / 255, b / n / 255, THREE.SRGBColorSpace);
  } catch { return undefined; }
}

// Đồng phục, trang phục đi chơi đêm: tô lại phần vải theo hai màu (chỗ tối của vải nhận màu dark, chỗ sáng nhận màu light),
// giữ nguyên nếp gấp, đường may của ảnh gốc. Điểm ảnh có màu da (bàn tay, cổ, chân trong cùng ảnh thân) được giữ nguyên.
// Mọi người dùng chung một chương trình vẽ, chỉ khác giá trị màu.
export interface Outfit { dark: number; light: number; mix?: number; sheen?: number; shiny?: number }
const OUTFIT_GLSL = `
#ifdef USE_MAP
{
  vec3 c0 = diffuseColor.rgb;
  float l0 = dot(c0, vec3(0.2126, 0.7152, 0.0722));
  float mx = max(c0.r, max(c0.g, c0.b)), mn = min(c0.r, min(c0.g, c0.b)), sat = (mx - mn) / max(mx, 1e-3);
  float skin;
  if (uSkinOn > 0.5){
    // so sắc da với màu da đo từ ảnh mặt của mẫu (đúng cả da sáng lẫn da ngăm), độ sáng được lệch khá rộng vì bóng đổ trong ảnh
    float ls = dot(uSkinRef, vec3(0.2126, 0.7152, 0.0722)), lr = l0 / max(ls, 1e-3);
    float cd = length(c0 / max(l0, 1e-3) - uSkinRef / max(ls, 1e-3));
    skin = (1.0 - smoothstep(0.16, 0.34, cd)) * smoothstep(0.2, 0.4, lr) * (1.0 - smoothstep(2.0, 3.0, lr));
  } else skin = step(c0.b, c0.g) * step(c0.g, c0.r) * smoothstep(0.1, 0.2, sat) * (1.0 - smoothstep(0.66, 0.8, sat)) * smoothstep(0.03, 0.08, l0) * smoothstep(0.004, 0.03, c0.r - c0.g);
  vec3 tone = mix(uOutDark, uOutLight, smoothstep(0.03, 0.6, l0)) * (0.85 + 0.3 * smoothstep(0.0, 0.25, l0));
  diffuseColor.rgb = mix(c0, tone, uOutMix * (1.0 - skin));
}
#endif
`;
function outfitMaterial(src: THREE.Material, o: Outfit, skin?: THREE.Color): THREE.Material {
  const m = (src as THREE.MeshPhysicalMaterial).clone();
  const u = { uOutDark: { value: new THREE.Color(o.dark) }, uOutLight: { value: new THREE.Color(o.light) }, uOutMix: { value: o.mix ?? 0.92 }, uSkinRef: { value: skin?.clone() ?? new THREE.Color(0, 0, 0) }, uSkinOn: { value: skin ? 1 : 0 } };
  if ((m as THREE.MeshPhysicalMaterial).isMeshPhysicalMaterial){
    const p = m as THREE.MeshPhysicalMaterial;
    if (o.sheen !== undefined){ p.sheen = o.sheen; p.sheenColor.set(o.light); }
    if (o.shiny !== undefined){ p.roughness = Math.min(p.roughness, 1 - o.shiny); p.clearcoat = o.shiny * 0.5; p.clearcoatRoughness = 0.35; }
  }
  m.onBeforeCompile = sh => {
    Object.assign(sh.uniforms, u);
    sh.fragmentShader = 'uniform vec3 uOutDark;\nuniform vec3 uOutLight;\nuniform float uOutMix;\nuniform vec3 uSkinRef;\nuniform float uSkinOn;\n' + sh.fragmentShader.replace('#include <map_fragment>', '#include <map_fragment>\n' + OUTFIT_GLSL);
  };
  m.customProgramCacheKey = () => 'outfit';
  m.userData.outfit = true;
  return m;
}

/* ------------------------------------------------------------ nhận khung xương */
type Side = 'l' | 'r' | '';
function classify(name: string): { side: Side; core: string }{
  let s = name.toLowerCase().replace(/[:.\s-]+/g, '_'), side: Side = '';
  if (s.includes('left')){ side = 'l'; s = s.replace('left', ''); }
  else if (s.includes('right')){ side = 'r'; s = s.replace('right', ''); }
  else { const m = /(^|_)([lr])(_|$)/.exec(s); if (m){ side = m[2] as Side; s = s.replace(m[0], '_'); } }
  const core = s.replace(/^_*(mixamorig\d*|j_bip|def|org|bip\d*|cc_base|rig)/, '').replace(/[^a-z]/g, '');
  return { side, core };
}
const CORES = {
  arm: ['arm', 'upperarm'], fore: ['forearm', 'lowerarm'], hand: ['hand'],
  thigh: ['upleg', 'upperleg', 'thigh'], shin: ['leg', 'lowerleg', 'calf', 'shin'], foot: ['foot'], toe: ['toebase', 'toe', 'toes', 'ball'],
};
type Slot = keyof typeof CORES;
const isHips = (core: string) => core === 'hips' || core === 'pelvis' || core === 'hip';
const pos = (o: THREE.Object3D) => o.getWorldPosition(new THREE.Vector3());

function scanBones(model: THREE.Object3D){
  const found: Record<string, THREE.Bone[]> = {};
  let spine: THREE.Bone | undefined, head: THREE.Bone | undefined, neck: THREE.Bone | undefined, hips: THREE.Bone | undefined;
  model.traverse(o => {
    const b = o as THREE.Bone;
    if (!b.isBone) return;
    const { side, core } = classify(b.name);
    if (!hips && isHips(core)) hips = b;
    if (!spine && core === 'spine') spine = b;
    if (!neck && core === 'neck') neck = b;
    if (!head && core === 'head') head = b;
    for (const [slot, names] of Object.entries(CORES)) if (names.includes(core)) (found[slot + side] ??= []).push(b);
  });
  const pair = (slot: Slot): THREE.Bone[] => {
    const l = found[slot + 'l']?.[0], r = found[slot + 'r']?.[0];
    if (l && r) return [l, r];
    const any = found[slot] ?? [];
    return any.length >= 2 ? [any[0], any[1]] : [];
  };
  return { found, pair, spine, head, neck, hips };
}

// chuẩn hoá file một lần: quay mặt ra +z, cao đúng 1,7 m (nhân tỉ lệ sân), chân chạm đất, tâm hông ở gốc
function prepare(scene: THREE.Object3D, clips: THREE.AnimationClip[]): Template {
  scene.updateMatrixWorld(true);
  const { found, pair, hips } = scanBones(scene);
  const lArm = found.arml?.[0], toe = pair('toe')[0], foot = pair('foot')[0];
  const flip = lArm ? pos(lArm).x < 0 : toe && foot ? pos(toe).z < pos(foot).z : false;
  // đo trong hệ của file; quay mặt làm ở nhóm ngoài nên tâm hông vẫn nằm ở gốc
  const box = new THREE.Box3().setFromObject(scene, true), h = box.max.y - box.min.y || 1;
  const c = hips ? pos(hips) : box.getCenter(new THREE.Vector3());
  const hipY = hips ? (pos(hips).y - box.min.y) / h : 0.53;
  // file đã ghi sẵn động tác tại chỗ (extras.inPlace) thì không san phẳng hông, nhưng vẫn bỏ phần trôi dần của mọi động tác
  return { scene, clips: (scene.userData.inPlace ? clips : clips.map(inPlace)).map(noDrift), flip, scale: 1 / h, offset: new THREE.Vector3(-c.x, -box.min.y, -c.z), hipY };
}
// Bỏ phần dời tịnh tiến tích luỹ trong động tác (đi bộ có kèm bước tới): xương gốc trôi dần theo một hướng rồi bật về chỗ cũ
// mỗi vòng lặp, nhìn như bị giật lại. Trừ đi đường thẳng nối khung đầu với khung cuối trên mọi trục (không cần biết trục nào là
// hướng đi, file 3ds Max hay Blender đều đúng), giữ lại nhịp nhún và lắc hông, đầu vòng và cuối vòng khớp nhau nên lặp liền mạch.
function noDrift(clip: THREE.AnimationClip){
  const c = clip.clone();
  for (const t of c.tracks){
    if (!t.name.endsWith('.position') || t.times.length < 2) continue;
    const v = t.values, n = t.times.length, t0 = t.times[0], T = t.times[n - 1] - t0 || 1;
    for (let k = 0; k < 3; k++){
      const d = v[(n - 1) * 3 + k] - v[k];
      for (let i = 0; i < n; i++) v[i * 3 + k] -= d * (t.times[i] - t0) / T;
    }
  }
  return c;
}
// động tác đi tại chỗ: bỏ phần dời ngang của xương hông (game tự di chuyển nhân vật), giữ nhún lên xuống
function inPlace(clip: THREE.AnimationClip){
  const c = clip.clone();
  for (const t of c.tracks){
    if (!t.name.endsWith('.position')) continue;
    if (!isHips(classify(t.name.slice(0, -'.position'.length)).core)) continue;
    const v = t.values, x0 = v[0], z0 = v[2];
    for (let i = 0; i < v.length; i += 3){ v[i] = x0; v[i + 2] = z0; }
  }
  return c;
}

/* ------------------------------------------------------------ động tác */
// Mỗi động tác của game ứng với tên động tác thường gặp trong file (Mixamo, ActorCore, tự làm). Không khớp thì dùng tư thế dựng bằng code.
const DANCE = /danc|samba|salsa|hip ?hop|swing|tango|waltz|shuffle|groove|nhay|mua/i;
const CLIP_FOR: Partial<Record<string, RegExp[]>> = {
  idle: [/breath/i, /idle/i, /stand/i],
  couple: [/couple|celebrat/i, /breath/i, /idle/i],
  walk: [/walk/i],
  clap: [/clap|applau|vo ?tay/i],
  cheer: [/cheer|celebrat|victory|happy|excit/i, /clap/i],
  raise: [/cheer|celebrat|toast/i],
  toast: [/toast|drink/i],
  bow: [/bow|greet|chao/i],
  wave: [/wave|greet|hello|chao/i, DANCE],
  groove: [DANCE], pretty: [DANCE], disco: [DANCE], twist: [DANCE],
  // quán bar: uống đứng, nhảy, chào khách; pha chế, DJ, ngồi, chụp ảnh không có trong file thì dựng bằng code
  sip: [/drink|sip/i], dance: [DANCE], greet: [/wave|greet|hello/i], hype: [/cheer|celebrat|victory/i], talk: [/talk|chat/i, /breath/i, /idle/i],
  // có trong file thì dùng, không thì dựng bằng góc khớp (ngồi luôn dựng bằng code vì game tự hạ hông xuống ghế)
  shake: [/shake/i], pour: [/pour/i], wipe: [/wipe|clean/i], arrange: [/arrange|shelf|reach/i], serve: [/serve|give|hand ?over/i], carry: [/carry|tray/i],
  dj: [/(^|[^a-z])dj|turntable|mixing/i], djhype: [/dj.*(hype|cheer)|fist ?pump/i, /cheer|celebrat/i], photo: [/phone|photo|selfie/i], guard: [/arms? ?cross|guard/i],
};

interface Joint { b: THREE.Bone; rest: THREE.Quaternion; w: THREE.Quaternion; wi: THREE.Quaternion; base: THREE.Quaternion }
const DOWN = new THREE.Vector3(0, -1, 0);
const _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const SEAT = 0.46;   // độ cao mặt ghế quầy bar, mét

// Tuỳ chọn riêng cho từng người (đơn vị cảnh, đồng phục, vóc dáng...)
export interface FigureOptions {
  unit?: number;        // 1 mét người thật bằng bao nhiêu đơn vị cảnh (mặc định 1: cảnh tính bằng mét)
  outfit?: Outfit;      // tô lại trang phục
  build?: number;       // vóc dáng: 1 bình thường, 1,08 đậm người, 0,94 mảnh khảnh (chỉ bề ngang)
  seat?: number;        // độ cao hông khi ngồi, theo đơn vị cảnh
}
export type BoneSlot = 'head' | 'spine' | 'handL' | 'handR';
interface Attachment { obj: THREE.Object3D; bone: THREE.Bone; rest: THREE.Quaternion; offset: THREE.Vector3; owned: boolean }

export type FigureKind = 'guest' | 'staff';
// Động tác nhào lộn chồng lên điệu đang nhảy (xoay, nhấc cả thân quanh hông; tay chân vẫn nhảy theo điệu):
//   backflip / frontflip  lộn ngửa / lộn sấp một vòng trên không     cartwheel  lộn nhào ngang (bánh xe)
//   spin    xoay 720 độ tại chỗ                                       tuck       bật nhảy co gối
//   headspin trồng chuối xoay đầu (chân đá cắt kéo theo điệu)          windmill   nằm ngửa xoay cối xay gió sát sàn
//   freeze   nghiêng người chống một tay, khựng lại tạo dáng
export type TrickKind = 'backflip' | 'frontflip' | 'cartwheel' | 'spin' | 'tuck' | 'headspin' | 'windmill' | 'freeze';
const ease = (s: number) => s < 0.5 ? 2 * s * s : 1 - 2 * (1 - s) * (1 - s);
const inOut = (s: number, k = 0.14) => { const a = Math.min(1, s / k), b = Math.min(1, (1 - s) / k); return ease(Math.max(0, Math.min(a, b))); };
export class GlbFigure {
  readonly root = new THREE.Group();
  readonly kind: FigureKind;
  readonly model: string;
  readonly held = new THREE.Group(); readonly heldL = new THREE.Group();   // đồ cầm tay phải / tay trái (ly, shaker, khay, điện thoại)
  // cập nhật bộ phát động tác mỗi lodStep khung hình (người ở xa, khuất: 2–4 cho nhẹ máy), thời gian dồn lại nên không chậm đi
  lodStep = 1;
  private frame = Math.floor(Math.random() * 4); private lodDt = 0;
  private tiltG = new THREE.Group();
  private scene: THREE.Object3D;
  private spine?: Joint; private head?: Joint;
  private arm: Joint[] = []; private fore: Joint[] = []; private thigh: Joint[] = []; private shin: Joint[] = [];
  private hands: THREE.Object3D[] = [];
  private restAll: [THREE.Bone, THREE.Quaternion, THREE.Vector3][] = [];
  private mixer?: THREE.AnimationMixer;
  private clips: THREE.AnimationClip[] = [];
  private action?: THREE.AnimationAction; private actionFor = '';
  private last = performance.now(); private t0 = Math.random() * 10;
  private hipH: number;
  private bodyH = 1.7;
  private trickState: { kind: TrickKind; t0: number; ms: number } | null = null;
  // bắt đầu một động tác nhào lộn dài sec giây
  trick(kind: TrickKind, sec: number){ this.trickState = { kind, t0: performance.now(), ms: sec * 1000 }; }
  get tricking(){ return !!this.trickState; }
  private unit = 1;                                  // 1 mét của người thật đổi ra đơn vị cảnh
  private k: number;                                 // tỉ lệ cảnh
  private seatH: number;
  private ownMats: THREE.Material[] = [];
  private skin?: THREE.Color;
  private attached: Attachment[] = [];
  private bones: Partial<Record<BoneSlot, THREE.Bone>> = {};

  // key: 'guest:<tên file>' hoặc 'role:<tên file>'
  constructor(kind: FigureKind, key: string, height = 1.68, opts: FigureOptions = {}){
    this.kind = kind; this.model = key;
    const tpl = templates.get(key);
    if (!tpl) throw new Error('Chưa nạp nhân vật ' + key);
    this.k = opts.unit ?? 1;
    this.seatH = opts.seat ?? SEAT;
    const model = this.scene = cloneSkinned(tpl.scene);
    const H = height * this.k, s = H * tpl.scale;
    this.unit = H / height;
    const holder = new THREE.Group(), inner = new THREE.Group(), pivot = H / 2;
    // holder: quay mặt ra trước; inner: tỉ lệ và độ lệch đã tính sẵn cho file
    holder.rotation.y = tpl.flip ? Math.PI : 0; inner.scale.setScalar(s); inner.position.copy(tpl.offset).multiplyScalar(s);
    if (opts.build && opts.build !== 1){ inner.scale.x *= opts.build; inner.scale.z *= opts.build; inner.position.x *= opts.build; inner.position.z *= opts.build; }
    this.root.add(this.tiltG); this.tiltG.add(holder); holder.add(inner); inner.add(model);
    this.tiltG.position.y = pivot; holder.position.y = -pivot;
    this.hipH = tpl.hipY * H; this.bodyH = H;
    this.skin = tpl.skin;
    if (opts.outfit) this.dress(opts.outfit);
    this.root.updateMatrixWorld(true);

    const { pair, spine, head, neck } = scanBones(model);
    const joint = (b: THREE.Bone, base = new THREE.Quaternion()): Joint => {
      const w = b.getWorldQuaternion(new THREE.Quaternion());
      return { b, rest: b.quaternion.clone(), w, wi: w.clone().invert(), base };
    };
    const byX = (bs: THREE.Bone[]) => bs.sort((a, b) => pos(a).x - pos(b).x);   // [0] bên -x (tay trái của tư thế), [1] bên +x
    const arms = byX(pair('arm')), fores = pair('fore'), hands = pair('hand'), thighs = byX(pair('thigh')), shins = pair('shin'), feet = pair('foot');
    const near = (list: THREE.Bone[], ref: THREE.Bone) => list.slice().sort((a, b) => pos(a).distanceTo(pos(ref)) - pos(b).distanceTo(pos(ref)))[0];
    for (const a of arms){
      const f = fores.length ? near(fores, a) : undefined, hd = hands.length && f ? near(hands, f) : undefined;
      // tư thế chữ T / chữ A trong file: xoay cho tay buông thẳng xuống trước, rồi mới cộng góc tư thế
      const baseA = f ? new THREE.Quaternion().setFromUnitVectors(_v.subVectors(pos(f), pos(a)).normalize(), DOWN) : new THREE.Quaternion();
      this.arm.push(joint(a, baseA));
      if (f && hd){
        const target = DOWN.clone().applyQuaternion(baseA.clone().invert());
        this.fore.push(joint(f, new THREE.Quaternion().setFromUnitVectors(_v.subVectors(pos(hd), pos(f)).normalize(), target)));
        this.hands.push(hd);
      }
    }
    for (const t of thighs){
      const sh = shins.length ? near(shins, t) : undefined, ft = feet.length && sh ? near(feet, sh) : undefined;
      const baseT = sh ? new THREE.Quaternion().setFromUnitVectors(_v.subVectors(pos(sh), pos(t)).normalize(), DOWN) : new THREE.Quaternion();
      this.thigh.push(joint(t, baseT));
      if (sh && ft) this.shin.push(joint(sh, new THREE.Quaternion().setFromUnitVectors(_v.subVectors(pos(ft), pos(sh)).normalize(), DOWN.clone().applyQuaternion(baseT.clone().invert()))));
    }
    if (this.arm.length < 2) this.arm = [];
    if (this.fore.length < 2){ this.fore = []; this.hands = []; }
    if (this.thigh.length < 2) this.thigh = [];
    if (this.shin.length < 2) this.shin = [];
    if (spine) this.spine = joint(spine);
    if (head ?? neck) this.head = joint((head ?? neck)!);
    this.bones = { head: head ?? neck, spine, handL: this.hands[0] as THREE.Bone | undefined, handR: this.hands[1] as THREE.Bone | undefined };
    model.traverse(o => { const b = o as THREE.Bone; if (b.isBone) this.restAll.push([b, b.quaternion.clone(), b.position.clone()]); });

    // động tác: của chính file trước, rồi thư viện dùng chung nếu khung xương khớp tên
    const names = new Set<string>(); model.traverse(o => names.add(o.name));
    const fits = (c: THREE.AnimationClip) => { const ts = c.tracks; let ok = 0; for (const t of ts) if (names.has(t.name.split('.')[0])) ok++; return ts.length > 0 && ok / ts.length > 0.8; };
    this.clips = [...tpl.clips, ...library].filter(fits);
    if (this.clips.length || canDance(key)) this.mixer = new THREE.AnimationMixer(model);

    this.tiltG.add(this.held, this.heldL);
  }

  // thay trang phục (đổi đồng phục, khách lên VIP): chất liệu vải riêng của người này, ảnh vẫn dùng chung với mẫu gốc
  dress(o: Outfit | null){
    for (const m of this.ownMats) m.dispose();
    this.ownMats = [];
    this.scene.traverse(c => {
      const mesh = c as THREE.Mesh;
      if (!mesh.isMesh) return;
      const swap = (m: THREE.Material) => {
        const base = (m.userData.outfitBase as THREE.Material | undefined) ?? m;
        if (!o) return base;
        const n = plain(base.name + ' ' + mesh.name);
        if (!/cloth|dress|gown|suit|vest|shirt|pant|skirt|fabric|body/.test(n) || /skin|head|face|hair|lash|brow|metal|pearl|glass|flower|veil/.test(n)) return base;
        const nm = outfitMaterial(base, o, this.skin); nm.userData.outfitBase = base; this.ownMats.push(nm);
        return nm;
      };
      mesh.material = Array.isArray(mesh.material) ? mesh.material.map(swap) : swap(mesh.material);
    });
  }

  // Gắn đạo cụ theo xương (tai nghe DJ trên đầu, bộ đàm bảo vệ...): bám vị trí và hướng xoay của xương mỗi khung hình.
  // offset tính theo mét người thật trong hệ người (x ngang, y lên, z trước) lúc đứng thẳng. owned: huỷ cùng người.
  attach(obj: THREE.Object3D, slot: BoneSlot, offset = new THREE.Vector3(), owned = true){
    const bone = this.bones[slot];
    if (!bone) return false;
    this.root.updateMatrixWorld(true);
    const rest = this.relQuat(bone, new THREE.Quaternion());
    this.attached.push({ obj, bone, rest, offset: offset.clone().multiplyScalar(this.unit), owned });
    obj.scale.multiplyScalar(this.unit);
    this.tiltG.add(obj);
    return true;
  }
  // gỡ đồ đã gắn (không huỷ đồ; bên gọi tự huỷ)
  detach(obj: THREE.Object3D){
    const i = this.attached.findIndex(a => a.obj === obj);
    if (i < 0) return;
    const a = this.attached[i];
    this.attached.splice(i, 1);
    obj.removeFromParent(); obj.scale.divideScalar(this.unit);
    void a;
  }
  // hướng xoay của xương trong hệ tiltG
  private relQuat(b: THREE.Object3D, out: THREE.Quaternion){
    this.tiltG.getWorldQuaternion(_q2).invert();
    return out.copy(_q2).multiply(b.getWorldQuaternion(_q));
  }
  private placeAttachments(){
    if (!this.attached.length) return;
    this.tiltG.updateWorldMatrix(true, false);
    const qd = new THREE.Quaternion();
    for (const a of this.attached){
      this.relQuat(a.bone, qd).multiply(_q.copy(a.rest).invert());          // xương đã xoay bao nhiêu so với lúc gắn
      this.tiltG.worldToLocal(a.bone.getWorldPosition(_v));
      a.obj.quaternion.copy(qd);
      a.obj.position.copy(_v).add(_v2.copy(a.offset).applyQuaternion(qd));
    }
  }

  private clipFor(anim: string): THREE.AnimationClip | undefined {
    if (anim.startsWith('dance:')){
      // có động tác quay thật (mocap) đặt tên trùng mã điệu (vd. "renegade") trong file người hay dong-tac*.glb thì dùng bản thật
      const id = anim.slice(6), want = plain(id);
      return this.clips.find(c => plain(c.name) === want) ?? danceClip(this.model, id) ?? this.clipFor('dance');
    }
    // nhiều động tác cùng loại (ba điệu nhảy...) thì mỗi người chọn một điệu riêng
    for (const re of CLIP_FOR[anim] ?? []){ const cs = this.clips.filter(c => re.test(c.name)); if (cs.length) return cs[Math.floor(this.t0 * 7) % cs.length]; }
    return undefined;
  }
  hasClip(anim: string){ return !!this.clipFor(anim); }
  // chuyển động tác mượt (chồng mờ 0,35 giây); về tư thế code thì trả mọi xương về dáng gốc trước
  private play(anim: string): boolean {
    if (!this.mixer) return false;
    if (anim === this.actionFor) return !!this.action;
    this.actionFor = anim;
    const clip = this.clipFor(anim), prev = this.action;
    if (!clip){
      if (prev){ this.mixer.stopAllAction(); this.action = undefined; for (const [b, q, p] of this.restAll){ b.quaternion.copy(q); b.position.copy(p); } }
      return false;
    }
    const next = this.mixer.clipAction(clip);
    if (prev === next) return true;
    next.reset().setEffectiveWeight(1).play();
    // điệu nhảy dựng sẵn: vào đúng phách nhạc; động tác khác: mỗi người lệch một chút cho khỏi đều răm rắp
    const procedural = clip.name.startsWith('dance:');
    next.time = procedural && this.sync ? this.syncTime(clip) : Math.random() * clip.duration;
    if (prev) next.crossFadeFrom(prev, procedural ? 0.5 : 0.35, false);
    // điệu cũ: chồng mờ xong thì dừng và bỏ khỏi bộ phát (không giữ hàng trăm action cho 100 điệu)
    if (prev && prev.getClip().name.startsWith('dance:')) this.retired.push({ a: prev, until: performance.now() + 900 });
    this.action = next;
    return true;
  }
  private sync: DanceSync | null = null;
  private retired: { a: THREE.AnimationAction; until: number }[] = [];
  private syncTime(clip: THREE.AnimationClip){
    const s = this.sync!, spb = 60 / DANCE_BPM, beats = clip.duration / spb, b = s.beat + (s.offset ?? 0);
    return (((b % beats) + beats) % beats) * spb;
  }
  // Nhảy theo nhịp: tốc độ clip theo BPM thật; lệch phách thì nhanh chậm lên chút để bắt lại (lệch nhiều thì nhảy thẳng tới phách)
  private keepBeat(){
    const a = this.action, s = this.sync;
    if (!a || !s || a.getClip().name !== 'dance:' + s.id) return;
    const T = a.getClip().duration, want = this.syncTime(a.getClip());
    let err = want - a.time; if (err > T / 2) err -= T; else if (err < -T / 2) err += T;
    const base = Math.max(0.5, Math.min(2, s.bpm / DANCE_BPM));
    if (Math.abs(err) > 0.3){ a.time = want; a.timeScale = base; }
    else a.timeScale = base * (1 + Math.max(-0.3, Math.min(0.3, err * 2)));
  }
  get danceId(){ const n = this.action?.getClip().name ?? ''; return n.startsWith('dance:') ? n.slice(6) : ''; }

  // góc xoay tính trong hệ toạ độ người (x ngang, y lên, z trước), đổi sang hệ riêng của từng xương
  private set(j: Joint | undefined, x: number, y: number, z: number){
    if (!j) return;
    _q.setFromEuler(_e.set(x, y, z)).multiply(j.base);
    j.b.quaternion.copy(j.rest).multiply(_q.premultiply(j.wi).multiply(j.w));
  }

  // y: độ cao mặt sàn chỗ người đứng (bục sân khấu, khu VIP); speed: nhịp động tác (1 bình thường); seat: độ cao mặt ghế so với sàn
  update(x: number, z: number, yaw: number, p: Pose, sit: boolean, opts: { anim?: string; y?: number; speed?: number; seat?: number; dance?: DanceSync | null }){
    const now = performance.now(), dt = Math.min(0.1, (now - this.last) / 1000); this.last = now;
    this.sync = opts.dance && danceDefs.has(opts.dance.id) && !sit ? opts.dance : null;
    const clip = this.play(sit ? 'sit' : this.sync ? 'dance:' + this.sync.id : opts.anim ?? '');
    if (clip){
      this.keepBeat();
      if (this.retired.length && this.mixer){ for (const r of this.retired) if (now > r.until && r.a !== this.action){ r.a.stop(); this.mixer.uncacheAction(r.a.getClip(), this.scene); } this.retired = this.retired.filter(r => now <= r.until && r.a !== this.action); }
      this.lodDt += dt * (this.sync ? 1 : opts.speed ?? 1);
      if (++this.frame % Math.max(1, this.lodStep) === 0){ this.mixer!.update(this.lodDt); this.lodDt = 0; }
    }
    const drop = sit ? Math.max(0, this.hipH - (opts.seat ?? this.seatH)) : 0, sk = this.k / POSE_SCALE;
    this.root.position.set(x, (opts.y ?? 0) + (clip ? 0 : (p.bob + p.lift * LIFT) * sk) - drop, z);
    this.root.rotation.y = yaw + (clip ? 0 : p.spin);
    this.tiltG.rotation.x = clip ? 0 : p.tilt; this.tiltG.rotation.z = 0;
    this.applyTrick(now);
    if (!clip){
      // đứng yên vẫn thở: ngực phồng nhẹ theo nhịp 4 giây
      const breath = Math.sin((now / 1000 + this.t0) * 1.6) * 0.018;
      this.set(this.spine, p.bend - breath, 0, 0);
      this.set(this.head, p.headTilt * 0.4 + breath * 0.5, p.headTilt, 0);
      // người thật hông rộng hơn: tay dang ra thêm một chút cho khỏi lẹm vào hông
      const OUT = 0.1;
      if (this.arm.length){ this.set(this.arm[0], p.armL, 0, p.armLz - OUT); this.set(this.arm[1], p.armR, 0, p.armRz + OUT); }
      if (this.fore.length){ this.set(this.fore[0], -0.15 - Math.max(0, -p.armL) * 0.25 - (p.foreL ?? 0), 0, 0); this.set(this.fore[1], -0.15 - Math.max(0, -p.armR) * 0.25 - (p.foreR ?? 0), 0, 0); }
      if (this.thigh.length){ this.set(this.thigh[0], p.legL, 0, 0); this.set(this.thigh[1], p.legR, 0, 0); }
      if (this.shin.length){
        this.set(this.shin[0], sit || p.legL < -1.2 ? -p.legL : Math.max(0, -p.legL) * 0.4, 0, 0);
        this.set(this.shin[1], sit || p.legR < -1.2 ? -p.legR : Math.max(0, -p.legR) * 0.4, 0, 0);
      }
    }
    this.placeAttachments();
    const holding = this.held.children.length > 0 || this.heldL.children.length > 0;
    if (holding && this.hands.length === 2){
      this.root.updateMatrixWorld(true);
      // đồ cầm tay luôn đứng thẳng (ly không đổ), đặt ngay lòng bàn tay
      if (this.held.children.length) this.held.position.copy(this.tiltG.worldToLocal(pos(this.hands[1]))).add(_v2.set(0, -0.03 * this.unit, 0.035 * this.unit));
      if (this.heldL.children.length) this.heldL.position.copy(this.tiltG.worldToLocal(pos(this.hands[0]))).add(_v2.set(0, -0.02 * this.unit, 0.035 * this.unit));
    }
  }

  // xoay / nhấc cả thân quanh hông (tiltG đặt ở giữa người) theo động tác nhào lộn đang làm
  private applyTrick(now: number){
    const tr = this.trickState; if (!tr) return;
    const s = (now - tr.t0) / tr.ms;
    if (s >= 1 || s < 0){ this.trickState = null; return; }
    const H = this.bodyH, sec = (now - tr.t0) / 1000, arc = 4 * s * (1 - s), r = this.root, g = this.tiltG, T = Math.PI * 2;
    switch (tr.kind){
      case 'backflip': g.rotation.x = -T * ease(s); r.position.y += arc * 0.75 * this.unit; break;
      case 'frontflip': g.rotation.x = T * ease(s); r.position.y += arc * 0.7 * this.unit; break;
      case 'cartwheel': g.rotation.z = T * ease(s); r.position.y += arc * 0.35 * this.unit; break;
      case 'spin': r.rotation.y += T * 2 * ease(s); r.position.y += arc * 0.12 * this.unit; break;
      case 'tuck': r.position.y += arc * 0.6 * this.unit; g.rotation.x = Math.sin(s * Math.PI) * 0.35; break;
      case 'headspin': { const a = inOut(s); g.rotation.x = Math.PI * a; r.rotation.y += sec * 16 * a; r.position.y += 0.04 * a * this.unit; break; }
      case 'windmill': { const a = inOut(s, 0.18); g.rotation.x = -Math.PI / 2 * a; g.rotation.z = Math.sin(sec * 11) * 0.55 * a; r.rotation.y += sec * 9 * a; r.position.y -= (H / 2 - 0.22 * this.unit) * a; break; }
      case 'freeze': { const a = inOut(s, 0.2); g.rotation.z = 1.15 * a; g.rotation.x = -0.25 * a; r.position.y -= 0.32 * a * this.unit; break; }
    }
  }

  // vị trí bàn tay trong hệ cảnh (để đạo cụ bay ra từ tay, ánh sáng bám tay...)
  handWorld(right = true, out = new THREE.Vector3()){ const h = this.hands[right ? 1 : 0]; return h ? h.getWorldPosition(out) : this.root.getWorldPosition(out); }
  headWorld(out = new THREE.Vector3()){ return this.head ? this.head.b.getWorldPosition(out) : this.root.getWorldPosition(out).setY(1.6 * this.unit); }

  // hình khối và chất liệu dùng chung với mẫu gốc nên không huỷ; chỉ huỷ khung xương riêng, bộ phát động tác, chất liệu đồng phục
  // và đạo cụ riêng của người này
  dispose(){
    this.root.removeFromParent();
    if (this.mixer){ this.mixer.stopAllAction(); this.mixer.uncacheRoot(this.scene); }
    this.scene.traverse(o => { const s = o as THREE.SkinnedMesh; if (s.isSkinnedMesh) s.skeleton.dispose(); });
    for (const m of this.ownMats) m.dispose();
    this.ownMats = [];
    for (const a of this.attached) if (a.owned) disposeTree(a.obj);
    this.attached = [];
  }
}
