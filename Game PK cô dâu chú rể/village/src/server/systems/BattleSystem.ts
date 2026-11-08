import { BATTLE, TEAMS, battleGiftFor } from '../../shared/balance.ts';
import type { BattlePhase, Team } from '../../shared/balance.ts';
import type { BattleState, BattleTeamState, Fx } from '../../shared/types.ts';
import { normalize } from '../CommandParser.ts';

type BattleFx = Extract<Fx, { k: 'battle' }>;
const ALL: Team[] = ['trai', 'gai', 'cuop'];

// Bình luận chọn phe: 1 / NHÀ TRAI, 2 / NHÀ GÁI, 3 / CƯỚP DÂU. Chỉ nhận khi cả bình luận là lời chọn phe.
const TEAM_WORDS: Record<string, Team> = {
  '1': 'trai', 'NHA TRAI': 'trai', 'PHE TRAI': 'trai', 'NT': 'trai', 'DOI TRAI': 'trai',
  '2': 'gai', 'NHA GAI': 'gai', 'PHE GAI': 'gai', 'NG': 'gai', 'DOI GAI': 'gai',
  '3': 'cuop', 'CUOP DAU': 'cuop', 'CUOP': 'cuop', 'DOI CUOP': 'cuop', 'PHE CUOP': 'cuop', 'CD': 'cuop',
};
export const parseTeam = (text: string): Team | null => TEAM_WORDS[normalize(text)] ?? null;

interface Member { team: Team; name: string; gifted: number; cheer: number; damage: number; cheerAt: number; likeBank: number }
interface TeamRun { power: number; shieldUntil: number; boostX: number; boostUntil: number; drumUntil: number; crown: string }

// Đại chiến Nhà trai – Nhà gái: 12 phút qua 5 phần. Ai cũng góp được: bình luận cổ vũ, thả tim, tặng quà.
// Chỉ giữ trong bộ nhớ, hết trận là xóa.
export class BattleSystem {
  phase: BattlePhase = 'idle';
  dirty = true;
  scale = 1;                                             // chạy thử nhanh: 0.1 thì cả trận khoảng 72 giây
  private phaseI = -1;
  private phaseEnds = 0;
  private endsAt = 0;
  private climaxSaid = false;
  private members = new Map<string, Member>();
  private teams = {} as Record<Team, TeamRun>;
  private winner: Team | '' = '';
  private titles: BattleState['titles'] = [];
  private emit: (f: BattleFx) => void;

  constructor(emit: (f: BattleFx) => void){ this.emit = emit; this.clear(); }

  get active(){ return this.phase !== 'idle'; }
  teamOf(id: string){ return this.members.get(id)?.team ?? null; }
  private clear(){
    this.members.clear(); this.winner = ''; this.titles = []; this.climaxSaid = false;
    for (const t of ALL) this.teams[t] = { power: 0, shieldUntil: 0, boostX: 1, boostUntil: 0, drumUntil: 0, crown: '' };
  }

  start(now: number){
    this.clear();
    this.endsAt = now + BATTLE.phases.reduce((n, p) => n + p.ms, 0) * this.scale;
    this.phaseI = -1; this.next(now);
  }

  stop(){ this.phase = 'idle'; this.phaseI = -1; this.clear(); this.dirty = true; this.emit({ k: 'battle', ev: 'end', id: '', name: '', text: '⚔️ Đại chiến đã dừng, đám cưới mở lại' }); }

