// Hàng đợi quà: không bao giờ bỏ quà khi quá tải (chỉ xử lý dần theo ngân sách thời gian mỗi nhịp).
// Lỗi khi xử lý thì thử lại tối đa 3 lần (chờ tăng dần), vẫn lỗi thì ghi sang danh sách lỗi để kiểm tra, không nuốt mất.
// Chống trùng đã làm trước khi vào hàng (GiftEventAdapter), nên thử lại không bị coi là trùng.
interface Item<T> { ev: T; id: string; tries: number; notBefore: number }
export class GiftQueue<T> {
  processed = 0; retried = 0; failed = 0;
  readonly failures: { ev: T; error: string }[] = [];
  private items: Item<T>[] = [];
  private head = 0;
  private now: () => number;
  private log: (s: string) => void;
  constructor(now: () => number = Date.now, log: (s: string) => void = () => {}){ this.now = now; this.log = log; }

  get size(){ return this.items.length - this.head; }
  push(ev: T, id = ''){
    this.items.push({ ev, id, tries: 0, notBefore: 0 });
    if (this.size === 20_000) this.log('⚠️ Hàng đợi quà đã có 20.000 sự kiện chưa xử lý, máy đang quá tải');
  }

  // Xử lý tối đa max sự kiện trong budgetMs mili giây; phần còn lại để nhịp sau
  drain(handle: (ev: T) => void, max = 200, budgetMs = 6){
    const start = performance.now(), t = this.now(), end = this.items.length;
    let n = 0;
    const later: Item<T>[] = [];
    while (this.head < end && n < max && performance.now() - start < budgetMs){
      const it = this.items[this.head++];
      if (it.notBefore > t){ later.push(it); continue; }
      try { handle(it.ev); this.processed++; n++; }
      catch (e) {
        const msg = String((e as Error)?.message ?? e);
        it.tries++;
        if (it.tries <= 3){ it.notBefore = t + 200 * 2 ** it.tries; later.push(it); this.retried++; this.log(`🔁 Thử lại quà ${it.id} (lần ${it.tries}): ${msg}`); }
        else { this.failed++; this.failures.push({ ev: it.ev, error: msg }); if (this.failures.length > 500) this.failures.shift(); this.log(`❌ Quà ${it.id} lỗi 4 lần, đã ghi vào danh sách lỗi: ${msg}`); }
      }
    }
    if (this.head > 4096 || this.head === this.items.length){ this.items = this.items.slice(this.head); this.head = 0; }
    for (const it of later) this.items.push(it);
    return n;
  }
}
