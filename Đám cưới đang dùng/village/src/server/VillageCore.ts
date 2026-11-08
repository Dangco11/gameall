import { COMMAND_COOLDOWN_MS, COSTUMES, DAYS_PER_SEASON, DAY_SECONDS, FESTIVAL, GIFT, HOUSES, LIKE_POINTS, OFFLINE_CATCHUP_MS, ONLINE_TIMEOUT_MS, PROJECTS, SEASONS, SEASON_GROWTH, SHARE, XP } from '../shared/balance.ts';
import type { ContestKey } from '../shared/balance.ts';
import type { BoardRow, Boards, Delta, Fx, LiveEvent, LiveStatus, Player, Settings, Snapshot, Stats, Weather, WorldState, PkTeam, Gender } from '../shared/types.ts';
import { parseCommand } from './CommandParser.ts';
import type { Command } from './CommandParser.ts';
import type { DataStorage, LoadedData } from './DataStorage.ts';
import { PlayerManager } from './PlayerManager.ts';
import { AnimalSystem } from './systems/AnimalSystem.ts';
import { earn, fail, fmt, ok, spend } from './systems/common.ts';
import type { Result } from './systems/common.ts';
import { ConstructionSystem } from './systems/ConstructionSystem.ts';
import { FestivalSystem } from './systems/FestivalSystem.ts';
import type { Placing } from './systems/FestivalSystem.ts';
import { FishSystem } from './systems/FishSystem.ts';
import { GiftSystem, tierFor } from './systems/GiftSystem.ts';
import { HouseSystem } from './systems/HouseSystem.ts';
import { MarketSystem } from './systems/MarketSystem.ts';
import { OutfitSystem } from './systems/OutfitSystem.ts';
import { WeddingSystem } from './systems/WeddingSystem.ts';
import { WeddingTop, monthOf } from './systems/WeddingTop.ts';
import { BattleSystem, parseTeam } from './systems/BattleSystem.ts';
import { RiceSystem } from './systems/RiceSystem.ts';

const WEATHER_ODDS: Record<number, [Weather, number][]> = {
  0: [['clear', 5], ['cloudy', 3], ['wind', 1], ['rain', 2]],
  1: [['clear', 6], ['cloudy', 2], ['wind', 1], ['rain', 3]],
  2: [['clear', 4], ['cloudy', 3], ['wind', 3], ['rain', 2]],
  3: [['clear', 4], ['cloudy', 4], ['wind', 3], ['rain', 1]],
};
const WIND: Record<Weather, number> = { clear: 0.2, cloudy: 0.4, wind: 0.95, rain: 0.6 };
const MAX_FX_PER_DELTA = 80;

export interface CoreOptions { now?: () => number; rng?: () => number }

// Lõi của làng: nhận sự kiện đã qua hàng đợi, chạy các hệ thống, gom thay đổi để gửi xuống màn hình.
export class VillageCore {
  readonly players: PlayerManager;
  readonly rice = new RiceSystem();
  readonly fish = new FishSystem();
  readonly animals = new AnimalSystem();
  readonly houses = new HouseSystem();
  readonly gifts = new GiftSystem();
  readonly outfits = new OutfitSystem();
  readonly wedding = new WeddingSystem(f => { this.push(f); this.weddingHook?.(f); });
  weddingHook: ((f: Extract<Fx, { k: 'wedding' }> | Extract<Fx, { k: 'pk' }>) => void) | null = null;
  // bình luận thường (không phải lệnh) của người xem, để giọng đọc đọc lên
  chatHook: ((id: string, name: string, text: string) => void) | null = null;
  // Đại chiến Nhà trai – Nhà gái: trong lúc đánh, đám cưới tạm nghỉ, quà và bình luận đi vào trận
  readonly battle = new BattleSystem(f => { this.push(f); this.battleHook?.(f); if (f.ev === 'end') this.wedding.reset(); });
  battleHook: ((f: Extract<Fx, { k: 'battle' }>) => void) | null = null;
  startBattle(){ this.wedding.reset(); this.battle.start(this.now()); }
  readonly market: MarketSystem;
  readonly build: ConstructionSystem;
  readonly festival: FestivalSystem;
  world: WorldState;
  live: LiveStatus = { status: 'idle', uniqueId: '', error: '', attempt: 0 };
  hideSimOnBoards = false;
  settings: Settings = { idleBots: true, voice: true, readChat: true, scene: 'village' };
  giftHook: ((name: string, gift: string, count: number, tier: string) => void) | null = null;
  stats: Stats = { queue: 0, dropped: 0, duplicates: 0, processed: 0, residents: 0, online: 0, realOnline: 0, tickMs: 0, bots: 0 };

