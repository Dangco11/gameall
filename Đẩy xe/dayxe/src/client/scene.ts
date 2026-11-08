import * as THREE from 'three';
import { TEAMS } from '../shared/game.ts';
import type { Team } from '../shared/game.ts';

// Sân đấu 3D low-poly + PBR: một đường đất nện THẲNG, PHẲNG, RỘNG chạy ngang màn hình từ căn cứ Đỏ (trái) tới căn cứ Xanh (phải).
// Mép đường có gờ đất + hàng rào gỗ hai bên; cỏ, đồi thấp, cây thông chỉ đặt ngoài hàng rào (phía sau là chính,
// phía trước chỉ có bụi cỏ thấp) để không che đường và xe. Hai xe Đỏ / Xanh đấu đầu nhau ở giữa đường.
export const WL = 320;                 // nửa chiều dài đường (đơn vị cảnh) từ giữa tới cổng đích mỗi bên
export const ROAD = 6.2;               // nửa bề rộng mặt đường
export const FENCE = 7.2;              // hàng rào hai bên (z = ±FENCE)
const TAU = Math.PI * 2;
let seed = 7; const sr = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
export const ground = (x: number) => { void x; return 0; };       // đường phẳng tuyệt đối
export const slope = (x: number) => { void x; return 0; };

