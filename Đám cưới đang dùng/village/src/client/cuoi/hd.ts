import * as THREE from 'three';
import type { Pose } from './cast.ts';

// Cô dâu chú rể 3D tỉ lệ người thật: áo dài lụa trắng bóng thêu chỉ bạc (cô dâu thêu dây hoa dọc thân và tay áo, đội mấn trắng;
// chú rể áo dài gấm đỏ thêu mặt tròn kim tuyến vàng trước ngực, quần đen, giày da đen). Dựng hoàn toàn bằng code, không cần file model:
// thân tiện tròn (Lathe), tà áo trước sau tung theo bước chân, hoa văn thêu vẽ bằng canvas làm cả màu, độ kim loại và độ nổi của chỉ.
// Các khớp (hông, eo, cổ, vai, khuỷu, gối) nhận đúng góc tư thế của người chibi nên mọi động tác cũ đều dùng được.
// Đơn vị bên trong là mét, phóng lên cho cao ngang người chibi trong sân.
export type HdKind = 'bride' | 'groom';
export const SCALE = 1.22;
// mọi nhân vật to gấp đôi cho dễ nhìn trên điện thoại (?to=1 về cỡ cũ, ?to=1.5 ...)
export const BIG = Number(new URLSearchParams(location.search).get('to')) || 2;

// Ảnh đại diện TikTok gắn lên mặt người 3D: đĩa tròn đặt ngay trước mặt (mỗi người một đĩa riêng, huỷ cùng người)
export function avatarDisc(cur: THREE.Mesh | undefined, parent: THREE.Object3D, r: number, tex: THREE.Texture | null){
  if (!tex){ if (cur) cur.visible = false; return cur; }
  if (!cur){
    cur = new THREE.Mesh(new THREE.CircleGeometry(r, 40), new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.05 }));
    cur.renderOrder = 2; cur.frustumCulled = false; parent.add(cur);
  }
  const m = cur.material as THREE.MeshBasicMaterial;
  if (m.map !== tex){ m.map = tex; m.needsUpdate = true; }
  cur.visible = true;
  return cur;
}

/* ---------------------------------------------------------------- hoa văn thêu */
type Draw = (g: CanvasRenderingContext2D, w: number, h: number) => void;
// Vẽ cùng một hoa văn hai lần: bản màu (nền lụa trắng, chỉ bạc) và bản mặt nạ (chỉ trắng trên nền đen) cho độ kim loại và độ nổi
// Bảng màu vải: lụa trắng thêu chỉ bạc (cô dâu), gấm đỏ thêu chỉ kim tuyến vàng (chú rể)
const PAL = { white: ['#f7f5f0', '#a9adb6', '#e9ebef'], red: ['#a90f1c', '#e9b949', '#fbf3e4'] } as const;
type Pal = keyof typeof PAL;
function embroidery(w: number, h: number, draw: Draw, pal: Pal = 'white'){
  const [base, ink, hi] = PAL[pal];
  const mk = (bg: string, ink: string, hi: string) => {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d')!;
    g.fillStyle = bg; g.fillRect(0, 0, w, h);
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = ink; g.fillStyle = ink; (g as any).hi = hi;
    draw(g, w, h);
    return c;
  };
  const color = new THREE.CanvasTexture(mk(base, ink, hi));
  color.colorSpace = THREE.SRGBColorSpace;
  const mask = new THREE.CanvasTexture(mk('#000000', '#ffffff', '#1a1a1a'));
  for (const t of [color, mask]){ t.anisotropy = 4; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping; }
  return { color, mask };
}
// Một cuộn xoắn hoa văn: đường xoắn ốc nhỏ dần, có lá nhọn hai bên
function curl(g: CanvasRenderingContext2D, x: number, y: number, r: number, dir: number, rot: number, lw: number){
  g.lineWidth = lw; g.beginPath();
  for (let i = 0; i <= 40; i++){
    const k = i / 40, a = rot + dir * k * Math.PI * 2.2, rr = r * (1 - k * 0.85);
    const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr;
    if (i) g.lineTo(px, py); else g.moveTo(px, py);
  }
  g.stroke();
  for (const k of [0.15, 0.35]){
    const a = rot + dir * k * Math.PI * 2.2, rr = r * (1 - k * 0.85);
    leaf(g, x + Math.cos(a) * rr, y + Math.sin(a) * rr, r * 0.45, a + dir * 1.9);
  }
}
function leaf(g: CanvasRenderingContext2D, x: number, y: number, len: number, a: number){
  g.beginPath();
  g.moveTo(x, y);
  g.quadraticCurveTo(x + Math.cos(a - 0.5) * len * 0.6, y + Math.sin(a - 0.5) * len * 0.6, x + Math.cos(a) * len, y + Math.sin(a) * len);
  g.quadraticCurveTo(x + Math.cos(a + 0.5) * len * 0.6, y + Math.sin(a + 0.5) * len * 0.6, x, y);
  g.fill();
}
function rosette(g: CanvasRenderingContext2D, x: number, y: number, r: number, petals: number, lw: number){
  g.lineWidth = lw;
  for (let i = 0; i < petals; i++){
    const a = i / petals * Math.PI * 2;
    g.beginPath(); g.ellipse(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55, r * 0.42, r * 0.2, a, 0, Math.PI * 2); g.stroke();
  }
  g.beginPath(); g.arc(x, y, r * 0.18, 0, Math.PI * 2); g.fill();
}
function beads(g: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, n: number, r: number){
  for (let i = 0; i <= n; i++){ const k = i / n; g.beginPath(); g.arc(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k, r, 0, Math.PI * 2); g.fill(); }
}
// Dây hoa chạy dọc: thân dây uốn sóng, mỗi khúc một cuộn xoắn trái phải xen kẽ và một bông hoa
function vine(g: CanvasRenderingContext2D, cx: number, y0: number, y1: number, amp: number, size: number){
  const steps = Math.max(2, Math.round((y1 - y0) / (size * 2.2)));
  g.lineWidth = size * 0.09; g.beginPath();
  for (let i = 0; i <= 60; i++){ const k = i / 60, y = y0 + (y1 - y0) * k, x = cx + Math.sin(k * steps * Math.PI) * amp; if (i) g.lineTo(x, y); else g.moveTo(x, y); }
  g.stroke();
  for (let i = 0; i < steps; i++){
    const k = (i + 0.5) / steps, y = y0 + (y1 - y0) * k, side = i % 2 ? 1 : -1, x = cx + Math.sin(k * steps * Math.PI) * amp;
    curl(g, x + side * size * 0.55, y, size * 0.5, side, side > 0 ? Math.PI : 0, size * 0.07);
    if (i % 2 === 0) rosette(g, x - side * size * 0.35, y - size * 0.5, size * 0.32, 6, size * 0.05);
  }
}
// Mặt tròn hoa văn trước ngực áo chú rể: các vòng hoa cánh, vòng hạt, cuộn xoắn tỏa ra
function medallion(g: CanvasRenderingContext2D, x: number, y: number, r: number){
  g.lineWidth = r * 0.03;
  for (const k of [1, 0.78, 0.42]){ g.beginPath(); g.arc(x, y, r * k, 0, Math.PI * 2); g.stroke(); }
  for (let i = 0; i < 12; i++){ const a = i / 12 * Math.PI * 2; curl(g, x + Math.cos(a) * r * 0.6, y + Math.sin(a) * r * 0.6, r * 0.17, i % 2 ? 1 : -1, a, r * 0.025); }
  for (let i = 0; i < 36; i++){ const a = i / 36 * Math.PI * 2; g.beginPath(); g.arc(x + Math.cos(a) * r * 0.89, y + Math.sin(a) * r * 0.89, r * 0.03, 0, Math.PI * 2); g.fill(); }
  rosette(g, x, y, r * 0.38, 10, r * 0.03);
  for (let i = 0; i < 8; i++){ const a = i / 8 * Math.PI * 2 + 0.2; leaf(g, x + Math.cos(a) * r, y + Math.sin(a) * r, r * 0.28, a); }
}

