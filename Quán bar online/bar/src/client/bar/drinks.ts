import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DRINKS, drinkOf } from '../../shared/bar.ts';
import type { Drink, DrinkKey, GlassKind } from '../../shared/bar.ts';

// Đồ uống 3D theo kích thước thật (mét): ly thuỷ tinh có thành dày, chân ly, chất lỏng màu theo lòng ly, đá viên bo góc,
// ống hút cong, lát trái cây, lá bạc hà, bọt và bong bóng khí. Không dùng DOM nên dùng được cả trong trình duyệt lẫn Node
// (tools/make-drinks.ts xuất mỗi ly ra một file .glb riêng trong public/drinks/).
// Tên các phần: glass, liquid, ice, straw, garnish, foam, bubbles (màn hình tìm theo tên để cho bong bóng sủi, đá lắc lư).

type P = [number, number];
interface GlassShape { outer: P[]; t: number; yb: number; fill: number; rim: number }
// mặt ngoài ly từ đáy lên miệng (bán kính, độ cao); yb: đáy lòng ly; fill: mặt nước; rim: độ cao miệng
const SHAPES: Record<GlassKind, GlassShape> = {
  highball:  { outer: [[0.031, 0], [0.032, 0.003], [0.033, 0.012], [0.0355, 0.15]], t: 0.0022, yb: 0.013, fill: 0.128, rim: 0.15 },
  tumbler:   { outer: [[0.039, 0], [0.040, 0.003], [0.040, 0.016], [0.043, 0.092]], t: 0.0026, yb: 0.017, fill: 0.072, rim: 0.092 },
  mason:     { outer: [[0.034, 0], [0.036, 0.004], [0.038, 0.02], [0.038, 0.11], [0.034, 0.122], [0.034, 0.135]], t: 0.0024, yb: 0.01, fill: 0.112, rim: 0.135 },
  hurricane: { outer: [[0.03, 0], [0.03, 0.006], [0.012, 0.018], [0.012, 0.04], [0.034, 0.075], [0.036, 0.11], [0.026, 0.15], [0.029, 0.19], [0.037, 0.215]], t: 0.002, yb: 0.045, fill: 0.185, rim: 0.215 },
  martini:   { outer: [[0.035, 0], [0.035, 0.003], [0.004, 0.009], [0.0035, 0.1], [0.008, 0.106], [0.058, 0.16]], t: 0.0018, yb: 0.106, fill: 0.152, rim: 0.16 },
  coupe:     { outer: [[0.036, 0], [0.036, 0.003], [0.0045, 0.01], [0.004, 0.09], [0.016, 0.095], [0.04, 0.108], [0.05, 0.125], [0.052, 0.135]], t: 0.0018, yb: 0.094, fill: 0.126, rim: 0.135 },
  flute:     { outer: [[0.032, 0], [0.032, 0.003], [0.0035, 0.01], [0.003, 0.085], [0.012, 0.095], [0.025, 0.14], [0.026, 0.19], [0.0235, 0.24]], t: 0.0015, yb: 0.094, fill: 0.215, rim: 0.24 },
  copper:    { outer: [[0.038, 0], [0.04, 0.004], [0.043, 0.05], [0.042, 0.1]], t: 0.0025, yb: 0.006, fill: 0.085, rim: 0.1 },
  can:       { outer: [[0.026, 0], [0.033, 0.006], [0.033, 0.11], [0.028, 0.122]], t: 0.0006, yb: 0.004, fill: 0.11, rim: 0.122 },
};
// bán kính mặt ngoài tại độ cao y
function rAt(o: P[], y: number){
  if (y <= o[0][1]) return o[0][0];
  for (let i = 1; i < o.length; i++) if (y <= o[i][1]){ const [r0, y0] = o[i - 1], [r1, y1] = o[i]; return r0 + (r1 - r0) * (y - y0) / (y1 - y0 || 1); }
  return o[o.length - 1][0];
}
const lathe = (pts: P[], seg = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(Math.max(0, r), y)), seg);

