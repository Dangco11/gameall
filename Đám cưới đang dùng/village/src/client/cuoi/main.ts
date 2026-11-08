import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { Env } from './env.ts';
import { TEAMS } from '../../shared/balance.ts';
import type { Team } from '../../shared/balance.ts';
import { WEDDING, showFor } from '../../shared/balance.ts';
import type { BattleState, Delta, Fx, PkState, PkTeam, PubPlayer, Settings, Snapshot, WeddingState } from '../../shared/types.ts';
import { Sound } from '../audio.ts';
import { shared } from '../materials.ts';
import { Net } from '../net.ts';
import { Cast } from './cast.ts';
import type { Anim } from './cast.ts';
import { Sign } from './sign.ts';
import { BattleUI, BattleView } from './battle.ts';
import { Confetti } from './confetti.ts';
import { Fireworks } from './fireworks.ts';
import { ARENA, ARENA_C, ARENA_R, PkUI, PkView } from './pk.ts';
import { GiftShow } from './show.ts';
import { loadModels } from './glb.ts';
import { BIG } from './hd.ts';
import { SparkSystem } from './sparks.ts';
import { BAND, CAKE_Z, COUPLE, ENTRANCE, MAM, SEATS, SEATS_PER, STAND_L, STAND_R, Stage } from './stage.ts';
import { $, MEDALS, WeddingUI, el, fitView, view } from './ui.ts';

// Đám cưới làng quê: một khung hình cố định nhìn từ cuối thảm đỏ về cổng hoa.
const params = new URLSearchParams(location.search);
const LIVE = params.has('live'), LITE = params.has('lite');
if (LIVE) document.body.classList.add('live');

/* ------------------------------------------------------------ scene */
const canvas = $<HTMLCanvasElement>('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
// Độ nét: vẽ dư điểm ảnh (siêu lấy mẫu) rồi thu nhỏ cho mép hình, chữ, hoa văn sắc nét kể cả màn hình 1x và khi OBS phóng to.
// Mặc định tới gấp 2 lần (tối đa khoảng 4,2 triệu điểm ảnh); máy yếu (dưới 40 khung hình/giây) tự hạ dần 1,5 rồi 1. Ép mức bằng ?q=1 | 1.5 | 2.
const Q_FORCED = params.has('q') ? Math.max(0.75, Math.min(2, +params.get('q')! || 2)) : 0;
const physPx = innerWidth * innerHeight * devicePixelRatio ** 2;
let quality = Q_FORCED || (LITE ? Math.min(devicePixelRatio, 1.5) : devicePixelRatio * Math.max(1, Math.min(2 / devicePixelRatio, Math.sqrt(4.2e6 / physPx))));
renderer.shadowMap.enabled = !LITE;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcfe4f2, 28, 70);
const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 200);

// nắng chiều ấm, trời xanh dịu
const hemi = new THREE.HemisphereLight(0xd8ecff, 0x9a7a5a, 1.25); scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff0d6, 2.4);
sun.position.set(-9, 14, 12); sun.target.position.set(0, 0, 5);
sun.castShadow = true; sun.shadow.mapSize.set(LITE ? 2048 : 4096, LITE ? 2048 : 4096);   // bóng đổ sắc cạnh
Object.assign(sun.shadow.camera, { left: -21, right: 21, top: 20, bottom: -12, near: 1, far: 70 });
sun.shadow.camera.updateProjectionMatrix(); sun.shadow.bias = -0.0005; sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);
const fill = new THREE.DirectionalLight(0xffd6e6, 0.5); fill.position.set(8, 6, 10); scene.add(fill);
const spot = new THREE.SpotLight(0xfff2d0, 0, 18, 0.32, 0.6, 1.2);
spot.position.set(0, 9, 9); scene.add(spot, spot.target);

const sign = new Sign();
const stage = new Stage(sign.canvas, sign.frames);
sign.onChange = () => { stage.sign.needsUpdate = true; for (const t of stage.frames) t.needsUpdate = true; };
const cast = new Cast();
scene.add(stage.group, cast.group);
const sparks = new SparkSystem(); scene.add(sparks.mesh);
// pháo hoa thật và pháo giấy
const fw = new Fireworks(scene, { launch: () => sound.fwLaunch(), burst: (k, big) => { sound.fwBurst(k, big); burst = Math.max(burst, big ? 2.5 : 1.5); } });
const paper = new Confetti(); scene.add(paper.group);
function paperBlast(giver: THREE.Vector3 | null){
  const c = coupleAt() ?? { x: 0, z: COUPLE.bride.z };
  paper.cannons(new THREE.Vector3(c.x, 0, c.z), giver);
  sound.cannon();
  sparks.burst(new THREE.Vector3(c.x - 2.4, 1.1, c.z + 1.2), [0xffffff, 0xfff3b0], 16, 1.4);
  sparks.burst(new THREE.Vector3(c.x + 2.4, 1.1, c.z + 1.2), [0xffffff, 0xfff3b0], 16, 1.4);
}
// màn hiệu ứng quà theo thang 1 đến 2000 xu
const show = new GiftShow(cast, sparks, { scene, hemi, sun, fog: scene.fog as THREE.Fog }, {
  beer: (id, name) => serve('beer', id, name), food: (id, name) => serve('food', id, name), paper: giver => paperBlast(giver), fireworks: n => fw.salvo(n, 900 * n),
  toast: (id, name) => startToast(name), dance: name => startDance(name), confetti: (n, icons) => ui.confetti(n, icons), sound: k => sound.show(k), boom: () => sound.boom(), flash: a => { burst = Math.max(burst, a); },
});
scene.add(show.group);
const env = new Env(scene, renderer, hemi, sun, show.base, [new THREE.Vector3(0, 4.2, 2.2), new THREE.Vector3(-6, 3.4, 1.2), new THREE.Vector3(6, 3.4, 1.2), new THREE.Vector3(-5, 4.2, 12), new THREE.Vector3(5, 4.2, 12)]);
const bview = new BattleView(sparks); scene.add(bview.group);
// PK cướp dâu, cướp rể: màn đánh nhau trên sân khấu và thanh điểm hai đội
const pkView = new PkView(cast, sparks, {
  sound: k => sound.pk(k), flash: a => { burst = Math.max(burst, a); }, shake: v => { shakeT = Math.max(shakeT, v); },
  confetti: (n, icons) => ui.confetti(n, icons), reassign: () => assign(),
});
scene.add(pkView.group);
const pkUi = new PkUI();

// Top 3 quà cưới tháng: đứng trong vòng hào quang (vòng sáng dưới chân và cột sáng mờ) màu vàng, bạc, hồng theo hạng
const TOP_COLORS = [0xffc83a, 0xe8f0ff, 0xff6ab4];
const halos = TOP_COLORS.map(c => {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.72, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }));
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 3.2, 24, 1, true).translate(0, 1.6, 0), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  ring.position.y = 0.04; g.add(ring, beam); g.visible = false; scene.add(g);
  return { g, ring, beam };
});
let topIds: string[] = [];
function setTop(w: WeddingState){
  topIds = w.top.map(r => r.id);
  ui.top(w.top, w.month);
  const changed = topIds.some((id, i) => cast.ranks.get(id) !== i + 1) || [...cast.ranks.keys()].some(id => !topIds.includes(id));
  if (!changed) return;
  cast.ranks.clear(); topIds.forEach((id, i) => cast.ranks.set(id, i + 1));
}
function auras(dt: number, now: number){
  halos.forEach((h, i) => {
    const a = topIds[i] ? cast.actors.get(topIds[i]) : undefined;
    h.g.visible = !!a && a.z > -3.4;
    if (!a || !h.g.visible) return;
    h.g.position.set(a.x, 0, a.z);
    const k = 1 + Math.sin(now / 260 + i) * 0.08;
    h.ring.scale.set(k, 1, k); h.ring.rotation.y = now / 900;
    (h.beam.material as THREE.MeshBasicMaterial).opacity = 0.12 + Math.sin(now / 400 + i) * 0.05;
    if (Math.random() < dt * (14 - i * 3)) sparks.burst(new THREE.Vector3(a.x + (Math.random() - 0.5) * 0.7, 0.3 + Math.random() * 1.8, a.z + (Math.random() - 0.5) * 0.7), [TOP_COLORS[i], 0xffffff], 2, 0.5);
  });
}
let lastPk: PkState | null = null;
const pkTeam = new Map<string, PkTeam>();