// Hoa sen: cánh xếp ba lớp tô màu kem, viền chỉ vàng, gân cánh; gương sen ở giữa
function lotus(g: CanvasRenderingContext2D, x: number, y: number, r: number){
  const hi = (g as any).hi as string, ink = g.strokeStyle;
  const petal = (a: number, len: number, wid: number) => {
    const tx = x + Math.sin(a) * len, ty = y - Math.cos(a) * len, nx = Math.cos(a) * wid, ny = Math.sin(a) * wid;
    g.beginPath(); g.moveTo(x, y);
    g.bezierCurveTo(x + nx * 1.3, y + ny * 1.3 - len * 0.35, tx + nx, ty + ny + len * 0.15, tx, ty);
    g.bezierCurveTo(tx - nx, ty - ny + len * 0.15, x - nx * 1.3, y - ny * 1.3 - len * 0.35, x, y);
    g.fillStyle = hi; g.fill(); g.lineWidth = r * 0.05; g.strokeStyle = ink; g.stroke();
    g.lineWidth = r * 0.025; g.beginPath(); g.moveTo(x + (tx - x) * 0.2, y + (ty - y) * 0.2); g.lineTo(x + (tx - x) * 0.8, y + (ty - y) * 0.8); g.stroke();
  };
  for (const a of [-1.35, 1.35]) petal(a, r * 0.85, r * 0.3);
  for (const a of [-0.85, 0.85]) petal(a, r * 0.95, r * 0.32);
  for (const a of [-0.4, 0.4]) petal(a, r, r * 0.3);
  petal(0, r * 1.05, r * 0.3);
  g.fillStyle = ink; g.beginPath(); g.ellipse(x, y - r * 0.08, r * 0.28, r * 0.12, 0, 0, Math.PI * 2); g.fill();
}
// Lá sen tròn có gân tỏa
function lotusLeaf(g: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number){
  g.lineWidth = r * 0.06; g.beginPath(); g.ellipse(x, y, r, r * 0.45, rot, 0, Math.PI * 2); g.stroke();
  const c = Math.cos(rot), s = Math.sin(rot);
  for (let i = 0; i < 9; i++){ const a = i / 9 * Math.PI * 2, ex = Math.cos(a) * r, ey = Math.sin(a) * r * 0.45; g.beginPath(); g.moveTo(x, y); g.lineTo(x + ex * c - ey * s, y + ex * s + ey * c); g.stroke(); }
}
// Cành sen: thân cong từ dưới lên, bông sen ở ngọn
function lotusBranch(g: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, r: number){
  g.lineWidth = r * 0.08; g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo(x0 + (x1 - x0) * 1.4, (y0 + y1) / 2, x1, y1 + r * 0.1); g.stroke();
  lotus(g, x1, y1, r);
}
// Mây lành: ba cuộn tròn nối nhau, đuôi mây kéo dài
function cloud(g: CanvasRenderingContext2D, x: number, y: number, s: number, dir = 1){
  curl(g, x, y, s * 0.5, dir, Math.PI / 2, s * 0.09);
  curl(g, x + dir * s * 0.75, y + s * 0.05, s * 0.38, -dir, Math.PI / 2, s * 0.08);
  curl(g, x - dir * s * 0.6, y + s * 0.15, s * 0.3, -dir, -Math.PI / 2, s * 0.07);
  g.lineWidth = s * 0.09;
  g.beginPath(); g.moveTo(x - dir * s * 0.9, y + s * 0.45); g.bezierCurveTo(x - dir * s * 0.2, y + s * 0.6, x + dir * s * 0.6, y + s * 0.4, x + dir * s * 1.6, y + s * 0.55); g.stroke();
}
// Rồng vàng uốn khúc: thân chữ S có vảy, vây lưng nhọn, móng vuốt; đầu có sừng, râu và bờm cuộn
function dragon(g: CanvasRenderingContext2D, cx: number, y0: number, y1: number, amp: number, thick: number, head = true){
  const N = 90, pts: [number, number][] = [];
  for (let i = 0; i <= N; i++){ const k = i / N; pts.push([cx + Math.sin(k * Math.PI * 2.6 + 0.4) * amp * (0.6 + k * 0.4), y0 + (y1 - y0) * k]); }
  const w = (k: number) => thick * (0.35 + 0.65 * Math.sin(Math.min(1, k * 1.15) * Math.PI * 0.95 + 0.15));
  const hi = (g as any).hi as string, ink = g.strokeStyle as string;
  for (let i = 0; i < N; i++){ const [x, y] = pts[i], [x2, y2] = pts[i + 1]; g.lineWidth = w(i / N); g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke(); }
  // vảy: các vòng cung sáng trên thân
  g.fillStyle = hi;
  for (let i = 2; i < N - 2; i += 2){ const [x, y] = pts[i]; g.beginPath(); g.arc(x, y, w(i / N) * 0.28, Math.PI * 0.1, Math.PI * 0.9); g.fill(); }
  g.fillStyle = ink;
  // vây lưng
  for (let i = 4; i < N - 4; i += 4){
    const [x, y] = pts[i], [x2, y2] = pts[i + 1], dx = x2 - x, dy = y2 - y, l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, ww = w(i / N);
    g.beginPath(); g.moveTo(x + nx * ww * 0.45, y + ny * ww * 0.45); g.lineTo(x + nx * ww * 1.05 + dx * 1.5, y + ny * ww * 1.05 + dy * 1.5); g.lineTo(x + nx * ww * 0.45 + dx * 3, y + ny * ww * 0.45 + dy * 3); g.fill();
  }
  // móng vuốt
  for (const k of [0.3, 0.62]){
    const [x, y] = pts[Math.round(k * N)], side = Math.sin(k * Math.PI * 2.6 + 0.4) > 0 ? -1 : 1, ww = w(k);
    g.lineWidth = ww * 0.3; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + side * ww * 1.2, y - ww * 0.2, x + side * ww * 1.6, y + ww * 0.5); g.stroke();
    for (let c = -1; c <= 1; c++) leaf(g, x + side * ww * 1.6, y + ww * 0.5, ww * 0.45, Math.PI / 2 + c * 0.6 - side * 0.4);
  }
  // đầu rồng ở đầu trên của thân
  if (!head) return;
  const [hx, hy] = pts[N], s = thick;
  g.beginPath(); g.ellipse(hx, hy - s * 0.2, s * 0.85, s * 0.6, -0.2, 0, Math.PI * 2); g.fill();
  g.beginPath(); g.moveTo(hx + s * 0.3, hy - s * 0.3); g.quadraticCurveTo(hx + s * 1.5, hy - s * 0.25, hx + s * 1.25, hy + s * 0.2); g.lineTo(hx + s * 0.2, hy + s * 0.15); g.fill();   // mõm
  g.fillStyle = hi; g.beginPath(); g.arc(hx + s * 0.2, hy - s * 0.45, s * 0.16, 0, Math.PI * 2); g.fill(); g.fillStyle = ink;   // mắt
  g.lineWidth = s * 0.14;
  for (const d of [-0.9, -0.5]){ g.beginPath(); g.moveTo(hx - s * 0.2, hy - s * 0.6); g.quadraticCurveTo(hx - s * 0.5 + d * s * 0.3, hy - s * 1.6, hx - s * 1.1 + d * s * 0.2, hy - s * 1.8); g.stroke(); }   // sừng
  for (const d of [1, -1]) curl(g, hx + s * 1.1, hy + s * (0.25 + d * 0.15), s * 0.55, d, 0, s * 0.1);   // râu
  for (let i = 0; i < 4; i++) curl(g, hx - s * (0.8 + i * 0.25), hy + s * (0.1 + i * 0.35), s * 0.35, -1, Math.PI, s * 0.09);   // bờm
}
// Sóng nước chân tà
function waves(g: CanvasRenderingContext2D, x0: number, x1: number, y: number, s: number){
  g.lineWidth = s * 0.08;
  for (let row = 0; row < 3; row++) for (let x = x0 + (row % 2) * s * 0.5; x < x1; x += s){ g.beginPath(); g.arc(x, y + row * s * 0.35, s * 0.45, Math.PI, Math.PI * 2); g.stroke(); }
}
// Viền hoa văn dọc mép tà
function border(g: CanvasRenderingContext2D, x: number, y0: number, y1: number, s: number){
  g.lineWidth = s * 0.12; for (const d of [-0.5, 0.5]){ g.beginPath(); g.moveTo(x + d * s, y0); g.lineTo(x + d * s, y1); g.stroke(); }
  g.lineWidth = s * 0.08;
  for (let y = y0 + s; y < y1; y += s * 1.4){ g.beginPath(); g.moveTo(x, y - s * 0.4); g.lineTo(x + s * 0.35, y); g.lineTo(x, y + s * 0.4); g.lineTo(x - s * 0.35, y); g.closePath(); g.stroke(); }
}

