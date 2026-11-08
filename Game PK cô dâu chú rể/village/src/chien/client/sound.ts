// Âm thanh Đại Chiến tổng hợp bằng WebAudio, không cần file: binh khí, cung tên, xe, trâu, voi, chuông quà, nhạc nền.
// "Audio pool": tối đa 18 tiếng hiệu ứng cùng lúc, mỗi loại có khoảng nghỉ tối thiểu, nên 300 quân đánh nhau không thành tiếng ồn.
// Âm thanh có vị trí: tiếng ở bên trái màn hình nghe lệch trái, ngoài khung hình thì nhỏ đi (locate do main.ts gán).
// Nhạc nền: sáo trúc, đàn tranh, trống trận, thanh la, chiêng, bass. Lúc chờ chơi nhẹ, vào trận dồn dần theo giai đoạn.
type Key = 'hit' | 'clash' | 'swing' | 'arrow' | 'twang' | 'thunk' | 'volley' | 'cart' | 'moo' | 'snort' | 'gallop' | 'gore'
  | 'trumpet' | 'step' | 'stomp' | 'roar' | 'gift' | 'boss' | 'spawn' | 'die' | 'gate' | 'house' | 'win' | 'lose' | 'beep' | 'go' | 'kill' | 'block' | 'slam' | 'alarm';
const GAP: Record<Key, number> = { hit: 45, clash: 70, swing: 55, arrow: 60, twang: 50, thunk: 60, volley: 300, cart: 400, moo: 900, snort: 500, gallop: 500, gore: 140,
  trumpet: 1500, step: 120, stomp: 250, roar: 1200, gift: 120, boss: 2500, spawn: 90, die: 80, gate: 1500, house: 3000, win: 5000, lose: 5000, beep: 300, go: 1000, kill: 250, block: 120, slam: 200, alarm: 4000 };

// thang ngũ cung Rê (Rê Fa Sol La Đô), tính bằng nửa cung từ Rê
const PENT = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27, 29];
const D3 = 146.83;
const fq = (semi: number, base = D3) => base * 2 ** (semi / 12);
// giai điệu sáo 4 ô nhịp (64 bước móc kép): [bước, bậc ngũ cung, độ dài]
const PHRASE_A: [number, number, number][] = [
  [0, 7, 2], [2, 6, 2], [4, 7, 2], [6, 8, 2], [8, 9, 4], [12, 8, 2], [14, 7, 2],
  [16, 6, 3], [19, 5, 1], [20, 6, 2], [22, 4, 2], [24, 5, 6], [30, 4, 2],
  [32, 4, 2], [34, 5, 2], [36, 6, 2], [38, 7, 2], [40, 8, 3], [43, 9, 1], [44, 10, 4], [48, 9, 2], [50, 8, 2],
  [52, 7, 4], [56, 6, 2], [58, 5, 2], [60, 5, 4],
];
const PHRASE_B: [number, number, number][] = [
  [0, 10, 2], [2, 9, 1], [3, 8, 1], [4, 9, 2], [6, 7, 2], [8, 8, 2], [10, 6, 2], [12, 7, 4],
  [16, 5, 2], [18, 6, 1], [19, 7, 1], [20, 8, 2], [22, 9, 2], [24, 10, 4], [28, 9, 2], [30, 8, 2],
  [32, 7, 2], [34, 8, 2], [36, 7, 2], [38, 6, 2], [40, 5, 4], [44, 6, 2], [46, 7, 2],
  [48, 8, 2], [50, 7, 1], [51, 6, 1], [52, 5, 4], [56, 4, 2], [58, 6, 2], [60, 5, 4],
];
const ROOTS = [0, -2, -5, 0];                     // Rê · Đô · La · Rê
const BPM = [84, 104, 114, 124, 138];             // chờ · giao tranh · tổng tấn công · boss · quyết chiến

export class ChienSound {
  on = false; music = true;
  /** vị trí trên sân → lệch trái/phải và độ to; main.ts gán theo camera */
  locate: ((x: number, z: number) => { pan: number; gain: number }) | null = null;
  private ctx: AudioContext | null = null;
  private out!: GainNode; private fx!: GainNode; private mus!: GainNode; private verb!: ConvolverNode; private verbIn!: GainNode;
  private noise: AudioBuffer | null = null;
  private grit: WaveShaperNode | null = null;
  private last = new Map<Key, number>();
  private live = 0; private mlive = 0;
  private beatAt = 0; private step = 0;
  intensity = 0;                    // 0 chờ, 1 giao tranh, 2 tổng tấn công, 3 boss, 4 quyết chiến

