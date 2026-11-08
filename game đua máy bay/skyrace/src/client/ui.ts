import { COLORS, PICKABLE, RACE, SKILLS, fmtTime, planeName, skillOf } from '../shared/game.ts';
import type { MapDef } from '../shared/maps.ts';
import type { Boards, Fx, LiveStatus, RaceState, RacerPub } from '../shared/types.ts';

// Giao diện chữ trên màn hình. Mọi chữ từ người xem chỉ đi qua textContent.
export const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
export function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''){
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}
// Khung dọc lớn (vd. OBS 1080 x 1920): dàn trang theo khổ rộng 540 rồi phóng to đúng tỉ lệ cho chữ sắc nét
export const view = { w: innerWidth, h: innerHeight, s: 1 };
export function fitView(){
  const q = new URLSearchParams(location.search).get('ui'), portrait = innerWidth / innerHeight < 0.8;
  const s = q ? Math.max(0.5, Math.min(4, +q || 1)) : portrait && innerWidth > 600 ? innerWidth / 540 : 1;
  view.s = s; view.w = innerWidth / s; view.h = innerHeight / s;
  const app = $('app');
  Object.assign(app.style, s === 1 ? { width: '', height: '', transform: '' } : { width: view.w + 'px', height: view.h + 'px', transform: `scale(${s})`, transformOrigin: '0 0' });
  document.body.classList.toggle('portrait', portrait);
}
export const MEDALS = ['🥇', '🥈', '🥉'];
export const PLANE_ICON: Record<string, string> = { racer: '🏎️', fighter: '🛩️', airliner: '✈️', prop: '🛩️', supersonic: '🚀', bizjet: '💼', transport: '🪖', stunt: '🎪', future: '🛸', golden: '👑' };
const hex = (n: number) => '#' + n.toString(16).padStart(6, '0');

export class UI {
  private feedBox = $('feed');
  private popBox = $('pops');
  private centerTimer = 0;
  private recPage = 0;
  private boards: Boards = { best: [], wins: [], donors: [] };

  constructor(){
    this.skills(); this.howto();
    setInterval(() => { this.recPage = (this.recPage + 1) % 3; this.renderRecords(); }, 6000);
  }

