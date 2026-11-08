import fs from 'node:fs';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import type { Speaker } from '../shared/types.ts';

// Giọng đọc tiếng Việt qua dịch vụ Read Aloud của Edge (cần Internet), cho MC và anh phục vụ của quán.
// Câu quà được đọc trước, hàng đợi tối đa 15 câu để bị spam vẫn không trễ mãi.
const MAX_QUEUE = 15, KEEP_FILES = 40;
const esc = (s: string) => s.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!);
// Tên TikTok hay có ký tự lạ: bỏ đi để giọng đọc gọi tên tròn trịa.
// Dịch vụ đọc từ chối cả câu nếu có emoji, ký tự ẩn đi kèm emoji (U+FE0F) hay chữ Hán, chữ Thái...: chỉ giữ chữ Latin
// (đủ dấu tiếng Việt), số và dấu câu thường. Chữ trên màn hình vẫn giữ nguyên, chỉ câu gửi đi đọc là được lọc.
export const speakable = (s: string) => s.normalize('NFC').replace(/[^\p{Script=Latin}\p{N}\s.,!?:;()\-]/gu, ' ').replace(/\s+([.,!?:;])/g, '$1').replace(/\s+/g, ' ').trim();
// Giọng dự phòng: Google Dịch đọc tiếng Việt, mỗi lần tối đa khoảng 200 ký tự nên câu dài được cắt theo dấu câu rồi ghép mp3.
export function chunks(text: string, max = 190){
  const out: string[] = [];
  let rest = text.trim();
  while (rest.length > max){
    const cut = Math.max(rest.lastIndexOf('. ', max), rest.lastIndexOf(', ', max), rest.lastIndexOf('! ', max), rest.lastIndexOf('? ', max));
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

// Lọc bình luận trước khi đọc lên live: bỏ lời tục, link, số điện thoại, câu toàn ký hiệu.
const BAD = ['lồn', 'buồi', 'cặc', 'địt', 'đụ', 'đéo', 'đĩ', 'đm', 'đmm', 'dm', 'dmm', 'dcm', 'đcm', 'vcl', 'vkl', 'vl', 'clm', 'cl', 'cc', 'loz', 'đjt', 'djt', 'fuck', 'shit', 'bitch', 'óc chó', 'chó đẻ', 'mẹ mày', 'má mày', 'con đĩ', 'thằng ngu', 'đồ ngu'];
export function chatLine(name: string, text: string){
  const low = text.normalize('NFC').toLowerCase();
  if (/https?:|www\.|\.(com|vn|net|me)\b|@\w|\d{8,}|(\d[\s.-]?){9,}/.test(low)) return '';
  const words = low.split(/[^\p{L}\p{N}]+/u).filter(Boolean), joined = ' ' + words.join(' ') + ' ';
  if (BAD.some(b => b.includes(' ') ? joined.includes(' ' + b + ' ') : words.includes(b))) return '';
  const say = speakable(text).slice(0, 120);
  if (say.replace(/[^\p{L}]/gu, '').length < 2) return '';
  return `${spoken(name)} nói: ${say}`;
}
export const spoken = (s: string) => String(s).replace(/[_@.]+/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim() || 'bạn';

// Giọng Edge cho từng người nói: MC giọng nữ, anh phục vụ giọng nam hô to, nhanh
const VOICES: Record<Speaker, { name: string; pitch: string; rate: string; volume?: string }> = {
  mc: { name: 'vi-VN-HoaiMyNeural', pitch: '+4Hz', rate: '+12%' },
  boy: { name: 'vi-VN-NamMinhNeural', pitch: '+6Hz', rate: '+22%', volume: '+40%' },
};
type Line = { text: string; who: Speaker; tag?: string; fast?: boolean };   // fast: đọc bằng giọng Google trước (bình luận)
export type VoiceEmit = (url: string, text: string, who: Speaker, tag?: string) => void;

export class Voice {
  enabled = true;
  readonly dir: string;
  private queue: Line[] = [];
  get backlog(){ return this.queue.length; }                // số câu thường đang chờ đọc
  private chats: (Line & { at: number })[] = [];             // bình luận, tiếng phục vụ: ưu tiên thấp, quá 20 giây thì bỏ
  private busy = false;
  private seq = 0;
  private emit: VoiceEmit;
  private log: (s: string) => void;

  constructor(dir: string, emit: VoiceEmit, log: (s: string) => void){
    this.dir = dir; this.emit = emit; this.log = log;
    fs.mkdirSync(dir, { recursive: true });
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.mp3')) fs.rmSync(path.join(dir, f), { force: true });
  }

  // tag: đánh dấu câu để máy LIVE biết lúc đọc xong (câu mời nâng ly đọc xong mới hô "Một, hai, ba, dô")
  say(text: string, first = false, tag?: string){
    if (!this.enabled) return;
    const line: Line = { text: text.slice(0, 300), who: 'mc', tag };
    if (first) this.queue.unshift(line);
    else if (this.queue.length < MAX_QUEUE) this.queue.push(line);
    else return;
    void this.pump();
  }

  private async synth(text: string, who: Speaker = 'mc', timeoutMs = 12_000){
    const v = VOICES[who], tts = new MsEdgeTTS();
    await tts.setMetadata(v.name, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(esc(text), { pitch: v.pitch, rate: v.rate, ...(v.volume ? { volume: v.volume } : {}) });
    const chunks: Buffer[] = [];
    let timer: NodeJS.Timeout | undefined;
    try {
      // dịch vụ đôi khi treo không trả lời: quá hạn thì bỏ, để hàng đợi không kẹt
      await new Promise<void>((res, rej) => {
        timer = setTimeout(() => rej(new Error(`quá ${timeoutMs / 1000} giây không có tiếng`)), timeoutMs);
        audioStream.on('data', (c: Buffer) => chunks.push(c)); audioStream.on('close', () => res()); audioStream.on('error', rej);
      });
    } finally {
      clearTimeout(timer);
      try { tts.close(); } catch { /* đã đóng */ }
    }
    return Buffer.concat(chunks);
  }

  // Bình luận và tiếng phục vụ hô: chỉ giữ tối đa 3 câu chờ. Bình luận đọc bằng giọng Google cho nhanh (chừng 0,3 giây
  // thay vì 3–4 giây của giọng Microsoft); tiếng phục vụ cần giọng nam nên vẫn dùng Microsoft. Gắn nhãn 'chat' để máy LIVE
  // bỏ qua câu đã chờ quá lâu.
  chat(text: string, who: Speaker = 'mc'){
    if (!this.enabled || !text) return;
    if (this.chats.length >= 3) this.chats.shift();
    this.chats.push({ text: text.slice(0, 160), who, tag: 'chat', fast: who === 'mc', at: Date.now() });
    void this.pump();
  }

  // Lời MC, cảm ơn quà đi trước, nhưng cứ hai câu thì chen một bình luận đang chờ để bình luận không bị dồn mãi.
  // Bình luận chờ quá 15 giây thì bỏ, đọc lại chuyện cũ không còn vui.
  private sinceChat = 0;
  private next(): Line | null {
    while (this.chats.length && Date.now() - this.chats[0].at >= 15_000) this.chats.shift();
    if (this.chats.length && (!this.queue.length || this.sinceChat >= 2)){ this.sinceChat = 0; return this.chats.shift()!; }
    if (this.queue.length){ this.sinceChat++; return this.queue.shift()!; }
    return null;
  }

  private async pump(){
    if (this.busy) return;
    const line = this.next();
    if (line === null) return;
    const { text, who, tag, fast } = line;
    this.busy = true;
    try {
      let buf: Buffer | null = null;
      // dịch vụ thỉnh thoảng rớt giữa câu: thử lại để người tặng luôn được nghe tên mình
      const say = speakable(text);
      if (!say) throw new Error('câu không còn chữ đọc được');
      // Giọng Microsoft chậm (3–4 giây mới có tiếng) và hay bị ngắt giữa chừng: chỉ chờ 5 giây, lỗi thì đọc ngay bằng
      // giọng Google (chừng 0,3 giây). Bình luận đọc bằng Google trước. Cả hai lỗi thì thử lại xen kẽ.
      let last: unknown;
      const plan: ('ms' | 'gg')[] = fast ? ['gg', 'ms', 'gg'] : ['ms', 'gg', 'ms', 'gg'];
      for (let n = 0; !buf && n < plan.length; n++){
        try { buf = plan[n] === 'gg' ? await googleTts(say) : await this.synth(say, who, 5000); }
        catch (e) { last = e; if (n < plan.length - 1) await new Promise(r => setTimeout(r, [100, 200, 400][n] ?? 400)); }
      }
      if (!buf) throw last;
      if (buf && buf.length > 500){
        const file = `v${Date.now()}_${++this.seq}.mp3`;
        await fs.promises.writeFile(path.join(this.dir, file), buf);
        this.emit(`/tts/${file}`, text, who, tag);
        const old = (await fs.promises.readdir(this.dir)).filter(f => f.endsWith('.mp3')).sort();
        while (old.length > KEEP_FILES) await fs.promises.rm(path.join(this.dir, old.shift()!), { force: true });
      }
    } catch (e) { this.log(`Giọng đọc lỗi sau mấy lần thử, bỏ câu: "${text.slice(0, 60)}" (${(e as Error)?.message ?? e})`); }
    this.busy = false;
    setTimeout(() => void this.pump(), 50);
  }
}

