import * as THREE from 'three';
import { ELEMENT_COLORS } from '../shared/game.ts';
import type { Element } from '../shared/game.ts';
import { glow, runeTex, smokeTex, softTex, std, uTime } from './mats.ts';
import { hasModel, templateScene } from './glb.ts';

// Thế giới tu tiên: đảo bay chính có Võ Đài / Boss Arena ở giữa, Thiên Cung phía bắc (mái cong nhiều tầng, cột đỏ, đèn lồng),
// cổng Thiên Môn phía nam, Tiên Sơn (núi xa, thác nước, rừng trúc, tùng), Ma Giới (đảo dung nham), Long Cung (hồ linh thủy),
// biển mây phía dưới, đảo nhỏ lơ lửng, linh khí trôi. Ánh sáng và sương đổi theo Boss.
const rnd = (a = 1) => (Math.random() - 0.5) * 2 * a;
let seed = 7;
const srand = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, repeat = 1) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); t.anisotropy = 8;
  return t;
}
// đá lát sân: viên đá xám xanh, mạch vữa
const tileTex = () => canvasTex(512, 512, g => {
  g.fillStyle = '#3e434d'; g.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const l = 70 + srand() * 34; g.fillStyle = `rgb(${l - 4},${l},${l + 12})`; g.fillRect(x * 64 + 2, y * 64 + 2, 60, 60);
    for (let k = 0; k < 6; k++) { g.fillStyle = `rgba(0,0,0,${srand() * 0.08})`; g.beginPath(); g.arc(x * 64 + srand() * 64, y * 64 + srand() * 64, srand() * 10, 0, 7); g.fill(); }
  }
}, 6);
const rockTex = () => canvasTex(256, 256, g => {
  g.fillStyle = '#4a4440'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 400; i++) { const l = 40 + srand() * 60; g.fillStyle = `rgba(${l},${l - 4},${l - 8},.5)`; g.fillRect(srand() * 256, srand() * 256, 2 + srand() * 14, 2 + srand() * 6); }
}, 3);

