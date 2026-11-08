import type { TopRow } from '../../shared/types.ts';

// Bảng xếp hạng quà cưới theo tháng (giờ Việt Nam). Cộng mọi quà tặng trong cảnh đám cưới, lưu ra file
// để tắt máy, live lại vẫn còn. Sang tháng mới thì bảng tự làm lại từ đầu.
export const monthOf = (now: number) => new Date(now + 7 * 3600_000).toISOString().slice(0, 7);   // "2026-11"
const KEEP = 300;

export class WeddingTop {
  month: string;
  private rows = new Map<string, TopRow>();

  constructor(month: string, rows: TopRow[]){
    this.month = month;
    for (const r of rows) this.rows.set(r.id, r);
  }

  // true nếu top 3 vừa đổi (để báo màn hình)
  add(id: string, name: string, xu: number, sim: boolean, now: number){
    this.roll(now);
    const before = this.key(false);
    const r = this.rows.get(id) ?? { id, name, xu: 0, sim };
    r.xu += xu; r.name = name; this.rows.set(id, r);
    if (this.rows.size > KEEP * 1.2){ const keep = [...this.rows.values()].sort((a, b) => b.xu - a.xu).slice(0, KEEP); this.rows = new Map(keep.map(x => [x.id, x])); }
    return this.key(false) !== before;
  }

  private roll(now: number){ const m = monthOf(now); if (m !== this.month){ this.month = m; this.rows.clear(); } }
  private key(hideSim: boolean){ return JSON.stringify(this.top(hideSim).map(r => [r.id, r.name])); }

  // hideSim: đang live thật thì không xếp người thử (DEMO)
  top(hideSim: boolean, now?: number){
    if (now !== undefined) this.roll(now);
    return [...this.rows.values()].filter(r => !hideSim || !r.sim).sort((a, b) => b.xu - a.xu).slice(0, 3);
  }

  all(){ return [...this.rows.values()]; }
}