  private storage: DataStorage | null;
  private now: () => number;
  private rng: () => number;
  private weatherUntil = 0;
  private lastTick: number;
  private lastCmd = new Map<string, number>();
  private fx: Fx[] = [];
  private fingerprints = new Map<string, string>();
  private wasOnline = new Map<string, boolean>();
  private boards: Boards = { level: [], wealth: [], builders: [], donors: [] };
  private boardsKey = '';
  private worldDirty = true; private boardsDirty = true; private liveDirty = true; private settingsDirty = false;
  private changedSinceSave = false;
  readonly weddingTop: WeddingTop;
  private room = new Map<string, { name: string; sim: boolean; at: number }>();   // ai vừa có mặt trong phòng live, mới nhất ở cuối

  constructor(storage: DataStorage | null, opts: CoreOptions = {}, loaded?: LoadedData){
    this.storage = storage; this.now = opts.now ?? Date.now; this.rng = opts.rng ?? Math.random;
    this.wedding.pickAuto = (need, skip) => this.pickCouple(need, skip);
    const data = loaded ?? storage?.load() ?? { players: [], village: null, buildings: [], market: [], giftIds: [] };
    const t = this.now();
    this.weddingTop = new WeddingTop(data.weddingTop?.month || monthOf(t), data.weddingTop?.month === monthOf(t) ? data.weddingTop.rows : []);
    this.players = new PlayerManager(data.players);
    this.market = new MarketSystem(data.market);
    this.build = new ConstructionSystem(data.buildings);
    this.build.reserve = data.village?.reserve ?? 0;
    if (data.village?.settings) this.setSettings(data.village.settings);
    this.world = data.village?.world ?? { day: 1, clock: 0.27, season: 0, weather: 'clear', wind: 0.2 };
    this.lastTick = data.village?.lastTick ?? t;
    this.festival = new FestivalSystem({
      announce: text => this.note(text),
      beauty: id => { const p = this.players.get(id); return p ? this.houses.beauty(p) : 0; },
      reward: (r, type) => this.rewardFestival(r, type),
    }, t, this.rng, data.village?.nextFestivalAt ?? 0, data.village?.festivalsHeld ?? 0);
    // Máy tắt bao lâu thì ruộng vườn vẫn lớn bấy lâu, tối đa 30 phút, để người chơi quay lại thấy làng đã đổi.
    const away = Math.min(OFFLINE_CATCHUP_MS, Math.max(0, t - this.lastTick)) / 1000;
    if (away > 1) this.simulate(away, false);
    this.lastTick = t;
  }

  /* ---------------------------------------------------------- input */
  // Link ảnh đại diện TikTok mới nhất của từng người, chỉ giữ trong bộ nhớ (link TikTok hết hạn sau vài ngày)
  readonly avatars = new Map<string, string>();

  handle(ev: LiveEvent){
    if (ev.avatar){ this.avatars.delete(ev.id); this.avatars.set(ev.id, ev.avatar); if (this.avatars.size > 3000) this.avatars.delete(this.avatars.keys().next().value as string); }
    const t = this.now();
    switch (ev.kind){
      case 'join': {
        const known = this.players.get(ev.id);
        if (known){ this.players.ensure(ev.id, ev.name, ev.sim, t); }
        this.push({ k: 'join', id: ev.id, name: known?.name ?? ev.name.slice(0, 24), known: !!known });
        break;
      }
      case 'comment': this.onComment(ev.id, ev.name, ev.sim, ev.text, t); break;
      case 'like': this.onLike(ev.id, ev.name, ev.sim, ev.count, t); break;
      case 'share': this.onShare(ev.id, ev.name, ev.sim, t); break;
      case 'follow': { const { p } = this.welcome(ev.id, ev.name, ev.sim, t); p.follower = true; this.changedSinceSave = true; if (this.settings.scene === 'wedding') this.wedding.seat(p.id, p.name); break; }
      case 'gift': this.onGift(ev.msgId, ev.id, ev.name, ev.sim, ev.gift, ev.diamonds, ev.count, t); break;
    }
    // người đang ở trong phòng live (để làng chọn ngẫu nhiên cô dâu chú rể khi chờ quá lâu)
    this.room.delete(ev.id); this.room.set(ev.id, { name: ev.name, sim: ev.sim, at: t });
    if (this.room.size > 3000) this.room.delete(this.room.keys().next().value as string);
    // sau khi đã có người chơi: TikTok cho biết người này đã follow kênh: ghi nhớ để lúc chờ cô dâu chú rể quá lâu làng chọn trong số này
    if (ev.follower){ const p = this.players.get(ev.id); if (p && !p.follower){ p.follower = true; this.changedSinceSave = true; } }
  }

