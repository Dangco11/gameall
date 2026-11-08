import * as THREE from 'three';
import { CANVAS, WALL } from '../shared/game.ts';

// Cảnh 3D: bức tường bê tông gồm các MẢNG nối tiếp sang phải (mỗi mảng một lớp sơn riêng), bãi cỏ, đường nhựa, phố xa,
// xô sơn, cọc giao thông, máy bay phun sơn. Cảnh nền lặp lại theo chu kỳ nên đi sang phải bao xa cũng liền mạch.
let seed = 3; const sr = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, rx = 1, ry = 1) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 8; return t;
}
const std = (color: number, rough = 0.8, metal = 0) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
const PERIOD = 120;                 // chu kỳ lặp của cảnh nền (mét): bội số của ô cỏ 15 m, khoảng nhà 12 m
export const segX = (seg: number) => seg * WALL.w;          // tâm mảng tường thứ seg

/* ------------------------------------------------------------ một mảng tường + lớp sơn của nó */
export class Seg {
  group = new THREE.Group();
  canvas: HTMLCanvasElement | null = null; g: CanvasRenderingContext2D | null = null; tex: THREE.CanvasTexture | null = null;
  private full = false; private rect: [number, number, number, number] | null = null;
  idx: number;
  constructor(idx: number, parent: THREE.Scene, mats: { wall: THREE.Material; trim: THREE.Material; dark: THREE.Material }) {
    this.idx = idx;
    const x = segX(idx), g = this.group;
    const wall = new THREE.Mesh(new THREE.BoxGeometry(WALL.w, WALL.h, 1.2), [mats.trim, mats.trim, mats.trim, mats.trim, mats.wall, mats.trim]);
    wall.position.set(0, WALL.h / 2, -0.6); wall.castShadow = wall.receiveShadow = true; g.add(wall);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(WALL.w, 0.6, 1.8), mats.trim); cap.position.set(0, WALL.h + 0.3, -0.6); cap.castShadow = true; g.add(cap);
    // trụ ngăn giữa các mảng
    const pil = new THREE.Mesh(new THREE.BoxGeometry(0.9, WALL.h + 1.2, 1.9), mats.dark); pil.position.set(-WALL.w / 2, (WALL.h + 1.2) / 2, -0.5); pil.castShadow = true; g.add(pil);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(WALL.w, 0.5, 2.6), mats.dark); foot.position.set(0, 0.25, -0.4); g.add(foot);
    g.position.x = x; parent.add(g);
  }
  // lớp sơn chỉ tạo khi mảng được vẽ lên (mảng trống không tốn bộ nhớ)
  paint() {
    if (!this.g) {
      this.canvas = document.createElement('canvas'); this.canvas.width = CANVAS.w; this.canvas.height = CANVAS.h;
      this.g = this.canvas.getContext('2d', { willReadFrequently: true })!;
      this.tex = new THREE.CanvasTexture(this.canvas); this.tex.colorSpace = THREE.SRGBColorSpace; this.tex.anisotropy = 8;
      const m = new THREE.Mesh(new THREE.PlaneGeometry(WALL.w, WALL.h), new THREE.MeshStandardMaterial({ map: this.tex, transparent: true, roughness: 0.55, metalness: 0.05, polygonOffset: true, polygonOffsetFactor: -2 }));
      m.position.set(0, WALL.h / 2, 0.012); m.receiveShadow = true; this.group.add(m);
    }
    return this.g;
  }
  clear() { if (this.g) { this.g.clearRect(0, 0, CANVAS.w, CANVAS.h); this.full = true; } }
  // không truyền vùng = tải lại cả lớp sơn; có vùng = gộp vào vùng cần tải
  mark(x?: number, y?: number, w?: number, h?: number) {
    if (x === undefined || y === undefined || w === undefined || h === undefined) { this.full = true; return; }
    const r = this.rect; this.rect = r ? [Math.min(r[0], x), Math.min(r[1], y), Math.max(r[2], x + w), Math.max(r[3], y + h)] : [x, y, x + w, y + h];
  }
  // chỉ tải phần sơn vừa thay đổi lên GPU
  upload(renderer: THREE.WebGLRenderer) {
    if (!this.tex || !this.g) return;
    if (this.full) { this.tex.needsUpdate = true; this.full = false; this.rect = null; return; }
    if (!this.rect) return;
    const x0 = Math.max(0, Math.floor(this.rect[0])), y0 = Math.max(0, Math.floor(this.rect[1])), x1 = Math.min(CANVAS.w, Math.ceil(this.rect[2])), y1 = Math.min(CANVAS.h, Math.ceil(this.rect[3]));
    this.rect = null;
    const w = x1 - x0, h = y1 - y0; if (w <= 0 || h <= 0) return;
    const props = renderer.properties.get(this.tex) as { __webglTexture?: WebGLTexture };
    if (!props.__webglTexture || this.tex.version === 0 || w * h > CANVAS.w * CANVAS.h * 0.4) { this.tex.needsUpdate = true; return; }
    const gl = renderer.getContext() as WebGL2RenderingContext, img = this.g.getImageData(x0, y0, w, h);
    renderer.state.activeTexture(gl.TEXTURE0); renderer.state.bindTexture(gl.TEXTURE_2D, props.__webglTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false); gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
    gl.texSubImage2D(gl.TEXTURE_2D, 0, x0, CANVAS.h - y0 - h, w, h, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  dispose() {
    this.group.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh) { m.geometry.dispose(); const mt = m.material as THREE.Material; if (mt && (mt as THREE.MeshStandardMaterial).map === this.tex) mt.dispose(); } });
    this.tex?.dispose(); this.group.removeFromParent(); this.canvas = null; this.g = null;
  }
}

