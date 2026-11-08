import { BOMB_RADIUS, COLORS, F, FX_MS, JOIN_WORDS, WATCH_WORDS, PICKABLE, RACE, SPEED, colorFromText, norm, planeFromText, skillFor } from '../shared/game.ts';
import type { PlaneKey, SkillKey } from '../shared/game.ts';
import { MAPS, mapOf } from '../shared/maps.ts';
import type { MapKey } from '../shared/maps.ts';
import type { Fx, Phase, Podium, RaceState, RacerPub } from '../shared/types.ts';

// Cuộc đua chạy trên server: server giữ quãng đường, tốc độ, skill của mọi máy bay, màn hình chỉ vẽ lại.
// Mỗi người xem chỉ có một máy bay. Quà nào cũng không bị mất: lúc chưa xuất phát thì cất vào kho, xuất phát là bung ra.

export interface Racer {
  id: string; name: string; plane: PlaneKey; basePlane: PlaneKey; color: number; avatar: string; bot: boolean; sim: boolean;
  d: number; v: number; lap: number; place: number; lane: number; fin: number; late: boolean;
  boostUntil: number; engineUntil: number; nitroUntil: number; rocketUntil: number; superUntil: number; jetUntil: number;
  shieldUntil: number; stunUntil: number; slowUntil: number; escortUntil: number; crashUntil: number;
  short: { end: number; mid: number; crash: boolean } | null;
  likes: number; likeFxAt: number; watchAt: number; gifted: number; lastActive: number; joinedAt: number;
  noise: number; noiseAt: number; botNext: number;
  bank: { skill: SkillKey; n: number }[];
}
export interface RaceResult { id: string; name: string; plane: PlaneKey; color: number; ms: number; place: number; bot: boolean; late: boolean; sim: boolean }
export interface Who { id: string; name: string; avatar?: string; sim?: boolean }

