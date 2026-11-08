import * as THREE from 'three';
import { isVipTier, templateOf, tierOf } from '../../shared/print.ts';
import type { PrintJob, PrintPhase, PrintState } from '../../shared/types.ts';
import { LAYERS, artData, avatarImage, renderFlat, renderLayer } from './art.ts';
import type { ArtData } from './art.ts';
import { Gallery } from './gallery.ts';
import { StudioFx } from './fx.ts';
import { EJECT_ADV, PLATEN_Y, PLATEN_Z0, PRIME_ADV, PaperMesh, SHEET, SLIDE_ADV, S_CUT, S_PLATEN0, S_SHEET_TOP, W, disposeInk, inkMaterial, onPath, paperMaterial, pathAt } from './paper.ts';
import type { InkUniforms, Mapper } from './paper.ts';
import { Printer } from './printer.ts';
import type { PrintSound } from './sound.ts';

// Điều phối máy in theo trạng thái server. Server giữ nhịp (giai đoạn nào, còn bao lâu); màn hình tự suy ra từng chuyển động
// cơ khí trong giai đoạn đó, nên mất kết nối, mở muộn, máy chậm vẫn bắt kịp đúng chỗ:
//   prime   motor khởi động, trục lăn kéo giấy mới từ cuộn qua trục nạp
//   print   đầu in chạy tới, quét từng dòng qua lại: lớp khung trang trí → lớp avatar (lên màu dần) → lớp tên, danh hiệu
//   eject   giấy được đẩy qua trục trước, dao cắt chạy ngang, tờ giấy rơi xuống khay (bản khổ lớn bay lên khoe rồi treo lên tường)
export type Shot = 'overview' | 'head' | 'cell' | 'out' | 'show' | 'gallery' | 'idle';
export interface StudioHooks { cue(shot: Shot, ms: number): void; sound: PrintSound; done(job: PrintJob): void; cut(big: boolean): void }

interface Layer { mesh: PaperMesh | null; mat: THREE.MeshStandardMaterial & { userData: { ink: InkUniforms } } | null; rows: number }
interface Decal { job: PrintJob; x0: number; x1: number; p0: number; p1: number; layers: Layer[]; big: boolean; full: boolean; dead: boolean }
interface Sheet { n: number; p0: number; big: boolean; decals: Map<number, Decal> }
interface Piece { paper: PaperMesh; decals: Decal[]; feedCut: number; big: boolean; t: number; state: 'slide' | 'tray' | 'show' | 'fly'; stack: number; p0: number; p1: number; pc: number; target?: { pos: THREE.Vector3; quat: THREE.Quaternion; w: number }; released: boolean }

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const seg = (q: number, a: number, b: number) => clamp01((q - a) / (b - a));
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// từng lượt in trong một bản: [bắt đầu, kết thúc] theo tiến độ 0..1 của giai đoạn print
const PASSES = [[0.05, 0.47], [0.52, 0.76], [0.8, 0.97]] as const;
const ROWS = { big: [26, 22, 16], small: [14, 12, 9] };
const SHOW = new THREE.Vector3(0, 1.95, 1.7), SHOW_K = 0.82;

export class Studio {
  readonly group = new THREE.Group();
  readonly printer = new Printer();
  readonly gallery = new Gallery();
  readonly fx = new StudioFx();
  private hooks: StudioHooks;
  private strip: PaperMesh;
  private lead = S_CUT;                  // toạ độ giấy của mép trước dải giấy (đầu đã cắt)
  private sheet: Sheet | null = null;
  private pieces: Piece[] = [];
  private st: PrintState | null = null;
  private phase: PrintPhase = 'idle'; private key = ''; private t0 = 0; private ms = 1;
  private from = { feed: 0, gz: -0.95, hx: 0.82 }; private feedTo = 0;
  private cutDone = false; private cueStep = -1;
  private paperMat = paperMaterial();
  private placedFeed = NaN; private placedLead = NaN;
  stage = 'Sẵn sàng'; progress = 0;

