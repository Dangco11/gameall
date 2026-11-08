// Lời tiếp viên theo từng sự kiện của game. Thêm câu mới vào các danh sách dưới đây; mỗi lần đọc chọn ngẫu nhiên,
// không lặp đúng câu vừa đọc trong cùng nhóm.
import { itemById, vipOf } from '../../shared/menu.mjs';
import { SHOP_NAME } from '../../shared/brand.mjs';
import { spokenName } from './Voice.mjs';

const WELCOME = [
  n => `Chào ${n}, mời vào quán!`,
  n => `A, ${n} tới rồi! Mời ngồi nha!`,
  n => `${n} ơi, vào đây ngồi cho mát nè!`,
  n => `Chào mừng ${n} đến ${SHOP_NAME}!`,
  n => `Có khách! Mời ${n} vào bàn nha!`,
];
const RETURN = [
  n => `${n} quay lại rồi kìa! Quán nhớ ${n} lắm luôn!`,
  n => `Khách quen ${n} tới! Chỗ cũ vẫn chờ nè!`,
  n => `Ơ, ${n} lại ghé quán! Vui quá đi!`,
];
// Đón khách top tháng hoặc VIP: luôn đọc, không chờ giọng rảnh như câu chào thường.
const GRAND_TOP = [
  (n, r) => `Cả quán chú ý! Top ${r} của tháng, ${n}, đã đến! Kính mời ${n} vào quán!`,
  (n, r) => `Trải thảm đỏ nào! Top ${r} tháng này, ${n}, vừa bước vào quán!`,
  (n, r) => `Xin chào Top ${r}, ${n}! Chỗ đẹp nhất quán đã sẵn sàng!`,
];
const GRAND_VIP = [
  (n, t) => `Kính mời ${t} ${n} vào quán! Hân hạnh được phục vụ!`,
  (n, t) => `${t} ${n} đã đến! Mời ${n} vào khu VIP nha!`,
];
const GRAND_TIKTOK = [
  (n, l) => `Chào mừng ${n}, cấp ${l} TikTok, đã ghé quán! Mời vào ngồi chỗ đẹp nha!`,
  (n, l) => `Khách xịn tới rồi! ${n} cấp ${l} vừa vào phòng! Cả quán chào ${n} nào!`,
];
const GIFT = [
  [20, [(n, d) => `Có ngay ${d} cho ${n}! Cảm ơn nha!`, (n, d) => `${n} gọi ${d}! Ra liền, ra liền!`, (n, d) => `Một ${d} cho ${n}! Cảm ơn ${n} nhiều nha!`]],
  [100, [(n, d) => `${n} gọi ${d}! Trà sữa đang lắc nè, chờ xíu thôi!`, (n, d) => `Dạ có! ${d} cho ${n}, ngon hết nấc luôn!`, (n, d) => `${d} cho ${n}! Cảm ơn ${n} đã ủng hộ quán nha!`]],
  [500, [(n, d) => `Ui, ${n} chơi lớn quá! ${d} ra ngay đây!`, (n, d) => `Cả quán ơi, ${n} vừa gọi ${d}! Vỗ tay nào!`, (n, d) => `${n} gọi ${d}! Bếp đang làm liền tay, cảm ơn ${n} nhiều lắm!`]],
  [2000, [(n, d) => `Trời ơi! ${n} gọi ${d}! Món VIP đây rồi, cả quán vỗ tay nào!`, (n, d) => `Khách VIP ${n} đã gọi ${d}! Quán xin cảm ơn ${n} thật nhiều!`]],
  [Infinity, [(n, d) => `Kính thưa cả quán! ${n} vừa gọi ${d}! Cảm ơn ${n}, đêm nay ${n} là số một!`, (n, d) => `Không tin nổi! ${n} mở ${d}! Cả quán đứng dậy vỗ tay cho ${n} nào!`]],
];
const LEVEL = [
  (n, t) => `Chúc mừng ${n} lên ${t}!`,
  (n, t) => `Wow! ${n} vừa thành ${t} rồi nè!`,
  (n, t) => `Cả quán chúc mừng ${n}, danh hiệu mới: ${t}!`,
];
const PARTY = {
  tea: [n => `${n} bao cả quán trà đá! Cả nhà cụng ly nào, dô!`, n => `Trà đá cho cả quán! Cảm ơn ${n} đã bao nha!`, n => `Ai cũng có trà đá! ${n} bao hết! Cảm ơn ${n}!`],
  zone: [n => `Tiệc rồi! ${n} mời cả khu một ly! Cả khu cùng nhảy nào!`],
  all: [n => `Đại tiệc toàn quán! ${n} bao cả quán! Cả nhà cùng quẩy lên nào!`, n => `Pháo hoa lên! ${n} mở đại tiệc toàn quán! Cảm ơn ${n}!`],
};

const last = new Map();
function pick(list) {
  let i = Math.floor(Math.random() * list.length);
  if (list.length > 1 && last.get(list) === i) i = (i + 1) % list.length;
  last.set(list, i);
  return list[i];
}

const WELCOME_GAP_MS = 5000;
let welcomeAt = 0;

// Nhận tin game gửi cho màn hình, trả về câu cần đọc (hoặc null).
export function lineFor(msg, { welcome = true, queueLength = 0 } = {}) {
  switch (msg.t) {
    case 'event': {
      if (msg.kind === 'grand') {
        const n = spokenName(msg.name);
        return { text: msg.rank ? pick(GRAND_TOP)(n, msg.rank) : msg.tt ? pick(GRAND_TIKTOK)(n, msg.tt) : pick(GRAND_VIP)(n, vipOf(msg.level).title), priority: 2 };
      }
      if (!welcome || !['new', 'return'].includes(msg.kind)) return null;
      // Chào khách chỉ khi giọng đang rảnh, để những lúc người vào ồ ạt không dồn hàng đợi
      if (queueLength > 0 || Date.now() - welcomeAt < WELCOME_GAP_MS) return null;
      welcomeAt = Date.now();
      return { text: pick(msg.kind === 'new' ? WELCOME : RETURN)(spokenName(msg.name)), priority: 1 };
    }
    case 'gift': {
      const item = itemById(msg.itemId);
      if (!item || item.party) return null;   // món đại tiệc có câu riêng lúc mở tiệc
      return { text: pick(GIFT.find(([limit]) => msg.coins < limit)[1])(spokenName(msg.name), item.name), priority: 2 };
    }
    case 'levelup':
      return msg.level >= 2 ? { text: pick(LEVEL)(spokenName(msg.name), vipOf(msg.level).title), priority: 2 } : null;
    case 'party':
      return { text: pick(PARTY[msg.kind] || PARTY.all)(spokenName(msg.name)), priority: 2 };
  }
  return null;
}
