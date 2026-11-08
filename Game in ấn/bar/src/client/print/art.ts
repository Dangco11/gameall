import { TIERS, templateOf, tierOf } from '../../shared/print.ts';
import type { Border, Finish, Ornament, Palette, Shape, Template } from '../../shared/print.ts';
import type { PrintRecord } from '../../shared/types.ts';

// Vẽ bản in bằng canvas 2D: mỗi mẫu khung là tổ hợp riêng của bố cục, hình ô ảnh, viền, hoạ tiết, chất liệu (mực in, nhũ bạc,
// nhũ vàng, ánh kim, kính, đá quý...). Mỗi bản in có 3 LỚP in lần lượt (khung → ảnh → chữ), mỗi lớp vẽ 3 BẢN:
//   color  ảnh màu như mắt thấy
//   pbr    bản đồ vật liệu cho Three.js: kênh G là độ nhám, kênh B là độ kim loại (nhũ vàng bóng loáng, giấy nhám mờ)
//   glow   bản đồ phát sáng (đá quý, viền vàng của bản in VIP sáng lên trong cảnh tối)
// Khung toạ độ: rộng 1000, cao H (tỉ lệ ô in 0,65 × 0,8 m và tờ khổ lớn 1,3 × 1,6 m giống nhau).
export const ART_H = 1231;
export type Pass = 'color' | 'pbr' | 'glow';
export type LayerKey = 'frame' | 'photo' | 'text';
export const LAYERS: LayerKey[] = ['frame', 'photo', 'text'];
export interface ArtData {
  tpl: Template; name: string; avatar: HTMLImageElement | null;
  xu: number; count: number; gift: string; code: string; n: number; at: number; edition: number; lv: number;
}
export type PassSet = Record<Pass, HTMLCanvasElement>;

/* ------------------------------------------------------------ ảnh đại diện */
// Tải qua server (/avatar/:id, cùng nguồn nên WebGL dùng được). Lỗi, quá 5 giây hay không có ảnh: trả null, bản in vẽ chữ cái đầu.
const avatars = new Map<string, Promise<HTMLImageElement | null>>();
export function avatarImage(id: string, has: boolean): Promise<HTMLImageElement | null> {
  if (!has) return Promise.resolve(null);
  let p = avatars.get(id);
  if (!p){
    p = new Promise(res => {
      const img = new Image();
      const t = setTimeout(() => { img.src = ''; res(null); }, 5000);
      img.onload = () => { clearTimeout(t); res(img.naturalWidth > 0 ? img : null); };
      img.onerror = () => { clearTimeout(t); res(null); };
      img.src = '/avatar/' + encodeURIComponent(id);
    });
    avatars.set(id, p);
    // ảnh lỗi thì lần sau thử lại (sau 60 giây); giữ tối đa 300 ảnh
    void p.then(r => { if (!r) setTimeout(() => { if (avatars.get(id) === p) avatars.delete(id); }, 60_000); });
    if (avatars.size > 300) avatars.delete(avatars.keys().next().value as string);
  }
  return p;
}
export function artData(r: PrintRecord, avatar: HTMLImageElement | null): ArtData {
  return { tpl: templateOf(r.tpl), name: r.name, avatar, xu: r.xu, count: r.count, gift: r.gift, code: r.code, n: r.n, at: r.at, edition: r.edition, lv: r.lv };
}

/* ------------------------------------------------------------ màu, chất liệu */
type Mat = 'paper' | 'ink' | 'metal' | 'gem' | 'gloss' | 'glow';
const METAL: Record<Finish, string[]> = {
  ink: [], gold: ['#fff4b8', '#f0c050', '#9a6414', '#ffe080', '#c08a24'], silver: ['#ffffff', '#c4ccd6', '#6c757e', '#eef2f6', '#a0aab4'],
  rose: ['#ffe4dc', '#e8a088', '#8e4a3a', '#ffc8b8', '#b8705e'], platinum: ['#ffffff', '#e4e8ee', '#9aa3ad', '#f6f8fa', '#c4cad0'],
  holo: ['#ffb0e8', '#a8e0ff', '#c0ffd0', '#fff4a8', '#d8b0ff'], obsidian: ['#fff0b0', '#e8b040', '#7a4c10', '#ffd870', '#a8701c'],
  crystal: ['#ffffff', '#d0f4ff', '#80cce8', '#ecfcff', '#a8e0f4'],
};
const PBR: Record<Mat, string> = { paper: 'rgb(255,215,0)', ink: 'rgb(255,175,0)', gloss: 'rgb(255,60,0)', metal: 'rgb(255,62,255)', gem: 'rgb(255,25,170)', glow: 'rgb(255,120,0)' };

