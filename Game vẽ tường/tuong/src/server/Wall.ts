import fs from 'node:fs';
import path from 'node:path';
import { ART_AREA, CANVAS, COLORS, KEEP, LIKES_PER_BOMB, artBox, fitSize, norm, tierFor } from '../shared/game.ts';
import type { ArtKind } from '../shared/game.ts';
import type { Art, Boards, Fx, Goal, LiveEvent, Lucky } from '../shared/types.ts';

// Bức tường: quà / tim / bình luận → tranh phun sơn. Mỗi tranh chiếm trọn một mảng tường mới bên phải; chỉ giữ KEEP mảng gần nhất.
// Lưu data/wall.json (tranh) và data/painters.json (họa sĩ: xu đã tặng, màu sơn, số bích hoạ, ảnh đại diện).
export interface Painter { id: string; name: string; avatar: string; xu: number; color: string; murals: number; likes: number; lastTag: number; sim?: boolean }

const LABEL: Record<ArtKind, string> = { tag: 'Ký tên', splat: 'Bom sơn', bomber: 'Bomber', portrait: 'Chân dung', gold: 'Cánh vàng', angel: 'Thiên thần', squad: 'Phi đội', dragon: 'Rồng sơn', demon: 'Vương miện', mural: 'Bích hoạ' };
const PALETTE = COLORS.filter(c => c.key !== 'den' && c.key !== 'trang').map(c => c.hex);
const clean = (s: string) => s.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim() || 'bạn';
const LUCKY_OPEN = 30_000, LUCKY_EVERY = 5 * 60_000;
const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

export class Wall {
  arts: Art[] = [];
  painters = new Map<string, Painter>();
  recent: { name: string; label: string }[] = [];
  likesTotal = 0;
  private seq = 1; private fxq: Fx[] = [];
  seg = 0;                              // số mảng tường sẽ vẽ bức tiếp theo
  private dirty = false;
  private dir: string;
  // ---- kéo tương tác (TikTok đẩy live có nhiều tim, bình luận, chia sẻ, follow, người ở lại xem lâu)
  goal: Goal = { n: 0, need: 300, level: 1 };              // mục tiêu tim chung của cả phòng
  private goalLikers = new Map<string, number>();
  private luckyAt = Date.now() + 2 * 60_000;               // "Mưa sơn": mở 30 giây, ai bình luận "vẽ" được bốc thăm vẽ chân dung miễn phí
  private luckyOpen: { ends: number; who: Map<string, Painter> } | null = null;
  private followed = new Set<string>(); private shared = new Map<string, number>(); private lastJoin = 0;
  say: (text: string, prio?: boolean) => void = () => {};
  rand: () => number;
  constructor(dir: string, rand: () => number = Math.random) {
    this.dir = dir; this.rand = rand;
    try { const w = JSON.parse(fs.readFileSync(path.join(dir, 'wall.json'), 'utf8')); this.arts = (w.arts ?? []).filter((a: Art) => typeof a.seg === 'number'); this.seq = w.seq ?? this.arts.length + 1; this.seg = typeof w.seg === 'number' ? w.seg : 0; } catch { /* tường trắng */ }
    try { for (const p of JSON.parse(fs.readFileSync(path.join(dir, 'painters.json'), 'utf8')) as Painter[]) this.painters.set(p.id, { ...p, lastTag: 0 }); } catch { /* chưa có */ }
  }
  fx(f: Fx) { this.fxq.push(f); if (this.fxq.length > 300) this.fxq.splice(0, this.fxq.length - 300); }
  takeFx() { return this.fxq.splice(0); }
  avatarUrl(id: string) { return this.painters.get(id)?.avatar ?? ''; }

