// Mô hình 3D của từng món, dựng từ trường art trong shared/menu.mjs. Mỗi món gộp thành tối đa ba lưới (thường, vàng, trong suốt)
// để vẽ nhanh. Món trên bàn lấy từ kho có sẵn, dùng xong trả lại kho.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { MENU, itemById } from '/shared/menu.mjs';

const MATS = {
  base: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .45 }),
  gold: new THREE.MeshStandardMaterial({ color: '#f3c552', metalness: .95, roughness: .2 }),
  clear: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: .45, roughness: .05, depthWrite: false }),
  glow: new THREE.MeshStandardMaterial({ color: '#000', emissive: '#ffb347', emissiveIntensity: 4 }),
};

class Parts {
  constructor() { this.base = []; this.gold = []; this.clear = []; this.glow = []; }
  add(kind, geo, color, x = 0, y = 0, z = 0, { rx = 0, rz = 0, sx = 1, sy = 1, sz = 1 } = {}) {
    let g = geo.index ? geo.toNonIndexed() : geo;
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal'].includes(k)) g.deleteAttribute(k);
    if (kind === 'base') {   // màu tính theo tọa độ gốc của hình, trước khi dời vào chỗ
      const c = typeof color === 'function' ? null : new THREE.Color(color), n = g.attributes.position.count, arr = new Float32Array(n * 3), tmp = new THREE.Color();
      for (let i = 0; i < n; i++) { (c || color(g.attributes.position.getY(i), tmp)); const col = c || tmp; arr.set([col.r, col.g, col.b], i * 3); }
      g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    }
    g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, 0, rz)), new THREE.Vector3(sx, sy, sz)));
    this[kind].push(g);
  }
  group() {
    const out = new THREE.Group();
    for (const kind of ['base', 'gold', 'clear', 'glow']) {
      if (!this[kind].length) continue;
      const mesh = new THREE.Mesh(mergeGeometries(this[kind]), MATS[kind]);
      mesh.castShadow = kind !== 'clear';
      out.add(mesh);
    }
    return out;
  }
}

// Ly trà sữa: thân ly đổi màu theo chiều cao (trân châu dưới đáy, trà ở giữa, kem trên cùng), nắp vòm, ống hút.
function cup(P, a, x = 0, z = 0, scale = 1) {
  const s = (a.big || 1) * scale, h = .52 * s, rt = .17 * s, rb = .13 * s;
  const tea = new THREE.Color(a.c), pearl = new THREE.Color('#2b1a12'), cream = new THREE.Color(a.top === 'cream' ? '#fff5e1' : a.c).lerp(new THREE.Color('#ffffff'), .35);
  const stripe = a.stripe && new THREE.Color(a.stripe);
  const body = new THREE.CylinderGeometry(rt, rb, h, 24, 10);
  P.add('base', body, (y, out) => {
    const f = (y + h / 2) / h;
    out.copy(a.pearls && f < .22 ? pearl : f > .84 ? cream : tea);
    if (stripe && f > .25 && f < .8 && Math.sin(f * 40) > .55) out.lerp(stripe, .7);
    if (a.crystal) out.lerp(new THREE.Color('#ffffff'), .25);
  }, x, h / 2, z);
  if (a.pearls) for (let i = 0; i < 9; i++) {
    const ang = i * 2.4, r = rb * .75;
    P.add('base', new THREE.SphereGeometry(.035 * s, 8, 6), '#1a0f0a', x + Math.cos(ang) * r, .05 * s + (i % 3) * .035 * s, z + Math.sin(ang) * r);
  }
  P.add('clear', new THREE.SphereGeometry(rt * 1.02, 20, 8, 0, Math.PI * 2, 0, Math.PI / 2), null, x, h, z, { sy: .45 });
  P.add('base', new THREE.CylinderGeometry(rt * 1.04, rt * 1.04, .025 * s, 24), '#ffffff', x, h, z);
  P.add('base', new THREE.CylinderGeometry(.022 * s, .022 * s, .5 * s, 8), a.pearls ? '#2b2b33' : '#ff6f91', x + .04 * s, h + .17 * s, z, { rz: -.25 });
  const garnish = { lemon: ['#ffe066', new THREE.CylinderGeometry(.09 * s, .09 * s, .02 * s, 16), { rz: 1.2 }], peach: ['#ff9f5a', new THREE.SphereGeometry(.06 * s, 10, 8)], berry: ['#e2334f', new THREE.SphereGeometry(.06 * s, 10, 8)], leaf: ['#5fbf5a', new THREE.SphereGeometry(.07 * s, 8, 6), { sy: .3 }] }[a.top];
  if (garnish) P.add('base', garnish[1], garnish[0], x - rt * .7, h * .92, z + rt * .3, garnish[2]);
  if (a.top === 'cream') P.add('base', new THREE.SphereGeometry(rt * .9, 16, 8), '#fff7e6', x, h * .95, z, { sy: .35 });
  if (a.gold) {
    P.add('gold', new THREE.TorusGeometry(rt * .98, .012 * s, 6, 28), null, x, h * .55, z, { rx: Math.PI / 2 });
    P.add('gold', new THREE.TorusGeometry(rb * 1.02, .014 * s, 6, 28), null, x, .02 * s, z, { rx: Math.PI / 2 });
    for (let i = 0; i < 6; i++) P.add('gold', new THREE.OctahedronGeometry(.025 * s), null, x + Math.cos(i) * rt * .5, h * 1.04, z + Math.sin(i) * rt * .5);
  }
}
const plate = (P, r = .3, x = 0, z = 0) => P.add('base', new THREE.CylinderGeometry(r, r * .85, .03, 28), '#ffffff', x, .015, z);