  constructor(hooks: StudioHooks){
    this.hooks = hooks;
    this.strip = new PaperMesh(this.paperMat, -W / 2, W / 2, 0, S_CUT, 1, 640, 0, [1.2, 1.4]);
    this.group.add(this.printer.group, this.strip.mesh, this.gallery.group, this.fx.group);
    this.placeStrip();
  }

  /* ---------------------------------------------------------- vị trí trên bàn in */
  private zOf(p: number){ return PLATEN_Z0 + (p + this.printer.feed - S_PLATEN0); }
  /** tâm ô đang in (cho máy quay cận cảnh avatar) */
  cellCenter(out = new THREE.Vector3()){
    const d = this.current();
    if (!d) return out.set(0, PLATEN_Y, -0.1);
    const s = (d.p0 + d.p1) / 2 + this.printer.feed, o = pathAt(s);
    return out.set((d.x0 + d.x1) / 2, o.y, o.z);
  }
  /** cạnh dài của ô đang in (m): máy quay lùi xa theo cỡ bản in */
  cellSize(){ const d = this.current(); return d ? Math.max(d.x1 - d.x0, d.p1 - d.p0) : 0.77; }
  showCenter(){ return SHOW; }
  private current(){ const j = this.st?.job; return j && this.sheet ? this.sheet.decals.get(j.n) ?? null : null; }

  /* ---------------------------------------------------------- dải giấy */
  private placeStrip(){
    const f = this.printer.feed;
    if (f === this.placedFeed && this.lead === this.placedLead) return;
    this.placedFeed = f; this.placedLead = this.lead;
    this.strip.setRange(-f, this.lead, [1.2, 1.4]);
    this.strip.place(onPath(f));
    if (this.sheet) for (const d of this.sheet.decals.values()) for (const l of d.layers) l.mesh?.place(onPath(f));
  }

  /* ---------------------------------------------------------- bản in */
  private makeDecal(job: PrintJob, sheet: Sheet, full: boolean): Decal {
    const big = job.cell < 0, m = 0.015;
    let x0 = -W / 2, x1 = W / 2, p0 = sheet.p0, p1 = sheet.p0 + SHEET;
    if (!big){ const col = job.cell % 2, row = Math.floor(job.cell / 2); x0 = -W / 2 + col * W / 2 + m; x1 = x0 + W / 2 - m * 2; p0 = sheet.p0 + row * SHEET / 2 + m; p1 = p0 + SHEET / 2 - m * 2; }
    const d: Decal = { job, x0, x1, p0, p1, layers: LAYERS.map((_, i) => ({ mesh: null, mat: null, rows: (big ? ROWS.big : ROWS.small)[i] })), big, full, dead: false };
    const glow = this.glowOf(job);
    const attach = (i: number, set: ReturnType<typeof renderLayer>) => {
      if (d.dead) return;
      const mat = inkMaterial(set, { cmyk: i === 1, glow: i === 0 ? glow : i === 2 ? glow * 0.6 : 0, depth: i });
      mat.userData.ink.uRows.value = d.layers[i].rows;
      mat.userData.ink.uRev.value = d.full ? 1e6 : -1;
      const pm = new PaperMesh(mat, x0, x1, p0, p1, 1, big ? 48 : 24, 0.0012 + i * 0.0005);
      pm.mesh.renderOrder = 2 + i;
      d.layers[i] = { mesh: pm, mat, rows: d.layers[i].rows };
      this.group.add(pm.mesh);
      pm.place(this.mapperFor(d));
    };
    const data = (img: HTMLImageElement | null): ArtData => artData(job, img);
    if (full){
      // bản đã in xong từ trước (mở màn hình muộn): vẽ gộp một lớp
      void avatarImage(job.id, job.avatar).then(img => {
        if (d.dead) return;
        attach(0, renderFlat(data(img), big ? 1024 : 512));
      });
    } else {
      // lớp khung, lớp chữ vẽ ngay; lớp ảnh chờ ảnh đại diện (không có ảnh thì vẽ chữ cái đầu)
      setTimeout(() => attach(0, renderLayer(data(null), 'frame', big)), 0);
      setTimeout(() => attach(2, renderLayer(data(null), 'text', big)), 30);
      void avatarImage(job.id, job.avatar).then(img => attach(1, renderLayer(data(img), 'photo', big)));
    }
    sheet.decals.set(job.n, d);
    this.gallery.hold.add(job.n);
    return d;
  }
  private glowOf(job: PrintJob){ const t = tierOf(job.tier), tpl = templateOf(job.tpl); return tpl.glow === 'none' ? 0 : t.no >= 5 ? 1.0 : t.no >= 4 ? 0.7 : t.no >= 3 ? 0.35 : 0.15; }
  private mapperFor(d: Decal): Mapper {
    const piece = this.pieces.find(p => p.decals.includes(d));
    return piece ? this.pieceMapper(piece) : onPath(this.printer.feed);
  }
  private killDecal(d: Decal){
    d.dead = true;
    for (const l of d.layers){ if (l.mesh){ this.group.remove(l.mesh.mesh); l.mesh.dispose(); } if (l.mat) disposeInk(l.mat); }
  }

