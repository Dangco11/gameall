// Quán Bar Online (cảnh LIVE riêng): người xem bình luận là vào quán, gọi đồ uống bằng số hoặc tên món,
// tặng quà từ 1 xu tới 500 xu, càng nhiều xu hiệu ứng càng VIP. Mọi con số của quán nằm ở đây, server lẫn màn hình cùng dùng.
// Chỉ là hiệu ứng trong game, quà không đổi ra tiền hay phần thưởng.

export type GlassKind = 'highball' | 'hurricane' | 'martini' | 'coupe' | 'tumbler' | 'mason' | 'flute' | 'can' | 'copper';
export type Garnish = 'orange' | 'lime' | 'lemon' | 'strawberry' | 'peach' | 'mint' | 'cherry' | 'pineapple' | 'gold' | '';
export interface Drink {
  key: DrinkKey; no: number; name: string; short: string; icon: string; kind: string;
  glass: GlassKind; liquid: number; liquid2?: number;       // liquid2: lớp dưới (đổi màu từ đáy lên)
  opacity: number; ice: number; straw: number | 0; garnish: Garnish; fizz: boolean; foam: boolean; vip?: boolean;
  words: string[];                                            // cách gọi (không dấu, viết thường)
}
export type DrinkKey = 'cam' | 'bluelagoon' | 'sunrise' | 'sodachanh' | 'mocktaildau' | 'tradao' | 'cola' | 'mojito' | 'champagne';
export const DRINKS: Drink[] = [
  { key: 'cam', short: 'Cam ép', no: 1, name: 'Nước cam ép', icon: '🍊', kind: 'Nước trái cây', glass: 'highball', liquid: 0xff9a1f, opacity: 0.92, ice: 3, straw: 0xffffff, garnish: 'orange', fizz: false, foam: true, words: ['nuoc cam', 'cam ep', 'cam', 'orange'] },
  { key: 'bluelagoon', short: 'Blue Lagoon', no: 2, name: 'Blue Lagoon', icon: '🍸', kind: 'Cocktail', glass: 'hurricane', liquid: 0x18a8ff, opacity: 0.7, ice: 4, straw: 0x1a1a1a, garnish: 'pineapple', fizz: true, foam: false, words: ['blue lagoon', 'blue', 'xanh'] },
  { key: 'sunrise', short: 'Sunrise', no: 3, name: 'Tequila Sunrise', icon: '🌅', kind: 'Cocktail', glass: 'highball', liquid: 0xffb020, liquid2: 0xd81b3a, opacity: 0.8, ice: 3, straw: 0xd81b3a, garnish: 'cherry', fizz: false, foam: false, words: ['tequila', 'sunrise', 'binh minh'] },
  { key: 'sodachanh', short: 'Soda chanh', no: 4, name: 'Soda chanh', icon: '🍋', kind: 'Soda', glass: 'tumbler', liquid: 0xe8ffd0, opacity: 0.35, ice: 4, straw: 0x39c46a, garnish: 'lemon', fizz: true, foam: false, words: ['soda chanh', 'soda', 'chanh'] },
  { key: 'mocktaildau', short: 'Mocktail dâu', no: 5, name: 'Mocktail dâu', icon: '🍓', kind: 'Mocktail', glass: 'coupe', liquid: 0xff3d7a, opacity: 0.75, ice: 0, straw: 0, garnish: 'strawberry', fizz: false, foam: true, words: ['mocktail dau', 'mocktail', 'dau', 'strawberry'] },
  { key: 'tradao', short: 'Trà đào', no: 6, name: 'Trà đào cam sả', icon: '🍑', kind: 'Trà trái cây', glass: 'mason', liquid: 0xe07a2a, opacity: 0.78, ice: 5, straw: 0xff8fb0, garnish: 'peach', fizz: false, foam: false, words: ['tra dao', 'dao', 'tra', 'peach'] },
  { key: 'cola', short: 'Cola', no: 7, name: 'Cola đá', icon: '🥤', kind: 'Nước ngọt', glass: 'tumbler', liquid: 0x3a1408, opacity: 0.94, ice: 4, straw: 0xd81b3a, garnish: 'lemon', fizz: true, foam: true, words: ['cola', 'coca', 'pepsi', 'nuoc ngot'] },
  { key: 'mojito', short: 'Mojito', no: 8, name: 'Mojito bạc hà', icon: '🌿', kind: 'Cocktail', glass: 'highball', liquid: 0xd8ffc8, opacity: 0.4, ice: 5, straw: 0x111111, garnish: 'mint', fizz: true, foam: false, words: ['mojito', 'bac ha', 'mint'] },
  { key: 'champagne', short: 'Champagne', no: 9, name: 'Champagne VIP Gold', icon: '🥂', kind: 'Đặc biệt VIP', glass: 'flute', liquid: 0xf2d16b, opacity: 0.72, ice: 0, straw: 0, garnish: 'gold', fizz: true, foam: true, vip: true, words: ['champagne', 'sam panh', 'vip', 'gold'] },
];
export const drinkOf = (k: string) => DRINKS.find(d => d.key === k) ?? DRINKS[0];

