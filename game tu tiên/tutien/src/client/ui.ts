import { artifactByKey, GIFT_TIERS, REALM_COLORS, realmName, realmOf, SECTS } from '../shared/game.ts';
import type { BossPub, Boards, LiveStatus, ModeState, Row, Settings } from '../shared/types.ts';
import { hex } from './mats.ts';

// Giao diện HTML chồng lên cảnh 3D, tối ưu 9:16 (TikTok LIVE) và chạy được 16:9.
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const fmt = (n: number) => n >= 1e9 ? (n / 1e9).toFixed(1) + 'B' : n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? (n / 1e3).toFixed(1) + 'K' : Math.round(n).toLocaleString('vi-VN');
const av = (url: string, name: string) => url ? `<img class="av" src="${esc(url)}" referrerpolicy="no-referrer" alt="">` : `<span class="av ph">${esc((name || '?').replace(/^NPC /, '').slice(0, 1).toUpperCase())}</span>`;

const BOARDS: { key: keyof Boards; title: string; unit: (r: Row) => string }[] = [
  { key: 'power', title: '⚔️ TOP CHIẾN LỰC', unit: r => fmt(r.v) },
  { key: 'tuvi', title: '☯️ TOP TU VI', unit: r => 'Tầng ' + (r.v + 1) },
  { key: 'bossDmg', title: '🐉 TOP SÁT THƯƠNG BOSS', unit: r => fmt(r.v) },
  { key: 'pk', title: '🏆 TOP PK', unit: r => fmt(r.v) + ' điểm' },
  { key: 'sects', title: '🏯 TOP TÔNG MÔN', unit: r => r.v + ' thắng' },
  { key: 'donors', title: '💎 TOP TẶNG QUÀ', unit: r => fmt(r.v) + ' xu' },
];

