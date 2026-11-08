import { barGiftFor } from '../shared/bar.ts';
import { levelInfo, levelOf } from '../shared/levels.ts';
import type { BarState, Delta, Fx, Gender, LiveEvent, LiveStatus, Player, Settings, Snapshot, Stats } from '../shared/types.ts';
import type { Loaded, Storage } from './Storage.ts';
import { BarSystem } from './systems/BarSystem.ts';
import { MonthTop, monthOf } from './systems/MonthTop.ts';

// Lõi Quán Bar Online: nhận sự kiện đã qua hàng đợi (TikTok LIVE hay bảng thử), giữ tài khoản người xem, chạy quán
// (khách, hàng chờ đồ uống, màn diễn, Dance Battle), gom thay đổi để gửi xuống màn hình.
const ONLINE_MS = 10 * 60_000;            // 10 phút không có tương tác thì coi như đã rời live
const MAX_FX_PER_DELTA = 80;
const plain = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim();
// bình luận chọn nhân vật nam / nữ
export function parseGender(text: string): Gender | null {
  const s = plain(text);
  if (/^(nam|toi la nam|tui la nam|con trai|trai|male|boy)$/.test(s)) return 'nam';
  if (/^(nu|toi la nu|tui la nu|con gai|gai|female|girl)$/.test(s)) return 'nu';
  return null;
}

export interface CoreOptions { now?: () => number; rng?: () => number }

export class BarCore {
  readonly bar: BarSystem;
  readonly top: MonthTop;
  readonly players = new Map<string, Player>();
  readonly avatars = new Map<string, string>();      // ảnh đại diện TikTok mới nhất (chỉ trong bộ nhớ, link hết hạn sau vài ngày)
  live: LiveStatus = { status: 'idle', uniqueId: '', error: '', attempt: 0 };
  settings: Settings = { voice: true, readChat: true };
  stats: Stats = { queue: 0, dropped: 0, duplicates: 0, processed: 0, players: 0, online: 0, realOnline: 0, views: 0 };
  hideSimOnBoards = false;                           // đang live thật: bảng xếp hạng ẩn người thử (DEMO)
  barHook: ((f: Extract<Fx, { k: 'bar' }>) => void) | null = null;
  chatHook: ((id: string, name: string, text: string) => void) | null = null;   // bình luận thường để giọng đọc đọc lên

  private storage: Storage | null;
  private now: () => number;
  private rng: () => number;
  private fx: Fx[] = [];
  private liveDirty = true; private settingsDirty = false; private changed = false;

  constructor(storage: Storage | null, opts: CoreOptions = {}, loaded?: Loaded){
    this.storage = storage; this.now = opts.now ?? Date.now; this.rng = opts.rng ?? Math.random;
    const data = loaded ?? storage?.load() ?? { players: [], top: { month: '', rows: [] }, settings: {}, giftIds: [] };
    for (const p of data.players) this.players.set(p.id, p);
    const t = this.now();
    this.top = new MonthTop(data.top.month || monthOf(t), data.top.month === monthOf(t) ? data.top.rows : []);
    this.setSettings(data.settings);
    this.bar = new BarSystem(f => { this.push(f); this.barHook?.(f); }, () => this.rng());
    this.bar.rank = () => this.top.top(this.hideSimOnBoards, this.now());
  }

  /* ---------------------------------------------------------- vào */
  handle(ev: LiveEvent){
    if (ev.avatar){ this.avatars.delete(ev.id); this.avatars.set(ev.id, ev.avatar); if (this.avatars.size > 3000) this.avatars.delete(this.avatars.keys().next().value as string); }
    const t = this.now();
    switch (ev.kind){
      case 'join': { const p = this.players.get(ev.id); if (p) p.lastSeen = t; break; }     // vào phòng xem thôi chưa tính là vào quán
      case 'comment': this.onComment(ev.id, ev.name, ev.sim, ev.text, t); break;
      case 'like': { const p = this.welcome(ev.id, ev.name, ev.sim, t); this.bar.seat(p.id, p.name, p.gender, t); this.bar.likes(Math.max(1, Math.min(500, ev.count | 0))); this.push({ k: 'like', id: p.id, count: Math.max(1, Math.min(500, ev.count | 0)) }); break; }
      case 'share': { const p = this.welcome(ev.id, ev.name, ev.sim, t); this.bar.seat(p.id, p.name, p.gender, t); break; }
      case 'follow': { const p = this.welcome(ev.id, ev.name, ev.sim, t); p.follower = true; this.bar.seat(p.id, p.name, p.gender, t); break; }
      case 'gift': this.onGift(ev.msgId, ev.id, ev.name, ev.sim, ev.gift, ev.diamonds, ev.count, t); break;
    }
    if (ev.follower){ const p = this.players.get(ev.id); if (p && !p.follower){ p.follower = true; this.changed = true; } }
  }

  private welcome(id: string, name: string, sim: boolean, t: number): Player {
    let p = this.players.get(id);
    if (!p){ p = { id, name: name.slice(0, 40), sim, gender: '', gifted: 0, joinedAt: t, lastSeen: t }; this.players.set(id, p); }
    p.name = name.slice(0, 40) || p.name; p.lastSeen = t;
    this.changed = true;
    return p;
  }