export class SceneView {
  scene: THREE.Scene;
  segs = new Map<number, Seg>();
  private env = new THREE.Group();
  private mats: { wall: THREE.Material; trim: THREE.Material; dark: THREE.Material };
  constructor(scene: THREE.Scene, lite: boolean) {
    this.scene = scene;
    scene.background = null;
    scene.fog = new THREE.Fog(0xbfd9f2, 90, 320);
    const sky = new THREE.Mesh(new THREE.SphereGeometry(700, 32, 16), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false,
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 vD; void main(){ float y = max(vD.y, 0.0); vec3 c = mix(vec3(0.72,0.86,0.98), vec3(0.16,0.45,0.92), pow(y, 0.6)); gl_FragColor = vec4(c, 1.0); }' }));
    sky.userData.follow = true; scene.add(sky);
    scene.add(new THREE.HemisphereLight(0xdcefff, 0x6a8a4a, 0.9));
    const sun = new THREE.DirectionalLight(0xfff4e0, 2.0); sun.position.set(30, 60, 50);
    if (!lite) { sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); const c = sun.shadow.camera; c.left = -45; c.right = 45; c.top = 35; c.bottom = -20; c.near = 10; c.far = 200; sun.shadow.bias = -0.0005; }
    scene.add(sun); scene.add(sun.target); this.sun = sun;
    // mây (đi theo camera)
    const cloudTex = canvasTex(256, 128, g => { for (let i = 0; i < 18; i++) { const x = 40 + sr() * 176, y = 50 + sr() * 40, r = 20 + sr() * 30; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 128); } });
    this.clouds = new THREE.Group(); scene.add(this.clouds);
    for (let i = 0; i < 14; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, transparent: true, depthWrite: false, opacity: 0.9, fog: false })); s.position.set((sr() - 0.5) * 520, 70 + sr() * 60, -120 - sr() * 200); s.scale.set(70 + sr() * 60, 30 + sr() * 20, 1); this.clouds.add(s); }
    scene.add(this.env);
    // bãi cỏ, đường nhựa trước tường (vân lặp đúng chu kỳ)
    const grass = canvasTex(512, 512, g => { g.fillStyle = '#5fa83c'; g.fillRect(0, 0, 512, 512); for (let i = 0; i < 9000; i++) { const l = 70 + sr() * 70; g.fillStyle = `rgba(${l * 0.6},${l + 60},${l * 0.4},.5)`; g.fillRect(sr() * 512, sr() * 512, 1.5, 3 + sr() * 4); } }, 48, 40);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(720, 600), new THREE.MeshStandardMaterial({ map: grass, roughness: 0.95 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; this.env.add(ground);
    const asphalt = canvasTex(512, 256, g => { g.fillStyle = '#3a3d42'; g.fillRect(0, 0, 512, 256); for (let i = 0; i < 4000; i++) { const l = 40 + sr() * 40; g.fillStyle = `rgba(${l},${l},${l + 4},.6)`; g.fillRect(sr() * 512, sr() * 256, 2, 2); } g.fillStyle = '#e8e2c8'; for (let x = 0; x < 512; x += 64) g.fillRect(x, 124, 34, 8); }, 48, 1);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(720, 9), new THREE.MeshStandardMaterial({ map: asphalt, roughness: 0.9 })); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 9); road.receiveShadow = true; this.env.add(road);
    const curb = new THREE.Mesh(new THREE.BoxGeometry(720, 0.25, 0.4), std(0xb8b8b0)); curb.position.set(0, 0.12, 4.4); this.env.add(curb);
    // phố xa sau tường: một chu kỳ dựng rồi nhân 5 bản
    const win = canvasTex(64, 128, g => { g.fillStyle = '#7d8a99'; g.fillRect(0, 0, 64, 128); for (let y = 6; y < 128; y += 14) for (let x = 6; x < 64; x += 14) { g.fillStyle = sr() < 0.3 ? '#cfe3f5' : '#4a5664'; g.fillRect(x, y, 8, 9); } });
    const block = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const w = 9 + sr() * 3, h = 30 + sr() * 70, x = -PERIOD / 2 + i * 12 + 6, z = -60 - sr() * 80;
      const t = win.clone(); t.repeat.set(w / 10, h / 20); t.needsUpdate = true;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 12), new THREE.MeshStandardMaterial({ map: t, color: new THREE.Color().setHSL(0.58, 0.08, 0.55 + sr() * 0.25), roughness: 0.8 }));
      b.position.set(x, h / 2, z); block.add(b);
    }
    // cây sau tường (ngọn nhô lên trên mũ tường)
    const trunk = std(0x5a3d26), leaf = std(0x3f8f3a, 0.85);
    for (let i = 0; i < 6; i++) {
      const x = -PERIOD / 2 + (i + 0.5) * (PERIOD / 6) + (sr() - 0.5) * 6, z = -8 - sr() * 10, h = 18 + sr() * 6;
      const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, h, 8), trunk); tr.position.set(x, h / 2, z); block.add(tr);
      for (let k = 0; k < 3; k++) { const l = new THREE.Mesh(new THREE.SphereGeometry(4.2 - k * 0.8, 12, 10), leaf); l.position.set(x + (sr() - 0.5) * 1.5, h + k * 2.2, z + (sr() - 0.5) * 1.5); block.add(l); }
    }
    // xô sơn, bình xịt, cọc giao thông trên bãi cỏ trước tường
    const bucketCols = [0xff2d55, 0x1fa2ff, 0xffd60a, 0x3ddc5a, 0xa35bff, 0xff8a1f];
    for (let i = 0; i < 9; i++) {
      const b = new THREE.Group(), col = bucketCols[i % bucketCols.length];
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.27, 0.55, 14), std(0xd8dde2, 0.5, 0.4)); body.position.y = 0.28; b.add(body);
      const paint = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 14), std(col, 0.3)); paint.position.y = 0.55; b.add(paint);
      const drip = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.02), std(col, 0.3)); drip.position.set(0.2, 0.35, 0.22); b.add(drip);
      b.position.set(-PERIOD / 2 + sr() * PERIOD, 0, 1.4 + sr() * 1.6); block.add(b);
      if (i % 3 === 0) { const can = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.42, 10), std(col, 0.3, 0.5)); can.position.set(b.position.x + 0.7, 0.21, b.position.z); block.add(can); }
    }
    for (let i = 0; i < 8; i++) { const c = new THREE.Group(); const cone = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.8, 14), std(0xff6a1a, 0.6)); cone.position.y = 0.45; c.add(cone); const band = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.12, 14), std(0xffffff)); band.position.y = 0.5; c.add(band); c.position.set(-PERIOD / 2 + i * 15 + 4, 0, 5.2); block.add(c); }
    for (let k = -2; k <= 2; k++) { const c = block.clone(); c.position.x = k * PERIOD; this.env.add(c); }

    // vật liệu tường bê tông (một mảng): tấm ghép, khe nối, vết nước
    const conc = canvasTex(1024, 732, g => {
      g.fillStyle = '#a8aaab'; g.fillRect(0, 0, 1024, 732);
      for (let i = 0; i < 40000; i++) { const l = 140 + sr() * 50; g.fillStyle = `rgba(${l},${l},${l + 3},.35)`; g.fillRect(sr() * 1024, sr() * 732, 2, 2); }
      for (let i = 0; i < 60; i++) { const x = sr() * 1024, y = sr() * 732; const gr = g.createRadialGradient(x, y, 0, x, y, 20 + sr() * 50); gr.addColorStop(0, 'rgba(70,70,70,.16)'); gr.addColorStop(1, 'rgba(70,70,70,0)'); g.fillStyle = gr; g.fillRect(0, 0, 1024, 732); }
      for (let x = 0; x <= 1024; x += 256) { g.fillStyle = 'rgba(40,40,40,.5)'; g.fillRect(x - 2, 0, 4, 732); }
      for (const y of [244, 488]) { g.fillStyle = 'rgba(40,40,40,.35)'; g.fillRect(0, y, 1024, 3); }
      for (let i = 0; i < 40; i++) { const x = sr() * 1024, len = 40 + sr() * 160; const gr = g.createLinearGradient(0, 0, 0, len); gr.addColorStop(0, 'rgba(60,60,55,.25)'); gr.addColorStop(1, 'rgba(60,60,55,0)'); g.fillStyle = gr; g.fillRect(x, 0, 6 + sr() * 10, len); }
    });
    this.mats = { wall: new THREE.MeshStandardMaterial({ map: conc, roughness: 0.92 }), trim: std(0x8e9091), dark: std(0x7d7f80) };
  }
  private sun: THREE.DirectionalLight; private clouds: THREE.Group;
  // mảng tường thứ i (tạo nếu chưa có)
  seg(i: number) { let s = this.segs.get(i); if (!s) { s = new Seg(i, this.scene, this.mats); this.segs.set(i, s); } return s; }
  // giữ mảng đang vẽ, KEEP-1 mảng trước nó và mảng kế tiếp (trống, để vẽ tiếp); bỏ các mảng khác
  keepAround(cur: number, back: number) {
    for (let i = cur - back; i <= cur + 1; i++) this.seg(i);
    for (const [i, s] of this.segs) if (i < cur - back || i > cur + 1) { s.dispose(); this.segs.delete(i); }
  }
  // cảnh nền, mặt trời, mây đi theo camera (cảnh nền nhảy đúng một chu kỳ nên không thấy giật)
  follow(camX: number) {
    this.env.position.x = Math.round(camX / PERIOD) * PERIOD;
    this.clouds.position.x = camX * 0.85;
    this.sun.position.set(camX + 30, 60, 50); this.sun.target.position.set(camX, 0, 0);
    for (const o of this.scene.children) if (o.userData.follow) o.position.x = camX;
  }
  update(renderer: THREE.WebGLRenderer) { for (const s of this.segs.values()) s.upload(renderer); }
  clearPaint() { for (const s of this.segs.values()) s.clear(); }
}