  private welcome(id: string, name: string, sim: boolean, t: number){
    const { p, created } = this.players.ensure(id, name, sim, t);
    if (created){
      this.push({ k: 'act', id: p.id, act: 'enter', ok: true, text: `🏡 ${p.name} về làng! Gõ TRỒNG LÚA để bắt đầu vụ đầu tiên`, bubble: 'Chào cả làng!' });
      this.storage?.logEvent('new', p.id, p.name);
    }
    return { p, created };
  }

  private onComment(id: string, name: string, sim: boolean, text: string, t: number){
    const { p, created } = this.welcome(id, name, sim, t);
    const cmd = parseCommand(text);
    // Đại chiến: bình luận 1/2/3 chọn phe, bình luận khác là cổ vũ phe mình
    if (this.battle.active){
      const team = parseTeam(text);
      if (team) this.battle.join(p.id, p.name, team, t);
      else { this.battle.cheer(p.id, t); this.push({ k: 'act', id: p.id, act: 'chat', ok: true, text: '', bubble: text.slice(0, 60) }); this.chatHook?.(p.id, p.name, text); }
      return;
    }
    // cảnh đám cưới: ai bình luận cũng được mời vào mâm cỗ
    if (this.settings.scene === 'wedding') this.wedding.seat(p.id, p.name);
    // PK cướp dâu, cướp rể: bình luận 1 vào đội bảo vệ, 2 vào Đội Cướp
    if (this.wedding.pk){ const team = pkTeamOf(text); if (team){ this.wedding.pkJoin(p.id, p.name, team); return; } }
    // gõ KÉO, CHÈO... khi hội đang mở mà chưa ghi tên thì được ghi tên luôn
    if (cmd?.c === 'contest' && this.festival.open && !this.festival.isEntrant(p.id)){ this.apply(p, this.joinFestival(p)); if (this.festival.phase === 'lobby') return; }
    if (this.festival.isEntrant(p.id) && this.festival.phase === 'contest' && (!cmd || cmd.c === 'contest' || cmd.c === 'festival')){
      if (this.festival.act(p.id, t)) this.push({ k: 'act', id: p.id, act: 'festival', ok: true, text: '', bubble: '💪' });
      return;
    }
    if (!cmd){
      if (!created) this.push({ k: 'act', id: p.id, act: 'chat', ok: true, text: '', bubble: text.slice(0, 60) });
      this.chatHook?.(p.id, p.name, text);
      return;
    }
    if (cmd.c === 'enter' && created) return;
    if (t - (this.lastCmd.get(p.id) ?? 0) < COMMAND_COOLDOWN_MS) return;
    this.lastCmd.set(p.id, t);
    if (this.lastCmd.size > 5000) this.lastCmd.delete(this.lastCmd.keys().next().value as string);
    this.apply(p, this.run(p, cmd, t));
  }

  private run(p: Player, cmd: Command, t: number): Result {
    const road = this.build.level('road');
    switch (cmd.c){
      case 'enter': return ok('enter', `${p.name} dạo quanh làng`, 0, 'Chào bà con!');
      case 'home': return this.houses.describe(p);
      case 'rice': return this.rice.next(p);
      case 'plow': return this.rice.plow(p);
      case 'sow': return this.rice.sow(p);
      case 'water': return this.rice.water(p);
      case 'fert': return this.rice.fertilize(p);
      case 'harvest': return this.rice.harvest(p);
      case 'feedFish': return this.fish.feed(p);
      case 'buyFish': return this.fish.buy(p);
      case 'harvestFish': return this.fish.harvest(p);
      case 'catch': return this.fish.catch(p, t, this.rng, this.build.level('bridge'));
      case 'feedAnimals': return this.animals.feed(p, t);
      case 'buyChicken': return this.animals.buy(p, 'chicken', t);
      case 'buyDuck': return this.animals.buy(p, 'duck', t);
      case 'eggs': return this.animals.collect(p);
      case 'sellAnimals': return this.sellAnimals(p, t);
      case 'market': return this.market.sellAll(p, road);
      case 'sell': return this.market.sell(p, cmd.item, road);
      case 'buildHouse': return this.houses.upgrade(p);
      case 'buyDecor': return this.houses.buyDecor(p, cmd.key);
      case 'buyTool': return this.houses.buyTool(p, cmd.key);
      case 'outfit': return this.outfits.cycle(p);
      case 'buyCostume': return this.outfits.buy(p, cmd.key);
      case 'donate': return this.donate(p, cmd.amount);
      case 'festival': return this.joinFestival(p);
      case 'gender': p.gender = cmd.g; return ok('chat', '', 0, cmd.g === 'nam' ? 'Tui là nam 🙋‍♂️' : 'Tui là nữ 🙋‍♀️');
      case 'feast': return this.settings.scene === 'wedding' ? ok('chat', `${p.name} vào mâm ăn cỗ cưới`, 1, 'Ăn cỗ thôi!') : fail('chat', `${p.name}: làng chưa có đám cưới`);
      case 'contest': return fail('festival', this.festival.open ? `${p.name}: chờ hết giờ ghi tên rồi mới thi` : `${p.name}: hội làng chưa mở`);
    }
  }

