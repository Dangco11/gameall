import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import type { Look, Pose } from './cast.ts';
import { SCALE as BASE_SCALE, BIG, avatarDisc, buildBouquet, buildGlass, type HdKind } from './hd.ts';
const SCALE = BASE_SCALE * BIG;   // to gấp đôi (hd.ts: BIG)

// Nhân vật 3D như thật nạp từ file .glb / .vrm trong village/models/ (tải lại trang là dùng, không cần mở lại server):
//   codau.glb, chure.glb                cô dâu, chú rể
//   khach-nam-*.glb, khach-nu-*.glb     khách nam, khách nữ (càng nhiều file càng đa dạng; mỗi người khách luôn giữ đúng một mẫu)
//   khach-gia-*.glb, khach-tre-*.glb    người lớn tuổi, trẻ con (không có thì trẻ con vẫn là người chibi)
//   khach-*.glb                         khách chung, dùng cho cả nam lẫn nữ khi thiếu mẫu riêng
//   dong-tac*.glb                       thư viện động tác (ví dụ tải từ Mixamo), dùng chung cho mọi nhân vật cùng kiểu khung xương
// Nhận khung xương MakeHuman / MPFB, Mixamo, VRoid, Rigify, Character Creator. Động tác có sẵn trong file (idle, walk, dance, clap,
// cheer, wave…) được phát bằng AnimationMixer; động tác nào file không có thì các khớp nhận góc tư thế của người chibi như cũ.
// Thiếu file hoặc file hỏng thì cô dâu chú rể dùng người áo dài dựng bằng code (hd.ts), khách dùng người chibi.

interface Template {
  scene: THREE.Object3D; clips: THREE.AnimationClip[];
  // chuẩn hoá một lần cho mỗi file: hướng mặt, tỉ lệ, độ lệch để chân chạm đất, độ cao hông
  flip: boolean; scale: number; offset: THREE.Vector3; hipY: number;
}
const templates = new Map<string, Template>();
const library: THREE.AnimationClip[] = [];          // động tác dùng chung từ dong-tac*.glb
const guestKeys = { nam: [] as string[], nu: [] as string[], gia: [] as string[], tre: [] as string[], chung: [] as string[] };
export const hasModel = (k: HdKind) => templates.has(k);
export const hasGuestModels = () => Object.values(guestKeys).some(l => l.length > 0);

const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[\s_-]/g, '');
let loading: Promise<void> | null = null;
export function loadModels(){
  // nạp một lần duy nhất, gọi lại chỉ nhận lại cùng lời hứa
  return loading ??= (async () => {
    if (new URLSearchParams(location.search).has('nomodel')) return;
    let files: string[] = [];
    try { files = await (await fetch('/models/list.json')).json(); } catch { return; }
    const loader = new GLTFLoader();
    const url = (f: string) => '/models/' + encodeURIComponent(f);
    // động tác trước để nhân vật tạo ra sau đã có sẵn
    for (const f of files.filter(n => /^(dongtac|anim)/.test(plain(n)))) await loadAnimations(url(f), loader);
    for (const [k, re] of [['bride', /^(codau|bride)/], ['groom', /^(chure|groom)/]] as [HdKind, RegExp][]){
      const f = files.find(n => re.test(plain(n)));
      if (f) await loadModel(k, url(f), loader);
    }
    for (const f of files){
      const p = plain(f);
      if (!/^(khach|guest)/.test(p)) continue;
      const key = 'guest:' + f;
      if (!await loadModel(key, url(f), loader)) continue;
      const tail = p.replace(/^(khach|guest)/, '');
      const cat = /^(nam|male|man)/.test(tail) ? 'nam' : /^(nu|female|woman)/.test(tail) ? 'nu' : /^(gia|old|elder)/.test(tail) ? 'gia' : /^(tre|kid|child)/.test(tail) ? 'tre' : 'chung';
      guestKeys[cat].push(key);
    }
  })();
}
export async function loadModel(k: string, url: string, loader = new GLTFLoader()): Promise<boolean>{
  try {
    const g = await loader.loadAsync(url);
    fixMaterials(g.scene);
    templates.set(k, prepare(g.scene, g.animations));
    console.info('Nạp nhân vật 3D', k, url, g.animations.length ? `(${g.animations.length} động tác)` : '');
    return true;
  } catch (e){ console.warn('Không nạp được nhân vật', url, e); return false; }
}
async function loadAnimations(url: string, loader: GLTFLoader){
  try { const g = await loader.loadAsync(url); library.push(...g.animations.map(inPlace).map(noDrift)); console.info('Nạp động tác', url, g.animations.map(c => c.name)); }
  catch (e){ console.warn('Không nạp được động tác', url, e); }
}

