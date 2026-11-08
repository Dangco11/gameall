import * as THREE from 'three';
import { WEDDING as RULES } from '../shared/balance.ts';
import { C } from './houses.ts';
import type { Kit } from './kit.ts';
import { WEDDING } from './layout.ts';
import type { V2 } from './layout.ts';
import { textTexture } from './world.ts';
import type { WeddingRole, WeddingState } from '../shared/types.ts';

// Sân cưới làng quê, gói trong một khung hình: sân khấu có phông Song Hỷ và bàn thờ gia tiên ở sau,
// 8 bàn cỗ ghế nhựa đỏ ở giữa, cổng hoa bên phải, đèn lồng và dây đèn quanh rạp.
// Cả sân được dựng theo trục riêng rồi xoay RY quanh tâm, để sân khấu ở trên và mâm cỗ xếp thẳng xuống dưới
// đúng theo hướng camera nhìn: khung hình dọc 9:16 gói trọn cả đám cưới.
export interface Spot extends V2 { yaw: number }
const W = WEDDING;
const RED = 0xc8231d, PINK = 0xf2a6b8, WHITE = 0xf6f1e6, GOLD = 0xe2b23c;
export const RY = Math.atan2(0.62, 1);                           // hướng nhìn của camera trên mặt đất
const cosR = Math.cos(RY), sinR = Math.sin(RY);
export const toWorld = (lx: number, lz: number): V2 => ({ x: W.x + lx * cosR + lz * sinR, z: W.z - lx * sinR + lz * cosR });

// Tọa độ trong sân (x ngang, z sâu về phía người xem)
const L_TABLES: V2[] = [];
for (let r = 0; r < RULES.tables / 2; r++) for (let c = 0; c < 2; c++) L_TABLES.push({ x: -3.6 + c * 7.2, z: 1.2 + r * 5.3 });
const L_SEATS: Spot[] = L_TABLES.flatMap(t => Array.from({ length: RULES.seatsPerTable }, (_, s) => {
  const a = (s + 0.5) / RULES.seatsPerTable * Math.PI * 2;
  return { x: t.x + Math.cos(a) * 2.05, z: t.z + Math.sin(a) * 2.05, yaw: Math.atan2(-Math.cos(a), -Math.sin(a)) };
}));
const spot = (lx: number, lz: number, yaw: number): Spot => ({ ...toWorld(lx, lz), yaw: yaw + RY });

export const COUPLE = { bride: spot(-1.2, -6.4, 0), groom: spot(1.2, -6.4, 0) };
export const ENTRANCE: V2 = toWorld(10.5, 9);
export const VIEW: V2 = toWorld(0, 3.2);                         // tâm khung hình
export const SEATS: Spot[] = L_SEATS.map(s => spot(s.x, s.z, s.yaw));

export class WeddingStage {
  readonly group = new THREE.Group();
  readonly lights: THREE.Vector3[] = [];
  private board: BoardCanvas;

  setCouple(w: WeddingState | null){ this.board.draw(w); }

