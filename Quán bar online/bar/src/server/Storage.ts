import fs from 'node:fs';
import path from 'node:path';
import type { Player, Settings, TopRow } from '../shared/types.ts';

// Dữ liệu dạng text, mỗi bản ghi một dòng. File trạng thái ghi qua file tạm rồi đổi tên, bản cũ giữ ở .bak,
// nên tắt máy giữa chừng không làm hỏng dữ liệu. Nhật ký quà ghi nền mỗi 2 giây, tự xoay vòng khi quá 5 MB.
//   players.txt     id<TAB>{tài khoản JSON}
//   top.txt         dòng đầu "month=2026-11", mỗi dòng sau: id, tên, tổng xu, có phải người thử
//   settings.txt    voice=1, readChat=1
//   gift_logs.txt   thời gian, msgId, id, tên, quà, số lượng, xu, mức quà, nguồn (tiktok / sim)
const MAX_LOG_BYTES = 5 * 1024 * 1024;
const oneLine = (s: unknown) => String(s ?? '').replace(/[\t\r\n]+/g, ' ');

export interface Loaded { players: Player[]; top: { month: string; rows: TopRow[] }; settings: Partial<Settings>; giftIds: string[] }
export interface SaveSet { players: Iterable<Player>; top: { month: string; rows: TopRow[] }; settings: Settings }

export class Storage {
  readonly dir: string;
  private writing = false;
  private pending: string[] = [];
  private flushTimer: NodeJS.Timeout | null = null;

  constructor(dir: string){ this.dir = dir; fs.mkdirSync(dir, { recursive: true }); }
  private p(name: string){ return path.join(this.dir, name); }
  private lines(name: string): string[] {
    for (const f of [name, name + '.bak']){
      try { return fs.readFileSync(this.p(f), 'utf8').split(/\r?\n/).filter(Boolean); }
      catch (e){ if ((e as NodeJS.ErrnoException).code !== 'ENOENT') console.error('Không đọc được', f, e); }
    }
    return [];
  }

  load(): Loaded {
    const players: Player[] = [];
    for (const line of this.lines('players.txt')){
      const tab = line.indexOf('\t');
      if (tab <= 0) continue;
      try { const p = JSON.parse(line.slice(tab + 1)) as Player; p.id = line.slice(0, tab); players.push(p); }
      catch { console.error('Bỏ qua dòng hỏng trong players.txt:', line.slice(0, 60)); }
    }
    const t = this.lines('top.txt'), month = t[0]?.startsWith('month=') ? t[0].slice(6) : '';
    const rows = t.slice(1).flatMap(l => { const [id, name, xu, sim] = l.split('\t'); return id ? [{ id, name: name ?? '', xu: +xu || 0, sim: sim === '1' }] : []; });
    const kv = new Map(this.lines('settings.txt').map(l => { const i = l.indexOf('='); return [l.slice(0, i), l.slice(i + 1)] as const; }));
    const settings: Partial<Settings> = { ...(kv.has('voice') ? { voice: kv.get('voice') === '1' } : {}), ...(kv.has('readChat') ? { readChat: kv.get('readChat') === '1' } : {}) };
    const giftIds = this.lines('gift_logs.txt').slice(-5000).map(l => l.split('\t')[1]).filter(Boolean);
    return { players, top: { month, rows }, settings, giftIds };
  }

  private files(s: SaveSet): [string, string][] {
    const rows: string[] = [];
    for (const p of s.players) rows.push(`${oneLine(p.id)}\t${JSON.stringify(p)}`);
    return [
      ['players.txt', rows.join('\n') + '\n'],
      ['top.txt', [`month=${s.top.month}`, ...s.top.rows.map(r => `${oneLine(r.id)}\t${oneLine(r.name)}\t${r.xu}\t${r.sim ? 1 : 0}`)].join('\n') + '\n'],
      ['settings.txt', `voice=${s.settings.voice ? 1 : 0}\nreadChat=${s.settings.readChat ? 1 : 0}\n`],
    ];
  }

  // ghi nền, không chặn luồng livestream; lần trước chưa ghi xong thì bỏ lượt, lượt sau mang dữ liệu mới hơn
  async save(s: SaveSet){
    if (this.writing) return;
    this.writing = true;
    try {
      for (const [name, text] of this.files(s)){
        const file = this.p(name), tmp = file + '.tmp';
        await fs.promises.writeFile(tmp, text, 'utf8');
        await fs.promises.copyFile(file, file + '.bak').catch(() => {});
        await fs.promises.rename(tmp, file);
      }
    } catch (e){ console.error('Lưu dữ liệu lỗi', e); }
    finally { this.writing = false; }
  }
  saveSync(s: SaveSet){
    for (const [name, text] of this.files(s)){ const file = this.p(name); fs.writeFileSync(file + '.tmp', text, 'utf8'); fs.renameSync(file + '.tmp', file); }
    this.flushSync();
  }

  logGift(msgId: string, p: { id: string; name: string; sim: boolean }, gift: string, count: number, xu: number, tier: string){
    this.pending.push([new Date().toISOString(), msgId, p.id, p.name, gift, count, xu, tier, p.sim ? 'sim' : 'tiktok'].map(oneLine).join('\t'));
    this.flushTimer ??= setTimeout(() => { this.flushTimer = null; void this.flush(); }, 2000);
  }
  private async flush(){
    const lines = this.pending.splice(0);
    if (!lines.length) return;
    const file = this.p('gift_logs.txt');
    try {
      const st = await fs.promises.stat(file).catch(() => null);
      if (st && st.size > MAX_LOG_BYTES) await fs.promises.rename(file, file + '.1');
      await fs.promises.appendFile(file, lines.join('\n') + '\n', 'utf8');
    } catch (e){ console.error('Ghi nhật ký quà lỗi', e); }
  }
  private flushSync(){
    if (this.flushTimer){ clearTimeout(this.flushTimer); this.flushTimer = null; }
    const lines = this.pending.splice(0);
    if (lines.length) try { fs.appendFileSync(this.p('gift_logs.txt'), lines.join('\n') + '\n', 'utf8'); } catch (e){ console.error('Ghi nhật ký quà lỗi', e); }
  }
}