// ly có thành dày thật: đi mặt ngoài lên miệng, bo miệng, đi mặt trong xuống đáy lòng ly
function glassGeometry(s: GlassShape){
  const inner = s.outer.filter(([, y]) => y > s.yb).map(([r, y]) => [r - s.t, Math.min(y, s.rim)] as P).reverse();
  const top = s.outer[s.outer.length - 1];
  const pts: P[] = [[0, 0], ...s.outer, [top[0] - s.t * 0.5, top[1] + s.t * 0.4], ...inner, [rAt(s.outer, s.yb) - s.t, s.yb], [0, s.yb]];
  const g = lathe(pts, 48);
  g.computeVertexNormals();
  return g;
}
function liquidGeometry(s: GlassShape, fill = s.fill, c1?: THREE.Color, c2?: THREE.Color){
  const ys = [s.yb + 0.0008, ...s.outer.map(p => p[1]).filter(y => y > s.yb + 0.001 && y < fill), fill];
  const pts: P[] = [[0, ys[0]], ...ys.map(y => [rAt(s.outer, y) - s.t - 0.0006, y] as P), [0, fill]];
  const g = lathe(pts, 40);
  if (c1 && c2){
    // đổi màu từ đáy lên (Tequila Sunrise): tô màu theo độ cao
    const p = g.attributes.position, col = new Float32Array(p.count * 3), c = new THREE.Color();
    for (let i = 0; i < p.count; i++){ const k = THREE.MathUtils.smoothstep(p.getY(i), s.yb, s.yb + (fill - s.yb) * 0.75); c.copy(c2).lerp(c1, k); col.set([c.r, c.g, c.b], i * 3); }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  }
  return g;
}

/* ------------------------------------------------------------ chất liệu */
const glassMat = () => new THREE.MeshPhysicalMaterial({ name: 'glass', color: 0xffffff, roughness: 0.04, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03,
  ior: 1.5, reflectivity: 0.6, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 1.4 });
const liquidMat = (d: Drink) => new THREE.MeshPhysicalMaterial({ name: 'liquid', color: d.liquid2 ? 0xffffff : d.liquid, vertexColors: !!d.liquid2, roughness: 0.08, clearcoat: 0.6,
  transparent: true, opacity: d.opacity, depthWrite: d.opacity > 0.85, emissive: d.liquid, emissiveIntensity: 0.12, envMapIntensity: 1.1 });
const iceMat = () => new THREE.MeshPhysicalMaterial({ name: 'ice', color: 0xeaf6ff, roughness: 0.12, clearcoat: 1, transparent: true, opacity: 0.55, depthWrite: false, envMapIntensity: 1.5 });
const solid = (name: string, color: number, roughness = 0.55, extra: THREE.MeshPhysicalMaterialParameters = {}) => new THREE.MeshPhysicalMaterial({ name, color, roughness, ...extra });

function mesh(g: THREE.BufferGeometry, m: THREE.Material, name: string){ const o = new THREE.Mesh(g, m); o.name = name; o.castShadow = name === 'glass' || name === 'garnish'; o.receiveShadow = true; return o; }

