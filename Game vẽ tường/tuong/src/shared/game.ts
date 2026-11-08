// Dữ liệu dùng chung: kích thước tường, bậc quà → kiểu tranh, bảng màu sơn.
// Server quyết định tranh gì, vẽ ở đâu; màn hình vẽ lại đúng như vậy (tải lại trang tường vẫn còn nguyên).

/* ------------------------------------------------------------ tường */
// Tường gồm các MẢNG nối tiếp sang phải, mỗi mảng một bức tranh to kín mảng. Chỉ giữ vài mảng gần nhất, mảng sau sinh ra khi cần.
export const WALL = { w: 28, h: 20 };                 // một mảng tường (mét)
export const CANVAS = { w: 1792, h: 1280 };           // điểm ảnh lớp sơn của một mảng (64 điểm / mét)
export const KEEP = 3;                                // số mảng (bức tranh) gần nhất được giữ lại
export const MAX_ARTS = KEEP;
// vùng đặt tranh trên mảng (tỉ lệ 0..1): chừa chân tường cho nhân vật đứng phía trước khỏi che
export const ART_AREA = { x0: 0.02, x1: 0.98, y0: 0.02, y1: 0.8 };

/* ------------------------------------------------------------ kiểu tranh */
export type ArtKind = 'tag' | 'splat' | 'bomber' | 'portrait' | 'gold' | 'angel' | 'squad' | 'dragon' | 'demon' | 'mural';
export interface Tier { xu: number; kind: ArtKind; name: string; icon: string; desc: string; size: number }
// size: bán kính khung chân dung (điểm ảnh của lớp sơn), hoặc độ lớn vệt sơn
export const TIERS: Tier[] = [
  { xu: 1, kind: 'splat', name: 'Bom Sơn', icon: '🎨', desc: 'Sơn văng tung toé, ảnh đại diện của bạn ở giữa', size: 150 },
  { xu: 5, kind: 'bomber', name: 'Máy Bay Phun Sơn', icon: '✈️', desc: 'Máy bay bắn sơn lên tường thành chân dung của bạn, khung neon', size: 190 },
  { xu: 10, kind: 'portrait', name: 'Chân Dung', icon: '🖼️', desc: 'Ảnh đại diện pixel trong khung cầu vồng', size: 195 },
  { xu: 30, kind: 'gold', name: 'Cánh Vàng', icon: '🦅', desc: 'Chân dung cánh máy vàng', size: 185 },
  { xu: 99, kind: 'angel', name: 'Cánh Thiên Thần', icon: '😇', desc: 'Chân dung cánh thiên thần bảy màu', size: 190 },
  { xu: 199, kind: 'squad', name: 'Phi Đội Trái Tim', icon: '💖', desc: 'Ba máy bay bắn sơn thành trái tim khổng lồ có ảnh của bạn', size: 215 },
  { xu: 299, kind: 'dragon', name: 'Rồng Phun Sơn', icon: '🐉', desc: 'Rồng phun lửa sơn thành chân dung của bạn trong vòng lửa', size: 190 },
  { xu: 500, kind: 'demon', name: 'Cánh Rồng Vương Miện', icon: '👑', desc: 'Chân dung lớn cánh rồng, đội vương miện', size: 195 },
  { xu: 999, kind: 'mural', name: 'Bích Hoạ Huyền Thoại', icon: '🌟', desc: 'Bích hoạ khổng lồ cao kín tường, pháo hoa, lên Bảng Vàng', size: 380 },
];
// khung của một bức tranh trên lớp sơn: rộng, cao (điểm ảnh) và vị trí điểm neo theo chiều cao (0..1 từ đỉnh)
export function artBox(kind: ArtKind, size: number, nameLen: number): { w: number; h: number; ay: number } {
  if (kind === 'tag') { const s = Math.max(40, size * 0.75); return { w: s * (nameLen * 0.75 + 4), h: s * 2.6, ay: 0.38 }; }
  if (kind === 'splat') return { w: size * 4.2, h: size * 4.6, ay: 0.42 };
  if (kind === 'squad') return { w: size * 3.2, h: size * 3.4, ay: 0.45 };
  const big = kind === 'mural' ? 2.9 : kind === 'demon' ? 2.6 : kind === 'portrait' || kind === 'bomber' ? 1.6 : kind === 'dragon' ? 2.0 : 2.4;
  return { w: size * 2 * big + size, h: size * 3.6, ay: 0.4 };
}
// cỡ tranh để khung vừa kín vùng đặt tranh của một mảng
export function fitSize(kind: ArtKind, nameLen: number) {
  const b = artBox(kind, 100, nameLen), W = CANVAS.w * (ART_AREA.x1 - ART_AREA.x0), H = CANVAS.h * (ART_AREA.y1 - ART_AREA.y0);
  return Math.round(100 * Math.min(W / b.w, H / b.h));
}
export const tierFor = (d: number) => { let t = TIERS[0]; for (const x of TIERS) if (d >= x.xu) t = x; return t; };
export const LIKES_PER_BOMB = 20;

/* ------------------------------------------------------------ màu sơn */
export const COLORS: { key: string; name: string; hex: string; words: RegExp }[] = [
  { key: 'do', name: 'đỏ', hex: '#ff2d55', words: /^(do|red)$/ },
  { key: 'cam', name: 'cam', hex: '#ff8a1f', words: /^(cam|orange)$/ },
  { key: 'vang', name: 'vàng', hex: '#ffd60a', words: /^(vang|yellow)$/ },
  { key: 'xanhla', name: 'xanh lá', hex: '#3ddc5a', words: /^(xanh la|luc|green)$/ },
  { key: 'xanh', name: 'xanh dương', hex: '#1fa2ff', words: /^(xanh|xanh duong|blue)$/ },
  { key: 'tim', name: 'tím', hex: '#a35bff', words: /^(tim|purple)$/ },
  { key: 'hong', name: 'hồng', hex: '#ff4fc3', words: /^(hong|pink)$/ },
  { key: 'trang', name: 'trắng', hex: '#f5f5f5', words: /^(trang|white)$/ },
  { key: 'den', name: 'đen', hex: '#1c1c1c', words: /^(den|black)$/ },
  { key: 'bac', name: 'bạc', hex: '#c8d2dc', words: /^(bac|silver)$/ },
];
export const colorByKey = new Map(COLORS.map(c => [c.key, c]));
export const norm = (s: string) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
