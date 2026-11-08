import { PK, pkSkillFor } from '../../shared/balance.ts';
import type { PkSkill } from '../../shared/balance.ts';
import type { PkState, PkTeam } from '../../shared/types.ts';

type Who = { id: string; name: string };

// PK cướp dâu, cướp rể: kẻ cướp xông lên sân khấu, cả sân chia hai đội trong 2 phút.
// Đội Dâu (hoặc Đội Rể) bảo vệ người bị cướp, Đội Cướp theo kẻ cướp. Bình luận 1 vào đội bảo vệ, 2 vào Đội Cướp.
// Quà cộng điểm bằng số xu cho đội của người tặng, kèm một chiêu đánh theo mức xu. Hết giờ Đội Cướp nhiều điểm hơn thì cướp được.
// role: vai kẻ cướp muốn lấy ('groom' là cướp dâu: kẻ cướp làm chú rể; 'bride' là cướp rể: kẻ cướp làm cô dâu).
export class CuopPk {
  readonly score: Record<PkTeam, number> = { def: 0, cuop: 0 };
  readonly members = new Map<string, PkTeam>();
  private pts = new Map<string, { name: string; team: PkTeam; pts: number }>();
  readonly called = new Set<number>();                     // các mốc giây còn lại MC đã hô
  readonly endsAt: number;
  readonly role: 'bride' | 'groom';
  readonly thief: Who; readonly holder: Who; readonly stolen: Who;
  readonly startedAt: number;

  constructor(role: 'bride' | 'groom', thief: Who, holder: Who, stolen: Who, xu: number, now: number){
    this.role = role; this.thief = thief; this.holder = holder; this.stolen = stolen;
    this.startedAt = now; this.endsAt = now + PK.ms;
    this.members.set(holder.id, 'def'); this.members.set(stolen.id, 'def'); this.members.set(thief.id, 'cuop');
    this.add(thief.id, thief.name, 'cuop', xu);                // quà cướp của kẻ cướp là điểm khởi đầu của Đội Cướp
  }

  // đội của một người: đã chọn thì theo đội đó; chưa chọn thì vào đội bảo vệ
  teamOf(id: string): PkTeam { return this.members.get(id) ?? 'def'; }
  isLeader(id: string){ return id === this.thief.id || id === this.holder.id || id === this.stolen.id; }

  // Ba nhân vật chính giữ đội của mình; người khác đổi đội thoải mái, điểm đã góp vẫn ở đội cũ
  join(id: string, team: PkTeam){
    if (this.isLeader(id) || this.members.get(id) === team) return false;
    this.members.set(id, team);
    if (this.members.size > 3000) this.members.delete(this.members.keys().next().value as string);
    return true;
  }

  gift(id: string, name: string, xu: number): { team: PkTeam; skill: PkSkill } {
    const team = this.teamOf(id);
    this.members.set(id, team);
    this.add(id, name, team, xu);
    return { team, skill: pkSkillFor(xu) };
  }

  private add(id: string, name: string, team: PkTeam, xu: number){
    this.score[team] += xu;
    const r = this.pts.get(id + '|' + team) ?? { name, team, pts: 0 };
    r.pts += xu; r.name = name; this.pts.set(id + '|' + team, r);
  }

  // hòa thì đội bảo vệ thắng: kẻ cướp phải hơn hẳn mới cướp được
  winner(): PkTeam { return this.score.cuop > this.score.def ? 'cuop' : 'def'; }

  pub(now: number): PkState {
    const count = { def: 0, cuop: 0 };
    for (const t of this.members.values()) count[t]++;
    const top = (t: PkTeam) => [...this.pts.values()].filter(r => r.team === t).sort((a, b) => b.pts - a.pts)[0]?.name ?? '';
    return {
      kind: this.role === 'groom' ? 'dau' : 're', thief: this.thief, holder: this.holder, stolen: this.stolen,
      leftMs: Math.max(0, this.endsAt - now), score: { ...this.score }, count, top: { def: top('def'), cuop: top('cuop') },
      members: [...this.members].slice(-400),
    };
  }
}
