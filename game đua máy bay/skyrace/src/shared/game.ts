// Luật chơi dùng chung cho server và màn hình: máy bay, skill theo xu, thông số cuộc đua.

// Một vòng đua dài lapLen mét (màn hình tự kéo giãn theo đường bay 3D thật của bản đồ).
// Chỉ đua 1 vòng. Tốc độ gốc 62 m/s: một vòng chừng 7–8 phút, quà làm nhanh hơn.
export const RACE = {
  lapLen: 30_000,         // một vòng duy nhất, dài 30 km
  laps: 1,
  baseSpeed: 62,
  lobbyMs: 25_000,        // chờ người vào trước khi xuất phát
  nextLobbyMs: 15_000,    // các cuộc đua sau: người cũ tự xếp hàng, chờ ngắn hơn
  countdownMs: 4_000,     // 3, 2, 1, CẤT CÁNH
  graceMs: 25_000,        // người đầu về đích rồi thì những người khác còn 25 giây
  resultMs: 16_000,       // màn vinh danh nhà vô địch
  maxRacers: 60,
  idleKickMs: 15 * 60_000,   // 15 phút không bình luận, thả tim hay tặng quà thì rời đường đua
  gridCols: 6, gridGap: 26, gridLane: 11,  // xếp hàng trên đường băng: 6 chiếc một hàng cách nhau 11 m, hàng cách hàng 26 m
  takeoffM: 450,             // cất cánh: rời đường băng, leo lên đường bay trong 450 m đầu
  landM: 380,                // về đích xong hạ cánh, lăn bánh rồi dừng trong 380 m
  likesPerBoost: 2,          // tap tim: cứ 2 tim = 0,1 hoa hồng (20 tim = 1 hoa hồng = tăng tốc nhẹ 3 giây)
  maxRepeat: 10,             // quà combo x50: dùng skill tối đa 10 lần, phần dư cộng thời gian
} as const;

// 10 mẫu máy bay. Máy bay VIP mạ vàng không gõ chọn được: chỉ có khi tặng quà 999 xu.
export type PlaneKey = 'racer' | 'fighter' | 'airliner' | 'prop' | 'supersonic' | 'bizjet' | 'transport' | 'stunt' | 'future' | 'golden';
export const PLANES: { key: PlaneKey; name: string; words: string[]; vip?: boolean }[] = [
  { key: 'racer', name: 'Máy bay đua', words: ['dua', 'racer', 'race'] },
  { key: 'fighter', name: 'Tiêm kích', words: ['tiemkich', 'fighter', 'f16', 'f22', 'mig', 'chiendau'] },
  { key: 'airliner', name: 'Máy bay chở khách', words: ['chokhach', 'boeing', 'airbus', 'airliner', '737', '747'] },
  { key: 'prop', name: 'Cánh quạt cổ điển', words: ['canhquat', 'prop', 'cessna', 'spitfire'] },
  { key: 'supersonic', name: 'Siêu thanh', words: ['sieuthanh', 'concorde', 'supersonic'] },
  { key: 'bizjet', name: 'Phản lực tư nhân', words: ['tunhan', 'bizjet', 'private', 'gulfstream', 'phanluc'] },
  { key: 'transport', name: 'Vận tải quân sự', words: ['vantai', 'transport', 'c130', 'hercules'] },
  { key: 'stunt', name: 'Nhào lộn', words: ['nhaolon', 'naolon', 'stunt', 'extra', 'bieudien'] },
  { key: 'future', name: 'Máy bay tương lai', words: ['tuonglai', 'future', 'futuristic', 'scifi'] },
  { key: 'golden', name: 'VIP mạ vàng', words: [], vip: true },
];
export const planeName = (k: PlaneKey) => PLANES.find(p => p.key === k)?.name ?? String(k);
export const PICKABLE = PLANES.filter(p => !p.vip);

// Bảng màu sơn máy bay, gõ tên màu để đổi
export const COLORS: { name: string; words: string[]; hex: number }[] = [
  { name: 'Đỏ', words: ['do', 'red'], hex: 0xd8262b },
  { name: 'Cam', words: ['cam', 'orange'], hex: 0xf2701c },
  { name: 'Vàng', words: ['vang', 'yellow'], hex: 0xf5c518 },
  { name: 'Xanh lá', words: ['xanhla', 'green'], hex: 0x1f9a4c },
  { name: 'Xanh dương', words: ['xanh', 'xanhduong', 'blue'], hex: 0x1d4fa8 },
  { name: 'Tím', words: ['tim', 'purple'], hex: 0x6a2bc4 },
  { name: 'Hồng', words: ['hong', 'pink'], hex: 0xe83e8c },
  { name: 'Trắng', words: ['trang', 'white'], hex: 0xeef1f5 },
  { name: 'Đen', words: ['den', 'black'], hex: 0x1d2027 },
  { name: 'Bạc', words: ['bac', 'silver'], hex: 0xa9b3bd },
];
export const GOLD = 0xd4a63a;

