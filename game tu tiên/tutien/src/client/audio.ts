// Âm thanh: nhạc nền cổ phong tự tạo bằng WebAudio (thang ngũ cung, tiếng gảy kiểu đàn tranh + pad), đổi nhịp khi đánh Boss / PK.
// Có file nhạc trong tutien/music/ thì phát file đó thay. Tiếng hiệu ứng: file CC0 trong public/sfx/ + tiếng tổng hợp.
// Giọng bình luận viên: file mp3 server tạo.
const PENTA = [0, 2, 4, 7, 9];
export class Sound {
  ctx: AudioContext | null = null;
  private master!: GainNode; private sfx!: GainNode; private mus!: GainNode; private rev!: ConvolverNode;
  private bufs = new Map<string, AudioBuffer>();
  private files: string[] = []; private audio: HTMLAudioElement | null = null; private track = 0;
  private nextNote = 0; private step = 0; private intense = 0;
  private voices: string[] = []; private speaking = false;
  muted = false; musicOn = true;

  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') void this.ctx.resume(); return; }
    const ctx = new AudioContext(); this.ctx = ctx;
    this.master = ctx.createGain(); this.master.gain.value = this.muted ? 0 : 0.9; this.master.connect(ctx.destination);
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; comp.connect(this.master);
    this.sfx = ctx.createGain(); this.sfx.gain.value = 0.7; this.sfx.connect(comp);
    this.mus = ctx.createGain(); this.mus.gain.value = 0.28; this.mus.connect(comp);
    // vang: phản hồi xung tự tạo (tiếng vọng núi)
    this.rev = ctx.createConvolver();
    const len = ctx.sampleRate * 2.8, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
    this.rev.buffer = ir; const rg = ctx.createGain(); rg.gain.value = 0.35; this.rev.connect(rg); rg.connect(this.mus);
    for (const n of ['boom-0', 'boom-1', 'boom-2', 'zap', 'shield', 'ring', 'coin', 'coin-big', 'warp', 'launch', 'boost', 'bomb-low', 'bomb-crack'])
      fetch(`sfx/${n}.ogg`).then(r => r.ok ? r.arrayBuffer() : Promise.reject()).then(b => ctx.decodeAudioData(b)).then(b => this.bufs.set(n, b)).catch(() => {});
    fetch('/music/list.json').then(r => r.json()).then((l: string[]) => { this.files = l; if (l.length) this.playFile(); }).catch(() => {});
    this.nextNote = ctx.currentTime + 0.2;
  }
  setMuted(m: boolean) { this.muted = m; if (this.master) this.master.gain.value = m ? 0 : 0.9; if (this.audio) this.audio.muted = m; }
  setMusic(on: boolean) { this.musicOn = on; if (this.mus) this.mus.gain.value = on ? 0.28 : 0; if (this.audio) on ? void this.audio.play().catch(() => {}) : this.audio.pause(); }
  setIntensity(v: number) { this.intense = v; }
  private playFile() {
    if (!this.files.length) return;
    const a = this.audio ??= new Audio(); a.src = this.files[this.track++ % this.files.length]; a.volume = 0.35; a.muted = this.muted;
    a.onended = () => this.playFile();
    if (this.musicOn) void a.play().catch(() => {});
  }
  // gảy dây: sóng tam giác tắt nhanh qua lọc, kiểu đàn tranh
  private pluck(freq: number, t: number, vol = 0.18, dur = 1.6) {
    const c = this.ctx!, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter();
    o.type = 'triangle'; o.frequency.value = freq; o2.type = 'sine'; o2.frequency.value = freq * 2.01;
    f.type = 'lowpass'; f.frequency.setValueAtTime(freq * 8, t); f.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(this.mus); g.connect(this.rev);
    o.start(t); o2.start(t); o.stop(t + dur); o2.stop(t + dur);
  }
  private pad(freq: number, t: number, dur: number) {
    const c = this.ctx!, g = c.createGain();
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + dur * 0.3); g.gain.linearRampToValueAtTime(0, t + dur);
    for (const det of [-6, 6]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = freq; o.detune.value = det; const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 700; o.connect(f); f.connect(g); o.start(t); o.stop(t + dur); }
    g.connect(this.mus); g.connect(this.rev);
  }
  private drum(t: number, vol = 0.3) {
    const c = this.ctx!, o = c.createOscillator(), g = c.createGain();
    o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.3);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
    o.connect(g); g.connect(this.mus); o.start(t); o.stop(t + 0.45);
  }
  // gọi mỗi khung hình: xếp lịch nốt nhạc nền trước 0,3 giây
  update() {
    const c = this.ctx; if (!c || this.files.length || !this.musicOn) return;
    const beat = this.intense > 0 ? 0.26 : 0.42;
    while (this.nextNote < c.currentTime + 0.3) {
      const t = this.nextNote, s = this.step++;
      const root = 146.83;   // Rê
      const chord = [0, 3, 4, 2][Math.floor(s / 16) % 4];
      if (s % 16 === 0) this.pad(root * Math.pow(2, PENTA[chord] / 12) / 2, t, beat * 16);
      const pattern = [0, 2, 1, 3, 4, 3, 2, 1, 0, 1, 2, 4, 3, 2, 1, 2];
      if (Math.random() < (this.intense ? 0.85 : 0.6)) {
        const deg = (pattern[s % 16] + chord) % 5, oct = Math.floor((pattern[s % 16] + chord) / 5) + (s % 32 > 24 ? 1 : 0);
        this.pluck(root * 2 * Math.pow(2, (PENTA[deg] + 12 * oct) / 12), t, 0.12 + Math.random() * 0.05);
      }
      if (this.intense > 0 && s % 4 === 0) this.drum(t, s % 8 === 0 ? 0.35 : 0.2);
      if (this.intense > 1 && s % 2 === 1) this.drum(t, 0.12);
      this.nextNote += beat;
    }
  }
  play(name: string, vol = 1, rate = 1) {
    const c = this.ctx, b = this.bufs.get(name); if (!c) return;
    if (!b) { this.synth(name, vol); return; }
    const s = c.createBufferSource(), g = c.createGain(); s.buffer = b; s.playbackRate.value = rate * (0.94 + Math.random() * 0.12); g.gain.value = vol;
    s.connect(g); g.connect(this.sfx); s.start();
  }
  private synth(name: string, vol: number) {
    const c = this.ctx!, t = c.currentTime, o = c.createOscillator(), g = c.createGain();
    o.type = name.startsWith('zap') ? 'sawtooth' : 'sine';
    o.frequency.setValueAtTime(name.startsWith('boom') ? 120 : 800, t); o.frequency.exponentialRampToValueAtTime(name.startsWith('boom') ? 30 : 200, t + 0.3);
    g.gain.setValueAtTime(0.25 * vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(g); g.connect(this.sfx); o.start(t); o.stop(t + 0.4);
  }
  // chuông (đột phá, nhận pháp bảo)
  chime(big = false) {
    const c = this.ctx; if (!c) return;
    const t = c.currentTime;
    [0, 4, 7, 12, big ? 16 : 12].forEach((n, i) => this.pluck(587.33 * Math.pow(2, n / 12), t + i * 0.07, 0.15, 2.2));
  }
  voice(url: string) { this.voices.push(url); if (this.voices.length > 4) this.voices.shift(); this.nextVoice(); }
  private nextVoice() {
    if (this.speaking || !this.voices.length) return;
    this.speaking = true;
    const a = new Audio(this.voices.shift()!); a.volume = 1; a.muted = this.muted;
    if (this.mus) this.mus.gain.value = this.musicOn ? 0.12 : 0;
    if (this.audio) this.audio.volume = 0.15;
    const done = () => { this.speaking = false; if (this.mus) this.mus.gain.value = this.musicOn ? 0.28 : 0; if (this.audio) this.audio.volume = 0.35; this.nextVoice(); };
    a.onended = done; a.onerror = done;
    void a.play().catch(done);
  }
}
