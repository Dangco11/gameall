import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { CUT_Z, FEED_ROLLER, FRONT_ROLLER, PLATEN_Y, PLATEN_Z0, PLATEN_Z1, ROLL, TRAY_Y } from './paper.ts';
import { findNodes, fitTo, loadPrinterModel } from '../rig/glb.ts';

// Máy in UV khổ lớn dựng bằng code (không dùng hộp ghép thô): khung hông đúc theo biên dạng cong, chân đế có bánh xe,
// ray dẫn hướng crôm, giàn nhôm định hình rãnh chữ T, đầu in có hộp mực CMYK + trắng + vecni sau kính khói và hai đèn UV,
// xích dẫn cáp uốn theo đầu in, trục lăn cao su, cuộn giấy, motor bước và bánh răng ăn khớp, dao cắt chạy ngang,
// bảng điều khiển màn hình cảm ứng, đèn tháp báo trạng thái, dải LED, kính bảo vệ. Mọi chi tiết tạo MỘT lần;
// mỗi khung hình chỉ đổi vị trí, góc quay, màu đèn.
// Có file models/may-in.glb thì thân máy dùng model đó (các nút tên Gantry, Head, Roller*, Gear*, Cutter, Roll được điều khiển).

export type PrinterMode = 'idle' | 'ready' | 'print' | 'cut' | 'vip' | 'legend' | 'done';
const P = (o: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(o);
const RAIL_X = 0.9, RAIL_Y = 1.235, BEAM_Y = 1.3, HEAD_DZ = 0.085, CUTTER_Y = 1.07;

function noiseTex(size: number, base: number, amp: number, seed = 3, srgb = false){
  const c = document.createElement('canvas'); c.width = c.height = size;
  const g = c.getContext('2d')!, img = g.createImageData(size, size);
  let s = seed; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < size * size; i++){ const v = Math.max(0, Math.min(255, base + (rnd() - 0.5) * amp)); img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v; img.data[i * 4 + 3] = 255; }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; return t;
}
function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, srgb = true){
  const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c); t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t;
}

/* ------------------------------------------------------------ chất liệu PBR (tạo một lần) */
function materials(){
  const peel = noiseTex(256, 150, 60, 11);          // vân sơn tĩnh điện (vỏ cam)
  peel.repeat.set(6, 6);
  const brushed = canvasTex(512, 64, g => { for (let i = 0; i < 1800; i++){ const y = Math.random() * 64, v = 120 + Math.random() * 90; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(0, y, 512, 0.6 + Math.random()); } }, false);
  brushed.wrapS = brushed.wrapT = THREE.RepeatWrapping;
  const rubber = canvasTex(512, 128, g => {
    g.fillStyle = '#151515'; g.fillRect(0, 0, 512, 128);
    for (let i = 0; i < 2600; i++){ const v = 18 + Math.random() * 14; g.fillStyle = `rgb(${v},${v},${v})`; g.fillRect(Math.random() * 512, Math.random() * 128, 2, 2); }
    // vạch dọc trục giúp thấy trục đang quay
    for (let i = 0; i < 6; i++){ g.fillStyle = 'rgba(255,255,255,0.06)'; g.fillRect(i * 85, 0, 4, 128); }
    g.fillStyle = 'rgba(235,235,235,0.55)'; g.font = '700 22px "Segoe UI", Arial'; g.fillText('LPS · GRIP ROLLER', 18, 70);
  });
  rubber.wrapS = rubber.wrapT = THREE.RepeatWrapping;
  const vacuum = canvasTex(512, 512, g => { g.fillStyle = '#3a3e44'; g.fillRect(0, 0, 512, 512); for (let y = 8; y < 512; y += 16) for (let x = 8; x < 512; x += 16){ g.fillStyle = '#0d0e10'; g.beginPath(); g.arc(x + (y / 16 % 2) * 8, y, 2.6, 0, 7); g.fill(); } }, true);
  vacuum.wrapS = vacuum.wrapT = THREE.RepeatWrapping; vacuum.repeat.set(4, 5);
  return {
    body: P({ name: 'powderWhite', color: 0xe9e6df, roughness: 0.48, roughnessMap: peel, clearcoat: 0.45, clearcoatRoughness: 0.35 }),
    graphite: P({ name: 'powderGraphite', color: 0x2a2e35, roughness: 0.55, roughnessMap: peel, clearcoat: 0.3, clearcoatRoughness: 0.45 }),
    accent: P({ name: 'powderAccent', color: 0xe8661c, roughness: 0.45, roughnessMap: peel, clearcoat: 0.5, clearcoatRoughness: 0.3 }),
    steel: P({ name: 'stainless', color: 0xd4d8dc, metalness: 1, roughness: 0.3, roughnessMap: brushed, anisotropy: 0.8 }),
    chrome: P({ name: 'chrome', color: 0xffffff, metalness: 1, roughness: 0.05 }),
    alu: P({ name: 'aluminium', color: 0xc2c7cd, metalness: 1, roughness: 0.38, roughnessMap: brushed, anisotropy: 0.6 }),
    darkMetal: P({ name: 'anodized', color: 0x30343a, metalness: 0.9, roughness: 0.35 }),
    brass: P({ name: 'brass', color: 0xd8a650, metalness: 1, roughness: 0.28 }),
    plastic: P({ name: 'abs', color: 0x1c1e22, roughness: 0.42, clearcoat: 0.15 }),
    plasticGrey: P({ name: 'absGrey', color: 0x5a6068, roughness: 0.5 }),
    rubber: P({ name: 'rubber', map: rubber, color: 0xffffff, roughness: 0.82, metalness: 0 }),
    tire: P({ name: 'tire', color: 0x111111, roughness: 0.9 }),
    glass: P({ name: 'guardGlass', color: 0xdff4ff, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.16, clearcoat: 1, clearcoatRoughness: 0.02, depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 1.6 }),
    smoke: P({ name: 'smokedGlass', color: 0x20262c, metalness: 0, roughness: 0.03, transparent: true, opacity: 0.5, clearcoat: 1, depthWrite: false, envMapIntensity: 1.4 }),
    vacuum: P({ name: 'vacuumBed', map: vacuum, color: 0xffffff, metalness: 0.7, roughness: 0.45 }),
    blade: P({ name: 'blade', color: 0xf0f4f8, metalness: 1, roughness: 0.12 }),
    black: P({ name: 'blackMatte', color: 0x0b0b0d, roughness: 0.8 }),
  };
}
type Mats = ReturnType<typeof materials>;
const led = (c: number, k = 2.5) => new THREE.MeshStandardMaterial({ color: 0x050505, emissive: c, emissiveIntensity: k, roughness: 0.35, toneMapped: true });

