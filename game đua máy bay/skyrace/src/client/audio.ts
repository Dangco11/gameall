// Âm thanh hiệu ứng: file thật CC0 trong public/sfx/ (nổ bom, tăng tốc, động cơ, tên lửa, khiên, sét...),
// thiếu file thì tự tổng hợp bằng WebAudio.
// Giọng bình luận viên là file mp3 server tạo; nhạc nền lấy từ thư mục music/ nếu có.
export class Sound {
  ctx: AudioContext | null = null;
  private master!: GainNode; private sfx!: GainNode; private musicGain!: GainNode;
  private engine: { g: GainNode; f: BiquadFilterNode; o: OscillatorNode } | null = null;
  private noise!: AudioBuffer;
  muted = false;
  private voices: { a: HTMLAudioElement; at: number }[] = [];
  private speaking = false;
  private music: HTMLAudioElement | null = null;
  private playlist: string[] = []; private track = 0;
  musicOn = true;

  unlock(){
    if (this.ctx){ if (this.ctx.state === 'suspended') void this.ctx.resume(); return; }
    const ctx = new AudioContext(); this.ctx = ctx;
    this.master = ctx.createGain(); this.master.gain.value = this.muted ? 0 : 0.9; this.master.connect(ctx.destination);
    // bộ nén: nhiều tiếng nổ chồng nhau vẫn chắc, không bị rè
    const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -14; comp.knee.value = 8; comp.ratio.value = 4; comp.attack.value = 0.004; comp.release.value = 0.2;
    comp.connect(this.master);
    this.sfx = ctx.createGain(); this.sfx.gain.value = 0.75; this.sfx.connect(comp);
    this.musicGain = ctx.createGain(); this.musicGain.gain.value = 0.35; this.musicGain.connect(this.master);
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noise = buf;
    // động cơ: tiếng ù trầm + tiếng gió lọc thông thấp, to nhỏ theo tốc độ máy bay đang quay
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 70;
    const n = ctx.createBufferSource(); n.buffer = buf; n.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 500;
    const g = ctx.createGain(); g.gain.value = 0;
    const og = ctx.createGain(); og.gain.value = 0.12;
    o.connect(og).connect(f); n.connect(f); f.connect(g).connect(this.sfx);
    o.start(); n.start();
    this.engine = { g, f, o };
    void this.loadMusic();
    void this.loadSfx();
  }
  get ready(){ return !!this.ctx && this.ctx.state === 'running'; }
  setMuted(m: boolean){ this.muted = m; if (this.master) this.master.gain.value = m ? 0 : 0.9; if (this.music) this.music.muted = m; }

  // speed: m/s của máy bay đang quay
  engineAt(speed: number, on: boolean){
    if (!this.engine || !this.ctx) return;
    const t = this.ctx.currentTime, k = Math.min(1, speed / 160);
    // có tiếng động cơ thật thì tiếng tổng hợp chỉ lót nhẹ bên dưới
    const synth = this.engineLoop ? 0.35 : 1;
    this.engine.g.gain.setTargetAtTime(on ? (0.08 + k * 0.16) * synth : 0, t, 0.3);
    if (this.engineLoop){ this.engineLoop.g.gain.setTargetAtTime(on ? 0.12 + k * 0.3 : 0, t, 0.3); this.engineLoop.s.playbackRate.setTargetAtTime(0.75 + k * 0.9, t, 0.4); }
    this.engine.f.frequency.setTargetAtTime(300 + k * 1600, t, 0.2);
    this.engine.o.frequency.setTargetAtTime(55 + k * 90, t, 0.3);
  }

