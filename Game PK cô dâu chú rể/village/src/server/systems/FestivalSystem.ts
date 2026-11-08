import { CONTESTS, FESTIVAL } from '../../shared/balance.ts';
import type { ContestKey } from '../../shared/balance.ts';
import type { FestivalEntrant, FestivalState } from '../../shared/types.ts';

const ORDER = Object.keys(CONTESTS) as ContestKey[];
type Phase = FestivalState['phase'];
interface Entrant extends FestivalEntrant { lastAt: number; likes: number }
export interface Placing { id: string; place: number; won: boolean }
export interface FestivalHooks {
  announce(text: string): void;
  beauty(id: string): number;
  reward(results: Placing[], type: ContestKey): void;
}

// Hội làng: mở đăng ký -> thi 60 giây -> công bố. Định kỳ mỗi 12 phút, hoặc mở ngay bằng quà lớn hay bảng điều khiển.
export class FestivalSystem {
  phase: Phase = 'idle';
  type: ContestKey = 'keoco';
  endsAt = 0;
  nextAt: number;
  held: number;
  winners: string[] = [];
  paused = false;                                        // cảnh đám cưới: không tự mở hội, lịch lùi lại
  dirty = true;
  private entrants = new Map<string, Entrant>();
  private hooks: FestivalHooks;
  private rng: () => number;

  constructor(hooks: FestivalHooks, now: number, rng: () => number, nextAt = 0, held = 0){
    this.hooks = hooks; this.rng = rng; this.held = held;
    this.nextAt = nextAt > now ? nextAt : now + FESTIVAL.everyMs / 2;
  }

  get open(){ return this.phase === 'lobby' || this.phase === 'contest'; }
  isEntrant(id: string){ return this.entrants.has(id); }

  start(now: number){
    if (this.phase !== 'idle') return false;
    this.type = ORDER[this.held % ORDER.length];
    this.phase = 'lobby'; this.endsAt = now + FESTIVAL.lobbyMs; this.entrants.clear(); this.winners = [];
    this.dirty = true;
    this.hooks.announce(`🏮 Hội làng mở! Môn ${CONTESTS[this.type].name}. Gõ THAM GIA HỘI LÀNG để ghi tên`);
    return true;
  }

  join(id: string, name: string){
    if (!this.open) return 'closed' as const;
    if (this.entrants.has(id)) return 'already' as const;
    const t0 = [...this.entrants.values()].filter(e => e.team === 0).length;
    this.entrants.set(id, { id, name, score: 0, team: t0 <= this.entrants.size - t0 ? 0 : 1, lastAt: 0, likes: 0 });
    this.dirty = true;
    return 'joined' as const;
  }

  // Mỗi bình luận của người dự thi là một lượt kéo, vồ, giật cần hay chèo. Giới hạn 1 lượt mỗi giây.
  act(id: string, now: number){
    const e = this.entrants.get(id);
    if (!e || this.phase !== 'contest' || this.type === 'trangtri' || now - e.lastAt < FESTIVAL.scoreGapMs) return false;
    e.lastAt = now;
    const luck = this.type === 'batvit' || this.type === 'cauca' ? (this.rng() < 0.45 ? 1 : 0) : this.type === 'duathuyen' ? 1 + this.rng() : 1;
    e.score += luck;
    this.dirty = true;
    return luck > 0;
  }

  like(id: string, count: number){
    const e = this.entrants.get(id);
    if (!e || this.phase !== 'contest' || this.type !== 'keoco') return;
    e.likes += count;
    const pulls = Math.min(5, Math.floor(e.likes / 10));
    if (pulls){ e.likes -= pulls * 10; e.score += pulls * 0.5; this.dirty = true; }
  }

  tick(now: number){
    if (this.phase === 'idle'){ if (this.paused) this.nextAt = Math.max(this.nextAt, now + 60_000); else if (now >= this.nextAt) this.start(now); return; }
    if (now < this.endsAt) return;
    this.dirty = true;
    if (this.phase === 'lobby'){
      if (!this.entrants.size){ this.hooks.announce('Hội làng vắng người, hẹn lần sau'); this.finish(now); return; }
      this.phase = 'contest'; this.endsAt = now + FESTIVAL.contestMs;
      if (this.type === 'trangtri') for (const e of this.entrants.values()) e.score = this.hooks.beauty(e.id) + this.rng();
      this.hooks.announce(`Bắt đầu ${CONTESTS[this.type].name}! ${CONTESTS[this.type].how}`);
    } else if (this.phase === 'contest'){
      this.phase = 'result'; this.endsAt = now + FESTIVAL.resultMs;
      this.hooks.reward(this.placings(), this.type);
    } else this.finish(now);
  }

  private finish(now: number){
    this.phase = 'idle'; this.held++; this.nextAt = now + FESTIVAL.everyMs; this.entrants.clear();
  }

  teams(): [number, number] {
    const t: [number, number] = [0, 0];
    for (const e of this.entrants.values()) t[e.team] += e.score;
    return t;
  }

  placings(): Placing[] {
    const list = [...this.entrants.values()];
    if (this.type === 'keoco'){
      const [a, b] = this.teams(), win = a === b ? -1 : a > b ? 0 : 1;
      const ranked = list.sort((x, y) => y.score - x.score);
      this.winners = ranked.filter(e => e.team === win).slice(0, 3).map(e => e.name);
      return ranked.map((e, i) => ({ id: e.id, place: i + 1, won: e.team === win }));
    }
    const ranked = list.sort((x, y) => y.score - x.score);
    this.winners = ranked.slice(0, 3).filter(e => e.score > 0).map(e => e.name);
    return ranked.map((e, i) => ({ id: e.id, place: i + 1, won: i < 3 && e.score > 0 }));
  }

  pub(now: number): FestivalState {
    const all = [...this.entrants.values()].sort((a, b) => b.score - a.score);
    return {
      phase: this.phase, type: this.type,
      leftMs: Math.max(0, this.endsAt - now), nextInMs: Math.max(0, this.nextAt - now),
      entrants: all.slice(0, 40).map(({ id, name, score, team }) => ({ id, name, score: Math.round(score * 10) / 10, team })),
      count: all.length, teams: this.teams(), winners: this.winners,
    };
  }
}