// Bản đồ thêu cho từng phần áo. Thân áo là mặt tiện tròn: giữa ảnh (u = 0,5) là chính giữa ngực.
// Cô dâu: gấm đỏ thêu sen trắng viền vàng; chú rể: gấm đỏ thêu rồng vàng uốn khúc giữa mây lành.
const TEX: Record<string, Draw> = {
  brideTorso: (g, w, h) => {
    lotusBranch(g, w * 0.47, h * 0.98, w * 0.55, h * 0.42, w * 0.06);
    lotusBranch(g, w * 0.53, h * 0.98, w * 0.45, h * 0.7, w * 0.045);
    for (const s of [-1, 1]) curl(g, w * (0.5 + s * 0.09), h * 0.22, w * 0.03, s, s > 0 ? 0 : Math.PI, w * 0.004);
    beads(g, w * 0.36, h * 0.98, w * 0.64, h * 0.98, 24, w * 0.004);
  },
  brideFront: (g, w, h) => {
    // tà trước: đầm sen, ba bông sen nở trên cành, lá sen, sóng nước chân tà, viền hoa văn hai mép
    lotusLeaf(g, w * 0.32, h * 0.8, w * 0.16, -0.3); lotusLeaf(g, w * 0.68, h * 0.7, w * 0.14, 0.4);
    lotusBranch(g, w * 0.45, h * 0.95, w * 0.42, h * 0.22, w * 0.15);
    lotusBranch(g, w * 0.55, h * 0.95, w * 0.62, h * 0.45, w * 0.13);
    lotusBranch(g, w * 0.4, h * 0.95, w * 0.33, h * 0.62, w * 0.11);
    for (let i = 0; i < 5; i++) leaf(g, w * (0.3 + i * 0.1), h * (0.08 + (i % 2) * 0.03), w * 0.05, -Math.PI / 2 + (i - 2) * 0.3);
    waves(g, w * 0.08, w * 0.92, h * 0.95, w * 0.09);
    for (const x of [0.07, 0.93]) border(g, w * x, h * 0.01, h * 0.99, w * 0.04);
  },
  brideBack: (g, w, h) => { lotusBranch(g, w * 0.5, h * 0.9, w * 0.5, h * 0.3, w * 0.15); cloud(g, w * 0.3, h * 0.7, w * 0.1, 1); waves(g, w * 0.08, w * 0.92, h * 0.95, w * 0.09); },
  groomTorso: (g, w, h) => {
    // rồng bò từ eo vắt lên ngực, đầu ngẩng gần vai; mây hai bên
    dragon(g, w * 0.5, h * 0.98, h * 0.14, w * 0.05, w * 0.045);
    cloud(g, w * 0.4, h * 0.32, w * 0.03, -1); cloud(g, w * 0.6, h * 0.62, w * 0.03, 1);
  },
  groomFront: (g, w, h) => {
    // tà trước: đuôi rồng uốn khúc, mây lành, sóng nước chân tà, viền hai mép
    dragon(g, w * 0.5, h * 0.86, h * 0.0, w * 0.16, w * 0.12, false);   // khúc đuôi nối từ thân áo
    cloud(g, w * 0.25, h * 0.55, w * 0.1, 1); cloud(g, w * 0.74, h * 0.35, w * 0.09, -1); cloud(g, w * 0.7, h * 0.8, w * 0.08, 1);
    waves(g, w * 0.08, w * 0.92, h * 0.95, w * 0.09);
    for (const x of [0.07, 0.93]) border(g, w * x, h * 0.01, h * 0.99, w * 0.04);
  },
  groomBack: (g, w, h) => { cloud(g, w * 0.35, h * 0.3, w * 0.12, 1); cloud(g, w * 0.62, h * 0.62, w * 0.1, -1); waves(g, w * 0.08, w * 0.92, h * 0.95, w * 0.09); },
  sleeve: (g, w, h) => {
    // tay áo cô dâu: bông sen nhỏ và dây lá mặt ngoài cánh tay (u = 0,75), cổ tay viền vàng
    vine(g, w * 0.75, h * 0.3, h * 0.95, w * 0.02, w * 0.08);
    lotus(g, w * 0.75, h * 0.24, w * 0.08);
    g.fillRect(0, h * 0.02, w, h * 0.05);
  },
  sleeveG: (g, w, h) => {
    for (let i = 0; i < 3; i++) cloud(g, w * 0.72, h * (0.2 + i * 0.26), w * 0.07, i % 2 ? 1 : -1);
    g.fillRect(0, h * 0.02, w, h * 0.05);
  },
  man: (g, w, h) => {
    // khăn vấn đỏ: hoa sen nhỏ xen cuộn xoắn vàng chạy quanh vành, viền vàng trên dưới
    for (let i = 0; i < 12; i++){ if (i % 2) lotus(g, w * (i + 0.5) / 12, h * 0.75, h * 0.42); else curl(g, w * (i + 0.5) / 12, h * 0.5, h * 0.3, 1, 0, h * 0.05); }
    g.fillRect(0, 0, w, h * 0.07); g.fillRect(0, h * 0.93, w, h * 0.07);
  },
  plain: () => {},
};
const texCache = new Map<string, { color: THREE.Texture; mask: THREE.Texture }>();
const tex = (k: string, w = 512, h = 1024, pal: Pal = 'white') => { const key = k + '|' + pal; let t = texCache.get(key); if (!t){ t = embroidery(w, h, TEX[k], pal); texCache.set(key, t); } return t; };