  // ai bình luận, thả tim cũng vào quán, ra sàn nhảy; "nam" / "nữ" chọn nhân vật; "nhảy ..." chọn điệu nhảy
  private onComment(id: string, name: string, sim: boolean, text: string, t: number){
    const p = this.welcome(id, name, sim, t);
    this.bar.seat(p.id, p.name, p.gender, t);
    const g = parseGender(text);
    if (g){ p.gender = g; this.bar.setGender(p.id, g); this.push({ k: 'chat', id: p.id, text: g === 'nam' ? 'Tui là nam 🙋‍♂️' : 'Tui là nữ 🙋‍♀️' }); return; }
    if (this.bar.comment(p.id, p.name, text, t)) return;
    this.push({ k: 'chat', id: p.id, text: text.slice(0, 60) });
    this.chatHook?.(p.id, p.name, text);
  }

  private onGift(msgId: string, id: string, name: string, sim: boolean, gift: string, diamonds: number, count: number, t: number){
    const p = this.welcome(id, name, sim, t);
    gift = String(gift || 'quà').slice(0, 30);
    count = Math.max(1, Math.min(9999, count | 0));
    const total = Math.max(1, Math.min(1_000_000, (diamonds | 0) * count));
    const before = levelOf(p.gifted);
    p.gifted += total;
    this.top.add(p.id, p.name, total, sim, t);
    this.bar.seat(p.id, p.name, p.gender, t);
    this.bar.gift(p.id, p.name, total, gift, count, t);
    this.storage?.logGift(msgId, p, gift, count, total, barGiftFor(total).key);
    // lên cấp (có thể nhảy nhiều cấp một lúc): báo màn hình và MC
    const after = levelOf(p.gifted);
    if (after > before){
      const L = levelInfo(after);
      const f = { k: 'bar' as const, ev: 'levelup' as const, id: p.id, name: p.name, lv: after, text: `${L.icon} ${p.name} lên cấp ${after} · ${L.name}` };
      this.push(f); this.barHook?.(f);
    }
  }

  push(f: Fx){ this.fx.push(f); if (this.fx.length > 400) this.fx.splice(0, this.fx.length - 400); }

  /* ---------------------------------------------------------- nhịp */
  tick(){ this.bar.tick(this.now()); }

  isOnline(p: Player, t = this.now()){ return t - p.lastSeen < ONLINE_MS; }
  private countStats(): Stats {
    const t = this.now(); let online = 0, real = 0;
    for (const p of this.players.values()) if (this.isOnline(p, t)){ online++; if (!p.sim) real++; }
    this.stats.players = this.players.size; this.stats.online = online; this.stats.realOnline = real;
    return { ...this.stats };
  }
  private barPub(): BarState {
    const t = this.now(), b = this.bar.pub(t, id => this.avatars.has(id));
    return { ...b, guests: b.guests.map(g => { const pl = this.players.get(g.id); return { ...g, sim: !!pl?.sim, lvl: levelOf(pl?.gifted ?? 0) }; }), top: this.top.top(this.hideSimOnBoards, t), month: this.top.month };
  }

  snapshot(role: Snapshot['role']): Snapshot { return { t: 'hello', role, bar: this.barPub(), live: this.live, stats: this.countStats(), settings: this.settings }; }
  // gom mọi thay đổi từ lần trước thành một gói nhỏ; withStats: kèm số người xem và trạng thái quán (2 lần một giây là đủ)
  delta(withStats: boolean): Delta | null {
    const d: Delta = { t: 'delta' };
    if (this.bar.dirty || withStats){ d.bar = this.barPub(); this.bar.dirty = false; }
    if (withStats) d.stats = this.countStats();
    if (this.liveDirty){ d.live = this.live; this.liveDirty = false; }
    if (this.settingsDirty){ d.settings = this.settings; this.settingsDirty = false; }
    if (this.fx.length) d.fx = this.fx.splice(0).slice(-MAX_FX_PER_DELTA);
    return Object.keys(d).length > 1 ? d : null;
  }

  setLive(s: LiveStatus){ this.live = s; this.liveDirty = true; }
  setSettings(s: Partial<Settings>){
    if (typeof s.voice === 'boolean') this.settings.voice = s.voice;
    if (typeof s.readChat === 'boolean') this.settings.readChat = s.readChat;
    this.settingsDirty = true; this.changed = true;
  }
  // rớt kết nối TikTok bao lâu thì cộng bấy lâu cho người xem thật, để họ không bị tính là đã rời quán vì im lặng
  extendOnline(ms: number){ const t = this.now(); for (const p of this.players.values()) if (!p.sim && this.isOnline(p, t - ms)) p.lastSeen += ms; }
  // xoá người thử (DEMO) khỏi quán và khỏi danh sách tài khoản
  removeSimPlayers(){ this.bar.removeSim(id => !!this.players.get(id)?.sim); for (const p of [...this.players.values()]) if (p.sim) this.players.delete(p.id); this.changed = true; }

  private saveSet(){ return { players: this.players.values(), top: { month: this.top.month, rows: this.top.all() }, settings: this.settings }; }
  async save(force = false){ if (!this.storage || (!force && !this.changed)) return; this.changed = false; await this.storage.save(this.saveSet()); }
  saveSync(){ this.storage?.saveSync(this.saveSet()); }
}
