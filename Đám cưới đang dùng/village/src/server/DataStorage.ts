import fs from 'node:fs';
import path from 'node:path';
import type { MarketRow, Player, ProjectState, Settings, TopRow, WorldState } from '../shared/types.ts';

const MAX_LOG_BYTES = 5 * 1024 * 1024;
const oneLine = (s: unknown) => String(s ?? '').replace(/[\t\r\n]+/g, ' ');

export interface VillageFile { world: WorldState; lastTick: number; nextFestivalAt: number; festivalsHeld: number; reserve: number; settings?: Partial<Settings> }
export interface WeddingTopFile { month: string; rows: TopRow[] }
export interface SaveSet { players: Iterable<Player>; village: VillageFile; buildings: ProjectState[]; market: MarketRow[]; weddingTop: WeddingTopFile }
export interface LoadedData { players: Player[]; village: VillageFile | null; buildings: ProjectState[]; market: MarketRow[]; giftIds: string[]; weddingTop?: WeddingTopFile }

// Dữ liệu dạng text, mỗi bản ghi một dòng. File trạng thái ghi qua file tạm rồi đổi tên, bản cũ giữ ở .bak,
// nên tắt máy giữa chừng không làm hỏng dữ liệu.
export class DataStorage {
  readonly dir: string;
  private writing = false;

  constructor(dir: string){ this.dir = dir; fs.mkdirSync(dir, { recursive: true }); }
  private p(name: string){ return path.join(this.dir, name); }

