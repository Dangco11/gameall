import { BALANCE } from '../config/BalanceConfig.ts';
import type { SkillDef } from '../config/UnitConfig.ts';
import { BASES, LaneManager, adjacentLanes } from '../battle/LaneManager.ts';
import type { BattleManager } from '../battle/BattleManager.ts';
import { enemyOf } from '../types.ts';
import type { TeamKey } from '../types.ts';
import type { Target, Unit } from './Unit.ts';

// Luồng AI mỗi quân: SPAWN → (GATHER) → MOVE → FIND_TARGET → APPROACH → ATTACK → SKILL → DEATH hoặc MOVE tiếp.
// think() chạy thưa theo độ "nóng" (gần địch nghĩ mỗi nhịp, xa địch 3–6 nhịp một lần); act() chạy mỗi nhịp nhưng rất nhẹ.
const _pt = { x: 0, z: 0, nx: 0, nz: 0 };
const dist = (ax: number, az: number, bx: number, bz: number) => Math.hypot(bx - ax, bz - az);
export const turn = (a: number, b: number, k: number) => { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return a + d * Math.min(1, k); };

/* -------------------------------------------------------------- vị trí mục tiêu */
export function targetPos(t: Target, bm: BattleManager){
  if (t.kind === 'unit') return { x: t.unit.x, z: t.unit.z, r: t.unit.def.radius };
  const p = BASES[t.team][t.part];
  return { x: p.x, z: p.z, r: bm.bases[t.team].radius(t.part) };
}
// khoảng cách mép thân tới mép mục tiêu
export function gap(u: Unit, t: Target, bm: BattleManager){ const p = targetPos(t, bm); return dist(u.x, u.z, p.x, p.z) - u.def.radius - p.r; }

/* ---------------------------------------------------------------- tìm mục tiêu */
export const UnitTargetingController = {
  valid(u: Unit, t: Target | null, bm: BattleManager){
    if (!t) return false;
    if (t.kind === 'unit') return t.unit.alive && t.unit.state !== 'dead' && t.unit.team !== u.team && (u.hunt || gap(u, t, bm) < u.def.detect * 1.5 + (u.defend ? 14 : 0));
    return t.team !== u.team && bm.bases[t.team].canHit(t.part) && bm.aliveOf(t.team) === 0;
  },
  // Ngoài tầm nhìn không thấy địch: đi tìm con địch gần nhất trên cả sân (chỗ nào có địch là xông vào)
  hunt(u: Unit, bm: BattleManager): Unit | null {
    let best: Unit | null = null, bd = Infinity;
    for (const o of bm.units.values()){
      if (o.team === u.team || o.state === 'dead' || !o.alive) continue;
      const d = (o.x - u.x) ** 2 + (o.z - u.z) ** 2;
      if (d < bd){ bd = d; best = o; }
    }
    return best;
  },
  // số địch (của u) đứng quanh o trong bán kính r: dùng để xe, trâu, voi chọn chỗ đông quân
  crowd(bm: BattleManager, team: TeamKey, x: number, z: number, r: number){
    let n = 0;
    bm.grid.query(x, z, r, o => { if (o.team !== team && o.state !== 'dead' && dist(x, z, o.x, o.z) < r + o.def.radius) n++; });
    return n;
  },
  pick(u: Unit, bm: BattleManager): Unit | null {
    let best: Unit | null = null, bs = Infinity;
    const r = u.def.detect, role = u.def.role, hold = !bm.round.marching;
    bm.grid.query(u.x, u.z, r + 2, o => {
      if (o.team === u.team || o.state === 'dead' || !o.alive) return;
      if (hold && (u.team === 'trai' ? o.x > -1 : o.x < 1)) return;       // đang tập hợp: chỉ đánh địch đã lấn sang nửa sân nhà mình
      const d = dist(u.x, u.z, o.x, o.z) - o.def.radius - u.def.radius;
      if (d > r) return;
      let s = d;
      if (role === 'ranged') s = d - o.def.tier * 0.9;                                                         // mục tiêu nguy hiểm nhất trong tầm
      else if (role === 'raider' || role === 'breaker') s = d * 0.5 - UnitTargetingController.crowd(bm, u.team, o.x, o.z, 2.4) * 1.6;   // lao vào cụm quân
      else if (role === 'boss') s = d * 0.5 - UnitTargetingController.crowd(bm, u.team, o.x, o.z, 3.2) * 1.2 - o.def.tier * 0.4;
      else if (role === 'tank') s = d - (o.def.projectile ? 0 : 0.6);                                          // tank chặn quân cận chiến
      if (o.target?.kind === 'base' && o.target.team === u.team) s -= 3;                                       // địch đang phá nhà mình
      if (s < bs){ bs = s; best = o; }
    });
    return best;
  },
  // Phe địch đã hết quân trên sân: tới căn cứ địch đánh cổng, cổng vỡ thì đánh nhà chính. Còn lính địch thì không đánh nhà.
  structure(u: Unit, bm: BattleManager): Target | null {
    const e = enemyOf(u.team), b = bm.bases[e];
    if (bm.aliveOf(e) > 0) return null;
    if (b.canHit('gate') && dist(u.x, u.z, BASES[e].gate.x, BASES[e].gate.z) < u.def.detect + 2) return { kind: 'base', team: e, part: 'gate' };
    if (b.canHit('house') && dist(u.x, u.z, BASES[e].house.x, BASES[e].house.z) < u.def.detect + 5) return { kind: 'base', team: e, part: 'house' };
    return null;
  },
};

