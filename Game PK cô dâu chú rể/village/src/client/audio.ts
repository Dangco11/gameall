// Âm thanh tổng hợp bằng WebAudio, không cần file. Mọi nhạc cụ đi qua một phòng vang nhẹ cho tròn tiếng.
// Nhạc nền ngũ cung tự phát: đàn tranh rải nốt, sáo trúc thả giai điệu, đàn bầu luyến trầm; ban đêm nhạc thưa và nhỏ hơn.
// Mỗi kiểu quà một đoạn nhạc riêng; giọng đọc cảm ơn phát từ file server tạo, nhạc tự nhỏ lại khi đang đọc.
const NGU_CUNG = [0, 2, 5, 7, 9];                          // cung Bắc: hò xự xang xê cống
const note = (step: number, base = 523.25) => base * 2 ** ((NGU_CUNG[((step % 5) + 5) % 5] + 12 * Math.floor(step / 5)) / 12);
const PROGRESSION = [0, 3, 4, 2, 0, 3, 1, 4];
// Bài cưới: [phách bắt đầu, bậc ngũ cung, số phách]. 4 câu x 8 phách = 32 phách.
const SONG_PHRASES: [number, number][][] = [
  [[3, 0.5], [4, 0.5], [5, 1], [4, 0.5], [3, 0.5], [2, 1], [3, 0.5], [4, 0.5], [3, 0.5], [2, 0.5], [1, 2]],
  [[3, 0.5], [4, 0.5], [5, 1], [6, 0.5], [5, 0.5], [4, 1], [3, 0.5], [2, 0.5], [1, 0.5], [2, 0.5], [0, 2]],
  [[5, 1], [5, 0.5], [6, 0.5], [7, 1], [6, 1], [5, 0.5], [4, 0.5], [5, 0.5], [6, 0.5], [5, 2]],
  [[4, 1], [4, 0.5], [5, 0.5], [3, 1], [2, 1], [1, 0.5], [2, 0.5], [3, 0.5], [1, 0.5], [0, 2]],
];
const SONG_NOTES: [number, number, number][] = [];
{ let at = 0; for (const ph of SONG_PHRASES) for (const [step, len] of ph){ SONG_NOTES.push([at, step, len]); at += len; } }
const SONG_BEATS = 32;
const SONG_ROOTS = [3, 2, 3, 1, 3, 4, 3, 0, 0, 4, 0, 3, 2, 3, 1, 0];      // bậc gốc từng ô nhịp 2 phách               // bậc gốc từng ô nhịp của nhạc nền

export class Sound {
  on = false;
  music = true;
  mode: 'village' | 'wedding' = 'village';
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private fxBus!: GainNode;       // tiếng hiệu ứng, quà
  private musicBus!: GainNode;    // nhạc nền
  private ambBus!: GainNode;      // chim, dế, mưa
  private reverb!: GainNode;      // gửi vào phòng vang
  private rain: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private nextAmb = 0;
  private voices: { url: string; onPlay?: () => void; onEnd?: () => void; until: number; kind: string }[] = [];
  private speaking = false;
  private lastPop = 0;
  private beatAt = 0;
  private beat = 0;
  private night = 0;
  private melodyStep = 7;

  start(){
    if (!this.ctx){
      const ctx = this.ctx = new AudioContext();
      const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
      this.master = ctx.createGain(); this.master.gain.value = 0.75;
      this.master.connect(comp).connect(ctx.destination);
      // phòng vang: xung tiếng ồn tắt dần 2,4 giây
      const len = Math.floor(ctx.sampleRate * 2.4), ir = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++){ const d = ir.getChannelData(ch); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
      const conv = ctx.createConvolver(); conv.buffer = ir;
      this.reverb = ctx.createGain(); this.reverb.gain.value = 0.35;
      this.reverb.connect(conv).connect(this.master);
      this.fxBus = ctx.createGain(); this.fxBus.connect(this.master); this.fxBus.connect(this.reverb);
      this.musicBus = ctx.createGain(); this.musicBus.gain.value = 0.42; this.musicBus.connect(this.master); this.musicBus.connect(this.reverb);
      this.ambBus = ctx.createGain(); this.ambBus.connect(this.master);
      const nlen = ctx.sampleRate * 2, buf = ctx.createBuffer(1, nlen, ctx.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < nlen; i++) d[i] = Math.random() * 2 - 1;
      this.noise = buf;
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400;
      this.rain = ctx.createGain(); this.rain.gain.value = 0;
      src.connect(lp).connect(this.rain).connect(this.ambBus); src.start();
      this.loadCrowd();
    }
    void this.ctx.resume();
    this.beatAt = this.ctx.currentTime + 0.3;
    this.on = true;
  }
  stop(){ this.on = false; void this.ctx?.suspend(); }
  setMusic(on: boolean){ this.music = on; }
  setMode(m: 'village' | 'wedding'){ this.mode = m; }