  /* ---------------------------------------------------------- nhận trạng thái server */
  apply(st: PrintState, recvAt = performance.now()){
    this.st = st;
    const key = `${st.phase}|${st.job?.n ?? 0}|${st.sheet.n}`, changed = key !== this.key;
    if (changed){
      // giai đoạn trước chưa kịp làm xong trên màn hình này (máy chậm, mất kết nối): làm nốt ngay
      const d = this.printingN && this.sheet ? this.sheet.decals.get(this.printingN) : null;
      if (d){ d.full = true; for (const l of d.layers) if (l.mat){ l.mat.userData.ink.uRev.value = 1e6; l.mat.userData.ink.uWet.value = 0; } }
      this.printingN = 0;
      if (this.phase === 'eject' && !this.cutDone && this.sheet){ this.printer.feed = this.feedTo; this.placeStrip(); this.cut(); }
    }
    // server đã sang tờ khác mà tờ cũ còn trên bàn in: bỏ tờ cũ (các bản trên đó treo lên tường luôn)
    if (this.sheet && this.sheet.n !== st.sheet.n) this.dropSheet();
    if (st.sheet.jobs.length && !this.sheet){
      const priming = st.phase === 'prime';
      this.sheet = { n: st.sheet.n, p0: S_SHEET_TOP - (this.printer.feed + (priming ? PRIME_ADV : 0)), big: st.sheet.big, decals: new Map() };
    }
    if (this.sheet) for (const j of st.sheet.jobs) if (!this.sheet.decals.has(j.n)) this.makeDecal(j, this.sheet, !(st.job?.n === j.n && (st.phase === 'print' || st.phase === 'prime')));
    if (changed){
      const prev = this.phase;
      this.key = key; this.phase = st.phase; this.ms = Math.max(1, st.ms);
      this.t0 = recvAt - (st.ms - st.leftMs);
      this.from = { feed: this.printer.feed, gz: this.printer.gantryZ, hx: this.printer.headX };
      this.cueStep = -1;
      if (st.phase === 'print' && st.job) this.printingN = st.job.n;
      this.begin(prev, st);
    } else if (st.phase !== 'idle'){
      // giữ nhịp theo server (lệch quá 0,4 giây mới chỉnh, để chuyển động không giật)
      const t0 = recvAt - (st.ms - st.leftMs);
      if (Math.abs(t0 - this.t0) > 400) this.t0 = t0;
    }
    this.gallery.set(st);
  }
  private printingN = 0;

