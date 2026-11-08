import { DANCES, DANCE_GROUPS, danceByNo } from '../../shared/dances.ts';
import type { DanceDef, DanceGroup } from '../../shared/dances.ts';
import type { Section } from './stage.ts';

// Chọn điệu nhảy cho từng người: ngẫu nhiên có trọng số trong 100 điệu, không lặp lại điệu vừa nhảy, mỗi người một gu riêng
// (nhóm ưa thích, thích điệu sung hay điệu nhẹ, nhấn phách sớm hay trễ một chút). Đoạn nhạc đổi thì đổi nhóm (êm: gợi cảm,
// party; drop: EDM, breakdance, VIP). Quà tặng, bình luận "nhảy ..." khoá một điệu / một nhóm cho người đó một lúc.
// Đổi điệu luôn vào đầu ô nhịp (4 phách) để chuyển động nối nhau đúng nhịp.

const GROUPS = Object.keys(DANCE_GROUPS) as DanceGroup[];
const SECTION_W: Record<Section, Record<DanceGroup, number>> = {
  calm: { sexy: 3, party: 1.6, tiktok: 1.5, hiphop: 1, edm: 0.4, break: 0.3, vip: 0.3 },
  groove: { hiphop: 2, tiktok: 2, party: 1.5, sexy: 1.2, edm: 1, break: 0.8, vip: 0.4 },
  build: { edm: 2, hiphop: 1.5, tiktok: 1.2, break: 1, party: 1, sexy: 0.5, vip: 0.5 },
  drop: { edm: 3, break: 2, vip: 1, hiphop: 1.2, party: 1, tiktok: 0.8, sexy: 0.3 },
};
export interface Style { fav: DanceGroup; fav2: DanceGroup; energy: number; offset: number; bars: number }
interface Lock { dance?: number; group?: DanceGroup; minEnergy?: number; until: number }
interface State { cur: DanceDef; until: number; start: number; history: number[]; lock: Lock | null; style: Style }

const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

export class DanceController {
  private st = new Map<string, State>();
  private rnd: () => number;
  constructor(rnd: () => number = Math.random){ this.rnd = rnd; }

  style(id: string): Style {
    const h = hash(id);
    return { fav: GROUPS[h % GROUPS.length], fav2: GROUPS[(h >>> 4) % GROUPS.length], energy: 0.6 + ((h >>> 8) % 9) / 10, offset: (((h >>> 12) % 7) - 3) * 0.015, bars: 2 + ((h >>> 16) % 3) };
  }

  // chọn điệu kế tiếp theo trọng số
  pick(id: string, section: Section, opts: { group?: DanceGroup; minEnergy?: number; exclude?: number[] } = {}): DanceDef {
    const s = this.st.get(id), style = s?.style ?? this.style(id), recent = new Set([...(s?.history ?? []).slice(-4), ...(opts.exclude ?? [])]);
    let pool = DANCES.filter(d => !recent.has(d.no) && (!opts.group || d.group === opts.group) && d.energy >= (opts.minEnergy ?? 0));
    if (!pool.length) pool = DANCES.filter(d => !recent.has(d.no));
    let sum = 0;
    const w = pool.map(d => {
      let x = d.weight * (opts.group ? 1 : SECTION_W[section][d.group]) * (d.group === style.fav ? 2.2 : d.group === style.fav2 ? 1.4 : 1);
      x *= 0.5 + (section === 'drop' || section === 'build' ? d.energy * style.energy : (6 - d.energy) * (1.6 - style.energy)) * 0.25;
      sum += x; return x;
    });
    let r = this.rnd() * sum;
    for (let i = 0; i < pool.length; i++){ r -= w[i]; if (r <= 0) return pool[i]; }
    return pool[pool.length - 1];
  }

  // điệu đang nhảy của người này ở phách `beat`; hết lượt (vài ô nhịp) thì đổi điệu ở đầu ô nhịp kế tiếp
  current(id: string, section: Section, beat: number): DanceDef {
    let s = this.st.get(id);
    if (s?.lock && beat > s.lock.until) s.lock = null;
    if (!s || beat >= s.until){
      const style = s?.style ?? this.style(id), lock = s?.lock ?? null;
      const cur = lock?.dance ? danceByNo(lock.dance) : this.pick(id, section, { group: lock?.group, minEnergy: lock?.minEnergy });
      const len = cur.r.beats * Math.max(1, Math.round(style.bars * 4 / cur.r.beats));
      const start = Math.ceil(beat / 4) * 4;
      const from = Math.floor(beat / 4) * 4;      // điệu mới bắt đầu từ động tác đầu tiên của nó, tính từ đầu ô nhịp này
      if (!s){ s = { cur, until: start + len, start: from, history: [cur.no], lock: null, style }; this.st.set(id, s); }
      else { s.cur = cur; s.until = start + len; s.start = from; s.history.push(cur.no); if (s.history.length > 8) s.history.shift(); }
    }
    return s.cur;
  }

  // khoá điệu (bình luận chọn điệu, quà, battle): đổi ngay ở đầu ô nhịp kế tiếp, giữ trong `beats` phách
  lock(id: string, beat: number, l: Omit<Lock, 'until'>, beats = 32){
    const s = this.st.get(id) ?? (this.current(id, 'groove', beat), this.st.get(id)!);
    s.lock = { ...l, until: beat + beats };
    s.until = Math.ceil(beat / 4) * 4;          // hết lượt điệu cũ ở đầu ô nhịp kế
    if (l.dance && s.cur.no === l.dance) s.until = beat + beats;
  }
  // nhạc vào drop: ai đang nhảy điệu nhẹ thì chuyển sang điệu sung ở ô nhịp kế
  drop(beat: number){ for (const s of this.st.values()) if (!s.lock && s.cur.energy < 4) s.until = Math.ceil(beat / 4) * 4; }
  // lệch phách đưa vào clip: điệu bắt đầu từ động tác đầu ở ô nhịp đổi điệu, cộng gu nhấn sớm / trễ của người đó
  offset(id: string){ const s = this.st.get(id); return (s?.style ?? this.style(id)).offset - (s?.start ?? 0); }
  forget(id: string){ this.st.delete(id); }
  get size(){ return this.st.size; }
}
