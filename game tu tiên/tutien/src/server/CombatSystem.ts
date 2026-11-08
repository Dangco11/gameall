import type { Skill, Vfx } from '../shared/game.ts';
import type { Fx, Pose } from '../shared/types.ts';

// Chiến đấu hoàn toàn ở server: chọn mục tiêu, di chuyển, hồi chiêu, chí mạng, né đòn, khiên, hồi máu, diện rộng.
// Màn hình chỉ nhận kết quả (Fx) để vẽ chiêu, số sát thương, ngã xuống.
export interface Fighter {
  id: string; name: string; team: number; npc: boolean; isBoss: boolean;
  x: number; z: number; ry: number; radius: number;
  hp: number; mhp: number; atk: number; def: number; spd: number; crit: number;
  skills: Skill[]; cd: Record<string, number>; nextAct: number;
  shieldUntil: number; shieldPct: number;
  down: boolean; downUntil: number; reviveMs: number;
  pose: Pose; poseUntil: number; tgt: string;
  dealt: number;             // sát thương gây ra trong trận
  support: boolean;
  hpMul: number;            // hệ số máu theo chế độ (PK dày máu hơn)
}
export type FighterInit = Pick<Fighter, 'id' | 'name' | 'team' | 'npc' | 'x' | 'z' | 'hp' | 'atk' | 'def' | 'spd' | 'crit' | 'skills'> & Partial<Fighter>;

export class CombatSystem {
  fighters = new Map<string, Fighter>();
  bounds = 26;
  hitCap = 1;               // một đòn tối đa bao nhiêu phần máu đối thủ (PK đặt thấp để trận không kết thúc sau 1 chiêu)
  rand: () => number;
  onFx: (f: Fx) => void;
  onDown: (victim: Fighter, by: Fighter | null) => void = () => {};
  onDamage: (by: Fighter, victim: Fighter, v: number) => void = () => {};
  constructor(onFx: (f: Fx) => void, rand: () => number = Math.random) { this.onFx = onFx; this.rand = rand; }

  clear() { this.fighters.clear(); }
  add(f: FighterInit): Fighter {
    const full: Fighter = { ry: 0, radius: 1.6, mhp: f.hp, cd: {}, nextAct: 0, shieldUntil: 0, shieldPct: 0, down: false, downUntil: 0, reviveMs: 0,
      pose: 'idle', poseUntil: 0, tgt: '', dealt: 0, support: false, isBoss: false, hpMul: 1, ...f };
    // hồi chiêu lệch nhau để cả đám không tung chiêu cùng một lúc
    for (const s of full.skills) full.cd[s.key] = this.rand() * s.cd * 0.6;
    this.fighters.set(full.id, full);
    return full;
  }
  remove(id: string) { this.fighters.delete(id); }
  alive(team?: number) { let n = 0; for (const f of this.fighters.values()) if (!f.down && (team === undefined || f.team === team)) n++; return n; }

  private dist(a: Fighter, b: Fighter) { return Math.hypot(a.x - b.x, a.z - b.z) - b.radius - a.radius * 0.5; }
  private enemies(f: Fighter) { const out: Fighter[] = []; for (const o of this.fighters.values()) if (!o.down && o.team !== f.team) out.push(o); return out; }
  private allies(f: Fighter) { const out: Fighter[] = []; for (const o of this.fighters.values()) if (!o.down && o.team === f.team) out.push(o); return out; }

  tick(dt: number, now: number) {
    for (const f of this.fighters.values()) {
      if (f.down) {
        if (f.reviveMs && now >= f.downUntil) { f.down = false; f.hp = Math.round(f.mhp * 0.6); f.pose = 'idle'; this.onFx({ k: 'up', id: f.id }); }
        continue;
      }
      if (f.isBoss) continue;                       // Boss do BossSystem điều khiển
      if (f.pose !== 'idle' && f.pose !== 'move' && now > f.poseUntil) f.pose = 'idle';
      for (const k in f.cd) f.cd[k] = Math.max(0, f.cd[k] - dt);
      const foes = this.enemies(f);
      if (!foes.length) { if (f.pose === 'move') f.pose = 'idle'; continue; }
      // hỗ trợ: đồng đội yếu thì hồi máu / dựng khiên
      if (f.support && now >= f.nextAct) {
        const weak = this.allies(f).filter(a => a.hp < a.mhp * 0.55).sort((a, b) => a.hp / a.mhp - b.hp / b.mhp)[0];
        const s = f.skills.find(s => (s.heal || s.shield) && f.cd[s.key] <= 0);
        if (weak && s && Math.hypot(weak.x - f.x, weak.z - f.z) <= s.range) { this.cast(f, s, weak, now); continue; }
      }
      let t = f.tgt ? this.fighters.get(f.tgt) : undefined;
      if (!t || t.down || t.team === f.team || this.rand() < 0.02) {
        // gần nhất, Boss luôn được ưu tiên khi đang đánh Boss
        t = foes.find(o => o.isBoss) ?? foes.reduce((b, o) => this.dist(f, o) < this.dist(f, b) ? o : b, foes[0]);
        f.tgt = t.id;
      }
      const d = this.dist(f, t);
      f.ry = Math.atan2(t.x - f.x, t.z - f.z);
      const ready = f.skills.filter(s => !s.heal && !s.shield && f.cd[s.key] <= 0 && d <= s.range).sort((a, b) => b.power - a.power);
      if (ready.length && now >= f.nextAct) { this.cast(f, ready[0], t, now); continue; }
      // vào tầm của chiêu cơ bản (tầm ngắn nhất), giữ khoảng cách với kẻ địch
      const want = Math.max(1.2, Math.min(...f.skills.filter(s => !s.heal && !s.shield).map(s => s.range)) * 0.8);
      if (d > want && now >= f.poseUntil) {
        const step = Math.min(d - want, f.spd * dt);
        const ang = f.ry + (this.rand() - 0.5) * 0.3;
        f.x += Math.sin(ang) * step; f.z += Math.cos(ang) * step;
        f.pose = 'move';
      } else if (f.pose === 'move') f.pose = 'idle';
      this.separate(f);
    }
  }