  private begin(prev: PrintPhase, st: PrintState){
    const s = this.hooks.sound, job = st.job;
    switch (st.phase){
      case 'prime': this.feedTo = this.printer.feed + PRIME_ADV; this.printer.setMode('ready'); s.startUp(); this.hooks.cue('overview', this.ms + 800); break;
      case 'print': {
        if (!job) break;
        const vip = isVipTier(job.tier);
        this.printer.setMode(job.tier === 'legend' ? 'legend' : vip ? 'vip' : 'print');
        this.fx.setLaser(vip, job.tier === 'legend' ? 0xff7a2a : job.tier === 'vip' ? 0xff3ad0 : 0x5ae8ff);
        if (vip) s.chime();
        if (prev !== 'prime') s.startUp();
        break;
      }
      case 'eject': {
        if (!this.sheet && st.sheet.jobs.length){ this.sheet = { n: st.sheet.n, p0: S_SHEET_TOP - this.printer.feed, big: st.sheet.big, decals: new Map() }; for (const j of st.sheet.jobs) this.makeDecal(j, this.sheet, true); }
        this.feedTo = this.sheet ? S_CUT + 0.04 - this.sheet.p0 : this.printer.feed + EJECT_ADV;
        this.cutDone = false; this.printer.setMode('print'); this.fx.setLaser(false);
        this.hooks.cue('out', this.ms * (st.sheet.big ? 0.55 : 0.75));
        break;
      }
      case 'idle': this.printer.setMode('idle'); this.fx.setLaser(false); break;
    }
  }

  // tờ cũ không kịp đẩy ra: bỏ đi, các bản in trên đó treo lên tường luôn
  private dropSheet(){
    if (!this.sheet) return;
    for (const d of this.sheet.decals.values()){ this.killDecal(d); this.gallery.release(d.job.n); }
    this.sheet = null;
  }

  /* ---------------------------------------------------------- cắt giấy, tờ thành phẩm */
  private cut(){
    this.cutDone = true;
    const f = this.printer.feed, sheet = this.sheet;
    const p0 = S_CUT - f, p1 = this.lead;
    this.lead = p0;
    if (p1 - p0 < 0.05){ this.dropSheet(); return; }
    const paper = new PaperMesh(this.paperMat, -W / 2, W / 2, p0, p1, 1, 220, 0, [1.2, 1.4]);
    this.group.add(paper.mesh);
    const big = !!sheet?.big;
    const decals = sheet ? [...sheet.decals.values()] : [];
    const pc = sheet ? sheet.p0 + SHEET / 2 : (p0 + p1) / 2;
    const piece: Piece = { paper, decals, feedCut: f, big, t: 0, state: big ? 'show' : 'slide', stack: 0, p0, p1, pc, released: false };
    for (const p of this.pieces) if (p.state === 'tray' || p.state === 'slide'){ p.stack++; this.placePiece(p); }
    this.pieces.push(piece);
    this.sheet = null;
    this.placePiece(piece);
    this.hooks.cut(big);
    this.hooks.sound.cut();
    // khay giữ tối đa 2 tờ, tờ cũ hơn được dọn đi
    const old = this.pieces.filter(p => p.state === 'tray').sort((a, b) => b.stack - a.stack);
    for (const p of old.slice(1)) this.removePiece(p);
    if (big){
      const job = decals[0]?.job;
      const hall = job && this.st?.hall?.n === job.n;
      piece.target = hall ? this.gallery.hallPose() : this.gallery.nextPose(true);
      const tier = job ? tierOf(job.tier) : null;
      this.fx.showHalo(SHOW.clone().add(new THREE.Vector3(0, 0, -0.08)), 2.6, tier && tier.no >= 5 ? 0xff9a50 : tier && tier.no >= 4 ? 0x9ae8ff : 0xffd890);
      this.fx.goldBurst(SHOW, true);
      this.fx.cannons(new THREE.Vector3(0, 0.2, 1.6), true);
      this.hooks.sound.cannon(); this.hooks.sound.applause(4);
      if (tier && tier.no >= 4) this.fx.sparkle(SHOW, 70);
    }
  }
  private pieceMapper(p: Piece): Mapper {
    const lift = 0.0015 * p.stack;
    if (p.state === 'slide' || p.state === 'tray'){
      const slide = p.state === 'tray' ? SLIDE_ADV : SLIDE_ADV * ease(clamp01(p.t / 1.3));
      const base = onPath(p.feedCut + slide);
      return (x, pp, l, out, n) => base(x, pp, l + lift, out, n);
    }
    const A = onPath(p.feedCut), v = new THREE.Vector3(), nA = new THREE.Vector3();
    if (p.state === 'show'){
      const b = ease(clamp01(p.t / 1.5));
      return (x, pp, l, out, n) => {
        A(x, pp, l, v, nA);
        const bx = x * SHOW_K, by = SHOW.y + (p.pc - pp) * SHOW_K, bz = SHOW.z + l + Math.sin(b * Math.PI) * 0.25;
        out.set(lerp(v.x, bx, b), lerp(v.y, by, b), lerp(v.z, bz, b));
        n.set(nA.x * (1 - b), nA.y * (1 - b), nA.z * (1 - b) + b).normalize();
      };
    }
    // bay lên tường: từ chỗ khoe tới khung treo
    const tg = p.target!, k = tg.w / W, b = ease(clamp01(p.t / 1.7)), q = new THREE.Quaternion().slerp(tg.quat, b), w = new THREE.Vector3();
    return (x, pp, l, out, n) => {
      const sx = x * SHOW_K, sy = SHOW.y + (p.pc - pp) * SHOW_K, sz = SHOW.z + l;
      w.set(x * k, (p.pc - pp) * k, 0.03 + l).applyQuaternion(tg.quat).add(tg.pos);
      out.set(lerp(sx, w.x, b), lerp(sy, w.y, b) + Math.sin(b * Math.PI) * 0.5, lerp(sz, w.z, b));
      n.set(0, 0, 1).applyQuaternion(q);
    };
  }
  private placePiece(p: Piece){
    const m = this.pieceMapper(p);
    p.paper.place(m);
    for (const d of p.decals) for (const l of d.layers) l.mesh?.place(m);
  }
  private removePiece(p: Piece){
    this.group.remove(p.paper.mesh); p.paper.dispose();
    for (const d of p.decals){ this.killDecal(d); if (!p.released) this.gallery.release(d.job.n); }
    p.released = true;
    this.pieces = this.pieces.filter(x => x !== p);
  }

