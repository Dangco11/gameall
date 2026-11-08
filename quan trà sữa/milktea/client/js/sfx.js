// Âm thanh của quán, tổng hợp hết bằng WebAudio nên không có tệp nhạc nào và không lo bản quyền:
//   nhạc nền lo-fi (đàn điện, bass, trống nhẹ, tiếng đĩa than), tiếng nền quán (ồn nhẹ, ly va leng keng),
//   tiếng hiệu ứng (chuông cửa, rót trà, lắc bình, trân châu, máy dập nắp, hút trà sữa, xu, vỗ tay, kèn tiệc, pháo hoa),
//   và giọng tiếp viên do server tạo. Khi giọng đọc, nhạc tự nhỏ lại.
// Trình duyệt chặn tự phát tiếng tới lần bấm đầu tiên, trừ khi mở bằng mo-tra-sua.cmd (đã bật cờ cho phép tự phát).

const midi = n => 440 * Math.pow(2, (n - 69) / 12);
// Fmaj7, Em7, Dm7, Cmaj7: vòng hòa âm lo-fi quen thuộc
const CHORDS = [[53, 57, 60, 64], [52, 55, 59, 62], [50, 53, 57, 60], [48, 52, 55, 59]];
const BPM = 78, STEP = 60 / BPM / 4;

export class Sfx {
  constructor() {
    this.ctx = null;
    this.settings = { music: true, ambience: true, voiceVol: 100, musicVol: 45, sfxVol: 70 };
    this.voiceQueue = []; this.voicePlaying = false;
    this.guests = 0; this.last = {};
    this.onState = () => {};
  }