  private next(now: number){
    this.phaseI++;
    const p = BATTLE.phases[this.phaseI];
    if (!p){ this.phase = 'idle'; this.clear(); this.dirty = true; this.emit({ k: 'battle', ev: 'end', id: '', name: '', text: '💒 Hết Đại chiến, đám cưới làng quê mở lại' }); return; }
    this.phase = p.key; this.phaseEnds = now + p.ms * this.scale; this.dirty = true;
    if (p.key === 'final') this.finish();
    const line: Record<string, string> = {
      recruit: 'Đại chiến Nhà trai – Nhà gái bắt đầu! Bình luận 1 vào Nhà trai, 2 vào Nhà gái, 3 vào đội Cướp dâu!',
      sinhle: 'Hết giờ tuyển quân! Đại chiến sính lễ bắt đầu, hai nhà so tài sức mạnh!',
      cuop: 'Đội Cướp dâu xuất kích, sức mạnh nhân 1 rưỡi! Hai nhà phòng thủ! Kỹ năng tấn công đã mở!',
      phancong: 'Phản công! Mọi kỹ năng đều mở, 10 giây cuối điểm nhân đôi!',
      final: this.winner ? `Chung kết! ${TEAMS[this.winner].name} chiến thắng với ${Math.round(this.teams[this.winner].power)} sức mạnh!` : 'Chung kết! Trận này hòa, chưa phe nào có sức mạnh!',
    };
    this.emit({ k: 'battle', ev: this.phaseI === 0 ? 'start' : p.key === 'final' ? 'win' : 'phase', id: '', name: p.name, team: this.winner || undefined, text: line[p.key] });
  }

  private finish(){
    const ranked = ALL.map(t => [t, this.teams[t].power] as const).sort((a, b) => b[1] - a[1]);
    this.winner = ranked[0][1] > 0 ? ranked[0][0] : '';
    const list = [...this.members.entries()];
    const best = (val: (m: Member) => number, team?: Team) => list.filter(([, m]) => (!team || m.team === team) && val(m) > 0).sort((a, b) => val(b[1]) - val(a[1]))[0];
    const titles: BattleState['titles'] = [];
    for (const t of ALL){ const b = best(m => m.gifted, t); if (b) titles.push({ title: `🏆 Đại tướng ${TEAMS[t].name}`, id: b[0], name: b[1].name, team: t }); }
    const ch = best(m => m.cheer); if (ch) titles.push({ title: '📣 Cổ động viên số 1', id: ch[0], name: ch[1].name, team: ch[1].team });
    const dm = best(m => m.damage); if (dm) titles.push({ title: '⚔️ Chiến thần', id: dm[0], name: dm[1].name, team: dm[1].team });
    this.titles = titles;
  }

  // Chọn phe. Phút tuyển quân được đổi phe; sau đó ai chưa có phe vẫn vào được, đã có phe thì giữ nguyên.
  join(id: string, name: string, team: Team, now: number){
    if (!this.active || this.phase === 'final') return false;
    const m = this.members.get(id);
    if (m?.team === team) return false;
    if (m && this.phase !== 'recruit'){ this.emit({ k: 'battle', ev: 'locked', id, name, team: m.team, text: `${name} đã ở phe ${TEAMS[m.team].name}, hết giờ đổi phe` }); return false; }
    if (m) m.team = team;
    else { this.members.set(id, { team, name, gifted: 0, cheer: 0, damage: 0, cheerAt: 0, likeBank: 0 }); this.gain(team, BATTLE.joinPts, now); }
    this.dirty = true;
    this.emit({ k: 'battle', ev: 'join', id, name, team, text: `${TEAMS[team].icon} ${name} vào phe ${TEAMS[team].name}` });
    return true;
  }

  // Bình luận thường của người đã có phe: cổ vũ +2 (trống đang đánh thì x3), mỗi người 5 giây một lần
  cheer(id: string, now: number){
    const m = this.members.get(id);
    if (!m || this.phase === 'final' || now - m.cheerAt < BATTLE.cheerCooldownMs) return false;
    m.cheerAt = now;
    const pts = BATTLE.cheerPts * (now < this.teams[m.team].drumUntil ? BATTLE.drumX : 1);
    m.cheer += pts; this.gain(m.team, pts, now);
    return true;
  }

