import { COMMAND_HELP, COMMAND_MORE, CONTESTS, COSTUMES, GIFT, HOUSES, MARKET_ITEMS, PROJECTS, SEASONS } from '../shared/balance.ts';
import type { GiftTier } from '../shared/balance.ts';
import type { WeddingState } from '../shared/types.ts';
import type { Boards, FestivalState, LiveStatus, MarketRow, ProjectState, PubPlayer, Stats, WorldState } from '../shared/types.ts';

// Giao diện chữ trên màn hình. Mọi chữ từ người xem chỉ đi qua textContent, không chèn HTML.
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''){
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}
const money = (n: number) => Math.round(n).toLocaleString('vi-VN') + 'đ';
const BOARDS: [keyof Boards, string, (v: number) => string][] = [
  ['level', 'Cấp độ', v => `${v} kn`], ['wealth', 'Giàu có', money], ['builders', 'Xây làng', v => `${v} điểm`], ['donors', 'Mạnh thường quân', v => `${v} xu`],
];

export class UI {
  private boardTab = 0;
  private boards: Boards | null = null;
  private lastPrices = new Map<string, number>();
  private bannerTimer = 0;
  private cardTimer = 0;
  private tickerI = 0;

  constructor(){
    const tabs = $('boardTabs');
    BOARDS.forEach(([, label], i) => {
      const b = el('button', i === 0 ? 'on' : '', label);
      b.onclick = () => { this.boardTab = i; this.renderBoard(); };
      tabs.append(b);
    });
    setInterval(() => { this.boardTab = (this.boardTab + 1) % BOARDS.length; this.renderBoard(); }, 9000);
    const cmds = $('commands');
    for (const c of COMMAND_HELP) cmds.append(el('span', '', c));
    const tiers = $('giftTiers');
    for (const t of GIFT.tiers){
      // một dòng mỗi mức: biểu tượng, số xu, tên; rê chuột xem mô tả
      const li = el('li'); li.title = t.desc; li.append(el('span', 'mi', t.icon), el('b', 'mx', `${t.min}`), el('span', 'mn', t.name)); tiers.append(li);
      // bảng mức xu gọn cho màn hình LIVE 9:16
      const row = el('li'); row.append(el('span', 'mi', t.icon), el('b', 'mx', `${t.min}`), el('span', 'mn', t.name)); $('giftMenu').append(row);
    }
    tiers.after(el('small', 'note', 'Quà không đổi thành đồng, tăng tốc tối đa 30 phút một ngày.'));
    // mục cột trái thu gọn được, nhớ trạng thái trên máy này
    document.querySelectorAll<HTMLDetailsElement>('#left details.sec').forEach(d => {
      try { const v = localStorage.getItem('langque.left.' + d.dataset.key); if (v !== null) d.open = v === '1'; } catch { /* chế độ riêng tư */ }
      d.ontoggle = () => { try { localStorage.setItem('langque.left.' + d.dataset.key, d.open ? '1' : '0'); } catch { /* chế độ riêng tư */ } };
    });
    const all = [...COMMAND_HELP, ...COMMAND_MORE];
    setInterval(() => { const t = $('cmdTicker'); t.replaceChildren(el('span', '', `Bình luận: ${all[this.tickerI++ % all.length]}`)); }, 3200);
  }

  world(w: WorldState, clock: number){
    const h = Math.floor(clock * 24), m = Math.floor((clock * 24 - h) * 60);
    const icon = w.weather === 'rain' ? '🌧' : w.weather === 'wind' ? '🍃' : w.weather === 'cloudy' ? '⛅' : clock > 0.23 && clock < 0.79 ? '☀️' : '🌙';
    $('clock').textContent = `Ngày ${w.day} · Mùa ${SEASONS[w.season].toLowerCase()} · ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${icon}`;
  }

  stats(s: Stats){ $('online').textContent = `${s.online} đang chơi · ${s.residents} cư dân`; }

  live(s: LiveStatus, sim: boolean){
    const p = $('liveStatus');
    p.className = 'pill' + (s.status === 'connected' ? ' live' : s.status === 'reconnecting' || s.status === 'connecting' ? ' warn' : '');
    p.textContent = s.status === 'connected' ? `● LIVE @${s.uniqueId}` : s.status === 'reconnecting' ? `Đang nối lại @${s.uniqueId}` : s.status === 'connecting' ? 'Đang kết nối…' : s.status === 'error' ? 'Lỗi kết nối' : sim ? 'Chế độ mô phỏng' : 'Chưa kết nối';
  }

