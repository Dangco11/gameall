import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { BAR, BAR_GIFTS, DRINKS, drinkOf } from '../../shared/bar.ts';
import type { BarFx, BarState, Delta, Fx, Settings, Snapshot } from '../../shared/types.ts';
import { BarSound } from './sound.ts';
import { Net } from './net.ts';
import { loadModels, preloadProps } from '../rig/glb.ts';
import { City } from './city.ts';
import { Club } from './club.ts';
import { DRINK_KEYS, drinkUrl } from './drinks.ts';
import { GiftFx } from './fx.ts';
import { DanceFx } from './danceFx.ts';
import { PROCEDURAL_DANCES } from './dances.ts';
import { DANCES, DANCE_GROUPS } from '../../shared/dances.ts';
import { levelInfo } from '../../shared/levels.ts';
import { danceCacheSize, danceClip, registerDances } from '../rig/glb.ts';
// 100 điệu nhảy dựng trên khung xương: đăng ký một lần, mỗi mẫu người nướng clip khi cần
registerDances(PROCEDURAL_DANCES);
import type { Cue } from './fx.ts';
import { ROOM } from './layout.ts';
import { Music } from './music.ts';
import { People } from './people.ts';
import { Stage } from './stage.ts';
import { $, BarUI, el, fitView, view } from './ui.ts';

// Quán Bar Online: hộp đêm 3D cho TikTok LIVE. Một trang dùng cho cả màn hình LIVE (?live=1, khung dọc 9:16 hay ngang 16:9)
// lẫn bảng điều khiển (mở thường: có bảng thử quà, kết nối TikTok).
// Tham số: ?lite (máy yếu) ?q=1..2 (độ nét) ?khach=40 (số khách vẽ người 3D) ?npc=10 (khách vãng lai) ?cam=wide (khoá máy quay)
//          ?ao=0 ?refl=0 (tắt che sáng, phản chiếu sàn) ?nomodel (không nạp người 3D) ?debug (hiện số liệu vẽ)
const params = new URLSearchParams(location.search);
const LIVE = params.has('live'), LITE = params.has('lite'), DEBUG = params.has('debug');
if (LIVE) document.body.classList.add('live');
const num = (k: string, d: number) => params.has(k) ? Math.max(0, +params.get(k)! || 0) : d;

/* ------------------------------------------------------------ renderer */
const canvas = $<HTMLCanvasElement>('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
renderer.info.autoReset = false;   // đếm lệnh vẽ của cả khung hình (mọi bước hậu kỳ), xoá đầu mỗi khung
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const Q_FORCED = params.has('q') ? Math.max(0.75, Math.min(2, +params.get('q')! || 1)) : 0;
let quality = Q_FORCED || (LITE ? 1 : Math.min(devicePixelRatio, 1.5) * Math.min(1.5, Math.max(1, Math.sqrt(2.4e6 / (innerWidth * innerHeight)))));
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020205);
scene.fog = new THREE.FogExp2(0x07060c, 0.011);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 900);

// Môi trường HDR cho phản chiếu: căn phòng tối có các mảng đèn xanh, tím, hồng, vàng (như ánh đèn club hắt lên bề mặt bóng)
function clubEnvironment(){
  const env = new THREE.Scene(), pm = new THREE.PMREMGenerator(renderer);
  env.add(new THREE.Mesh(new THREE.BoxGeometry(30, 12, 30), new THREE.MeshBasicMaterial({ color: 0x050408, side: THREE.BackSide })));
  const panel = (c: number, k: number, w: number, h: number, x: number, y: number, z: number, ry = 0, rx = 0) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.rotation.set(rx, ry, 0); env.add(m);
  };
  panel(0x3a6bff, 6, 14, 0.4, 0, 5.6, -14); panel(0xff2fd0, 6, 14, 0.4, 0, 5.6, 14, Math.PI);
  panel(0xffb070, 5, 0.4, 10, -14, 3, 0, Math.PI / 2); panel(0x7a3aff, 5, 0.4, 10, 14, 3, 0, -Math.PI / 2);
  panel(0xffe8d0, 3, 6, 6, 0, 5.9, 0, 0, Math.PI / 2);
  for (let i = 0; i < 6; i++) panel([0xff2fd0, 0x3ad8ff, 0xffc860][i % 3], 8, 0.25, 0.25, -10 + i * 4, 5, -13 + (i % 2) * 26, 0, 0);
  const tex = pm.fromScene(env, 0.035).texture;
  pm.dispose();
  return tex;
}
scene.environment = clubEnvironment();
scene.environmentIntensity = 0.55;

// ánh sáng nền: rất tối (club), lớp sáng chính đến từ đèn sân khấu, LED, quầy bar
const hemi = new THREE.HemisphereLight(0x3a3060, 0x0a0810, 0.35); scene.add(hemi);
const key = new THREE.SpotLight(0xffe8d0, 110, 24, 0.78, 0.65, 1.5);
key.position.set(0, ROOM.h - 0.3, -1.2); key.target.position.set(0, 0, -3.6);
key.castShadow = true; key.shadow.mapSize.set(LITE ? 1024 : 2048, LITE ? 1024 : 2048); key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.camera.near = 1; key.shadow.camera.far = 20;
scene.add(key, key.target);
const moon = new THREE.DirectionalLight(0x8090c0, 0.35); moon.position.set(-30, 50, 60); scene.add(moon);

const mark = (s: string) => { if (DEBUG) console.info('⏱', s, Math.round(performance.now())); };
mark('bắt đầu dựng');
const club = new Club(); mark('nội thất');
const stage = new Stage(); mark('sân khấu');
const city = new City(); mark('phố');
const people = new People({ npc: num('npc', 10), maxGuests: Math.min(BAR.maxGuests, num('khach', 40)) });
scene.add(club.group, stage.group, city.group, people.group);
const sound = new BarSound();
const music = new Music();
const ui = new BarUI();
const fx = new GiftFx(stage, people, sound, { cue: (c, id, ms) => director.cue(c, id, ms), cueTwo: (a, b, ms) => director.cueTwo(a, b, ms), banner: (t, s, i, l) => ui.banner(t, s, i, l) });
scene.add(fx.group);
const danceFx = new DanceFx(stage, people, (id, ms) => fx.spotlight(id, ms));
scene.add(danceFx.group);