  constructor(kit: Kit){
    const put = (s: Parameters<Kit['put']>[1], c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0, rx = 0, rz = 0) => {
      const w = toWorld(x, z);
      kit.put(null, s, c, w.x, y, w.z, sx, sy, sz, ry + RY, rx, rz);
    };
    const light = (x: number, y: number, z: number) => { const w = toWorld(x, z); this.lights.push(new THREE.Vector3(w.x, y, w.z)); };
    // sân gạch, thảm đỏ từ bàn cỗ lên sân khấu
    put('box', 0xc9a07a, 0, 0.005, 5, 22, 0.04, 34);
    put('box', RED, 0, 0.03, 6, 2.2, 0.03, 23);
    // sân khấu, phông đỏ, cột vàng
    put('box', 0xa8432c, 0, 0, -8.5, 16, 0.5, 6);
    put('box', 0xd8364a, 0, 0.5, -11.3, 16, 5.4, 0.3);
    for (const sx of [-1, 1]){
      put('cyl', GOLD, sx * 7.6, 0.5, -11, 0.5, 5.6, 0.5);
      put('ball', PINK, sx * 7.6, 5.6, -11, 1.4, 1.2, 1.4);
      for (let i = 0; i < 6; i++) put('ball', i % 2 ? WHITE : PINK, sx * (7.6 - i * 0.55), 5.8 - i * 0.25, -11.1, 0.6, 0.6, 0.6);
      // loa thùng hai bên sân khấu
      put('box', 0x1e1e22, sx * 9.4, 0, -8.2, 1.2, 2.2, 1);
      put('cyl', 0x55555c, sx * 9.4, 1.4, -7.69, 0.7, 0.05, 0.7, 0, Math.PI / 2);
    }
    // bàn thờ gia tiên bên trái sân khấu: khăn đỏ, đôi nến, mâm quả
    put('box', 0x6b1f14, -5, 0.5, -10.4, 2.6, 1.2, 1.1);
    put('box', GOLD, -5, 1.7, -10.4, 2.7, 0.08, 1.15);
    for (const dx of [-1, 1]){ put('cyl', RED, -5 + dx, 1.78, -10.4, 0.18, 0.6, 0.18); put('glow', 0, -5 + dx, 2.38, -10.4, 0.12, 0.18, 0.12); }
    put('ball', 0xe8a83a, -5, 1.78, -10.4, 0.7, 0.45, 0.7);
    // bàn ký tên mừng cưới bên phải
    put('box', WHITE, 5, 0.5, -9.6, 2.4, 0.9, 1);
    put('box', RED, 5, 1.4, -9.6, 0.8, 0.5, 0.5);

    // 8 bàn cỗ: khăn trắng, mâm gà luộc, xôi gấc, bánh chưng, bát canh; ghế nhựa đỏ quanh bàn
    for (const t of L_TABLES){
      const x = t.x, z = t.z;
      put('cyl', 0x8a8a8a, x, 0, z, 0.2, 0.75, 0.2);
      put('cyl', WHITE, x, 0.75, z, 2.9, 0.06, 2.9);
      put('cyl', RED, x, 0.81, z, 1.6, 0.02, 1.6);
      put('ball', 0xe9c060, x - 0.35, 0.82, z - 0.2, 0.55, 0.35, 0.45);        // gà luộc
      put('ball', 0xd8342a, x + 0.4, 0.82, z - 0.15, 0.5, 0.3, 0.5);          // xôi gấc
      put('box', 0x3e7a3a, x + 0.05, 0.83, z + 0.4, 0.45, 0.22, 0.45);        // bánh chưng
      put('cyl', 0xf2ede0, x - 0.45, 0.83, z + 0.35, 0.4, 0.15, 0.4);         // bát canh
      for (const s of L_SEATS.filter(s => Math.hypot(s.x - t.x, s.z - t.z) < 2.5)) put('cyl', 0xd62828, s.x, 0, s.z, 0.5, 0.45, 0.5);
    }

    // rạp: cột tre quanh sân, diềm vải đỏ trắng, dây đèn chéo phía trên (không che mâm cỗ)
    const posts: [number, number][] = [];
    for (let i = 0; i <= 4; i++) posts.push([-10, -5 + i * 6.25], [10, -5 + i * 6.25]);
    for (const [x, z] of posts) put('cyl', C.bamboo, x, 0, z, 0.16, 4.6, 0.16);
    // diềm vải hai bên (không có diềm phía trước để khỏi che mâm)
    for (const x of [-10, 10]) for (let i = 0; i < 13; i++) put('box', i % 2 ? WHITE : RED, x, 4.2, -4 + i * 2, 0.05, 0.5, 2);
    for (const [x0, x1] of [[-10, 10], [10, -10]]) for (let i = 0; i <= 14; i++){
      const t = i / 14, x = x0 + (x1 - x0) * t, z = -5 + 25 * t, y = 4.4 - Math.sin(t * Math.PI) * 0.8;
      put('glow', 0, x, y, z, 0.16, 0.16, 0.16);
    }
    // đèn lồng đỏ treo ở bốn góc
    for (const [x, z] of [[-10, -5], [10, -5], [-10, 20], [10, 20]]){ put('ball', RED, x, 3.2, z, 0.8, 0.9, 0.8); put('glow', 0, x, 3.4, z, 0.3, 0.3, 0.3); light(x, 3.5, z); }

    // cổng hoa cưới ở lối vào bên phải
    const ex = 10.5, ez = 9;                                           // cổng hoa ở lối vào bên phải
    for (const dz of [-2, 2]) put('cyl', WHITE, ex, 0, ez + dz, 0.35, 3.6, 0.35);
    for (let i = 0; i <= 10; i++){ const a = i / 10 * Math.PI; put('ball', i % 2 ? PINK : WHITE, ex, 3.6 + Math.sin(a) * 1.2, ez - Math.cos(a) * 2, 0.7, 0.7, 0.7); }

    // chữ Song Hỷ trên phông sân khấu và biển cổng
    const hy = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.5), new THREE.MeshBasicMaterial({ map: hyTexture(), transparent: true, toneMapped: false }));
    const hp = toWorld(0, -11.13); hy.position.set(hp.x, 5.35, hp.z); hy.rotation.y = RY;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 0.8), new THREE.MeshBasicMaterial({ map: textTexture('VU QUY', '#c8231d', '#ffe9a8'), toneMapped: false }));
    const sp = toWorld(10.9, 9); sign.position.set(sp.x, 4.9, sp.z); sign.rotation.y = Math.PI / 2 + RY;
    // bảng Lễ Thành Hôn: ảnh và tên cô dâu (trái) chú rể (phải), vẽ lại mỗi khi đổi người
    this.board = new BoardCanvas();
    const board = new THREE.Mesh(new THREE.PlaneGeometry(10, 3.9), new THREE.MeshBasicMaterial({ map: this.board.texture, toneMapped: false }));
    const bp = toWorld(0, -11.12); board.position.set(bp.x, 3.15, bp.z); board.rotation.y = RY;
    this.group.add(hy, sign, board);
  }
}

