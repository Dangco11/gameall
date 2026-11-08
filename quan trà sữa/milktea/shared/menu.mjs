// Bảng giá, biểu cảm theo mức xu và 10 cấp VIP. Server và trình duyệt cùng đọc tệp này, muốn đổi giá chỉ cần sửa ở đây.

export const GROUPS = {
  milk: 'Trà sữa', fruit: 'Trà trái cây', pure: 'Trà nguyên chất', top: 'Topping',
  cake: 'Bánh ngọt', combo: 'Combo', vip: 'Món VIP', limited: 'Món giới hạn',
};

// Biểu cảm của khách khi nhận món, theo mức xu. anim là động tác trong js/crowd.js.
export const REACTIONS = {
  1:    { anim: 'nod',    emoji: '😋', label: 'Chép miệng gật gù' },
  5:    { anim: 'sip',    emoji: '😊', label: 'Cười tít mắt' },
  10:   { anim: 'sip',    emoji: '😌', label: 'Nhắm mắt thư giãn' },
  20:   { anim: 'wave',   emoji: '👋', label: 'Vẫy tay chào cả quán' },
  30:   { anim: 'heart',  emoji: '😍', label: 'Mắt trái tim' },
  50:   { anim: 'clap',   emoji: '👏', label: 'Vỗ tay khen ngon' },
  99:   { anim: 'toast',  emoji: '🧊', label: 'Cả quán cụng ly trà đá' },
  100:  { anim: 'heart',  emoji: '🥰', label: 'Thả tim bay' },
  150:  { anim: 'dance',  emoji: '💃', label: 'Lắc lư theo nhạc' },
  199:  { anim: 'wow',    emoji: '🤩', label: 'Đứng dậy trầm trồ' },
  200:  { anim: 'cheer',  emoji: '🥳', label: 'Nâng ly chúc mừng' },
  299:  { anim: 'toast',  emoji: '🍻', label: 'Cụng ly với bàn bên' },
  300:  { anim: 'heart',  emoji: '😳', label: 'Ngại ngùng thả tim' },
  399:  { anim: 'dance',  emoji: '🕺', label: 'Cả bàn nhún nhảy' },
  400:  { anim: 'jump',   emoji: '🎂', label: 'Nhảy mừng sinh nhật' },
  500:  { anim: 'jump',   emoji: '😎', label: 'Đeo kính sành điệu' },
  699:  { anim: 'spin',   emoji: '🤑', label: 'Xoay vòng ăn mừng' },
  899:  { anim: 'cheer',  emoji: '🏆', label: 'Giơ cúp vô địch' },
  1000: { anim: 'cheer',  emoji: '👑', label: 'Đội vương miện vẫy tay' },
  1500: { anim: 'spin',   emoji: '🌟', label: 'Xoay tròn tỏa sáng' },
  2000: { anim: 'fly',    emoji: '🚀', label: 'Bay lên giữa quán' },
  3000: { anim: 'dance',  emoji: '🎉', label: 'Dẫn cả khu nhảy' },
  5000: { anim: 'dance',  emoji: '🎆', label: 'Dẫn cả quán nhảy' },
};

// fx: 1 hạt lấp lánh, 2 vòng sáng, 3 pháo giấy, 4 tiệc một khu, 5 đại tiệc toàn quán.
// party: 'tea' mời mỗi khách trong quán một ly trà đá, 'zone' tiệc một khu, 'all' đại tiệc toàn quán.
// art: mô tả hình 3D, xem client/js/items.js.
const m = (id, g, coins, name, desc, serve, enjoy, art, extra = {}) => ({ id, g, coins, name, desc, serve, enjoy, art, fx: 1, ...extra });

