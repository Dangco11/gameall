import fs from 'node:fs';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

// Giọng bình luận viên tiếng Việt: giọng Edge, lỗi thì dùng giọng Google. Cần Internet.
// Câu quà lớn đọc trước, hàng đợi tối đa 12 câu để bị spam vẫn không trễ mãi.
const MAX_QUEUE = 5, KEEP_FILES = 40;
const esc = (s: string) => s.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!);
export const speakable = (s: string) => s.normalize('NFC').replace(/[^\p{Script=Latin}\p{N}\s.,!?:;()\-]/gu, ' ').replace(/\s+([.,!?:;])/g, '$1').replace(/\s+/g, ' ').trim();
export const spoken = (s: string) => String(s).replace(/[_@.]+/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim() || 'bạn';

function chunks(text: string, max = 190){
  const out: string[] = [];
  let rest = text.trim();
  while (rest.length > max){
    const cut = Math.max(rest.lastIndexOf('. ', max), rest.lastIndexOf(', ', max), rest.lastIndexOf('! ', max));
    const at = cut > 40 ? cut + 1 : rest.lastIndexOf(' ', max) > 40 ? rest.lastIndexOf(' ', max) : max;
    out.push(rest.slice(0, at).trim()); rest = rest.slice(at).trim();
  }
  if (rest) out.push(rest);
  return out;
}
async function googleTts(text: string){
  const parts: Buffer[] = [];
  for (const q of chunks(text)){
    const r = await fetch(`https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(q)}`, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(8000) });
    if (!r.ok || !String(r.headers.get('content-type')).includes('audio')) throw new Error(`giọng Google lỗi ${r.status}`);
    parts.push(Buffer.from(await r.arrayBuffer()));
  }
  return Buffer.concat(parts);
}

export class Voice {
  enabled = true;
  // Mỗi câu: thời điểm vào hàng, ưu tiên (quà), lời hứa file tiếng đang tạo song song
  private queue: { text: string; prio: boolean; at: number; buf?: Promise<Buffer | null> }[] = [];
  private busy = false;
  private seq = 0;
  private dir: string;
  private emit: (url: string, text: string) => void;
  private log: (s: string) => void;
  get backlog(){ return this.queue.length; }

  constructor(dir: string, emit: (url: string, text: string) => void, log: (s: string) => void){
    this.dir = dir; this.emit = emit; this.log = log;
    fs.mkdirSync(dir, { recursive: true });
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.mp3')) fs.rmSync(path.join(dir, f), { force: true });
  }

  // Câu ưu tiên (quà, về nhất) chen lên trước các câu thường; câu thường chỉ nhận khi hàng gần trống.
  // Hàng tối đa MAX_QUEUE câu: tràn thì bỏ câu thường cũ nhất, để tiếng luôn sát với lúc tặng quà.
  say(text: string, prio = false){
    if (!this.enabled || !text) return;
    if (!prio && this.queue.length >= 2) return;
    const job = { text: text.slice(0, 220), prio, at: Date.now() };
    if (prio){ const i = this.queue.findIndex(q => !q.prio); if (i < 0) this.queue.push(job); else this.queue.splice(i, 0, job); }
    else this.queue.push(job);
    while (this.queue.length > MAX_QUEUE){
      let i = this.queue.length - 1;
      while (i >= 0 && this.queue[i].prio) i--;          // bỏ câu thường mới nhất trước, hết câu thường thì bỏ câu cuối
      this.queue.splice(i >= 0 ? i : this.queue.length - 1, 1);
    }
    this.prefetch();
    void this.pump();
  }

  // tạo trước tiếng cho 3 câu đầu hàng cùng lúc (không phải đợi câu trước đọc xong mới bắt đầu tạo)
  private prefetch(){ for (const j of this.queue.slice(0, 3)) j.buf ??= this.make(j.text); }

  // Giọng Google trước (chừng 0,3 giây), lỗi thì giọng Edge (chờ tối đa 4 giây)
  private async make(text: string): Promise<Buffer | null> {
    const say = speakable(text);
    if (!say) return null;
    try { return await googleTts(say); } catch { /* thử giọng Edge */ }
    try { return await this.synth(say, 4000); } catch (e) { this.log(`Giọng đọc lỗi, bỏ câu: "${text.slice(0, 50)}" (${(e as Error)?.message ?? e})`); return null; }
  }

  private async synth(text: string, timeoutMs: number){
    const tts = new MsEdgeTTS();
    await tts.setMetadata('vi-VN-NamMinhNeural', OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(esc(text), { pitch: '+2Hz', rate: '+18%' });
    const parts: Buffer[] = [];
    let timer: NodeJS.Timeout | undefined;
    try {
      await new Promise<void>((res, rej) => {
        timer = setTimeout(() => rej(new Error('quá hạn')), timeoutMs);
        audioStream.on('data', (c: Buffer) => parts.push(c)); audioStream.on('close', () => res()); audioStream.on('error', rej);
      });
    } finally { clearTimeout(timer); try { tts.close(); } catch { /* đã đóng */ } }
    return Buffer.concat(parts);
  }

  // Phát theo đúng thứ tự; câu đã quá cũ (quà 8 giây, câu thường 4 giây) thì bỏ, không đọc chuyện đã qua
  private async pump(){
    if (this.busy || !this.queue.length) return;
    this.busy = true;
    const job = this.queue[0];
    this.prefetch();
    const buf = await job.buf!;
    this.queue.shift();
    const stale = Date.now() - job.at > (job.prio ? 8000 : 4000);
    if (buf && buf.length > 500 && !stale){
      try {
        const file = `v${Date.now()}_${++this.seq}.mp3`;
        await fs.promises.writeFile(path.join(this.dir, file), buf);
        this.emit(`/tts/${file}`, job.text);
        const old = (await fs.promises.readdir(this.dir)).filter(f => f.endsWith('.mp3')).sort();
        while (old.length > KEEP_FILES) await fs.promises.rm(path.join(this.dir, old.shift()!), { force: true });
      } catch (e) { this.log('Không ghi được file giọng: ' + (e as Error).message); }
    }
    this.busy = false;
    void this.pump();
  }
}

