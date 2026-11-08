// Điều phối game: nhận sự kiện đã chuẩn hóa từ connector, cập nhật khách, ghế, đơn hàng và báo cho màn hình.
// Tệp này không biết gì về TikTok. Đổi thư viện kết nối chỉ cần viết adapter mới phát ra cùng dạng sự kiện.
import { Players } from './Players.mjs';
import { Seating } from './Seating.mjs';
import { Kitchen } from './Kitchen.mjs';
import { Gifts } from './Gifts.mjs';
import { EventQueue } from './EventQueue.mjs';
import { Monthly } from './Monthly.mjs';
import { Looks } from './Looks.mjs';
import { clean } from '../storage/Storage.mjs';
import { MENU, itemById, defaultItemFor, parseOrderCommand, parseLookCommand, parseTableCommand, vipOf } from '../../shared/menu.mjs';
import { SEAT_BY_ID, TABLE_BY_NO, seatsAt, ZONES } from '../../shared/layout.mjs';

const QUIET_LEAVE_MS = 5 * 60_000;
// Khách vãng lai: quán vắng quá 20 giây thì người lạ lần lượt ra vào (tối đa 3 người, cứ 6 đến 18 giây một người, ngồi 30 đến
// 70 giây) để màn hình live luôn có chuyển động. Họ không có tên, không có hồ sơ, không xu, không bình luận, không gọi món,
// không lên bảng VIP, và rời đi ngay khi có người xem thật vào. Đây là cảnh nền, không giả làm người xem.
const AMBIENT_IDLE_MS = 20_000, AMBIENT_MAX = 3;
const AMBIENT_STAY = [30_000, 70_000], AMBIENT_ARRIVE = [6_000, 18_000];
const between = ([a, b]) => a + Math.random() * (b - a);
// Khách VIP (cấp 5 trở lên) hoặc top 10 tháng được đón long trọng khi vào quán, mỗi người tối đa một lần trong 20 phút.
const GRAND_LEVEL = 5, GRAND_GAP_MS = 20 * 60_000;
// Người xem có cấp TikTok từ mức này (đặt bằng biến TIKTOK_VIP_LEVEL) được mời vào quán ngay khi vào phòng và đón long trọng.
const TIKTOK_VIP_LEVEL = +process.env.TIKTOK_VIP_LEVEL || 20;
const COMMENT_POINT_GAP = 60_000, LIKE_POINT_GAP = 60_000, SHARE_POINT_GAP = 5 * 60_000;
const SWEAR = new Set(['đm', 'dm', 'đcm', 'dcm', 'đmm', 'dmm', 'đkm', 'dkm', 'đéo', 'địt', 'đụ', 'lồn', 'cặc', 'buồi', 'đĩ', 'clm', 'clgt', 'vcl', 'vkl', 'vl', 'cmm', 'ccc', 'fuck', 'shit']);

// Bình luận hiện trên màn hình live nên ẩn đường dẫn, số điện thoại và từ tục.
export function displayableChat(text) {
  const raw = clean(text, 80);
  if (!raw || /https?:|www\.|\.(com|net|vn|me|io)\b/i.test(raw) || /\d[\d\s.-]{6,}\d/.test(raw)) return '';
  if (raw.toLowerCase().split(/[^\p{L}\p{N}]+/u).some(w => SWEAR.has(w))) return '';
  return raw;
}

export class Game {
  constructor({ storage, broadcast = () => {}, log = () => {}, groupWindowMs }) {
    Object.assign(this, { storage, broadcast, log });
    this.players = new Players(storage).load();
    this.monthly = new Monthly(storage.dir, { log });
    this.looks = new Looks(storage.dir, { log });
    this.monthSavedAt = 0;
    this.grandAt = new Map();      // TikTokID -> lần cuối được đón long trọng
    this.seating = new Seating();
    this.active = new Map();       // TikTokID -> { nick, lastAt, seated, pick, ... }: khách đang ở trong phòng
    this.soldOut = new Map();      // món giới hạn đã bán trong phiên này
    this.favorites = new Map();
    this.sales = 0;
    this.npcs = new Map();         // khách vãng lai: id -> { seatId, leaveAt }
    this.npcSeq = 0;
    this.npcNextAt = 0;
    this.emptySince = Date.now();
    this.kitchen = new Kitchen({ storage, onChange: o => { this.rankDirty = true; this.broadcast({ t: 'order', order: this.pubOrder(o) }); }, onServed: o => this.onServed(o) });
    this.gifts = new Gifts({ storage, windowMs: groupWindowMs, onCredit: (p, coins, e) => this.onCredit(p, coins, e), onBatch: (p, b) => this.onBatch(p, b) });
    this.queue = new EventQueue(e => this.handle(e), { onError: (err, e) => this.log(`Lỗi xử lý sự kiện ${e?.type}: ${err.message}`) });
    this.favorites = this.kitchen.restore(storage.readAll('orders.txt'));
    this.gifts.restore(storage.tail('gift_logs.txt'));
    // Ghế là trạng thái phiên chạy; khách quay lại mới được cấp, SeatID trong tệp chỉ dùng để ưu tiên chỗ cũ.
    for (const o of this.kitchen.orders.values()) {
      const p = this.players.byId.get(o.pid);
      if (p) this.activate(p, { nick: o.name, quiet: true });
    }
    this.lastRankAt = 0;
    this.rankDirty = false;
  }