// phản chiếu sàn đá thật (gương phẳng, nửa độ phân giải, cộng sáng lên sàn bóng): người, đèn, LED in bóng xuống sàn
let reflector: Reflector | null = null;
if (!LITE && num('refl', 1)){
  const shader = {
    name: 'FloorReflect', uniforms: { color: { value: new THREE.Color(1, 1, 1) }, tDiffuse: { value: null }, textureMatrix: { value: null }, strength: { value: 0.24 } },
    vertexShader: `uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW;
      #include <common>
      #include <logdepthbuf_pars_vertex>
      void main(){ vUv = textureMatrix * vec4(position, 1.0); vW = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      #include <logdepthbuf_vertex>
      }`,
    fragmentShader: `uniform vec3 color; uniform sampler2D tDiffuse; uniform float strength; varying vec4 vUv; varying vec3 vW;
      #include <logdepthbuf_pars_fragment>
      void main(){
        #include <logdepthbuf_fragment>
        vec3 v = normalize(cameraPosition - vW); float fres = 0.35 + 0.65 * pow(1.0 - clamp(v.y, 0.0, 1.0), 3.0);
        vec4 base = texture2DProj(tDiffuse, vUv); gl_FragColor = vec4(base.rgb * color * strength * fres, 1.0);
      }`,
  };
  reflector = new Reflector(new THREE.PlaneGeometry(ROOM.x1 - ROOM.x0, ROOM.z1 - ROOM.z0), { clipBias: 0.003, textureWidth: 512, textureHeight: 512, shader, multisample: 0 });
  const rm = reflector.material as THREE.ShaderMaterial;
  rm.transparent = true; rm.blending = THREE.AdditiveBlending; rm.depthWrite = false;
  reflector.rotation.x = -Math.PI / 2; reflector.position.set(0, 0.003, (ROOM.z0 + ROOM.z1) / 2); reflector.renderOrder = 1;
  scene.add(reflector);
}

/* ------------------------------------------------------------ hậu kỳ */
const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(innerWidth, innerHeight, { type: THREE.HalfFloatType, samples: LITE ? 0 : 4 }));
composer.addPass(new RenderPass(scene, camera));
let gtao: GTAOPass | null = null;
if (!LITE && num('ao', 1)){
  gtao = new GTAOPass(scene, camera, innerWidth, innerHeight);
  gtao.output = GTAOPass.OUTPUT.Default; gtao.blendIntensity = 0.75;
  gtao.updateGtaoMaterial({ radius: 0.45, distanceExponent: 1.5, thickness: 1.5, scale: 1, samples: 12 });
  gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
  composer.addPass(gtao);
}
// bloom vừa phải: chỉ vùng thật sáng (LED, đèn, tia laser) toả quầng, không làm cháy cả hình
// lọc điểm ảnh hỏng (NaN, vô cực, âm) trước bloom: một điểm NaN qua bloom loang thành mảng đen lớn che cả khung hình
composer.addPass(new ShaderPass({
  uniforms: { tDiffuse: { value: null } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv);
      if (!(c.r >= 0.0 && c.r < 65000.0) || !(c.g >= 0.0 && c.g < 65000.0) || !(c.b >= 0.0 && c.b < 65000.0)) c.rgb = vec3(0.0);
      if (!(c.a >= 0.0 && c.a < 65000.0)) c.a = 1.0;
      gl_FragColor = c; }`,
}));
const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.5, 0.5, 0.92);
composer.addPass(bloom);
composer.addPass(new OutputPass());
const grade = new ShaderPass({
  uniforms: { tDiffuse: { value: null }, uVig: { value: 0.38 }, uFlash: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uVig; uniform float uFlash; varying vec2 vUv;
    void main(){ vec4 c = texture2D(tDiffuse, vUv); vec3 x = c.rgb; float l = dot(x, vec3(0.2126, 0.7152, 0.0722));
      x = mix(vec3(l), x, 1.1); x += vec3(0.01, 0.0, 0.03) * (1.0 - l);                    // bão hoà nhẹ, bóng hơi tím lạnh
      vec2 d = vUv - 0.5; x *= 1.0 - dot(d, d) * uVig * 1.6; x += uFlash;
      gl_FragColor = vec4(clamp(x, 0.0, 1.0), c.a); }`,
});
composer.addPass(grade);

function resize(){
  fitView();
  const w = view.w, h = view.h, portrait = w / h < 0.8;
  renderer.setPixelRatio(quality * view.s); renderer.setSize(w, h, false);
  composer.setPixelRatio(quality * view.s); composer.setSize(w, h);
  gtao?.setSize(w * quality * view.s, h * quality * view.s);
  camera.aspect = w / h; camera.fov = portrait ? 50 : 52;   // 9:16: góc hẹp hơn (70° → 50°), nhân vật to gấp 1,5 lần camera.updateProjectionMatrix();
  reflector?.getRenderTarget().setSize(Math.round(w * quality * view.s * 0.5), Math.round(h * quality * view.s * 0.5));
}
addEventListener('resize', resize); resize();
// Card đồ hoạ quá tải hay driver khởi động lại thì WebGL mất, khung vẽ đen hẳn: tự tải lại trang (server vẫn giữ trạng thái quán)
renderer.domElement.addEventListener('webglcontextlost', e => {
  e.preventDefault();
  console.warn('Mất WebGL, tải lại trang sau 2 giây');
  setTimeout(() => location.reload(), 2000);
});

