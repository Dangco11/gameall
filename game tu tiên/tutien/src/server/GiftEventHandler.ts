import { artifactByKey, artifactLevel, skillByKey, tierFor, TUVI_PER_XU } from '../shared/game.ts';
import type { GiftTier } from '../shared/game.ts';
import type { World } from './World.ts';
import type { Player } from './PlayerStore.ts';

// Quà tặng → gameplay. Tính theo giá MỘT món (combo x5 = 5 lần, tối đa 10 lần hiệu ứng, dư thì dồn vào lần cuối).
//  - Luôn: cộng tu vi (60 / xu) và nâng cấp pháp bảo của mức quà đó.
//  - Đang đánh Boss: tự vào trận và tung đòn quà vào Boss.
//  - Đang PK / tông môn chiến: tu sĩ đang đấu tung chiêu bùng nổ; chưa đấu thì được xếp lên đầu hàng thách đấu.
//  - Lúc khác: hiệu ứng tu luyện bùng lên quanh nhân vật.
export function handleGift(w: World, p: Player, diamonds: number, count: number, giftName: string, now: number) {
  const tier: GiftTier = tierFor(diamonds);
  const xu = diamonds * count;
  p.xu += xu;
  w.fx({ k: 'gift', id: p.id, name: p.name, av: p.avatar, gift: giftName, count, xu, tier: tier.key, tierName: tier.name, icon: tier.icon, global: !!tier.global });
  w.store.dirty = true;

  // pháp bảo
  if (tier.artifact) {
    const before = artifactLevel(p.arts[tier.artifact] || 0);
    p.arts[tier.artifact] = (p.arts[tier.artifact] || 0) + count;
    const after = artifactLevel(p.arts[tier.artifact] || 0);
    if (after > before) {
      w.fx({ k: 'artifact', id: p.id, name: p.name, art: tier.artifact, lv: after });
      if (after === 1 || tier.xu >= 99) w.say(`${w.spoken(p.name)} luyện thành ${artifactByKey.get(tier.artifact)!.name}${after > 1 ? ' cấp ' + after : ''}!`, true);
    }
  }
  // tu vi (đột phá xử lý trong World.addTuvi)
  w.addTuvi(p, xu * TUVI_PER_XU * (tier.key === 'linhdan' ? 1.5 : 1));
  w.touch(p);

  const reps = Math.min(10, count), mul = count / reps;
  const skill = skillByKey.get(tier.skill)!;
  const mode = w.mode;
  if (mode === 'boss' && w.boss.alive) {
    const f = w.ensureBossFighter(p, now);
    for (let i = 0; i < reps; i++) {
      w.fx({ k: 'cast', id: p.id, vfx: tier.vfx, skill: tier.name, el: skill.el, to: 'boss', x: f?.x ?? 0, z: f?.z ?? 12, tx: w.boss.f!.x, tz: w.boss.f!.z, r: Math.max(3, skill.aoe), big: tier.xu >= 50 });
      w.boss.giftHit(f, diamonds * mul, tier, now);
      if (!w.boss.alive) break;
    }
    if (f && tier.key === 'linhdan') { f.hp = f.mhp; w.fx({ k: 'heal', id: f.id, v: f.mhp }); }
    if (tier.xu >= 99) w.say(`${w.spoken(p.name)} tung ${tier.name} vào ${w.boss.def?.name ?? 'Boss'}!`, true);
    return;
  }
  if (mode === 'treasure') w.treasureTicket(p, xu);
  if (mode === 'pk1' || mode === 'pk3' || mode === 'sect') {
    const f = w.joinFight(p, now);
    if (f && !f.down) {
      const foes = [...w.combat.fighters.values()].filter(o => !o.down && o.team !== f.team);
      const t = foes.sort((a, b) => Math.hypot(a.x - f.x, a.z - f.z) - Math.hypot(b.x - f.x, b.z - f.z))[0];
      if (tier.key === 'linhdan') { const v = f.mhp - f.hp; f.hp = f.mhp; w.fx({ k: 'heal', id: f.id, v }); }
      else if (t) for (let i = 0; i < Math.min(reps, 3); i++) w.combat.cast(f, skill, t, now, { mul: (1 + Math.log2(1 + diamonds) * 0.55) * mul, vfx: tier.vfx, big: true, name: tier.name });
      if (tier.xu >= 50) w.say(`${w.spoken(p.name)} bùng nổ ${tier.name}!`, true);
      return;
    }
    w.queuePk(p.id, true);
  }
  // hiệu ứng tu luyện tại chỗ
  const pos = w.posOf(p.id);
  w.fx({ k: 'cast', id: p.id, vfx: tier.vfx, skill: tier.name, el: skill.el, x: pos.x, z: pos.z, tx: pos.x, tz: pos.z, r: Math.max(3, skill.aoe), big: tier.xu >= 50 });
  if (tier.xu >= 199) w.say(`Cảm tạ ${w.spoken(p.name)} tặng ${tier.name}, thiên địa chấn động!`, true);
}