// Nhận đồ uống trong bình luận: "1".."9", "số 3", "gọi mojito", "cho 1 trà đào", "món 5"
export function parseDrink(text: string): DrinkKey | null {
  const s = text.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!s || s.length > 40) return null;
  const n = /^(?:goi |cho |mon |so |ly |order )*([1-9])(?: ly| coc)?$/.exec(s);
  if (n) return DRINKS[+n[1] - 1].key;
  const body = s.replace(/^((goi|cho|order|mot|1|ly|coc|them|minh|em|anh|chi|toi|tui)\s+)+/, '');
  // tên dài trước để "soda chanh" không bị nhận thành "chanh"
  const all = DRINKS.flatMap(d => d.words.map(w => [w, d.key] as const)).sort((a, b) => b[0].length - a[0].length);
  for (const [w, k] of all) if (body === w || (s.startsWith('goi ') || s.startsWith('cho ')) && body.startsWith(w)) return k;
  return null;
}

// Thang quà: lấy mức cao nhất đạt được. level 1 nhỏ, 2 trung bình, 3 lớn, 4 VIP, 5 đặc biệt.
export type BarShowKey = 'dance1' | 'dance5' | 'outfit' | 'laser' | 'vipdance' | 'stage' | 'faceoff' | 'co2' | 'vip' | 'djshow';
export interface BarGift { xu: number; key: BarShowKey; level: 1 | 2 | 3 | 4 | 5; icon: string; label: string; short: string; ms: number }
// ms > 0: màn diễn chiếm sân khấu (xếp hàng); ms = 0: hiệu ứng riêng quanh người tặng, chạy ngay
export const BAR_GIFTS: BarGift[] = [
  { xu: 1,   key: 'dance1',    level: 1, icon: '💃', label: 'Múa một điệu, máy quay vào bạn 5 giây', short: 'Múa nhẹ', ms: 0 },
  { xu: 5,   key: 'dance5',    level: 1, icon: '🕺', label: 'Skill múa đẹp hơn, đèn rọi, máy quay 5 giây', short: 'Múa đẹp', ms: 0 },
  { xu: 10,  key: 'outfit',    level: 2, icon: '👗', label: 'Thay trang phục dạ tiệc lấp lánh', short: 'Đồ mới', ms: 0 },
  { xu: 20,  key: 'laser',     level: 2, icon: '🟩', label: 'Quạt laser xanh', short: 'Laser', ms: 8_000 },
  { xu: 30,  key: 'vipdance',  level: 2, icon: '🔥', label: 'Skill VIP: múa đủ kiểu, máy quay 10 giây', short: 'Múa VIP', ms: 0 },
  { xu: 50,  key: 'stage',     level: 3, icon: '🌈', label: 'Sân khấu đổi màu, đèn chớp', short: 'Đổi màu', ms: 15_000 },
  { xu: 99,  key: 'faceoff',   level: 3, icon: '⚔️', label: 'Skill siêu VIP: đối đầu top 2, múa trước mặt nhau', short: 'Đối đầu', ms: 15_000 },
  { xu: 199, key: 'co2',       level: 4, icon: '💨', label: 'Phun CO2, pháo lạnh, cả quán nhảy', short: 'CO2 + nhảy', ms: 25_000 },
  { xu: 299, key: 'vip',       level: 4, icon: '👑', label: 'VIP: pháo hoa, tên lên màn LED, Champagne', short: 'VIP pháo hoa', ms: 30_000 },
  { xu: 500, key: 'djshow',    level: 5, icon: '🎧', label: 'Mở màn DJ SHOW toàn sân khấu', short: 'DJ SHOW', ms: 60_000 },
];
// từ 10 xu một lần tặng là được đổi bộ đồ dạ tiệc lấp lánh (giữ suốt buổi)
export const GLAM_XU = 10;
export const barGiftFor = (xu: number) => [...BAR_GIFTS].reverse().find(g => xu >= g.xu) ?? BAR_GIFTS[0];

export const BAR = {
  maxGuests: 60,               // khách trong quán (người 3D); quá thì người im lâu nhất ra về nhường chỗ
  leaveMs: 10 * 60_000,        // 10 phút không bình luận, thả tim, tặng quà thì về
  freeOrderMs: 45_000,         // gọi món bằng bình luận: mỗi người 45 giây một ly
  makeMs: 6_000,               // bartender pha (lắc, rót) chừng 6 giây
  serveMs: 7_000,              // phục vụ bê ra chừng 7 giây
  queueMax: 30,                // hàng chờ tối đa; quá thì bỏ ly gọi miễn phí cũ nhất
  vipXu: 100,                  // tặng cộng dồn từ 100 xu (trong buổi) là khách VIP, ngồi khu VIP
  vipSeats: 12,
  showQueue: 4,                // màn diễn lớn xếp hàng tối đa 4 màn, quà lớn hơn chen lên trước
  comboMs: 10_000,             // quà combo của cùng người trong 10 giây được cộng dồn để xét mức
};

export const BAR_HELP = ['Bình luận để vào quán', 'Gõ "nhảy 1–100" chọn điệu', 'Gõ "nam" / "nữ" chọn nhân vật', 'Tặng quà: càng nhiều xu càng VIP'];