  like(id: string, count: number, now: number){
    const m = this.members.get(id);
    if (!m || this.phase === 'final') return;
    m.likeBank += count;
    const pts = Math.floor(m.likeBank / BATTLE.likesPerPt);
    if (pts){ m.likeBank -= pts * BATTLE.likesPerPt; m.cheer += pts; this.gain(m.team, pts, now); }
  }

  private mult(team: Team, now: number){
    const r = this.teams[team];
    let x = now < r.boostUntil ? r.boostX : 1;
    if (this.phase === 'cuop' && team === 'cuop') x *= BATTLE.cuopX;
    if (this.climax(now)) x *= 2;
    return x;
  }
  private climax(now: number){ return this.phase === 'phancong' && this.phaseEnds - now <= BATTLE.climaxMs * Math.min(1, this.scale * 3); }
  private gain(team: Team, pts: number, now: number){ const add = pts * this.mult(team, now); this.teams[team].power += add; this.dirty = true; return add; }

  // Phe mạnh nhất trừ phe mình: mục tiêu của kiếm và ngựa chiến
  private leader(except: Team){ return ALL.filter(t => t !== except).sort((a, b) => this.teams[b].power - this.teams[a].power)[0]; }

  private hit(by: Team, target: Team, dmg: number, now: number){
    const r = this.teams[target];
    if (now < r.shieldUntil) return 0;
    const lost = Math.min(r.power, dmg); r.power -= lost; this.dirty = true;
    return lost;
  }

  // total: số xu lần tặng. Người chưa có phe được xếp vào phe đang yếu nhất (cơ hội lật kèo).
  gift(id: string, name: string, total: number, now: number){
    if (!this.active) return;
    let m = this.members.get(id);
    if (this.phase === 'final'){ this.emit({ k: 'battle', ev: 'power', id, name, team: m?.team, amount: total, gift: battleGiftFor(total).key, text: `🎉 ${name} tặng ${total} xu chúc mừng phe thắng` }); return; }
    if (!m){
      const weak = [...ALL].sort((a, b) => this.teams[a].power - this.teams[b].power)[0];
      this.join(id, name, weak, now); m = this.members.get(id)!;
    }
    m.name = name; m.gifted += total;
    const team = m.team, g = battleGiftFor(total), r = this.teams[team];
    const add = this.gain(team, total, now);
    const skills = this.phase === 'cuop' || this.phase === 'phancong';
    const base = { id, name, team, gift: g.key, amount: Math.round(add) };
    const T = TEAMS[team].name;
    switch (g.key){
      case 'trong': r.drumUntil = now + BATTLE.drumMs; this.emit({ ...base, k: 'battle', ev: 'drum', text: `🥁 ${name} nổi trống! Bình luận cổ vũ của ${T} x3 trong 15 giây` }); break;
      case 'khien': r.shieldUntil = now + BATTLE.shieldMs; this.emit({ ...base, k: 'battle', ev: 'shield', text: `🛡️ ${name} dựng khiên, ${T} miễn đòn 10 giây` }); break;
      case 'rong': r.boostX = Math.max(now < r.boostUntil ? r.boostX : 1, BATTLE.dragonX); r.boostUntil = Math.max(r.boostUntil, now + BATTLE.dragonMs); this.emit({ ...base, k: 'battle', ev: 'dragon', text: `🐉 ${name} gọi Rồng! Cả ${T} sức mạnh x1.5 trong 20 giây` }); break;
      case 'vuongmien':
        r.crown = id; r.boostX = BATTLE.crownX; r.boostUntil = Math.max(r.boostUntil, now + BATTLE.crownMs);
        this.emit({ ...base, k: 'battle', ev: 'crown', text: `👑 ${name} đội Vương miện, làm Chủ soái ${T}! Cả đội x2 trong 30 giây` }); break;
      case 'kiem': case 'ngua': case 'songlong': {
        if (!skills){ this.emit({ ...base, k: 'battle', ev: 'power', text: `${g.icon} ${name} góp ${g.name} cho ${T}: +${Math.round(add)} sức mạnh (kỹ năng tấn công mở từ phút 5)` }); break; }
        if (g.key === 'songlong'){
          let dealt = 0;
          for (const t of ALL) if (t !== team){ const pct = now < this.teams[t].shieldUntil ? BATTLE.ultimatePct / 2 : BATTLE.ultimatePct; const lost = this.teams[t].power * pct; this.teams[t].power -= lost; dealt += lost; }
          m.damage += dealt; this.dirty = true;
          this.emit({ ...base, k: 'battle', ev: 'ultimate', amount: Math.round(dealt), text: `🐲 SONG LONG! ${name} tung đại chiêu, các phe khác mất 25% sức mạnh!` });
          break;
        }
        const target = this.leader(team), dmg = g.key === 'ngua' ? BATTLE.horseHit : BATTLE.swordHit, lost = this.hit(team, target, dmg, now);
        m.damage += lost;
        if (!lost && now < this.teams[target].shieldUntil) this.emit({ ...base, k: 'battle', ev: 'blocked', target, text: `🛡️ ${TEAMS[target].name} giơ khiên chặn đòn ${g.name} của ${name}!` });
        else this.emit({ ...base, k: 'battle', ev: 'attack', target, amount: Math.round(lost), text: `${g.icon} ${name} ${g.key === 'ngua' ? 'cưỡi ngựa chiến xông vào' : 'vung kiếm đánh'} ${TEAMS[target].name}: −${Math.round(lost)} sức mạnh!` });
        break;
      }
      default: this.emit({ ...base, k: 'battle', ev: 'power', text: `${g.icon} ${name} góp ${g.name} cho ${T}: +${Math.round(add)} sức mạnh` });
    }
    this.dirty = true;
  }

