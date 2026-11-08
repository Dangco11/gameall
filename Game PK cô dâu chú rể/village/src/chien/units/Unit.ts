import { UNITS } from '../config/UnitConfig.ts';
import type { SkillKey, UnitDef, UnitKind } from '../config/UnitConfig.ts';
import type { LaneId, TeamKey, UnitInfo, UnitState } from '../types.ts';

// Mục tiêu: một quân địch, hoặc cổng / nhà chính của phe địch
export type Target = { kind: 'unit'; unit: Unit } | { kind: 'base'; team: TeamKey; part: 'gate' | 'house' };

export interface Unit {
  id: number; kind: UnitKind; def: UnitDef; team: TeamKey; owner: string; ownerName: string; avatar: string;
  alive: boolean;
  lane: LaneId; s: number; lateral: number; rank: number; slot: number;   // tiến độ theo làn, lệch ngang trong đội hình
  x: number; z: number; y: number; vy: number; yaw: number; kx: number; kz: number;
  hp: number; maxHp: number; stack: number;
  state: UnitState; stateT: number;
  target: Target | null; defend: boolean; hunt: boolean;   // hunt: đang đi tìm địch ở xa
  atkCd: number; atkT: number; atkHit: boolean; atkVariant: number;
  skillCd: Partial<Record<SkillKey, number>>;
  skill: SkillKey | ''; skillT: number; skillHit: boolean; skillX: number; skillZ: number;
  boostT: number; volleyT: number; chargeT: number; chargeDx: number; chargeDz: number; chargeHit: Set<number>;
  stunT: number; laneCd: number; thinkIn: number;
  stuckT: number; stuckX: number; stuckZ: number; blockFlash: number;
  deadT: number; killer: number; bornTick: number;
  dmgDealt: number; kills: number;
}

// Pool đối tượng: quân chết được trả về pool rồi dùng lại, không tạo mới liên tục khi quà dồn dập
export class UnitPool {
  private free: Unit[] = [];
  created = 0; reused = 0;
  take(): Unit {
    const u = this.free.pop();
    if (u){ this.reused++; return u; }
    this.created++;
    return blank();
  }
  give(u: Unit){ u.alive = false; u.target = null; u.chargeHit.clear(); this.free.push(u); }
  get size(){ return this.free.length; }
}

function blank(): Unit {
  return {
    id: 0, kind: 'danbinh', def: UNITS.danbinh, team: 'trai', owner: '', ownerName: '', avatar: '', alive: false,
    lane: 0, s: 0, lateral: 0, rank: 0, slot: 0, x: 0, z: 0, y: 0, vy: 0, yaw: 0, kx: 0, kz: 0,
    hp: 0, maxHp: 0, stack: 1, state: 'spawn', stateT: 0, target: null, defend: false, hunt: false,
    atkCd: 0, atkT: -1, atkHit: false, atkVariant: 0, skillCd: {}, skill: '', skillT: 0, skillHit: false, skillX: 0, skillZ: 0,
    boostT: 0, volleyT: 0, chargeT: 0, chargeDx: 0, chargeDz: 0, chargeHit: new Set(),
    stunT: 0, laneCd: 0, thinkIn: 0, stuckT: 0, stuckX: 0, stuckZ: 0, blockFlash: 0, deadT: 0, killer: 0, bornTick: 0, dmgDealt: 0, kills: 0,
  };
}

// Hàng trong đội hình theo vai: tank đứng đầu, xạ thủ đứng sau cùng
export const RANK: Record<UnitKind, number> = { dausi: 0, xechien: 0.5, voi: 0.8, trau: 0.6, danbinh: 1.4, xathu: 3 };

export const UnitFactory = {
  init(u: Unit, id: number, kind: UnitKind, team: TeamKey, owner: string, ownerName: string, avatar: string, lane: LaneId, x: number, z: number, tick: number, rnd: () => number){
    const def = UNITS[kind];
    Object.assign(u, {
      id, kind, def, team, owner, ownerName, avatar, alive: true, lane, s: 0, lateral: (rnd() - 0.5) * (def.boss ? 0.6 : 1.9), rank: RANK[kind], slot: 0,
      x, z, y: 0, vy: 0, yaw: team === 'trai' ? Math.PI / 2 : -Math.PI / 2, kx: 0, kz: 0,
      hp: def.hp, maxHp: def.hp, stack: 1, state: 'spawn', stateT: 0, target: null, defend: false, hunt: false,
      atkCd: rnd() * 0.5, atkT: -1, atkHit: false, atkVariant: 0, skillCd: Object.fromEntries(def.skills.map(s => [s.key, s.cd * (0.3 + rnd() * 0.4)])),
      skill: '', skillT: 0, skillHit: false, skillX: 0, skillZ: 0, boostT: 0, volleyT: 0, chargeT: 0, chargeDx: 0, chargeDz: 0,
      stunT: 0, laneCd: 0, thinkIn: Math.floor(rnd() * 3), stuckT: 0, stuckX: x, stuckZ: z, blockFlash: 0, deadT: 0, killer: 0, bornTick: tick, dmgDealt: 0, kills: 0,
    } satisfies Partial<Unit>);
    u.chargeHit.clear();
    return u;
  },
  info(u: Unit): UnitInfo { return { id: u.id, kind: u.kind, team: u.team, owner: u.owner, name: u.ownerName, avatar: u.avatar, maxHp: u.maxHp, stack: u.stack, lane: u.lane }; },
};