  // đẩy nhẹ các tu sĩ đứng chồng lên nhau, giữ trong sân
  private separate(f: Fighter) {
    for (const o of this.fighters.values()) {
      if (o === f || o.down) continue;
      const dx = f.x - o.x, dz = f.z - o.z, dd = Math.hypot(dx, dz), min = f.radius + o.radius;
      if (dd > 0.001 && dd < min) { const push = (min - dd) * (o.isBoss ? 1 : 0.5); f.x += dx / dd * push; f.z += dz / dd * push; }
    }
    const r = Math.hypot(f.x, f.z);
    if (r > this.bounds) { f.x *= this.bounds / r; f.z *= this.bounds / r; }
  }

  // tung chiêu: hồi chiêu, sát thương (đơn hoặc diện rộng), hồi máu, khiên
  cast(f: Fighter, s: Skill, t: Fighter, now: number, opts: { mul?: number; vfx?: Vfx; big?: boolean; name?: string } = {}) {
    f.cd[s.key] = s.cd;
    f.nextAct = now + 900 / Math.max(0.6, f.spd / 4.2);
    f.pose = s.heal || s.shield ? 'cast' : s.range > 10 ? 'cast' : 'atk';
    f.poseUntil = now + 650;
    this.onFx({ k: 'cast', id: f.id, vfx: opts.vfx ?? s.vfx, skill: opts.name ?? s.name, el: s.el, to: t.id, x: f.x, z: f.z, tx: t.x, tz: t.z, r: s.aoe, big: opts.big });
    if (s.heal || s.shield) {
      for (const a of this.allies(f)) {
        if (Math.hypot(a.x - t.x, a.z - t.z) > Math.max(2, s.aoe)) continue;
        if (s.heal) { const v = Math.round(Math.min(a.mhp - a.hp, f.atk * s.heal * (opts.mul ?? 1))); if (v > 0) { a.hp += v; this.onFx({ k: 'heal', id: a.id, v }); } }
        if (s.shield) { a.shieldUntil = now + 4000; a.shieldPct = s.shield; }
      }
      if (!s.power) return;
    }
    const targets = s.aoe > 0 ? this.enemies(f).filter(o => Math.hypot(o.x - t.x, o.z - t.z) <= s.aoe + o.radius) : [t];
    for (const o of targets) this.hit(f, o, s.power * (opts.mul ?? 1), s.aoe > 0, now, opts.big ? 3 : 1);
  }

  hit(f: Fighter, o: Fighter, power: number, area: boolean, now: number, capMul = 1) {
    if (o.down) return;
    if (!area && !o.isBoss && this.rand() < Math.min(0.22, 0.05 + Math.max(0, o.spd - f.spd) * 0.05)) {
      this.onFx({ k: 'dmg', id: o.id, v: 0, dodge: true, by: f.id });
      return;
    }
    const crit = this.rand() < f.crit;
    let v = f.atk * power * (0.88 + this.rand() * 0.24) * (f.atk / (f.atk + o.def * 0.9));
    if (crit) v *= 1.8;
    if (o.shieldUntil > now) v *= 1 - o.shieldPct;
    if (!o.isBoss) v = Math.min(v, o.mhp * Math.min(1, this.hitCap * capMul));
    v = Math.max(1, Math.round(v));
    this.apply(f, o, v, crit, now);
  }

  // sát thương đã tính sẵn (quà tặng, đòn Boss)
  apply(by: Fighter | null, o: Fighter, v: number, crit: boolean, now: number) {
    if (o.down) return;
    v = Math.max(1, Math.round(Math.min(v, o.hp)));
    o.hp -= v;
    if (by) { by.dealt += v; this.onDamage(by, o, v); }
    if (!o.isBoss && o.pose !== 'atk' && o.pose !== 'cast') { o.pose = 'hit'; o.poseUntil = now + 300; }
    this.onFx({ k: 'dmg', id: o.id, v, crit, by: by?.id ?? '', boss: o.isBoss });
    if (o.hp <= 0) {
      o.hp = 0; o.down = true; o.pose = 'down';
      o.downUntil = o.reviveMs ? now + o.reviveMs : Infinity;
      this.onFx({ k: 'down', id: o.id });
      this.onDown(o, by);
    }
  }
}
