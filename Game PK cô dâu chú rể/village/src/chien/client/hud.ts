import * as THREE from 'three';
import { UNITS } from '../config/UnitConfig.ts';
import type { UnitKind } from '../config/UnitConfig.ts';
import { TEAM_INFO, TEAM_KEYS } from '../types.ts';
import type { Hud, PlayerRow, RoundResult, TeamHud, TeamKey } from '../types.ts';
import type { CUnit } from './units.ts';
import { anchorHeight } from './units.ts';

export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''){ const e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
const fmt = (n: number) => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? Math.round(n / 1e3) + 'k' : n >= 1e3 ? (n / 1e3).toFixed(1) + 'k' : String(Math.round(n));
// tên ngắn cho ô bảng quà (vừa một dòng trên màn dọc)
const SHORT: Record<UnitKind, string> = { danbinh: 'Dân binh', xathu: 'Xạ thủ', dausi: 'Đấu sĩ', xechien: 'Xe chiến', trau: 'Trâu', voi: 'Voi' };
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

/* ---------------------------------------------------------------- ảnh đại diện */
// Bộ nhớ đệm ảnh: mỗi link chỉ tải một lần; link lỗi thì nhớ lỗi và dùng ảnh mặc định (chữ cái đầu trên nền màu phe)
export class AvatarCache {
  private failed = new Set<string>();
  private defaults = new Map<string, string>();
  src(url: string, name: string, team: TeamKey){ return url && !this.failed.has(url) ? url : this.fallback(name, team); }
  fail(url: string){ if (url){ this.failed.add(url); if (this.failed.size > 2000) this.failed.delete(this.failed.values().next().value as string); } }
  fallback(name: string, team: TeamKey){
    const ch = ([...String(name || '?').trim()][0] ?? '?').toUpperCase(), key = ch + team;
    let s = this.defaults.get(key);
    if (!s){
      const c = document.createElement('canvas'); c.width = c.height = 96;
      const g = c.getContext('2d')!, col = TEAM_INFO[team].css;
      const gr = g.createLinearGradient(0, 0, 96, 96); gr.addColorStop(0, col); gr.addColorStop(1, '#1a1020');
      g.fillStyle = gr; g.beginPath(); g.arc(48, 48, 48, 0, Math.PI * 2); g.fill();
      g.fillStyle = '#fff'; g.font = 'bold 52px "Be Vietnam Pro", "Segoe UI", sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch, 48, 52);
      s = c.toDataURL(); this.defaults.set(key, s);
    }
    return s;
  }
  img(url: string, name: string, team: TeamKey, cls = 'av'){
    const i = el('img', cls) as HTMLImageElement;
    i.alt = ''; i.referrerPolicy = 'no-referrer'; i.decoding = 'async';
    this.set(i, url, name, team);
    return i;
  }
  set(i: HTMLImageElement, url: string, name: string, team: TeamKey){
    const s = this.src(url, name, team);
    if (i.dataset.src === s) return;
    i.dataset.src = s; i.src = s;
    i.onerror = () => { this.fail(url); const f = this.fallback(name, team); if (i.dataset.src !== f){ i.dataset.src = f; i.src = f; } };
  }
}

/* ------------------------------------------------------------------- bảng tên */
interface Plate { box: HTMLDivElement; img: HTMLImageElement; nm: HTMLSpanElement; tier: HTMLSpanElement; fill: HTMLElement; id: number; key: string; kill: HTMLElement }
const PLATES = 44;

export class BattleHUD {
  readonly avatars = new AvatarCache();
  private plates: Plate[] = [];
  private nums: { e: HTMLElement; x: number; y: number; z: number; at: number; on: boolean }[] = [];
  private numNext = 0;
  private feedItems: HTMLElement[] = [];
  private topIds = new Set<string>();
  readonly honor = new Map<string, number>();                    // người chơi → hạng trong BXH lực chiến tháng (1..20)
  private boardKey = '';
  private leader: TeamKey | '' = '';
  private prevGift: Partial<Record<TeamKey, number>> = {};
  private _p = new THREE.Vector3();
  live: boolean;

  constructor(live: boolean){
    this.live = live;
    const layer = $('plates');
    for (let i = 0; i < PLATES; i++){
      const box = el('div', 'plate') as HTMLDivElement, img = this.avatars.img('', '?', 'trai'), nm = el('span', 'nm') as HTMLSpanElement, tier = el('span', 'tier') as HTMLSpanElement;
      const bar = el('div', 'hp'), fill = el('i'), kill = el('b', 'killpop', '⚔️+1');
      bar.append(fill); const top = el('div', 'row'); top.append(img, nm, tier); box.append(top, bar, kill);
      box.style.display = 'none'; layer.append(box);
      this.plates.push({ box, img, nm, tier, fill, id: 0, key: '', kill });
    }
    const nl = $('nums');
    for (let i = 0; i < 48; i++){ const e = el('span', 'num'); e.style.display = 'none'; nl.append(e); this.nums.push({ e, x: 0, y: 0, z: 0, at: 0, on: false }); }
  }

  /* ---------------------------------------------------------- bảng điểm */
  render(h: Hud){
    for (const t of TEAM_KEYS) this.team(t, h.teams[t]);
    const r = h.round;
    const gathering = (r.state === 'running' || r.state === 'paused') && r.phase === 'taphop';
    $('clock').textContent = r.state === 'countdown' ? `⏳ ${r.countdown}` : r.state === 'ended' ? '🏁' : r.state === 'idle' ? '⚔️' : gathering ? `⏳ ${mmss(r.gatherLeft)}` : mmss(r.left);
    document.body.classList.toggle('gathering', gathering || r.state === 'countdown' || r.state === 'idle' || r.state === 'ended');
    $('phase').textContent = r.state === 'idle' ? 'Chờ quà để mở trận' : r.state === 'countdown' ? `Vòng ${r.round} sắp bắt đầu` : r.state === 'paused' ? '⏸ Tạm dừng' : r.state === 'ended' ? (r.autoNext ? `Vòng mới sau ${r.resultLeft}s` : 'Hết trận') : gathering ? `Vòng ${r.round} · Tập hợp · xuất quân sau ${r.gatherLeft}s` : `Vòng ${r.round} · ${r.phaseName}`;
    $('tugT').style.width = `${(r.progress * 100).toFixed(1)}%`;
    this.pk(h);
    document.body.classList.toggle('final', r.state === 'running' && r.phase === 'quyetchien');
    const pot = $('pot'); pot.hidden = !r.pot; if (r.pot) pot.textContent = `⚔️ Quỹ lực chiến ${fmt(r.pot)} · đội thắng chia nhau`;
    this.honor.clear(); for (const b of h.board.top) this.honor.set(b.id, b.rank);
    this.renderBoard(h.board);
    this.legend(h.gifts);
    // phe dẫn đầu đổi thì báo
    const lead: TeamKey | '' = r.state !== 'running' ? '' : r.progress > 0.56 ? 'trai' : r.progress < 0.44 ? 'gai' : this.leader;
    if (lead && lead !== this.leader){ this.leader = lead; this.feed(`${TEAM_INFO[lead].icon} ${TEAM_INFO[lead].name} đang dẫn đầu!`, 'lead ' + lead); }
    if (r.state !== 'running') this.leader = '';
    this.topIds = new Set([...h.teams.trai.top, ...h.teams.gai.top].map(p => p.id));
    if (h.result && r.state === 'ended') this.result(h.result); else $('result').hidden = true;
    const st = $('stats');
    if (st) st.textContent = `${h.units} quân · hàng đợi ${h.queue.queued} · đã xử lý ${h.queue.processed} · trùng ${h.queue.duplicates} · combo ${h.queue.combosMerged} · thử lại ${h.queue.retried} · lỗi ${h.queue.failed}`;
  }
  private team(t: TeamKey, d: TeamHud){
    const root = $('t_' + t);
    const sc = root.querySelector<HTMLElement>('.score b')!;
    // điểm tăng: chữ nảy lên, viền bảng sáng màu phe
    if (d.gift > (this.prevGift[t] ?? 0) && this.prevGift[t] !== undefined){ sc.classList.remove('bump'); root.classList.remove('glow'); void sc.offsetWidth; sc.classList.add('bump'); root.classList.add('glow'); }
    this.prevGift[t] = d.gift;
    sc.textContent = fmt(d.gift);
    root.querySelector('.units')!.textContent = `⚔️ ${d.units} quân${d.pending ? ` · 📦 ${d.pending} trong kho` : ''}${d.bosses ? ` · 👑 ${d.bosses}` : ''}`;
    const gate = root.querySelector<HTMLElement>('.gate i')!, house = root.querySelector<HTMLElement>('.house i')!;
    gate.style.width = `${(d.gateHp / d.gateMax * 100).toFixed(1)}%`; house.style.width = `${(d.houseHp / d.houseMax * 100).toFixed(1)}%`;
    root.querySelector('.gate span')!.textContent = d.gateHp > 0 ? `Cổng ${fmt(d.gateHp)}` : 'Cổng đã vỡ!';
    root.querySelector('.house span')!.textContent = `Nhà ${fmt(d.houseHp)}`;
    root.classList.toggle('threat', d.threat);
    const list = root.querySelector('.top')!;
    const rows = d.top.map((p, i) => this.row(p, i));
    list.replaceChildren(...rows);
    if (!rows.length) list.append(el('li', 'empty', t === 'trai' ? 'Bình luận "1" rồi tặng quà' : 'Bình luận "2" rồi tặng quà'));
  }
  // Thanh PK màn dọc: máu căn cứ (cổng + nhà) mỗi phe, quỹ lực chiến ở giữa, top 3 người chơi hai bên
  private pkKey: Partial<Record<TeamKey, string>> = {};
  private pk(h: Hud){
    if (!document.getElementById('pk')) return;
    $('pkClock').textContent = $('clock').textContent;
    $('pkPhase').textContent = $('phase').textContent;
    $('pkPot').textContent = fmt(h.round.pot);
    for (const t of TEAM_KEYS){
      const d = h.teams[t], hp = d.gateHp + d.houseHp, max = Math.max(1, d.gateMax + d.houseMax);
      const bar = document.querySelector<HTMLElement>(`#pk .pkside.${t} .hpb`)!;
      bar.querySelector<HTMLElement>('i')!.style.width = `${(hp / max * 100).toFixed(1)}%`;
      bar.querySelector('b')!.textContent = fmt(hp);
      bar.classList.toggle('low', hp / max < 0.3); bar.classList.toggle('hit', d.threat);
      $('pkS_' + t).textContent = fmt(d.gift);
      $('pkU_' + t).textContent = `${d.units} quân${d.pending ? ` · 📦${d.pending}` : ''}`;
      const top = d.top.slice(0, 3), key = top.map(p => `${p.id}:${p.gift}:${p.avatar}:${this.honor.get(p.id) ?? ''}`).join('|');
      if (key === this.pkKey[t]) continue;
      this.pkKey[t] = key;
      const rows = top.map((p, i) => {
        const li = el('li'), pic = el('div', 'pa');
        pic.append(this.avatars.img(p.avatar, p.name, p.team, 'av'), el('em', '', String(i + 1)));
        const tx = el('div', 'pt'); tx.append(el('span', 'n', p.name), el('small', '', `${fmt(p.gift)} xu`));
        li.append(pic, tx);
        return li;
      });
      $('pkTop_' + t).replaceChildren(...(rows.length ? rows : [el('li', 'empty', `Bình luận "${t === 'trai' ? 1 : 2}" rồi tặng quà`)]));
    }
  }
  private row(p: PlayerRow, i: number){
    const li = el('li');
    li.append(el('em', '', ['🥇', '🥈', '🥉', '4', '5'][i]), this.avatars.img(p.avatar, p.name, p.team, 'av s'), el('span', 'n', p.name), el('b', '', fmt(p.gift)));
    return li;
  }

  /* ---------------------------------------------------------- thông báo */
  feed(text: string, cls = ''){
    const box = $('feed'), li = el('li', cls, text);
    box.prepend(li); this.feedItems.unshift(li);
    while (this.feedItems.length > (this.live ? 5 : 7)) this.feedItems.pop()!.remove();
    setTimeout(() => li.classList.add('old'), 7000);
  }
  gift(name: string, avatar: string, team: TeamKey, kind: UnitKind, count: number, giftName: string, units = count){
    const card = $('lastGift'); card.replaceChildren();
    const d = UNITS[kind];
    card.append(this.avatars.img(avatar, name, team, 'av m'), el('div', 'g', ''));
    const g = card.lastElementChild!;
    g.append(el('b', '', name), el('span', '', `${count > 1 ? count + ' × ' : ''}${giftName} → ${d.icon} ${units} ${d.name}`));
    card.className = 'show ' + team; card.hidden = false;
    clearTimeout((card as HTMLElement & { _t?: number })._t);
    (card as HTMLElement & { _t?: number })._t = window.setTimeout(() => { card.className = team; }, 4000);
  }
  boss(name: string, avatar: string, team: TeamKey, kind: UnitKind){
    const b = $('bossBanner'), d = UNITS[kind];
    b.replaceChildren(this.avatars.img(avatar, name, team, 'av l'), el('div', 'bt', ''));
    const t = b.lastElementChild!;
    t.append(el('small', '', `${TEAM_INFO[team].icon} ${TEAM_INFO[team].name}`), el('b', '', name), el('span', '', `triệu hồi ${d.icon} ${d.name.toUpperCase()}!`));
    b.className = 'show ' + team; b.hidden = false;
    clearTimeout((b as HTMLElement & { _t?: number })._t);
    (b as HTMLElement & { _t?: number })._t = window.setTimeout(() => { b.hidden = true; }, kind === 'voi' ? 3200 : 2400);
  }
  banner(big: string, small = '', cls = '', ms = 2400){
    const b = $('banner'); b.replaceChildren(el('b', '', big), el('span', '', small)); b.className = 'show ' + cls; b.hidden = false;
    clearTimeout((b as HTMLElement & { _t?: number })._t);
    (b as HTMLElement & { _t?: number })._t = window.setTimeout(() => { b.hidden = true; }, ms);
  }
  private resultKey = '';
  private result(r: RoundResult){
    const key = `${r.round}|${r.winner}`;
    const box = $('result'); box.hidden = false;
    if (key === this.resultKey) return;
    this.resultKey = key;
    const W = r.winner === 'draw' ? null : TEAM_INFO[r.winner];
    const head = el('div', 'rh ' + (r.winner === 'draw' ? 'draw' : r.winner));
    head.append(el('b', '', W ? `${W.icon} ${W.name.toUpperCase()} CHIẾN THẮNG!` : '🤝 HÒA!'),
      el('span', '', r.reason === 'destroyed' ? 'Phá sập nhà chính đối phương' : r.reason === 'timeout-hp' ? 'Hết giờ · căn cứ còn nhiều máu hơn' : r.reason === 'timeout-damage' ? 'Hết giờ · gây nhiều sát thương căn cứ hơn' : r.reason === 'timeout-army' ? 'Hết giờ · còn nhiều quân mạnh trên sân hơn' : r.reason === 'timeout-kills' ? 'Hết giờ · hạ được nhiều quân địch hơn' : 'Hết giờ · hai bên ngang nhau'));
    const mvp = el('div', 'mvp');
    if (r.mvp){ mvp.append(el('em', '', 'MVP'), this.avatars.img(r.mvp.avatar, r.mvp.name, r.mvp.team, 'av l'), el('b', '', r.mvp.name), el('span', '', `${fmt(r.mvp.damage)} sát thương · ${r.mvp.kills} hạ gục · ${fmt(r.mvp.gift)} xu`)); }
    const tbl = el('table', 'rt');
    const tr = (cells: string[], cls = '') => { const x = el('tr', cls); for (const c of cells) x.append(el('td', '', c)); return x; };
    tbl.append(tr(['', '🤵 Nhà Trai', '👰 Nhà Gái'], 'th'),
      tr(['Tổng quà (xu)', fmt(r.teams.trai.gift), fmt(r.teams.gai.gift)]), tr(['Sát thương', fmt(r.teams.trai.damage), fmt(r.teams.gai.damage)]),
      tr(['Số quân', fmt(r.teams.trai.units), fmt(r.teams.gai.units)]), tr(['Boss', String(r.teams.trai.bosses), String(r.teams.gai.bosses)]),
      tr(['Hạ gục', fmt(r.teams.trai.kills), fmt(r.teams.gai.kills)]), tr(['Máu căn cứ', fmt(r.teams.trai.baseHp), fmt(r.teams.gai.baseHp)]));
    const top = el('ol', 'rtop');
    for (const p of r.top.slice(0, 5)){ const li = el('li', p.team); li.append(this.avatars.img(p.avatar, p.name, p.team, 'av s'), el('span', '', p.name), el('b', '', `${fmt(p.score)} điểm`)); top.append(li); }
    const pay = el('div', 'payout');
    if (r.pot){ pay.append(el('b', '', `🏆 Quỹ lực chiến ${fmt(r.pot)} ${r.winner === 'draw' ? 'trả lại cho người góp' : 'chia cho ' + TEAM_INFO[r.winner].name}`)); const ul = el('div', 'pl'); for (const p of r.payouts.slice(0, 6)){ const x = el('span', p.team); x.append(this.avatars.img(p.avatar, p.name, p.team, 'av s'), el('i', '', p.name), el('em', '', '+' + fmt(p.gain))); ul.append(x); } pay.append(ul); }
    box.replaceChildren(head, mvp, tbl, top, pay);
  }

  /* ----------------------------------------------------- bảng quà dưới hai phe */
  // Mỗi phe hiện đủ 6 mức quà (2 hàng × 3). Nền trong suốt, chữ có viền tối cho dễ đọc trên mọi nền.
  private legendKey = '';
  private legend(gifts: Hud['gifts']){
    const list = [...(gifts ?? [])].sort((a, b) => a.min - b.min), key = JSON.stringify(list);
    if (key === this.legendKey || !list.length) return;
    this.legendKey = key;
    const tile = (g: Hud['gifts'][number]) => {
      const d = UNITS[g.unit], t = el('div', 'gt' + (d.boss ? ' boss' : ''));
      t.append(el('b', '', `${g.min}X`), el('span', '', `${d.icon} ×${g.count}`), el('small', '', `${SHORT[g.unit]} · ${g.min} xu`));
      return t;
    };
    $('gl_trai').replaceChildren(...list.map(tile));   // mỗi phe hiện đủ cả 6 mức quà
    $('gl_gai').replaceChildren(...list.map(tile));
  }

  /* ----------------------------------------------------- BXH lực chiến tháng */
  boardOpen = false;
  private renderBoard(b: Hud['board']){
    const box = $('board');
    const show = this.boardOpen || (this.live && this.showOnLive);
    box.hidden = !show;
    if (!show) return;
    const key = JSON.stringify(b);
    if (key === this.boardKey) return;
    this.boardKey = key;
    const [y, m] = b.month.split('-');
    const head = el('div', 'bh'); head.append(el('b', '', `🏆 BXH LỰC CHIẾN THÁNG ${+m}/${y}`), el('span', '', 'Gọi lính góp lực chiến vào quỹ trận · đội thắng chia nhau · top 20 được vinh danh'));
    const list = el('ol', 'bl');
    if (!b.top.length) list.append(el('li', 'empty', 'Chưa có ai. Tặng quà gọi lính và thắng trận để lên bảng!'));
    for (const r of b.top){
      const li = el('li', 'r' + Math.min(r.rank, 4));
      li.append(el('em', '', r.rank <= 3 ? ['🥇', '🥈', '🥉'][r.rank - 1] : String(r.rank)), this.avatars.img(r.avatar, r.name, 'trai', 'av s'), el('span', 'n', r.name), el('small', '', `${r.wins} thắng`), el('b', '', fmt(r.power)));
      list.append(li);
    }
    box.replaceChildren(head, list);
  }
  showOnLive = false;

  /* ----------------------------------------------------- bảng tên trên đầu quân */
  // Chọn tối đa 44 quân đáng hiện tên nhất: boss, quân cấp cao, vừa hạ địch, vừa xuất hiện, của top người tặng; quân xa thì bỏ.
  plates3d(list: Iterable<CUnit>, camera: THREE.PerspectiveCamera, now: number, camDist: number, out: Set<number>){
    const W = innerWidth, H = innerHeight;
    const cand: { u: CUnit; s: number; sx: number; sy: number }[] = [];
    const maxTier = camDist > 110 ? 4 : camDist > 70 ? 3 : camDist > 42 ? 2 : 1;           // camera càng xa, chỉ quân cấp càng cao mới có bảng tên
    for (const u of list){
      if (!u.visible || u.state === 'dead') continue;
      const tier = u.def.tier, recent = now - u.spawnAt < 3500, killer = now - u.killAt < 3000, top = this.topIds.has(u.info.owner);
      if (tier < maxTier && !recent && !killer && !(top && tier >= 2) && !this.honor.has(u.info.owner)) continue;
      this._p.set(u.rx, u.ry + anchorHeight(u.info.kind) + 0.35, u.rz).project(camera);
      if (this._p.z > 1 || Math.abs(this._p.x) > 1.02 || Math.abs(this._p.y) > 1.02) continue;
      // đang hiện ở khung trước thì được cộng điểm giữ chỗ: bảng tên không nhảy qua lại giữa các quân đứng sát nhau
      const s = tier * 100 + (this.honor.has(u.info.owner) ? 300 : 0) + (u.def.boss ? 1000 : 0) + (killer ? 400 : 0) + (recent ? 250 : 0) + (top ? 150 : 0) + (now - u.dmgAt < 2000 ? 40 : 0) + (out.has(u.id) ? 120 : 0);
      cand.push({ u, s, sx: (this._p.x + 1) / 2 * W, sy: (1 - this._p.y) / 2 * H });
    }
    cand.sort((a, b) => b.s - a.s);
    const prev = new Set(out);
    out.clear();
    // không cho bảng tên đè lên nhau: bảng ưu tiên thấp chạm bảng đã đặt thì bỏ (boss luôn được hiện).
    // Bảng đang hiện được giữ khoảng chạm hẹp hơn một chút, bảng mới phải cách xa hơn: không bật tắt liên tục.
    const cap = camDist > 110 ? 18 : camDist > 60 ? 28 : PLATES, k = Math.max(0.8, Math.min(1.6, innerWidth / 600));
    const bw = 84 * k, bh = 24 * k, placed: { x: number; y: number }[] = [];
    const chosen: { c: typeof cand[number]; keep: boolean }[] = [];
    let fresh = 0;
    for (const c of cand){
      if (chosen.length >= cap) break;
      const keep = prev.has(c.u.id), m = keep ? 0.85 : 1.1;
      // quân mới ra (chỉ có lý do "vừa xuất hiện") tối đa 4 bảng mới mỗi lúc, cổng gọi quân không bị rối
      const onlyRecent = now - c.u.spawnAt < 3500 && c.u.def.tier < maxTier && !this.topIds.has(c.u.info.owner) && !this.honor.has(c.u.info.owner) && !c.u.def.boss;
      if (onlyRecent && !keep && fresh >= 4) continue;
      if (!c.u.def.boss && placed.some(q => Math.abs(q.x - c.sx) < bw * m && Math.abs(q.y - c.sy) < bh * m)) continue;
      if (onlyRecent && !keep) fresh++;
      placed.push({ x: c.sx, y: c.sy });
      chosen.push({ c, keep });
    }
    // mỗi quân giữ đúng bảng DOM của nó (không đổi tên, ảnh qua lại); bảng trống mới cấp cho quân mới
    const owner = new Map<number, number>();
    this.plates.forEach((p, i) => { if (p.id && p.key) owner.set(p.id, i); });
    const want = new Set(chosen.map(x => x.c.u.id)), used = new Set<number>();
    for (const x of chosen){ const i = owner.get(x.c.u.id); if (i !== undefined) used.add(i); }
    let freeAt = 0;
    const slots: number[] = [];
    for (const x of chosen){
      let i = owner.get(x.c.u.id);
      if (i === undefined){ while (freeAt < PLATES && (used.has(freeAt) || want.has(this.plates[freeAt].id) && this.plates[freeAt].key)) freeAt++; i = freeAt; used.add(i); }
      slots.push(i);
    }
    for (let j = 0; j < chosen.length; j++){
      const c = chosen[j].c, i = slots[j];
      if (i >= PLATES) continue;
      const p = this.plates[i], u = c.u;
      out.add(u.id);
      const hr = this.honor.get(u.info.owner) ?? 0, key = `${u.id}|${u.info.stack}|${u.info.name}|${hr}`;
      if (p.key !== key){
        p.key = key; p.id = u.id;
        p.nm.textContent = (hr ? (hr <= 3 ? ['🥇', '🥈', '🥉'][hr - 1] : '🏆' + hr) + ' ' : '') + u.info.name;
        p.tier.textContent = `${u.def.icon}${u.info.stack > 1 ? '×' + u.info.stack : ''}`;
        p.box.className = `plate ${u.team} k-${u.info.kind}${hr ? ' honor h' + Math.min(hr, 4) : ''}`;
        this.avatars.set(p.img, u.info.avatar, u.info.name, u.team);
      }
      p.fill.style.width = `${Math.max(0, Math.min(100, u.hp / u.info.maxHp * 100)).toFixed(0)}%`;
      p.kill.classList.toggle('on', now - u.killAt < 1200);
      p.box.style.display = '';
      p.box.style.transform = `translate(${c.sx.toFixed(1)}px, ${c.sy.toFixed(1)}px) translate(-50%, -100%)`;
    }
    const usedNow = new Set(slots.filter(i => i < PLATES));
    for (let i = 0; i < PLATES; i++) if (!usedNow.has(i) && this.plates[i].box.style.display !== 'none'){ this.plates[i].box.style.display = 'none'; this.plates[i].key = ''; this.plates[i].id = 0; }
  }

  /* --------------------------------------------------------- số sát thương bay */
  private numBudget = 0;
  damage(x: number, y: number, z: number, dmg: number, crit: boolean, block: boolean, big: boolean){
    if (++this.numBudget > 14) return;                                // tối đa 14 số mới mỗi khung hình
    const n = this.nums[this.numNext]; this.numNext = (this.numNext + 1) % this.nums.length;
    n.x = x + (Math.random() - 0.5) * 0.5; n.y = y; n.z = z; n.at = performance.now(); n.on = true;
    n.e.textContent = block ? '🛡️' + dmg : crit ? dmg + '!' : String(dmg);
    n.e.className = 'num' + (crit ? ' crit' : '') + (big ? ' big' : '') + (block ? ' block' : '');
    n.e.style.display = '';
  }
  drawNums(camera: THREE.PerspectiveCamera, now: number){
    this.numBudget = 0;
    for (const n of this.nums){
      if (!n.on) continue;
      const k = (now - n.at) / 900;
      if (k >= 1){ n.on = false; n.e.style.display = 'none'; continue; }
      this._p.set(n.x, n.y + k * 1.2, n.z).project(camera);
      n.e.style.transform = `translate(${((this._p.x + 1) / 2 * innerWidth).toFixed(1)}px, ${((1 - this._p.y) / 2 * innerHeight).toFixed(1)}px) translate(-50%, -50%) scale(${(1 + (1 - k) * 0.3).toFixed(2)})`;
      n.e.style.opacity = String(Math.min(1, (1 - k) * 2.5));
    }
  }
}