/* ------------------------------------------------------------ chất liệu vẽ bằng canvas (màu + bản đồ pháp tuyến) */
function tex(c: HTMLCanvasElement, rx: number, ry: number, srgb = true) {
  const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = 8; return t;
}
const canvas = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
// bản đồ pháp tuyến từ ảnh độ cao xám (Sobel), lặp liền mạch
function normalFrom(h: HTMLCanvasElement, strength: number) {
  const W = h.width, H = h.height, src = h.getContext('2d')!.getImageData(0, 0, W, H).data, out = canvas(W, H), og = out.getContext('2d')!, img = og.createImageData(W, H);
  const at = (x: number, y: number) => src[(((y + H) % H) * W + ((x + W) % W)) * 4] / 255;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const dx = (at(x + 1, y) - at(x - 1, y)) * strength, dy = (at(x, y + 1) - at(x, y - 1)) * strength, l = Math.hypot(dx, dy, 1), k = (y * W + x) * 4;
    img.data[k] = (-dx / l * 0.5 + 0.5) * 255; img.data[k + 1] = (dy / l * 0.5 + 0.5) * 255; img.data[k + 2] = (1 / l * 0.5 + 0.5) * 255; img.data[k + 3] = 255;
  }
  og.putImageData(img, 0, 0); return out;
}
// vẽ chấm ngẫu nhiên lặp liền mạch (vẽ thêm bản sao ở mép)
function wrapDots(g: CanvasRenderingContext2D, W: number, H: number, n: number, draw: (x: number, y: number) => void) {
  for (let i = 0; i < n; i++) { const x = sr() * W, y = sr() * H; for (const ox of [-W, 0, W]) for (const oy of [-H, 0, H]) if (x + ox > -60 && x + ox < W + 60 && y + oy > -60 && y + oy < H + 60) draw(x + ox, y + oy); }
}
// đất nện: nền nâu, mảng sẫm / sáng, sỏi nhỏ, vệt nén dọc theo đường
function dirtMaps() {
  const S = 512, col = canvas(S, S), hgt = canvas(S, S), g = col.getContext('2d')!, h = hgt.getContext('2d')!;
  g.fillStyle = '#a2714a'; g.fillRect(0, 0, S, S); h.fillStyle = '#808080'; h.fillRect(0, 0, S, S);
  wrapDots(g, S, S, 260, (x, y) => { const r = 14 + sr() * 46, l = sr(); const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, l < 0.5 ? 'rgba(120,80,48,.35)' : 'rgba(196,150,104,.3)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); });
  for (let i = 0; i < 70; i++) { const y = sr() * S, a = 0.05 + sr() * 0.08; g.fillStyle = `rgba(${sr() < 0.5 ? '90,60,36' : '210,170,120'},${a})`; g.fillRect(0, y, S, 1 + sr() * 2); h.fillStyle = `rgba(${sr() < 0.5 ? 100 : 160},${sr() < 0.5 ? 100 : 160},128,.25)`; h.fillRect(0, y, S, 1 + sr() * 2); }
  wrapDots(g, S, S, 260, (x, y) => { const r = 2.2 + sr() * 3.2, l = 110 + sr() * 90; g.fillStyle = `rgb(${l},${l * 0.9},${l * 0.78})`; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); h.fillStyle = `rgba(255,255,255,${0.5 + sr() * 0.5})`; h.beginPath(); h.arc(x, y, r, 0, TAU); h.fill(); });
  wrapDots(g, S, S, 900, (x, y) => { const l = sr(), r = 3 + sr() * 5; g.fillStyle = l < 0.5 ? 'rgba(90,60,36,.18)' : 'rgba(200,160,115,.16)'; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); });
  return { map: tex(col, 1, 1), normal: tex(normalFrom(hgt, 2.2), 1, 1, false) };
}
function grassMaps() {
  const S = 512, col = canvas(S, S), hgt = canvas(S, S), g = col.getContext('2d')!, h = hgt.getContext('2d')!;
  g.fillStyle = '#5fae3c'; g.fillRect(0, 0, S, S); h.fillStyle = '#707070'; h.fillRect(0, 0, S, S);
  wrapDots(g, S, S, 180, (x, y) => { const r = 20 + sr() * 50; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, sr() < 0.5 ? 'rgba(70,140,40,.4)' : 'rgba(140,200,80,.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); });
  wrapDots(g, S, S, 2200, (x, y) => { const l = 60 + sr() * 110, len = 6 + sr() * 9; g.strokeStyle = `rgba(${l * 0.55},${l + 70},${l * 0.35},.45)`; g.lineWidth = 2.6; g.beginPath(); g.moveTo(x, y); g.lineTo(x + (sr() - 0.5) * 3, y - len); g.stroke(); h.strokeStyle = `rgba(255,255,255,.5)`; h.beginPath(); h.moveTo(x, y); h.lineTo(x, y - len); h.stroke(); });
  return { map: tex(col, 1, 1), normal: tex(normalFrom(hgt, 1.5), 1, 1, false) };
}
function woodMaps() {
  const c = canvas(256, 64), g = c.getContext('2d')!;
  g.fillStyle = '#8a5a32'; g.fillRect(0, 0, 256, 64);
  for (let i = 0; i < 40; i++) { const y = sr() * 64; g.strokeStyle = `rgba(${sr() < 0.5 ? '60,36,18' : '170,120,70'},.45)`; g.lineWidth = 1 + sr() * 2; g.beginPath(); g.moveTo(0, y); for (let x = 0; x <= 256; x += 16) g.lineTo(x, y + Math.sin(x * 0.05 + i) * 2); g.stroke(); }
  for (let i = 0; i < 4; i++) { g.fillStyle = 'rgba(50,30,15,.6)'; g.beginPath(); g.ellipse(sr() * 256, sr() * 64, 5, 3, 0, 0, TAU); g.fill(); }
  return tex(c, 1, 1);
}

export class World {
  scene: THREE.Scene;
  sun: THREE.DirectionalLight;
  private signs = new THREE.Group();
  private env = new THREE.Group();              // cảnh nền lặp (đi theo camera theo chu kỳ)
  gates: Record<Team, THREE.Group> = { do: new THREE.Group(), xanh: new THREE.Group() };
  private flags: THREE.Mesh[] = [];
  private skyMat!: THREE.ShaderMaterial; private hemi!: THREE.HemisphereLight; private fogBase = new THREE.Color(0xbfe0f8);
  private castles: Record<Team, THREE.Group> = { do: new THREE.Group(), xanh: new THREE.Group() };
  // sắc trời: k = 0 trời trong, 1 = phủ màu tint (tối đi), dùng cho quà lớn
  mood(tint: THREE.Color, k: number) {
    this.skyMat.uniforms.tint.value.copy(tint); this.skyMat.uniforms.k.value = k;
    this.hemi.intensity = 1.05 * (1 - k * 0.45); this.sun.intensity = 2.3 * (1 - k * 0.5);
    (this.scene.fog as THREE.Fog).color.copy(this.fogBase).lerp(tint.clone().multiplyScalar(0.5), k * 0.8);
  }
  // thay căn cứ dựng bằng code bằng thành trì GLB (mái đổi màu theo phe), rải đá + bụi cây quét 3D ngoài hàng rào
  useModels(get: (name: string) => THREE.Object3D | null) {
    const castle = get('dx-thanh');
    if (castle) for (const team of ['do', 'xanh'] as const) {
      const s = team === 'do' ? -1 : 1, c = castle.clone(true), col = new THREE.Color(TEAMS[team].color);
      c.traverse(o => { const m = o as THREE.Mesh; if (!m.isMesh) return; m.castShadow = m.receiveShadow = true; const mat = m.material as THREE.MeshStandardMaterial; if (mat.name === 'roof_team') { m.material = mat.clone(); (m.material as THREE.MeshStandardMaterial).color.copy(col); } });
      c.position.set(s * (WL + 16), 0, 0); if (team === 'xanh') c.rotation.y = Math.PI;
      for (const o of this.castles[team].children) o.visible = false;
      this.scene.add(c);
    }
    const props = ['tg-da-1', 'tg-da-2', 'tg-da-3', 'tg-bui-1', 'tg-bui-2', 'tg-bui-3'].map(n => ({ n, o: get(n) })).filter(x => x.o) as { n: string; o: THREE.Object3D }[];
    if (!props.length) return;
    const fit = (o: THREE.Object3D, size: number) => { const b = new THREE.Box3().setFromObject(o), d = b.getSize(new THREE.Vector3()); const k = size / Math.max(0.01, d.x, d.z); o.scale.setScalar(k); o.position.y = -b.min.y * k; return o; };
    for (const block of this.env.children) for (let i = 0; i < 9; i++) {
      const p = props[i % props.length], rock = p.n.startsWith('tg-da'), back = i % 3 !== 0;
      const holder = new THREE.Group(), o = fit(p.o.clone(true), rock ? 1.6 + sr() * 2.2 : 2 + sr() * 1.6);
      o.traverse(m => { if ((m as THREE.Mesh).isMesh) { m.castShadow = true; m.receiveShadow = true; } });
      holder.add(o); holder.rotation.y = sr() * TAU;
      holder.position.set(-60 + sr() * 120, 0, back ? -(FENCE + 1.6 + sr() * 7) : FENCE + 1.6 + sr() * 2.5);
      if (!back) holder.scale.setScalar(0.6);             // phía trước chỉ đặt vật thấp, không che đường
      block.add(holder);
    }
  }
  constructor(scene: THREE.Scene, lite: boolean) {
    this.scene = scene;
    scene.fog = new THREE.Fog(0xbfe0f8, 180, 520);
    const sky = new THREE.Mesh(new THREE.SphereGeometry(600, 32, 16), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: { tint: { value: new THREE.Color(0x000000) }, k: { value: 0 } },
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 tint; uniform float k; varying vec3 vD; void main(){ float y = max(vD.y, 0.0); vec3 c = mix(vec3(0.82,0.93,1.0), vec3(0.22,0.55,0.96), pow(y, 0.5)); vec3 storm = mix(tint * 1.4, tint * 0.25, pow(y, 0.6)); gl_FragColor = vec4(mix(c, storm, k), 1.0); }' }));
    this.skyMat = sky.material as THREE.ShaderMaterial;
    sky.name = 'sky'; scene.add(sky);
    this.hemi = new THREE.HemisphereLight(0xeaf6ff, 0x7a8a4a, 1.05); scene.add(this.hemi);
    const sun = new THREE.DirectionalLight(0xfff0d6, 2.3); sun.position.set(18, 40, 26); this.sun = sun;
    if (!lite) { sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096); const c = sun.shadow.camera; c.left = -60; c.right = 60; c.top = 30; c.bottom = -30; c.near = 5; c.far = 140; sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03; sun.shadow.radius = 4; }
    scene.add(sun); scene.add(sun.target);
    scene.add(this.env);
    const L = 2 * WL + 200;                 // chiều dài đường + hai căn cứ
    // ---- mặt đường đất nện: phẳng, thẳng, rộng; vân đất + pháp tuyến cho cảm giác thật
    const dirt = dirtMaps(); dirt.map.repeat.set(L / 10, 2 * ROAD / 10); dirt.normal.repeat.copy(dirt.map.repeat);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(L, 2 * ROAD + 1.2), new THREE.MeshStandardMaterial({ map: dirt.map, normalMap: dirt.normal, normalScale: new THREE.Vector2(0.45, 0.45), roughness: 0.96, metalness: 0 }));
    road.rotation.x = -Math.PI / 2; road.position.y = 0.01; road.receiveShadow = true; scene.add(road);
    // vệt bánh xe mờ dọc đường (đất nén sẫm hơn)
    for (const z of [-3.2, -1.2, 1.2, 3.2]) { const r = new THREE.Mesh(new THREE.PlaneGeometry(L, 0.7), new THREE.MeshStandardMaterial({ color: 0x6a4428, transparent: true, opacity: 0.22, roughness: 1, depthWrite: false })); r.rotation.x = -Math.PI / 2; r.position.set(0, 0.015, z); r.receiveShadow = true; scene.add(r); }
    // gờ đất mép đường (rõ ranh giới) + viền cỏ
    for (const s of [-1, 1]) {
      const berm = new THREE.Mesh(new THREE.BoxGeometry(L, 0.22, 0.7), new THREE.MeshStandardMaterial({ map: dirt.map, normalMap: dirt.normal, color: 0x8a6040, roughness: 1 }));
      berm.position.set(0, 0.08, s * (ROAD + 0.55)); berm.receiveShadow = true; berm.castShadow = true; scene.add(berm);
      const line = new THREE.Mesh(new THREE.PlaneGeometry(L, 0.16), new THREE.MeshStandardMaterial({ color: 0xf2ead8, roughness: 0.9 })); line.rotation.x = -Math.PI / 2; line.position.set(0, 0.02, s * (ROAD - 0.2)); scene.add(line);
    }
    // ---- cỏ hai bên
    const grass = grassMaps(); grass.map.repeat.set(L / 8, 360 / 8); grass.normal.repeat.copy(grass.map.repeat);
    const lawn = new THREE.Mesh(new THREE.PlaneGeometry(L, 360), new THREE.MeshStandardMaterial({ map: grass.map, normalMap: grass.normal, roughness: 0.95 }));
    lawn.rotation.x = -Math.PI / 2; lawn.position.y = -0.02; lawn.receiveShadow = true; scene.add(lawn);
    // ---- hàng rào gỗ hai bên (cột + 2 thanh ngang), instanced cho nhẹ
    const wood = woodMaps(), woodM = new THREE.MeshStandardMaterial({ map: wood, color: 0xc89060, roughness: 0.85 });
    const postG = new THREE.CylinderGeometry(0.12, 0.14, 1.3, 6), nP = Math.ceil(L / 2.5) * 2;
    const posts = new THREE.InstancedMesh(postG, woodM, nP), m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), one = new THREE.Vector3(1, 1, 1);
    let k = 0; for (const s of [-1, 1]) for (let x = -L / 2; x < L / 2; x += 2.5) { m4.compose(new THREE.Vector3(x, 0.65, s * FENCE), q, one); posts.setMatrixAt(k++, m4); }
    posts.count = k; posts.castShadow = true; posts.receiveShadow = true; scene.add(posts);
    const railTex = wood.clone(); railTex.repeat.set(L / 4, 1); railTex.needsUpdate = true;
    for (const s of [-1, 1]) for (const y of [0.55, 1.05]) { const r = new THREE.Mesh(new THREE.BoxGeometry(L, 0.12, 0.08), new THREE.MeshStandardMaterial({ map: railTex, color: 0xc89060, roughness: 0.85 })); r.position.set(0, y, s * FENCE + s * 0.1); r.castShadow = true; scene.add(r); }

    // ---- cảnh nền một chu kỳ 120 m (nhân 5 bản, đi theo camera): cây thông + cây tán tròn + đồi thấp phía sau, bụi cỏ thấp phía trước
    const PER = 120, block = new THREE.Group();
    const pineG = (() => { const a = new THREE.ConeGeometry(1.6, 2.8, 7); a.translate(0, 2.6, 0); const b = new THREE.ConeGeometry(1.25, 2.4, 7); b.translate(0, 3.9, 0); const c = new THREE.ConeGeometry(0.85, 2, 7); c.translate(0, 5, 0); const geos = [a, b, c].map(x => x.toNonIndexed()); const pos = geos.flatMap(x => Array.from(x.attributes.position.array as Float32Array)); const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); gg.computeVertexNormals(); return gg; })();
    const trunkG = new THREE.CylinderGeometry(0.2, 0.3, 1.6, 6); trunkG.translate(0, 0.8, 0);
    const roundG = new THREE.IcosahedronGeometry(1.8, 0); roundG.translate(0, 3.4, 0);
    const leafM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85, flatShading: true }), barkM = new THREE.MeshStandardMaterial({ color: 0x6e4527, roughness: 0.9, flatShading: true });
    const NT = 70, pines = new THREE.InstancedMesh(pineG, leafM, NT), rounds = new THREE.InstancedMesh(roundG, leafM, NT), trunks = new THREE.InstancedMesh(trunkG, barkM, NT * 2);
    let np = 0, nr = 0, nt = 0;
    const place = (x: number, z: number, s: number, round: boolean) => {
      m4.compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), sr() * TAU), new THREE.Vector3(s, s * (0.85 + sr() * 0.3), s));
      if (round) { rounds.setMatrixAt(nr, m4); rounds.setColorAt(nr++, new THREE.Color().setHSL(0.24 + sr() * 0.07, 0.55, 0.36 + sr() * 0.1)); } else { pines.setMatrixAt(np, m4); pines.setColorAt(np++, new THREE.Color().setHSL(0.33 + sr() * 0.05, 0.5, 0.25 + sr() * 0.08)); }
      trunks.setMatrixAt(nt++, m4);
    };
    for (let i = 0; i < 60; i++) { const x = -PER / 2 + sr() * PER, z = -FENCE - 5 - sr() * 34; place(x, z, 0.9 + sr() * 0.8 + (-z - 12) * 0.015, sr() < 0.3); }
    for (let i = 0; i < 6; i++) { const x = -PER / 2 + sr() * PER, z = FENCE + 26 + sr() * 14; place(x, z, 0.6 + sr() * 0.3, true); }   // vài cây xa phía sau camera, ngoài khung nhìn đường
    pines.count = np; rounds.count = nr; trunks.count = nt;
    for (const im of [pines, rounds, trunks]) { im.castShadow = true; im.receiveShadow = true; block.add(im); }
    // bụi cỏ thấp + hoa phía trước (không che đường)
    const bushG = new THREE.IcosahedronGeometry(0.55, 0); bushG.scale(1, 0.6, 1); bushG.translate(0, 0.25, 0);
    const bushes = new THREE.InstancedMesh(bushG, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true }), 40);
    for (let i = 0; i < 40; i++) { const s = 0.7 + sr() * 0.8; m4.compose(new THREE.Vector3(-PER / 2 + sr() * PER, 0, (sr() < 0.5 ? 1 : -1) * (FENCE + 1.2 + sr() * 5)), q, new THREE.Vector3(s, s, s)); bushes.setMatrixAt(i, m4); bushes.setColorAt(i, new THREE.Color().setHSL(0.27 + sr() * 0.06, 0.55, 0.3 + sr() * 0.1)); }
    bushes.castShadow = true; block.add(bushes);
    const flowerG = new THREE.IcosahedronGeometry(0.12, 0), flowers = new THREE.InstancedMesh(flowerG, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, flatShading: true }), 160);
    const FC = [0xffd23a, 0xffffff, 0xff6aa8, 0xb58aff, 0xff8a3a];
    for (let i = 0; i < 160; i++) { m4.compose(new THREE.Vector3(-PER / 2 + sr() * PER, 0.15, (sr() < 0.5 ? 1 : -1) * (FENCE + 0.8 + sr() * 9)), q, one); flowers.setMatrixAt(i, m4); flowers.setColorAt(i, new THREE.Color(FC[i % FC.length])); }
    block.add(flowers);
    // đồi thấp phía sau
    const hillM = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, flatShading: true });
    for (let i = 0; i < 5; i++) { const h = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 6, 0, TAU, 0, Math.PI / 2), hillM.clone()); (h.material as THREE.MeshStandardMaterial).color.setHSL(0.27 + sr() * 0.06, 0.42, 0.42 + sr() * 0.1); h.scale.set(22 + sr() * 18, 7 + sr() * 7, 14 + sr() * 8); h.position.set(-PER / 2 + i * (PER / 5) + sr() * 10, -0.5, -58 - sr() * 14); h.receiveShadow = true; block.add(h); }
    for (let i = -2; i <= 2; i++) { const c = block.clone(); c.position.x = i * PER; this.env.add(c); }
    // núi xa
    for (let i = 0; i < 24; i++) {
      const h = 38 + sr() * 46, m = new THREE.Mesh(new THREE.ConeGeometry(30 + sr() * 26, h, 6), new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(0.55 + sr() * 0.05, 0.18, 0.62 + sr() * 0.08), roughness: 1, flatShading: true }));
      m.position.set(-330 + i * 28 + (sr() - 0.5) * 10, h / 2 - 4, -170 - sr() * 50); scene.add(m);
      if (h > 66) { const cap = new THREE.Mesh(new THREE.ConeGeometry(9, 13, 6), new THREE.MeshStandardMaterial({ color: 0xf4f8fc, flatShading: true })); cap.position.set(m.position.x, h - 10.5, m.position.z + 1); scene.add(cap); }
    }
    // mây
    const cc = canvas(256, 128), cg = cc.getContext('2d')!; for (let i = 0; i < 18; i++) { const x = 40 + sr() * 176, y = 50 + sr() * 40, r = 20 + sr() * 30; const gr = cg.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,255,255,.95)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); cg.fillStyle = gr; cg.fillRect(0, 0, 256, 128); }
    const cloudTex = tex(cc, 1, 1);
    for (let i = 0; i < 36; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudTex, transparent: true, depthWrite: false, opacity: 0.92, fog: false })); s.position.set(-320 + sr() * 640, 45 + sr() * 40, -140 - sr() * 120); s.scale.set(50 + sr() * 50, 20 + sr() * 16, 1); scene.add(s); }
    // vạch giữa sân (ô cờ ngang đường)
    for (let i = 0; i < 18; i++) { const t = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 2 * ROAD / 18), new THREE.MeshStandardMaterial({ color: i % 2 ? 0x1a1a1a : 0xf4f4f4, roughness: 0.8 })); t.rotation.x = -Math.PI / 2; t.position.set(i % 2 ? 0.35 : -0.35, 0.02, -ROAD + (i + 0.5) * 2 * ROAD / 18); t.receiveShadow = true; scene.add(t); }
    for (const team of ['do', 'xanh'] as const) this.buildBase(team);
    scene.add(this.signs);
  }
  // căn cứ cuối đường: tường thành + tháp ngoài hàng rào phía sau, cổng đích hai cột đặt ở mép đường (không chắn mặt đường)
  private buildBase(team: Team) {
    const T = TEAMS[team], s = team === 'do' ? -1 : 1, col = new THREE.Color(T.color), x0 = s * WL, g = new THREE.Group(), keep = this.castles[team];
    const stone = new THREE.MeshStandardMaterial({ color: 0xa8a39a, roughness: 0.9, flatShading: true }), roof = new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, flatShading: true });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(5, 8, 30), stone); wall.position.set(x0 + s * 16, 4, 0); wall.castShadow = true; keep.add(wall); g.add(keep);
    for (const z of [-15, 15]) {
      const tw = new THREE.Mesh(new THREE.CylinderGeometry(3, 3.4, 14, 10), stone); tw.position.set(x0 + s * 16, 7, z); tw.castShadow = true; keep.add(tw);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(3.8, 6, 10), roof); cone.position.set(x0 + s * 16, 17, z); keep.add(cone);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 5, 6), new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.8, roughness: 0.3 })); pole.position.set(x0 + s * 16, 22, z); g.add(pole);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2, 8, 2), new THREE.MeshStandardMaterial({ color: col, side: THREE.DoubleSide, emissive: col, emissiveIntensity: 0.2 })); flag.position.set(x0 + s * 16 + s * 1.6, 23.4, z); g.add(flag); this.flags.push(flag);
    }
    for (let i = 0; i < 9; i++) { const m = new THREE.Mesh(new THREE.BoxGeometry(5.2, 1.2, 1.6), stone); m.position.set(x0 + s * 16, 8.6, -12.8 + i * 3.2); keep.add(m); }
    const gate = this.gates[team];
    const glow = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.8, roughness: 0.4 });
    for (const z of [-(ROAD + 0.9), ROAD + 0.9]) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.9, 8, 0.9), glow); c.position.set(0, 4, z); c.castShadow = true; gate.add(c); }
    const bt = (() => { const c = canvas(512, 110), b = c.getContext('2d')!; const gr = b.createLinearGradient(0, 0, 0, 110); gr.addColorStop(0, T.color); gr.addColorStop(1, '#111'); b.fillStyle = gr; b.fillRect(0, 0, 512, 110); b.strokeStyle = '#ffd60a'; b.lineWidth = 8; b.strokeRect(4, 4, 504, 102); b.fillStyle = '#fff'; b.font = '900 60px "Arial Black", Arial'; b.textAlign = 'center'; b.textBaseline = 'middle'; b.fillText(`CĂN CỨ ${T.short}`, 256, 58); return tex(c, 1, 1); })();
    const bm = new THREE.MeshStandardMaterial({ map: bt });
    const banner = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.8, 2 * ROAD + 2.6), [glow, glow, glow, glow, bm, bm]); banner.position.set(0, 7.6, 0); banner.rotation.y = Math.PI / 2; gate.add(banner);
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 2 * ROAD), new THREE.MeshBasicMaterial({ color: col })); line.rotation.x = -Math.PI / 2; line.position.y = 0.03; gate.add(line);
    gate.position.set(x0, 0, 0); g.add(gate);
    this.scene.add(g);
  }
  // cột mốc ngoài hàng rào phía sau + vạch phấn ngang đường (cho thấy xe đang trôi đi bao xa)
  setTrack(track: number) {
    for (const c of [...this.signs.children]) { this.signs.remove(c); c.traverse(o => (o as THREE.Mesh).geometry?.dispose()); }
    const step = track / 10;
    for (let m = -track + step; m < track - 1; m += step) {
      if (Math.abs(m) < 1) continue;
      const x = m / track * WL;
      const chalk = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 2 * ROAD - 0.6), new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, roughness: 1, depthWrite: false })); chalk.rotation.x = -Math.PI / 2; chalk.position.set(x, 0.02, 0); this.signs.add(chalk);
      const c = canvas(256, 128), g = c.getContext('2d')!;
      g.fillStyle = '#f4ead0'; g.fillRect(0, 0, 256, 128); g.strokeStyle = '#5a3a1a'; g.lineWidth = 8; g.strokeRect(4, 4, 248, 120);
      g.font = '900 34px "Arial Black", Arial'; g.textAlign = 'center';
      g.fillStyle = TEAMS.do.color; g.fillText(`◀ ${Math.round(track + m)}m`, 128, 52); g.fillStyle = TEAMS.xanh.color; g.fillText(`${Math.round(track - m)}m ▶`, 128, 100);
      const sign = new THREE.Group();
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.6, 0.2), new THREE.MeshStandardMaterial({ color: 0x6a4426 })); post.position.y = 1.3; sign.add(post);
      const wm = new THREE.MeshStandardMaterial({ color: 0x6a4426 });
      const board = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.2, 0.1), [wm, wm, wm, wm, new THREE.MeshStandardMaterial({ map: tex(c, 1, 1) }), wm]); board.position.y = 2.7; sign.add(board);
      sign.position.set(x, 0, -FENCE - 1.2); sign.traverse(o => { o.castShadow = true; }); this.signs.add(sign);
    }
  }
  update(t: number, camX: number) {
    this.scene.getObjectByName('sky')!.position.x = camX;
    this.env.position.x = Math.round(camX / 120) * 120;
    this.sun.position.set(camX + 18, 40, 26); this.sun.target.position.set(camX, 0, 0);
    for (const f of this.flags) { if (Math.abs(f.position.x + (f.parent?.position.x ?? 0) - camX) > 80) continue; const p = f.geometry.attributes.position as THREE.BufferAttribute; if (!f.userData.base) f.userData.base = Float32Array.from(p.array as Float32Array); const b = f.userData.base as Float32Array; for (let i = 0; i < p.count; i++) { const x = b[i * 3]; p.setZ(i, Math.sin(x * 2 + t * 5) * 0.25 * (x + 1.6) / 3.2); } p.needsUpdate = true; }
  }
}