  /* ------------------------------------------------------------ khởi tạo */
  unlock() {
    if (!this.ctx) {
      try { this.ctx = new AudioContext(); } catch { return; }
      const c = this.ctx;
      this.master = c.createDynamicsCompressor();
      this.master.threshold.value = -14; this.master.ratio.value = 3;
      this.master.connect(c.destination);
      this.bus = {};
      for (const name of ['music', 'sfx', 'voice', 'amb']) { this.bus[name] = c.createGain(); this.bus[name].connect(this.master); }
      this.duck = c.createGain(); this.duck.connect(this.bus.music);   // nhạc đi qua nút này để nhỏ lại khi có giọng
      this.noise = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
      const d = this.noise.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      this.applyVolumes();
      this.nextStep = 0; this.step = 0;
      this.scheduler = setInterval(() => this.schedule(), 50);
      this.startAmbience();
      c.onstatechange = () => this.onState(c.state);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
  }
  get running() { return this.ctx?.state === 'running'; }

  apply(settings) { Object.assign(this.settings, settings || {}); this.applyVolumes(); }
  applyVolumes() {
    if (!this.ctx) return;
    const s = this.settings, t = this.ctx.currentTime;
    this.bus.music.gain.setTargetAtTime(s.music ? (s.musicVol / 100) * .55 : 0, t, .3);
    this.bus.amb.gain.setTargetAtTime(s.ambience ? (s.sfxVol / 100) * .5 : 0, t, .3);
    this.bus.sfx.gain.setTargetAtTime((s.sfxVol / 100) * .9, t, .05);
    this.bus.voice.gain.setTargetAtTime((s.voiceVol / 100) * 1.1, t, .05);
  }

  /* ------------------------------------------------------------ khối dựng tiếng */
  osc(type, freq, at, dur, { gain = .3, attack = .005, bus = 'sfx', slide = 0, filter = 0, detune = 0 } = {}) {
    const c = this.ctx, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, at); o.detune.value = detune;
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), at + dur);
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(gain, at + attack); g.gain.exponentialRampToValueAtTime(.0001, at + dur);
    let node = o;
    if (filter) { const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = filter; o.connect(f); node = f; }
    node.connect(g).connect(bus === 'music' ? this.duck : this.bus[bus]);
    o.start(at); o.stop(at + dur + .05);
  }
  hiss(at, dur, { gain = .2, type = 'bandpass', freq = 2000, q = 1, to = 0, bus = 'sfx', attack = .005 } = {}) {
    const c = this.ctx, src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = this.noise; src.loop = true;
    f.type = type; f.frequency.setValueAtTime(freq, at); f.Q.value = q;
    if (to) f.frequency.exponentialRampToValueAtTime(to, at + dur);
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(gain, at + attack); g.gain.exponentialRampToValueAtTime(.0001, at + dur);
    src.connect(f).connect(g).connect(bus === 'music' ? this.duck : this.bus[bus]);
    src.start(at, Math.random()); src.stop(at + dur + .05);
  }
  bell(freq, at, dur = 1.2, gain = .22, bus = 'sfx') {
    for (const [mul, g] of [[1, 1], [2.76, .35], [5.4, .12]]) this.osc('sine', freq * mul, at, dur / mul ** .3, { gain: gain * g, bus });
  }

  /* ------------------------------------------------------------ nhạc nền lo-fi */
  schedule() {
    const c = this.ctx;
    if (!c || c.state !== 'running') return;
    if (this.nextStep < c.currentTime) this.nextStep = c.currentTime + .05;
    while (this.nextStep < c.currentTime + .2) {
      if (this.settings.music) this.playStep(this.step, this.nextStep + (this.step % 2 ? STEP * .14 : 0));   // nhịp swing
      this.nextStep += STEP;
      this.step = (this.step + 1) % 64;
    }
  }
  playStep(step, t) {
    const chord = CHORDS[Math.floor(step / 16)], s = step % 16;
    if (s === 0 || s === 10) chord.forEach((n, i) => {                               // đàn điện rải nhẹ
      this.osc('sine', midi(n), t + i * .025, 2.2, { gain: .07, attack: .02, bus: 'music' });
      this.osc('triangle', midi(n + 12), t + i * .025, .9, { gain: .018, attack: .01, bus: 'music', filter: 1800 });
    });
    if (s === 0 || s === 6 || s === 10) this.osc('sine', midi(chord[0] - 12), t, .5, { gain: .2, attack: .01, bus: 'music', filter: 400 });
    if (s === 0 || s === 7 || s === 10) this.osc('sine', 110, t, .28, { gain: .32, slide: .35, bus: 'music' });      // trống cái
    if (s === 4 || s === 12) { this.hiss(t, .18, { gain: .09, freq: 1900, q: .8, bus: 'music' }); this.osc('triangle', 190, t, .1, { gain: .05, bus: 'music' }); }
    if (s % 2 === 0) this.hiss(t, .04, { gain: s % 4 ? .018 : .03, type: 'highpass', freq: 7000, bus: 'music' });
    if (Math.random() < .14 && s % 2 === 0) {                                          // giai điệu chuông nhỏ ngẫu nhiên trong hợp âm
      const note = chord[Math.floor(Math.random() * 4)] + 24;
      this.bell(midi(note), t, 1.1, .035, 'music');
    }
    if (Math.random() < .25) this.hiss(t, .02, { gain: .02, type: 'highpass', freq: 3000, bus: 'music' });   // tiếng lách tách đĩa than
  }

  /* ------------------------------------------------------------ tiếng nền quán */
  startAmbience() {
    const c = this.ctx, src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = this.noise; src.loop = true;
    f.type = 'lowpass'; f.frequency.value = 500;
    g.gain.value = .05;
    src.connect(f).connect(g).connect(this.bus.amb); src.start();
    this.roomGain = g;
    const clink = () => {
      if (this.running && this.guests > 0) {
        const t = this.ctx.currentTime, base = 2400 + Math.random() * 1600;
        this.osc('sine', base, t, .35, { gain: .05, bus: 'amb' }); this.osc('sine', base * 1.51, t + .01, .25, { gain: .03, bus: 'amb' });
        if (Math.random() < .3) this.hiss(t + .2, .25, { gain: .04, freq: 900, q: 3, bus: 'amb' });   // tiếng ghế, tiếng ly đặt xuống
      }
      setTimeout(clink, 2500 + Math.random() * 6000);
    };
    setTimeout(clink, 3000);
  }
  // Quán càng đông tiếng ồn nền càng dày
  setCrowd(n) {
    this.guests = n;
    if (this.roomGain) this.roomGain.gain.setTargetAtTime(.03 + Math.min(1, n / 40) * .09, this.ctx.currentTime, 1.5);
  }

  /* ------------------------------------------------------------ hiệu ứng */
  throttle(name, ms) { const now = performance.now(); if (now - (this.last[name] || 0) < ms) return false; this.last[name] = now; return true; }

  play(name, opts = {}) {
    if (!this.ctx) this.unlock();
    if (!this.running) return;
    const t = this.ctx.currentTime;
    switch (name) {
      case 'door':     // chuông cửa ding dong
        if (!this.throttle('door', 1200)) return;
        this.bell(1319, t, 1.3, .16); this.bell(1047, t + .28, 1.6, .16); break;
      case 'pour': this.hiss(t, 1.1, { gain: .12, freq: 700, to: 1500, q: 2.5, attack: .08 }); break;
      case 'shake':
        for (let i = 0; i < 10; i++) this.hiss(t + i * .085, .07, { gain: .16, freq: 5200, q: 1.5 });
        for (let i = 0; i < 5; i++) this.osc('sine', 2200 + Math.random() * 900, t + i * .17 + .03, .08, { gain: .04 });   // đá va trong bình
        break;
      case 'pearls': for (let i = 0; i < 8; i++) this.osc('sine', 500 + Math.random() * 300, t + i * .06 + Math.random() * .03, .07, { gain: .09, slide: 1.8 }); break;
      case 'seal':     // máy dập nắp: tiếng thụp và xì hơi
        this.osc('sine', 95, t, .25, { gain: .35, slide: .5 }); this.hiss(t + .05, .35, { gain: .1, type: 'highpass', freq: 3500 }); break;
      case 'ding': this.bell(1760, t, .8, .14); break;
      case 'serve': [784, 988, 1319].forEach((f, i) => this.osc('triangle', f, t + i * .07, .4, { gain: .12 })); break;
      case 'slurp':
        for (let i = 0; i < 3; i++) this.hiss(t + i * .16, .14, { gain: .1, freq: 900, to: 2400, q: 4, attack: .02 });
        break;
      case 'clink': this.osc('sine', 3100, t, .4, { gain: .1 }); this.osc('sine', 4700, t + .005, .3, { gain: .06 }); break;
      case 'coin': {
        if (!this.throttle('coin', 120)) return;
        const big = opts.coins >= 100;
        this.osc('square', 988, t, .09, { gain: .07, filter: 4000 }); this.osc('square', 1319, t + .08, big ? .5 : .3, { gain: .07, filter: 4000 });
        if (big) for (let i = 0; i < 6; i++) this.bell(2000 + i * 250, t + .15 + i * .05, .4, .05);
        break;
      }
      case 'pop': if (this.throttle('pop', 150)) this.osc('sine', 520, t, .12, { gain: .12, slide: 1.9 }); break;
      case 'level':
        [523, 659, 784, 1047, 1319].forEach((f, i) => { this.osc('sawtooth', f, t + i * .09, .35, { gain: .05, filter: 2600 }); this.osc('triangle', f, t + i * .09, .4, { gain: .07 }); });
        this.bell(2093, t + .5, 1.4, .1);
        break;
      case 'applause': this.applause(opts.seconds || 2.5, opts.size || 1); break;
      case 'horn':     // kèn tiệc
        this.osc('sawtooth', 440, t, .7, { gain: .08, filter: 2200, slide: 1.06 }); this.osc('sawtooth', 554, t + .02, .7, { gain: .06, filter: 2200, slide: 1.06 });
        break;
      case 'firework':
        this.osc('sine', 600, t, .6, { gain: .05, slide: 3 });                           // tiếng rít bay lên
        this.hiss(t + .6, .8, { gain: .35, type: 'lowpass', freq: 900, attack: .002 });   // nổ
        for (let i = 0; i < 10; i++) this.hiss(t + .75 + Math.random() * .8, .05, { gain: .08, type: 'highpass', freq: 4000 });   // lách tách
        break;
      case 'party':
        this.play('horn'); this.applause(4, 1.6);
        [523, 659, 784, 1047, 784, 1047, 1319, 1568].forEach((f, i) => this.osc('triangle', f, t + .3 + i * .12, .3, { gain: .09 }));
        break;
    }
  }
  applause(seconds, size) {
    const t = this.ctx.currentTime, claps = Math.round(seconds * 26 * size);
    for (let i = 0; i < claps; i++) {
      const at = t + Math.random() * seconds * (Math.random() < .7 ? .6 : 1);
      this.hiss(at, .045, { gain: .05 + Math.random() * .08, freq: 1200 + Math.random() * 1600, q: 1.2, attack: .001 });
    }
  }

  /* ------------------------------------------------------------ giọng tiếp viên */
  speak(url) {
    this.voiceQueue.push(url);
    if (this.voiceQueue.length > 6) this.voiceQueue.shift();
    this.nextVoice();
  }
  nextVoice() {
    if (this.voicePlaying || !this.voiceQueue.length) return;
    if (!this.ctx) this.unlock();
    const url = this.voiceQueue.shift(), el = new Audio(url);
    this.voicePlaying = true;
    if (this.ctx) {
      try { this.ctx.createMediaElementSource(el).connect(this.bus.voice); } catch {}
      this.duck.gain.setTargetAtTime(.3, this.ctx.currentTime, .15);
    }
    const done = () => {
      if (!this.voicePlaying) return;
      this.voicePlaying = false;
      if (this.ctx) this.duck.gain.setTargetAtTime(1, this.ctx.currentTime, .6);
      setTimeout(() => this.nextVoice(), 250);
    };
    el.onended = done; el.onerror = done;
    el.play().catch(done);
  }
}
