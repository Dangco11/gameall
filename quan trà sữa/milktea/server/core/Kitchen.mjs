// Dây chuyền đơn hàng do server quyết định, trình duyệt chỉ diễn lại. Tải lại trang hay khởi động lại server đều không mất đơn.
//   QUEUED -> BREWING -> READY -> DELIVERING -> SERVED
// Mỗi đơn gắn chặt với TikTokID ngay từ đầu nên món chỉ đến đúng khách.
import { itemById } from '../../shared/menu.mjs';
import { clean } from '../storage/Storage.mjs';

export const ACTIVE = ['QUEUED', 'BREWING', 'READY', 'DELIVERING'];
const BREW_MS = { top: 2200, pure: 3200, fruit: 4000, milk: 5200, cake: 3200, combo: 6000, vip: 7000, limited: 8000 };
const DELIVER_MS = 4500;

export class Kitchen {
  constructor({ storage, baristas = 3, waiters = 3, onChange = () => {}, onServed = () => {} } = {}) {
    Object.assign(this, { storage, onChange, onServed });
    this.baristas = Array(baristas).fill(null);
    this.waiters = Array(waiters).fill(null);
    this.orders = new Map();     // chỉ giữ đơn chưa phục vụ xong
    this.seq = 0;
  }

  // Đọc lại orders.txt khi khởi động: đơn dở dang quay về hàng đợi, số lần gọi từng món dùng để tính món yêu thích.
  restore(lines) {
    const latest = new Map(), tally = new Map();
    for (const line of lines) {
      const [id, at, status, pid, username, itemId, itemName, qty, coins] = line.split('|');
      if (!id || !pid) continue;
      this.seq = Math.max(this.seq, +id.replace(/\D/g, '') || 0);
      if (status === 'QUEUED') {
        const counts = tally.get(pid) || new Map();
        counts.set(itemName, (counts.get(itemName) || 0) + 1);
        tally.set(pid, counts);
      }
      latest.set(id, { id, at: +new Date(at), status, pid, name: username, itemId: +itemId, qty: +qty || 1, coins: +coins || 0 });
    }
    for (const o of latest.values()) {
      if (o.status === 'SERVED' || !itemById(o.itemId)) continue;
      o.status = 'QUEUED';
      this.orders.set(o.id, o);
    }
    return tally;
  }

  create({ pid, name, item, qty = 1, coins }) {
    const o = { id: `O${String(++this.seq).padStart(6, '0')}`, at: Date.now(), status: 'QUEUED', pid, name, itemId: item.id, qty, coins };
    this.orders.set(o.id, o);
    this.record(o);
    this.onChange(o);
    return o;
  }

  record(o) {
    const item = itemById(o.itemId);
    this.storage.append('orders', [o.id, new Date().toISOString(), o.status, o.pid, clean(o.name, 32), o.itemId, clean(item?.name), o.qty, o.coins].join('|'));
  }
  hasPending(pid) { for (const o of this.orders.values()) if (o.pid === pid) return true; return false; }
  active() { return [...this.orders.values()].map(o => ({ ...o, left: o.endsAt ? Math.max(0, o.endsAt - Date.now()) : 0 })); }
  get queued() { let n = 0; for (const o of this.orders.values()) if (o.status === 'QUEUED') n++; return n; }

  transition(o, status, now, ms = 0) {
    o.status = status;
    o.endsAt = ms ? now + ms : 0;
    o.durationMs = ms;
    this.record(o);
    this.onChange(o);
  }

  // Quán đông thì làm nhanh hơn, tối đa gấp 4 lần, để hàng đợi không dài mãi trong lúc quà về dồn dập.
  rush() { return Math.max(0.25, 1 / (1 + this.queued / 4)); }

  tick(now = Date.now()) {
    for (const o of this.orders.values()) {
      if (o.status === 'BREWING' && now >= o.endsAt) {
        this.baristas[o.baristaId] = null;
        this.transition(o, 'READY', now);
      } else if (o.status === 'DELIVERING' && now >= o.endsAt) {
        this.waiters[o.waiterId] = null;
        this.transition(o, 'SERVED', now);
        this.orders.delete(o.id);
        this.onServed(o);
      }
    }
    for (const o of this.orders.values()) {
      if (o.status === 'READY') {
        const w = this.waiters.indexOf(null);
        if (w < 0) continue;
        this.waiters[w] = o.id;
        o.waiterId = w;
        this.transition(o, 'DELIVERING', now, DELIVER_MS);
      }
    }
    for (const o of this.orders.values()) {
      if (o.status === 'QUEUED') {
        const b = this.baristas.indexOf(null);
        if (b < 0) break;
        this.baristas[b] = o.id;
        o.baristaId = b;
        const base = BREW_MS[itemById(o.itemId).g] || 4000;
        this.transition(o, 'BREWING', now, Math.round(base * this.rush()));
      }
    }
  }
}
