// Dựng quán 3D. Đồ tĩnh được gộp theo vật liệu thành vài lưới lớn, cả quán chỉ tốn khoảng hai chục lệnh vẽ.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { TABLES, SEATS, SHOP, ZONES, PLATFORMS } from '/shared/layout.mjs';
import { MENU } from '/shared/menu.mjs';
import { SHOP_NAME } from '/shared/brand.mjs';

const FONT = '"Baloo 2", "Be Vietnam Pro", system-ui, sans-serif';

function canvasTexture(w, h, draw, { repeat, srgb = true } = {}) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...repeat); }
  t.anisotropy = 8;
  return t;
}

const woodFloor = () => canvasTexture(512, 512, (g, w, h) => {
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    let x = -((r * 97) % 200);
    while (x < w) {
      const len = 180 + ((r * 31 + x) % 120);
      const l = 62 + ((r * 13 + Math.floor(x)) % 9);
      g.fillStyle = `hsl(28, 42%, ${l}%)`;
      g.fillRect(x, r * h / rows, len, h / rows);
      g.strokeStyle = 'rgba(90,55,30,.35)'; g.lineWidth = 2;
      g.strokeRect(x, r * h / rows, len, h / rows);
      for (let i = 0; i < 6; i++) {
        g.strokeStyle = 'rgba(120,75,40,.08)';
        g.beginPath(); const y = r * h / rows + 6 + i * 9; g.moveTo(x, y); g.bezierCurveTo(x + len / 3, y + 3, x + len * 2 / 3, y - 3, x + len, y); g.stroke();
      }
      x += len;
    }
  }
}, { repeat: [5, 6] });

const tiles = (a, b, n = 8) => canvasTexture(256, 256, (g, w) => {
  const s = w / n;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    g.fillStyle = (i + j) % 2 ? a : b; g.fillRect(i * s, j * s, s, s);
    g.strokeStyle = 'rgba(0,0,0,.12)'; g.strokeRect(i * s, j * s, s, s);
  }
});

const slats = (color, line) => canvasTexture(256, 128, (g, w, h) => {
  g.fillStyle = color; g.fillRect(0, 0, w, h);
  for (let x = 0; x < w; x += 16) { g.fillStyle = line; g.fillRect(x, 0, 3, h); }
});