  private apply(p: Player, r: Result){
    if (r.ok && r.xp){
      const lv = this.players.addXp(p, r.xp * (1 + 0.1 * this.build.level('school')));
      if (lv) this.push({ k: 'level', id: p.id, level: lv, title: p.title });
    }
    this.players.touch(p);
    this.changedSinceSave = true;
    this.push({ k: 'act', id: p.id, act: r.act, ok: r.ok, text: r.text, bubble: r.bubble ?? (r.ok ? undefined : '?') });
    if (r.ok && r.act !== 'chat') this.storage?.logEvent(r.act, p.id, r.text);
  }

  private sellAnimals(p: Player, t: number): Result {
    if (!this.animals.count(p)) return fail('market', `${p.name}: chuồng không có con nào`);
    const factor = this.animals.isMature(p, t) ? 1 : 0.6, n = this.animals.takeAll(p), bonus = this.build.level('road') * 0.05;
    const got = earn(p, this.market.sellUnits('chicken', n.chicken, bonus, factor) + this.market.sellUnits('duck', n.duck, bonus, factor));
    return ok('market', `${p.name} bán ${n.chicken} gà ${n.duck} vịt được ${fmt(got)}${factor < 1 ? ' (còn non nên rẻ)' : ''}`, 3, `+${fmt(got)}`);
  }

  private donate(p: Player, amount: number): Result {
    const b = this.build.active();
    if (!b) return fail('donate', `${p.name}: làng đã xây xong mọi công trình`);
    amount = Math.min(Math.max(10, Math.floor(amount)), Math.floor(p.money));
    if (amount < 10 || !spend(p, amount)) return fail('donate', `${p.name}: cần ít nhất 10đ để góp xây làng`);
    p.stats.contributed += amount;
    const name = PROJECTS[b.key].name;
    this.addPoints(amount);
    return ok('donate', `${p.name} góp ${fmt(amount)} xây ${name.toLowerCase()}`, amount / 10, `Góp ${fmt(amount)}`);
  }

  private addPoints(points: number, capped = false){
    const done = capped ? this.build.addCapped(points, GIFT.maxStageShare) : this.build.add(points);
    for (const d of done){
      this.push({ k: 'built', ...d });
      this.note(`🎉 Cả làng đã xây xong ${d.stageName}! ${PROJECTS[d.project].perk}`);
      this.push({ k: 'fireworks' });
      this.storage?.logEvent('built', '', d.stageName);
    }
    this.changedSinceSave = true;
  }

  private joinFestival(p: Player): Result {
    const r = this.festival.join(p.id, p.name);
    if (r === 'closed'){
      const mins = Math.max(1, Math.round((this.festival.nextAt - this.now()) / 60_000));
      return fail('festival', `${p.name}: hội làng mở sau khoảng ${mins} phút nữa`);
    }
    if (r === 'already') return ok('festival', `${p.name} đã có tên trong hội`, 0, 'Có mặt!');
    return ok('festival', `${p.name} ghi tên dự hội làng`, 2, 'Đi hội!');
  }

  private rewardFestival(results: Placing[], type: ContestKey){
    const bonus = 1 + 0.2 * this.build.level('temple');
    for (const r of results){
      const p = this.players.get(r.id);
      if (!p) continue;
      const base = type === 'keoco' ? (r.won ? FESTIVAL.rewards[1] : FESTIVAL.participation) : (r.won ? FESTIVAL.rewards[r.place - 1] : FESTIVAL.participation);
      const got = earn(p, base * bonus);
      if (r.won){ p.stats.festivalWins++; p.inv.wood += 5; p.inv.brick += 5; }
      const lv = this.players.addXp(p, XP.festival * (r.won ? 3 : 1));
      if (lv) this.push({ k: 'level', id: p.id, level: lv, title: p.title });
      this.players.touch(p);
      if (r.won) this.push({ k: 'act', id: p.id, act: 'festival', ok: true, text: '', bubble: `🏆 +${fmt(got)}` });
    }
    const w = this.festival.winners;
    this.note(w.length ? `🏆 ${type === 'keoco' ? 'Đội thắng kéo co' : 'Giải nhất'}: ${w.join(', ')}` : 'Hội làng kết thúc, cảm ơn bà con');
    this.storage?.logEvent('festival', '', `${type}: ${w.join(', ')}`);
    this.changedSinceSave = true;
  }