  private who(ev: LiveEvent): Painter {
    let p = this.painters.get(ev.id);
    if (!p) { p = { id: ev.id, name: ev.name, avatar: '', xu: 0, color: PALETTE[hash(ev.id) % PALETTE.length], murals: 0, likes: 0, lastTag: 0, sim: ev.sim }; this.painters.set(ev.id, p); }
    if (ev.name) p.name = ev.name.slice(0, 32);
    if (ev.avatar) p.avatar = ev.avatar;
    this.dirty = true;
    return p;
  }
  nextSeg() { return this.seg; }
  paint(p: Painter, kind: ArtKind, size: number, count = 1) {
    void size;
    // tranh to kín vùng đặt tranh của mảng mới: căn giữa ngang, căn giữa theo chiều cao vùng
    const nameLen = p.name.length + 1, sz = fitSize(kind, nameLen), b = artBox(kind, sz, nameLen);
    const top = CANVAS.h * ART_AREA.y0 + Math.max(0, (CANVAS.h * (ART_AREA.y1 - ART_AREA.y0) - b.h) / 2);
    const x = 0.5, y = 1 - (top + b.h * b.ay) / CANVAS.h;
    const art: Art = { id: this.seq++, seg: this.seg++, kind, uid: p.id, name: p.name, av: p.id, color: p.color, x, y: +y.toFixed(4), size: sz, t: Date.now(), seed: Math.floor(this.rand() * 1e9), count };
    this.arts.push(art);
    if (this.arts.length > KEEP) this.arts.splice(0, this.arts.length - KEEP);
    this.recent.unshift({ name: p.name, label: LABEL[kind] }); if (this.recent.length > 6) this.recent.length = 6;
    this.fx({ k: 'art', art, fresh: true });
    this.dirty = true;
    return art;
  }

