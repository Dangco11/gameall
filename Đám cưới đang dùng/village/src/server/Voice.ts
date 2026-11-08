import fs from 'node:fs';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import { showFor } from '../shared/balance.ts';
import type { Speaker } from '../shared/types.ts';

// Giọng đọc tiếng Việt qua dịch vụ Read Aloud của Edge (cần Internet), như bộ quán nhậu.
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

// Tiếng cả sân hô "Một! Hai! Ba! Dô!" khi nâng ly: mỗi chữ thu sẵn bằng giọng nam và giọng nữ, máy LIVE chồng nhiều lớp
// lệch cao độ thành tiếng đám đông. Lưu riêng trong thư mục sfx, lần sau khởi động khỏi tạo lại.
export const CROWD_WORDS = { mot: 'Một!', hai: 'Hai!', ba: 'Ba!', do: 'Dô!' } as const;
export const CROWD_FILE = /^(mot|hai|ba|do)-(nam|nu)\.mp3$/;

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

  // Thu sẵn các tiếng hô của đám đông (chạy nền lúc khởi động, file đã có thì bỏ qua)
  async crowd(dir: string){
    fs.mkdirSync(dir, { recursive: true });
    for (const [key, word] of Object.entries(CROWD_WORDS)) for (const [g, who] of [['nam', 'boy'], ['nu', 'mc']] as const){
      const file = path.join(dir, `${key}-${g}.mp3`);
      if (fs.existsSync(file)) continue;
      for (let n = 1; n <= 4; n++){
        try { const buf = await this.synth(word, who); if (buf.length > 500){ await fs.promises.writeFile(file, buf); break; } }
        catch { await new Promise(r => setTimeout(r, 400 * n)); }
      }
    }
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

// Lời cảm ơn theo mức quà, gọi đúng tên người tặng.
const LINES: Record<string, ((n: string, g: string) => string)[]> = {
  mua:  [(n, g) => `Cảm ơn ${n} tặng ${g}! Mưa rào mát ruộng cả xóm rồi nè.`, (n, g) => `${n} ơi, cảm ơn ${g} nha! Lúa nhà mình với bà con được tưới mát rồi.`],
  phan: [(n, g) => `Ôi ${n} tặng ${g}! Phân bón về, lúa lên xanh mướt luôn. Cảm ơn nha!`, (n, g) => `Cảm ơn ${n} nhiều nha! ${g} làm ruộng vườn lớn nhanh quá trời.`],
  mua2: [(n, g) => `Trời ơi ${n} tặng ${g}! Mưa thuận gió hòa, cả làng được mùa rồi bà con ơi!`, (n, g) => `Cảm ơn ${n} nha! Cầu vồng hiện ra trên làng mình luôn nè.`],
  may:  [(n, g) => `Ôi ${n} tặng ${g}! Tiệm may tặng một bộ áo mới, mặc vào đẹp quá trời. Cảm ơn nha!`, (n, g) => `Cảm ơn ${n} nha! Áo mới may xong rồi, đi dạo làng cho bà con ngắm nè.`],
  xe:   [(n, g) => `Cảm ơn ${n} tặng ${g}! Xe gỗ gạch chở về tận sân, sắp xây nhà mới rồi.`, (n, g) => `${n} ơi cảm ơn nha! Gỗ gạch về đầy sân, gõ xây nhà là lên nhà liền.`],
  xaynha: [(n, g) => `Cả làng ơi! ${n} tặng ${g}, thợ xây về dựng nhà mới cho ${n} rồi! Cảm ơn ${n} nhiều lắm!`, (n, g) => `Chúc mừng ${n} lên nhà mới! Cảm ơn ${g} nha, nhà cửa khang trang quá trời.`],
  aoquy: [(n, g) => `Trời ơi ${n} tặng ${g}! Áo quý lấp lánh, đẹp nhất làng luôn. Cảm ơn ${n} nha!`, (n, g) => `Cảm ơn ${n} nhiều lắm! Áo gấm áo the, mặc vô sang trọng quá.`],
  daigia: [(n, g) => `Đại gia làng ${n} xuất hiện! Cảm ơn ${g}! Nhà mới, áo quý, mở hội cả làng luôn! Bà con ơi cảm ơn ${n} đi!`, (n, g) => `Trống chiêng vang lừng chào đại gia ${n}! Cảm ơn ${g}, cả làng mở hội ăn mừng!`],
  tho:  [(n, g) => `Cả làng ơi! ${n} tặng ${g}, thợ giỏi về làng xây công trình rồi. Cảm ơn ${n} nhiều lắm!`, (n, g) => `Pháo hoa mừng ${n}! Cảm ơn ${g}, làng mình sắp có công trình mới rồi.`],
  hoi:  [(n, g) => `Trống hội vang lên! ${n} tặng ${g}, mở hội cả làng! Bà con gõ tham gia hội làng nha. Cảm ơn ${n}!`, (n, g) => `Mạnh thường quân ${n} tặng ${g}! Đèn trời bay lên, hội làng bắt đầu! Cảm ơn ${n} nhiều lắm!`],
};
export function thanksLine(tier: string, name: string, gift: string, count: number){
  const list = LINES[tier] ?? LINES.mua, g = count > 1 ? `${count} ${gift}` : gift;
  return list[Math.floor(Math.random() * list.length)](spoken(name), spoken(g));
}

// Lời MC đám cưới. Mừng cưới nhỏ (dưới 10 xu) không đọc để giọng không bị kín.
type WeddingFx = { ev: string; name: string; other?: string; amount?: number; role?: string; text?: string };
const WEDDING_LINES: Record<string, ((n: string, o: string) => string)[]> = {
  bride: [n => `Xin chúc mừng ${n} làm cô dâu xinh đẹp của làng! Bạn nam nào muốn làm chú rể thì bình luận chữ nam rồi tặng đúng ba xu nha!`,
          n => `Cô dâu ${n} đã lên xe hoa! Chú rể đâu rồi bà con ơi!`],
  groomFirst: [n => `Chú rể ${n} đã sẵn sàng! Bạn nữ nào muốn làm cô dâu thì bình luận chữ nữ rồi tặng đúng ba xu nha!`],
  brideJoin: [(n, o) => `Cô dâu ${n} đã về bên chú rể ${o}! Lễ thành hôn bắt đầu, mời bà con vào dự!`],
  stealBride: [(n, o) => `Ối trời ơi! ${n} cướp rể thành công, giành chú rể từ tay ${o} rồi! Đám cưới này kịch tính quá bà con ơi!`],
  groom: [(n, o) => `Chú rể ${n} đã tới rước cô dâu ${o}! Lễ thành hôn bắt đầu, mời bà con vào mâm ăn cỗ!`,
          (n, o) => `Xin chúc mừng ${n} và ${o}! Trăm năm hạnh phúc, sớm sinh quý tử!`],
  steal: [(n, o) => `Ối trời ơi! ${n} cướp dâu thành công rồi! Chú rể ${o} có giành lại được không đây!`,
          (n, o) => `Có biến rồi bà con ơi! ${n} xông vào cướp dâu từ tay ${o}! Đám cưới này hấp dẫn quá!`],
  mung:  [n => `Cảm ơn ${n} đã mừng cưới, chúc cô dâu chú rể trăm năm hạnh phúc!`],
  confetti: [n => `Bùm! ${n} bắn pháo giấy chúc mừng cô dâu chú rể!`, n => `Pháo giấy tung bay rồi! Cảm ơn ${n} nha!`],
  toast: [n => `Cảm ơn ${n}! Mời cả đám cưới đứng dậy, cùng nâng ly nào!`, n => `${n} mời cả đám cưới nâng ly! Bà con đứng dậy hô thật to nào!`],
  fireworks: [n => `Pháo hoa rực trời! Cảm ơn ${n} đã mừng đám cưới!`, n => `Bùm bùm! ${n} bắn pháo hoa, sân cưới sáng rực luôn!`],
  dance: [n => `Nhạc sàn lên nào! Cảm ơn ${n}, cả đám cưới cùng nhảy thôi bà con ơi!`, n => `${n} mở sàn nhảy rồi! Cô dâu chú rể, cả hai họ cùng quẩy nào!`],
  heartRain: [n => `Trời ơi mưa tim khắp sân! Cảm ơn ${n} nhiều lắm!`],
  lion: [n => `Tùng tùng tùng! Đoàn lân của ${n} vào sân múa chúc mừng cô dâu chú rể!`],
  lantern: [n => `Hoàng hôn buông xuống, ${n} thả đèn trời cầu chúc trăm năm hạnh phúc! Đẹp quá bà con ơi!`],
  rainbow: [n => `Cầu vồng hiện ra trên sân cưới! Hoa vàng rơi đầy trời, cảm ơn ${n}!`],
  grand: [n => `Ôi trời đất ơi! Pháo hoa trái tim, tên ${n} sáng rực trên bầu trời! Cảm ơn ${n}, một món quà tuyệt vời cho đám cưới!`],
  end:   [(n, o) => `Hôn lễ của ${n} và ${o} đã hoàn tất! Mời cô dâu chú rể nắm tay nhau vào nhà. Chúc hai bạn trăm năm hạnh phúc, sớm sinh quý tử!`],
};
export function weddingLine(f: WeddingFx){
  if (f.ev === 'mc') return f.text ?? '';                     // lời MC dẫn chương trình đọc nguyên văn
  if (f.ev === 'guest' || f.ev === 'outfit' || (f.ev === 'mung' && (f.amount ?? 0) < 10)) return '';
  const top = f.ev === 'mung' ? showFor(f.amount ?? 0).at(-1)?.key : undefined;
  const key = top && top in WEDDING_LINES ? top : f.ev === 'steal' && f.role === 'bride' ? 'stealBride' : f.ev === 'groom' && !f.other ? 'groomFirst' : f.ev === 'bride' && f.other ? 'brideJoin' : f.ev;
  const list = WEDDING_LINES[key];
  return list ? list[Math.floor(Math.random() * list.length)](spoken(f.name), spoken(f.other ?? '')) : '';
}

// Anh phục vụ hô to tên người gọi bia, gọi món (giọng nam)
const BOY_LINES: Record<'beer' | 'food', ((n: string) => string)[]> = {
  beer: [n => `Có ngay! Bia lạnh cho ${n} đây!`, n => `Bia đây bia đây! ${n} gọi bia, dô dô!`, n => `Dạ có ngay! ${n} gọi bia cho cả mâm đây ạ!`],
  food: [n => `Có ngay! ${n} gọi thêm món, nóng hổi đây!`, n => `Món mới ra đây! ${n} gọi thêm món cho cả mâm!`],
};
export function boyLine(kind: 'beer' | 'food', name: string){
  const list = BOY_LINES[kind];
  return list[Math.floor(Math.random() * list.length)](spoken(name));
}

// Lâu chưa ai gọi bia: anh phục vụ đi mời cả sân
const BEER_ASK = [
  'Bà con ơi, bia lạnh đây! Ai khát thì tặng một xu, phục vụ bê ra tận mâm nha!',
  'Mâm nào chưa có bia đâu ạ? Tặng một xu là có bia ngay!',
  'Cỗ ngon thế này mà thiếu bia thì buồn lắm! Gọi bia đi bà con ơi, một xu thôi!',
  'Dô dô! Ai gọi bia không ạ? Một xu thôi, bia mát lạnh bê ra liền!',
];
export const beerAskLine = () => BEER_ASK[Math.floor(Math.random() * BEER_ASK.length)];

// Chưa đủ cô dâu chú rể: MC mời người xem tặng đúng 3 xu để vào vai. Thiếu vai nào nói vai đó, gọi tên người đang chờ.
const JOIN_ASK: Record<'waiting' | 'bride' | 'groom', ((n: string) => string)[]> = {
  waiting: [
    () => 'Bà con ơi, đám cưới đang chờ cô dâu chú rể! Bình luận nam hoặc nữ, rồi tặng đúng ba xu là lên làm cô dâu chú rể ngay!',
    () => 'Ai muốn làm cô dâu, chú rể hôm nay nào? Chỉ cần tặng đúng ba xu, ba bông hoa cũng được nha!',
    () => 'Bạn nữ tặng ba xu làm cô dâu, bạn nam tặng ba xu làm chú rể. Nhanh tay kẻo người khác giành mất!',
    () => 'Sân cưới đã sẵn sàng, mâm cỗ đã dọn! Chỉ còn thiếu cô dâu chú rể thôi. Tặng đúng ba xu là lên sân khấu liền!',
  ],
  bride: [
    n => `Cô dâu ${n} đang chờ chú rể! Bạn nam nào bình luận chữ nam rồi tặng đúng ba xu để rước cô dâu nha!`,
    n => `Chú rể đâu rồi bà con ơi? Tặng đúng ba xu là được rước cô dâu ${n} liền!`,
    n => `Cô dâu ${n} xinh quá mà chưa có chú rể! Bạn nam nào nhanh tay tặng ba xu nào!`,
  ],
  groom: [
    n => `Chú rể ${n} đang chờ cô dâu! Bạn nữ nào bình luận chữ nữ rồi tặng đúng ba xu để làm cô dâu nha!`,
    n => `Cô dâu đâu rồi bà con ơi? Tặng đúng ba xu là được về với chú rể ${n} liền!`,
    n => `Chú rể ${n} bảnh bao đang đứng đợi! Bạn nữ nào nhanh tay tặng ba xu nào!`,
  ],
};
let joinAskI = 0;
export function joinAskLine(phase: 'waiting' | 'bride' | 'groom', name: string){
  const list = JOIN_ASK[phase];
  return list[joinAskI++ % list.length](spoken(name));
}

// Vè đám cưới MC đọc xen giữa các lần mời làm cô dâu chú rể, mỗi lần một khổ. Vòng chẵn mở đầu bằng khổ "chim xanh"
// thường, vòng lẻ bằng khổ hài hước "chú rể đang run". Xuống dòng giữ nguyên để phụ đề hiện thành thơ.
const VERSE_OPEN = [
  `Ngoài đồng có con chim xanh,
Bay qua bay lại đậu cành cây đa.
Hôm nay ngày tốt tháng lành,
Chú rể cưới được cô nàng xinh tươi.`,
  `Ngoài đồng có con chim xanh,
Trong nhà có một chú rể đang run.
Cô dâu thì đẹp vô cùng,
Chú rể đứng cạnh ngại ngùng đỏ tai!`,
];
const VERSE_REST = [
  `Trầu cau đã thắm đỏ môi,
Rượu ngon đã rót, mọi người chung vui.
Chúc cho đôi lứa thuận hòa,
Trăm năm hạnh phúc, cửa nhà bình an!`,
  `Ơ kìa, cô bác gần xa,
Vỗ tay thật lớn chúc mừng đôi ta!
Hôm nay không uống thì say,
Không vui không phải đám này đám quê!`,
];
export const weddingVerses = (round: number) => [VERSE_OPEN[round % 2], ...VERSE_REST];
// thời gian đọc ước chừng của một câu (giọng MC nhanh 12%): khoảng 13 chữ cái mỗi giây
export const speakMs = (text: string) => speakable(text).length / 13 * 1000;
