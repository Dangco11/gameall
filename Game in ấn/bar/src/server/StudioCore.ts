import { PRINT, TEMPLATES, pickTemplate, templateOf, tierFor, tierOf } from '../shared/print.ts';
import { levelInfo, levelOf } from '../shared/levels.ts';
import type { Delta, Fx, LiveEvent, LiveStatus, Player, PrintFx, PrintRecord, PrintState, Settings, Snapshot, Stats } from '../shared/types.ts';
import type { Loaded, Storage } from './Storage.ts';
import { MonthTop, monthOf } from './systems/MonthTop.ts';
import { PrintSystem } from './systems/PrintSystem.ts';

// Lõi Live Print Studio: nhận sự kiện đã qua hàng đợi (TikTok LIVE hay bảng thử), giữ tài khoản người xem,
// đưa quà vào máy in, giữ phòng trưng bày (bản in gần đây, bản hiếm, TOP người tặng), gom thay đổi gửi xuống màn hình.
const ONLINE_MS = 10 * 60_000;            // 10 phút không có tương tác thì coi như đã rời live
const MAX_FX_PER_DELTA = 80;

export interface CoreOptions { now?: () => number; rng?: () => number }

export class StudioCore {
  readonly printer: PrintSystem;
  readonly top: MonthTop;
  readonly players = new Map<string, Player>();
  readonly avatars = new Map<string, string>();      // ảnh đại diện TikTok mới nhất (link hết hạn sau vài ngày)
  prints: PrintRecord[] = [];                        // bản in đã xong (mới nhất cuối danh sách)
  readonly editions = new Map<number, number>();     // số bản đã in của từng mẫu
  live: LiveStatus = { status: 'idle', uniqueId: '', error: '', attempt: 0 };
  settings: Settings = { voice: true, readChat: true };
  stats: Stats = { queue: 0, dropped: 0, duplicates: 0, processed: 0, players: 0, online: 0, realOnline: 0, views: 0 };
  private hideSim = false;                           // đang live thật: bảng xếp hạng, phòng trưng bày ẩn người thử (DEMO)
  get hideSimOnBoards(){ return this.hideSim; }
  set hideSimOnBoards(v: boolean){ if (v !== this.hideSim){ this.hideSim = v; this.galleryDirty = true; } }
  printHook: ((f: PrintFx) => void) | null = null;
  chatHook: ((id: string, name: string, text: string) => void) | null = null;
  /** ảnh đại diện đã lưu xuống đĩa (main.ts gắn vào Storage) */
  avatarSaved: (id: string) => boolean = () => false;

  private storage: Storage | null;
  private now: () => number;
  private rng: () => number;
  private fx: Fx[] = [];
  private liveDirty = true; private settingsDirty = false; private changed = false; private galleryDirty = true;
  private greeted = new Set<string>();
  private likes = new Map<string, number>();         // tim đã thả chưa đủ 50 (trong buổi live)

  constructor(storage: Storage | null, opts: CoreOptions = {}, loaded?: Loaded){
    this.storage = storage; this.now = opts.now ?? Date.now; this.rng = opts.rng ?? Math.random;
    const data = loaded ?? storage?.load() ?? { players: [], top: { month: '', rows: [] }, settings: {}, giftIds: [], prints: [], editions: new Map(), printed: 0 };
    for (const p of data.players) this.players.set(p.id, p);
    const t = this.now();
    this.top = new MonthTop(data.top.month || monthOf(t), data.top.month === monthOf(t) ? data.top.rows : []);
    this.setSettings(data.settings);
    this.prints = data.prints.slice(-PRINT.keepPrints);
    for (const [k, v] of data.editions) this.editions.set(k, v);
    this.printer = new PrintSystem(f => { this.push(f); this.printHook?.(f); }, data.printed);
    this.printer.choose = j => {
      const p = this.players.get(j.id);
      const lead = this.top.top(this.hideSimOnBoards, this.now(), 1)[0];
      const tpl = pickTemplate(j.tier, { lifetime: p?.gifted ?? j.xu, owned: p?.owned ?? [], seed: Math.floor(this.rng() * 1e9), top1: !!lead && lead.id === j.id, editions: no => this.editions.get(no) ?? 0 });
      const ed = (this.editions.get(tpl.no) ?? 0) + 1;
      this.editions.set(tpl.no, ed);
      if (p){ p.owned = [...new Set([...(p.owned ?? []), tpl.no])].slice(-TEMPLATES.length); p.prints = (p.prints ?? 0) + 1; }
      j.avatar ||= this.avatars.has(j.id) || this.avatarSaved(j.id);
      this.changed = true;
      return { tpl: tpl.no, edition: ed, lv: levelOf(p?.gifted ?? 0) };
    };
    this.printer.onDone = r => {
      this.prints.push(r);
      if (this.prints.length > PRINT.keepPrints) this.prints.splice(0, this.prints.length - PRINT.keepPrints);
      this.galleryDirty = true; this.changed = true;
    };
  }