  /* ------------------------------------------------------- khách vãng lai */
  ambientTick(now = Date.now(), on = true) {
    for (const [id, n] of this.npcs) if (now >= n.leaveAt || !on) this.npcLeave(id);
    if (!on || this.active.size || now - this.emptySince < AMBIENT_IDLE_MS || now < this.npcNextAt || this.npcs.size >= AMBIENT_MAX) return;
    const seat = this.seating.findFree(3, '');
    if (!seat) return;
    const id = `npc_${++this.npcSeq}`;
    this.seating.take(seat.id, id);
    this.npcs.set(id, { seatId: seat.id, leaveAt: now + between(AMBIENT_STAY) });
    this.npcNextAt = now + between(AMBIENT_ARRIVE);
    this.broadcast({ t: 'join', p: this.pubNpc(id) });
  }
  pubNpc(id) { return { id, name: 'Khách vãng lai', username: '', level: 1, points: 0, coins: 0, seat: this.npcs.get(id).seatId, favorite: '', npc: true }; }
  npcLeave(id) {
    const n = this.npcs.get(id);
    if (!n) return;
    this.seating.release(n.seatId);
    this.npcs.delete(id);
    this.broadcast({ t: 'leave', id });
  }
  clearNpcs() { for (const id of [...this.npcs.keys()]) this.npcLeave(id); }

  push(event) { this.queue.push(event); }

  handle(e) {
    if (!e?.id && !e?.username) return;
    switch (e.type) {
      case 'join': return this.onJoin(e);
      case 'comment': return this.onComment(e);
      case 'gift': return this.onGift(e);
      case 'like': return this.onLike(e);
      case 'share': return this.onShare(e);
    }
  }

  /* ---------------------------------------------------- khách vào, ra, ghế */
  pub(p) {
    const a = this.active.get(p.id);
    return { id: p.id, name: a?.nick || p.username, username: p.username, level: p.level, points: p.points, coins: p.coins, seat: p.seatId, favorite: p.favorite, rank: this.monthly.rankOf(p.id), look: this.looks.get(p.id) };
  }
  pubOrder(o) {
    return { id: o.id, pid: o.pid, name: o.name, itemId: o.itemId, qty: o.qty, coins: o.coins, status: o.status, ms: o.durationMs || 0, baristaId: o.baristaId, waiterId: o.waiterId, seat: this.players.byId.get(o.pid)?.seatId || '' };
  }

  arrive(e) {
    const made = this.players.ensure(e.id, e.username);
    if (!made) return null;
    const { player, isNew } = made;
    const nick = clean(e.nickname, 24);
    const a = this.active.get(player.id);
    const tt = +e.tiktokLevel || 0;
    if (a) { a.lastAt = Date.now(); if (nick) a.nick = nick; if (tt > (a.tt || 0)) a.tt = tt; return { player, isNew: false, arrived: false }; }
    this.activate(player, { nick });
    this.active.get(player.id).tt = tt;
    this.logEvent(isNew ? 'new' : 'return', player, isNew ? 'khách mới' : 'quay lại');
    const name = nick || player.username, rank = this.monthly.rankOf(player.id), now = Date.now();
    if ((rank || player.level >= GRAND_LEVEL || tt >= TIKTOK_VIP_LEVEL) && now - (this.grandAt.get(player.id) || 0) > GRAND_GAP_MS) {
      this.grandAt.set(player.id, now);
      if (tt >= TIKTOK_VIP_LEVEL) this.log(`Chào khách cấp ${tt} TikTok: ${name}`);
      this.broadcast({ t: 'event', kind: 'grand', id: player.id, name, level: player.level, rank, tt: tt >= TIKTOK_VIP_LEVEL ? tt : 0 });
    } else this.broadcast({ t: 'event', kind: isNew ? 'new' : 'return', name, level: player.level });
    return { player, isNew, arrived: true };
  }