  projects(list: ProjectState[], reserve: number){
    const box = $('projects');
    box.replaceChildren();
    const active = list.filter(b => b.stage < PROJECTS[b.key].stages.length).sort((a, b) => a.stage - b.stage)[0];
    for (const b of list){
      const def = PROJECTS[b.key], done = b.stage >= def.stages.length, need = def.stages[b.stage]?.need ?? 1;
      const d = el('div', 'proj' + (done ? ' done' : '') + (b === active ? ' active' : ''));
      const row = el('div', 'row');
      row.append(el('span', '', done ? `${def.name}: ${def.stages[def.stages.length - 1].name}` : `${def.name}: ${def.stages[b.stage].name}`),
        el('span', '', done ? 'Hoàn thành' : `${Math.floor(b.points)}/${need}`));
      const bar = el('div', 'bar'), fill = el('i');
      fill.style.width = `${done ? 100 : Math.min(100, b.points / need * 100)}%`;
      bar.append(fill); d.append(row, bar); box.append(d);
    }
    if (reserve > 0) box.append(el('div', 'reserve', `Kho làng còn ${reserve} điểm, đang rót dần vào công trình`));
    box.append(el('div', 'reserve', 'Gõ GÓP 50 để góp tiền, thả tim cũng được tính'));
  }

  market(rows: MarketRow[]){
    const box = $('market');
    box.replaceChildren();
    for (const r of rows){
      const prev = this.lastPrices.get(r.item) ?? r.price, diff = r.price - r.base;
      box.append(el('span', '', MARKET_ITEMS[r.item].name), el('b', '', money(r.price)),
        el('span', diff >= 0 ? 'up' : 'down', `${diff >= 0 ? '▲' : '▼'} ${Math.abs(Math.round(diff / r.base * 100))}%`));
      this.lastPrices.set(r.item, prev);
    }
  }

  setBoards(b: Boards){ this.boards = b; this.renderBoard(); }
  private renderBoard(){
    const tabs = $('boardTabs').children;
    for (let i = 0; i < tabs.length; i++) tabs[i].className = i === this.boardTab ? 'on' : '';
    const ol = $('board'), [key, , fmt] = BOARDS[this.boardTab], rows = this.boards?.[key] ?? [];
    ol.replaceChildren();
    if (!rows.length){ ol.append(el('li', 'empty', 'Chưa có ai, bình luận VÀO LÀNG nhé')); return; }
    for (const r of rows){
      const li = el('li'), nm = el('span', '', r.name);
      if (r.sim) nm.append(el('i', 'demo', 'DEMO'));
      li.append(nm, el('b', '', fmt(r.value))); ol.append(li);
    }
  }

  feed(text: string, kind: '' | 'fail' | 'gift' | 'note' = ''){
    if (!text) return;
    const add = (id: string, max: number) => {
      const ul = $(id), li = el('li', kind, text);
      ul.prepend(li);
      while (ul.children.length > max) ul.lastElementChild!.remove();
    };
    add('feed', 16);
    if (kind !== 'fail') add('feedFloat', 5);
  }

  banner(title: string, sub: string, tier: number){
    const b = $('banner');
    b.className = `t${tier}`;
    b.replaceChildren(el('b', '', title), el('small', '', sub));
    b.hidden = false;
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
    clearTimeout(this.bannerTimer);
    this.bannerTimer = window.setTimeout(() => { b.hidden = true; }, 5500);
  }

  // Bảng cảm ơn quà: biểu tượng theo mức, gọi tên người tặng, quà lớn có hoa giấy rơi.
  giftBanner(name: string, gift: string, count: number, tier: GiftTier){
    const b = $('banner');
    b.className = `gift t${tier.level}`;
    const head = el('div', 'gh'), ic = el('span', 'gi', tier.icon), txt = el('div');
    txt.append(el('b', '', `Cảm ơn ${name}!`), el('small', '', `đã tặng ${gift}${count > 1 ? ' x' + count : ''}`));
    head.append(ic, txt);
    const eff = el('div', 'ge'); eff.append(el('strong', '', tier.name), el('span', '', tier.desc));
    b.replaceChildren(head, eff);
    b.hidden = false;
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
    clearTimeout(this.bannerTimer);
    this.bannerTimer = window.setTimeout(() => { b.hidden = true; }, 3500 + tier.level * 700);
    const icons: Record<string, string[]> = { outfit: ['👕', '🎀', '✨'], outfit2: ['👘', '✨', '🌸', '💛'], bricks: ['🧱', '🪵'], house: ['🏠', '🧱', '✨', '🎉'],
      rainbow: ['🌸', '✨', '🌾'], coins: ['🪙', '✨', '🎉'], lantern: ['🏮', '🎉', '🌸', '✨'], grand: ['👑', '🏮', '🪙', '🎉', '🌸'] };
    if (icons[tier.fx]) this.confetti(tier.level >= 4 ? 22 : tier.level === 3 ? 14 : 8, icons[tier.fx]);
  }

