import fs from 'node:fs';
import path from 'node:path';
import type { Player, PrintRecord, Settings, TopRow } from '../shared/types.ts';

// Dữ liệu dạng text, mỗi bản ghi một dòng. File trạng thái ghi qua file tạm rồi đổi tên, bản cũ giữ ở .bak,
// nên tắt máy giữa chừng không làm hỏng dữ liệu. Nhật ký quà ghi nền mỗi 2 giây, tự xoay vòng khi quá 5 MB.
//   players.txt     id<TAB>{tài khoản JSON}
//   top.txt         dòng đầu "month=2026-11", mỗi dòng sau: id, tên, tổng xu, có phải người thử
//   settings.txt    voice=1, readChat=1
//   prints.txt      mỗi dòng một bản in đã xong (JSON), giữ PRINT.keepPrints bản mới nhất cho phòng trưng bày
//   editions.txt    dòng đầu "printed=1234" (tổng số bản đã in), mỗi dòng sau: số mẫu<TAB>số bản đã in của mẫu đó
//   gift_logs.txt   thời gian, msgId, id, tên, quà, số lượng, xu, bậc in, nguồn (tiktok / sim)
//   avatars/        ảnh đại diện TikTok của người đã được in (phòng trưng bày còn ảnh sau khi link TikTok hết hạn)
const MAX_LOG_BYTES = 5 * 1024 * 1024;
const oneLine = (s: unknown) => String(s ?? '').replace(/[\t\r\n]+/g, ' ');

export interface Loaded { players: Player[]; top: { month: string; rows: TopRow[] }; settings: Partial<Settings>; giftIds: string[]; prints: PrintRecord[]; editions: Map<number, number>; printed: number }
export interface SaveSet { players: Iterable<Player>; top: { month: string; rows: TopRow[] }; settings: Settings; prints: PrintRecord[]; editions: Map<number, number>; printed: number }

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
    const prints: PrintRecord[] = [];
    for (const l of this.lines('prints.txt')){ try { const r = JSON.parse(l) as PrintRecord; if (r && r.n && r.tpl) prints.push(r); } catch { /* dòng hỏng */ } }
    const ed = this.lines('editions.txt'), editions = new Map<number, number>();
    let printed = ed[0]?.startsWith('printed=') ? +ed[0].slice(8) || 0 : 0;
    for (const l of ed.slice(1)){ const [no, n] = l.split('\t'); if (+no) editions.set(+no, +n || 0); }
    printed = Math.max(printed, prints.reduce((m, r) => Math.max(m, r.n), 0));
    return { players, top: { month, rows }, settings, giftIds, prints, editions, printed };
  }

  private files(s: SaveSet): [string, string][] {
    const rows: string[] = [];
    for (const p of s.players) rows.push(`${oneLine(p.id)}\t${JSON.stringify(p)}`);
    return [
      ['players.txt', rows.join('\n') + '\n'],
      ['top.txt', [`month=${s.top.month}`, ...s.top.rows.map(r => `${oneLine(r.id)}\t${oneLine(r.name)}\t${r.xu}\t${r.sim ? 1 : 0}`)].join('\n') + '\n'],
      ['settings.txt', `voice=${s.settings.voice ? 1 : 0}\nreadChat=${s.settings.readChat ? 1 : 0}\n`],
      ['prints.txt', s.prints.map(r => JSON.stringify(r)).join('\n') + '\n'],
      ['editions.txt', [`printed=${s.printed}`, ...[...s.editions].map(([no, n]) => `${no}\t${n}`)].join('\n') + '\n'],
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

  /* ---------------------------------------------------------- ảnh đại diện */
  // Tên file: mã băm của id + phần chữ số của id. Dòng đầu file là kiểu ảnh (image/jpeg...), sau đó là dữ liệu ảnh.
  private avatarFile(id: string){
    let h = 2166136261; for (let i = 0; i < id.length; i++){ h ^= id.charCodeAt(i); h = Math.imul(h, 16777619); }
    return path.join(this.dir, 'avatars', (h >>> 0).toString(36) + '_' + id.replace(/\W/g, '').slice(0, 40) + '.img');
  }
  hasAvatar(id: string){ try { return fs.statSync(this.avatarFile(id)).isFile(); } catch { return false; } }
  readAvatar(id: string): { type: string; body: Buffer } | null {
    try {
      const b = fs.readFileSync(this.avatarFile(id)), nl = b.indexOf(10);
      return nl > 0 && nl < 40 ? { type: b.subarray(0, nl).toString(), body: b.subarray(nl + 1) } : null;
    } catch { return null; }
  }
  writeAvatar(id: string, type: string, body: Buffer){
    const f = this.avatarFile(id);
    fs.promises.mkdir(path.dirname(f), { recursive: true })
      .then(() => fs.promises.writeFile(f, Buffer.concat([Buffer.from(type + '\n'), body])))
      .catch(e => console.error('Không lưu được ảnh đại diện', e));
  }
}
