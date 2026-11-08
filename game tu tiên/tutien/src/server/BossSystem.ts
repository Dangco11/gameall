import { bossByKey, BOSSES } from '../shared/game.ts';
import type { BossDef, GiftTier } from '../shared/game.ts';
import type { BossPub, Fx } from '../shared/types.ts';
import type { CombatSystem, Fighter } from './CombatSystem.ts';

// Boss thế giới: máu tự tăng theo số tu sĩ vào đánh, 3 giai đoạn (70% tăng tốc + đòn diện rộng, 30% nổi giận + tuyệt chiêu),
// đòn lớn có vùng cảnh báo trước 0,9 giây, quà tặng là đòn đánh Boss. Sát thương Boss tính theo % máu tu sĩ
// nên tu sĩ cảnh giới thấp vẫn trụ được vài đòn, cảnh giới cao không bất tử.
const HP_PER_ATK = 170, MIN_HP = 14000;
const INTERVAL = [2600, 1900, 1400];

interface Pending { at: number; x: number; z: number; r: number; frac: number; all: boolean; tgt: string }

export class BossSystem {
  def: BossDef | null = null;
  f: Fighter | null = null;
  phase = 1;
  dmgBy = new Map<string, number>();
  killer = '';
  private nextAtk = 0; private nextUlt = 0; private pending: Pending[] = [];
  private lastBy: Fighter | null = null;
  private home = { x: 0, z: -4 };
  private order = 0;
  private combat: CombatSystem; private fx: (f: Fx) => void;
  pose: BossPub['p'] = 'idle'; private poseUntil = 0;
  constructor(combat: CombatSystem, fx: (f: Fx) => void) { this.combat = combat; this.fx = fx; }

  get alive() { return !!this.f && !this.f.down; }
  nextDef(key?: string) { if (key && bossByKey.has(key)) return bossByKey.get(key)!; return BOSSES[this.order++ % BOSSES.length]; }

  spawn(def: BossDef, now: number) {
    this.def = def; this.phase = 1; this.dmgBy.clear(); this.killer = ''; this.pending = []; this.lastBy = null;
    this.f = this.combat.add({ id: 'boss', name: def.name, team: 9, npc: true, isBoss: true, x: this.home.x, z: this.home.z, hp: MIN_HP, atk: 1, def: 10, spd: 2, crit: 0, skills: [], radius: def.body === 'dragon' ? 4.2 : 3.6 });
    this.nextAtk = now + 3500; this.nextUlt = now + 14000;
    this.setPose('roar', now, 1600);
    this.fx({ k: 'boss', ev: 'spawn', key: def.key, name: def.name });
  }
  // tu sĩ mới vào đánh: Boss trâu thêm tương ứng, phòng thủ theo mặt bằng chung
  scale(fighters: Fighter[]) {
    const f = this.f; if (!f || f.down || !this.def) return;
    const sumAtk = fighters.reduce((s, x) => s + x.atk, 0), avgDef = fighters.length ? fighters.reduce((s, x) => s + x.def, 0) / fighters.length : 10;
    const want = Math.max(MIN_HP, Math.round(sumAtk * HP_PER_ATK * this.def.hp));
    if (want > f.mhp) { f.hp += want - f.mhp; f.mhp = want; }
    f.def = Math.round(avgDef * 1.1);
  }
  private setPose(p: BossPub['p'], now: number, ms: number) { this.pose = p; this.poseUntil = now + ms; }
  noteDamage(by: Fighter, v: number) { this.dmgBy.set(by.id, (this.dmgBy.get(by.id) || 0) + v); this.lastBy = by; this.setPose(this.pose === 'idle' ? 'hit' : this.pose, Date.now(), 200); }