  tick(now = Date.now()) {
    if (!this.luckyOpen && now >= this.luckyAt) {
      this.luckyOpen = { ends: now + LUCKY_OPEN, who: new Map() };
      this.fx({ k: 'lucky', phase: 'open' });
      this.say('Mưa sơn bắt đầu! Bình luận chữ vẽ để được bốc thăm vẽ chân dung miễn phí!', true);
    }
    if (this.luckyOpen && now >= this.luckyOpen.ends) {
      const all = [...this.luckyOpen.who.values()], n = all.length, wins: Painter[] = [];
      while (wins.length < Math.min(n >= 10 ? 3 : 2, n)) wins.push(all.splice(Math.floor(this.rand() * all.length), 1)[0]);
      for (const p of wins) this.paint(p, 'portrait', 195);
      this.fx({ k: 'lucky', phase: 'win', names: wins.map(p => p.name), n });
      if (wins.length) this.say(`Chúc mừng ${wins.map(p => clean(p.name)).join(' và ')} trúng chân dung miễn phí!`, true);
      this.luckyOpen = null; this.luckyAt = now + LUCKY_EVERY;
    }
  }
  lucky(now = Date.now()): Lucky {
    return this.luckyOpen ? { open: true, left: Math.ceil((this.luckyOpen.ends - now) / 1000), n: this.luckyOpen.who.size } : { open: false, left: Math.max(0, Math.ceil((this.luckyAt - now) / 1000)), n: 0 };
  }
  handle(ev: LiveEvent) {
    const p = this.who(ev), now = Date.now();
    switch (ev.kind) {
      case 'comment': {
        const t = norm(ev.text);
        if (this.luckyOpen && /(^| )(ve|1)( |$)/.test(t) && !this.luckyOpen.who.has(p.id)) this.luckyOpen.who.set(p.id, p);
        const c = COLORS.find(c => c.words.test(t));
        if (c) { p.color = c.hex; this.fx({ k: 'color', name: p.name, color: c.hex }); return; }
        // bình luận: xịt tên lên tường (mỗi người một phút một lần)
        if (now - p.lastTag > 60_000) { p.lastTag = now; this.paint(p, 'tag', 46 + Math.min(14, p.name.length) * 4); }
        return;
      }
      case 'join': if (now - this.lastJoin > 1500) { this.lastJoin = now; this.fx({ k: 'join', name: p.name }); } return;
      // follow: một lần / người → ký tên to + cảm ơn · chia sẻ: 2 phút / người → bom sơn có ảnh + cảm ơn
      case 'follow': if (this.followed.has(p.id)) return; this.followed.add(p.id); this.paint(p, 'tag', 90); this.fx({ k: 'thanks', kind: 'follow', id: p.id, name: p.name }); this.say(`Cảm ơn ${clean(p.name)} đã follow!`); return;
      case 'share': if (now - (this.shared.get(p.id) ?? 0) < 120_000) return; this.shared.set(p.id, now); this.paint(p, 'splat', 150); this.fx({ k: 'thanks', kind: 'share', id: p.id, name: p.name }); this.say(`Cảm ơn ${clean(p.name)} đã chia sẻ live!`); return;
      case 'like': {
        p.likes += ev.count; this.likesTotal += ev.count;
        // mục tiêu tim chung: đạt mốc → phi đội trái tim vẽ người thả tim nhiều nhất đợt này, mốc sau cao hơn
        this.goal.n += ev.count; this.goalLikers.set(p.id, (this.goalLikers.get(p.id) ?? 0) + ev.count);
        if (this.goal.n >= this.goal.need) {
          const topId = [...this.goalLikers].sort((a, b) => b[1] - a[1])[0][0], top = this.painters.get(topId) ?? p;
          this.paint(top, 'squad', 215);
          this.fx({ k: 'goal', id: top.id, name: top.name, level: this.goal.level });
          this.say(`Cả phòng đạt mục tiêu tim! Phi đội trái tim vẽ ${clean(top.name)}, người thả tim nhiều nhất!`, true);
          this.goal = { n: 0, need: Math.min(5000, Math.round(this.goal.need * 1.6 / 100) * 100), level: this.goal.level + 1 };
          this.goalLikers.clear();
        }
        if (p.likes >= LIKES_PER_BOMB) { p.likes -= LIKES_PER_BOMB; this.paint(p, 'splat', 90); }
        this.fx({ k: 'likes', id: p.id, name: p.name, n: p.likes, need: LIKES_PER_BOMB });
        return;
      }
      case 'gift': {
        const tier = tierFor(ev.diamonds), xu = ev.diamonds * ev.count;
        p.xu += xu;
        this.fx({ k: 'gift', id: p.id, name: p.name, av: p.id, gift: ev.gift, count: ev.count, xu, tier: tier.name, icon: tier.icon });
        // quà nhỏ combo: mỗi lần một tranh (tối đa 5); chân dung trở lên: một tranh, combo làm tranh to hơn / nhiều máy bay hơn
        const reps = tier.kind === 'splat' || tier.kind === 'bomber' ? Math.min(5, ev.count) : 1;
        for (let i = 0; i < reps; i++) this.paint(p, tier.kind, tier.size, ev.count);
        if (tier.kind === 'mural') { p.murals++; this.say(`Bích hoạ huyền thoại! Cảm ơn ${p.name.replace(/[^\p{L}\p{N}\s]/gu, ' ')} đã vẽ kín cả bức tường!`, true); }
        else if (tier.xu >= 99) this.say(`${p.name.replace(/[^\p{L}\p{N}\s]/gu, ' ')} vẽ ${tier.name} lên tường!`, true);
        return;
      }
      default: return;
    }
  }
  wipe() { this.arts = []; this.fx({ k: 'wipe' }); this.dirty = true; }
  removeSim() { for (const [id, p] of this.painters) if (p.sim) this.painters.delete(id); this.arts = this.arts.filter(a => !a.uid.startsWith('sim:')); this.fx({ k: 'wipe' }); this.dirty = true; }
  boards(): Boards {
    const ps = [...this.painters.values()];
    return {
      painters: ps.filter(p => p.xu > 0).sort((a, b) => b.xu - a.xu).slice(0, 8).map(p => ({ id: p.id, name: p.name, av: p.id, v: p.xu })),
      hall: ps.filter(p => p.murals > 0).sort((a, b) => b.murals - a.murals || b.xu - a.xu).slice(0, 5).map(p => ({ id: p.id, name: p.name, av: p.id, v: p.murals })),
      recent: this.recent,
    };
  }
  save() {
    if (!this.dirty) return;
    this.dirty = false;
    const w = (f: string, data: unknown) => { const file = path.join(this.dir, f), tmp = file + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(data)); fs.renameSync(tmp, file); };
    try { fs.mkdirSync(this.dir, { recursive: true }); w('wall.json', { seq: this.seq, seg: this.seg, arts: this.arts.filter(a => !a.uid.startsWith('sim:')) }); w('painters.json', [...this.painters.values()].filter(p => !p.sim)); }
    catch (e) { console.error('Không lưu được tường: ' + (e as Error).message); this.dirty = true; }
  }
}
