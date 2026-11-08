import type { Art } from '../shared/types.ts';

// Tranh graffiti trên tường: mỗi bậc quà một bức theo đúng chủ đề món quà, dựng ra canvas phụ 1800×1100 rồi game
// cắt sát, phóng vừa kín mảng tường. Mọi chi tiết ngẫu nhiên theo seed nên tải lại trang vẽ ra giống hệt.
// Chung cho mọi bức: nền sơn xịt có viền mực và vệt sơn chảy, huy hiệu ảnh đại diện kiểu hạt cườm phát sáng,
// tên chữ 3D nổi khối có viền trắng + bóng loáng, ruy-băng, nhãn món quà, lấp lánh.
export const rngOf = (seed: number) => { let s = seed >>> 0 || 1; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; };
type G = CanvasRenderingContext2D;
const TAU = Math.PI * 2, INK = '#0d0d14';
const mk = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; };
// nhận cả '#rrggbb' lẫn 'rgb(r,g,b)'
const rgb = (c: string) => { if (c.startsWith('rgb')) return c.replace(/[^0-9,]/g, '').split(',').slice(0, 3).map(Number); const n = parseInt(c.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
const shade = (hex: string, k: number) => { const f = (v: number) => Math.max(0, Math.min(255, Math.round(k > 0 ? v + (255 - v) * k : v * (1 + k)))); const [r, g, b] = rgb(hex); return `rgb(${f(r)},${f(g)},${f(b)})`; };
const alpha = (hex: string, a: number) => { const [r, g, b] = rgb(hex); return `rgba(${r},${g},${b},${a})`; };
const RAINBOW = ['#ff2d55', '#ff8a1f', '#ffd60a', '#3ddc5a', '#1fa2ff', '#a35bff', '#ff4fc3'];
const GOLD = ['#fff6c8', '#ffd860', '#e9a92c', '#a8651a', '#5c330a'];
const W0 = 1800, H0 = 1500, CX = 900, CY = 470, R = 210;      // khung cao dư, vẽ dịch xuống để cánh / hào quang không bị cắt      // khung dựng chung, tâm huy hiệu, bán kính ảnh đại diện

/* ------------------------------------------------------------ nét cơ bản */
function starPath(g: G, x: number, y: number, r1: number, r2: number, n: number, rot = -Math.PI / 2) {
  g.beginPath(); for (let i = 0; i < n * 2; i++) { const r = i % 2 ? r2 : r1, a = rot + i * Math.PI / n; g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); } g.closePath();
}
function heartPath(g: G, x: number, y: number, s: number) {
  g.beginPath();
  for (let i = 0; i <= 90; i++) { const t = i / 90 * TAU; g.lineTo(x + 16 * Math.pow(Math.sin(t), 3) * s, y - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s); }
  g.closePath();
}
// tô có viền mực dày + bóng đổ, kiểu tranh graffiti
function inked(g: G, path: () => void, fill: string | CanvasGradient, ink: number, shadow = true) {
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
  if (shadow) { g.save(); g.translate(ink * 0.7, ink * 0.9); path(); g.fillStyle = 'rgba(0,0,0,.38)'; g.fill(); g.lineWidth = ink; g.strokeStyle = 'rgba(0,0,0,.38)'; g.stroke(); g.restore(); }
  path(); g.lineWidth = ink; g.strokeStyle = INK; g.stroke(); g.fillStyle = fill; g.fill();
  g.restore();
}
// vệt bóng loáng phía trên một hình
function gloss(g: G, path: () => void, x0: number, y0: number, y1: number, a = 0.45) {
  g.save(); path(); g.clip();
  const gr = g.createLinearGradient(0, y0, 0, y1); gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(x0 - 2000, y0, 4000, y1 - y0); g.restore();
}
function glint(g: G, x: number, y: number, s: number, col = '#ffffff') {
  g.save(); g.fillStyle = col; g.shadowColor = col; g.shadowBlur = s * 1.2;
  starPath(g, x, y, s, s * 0.16, 4, 0); g.fill();
  g.globalAlpha = 0.6; starPath(g, x, y, s * 0.55, s * 0.1, 4, Math.PI / 4); g.fill(); g.restore();
}
function speckle(g: G, rnd: () => number, x: number, y: number, r: number, col: string, n: number) {
  g.save(); g.fillStyle = col;
  for (let i = 0; i < n; i++) { const a = rnd() * TAU, d = r * Math.sqrt(rnd()); g.globalAlpha = 0.25 + rnd() * 0.6; g.beginPath(); g.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, 1.5 + rnd() * 5, 0, TAU); g.fill(); }
  g.restore();
}
function drip(g: G, x: number, y: number, w: number, len: number, col: string) {
  g.save(); g.fillStyle = col; g.strokeStyle = INK; g.lineWidth = w * 0.22;
  g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x - w / 2, y + len); g.arc(x, y + len, w / 2, Math.PI, 0, true); g.lineTo(x + w / 2, y); g.closePath(); g.stroke(); g.fill();
  g.beginPath(); g.arc(x, y + len + w * 0.35, w * 0.62, 0, TAU); g.stroke(); g.fill();
  g.fillStyle = 'rgba(255,255,255,.45)'; g.fillRect(x - w * 0.28, y + w * 0.2, w * 0.16, len * 0.8);
  g.restore();
}
// tia sáng toả ra phía sau
function rays(g: G, x: number, y: number, r: number, cols: string[], n = 28, a = 0.5) {
  g.save(); g.globalAlpha = a;
  for (let i = 0; i < n; i++) {
    const a0 = i / n * TAU, a1 = a0 + TAU / n * 0.5, gr = g.createRadialGradient(x, y, r * 0.15, x, y, r);
    gr.addColorStop(0, cols[i % cols.length]); gr.addColorStop(1, alpha(cols[i % cols.length], 0));
    g.fillStyle = gr; g.beginPath(); g.moveTo(x, y); g.arc(x, y, r, a0, a1); g.closePath(); g.fill();
  }
  g.restore();
}

/* ------------------------------------------------------------ nền sơn xịt (đám mây sơn có viền mực, vệt chảy) */
function blob(g: G, rnd: () => number, x: number, y: number, rx: number, ry: number, colA: string, colB: string, ink = 14, bumps = 20) {
  const pts: [number, number][] = [];
  for (let i = 0; i < bumps; i++) { const a = i / bumps * TAU, k = 1 + (rnd() - 0.5) * 0.22; pts.push([x + Math.cos(a) * rx * k, y + Math.sin(a) * ry * k]); }
  const path = () => { g.beginPath(); for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length], m: [number, number] = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; const cxp = p[0] + (p[0] - x) * 0.12, cyp = p[1] + (p[1] - y) * 0.12; if (i === 0) g.moveTo((pts[pts.length - 1][0] + p[0]) / 2, (pts[pts.length - 1][1] + p[1]) / 2); g.quadraticCurveTo(cxp, cyp, m[0], m[1]); } g.closePath(); };
  // quầng sơn xịt mờ quanh
  g.save(); const hal = g.createRadialGradient(x, y, Math.min(rx, ry) * 0.6, x, y, Math.max(rx, ry) * 1.3); hal.addColorStop(0, alpha(colA, 0.55)); hal.addColorStop(1, alpha(colA, 0)); g.fillStyle = hal; g.fillRect(x - rx * 1.4, y - ry * 1.4, rx * 2.8, ry * 2.8); g.restore();
  speckle(g, rnd, x, y, Math.max(rx, ry) * 1.25, colA, 260);
  // vệt chảy (vẽ trước để viền mực của mảng đè lên chân vệt)
  for (let i = 0; i < 9; i++) { const dx = (rnd() - 0.5) * rx * 1.5, yy = y + ry * Math.sqrt(Math.max(0, 1 - (dx / rx) ** 2)) * 0.9; drip(g, x + dx, yy - 20, 14 + rnd() * 16, 40 + rnd() * 160, colB); }
  const gr = g.createLinearGradient(0, y - ry, 0, y + ry); gr.addColorStop(0, shade(colA, 0.25)); gr.addColorStop(0.55, colA); gr.addColorStop(1, colB);
  inked(g, path, gr, ink);
  // viền sáng phía trong + vân sơn
  g.save(); path(); g.clip(); g.translate(-ink * 0.7, -ink * 0.7); path(); g.lineWidth = ink * 1.5; g.strokeStyle = 'rgba(255,255,255,.35)'; g.stroke(); g.restore();
  g.save(); path(); g.clip(); speckle(g, rnd, x, y, Math.max(rx, ry), 'rgba(255,255,255,.5)', 120); speckle(g, rnd, x, y, Math.max(rx, ry), 'rgba(0,0,0,.35)', 90); g.restore();
  gloss(g, path, x, y - ry, y - ry * 0.2, 0.3);
}

