// Âm thanh: nhạc nền hip-hop tự tạo (kick, snare, hi-hat, bass) hoặc file trong tuong/music/, tiếng xịt sơn liên tục khi đang vẽ,
// tiếng hiệu ứng (file CC0 trong public/sfx/), giọng bình luận viên (mp3 server tạo).
export class Sound {
  ctx: AudioContext | null = null;
  private master!: GainNode; private sfx!: GainNode; private mus!: GainNode; private noise!: AudioBuffer;
  private hiss: { g: GainNode; f: BiquadFilterNode } | null = null;
  private bufs = new Map<string, AudioBuffer>();
  private files: string[] = []; private audio: HTMLAudioElement | null = null; private track = 0;
  private next = 0; private step = 0;
  private pump!: GainNode; private echo!: GainNode;          // pump: "nén nhịp" theo trống kick kiểu EDM · echo: vang cho giai điệu
  private voices: string[] = []; private speaking = false;
  muted = false; musicOn = true; spraying = 0; jets = 0; fire = 0; motor = 0;
  private loops: Record<string, { g: GainNode; f: BiquadFilterNode; o?: OscillatorNode }> = {};
  private lastSplat = 0;
  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') void this.ctx.resume(); return; }
    const c = new AudioContext(); this.ctx = c;
    this.master = c.createGain(); this.master.gain.value = this.muted ? 0 : 0.9; this.master.connect(c.destination);
    const comp = c.createDynamicsCompressor(); comp.threshold.value = -14; comp.ratio.value = 4; comp.connect(this.master);
    this.sfx = c.createGain(); this.sfx.gain.value = 0.7; this.sfx.connect(comp);
    this.mus = c.createGain(); this.mus.gain.value = 0.18; this.mus.connect(comp);
    this.pump = c.createGain(); this.pump.connect(this.mus);
    const dl = c.createDelay(1), fb = c.createGain(), wet = c.createGain(); dl.delayTime.value = 60 / 122 * 0.75; fb.gain.value = 0.32; wet.gain.value = 0.3;
    this.echo = c.createGain(); this.echo.connect(dl); dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(this.pump);
    const len = c.sampleRate * 2; this.noise = c.createBuffer(1, len, c.sampleRate); const d = this.noise.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    // tiếng xịt sơn: nhiễu trắng lọc thông cao, to nhỏ theo số thợ đang xịt
    const src = c.createBufferSource(); src.buffer = this.noise; src.loop = true;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 5200; f.Q.value = 0.7; const g = c.createGain(); g.gain.value = 0;
    src.connect(f); f.connect(g); g.connect(this.sfx); src.start(); this.hiss = { g, f };
    // tiếng nền liên tục: động cơ phản lực (nhiễu trầm + răng cưa), lửa rồng (nhiễu thấp phụt), mô tơ xe nâng (ù trầm)
    const loop = (name: string, type: BiquadFilterType, freq: number, q: number, osc?: [OscillatorType, number]) => {
      const s = c.createBufferSource(); s.buffer = this.noise; s.loop = true; const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = freq; fl.Q.value = q; const gg = c.createGain(); gg.gain.value = 0;
      s.connect(fl); fl.connect(gg); gg.connect(this.sfx); s.start(Math.random());
      let o: OscillatorNode | undefined; if (osc) { o = c.createOscillator(); o.type = osc[0]; o.frequency.value = osc[1]; const og = c.createGain(); og.gain.value = 0.35; o.connect(og); og.connect(fl); o.start(); }
      this.loops[name] = { g: gg, f: fl, o };
    };
    loop('jet', 'lowpass', 1400, 0.8, ['sawtooth', 95]); loop('fire', 'bandpass', 500, 0.6); loop('motor', 'lowpass', 260, 2, ['sawtooth', 58]);
    for (const n of ['boom-0', 'boom-1', 'boom-2', 'zap', 'ring', 'coin', 'coin-big', 'warp', 'launch', 'boost', 'bomb-low', 'go'])
      fetch(`sfx/${n}.ogg`).then(r => r.ok ? r.arrayBuffer() : Promise.reject()).then(b => c.decodeAudioData(b)).then(b => this.bufs.set(n, b)).catch(() => {});
    fetch('/music/list.json').then(r => r.json()).then((l: string[]) => { this.files = l; if (l.length) this.playFile(); }).catch(() => {});
    this.next = c.currentTime + 0.2;
  }
  setMuted(m: boolean) { this.muted = m; if (this.master) this.master.gain.value = m ? 0 : 0.9; if (this.audio) this.audio.muted = m; }
  setMusic(on: boolean) { this.musicOn = on; if (this.mus) this.mus.gain.value = on ? 0.18 : 0; if (this.audio) on ? void this.audio.play().catch(() => {}) : this.audio.pause(); }
  private playFile() { const a = this.audio ??= new Audio(); a.src = this.files[this.track++ % this.files.length]; a.volume = 0.22; a.muted = this.muted; a.onended = () => this.playFile(); if (this.musicOn) void a.play().catch(() => {}); }
  private tone(freq: number, t: number, dur: number, type: OscillatorType, vol: number, slide = 0) {
    const c = this.ctx!, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.setValueAtTime(freq, t); if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0008, t + dur); o.connect(g); g.connect(this.mus); o.start(t); o.stop(t + dur + 0.02);
  }
  private hat(t: number, vol: number, len = 0.05) { const c = this.ctx!, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 7000; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + len); s.connect(f); f.connect(g); g.connect(this.mus); s.start(t, Math.random()); s.stop(t + len + 0.02); }
  // nốt tổng hợp: dao động → lọc thấp → bao âm → qua "pump" (nén theo kick); echo: thêm vang
  private syn(freq: number, t: number, dur: number, type: OscillatorType, vol: number, cut: number, detune = 0, echo = false) {
    const c = this.ctx!, o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
    o.type = type; o.frequency.value = freq; o.detune.value = detune; f.type = 'lowpass'; f.frequency.value = cut;
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + Math.min(0.02, dur * 0.2)); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    o.connect(f); f.connect(g); g.connect(this.pump); if (echo) g.connect(this.echo); o.start(t); o.stop(t + dur + 0.02);
  }
  private kick(t: number) { const c = this.ctx!, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.22); g.gain.setValueAtTime(0.85, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3); o.connect(g); g.connect(this.mus); o.start(t); o.stop(t + 0.32); }
  private duck(t: number) { const g = this.pump.gain; g.cancelScheduledValues(t); g.setValueAtTime(0.3, t); g.linearRampToValueAtTime(1, t + 0.22); }
  private clap(t: number, vol: number) {
    const c = this.ctx!;
    for (let i = 0; i < 3; i++) { const tt = t + i * 0.011, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 1.2; g.gain.setValueAtTime(vol, tt); g.gain.exponentialRampToValueAtTime(0.001, tt + (i === 2 ? 0.16 : 0.03)); s.connect(f); f.connect(g); g.connect(this.mus); s.start(tt, Math.random()); s.stop(tt + 0.2); }
  }
  // tiếng "vút" dâng lên trước đoạn drop
  private riser(t: number, dur: number) {
    const c = this.ctx!, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = this.noise; s.loop = true;
    f.type = 'bandpass'; f.Q.value = 2; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(7000, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.09, t + dur); g.gain.linearRampToValueAtTime(0, t + dur + 0.05);
    s.connect(f); f.connect(g); g.connect(this.mus); s.start(t); s.stop(t + dur + 0.1);
  }
  private snare(t: number) { this.hat(t, 0.35, 0.18); this.tone(190, t, 0.12, 'triangle', 0.25, 120); }
  update() {
    const c = this.ctx; if (!c) return;
    const now = c.currentTime;
    if (this.hiss) { const want = this.spraying ? 0.22 + Math.sin(now * 23) * 0.03 : 0; this.hiss.g.gain.setTargetAtTime(want, now, 0.05); this.hiss.f.frequency.setTargetAtTime(4800 + Math.random() * 1600, now, 0.08); }
    const L = this.loops;
    if (L.jet) { L.jet.g.gain.setTargetAtTime(Math.min(0.32, this.jets * 0.14), now, 0.3); L.jet.f.frequency.setTargetAtTime(1100 + Math.sin(now * 0.9) * 400, now, 0.2); L.jet.o?.frequency.setTargetAtTime(90 + Math.sin(now * 1.3) * 18, now, 0.2); }
    if (L.fire) L.fire.g.gain.setTargetAtTime(this.fire ? 0.28 + Math.random() * 0.12 : 0, now, 0.06);
    if (L.motor) L.motor.g.gain.setTargetAtTime(this.motor ? 0.12 : 0, now, 0.15);
    if (this.files.length || !this.musicOn) return;
    // dance-pop kiểu Âu Mỹ, 122 BPM, vòng hợp âm Am–F–C–G. Bài 32 ô nhịp lặp lại:
    // mở đầu (pad + hi-hat) → verse (kick 4/4, clap, bass nảy, arp) → build (trống dồn + tiếng vút lên) → drop (đủ bộ + giai điệu chính) → nghỉ (pad + giai điệu nhẹ)
    const beat = 60 / 122 / 4, mf = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
    const HOOK = [
      [76, 0, 72, 0, 69, 0, 72, 76, 0, 0, 74, 0, 72, 0, 0, 0],
      [77, 0, 72, 0, 69, 0, 72, 77, 0, 0, 76, 0, 74, 0, 0, 0],
      [79, 0, 76, 0, 72, 0, 76, 79, 0, 0, 77, 0, 76, 0, 0, 0],
      [74, 0, 71, 0, 67, 0, 71, 74, 0, 76, 74, 0, 71, 0, 67, 0],
    ];
    while (this.next < c.currentTime + 0.25) {
      const t = this.next, st = this.step++, s = st % 16, bar = Math.floor(st / 16) % 32, ch = bar % 4;
      const sec = bar < 4 ? 'intro' : bar < 12 ? 'verse' : bar < 16 ? 'build' : bar < 28 ? 'drop' : 'break';
      const root = [57, 53, 48, 55][ch], chord = [0, ch === 0 ? 3 : 4, 7].map(k => root + k);
      const full = sec === 'verse' || sec === 'drop';
      if ((full || (sec === 'build' && bar < 15)) && s % 4 === 0) { this.kick(t); this.duck(t); }
      if (full && (s === 4 || s === 12)) this.clap(t, 0.3);
      if (sec === 'build') { const every = bar < 14 ? 4 : bar < 15 ? 2 : 1; if (s % every === 0) this.clap(t, 0.1 + (bar - 12) * 0.05 + s * 0.004); if (bar === 12 && s === 0) this.riser(t, beat * 64); }
      if (sec !== 'intro' || bar >= 2) { if (s % 4 === 2) this.hat(t, 0.06, 0.12); else if (sec === 'drop' && s % 2 === 0) this.hat(t, 0.03); }
      if (full && s % 4 === 2) this.syn(mf(root - 12), t, beat * 1.6, 'sawtooth', 0.1, 700);
      if (sec === 'drop' && s % 4 === 0) this.syn(mf(root - 12), t, beat * 0.9, 'square', 0.05, 450);
      if (s === 0) chord.forEach(m => [-7, 7].forEach(d => this.syn(mf(m + 12), t, beat * 16, 'sawtooth', sec === 'intro' || sec === 'break' ? 0.022 : 0.016, 1600, d)));
      if (sec === 'verse' || sec === 'build') this.syn(mf(chord[s % 3] + 24), t, beat * 0.9, 'triangle', 0.035, 3000);
      if (sec === 'drop' || sec === 'break') { const n = HOOK[ch][s]; if (n) this.syn(mf(n), t, beat * 1.8, 'square', sec === 'break' ? 0.025 : 0.04, sec === 'break' ? 1400 : 3000, 0, true); }
      this.next += beat;
    }
  }
  // lắc bình sơn: viên bi lạch cạch trong bình
  shake() {
    const c = this.ctx; if (!c) return;
    for (let i = 0; i < 7; i++) { const t = c.currentTime + i * 0.085, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = 2600 + (i % 2) * 700; f.Q.value = 9; g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05); s.connect(f); f.connect(g); g.connect(this.sfx); s.start(t, Math.random()); s.stop(t + 0.06); }
  }
  // viên sơn chạm tường: tiếng bộp ướt
  splat() {
    const c = this.ctx; if (!c || c.currentTime - this.lastSplat < 0.045) return; this.lastSplat = c.currentTime;
    const t = c.currentTime, o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(160 + Math.random() * 40, t); o.frequency.exponentialRampToValueAtTime(55, t + 0.12); g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.14); o.connect(g); g.connect(this.sfx); o.start(t); o.stop(t + 0.15);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g2 = c.createGain(); s.buffer = this.noise; f.type = 'lowpass'; f.frequency.value = 1500; g2.gain.setValueAtTime(0.25, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.08); s.connect(f); f.connect(g2); g2.connect(this.sfx); s.start(t, Math.random()); s.stop(t + 0.1);
  }
  // súng sơn nhả đạn: tiếng "phụt" khí nén + bụp trầm
  private lastPew = 0;
  pew() {
    const c = this.ctx; if (!c || c.currentTime - this.lastPew < 0.07) return; this.lastPew = c.currentTime;
    const t = c.currentTime, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); s.buffer = this.noise;
    f.type = 'bandpass'; f.Q.value = 1.4; f.frequency.setValueAtTime(2400, t); f.frequency.exponentialRampToValueAtTime(700, t + 0.09);
    g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.1); s.connect(f); f.connect(g); g.connect(this.sfx); s.start(t, Math.random()); s.stop(t + 0.12);
    const o = c.createOscillator(), og = c.createGain(); o.frequency.setValueAtTime(210, t); o.frequency.exponentialRampToValueAtTime(70, t + 0.08); og.gain.setValueAtTime(0.18, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.09); o.connect(og); og.connect(this.sfx); o.start(t); o.stop(t + 0.1);
  }
  roar() { this.play('bomb-low', 0.9, 0.7); this.play('warp', 0.6, 0.6); }
  // xong một bức: tiếng chuông vui; bích hoạ: chuông dài + pháo
  done(big = false) {
    const c = this.ctx; if (!c) return;
    [0, 4, 7, 12].forEach((n, i) => this.tone2(784 * Math.pow(2, n / 12), c.currentTime + i * 0.07, big ? 1.4 : 0.6));
    if (big) this.play('coin-big', 0.8);
  }
  private tone2(freq: number, t: number, dur: number) { const c = this.ctx!, o = c.createOscillator(), g = c.createGain(); o.type = 'triangle'; o.frequency.value = freq; g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); o.connect(g); g.connect(this.sfx); o.start(t); o.stop(t + dur + 0.02); }
  play(name: string, vol = 1, rate = 1) {
    const c = this.ctx, b = this.bufs.get(name); if (!c || !b) return;
    const s = c.createBufferSource(), g = c.createGain(); s.buffer = b; s.playbackRate.value = rate * (0.94 + Math.random() * 0.12); g.gain.value = vol; s.connect(g); g.connect(this.sfx); s.start();
  }
  voice(url: string) { this.voices.push(url); if (this.voices.length > 4) this.voices.shift(); this.nextVoice(); }
  private nextVoice() {
    if (this.speaking || !this.voices.length) return;
    this.speaking = true; const a = new Audio(this.voices.shift()!); a.muted = this.muted;
    if (this.mus) this.mus.gain.value = this.musicOn ? 0.07 : 0;
    const done = () => { this.speaking = false; if (this.mus) this.mus.gain.value = this.musicOn ? 0.18 : 0; this.nextVoice(); };
    a.onended = done; a.onerror = done; void a.play().catch(done);
  }
}