export class UI {
  boards: Boards | null = null;
  private boardIdx = 0; private boardAt = 0;
  private nums: HTMLDivElement[] = []; private numI = 0;
  private bannerN = 0;
  constructor(live: boolean) {
    document.body.classList.toggle('live', live);
    $('gifts').innerHTML = `<div class="ph">🎁 QUÀ = PHÁP THUẬT</div>` + GIFT_TIERS.map(g => `<div class="gt"><b>${g.xu}</b><span>${g.icon} ${esc(g.name)}</span></div>`).join('') + `<div class="gt note">Mọi quà: +tu vi · nâng pháp bảo · tặng là vào trận</div>`;
    $('howto').innerHTML = `<b>CÁCH CHƠI</b> · Gõ <i>1</i> vào game · Gõ lớp: <i>kiem</i> <i>dao</i> <i>phap</i> <i>ma</i> <i>tien nu</i> <i>long</i> <i>yeu</i> <i>the tu</i> <i>tran</i> <i>dan</i> <i>loi</i> <i>bang</i> · <i>nam</i>/<i>nu</i> · Tông môn: <i>tong 1</i>–<i>tong 4</i> · <i>pk</i> thách đấu · <i>doat</i> tranh bảo vật · Tim = tu vi`;
    for (let i = 0; i < 40; i++) { const d = document.createElement('div'); d.className = 'num'; $('nums').append(d); this.nums.push(d); }
  }
  setMode(m: ModeState, boss: BossPub | null) {
    $('modeTitle').textContent = m.title;
    const s = Math.ceil(m.leftMs / 1000);
    $('modeTime').textContent = m.mode === 'tuluyen' ? `Tiếp theo: ${m.next} · ${s}s` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    document.body.dataset.mode = m.mode;
    const bb = $('bossbar');
    if (boss && m.mode === 'boss') {
      bb.hidden = false;
      const r = Math.max(0, boss.hp / Math.max(1, boss.mhp));
      $('bossName').textContent = boss.name;
      $('bossPhase').textContent = boss.p === 'die' ? 'ĐÃ BỊ TIÊU DIỆT' : `Giai đoạn ${boss.phase}${boss.phase === 3 ? ' · NỔI GIẬN' : boss.phase === 2 ? ' · Cuồng bạo' : ''}`;
      $('bossHp').textContent = `${fmt(boss.hp)} / ${fmt(boss.mhp)}`;
      ($('bossFill').style as CSSStyleDeclaration).width = (r * 100).toFixed(2) + '%';
      bb.classList.toggle('rage', boss.phase >= 3);
    } else bb.hidden = true;
    const sides = $('sides');
    if (m.sides.length === 2 && m.mode !== 'boss') {
      sides.hidden = false;
      sides.innerHTML = m.sides.map((sd, i) => `<div class="side s${i}" style="--c:${hex(sd.color)}"><b>${esc(sd.name)}</b><span>${m.mode === 'sect' ? `🗡 ${sd.score} hạ · ` : ''}${sd.alive} còn đứng</span></div>`).join('<div class="vs">VS</div>');
    } else sides.hidden = true;
  }
  setBoards(b: Boards, now: number) {
    this.boards = b;
    if (now - this.boardAt > 8000) { this.boardAt = now; this.boardIdx = (this.boardIdx + 1) % BOARDS.length; }
    let def = BOARDS[this.boardIdx], rows = b[def.key];
    for (let k = 0; k < BOARDS.length && !rows.length; k++) { this.boardIdx = (this.boardIdx + 1) % BOARDS.length; def = BOARDS[this.boardIdx]; rows = b[def.key]; }
    $('board').innerHTML = `<div class="ph">${def.title}</div>` + (rows.length ? rows.slice(0, 8).map((r, i) => `<div class="row r${i + 1}"><span class="rk">${i + 1}</span>${def.key === 'sects' ? '' : av(r.av, r.name)}<span class="nm">${esc(r.name)}<small>${esc(r.sub ?? '')}</small></span><span class="v">${esc(def.unit(r))}</span></div>`).join('') : '<div class="empty">Gõ 1 để bước vào tiên giới!</div>');
    const now2 = b.bossNow;
    $('bossTop').innerHTML = now2.length ? now2.map((r, i) => `<span>${i + 1}. ${esc(r.name)} <b>${fmt(r.v)}</b></span>`).join('') : '';
  }
  setLive(s: LiveStatus, viewers?: number, total?: number) {
    const t = s.status === 'connected' ? `🔴 LIVE @${s.uniqueId}` : s.status === 'connecting' ? 'Đang nối TikTok…' : s.status === 'reconnecting' ? 'Đang nối lại…' : s.status === 'error' ? 'Lỗi: ' + s.error : 'Chưa nối TikTok';
    $('live').textContent = t; $('live').classList.toggle('on', s.status === 'connected');
    if (viewers !== undefined) $('viewers').textContent = `👥 ${viewers}${total ? ' · ' + fmt(total) + ' tu sĩ' : ''}`;
  }
  announce(title: string, sub = '', color = '#ffe9a8', ms = 3200) {
    const c = $('center');
    c.innerHTML = `<div class="t" style="--c:${color}">${esc(title)}</div>${sub ? `<div class="s">${esc(sub)}</div>` : ''}`;
    c.hidden = false; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop');
    clearTimeout((c as unknown as { _t: number })._t);
    (c as unknown as { _t: number })._t = window.setTimeout(() => { c.hidden = true; }, ms);
  }
  gift(name: string, avatar: string, gift: string, count: number, tierName: string, icon: string, xu: number) {
    const box = $('banners'), d = document.createElement('div');
    d.className = 'banner' + (xu >= 500 ? ' vip' : xu >= 99 ? ' big' : '');
    d.innerHTML = `${av(avatar, name)}<div><b>${esc(name)}</b><span>tặng ${esc(gift)}${count > 1 ? ' x' + count : ''}</span></div><div class="tier">${icon} ${esc(tierName)}</div>`;
    box.prepend(d);
    while (box.children.length > 4) box.lastChild!.remove();
    setTimeout(() => d.classList.add('out'), 4200); setTimeout(() => d.remove(), 4800);
    this.bannerN++;
  }
  feed(text: string) {
    const f = $('feed'), d = document.createElement('div'); d.textContent = text; f.prepend(d);
    while (f.children.length > 5) f.lastChild!.remove();
    setTimeout(() => d.classList.add('out'), 5000); setTimeout(() => d.remove(), 5600);
  }
  // số sát thương bay lên (toạ độ màn hình)
  number(x: number, y: number, text: string, kind: 'dmg' | 'crit' | 'heal' | 'dodge' | 'boss') {
    const d = this.nums[this.numI = (this.numI + 1) % this.nums.length];
    d.className = 'num ' + kind; d.textContent = text;
    d.style.left = x.toFixed(0) + 'px'; d.style.top = y.toFixed(0) + 'px';
    void d.offsetWidth; d.classList.add('go');
  }
  breakthrough(name: string, lv: number, realm: boolean) {
    const c = hex(REALM_COLORS[realmOf(lv)]);
    if (realm) this.announce(`⚡ ĐỘ KIẾP THÀNH CÔNG ⚡`, `${name} đột phá ${realmName(lv)}`, c, 4200);
    else this.feed(`✨ ${name} đột phá ${realmName(lv)}`);
  }
  artifact(name: string, art: string, lv: number, loot: boolean) {
    const a = artifactByKey.get(art as never);
    if (!a) return;
    if (loot || lv === 1 || lv % 5 === 0) this.announce(`${a.icon} ${loot ? 'RƠI BẢO VẬT' : 'LUYỆN THÀNH PHÁP BẢO'}`, `${name} · ${a.name} cấp ${lv}`, hex(a.color), 2800);
    else this.feed(`${a.icon} ${name}: ${a.name} lên cấp ${lv}`);
  }
  controls(settings: Settings | null) {
    if (!settings) return;
    const v = $<HTMLInputElement>('setVoice'); if (v && document.activeElement !== v) v.checked = settings.voice;
    const n = $<HTMLInputElement>('setNpc'); if (n && document.activeElement !== n) n.value = String(settings.npcs);
  }
}
export const SECT_LIST = SECTS;
