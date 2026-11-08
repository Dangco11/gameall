import { ARCHETYPES, artifactByKey, ARTIFACTS, artifactLevel, CLASS_WORDS, classByKey, needTuvi, norm, realmName, REALMS, realmOf, sectByKey, SECTS, skillsFor, statsOf, VIP_NAMES, vipTier, MAX_LEVEL } from '../shared/game.ts';
import type { ArtifactKey } from '../shared/game.ts';
import type { CultPub, Fx, LiveEvent, Mode, ModeState, SideInfo } from '../shared/types.ts';
import { BossSystem } from './BossSystem.ts';
import { CombatSystem } from './CombatSystem.ts';
import type { Fighter } from './CombatSystem.ts';
import { CultivationSystem } from './CultivationSystem.ts';
import { handleGift } from './GiftEventHandler.ts';
import { PlayerStore } from './PlayerStore.ts';
import type { Player } from './PlayerStore.ts';
import { RankingSystem } from './RankingSystem.ts';

// Điều phối thế giới tu tiên: luân phiên Tu luyện → Boss → PK 1vs1 → PK 3vs3 → Đoạt Bảo → Tông môn đại chiến,
// nhận bình luận / tim / quà, thưởng tu vi, pháp bảo, điểm PK; NPC (có nhãn) lấp chỗ cho đỡ vắng, không lên bảng.
const ACTIVE_MS = 10 * 60_000;
const DUR: Record<Mode, number> = { tuluyen: 22_000, boss: 240_000, pk1: 45_000, pk3: 70_000, sect: 100_000, treasure: 20_000 };
const ROTATION: Mode[] = ['boss', 'pk1', 'pk3', 'treasure', 'boss', 'pk1', 'sect', 'pk1'];
const TITLES: Record<Mode, string> = { tuluyen: 'Tu Luyện · Hấp Thu Linh Khí', boss: 'Boss Thế Giới', pk1: 'PK Sinh Tử 1vs1', pk3: 'PK Đội 3vs3', sect: 'Tông Môn Đại Chiến', treasure: 'Đoạt Bảo · Bảo Vật Xuất Thế' };
const NPC_NAMES = ['Thanh Phong', 'Lăng Vân', 'Mộ Dung Tuyết', 'Tiêu Dao Tử', 'Bạch Y Kiếm', 'Huyền Cơ', 'Lạc Hà', 'Vân Thường', 'Hàn Lập Tử', 'Diệp Phàm Tâm',
  'Tử Yên', 'Phong Linh', 'Thạch Hạo Nhiên', 'Liễu Như Yên', 'Mặc Trần', 'Cổ Nguyệt', 'Tần Vũ Phong', 'Lâm Động Thiên', 'Sở Hà', 'Kiếm Vô Song'];
