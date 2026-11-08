import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_TRACK, FINISH_SECS, FOLLOW_M, LIKE_M, LIKE_STEP, ROUND_PAUSE, SHARE_M, TEAMS, comboDur, other, teamFromComment, tierFor } from '../shared/game.ts';
import type { PushFx, Team } from '../shared/game.ts';
import type { Boards, Fx, LiveEvent, Round } from '../shared/types.ts';

// Ván đẩy xe hai phe. Server giữ vị trí xe (mét, âm = về phía căn cứ Đỏ, dương = về phía căn cứ Xanh).
// Mỗi cú đẩy là một LỰC: tổng số mét chia đều trong thời gian của nó (đồng bộ với linh vật trên màn hình), tự hết khi đủ mét.
// Hai phe cùng một quy tắc; lực hai phe cộng trừ nhau nên cùng tặng thì xe giằng co.
// Lưu data/day-xe.json: số ván thắng mỗi phe, người chơi (phe, xu đã tặng, mét đã đẩy, ảnh đại diện).
export interface Player { id: string; name: string; avatar: string; team: Team; xu: number; m: number; likes: number; sim?: boolean }
const clean = (s: string) => s.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim() || 'bạn';

export class Game {
  players = new Map<string, Player>();
  round: Round;
  roundM = new Map<string, number>();         // mét mỗi người đẩy trong ván này
  private forces: { id: string; team: Team; left: number; rate: number }[] = [];     // lực đang đẩy (mét còn lại, mét/giây)
  private bank: { id: string; team: Team; left: number; rate: number }[] = [];       // lực còn dở khi hết ván / quà lúc nghỉ: dồn sang đầu ván sau
  private last = Date.now();
  private fxq: Fx[] = [];
  private dirty = false;
  private followed = new Set<string>(); private shared = new Map<string, number>(); private lastJoin = 0;
  say: (text: string, prio?: boolean) => void = () => {};
  onWin: (team: Team) => void = () => {};
  private dir: string;
  constructor(dir: string, track = DEFAULT_TRACK) {
    this.dir = dir;
    this.round = { n: 1, pos: 0, track, phase: 'play', winner: null, until: 0, finish: null, wins: { do: 0, xanh: 0 }, members: { do: 0, xanh: 0 } };
    try {
      const d = JSON.parse(fs.readFileSync(path.join(dir, 'day-xe.json'), 'utf8'));
      if (d.wins) this.round.wins = { do: +d.wins.do || 0, xanh: +d.wins.xanh || 0 };
      if (d.n) this.round.n = +d.n || 1;
      for (const p of d.players ?? []) this.players.set(p.id, { ...p, likes: 0 });
    } catch { /* lần đầu */ }
    this.count();
  }
  fx(f: Fx) { this.fxq.push(f); if (this.fxq.length > 300) this.fxq.splice(0, this.fxq.length - 300); }
  takeFx() { return this.fxq.splice(0); }
  avatarUrl(id: string) { return this.players.get(id)?.avatar ?? ''; }
  setTrack(m: number) { this.round.track = m; if (Math.abs(this.round.pos) >= m && this.round.phase === 'play') this.round.pos = Math.sign(this.round.pos) * (m - 1); }
  private count() { const c = { do: 0, xanh: 0 }; for (const p of this.players.values()) c[p.team]++; this.round.members = c; }

