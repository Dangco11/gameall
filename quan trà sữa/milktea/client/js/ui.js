// Lớp giao diện quanh quán 3D. Mọi chữ từ người xem đi qua textContent, không bao giờ chèn HTML.
import { MENU, GROUPS, itemById, reactionFor, vipOf, VIP_LEVELS } from '/shared/menu.mjs';
import { SHOP_NAME, TAGLINE } from '/shared/brand.mjs';

const $ = s => document.querySelector(s);
const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
const fmt = n => Number(n || 0).toLocaleString('vi-VN');
const STATUS = { QUEUED: ['Chờ pha', 0], BREWING: ['Đang pha', 1], READY: ['Pha xong', 2], DELIVERING: ['Đang mang ra', 3], SERVED: ['Đã phục vụ', 4] };

export class UI {
  constructor({ thumbs }) {
    document.title = SHOP_NAME;
    $('#brandName').textContent = SHOP_NAME;
    this.thumbs = thumbs;
    this.tickets = new Map();
    this.bannerQueue = []; this.bannerBusy = false;
    this.buildMenu();
    this.buildPrices();
  }

  // Bảng giá gọn: mỗi mức xu một dòng với món mặc định và biểu cảm, đứng yên để người xem dễ dò.
  buildPrices() {
    const rows = [];
    for (const item of MENU) if (!rows.some(r => r.coins === item.coins)) rows.push(item);
    $('#priceList').replaceChildren(...rows.map(item => {
      const li = el('li', `price g-${item.g}`);
      li.dataset.coins = item.coins;
      li.append(el('span', 'px', `${fmt(item.coins)} xu`), el('span', 'pn', item.name + (item.limit ? ` (còn ${item.limit})` : '')), el('span', 'pe', reactionFor(item.coins).emoji));
      return li;
    }));
  }
  flashPrice(coins) {
    const row = document.querySelector(`.price[data-coins="${coins}"]`);
    if (row) { row.classList.remove('hit'); void row.offsetWidth; row.classList.add('hit'); }
  }

  // Chế độ giả lập ghi rõ trên màn hình để không ai nhầm khách mô phỏng là người xem thật.
  setMode(mode) {
    const tag = $('#tagline');
    tag.textContent = mode === 'sim' ? 'GIẢ LẬP · không phải người xem thật' : TAGLINE;
    tag.classList.toggle('simtag', mode === 'sim');
  }
  setTikTok(st) {
    const pill = $('#live'), map = { connected: ['LIVE', 'on'], simulated: ['GIẢ LẬP', 'sim'], reconnecting: ['Đang nối lại', 'warn'], connecting: ['Đang kết nối', 'warn'], error: ['Lỗi kết nối', 'off'], idle: ['Chưa kết nối', 'off'] };
    const [text, cls] = map[st.status] || map.idle;
    pill.textContent = text; pill.className = `live ${cls}`;
  }
  setStats(s) {
    $('#stInRoom').textContent = fmt(s.inRoom);
    $('#stSeated').textContent = `${fmt(s.seated)} ghế`;
    $('#stQueue').textContent = fmt(s.queued);
    $('#stSales').textContent = fmt(s.sales);
  }

  // Bảng top 10 tháng: ba hạng đầu khung vàng, bạc, đồng lấp lánh; ai vừa lên hạng thì dòng nháy sáng.
  setTop(month) {
    if (!month) return;
    $('#topTitle').textContent = `Top tháng ${month.label}`;
    const box = $('#vipList'), before = this.ranks || new Map();
    this.ranks = new Map(month.top.map((p, i) => [p.id, i + 1]));
    box.replaceChildren(...month.top.map((p, i) => {
      const vip = vipOf(p.level), rank = i + 1, row = el('li', `rank r${rank}${rank <= 3 ? ' podium' : ''}`);
      row.style.setProperty('--frame', vip.frame); row.style.setProperty('--ink', vip.text);
      if (before.size && (!before.has(p.id) || before.get(p.id) > rank)) row.classList.add('up');
      row.append(el('span', 'no', rank <= 3 ? ['🥇', '🥈', '🥉'][i] : String(rank)), el('span', 'nm', p.name), el('span', 'lv', vip.title), el('span', 'pt', fmt(p.points)));
      return row;
    }));
    if (!month.top.length) box.append(el('li', 'empty', 'Tháng mới bắt đầu, tặng quà để lên top'));
  }