export const spokenName = (s: string) => String(s).replace(/[_@.]+/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim() || 'đạo hữu';

export interface WorldSave { sectWins: Record<string, number>; bossOrder: number }

export class World {
  store: PlayerStore;
  cult = new CultivationSystem();
  combat: CombatSystem;
  boss: BossSystem;
  ranks: RankingSystem;
  mode: Mode = 'tuluyen';
  round = 0;
  npcCount = 6;
  private modeEnd = 0; private rot = 0; private forced: Mode | null = null;
  private active = new Map<string, number>();
  private npcs = new Map<string, Player>();
  private pkQueue: string[] = [];
  private treasureIn = new Map<string, number>();   // người tranh đoạt → số phiếu (quà càng to càng nhiều phiếu)
  private treasureArt: ArtifactKey = 'phikiem';
  private sides: SideInfo[] = [];
  private sectPair: string[] = [];
  private commentAt = new Map<string, number>();
  private fxq: Fx[] = [];
  private lastSecond = 0;
  private nowMs = Date.now();
  say: (text: string, prio?: boolean) => void = () => {};
  log: (s: string) => void = () => {};

  constructor(dataDir: string, save?: Partial<WorldSave>) {
    this.store = new PlayerStore(dataDir);
    this.combat = new CombatSystem(f => this.fx(f));
    this.boss = new BossSystem(this.combat, f => this.fx(f));
    this.ranks = new RankingSystem(this.store);
    this.ranks.sectWins = save?.sectWins ?? {};
    for (let i = 0; i < (save?.bossOrder ?? 0); i++) this.boss.nextDef();
    this.combat.onDamage = (by, victim, v) => {
      if (victim.isBoss) { this.boss.noteDamage(by, v); const p = this.store.get(by.id); if (p) p.bossDmg += v; }
    };
    this.combat.onDown = (victim, by) => this.onDown(victim, by);
    this.modeEnd = Date.now() + 30_000;
  }
  saveState(): WorldSave { return { sectWins: this.ranks.sectWins, bossOrder: 0 }; }
  fx(f: Fx) { this.fxq.push(f); if (this.fxq.length > 400) this.fxq.splice(0, this.fxq.length - 400); }
  takeFx() { return this.fxq.splice(0); }
  spoken(s: string) { return spokenName(s); }
  get viewers() { const now = Date.now(); let n = 0; for (const t of this.active.values()) if (now - t < ACTIVE_MS) n++; return n; }

  /* ---------------------------------------------------------- người chơi */
  private who(id: string) { return this.store.get(id) ?? this.npcs.get(id); }
  touch(p: Player) { if (!p.id.startsWith('npc:')) this.active.set(p.id, Date.now()); }
  private activePlayers(): Player[] {
    const now = Date.now(), out: Player[] = [];
    for (const [id, t] of this.active) { if (now - t > ACTIVE_MS) { this.active.delete(id); continue; } const p = this.store.get(id); if (p) out.push(p); }
    return out;
  }
  addTuvi(p: Player, amount: number) {
    const b = this.cult.add(p, amount);
    this.checkVip(p);
    if (!b) return;
    this.store.dirty = true; this.ranks.invalidate();
    if (p.id.startsWith('npc:')) return;
    this.fx({ k: 'break', id: p.id, name: p.name, lv: b.to, realm: b.realm });
    // fighter đang đánh: cập nhật chỉ số mới
    const f = this.combat.fighters.get(p.id);
    if (f) { const s = statsOf(p.lv, this.store.cls(p), this.store.artLevels(p)); const r = f.hp / f.mhp; f.mhp = Math.round(s.hp * f.hpMul); f.hp = Math.round(f.mhp * r); f.atk = s.atk; f.def = s.def; f.skills = skillsFor(this.store.cls(p), p.lv); }
    if (b.realm) this.say(`Thiên kiếp giáng xuống! Chúc mừng ${spokenName(p.name)} đột phá ${REALMS[realmOf(b.to)]}!`, true);
  }
  // lên bậc ngoại hình VIP (cảnh giới / tổng xu / lập công Boss): báo màn hình biến hình
  checkVip(p: Player) {
    if (p.id.startsWith('npc:')) return;
    const t = vipTier(p.lv, p.xu, p.bossTop || 0);
    if (t <= (p.vip || 0)) return;
    p.vip = t; this.store.dirty = true;
    this.fx({ k: 'vip', id: p.id, name: p.name, tier: t });
    this.say(`Chúc mừng ${spokenName(p.name)} thăng cấp ${VIP_NAMES[t]}, khí chất ngút trời!`, true);
  }
  // thưởng lên thẳng N kỳ (đánh Boss, thắng PK): cộng đủ tu vi để đột phá N lần
  levelUp(p: Player, stages: number, why: string) {
    if (p.id.startsWith('npc:') || stages <= 0) return;
    const from = p.lv;
    for (let i = 0; i < stages && p.lv < MAX_LEVEL; i++) this.addTuvi(p, needTuvi(p.lv) - p.tuvi + 1);
    const got = p.lv - from;
    if (got > 0) this.fx({ k: 'reward', id: p.id, name: p.name, stages: got, why });
  }
  // tặng quà lúc đang PK / tông môn chiến mà chưa được đấu: vào trận ngay (thế chỗ NPC hoặc làm viện binh)
  joinFight(p: Player, now: number): Fighter | null {
    const cur = this.combat.fighters.get(p.id);
    if (cur) return cur.down ? null : cur;
    const fs = [...this.combat.fighters.values()];
    const npcs = fs.filter(f => f.npc && !f.down);
    let team = -1, x = 0, z = 0, replaced: Fighter | null = null;
    if (this.mode === 'sect') {
      team = this.sectPair.indexOf(p.sect);
      if (team < 0) team = this.combat.alive(0) <= this.combat.alive(1) ? 0 : 1;
      replaced = npcs.find(f => f.team === team) ?? null;
      if (!replaced && fs.filter(f => f.team === team).length >= 14) return null;
    } else {
      replaced = npcs.sort((a, b) => a.hp / a.mhp - b.hp / b.mhp)[0] ?? null;
      if (!replaced) {
        if (this.mode === 'pk1') return null;                       // 1vs1 hai người thật: chờ lượt sau
        const hpOf = (t: number) => fs.filter(f => f.team === t && !f.down).reduce((s, f) => s + f.hp / f.mhp, 0);
        team = hpOf(0) <= hpOf(1) ? 0 : 1;
        if (fs.filter(f => f.team === team).length >= 5) return null;
      }
    }
    if (replaced) { team = replaced.team; x = replaced.x; z = replaced.z; this.combat.remove(replaced.id); this.fx({ k: 'down', id: replaced.id }); }
    else { x = (team ? 1 : -1) * 14; z = (Math.random() - 0.5) * 14; }
    const f = this.fighterOf(p, team, x, z, 0);
    if (this.sides[team] && this.mode !== 'sect') this.sides[team].name = fs.filter(o => o.team === team && o !== replaced).map(o => o.name).concat(p.name).join(', ');
    this.fx({ k: 'note', text: `⚔️ ${p.name} tặng quà nhập trận${replaced ? ' thay ' + replaced.name : ' làm viện binh'}!` });
    void now;
    return f;
  }
  // tặng quà lúc Đoạt Bảo: tự vào danh sách, quà càng to càng nhiều phiếu
  treasureTicket(p: Player, xu: number) {
    if (this.mode !== 'treasure') return;
    this.treasureIn.set(p.id, (this.treasureIn.get(p.id) ?? 0) + 1 + Math.floor(Math.log2(1 + xu)));
  }
  queuePk(id: string, front = false) {
    this.pkQueue = this.pkQueue.filter(x => x !== id);
    if (front) this.pkQueue.unshift(id); else this.pkQueue.push(id);
    if (this.pkQueue.length > 50) this.pkQueue.length = 50;
  }

  handle(ev: LiveEvent) {
    const now = Date.now();
    const p = this.store.ensure(ev.id, ev.name, ev.avatar, ev.sim);
    const isNew = !this.active.has(p.id);
    this.touch(p);
    if (isNew) {
      this.fx({ k: 'join', id: p.id, name: p.name, sect: p.sect, cls: classByKey.get(this.store.cls(p))!.name });
      if (this.mode === 'boss' && this.boss.alive) this.ensureBossFighter(p, now);
    }
    switch (ev.kind) {
      case 'gift': handleGift(this, p, ev.diamonds, ev.count, ev.gift, now); break;
      case 'like': this.addTuvi(p, Math.min(60, ev.count) * 2); break;
      case 'follow': this.addTuvi(p, 150); break;
      case 'share': this.addTuvi(p, 80); break;
      case 'comment': this.comment(p, ev.text, now); break;
      default: break;
    }
  }
  private comment(p: Player, text: string, now: number) {
    const t = norm(text);
    if ((this.commentAt.get(p.id) || 0) + 8000 < now) { this.commentAt.set(p.id, now); this.addTuvi(p, 8 + p.lv); }
    for (const [re, cls] of CLASS_WORDS) if (re.test(t)) {
      this.store.setClass(p, cls); this.fx({ k: 'note', text: `${p.name} chuyển sang ${classByKey.get(cls)!.name}` }); this.refreshFighter(p); return;
    }
    if (t === 'nam' || t === 'nu') { this.store.setGender(p, t === 'nu'); this.refreshFighter(p); return; }
    for (const s of SECTS) if (s.words.test(t)) {
      if (p.sect !== s.key) { p.sect = s.key; this.store.dirty = true; this.ranks.invalidate(); this.fx({ k: 'sect', id: p.id, name: p.name, sect: s.key }); }
      return;
    }
    if (/^(pk|thach dau|thach|chien|dau)$/.test(t)) { this.queuePk(p.id); this.fx({ k: 'note', text: `⚔️ ${p.name} xin thách đấu (hàng chờ ${this.pkQueue.indexOf(p.id) + 1})` }); return; }
    if (/^(doat|cuop|doat bao|cuop bao|bao)$/.test(t) && this.mode === 'treasure') { if (!this.treasureIn.has(p.id)) this.treasureIn.set(p.id, 1); return; }
  }
  private refreshFighter(p: Player) {
    const f = this.combat.fighters.get(p.id); if (!f) return;
    const s = statsOf(p.lv, this.store.cls(p), this.store.artLevels(p));
    f.atk = s.atk; f.def = s.def; f.spd = s.spd; f.crit = s.crit; f.skills = skillsFor(this.store.cls(p), p.lv); f.support = classByKey.get(this.store.cls(p))!.role === 'support';
  }

  /* ---------------------------------------------------------- NPC */
  private npc(i: number, lvAround: number, sect = ''): Player {
    const id = `npc:${sect || 'x'}:${i}`;
    let p = this.npcs.get(id);
    const lv = Math.max(0, Math.min(40, Math.round(lvAround + (Math.random() - 0.5) * 4)));
    if (!p) {
      p = { id, name: 'NPC ' + NPC_NAMES[i % NPC_NAMES.length], avatar: '', a: (i * 7 + sect.length) % ARCHETYPES.length, lv, tuvi: 0, sect, arts: {}, pkW: 0, pkL: 0, pkPts: 0, xu: 0, bossDmg: 0, kills: 0, bossTop: 0, bossFights: 0, vip: 0, createdAt: 0, lastAt: 0 };
      this.npcs.set(id, p);
    }
    p.lv = lv; p.sect = sect || p.sect;
    return p;
  }
  private avgLv(list: Player[]) { return list.length ? list.reduce((s, p) => s + p.lv, 0) / list.length : 4; }

  /* ---------------------------------------------------------- chế độ */
  private fighterOf(p: Player, team: number, x: number, z: number, reviveMs = 0): Fighter {
    const cls = this.store.cls(p), s = statsOf(p.lv, cls, this.store.artLevels(p));
    // PK / tông môn: máu dày hơn để trận đấu kéo dài 30–60 giây cho người xem kịp tặng quà tiếp sức
    const hpMul = this.mode === 'pk1' ? 4 : this.mode === 'pk3' ? 3.5 : this.mode === 'sect' ? 4 : 1;
    return this.combat.add({ id: p.id, name: p.name, team, npc: p.id.startsWith('npc:'), x, z, hp: Math.round(s.hp * hpMul), hpMul, atk: s.atk, def: s.def, spd: s.spd, crit: s.crit,
      skills: skillsFor(cls, p.lv), reviveMs, support: classByKey.get(cls)!.role === 'support' });
  }
  ensureBossFighter(p: Player, _now: number): Fighter | null {
    if (!this.boss.alive) return null;
    const f0 = this.combat.fighters.get(p.id);
    if (f0) return f0;
    const n = this.combat.fighters.size, ang = n * 2.399, r = 16 + (n % 4) * 3.5;
    const f = this.fighterOf(p, 2, Math.sin(ang) * r, -4 + Math.cos(ang) * r, 7000);
    this.boss.scale([...this.combat.fighters.values()].filter(x => !x.isBoss));
    return f;
  }
  start(mode: Mode, now: number) {
    this.endMode(now, true);
    this.mode = mode; this.round++;
    this.modeEnd = now + DUR[mode];
    this.combat.clear(); this.sides = [];
    this.combat.hitCap = mode === 'boss' ? 1 : 0.12;
    const act = this.activePlayers().sort((a, b) => b.lastAt - a.lastAt);
    const lvAvg = this.avgLv(act);
    if (mode === 'boss') {
      this.combat.bounds = 32;
      this.boss.spawn(this.boss.nextDef(), now);
      const list = act.slice(0, 36);
      for (let i = list.length; i < this.npcCount; i++) list.push(this.npc(i, lvAvg));
      list.forEach((p, i) => { const ang = i * 2.399, r = 16 + (i % 4) * 3.5; this.fighterOf(p, 2, Math.sin(ang) * r, -4 + Math.cos(ang) * r, 7000); });
      this.boss.scale([...this.combat.fighters.values()].filter(x => !x.isBoss));
      this.say(`${this.boss.def!.name} xuất thế! Chư vị đạo hữu, gõ 1 để vào đánh Boss, tặng quà để tung tuyệt chiêu!`, true);
    } else if (mode === 'pk1' || mode === 'pk3') {
      this.combat.bounds = 19;
      const n = mode === 'pk1' ? 2 : 6;
      const pick: Player[] = [];
      for (const id of this.pkQueue) { const p = this.store.get(id); if (p && !pick.includes(p) && this.active.has(id)) pick.push(p); if (pick.length >= n) break; }
      this.pkQueue = this.pkQueue.filter(id => !pick.some(p => p.id === id));
      const rest = act.filter(p => !pick.includes(p)).sort(() => Math.random() - 0.5);
      while (pick.length < n && rest.length) pick.push(rest.shift()!);
      for (let i = pick.length; i < n; i++) pick.push(this.npc(10 + i, lvAvg));
      // chia đội so le theo chiến lực cho cân
      const sorted = [...pick].sort((a, b) => b.lv - a.lv);
      sorted.forEach((p, i) => {
        const team = n === 2 ? i : ([0, 1, 1, 0, 0, 1][i] ?? i % 2);
        const k = sorted.slice(0, i).filter((_, j) => (n === 2 ? j : ([0, 1, 1, 0, 0, 1][j] ?? j % 2)) === team).length;
        this.fighterOf(p, team, team ? 10 : -10, (k - 1) * 6.5 * (n === 2 ? 0 : 1), 0);
      });
      const names = (t: number) => [...this.combat.fighters.values()].filter(f => f.team === t).map(f => f.name).join(', ');
      this.sides = [{ name: names(0), color: 0x7fc8ff, score: 0, alive: 0 }, { name: names(1), color: 0xff5e7e, score: 0, alive: 0 }];
      this.say(n === 2 ? `Võ đài sinh tử: ${spokenName(sorted[0].name)} đối đầu ${spokenName(sorted[1].name)}!` : 'Đại chiến ba đấu ba bắt đầu!', true);
    } else if (mode === 'sect') {
      this.combat.bounds = 30;
      const count = new Map<string, Player[]>();
      for (const p of act) if (p.sect) count.set(p.sect, [...(count.get(p.sect) ?? []), p]);
      const order = [...SECTS.map(s => s.key)].sort((a, b) => (count.get(b)?.length ?? 0) - (count.get(a)?.length ?? 0) || Math.random() - 0.5);
      this.sectPair = order.slice(0, 2);
      this.sectPair.forEach((key, team) => {
        const list = (count.get(key) ?? []).slice(0, 10);
        for (let i = list.length; i < Math.max(4, Math.min(10, list.length + 2)); i++) list.push(this.npc(20 + i, lvAvg, key));
        list.forEach((p, i) => this.fighterOf(p, team, (team ? 1 : -1) * (15 + (i % 2) * 5), (Math.floor(i / 2) - 2) * 6, 0));
      });
      this.sides = this.sectPair.map((k, i) => ({ name: sectByKey.get(k)!.name, color: sectByKey.get(k)!.color, score: 0, alive: 0 + i * 0 }));
      this.say(`Tông môn đại chiến: ${sectByKey.get(this.sectPair[0])!.name} đối đầu ${sectByKey.get(this.sectPair[1])!.name}! Gõ tông 1, 2, 3, 4 để gia nhập tông môn.`, true);
    } else if (mode === 'treasure') {
      this.treasureIn.clear();
      this.treasureArt = ARTIFACTS[Math.floor(Math.random() * 7)].key;
      this.fx({ k: 'treasure', ev: 'spawn', art: this.treasureArt });
      this.say(`Bảo vật ${artifactByKey.get(this.treasureArt)!.name} xuất thế! Gõ đoạt để tranh đoạt bảo vật!`, true);
    }
    this.fx({ k: 'mode', mode, title: this.title() });
    this.log(`▶ ${this.title()}`);
  }
  private title() { return this.mode === 'boss' && this.boss.def ? `Boss Thế Giới · ${this.boss.def.name}` : TITLES[this.mode]; }

  // kết thúc chế độ: chia thưởng
  private endMode(now: number, silent = false) {
    const mode = this.mode;
    if (mode === 'boss' && this.boss.def) {
      const dead = !!this.boss.f?.down;
      if (dead) this.rewardBoss();
      else if (!silent || this.boss.f) this.boss.flee();
      this.boss.end();
    } else if (mode === 'pk1' || mode === 'pk3' || mode === 'sect') {
      this.finishFight();
    } else if (mode === 'treasure') {
      const pool = [...this.treasureIn].filter(([id]) => this.store.get(id));
      const nWin = Math.min(3, pool.length ? Math.max(1, Math.ceil(pool.length / 5)) : 0), winners: Player[] = [];
      while (winners.length < nWin && pool.length) {
        let r = Math.random() * pool.reduce((s, [, n]) => s + n, 0), i = 0;
        while (i < pool.length - 1 && (r -= pool[i][1]) > 0) i++;
        winners.push(this.store.get(pool[i][0])!); pool.splice(i, 1);
      }
      for (const p of winners) {
        p.arts[this.treasureArt] = (p.arts[this.treasureArt] || 0) + 1;
        const lv = artifactLevel(p.arts[this.treasureArt] || 0);
        this.fx({ k: 'treasure', ev: 'win', id: p.id, name: p.name, art: this.treasureArt, lv });
        this.store.dirty = true;
      }
      if (winners.length) this.say(`${winners.map(p => spokenName(p.name)).join(', ')} đoạt được ${artifactByKey.get(this.treasureArt)!.name}!`, true);
      this.treasureIn.clear();
    }
    this.combat.clear();
    void now;
  }
  private rewardBoss() {
    const def = this.boss.def!, top = this.boss.top(3);
    const total = [...this.boss.dmgBy.values()].reduce((s, v) => s + v, 0) || 1;
    // mọi người góp sức: +1 kỳ; top 3 sát thương: +2 kỳ; người kết liễu: +3 kỳ; người lập công được tính để lên bậc ngoại hình VIP
    const topIds = top.map(t => t[0]);
    for (const [id, v] of this.boss.dmgBy) {
      const p = this.store.get(id); if (!p) continue;
      p.bossFights = (p.bossFights || 0) + 1;
      const isKiller = id === this.boss.killer, isTop = topIds.includes(id);
      if (isKiller || isTop) p.bossTop = (p.bossTop || 0) + 1;
      this.levelUp(p, isKiller ? 3 : isTop ? 2 : 1, isKiller ? 'kết liễu ' + def.name : isTop ? 'top sát thương ' + def.name : 'đánh bại ' + def.name);
      this.addTuvi(p, needTuvi(p.lv) * 0.5 * v / total);
    }
    const lootTo = [this.boss.killer, ...top.map(t => t[0])].filter((id, i, a) => id && a.indexOf(id) === i && this.store.get(id)).slice(0, 3);
    lootTo.forEach((id, i) => {
      const p = this.store.get(id)!, art = ARTIFACTS[Math.floor(Math.random() * ARTIFACTS.length)].key;
      p.arts[art] = (p.arts[art] || 0) + (i === 0 ? 2 : 1);
      this.fx({ k: 'artifact', id, name: p.name, art, lv: artifactLevel(p.arts[art] || 0), loot: true });
    });
    const killer = this.store.get(this.boss.killer);
    if (killer) killer.kills++;
    this.store.dirty = true; this.ranks.invalidate();
    this.say(`${def.name} đã bị tiêu diệt!${killer ? ` ${spokenName(killer.name)} tung đòn kết liễu!` : ''}`, true);
  }
  private finishFight() {
    const fs = [...this.combat.fighters.values()];
    if (!fs.length) return;
    const score = (t: number) => fs.filter(f => f.team === t).reduce((s, f) => s + (f.down ? 0 : f.hp / f.mhp) + 0.0001 * f.dealt / Math.max(1, f.atk), 0);
    const alive0 = fs.some(f => f.team === 0 && !f.down), alive1 = fs.some(f => f.team === 1 && !f.down);
    const win = alive0 && !alive1 ? 0 : alive1 && !alive0 ? 1 : score(0) >= score(1) ? 0 : 1;
    const winners = fs.filter(f => f.team === win), losers = fs.filter(f => f.team !== win);
    const loseLv = this.avgLv(losers.map(f => this.who(f.id)!).filter(Boolean));
    for (const f of winners) {
      const p = this.store.get(f.id); if (!p) continue;
      const pts = 10 + Math.max(0, Math.round((loseLv - p.lv) * 2));
      p.pkW++; p.pkPts += pts; this.levelUp(p, 1, this.mode === 'sect' ? 'tông môn đại thắng' : 'thắng PK');
      this.fx({ k: 'pkwin', id: p.id, name: p.name, loser: losers.map(l => l.name).join(', '), pts, side: win });
    }
    for (const f of losers) { const p = this.store.get(f.id); if (p) { p.pkL++; p.pkPts = Math.max(0, p.pkPts - 3); this.addTuvi(p, needTuvi(p.lv) * 0.08); } }
    if (this.mode === 'sect') {
      const key = this.sectPair[win];
      if (key) { this.ranks.sectWins[key] = (this.ranks.sectWins[key] || 0) + 1; this.fx({ k: 'pkwin', id: key, name: sectByKey.get(key)!.name, loser: sectByKey.get(this.sectPair[1 - win])?.name ?? '', pts: 1, side: win }); this.say(`${sectByKey.get(key)!.name} toàn thắng!`, true); }
    } else if (winners[0]) this.say(`${winners.map(f => spokenName(f.name)).join(', ')} giành chiến thắng!`, true);
    this.store.dirty = true; this.ranks.invalidate();
  }
  private onDown(victim: Fighter, by: Fighter | null) {
    if (victim.isBoss) { this.boss.onDown(by); this.modeEnd = Math.min(this.modeEnd, this.nowMs + 9000); return; }
    if (this.mode === 'sect' && by) { const s = this.sides[by.team]; if (s) s.score++; }
  }
  force(mode: Mode | 'next') { this.forced = mode === 'next' ? ROTATION[this.rot % ROTATION.length] : mode; }

  /* ---------------------------------------------------------- vòng lặp */
  tick(dt: number, now: number) {
    this.nowMs = now;
    // tự tu luyện mỗi giây cho người đang có mặt
    if (now - this.lastSecond >= 1000) {
      this.lastSecond = now;
      for (const p of this.activePlayers()) this.addTuvi(p, this.cult.autoRate(p));
    }
    this.combat.tick(dt, now);
    if (this.mode === 'boss') this.boss.tick(now);
    if (this.sides.length) for (let t = 0; t < this.sides.length; t++) this.sides[t].alive = this.combat.alive(t);
    // hết giờ, hết người, hoặc được gọi chế độ khác
    let over = now >= this.modeEnd;
    if ((this.mode === 'pk1' || this.mode === 'pk3' || this.mode === 'sect') && (this.combat.alive(0) === 0 || this.combat.alive(1) === 0)) { over = true; }
    if (this.forced) { const m = this.forced; this.forced = null; this.start(m, now); return; }
    if (over) {
      if (this.mode === 'tuluyen') { const m = ROTATION[this.rot++ % ROTATION.length]; this.start(m, now); }
      else { this.endMode(now); this.mode = 'tuluyen'; this.modeEnd = now + DUR.tuluyen; this.sides = []; this.fx({ k: 'mode', mode: 'tuluyen', title: TITLES.tuluyen }); }
    }
  }

  /* ---------------------------------------------------------- gửi màn hình */
  // vị trí tu luyện / đứng xem: vòng tròn đồng tâm quanh sân, người chiến lực cao ngồi gần trung tâm
  private seats = new Map<string, { x: number; z: number }>();
  posOf(id: string) { return this.combat.fighters.get(id) ?? this.seats.get(id) ?? { x: 0, z: 14 }; }
  cults(): CultPub[] {
    const out: CultPub[] = [];
    const artStr = (p: Player) => Object.entries(this.store.artLevels(p)).map(([k, v]) => `${k}:${v}`).join(',');
    for (const f of this.combat.fighters.values()) {
      if (f.isBoss) continue;
      const p = this.who(f.id); if (!p) continue;
      out.push({ id: p.id, name: p.name, av: p.avatar, a: p.a, lv: p.lv, sect: p.sect, arts: artStr(p), pw: statsOf(p.lv, this.store.cls(p), this.store.artLevels(p)).power,
        hp: Math.round(f.hp), mhp: Math.round(f.mhp), x: +f.x.toFixed(2), z: +f.z.toFixed(2), ry: +f.ry.toFixed(2), p: f.pose, side: f.team, npc: f.npc, sh: f.shieldUntil > Date.now() ? 1 : 0, vip: p.vip || 0 });
    }
    // người đang có mặt mà không đánh: ngồi thiền quanh sân
    const idle = this.activePlayers().filter(p => !this.combat.fighters.has(p.id)).sort((a, b) => b.lv - a.lv).slice(0, this.mode === 'tuluyen' ? 60 : 40);
    const extra = this.mode === 'tuluyen' && idle.length < this.npcCount ? Array.from({ length: this.npcCount - idle.length }, (_, i) => this.npc(i, this.avgLv(idle))) : [];
    const list = [...idle, ...extra];
    const r0 = this.mode === 'tuluyen' ? 12 : 28;
    this.seats.clear();
    list.forEach((p, i) => {
      const ring = Math.floor(Math.sqrt(i / 3)), inRing = i - 3 * ring * ring, per = 6 * ring + 3;
      const ang = (inRing / per) * Math.PI * 2 + ring * 0.6, r = r0 + ring * (this.mode === 'tuluyen' ? 6.5 : 6);
      const x = Math.sin(ang) * r, z = Math.cos(ang) * r;
      this.seats.set(p.id, { x, z });
      const s = statsOf(p.lv, this.store.cls(p), this.store.artLevels(p));
      out.push({ id: p.id, name: p.name, av: p.avatar, a: p.a, lv: p.lv, sect: p.sect, arts: artStr(p), pw: s.power, hp: s.hp, mhp: s.hp,
        x: +x.toFixed(2), z: +z.toFixed(2), ry: +Math.atan2(-x, -z).toFixed(2), p: 'med', side: -1, npc: p.id.startsWith('npc:'), sh: 0, vip: p.vip || 0 });
    });
    return out;
  }
  modeState(now: number): ModeState {
    const next = this.mode === 'tuluyen' ? TITLES[ROTATION[this.rot % ROTATION.length]] : TITLES.tuluyen;
    return { mode: this.mode, title: this.title(), leftMs: Math.max(0, this.modeEnd - now), round: this.round, sides: this.sides, next };
  }
  boards() { return this.ranks.boards(this.boss.top(5), id => { const p = this.who(id); return { name: p?.name ?? id, av: p?.avatar ?? '' }; }); }
  removeSim() { this.store.removeSim(); for (const id of [...this.active.keys()]) if (id.startsWith('sim:')) this.active.delete(id); this.ranks.invalidate(); }
  describe(id: string) { const p = this.store.get(id); return p ? `${p.name}: ${realmName(p.lv)}` : ''; }
}
