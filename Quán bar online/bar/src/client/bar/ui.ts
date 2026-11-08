import * as THREE from 'three';
import { BAR, BAR_GIFTS, DRINKS, drinkOf } from '../../shared/bar.ts';
import type { BarShowKey } from '../../shared/bar.ts';
import type { BarBattle, BarState, LiveStatus, Stats } from '../../shared/types.ts';
import { DANCE_GROUPS, danceByNo } from '../../shared/dances.ts';
import { levelInfo } from '../../shared/levels.ts';

// Giao diện chữ của quán. Chữ từ người xem chỉ đi qua textContent. Các bảng nằm sát mép màn hình, chừa giữa cho cảnh 3D.
export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
// Màn hình LIVE dọc lớn (điện thoại xoay, màn 1080×1920): phóng cả lớp chữ cho bằng cỡ khung 540 điểm; ?ui=1.5 đặt tay
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
const MEDALS = ['🥇', '🥈', '🥉'];
const STATUS: Record<string, string> = { queued: '⏳', making: '🍸', serving: '🚶' };

export class BarUI {
  private bannerTimer = 0;
  private feed: HTMLElement[] = [];
  private tags = new Map<string, { box: HTMLDivElement; nm: HTMLSpanElement; bub: HTMLDivElement; key: string; bubbleUntil: number }>();
  private lastShow = '';

  constructor(){
    // thực đơn và thang quà vẽ một lần
    // chỉ một dòng hướng dẫn: thả tim là vào quán, ra sàn nhảy
    const menu = $('menu');
    menu.classList.add('heartHint');
    menu.append(el('div', 'hh', '❤️ Thả tim để vào nhảy'));
    $('orders').hidden = true;
    const gl = $('gifts');
    gl.append(el('div', 'ph', '🎁 QUÀ CÀNG NHIỀU XU CÀNG VIP'), el('div', 'ph2', '🎁 Càng nhiều xu càng VIP'));
    for (const g of BAR_GIFTS){
      const r = el('div', `gi lv${g.level}`); r.dataset.key = g.key;
      r.append(el('b', 'xu', `${g.xu} xu`), el('span', 'ic', g.icon), el('span', 'lb', g.label), el('span', 'sl', g.short));
      gl.append(r);
    }
  }

  stats(s: Stats){ $('online').textContent = `${s.realOnline} khách đang xem`; }
  live(s: LiveStatus){
    const p = $('liveStatus');
    p.className = 'pill' + (s.status === 'connected' ? ' live' : s.status === 'reconnecting' || s.status === 'connecting' ? ' warn' : '');
    p.textContent = s.status === 'connected' ? `● LIVE @${s.uniqueId}` : s.status === 'reconnecting' ? `Đang nối lại @${s.uniqueId}` : s.status === 'connecting' ? 'Đang kết nối…' : s.status === 'error' ? 'Lỗi kết nối' : 'Chưa kết nối';
  }

  bar(b: BarState, elapsed: number){
    // top quà tháng
    const top = $('vipTop');
    const kids: HTMLElement[] = [el('div', 'ph', `👑 TOP VIP tháng ${b.month.slice(5)}/${b.month.slice(0, 4)}`)];
    b.top.forEach((r, i) => { const d = el('div', 'tr top' + (i + 1)); d.append(el('span', '', MEDALS[i]), el('span', 'nm', r.name), el('b', '', `${r.xu} xu`)); kids.push(d); });
    if (!b.top.length) kids.push(el('div', 'more', 'Chưa có ai, tặng quà để lên bảng!'));
    top.replaceChildren(...kids);
    // màn đang diễn trên sân khấu
    const sb = $('showBar');
    if (b.show){
      const g = BAR_GIFTS.find(x => x.key === b.show!.key), left = Math.max(0, b.show.leftMs - elapsed);
      if (this.lastShow !== b.show.key + b.show.id){ this.lastShow = b.show.key + b.show.id; sb.replaceChildren(el('span', 'ic', g?.icon ?? '✨'), el('span', 'tx', `${g?.label ?? ''} · ${b.show.name}`), el('i', 'bar')); }
      (sb.querySelector('.bar') as HTMLElement).style.width = `${(left / b.show.ms) * 100}%`;
      sb.hidden = false;
      if (b.next.length) sb.dataset.next = `chờ: ${b.next.map(n => BAR_GIFTS.find(x => x.key === n.key)?.icon).join(' ')}`; else delete sb.dataset.next;
    } else { sb.hidden = true; this.lastShow = ''; }
    for (const r of $('gifts').querySelectorAll<HTMLElement>('.gi')) r.classList.toggle('on', r.dataset.key === b.show?.key);
  }

