// Giọng tiếp viên đọc lên live bằng dịch vụ Read Aloud của Edge (cần Internet). Mất mạng thì bỏ qua câu, game vẫn chạy.
// Hàng đợi có ưu tiên: câu cảm ơn quà, lên cấp, đại tiệc chen lên trước câu chào khách; quá đầy thì bỏ câu chào trước.
import fs from 'node:fs';
import path from 'node:path';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const MAX_QUEUE = 8, KEEP_FILES = 40, STALE_MS = 30_000;
const SWEAR = new Set(['đm', 'dm', 'đcm', 'dcm', 'đmm', 'dmm', 'đkm', 'dkm', 'đéo', 'địt', 'đụ', 'lồn', 'cặc', 'buồi', 'đĩ', 'clm', 'clgt', 'vcl', 'vkl', 'vl', 'cmm', 'ccc', 'fuck', 'shit']);

// Tên đọc lên phải sạch: bỏ ký hiệu và biểu tượng, tên có từ tục, đường link hay số điện thoại thì gọi là "bạn".
export function spokenName(name) {
  const raw = String(name || '').normalize('NFC');
  if (/https?:|www\.|\.(com|net|vn|me|io)\b/i.test(raw) || /\d[\d\s.-]{6,}\d/.test(raw)) return 'bạn';
  const clean = raw.replace(/[_@.]+/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim().slice(0, 24);
  if ((clean.match(/\p{L}/gu) || []).length < 2) return 'bạn';
  if (clean.toLowerCase().split(/[^\p{L}\p{N}]+/u).some(w => SWEAR.has(w))) return 'bạn';
  return clean;
}
const esc = s => String(s).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));

export class Voice {
  constructor({ dir, broadcast, log = () => {}, voice = 'vi-VN-HoaiMyNeural', pitch = 6, rate = 12 }) {
    Object.assign(this, { dir, broadcast, log, voice, pitch, rate });
    fs.mkdirSync(dir, { recursive: true });
    for (const f of fs.readdirSync(dir)) fs.rmSync(path.join(dir, f), { force: true });
    this.queue = []; this.busy = false; this.seq = 0; this.enabled = true;
  }

  // priority: 2 quà, lên cấp, đại tiệc; 1 câu chào khách
  say(text, { priority = 1, meta = {} } = {}) {
    if (!this.enabled || !text) return false;
    if (this.queue.length >= MAX_QUEUE) {
      const low = this.queue.findIndex(x => x.priority < priority);
      if (low < 0) return false;
      this.queue.splice(low, 1);
    }
    const at = this.queue.findIndex(x => x.priority < priority);
    const job = { text: String(text).slice(0, 300), priority, meta, at: Date.now() };
    if (at < 0) this.queue.push(job); else this.queue.splice(at, 0, job);
    this.pump();
    return true;
  }
  get length() { return this.queue.length + (this.busy ? 1 : 0); }

  async synth(text) {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(this.voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
    const { audioStream } = tts.toStream(esc(text), { pitch: `${this.pitch >= 0 ? '+' : ''}${this.pitch}Hz`, rate: `${this.rate >= 0 ? '+' : ''}${this.rate}%` });
    const chunks = [];
    await new Promise((ok, fail) => { audioStream.on('data', c => chunks.push(c)); audioStream.on('close', ok); audioStream.on('error', fail); });
    try { tts.close(); } catch {}
    if (!chunks.length) throw new Error('không nhận được âm thanh');
    return Buffer.concat(chunks);
  }
  // Dịch vụ đôi khi rớt giữa câu; thử lại vài lần để người tặng quà vẫn nghe được tên mình.
  async synthRetry(text, tries = 3) {
    for (let n = 1; ; n++) {
      try { return await this.synth(text); }
      catch (e) { if (n >= tries) throw e; await new Promise(r => setTimeout(r, 300 * n)); }
    }
  }

  async pump() {
    // Câu đã chờ quá lâu thì bỏ: cảm ơn một món quá trễ còn khó hiểu hơn là không đọc
    while (this.queue.length && Date.now() - this.queue[0].at > STALE_MS) this.queue.shift();
    if (this.busy || !this.queue.length) return;
    this.busy = true;
    const job = this.queue.shift();
    try {
      const file = `tts_${Date.now()}_${++this.seq}.mp3`;
      fs.writeFileSync(path.join(this.dir, file), await this.synthRetry(job.text));
      this.broadcast({ t: 'tts', url: `/tts/${file}`, text: job.text, ...job.meta });
      const old = fs.readdirSync(this.dir).sort();
      while (old.length > KEEP_FILES) fs.rmSync(path.join(this.dir, old.shift()), { force: true });
    } catch (e) {
      this.log(`Giọng đọc lỗi (cần Internet): ${e?.message || e}`);
    }
    this.busy = false;
    setTimeout(() => this.pump(), 50);
  }
}
