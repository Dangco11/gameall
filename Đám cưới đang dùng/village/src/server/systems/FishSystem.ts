import { FISH } from '../../shared/balance.ts';
import type { Player } from '../../shared/types.ts';
import { fail, fmt, ok, spend } from './common.ts';
import type { Result } from './common.ts';

// Ao nhà: thả cá giống, cho ăn thì cá lớn, lớn đủ thì kéo lưới. Câu cá ngoài sông là việc miễn phí có hồi chiêu.
export class FishSystem {
  tick(p: Player, dt: number, growth: number){
    const o = p.pond;
    const wet = Math.min(dt, o.fed);
    o.fed -= wet;
    if (o.fish > 0 && o.growth < 1) o.growth = Math.min(1, o.growth + wet * growth / FISH.growSeconds);
  }

  feedFree(p: Player){ if (p.pond.fish > 0) p.pond.fed = Math.max(p.pond.fed, FISH.fedLasts); }

  skip(p: Player, seconds: number){
    if (p.pond.fish <= 0 || p.pond.growth >= 1) return false;
    p.pond.growth = Math.min(1, p.pond.growth + seconds / FISH.growSeconds);
    return true;
  }

  buy(p: Player): Result {
    const o = p.pond, n = Math.min(FISH.fryPack, FISH.capacity - o.fish), cost = n * FISH.fryCost;
    if (n <= 0) return fail('buyFish', `${p.name}: ao đầy cá rồi`);
    if (o.growth >= 1) return fail('buyFish', `${p.name}: cá lớn rồi, gõ THU CÁ trước`);
    if (!spend(p, cost)) return fail('buyFish', `${p.name}: thiếu ${fmt(cost)} mua ${n} con cá giống`);
    o.growth = o.growth * o.fish / (o.fish + n);
    o.fish += n;
    return ok('buyFish', `${p.name} thả ${n} con cá giống (−${fmt(cost)})`, 2, `+${n} cá giống`);
  }

  feed(p: Player): Result {
    const o = p.pond;
    if (o.fish <= 0) return this.buy(p);         // CHO CÁ ĂN khi ao trống: mua giống luôn cho đỡ phải nhớ lệnh
    if (o.growth >= 1) return this.harvest(p);
    if (!spend(p, FISH.feedCost)) return fail('feedFish', `${p.name}: thiếu ${fmt(FISH.feedCost)} mua cám`);
    o.fed = FISH.fedLasts;
    return ok('feedFish', `${p.name} rải cám cho cá (cá lớn ${Math.round(o.growth * 100)}%)`, 2, 'Cho cá ăn');
  }

  harvest(p: Player): Result {
    const o = p.pond;
    if (o.fish <= 0) return fail('harvestFish', `${p.name}: ao chưa có cá, gõ MUA CÁ`);
    if (o.growth < 1) return fail('harvestFish', `${p.name}: cá mới lớn ${Math.round(o.growth * 100)}%`);
    const n = o.fish;
    p.inv.fish += n; o.fish = 0; o.growth = 0; o.fed = 0;
    return ok('harvestFish', `${p.name} kéo lưới được ${n} con cá`, 12, `+${n} cá`);
  }

  catch(p: Player, now: number, rng: () => number, bridgeLevel: number): Result {
    const wait = p.catchAt + FISH.catchCooldownMs - now;
    if (wait > 0) return fail('catch', `${p.name}: đang ngồi câu, ${Math.ceil(wait / 1000)} giây nữa giật cần`);
    p.catchAt = now;
    const chance = (p.tools.includes('rod') ? FISH.rodChance : FISH.catchChance) + bridgeLevel * FISH.bridgeChance;
    if (rng() >= chance) return ok('catch', `${p.name} ngồi câu bên sông, cá chưa cắn câu`, 2, 'Hụt rồi!');
    p.inv.fish++; p.stats.catches++;
    return ok('catch', `${p.name} câu được một con cá lóc!`, 6, '+1 cá');
  }
}