  // Tim của người chưa có nhà chỉ bay lên màn hình; cư dân thì tim đổi thành điểm xây làng, có trần mỗi giờ.
  private onLike(id: string, name: string, sim: boolean, count: number, t: number){
    // đám cưới: thả tim cũng được vào dự như bình luận
    if (this.battle.active){ this.welcome(id, name, sim, t); this.battle.like(id, Math.max(1, Math.min(500, count | 0)), t); }
    else if (this.settings.scene === 'wedding'){ const { p: q } = this.welcome(id, name, sim, t); this.wedding.seat(q.id, q.name); }
    const p = this.players.get(id);
    count = Math.max(1, Math.min(500, count | 0));
    this.push({ k: 'like', id, count });
    if (!p) return;
    p.lastSeen = t;
    this.festival.like(id, count);
    const hour = Math.floor(t / 3_600_000);
    if (p.likeHour !== hour){ p.likeHour = hour; p.likePoints = 0; }
    p.likeBank += count;
    const pts = Math.min(Math.floor(p.likeBank / LIKE_POINTS.perPoint), LIKE_POINTS.hourlyCap - p.likePoints);
    p.likeBank %= LIKE_POINTS.perPoint;
    if (pts > 0){ p.likePoints += pts; p.stats.contributed += pts; this.addPoints(pts); }
    this.players.touch(p);
  }

  // Làng tự chọn cô dâu chú rể: bất kỳ ai đang ở trong phòng live, kể cả người chỉ vào xem chưa bình luận
  // (TikTok báo vào phòng, thả tim, chia sẻ...) trong 10 phút gần đây. Ưu tiên nữ làm cô dâu, nam làm chú rể,
  // không đủ thì lấy người chưa chọn nam nữ. Đang live thật thì không chọn người thử (DEMO).
  private pickCouple(need: ('bride' | 'groom')[], skip: Set<string>){
    const t = this.now(), live = this.hideSimOnBoards, out: Partial<Record<'bride' | 'groom', { id: string; name: string }>> = {};
    if (this.settings.scene !== 'wedding') return out;                    // chỉ chọn ở cảnh đám cưới
    const pool = new Map<string, { id: string; name: string; sim: boolean; gender: Gender }>();
    for (const [id, r] of this.room) if (t - r.at < ONLINE_TIMEOUT_MS) pool.set(id, { id, name: this.players.get(id)?.name ?? r.name, sim: r.sim, gender: this.players.get(id)?.gender ?? '' });
    for (const p of this.players.all.values()) if (this.players.isOnline(p, t)) pool.set(p.id, { id: p.id, name: p.name, sim: p.sim, gender: p.gender });
    const list = [...pool.values()].filter(p => !skip.has(p.id) && p.id !== this.wedding.pk?.thief.id && !(live && p.sim));
    const take = (want: Gender) => {
      const exact = list.filter(p => p.gender === want), alt = list.filter(p => p.gender === '');
      const from = exact.length ? exact : alt;
      if (!from.length) return null;
      const c = from[Math.floor(this.rng() * from.length)];
      list.splice(list.indexOf(c), 1);
      const p = this.players.get(c.id) ?? this.welcome(c.id, c.name, c.sim, t).p;   // người chỉ mới vào xem: tạo nhân vật để lên sân khấu
      return { id: p.id, name: p.name };
    };
    for (const r of need){ const p = take(r === 'bride' ? 'nu' : 'nam'); if (p) out[r] = p; }
    return out;
  }

  private onShare(id: string, name: string, sim: boolean, t: number){
    const { p } = this.welcome(id, name, sim, t);
    if (t - p.shareAt < SHARE.cooldownMs) return;
    p.shareAt = t;
    earn(p, SHARE.money);
    p.stats.contributed += SHARE.points;
    this.addPoints(SHARE.points);
    this.apply(p, ok('donate', `📣 ${p.name} chia sẻ làng: +${fmt(SHARE.money)} và ${SHARE.points} điểm xây làng`, 5, 'Cảm ơn!'));
  }