  activate(p, { nick = '', quiet = false }) {
    if (this.active.has(p.id)) return;
    this.clearNpcs();          // người xem thật vào thì khách vãng lai nhường chỗ ngay
    this.active.set(p.id, { nick, lastAt: Date.now(), seated: false, pointAt: {}, pick: null });
    this.assignSeat(p, { quiet });
    this.rankDirty = true;     // số khách trên thanh trên cùng đi chung nhịp với bảng VIP
  }

  // Trả về true nếu có ghế. Chưa có ghế thì khách vào hàng chờ, tới khi có người về sẽ được mời vào.
  assignSeat(p, { quiet = false } = {}) {
    const a = this.active.get(p.id);
    const seat = this.seating.findFree(p.level, p.seatId);
    if (!seat) { a.seated = false; if (p.seatId) { p.seatId = ''; this.players.save(p); } return false; }
    this.seating.take(seat.id, p.id);
    p.seatId = seat.id;
    a.seated = true;
    this.players.save(p);
    this.broadcast({ t: 'join', p: this.pub(p), quiet });
    return true;
  }

  // Khách có quà mà quán kín thì mời người im lặng lâu nhất, chưa có đơn và cấp không cao hơn nhường chỗ.
  makeRoomFor(p) {
    let quietest = null;
    for (const [id, a] of this.active) {
      if (id === p.id || !a.seated) continue;
      const other = this.players.byId.get(id);
      if (other.level > p.level || this.kitchen.hasPending(id) || this.gifts.isPending(id)) continue;
      if (!quietest || a.lastAt < quietest.a.lastAt) quietest = { other, a };
    }
    if (!quietest) return false;
    this.unseat(quietest.other);
    return this.assignSeat(p);
  }
  unseat(p) {
    const a = this.active.get(p.id);
    if (p.seatId) this.seating.release(p.seatId);
    if (a) a.seated = false;
    this.broadcast({ t: 'leave', id: p.id });
  }
  leave(p, why) {
    if (!this.active.has(p.id)) return;
    this.unseat(p);
    this.active.delete(p.id);
    if (!this.active.size) this.emptySince = Date.now();
    this.rankDirty = true;
    this.logEvent('leave', p, why);
  }

  fillEmptySeats() {
    if (this.seating.used >= SEAT_BY_ID.size) return;
    const waiting = [...this.active.entries()].filter(([, a]) => !a.seated).map(([id, a]) => ({ p: this.players.byId.get(id), a })).sort((x, y) => y.p.level - x.p.level || y.a.lastAt - x.a.lastAt);
    for (const { p } of waiting) if (!this.assignSeat(p)) break;
  }

  // TikTok không báo từng người rời phòng nên suy ra từ thời gian im lặng. Khách còn đơn chưa nhận thì không bị mời về.
  sweepQuiet(now = Date.now()) {
    for (const [id, a] of this.active) {
      const p = this.players.byId.get(id);
      const limit = p.coins > 0 ? QUIET_LEAVE_MS * 2 : QUIET_LEAVE_MS;
      if (now - a.lastAt > limit && !this.kitchen.hasPending(id) && !this.gifts.isPending(id)) this.leave(p, 'lâu không tương tác');
    }
    this.fillEmptySeats();
  }
  shiftQuietClock(gapMs) { for (const a of this.active.values()) a.lastAt += gapMs; }
  everyoneLeaves(why) {
    for (const id of [...this.active.keys()]) {
      if (!this.kitchen.hasPending(id) && !this.gifts.isPending(id)) this.leave(this.players.byId.get(id), why);
    }
  }

  /* ----------------------------------------------------------- sự kiện LIVE */
  // Chỉ vào phòng thì chưa thành khách: TikTok báo cả người lướt qua và app thường ẩn lượt vào, nên quán sẽ kín người
  // mà chủ live không thấy ai. Bình luận, thả tim hoặc tặng quà mới được mời vào quán.
  // Riêng người có cấp TikTok cao thì vào phòng là được mời vào quán và chào ngay.
  onJoin(e) { if (+e.tiktokLevel >= TIKTOK_VIP_LEVEL) this.arrive(e); }

  // Chia sẻ chỉ tính cho người đã ngồi trong quán, không tự mời người mới vào.
  present(e) {
    const p = this.players.byId.get(clean(e.id, 40)) || this.players.byName.get((clean(e.username, 32) || '').toLowerCase());
    return p && this.active.has(p.id) ? this.arrive(e) : null;
  }