// Lụa satin: bóng mềm (sheen), chỉ thêu là kim loại bạc và hơi nổi
function satin(k: string, color = 0xffffff, w?: number, h?: number, pal: Pal = 'white'){
  const t = tex(k, w, h, pal);
  return new THREE.MeshPhysicalMaterial({ color, map: t.color, metalnessMap: t.mask, metalness: 1, bumpMap: t.mask, bumpScale: 1.2,
    roughness: 0.36, sheen: pal === 'red' ? 0.45 : 1, sheenRoughness: 0.32, sheenColor: new THREE.Color(pal === 'red' ? 0xff5a4a : 0xffffff), clearcoat: 0.2, clearcoatRoughness: 0.4, side: THREE.DoubleSide });
}

/* ---------------------------------------------------------------- hình khối */
const lathe = (pts: [number, number][], seg = 40) => new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg, Math.PI, Math.PI * 2);
// Tà áo: tấm lụa hẹp ở eo, xòe dần xuống dưới, cong theo thân; mặt trước hướng +z
function flap(top: number, bottom: number, len: number, curve: number){
  const g = new THREE.PlaneGeometry(1, 1, 10, 24), p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++){
    const u = p.getX(i), v = p.getY(i) + 0.5, w = top + (bottom - top) * (1 - v);   // v = 1 ở eo
    p.setXYZ(i, u * w, -(1 - v) * len, -u * u * w * curve + (1 - v) * 0.03);
  }
  g.computeVertexNormals();
  return g;
}
// Đầu hình trứng: nửa dưới thon dần thành cằm trái xoan, má đầy
function headGeo(bride: boolean){
  const g = new THREE.SphereGeometry(0.1, 40, 30), p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++){
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    if (y < 0){ const k = -y / 0.1; y *= 1.22; x *= 1 - k * k * (bride ? 0.42 : 0.32); z *= 1 - k * k * 0.18; }
    p.setXYZ(i, x * (bride ? 0.88 : 0.93), y * 1.05, z * 0.98);
  }
  g.computeVertexNormals();
  return g;
}
const capsule = (r: number, len: number) => new THREE.CapsuleGeometry(r, len, 6, 16).translate(0, -len / 2 - r * 0.6, 0);

