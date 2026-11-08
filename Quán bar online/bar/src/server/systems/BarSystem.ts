import { BAR, GLAM_XU, barGiftFor, drinkOf } from '../../shared/bar.ts';
import type { DrinkKey } from '../../shared/bar.ts';
import { DANCES, danceByNo, parseDance } from '../../shared/dances.ts';
import type { BarBattle, BarFx, BarGuest, BarOrder, BarShow, BarState, Gender } from '../../shared/types.ts';

// Quán Bar Online: khách là người xem thật trong live. Bình luận, thả tim là vào quán nhảy (quán không nhận gọi đồ uống)
// (miễn phí, mỗi người 45 giây một ly); tặng quà thì ly được pha trước và mở màn hiệu ứng theo mức xu.
// Hai bartender pha song song: chờ → đang pha (lắc, rót) → phục vụ bê ra → khách cầm ly.
// Màn diễn lớn (laser, CO2, VIP, DJ show) chiếm sân khấu một lúc; tặng dồn thì xếp hàng, quà lớn hơn diễn trước.

interface Guest extends BarGuest { seen: number; lastFree: number; pref: DrinkKey | '' }
interface Order extends BarOrder { until: number }
interface Show extends BarShow { until: number }
const BARTENDERS = 2;
// Dance Battle: giới thiệu 4 giây, mỗi lượt nhảy 8 giây (luân phiên), 2 vòng, người thắng nhảy mừng 8 giây
export const BATTLE = { introMs: 4_000, turnMs: 8_000, rounds: 2, victoryMs: 8_000, maxPerformers: 3, cheerPts: 2, likesPerPt: 5, xuPts: 3, danceCooldownMs: 4_000 };
export const HOUSE_DANCER = { id: 'house', name: 'Vũ công Bar Online' };
interface Battle extends Omit<BarBattle, 'leftMs'> { until: number; used: Set<number> }

export class BarSystem {
  dirty = true;
  served = 0;
  private guests = new Map<string, Guest>();
  private orders: Order[] = [];
  private show: Show | null = null;
  private next: BarShow[] = [];
  private n = 0;
  private battle: Battle | null = null;
  private battleN = 0;
  private danceAt = new Map<string, number>();
  private emit: (f: BarFx) => void;
  private rng: () => number;

  constructor(emit: (f: BarFx) => void, rng: () => number = Math.random){ this.emit = emit; this.rng = rng; }
  // bảng xếp hạng quà tháng (BarCore gắn vào): chọn đối thủ cho màn đối đầu 99 xu
  rank: () => { id: string; name: string }[] = () => [];

  get size(){ return this.guests.size; }
  guest(id: string): BarGuest | undefined { return this.guests.get(id); }

  // Vào quán (hay nhắc là vẫn còn ở đây). Quán đầy thì người im lâu nhất (không phải VIP) ra về nhường chỗ.
  seat(id: string, name: string, gender: Gender, t: number){
    let g = this.guests.get(id);
    if (g){ g.seen = t; if (g.name !== name || g.gender !== gender){ g.name = name; g.gender = gender; this.dirty = true; } return g; }
    if (this.guests.size >= BAR.maxGuests){
      const out = [...this.guests.values()].filter(x => !x.vip).sort((a, b) => a.seen - b.seen)[0] ?? [...this.guests.values()].sort((a, b) => a.seen - b.seen)[0];
      if (out) this.drop(out, `${out.name} ra về nhường chỗ`);
    }
    g = { id, name, gender, xu: 0, vip: false, drink: '', seen: t, lastFree: -Infinity, pref: '' };
    this.guests.set(id, g);
    this.dirty = true;
    this.emit({ k: 'bar', ev: 'arrive', id, name, text: `🚪 ${name} vào quán` });
    return g;
  }

  setGender(id: string, gender: Gender){
    const g = this.guests.get(id);
    if (!g || g.gender === gender) return;
    g.gender = gender; this.dirty = true;
    this.emit({ k: 'bar', ev: 'gender', id, name: g.name, text: '' });
  }