// lát cam, chanh: vỏ, cùi trắng, múi xếp quanh tâm
function citrusWheel(r: number, rind: number, flesh: number){
  const g = new THREE.Group(), th = 0.005;
  g.add(mesh(new THREE.CylinderGeometry(r, r, th, 32), solid('garnish', rind, 0.45, { sheen: 0.4 }), 'garnish'));
  const pith = mesh(new THREE.CylinderGeometry(r * 0.9, r * 0.9, th + 0.0006, 32), solid('garnish', 0xfff6dc, 0.7), 'garnish');
  g.add(pith);
  const fleshM = solid('garnish', flesh, 0.25, { clearcoat: 0.8, transmission: 0, emissive: flesh, emissiveIntensity: 0.08 });
  const n = 10, segs: THREE.BufferGeometry[] = [];
  for (let i = 0; i < n; i++){
    const a = (i / n) * Math.PI * 2, w = (Math.PI * 2) / n * 0.82;
    const sh = new THREE.Shape(); sh.moveTo(Math.cos(a + w / 2) * r * 0.08, Math.sin(a + w / 2) * r * 0.08);
    sh.absarc(0, 0, r * 0.84, a, a + w, false); sh.closePath();
    segs.push(new THREE.ExtrudeGeometry(sh, { depth: th + 0.0012, bevelEnabled: false }).translate(0, 0, -(th + 0.0012) / 2).rotateX(Math.PI / 2));
  }
  g.add(mesh(mergeGeometries(segs), fleshM, 'garnish'));
  return g;
}
function strawberry(){
  const g = new THREE.Group();
  const body = lathe([[0, 0], [0.006, 0.003], [0.011, 0.012], [0.0125, 0.02], [0.011, 0.026], [0.005, 0.029], [0, 0.0295]], 20);
  g.add(mesh(body, solid('garnish', 0xd41430, 0.3, { clearcoat: 1, clearcoatRoughness: 0.2 }), 'garnish'));
  // hạt li ti
  const seeds: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 40; i++){ const y = 0.004 + Math.random() * 0.022, a = i * 2.4, r = rAt([[0, 0], [0.006, 0.003], [0.011, 0.012], [0.0125, 0.02], [0.011, 0.026], [0.005, 0.029]], y) + 0.0003; seeds.push(new THREE.SphereGeometry(0.0007, 4, 3).translate(Math.cos(a) * r, y, Math.sin(a) * r)); }
  g.add(mesh(mergeGeometries(seeds), solid('garnish', 0xf2d06b, 0.4), 'garnish'));
  const leaves: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2; leaves.push(new THREE.ConeGeometry(0.003, 0.012, 4).rotateZ(Math.PI / 2 + 0.4).translate(0.006, 0.029, 0).rotateY(a)); }
  g.add(mesh(mergeGeometries(leaves), solid('garnish', 0x2f8a2a, 0.6), 'garnish'));
  return g;
}
function cherry(){
  const g = new THREE.Group();
  g.add(mesh(new THREE.SphereGeometry(0.009, 20, 14), solid('garnish', 0xa3001e, 0.15, { clearcoat: 1 }), 'garnish'));
  const stem = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.008, 0), new THREE.Vector3(0.004, 0.022, 0), new THREE.Vector3(0.012, 0.034, 0)]), 8, 0.0008, 5);
  g.add(mesh(stem, solid('garnish', 0x5a7a20, 0.6), 'garnish'));
  return g;
}
function leaf(len: number){
  const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.quadraticCurveTo(len * 0.45, len * 0.32, len, 0); sh.quadraticCurveTo(len * 0.45, -len * 0.32, 0, 0);
  const g = new THREE.ShapeGeometry(sh, 6), p = g.attributes.position;
  for (let i = 0; i < p.count; i++){ const x = p.getX(i), y = p.getY(i); p.setZ(i, -((x / len) ** 2) * len * 0.25 + Math.abs(y) * 0.4); }
  g.computeVertexNormals();
  return g;
}
function mint(n = 6){
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < n; i++) parts.push(leaf(0.022 + (i % 3) * 0.004).rotateZ(0.6 + (i % 2) * 0.5).rotateY(i * 2.3).translate(0, i * 0.002, 0));
  const g = new THREE.Group();
  g.add(mesh(mergeGeometries(parts), solid('garnish', 0x3fae3a, 0.45, { side: THREE.DoubleSide, sheen: 0.6, sheenColor: new THREE.Color(0x9fe08a) }), 'garnish'));
  return g;
}
function pineapple(){
  const sh = new THREE.Shape(); sh.moveTo(0, 0); sh.lineTo(0.03, 0.012); sh.lineTo(0.03, -0.012); sh.closePath();
  const g = new THREE.Group();
  g.add(mesh(new THREE.ExtrudeGeometry(sh, { depth: 0.008, bevelEnabled: true, bevelSize: 0.0012, bevelThickness: 0.0012, bevelSegments: 2 }).translate(0, 0, -0.004), solid('garnish', 0xf7cf3a, 0.35, { clearcoat: 0.6 }), 'garnish'));
  g.add(mesh(new THREE.BoxGeometry(0.004, 0.026, 0.009).translate(0.031, 0, 0), solid('garnish', 0x9b7a2a, 0.8), 'garnish'));
  const leaves = mergeGeometries([0, 1, 2].map(i => leaf(0.03).rotateZ(Math.PI / 2 + (i - 1) * 0.35).translate(0.031, 0.01, (i - 1) * 0.002)));
  g.add(mesh(leaves, solid('garnish', 0x2f7a2a, 0.5, { side: THREE.DoubleSide }), 'garnish'));
  return g;
}
function peachSlices(){
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 3; i++){
    const sh = new THREE.Shape(); sh.absarc(0, 0, 0.024, 0.2, Math.PI - 0.2, false); sh.absarc(0, 0.016, 0.018, Math.PI - 0.5, 0.5, true);
    parts.push(new THREE.ExtrudeGeometry(sh, { depth: 0.006, bevelEnabled: true, bevelSize: 0.001, bevelThickness: 0.001, bevelSegments: 1 }).rotateY(i * 2.1).rotateX(0.3 * i).translate(0, i * 0.022, 0));
  }
  const g = new THREE.Group();
  g.add(mesh(mergeGeometries(parts), solid('garnish', 0xffa070, 0.35, { clearcoat: 0.7, emissive: 0xff7a40, emissiveIntensity: 0.06 }), 'garnish'));
  return g;
}

