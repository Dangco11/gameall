import fs from 'node:fs';
import path from 'node:path';
import type { PlaneKey } from '../shared/game.ts';
import type { Boards } from '../shared/types.ts';
import type { RaceResult } from './Race.ts';

// Kỷ lục lưu trong data/records.json: thời gian nhanh nhất mỗi người, số lần về nhất, top tặng quà hôm nay.
// Bot và khách mô phỏng không bao giờ lên bảng.
interface Data {
  best: Record<string, { name: string; ms: number; plane: PlaneKey; at: number }>;
  wins: Record<string, { name: string; wins: number }>;
  donors: { day: string; list: Record<string, { name: string; xu: number }> };
}
const today = () => new Date().toLocaleDateString('sv-SE');

export class Records {
  private data: Data = { best: {}, wins: {}, donors: { day: today(), list: {} } };
  private file: string;
  dirty = true;

  constructor(dir: string){
    this.file = path.join(dir, 'records.json');
    fs.mkdirSync(dir, { recursive: true });
    try {
      const d = JSON.parse(fs.readFileSync(this.file, 'utf8')) as Partial<Data>;
      this.data = { best: d.best ?? {}, wins: d.wins ?? {}, donors: d.donors?.day === today() ? d.donors : { day: today(), list: {} } };
    } catch { /* lần đầu chạy */ }
  }

  race(results: RaceResult[]){
    const real = results.filter(r => !r.bot && !r.sim);
    for (const r of real){
      if (!r.ms || r.late) continue;
      const b = this.data.best[r.id];
      if (!b || r.ms < b.ms) this.data.best[r.id] = { name: r.name, ms: r.ms, plane: r.plane, at: Date.now() };
    }
    const win = results.find(r => r.place === 1 && r.ms);
    if (win && !win.bot && !win.sim){ const w = this.data.wins[win.id] ?? { name: win.name, wins: 0 }; w.name = win.name; w.wins++; this.data.wins[win.id] = w; }
    this.dirty = true; this.save();
  }

  gift(id: string, name: string, xu: number, sim: boolean){
    if (sim || id.startsWith('bot:')) return;
    if (this.data.donors.day !== today()) this.data.donors = { day: today(), list: {} };
    const d = this.data.donors.list[id] ?? { name, xu: 0 };
    d.name = name; d.xu += xu; this.data.donors.list[id] = d;
    this.dirty = true;
  }

  boards(): Boards {
    const best = Object.values(this.data.best).sort((a, b) => a.ms - b.ms).slice(0, 5).map(b => ({ name: b.name, ms: b.ms, plane: b.plane }));
    const wins = Object.values(this.data.wins).sort((a, b) => b.wins - a.wins).slice(0, 5);
    const donors = Object.values(this.data.donors.list).sort((a, b) => b.xu - a.xu).slice(0, 5);
    return { best, wins, donors };
  }

  save(){
    try { fs.writeFileSync(this.file + '.tmp', JSON.stringify(this.data)); fs.renameSync(this.file + '.tmp', this.file); }
    catch (e) { console.error('Không lưu được kỷ lục', e); }
  }
}
