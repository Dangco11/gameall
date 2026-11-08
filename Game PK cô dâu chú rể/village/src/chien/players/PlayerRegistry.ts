import type { PlayerIdentity, PlayerRow, RoundStats, TeamKey } from '../types.ts';

// Tên người chơi: bỏ ký tự điều khiển, ký tự vô hình, ký tự đảo chiều chữ (dùng để giả mạo tên), giới hạn 20 ký tự.
// Màn hình luôn gán bằng textContent, không bao giờ chèn HTML.
const BAD_CP: [number, number][] = [[0x0, 0x1f], [0x7f, 0x9f], [0xad, 0xad], [0x200b, 0x200f], [0x2028, 0x202e], [0x2060, 0x206f], [0xfeff, 0xfeff], [0xfff9, 0xfffb]];
const bad = (ch: string) => { const c = ch.codePointAt(0) ?? 0; return BAD_CP.some(([a, b]) => c >= a && c <= b); };
export function cleanName(s: unknown, max = 20){
  const t = [...String(s ?? '').normalize('NFC')].filter(ch => !bad(ch)).join('').replace(/\s+/g, ' ').trim();
  const cp = [...t];
  return (cp.length > max ? cp.slice(0, max - 1).join('') + '…' : t) || 'Ẩn danh';
}
export const cleanId = (s: unknown) => String(s ?? '').replace(/[^\w.@:-]/g, '').slice(0, 64);

const emptyRound = (): RoundStats => ({ gift: 0, units: 0, damage: 0, kills: 0, bosses: 0, deaths: 0, baseDamage: 0, power: 0, likes: 0 });

// Điểm xếp hạng trong trận: sát thương + 150 mỗi mạng hạ + giá trị quà. MVP là người điểm cao nhất.
export const scoreOf = (r: RoundStats) => Math.round(r.damage + r.kills * 150 + r.gift * 20 + r.baseDamage * 0.5);

export class PlayerRegistry {
  readonly all = new Map<string, PlayerIdentity>();
  // quy tắc hiện ảnh đại diện (server quyết định: qua proxy /avatar/<id>, link trực tiếp, hay ảnh mặc định)
  avatarView: (p: PlayerIdentity) => string = () => '';

  get(id: string){ return this.all.get(id); }

  ensure(d: { UserId: string; Username?: string; DisplayName?: string; AvatarUrl?: string; Sim?: boolean }, now = Date.now()){
    const id = cleanId(d.UserId);
    let p = this.all.get(id);
    if (!p){
      p = { UserId: id, Username: cleanName(d.Username || id, 32), DisplayName: cleanName(d.DisplayName || d.Username || id), AvatarUrl: '', Team: null,
        TotalGiftValue: 0, TotalUnitsSpawned: 0, TotalDamage: 0, TotalKills: 0, TotalBossSummoned: 0, teamSource: '', nextTeam: null, round: emptyRound(), sim: !!d.Sim, lastSeen: now };
      this.all.set(id, p);
      if (this.all.size > 20_000) this.evict();
    }
    if (d.DisplayName) p.DisplayName = cleanName(d.DisplayName);
    if (d.Username) p.Username = cleanName(d.Username, 32);
    if (d.AvatarUrl && /^https?:\/\//i.test(d.AvatarUrl)) p.AvatarUrl = String(d.AvatarUrl).slice(0, 600);
    p.lastSeen = now;
    return p;
  }
  // người lâu không xuất hiện, không có quà trong vòng này thì bỏ khỏi bộ nhớ
  private evict(){
    const old = [...this.all.values()].filter(p => !p.round.gift).sort((a, b) => a.lastSeen - b.lastSeen).slice(0, 2000);
    for (const p of old) this.all.delete(p.UserId);
  }

  addGift(p: PlayerIdentity, value: number){ p.TotalGiftValue += value; p.round.gift += value; }
  addPower(p: PlayerIdentity, power: number){ p.round.power += power; }
  addUnits(p: PlayerIdentity, n: number, boss: boolean){ p.TotalUnitsSpawned += n; p.round.units += n; if (boss){ p.TotalBossSummoned += n; p.round.bosses += n; } }
  addDamage(id: string, dmg: number, base: boolean){ const p = this.all.get(id); if (!p) return; p.TotalDamage += dmg; p.round.damage += dmg; if (base) p.round.baseDamage += dmg; }
  addKill(id: string){ const p = this.all.get(id); if (p){ p.TotalKills++; p.round.kills++; } }
  addDeath(id: string){ const p = this.all.get(id); if (p) p.round.deaths++; }

  // Vòng mới: xóa thống kê trận, giữ danh tính, phe và tổng tích lũy. Phe đổi bị khóa giữa trận được áp dụng bây giờ.
  resetRound(){ for (const p of this.all.values()){ p.round = emptyRound(); if (p.nextTeam){ p.Team = p.nextTeam; p.nextTeam = null; } } }

  row(p: PlayerIdentity): PlayerRow {
    return { id: p.UserId, name: p.DisplayName, avatar: this.avatarView(p), team: p.Team ?? 'trai', gift: p.round.gift, units: p.round.units, damage: Math.round(p.round.damage), kills: p.round.kills, bosses: p.round.bosses, score: scoreOf(p.round) };
  }
  active(){ return [...this.all.values()].filter(p => p.Team && (p.round.gift > 0 || p.round.units > 0 || p.round.damage > 0)); }
  top(team: TeamKey | null, n: number, by: 'gift' | 'score' = 'gift'){
    return this.active().filter(p => !team || p.Team === team).map(p => this.row(p))
      .sort((a, b) => (by === 'gift' ? b.gift - a.gift || b.score - a.score : b.score - a.score || b.gift - a.gift)).slice(0, n);
  }
}