// toạ độ lớp sơn của mảng seg ↔ thế giới (mét)
export const toWorld = (px: number, py: number, z = 0, seg = 0) => new THREE.Vector3(segX(seg) + (px / CANVAS.w - 0.5) * WALL.w, (1 - py / CANVAS.h) * WALL.h, z);

/* ------------------------------------------------------------ máy bay phun sơn */
export function buildJet(color: string): THREE.Group {
  const g = new THREE.Group(), col = new THREE.Color(color);
  const body = new THREE.MeshStandardMaterial({ color: 0x1c2230, roughness: 0.35, metalness: 0.6 }), neon = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 1.2, roughness: 0.3 });
  const fus = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 3.6, 6, 14), body); fus.rotation.x = Math.PI / 2; g.add(fus);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1.4, 14), body); nose.rotation.x = Math.PI / 2; nose.position.z = 2.6; g.add(nose);
  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 10), new THREE.MeshStandardMaterial({ color: 0x9fe8ff, roughness: 0.1, metalness: 0.2, emissive: 0x1a4a6a, emissiveIntensity: 0.4 })); cockpit.scale.set(1, 0.8, 1.8); cockpit.position.set(0, 0.35, 1.2); g.add(cockpit);
  const wingShape = new THREE.Shape(); wingShape.moveTo(0, 1.2); wingShape.lineTo(3.2, -0.8); wingShape.lineTo(3.0, -1.3); wingShape.lineTo(0, -1.0); wingShape.closePath();
  for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape, { depth: 0.08, bevelEnabled: false }), body); w.rotation.x = -Math.PI / 2; w.scale.x = s; w.position.y = -0.05; g.add(w); const st = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.14), neon); st.position.set(s * 1.6, 0.0, -0.3); st.rotation.y = s * 0.55; g.add(st); }
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.2, 1.0), body); tail.position.set(0, 0.7, -1.8); g.add(tail);
  for (const s of [-1, 1]) { const tw = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.7), body); tw.position.set(s * 0.8, 0.1, -1.9); g.add(tw); }
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.12, 3.2), neon); stripe.position.y = 0.42; g.add(stripe);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.4, 12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })); flame.rotation.x = -Math.PI / 2; flame.position.z = -2.9; g.add(flame);
  g.userData.flame = flame; g.userData.col = color;
  g.traverse(o => { if ((o as THREE.Mesh).isMesh) o.castShadow = true; });
  return g;
}