  private onGift(msgId: string, id: string, name: string, sim: boolean, gift: string, diamonds: number, count: number, t: number){
    const { p } = this.welcome(id, name, sim, t);
    gift = String(gift || 'quà').slice(0, 30);
    count = Math.max(1, Math.min(9999, count | 0));
    const total = Math.max(1, Math.min(1_000_000, (diamonds | 0) * count));
    const tier = tierFor(total);
    p.stats.gifted += total;

    // Người tặng và hàng xóm gần nhất được tưới, cho ăn, tăng tốc. Ai đã dùng hết hạn mức ngày thì phần đó sang xây làng.
    const neighbors = this.neighbors(p, tier.neighbors, t);
    let spill = 0;
    for (const [q, share] of [[p, 1] as const, ...neighbors.map(q => [q, 1 / 3] as const)]){
      this.rice.rain(q); this.fish.feedFree(q); this.animals.feedFree(q);
      const want = Math.round(tier.skip * share), got = this.gifts.takeSkip(q, want, t);
      spill += want - got;
      if (got){ this.rice.skip(q, got); this.fish.skip(q, got); this.animals.skip(q, got, t); }
      this.players.touch(q);
    }
    // Nâng nhà có hạn mức ngày; quá mức hoặc nhà đã cấp 10 thì đổi thành vật liệu
    const levels = tier.house ? this.gifts.takeHouse(p, tier.house, t) : 0;
    if (levels){ p.houseLevel += levels; const lv = this.players.addXp(p, XP.house); if (lv) this.push({ k: 'level', id: p.id, level: lv, title: p.title }); }
    const wantMats = tier.wood + tier.brick + (tier.house - levels) * 60;
    const mats = this.gifts.takeMaterials(p, wantMats, t), wood = Math.ceil(mats / 2);
    p.inv.wood += wood; p.inv.brick += mats - wood;
    const decor = tier.decor ? this.houses.giveDecor(p, this.rng) : null;
    const costume = tier.outfit ? this.outfits.give(p, tier.outfit >= 2, this.rng) : null;
    if (tier.rain) this.setWeather('rain', 90_000);
    p.stats.contributed += total;
    this.addPoints(total * GIFT.pointsPerDiamond + spill / 6, true);
    if (tier.festival && this.festival.phase === 'idle' && this.settings.scene !== 'wedding') this.festival.start(t);
    if (tier.min >= 100) this.push({ k: 'fireworks' });

    const extra = [levels ? `nhà lên ${HOUSES[p.houseLevel - 1].name}` : '', costume ? `mặc ${COSTUMES[costume].name.toLowerCase()}` : '',
      mats ? `+${mats} gỗ gạch` : '', decor ? 'tặng đồ trang trí' : ''].filter(Boolean).join(', ');
    this.push({ k: 'gift', id: p.id, name: p.name, gift, count, diamonds: total, tier: tier.key, sim,
      text: `🎁 ${p.name} tặng ${gift}${count > 1 ? ' x' + count : ''}: ${tier.name}! ${tier.desc}${extra ? ' (' + extra + ')' : ''}`,
      targets: neighbors.map(q => q.id) });
    this.storage?.logGift(msgId, p, gift, count, total, tier.key);
    // bảng quà cưới tháng: mọi quà trong cảnh đám cưới (kể cả lúc Đại chiến), lưu ra file
    if (this.settings.scene === 'wedding'){ this.weddingTop.add(p.id, p.name, total, sim, t); this.wedding.dirty = true; }
    if (this.battle.active) this.battle.gift(p.id, p.name, total, t);
    else if (this.settings.scene === 'wedding'){
      this.wedding.gift(p.id, p.name, sim, total, t, p.gender);
      // từ 20 xu: đổi trang phục mới (cô dâu chú rể đổi bộ đồ cưới khác)
      if (total >= 20){ p.look++; this.push({ k: 'wedding', ev: 'outfit', id: p.id, name: p.name, amount: total, text: `👗 ${p.name} thay trang phục mới` }); }
    }
    else this.giftHook?.(p.name, gift, count, tier.key);
    this.players.touch(p);
    this.changedSinceSave = true;
  }

  private neighbors(p: Player, n: number, t: number){
    if (n <= 0) return [];
    return this.players.withLots().filter(q => q.id !== p.id && this.players.isOnline(q, t))
      .sort((a, b) => Math.abs(a.lot - p.lot) - Math.abs(b.lot - p.lot)).slice(0, n);
  }

  private note(text: string){ this.push({ k: 'note', text }); }
  push(f: Fx){ this.fx.push(f); if (this.fx.length > 400) this.fx.splice(0, this.fx.length - 400); }

  /* ----------------------------------------------------------- time */
  setWeather(w: Weather, ms: number){
    this.world.weather = w; this.world.wind = WIND[w]; this.weatherUntil = this.now() + ms; this.worldDirty = true;
  }
  setClock(c: number){ this.world.clock = ((c % 1) + 1) % 1; this.worldDirty = true; }

  private nextWeather(){
    const odds = WEATHER_ODDS[this.world.season] ?? WEATHER_ODDS[0];
    let r = this.rng() * odds.reduce((s, [, w]) => s + w, 0);
    for (const [w, n] of odds){ r -= n; if (r <= 0) return w; }
    return 'clear';
  }