const BUILDERS = {
  cup: (P, a) => cup(P, a),
  bowl: (P, a) => {
    P.add('base', new THREE.SphereGeometry(.16, 18, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), '#ffffff', 0, .16, 0);
    for (let i = 0; i < 10; i++) P.add('base', new THREE.SphereGeometry(.04, 8, 6), a.c, Math.cos(i * 2.4) * .08, .12 + (i % 3) * .015, Math.sin(i * 2.4) * .08);
    P.add('base', new THREE.BoxGeometry(.03, .01, .3), '#d0d4da', .1, .2, 0, { rx: .3 });
  },
  cake: (P, a) => {
    plate(P);
    P.add('base', new THREE.CylinderGeometry(.2, .2, .2, 3, 1, false, 0, Math.PI * 2), a.c, 0, .13, 0, { sx: 1.1 });
    P.add('base', new THREE.CylinderGeometry(.2, .2, .04, 3), a.top, 0, .25, 0, { sx: 1.1 });
    P.add('base', new THREE.SphereGeometry(.05, 10, 8), '#e2334f', .02, .3, 0);
  },
  puff: P => { plate(P); for (let i = 0; i < 3; i++) P.add('base', new THREE.SphereGeometry(.11, 14, 10), '#e7b56a', Math.cos(i * 2.1) * .11, .1, Math.sin(i * 2.1) * .11, { sy: .75 }); },
  combo: (P, a) => {
    P.add('base', new THREE.BoxGeometry(.95, .04, .55), '#b98454', 0, .02, 0);
    for (let i = 0; i < a.n; i++) cup(P, { c: a.c, pearls: 1, top: 'cream' }, -.3 + i * (.6 / Math.max(1, a.n - 1)), -.06, .85);
    P.add('base', new THREE.SphereGeometry(.1, 12, 8), '#f6b8c6', .32, .1, .14, { sy: .7 });
  },
  birthday: P => {
    plate(P, .42);
    P.add('base', new THREE.CylinderGeometry(.3, .3, .2, 28), '#ffd1dc', 0, .13, 0);
    P.add('base', new THREE.CylinderGeometry(.2, .2, .16, 28), '#ff8fab', 0, .31, 0);
    for (let i = 0; i < 3; i++) {
      P.add('base', new THREE.CylinderGeometry(.012, .012, .12, 6), '#7fd8ff', Math.cos(i * 2.1) * .1, .45, Math.sin(i * 2.1) * .1);
      P.add('glow', new THREE.SphereGeometry(.02, 8, 6), null, Math.cos(i * 2.1) * .1, .53, Math.sin(i * 2.1) * .1, { sy: 1.6 });
    }
  },
  tower: (P, a) => {
    for (let t = 0; t < a.tiers; t++) {
      const r = .5 - t * .09, y = t * .62;
      P.add('gold', new THREE.CylinderGeometry(r, r, .03, 32), null, 0, y + .02, 0);
      if (t) P.add('gold', new THREE.CylinderGeometry(.03, .03, .62, 8), null, 0, y - .29, 0);
      const n = Math.max(1, 7 - t * 2);
      for (let i = 0; i < n; i++) {
        const ang = i / n * Math.PI * 2, rr = n === 1 ? 0 : r * .72;
        const cp = new Parts(); cup(cp, { c: ['#c79a6b', '#f29bb0', '#8fb35a', '#a884c9'][(i + t) % 4], pearls: 1, top: 'cream' }, 0, 0, .75);
        for (const kind of ['base', 'gold', 'clear', 'glow']) for (const g of cp[kind]) { g.translate(Math.cos(ang) * rr, y + .04, Math.sin(ang) * rr); P[kind].push(g); }
      }
    }
  },
};

export function buildItem(item) {
  const P = new Parts();
  (BUILDERS[item.art.k] || BUILDERS.cup)(P, item.art);
  const g = P.group();
  g.userData.itemId = item.id;
  return g;
}

export class ItemPool {
  constructor(scene) { this.scene = scene; this.free = new Map(); this.used = new Set(); }
  get(itemId) {
    const list = this.free.get(itemId);
    const g = list?.pop() || buildItem(itemById(itemId));
    g.visible = true; g.scale.setScalar(1); g.rotation.set(0, 0, 0);
    this.scene.add(g); this.used.add(g);
    return g;
  }
  put(g) {
    if (!g || !this.used.has(g)) return;
    this.used.delete(g); this.scene.remove(g);
    const id = g.userData.itemId;
    if (!this.free.has(id)) this.free.set(id, []);
    this.free.get(id).push(g);
  }
}

// Ảnh menu chụp từ chính mô hình 3D, làm một lần khi mở trang.
export function renderThumbnails(size = 160) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setSize(size, size); renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight('#ffffff', '#b9a7c9', 2.2));
  const key = new THREE.DirectionalLight('#fff3e0', 2.4); key.position.set(2, 3, 4); scene.add(key);
  const camera = new THREE.PerspectiveCamera(30, 1, .01, 50);
  const out = new Map(), box = new THREE.Box3(), center = new THREE.Vector3(), sz = new THREE.Vector3();
  for (const item of MENU) {
    const g = buildItem(item);
    scene.add(g);
    box.setFromObject(g); box.getCenter(center); box.getSize(sz);
    const d = Math.max(sz.x, sz.y, sz.z) * 2.3;
    camera.position.set(center.x + d * .35, center.y + d * .45, center.z + d * .8);
    camera.lookAt(center);
    renderer.render(scene, camera);
    out.set(item.id, renderer.domElement.toDataURL('image/png'));
    scene.remove(g);
  }
  renderer.dispose(); renderer.forceContextLoss();
  return out;
}