interface C {
  g: CanvasRenderingContext2D; pass: Pass; tpl: Template; pal: Palette; fin: Finish; vip: boolean; rnd: () => number;
}
const rng = (seed: number) => () => { seed |= 0; seed = seed + 0x6d2b79f5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const hexA = (hex: string, a: number) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`; };
const mix = (a: string, b: string, k: number) => { const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16), f = (s: number) => Math.round(((x >> s) & 255) * (1 - k) + ((y >> s) & 255) * k); return `rgb(${f(16)},${f(8)},${f(0)})`; };

// kiểu tô của một vật theo bản đang vẽ
function paint(c: C, m: Mat, color: string | CanvasGradient, glowAlpha = 1): string | CanvasGradient {
  if (c.pass === 'pbr') return m === 'metal' && c.fin === 'ink' ? PBR.ink : PBR[m];
  if (c.pass === 'glow'){
    if (m === 'gem' || m === 'glow') return typeof color === 'string' ? color.startsWith('#') ? hexA(color, glowAlpha) : color : color;
    if (m === 'metal' && c.tpl.glow !== 'none' && c.fin !== 'ink') return c.vip ? 'rgba(120,80,20,0.9)' : 'rgba(60,40,8,0.9)';
    return '#000';
  }
  return color;
}
// nhũ kim loại: dải màu chéo sáng tối như lá vàng / bạc ép nhũ
function metal(c: C, x0: number, y0: number, x1: number, y1: number): string | CanvasGradient {
  const st = METAL[c.fin];
  if (!st.length) return c.pal.accent;
  const g = c.g.createLinearGradient(x0, y0, x1, y1);
  st.forEach((s, i) => g.addColorStop(i / (st.length - 1), s));
  return g;
}
const fillM = (c: C, color: string | CanvasGradient, m: Mat = 'metal', a = 1) => { c.g.fillStyle = paint(c, m, color, a); c.g.fill(); };
const strokeM = (c: C, color: string | CanvasGradient, w: number, m: Mat = 'metal') => { c.g.strokeStyle = paint(c, m, color); c.g.lineWidth = w; c.g.stroke(); };

/* ------------------------------------------------------------ hình học */
function shapePath(g: CanvasRenderingContext2D, s: Shape, cx: number, cy: number, r: number){
  g.beginPath();
  const poly = (n: number, rot: number, rr = r) => { for (let i = 0; i < n; i++){ const a = rot + i / n * Math.PI * 2; i ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } g.closePath(); };
  switch (s){
    case 'circle': g.arc(cx, cy, r, 0, Math.PI * 2); break;
    case 'oval': g.ellipse(cx, cy, r * 0.82, r * 1.06, 0, 0, Math.PI * 2); break;
    case 'rounded': g.roundRect(cx - r * 0.92, cy - r * 0.92, r * 1.84, r * 1.84, r * 0.26); break;
    case 'hex': poly(6, Math.PI / 6, r * 1.04); break;
    case 'oct': poly(8, Math.PI / 8, r * 1.02); break;
    case 'rhombus': poly(4, -Math.PI / 2, r * 1.14); break;
    case 'shield':
      g.moveTo(cx - r * 0.9, cy - r * 0.86); g.quadraticCurveTo(cx, cy - r * 1.06, cx + r * 0.9, cy - r * 0.86);
      g.lineTo(cx + r * 0.9, cy + r * 0.05); g.quadraticCurveTo(cx + r * 0.84, cy + r * 0.72, cx, cy + r * 1.08);
      g.quadraticCurveTo(cx - r * 0.84, cy + r * 0.72, cx - r * 0.9, cy + r * 0.05); g.closePath(); break;
    case 'arch':
      g.moveTo(cx - r * 0.86, cy + r * 0.98); g.lineTo(cx - r * 0.86, cy - r * 0.12); g.arc(cx, cy - r * 0.12, r * 0.86, Math.PI, 0); g.lineTo(cx + r * 0.86, cy + r * 0.98); g.closePath(); break;
    case 'scallop': {
      const n = 16;
      for (let i = 0; i <= n * 8; i++){ const a = i / (n * 8) * Math.PI * 2, rr = r * (0.93 + 0.07 * Math.abs(Math.cos(a * n / 2))); i ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + rr, cy); }
      g.closePath(); break;
    }
    case 'heart':
      g.moveTo(cx, cy + r * 1.02);
      g.bezierCurveTo(cx - r * 1.5, cy + r * 0.1, cx - r * 1.1, cy - r * 1.15, cx, cy - r * 0.5);
      g.bezierCurveTo(cx + r * 1.1, cy - r * 1.15, cx + r * 1.5, cy + r * 0.1, cx, cy + r * 1.02); g.closePath(); break;
  }
}
function star(g: CanvasRenderingContext2D, cx: number, cy: number, r: number, n = 5, inner = 0.45, rot = -Math.PI / 2){
  g.beginPath();
  for (let i = 0; i < n * 2; i++){ const a = rot + i / (n * 2) * Math.PI * 2, rr = i % 2 ? r * inner : r; i ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  g.closePath();
}
function leaf(g: CanvasRenderingContext2D, x: number, y: number, len: number, wid: number, ang: number){
  g.save(); g.translate(x, y); g.rotate(ang); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(len * 0.5, -wid, len, 0); g.quadraticCurveTo(len * 0.5, wid, 0, 0); g.restore();
}
// chữ vừa khung: thu cỡ chữ cho tới khi lọt bề rộng
function fitFont(g: CanvasRenderingContext2D, text: string, weight: string, size: number, maxW: number, family = '"Segoe UI", "Segoe UI Emoji", Arial, sans-serif'){
  let s = size;
  for (; s > 14; s -= 2){ g.font = `${weight} ${s}px ${family}`; if (g.measureText(text).width <= maxW) break; }
  return s;
}

/* ------------------------------------------------------------ bố cục */
interface L {
  H: number; cx: number; cy: number; r: number;               // ô ảnh đại diện
  card: { x: number; y: number; w: number; h: number; rad: number };
  titleY: number; titleS: number; nameY: number; nameS: number; infoY: number; topY: number;
}
function layout(t: Template): L {
  const H = ART_H, base = { H, cx: 500, card: { x: 34, y: 34, w: 932, h: H - 68, rad: 34 } };
  switch (t.layout){
    case 'card':     return { ...base, cy: 545, r: 255, titleY: 128, titleS: 74, nameY: 905, nameS: 76, infoY: 1030, topY: 250 };
    case 'badge':    return { ...base, cy: 560, r: 225, titleY: 150, titleS: 70, nameY: 1010, nameS: 70, infoY: 1120, topY: 160 };
    case 'poster':   return { ...base, cy: 640, r: 250, titleY: 150, titleS: 116, nameY: 1012, nameS: 88, infoY: 1120, topY: 345 };
    case 'ticket':   return { ...base, cy: 470, r: 225, titleY: 132, titleS: 70, nameY: 790, nameS: 72, infoY: 945, topY: 205 };
    case 'stamp':    return { ...base, card: { x: 60, y: 60, w: 880, h: H - 120, rad: 6 }, cy: 560, r: 260, titleY: 175, titleS: 64, nameY: 950, nameS: 74, infoY: 1070, topY: 260 };
    default:         return { ...base, cy: 560, r: 252, titleY: 165, titleS: 84, nameY: 935, nameS: 80, infoY: 1065, topY: 268 };
  }
}

/* ------------------------------------------------------------ nền */
function background(c: C, L: L){
  const { g, pal, tpl } = c, k = L.card;
  // phôi giấy: mẫu thường in thẳng lên giấy (để lộ màu giấy), mẫu cao cấp in nền phủ kín
  g.save();
  if (tpl.layout === 'stamp'){
    // tem thư: răng cưa quanh mép
    g.beginPath(); g.rect(k.x - 26, k.y - 26, k.w + 52, k.h + 52); g.fillStyle = paint(c, 'ink', '#fbfaf6'); g.fill();
    g.fillStyle = c.pass === 'color' ? 'rgba(0,0,0,1)' : '#000';
    g.globalCompositeOperation = 'destination-out';
    for (let x = k.x - 26; x <= k.x + k.w + 26; x += 40){ for (const y of [k.y - 26, k.y + k.h + 26]){ g.beginPath(); g.arc(x, y, 13, 0, Math.PI * 2); g.fill(); } }
    for (let y = k.y - 26; y <= k.y + k.h + 26; y += 40){ for (const x of [k.x - 26, k.x + k.w + 26]){ g.beginPath(); g.arc(x, y, 13, 0, Math.PI * 2); g.fill(); } }
    g.globalCompositeOperation = 'source-over';
  }
  if (tpl.layout === 'ticket'){
    // vé: khoét bán nguyệt hai bên ở đường xé
    g.beginPath(); g.roundRect(k.x, k.y, k.w, k.h, 28);
    g.moveTo(k.x, 860); g.arc(k.x, 860, 40, -Math.PI / 2, Math.PI / 2); g.moveTo(k.x + k.w, 860); g.arc(k.x + k.w, 860, 40, Math.PI / 2, Math.PI * 1.5);
  } else { g.beginPath(); g.roundRect(k.x, k.y, k.w, k.h, k.rad); }
  const grad = g.createLinearGradient(0, k.y, 0, k.y + k.h); grad.addColorStop(0, pal.bg); grad.addColorStop(1, pal.bg2);
  g.fillStyle = paint(c, tpl.finish === 'obsidian' || tpl.finish === 'holo' ? 'gloss' : 'ink', grad);
  g.fill('evenodd');
  g.clip('evenodd');
  pattern(c, L);
  // ánh hào quang sau ảnh
  if (tpl.glow === 'aura' || tpl.glow === 'glow' || tpl.glow === 'rainbow'){
    const rg = g.createRadialGradient(L.cx, L.cy, L.r * 0.6, L.cx, L.cy, L.r * 2.1);
    rg.addColorStop(0, hexA(pal.accent, 0.55)); rg.addColorStop(1, hexA(pal.accent, 0));
    g.fillStyle = paint(c, 'glow', rg); g.fillRect(0, 0, 1000, L.H);
  }
  g.restore();
}
function pattern(c: C, L: L){
  const { g, pal, rnd } = c, col = c.pass === 'color' ? hexA(pal.ink, 0.09) : c.pass === 'pbr' ? PBR.ink : '#000', H = L.H;
  g.save(); g.fillStyle = col; g.strokeStyle = col; g.lineWidth = 3;
  switch (c.tpl.pattern){
    case 'dots': for (let y = 30; y < H; y += 46) for (let x = (y / 46 % 2) * 23 + 20; x < 1000; x += 46){ g.beginPath(); g.arc(x, y, 6, 0, 7); g.fill(); } break;
    case 'lines': for (let y = 20; y < H; y += 28){ g.beginPath(); g.moveTo(0, y); g.lineTo(1000, y); g.stroke(); } break;
    case 'grid': g.lineWidth = 2; for (let x = 0; x < 1000; x += 50){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); } for (let y = 0; y < H; y += 50){ g.beginPath(); g.moveTo(0, y); g.lineTo(1000, y); g.stroke(); } break;
    case 'diagonal': g.lineWidth = 14; for (let x = -H; x < 1000; x += 60){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x + H, H); g.stroke(); } break;
    case 'sunburst': {
      for (let i = 0; i < 36; i++){ if (i % 2) continue; const a = i / 36 * Math.PI * 2, b = (i + 1) / 36 * Math.PI * 2; g.beginPath(); g.moveTo(L.cx, L.cy); g.lineTo(L.cx + Math.cos(a) * 1600, L.cy + Math.sin(a) * 1600); g.lineTo(L.cx + Math.cos(b) * 1600, L.cy + Math.sin(b) * 1600); g.closePath(); g.fill(); }
      break;
    }
    case 'damask':
      for (let y = 60; y < H; y += 150) for (let x = ((y - 60) / 150 % 2) * 90 + 40; x < 1000; x += 180){
        for (let k = 0; k < 4; k++){ leaf(g, x, y, 46, 16, k * Math.PI / 2 + Math.PI / 4); g.fill(); }
        g.beginPath(); g.arc(x, y, 9, 0, 7); g.fill();
      }
      break;
    case 'hexgrid': g.lineWidth = 2.5; for (let y = 0, row = 0; y < H + 60; y += 52, row++) for (let x = (row % 2) * 45; x < 1060; x += 90){ g.beginPath(); for (let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2 + Math.PI / 6; g.lineTo(x + Math.cos(a) * 30, y + Math.sin(a) * 30); } g.closePath(); g.stroke(); } break;
    case 'stars': for (let i = 0; i < 70; i++){ star(g, rnd() * 1000, rnd() * H, 6 + rnd() * 12, 5, 0.42, rnd()); g.fill(); } break;
    case 'marble': g.lineWidth = 2; for (let i = 0; i < 14; i++){ g.beginPath(); let x = rnd() * 1000, y = rnd() * H; g.moveTo(x, y); for (let k = 0; k < 8; k++){ x += (rnd() - 0.3) * 160; y += (rnd() - 0.5) * 160; g.quadraticCurveTo(x - 40, y + 40, x, y); } g.stroke(); } break;
    case 'waves': g.lineWidth = 3; for (let y = 20; y < H; y += 40){ g.beginPath(); for (let x = 0; x <= 1000; x += 20) g.lineTo(x, y + Math.sin(x / 50 + y) * 9); g.stroke(); } break;
    case 'confetti': for (let i = 0; i < 90; i++){ g.save(); g.translate(rnd() * 1000, rnd() * H); g.rotate(rnd() * 6); g.fillRect(-8, -3, 16, 6); g.restore(); } break;
  }
  g.restore();
}

/* ------------------------------------------------------------ viền thẻ */
function cardBorder(c: C, L: L, b: Border){
  const { g } = c, k = L.card, m = metal(c, k.x, k.y, k.x + k.w, k.y + k.h);
  const rect = (inset: number, rad = Math.max(4, k.rad - inset)) => { g.beginPath(); g.roundRect(k.x + inset, k.y + inset, k.w - inset * 2, k.h - inset * 2, rad); };
  g.save();
  rect(4); strokeM(c, m, c.fin === 'ink' ? 6 : 10);                                // mép thẻ luôn có viền
  switch (b){
    case 'double': rect(26); strokeM(c, m, 4); break;
    case 'dashed': g.setLineDash([26, 14]); rect(24); strokeM(c, m, 5); g.setLineDash([]); break;
    case 'corners':
      for (const [sx, sy] of [[0, 0], [1, 0], [0, 1], [1, 1]]){
        const x = k.x + 22 + sx * (k.w - 44), y = k.y + 22 + sy * (k.h - 44), dx = sx ? -1 : 1, dy = sy ? -1 : 1;
        g.beginPath(); g.moveTo(x, y + dy * 110); g.lineTo(x, y); g.lineTo(x + dx * 110, y); strokeM(c, m, 9);
        g.beginPath(); g.arc(x + dx * 26, y + dy * 26, 9, 0, 7); fillM(c, m);
      }
      break;
    case 'deco': {
      rect(22, 0); strokeM(c, m, 4);
      for (const [sx, sy] of [[0, 0], [1, 0], [0, 1], [1, 1]]){
        const x = k.x + 22 + sx * (k.w - 44), y = k.y + 22 + sy * (k.h - 44), dx = sx ? -1 : 1, dy = sy ? -1 : 1;
        for (let s = 0; s < 4; s++){ g.beginPath(); g.moveTo(x + dx * (20 + s * 24), y); g.lineTo(x + dx * (20 + s * 24), y + dy * (20 + (3 - s) * 24)); g.lineTo(x, y + dy * (20 + (3 - s) * 24)); strokeM(c, m, 3); }
      }
      // quạt art deco giữa mép trên, mép dưới
      for (const [y, dir] of [[k.y + 22, 1], [k.y + k.h - 22, -1]] as const){
        for (let i = 0; i < 7; i++){ const a = Math.PI * (0.15 + i * 0.7 / 6); g.beginPath(); g.moveTo(500, y); g.lineTo(500 + Math.cos(a) * 90 * (i % 2 ? 0.8 : 1) * (dir > 0 ? 1 : 1), y + Math.sin(a) * 90 * dir); strokeM(c, m, 4); }
        g.beginPath(); g.arc(500, y, 22, dir > 0 ? 0 : Math.PI, dir > 0 ? Math.PI : Math.PI * 2); fillM(c, m);
      }
      break;
    }
    case 'rope': {
      const step = 22;
      const along = (x0: number, y0: number, x1: number, y1: number) => { const n = Math.floor(Math.hypot(x1 - x0, y1 - y0) / step), a = Math.atan2(y1 - y0, x1 - x0); for (let i = 0; i <= n; i++){ g.beginPath(); g.ellipse(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, 14, 6, a + 0.8, 0, 7); fillM(c, m); } };
      const i = 26; along(k.x + i, k.y + i, k.x + k.w - i, k.y + i); along(k.x + k.w - i, k.y + i, k.x + k.w - i, k.y + k.h - i); along(k.x + k.w - i, k.y + k.h - i, k.x + i, k.y + k.h - i); along(k.x + i, k.y + k.h - i, k.x + i, k.y + i);
      break;
    }
    case 'chain': {
      const i = 26, pts: [number, number, number][] = [];
      for (let x = k.x + i; x <= k.x + k.w - i; x += 34){ pts.push([x, k.y + i, 0], [x, k.y + k.h - i, 0]); }
      for (let y = k.y + i + 34; y <= k.y + k.h - i - 34; y += 34){ pts.push([k.x + i, y, 1], [k.x + k.w - i, y, 1]); }
      pts.forEach(([x, y, v], n) => { g.beginPath(); g.ellipse(x, y, (n % 4 < 2) !== !!v ? 18 : 8, (n % 4 < 2) !== !!v ? 8 : 18, 0, 0, 7); strokeM(c, m, 5); });
      break;
    }
    case 'circuit': {
      g.lineWidth = 4;
      for (let n = 0; n < 26; n++){
        const side = n % 4, t = c.rnd();
        let x = side === 0 ? k.x + 20 : side === 1 ? k.x + k.w - 20 : k.x + 60 + t * (k.w - 120), y = side === 2 ? k.y + 20 : side === 3 ? k.y + k.h - 20 : k.y + 60 + t * (k.h - 120);
        g.beginPath(); g.moveTo(x, y);
        const len = 40 + c.rnd() * 90; if (side < 2){ x += side ? -len : len; } else { y += side === 2 ? len : -len; } g.lineTo(x, y);
        if (side < 2) y += (c.rnd() - 0.5) * 80; else x += (c.rnd() - 0.5) * 80; g.lineTo(x, y); strokeM(c, m, 4);
        g.beginPath(); g.arc(x, y, 8, 0, 7); fillM(c, c.pal.accent, 'gem', 0.8);
      }
      break;
    }
    case 'waves': {
      for (const off of [24, 40]){ g.beginPath(); const w = k.w - off * 2, h = k.h - off * 2, per = 2 * (w + h);
        for (let s = 0; s <= per; s += 8){ let x: number, y: number, nx: number, ny: number;
          if (s < w){ x = s; y = 0; nx = 0; ny = 1; } else if (s < w + h){ x = w; y = s - w; nx = -1; ny = 0; } else if (s < 2 * w + h){ x = w - (s - w - h); y = h; nx = 0; ny = -1; } else { x = 0; y = h - (s - 2 * w - h); nx = 1; ny = 0; }
          const a = Math.sin(s / 18) * 7; g.lineTo(k.x + off + x + nx * a, k.y + off + y + ny * a); }
        strokeM(c, m, 3); }
      break;
    }
    case 'stars': {
      const i = 30;
      for (let x = k.x + i; x <= k.x + k.w - i; x += 58) for (const y of [k.y + i, k.y + k.h - i]){ star(g, x, y, 13); fillM(c, m); }
      for (let y = k.y + i + 58; y <= k.y + k.h - i - 58; y += 58) for (const x of [k.x + i, k.x + k.w - i]){ star(g, x, y, 13); fillM(c, m); }
      break;
    }
    default: rect(22); strokeM(c, m, 3);
  }
  g.restore();
}

/* ------------------------------------------------------------ trang trí quanh ảnh */
function wings(c: C, cx: number, cy: number, size: number, big = false){
  const { g } = c;
  for (const side of [-1, 1]){
    g.save(); g.translate(cx, cy); g.scale(side, 1);
    const rows = big ? 4 : 3;
    for (let r = rows - 1; r >= 0; r--){
      const n = big ? 9 : 7;
      for (let i = 0; i < n; i++){
        const a = -0.95 + i / (n - 1) * 1.25 + r * 0.04, len = size * (0.62 + r * 0.17) * (1 - i * 0.045), w = size * 0.1;
        g.save(); g.rotate(a); g.translate(size * 0.38 + r * size * 0.05, 0);
        g.beginPath(); g.moveTo(0, -w * 0.5); g.quadraticCurveTo(len * 0.6, -w * 1.15, len, 0); g.quadraticCurveTo(len * 0.6, w * 1.15, 0, w * 0.5); g.closePath();
        const shade = r % 2 ? metal(c, 0, -w, len, w) : (c.fin === 'ink' ? c.pal.accent : mix(c.pal.metal, '#ffffff', 0.35));
        fillM(c, shade, r % 2 ? 'metal' : 'gloss');
        g.strokeStyle = paint(c, 'ink', hexA(c.pal.ink, 0.45)); g.lineWidth = 2.2; g.stroke();
        g.beginPath(); g.moveTo(len * 0.1, 0); g.lineTo(len * 0.88, 0); g.strokeStyle = paint(c, 'ink', hexA(c.pal.ink, 0.3)); g.lineWidth = 1.6; g.stroke();
        g.restore();
      }
    }
    g.restore();
  }
}
function aroundAvatar(c: C, L: L, b: Border){
  const { g, pal } = c, { cx, cy, r } = L, m = metal(c, cx - r, cy - r, cx + r, cy + r);
  g.save();
  switch (b){
    case 'laurel':
      for (const side of [-1, 1]) for (let i = 0; i < 13; i++){
        const a = Math.PI / 2 + side * (0.35 + i * 0.19), rr = r + 46, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        leaf(g, x, y, 62, 20, a + side * (Math.PI / 2 + 0.5)); fillM(c, i % 2 ? m : c.fin === 'ink' ? '#4c8a2a' : m, i % 2 ? 'metal' : c.fin === 'ink' ? 'ink' : 'metal');
      }
      break;
    case 'filigree':
      for (let i = 0; i < 12; i++){
        const a = i / 12 * Math.PI * 2, x = cx + Math.cos(a) * (r + 40), y = cy + Math.sin(a) * (r + 40);
        g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2);
        g.beginPath(); g.moveTo(-60, 0); g.bezierCurveTo(-40, -50, -5, -40, -10, -10); g.arc(-22, -12, 12, 0, Math.PI * 1.6, false);
        g.moveTo(60, 0); g.bezierCurveTo(40, -50, 5, -40, 10, -10); g.arc(22, -12, 12, Math.PI, Math.PI * 2.6 - Math.PI, true);
        strokeM(c, m, 7); g.beginPath(); g.arc(0, -4, 8, 0, 7); fillM(c, pal.accent, 'gem');
        g.restore();
      }
      break;
    case 'rays':
      for (let i = 0; i < 48; i++){ const a = i / 48 * Math.PI * 2, l = r + (i % 2 ? 60 : 120); g.beginPath(); g.moveTo(cx + Math.cos(a - 0.03) * r, cy + Math.sin(a - 0.03) * r); g.lineTo(cx + Math.cos(a) * l, cy + Math.sin(a) * l); g.lineTo(cx + Math.cos(a + 0.03) * r, cy + Math.sin(a + 0.03) * r); fillM(c, m); }
      break;
    case 'crystals':
      for (let i = 0; i < 22; i++){
        const a = i / 22 * Math.PI * 2 + c.rnd() * 0.1, l = 50 + c.rnd() * 80, w = 16 + c.rnd() * 14, x = cx + Math.cos(a) * (r + 10), y = cy + Math.sin(a) * (r + 10);
        g.save(); g.translate(x, y); g.rotate(a); g.beginPath(); g.moveTo(0, -w); g.lineTo(l * 0.7, -w * 0.6); g.lineTo(l, 0); g.lineTo(l * 0.7, w * 0.6); g.lineTo(0, w); g.closePath();
        const cg = g.createLinearGradient(0, -w, l, w); cg.addColorStop(0, '#ffffff'); cg.addColorStop(0.5, pal.accent); cg.addColorStop(1, mix(pal.accent, '#000000', 0.4));
        fillM(c, cg, 'gem', 0.9); g.strokeStyle = paint(c, 'gem', 'rgba(255,255,255,0.8)'); g.lineWidth = 2; g.stroke();
        g.beginPath(); g.moveTo(0, 0); g.lineTo(l, 0); g.strokeStyle = paint(c, 'gem', 'rgba(255,255,255,0.6)'); g.stroke();
        g.restore();
      }
      break;
    case 'flames':
      for (let i = 0; i < 26; i++){
        const a = i / 26 * Math.PI * 2, l = 70 + c.rnd() * 90 + (Math.sin(a) < -0.3 ? 50 : 0), x = cx + Math.cos(a) * (r - 6), y = cy + Math.sin(a) * (r - 6);
        g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2 * 0 ); g.beginPath(); g.moveTo(0, -24); g.quadraticCurveTo(l * 0.6, -30, l, (c.rnd() - 0.5) * 30); g.quadraticCurveTo(l * 0.5, 10, 0, 24); g.closePath();
        const fg = g.createLinearGradient(0, 0, l, 0); fg.addColorStop(0, '#fff6a0'); fg.addColorStop(0.4, '#ff9a1a'); fg.addColorStop(1, 'rgba(220,30,10,0.2)');
        fillM(c, fg, 'glow'); g.restore();
      }
      break;
    case 'petals':
      for (let i = 0; i < 18; i++){
        const a = i / 18 * Math.PI * 2, x = cx + Math.cos(a) * (r + 34), y = cy + Math.sin(a) * (r + 34);
        g.save(); g.translate(x, y); g.rotate(a + Math.PI / 2);
        g.beginPath(); g.moveTo(0, 26); g.bezierCurveTo(-44, -6, -24, -46, 0, -30); g.bezierCurveTo(24, -46, 44, -6, 0, 26);
        const pg = g.createRadialGradient(0, -6, 4, 0, 0, 44); pg.addColorStop(0, '#ff9ab8'); pg.addColorStop(1, '#b0102e');
        fillM(c, pg, 'gloss'); g.restore();
      }
      break;
    case 'scales':
      for (let ring = 0; ring < 2; ring++) for (let i = 0; i < 30; i++){
        const a = (i + ring * 0.5) / 30 * Math.PI * 2, rr = r + 22 + ring * 30, x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
        g.beginPath(); g.arc(x, y, 24, a - Math.PI / 2 - 1.3, a - Math.PI / 2 + 1.3 + Math.PI, false); fillM(c, ring ? m : mix(pal.accent, '#000000', 0.25), ring ? 'metal' : 'gloss');
        g.strokeStyle = paint(c, 'ink', hexA(pal.ink, 0.5)); g.lineWidth = 2; g.stroke();
      }
      break;
    case 'wings': wings(c, cx, cy, r * 1.25); break;
  }
  g.restore();
}
// viền quanh ô ảnh (khung đúc): kim loại dày + chỉ đen mảnh bên trong
function avatarRing(c: C, L: L){
  const { g, tpl } = c, { cx, cy, r } = L, m = metal(c, cx - r, cy - r, cx + r, cy + r), tw = tierOf(tpl.tier).no;
  shapePath(g, tpl.shape, cx, cy, r + 14 + tw * 3); strokeM(c, m, 18 + tw * 4);
  shapePath(g, tpl.shape, cx, cy, r + 2); strokeM(c, c.pass === 'color' ? hexA(c.pal.ink, 0.7) : '#000', 4, 'ink');
  if (tw >= 4){
    // đá quý gắn quanh khung
    for (let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2, rr = r + 16 + tw * 3; g.beginPath(); g.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 9, 0, 7); fillM(c, i % 3 ? '#ffffff' : c.pal.accent, 'gem'); }
  }
}

/* ------------------------------------------------------------ vật trang trí phía trên */
function crown(c: C, x: number, y: number, s: number){
  const { g } = c, m = metal(c, x - s, y - s, x + s, y + s * 0.4);
  g.beginPath(); g.moveTo(x - s, y + s * 0.35); g.lineTo(x - s * 1.08, y - s * 0.55); g.lineTo(x - s * 0.5, y - s * 0.05); g.lineTo(x, y - s * 0.82);
  g.lineTo(x + s * 0.5, y - s * 0.05); g.lineTo(x + s * 1.08, y - s * 0.55); g.lineTo(x + s, y + s * 0.35); g.closePath(); fillM(c, m);
  g.strokeStyle = paint(c, 'ink', hexA(c.pal.ink, 0.5)); g.lineWidth = 3; g.stroke();
  g.beginPath(); g.roundRect(x - s, y + s * 0.25, s * 2, s * 0.32, 6); fillM(c, m);
  for (const [px, py, rr] of [[-1.08, -0.55, 0.13], [0, -0.82, 0.15], [1.08, -0.55, 0.13]]){ g.beginPath(); g.arc(x + px * s, y + py * s, rr * s, 0, 7); fillM(c, '#ffffff', 'gem'); }
  for (let i = -2; i <= 2; i++){ g.beginPath(); g.arc(x + i * s * 0.36, y + s * 0.41, s * 0.075, 0, 7); fillM(c, i % 2 ? c.pal.accent : '#ff2a4a', 'gem'); }
}
function ornament(c: C, L: L, o: Ornament){
  const { g, pal } = c, x = L.cx, y = L.cy - L.r - 50, s = 72, m = metal(c, x - s, y - s, x + s, y + s);
  g.save();
  switch (o){
    case 'crown': crown(c, x, y - 4, s); break;
    case 'tiara':
      g.beginPath(); g.moveTo(x - s * 1.3, y + s * 0.3); g.quadraticCurveTo(x, y - s * 0.9, x + s * 1.3, y + s * 0.3); g.quadraticCurveTo(x, y - s * 0.3, x - s * 1.3, y + s * 0.3); fillM(c, m);
      for (let i = -3; i <= 3; i++){ g.beginPath(); g.arc(x + i * s * 0.33, y - s * 0.12 - (3 - Math.abs(i)) * s * 0.09, s * (i ? 0.08 : 0.16), 0, 7); fillM(c, i ? '#ffffff' : pal.accent, 'gem'); }
      break;
    case 'star': star(c.g, x, y, s * 0.8); fillM(c, m); break;
    case 'gem': {
      g.beginPath(); g.moveTo(x - s * 0.8, y - s * 0.2); g.lineTo(x - s * 0.45, y - s * 0.65); g.lineTo(x + s * 0.45, y - s * 0.65); g.lineTo(x + s * 0.8, y - s * 0.2); g.lineTo(x, y + s * 0.75); g.closePath();
      const gg = g.createLinearGradient(x - s, y - s, x + s, y + s); gg.addColorStop(0, '#ffffff'); gg.addColorStop(0.45, pal.accent); gg.addColorStop(1, mix(pal.accent, '#000000', 0.5));
      fillM(c, gg, 'gem'); g.strokeStyle = paint(c, 'gem', '#ffffff'); g.lineWidth = 2.5; g.stroke();
      g.beginPath(); g.moveTo(x - s * 0.8, y - s * 0.2); g.lineTo(x + s * 0.8, y - s * 0.2); g.moveTo(x - s * 0.3, y - s * 0.2); g.lineTo(x, y + s * 0.75); g.lineTo(x + s * 0.3, y - s * 0.2); g.stroke();
      break;
    }
    case 'wings': wings(c, x, y + 10, s * 0.9); g.beginPath(); g.arc(x, y + 10, s * 0.3, 0, 7); fillM(c, m); break;
    case 'rose': {
      for (let i = 0; i < 3; i++){ leaf(g, x + (i - 1) * s * 0.7, y + s * 0.4, s * 0.7, s * 0.25, Math.PI / 2 + (i - 1) * 0.8); fillM(c, '#2e7a32', 'ink'); }
      for (let k = 3; k > 0; k--){ g.beginPath(); for (let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2 + k; g.ellipse(x + Math.cos(a) * k * 8, y + Math.sin(a) * k * 7, s * 0.2 * k * 0.55 + 6, s * 0.15 * k * 0.55 + 4, a, 0, 7); } fillM(c, mix('#e8143a', '#5a0010', k / 4), 'gloss'); }
      break;
    }
    case 'laurel':
      for (const side of [-1, 1]) for (let i = 0; i < 6; i++){ leaf(g, x + side * (12 + i * 16), y + s * 0.3 - i * 9, 42, 13, side < 0 ? Math.PI + 0.6 - i * 0.15 : -0.6 + i * 0.15); fillM(c, m); }
      break;
    case 'flame': {
      g.beginPath(); g.moveTo(x, y - s); g.bezierCurveTo(x + s * 0.9, y - s * 0.2, x + s * 0.6, y + s * 0.7, x, y + s * 0.7); g.bezierCurveTo(x - s * 0.6, y + s * 0.7, x - s * 0.9, y - s * 0.2, x, y - s);
      const fg = g.createLinearGradient(x, y - s, x, y + s); fg.addColorStop(0, '#ff3a1a'); fg.addColorStop(0.6, '#ffb020'); fg.addColorStop(1, '#fff6a0'); fillM(c, fg, 'glow');
      break;
    }
    case 'trophy':
      g.beginPath(); g.moveTo(x - s * 0.6, y - s * 0.7); g.lineTo(x + s * 0.6, y - s * 0.7); g.quadraticCurveTo(x + s * 0.6, y + s * 0.15, x, y + s * 0.25); g.quadraticCurveTo(x - s * 0.6, y + s * 0.15, x - s * 0.6, y - s * 0.7); fillM(c, m);
      for (const sd of [-1, 1]){ g.beginPath(); g.arc(x + sd * s * 0.62, y - s * 0.4, s * 0.26, -Math.PI / 2, Math.PI / 2, sd < 0); strokeM(c, m, 9); }
      g.beginPath(); g.rect(x - s * 0.1, y + s * 0.2, s * 0.2, s * 0.32); g.roundRect(x - s * 0.42, y + s * 0.5, s * 0.84, s * 0.2, 5); fillM(c, m);
      star(g, x, y - s * 0.28, s * 0.22); fillM(c, '#ffffff', 'gem');
      break;
    case 'halo': g.beginPath(); g.ellipse(x, y - 4, s * 1.15, s * 0.32, 0, 0, 7); g.lineWidth = 14; g.strokeStyle = paint(c, 'glow', mix(pal.metal, '#ffffff', 0.4)); g.stroke(); break;
    case 'bolt':
      g.beginPath(); g.moveTo(x + s * 0.2, y - s); g.lineTo(x - s * 0.5, y + s * 0.1); g.lineTo(x - s * 0.02, y + s * 0.1); g.lineTo(x - s * 0.25, y + s); g.lineTo(x + s * 0.55, y - s * 0.15); g.lineTo(x + s * 0.05, y - s * 0.15); g.closePath(); fillM(c, '#ffe14a', 'glow'); break;
    case 'moon': g.beginPath(); g.arc(x, y, s * 0.7, 0, 7); g.arc(x + s * 0.32, y - s * 0.15, s * 0.6, 0, 7, true); fillM(c, m); break;
    case 'sun': for (let i = 0; i < 16; i++){ const a = i / 16 * Math.PI * 2; g.beginPath(); g.moveTo(x + Math.cos(a - 0.12) * s * 0.45, y + Math.sin(a - 0.12) * s * 0.45); g.lineTo(x + Math.cos(a) * s * (i % 2 ? 0.8 : 1.05), y + Math.sin(a) * s * (i % 2 ? 0.8 : 1.05)); g.lineTo(x + Math.cos(a + 0.12) * s * 0.45, y + Math.sin(a + 0.12) * s * 0.45); fillM(c, m); }
      g.beginPath(); g.arc(x, y, s * 0.45, 0, 7); fillM(c, m); break;
    case 'lotus': for (let i = -2; i <= 2; i++){ g.save(); g.translate(x, y + s * 0.4); g.rotate(i * 0.42); g.beginPath(); g.moveTo(0, 0); g.bezierCurveTo(-s * 0.3, -s * 0.5, -s * 0.12, -s * 0.95, 0, -s * (1.05 - Math.abs(i) * 0.12)); g.bezierCurveTo(s * 0.12, -s * 0.95, s * 0.3, -s * 0.5, 0, 0); fillM(c, i % 2 ? m : mix(pal.accent, '#ffffff', 0.3), i % 2 ? 'metal' : 'ink'); g.restore(); } break;
    case 'feather': g.save(); g.translate(x, y); g.rotate(-0.5); g.beginPath(); g.moveTo(-s, 0); g.quadraticCurveTo(0, -s * 0.45, s, 0); g.quadraticCurveTo(0, s * 0.45, -s, 0); fillM(c, m); g.beginPath(); g.moveTo(-s * 1.15, 0); g.lineTo(s, 0); strokeM(c, c.pass === 'color' ? pal.ink : '#000', 3, 'ink'); g.restore(); break;
    case 'shield': shapePath(g, 'shield', x, y, s * 0.7); fillM(c, m); shapePath(g, 'shield', x, y, s * 0.45); fillM(c, pal.accent, 'ink'); break;
    case 'ribbon': {
      g.beginPath(); g.moveTo(x - s * 1.6, y - s * 0.28); g.lineTo(x + s * 1.6, y - s * 0.28); g.lineTo(x + s * 1.4, y + s * 0.02); g.lineTo(x + s * 1.6, y + s * 0.32); g.lineTo(x - s * 1.6, y + s * 0.32); g.lineTo(x - s * 1.4, y + s * 0.02); g.closePath();
      fillM(c, pal.accent, 'ink'); g.strokeStyle = paint(c, 'metal', m); g.lineWidth = 4; g.stroke();
      break;
    }
  }
  g.restore();
}

/* ------------------------------------------------------------ dấu, nét riêng của các mẫu chữ ký */
function sigExtras(c: C, L: L, layer: LayerKey){
  const { g, tpl } = c, sig = tpl.sig;
  if (!sig) return;
  const m = metal(c, 0, 0, 1000, L.H);
  if (layer === 'frame'){
    if (sig === 'top1' || sig === 'immortal') wings(c, L.cx, L.cy + 10, L.r * 1.55, true);
    if (sig === 'queen') for (let i = 0; i < 26; i++){ const a = Math.PI * (0.15 + i / 25 * 0.7); g.beginPath(); g.arc(L.cx + Math.cos(a) * (L.r + 70), L.cy + Math.sin(a) * (L.r + 70), 11, 0, 7); fillM(c, '#fffaf0', 'gloss'); }
    if (sig === 'bigprint') for (let i = 0; i < 10; i++){ const x = 120 + c.rnd() * 760, y = 300 + c.rnd() * 700; if (Math.hypot(x - L.cx, y - L.cy) < L.r + 90) continue; g.beginPath(); g.arc(x, y, 26, 0, 7); fillM(c, m); g.beginPath(); g.arc(x, y, 18, 0, 7); strokeM(c, c.pass === 'color' ? '#8a5a10' : '#000', 3, 'ink'); }
    if (sig === 'rosemaster') for (let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2 + 0.2; const x = L.cx + Math.cos(a) * (L.r + 95), y = L.cy + Math.sin(a) * (L.r + 95); for (let k = 3; k > 0; k--){ g.beginPath(); g.arc(x, y, k * 9 + 4, 0, 7); fillM(c, mix('#ff2a50', '#5a0012', k / 4), 'gloss'); } }
    if (sig === 'champion' || sig === 'king') for (let i = 0; i < 5; i++){ star(g, L.cx + (i - 2) * 70, L.cy + L.r + 75 + Math.abs(i - 2) * -10, 22); fillM(c, m); }
    if (sig === 'legendary') wings(c, L.cx, L.cy - 20, L.r * 1.4, true);
  }
  if (layer === 'text'){
    // dấu "SUPER VIP" đóng nghiêng ở góc
    if (sig === 'top1' || sig === 'supervip'){
      g.save(); g.translate(812, L.cy + L.r + 110); g.rotate(-0.28); g.scale(0.72, 0.72);
      g.beginPath(); g.roundRect(-120, -42, 240, 84, 8); g.strokeStyle = paint(c, 'ink', '#c0102a'); g.lineWidth = 7; g.stroke();
      g.beginPath(); g.roundRect(-108, -31, 216, 62, 4); g.lineWidth = 2.5; g.stroke();
      g.fillStyle = paint(c, 'ink', '#c0102a'); g.font = '900 44px "Segoe UI", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('SUPER VIP', 0, 2);
      g.restore();
    }
    // trái tim "thank you" ở góc dưới trái
    if (sig === 'top1' || sig === 'rosemaster' || sig === 'queen'){
      g.save(); g.translate(178, L.cy + L.r + 70); g.rotate(-0.12); g.scale(0.72, 0.72);
      shapePath(g, 'heart', 0, 0, 62); g.strokeStyle = paint(c, 'ink', '#e0405a'); g.lineWidth = 5; g.stroke(); g.fillStyle = paint(c, 'ink', hexA('#ff7a90', 0.35)); g.fill();
      g.fillStyle = paint(c, 'ink', '#c0203a'); g.font = 'italic 700 34px "Segoe Script", "Brush Script MT", cursive'; g.textAlign = 'center'; g.fillText('thank you!', 0, 104);
      g.restore();
    }
    // băng "TOP 1" trên vương miện
    if (sig === 'top1'){
      const y = L.cy - L.r - 40;
      g.beginPath(); g.moveTo(320, y - 34); g.lineTo(680, y - 34); g.lineTo(650, y + 4); g.lineTo(680, y + 42); g.lineTo(320, y + 42); g.lineTo(350, y + 4); g.closePath();
      fillM(c, '#c8102a', 'gloss'); g.strokeStyle = paint(c, 'metal', m); g.lineWidth = 5; g.stroke();
      g.font = '900 60px "Segoe UI", Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = paint(c, 'metal', metal(c, 0, y - 30, 0, y + 30)); g.fillText('TOP 1', 500, y + 6);
    }
  }
}

/* ------------------------------------------------------------ ảnh */
function photo(c: C, d: ArtData, L: L){
  const { g, tpl } = c;
  g.save();
  shapePath(g, tpl.shape, L.cx, L.cy, L.r);
  g.clip();
  if (c.pass !== 'color'){ g.fillStyle = c.pass === 'pbr' ? PBR.ink : '#000'; g.fillRect(0, 0, 1000, L.H); g.restore(); return; }
  const s = L.r * 2.3, x0 = L.cx - s / 2, y0 = L.cy - s / 2;
  if (d.avatar){
    const iw = d.avatar.naturalWidth, ih = d.avatar.naturalHeight, k = Math.max(s / iw, s / ih);
    g.drawImage(d.avatar, L.cx - iw * k / 2, L.cy - ih * k / 2, iw * k, ih * k);
    // ánh sáng dịu trên ảnh như ảnh in lụa
    const sh = g.createLinearGradient(x0, y0, x0 + s, y0 + s); sh.addColorStop(0, 'rgba(255,255,255,0.12)'); sh.addColorStop(0.5, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(0,0,0,0.12)');
    g.fillStyle = sh; g.fillRect(x0, y0, s, s);
  } else {
    // không có ảnh (người thử, ảnh lỗi): chữ cái đầu của tên trên nền màu của mẫu
    const bg = g.createLinearGradient(x0, y0, x0 + s, y0 + s); bg.addColorStop(0, mix(c.pal.accent, '#ffffff', 0.25)); bg.addColorStop(1, mix(c.pal.accent, '#000000', 0.45));
    g.fillStyle = bg; g.fillRect(x0, y0, s, s);
    const letters = [...d.name.trim()].filter(ch => /\p{L}|\p{N}/u.test(ch)).slice(0, 2).join('').toUpperCase() || '?';
    g.fillStyle = 'rgba(255,255,255,0.92)'; g.font = `800 ${Math.round(L.r * 0.95)}px "Segoe UI", Arial, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(letters, L.cx, L.cy + L.r * 0.06);
  }
  g.restore();
}

