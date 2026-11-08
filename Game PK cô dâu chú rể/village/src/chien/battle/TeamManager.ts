import type { PlayerRegistry } from '../players/PlayerRegistry.ts';
import type { PlayerIdentity, TeamKey } from '../types.ts';

// Phân phe theo ba cách: người xem bình luận chọn phe, host gán phe, hệ thống tự chia khi chưa chọn.
// Người đã có quân trên sân thì giữ phe tới hết trận (trừ khi host bật chế độ đặc biệt cho phép hai phe).
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const TRAI = new Set(['1', 'trai', 'nha trai', 'nt', 'team trai', 'phe trai', 'vao nha trai', 'chon trai', 'chu re', 'xanh']);
const GAI = new Set(['2', 'gai', 'nha gai', 'ng', 'team gai', 'phe gai', 'vao nha gai', 'chon gai', 'co dau', 'do', 'hong']);

// Bình luận chọn phe: phải là cả câu (để "nhà gái đẹp quá" không bị hiểu là chọn phe)
export function parseTeamCommand(text: string): TeamKey | null {
  const t = fold(String(text ?? '')).replace(/^#/, '');
  if (TRAI.has(t)) return 'trai';
  if (GAI.has(t)) return 'gai';
  return null;
}

export type TeamResult = { ok: true; team: TeamKey; changed: boolean } | { ok: false; team: TeamKey; reason: 'locked' };

export class TeamManager {
  allowDualTeam = false;
  private players: PlayerRegistry;
  private hasForces: (userId: string, team: TeamKey) => boolean;
  private flip = 0;

  constructor(players: PlayerRegistry, hasForces: (userId: string, team: TeamKey) => boolean){ this.players = players; this.hasForces = hasForces; }

  private locked(p: PlayerIdentity, want: TeamKey){
    if (this.allowDualTeam || !p.Team || p.Team === want) return false;
    return this.hasForces(p.UserId, p.Team);
  }

  // Người xem chọn phe bằng bình luận, hoặc host gán. Bị khóa thì ghi nhớ để áp dụng từ vòng sau.
  choose(p: PlayerIdentity, team: TeamKey, source: 'chat' | 'host' | 'sim'): TeamResult {
    if (this.locked(p, team)){ p.nextTeam = team; return { ok: false, team: p.Team!, reason: 'locked' }; }
    const changed = p.Team !== team;
    p.Team = team; p.teamSource = source; p.nextTeam = null;
    return { ok: true, team, changed };
  }

  // Người tặng quà: dùng phe đã chọn; chưa chọn thì chia vào phe đang yếu hơn (ít xu hơn, rồi ít người hơn)
  resolve(p: PlayerIdentity, forced?: TeamKey): TeamKey {
    if (forced){ const r = this.choose(p, forced, 'sim'); return r.team; }
    if (p.Team) return p.Team;
    const sum = { trai: 0, gai: 0 }, cnt = { trai: 0, gai: 0 };
    for (const q of this.players.all.values()) if (q.Team){ sum[q.Team] += q.round.gift; cnt[q.Team]++; }
    let team: TeamKey;
    if (sum.trai !== sum.gai) team = sum.trai < sum.gai ? 'trai' : 'gai';
    else if (cnt.trai !== cnt.gai) team = cnt.trai < cnt.gai ? 'trai' : 'gai';
    else team = this.flip++ % 2 ? 'gai' : 'trai';
    p.Team = team; p.teamSource = 'auto';
    return team;
  }
}
