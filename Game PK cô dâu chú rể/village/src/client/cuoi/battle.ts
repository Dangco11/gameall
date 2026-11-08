import * as THREE from 'three';
import { BATTLE, BATTLE_GIFTS, TEAMS } from '../../shared/balance.ts';
import type { Team } from '../../shared/balance.ts';
import type { BattleState } from '../../shared/types.ts';
import type { SparkSystem } from './sparks.ts';
import { $, el } from './ui.ts';

// Đại chiến Nhà trai – Nhà gái trên màn hình: bảng điểm ba phe, bảng quà kỹ năng, khiên, rồng, đòn đánh, Song long.
export const ORDER: Team[] = ['trai', 'gai', 'cuop'];
// Nhà trai đứng bên phải thảm, Nhà gái bên trái, đội Cướp dâu tiến lên trên thảm đỏ phía trước
export const ZONE: Record<Team, THREE.Vector3> = { trai: new THREE.Vector3(4.6, 1.4, 6.5), gai: new THREE.Vector3(-4.6, 1.4, 6.5), cuop: new THREE.Vector3(0, 1.4, 11.5) };
const COLOR: Record<Team, number> = { trai: 0x3a8bff, gai: 0xff5a9a, cuop: 0xb04aff };
const fmt = (n: number) => n.toLocaleString('vi-VN');
const clock = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;

export class BattleView {
  readonly group = new THREE.Group();
  shake = 0;
  private domes = {} as Record<Team, THREE.Mesh>;
  private sparks: SparkSystem;