// mái cong cổ phong: 4 mái dốc lõm, góc vểnh lên
function roofGeo(w: number, d: number, h: number, lift = 0.35) {
  const geo = new THREE.BufferGeometry(), pos: number[] = [], idx: number[] = [];
  const N = 10;
  const ridgeHalf = Math.max(0, (w - d) / 2);
  const ring = (u: number) => {
    // u = 0 viền mái, 1 đỉnh nóc
    const pts: THREE.Vector3[] = [];
    const sx = w / 2 * (1 - u) + ridgeHalf * u, sz = d / 2 * (1 - u);
    const y = h * Math.pow(u, 0.6);
    const corners = [[sx, sz], [-sx, sz], [-sx, -sz], [sx, -sz]];
    for (let c = 0; c < 4; c++) {
      const [x0, z0] = corners[c], [x1, z1] = corners[(c + 1) % 4];
      for (let i = 0; i < N; i++) {
        const t = i / N, x = x0 + (x1 - x0) * t, z = z0 + (z1 - z0) * t;
        const edge = Math.pow(Math.abs(t - 0.5) * 2, 4);    // gần góc thì vểnh
        pts.push(new THREE.Vector3(x, y + lift * edge * (1 - u) * h, z));
      }
    }
    return pts;
  };
  const R = 6, rings = Array.from({ length: R + 1 }, (_, i) => ring(i / R));
  for (const r of rings) for (const p of r) pos.push(p.x, p.y, p.z);
  const per = 4 * N;
  for (let i = 0; i < R; i++) for (let j = 0; j < per; j++) {
    const a = i * per + j, b = i * per + (j + 1) % per, c = (i + 1) * per + j, e = (i + 1) * per + (j + 1) % per;
    idx.push(a, c, b, b, c, e);
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals();
  return geo;
}

export class WorldView {
  scene: THREE.Scene;
  sun: THREE.DirectionalLight; hemi: THREE.HemisphereLight;
  arenaGlow: THREE.Mesh; arenaRune: THREE.Mesh;
  private skyMat: THREE.ShaderMaterial; private cloudSea: THREE.ShaderMaterial; private water: THREE.ShaderMaterial; private fall: THREE.ShaderMaterial;
  private floaters: THREE.Object3D[] = [];
  private qi: THREE.Points;
  private lanterns: THREE.Mesh[] = [];
  private theme = new THREE.Color(0x9fe8ff); private themeT = new THREE.Color(0x9fe8ff);
  private fogBase = new THREE.Color(0xc9b69a);
  treasure: THREE.Group;
  private proc: Record<'arena' | 'palace' | 'gate', THREE.Object3D[]> = { arena: [], palace: [], gate: [] };
  private lite = false;

  constructor(scene: THREE.Scene, lite: boolean) {
    this.scene = scene; this.lite = lite;
    scene.fog = new THREE.FogExp2(0xc9b69a, 0.0022);
    // trời
    this.skyMat = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, uniforms: { top: { value: new THREE.Color(0x3d6aa8) }, mid: { value: new THREE.Color(0x9db8d8) }, bot: { value: new THREE.Color(0xffc98a) }, sun: { value: new THREE.Vector3(-0.8, 0.32, 0.45).normalize() }, uTime },
      vertexShader: 'varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform vec3 top, mid, bot, sun; uniform float uTime; varying vec3 vD;
        float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898,78.233,45.164))) * 43758.5453); }
        void main(){ float y = vD.y; vec3 c = y > 0.12 ? mix(mid, top, smoothstep(0.12, 0.8, y)) : mix(bot, mid, smoothstep(-0.15, 0.12, y));
          float s = max(dot(vD, sun), 0.0); c += vec3(1.0,0.85,0.55) * (pow(s, 64.0) * 1.6 + pow(s, 6.0) * 0.35);
          float st = step(0.9975, h(floor(vD * 420.0))) * smoothstep(0.3, 0.8, y); c += st * (0.6 + 0.4 * sin(uTime * 3.0 + h(vD) * 20.0));
          gl_FragColor = vec4(c, 1.0); }` });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(600, 32, 16), this.skyMat));
    // ánh sáng
    this.hemi = new THREE.HemisphereLight(0xdce6f2, 0x5a4636, 0.55); scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffcf9a, 1.7); this.sun.position.set(-55, 32, 30);
    if (!lite) { this.sun.castShadow = true; this.sun.shadow.mapSize.set(2048, 2048); const c = this.sun.shadow.camera; c.left = c.bottom = -40; c.right = c.top = 40; c.near = 10; c.far = 160; this.sun.shadow.bias = -0.0005; this.sun.shadow.normalBias = 0.03; }
    scene.add(this.sun);

    // biển mây
    this.cloudSea = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uTime, tint: { value: new THREE.Color(0xffffff) } },
      vertexShader: 'varying vec2 vU; varying vec3 vW; void main(){ vU = uv; vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }',
      fragmentShader: `uniform float uTime; uniform vec3 tint; varying vec2 vU; varying vec3 vW;
        float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); float a = fract(sin(dot(i, vec2(127.1,311.7)))*43758.5), b = fract(sin(dot(i+vec2(1,0), vec2(127.1,311.7)))*43758.5), c = fract(sin(dot(i+vec2(0,1), vec2(127.1,311.7)))*43758.5), d = fract(sin(dot(i+vec2(1,1), vec2(127.1,311.7)))*43758.5); return mix(mix(a,b,f.x), mix(c,d,f.x), f.y); }
        float fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ s += a * n(p); p *= 2.03; a *= 0.5; } return s; }
        void main(){ vec2 p = vW.xz * 0.012 + vec2(uTime * 0.01, uTime * 0.006); float c = fbm(p) * 0.7 + fbm(p * 2.7 - uTime * 0.02) * 0.4;
          float d = length(vW.xz) / 420.0; vec3 col = mix(vec3(0.62,0.66,0.85), vec3(1.0,0.96,0.92), smoothstep(0.35, 0.9, c)) * tint;
          gl_FragColor = vec4(col, smoothstep(0.25, 0.6, c) * (1.0 - smoothstep(0.7, 1.0, d))); }` });
    for (const [y, s] of [[-26, 1], [-34, 1.3]] as const) { const sea = new THREE.Mesh(new THREE.PlaneGeometry(900 * s, 900 * s), this.cloudSea); sea.rotation.x = -Math.PI / 2; sea.position.y = y; scene.add(sea); }

    this.buildIsland(lite);
    // ghi lại các khối dựng bằng code để thay bằng file GLB khi có (useModels)
    let n0 = scene.children.length;
    this.buildArena(); this.proc.arena = scene.children.slice(n0); n0 = scene.children.length;
    this.buildPalace(); this.proc.palace = scene.children.slice(n0); n0 = scene.children.length;
    this.buildGate(); this.proc.gate = scene.children.slice(n0);
    this.buildMountains(lite);
    this.buildDemonIsle();
    this.water = this.buildDragonPool();
    this.fall = this.buildWaterfall();
    this.buildFloaters();
    this.qi = this.buildQi(lite ? 200 : 450);
    this.arenaGlow = new THREE.Mesh(new THREE.RingGeometry(13.6, 14.4, 96), glow(0x9fe8ff, 0.22)); this.arenaGlow.rotation.x = -Math.PI / 2; this.arenaGlow.position.y = 0.06; scene.add(this.arenaGlow);
    this.arenaRune = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshBasicMaterial({ map: runeTex(), color: 0x9fe8ff, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.arenaRune.rotation.x = -Math.PI / 2; this.arenaRune.position.y = 0.05; scene.add(this.arenaRune);
    this.treasure = this.buildTreasure(); this.treasure.visible = false; scene.add(this.treasure);
  }

  private buildIsland(lite: boolean) {
    const top = std(0xffffff, { rough: 0.85 }) as THREE.MeshStandardMaterial;
    const tiles = tileTex(); const tm = new THREE.MeshStandardMaterial({ map: tiles, roughness: 0.85, metalness: 0.05 });
    const plaza = new THREE.Mesh(new THREE.CircleGeometry(48, 96), tm); plaza.rotation.x = -Math.PI / 2; plaza.receiveShadow = true; this.scene.add(plaza);
    void top;
    // mặt dưới đảo: đá lởm chởm thuôn nhọn
    const under = new THREE.ConeGeometry(50, 46, 48, 10, true);
    const p = under.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { const y = p.getY(i); if (y > 22.9) continue; const k = 1 + rnd(0.18) + Math.sin(p.getX(i) * 0.3) * 0.05; p.setX(i, p.getX(i) * k); p.setZ(i, p.getZ(i) * k); p.setY(i, y + rnd(2)); }
    under.computeVertexNormals();
    const rock = new THREE.MeshStandardMaterial({ map: rockTex(), color: 0x8a7f78, roughness: 0.95 });
    const um = new THREE.Mesh(under, rock); um.rotation.x = Math.PI; um.position.y = -23.2; this.scene.add(um);
    // viền đá chạm và lan can ngọc
    const rim = new THREE.Mesh(new THREE.TorusGeometry(48, 0.6, 8, 96), std(0xd9dce4, { rough: 0.5 })); rim.rotation.x = Math.PI / 2; rim.position.y = 0.3; this.scene.add(rim);
    const post = new THREE.CylinderGeometry(0.25, 0.3, 1.6, 8), pm = std(0xe8eaf0, { rough: 0.45 });
    const posts = new THREE.InstancedMesh(post, pm, 72); const d = new THREE.Object3D();
    for (let i = 0; i < 72; i++) { const a = i / 72 * Math.PI * 2; if (Math.abs(Math.sin(a)) < 0.12 && Math.cos(a) > 0) { d.scale.setScalar(0.001); } else d.scale.setScalar(1); d.position.set(Math.sin(a) * 47.3, 0.8, Math.cos(a) * 47.3); d.updateMatrix(); posts.setMatrixAt(i, d.matrix); }
    posts.castShadow = !lite; this.scene.add(posts);
    // cây tùng, cây cổ thụ hoa quanh sân
    this.trees(36, 30, 45, lite);
  }
  private trees(n: number, r0: number, r1: number, lite: boolean, center = new THREE.Vector3(), y = 0) {
    const trunk = new THREE.CylinderGeometry(0.25, 0.45, 1, 7), crown = new THREE.ConeGeometry(1, 1, 8), blossom = new THREE.SphereGeometry(1, 10, 8);
    const tm = std(0x4a3426, { rough: 0.9 }), cm = std(0x1f5a3a, { rough: 0.8 }), bm = std(0xffb7d5, { rough: 0.7, emissive: 0xff6fa8, ei: 0.08 });
    const T = new THREE.InstancedMesh(trunk, tm, n), C = new THREE.InstancedMesh(crown, cm, n * 3), B = new THREE.InstancedMesh(blossom, bm, n * 2);
    const d = new THREE.Object3D(); let ci = 0, bi = 0;
    for (let i = 0; i < n; i++) {
      const a = srand() * Math.PI * 2, r = r0 + srand() * (r1 - r0);
      // chừa lối vào phía nam và phía bắc
      const x = center.x + Math.sin(a) * r, z = center.z + Math.cos(a) * r, h = 4 + srand() * 4;
      // chừa lối vào phía nam, Thiên Cung phía bắc, tháp hai bên và hồ Long Cung
      if (Math.abs(Math.sin(a)) < 0.25 || z < -18 || (Math.abs(Math.abs(x) - 38) < 6 && Math.abs(z + 14) < 6) || Math.hypot(x + 30, z + 8) < 9) { d.scale.setScalar(0.001); d.updateMatrix(); T.setMatrixAt(i, d.matrix); continue; }
      d.position.set(x, y + h / 2, z); d.scale.set(1, h, 1); d.rotation.set(0, 0, 0); d.updateMatrix(); T.setMatrixAt(i, d.matrix);
      const pink = srand() < 0.35;
      for (let k = 0; k < (pink ? 2 : 3); k++) {
        if (pink) { d.position.set(x + rnd(1), y + h + k * 0.8, z + rnd(1)); d.scale.setScalar(1.8 - k * 0.4); d.updateMatrix(); B.setMatrixAt(bi++, d.matrix); }
        else { d.position.set(x, y + h * 0.6 + k * 1.3, z); d.scale.set(2.4 - k * 0.6, 2.2, 2.4 - k * 0.6); d.updateMatrix(); C.setMatrixAt(ci++, d.matrix); }
      }
    }
    C.count = ci; B.count = bi;
    for (const m of [T, C, B]) { m.castShadow = !lite; this.scene.add(m); }
  }
  private buildArena() {
    // võ đài bát giác nâng cao, bậc đá, cột rồng
    const base = new THREE.Mesh(new THREE.CylinderGeometry(15, 16, 0.6, 8), std(0xbfc4cf, { rough: 0.55 })); base.position.y = -0.28; base.receiveShadow = true; this.scene.add(base);
    const inner = new THREE.Mesh(new THREE.CylinderGeometry(14.2, 14.2, 0.05, 64), new THREE.MeshStandardMaterial({ color: 0x2a3146, roughness: 0.35, metalness: 0.4 })); inner.position.y = 0.02; inner.receiveShadow = true; this.scene.add(inner);
    const red = std(0x9b1b22, { rough: 0.45 }), gold = std(0xd4af37, { metal: 1, rough: 0.3 }), jade = std(0x2fae8a, { rough: 0.3, metal: 0.2, emissive: 0x0f5a44, ei: 0.4 });
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + Math.PI / 8, x = Math.sin(a) * 15.4, z = Math.cos(a) * 15.4;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 9, 16), red); col.position.set(x, 4.5, z); col.castShadow = true; this.scene.add(col);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.7, 0.6, 16), gold); cap.position.set(x, 9.2, z); this.scene.add(cap);
      // rồng ngọc quấn cột
      const pts = Array.from({ length: 40 }, (_, k) => new THREE.Vector3(x + Math.sin(k * 0.55 + i) * 0.85, 0.6 + k * 0.2, z + Math.cos(k * 0.55 + i) * 0.85));
      const coil = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 120, 0.22, 8), jade); coil.castShadow = true; this.scene.add(coil);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 10), jade); head.position.copy(pts[pts.length - 1]).add(new THREE.Vector3(0, 0.3, 0)); head.scale.set(1, 0.8, 1.6); this.scene.add(head);
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 12), glow(0xffd9a0, 0.35)); orb.scale.setScalar(0.6); orb.position.set(x, 9.8, z); this.scene.add(orb); this.lanterns.push(orb);
    }
    // bậc thang 4 phía
    for (let s = 0; s < 4; s++) for (let k = 0; k < 3; k++) {
      const st = new THREE.Mesh(new THREE.BoxGeometry(6, 0.2, 1), std(0xb6bbc6, { rough: 0.6 }));
      const a = s * Math.PI / 2; st.position.set(Math.sin(a) * (16.1 + k * 0.9), -0.1 - k * 0.18, Math.cos(a) * (16.1 + k * 0.9)); st.rotation.y = a; st.receiveShadow = true; this.scene.add(st);
    }
  }
  private hall(x: number, z: number, w: number, d: number, h: number, tiers: number, scale = 1) {
    const g = new THREE.Group(); g.position.set(x, 0, z); g.scale.setScalar(scale);
    const red = std(0xa41d24, { rough: 0.5 }), roofM = std(0x203a5c, { rough: 0.35, metal: 0.5 }), gold = std(0xd4af37, { metal: 1, rough: 0.3 }), wall = std(0xf1e6d2, { rough: 0.7 }), stone = std(0xd8dbe2, { rough: 0.6 });
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(w + 3, 1.4, d + 3), stone); plinth.position.y = 0.7; plinth.castShadow = plinth.receiveShadow = true; g.add(plinth);
    let y = 1.4;
    for (let t = 0; t < tiers; t++) {
      const k = 1 - t * 0.22, ww = w * k, dd = d * k, hh = h * (t ? 0.6 : 1);
      const body = new THREE.Mesh(new THREE.BoxGeometry(ww * 0.86, hh, dd * 0.8), wall); body.position.y = y + hh / 2; body.castShadow = true; g.add(body);
      const cols = Math.max(4, Math.round(ww / 2.2));
      for (let c = 0; c <= cols; c++) for (const s of [-1, 1]) {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, hh, 10), red); col.position.set(-ww * 0.45 + c / cols * ww * 0.9, y + hh / 2, s * dd * 0.43); col.castShadow = true; g.add(col);
      }
      const beam = new THREE.Mesh(new THREE.BoxGeometry(ww * 0.95, 0.5, dd * 0.92), red); beam.position.y = y + hh; g.add(beam);
      const roof = new THREE.Mesh(roofGeo(ww * 1.35, dd * 1.45, hh * 0.75, 0.5), roofM); roof.position.y = y + hh + 0.2; roof.castShadow = true; g.add(roof);
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.5, (ww - dd) * 0.7), 0.35, 0.35), gold); ridge.position.y = y + hh + hh * 0.75 + 0.3; g.add(ridge);
      for (const s of [-1, 1]) { const orn = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 8), gold); orn.position.set(s * Math.max(0.5, (ww - dd) * 0.35), y + hh + hh * 0.75 + 0.7, 0); g.add(orn); }
      // đèn lồng đỏ ở mái
      for (const s of [-1, 1]) for (const s2 of [-1, 1]) {
        const lan = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), new THREE.MeshStandardMaterial({ color: 0xff3a2a, emissive: 0xff4a20, emissiveIntensity: 0.45 }));
        lan.scale.y = 1.3; lan.position.set(s * ww * 0.62, y + hh - 0.4, s2 * dd * 0.65); g.add(lan); this.lanterns.push(lan);
      }
      y += hh + hh * 0.55;
    }
    const plaque = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 0.15), gold); plaque.position.set(0, h * 0.8 + 1.4, d * 0.42); g.add(plaque);
    this.scene.add(g);
    return g;
  }
  private buildPalace() {
    // Thiên Cung phía bắc: điện chính 3 tầng, hai lầu bên, tháp chùa
    this.hall(0, -38, 22, 12, 7, 3);
    this.hall(-24, -30, 10, 8, 5, 2);
    this.hall(24, -30, 10, 8, 5, 2);
    for (const s of [-1, 1]) {
      const g = new THREE.Group(); g.position.set(s * 38, 0, -14);
      const red = std(0xa41d24), roofM = std(0x203a5c, { rough: 0.35, metal: 0.5 });
      for (let t = 0; t < 7; t++) {
        const w = 5.5 - t * 0.55, b = new THREE.Mesh(new THREE.BoxGeometry(w * 0.7, 2.2, w * 0.7), std(0xf1e6d2)); b.position.y = 1.2 + t * 3; b.castShadow = true; g.add(b);
        const r = new THREE.Mesh(roofGeo(w * 1.2, w * 1.2, 1.2, 0.6), roofM); r.position.y = 2.3 + t * 3; g.add(r);
        const c = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 2.2, 6), red); c.position.set(w * 0.36, 1.2 + t * 3, w * 0.36); g.add(c);
      }
      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.4, 3.5, 8), std(0xd4af37, { metal: 1, rough: 0.3 })); spire.position.y = 23.5; g.add(spire);
      this.scene.add(g);
    }
  }
  private buildGate() {
    // cổng Thiên Môn (bài phường) phía nam, mở ra biển mây
    const g = new THREE.Group(); g.position.set(0, 0, 44);
    const red = std(0xa41d24), gold = std(0xd4af37, { metal: 1, rough: 0.3 }), roofM = std(0x203a5c, { rough: 0.35, metal: 0.5 });
    for (const x of [-7, -2.6, 2.6, 7]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, x * x > 20 ? 7 : 9, 12), red); c.position.set(x, x * x > 20 ? 3.5 : 4.5, 0); c.castShadow = true; g.add(c); }
    const beam = new THREE.Mesh(new THREE.BoxGeometry(17, 0.9, 1), red); beam.position.y = 8.2; g.add(beam);
    const plate = new THREE.Mesh(new THREE.BoxGeometry(4, 1.6, 0.3), gold); plate.position.set(0, 9.3, 0.4); g.add(plate);
    const r1 = new THREE.Mesh(roofGeo(8, 2.2, 1.6, 0.6), roofM); r1.position.y = 10.1; g.add(r1);
    for (const s of [-1, 1]) { const r = new THREE.Mesh(roofGeo(5.5, 2, 1.2, 0.6), roofM); r.position.set(s * 5.5, 8.7, 0); g.add(r); }
    this.scene.add(g);
  }
  private buildMountains(lite: boolean) {
    // Tiên Sơn: núi đá dựng đứng xa xa, sương xanh
    const geo = new THREE.ConeGeometry(1, 1, 9, 6);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { const y = p.getY(i); if (y > 0.49) continue; const k = 1 + rnd(0.22); p.setX(i, p.getX(i) * k); p.setZ(i, p.getZ(i) * k); }
    geo.computeVertexNormals();
    const near = std(0x5d6a78, { rough: 0.95 }), far = std(0x8597b4, { rough: 1 });
    for (let i = 0; i < 26; i++) {
      const a = srand() * Math.PI * 2, r = 120 + srand() * 140, h = 40 + srand() * 90, w = 10 + srand() * 18;
      if (a > 2.6 && a < 3.7 && r < 160) continue;
      const m = new THREE.Mesh(geo, r < 170 ? near : far); m.position.set(Math.sin(a) * r, -30 + h / 2, Math.cos(a) * r); m.scale.set(w, h, w); this.scene.add(m);
      if (srand() < 0.5) { const top = new THREE.Mesh(roofGeo(6, 6, 2.4, 0.6), std(0x203a5c, { metal: 0.5, rough: 0.35 })); top.position.set(m.position.x, -30 + h + 0.2, m.position.z); this.scene.add(top); }
    }
    // rừng trúc trên đảo phụ phía đông
    const isle = new THREE.Group(); isle.position.set(62, -4, 8); this.scene.add(isle);
    const base = new THREE.Mesh(new THREE.ConeGeometry(16, 22, 24, 4), std(0x6a5d52, { rough: 0.95 })); base.rotation.x = Math.PI; base.position.y = -11; isle.add(base);
    const grass = new THREE.Mesh(new THREE.CircleGeometry(16, 32), std(0x3f7a4a, { rough: 0.9 })); grass.rotation.x = -Math.PI / 2; grass.position.y = 0.01; isle.add(grass);
    const bamboo = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.12, 0.14, 1, 6), std(0x6fae4a, { rough: 0.5 }), lite ? 60 : 160);
    const d = new THREE.Object3D();
    for (let i = 0; i < bamboo.count; i++) { const a = srand() * 7, r = Math.sqrt(srand()) * 14, h = 6 + srand() * 6; d.position.set(62 + Math.sin(a) * r, -4 + h / 2, 8 + Math.cos(a) * r); d.scale.set(1, h, 1); d.rotation.set(rnd(0.05), 0, rnd(0.05)); d.updateMatrix(); bamboo.setMatrixAt(i, d.matrix); }
    this.scene.add(bamboo);
    const pav = this.hall(62, 8, 6, 6, 3.5, 1, 0.8); pav.position.y = -4;
  }
  private buildDemonIsle() {
    // Ma Giới: đảo đá đen, khe dung nham phát sáng, gai nhọn, ánh đỏ
    const g = new THREE.Group(); g.position.set(-66, -6, 18); this.scene.add(g);
    const rock = std(0x1c1418, { rough: 0.9 }), lava = new THREE.MeshStandardMaterial({ color: 0xff4a10, emissive: 0xff3a00, emissiveIntensity: 2.2 });
    const base = new THREE.Mesh(new THREE.ConeGeometry(18, 26, 18, 4), rock); base.rotation.x = Math.PI; base.position.y = -13; g.add(base);
    const top = new THREE.Mesh(new THREE.CircleGeometry(18, 24), rock); top.rotation.x = -Math.PI / 2; g.add(top);
    for (let i = 0; i < 9; i++) { const crack = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 6 + srand() * 8), lava); crack.position.set(rnd(10), 0.05, rnd(10)); crack.rotation.y = srand() * 3; g.add(crack); }
    for (let i = 0; i < 14; i++) { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.8 + srand(), 6 + srand() * 9, 6), rock); const a = srand() * 7, r = 6 + srand() * 10; sp.position.set(Math.sin(a) * r, 3, Math.cos(a) * r); sp.rotation.set(rnd(0.3), 0, rnd(0.3)); g.add(sp); }
    const l = new THREE.PointLight(0xff4a10, 90, 50, 1.8); l.position.set(0, 6, 0); g.add(l);
    const pool = new THREE.Mesh(new THREE.CircleGeometry(4, 24), lava); pool.rotation.x = -Math.PI / 2; pool.position.y = 0.06; g.add(pool);
  }
  private buildDragonPool(): THREE.ShaderMaterial {
    // Long Cung: hồ linh thủy trong sân phía tây bắc, cột ngọc, thủy long tượng
    const m = new THREE.ShaderMaterial({ transparent: true, uniforms: { uTime },
      vertexShader: 'varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform float uTime; varying vec2 vU; void main(){ vec2 p = vU * 10.0; float w = sin(p.x * 2.0 + uTime * 1.5) * 0.5 + sin(p.y * 2.7 - uTime * 1.2) * 0.5 + sin((p.x + p.y) * 1.3 + uTime) * 0.5;
        vec3 c = mix(vec3(0.02, 0.25, 0.45), vec3(0.25, 0.9, 1.0), smoothstep(0.6, 1.4, w)); float r = length(vU - 0.5) * 2.0; gl_FragColor = vec4(c, 0.88 * (1.0 - smoothstep(0.95, 1.0, r))); }` });
    const pool = new THREE.Mesh(new THREE.CircleGeometry(7, 48), m); pool.rotation.x = -Math.PI / 2; pool.position.set(-30, 0.08, -8); this.scene.add(pool);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(7, 0.35, 8, 48), std(0xe8eaf0, { rough: 0.4 })); rim.rotation.x = Math.PI / 2; rim.position.set(-30, 0.25, -8); this.scene.add(rim);
    const jade = std(0x2fae8a, { rough: 0.3, metal: 0.2, emissive: 0x0f5a44, ei: 0.5 });
    const pts = Array.from({ length: 30 }, (_, k) => new THREE.Vector3(-30 + Math.sin(k * 0.4) * 2.5, 0.5 + k * 0.25 + Math.sin(k * 0.5) * 0.6, -8 + Math.cos(k * 0.4) * 2.5));
    const dragon = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 100, 0.45, 10), jade); dragon.castShadow = true; this.scene.add(dragon);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.8, 14, 10), jade); head.position.copy(pts[29]).add(new THREE.Vector3(0, 0.4, 0)); head.scale.set(1, 0.8, 1.7); this.scene.add(head);
    return m;
  }
  private buildWaterfall(): THREE.ShaderMaterial {
    // thác nước từ đảo trúc đổ xuống biển mây
    const m = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide, uniforms: { uTime },
      vertexShader: 'varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: `uniform float uTime; varying vec2 vU; float h(float x){ return fract(sin(x * 91.3) * 47453.1); }
        void main(){ float s = h(floor(vU.x * 40.0)); float f = fract(vU.y * 3.0 + uTime * (1.2 + s) + s); float a = smoothstep(0.0, 0.4, f) * (0.5 + s * 0.5) * smoothstep(0.0, 0.1, vU.x) * smoothstep(1.0, 0.9, vU.x) * smoothstep(0.0, 0.2, vU.y);
          gl_FragColor = vec4(mix(vec3(0.7, 0.9, 1.0), vec3(1.0), f), a * 0.85); }` });
    const fall = new THREE.Mesh(new THREE.PlaneGeometry(6, 40, 1, 1), m); fall.position.set(76, -24, 8); fall.rotation.y = -Math.PI / 2; this.scene.add(fall);
    const mist = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex(), color: 0xffffff, transparent: true, opacity: 0.6, depthWrite: false })); mist.position.set(76, -38, 8); mist.scale.setScalar(22); this.scene.add(mist);
    return m;
  }
  private buildFloaters() {
    const rock = new THREE.MeshStandardMaterial({ map: rockTex(), color: 0x9a9088, roughness: 0.95 }), grass = std(0x4a8a52, { rough: 0.9 });
    for (let i = 0; i < 14; i++) {
      const g = new THREE.Group(), s = 1.5 + srand() * 4;
      const b = new THREE.Mesh(new THREE.ConeGeometry(s, s * 2.2, 7), rock); b.rotation.x = Math.PI; b.position.y = -s * 1.1; g.add(b);
      const t = new THREE.Mesh(new THREE.CylinderGeometry(s, s, 0.3, 7), grass); g.add(t);
      const a = srand() * Math.PI * 2, r = 60 + srand() * 60;
      g.position.set(Math.sin(a) * r, -5 + srand() * 30, Math.cos(a) * r); g.userData = { y: g.position.y, p: srand() * 7 };
      this.scene.add(g); this.floaters.push(g);
    }
  }
  private buildQi(n: number) {
    const geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * 70; pos[i * 3] = Math.sin(a) * r; pos[i * 3 + 1] = Math.random() * 30; pos[i * 3 + 2] = Math.cos(a) * r; }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ map: softTex(), color: 0x9fe8ff, size: 0.35, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.scene.add(pts);
    return pts;
  }
  private buildTreasure() {
    const g = new THREE.Group();
    const gold = std(0xd4af37, { metal: 1, rough: 0.25, emissive: 0x5a3a00, ei: 0.6 }), wood = std(0x6a1a1a, { rough: 0.5 });
    const box = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 1.6), wood); box.position.y = 1.7; g.add(box);
    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 2.4, 16, 1, false, 0, Math.PI), wood); lid.rotation.z = Math.PI / 2; lid.position.y = 2.4; g.add(lid);
    for (const x of [-1, 0, 1]) { const band = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.5, 1.65), gold); band.position.set(x, 1.7, 0); g.add(band); }
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 2.2, 40, 24, 1, true), glow(0xffd04a, 0.18)); beam.position.y = 20; g.add(beam);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(2, 2.4, 1, 8), std(0xe8eaf0)); ped.position.y = 0.5; g.add(ped);
    return g;
  }

  // Kiến trúc, sàn đấu từ file GLB (tools/make-world.ts): ẩn bản dựng bằng code, đặt khối từ file vào đúng chỗ.
  // Đá tảng, bụi cây quét 3D (Poly Haven) rải quanh mép đảo, đảo trúc và Ma Giới.
  useModels() {
    const tpl = hasModel('tg-kien-truc') ? templateScene('tg-kien-truc') : null;
    const put = (name: string, x: number, z: number, ry = 0, s = 1) => {
      const src = tpl?.getObjectByName(name); if (!src) return false;
      const o = src.clone(true); o.position.set(x, 0, z); o.rotation.y = ry; o.scale.setScalar(s);
      o.traverse(c => { const m = c as THREE.Mesh; if (m.isMesh) { m.castShadow = !this.lite; m.receiveShadow = true; } });
      this.scene.add(o); return true;
    };
    if (tpl) {
      if (put('vo-dai', 0, 0)) { for (const o of this.proc.arena) o.visible = false; this.arenaRune.position.y = 0.09; this.arenaGlow.position.y = 0.1; }
      const ok = put('dien-chinh', 0, -38) && put('lau-ben', -24, -30) && put('lau-ben', 24, -30) && put('thap', -38, -14) && put('thap', 38, -14);
      if (ok) for (const o of this.proc.palace) o.visible = false;
      if (put('thien-mon', 0, 44)) for (const o of this.proc.gate) o.visible = false;
    }
    let seed = 11; const r = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const scatter = (names: string[], n: number, at: () => [number, number, number] | null, s0: number, s1: number) => {
      const list = names.filter(hasModel); if (!list.length) return;
      for (let i = 0; i < n; i++) {
        const p = at(); if (!p) continue;
        const src = templateScene(list[i % list.length])!, o = src.clone(true);
        o.position.set(p[0], p[1], p[2]); o.rotation.y = r() * Math.PI * 2; o.scale.setScalar(s0 + r() * (s1 - s0));
        o.traverse(c => { const m = c as THREE.Mesh; if (m.isMesh) { m.castShadow = !this.lite; m.receiveShadow = true; } });
        this.scene.add(o);
      }
    };
    // mép đảo chính (chừa lối nam, bắc)
    scatter(['tg-da-1', 'tg-da-2', 'tg-da-3'], 16, () => { const a = r() * Math.PI * 2; if (Math.abs(Math.sin(a)) < 0.3) return null; const rr = 41 + r() * 5; const x = Math.sin(a) * rr, z = Math.cos(a) * rr; if (z < -20) return null; return [x, 0, z]; }, 1.2, 2.6);
    scatter(['tg-bui-1', 'tg-bui-2', 'tg-bui-3'], 26, () => { const a = r() * Math.PI * 2; if (Math.abs(Math.sin(a)) < 0.3) return null; const rr = 30 + r() * 14; const x = Math.sin(a) * rr, z = Math.cos(a) * rr; if (z < -18 || Math.hypot(x + 30, z + 8) < 9) return null; return [x, 0, z]; }, 0.9, 1.8);
    // đảo trúc phía đông, Ma Giới phía tây
    scatter(['tg-da-1', 'tg-da-3'], 6, () => { const a = r() * 7, rr = 4 + r() * 10; return [62 + Math.sin(a) * rr, -4, 8 + Math.cos(a) * rr]; }, 0.8, 1.8);
    scatter(['tg-bui-1', 'tg-bui-3'], 10, () => { const a = r() * 7, rr = 3 + r() * 11; return [62 + Math.sin(a) * rr, -4, 8 + Math.cos(a) * rr]; }, 0.8, 1.4);
    scatter(['tg-da-2', 'tg-da-1'], 8, () => { const a = r() * 7, rr = 5 + r() * 11; return [-66 + Math.sin(a) * rr, -6, 18 + Math.cos(a) * rr]; }, 1.5, 3.2);
  }

  setTheme(el: Element | null) { this.themeT.setHex(el ? ELEMENT_COLORS[el] : 0x9fe8ff); }
  update(dt: number, t: number) {
    this.theme.lerp(this.themeT, Math.min(1, dt * 1.5));
    (this.arenaGlow.material as THREE.MeshBasicMaterial).color.copy(this.theme);
    (this.arenaRune.material as THREE.MeshBasicMaterial).color.copy(this.theme);
    this.arenaRune.rotation.z = t * 0.05;
    (this.qi.material as THREE.PointsMaterial).color.copy(this.theme);
    const fog = this.scene.fog as THREE.FogExp2; fog.color.copy(this.fogBase).lerp(this.theme, 0.08);
    const p = this.qi.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) { let y = p.getY(i) + dt * (0.4 + (i % 7) * 0.1); if (y > 30) y = 0; p.setY(i, y); }
    p.needsUpdate = true;
    for (const f of this.floaters) { f.position.y = f.userData.y + Math.sin(t * 0.4 + f.userData.p) * 1.2; f.rotation.y += dt * 0.03; }
    for (const l of this.lanterns) l.scale.x = l.scale.z = 1 + Math.sin(t * 3 + l.position.x) * 0.04;
    if (this.treasure.visible) { this.treasure.rotation.y = t * 0.4; this.treasure.position.y = Math.sin(t * 2) * 0.2; }
    void this.water; void this.fall; void this.cloudSea; void this.skyMat;
  }
}