/* ------------------------------------------------------------ huy hiệu ảnh đại diện (hạt cườm phát sáng) */
type RingStyle = 'rainbow' | 'gold' | 'neon' | 'pearl' | 'ruby' | 'fire' | 'pink' | 'cosmic';
function ringFill(g: G, x: number, y: number, style: RingStyle): string | CanvasGradient {
  const cg = g.createConicGradient(-Math.PI / 4, x, y);
  const stops: Record<RingStyle, string[]> = {
    rainbow: RAINBOW, gold: ['#fff6c8', '#e9a92c', '#8a5410', '#ffe28a', '#b97a1d', '#fff6c8'], neon: ['#00e5ff', '#1f6bff', '#00e5ff', '#b6f6ff', '#00e5ff'],
    pearl: ['#ffffff', '#ffd6f2', '#d9f2ff', '#fff5c9', '#e6dcff', '#ffffff'], ruby: ['#ff4a5e', '#8a0020', '#ff8090', '#5a0014', '#ff4a5e'],
    fire: ['#ffe066', '#ff7a1a', '#c8102e', '#ff9a1a', '#ffe066'], pink: ['#ff9ad5', '#ff2d8a', '#ffd1ea', '#ff4fc3', '#ff9ad5'], cosmic: ['#7b5cff', '#ff4fc3', '#00e5ff', '#ffd60a', '#7b5cff'],
  };
  const s = stops[style]; s.forEach((c, i) => cg.addColorStop(i / (s.length - 1), c));
  return cg;
}
function beads(g: G, x: number, y: number, r: number, av: CanvasImageSource | null, name: string, color: string, N = 30) {
  const px = mk(N, N), pg = px.getContext('2d', { willReadFrequently: true })!;
  let ok = false;
  if (av) { try { pg.drawImage(av, 0, 0, N, N); pg.getImageData(0, 0, 1, 1); ok = true; } catch { ok = false; } }
  if (!ok) {
    const gr = pg.createLinearGradient(0, 0, N, N); gr.addColorStop(0, shade(color, 0.35)); gr.addColorStop(1, shade(color, -0.35)); pg.fillStyle = gr; pg.fillRect(0, 0, N, N);
    pg.fillStyle = '#fff'; pg.font = `900 ${N * 0.72}px "Arial Black", Arial`; pg.textAlign = 'center'; pg.textBaseline = 'middle'; pg.fillText((name.replace(/^@/, '')[0] ?? '?').toUpperCase(), N / 2, N * 0.54);
  }
  const d = pg.getImageData(0, 0, N, N).data, cell = r * 2 / N;
  g.save(); g.beginPath(); g.arc(x, y, r, 0, TAU); g.fillStyle = '#07070b'; g.fill(); g.clip();
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const bx = x - r + (i + 0.5) * cell, by = y - r + (j + 0.5) * cell; if ((bx - x) ** 2 + (by - y) ** 2 > (r + cell * 0.3) ** 2) continue;
    const k = (j * N + i) * 4; g.fillStyle = `rgb(${d[k]},${d[k + 1]},${d[k + 2]})`;
    g.beginPath(); g.arc(bx, by, cell * 0.47, 0, TAU); g.fill();
    g.fillStyle = 'rgba(255,255,255,.33)'; g.beginPath(); g.arc(bx - cell * 0.14, by - cell * 0.15, cell * 0.15, 0, TAU); g.fill();
  }
  // mặt kính bóng
  const gl = g.createLinearGradient(0, y - r, 0, y); gl.addColorStop(0, 'rgba(255,255,255,.28)'); gl.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gl; g.beginPath(); g.ellipse(x - r * 0.15, y - r * 0.45, r * 0.75, r * 0.42, -0.3, 0, TAU); g.fill();
  g.restore();
}
function medallion(g: G, x: number, y: number, r: number, av: CanvasImageSource | null, name: string, color: string, style: RingStyle, glow = color, studs = 16) {
  g.save(); g.shadowColor = glow; g.shadowBlur = r * 0.45; g.fillStyle = INK; g.beginPath(); g.arc(x, y, r * 1.32, 0, TAU); g.fill(); g.restore();
  const ring = () => { g.beginPath(); g.arc(x, y, r * 1.27, 0, TAU); };
  inked(g, ring, ringFill(g, x, y, style), r * 0.07);
  // rãnh vát trong vòng
  g.save(); g.lineWidth = r * 0.03; g.strokeStyle = 'rgba(255,255,255,.55)'; g.beginPath(); g.arc(x, y, r * 1.2, Math.PI * 1.05, Math.PI * 1.75); g.stroke();
  g.strokeStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.arc(x, y, r * 1.2, Math.PI * 0.05, Math.PI * 0.75); g.stroke(); g.restore();
  // đinh tán / đá quý quanh vòng
  for (let i = 0; i < studs; i++) {
    const a = i / studs * TAU - Math.PI / 2, sx = x + Math.cos(a) * r * 1.165, sy = y + Math.sin(a) * r * 1.165, sr = r * (i % 2 ? 0.045 : 0.06);
    const sg = g.createRadialGradient(sx - sr * 0.3, sy - sr * 0.3, 0, sx, sy, sr); sg.addColorStop(0, '#ffffff'); sg.addColorStop(0.4, i % 2 ? '#ffe9a0' : RAINBOW[(i / 2) % RAINBOW.length | 0]); sg.addColorStop(1, i % 2 ? '#9a6414' : '#202030');
    g.fillStyle = sg; g.strokeStyle = INK; g.lineWidth = r * 0.012; g.beginPath(); g.arc(sx, sy, sr, 0, TAU); g.fill(); g.stroke();
  }
  g.save(); g.beginPath(); g.arc(x, y, r * 1.075, 0, TAU); g.fillStyle = INK; g.fill(); g.restore();
  g.save(); g.lineWidth = r * 0.022; g.strokeStyle = 'rgba(255,255,255,.85)'; g.beginPath(); g.arc(x, y, r * 1.04, 0, TAU); g.stroke(); g.restore();
  beads(g, x, y, r, av, name, color);
}

