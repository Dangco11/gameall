import { COSTUMES, MAX_LOTS, ONLINE_TIMEOUT_MS, OUTFIT, START_MONEY, levelFromXp, titleForLevel } from '../shared/balance.ts';
import type { Player, PubPlayer } from '../shared/types.ts';

function hash(s: string){ let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
export const cleanName = (s: string) => String(s || '').replace(/[\u0000-\u001f\u007f​-‏‪-‮]/g, '').trim().slice(0, 24) || 'Ẩn danh';

export function newPlayer(id: string, name: string, sim: boolean, now: number): Player {
  const h = hash(id);
  return {
    id, name: cleanName(name), sim, joinedAt: now, lastSeen: now, lot: -1,
    outfit: { shirt: h % OUTFIT.shirts.length, pants: (h >>> 8) % OUTFIT.pants.length, hat: (h >>> 16) % 5 < 3 ? 0 : (h >>> 16) % 5 === 3 ? 1 : 2, costume: '' }, costumes: [],
    xp: 0, level: 1, money: START_MONEY, title: titleForLevel(1),
    houseLevel: 1, decor: [], tools: [],
    rice: { stage: 'fallow', progress: 0, water: 0, fert: false, watered: 0 },
    pond: { fish: 0, growth: 0, fed: 0 },
    coop: { chickens: 0, ducks: 0, fed: 0, eggs: 0, eggProgress: 0, matureAt: 0 },
    inv: { rice: 0, fish: 0, egg: 0, wood: 0, brick: 0 },
    stats: { harvests: 0, catches: 0, contributed: 0, festivalWins: 0, gifted: 0, earned: 0 },
    catchAt: 0, shareAt: 0, gender: '', look: 0, giftDay: '', giftSkip: 0, giftMaterials: 0, giftHouse: 0, likeHour: 0, likePoints: 0, likeBank: 0,
  };
}

// Dữ liệu cũ thiếu trường mới thì lấy mặc định, để nâng cấp game không làm hỏng players.txt.
function repair(p: Player): Player {
  const d = newPlayer(p.id, p.name, !!p.sim, p.joinedAt || Date.now());
  const out = { ...d, ...p, outfit: { ...d.outfit, ...p.outfit }, rice: { ...d.rice, ...p.rice }, pond: { ...d.pond, ...p.pond },
    coop: { ...d.coop, ...p.coop }, inv: { ...d.inv, ...p.inv }, stats: { ...d.stats, ...p.stats } };
  out.decor = Array.isArray(p.decor) ? p.decor : []; out.tools = Array.isArray(p.tools) ? p.tools : [];
  out.costumes = Array.isArray(p.costumes) ? p.costumes.filter(k => k in COSTUMES) : [];
  if (out.outfit.costume && !out.costumes.includes(out.outfit.costume)) out.outfit.costume = '';
  out.name = cleanName(out.name);
  return out;
}

export class PlayerManager {
  readonly all = new Map<string, Player>();
  private lots: (string | null)[] = new Array(MAX_LOTS).fill(null);
  private dirtyIds = new Set<string>();
  private removedIds = new Set<string>();

  constructor(saved: Player[] = []){
    for (const raw of saved){
      const p = repair(raw);
      if (p.lot >= 0 && p.lot < MAX_LOTS && !this.lots[p.lot]) this.lots[p.lot] = p.id; else p.lot = -1;
      this.all.set(p.id, p);
    }
  }

  get(id: string){ return this.all.get(id); }
  isOnline(p: Player, now: number){ return now - p.lastSeen < ONLINE_TIMEOUT_MS && p.lot >= 0; }

  // Lấy hoặc tạo cư dân. Người cũ quay lại giữ nguyên nhà cửa, ruộng vườn.
  ensure(id: string, name: string, sim: boolean, now: number){
    let p = this.all.get(id), created = false;
    if (!p){ p = newPlayer(id, name, sim, now); this.all.set(id, p); created = true; }
    else if (name && cleanName(name) !== p.name) p.name = cleanName(name);
    p.lastSeen = now;
    if (p.lot < 0) this.assignLot(p, now);
    this.touch(p);
    return { p, created };
  }

  // Hết lô thì người vắng lâu nhất nhường lô (cư dân mô phỏng nhường trước). Dữ liệu của họ vẫn giữ, quay lại sẽ có lô mới.
  private assignLot(p: Player, now: number){
    let lot = this.lots.indexOf(null);
    if (lot < 0){
      let worst: Player | null = null;
      for (const id of this.lots){
        const q = this.all.get(id!)!;
        if (this.isOnline(q, now) && !q.sim) continue;
        if (!worst || (q.sim && !worst.sim) || (q.sim === worst.sim && q.lastSeen < worst.lastSeen)) worst = q;
      }
      if (!worst) return;
      lot = worst.lot; worst.lot = -1; this.removedIds.add(worst.id); this.touch(worst);
    }
    this.lots[lot] = p.id; p.lot = lot;
  }

  remove(id: string){
    const p = this.all.get(id);
    if (!p) return;
    if (p.lot >= 0) this.lots[p.lot] = null;
    this.all.delete(id); this.removedIds.add(id); this.dirtyIds.delete(id);
  }

  addXp(p: Player, xp: number){
    if (xp <= 0) return null;
    p.xp += Math.round(xp);
    const lv = levelFromXp(p.xp);
    if (lv === p.level) return null;
    p.level = lv;
    p.title = titleForLevel(lv);
    return lv;
  }

  touch(p: Player){ this.dirtyIds.add(p.id); }
  takeDirty(){ const ids = [...this.dirtyIds]; this.dirtyIds.clear(); return ids.map(id => this.all.get(id)).filter((p): p is Player => !!p); }
  takeRemoved(){ const ids = [...this.removedIds]; this.removedIds.clear(); return ids; }

  withLots(){ return [...this.all.values()].filter(p => p.lot >= 0); }

  pub(p: Player, now: number): PubPlayer {
    return {
      id: p.id, name: p.name, sim: p.sim, lot: p.lot, online: this.isOnline(p, now), outfit: p.outfit,
      level: p.level, money: Math.round(p.money), title: p.title, houseLevel: p.houseLevel, decor: p.decor, tools: p.tools,
      rice: { stage: p.rice.stage, progress: Math.round(p.rice.progress * 100) / 100, water: p.rice.water > 0, fert: p.rice.fert },
      pond: { fish: p.pond.fish, growth: Math.round(p.pond.growth * 100) / 100, fed: p.pond.fed > 0 },
      coop: { chickens: p.coop.chickens, ducks: p.coop.ducks, fed: p.coop.fed > 0, eggs: p.coop.eggs },
      inv: p.inv, contributed: Math.round(p.stats.contributed), gifted: p.stats.gifted, wins: p.stats.festivalWins, gender: p.gender, look: p.look,
    };
  }
}