/* ------------------------------------------------------------------- di chuyển */
export const UnitMovementController = {
  speed(u: Unit, bm: BattleManager){
    const boost = u.boostT > 0 ? u.def.skills.find(s => s.key === 'boost')?.speedMult ?? 1 : 1;
    return u.def.speed * bm.round.phase.speed * boost;
  },
  toward(u: Unit, tx: number, tz: number, bm: BattleManager, dt: number, mult = 1){
    const dx = tx - u.x, dz = tz - u.z, d = Math.hypot(dx, dz);
    if (d < 0.04) return 0;
    const step = Math.min(d, UnitMovementController.speed(u, bm) * mult * dt);
    u.x += dx / d * step; u.z += dz / d * step;
    u.yaw = turn(u.yaw, Math.atan2(dx, dz), dt * 9);
    return step;
  },
  face(u: Unit, tx: number, tz: number, dt: number){ u.yaw = turn(u.yaw, Math.atan2(tx - u.x, tz - u.z), dt * 10); },
  // Đi theo làn: nhắm điểm phía trước 2 m trên đường làn, cộng độ lệch ngang của đội hình.
  // Xạ thủ không vượt quân cận chiến của phe mình; dân binh không vượt đấu sĩ đang dẫn đầu cùng làn.
  march(u: Unit, bm: BattleManager, dt: number){
    const L = LaneManager.length(u.lane);
    u.s = LaneManager.project(u.lane, u.team, u.x, u.z);
    let goal = Math.min(L, u.s + 2);
    const f = bm.front[u.team][u.lane];
    let holding = false;
    if (u.def.role === 'ranged' && f.melee > 0){ const cap = f.melee - 1.8; if (goal > cap){ goal = Math.max(u.s, cap); holding = goal <= u.s + 0.05; } }
    if (u.def.role === 'swarm' && f.tank > 0 && u.s < f.tank + 0.5 && f.tank - u.s < 6){ const cap = f.tank - 0.8; if (goal > cap){ goal = Math.max(u.s, cap); holding = goal <= u.s + 0.05; } }
    LaneManager.point(u.lane, u.team, goal, _pt);
    const lat = u.lateral * Math.min(1, Math.min(u.s, L - u.s) / 3);   // gần hai đầu làn thì dồn vào cổng
    UnitMovementController.toward(u, _pt.x + _pt.nx * lat, _pt.z + _pt.nz * lat, bm, dt);
    if (holding){ u.stuckX = u.x; u.stuckZ = u.z; u.stuckT = 0; }
  },
  gatherSpot(u: Unit){
    const s = Math.max(1.5, 7.4 - u.rank * 1.15 - ((u.id * 7) % 5) * 0.4);
    LaneManager.point(u.lane, u.team, s, _pt);
    return { x: _pt.x + _pt.nx * u.lateral * 1.1, z: _pt.z + _pt.nz * u.lateral * 1.1 };
  },
  // đứng yên quá lâu khi đang đi: đổi chỗ trong đội hình, bỏ mục tiêu không tới được
  unstick(u: Unit, bm: BattleManager){
    if (u.state !== 'move' && u.state !== 'approach'){ u.stuckT = 0; u.stuckX = u.x; u.stuckZ = u.z; return; }
    if (dist(u.x, u.z, u.stuckX, u.stuckZ) > 0.3){ u.stuckT = 0; u.stuckX = u.x; u.stuckZ = u.z; return; }
    u.stuckT += 1;
    if (u.stuckT < BALANCE.stuckSec) return;
    u.stuckT = 0;
    u.lateral = (bm.rnd() - 0.5) * 2;
    u.x += (bm.rnd() - 0.5) * 0.6; u.z += (bm.rnd() - 0.5) * 0.6;
    if (u.state === 'approach'){ u.target = null; u.defend = false; }
    bm.counters.unstuck++;
  },
};