/* ------------------------------------------------------------ chữ 3D nổi khối */
function title(g: G, text: string, x: number, y: number, size: number, maxW: number, cols: [string, string, string], extrude = '#2a0a3a', outline = '#ffffff') {
  const font = (s: number) => `900 ${s}px "Arial Black", Impact, "Segoe UI Black", sans-serif`;
  g.save(); g.font = font(size); let w = g.measureText(text).width; if (w > maxW) { size *= maxW / w; g.font = font(size); w = g.measureText(text).width; } g.restore();
  const pad = size * 0.7, c = mk(w + pad * 2, size * 2.1), t = c.getContext('2d')!;
  const tx = c.width / 2, ty = c.height * 0.45, depth = Math.max(4, Math.round(size * 0.14));
  t.font = font(size); t.textAlign = 'center'; t.textBaseline = 'middle'; t.lineJoin = 'round';
  // khối nổi phía sau
  t.lineWidth = size * 0.26; t.strokeStyle = INK;
  for (let i = depth; i >= 1; i--) { t.strokeText(text, tx + i * 0.75, ty + i); }
  for (let i = depth; i >= 1; i--) { t.fillStyle = i === depth ? INK : shade(extrude, -0.1 + (depth - i) / depth * 0.35); t.fillText(text, tx + i * 0.75, ty + i); }
  t.lineWidth = size * 0.26; t.strokeStyle = INK; t.strokeText(text, tx, ty);
  t.lineWidth = size * 0.13; t.strokeStyle = outline; t.strokeText(text, tx, ty);
  // ruột chữ: chuyển màu + dải bóng + vạch sáng
  const f = mk(c.width, c.height), ft = f.getContext('2d')!;
  ft.font = font(size); ft.textAlign = 'center'; ft.textBaseline = 'middle';
  const gr = ft.createLinearGradient(0, ty - size * 0.5, 0, ty + size * 0.5); gr.addColorStop(0, cols[0]); gr.addColorStop(0.5, cols[1]); gr.addColorStop(1, cols[2]);
  ft.fillStyle = gr; ft.fillText(text, tx, ty);
  ft.globalCompositeOperation = 'source-atop';
  ft.fillStyle = 'rgba(255,255,255,.42)'; ft.fillRect(0, ty - size * 0.46, c.width, size * 0.22);
  ft.fillStyle = 'rgba(0,0,0,.18)'; ft.fillRect(0, ty + size * 0.12, c.width, size * 0.4);
  ft.strokeStyle = 'rgba(255,255,255,.5)'; ft.lineWidth = size * 0.035; for (let k = -2; k < c.width / (size * 0.5); k++) { ft.beginPath(); ft.moveTo(k * size * 0.5, ty + size * 0.6); ft.lineTo(k * size * 0.5 + size * 0.5, ty - size * 0.6); if (k % 3 === 0) ft.stroke(); }
  t.drawImage(f, 0, 0);
  g.drawImage(c, x - c.width / 2, y - c.height * 0.45);
  // lấp lánh trên chữ
  glint(g, x - w / 2 + size * 0.2, y - size * 0.42, size * 0.28); glint(g, x + w / 2 - size * 0.15, y - size * 0.3, size * 0.22);
  return { w, size };
}
// ruy-băng cong có đuôi gấp, chữ tên nằm trên
function ribbon(g: G, x: number, y: number, w: number, h: number, colA: string, colB: string) {
  for (const s of [-1, 1]) {
    const tail = () => { g.beginPath(); g.moveTo(x + s * (w / 2 - h * 0.3), y + h * 0.05); g.lineTo(x + s * (w / 2 + h * 0.95), y + h * 0.05); g.lineTo(x + s * (w / 2 + h * 0.6), y + h * 0.55); g.lineTo(x + s * (w / 2 + h * 0.95), y + h * 1.05); g.lineTo(x + s * (w / 2 - h * 0.3), y + h * 1.05); g.closePath(); };
    inked(g, tail, shade(colB, -0.35), h * 0.09);
  }
  const band = () => { g.beginPath(); g.moveTo(x - w / 2, y - h / 2); g.quadraticCurveTo(x, y - h / 2 - h * 0.45, x + w / 2, y - h / 2); g.lineTo(x + w / 2, y + h / 2); g.quadraticCurveTo(x, y + h / 2 - h * 0.45, x - w / 2, y + h / 2); g.closePath(); };
  const gr = g.createLinearGradient(0, y - h, 0, y + h / 2); gr.addColorStop(0, shade(colA, 0.3)); gr.addColorStop(0.5, colA); gr.addColorStop(1, colB);
  inked(g, band, gr, h * 0.09);
  g.save(); band(); g.clip(); g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = h * 0.05; g.beginPath(); g.moveTo(x - w / 2, y - h * 0.3); g.quadraticCurveTo(x, y - h * 0.3 - h * 0.45, x + w / 2, y - h * 0.3); g.stroke(); g.restore();
}
// nhãn món quà (biểu tượng + tên quà)
function badge(g: G, x: number, y: number, label: string, col: string) {
  g.save(); g.font = '900 58px "Segoe UI Emoji","Arial Black", sans-serif'; const w = g.measureText(label).width + 90, h = 92;
  const path = () => { g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, h / 2); };
  const gr = g.createLinearGradient(0, y - h / 2, 0, y + h / 2); gr.addColorStop(0, '#2a2440'); gr.addColorStop(1, '#0f0c1c');
  g.shadowColor = col; g.shadowBlur = 30; inked(g, path, gr, 10, false); g.shadowBlur = 0;
  g.lineWidth = 6; g.strokeStyle = col; path(); g.stroke();
  g.fillStyle = '#fff'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(label, x, y + 3);
  g.restore();
}