/* ------------------------------------------------------------ xe đấu của một phe: thân vỏ, kính, đèn, cản đẩy, khung gầm, bánh xe */
export const CAR_LEN = 5.0;              // chiều dài xe kể cả cản đẩy
const WHEEL_R = 0.62;
let treadTex: THREE.CanvasTexture | null = null;
function tread() {
  if (treadTex) return treadTex;
  const c = canvas(256, 64), g = c.getContext('2d')!; g.fillStyle = '#17181c'; g.fillRect(0, 0, 256, 64);
  g.fillStyle = '#2e3036'; for (let x = 0; x < 256; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x + 8, 32); g.lineTo(x, 64); g.lineTo(x + 6, 64); g.lineTo(x + 14, 32); g.lineTo(x + 6, 0); g.fill(); }
  return treadTex = tex(c, 3, 1);
}
export class Car {
  root = new THREE.Group(); body = new THREE.Group(); wheels: THREE.Group[] = []; exhaust: THREE.Vector3[] = []; rearWheels: THREE.Vector3[] = [];
  team: Team;
  constructor(team: Team) {
    this.team = team;
    const T = TEAMS[team], tc = new THREE.Color(T.color);
    const paint = new THREE.MeshPhysicalMaterial({ color: tc, metalness: 0.45, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.08 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1b1d23, roughness: 0.55, metalness: 0.5 }), chrome = new THREE.MeshStandardMaterial({ color: 0xe4e8ee, roughness: 0.12, metalness: 1 });
    const white = new THREE.MeshPhysicalMaterial({ color: 0xf6f6f6, roughness: 0.3, metalness: 0.2, clearcoat: 1 });
    const glass = new THREE.MeshPhysicalMaterial({ color: 0x22313f, roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.78, clearcoat: 1 });
    const rubber = new THREE.MeshStandardMaterial({ color: 0x15161a, roughness: 0.95 });
    const b = this.body; this.root.add(b);
    const add = (geo: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], x: number, y: number, z: number, parent: THREE.Object3D = b) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent.add(o); return o; };
    // thân vỏ: đùn từ biên dạng hông xe, có hốc bánh, vát cạnh
    const sh = new THREE.Shape();
    sh.moveTo(-2.25, 0.55); sh.lineTo(-2.3, 1.15); sh.lineTo(-2.05, 1.32); sh.lineTo(0.9, 1.34); sh.lineTo(1.95, 1.18); sh.lineTo(2.25, 0.98); sh.lineTo(2.25, 0.55);
    sh.lineTo(2.0, 0.55); sh.absarc(1.45, 0.55, 0.55, 0, Math.PI, false); sh.lineTo(-0.9, 0.55); sh.absarc(-1.45, 0.55, 0.55, 0, Math.PI, false); sh.lineTo(-2.25, 0.55);
    const bodyG = new THREE.ExtrudeGeometry(sh, { depth: 2.0, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07, bevelSegments: 2, curveSegments: 10 }); bodyG.translate(0, 0, -1.0);
    add(bodyG, paint, 0, 0, 0);
    // cabin kính + mui + cột
    const cab = new THREE.Shape(); cab.moveTo(-1.55, 1.3); cab.lineTo(-1.25, 2.08); cab.lineTo(0.3, 2.08); cab.lineTo(0.95, 1.3); cab.lineTo(-1.55, 1.3);
    const cabG = new THREE.ExtrudeGeometry(cab, { depth: 1.76, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 1 }); cabG.translate(0, 0, -0.88);
    add(cabG, glass, 0, 0, 0);
    add(new THREE.BoxGeometry(1.62, 0.09, 1.86), paint, -0.47, 2.12, 0);
    for (const z of [-0.9, 0.9]) { add(new THREE.BoxGeometry(0.12, 0.8, 0.06), paint, -0.42, 1.7, z); }
    // sọc trắng giữa mui / capô, số xe hai bên
    add(new THREE.BoxGeometry(4.0, 0.02, 0.36), white, 0.0, 1.355, 0).rotation.z = 0;
    add(new THREE.BoxGeometry(1.6, 0.02, 0.36), white, -0.47, 2.17, 0);
    const numC = canvas(128, 128), ng = numC.getContext('2d')!; ng.fillStyle = '#fff'; ng.beginPath(); ng.arc(64, 64, 60, 0, TAU); ng.fill(); ng.lineWidth = 8; ng.strokeStyle = '#111'; ng.stroke(); ng.fillStyle = T.color; ng.font = '900 80px Arial Black, Arial'; ng.textAlign = 'center'; ng.textBaseline = 'middle'; ng.fillText(team === 'do' ? '1' : '2', 64, 70);
    const numM = new THREE.MeshStandardMaterial({ map: tex(numC, 1, 1), transparent: true, roughness: 0.4 });
    for (const z of [-1.09, 1.09]) { const n = add(new THREE.CircleGeometry(0.36, 24), numM, 0.15, 0.95, z); if (z < 0) n.rotation.y = Math.PI; }
    // đèn pha, lưới tản nhiệt, đèn hậu, gương
    for (const z of [-0.72, 0.72]) {
      add(new THREE.BoxGeometry(0.08, 0.2, 0.42), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff4c0, emissiveIntensity: 1.6 }), 2.3, 1.02, z);
      add(new THREE.BoxGeometry(0.08, 0.16, 0.36), new THREE.MeshStandardMaterial({ color: 0xff2020, emissive: 0xff1010, emissiveIntensity: 1.3 }), -2.33, 1.05, z);
      add(new THREE.BoxGeometry(0.22, 0.14, 0.12), paint, 0.75, 1.5, z * 1.45);
    }
    const grille = add(new THREE.BoxGeometry(0.06, 0.26, 1.0), dark, 2.3, 0.78, 0);
    for (let i = 0; i < 4; i++) add(new THREE.BoxGeometry(0.03, 0.03, 0.98), chrome, 0.02, -0.09 + i * 0.06, 0, grille);
    // đèn LED màu phe trên mui
    add(new THREE.BoxGeometry(0.3, 0.12, 1.4), new THREE.MeshStandardMaterial({ color: tc, emissive: tc, emissiveIntensity: 1.5 }), -0.2, 2.23, 0);
    // cản đẩy thép phía trước (chỗ hai xe tì vào nhau) + đệm cao su
    for (const z of [-0.75, 0.75]) { const u = add(new THREE.CylinderGeometry(0.07, 0.07, 0.75, 8), dark, 2.42, 0.95, z); void u; }
    for (const y of [0.72, 1.18]) { const r = add(new THREE.CylinderGeometry(0.07, 0.07, 1.9, 10), dark, 2.42, y, 0); r.rotation.x = Math.PI / 2; }
    add(new THREE.BoxGeometry(0.18, 0.55, 1.95), rubber, 2.52, 0.95, 0);
    // cản sau, ống xả
    add(new THREE.BoxGeometry(0.2, 0.3, 2.1), dark, -2.35, 0.62, 0);
    for (const z of [-0.55, 0.55]) { const e = add(new THREE.CylinderGeometry(0.08, 0.1, 0.4, 10), chrome, -2.45, 0.6, z); e.rotation.z = Math.PI / 2; this.exhaust.push(new THREE.Vector3(-2.7, 0.6, z)); }
    // khung gầm: hai dầm dọc, cầu xe, lò xo giảm xóc
    for (const z of [-0.6, 0.6]) add(new THREE.BoxGeometry(4.2, 0.14, 0.14), dark, 0, 0.42, z, this.root);
    for (const x of [-1.45, 1.45]) { const a = add(new THREE.CylinderGeometry(0.07, 0.07, 2.3, 8), dark, x, WHEEL_R, 0, this.root); a.rotation.x = Math.PI / 2; }
    const coil = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(Array.from({ length: 30 }, (_, i) => new THREE.Vector3(Math.cos(i * 0.9) * 0.1, i * 0.016, Math.sin(i * 0.9) * 0.1))), 60, 0.022, 5);
    const coilM = new THREE.MeshStandardMaterial({ color: tc, metalness: 0.6, roughness: 0.35 });
    for (const x of [-1.45, 1.45]) for (const z of [-0.78, 0.78]) add(coil, coilM, x + 0.15, 0.48, z, this.root);
    // bánh xe: lốp có gai, mâm 5 chấu, đĩa phanh + kẹp phanh màu phe, nắp chụp màu phe
    const tire = new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, 0.5, 22), tireM = [new THREE.MeshStandardMaterial({ map: tread(), roughness: 0.95 }), rubber, rubber];
    const rimM = new THREE.MeshStandardMaterial({ color: 0x2a2c33, metalness: 0.9, roughness: 0.25 }), capM = new THREE.MeshStandardMaterial({ color: tc, metalness: 0.6, roughness: 0.3 });
    for (const [x, z] of [[1.45, -1.05], [1.45, 1.05], [-1.45, -1.05], [-1.45, 1.05]]) {
      const w = new THREE.Group(); w.position.set(x, WHEEL_R, z); this.root.add(w);
      const spin = new THREE.Group(); w.add(spin);
      const t = new THREE.Mesh(tire, tireM); t.rotation.x = Math.PI / 2; t.castShadow = true; spin.add(t);
      const s = z > 0 ? 1 : -1;
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.04, 16), chrome); disc.rotation.x = Math.PI / 2; disc.position.z = s * 0.18; spin.add(disc);
      for (let k = 0; k < 5; k++) { const sp = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.62, 0.05), rimM); sp.rotation.z = k / 5 * TAU; sp.position.z = s * 0.26; spin.add(sp); }
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.04, 6, 20), rimM); ring.position.z = s * 0.26; spin.add(ring);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 10), capM); cap.rotation.x = Math.PI / 2; cap.position.z = s * 0.28; spin.add(cap);
      const cal = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.22, 0.08), capM); cal.position.set(0.22, 0.12, s * 0.16); w.add(cal);
      this.wheels.push(spin);
      if (x < 0) this.rearWheels.push(new THREE.Vector3(x, 0.05, z));
    }
    if (team === 'xanh') this.root.rotation.y = Math.PI;       // xe Xanh quay đầu sang trái
  }
  useModel(model: THREE.Object3D) {
    const o = model.clone(true), body = o.getObjectByName('body'), wheels = [0, 1, 2, 3].map(i => o.getObjectByName('wheel_' + i));
    if (!body || wheels.some(w => !w)) return;
    for (const c of [...this.root.children]) this.root.remove(c);
    this.body = new THREE.Group(); this.root.add(this.body); this.body.add(body);
    this.wheels = [];
    for (const w of wheels as THREE.Object3D[]) { const g = new THREE.Group(); g.position.copy(w.position); w.position.set(0, 0, 0); g.add(w); this.root.add(g); this.wheels.push(g); }
    for (const n of ['calipers']) { const c = o.getObjectByName(n); if (c) this.body.add(c); }
    this.rearWheels = this.wheels.filter(w => w.position.x < 0).map(w => new THREE.Vector3(w.position.x, 0.05, w.position.z));
    this.exhaust = [new THREE.Vector3(-2.6, 0.42, -0.42), new THREE.Vector3(-2.6, 0.42, 0.42)];
    this.root.traverse(m => { if ((m as THREE.Mesh).isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  }
}