/* ------------------------------------------------------------ hình học */
const mesh = (g: THREE.BufferGeometry, m: THREE.Material, parent?: THREE.Object3D, x = 0, y = 0, z = 0) => {
  const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; parent?.add(o); return o;
};
// biên dạng vẽ trên mặt phẳng (z, y) rồi đùn dày theo trục x
function profileX(pts: (THREE.Vector2 | [number, number, number, number])[], depth: number, bevel = 0.012, holes: THREE.Path[] = []){
  const s = new THREE.Shape();
  pts.forEach((p, i) => {
    if (p instanceof THREE.Vector2){ i ? s.lineTo(-p.x, p.y) : s.moveTo(-p.x, p.y); }
    else s.quadraticCurveTo(-p[0], p[1], -p[2], p[3]);
  });
  s.holes.push(...holes);
  const g = new THREE.ExtrudeGeometry(s, { depth: depth - bevel * 2, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 3, curveSegments: 18 });
  g.translate(0, 0, -(depth - bevel * 2) / 2);
  g.rotateY(Math.PI / 2);
  return g;
}
const V2 = (z: number, y: number) => new THREE.Vector2(z, y);
// biên dạng (mặt cắt) vẽ trên mặt phẳng xy rồi đùn theo trục x (thanh nhôm định hình, ray...)
function barX(shape: THREE.Shape, len: number, bevel = 0.002){
  const g = new THREE.ExtrudeGeometry(shape, { depth: len, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 2, curveSegments: 8 });
  g.translate(0, 0, -len / 2); g.rotateY(Math.PI / 2); return g;
}
function roundedRect(w: number, h: number, r: number, cx = 0, cy = 0){
  const s = new THREE.Shape(), x = cx - w / 2, y = cy - h / 2;
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y); return s;
}
// thanh nhôm định hình 80×80 rãnh chữ T bốn mặt, lỗ tâm
function tSlot(size: number){
  const h = size / 2, sl = size * 0.16, dp = size * 0.18, s = new THREE.Shape();
  s.moveTo(-h, -h);
  const side = (ax: number, ay: number, bx: number, by: number, nx: number, ny: number) => {
    const mx = (ax + bx) / 2, my = (ay + by) / 2, tx = (bx - ax) / size, ty = (by - ay) / size;
    s.lineTo(mx - tx * sl, my - ty * sl); s.lineTo(mx - tx * sl - nx * dp * 0.4, my - ty * sl - ny * dp * 0.4);
    s.lineTo(mx - tx * sl * 1.8 - nx * dp * 0.55, my - ty * sl * 1.8 - ny * dp * 0.55); s.lineTo(mx - tx * sl * 1.8 - nx * dp, my - ty * sl * 1.8 - ny * dp);
    s.lineTo(mx + tx * sl * 1.8 - nx * dp, my + ty * sl * 1.8 - ny * dp); s.lineTo(mx + tx * sl * 1.8 - nx * dp * 0.55, my + ty * sl * 1.8 - ny * dp * 0.55);
    s.lineTo(mx + tx * sl - nx * dp * 0.4, my + ty * sl - ny * dp * 0.4); s.lineTo(mx + tx * sl, my + ty * sl); s.lineTo(bx, by);
  };
  side(-h, -h, h, -h, 0, -1); side(h, -h, h, h, 1, 0); side(h, h, -h, h, 0, 1); side(-h, h, -h, -h, -1, 0);
  s.holes.push(new THREE.Path().absarc(0, 0, size * 0.12, 0, Math.PI * 2, true));
  return s;
}
// bánh răng: răng hình thang, lỗ trục, lỗ giảm trọng
function gearGeo(teeth: number, r: number, depth: number, holes = 5){
  const s = new THREE.Shape(), rt = r, rr = r - Math.min(0.02, r * 0.14);
  for (let i = 0; i < teeth; i++){
    const a = i / teeth * Math.PI * 2, p = Math.PI * 2 / teeth;
    const pts: [number, number][] = [[rr, a], [rt, a + p * 0.22], [rt, a + p * 0.48], [rr, a + p * 0.7]];
    pts.forEach(([rad, ang], k) => { const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad; i === 0 && k === 0 ? s.moveTo(x, y) : s.lineTo(x, y); });
  }
  s.closePath();
  s.holes.push(new THREE.Path().absarc(0, 0, r * 0.14, 0, Math.PI * 2, true));
  for (let k = 0; k < holes; k++){ const a = k / holes * Math.PI * 2; s.holes.push(new THREE.Path().absarc(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.17, 0, Math.PI * 2, true)); }
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelSize: 0.0015, bevelThickness: 0.0015, bevelSegments: 1, curveSegments: 10 });
  g.translate(0, 0, -depth / 2); g.rotateY(Math.PI / 2); return g;
}
const cylX = (r: number, len: number, seg = 32) => new THREE.CylinderGeometry(r, r, len, seg).rotateZ(Math.PI / 2);
const lathe = (pts: [number, number][], seg = 32) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg);

export class Printer {
  readonly group = new THREE.Group();
  /** giấy đã chạy (m); trục lăn, cuộn giấy, bánh răng quay theo */
  feed = 0;
  /** vị trí vòi phun: z trên bàn in, x ngang */
  gantryZ = -0.95; headX = 0.82;
  cutterX = 0.86; cutting = false;
  motor = 0;            // motor chạy (0..1), cho tiếng máy và đèn
  uv = 0;               // đèn UV trên đầu in (0..1)
  mode: PrinterMode = 'idle';
  rollR = ROLL.r;
  speeds = { feed: 0, head: 0, gantry: 0 };
  status = { line1: 'SẴN SÀNG', line2: 'Tặng quà để in ảnh của bạn', job: '', progress: 0, queue: 0, printed: 0 };

  private M: Mats;
  private gantry = new THREE.Group(); private head = new THREE.Group(); private cutter = new THREE.Group(); private blade!: THREE.Mesh;
  private rollers: { o: THREE.Object3D; r: number }[] = [];
  private gears: { o: THREE.Object3D; k: number; src: 'front' | 'feed' }[] = [];
  private pulleys: { o: THREE.Object3D; k: number; src: 'gantry' | 'head' }[] = [];
  private roll = new THREE.Group(); private rollPaper!: THREE.Mesh;
  private chain!: THREE.InstancedMesh;
  private ledStrip: THREE.MeshStandardMaterial[] = [];
  private tower: THREE.MeshStandardMaterial[] = [];
  private uvMat = led(0x7a3cff, 0); private headLed = led(0x30ff80, 2); private nozzleGlow = led(0x9a6aff, 0);
  private screen: { tex: THREE.CanvasTexture; g: CanvasRenderingContext2D; key: string; t: number };
  private uvLight = new THREE.PointLight(0x8a5aff, 0, 1.4, 2);
  private lastFeed = 0; private lastGZ = -0.95; private lastHX = 0.82; private frontA = 0; private feedA = 0; private gA = 0; private hA = 0;
  private glb: { gantry?: THREE.Object3D; head?: THREE.Object3D; cutter?: THREE.Object3D; roll?: THREE.Object3D; rollers: THREE.Object3D[]; gears: THREE.Object3D[] } | null = null;