  /* ---------------------------------------------------------- mỗi khung hình */
  update(dt: number, t: number, camera: THREE.Camera, beat = 0){
    const now = performance.now(), pr = this.printer, q = clamp01((now - this.t0) / this.ms), st = this.st;
    const goTo = (gz: number, hx: number, k = 4) => { const a = 1 - Math.exp(-dt * k); pr.gantryZ += (gz - pr.gantryZ) * a; pr.headX += (hx - pr.headX) * a; };
    pr.uv += ((this.phase === 'print' ? 1 : 0) - pr.uv) * (1 - Math.exp(-dt * 6));
    switch (this.phase){
      case 'idle': {
        goTo(-0.95, 0.82, 1.5); pr.motor = Math.max(0, pr.motor - dt);
        this.stage = st?.waiting ? 'Chuẩn bị bản in tiếp theo' : 'Sẵn sàng · tặng quà để in'; this.progress = 0;
        break;
      }
      case 'prime': {
        pr.motor = Math.min(1, pr.motor + dt * 2);
        pr.feed = lerp(this.from.feed, this.feedTo, ease(seg(q, 0.15, 1)));
        goTo(-0.9, 0, 3);
        this.stage = q < 0.15 ? 'Nhận lệnh in · motor khởi động' : 'Kéo giấy qua trục lăn'; this.progress = q * 0.05;
        break;
      }
      case 'print': this.printStep(q, dt); break;
      case 'eject': this.ejectStep(q, dt); break;
    }
    this.placeStrip();
    // tờ thành phẩm
    for (const p of [...this.pieces]){
      p.t += dt;
      if (p.state === 'slide' && p.t > 1.3){ p.state = 'tray'; this.placePiece(p); setTimeout(() => { if (!p.released){ p.released = true; for (const d of p.decals) this.gallery.release(d.job.n); } }, 600); continue; }
      if (p.state === 'show' && p.t > Math.max(3.4, this.ms / 1000 * 0.45)){ p.state = 'fly'; p.t = 0; this.fx.hideHalo(); this.fx.sparkle(SHOW, 0); this.hooks.cue('gallery', 2600); }
      if (p.state === 'fly' && p.t > 1.75){ this.removePiece(p); this.fx.goldBurst(p.target!.pos, false); continue; }
      if (p.state !== 'tray') this.placePiece(p);
      if (p.state === 'show') for (const d of p.decals){ const m = d.layers[0].mat; if (m) m.emissiveIntensity = this.glowOf(d.job) * (1.2 + Math.sin(t * 4) * 0.5); }
    }
    pr.status.line1 = this.phase === 'idle' ? 'SẴN SÀNG' : this.phase === 'prime' ? 'NẠP GIẤY' : this.phase === 'eject' ? (this.cutDone ? 'HOÀN TẤT' : 'CẮT GIẤY') : pr.mode === 'vip' ? 'VIP MODE' : pr.mode === 'legend' ? 'LEGEND MODE' : 'ĐANG IN';
    pr.status.line2 = this.stage; pr.status.job = st?.job ? `${st.job.name} · ${templateOf(st.job.tpl).name}` : st?.queue[0] ? `Tiếp: ${st.queue[0].name}` : '';
    pr.status.progress = this.progress; pr.status.queue = st?.waiting ?? 0; pr.status.printed = st?.printed ?? 0;
    pr.update(dt, t, beat);
    const head = pr.nozzle(new THREE.Vector3()).setY(PLATEN_Y + 0.04);
    this.fx.update(dt, t, camera, head, PLATEN_Y);
    this.gallery.update(t);
    this.hooks.sound.machine(pr.motor, pr.speeds.feed, pr.speeds.head + pr.speeds.gantry, pr.mode === 'vip' || pr.mode === 'legend');
  }