const BOT_NAMES = ['AI Đại Bàng', 'AI Chim Ưng', 'AI Phượng Hoàng', 'AI Hải Âu', 'AI Én Bạc', 'AI Diều Hâu', 'AI Thiên Nga', 'AI Sấm Sét', 'AI Bồ Câu', 'AI Cò Trắng'];
const hash = (s: string) => { let h = 2166136261; for (let i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const L = RACE.lapLen;
// d vừa đi qua mốc `at` (phần trăm vòng) trong lần cập nhật này
const crossed = (prev: number, d: number, at: number) => d > 0 && Math.floor((d - at * L) / L) > Math.floor((prev - at * L) / L);

export class Race {
  readonly racers = new Map<string, Racer>();
  phase: Phase = 'lobby';
  phaseEnd = 0;
  raceNo = 0;
  startAt = 0;
  laps: number = RACE.laps;
  bots = 4;
  map: MapKey = MAPS[0].key;
  mapMode: MapKey | 'auto' = 'auto';
  podium: Podium[] = [];
  private fx: Fx[] = [];
  private pending: { at: number; run: () => void }[] = [];
  private finished: string[] = [];
  private leaderId = '';
  private leadFxAt = 0;
  private last = 0;
  private lobbies = 0;
  private now: () => number;
  private rand: () => number;
  onRaceEnd: (results: RaceResult[]) => void = () => {};
  isRecord: (ms: number) => boolean = () => false;

  constructor(now: () => number = Date.now, rand: () => number = Math.random){
    this.now = now; this.rand = rand;
    this.last = now();
    this.enterLobby(now(), RACE.lobbyMs);
  }

  get total(){ return this.laps * L; }
  get racing(){ return this.phase === 'race' || this.phase === 'finish'; }
  realCount(){ let n = 0; for (const r of this.racers.values()) if (!r.bot) n++; return n; }
  takeFx(){ const f = this.fx; this.fx = []; return f; }
  private emit(f: Fx){ this.fx.push(f); if (this.fx.length > 400) this.fx.shift(); }

  /* ----------------------------------------------------------- người chơi */
  join(w: Who, plane?: PlaneKey | null): Racer | null {
    const now = this.now(), old = this.racers.get(w.id);
    if (old){ old.lastActive = now; if (w.avatar) old.avatar = w.avatar; return old; }
    const r = this.add(w, plane);
    if (!r) return null;
    this.emit({ k: 'join', id: r.id, name: r.name, plane: r.plane, late: r.late });
    if (this.phase === 'lobby') this.fitBots();          // đông người thật thì bớt bot
    return r;
  }

  private add(w: Who, plane?: PlaneKey | null, bot = false): Racer | null {
    const now = this.now();
    // đầy chỗ thì nhường chỗ của bot trước
    if (this.racers.size >= RACE.maxRacers){
      const b = [...this.racers.values()].find(x => x.bot);
      if (!b) return null;
      this.racers.delete(b.id);
    }
    const h = hash(w.id), p = plane ?? PICKABLE[h % PICKABLE.length].key;
    const r: Racer = {
      id: w.id, name: w.name || 'Ẩn danh', plane: p, basePlane: p, color: COLORS[(h >>> 4) % COLORS.length].hex,
      avatar: w.avatar ?? '', bot, sim: !!w.sim,
      d: 0, v: 0, lap: 0, place: this.racers.size + 1, lane: 0, fin: 0, late: false,
      boostUntil: 0, engineUntil: 0, nitroUntil: 0, rocketUntil: 0, superUntil: 0, jetUntil: 0,
      shieldUntil: 0, stunUntil: 0, slowUntil: 0, escortUntil: 0, crashUntil: 0, short: null,
      likes: 0, likeFxAt: 0, watchAt: 0, gifted: 0, lastActive: now, joinedAt: now, noise: 1, noiseAt: 0, botNext: 0, bank: [],
    };
    this.racers.set(r.id, r);
    this.place(r);
    return r;
  }

  // Vị trí lúc mới vào: chưa đua thì xếp hàng trên đường băng, đang đua thì vào sau người cuối 40 m (không tính kỷ lục)
  private place(r: Racer){
    if (this.phase === 'lobby' || this.phase === 'countdown'){ this.grid(); return; }
    if (this.phase === 'result'){ r.d = this.total + RACE.landM; r.v = 0; return; }   // đứng chờ ở đường băng tới cuộc sau
    // vào giữa chừng: xuất phát từ vạch đầu đường băng, cất cánh như mọi người (không tính kỷ lục)
    const h = hash(r.id);
    r.d = -6 - (h >>> 8) % 4 * RACE.gridGap * 0.5; r.v = 0; r.late = true; r.lap = 0;
    r.lane = h % RACE.gridCols;
  }

  private grid(){
    const list = [...this.racers.values()].sort((a, b) => (a.bot ? 1 : 0) - (b.bot ? 1 : 0) || a.joinedAt - b.joinedAt);
    list.forEach((r, i) => { r.lane = i % RACE.gridCols; r.d = -Math.floor(i / RACE.gridCols) * RACE.gridGap - 6; r.place = i + 1; });
  }

  comment(w: Who, text: string){
    const t = norm(text), plane = planeFromText(text), color = colorFromText(text), r = this.racers.get(w.id);
    if (r) r.lastActive = this.now();
    if (plane){
      if (!r){ this.join(w, plane); return; }
      r.basePlane = plane;
      // đang là máy bay VIP mạ vàng thì giữ tới hết cuộc đua, cuộc sau mới đổi
      if (r.plane !== plane && r.plane !== 'golden'){ r.plane = plane; this.emit({ k: 'plane', id: r.id, name: r.name, plane, color: r.color }); }
      return;
    }
    if (color && r){ if (r.color !== color.hex){ r.color = color.hex; this.emit({ k: 'plane', id: r.id, name: r.name, plane: r.plane, color: r.color }); } return; }
    if (WATCH_WORDS.has(t)){ this.watch(w); return; }
    if (JOIN_WORDS.has(t) && !r) this.join(w);
  }

  // Bình luận "xem": máy quay soi máy bay của người đó (chưa vào đua thì cho vào luôn). Mỗi người 12 giây một lần.
  watch(w: Who){
    const r = this.join(w), now = this.now();
    if (!r || now - r.watchAt < 12_000) return;
    r.watchAt = now;
    this.emit({ k: 'watch', id: r.id, name: r.name });
  }

  // Follow kênh: tự vào đua
  follow(w: Who){ this.join(w); }

  // Tap tim: chưa vào đua thì cho vào luôn, đang đua thì tăng tốc
  like(w: Who, count: number){
    const r = this.racers.get(w.id) ?? this.join(w), now = this.now();
    if (!r) return;
    r.lastActive = now;
    if (!this.racing || r.fin) return;
    r.likes += count;
    const n = Math.floor(r.likes / RACE.likesPerBoost);      // mỗi 2 tim cộng 0,3 giây tăng tốc nhẹ (cộng dồn tối đa 20 giây)
    r.likes -= n * RACE.likesPerBoost;
    if (!n) return;
    r.boostUntil = ext(r.boostUntil, now, FX_MS.likeBoost * n);
    if (now - r.likeFxAt > 2000){ r.likeFxAt = now; this.emit({ k: 'like', id: r.id, name: r.name }); }
  }

  // Một món quà: skill theo xu của một món, quà combo xN thì dùng N lần (tối đa 10, dư cộng thời gian)
  gift(w: Who, gift: string, diamonds: number, count: number){
    const r = this.join(w);
    if (!r) return null;
    const skill = skillFor(diamonds), n = Math.max(1, count | 0);
    r.gifted += diamonds * n;
    const banked = !this.racing || !!r.fin;
    this.emit({ k: 'gift', id: r.id, name: r.name, avatar: r.avatar, gift, count: n, xu: diamonds * n, skill: skill.key, banked });
    if (banked){
      const b = r.bank.find(x => x.skill === skill.key);
      if (b) b.n += n; else if (r.bank.length < 20) r.bank.push({ skill: skill.key, n });
    } else this.use(r, skill.key, n);
    return skill;
  }

  /* -------------------------------------------------------------- skill */
  private order(){
    return [...this.racers.values()].sort((a, b) => (a.fin && b.fin ? a.fin - b.fin : a.fin ? -1 : b.fin ? 1 : b.d - a.d));
  }
  private alive(){ return this.order().filter(r => !r.fin); }
  private guarded(t: Racer, now: number){ return t.shieldUntil > now || t.superUntil > now; }

  // Đòn đánh trúng: có khiên thì vỡ khiên, không bị gì. Đang siêu tốc (khiên kèm theo) thì khiên không vỡ.
  private hit(t: Racer, by: Racer, skill: SkillKey, effect: (now: number) => void){
    const now = this.now();
    if (t.fin) return;
    const blocked = t.shieldUntil > now;
    if (!blocked) effect(now);
    else if (t.superUntil <= now) t.shieldUntil = 0;
    this.emit({ k: 'hit', skill, id: t.id, name: t.name, by: by.id, byName: by.name, blocked });
  }
  private later(ms: number, run: () => void){ this.pending.push({ at: this.now() + ms, run }); }

  use(r: Racer, skill: SkillKey, count = 1){
    const now = this.now(), n = Math.min(count, RACE.maxRepeat), extra = Math.max(1, count / n);
    const emit = (target?: Racer) => this.emit({ k: 'skill', skill, id: r.id, name: r.name, target: target?.id, targetName: target?.name, n: count });
    const shield = (ms: number) => { r.shieldUntil = ext(r.shieldUntil, now, ms, FX_MS.maxShield); };
    switch (skill){
      case 'boost': r.boostUntil = ext(r.boostUntil, now, FX_MS.boost * count); emit(); break;
      case 'engine': r.engineUntil = ext(r.engineUntil, now, FX_MS.engine * count); emit(); break;
      case 'nitro': r.nitroUntil = ext(r.nitroUntil, now, FX_MS.nitro * count); emit(); break;
      case 'rocket': r.rocketUntil = ext(r.rocketUntil, now, FX_MS.rocket * count, 15_000); emit(); break;
      case 'super': r.superUntil = ext(r.superUntil, now, FX_MS.super * count, 40_000); shield(FX_MS.superShield * count); emit(); break;
      case 'jet':
        r.jetUntil = ext(r.jetUntil, now, FX_MS.jet * count, 40_000); r.superUntil = ext(r.superUntil, now, FX_MS.jet * count, 40_000);
        shield(FX_MS.jet * count); emit(); break;
      case 'vip':
        if (r.plane !== 'golden'){ r.plane = 'golden'; this.emit({ k: 'plane', id: r.id, name: r.name, plane: 'golden', color: r.color }); }
        r.superUntil = ext(r.superUntil, now, FX_MS.vipSuper * count, 40_000); r.escortUntil = ext(r.escortUntil, now, FX_MS.vipEscort * count, 40_000);
        shield(FX_MS.vipShield * count); emit(); break;
      case 'missile':
        for (let i = 0; i < n; i++) this.later(i * 350, () => {
          if (r.fin || !this.racing) return;
          const list = this.alive(), me = list.indexOf(r), t = me > 0 ? list[me - 1] : list[1];
          if (!t){ r.nitroUntil = ext(r.nitroUntil, this.now(), FX_MS.nitro); emit(); return; }
          emit(t);
          this.later(FX_MS.missileFlight, () => this.hit(t, r, 'missile', at => { t.stunUntil = ext(t.stunUntil, at, FX_MS.stun * extra, 8000); }));
        });
        break;
      case 'thunder': {
        const top = this.alive().filter(x => x !== r).slice(0, 3);
        emit(top[0]);
        for (const t of top) this.later(250, () => this.hit(t, r, 'thunder', at => { t.slowUntil = ext(t.slowUntil, at, FX_MS.thunderSlow * count, 12_000); }));
        break;
      }
      case 'bomb':
        for (let i = 0; i < n; i++) this.later(i * 600, () => {
          if (r.fin || !this.racing) return;
          const t = this.alive().find(x => x !== r);
          if (!t) return;
          emit(t);
          this.later(FX_MS.bombFall, () => {
            this.hit(t, r, 'bomb', at => { t.stunUntil = ext(t.stunUntil, at, FX_MS.bombStun, 10_000); });
            for (const o of this.alive()) if (o !== t && o !== r && Math.abs(o.d - t.d) < BOMB_RADIUS) this.hit(o, r, 'bomb', at => { o.slowUntil = ext(o.slowUntil, at, FX_MS.bombSlow, 10_000); });
          });
        });
        break;
      case 'meteor':
        r.superUntil = ext(r.superUntil, now, FX_MS.meteorSuper * count, 40_000);
        shield(FX_MS.meteorShield * count);
        emit();
        for (const o of this.alive()) if (o !== r) this.later(600 + this.rand() * 1800, () => this.hit(o, r, 'meteor', at => { o.slowUntil = ext(o.slowUntil, at, FX_MS.meteorSlow * Math.min(count, 3), 18_000); }));
        break;
    }
  }

  /* --------------------------------------------------------------- vòng lặp */
  private enterLobby(now: number, ms: number){
    this.phase = 'lobby'; this.phaseEnd = now + ms; this.podium = [];
    this.finished = []; this.pending = []; this.leaderId = '';
    // bản đồ: tự đổi mỗi cuộc đua (cuộc đầu là đảo nhiệt đới), hoặc giữ bản đồ đã chọn
    if (this.mapMode !== 'auto') this.map = this.mapMode;
    else if (this.lobbies++ > 0) this.map = MAPS[(MAPS.findIndex(m => m.key === this.map) + 1) % MAPS.length].key;
    for (const r of [...this.racers.values()]) if (!r.bot && now - r.lastActive > RACE.idleKickMs) this.racers.delete(r.id);
    for (const r of this.racers.values()){
      if (r.plane !== r.basePlane){ r.plane = r.basePlane; this.emit({ k: 'plane', id: r.id, name: r.name, plane: r.plane, color: r.color }); }
      Object.assign(r, { v: 0, lap: 0, fin: 0, late: false, gifted: 0, likes: 0, short: null,
        boostUntil: 0, engineUntil: 0, nitroUntil: 0, rocketUntil: 0, superUntil: 0, jetUntil: 0,
        shieldUntil: 0, stunUntil: 0, slowUntil: 0, escortUntil: 0, crashUntil: 0 });
    }
    this.fx = this.fx.filter(f => f.k !== 'plane' || !f.id.startsWith('bot:'));
    this.fitBots();
    this.emit({ k: 'phase', phase: 'lobby' });
  }

  setMap(m: MapKey | 'auto'){
    this.mapMode = m;
    if (this.phase === 'lobby' && m !== 'auto') this.map = m;
  }

  // Bot cho đường đua đỡ vắng: đủ `bots` chiếc tính cả người thật. Chỉ thêm, bớt lúc đang chờ xuất phát.
  fitBots(){
    const want = Math.max(0, this.bots - this.realCount());
    const bots = [...this.racers.values()].filter(r => r.bot);
    while (bots.length > want) this.racers.delete(bots.pop()!.id);
    for (let i = 0; bots.length < want && i < 50; i++){
      const id = `bot:${i}`;
      if (this.racers.has(id)) continue;
      const r = this.add({ id, name: BOT_NAMES[i % BOT_NAMES.length] }, PICKABLE[(i * 4 + 1) % PICKABLE.length].key, true);
      if (!r) break;
      r.color = COLORS[(i * 3 + 1) % COLORS.length].hex;
      bots.push(r);
    }
    if (this.phase === 'lobby' || this.phase === 'countdown') this.grid();
  }

  newRace(){ this.enterLobby(this.now(), RACE.lobbyMs); }
  startNow(){ if (this.phase === 'lobby') this.phaseEnd = this.now(); }
  removeSim(){ for (const r of [...this.racers.values()]) if (r.sim) this.racers.delete(r.id); this.fitBots(); }

  tick(){
    const now = this.now(), dt = Math.min(0.25, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    for (let i = 0; i < this.pending.length;){
      if (this.pending[i].at <= now){ const p = this.pending.splice(i, 1)[0]; try { p.run(); } catch (e) { console.error(e); } }
      else i++;
    }
    switch (this.phase){
      case 'lobby':
        if (!this.realCount()){ this.phaseEnd = now + RACE.lobbyMs; break; }   // chưa có người xem nào vào thì cứ chờ, bot không tự đua
        if (now >= this.phaseEnd){ this.phase = 'countdown'; this.phaseEnd = now + RACE.countdownMs; this.grid(); this.emit({ k: 'phase', phase: 'countdown' }); }
        break;
      case 'countdown':
        if (now >= this.phaseEnd) this.start(now);
        break;
      case 'race': case 'finish':
        this.fly(now, dt);
        if (this.finished.length) this.end(now);        // top 1 về đích là kết thúc ngay, vào vinh danh luôn
        else if (now - this.startAt > (this.total / RACE.baseSpeed) * 2.5 * 1000) this.end(now);   // phòng kẹt
        break;
      case 'result':
        for (const r of this.racers.values()){
          if (r.fin || r.d >= this.total) this.land(r, dt);
          else { r.v += (RACE.baseSpeed * 0.6 - r.v) * Math.min(1, dt); r.d += r.v * dt; }
        }
        if (now >= this.phaseEnd) this.enterLobby(now, RACE.nextLobbyMs);
        break;
    }
  }

  // Về đích xong: giảm tốc, hạ cánh xuống đường băng, lăn bánh rồi dừng hẳn
  private land(r: Racer, dt: number){
    // phanh đều 9 m/s²: tốc độ tối đa để còn dừng kịp trong quãng đường băng còn lại
    const rem = Math.max(0, this.total + RACE.landM - r.d);
    const target = Math.min(RACE.baseSpeed * 0.75, Math.sqrt(2 * 9 * rem));
    r.v = target < r.v ? target + (r.v - target) * Math.max(0, 1 - dt * 6) : r.v + (target - r.v) * Math.min(1, dt * 2);
    r.d = Math.min(this.total + RACE.landM, r.d + r.v * dt);
  }

  private start(now: number){
    this.phase = 'race'; this.startAt = now; this.raceNo++;
    this.emit({ k: 'phase', phase: 'race' });
    let i = 0;
    for (const r of this.racers.values()){
      r.v = RACE.baseSpeed * 0.3; r.noiseAt = 0;
      r.botNext = now + 4000 + this.rand() * 8000;
      for (const b of r.bank.splice(0)) this.later(1500 + (i++) * 400, () => this.use(r, b.skill, b.n));
    }
  }

  // Cổng tăng tốc, chướng ngại vật, đường tắt mạo hiểm của bản đồ
  private zones(r: Racer, prev: number, now: number){
    const m = mapOf(this.map);
    if (r.d < RACE.takeoffM) return;
    for (const p of m.pads) if (crossed(prev, r.d, p.at)){
      r.engineUntil = ext(r.engineUntil, now, FX_MS.padBoost);
      if (!r.bot) this.emit({ k: 'event', ev: 'pad', id: r.id, name: r.name });
    }
    for (const at of m.obstacles) if (crossed(prev, r.d, at) && !this.guarded(r, now) && this.rand() < 0.12){
      r.stunUntil = ext(r.stunUntil, now, FX_MS.crash, 8000); r.crashUntil = now + FX_MS.crash;
      this.emit({ k: 'event', ev: 'obstacle', id: r.id, name: r.name });
    }
    const s = m.shortcut;
    if (!r.short && crossed(prev, r.d, s.at) && this.rand() < 0.35){
      const crash = !this.guarded(r, now) && this.rand() < 0.3;
      r.short = { mid: r.d + s.len * L / 2, end: r.d + s.len * L, crash };
      this.emit({ k: 'event', ev: 'shortcut', id: r.id, name: r.name });
    }
    if (r.short){
      if (r.short.crash && r.d >= r.short.mid){
        r.stunUntil = ext(r.stunUntil, now, FX_MS.shortCrash, 8000); r.crashUntil = now + FX_MS.shortCrash; r.short.crash = false; r.short.end = r.d;
        this.emit({ k: 'event', ev: 'shortcrash', id: r.id, name: r.name });
      }
      if (r.d >= r.short.end){
        if (r.crashUntil < now) { r.d = Math.min(r.d + s.gain, this.total - 5); this.emit({ k: 'event', ev: 'shortok', id: r.id, name: r.name }); }
        r.short = null;
      }
    }
  }

  private fly(now: number, dt: number){
    const lead = this.alive()[0], leadD = lead?.d ?? 0;
    for (const r of this.racers.values()){
      if (r.fin){ this.land(r, dt); continue; }
      if (now >= r.noiseAt){ r.noise = 0.95 + this.rand() * 0.1; r.noiseAt = now + 2000 + this.rand() * 2000; }
      if (r.bot && now >= r.botNext){
        this.use(r, this.rand() < 0.7 ? 'boost' : 'engine');
        this.fx = this.fx.filter(f => !(f.k === 'skill' && f.id === r.id));   // bot tăng tốc thì không lên bảng tin
        r.botNext = now + 7000 + this.rand() * 12_000;
      }
      let add = 0;
      if (r.rocketUntil > now) add = SPEED.rocket;
      else if (r.superUntil > now) add = SPEED.super;
      else if (r.nitroUntil > now) add = SPEED.nitro;
      else if (r.engineUntil > now) add = SPEED.engine;
      else if (r.boostUntil > now) add = SPEED.boost;
      let mult = 1 + add;
      if (r.stunUntil > now) mult *= SPEED.stun; else if (r.slowUntil > now && r.superUntil <= now) mult *= SPEED.slow;
      mult *= 1 + Math.min(SPEED.catchUp, Math.max(0, leadD - r.d) / SPEED.catchUpGap * SPEED.catchUp);   // bị bỏ xa thì được kéo nhẹ
      const target = RACE.baseSpeed * mult * r.noise;
      r.v += (target - r.v) * Math.min(1, dt * (r.stunUntil > now ? 4 : 1.6));
      const prev = r.d;
      r.d += r.v * dt;
      this.zones(r, prev, now);
      const lap = Math.floor(Math.max(0, r.d) / L);
      if (lap > r.lap && r.d < this.total){ r.lap = lap; if (!r.bot) this.emit({ k: 'lap', id: r.id, name: r.name, lap }); }
      if (r.d >= this.total){
        r.fin = Math.max(1, now - this.startAt); r.lap = this.laps; r.short = null;
        this.finished.push(r.id);
        const place = this.finished.length, record = !r.bot && !r.sim && !r.late && this.isRecord(r.fin);
        r.place = place;
        this.emit({ k: 'finish', id: r.id, name: r.name, place, ms: r.fin, record });
        if (this.phase === 'race'){ this.phase = 'finish'; this.phaseEnd = now + RACE.graceMs; this.emit({ k: 'phase', phase: 'finish' }); }
      }
    }
    const order = this.order();
    order.forEach((r, i) => { r.place = i + 1; });
    const top = order.find(r => !r.fin);
    if (top && !this.finished.length && top.id !== this.leaderId){
      const first = !this.leaderId;
      this.leaderId = top.id;
      if (!first && now - this.leadFxAt > 4000){ this.leadFxAt = now; this.emit({ k: 'lead', id: top.id, name: top.name }); }
    }
  }

  private end(now: number){
    const order = this.order();
    const results: RaceResult[] = order.map((r, i) => ({ id: r.id, name: r.name, plane: r.plane, color: r.color, ms: r.fin, place: i + 1, bot: r.bot, late: r.late, sim: r.sim }));
    // hạng 2, 3 lấy theo vị trí lúc top 1 về đích (chưa có thời gian thì ms = 0)
    this.podium = order.slice(0, 3).map(r => ({ id: r.id, name: r.name, plane: r.plane, color: r.color, ms: r.fin, bot: r.bot }));
    this.phase = 'result'; this.phaseEnd = now + RACE.resultMs;
    this.emit({ k: 'phase', phase: 'result' });
    try { this.onRaceEnd(results); } catch (e) { console.error(e); }
  }

  /* ----------------------------------------------------------- gửi xuống */
  state(): RaceState {
    const now = this.now();
    return { phase: this.phase, leftMs: Math.max(0, this.phaseEnd - now), raceNo: this.raceNo, raceMs: this.racing ? now - this.startAt : 0, laps: this.laps, lapLen: L, podium: this.podium, map: this.map };
  }
  pub(): RacerPub[] {
    const now = this.now();
    const list = this.racing || this.phase === 'result' ? this.order() : [...this.racers.values()].sort((a, b) => a.place - b.place);
    return list.map(r => {
      let f = 0;
      if (r.boostUntil > now) f |= F.BOOST;
      if (r.engineUntil > now) f |= F.ENGINE;
      if (r.nitroUntil > now) f |= F.NITRO;
      if (r.rocketUntil > now) f |= F.ROCKET;
      if (r.superUntil > now) f |= F.SUPER;
      if (r.jetUntil > now) f |= F.JET;
      if (r.shieldUntil > now) f |= F.SHIELD;
      if (r.stunUntil > now) f |= F.STUN;
      if (r.slowUntil > now) f |= F.SLOW;
      if (r.escortUntil > now) f |= F.ESCORT;
      if (r.crashUntil > now) f |= F.CRASH;
      if (r.short) f |= F.SHORT;
      return { id: r.id, name: r.name, plane: r.plane, color: r.color, d: Math.round(r.d * 10) / 10, v: Math.round(r.v * 10) / 10, place: r.place, lap: r.lap, lane: r.lane,
        f, bot: r.bot, late: r.late, fin: r.fin, gifted: r.gifted, avatar: r.avatar };
    });
  }
}

// Cộng dồn thời gian hiệu ứng, không quá cap tính từ bây giờ
export const ext = (until: number, now: number, ms: number, cap: number = FX_MS.maxStack) => Math.min(Math.max(until, now) + ms, now + cap);
