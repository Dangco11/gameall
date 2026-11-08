import type { UnitKind } from './UnitConfig.ts';

// Bảng ánh xạ quà TikTok sang loại quân. Thứ tự ưu tiên: GiftId → tên quà → đơn giá xu của MỘT quà.
// Không lấy tổng combo làm đơn giá: 10 bông hồng 1 xu là 10 quà mức 1 xu (= 10 x 5 dân binh), không phải 1 quà 10 xu.
// Có thể ghi đè bằng file data/chien-gifts.json: { "byGiftId": { "5655": "danbinh" }, "byName": { "rose": "danbinh" }, "byValue": [{ "min": 1, "unit": "danbinh", "count": 5 }, ...] }
// Quà gán theo GiftId hay tên quà thì số quân lấy theo mức byValue của đúng loại quân đó.
export interface GiftValueTier { min: number; unit: UnitKind; count: number }   // count: số quân ra cho MỘT quà
export interface GiftConfig {
  byGiftId: Record<string, UnitKind>;
  byName: Record<string, UnitKind>;      // tên quà viết thường, bỏ dấu
  byValue: GiftValueTier[];              // đơn giá ≥ min thì ra loại quân này (lấy mức cao nhất đạt được)
  maxRepeatPerEvent: number;             // chặn số lặp vô lý từ nguồn sự kiện
}

export const DEFAULT_GIFTS: GiftConfig = {
  byGiftId: {},
  byName: {},
  byValue: [
    { min: 1, unit: 'danbinh', count: 5 },     // 1 xu: 5 dân binh
    { min: 5, unit: 'xathu', count: 5 },       // 5 xu: 5 xạ thủ
    { min: 10, unit: 'dausi', count: 3 },      // 10 xu: 3 đấu sĩ
    { min: 30, unit: 'xechien', count: 3 },    // 30 xu: 3 xe chiến
    { min: 100, unit: 'trau', count: 3 },      // 100 xu: 3 kỵ binh trâu
    { min: 500, unit: 'voi', count: 2 },       // 500 xu: 2 tượng binh voi
  ],
  maxRepeatPerEvent: 500,
};

// Sáu mức quà dùng trong Gift Simulator (giá trị tham chiếu, không phải danh sách quà thật của TikTok)
export const SIM_GIFTS: { name: string; icon: string; value: number; giftId: string }[] = [
  { name: 'Hoa hồng', icon: '🌹', value: 1, giftId: 'sim-1' },
  { name: 'Kẹo bông', icon: '🍭', value: 5, giftId: 'sim-5' },
  { name: 'Kem ốc quế', icon: '🍦', value: 10, giftId: 'sim-10' },
  { name: 'Mũ phớt', icon: '🎩', value: 30, giftId: 'sim-30' },
  { name: 'Nhẫn cưới', icon: '💍', value: 100, giftId: 'sim-100' },
  { name: 'Pháo hoa', icon: '🎆', value: 500, giftId: 'sim-500' },
];