export const MENU = [
  m(1,  'top',  1,  'Trân châu đen', 'Một muỗng trân châu dẻo, nóng hổi.', 'Rắc lấp lánh quanh muỗng', 'Nhai trân châu', { k: 'bowl', c: '#2b1a12' }),
  m(2,  'top',  1,  'Thạch dừa', 'Thạch dừa giòn mát.', 'Rắc lấp lánh quanh muỗng', 'Nhai thạch', { k: 'bowl', c: '#f4f0d0' }),
  m(3,  'pure', 5,  'Trà đá chanh', 'Trà xanh lạnh, chanh tươi.', 'Đá lạnh va leng keng', 'Uống một hơi mát lạnh', { k: 'cup', c: '#d8c75a', top: 'lemon' }),
  m(4,  'top',  5,  'Pudding trứng', 'Pudding mềm, béo vừa.', 'Rắc lấp lánh quanh muỗng', 'Múc từng muỗng', { k: 'bowl', c: '#f2c75c' }),
  m(5,  'pure', 10, 'Trà ô long lạnh', 'Ô long thơm, hậu ngọt.', 'Hơi trà tỏa nhẹ', 'Nhấp từng ngụm', { k: 'cup', c: '#a8622a' }),
  m(6,  'pure', 10, 'Trà lài', 'Trà lài dịu nhẹ.', 'Cánh hoa lài bay', 'Nhấp từng ngụm', { k: 'cup', c: '#d9d38a', top: 'leaf' }),
  m(7,  'fruit', 20, 'Trà đào cam sả', 'Đào miếng, cam, sả tươi.', 'Hương trái cây lan tỏa', 'Múc miếng đào', { k: 'cup', c: '#f0953f', top: 'peach' }, { fx: 2 }),
  m(8,  'fruit', 20, 'Trà chanh dây', 'Chua ngọt, nhiều hạt chanh dây.', 'Hương trái cây lan tỏa', 'Hút rột rột', { k: 'cup', c: '#e8b92f', top: 'lemon' }, { fx: 2 }),
  m(9,  'fruit', 30, 'Trà vải hoa hồng', 'Vải ngọt, thoảng hương hồng.', 'Cánh hồng bay quanh ly', 'Ngắm ly rồi uống', { k: 'cup', c: '#f29bb0', top: 'peach' }, { fx: 2 }),
  m(10, 'fruit', 30, 'Trà dâu tây', 'Dâu tươi dằm, trà lạnh.', 'Cánh hồng bay quanh ly', 'Múc miếng dâu', { k: 'cup', c: '#e8485f', top: 'berry' }, { fx: 2 }),
  m(11, 'milk', 50, 'Trà sữa truyền thống', 'Vị trà đậm, sữa béo, đúng kiểu ngày xưa.', 'Nhân viên lắc bình trà', 'Hút một hơi dài', { k: 'cup', c: '#c79a6b', pearls: 1 }, { fx: 2 }),
  m(12, 'milk', 50, 'Trà sữa matcha', 'Matcha Nhật, sữa tươi.', 'Nhân viên lắc bình trà', 'Hút một hơi dài', { k: 'cup', c: '#8fb35a', pearls: 1 }, { fx: 2 }),
  // Đứng trước hai món trà sữa 99 xu để làm món mặc định của mức này; muốn trà sữa thì bình luận "gọi 13" hoặc "gọi 14"
  m(31, 'combo', 99, 'Bao Cả Quán Trà Đá', 'Mỗi khách trong quán một ly trà đá mát lạnh.', 'Nhân viên rót trà đá khắp quán', 'Cả quán cụng ly', { k: 'combo', n: 3, c: '#d8c75a' }, { fx: 2, party: 'tea' }),
  m(13, 'milk', 99, 'Trà sữa đường đen', 'Vệt đường đen chảy quanh thành ly.', 'Rót đường đen, trân châu rơi', 'Hút trân châu', { k: 'cup', c: '#b5804f', pearls: 1, top: 'cream', stripe: '#3b2112' }, { fx: 2 }),
  m(14, 'milk', 99, 'Trà sữa khoai môn', 'Khoai môn tím bùi.', 'Rót đường đen, trân châu rơi', 'Hút trân châu', { k: 'cup', c: '#a884c9', pearls: 1, top: 'cream' }, { fx: 2 }),
  m(15, 'cake', 100, 'Bánh su kem', 'Vỏ giòn, kem vani mát.', 'Dĩa bánh sáng lên', 'Cắn một miếng to', { k: 'puff' }, { fx: 2 }),
  m(16, 'cake', 150, 'Tiramisu ly', 'Cà phê và mascarpone.', 'Rây cacao bay nhẹ', 'Múc từng muỗng', { k: 'cake', c: '#7a5233', top: '#e9dcc4' }, { fx: 3 }),
  m(17, 'cake', 199, 'Bánh crepe sầu riêng', 'Hai mươi lớp mỏng, nhân sầu riêng.', 'Dĩa bánh xoay chậm', 'Trầm trồ từng lớp', { k: 'cake', c: '#f3dc7e', top: '#fff6d8' }, { fx: 3 }),
  m(18, 'cake', 200, 'Cheesecake dâu', 'Phô mai béo, sốt dâu.', 'Sốt dâu rót xuống', 'Nâng dĩa chúc mừng', { k: 'cake', c: '#fbeed2', top: '#d92f4e' }, { fx: 3 }),
  m(19, 'combo', 299, 'Combo Bạn Thân', 'Hai ly trà sữa và một dĩa bánh.', 'Khay hai ly bưng ra', 'Cụng ly', { k: 'combo', n: 2, c: '#c79a6b' }, { fx: 3 }),
  m(20, 'combo', 300, 'Combo Hẹn Hò', 'Hai ly trà vải và bánh trái tim.', 'Trái tim bay quanh khay', 'Thả tim', { k: 'combo', n: 2, c: '#f29bb0' }, { fx: 3 }),
  m(21, 'combo', 399, 'Combo Cả Bàn', 'Ba ly cho cả bàn.', 'Khay lớn bưng ra', 'Cả bàn nhún nhảy', { k: 'combo', n: 3, c: '#c79a6b' }, { fx: 3 }),
  m(22, 'combo', 400, 'Combo Sinh Nhật', 'Bánh kem có nến và ba ly.', 'Nến thắp sáng', 'Thổi nến', { k: 'birthday' }, { fx: 3 }),
  m(23, 'vip', 500, 'Kem Cheese Vảy Vàng', 'Lớp kem cheese dày phủ vảy vàng ăn được.', 'Vảy vàng lấp lánh', 'Uống với kính râm', { k: 'cup', c: '#d9a860', pearls: 1, top: 'cream', gold: 1, big: 1.2 }, { fx: 3 }),
  m(24, 'vip', 699, 'Trà Sữa Hoàng Kim', 'Ly vàng, trân châu mật ong.', 'Vòng sáng vàng', 'Xoay vòng ăn mừng', { k: 'cup', c: '#e8b84a', pearls: 1, top: 'cream', gold: 1, big: 1.3 }, { fx: 3 }),
  m(25, 'vip', 899, 'Tháp Trà Sữa', 'Ba tầng ly xếp thành tháp.', 'Hai nhân viên rước tháp', 'Giơ cúp', { k: 'tower', tiers: 3 }, { fx: 3 }),
  m(26, 'vip', 1000, 'Trà Sữa Kim Cương', 'Ly pha lê, chỉ pha khi có khách đặt.', 'Đèn rọi vào bàn', 'Đội vương miện', { k: 'cup', c: '#bfe3f5', pearls: 1, top: 'cream', gold: 1, big: 1.45, crystal: 1 }, { fx: 3 }),
  m(27, 'limited', 1500, 'Trà Hoa Đăng', 'Mỗi phiên live chỉ pha 5 ly.', 'Đèn hoa đăng bay lên', 'Tỏa sáng', { k: 'cup', c: '#ff8f6b', pearls: 1, top: 'cream', gold: 1, big: 1.5 }, { fx: 3, limit: 5 }),
  m(28, 'limited', 2000, 'Siêu Ly Khổng Lồ', 'Ly to bằng người, mỗi phiên live chỉ pha 3 ly.', 'Cả đội khiêng ly ra', 'Bay lên giữa quán', { k: 'cup', c: '#c79a6b', pearls: 1, top: 'cream', gold: 1, big: 2.6 }, { fx: 3, limit: 3 }),
  m(29, 'vip', 3000, 'Tiệc Một Khu', 'Mời cả khu đang ngồi một ly.', 'Pháo giấy cả khu', 'Cả khu nhảy', { k: 'tower', tiers: 4 }, { fx: 4, party: 'zone' }),
  m(30, 'vip', 5000, 'Đại Tiệc Toàn Quán', 'Mời toàn bộ khách trong quán, đèn và pháo hoa khắp nơi.', 'Pháo hoa toàn quán', 'Cả quán nhảy', { k: 'tower', tiers: 5 }, { fx: 5, party: 'all' }),
];

