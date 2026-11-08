import { COSTUMES, OUTFIT } from '../../shared/balance.ts';
import type { CostumeKey } from '../../shared/balance.ts';
import type { Player } from '../../shared/types.ts';
import { fail, fmt, ok, spend } from './common.ts';
import type { Result } from './common.ts';

const ALL = Object.keys(COSTUMES) as CostumeKey[];

// Tủ áo: mua bằng đồng hoặc được quà tặng, mặc ngay bộ vừa có. Chỉ để đẹp, không cộng chỉ số.
export class OutfitSystem {
  buy(p: Player, key: CostumeKey): Result {
    const c = COSTUMES[key];
    if (p.costumes.includes(key)){ p.outfit.costume = key; return ok('shop', `${p.name} mặc ${c.name.toLowerCase()}`, 0, c.name); }
    if (!spend(p, c.cost)) return fail('shop', `${p.name}: cần ${fmt(c.cost)} để may ${c.name.toLowerCase()}`);
    p.costumes.push(key); p.outfit.costume = key;
    return ok('shop', `${p.name} may ${c.name.toLowerCase()} (−${fmt(c.cost)})`, 3, c.name);
  }

  // Quà: rare = true chỉ chọn trong áo quý. Có đủ rồi thì trả về null.
  give(p: Player, rare: boolean, rng: () => number): CostumeKey | null {
    let left = ALL.filter(k => !p.costumes.includes(k) && COSTUMES[k].rare === rare);
    if (!left.length) left = ALL.filter(k => !p.costumes.includes(k));
    if (!left.length) return null;
    const k = left[Math.floor(rng() * left.length)];
    p.costumes.push(k); p.outfit.costume = k;
    return k;
  }

  // ĐỔI ÁO: lần lượt qua đồ thường (đổi màu) và các bộ đã có
  cycle(p: Player): Result {
    const list: (CostumeKey | '')[] = ['', ...p.costumes];
    const i = list.indexOf(p.outfit.costume);
    const next = list[(i + 1) % list.length];
    if (next === '') p.outfit.shirt = (p.outfit.shirt + 1) % OUTFIT.shirts.length;
    p.outfit.costume = next;
    const name = next ? COSTUMES[next].name : 'áo thường';
    return ok('home', `${p.name} thay ${name.toLowerCase()}`, 0, 'Áo mới!');
  }
}
