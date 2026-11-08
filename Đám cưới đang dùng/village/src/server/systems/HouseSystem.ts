import { DECOR, HOUSES, MATERIAL_PRICE, TOOLS } from '../../shared/balance.ts';
import type { DecorKey, ToolKey } from '../../shared/balance.ts';
import type { Player } from '../../shared/types.ts';
import { fail, fmt, ok, spend } from './common.ts';
import type { Result } from './common.ts';

// 10 cấp nhà. Thiếu gỗ gạch thì tự mua ở cửa hàng vật liệu, gỗ gạch nhận từ hội làng hay quà được dùng trước.
export class HouseSystem {
  upgradeCost(p: Player){
    const next = HOUSES[p.houseLevel];
    if (!next) return null;
    const wood = Math.max(0, next.wood - p.inv.wood), brick = Math.max(0, next.brick - p.inv.brick);
    return { next, wood, brick, total: next.cost + wood * MATERIAL_PRICE.wood + brick * MATERIAL_PRICE.brick };
  }

  upgrade(p: Player): Result {
    const c = this.upgradeCost(p);
    if (!c) return fail('build', `${p.name}: nhà đã lên cấp cao nhất`);
    if (!spend(p, c.total)) return fail('build', `${p.name}: cần ${fmt(c.total)} để lên ${c.next.name} (đang có ${fmt(p.money)})`);
    p.inv.wood -= c.next.wood - c.wood; p.inv.brick -= c.next.brick - c.brick;
    p.houseLevel++;
    return ok('build', `${p.name} lên nhà mới: ${c.next.name} (cấp ${p.houseLevel})`, 40, c.next.name);
  }

  buyDecor(p: Player, key: DecorKey): Result {
    const d = DECOR[key];
    if (p.decor.includes(key)) return fail('shop', `${p.name}: nhà đã có ${d.name.toLowerCase()}`);
    if (!spend(p, d.cost)) return fail('shop', `${p.name}: thiếu ${fmt(d.cost)} mua ${d.name.toLowerCase()}`);
    p.decor.push(key);
    return ok('shop', `${p.name} mua ${d.name.toLowerCase()} trang trí nhà`, 3, d.name);
  }

  giveDecor(p: Player, rng: () => number): DecorKey | null {
    const left = (Object.keys(DECOR) as DecorKey[]).filter(k => !p.decor.includes(k));
    if (!left.length) return null;
    const k = left[Math.floor(rng() * left.length)];
    p.decor.push(k);
    return k;
  }

  buyTool(p: Player, key: ToolKey): Result {
    const t = TOOLS[key];
    if (p.tools.includes(key)) return fail('shop', `${p.name}: đã có ${t.name.toLowerCase()}`);
    if (!spend(p, t.cost)) return fail('shop', `${p.name}: thiếu ${fmt(t.cost)} mua ${t.name.toLowerCase()}`);
    p.tools.push(key);
    return ok('shop', `${p.name} sắm ${t.name.toLowerCase()}: ${t.note.toLowerCase()}`, 3, t.name);
  }

  beauty(p: Player){ return p.houseLevel * 3 + p.decor.reduce((s, k) => s + DECOR[k].score, 0); }

  describe(p: Player): Result {
    const c = this.upgradeCost(p), h = HOUSES[p.houseLevel - 1];
    const tail = c ? `, lên ${c.next.name} cần ${fmt(c.total)}` : '';
    return ok('home', `${p.name} về ${h.name} (cấp ${p.houseLevel}), có ${fmt(p.money)}, kho ${p.inv.rice} lúa ${p.inv.fish} cá ${p.inv.egg} trứng${tail}`, 0, h.name);
  }
}