// gắn mesh vào nhóm, có đổ bóng
const put = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
};
// ly rượu vang đỏ (đáy ly ở gốc nhóm)
export function buildGlass(g: THREE.Group){
  const glassM = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.05, clearcoat: 1, transparent: true, opacity: 0.45, depthWrite: false });
  put(g, new THREE.CylinderGeometry(0.03, 0.022, 0.09, 16, 1, true), glassM, 0, 0.04, 0);
  put(g, new THREE.CylinderGeometry(0.027, 0.02, 0.05, 16), new THREE.MeshStandardMaterial({ color: 0xc8303a, roughness: 0.2, transparent: true, opacity: 0.9 }), 0, 0.02, 0);
  g.visible = false;
}
// bó hoa cô dâu: hoa hồng trắng, hồng phấn, lá xanh, ruy băng
export function buildBouquet(g: THREE.Group){
  const rose = (c: number) => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.5, sheen: 1, sheenColor: new THREE.Color(0xffffff) });
  const cols = [0xffffff, 0xf8d7e0, 0xffffff, 0xf2b8c8, 0xfff4e8];
  for (let i = 0; i < 11; i++){
    const a = i * 2.4, r = i ? 0.03 + (i % 3) * 0.012 : 0;
    put(g, new THREE.IcosahedronGeometry(0.024, 1), rose(cols[i % cols.length]), Math.cos(a) * r, 0.02 + (i ? 0 : 0.01), Math.sin(a) * r).scale.set(1, 0.8, 1);
  }
  for (let i = 0; i < 6; i++){ const a = i / 6 * Math.PI * 2; const l = put(g, new THREE.SphereGeometry(0.02, 8, 6), new THREE.MeshStandardMaterial({ color: 0x3f7a3a, roughness: 0.6 }), Math.cos(a) * 0.06, 0.0, Math.sin(a) * 0.06); l.scale.set(1.6, 0.4, 0.8); l.rotation.y = -a; }
  put(g, new THREE.CylinderGeometry(0.014, 0.01, 0.14, 8), new THREE.MeshStandardMaterial({ color: 0xf6efe6, roughness: 0.5 }), 0, -0.08, 0);
}

type Joint = { g: THREE.Group };
const SKIN = 0xf3c3a2, HAIR = 0x4e2c1c;

export class HdFigure {
  readonly root = new THREE.Group();
  private tiltG = new THREE.Group(); private body = new THREE.Group();
  private waist = new THREE.Group(); private head = new THREE.Group();
  private armL = new THREE.Group(); private armR = new THREE.Group(); private elbowL = new THREE.Group(); private elbowR = new THREE.Group();
  private legL = new THREE.Group(); private legR = new THREE.Group(); private kneeL = new THREE.Group(); private kneeR = new THREE.Group();
  private front!: THREE.Mesh; private back!: THREE.Mesh;
  readonly bouquet = new THREE.Group(); readonly glass = new THREE.Group();
  private pivot: number;

  readonly kind: HdKind;
  constructor(kind: HdKind){
    this.kind = kind;
    const bride = kind === 'bride';
    // số đo (mét): cô dâu cao 1,63, chú rể 1,73
    const H = bride ? 1.63 : 1.73, hip = bride ? 0.86 : 0.92, waistY = bride ? 1.02 : 1.08, sh = bride ? 1.36 : 1.45, shX = bride ? 0.175 : 0.205;
    this.pivot = H / 2;
    this.root.add(this.tiltG); this.tiltG.add(this.body);
    this.tiltG.position.y = this.pivot; this.body.position.y = -this.pivot;
    const skin = new THREE.MeshPhysicalMaterial({ color: SKIN, roughness: 0.5, sheen: 0.5, sheenColor: new THREE.Color(0xffc8b0) });
    const hairM = new THREE.MeshPhysicalMaterial({ color: HAIR, roughness: 0.42, sheen: 1, sheenRoughness: 0.3, sheenColor: new THREE.Color(0xa0705a) });
    // cả hai mặc áo dài gấm đỏ thêu kim tuyến vàng: cô dâu thêu sen trắng, chú rể thêu rồng
    const pal: Pal = 'red';
    const torsoM = satin(bride ? 'brideTorso' : 'groomTorso', 0xffffff, 512, 1024, pal), sleeveM = satin(bride ? 'sleeve' : 'sleeveG', 0xffffff, 512, 512, pal);
    const add = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
    };

