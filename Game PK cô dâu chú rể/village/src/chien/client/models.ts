import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { UNIT_KINDS } from '../config/UnitConfig.ts';
import type { UnitKind } from '../config/UnitConfig.ts';
import { TEAM_INFO } from '../types.ts';
import type { TeamKey } from '../types.ts';

// Model 3D ngoài (.glb) cho từng loại quân. Đặt file vào village/public/models/ với tên theo loại quân:
//   danbinh.glb  xathu.glb  dausi.glb  xechien.glb  trau.glb  voi.glb
// (tạo từ ảnh mẫu bằng công cụ AI tạo 3D như Meshy, Tripo, hoặc mua model). Có file nào thì game dùng file đó,
// loại nào chưa có thì vẫn vẽ bằng model dựng sẵn trong code. Tùy chỉnh thêm trong models/models.json:
//   { "voi": { "file": "elephant.glb", "height": 4.6, "rotY": 180, "clips": { "walk": "Walking", "attack": "Attack_1" } } }
// height: chiều cao mong muốn (m), rotY: xoay cho mặt nhìn theo chiều +z (độ), clips: tên hoạt ảnh trong file.
// Model có xương và hoạt ảnh: mỗi quân một bản sao chạy hoạt ảnh đi, đứng, đánh, trúng đòn, chết (tối đa 140 bản gần camera).
// Model tĩnh (không xương): vẽ bằng GPU instancing, cử động (nhún, lao tới, ngã) do code tạo.
export interface ModelCfg { file?: string; height?: number; rotY?: number; clips?: Partial<Record<ClipKey, string>>; teamMaterial?: string }
type ClipKey = 'idle' | 'walk' | 'attack' | 'hit' | 'death';
const DEFAULT_HEIGHT: Record<UnitKind, number> = { danbinh: 1.75, xathu: 1.8, dausi: 2.2, xechien: 2.2, trau: 2.9, voi: 4.9 };
const CLIP_GUESS: Record<ClipKey, RegExp> = { idle: /idle|stand|breath/i, walk: /walk|run|move|gallop|trot/i, attack: /attack|hit_?\d|punch|slash|swing|shoot|strike|bite/i, hit: /hurt|damage|impact|react/i, death: /death|die|dead|fall/i };
const SKIN_CAP = 140;

interface StaticPart { geo: THREE.BufferGeometry; mat: THREE.Material; local: THREE.Matrix4; mesh: THREE.InstancedMesh; n: number; team: boolean }
interface Entry {
  kind: UnitKind; skinned: boolean; root: THREE.Object3D; norm: THREE.Matrix4; clips: Partial<Record<ClipKey, THREE.AnimationClip>>;
  parts: StaticPart[]; free: Skin[]; teamMat: string;
}
interface Skin { kind: UnitKind; obj: THREE.Object3D; mixer: THREE.AnimationMixer; actions: Partial<Record<ClipKey, THREE.AnimationAction>>; cur: ClipKey | ''; unit: number; used: boolean; atkAt: number; team: TeamKey | '' }

const _m = new THREE.Matrix4(), _col = new THREE.Color();

export class ModelLibrary {
  readonly group = new THREE.Group();
  readonly entries = new Map<UnitKind, Entry>();
  private skins = new Map<number, Skin>();               // quân id → bản sao đang dùng
  private skinCount = 0;
  loaded: UnitKind[] = [];
  skinCap = SKIN_CAP;                                      // số bản sao có xương tối đa (theo mức đồ họa)

  async load(base = '/models/'){
    let cfg: Partial<Record<UnitKind, ModelCfg>> = {};
    try { const r = await fetch(base + 'models.json', { cache: 'no-cache' }); if (r.ok) cfg = await r.json(); } catch { /* không có cấu hình */ }
    const loader = new GLTFLoader();
    await Promise.all(UNIT_KINDS.map(async kind => {
      const c = cfg[kind] ?? {}, url = base + (c.file ?? kind + '.glb');
      try {
        const head = await fetch(url, { method: 'HEAD' });
        if (!head.ok) return;
        const gltf = await loader.loadAsync(url);
        this.add(kind, gltf.scene, gltf.animations, c);
        this.loaded.push(kind);
      } catch (e) { console.warn(`Không nạp được model ${url}:`, e); }
    }));
    return this.loaded;
  }