  status(r: RaceState, racers: RacerPub[], elapsed: number){
    const left = Math.max(0, r.leftMs - elapsed), s = Math.ceil(left / 1000);
    const lead = racers.find(x => !x.fin) ?? racers[0];
    const real = racers.some(x => !x.bot);
    const t = r.phase === 'lobby' ? (real ? `⏳ Xuất phát sau ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : '💬 Gõ 1 để vào đua!')
      : r.phase === 'countdown' ? '🚦 Chuẩn bị cất cánh…'
      : r.phase === 'race' ? `📏 ${(Math.max(0, lead?.d ?? 0) / 1000).toFixed(1)}/${(r.laps * r.lapLen / 1000).toFixed(1)} km · ⏱ ${fmtTime(r.raceMs + elapsed)}`
      : r.phase === 'finish' ? `🏁 Đã có người về đích! Còn ${s} giây`
      : `🏆 Kết quả cuộc đua #${r.raceNo}`;
    $('status').textContent = t;
    $('raceNo').textContent = r.raceNo ? `Cuộc đua #${r.raceNo + (r.phase === 'lobby' || r.phase === 'countdown' ? 1 : 0)}` : 'Cuộc đua #1';
  }
  viewers(n: number){ $('viewers').textContent = `👀 ${n}`; }
  live(s: LiveStatus){
    const p = $('live');
    p.className = 'pill' + (s.status === 'connected' ? ' on' : s.status === 'reconnecting' || s.status === 'connecting' ? ' warn' : '');
    p.textContent = s.status === 'connected' ? `● LIVE @${s.uniqueId}` : s.status === 'reconnecting' ? `Đang nối lại @${s.uniqueId}` : s.status === 'connecting' ? 'Đang kết nối…' : s.status === 'error' ? 'Lỗi kết nối' : 'Chưa nối TikTok';
  }

  // Bảng xếp hạng trái: 10 máy bay đầu + máy bay đang quay
  board(racers: RacerPub[], r: RaceState, focus: string){
    const box = $('board'), lead = racers.find(x => !x.fin), rows: HTMLElement[] = [el('div', 'ph', r.phase === 'lobby' || r.phase === 'countdown' ? '🛫 HÀNG XUẤT PHÁT' : '🏁 BẢNG XẾP HẠNG')];
    const show = racers.slice(0, 10), fr = racers.find(x => x.id === focus);
    if (fr && !show.includes(fr)) show.push(fr);
    for (const x of show){
      const d = el('div', 'br' + (x.place <= 3 ? ' p' + x.place : '') + (x.id === focus ? ' focus' : ''));
      const num = el('b', 'bn', String(x.place)), dot = el('i', 'bd'); dot.style.background = hex(x.color);
      const nm = el('span', 'bnm', x.name);
      if (x.bot) nm.append(el('em', 'ai', 'AI'));
      const gap = el('span', 'bg');
      if (x.fin) gap.textContent = fmtTime(x.fin);
      else if (r.phase === 'lobby' || r.phase === 'countdown') gap.textContent = PLANE_ICON[x.plane] ?? '✈️';
      else if (x === lead) gap.textContent = 'DẪN ĐẦU';
      else gap.textContent = `+${Math.max(0, Math.round((lead?.d ?? 0) - x.d))}m`;
      d.append(num, dot, nm, gap); rows.push(d);
    }
    if (racers.length > show.length) rows.push(el('div', 'more', `… và ${racers.length - show.length} máy bay nữa`));
    box.replaceChildren(...rows);
  }

  private skills(){
    const box = $('skills'), rows: HTMLElement[] = [el('div', 'ph', '🎁 QUÀ = SKILL')];
    for (const s of SKILLS){
      const r = el('div', 'sk'); r.append(el('span', 'si', s.icon), el('b', 'sx', `${s.xu} xu`), el('span', 'sn', s.name));
      r.title = s.desc; rows.push(r);
    }
    const like = el('div', 'sk like'); like.append(el('span', 'si', '❤️'), el('b', 'sx', `${RACE.likesPerBoost} tim`), el('span', 'sn', '= 0,1 🌹 tăng tốc'));
    rows.push(like, el('div', 'skn', 'Quà combo x5 = dùng 5 lần'));
    box.replaceChildren(...rows);
  }

  private howto(){
    const box = $('howto');
    const a = el('div', 'hw'); a.append(el('b', 'k', '1'), el('span', '', 'Gõ 1 để vào đua'), el('b', 'k tap', '❤️'), el('span', 'tapt', `Tap tym tăng tốc (${RACE.likesPerBoost} tym = 0,1🌹)`));
    const b = el('div', 'hw'); b.append(el('b', 'k', '✈'), el('span', '', 'Gõ tên máy bay để đổi:'));
    const list = el('div', 'planes');
    for (const p of PICKABLE) list.append(el('span', 'pl', `${PLANE_ICON[p.key]} ${p.words[0]}`));
    const c = el('div', 'hw'); c.append(el('b', 'k', '🎨'), el('span', '', 'Gõ màu: ' + COLORS.slice(0, 7).map(x => x.name.toLowerCase()).join(', ')));
    // tap tim, follow cũng được vào đua; gõ "xem" để máy quay soi máy bay của mình
    const d = el('div', 'hw'); d.append(el('b', 'k', '👀'), el('span', 'watch', 'Gõ "xem": camera soi máy bay của bạn · tym / follow cũng được vào đua'));
    box.replaceChildren(a, d, b, list, c);
  }

  records(b: Boards){ this.boards = b; this.renderRecords(); }
  private renderRecords(){
    const b = this.boards, box = $('records');
    const pages: [string, string[][]][] = [
      ['⏱️ KỶ LỤC NHANH NHẤT', b.best.slice(0, 5).map(x => [x.name, fmtTime(x.ms)])],
      ['🏆 VÔ ĐỊCH NHIỀU NHẤT', b.wins.slice(0, 5).map(x => [x.name, `${x.wins} lần`])],
      ['💎 TOP QUÀ HÔM NAY', b.donors.slice(0, 5).map(x => [x.name, `${x.xu} xu`])],
    ];
    const [title, rows] = pages[this.recPage];
    const kids: HTMLElement[] = [el('div', 'ph', title)];
    if (!rows.length) kids.push(el('div', 'empty', 'Chưa có ai, vào đua ngay!'));
    rows.forEach(([n, v], i) => { const r = el('div', 'rr'); r.append(el('b', '', MEDALS[i] ?? String(i + 1)), el('span', 'rn', n), el('span', 'rv', v)); kids.push(r); });
    box.replaceChildren(...kids);
  }

  feed(text: string, kind = ''){
    const d = el('div', 'fl ' + kind, text);
    this.feedBox.prepend(d);
    while (this.feedBox.childElementCount > 5) this.feedBox.lastElementChild!.remove();
    setTimeout(() => d.classList.add('old'), 6000);
    setTimeout(() => d.remove(), 9000);
  }

  // Khung quà bên trái: ảnh đại diện, tên, quà xN, skill
  pop(f: Extract<Fx, { k: 'gift' }>){
    const s = skillOf(f.skill), d = el('div', 'pop' + (f.xu >= 99 ? ' big' : ''));
    const av = el('div', 'av');
    if (f.avatar){ const img = el('img'); img.src = f.avatar; img.referrerPolicy = 'no-referrer'; img.onerror = () => { img.remove(); av.textContent = f.name.slice(0, 1).toUpperCase(); }; av.append(img); }
    else av.textContent = f.name.slice(0, 1).toUpperCase();
    const txt = el('div', 'pt'); txt.append(el('b', '', f.name), el('small', '', `tặng ${f.gift}`));
    const right = el('div', 'pk'); right.append(el('span', 'pi', s.icon), el('b', 'px', `x${f.count}`));
    const sk = el('div', 'ps', f.banked ? `${s.name} · bung khi xuất phát` : s.name);
    txt.append(sk);
    d.append(av, txt, right);
    this.popBox.prepend(d);
    while (this.popBox.childElementCount > 3) this.popBox.lastElementChild!.remove();
    setTimeout(() => d.classList.add('out'), 4200);
    setTimeout(() => d.remove(), 4700);
  }

  // Khung nhỏ top 1: chỉ đổi chữ khi đổi người
  private pipKey = '';
  pip(r: RacerPub){
    const k = r.id + '|' + r.name;
    if (k === this.pipKey) return;
    this.pipKey = k;
    $('pipName').textContent = r.name + (r.bot ? ' (AI)' : '');
  }
  // Tên bản đồ đang đua (góc trên)
  map(m: MapDef){ $('mapTag').textContent = `${m.icon} ${m.name}`; }
  // Chữ nhỏ bật lên dưới máy bay đang quay (vượt, qua checkpoint)
  private toastTimer = 0;
  toast(text: string){
    const t = $('toast'); t.textContent = text; t.hidden = false;
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    clearTimeout(this.toastTimer); this.toastTimer = window.setTimeout(() => { t.hidden = true; }, 900);
  }

  center(text: string, kind = '', ms = 1600){
    const c = $('center');
    c.textContent = text; c.className = kind; c.hidden = false;
    c.style.animation = 'none'; void c.offsetWidth; c.style.animation = '';
    clearTimeout(this.centerTimer);
    this.centerTimer = window.setTimeout(() => { c.hidden = true; }, ms);
  }

  caption(text: string){
    const c = $('caption'); c.textContent = text; c.hidden = false;
    clearTimeout((c as HTMLElement & { _t?: number })._t);
    (c as HTMLElement & { _t?: number })._t = window.setTimeout(() => { c.hidden = true; }, Math.min(9000, 2000 + text.length * 70));
  }

  // Màn vinh danh: nhà vô địch to, nổi bật ở trên (ảnh đại diện đội vương miện, tên, thời gian, máy bay),
  // hạng 2 và 3 thu gọn ở dưới để chừa giữa màn hình cho máy bay vô địch trên sân khấu 3D
  result(r: RaceState | null, champ: { avatar: string; record: boolean } = { avatar: '', record: false }){
    const box = $('result'), low = $('result2');
    if (!r || !r.podium.length){ box.hidden = true; low.hidden = true; return; }
    const w = r.podium[0];
    const av = el('div', 'cav');
    if (champ.avatar){ const img = el('img'); img.src = champ.avatar; img.referrerPolicy = 'no-referrer'; img.onerror = () => { img.remove(); av.textContent = w.name.slice(0, 1).toUpperCase(); }; av.append(img); }
    else av.textContent = w.name.slice(0, 1).toUpperCase();
    av.style.setProperty('--pc', hex(w.color));
    const crown = el('div', 'crown', '👑'), avBox = el('div', 'cavb'); avBox.append(crown, av);
    const kids: HTMLElement[] = [el('div', 'ct', '🏆 NHÀ VÔ ĐỊCH 🏆'), avBox, el('div', 'cn', w.name + (w.bot ? ' (AI)' : '')),
      el('div', 'cm', `⏱ ${fmtTime(w.ms)} · ${PLANE_ICON[w.plane] ?? '✈️'} ${planeName(w.plane)} · Cuộc đua #${r.raceNo}`)];
    if (champ.record) kids.push(el('div', 'crec', '⭐ KỶ LỤC MỚI ⭐'));
    box.replaceChildren(...kids); box.hidden = false;
    const rows: HTMLElement[] = [];
    for (const i of [1, 2]){
      const p = r.podium[i]; if (!p) continue;
      const c = el('div', 'rr2 p' + (i + 1)); c.append(el('span', 'm', MEDALS[i]), el('b', '', p.name + (p.bot ? ' (AI)' : '')), el('small', '', p.ms ? fmtTime(p.ms) : 'đang bay về đích'));
      rows.push(c);
    }
    low.replaceChildren(...rows, el('div', 'rs', 'Cuộc đua mới sắp bắt đầu · Gõ 1 để tham gia!'));
    low.hidden = false;
  }

  cam(r: RacerPub | undefined, kmh: number, shot = ''){
    const c = $('camTag');
    if (!r){ c.hidden = true; return; }
    c.hidden = false;
    c.textContent = `🎥 ${shot ? shot + ' · ' : ''}#${r.place} ${r.name} · ${Math.round(kmh)} km/h`;
  }
}

/* ------------------------------------------------------- bản đồ nhỏ */
export class Minimap {
  private ctx: CanvasRenderingContext2D;
  private bg: HTMLCanvasElement;
  private map: (x: number, z: number) => [number, number];
  private cv: HTMLCanvasElement;
  constructor(cv: HTMLCanvasElement, pts: { x: number; z: number }[]){
    this.cv = cv;
    const S = 300; cv.width = S; cv.height = S;
    this.ctx = cv.getContext('2d')!;
    let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
    for (const p of pts){ x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); z0 = Math.min(z0, p.z); z1 = Math.max(z1, p.z); }
    const sc = (S - 40) / Math.max(x1 - x0, z1 - z0), ox = (S - (x1 - x0) * sc) / 2, oz = (S - (z1 - z0) * sc) / 2;
    this.map = (x, z) => [ox + (x - x0) * sc, oz + (z - z0) * sc];
    this.bg = document.createElement('canvas'); this.bg.width = this.bg.height = S;
    const b = this.bg.getContext('2d')!;
    b.lineJoin = 'round';
    for (const [w, c] of [[22, 'rgba(0,0,0,0.55)'], [14, '#2b3a55'], [5, '#8fd8ff']] as const){
      b.beginPath(); pts.forEach((p, i) => { const [x, y] = this.map(p.x, p.z); if (i) b.lineTo(x, y); else b.moveTo(x, y); }); b.closePath();
      b.strokeStyle = c; b.lineWidth = w; b.stroke();
    }
    const [sx, sy] = this.map(pts[0].x, pts[0].z);
    b.fillStyle = '#fff'; b.fillRect(sx - 9, sy - 9, 18, 18); b.fillStyle = '#111'; b.fillRect(sx - 9, sy - 9, 9, 9); b.fillRect(sx, sy, 9, 9);
  }
  draw(dots: { x: number; z: number; color: number; place: number; focus: boolean }[]){
    const c = this.ctx; c.clearRect(0, 0, this.cv.width, this.cv.height); c.drawImage(this.bg, 0, 0);
    for (const d of [...dots].sort((a, b) => b.place - a.place)){
      const [x, y] = this.map(d.x, d.z), r = d.focus ? 12 : d.place <= 3 ? 10 : 7;
      c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2);
      c.fillStyle = hex(d.color); c.fill();
      c.lineWidth = d.focus ? 4 : 2.5; c.strokeStyle = d.place === 1 ? '#ffd23a' : d.focus ? '#fff' : 'rgba(0,0,0,0.7)'; c.stroke();
      if (d.place <= 3){ c.fillStyle = '#000'; c.font = 'bold 12px Segoe UI'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(d.place), x, y + 0.5); }
    }
  }
}
