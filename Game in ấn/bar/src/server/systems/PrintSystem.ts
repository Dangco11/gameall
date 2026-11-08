import { PRINT, productCode, speedFor, tierFor, tierOf } from '../../shared/print.ts';
import type { TierKey } from '../../shared/print.ts';
import type { PrintFx, PrintJob, PrintPhase, PrintRecord, PrintState } from '../../shared/types.ts';

// Máy in của studio: một hàng đợi, một đầu in. Server giữ nhịp (màn hình chỉ vẽ theo), nên nhiều màn hình cùng thấy một bản in
// và không màn hình nào mở cũng không làm mất lượt. Quà không bao giờ bị bỏ: mỗi người tối đa PRINT.perUserQueued lượt đang chờ,
// quà thêm được cộng dồn (số lượng, xu) vào lượt chờ cuối của người đó, cộng đủ xu thì lượt đó lên bậc khung cao hơn.
//
// Vòng đời một tờ giấy: prime (nạp giấy mới) → print (in từng bản: ô nhỏ trong lưới 2×2, hay nguyên tờ khổ lớn)
//                       → eject (đẩy ra, dao cắt, rơi xuống khay; bản khổ lớn được khoe trước camera)
export interface Chosen { tpl: number; edition: number; lv: number }
export interface NewJob { id: string; name: string; sim: boolean; avatar: boolean; gift: string; count: number; xu: number }

export class PrintSystem {
  dirty = true;
  phase: PrintPhase = 'idle';
  job: PrintJob | null = null;
  queue: PrintJob[] = [];
  sheet = { n: 1, big: false, jobs: [] as PrintJob[] };
  printed = 0;
  /** chọn mẫu khung lúc bắt đầu in (lúc đó mới biết người đó đang TOP mấy, đã có những mẫu nào) */
  choose: (j: PrintJob) => Chosen = () => ({ tpl: 1, edition: 1, lv: 0 });
  /** bản in vừa xong */
  onDone: (r: PrintRecord) => void = () => {};
  private emit: (f: PrintFx) => void;
  private seq = 0;
  private until = 0; private ms = 0; private idleSince = 0;

  constructor(emit: (f: PrintFx) => void, startSeq = 0){ this.emit = emit; this.seq = startSeq; this.printed = startSeq; }

  /** thêm quà vào hàng đợi; trả lượt (mới hoặc đã cộng dồn) */
  add(g: NewJob, now: number): PrintJob {
    const mine = this.queue.filter(j => j.id === g.id);
    if (mine.length >= PRINT.perUserQueued){
      const j = mine[mine.length - 1];
      j.count += g.count; j.xu += g.xu; j.gift = g.gift; j.name = g.name; j.avatar ||= g.avatar;
      j.tier = tierFor(j.xu).key;
      this.dirty = true;
      this.emit({ k: 'print', ev: 'queued', id: j.id, name: j.name, tier: j.tier, xu: j.xu, gift: g.gift, count: g.count, pos: this.queue.indexOf(j) + 1, merged: true,
        text: `➕ ${j.name} tặng thêm ${g.gift} ×${g.count} · gộp vào lượt in đang chờ (${j.xu} xu, ${tierOf(j.tier).name})` });
      return j;
    }
    const tier = tierFor(g.xu).key;
    const j: PrintJob = { n: 0, ...g, tier, tpl: 0, code: '', at: now, edition: 0, cell: 0, sheet: 0, lv: 0 };
    this.queue.push(j);
    this.dirty = true;
    const pos = this.queue.length + (this.job ? 1 : 0);
    this.emit({ k: 'print', ev: 'queued', id: j.id, name: j.name, tier, xu: j.xu, gift: g.gift, count: g.count, pos, merged: false,
      text: g.xu ? `🎁 ${j.name} tặng ${g.gift} ×${g.count} (${g.xu} xu) → ${tierOf(tier).name}${pos > 1 ? ` · chờ lượt ${pos}` : ''}`
        : `❤️ ${j.name} thả đủ ${g.gift} → được in miễn phí${pos > 1 ? ` · chờ lượt ${pos}` : ''}` });
    return j;
  }