/* ---------------------------------------------------------------------- đổi làn */
// Chỉ đổi khi làn mình không còn địch mà làn kề bên đang thua thiệt rõ; mỗi quân 10 giây mới được đổi một lần.
export function considerLaneChange(u: Unit, bm: BattleManager){
  if (u.laneCd > 0 || bm.laneSwitches[u.team] >= BALANCE.laneSwitchPerTick || !bm.round.marching) return false;
  const e = enemyOf(u.team), need = (l: number) => bm.lanePower[e][l] - bm.lanePower[u.team][l];
  const cur = need(u.lane);
  if (bm.lanePower[e][u.lane] > 0) return false;                  // làn mình vẫn còn địch
  let best = -1, bn = Math.max(0, cur) + BALANCE.laneNeedThreshold;
  for (const l of adjacentLanes(u.lane)){ const n = need(l); if (n > bn){ bn = n; best = l; } }
  if (best < 0) return false;
  u.lane = best as Unit['lane']; u.s = LaneManager.project(u.lane, u.team, u.x, u.z); u.laneCd = BALANCE.laneChangeCd;
  bm.laneSwitches[u.team]++; bm.lanePower[u.team][best] += u.def.giftValue * u.stack;   // cập nhật ngay để quân sau không đổ dồn theo
  bm.emit({ e: 'lane', id: u.id, lane: u.lane });
  return true;
}

/* ------------------------------------------------------------------- nghĩ */
export function think(u: Unit, bm: BattleManager){
  const T = UnitTargetingController;
  if (!T.valid(u, u.target, bm)){ u.target = null; u.defend = false; u.hunt = false; }
  // căn cứ nhà mình bị đánh: quân đang ở gần quay về giữ nhà
  const threat = bm.threat[u.team];
  if (threat.length && (!u.target || u.target.kind === 'base') && dist(u.x, u.z, BASES[u.team].gate.x, BASES[u.team].gate.z) < BALANCE.defendCall){
    let a: Unit | null = null, ad = Infinity;
    for (const t of threat){ const d = dist(u.x, u.z, t.x, t.z); if (d < ad){ ad = d; a = t; } }
    if (a){ u.target = { kind: 'unit', unit: a }; u.defend = true; }
  }
  const cur = u.target?.kind === 'unit' ? u.target.unit : null;
  let found = false;
  if (!u.defend){
    const c = T.pick(u, bm);
    if (c){
      found = true;
      if (!u.target || u.target.kind === 'base' || u.hunt){ u.target = { kind: 'unit', unit: c }; u.hunt = false; }
      else if (cur && c !== cur && gap(u, u.target, bm) > u.def.range + 0.3 && dist(u.x, u.z, c.x, c.z) + 1.5 < dist(u.x, u.z, cur.x, cur.z)) u.target = { kind: 'unit', unit: c };
    }
  }
  // không có địch trong tầm mà sân còn địch: đi thẳng tới con gần nhất; hết địch thì tiến về phá căn cứ
  if (bm.round.marching && !u.defend && (!u.target || u.hunt)){ const h = T.hunt(u, bm); if (h){ u.target = { kind: 'unit', unit: h }; u.hunt = true; } }
  if (!u.target) u.target = T.structure(u, bm);
  if (!u.target && bm.round.marching) considerLaneChange(u, bm);
  UnitSkillController.consider(u, bm);
  // AI LOD: quân đang giao tranh nghĩ mỗi nhịp; xa địch thì 3 hoặc 6 nhịp một lần
  if (u.hunt && u.target?.kind === 'unit'){ const d = dist(u.x, u.z, u.target.unit.x, u.target.unit.z); u.thinkIn = d < BALANCE.ai.hotDist ? BALANCE.ai.hotTicks : d < BALANCE.ai.warmDist ? BALANCE.ai.warmTicks : BALANCE.ai.coldTicks; }
  else if (u.target || found || u.defend) u.thinkIn = BALANCE.ai.hotTicks;
  else {
    const ef = bm.enemyFrontX(u.team, u.lane), d = ef === null ? Infinity : Math.abs(ef - u.x);
    u.thinkIn = d < BALANCE.ai.hotDist ? BALANCE.ai.hotTicks : d < BALANCE.ai.warmDist ? BALANCE.ai.warmTicks : BALANCE.ai.coldTicks;
  }
  bm.counters.thinks++;
}