  smallReward(p, a, key, gap, points) {
    const now = Date.now();
    if (now - (a.pointAt[key] || 0) < gap) return;
    a.pointAt[key] = now;
    if (this.addPoints(p, points)) this.levelUp(p);
    this.rankDirty = true;
  }

  onComment(e) {
    const made = this.arrive(e);
    if (!made) return;
    const p = made.player, a = this.active.get(p.id);
    if (!a.seated) this.makeRoomFor(p);
    this.smallReward(p, a, 'comment', COMMENT_POINT_GAP, 1);
    const item = parseOrderCommand(e.text);
    if (item) {
      a.pick = item.id;
      this.broadcast({ t: 'event', kind: 'pick', name: a.nick || p.username, level: p.level, item: item.id });
      this.logEvent('pick', p, item.name);
      return;
    }
    const tableNo = parseTableCommand(e.text);
    if (tableNo) return this.chooseTable(p, tableNo);
    const look = parseLookCommand(e.text);
    if (look) {
      this.broadcast({ t: 'look', id: p.id, look: this.looks.set(p.id, look) });
      this.logEvent('look', p, clean(e.text, 20));
      return;
    }
    const text = displayableChat(e.text);
    if (text) this.broadcast({ t: 'chat', id: p.id, name: a.nick || p.username, text });
    this.logEvent('comment', p, clean(e.text, 80));
  }

  // Bình luận "bàn 5": sang ghế trống ở bàn 5 để ngồi cùng bạn. Bàn khu VIP chỉ dành cho khách đủ cấp.
  chooseTable(p, no) {
    const a = this.active.get(p.id), table = TABLE_BY_NO.get(no), name = a?.nick || p.username;
    const say = (kind, extra = {}) => this.broadcast({ t: 'event', kind, name, level: p.level, table: no, ...extra });
    if (!table) return say('tableNone');
    if (!this.seating.allowed(seatsAt(no)[0], p.level)) return say('tableVip', { zone: ZONES[table.zone] });
    if (SEAT_BY_ID.get(p.seatId)?.table.no === no && a.seated) return;
    const seat = seatsAt(no).find(s => this.seating.isFree(s.id));
    if (!seat) return say('tableFull');
    if (a.seated && p.seatId) this.seating.release(p.seatId);
    this.seating.take(seat.id, p.id);
    p.seatId = seat.id;
    this.players.save(p);
    if (a.seated) this.broadcast({ t: 'move', id: p.id, seat: seat.id, level: p.level });
    else { a.seated = true; this.broadcast({ t: 'join', p: this.pub(p), quiet: false }); }
    const mate = seatsAt(no).map(s => this.seating.occupant.get(s.id)).find(id => id && id !== p.id);
    say('table', { mate: mate ? this.active.get(mate)?.nick || this.players.byId.get(mate)?.username : '' });
    this.logEvent('table', p, `bàn ${no}`);
  }

  onLike(e) {
    const made = this.arrive(e);
    if (!made) return;
    this.smallReward(made.player, this.active.get(made.player.id), 'like', LIKE_POINT_GAP, 1);
    this.broadcast({ t: 'like', id: made.player.id, n: Math.min(30, +e.count || 1) });
  }
  onShare(e) {
    const made = this.present(e);
    if (!made) return;
    this.smallReward(made.player, this.active.get(made.player.id), 'share', SHARE_POINT_GAP, 2);
    this.broadcast({ t: 'event', kind: 'share', name: this.active.get(made.player.id).nick || made.player.username, level: made.player.level });
    this.logEvent('share', made.player, '');
  }

  onGift(e) {
    const made = this.arrive(e);
    if (!made) return;
    const p = made.player;
    this.gifts.handle(e, p);
    const a = this.active.get(p.id);
    a.lastAt = Date.now();
    if (!a.seated) this.makeRoomFor(p);
  }

  // Điểm VIP trọn đời và điểm top tháng luôn cộng cùng lúc. Trả về true khi vừa lên cấp.
  addPoints(p, points, coins = 0) {
    this.monthly.add(p, this.active.get(p.id)?.nick, points, coins);
    return this.players.addPoints(p, points, coins);
  }

  onCredit(p, coins, e) {
    this.sales += coins;
    if (this.addPoints(p, coins, coins)) this.levelUp(p);
    this.rankDirty = true;
    this.logEvent('gift', p, `${clean(e.giftName, 40)} ${coins} xu`);
  }