  // phe cho người chưa chọn: vào phe ít người hơn; bằng nhau thì vào phe đang thua (xe gần căn cứ mình hơn)
  private autoTeam(): Team {
    const c = this.round.members;
    if (c.do !== c.xanh) return c.do < c.xanh ? 'do' : 'xanh';
    return this.round.pos > 0 ? 'xanh' : this.round.pos < 0 ? 'do' : (Math.random() < 0.5 ? 'do' : 'xanh');
  }
  private who(ev: LiveEvent, prefer: Team | null = null): Player {
    let p = this.players.get(ev.id);
    if (!p) { p = { id: ev.id, name: ev.name, avatar: '', team: prefer ?? this.autoTeam(), xu: 0, m: 0, likes: 0, sim: ev.sim }; this.players.set(ev.id, p); this.count(); this.fx({ k: 'join', id: p.id, name: p.name, team: p.team, switched: false }); }
    if (ev.name) p.name = ev.name.slice(0, 32);
    if (ev.avatar) p.avatar = ev.avatar;
    this.dirty = true;
    return p;
  }
  push(p: Player, m: number, fxName: { fx: PushFx; name: string; icon: string }, count = 1, xu = 0, dur = 2) {
    p.m += m;
    this.fx({ k: 'push', id: p.id, name: p.name, team: p.team, m, dur, fx: fxName.fx, tier: fxName.name, icon: fxName.icon, xu, count });
    const f = { id: p.id, team: p.team, left: m, rate: m / Math.max(0.5, dur) };
    if (this.round.phase !== 'play') this.bank.push(f); else this.forces.push(f);
  }
  // chạy các lực theo thời gian thực (gọi đều đặn), dt giây; mỗi lực tự hết khi đủ số mét
  // xe chạm căn cứ đối phương: bắt đầu đếm ngược FINISH_SECS giây; phe kia đẩy xe ra khỏi căn cứ thì huỷ; giữ đủ giờ mới thắng
  advance(dt: number) {
    const r = this.round; if (r.phase !== 'play') return;
    for (const f of this.forces) {
      const dir = TEAMS[f.team].dir, room = r.track - dir * r.pos;          // còn bao xa tới căn cứ đối phương
      const d = Math.max(0, Math.min(f.left, f.rate * dt, room)); f.left -= d;
      r.pos += dir * d; this.roundM.set(f.id, (this.roundM.get(f.id) ?? 0) + d);
      if (room - d < 1e-6) r.pos = dir * r.track;
    }
    this.forces = this.forces.filter(f => f.left > 0.01);          // lực đang tì ở căn cứ vẫn giữ, bị đẩy ra thì đẩy tiếp
    const at: Team | null = r.pos >= r.track - 1e-6 ? 'do' : r.pos <= -r.track + 1e-6 ? 'xanh' : null;
    if (at && !r.finish) { r.finish = { team: at, left: FINISH_SECS }; this.fx({ k: 'finish', team: at, state: 'start' }); this.say(`${TEAMS[at].name.toLowerCase().replace('phe', 'Phe')} chạm căn cứ! Đếm ngược mười giây!`, true); this.dirty = true; }
    else if (r.finish && at !== r.finish.team) { this.fx({ k: 'finish', team: r.finish.team, state: 'cancel' }); r.finish = null; }
    if (r.finish) { r.finish.left -= dt; if (r.finish.left <= 0) { const t = r.finish.team; r.finish = null; this.win(t); } }
  }
  private win(team: Team) {
    const r = this.round;
    r.pos = Math.sign(r.pos) * r.track; r.phase = 'win';
    this.bank.push(...this.forces.filter(f => f.left > 0.01)); this.forces = []; r.winner = team; r.until = Date.now() + ROUND_PAUSE; r.wins[team]++;
    let mvp: { id: string; name: string; m: number } | null = null;
    for (const [id, m] of this.roundM) { const p = this.players.get(id); if (p && p.team === team && (!mvp || m > mvp.m)) mvp = { id, name: p.name, m }; }
    this.fx({ k: 'win', team, mvp, wins: { ...r.wins } });
    this.say(`${TEAMS[team].name.toLowerCase().replace('phe', 'Phe')} thắng ván ${r.n}!${mvp ? ` Cảm ơn ${clean(mvp.name)} đẩy nhiều nhất!` : ''}`, true);
    this.dirty = true;
    this.onWin(team);
  }
  newRound() {
    const r = this.round;
    r.n++; r.pos = 0; r.phase = 'play'; r.winner = null; r.until = 0; r.finish = null; this.roundM.clear();
    this.fx({ k: 'reset', n: r.n });
    // lực còn dở / quà lúc nghỉ đẩy tiếp từ từ ở đầu ván mới (không nhảy tức thời)
    this.forces = this.bank.map(f => ({ ...f, rate: Math.max(f.rate, f.left / 3) })); this.bank = [];
    this.dirty = true;
  }
  tick(now = Date.now()) {
    const dt = Math.min(1, Math.max(0, (now - this.last) / 1000)); this.last = now;
    if (this.round.phase === 'win' && now >= this.round.until) this.newRound();
    this.advance(dt);
  }
  get pushing() { return this.forces.length > 0 || !!this.round.finish; }
  newRoundNow() { this.forces = []; this.bank = []; this.newRound(); }
  resetWins() { this.round.wins = { do: 0, xanh: 0 }; this.dirty = true; }

