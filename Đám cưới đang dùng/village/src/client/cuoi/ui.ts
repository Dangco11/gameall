import { GIFT_SHOW, WEDDING } from '../../shared/balance.ts';
import type { ShowKey } from '../../shared/balance.ts';
import type { LiveStatus, Stats, TopRow, WeddingState } from '../../shared/types.ts';

// Giao diện chữ của đám cưới. Mọi chữ từ người xem chỉ đi qua textContent.
export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
// Khung dọc lớn (vd. nguồn OBS 1080 x 1920): giao diện dàn trang theo khổ chuẩn rộng 540 rồi phóng đúng tỉ lệ,
// chữ được vẽ lại ở độ phân giải thật nên sắc nét, không bị nhỏ xíu hay mờ. view.w, view.h: kích thước khổ dàn trang; view.s: tỉ lệ phóng.
// Ép tỉ lệ bằng ?ui=2 (hay ?ui=1 để tắt).
export const view = { w: innerWidth, h: innerHeight, s: 1 };
export function fitView(){
  const q = new URLSearchParams(location.search).get('ui'), portrait = innerWidth / innerHeight < 0.8;
  const s = q ? Math.max(0.5, Math.min(4, +q || 1)) : portrait && innerWidth > 600 ? innerWidth / 540 : 1;
  view.s = s; view.w = innerWidth / s; view.h = innerHeight / s;
  const app = document.getElementById('app');
  if (app) Object.assign(app.style, s === 1 ? { width: '', height: '', right: '', bottom: '', transform: '', transformOrigin: '' }
    : { width: view.w + 'px', height: view.h + 'px', right: 'auto', bottom: 'auto', transform: `scale(${s})`, transformOrigin: '0 0' });
}
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''){
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

export class WeddingUI {
  private bannerTimer = 0;

  // chỉ đếm người xem thật, không tính khách ảo DEMO
  stats(s: Stats){ $('online').textContent = `${s.realOnline} khách đang xem`; }

  live(s: LiveStatus){
    const p = $('liveStatus');
    p.className = 'pill' + (s.status === 'connected' ? ' live' : s.status === 'reconnecting' || s.status === 'connecting' ? ' warn' : '');
    p.textContent = s.status === 'connected' ? `● LIVE @${s.uniqueId}` : s.status === 'reconnecting' ? `Đang nối lại @${s.uniqueId}` : s.status === 'connecting' ? 'Đang kết nối…' : s.status === 'error' ? 'Lỗi kết nối' : 'Chưa kết nối';
  }

  // Bảng cô dâu, chú rể, đồng hồ lễ, giá cướp dâu, mừng cưới. elapsed: ms từ lúc nhận trạng thái
  wedding(w: WeddingState, elapsed: number){
    const box = $('weddingBox'), left = Math.max(0, w.leftMs - elapsed), mm = Math.floor(left / 60000), ss = Math.floor(left / 1000) % 60;
    const role = (icon: string, label: string, r: WeddingState['bride'], empty: string) => {
      const d = el('div', 'wr' + (r ? '' : ' empty')); d.append(el('span', 'wi', icon), el('span', 'wl', label), el('b', '', r ? r.name : empty)); return d;
    };
    const status = w.phase === 'waiting' ? '👉 Muốn làm cô dâu, chú rể? Xem Cách chơi ở khung bên dưới'
      : w.phase === 'bride' ? `👉 Đang thiếu chú rể: bình luận "nam" rồi tặng đúng ${WEDDING.joinXu} xu`
      : w.phase === 'groom' ? `👉 Đang thiếu cô dâu: bình luận "nữ" rồi tặng đúng ${WEDDING.joinXu} xu`
      : w.phase === 'married' ? stepText(w, elapsed) + (w.steals ? ` · ${w.steals} lần cướp` : '')
      : '💑 Cô dâu chú rể nắm tay vào nhà, trăm năm hạnh phúc!';
    const kids: HTMLElement[] = [el('div', 'wt', '💒 Đám cưới làng quê'), role('👰', 'Cô dâu', w.bride, 'đang chờ…'), role('🤵', 'Chú rể', w.groom, 'đang chờ…'), el('div', 'ws', status)];
    if (w.phase === 'married') kids.push(el('div', 'wsteal', `🏃 ${w.stealPrice} xu: nam cướp dâu · 💃 nữ cướp rể`));
    // chưa đủ cô dâu chú rể: đếm ngược 3 phút, hết giờ làng chọn ngẫu nhiên người trong phòng
    else if (w.autoLeftMs > 0 && (w.phase === 'waiting' || w.phase === 'bride' || w.phase === 'groom')){
      const left = Math.max(0, w.autoLeftMs - elapsed), s = Math.ceil(left / 1000);
      const d = el('div', 'wauto' + (s <= 30 ? ' soon' : ''));
      d.append(el('b', 'wclock', `⏳ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`), el('span', '', ' nữa làng chọn ngẫu nhiên cô dâu chú rể trong phòng'));
      kids.push(d);
    }
    kids.push(el('div', 'wg', `🍲 ${w.guests.length} khách dự cưới`));
    if (w.gifts.length){
      const ol = el('ol', 'wm');
      for (const g of w.gifts){ const li = el('li'); li.append(el('span', '', g.name), el('b', '', `${g.value} xu`)); ol.append(li); }
      kids.push(el('div', 'wl2', '🧧 Mừng cưới'), ol);
    }
    box.replaceChildren(...kids);
    this.giftList();
    // sàn nhảy: khung quà đổi sang bảng quà skill nhảy
    const floor = w.phase === 'married' && w.step === 'dance' && !w.pk;
    $('giftList').classList.toggle('dance', floor);
    if (floor){
      const s = Math.ceil(Math.max(0, w.stepLeftMs - elapsed) / 1000), c = $('danceClock');
      c.textContent = `⏳ ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
      c.classList.toggle('soon', s <= 30);
    }
    // sàn nhảy: bảng quà đẩy lên thế chỗ bảng Đám cưới làng quê (bảng này ẩn đi) để máy quay thấy trọn người nhảy; hết nhảy trở lại như cũ
    document.body.classList.toggle('floor', floor);
    // 9:16: Bảng quà bám ngay dưới bảng cô dâu chú rể (bảng này cao thấp tùy nội dung)
    const gl = $('giftList');
    gl.style.top = !floor && innerWidth / innerHeight < 0.8 ? `${Math.round(box.getBoundingClientRect().bottom / view.s + 6)}px` : '';
  }

  // Bảng quà cho người xem: tặng bao nhiêu xu thì được gì. Giá cướp dâu tự cập nhật theo chú rể.
  // Cách chơi và bảng quà chung một khung, chia đôi: nửa trái Cách chơi luôn hiện,
  // nửa phải thẻ quà mỗi lần 3 thẻ, tự lật 5 giây một lần
  private page = 0; private pageTimer = 0;
  private showPage(p: number){
    this.page = p % GIFT_SLIDES.length;
    $('giftHead').textContent = `${GIFT_SLIDES[this.page].title}  ${this.page + 1}/${GIFT_SLIDES.length}`;
    for (const r of $('giftList').querySelectorAll<HTMLElement>('.gside .gc')) r.style.display = r.dataset.page === String(this.page) ? '' : 'none';
    this.pageTimer = window.setTimeout(() => this.showPage(this.page + 1), 5000);
  }

  private giftList(){
    const box = $('giftList');
    if (!box.childElementCount){
      const left = el('div', 'ghow'), right = el('div', 'gside');
      const how = el('div', 'howto');
      for (const [n, t] of HOW_TO){ const r = el('div', 'hs'); r.append(el('b', 'hn', n), el('span', '', t)); how.append(r); }
      left.append(el('div', 'gh2', '📜 Cách chơi'), how);
      const head = el('div', 'gh2'); head.id = 'giftHead';
      right.append(head);
      GIFT_SLIDES.forEach((pg, page) => {
        for (const c of pg.cards){
          const e = card(c); e.dataset.page = String(page); right.append(e);
        }
      });
      // bảng quà sàn nhảy, chỉ hiện lúc mở sàn nhảy sau cắt bánh
      const dance = el('div', 'gdance'), grid = el('div', 'gdgrid');
      for (const c of DANCE_CARDS) grid.append(card(c));
      // đồng hồ đếm ngược sàn nhảy chung dòng với lời nhắc máy quay cận (bảng Đám cưới làng quê ẩn lúc nhảy)
      const note = el('div', 'gdnote'), clock = el('b', 'gdclock'); clock.id = 'danceClock';
      note.append(clock, el('span', '', `🎥 Tặng quà: máy quay cận bạn nhảy ${WEDDING.danceFocusMs / 1000} giây`));
      dance.append(el('div', 'gh2', '💃 Bảng quà sàn nhảy'), grid, note);
      box.append(left, right, dance);
    }
    if (!this.pageTimer) this.showPage(0);
  }

  // Anh phục vụ hô to ai gọi bia, gọi món: khung hình anh phục vụ bê khay, miệng hô, kèm tên người gọi và số mâm.
  // Gọi dồn dập thì gộp tên vào cùng một khung thay vì bật liên tục.
  private waiterTimer = 0; private waiterNames: string[] = []; private waiterKind = '';
  private waiterBox(){
    let box = document.getElementById('waiterBox');
    if (!box){
      box = el('div', 'waiterBox'); box.id = 'waiterBox'; box.hidden = true;
      const pic = el('div', 'wpic'); pic.innerHTML = WAITER_SVG;          // hình vẽ cố định, không có chữ người xem
      const txt = el('div', 'wtxt'); txt.append(el('b', 'wshout'), el('span', 'wwho'), el('small', 'wtab'));
      box.append(pic, txt); $('app').append(box);
    }
    return box;
  }
  private showWaiter(box: HTMLElement, ms: number){
    box.hidden = false;
    box.style.animation = 'none'; void box.offsetWidth; box.style.animation = '';
    clearTimeout(this.waiterTimer);
    this.waiterTimer = window.setTimeout(() => { box.hidden = true; }, ms);
  }
  // Lâu chưa ai gọi bia: anh phục vụ bê khay bia đi mời cả sân
  waiterAsk(line: string){
    const box = this.waiterBox();
    this.waiterKind = 'ask'; this.waiterNames = [];
    box.className = 'waiterBox beer';
    box.querySelector('.wshout')!.textContent = '🍺 BIA LẠNH ĐÂY!!!';
    box.querySelector('.wwho')!.textContent = 'Ai gọi bia không ạ?';
    box.querySelector('.wtab')!.textContent = line;
    this.showWaiter(box, 6000);
  }
  waiter(kind: 'beer' | 'food', name: string, table: number){
    const box = this.waiterBox();
    if (box.hidden || this.waiterKind !== kind){ this.waiterNames = []; this.waiterKind = kind; }
    this.waiterNames = [name, ...this.waiterNames.filter(n => n !== name)].slice(0, 12);
    const n = this.waiterNames, who = n.length === 1 ? n[0] : n.length === 2 ? `${n[0]} và ${n[1]}` : `${n[0]}, ${n[1]} và ${n.length - 2} người nữa`;
    box.className = 'waiterBox ' + kind;
    box.querySelector('.wshout')!.textContent = kind === 'beer' ? '🍺 BIA ĐÂY!!!' : '🍗 MÓN ĐÂY!!!';
    box.querySelector('.wwho')!.textContent = `${who} ${kind === 'beer' ? 'gọi bia' : 'gọi thêm món'}`;
    box.querySelector('.wtab')!.textContent = n.length === 1 ? `Phục vụ bê ra mâm số ${table}, có ngay!` : 'Phục vụ chạy bàn liên tục, có ngay!';
    this.showWaiter(box, 4200);
  }

  // Chữ to giữa màn hình khi cả sân hô: MỘT! HAI! BA! DZÔ!
  private chantTimer = 0;
  chant(text: string, big = false){
    let c = document.getElementById('chant');
    if (!c){ c = el('div'); c.id = 'chant'; $('app').append(c); }
    c.textContent = text; c.className = big ? 'big' : '';
    c.hidden = false;
    c.style.animation = 'none'; void c.offsetWidth; c.style.animation = '';
    clearTimeout(this.chantTimer);
    this.chantTimer = window.setTimeout(() => { c!.hidden = true; }, big ? 1100 : 480);
  }


  // Dải top 3 quà cưới tháng trên cùng màn hình: vẽ lại khi đổi người hoặc đổi số xu
  private topKey = '';
  top(rows: TopRow[], month: string){
    const key = JSON.stringify([rows, month]);
    if (key === this.topKey) return;
    this.topKey = key;
    let box = document.getElementById('topBox');
    if (!box){ box = el('div'); box.id = 'topBox'; $('app').append(box); }
    const kids: HTMLElement[] = [el('b', 'tt', `🏆 Top quà cưới T${+month.slice(5) || ''}`)];
    if (!rows.length) kids.push(el('span', 'te', 'Chưa có ai, tặng quà để lên bảng!'));
    rows.forEach((r, i) => { const c = el('span', 'tc t' + (i + 1)); c.append(el('i', '', MEDALS[i]), el('span', 'tn', r.name), el('b', '', fmtXu(r.xu))); kids.push(c); });
    box.replaceChildren(...kids);
  }

  banner(icon: string, title: string, sub: string, kind: 'bride' | 'groom' | 'steal'){
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
    this.confetti(kind === 'steal' ? 12 : 18, kind === 'steal' ? ['🏃', '💥', '❤️'] : ['🌸', '💐', '❤️', '💍']);
  }

  feed(text: string, kind: '' | 'gift' | 'note' = ''){
    if (!text) return;
    const ul = $('feedFloat'), li = el('li', kind, text);
    ul.prepend(li);
    while (ul.children.length > 3) ul.lastElementChild!.remove();
    // hiện 5 giây rồi mờ dần và biến mất, không che sân
    setTimeout(() => { li.classList.add('out'); setTimeout(() => li.remove(), 600); }, 5000);
  }

  confetti(n: number, icons: string[]){
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

  offline(down: boolean){ $('offline').hidden = !down; }

  // Phụ đề lời MC, giữ 14 giây
  private mcTimer = 0;
  mc(text: string){
    const c = $('mcCaption');
    c.replaceChildren(el('b', '', '🎤 MC: '), document.createTextNode(text));
    c.hidden = false;
    c.style.animation = 'none'; void c.offsetWidth; c.style.animation = '';
    clearTimeout(this.mcTimer);
    this.mcTimer = window.setTimeout(() => { c.hidden = true; }, 14_000);
  }
}

export const MEDALS = ['🥇', '🥈', '🥉'];
const fmtXu = (n: number) => n >= 10_000 ? `${(n / 1000).toFixed(n >= 100_000 ? 0 : 1).replace('.0', '')}k xu` : `${n.toLocaleString('vi-VN')} xu`;

// Bảng quà dạng thẻ: huy hiệu tròn bóng kiểu 3D có hình quà to, tên quà, giá xu nổi bật, mô tả ngắn hành động.
// Mỗi trang 6 thẻ (2 cột, 3 hàng), xếp theo giá. tone: màu huy hiệu.
type Card = { icon: string; name: string; price: string; desc: string; tone: string };
const CARD_INFO: Record<ShowKey, [string, string, string]> = {
  beer: ['Gọi bia', 'Phục vụ bê bia ra mâm', 'gold'], food: ['Gọi món', 'Thêm món nóng ra mâm', 'orange'],
  confetti: ['Pháo giấy', 'Hai ống pháo giấy nổ tung', 'pink'], fireworks: ['Pháo hoa', 'Trời tối, pháo hoa rực rỡ', 'blue'],
  toast: ['Nâng ly', 'Cả tiệc hô DZÔ 3 lần', 'gold'], dance: ['Sàn nhảy', 'Cả sân nhảy nhạc sàn xưa', 'purple'],
  heartRain: ['Mưa tim', 'Tim hồng rơi khắp sân', 'pink'], lion: ['Múa lân', 'Lân vào sân múa chúc', 'red'],
  lantern: ['Đèn trời', 'Hoàng hôn, thả đèn trời', 'orange'], rainbow: ['Cầu vồng', 'Cầu vồng, mưa hoa vàng', 'green'],
  grand: ['Pháo tim', 'Tên bạn sáng trên trời', 'red'],
};
const show = (xu: number): Card[] => GIFT_SHOW.filter(g => g.xu === xu).map(g => ({ icon: g.icon, name: CARD_INFO[g.key][0], price: `${g.xu} xu`, desc: CARD_INFO[g.key][1], tone: CARD_INFO[g.key][2] }));
export const GIFT_PAGES: { title: string; cards: Card[] }[] = [
  { title: '🎁 Quà nhỏ', cards: [
    ...show(1),
    { icon: '💍', name: 'Vào vai', price: `${WEDDING.joinXu} xu`, desc: 'Làm cô dâu, chú rể (vai trống)', tone: 'pink' },
    ...show(5), ...show(10), ...show(30),
    { icon: '🏃', name: 'Cướp dâu, rể', price: `${WEDDING.cuop} xu`, desc: 'Nam cướp dâu, nữ cướp rể', tone: 'red' },
  ] },
  { title: '✨ Quà lớn', cards: [...show(99), ...show(200), ...show(299), ...show(500), ...show(1000), ...show(1500)] },
  { title: '👑 Siêu quà và thêm', cards: [
    ...show(2000),
    { icon: '👗', name: 'Áo mới', price: 'Từ 20 xu', desc: 'Đổi trang phục mới', tone: 'purple' },
    { icon: '⏰', name: 'Thêm giờ', price: 'Mỗi 40 xu', desc: '+20 giây lễ cưới', tone: 'blue' },
    { icon: '❤️', name: 'Vào dự', price: 'Tim, chat', desc: 'Ngồi mâm ăn cỗ', tone: 'green' },
  ] },
];
function card(c: Card){
  const e = el('div', 'gc tone-' + c.tone);
  const badge = el('div', 'gbadge'); badge.append(el('span', 'gemo', c.icon));
  const body = el('div', 'gbody'), top = el('div', 'gtop');
  top.append(el('b', 'gname', c.name), el('span', 'gprice', c.price));
  body.append(top, el('div', 'gdesc', c.desc));
  e.append(badge, body);
  return e;
}
const DANCE_CARDS: Card[] = [
  { icon: '❤️', name: 'Thả tim', price: 'Tim', desc: 'Nhảy theo nhạc', tone: 'green' },
  { icon: '💃', name: 'Múa đẹp', price: `${WEDDING.danceXu.pretty} xu`, desc: 'Dang tay xoay uyển chuyển', tone: 'pink' },
  { icon: '🌀', name: 'Skill VIP', price: `${WEDDING.danceXu.vip} xu`, desc: 'Xoay đầu, lộn nhào, xoay tít', tone: 'purple' },
  { icon: '🔥', name: 'Combo skill', price: `${WEDDING.danceXu.combo} xu`, desc: 'Nối 4 skill liên hoàn', tone: 'red' },
];
// Nửa phải khung chỉ đủ chỗ một cột: cắt mỗi trang quà thành từng lượt 3 thẻ để lật
const GIFT_SLIDES = GIFT_PAGES.flatMap(pg => Array.from({ length: Math.ceil(pg.cards.length / 3) }, (_, i) => ({ title: pg.title, cards: pg.cards.slice(i * 3, i * 3 + 3) })));
// Câu ngắn gọn cho vừa nửa khung
const HOW_TO: [string, string][] = [
  ['1', 'Bình luận "nam" hoặc "nữ" để chọn vai'],
  ['2', `Tặng đúng ${WEDDING.joinXu} xu (3 bông hoa cũng được): nữ làm 👰 cô dâu, nam làm 🤵 chú rể`],
  ['3', `Vai có người rồi? Tặng ${WEDDING.cuop} xu: nam cướp dâu, nữ cướp rể`],
  ['✨', 'Mỗi mức quà một màn riêng, xem thẻ quà bên cạnh'],
];

// Anh phục vụ chibi: áo trắng gi-lê đen nơ đỏ, mắt nhắm tít, miệng há to hô, tay khum bên miệng, tay kia đỡ khay bia (hoặc đĩa gà quay)
const WAITER_SVG = `<svg viewBox="0 0 130 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<path d="M28 150 Q30 96 65 92 Q100 96 102 150Z" fill="#fff" stroke="#ddd"/>
<path d="M44 150 L48 100 L60 112 L56 150Z M86 150 L82 100 L70 112 L74 150Z" fill="#1c1c22"/>
<path d="M65 96 l-11 -6 v12z M65 96 l11 -6 v12z" fill="#d61f2c"/><circle cx="65" cy="96" r="3" fill="#a3141f"/>
<path d="M34 112 Q20 96 22 74" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round"/>
<circle cx="22" cy="72" r="7" fill="#f6d2b4"/>
<ellipse cx="22" cy="66" rx="22" ry="4.5" fill="#cfd3da" stroke="#9aa0a8"/>
<g class="mugs"><rect x="6" y="42" width="13" height="21" rx="2.5" fill="#f2a92a" stroke="#b8781a"/><rect x="24" y="42" width="13" height="21" rx="2.5" fill="#f2a92a" stroke="#b8781a"/>
<ellipse cx="12.5" cy="42" rx="8" ry="4.5" fill="#fffbea"/><ellipse cx="30.5" cy="42" rx="8" ry="4.5" fill="#fffbea"/>
<path d="M19 47 h4 v9 h-4" fill="none" stroke="#b8781a" stroke-width="2.4"/><path d="M37 47 h4 v9 h-4" fill="none" stroke="#b8781a" stroke-width="2.4"/></g>
<g class="dish"><ellipse cx="22" cy="58" rx="15" ry="8" fill="#e8742a"/><ellipse cx="17" cy="55" rx="5" ry="3" fill="#ffb060"/><path d="M33 56 q6 -6 10 -2" stroke="#fff" stroke-width="3" fill="none"/></g>
<path d="M96 112 Q110 96 99 76" stroke="#fff" stroke-width="13" fill="none" stroke-linecap="round"/>
<circle cx="65" cy="54" r="31" fill="#f6d2b4"/>
<path d="M34 50 Q36 20 66 21 Q95 21 96 50 Q88 34 66 35 Q44 34 34 50Z" fill="#1a1210"/>
<path d="M47 50 q6 -6 12 0 M71 50 q6 -6 12 0" stroke="#2a160c" stroke-width="3.2" fill="none" stroke-linecap="round"/>
<ellipse cx="44" cy="62" rx="6" ry="3.5" fill="#f59aa6" opacity=".8"/><ellipse cx="86" cy="62" rx="6" ry="3.5" fill="#f59aa6" opacity=".8"/>
<ellipse class="mouth" cx="65" cy="70" rx="10" ry="9" fill="#7a1420"/><ellipse cx="65" cy="75" rx="6" ry="3.5" fill="#f07a8a"/>
<circle cx="97" cy="70" r="7.5" fill="#f6d2b4"/>
<g class="yell" stroke="#ffd23a" stroke-width="4" stroke-linecap="round" fill="none"><path d="M110 58 l12 -8"/><path d="M112 70 h14"/><path d="M110 82 l12 8"/></g>
</svg>`;

function stepText(w: WeddingState, elapsed: number){
  const t = (ms: number) => { const left = Math.max(0, ms - elapsed); return `${Math.floor(left / 60000)}:${String(Math.floor(left / 1000) % 60).padStart(2, '0')}`; };
  return w.step === 'introBride' ? `🎤 Giới thiệu cô dâu · ${t(w.stepLeftMs)}`
    : w.step === 'introGroom' ? `🎤 Giới thiệu chú rể · ${t(w.stepLeftMs)}`
    : w.step === 'giaTien' ? `🙏 Lễ gia tiên · ${t(w.stepLeftMs)}`
    : w.step === 'rings' ? `💍 Trao nhẫn · ${t(w.stepLeftMs)} · Mời khách trao quà: 🥇 10 xu = 1 chỉ vàng, ❤️ thả tim = phong bì`
    : w.step === 'ruou' ? `🍷 Rượu giao bôi · ${t(w.stepLeftMs)}`
    : w.step === 'dance' ? `💃 Sàn nhảy · ${t(w.stepLeftMs)} · Thả tim là nhảy, tặng quà ra skill`
    : w.step === 'banh' ? `🎂 Cắt bánh cưới · ${t(w.stepLeftMs)}`
    : `🥂 Tiệc cưới · còn ${t(w.leftMs)}`;
}