// khung hình hậu kỳ có khử răng cưa MSAA 4 mẫu (không có thì vẽ qua bloom sẽ mất khử răng cưa, mép hình bị nhòe răng cưa)
const composer = LITE ? null : new EffectComposer(renderer, new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: 4 }));
const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.22, 0.4, 0.92);
const grade = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, uWarm: { value: 0 }, uNight: { value: 0 }, uVig: { value: 0.32 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uWarm; uniform float uNight; uniform float uVig; varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv); vec3 x = c.rgb;
      float l = dot(x, vec3(0.2126, 0.7152, 0.0722));
      x = mix(vec3(l), x, 1.08 + uNight * 0.05);                                   // bão hoà nhẹ
      x = x + (x - 0.5) * 0.06 * (1.0 - x) * x * 4.0;                              // đường cong chữ S mềm
      vec3 shadowT = mix(vec3(0.0, 0.01, 0.03), vec3(0.02, 0.0, 0.05), uNight), hiT = mix(vec3(0.03, 0.015, -0.02), vec3(0.06, 0.02, -0.03), uWarm);
      x += shadowT * (1.0 - l) + hiT * l;                                          // bóng hơi lạnh, vùng sáng ấm
      vec2 d = vUv - 0.5; x *= 1.0 - dot(d, d) * uVig * 1.6;                       // tối góc
      gl_FragColor = vec4(clamp(x, 0.0, 1.0), c.a);
    }`,
});
if (composer){ composer.addPass(new RenderPass(scene, camera)); composer.addPass(bloom); composer.addPass(new OutputPass()); composer.addPass(grade); }

function resize(){
  fitView();
  const w = view.w, h = view.h, portrait = w / h < 0.8;
  // canvas dàn theo khổ dàn trang nhưng vẽ đủ điểm ảnh thật của màn hình (nhân tỉ lệ phóng view.s)
  renderer.setPixelRatio(quality * view.s); renderer.setSize(w, h, false); composer?.setPixelRatio(quality * view.s); composer?.setSize(w, h);
  camera.aspect = w / h;
  // dọc 9:16: lùi xa và cao hơn để thấy trọn cổng hoa, thảm đỏ và khách hai bên
  camera.fov = portrait ? 56 : 34;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();
// Lọc ảnh tối đa (anisotropic) cho mọi ảnh dán trong cảnh: nền gạch, thảm, hoa văn áo ở xa và nhìn xiên vẫn nét
const MAX_ANISO = renderer.capabilities.getMaxAnisotropy();
function sharpenTextures(){
  scene.traverse(o => {
    const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | THREE.MeshStandardMaterial[] | undefined;
    for (const mm of Array.isArray(m) ? m : m ? [m] : []) for (const t of [mm.map, mm.normalMap, mm.bumpMap, mm.roughnessMap, mm.metalnessMap]) if (t && t.anisotropy < MAX_ANISO){ t.anisotropy = MAX_ANISO; t.needsUpdate = true; }
  });
}
setInterval(sharpenTextures, 4000);
// máy yếu: hạ độ nét từng bậc khi khung hình rơi dưới 40/giây quá 4 giây
let slowFor = 0;
function adaptQuality(dt: number){
  if (Q_FORCED || quality <= 1) return;
  slowFor = fps < 40 ? slowFor + dt : 0;
  if (slowFor > 4){ slowFor = 0; quality = quality > 1.5 ? 1.5 : 1; resize(); console.info('Hạ độ nét xuống', quality); }
}
// Vị trí camera theo mức sân [dọc 9:16, ngang 16:9]: sân càng rộng, camera càng lùi xa và nâng cao, đổi dần cho êm
// dọc 9:16: máy đặt cao nhìn chéo xuống, đình nằm ngay dưới các bảng chữ, mâm gần nhất sát đáy màn hình
// mức 0 (vừa mở, ít khách) lùi xa thêm một chút cho sân rộng; điểm nhìn hạ thấp để cả sân dịch lên trên màn hình
const CAMS = [[[0, 11.2, 28.5, 4.4, 0], [0, 5.5, 23, 2, 5]], [[0, 14, 32, 4.7, 0], [0, 7, 28, 2, 7]], [[0, 19, 42, 4.9, 0], [0, 9, 34, 1.8, 10]]];
const camPos = new THREE.Vector3(0, 4.6, 19.5), camLook = new THREE.Vector3(0, 2.6, 3.5), _goalPos = new THREE.Vector3(), _goalLook = new THREE.Vector3();
const _origin = new THREE.Vector3(0, 0, 4);
// sàn nhảy: máy quay đặt thẳng trước sàn, hạ thấp và tiến lại vừa đủ để khung hình ôm trọn mọi người đang nhảy
function frameFloor(portrait: boolean){
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const id of onFloor){ const a = cast.actors.get(id); if (!a) continue; x0 = Math.min(x0, a.x); x1 = Math.max(x1, a.x); z0 = Math.min(z0, a.z); z1 = Math.max(z1, a.z); }
  if (x0 > x1) return;
  const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, halfW = (x1 - x0) / 2 + 0.6 + 0.6 * BIG, depth = z1 - z0;
  const vHalf = THREE.MathUtils.degToRad(camera.fov / 2), hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
  // đủ xa để vừa bề ngang, vừa chiều cao người (cả hàng sau), cộng thêm theo bề sâu của đám đông
  const d = Math.max(6, halfW / Math.tan(hHalf), (1.3 * BIG + 0.6 + depth * 0.35) / Math.tan(vHalf)) + depth * 0.5;
  const h = portrait ? 1.6 + d * 0.32 : 1.4 + d * 0.24;          // hơi cao hơn tầm mắt để thấy cả hàng sau
  _goalPos.set(cx, h, z1 + d); _goalLook.set(cx, 0.55 * BIG, cz);
}
function aimCamera(dt: number){
  const portrait = innerWidth / innerHeight < 0.8, [x, y, z, ly, lz] = CAMS[level][portrait ? 0 : 1];
  _goalPos.set(x, y, z); _goalLook.set(0, ly, lz);
  // sàn nhảy: người vừa tặng quà được máy quay lia tới cận mặt trong 7 giây
  const fa = focus ? cast.actors.get(focus.id) : undefined;
  // người to gấp BIG lần: máy nâng lên và lùi ra theo cho vẫn thấy trọn người
  const fb = 0.35 + BIG * 0.65;
  if (fa){ if (portrait){ _goalPos.set(fa.x, 3.4 * fb, fa.z + 7.5 * fb); _goalLook.set(fa.x, 2.3 * fb, fa.z); } else { _goalPos.set(fa.x, 2.4 * fb, fa.z + 6 * fb); _goalLook.set(fa.x, 1.2 * fb, fa.z); } }
  else if (floorOn() && onFloor.size) frameFloor(portrait);
  const k = dt < 0 ? 1 : 1 - Math.exp(-dt * (fa || focusBack > performance.now() ? 2.6 : 1.2));
  camPos.lerp(_goalPos, k); camLook.lerp(_goalLook, k);
  applyUserCam();
  // sương mù tính từ chỗ đặt máy: camera lùi xa khi kê nhiều mâm thì sương cũng lùi theo, sân và đình luôn rõ
  const fog = scene.fog as THREE.Fog, d = camera.position.distanceTo(_origin);
  fog.near = d + 18; fog.far = d + 90;
}

/* ------------------------------------------------------------ máy quay bằng chuột */
// Lăn chuột: phóng to thu nhỏ. Kéo chuột trái: xoay quanh sân. Kéo chuột phải (hoặc Shift + kéo): dời khung hình.
// Màn hình cảm ứng: một ngón xoay, hai ngón chụm để phóng. Nhấp đúp hoặc phím R: về góc máy tự động.
// Góc chỉnh tay cộng lên góc máy tự động, nên camera vẫn theo cảnh (thêm mâm, cận người nhảy) mà không mất góc của bạn.
const userCam = { yaw: 0, pitch: 0, zoom: 1, pan: new THREE.Vector3() };
const _sph = new THREE.Spherical(), _off = new THREE.Vector3(), _look = new THREE.Vector3(), _right = new THREE.Vector3(), _fwd = new THREE.Vector3();
const _ray = new THREE.Raycaster(), _ndc = new THREE.Vector2(), _hit = new THREE.Vector3(), _ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1);
const camReset = document.createElement('button');
camReset.id = 'camReset'; camReset.textContent = '🎥 Về góc tự động'; camReset.title = 'Nhấp đúp vào khung cảnh hoặc bấm R cũng được';
camReset.onclick = () => resetUserCam();
$('app').append(camReset);
function userCamOn(){ return userCam.yaw !== 0 || userCam.pitch !== 0 || userCam.zoom !== 1 || userCam.pan.lengthSq() > 0; }
function resetUserCam(){ userCam.yaw = userCam.pitch = 0; userCam.zoom = 1; userCam.pan.set(0, 0, 0); camReset.classList.remove('on'); }
function applyUserCam(){
  _off.subVectors(camPos, camLook); _sph.setFromVector3(_off);
  _sph.theta += userCam.yaw;
  _sph.phi = Math.min(1.5, Math.max(0.12, _sph.phi - userCam.pitch));
  _sph.radius *= userCam.zoom;
  _look.copy(camLook).add(userCam.pan);
  camera.position.copy(_look).add(_off.setFromSpherical(_sph));
  if (camera.position.y < 0.5) camera.position.y = 0.5;
  camera.lookAt(_look);
}
{
  const pts = new Map<number, { x: number; y: number }>();
  let pinch = 0, mode: 'rot' | 'pan' = 'rot';
  const changed = () => camReset.classList.toggle('on', userCamOn());
  const pan = (dx: number, dy: number) => {
    // dời theo mặt đất: ngang theo chiều phải của máy, dọc theo hướng nhìn tới trước
    const d = camera.position.distanceTo(_look) * 0.0016 / view.s;
    _right.setFromMatrixColumn(camera.matrixWorld, 0).setY(0).normalize();
    _fwd.set(_right.z, 0, -_right.x);
    userCam.pan.addScaledVector(_right, -dx * d).addScaledVector(_fwd, dy * d);
    userCam.pan.clampLength(0, 30);
  };
  canvas.addEventListener('contextmenu', e => e.preventDefault());
  canvas.addEventListener('pointerdown', e => {
    canvas.setPointerCapture(e.pointerId); pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    mode = e.button === 2 || e.button === 1 || e.shiftKey ? 'pan' : 'rot';
    if (pts.size === 2){ const [a, b] = [...pts.values()]; pinch = Math.hypot(a.x - b.x, a.y - b.y); }
  });
  canvas.addEventListener('pointermove', e => {
    const p = pts.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
    if (pts.size === 2){
      // hai ngón: chụm để phóng, cùng kéo để dời
      const [a, b] = [...pts.values()], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch > 0) userCam.zoom = Math.min(2.5, Math.max(0.12, userCam.zoom * pinch / d));
      pinch = d; pan(dx / 2, dy / 2);
    } else if (mode === 'pan') pan(dx, dy);
    else { userCam.yaw -= dx * 0.005; userCam.pitch = Math.min(1.2, Math.max(-1.2, userCam.pitch + dy * 0.004)); }
    changed();
  });
  const up = (e: PointerEvent) => { pts.delete(e.pointerId); if (pts.size < 2) pinch = 0; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const before = userCam.zoom;
    userCam.zoom = Math.min(2.5, Math.max(0.12, userCam.zoom * Math.exp(e.deltaY * (e.deltaMode ? 0.05 : 0.0012))));
    // phóng vào đúng chỗ con trỏ chỉ trên sân (như xem bản đồ), không chỉ vào giữa khung hình
    const r = canvas.getBoundingClientRect();
    _ray.setFromCamera(_ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
    if (_ray.ray.intersectPlane(_ground, _hit)){
      userCam.pan.addScaledVector(_hit.sub(_look).setY(0), 1 - userCam.zoom / before);
      userCam.pan.clampLength(0, 30);
    }
    changed();
  }, { passive: false });
  canvas.addEventListener('dblclick', resetUserCam);
  addEventListener('keydown', e => {
    if ((e.target as HTMLElement)?.closest?.('input, textarea, select')) return;
    if (e.key === 'r' || e.key === 'R') resetUserCam();
  });
}

/* ------------------------------------------------------------ state */
const ui = new WeddingUI();
const bui = new BattleUI();
const sound = new Sound();
sound.setMode('wedding');
// có bài hát trong village/music/ thì phát lần lượt, không có thì dùng nhạc cưới tự soạn
fetch('/music/list.json').then(r => r.json()).then((list: string[]) => { if (list.length) sound.setPlaylist(list); }).catch(() => {});
// bài nhảy riêng cho sàn nhảy (village/music/nhay/), không có thì dùng nhạc sàn tự soạn
fetch('/music/nhay/list.json').then(r => r.json()).then((list: string[]) => sound.setDanceList(list)).catch(() => {});
// nhân vật 3D như thật từ village/models/ (codau.glb, chure.glb); nạp xong thì cô dâu chú rể tự đổi sang
void loadModels();
const net = new Net(LIVE ? 'view' : 'control');
const players = new Map<string, PubPlayer>();
let wedding: WeddingState | null = null, weddingAt = 0;
let battle: BattleState | null = null, battleAt = 0;
const battleTeam = new Map<string, Team>();
const battleOn = () => !!battle && battle.phase !== 'idle';
let settings: Settings = { idleBots: true, voice: true, readChat: true, scene: 'wedding' };
let controlRole = false;
let liveState = { status: 'idle', uniqueId: '', error: '', attempt: 0 };

function onHello(s: Snapshot){
  controlRole = s.role === 'control';
  players.clear();
  for (const p of s.players) players.set(p.id, p);
  settings = s.settings;
  apply({ t: 'delta', wedding: s.wedding, live: s.live, stats: s.stats });
  if (controlRole){ buildSimPanel(); if (settings.scene !== 'wedding') net.send({ t: 'ctl', cmd: 'settings', settings: { scene: 'wedding' } }); }
}

function apply(d: Delta){
  if (d.players) for (const p of d.players) players.set(p.id, p);
  if (d.removed) for (const id of d.removed) players.delete(id);
  if (d.wedding){
    const prevStep = wedding?.step;
    if (d.wedding.phase === 'waiting') show.reset();
    if (d.wedding.phase === 'waiting' && wedding?.phase === 'done') stage.clearOrders();        // đám mới: dọn bia, món gọi thêm của đám cũ
    wedding = d.wedding; weddingAt = performance.now(); ui.wedding(wedding, 0); sign.draw(wedding); setTop(wedding);
    // PK: thanh điểm thay cho bảng đám cưới và bảng quà; nhớ đội của từng người để tô màu tên
    pkTeam.clear();
    if (wedding.pk){ lastPk = wedding.pk; for (const [id, t] of wedding.pk.members) pkTeam.set(id, t); pkUi.render(wedding.pk, 0); } else { pkUi.hide(); pkView.reset(); }
    document.body.classList.toggle('pk', !!wedding.pk);
    if (prevStep !== undefined && wedding.step !== prevStep) onStep(wedding.step);
  }
  if (d.battle){
    const was = battleOn();
    battle = d.battle; battleAt = performance.now();
    battleTeam.clear(); for (const [id, t] of battle.members) battleTeam.set(id, t);
    document.body.classList.toggle('battle', battleOn());
    document.body.classList.toggle('bfinal', battle.phase === 'final');
    if (battleOn()){
      bui.render(battle, 0);
      // bảng Lễ Thành Hôn: thủ lĩnh Nhà gái và Nhà trai
      if (wedding){ const r = (t: Team) => { const l = battle!.teams[t].leader; return l ? { id: l.id, name: l.name, gifted: l.gifted, avatar: l.avatar } : null; }; sign.draw({ ...wedding, bride: r('gai'), groom: r('trai') }); }
    } else if (was && wedding){ sign.draw(wedding); ui.wedding(wedding, 0); }
  }
  if (d.settings){ settings = d.settings; for (const k of ['idleBots', 'voice', 'readChat'] as const){ const b = document.getElementById('set_' + k) as HTMLInputElement | null; if (b) b.checked = settings[k]; } }
  if (d.stats){ ui.stats(d.stats); const e = document.getElementById('simStats'); if (e) e.textContent = `Hàng đợi ${d.stats.queue} · đã xử lý ${d.stats.processed} · trùng ${d.stats.duplicates} · ${Math.round(fps)} fps`; }
  if (d.live){ liveState = d.live; ui.live(d.live); const s = document.getElementById('ttStatus'); if (s) s.textContent = d.live.status === 'connected' ? `Đang nhận sự kiện từ @${d.live.uniqueId}` : d.live.status === 'idle' ? 'Chưa kết nối. Các nút bên dưới chỉ để thử khi chưa live, kết nối TikTok rồi thì bị khóa.' : `${d.live.status}${d.live.error ? ': ' + d.live.error : ''}`; }
  if (d.fx) for (const f of d.fx) onFx(f);
  if (d.players || d.removed || d.wedding || d.battle) assign();
}

// Xếp chỗ: mỗi khách có một ghế cố định ở mâm cỗ (6 người một mâm).
// Chưa đủ cô dâu chú rể: mọi người ngồi mâm ăn cỗ. Đủ đôi, lễ thành hôn bắt đầu: cả sân đứng dậy ra trước sân và hai mép thảm
// chúc mừng (ai ngồi mâm bên nào đứng bên đó). Tới tiệc cưới thì về mâm uống bia tiếp.
// Số mâm theo số khách: ít người kê ít mâm, đông thì kê thêm, tối đa 20 mâm (120 người). Vắng bớt hẳn mới dọn mâm.
const seatOf = new Map<string, number>();
let level = 0, tables = 0;
function setTables(n: number){
  if (n === tables) return;
  const more = n > tables && tables > 0;
  tables = n; stage.setTables(n);
  level = n <= 4 ? 0 : n <= 10 ? 1 : 2;                         // camera lùi xa dần khi kê thêm mâm
  if (more){ ui.feed(`🍲 Khách đông, kê thêm mâm cỗ: ${n} mâm`, 'note'); sound.wedding('mung'); }
}
const tableOf = (id: string) => { const s = seatOf.get(id); return s === undefined ? -1 : Math.floor(s / SEATS_PER); };
function assign(){
  if (battleOn()){ assignBattle(battle!); return; }
  const now = performance.now();
  const g = (id: string) => [players.get(id)?.gender ?? '', players.get(id)?.look ?? 0] as const;
  // Vị trí và động tác cô dâu chú rể theo từng thủ tục; hết lễ thì nắm tay đi qua cổng hoa vào trong đình
  const st = wedding?.phase === 'married' ? wedding.step : wedding?.phase === 'done' ? 'home' : '';
  const z0 = COUPLE.bride.z, face = Math.PI / 2;
  type S = { x: number; z: number; yaw: number; pose: Anim | '' };
  const plan: Record<string, [S, S]> = {
    introBride: [{ x: 0, z: z0 + 1.5, yaw: 0, pose: '' }, { x: 1.6, z: z0, yaw: 0, pose: '' }],
    introGroom: [{ x: -1.6, z: z0, yaw: 0, pose: '' }, { x: 0, z: z0 + 1.5, yaw: 0, pose: '' }],
    giaTien: [{ x: -0.45, z: 0.4, yaw: Math.PI, pose: 'bow' }, { x: 0.45, z: 0.4, yaw: Math.PI, pose: 'bow' }],
    rings: [{ x: -0.5, z: z0 + 0.6, yaw: face, pose: '' }, { x: 0.5, z: z0 + 0.6, yaw: -face, pose: '' }],
    ruou: [{ x: -0.45, z: z0 + 0.6, yaw: face, pose: 'toast' }, { x: 0.45, z: z0 + 0.6, yaw: -face, pose: 'toast' }],
    banh: [{ x: -0.75, z: CAKE_Z - 0.55, yaw: 0.6, pose: 'cut' }, { x: 0.75, z: CAKE_Z - 0.55, yaw: -0.6, pose: 'cut' }],
    dance: [{ x: -0.6, z: FLOOR_C.z - 0.5, yaw: 0, pose: 'wave' }, { x: 0.6, z: FLOOR_C.z - 0.5, yaw: 0, pose: 'disco' }],   // sàn nhảy: cặp đôi giữa sàn
    home: [{ x: -1.45, z: -4.6, yaw: Math.PI, pose: '' }, { x: 1.45, z: -4.6, yaw: Math.PI, pose: '' }],   // đi hai bên bàn thờ, lọt khe cột đình
  };
  let [bs, gs] = plan[st] ?? [{ ...COUPLE.bride, pose: '' }, { ...COUPLE.groom, pose: '' }];
  // PK: người bị cướp đứng giữa, người giữ vai bên trái, kẻ cướp bên phải; đang ra chiêu thì đứng theo chiêu
  const pk = wedding?.pk;
  if (pk){
    const at = (id: string, base: { x: number; z: number; yaw: number }) => ({ ...(pkView.spot(id) ?? base), pose: pkView.pose(id) });
    const p = (id: string) => id === pk.stolen.id ? at(id, ARENA.stolen) : at(id, ARENA.def);
    if (wedding?.bride) bs = p(wedding.bride.id);
    if (wedding?.groom) gs = p(wedding.groom.id);
    const ts = at(pk.thief.id, ARENA.thief);
    cast.set(pk.thief.id, players.get(pk.thief.id)?.name ?? pk.thief.name, 'guest', ts, ENTRANCE, now, ...g(pk.thief.id)).pose = ts.pose;
  }
  stage.cake.visible = !pk && (st === 'banh' || st === 'party');
  const dancing = now < danceUntil;
  if (wedding?.bride) cast.set(wedding.bride.id, wedding.bride.name, 'bride', bs, ENTRANCE, now, ...g(wedding.bride.id)).pose = toastPose || (dancing ? 'wave' : bs.pose);
  if (wedding?.groom) cast.set(wedding.groom.id, wedding.groom.name, 'groom', gs, ENTRANCE, now, ...g(wedding.groom.id)).pose = toastPose || (dancing ? 'disco' : gs.pose);
  const couple = new Set([wedding?.bride?.id, wedding?.groom?.id, pk?.thief.id]);
  const want = (wedding?.guests ?? []).filter(id => !couple.has(id) && players.get(id)?.online);
  let need = Math.min(MAM.length, Math.max(2, Math.ceil(want.length / SEATS_PER)));
  need += need % 2;                                              // kê theo cặp trái phải cho cân sân
  if (need < tables && want.length > (tables - 2) * SEATS_PER - 4) need = tables;
  setTables(need);
  const cap = tables * SEATS_PER;
  for (const [id, x] of [...seatOf]) if (!want.includes(id) || x >= cap) seatOf.delete(id);
  const used = new Set(seatOf.values());
  for (const id of want){
    if (seatOf.has(id)) continue;
    let x = 0; while (used.has(x) && x < cap) x++;
    if (x >= cap) break;
    seatOf.set(id, x); used.add(x);
  }
  // đang làm lễ (chưa tới tiệc): đứng dậy ra chúc, ngồi mâm bên trái thì đứng bên trái
  const standing = wedding?.phase === 'married' && !!wedding.step && wedding.step !== 'party' && wedding.step !== 'dance';
  // sàn nhảy: tất cả khách rời mâm lên sàn, xếp vòng quanh cô dâu chú rể (chừa phía trước cho máy quay thấy cặp đôi)
  const floor = new Map<string, { x: number; z: number; yaw: number }>();
  onFloor.clear();
  if (floorOn()){
    const spots = floorSpots();
    [...seatOf].sort((a, b) => a[1] - b[1]).forEach(([id], i) => { if (spots[i]){ floor.set(id, spots[i]); onFloor.add(id); } });
    // người đang được quay cận ra giữa sân khấu, trước cô dâu chú rể, khoảng giữa hai mâm đầu
    if (focus && seatOf.has(focus.id)){ floor.set(focus.id, STAGE_SPOT); onFloor.add(focus.id); }
    if (wedding?.bride) onFloor.add(wedding.bride.id);
    if (wedding?.groom) onFloor.add(wedding.groom.id);
  }
  const stand = new Map<string, { x: number; z: number; yaw: number }>();
  if (standing){
    let l = 0, r = 0;
    for (const [id, x] of [...seatOf].sort((a, b) => a[1] - b[1])){
      const left = SEATS[x].x < 0;
      const spot = left ? (STAND_L[l] ?? STAND_R[r]) : (STAND_R[r] ?? STAND_L[l]);
      if (spot === STAND_L[l]) l++; else r++;
      if (spot) stand.set(id, spot);
    }
  }
  // PK: khách đứng gần sân khấu dạt ra thành vòng tròn, quay mặt vào xem
  const clear = (sp: { x: number; z: number; yaw: number } | undefined) => {
    if (!sp || !pk) return sp;
    const dx = sp.x - ARENA_C.x, dz = sp.z - ARENA_C.z, d = Math.hypot(dx, dz);
    if (d >= ARENA_R) return sp;
    const k = ARENA_R / Math.max(d, 0.01), x = ARENA_C.x + (d < 0.01 ? ARENA_R : dx * k), z = ARENA_C.z + dz * k;
    return { x, z, yaw: Math.atan2(ARENA_C.x - x, ARENA_C.z - z) };
  };
  for (const [id, x] of seatOf){
    const hs = handSpot(id), sp = pkView.spot(id) ?? hs ?? floor.get(id) ?? clear(stand.get(id));
    cast.set(id, players.get(id)?.name ?? '', sp ? 'guest' : 'seat', sp ?? SEATS[x], ENTRANCE, now, ...g(id));
  }
  for (const [wid, w] of waiters) cast.set(wid, 'Phục vụ', 'waiter', w.state === 'back' ? w.from : w.to, w.from, now);
  BAND.forEach((b, i) => cast.set('band-' + i, '', 'band', b, ENTRANCE, now));
  cast.prune(now);
}

// Mở đầu mỗi phần lễ: giới thiệu thì trống chiêng và tim, trao nhẫn thì lấp lánh vàng, tiệc thì pháo hoa
function onStep(step: string){
  const mid = new THREE.Vector3(0, 1.8, COUPLE.bride.z + 1);
  if (step === 'introBride' || step === 'introGroom'){ sound.wedding('groom'); sparks.hearts(mid); burst = 2; }
  if (step === 'giaTien' || step === 'ruou') sound.wedding('mung');
  if (step === 'rings' || step === 'banh'){ sound.wedding('bride'); sparks.burst(mid, [0xffd45a, 0xfff3b0, 0xffffff], 70, 3); }
  // trao nhẫn: mời khách lên trao quà, 10 xu một chỉ vàng, thả tim là phong bì
  if (step === 'rings' && !wedding?.pk && !battleOn()){ ui.banner('💍', 'Trao nhẫn cưới · Mời khách lên trao quà!', '🥇 Tặng 10 xu = 1 chỉ vàng · ❤️ Thả tim = phong bì mừng cưới', 'bride'); ui.confetti(16, ['🥇', '🧧', '💍', '✨']); }
  if (step === 'party'){ sound.wedding('end'); fw.salvo(3, 1800); burst = 3; ui.confetti(24, ['🥂', '🎉', '🌸', '✨']); }
}

// Lời chào khách mới trên màn hình: gom trong 3 giây thành một dòng
let greetBuf: string[] = [], greetTimer = 0;
// Phụ đề MC hiện đúng lúc giọng đọc câu đó, không hiện trước khi tiếng tới.
// Tắt tiếng hoặc tắt giọng thì hiện ngay; giọng lỗi không tới thì sau 15 giây vẫn hiện.
const waitingMc = new Map<string, number>();
function mcCaption(text: string){
  if (!sound.on || !settings.voice){ ui.mc(text); return; }
  clearTimeout(waitingMc.get(text));
  waitingMc.set(text, window.setTimeout(() => { waitingMc.delete(text); ui.mc(text); }, 15_000));
}
function showSpoken(text: string){
  clearTimeout(waitingMc.get(text)); waitingMc.delete(text);
  ui.mc(text);
}

function greetName(name: string){
  greetBuf.push(name);
  if (greetTimer) return;
  greetTimer = window.setTimeout(() => {
    const n = greetBuf; greetBuf = []; greetTimer = 0;
    ui.feed(`👋 Chào mừng ${n.slice(0, 3).join(', ')}${n.length > 3 ? ` và ${n.length - 3} người nữa` : ''} đến dự đám cưới!`, 'note');
  }, 3000);
}

// Đại chiến: thủ lĩnh Nhà trai đứng chỗ chú rể, Nhà gái chỗ cô dâu, Trùm cướp giữa thảm.
// Quân hai nhà đứng hai bên thảm và ngồi mâm (Nhà trai bên phải, Nhà gái bên trái), đội Cướp dâu tiến lên trên thảm đỏ.
// Chung kết: Nhà trai thắng thì cô dâu chú rể nắm tay vào đình, Nhà gái thắng thì chú rể cúi lạy xin dâu, Cướp dâu thắng thì Trùm cướp dắt cô dâu chạy ra cổng.
const CUOP_SPOTS = Array.from({ length: 30 }, (_, i) => ({ x: (i % 3 - 1) * 0.9, z: 9.2 + Math.floor(i / 3) * 1.0, yaw: Math.PI }));
const sideOf = (t: 'trai' | 'gai', n: number) => SEATS.slice(0, n * SEATS_PER).filter(p => t === 'trai' ? p.x > 0 : p.x < 0);
function assignBattle(s: BattleState){
  const now = performance.now();
  const g = (id: string) => [players.get(id)?.gender ?? '', players.get(id)?.look ?? 0] as const;
  const name = (id: string) => players.get(id)?.name ?? '';
  const lead = { trai: s.teams.trai.leader?.id, gai: s.teams.gai.leader?.id, cuop: s.teams.cuop.leader?.id };
  const fin = s.phase === 'final', late = fin && s.phaseLeftMs - (now - battleAt) < 100_000;
  type P = { x: number; z: number; yaw: number };
  let bride: P = COUPLE.bride, groom: P = COUPLE.groom, boss: P = { x: 0, z: 7.4, yaw: Math.PI }, gpose: Anim | '' = '';
  if (fin && s.winner === 'trai' && late){ bride = { x: -1.45, z: -4.6, yaw: Math.PI }; groom = { x: 1.45, z: -4.6, yaw: Math.PI }; }
  if (fin && s.winner === 'gai'){ groom = { x: 0.35, z: COUPLE.groom.z + 0.9, yaw: -Math.PI / 2 - 0.5 }; gpose = 'bow'; }
  if (fin && s.winner === 'cuop'){ boss = late ? { x: 13, z: 9, yaw: Math.PI / 2 } : { x: 6.8, z: 8, yaw: Math.PI / 2 }; bride = { x: boss.x - 0.9, z: boss.z + 0.3, yaw: Math.PI / 2 }; }
  if (lead.gai) cast.set(lead.gai, name(lead.gai), 'bride', bride, ENTRANCE, now, ...g(lead.gai)).pose = '';
  if (lead.trai) cast.set(lead.trai, name(lead.trai), 'groom', groom, ENTRANCE, now, ...g(lead.trai)).pose = gpose;
  if (lead.cuop) cast.set(lead.cuop, name(lead.cuop), 'guest', boss, ENTRANCE, now, ...g(lead.cuop));
  const leaders = new Set(Object.values(lead));
  const by: Record<Team, string[]> = { trai: [], gai: [], cuop: [] };
  for (const [id, t] of s.members) if (!leaders.has(id) && players.get(id)?.online) by[t].push(id);
  const need = Math.max(by.trai.length, by.gai.length);
  setTables(Math.min(MAM.length, Math.max(2, 2 * Math.ceil(need / SEATS_PER))));
  for (const t of ['trai', 'gai'] as const){ const spots = sideOf(t, tables); by[t].slice(0, spots.length).forEach((id, i) => cast.set(id, name(id), 'seat', spots[i], ENTRANCE, now, ...g(id))); }
  by.cuop.slice(0, CUOP_SPOTS.length).forEach((id, i) => cast.set(id, name(id), 'guest', CUOP_SPOTS[i], ENTRANCE, now, ...g(id)));
  stage.cake.visible = false;
  BAND.forEach((b, i) => cast.set('band-' + i, '', 'band', b, ENTRANCE, now));
  cast.prune(now);
}

function onBattleFx(f: Extract<Fx, { k: 'battle' }>, from: THREE.Vector3 | null, mid: THREE.Vector3){
  if (f.text && f.ev !== 'start' && f.ev !== 'phase' && f.ev !== 'win') ui.feed(f.text, f.ev === 'join' || f.ev === 'locked' ? '' : 'gift');
  sound.battle(f.ev, f.gift);
  const T = f.team ? TEAMS[f.team] : null;
  switch (f.ev){
    case 'start': ui.banner('⚔️', 'Đại chiến Nhà trai – Nhà gái!', 'Bình luận 1 Nhà trai · 2 Nhà gái · 3 Cướp dâu', 'steal'); sparks.fireworks(); break;
    case 'phase': ui.banner('⚔️', f.name, f.text, 'groom'); burst = 2; break;
    case 'climax': ui.banner('🔥', '10 giây cuối!', 'Mọi điểm nhân đôi, lật kèo ngay!', 'steal'); burst = 3; break;
    case 'join': if (T) cast.say(f.id, `${T.icon} ${T.name}!`, 3000); break;
    case 'power': if (f.team) bview.power(f.team, from); cast.cheer(f.id); break;
    case 'drum': if (f.team){ bview.power(f.team, from); for (const [id, t] of battleTeam) if (t === f.team) cast.cheer(id, 6000); } break;
    case 'shield': if (f.team) bview.power(f.team, from); cast.say(f.id, '🛡️ Khiên!'); break;
    case 'attack': if (f.team && f.target) bview.attack(f.team, f.target, f.gift === 'ngua'); if (f.gift === 'ngua') bui.dash('🏇'); cast.say(f.id, f.gift === 'ngua' ? '🏇 Xung phong!' : '⚔️ Đánh!'); cast.cheer(f.id); break;
    case 'blocked': if (f.team && f.target){ const tg = f.target; bview.attack(f.team, tg, false); setTimeout(() => bview.blocked(tg), 800); } break;
    case 'dragon': if (f.team && T){ bview.dragon(f.team); ui.banner('🐉', `${f.name} gọi Rồng!`, `${T.name} sức mạnh x1.5 trong 20 giây`, 'groom'); } break;
    case 'crown': if (T){ ui.banner('👑', `${f.name} làm Chủ soái!`, `${T.name} sức mạnh x2 trong 30 giây`, 'bride'); sparks.burst(from ?? mid, [0xffd45a, 0xfff3b0, 0xffffff], 140, 5); } break;
    case 'ultimate': if (f.team){ bui.ultimate(f.name, f.team); bview.ultimate(f.team); burst = 4; } break;
    case 'win': if (f.team && T){ ui.banner('🏆', `${T.name} chiến thắng!`, 'Trao danh hiệu, pháo hoa và rước dâu', 'groom'); bview.win(f.team); ui.confetti(40, ['🏆', '🎆', '💖', '✨']); burst = 4; } else ui.banner('🤝', 'Hòa!', 'Chưa phe nào có sức mạnh', 'groom'); break;
    case 'end': ui.banner('💒', 'Hết Đại chiến', 'Đám cưới làng quê mở lại', 'bride'); break;
  }
}

// Khách mừng cưới (phong bì) hay thả tim (bó hoa): ra đầu thảm đỏ, đi dọc thảm lên trao tận tay cô dâu chú rể, chúc vài giây rồi về chỗ cũ.
// Tối đa 3 người cùng lúc, đứng chéo hai bên cô dâu chú rể và quay mặt vào, để không che cặp đôi trước camera.
const deliver = new Map<string, { until: number; slot: number; leg: 'carpet' | 'couple' }>();
// 1 xu gọi bia, 5 xu gọi món: anh phục vụ chạy ra bê két bia hay mâm món tới tận mâm của người gọi, đặt xuống, hô to,
// cả mâm nâng ly; xong chạy về. Mâm trong (gần thảm đỏ) thì đi dọc thảm từ cuối sân lên, mâm ngoài thì chạy vào từ mép sân.
// Khung hình anh phục vụ hô tên người gọi hiện ở góc màn hình. Tối đa 6 phục vụ cùng lúc, đông quá thì bia lên mâm luôn.
type Waiter = { kind: 'beer' | 'food'; table: number; caller: string; from: { x: number; z: number; yaw: number }; to: { x: number; z: number; yaw: number }; state: 'go' | 'serve' | 'back'; until: number; born: number };
const waiters = new Map<string, Waiter>();
let waiterSeq = 0;
// mâm của người gọi; chưa có ghế (cô dâu chú rể, người đang đứng) thì mâm gần nhất
function tableNear(id: string){
  let t = tableOf(id);
  const a = cast.actors.get(id);
  if (t < 0 && a) t = MAM.slice(0, tables).reduce((best, m, i) => Math.hypot(m.x - a.x, m.z - a.z) < Math.hypot(MAM[best].x - a.x, MAM[best].z - a.z) ? i : best, 0);
  return Math.max(0, t);
}
function serve(kind: 'beer' | 'food', id: string, name: string){
  const t = tableNear(id);
  ui.waiter(kind, name, t + 1);
  if (waiters.size >= 6 || battleOn()){ bring(kind, t, id); return; }
  const m = MAM[t], side = Math.sign(m.x) || 1, inner = Math.abs(m.x) < 5;
  const to = inner ? { x: m.x - side * 1.25, z: m.z, yaw: side * Math.PI / 2 } : { x: m.x + side * 1.25, z: m.z, yaw: -side * Math.PI / 2 };
  const from = inner ? { x: side * 0.9, z: 23, yaw: 0 } : { x: side * 11.5, z: m.z, yaw: 0 };
  const wid = 'waiter-' + (++waiterSeq), now = performance.now();
  waiters.set(wid, { kind, table: t, caller: id, from, to, state: 'go', until: 0, born: now });
  assign();
  const a = cast.actors.get(wid);
  if (a){ a.load = kind; a.speed = 4.6; cast.say(wid, kind === 'beer' ? '🍺 Có ngay!' : '🍗 Có ngay!', 1600); }
}
// đặt bia, món lên mâm: cả mâm nâng ly uống (bia) hoặc reo lên khen ngon (món)
function bring(kind: 'beer' | 'food', t: number, id: string){
  const m = kind === 'beer' ? stage.addBeer(t) : stage.addFood(t);
  if (!m) return;
  sparks.burst(new THREE.Vector3(m.x, 1.1, m.z), [0xffd45a, 0xfff3b0, 0xffffff], 22, 1.6);
  if (kind === 'beer') sound.beerPop(); else sound.plate();
  const mates = [...seatOf].filter(([, x]) => Math.floor(x / SEATS_PER) === t).map(([gid]) => gid);
  if (!mates.includes(id)) mates.push(id);
  for (const gid of mates){
    const p = cast.actors.get(gid);
    if (!p || p.pose) continue;
    if (kind === 'beer'){
      p.pose = 'toast';
      cast.say(gid, gid === id ? '🍺 Dô! Uống đi anh em!' : Math.random() < 0.5 ? '🍻 Dô!' : '🍺 Một hai ba, dô!', 2600);
      setTimeout(() => { if (p.pose === 'toast') p.pose = ''; }, 3200);
    } else {
      cast.cheer(gid, 1500);
      cast.say(gid, gid === id ? '😋 Món ngon tới rồi!' : Math.random() < 0.5 ? '😋 Ngon quá!' : '🍗 Thơm quá!', 2400);
    }
  }
}
function tickWaiters(now: number){
  let gone = false;
  for (const [wid, w] of waiters){
    const a = cast.actors.get(wid);
    if (!a){ if (now - w.born > 1500){ waiters.delete(wid); bring(w.kind, w.table, w.caller); } continue; }
    const near = (p: { x: number; z: number }) => Math.hypot(a.x - p.x, a.z - p.z) < 0.15;
    if (w.state === 'go' && (near(w.to) || now - w.born > 9000)){
      w.state = 'serve'; w.until = now + 1400; a.load = '';
      cast.say(wid, w.kind === 'beer' ? '🍺 Bia đây! Dô dô!' : '🍗 Món ngon đây!', 1800);
      bring(w.kind, w.table, w.caller);
    } else if (w.state === 'serve' && now > w.until){ w.state = 'back'; a.tx = w.from.x; a.tz = w.from.z; }
    else if (w.state === 'back' && (near(w.from) || now - w.born > 20_000)){ waiters.delete(wid); gone = true; }
  }
  if (gone) assign();
}

// 99 xu: cả đám cưới cùng nâng ly. Mọi người đứng dậy cầm ly bia, MC mời xong thì cả sân hô "Một! Hai! Ba! DZÔ!" ba lần.
// Mỗi tiếng DZÔ cả sân giơ ly lên cao, ly va nhau leng keng, ánh vàng bừng lên trên từng mâm, màn hình rung. Xong ngồi xuống uống.
let toastUntil = 0, toastGo: (() => void) | null = null, toastPose: Anim | '' = '', shakeT = 0;
const toastable = () => [...cast.actors.values()].filter(a => a.role !== 'band' && a.role !== 'waiter' && a.role !== 'extra');
function poseAll(pose: Anim | '', glassMs = 0){
  const now = performance.now();
  toastPose = pose === 'toast' ? '' : pose;
  for (const a of toastable()){ a.pose = pose; if (glassMs) a.glassUntil = now + glassMs; }
}
function startToast(name: string){
  const now = performance.now();
  if (now < toastUntil){ burst = Math.max(burst, 2); sound.clink(6); return; }     // đang nâng ly: quà sau chỉ thêm leng keng
  toastUntil = now + 20_000;
  ui.banner('🍻', `${name} mời cả đám cưới nâng ly!`, 'Đứng dậy nào! Một, hai, ba, DZÔ!', 'groom');
  poseAll('raise', 20_000);
  sound.clink(10);
  let started = false;
  const go = () => {
    if (started) return;
    started = true; toastGo = null;
    sound.hush(9000);
    for (let r = 0; r < 3; r++){
      const b = r * 2300;
      setTimeout(() => { ui.chant('MỘT!'); sound.shout('mot'); }, b);
      setTimeout(() => { ui.chant('HAI!'); sound.shout('hai'); }, b + 450);
      setTimeout(() => { ui.chant('BA!'); sound.shout('ba'); }, b + 900);
      setTimeout(() => dzo(r), b + 1400);
    }
    // xong ba tiếng: ngồi xuống uống cạn, vỗ tay
    setTimeout(() => {
      poseAll('toast', 3500); toastPose = '';
      ui.confetti(30, ['🍻', '🥂', '🎉', '🍺']); sound.applause(3);
      setTimeout(() => { for (const a of toastable()) if (a.pose === 'toast' || a.pose === 'raise') a.pose = ''; toastUntil = 0; assign(); }, 3200);
    }, 2 * 2300 + 2400);
  };
  toastGo = go;
  // giọng MC đang bật thì chờ MC mời xong mới hô; giọng lỗi hay chậm quá thì 7 giây sau vẫn hô
  setTimeout(go, settings.voice && sound.on ? 7000 : 900);
}
// 200 xu: cả sân cùng nhảy nhạc sàn xưa chừng 15 giây. Trời sẩm lại, quả cầu disco gương hạ xuống giữa sân xoay lấp lánh,
// bốn luồng đèn màu quét qua lại, đèn màu hắt xuống sân đổi theo nhịp. Mọi người đứng dậy nhảy: chỉ tay disco, lắc twist, giơ tay lắc lư.
let danceUntil = 0, danceAt = 0;
// đèn sàn nhảy bình thường sáng dịu cho khỏi chói đầu người nhảy; có quà mới bừng sáng mạnh vài giây rồi dịu lại
let discoBoostAt = -1e9;
const discoBoost = () => { discoBoostAt = performance.now(); };
const MOVES: Anim[] = ['disco', 'twist', 'wave'];
const BEAM_COLS = [0xff3ab4, 0x3ae0ff, 0xffe03a, 0x6aff6a];
const discoBall = (() => {
  const g = new THREE.Group();
  // cầu gương: không có ảnh phản chiếu nên tự sáng, đổi màu theo nhịp, mặt gương vẫn lóe theo đèn
  const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 2), new THREE.MeshStandardMaterial({ color: 0xf4f4ff, metalness: 0.25, roughness: 0.25, flatShading: true, emissive: 0x8a8aa0 }));
  const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 6, 6).translate(0, 3.5, 0), new THREE.MeshBasicMaterial({ color: 0x222222 }));
  const beams = BEAM_COLS.map(c => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 1.5, 9, 20, 1, true).translate(0, -4.5, 0), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    g.add(m); return m;
  });
  const lights = BEAM_COLS.slice(0, 2).map(c => { const l = new THREE.PointLight(c, 0, 16, 1.2); scene.add(l); return l; });
  g.add(ball, cord); g.visible = false; scene.add(g);
  return { g, ball, beams, lights };
})();
function startDance(name: string){
  const now = performance.now();
  if (now < danceUntil || floorOn()){ burst = Math.max(burst, 2); discoBoost(); return; }        // đang nhảy (hay đang mở sàn nhảy): quà sau chỉ thêm ánh sáng
  const ms = sound.danceStart() ? 15_000 : (sound.disco(15) || 15) * 1000;   // có bài nhảy thì phát bài đó 15 giây
  danceUntil = now + ms; danceAt = now; discoBoost();
  ui.banner('🕺', `${name} mở sàn nhảy!`, 'Cả sân cùng nhảy nhạc sàn xưa', 'groom');
  ui.confetti(24, ['🕺', '💃', '🎶', '✨']);
  let i = 0;
  for (const a of toastable()) a.pose = MOVES[i++ % MOVES.length];
  discoBall.g.visible = true;
  assign();
  setTimeout(() => {
    for (const a of toastable()) if (MOVES.includes(a.pose as Anim)) a.pose = '';
    for (const l of discoBall.lights) l.intensity = 0;
    danceUntil = 0; if (!floorOn()){ sound.danceStop(); for (const l of discoBall.lights) l.intensity = 0; discoBall.g.visible = false; } assign();
    ui.confetti(20, ['👏', '🎉', '✨']);
  }, ms);
}
function danceFrame(dt: number, now: number){
  if (!discoBall.g.visible) return;
  const t = (now - danceAt) / 1000, beat = t * 124 / 60, pulse = Math.pow(1 - (beat % 1), 3), drop = Math.min(1, t / 1.2);
  // boost: 1 lúc vừa có quà, giữ 3 giây rồi dịu dần trong 2 giây về mức nhẹ
  const since = (now - discoBoostAt) / 1000, boost = since < 3 ? 1 : Math.max(0, 1 - (since - 3) / 2);
  // cầu hạ từ trên cao xuống, xoay chậm
  discoBall.g.position.set(0, 13 - 6.2 * drop, 6);
  discoBall.ball.rotation.y = t * 1.2;
  discoBall.beams.forEach((m, i) => {
    m.rotation.set(0.75 * Math.sin(t * 0.9 + i * 1.7), i * Math.PI / 2 + t * 0.6, 0.75 * Math.cos(t * 0.8 + i * 1.3));
    (m.material as THREE.MeshBasicMaterial).opacity = (0.05 + 0.05 * pulse + boost * (0.05 + 0.11 * pulse)) * drop;
  });
  discoBall.lights.forEach((l, i) => {
    const a = t * 1.3 + i * Math.PI;
    l.position.set(Math.sin(a) * 5, 2.2 + 1.8 * BIG, 7 + Math.cos(a) * 4);   // đặt cao hơn đầu người nhảy
    l.color.setHex(BEAM_COLS[(Math.floor(beat) + i * 2) % BEAM_COLS.length]);
    l.intensity = (8 + 8 * pulse + boost * (17 + 37 * pulse)) * drop;
  });
  (discoBall.ball.material as THREE.MeshStandardMaterial).emissive.setHex(BEAM_COLS[Math.floor(beat) % BEAM_COLS.length]).lerp(new THREE.Color(0x9a9ab0), 0.6);
  if (Math.random() < dt * 30){ const d = new THREE.Vector3().randomDirection().multiplyScalar(0.6); sparks.glow(discoBall.g.position.clone().add(d)); }
  if (Math.random() < dt * 1.5){ const list = toastable(); const a = list[Math.floor(Math.random() * list.length)]; if (a) cast.say(a.id, ['🕺 Quẩy lên!', '💃 Nhảy nào!', '🎶 Nhạc hay quá!', '🔥 Sung quá!'][Math.floor(Math.random() * 4)], 1800); }
}

/* ------------------------------------------------ sàn nhảy sau cắt bánh */
// Cắt bánh xong: mở sàn nhảy 3 phút (tặng quà thì kéo dài thêm). Cả sân rời mâm lên giữa sàn lắc lư theo nhạc sàn xưa, quả cầu disco hạ xuống.
// Thả tim: nhảy theo nhạc. 1 xu: múa đẹp. 10 xu: skill VIP (xoay đầu, lộn nhào, xoay tít). 30 xu: combo nối 4 skill.
// Tặng quà thì máy quay lia tới cận người đó 7 giây rồi quay lại toàn sân; nhiều người tặng thì lần lượt theo hàng.
const FLOOR_C = { x: 0, z: 5.6 };
// chỗ diễn của người tặng quà lúc nhảy: giữa sàn ngay trước cặp đôi, quay mặt về máy quay
const STAGE_SPOT = { x: 0, z: 7.2, yaw: 0 };
const floorOn = () => wedding?.phase === 'married' && wedding.step === 'dance' && !wedding.pk && !battleOn();
const onFloor = new Set<string>();
const moves = new Map<string, { anim: Anim; until: number; rank: number }>();
type Focus = { id: string; name: string; tier: 'pretty' | 'vip' | 'combo'; anim: Anim };
let focus: (Focus & { until: number }) | null = null, focusBack = 0, floorWas = false, floorMusicUntil = 0;
const focusQ: Focus[] = [];
let floorCache: { tables: number; spots: { x: number; z: number; yaw: number }[] } | null = null;
function floorSpots(){
  if (floorCache?.tables === tables) return floorCache.spots;
  const spots: { x: number; z: number; yaw: number }[] = [];
  for (let r = 0; r < 9 && spots.length < 130; r++){
    const R = 1.7 + r * 0.95, n = Math.floor(R * 4.2 / 0.95);
    for (let k = 0; k < n; k++){
      const th = -2.1 + 4.2 * (k + 0.5) / n + (r % 2) * 0.12, x = Math.sin(th) * R, z = FLOOR_C.z - Math.cos(th) * R;
      if (z < 1.4 || Math.abs(x) > 9.5) continue;                       // không lấn lên sân khấu cổng hoa
      if (MAM.slice(0, tables).some(m => Math.hypot(m.x - x, m.z - z) < 2.0)) continue;   // tránh mâm cỗ
      if (BAND.some(b => Math.hypot(b.x - x, b.z - z) < 1.0)) continue;
      spots.push({ x, z, yaw: Math.atan2(FLOOR_C.x - x, FLOOR_C.z + 4 - z) * 0.6 });
    }
  }
  floorCache = { tables, spots };
  return spots;
}
const GROOVES: Anim[] = ['twist', 'disco', 'wave'];
const VIP: Anim[] = ['headspin', 'flip', 'spin'];
function floorLike(id: string){
  const now = performance.now(), m = moves.get(id);
  if (m && m.until > now && m.rank > 0) return;                          // đang ra skill quà thì giữ skill
  moves.set(id, { anim: GROOVES[Math.floor(Math.random() * GROOVES.length)], until: now + 6000, rank: 0 });
}
function danceGift(id: string, name: string, xu: number){
  discoBoost();
  const tier = xu >= WEDDING.danceXu.combo ? 'combo' : xu >= WEDDING.danceXu.vip ? 'vip' : 'pretty';
  const anim: Anim = tier === 'combo' ? 'combo' : tier === 'vip' ? VIP[Math.floor(Math.random() * VIP.length)] : 'pretty';
  cast.say(id, tier === 'combo' ? '🔥 COMBO SKILL!' : tier === 'vip' ? '🌀 Skill VIP!' : '💃 Múa đẹp nè!', 3000);
  // chờ tới lượt quay cận thì vẫn nhảy theo nhạc; hàng đợi đầy thì ra skill luôn tại chỗ
  if (focusQ.length < 5 && focus?.id !== id && !focusQ.some(q => q.id === id)){ focusQ.push({ id, name, tier, anim }); floorLike(id); }
  else moves.set(id, { anim, until: performance.now() + WEDDING.danceFocusMs, rank: 2 });
}
const TIER = { pretty: ['💃', 'múa đẹp', 'Dang tay xoay uyển chuyển'], vip: ['🌀', 'ra skill VIP', 'Xoay đầu, lộn nhào, xoay tít'], combo: ['🔥', 'tung COMBO SKILL', 'Nối 4 skill liên hoàn'] } as const;
function floorFrame(now: number){
  const on = floorOn();
  if (on !== floorWas){ floorWas = on; on ? openFloor() : closeFloor(); }
  if (!on) return;
  // nhạc sàn phát từng đoạn 30 giây nối nhau tới hết giờ nhảy; tặng quà kéo dài giờ nhảy thì nhạc cũng phát tiếp
  if (sound.hasDanceSong){ if (now > floorMusicUntil){ sound.danceStart(); show.dim(31_500, 0.55); floorMusicUntil = now + 30_000; } }
  else if (now > floorMusicUntil - 250){
    const left = (wedding?.stepLeftMs ?? 0) - (now - weddingAt);
    if (left > 3000){ const sec = Math.min(30, Math.round(left / 1000)); floorMusicUntil = now + (sound.disco(sec) || sec) * 1000; show.dim(sec * 1000 + 1500, 0.55); }
    else floorMusicUntil = now + 3000;
  }
  // hết lượt quay cận thì lia về toàn sân, rồi tới người kế tiếp
  if (focus && (now > focus.until || !cast.actors.has(focus.id))){ focus = null; focusBack = now + 1500; document.body.classList.remove('focus'); assign(); }   // diễn xong thì về chỗ cũ
  if (!focus && now > focusBack){
    const q = focusQ.shift();
    if (q && cast.actors.has(q.id)){
      // đi ra giữa sân khấu rồi mới tính 7 giây quay cận
      const at = cast.actors.get(q.id)!, walk = seatOf.has(q.id) ? Math.hypot(at.x - STAGE_SPOT.x, at.z - STAGE_SPOT.z) / Math.max(1, at.speed) * 1000 : 0;
      focus = { ...q, until: now + walk + WEDDING.danceFocusMs };
      moves.set(q.id, { anim: q.anim, until: focus.until, rank: 2 });
      document.body.classList.add('focus');
      assign();
      const [icon, verb, sub] = TIER[q.tier];
      ui.banner(icon, `${q.name} ${verb}!`, sub, 'groom');
      const a = cast.actors.get(q.id)!;
      const hits = q.tier === 'combo' ? 4 : 1;
      for (let i = 0; i < hits; i++) setTimeout(() => {
        const p = cast.actors.get(q.id); if (!p) return;
        sparks.burst(new THREE.Vector3(p.x, 1.4, p.z), q.tier === 'combo' ? [0xff4a2a, 0xffd45a, 0xffffff] : q.tier === 'vip' ? [0xa05aff, 0x3ae0ff, 0xffffff] : [0xff7ab8, 0xffd0e6, 0xffffff], q.tier === 'combo' ? 50 : 35, 2.6);
        sound.boom(); burst = Math.max(burst, q.tier === 'combo' ? 3 : 2);
      }, i * 1600);
      if (q.tier === 'combo'){ ui.confetti(24, ['🔥', '💥', '✨', '💃']); shakeT = 0.3; }
      cast.say(a.id, `${icon} Xem tôi nè!`, 2500);
    }
  }
  // ai cũng nhảy: chưa có quà thì lắc lư, thả tim thì nhảy theo nhạc, quà thì ra skill
  for (const id of onFloor){
    const a = cast.actors.get(id); if (!a) continue;
    const m = moves.get(id);
    a.pose = m && m.until > now ? m.anim : a.role === 'bride' ? 'wave' : a.role === 'groom' ? 'disco' : 'groove';
  }
}
function openFloor(){
  floorMusicUntil = 0;
  discoBall.g.visible = true; danceAt = performance.now();
  ui.banner('💃', 'Sàn nhảy mở! Mời cả làng lên nhảy', '❤️ Thả tim nhảy · 1 xu múa đẹp · 10 xu skill VIP · 30 xu combo', 'groom');
  ui.confetti(30, ['🕺', '💃', '🎶', '✨']);
  burst = Math.max(burst, 2.5);
  assign();
}
function closeFloor(){
  for (const id of onFloor){ const a = cast.actors.get(id); if (a) a.pose = ''; }
  if (!danceUntil) sound.danceStop();
  onFloor.clear(); moves.clear(); focusQ.length = 0; focus = null; focusBack = performance.now() + 1500;
  document.body.classList.remove('focus');
  if (!danceUntil){ for (const l of discoBall.lights) l.intensity = 0; discoBall.g.visible = false; }
  assign();
}

function dzo(round: number){
  ui.chant(round === 2 ? 'DZÔ!!!' : 'DZÔ!', true);
  sound.shout('do', round === 2 ? 1.5 : 1.25); sound.clink(16);
  poseAll('cheer'); setTimeout(() => { if (toastUntil) poseAll('raise'); }, 750);
  let n = 0;
  for (const a of toastable()) if (n++ % 2 === round % 2 && n < 60) cast.say(a.id, round === 2 ? '🍻 DZÔ!!!' : '🍻 DZÔ!', 900);
  for (let i = 0; i < tables; i++) sparks.burst(new THREE.Vector3(MAM[i].x, 1.9, MAM[i].z), [0xffd45a, 0xfff3b0, 0xffffff], 12, 1.8);
  const c = coupleAt();
  if (c) sparks.burst(new THREE.Vector3(c.x, 2.2, c.z), [0xffd45a, 0xffffff], 30, 2.4);
  burst = Math.max(burst, round === 2 ? 4 : 3); shakeT = round === 2 ? 0.5 : 0.35;
  if (round === 2){ fw.salvo(2, 600); }
}

// Đủ cô dâu chú rể: cả sân đứng dậy vỗ tay reo hò, pháo giấy, pháo dây nổ ran hai bên thảm đỏ, pháo hoa bắn sáu quả
function celebrate(){
  sound.applause(6); sound.firecrackers(3.5);
  let n = 0;
  for (const a of cast.actors.values()){
    if (a.role === 'band' || a.role === 'bride' || a.role === 'groom') continue;
    cast.cheer(a.id, 6000);
    if (n++ < 24) cast.say(a.id, ['👏 Hoan hô!', '👏👏', '🎉 Chúc mừng!', '💖 Đẹp đôi quá!'][n % 4], 3500 + Math.random() * 2000);
  }
  show.dim(7000, 0.6); fw.salvo(6, 4500); paperBlast(null);
  for (let k = 0; k < 30; k++) setTimeout(() => {
    const side = k % 2 ? 1 : -1;
    sparks.burst(new THREE.Vector3(side * 1.7, 0.4, 3 + Math.random() * 11), [0xff3a2a, 0xffd45a, 0xffffff], 10, 2.6);
  }, k * 110);
  ui.confetti(44, ['🎉', '🎊', '👏', '💖', '🧧']);
  burst = 4;
}

function coupleAt(){
  const b = wedding?.bride ? cast.actors.get(wedding.bride.id) : undefined, gr = wedding?.groom ? cast.actors.get(wedding.groom.id) : undefined;
  if (b && gr) return { x: (b.tx + gr.tx) / 2, z: (b.tz + gr.tz) / 2 };
  const one = b ?? gr;
  return one ? { x: one.tx, z: one.tz } : null;
}
// Đường đi tặng quà: từ chỗ ngồi ra đầu thảm đỏ (phía người xem), rồi đi dọc thảm lên trước mặt cô dâu chú rể
const CARPET_HEAD = 16.4, GIVE_SPEED = 3;
const headSpot = (slot: number) => ({ x: [-0.45, 0.45, 0][slot], z: CARPET_HEAD + (slot === 2 ? 0.7 : 0), yaw: Math.PI });
function coupleSpot(slot: number, c: { x: number; z: number }){
  const x = c.x + [-1.6, 1.6, -2.35][slot], z = c.z + (slot === 2 ? 1.0 : 0.6);
  return { x, z, yaw: Math.atan2(c.x - x, c.z - z) };
}
function handSpot(id: string){
  const d = deliver.get(id), c = coupleAt();
  if (!d || !c || performance.now() > d.until) return null;
  return d.leg === 'carpet' ? headSpot(d.slot) : coupleSpot(d.slot, c);
}
// kind 'flower': thả tim thì cầm bó hoa lên tặng; 'envelope': quà mừng (hay thả tim lúc trao nhẫn) thì cầm phong bì đỏ;
// 'gold': lúc trao nhẫn tặng từ 10 xu thì nâng thỏi vàng lên, 10 xu là 1 chỉ vàng.
// Thả tim (like) chỉ đi khi còn ít nhất 2 chỗ trống trước mặt cặp đôi, chừa chỗ cho người tặng quà.
const chiVang = (xu: number) => Math.max(1, Math.floor(xu / 10));
function handOver(id: string, xu: number, kind: 'flower' | 'envelope' | 'gold' = 'envelope', like = false){
  if (!wedding || wedding.phase === 'done' || wedding.bride?.id === id || wedding.groom?.id === id) return false;
  const a = cast.actors.get(id), c = coupleAt();
  const now = performance.now();
  if (!a || !c || (deliver.get(id)?.until ?? 0) > now) return false;
  const busy = new Set([...deliver.values()].filter(d => d.until > now).map(d => d.slot));
  const slot = [0, 1, 2].find(x => !busy.has(x));
  if (slot === undefined || (like && busy.size > 1)) return false;   // trước mặt đã đủ người: chúc từ chỗ ngồi
  const h = headSpot(slot), e = coupleSpot(slot, c);
  const t1 = Math.hypot(h.x - a.x, h.z - a.z) / GIVE_SPEED * 1000, t2 = Math.hypot(e.x - h.x, e.z - h.z) / GIVE_SPEED * 1000, stay = 3500;
  deliver.set(id, { until: now + t1 + t2 + stay, slot, leg: 'carpet' });
  a.hold = kind; a.speed = GIVE_SPEED;
  assign();
  setTimeout(() => { const d = deliver.get(id); if (d){ d.leg = 'couple'; assign(); } }, t1);
  setTimeout(() => {
    const p = cast.actors.get(id), m = coupleAt();
    if (!p || !m) return;
    p.hold = '';                                                 // đã trao tận tay
    cast.say(id, kind === 'flower' ? '💐 Tặng hoa cô dâu chú rể!' : kind === 'gold' ? `🥇 Trao ${chiVang(xu)} chỉ vàng!` : like ? '🧧 Phong bì mừng cưới!'
      : xu >= 100 ? '💝 Chúc trăm năm hạnh phúc!' : '🧧 Chúc mừng hạnh phúc!', stay);
    if (wedding?.bride) cast.cheer(wedding.bride.id, 2500);
    if (wedding?.groom) cast.cheer(wedding.groom.id, 2500);
    if (kind === 'flower') sparks.hearts(new THREE.Vector3(m.x, 1.8, m.z));
    else { sparks.envelope(new THREE.Vector3(p.x, 1.4, p.z), new THREE.Vector3(m.x, 1.5, m.z)); sound.coin(); }
    sparks.burst(new THREE.Vector3(m.x, 1.8, m.z), kind === 'flower' ? [0xff7a9a, 0xffc0d0, 0xffffff] : kind === 'gold' ? [0xffd45a, 0xfff3b0, 0xffc83a, 0xffffff] : [0xffd45a, 0xff7a9a, 0xffffff], kind === 'gold' ? 30 + Math.min(60, chiVang(xu) * 6) : 30, 2.5);
  }, t1 + t2);
  setTimeout(() => { const p = cast.actors.get(id); if (p){ p.hold = ''; p.speed = 2.4; } deliver.delete(id); assign(); }, t1 + t2 + stay + 50);
  return true;
}
// Thả tim: người thả tim cầm hoa đi lên tặng, mỗi người tối đa một lần mỗi 40 giây cho sân khỏi rối.
// Lúc trao nhẫn thì thả tim là cầm phong bì lên trao, mỗi người một lần mỗi 15 giây.
const flowerAt = new Map<string, number>();
const ringsOn = () => wedding?.phase === 'married' && wedding.step === 'rings' && !wedding.pk && !battleOn();
function giveFlower(id: string){
  if (floorOn()){ floorLike(id); return; }                       // sàn nhảy: thả tim là nhảy theo nhạc
  if (!wedding || wedding.phase !== 'married' || wedding.pk || battleOn()) return;
  const now = performance.now(), rings = ringsOn();
  if (now - (flowerAt.get(id) ?? -1e9) < (rings ? 15_000 : 40_000)) return;
  if (handOver(id, 0, rings ? 'envelope' : 'flower', true)) flowerAt.set(id, now);
  if (flowerAt.size > 300) flowerAt.delete(flowerAt.keys().next().value as string);
}

function onFx(f: Fx){
  const pos = (id: string) => { const a = cast.actors.get(id); return a ? new THREE.Vector3(a.x, 1.6, a.z) : null; };
  const mid = new THREE.Vector3(0, 1.8, COUPLE.bride.z);
  switch (f.k){
    case 'wedding': {
      if (f.ev === 'mc'){ mcCaption(f.text); cast.cheer(f.id, 2500); return; }
      // thêm giờ: amount là số giây, không phải số xu
      if (f.ev === 'time'){ ui.feed(f.text, 'note'); sound.coin(); cast.say(f.id, `⏰ +${f.amount ?? 20} giây`); const p = cast.actors.get(f.id); if (p) sparks.burst(new THREE.Vector3(p.x, 2, p.z), [0xffd45a, 0x7ad0ff], 30, 2); return; }
      if (f.ev === 'ask'){ ui.waiterAsk(f.text); sound.show('beer'); return; }   // lâu chưa ai gọi bia: anh phục vụ đi mời
      if (f.ev === 'guest'){
        const r = topIds.indexOf(f.id);
        if (r >= 0){
          ui.banner(MEDALS[r], `Top ${r + 1} quà cưới tháng ${f.name} đã tới!`, 'Cả sân vỗ tay chào đón', 'bride');
          cast.say(f.id, `${MEDALS[r]} Chào cả nhà!`, 4000); sound.wedding('bride'); sound.applause(3);
          const p = pos(f.id); if (p) sparks.burst(p, [TOP_COLORS[r], 0xffffff, 0xffd45a], 80, 3.5);
          ui.confetti(24, [MEDALS[r], '✨', '👏']);
          for (const a of cast.actors.values()) if (a.role === 'seat' || a.role === 'guest') cast.cheer(a.id, 2500);
        } else { cast.say(f.id, 'Chào cả nhà! 👋', 3500); greetName(f.name); }
        return;
      }
      ui.feed(f.text, f.ev === 'mung' ? 'gift' : 'note');
      sound.wedding(f.ev);
      // có đủ đôi thì bắt đầu lễ: pháo hoa; mới có một người thì mời người còn lại
      const both = (f.ev === 'bride' || f.ev === 'groom') && !!f.other;
      if ((f.ev === 'bride' || f.ev === 'groom') && f.auto){ sound.wedding('steal'); sparks.burst(mid, [0xffd45a, 0xff7ab8, 0xffffff], 80, 4); }   // làng tự chọn: trống dồn, tung lấp lánh
      if (f.ev === 'bride') ui.banner('👰', f.auto ? `🎲 ${f.name} được chọn làm cô dâu!` : `${f.name} làm cô dâu!`, f.other ? `Về bên chú rể ${f.other}, lễ thành hôn bắt đầu` : `Bạn nam: bình luận "nam" rồi tặng đúng ${WEDDING.joinXu} xu để làm chú rể`, 'bride');
      if (f.ev === 'groom') ui.banner('🤵', f.auto ? `🎲 ${f.name} được chọn làm chú rể!` : `${f.name} làm chú rể!`, f.other ? `Rước cô dâu ${f.other}, lễ thành hôn bắt đầu` : `Bạn nữ: bình luận "nữ" rồi tặng đúng ${WEDDING.joinXu} xu để làm cô dâu`, 'groom');
      if (f.ev === 'bride' || f.ev === 'groom'){ sparks.hearts(mid); burst = 2; if (both) celebrate(); }
      if (f.ev === 'steal'){ ui.banner(f.role === 'bride' ? '💃' : '🏃', f.role === 'bride' ? `${f.name} cướp rể!` : `${f.name} cướp dâu!`, f.role === 'bride' ? `Giành chú rể từ tay ${f.other ?? ''}` : `Giành cô dâu từ tay ${f.other ?? ''}`, 'steal'); sparks.burst(mid, [0xff4a4a, 0xffe07a], 80, 6); }
      if (f.ev === 'outfit'){ cast.say(f.id, '👗 Áo mới!'); cast.cheer(f.id); const p = pos(f.id); if (p) sparks.burst(p, [0xff8ad0, 0x7ad0ff, 0xffd45a, 0xffffff], 40, 2.5); break; }
      // sàn nhảy: quà nhỏ ra skill nhảy và máy quay cận người tặng; từ 99 xu vẫn có thêm màn quà riêng
      if (f.ev === 'mung' && floorOn()){
        danceGift(f.id, f.name, f.amount ?? 0);
        if ((f.amount ?? 0) >= 99){ show.play(f.amount!, f.id, f.name, pos(f.id), mid); burst = Math.max(burst, 1.5); env.celebrate(Math.min(3, f.amount! / 300)); }
        break;
      }
      if (f.ev === 'mung'){
        // bia, món thì gọi phục vụ tại mâm; từ 10 xu là quà mừng: đi lên trao tận tay cô dâu chú rể
        const key = showFor(f.amount ?? 0).at(-1)?.key;
        // lúc trao nhẫn: từ 10 xu là trao chỉ vàng, 10 xu một chỉ
        const gold = ringsOn() && (f.amount ?? 0) >= 10;
        cast.say(f.id, gold ? `🥇 ${chiVang(f.amount ?? 0)} chỉ vàng mừng cưới!` : key ? SAYS[key] ?? `🧧 Mừng cưới ${f.amount ?? ''} xu` : '🧧', 3000); cast.cheer(f.id);
        if (gold) ui.feed(`🥇 ${f.name} trao ${chiVang(f.amount ?? 0)} chỉ vàng cho cô dâu chú rể`, 'gift');
        if (key !== 'beer' && key !== 'food') handOver(f.id, f.amount ?? 0, gold ? 'gold' : 'envelope');
      }
      // quà nào cũng có hiệu ứng mừng cưới theo số xu, đúng như Bảng quà
      if (f.amount){ show.play(f.amount, f.id, f.name, pos(f.id), mid); burst = Math.max(burst, 1.5); if (f.amount >= 99) env.celebrate(Math.min(3, f.amount / 300)); }
      if (f.ev === 'end'){ ui.banner('💑', 'Trăm năm hạnh phúc!', `${f.name} và ${f.other ?? ''} nắm tay nhau vào nhà`, 'groom'); show.dim(8000, 0.7); fw.salvo(6, 5000); sparks.hearts(mid); burst = 4; }
      break;
    }
    case 'gift': { const a = cast.actors.get(f.id); if (a){ a.giftAt = performance.now(); cast.cheer(f.id); } break; }
    case 'act': if (f.act === 'chat' && f.bubble) cast.say(f.id, f.bubble); break;
    case 'like': hearts(f.id, f.count); setTimeout(() => giveFlower(f.id), 300); break;   // chờ khách vào chỗ ngồi đã
    case 'voice': {
      // tiếng phục vụ hô không hiện phụ đề MC (đã có khung anh phục vụ); câu mời nâng ly đọc xong thì cả sân hô
      const text = f.text, boy = f.who === 'boy', end = f.tag === 'toast' ? () => toastGo?.() : undefined;
      if (!sound.voice(f.url, () => { if (!boy) showSpoken(text); }, end, f.tag === 'chat' ? 12_000 : 0, f.tag ?? '')){ if (!boy && waitingMc.has(text)) showSpoken(text); end?.(); }   // không phát được (hàng đợi đầy) thì hiện chữ luôn
      break;
    }
    case 'fireworks': if (!wedding?.pk) fw.salvo(2, 1200); break;      // đang PK: để thấy rõ màn đánh nhau
    case 'battle': onBattleFx(f, pos(f.id), mid); break;
    case 'pk': onPkFx(f); break;
  }
}

// PK cướp dâu, cướp rể
function onPkFx(f: Extract<Fx, { k: 'pk' }>){
  const pk = wedding?.pk ?? lastPk;
  if (!pk) return;
  const def = pk.kind === 'dau' ? 'Đội Dâu' : 'Đội Rể';
  switch (f.ev){
    case 'start':
      ui.banner('⚔️', `${f.name} xông lên ${pk.kind === 'dau' ? 'cướp dâu' : 'cướp rể'}!`, `Bình luận 1 vào ${def} · 2 vào Đội Cướp · PK 2 phút`, 'steal');
      ui.feed(f.text, 'note'); pkView.start(pk.thief.id, pk.holder.id, pk.stolen.id); burst = 2.5; assign();
      break;
    case 'join': cast.say(f.id, f.team === 'def' ? `💍 Vào ${def}!` : '🎭 Theo Đội Cướp!', 2500); cast.cheer(f.id, 1500); break;
    case 'hit': {
      ui.feed(f.text, 'gift'); cast.cheer(f.id, 1500);
      if (!f.skill || !f.target || !f.team) break;
      const leader = f.team === 'def' ? pk.holder.id : pk.thief.id;
      // đánh hội đồng: người tặng lao vào cùng thủ lĩnh; người tặng chính là thủ lĩnh thì gọi thêm một người cùng đội
      let helper: string | null = f.id !== leader && f.id !== f.target && cast.actors.has(f.id) ? f.id : null;
      if (!helper && f.skill === 'hoidong') helper = [...pkTeam].find(([id, t]) => t === f.team && id !== leader && id !== f.target && cast.actors.has(id))?.[0] ?? null;
      pkView.hit(f.skill, leader, f.target, f.id, helper);
      break;
    }
    case 'tick': ui.banner('⏰', `Còn ${f.amount} giây!`, f.text.replace(/^⏰ Còn \d+ giây! /, ''), 'steal'); sound.boom(); break;
    case 'end':
      pkView.end(f.win ?? 'def', pk.thief.id, pk.holder.id);
      if (f.win === 'cuop'){ ui.banner('🏆', 'Đội Cướp thắng!', `${pk.thief.name} ${pk.kind === 'dau' ? 'cướp dâu' : 'cướp rể'} thành công`, 'steal'); fw.salvo(3, 2000); ui.confetti(30, ['🎭', '💥', '🏆']); }
      else { ui.banner('🛡️', `${def} thắng!`, `${pk.thief.name} bị đuổi về mâm, đám cưới tiếp tục`, 'groom'); paperBlast(null); ui.confetti(30, ['💍', '🛡️', '🎉']); }
      ui.feed(f.text, 'note'); burst = 3; lastPk = null;
      break;
  }
}

// Câu khách nói trên đầu khi tặng quà theo mức
const SAYS: Partial<Record<string, string>> = { beer: '🍺 Em ơi, cho bia!', food: '🍗 Thêm món nhé!', confetti: '🎉 Bùm! Pháo giấy!', fireworks: '🎆 Pháo hoa đây!', toast: '🍻 Cả nhà nâng ly nào!' };

/* ----------------------------------------------------------- labels */
const TAGS = 140, tagPool: { box: HTMLDivElement; nm: HTMLSpanElement; bb: HTMLSpanElement; id: string; role: string; w: number; h: number }[] = [];
for (let i = 0; i < TAGS; i++){
  const box = el('div', 'tag') as HTMLDivElement, bb = el('span', 'bb') as HTMLSpanElement, nm = el('span', 'nm') as HTMLSpanElement;
  box.append(bb, nm); box.style.display = 'none'; $('labels').append(box); tagPool.push({ box, nm, bb, id: '', role: '', w: -1, h: 0 });
}
const _p = new THREE.Vector3();
function drawLabels(now: number){
  let n = 0;
  for (const a of cast.labeled(now)){
    _p.set(a.x, (2.15 * a.look.scale * (a.role === 'bride' || a.role === 'groom' ? 1.12 : 1) + (a.role === 'seat' ? -0.2 : 0)) * BIG, a.z).project(camera);
    if (_p.z > 1 || Math.abs(_p.x) > 1.05 || Math.abs(_p.y) > 1.05) continue;
    // PK: chỉ hiện tên ba nhân vật chính và người đang nói, vừa ra chiêu, cho đỡ rối sân đấu
    if (wedding?.pk && !battleOn() && a.id !== wedding.pk.thief.id && a.id !== wedding.pk.holder.id && a.id !== wedding.pk.stolen.id && now > a.bubbleUntil && now - a.giftAt > 4000) continue;
    const t = tagPool[n++];
    const team = battleOn() ? battleTeam.get(a.id) : undefined, boss = !!team && battle!.teams[team].leader?.id === a.id;
    const pt = !battleOn() && wedding?.pk ? pkTeam.get(a.id) : undefined;   // PK: tên đội bảo vệ màu hồng, Đội Cướp màu tím
    const rank = cast.ranks.get(a.id) ?? 0;
    const key = a.role + (show.vip.has(a.id) ? ' vip' : '') + (team ?? '') + (boss ? '!' : '') + (pt ?? '') + rank;
    if (t.id !== a.id || t.role !== key){ t.id = a.id; t.role = key; t.w = -1; t.nm.textContent = (boss && team ? (battle!.teams[team].leader!.crown ? '👑 ' : '') + TEAMS[team].icon + ' ' : a.role === 'bride' ? '👰 ' : a.role === 'groom' ? '🤵 ' : '') + a.name; if (players.get(a.id)?.sim) t.nm.append(el('i', 'demo', 'DEMO')); t.box.className = 'tag' + (a.role === 'bride' || a.role === 'groom' ? ' ' + a.role : ' guest') + (show.vip.has(a.id) ? ' vip' : '') + (team ? ' team-' + team : '') + (pt ? (pt === 'def' ? ' team-gai' : ' team-cuop') : ''); if (pt && a.role !== 'bride' && a.role !== 'groom') t.nm.prepend(pt === 'def' ? '💍 ' : '🎭 '); if (rank){ t.nm.prepend(MEDALS[rank - 1] + ' '); t.box.classList.add('top' + rank); } }
    const bubble = now < a.bubbleUntil ? a.bubble : '';
    if (t.bb.textContent !== bubble){ t.bb.textContent = bubble; t.w = -1; }
    t.box.style.display = '';
    // đặt đúng điểm ảnh nguyên (không lẻ nửa điểm ảnh) cho chữ tên không bị nhòe
    if (t.w < 0) t.w = t.box.offsetWidth, t.h = t.box.offsetHeight;
    t.box.style.transform = `translate(${Math.round((_p.x + 1) / 2 * view.w - t.w / 2)}px, ${Math.round((1 - _p.y) / 2 * view.h - t.h)}px)`;
    if (n >= TAGS) break;
  }
  for (let i = n; i < TAGS; i++) if (tagPool[i].box.style.display !== 'none'){ tagPool[i].box.style.display = 'none'; tagPool[i].id = ''; }
}

let heartBudget = 0;
function hearts(id: string, count: number){
  const a = cast.actors.get(id);
  let x = view.w * 0.85, y = view.h * 0.7;
  if (a){ _p.set(a.x, 2, a.z).project(camera); x = (_p.x + 1) / 2 * view.w; y = (1 - _p.y) / 2 * view.h; }
  for (let i = 0; i < Math.min(4, Math.ceil(count / 10)) && heartBudget < 40; i++){
    heartBudget++;
    const h = el('span', 'heart', ['❤️', '💗', '💕', '🌸'][Math.floor(Math.random() * 4)]);
    h.style.left = `${x + (Math.random() - 0.5) * 20}px`; h.style.top = `${y}px`; h.style.setProperty('--dx', `${(Math.random() - 0.5) * 60}px`);
    $('hearts').append(h);
    setTimeout(() => { h.remove(); heartBudget--; }, 1800);
  }
}

/* ------------------------------------------------------- sim panel */
let simBuilt = false;
function buildSimPanel(){
  if (simBuilt) return;
  simBuilt = true;
  const sim = $('sim'), body = $('simBody');
  sim.hidden = false; body.hidden = !(store('simOpen') ?? true);
  $('simToggle').onclick = () => { body.hidden = !body.hidden; store('simOpen', !body.hidden); };
  const button = (t: string, fn: () => void, cls = 'btn2 ghost') => { const b = el('button', cls, t); b.onclick = fn; return b; };
  const line = (...k: HTMLElement[]) => { const d = el('div', 'line'); d.append(...k); return d; };
  const section = (key: string, title: string, open: boolean, ...kids: HTMLElement[]) => {
    const d = el('details') as HTMLDetailsElement; d.open = store('sec.' + key) ?? open; d.ontoggle = () => store('sec.' + key, d.open);
    d.append(el('summary', '', title), ...kids); return d;
  };
  const user = el('input') as HTMLInputElement; user.placeholder = '@username TikTok'; user.value = store('ttUser') ?? '';
  const status = el('div', 'note'); status.id = 'ttStatus';
  const name = el('input') as HTMLInputElement; name.value = store('simName') ?? 'Bạn'; name.onchange = () => store('simName', name.value);
  const who = () => { const n = name.value.trim() || 'Bạn'; return { id: n, name: n }; };
  const say = (text: string) => net.send({ t: 'sim', kind: 'comment', ...who(), text });
  const chats = el('div', 'acts');
  for (const c of ['nam', 'nữ', '1', '2', 'Chúc mừng hạnh phúc!', 'ĂN CỖ', 'Đẹp đôi quá']) chats.append(button(c, () => say(c), ''));
  const free = el('input') as HTMLInputElement; free.placeholder = 'Bình luận tự do, Enter để gửi';
  free.onkeydown = e => { if (e.key === 'Enter' && free.value.trim()){ say(free.value.trim()); free.value = ''; } };
  const social = el('div', 'acts');
  social.append(button('👋 Vào', () => net.send({ t: 'sim', kind: 'join', ...who() }), ''), button('❤️ Tim', () => net.send({ t: 'sim', kind: 'like', ...who(), count: 30 }), ''),
    button('📣 Chia sẻ', () => net.send({ t: 'sim', kind: 'share', ...who() }), ''));
  const gifts = el('div', 'giftGrid');
  for (const [icon, g, d] of [['🌹', 'Hoa hồng', 1], ['🍬', 'Kẹo', 5], ['🍦', 'Kem', 10], ['🎩', 'Mũ', 30], ['🧴', 'Nước hoa', 50], ['🎀', 'Nơ', 52], ['🍻', 'Nâng ly', 99], ['💍', 'Nhẫn', 100], ['🐶', 'Cún con', 199], ['👑', 'Vương miện', 299], ['🎆', 'Pháo hoa', 500]] as [string, string, number][]){
    const b = el('button', 'gb'); b.onclick = () => net.send({ t: 'sim', kind: 'gift', ...who(), gift: g, diamonds: d, count: 1 });
    b.append(el('span', 'gn', `${icon} ${g}`), el('b', 'gx', `${d} xu`)); gifts.append(b);
  }
  const toggle = (key: 'voice' | 'readChat', text: string) => {
    const lab = el('label', 'toggle'), box = el('input') as HTMLInputElement;
    box.type = 'checkbox'; box.id = 'set_' + key; box.checked = settings[key];
    box.onchange = () => net.send({ t: 'ctl', cmd: 'settings', settings: { [key]: box.checked } });
    lab.append(box, document.createTextNode(text)); return lab;
  };
  const live = el('a', 'note', '↗ Mở màn hình LIVE 9:16') as HTMLAnchorElement;
  live.href = '/?live=1'; live.onclick = e => { e.preventDefault(); window.open('/?live=1', 'cuoi-live', 'width=540,height=960'); };
  const stats = el('div', 'stats'); stats.id = 'simStats';
  body.replaceChildren(
    section('tt', 'Kết nối TikTok LIVE', true, line(user, button('Kết nối', () => { store('ttUser', user.value); net.send({ t: 'ctl', cmd: 'connect', user: user.value }); }, 'btn2'), button('Ngắt', () => net.send({ t: 'ctl', cmd: 'disconnect' }))), status),
    section('play', 'Thử như người xem', true, line(el('span', 'lbl', 'Tên'), name), chats, free, social, el('div', 'lbl2', 'Tặng quà (xu TikTok)'), gifts),
    section('cuoi', 'Đám cưới', false, line(button('🔄 Mở đám cưới mới', () => net.send({ t: 'ctl', cmd: 'newWedding' }))),
      line(button('⚔️ Bắt đầu Đại chiến (12 phút)', () => net.send({ t: 'ctl', cmd: 'battleStart' }), 'btn2'), button('⏹ Dừng', () => net.send({ t: 'ctl', cmd: 'battleStop' }))),
      toggle('voice', 'Giọng MC đọc tên'), toggle('readChat', 'Đọc bình luận của người xem')),
    live, stats,
  );
  status.textContent = liveState.status === 'idle' ? 'Chưa kết nối. Các nút bên dưới chỉ để thử khi chưa live, kết nối TikTok rồi thì bị khóa.' : liveState.status;
}
function store(k: string, v?: unknown){
  try {
    if (v === undefined){ const s = localStorage.getItem('cuoi.' + k); return s === null ? null : JSON.parse(s); }
    localStorage.setItem('cuoi.' + k, JSON.stringify(v));
  } catch { /* chế độ riêng tư */ }
  return null;
}

/* ------------------------------------------------------------ sound */
const soundBtn = $('soundBtn'), musicBtn = $('musicBtn');
soundBtn.onclick = () => { if (sound.on){ sound.stop(); soundBtn.textContent = '🔈'; } else { sound.start(); soundBtn.textContent = '🔊'; } };
sound.setMusic(store('music') ?? true);
musicBtn.style.opacity = sound.music ? '1' : '0.45';
musicBtn.onclick = () => { sound.setMusic(!sound.music); store('music', sound.music); if (sound.music && !sound.on){ sound.start(); soundBtn.textContent = '🔊'; } musicBtn.style.opacity = sound.music ? '1' : '0.45'; };
if (LIVE){ sound.start(); soundBtn.textContent = '🔊'; addEventListener('pointerdown', () => sound.start(), { once: true }); }

/* ------------------------------------------------------------- loop */
net.onHello = onHello;
net.onDelta = apply;
net.onStatus = up => ui.offline(!up);
net.connect();

let last = performance.now(), fps = 60, burst = 0, uiClock = 0, assignClock = 0;
function frame(now: number){
  const dt = Math.min(0.25, Math.max(0, (now - last) / 1000)); last = now;
  fps += ((1 / Math.max(dt, 1e-3)) - fps) * 0.05;
  if (document.visibilityState === 'visible' && now > 8000) adaptQuality(dt);
  shared.time.value = now / 1000; shared.wind.value = 0.35;
  burst = Math.max(0, burst - dt);
  aimCamera(dt);
  if (bview.shake > 0){ camera.position.x += (Math.random() - 0.5) * bview.shake * 0.35; camera.position.y += (Math.random() - 0.5) * bview.shake * 0.25; }
  if (shakeT > 0){ shakeT -= dt; camera.position.x += (Math.random() - 0.5) * shakeT * 0.5; camera.position.y += (Math.random() - 0.5) * shakeT * 0.4; }   // DZÔ: rung màn hình
  const featured = wedding?.phase === 'married' ? (wedding.step === 'introBride' ? wedding.bride : wedding.step === 'introGroom' ? wedding.groom : null) : null;
  const fa = featured ? cast.actors.get(featured.id) : null;
  spot.intensity += ((fa ? 60 : 0) - spot.intensity) * Math.min(1, dt * 2);
  if (fa){ spot.target.position.set(fa.x, 1, fa.z); spot.position.set(fa.x, 9, fa.z + 7); if (Math.random() < dt * 6) sparks.burst(new THREE.Vector3(fa.x, 2.4, fa.z), [0xfff3b0, 0xffd45a], 3, 1.2); }
  const glow = env.update(dt, now);
  stage.setGlow(glow, now / 1000, glow > 1.05);
  stage.nature.update(dt, now / 1000, camera, env.day, env.sunDir, env.warm);
  bloom.strength = 0.22 + env.night * 0.14; bloom.threshold = 0.92 - env.night * 0.04;
  grade.uniforms.uWarm.value = env.warm; grade.uniforms.uNight.value = env.night;
  stage.update(dt, now / 1000, burst);
  cast.update(dt, now);
  sparks.update(dt);
  fw.update(dt, camera, renderer);
  paper.update(dt, now);
  pkView.update(dt, now);
  auras(dt, now);
  danceFrame(dt, now); floorFrame(now);
  tickWaiters(now);
  show.update(dt, now);
  bview.update(dt, now, battle, now - battleAt);
  document.body.classList.toggle('climax', battleOn() && !!battle?.climax);
  document.body.classList.toggle('showtime', now < show.wideUntil);
  if ((uiClock -= dt) <= 0){ if (battleOn()) bui.render(battle!, now - battleAt); else if (wedding){ ui.wedding(wedding, now - weddingAt); if (wedding.pk) pkUi.render(wedding.pk, now - weddingAt); } uiClock = 1; }
  if ((assignClock -= dt) <= 0){ assign(); assignClock = 3; }
  sound.ambience(dt, 0, false);
  if (composer) composer.render(); else renderer.render(scene, camera);
  drawLabels(now);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