  private confetti(n: number, icons: string[]){
    const box = $('hearts');
    for (let i = 0; i < n; i++){
      const s = el('span', 'confetti', icons[i % icons.length]);
      s.style.left = `${Math.random() * 100}%`;
      s.style.animationDelay = `${Math.random() * 1.2}s`;
      s.style.animationDuration = `${2.6 + Math.random() * 1.6}s`;
      s.style.setProperty('--dx', `${(Math.random() - 0.5) * 120}px`);
      s.style.fontSize = `${12 + Math.random() * 8}px`;
      box.append(s);
      setTimeout(() => s.remove(), 5200);
    }
  }

  festival(f: FestivalState){
    const box = $('festival');
    if (f.phase === 'idle'){ box.hidden = true; return; }
    box.hidden = false;
    const c = CONTESTS[f.type], secs = Math.ceil(f.leftMs / 1000);
    const title = f.phase === 'lobby' ? `🏮 Hội làng: ${c.name}` : f.phase === 'contest' ? `🥁 Đang thi ${c.name}` : '🏆 Kết quả hội làng';
    const hint = f.phase === 'lobby' ? `Gõ THAM GIA HỘI LÀNG · bắt đầu sau ${secs}s` : f.phase === 'contest' ? `${c.how} · còn ${secs}s` : (f.winners.length ? `Thắng: ${f.winners.join(', ')}` : 'Cảm ơn bà con');
    const kids: HTMLElement[] = [el('div', 't', title), el('div', 'h', hint)];
    if (f.type === 'keoco' && f.phase !== 'lobby'){
      const [a, b] = f.teams, tot = Math.max(1, a + b), tug = el('div', 'tug'), l = el('i'), r = el('i');
      l.style.width = `${a / tot * 100}%`; r.style.width = `${b / tot * 100}%`; tug.append(l, r);
      kids.push(tug, el('div', 'h', `Đội Đỏ ${Math.round(a)} · Đội Xanh ${Math.round(b)}`));
    }
    const ol = el('ol');
    for (const e of f.entrants.slice(0, f.phase === 'lobby' ? 12 : 6)) ol.append(el('li', '', f.phase === 'lobby' ? e.name : `${e.name} ${e.score}`));
    if (f.count > 12 && f.phase === 'lobby') ol.append(el('li', '', `+${f.count - 12} người`));
    kids.push(ol);
    box.replaceChildren(...kids);
  }

  card(p: PubPlayer, actions: [string, () => void][] | null, autoHideMs = 0){
    const box = $('card');
    const hd = el('div', 'hd'), who = el('div'), name = el('b', '', p.name);
    if (p.sim) name.append(el('i', 'demo', 'DEMO'));
    who.append(name, el('small', '', `Cấp ${p.level} · ${p.title}`));
    const x = el('button', 'x', '×'); x.onclick = () => { box.hidden = true; };
    hd.append(who, x);
    const dl = el('dl');
    const rice = p.rice.stage === 'fallow' ? 'Đất trống' : p.rice.stage === 'plowed' ? 'Đã cày, chờ gieo' : p.rice.stage === 'ripe' ? 'Lúa chín, gặt được!' : `Lúa lớn ${Math.round(p.rice.progress * 100)}%${p.rice.water ? '' : ', cần tưới'}`;
    const rows: [string, string][] = [
      ['Tiền', money(p.money)], ['Nhà', `${HOUSES[p.houseLevel - 1].name} (cấp ${p.houseLevel}/10)`], ['Ruộng', rice],
      ['Ao cá', p.pond.fish ? `${p.pond.fish} con, lớn ${Math.round(p.pond.growth * 100)}%${p.pond.fed ? '' : ', đói'}` : 'Chưa thả cá'],
      ['Chuồng', p.coop.chickens + p.coop.ducks ? `${p.coop.chickens} gà, ${p.coop.ducks} vịt, ${p.coop.eggs} trứng` : 'Chưa nuôi'],
      ['Kho', `${p.inv.rice} lúa · ${p.inv.fish} cá · ${p.inv.egg} trứng · ${p.inv.wood} gỗ · ${p.inv.brick} gạch`],
      ['Góp làng', `${p.contributed} điểm${p.wins ? ` · ${p.wins} lần thắng hội` : ''}`],
      ['Trang phục', p.outfit.costume ? COSTUMES[p.outfit.costume].name : 'Áo thường'],
    ];
    for (const [k, v] of rows) dl.append(el('dt', '', k), el('dd', '', v));
    const kids: HTMLElement[] = [hd, dl];
    if (actions){
      const acts = el('div', 'acts');
      for (const [label, fn] of actions){ const b = el('button', label.startsWith('🎁') ? 'g' : '', label); b.onclick = fn; acts.append(b); }
      kids.push(acts);
    }
    box.replaceChildren(...kids);
    box.hidden = false;
    clearTimeout(this.cardTimer);
    if (autoHideMs) this.cardTimer = window.setTimeout(() => { box.hidden = true; }, autoHideMs);
  }
  hideCard(){ $('card').hidden = true; }