  levelUp(p) {
    const vip = vipOf(p.level), a = this.active.get(p.id);
    this.broadcast({ t: 'levelup', id: p.id, name: a?.nick || p.username, level: p.level, title: vip.title });
    this.logEvent('levelup', p, vip.title);
    // Lên cấp thì mời sang khu tương ứng nếu còn chỗ, không có chỗ thì ngồi yên chỗ cũ.
    if (a?.seated) {
      const current = SEAT_BY_ID.get(p.seatId), next = this.seating.findFree(p.level, '');
      if (next && next.zone === p.level && current.zone !== p.level) {
        this.seating.release(current.id);
        this.seating.take(next.id, p.id);
        p.seatId = next.id;
        this.players.save(p);
        this.broadcast({ t: 'move', id: p.id, seat: next.id, level: p.level });
      } else this.broadcast({ t: 'restyle', id: p.id, level: p.level });
    }
  }

  // Hết cửa sổ gom: tạo đúng một đơn cho toàn bộ xu vừa nhận.
  onBatch(p, batch) {
    const a = this.active.get(p.id);
    const soldOut = x => x.limit && (this.soldOut.get(x.id) || 0) >= x.limit;
    let item = a?.pick ? itemById(a.pick) : null;
    if (item && (item.coins > batch.coins || soldOut(item))) item = null;
    else if (item) a.pick = null;
    item ||= defaultItemFor(batch.coins, soldOut);
    if (item.limit) this.soldOut.set(item.id, (this.soldOut.get(item.id) || 0) + 1);
    const order = this.kitchen.create({ pid: p.id, name: a?.nick || p.username, item, qty: 1, coins: batch.coins });
    this.broadcast({ t: 'gift', id: p.id, name: order.name, level: p.level, coins: batch.coins, itemId: item.id, orderId: order.id });
    this.remember(p, item);
  }

  remember(p, item) {
    const counts = this.favorites.get(p.id) || new Map();
    counts.set(item.name, (counts.get(item.name) || 0) + 1);
    this.favorites.set(p.id, counts);
    let best = '', most = 0;
    for (const [name, n] of counts) if (n > most) { best = name; most = n; }
    if (best !== p.favorite) { p.favorite = best; this.players.save(p); }
  }

  onServed(o) {
    const item = itemById(o.itemId), p = this.players.byId.get(o.pid);
    if (p) this.logEvent('served', p, item.name);
    if (item.party) this.broadcast({ t: 'party', kind: item.party, id: o.pid, name: o.name, itemId: item.id, zone: SEAT_BY_ID.get(p?.seatId)?.zone ?? 0 });
  }

  logEvent(kind, p, text) {
    this.storage.append('events', [new Date().toISOString(), kind, p.id, p.username, clean(text, 90)].join('|'));
  }

  /* ---------------------------------------------------------- nhịp đồng hồ */
  tick(now = Date.now()) {
    this.kitchen.tick(now);
    if (now - this.monthSavedAt > 5000) {
      this.monthSavedAt = now;
      if (this.monthly.rollover()) this.rankDirty = true;
      this.monthly.save();
      this.looks.save();
    }
    if (this.rankDirty && now - this.lastRankAt > 1000) {
      this.rankDirty = false;
      this.lastRankAt = now;
      this.broadcast({ t: 'rank', top: this.topList(), month: this.monthList(), stats: this.stats() });
    }
  }
  topList() { return this.players.top(8).map(p => ({ id: p.id, name: this.active.get(p.id)?.nick || p.username, level: p.level, points: p.points })); }
  monthList() {
    const [y, m] = this.monthly.month.split('-');
    return { label: `${+m}/${y}`, top: this.monthly.top().map(r => {
      const p = this.players.byId.get(r.id);
      return { id: r.id, name: this.active.get(r.id)?.nick || r.name, level: p?.level || 1, points: r.points, coins: r.coins };
    }) };
  }
  stats() { return { total: this.players.count, inRoom: this.active.size, seated: this.seating.used - this.npcs.size, sales: this.sales, queued: this.kitchen.queued }; }
  snapshot() {
    const seated = [...this.active.entries()].filter(([, a]) => a.seated).map(([id]) => this.pub(this.players.byId.get(id)));
    for (const id of this.npcs.keys()) seated.push(this.pubNpc(id));
    return { players: seated, orders: this.kitchen.active().map(o => this.pubOrder(o)), top: this.topList(), month: this.monthList(), stats: this.stats(), menuSize: MENU.length };
  }
  shutdown() {
    this.queue.drainAll();
    this.gifts.releaseAll(id => this.players.byId.get(id));
    this.monthly.save();
    this.looks.save();
  }
}
