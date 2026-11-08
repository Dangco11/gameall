// Tiếng hiệu ứng của quán (tổng hợp bằng Web Audio, không cần file) và giọng MC đọc từ server.
// Nhạc club phát riêng ở music.ts; khi MC đang đọc thì music.ts tự nhỏ lại (qua onPlay / onEnd của voice).
export class BarSound {
  on = false;
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private fxBus!: GainNode;
  private reverb!: GainNode;
  private noise: AudioBuffer | null = null;
  private lastPop = 0;
  private voices: { url: string; onPlay?: () => void; onEnd?: () => void; until: number; kind: string }[] = [];
  private current: { audio: HTMLAudioElement; kind: string; done: () => void } | null = null;

  start(){
    if (!this.ctx){
      const ctx = this.ctx = new AudioContext();
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
      this.master = ctx.createGain(); this.master.gain.value = 0.75;
      this.master.connect(comp).connect(ctx.destination);
      // phòng vang của quán: xung tiếng ồn tắt dần 1,6 giây
      const len = Math.floor(ctx.sampleRate * 1.6), ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++){ const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
      const conv = ctx.createConvolver(); conv.buffer = ir;
      this.reverb = ctx.createGain(); this.reverb.gain.value = 0.25;
      this.reverb.connect(conv).connect(this.master);
      this.fxBus = ctx.createGain(); this.fxBus.connect(this.master); this.fxBus.connect(this.reverb);
      const nlen = ctx.sampleRate * 2, buf = ctx.createBuffer(1, nlen, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < nlen; i++) d[i] = Math.random() * 2 - 1;
      this.noise = buf;
    }
    void this.ctx.resume();
    this.on = true;
  }
  stop(){
    this.on = false; void this.ctx?.suspend();
    this.voices = [];
    if (this.current){ this.current.audio.pause(); this.current.done(); }
  }