  private env(node: AudioNode, a: number, peak: number, dur: number){
    const g = this.ctx!.createGain(), t = this.ctx!.currentTime;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    node.connect(g).connect(this.sfx);
    return g;
  }
  private tone(type: OscillatorType, f0: number, f1: number, dur: number, vol = 0.3, delay = 0){
    if (!this.ctx) return;
    const o = this.ctx.createOscillator(), t = this.ctx.currentTime + delay;
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = this.ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.sfx); o.start(t); o.stop(t + dur + 0.05);
  }
  private hiss(dur: number, f0: number, f1: number, vol = 0.4, q = 1, type: BiquadFilterType = 'bandpass'){
    if (!this.ctx) return;
    const s = this.ctx.createBufferSource(); s.buffer = this.noise;
    const f = this.ctx.createBiquadFilter(), t = this.ctx.currentTime; f.type = type; f.Q.value = q;
    f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    s.connect(f); this.env(f, 0.02, vol, dur); s.start(); s.stop(t + dur + 0.05);
  }

  /* ------------------------------------------- hiệu ứng âm thanh thật (CC0) */
  // File trong public/sfx/ (nguồn và giấy phép: public/sfx/NGUON-AM-THANH.txt). Nạp một lần lúc bật tiếng.
  // Thiếu file hay đọc lỗi thì tự dùng lại tiếng tổng hợp bên dưới.
  private buf = new Map<string, AudioBuffer>();
  private static FILES = ['bomb-low', 'bomb-crack', 'boom-0', 'boom-1', 'boom-2', 'boom-3', 'boom-4', 'launch', 'boost',
    'thrust-0', 'thrust-1', 'thrust-2', 'thrust-3', 'thrust-4', 'engine-loop', 'shield', 'zap', 'warp', 'coin', 'coin-big', 'go', 'ring'];
  private async loadSfx(){
    await Promise.all(Sound.FILES.map(async n => {
      try { const r = await fetch(`/sfx/${n}.ogg`); if (r.ok) this.buf.set(n, await this.ctx!.decodeAudioData(await r.arrayBuffer())); }
      catch { /* dùng tiếng tổng hợp */ }
    }));
    this.engineSample();
  }
  private last = new Map<string, number>();
  // phát một file: vol âm lượng, rate cao độ (hơi ngẫu nhiên mỗi lần cho đỡ nhàm), dur cắt ngắn + mờ dần, gap chống dồn tiếng
  private play(name: string, o: { vol?: number; rate?: number; dur?: number; gap?: number; delay?: number } = {}){
    const b = this.buf.get(name);
    if (!b || !this.ctx) return false;
    const now = this.ctx.currentTime, t = now + (o.delay ?? 0);
    if (o.gap && now - (this.last.get(name) ?? -9) < o.gap) return true;
    this.last.set(name, now);
    const s = this.ctx.createBufferSource(); s.buffer = b;
    s.playbackRate.value = (o.rate ?? 1) * (0.94 + Math.random() * 0.12);
    const g = this.ctx.createGain(); g.gain.value = o.vol ?? 1;
    s.connect(g).connect(this.sfx);
    const dur = Math.min(o.dur ?? b.duration, b.duration);
    if (o.dur && o.dur < b.duration){ g.gain.setValueAtTime(o.vol ?? 1, t + dur * 0.6); g.gain.linearRampToValueAtTime(0.0001, t + dur); }
    s.start(t, 0, dur + 0.05);
    return true;
  }
  private any(prefix: string, n: number){ return `${prefix}-${Math.floor(Math.random() * n)}`; }
  // tiếng động cơ thật chạy vòng, cao độ và âm lượng theo tốc độ máy bay đang quay
  private engineLoop: { s: AudioBufferSourceNode; g: GainNode } | null = null;
  private engineSample(){
    const b = this.buf.get('engine-loop');
    if (!b || !this.ctx) return;
    const s = this.ctx.createBufferSource(); s.buffer = b; s.loop = true;
    const g = this.ctx.createGain(); g.gain.value = 0;
    s.connect(g).connect(this.sfx); s.start();
    this.engineLoop = { s, g };
  }

  boost(){ if (!this.play('boost', { vol: 0.8, gap: 0.12 })) this.hiss(0.7, 400, 3000, 0.35, 2); this.play(this.any('thrust', 5), { vol: 0.35, dur: 0.9, rate: 1.15, gap: 0.3 }); }
  nitro(){ if (!this.play(this.any('thrust', 5), { vol: 0.9, dur: 1.8, gap: 0.25 })){ this.hiss(1.1, 200, 4000, 0.5, 1.5); this.tone('sawtooth', 90, 260, 0.9, 0.12); } this.play('boost', { vol: 0.6, rate: 0.8 }); }
  shield(){ if (!this.play('shield', { vol: 0.7, gap: 0.15 })){ this.tone('sine', 520, 1040, 0.4, 0.2); this.tone('sine', 780, 1560, 0.5, 0.12, 0.08); } }
  launch(){ if (!this.play('launch', { vol: 0.85, dur: 1.6, gap: 0.15 })){ this.hiss(0.9, 1500, 300, 0.35, 3); this.tone('square', 900, 200, 0.5, 0.05); } }
  boom(big = false){
    if (!this.ctx) return;
    // bom tấn: tiếng nổ trầm rền + tiếng nổ giòn chồng lên; nổ thường: một trong 5 tiếng nổ
    const ok = big ? this.play('bomb-low', { vol: 1.0, gap: 0.2 }) && (this.play('bomb-crack', { vol: 0.8 }), this.play(this.any('boom', 5), { vol: 0.5, rate: 0.8, delay: 0.05 }), true)
      : this.play(this.any('boom', 5), { vol: 0.75, gap: 0.08 });
    if (ok) return;
    this.hiss(big ? 1.8 : 1.0, big ? 900 : 1400, 60, big ? 0.9 : 0.6, 0.7, 'lowpass');
    this.tone('sine', big ? 90 : 120, 30, big ? 1.2 : 0.6, big ? 0.6 : 0.4);
  }
  zap(){ if (!this.play('zap', { vol: 0.8, gap: 0.1 })){ this.hiss(0.35, 6000, 1500, 0.5, 4, 'highpass'); this.tone('square', 1800, 300, 0.3, 0.08); } }
  warp(){ if (!this.play('warp', { vol: 0.8 })){ this.tone('sine', 200, 1600, 0.6, 0.25); this.tone('triangle', 1600, 200, 0.6, 0.15, 0.3); } }
  coin(big = false){ if (!this.play(big ? 'coin-big' : 'coin', { vol: 0.7, gap: 0.06 })){ this.tone('square', 988, 988, 0.08, 0.08); this.tone('square', 1319, 1319, 0.25, 0.08, 0.08); } }
  beep(go = false){ if (go && this.play('go', { vol: 0.9 })) return; this.tone('square', go ? 880 : 440, go ? 880 : 440, go ? 0.6 : 0.25, 0.15); }
  fanfare(){ [523, 659, 784, 1047].forEach((f, i) => this.tone('square', f, f, i === 3 ? 0.8 : 0.18, 0.1, i * 0.15)); this.play('coin-big', { vol: 0.6, delay: 0.45 }); }
  lap(){ if (!this.play('ring', { vol: 0.7, gap: 0.1 })){ this.tone('triangle', 660, 660, 0.12, 0.15); this.tone('triangle', 990, 990, 0.3, 0.15, 0.12); } }

  // Giọng bình luận: đọc lần lượt, nhạc nền nhỏ lại khi đang đọc.
  // Chỉ giữ 3 câu chờ, câu nào chờ quá 7 giây thì bỏ: tiếng luôn đi sát lúc tặng quà, không đọc chuyện đã qua.
  // File tiếng được tải sẵn ngay lúc nhận để khi tới lượt là phát liền.
  voice(url: string){
    const a = new Audio(url); a.preload = 'auto'; a.muted = this.muted;
    this.voices.push({ a, at: performance.now() });
    while (this.voices.length > 3) this.voices.shift();
    this.nextVoice();
  }
  private nextVoice(){
    if (this.speaking || !this.ctx) return;
    while (this.voices.length && performance.now() - this.voices[0].at > 7000) this.voices.shift();
    if (!this.voices.length){ this.duck(false); return; }
    const a = this.voices.shift()!.a; a.muted = this.muted;
    this.speaking = true; this.duck(true);
    const done = () => { this.speaking = false; if (!this.voices.length) this.duck(false); setTimeout(() => this.nextVoice(), 60); };
    a.onended = done; a.onerror = done;
    a.play().catch(done);
  }
  private duck(on: boolean){ if (this.musicGain && this.ctx) this.musicGain.gain.setTargetAtTime(on ? 0.12 : 0.35, this.ctx.currentTime, 0.3); }

  /* ------------------------------------------------------------- nhạc nền */
  // Nhạc theo giai đoạn (public/bgm/, CC0 – xem public/bgm/NGUON-NHAC.txt):
  //   lobby: chuẩn bị, đếm ngược · race: đang đua (2 bài luân phiên) · final: chặng cuối · result: vinh danh vô địch
  // Nhạc riêng trong skyrace/music/ (nếu có) được dùng thay cho nhạc lúc đang đua. Đổi giai đoạn thì nhạc chuyển êm.
  private bgm: Record<MusicScene, string[]> = { lobby: ['/bgm/lobby.ogg'], race: ['/bgm/race-1.ogg', '/bgm/race-2.ogg'], final: ['/bgm/final.ogg'], result: ['/bgm/victory.ogg'] };
  private scene: MusicScene | '' = '';
  private want: MusicScene | '' = '';
  private ch: { a: HTMLAudioElement; g: GainNode; scene: MusicScene } | null = null;
  private idx: Record<MusicScene, number> = { lobby: 0, race: 0, final: 0, result: 0 };
  private async loadMusic(){
    try { const mine: string[] = await (await fetch('/music/list.json')).json(); if (mine.length){ this.playlist = mine; this.bgm.race = mine; } } catch { /* chỉ dùng nhạc có sẵn */ }
    if (this.want) this.setScene(this.want, true);
  }
  // gọi mỗi khung hình; chỉ đổi khi giai đoạn thay đổi
  setScene(s: MusicScene, force = false){
    this.want = s;
    if (!this.ctx || (!force && s === this.scene)) return;
    this.scene = s;
    if (this.musicOn) this.startTrack(s);
  }
  private startTrack(s: MusicScene){
    if (!this.ctx) return;
    const list = this.bgm[s];
    if (!list.length) return;
    const t = this.ctx.currentTime, old = this.ch;
    // bài cũ nhỏ dần trong 1,5 giây rồi dừng
    if (old){ old.g.gain.cancelScheduledValues(t); old.g.gain.setValueAtTime(old.g.gain.value, t); old.g.gain.linearRampToValueAtTime(0.0001, t + 1.5); setTimeout(() => { old.a.pause(); old.a.src = ''; }, 1700); }
    const url = list[this.idx[s]++ % list.length], a = new Audio(url);
    a.muted = this.muted; a.loop = list.length === 1;
    const g = this.ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(1, t + (old ? 1.2 : 0.6));
    this.ctx.createMediaElementSource(a).connect(g).connect(this.musicGain);
    a.onended = () => { if (this.ch?.a === a && this.musicOn) this.startTrack(s); };    // hết bài thì sang bài kế trong giai đoạn
    a.onerror = () => { if (this.ch?.a === a) setTimeout(() => this.ch?.a === a && this.startTrack(s), 3000); };
    a.play().catch(() => {});
    this.ch = { a, g, scene: s };
    this.music = a;
  }
  toggleMusic(){
    this.musicOn = !this.musicOn;
    if (!this.musicOn){ this.ch?.a.pause(); this.ch = null; this.music = null; }
    else if (this.scene) this.startTrack(this.scene);
    return this.musicOn;
  }
  get hasMusic(){ return true; }
}
export type MusicScene = 'lobby' | 'race' | 'final' | 'result';
