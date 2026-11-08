import { RICE } from '../../shared/balance.ts';
import type { Player } from '../../shared/types.ts';
import { fail, fmt, ok, spend } from './common.ts';
import type { Result } from './common.ts';

// Vụ lúa: làm đất -> gieo mạ -> lớn dần (tưới, bón phân) -> chín -> gặt rồi làm đất lại.
export class RiceSystem {
  tick(p: Player, dt: number, growth: number){
    const r = p.rice;
    const wet = Math.min(dt, r.water);
    r.water -= wet;
    if (r.stage !== 'growing') return;
    r.watered += wet;
    r.progress += (wet + (dt - wet) * RICE.dryFactor) * growth * (r.fert ? RICE.fertFactor : 1) / RICE.growSeconds;
    if (r.progress >= 1){ r.progress = 1; r.stage = 'ripe'; }
  }

  rain(p: Player){ p.rice.water = Math.max(p.rice.water, RICE.waterLasts); }

  // Quà tăng tốc: tính như thời gian đã được tưới đủ nước.
  skip(p: Player, seconds: number){
    const r = p.rice;
    if (r.stage !== 'growing') return false;
    r.watered += seconds;
    r.progress = Math.min(1, r.progress + seconds / RICE.growSeconds);
    if (r.progress >= 1) r.stage = 'ripe';
    return true;
  }

  // TRỒNG LÚA: làm bước tiếp theo của vụ, người xem chỉ cần nhớ một lệnh.
  next(p: Player): Result {
    const r = p.rice;
    if (r.stage === 'fallow') return this.plow(p);
    if (r.stage === 'plowed') return this.sow(p);
    if (r.stage === 'ripe') return this.harvest(p);
    if (r.water <= 0) return this.water(p);
    if (!r.fert && p.money >= RICE.fertCost + 20) return this.fertilize(p);
    return ok('water', `${p.name}: lúa đang lớn ${Math.round(r.progress * 100)}%, ruộng còn nước`, 0, `Lúa ${Math.round(r.progress * 100)}%`);
  }

  plow(p: Player): Result {
    const r = p.rice;
    if (r.stage !== 'fallow') return fail('plow', `${p.name}: ruộng đã làm đất rồi, gõ GIEO MẠ`);
    r.stage = 'plowed'; r.progress = 0; r.fert = false; r.watered = 0;
    return ok('plow', `${p.name} cày bừa thửa ruộng`, 3, 'Cày ruộng');
  }

  sow(p: Player): Result {
    const r = p.rice;
    if (r.stage === 'fallow') return fail('sow', `${p.name}: phải LÀM ĐẤT trước khi gieo mạ`);
    if (r.stage !== 'plowed') return fail('sow', `${p.name}: ruộng đang có lúa`);
    if (!spend(p, RICE.seedCost)) return fail('sow', `${p.name}: thiếu ${fmt(RICE.seedCost)} mua thóc giống`);
    r.stage = 'growing'; r.progress = 0;
    return ok('sow', `${p.name} gieo mạ (−${fmt(RICE.seedCost)})`, 3, 'Gieo mạ');
  }

  water(p: Player): Result {
    const r = p.rice;
    if (r.stage === 'fallow' || r.stage === 'ripe') return fail('water', `${p.name}: ruộng chưa cần tưới`);
    r.water = p.tools.includes('can') ? RICE.canWaterLasts : RICE.waterLasts;
    return ok('water', `${p.name} tát nước vào ruộng`, 3, 'Tưới nước');
  }

  fertilize(p: Player): Result {
    const r = p.rice;
    if (r.stage !== 'growing') return fail('fert', `${p.name}: chỉ bón phân khi lúa đang lớn`);
    if (r.fert) return fail('fert', `${p.name}: vụ này đã bón phân`);
    if (!spend(p, RICE.fertCost)) return fail('fert', `${p.name}: thiếu ${fmt(RICE.fertCost)} mua phân`);
    r.fert = true;
    return ok('fert', `${p.name} bón phân cho lúa (−${fmt(RICE.fertCost)})`, 3, 'Bón phân');
  }

  yieldOf(p: Player){
    const r = p.rice;
    return RICE.baseYield + (r.fert ? RICE.fertYield : 0) + Math.round(RICE.wateredYield * Math.min(1, r.watered / (RICE.growSeconds * 0.6)))
      + (p.tools.includes('hoe') ? RICE.hoeYield : 0);
  }

  harvest(p: Player): Result {
    const r = p.rice;
    if (r.stage !== 'ripe') return fail('harvest', `${p.name}: lúa chưa chín (${Math.round(r.progress * 100)}%)`);
    const n = this.yieldOf(p);
    p.inv.rice += n; p.stats.harvests++;
    r.stage = 'fallow'; r.progress = 0; r.fert = false; r.watered = 0;
    return ok('harvest', `${p.name} gặt được ${n} bao lúa, gõ RA CHỢ để bán`, 15, `+${n} bao lúa`);
  }
}