  private lines(name: string): string[] {
    for (const f of [name, name + '.bak']) {
      try { return fs.readFileSync(this.p(f), 'utf8').split(/\r?\n/).filter(Boolean); }
      catch (e) { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') console.error('Không đọc được', f, e); }
    }
    return [];
  }

  load(): LoadedData {
    const players: Player[] = [];
    for (const line of this.lines('players.txt')) {
      const tab = line.indexOf('\t');
      if (tab <= 0) continue;
      try { const p = JSON.parse(line.slice(tab + 1)) as Player; p.id = line.slice(0, tab); players.push(p); }
      catch { console.error('Bỏ qua dòng hỏng trong players.txt:', line.slice(0, 60)); }
    }
    const kv = new Map(this.lines('village.txt').map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)] as const; }));
    const num = (k: string, d: number) => { const v = Number(kv.get(k)); return Number.isFinite(v) && kv.has(k) ? v : d; };
    const village: VillageFile | null = kv.has('day') ? {
      world: { day: num('day', 1), clock: num('clock', 0.3), season: num('season', 0), weather: (kv.get('weather') as WorldState['weather']) || 'clear', wind: num('wind', 0.3) },
      lastTick: num('lastTick', Date.now()), nextFestivalAt: num('nextFestivalAt', 0), festivalsHeld: num('festivalsHeld', 0), reserve: num('reserve', 0),
      settings: { ...(kv.has('idleBots') ? { idleBots: kv.get('idleBots') === '1' } : {}), ...(kv.has('voice') ? { voice: kv.get('voice') === '1' } : {}), ...(kv.has('readChat') ? { readChat: kv.get('readChat') === '1' } : {}), ...(kv.has('scene') ? { scene: kv.get('scene') as Settings['scene'] } : {}) },
    } : null;
    const buildings = this.lines('buildings.txt').flatMap(l => {
      const [key, stage, points, total] = l.split('\t');
      return key ? [{ key, stage: +stage || 0, points: +points || 0, total: +total || 0 } as ProjectState] : [];
    });
    const market = this.lines('market.txt').flatMap(l => {
      const [item, price, base, sold] = l.split('\t');
      return item ? [{ item, price: +price || 0, base: +base || 0, sold: +sold || 0 } as MarketRow] : [];
    });
    const giftIds = this.lines('gift_logs.txt').slice(-5000).map(l => l.split('\t')[1]).filter(Boolean);
    // bảng quà cưới tháng: dòng đầu "month=2026-11", mỗi dòng sau: id, tên, tổng xu, có phải người thử
    const top = this.lines('wedding_top.txt'), month = top[0]?.startsWith('month=') ? top[0].slice(6) : '';
    const weddingTop: WeddingTopFile = { month, rows: top.slice(1).flatMap(l => { const [id, name, xu, sim] = l.split('\t'); return id ? [{ id, name: name ?? '', xu: +xu || 0, sim: sim === '1' }] : []; }) };
    return { players, village, buildings, market, giftIds, weddingTop };
  }

  private files({ players, village: v, buildings, market, weddingTop }: SaveSet): [string, string][] {
    const rows: string[] = [];
    for (const p of players) rows.push(`${oneLine(p.id)}\t${JSON.stringify(p)}`);
    const w = v.world;
    return [
      ['players.txt', rows.join('\n') + '\n'],
      ['village.txt', [`day=${w.day}`, `clock=${w.clock.toFixed(4)}`, `season=${w.season}`, `weather=${w.weather}`, `wind=${w.wind.toFixed(2)}`,
        `lastTick=${v.lastTick}`, `nextFestivalAt=${v.nextFestivalAt}`, `festivalsHeld=${v.festivalsHeld}`, `reserve=${Math.round(v.reserve)}`,
        ...(v.settings ? [`idleBots=${v.settings.idleBots ? 1 : 0}`, `voice=${v.settings.voice ? 1 : 0}`, `readChat=${v.settings.readChat === false ? 0 : 1}`, `scene=${v.settings.scene}`] : [])].join('\n') + '\n'],
      ['buildings.txt', buildings.map(b => `${b.key}\t${b.stage}\t${Math.round(b.points)}\t${Math.round(b.total)}`).join('\n') + '\n'],
      ['market.txt', market.map(m => `${m.item}\t${m.price.toFixed(2)}\t${m.base}\t${m.sold}`).join('\n') + '\n'],
      ['wedding_top.txt', [`month=${weddingTop.month}`, ...weddingTop.rows.map(r => `${oneLine(r.id)}\t${oneLine(r.name)}\t${r.xu}\t${r.sim ? 1 : 0}`)].join('\n') + '\n'],
    ];
  }

  // Ghi nền, không chặn luồng livestream. Lần trước chưa ghi xong thì bỏ lượt, lượt sau mang dữ liệu mới hơn.
  async save(set: SaveSet){
    if (this.writing) return;
    this.writing = true;
    try {
      for (const [name, text] of this.files(set)) {
        const file = this.p(name), tmp = file + '.tmp';
        await fs.promises.writeFile(tmp, text, 'utf8');
        await fs.promises.copyFile(file, file + '.bak').catch(() => {});
        await fs.promises.rename(tmp, file);
      }
    } catch (e) { console.error('Lưu dữ liệu lỗi', e); }
    finally { this.writing = false; }
  }

  saveSync(set: SaveSet){
    for (const [name, text] of this.files(set)) {
      const file = this.p(name);
      fs.writeFileSync(file + '.tmp', text, 'utf8');
      fs.renameSync(file + '.tmp', file);
    }
  }

  // Nhật ký gom lại rồi ghi nền mỗi 2 giây, nên hàng trăm sự kiện một giây cũng không làm chậm game.
  private pending = new Map<string, string[]>();
  private flushTimer: NodeJS.Timeout | null = null;

  private append(name: string, cols: unknown[]){
    const list = this.pending.get(name) ?? [];
    list.push(cols.map(oneLine).join('\t'));
    this.pending.set(name, list);
    this.flushTimer ??= setTimeout(() => { this.flushTimer = null; void this.flushLogs(); }, 2000);
  }

  async flushLogs(){
    const batch = [...this.pending]; this.pending.clear();
    for (const [name, lines] of batch) {
      const file = this.p(name);
      try {
        const st = await fs.promises.stat(file).catch(() => null);
        if (st && st.size > MAX_LOG_BYTES) await fs.promises.rename(file, file + '.1');
        await fs.promises.appendFile(file, lines.join('\n') + '\n', 'utf8');
      } catch (e) { console.error('Ghi nhật ký lỗi', name, e); }
    }
  }

  flushLogsSync(){
    if (this.flushTimer){ clearTimeout(this.flushTimer); this.flushTimer = null; }
    for (const [name, lines] of this.pending) {
      try { fs.appendFileSync(this.p(name), lines.join('\n') + '\n', 'utf8'); } catch (e) { console.error('Ghi nhật ký lỗi', name, e); }
    }
    this.pending.clear();
  }

  logEvent(type: string, playerId: string, text: string){ this.append('events.txt', [new Date().toISOString(), type, playerId, text]); }
  logGift(msgId: string, p: { id: string; name: string; sim: boolean }, gift: string, count: number, diamonds: number, tier: string){
    this.append('gift_logs.txt', [new Date().toISOString(), msgId, p.id, p.name, gift, count, diamonds, tier, p.sim ? 'sim' : 'tiktok']);
  }
}