  private simulate(dt: number, live: boolean){
    const w = this.world;
    w.clock += dt / DAY_SECONDS;
    while (w.clock >= 1){ w.clock -= 1; w.day++; w.season = Math.floor((w.day - 1) / DAYS_PER_SEASON) % SEASONS.length; }
    if (live && this.now() >= this.weatherUntil) this.setWeather(this.nextWeather(), (60 + this.rng() * 140) * 1000);
    const growth = SEASON_GROWTH[w.season], raining = w.weather === 'rain';
    for (const p of this.players.all.values()){
      if (raining) this.rice.rain(p);
      this.rice.tick(p, dt, growth);
      this.fish.tick(p, dt, growth);
      this.animals.tick(p, dt);
    }
    this.market.tick(dt, this.rng);
    for (const d of this.build.tick(dt)){ this.push({ k: 'built', ...d }); this.note(`🎉 Cả làng đã xây xong ${d.stageName}!`); this.push({ k: 'fireworks' }); }
  }

  tick(){
    const t = this.now(), dt = Math.min(5, Math.max(0, (t - this.lastTick) / 1000));
    this.lastTick = t;
    const start = performance.now();
    this.simulate(dt, true);
    this.festival.paused = this.settings.scene === 'wedding';
    this.festival.tick(t);
    if (!this.battle.active) this.wedding.tick(t);
    this.battle.tick(t);
    this.worldDirty = true;
    // chỉ gửi người có thay đổi nhìn thấy được (lúa lớn thêm 5%, ao hết cám, vừa vào hay rời live...)
    // Ai vừa rời làng hay vừa quay lại thì báo lên Tin làng. Nhiều người rời cùng lúc (hết live) thì gộp một dòng.
    const left: Player[] = [], back: Player[] = [];
    for (const p of this.players.withLots()){
      const on = this.players.isOnline(p, t), was = this.wasOnline.get(p.id);
      if (was !== undefined && was !== on) (on ? back : left).push(p);
      this.wasOnline.set(p.id, on);
      const fp = `${on ? 1 : 0}${p.rice.stage}${Math.floor(p.rice.progress * 20)}${p.rice.water > 0 ? 1 : 0}${p.pond.fish}:${Math.floor(p.pond.growth * 20)}${p.pond.fed > 0 ? 1 : 0}${p.coop.fed > 0 ? 1 : 0}${p.coop.eggs}`;
      if (this.fingerprints.get(p.id) !== fp){ this.fingerprints.set(p.id, fp); this.players.touch(p); }
    }
    if (left.length > 3) this.note(`👋 ${left.length} người rời làng, hẹn gặp lại bà con`);
    else for (const p of left) this.push({ k: 'leave', id: p.id, name: p.name });
    for (const p of back.slice(0, 5)) this.push({ k: 'back', id: p.id, name: p.name });
    this.stats.tickMs = Math.round((performance.now() - start) * 10) / 10;
  }

  // Đang live thật thì bảng xếp hạng ẩn cư dân mô phỏng.
  private computeBoards(): Boards {
    const list = [...this.players.all.values()].filter(p => !(this.hideSimOnBoards && p.sim));
    const top = (val: (p: Player) => number): BoardRow[] => list.filter(p => val(p) > 0)
      .sort((a, b) => val(b) - val(a)).slice(0, 10).map(p => ({ id: p.id, name: p.name, value: Math.round(val(p)), sim: p.sim }));
    return { level: top(p => p.xp), wealth: top(p => p.money), builders: top(p => p.stats.contributed), donors: top(p => p.stats.gifted) };
  }

  /* ------------------------------------------------------- output */
  snapshot(role: Snapshot['role']): Snapshot {
    const t = this.now();
    return {
      t: 'hello', role, players: this.players.withLots().map(p => this.players.pub(p, t)), world: this.world,
      projects: this.build.list, market: this.market.rows, festival: this.festival.pub(t), boards: this.computeBoards(),
      live: this.live, stats: this.countStats(t), reserve: Math.round(this.build.reserve), settings: this.settings, wedding: this.weddingPub(t),
      battle: this.battle.pub(t, id => this.avatars.has(id)),
    };
  }

  private countStats(t: number){
    let online = 0, real = 0;
    for (const p of this.players.all.values()) if (this.players.isOnline(p, t)){ online++; if (!p.sim) real++; }
    this.stats.residents = this.players.all.size; this.stats.online = online; this.stats.realOnline = real;
    return { ...this.stats };
  }

  setLive(s: LiveStatus){ this.live = s; this.liveDirty = true; }