// Chọn mẫu khách theo người: cùng id luôn cùng mẫu; nam / nữ / người già / trẻ con theo dáng người chibi đang có
export function guestModelFor(id: string, look: Look): string {
  const child = look.scale < 0.8, old = look.hair === 0xd9d4cc, woman = look.longHair;
  const list = child ? guestKeys.tre
    : old && guestKeys.gia.length ? guestKeys.gia
    : (woman ? guestKeys.nu : guestKeys.nam).length ? (woman ? guestKeys.nu : guestKeys.nam)
    : guestKeys.chung;
  if (!list.length) return '';
  let h = 2166136261; for (let i = 0; i < id.length; i++){ h ^= id.charCodeAt(i); h = Math.imul(h, 16777619); }
  return list[(h >>> 0) % list.length];
}

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
};

interface Joint { b: THREE.Bone; rest: THREE.Quaternion; w: THREE.Quaternion; wi: THREE.Quaternion; base: THREE.Quaternion }
const DOWN = new THREE.Vector3(0, -1, 0);
const _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _v2 = new THREE.Vector3();
const SEAT = 0.42 * BIG;   // độ cao hông khi ngồi ghế trong sân (bằng người chibi ngồi)

export type FigureKind = HdKind | 'guest';
export class GlbFigure {
  readonly root = new THREE.Group();
  readonly kind: FigureKind;
  readonly model: string;
  readonly bouquet = new THREE.Group(); readonly glass = new THREE.Group();
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
  private bouquetBuilt = false;
  private avatar?: THREE.Mesh; private unit = 1;     // unit: 1 mét của người thật đổi ra đơn vị sân

  // ảnh đại diện TikTok phủ lên mặt: đĩa tròn bám theo xương đầu, luôn quay cùng hướng người
  setAvatar(tex: THREE.Texture | null){ this.avatar = avatarDisc(this.avatar, this.tiltG, 0.13 * this.unit, tex); }
  private placeAvatar(){
    const a = this.avatar;
    if (!a || !a.visible) return;
    if (!this.head){ a.position.set(0, this.unit * 1.58, this.unit * 0.12); return; }
    this.tiltG.updateWorldMatrix(true, false);
    this.tiltG.worldToLocal(this.head.b.getWorldPosition(_v));
    // xương đầu nằm ở gáy (đỉnh cổ): mặt ở cao hơn chút và nhô ra trước
    a.position.set(_v.x, _v.y + 0.085 * this.unit, _v.z + 0.13 * this.unit);
  }

  // key: 'bride', 'groom' hoặc 'guest:<tên file>' (lấy từ guestModelFor)
  constructor(kind: FigureKind, key: string = kind, height = kind === 'bride' ? 1.63 : kind === 'groom' ? 1.73 : 1.68){
    this.kind = kind; this.model = key;
    const tpl = templates.get(key)!;
    const model = this.scene = cloneSkinned(tpl.scene);
    const H = height * SCALE, s = H * tpl.scale;
    this.unit = H / height;
    const holder = new THREE.Group(), inner = new THREE.Group(), pivot = H / 2;
    // holder: quay mặt ra trước; inner: tỉ lệ và độ lệch đã tính sẵn cho file
    holder.rotation.y = tpl.flip ? Math.PI : 0; inner.scale.setScalar(s); inner.position.copy(tpl.offset).multiplyScalar(s);
    this.root.add(this.tiltG); this.tiltG.add(holder); holder.add(inner); inner.add(model);
    this.tiltG.position.y = pivot; holder.position.y = -pivot;
    this.hipH = tpl.hipY * H;
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
    model.traverse(o => { const b = o as THREE.Bone; if (b.isBone) this.restAll.push([b, b.quaternion.clone(), b.position.clone()]); });

    // động tác: của chính file trước, rồi thư viện dùng chung nếu khung xương khớp tên
    const names = new Set<string>(); model.traverse(o => names.add(o.name));
    const fits = (c: THREE.AnimationClip) => { const ts = c.tracks; let ok = 0; for (const t of ts) if (names.has(t.name.split('.')[0])) ok++; return ts.length > 0 && ok / ts.length > 0.8; };
    this.clips = [...tpl.clips, ...library].filter(fits);
    if (this.clips.length) this.mixer = new THREE.AnimationMixer(model);

    buildGlass(this.glass); this.glass.scale.setScalar(SCALE); this.tiltG.add(this.glass);
    this.bouquet.scale.setScalar(1.35 * SCALE); this.bouquet.rotation.x = 0.7; this.tiltG.add(this.bouquet);
    this.bouquet.visible = false;
  }

