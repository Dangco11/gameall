import { GIFT, HOUSES } from '../../shared/balance.ts';
import type { Player } from '../../shared/types.ts';

const HOUSE_MAX = HOUSES.length;

export type GiftTier = (typeof GIFT.tiers)[number];

export function tierFor(diamonds: number): GiftTier {
  let t: GiftTier = GIFT.tiers[0];
  for (const x of GIFT.tiers) if (diamonds >= x.min) t = x;
  return t;
}

export const today = (now: number) => new Date(now).toISOString().slice(0, 10);

// Hạn mức quà theo ngày của từng người: tăng tốc và vật liệu có trần, phần dư sang xây làng.
export class GiftSystem {
  resetDay(p: Player, now: number){
    const d = today(now);
    if (p.giftDay !== d){ p.giftDay = d; p.giftSkip = 0; p.giftMaterials = 0; p.giftHouse = 0; }
  }

  takeHouse(p: Player, levels: number, now: number){
    this.resetDay(p, now);
    const n = Math.max(0, Math.min(levels, GIFT.dailyHouseLevels - p.giftHouse, HOUSE_MAX - p.houseLevel));
    p.giftHouse += n;
    return n;
  }

  takeSkip(p: Player, seconds: number, now: number){
    this.resetDay(p, now);
    const n = Math.max(0, Math.min(seconds, GIFT.dailySkipSeconds - p.giftSkip));
    p.giftSkip += n;
    return n;
  }

  takeMaterials(p: Player, want: number, now: number){
    this.resetDay(p, now);
    const n = Math.max(0, Math.min(want, GIFT.dailyMaterials - p.giftMaterials));
    p.giftMaterials += n;
    return n;
  }
}