  private get ok(){ return this.on && !!this.ctx; }
  private now(d = 0){ return this.ctx!.currentTime + d; }
  private env(g: GainNode, t: number, vol: number, attack: number, dur: number){
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  private osc(type: OscillatorType, freq: number, t: number, dur: number, vol: number, out: AudioNode, attack = 0.01, drop = 1){
    const o = this.ctx!.createOscillator(), g = this.ctx!.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (drop !== 1) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq / drop), t + dur);
    this.env(g, t, vol, attack, dur); o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05);
  }
  private hiss(t: number, dur: number, vol: number, type: BiquadFilterType, freq: number, q = 1, attack = 0.01, out: AudioNode = this.fxBus, freqTo = 0){
    const s = this.ctx!.createBufferSource(), f = this.ctx!.createBiquadFilter(), g = this.ctx!.createGain();
    s.buffer = this.noise; f.type = type; f.frequency.setValueAtTime(freq, t); if (freqTo) f.frequency.exponentialRampToValueAtTime(freqTo, t + dur); f.Q.value = q;
    this.env(g, t, vol, attack, dur); s.connect(f).connect(g).connect(out);
    s.start(t, Math.random() * 1.2); s.stop(t + dur + 0.05);
  }

  // tiếng "pốp" nhẹ khi bong bóng, tim hiện lên (gộp: tối đa 8 tiếng một giây)
  pop(){
    if (!this.ok) return;
    const n = performance.now(); if (n - this.lastPop < 120) return; this.lastPop = n;
    const t = this.now(); this.osc('sine', 760 + Math.random() * 160, t, 0.06, 0.05, this.fxBus, 0.002, 1.6);
  }
  // trống bass nện một phát kèm lấp lánh (mở màn diễn)
  boom(){
    if (!this.ok) return;
    const t = this.now();
    this.osc('sine', 110, t, 0.5, 0.45, this.fxBus, 0.003, 3);
    this.hiss(t, 0.18, 0.12, 'lowpass', 1200, 0.7, 0.002);
    for (let i = 0; i < 3; i++) this.osc('sine', 3000 + Math.random() * 2500, t + 0.15 + i * 0.06, 0.25, 0.02, this.fxBus, 0.002);
  }
  // Ống bắn kim tuyến: tiếng "bụp" trầm đục, xì hơi, rồi giấy rơi sột soạt
  cannon(){
    if (!this.ok || !this.noise) return;
    const t = this.now();
    for (const d of [0, 0.07]){
      this.osc('sine', 60, t + d, 0.22, 0.3, this.fxBus, 0.002, 1.4);
      this.hiss(t + d, 0.28, 0.32, 'bandpass', 1800, 0.7, 0.001);
    }
    this.hiss(t + 0.05, 0.9, 0.08, 'highpass', 3000, 0.5, 0.01);
    for (let i = 0; i < 30; i++) this.hiss(t + 0.6 + Math.random() * 2.6, 0.06, 0.012, 'highpass', 4000 + Math.random() * 3000, 0.6);
  }
  // Ly va nhau leng keng: n tiếng chạm thủy tinh cao, lệch nhau vài phần trăm giây
  clink(n = 6, at = 0){
    if (!this.ok) return;
    const t0 = at || this.now();
    for (let i = 0; i < n; i++){
      const t = t0 + Math.random() * 0.25, f = 2400 + Math.random() * 2400;
      this.osc('sine', f, t, 0.35, 0.035, this.fxBus, 0.001); this.osc('sine', f * 2.76, t, 0.15, 0.012, this.fxBus, 0.001);
    }
  }
  // Pháo hoa trong nhà: quả pháo xé gió rít lên
  fwLaunch(){
    if (!this.ok || !this.noise) return;
    const t = this.now();
    const o = this.ctx!.createOscillator(), g = this.ctx!.createGain();
    o.frequency.setValueAtTime(800, t); o.frequency.exponentialRampToValueAtTime(2100, t + 1.2);
    this.env(g, t, 0.025, 0.15, 1.3); o.connect(g).connect(this.fxBus); o.start(t); o.stop(t + 1.4);
    this.hiss(t, 1.2, 0.05, 'bandpass', 1200, 2, 0.1, this.fxBus, 3200);
  }
  // Tiếng nổ: đùng trầm, quả to thì rền hơn; kim tuyến có tràng lách tách sau đó
  fwBurst(kind: string, big = false){
    if (!this.ok || !this.noise) return;
    const t = this.now(0.08), v = big ? 1.3 : 1;
    this.osc('sine', 45, t, 0.7, 0.4 * v, this.fxBus, 0.003, 1.2);
    this.hiss(t, 1.6 * v, 0.45 * v, 'lowpass', 900, 0.7, 0.002, this.fxBus, 120);
    this.hiss(t, 0.15, 0.25, 'bandpass', 2400, 0.6, 0.001);
    if (kind === 'crackle' || kind === 'willow' || big){
      const n = kind === 'crackle' ? 70 : 30;
      for (let i = 0; i < n; i++) this.hiss(t + 0.9 + Math.random() * (kind === 'crackle' ? 0.8 : 2.2), 0.025, kind === 'crackle' ? 0.09 : 0.03, 'highpass', 2500 + Math.random() * 3000, 0.7, 0.0008);
    }
  }
  // Cả quán vỗ tay, hò reo trong sec giây: hàng trăm tiếng vỗ ngắn ngẫu nhiên, to dần rồi nhỏ dần
  applause(sec = 6){
    if (!this.ok || !this.noise) return;
    const t0 = this.now(), n = Math.round(sec * 70);
    for (let i = 0; i < n; i++){
      const k = i / n, at = t0 + k * sec + Math.random() * 0.05, vol = 0.05 * Math.sin(Math.PI * Math.min(1, k * 1.4)) + 0.008;
      this.hiss(at, 0.03 + Math.random() * 0.03, vol, 'bandpass', 1200 + Math.random() * 1800, 1.1, 0.001);
    }
    this.hiss(t0, sec, 0.03, 'bandpass', 700, 0.6, 0.6);     // tiếng reo nền
  }

  // Giọng MC: phát lần lượt; onPlay gọi đúng lúc tiếng bắt đầu (phụ đề khớp giọng, nhạc nhỏ lại), onEnd lúc đọc xong.
  // maxWaitMs: câu chờ trong hàng quá lâu thì bỏ. Trả false nếu câu không được nhận.
  voice(url: string, onPlay?: () => void, onEnd?: () => void, maxWaitMs = 0, kind = ''){
    if (!this.on) return false;
    if (this.voices.length >= 6) return false;
    this.voices.push({ url, onPlay, onEnd, until: maxWaitMs ? performance.now() + maxWaitMs : 0, kind });
    this.nextVoice();
    return true;
  }
  private nextVoice(){
    if (this.current) return;
    const now = performance.now();
    while (this.voices.length && this.voices[0].until && now > this.voices[0].until) this.voices.shift();
    const v = this.voices.shift();
    if (!v) return;
    const audio = new Audio(v.url);
    let finished = false;
    const done = () => {
      if (finished) return;
      finished = true; this.current = null;
      v.onEnd?.();
      setTimeout(() => this.nextVoice(), 150);
    };
    this.current = { audio, kind: v.kind, done };
    audio.onplaying = () => v.onPlay?.();
    audio.onended = done; audio.onerror = done;
    setTimeout(() => { if (!finished){ audio.pause(); done(); } }, 30_000);   // file hỏng, treo: không kẹt hàng đợi
    audio.play().catch(done);
  }
}
