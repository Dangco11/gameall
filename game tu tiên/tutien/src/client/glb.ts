import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js';

// Model GLB chất lượng cao (không bắt buộc), đặt trong tutien/models/:
//   tu sĩ: <lớp>.glb hoặc <lớp>_nu.glb (vd kiemtu.glb, tiennu_nu.glb) · Boss: <khoá boss>.glb (vd haclong.glb, bachho.glb)
// Nạp một lần, cache mẫu, clone bằng SkeletonUtils cho từng nhân vật, AnimationMixer phát động tác theo tên clip
// (idle, run/walk, attack, cast/spell, hit, die/death, meditate/sit, roar, victory). Thiếu file hay file lỗi thì
// màn hình tự dùng nhân vật dựng bằng code, không làm hỏng game. Chỉ dùng model bạn có quyền dùng trên live.
interface Template { scene: THREE.Object3D; clips: THREE.AnimationClip[]; height: number }
const templates = new Map<string, Template>();
let loading: Promise<void> | null = null;

export function loadModels(): Promise<void> {
  return loading ??= (async () => {
    if (new URLSearchParams(location.search).has('nomodel')) return;
    let files: string[] = [];
    try { files = await (await fetch('/models/list.json')).json(); } catch { return; }
    // ?models=tusi-nam-1,tusi-nu-1 : chỉ nạp các file này (thử nhanh)
    const pick = new URLSearchParams(location.search).get('models');
    if (pick) { const want = pick.split(',').map(s => s.trim().toLowerCase()); files = files.filter(f => want.includes(f.replace(/.glb$/i, '').toLowerCase())); }
    const loader = new GLTFLoader();
    // ?debug: ghi tiến độ nạp từng file lên màn hình
    const dbg = new URLSearchParams(location.search).has('debug') ? Object.assign(document.createElement('pre'), { style: 'position:fixed;right:8px;top:60px;z-index:99;color:#0ff;background:#000a;font:12px monospace;padding:4px 8px;margin:0' }) : null;
    if (dbg) { document.body.append(dbg); dbg.textContent = 'đang nạp ' + files.length + ' file\n'; }
    await Promise.all(files.filter(f => /\.glb$/i.test(f)).map(async f => {
      try {
        const g = await loader.loadAsync('/models/' + encodeURIComponent(f));
        if (dbg) dbg.textContent += '✓ ' + f + '\n';
        const box = new THREE.Box3().setFromObject(g.scene), size = box.getSize(new THREE.Vector3());
        g.scene.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) { m.castShadow = true; m.frustumCulled = false; } });
        templates.set(f.replace(/\.glb$/i, '').toLowerCase(), { scene: g.scene, clips: g.animations, height: Math.max(0.01, size.y) });
      } catch (e) { console.warn('Model lỗi, dùng bản dựng bằng code:', f, e); if (dbg) dbg.textContent += '✗ ' + f + ' ' + (e as Error).message + '\n'; }
    }));
  })();
}
export const hasModel = (name: string) => templates.has(name.toLowerCase());
// cảnh gốc của một file (dùng cho kiến trúc: lấy từng khối theo tên rồi clone)
export const templateScene = (name: string) => templates.get(name.toLowerCase())?.scene ?? null;
// các file cùng tiền tố, vd "tusi-nam-" → tusi-nam-1, tusi-nam-2 ...
export const modelsWith = (prefix: string) => [...templates.keys()].filter(k => k.startsWith(prefix)).sort();

// Một bản clone có hoạt ảnh, cao đúng `height` mét, chân chạm đất
export class GlbActor {
  root = new THREE.Group();
  private mixer: THREE.AnimationMixer | null = null;
  private actions = new Map<string, THREE.AnimationAction>();
  private current = '';
  constructor(name: string, height: number) {
    const t = templates.get(name.toLowerCase())!;
    const obj = cloneSkinned(t.scene);
    const s = height > 0 ? height / t.height : 1;          // height = 0: giữ đúng kích thước trong file (mét)
    obj.scale.setScalar(s);
    const box = new THREE.Box3().setFromObject(obj);
    obj.position.y -= box.min.y;
    this.root.add(obj);
    if (t.clips.length) {
      this.mixer = new THREE.AnimationMixer(obj);
      for (const c of t.clips) this.actions.set(c.name.toLowerCase(), this.mixer.clipAction(c));
    }
  }
  private find(words: string[]) {
    for (const w of words) for (const [k, a] of this.actions) if (k.includes(w)) return [k, a] as const;
    return null;
  }
  play(state: string) {
    const map: Record<string, string[]> = {
      idle: ['idle', 'stand'], move: ['run', 'walk', 'fly'], atk: ['attack', 'slash', 'punch', 'bite'], cast: ['cast', 'spell', 'magic', 'attack'],
      hit: ['hit', 'damage', 'hurt'], down: ['die', 'death', 'dead'], med: ['meditat', 'sit', 'idle'], win: ['victory', 'win', 'cheer', 'idle'],
      roar: ['roar', 'scream', 'attack'], rage: ['roar', 'rage', 'attack'], die: ['die', 'death'],
    };
    const hit = this.find(map[state] ?? ['idle']) ?? this.find(['idle']);
    if (!hit || hit[0] === this.current) return;
    const prev = this.actions.get(this.current);
    const a = hit[1];
    a.reset(); a.setLoop(state === 'down' || state === 'die' ? THREE.LoopOnce : THREE.LoopRepeat, Infinity); a.clampWhenFinished = true;
    a.fadeIn(0.2).play(); prev?.fadeOut(0.2);
    this.current = hit[0];
  }
  update(dt: number) { this.mixer?.update(dt); }
  info() { return `clips: ${[...this.actions.keys()].join(",")} · đang phát: ${this.current || "(không)"} · mixer: ${this.mixer ? "có" : "không"}`; }
  dispose() { this.mixer?.stopAllAction(); this.root.removeFromParent(); }
}