/* --------------------------------------------------------------- chiến đấu */
export const UnitCombatController = {
  begin(u: Unit, bm: BattleManager){
    const t = u.target!;
    const volley = u.volleyT > 0 ? u.def.skills.find(s => s.key === 'volley')?.speedMult ?? 1 : 1;
    u.atkT = 0; u.atkHit = false; u.atkCd = u.def.attackCd / volley; u.atkVariant = Math.floor(bm.rnd() * 3);
    u.state = 'attack';
    bm.emit({ e: 'atk', id: u.id, t: t.kind === 'unit' ? t.unit.id : t.part === 'gate' ? -1 : -2, tt: t.kind === 'base' ? t.team : undefined, v: u.atkVariant });
  },
  // đúng thời điểm vung tay / bắn trong hoạt ảnh thì mới gây sát thương
  resolve(u: Unit, bm: BattleManager){
    u.atkHit = true;
    const t = u.target;
    if (!t || !UnitTargetingController.valid(u, t, bm)) return;
    const raw = bm.rawDamage(u);
    if (u.def.projectile){
      const p = targetPos(t, bm), d = dist(u.x, u.z, p.x, p.z), ms = Math.round(d / u.def.projectile.speed * 1000);
      bm.shoot(u, t, raw, ms);
      bm.emit({ e: 'shot', id: u.id, t: t.kind === 'unit' ? t.unit.id : t.part === 'gate' ? -1 : -2, tt: t.kind === 'base' ? t.team : undefined, x: r2(u.x), z: r2(u.z), tx: r2(p.x), tz: r2(p.z), ms });
      return;
    }
    if (t.kind === 'base'){ bm.damageBase(u, t.team, t.part, raw.dmg * u.def.siege, raw.crit); return; }
    const o = t.unit, dx = o.x - u.x, dz = o.z - u.z, d = Math.hypot(dx, dz) || 1;
    bm.damageUnit(u, o, raw.dmg, { crit: raw.crit, knock: u.def.knock, dirX: dx / d, dirZ: dz / d });
  },
};
const r2 = (v: number) => Math.round(v * 100) / 100;