  start(){
    if (!this.ctx){
      const c = this.ctx = new AudioContext();
      const comp = c.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.2;
      this.out = c.createGain(); this.out.gain.value = 0.85; this.out.connect(comp).connect(c.destination);
      this.fx = c.createGain(); this.fx.gain.value = 0.95; this.fx.connect(this.out);
      this.mus = c.createGain(); this.mus.gain.value = 0.42; this.mus.connect(this.out);
      const n = c.sampleRate * 2, b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      this.noise = b;
      // vang nhẹ kiểu sân đình: tiếng động lớn và nhạc có đuôi vang, nghe "to" và có không gian hơn
      const len = Math.floor(c.sampleRate * 1.6), ir = c.createBuffer(2, len, c.sampleRate);
      for (let ch = 0; ch < 2; ch++){ const a = ir.getChannelData(ch); for (let i = 0; i < len; i++) a[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3; }
      this.verb = c.createConvolver(); this.verb.buffer = ir;
      this.verbIn = c.createGain(); this.verbIn.gain.value = 0.22; this.verbIn.connect(this.verb).connect(this.out);
      this.mus.connect(this.verbIn);
      // méo tiếng cho voi rống, trâu húc nghe thô và dữ
      const ws = this.grit = c.createWaveShaper(), curve = new Float32Array(1024);
      for (let i = 0; i < 1024; i++){ const x = i / 512 - 1; curve[i] = Math.tanh(x * 3.2); }
      ws.curve = curve;
    }
    void this.ctx.resume(); this.on = true; this.beatAt = this.ctx.currentTime + 0.2;
  }
  stop(){ this.on = false; void this.ctx?.suspend(); }

  private ok(k: Key){
    if (!this.on || !this.ctx || this.live >= 18) return false;
    const now = performance.now();
    if (now - (this.last.get(k) ?? -1e9) < GAP[k]) return false;
    this.last.set(k, now); return true;
  }
  private t(d = 0){ return this.ctx!.currentTime + d; }
  private env(g: GainNode, t: number, v: number, a: number, d: number){ g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, v), t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + d); }
  private count(node: AudioScheduledSourceNode, music: boolean){
    if (music){ this.mlive++; node.onended = () => { this.mlive--; }; } else { this.live++; node.onended = () => { this.live--; }; }
  }
  private osc(type: OscillatorType, f0: number, f1: number, t: number, d: number, v: number, out: AudioNode = this.fx, a = 0.005){
    const c = this.ctx!, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + d * 0.9);
    this.env(g, t, v, a, d); o.connect(g).connect(out); o.start(t); o.stop(t + d + 0.05);
    this.count(o, out === this.mus);
    return o;
  }
  private hiss(t: number, d: number, v: number, type: BiquadFilterType, f: number, q = 1, out: AudioNode = this.fx, f1 = f, a = 0.004){
    if (!this.noise) return;
    const c = this.ctx!, s = c.createBufferSource(), fl = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noise; s.loop = d > 1.8; fl.type = type; fl.frequency.setValueAtTime(f, t); if (f1 !== f) fl.frequency.exponentialRampToValueAtTime(f1, t + d); fl.Q.value = q;
    this.env(g, t, v, a, d); s.connect(fl).connect(g).connect(out); s.start(t, Math.random()); s.stop(t + d + 0.05);
    this.count(s, out === this.mus);
  }
  // tiếng kim loại: nhiều họa âm không hài hòa tắt nhanh (gươm, giáo, khiên va nhau)
  private metal(t: number, base: number, v: number, d: number, out: AudioNode){
    for (const [r, k] of [[1, 1], [1.47, 0.7], [2.09, 0.5], [2.76, 0.35], [3.9, 0.2]] as const) this.osc('sine', base * r, base * r * 0.995, t, d * (1.1 - k * 0.4), v * k, out, 0.001);
  }
  // nhánh ra có lệch trái/phải và độ to theo vị trí
  private bus(vol: number, x?: number, z?: number, wet = 0): AudioNode | null {
    const c = this.ctx!, g = c.createGain();
    let gain = vol, pan = 0;
    if (x !== undefined && z !== undefined && this.locate){ const l = this.locate(x, z); gain *= l.gain; pan = l.pan; }
    if (gain < 0.04) return null;
    g.gain.value = gain;
    if (c.createStereoPanner){ const p = c.createStereoPanner(); p.pan.value = Math.max(-1, Math.min(1, pan)); g.connect(p).connect(this.fx); if (wet) { const w = c.createGain(); w.gain.value = wet; p.connect(w).connect(this.verbIn); } }
    else g.connect(this.fx);
    setTimeout(() => g.disconnect(), 4000);
    return g;
  }

  play(k: Key, vol = 1, x?: number, z?: number){
    if (!this.ok(k)) return;
    const big = k === 'gore' || k === 'stomp' || k === 'trumpet' || k === 'roar' || k === 'gate' || k === 'house' || k === 'boss' || k === 'win';
    const o = this.bus(vol, x, z, big ? 0.5 : 0.12); if (!o) return;
    const t = this.t(), R = Math.random;
    switch (k){
      // trúng đòn: tiếng bịch vào da thịt, áo giáp
      case 'hit': this.osc('triangle', 150 + R() * 50, 60, t, 0.1, 0.13, o); this.hiss(t, 0.06, 0.1, 'lowpass', 1100 + R() * 500, 1, o); break;
      // gươm giáo chạm nhau: tiếng keng kim loại
      case 'clash': this.metal(t, 1500 + R() * 700, 0.035, 0.32, o); this.hiss(t, 0.05, 0.12, 'highpass', 3500, 1, o); break;
      // vung binh khí: tiếng vút gió
      case 'swing': this.hiss(t, 0.16, 0.08, 'bandpass', 700 + R() * 300, 2.5, o, 2400, 0.05); break;
      case 'block': this.metal(t, 820 + R() * 120, 0.06, 0.4, o); this.osc('triangle', 180, 120, t, 0.08, 0.08, o); break;
      // dây cung bật + mũi tên rít đi
      case 'twang': case 'arrow':
        this.osc('triangle', 300 + R() * 60, 250, t, 0.11, 0.07, o, 0.001); this.osc('sawtooth', 150, 140, t, 0.06, 0.03, o, 0.001);
        this.hiss(t + 0.02, 0.22, 0.05, 'bandpass', 3200, 5, o, 900); break;
      // mũi tên cắm xuống
      case 'thunk': this.osc('square', 380 + R() * 80, 160, t, 0.05, 0.03, o, 0.001); this.hiss(t, 0.05, 0.06, 'bandpass', 1400, 2, o); break;
      // cả hàng cung cùng bắn
      case 'volley': for (let i = 0; i < 5; i++){ const d = i * 0.06 + R() * 0.03; this.osc('triangle', 280 + R() * 90, 230, t + d, 0.1, 0.05, o, 0.001); this.hiss(t + d + 0.02, 0.3, 0.035, 'bandpass', 3000, 5, o, 800); } break;
      case 'cart': this.hiss(t, 1.1, 0.16, 'lowpass', 260, 1, o, 160); this.osc('sawtooth', 55, 70, t, 1.0, 0.05, o);
        for (let i = 0; i < 6; i++) this.osc('square', 120 + R() * 30, 90, t + i * 0.16, 0.04, 0.03, o); break;   // bánh gỗ lạch cạch
      // trâu rống: răng cưa trầm qua hai dải cộng hưởng như khoang miệng, rung chậm
      case 'moo': {
        const c = this.ctx!, s = c.createOscillator(), g = c.createGain(), f1 = c.createBiquadFilter(), f2 = c.createBiquadFilter(), lfo = c.createOscillator(), lg = c.createGain();
        s.type = 'sawtooth'; s.frequency.setValueAtTime(96, t); s.frequency.linearRampToValueAtTime(128, t + 0.35); s.frequency.linearRampToValueAtTime(84, t + 1.3);
        lfo.frequency.value = 6; lg.gain.value = 3; lfo.connect(lg).connect(s.frequency);
        f1.type = 'bandpass'; f1.frequency.setValueAtTime(420, t); f1.frequency.linearRampToValueAtTime(700, t + 0.4); f1.Q.value = 3;
        f2.type = 'bandpass'; f2.frequency.value = 1150; f2.Q.value = 5;
        this.env(g, t, 0.32, 0.12, 1.4); s.connect(f1).connect(g); s.connect(f2).connect(g); g.connect(o);
        s.start(t); s.stop(t + 1.45); lfo.start(t); lfo.stop(t + 1.45); this.count(s, false);
        break;
      }
      // trâu phì hơi trước khi húc
      case 'snort': this.hiss(t, 0.18, 0.2, 'bandpass', 600, 1.5, o, 300, 0.01); this.hiss(t + 0.24, 0.3, 0.24, 'bandpass', 520, 1.5, o, 220, 0.01); break;
      // vó trâu dồn dập
      case 'gallop': for (let i = 0; i < 8; i++){ const d = Math.floor(i / 2) * 0.2 + (i % 2) * 0.07; this.osc('sine', 95, 40, t + d, 0.16, 0.2, o, 0.002); this.hiss(t + d, 0.08, 0.1, 'lowpass', 500, 1, o); } break;
      // húc: cú va nặng, tiếng sừng gõ, đất văng
      case 'gore': {
        this.osc('sine', 120, 34, t, 0.55, 0.5, o, 0.002); this.osc('triangle', 220, 70, t, 0.18, 0.2, o, 0.001);
        this.hiss(t, 0.09, 0.22, 'highpass', 1800, 1, o); this.hiss(t, 0.45, 0.22, 'lowpass', 700, 1, o, 120);
        this.osc('square', 520 + R() * 80, 240, t, 0.05, 0.05, o, 0.001);
        break;
      }
      // voi rống: kèn răng cưa + vuông vút cao, cộng hưởng mạnh, méo thô, có hơi thở và tiếng rền dưới
      case 'trumpet': {
        const c = this.ctx!, a1 = c.createOscillator(), a2 = c.createOscillator(), g = c.createGain(), b1 = c.createBiquadFilter(), b2 = c.createBiquadFilter(), lfo = c.createOscillator(), lg = c.createGain(), pre = c.createGain();
        for (const [s, m] of [[a1, 1], [a2, 1.006]] as const){
          s.frequency.setValueAtTime(480 * m, t); s.frequency.exponentialRampToValueAtTime(880 * m, t + 0.22); s.frequency.linearRampToValueAtTime(820 * m, t + 0.7);
          s.frequency.linearRampToValueAtTime(940 * m, t + 0.95); s.frequency.exponentialRampToValueAtTime(420 * m, t + 1.6);
        }
        a1.type = 'sawtooth'; a2.type = 'square';
        lfo.frequency.value = 23; lg.gain.value = 30; lfo.connect(lg); lg.connect(a1.frequency); lg.connect(a2.frequency);
        b1.type = 'bandpass'; b1.frequency.value = 1150; b1.Q.value = 3; b2.type = 'bandpass'; b2.frequency.value = 2400; b2.Q.value = 4;
        pre.gain.value = 0.6; a1.connect(pre); a2.connect(pre);
        const dist = this.grit ? pre.connect(this.grit) : pre;
        dist.connect(b1).connect(g); dist.connect(b2).connect(g);
        this.env(g, t, 0.22, 0.05, 1.7); g.connect(o);
        for (const s of [a1, a2, lfo]){ s.start(t); s.stop(t + 1.75); } this.count(a1, false);
        this.hiss(t, 1.5, 0.06, 'bandpass', 3000, 1, o, 1800, 0.05);
        this.osc('sine', 62, 45, t, 1.4, 0.2, o, 0.05);
        break;
      }
      // bước chân voi: ình ình rung đất
      case 'step': this.osc('sine', 58, 30, t, 0.45, 0.32, o, 0.004); this.hiss(t, 0.3, 0.12, 'lowpass', 260, 1, o, 90); break;
      case 'stomp': this.osc('sine', 70, 26, t, 0.8, 0.5, o); this.hiss(t, 0.6, 0.3, 'lowpass', 500, 1, o, 80); this.hiss(t, 0.08, 0.12, 'highpass', 1500, 1, o); break;
      case 'slam': this.osc('sine', 120, 45, t, 0.4, 0.24, o); this.hiss(t, 0.25, 0.14, 'lowpass', 900, 1, o); this.metal(t, 600, 0.03, 0.3, o); break;
      case 'roar': this.hiss(t, 1.2, 0.2, 'bandpass', 220, 2, o, 140); this.osc('sawtooth', 85, 60, t, 1.2, 0.07, o, 0.1); break;
      case 'gift': [0, 4, 7, 12].forEach((s, i) => this.osc('triangle', 784 * 2 ** (s / 12), 784 * 2 ** (s / 12), t + i * 0.06, 0.35, 0.06, o)); break;
      case 'spawn': this.osc('sine', 520, 980, t, 0.18, 0.05, o); break;
      case 'boss': { [0, 0.18, 0.36].forEach(d => this.drumFx(t + d, 0.5, 90, o)); [196, 247, 294].forEach(f => this.osc('sawtooth', f, f, t + 0.5, 1.2, 0.05, o, 0.08)); this.gong(t + 0.5, 0.25, o); break; }
      case 'die': this.osc('triangle', 300, 90, t, 0.22, 0.06, o); break;
      case 'kill': this.osc('square', 660, 990, t, 0.12, 0.03, o); break;
      case 'gate': this.hiss(t, 1.2, 0.35, 'lowpass', 1200, 1, o, 150); this.osc('sine', 80, 35, t, 1.0, 0.35, o); for (let i = 0; i < 5; i++) this.osc('square', 200 + R() * 200, 80, t + R() * 0.5, 0.06, 0.04, o); break;
      case 'house': this.hiss(t, 2.4, 0.45, 'lowpass', 1500, 1, o, 100); this.osc('sine', 60, 25, t, 2.0, 0.5, o); break;
      case 'alarm': for (let i = 0; i < 3; i++) this.drumFx(t + i * 0.16, 0.35, 150, o); break;
      case 'beep': this.osc('sine', 880, 880, t, 0.15, 0.08, o); break;
      case 'go': this.osc('sawtooth', 440, 440, t, 0.5, 0.06, o); this.osc('sawtooth', 660, 660, t, 0.5, 0.05, o); this.drumFx(t, 0.5, 100, o); this.gong(t, 0.2, o); break;
      case 'win': [523, 659, 784, 1047, 784, 1047].forEach((f, i) => { this.osc('triangle', f, f, t + i * 0.16, 0.5, 0.08, o); this.osc('sawtooth', f / 2, f / 2, t + i * 0.16, 0.4, 0.025, o); }); [0, 0.32, 0.64, 0.96].forEach(d => this.drumFx(t + d, 0.4, 100, o)); this.gong(t + 0.96, 0.3, o); break;
      case 'lose': [392, 349, 311, 262].forEach((f, i) => this.osc('triangle', f, f * 0.98, t + i * 0.25, 0.6, 0.06, o)); break;
    }
  }
  private drumFx(t: number, v: number, f: number, out: AudioNode){ this.osc('sine', f, f * 0.45, t, 0.45, v, out, 0.003); this.hiss(t, 0.07, v * 0.25, 'bandpass', 800, 1, out); }

  /* ------------------------------------------------------------ nhạc nền */
  private kick(t: number, v: number){ this.osc('sine', 105, 42, t, 0.42, v, this.mus, 0.002); this.hiss(t, 0.05, v * 0.3, 'bandpass', 900, 1, this.mus); }
  private snare(t: number, v: number){ this.osc('triangle', 240, 170, t, 0.1, v * 0.5, this.mus, 0.001); this.hiss(t, 0.14, v, 'bandpass', 2100, 0.9, this.mus); }
  private hat(t: number, v: number){ this.hiss(t, 0.045, v, 'highpass', 7500, 1, this.mus); }
  private gong(t: number, v: number, out: AudioNode = this.mus){ for (const [f, k] of [[98, 1], [147, 0.6], [212, 0.4], [301, 0.25]] as const) this.osc('sine', f, f * 0.985, t, 2.6, v * k, out, 0.008); this.hiss(t, 0.3, v * 0.3, 'bandpass', 600, 1, out); }
  private bass(t: number, f: number, d: number, v: number){
    const c = this.ctx!, o = c.createOscillator(), g = c.createGain(), lp = c.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.value = f; lp.type = 'lowpass'; lp.frequency.setValueAtTime(900, t); lp.frequency.exponentialRampToValueAtTime(220, t + d); lp.Q.value = 4;
    this.env(g, t, v, 0.005, d); o.connect(lp).connect(g).connect(this.mus); o.start(t); o.stop(t + d + 0.05); this.count(o, true);
  }
  // đàn tranh: gảy, tắt nhanh, có luyến nhấn xuống nhẹ
  private pluck(t: number, f: number, v: number){
    const c = this.ctx!, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain();
    o.type = 'triangle'; o2.type = 'sine';
    o.frequency.setValueAtTime(f * 1.03, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.06); o2.frequency.value = f * 2;
    const g2 = c.createGain(); g2.gain.value = 0.35; o2.connect(g2).connect(g);
    this.env(g, t, v, 0.002, 0.9); o.connect(g).connect(this.mus); o.start(t); o2.start(t); o.stop(t + 0.95); o2.stop(t + 0.95); this.count(o, true);
  }
  // sáo trúc: sine + tam giác, vào rung sau một chút, có tiếng hơi
  private flute(t: number, f: number, d: number, v: number){
    const c = this.ctx!, o = c.createOscillator(), o2 = c.createOscillator(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
    o.type = 'sine'; o2.type = 'triangle'; o.frequency.value = f; o2.frequency.value = f;
    lfo.frequency.value = 5.4; lg.gain.setValueAtTime(0, t); lg.gain.linearRampToValueAtTime(f * 0.012, t + Math.min(0.25, d * 0.6));
    lfo.connect(lg); lg.connect(o.frequency); lg.connect(o2.frequency);
    const g2 = c.createGain(); g2.gain.value = 0.3; o2.connect(g2).connect(g);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.04); g.gain.setValueAtTime(v, t + Math.max(0.05, d - 0.06)); g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.08);
    o.connect(g).connect(this.mus);
    for (const s of [o, o2, lfo]){ s.start(t); s.stop(t + d + 0.1); } this.count(o, true);
    this.hiss(t, Math.min(0.12, d), v * 0.5, 'bandpass', f * 2, 2, this.mus);
  }

  // Bộ phát nhạc chạy trước 0.25 giây, mỗi bước là một móc kép
  update(){
    if (!this.ctx) return;
    if (!this.on || !this.music){ this.beatAt = Math.max(this.beatAt, this.ctx.currentTime); return; }
    const I = Math.max(0, Math.min(4, this.intensity)), step = 60 / BPM[I] / 4;
    if (this.beatAt < this.ctx.currentTime - 0.5) this.beatAt = this.ctx.currentTime + 0.05;     // vừa bật lại: không dồn nốt cũ
    while (this.beatAt < this.ctx.currentTime + 0.25){
      if (this.mlive > 48){ this.beatAt += step; this.step++; continue; }
      const t = this.beatAt, s = this.step % 16, bar = Math.floor(this.step / 16), root = ROOTS[bar % 4], p = this.step % 128;
      const phrase = (I >= 2 ? (p < 64 ? PHRASE_A : PHRASE_B) : PHRASE_A), ps = p % 64;
      // sáo: chờ thì chơi thưa và nhẹ, vào trận rõ hơn
      for (const [st, deg, len] of phrase) if (st === ps && (I > 0 || bar % 2 === 0 || st % 4 === 0)) this.flute(t, fq(PENT[deg] + 12), len * step * 0.95, I === 0 ? 0.035 : 0.05);
      // đàn tranh rải hợp âm
      const arp = [0, 7, 12, 7, 14, 12, 7, 12];
      if (I === 0 ? s % 4 === 0 : I === 1 ? s % 2 === 0 : true) this.pluck(t, fq(root + arp[(s >> (I >= 2 ? 0 : 1)) % 8]), I === 0 ? 0.05 : 0.04);
      if (I > 0){
        // trống trận
        const K = I >= 4 ? [1,0,1,0, 1,0,1,1, 1,0,1,0, 1,1,1,1] : I >= 2 ? [1,0,0,0, 1,0,1,0, 1,0,0,1, 1,0,1,0] : [1,0,0,0, 0,0,0,0, 1,0,1,0, 0,0,0,0];
        if (K[s]) this.kick(t, s % 4 === 0 ? 0.36 : 0.24);
        if (s === 4 || s === 12) this.snare(t, I >= 2 ? 0.12 : 0.08);
        if (I >= 3 && (s === 14 || s === 15)) this.snare(t, 0.07);
        if (I >= 2 && s % 2 === 0) this.hat(t, s % 4 === 2 ? 0.05 : 0.025);
        // bass nhịp móc đơn đẩy nhịp
        const B = [1,0,1,0, 1,0,1,1, 1,0,1,0, 1,0,1,1];
        if (B[s]) this.bass(t, fq(root + (s === 6 || s === 14 ? 12 : 0), 73.42), step * 1.6, I >= 2 ? 0.1 : 0.08);
        // chiêng đầu mỗi 2 ô nhịp, quyết chiến thì mỗi ô nhịp
        if (s === 0 && (I >= 3 || (I >= 2 && bar % 2 === 0) || (bar % 4 === 0))) this.gong(t, I >= 3 ? 0.08 : 0.05);
      } else if (s === 0 && bar % 4 === 0) this.gong(t, 0.035);
      this.beatAt += step; this.step++;
    }
  }
}