/* ------------------------------------------------------------ đồ trang trí theo món quà */
// cánh máy vàng (kiểu huy hiệu): ba lớp lông kim loại, đinh tán, bánh răng ở vai
function mechWings(g: G, x: number, y: number, r: number, pal = GOLD, scale = 1) {
  for (const s of [-1, 1]) {
    g.save(); g.translate(x, y); g.scale(s, 1);
    const rows = [{ n: 7, len: 2.75, w: 0.22, a0: -1.0, a1: 0.5 }, { n: 6, len: 2.05, w: 0.24, a0: -0.85, a1: 0.42 }, { n: 5, len: 1.4, w: 0.26, a0: -0.65, a1: 0.35 }];
    for (const [ri, row] of rows.entries()) for (let i = 0; i < row.n; i++) {
      const a = row.a0 + (row.a1 - row.a0) * i / (row.n - 1), len = r * row.len * scale * (1 - i * 0.05), w = r * row.w;
      g.save(); g.translate(r * 0.95, -r * 0.12); g.rotate(a);
      const path = () => { g.beginPath(); g.moveTo(0, -w * 0.45); g.lineTo(len * 0.82, -w * 0.48); g.quadraticCurveTo(len * 0.97, -w * 0.3, len * 1.04, 0); g.quadraticCurveTo(len * 0.97, w * 0.3, len * 0.82, w * 0.48); g.lineTo(0, w * 0.45); g.closePath(); };
      const gr = g.createLinearGradient(0, -w / 2, 0, w / 2); gr.addColorStop(0, pal[0]); gr.addColorStop(0.35, pal[1 + (ri % 2)]); gr.addColorStop(0.75, pal[2 + (ri % 2)]); gr.addColorStop(1, pal[4]);
      inked(g, path, gr, r * 0.035, ri === 0);
      g.strokeStyle = 'rgba(80,40,0,.6)'; g.lineWidth = r * 0.014; g.beginPath(); g.moveTo(len * 0.1, 0); g.lineTo(len * 0.86, 0); g.stroke();
      g.fillStyle = '#fff3c4'; for (const rx of [0.12, 0.3]) { g.beginPath(); g.arc(len * rx, -w * 0.22, r * 0.022, 0, TAU); g.fill(); g.beginPath(); g.arc(len * rx, w * 0.22, r * 0.022, 0, TAU); g.fill(); }
      g.restore();
    }
    // bánh răng vai
    const gx = r * 0.98, gy = -r * 0.12;
    const gear = () => { g.beginPath(); for (let k = 0; k < 28; k++) { const a = k / 28 * TAU, rr = r * (k % 2 ? 0.28 : 0.35); g.lineTo(gx + Math.cos(a) * rr, gy + Math.sin(a) * rr); } g.closePath(); };
    const gg = g.createRadialGradient(gx - r * 0.1, gy - r * 0.1, 0, gx, gy, r * 0.35); gg.addColorStop(0, pal[0]); gg.addColorStop(0.6, pal[2]); gg.addColorStop(1, pal[3]);
    inked(g, gear, gg, r * 0.03);
    g.fillStyle = INK; g.beginPath(); g.arc(gx, gy, r * 0.13, 0, TAU); g.fill();
    const jg = g.createRadialGradient(gx - r * 0.03, gy - r * 0.03, 0, gx, gy, r * 0.1); jg.addColorStop(0, '#ffffff'); jg.addColorStop(0.5, '#ff3a5e'); jg.addColorStop(1, '#6a0018');
    g.fillStyle = jg; g.beginPath(); g.arc(gx, gy, r * 0.095, 0, TAU); g.fill();
    g.restore();
  }
}
// cánh thiên thần: bốn lớp lông trắng mềm, ngọn ánh bảy màu
function angelWings(g: G, x: number, y: number, r: number, rainbow = true, scale = 1) {
  for (const s of [-1, 1]) {
    g.save(); g.translate(x, y); g.scale(s, 1);
    const rows = [{ n: 9, len: 2.9, w: 0.3, a0: -1.15, a1: 0.55 }, { n: 8, len: 2.2, w: 0.3, a0: -1.0, a1: 0.45 }, { n: 7, len: 1.55, w: 0.3, a0: -0.85, a1: 0.38 }, { n: 6, len: 0.95, w: 0.32, a0: -0.7, a1: 0.3 }];
    for (const [ri, row] of rows.entries()) for (let i = 0; i < row.n; i++) {
      const a = row.a0 + (row.a1 - row.a0) * i / (row.n - 1), len = r * row.len * scale * (1 - i * 0.035), w = r * row.w;
      g.save(); g.translate(r * 0.85, -r * 0.2); g.rotate(a);
      const path = () => { g.beginPath(); g.moveTo(0, -w * 0.3); g.bezierCurveTo(len * 0.35, -w * 0.75, len * 0.85, -w * 0.55, len, 0); g.bezierCurveTo(len * 0.85, w * 0.45, len * 0.35, w * 0.6, 0, w * 0.3); g.closePath(); };
      const tip = rainbow ? RAINBOW[(i + ri * 2) % RAINBOW.length] : '#cfe3ff';
      const gr = g.createLinearGradient(0, 0, len, 0); gr.addColorStop(0, '#ffffff'); gr.addColorStop(0.55, '#f2f6ff'); gr.addColorStop(0.82, shade(tip, 0.55)); gr.addColorStop(1, tip);
      g.save(); g.shadowColor = rainbow ? tip : '#9fc8ff'; g.shadowBlur = ri === 0 ? r * 0.12 : 0; inked(g, path, gr, r * 0.022, false); g.restore();
      g.strokeStyle = 'rgba(120,130,190,.55)'; g.lineWidth = r * 0.01; g.beginPath(); g.moveTo(len * 0.05, 0); g.quadraticCurveTo(len * 0.5, -w * 0.08, len * 0.92, 0); g.stroke();
      g.restore();
    }
    g.restore();
  }
}
// cánh phượng hoàng (bích hoạ): lông lửa vàng → cam → hồng → tím, phát sáng
function phoenixWings(g: G, x: number, y: number, r: number) {
  for (const s of [-1, 1]) {
    g.save(); g.translate(x, y); g.scale(s, 1);
    for (let ri = 0; ri < 3; ri++) for (let i = 0; i < 10 - ri * 2; i++) {
      const n = 10 - ri * 2, a = -1.25 + 1.75 * i / (n - 1), len = r * (3.2 - ri * 0.75) * (1 - i * 0.03), w = r * 0.32;
      g.save(); g.translate(r * 0.9, -r * 0.2); g.rotate(a);
      const path = () => { g.beginPath(); g.moveTo(0, -w * 0.3); g.bezierCurveTo(len * 0.4, -w * 0.9, len * 0.8, -w * 0.2, len, -w * 0.6); g.bezierCurveTo(len * 0.86, w * 0.1, len * 0.4, w * 0.7, 0, w * 0.3); g.closePath(); };
      const gr = g.createLinearGradient(0, 0, len, 0); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.35, '#ffc23a'); gr.addColorStop(0.6, '#ff6a1a'); gr.addColorStop(0.82, '#ff2d8a'); gr.addColorStop(1, '#8a3bff');
      g.save(); g.shadowColor = '#ff8a1f'; g.shadowBlur = r * 0.18; inked(g, path, gr, r * 0.025, false); g.restore();
      g.restore();
    }
    g.restore();
  }
}
// cánh rồng: xương ngà, màng đỏ thẫm → tím, vuốt
function dragonWings(g: G, x: number, y: number, r: number) {
  for (const s of [-1, 1]) {
    g.save(); g.translate(x + 0, y); g.scale(s, 1); g.translate(r * 0.9, -r * 0.3);
    const bones = [-1.05, -0.55, -0.05, 0.42].map((a, i) => ({ a, len: r * (2.7 - i * 0.38) }));
    const tip = (b: { a: number; len: number }) => [Math.cos(b.a) * b.len, Math.sin(b.a) * b.len] as const;
    const mem = () => { g.beginPath(); g.moveTo(0, 0); bones.forEach((b, i) => { const [ex, ey] = tip(b); g.lineTo(ex, ey); if (i < bones.length - 1) { const [nx, ny] = tip(bones[i + 1]); g.quadraticCurveTo((ex + nx) * 0.32, (ey + ny) * 0.32, nx, ny); } }); g.quadraticCurveTo(r * 0.6, r * 0.9, r * 0.1, r * 0.6); g.closePath(); };
    const gr = g.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 2.8); gr.addColorStop(0, '#ff8a3a'); gr.addColorStop(0.35, '#ff2d4a'); gr.addColorStop(0.75, '#b0127a'); gr.addColorStop(1, '#6a1aa8');
    inked(g, mem, gr, r * 0.04);
    g.save(); mem(); g.clip(); g.strokeStyle = 'rgba(255,140,90,.35)'; g.lineWidth = r * 0.02; for (const b of bones) { const [ex, ey] = tip(b); for (let k = 1; k < 4; k++) { g.beginPath(); g.moveTo(ex * k / 4, ey * k / 4); g.quadraticCurveTo(ex * k / 4 + r * 0.2, ey * k / 4 + r * 0.3, ex * k / 4 + r * 0.05, ey * k / 4 + r * 0.6); g.stroke(); } } g.restore();
    for (const b of bones) {
      const [ex, ey] = tip(b);
      g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = r * 0.11; g.beginPath(); g.moveTo(0, 0); g.lineTo(ex, ey); g.stroke();
      g.strokeStyle = '#efe3c4'; g.lineWidth = r * 0.065; g.beginPath(); g.moveTo(0, 0); g.lineTo(ex, ey); g.stroke();
      const cl = () => { g.beginPath(); g.moveTo(ex, ey - r * 0.04); g.quadraticCurveTo(ex + Math.cos(b.a) * r * 0.25, ey + Math.sin(b.a) * r * 0.25 - r * 0.1, ex + Math.cos(b.a) * r * 0.3, ey + Math.sin(b.a) * r * 0.3 + r * 0.05); g.lineTo(ex, ey + r * 0.05); g.closePath(); };
      inked(g, cl, '#f8f2e0', r * 0.02, false);
    }
    g.restore();
  }
}
function crown(g: G, x: number, y: number, w: number) {
  const h = w * 0.62, path = () => { g.beginPath(); g.moveTo(x - w / 2, y); g.lineTo(x - w / 2 - w * 0.04, y - h * 0.75); g.lineTo(x - w * 0.28, y - h * 0.38); g.lineTo(x - w * 0.14, y - h * 0.95); g.lineTo(x, y - h * 0.45); g.lineTo(x + w * 0.14, y - h * 0.95); g.lineTo(x + w * 0.28, y - h * 0.38); g.lineTo(x + w / 2 + w * 0.04, y - h * 0.75); g.lineTo(x + w / 2, y); g.closePath(); };
  const gr = g.createLinearGradient(0, y - h, 0, y); gr.addColorStop(0, GOLD[0]); gr.addColorStop(0.45, GOLD[1]); gr.addColorStop(0.8, GOLD[2]); gr.addColorStop(1, GOLD[3]);
  g.save(); g.shadowColor = '#ffd60a'; g.shadowBlur = w * 0.15; inked(g, path, gr, w * 0.035); g.restore();
  const band = () => { g.beginPath(); g.roundRect(x - w * 0.53, y - h * 0.12, w * 1.06, h * 0.3, h * 0.08); };
  const bg = g.createLinearGradient(0, y - h * 0.12, 0, y + h * 0.18); bg.addColorStop(0, GOLD[1]); bg.addColorStop(1, GOLD[3]); inked(g, band, bg, w * 0.03, false);
  for (const [k, c] of [[-0.3, '#1fa2ff'], [0, '#ff2d55'], [0.3, '#3ddc5a']] as const) { const gx = x + w * k, gy = y + h * 0.03, gs = w * (k === 0 ? 0.075 : 0.055); const jg = g.createRadialGradient(gx - gs * 0.3, gy - gs * 0.3, 0, gx, gy, gs); jg.addColorStop(0, '#fff'); jg.addColorStop(0.4, c); jg.addColorStop(1, shade(c, -0.6)); g.fillStyle = jg; g.strokeStyle = INK; g.lineWidth = w * 0.012; starPath(g, gx, gy, gs, gs * 0.75, 8); g.fill(); g.stroke(); }
  for (const k of [-0.54, -0.14, 0.14, 0.54]) { const ox = x + w * k, oy = y - h * (Math.abs(k) > 0.3 ? 0.78 : 0.98); const og = g.createRadialGradient(ox - 4, oy - 4, 0, ox, oy, w * 0.05); og.addColorStop(0, '#fff'); og.addColorStop(1, '#e9a92c'); g.fillStyle = og; g.strokeStyle = INK; g.lineWidth = w * 0.012; g.beginPath(); g.arc(ox, oy, w * 0.045, 0, TAU); g.fill(); g.stroke(); }
  gloss(g, path, x, y - h, y - h * 0.4, 0.4);
}
function halo(g: G, x: number, y: number, w: number) {
  g.save(); g.shadowColor = '#fff2a0'; g.shadowBlur = w * 0.15;
  g.lineWidth = w * 0.09; g.strokeStyle = INK; g.beginPath(); g.ellipse(x, y, w / 2, w * 0.14, 0, 0, TAU); g.stroke();
  const gr = g.createLinearGradient(x - w / 2, 0, x + w / 2, 0); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(0.5, '#ffd860'); gr.addColorStop(1, '#fff6c8');
  g.lineWidth = w * 0.055; g.strokeStyle = gr; g.beginPath(); g.ellipse(x, y, w / 2, w * 0.14, 0, 0, TAU); g.stroke();
  g.restore();
}
function laurel(g: G, x: number, y: number, r: number, cols = [GOLD[0], GOLD[2], GOLD[3]]) {
  for (const s of [-1, 1]) for (let i = 0; i < 9; i++) {
    const a = Math.PI / 2 + s * (0.35 + i * 0.2), lx = x + Math.cos(a) * r, ly = y + Math.sin(a) * r * 0.95;
    g.save(); g.translate(lx, ly); g.rotate(a + s * Math.PI / 2 + s * 0.5);
    const leaf = () => { g.beginPath(); g.ellipse(0, -r * 0.09, r * 0.055, r * 0.13, 0, 0, TAU); };
    const gr = g.createLinearGradient(-r * 0.05, 0, r * 0.05, 0); gr.addColorStop(0, cols[0]); gr.addColorStop(0.6, cols[1]); gr.addColorStop(1, cols[2]);
    inked(g, leaf, gr, r * 0.016, false); g.restore();
    if (i % 2 === 0) { g.save(); g.translate(lx, ly); g.rotate(a - s * Math.PI / 2 - s * 0.3); const leaf2 = () => { g.beginPath(); g.ellipse(0, -r * 0.08, r * 0.045, r * 0.11, 0, 0, TAU); }; inked(g, leaf2, cols[1], r * 0.014, false); g.restore(); }
  }
}
function cloud(g: G, rnd: () => number, x: number, y: number, w: number) {
  const balls: [number, number, number][] = []; for (let i = 0; i < 7; i++) balls.push([x + (i / 6 - 0.5) * w, y - Math.sin(i / 6 * Math.PI) * w * 0.12 - rnd() * w * 0.05, w * (0.1 + rnd() * 0.08)]);
  const path = () => { g.beginPath(); for (const [bx, by, br] of balls) { g.moveTo(bx + br, by); g.arc(bx, by, br, 0, TAU); } g.rect(x - w / 2, y - w * 0.05, w, w * 0.12); };
  g.save(); g.lineWidth = w * 0.03; g.strokeStyle = INK; path(); g.stroke(); const gr = g.createLinearGradient(0, y - w * 0.3, 0, y + w * 0.08); gr.addColorStop(0, '#ffffff'); gr.addColorStop(1, '#bcd6ff'); g.fillStyle = gr; path(); g.fill(); g.restore();
}
function jet(g: G, x: number, y: number, s: number, rot: number, col: string) {
  g.save(); g.translate(x, y); g.rotate(rot);
  const body = () => { g.beginPath(); g.moveTo(s * 1.2, 0); g.quadraticCurveTo(s * 0.9, -s * 0.16, s * 0.2, -s * 0.16); g.lineTo(-s * 0.1, -s * 0.85); g.lineTo(-s * 0.35, -s * 0.85); g.lineTo(-s * 0.25, -s * 0.16); g.lineTo(-s * 0.75, -s * 0.12); g.lineTo(-s * 0.95, -s * 0.45); g.lineTo(-s * 1.08, -s * 0.45); g.lineTo(-s * 1.0, 0); g.lineTo(-s * 1.08, s * 0.45); g.lineTo(-s * 0.95, s * 0.45); g.lineTo(-s * 0.75, s * 0.12); g.lineTo(-s * 0.25, s * 0.16); g.lineTo(-s * 0.35, s * 0.85); g.lineTo(-s * 0.1, s * 0.85); g.lineTo(s * 0.2, s * 0.16); g.quadraticCurveTo(s * 0.9, s * 0.16, s * 1.2, 0); g.closePath(); };
  g.save(); g.shadowColor = col; g.shadowBlur = s * 0.35; const gr = g.createLinearGradient(0, -s, 0, s); gr.addColorStop(0, '#3a4258'); gr.addColorStop(0.5, '#1a1f2c'); gr.addColorStop(1, '#0b0d14'); inked(g, body, gr, s * 0.06, false); g.restore();
  g.lineWidth = s * 0.05; g.strokeStyle = col; body(); g.stroke();
  g.fillStyle = '#9fe8ff'; g.beginPath(); g.ellipse(s * 0.55, 0, s * 0.25, s * 0.08, 0, 0, TAU); g.fill();
  g.fillStyle = col; g.globalAlpha = 0.9; g.beginPath(); g.moveTo(-s * 1.0, -s * 0.1); g.lineTo(-s * 1.6, 0); g.lineTo(-s * 1.0, s * 0.1); g.fill();
  g.restore();
}
function contrail(g: G, pts: [number, number][], col: string, w: number) {
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  const path = () => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length - 1; i++) g.quadraticCurveTo(pts[i][0], pts[i][1], (pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2); g.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]); };
  g.lineWidth = w * 1.35; g.strokeStyle = INK; path(); g.stroke();
  g.shadowColor = col; g.shadowBlur = w; g.lineWidth = w; g.strokeStyle = col; path(); g.stroke();
  g.shadowBlur = 0; g.lineWidth = w * 0.3; g.strokeStyle = 'rgba(255,255,255,.85)'; path(); g.stroke();
  g.restore();
}
function bomb(g: G, x: number, y: number, r: number) {
  g.save();
  const body = () => { g.beginPath(); g.arc(x, y, r, 0, TAU); };
  const gr = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.05, x, y, r); gr.addColorStop(0, '#6a7088'); gr.addColorStop(0.5, '#23263a'); gr.addColorStop(1, '#07080c');
  inked(g, body, gr, r * 0.08);
  const cap = () => { g.beginPath(); g.roundRect(x - r * 0.28, y - r * 1.12, r * 0.56, r * 0.3, r * 0.06); };
  inked(g, cap, '#3a3f55', r * 0.06, false);
  g.lineWidth = r * 0.1; g.strokeStyle = '#8a5a2a'; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y - r * 1.12); g.quadraticCurveTo(x + r * 0.2, y - r * 1.6, x + r * 0.62, y - r * 1.5); g.stroke();
  g.fillStyle = 'rgba(255,255,255,.4)'; g.beginPath(); g.ellipse(x - r * 0.38, y - r * 0.38, r * 0.22, r * 0.12, -0.7, 0, TAU); g.fill();
  g.shadowColor = '#ffb020'; g.shadowBlur = r * 0.6; g.fillStyle = '#ffe066'; starPath(g, x + r * 0.66, y - r * 1.52, r * 0.42, r * 0.14, 9); g.fill(); g.fillStyle = '#fff'; starPath(g, x + r * 0.66, y - r * 1.52, r * 0.2, r * 0.08, 7); g.fill();
  g.restore();
}
function burst(g: G, x: number, y: number, r: number, cols: [string, string], text: string, rot = -0.15) {
  const path = () => starPath(g, x, y, r, r * 0.68, 14, rot);
  const gr = g.createRadialGradient(x, y, r * 0.2, x, y, r); gr.addColorStop(0, cols[0]); gr.addColorStop(1, cols[1]);
  inked(g, path, gr, r * 0.06);
  g.save(); g.translate(x, y); g.rotate(rot); title(g, text, 0, 0, r * 0.5, r * 1.4, ['#ffffff', '#ff4a2a', '#a00a1a'], '#3a0008'); g.restore();
}
function flames(g: G, rnd: () => number, x: number, y: number, r: number, n = 30) {
  for (const [k, cols] of [[1.0, ['#c8102e', '#ff5a1a']], [0.78, ['#ff7a1a', '#ffd23a']], [0.55, ['#ffe066', '#fffbe0']]] as const) for (let i = 0; i < n; i++) {
    const a = i / n * TAU + rnd() * 0.1, len = r * (0.55 + rnd() * 0.6) * k;
    g.save(); g.translate(x, y); g.rotate(a);
    const gr = g.createLinearGradient(r * 0.9, 0, r + len, 0); gr.addColorStop(0, cols[1]); gr.addColorStop(1, cols[0]);
    g.fillStyle = gr; g.beginPath(); g.moveTo(r * 0.9, -r * 0.16); g.bezierCurveTo(r + len * 0.4, -r * 0.2, r + len * 0.7, r * 0.12, r + len, (rnd() - 0.5) * r * 0.2); g.bezierCurveTo(r + len * 0.6, r * 0.05, r + len * 0.3, r * 0.2, r * 0.9, r * 0.16); g.closePath(); g.fill();
    g.restore();
  }
}
// rồng uốn quanh huy hiệu: thân vảy đỏ, bụng vàng, gai lưng, đầu có sừng và râu
function dragonCoil(g: G, x: number, y: number, r: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i <= 80; i++) { const t = i / 80, a = Math.PI * 0.85 + t * TAU * 1.05, rr = r * (1.62 + 0.18 * Math.sin(t * TAU * 3)); pts.push([x + Math.cos(a) * rr * 1.25, y + Math.sin(a) * rr * 0.95]); }
  const path = (from = 0, to = pts.length) => { g.beginPath(); g.moveTo(pts[from][0], pts[from][1]); for (let i = from + 1; i < to; i++) g.lineTo(pts[i][0], pts[i][1]); };
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  // gai lưng
  for (let i = 4; i < pts.length - 4; i += 3) { const [px, py] = pts[i], [qx, qy] = pts[i + 1], nx = -(qy - py), ny = qx - px, l = Math.hypot(nx, ny) || 1; const ox = px + nx / l * r * 0.2, oy = py + ny / l * r * 0.2; const sp = () => { g.beginPath(); g.moveTo(px - (qx - px) * 1.2, py - (qy - py) * 1.2); g.lineTo(ox + nx / l * r * 0.18, oy + ny / l * r * 0.18); g.lineTo(px + (qx - px) * 1.2, py + (qy - py) * 1.2); g.closePath(); }; inked(g, sp, '#ffb020', r * 0.02, false); }
  for (let i = 0; i < pts.length - 1; i++) { const k = i / pts.length, wd = r * (0.42 * (0.35 + 0.65 * Math.sin(Math.min(1, k * 1.4) * Math.PI / 2)) * (k > 0.92 ? 1 - (k - 0.92) * 6 : 1)); g.lineWidth = wd + r * 0.08; g.strokeStyle = INK; path(i, i + 2); g.stroke(); }
  for (let i = 0; i < pts.length - 1; i++) { const k = i / pts.length, wd = r * (0.42 * (0.35 + 0.65 * Math.sin(Math.min(1, k * 1.4) * Math.PI / 2)) * (k > 0.92 ? 1 - (k - 0.92) * 6 : 1)); g.lineWidth = wd; g.strokeStyle = i % 2 ? '#c8102e' : '#e0203a'; path(i, i + 2); g.stroke(); g.lineWidth = wd * 0.35; g.strokeStyle = '#ffd166'; path(i, i + 2); g.stroke(); }
  g.setLineDash([r * 0.06, r * 0.07]); g.lineWidth = r * 0.3; g.strokeStyle = 'rgba(90,0,10,.45)'; path(0, pts.length - 3); g.stroke(); g.setLineDash([]);
  // đầu rồng ở đầu thân
  const [hx, hy] = pts[0], [nx2, ny2] = pts[3], ang = Math.atan2(hy - ny2, hx - nx2);
  g.translate(hx, hy); g.rotate(ang);
  const head = () => { g.beginPath(); g.moveTo(-r * 0.2, -r * 0.3); g.quadraticCurveTo(r * 0.35, -r * 0.42, r * 0.75, -r * 0.12); g.lineTo(r * 0.8, r * 0.02); g.quadraticCurveTo(r * 0.4, r * 0.1, r * 0.55, r * 0.28); g.quadraticCurveTo(r * 0.1, r * 0.4, -r * 0.2, r * 0.25); g.closePath(); };
  const hg = g.createLinearGradient(0, -r * 0.4, 0, r * 0.4); hg.addColorStop(0, '#ff4a5e'); hg.addColorStop(1, '#8a0020'); inked(g, head, hg, r * 0.05);
  for (const s of [-1, 1]) { const horn = () => { g.beginPath(); g.moveTo(-r * 0.05, -r * 0.28 * (s > 0 ? 1 : 0.6)); g.quadraticCurveTo(-r * 0.45, -r * 0.6 - s * r * 0.08, -r * 0.7, -r * 0.55 - s * r * 0.15); g.quadraticCurveTo(-r * 0.4, -r * 0.4, -r * 0.15, -r * 0.18); g.closePath(); }; inked(g, horn, '#ffe3a0', r * 0.025, false); }
  g.fillStyle = '#ffe066'; g.strokeStyle = INK; g.lineWidth = r * 0.02; g.beginPath(); g.ellipse(r * 0.28, -r * 0.18, r * 0.09, r * 0.06, 0.2, 0, TAU); g.fill(); g.stroke(); g.fillStyle = INK; g.beginPath(); g.ellipse(r * 0.3, -r * 0.18, r * 0.025, r * 0.05, 0, 0, TAU); g.fill();
  g.strokeStyle = '#ffd166'; g.lineWidth = r * 0.03; for (const s of [-1, 1]) { g.beginPath(); g.moveTo(r * 0.7, s * r * 0.02); g.bezierCurveTo(r * 0.95, s * r * 0.3, r * 1.1, -s * r * 0.1, r * 1.35, s * r * 0.25); g.stroke(); }
  g.fillStyle = '#fff'; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(r * (0.35 + k * 0.1), r * 0.07); g.lineTo(r * (0.4 + k * 0.1), r * 0.17); g.lineTo(r * (0.45 + k * 0.1), r * 0.06); g.fill(); }
  g.restore();
}
function fireworks(g: G, rnd: () => number, x: number, y: number, r: number, col: string) {
  g.save(); g.lineCap = 'round';
  for (let i = 0; i < 18; i++) { const a = i / 18 * TAU, l = r * (0.6 + rnd() * 0.4); g.strokeStyle = col; g.lineWidth = r * 0.05; g.shadowColor = col; g.shadowBlur = r * 0.2; g.beginPath(); g.moveTo(x + Math.cos(a) * r * 0.2, y + Math.sin(a) * r * 0.2); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke(); g.fillStyle = '#fff'; g.beginPath(); g.arc(x + Math.cos(a) * l, y + Math.sin(a) * l, r * 0.04, 0, TAU); g.fill(); }
  g.restore();
}
function galaxy(g: G, rnd: () => number, x: number, y: number, rx: number, ry: number) {
  blob(g, rnd, x, y, rx, ry, '#3a1a8a', '#120830', 16, 24);
  g.save(); g.beginPath(); g.ellipse(x, y, rx * 0.92, ry * 0.9, 0, 0, TAU); g.clip();
  for (const [c, k] of [['#ff4fc3', 0.5], ['#1fa2ff', 0.45], ['#ffd60a', 0.25]] as const) { const nx = x + (rnd() - 0.5) * rx, ny = y + (rnd() - 0.5) * ry, gr = g.createRadialGradient(nx, ny, 0, nx, ny, rx * k); gr.addColorStop(0, alpha(c, 0.45)); gr.addColorStop(1, alpha(c, 0)); g.fillStyle = gr; g.fillRect(x - rx, y - ry, rx * 2, ry * 2); }
  for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(255,255,255,${0.4 + rnd() * 0.6})`; g.beginPath(); g.arc(x + (rnd() - 0.5) * rx * 2, y + (rnd() - 0.5) * ry * 2, 1 + rnd() * 3, 0, TAU); g.fill(); }
  g.restore();
}

/* ------------------------------------------------------------ dựng một bức theo bậc quà */
export interface Built { c: HTMLCanvasElement; x: number; y: number }     // x, y: góc trên trái trên lớp sơn (game tự căn lại cho vừa mảng)
const LABELS: Record<string, string> = { splat: '🎨 BOM SƠN', bomber: '✈️ MÁY BAY PHUN SƠN', portrait: '🖼️ CHÂN DUNG', gold: '🦅 CÁNH VÀNG', angel: '😇 CÁNH THIÊN THẦN', squad: '💖 PHI ĐỘI TRÁI TIM', dragon: '🐉 RỒNG PHUN SƠN', demon: '👑 CÁNH RỒNG VƯƠNG MIỆN', mural: '🌟 BÍCH HOẠ HUYỀN THOẠI' };
export function buildArt(a: Art, av: CanvasImageSource | null): Built | null {
  const rnd = rngOf(a.seed), name = '@' + a.name, col = a.color;
  const c = mk(W0, H0), g = c.getContext('2d')!;
  g.imageSmoothingQuality = 'high';
  g.translate(0, a.kind === 'mural' ? 300 : 190);
  const nameRibbon = (y: number, cA: string, cB: string, cols: [string, string, string], ext: string, w = 1100) => { ribbon(g, CX, y, w, 150, cA, cB); title(g, name, CX, y - 6, 112, w - 120, cols, ext); };
  switch (a.kind) {
    case 'tag': {        // bình luận / follow: chữ ký lớn trên mảng sơn, huy hiệu nhỏ bên trái
      blob(g, rnd, CX, CY + 40, 820, 300, col, shade(col, -0.45), 14, 22);
      const t = title(g, name, CX + 120, CY + 30, 220, 1180, ['#ffffff', shade(col, 0.6), shade(col, 0.1)], shade(col, -0.6));
      medallion(g, CX + 120 - t.w / 2 - 170, CY + 30, 120, av, a.name, col, 'rainbow', col, 12);
      g.save(); g.lineCap = 'round'; g.lineWidth = 34; g.strokeStyle = INK; const sw = () => { g.beginPath(); g.moveTo(CX - 520, CY + 240); g.quadraticCurveTo(CX, CY + 320, CX + 600, CY + 210); }; sw(); g.stroke(); g.lineWidth = 20; g.strokeStyle = '#ffd60a'; sw(); g.stroke(); g.restore();
      starPath(g, CX + 640, CY + 205, 46, 20, 5); g.fillStyle = '#ffd60a'; g.strokeStyle = INK; g.lineWidth = 8; g.fill(); g.stroke();
      for (let i = 0; i < 6; i++) glint(g, CX + (rnd() - 0.5) * 1500, CY - 220 + rnd() * 500, 26 + rnd() * 22);
      break;
    }
    case 'splat': {      // bom sơn: vụ nổ sơn nhiều lớp, quả bom hoạt hình, chữ BOOM
      const cols = [col, RAINBOW[(RAINBOW.indexOf(col) + 3 + 7) % 7] ?? '#1fa2ff', '#ffffff'];
      for (const [k, cc] of [[1, cols[1]], [0.82, col], [0.5, '#fff6c8']] as const) {
        const pts: [number, number][] = []; const n = 26; for (let i = 0; i < n; i++) { const an = i / n * TAU, rr = 420 * k * (i % 2 ? 0.62 + rnd() * 0.15 : 0.9 + rnd() * 0.3); pts.push([CX + Math.cos(an) * rr * 1.3, CY + Math.sin(an) * rr * 0.95]); }
        inked(g, () => { g.beginPath(); pts.forEach(([px, py], i) => i ? g.lineTo(px, py) : g.moveTo(px, py)); g.closePath(); }, cc, 14);
      }
      for (let i = 0; i < 40; i++) { const an = rnd() * TAU, d = 480 + rnd() * 260, s = 10 + rnd() * 34; g.fillStyle = rnd() < 0.5 ? col : cols[1]; g.strokeStyle = INK; g.lineWidth = 5; g.beginPath(); g.arc(CX + Math.cos(an) * d * 1.3, CY + Math.sin(an) * d * 0.75, s, 0, TAU); g.fill(); g.stroke(); }
      for (let i = 0; i < 6; i++) drip(g, CX + (rnd() - 0.5) * 700, CY + 300, 22 + rnd() * 16, 60 + rnd() * 140, col);
      bomb(g, CX - 560, CY + 170, 110);
      burst(g, CX + 560, CY - 230, 170, ['#fff36a', '#ff8a1f'], 'BOOM!');
      medallion(g, CX, CY, R * 0.95, av, a.name, col, 'rainbow', col, 14);
      nameRibbon(CY + 360, col, shade(col, -0.4), ['#ffffff', '#fff2b0', '#ffc23a'], '#3a1000');
      break;
    }
    case 'bomber': {     // máy bay phun sơn: bầu trời neon, hai chiến đấu cơ vẽ vòng khói neon
      blob(g, rnd, CX, CY + 10, 760, 400, '#1f6bff', '#0a1a5a', 14);
      g.save(); g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 6; for (let i = 0; i < 14; i++) { const yy = CY - 300 + i * 46, x0 = CX - 700 + rnd() * 200; g.beginPath(); g.moveTo(x0, yy); g.lineTo(x0 + 140 + rnd() * 220, yy); g.stroke(); } g.restore();
      contrail(g, [[CX - 760, CY + 280], [CX - 420, CY - 380], [CX + 120, CY - 420], [CX + 500, CY - 200], [CX + 690, CY - 330]], '#ff4fc3', 34);
      contrail(g, [[CX + 760, CY + 260], [CX + 420, CY + 380], [CX - 100, CY + 330], [CX - 480, CY + 120], [CX - 700, CY - 260]], '#00e5ff', 34);
      jet(g, CX + 690, CY - 330, 120, -0.55, '#ff4fc3'); jet(g, CX - 700, CY - 260, 120, -2.1, '#00e5ff');
      medallion(g, CX, CY - 10, R, av, a.name, col, 'neon', '#00e5ff', 18);
      nameRibbon(CY + 370, '#1fa2ff', '#0a2a8a', ['#ffffff', '#b6f6ff', '#00c8ff'], '#001a4a');
      for (let i = 0; i < 8; i++) glint(g, CX + (rnd() - 0.5) * 1400, CY - 300 + rnd() * 600, 22 + rnd() * 20, '#b6f6ff');
      break;
    }
    case 'portrait': {   // chân dung: tia cầu vồng, vòng nguyệt quế vàng, ruy-băng, sao
      blob(g, rnd, CX, CY + 20, 640, 420, shade(col, 0.15), shade(col, -0.5), 14);
      rays(g, CX, CY, 700, RAINBOW, 28, 0.45);
      laurel(g, CX, CY + 10, R * 1.55);
      medallion(g, CX, CY, R * 1.05, av, a.name, col, 'rainbow', '#ffffff', 16);
      for (const s of [-1, 1]) { starPath(g, CX + s * 430, CY - 230, 60, 25, 5); g.fillStyle = '#ffd60a'; g.strokeStyle = INK; g.lineWidth = 9; g.fill(); g.stroke(); }
      nameRibbon(CY + 380, '#ff2d55', '#8a0a2a', ['#ffffff', '#fff2b0', '#ffc23a'], '#3a0010');
      for (let i = 0; i < 10; i++) glint(g, CX + (rnd() - 0.5) * 1300, CY - 330 + rnd() * 640, 20 + rnd() * 22);
      break;
    }
    case 'gold': {       // cánh vàng: khiên vàng, cánh máy vàng ba lớp, nguyệt quế
      rays(g, CX, CY, 760, ['#fff2a0', '#ffd860'], 32, 0.35);
      mechWings(g, CX, CY, R * 0.95);
      const shield = () => { g.beginPath(); g.moveTo(CX - R * 1.45, CY - R * 1.3); g.lineTo(CX + R * 1.45, CY - R * 1.3); g.lineTo(CX + R * 1.4, CY + R * 0.3); g.quadraticCurveTo(CX + R * 1.1, CY + R * 1.3, CX, CY + R * 1.75); g.quadraticCurveTo(CX - R * 1.1, CY + R * 1.3, CX - R * 1.4, CY + R * 0.3); g.closePath(); };
      const sg = g.createLinearGradient(0, CY - R * 1.3, 0, CY + R * 1.7); sg.addColorStop(0, '#7a1020'); sg.addColorStop(1, '#2a0410'); inked(g, shield, sg, 16);
      g.save(); g.lineWidth = 18; g.strokeStyle = GOLD[1]; shield(); g.stroke(); g.restore();
      laurel(g, CX, CY + 20, R * 1.5);
      medallion(g, CX, CY, R, av, a.name, col, 'gold', '#ffd860', 20);
      nameRibbon(CY + 400, '#ffd860', '#a8651a', ['#ffffff', '#fff2b0', '#e9a92c'], '#4a2600');
      for (let i = 0; i < 12; i++) glint(g, CX + (rnd() - 0.5) * 1500, CY - 360 + rnd() * 700, 22 + rnd() * 26, '#fff6c8');
      break;
    }
    case 'angel': {      // cánh thiên thần: mây, tia sáng, hào quang, cánh trắng ánh cầu vồng
      rays(g, CX, CY, 820, ['#ffffff', '#fff2c0', '#d9f2ff'], 36, 0.55);
      cloud(g, rnd, CX - 520, CY + 330, 520); cloud(g, rnd, CX + 520, CY + 340, 560);
      angelWings(g, CX, CY, R);
      halo(g, CX, CY - R * 1.55, R * 1.5);
      medallion(g, CX, CY, R, av, a.name, col, 'pearl', '#ffffff', 16);
      nameRibbon(CY + 400, '#a35bff', '#4a1a9a', ['#ffffff', '#ffd6f2', '#9fd8ff'], '#200a4a');
      for (let i = 0; i < 14; i++) glint(g, CX + (rnd() - 0.5) * 1500, CY - 380 + rnd() * 720, 20 + rnd() * 26);
      break;
    }
    case 'squad': {      // phi đội trái tim: trái tim khổng lồ bóng loáng, tim nhỏ bay quanh, ba máy bay kéo vệt tim
      const big = () => heartPath(g, CX, CY + 10, 30);
      const hg = g.createLinearGradient(0, CY - 400, 0, CY + 450); hg.addColorStop(0, '#ff8ac0'); hg.addColorStop(0.5, '#ff2d6a'); hg.addColorStop(1, '#a0003a');
      g.save(); g.shadowColor = '#ff4fc3'; g.shadowBlur = 60; inked(g, big, hg, 18); g.restore();
      gloss(g, big, CX, CY - 400, CY - 60, 0.4);
      g.save(); g.lineWidth = 14; g.strokeStyle = '#ffd1ea'; heartPath(g, CX, CY + 10, 26.5); g.setLineDash([30, 22]); g.stroke(); g.restore();
      for (let i = 0; i < 16; i++) { const an = rnd() * TAU, d = 560 + rnd() * 160, hx = CX + Math.cos(an) * d * 1.15, hy = CY + Math.sin(an) * d * 0.62; const s = 2 + rnd() * 2.5; const hp = () => heartPath(g, hx, hy, s); inked(g, hp, RAINBOW[i % 7] === '#3ddc5a' ? '#ff4fc3' : RAINBOW[i % 7], 5); }
      for (const [k, jc] of [[-1, '#ff2d55'], [0, '#ff4fc3'], [1, '#1fa2ff']] as const) { const jx = CX + k * 560, jy = CY - 380 + Math.abs(k) * 70; jet(g, jx, jy, 80, k * 0.25 - 0.05, jc); for (let m = 1; m < 5; m++) { const hp = () => heartPath(g, jx - 120 * m * Math.cos(k * 0.25), jy + m * 16, 1.6); inked(g, hp, jc, 3, false); } }
      medallion(g, CX, CY - 10, R * 0.95, av, a.name, col, 'pink', '#ff4fc3', 14);
      nameRibbon(CY + 400, '#ff4fc3', '#9a0a5a', ['#ffffff', '#ffd1ea', '#ff7ac0'], '#3a0022');
      break;
    }
    case 'dragon': {     // rồng phun sơn: vòng lửa, rồng đỏ uốn quanh huy hiệu
      blob(g, rnd, CX, CY + 10, 760, 430, '#3a0a14', '#12030a', 14);
      flames(g, rnd, CX, CY, R * 1.25, 34);
      dragonCoil(g, CX, CY, R);
      medallion(g, CX, CY, R, av, a.name, col, 'fire', '#ff7a1a', 18);
      nameRibbon(CY + 410, '#ff7a1a', '#8a1a00', ['#fffbe0', '#ffd23a', '#ff5a1a'], '#3a0800');
      for (let i = 0; i < 26; i++) { g.fillStyle = rnd() < 0.5 ? '#ffd23a' : '#ff7a1a'; g.globalAlpha = 0.85; g.beginPath(); g.arc(CX + (rnd() - 0.5) * 1500, CY + (rnd() - 0.5) * 900, 4 + rnd() * 9, 0, TAU); g.fill(); g.globalAlpha = 1; }
      break;
    }
    case 'demon': {      // cánh rồng vương miện: hào quang lửa tím, cánh rồng, vương miện ngọc
      blob(g, rnd, CX, CY + 10, 780, 440, '#24062e', '#0a0210', 14);
      flames(g, rnd, CX, CY, R * 1.2, 26);
      dragonWings(g, CX, CY, R);
      medallion(g, CX, CY, R, av, a.name, col, 'ruby', '#ff3a5e', 20);
      crown(g, CX, CY - R * 1.22, R * 1.35);
      nameRibbon(CY + 410, '#c8102e', '#4a0010', ['#ffffff', '#ffe28a', '#e9a92c'], '#3a0008');
      for (let i = 0; i < 12; i++) glint(g, CX + (rnd() - 0.5) * 1500, CY - 380 + rnd() * 720, 22 + rnd() * 26, '#ffd6e0');
      break;
    }
    case 'mural': {      // bích hoạ huyền thoại: dải ngân hà, cánh phượng hoàng, hào quang + vương miện, nguyệt quế, pháo hoa
      galaxy(g, rnd, CX, CY + 20, 860, 470);
      rays(g, CX, CY, 900, RAINBOW, 36, 0.35);
      for (const [fx, fy, fc] of [[CX - 700, CY - 300, '#ffd60a'], [CX + 700, CY - 280, '#ff4fc3'], [CX - 640, CY + 300, '#00e5ff'], [CX + 660, CY + 320, '#3ddc5a']] as const) fireworks(g, rnd, fx, fy, 140, fc);
      phoenixWings(g, CX, CY, R);
      laurel(g, CX, CY + 10, R * 1.55);
      halo(g, CX, CY - R * 1.95, R * 1.3);
      medallion(g, CX, CY, R, av, a.name, col, 'cosmic', '#ffd60a', 24);
      crown(g, CX, CY - R * 1.22, R * 1.3);
      ribbon(g, CX, CY - R * 2.35, 760, 110, '#ffd860', '#a8651a'); title(g, 'HUYỀN THOẠI', CX, CY - R * 2.35 - 4, 80, 640, ['#ffffff', '#fff2b0', '#e9a92c'], '#4a2600');
      nameRibbon(CY + 420, '#a35bff', '#3a0a8a', ['#ffffff', '#ffe28a', '#ff4fc3'], '#200040', 1200);
      for (let i = 0; i < 18; i++) glint(g, CX + (rnd() - 0.5) * 1600, CY - 420 + rnd() * 820, 22 + rnd() * 30);
      break;
    }
  }
  if (LABELS[a.kind]) badge(g, CX, a.kind === 'mural' ? CY + 560 : CY + 545, LABELS[a.kind] + (a.count > 1 ? ' x' + a.count : ''), a.kind === 'mural' ? '#ffd60a' : col);
  return { c, x: 0, y: 0 };
}
