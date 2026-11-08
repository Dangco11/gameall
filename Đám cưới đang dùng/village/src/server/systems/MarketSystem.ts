import { MARKET, MARKET_ITEMS } from '../../shared/balance.ts';
import type { MarketItem } from '../../shared/balance.ts';
import type { MarketRow, Player } from '../../shared/types.ts';
import { earn, fail, fmt, ok } from './common.ts';
import type { Result } from './common.ts';

const ITEMS = Object.keys(MARKET_ITEMS) as MarketItem[];

// Giá chợ theo cung cầu: bán nhiều thì giá hạ, để lâu thì giá hồi về giá gốc, có dao động nhẹ.
export class MarketSystem {
  rows: MarketRow[];
  dirty = true;

  constructor(saved: MarketRow[] = []){
    this.rows = ITEMS.map(item => {
      const base = MARKET_ITEMS[item].base, s = saved.find(r => r.item === item);
      return { item, base, price: s && s.price > 0 ? s.price : base, sold: s?.sold ?? 0 };
    });
  }

  row(item: MarketItem){ return this.rows.find(r => r.item === item)!; }

  tick(dt: number, rng: () => number){
    for (const r of this.rows){
      const pull = (r.base - r.price) * Math.min(1, MARKET.recover * dt / 10);
      const drift = (rng() - 0.5) * 2 * MARKET.drift * r.base * Math.min(1, dt / 10);
      r.price = Math.min(r.base * MARKET.maxRatio, Math.max(r.base * MARKET.minRatio, r.price + pull + drift));
    }
    this.dirty = true;
  }

  // Bán qty đơn vị; mỗi đơn vị bán ra làm giá hạ một chút. Trả về số tiền nhận.
  sellUnits(item: MarketItem, qty: number, bonus: number, factor = 1){
    const r = this.row(item);
    let total = 0;
    for (let i = 0; i < qty; i++){
      total += r.price * factor;
      r.price = Math.max(r.base * MARKET.minRatio, r.price * (1 - MARKET.saleDrop));
    }
    r.sold += qty;
    this.dirty = true;
    return total * (1 + bonus);
  }

  sell(p: Player, item: 'rice' | 'fish' | 'egg', roadLevel: number): Result {
    const qty = p.inv[item];
    if (!qty) return fail('market', `${p.name}: không có ${MARKET_ITEMS[item].name.toLowerCase()} để bán`);
    p.inv[item] = 0;
    const got = earn(p, this.sellUnits(item, qty, roadLevel * MARKET.roadBonus));
    return ok('market', `${p.name} bán ${qty} ${MARKET_ITEMS[item].unit} ${MARKET_ITEMS[item].name.toLowerCase()} được ${fmt(got)}`, 3, `+${fmt(got)}`);
  }

  // RA CHỢ: bán hết nông sản trong kho
  sellAll(p: Player, roadLevel: number): Result {
    const bonus = roadLevel * MARKET.roadBonus, parts: string[] = [];
    let got = 0;
    for (const item of ['rice', 'fish', 'egg'] as const){
      const qty = p.inv[item];
      if (!qty) continue;
      p.inv[item] = 0;
      got += this.sellUnits(item, qty, bonus);
      parts.push(`${qty} ${MARKET_ITEMS[item].name.toLowerCase()}`);
    }
    if (!parts.length) return ok('market', `${p.name} dạo chợ phiên, giá lúa ${fmt(this.row('rice').price)}, cá ${fmt(this.row('fish').price)}`, 0, 'Dạo chợ');
    const n = earn(p, got);
    return ok('market', `${p.name} ra chợ bán ${parts.join(', ')} được ${fmt(n)}`, 3, `+${fmt(n)}`);
  }
}
