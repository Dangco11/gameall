// Xử lý quà: chống tính trùng, tách phần tăng của combo, gom quà liên tiếp thành một đơn.
// Xu và điểm VIP được cộng ngay khi nhận sự kiện, đơn hàng được tạo khi hết cửa sổ gom.
import { clean } from '../storage/Storage.mjs';

const MAX_REMEMBERED = 20_000;
const GROUP_WINDOW_MS = 800;

export class Gifts {
  constructor({ storage, windowMs = GROUP_WINDOW_MS, onCredit, onBatch }) {
    Object.assign(this, { storage, windowMs, onCredit, onBatch });
    this.seen = new Set();
    this.combos = new Map();     // khóa combo -> số lượng đã tính
    this.batches = new Map();    // TikTokID -> { coins, gifts, timer }
  }

  // Đọc gift_logs.txt để sau khi khởi động lại, TikTok gửi lại tin cũ cũng không bị cộng lần hai.
  restore(lines) {
    for (const line of lines) {
      const f = line.split('|');
      if (f[1]) this.remember(f[1]);
      if (f[9]) this.rememberCombo(f[9], +f[10] || 0);
    }
  }
  remember(id) {
    this.seen.add(id);
    if (this.seen.size > MAX_REMEMBERED) this.seen.delete(this.seen.values().next().value);
  }
  rememberCombo(key, count) {
    this.combos.delete(key);
    this.combos.set(key, count);
    if (this.combos.size > 5000) this.combos.delete(this.combos.keys().next().value);
  }

  // e: { eventId, id, username, giftId, giftName, count, diamonds, streakable, ended, groupId }. count của combo là số cộng dồn.
  handle(e, player) {
    if (e.eventId) {
      if (this.seen.has(e.eventId)) return 0;
      this.remember(e.eventId);
    }
    const diamonds = Math.max(1, Math.floor(+e.diamonds) || 1), count = Math.max(1, Math.floor(+e.count) || 1);
    let units = count, comboKey = '', comboCum = '';
    if (e.streakable) {
      comboKey = clean(`${player.id}:${e.giftId}:${e.groupId || ''}`, 120);
      units = count - (this.combos.get(comboKey) || 0);
      if (units <= 0) return 0;
      comboCum = count;
      // Combo không có groupId sẽ đếm lại từ 1 ở lượt sau, nên phải quên khi kết thúc.
      if (e.ended && !e.groupId) this.combos.delete(comboKey);
      else this.rememberCombo(comboKey, count);
    }
    const coins = units * diamonds;
    this.storage.append('gifts', [new Date().toISOString(), clean(e.eventId, 60), player.id, player.username, clean(e.giftId, 24), clean(e.giftName, 40), units, diamonds, coins, comboKey, comboCum].join('|'));
    this.onCredit(player, coins, e);
    let batch = this.batches.get(player.id);
    if (!batch) {
      batch = { coins: 0, gifts: 0, timer: setTimeout(() => this.release(player), this.windowMs) };
      batch.timer.unref?.();
      this.batches.set(player.id, batch);
    }
    batch.coins += coins;
    batch.gifts += units;
    return coins;
  }

  release(player) {
    const batch = this.batches.get(player.id);
    if (!batch) return;
    clearTimeout(batch.timer);
    this.batches.delete(player.id);
    this.onBatch(player, batch);
  }
  releaseAll(lookup) { for (const id of [...this.batches.keys()]) this.release(lookup(id)); }
  isPending(id) { return this.batches.has(id); }
}
