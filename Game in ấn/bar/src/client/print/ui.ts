import { TIERS, templateOf, tierOf } from '../../shared/print.ts';
import type { LiveStatus, PrintJob, PrintState, Stats } from '../../shared/types.ts';
import { levelInfo } from '../../shared/levels.ts';

// Giao diện chữ của studio. Chữ từ người xem chỉ đi qua textContent. Các bảng bám mép, chừa giữa cho máy in 3D.
export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
// Màn hình LIVE dọc lớn (1080×1920): phóng cả lớp chữ cho bằng cỡ khung 540 điểm; ?ui=1.5 đặt tay
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
// ảnh đại diện nhỏ: ảnh thật qua server; không có hay lỗi thì chữ cái đầu
export function avatarEl(id: string, name: string, has: boolean, cls = 'av'){
  const d = el('span', cls, ([...name.trim()].find(c => /\p{L}|\p{N}/u.test(c)) ?? '?').toUpperCase());
  if (has){ const img = document.createElement('img'); img.alt = ''; img.src = '/avatar/' + encodeURIComponent(id); img.onerror = () => img.remove(); d.append(img); }
  return d;
}

export class StudioUI {
  private bannerTimer = 0;
  private feed: HTMLElement[] = [];
  private nowKey = ''; private qKey = '';

  constructor(){
    const lg = $('legend');
    lg.append(el('div', 'ph', '🎁 Tặng quà → máy in'));
    for (const t of TIERS){
      const r = el('div', `gi t${t.no}`); r.dataset.tier = t.key;
      r.append(el('span', 'ic', t.icon), el('span', 'lb', t.name), el('b', 'xu', `${t.xu}+ xu`));
      lg.append(r);
    }
    const likeRow = el('div', 'gi like'); likeRow.append(el('span', 'ic', '❤️'), el('span', 'lb', 'Thả 50 tim'), el('b', 'xu', 'in free')); lg.append(likeRow);
    lg.append(el('div', 'more', '100 mẫu khung · quà càng lớn càng hiếm'));
  }

  stats(s: Stats){ $('online').textContent = `${s.realOnline} người xem`; }
  live(s: LiveStatus){
    const p = $('liveStatus');
    p.className = 'pill' + (s.status === 'connected' ? ' live' : s.status === 'reconnecting' || s.status === 'connecting' ? ' warn' : '');
    p.textContent = s.status === 'connected' ? `● LIVE @${s.uniqueId}` : s.status === 'reconnecting' ? `Đang nối lại @${s.uniqueId}` : s.status === 'connecting' ? 'Đang kết nối…' : s.status === 'error' ? 'Lỗi kết nối' : 'Chưa kết nối';
  }

  // thẻ "đang in": người tặng, quà, số lượng, mẫu khung, tiến độ, công đoạn
  now(st: PrintState, stage: string, progress: number){
    const box = $('now'), j = st.job ?? (st.phase === 'eject' ? st.sheet.jobs[st.sheet.jobs.length - 1] : null);
    box.hidden = !j;
    for (const r of $('legend').querySelectorAll<HTMLElement>('.gi')) r.classList.toggle('on', r.dataset.tier === j?.tier);
    if (!j) { this.nowKey = ''; return; }
    const key = `${j.n}|${st.phase}`;
    if (key !== this.nowKey){
      this.nowKey = key;
      const t = tierOf(j.tier), tpl = templateOf(j.tpl);
      box.className = `panel t${t.no}`;
      const info = el('div', 'ni');
      info.append(el('b', 'nn', j.name), el('span', 'ng', j.xu ? `${j.gift} ×${j.count} · ${j.xu.toLocaleString('vi-VN')} xu` : `${j.gift} · in miễn phí`));
      const tag = el('div', 'nt'); tag.append(el('span', 'rar', `${'★'.repeat(t.stars)} ${t.rarity}`), el('span', 'tp', `${tpl.name} · mẫu ${tpl.no}/100`));
      if (j.lv){ const L = levelInfo(j.lv); tag.append(el('span', 'lv', `${L.icon} Lv${j.lv}`)); }
      info.append(tag);
      box.replaceChildren(el('div', 'nh', st.phase === 'eject' ? '✂️ THÀNH PHẨM' : '🖨️ ĐANG IN'), avatarEl(j.id, j.name, j.avatar), info, el('div', 'ns'), Object.assign(el('div', 'pb'), {}));
      (box.lastChild as HTMLElement).append(el('i'));
    }
    (box.querySelector('.ns') as HTMLElement).textContent = `${stage} · ${Math.round(progress * 100)}%`;
    (box.querySelector('.pb i') as HTMLElement).style.width = `${Math.round(progress * 100)}%`;
  }

  // hàng đợi in: ai đang chờ, bậc in, còn bao nhiêu lượt
  queue(st: PrintState){
    const box = $('queue'), list = st.queue.slice(0, 6);
    const key = list.map(j => `${j.n}${j.id}${j.tier}${j.count}`).join(',') + '|' + st.waiting;
    if (key === this.qKey) return;
    this.qKey = key;
    box.hidden = !st.waiting;
    const kids: HTMLElement[] = [el('div', 'ph', `⏳ Hàng chờ in · ${st.waiting}`)];
    list.forEach((j, i) => {
      const t = tierOf(j.tier), r = el('div', `qr t${t.no}`);
      r.append(el('span', 'qn', String(i + 1)), avatarEl(j.id, j.name, j.avatar, 'av sm'), el('span', 'nm', j.name), el('span', 'qt', `${t.icon} ×${j.count}`));
      kids.push(r);
    });
    if (st.waiting > list.length) kids.push(el('div', 'more', `+${st.waiting - list.length} lượt nữa · không quà nào bị bỏ`));
    box.replaceChildren(...kids);
  }

  // bản in lớn: bảng chữ to trên cùng vài giây
  banner(title: string, sub: string, icon: string, level: number){
    const b = $('banner');
    b.className = 'lv' + level;
    const bt = el('div', 'bt'); bt.textContent = title;
    b.replaceChildren(el('span', 'bi', icon), bt, el('div', 'bs', sub));
    b.hidden = false;
    clearTimeout(this.bannerTimer);
    this.bannerTimer = window.setTimeout(() => { b.hidden = true; }, 3500 + level * 700);
  }

  note(text: string, cls = ''){
    if (!text) return;
    const li = el('li', cls, text), ul = $('feed');
    ul.prepend(li); this.feed.unshift(li);
    while (this.feed.length > 5) this.feed.pop()!.remove();
    setTimeout(() => li.classList.add('old'), 7000);
  }
  // bình luận: dòng chữ có ảnh đại diện nhỏ
  chat(id: string, name: string, text: string){
    const li = el('li', 'chat'), ul = $('feed');
    li.append(avatarEl(id, name, true, 'av xs'), el('b', '', name + ': '), el('span', '', text));
    ul.prepend(li); this.feed.unshift(li);
    while (this.feed.length > 5) this.feed.pop()!.remove();
    setTimeout(() => li.classList.add('old'), 6000);
  }
}
export type { PrintJob };