    // ---- chân: quần lụa trắng (cô dâu ống rộng); cô dâu giày trắng, chú rể giày đỏ mũi vàng
    const pantsM = new THREE.MeshPhysicalMaterial({ color: 0xf8f6f1, roughness: 0.42, sheen: 1, sheenColor: new THREE.Color(0xffffff) });
    const shoeM = bride ? new THREE.MeshPhysicalMaterial({ color: 0xf6efe4, roughness: 0.3, clearcoat: 0.6 })
      : new THREE.MeshPhysicalMaterial({ color: 0xb3121c, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 });
    const goldM = new THREE.MeshPhysicalMaterial({ color: 0xe9b949, metalness: 1, roughness: 0.28 });
    const thigh = hip * 0.5, shin = hip * 0.5 - 0.04;
    for (const [leg, knee, sx] of [[this.legL, this.kneeL, -1], [this.legR, this.kneeR, 1]] as [THREE.Group, THREE.Group, number][]){
      leg.position.set(sx * (bride ? 0.08 : 0.09), hip, 0); this.body.add(leg);
      add(leg, new THREE.CylinderGeometry(bride ? 0.085 : 0.078, bride ? 0.08 : 0.068, thigh, 16).translate(0, -thigh / 2, 0), pantsM);
      knee.position.y = -thigh; leg.add(knee);
      add(knee, new THREE.CylinderGeometry(bride ? 0.08 : 0.066, bride ? 0.085 : 0.064, shin, 16).translate(0, -shin / 2, 0), pantsM);
      const shoe = add(knee, new THREE.SphereGeometry(1, 16, 10), shoeM, 0, -shin - 0.015, 0.04);
      shoe.scale.set(0.047, 0.034, 0.125);
      if (!bride){ const tip = add(knee, new THREE.SphereGeometry(1, 12, 8), goldM, 0, -shin - 0.005, 0.1); tip.scale.set(0.03, 0.02, 0.04); }   // mũi giày thêu vàng
    }

    // ---- eo trở lên: thân áo, cổ áo đứng, cổ, đầu
    this.waist.position.y = waistY; this.body.add(this.waist);
    const prof: [number, number][] = bride
      ? [[0.13, 0.84], [0.145, 0.92], [0.125, 1.02], [0.135, 1.12], [0.16, 1.22], [0.158, 1.29], [0.15, 1.34], [0.11, 1.38], [0.055, 1.41]]
      : [[0.15, 0.9], [0.155, 1.0], [0.15, 1.1], [0.17, 1.22], [0.185, 1.32], [0.18, 1.4], [0.15, 1.45], [0.06, 1.5]];
    const torso = add(this.waist, lathe(prof), torsoM, 0, -waistY, 0);
    torso.scale.set(1, 1, bride ? 0.74 : 0.7);
    const top = prof[prof.length - 1][1];
    add(this.waist, new THREE.CylinderGeometry(0.058, 0.064, 0.06, 20, 1, true), torsoM, 0, top - waistY + 0.03, 0);     // cổ áo đứng
    add(this.waist, new THREE.TorusGeometry(0.06, 0.004, 6, 28), goldM, 0, top - waistY + 0.06, 0).rotation.x = Math.PI / 2;   // viền vàng cổ áo
    add(this.waist, new THREE.CylinderGeometry(bride ? 0.043 : 0.05, 0.05, 0.1, 14), skin, 0, top - waistY + 0.07, 0);
    // vai tròn đầy dưới lớp gấm
    for (const sx of [-1, 1]) add(this.waist, new THREE.SphereGeometry(bride ? 0.05 : 0.06, 16, 12), torsoM, sx * (shX - 0.03), sh - waistY - 0.025, 0).scale.set(1.1, 0.7, 0.85);