  constructor(){
    this.M = materials();
    this.screen = this.makeScreen();
    this.group.name = 'printer';
    this.frame(); this.platen(); this.paperRoll(); this.rollersBuild(); this.gearTrain(); this.buildGantry(); this.buildCutter();
    this.panel(); this.towerLight(); this.tray(); this.leds();
    this.head.add(this.uvLight); this.uvLight.position.set(0, -0.12, 0);
    void this.tryGlb();
  }

  /* ---------------------------------------------------------- khung */
  private frame(){
    const M = this.M;
    // khung hông: vỏ đầu máy cong + chân đế, đúc theo biên dạng
    const side = () => profileX([
      V2(-1.78, 0.64), V2(-1.78, 1.04), [-1.78, 1.17, -1.64, 1.17], V2(0.96, 1.17), [1.1, 1.17, 1.1, 1.03], V2(1.1, 0.8), [1.1, 0.66, 0.95, 0.66],
      V2(0.32, 0.64), [0.16, 0.62, 0.14, 0.48], V2(0.1, 0.13), V2(0.42, 0.11), [0.46, 0.1, 0.46, 0.06], V2(0.46, 0.03), V2(-0.98, 0.03), V2(-0.98, 0.06), [-0.98, 0.11, -0.92, 0.11],
      V2(-0.46, 0.13), V2(-0.5, 0.48), [-0.52, 0.62, -0.68, 0.64],
    ], 0.16, 0.014);
    for (const sx of [-1, 1]){
      mesh(side(), M.graphite, this.group, sx * 0.9, 0, 0);
      // nẹp màu cam chạy dọc mép trên
      mesh(new RoundedBoxGeometry(0.168, 0.018, 2.6, 2, 0.006), M.accent, this.group, sx * 0.9, 1.12, -0.36);
      // bánh xe và chân tăng chỉnh
      for (const z of [-0.88, 0.36]){
        mesh(lathe([[0, 0], [0.035, 0], [0.04, 0.008], [0.012, 0.02], [0.012, 0.05], [0, 0.05]], 20), M.steel, this.group, sx * 0.9, 0, z);
        const w = mesh(cylX(0.035, 0.03, 24), M.tire, this.group, sx * 0.9 + sx * 0.0, 0.04, z + 0.09); w.scale.set(1, 1, 1);
      }
    }
    // xà ngang hai chân (ống thép tròn) + giằng chéo
    mesh(cylX(0.028, 1.65), M.steel, this.group, 0, 0.26, -0.18);
    // thân tủ điện dưới bàn in: mặt trước cong, khe tản nhiệt, bảng tên
    const cab = profileX([V2(-0.98, 0.42), V2(-0.98, 0.8), V2(0.78, 0.8), [0.86, 0.8, 0.86, 0.72], V2(0.86, 0.5), [0.86, 0.42, 0.78, 0.42]], 1.64, 0.01);
    mesh(cab, M.body, this.group);
    const slot = new RoundedBoxGeometry(0.1, 0.012, 0.012, 2, 0.005), slots = new THREE.InstancedMesh(slot, M.black, 30), o = new THREE.Object3D();
    for (let i = 0; i < 30; i++){ o.position.set(-0.62 + (i % 10) * 0.115 + (i % 10 >= 5 ? 0.18 : 0), 0.48 + Math.floor(i / 10) * 0.03, 0.862); o.updateMatrix(); slots.setMatrixAt(i, o.matrix); }
    this.group.add(slots);
    const plate = canvasTex(512, 96, g => {
      const gr = g.createLinearGradient(0, 0, 512, 0); gr.addColorStop(0, '#2a2e35'); gr.addColorStop(1, '#1a1d22'); g.fillStyle = gr; g.fillRect(0, 0, 512, 96);
      g.fillStyle = '#e8661c'; g.fillRect(0, 0, 10, 96);
      g.fillStyle = '#f4f4f4'; g.font = '800 40px "Segoe UI", Arial'; g.fillText('LPS-3200 UV', 30, 52); g.font = '600 20px "Segoe UI", Arial'; g.fillStyle = '#b8c0c8'; g.fillText('LIVE PRINT STUDIO · WIDE FORMAT', 30, 82);
    });
    mesh(new THREE.PlaneGeometry(0.42, 0.08), new THREE.MeshPhysicalMaterial({ map: plate, metalness: 0.5, roughness: 0.3, clearcoat: 1 }), this.group, 0, 0.66, 0.8655);
    // bulông lục giác trên khung hông
    const bolt = new THREE.CylinderGeometry(0.009, 0.009, 0.008, 6).rotateZ(Math.PI / 2), bolts = new THREE.InstancedMesh(bolt, M.steel, 40);
    let n = 0;
    for (const sx of [-1, 1]) for (const [z, y] of [[-1.7, 1.1], [-1.7, 0.7], [-0.6, 1.1], [0.4, 1.1], [1.02, 1.08], [1.02, 0.74], [-0.3, 0.36], [-0.3, 0.2], [0.0, 0.36], [0.0, 0.2]]){
      o.position.set(sx * 0.983, y, z); o.updateMatrix(); bolts.setMatrixAt(n++, o.matrix);
      o.position.set(sx * 0.817, y, z); o.updateMatrix(); bolts.setMatrixAt(n++, o.matrix);
    }
    bolts.count = n; this.group.add(bolts);
    // hai ray dẫn hướng crôm, đế đỡ hai đầu
    for (const sx of [-1, 1]){
      mesh(new THREE.CylinderGeometry(0.022, 0.022, 2.0, 32).rotateX(Math.PI / 2), M.chrome, this.group, sx * RAIL_X, RAIL_Y, 0);
      for (const z of [-0.99, 0.99]){
        const b = mesh(profileX([V2(-0.04, 1.17), V2(-0.04, 1.24), [-0.04, 1.27, -0.01, 1.27], V2(0.01, 1.27), [0.04, 1.27, 0.04, 1.24], V2(0.04, 1.17)], 0.07, 0.006), M.alu, this.group, sx * RAIL_X, 0, z);
        void b;
      }
      // dây đai răng của trục Y
      mesh(new THREE.BoxGeometry(0.012, 0.004, 1.96), M.black, this.group, sx * (RAIL_X - 0.05), 1.2, 0);
    }
    // nắp che khe nạp giấy phía sau (khe đưa giấy vào)
    const hood = profileX([V2(-1.26, 1.0), V2(-1.26, 1.08), [-1.26, 1.16, -1.16, 1.16], V2(-1.08, 1.16), [-1.0, 1.16, -0.99, 1.07], V2(-0.99, 1.025), V2(-1.04, 1.025), V2(-1.04, 1.06), [-1.06, 1.11, -1.12, 1.11], V2(-1.18, 1.11), [-1.21, 1.11, -1.21, 1.06], V2(-1.21, 1.0)], 1.62, 0.008);
    mesh(hood, M.body, this.group);
    mesh(new THREE.BoxGeometry(1.5, 0.006, 0.015), led(0x5ad8ff, 1.5), this.group, 0, 1.145, -1.0);
    // vỏ kính cong che cuộn giấy (kính bảo vệ)
    const shell = new THREE.CylinderGeometry(0.27, 0.27, 1.62, 40, 1, true, -Math.PI * 0.95, Math.PI * 1.05).rotateZ(Math.PI / 2);
    mesh(shell, M.glass, this.group, 0, ROLL.y, ROLL.z).castShadow = false;
  }

