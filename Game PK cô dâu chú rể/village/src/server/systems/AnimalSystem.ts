import { ANIMAL } from '../../shared/balance.ts';
import type { Player } from '../../shared/types.ts';
import { fail, fmt, ok, spend } from './common.ts';
import type { Result } from './common.ts';

// Chuồng gà vịt: được cho ăn thì đẻ trứng, nuôi đủ lâu thì bán được giá.
export class AnimalSystem {
  count(p: Player){ return p.coop.chickens + p.coop.ducks; }

  tick(p: Player, dt: number){
    const c = p.coop, n = this.count(p);
    const wet = Math.min(dt, c.fed);
    c.fed -= wet;
    if (!n) return;
    c.eggProgress += wet * n / ANIMAL.eggSeconds;
    const laid = Math.floor(c.eggProgress);
    if (laid > 0){ c.eggProgress -= laid; c.eggs = Math.min(ANIMAL.eggStash, c.eggs + laid); }
  }

  feedFree(p: Player){ if (this.count(p)) p.coop.fed = Math.max(p.coop.fed, ANIMAL.fedLasts); }

  skip(p: Player, seconds: number, now: number){
    const n = this.count(p);
    if (!n) return false;
    p.coop.eggs = Math.min(ANIMAL.eggStash, p.coop.eggs + Math.floor(seconds * n / ANIMAL.eggSeconds));
    p.coop.matureAt = Math.max(0, Math.min(p.coop.matureAt, now) - seconds * 1000);
    return true;
  }

  buy(p: Player, kind: 'chicken' | 'duck', now: number): Result {
    const c = p.coop, cost = kind === 'chicken' ? ANIMAL.chickenCost : ANIMAL.duckCost, label = kind === 'chicken' ? 'gà' : 'vịt';
    if (this.count(p) >= ANIMAL.capacity) return fail('buyAnimal', `${p.name}: chuồng đầy rồi (${ANIMAL.capacity} con)`);
    if (!spend(p, cost)) return fail('buyAnimal', `${p.name}: thiếu ${fmt(cost)} mua ${label}`);
    if (kind === 'chicken') c.chickens++; else c.ducks++;
    c.matureAt = Math.max(c.matureAt, now + ANIMAL.matureSeconds * 1000);
    return ok('buyAnimal', `${p.name} mua một con ${label} (−${fmt(cost)})`, 2, `+1 ${label}`);
  }

  feed(p: Player, now: number): Result {
    if (!this.count(p)) return this.buy(p, 'chicken', now);   // chuồng trống thì CHO GÀ ĂN mua con gà đầu tiên
    if (p.coop.eggs >= 6) return this.collect(p);
    if (!spend(p, ANIMAL.feedCost)) return fail('feedAnimals', `${p.name}: thiếu ${fmt(ANIMAL.feedCost)} mua thóc`);
    p.coop.fed = ANIMAL.fedLasts;
    return ok('feedAnimals', `${p.name} rải thóc, cả đàn ${this.count(p)} con chạy lại ăn`, 2, 'Cho gà vịt ăn');
  }

  collect(p: Player): Result {
    const c = p.coop;
    if (!c.eggs) return fail('collectEggs', `${p.name}: chưa có trứng, nhớ CHO GÀ ĂN`);
    const n = c.eggs;
    p.inv.egg += n; c.eggs = 0;
    return ok('collectEggs', `${p.name} nhặt được ${n} quả trứng`, 4, `+${n} trứng`);
  }

  isMature(p: Player, now: number){ return now >= p.coop.matureAt; }

  // Trả số con đã bán; MarketSystem tính tiền.
  takeAll(p: Player){
    const c = p.coop, out = { chicken: c.chickens, duck: c.ducks };
    c.chickens = 0; c.ducks = 0; c.fed = 0; c.eggProgress = 0;
    return out;
  }
}
