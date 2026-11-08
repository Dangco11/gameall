// Luật chơi dùng chung cho server và màn hình: hai phe đẩy một chiếc xe trên đường đồi.
// Xe xuất phát ở giữa (0 m). Phe Đỏ đẩy sang phải về căn cứ Xanh, Phe Xanh đẩy sang trái về căn cứ Đỏ.
// Xe chạm căn cứ đối phương (±TRACK) thì phe đẩy tới thắng ván, xe về giữa, ván mới.

export type Team = 'do' | 'xanh';
export const TEAMS: Record<Team, { name: string; short: string; color: string; dark: string; dir: 1 | -1; emoji: string }> = {
  do: { name: 'PHE ĐỎ', short: 'ĐỎ', color: '#ff2d55', dark: '#8a0a24', dir: 1, emoji: '🔴' },
  xanh: { name: 'PHE XANH', short: 'XANH', color: '#1fa2ff', dark: '#0a3a8a', dir: -1, emoji: '🔵' },
};
export const other = (t: Team): Team => (t === 'do' ? 'xanh' : 'do');
export const TRACK_OPTIONS = [100000, 200000, 300000];
export const DEFAULT_TRACK = 200000;                // mét mỗi bên tính từ giữa (cả đường 400 000 m)

// Bậc quà: số xu tối thiểu → linh vật / phương tiện 3D được triệu hồi, tổng số mét đẩy và thời gian đẩy (giây).
// Lực đẩy chia đều trong suốt thời gian linh vật xuất hiện (không dịch chuyển tức thời), hai phe cùng một quy tắc.
// Combo (tặng nhiều cái) nhân số mét; thời gian kéo dài thêm nhưng có trần.
export type PushFx = 'push' | 'tho' | 'daibang' | 'rongcon' | 'maybay' | 'phuong' | 'rongvang' | 'phico' | 'sutu' | 'thanlong' | 'phuonglua' | 'phanluc' | 'longphung';
export interface Tier { xu: number; fx: PushFx; name: string; icon: string; m: number; dur: number; desc: string }
export const TIERS: Tier[] = [
  { xu: 1, fx: 'tho', name: 'Thỏ Vàng', icon: '🐰', m: 1500, dur: 3, desc: 'Thỏ vàng chạy sau xe, tạo gió đẩy' },
  { xu: 5, fx: 'daibang', name: 'Đại Bàng', icon: '🦅', m: 5000, dur: 3, desc: 'Đại bàng sà qua, tạo luồng gió' },
  { xu: 10, fx: 'rongcon', name: 'Rồng Con', icon: '🐲', m: 9000, dur: 3.5, desc: 'Rồng con bay theo xe, truyền năng lượng' },
  { xu: 99, fx: 'sutu', name: 'Sư Tử Vàng', icon: '🦁', m: 22000, dur: 4.5, desc: 'Sư tử vàng chạy cạnh xe, gầm vang' },
  { xu: 199, fx: 'thanlong', name: 'Thần Long', icon: '🐲', m: 30000, dur: 5.5, desc: 'Thần long khổng lồ giáng thế' },
  { xu: 299, fx: 'phuonglua', name: 'Phượng Hoàng Lửa', icon: '🔥', m: 45000, dur: 6, desc: 'Phượng hoàng lửa tung cánh, mưa lửa' },
  { xu: 500, fx: 'longphung', name: 'Long Phụng Hội Tụ', icon: '👑', m: 70000, dur: 7, desc: 'Rồng vàng và phượng hoàng hội tụ, đại cảnh' },
];
export const comboDur = (dur: number, count: number) => Math.min(dur * 2.2, dur * (1 + 0.15 * (count - 1)));
export const tierFor = (xu: number) => { let t = TIERS[0]; for (const x of TIERS) if (xu >= x.xu) t = x; return t; };
export const LIKE_STEP = 10;          // mỗi 10 tim của một người
export const LIKE_M = 300;            // đẩy 300 m
export const FOLLOW_M = 1000, SHARE_M = 2000;
export const ROUND_PAUSE = 7000;      // nghỉ giữa hai ván (ms)
export const FINISH_SECS = 10;        // xe chạm căn cứ đối phương: đếm ngược 10 giây, giữ được mới thắng

export const norm = (s: string) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
// bình luận chọn phe: "1", "do", "đỏ", "red" → Đỏ · "2", "xanh", "blue" → Xanh
export function teamFromComment(text: string): Team | null {
  const t = norm(text);
  if (/^(1|do|phe do|doi do|red|team do)$/.test(t)) return 'do';
  if (/^(2|xanh|phe xanh|doi xanh|blue|team xanh)$/.test(t)) return 'xanh';
  return null;
}
