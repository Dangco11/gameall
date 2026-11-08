import fs from 'node:fs';
import path from 'node:path';
import { ARCHETYPES, artifactLevel } from '../shared/game.ts';
import type { ArtifactKey, ClassKey } from '../shared/game.ts';

// Hồ sơ tu sĩ của từng người xem, lưu ở data/players.json: tắt mở server, tải lại game vẫn giữ cảnh giới, pháp bảo, tông môn.
export interface Player {
  id: string; name: string; avatar: string;
  a: number;                 // mẫu nhân vật
  lv: number; tuvi: number;  // level 0..59 và tu vi đang tích
  sect: string;
  arts: Partial<Record<ArtifactKey, number>>;   // số lần nhận mỗi pháp bảo (cấp = artifactLevel)
  pkW: number; pkL: number; pkPts: number;
  xu: number;                // tổng xu đã tặng
  bossDmg: number; kills: number;
  bossTop: number;           // số lần lập công đánh Boss (kết liễu / top 3 sát thương)
  bossFights: number;        // số trận Boss đã tham gia (Boss bị tiêu diệt)
  vip: number;               // bậc ngoại hình đã đạt (để biết khi nào lên bậc)
  createdAt: number; lastAt: number;
  sim?: boolean;
}

const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

export class PlayerStore {
  map = new Map<string, Player>();
  dirty = false;
  private file: string;
  constructor(dir: string) {
    this.file = path.join(dir, 'players.json');
    try {
      const rows = JSON.parse(fs.readFileSync(this.file, 'utf8')) as Player[];
      const blank: Partial<Player> = { arts: {}, pkW: 0, pkL: 0, pkPts: 0, xu: 0, bossDmg: 0, kills: 0, bossTop: 0, bossFights: 0, vip: 0, sect: '' };
      for (const p of rows) if (p && p.id) this.map.set(p.id, { ...blank, ...p } as Player);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
        // file hỏng: giữ lại bản lỗi để cứu dữ liệu, không ghi đè
        try { fs.copyFileSync(this.file, this.file + '.loi-' + Date.now()); } catch { /* bỏ qua */ }
      }
    }
  }
  get(id: string) { return this.map.get(id); }
  // người mới: mẫu nhân vật chọn theo id để mỗi người một dáng, bình luận tên lớp để đổi
  ensure(id: string, name: string, avatar = '', sim = false): Player {
    let p = this.map.get(id);
    const now = Date.now();
    if (!p) {
      p = { id, name, avatar, a: hash(id) % ARCHETYPES.length, lv: 0, tuvi: 0, sect: '', arts: {}, pkW: 0, pkL: 0, pkPts: 0, xu: 0, bossDmg: 0, kills: 0, bossTop: 0, bossFights: 0, vip: 0, createdAt: now, lastAt: now, sim };
      this.map.set(id, p);
    }
    if (name && name !== p.name) p.name = name;
    if (avatar) p.avatar = avatar;
    p.lastAt = now;
    this.dirty = true;
    return p;
  }
  cls(p: Player): ClassKey { return (ARCHETYPES[p.a] ?? ARCHETYPES[0]).cls; }
  artLevels(p: Player) {
    const out: Partial<Record<ArtifactKey, number>> = {};
    for (const [k, n] of Object.entries(p.arts)) { const lv = artifactLevel(n || 0); if (lv) out[k as ArtifactKey] = lv; }
    return out;
  }
  // lớp mới, giữ giới tính
  setClass(p: Player, cls: ClassKey) {
    const female = ARCHETYPES[p.a]?.female ?? false;
    const a = ARCHETYPES.find(x => x.cls === cls && x.female === female);
    if (a) { p.a = a.id; this.dirty = true; }
  }
  setGender(p: Player, female: boolean) {
    const cls = this.cls(p), a = ARCHETYPES.find(x => x.cls === cls && x.female === female);
    if (a) { p.a = a.id; this.dirty = true; }
  }
  removeSim() { for (const [id, p] of this.map) if (p.sim) this.map.delete(id); this.dirty = true; }
  save() {
    if (!this.dirty) return;
    this.dirty = false;
    const rows = [...this.map.values()].filter(p => !p.sim);
    const tmp = this.file + '.tmp';
    try { fs.mkdirSync(path.dirname(this.file), { recursive: true }); fs.writeFileSync(tmp, JSON.stringify(rows)); fs.renameSync(tmp, this.file); }
    catch (e) { console.error('Không lưu được players.json: ' + (e as Error).message); this.dirty = true; }
  }
}