/* --------------------------------------------------------------- kỹ năng */
export const UnitSkillController = {
  def(u: Unit, key: string){ return u.def.skills.find(s => s.key === key); },
  ready(u: Unit, s: SkillDef){ return (u.skillCd[s.key] ?? 0) <= 0; },
  consider(u: Unit, bm: BattleManager){
    if (u.skill || u.stunT > 0 || u.y > 0 || (u.atkT >= 0 && !u.atkHit) || u.state === 'spawn' || u.state === 'dead') return;
    const C = UnitTargetingController.crowd;
    for (const s of u.def.skills){
      if (!UnitSkillController.ready(u, s)) continue;
      const t = u.target;
      switch (s.key){
        case 'volley':
          if (t && gap(u, t, bm) <= u.def.range){ u.volleyT = s.duration; u.skillCd[s.key] = s.cd; bm.emit({ e: 'skill', id: u.id, k: s.key, x: r2(u.x), z: r2(u.z), r: 0, phase: 'start' }); }
          break;
        case 'slam':
          if (t?.kind === 'unit' && gap(u, t, bm) <= u.def.range + 0.5 && (C(bm, u.team, u.x, u.z, s.radius) >= s.minTargets || t.unit.def.tier >= 3)) UnitSkillController.start(u, s, bm);
          break;
        case 'boost':
          if (t && bm.round.marching){ const g = gap(u, t, bm); if (g > 2.5 && g < s.range){ u.boostT = s.duration; u.skillCd[s.key] = s.cd; bm.emit({ e: 'skill', id: u.id, k: s.key, x: r2(u.x), z: r2(u.z), r: s.radius, phase: 'start' }); } }
          break;
        case 'charge':
          if (t?.kind === 'unit'){ const g = gap(u, t, bm); if (g > 1.5 && g < s.range && (C(bm, u.team, t.unit.x, t.unit.z, 3) >= s.minTargets || t.unit.def.tier >= 4)) UnitSkillController.start(u, s, bm); }
          break;
        case 'stomp':
          if (t && (C(bm, u.team, u.x, u.z, s.radius) >= s.minTargets || (t.kind === 'unit' && gap(u, t, bm) < s.radius * 0.6))) UnitSkillController.start(u, s, bm);
          break;
        case 'roar':
          if (C(bm, u.team, u.x, u.z, s.radius) >= s.minTargets) UnitSkillController.start(u, s, bm);
          break;
      }
      if (u.skill) return;
    }
  },
  start(u: Unit, s: SkillDef, bm: BattleManager){
    u.skill = s.key; u.skillT = 0; u.skillHit = false; u.skillCd[s.key] = s.cd; u.state = 'skill'; u.atkT = -1;
    const fwd = s.key === 'slam' ? 0.7 : 0;
    u.skillX = u.x + Math.sin(u.yaw) * fwd; u.skillZ = u.z + Math.cos(u.yaw) * fwd;
    if (s.key === 'charge' && u.target){ const p = targetPos(u.target, bm), dx = p.x - u.x, dz = p.z - u.z, d = Math.hypot(dx, dz) || 1; u.chargeDx = dx / d; u.chargeDz = dz / d; u.chargeHit.clear(); u.yaw = Math.atan2(dx, dz); }
    bm.emit({ e: 'skill', id: u.id, k: s.key, x: r2(u.skillX), z: r2(u.skillZ), r: s.radius, phase: 'start' });
  },
  // gọi mỗi nhịp khi đang ra chiêu; trả về false khi chiêu đã xong
  update(u: Unit, bm: BattleManager, dt: number){
    const s = UnitSkillController.def(u, u.skill);
    if (!s){ u.skill = ''; return false; }
    u.skillT += dt;
    if (s.key === 'charge'){
      if (u.skillT < s.windup) return true;                         // cúi đầu lấy đà
      if (!u.skillHit){ u.skillHit = true; u.chargeT = 0; }
      u.chargeT += dt;
      const step = u.def.speed * s.speedMult * dt;
      u.x += u.chargeDx * step; u.z += u.chargeDz * step;
      // húc xuyên: mỗi địch trên đường đi bị trúng một lần, hất văng sang hai bên
      bm.grid.query(u.x, u.z, s.radius + 1.8, o => {
        if (o.team === u.team || o.state === 'dead' || u.chargeHit.has(o.id)) return;
        if (dist(u.x, u.z, o.x, o.z) > s.radius + o.def.radius) return;
        u.chargeHit.add(o.id);
        const side = (o.x - u.x) * u.chargeDz - (o.z - u.z) * u.chargeDx >= 0 ? 1 : -1;
        const raw = bm.rawDamage(u);
        bm.damageUnit(u, o, raw.dmg * s.dmgMult, { crit: raw.crit, knock: s.knock, lift: s.lift, stun: s.stun, dirX: u.chargeDx * 0.5 + u.chargeDz * side, dirZ: u.chargeDz * 0.5 - u.chargeDx * side, aoe: true });
      });
      if (u.chargeT >= s.duration || u.chargeHit.size >= 14){ u.skill = ''; bm.emit({ e: 'skill', id: u.id, k: s.key, x: r2(u.x), z: r2(u.z), r: s.radius, phase: 'end' }); return false; }
      return true;
    }
    if (!u.skillHit && u.skillT >= s.windup){
      u.skillHit = true;
      const raw = bm.rawDamage(u);
      bm.area(u, u.skillX, u.skillZ, s.radius, raw.dmg * s.dmgMult, raw.crit, s);
      bm.emit({ e: 'skill', id: u.id, k: s.key, x: r2(u.skillX), z: r2(u.skillZ), r: s.radius, phase: 'hit' });
    }
    if (u.skillT >= s.windup + 0.4){ u.skill = ''; return false; }
    return true;
  },
};

