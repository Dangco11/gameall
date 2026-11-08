import fs from 'node:fs';
import path from 'node:path';

// Bảng xếp hạng lực chiến tháng: lưu ở data/chien-luc-chien.json.
// Sang tháng mới thì bảng cũ được cất sang data/chien-luc-chien-YYYY-MM.json và bảng mới bắt đầu từ 0.
export interface PowerRow { id: string; name: string; avatar: string; power: number; wins: number; matches: number; lastSeen: number }
export interface BoardView { month: string; top: (PowerRow & { rank: number })[] }

export const monthKey = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; };

export class PowerBoard {
  month: string;
  readonly rows = new Map<string, PowerRow>();
  private file: string | null;
  private now: () => number;
  private dirty = false;

  constructor(file: string | null, now: () => number = Date.now){
    this.file = file; this.now = now; this.month = monthKey(now());
    if (!file) return;
    try {
      const j = JSON.parse(fs.readFileSync(file, 'utf8')) as { month: string; players: PowerRow[] };
      this.month = j.month || this.month;
      for (const r of j.players ?? []) if (r?.id) this.rows.set(r.id, { id: r.id, name: String(r.name ?? ''), avatar: String(r.avatar ?? ''), power: +r.power || 0, wins: +r.wins || 0, matches: +r.matches || 0, lastSeen: +r.lastSeen || 0 });
    } catch { /* chưa có file */ }
    this.rollover();
  }

  // Sang tháng mới: cất bảng tháng trước, làm bảng mới
  rollover(){
    const m = monthKey(this.now());
    if (m === this.month) return false;
    if (this.file && this.rows.size){
      const old = this.file.replace(/\.json$/, `-${this.month}.json`);
      try { fs.writeFileSync(old, JSON.stringify(this.json(), null, 1)); } catch { /* không ghi được thì thôi */ }
    }
    this.rows.clear(); this.month = m; this.dirty = true; this.save();
    return true;
  }

  // Cộng lực chiến cho người chơi (sau mỗi trận); won: thuộc đội thắng
  add(id: string, name: string, avatar: string, gain: number, won: boolean){
    this.rollover();
    let r = this.rows.get(id);
    if (!r){ r = { id, name, avatar, power: 0, wins: 0, matches: 0, lastSeen: 0 }; this.rows.set(id, r); }
    if (name) r.name = name; if (avatar) r.avatar = avatar;
    r.power += Math.max(0, Math.round(gain)); r.matches++; if (won) r.wins++; r.lastSeen = this.now();
    this.dirty = true;
    return r;
  }
  // bỏ các dòng thỏa điều kiện (ví dụ người chơi thử sim_) rồi lưu
  removeWhere(fn: (r: PowerRow) => boolean){ let n = 0; for (const [id, r] of this.rows) if (fn(r)){ this.rows.delete(id); n++; } if (n){ this.dirty = true; this.save(); } return n; }
  sorted(){ return [...this.rows.values()].filter(r => r.power > 0).sort((a, b) => b.power - a.power || b.wins - a.wins || a.id.localeCompare(b.id)); }
  top(n = 20): BoardView { return { month: this.month, top: this.sorted().slice(0, n).map((r, i) => ({ ...r, rank: i + 1 })) }; }
  rankOf(id: string, within = 20){ const i = this.sorted().slice(0, within).findIndex(r => r.id === id); return i < 0 ? 0 : i + 1; }

  private json(){ return { month: this.month, players: [...this.rows.values()] }; }
  save(){
    if (!this.file || !this.dirty) return;
    this.dirty = false;
    try { fs.mkdirSync(path.dirname(this.file), { recursive: true }); fs.writeFileSync(this.file + '.tmp', JSON.stringify(this.json(), null, 1)); fs.renameSync(this.file + '.tmp', this.file); }
    catch (e) { this.dirty = true; console.error('Không lưu được bảng lực chiến', e); }
  }
}
