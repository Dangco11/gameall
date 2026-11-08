export type Section = 'calm' | 'groove' | 'build' | 'drop';
export interface Beat { level: number; bass: number; beat: boolean; phase: number; bins: Float32Array; bpm: number; section: Section; dropHit: boolean }

// Nhạc nền studio: phát file trong assets/music/ (thư mục gốc dự án) rồi bar/music/, qua bộ phân tích phổ để đèn LED của máy in
// đập nhẹ theo nhịp. Không có file thì tự chơi một bản nhạc tổng hợp 124 BPM. Trình duyệt chặn tự phát thì chờ một cú bấm.
export class Music {
  readonly beat: Beat = { level: 0, bass: 0, beat: false, phase: 0, bins: new Float32Array(64), bpm: 124, section: 'groove', dropHit: false };
  private longAvg = 0.3; private shortAvg = 0.3; private dropUntil = 0;
  playing = false;
  wantOn = true;
  private ctx: AudioContext | null = null;
  private an: AnalyserNode | null = null;
  private gain: GainNode | null = null;
  private el: HTMLAudioElement | null = null;
  private list: string[] = [];
  private idx = 0;
  private data = new Uint8Array(1024);
  private avg = 0; private lastBeat = 0;
  private synthAt = 0; private step = 0; private synthOn = false;
  private boost = 1; private duckTo = 1;
  // âm lượng nhạc nền (0..1): mặc định 0,1 để nghe rõ tiếng máy in và giọng MC; đổi bằng ?nhac=0.2 trên đường dẫn
  private vol = (() => { const v = new URLSearchParams(location.search).get('nhac'); return v !== null && isFinite(+v) ? Math.max(0, Math.min(1, +v)) : 0.1; })();

  async init(){
    for (const u of ['/music/bar/list.json', '/music/list.json']){
      try { const r = await fetch(u); if (r.ok) this.list.push(...((await r.json()) as string[]).filter(s => typeof s === 'string')); } catch { /* chưa có thư mục */ }
    }
    // trộn thứ tự cho mỗi buổi khác nhau
    this.idx = Math.floor(Math.random() * Math.max(1, this.list.length));
  }

  // gọi trong sự kiện bấm (hoặc lúc mở trang, OBS cho tự phát)
  start(){
    if (!this.ctx){
      // đệm âm thanh lớn (playback): máy vừa vẽ 3D vừa bị phần mềm live mã hoá video cũng không bị rè, lụp bụp
      const ctx = this.ctx = new AudioContext({ latencyHint: 'playback' });
      this.an = ctx.createAnalyser(); this.an.fftSize = 2048; this.an.smoothingTimeConstant = 0.6;
      this.gain = ctx.createGain(); this.gain.gain.value = this.vol;
      // chặn đỉnh: bài nhạc thu to (nonstop, remix) không bị vỡ tiếng
      const limit = ((ctx: AudioContext) => { const c = ctx.createDynamicsCompressor(); c.threshold.value = -8; c.knee.value = 4; c.ratio.value = 14; c.attack.value = 0.003; c.release.value = 0.25; return c; })(ctx);
      this.an.connect(this.gain).connect(limit).connect(ctx.destination);
      this.data = new Uint8Array(this.an.frequencyBinCount);
    }
    void this.ctx.resume().then(() => { this.playing = this.ctx?.state === 'running'; });
    if (this.list.length) this.next(); else { this.synthOn = true; this.synthAt = this.ctx.currentTime + 0.1; }
  }
  stop(){ this.el?.pause(); this.synthOn = false; this.playing = false; void this.ctx?.suspend(); }
  get blocked(){ return !this.ctx || this.ctx.state !== 'running'; }
  // MC đang nói thì nhạc nhỏ lại
  duck(on: boolean){ this.duckTo = on ? 0.12 : 1; }
  // DJ show: nhạc to và dồn hơn một chút
  hype(on: boolean){ this.boost = on ? 1.15 : 1; }

  private next(){
    if (!this.ctx || !this.an) return;
    const url = this.list[this.idx++ % this.list.length];
    if (!this.el){
      this.el = new Audio(); this.el.crossOrigin = 'anonymous'; this.el.preload = 'auto';
      this.ctx.createMediaElementSource(this.el).connect(this.an);
      this.el.onended = () => this.next();
      this.el.onerror = () => { this.list.splice((this.idx - 1) % this.list.length, 1); if (this.list.length) this.next(); else { this.synthOn = true; this.synthAt = this.ctx!.currentTime + 0.1; } };
    }
    this.el.src = url;
    void this.el.play().then(() => { this.playing = true; }).catch(() => { this.playing = false; });
  }