/* ------------------------------------------------------------------- hành động mỗi nhịp */
export function act(u: Unit, bm: BattleManager, dt: number){
  u.atkCd -= dt; u.laneCd -= dt; u.boostT -= dt; u.volleyT -= dt; u.blockFlash -= dt; u.stateT += dt;
  for (const k of Object.keys(u.skillCd) as (keyof typeof u.skillCd)[]) u.skillCd[k] = (u.skillCd[k] ?? 0) - dt;
  if (u.state === 'dead'){ u.deadT += dt; return; }
  if (u.state === 'spawn'){ if (u.stateT < 0.8) return; setState(u, bm.round.marching ? 'move' : 'gather'); }
  // bị hất tung hoặc choáng: không làm gì được
  if (u.stunT > 0 || u.y > 0){ u.stunT -= dt; if (u.state !== 'stun') setState(u, 'stun'); u.atkT = -1; if (u.skill !== 'charge') u.skill = ''; return; }
  if (u.state === 'stun') setState(u, 'move');
  if (!bm.round.running && bm.round.state !== 'countdown'){ return; }
  if (u.skill){ if (UnitSkillController.update(u, bm, dt)) return; setState(u, 'move'); }
  // đang vung đòn: đứng lại cho tới khi trúng, rồi hồi một chút
  if (u.atkT >= 0){
    u.atkT += dt;
    if (u.target){ const p = targetPos(u.target, bm); UnitMovementController.face(u, p.x, p.z, dt); }
    if (!u.atkHit && u.atkT >= u.def.windup) UnitCombatController.resolve(u, bm);
    if (u.atkT >= u.def.windup + 0.25) u.atkT = -1; else return;
  }
  // xe chiến đang tăng tốc chạm mục tiêu: tông cả cụm, hất tung
  if (u.boostT > 0 && u.target){
    const s = UnitSkillController.def(u, 'boost')!;
    if (gap(u, u.target, bm) <= u.def.range + 0.4){
      u.boostT = 0;
      const raw = bm.rawDamage(u);
      bm.area(u, u.x + Math.sin(u.yaw) * 0.8, u.z + Math.cos(u.yaw) * 0.8, s.radius, raw.dmg * s.dmgMult, raw.crit, s);
      bm.emit({ e: 'skill', id: u.id, k: 'boost', x: r2(u.x), z: r2(u.z), r: s.radius, phase: 'hit' });
    }
  }
  const t = u.target;
  if (t){
    const g = gap(u, t, bm), p = targetPos(t, bm);
    // xạ thủ bị áp sát: lùi lại giữ khoảng cách
    if (u.def.projectile && t.kind === 'unit' && g < u.def.projectile.minRange && u.atkCd > 0.25){
      const dx = u.x - p.x, dz = u.z - p.z, d = Math.hypot(dx, dz) || 1;
      UnitMovementController.toward(u, u.x + dx / d * 2, u.z + dz / d * 2, bm, dt, 0.8);
      UnitMovementController.face(u, p.x, p.z, dt * 2);
      setState(u, 'approach');
    } else if (g <= u.def.range){
      UnitMovementController.face(u, p.x, p.z, dt);
      if (u.atkCd <= 0) UnitCombatController.begin(u, bm); else if (u.state !== 'attack') setState(u, 'attack');
    } else { UnitMovementController.toward(u, p.x, p.z, bm, dt); setState(u, 'approach'); }
  } else if (!bm.round.marching){
    const g = UnitMovementController.gatherSpot(u);
    if (UnitMovementController.toward(u, g.x, g.z, bm, dt, 0.8) < 0.01) UnitMovementController.face(u, u.x + (u.team === 'trai' ? 1 : -1), u.z, dt);
    setState(u, 'gather');
  } else { UnitMovementController.march(u, bm, dt); setState(u, 'move'); }
  // trâu giẫm đạp: địch dưới chân mất máu mỗi giây
  const tr = u.kind === 'trau' ? UnitSkillController.def(u, 'trample') : undefined;
  if (tr && (u.skillCd.trample ?? 0) <= 0 && u.state !== 'gather'){
    u.skillCd.trample = tr.cd;
    const raw = bm.rawDamage(u);
    bm.area(u, u.x, u.z, tr.radius, raw.dmg * tr.dmgMult, false, tr, true);
  }
}
function setState(u: Unit, s: Unit['state']){ if (u.state !== s){ u.state = s; u.stateT = 0; } }