  private platen(){
    const M = this.M;
    // bàn hút chân không bằng nhôm, mép vát
    const top = new THREE.ExtrudeGeometry(roundedRect(1.62, PLATEN_Z1 - PLATEN_Z0 + 0.02, 0.02), { depth: 0.05, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 2 });
    top.rotateX(-Math.PI / 2); top.translate(0, PLATEN_Y - 0.059, (PLATEN_Z0 + PLATEN_Z1) / 2);
    const uv = top.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 1.62, uv.getY(i) / 2);
    mesh(top, M.vacuum, this.group);
    // rãnh dao cắt và thước đo hai bên
    mesh(new THREE.BoxGeometry(1.6, 0.002, 0.012), M.black, this.group, 0, PLATEN_Y + 0.0005, CUT_Z);
    const ruler = canvasTex(1024, 32, g => { g.fillStyle = '#d8dce0'; g.fillRect(0, 0, 1024, 32); g.fillStyle = '#222'; for (let i = 0; i <= 190; i++){ const x = i / 190 * 1024; g.fillRect(x, 0, 1.4, i % 10 ? 8 : 18); if (i % 10 === 0){ g.font = '600 11px Arial'; g.fillText(String(i), x + 2, 30); } } });
    const rulerMat = new THREE.MeshStandardMaterial({ map: ruler, metalness: 0.6, roughness: 0.4 });
    for (const sx of [-1, 1]) mesh(new THREE.PlaneGeometry(1.9, 0.05).rotateX(-Math.PI / 2).rotateY(Math.PI / 2), rulerMat, this.group, sx * 0.76, PLATEN_Y - 0.002, -0.05);
  }

  private paperRoll(){
    const M = this.M;
    this.roll.position.set(0, ROLL.y, ROLL.z);
    // lõi giấy cứng, mâm kẹp hai đầu, trục thép xuyên tâm
    const sideTex = canvasTex(256, 256, g => { g.fillStyle = '#efe8d6'; g.fillRect(0, 0, 256, 256); for (let r = 20; r < 128; r += 1.6){ g.strokeStyle = `rgba(150,130,100,${0.08 + Math.random() * 0.1})`; g.beginPath(); g.arc(128, 128, r, 0, 7); g.stroke(); } g.fillStyle = '#8a6a44'; g.beginPath(); g.arc(128, 128, 32, 0, 7); g.fill(); g.fillStyle = '#333'; g.beginPath(); g.arc(128, 128, 14, 0, 7); g.fill(); });
    const paper = new THREE.MeshPhysicalMaterial({ color: 0xf3ecd9, roughness: 0.85, sheen: 0.3, sheenColor: new THREE.Color(0xfff6e8) });
    this.rollPaper = mesh(new THREE.CylinderGeometry(1, 1, 1.32, 64, 1, false).rotateZ(Math.PI / 2), [paper, new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.9 }), new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.9 })] as unknown as THREE.Material, this.roll);
    mesh(cylX(0.012, 1.7), M.steel, this.roll);
    for (const sx of [-1, 1]){
      const chuck = mesh(lathe([[0.014, 0], [0.07, 0], [0.075, 0.006], [0.075, 0.02], [0.04, 0.03], [0.04, 0.06], [0.014, 0.06]], 32), M.alu, this.roll, sx * 0.67, 0, 0);
      chuck.rotation.z = sx > 0 ? -Math.PI / 2 : Math.PI / 2;
      // tay nắm khoá mâm
      mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.06, 10), M.accent, this.roll, sx * 0.71, 0.07, 0);
    }
    this.group.add(this.roll);
    this.setRollRadius(ROLL.r);
  }
  private setRollRadius(r: number){ this.rollR = r; this.rollPaper.scale.set(1, r, r); }

  private rollersBuild(){
    const M = this.M;
    const roller = (z: number, y: number, r: number, len: number) => {
      const g = new THREE.Group(); g.position.set(0, y, z);
      const core = mesh(cylX(r, len, 48), M.rubber, g); (core.material as THREE.MeshPhysicalMaterial).map!.repeat.set(1, 1);
      for (const sx of [-1, 1]){
        const hub = mesh(lathe([[0, 0], [r * 0.95, 0], [r, 0.006], [r * 0.7, 0.02], [r * 0.3, 0.025], [0.012, 0.03], [0, 0.03]], 32), M.steel, g, sx * len / 2, 0, 0);
        hub.rotation.z = sx > 0 ? -Math.PI / 2 : Math.PI / 2;
      }
      mesh(cylX(0.014, 1.72), M.steel, g);
      this.group.add(g); this.rollers.push({ o: g, r });
      return g;
    };
    // trục lăn lớn: trục nạp giấy phía sau, trục đẩy giấy phía trước (giấy vòng qua)
    roller(FEED_ROLLER.z, FEED_ROLLER.y, FEED_ROLLER.r, 1.5);
    roller(FRONT_ROLLER.z, FRONT_ROLLER.y, FRONT_ROLLER.r, 1.5);
    // dãy bánh ép giấy nhỏ trên trục nạp
    const pg = new THREE.Group(); pg.position.set(0, PLATEN_Y + 0.022, FEED_ROLLER.z);
    mesh(cylX(0.008, 1.6), M.steel, pg);
    const wheel = cylX(0.02, 0.03, 24), wm = new THREE.InstancedMesh(wheel, M.plasticGrey, 9), o = new THREE.Object3D();
    for (let i = 0; i < 9; i++){ o.position.set(-0.64 + i * 0.16, 0, 0); o.updateMatrix(); wm.setMatrixAt(i, o.matrix); }
    pg.add(wm); this.group.add(pg); this.rollers.push({ o: pg, r: -0.02 });
    // thanh ép giấy phía trước (khe giấy ra)
    mesh(new THREE.CylinderGeometry(0.01, 0.01, 1.62, 16).rotateZ(Math.PI / 2), M.chrome, this.group, 0, PLATEN_Y + 0.014, PLATEN_Z1 - 0.02);
  }

  private gearTrain(){
    const M = this.M, x = 1.0;
    const set = (z: number, y: number, src: 'front' | 'feed') => {
      // bánh răng lớn 32 răng trên đầu trục lăn, bánh nhỏ 12 răng trên trục motor, ăn khớp (khoảng cách tâm 0,22 m)
      const big = mesh(gearGeo(32, 0.16, 0.018), M.brass, this.group, x, y, z);
      const pa = new THREE.Vector2(-0.15, -0.16).normalize().multiplyScalar(0.22);
      const small = mesh(gearGeo(12, 0.06, 0.022), M.steel, this.group, x + 0.004, y + pa.y, z + pa.x);
      small.rotation.x = Math.PI / 12;
      this.gears.push({ o: big, k: 1, src }, { o: small, k: -32 / 12, src });
      // motor bước: thân bát giác có cánh tản nhiệt, mặt bích, đầu cắm dây
      const motor = new THREE.Group(); motor.position.set(x + 0.09, y + pa.y, z + pa.x);
      const oct = new THREE.Shape(); for (let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2 + Math.PI / 8; const px = Math.cos(a) * 0.06, py = Math.sin(a) * 0.06; i ? oct.lineTo(px, py) : oct.moveTo(px, py); }
      mesh(barX(oct, 0.11, 0.004), M.darkMetal, motor);
      for (let i = 0; i < 5; i++) mesh(cylX(0.058, 0.006, 8), M.black, motor, -0.04 + i * 0.02, 0, 0);
      mesh(new RoundedBoxGeometry(0.02, 0.03, 0.05, 2, 0.006), M.plastic, motor, 0.03, 0.065, 0);
      this.group.add(motor);
      // kính bảo vệ bộ truyền động
      const guard = mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.07, 40, 1, true).rotateZ(Math.PI / 2), M.glass, this.group, x + 0.02, y - 0.03, z - 0.06); guard.castShadow = false;
      mesh(new THREE.CircleGeometry(0.21, 40).rotateY(Math.PI / 2), M.glass, this.group, x + 0.055, y - 0.03, z - 0.06).castShadow = false;
    };
    set(FRONT_ROLLER.z - 0.02, FRONT_ROLLER.y, 'front');
    set(FEED_ROLLER.z, FEED_ROLLER.y - 0.06, 'feed');
  }

  /* ---------------------------------------------------------- giàn in, đầu in */
  private buildGantry(){
    const M = this.M, g = this.gantry;
    // xà ngang nhôm định hình rãnh chữ T
    mesh(barX(tSlot(0.08), 1.96, 0.0015), M.alu, g, 0, BEAM_Y, 0);
    // xe chạy trên ray hai bên: khối ổ bi trượt, tấm nối, motor trục X + puly
    for (const sx of [-1, 1]){
      const car = new THREE.Group(); car.position.set(sx * RAIL_X, 0, 0);
      mesh(profileX([V2(-0.08, RAIL_Y - 0.035), V2(-0.08, RAIL_Y + 0.03), [-0.08, RAIL_Y + 0.06, -0.05, RAIL_Y + 0.06], V2(0.05, RAIL_Y + 0.06), [0.08, RAIL_Y + 0.06, 0.08, RAIL_Y + 0.03], V2(0.08, RAIL_Y - 0.035)], 0.09, 0.008), M.graphite, car);
      for (const z of [-0.05, 0.05]) mesh(lathe([[0.026, -0.03], [0.03, -0.025], [0.03, 0.025], [0.026, 0.03]], 24).rotateX(Math.PI / 2), M.steel, car, 0, RAIL_Y, z);
      mesh(new RoundedBoxGeometry(0.1, 0.06, 0.12, 2, 0.01), M.accent, car, 0, BEAM_Y, 0);
      g.add(car);
      const pul = mesh(cylX(0.02, 0.03, 24), M.alu, g, sx * (RAIL_X - 0.05), 1.2, 0); this.pulleys.push({ o: pul, k: 1 / 0.02, src: 'gantry' });
    }
    // motor trục X ở đầu xà bên phải, dây đai dọc xà
    const mx = new THREE.Group(); mx.position.set(1.0, BEAM_Y + 0.08, 0);
    mesh(new RoundedBoxGeometry(0.07, 0.07, 0.07, 3, 0.012), M.darkMetal, mx);
    for (let i = 0; i < 4; i++) mesh(new THREE.BoxGeometry(0.074, 0.003, 0.074), M.black, mx, 0, -0.025 + i * 0.016, 0);
    g.add(mx);
    const hp = mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.03, 20), M.alu, g, 0.96, BEAM_Y + 0.045, 0); this.pulleys.push({ o: hp, k: 1 / 0.015, src: 'head' });
    mesh(new THREE.BoxGeometry(1.9, 0.004, 0.012), M.black, g, 0, BEAM_Y + 0.044, 0.025);
    // máng xích dẫn cáp trên đỉnh xà
    mesh(new THREE.BoxGeometry(1.94, 0.006, 0.07), M.darkMetal, g, 0, BEAM_Y + 0.043, -0.01);
    // xích dẫn cáp: các mắt xích nhựa, uốn chữ U theo đầu in (cập nhật mỗi khung hình)
    const link = new THREE.Group();
    const lg = new RoundedBoxGeometry(0.036, 0.024, 0.05, 2, 0.006);
    this.chain = new THREE.InstancedMesh(lg, M.plastic, 56);
    this.chain.castShadow = true; this.chain.frustumCulled = false;
    link.add(this.chain); g.add(link);

    // đầu in
    const h = this.head; h.position.set(0, 0, HEAD_DZ);
    mesh(new RoundedBoxGeometry(0.16, 0.12, 0.03, 2, 0.006), M.alu, h, 0, BEAM_Y, -HEAD_DZ + 0.055);      // tấm gá trượt trên xà
    const body = profileX([V2(-0.06, PLATEN_Y + 0.05), V2(-0.06, PLATEN_Y + 0.2), [-0.06, PLATEN_Y + 0.24, -0.03, PLATEN_Y + 0.25], V2(0.035, PLATEN_Y + 0.25), [0.065, PLATEN_Y + 0.245, 0.065, PLATEN_Y + 0.2],
      V2(0.065, PLATEN_Y + 0.07), [0.065, PLATEN_Y + 0.05, 0.045, PLATEN_Y + 0.05]], 0.24, 0.012);
    mesh(body, M.body, h);
    mesh(new RoundedBoxGeometry(0.245, 0.014, 0.13, 2, 0.005), M.accent, h, 0, PLATEN_Y + 0.24, 0.002);
    // kính khói trên mặt trước, hộp mực bên trong
    mesh(new RoundedBoxGeometry(0.2, 0.09, 0.006, 2, 0.003), M.smoke, h, 0, PLATEN_Y + 0.16, 0.069);
    const inks = [0x00b4e8, 0xe8148a, 0xffd400, 0x111111, 0xf4f4f4, 0xd8e8ff];
    inks.forEach((c, i) => mesh(new RoundedBoxGeometry(0.026, 0.075, 0.05, 2, 0.004), P({ color: c, roughness: 0.3, clearcoat: 1, transmission: 0, metalness: 0 }), h, -0.08 + i * 0.032, PLATEN_Y + 0.16, 0.035));
    // tấm vòi phun, khe phun phát sáng nhẹ khi in
    mesh(new RoundedBoxGeometry(0.2, 0.014, 0.08, 2, 0.004), M.darkMetal, h, 0, PLATEN_Y + 0.045, 0);
    mesh(new THREE.BoxGeometry(0.17, 0.002, 0.01), this.nozzleGlow, h, 0, PLATEN_Y + 0.037, 0);
    // hai đèn UV sấy mực hai bên
    for (const sx of [-1, 1]){
      mesh(new RoundedBoxGeometry(0.05, 0.08, 0.1, 2, 0.008), M.darkMetal, h, sx * 0.15, PLATEN_Y + 0.085, 0);
      mesh(new THREE.BoxGeometry(0.036, 0.004, 0.08), this.uvMat, h, sx * 0.15, PLATEN_Y + 0.044, 0);
      for (let i = 0; i < 4; i++) mesh(new THREE.BoxGeometry(0.052, 0.003, 0.08), M.black, h, sx * 0.15, PLATEN_Y + 0.1 + i * 0.012, 0);
    }
    mesh(new THREE.SphereGeometry(0.006, 12, 8), this.headLed, h, 0.09, PLATEN_Y + 0.215, 0.066);
    const label = canvasTex(256, 64, gg => { gg.fillStyle = '#e9e6df'; gg.fillRect(0, 0, 256, 64); gg.fillStyle = '#2a2e35'; gg.font = '800 28px "Segoe UI", Arial'; gg.fillText('UV-JET 6C', 16, 40); gg.fillStyle = '#e8661c'; gg.fillRect(200, 18, 40, 26); });
    mesh(new THREE.PlaneGeometry(0.11, 0.028), new THREE.MeshStandardMaterial({ map: label, roughness: 0.5 }), h, -0.04, PLATEN_Y + 0.215, 0.067);
    g.add(h);
    this.group.add(g);
  }

  private buildCutter(){
    const M = this.M;
    // thanh ray dao cắt chạy ngang mép trước bàn in
    mesh(barX(roundedRect(0.03, 0.022, 0.004), 1.66, 0.002), M.alu, this.group, 0, CUTTER_Y + 0.03, CUT_Z + 0.02);
    const c = this.cutter;
    mesh(new RoundedBoxGeometry(0.07, 0.05, 0.05, 2, 0.01), M.accent, c, 0, CUTTER_Y + 0.01, CUT_Z + 0.02);
    this.blade = mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.003, 40).rotateX(Math.PI / 2), M.blade, c, 0, PLATEN_Y + 0.02, CUT_Z);
    mesh(new THREE.BoxGeometry(0.01, 0.05, 0.008), M.darkMetal, c, 0, CUTTER_Y - 0.02, CUT_Z);
    this.group.add(c);
  }

  /* ---------------------------------------------------------- bảng điều khiển, đèn */
  private makeScreen(){
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 340;
    const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
    return { tex, g: cv.getContext('2d')!, key: '', t: 0 };
  }
  private panel(){
    const M = this.M, p = new THREE.Group();
    p.position.set(1.22, 1.32, 0.78); p.rotation.set(-0.62, -0.42, 0, 'YXZ');
    // tay đỡ xoay
    const arm = mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.24, 16), M.steel, this.group, 1.08, 1.24, 0.72); arm.rotation.z = 0.9;
    mesh(lathe([[0, 0], [0.04, 0], [0.04, 0.03], [0.02, 0.05], [0, 0.05]], 24), M.alu, this.group, 1.0, 1.165, 0.72);
    // vỏ bảng: nhựa kỹ thuật bo cạnh, viền nhôm
    mesh(new RoundedBoxGeometry(0.46, 0.32, 0.05, 4, 0.02), M.plastic, p);
    mesh(new RoundedBoxGeometry(0.47, 0.33, 0.012, 3, 0.006), M.alu, p, 0, 0, -0.022);
    const scr = mesh(new THREE.PlaneGeometry(0.34, 0.225), new THREE.MeshStandardMaterial({ map: this.screen.tex, emissive: 0xffffff, emissiveIntensity: 1.1, roughness: 0.15, metalness: 0 }), p, -0.04, 0.02, 0.0262);
    scr.name = 'screen';
    mesh(new THREE.PlaneGeometry(0.35, 0.235), new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.08, roughness: 0.02, clearcoat: 1 }), p, -0.04, 0.02, 0.0268);
    // nút bấm, nút dừng khẩn
    const cols = [0x2ad06a, 0xffc400, 0x3a9aff];
    cols.forEach((c, i) => { const b = mesh(new THREE.CylinderGeometry(0.014, 0.016, 0.012, 24).rotateX(Math.PI / 2), led(c, 0.8), p, 0.18, 0.08 - i * 0.05, 0.03); b.name = 'btn' + i; });
    mesh(lathe([[0, 0], [0.028, 0], [0.03, 0.006], [0.026, 0.02], [0, 0.024]], 28).rotateX(Math.PI / 2), P({ color: 0xd8101a, roughness: 0.35, clearcoat: 0.8 }), p, 0.18, -0.105, 0.026);
    mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.004, 28).rotateX(Math.PI / 2), P({ color: 0xffd000, roughness: 0.5 }), p, 0.18, -0.105, 0.026);
    this.group.add(p);
  }
  private towerLight(){
    const M = this.M, t = new THREE.Group(); t.position.set(-0.95, 1.17, -1.62);
    mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.22, 12), M.steel, t, 0, 0.11, 0);
    const cols = [0xff2a2a, 0xffb000, 0x22ff66];
    cols.forEach((c, i) => {
      const m = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(c).multiplyScalar(0.35), emissive: c, emissiveIntensity: 0.05, roughness: 0.2, transmission: 0, transparent: true, opacity: 0.92, clearcoat: 1 });
      this.tower.push(m);
      mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.055, 28), m, t, 0, 0.42 - i * 0.06, 0);
      mesh(new THREE.CylinderGeometry(0.032, 0.032, 0.006, 28), M.darkMetal, t, 0, 0.42 - i * 0.06 - 0.03, 0);
    });
    mesh(new THREE.CylinderGeometry(0.026, 0.032, 0.04, 28), M.plastic, t, 0, 0.47, 0);
    mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 28), M.plastic, t, 0, 0.23, 0);
    this.group.add(t);
  }
  private tray(){
    const M = this.M;
    // khay thành phẩm trên sàn: tấm thép uốn mép, vách mica hai bên
    const z0 = 1.12, z1 = 3.25, len = z1 - z0;
    const floor = new THREE.ExtrudeGeometry(roundedRect(1.62, len, 0.04), { depth: 0.012, bevelEnabled: true, bevelSize: 0.004, bevelThickness: 0.004, bevelSegments: 2 });
    floor.rotateX(-Math.PI / 2); floor.translate(0, TRAY_Y - 0.018, (z0 + z1) / 2);
    mesh(floor, M.steel, this.group);
    for (const sx of [-1, 1]){
      mesh(new RoundedBoxGeometry(0.03, 0.05, len, 2, 0.01), M.graphite, this.group, sx * 0.81, TRAY_Y + 0.01, (z0 + z1) / 2);
      mesh(new THREE.PlaneGeometry(len, 0.14).rotateY(Math.PI / 2), M.glass, this.group, sx * 0.8, TRAY_Y + 0.1, (z0 + z1) / 2).castShadow = false;
    }
    mesh(new RoundedBoxGeometry(1.66, 0.06, 0.03, 2, 0.01), M.graphite, this.group, 0, TRAY_Y + 0.015, z1);
    // chân khay
    for (const sx of [-1, 1]) for (const z of [z0 + 0.1, z1 - 0.1]) mesh(new THREE.CylinderGeometry(0.02, 0.025, TRAY_Y - 0.02, 12), M.black, this.group, sx * 0.72, (TRAY_Y - 0.02) / 2, z);
  }
  private leds(){
    // dải LED dọc mép trong hai khung hông và chân tủ: màu đổi theo trạng thái máy
    for (const sx of [-1, 1]){
      const m = led(0x5ad8ff, 2.2); this.ledStrip.push(m);
      mesh(new THREE.BoxGeometry(0.006, 0.01, 1.9), m, this.group, sx * 0.815, 1.13, -0.05);
      const m2 = led(0x5ad8ff, 2.2); this.ledStrip.push(m2);
      mesh(new THREE.BoxGeometry(0.006, 0.01, 2.6), m2, this.group, sx * 0.985, 0.66, -0.36);
    }
    const m3 = led(0x5ad8ff, 2.2); this.ledStrip.push(m3);
    mesh(new THREE.BoxGeometry(1.6, 0.008, 0.006), m3, this.group, 0, 0.432, 0.865);
  }

  /* ---------------------------------------------------------- model .glb (tuỳ chọn) */
  private async tryGlb(){
    const o = await loadPrinterModel();
    if (!o) return;
    fitTo(o, new THREE.Vector3(2.4, 1.6, 3.2));
    const first = (k: string) => findNodes(o, k)[0];
    this.glb = { gantry: first('Gantry'), head: first('Head'), cutter: first('Cutter'), roll: first('Roll'), rollers: findNodes(o, 'Roller'), gears: findNodes(o, 'Gear') };
    // phần nào file có thì ẩn phần dựng sẵn tương ứng
    if (this.glb.gantry) this.gantry.visible = false;
    if (this.glb.cutter) this.cutter.visible = false;
    if (this.glb.roll) this.roll.visible = false;
    this.group.add(o);
  }

  /* ---------------------------------------------------------- vị trí */
  /** vị trí vòi phun trong không gian cảnh */
  nozzle(out = new THREE.Vector3()){ return out.set(this.headX, PLATEN_Y + 0.04, this.gantryZ).applyMatrix4(this.group.matrixWorld); }
  headPos(out = new THREE.Vector3()){ return out.set(this.headX, PLATEN_Y + 0.14, this.gantryZ).applyMatrix4(this.group.matrixWorld); }
  consume(len: number){ const r = Math.sqrt(Math.max(0.09 ** 2, this.rollR ** 2 - len * 0.00008 / Math.PI)); this.setRollRadius(r < 0.095 ? ROLL.r : r); }

  setMode(m: PrinterMode){ this.mode = m; }

  update(dt: number, t: number, beat = 0){
    // chuyển động cơ khí suy ra từ quãng giấy đã chạy và vị trí đầu in (không tự quay vô cớ)
    const dF = this.feed - this.lastFeed, dG = this.gantryZ - this.lastGZ, dH = this.headX - this.lastHX;
    this.lastFeed = this.feed; this.lastGZ = this.gantryZ; this.lastHX = this.headX;
    const k = 1 - Math.exp(-dt * 10);
    this.speeds.feed += (Math.abs(dF) / Math.max(dt, 1e-3) - this.speeds.feed) * k;
    this.speeds.head += (Math.abs(dH) / Math.max(dt, 1e-3) - this.speeds.head) * k;
    this.speeds.gantry += (Math.abs(dG) / Math.max(dt, 1e-3) - this.speeds.gantry) * k;
    if (dF) this.consume(dF);
    this.frontA -= dF / FRONT_ROLLER.r; this.feedA -= dF / FEED_ROLLER.r;
    for (const r of this.rollers) r.o.rotation.x = r.r === FRONT_ROLLER.r ? this.frontA : r.r < 0 ? -this.feedA * FEED_ROLLER.r / 0.02 : this.feedA;
    this.roll.rotation.x -= dF / this.rollR;
    for (const g of this.gears) g.o.rotation.x = (g.src === 'front' ? this.frontA : this.feedA) * g.k + (g.k < 0 ? Math.PI / 12 : 0);
    this.gA += dG; this.hA += dH;
    for (const p of this.pulleys) p.o.rotation[p.src === 'gantry' ? 'x' : 'y'] = (p.src === 'gantry' ? this.gA : this.hA) * p.k;
    this.gantry.position.z = this.gantryZ - HEAD_DZ;
    this.head.position.x = this.headX;
    this.cutter.position.x = this.cutterX;
    this.blade.rotation.z -= (this.cutting ? 40 : 0) * dt;
    this.updateChain();
    // file .glb: điều khiển các nút cùng tên
    if (this.glb){
      if (this.glb.gantry) this.glb.gantry.position.z = this.gantryZ;
      if (this.glb.head) this.glb.head.position.x = this.headX;
      if (this.glb.cutter) this.glb.cutter.position.x = this.cutterX;
      if (this.glb.roll) this.glb.roll.rotation.x = this.roll.rotation.x;
      for (const r of this.glb.rollers) r.rotation.x = this.frontA;
      this.glb.gears.forEach((g, i) => { g.rotation.x = this.frontA * (i % 2 ? -2.6 : 1); });
    }
    this.lights(t, beat);
    this.drawScreen(t);
  }

  private chainPos(u: number, h: number, out: { x: number; y: number; a: number }){
    const L = 2.1, r = 0.055, y0 = BEAM_Y + 0.06, fx = 1.0, xb = (fx + h - L + Math.PI * r) / 2, a = fx - xb;
    if (u < a){ out.x = fx - u; out.y = y0; out.a = 0; }
    else if (u < a + Math.PI * r){ const f = (u - a) / r; out.x = xb - r * Math.sin(f); out.y = y0 + r - r * Math.cos(f); out.a = -f; }
    else { out.x = xb + (u - a - Math.PI * r); out.y = y0 + 2 * r; out.a = -Math.PI; }
    return out;
  }
  private _cp = { x: 0, y: 0, a: 0 }; private _o = new THREE.Object3D();
  private updateChain(){
    const n = this.chain.count, L = 2.1;
    for (let i = 0; i < n; i++){
      const p = this.chainPos((i + 0.5) / n * L, this.headX, this._cp);
      this._o.position.set(p.x, p.y, -0.01); this._o.rotation.set(0, 0, p.a); this._o.updateMatrix(); this.chain.setMatrixAt(i, this._o.matrix);
    }
    this.chain.instanceMatrix.needsUpdate = true;
  }

  private col = new THREE.Color();
  private lights(t: number, beat: number){
    const m = this.mode, c = this.col;
    let k = 2.2;
    switch (m){
      case 'idle': c.setHSL(0.53, 0.8, 0.55); k = 1.4 + beat * 0.8; break;
      case 'ready': case 'print': c.set(0x2aff7a); k = 2.4; break;
      case 'cut': c.set(0xffb020); k = 2 + Math.sin(t * 18) * 1.2; break;
      case 'vip': c.setHSL((t * 0.25) % 1, 0.95, 0.55); k = 3.2; break;
      case 'legend': c.setHSL(0.03 + Math.sin(t * 3) * 0.03, 1, 0.52); k = 3.2 + Math.sin(t * 9) * 0.8; break;
      case 'done': c.set(0xffd060); k = 4; break;
    }
    for (const s of this.ledStrip){ s.emissive.copy(c); s.emissiveIntensity = k; }
    // đèn tháp: xanh khi in, vàng nhấp nháy khi cắt / chờ, đỏ chỉ sáng mờ khi máy rảnh
    const on = (i: number, v: number) => { this.tower[i].emissiveIntensity = v; };
    const blink = Math.sin(t * 8) > 0 ? 1 : 0.1;
    on(0, m === 'idle' ? 0.25 : 0.03);
    on(1, m === 'cut' ? 3.5 * blink : m === 'idle' ? 0.05 : 0.05);
    on(2, m === 'print' || m === 'ready' || m === 'vip' || m === 'legend' ? 3.5 : m === 'done' ? 3.5 * blink : 0.04);
    this.headLed.emissive.set(m === 'idle' ? 0x3aa0ff : m === 'cut' ? 0xffb020 : 0x30ff80);
    this.uvMat.emissiveIntensity = this.uv * 6; this.nozzleGlow.emissiveIntensity = this.uv * 3;
    this.uvLight.intensity = this.uv * 0.9;
  }

  private drawScreen(t: number){
    const s = this.screen, st = this.status;
    if (t - s.t < 0.25) return;
    const key = `${st.line1}|${st.line2}|${st.job}|${Math.round(st.progress * 100)}|${st.queue}|${st.printed}|${this.mode}`;
    s.t = t;
    if (key === s.key && Math.floor(t * 2) % 2 === 0) return;
    s.key = key;
    const g = s.g, W = 512, H = 340;
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0c1420'); bg.addColorStop(1, '#05080c'); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.fillStyle = '#e8661c'; g.fillRect(0, 0, W, 34);
    g.fillStyle = '#fff'; g.font = '800 20px "Segoe UI", Arial'; g.fillText('LPS-3200 UV · LIVE PRINT', 12, 24);
    g.textAlign = 'right'; g.fillText(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }), W - 12, 24); g.textAlign = 'left';
    const modeCol = this.mode === 'vip' ? '#ff5ad0' : this.mode === 'legend' ? '#ff7a3a' : this.mode === 'cut' ? '#ffb020' : this.mode === 'idle' ? '#5ad8ff' : '#2aff7a';
    g.fillStyle = modeCol; g.font = '900 38px "Segoe UI", Arial'; g.fillText(st.line1, 14, 80);
    g.fillStyle = '#c8d4e0'; g.font = '600 20px "Segoe UI", Arial'; g.fillText(st.line2.slice(0, 40), 14, 110);
    g.fillStyle = '#fff'; g.font = '700 24px "Segoe UI", "Segoe UI Emoji", Arial'; g.fillText(st.job.slice(0, 30), 14, 150);
    g.fillStyle = '#1c2a38'; g.fillRect(14, 168, W - 28, 22); g.fillStyle = modeCol; g.fillRect(14, 168, (W - 28) * Math.max(0, Math.min(1, st.progress)), 22);
    g.fillStyle = '#fff'; g.font = '700 16px Consolas, monospace'; g.fillText(`${Math.round(st.progress * 100)}%`, W / 2 - 14, 185);
    // mức mực CMYK + trắng + vecni
    const inks = ['#00b4e8', '#e8148a', '#ffd400', '#222', '#f4f4f4', '#cfe0ff'], lv = [0.82, 0.74, 0.9, 0.66, 0.58, 0.71];
    inks.forEach((c, i) => { const x = 14 + i * 44; g.fillStyle = '#1c2a38'; g.fillRect(x, 210, 30, 80); g.fillStyle = c; const h = 80 * (lv[i] - (st.printed % 50) * 0.004); g.fillRect(x, 290 - h, 30, h); });
    g.fillStyle = '#9fb0c0'; g.font = '600 16px "Segoe UI", Arial'; g.fillText('MỰC', 14, 312);
    g.fillStyle = '#fff'; g.font = '700 22px "Segoe UI", Arial';
    g.fillText(`Hàng chờ: ${st.queue}`, 290, 232); g.fillText(`Đã in: ${st.printed}`, 290, 266);
    g.fillStyle = '#9fb0c0'; g.font = '600 16px "Segoe UI", Arial'; g.fillText(`Đầu in 42°C · Đèn UV ${this.uv > 0.1 ? 'BẬT' : 'TẮT'}`, 290, 300);
    s.tex.needsUpdate = true;
  }
}