  // Bình luận chọn điệu nhảy ("nhảy 12", "nhảy floss", "nhảy edm"). true nếu đã xử lý.
  comment(id: string, name: string, text: string, t: number): boolean {
    if (this.battle) this.cheer(1);
    const dn = parseDance(text);
    if (dn){
      if (t - (this.danceAt.get(id) ?? -Infinity) < BATTLE.danceCooldownMs) return true;
      this.danceAt.set(id, t);
      if (this.danceAt.size > 3000) this.danceAt.delete(this.danceAt.keys().next().value as string);
      const d = dn.dance ? danceByNo(dn.dance) : undefined;
      this.emit({ k: 'bar', ev: 'dance', id, name, dance: dn.dance, group: dn.group, text: `💃 ${name} nhảy ${d ? `#${d.no} ${d.name}` : (dn.group ?? '').toUpperCase()}` });
      return true;
    }
    // quán không nhận gọi đồ uống: bình luận khác là bình luận thường
    return false;
  }

  // Quà: cộng xu, có thể lên VIP, pha một ly (ưu tiên) và mở màn hiệu ứng theo mức. xu là tổng của lần tặng này.
  gift(id: string, name: string, xu: number, gift: string, count: number, t: number){
    const g = this.guests.get(id);
    if (!g) return;
    g.xu += xu; g.seen = t;
    if (!g.vip && g.xu >= BAR.vipXu){
      g.vip = true;
      this.emit({ k: 'bar', ev: 'vip', id, name, text: `👑 ${name} thành khách VIP, mời lên khu VIP` });
    }
    const tier = barGiftFor(xu);
    if (xu >= GLAM_XU && !g.glam) g.glam = true;          // đổi bộ đồ dạ tiệc lấp lánh, giữ suốt buổi
    this.emit({ k: 'bar', ev: 'gift', id, name, xu, show: tier.key, level: tier.level, gift, count, text: `🎁 ${name} tặng ${gift}${count > 1 ? ' x' + count : ''}: ${tier.icon} ${tier.label}` });
    if (tier.key === 'faceoff'){
      // đối thủ: top 2 quà tháng (chính mình là top 2 thì đấu top 1); không có hay không ở trong quán thì vũ công nhà Bar
      const r = this.rank(), pick = r[1] && r[1].id !== id ? r[1] : r[0] && r[0].id !== id ? r[0] : undefined;
      const vs = pick && this.guests.has(pick.id) ? pick : HOUSE_DANCER;
      this.queueShow({ key: tier.key, id, name, xu, ms: tier.ms, leftMs: tier.ms, vs: vs.id, vsName: vs.name }, t);
    }
    else if (tier.ms > 0) this.queueShow({ key: tier.key, id, name, xu, ms: tier.ms, leftMs: tier.ms }, t);
    // quà VIP (199–499 xu): mở Dance Battle; đang battle thì quà cộng năng lượng (cho chính người tặng nếu đang thi, không thì người đang nhảy)
    if (this.battle) this.battleGift(id, xu);
    else if (tier.level === 4) this.startBattle(id, name, t);
    this.dirty = true;
  }

  /* ---------------------------------------------------------- Dance Battle */
  get battleActive(){ return !!this.battle; }
  startBattle(id: string, name: string, t: number){
    if (this.battle) return false;
    // đối thủ: khách có mặt gần đây nhất (không phải người tặng); quán vắng thì vũ công nhà Bar ra đấu
    const others = [...this.guests.values()].filter(g => g.id !== id && t - g.seen < 120_000).sort((a, b) => b.seen - a.seen).slice(0, BATTLE.maxPerformers - 1);
    const performers = [{ id, name, energy: 0 }, ...others.map(g => ({ id: g.id, name: g.name, energy: 0 }))];
    if (performers.length < 2) performers.push({ id: HOUSE_DANCER.id, name: HOUSE_DANCER.name, energy: 0 });
    this.battle = { n: ++this.battleN, phase: 'intro', round: 1, rounds: BATTLE.rounds, turn: 0, dance: 0, performers, winner: '', by: id, until: t + BATTLE.introMs, used: new Set() };
    this.emit({ k: 'bar', ev: 'battle', phase: 'start', id, name, text: `⚔️ DANCE BATTLE: ${performers.map(p => p.name).join(' vs ')}` });
    this.dirty = true;
    return true;
  }
  // khán giả cổ vũ: bình luận, thả tim cộng năng lượng cho người đang nhảy
  cheer(points: number){ const b = this.battle; if (!b || b.phase !== 'perform') return; b.performers[b.turn].energy += points * BATTLE.cheerPts; this.dirty = true; }
  likes(count: number){ const b = this.battle; if (!b || b.phase !== 'perform') return; b.performers[b.turn].energy += Math.max(1, Math.round(count / BATTLE.likesPerPt)); this.dirty = true; }
  private battleGift(id: string, xu: number){
    const b = this.battle!, me = b.performers.find(p => p.id === id);
    const to = me ?? (b.phase === 'perform' ? b.performers[b.turn] : b.performers[0]);
    to.energy += xu * BATTLE.xuPts; this.dirty = true;
  }
  private nextTurn(t: number){
    const b = this.battle!;
    // điệu riêng cho lượt này: điệu sung (từ mức 3), chưa ai nhảy trong trận
    const pool = DANCES.filter(d => d.energy >= 3 && !b.used.has(d.no));
    const d = pool[Math.floor(this.rng() * pool.length)] ?? DANCES[0];
    b.used.add(d.no); b.dance = d.no; b.phase = 'perform'; b.until = t + BATTLE.turnMs;
    const p = b.performers[b.turn];
    p.energy += Math.round(d.energy * 4 + this.rng() * 10);       // điểm kỹ thuật của điệu
    this.emit({ k: 'bar', ev: 'battle', phase: 'turn', id: p.id, name: p.name, dance: d.no, text: `🕺 Vòng ${b.round}: ${p.name} nhảy ${d.name}` });
    this.dirty = true;
  }
  private tickBattle(t: number){
    const b = this.battle;
    if (!b || t < b.until) return;
    if (b.phase === 'intro'){ this.nextTurn(t); return; }
    if (b.phase === 'perform'){
      b.turn++;
      if (b.turn >= b.performers.length){ b.turn = 0; b.round++; }
      if (b.round <= b.rounds){ this.nextTurn(t); return; }
      // hết các vòng: ai nhiều năng lượng nhất thắng và nhảy Victory Dance
      const win = [...b.performers].sort((x, y) => y.energy - x.energy)[0];
      b.phase = 'victory'; b.winner = win.id; b.until = t + BATTLE.victoryMs; b.dance = DANCES.find(d => d.id === 'victory-dance')?.no ?? 91;
      b.turn = b.performers.indexOf(win);
      this.emit({ k: 'bar', ev: 'battle', phase: 'end', id: win.id, name: win.name, dance: b.dance, text: `🏆 ${win.name} thắng Dance Battle với ${win.energy} năng lượng!` });
      this.dirty = true;
      return;
    }
    this.battle = null; this.dirty = true;
  }

  private order(g: Guest, drink: DrinkKey, paid: boolean, t: number){
    const o: Order = { n: ++this.n, id: g.id, name: g.name, drink, status: 'queued', leftMs: 0, paid, until: 0 };
    this.orders.push(o);
    // hàng chờ dài quá: bỏ ly gọi miễn phí cũ nhất chưa pha
    const waiting = this.orders.filter(x => x.status === 'queued');
    if (waiting.length > BAR.queueMax){
      const drop = waiting.find(x => !x.paid) ?? waiting[0];
      this.orders.splice(this.orders.indexOf(drop), 1);
    }
    this.emit({ k: 'bar', ev: 'order', id: g.id, name: g.name, drink, n: o.n, paid, text: `${drinkOf(drink).icon} ${g.name} gọi ${drinkOf(drink).name}` });
    this.dirty = true;
    this.pump(t);
  }

  private queueShow(s: BarShow, t: number){
    if (!this.show){ this.startShow(s, t); return; }
    this.next.push(s);
    this.next.sort((a, b) => b.xu - a.xu);
    if (this.next.length > BAR.showQueue) this.next.length = BAR.showQueue;
  }
  private startShow(s: BarShow, t: number){
    this.show = { ...s, leftMs: s.ms, until: t + s.ms };
    this.emit({ k: 'bar', ev: 'show', id: s.id, name: s.name, show: s.key, xu: s.xu, text: s.vs ? `⚔️ ${s.name} đối đầu ${s.vsName}` : '', vs: s.vs, vsName: s.vsName });
    this.dirty = true;
  }

  // đưa ly chờ vào tay bartender rảnh: ly có quà trước, rồi tới ly gọi trước
  private pump(t: number){
    let busy = this.orders.filter(o => o.status === 'making').length;
    const queue = this.orders.filter(o => o.status === 'queued').sort((a, b) => Number(b.paid) - Number(a.paid) || a.n - b.n);
    for (const o of queue){
      if (busy >= BARTENDERS) break;
      o.status = 'making'; o.until = t + BAR.makeMs; busy++;
      this.emit({ k: 'bar', ev: 'make', id: o.id, name: o.name, drink: o.drink, n: o.n, text: '' });
      this.dirty = true;
    }
  }

  tick(t: number){
    for (const o of [...this.orders]){
      if (o.status === 'making' && t >= o.until){
        o.status = 'serving'; o.until = t + BAR.serveMs;
        this.emit({ k: 'bar', ev: 'serve', id: o.id, name: o.name, drink: o.drink, n: o.n, text: '' });
        this.dirty = true;
      } else if (o.status === 'serving' && t >= o.until){
        this.orders.splice(this.orders.indexOf(o), 1);
        const g = this.guests.get(o.id);
        if (g) g.drink = o.drink;
        this.served++;
        this.emit({ k: 'bar', ev: 'served', id: o.id, name: o.name, drink: o.drink, n: o.n, text: `${drinkOf(o.drink).icon} ${o.name} nhận ${drinkOf(o.drink).name}` });
        this.dirty = true;
      }
    }
    this.pump(t);
    this.tickBattle(t);
    if (this.show && t >= this.show.until){
      const s = this.show;
      this.show = null;
      this.emit({ k: 'bar', ev: 'showEnd', id: s.id, name: s.name, show: s.key, xu: s.xu, text: '', vs: s.vs, vsName: s.vsName });
      const nx = this.next.shift();
      if (nx) this.startShow(nx, t);
      this.dirty = true;
    }
    for (const g of [...this.guests.values()]) if (t - g.seen > BAR.leaveMs) this.drop(g, `👋 ${g.name} ra về`);
  }

  private drop(g: Guest, text: string){
    this.guests.delete(g.id);
    this.orders = this.orders.filter(o => o.id !== g.id || o.status !== 'queued');
    this.dirty = true;
    this.emit({ k: 'bar', ev: 'leave', id: g.id, name: g.name, text });
  }

  removeSim(isSim: (id: string) => boolean){ for (const g of [...this.guests.values()]) if (isSim(g.id)) this.drop(g, ''); }

  pub(t: number, hasAvatar: (id: string) => boolean): Omit<BarState, 'top' | 'month'> {
    const bt = this.battle;
    const battle: BarBattle | null = bt ? { n: bt.n, phase: bt.phase, round: Math.min(bt.round, bt.rounds), rounds: bt.rounds, turn: bt.turn, dance: bt.dance, leftMs: Math.max(0, bt.until - t),
      performers: bt.performers.map(p => ({ ...p, avatar: hasAvatar(p.id) })), winner: bt.winner, by: bt.by } : null;
    const show = this.show ? { key: this.show.key, id: this.show.id, name: this.show.name, xu: this.show.xu, ms: this.show.ms, leftMs: Math.max(0, this.show.until - t), vs: this.show.vs, vsName: this.show.vsName } : null;
    return {
      guests: [...this.guests.values()].map(g => ({ id: g.id, name: g.name, gender: g.gender, xu: g.xu, vip: g.vip, drink: g.drink, avatar: hasAvatar(g.id), glam: !!g.glam })),
      orders: this.orders.map(o => ({ n: o.n, id: o.id, name: o.name, drink: o.drink, status: o.status, paid: o.paid, leftMs: Math.max(0, o.until - t) })),
      served: this.served, show, next: this.next.map(s => ({ ...s })), battle,
    };
  }
}