  private clipFor(anim: string){
    // nhiều động tác cùng loại (ba điệu nhảy...) thì mỗi người chọn một điệu riêng
    for (const re of CLIP_FOR[anim] ?? []){ const cs = this.clips.filter(c => re.test(c.name)); if (cs.length) return cs[Math.floor(this.t0 * 7) % cs.length]; }
    return undefined;
  }
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
    next.time = Math.random() * clip.duration;        // khách không nhảy đều răm rắp như nhau
    if (prev) next.crossFadeFrom(prev, 0.35, false);
    this.action = next;
    return true;
  }

  // góc xoay tính trong hệ toạ độ người (x ngang, y lên, z trước), đổi sang hệ riêng của từng xương
  private set(j: Joint | undefined, x: number, y: number, z: number){
    if (!j) return;
    _q.setFromEuler(_e.set(x, y, z)).multiply(j.base);
    j.b.quaternion.copy(j.rest).multiply(_q.premultiply(j.wi).multiply(j.w));
  }

  update(x: number, z: number, yaw: number, p: Pose, sit: boolean, opts: { bouquet: boolean; glass: boolean; flare: number; anim?: string }){
    const now = performance.now(), dt = Math.min(0.1, (now - this.last) / 1000); this.last = now;
    // ngồi, hay đang cầm bó hoa (tay ôm hoa trước ngực): dùng tư thế dựng bằng code
    const clip = this.play(sit ? 'sit' : opts.bouquet ? 'hold' : opts.anim ?? '');
    if (clip) this.mixer!.update(dt);
    const drop = sit ? Math.max(0, this.hipH - SEAT) : 0;
    this.root.position.set(x, (clip ? 0 : p.bob + p.lift * 1.12 * BIG) - drop, z);
    this.root.rotation.y = yaw + (clip ? 0 : p.spin);
    this.tiltG.rotation.x = clip ? 0 : p.tilt;
    if (!clip){
      // đứng yên vẫn thở: ngực phồng nhẹ theo nhịp 4 giây
      const breath = Math.sin((now / 1000 + this.t0) * 1.6) * 0.018;
      this.set(this.spine, p.bend - breath, 0, 0);
      this.set(this.head, p.headTilt * 0.4 + breath * 0.5, p.headTilt, 0);
      // người thật hông rộng hơn: tay dang ra thêm một chút cho khỏi lẹm vào hông
      const OUT = 0.1;
      if (this.arm.length){ this.set(this.arm[0], p.armL, 0, p.armLz - OUT); this.set(this.arm[1], p.armR, 0, p.armRz + OUT); }
      if (this.fore.length){ this.set(this.fore[0], -0.15 - Math.max(0, -p.armL) * 0.25, 0, 0); this.set(this.fore[1], -0.15 - Math.max(0, -p.armR) * 0.25, 0, 0); }
      if (this.thigh.length){ this.set(this.thigh[0], p.legL, 0, 0); this.set(this.thigh[1], p.legR, 0, 0); }
      if (this.shin.length){
        this.set(this.shin[0], sit || p.legL < -1.2 ? -p.legL : Math.max(0, -p.legL) * 0.4, 0, 0);
        this.set(this.shin[1], sit || p.legR < -1.2 ? -p.legR : Math.max(0, -p.legR) * 0.4, 0, 0);
      }
    }
    this.placeAvatar();
    if (opts.bouquet && !this.bouquetBuilt){ buildBouquet(this.bouquet); this.bouquetBuilt = true; }
    this.bouquet.visible = opts.bouquet; this.glass.visible = opts.glass;
    // bó hoa giữa hai bàn tay, ly rượu trong tay phải (bên +x, tay nâng ly của tư thế)
    if ((this.bouquet.visible || this.glass.visible) && this.hands.length === 2){
      this.root.updateMatrixWorld(true);
      if (this.bouquet.visible){
        this.tiltG.worldToLocal(_v.copy(pos(this.hands[0])).add(pos(this.hands[1])).multiplyScalar(0.5));
        this.bouquet.position.copy(_v).add(_v2.set(0, 0.04 * SCALE, 0.07 * SCALE));
      }
      if (this.glass.visible) this.glass.position.copy(this.tiltG.worldToLocal(pos(this.hands[1]))).add(_v2.set(0, 0.02 * SCALE, 0.03 * SCALE));
    }
  }

  // hình khối và chất liệu dùng chung với mẫu gốc nên không huỷ; chỉ huỷ khung xương riêng, bộ phát động tác và đạo cụ riêng
  dispose(){
    this.root.removeFromParent();
    if (this.mixer){ this.mixer.stopAllAction(); this.mixer.uncacheRoot(this.scene); }
    this.scene.traverse(o => { const s = o as THREE.SkinnedMesh; if (s.isSkinnedMesh) s.skeleton.dispose(); });
    if (this.avatar){ this.avatar.geometry.dispose(); (this.avatar.material as THREE.Material).dispose(); }
    for (const g of [this.bouquet, this.glass]) g.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ m.geometry.dispose(); (m.material as THREE.Material).dispose(); } });
  }
}