  tick(now: number){
    if (!this.active) return;
    if (this.climax(now) && !this.climaxSaid){ this.climaxSaid = true; this.dirty = true; this.emit({ k: 'battle', ev: 'climax', id: '', name: '', text: '🔥 10 giây cuối! Mọi điểm nhân đôi, lật kèo ngay bây giờ!' }); }
    if (now >= this.phaseEnds) this.next(now);
  }

  pub(now: number, avatar: (id: string) => boolean): BattleState {
    const teams = {} as Record<Team, BattleTeamState>;
    const list = [...this.members.entries()];
    for (const t of ALL){
      const r = this.teams[t], mine = list.filter(([, m]) => m.team === t);
      const top = mine.filter(([, m]) => m.gifted > 0).sort((a, b) => b[1].gifted - a[1].gifted);
      // thủ lĩnh: người đội Vương miện, không thì người tặng nhiều nhất, chưa ai tặng thì người vào phe đầu tiên
      const lid = r.crown && this.members.get(r.crown)?.team === t ? r.crown : top[0]?.[0] ?? mine[0]?.[0];
      const lm = lid ? this.members.get(lid)! : null;
      teams[t] = {
        power: Math.round(r.power), count: mine.length, shieldMs: Math.max(0, r.shieldUntil - now), drumMs: Math.max(0, r.drumUntil - now),
        boostX: now < r.boostUntil ? r.boostX : 1, boostMs: Math.max(0, r.boostUntil - now),
        leader: lm && lid ? { id: lid, name: lm.name, gifted: lm.gifted, avatar: avatar(lid), crown: r.crown === lid } : null,
        top: top.slice(0, 3).map(([id, m]) => ({ id, name: m.name, value: m.gifted, sim: false })),
      };
    }
    return {
      phase: this.phase, phaseLeftMs: this.active ? Math.max(0, this.phaseEnds - now) : 0, leftMs: this.active ? Math.max(0, this.endsAt - now) : 0,
      climax: this.climax(now), teams, members: list.slice(-300).map(([id, m]) => [id, m.team]), winner: this.winner, titles: this.titles,
    };
  }
}
