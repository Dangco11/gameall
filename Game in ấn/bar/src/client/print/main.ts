import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { TEMPLATES, TIERS, templateOf, tierOf } from '../../shared/print.ts';
import { levelInfo } from '../../shared/levels.ts';
import type { Delta, Fx, PrintState, Settings, Snapshot } from '../../shared/types.ts';
import { renderFlat } from './art.ts';
import { Music } from './music.ts';
import { Net } from './net.ts';
import { PrintSound } from './sound.ts';
import { Studio } from './studio.ts';
import type { Shot } from './studio.ts';
import { $, StudioUI, el, fitView, view } from './ui.ts';

// Live Print Studio: máy in 3D cho TikTok LIVE. Một trang dùng cho cả màn hình LIVE (?live=1, khung dọc 9:16 hay ngang 16:9)
// lẫn bảng điều khiển (mở thường: có bảng thử quà, kết nối TikTok).
// Tham số: ?lite (máy yếu) ?q=1..2 (độ nét) ?cam=overview|head|cell|out|show|gallery (khoá máy quay) ?ao=0 (tắt che sáng)
//          ?catalog (xem 100 mẫu khung) ?nomodel (không nạp file .glb) ?debug (hiện số liệu vẽ)
const params = new URLSearchParams(location.search);
const LIVE = params.has('live'), LITE = params.has('lite'), DEBUG = params.has('debug');
if (LIVE) document.body.classList.add('live');
const num = (k: string, d: number) => params.has(k) ? Math.max(0, +params.get(k)! || 0) : d;

if (params.has('catalog')) catalog();
else studioPage();

/* ------------------------------------------------------------ xem 100 mẫu khung */
function catalog(){
  document.body.classList.add('catalog');
  $('loading').hidden = true;
  const box = $('catalog'); box.hidden = false;
  const head = el('div', 'ch'); head.append(el('b', '', `🖨️ 100 mẫu khung in · Live Print Studio`));
  const bar = el('div', 'cf');
  const show = (k: string) => { for (const c of box.querySelectorAll<HTMLElement>('.cc')) c.hidden = !!k && c.dataset.tier !== k; };
  bar.append(Object.assign(el('button', 'sb', 'Tất cả'), { onclick: () => show('') }));
  for (const t of TIERS) bar.append(Object.assign(el('button', 'sb', `${t.icon} ${t.name} (${TEMPLATES.filter(x => x.tier === t.key).length})`), { onclick: () => show(t.key) }));
  head.append(bar); box.append(head);
  const grid = el('div', 'cg'); box.append(grid);
  let i = 0;
  const next = () => {
    for (let k = 0; k < 4 && i < TEMPLATES.length; k++, i++){
      const tpl = TEMPLATES[i], tier = tierOf(tpl.tier);
      const set = renderFlat({ tpl, name: 'Tên TikTok', avatar: null, xu: tier.xu, count: 1, gift: 'Hoa hồng', code: `${tier.code}-261107-${String(tpl.no).padStart(4, '0')}`, n: tpl.no, at: Date.now(), edition: 1, lv: 5 }, 260);
      const c = el('div', 'cc'); c.dataset.tier = tpl.tier;
      c.append(set.color, el('b', '', `${tpl.no}. ${tpl.name}`), el('small', '', `${tier.icon} ${tier.rarity} · ${tpl.layout} · ${tpl.shape} · ${tpl.border} · ${tpl.ornament} · ${tpl.finish}${tpl.unlock ? ` · mở khoá ${tpl.unlock} xu` : ''}`));
      grid.append(c);
    }
    if (i < TEMPLATES.length) requestAnimationFrame(next);
  };
  next();
}