/* ------------------------------------------------------------ chữ */
const DATE = (at: number) => { const d = new Date(at); const p = (n: number) => String(n).padStart(2, '0'); return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`; };
function text(c: C, d: ArtData, L: L){
  const { g, tpl, pal } = c, tier = tierOf(tpl.tier), hi = tier.no >= 3;
  const inkCol = c.pass === 'color' ? pal.ink : paint(c, 'ink', pal.ink);
  g.save(); g.textAlign = 'center'; g.textBaseline = 'middle';
  // danh hiệu
  if (tpl.sig !== 'top1'){
    const ty = tpl.layout === 'badge' ? L.cy - L.r - 120 : L.titleY;
    const fs = fitFont(g, tpl.title, '900', L.titleS, tpl.layout === 'poster' ? 880 : 760, hi ? '"Times New Roman", "Segoe UI", serif' : undefined);
    if (tpl.layout === 'card'){ g.beginPath(); g.roundRect(70, ty - fs * 0.7, 860, fs * 1.4, 16); fillM(c, hi ? '#00000055' : hexA(pal.accent, 0.18), 'gloss'); }
    if (hi){ g.lineWidth = Math.max(3, fs * 0.08); g.strokeStyle = paint(c, 'ink', mix(pal.ink, '#000000', 0.6)); g.strokeText(tpl.title, 500, ty); }
    g.fillStyle = hi ? paint(c, 'metal', metal(c, 0, ty - fs / 2, 0, ty + fs / 2)) : paint(c, 'ink', pal.accent);
    g.fillText(tpl.title, 500, ty);
    if (tpl.layout === 'poster'){ const s2 = fitFont(g, tier.name.toUpperCase(), '700', 40, 700); g.font = `700 ${s2}px "Segoe UI", Arial, sans-serif`; g.fillStyle = inkCol; g.fillText(`— ${tier.name.toUpperCase()} —`, 500, ty + fs * 0.85); }
  }
  // độ hiếm: sao
  g.font = '700 30px "Segoe UI", Arial, sans-serif';
  const stars = '★'.repeat(tier.stars);
  g.fillStyle = paint(c, hi ? 'metal' : 'ink', hi ? metal(c, 0, 0, 1000, 0) : pal.accent);
  g.fillText(`${stars}  ${tier.rarity.toUpperCase()}  ${stars}`, 500, tpl.layout === 'badge' ? L.cy + L.r + 70 : L.cy + L.r + 56);
  // tên TikTok (đúng tên người tặng), hai bên có hoa hồng nhỏ như bản in mẫu
  const nameFs = fitFont(g, d.name, '800', L.nameS, 720);
  if (tpl.layout === 'badge'){
    // băng ruy băng mang tên
    g.beginPath(); g.moveTo(90, L.nameY - 62); g.lineTo(910, L.nameY - 62); g.lineTo(870, L.nameY); g.lineTo(910, L.nameY + 62); g.lineTo(90, L.nameY + 62); g.lineTo(130, L.nameY); g.closePath(); fillM(c, pal.accent, 'gloss');
  }
  if (tpl.layout === 'card'){ g.beginPath(); g.roundRect(90, L.nameY - nameFs * 0.75, 820, nameFs * 1.5, 40); fillM(c, hexA(pal.ink, 0.12), 'gloss'); }
  g.font = `800 ${nameFs}px "Segoe UI", "Segoe UI Emoji", Arial, sans-serif`;
  if (hi){ g.lineWidth = 6; g.strokeStyle = paint(c, 'ink', mix(pal.ink, '#000000', 0.5)); g.strokeText(d.name, 500, L.nameY); }
  g.fillStyle = hi ? paint(c, 'metal', metal(c, 0, L.nameY - 40, 0, L.nameY + 40)) : (tpl.layout === 'badge' ? paint(c, 'ink', '#ffffff') : inkCol);
  g.fillText(d.name, 500, L.nameY);
  const nw = Math.min(720, g.measureText(d.name).width);
  for (const sd of [-1, 1]){ const x = 500 + sd * (nw / 2 + 40), y = L.nameY; g.beginPath(); g.arc(x, y, 13, 0, 7); fillM(c, '#e0203a', 'gloss'); leaf(g, x - sd * 6, y + 6, 26, 8, sd < 0 ? Math.PI * 0.85 : Math.PI * 0.15); fillM(c, '#2e7a32', 'ink'); }
  // thông tin bản in: số thứ tự, ngày giờ, số xu, quà, mã sản phẩm, số bản giới hạn
  g.font = '600 28px "Segoe UI", Arial, sans-serif'; g.fillStyle = inkCol;
  const ed = tpl.tier === 'vip' ? `  ·  No. ${d.edition}/99` : '';
  const l1 = `#${String(d.n).padStart(4, '0')}  ·  ${DATE(d.at)}  ·  ${d.xu ? d.xu.toLocaleString('vi-VN') + ' xu' : '❤️ quà tim'}${ed}`;
  const l2 = `${d.gift} ×${d.count}  ·  MÃ ${d.code}${d.lv ? `  ·  Lv${d.lv}` : ''}`;
  if (tpl.layout === 'ticket'){
    // cuống vé: đường xé chấm, mã vạch
    g.setLineDash([12, 10]); g.beginPath(); g.moveTo(70, 860); g.lineTo(930, 860); g.strokeStyle = inkCol; g.lineWidth = 3; g.stroke(); g.setLineDash([]);
    g.fillText(l1, 500, L.infoY); g.fillText(l2, 500, L.infoY + 40);
    let x = 260; const r = rng(d.n * 31 + 7);
    while (x < 740){ const w = 3 + Math.floor(r() * 4) * 2; g.fillRect(x, L.infoY + 75, w, 110); x += w + 4 + Math.floor(r() * 3) * 3; }
    g.font = '600 22px Consolas, monospace'; g.fillText(d.code, 500, L.infoY + 210);
  } else { g.fillText(l1, 500, L.infoY); g.fillText(l2, 500, L.infoY + 40); }
  // logo cá nhân: con dấu tròn chữ cái đầu ở góc dưới phải
  const mono = [...d.name.trim()].filter(ch => /\p{L}|\p{N}/u.test(ch)).slice(0, 2).join('').toUpperCase() || '★';
  const sx = 875, sy = L.H - 95;
  g.beginPath(); g.arc(sx, sy, 44, 0, 7); strokeM(c, hi ? metal(c, sx - 44, sy - 44, sx + 44, sy + 44) : pal.accent, 5, hi ? 'metal' : 'ink');
  g.beginPath(); g.arc(sx, sy, 34, 0, 7); g.lineWidth = 1.5; g.stroke();
  g.font = '800 30px "Times New Roman", "Segoe UI", serif'; g.fillStyle = paint(c, hi ? 'metal' : 'ink', hi ? metal(c, sx - 30, sy - 30, sx + 30, sy + 30) : pal.accent); g.fillText(mono, sx, sy + 2);
  // tem tem thư: mệnh giá
  if (tpl.layout === 'stamp'){ g.textAlign = 'left'; g.font = '900 54px "Times New Roman", "Segoe UI", serif'; g.fillStyle = paint(c, 'ink', pal.accent); g.fillText(`${d.xu}`, 100, 120); g.font = '700 24px "Segoe UI", Arial'; g.fillText('XU', 100, 165);
    // dấu bưu điện gợn sóng đè lên góc ảnh
    g.textAlign = 'center'; g.strokeStyle = paint(c, 'ink', hexA(pal.ink, 0.55)); g.lineWidth = 4; g.beginPath(); g.arc(760, 300, 90, 0, 7); g.stroke();
    for (let i = 0; i < 5; i++){ g.beginPath(); for (let x = 520; x <= 700; x += 10) g.lineTo(x, 260 + i * 20 + Math.sin(x / 14) * 6); g.stroke(); }
    g.font = '700 22px "Segoe UI", Arial'; g.fillStyle = paint(c, 'ink', hexA(pal.ink, 0.6)); g.fillText('LIVE PRINT', 760, 290); g.fillText(DATE(d.at).slice(0, 10), 760, 320);
  }
  g.font = '700 20px "Segoe UI", Arial, sans-serif'; g.textAlign = 'left'; g.fillStyle = paint(c, 'ink', hexA(pal.ink, 0.55));
  g.fillText(`LIVE PRINT STUDIO · ${tpl.name} · mẫu ${tpl.no}/100`, 70, L.H - 62);
  g.restore();
}