// Một ly đồ uống hoàn chỉnh, đáy ly ở gốc toạ độ. Dựng từ số liệu trong shared/bar.ts.
export function buildDrink(key: DrinkKey): THREE.Group {
  const d = drinkOf(key), s = SHAPES[d.glass], root = new THREE.Group();
  root.name = 'drink_' + d.key;
  const glass = mesh(glassGeometry(s), d.glass === 'copper' || d.glass === 'can' ? solid('glass', 0xc97a4a, 0.25, { metalness: 1 }) : glassMat(), 'glass');
  glass.renderOrder = 3;
  root.add(glass);
  const liquid = mesh(liquidGeometry(s, s.fill, d.liquid2 ? new THREE.Color(d.liquid) : undefined, d.liquid2 ? new THREE.Color(d.liquid2) : undefined), liquidMat(d), 'liquid');
  liquid.renderOrder = 1;
  root.add(liquid);
  const rin = (y: number) => rAt(s.outer, y) - s.t;
  // đá viên bo góc nổi gần mặt nước, xoay lệch nhau
  if (d.ice){
    const parts: THREE.BufferGeometry[] = [], size = Math.min(0.024, rin(s.fill) * 0.62);
    for (let i = 0; i < d.ice; i++){
      const y = s.fill - size * 0.45 - (i >= 3 ? size * 1.05 : 0) - (i % 2) * 0.004, a = i * 2.2 + 0.4, r = Math.max(0, rin(y) - size * 0.62) * (i % 3 === 2 ? 0.2 : 0.85);
      parts.push(new RoundedBoxGeometry(size, size * 0.9, size, 2, size * 0.18).rotateX(i * 0.7).rotateY(i * 1.3).rotateZ(i * 0.4).translate(Math.cos(a) * r, y, Math.sin(a) * r));
    }
    const ice = mesh(mergeGeometries(parts), iceMat(), 'ice'); ice.renderOrder = 2; root.add(ice);
  }
  // ống hút: cắm chéo từ đáy lên, bẻ cong trên miệng ly
  if (d.straw){
    const r0 = rin(s.yb + 0.01) * 0.5, top = s.rim + 0.06;
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(-r0 * 0.3, s.yb + 0.004, 0), new THREE.Vector3(r0 * 0.9, s.rim - 0.01, 0.004), new THREE.Vector3(r0 * 1.15, top - 0.018, 0.006), new THREE.Vector3(r0 * 1.15 + 0.012, top, 0.006)]);
    root.add(mesh(new THREE.TubeGeometry(curve, 24, 0.0032, 10, false), solid('straw', d.straw, 0.35, { clearcoat: 0.5 }), 'straw'));
  }
  // trang trí
  const rimR = rAt(s.outer, s.rim);
  let gar: THREE.Object3D | null = null;
  switch (d.garnish){
    case 'orange': gar = citrusWheel(0.028, 0xf07a10, 0xffa020); break;
    case 'lemon': gar = citrusWheel(0.024, 0xf2e020, 0xfff27a); break;
    case 'lime': gar = citrusWheel(0.022, 0x4aa020, 0xb8e05a); break;
    case 'strawberry': gar = strawberry(); break;
    case 'cherry': gar = cherry(); break;
    case 'pineapple': gar = pineapple(); break;
    case 'mint': {
      // lá bạc hà nổi trên mặt và vài lá chìm trong ly, kèm lát chanh xanh
      const top = mint(7); top.position.set(-rimR * 0.25, s.fill + 0.006, 0); root.add(top);
      const inside = mint(4); inside.position.set(rin(s.yb + 0.03) * 0.3, s.yb + 0.03, 0); inside.scale.setScalar(0.8); root.add(inside);
      gar = citrusWheel(0.022, 0x4aa020, 0xb8e05a);
      break;
    }
    case 'peach': { const p = peachSlices(); p.position.set(0, s.yb + 0.02, 0); root.add(p); gar = citrusWheel(0.024, 0xf07a10, 0xffa020); break; }
    case 'gold': {
      root.add(mesh(new THREE.TorusGeometry(rimR - s.t * 0.4, 0.0011, 6, 48).rotateX(Math.PI / 2).translate(0, s.rim, 0), solid('garnish', 0xffcf5a, 0.18, { metalness: 1 }), 'garnish'));
      const flakes: THREE.BufferGeometry[] = [];
      for (let i = 0; i < 18; i++){ const y = s.yb + 0.01 + Math.random() * (s.fill - s.yb - 0.015); const r = rin(y) * 0.7 * Math.random(); flakes.push(new THREE.PlaneGeometry(0.0022, 0.0018).rotateX(i).rotateY(i * 1.7).translate(Math.cos(i * 2.4) * r, y, Math.sin(i * 2.4) * r)); }
      root.add(mesh(mergeGeometries(flakes), solid('garnish', 0xffd76a, 0.15, { metalness: 1, side: THREE.DoubleSide, emissive: 0xffb020, emissiveIntensity: 0.3 }), 'garnish'));
      break;
    }
  }
  if (gar && d.garnish !== 'gold'){
    // gài lên miệng ly, nghiêng ra ngoài
    gar.rotation.set(0, 0, Math.PI / 2 - 0.25);
    if (d.garnish === 'cherry' || d.garnish === 'strawberry'){ gar.rotation.set(0, 0, -0.3); gar.position.set(rimR * 0.55, s.rim - 0.012, 0); }
    else gar.position.set(rimR + 0.002, s.rim - 0.004, 0);
    gar.rotation.y = -0.6;
    gar.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), -0.6);
    root.add(gar);
  }
  // bọt mỏng trên mặt (nước ép, cola, champagne)
  if (d.foam){
    const fr = rin(s.fill) - 0.0008;
    root.add(mesh(new THREE.CylinderGeometry(fr, fr * 0.98, 0.003, 32).translate(0, s.fill + 0.0012, 0), solid('foam', new THREE.Color(d.liquid).lerp(new THREE.Color(0xffffff), 0.75).getHex(), 0.95, { transparent: true, opacity: 0.9 }), 'foam'));
  }
  // bong bóng khí trong lòng ly (màn hình cho chúng sủi lên)
  if (d.fizz){
    const parts: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 26; i++){ const y = s.yb + 0.004 + (i / 26) * (s.fill - s.yb - 0.008), r = rin(y) * 0.75 * ((i * 0.618) % 1), a = i * 2.39; parts.push(new THREE.SphereGeometry(0.0007 + (i % 3) * 0.0003, 5, 4).translate(Math.cos(a) * r, y, Math.sin(a) * r)); }
    const b = mesh(mergeGeometries(parts), new THREE.MeshPhysicalMaterial({ name: 'bubbles', color: 0xffffff, roughness: 0.05, transparent: true, opacity: 0.7, depthWrite: false, emissive: 0xffffff, emissiveIntensity: 0.25 }), 'bubbles');
    b.userData.yb = s.yb; b.userData.fill = s.fill;
    root.add(b);
  }
  root.userData = { drink: d.key, rim: s.rim, fill: s.fill, glass: d.glass };
  return root;
}