    // ---- đầu kiểu phim hoạt hình: đầu to hơn người thật một chút, mắt to tròn long lanh, cười tươi, má hồng
    const HEAD = 1.3;
    const headY = sh + (bride ? 0.2 : 0.21) + 0.12 * (HEAD - 1);
    this.head.position.y = headY - waistY; this.head.scale.setScalar(HEAD); this.waist.add(this.head);
    add(this.head, headGeo(bride), skin);
    const white = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.12, clearcoat: 1 });
    const iris = new THREE.MeshPhysicalMaterial({ color: 0x5a3018, roughness: 0.1, clearcoat: 1 }), pupil = new THREE.MeshStandardMaterial({ color: 0x120806, roughness: 0.1 });
    const shine = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const brow = new THREE.MeshStandardMaterial({ color: 0x3a2214, roughness: 0.8 });
    for (const sx of [-1, 1]){
      const ex = sx * 0.035, ey = 0.004;
      add(this.head, new THREE.SphereGeometry(0.021, 20, 16), white, ex, ey, 0.083).scale.set(1.05, 1.1, 0.5);
      add(this.head, new THREE.SphereGeometry(0.0145, 18, 14), iris, ex, ey - 0.002, 0.091).scale.set(1, 1.05, 0.4);
      add(this.head, new THREE.SphereGeometry(0.0075, 12, 10), pupil, ex, ey - 0.002, 0.095).scale.z = 0.4;
      add(this.head, new THREE.SphereGeometry(0.0038, 8, 6), shine, ex + 0.005, ey + 0.006, 0.097);       // đốm sáng trong mắt
      add(this.head, new THREE.SphereGeometry(0.0018, 6, 5), shine, ex - 0.005, ey - 0.007, 0.097);
      // mi trên cong dày (cô dâu có đuôi mi vểnh)
      const lash = add(this.head, new THREE.TorusGeometry(0.021, bride ? 0.0032 : 0.0022, 6, 18, Math.PI * 0.9), pupil, ex, ey + 0.001, 0.09);
      lash.rotation.z = Math.PI * 0.05; lash.scale.set(1.05, 1.1, 0.6);
      if (bride){ const wing = add(this.head, new THREE.CapsuleGeometry(0.0022, 0.008, 3, 6), pupil, ex + sx * 0.022, ey + 0.012, 0.086); wing.rotation.z = -sx * 0.9; }
      const b = add(this.head, new THREE.CapsuleGeometry(bride ? 0.0028 : 0.0042, 0.026, 4, 8), brow, sx * 0.037, 0.04, 0.088); b.rotation.z = Math.PI / 2 - sx * 0.14;
      const ear = add(this.head, new THREE.SphereGeometry(0.02, 12, 10), skin, sx * 0.087, 0.0, 0.0); ear.scale.set(0.45, 1, 0.75);
      if (bride){ const e = add(this.head, new THREE.SphereGeometry(0.008, 10, 8), goldM, sx * 0.09, -0.03, 0.004); e.scale.y = 1.6; }   // bông tai vàng
      const cheek = add(this.head, new THREE.SphereGeometry(0.02, 12, 10), new THREE.MeshStandardMaterial({ color: 0xf48a8a, transparent: true, opacity: bride ? 0.4 : 0.22, roughness: 0.6, depthWrite: false }), sx * 0.054, -0.026, 0.074); cheek.scale.set(1.2, 0.7, 0.4);
    }
    const nose = add(this.head, new THREE.SphereGeometry(0.01, 14, 10), skin, 0, -0.022, 0.095); nose.scale.set(1, 0.9, 0.8);
    // miệng cười hé: lòng miệng đỏ thẫm, viền môi hồng đỏ
    const mouth = add(this.head, new THREE.SphereGeometry(0.017, 18, 10, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x9a3034, roughness: 0.6 }), 0, -0.046, 0.086);
    mouth.scale.set(1.15, 0.75, 0.45);
    const lipM = new THREE.MeshPhysicalMaterial({ color: bride ? 0xe0404a : 0xc4706a, roughness: 0.3, clearcoat: bride ? 0.7 : 0 });
    add(this.head, new THREE.TorusGeometry(0.0195, 0.0028, 6, 20, Math.PI), lipM, 0, -0.046, 0.087).rotation.z = Math.PI;

    if (bride){
      // tóc nâu búi gọn sau gáy dưới khăn vấn, rẽ ngôi giữa, hai lọn tóc mai xoăn nhẹ hai bên má
      const cap = add(this.head, new THREE.SphereGeometry(0.106, 32, 18, 0, Math.PI * 2, 0, Math.PI * 0.6), hairM, 0, 0.006, -0.008); cap.scale.set(0.95, 1.08, 1.03); cap.rotation.x = -0.55;
      for (const sx of [-1, 1]){
        const side = add(this.head, new THREE.SphereGeometry(0.05, 16, 12), hairM, sx * 0.077, -0.005, -0.015); side.scale.set(0.42, 1.25, 0.95);
        const lock = add(this.head, new THREE.TorusGeometry(0.035, 0.0045, 6, 16, Math.PI * 1.3), hairM, sx * 0.085, -0.07, 0.035);   // lọn tóc mai
        lock.rotation.set(0, sx * 1.4, Math.PI / 2 + sx * 0.3);
      }
      add(this.head, new THREE.SphereGeometry(0.062, 20, 14), hairM, 0, -0.035, -0.1).scale.set(1.1, 0.9, 0.85);   // búi tóc
      // khăn vấn đỏ thêu vàng: vành tròn dày ngả về sau, hoa cài bên trái
      const man = add(this.head, new THREE.TorusGeometry(0.106, 0.046, 20, 48), satin('man', 0xffffff, 1024, 128, 'red'), 0, 0.112, -0.03);
      man.rotation.x = -1.2;
      add(this.head, new THREE.CircleGeometry(0.1, 32), satin('plain', 0xffffff, 64, 64, 'red'), 0, 0.13, -0.022).rotation.x = -1.2;   // đỉnh khăn
      const flowerM = [0xffffff, 0xf8c8d4, 0xffe9a8].map(c => new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.45, sheen: 1, sheenColor: new THREE.Color(0xffffff) }));
      for (let i = 0; i < 5; i++){ const a = i * 1.3; add(this.head, new THREE.IcosahedronGeometry(0.014, 1), flowerM[i % 3], -0.08 + Math.cos(a) * 0.018, 0.1 + Math.sin(a) * 0.016, 0.055 - i * 0.004); }
      for (let i = 0; i < 3; i++){ const t = add(this.head, new THREE.SphereGeometry(0.004, 8, 6), goldM, -0.096, 0.07 - i * 0.022, 0.05); t.scale.y = 1.4; }   // trâm tua vàng
    } else {
      // tóc nâu bồng bềnh, mái rủ lệch vuốt sang một bên, hai bên mai gọn
      const cap = add(this.head, new THREE.SphereGeometry(0.11, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52), hairM, 0, 0.012, -0.006); cap.scale.set(0.97, 1.2, 1.05); cap.rotation.x = -0.4;
      const tufts: [number, number, number, number, number, number][] = [
        [0.0, 0.085, 0.03, 0.055, 0.035, 0.3], [-0.045, 0.075, 0.045, 0.045, 0.03, 0.6], [0.045, 0.08, 0.04, 0.05, 0.032, -0.4],
        [-0.02, 0.055, 0.075, 0.042, 0.022, 0.9], [0.03, 0.06, 0.072, 0.04, 0.02, -0.7], [-0.06, 0.045, 0.06, 0.03, 0.02, 1.1],
        [0.0, 0.1, -0.03, 0.06, 0.035, 0], [-0.05, 0.085, -0.04, 0.045, 0.03, 0.4], [0.05, 0.085, -0.035, 0.045, 0.03, -0.4],
      ];
      for (const [x, y, z, r, flat, rz] of tufts){ const t = add(this.head, new THREE.SphereGeometry(r, 16, 12), hairM, x, y, z); t.scale.set(1.15, flat / r, 1); t.rotation.set(0.35, 0, rz * 0.5); }
      // mái rủ xuống trán thành mấy lọn nhọn
      for (const [x, rz] of [[-0.035, 0.5], [-0.005, 0.25], [0.028, 0.1]] as [number, number][]){ const f = add(this.head, new THREE.ConeGeometry(0.018, 0.05, 8), hairM, x, 0.06, 0.085); f.rotation.set(Math.PI - 0.5, 0, rz); }
      for (const sx of [-1, 1]){ const side = add(this.head, new THREE.SphereGeometry(0.04, 12, 10), hairM, sx * 0.083, 0.025, -0.015); side.scale.set(0.4, 1.05, 1.2); }
    }

    // ---- tay: tay áo dài thêu chỉ vàng, khuỷu hơi co, bàn tay thon
    const upper = bride ? 0.27 : 0.29, fore = bride ? 0.25 : 0.27;
    for (const [arm, elbow, sx] of [[this.armL, this.elbowL, -1], [this.armR, this.elbowR, 1]] as [THREE.Group, THREE.Group, number][]){
      arm.position.set(sx * shX, sh - waistY - 0.02, 0); this.waist.add(arm);
      add(arm, capsule(bride ? 0.04 : 0.047, upper - 0.06), sleeveM).scale.x = -sx;   // hoa văn tay áo luôn ở mặt ngoài
      elbow.position.y = -upper; elbow.rotation.x = -0.18; arm.add(elbow);
      add(elbow, capsule(bride ? 0.034 : 0.04, fore - 0.05), sleeveM).scale.x = -sx;
      const hand = add(elbow, new THREE.SphereGeometry(1, 16, 12), skin, 0, -fore - 0.045, 0.005); hand.scale.set(0.026, 0.06, 0.04);
      const thumb = add(elbow, new THREE.CapsuleGeometry(0.009, 0.03, 4, 8), skin, -sx * 0.022, -fore - 0.03, 0.022); thumb.rotation.z = sx * 0.5;
      if (sx > 0){ this.glass.position.set(0, -fore - 0.08, 0.03); elbow.add(this.glass); }
    }
    buildGlass(this.glass);

    // ---- tà áo dài trước và sau: từ eo phủ xuống (cô dâu tới mắt cá, chú rể qua gối)
    const len = bride ? waistY - 0.1 : waistY - 0.5, z = bride ? 0.115 : 0.12;
    this.front = add(this.body, flap(bride ? 0.22 : 0.26, bride ? 0.44 : 0.36, len, 1.6), satin(bride ? 'brideFront' : 'groomFront', 0xffffff, 512, 1024, pal), 0, waistY, z);
    this.back = add(this.body, flap(bride ? 0.22 : 0.26, bride ? 0.46 : 0.36, len, 1.6), satin(bride ? 'brideBack' : 'groomBack', 0xffffff, 512, 1024, pal), 0, waistY, -z);
    this.back.rotation.y = Math.PI;

    if (bride){
      buildBouquet(this.bouquet);
      this.bouquet.position.set(0, 1.1 - waistY, 0.22); this.bouquet.rotation.x = 0.7; this.bouquet.scale.setScalar(1.35); this.waist.add(this.bouquet);
    }
    this.root.scale.setScalar(SCALE * BIG);
  }

  // ảnh đại diện phủ lên mặt (đơn vị trong đầu: đầu bán kính khoảng 0,1)
  private avatar?: THREE.Mesh;
  setAvatar(tex: THREE.Texture | null){
    this.avatar = avatarDisc(this.avatar, this.head, 0.095, tex);
    this.avatar?.position.set(0, -0.004, 0.108);
  }

  // Cập nhật theo tư thế chibi. bouquet: đang cầm hoa; glass: đang nâng ly; flare: đang xoay, tà áo bay
  update(x: number, z: number, yaw: number, p: Pose, sit: boolean, opts: { bouquet: boolean; glass: boolean; flare: number; anim?: string }){
    const y = p.bob + p.lift * 1.12 * BIG;
    this.root.position.set(x, y, z);
    this.root.rotation.y = yaw + p.spin;
    this.tiltG.rotation.x = p.tilt;
    this.waist.rotation.x = p.bend;
    this.head.rotation.set(p.headTilt * 0.4, p.headTilt, 0);
    this.armL.rotation.set(p.armL, 0, p.armLz); this.armR.rotation.set(p.armR, 0, p.armRz);
    // khuỷu co thêm khi tay đưa ra trước hay giơ lên, cho dáng mềm
    this.elbowL.rotation.x = -0.15 - Math.max(0, -p.armL) * 0.25; this.elbowR.rotation.x = -0.15 - Math.max(0, -p.armR) * 0.25;
    this.legL.rotation.x = p.legL; this.legR.rotation.x = p.legR;
    // ngồi (chân đưa ngang ra trước): gối gập cho cẳng chân thẳng đứng; đá chân thì gối hơi co
    this.kneeL.rotation.x = sit || p.legL < -1.2 ? -p.legL : Math.max(0, -p.legL) * 0.4;
    this.kneeR.rotation.x = sit || p.legR < -1.2 ? -p.legR : Math.max(0, -p.legR) * 0.4;
    // tà trước bị chân đẩy ra trước, tà sau bị chân đá ra sau; xoay nhanh thì tà bay xòe
    const fwd = Math.max(0, -p.legL, -p.legR), backK = Math.max(0, p.legL, p.legR);
    this.front.rotation.x = -fwd * 0.7 - opts.flare;
    this.back.rotation.x = backK * 0.7 + opts.flare;
    this.bouquet.visible = opts.bouquet; this.glass.visible = opts.glass;
  }

  // huỷ hình khối và chất liệu riêng của người này (ảnh hoa văn thêu dùng chung, giữ lại)
  dispose(){
    this.root.removeFromParent();
    this.root.traverse(o => { const m = o as THREE.Mesh; if (m.isMesh){ m.geometry.dispose(); for (const mm of Array.isArray(m.material) ? m.material : [m.material]) mm.dispose(); } });
  }
}
