import { DEFAULT_GIFTS } from '../config/GiftConfig.ts';
import type { GiftConfig } from '../config/GiftConfig.ts';
import { UNIT_KINDS } from '../config/UnitConfig.ts';
import type { UnitKind } from '../config/UnitConfig.ts';

const fold = (s: string) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().trim();

// Quy đổi một quà ra loại quân: GiftId cấu hình sẵn → tên quà → đơn giá xu của MỘT quà.
export class GiftMapping {
  cfg: GiftConfig;
  constructor(cfg: GiftConfig = DEFAULT_GIFTS){ this.cfg = GiftMapping.validate(cfg); }

  // count: số quân ra cho MỘT quà (theo mức của loại quân đó trong byValue)
  unitFor(giftId: string, giftName: string, unitValue: number): { unit: UnitKind; by: 'id' | 'name' | 'value'; count: number } | null {
    const countOf = (u: UnitKind) => this.cfg.byValue.find(t => t.unit === u)?.count ?? 1;
    const byId = this.cfg.byGiftId[String(giftId)];
    if (byId) return { unit: byId, by: 'id', count: countOf(byId) };
    const byName = this.cfg.byName[fold(giftName)];
    if (byName) return { unit: byName, by: 'name', count: countOf(byName) };
    if (!(unitValue >= 1)) return null;
    let best: { unit: UnitKind; count: number } | null = null, bm = -1;
    for (const t of this.cfg.byValue) if (unitValue >= t.min && t.min > bm){ bm = t.min; best = t; }
    return best ? { unit: best.unit, by: 'value', count: best.count } : null;
  }
  perGift(unit: UnitKind){ return this.cfg.byValue.find(t => t.unit === unit)?.count ?? 1; }

  // File cấu hình do người dùng sửa tay: bỏ các dòng sai, giữ phần mặc định cho phần thiếu
  static validate(raw: Partial<GiftConfig>): GiftConfig {
    const ok = (u: unknown): u is UnitKind => UNIT_KINDS.includes(u as UnitKind);
    const map = (o: unknown) => Object.fromEntries(Object.entries((o && typeof o === 'object' ? o : {}) as Record<string, unknown>).filter(([, v]) => ok(v)).map(([k, v]) => [fold(k), v as UnitKind]));
    const byValue = Array.isArray(raw.byValue) ? raw.byValue.filter(t => t && ok(t.unit) && Number.isFinite(+t.min) && +t.min > 0).map(t => ({ min: +t.min, unit: t.unit, count: Math.max(1, Math.min(50, Math.round(+(t.count ?? 1)) || 1)) })) : [];
    return {
      byGiftId: Object.fromEntries(Object.entries((raw.byGiftId && typeof raw.byGiftId === 'object' ? raw.byGiftId : {}) as Record<string, unknown>).filter(([, v]) => ok(v)).map(([k, v]) => [String(k), v as UnitKind])),
      byName: map(raw.byName),
      byValue: byValue.length ? byValue : DEFAULT_GIFTS.byValue,
      maxRepeatPerEvent: Math.max(1, Math.min(10_000, +(raw.maxRepeatPerEvent ?? DEFAULT_GIFTS.maxRepeatPerEvent) || DEFAULT_GIFTS.maxRepeatPerEvent)),
    };
  }
}