export const reactionFor = coins => {
  const keys = Object.keys(REACTIONS).map(Number).sort((a, b) => b - a);
  return REACTIONS[keys.find(k => coins >= k) ?? 1];
};
export const itemById = id => MENU.find(x => x.id === id);

// Món mặc định của từng mức giá là món đứng đầu tiên trong MENU.
export function defaultItemFor(coins, soldOut = () => false) {
  let best = null;
  for (const item of MENU) {
    if (item.coins > coins || soldOut(item)) continue;
    if (!best || item.coins > best.coins) best = item;
  }
  return best;
}

export const accentless = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim();

// "gọi 11", "goi tra sua matcha": trả về món khách muốn, hoặc null nếu đây không phải câu gọi món.
export function parseOrderCommand(text) {
  const match = accentless(text).match(/^!?(?:goi|order)\s+(?:mon\s+)?(.+)$/);
  if (!match) return null;
  const q = match[1].replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!q) return null;
  if (/^\d+$/.test(q)) return itemById(+q) || null;
  return MENU.find(x => accentless(x.name) === q) || MENU.find(x => accentless(x.name).includes(q)) || null;
}

// "bàn 5", "ban so 5", "ngồi bàn 5", "b5" -> 5. Trả về 0 nếu không phải lệnh chọn bàn.
export function parseTableCommand(text) {
  const m = accentless(text).match(/^!?(?:ngoi\s+)?(?:ban|b)\s*(?:so\s*)?(\d{1,2})$/);
  return m ? +m[1] : 0;
}