  private get ok(){ return this.on && !!this.ctx; }
  private env(g: GainNode, t: number, vol: number, attack: number, dur: number){
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  private osc(type: OscillatorType, freq: number, t: number, dur: number, vol: number, out: AudioNode, attack = 0.005, bend = 0){
    const ctx = this.ctx!, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq * (1 + bend), t); if (bend) o.frequency.exponentialRampToValueAtTime(freq, t + 0.08);
    this.env(g, t, vol, attack, dur);
    o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05);
  }

  /* --------------------------------------------------------- nhạc cụ */
  // Đàn tranh: gảy dây, hơi luyến từ trên xuống nốt
  private zither(freq: number, t: number, vol: number, out: AudioNode){
    this.osc('triangle', freq, t, 1.6, vol, out, 0.004, 0.02);
    this.osc('sine', freq * 2, t, 0.6, vol * 0.3, out, 0.004);
    this.osc('sine', freq * 3, t, 0.25, vol * 0.12, out, 0.003);
  }
  // Sáo trúc: tiếng thổi êm, rung nhẹ, có hơi gió
  private flute(freq: number, t: number, dur: number, vol: number, out: AudioNode){
    const ctx = this.ctx!, o = ctx.createOscillator(), g = ctx.createGain(), vib = ctx.createOscillator(), vg = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(freq * 0.985, t); o.frequency.linearRampToValueAtTime(freq, t + 0.12);
    vib.frequency.value = 5.2; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(freq * 0.012, t + dur * 0.5);
    vib.connect(vg).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.12);
    g.gain.setValueAtTime(vol, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05); vib.start(t); vib.stop(t + dur + 0.05);
    this.osc('sine', freq * 2, t, dur * 0.8, vol * 0.08, out, 0.1);
    if (this.noise){
      const n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), ng = ctx.createGain();
      n.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = freq * 2; f.Q.value = 2;
      this.env(ng, t, vol * 0.15, 0.05, Math.min(dur, 0.6));
      n.connect(f).connect(ng).connect(out); n.start(t); n.stop(t + dur);
    }
  }
  // Đàn bầu: một dây trầm, luyến lên xuống
  private monochord(freq: number, t: number, dur: number, vol: number, out: AudioNode){
    const ctx = this.ctx!, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(freq, t); o.frequency.linearRampToValueAtTime(freq * 1.06, t + dur * 0.4); o.frequency.linearRampToValueAtTime(freq, t + dur * 0.8);
    this.env(g, t, vol, 0.02, dur);
    o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05);
  }
  private bell(freq: number, t: number, vol: number){
    this.osc('sine', freq, t, 1.8, vol, this.fxBus, 0.003);
    this.osc('sine', freq * 2.76, t, 0.4, vol * 0.22, this.fxBus, 0.002);
  }
  private woodAt(t: number, vol: number, freq = 820){ this.osc('sine', freq, t, 0.09, vol, this.fxBus, 0.002); this.osc('triangle', freq * 1.5, t, 0.04, vol * 0.4, this.fxBus, 0.001); }
  private drum(t: number, vol: number){ this.drumOut(t, vol, this.fxBus); }
  private drumOut(t: number, vol: number, out: AudioNode){
    if (!this.noise) return;
    const ctx = this.ctx!, o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(52, t + 0.25);
    this.env(g, t, vol, 0.003, 0.5); o.connect(g).connect(out); o.start(t); o.stop(t + 0.55);
    const n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), ng = ctx.createGain();
    n.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = 900; this.env(ng, t, vol * 0.22, 0.002, 0.08);
    n.connect(f).connect(ng).connect(out); n.start(t); n.stop(t + 0.1);
  }
  private gongAt(t: number, vol: number){
    [[1, 1], [1.48, 0.5], [2.1, 0.3], [2.9, 0.18]].forEach(([r, v]) => this.osc('sine', 98 * r, t, 3.5, vol * v, this.fxBus, 0.01));
  }
  private sparkleAt(t: number, n: number, vol: number){ for (let i = 0; i < n; i++) this.bell(note(10 + Math.floor(Math.random() * 6)), t + i * 0.08 + Math.random() * 0.04, vol); }
  private dropsAt(t: number, n: number){
    for (let i = 0; i < n; i++){
      const s = t + i * 0.14 + Math.random() * 0.05, f = 1200 + Math.random() * 900, o = this.ctx!.createOscillator(), g = this.ctx!.createGain();
      o.frequency.setValueAtTime(f, s); o.frequency.exponentialRampToValueAtTime(f * 1.9, s + 0.06); this.env(g, s, 0.05, 0.002, 0.1);
      o.connect(g).connect(this.fxBus); o.start(s); o.stop(s + 0.12);
    }
  }
  private tune(steps: number[], t: number, gap: number, vol: number, inst: 'zither' | 'flute' = 'zither'){
    steps.forEach((s, i) => inst === 'flute' ? this.flute(note(s), t + i * gap, gap * 1.6, vol, this.fxBus) : this.zither(note(s), t + i * gap, vol, this.fxBus));
  }

  /* ------------------------------------------------------ hiệu ứng */
  private now(d = 0){ return this.ctx!.currentTime + d; }
  pop(){ if (!this.ok) return; const n = performance.now(); if (n - this.lastPop < 120) return; this.lastPop = n; this.woodAt(this.now(), 0.06, 760 + Math.random() * 160); }
  coin(){ if (!this.ok) return; this.zither(note(7), this.now(), 0.08, this.fxBus); this.zither(note(9), this.now(0.09), 0.08, this.fxBus); }
  boom(){ if (!this.ok) return; this.drum(this.now(), 0.14); this.sparkleAt(this.now(0.15), 3, 0.03); }
  welcome(){ if (!this.ok) return; this.tune([4, 5, 7], this.now(), 0.11, 0.07); }
  levelUp(){ if (!this.ok) return; [5, 7, 9, 10].forEach((s, i) => this.bell(note(s), this.now(i * 0.1), 0.07)); this.flute(note(12), this.now(0.45), 0.9, 0.07, this.fxBus); }
  festival(){ if (!this.ok) return; const t = this.now(); this.drum(t, 0.32); this.drum(t + 0.28, 0.3); this.drum(t + 0.5, 0.28); this.gongAt(t + 0.75, 0.22); this.tune([5, 7, 9, 10, 9, 7], t + 1, 0.22, 0.08, 'flute'); }
  // Nhạc sự kiện đám cưới
  wedding(ev: string){
    if (!this.ok) return;
    const t = this.now();
    if (ev === 'bride'){ [7, 9, 10, 12, 14].forEach((s, i) => this.bell(note(s), t + i * 0.12, 0.08)); this.tune([5, 7, 9, 10], t + 0.7, 0.16, 0.1, 'flute'); }
    if (ev === 'groom' || ev === 'end'){ this.drum(t, 0.3); this.drum(t + 0.25, 0.28); this.gongAt(t + 0.5, 0.2); this.tune([0, 2, 4, 5, 7, 9, 10], t + 0.7, 0.14, 0.12); this.sparkleAt(t + 1.8, 8, 0.04); }
    if (ev === 'steal'){ for (let i = 0; i < 10; i++) this.drum(t + i * 0.08, 0.26); this.tune([10, 9, 7, 5], t + 0.9, 0.09, 0.12); this.tune([5, 7, 10, 12, 14], t + 1.3, 0.08, 0.13); this.gongAt(t + 1.8, 0.2); }
    if (ev === 'mung'){ this.zither(note(9), t, 0.08, this.fxBus); this.zither(note(12), t + 0.09, 0.08, this.fxBus); this.bell(note(14), t + 0.2, 0.05); }
  }

  // Nhạc quà: độ rộn ràng theo level 0..4, màu sắc theo kiểu quà
  // Nhạc cho từng màn quà đám cưới
  show(key: string){
    if (!this.ok) return;
    const t = this.now();
    if (key === 'beer' || key === 'food'){ this.bell(note(14), t, 0.07); this.bell(note(17), t + 0.12, 0.07); }      // chuông gọi phục vụ "ting ting"
    if (key === 'toast'){ for (let i = 0; i < 10; i++) this.drum(t + i * 0.09, 0.12 + i * 0.015); this.gongAt(t + 0.95, 0.16); }   // trống dồn gọi cả sân đứng dậy
    if (key === 'heartRain'){ this.sparkleAt(t, 14, 0.05); this.tune([9, 10, 12, 14, 12], t + 0.3, 0.2, 0.1, 'flute'); }
    // múa lân: trống tùng tùng cắc, chiêng điểm nhịp, chừng 14 giây
    if (key === 'lion'){ for (let i = 0; i < 56; i++){ const b = t + i * 0.25; if (i % 4 !== 3) this.drum(b, i % 4 === 0 ? 0.32 : 0.2); else this.woodAt(b, 0.09, 900); if (i % 16 === 0) this.gongAt(b, 0.2); } }
    if (key === 'lantern'){ this.gongAt(t, 0.16); this.tune([0, 2, 4, 7, 9, 7, 4, 2, 4], t + 0.6, 0.55, 0.09, 'flute'); this.sparkleAt(t + 5.5, 8, 0.03); }
    if (key === 'rainbow'){ for (let r = 0; r < 3; r++) [5, 7, 9, 10, 12, 14, 15].forEach((s, i) => this.bell(note(s + r * 2), t + r * 0.9 + i * 0.1, 0.07)); }
    if (key === 'grand'){ this.festival(); for (let i = 0; i < 4; i++) setTimeout(() => this.boom(), 1300 * i); this.tune([12, 14, 15, 17, 15, 14, 12, 14, 17], t + 1.4, 0.3, 0.11, 'flute'); }
  }

  // tiếng ồn qua bộ lọc, có bao âm: dùng cho tiếng nổ, tiếng xì, tiếng lép bép
  private hiss(t: number, dur: number, vol: number, type: BiquadFilterType, freq: number, q = 0.8, attack = 0.002, out: AudioNode = this.fxBus, freqTo = 0){
    const ctx = this.ctx!, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = this.noise; f.type = type; f.frequency.setValueAtTime(freq, t); if (freqTo) f.frequency.exponentialRampToValueAtTime(freqTo, t + dur); f.Q.value = q;
    this.env(g, t, vol, attack, dur); s.connect(f).connect(g).connect(out);
    s.start(t, Math.random() * 1.2); s.stop(t + dur + 0.05);
  }
  // Ống pháo giấy: tiếng "bụp" trầm đục, xì hơi, rồi giấy rơi sột soạt
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
  // Bật nắp chai, rót bia, cụng ly
  beerPop(){
    if (!this.ok || !this.noise) return;
    const t = this.now();
    this.osc('sine', 600, t, 0.06, 0.12, this.fxBus, 0.001, 0.8);
    this.hiss(t, 0.05, 0.1, 'bandpass', 2500, 1.2, 0.001);
    this.hiss(t + 0.12, 0.8, 0.05, 'bandpass', 900, 0.9, 0.05, this.fxBus, 1500);
    this.clink(3, t + 0.9);
  }
  // Đặt đĩa món lên mâm: tiếng sứ va lanh canh
  plate(){
    if (!this.ok) return;
    const t = this.now();
    this.osc('triangle', 2200, t, 0.12, 0.05, this.fxBus, 0.001); this.osc('sine', 3300, t + 0.02, 0.1, 0.03, this.fxBus, 0.001); this.woodAt(t + 0.08, 0.05, 700);
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
  // Pháo hoa: quả pháo xé gió rít lên
  fwLaunch(){
    if (!this.ok || !this.noise) return;
    const t = this.now();
    const o = this.ctx!.createOscillator(), g = this.ctx!.createGain();
    o.frequency.setValueAtTime(800, t); o.frequency.exponentialRampToValueAtTime(2100, t + 1.2);
    this.env(g, t, 0.025, 0.15, 1.3); o.connect(g).connect(this.fxBus); o.start(t); o.stop(t + 1.4);
    this.hiss(t, 1.2, 0.05, 'bandpass', 1200, 2, 0.1, this.fxBus, 3200);
  }
  // Tiếng nổ: đùng trầm vang xa, quả to thì rền hơn; kim tuyến có tràng lách tách sau đó
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

  // Tiếng cả sân hô: các chữ "Một, Hai, Ba, Dô" thu sẵn bằng giọng nam và nữ (máy chủ tạo), chồng 9 lớp lệch cao độ, lệch giờ,
  // lệch trái phải thành tiếng đám đông. Chưa có file (máy chủ chưa tạo xong, mất mạng) thì tự tổng hợp tiếng hô bằng bộ lọc nguyên âm.
  private crowd = new Map<string, { buf: AudioBuffer; start: number }>();
  private crowdTry = 0;
  private loadCrowd(){
    if (!this.ctx || performance.now() - this.crowdTry < 20_000) return;
    this.crowdTry = performance.now();
    for (const w of ['mot', 'hai', 'ba', 'do']) for (const g of ['nam', 'nu']){
      const key = `${w}-${g}`;
      if (this.crowd.has(key)) continue;
      fetch(`/sfx/${key}.mp3`).then(r => r.ok ? r.arrayBuffer() : Promise.reject(new Error(String(r.status)))).then(b => this.ctx!.decodeAudioData(b)).then(buf => {
        // bỏ khoảng lặng đầu file để tiếng hô khớp đúng nhịp
        const d = buf.getChannelData(0); let i = 0; while (i < d.length && Math.abs(d[i]) < 0.02) i++;
        this.crowd.set(key, { buf, start: Math.max(0, i / buf.sampleRate - 0.01) });
      }).catch(() => {});
    }
  }
  shout(word: 'mot' | 'hai' | 'ba' | 'do', vol = 1){
    if (!this.ok) return;
    const ctx = this.ctx!, t = this.now(0.02), out = ctx.createGain();
    out.gain.value = vol; out.connect(this.master); out.connect(this.reverb);
    const nam = this.crowd.get(word + '-nam'), nu = this.crowd.get(word + '-nu');
    if (!nam && !nu){ this.loadCrowd(); this.shoutSynth(word, t, vol, out); return; }
    for (const [clip, n] of [[nam ?? nu!, 6], [nu ?? nam!, 3]] as const) for (let i = 0; i < n; i++){
      const s = ctx.createBufferSource(), g = ctx.createGain(), p = ctx.createStereoPanner();
      s.buffer = clip.buf; s.playbackRate.value = 0.84 + Math.random() * 0.3;
      g.gain.value = (i === 0 ? 0.7 : 0.32 + Math.random() * 0.2); p.pan.value = i === 0 ? 0 : (Math.random() - 0.5) * 1.6;
      s.connect(g).connect(p).connect(out);
      s.start(t + (i === 0 ? 0 : Math.random() * 0.07), clip.start);
    }
    // tiếng ồ của đám đông lót phía dưới
    this.hiss(t, word === 'do' ? 0.7 : 0.3, word === 'do' ? 0.12 * vol : 0.05 * vol, 'bandpass', 700, 0.8, 0.03, out);
  }
  // Tổng hợp tiếng hô khi chưa có file: nhiều giọng răng cưa cao thấp khác nhau qua hai bộ lọc formant của nguyên âm
  private shoutSynth(word: string, t: number, vol: number, out: AudioNode){
    const ctx = this.ctx!, [f1, f2] = word === 'do' || word === 'mot' ? [480, 880] : [780, 1250];
    const dur = word === 'do' ? 0.55 : 0.28;
    this.hiss(t, 0.03, 0.2 * vol, 'bandpass', word === 'ba' ? 900 : 2600, 1, 0.001, out);
    for (let i = 0; i < 12; i++){
      const o = ctx.createOscillator(), a = ctx.createBiquadFilter(), b = ctx.createBiquadFilter(), g = ctx.createGain(), at = t + Math.random() * 0.05, f0 = 105 + Math.random() * 150;
      o.type = 'sawtooth'; o.frequency.setValueAtTime(f0 * 0.9, at); o.frequency.linearRampToValueAtTime(f0 * 1.12, at + dur * 0.4); o.frequency.linearRampToValueAtTime(f0 * 0.85, at + dur);
      a.type = 'bandpass'; a.frequency.value = f1; a.Q.value = 5; b.type = 'bandpass'; b.frequency.value = f2; b.Q.value = 7;
      this.env(g, at, 0.05 * vol, 0.02, dur);
      o.connect(a).connect(g); o.connect(b).connect(g); g.connect(out);
      o.start(at); o.stop(at + dur + 0.1);
    }
  }

  // Nhạc sàn xưa cho màn cả sân cùng nhảy (tự soạn, không dùng bài có bản quyền): disco 124 nhịp một phút,
  // trống bốn phách đều, xèng mở ở phách lẻ, vỗ tay phách 2 và 4, bass nhảy quãng tám, hợp âm đệm chặt, kèn synth chạy giai điệu,
  // mõ cowbell kiểu sàn nhảy thập niên 80. Vòng hợp âm Lam - Rê thứ - Sol - Đô. Nhạc nền tạm nghỉ trong lúc nhảy.
  private holdUntil = 0;
  disco(sec = 15){
    if (!this.ok || !this.noise) return 0;
    const ctx = this.ctx!, t0 = this.now(0.15), bpm = 124, b = 60 / bpm, beats = Math.round(sec / b / 4) * 4;
    this.holdUntil = t0 + beats * b + 0.3;
    const bus = ctx.createGain(); bus.gain.setValueAtTime(0.0001, t0); bus.gain.exponentialRampToValueAtTime(0.85, t0 + 0.4);
    bus.gain.setValueAtTime(0.85, t0 + (beats - 4) * b); bus.gain.exponentialRampToValueAtTime(0.0001, t0 + beats * b + 0.2);
    bus.connect(this.master); const wet = ctx.createGain(); wet.gain.value = 0.25; bus.connect(wet).connect(this.reverb);
    const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12);
    const tone = (type: OscillatorType, f: number, t: number, dur: number, vol: number, lp = 0, detune = 0) => {
      const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.value = f; o.detune.value = detune;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.setValueAtTime(vol, t + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      if (lp){ const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; fl.Q.value = 4; o.connect(fl).connect(g); } else o.connect(g);
      g.connect(bus); o.start(t); o.stop(t + dur + 0.05);
    };
    const noiseHit = (t: number, dur: number, vol: number, type: BiquadFilterType, f: number, q = 0.7) => this.hiss(t, dur, vol, type, f, q, 0.001, bus);
    const CHORDS = [[57, 60, 64], [62, 65, 69], [55, 59, 62], [60, 64, 67]];          // Am Dm G C
    const BASS = [45, 50, 43, 48];
    // giai điệu 2 ô nhịp (8 phách, nửa phách một ô): [phách, nốt, độ dài phách]
    const HOOK: [number, number, number][] = [[0, 76, 0.5], [0.5, 76, 0.5], [1, 74, 0.5], [1.5, 72, 1], [2.5, 69, 0.5], [3, 72, 0.5], [3.5, 74, 0.5],
      [4, 77, 0.5], [4.5, 76, 0.5], [5, 74, 0.5], [5.5, 72, 0.5], [6, 74, 1], [7, 71, 0.5], [7.5, 72, 0.5]];
    // mở màn: tiếng gió vút lên
    this.hiss(t0 - 0.1, 1.2, 0.12, 'bandpass', 400, 2, 0.6, bus, 6000);
    for (let i = 0; i < beats; i++){
      const t = t0 + i * b, bar = Math.floor(i / 4), ch = CHORDS[bar % 4], root = BASS[bar % 4];
      // trống: kick mọi phách, xèng mở giữa phách, vỗ tay phách 2 và 4
      this.osc('sine', 52, t, 0.28, 0.55, bus, 0.002, 1.8);
      noiseHit(t + b / 2, 0.16, 0.09, 'highpass', 7000);
      noiseHit(t + b / 4, 0.03, 0.03, 'highpass', 9000); noiseHit(t + b * 3 / 4, 0.03, 0.03, 'highpass', 9000);
      if (i % 2 === 1){ for (const d of [0, 0.012, 0.024]) noiseHit(t + d, 0.09, 0.14, 'bandpass', 1300, 1.2); }
      // bass nhảy quãng tám theo nốt móc đơn
      tone('sawtooth', mtof(root), t, b * 0.45, 0.17, 700); tone('sawtooth', mtof(root + 12), t + b / 2, b * 0.4, 0.13, 900);
      // hợp âm đệm chặt ở nửa sau phách 2 và 4
      if (i % 2 === 1) for (const n of ch){ tone('square', mtof(n), t + b / 2, b * 0.3, 0.025, 2400, -6); tone('square', mtof(n), t + b / 2, b * 0.3, 0.025, 2400, 6); }
      // mõ cowbell
      if (i % 4 === 3) tone('square', 800, t + b * 0.75, 0.09, 0.03, 3000);
      // giai điệu từ ô nhịp thứ 3, lặp mỗi 2 ô; vòng sau lên một quãng tám cho bốc
      if (bar >= 2){
        const pos = (i - 8) % 8, up = Math.floor((i - 8) / 16) % 2 ? 12 : 0;
        for (const [st, m, len] of HOOK) if (st >= pos && st < pos + 1){
          const at = t + (st - pos) * b;
          tone('square', mtof(m + up), at, len * b * 0.9, 0.05, 3200, -4); tone('sawtooth', mtof(m + up), at, len * b * 0.9, 0.03, 2600, 7);
        }
      }
    }
    return beats * b;
  }

  // PK cướp dâu: tiếng đánh nhau kiểu hoạt hình
  pk(k: string){
    if (!this.ok || !this.noise) return;
    const t = this.now();
    const thud = (at: number, v = 1) => { this.osc('sine', 55, at, 0.18, 0.32 * v, this.fxBus, 0.002, 1.6); this.hiss(at, 0.09, 0.22 * v, 'lowpass', 900, 0.7, 0.001); };
    const slap = (at: number, v = 1) => { this.hiss(at, 0.07, 0.3 * v, 'bandpass', 2200, 0.9, 0.0008); this.osc('triangle', 420, at, 0.05, 0.08 * v, this.fxBus, 0.001); };
    if (k === 'start'){ for (let i = 0; i < 14; i++) this.drum(t + i * 0.07, 0.12 + i * 0.012); this.gongAt(t + 1.0, 0.24); this.tune([5, 7, 10, 12], t + 1.1, 0.12, 0.12); }
    if (k === 'kick'){ this.hiss(t, 0.12, 0.05, 'bandpass', 900, 1, 0.03, this.fxBus, 2600); thud(t + 0.1); this.osc('sine', 700, t + 0.16, 0.25, 0.05, this.fxBus, 0.005, -0.4); }
    if (k === 'dep') slap(t, 1.3);
    if (k === 'chao'){ for (const [fq, v, d] of [[196, 0.22, 1.6], [196 * 2.76, 0.1, 1.1], [196 * 5.4, 0.06, 0.7], [196 * 1.5, 0.08, 1.3]]) this.osc('sine', fq, t, d, v, this.fxBus, 0.001); this.hiss(t, 0.12, 0.25, 'highpass', 2500, 0.6, 0.001); }
    if (k === 'gay'){ this.hiss(t, 0.05, 0.28, 'bandpass', 1300, 1.4, 0.0008); this.woodAt(t, 0.12, 520); }
    if (k === 'tai'){ const o = this.ctx!.createOscillator(), g = this.ctx!.createGain(); o.type = 'triangle'; o.frequency.setValueAtTime(800, t); o.frequency.linearRampToValueAtTime(1500, t + 0.5); o.frequency.linearRampToValueAtTime(1100, t + 0.9); this.env(g, t, 0.06, 0.02, 0.95); o.connect(g).connect(this.fxBus); o.start(t); o.stop(t + 1); }
    if (k === 'hoidong') for (let i = 0; i < 18; i++){ const at = t + Math.random() * 2.5; if (i % 2) thud(at, 0.8); else slap(at, 0.8); }
    if (k === 'win'){ this.drum(t, 0.3); this.gongAt(t + 0.2, 0.22); this.tune([7, 9, 10, 12, 14, 12, 14, 17], t + 0.3, 0.13, 0.12, 'flute'); }
    if (k === 'lose') [0, 1, 2, 3].forEach(i => { const o = this.ctx!.createOscillator(), g = this.ctx!.createGain(), at = t + i * 0.42; o.type = 'sawtooth'; o.frequency.setValueAtTime(260 - i * 22, at); o.frequency.linearRampToValueAtTime(240 - i * 22 - (i === 3 ? 60 : 0), at + (i === 3 ? 0.9 : 0.36)); this.env(g, at, 0.05, 0.03, i === 3 ? 0.95 : 0.38); o.connect(g).connect(this.fxBus); o.start(at); o.stop(at + 1); });   // kèn "oe oe oe" thua cuộc
  }

  // Cả sân vỗ tay: vài trăm tiếng bộp ngắn ngẫu nhiên, to dần rồi nhỏ dần
  applause(sec = 6){
    if (!this.ok || !this.noise) return;
    const ctx = this.ctx!, t0 = this.now(), n = Math.floor(sec * 70);
    for (let i = 0; i < n; i++){
      const u = i / n, t = t0 + u * sec + Math.random() * 0.03, vol = 0.012 + 0.05 * Math.sin(Math.PI * Math.min(1, u * 1.3));
      const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = 1100 + Math.random() * 1900; f.Q.value = 1.2;
      this.env(g, t, vol, 0.001, 0.05); s.connect(f).connect(g).connect(this.fxBus);
      s.start(t, Math.random() * 1.5); s.stop(t + 0.08);
    }
  }
  // Pháo dây: tràng nổ lép bép giòn, xen vài tiếng đùng
  firecrackers(sec = 3.5){
    if (!this.ok || !this.noise) return;
    const ctx = this.ctx!, t0 = this.now(), n = Math.floor(sec * 28);
    for (let i = 0; i < n; i++){
      const t = t0 + Math.random() * sec, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      s.buffer = this.noise; f.type = 'bandpass'; f.frequency.value = 1800 + Math.random() * 2600; f.Q.value = 0.8;
      this.env(g, t, 0.1 + Math.random() * 0.06, 0.0008, 0.035); s.connect(f).connect(g).connect(this.fxBus);
      s.start(t, Math.random() * 1.5); s.stop(t + 0.06);
      if (i % 9 === 0) this.drum(t, 0.18);
    }
  }

  // Đại chiến: trống trận, chiêng, tiếng va chạm
  battle(ev: string, gift?: string){
    if (!this.ok) return;
    const t = this.now();
    if (ev === 'start' || ev === 'phase'){ for (let i = 0; i < 8; i++) this.drum(t + i * 0.16, i % 4 === 0 ? 0.34 : 0.2); this.gongAt(t + 1.4, 0.24); }
    if (ev === 'climax'){ for (let i = 0; i < 20; i++) this.drum(t + i * 0.09, 0.22 + i * 0.006); this.gongAt(t + 1.9, 0.26); }
    if (ev === 'join') this.woodAt(t, 0.07, 980);
    if (ev === 'power') this.coin();
    if (ev === 'drum'){ for (let i = 0; i < 12; i++) this.drum(t + i * 0.2, i % 2 ? 0.16 : 0.3); }
    if (ev === 'shield'){ [9, 12, 14].forEach((s, i) => this.bell(note(s), t + i * 0.07, 0.08)); }
    if (ev === 'attack' || ev === 'blocked'){ const big = gift === 'ngua'; for (let i = 0; i < (big ? 10 : 4); i++) this.woodAt(t + i * 0.07, 0.08, 600 + i * 40); this.drum(t + (big ? 1.1 : 0.8), 0.36); if (ev === 'blocked') this.bell(note(15), t + 0.85, 0.1); }
    if (ev === 'dragon'){ this.tune([0, 2, 4, 5, 7, 9, 10, 12], t, 0.1, 0.11, 'flute'); this.gongAt(t + 0.9, 0.18); }
    if (ev === 'crown') this.levelUp();
    if (ev === 'ultimate'){ this.gongAt(t, 0.3); for (let i = 0; i < 24; i++) this.drum(t + 0.2 + i * 0.07, 0.3); this.boom(); setTimeout(() => this.boom(), 900); this.tune([12, 14, 15, 17], t + 1.9, 0.18, 0.12, 'flute'); }
    if (ev === 'win') this.wedding('end');
    if (ev === 'end') this.wedding('bride');
  }

  gift(level: number, style: string){
    if (!this.ok) return;
    const t = this.now();
    let start = t;
    if (style === 'rain' || style === 'rainbow' || style === 'grand') this.dropsAt(t, level >= 2 ? 8 : 5);
    if (style === 'bricks' || style === 'house'){ for (let i = 0; i < 4; i++) this.woodAt(t + i * 0.16, 0.11, 620); start = t + 0.6; }   // tiếng búa gõ
    if (style === 'outfit' || style === 'outfit2'){ this.tune([7, 9, 7, 10, 9, 12], t, 0.08, 0.08); start = t + 0.5; }                  // láy đàn vui tai
    if (level >= 3 && style !== 'house' && style !== 'bricks'){ this.drum(t, 0.3); this.drum(t + 0.22, 0.26); start = t + 0.45; }
    if (level >= 4){ for (let i = 0; i < 7; i++) this.drum(t + i * Math.max(0.09, 0.24 - i * 0.022), 0.28); this.gongAt(t + 1.2, 0.26); start = t + 1.35; }
    const melodies = [[5, 7], [4, 5, 7], [0, 2, 4, 5, 7, 9], [2, 4, 5, 7, 9, 7, 10], [0, 2, 4, 5, 7, 5, 7, 9, 10]];
    this.tune(melodies[Math.min(4, level)], start, level >= 3 ? 0.14 : 0.12, 0.12);
    if (level >= 1) this.flute(note(melodies[Math.min(4, level)].slice(-1)[0] + 5), start + melodies[Math.min(4, level)].length * 0.13, 1.2, 0.08, this.fxBus);
    if (level >= 2 || style === 'outfit2') this.sparkleAt(start + 0.9, 4 + level * 2, 0.04);
  }

  /* ---------------------------------------------------- nhạc nền */
  // Lên lịch trước 0,6 giây cho đều nhịp; tempo chậm, rải đàn tranh mỗi nửa phách, sáo thả câu dài cách ô nhịp.
  private musicTick(){
    if (!this.music || !this.ctx) return;
    // đang mở nhạc sàn: nhạc nền nghỉ, hết bài thì chơi tiếp
    if (this.ctx.currentTime < this.holdUntil){ this.beatAt = Math.max(this.beatAt, this.holdUntil); this.songAt = Math.max(this.songAt, this.holdUntil); return; }
    if (this.playlist.length) return;                      // đang phát bài hát thật từ thư mục music
    if (this.mode === 'wedding'){ this.weddingSongTick(); return; }
    const ctx = this.ctx, spb = this.night > 0.5 ? 0.62 : 0.5, out = this.musicBus;
    while (this.beatAt < ctx.currentTime + 0.6){
      const t = this.beatAt, bar = Math.floor(this.beat / 8), half = this.beat % 8, root = PROGRESSION[bar % PROGRESSION.length];
      const quiet = this.night > 0.5 ? 0.6 : 1;
      // đàn tranh: rải hợp âm ngũ cung, ban đêm bỏ bớt nốt
      const pattern = [0, 2, 4, 5, 7, 5, 4, 2];
      if (!(this.night > 0.5 && half % 2)) this.zither(note(root + pattern[half], 261.63), t, 0.05 * quiet, out);
      // đàn bầu: nốt trầm đầu ô nhịp
      if (half === 0) this.monochord(note(root, 130.81), t, spb * 6, 0.07 * quiet, out);
      // sáo: câu nhạc ở ô nhịp lẻ, bước nhỏ quanh bậc gốc
      if (bar % 2 === 1 && (half === 0 || half === 3 || half === 6) && Math.random() < 0.85){
        this.melodyStep = Math.max(root + 3, Math.min(root + 9, this.melodyStep + [-2, -1, 1, 2][Math.floor(Math.random() * 4)]));
        this.flute(note(this.melodyStep), t, spb * (half === 6 ? 3.5 : 2.6), 0.06 * quiet, out);
      }
      this.beatAt += spb / 2 * (half % 2 ? 0.92 : 1.08);   // nhịp lơi nhẹ cho mềm
      this.beat++;
    }
  }

  /* ------------------------------------------------- nhạc đám cưới */
  // Bài nhạc cưới tự soạn: ngũ cung, nhịp 2/4 rộn ràng, 4 câu (mở, đáp, cao trào, kết) lặp vòng.
  // Kèn thổi giai điệu, sáo bè, đàn tranh rải, bass "bùm bum", trống "tùng" phách 1, "cắc" phách 2 và nhịp lẻ.
  private songAt = 0; private songBeat = 0;
  private weddingSongTick(){
    const ctx = this.ctx!, bpm = 112, beat = 60 / bpm, out = this.musicBus;
    if (this.songAt < ctx.currentTime) this.songAt = ctx.currentTime + 0.1;
    while (this.songAt < ctx.currentTime + 0.6){
      const t = this.songAt, b = this.songBeat % SONG_BEATS, half = Math.round((this.songBeat % 1) * 2);
      // giai điệu: nốt nào bắt đầu đúng nửa phách này thì thổi
      for (const [start, step, len] of SONG_NOTES) if (Math.abs(start - b) < 0.01){ this.horn(note(step, 523.25), t, len * beat, out); this.flute(note(step + 5, 523.25), t, len * beat * 0.9, 0.018, out); }
      const bar = Math.floor(b / 2), root = SONG_ROOTS[bar % SONG_ROOTS.length];
      if (half === 0 && b % 2 === 0){ this.bass(note(root, 130.81), t, beat * 0.9, out); this.drumOut(t, 0.13, out); }
      if (half === 0 && b % 2 === 1){ this.bass(note(root + 3, 130.81), t, beat * 0.9, out); this.snare(t, out); }
      if (half === 1) this.woodAt(t, 0.035, 1050);
      this.zither(note(root + [0, 2, 4, 2][Math.floor(b * 2) % 4], 261.63), t, 0.035, out);
      this.songAt += beat / 2; this.songBeat += 0.5;
    }
  }
  // Kèn: tiếng đồng sáng, mở dần, hơi rung
  private horn(freq: number, t: number, dur: number, out: AudioNode){
    const ctx = this.ctx!, o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain(), vib = ctx.createOscillator(), vg = ctx.createGain();
    o.type = 'sawtooth'; o.frequency.setValueAtTime(freq * 0.97, t); o.frequency.linearRampToValueAtTime(freq, t + 0.05);
    vib.frequency.value = 5.5; vg.gain.value = freq * 0.006; vib.connect(vg).connect(o.frequency);
    f.type = 'lowpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(900, t); f.frequency.linearRampToValueAtTime(2600, t + 0.08); f.frequency.linearRampToValueAtTime(1500, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.04); g.gain.setValueAtTime(0.06, t + Math.max(0.05, dur * 0.75)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f).connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05); vib.start(t); vib.stop(t + dur + 0.05);
  }
  private bass(freq: number, t: number, dur: number, out: AudioNode){ this.osc('triangle', freq, t, dur, 0.13, out, 0.01); this.osc('sine', freq / 2, t, dur, 0.09, out, 0.01); }
  private snare(t: number, out: AudioNode){
    if (!this.noise) return;
    const ctx = this.ctx!, n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    n.buffer = this.noise; f.type = 'highpass'; f.frequency.value = 1800; this.env(g, t, 0.06, 0.002, 0.12);
    n.connect(f).connect(g).connect(out); n.start(t); n.stop(t + 0.15);
  }

  /* -------------------------------------------- bài hát thật (tùy chọn) */
  // Thả file vào village/music/ là phát lần lượt theo thứ tự ngẫu nhiên, thay cho nhạc tự soạn.
  private playlist: string[] = [];
  private track: HTMLAudioElement | null = null;
  private trackI = 0;
  setPlaylist(urls: string[]){
    this.playlist = [...urls].sort(() => Math.random() - 0.5);
    this.trackI = 0;
    if (this.on && this.music) this.nextTrack();
  }
  private nextTrack(){
    if (!this.playlist.length || !this.ctx) return;
    this.track?.pause();
    const a = new Audio(this.playlist[this.trackI++ % this.playlist.length]);
    a.crossOrigin = 'anonymous';
    this.ctx.createMediaElementSource(a).connect(this.musicBus);
    a.onended = () => this.nextTrack();
    a.onerror = () => setTimeout(() => this.nextTrack(), 2000);
    this.track = a;
    if (this.music) a.play().catch(() => {});
  }
  private syncTrack(){
    if (!this.playlist.length) return;
    if (!this.track) this.nextTrack();
    else if (this.ctx && this.ctx.currentTime < this.holdUntil){ if (!this.track.paused) this.track.pause(); }
    else if (this.on && this.music && this.track.paused) this.track.play().catch(() => {});
    else if ((!this.on || !this.music) && !this.track.paused) this.track.pause();
  }

  // Giọng đọc cảm ơn: phát lần lượt, nhạc nền và tiếng nền nhỏ lại khi đang đọc.
  // onPlay gọi đúng lúc tiếng bắt đầu phát, để phụ đề khớp với giọng. Trả false nếu câu không được phát.
  // maxWaitMs: câu đứng chờ trong hàng quá lâu thì bỏ (bình luận cũ đọc lại không còn hợp)
  // kind 'verse': khổ vè MC đọc lúc chờ cô dâu chú rể; có bình luận ('chat') tới thì ngắt vè đang đọc, bỏ vè đang chờ, đọc bình luận trước
  voice(url: string, onPlay?: () => void, onEnd?: () => void, maxWaitMs = 0, kind = ''){
    if (!this.on) return false;
    if (kind === 'chat'){
      this.voices = this.voices.filter(v => v.kind !== 'verse');
      if (this.current?.kind === 'verse'){ this.current.audio.pause(); this.current.done(); }
    }
    if (this.voices.length >= 6) return false;
    this.voices.push({ url, onPlay, onEnd, until: maxWaitMs ? performance.now() + maxWaitMs : 0, kind });
    this.nextVoice();
    return true;
  }
  private current: { audio: HTMLAudioElement; kind: string; done: () => void } | null = null;
  // nhạc nền nhỏ lại trong ms mili giây (cả sân đang hô)
  hush(ms: number){ this.duck(true); setTimeout(() => { if (!this.speaking) this.duck(false); }, ms); }
  private duck(on: boolean){
    if (!this.ctx) return;
    this.musicBus.gain.setTargetAtTime(on ? 0.12 : 0.42, this.ctx.currentTime, on ? 0.15 : 0.6);
    this.ambBus.gain.setTargetAtTime(on ? 0.3 : 1, this.ctx.currentTime, on ? 0.15 : 0.6);
  }
  private nextVoice(){
    while (this.voices.length && this.voices[0].until && performance.now() > this.voices[0].until) this.voices.shift();
    if (this.speaking || !this.voices.length){ if (!this.speaking) this.duck(false); return; }
    this.speaking = true;
    const v = this.voices.shift()!, a = new Audio(v.url);
    this.duck(true);
    let started = false, finished = false;
    a.onplaying = () => { if (!started){ started = true; v.onPlay?.(); } };
    const done = () => {
      if (finished) return;
      finished = true; this.current = null;
      if (!started){ started = true; v.onPlay?.(); }
      v.onEnd?.(); this.speaking = false; if (!this.voices.length) this.duck(false); setTimeout(() => this.nextVoice(), 250);
    };
    this.current = { audio: a, kind: v.kind, done };
    a.onended = done; a.onerror = done;
    a.play().catch(done);
  }

  ambience(dt: number, night: number, raining: boolean){
    if (!this.ok) return;
    this.night = night;
    this.musicTick();
    this.syncTrack();
    if (this.rain) this.rain.gain.value += ((raining ? 0.1 : 0) - this.rain.gain.value) * Math.min(1, dt);
    this.nextAmb -= dt;
    if (this.nextAmb > 0) return;
    this.nextAmb = 1.4 + Math.random() * 3;
    const ctx = this.ctx!;
    const chirp = (f: number, d: number, v: number, r: number) => { const t = ctx.currentTime + d, o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * r, t + 0.1); this.env(g, t, v, 0.01, 0.12); o.connect(g).connect(this.ambBus); o.start(t); o.stop(t + 0.15); };
    if (night > 0.5) for (let i = 0; i < 3; i++) chirp(4300, i * 0.06, 0.01, 1);
    else if (!raining){ const f = 2400 + Math.random() * 1200; chirp(f, 0, 0.016, 1.25); chirp(f * 1.15, 0.15, 0.013, 0.9); }
  }
}
