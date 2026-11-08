import { realmName, SECTS, statsOf } from '../shared/game.ts';
import type { Boards, Row } from '../shared/types.ts';
import type { PlayerStore } from './PlayerStore.ts';

// Bảng xếp hạng từ dữ liệu thật trong players.json (NPC không lên bảng)
export class RankingSystem {
  sectWins: Record<string, number> = {};
  private cache: Boards | null = null; private at = 0;
  private store: PlayerStore;
  constructor(store: PlayerStore) { this.store = store; }

  boards(bossNow: [string, number][], names: (id: string) => { name: string; av: string }, now = Date.now()): Boards {
    if (this.cache && now - this.at < 2000) return { ...this.cache, bossNow: this.bossRows(bossNow, names) };
    const ps = [...this.store.map.values()];
    const top = <T>(arr: T[], score: (x: T) => number, n = 10) => arr.map(x => [x, score(x)] as const).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, n);
    const row = (p: typeof ps[number], v: number, sub?: string): Row => ({ id: p.id, name: p.name, av: p.avatar, v: Math.round(v), sub });
    const power = top(ps, p => statsOf(p.lv, this.store.cls(p), this.store.artLevels(p)).power).map(([p, v]) => row(p, v, realmName(p.lv)));
    const tuvi = top(ps, p => p.lv * 1e9 + p.tuvi + 1).map(([p]) => row(p, p.lv, realmName(p.lv)));
    const bossDmg = top(ps, p => p.bossDmg).map(([p, v]) => row(p, v, p.kills ? `${p.kills} lần kết liễu` : undefined));
    const pk = top(ps, p => p.pkPts).map(([p, v]) => row(p, v, `${p.pkW} thắng · ${p.pkL} thua`));
    const donors = top(ps, p => p.xu).map(([p, v]) => row(p, v));
    const sects: Row[] = SECTS.map(s => {
      const members = ps.filter(p => p.sect === s.key);
      return { id: s.key, name: `${s.icon} ${s.name}`, av: '', v: (this.sectWins[s.key] || 0), sub: `${members.length} đệ tử` };
    }).sort((a, b) => b.v - a.v || parseInt(b.sub!) - parseInt(a.sub!));
    this.cache = { power, tuvi, bossDmg, bossNow: [], pk, donors, sects }; this.at = now;
    return { ...this.cache, bossNow: this.bossRows(bossNow, names) };
  }
  private bossRows(list: [string, number][], names: (id: string) => { name: string; av: string }): Row[] {
    return list.map(([id, v]) => { const n = names(id); return { id, name: n.name, av: n.av, v: Math.round(v) }; });
  }
  invalidate() { this.cache = null; }
}