  tick(now: number): 'dead' | null {
    const f = this.f, def = this.def;
    if (!f || !def) return null;
    if (f.down) return null;
    if (now > this.poseUntil && this.pose !== 'move') this.pose = 'idle';
    // đổi giai đoạn
    const ratio = f.hp / f.mhp, ph = ratio <= 0.3 ? 3 : ratio <= 0.7 ? 2 : 1;
    if (ph > this.phase) {
      this.phase = ph;
      this.setPose(ph === 3 ? 'rage' : 'roar', now, 1800);
      this.fx({ k: 'boss', ev: 'phase', key: def.key, name: def.name, phase: ph });
      this.nextAtk = now + 1800;
    }
    // đòn đã cảnh báo: tới giờ thì giáng xuống
    for (const p of this.pending.splice(0)) {
      if (p.at > now) { this.pending.push(p); continue; }
      for (const o of this.combat.fighters.values()) {
        if (o.isBoss || o.down) continue;
        if (!p.all && Math.hypot(o.x - p.x, o.z - p.z) > p.r && o.id !== p.tgt) continue;
        const shield = o.shieldUntil > now ? 1 - o.shieldPct : 1;
        this.combat.apply(f, o, o.mhp * p.frac * shield * (0.9 + Math.random() * 0.2), false, now);
      }
    }
    const targets = [...this.combat.fighters.values()].filter(o => !o.isBoss && !o.down);
    if (!targets.length) return null;
    // quay về phía mục tiêu, thỉnh thoảng lướt tới gần
    const t = targets.find(o => o.id === f.tgt) ?? targets[Math.floor(Math.random() * targets.length)];
    f.tgt = t.id; f.ry = Math.atan2(t.x - f.x, t.z - f.z);
    if (this.pose === 'idle' && Math.random() < 0.01) {
      const ang = Math.random() * Math.PI * 2, r = Math.random() * 5;
      f.x = this.home.x + Math.sin(ang) * r; f.z = this.home.z + Math.cos(ang) * r; this.setPose('move', now, 900);
    }
    if (this.phase === 3 && now >= this.nextUlt) {
      this.nextUlt = now + 13000; this.nextAtk = now + 2600;
      this.setPose('cast', now, 2200);
      this.fx({ k: 'boss', ev: 'skill', key: def.key, name: def.name, skill: def.skills[2], x: f.x, z: f.z, r: 30, ult: true });
      this.pending.push({ at: now + 1500, x: f.x, z: f.z, r: 99, frac: 0.34, all: true, tgt: '' });
      return null;
    }
    if (now < this.nextAtk) return null;
    this.nextAtk = now + INTERVAL[this.phase - 1] * (0.85 + Math.random() * 0.3);
    if (this.phase >= 2 && Math.random() < 0.4) {
      // đòn diện rộng vào chỗ đông người
      const c = targets[Math.floor(Math.random() * targets.length)];
      this.setPose('cast', now, 1100);
      this.fx({ k: 'boss', ev: 'skill', key: def.key, name: def.name, skill: def.skills[1], x: c.x, z: c.z, r: 7 });
      this.pending.push({ at: now + 900, x: c.x, z: c.z, r: 7, frac: 0.24, all: false, tgt: '' });
    } else {
      this.setPose('atk', now, 800);
      this.fx({ k: 'boss', ev: 'skill', key: def.key, name: def.name, skill: def.skills[0], x: t.x, z: t.z, r: 2.5 });
      this.pending.push({ at: now + 700, x: t.x, z: t.z, r: 2.5, frac: 0.3, all: false, tgt: t.id });
    }
    return null;
  }

  // quà tặng: đòn đánh thẳng vào Boss, càng nhiều xu càng đau (một món quà tối đa 35% máu Boss)
  giftHit(by: Fighter | null, xu: number, tier: GiftTier, now: number) {
    const f = this.f; if (!f || f.down) return 0;
    const v = Math.min(f.mhp * 0.35, f.mhp * 0.004 * Math.pow(xu, 0.72) * tier.bossMul + (by ? by.atk * 2 : 0));
    this.combat.apply(by, f, v, xu >= 99, now);
    return v;
  }
  onDown(by: Fighter | null) {
    if (!this.def) return;
    this.killer = (by ?? this.lastBy)?.id ?? '';
    this.pose = 'die'; this.poseUntil = Date.now() + 999_999;
    this.fx({ k: 'boss', ev: 'die', key: this.def.key, name: this.def.name, killer: this.killer });
  }
  top(n = 5) { return [...this.dmgBy.entries()].sort((a, b) => b[1] - a[1]).slice(0, n); }
  flee() { if (this.def && this.f && !this.f.down) this.fx({ k: 'boss', ev: 'flee', key: this.def.key, name: this.def.name }); this.end(); }
  end() { if (this.f) this.combat.remove(this.f.id); this.f = null; this.def = null; this.pending = []; }
  pub(): BossPub | null {
    const f = this.f, d = this.def;
    if (!f || !d) return null;
    return { key: d.key, name: d.name, hp: Math.round(f.hp), mhp: Math.round(f.mhp), phase: this.phase, x: +f.x.toFixed(2), z: +f.z.toFixed(2), ry: +f.ry.toFixed(2), p: f.down ? 'die' : this.pose, tgt: f.tgt };
  }
}