/* ------------------------------------------------------------ máy quay */
// Các góc máy: toàn cảnh, quầy bar, sân khấu, sàn nhảy, khu VIP, cửa quán ngoài phố, phố đêm.
// Không có gì xảy ra thì máy tự đi một vòng; quán có khách thì chỉ quay góc rộng sàn nhảy; có quà thì máy lia tới người tặng 10 giây. ?cam=wide để khoá.
type Shot = { pos: THREE.Vector3; look: THREE.Vector3 };
const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
const SHOTS: Record<string, (p: boolean) => Shot> = {
  wide: p => p ? { pos: V(0, 5.4, 9.2), look: V(0, 1.8, -6) } : { pos: V(0, 4.2, 9.4), look: V(0, 2.0, -6) },
  bar: p => p ? { pos: V(-4.0, 2.4, 4.4), look: V(-9.6, 1.4, -1.4) } : { pos: V(-3.6, 2.2, 4.8), look: V(-9.6, 1.4, -1.0) },
  stage: p => p ? { pos: V(0, 2.2, -1.2), look: V(0, 2.9, -11) } : { pos: V(0, 2.0, -0.6), look: V(0, 2.8, -11) },
  floor: p => p ? { pos: V(3.4, 3.6, 1.8), look: V(0, 0.9, -4.8) } : { pos: V(4.2, 3.0, 2.2), look: V(-0.5, 1.0, -4.8) },
  vip: p => p ? { pos: V(7.8, 3.3, 8.0), look: V(10.6, 0.8, -2.2) } : { pos: V(7.4, 3.0, 8.2), look: V(10.6, 0.9, -2.0) },
  outside: p => p ? { pos: V(4.2, 3.6, 25.4), look: V(0, 3.8, 10) } : { pos: V(6.5, 3.4, 25.2), look: V(-0.5, 3.6, 10) },
  // góc thấp ngoài phố nhìn ngước lên mặt tiền và bầu trời trên nóc quán (pháo hoa)
  sky: p => p ? { pos: V(5.5, 1.6, 26.5), look: V(0, 13, 2) } : { pos: V(8, 1.5, 26.5), look: V(0, 11.5, 2) },
  city: p => p ? { pos: V(-15, 12, 24.6), look: V(2, 3.5, 7) } : { pos: V(-18, 11, 24.6), look: V(2, 3.5, 7) },
  dj: p => p ? { pos: V(1.4, 2.6, -6.6), look: V(0, 1.9, -10) } : { pos: V(1.8, 2.4, -6.4), look: V(0, 1.9, -10) },
  // Dance Battle: trước sàn nhảy nhìn vào giữa, thấy người thi và khán giả vây phía sau
  battle: p => p ? { pos: V(0, 2.4, 2.2), look: V(0, 1.1, -4.4) } : { pos: V(0, 2.1, 1.4), look: V(0, 1.15, -4.6) },
  // các góc khác của sàn nhảy (khi quán có khách máy quay chỉ đổi giữa các góc sàn nhảy)
  floorL: p => p ? { pos: V(-3.4, 3.6, 1.8), look: V(0, 0.9, -4.8) } : { pos: V(-4.2, 3.0, 2.2), look: V(0.5, 1.0, -4.8) },
  // góc rộng thấy hết khách: cao, lùi sát tường cuối quán, chéo hai bên
  wideHigh: p => p ? { pos: V(0, 7.6, 9.6) , look: V(0, 0.6, -3.8) } : { pos: V(0, 6.4, 9.8), look: V(0, 0.8, -3.6) },
  floorWideR: p => p ? { pos: V(7.6, 6.2, 6.4), look: V(-1.2, 0.6, -3.8) } : { pos: V(8.4, 5.4, 6.8), look: V(-1.4, 0.8, -3.6) },
  floorWideL: p => p ? { pos: V(-7.6, 6.2, 6.4), look: V(1.2, 0.6, -3.8) } : { pos: V(-8.4, 5.4, 6.8), look: V(1.4, 0.8, -3.6) },
  floorTop: p => p ? { pos: V(0, 6.6, 0.8), look: V(0, 0, -4.6) } : { pos: V(0, 6.0, 1.2), look: V(0, 0.2, -4.6) },
};
const TOUR = ['wide', 'bar', 'floor', 'stage', 'vip', 'wide', 'outside', 'dj', 'floor', 'city'];
// quán có khách: chỉ quay sàn nhảy (đổi góc), chỉ khi có quà mới quay sang chỗ khác
const FLOOR_TOUR = ['wideHigh', 'floorWideR', 'wide', 'floorWideL'];
const director = new class {
  shot = 'wide'; until = 0; tourI = 0; focusId = ''; focusB = ''; seq: string[] = []; seqAt = 0;
  pos = V(0, 4.2, 9.4); look = V(0, 2, -6); private goalP = new THREE.Vector3(); private goalL = new THREE.Vector3(); fast = false;
  readonly locked = params.get('cam') ?? '';
  // Có quà: máy quay giữ vào người tặng đang nhảy combo trọn 10 giây; cảnh khác (sân khấu, pháo hoa của quà lớn)
  // xin máy quay trong lúc đó thì chờ, hết 10 giây mới chiếu
  holdUntil = 0; pending: { c: Cue; id: string; ms: number } | null = null;
  giftHold(id: string, ms = 10_000){
    if (this.locked) return;
    this.holdUntil = 0; this.seq = []; this.cue('giver', id, ms);
    this.holdUntil = performance.now() + ms; this.pending = null;
  }
  cue(c: Cue, id = '', ms = 6000){
    if (this.locked) return;
    const now = performance.now();
    if (now < this.holdUntil){
      if (c === 'giver' && id === this.focusId){ this.until = Math.max(this.until, now + ms); return; }
      this.pending = { c, id, ms }; return;
    }
    // màn lớn đang chiếu thì quà nhỏ không giành máy quay
    if (now < this.until && this.seq.length && c !== 'djshow') return;
    this.focusId = c === 'giver' ? id : '';
    this.seq = c === 'djshow' ? ['stage', 'dj', 'floor', 'stage', 'wide', 'dj', 'floor', 'stage'] : [];
    this.seqAt = now;
    this.shot = c === 'giver' ? 'giver' : c === 'djshow' ? 'stage' : c;
    this.until = now + ms; this.fast = true;
  }
  // dò 4 khung hình một lần (một tia, chỉ nội thất và sân khấu), giữ kết quả cho các khung giữa
  private ray = new THREE.Raycaster(); private occN = 0; private occD = Infinity; private occKey = '';
  private unblock(pos: THREE.Vector3, look: THREE.Vector3){
    const dir = pos.clone().sub(look), dist = dir.length();
    if (dist < 0.5) return pos;
    dir.divideScalar(dist);
    const key = `${pos.x.toFixed(1)},${pos.y.toFixed(1)},${pos.z.toFixed(1)}|${look.x.toFixed(1)},${look.z.toFixed(1)}`;
    if (this.occN++ % 4 === 0 || key !== this.occKey){
      this.occKey = key; this.occD = Infinity;
      this.ray.set(look, dir); this.ray.far = dist;
      for (const h of this.ray.intersectObjects([club.group, stage.group], true)){
        const m = (h.object as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined, mat = Array.isArray(m) ? m[0] : m;
        // kính, hiệu ứng cộng sáng, vật ẩn: không tính là che
        if (!h.object.visible || !mat || (mat.transparent && (mat.opacity < 0.6 || mat.blending === THREE.AdditiveBlending))) continue;
        this.occD = Math.max(0.9, h.distance - 0.35); break;
      }
    }
    return this.occD < dist ? look.clone().addScaledVector(dir, this.occD) : pos;
  }
  // máy quay ngang hai người đang đối đầu
  cueTwo(a: string, b: string, ms: number){
    if (this.locked) return;
    const now = performance.now();
    this.holdUntil = now + Math.min(ms, 10_000); this.pending = null;      // đối đầu: chính là người nhảy, giữ máy quay
    this.focusId = a; this.focusB = b; this.seq = []; this.seqAt = now; this.shot = 'two';
    this.until = now + ms; this.fast = true;
  }
  update(dt: number, t: number){
    const now = performance.now(), portrait = view.w / view.h < 0.8;
    if (this.pending && now >= this.holdUntil){ const p = this.pending; this.pending = null; this.cue(p.c, p.id, p.ms); }
    if (this.locked){ this.shot = this.locked in SHOTS ? this.locked : 'wide'; }
    else if (this.seq.length && now < this.until){ this.shot = this.seq[Math.floor((now - this.seqAt) / 4500) % this.seq.length]; }
    else if (now > this.until){
      this.seq = []; this.focusId = ''; this.focusB = '';
      const busy = people.guests().length > 0, tour = busy ? FLOOR_TOUR : TOUR;
      this.shot = tour[this.tourI++ % tour.length]; this.until = now + (this.shot === 'wide' ? 16000 : 9000); this.fast = false;
    }
    let s: Shot;
    if (this.shot === 'two' && this.focusId && this.focusB){
      const fa = people.feet(this.focusId), fb = people.feet(this.focusB);
      if (fa && fb){
        // đứng vuông góc với đường nối hai người, phía trước quán, thấy cả hai từ đầu tới chân
        const m = fa.clone().add(fb).multiplyScalar(0.5), d = fb.clone().sub(fa).setY(0), dist = Math.max(1.2, d.length());
        d.normalize(); const n = V(-d.z, 0, d.x); if (n.z < 0) n.negate();
        s = { pos: m.clone().add(n.multiplyScalar((portrait ? 5.0 : 4.2) + dist * 0.6)).setY(m.y + 2.4), look: m.clone().setY(m.y + 0.9) };
      } else s = SHOTS.battle(portrait);
    } else if (this.shot === 'giver' && this.focusId){
      const h = people.head(this.focusId);
      if (h){
        // trước mặt người đó, hơi chếch về phía giữa quán (ngoài phố thì đứng hẳn trước mặt), nhìn ngang tầm mắt
        const f = people.feet(this.focusId)!, y = people.yaw(this.focusId), front = V(Math.sin(y), 0, Math.cos(y));
        const toC = V(0, 0, 4).sub(f).setY(0).normalize(), dir = f.z > ROOM.z1 ? front : front.multiplyScalar(0.65).add(toC.multiplyScalar(0.35)).normalize();
        s = { pos: f.clone().add(dir.multiplyScalar(portrait ? 4.6 : 4.0)).setY(h.y + 0.9), look: h.clone().setY(h.y - 0.55) };
      } else s = SHOTS.wide(portrait);
    } else s = (SHOTS[this.shot] ?? SHOTS.wide)(portrait);
    // chống che: tường, vách khu VIP, cột, quầy nằm giữa người được quay và máy quay thì kéo máy vào trước vật đó
    s = { pos: this.unblock(s.pos, s.look), look: s.look };
    // máy quay trôi nhẹ như cầm tay
    this.goalP.copy(s.pos).add(V(Math.sin(t * 0.13) * 0.35, Math.sin(t * 0.21) * 0.12, Math.cos(t * 0.11) * 0.25));
    this.goalL.copy(s.look).add(V(Math.sin(t * 0.17) * 0.2, 0, 0));
    // khác khu (quầy, sân khấu, VIP, ngoài phố) thì cắt cảnh thẳng như phim, không lướt xuyên tường; cùng khu thì lướt êm
    const jump = this.pos.distanceTo(this.goalP) > 4;
    const k = jump ? 1 : 1 - Math.exp(-dt * (this.fast ? 2.4 : 0.9));
    this.pos.lerp(this.goalP, k); this.look.lerp(this.goalL, k);
    camera.position.copy(this.pos); camera.lookAt(this.look);
  }
}();

/* ------------------------------------------------------------ mạng */
const net = new Net(LIVE ? 'view' : 'control');
let liveViews = 0;   // số màn hình LIVE đang nối server (kể cả cửa sổ mở bằng mo-bar.cmd, máy khác)
let bar: BarState | null = null, barAt = performance.now(), settings: Settings | null = null, ready = false;
const simIds = new Set<string>();
let pending: BarState | null = null;

function applyBar(b: BarState){
  bar = b; barAt = performance.now();
  for (const g of b.guests) if (g.sim) simIds.add(g.id);
  ui.bar(b, 0);
  if (ready) people.sync(b.guests); else pending = b;
  ui.showKey(b.show?.key ?? '');
  ui.battle(b.battle, 0);
  if (ready) people.battle(b.battle);
}
net.onHello = (s: Snapshot) => {
  settings = s.settings;
  ui.live(s.live); ui.stats(s.stats); liveViews = s.stats.views ?? 0;
  if (s.role === 'control' && !LIVE) buildSimPanel();
  applyBar(s.bar);
  // đang có màn diễn thì diễn tiếp phần còn lại; ly đang pha thì pha tiếp
  if (s.bar.show && s.bar.show.leftMs > 1500){ stage.setMode(s.bar.show.key); }
  if (ready) for (const o of s.bar.orders) if (o.status === 'making') people.make(o.n, o.id, o.drink);
};
net.onDelta = (d: Delta) => {
  if (d.live) ui.live(d.live);
  if (d.stats){ ui.stats(d.stats); liveViews = d.stats.views ?? 0; }
  if (d.settings) settings = d.settings;
  if (d.bar) applyBar(d.bar);
  for (const f of d.fx ?? []) onFx(f);
};
net.onStatus = up => { $('offline').hidden = up; };
net.connect();

function onFx(f: Fx){
  if (f.k === 'chat'){ ui.bubble(f.id, f.text); return; }
  if (f.k === 'voice'){ sound.voice(f.url, () => music.duck(true), () => music.duck(false), 25_000, f.tag === 'chat' ? 'chat' : ''); return; }
  if (f.k === 'like'){ hearts(Math.min(6, Math.ceil(f.count / 10))); likeTally(f.id, f.count); return; }
  if (f.k !== 'bar') return;
  onBar(f);
}
// Thả trên 10 tim (cộng dồn trong 20 giây): máy quay soi vào người đó 5 giây, họ múa điệu đơn giản.
// Mỗi người tối đa một lần mỗi 30 giây; đang quay quà hay người thả tim khác thì không giành máy quay.
const likes = new Map<string, { n: number; t0: number; last: number }>();
let likeCamUntil = 0;
function likeTally(id: string, count: number){
  const now = performance.now(), r = likes.get(id) ?? { n: 0, t0: now, last: -1e9 };
  if (now - r.t0 > 20_000){ r.n = 0; r.t0 = now; }
  r.n += count; likes.set(id, r);
  if (r.n <= 10 || now - r.last < 30_000) return;
  if (now < director.holdUntil || now < likeCamUntil || director.seq.length || turns.busy()) return;
  r.last = now; r.n = 0; r.t0 = now;
  // khách mới thả tim lần đầu: chờ dữ liệu quán gửi người đó tới (tối đa 3 giây)
  let tries = 0;
  const go = () => {
    if (people.likeDance(id)){ likeCamUntil = performance.now() + 5000; director.cue('giver', id, 5000); return; }
    if (++tries < 12) setTimeout(go, 250);
  };
  go();
}
// vị trí đặt tên: theo đầu, nhưng lúc trồng chuối / xoay đầu / nhào lộn (đầu chúc xuống) thì vẫn giữ trên cao như lúc đứng
function tagHead(id: string){
  const h = people.head(id), f = people.feet(id);
  if (h && f) h.y = Math.max(h.y, f.y + 1.55);
  return h;
}
// Nhiều người tặng quà cùng lúc: xếp hàng, ai gửi trước múa trước. Mỗi lượt máy quay vào riêng một người 10 giây
// (đối đầu thì trọn màn đối đầu), hết lượt mới tới người sau. Người đang chờ đã đứng trên sàn nhảy bình thường.
// Một người tặng tiếp trong lúc đang chờ: gộp vào lượt đang chờ (lấy quà to hơn), không xếp thêm lượt.
type GiftEv = Extract<BarFx, { ev: 'gift' }>;
type ShowEv = Extract<BarFx, { k: 'bar'; ev: 'show' | 'showEnd' }>;
type Turn = { kind: 'gift'; id: string; name: string; gift: GiftEv } | { kind: 'faceoff'; id: string; name: string; show: ShowEv; ms: number };
const faceoffGift = new Map<string, GiftEv>();
const turns = new class {
  q: Turn[] = []; cur: Turn | null = null; until = 0;
  busy(){ return !!this.cur || this.q.length > 0; }
  add(t: Turn){
    if (t.kind === 'gift'){
      const same = this.q.find(x => x.kind === 'gift' && x.id === t.id) as Extract<Turn, { kind: 'gift' }> | undefined;
      if (same){ if (t.gift.xu >= same.gift.xu) same.gift = t.gift; return; }
    }
    if (this.q.length >= 30) this.q.splice(this.q.findIndex(x => x.kind === 'gift'), 1);   // quá đông: bỏ lượt chờ lâu nhất
    this.q.push(t);
    const pos = this.q.length + (this.cur ? 1 : 0);
    if (pos > 1) ui.note(`⏳ ${t.name} chờ lượt múa thứ ${pos}`, 'dim');
    this.tick();
  }
  private start(t: Turn){
    const now = performance.now();
    if (t.kind === 'gift'){
      const f = t.gift;
      people.toFloor(f.id); fx.gift(f.id, f.name, f.show, f.level, f.xu); people.giftDance(f.id, f.level, f.show);
      // 10 giây máy quay vào người nhảy combo, vệt sáng skill theo cỡ quà
      director.giftHold(f.id, 10_000); fx.skill(f.id, f.level >= 4 ? 4 : f.level >= 3 ? 3 : f.xu >= 5 ? 2 : 1, 10_000);
      danceFx.feature(f.id, 6 + f.level * 3, 'gift'); if (f.level >= 2 && !BAR_GIFTS.find(g => g.key === f.show)?.ms) sound.applause(2);
      this.until = now + 10_000;
    } else {
      const f = t.show, g = faceoffGift.get(f.id); faceoffGift.delete(f.id);
      people.toFloor(f.id); if (g) fx.gift(g.id, g.name, g.show, g.level, g.xu);
      fx.show('faceoff', f.id, f.name, t.ms, f.vs ?? '', f.vsName ?? ''); ui.showKey('faceoff');
      this.until = now + t.ms;
    }
    this.cur = t;
  }
  tick(){
    const now = performance.now();
    if (this.cur && now >= this.until){
      if (this.cur.kind === 'faceoff'){ fx.end('faceoff'); ui.showKey(''); }
      this.cur = null;
    }
    while (!this.cur && this.q.length){
      const t = this.q.shift()!;
      if (people.persons.has(t.id)) this.start(t);     // người đã rời quán thì bỏ qua lượt
    }
  }
}();
setInterval(() => turns.tick(), 200);
let lastDoorCue = 0;
function onBar(f: BarFx){
  const now = performance.now();
  switch (f.ev){
    case 'arrive': ui.note(f.text); break;
    case 'leave': if (f.text) ui.note(f.text, 'dim'); break;
    case 'vip': ui.note(f.text, 'gold'); ui.banner(f.name, 'trở thành khách VIP 👑 mời lên khu VIP', '👑', 4); director.cue('vip', f.id, 6000); sound.applause(3); break;
    case 'order': ui.note(f.text, f.paid ? 'paid' : ''); break;
    case 'make':
      if (ready) people.make(f.n, f.id, f.drink);
      break;
    case 'served': people.served(f.n, f.id, f.drink); break;
    case 'gift': ui.note(f.text, 'gift lv' + f.level); people.toFloor(f.id);
      // quà đối đầu: phần múa nằm trong màn đối đầu (xếp lượt khi màn đó tới)
      if (f.show === 'faceoff'){ faceoffGift.set(f.id, f); break; }
      turns.add({ kind: 'gift', id: f.id, name: f.name, gift: f });
      break;
    case 'show': {
      const g = BAR_GIFTS.find(x => x.key === f.show);
      // đối đầu cũng xếp lượt như mọi quà: ai gửi trước múa trước
      if (f.show === 'faceoff'){ turns.add({ kind: 'faceoff', id: f.id, name: f.name, show: f, ms: g?.ms ?? 15_000 }); break; }
      fx.show(f.show, f.id, f.name, g?.ms ?? 10_000, f.vs ?? '', f.vsName ?? ''); ui.showKey(f.show);
      if (f.show === 'djshow') music.hype(true);
      break;
    }
    case 'showEnd': if (f.show === 'faceoff') break;   // màn đối đầu tự kết thúc theo lượt của nó
      fx.end(f.show); ui.showKey(''); music.hype(false); break;
    case 'deny': ui.note(f.text, 'dim'); break;
    case 'levelup': { const L = levelInfo(f.lv); ui.note(f.text, 'gold'); ui.banner(f.name, `lên cấp ${f.lv} · ${L.name} ${L.icon}`, L.icon, Math.min(5, 2 + Math.floor(f.lv / 3))); fx.levelUp(f.id, f.lv); break; }
    case 'dance': {
      ui.note(f.text);
      people.danceCmd(f.id, f.dance, f.group); danceFx.feature(f.id, 10, 'cmd');
      break;
    }
    case 'battle': {
      ui.note(f.text, 'gold');
      if (f.phase === 'start'){ ui.banner('DANCE BATTLE', f.text.replace('⚔️ DANCE BATTLE: ', ''), '⚔️', 4); director.cue('battle', f.id, 6000); sound.applause(3); }
      else if (f.phase === 'turn'){ danceFx.feature(f.id, 8, 'battle'); director.cue('giver', f.id, 4200); setTimeout(() => director.cue('battle', f.id, 3800), 4200); }
      else { danceFx.feature(f.id, 9, 'battle'); ui.banner(f.name, 'thắng DANCE BATTLE 🏆 Victory Dance!', '🏆', 5); director.cue('giver', f.id, 8000); sound.applause(5); fx.celebrate(); }
      break;
    }
  }
}
people.onArriveDoor = id => { const now = performance.now(); if (now - lastDoorCue > 2500){ lastDoorCue = now; people.greet(); } void id; };

// tim bay lên khi thả tim
function hearts(n: number){
  const box = $('hearts');
  for (let i = 0; i < n; i++){ const h = el('span', 'heart', ['❤️', '💖', '💜', '💙'][i % 4]); h.style.left = `${70 + Math.random() * 25}%`; h.style.animationDelay = `${i * 0.12}s`; box.append(h); setTimeout(() => h.remove(), 3200); }
}

/* ------------------------------------------------------------ nạp tài nguyên */
const loadBox = $('loading');
// bỏ mẫu trẻ con, người già (nếu có); tải song song, mỗi file chỉ tải một lần
void Promise.all([
  loadModels({ skip: /^(khachtre|guesttre|khachgia|guestgia)/, parallel: 4 }).then(() => mark('người 3D')),
  preloadProps(DRINK_KEYS.map(drinkUrl)).then(() => mark('đồ uống')),
  music.init().then(() => mark('nhạc')),
]).then(async () => {
  mark('nạp xong file');
  people.init(); mark('dựng nhân viên');
  ready = true;
  if (pending){ people.sync(pending.guests, true); for (const o of pending.orders) if (o.status === 'making') people.make(o.n, o.id, o.drink); pending = null; }
  else people.sync(bar?.guests ?? [], true);
  mark('dựng khách');
  // dịch sẵn shader của người 3D (song song, không chặn khung hình) rồi mới mở màn
  await sceneCompiled;
  await precompile(); mark('dịch shader người');
  started = true;
  loadBox.hidden = true;
  console.info('Quán sẵn sàng sau', Math.round(performance.now()), 'ms');
  const st = people.stats();
  if (!st.models) ui.note('ℹ️ Chưa có file người 3D trong bar/models/ nên đang dùng người dựng tạm. Xem models/DOC-TRUOC.txt', 'warn');
  if (LIVE) startAudio();
});

// âm thanh: OBS cho tự phát; trình duyệt thường cần một cú bấm
function startAudio(){
  sound.start(); music.start();
  setTimeout(() => { $('musicHint').hidden = !music.blocked; }, 800);
}
$('musicHint').onclick = () => { startAudio(); $('musicHint').hidden = true; };
addEventListener('pointerdown', () => { if (!sound.on) startAudio(); }, { once: true });
$('musicBtn').onclick = () => { if (music.playing){ music.stop(); $('musicBtn').textContent = '🔇'; } else { startAudio(); $('musicBtn').textContent = '🎵'; } };
// Màn hình LIVE dọc 9:16 mở thành cửa sổ riêng 540×960, để TikTok LIVE Studio / OBS chụp cửa sổ (Window capture)
const liveUrl = `${location.origin}/?live=1`;
// Trong lúc cửa sổ 9:16 mở, trang điều khiển ngừng vẽ cảnh 3D: hai trang cùng vẽ nặng làm card đồ hoạ quá tải, WebGL mất
// và cửa sổ LIVE đen thui. Trang LIVE báo mình còn sống qua BroadcastChannel (cả khi mở bằng tay ở tab khác cùng trình duyệt).
let liveWin: Window | null = null, liveSeen = 0;
const chan = typeof BroadcastChannel === 'function' ? new BroadcastChannel('bar-live') : null;
if (chan){
  if (LIVE){ const ping = () => chan.postMessage('live'); ping(); setInterval(ping, 1000); addEventListener('pagehide', () => chan.postMessage('bye')); }
  else chan.onmessage = e => { liveSeen = e.data === 'live' ? performance.now() : 0; };
}
const liveElsewhere = () => !LIVE && ((liveWin !== null && !liveWin.closed) || performance.now() - liveSeen < 2500 || liveViews > 0);
const pausedBox = LIVE ? null : document.getElementById('app')!.appendChild(el('div', 'pausedNote', '📺 Màn hình LIVE 9:16 đang mở ở cửa sổ riêng: trang này tạm ngừng vẽ 3D cho nhẹ máy. Đóng cửa sổ đó thì cảnh hiện lại.'));
if (pausedBox) pausedBox.hidden = true;
function openLive(){
  const w = window.open(liveUrl, 'barLive916', 'popup,width=540,height=960');
  if (!w){ ui.note('⚠️ Trình duyệt chặn cửa sổ bật lên: cho phép popup, hoặc mở ' + liveUrl, 'warn'); return; }
  liveWin = w; w.focus();
}
function copyLive(){ void navigator.clipboard?.writeText(liveUrl).then(() => ui.note('Đã chép link màn hình LIVE: ' + liveUrl, 'gold'), () => ui.note(liveUrl, 'warn')); }
$('liveBtn').onclick = openLive;
$('soundBtn').onclick = () => { if (sound.on){ sound.stop(); $('soundBtn').textContent = '🔇'; } else { sound.start(); $('soundBtn').textContent = '🔈'; } };
if (!LIVE) setTimeout(() => { if (!sound.on) $('musicHint').hidden = false; }, 1500);

/* ------------------------------------------------------------ vòng vẽ */
// Dịch shader trước khi vẽ: card đồ hoạ dịch song song (KHR_parallel_shader_compile) nên trang không bị đứng hình
// hàng chục giây như khi để lần vẽ đầu tự dịch từng chất liệu một.
let started = false;
async function precompile(){
  // dịch đúng biến thể sẽ dùng: cảnh vẽ vào khung hậu kỳ (màu tuyến tính, chưa nén tone), không phải thẳng ra màn hình;
  // dịch nhầm biến thể màn hình thì mỗi vật lần đầu lọt khung lại phải dịch lại, đứng hình cả chục giây
  const prev = renderer.getRenderTarget();
  renderer.setRenderTarget(composer.readBuffer);
  try { await renderer.compileAsync(scene, camera); } catch (e){ console.warn('Không dịch trước được shader', e); }
  finally { renderer.setRenderTarget(prev); }
  // đưa sẵn mọi ảnh lên card đồ hoạ (không thì lần đầu người 3D lọt vào khung hình là khựng)
  const seen = new Set<THREE.Texture>();
  scene.traverse(o => { const m = (o as THREE.Mesh).material; for (const mm of Array.isArray(m) ? m : m ? [m] : []) for (const v of Object.values(mm)) if ((v as THREE.Texture)?.isTexture && !seen.has(v as THREE.Texture)){ seen.add(v as THREE.Texture); renderer.initTexture(v as THREE.Texture); } });
}
// dịch shader của cảnh ngay trong lúc tải người 3D; chưa vẽ gì nặng cho tới khi mọi thứ sẵn sàng (vẽ sớm làm việc tải chậm đi nhiều lần)
const sceneCompiled = precompile().then(() => mark('dịch shader cảnh'));
const clock = new THREE.Clock();
const frustum = new THREE.Frustum(), pv = new THREE.Matrix4();
let fps = 60, slowFor = 0, frame = 0;
const dbg = DEBUG ? document.body.appendChild(el('pre', 'debug')) : null;
function adapt(dt: number){
  if (Q_FORCED) return;
  slowFor = fps < 38 ? slowFor + dt : Math.max(0, slowFor - dt * 0.5);
  if (slowFor < 4) return;
  slowFor = 0;
  // máy yếu: tắt dần che sáng, phản chiếu sàn, rồi hạ độ nét
  if (gtao?.enabled){ gtao.enabled = false; console.info('Tắt GTAO cho nhẹ máy'); }
  else if (reflector?.visible){ reflector.visible = false; console.info('Tắt phản chiếu sàn cho nhẹ máy'); }
  else if (quality > 1){ quality = Math.max(1, quality - 0.25); resize(); console.info('Hạ độ nét', quality); }
}
function loop(){
  requestAnimationFrame(loop);
  const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
  const paused = liveElsewhere();
  if (pausedBox && pausedBox.hidden !== !paused){ pausedBox.hidden = !paused; renderer.domElement.style.visibility = paused ? 'hidden' : ''; slowFor = 0; }
  if (paused){ if (bar && frame % 15 === 0) ui.bar(bar, performance.now() - barAt); frame++; return; }
  fps += (1 / Math.max(1e-3, dt) - fps) * 0.05;
  adapt(dt);
  music.update(dt);
  const b = music.beat;
  director.update(dt, t);
  camera.updateMatrixWorld();
  pv.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); frustum.setFromProjectionMatrix(pv);
  const outside = camera.position.z > ROOM.z1 + 0.3;
  city.setOutside(outside);
  stage.update(dt, t, b, view.h * quality * view.s, camera.fov);
  club.update(t, b.bass, stage.theme);
  city.update(dt, t, b.bass);
  people.update(dt, t, camera, frustum, { beat: b.beat, phase: b.phase, bpm: b.bpm, section: b.section, dropHit: b.dropHit });
  fx.update(dt, t, view.h * quality * view.s, camera.fov);
  danceFx.update(dt, b, view.h * quality * view.s, camera.fov);
  if (bar?.battle && frame % 15 === 0) ui.battle(bar.battle, performance.now() - barAt);
  key.intensity = stage.dark ? 5 : 100 + b.bass * 30;
  hemi.intensity = stage.dark ? 0.08 : 0.35;
  scene.environmentIntensity = stage.dark ? 0.12 : 0.55;
  bloom.strength = 0.48 + b.bass * 0.12 + (stage.mode === 'djshow' ? 0.05 : 0);
  if (bar && frame % 15 === 0) ui.bar(bar, performance.now() - barAt);
  if (frame % 2 === 0){
    const list = people.guests().map(p => { const d = danceFx.featured(p.id) ? people.danceOf(p.id) : null; return { id: p.id, name: p.name, lvl: p.lvl, vip: p.vip, drink: p.drinkKey ? drinkOf(p.drinkKey).icon : '', head: p.mode === 'leave' ? null : tagHead(p.id), show: true, sim: simIds.has(p.id), dance: d ? `${DANCE_GROUPS[d.group].icon} #${d.no} ${d.name}` : '' }; });
    const many = list.length > 14;
    for (const g of list){ const p = people.persons.get(g.id)!, d = g.head ? g.head.distanceTo(camera.position) : 99; g.show = d < (many ? 20 : 34) || ((g.vip || people.isHighlighted(p)) && d < 44); }
    ui.tagsUpdate(list, camera);
  }
  renderer.info.reset();
  if (started) composer.render(dt);
  if (dbg && frame % 30 === 0){ const i = renderer.info.render, st = people.stats(); dbg.textContent = `fps ${fps.toFixed(0)} · q ${quality.toFixed(2)} · draw ${i.calls} · tri ${(i.triangles / 1e3).toFixed(0)}k · người ${st.visible}/${st.people} · ly ${st.jobs}${gtao?.enabled ? ' · AO' : ''}${reflector?.visible ? ' · refl' : ''}`; }
  frame++;
}
loop();
(window as unknown as Record<string, unknown>).__bar = { THREE, scene, renderer, people, stage, director, music, fx, camera, glb: { danceClip, danceCacheSize },
  // gỡ lỗi: vật nằm trước ống kính (tên, khoảng cách)
  probe: () => { const r = new THREE.Raycaster(); r.setFromCamera(new THREE.Vector2(0, 0.3), camera); return r.intersectObjects(scene.children, true).slice(0, 6).map(h => `${h.object.name || h.object.type}:${(h.object as THREE.Mesh).material ? ((h.object as THREE.Mesh).material as THREE.Material).name || ((h.object as THREE.Mesh).material as THREE.Material).type : ''}@${h.distance.toFixed(2)}`); } };

