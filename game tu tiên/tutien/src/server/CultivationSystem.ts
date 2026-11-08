import { MAX_LEVEL, needTuvi, realmOf } from '../shared/game.ts';
import type { Player } from './PlayerStore.ts';

// Tu luyện: tu vi tích đủ thì đột phá lên kỳ tiếp theo; qua hết Đại viên mãn là vượt cảnh giới (Thiên Kiếp).
export interface Breakthrough { from: number; to: number; realm: boolean }

export class CultivationSystem {
  // nhịp tự tu luyện mỗi giây cho người đang có mặt (cảnh giới cao hấp thu nhanh hơn chút, vẫn cần quà để lên tiên giới)
  autoRate(p: Player) { return 1 + p.lv * 0.35; }

  add(p: Player, amount: number): Breakthrough | null {
    if (!(amount > 0) || p.lv >= MAX_LEVEL) return null;
    p.tuvi += amount;
    const from = p.lv;
    while (p.lv < MAX_LEVEL && p.tuvi >= needTuvi(p.lv)) { p.tuvi -= needTuvi(p.lv); p.lv++; }
    if (p.lv >= MAX_LEVEL) p.tuvi = 0;
    if (p.lv === from) return null;
    return { from, to: p.lv, realm: realmOf(p.lv) !== realmOf(from) };
  }
  progress(p: Player) { return p.lv >= MAX_LEVEL ? 1 : Math.min(1, p.tuvi / needTuvi(p.lv)); }
}
