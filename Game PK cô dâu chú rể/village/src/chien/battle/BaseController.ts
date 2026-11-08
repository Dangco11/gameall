import type { BattleConfig } from '../config/BattleConfig.ts';
import type { TeamKey } from '../types.ts';

// Căn cứ mỗi phe: cổng bảo vệ phía trước, nhà chính phía sau. Cổng còn đứng thì nhà chính không bị đánh.
export class BaseController {
  readonly team: TeamKey;
  gateHp = 0; gateMax = 0; houseHp = 0; houseMax = 0;
  damageTaken = 0;          // tổng sát thương phe này nhận vào căn cứ
  lastHitTick = -999;
  dirty = { gate: false, house: false };
  private cfg: BattleConfig['base'];

  constructor(team: TeamKey, cfg: BattleConfig['base']){ this.team = team; this.cfg = cfg; this.reset(); }

  reset(){
    this.gateHp = this.gateMax = this.cfg.gateHp;
    this.houseHp = this.houseMax = this.cfg.houseHp;
    this.damageTaken = 0; this.lastHitTick = -999; this.dirty.gate = this.dirty.house = true;
  }
  // Host đổi máu tối đa: áp dụng ngay, giữ nguyên tỉ lệ máu đang còn (cổng đã vỡ thì vẫn vỡ)
  setMax(gate: number, house: number){
    const gf = this.gateMax ? this.gateHp / this.gateMax : 1, hf = this.houseMax ? this.houseHp / this.houseMax : 1;
    this.gateMax = gate; this.houseMax = house;
    this.gateHp = this.gateHp <= 0 ? 0 : Math.max(1, Math.round(gate * gf));
    this.houseHp = this.houseHp <= 0 ? 0 : Math.max(1, Math.round(house * hf));
    this.cfg = { ...this.cfg, gateHp: gate, houseHp: house };
    this.dirty.gate = this.dirty.house = true;
  }
  get gateDown(){ return this.gateHp <= 0; }
  get destroyed(){ return this.houseHp <= 0; }
  get total(){ return Math.max(0, this.gateHp) + Math.max(0, this.houseHp); }
  get totalMax(){ return this.gateMax + this.houseMax; }
  armor(part: 'gate' | 'house'){ return part === 'gate' ? this.cfg.gateArmor : this.cfg.houseArmor; }
  radius(part: 'gate' | 'house'){ return part === 'gate' ? this.cfg.gateRadius : this.cfg.houseRadius; }
  canHit(part: 'gate' | 'house'){ return part === 'gate' ? this.gateHp > 0 : this.gateHp <= 0 && this.houseHp > 0; }

  // Trả về sát thương thực nhận (sau giáp), 0 nếu phần đó không đánh được
  hit(part: 'gate' | 'house', raw: number, tick: number){
    if (!this.canHit(part)) return 0;
    const dmg = Math.max(1, Math.round(raw * (1 - this.armor(part))));
    if (part === 'gate'){ const d = Math.min(dmg, this.gateHp); this.gateHp -= d; this.damageTaken += d; this.dirty.gate = true; this.lastHitTick = tick; return d; }
    const d = Math.min(dmg, this.houseHp); this.houseHp -= d; this.damageTaken += d; this.dirty.house = true; this.lastHitTick = tick;
    return d;
  }
}