  removeWhere(f: (id: string) => boolean){
    const n = this.queue.length;
    this.queue = this.queue.filter(j => !f(j.id));
    if (this.queue.length !== n) this.dirty = true;
  }

  private speed(){ return speedFor(this.queue.length); }
  private set(phase: PrintPhase, ms: number, now: number){ this.phase = phase; this.ms = Math.round(ms); this.until = now + this.ms; this.dirty = true; }

  private eject(now: number){
    const big = this.sheet.big;
    this.set('eject', (big ? PRINT.showMs * Math.max(0.6, this.speed()) : PRINT.ejectMs * Math.max(0.5, this.speed())), now);
    this.emit({ k: 'print', ev: 'eject', sheet: this.sheet.n, big, text: big ? '✂️ Bản in khổ lớn đã cắt, mời cả nhà chiêm ngưỡng!' : '✂️ Cắt giấy, thành phẩm rơi xuống khay' });
  }

  private begin(now: number){
    const j = this.queue.shift()!;
    const tier = tierOf(j.tier);
    j.n = ++this.seq; j.at = now; j.sheet = this.sheet.n;
    j.cell = tier.big ? -1 : this.sheet.jobs.length;
    const c = this.choose(j);
    j.tpl = c.tpl; j.edition = c.edition; j.lv = c.lv; j.code = productCode(j.tier, j.n, now);
    this.job = j;
    this.sheet.jobs.push(j); this.sheet.big = tier.big;
    // tờ mới: nạp giấy qua trục lăn trước rồi mới in
    if (this.sheet.jobs.length === 1) this.set('prime', PRINT.primeMs * this.speed(), now);
    else this.set('print', tier.ms * this.speed(), now);
    this.emit({ k: 'print', ev: 'start', job: { ...j }, text: `🖨️ Đang in cho ${j.name} · ${tier.name}` });
  }

  tick(now: number){
    for (let guard = 0; guard < 4; guard++){
      if (this.phase !== 'idle' && now < this.until) return;
      switch (this.phase){
        case 'prime': {
          const j = this.job!;
          this.set('print', tierOf(j.tier).ms * this.speed(), now);
          return;
        }
        case 'print': {
          const j = this.job!;
          this.job = null; this.printed++;
          const { cell: _c, sheet: _s, ...rec } = j; void _c; void _s;
          this.onDone(rec);
          this.emit({ k: 'print', ev: 'done', job: { ...j }, text: `✅ Đã in xong ${j.name} · mã ${j.code}` });
          this.idleSince = now;
          if (this.sheet.big || this.sheet.jobs.length >= PRINT.cells){ this.eject(now); return; }
          this.phase = 'idle'; this.dirty = true;
          continue;
        }
        case 'eject':
          this.sheet = { n: this.sheet.n + 1, big: false, jobs: [] };
          this.phase = 'idle'; this.dirty = true; this.idleSince = now;
          continue;
        case 'idle': {
          const next = this.queue[0];
          if (next){
            const big = tierOf(next.tier).big;
            if (this.sheet.jobs.length && (big || this.sheet.big || this.sheet.jobs.length >= PRINT.cells)){ this.eject(now); return; }
            this.begin(now); return;
          }
          if (this.sheet.jobs.length && now - this.idleSince > PRINT.idleEjectMs){ this.eject(now); return; }
          return;
        }
      }
    }
  }

  pub(now: number): Omit<PrintState, 'recent' | 'rare' | 'hall' | 'top' | 'month'> {
    return {
      phase: this.phase, job: this.job ? { ...this.job } : null,
      leftMs: this.phase === 'idle' ? 0 : Math.max(0, this.until - now), ms: this.phase === 'idle' ? 0 : this.ms,
      sheet: { n: this.sheet.n, big: this.sheet.big, jobs: this.sheet.jobs.map(j => ({ ...j })) },
      queue: this.queue.slice(0, 12).map(j => ({ ...j })), waiting: this.queue.length, printed: this.printed,
    };
  }
  tierOfQueued(id: string): TierKey | null { return this.queue.find(j => j.id === id)?.tier ?? null; }
}