  private add(kind: UnitKind, scene: THREE.Object3D, anims: THREE.AnimationClip[], c: ModelCfg){
    scene.updateMatrixWorld(true);
    // chuẩn hóa: đứng trên mặt đất, giữa gốc tọa độ, cao đúng chiều cao mong muốn, mặt nhìn theo +z
    const box = new THREE.Box3().setFromObject(scene), size = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
    const k = (c.height ?? DEFAULT_HEIGHT[kind]) / Math.max(1e-3, size.y);
    const norm = new THREE.Matrix4().makeRotationY(THREE.MathUtils.degToRad(c.rotY ?? 0)).multiply(new THREE.Matrix4().makeScale(k, k, k)).multiply(new THREE.Matrix4().makeTranslation(-ctr.x, -box.min.y, -ctr.z));
    let skinned = false;
    scene.traverse(o => { if ((o as THREE.SkinnedMesh).isSkinnedMesh) skinned = true; });
    const clips: Entry['clips'] = {};
    for (const key of Object.keys(CLIP_GUESS) as ClipKey[]){
      const want = c.clips?.[key];
      clips[key] = (want ? anims.find(a => a.name === want) : undefined) ?? anims.find(a => CLIP_GUESS[key].test(a.name));
    }
    if (!clips.idle && anims.length) clips.idle = anims[0];
    const e: Entry = { kind, skinned: skinned && anims.length > 0, root: scene, norm, clips, parts: [], free: [], teamMat: (c.teamMaterial ?? 'team').toLowerCase() };
    if (!e.skinned){
      // model tĩnh: mỗi mesh con thành một InstancedMesh dùng chung cho mọi quân loại này
      scene.traverse(o => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const local = mesh.matrixWorld.clone();
        // vật liệu màu phe: đổi về trắng, màu phe đi theo từng quân (instance color)
        let mat = mesh.material as THREE.MeshStandardMaterial;
        const team = !!mat.name?.toLowerCase().includes(e.teamMat) && !!mat.color;
        if (team){ mat = mat.clone(); mat.color.setHex(0xffffff); }
        const im = new THREE.InstancedMesh(mesh.geometry, mat, 360);
        im.setColorAt(0, new THREE.Color(1, 1, 1));
        im.frustumCulled = false; im.castShadow = true; im.receiveShadow = true; im.count = 0; im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.group.add(im);
        e.parts.push({ geo: mesh.geometry, mat, local, mesh: im, n: 0, team });
      });
    }
    this.entries.set(kind, e);
  }

  has(kind: UnitKind){ return this.entries.has(kind); }
  beginFrame(){ for (const e of this.entries.values()) for (const p of e.parts) p.n = 0; for (const s of this.skins.values()) s.used = false; }

  // Model tĩnh: thêm một quân, root là ma trận đặt quân (vị trí, hướng, nghiêng, ngã)
  drawStatic(kind: UnitKind, root: THREE.Matrix4, team: TeamKey){
    const e = this.entries.get(kind)!;
    for (const p of e.parts){ if (p.n >= 360) continue; _m.multiplyMatrices(root, e.norm).multiply(p.local); p.mesh.setColorAt(p.n, _col.setHex(p.team ? TEAM_INFO[team].color : 0xffffff)); p.mesh.setMatrixAt(p.n++, _m); }
  }
  // Model có xương: gán một bản sao cho quân (nếu còn chỗ), chạy hoạt ảnh theo trạng thái. Hết chỗ thì trả về false để vẽ kiểu dựng sẵn.
  drawSkinned(kind: UnitKind, id: number, team: TeamKey, root: THREE.Matrix4, clip: ClipKey, atkAt: number, speed: number, dt: number){
    const e = this.entries.get(kind)!;
    let s = this.skins.get(id);
    if (!s){
      s = e.free.pop();
      if (!s){
        if (this.skinCount >= this.skinCap) return false;
        s = this.makeSkin(e); this.skinCount++;
      }
      s.unit = id; s.cur = ''; s.atkAt = 0; this.skins.set(id, s); s.obj.visible = true;
    }
    if (s.team !== team) this.tint(s, team, e);
    s.used = true;
    s.obj.matrix.multiplyMatrices(root, e.norm); s.obj.matrixWorldNeedsUpdate = true;
    // đòn đánh mới thì chạy lại hoạt ảnh đánh từ đầu
    if (clip === 'attack' && atkAt !== s.atkAt && s.actions.attack){ s.atkAt = atkAt; s.actions.attack.reset(); }
    const want = s.actions[clip] ? clip : s.actions.idle ? 'idle' : '';
    if (want && want !== s.cur){
      const next = s.actions[want]!, prev = s.cur ? s.actions[s.cur] : undefined;
      next.reset(); next.setLoop(want === 'death' ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); next.clampWhenFinished = want === 'death';
      next.play(); if (prev) next.crossFadeFrom(prev, 0.18, false);
      s.cur = want;
    }
    if (s.actions.walk) s.actions.walk.timeScale = Math.max(0.6, Math.min(2.2, speed / 2.2));
    s.mixer.update(dt);
    return true;
  }
  private makeSkin(e: Entry): Skin {
    const obj = cloneSkinned(e.root);
    obj.matrixAutoUpdate = false;
    obj.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ m.castShadow = true; m.frustumCulled = false; if (Array.isArray(m.material)) m.material = m.material.map(x => x.clone()); else m.material = m.material.clone(); } });
    this.group.add(obj);
    const mixer = new THREE.AnimationMixer(obj), actions: Skin['actions'] = {};
    for (const [k, c] of Object.entries(e.clips) as [ClipKey, THREE.AnimationClip | undefined][]) if (c) actions[k] = mixer.clipAction(c);
    return { kind: e.kind, obj, mixer, actions, cur: '', unit: 0, used: false, atkAt: 0, team: '' };
  }
  // vật liệu có tên chứa "team" (đổi được trong models.json) nhuộm màu phe
  private tint(s: Skin, team: TeamKey, e: Entry){
    s.team = team;
    s.obj.traverse(o => { const m = o as THREE.Mesh; if (!m.isMesh) return; for (const mat of (Array.isArray(m.material) ? m.material : [m.material]) as THREE.MeshStandardMaterial[]) if (mat.name?.toLowerCase().includes(e.teamMat) && mat.color) mat.color.setHex(TEAM_INFO[team].color); });
  }
  endFrame(){
    for (const e of this.entries.values()) for (const p of e.parts){ p.mesh.count = p.n; p.mesh.instanceMatrix.needsUpdate = true; if (p.mesh.instanceColor) p.mesh.instanceColor.needsUpdate = true; }
    // quân đã biến mất hoặc ra khỏi khung hình: trả bản sao về kho
    for (const [id, s] of this.skins) if (!s.used){ s.obj.visible = false; s.mixer.stopAllAction(); s.cur = ''; this.skins.delete(id); this.entries.get(s.kind)?.free.push(s); }
  }
}
