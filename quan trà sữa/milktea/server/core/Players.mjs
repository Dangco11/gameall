// Hồ sơ khách. Tệp players.txt có đúng 7 cột: TikTokID|Username|Level|VIPPoint|TotalCoins|FavoriteDrink|SeatID
import { clean } from '../storage/Storage.mjs';
import { levelFor } from '../../shared/menu.mjs';

export class Players {
  constructor(storage) {
    this.storage = storage;
    this.byId = new Map();
    this.byName = new Map();
  }

  load() {
    for (const line of this.storage.rows.values()) {
      const [id, username, level, points, coins, favorite, seat] = line.split('|');
      const key = username.toLowerCase();
      const twin = key && this.byName.get(key);
      // Cùng username mà khác ID thì gộp về một hồ sơ, giữ số liệu cao hơn.
      if (twin) {
        twin.points = Math.max(twin.points, +points);
        twin.coins = Math.max(twin.coins, +coins);
        twin.level = levelFor(twin.points);
        this.storage.rows.delete(id);
        this.save(twin);
        continue;
      }
      const p = { id, username, level: levelFor(+points), points: +points, coins: +coins, favorite: favorite === '-' ? '' : favorite, seatId: seat === '-' ? '' : seat };
      this.byId.set(id, p);
      if (key) this.byName.set(key, p);
    }
    return this;
  }

  // Trả về hồ sơ cũ nếu đã có, không bao giờ tạo dòng thứ hai cho cùng một người.
  ensure(rawId, rawUsername) {
    const username = clean(rawUsername, 32) || clean(rawId, 32);
    const id = clean(rawId, 40) || username;
    if (!id) return null;
    let p = this.byId.get(id) || this.byName.get(username.toLowerCase());
    if (p) return { player: p, isNew: false };
    p = { id, username, level: 1, points: 0, coins: 0, favorite: '', seatId: '' };
    this.byId.set(id, p);
    this.byName.set(username.toLowerCase(), p);
    this.save(p);
    return { player: p, isNew: true };
  }

  save(p) {
    this.storage.savePlayer(p.id, [p.id, p.username, p.level, p.points, p.coins, clean(p.favorite) || '-', p.seatId || '-'].join('|'));
  }

  // Trả về true khi vừa lên cấp.
  addPoints(p, points, coins = 0) {
    p.points += points;
    p.coins += coins;
    const level = levelFor(p.points), leveled = level > p.level;
    p.level = level;
    this.save(p);
    return leveled;
  }

  get count() { return this.byId.size; }
  all() { return this.byId.values(); }
  top(n = 8) { return [...this.byId.values()].filter(p => p.points > 0).sort((a, b) => b.points - a.points).slice(0, n); }
}