// Dụng cụ pha chế (dựng bằng code, dùng chung trên quầy và trong tay bartender)
export function buildShaker(){
  const g = new THREE.Group(), steel = solid('steel', 0xd8dde2, 0.18, { metalness: 1 });
  g.add(mesh(lathe([[0, 0], [0.034, 0], [0.036, 0.004], [0.042, 0.17], [0.0405, 0.172]], 32), steel, 'shaker'));
  g.add(mesh(lathe([[0.04, 0.16], [0.039, 0.2], [0.03, 0.225], [0.012, 0.24], [0.012, 0.25], [0, 0.252]], 32), steel, 'shaker'));
  return g;
}
export function buildBottle(color: number, kind: 'wine' | 'spirit' | 'square' = 'spirit', label = 0xf2ead8){
  const g = new THREE.Group();
  const prof: P[] = kind === 'wine' ? [[0, 0], [0.036, 0], [0.037, 0.005], [0.037, 0.2], [0.03, 0.235], [0.013, 0.26], [0.0125, 0.31], [0.014, 0.315]]
    : kind === 'square' ? [[0, 0], [0.042, 0], [0.043, 0.005], [0.043, 0.16], [0.035, 0.18], [0.015, 0.2], [0.014, 0.24], [0.016, 0.245]]
    : [[0, 0], [0.038, 0], [0.039, 0.005], [0.04, 0.18], [0.034, 0.205], [0.016, 0.225], [0.015, 0.27], [0.017, 0.275]];
  const geo = lathe(prof, kind === 'square' ? 4 : 28);
  if (kind === 'square') geo.rotateY(Math.PI / 4);
  const top = prof[prof.length - 1];
  const glass = mesh(geo, new THREE.MeshPhysicalMaterial({ name: 'bottle', color, roughness: 0.06, clearcoat: 1, transparent: true, opacity: 0.82, emissive: color, emissiveIntensity: 0.05 }), 'bottle');
  g.add(glass);
  const lh = kind === 'wine' ? 0.09 : 0.07, ly = kind === 'wine' ? 0.06 : 0.07, lr = prof[3][0] + 0.0006;
  g.add(mesh(new THREE.CylinderGeometry(lr, lr, lh, kind === 'square' ? 4 : 28, 1, true, 0.3, 2.4).rotateY(kind === 'square' ? Math.PI / 4 : 0).translate(0, ly + lh / 2, 0), solid('label', label, 0.75, { side: THREE.DoubleSide }), 'label'));
  g.add(mesh(new THREE.CylinderGeometry(top[0] + 0.001, top[0] + 0.001, 0.02, 16).translate(0, top[1], 0), solid('cap', 0x1a1a1a, 0.4, { metalness: 0.6 }), 'cap'));
  return g;
}

export const DRINK_KEYS: DrinkKey[] = DRINKS.map(d => d.key);
export const drinkUrl = (k: DrinkKey) => `/drinks/${k}.glb`;