  constructor(sparks: SparkSystem){
    this.sparks = sparks;
    for (const t of ORDER){
      const d = new THREE.Mesh(new THREE.SphereGeometry(t === 'cuop' ? 3 : 3.6, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshBasicMaterial({ color: 0x7ae0ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
      d.position.set(ZONE[t].x, 0, ZONE[t].z); d.scale.y = 0.75; d.visible = false;
      this.domes[t] = d; this.group.add(d);
    }
  }

  // Khiên: vòm sáng xanh chập chờn; Rồng, Vương miện: lấp lánh vàng quanh phe; Trống: tia đỏ
  update(dt: number, now: number, s: BattleState | null, elapsed: number){
    this.shake = Math.max(0, this.shake - dt * 2.5);
    for (const t of ORDER){
      const d = this.domes[t], st = s?.phase !== 'idle' ? s?.teams[t] : null;
      const on = !!st && st.shieldMs - elapsed > 0, m = d.material as THREE.MeshBasicMaterial;
      m.opacity += ((on ? 0.22 + Math.sin(now / 160) * 0.06 : 0) - m.opacity) * Math.min(1, dt * 6);
      d.visible = m.opacity > 0.01;
      if (!st) continue;
      const z = ZONE[t];
      if (st.boostMs - elapsed > 0 && Math.random() < dt * 22) this.sparks.glow(new THREE.Vector3(z.x + (Math.random() - 0.5) * 5, 1.2, z.z + (Math.random() - 0.5) * 5));
      if (st.drumMs - elapsed > 0 && Math.random() < dt * 8) this.sparks.burst(new THREE.Vector3(z.x + (Math.random() - 0.5) * 4, 1.6, z.z + (Math.random() - 0.5) * 4), [0xff4a4a, 0xffd45a], 4, 1.4);
    }
  }

  power(team: Team, from: THREE.Vector3 | null){ if (from) this.sparks.arc(from, ZONE[team], [COLOR[team], 0xffffff], 10, 0.7); }
  attack(from: Team, to: Team, big: boolean){
    const a = ZONE[from].clone().setY(2), b = ZONE[to].clone().setY(1.2);
    this.sparks.arc(a, b, big ? [0xff3a2a, 0xffd45a, 0xffffff] : [0xff5a3a, 0xffffff], big ? 70 : 34, big ? 1.1 : 0.8, big ? 1.4 : 0.6);
    setTimeout(() => { this.sparks.burst(b, [0xff3a2a, 0xffa040, 0xffffff], big ? 140 : 60, big ? 7 : 4.5); this.shake = big ? 1.2 : 0.55; }, (big ? 1.1 : 0.8) * 1000);
  }
  blocked(team: Team){ const z = ZONE[team]; this.sparks.burst(new THREE.Vector3(z.x, 2.6, z.z), [0x7ae0ff, 0xffffff], 70, 4); }
  dragon(team: Team){ const z = ZONE[team]; for (let i = 0; i < 4; i++) setTimeout(() => this.sparks.burst(new THREE.Vector3(z.x + (i - 1.5) * 1.4, 2.2 + i * 0.3, z.z), [0xffd45a, 0xff8a2a, 0xfff3b0], 40, 3.5), i * 180); }
  ultimate(team: Team){
    this.shake = 2;
    for (const t of ORDER) if (t !== team) setTimeout(() => this.sparks.burst(ZONE[t].clone().setY(1.5), [0xffd45a, 0xff3a2a, 0x7ae0ff, 0xffffff], 180, 8), 900);
    this.sparks.fireworks();
  }
  win(team: Team){ const z = ZONE[team]; this.sparks.fireworks(); this.sparks.hearts(z); this.sparks.rain([COLOR[team], 0xffd45a, 0xffffff], 300, 5); }
}

// Bảng điểm và bảng quà kỹ năng. Chữ người xem chỉ đi qua textContent.
export class BattleUI {
  private built = false;

  render(s: BattleState, elapsed: number){
    const box = $('battleBox');
    const phaseI = BATTLE.phases.findIndex(p => p.key === s.phase), p = BATTLE.phases[phaseI];
    const left = Math.max(0, s.phaseLeftMs - elapsed);
    const kids: HTMLElement[] = [];
    const head = el('div', 'bh'); head.append(el('b', '', '⚔️ Đại chiến Nhà trai – Nhà gái'), el('span', 'bclock', clock(Math.max(0, s.leftMs - elapsed))));
    kids.push(head);
    if (p){
      const steps = el('div', 'bsteps');
      BATTLE.phases.forEach((q, i) => steps.append(el('span', i < phaseI ? 'done' : i === phaseI ? 'now' : '', q.name)));
      kids.push(steps, el('div', 'bphase', `${p.when} · ${p.name} · còn ${clock(left)}${s.climax ? ' · 🔥 ĐIỂM x2' : ''}`));
    }
    const max = Math.max(1, ...ORDER.map(t => s.teams[t].power));
    for (const t of ORDER){
      const st = s.teams[t], row = el('div', `bteam ${t}${s.winner === t ? ' win' : ''}`);
      const tags = [st.shieldMs - elapsed > 0 ? `🛡️${Math.ceil((st.shieldMs - elapsed) / 1000)}s` : '', st.boostMs - elapsed > 0 ? `${st.boostX >= 2 ? '👑' : '🐉'}x${st.boostX}` : '', st.drumMs - elapsed > 0 ? '🥁x3' : ''].filter(Boolean).join(' ');
      const bar = el('div', 'bbar'), fill = el('i'); fill.style.width = `${Math.round(st.power / max * 100)}%`; bar.append(fill);
      const name = el('div', 'bname'); name.append(el('span', '', `${TEAMS[t].icon} ${TEAMS[t].name}`), el('small', '', `${st.count} người`));
      const lead = el('div', 'blead', st.leader ? `${st.leader.crown ? '👑 Chủ soái' : TEAMS[t].leader}: ${st.leader.name}` : 'chưa có ai');
      row.append(name, bar, el('b', 'bpow', fmt(st.power)), el('span', 'btags', tags), lead);
      kids.push(row);
    }
    if (s.phase === 'final'){
      kids.push(el('div', 'bwin', s.winner ? `🏆 ${TEAMS[s.winner].name} chiến thắng!` : '🤝 Hòa'));
      for (const x of s.titles){ const r = el('div', 'btitle'); r.append(el('span', '', x.title), el('b', '', x.name)); kids.push(r); }
    } else kids.push(el('div', 'bhint', s.phase === 'recruit' ? '👉 Bình luận 1 Nhà trai · 2 Nhà gái · 3 Cướp dâu (được đổi phe trong 2 phút đầu)' : '👉 Chưa có phe: bình luận 1 / 2 / 3 · Bình luận, thả tim để cổ vũ phe mình'));
    box.replaceChildren(...kids);
    this.gifts(phaseI);
    const g = $('battleGifts');
    g.style.top = innerWidth / innerHeight < 0.8 ? `${Math.round(box.getBoundingClientRect().bottom + 6)}px` : '';
  }

  private gifts(phaseI: number){
    const box = $('battleGifts');
    if (!this.built){
      this.built = true;
      box.append(el('div', 'gh2', '🎁 Quà kỹ năng'));
      for (const g of BATTLE_GIFTS){ const r = el('div', 'gr' + (g.key === 'kiem' || g.key === 'ngua' || g.key === 'songlong' ? ' atk' : '')); r.append(el('span', 'gi2', g.icon), el('b', 'gx2', `${fmt(g.xu)} xu`), el('span', 'gt2', `${g.name}: ${g.label}`)); box.append(r); }
      box.append(el('div', 'gnote', '⚔️ Kiếm, Ngựa chiến, Song long mở từ phút 5 · ❤️ Tim, bình luận cũng cộng sức mạnh'));
    }
    box.classList.toggle('locked', phaseI >= 0 && phaseI < 2);
  }

  // Song long: hai rồng lượn ngang màn hình, chữ đại chiêu rung lắc
  ultimate(name: string, team: Team){
    const o = $('ultimate');
    o.replaceChildren(el('div', 'udragon l', '🐲'), el('div', 'udragon r', '🐉'), el('div', 'utext', '🐲 SONG LONG 🐲'), el('div', 'usub', `${name} · ${TEAMS[team].name}`));
    o.className = 'u ' + team; o.hidden = false;
    o.style.animation = 'none'; void o.offsetWidth; o.style.animation = '';
    setTimeout(() => { o.hidden = true; }, 4200);
  }
  dash(icon: string){
    const d = el('div', 'dash', icon); $('hearts').append(d); setTimeout(() => d.remove(), 1600);
  }
}
