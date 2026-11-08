// Dáng nhân vật người xem tự chọn bằng bình luận "nam", "nữ", "già", "trẻ". Lưu ở looks.json (ghi nguyên tử) để lần sau vào quán
// vẫn giữ dáng cũ; tách khỏi players.txt để tệp đó giữ đúng 7 cột.
import fs from 'node:fs';
import path from 'node:path';

export class Looks {
  constructor(dir, { log = () => {} } = {}) {
    this.file = path.join(dir, 'looks.json');
    this.log = log;
    this.map = new Map();      // TikTokID -> { g: 'm' | 'f', a: 'old' | 'young' }
    this.dirty = false;
    try { for (const [id, l] of Object.entries(JSON.parse(fs.readFileSync(this.file, 'utf8')))) this.map.set(id, l); }
    catch (e) { if (e.code !== 'ENOENT') log(`Không đọc được looks.json: ${e.message}`); }
  }
  get(id) { return this.map.get(id) || null; }
  set(id, change) {
    const look = { ...this.map.get(id), ...change };
    this.map.set(id, look);
    this.dirty = true;
    return look;
  }
  save() {
    if (!this.dirty) return;
    try {
      const tmp = `${this.file}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify(Object.fromEntries(this.map)));
      fs.renameSync(tmp, this.file);
      this.dirty = false;
    } catch (e) { this.log(`Không lưu được looks.json: ${e.message}`); }
  }
}
