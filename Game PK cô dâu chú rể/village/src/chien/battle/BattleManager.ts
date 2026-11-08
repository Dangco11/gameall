import { BALANCE } from '../config/BalanceConfig.ts';
import { BATTLE } from '../config/BattleConfig.ts';
import type { BattleConfig } from '../config/BattleConfig.ts';
import { UNITS } from '../config/UnitConfig.ts';
import type { SkillDef, UnitKind } from '../config/UnitConfig.ts';
import { PlayerRegistry, scoreOf } from '../players/PlayerRegistry.ts';
import { FLAG, STATE_CODES, TEAM_KEYS, UNIT_STRIDE, enemyOf } from '../types.ts';
import type { Hud, LaneId, PlayerIdentity, RoundResult, SimEvent, TeamHud, TeamKey, UnitInfo } from '../types.ts';
import { UnitFactory, UnitPool } from '../units/Unit.ts';
import type { Target, Unit } from '../units/Unit.ts';
import { UnitMovementController, act, think } from '../units/UnitAI.ts';
import { BaseController } from './BaseController.ts';
import { BattleRoundManager } from './BattleRoundManager.ts';
import { BASES, FIELD, LaneManager, OBSTACLES, SpatialGrid } from './LaneManager.ts';
import { TeamManager } from './TeamManager.ts';

// Ai gây sát thương: quân đang sống, hoặc bản chụp của quân đã bắn mũi tên rồi chết
export interface HitSource { id: number; team: TeamKey; owner: string; ownerName: string; kind: UnitKind }
export interface HitOpts { crit?: boolean; knock?: number; lift?: number; stun?: number; dirX?: number; dirZ?: number; aoe?: boolean }
interface Projectile { src: HitSource; target: Target; at: number; dmg: number; crit: boolean; siege: number }
interface SpawnReq { owner: string; kind: UnitKind; team: TeamKey; like?: boolean }

// Mô phỏng chạy độc lập với đồ họa: server gọi tick() 10 lần mỗi giây, màn hình chỉ nội suy và vẽ.
export class BattleManager {
  readonly cfg: BattleConfig;
  readonly players = new PlayerRegistry();
  readonly teams: TeamManager;
  readonly round: BattleRoundManager;
  readonly bases: Record<TeamKey, BaseController>;
  readonly grid = new SpatialGrid<Unit>();
  readonly units = new Map<number, Unit>();
  readonly pool = new UnitPool();
  readonly pending: Record<TeamKey, SpawnReq[]> = { trai: [], gai: [] };
  readonly front: Record<TeamKey, { melee: number; tank: number }[]> = { trai: [], gai: [] };
  readonly lanePower: Record<TeamKey, [number, number, number]> = { trai: [0, 0, 0], gai: [0, 0, 0] };
  readonly threat: Record<TeamKey, Unit[]> = { trai: [], gai: [] };
  readonly laneSwitches: Record<TeamKey, number> = { trai: 0, gai: 0 };
  readonly counters = { thinks: 0, unstuck: 0, friendlyBlocked: 0, merged: 0, spawned: 0, kills: 0, dropped: 0 };
  result: RoundResult | null = null;
  tickN = 0; time = 0;
  private events: SimEvent[] = [];
  private projectiles: Projectile[] = [];
  private nextId = 1;
  private seed: number;
  private deferred: (() => void)[] = [];               // quà tới lúc đang hiện kết quả: tính vào vòng sau
  private teamCount: Record<TeamKey, number> = { trai: 0, gai: 0 };
  private enemyFront: Record<TeamKey, (number | null)[]> = { trai: [null, null, null], gai: [null, null, null] };
  private threatTick: Record<TeamKey, number> = { trai: -999, gai: -999 };
  private teamDamage: Record<TeamKey, number> = { trai: 0, gai: 0 };
  private teamKills: Record<TeamKey, number> = { trai: 0, gai: 0 };
  pot = 0;                                              // quỹ lực chiến của trận đang đánh

  constructor(cfg: BattleConfig = BATTLE, seed = 12345){
    this.cfg = cfg; this.seed = seed;
    this.round = new BattleRoundManager(cfg);
    this.bases = { trai: new BaseController('trai', cfg.base), gai: new BaseController('gai', cfg.base) };
    this.teams = new TeamManager(this.players, (id, team) => this.hasForces(id, team));
    for (const t of TEAM_KEYS) this.front[t] = [0, 1, 2].map(() => ({ melee: 0, tank: 0 }));
  }

