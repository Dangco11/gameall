// Bảng top tháng: điểm VIP kiếm được trong tháng hiện tại (theo giờ máy chạy server).
// Lưu ở month.json, ghi nguyên tử (tệp tạm rồi rename). Giữ nguyên cả tháng; sang tháng mới thì cất bảng cũ vào
// months/YYYY-MM.json rồi bắt đầu lại từ 0. Điểm VIP trọn đời và cấp trong players.txt không bị ảnh hưởng.
import fs from 'node:fs';
import path from 'node:path';

export const monthKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
export const TOP_MONTH = 10;

export class Monthly {
  constructor(dir, { log = () => {}, now = () => new Date() } = {}) {
    Object.assign(this, { dir, log, now });
    this.file = path.join(dir, 'month.json');
    this.month = monthKey(now());
    this.rows = new Map();     // TikTokID -> { name, points, coins }
    this.cache = null;
    this.dirty = false;
    this.load();
  }

  load() {
    try {
      const d = JSON.parse(fs.readFileSync(this.file, 'utf8'));
      if (/^\d{4}-\d{2}$/.test(d.month)) this.month = d.month;
      for (const [id, r] of Object.entries(d.rows || {})) this.rows.set(id, { name: String(r.name || ''), points: +r.points || 0, coins: +r.coins || 0 });
    } catch (e) { if (e.code !== 'ENOENT') this.log(`Không đọc được month.json: ${e.message}`); }
    this.rollover();
  }

  // Trả về true khi vừa sang tháng mới.
  rollover() {
    const m = monthKey(this.now());
    if (m === this.month) return false;
    if (this.rows.size) {
      this.write(path.join(this.dir, 'months', `${this.month}.json`), { month: this.month, top: this.top(100) });
      this.log(`Đã lưu top tháng ${this.month}, bắt đầu tháng ${m}`);
    }
    this.month = m;
    this.rows.clear();
    this.cache = null;
    this.dirty = true;
    this.save();
    return true;
  }

  add(p, name, points, coins = 0) {
    if (!points && !coins) return;
    const r = this.rows.get(p.id) || { name: '', points: 0, coins: 0 };
    r.name = name || p.username;
    r.points += points;
    r.coins += coins;
    this.rows.set(p.id, r);
    this.cache = null;
    this.dirty = true;
  }

  top(n = TOP_MONTH) {
    this.cache ||= [...this.rows].filter(([, r]) => r.points > 0).sort((a, b) => b[1].points - a[1].points || b[1].coins - a[1].coins).map(([id, r]) => ({ id, ...r }));
    return this.cache.slice(0, n);
  }
  // Hạng trong top 10 tháng, 0 nếu ngoài top.
  rankOf(id) { return this.top().findIndex(r => r.id === id) + 1; }

  save() {
    if (!this.dirty) return;
    const rows = Object.fromEntries(this.rows);
    if (this.write(this.file, { month: this.month, rows })) this.dirty = false;
  }
  write(file, data) {
    try {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const tmp = `${file}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify(data));
      fs.renameSync(tmp, file);
      return true;
    } catch (e) { this.log(`Không lưu được ${path.basename(file)}: ${e.message}`); return false; }
  }
}