/* ------------------------------------------------------------ bảng thử */
let built = false;
function buildSimPanel(){
  if (built) return;
  built = true;
  const sim = $('sim'), body = $('simBody');
  sim.hidden = false;
  const store = (k: string, v?: unknown) => { try { if (v === undefined) return JSON.parse(localStorage.getItem('bar_' + k) ?? 'null'); localStorage.setItem('bar_' + k, JSON.stringify(v)); } catch { /* chế độ riêng tư */ } return null; };
  body.hidden = !(store('open') ?? true);
  $('simToggle').onclick = () => { body.hidden = !body.hidden; store('open', !body.hidden); };
  const NAMES = ['Minh Anh', 'Tuấn Kiệt', 'Ngọc Hân', 'Bảo Long', 'Thảo Vy', 'Quang Huy', 'Khánh Linh', 'Đức Thịnh', 'Mai Phương', 'Hoàng Nam', 'Lan Chi', 'Gia Bảo'];
  const name = el('input') as HTMLInputElement; name.value = store('name') ?? 'Khách thử'; name.onchange = () => store('name', name.value);
  const who = () => ({ id: 'demo_' + name.value.trim().toLowerCase().replace(/\s+/g, '_'), name: name.value.trim() || 'Khách' });
  const btn = (label: string, f: () => void, cls = '') => { const b = el('button', 'sb ' + cls, label); b.onclick = f; return b; };
  const row = (...k: HTMLElement[]) => { const d = el('div', 'srow'); d.append(...k); return d; };
  const say = (text: string, w = who()) => net.send({ t: 'sim', kind: 'comment', ...w, text });
  const user = el('input') as HTMLInputElement; user.placeholder = '@tên_tiktok'; user.value = store('tt') ?? '';
  body.append(
    el('div', 'sh', 'Màn hình LIVE'),
    row(btn('📺 Mở màn 9:16', openLive, 'pri'), btn('📋 Chép link', copyLive)),
    el('div', 'sh', 'Kết nối TikTok LIVE'),
    row(user, btn('Kết nối', () => { store('tt', user.value); net.send({ t: 'ctl', cmd: 'connect', user: user.value }); }, 'pri'), btn('Ngắt', () => net.send({ t: 'ctl', cmd: 'disconnect' }))),
    row(btn('🔊 Giọng đọc', () => net.send({ t: 'ctl', cmd: 'settings', settings: { voice: !(settings?.voice ?? true) } })), btn('💬 Đọc bình luận', () => net.send({ t: 'ctl', cmd: 'settings', settings: { readChat: !(settings?.readChat ?? true) } }))),
    el('div', 'sh', 'Thử như người xem (DEMO)'),
    row(name, btn('👋 Vào quán', () => say('xin chào quán'))),
    row(btn('🙋‍♂️ nam', () => say('nam')), btn('🙋‍♀️ nữ', () => say('nữ')), btn('❤️ Tim', () => net.send({ t: 'sim', kind: 'like', ...who(), count: 30 })), btn('💬 Bình luận', () => say('Nhạc hay quá!'))),
    el('div', 'sh', 'Tặng quà (xu)'),
    row(...BAR_GIFTS.map(g => btn(`${g.icon} ${g.xu}`, () => net.send({ t: 'sim', kind: 'gift', ...who(), gift: g.label.split(',')[0], diamonds: g.xu, count: 1 }), 'gift lv' + g.level))),
    el('div', 'sh', 'Nhảy (100 điệu)'),
    row(...(Object.keys(DANCE_GROUPS) as (keyof typeof DANCE_GROUPS)[]).map(g => btn(`${DANCE_GROUPS[g].icon} ${DANCE_GROUPS[g].name}`, () => say('nhảy ' + g))),
      btn('🎲 Điệu ngẫu nhiên', () => say('nhảy ' + (1 + Math.floor(Math.random() * DANCES.length)))), btn('⚔️ Battle (199 xu)', () => net.send({ t: 'sim', kind: 'gift', ...who(), gift: 'Battle', diamonds: 199, count: 1 }))),
    el('div', 'sh', 'Đông khách'),
    row(btn('+6 khách', () => { for (let i = 0; i < 6; i++){ const n = NAMES[Math.floor(Math.random() * NAMES.length)] + ' ' + Math.floor(Math.random() * 90 + 10); setTimeout(() => { say(Math.random() < 0.5 ? 'hello' : 'nhảy ' + (1 + Math.floor(Math.random() * 100)), { id: 'demo_' + n.replace(/\s+/g, '_'), name: n }); }, i * 300); } }),
      btn('Xoá khách thử', () => net.send({ t: 'ctl', cmd: 'clearSim' }))),
  );
}