// Skill theo số xu của MỘT món quà (quà combo x5 thì dùng 5 lần). Lấy mức cao nhất đạt được.
// Các mức 1, 5, 10, 50, 99, 299, 999 tác động thẳng lên máy bay của người tặng; 20, 30, 199, 500 là đòn đánh đối thủ.
export type SkillKey = 'boost' | 'engine' | 'nitro' | 'missile' | 'thunder' | 'rocket' | 'super' | 'bomb' | 'jet' | 'meteor' | 'vip';
export const SKILLS: { xu: number; key: SkillKey; icon: string; name: string; desc: string; gift: string }[] = [
  { xu: 1, key: 'boost', icon: '💨', name: 'Tăng tốc nhẹ', desc: '+25% tốc độ 3 giây', gift: 'Hoa hồng' },
  { xu: 5, key: 'engine', icon: '⚙️', name: 'Tăng tốc động cơ', desc: '+50% tốc độ 4 giây', gift: 'Tim ngón tay' },
  { xu: 10, key: 'nitro', icon: '🔥', name: 'Boost', desc: '+90% tốc độ 4 giây, lửa phản lực', gift: 'quà 10 xu' },
  { xu: 20, key: 'missile', icon: '🎯', name: 'Tên lửa', desc: 'Bắn choáng máy bay phía trước', gift: 'quà 20 xu' },
  { xu: 30, key: 'thunder', icon: '⚡', name: 'Sét đánh', desc: 'Đánh chậm Top 3 trong 4 giây', gift: 'Bánh donut' },
  { xu: 50, key: 'rocket', icon: '🚀', name: 'Tên lửa tăng tốc', desc: 'Gắn tên lửa đẩy +160% 3 giây', gift: 'quà 50 xu' },
  { xu: 99, key: 'super', icon: '🌟', name: 'Siêu Boost', desc: '+120% 6 giây kèm khiên', gift: 'quà 99 xu' },
  { xu: 199, key: 'bomb', icon: '💣', name: 'Bom tấn', desc: 'Ném bom người dẫn đầu', gift: 'quà 199 xu' },
  { xu: 299, key: 'jet', icon: '🛩️', name: 'Chế độ phản lực', desc: 'Đốt sau cực đại + khiên 10 giây', gift: 'quà 299 xu' },
  { xu: 500, key: 'meteor', icon: '☄️', name: 'Mưa thiên thạch', desc: 'Cả đường đua chậm, bạn bứt phá', gift: 'quà 500 xu' },
  { xu: 999, key: 'vip', icon: '👑', name: 'Triệu hồi máy bay VIP', desc: 'Đổi sang máy bay mạ vàng, phi đội hộ tống', gift: 'quà 999 xu' },
];
export const skillFor = (xu: number) => [...SKILLS].reverse().find(s => xu >= s.xu) ?? SKILLS[0];
export const skillOf = (k: SkillKey) => SKILLS.find(s => s.key === k) ?? SKILLS[0];

// Thời gian hiệu ứng (ms)
export const FX_MS = {
  boost: 3000, engine: 4000, nitro: 4000, rocket: 3000, super: 6000, superShield: 6000, stun: 2500, thunderSlow: 4000,
  bombStun: 5000, bombSlow: 3000, jet: 10_000, meteorSlow: 6000, meteorSuper: 8000, meteorShield: 10_000,
  vipSuper: 12_000, vipShield: 15_000, vipEscort: 15_000,
  likeBoost: 300, padBoost: 1800, crash: 1600, shortCrash: 2200,   // likeBoost: 2 tim = 0,1 × 3 giây của 1 hoa hồng
  missileFlight: 1200, bombFall: 1500, maxStack: 20_000, maxShield: 60_000,
} as const;
// cộng thêm vào hệ số tốc độ (lấy mức cao nhất đang bật)
export const SPEED = { boost: 0.25, engine: 0.5, nitro: 0.9, super: 1.2, rocket: 1.6, stun: 0.2, slow: 0.55, catchUp: 0.15, catchUpGap: 1500 } as const;
export const BOMB_RADIUS = 80;

// Cờ trạng thái gửi xuống màn hình
export const F = {
  BOOST: 1, NITRO: 2, SHIELD: 4, STUN: 8, SLOW: 16, SUPER: 32, ESCORT: 64, ROCKET: 128, ENGINE: 256, JET: 512,
  SHORT: 1024,   // đang bay đường tắt mạo hiểm
  CRASH: 2048,   // vừa va chướng ngại vật / đâm trên đường tắt
} as const;

// Chữ không dấu, viết thường, bỏ khoảng trắng và dấu ! ở đầu: "!F-16" → "f16", "Chở khách" → "chokhach"
export const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd').toLowerCase().replace(/[^a-z0-9]/g, '');
export const JOIN_WORDS = new Set(['1', 'vao', 'join', 'bay', 'thamgia']);
// bình luận để máy quay soi máy bay của mình
export const WATCH_WORDS = new Set(['xem', 'xemtoi', 'xemem', 'xemanh', 'soi', 'cam', 'quaytoi', 'watch']);
export const planeFromText = (t: string) => { const n = norm(t); return n ? PICKABLE.find(p => p.words.includes(n))?.key ?? null : null; };
export const colorFromText = (t: string) => { const n = norm(t).replace(/^mau/, ''); return n ? COLORS.find(c => c.words.includes(n)) ?? null : null; };

export const fmtTime = (ms: number) => { const s = Math.max(0, ms) / 1000, m = Math.floor(s / 60); return `${m}:${(s - m * 60).toFixed(1).padStart(4, '0')}`; };