  buildMenu() {
    const groups = Object.keys(GROUPS);
    this.pages = groups.map(g => MENU.filter(m => m.g === g)).reduce((pages, items) => {
      const last = pages[pages.length - 1];
      if (last && last.length + items.length <= 6) last.push(...items); else pages.push([...items]);
      return pages;
    }, []);
    this.page = 0;
    this.showMenuPage();
    setInterval(() => { this.page = (this.page + 1) % this.pages.length; this.showMenuPage(); }, 7000);
  }
  showMenuPage() {
    const grid = $('#menuGrid');
    grid.classList.remove('in'); void grid.offsetWidth;
    grid.replaceChildren(...this.pages[this.page].map(item => {
      const r = reactionFor(item.coins), tile = el('div', `tile g-${item.g}`);
      tile.dataset.id = item.id;
      const img = el('img'); img.src = this.thumbs.get(item.id) || ''; img.alt = '';
      tile.append(el('span', 'num', `#${item.id}`), img, el('b', 'nm', item.name), el('span', 'xu', `${fmt(item.coins)} xu`), el('span', 'rx', `${r.emoji} ${r.label}`));
      if (item.limit) tile.append(el('span', 'tag', `Giới hạn ${item.limit}`));
      return tile;
    }));
    $('#menuGroup').textContent = [...new Set(this.pages[this.page].map(i => GROUPS[i.g]))].join(' · ');
    grid.classList.add('in');
  }
  flashItem(id) {
    this.flashPrice(itemById(id)?.coins);
    const page = this.pages.findIndex(p => p.some(i => i.id === id));
    if (page >= 0 && page !== this.page) { this.page = page; this.showMenuPage(); }
    const tile = document.querySelector(`.tile[data-id="${id}"]`);
    if (tile) { tile.classList.remove('hit'); void tile.offsetWidth; tile.classList.add('hit'); }
  }

  order(o) {
    let t = this.tickets.get(o.id);
    const item = itemById(o.itemId);
    if (!t) {
      t = el('div', 'ticket');
      const img = el('img'); img.src = this.thumbs.get(o.itemId) || ''; img.alt = '';
      const body = el('div', 'tb');
      body.append(el('b', 'ti', item.name), el('span', 'tw', o.name), el('div', 'steps'));
      t.append(img, body, el('span', 'tc', `${fmt(o.coins)} xu`));
      for (let i = 0; i < 4; i++) t.querySelector('.steps').append(el('i'));
      t.append(el('span', 'st'));
      $('#orderList').prepend(t);
      this.tickets.set(o.id, t);
    }
    const [label, step] = STATUS[o.status] || STATUS.QUEUED;
    t.querySelector('.st').textContent = label;
    t.querySelectorAll('.steps i').forEach((d, i) => d.classList.toggle('on', i < step));
    t.dataset.status = o.status;
    if (o.status === 'SERVED') {
      setTimeout(() => { t.classList.add('out'); setTimeout(() => { t.remove(); this.tickets.delete(o.id); }, 600); }, 2500);
    }
    const list = $('#orderList');
    while (list.children.length > 7) { const last = list.lastElementChild; this.tickets.forEach((v, k) => { if (v === last) this.tickets.delete(k); }); last.remove(); }
    $('#orderCount').textContent = String([...this.tickets.values()].filter(x => x.dataset.status !== 'SERVED').length);
  }
  clearOrders() { $('#orderList').replaceChildren(); this.tickets.clear(); }

  ticker(text, kind = '') {
    const box = $('#ticker'), line = el('div', `tk ${kind}`, text);
    box.prepend(line);
    while (box.children.length > 4) box.lastElementChild.remove();
    setTimeout(() => line.classList.add('old'), 9000);
  }

  // Thông báo lớn giữa màn hình, xếp hàng để không đè nhau.
  banner(title, sub, { level = 1, kind = 'gift', ms = 3200 } = {}) {
    this.bannerQueue.push({ title, sub, level, kind, ms });
    if (this.bannerQueue.length > 4) this.bannerQueue.splice(1, 1);   // quà dồn: bỏ bớt cái cũ, giữ cái đang chờ mới nhất
    if (!this.bannerBusy) this.nextBanner();
  }
  nextBanner() {
    const b = this.bannerQueue.shift();
    if (!b) { this.bannerBusy = false; return; }
    this.bannerBusy = true;
    const box = $('#banner'), vip = vipOf(b.level);
    box.className = `banner ${b.kind}`;
    box.style.setProperty('--frame', vip.frame); box.style.setProperty('--ink', vip.text);
    box.replaceChildren(el('div', 'bt', b.title), el('div', 'bs', b.sub));
    void box.offsetWidth; box.classList.add('show');
    setTimeout(() => { box.classList.remove('show'); setTimeout(() => this.nextBanner(), 350); }, b.ms);
  }

  guest(p) {
    const card = $('#guest');
    if (!p) { card.classList.remove('show'); return; }
    const vip = vipOf(p.level), next = VIP_LEVELS[p.level];
    card.style.setProperty('--frame', vip.frame); card.style.setProperty('--ink', vip.text);
    const bar = el('div', 'bar'), fill = el('i');
    fill.style.width = next ? `${Math.min(100, (p.points - vip.min) / (next.min - vip.min) * 100)}%` : '100%';
    bar.append(fill);
    card.replaceChildren(el('div', 'gn', p.name), el('div', 'gl', `Cấp ${p.level} · ${vip.title}`), bar,
      el('div', 'gp', next ? `${fmt(p.points)} / ${fmt(next.min)} điểm VIP` : `${fmt(p.points)} điểm VIP · cấp cao nhất`),
      el('div', 'gf', p.favorite ? `Hay gọi: ${p.favorite}` : 'Khách mới của quán'));
    card.classList.add('show');
    clearTimeout(this.guestTimer);
    this.guestTimer = setTimeout(() => card.classList.remove('show'), 5000);
  }
}