  /* ---------------------------------------------------------- vào */
  handle(ev: LiveEvent){
    if (ev.avatar){ this.avatars.delete(ev.id); this.avatars.set(ev.id, ev.avatar); if (this.avatars.size > 3000) this.avatars.delete(this.avatars.keys().next().value as string); }
    const t = this.now();
    switch (ev.kind){
      case 'join': { const p = this.players.get(ev.id); if (p) p.lastSeen = t; break; }
      case 'comment': {
        const p = this.welcome(ev.id, ev.name, ev.sim, t);
        this.push({ k: 'chat', id: p.id, name: p.name, text: ev.text.slice(0, 80) });
        this.chatHook?.(p.id, p.name, ev.text);
        break;
      }
      case 'like': {
        const p = this.welcome(ev.id, ev.name, ev.sim, t), n = Math.max(1, Math.min(500, ev.count | 0));
        this.push({ k: 'like', id: p.id, count: n });
        // đủ 50 tim là được in một bản Ảnh in miễn phí (không cộng xu, không tính TOP, cấp độ)
        let have = (this.likes.get(p.id) ?? 0) + n;
        while (have >= PRINT.likesPerPrint){ have -= PRINT.likesPerPrint; this.printer.add({ id: p.id, name: p.name, sim: p.sim, avatar: this.avatars.has(p.id) || this.avatarSaved(p.id), gift: `${PRINT.likesPerPrint} tim ❤️`, count: 1, xu: 0 }, t); }
        this.likes.delete(p.id); this.likes.set(p.id, have);
        if (this.likes.size > 5000) this.likes.delete(this.likes.keys().next().value as string);
        break;
      }
      case 'share': this.welcome(ev.id, ev.name, ev.sim, t); break;
      case 'follow': { const p = this.welcome(ev.id, ev.name, ev.sim, t); p.follower = true; break; }
      case 'gift': this.onGift(ev.msgId, ev.id, ev.name, ev.sim, ev.gift, ev.diamonds, ev.count, t); break;
    }
    if (ev.follower){ const p = this.players.get(ev.id); if (p && !p.follower){ p.follower = true; this.changed = true; } }
  }

  private welcome(id: string, name: string, sim: boolean, t: number): Player {
    let p = this.players.get(id);
    if (!p){ p = { id, name: name.slice(0, 40), sim, gifted: 0, joinedAt: t, lastSeen: t }; this.players.set(id, p); }
    p.name = name.slice(0, 40) || p.name; p.lastSeen = t;
    if (!this.greeted.has(id)){
      this.greeted.add(id);
      if (this.greeted.size > 5000) this.greeted.clear();
      const f: PrintFx = { k: 'print', ev: 'hello', id, name: p.name, text: `👋 ${p.name} vào studio` };
      this.push(f); this.printHook?.(f);
    }
    this.changed = true;
    return p;
  }

  private onGift(msgId: string, id: string, name: string, sim: boolean, gift: string, diamonds: number, count: number, t: number){
    const p = this.welcome(id, name, sim, t);
    gift = String(gift || 'quà').slice(0, 30);
    count = Math.max(1, Math.min(9999, count | 0));
    const total = Math.max(1, Math.min(1_000_000, (diamonds | 0) * count));
    const before = levelOf(p.gifted);
    p.gifted += total;
    if (this.top.add(p.id, p.name, total, sim, t)) this.galleryDirty = true;
    this.galleryDirty = true;
    this.printer.add({ id: p.id, name: p.name, sim, avatar: this.avatars.has(p.id) || this.avatarSaved(p.id), gift, count, xu: total }, t);
    this.storage?.logGift(msgId, p, gift, count, total, tierFor(total).key);
    const after = levelOf(p.gifted);
    if (after > before){
      const L = levelInfo(after);
      const f: PrintFx = { k: 'print', ev: 'levelup', id: p.id, name: p.name, lv: after, text: `${L.icon} ${p.name} lên cấp ${after} · ${L.name}` };
      this.push(f); this.printHook?.(f);
    }
  }