function hyTexture(){
  const c = document.createElement('canvas'); c.width = 256; c.height = 200;
  const g = c.getContext('2d')!;
  g.fillStyle = '#ffd34d'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = 'bold 150px "Noto Serif CJK SC", "Microsoft YaHei", "SimSun", serif';
  g.fillText('囍', 128, 104);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Bảng Lễ Thành Hôn vẽ bằng canvas: nền đỏ viền vàng, hai ảnh tròn, tim ở giữa, tên bên dưới.
// Ảnh lấy qua /avatar/<id> của server; không có ảnh (cư dân DEMO, chưa tải được) thì vẽ chữ cái đầu.
class BoardCanvas {
  readonly texture: THREE.CanvasTexture;
  private canvas = document.createElement('canvas');
  private g: CanvasRenderingContext2D;
  private key = '';
  private imgs = new Map<string, HTMLImageElement | null>();
  private last: WeddingState | null = null;

  constructor(){
    this.canvas.width = 1024; this.canvas.height = 400;
    this.g = this.canvas.getContext('2d')!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.draw(null);
  }

  private image(r: WeddingRole){
    if (!r.avatar) return null;
    if (!this.imgs.has(r.id)){
      this.imgs.set(r.id, null);
      const img = new Image();
      img.onload = () => { this.imgs.set(r.id, img); this.key = ''; this.draw(this.last); };
      img.src = '/avatar/' + encodeURIComponent(r.id);
      if (this.imgs.size > 30) this.imgs.delete(this.imgs.keys().next().value as string);
    }
    return this.imgs.get(r.id) ?? null;
  }

  draw(w: WeddingState | null){
    this.last = w;
    const bride = w?.bride ?? null, groom = w?.groom ?? null;
    const key = JSON.stringify([bride?.id, bride?.name, groom?.id, groom?.name]);
    if (key === this.key) return;
    this.key = key;
    const g = this.g, W = 1024, H = 400;
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#c4141f'); bg.addColorStop(1, '#8e0c16');
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.strokeStyle = '#f2c94c'; g.lineWidth = 10; g.strokeRect(12, 12, W - 24, H - 24);
    g.lineWidth = 3; g.strokeRect(28, 28, W - 56, H - 56);
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#ffd96a';
    g.font = 'bold 50px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
    g.fillText('LỄ THÀNH HÔN', W / 2, 70);
    this.portrait(250, 195, bride, 'CÔ DÂU', 'Chờ cô dâu…');
    this.portrait(774, 195, groom, 'CHÚ RỂ', bride ? 'Chờ chú rể…' : '');
    // tim ở giữa
    g.save(); g.translate(W / 2, 200); g.scale(2.2, 2.2);
    g.beginPath(); g.moveTo(0, 12); g.bezierCurveTo(-26, -6, -14, -26, 0, -12); g.bezierCurveTo(14, -26, 26, -6, 0, 12);
    g.fillStyle = '#ff6a8a'; g.fill(); g.restore();
    this.texture.needsUpdate = true;
  }

  private portrait(cx: number, cy: number, r: WeddingRole | null, label: string, empty: string){
    const g = this.g, R = 92;
    g.save();
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.closePath();
    g.fillStyle = r ? hueOf(r.id) : 'rgba(255,255,255,0.12)'; g.fill();
    const img = r ? this.image(r) : null;
    if (img){ g.clip(); g.drawImage(img, cx - R, cy - R, R * 2, R * 2); }
    else {
      g.fillStyle = '#fff'; g.font = 'bold 84px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
      g.fillText(r ? initials(r.name) : '?', cx, cy + 4);
    }
    g.restore();
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.lineWidth = 8; g.strokeStyle = '#f2c94c'; g.stroke();
    g.fillStyle = '#fff'; g.font = 'bold 34px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
    g.fillText(fit(g, r ? r.name : empty, 330), cx, cy + R + 36);
    g.fillStyle = '#ffd96a'; g.font = 'bold 20px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
    g.fillText(label, cx, cy - R - 18 < 100 ? cy + R + 72 : cy - R - 18);
  }
}

function initials(name: string){
  const w = name.replace(/[^\p{L}\p{N}\s]/gu, '').trim().split(/\s+/).filter(Boolean);
  return ((w[0]?.[0] ?? '?') + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase();
}
function hueOf(id: string){ let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360; return `hsl(${h}, 55%, 45%)`; }
function fit(g: CanvasRenderingContext2D, text: string, max: number){
  if (g.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && g.measureText(t + '…').width > max) t = t.slice(0, -1);
  return t + '…';
}