  private rasterPos(d: Decal, i: number, f: number){
    const rows = d.layers[i].rows, rev = f * rows, row = Math.min(rows - 1, Math.floor(rev)), u = f >= 1 ? 1 : rev - row;
    const x = lerp(d.x0, d.x1, row % 2 ? 1 - u : u);
    const zTop = this.zOf(d.p0), zBot = this.zOf(d.p1);
    const z = lerp(zTop, zBot, (row + 0.5 + clamp01((u - 0.94) / 0.06)) / rows);
    return { x: Math.max(-0.82, Math.min(0.82, x)), z, rev };
  }
  private printStep(q: number, dt: number){
    const pr = this.printer, d = this.current(), job = this.st?.job;
    pr.motor = Math.min(1, pr.motor + dt * 2);
    if (!d || !job){ this.progress = q; return; }
    const big = d.big, few = (this.st?.waiting ?? 0) < 3;
    // máy quay: bản lớn cận đầu in lúc in khung, cận avatar lúc in ảnh, toàn cảnh lúc in chữ
    const step = q < PASSES[0][1] ? 0 : q < PASSES[1][1] ? 1 : 2;
    if (step !== this.cueStep){
      this.cueStep = step;
      const left = (1 - q) * this.ms;
      if (big) this.hooks.cue(step === 0 ? 'head' : step === 1 ? 'cell' : 'overview', step === 2 ? left + 600 : (PASSES[step][1] - q) * this.ms);
      else if (step === 1 && few) this.hooks.cue('cell', (PASSES[1][1] - q) * this.ms);
      else this.hooks.cue('overview', left + 500);
    }
    let pos = { x: 0.82, z: -0.95, rev: 0 };
    for (let i = 0; i < 3; i++){
      const [a, b] = PASSES[i], m = d.layers[i].mat;
      const f = seg(q, a, b);
      if (m){ m.userData.ink.uRev.value = q < a ? -1 : q >= b ? 1e6 : f * d.layers[i].rows; m.userData.ink.uWet.value = q < a ? 0 : Math.max(0, 1 - (q - b) * 6); }
    }
    // đầu in: tới đầu lượt → quét → quay về đầu lượt sau → quét...
    const start = (i: number) => this.rasterPos(d, i, 0), end = (i: number) => this.rasterPos(d, i, 1);
    if (q < PASSES[0][0]){ const s0 = start(0), k = ease(seg(q, 0, PASSES[0][0])); pos = { x: lerp(this.from.hx, s0.x, k), z: lerp(this.from.gz, s0.z, k), rev: 0 }; }
    else {
      for (let i = 0; i < 3; i++){
        const [a, b] = PASSES[i];
        if (q >= a && q < b){ pos = this.rasterPos(d, i, seg(q, a, b)); break; }
        const na = i < 2 ? PASSES[i + 1][0] : 1;
        if (q >= b && q < na){
          const e = end(i), k = ease(seg(q, b, na));
          const s = i < 2 ? start(i + 1) : { x: 0.82, z: this.zOf(d.p0) - 0.1, rev: 0 };
          pos = { x: lerp(e.x, s.x, k), z: lerp(e.z, s.z, k), rev: 0 }; break;
        }
      }
      if (q >= 1) pos = { x: 0.82, z: this.zOf(d.p0) - 0.1, rev: 0 };
    }
    pr.gantryZ = pos.z; pr.headX = pos.x;
    this.progress = 0.05 + q * 0.8;
    this.stage = q < PASSES[0][0] ? 'Đầu in chạy tới vị trí' : q < PASSES[0][1] ? 'In khung trang trí' : q < PASSES[1][0] ? 'Đổi mực' : q < PASSES[1][1] ? 'In avatar TikTok' : q < PASSES[2][0] ? 'Sấy UV' : q < PASSES[2][1] ? 'In tên và danh hiệu' : 'Hoàn thiện bản in';
  }
  private ejectStep(q: number, dt: number){
    const pr = this.printer, big = this.st?.sheet.big ?? false;
    const [fa, fb, cb, rb] = big ? [0, 0.42, 0.56, 0.7] : [0, 0.58, 0.76, 0.92];
    pr.motor = q < rb ? Math.min(1, pr.motor + dt * 2) : Math.max(0, pr.motor - dt);
    pr.feed = lerp(this.from.feed, this.feedTo, ease(seg(q, fa, fb)));
    const goPark = 1 - Math.exp(-dt * 3); pr.gantryZ += (-0.95 - pr.gantryZ) * goPark; pr.headX += (0.82 - pr.headX) * goPark;
    // dao cắt chạy từ phải sang trái, xong thì về chỗ
    const c = seg(q, fb, cb), r = seg(q, cb, rb);
    pr.cutting = q >= fb && q < cb;
    pr.cutterX = q < cb ? lerp(0.86, -0.86, ease(c)) : lerp(-0.86, 0.86, ease(r));
    if (pr.cutting) pr.setMode('cut');
    if (!this.cutDone && q >= fb + (cb - fb) * 0.9) this.cut();
    if (this.cutDone && q > cb) pr.setMode('done');
    this.progress = 0.85 + q * 0.15;
    this.stage = q < fb ? 'Đẩy giấy ra khỏi máy' : q < cb ? 'Dao cắt giấy' : big ? 'Khoe thành phẩm' : 'Thành phẩm rơi xuống khay';
    if (this.cutDone && q > cb && this.cueStep !== 9){ this.cueStep = 9; if (big) this.hooks.cue('show', 3800); }
  }
  onDone(job: PrintJob){
    // bản in vừa xong: tiếng báo, ánh vàng, pháo giấy (bản lớn bắn khi khoe)
    const s = this.hooks.sound;
    s.beep(tierOf(job.tier).big ? 3 : 2);
    if (!tierOf(job.tier).big){ const c = new THREE.Vector3(); this.cellCenter(c); this.fx.goldBurst(c, false); if (tierOf(job.tier).no >= 2) this.fx.cannons(new THREE.Vector3(0, 0.6, 0.9), false); }
    this.hooks.done(job);
  }
}