// Bình luận chỉ gồm các từ chọn dáng (ví dụ "nữ", "nam già", "gái trẻ") thì đổi dáng nhân vật. Trả về null nếu không phải.
const LOOK_WORDS = { nam: { g: 'm' }, trai: { g: 'm' }, boy: { g: 'm' }, nu: { g: 'f' }, gai: { g: 'f' }, girl: { g: 'f' }, gia: { a: 'old' }, old: { a: 'old' }, tre: { a: 'young' }, young: { a: 'young' } };
export function parseLookCommand(text) {
  const words = accentless(text).replace(/[^a-z ]/g, ' ').split(/\s+/).filter(Boolean);
  if (!words.length || words.length > 3 || !words.every(w => LOOK_WORDS[w])) return null;
  return Object.assign({}, ...words.map(w => LOOK_WORDS[w]));
}

// Cấp khách. zone là khu ngồi riêng trong shared/layout.mjs. hat: cap, beret, bow, shades, crown.
export const VIP_LEVELS = [
  { level: 1,  title: 'Khách Mới',        min: 0,     frame: '#e8e2d4', text: '#4b3a2b', top: '#7fb7d6', pants: '#46506a', hat: null,     cape: null,      aura: null },
  { level: 2,  title: 'Khách Quen',       min: 10,    frame: '#bfe6c6', text: '#1f4d2c', top: '#74c69d', pants: '#3f5a4a', hat: 'cap',    cape: null,      aura: null },
  { level: 3,  title: 'Bạn Của Quán',     min: 50,    frame: '#ffd1dc', text: '#7a2440', top: '#f4a6bd', pants: '#6a4a5a', hat: 'bow',    cape: null,      aura: null },
  { level: 4,  title: 'Thành Viên Bạc',   min: 150,   frame: '#dfe7ee', text: '#31404f', top: '#c9d6df', pants: '#52606d', hat: 'beret',  cape: null,      aura: '#cfe4f5' },
  { level: 5,  title: 'Thành Viên Vàng',  min: 400,   frame: '#ffe08a', text: '#634800', top: '#f2c94c', pants: '#6b5320', hat: 'beret',  cape: null,      aura: '#ffd76a' },
  { level: 6,  title: 'Bạch Kim',         min: 1000,  frame: '#d6f5f2', text: '#14524d', top: '#9fe3dc', pants: '#2f5f5b', hat: 'shades', cape: '#6fd0c8', aura: '#9ff3ea' },
  { level: 7,  title: 'Kim Cương',        min: 2500,  frame: '#bfe6ff', text: '#0c4266', top: '#6fbdf0', pants: '#21476b', hat: 'shades', cape: '#3f8fd9', aura: '#8fd8ff' },
  { level: 8,  title: 'Đại Gia Trà Sữa',  min: 6000,  frame: '#e3c8ff', text: '#47207a', top: '#a874e6', pants: '#3e2766', hat: 'shades', cape: '#7a3fd0', aura: '#c79bff' },
  { level: 9,  title: 'Chủ Tịch Topping', min: 15000, frame: '#ffb7a8', text: '#6e1608', top: '#e8553a', pants: '#40202a', hat: 'crown',  cape: '#b5271a', aura: '#ff8a6b' },
  { level: 10, title: 'Huyền Thoại Quán', min: 40000, frame: '#ffd700', text: '#3d2c00', top: '#f6c21c', pants: '#2b1f47', hat: 'crown',  cape: '#7a1fa2', aura: '#ffe680' },
];
export const levelFor = points => {
  let found = VIP_LEVELS[0];
  for (const level of VIP_LEVELS) if (points >= level.min) found = level;
  return found.level;
};
export const vipOf = level => VIP_LEVELS[Math.min(VIP_LEVELS.length, Math.max(1, level)) - 1];