export function textPanel(lines, { w = 512, h = 256, bg = '#2f4a43', fg = '#fff8e8', accent = '#ffd27a', border = '#d9a860', size = 44, title = '' } = {}) {
  return canvasTexture(w, h, (g) => {
    g.fillStyle = bg; g.beginPath(); g.roundRect(6, 6, w - 12, h - 12, 28); g.fill();
    g.lineWidth = 8; g.strokeStyle = border; g.stroke();
    let y = 24;
    if (title) {
      g.fillStyle = accent; g.font = `800 ${size * 1.1}px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'top';
      g.fillText(title, w / 2, y); y += size * 1.35;
    }
    g.font = `600 ${size * .62}px ${FONT}`; g.textAlign = 'left';
    for (const [left, right] of lines) {
      g.fillStyle = fg; g.fillText(left, 34, y);
      if (right) { g.textAlign = 'right'; g.fillStyle = accent; g.fillText(right, w - 34, y); g.textAlign = 'left'; }
      y += size * .78;
    }
  });
}

// Chữ neon tự co cho vừa biển; tên dài thì tách hai dòng ở khoảng trắng gần giữa nhất.
function neon(text, color, { w = 1024, h = 256, size = 150 } = {}) {
  return canvasTexture(w, h, (g) => {
    const fits = (lines, s) => { g.font = `800 ${s}px ${FONT}`; return lines.every(l => g.measureText(l).width <= w * .92) && lines.length * s * 1.05 <= h * .92; };
    let lines = [text], s = size;
    if (!fits(lines, s)) {
      const words = text.split(' ');
      let best = [text], diff = Infinity;
      for (let i = 1; i < words.length; i++) {
        const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
        if (Math.abs(a.length - b.length) < diff) { diff = Math.abs(a.length - b.length); best = [a, b]; }
      }
      lines = best;
      s = Math.min(size, h * .92 / (lines.length * 1.05));
    }
    while (s > 20 && !fits(lines, s)) s -= 4;
    g.font = `800 ${s}px ${FONT}`; g.textAlign = 'center'; g.textBaseline = 'middle';
    const top = h / 2 - (lines.length - 1) * s * 1.05 / 2 + 6;
    for (const [blur, fill] of [[40, color], [12, '#ffffff']]) {
      g.shadowColor = color; g.shadowBlur = blur; g.fillStyle = fill;
      lines.forEach((l, i) => g.fillText(l, w / 2, top + i * s * 1.05));
    }
  });
}

const skyline = () => canvasTexture(2048, 512, (g, w, h) => {
  const grad = g.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#2a1d4a'); grad.addColorStop(.55, '#7a4a7d'); grad.addColorStop(1, '#f39c6b');
  g.fillStyle = grad; g.fillRect(0, 0, w, h);
  for (let i = 0; i < 120; i++) { g.fillStyle = `rgba(255,255,255,${Math.random() * .7})`; g.fillRect(Math.random() * w, Math.random() * h * .4, 2, 2); }
  let x = 0;
  while (x < w) {
    const bw = 60 + Math.random() * 120, bh = 120 + Math.random() * 300;
    g.fillStyle = `hsl(${250 + Math.random() * 30}, 30%, ${14 + Math.random() * 8}%)`;
    g.fillRect(x, h - bh, bw, bh);
    for (let wy = h - bh + 14; wy < h - 10; wy += 22) for (let wx = x + 8; wx < x + bw - 10; wx += 18) {
      if (Math.random() < .45) { g.fillStyle = Math.random() < .8 ? '#ffd58a' : '#9fe7ff'; g.globalAlpha = .5 + Math.random() * .5; g.fillRect(wx, wy, 8, 11); g.globalAlpha = 1; }
    }
    x += bw + 4;
  }
});

class Builder {
  constructor() { this.parts = new Map(); }
  add(mat, geo, x = 0, y = 0, z = 0, { ry = 0, rx = 0, rz = 0, sx = 1, sy = 1, sz = 1 } = {}) {
    let g = geo.index ? geo.toNonIndexed() : geo.clone();
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
    const m = new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
    g.applyMatrix4(m);
    if (!this.parts.has(mat)) this.parts.set(mat, []);
    this.parts.get(mat).push(g);
    return this;
  }
  box(mat, w, h, d, x, y, z, o) { return this.add(mat, new THREE.BoxGeometry(w, h, d), x, y + h / 2, z, o); }
  rbox(mat, w, h, d, x, y, z, r = .06, o) { return this.add(mat, new RoundedBoxGeometry(w, h, d, 2, r), x, y + h / 2, z, o); }
  cyl(mat, rt, rb, h, x, y, z, seg = 16, o) { return this.add(mat, new THREE.CylinderGeometry(rt, rb, h, seg), x, y + h / 2, z, o); }
  ball(mat, r, x, y, z, o) { return this.add(mat, new THREE.SphereGeometry(r, 14, 10), x, y, z, o); }
  build(parent, { cast = true, receive = true } = {}) {
    for (const [mat, geos] of this.parts) {
      const mesh = new THREE.Mesh(mergeGeometries(geos), mat);
      mesh.castShadow = cast && !mat.transparent; mesh.receiveShadow = receive;
      parent.add(mesh);
    }
    this.parts.clear();
  }
}

export function buildShop(scene) {
  const S = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: .72, ...o });
  const E = (color, intensity = 2.2) => new THREE.MeshStandardMaterial({ color: '#000', emissive: color, emissiveIntensity: intensity });
  const M = {
    floor: S('#ffffff', { map: woodFloor(), roughness: .55 }), cream: S('#f7ecd9'), mint: S('#a9dcc6'), mintDark: S('#6fbfa3'), pink: S('#f6b8c6'),
    wood: S('#b98454', { roughness: .6 }), woodDark: S('#6e4529'), white: S('#fbf8f2', { roughness: .4 }), metal: S('#cdd2d8', { metalness: .85, roughness: .28 }),
    gold: S('#f1c04e', { metalness: .95, roughness: .22 }), black: S('#2a2730', { roughness: .4 }), plant: S('#5aa65a'), plantDark: S('#3e7d45'), pot: S('#d98a5f'),
    sidewalk: S('#ffffff', { map: tiles('#c9c3bb', '#bdb6ad', 10), roughness: .9 }), asphalt: S('#3a3a44', { roughness: .95 }), line: S('#f1efe6'),
    barFront: S('#ffffff', { map: slats('#9fd6c0', '#86c4ac') }), marble: S('#f3f0ec', { roughness: .25 }), velvet: S('#a3233b', { roughness: .9 }),
    purple: S('#6a3fb1', { roughness: .8 }), plum: S('#4a2d4f', { roughness: .8 }), red: S('#e2534a'), blue: S('#3d7fd6'), glass: new THREE.MeshPhysicalMaterial({ color: '#dff4ff', transparent: true, opacity: .22, roughness: .05, metalness: 0 }),
    jar: new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: .35, roughness: .1 }),
    bulb: E('#ffd59a', 3), neonPink: E('#ff5fa2', 3), neonMint: E('#5ff5d0', 2.6), screen: E('#7fd8ff', 1.4), caseLight: E('#fff2d0', 1.2),
    rugGold: S('#e9c46a'), rugPurple: S('#8f6ad1'), rugBlue: S('#7fb3e8'), rugTeal: S('#7fd1c3'), rugRed: S('#c9485b'), stripe: S('#ffffff', { map: slats('#ff9fb7', '#ffffff') }),
  };
  const b = new Builder();
  const W = SHOP.x, BACK = SHOP.back, FRONT = SHOP.front;
  const facade = new THREE.Group();     // mặt tiền chỉ hiện khi máy quay đứng ngoài phố
  const fb = new Builder();

  /* ---------------- nền, tường */
  b.box(M.floor, W * 2, .1, FRONT - BACK, 0, -.1, (FRONT + BACK) / 2);
  b.box(M.sidewalk, 60, .14, 9, 0, -.12, 19.5);
  b.box(M.asphalt, 60, .05, 14, 0, -.18, 31);
  for (let x = -28; x < 30; x += 4) b.box(M.line, 2, .02, .25, x, -.14, 31);
  b.box(M.cream, W * 2 + .8, SHOP.wallH, .4, 0, 0, BACK - .2);
  b.box(M.mint, W * 2, 1.4, .1, 0, 0, BACK + .05);
  for (const side of [-1, 1]) {
    b.box(M.cream, .4, SHOP.wallH, FRONT - BACK, side * (W + .2), 0, (FRONT + BACK) / 2);
    b.box(M.mint, .1, 1.4, FRONT - BACK, side * (W + .05), 0, (FRONT + BACK) / 2);
    for (let z = -6; z <= 10; z += 8) {   // khung tranh và kệ cây trên tường
      b.rbox(M.woodDark, .12, 2, 3, side * (W - .02), 2.6, z, .04);
      b.box(side < 0 ? M.pink : M.mint, .06, 1.7, 2.7, side * (W - .1), 2.75, z);
      b.box(M.wood, .5, .08, 2.4, side * (W - .25), 4.9, z + 4);
      for (let i = 0; i < 3; i++) b.ball(M.plant, .3, side * (W - .3), 5.25, z + 3.2 + i * .8);
    }
  }
  // tường thấp phía trước, có bồn cây; khung kính phía trên thuộc mặt tiền
  for (const side of [-1, 1]) {
    b.rbox(M.mint, W - 2.6, .9, .5, side * (W + 2.6) / 2, 0, FRONT, .08);
    for (let x = 3.4; x < W; x += 1.6) b.ball(M.plant, .42, side * x, 1.15, FRONT, { sy: .8 });
    fb.box(M.woodDark, W - 2.6, .2, .3, side * (W + 2.6) / 2, 4.3, FRONT);
    fb.add(M.glass, new THREE.PlaneGeometry(W - 2.6, 3.4), side * (W + 2.6) / 2, 2.6, FRONT);
  }
  fb.box(M.plum, W * 2 + .8, 3, .4, 0, 4.5, FRONT);
  fb.box(M.woodDark, .3, 4.5, .4, -2.6, 0, FRONT); fb.box(M.woodDark, .3, 4.5, .4, 2.6, 0, FRONT);
  // mái hiên sọc hồng: dốc ra ngoài phố, mặt sọc hướng lên trời
  fb.add(M.stripe, new THREE.PlaneGeometry(W * 2 + 2, 1.9), 0, 4.1, FRONT + .85, { rx: -Math.PI / 2 + .55 });

  /* ---------------- quầy pha chế */
  b.rbox(M.barFront, 13.2, 1.1, 1.2, -5.6, 0, -13.8, .05);
  b.rbox(M.wood, 13.5, .12, 1.45, -5.6, 1.1, -13.8, .04);
  b.rbox(M.white, 13.2, 1, .9, -5.6, 0, -16.5, .05);
  b.box(M.woodDark, 13.2, .1, .95, -5.6, 1, -16.5);
  for (const [i, x] of [-9.5, -5.5, -1.5].entries()) {
    b.rbox(M.metal, .9, 1.1, .6, x - .7, 1.1, -16.5, .1);         // máy pha
    b.cyl(M.metal, .22, .22, .7, x + .45, 1.1, -16.5, 16);           // bình ủ trà
    b.cyl(M.black, .05, .05, .4, x + .45, 1.8, -16.3, 8);
    b.box(M.screen, .5, .3, .02, x - .7, 1.8, -16.18);
    b.cyl(M.jar, .2, .2, .55, x + 1.05, 1.1, -16.4, 14);
    for (let k = 0; k < 6; k++) b.ball(M.black, .07, x + 1.0 + (k % 3) * .06 - .05, 1.18 + Math.floor(k / 3) * .1, -16.4);
    void i;
  }
  for (let k = 0; k < 7; k++) b.cyl([M.red, M.pink, M.mintDark, M.gold, M.purple][k % 5], .08, .08, .45, -12 + k * .25, 1.1, -16.75, 10);
  for (const y of [3.2, 4.4]) {
    b.box(M.wood, 12.8, .1, .5, -5.6, y, -16.75);
    for (let x = -11.6; x < .4; x += .8) b.cyl(M.jar, .17, .17, .45, x, y + .1, -16.75, 12);
  }
  for (let x = -11.6; x < .4; x += .8) {
    b.ball([M.pot, M.black, M.mintDark, M.pink][Math.abs(Math.round(x * 3)) % 4], .12, x, 3.42, -16.75);
    b.ball(M.black, .12, x, 4.62, -16.75);
  }
  // bảng menu trên tường lấy thẳng từ bảng giá
  const groups = [[0, 10], [10, 20], [20, 30]];
  for (const [i, [a, z]] of groups.entries()) {
    const tex = textPanel(MENU.slice(a, z).map(m => [m.name, `${m.coins} xu`]), { w: 512, h: 512, size: 40, title: ['Trà & Topping', 'Trà sữa & Bánh', 'Combo & VIP'][i] });
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), new THREE.MeshStandardMaterial({ map: tex, roughness: .5, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: .35 }));
    panel.position.set(-10.2 + i * 3.9, 5.1 + (i === 1 ? .2 : 0), BACK + .05);
    scene.add(panel);
  }
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(10, 2.5), new THREE.MeshBasicMaterial({ map: neon(SHOP_NAME, '#ff5fa2'), transparent: true, toneMapped: false }));
  sign.position.set(5.6, 5.4, BACK + .08);
  scene.add(sign);

  /* ---------------- thu ngân, tủ bánh */
  b.rbox(M.pink, 3.6, 1.1, 1.2, 3.6, 0, -13.8, .06);
  b.rbox(M.wood, 3.8, .12, 1.4, 3.6, 1.1, -13.8, .04);
  b.rbox(M.black, .7, .4, .5, 3.1, 1.22, -13.9, .05);
  b.box(M.screen, .6, .4, .04, 3.1, 1.65, -13.85, { rx: -.3 });
  b.cyl(M.jar, .15, .15, .3, 4.4, 1.22, -13.6, 12);
  b.rbox(M.white, 2.8, .9, 1.2, 7, 0, -13.8, .05);
  b.rbox(M.caseLight, 2.6, .05, 1, 7, 1.0, -13.8, .02);
  b.box(M.glass, 2.7, 1.2, 1.1, 7, .95, -13.8);
  b.box(M.white, 2.6, .05, 1, 7, 1.55, -13.8);
  for (let k = 0; k < 4; k++) {
    b.cyl([M.pink, M.cream, M.woodDark, M.gold][k], .2, .2, .22, 6.1 + k * .6, 1.05, -13.8, 14);
    b.cyl([M.mint, M.red, M.cream, M.pink][k], .18, .18, .2, 6.1 + k * .6, 1.6, -13.8, 14);
  }
  const counterSign = (text, x, y, z, w = 2.6, bg = '#ff8fab') => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 4), new THREE.MeshStandardMaterial({ map: textPanel([], { w: 512, h: 128, size: 70, title: text, bg, border: '#ffffff', accent: '#ffffff' }), roughness: .6 }));
    m.position.set(x, y, z); scene.add(m); return m;
  };
  counterSign('Thu ngân', 3.6, 3.3, -14.4, 2.4);
  counterSign('Bánh ngọt', 7, 3.3, -14.4, 2.4, '#e9b949');
  counterSign('Quầy pha chế', -5.6, 6.9, BACK + .06, 3.6, '#4fb393');

  /* ---------------- kho và khu nhân viên, cắt tường cho máy quay nhìn vào */
  b.box(M.cream, .2, 2.6, 5, 8.7, 0, -14.5);
  b.box(M.cream, 3.8, 2.6, .2, 10.6, 0, -14.4);
  b.box(M.cream, 3.8, 1.2, .2, 10.6, 0, -12);
  for (let k = 0; k < 5; k++) {
    b.rbox(M.wood, .9, .7, .9, 9.5 + (k % 3) * 1, (k > 2 ? .7 : 0), -16.2, .04);
  }
  b.rbox(M.cream, .9, .6, .6, 11.6, 0, -15.3, .2); b.rbox(M.cream, .9, .6, .6, 11.6, .6, -15.3, .2);
  for (let k = 0; k < 3; k++) b.rbox(M.blue, .7, 2.1, .5, 9.3 + k * .8, 0, -14.1, .03);
  b.rbox(M.wood, 2.2, .45, .5, 10.8, 0, -12.9, .04);
  counterSign('Kho nguyên liệu', 10.6, 2.95, -14.5, 3.2, '#8d6e63');
  counterSign('Khu nhân viên', 10.6, 1.7, -11.85, 3.2, '#5c7cfa');

  /* ---------------- khu VIP: bục và thảm theo khu */
  for (const [x0, x1, z0, z1, h, kind] of PLATFORMS) {
    b.rbox(kind === 'gold' ? M.gold : M.marble, x1 - x0, h, z1 - z0, (x0 + x1) / 2, 0, (z0 + z1) / 2, .04);
    if (kind === 'gold') b.box(M.velvet, x1 - x0 - .4, .02, z1 - z0 - .4, (x0 + x1) / 2, h, (z0 + z1) / 2);
  }
  const rugs = { 2: M.rugTeal, 3: M.rugBlue, 4: M.rugBlue, 5: M.rugGold, 6: M.rugTeal, 7: M.rugBlue, 8: M.rugPurple, 9: M.rugRed };
  for (const t of TABLES) if (rugs[t.zone]) b.box(rugs[t.zone], 3.6, .015, 2.9, t.x, t.y + .005, t.z - .4);

  /* ---------------- bàn ghế */
  for (const t of TABLES) {
    const vip = t.zone >= 7, outside = t.zone === 1;
    const top = t.zone === 10 ? M.gold : vip ? M.marble : outside ? M.blue : M.wood;
    b.rbox(top, 2.5, .1, 1.3, t.x, t.y + .74, t.z, .04);
    b.cyl(outside ? M.blue : M.woodDark, .07, .07, .74, t.x - .9, t.y, t.z, 8);
    b.cyl(outside ? M.blue : M.woodDark, .07, .07, .74, t.x + .9, t.y, t.z, 8);
    if (vip) b.box(M.gold, 2.5, .04, .04, t.x, t.y + .82, t.z + .66);
    if (!outside) b.ball(M.bulb, .07, t.x + .9, t.y + .9, t.z - .3);   // đèn nến nhỏ trên bàn; đèn thả sẽ che mặt khách khi quay cận
  }
  // Biển số bàn nằm trên mặt bàn, sát mép phía máy quay, để người xem bình luận "bàn 5" ngồi cùng bạn
  const plateGeo = new THREE.PlaneGeometry(1.7, .66);
  for (const t of TABLES) {
    const vip = t.zone >= 7;
    const map = canvasTexture(340, 132, (g, w, h) => {
      g.fillStyle = vip ? '#f1c04e' : '#fffaf0';
      g.beginPath(); g.roundRect(5, 5, w - 10, h - 10, 34); g.fill();
      g.lineWidth = 9; g.strokeStyle = vip ? '#8a5a00' : '#e0577f'; g.stroke();
      g.fillStyle = vip ? '#4a2a00' : '#7a1f42'; g.textBaseline = 'middle';
      g.textAlign = 'right'; g.font = '800 50px "Baloo 2", sans-serif'; g.fillText('BÀN', w * .46, h / 2 + 4);
      g.textAlign = 'left'; g.font = '800 104px "Baloo 2", sans-serif'; g.fillText(String(t.no), w * .51, h / 2 + 8);
    });
    const plate = new THREE.Mesh(plateGeo, new THREE.MeshBasicMaterial({ map, transparent: true, toneMapped: false }));
    plate.rotation.x = -Math.PI / 2;
    plate.position.set(t.x, t.y + .86, t.z + .28);
    scene.add(plate);
  }
  for (const side of [-1, 1]) for (let z = -12; z <= 12; z += 4) {   // đèn tường
    b.box(M.gold, .1, .5, .3, side * (W - .05), 3.6, z);
    b.ball(M.bulb, .18, side * (W - .3), 4, z);
  }
  for (const s of SEATS) {
    if (s.stand) continue;
    if (s.zone === 10) {
      b.rbox(M.gold, .8, .45, .7, s.x, s.y, s.z, .06);
      b.rbox(M.purple, .7, .1, .6, s.x, s.y + .45, s.z, .04);
      b.rbox(M.gold, .85, 1.7, .14, s.x, s.y + .45, s.z - .38, .06);
      b.rbox(M.purple, .62, 1.3, .06, s.x, s.y + .6, s.z - .3, .03);
      b.ball(M.gold, .1, s.x - .38, s.y + 2.2, s.z - .38); b.ball(M.gold, .1, s.x + .38, s.y + 2.2, s.z - .38);
    } else if (s.zone === 1) {
      b.cyl(s.x > 7 ? M.red : M.blue, .26, .3, .45, s.x, s.y, s.z, 12);   // ghế nhựa vỉa hè
    } else {
      const seatMat = s.zone >= 7 ? M.velvet : s.zone >= 4 ? M.pink : M.wood;
      b.rbox(seatMat, .62, .1, .58, s.x, s.y + .42, s.z, .04);
      b.cyl(M.woodDark, .04, .04, .42, s.x, s.y, s.z, 6);
      b.rbox(seatMat, .62, .7, .1, s.x, s.y + .5, s.z - .3, .04);
    }
  }
  // quầy mang đi ngoài cửa sổ trái
  b.rbox(M.wood, 9.4, .1, .6, -7.3, 1.05, 16.3, .03);
  b.box(M.mint, 9.4, 1.05, .1, -7.3, 0, 16.0);
  counterSign('Mang đi', -7.3, 2.1, 16.05, 2.4, '#4fb393').rotation.y = Math.PI;

  /* ---------------- trang trí trong quán và ngoài phố */
  for (const [x, z] of [[-11.6, -11.8], [11.6, 13.6], [-11.6, 13.6], [11.6, -10.6]]) {
    b.cyl(M.pot, .45, .35, .8, x, 0, z, 14);
    b.ball(M.plant, .8, x, 1.6, z); b.ball(M.plantDark, .6, x + .2, 2.3, z - .1);
  }
  for (const x of [-16, 16]) {   // cây và cột đèn vỉa hè
    b.cyl(M.woodDark, .18, .24, 3.2, x, 0, 17.5, 8);
    b.ball(M.plant, 1.5, x, 4, 17.5); b.ball(M.plantDark, 1.1, x + .6, 4.8, 17.2);
  }
  for (const x of [-20, 20]) {
    b.cyl(M.black, .08, .1, 5.5, x, 0, 23, 8);
    b.ball(M.bulb, .3, x, 5.6, 23);
  }
  // xe máy đậu trước quán
  const bike = (x, z, mat) => {
    b.rbox(mat, .5, .45, 1.6, x, .45, z, .2);
    b.cyl(M.black, .32, .32, .15, x, 0, z - .65, 16, { rz: Math.PI / 2 });
    b.cyl(M.black, .32, .32, .15, x, 0, z + .65, 16, { rz: Math.PI / 2 });
    b.cyl(M.metal, .03, .03, .9, x, .9, z + .65, 6, { rx: .3 });
  };
  bike(-15, 21, M.red); bike(-13.6, 21.2, M.mintDark); bike(-17.2, 20.8, M.pink);
  // dây đèn trang trí ngoài hiên
  for (let x = -12; x <= 12; x += .8) b.ball(M.bulb, .08, x, 5.2 - Math.sin((x + 12) / 24 * Math.PI) * .5, 16.4);

  b.build(scene);
  fb.build(facade);
  const front = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.2), new THREE.MeshBasicMaterial({ map: neon(SHOP_NAME, '#ff5fa2'), transparent: true, toneMapped: false }));
  front.position.set(0, 5.9, FRONT + .25);
  facade.add(front);
  scene.add(facade);

  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(160, 40), new THREE.MeshBasicMaterial({ map: skyline(), fog: false }));
  backdrop.position.set(0, 12, -46);
  scene.add(backdrop);

  return { facade, zoneNames: ZONES };
}

export function buildLights(scene, renderer, quality) {
  scene.add(new THREE.HemisphereLight('#fff1e0', '#6b5a7f', .75));
  const sun = new THREE.DirectionalLight('#ffe2c2', 1.9);
  sun.position.set(-14, 26, 22);
  sun.target.position.set(0, 0, -1);
  if (quality !== 'low') {
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -24, right: 24, top: 24, bottom: -24, near: 1, far: 80 });
    sun.shadow.bias = -0.0004; sun.shadow.normalBias = .03;
  }
  scene.add(sun, sun.target);
  const bar = new THREE.PointLight('#ffc98a', 30, 18, 1.6); bar.position.set(-5, 5, -12);
  const vip = new THREE.PointLight('#ffd76a', 26, 14, 1.6); vip.position.set(-6.7, 4.5, -9);
  const street = new THREE.PointLight('#ff9ad1', 24, 20, 1.6); street.position.set(0, 4.5, 19);
  scene.add(bar, vip, street);
  return { sun, party: [bar, vip, street] };
}
