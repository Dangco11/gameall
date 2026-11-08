// Hàng đợi sự kiện: connector chỉ đẩy vào rồi trả về ngay, game xử lý từng mẻ để một đợt quà dồn không chặn server.
export class EventQueue {
  constructor(handler, { batch = 200, onError = () => {} } = {}) {
    Object.assign(this, { handler, batch, onError });
    this.items = [];
    this.head = 0;
    this.scheduled = false;
    this.seen = new Set();
  }
  push(event) {
    // Quà được kiểm tra trùng riêng trong Gifts vì mã quà cần sống qua lần khởi động lại.
    if (event.eventId && event.type !== 'gift') {
      if (this.seen.has(event.eventId)) return;
      this.seen.add(event.eventId);
      if (this.seen.size > 5000) this.seen.delete(this.seen.values().next().value);
    }
    this.items.push(event);
    this.schedule();
  }
  schedule() {
    if (this.scheduled) return;
    this.scheduled = true;
    setImmediate(() => this.drain());
  }
  drain() {
    this.scheduled = false;
    const end = Math.min(this.items.length, this.head + this.batch);
    for (; this.head < end; this.head++) {
      try { this.handler(this.items[this.head]); } catch (e) { this.onError(e, this.items[this.head]); }
    }
    if (this.head >= this.items.length) { this.items = []; this.head = 0; } else this.schedule();
  }
  drainAll() { while (this.head < this.items.length) this.drain(); }
  get length() { return this.items.length - this.head; }
}