  // quà lớn: bảng chữ to trên cùng, vài giây rồi tắt
  banner(title: string, sub: string, icon: string, level: number){
    const b = $('banner');
    b.className = 'lv' + level;
    b.replaceChildren(el('span', 'bi', icon), Object.assign(el('div', 'bt'), {}), el('div', 'bs', sub));
    (b.children[1] as HTMLElement).textContent = title;
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

  // nhãn tên bám trên đầu khách: tên, VIP, ly đang cầm; bình luận hiện thành bong bóng chữ
  bubble(id: string, text: string){ const t = this.tags.get(id); if (t){ t.bub.textContent = text; t.bubbleUntil = performance.now() + 5000; } else this.pendingBubble.set(id, text); }
  private pendingBubble = new Map<string, string>();
  tagsUpdate(list: { id: string; name: string; lvl?: number; vip: boolean; drink: string; head: THREE.Vector3 | null; show: boolean; sim: boolean; dance?: string }[], camera: THREE.Camera){
    const box = $('tags'), seen = new Set<string>(), now = performance.now(), v = new THREE.Vector3();
    for (const g of list){
      if (!g.head || !g.show) continue;
      // đầu còn trong khung hình thì luôn hiện tên (tên sát mép trên / mép bên thì ép vào trong khung, không ẩn đi)
      v.copy(g.head).project(camera);
      if (v.z > 1 || v.x < -1.08 || v.x > 1.08 || v.y < -1.1 || v.y > 1.08) continue;
      v.copy(g.head).setY(g.head.y + 0.32).project(camera);
      if (v.z > 1) continue;
      seen.add(g.id);
      let t = this.tags.get(g.id);
      if (!t){
        const b = el('div', 'tag') as HTMLDivElement, nm = el('span', 'tn') as HTMLSpanElement, bub = el('div', 'tb') as HTMLDivElement;
        b.append(bub, nm); box.append(b);
        t = { box: b, nm, bub, key: '', bubbleUntil: 0 }; this.tags.set(g.id, t);
        const pb = this.pendingBubble.get(g.id); if (pb){ bub.textContent = pb; t.bubbleUntil = now + 5000; this.pendingBubble.delete(g.id); }
      }
      const key = `${g.name}|${g.vip}|${g.drink}|${g.sim}|${g.dance ?? ''}|${g.lvl ?? 0}`;
      if (t.key !== key){ t.key = key; t.nm.textContent = `${g.vip ? '👑 ' : ''}${g.name}${g.drink && !g.dance ? ' ' + g.drink : ''}`; if (g.lvl){ const L = levelInfo(g.lvl); const b = el('i', 'lv lv' + g.lvl, `${L.icon} Lv${g.lvl}`); b.title = L.name; t.nm.prepend(b); } t.box.dataset.lv = String(g.lvl ?? 0); if (g.sim) t.nm.append(el('i', 'demo', 'DEMO')); if (g.dance) t.nm.append(el('i', 'dn', g.dance)); t.box.classList.toggle('vip', g.vip); t.box.classList.toggle('dancing', !!g.dance); }
      t.bub.hidden = now > t.bubbleUntil;
      const x = Math.max(46, Math.min(view.w - 46, (v.x * 0.5 + 0.5) * view.w)), y = Math.max(t.bub.hidden ? 20 : 42, Math.min(view.h - 4, (-v.y * 0.5 + 0.5) * view.h)), d = Math.max(0.55, Math.min(1.1, 1.4 - (v.z - 0.9) * 8));
      t.box.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%) scale(${d.toFixed(2)})`;
    }
    for (const [id, t] of this.tags) if (!seen.has(id)){ t.box.remove(); this.tags.delete(id); }
    if (this.pendingBubble.size > 100) this.pendingBubble.clear();
  }
  showKey(k: BarShowKey | ''){ document.body.dataset.show = k; }

  // Dance Battle: ảnh đại diện, tên, thanh năng lượng từng người, vòng đấu, điệu đang nhảy, giờ còn lại
  private battleKey = '';
  battle(b: BarBattle | null, elapsed: number){
    const box = $('battleBox');
    if (!b){ box.hidden = true; this.battleKey = ''; return; }
    box.hidden = false;
    const max = Math.max(1, ...b.performers.map(p => p.energy)), cur = b.performers[b.turn];
    const key = b.n + ':' + b.performers.map(p => p.id).join(',');
    if (key !== this.battleKey){
      this.battleKey = key;
      const rows = b.performers.map(p => {
        const r = el('div', 'bp'); r.dataset.id = p.id;
        const av = el('div', 'av', (p.name.trim()[0] ?? '?').toUpperCase());
        if (p.avatar){ const img = document.createElement('img'); img.src = '/avatar/' + encodeURIComponent(p.id); img.alt = ''; img.onerror = () => img.remove(); av.append(img); }
        const bar = el('div', 'eb'), fill = el('i'); bar.append(fill);
        r.append(av, el('span', 'bn', p.name), bar, el('b', 'bv', '0'));
        return r;
      });
      box.replaceChildren(el('div', 'bt', '⚔️ DANCE BATTLE'), el('div', 'bs'), ...rows);
    }
    const d = b.dance ? danceByNo(b.dance) : null, left = Math.ceil(Math.max(0, b.leftMs - elapsed) / 1000);
    (box.querySelector('.bs') as HTMLElement).textContent = b.phase === 'intro' ? 'Chuẩn bị… bình luận, thả tim để cổ vũ!' : b.phase === 'victory'
      ? `🏆 ${cur?.name ?? ''} thắng! ${d ? d.name : ''}` : `Vòng ${b.round}/${b.rounds} · ${cur?.name ?? ''}: ${d ? `${DANCE_GROUPS[d.group].icon} ${d.name}` : ''} · ${left}s`;
    for (const r of box.querySelectorAll<HTMLElement>('.bp')){
      const p = b.performers.find(x => x.id === r.dataset.id); if (!p) continue;
      (r.querySelector('.eb i') as HTMLElement).style.width = `${Math.round(p.energy / max * 100)}%`;
      (r.querySelector('.bv') as HTMLElement).textContent = String(p.energy);
      r.classList.toggle('on', p.id === cur?.id && b.phase !== 'intro');
      r.classList.toggle('win', b.phase === 'victory' && p.id === b.winner);
    }
  }
}