  push(f: Fx){ this.fx.push(f); if (this.fx.length > 400) this.fx.splice(0, this.fx.length - 400); }

  /* ---------------------------------------------------------- nhịp */
  tick(){ this.printer.tick(this.now()); }

  isOnline(p: Player, t = this.now()){ return t - p.lastSeen < ONLINE_MS; }
  private countStats(): Stats {
    const t = this.now(); let online = 0, real = 0;
    for (const p of this.players.values()) if (this.isOnline(p, t)){ online++; if (!p.sim) real++; }
    this.stats.players = this.players.size; this.stats.online = online; this.stats.realOnline = real;
    return { ...this.stats };
  }

  // độ hiếm của một bản in: bậc trước, rồi số xu, rồi bản mới hơn
  private static rank(r: PrintRecord){ return tierOf(r.tier).no * 1e9 + Math.min(r.xu, 999_999) * 100 + (templateOf(r.tpl).sig ? 50 : 0); }
  private gallery(){
    const t = this.now(), hide = this.hideSimOnBoards, list = this.prints.filter(r => !hide || !r.sim);
    const top = this.top.top(hide, t, 5), lead = top[0];
    const rare = [...list].sort((a, b) => StudioCore.rank(b) - StudioCore.rank(a) || b.n - a.n).slice(0, 5);
    const mine = lead ? list.filter(r => r.id === lead.id) : [];
    const hall = mine.length ? mine.reduce((a, b) => StudioCore.rank(b) > StudioCore.rank(a) || (StudioCore.rank(b) === StudioCore.rank(a) && b.n > a.n) ? b : a) : null;
    return { recent: list.slice(-14).reverse(), rare, hall, top, month: this.top.month };
  }
  private cached: ReturnType<StudioCore['gallery']> | null = null;
  printPub(): PrintState {
    if (this.galleryDirty || !this.cached){ this.cached = this.gallery(); this.galleryDirty = false; }
    return { ...this.printer.pub(this.now()), ...this.cached };
  }

  snapshot(role: Snapshot['role']): Snapshot { return { t: 'hello', role, print: this.printPub(), live: this.live, stats: this.countStats(), settings: this.settings }; }
  // gom mọi thay đổi từ lần trước thành một gói nhỏ; withStats: kèm số người xem và trạng thái máy in (2 lần một giây là đủ)
  delta(withStats: boolean): Delta | null {
    const d: Delta = { t: 'delta' };
    if (this.printer.dirty || this.galleryDirty || withStats){ d.print = this.printPub(); this.printer.dirty = false; }
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
  // rớt kết nối TikTok bao lâu thì cộng bấy lâu cho người xem thật, để họ không bị tính là đã rời live vì im lặng
  extendOnline(ms: number){ const t = this.now(); for (const p of this.players.values()) if (!p.sim && this.isOnline(p, t - ms)) p.lastSeen += ms; }
  // xoá người thử (DEMO): khỏi hàng đợi in, phòng trưng bày và danh sách tài khoản
  removeSimPlayers(){
    const sim = (id: string) => !!this.players.get(id)?.sim || id.startsWith('sim_');
    this.printer.removeWhere(sim);
    const n = this.prints.length;
    this.prints = this.prints.filter(r => !r.sim);
    if (this.prints.length !== n) this.galleryDirty = true;
    for (const p of [...this.players.values()]) if (p.sim) this.players.delete(p.id);
    this.changed = true; this.galleryDirty = true;
  }

  private saveSet(){ return { players: this.players.values(), top: { month: this.top.month, rows: this.top.all() }, settings: this.settings, prints: this.prints, editions: this.editions, printed: this.printer.printed }; }
  async save(force = false){ if (!this.storage || (!force && !this.changed)) return; this.changed = false; await this.storage.save(this.saveSet()); }
  saveSync(){ this.storage?.saveSync(this.saveSet()); }
}