  // ngẫu nhiên có hạt giống: cùng hạt giống, cùng chuỗi quà thì ra cùng trận (để kiểm thử)
  rnd(){ let t = (this.seed += 0x6D2B79F5); t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
  emit(ev: SimEvent){ this.events.push(ev); }
  takeEvents(){ const e = this.events; this.events = []; return e; }
  peekEvents(): readonly SimEvent[] { return this.events; }
  get dt(){ return this.cfg.tickMs / 1000; }
  get alive(){ let n = 0; for (const u of this.units.values()) if (u.state !== 'dead') n++; return n; }

  private hasOnField(userId: string, team: TeamKey){
    for (const u of this.units.values()) if (u.owner === userId && u.team === team && u.state !== 'dead') return true;
    return false;
  }
  hasForces(userId: string, team: TeamKey){
    for (const u of this.units.values()) if (u.owner === userId && u.team === team && u.state !== 'dead') return true;
    return this.pending[team].some(r => r.owner === userId);
  }

  /* ------------------------------------------------------------ vòng đấu */
  start(){
    if (this.round.state === 'ended') this.resetRound(false);
    if (!this.round.begin()) return false;
    this.emit({ e: 'round', state: 'countdown', round: this.round.round });
    this.runDeferred();
    return true;
  }
  // Host bấm Bắt đầu: chưa mở trận thì mở, đang đếm ngược hay Tập hợp thì xuất quân ngay
  go(){
    if (this.round.state === 'idle' || this.round.state === 'ended') this.start();
    const was = this.round.state;
    if (!this.round.go()) return false;
    if (was === 'countdown') this.emit({ e: 'round', state: 'running', round: this.round.round });
    return true;
  }
  pause(){ if (this.round.pause()){ this.emit({ e: 'round', state: 'paused', round: this.round.round }); return true; } return false; }
  resume(){ if (this.round.resume()){ this.emit({ e: 'round', state: this.round.state, round: this.round.round }); return true; } return false; }
  endNow(){ if (this.round.state === 'idle' || this.round.state === 'ended') return false; this.finish(); return true; }

  // Dọn sân cho vòng mới: xóa quân, đạn, điểm, bảng xếp hạng; giữ người chơi, phe đã chọn và cấu hình.
  // clearPending=false (vòng tự nối tiếp): quà đã tặng mà chưa kịp ra quân vẫn được ra ở vòng mới.
  resetRound(clearPending = true){
    this.likeSpawned.clear();
    for (const u of this.units.values()) this.pool.give(u);
    this.units.clear(); this.projectiles.length = 0;
    if (clearPending){ this.pending.trai.length = 0; this.pending.gai.length = 0; this.deferred.length = 0; }
    for (const t of TEAM_KEYS){ this.bases[t].reset(); this.teamDamage[t] = 0; this.teamKills[t] = 0; this.threat[t] = []; }
    this.players.resetRound();
    this.result = null; this.pot = 0;
    if (clearPending){ this.round.reset(); this.emit({ e: 'round', state: 'idle', round: this.round.round }); }
  }
  // quà tặng lúc đang hiện kết quả: chạy sau khi vòng mới đã mở (không thì bị hoãn tiếp)
  private runDeferred(){ const later = this.deferred.splice(0); for (const f of later) f(); }

  /* ------------------------------------------------------------- xuất quân */
  // Quà đã quy đổi: thêm units quân loại kind vào kho của phe; kho ra sân dần (tối đa 6 quân/nhịp/phe, sân đầy thì chờ chỗ trống).
  // giftXu: tổng xu của các quà này (cộng vào điểm), không phụ thuộc số quân ra.
  summon(p: PlayerIdentity, kind: UnitKind, units: number, giftXu: number, forced?: TeamKey){
    if (this.round.state === 'ended'){ this.deferred.push(() => this.summon(p, kind, units, giftXu, forced)); return { team: p.Team ?? forced ?? 'trai', queued: units, deferred: true }; }
    const team = this.teams.resolve(p, forced);
    this.players.addGift(p, giftXu);
    // gọi lính ra là góp lực chiến vào quỹ chung của trận PK
    const power = Math.round(giftXu * BALANCE.powerPerXu); this.players.addPower(p, power); this.pot += power;
    // quân từ quà xếp trước quân từ tim
    const q = this.pending[team], at = q.findIndex(r => r.like), add: SpawnReq[] = [];
    for (let i = 0; i < units; i++) add.push({ owner: p.UserId, kind, team });
    if (at < 0) for (const r of add) q.push(r); else q.splice(at, 0, ...add);
    if (this.round.state === 'idle') this.start();               // có quà mà chưa mở trận thì tự mở
    return { team, queued: units, deferred: false };
  }

  likesPerUnit = BALANCE.likesPerUnit; likeUnitsMax = BALANCE.likeUnitsMax;
  // Thả tim: đủ số tim thì ra Dân binh miễn phí (không góp lực chiến). Có giới hạn mỗi người mỗi vòng và số chờ trong kho,
  // để tim không lấn quân từ quà. Tim thừa được giữ lại cho lần sau.
  like(p: PlayerIdentity, count: number, forced?: TeamKey){
    const per = this.likesPerUnit;
    if (per <= 0 || count <= 0) return { team: p.Team ?? forced ?? 'trai', units: 0 };
    const team = this.teams.resolve(p, forced);
    p.likeBank = Math.min((p.likeBank ?? 0) + count, per * Math.max(1, this.likeUnitsMax));
    p.round.likes += count;
    if (this.round.state === 'ended') return { team, units: 0 };                 // giữa hai vòng: giữ tim, vòng sau ra quân
    const q = this.pending[team], waiting = q.reduce((n, r) => n + (r.like ? 1 : 0), 0);
    const units = Math.min(Math.floor(p.likeBank / per), Math.max(0, this.likeUnitsMax - this.likeUnits(p)), Math.max(0, BALANCE.likePendingMax - waiting));
    if (units <= 0) return { team, units: 0 };
    p.likeBank -= units * per;
    this.likeSpawned.set(p.UserId, this.likeUnits(p) + units);
    for (let i = 0; i < units; i++) q.push({ owner: p.UserId, kind: 'danbinh', team, like: true });
    if (this.round.state === 'idle') this.start();
    return { team, units };
  }
  private likeSpawned = new Map<string, number>();
  likeUnits(p: PlayerIdentity){ return this.likeSpawned.get(p.UserId) ?? 0; }

  private canSpawn(team: TeamKey, kind: UnitKind){
    const boss = UNITS[kind].boss, total = this.alive;
    if (boss) return total < BALANCE.hardCap;
    return total < BALANCE.maxUnits && this.teamCount[team] < BALANCE.perTeamCap;
  }
  // Sân đầy: quân thường gộp vào quân cùng loại của chính người đó thành cụm (x2, x3...), không bỏ quà
  private merge(req: SpawnReq){
    const def = UNITS[req.kind];
    if (!def.stackable) return false;
    let best: Unit | null = null;
    for (const u of this.units.values()) if (u.owner === req.owner && u.kind === req.kind && u.team === req.team && u.state !== 'dead' && u.stack < BALANCE.maxStack && (!best || u.stack < best.stack)) best = u;
    if (!best) return false;
    best.stack++; best.maxHp += def.hp; best.hp += def.hp;
    this.counters.merged++;
    const p = this.players.get(req.owner);
    if (p) this.players.addUnits(p, 1, false);
    this.emit({ e: 'merge', id: best.id, stack: best.stack, maxHp: best.maxHp });
    return true;
  }
  private processPending(){
    for (const team of TEAM_KEYS){
      const q = this.pending[team];
      let n = 0, i = 0;
      // boss được ưu tiên: ra trận ngay cả khi đứng sau hàng dài viện binh
      for (let j = 0; j < q.length && n < BALANCE.spawnPerTickPerTeam; j++){
        if (!UNITS[q[j].kind].boss || !this.canSpawn(team, q[j].kind)) continue;
        this.spawn(q[j]); q.splice(j--, 1); n++;
      }
      while (i < q.length && i < 60 && n < BALANCE.spawnPerTickPerTeam){
        const r = q[i];
        if (this.canSpawn(team, r.kind)){ this.spawn(r); q.splice(i, 1); n++; continue; }
        if (BALANCE.mergeWhenFull && this.merge(r)){ q.splice(i, 1); n++; continue; }
        // người chưa có quân nào trên sân vẫn được ra một nhân vật mang tên mình (vượt mức mềm, tới mức cứng)
        if (this.alive < BALANCE.hardCap && !this.hasOnField(r.owner, team)){ this.spawn(r); q.splice(i, 1); n++; continue; }
        i++;
      }
    }
  }
  private pickLane(team: TeamKey, kind: UnitKind): LaneId {
    const e = enemyOf(team), def = UNITS[kind];
    if (def.boss && this.lanePower[e][0] >= Math.max(this.lanePower[e][1], this.lanePower[e][2])) return 0;   // boss ưu tiên đường chính
    let best: LaneId = 0, bs = -Infinity;
    for (const l of [0, 1, 2] as LaneId[]){
      const need = this.lanePower[e][l] - this.lanePower[team][l] - (l === 0 ? 0 : 2) + this.rnd() * 3;
      if (need > bs){ bs = need; best = l; }
    }
    return best;
  }
  // Đặt ngay một quân ở vị trí chỉ định, bỏ qua hàng đợi (công cụ kiểm thử, dựng tình huống)
  spawnAt(owner: PlayerIdentity, kind: UnitKind, team: TeamKey, x: number, z: number){
    owner.Team ??= team;
    const u = this.spawn({ owner: owner.UserId, kind, team });
    u.x = x; u.z = z; u.state = 'move'; u.stateT = 1; u.s = LaneManager.project(u.lane, team, x, z);
    return u;
  }
  private spawn(r: SpawnReq){
    const p = this.players.get(r.owner);
    const lane = this.pickLane(r.team, r.kind), sp = BASES[r.team].spawn;
    const u = UnitFactory.init(this.pool.take(), this.nextId++, r.kind, r.team, r.owner, p?.DisplayName ?? 'Ẩn danh', p ? this.players.avatarView(p) : '', lane,
      sp.x + (this.rnd() - 0.5) * 1.2, sp.z + (this.rnd() - 0.5) * 2.4, this.tickN, () => this.rnd());
    this.units.set(u.id, u);
    this.teamCount[r.team]++; this.lanePower[r.team][lane] += u.def.giftValue;
    this.counters.spawned++;
    if (p) this.players.addUnits(p, 1, u.def.boss);
    this.emit({ e: 'spawn', u: UnitFactory.info(u), x: r2(u.x), z: r2(u.z) });
    if (u.def.boss) this.emit({ e: 'boss', id: u.id, kind: u.kind, team: u.team, owner: u.owner, name: u.ownerName, avatar: u.avatar });
    return u;
  }

  /* --------------------------------------------------------------- sát thương */
  rawDamage(u: Unit){
    const ph = this.round.phase, crit = this.rnd() < u.def.crit;
    return { dmg: u.def.damage * u.stack * ph.dmg * (u.def.boss ? ph.bossDmg : 1) * (crit ? u.def.critMult : 1), crit };
  }
  damageUnit(src: HitSource | null, t: Unit, raw: number, o: HitOpts = {}){
    if (!t.alive || t.state === 'dead') return 0;
    if (src && src.team === t.team){ this.counters.friendlyBlocked++; return 0; }      // không bao giờ đánh đồng đội
    let dmg = raw * (1 - t.def.armor), block = false;
    // khiên: chặn đòn từ phía trước (trong 70 độ), không chặn được đòn diện rộng
    if (t.def.block && src && !o.aoe){
      const s = this.units.get(src.id), ang = s ? Math.abs(angleDiff(t.yaw, Math.atan2(s.x - t.x, s.z - t.z))) : Math.PI;
      if (ang < 1.22 && this.rnd() < t.def.block.chance){ dmg *= 1 - t.def.block.reduce; block = true; t.blockFlash = 0.4; }
    }
    dmg = Math.max(1, Math.round(dmg));
    const real = Math.min(dmg, t.hp);
    t.hp -= dmg;
    if (src){
      this.players.addDamage(src.owner, real, false);
      this.teamDamage[src.team] += real;
      const su = this.units.get(src.id); if (su && su.alive) su.dmgDealt += real;
    }
    this.emit({ e: 'hit', id: t.id, dmg, crit: !!o.crit, block, x: r2(t.x), z: r2(t.z), big: dmg >= 200 || !!o.crit });
    if (o.knock){ const imp = o.knock * 3 / Math.sqrt(t.def.mass); t.kx += (o.dirX ?? 0) * imp; t.kz += (o.dirZ ?? 0) * imp; }
    if (o.lift && t.def.mass < 10) t.vy = Math.max(t.vy, o.lift * 3.2 / Math.sqrt(t.def.mass));
    if (o.stun) t.stunT = Math.max(t.stunT, t.def.boss ? o.stun * 0.3 : o.stun);
    if (t.hp <= 0) this.kill(t, src);
    return real;
  }
  private kill(t: Unit, src: HitSource | null){
    t.hp = 0; t.state = 'dead'; t.stateT = 0; t.deadT = 0; t.target = null; t.skill = ''; t.atkT = -1; t.killer = src?.id ?? 0;
    this.teamCount[t.team]--; this.counters.kills++;
    this.players.addDeath(t.owner);
    if (src){
      this.players.addKill(src.owner); this.teamKills[src.team]++;
      const su = this.units.get(src.id); if (su && su.alive) su.kills++;
    }
    this.emit({ e: 'die', id: t.id, by: src?.id ?? 0, x: r2(t.x), z: r2(t.z) });
    // bảng tin: chỉ báo các mạng đáng kể (quân từ cấp 2, hoặc boss ra tay) để không tràn màn hình
    if (src && (t.def.tier >= 2 || UNITS[src.kind].boss)) this.emit({ e: 'kill', killer: src.owner, killerName: src.ownerName, team: src.team, victim: t.owner, victimName: t.ownerName, kind: src.kind, vkind: t.kind });
  }
  damageBase(src: HitSource, team: TeamKey, part: 'gate' | 'house', raw: number, crit: boolean){
    if (src.team === team){ this.counters.friendlyBlocked++; return 0; }
    if (this.teamCount[team] > 0) return 0;                      // còn lính giữ nhà thì căn cứ chưa bị đánh
    const b = this.bases[team], wasGate = b.gateHp > 0;
    const real = b.hit(part, raw, this.tickN);
    if (!real) return 0;
    this.players.addDamage(src.owner, real, true);
    this.teamDamage[src.team] += real;
    const p = BASES[team][part];
    if (real >= 150 || crit || this.rnd() < 0.25) this.emit({ e: 'hit', id: part === 'gate' ? -1 : -2, tt: team, dmg: real, crit, block: false, x: p.x, z: p.z, big: real >= 300 });
    if (this.tickN - this.threatTick[team] > 80){ this.threatTick[team] = this.tickN; this.emit({ e: 'threat', team }); }
    if (wasGate && b.gateHp <= 0) this.emit({ e: 'base', team, part: 'gate', hp: 0, max: b.gateMax, destroyed: true });
    if (b.destroyed) this.emit({ e: 'base', team, part: 'house', hp: 0, max: b.houseMax, destroyed: true });
    return real;
  }
  // đòn diện rộng: búa đập, giẫm đất, gầm, tông xe; cũng đánh vào cổng / nhà nếu trong vùng
  area(src: Unit, x: number, z: number, r: number, dmg: number, crit: boolean, s: SkillDef, quiet = false){
    let n = 0;
    this.grid.query(x, z, r + 2, o => {
      if (o.team === src.team || o.state === 'dead') return;
      const dx = o.x - x, dz = o.z - z, d = Math.hypot(dx, dz);
      if (d > r + o.def.radius) return;
      const k = d > 0.01 ? 1 / d : 0;
      this.damageUnit(src, o, dmg * (quiet ? 1 : 1 - 0.35 * Math.min(1, d / r)), { crit, knock: s.knock, lift: s.lift, stun: s.stun, dirX: dx * k, dirZ: dz * k, aoe: true });
      n++;
    });
    const e = enemyOf(src.team);
    for (const part of ['gate', 'house'] as const){
      const p = BASES[e][part];
      if (this.bases[e].canHit(part) && Math.hypot(p.x - x, p.z - z) < r + this.bases[e].radius(part)) this.damageBase(src, e, part, dmg * src.def.siege, crit);
    }
    return n;
  }
  shoot(u: Unit, t: Target, raw: { dmg: number; crit: boolean }, ms: number){
    this.projectiles.push({ src: { id: u.id, team: u.team, owner: u.owner, ownerName: u.ownerName, kind: u.kind }, target: t, at: this.time + ms / 1000, dmg: raw.dmg, crit: raw.crit, siege: u.def.siege });
  }
  private flyProjectiles(){
    for (let i = this.projectiles.length - 1; i >= 0; i--){
      const p = this.projectiles[i];
      if (p.at > this.time) continue;
      this.projectiles.splice(i, 1);
      const t = p.target;
      if (t.kind === 'unit'){ if (t.unit.alive && t.unit.state !== 'dead') this.damageUnit(p.src, t.unit, p.dmg, { crit: p.crit }); }
      else this.damageBase(p.src, t.team, t.part, p.dmg * p.siege, p.crit);
    }
  }

  /* ----------------------------------------------------------------- nhịp */
  tick(){
    const dt = this.dt;
    const sig = this.round.tick(dt);
    for (const s of sig){
      if (s === 'started') this.emit({ e: 'round', state: 'running', round: this.round.round });
      if (s === 'phase') this.emit({ e: 'phase', key: this.round.phase.key, name: this.round.phase.name, text: this.round.phase.text });
      if (s === 'timeout') this.finish();
      if (s === 'next') this.start();
    }
    if (this.round.state === 'paused') return;
    this.tickN++; this.time += dt;
    const live = this.round.state === 'running' || this.round.state === 'countdown';
    if (live) this.processPending();
    this.survey();
    this.grid.clear();
    for (const u of this.units.values()) if (u.state !== 'dead') this.grid.insert(u);
    this.laneSwitches.trai = this.laneSwitches.gai = 0;
    const doStuck = this.tickN % 10 === 0;
    for (const u of this.units.values()){
      if (live && u.state !== 'dead' && u.state !== 'spawn' && --u.thinkIn <= 0) think(u, this);
      act(u, this, dt);
      if (doStuck && live) unstickSafe(u, this);
    }
    if (live) this.flyProjectiles();
    this.physics(dt);
    // xác quân đã nằm xuống đủ lâu thì trả về pool
    for (const [id, u] of this.units) if (u.state === 'dead' && u.deadT > 1.4){ this.units.delete(id); this.pool.give(u); }
    if (this.round.running && (this.bases.trai.destroyed || this.bases.gai.destroyed)) this.finish();
  }

  // Thống kê nhanh mỗi nhịp: sức mạnh từng làn, quân dẫn đầu mỗi làn, quân địch đang đánh căn cứ
  private survey(){
    for (const t of TEAM_KEYS){
      this.lanePower[t][0] = this.lanePower[t][1] = this.lanePower[t][2] = 0; this.teamCount[t] = 0; this.threat[t] = [];
      for (const f of this.front[t]){ f.melee = 0; f.tank = 0; }
      this.enemyFront[t][0] = this.enemyFront[t][1] = this.enemyFront[t][2] = null;
    }
    for (const u of this.units.values()){
      if (u.state === 'dead') continue;
      this.teamCount[u.team]++;
      this.lanePower[u.team][u.lane] += u.def.giftValue * u.stack * (u.hp / u.maxHp);
      const f = this.front[u.team][u.lane];
      if (!u.def.projectile && u.s > f.melee) f.melee = u.s;
      if (u.def.role === 'tank' && u.s > f.tank) f.tank = u.s;
      // tiền tuyến của phe u (nhìn từ phe địch): phe trai x lớn nhất, phe gái x nhỏ nhất
      const e = enemyOf(u.team), cur = this.enemyFront[e][u.lane];
      if (cur === null || (u.team === 'trai' ? u.x > cur : u.x < cur)) this.enemyFront[e][u.lane] = u.x;
      // quân đang ở sát căn cứ địch
      const eb = BASES[e];
      if (Math.hypot(u.x - eb.gate.x, u.z - eb.gate.z) < BALANCE.defendRadius || Math.hypot(u.x - eb.house.x, u.z - eb.house.z) < BALANCE.defendRadius) this.threat[e].push(u);
    }
  }
  // số quân đang sống của một phe (tính ở đầu mỗi nhịp)
  aliveOf(team: TeamKey){ return this.teamCount[team]; }
  enemyFrontX(team: TeamKey, lane: LaneId){ return this.enemyFront[team][lane]; }

  // Đẩy lùi, hất tung, tách quân chồng nhau (nặng đẩy nhẹ), chặn vật cản và mép sân
  private physics(dt: number){
    const fr = Math.exp(-6 * dt);
    for (const u of this.units.values()){
      if (u.state === 'dead'){ u.kx *= fr; u.kz *= fr; continue; }
      u.x += u.kx * dt; u.z += u.kz * dt; u.kx *= fr; u.kz *= fr;
      if (u.y > 0 || u.vy > 0){ u.vy -= BALANCE.gravity * dt; u.y += u.vy * dt; if (u.y <= 0){ u.y = 0; u.vy = 0; } }
    }
    const k = BALANCE.pushStrength;
    for (const a of this.units.values()){
      if (a.state === 'dead') continue;
      this.grid.query(a.x, a.z, a.def.radius + 1.9, b => {
        if (b.id <= a.id || b.state === 'dead') return;
        const dx = b.x - a.x, dz = b.z - a.z, min = a.def.radius + b.def.radius, d2 = dx * dx + dz * dz;
        if (d2 >= min * min) return;
        let d = Math.sqrt(d2), nx = dx / d, nz = dz / d;
        if (d < 1e-4){ const ang = this.rnd() * 6.283; nx = Math.cos(ang); nz = Math.sin(ang); d = 0; }
        const over = (min - d) * k;
        // trâu đang húc coi như nặng vô hạn: gạt quân sang hai bên
        const ma = a.skill === 'charge' ? 1e6 : a.def.mass, mb = b.skill === 'charge' ? 1e6 : b.def.mass, wa = mb / (ma + mb), wb = ma / (ma + mb);
        a.x -= nx * over * wa; a.z -= nz * over * wa; b.x += nx * over * wb; b.z += nz * over * wb;
      });
    }
    for (const u of this.units.values()){
      if (u.state === 'dead') continue;
      for (const c of OBSTACLES){
        if (c.enemyOf && (u.team === c.enemyOf || this.bases[c.enemyOf].gateDown)) continue;   // cổng chỉ chặn quân địch, vỡ rồi thì thôi chặn
        const dx = u.x - c.x, dz = u.z - c.z, min = c.r + u.def.radius * 0.8, d2 = dx * dx + dz * dz;
        if (d2 >= min * min) continue;
        const d = Math.sqrt(d2) || 1e-3;
        u.x = c.x + dx / d * min; u.z = c.z + dz / d * min;
      }
      u.x = Math.max(FIELD.minX, Math.min(FIELD.maxX, u.x)); u.z = Math.max(FIELD.minZ, Math.min(FIELD.maxZ, u.z));
    }
  }

  /* ---------------------------------------------------------------- kết thúc */
  private finish(){
    const T = this.bases.trai, G = this.bases.gai;
    let winner: TeamKey | 'draw', reason: RoundResult['reason'];
    if (T.destroyed !== G.destroyed){ winner = T.destroyed ? 'gai' : 'trai'; reason = 'destroyed'; }
    else if (T.total !== G.total){ winner = T.total > G.total ? 'trai' : 'gai'; reason = 'timeout-hp'; }
    else if (G.damageTaken !== T.damageTaken){ winner = G.damageTaken > T.damageTaken ? 'trai' : 'gai'; reason = 'timeout-damage'; }
    else {
      // căn cứ chưa ai đụng tới (còn lính thì không đánh nhà): so sức quân còn trên sân, rồi số mạng hạ được
      const army = (t: TeamKey) => { let s = 0; for (const u of this.units.values()) if (u.team === t && u.state !== 'dead') s += u.def.giftValue * u.stack * u.hp / u.maxHp; return Math.round(s * 10); };
      const aT = army('trai'), aG = army('gai');
      if (aT !== aG){ winner = aT > aG ? 'trai' : 'gai'; reason = 'timeout-army'; }
      else if (this.teamKills.trai !== this.teamKills.gai){ winner = this.teamKills.trai > this.teamKills.gai ? 'trai' : 'gai'; reason = 'timeout-kills'; }
      else { winner = 'draw'; reason = 'draw'; }
    }
    const team = (t: TeamKey) => {
      const rows = this.players.top(t, 9999);
      return { gift: rows.reduce((s, r) => s + r.gift, 0), damage: Math.round(this.teamDamage[t]), units: rows.reduce((s, r) => s + r.units, 0), bosses: rows.reduce((s, r) => s + r.bosses, 0),
        kills: this.teamKills[t], baseHp: this.bases[t].total, baseDamage: Math.round(this.bases[enemyOf(t)].damageTaken) };
    };
    const top = this.players.top(null, 10, 'score');
    // Chia quỹ lực chiến: đội thắng chia theo điểm đóng góp (sát thương, hạ địch, góp quân); hòa thì ai góp bao nhiêu nhận lại bấy nhiêu
    const active = this.players.active(), payouts: RoundResult['payouts'] = [];
    if (winner === 'draw') for (const p of active){ if (p.round.power > 0) payouts.push({ id: p.UserId, name: p.DisplayName, avatar: this.players.avatarView(p), team: p.Team!, gain: p.round.power }); }
    else {
      const win = active.filter(p => p.Team === winner), w = win.map(p => Math.max(1, scoreOf(p.round))), W = w.reduce((s, x) => s + x, 0);
      win.forEach((p, i) => { const gain = Math.round(this.pot * w[i] / W); if (gain > 0) payouts.push({ id: p.UserId, name: p.DisplayName, avatar: this.players.avatarView(p), team: p.Team!, gain }); });
    }
    payouts.sort((a, b) => b.gain - a.gain);
    this.result = { round: this.round.round, winner, reason, mvp: top[0] ?? null, teams: { trai: team('trai'), gai: team('gai') }, top, pot: this.pot, payouts };
    this.round.end();
    for (const u of this.units.values()) if (u.state !== 'dead'){ u.state = 'cheer'; u.stateT = 0; u.target = null; u.skill = ''; u.atkT = -1; u.boostT = 0; }
    this.projectiles.length = 0;
    this.emit({ e: 'round', state: 'ended', round: this.round.round, winner });
  }

  /* ------------------------------------------------------------- gửi màn hình */
  frame(): number[] {
    const out: number[] = [];
    for (const u of this.units.values()){
      let f = 0;
      if (u.stunT > 0) f |= FLAG.stun;
      if (u.boostT > 0) f |= FLAG.boost;
      if (u.skill === 'charge' && u.skillHit) f |= FLAG.charge;
      if (u.blockFlash > 0) f |= FLAG.block;
      if (u.y > 0) f |= FLAG.air;
      if (u.defend) f |= FLAG.defend;
      if (u.volleyT > 0) f |= FLAG.volley;
      out.push(u.id, Math.round(u.x * 100), Math.round(u.z * 100), Math.round(u.y * 100), Math.round(u.yaw * 100), Math.max(0, Math.round(u.hp)), STATE_CODES.indexOf(u.state), f);
    }
    return out;
  }
  unitInfos(): UnitInfo[] { return [...this.units.values()].map(u => UnitFactory.info(u)); }

  hud(extra: Pick<Hud, 'live' | 'queue' | 'settings' | 'board' | 'gifts'>): Hud {
    const team = (t: TeamKey): TeamHud => {
      const b = this.bases[t], lanes: [number, number, number] = [0, 0, 0];
      let units = 0, bosses = 0;
      for (const u of this.units.values()) if (u.team === t && u.state !== 'dead'){ units++; lanes[u.lane]++; if (u.def.boss) bosses++; }
      const rows = this.players.top(t, 9999);
      return { gift: rows.reduce((s, r) => s + r.gift, 0), units, pending: this.pending[t].length, kills: this.teamKills[t], damage: Math.round(this.teamDamage[t]), bosses,
        power: Math.round(this.lanePower[t][0] + this.lanePower[t][1] + this.lanePower[t][2]), gateHp: Math.max(0, b.gateHp), gateMax: b.gateMax, houseHp: Math.max(0, b.houseHp), houseMax: b.houseMax,
        threat: this.tickN - b.lastHitTick < 30, top: rows.slice(0, 5), lanes };
    };
    const tr = team('trai'), ga = team('gai');
    const bT = this.bases.trai.total / this.bases.trai.totalMax, bG = this.bases.gai.total / this.bases.gai.totalMax;
    const pw = tr.power + ga.power;
    const progress = Math.max(0.02, Math.min(0.98, 0.5 + 0.38 * (bT - bG) + 0.12 * (pw ? (tr.power - ga.power) / pw : 0)));
    const R = this.round;
    return {
      round: { state: R.state, round: R.round, elapsed: Math.floor(R.elapsed), duration: R.duration, left: Math.ceil(R.left), gatherLeft: Math.ceil(R.gatherLeft), gatherSec: R.gatherSec, countdown: Math.ceil(R.countdown), phase: R.phase.key, phaseName: R.phase.name, phaseText: R.phase.text, progress, autoNext: R.autoNext, resultLeft: Math.ceil(R.resultLeft), pot: this.pot },
      teams: { trai: tr, gai: ga }, result: this.result, units: this.alive, tickMs: this.cfg.tickMs, ...extra,
    };
  }
}

// kiểm tra mỗi giây: đứng yên quá stuckSec giây khi đang đi thì gỡ kẹt
function unstickSafe(u: Unit, bm: BattleManager){
  if (u.state === 'dead' || u.state === 'gather' || u.state === 'spawn' || u.state === 'cheer') return;
  UnitMovementController.unstick(u, bm);
}
const r2 = (v: number) => Math.round(v * 100) / 100;
function angleDiff(a: number, b: number){ let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; }