  // Bảng đám cưới: cô dâu, chú rể, đồng hồ lễ, giá cướp dâu, khách ăn cỗ, mừng cưới. elapsed: ms từ lúc nhận trạng thái.
  wedding(w: WeddingState, elapsed: number){
    const box = $('weddingBox'), left = Math.max(0, w.leftMs - elapsed), mm = Math.floor(left / 60000), ss = Math.floor(left / 1000) % 60;
    const role = (icon: string, label: string, r: WeddingState['bride'], empty: string) => {
      const d = el('div', 'wr' + (r ? '' : ' empty')); d.append(el('span', 'wi', icon), el('span', 'wl', label), el('b', '', r ? r.name : empty)); return d;
    };
    const status = w.phase === 'waiting' ? 'Chờ cô dâu: tặng quà bất kỳ để làm cô dâu'
      : w.phase === 'bride' ? 'Chờ chú rể: người khác tặng quà sẽ làm chú rể'
      : w.phase === 'married' ? `Lễ thành hôn · còn ${mm}:${String(ss).padStart(2, '0')}${w.steals ? ` · ${w.steals} lần cướp dâu` : ''}`
      : 'Rước dâu về nhà, trăm năm hạnh phúc!';
    const kids: HTMLElement[] = [el('div', 'wt', '💒 Đám cưới làng quê'), role('👰', 'Cô dâu', w.bride, 'đang chờ…'), role('🤵', 'Chú rể', w.groom, w.bride ? 'đang chờ…' : '—'), el('div', 'ws', status)];
    if (w.phase === 'married') kids.push(el('div', 'wsteal', `🏃 Cướp dâu: tặng từ ${w.stealPrice} xu`));
    kids.push(el('div', 'wg', `🍲 ${w.guests.length} khách ăn cỗ`));
    if (w.gifts.length){
      const ol = el('ol', 'wm');
      for (const g of w.gifts){ const li = el('li'); li.append(el('span', '', g.name), el('b', '', `${g.value} xu`)); ol.append(li); }
      kids.push(el('div', 'wl2', '🧧 Mừng cưới'), ol);
    }
    box.replaceChildren(...kids);
    const rules = $('weddingRules');
    if (!rules.childElementCount){
      for (const [icon, text] of [['👰', 'Tặng quà đầu tiên: làm cô dâu'], ['🤵', 'Tặng tiếp: làm chú rể'], ['🏃', 'Tặng từ mức cướp dâu: giành cô dâu'], ['🍲', 'Bình luận: vào mâm ăn cỗ']]){
        const d = el('div'); d.append(el('span', '', icon), el('span', '', text)); rules.append(d);
      }
    }
    const steal = rules.children[2]?.lastElementChild;
    if (steal) steal.textContent = `Tặng từ ${w.stealPrice} xu: cướp dâu`;
  }

  weddingBanner(icon: string, title: string, sub: string, kind: 'bride' | 'groom' | 'steal'){
    const b = $('banner');
    b.className = `gift wed ${kind}`;
    const head = el('div', 'gh'), txt = el('div');
    txt.append(el('b', '', title), el('small', '', sub));
    head.append(el('span', 'gi', icon), txt);
    b.replaceChildren(head);
    b.hidden = false;
    b.style.animation = 'none'; void b.offsetWidth; b.style.animation = '';
    clearTimeout(this.bannerTimer);
    this.bannerTimer = window.setTimeout(() => { b.hidden = true; }, 5000);
    this.confetti(kind === 'steal' ? 14 : 18, kind === 'steal' ? ['🏃', '💥', '❤️'] : ['🌸', '💐', '❤️', '💍']);
  }
  offline(down: boolean){ $('offline').hidden = !down; }
}

export { $, el };