  handle(ev: LiveEvent) {
    const now = Date.now();
    switch (ev.kind) {
      case 'join': { if (now - this.lastJoin < 1500 || this.players.has(ev.id)) return; this.lastJoin = now; this.who(ev); return; }
      case 'comment': {
        const want = teamFromComment(ev.text), known = this.players.has(ev.id), p = this.who(ev, want);
        if (want && (want !== p.team || !known)) { const sw = known && want !== p.team; p.team = want; this.count(); if (known) this.fx({ k: 'join', id: p.id, name: p.name, team: want, switched: sw }); }
        return;
      }
      case 'like': {
        const p = this.who(ev, this.players.has(ev.id) ? null : (Math.random() < 0.5 ? 'do' : 'xanh')); p.likes += ev.count;
        while (p.likes >= LIKE_STEP) { p.likes -= LIKE_STEP; this.push(p, LIKE_M, { fx: 'push', name: 'Thả tim', icon: '❤️' }, 1, 0, 1.2); }
        return;
      }
      case 'follow': { const p = this.who(ev); if (this.followed.has(p.id)) return; this.followed.add(p.id); this.push(p, FOLLOW_M, { fx: 'push', name: 'Follow', icon: '➕' }, 1, 0, 2); this.say(`Cảm ơn ${clean(p.name)} đã follow!`); return; }
      case 'share': { const p = this.who(ev); if (now - (this.shared.get(p.id) ?? 0) < 120_000) return; this.shared.set(p.id, now); this.push(p, SHARE_M, { fx: 'push', name: 'Chia sẻ', icon: '🔗' }, 1, 0, 2); this.say(`Cảm ơn ${clean(p.name)} đã chia sẻ!`); return; }
      case 'gift': {
        const p = this.who(ev), tier = tierFor(ev.diamonds), xu = ev.diamonds * ev.count;
        p.xu += xu;
        this.fx({ k: 'gift', id: p.id, name: p.name, team: p.team, gift: ev.gift, count: ev.count, xu, tier: tier.name, icon: tier.icon });
        this.push(p, tier.m * ev.count, tier, ev.count, xu, comboDur(tier.dur, ev.count));
        if (tier.xu >= 30) this.say(`${clean(p.name)} ${tier.name} cho ${TEAMS[p.team].name.toLowerCase()}!`, tier.xu >= 99);
        return;
      }
    }
  }
  boards(): Boards {
    const top = (t: Team) => [...this.roundM].map(([id, m]) => ({ p: this.players.get(id), m })).filter(x => x.p && x.p.team === t).sort((a, b) => b.m - a.m).slice(0, 5).map(x => ({ id: x.p!.id, name: x.p!.name, v: x.m }));
    return { do: top('do'), xanh: top('xanh'), mvp: [...this.players.values()].filter(p => p.xu > 0).sort((a, b) => b.xu - a.xu).slice(0, 5).map(p => ({ id: p.id, name: p.name, v: p.xu })) };
  }
  removeSim() { for (const [id, p] of this.players) if (p.sim) { this.players.delete(id); this.roundM.delete(id); } this.count(); this.dirty = true; }
  save() {
    if (!this.dirty) return;
    this.dirty = false;
    try {
      fs.mkdirSync(this.dir, { recursive: true });
      const file = path.join(this.dir, 'day-xe.json'), tmp = file + '.tmp';
      fs.writeFileSync(tmp, JSON.stringify({ n: this.round.n, wins: this.round.wins, players: [...this.players.values()].filter(p => !p.sim).map(({ likes, ...p }) => { void likes; return p; }) }));
      fs.renameSync(tmp, file);
    } catch (e) { console.error('Không lưu được: ' + (e as Error).message); this.dirty = true; }
  }
}
// đội bạn/đội địch (dùng cho thông báo)
export { other };