  // nhạc tổng hợp: lên lịch trước 0,2 giây mỗi khung hình (16 phách nhỏ một ô nhịp)
  private synth(){
    const ctx = this.ctx!, out = this.an!, spb = 60 / 124 / 4;
    const ROOTS = [45, 45, 41, 43];
    const hz = (n: number) => 440 * 2 ** ((n - 69) / 12);
    while (this.synthAt < ctx.currentTime + 0.2){
      const t = this.synthAt, s = this.step % 16, bar = Math.floor(this.step / 16), root = ROOTS[bar % 4];
      if (s % 4 === 0){ const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12); g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.32); o.connect(g).connect(out); o.start(t); o.stop(t + 0.35); }
      if (s % 4 === 2){ const b = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter(); b.buffer = this.noise(ctx); f.type = 'highpass'; f.frequency.value = 7000; g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.06); b.connect(f).connect(g).connect(out); b.start(t); b.stop(t + 0.08); }
      if (s === 4 || s === 12){ const b = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter(); b.buffer = this.noise(ctx); f.type = 'bandpass'; f.frequency.value = 1800; g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18); b.connect(f).connect(g).connect(out); b.start(t); b.stop(t + 0.2); }
      if (s % 2 === 1){ const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = hz(root - 12 + (s === 7 || s === 15 ? 12 : 0)); f.type = 'lowpass'; f.frequency.value = 420; g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.001, t + spb * 1.6); o.connect(f).connect(g).connect(out); o.start(t); o.stop(t + spb * 2); }
      if (s === 0 || s === 6 || s === 10){
        for (const iv of [0, 3, 7, 10]){ const o = ctx.createOscillator(), g = ctx.createGain(), f = ctx.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = hz(root + 12 + iv); o.detune.value = (Math.random() - 0.5) * 14; f.type = 'lowpass'; f.frequency.value = 1600 + Math.sin(bar * 0.7) * 800; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.045, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + spb * 3); o.connect(f).connect(g).connect(out); o.start(t); o.stop(t + spb * 3.2); }
      }
      this.synthAt += spb; this.step++;
    }
  }
  private nb: AudioBuffer | null = null;
  private noise(ctx: AudioContext){ if (!this.nb){ const n = ctx.sampleRate * 0.3; this.nb = ctx.createBuffer(1, n, ctx.sampleRate); const d = this.nb.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; } return this.nb; }

  // đọc phổ, tính độ to, dải trầm, có phách hay không; không có tiếng (bị chặn) thì giả lập nhịp 124 để đèn vẫn chạy
  update(dt: number){
    const b = this.beat;
    if (this.gain && this.ctx) this.gain.gain.value += (this.vol * this.duckTo * this.boost - this.gain.gain.value) * Math.min(1, dt * 4);
    if (this.synthOn && this.ctx?.state === 'running') this.synth();
    b.beat = false; b.dropHit = false;
    const live = this.an && this.ctx?.state === 'running' && (this.synthOn || (this.el && !this.el.paused));
    if (live){
      this.an!.getByteFrequencyData(this.data);
      const n = this.data.length, bins = b.bins.length;
      let bass = 0, all = 0;
      for (let i = 0; i < 12; i++) bass += this.data[i];
      for (let i = 0; i < n / 2; i++) all += this.data[i];
      bass /= 12 * 255; all /= (n / 2) * 255;
      for (let i = 0; i < bins; i++){ const lo = Math.floor((i / bins) ** 2 * n * 0.5), hi = Math.max(lo + 1, Math.floor(((i + 1) / bins) ** 2 * n * 0.5)); let s = 0; for (let k = lo; k < hi; k++) s += this.data[k]; b.bins[i] = s / ((hi - lo) * 255); }
      this.avg += (bass - this.avg) * Math.min(1, dt * 2);
      const now = performance.now();
      b.phase += dt * b.bpm / 60;
      if (bass > this.avg * 1.18 + 0.04 && now - this.lastBeat > 280){
        b.beat = true; const gap = now - this.lastBeat; if (gap < 1000) b.bpm += (60000 / gap - b.bpm) * 0.1; this.lastBeat = now;
        // khoá pha: phách nghe được kéo pha về số nguyên gần nhất, người nhảy không lệch nhịp dần
        b.phase += (Math.round(b.phase) - b.phase) * 0.5;
      }
      b.bass += (bass - b.bass) * Math.min(1, dt * 12); b.level += (all * 1.6 - b.level) * Math.min(1, dt * 8);
      this.section(dt, b.level);
      return;
    } else {
      const spb = 60 / 124, ph = (performance.now() / 1000) / spb, prev = b.phase;
      b.phase = ph;
      if (Math.floor(ph) !== Math.floor(prev)) b.beat = true;
      const k = Math.exp(-(ph % 1) * 5);
      b.bass = 0.25 + k * 0.5; b.level = 0.35 + k * 0.25;
      for (let i = 0; i < b.bins.length; i++) b.bins[i] = Math.max(0, 0.55 - i / b.bins.length * 0.45 + Math.sin(ph * 3 + i * 0.7) * 0.15) * (0.6 + k * 0.4);
      // không nghe được nhạc: đoạn nhạc chạy theo khuôn bài club (32 phách đều, 16 dồn, 32 drop, 16 êm)
      const bar = Math.floor(ph) % 96, sec: Section = bar < 32 ? 'groove' : bar < 48 ? 'build' : bar < 80 ? 'drop' : 'calm';
      if (sec === 'drop' && b.section !== 'drop') b.dropHit = true;
      b.section = sec; b.bpm = 124;
    }
  }
  // Đoạn nhạc theo độ to: trung bình dài (8 giây) và ngắn (1,5 giây). Bật lên mạnh sau đoạn dồn là drop.
  private section(dt: number, level: number){
    const b = this.beat, now = performance.now();
    this.longAvg += (level - this.longAvg) * Math.min(1, dt / 8); this.shortAvg += (level - this.shortAvg) * Math.min(1, dt / 1.5);
    let sec: Section;
    if (now < this.dropUntil) sec = 'drop';
    else if (this.shortAvg > this.longAvg * 1.25 && this.shortAvg > 0.42){ sec = 'drop'; this.dropUntil = now + 12_000; }
    else if (this.shortAvg > this.longAvg * 1.07) sec = 'build';
    else if (this.shortAvg < 0.22) sec = 'calm';
    else sec = 'groove';
    if (sec === 'drop' && b.section !== 'drop') b.dropHit = true;
    b.section = sec;
  }
}
