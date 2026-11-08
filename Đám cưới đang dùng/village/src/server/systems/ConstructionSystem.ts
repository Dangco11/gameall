import { PROJECTS } from '../../shared/balance.ts';
import type { ProjectKey } from '../../shared/balance.ts';
import type { ProjectState } from '../../shared/types.ts';

const KEYS = Object.keys(PROJECTS) as ProjectKey[];
const RESERVE_PER_SECOND = 2;

// Công trình chung: cả làng góp điểm, xong hết cấp 1 của mọi công trình rồi mới tới cấp 2.
// Phần quà vượt trần một lần tặng vào kho làng, kho rót dần vào công trình, nên ai cũng thấy công trình lớn dần.
export class ConstructionSystem {
  list: ProjectState[];
  reserve = 0;
  dirty = true;

  constructor(saved: ProjectState[] = []){
    this.list = KEYS.map(key => {
      const s = saved.find(b => b.key === key);
      return { key, stage: Math.min(s?.stage ?? 0, PROJECTS[key].stages.length), points: s?.points ?? 0, total: s?.total ?? 0 };
    });
  }

  level(key: ProjectKey){ return this.list.find(b => b.key === key)!.stage; }

  active(){
    let best: ProjectState | null = null;
    for (const b of this.list) if (b.stage < PROJECTS[b.key].stages.length && (!best || b.stage < best.stage)) best = b;
    return best;
  }

  need(b: ProjectState){ return PROJECTS[b.key].stages[b.stage]?.need ?? 0; }

  // Góp điểm; trả về danh sách hạng mục vừa xong.
  add(points: number){
    const done: { project: ProjectKey; stageName: string }[] = [];
    let left = points;
    while (left > 0){
      const b = this.active();
      if (!b){ this.reserve += left; break; }
      const take = Math.min(left, this.need(b) - b.points);
      b.points += take; b.total += take; left -= take;
      if (b.points >= this.need(b) - 1e-6){
        done.push({ project: b.key, stageName: PROJECTS[b.key].stages[b.stage].name });
        b.stage++; b.points = 0;
      }
    }
    this.dirty = true;
    return done;
  }

  // Trần của một lần tặng quà: phần dư cất vào kho làng.
  addCapped(points: number, share: number){
    const b = this.active();
    const cap = b ? Math.max(1, (this.need(b) - b.points) * share + 1) : 0;
    const now = Math.min(points, cap);
    this.reserve += points - now;
    return this.add(now);
  }

  tick(dt: number){
    if (this.reserve <= 0 || !this.active()) return [];
    const n = Math.min(this.reserve, RESERVE_PER_SECOND * dt);
    this.reserve -= n;
    return this.add(n);
  }
}