/* ------------------------------------------------------------ studio 3D */
function studioPage(){
  const canvas = $<HTMLCanvasElement>('scene');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
  renderer.info.autoReset = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const Q_FORCED = params.has('q') ? Math.max(0.75, Math.min(2, +params.get('q')! || 1)) : 0;
  let quality = Q_FORCED || (LITE ? 1 : Math.min(devicePixelRatio, 1.5) * Math.min(1.5, Math.max(1, Math.sqrt(2.4e6 / (innerWidth * innerHeight)))));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07080b);
  scene.fog = new THREE.FogExp2(0x07080b, 0.035);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.05, 80);

  // phản chiếu: phòng studio có hộp đèn (kim loại, kính, nhũ vàng trên bản in ánh lên như thật)
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.03).texture; pm.dispose();
  scene.environmentIntensity = 0.38;

  // ánh sáng điện ảnh: đèn chính rọi chéo từ trên xuống máy in (đổ bóng mềm), đèn viền lạnh phía sau, đèn hắt ấm
  const hemi = new THREE.HemisphereLight(0x9aa6c0, 0x2a1a10, 0.22); scene.add(hemi);
  const key = new THREE.SpotLight(0xfff0dc, 26, 14, 0.62, 0.55, 1.4);
  key.position.set(1.4, 4.0, 2.6); key.target.position.set(0, 0.9, -0.1);
  key.castShadow = true; key.shadow.mapSize.set(LITE ? 1024 : 2048, LITE ? 1024 : 2048); key.shadow.bias = -0.0002; key.shadow.normalBias = 0.015; key.shadow.camera.near = 1; key.shadow.camera.far = 10;
  scene.add(key, key.target);
  const rim = new THREE.SpotLight(0x8ab8ff, 30, 12, 0.7, 0.6, 1.4); rim.position.set(-2.2, 3.4, -2.6); rim.target.position.set(0, 1, 0); scene.add(rim, rim.target);
  const warm = new THREE.PointLight(0xffb070, 4, 6, 1.6); warm.position.set(-1.8, 1.4, 1.8); scene.add(warm);

  const sound = new PrintSound();
  const music = new Music();
  const ui = new StudioUI();

  /* ---------------------------------------------------------- máy quay */
  // Các góc máy: toàn cảnh máy in, cận đầu in, cận avatar đang hiện, giấy ra, khoe thành phẩm, toàn cảnh phòng trưng bày.
  // Máy quay luôn lướt êm (không cắt cảnh); máy rảnh thì tự đi một vòng quanh studio.
  type ShotDef = { pos: THREE.Vector3; look: THREE.Vector3 };
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const tmp = new THREE.Vector3();
  const SHOTS: Record<string, (p: boolean, t: number) => ShotDef> = {
    overview: p => p ? { pos: V(0, 3.9, 3.05), look: V(0, 0.78, -0.3) } : { pos: V(0, 2.85, 3.05), look: V(0, 0.8, -0.3) },
    head: p => { const h = studio.printer.headPos(tmp); return { pos: h.clone().add(p ? V(0.5, 0.85, 1.5) : V(0.8, 0.65, 1.45)), look: h.clone().add(V(-0.05, -0.12, -0.1)) }; },
    cell: p => { const c = studio.cellCenter(tmp), k = Math.max(1, studio.cellSize() / 0.77) * (p ? 1.12 : 1); return { pos: c.clone().add(V(0.05, 1.35 * k, 0.55 * k)), look: c.clone().add(V(0, 0, -0.05)) }; },
    out: p => p ? { pos: V(1.5, 1.35, 3.0), look: V(0.1, 0.62, 1.0) } : { pos: V(1.8, 1.2, 2.7), look: V(0.15, 0.66, 0.95) },
    show: p => p ? { pos: V(0, 2.0, 4.95), look: V(0, 1.92, 1.7) } : { pos: V(0, 2.02, 4.25), look: V(0, 1.95, 1.7) },
    gallery: p => p ? { pos: V(0, 2.1, 2.2), look: V(0, 1.95, -4.4) } : { pos: V(0, 2.2, 1.4), look: V(0, 1.9, -4.4) },
    galleryL: p => p ? { pos: V(-1.2, 2.2, 1.6), look: V(-5.2, 2.3, -1.2) } : { pos: V(-1.2, 2.2, 1.0), look: V(-5.2, 2.3, -1.2) },
    galleryR: p => p ? { pos: V(1.0, 2.0, 1.6), look: V(5.2, 1.6, -1.4) } : { pos: V(1.4, 2.0, 0.8), look: V(5.2, 1.6, -1.4) },
    orbit: (p, t) => { const a = Math.sin(t * 0.07) * 0.85, r = p ? 4.6 : 4.1; return { pos: V(Math.sin(a) * r, 2.5, Math.cos(a) * r + 0.3), look: V(0, 0.95, 0) }; },
  };
  const TOUR = ['overview', 'gallery', 'orbit', 'galleryR', 'overview', 'galleryL', 'orbit'];
  const director = new class {
    shot = 'overview'; until = 0; tourI = 0;
    readonly locked = params.get('cam') ?? '';
    pos = V(0, 3.0, 3.3); look = V(0, 0.9, -0.25); speed = 1.6;
    cue(s: Shot, ms: number){
      if (this.locked) return;
      this.shot = s === 'idle' ? 'overview' : s; this.until = performance.now() + Math.max(800, ms); this.speed = s === 'head' || s === 'cell' ? 2.2 : 1.6;
    }
    update(dt: number, t: number){
      const now = performance.now(), portrait = view.w / view.h < 0.8;
      if (this.locked) this.shot = this.locked in SHOTS ? this.locked : 'overview';
      else if (now > this.until){
        const busy = !!stState && (stState.phase !== 'idle' || stState.waiting > 0);
        this.shot = busy ? 'overview' : TOUR[this.tourI++ % TOUR.length];
        this.until = now + (busy ? 4000 : this.shot === 'overview' ? 12000 : 8000); this.speed = 0.9;
      }
      const s = SHOTS[this.shot](portrait, t);
      // máy quay trôi nhẹ như cầm tay
      s.pos.add(V(Math.sin(t * 0.17) * 0.05, Math.sin(t * 0.23) * 0.03, Math.cos(t * 0.13) * 0.04));
      const k = 1 - Math.exp(-dt * this.speed);
      this.pos.lerp(s.pos, k); this.look.lerp(s.look, k);
      camera.position.copy(this.pos); camera.lookAt(this.look);
    }
  }();

  const studio = new Studio({
    cue: (s, ms) => director.cue(s, ms), sound,
    done: job => {
      const t = tierOf(job.tier), tpl = templateOf(job.tpl);
      if (t.big) ui.banner(job.name, `${tpl.title} · ${tpl.name} · ${t.rarity}`, t.icon, Math.min(5, t.no));
    },
    cut: () => {},
  });
  scene.add(studio.group);

  /* ---------------------------------------------------------- hậu kỳ */
  const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: LITE ? 0 : 4 }));
  composer.addPass(new RenderPass(scene, camera));
  let gtao: GTAOPass | null = null;
  if (!LITE && num('ao', 1)){
    gtao = new GTAOPass(scene, camera, innerWidth, innerHeight);
    gtao.output = GTAOPass.OUTPUT.Default; gtao.blendIntensity = 0.7;
    gtao.updateGtaoMaterial({ radius: 0.25, distanceExponent: 1.5, thickness: 1, scale: 1, samples: 12 });
    gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
    composer.addPass(gtao);
  }
  // lọc điểm ảnh hỏng (NaN, vô cực) trước bloom: một điểm NaN qua bloom loang thành mảng đen lớn
  composer.addPass(new ShaderPass({
    uniforms: { tDiffuse: { value: null } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
      void main(){ vec4 c = texture2D(tDiffuse, vUv);
        if (!(c.r >= 0.0 && c.r < 65000.0) || !(c.g >= 0.0 && c.g < 65000.0) || !(c.b >= 0.0 && c.b < 65000.0)) c.rgb = vec3(0.0);
        if (!(c.a >= 0.0 && c.a < 65000.0)) c.a = 1.0;
        gl_FragColor = c; }`,
  }));
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.2, 0.22, 1.6);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  composer.addPass(new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uVig: { value: 0.34 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uVig; varying vec2 vUv;
      void main(){ vec4 c = texture2D(tDiffuse, vUv); vec3 x = c.rgb; float l = dot(x, vec3(0.2126, 0.7152, 0.0722));
        x = mix(vec3(l), x, 1.06); x += vec3(0.012, 0.006, 0.0) * (1.0 - l);
        vec2 d = vUv - 0.5; x *= 1.0 - dot(d, d) * uVig * 1.6;
        gl_FragColor = vec4(clamp(x, 0.0, 1.0), c.a); }`,
  }));

  function resize(){
    fitView();
    const w = view.w, h = view.h, portrait = w / h < 0.8;
    renderer.setPixelRatio(quality * view.s); renderer.setSize(w, h, false);
    composer.setPixelRatio(quality * view.s); composer.setSize(w, h);
    gtao?.setSize(w * quality * view.s, h * quality * view.s);
    camera.aspect = w / h; camera.fov = portrait ? 52 : 46; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();
  renderer.domElement.addEventListener('webglcontextlost', e => { e.preventDefault(); console.warn('Mất WebGL, tải lại trang sau 2 giây'); setTimeout(() => location.reload(), 2000); });

  /* ---------------------------------------------------------- mạng */
  const net = new Net(LIVE ? 'view' : 'control');
  let liveViews = 0, settings: Settings | null = null, stState: PrintState | null = null;
  const applyPrint = (p: PrintState) => { stState = p; studio.apply(p); ui.queue(p); };
  net.onHello = (s: Snapshot) => {
    settings = s.settings; ui.live(s.live); ui.stats(s.stats); liveViews = s.stats.views ?? 0;
    if (s.role === 'control' && !LIVE) buildSimPanel();
    applyPrint(s.print);
  };
  net.onDelta = (d: Delta) => {
    if (d.live) ui.live(d.live);
    if (d.stats){ ui.stats(d.stats); liveViews = d.stats.views ?? 0; }
    if (d.settings) settings = d.settings;
    if (d.print) applyPrint(d.print);
    for (const f of d.fx ?? []) onFx(f);
  };
  net.onStatus = up => { $('offline').hidden = up; };
  net.connect();

  function onFx(f: Fx){
    if (f.k === 'chat'){ ui.chat(f.id, f.name, f.text); return; }
    if (f.k === 'voice'){ sound.voice(f.url, () => music.duck(true), () => music.duck(false), 25_000, f.tag === 'chat' ? 'chat' : ''); return; }
    if (f.k === 'like'){ hearts(Math.min(6, Math.ceil(f.count / 10))); return; }
    if (f.k !== 'print') return;
    switch (f.ev){
      case 'hello': ui.note(f.text, 'dim'); break;
      case 'queued': {
        const t = tierOf(f.tier);
        ui.note(f.text, 'gift t' + t.no);
        if (!f.merged && t.no >= 3) ui.banner(f.name, `${f.gift} ×${f.count} → ${t.label}`, t.icon, Math.min(5, t.no));
        break;
      }
      case 'start': {
        const t = tierOf(f.job.tier);
        ui.note(f.text, 't' + t.no);
        if (t.no >= 4) ui.banner('MÁY IN CHẾ ĐỘ ĐẶC BIỆT', `${templateOf(f.job.tpl).name} cho ${f.job.name}`, t.icon, 5);
        break;
      }
      case 'done': ui.note(f.text, 'gold'); studio.onDone(f.job); break;
      case 'eject': ui.note(f.text, 'dim'); break;
      case 'levelup': { const L = levelInfo(f.lv); ui.note(f.text, 'gold'); if (f.lv >= 3) ui.banner(f.name, `lên cấp ${f.lv} · ${L.name} ${L.icon}`, L.icon, Math.min(5, 2 + Math.floor(f.lv / 3))); break; }
    }
  }
  function hearts(n: number){
    const box = $('hearts');
    for (let i = 0; i < n; i++){ const h = el('span', 'heart', ['❤️', '💖', '💜', '💙'][i % 4]); h.style.left = `${70 + Math.random() * 25}%`; h.style.animationDelay = `${i * 0.12}s`; box.append(h); setTimeout(() => h.remove(), 3200); }
  }

  /* ---------------------------------------------------------- âm thanh */
  function startAudio(){ sound.start(); music.start(); setTimeout(() => { $('musicHint').hidden = !music.blocked; }, 800); }
  $('musicHint').onclick = () => { startAudio(); $('musicHint').hidden = true; };
  addEventListener('pointerdown', () => { if (!sound.on) startAudio(); }, { once: true });
  $('musicBtn').onclick = () => { if (music.playing){ music.stop(); $('musicBtn').textContent = '🔇'; } else { startAudio(); $('musicBtn').textContent = '🎵'; } };
  $('soundBtn').onclick = () => { if (sound.on){ sound.stop(); $('soundBtn').textContent = '🔇'; } else { sound.start(); $('soundBtn').textContent = '🔈'; } };
  if (!LIVE) setTimeout(() => { if (!sound.on) $('musicHint').hidden = false; }, 1500);
  // Màn hình LIVE dọc 9:16 mở thành cửa sổ riêng 540×960 để TikTok LIVE Studio / OBS chụp cửa sổ
  const liveUrl = `${location.origin}/?live=1`;
  let liveWin: Window | null = null, liveSeen = 0;
  const chan = typeof BroadcastChannel === 'function' ? new BroadcastChannel('print-live') : null;
  if (chan){
    if (LIVE){ const ping = () => chan.postMessage('live'); ping(); setInterval(ping, 1000); addEventListener('pagehide', () => chan.postMessage('bye')); }
    else chan.onmessage = e => { liveSeen = e.data === 'live' ? performance.now() : 0; };
  }
  // trong lúc cửa sổ LIVE mở, trang điều khiển ngừng vẽ 3D (hai trang cùng vẽ nặng dễ làm card đồ hoạ quá tải)
  const liveElsewhere = () => !LIVE && ((liveWin !== null && !liveWin.closed) || performance.now() - liveSeen < 2500 || liveViews > 0);
  const pausedBox = LIVE ? null : document.getElementById('app')!.appendChild(el('div', 'pausedNote', '📺 Màn hình LIVE 9:16 đang mở ở cửa sổ riêng: trang này tạm ngừng vẽ 3D cho nhẹ máy. Đóng cửa sổ đó thì cảnh hiện lại.'));
  if (pausedBox) pausedBox.hidden = true;
  function openLive(){
    const w = window.open(liveUrl, 'printLive916', 'popup,width=540,height=960');
    if (!w){ ui.note('⚠️ Trình duyệt chặn cửa sổ bật lên: cho phép popup, hoặc mở ' + liveUrl, 'warn'); return; }
    liveWin = w; w.focus();
  }
  $('liveBtn').onclick = openLive;

  /* ---------------------------------------------------------- vòng vẽ */
  let started = false, mutedForLive = false;
  async function precompile(){
    const prev = renderer.getRenderTarget();
    renderer.setRenderTarget(composer.readBuffer);
    // quá 12 giây thì thôi chờ (máy yếu, driver lạ): vẽ luôn, shader còn lại tự dịch khi cần
    try { await Promise.race([renderer.compileAsync(scene, camera), new Promise(r => setTimeout(r, 12_000))]); } catch (e){ console.warn('Không dịch trước được shader', e); }
    finally { renderer.setRenderTarget(prev); }
  }
  void Promise.all([music.init(), precompile()]).then(() => {
    started = true; $('loading').hidden = true; studio.gallery.start();
    console.info('Studio sẵn sàng sau', Math.round(performance.now()), 'ms');
    if (LIVE) startAudio();
  });
  const clock = new THREE.Clock();
  let fps = 60, slowFor = 0, frame = 0;
  const dbg = DEBUG ? document.body.appendChild(el('pre', 'debug')) : null;
  function adapt(dt: number){
    if (Q_FORCED) return;
    slowFor = fps < 38 ? slowFor + dt : Math.max(0, slowFor - dt * 0.5);
    if (slowFor < 4) return;
    slowFor = 0;
    if (gtao?.enabled){ gtao.enabled = false; console.info('Tắt GTAO cho nhẹ máy'); }
    else if (quality > 1){ quality = Math.max(1, quality - 0.25); resize(); console.info('Hạ độ nét', quality); }
  }
  function loop(){
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    const paused = liveElsewhere();
    if (pausedBox && pausedBox.hidden !== !paused){
      pausedBox.hidden = !paused; renderer.domElement.style.visibility = paused ? 'hidden' : ''; slowFor = 0;
      // cửa sổ LIVE đang phát nhạc: trang này im lặng, để không có hai bản nhạc lệch nhau chồng lên (nghe như rè, vọng)
      if (paused){ mutedForLive = music.playing || sound.on; music.stop(); sound.stop(); }
      else if (mutedForLive){ mutedForLive = false; startAudio(); }
    }
    // vẫn chạy phần cơ khí (giữ đúng trạng thái giấy, đầu in) khi tạm ngừng vẽ, chỉ không vẽ ra màn hình
    fps += (1 / Math.max(1e-3, dt) - fps) * 0.05;
    if (!paused) adapt(dt);
    music.update(dt);
    director.update(dt, t);
    camera.updateMatrixWorld();
    studio.update(dt, t, camera, music.beat.bass);
    if (stState && frame % 6 === 0) ui.now(stState, studio.stage, studio.progress);
    key.intensity = 26 + (studio.printer.mode === 'done' ? 10 : 0);
    bloom.strength = 0.2 + (studio.printer.mode === "vip" || studio.printer.mode === "legend" ? 0.1 : 0);
    renderer.info.reset();
    if (started && !paused) composer.render(dt);
    if (dbg && frame % 30 === 0){ const i = renderer.info.render; dbg.textContent = `fps ${fps.toFixed(0)} · q ${quality.toFixed(2)} · draw ${i.calls} · tri ${(i.triangles / 1e3).toFixed(0)}k · tex ${renderer.info.memory.textures} · geo ${renderer.info.memory.geometries}${gtao?.enabled ? ' · AO' : ''}`; }
    frame++;
  }
  loop();
  (window as unknown as Record<string, unknown>).__print = { THREE, scene, renderer, camera, studio, director, composer, bloom, gtao, key };

  /* ---------------------------------------------------------- bảng thử */
  let built = false;
  function buildSimPanel(){
    if (built) return;
    built = true;
    const sim = $('sim'), body = $('simBody');
    sim.hidden = false;
    const store = (k: string, v?: unknown) => { try { if (v === undefined) return JSON.parse(localStorage.getItem('print_' + k) ?? 'null'); localStorage.setItem('print_' + k, JSON.stringify(v)); } catch { /* chế độ riêng tư */ } return null; };
    body.hidden = !(store('open') ?? true);
    $('simToggle').onclick = () => { body.hidden = !body.hidden; store('open', !body.hidden); };
    const NAMES = ['Minh Anh', 'Tuấn Kiệt', 'Ngọc Hân', 'Bảo Long', 'Thảo Vy', 'Quang Huy', 'Khánh Linh', 'Đức Thịnh', 'Mai Phương', 'Hoàng Nam', 'Lan Chi', 'Gia Bảo'];
    const GIFTS: [string, number][] = [['Hoa hồng', 1], ['TikTok', 1], ['Kem', 1], ['Bánh donut', 30], ['Mũ', 99], ['Nhẫn kim cương', 300], ['Xe thể thao', 700], ['Sư tử', 2999], ['Vũ trụ TikTok', 34999]];
    const name = el('input') as HTMLInputElement; name.value = store('name') ?? 'Khách thử'; name.onchange = () => store('name', name.value);
    const who = (n = name.value.trim() || 'Khách') => ({ id: 'demo_' + n.toLowerCase().replace(/\s+/g, '_'), name: n });
    const btn = (label: string, f: () => void, cls = '') => { const b = el('button', 'sb ' + cls, label); b.onclick = f; return b; };
    const row = (...k: HTMLElement[]) => { const d = el('div', 'srow'); d.append(...k); return d; };
    const gift = (g: string, xu: number, count = 1, w = who()) => net.send({ t: 'sim', kind: 'gift', ...w, gift: g, diamonds: xu, count });
    const user = el('input') as HTMLInputElement; user.placeholder = '@tên_tiktok'; user.value = store('tt') ?? '';
    const rnd = () => NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + Math.floor(Math.random() * 90 + 10);
    body.append(
      el('div', 'sh', 'Màn hình LIVE'),
      row(btn('📺 Mở màn 9:16', openLive, 'pri'), btn('📋 Chép link', () => { void navigator.clipboard?.writeText(liveUrl).then(() => ui.note('Đã chép link: ' + liveUrl, 'gold')); }), btn('🖼️ Xem 100 mẫu', () => window.open('/?catalog', '_blank'))),
      el('div', 'sh', 'Kết nối TikTok LIVE'),
      row(user, btn('Kết nối', () => { store('tt', user.value); net.send({ t: 'ctl', cmd: 'connect', user: user.value }); }, 'pri'), btn('Ngắt', () => net.send({ t: 'ctl', cmd: 'disconnect' }))),
      row(btn('🔊 Giọng đọc', () => net.send({ t: 'ctl', cmd: 'settings', settings: { voice: !(settings?.voice ?? true) } })), btn('💬 Đọc bình luận', () => net.send({ t: 'ctl', cmd: 'settings', settings: { readChat: !(settings?.readChat ?? true) } }))),
      el('div', 'sh', 'Thử như người xem (DEMO)'),
      row(name, btn('💬 Bình luận', () => net.send({ t: 'sim', kind: 'comment', ...who(), text: 'In cho mình với!' })), btn('❤️ 50 tim', () => net.send({ t: 'sim', kind: 'like', ...who(), count: 50 }))),
      el('div', 'sh', 'Tặng quà (xu)'),
      row(...GIFTS.map(([g, xu]) => btn(`${tierOf(TIERS.slice().reverse().find(t => xu >= t.xu)!.key).icon} ${g} ${xu}`, () => gift(g, xu), 'gift'))),
      row(...TIERS.map(t => btn(`${t.icon} ${t.name} (${t.xu} xu)`, () => gift(t.name, t.xu), 'gift t' + t.no))),
      el('div', 'sh', 'Thử tải: nhiều quà cùng lúc'),
      row(btn('⚡ 12 người tặng cùng lúc', () => { for (let i = 0; i < 12; i++){ const [g, xu] = GIFTS[Math.floor(Math.random() * 6)]; gift(g, xu, 1, who(rnd())); } }),
        btn('🌹 1 người spam 30 hoa hồng', () => { for (let i = 0; i < 30; i++) setTimeout(() => gift('Hoa hồng', 1), i * 100); }),
        btn('👑 3 quà VIP dồn dập', () => { for (let i = 0; i < 3; i++) gift('Vũ trụ TikTok', 1000 + i * 500, 1, who(rnd())); })),
      row(btn('Xoá người thử', () => net.send({ t: 'ctl', cmd: 'clearSim' }))),
    );
  }
}
