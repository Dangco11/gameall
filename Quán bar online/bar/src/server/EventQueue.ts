import type { LiveEvent } from '../shared/types.ts';

// Hàng đợi ba làn: quà không bao giờ bị bỏ, bình luận bỏ cái cũ nhất khi tràn, tim được gộp theo người.
const CAPS = { comment: 2000, low: 1000 };
const SEEN_LIMIT = 20_000;
type Like = Extract<LiveEvent, { kind: 'like' }>;

export class EventQueue {
  dropped = 0; duplicates = 0; processed = 0;
  private gifts: LiveEvent[] = [];
  private comments: LiveEvent[] = [];
  private low: LiveEvent[] = [];
  private likes = new Map<string, Like>();
  private seen = new Set<string>();
  private recentText = new Map<string, number>();
  private now: () => number;

  constructor(now: () => number = Date.now){ this.now = now; }

  get size(){ return this.gifts.length + this.comments.length + this.low.length + this.likes.size; }

  // Nạp msgId quà đã ghi sổ, để sau khi khởi động lại quà phát lại không bị tính hai lần.
  remember(ids: Iterable<string>){ for (const id of ids) this.markSeen(id); }

  private markSeen(id: string){
    this.seen.add(id);
    if (this.seen.size > SEEN_LIMIT) this.seen.delete(this.seen.values().next().value as string);
  }

  // TikTok phát lại tin gần đây sau khi nối lại, nên mọi msgId đều được nhớ.
  push(ev: LiveEvent): boolean {
    if (ev.kind !== 'like' && ev.msgId && ev.msgId !== '0'){
      if (this.seen.has(ev.msgId)){ this.duplicates++; return false; }
      this.markSeen(ev.msgId);
    }
    switch (ev.kind){
      case 'gift':
        this.gifts.push(ev);
        break;
      case 'comment': {
        // không có msgId mà cùng người gõ đúng câu đó trong 2 giây: coi là trùng
        const key = `${ev.id}|${ev.text}`, t = this.now();
        if (!ev.msgId && t - (this.recentText.get(key) ?? -Infinity) < 2000){ this.duplicates++; return false; }
        this.recentText.set(key, t);
        if (this.recentText.size > 3000) this.recentText.delete(this.recentText.keys().next().value as string);
        this.comments.push(ev);
        if (this.comments.length > CAPS.comment){ this.comments.shift(); this.dropped++; }
        break;
      }
      case 'like': {
        const prev = this.likes.get(ev.id);
        if (prev) prev.count += ev.count; else this.likes.set(ev.id, { ...ev });
        break;
      }
      default:
        this.low.push(ev);
        if (this.low.length > CAPS.low){ this.low.shift(); this.dropped++; }
    }
    return true;
  }

  // Xử lý tối đa max sự kiện trong budgetMs, ưu tiên quà rồi tới bình luận; làn thấp luôn được chạy ít nhất một cái.
  drain(max: number, handle: (ev: LiveEvent) => void, budgetMs = 8){
    const start = performance.now();
    let n = 0;
    const over = () => n >= max || performance.now() - start > budgetMs;
    const take = (list: LiveEvent[]) => {
      let i = 0;
      while (i < list.length && !over()){ this.run(handle, list[i++]); n++; }
      if (i) list.splice(0, i);
    };
    take(this.gifts);
    take(this.comments);
    for (const [id, ev] of this.likes){
      if (over()) break;
      this.likes.delete(id); this.run(handle, ev); n++;
    }
    if (over() && this.low.length){ this.run(handle, this.low.shift()!); n++; }
    take(this.low);
    return n;
  }

  private run(handle: (ev: LiveEvent) => void, ev: LiveEvent){
    try { handle(ev); this.processed++; } catch (e) { console.error('Lỗi xử lý sự kiện', ev.kind, e); }
  }
}