  // Trạng thái đám cưới kèm cờ có ảnh đại diện, để màn hình vẽ ảnh cô dâu chú rể lên bảng sân khấu
  private weddingPub(t: number){
    const w = this.wedding.pub(t), mark = (r: typeof w.bride) => r && { ...r, avatar: this.avatars.has(r.id) };
    return { ...w, bride: mark(w.bride), groom: mark(w.groom), top: this.weddingTop.top(this.hideSimOnBoards, t), month: this.weddingTop.month };
  }
  setSettings(s: Partial<Settings>){
    if (typeof s.idleBots === 'boolean') this.settings.idleBots = s.idleBots;
    if (typeof s.voice === 'boolean') this.settings.voice = s.voice;
    if (typeof s.readChat === 'boolean') this.settings.readChat = s.readChat;
    if (s.scene === 'village' || s.scene === 'wedding') this.settings.scene = s.scene;
    this.changedSinceSave = true;
    this.settingsDirty = true;
  }

  // Người xem thật đang online, không tính cư dân mô phỏng.
  realOnline(){ const t = this.now(); let n = 0; for (const p of this.players.all.values()) if (!p.sim && this.players.isOnline(p, t)) n++; return n; }

  // Cư dân mô phỏng chào rồi về nhà: màn hình thấy họ đi về và vào nhà như người xem rời live.
  goOffline(id: string){ const p = this.players.get(id); if (!p?.sim) return; p.lastSeen = this.now() - ONLINE_TIMEOUT_MS - 1; this.players.touch(p); }

  // Rớt kết nối TikTok bao lâu thì cộng bấy lâu cho người xem thật, để họ không bị tính là đã rời làng vì im lặng.
  extendOnline(ms: number){ for (const p of this.players.all.values()) if (!p.sim && this.players.isOnline(p, this.now() - ms)) p.lastSeen += ms; }

  // Gom mọi thay đổi từ lần trước thành một gói nhỏ.
  delta(withBoards: boolean): Delta | null {
    const t = this.now(), d: Delta = { t: 'delta' };
    const changed = this.players.takeDirty().filter(p => p.lot >= 0);
    if (changed.length) d.players = changed.map(p => this.players.pub(p, t));
    const removed = this.players.takeRemoved();
    if (removed.length) d.removed = removed;
    if (this.worldDirty){ d.world = this.world; this.worldDirty = false; }
    if (this.build.dirty){ d.projects = this.build.list; d.reserve = Math.round(this.build.reserve); this.build.dirty = false; }
    if (this.market.dirty){ d.market = this.market.rows; this.market.dirty = false; }
    if (this.festival.dirty || this.festival.phase !== 'idle'){ d.festival = this.festival.pub(t); this.festival.dirty = false; }
    if (withBoards){
      const b = this.computeBoards(), key = JSON.stringify(b);
      if (key !== this.boardsKey || this.boardsDirty){ d.boards = b; this.boardsKey = key; this.boardsDirty = false; }
      d.stats = this.countStats(t);
    }
    if (this.liveDirty){ d.live = this.live; this.liveDirty = false; }
    if (this.settingsDirty){ d.settings = this.settings; this.settingsDirty = false; }
    if (this.wedding.dirty || (withBoards && (this.wedding.phase === 'married' || this.wedding.phase === 'done'))){ d.wedding = this.weddingPub(t); this.wedding.dirty = false; }
    if (this.battle.dirty || (withBoards && this.battle.active)){ d.battle = this.battle.pub(t, id => this.avatars.has(id)); this.battle.dirty = false; }
    if (this.fx.length){ d.fx = this.fx.splice(0).slice(-MAX_FX_PER_DELTA); }
    if (d.players) this.changedSinceSave = true;
    return Object.keys(d).length > 1 ? d : null;
  }

  removeSimPlayers(){
    for (const p of [...this.players.all.values()]) if (p.sim) this.players.remove(p.id);
    this.boardsDirty = true;
  }

  private saveSet(){
    return {
      players: this.players.all.values(), buildings: this.build.list, market: this.market.rows, weddingTop: { month: this.weddingTop.month, rows: this.weddingTop.all() },
      village: { world: this.world, lastTick: this.lastTick, nextFestivalAt: this.festival.nextAt, festivalsHeld: this.festival.held, reserve: this.build.reserve, settings: this.settings },
    };
  }
  async save(force = false){
    if (!this.storage || (!force && !this.changedSinceSave)) return;
    this.changedSinceSave = false;
    await this.storage.save(this.saveSet());
  }
  saveSync(){ if (this.storage){ this.storage.saveSync(this.saveSet()); this.storage.flushLogsSync(); } }
}

// "1", "số 1", "đội dâu", "đội rể", "bảo vệ" -> đội bảo vệ; "2", "số 2", "đội cướp", "cướp" -> Đội Cướp
export function pkTeamOf(text: string): PkTeam | null {
  const s = text.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  if (/^(số )?1$|^một$|^mot$|đội dâu|đội rể|doi dau|doi re|bảo vệ|bao ve/.test(s)) return 'def';
  if (/^(số )?2$|^hai$|đội cướp|doi cuop|^cướp|^cuop/.test(s)) return 'cuop';
  return null;
}