/* ------------------------------------------------------------ vẽ */
export function drawLayer(g: CanvasRenderingContext2D, w: number, pass: Pass, layer: LayerKey, d: ArtData){
  const tpl = d.tpl, L = layout(tpl);
  const c: C = { g, pass, tpl, pal: tpl.pal, fin: tpl.finish, vip: tierOf(tpl.tier).no >= 4, rnd: rng(tpl.no * 7919 + LAYERS.indexOf(layer)) };
  g.save(); g.scale(w / 1000, w / 1000); g.lineJoin = 'round'; g.lineCap = 'round';
  if (layer === 'frame'){
    background(c, L);
    sigExtras(c, L, 'frame');
    aroundAvatar(c, L, tpl.border);
    cardBorder(c, L, tpl.border);
    avatarRing(c, L);
    ornament(c, L, tpl.ornament);
  } else if (layer === 'photo') photo(c, d, L);
  else { text(c, d, L); sigExtras(c, L, 'text'); }
  g.restore();
}
const canvas = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
export const artPx = (big: boolean) => big ? [1024, Math.round(1024 * ART_H / 1000)] as const : [512, Math.round(512 * ART_H / 1000)] as const;
/** một lớp, cả 3 bản (màu, vật liệu, phát sáng) */
export function renderLayer(d: ArtData, layer: LayerKey, big: boolean): PassSet {
  const [w, h] = artPx(big), out = {} as PassSet;
  for (const pass of ['color', 'pbr', 'glow'] as Pass[]){ const cv = canvas(w, h); drawLayer(cv.getContext('2d')!, w, pass, layer, d); out[pass] = cv; }
  return out;
}
/** bản in hoàn chỉnh gộp 3 lớp (cho phòng trưng bày, xem mẫu) */
export function renderFlat(d: ArtData, w = 512): PassSet {
  const h = Math.round(w * ART_H / 1000), out = {} as PassSet;
  for (const pass of ['color', 'pbr', 'glow'] as Pass[]){ const cv = canvas(w, h), g = cv.getContext('2d')!; for (const l of LAYERS) drawLayer(g, w, pass, l, d); out[pass] = cv; }
  return out;
}
export const TIER_COLORS = Object.fromEntries(TIERS.map(t => [t.key, t.color]));
