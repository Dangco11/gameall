import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { BarShowKey } from '../../shared/bar.ts';
import type { Theme } from './club.ts';
import { BOOTH, FLOOR, ROOM, STAGE } from './layout.ts';
import { M, box, cyl, instances, led, mat4 } from './mats.ts';
import { Particles } from './particles.ts';
import { smoke, softDot } from './tex.ts';

// Sân khấu DJ: bục sân khấu, bàn DJ (hai bàn CDJ, mixer có núm, cần gạt, đèn VU), màn LED lớn và hai màn LED phụ,
// loa array treo hai bên, loa sub dưới sàn, giàn khung truss, đèn moving head (có tia sáng thấy được trong khói),
// laser, đèn strobe, máy khói, máy phun CO2, pháo lạnh; sàn nhảy LED 60 ô đổi màu theo nhạc.
// section: đoạn nhạc (êm, đều, đang dồn, drop); dropHit: vừa vào drop ở khung hình này
export type Section = 'calm' | 'groove' | 'build' | 'drop';
export interface Beat { level: number; bass: number; beat: boolean; phase: number; bins: Float32Array; bpm: number; section: Section; dropHit: boolean }
// lasershow / toast: kiểu đèn dùng lại cho các màn (đối đầu dùng laser show)
export type StageMode = 'idle' | BarShowKey | 'lasershow' | 'toast';

const beamVS = `varying vec3 vN; varying vec3 vV; varying float vY; void main(){ vY = uv.y; vec4 mv = modelViewMatrix * vec4(position, 1.0); vV = -mv.xyz; vN = normalMatrix * normal; gl_Position = projectionMatrix * mv; }`;
const beamFS = `uniform vec3 color; uniform float power; varying vec3 vN; varying vec3 vV; varying float vY;
  void main(){ float f = abs(dot(normalize(vN), normalize(vV))); float a = pow(f, 2.0) * pow(vY, 2.2) * power; gl_FragColor = vec4(color * a, a); }`;
function beamMaterial(){ return new THREE.ShaderMaterial({ uniforms: { color: { value: new THREE.Color(1, 1, 1) }, power: { value: 0.35 } }, vertexShader: beamVS, fragmentShader: beamFS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }); }

interface Head { yoke: THREE.Group; head: THREE.Group; beam: THREE.Mesh; mat: THREE.ShaderMaterial; lens: THREE.MeshStandardMaterial; light?: THREE.SpotLight; base: THREE.Vector3; i: number }

/* ------------------------------------------------------------ màn LED */
export class LedScreen {
  readonly canvas = document.createElement('canvas');
  readonly tex: THREE.CanvasTexture;
  private g: CanvasRenderingContext2D;
  private msg: { title: string; sub: string; icon: string; until: number; big: boolean } | null = null;
  private count: { at: number } | null = null;
  private frame = 0;
  constructor(){
    this.canvas.width = 1400; this.canvas.height = 500;
    this.g = this.canvas.getContext('2d')!;
    this.tex = new THREE.CanvasTexture(this.canvas); this.tex.colorSpace = THREE.SRGBColorSpace; this.tex.anisotropy = 8;
  }
  message(title: string, sub: string, icon: string, ms: number, big = false){ this.msg = { title, sub, icon, until: performance.now() + ms, big }; }
  countdown(){ this.count = { at: performance.now() }; }
  draw(t: number, b: Beat, theme: Theme, mode: StageMode){
    if (this.frame++ % 2) return;                     // 30 lần một giây là đủ mượt, đỡ tải ảnh lên card đồ hoạ
    const g = this.g, W = this.canvas.width, H = this.canvas.height, now = performance.now();
    const a = '#' + theme.a.getHexString(), bcol = '#' + theme.b.getHexString();
    // nền: dải màu chạy chậm, vòng tròn đập theo nhịp
    const gr = g.createLinearGradient(0, 0, W, H);
    gr.addColorStop(0, '#05030c'); gr.addColorStop(0.5 + Math.sin(t * 0.3) * 0.3, mix(a, '#05030c', 0.75)); gr.addColorStop(1, '#05030c');
    g.globalCompositeOperation = 'source-over'; g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';
    const rings = mode === 'djshow' || mode === 'co2' ? 7 : 4;
    for (let i = 0; i < rings; i++){
      const r = ((t * 0.9 + i / rings + b.phase * 0.08) % 1) * W * 0.7;
      g.strokeStyle = i % 2 ? bcol : a; g.globalAlpha = (1 - r / (W * 0.7)) * 0.55; g.lineWidth = 6 + b.bass * 18;
      g.beginPath(); g.arc(W / 2, H / 2, r, 0, Math.PI * 2); g.stroke();
    }
    // phổ nhạc hai bên
    g.globalAlpha = 0.9;
    const n = 48, bw = W / 2 / n;
    for (let i = 0; i < n; i++){
      const v = Math.min(1, (b.bins[Math.floor(i / n * b.bins.length * 0.7)] ?? 0) * 1.25), h = 10 + v * H * 0.42;
      g.fillStyle = i % 2 ? a : bcol;
      g.fillRect(W / 2 - (i + 1) * bw + 2, H - h, bw - 4, h); g.fillRect(W / 2 + i * bw + 2, H - h, bw - 4, h);
    }
    // DJ show: hình vạn hoa xoay
    if (mode === 'djshow' || mode === 'vip'){
      g.save(); g.translate(W / 2, H / 2); g.globalAlpha = 0.5;
      for (let k = 0; k < 12; k++){ g.rotate(Math.PI / 6 + t * 0.05); g.fillStyle = k % 2 ? a : bcol; g.fillRect(40 + b.bass * 60, -8, W * 0.42, 16); }
      g.restore();
    }
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    if (this.count && now - this.count.at < 3200){
      const k = Math.floor((now - this.count.at) / 1000), f = ((now - this.count.at) % 1000) / 1000;
      g.font = `900 ${300 + f * 80}px "Segoe UI", Arial`; g.fillStyle = '#fff'; g.shadowColor = a; g.shadowBlur = 60; g.globalAlpha = 1 - f * 0.6;
      g.fillText(k < 3 ? String(3 - k) : 'DROP!', W / 2, H / 2 + 10);
      g.globalAlpha = 1; g.shadowBlur = 0;
      this.tex.needsUpdate = true;
      return;
    }
    if (this.msg && now < this.msg.until){
      const m = this.msg, pulse = 1 + b.bass * 0.06;
      g.shadowColor = a; g.shadowBlur = 40; g.fillStyle = '#ffffff';
      g.font = `900 ${Math.round((m.big ? 120 : 96) * pulse)}px "Segoe UI", Arial`;
      g.fillText(fit(g, `${m.icon} ${m.title}`, W - 80), W / 2, H * 0.42);
      g.shadowBlur = 16; g.font = '700 54px "Segoe UI", Arial'; g.fillStyle = mix(bcol, '#ffffff', 0.5);
      g.fillText(fit(g, m.sub, W - 120), W / 2, H * 0.72);
      g.shadowBlur = 0;
    } else {
      this.msg = null;
      g.shadowColor = bcol; g.shadowBlur = 50; g.fillStyle = '#ffffff';
      g.font = `900 ${Math.round(150 + b.bass * 16)}px "Segoe UI", Arial`; g.fillText('BAR ONLINE', W / 2, H * 0.44);
      g.shadowBlur = 10; g.font = '600 44px "Segoe UI", Arial'; g.fillStyle = mix(a, '#ffffff', 0.4);
      g.fillText('Thả tim để vào nhảy  ·  Tặng quà mở skill múa', W / 2, H * 0.73);
      g.shadowBlur = 0;
    }
    this.tex.needsUpdate = true;
  }
}
function mix(a: string, b: string, k: number){ return '#' + new THREE.Color(a).lerp(new THREE.Color(b), k).getHexString(); }
function fit(g: CanvasRenderingContext2D, s: string, w: number){ while (s.length > 3 && g.measureText(s).width > w) s = s.slice(0, -2) + '…'; return s; }

/* ------------------------------------------------------------ sân khấu */
export class Stage {
  readonly group = new THREE.Group();
  readonly screen = new LedScreen();
  readonly smoke: Particles;
  readonly sparks: Particles;
  mode: StageMode = 'idle';
  private heads: Head[] = [];
  private lasers: THREE.InstancedMesh;
  private laserOn = 0; private laserKind: 'fan' | 'show' = 'fan';
  private pulseUntil = 0; private pulseKind: 'fan' | 'show' = 'fan';
  private strobes: THREE.MeshStandardMaterial[] = [];
  private strobeUntil = 0;
  private strobeLight: THREE.PointLight;
  private floorTiles: THREE.InstancedMesh;
  private floorMat: THREE.MeshPhysicalMaterial;
  private vu!: THREE.InstancedMesh;
  private jog: THREE.Mesh[] = [];
  private fascia: THREE.MeshStandardMaterial;
  private screenLight: THREE.PointLight;
  private wash: THREE.SpotLight[] = [];
  private focusAt: THREE.Vector3 | null = null; private focusUntil = 0;
  private ripples: { x: number; z: number; t0: number; c: THREE.Color }[] = [];
  private co2Queue: number[] = [];
  private sparkUntil = 0; private blackUntil = 0;
  private hue = 0;
  readonly theme: Theme = { a: new THREE.Color(0x3a6bff), b: new THREE.Color(0xff2fd0) };
  private _c = new THREE.Color(); private _v = new THREE.Vector3(); private _o = new THREE.Object3D();

  constructor(){
    const m = M(), g = this.group;
    const sx = (STAGE.x0 + STAGE.x1) / 2, sz = (STAGE.z0 + STAGE.z1) / 2, sw = STAGE.x1 - STAGE.x0, sd = STAGE.z1 - STAGE.z0;
    // bục sân khấu: mặt đen bóng, viền trước có dải LED điểm ảnh, bậc lên hai bên
    box(sw, STAGE.y, sd, m.lacquer, sx, STAGE.y / 2, sz, g);
    this.fascia = led(0x3a6bff, 2.5);
    box(sw, 0.05, 0.02, this.fascia, sx, STAGE.y - 0.06, STAGE.z1 + 0.005, g);
    box(sw, 0.05, 0.02, this.fascia, sx, 0.08, STAGE.z1 + 0.005, g);
    for (const s of [-1, 1]) for (let k = 0; k < 3; k++) box(1.2, STAGE.y * (k + 1) / 4, 0.32, m.marbleBlack, s * (STAGE.x1 - 0.7), STAGE.y * (k + 1) / 8, STAGE.z1 + 0.16 + (2 - k) * 0.32, g);
    // màn LED lớn và hai màn phụ xoay chéo
    const sm = new THREE.MeshBasicMaterial({ map: this.screen.tex, color: new THREE.Color(1.05, 1.05, 1.05) });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(13, 4.65), sm); scr.position.set(0, STAGE.y + 0.4 + 2.33 + 1.0, ROOM.z0 + 0.12); g.add(scr);
    box(13.3, 4.95, 0.2, m.matteBlack, 0, scr.position.y, ROOM.z0 - 0.02, g);
    for (const s of [-1, 1]){
      const sg = new THREE.PlaneGeometry(3.2, 4.4), uv = sg.attributes.uv as THREE.BufferAttribute;
      for (let i = 0; i < uv.count; i++) uv.setX(i, 0.5 + (uv.getX(i) - 0.5) * (3.2 / 4.4) / (1400 / 500) * 1.0);
      const side = new THREE.Mesh(sg, sm); side.position.set(s * 9.3, 3.9, ROOM.z0 + 1.0); side.rotation.y = -s * 0.5; g.add(side);
      const frame = box(3.4, 4.6, 0.15, m.matteBlack, 0, 0, -0.09, side); frame.castShadow = false;
    }
    this.screenLight = new THREE.PointLight(0x6a5aff, 12, 12, 1.6); this.screenLight.position.set(0, scr.position.y - 0.6, ROOM.z0 + 1.6); g.add(this.screenLight);
    this.booth(m, g);
    this.speakers(m, g);
    this.truss(m, g);
    // sàn nhảy LED: 60 ô kính đen bóng, màu phát sáng theo từng ô
    this.floorMat = new THREE.MeshPhysicalMaterial({ color: 0x070709, roughness: 0.1, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04 });
    this.floorMat.onBeforeCompile = sh => {
      sh.fragmentShader = sh.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n#ifdef USE_INSTANCING_COLOR\n totalEmissiveRadiance += vColor * 1.5;\n#endif');
    };
    const cols = FLOOR.x1 - FLOOR.x0, rows = FLOOR.z1 - FLOOR.z0, tiles: THREE.Matrix4[] = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) tiles.push(mat4(FLOOR.x0 + c + 0.5, 0.025, FLOOR.z0 + r + 0.5));
    this.floorTiles = instances(new RoundedBoxGeometry(0.96, 0.05, 0.96, 2, 0.012), this.floorMat, tiles, tiles.map(() => new THREE.Color(0.1, 0.1, 0.3)), g);
    this.floorTiles.castShadow = false;
    const fx = (FLOOR.x0 + FLOOR.x1) / 2, fz = (FLOOR.z0 + FLOOR.z1) / 2;
    for (const [w, d, x, z] of [[cols + 0.2, 0.1, fx, FLOOR.z0 - 0.05], [cols + 0.2, 0.1, fx, FLOOR.z1 + 0.05], [0.1, rows, FLOOR.x0 - 0.05, fz], [0.1, rows, FLOOR.x1 + 0.05, fz]] as const) box(w, 0.06, d, m.chrome, x, 0.03, z, g);
    // khói sân khấu, khói CO2, tia lửa lạnh
    this.smoke = new Particles(420, smoke(), false);
    this.sparks = new Particles(1600, softDot(), true);
    g.add(this.smoke.points, this.sparks.points);
    for (let i = 0; i < 45; i++) this.haze(true);
    // laser: 24 tia mảnh cộng sáng, toả ra từ giàn đèn
    this.lasers = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.008, 0.008, 1, 4, 1, true).translate(0, 0.5, 0).rotateX(Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 3, 3), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }), 24);
    this.lasers.instanceMatrix.setUsage(THREE.DynamicDrawUsage); this.lasers.frustumCulled = false; this.lasers.visible = false;
    for (let i = 0; i < 24; i++) this.lasers.setColorAt(i, new THREE.Color(0, 1, 0));
    g.add(this.lasers);
    this.strobeLight = new THREE.PointLight(0xffffff, 0, 30, 1.4); this.strobeLight.position.set(0, 6, -6); g.add(this.strobeLight);
  }

  private booth(m: ReturnType<typeof M>, g: THREE.Group){
    const b = new THREE.Group(); b.position.set(BOOTH.x, STAGE.y, BOOTH.z); g.add(b);
    // bàn DJ: mặt trước ốp LED, hai bên đồng
    box(3.0, 1.0, 0.8, m.lacquer, 0, 0.5, 0, b, 0.03);
    const face = led(0xff2fd0, 1.2); this.strobes.push(face);
    box(2.7, 0.03, 0.03, face, 0, 0.13, 0.42, b); box(2.7, 0.03, 0.03, face, 0, 0.87, 0.42, b);
    const bf = new THREE.PlaneGeometry(2.7, 0.66), buv = bf.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < buv.count; i++){ buv.setX(i, 0.5 + (buv.getX(i) - 0.5) * 0.75); buv.setY(i, 0.5 + (buv.getY(i) - 0.5) * 0.53); }
    const front = new THREE.Mesh(bf, new THREE.MeshBasicMaterial({ map: this.screen.tex, color: new THREE.Color(0.45, 0.45, 0.45) })); front.position.set(0, 0.5, 0.405); b.add(front);
    box(3.04, 0.04, 0.84, m.brass, 0, 1.0, 0, b);
    const top = 1.02;
    // hai bàn CDJ: thân, đĩa xoay có vòng sáng, màn hình
    for (const s of [-1, 1]){
      const cdj = new THREE.Group(); cdj.position.set(s * 0.82, top, -0.02); b.add(cdj);
      box(0.34, 0.08, 0.46, m.plastic, 0, 0.04, 0, cdj, 0.015);
      const jog = cyl(0.11, 0.115, 0.025, m.chrome, 0, 0.09, 0.05, cdj, 40); this.jog.push(jog);
      cyl(0.118, 0.118, 0.012, led(0x4ab0ff, 3), 0, 0.083, 0.05, cdj, 40);
      const scr = box(0.2, 0.004, 0.09, led(0x6ac0ff, 1.8), 0, 0.083, -0.15, cdj); scr.rotation.x = -0.2;
      for (let i = 0; i < 4; i++) box(0.035, 0.012, 0.035, led([0x40ff80, 0xff4040, 0xffa020, 0x4080ff][i], 2.5), -0.12 + i * 0.08, 0.085, 0.2, cdj);
    }
    // mixer: núm vặn, cần gạt, đèn VU
    const mx = new THREE.Group(); mx.position.set(0, top, 0); b.add(mx);
    box(0.36, 0.09, 0.42, m.plastic, 0, 0.045, 0, mx, 0.012);
    const knobs: THREE.Matrix4[] = [];
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) knobs.push(mat4(-0.12 + c * 0.08, 0.1, -0.16 + r * 0.06));
    instances(new THREE.CylinderGeometry(0.012, 0.014, 0.022, 16), m.darkSteel, knobs, undefined, mx);
    for (let c = 0; c < 4; c++) box(0.016, 0.02, 0.03, m.chrome, -0.12 + c * 0.08, 0.1, 0.12, mx);
    box(0.06, 0.02, 0.016, m.chrome, 0, 0.1, 0.18, mx);
    const vu: THREE.Matrix4[] = [];
    for (let c = 0; c < 2; c++) for (let r = 0; r < 10; r++) vu.push(mat4(0.15 + c * 0.012, 0.092, 0.08 - r * 0.012));
    this.vu = instances(new THREE.BoxGeometry(0.008, 0.004, 0.009), new THREE.MeshBasicMaterial({ color: new THREE.Color(2.5, 2.5, 2.5), toneMapped: false }), vu, vu.map(() => new THREE.Color(0, 0.2, 0)), mx);
    // laptop mở màn hình sáng
    const lap = new THREE.Group(); lap.position.set(1.3, top, -0.2); lap.rotation.y = -0.4; b.add(lap);
    box(0.32, 0.015, 0.22, m.steel, 0, 0.008, 0, lap);
    const lid = new THREE.Group(); lid.position.set(0, 0.015, -0.11); lid.rotation.x = -1.85; lap.add(lid);
    box(0.32, 0.01, 0.21, m.steel, 0, 0, 0.105, lid);
    const ls = box(0.29, 0.002, 0.18, led(0x8ab0ff, 1.6), 0, -0.007, 0.105, lid); ls.castShadow = false;
    // loa kiểm âm nghiêng trước bục
    for (const s of [-1, 1]){ const w = box(0.6, 0.35, 0.45, m.matteBlack, s * 2.4, STAGE.y + 0.17, STAGE.z1 - 0.35, g, 0.02); w.rotation.x = -0.35; }
  }

  private speakers(m: ReturnType<typeof M>, g: THREE.Group){
    const cone = new THREE.CylinderGeometry(0.17, 0.19, 0.04, 32).rotateX(Math.PI / 2), cap = new THREE.SphereGeometry(0.06, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2);
    for (const s of [-1, 1]){
      // loa array treo: 8 thùng cong chữ J
      const arr = new THREE.Group(); arr.position.set(s * 7.7, 6.4, -8.9); arr.rotation.y = -s * 0.25; g.add(arr);
      box(1.2, 0.08, 0.6, m.darkSteel, 0, 0.15, 0, arr);
      cyl(0.01, 0.01, ROOM.h - 6.4, m.steel, -0.4, 0.15 + (ROOM.h - 6.4) / 2, 0, arr, 4); cyl(0.01, 0.01, ROOM.h - 6.4, m.steel, 0.4, 0.15 + (ROOM.h - 6.4) / 2, 0, arr, 4);
      let y = 0, tilt = 0;
      for (let i = 0; i < 8; i++){
        const cab = new THREE.Group(); cab.position.set(0, y - 0.18, 0); cab.rotation.x = tilt; arr.add(cab);
        box(1.1, 0.3, 0.55, m.matteBlack, 0, 0, 0, cab, 0.01);
        box(1.04, 0.24, 0.01, m.darkSteel, 0, 0, 0.276, cab);
        y -= 0.31 * Math.cos(tilt); tilt += 0.05;
      }
      // loa sub: hai thùng lớn chồng, màng loa tròn
      for (let k = 0; k < 2; k++){
        const sub = new THREE.Group(); sub.position.set(s * 7.6, 0.4 + k * 0.82, -9.6); sub.rotation.y = -s * 0.2; g.add(sub);
        box(1.25, 0.8, 0.9, m.matteBlack, 0, 0, 0, sub, 0.02);
        for (const ox of [-0.3, 0.3]){ const c = new THREE.Mesh(cone, m.rubber); c.position.set(ox, 0, 0.45); sub.add(c); const d = new THREE.Mesh(cap, m.darkSteel); d.position.set(ox, 0, 0.47); sub.add(d); }
      }
    }
  }

  private truss(m: ReturnType<typeof M>, g: THREE.Group){
    // giàn khung hộp 30 cm: 4 thanh chính và thanh chéo, gộp thành một hình
    const parts: THREE.BufferGeometry[] = [];
    const span = (a: THREE.Vector3, b: THREE.Vector3) => {
      const d = b.clone().sub(a), len = d.length(), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
      const add = (geo: THREE.BufferGeometry, off: THREE.Vector3) => parts.push(geo.applyQuaternion(q).translate(a.x + off.x, a.y + off.y, a.z + off.z));
      const side = Math.abs(d.x) > Math.abs(d.z) ? new THREE.Vector3(0, 0, 0.15) : new THREE.Vector3(0.15, 0, 0);
      for (const [u, v] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]){
        const off = side.clone().multiplyScalar(u).add(new THREE.Vector3(0, v * 0.15, 0));
        add(new THREE.CylinderGeometry(0.024, 0.024, len, 6).translate(0, len / 2, 0), off);
      }
      const n = Math.floor(len / 0.5);
      for (let i = 0; i < n; i++){
        const y0 = i * 0.5, s = i % 2 ? 1 : -1;
        const dg = new THREE.CylinderGeometry(0.01, 0.01, Math.hypot(0.5, 0.3), 4).rotateZ(Math.atan2(0.3, 0.5) * s).translate(0, y0 + 0.25, 0);
        add(dg, side.clone().multiplyScalar(1));
        add(dg.clone(), side.clone().multiplyScalar(-1));
      }
    };
    const y = 6.2;
    span(new THREE.Vector3(-7.2, y, -8.4), new THREE.Vector3(7.2, y, -8.4));
    span(new THREE.Vector3(-7.2, y, -11.2), new THREE.Vector3(7.2, y, -11.2));
    span(new THREE.Vector3(-7.2, y, -11.2), new THREE.Vector3(-7.2, y, -8.4));
    span(new THREE.Vector3(7.2, y, -11.2), new THREE.Vector3(7.2, y, -8.4));
    const t = new THREE.Mesh(mergeGeometries(parts), m.steel); t.castShadow = false; g.add(t);
    for (const x of [-7.2, 7.2]) for (const z of [-8.4, -11.2]) cyl(0.012, 0.012, ROOM.h - y, m.steel, x, y + (ROOM.h - y) / 2, z, g, 4);
    // 8 đèn moving head treo ngược trên giàn trước; 4 chiếc có đèn rọi thật (đổ sáng xuống sàn)
    for (let i = 0; i < 8; i++){
      const x = -6 + i * (12 / 7), base = new THREE.Vector3(x, y - 0.2, -8.4);
      const yoke = new THREE.Group(); yoke.position.copy(base); g.add(yoke);
      box(0.3, 0.12, 0.3, m.matteBlack, 0, 0.0, 0, yoke, 0.02);
      const arms = new THREE.Group(); yoke.add(arms);
      box(0.04, 0.3, 0.1, m.matteBlack, -0.15, -0.2, 0, arms); box(0.04, 0.3, 0.1, m.matteBlack, 0.15, -0.2, 0, arms);
      const head = new THREE.Group(); head.position.y = -0.32; yoke.add(head);
      box(0.24, 0.3, 0.24, m.matteBlack, 0, 0, 0, head, 0.04);
      const lens = led(0xffffff, 6);
      const ln = cyl(0.09, 0.09, 0.02, lens, 0, -0.16, 0, head, 24); ln.castShadow = false;
      const mat = beamMaterial();
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.9, 11, 24, 1, true).translate(0, -5.5 - 0.16, 0), mat);
      beam.renderOrder = 7; head.add(beam);
      const h: Head = { yoke, head, beam, mat, lens, base, i };
      if (i % 2 === 1){
        const sp = new THREE.SpotLight(0xffffff, 60, 22, 0.16, 0.5, 1.5); sp.position.copy(base); g.add(sp, sp.target); h.light = sp;
      }
      this.heads.push(h);
    }
    // đèn strobe trên giàn sau
    for (let i = 0; i < 4; i++){ const s = led(0xffffff, 0); this.strobes.push(s); box(0.5, 0.18, 0.12, s, -4.5 + i * 3, y - 0.2, -11.2 + 0.2, g).castShadow = false; }
    // đèn rọi DJ từ giàn trước
    for (const s of [0]){
      const w = new THREE.SpotLight(0xffe0c0, 40, 16, 0.4, 0.6, 1.4); w.position.set(s * 3, y, -7.5); w.target.position.set(s * 0.4, STAGE.y + 1.2, BOOTH.z - 0.6); g.add(w, w.target); this.wash.push(w);
    }
  }

  /* ---------------------------------------------------------- điều khiển */
  setMode(mode: StageMode){
    this.mode = mode;
    if (mode === 'laser'){ this.laserOn = 1; this.laserKind = 'fan'; }
    else if (mode === 'lasershow' || mode === 'djshow' || mode === 'co2'){ this.laserOn = 1; this.laserKind = 'show'; }
    else this.laserOn = 0;
  }
  focus(p: THREE.Vector3 | null, ms = 6000){ this.focusAt = p ? p.clone() : null; this.focusUntil = performance.now() + ms; }
  ripple(x: number, z: number, color: number){ this.ripples.push({ x, z, t0: performance.now() / 1000, c: new THREE.Color(color) }); if (this.ripples.length > 6) this.ripples.shift(); }
  // laser quét ngắn theo người đang nhảy (điệu EDM, VIP), không đổi chế độ sân khấu
  laserPulse(ms: number, kind: 'fan' | 'show'){ this.pulseUntil = Math.max(this.pulseUntil, performance.now() + ms); this.pulseKind = kind; }
  strobe(ms: number){ this.strobeUntil = Math.max(this.strobeUntil, performance.now() + ms); }
  blackout(ms: number){ this.blackUntil = performance.now() + ms; }
  // CO2: n loạt phun, cách nhau ms
  co2(n = 1, gap = 900){ const t = performance.now(); for (let i = 0; i < n; i++) this.co2Queue.push(t + i * gap); }
  sparkle(ms: number){ this.sparkUntil = Math.max(this.sparkUntil, performance.now() + ms); }
  get dark(){ return performance.now() < this.blackUntil; }

  private haze(init = false){
    // khói mỏng bay là là trên sàn nhảy và sân khấu, thấy được tia đèn
    const x = (Math.random() - 0.5) * 16, z = -11 + Math.random() * 12, y = init ? 0.4 + Math.random() * 5 : 0.3;
    this.smoke.emit({ at: new THREE.Vector3(x, y, z), v: new THREE.Vector3((Math.random() - 0.5) * 0.25, 0.04 + Math.random() * 0.06, 0.15 + Math.random() * 0.15), life: 18 + Math.random() * 10, color: 0x6a6484, size: 3 + Math.random() * 1.5, grow: 1.3, alpha: 0.022, fade: 0.4, delay: init ? -Math.random() * 18 : 0 });
  }

  update(dt: number, t: number, b: Beat, viewH: number, fov: number){
    const now = performance.now(), dark = now < this.blackUntil;
    // màu chủ đạo theo màn diễn
    const th = this.theme;
    switch (this.mode){
      case 'laser': th.a.setHSL(0.33, 1, 0.5); th.b.setHSL(0.5, 1, 0.5); break;
      case 'lasershow': this.hue = (this.hue + dt * 0.25) % 1; th.a.setHSL(this.hue, 1, 0.55); th.b.setHSL((this.hue + 0.35) % 1, 1, 0.55); break;
      case 'stage': if (b.beat) this.hue = (this.hue + 0.17) % 1; th.a.setHSL(this.hue, 1, 0.55); th.b.setHSL((this.hue + 0.5) % 1, 1, 0.55); break;
      case 'toast': th.a.setHSL(0.11, 0.9, 0.55); th.b.setHSL(0.95, 0.8, 0.6); break;
      case 'co2': this.hue = (this.hue + dt * 0.12) % 1; th.a.setHSL(0.55 + Math.sin(this.hue * 6.28) * 0.05, 1, 0.6); th.b.setHSL(0.83, 1, 0.6); break;
      case 'vip': th.a.setHSL(0.12, 1, 0.55); th.b.setHSL(0.78, 1, 0.55); break;
      case 'djshow': if (b.beat) this.hue = (this.hue + 0.11) % 1; th.a.setHSL(this.hue, 1, 0.55); th.b.setHSL((this.hue + 0.42) % 1, 1, 0.55); break;
      default: th.a.setHSL(0.63 + Math.sin(t * 0.07) * 0.04, 1, 0.55); th.b.setHSL(0.86 + Math.sin(t * 0.05) * 0.03, 1, 0.55);
    }
    const big = this.mode === 'djshow' || this.mode === 'co2' || this.mode === 'stage' || this.mode === 'lasershow' || this.mode === 'vip';
    this.fascia.emissive.copy(b.beat ? th.b : th.a); this.fascia.emissiveIntensity = dark ? 0 : 2 + b.bass * 2;
    this.strobes[0].emissive.copy(th.b); this.strobes[0].emissiveIntensity = dark ? 0 : 1.2 + b.bass * 1.2;
    // moving head: quét theo hình số 8 theo nhịp; có người cần rọi thì cả dàn chụm về người đó
    const focus = this.focusAt && now < this.focusUntil ? this.focusAt : null;
    for (const h of this.heads){
      const k = h.i / 7, sp = big ? 1.6 : 0.6;
      let pan = Math.sin(t * sp * 0.7 + k * 3) * 0.9, tilt = 0.35 + Math.sin(t * sp + k * 6.28) * 0.35 + (big ? 0.2 : 0);
      if (focus){
        this._v.copy(focus).sub(h.base);
        pan = Math.atan2(this._v.x, this._v.z); tilt = Math.acos(Math.max(-1, Math.min(1, -this._v.y / this._v.length())));
      }
      // đầu đèn chúc xuống (-y); nghiêng âm quanh trục x thì tia hướng ra phía khán giả (+z)
      h.yoke.rotation.y += (pan - h.yoke.rotation.y) * Math.min(1, dt * 4);
      h.head.rotation.x += (-tilt - h.head.rotation.x) * Math.min(1, dt * 4);
      const c = this._c.copy(h.i % 2 ? th.a : th.b);
      if (focus) c.setRGB(1, 0.95, 0.85);
      const on = dark ? 0 : this.mode === 'idle' ? 0.55 + b.level * 0.35 : 0.8 + b.bass * 0.4;
      h.mat.uniforms.color.value.copy(c); h.mat.uniforms.power.value = on * (focus ? 0.45 : 0.32);
      h.lens.emissive.copy(c); h.lens.emissiveIntensity = on * 6;
      if (h.light){
        h.light.color.copy(c); h.light.intensity = on * 70;
        h.head.updateWorldMatrix(true, false);
        h.light.position.copy(h.head.getWorldPosition(this._v));
        h.light.target.position.copy(this._v).add(new THREE.Vector3(0, -1, 0).applyQuaternion(h.head.getWorldQuaternion(new THREE.Quaternion())).multiplyScalar(10));
        h.light.target.updateMatrixWorld();
      }
    }
    for (const w of this.wash) w.intensity = dark ? 0 : 35 + b.bass * 20;
    this.screenLight.color.copy(th.a).lerp(th.b, 0.5); this.screenLight.intensity = dark ? 0 : 8 + b.level * 8;
    // laser
    this.laserOn = Math.max(0, this.laserOn);
    const pulsing = now < this.pulseUntil, kind = this.laserOn > 0 ? this.laserKind : this.pulseKind;
    this.lasers.visible = (this.laserOn > 0 || pulsing) && !dark;
    if (this.lasers.visible){
      const src = new THREE.Vector3(0, 6.0, -8.6);
      for (let i = 0; i < 24; i++){
        const f = i / 23 - 0.5;
        let yaw: number, pitch: number;
        if (kind === 'fan'){ yaw = f * 1.6 + Math.sin(t * 0.8) * 0.4; pitch = -0.32 + Math.sin(t * 1.3 + f * 2) * 0.12; }
        else { const ring = i % 2; yaw = f * 2.2 * Math.cos(t * 0.9) + Math.sin(t * 2.2 + i) * 0.25; pitch = -0.2 - ring * 0.25 + Math.sin(t * 3 + i * 0.7) * 0.18; }
        this._o.position.copy(src); this._o.rotation.set(-pitch, yaw, 0, 'YXZ'); this._o.scale.set(1, 1, 26); this._o.updateMatrix();
        this.lasers.setMatrixAt(i, this._o.matrix);
        const lc = kind === 'fan' ? this._c.setRGB(0.1, 1, 0.2) : this._c.setHSL((i / 24 + t * 0.2) % 1, 1, 0.5);
        this.lasers.setColorAt(i, lc);
      }
      this.lasers.instanceMatrix.needsUpdate = true; if (this.lasers.instanceColor) this.lasers.instanceColor.needsUpdate = true;
      (this.lasers.material as THREE.MeshBasicMaterial).opacity = b.beat ? 1 : 0.75;
    }
    // strobe
    const strobing = now < this.strobeUntil && !dark, flash = strobing && Math.floor(now / 70) % 2 === 0;
    for (let i = 1; i < this.strobes.length; i++) this.strobes[i].emissiveIntensity = flash ? 7 : 0;
    this.strobeLight.intensity = flash ? 45 : 0;
    // bàn DJ: đĩa xoay, đèn VU nhảy theo âm lượng
    for (const j of this.jog) j.rotation.y += dt * 3.5;
    for (let c = 0; c < 2; c++) for (let r = 0; r < 10; r++){
      const lit = r / 10 < b.level * 1.1 + (c ? b.bass * 0.2 : 0);
      this.vu.setColorAt(c * 10 + r, lit ? this._c.setHSL(r < 6 ? 0.33 : r < 8 ? 0.14 : 0, 1, 0.5) : this._c.setRGB(0.02, 0.04, 0.02));
    }
    if (this.vu.instanceColor) this.vu.instanceColor.needsUpdate = true;
    this.floor(t, b, dark);
    // khói: luôn bổ sung cho đủ; CO2 phun theo hàng chờ; pháo lạnh phun liên tục khi bật
    if (this.smoke.count < 45) this.haze();
    while (this.co2Queue.length && this.co2Queue[0] <= now){ this.co2Queue.shift(); this.co2Burst(); }
    if (now < this.sparkUntil && !dark) for (const x of [-5.4, -2.4, 2.4, 5.4]) for (let i = 0; i < 6; i++){
      this.sparks.emit({ at: new THREE.Vector3(x, STAGE.y + 0.05, STAGE.z1 - 0.15), v: new THREE.Vector3((Math.random() - 0.5) * 0.7, 6.5 + Math.random() * 2.2, (Math.random() - 0.5) * 0.7), life: 1.1 + Math.random() * 0.5, color: Math.random() < 0.8 ? 0xffc870 : 0xffffff, size: 0.05 + Math.random() * 0.04, gravity: 6, drag: 0.6, fade: 0.5 });
    }
    this.smoke.mat.uniforms.gain.value = dark ? 0.15 : 0.6 + b.level * 0.2;
    this.smoke.update(dt, viewH, fov);
    this.sparks.update(dt, viewH, fov);
    this.screen.draw(t, b, th, this.mode);
  }

  private co2Burst(){
    // mỗi vòi phun một cột khói trắng lạnh vọt lên rồi toả rộng
    // cột khói hẹp, sáng vừa (khói không tự phát sáng nên tối hơn trắng tinh), tan nhanh để không phủ trắng khung hình
    for (const x of [-5, -3, -1, 1, 3, 5]) for (let i = 0; i < 14; i++){
      const sp = 9 + Math.random() * 4;
      this.smoke.emit({ at: new THREE.Vector3(x, STAGE.y + 0.1, STAGE.z1 - 0.2), v: new THREE.Vector3((Math.random() - 0.5) * 0.8, sp, 0.4 + (Math.random() - 0.5) * 0.8), life: 1.1 + Math.random() * 0.5, color: 0x8a94a6, size: 0.35, grow: 3.2, alpha: 0.2, drag: 2.8, fade: 0.65, delay: i * 0.015 });
    }
  }

  // sàn LED: sóng màu theo nhịp, gợn tròn từ chỗ người tặng quà, bàn cờ chớp khi diễn lớn
  private floor(t: number, b: Beat, dark: boolean){
    const cols = FLOOR.x1 - FLOOR.x0, rows = FLOOR.z1 - FLOOR.z0, th = this.theme, now = performance.now() / 1000;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++){
      const i = r * cols + c, x = FLOOR.x0 + c + 0.5, z = FLOOR.z0 + r + 0.5;
      let k: number;
      if (this.mode === 'djshow' || this.mode === 'stage'){ k = ((c + r + Math.floor(b.phase * 2)) % 2) ? 1 : 0.08; this._c.copy(k > 0.5 ? th.a : th.b); }
      else { const w = Math.sin((c * 1.1 - r * 0.8) - t * 2.6) * 0.5 + 0.5, w2 = Math.sin(c * 0.5 + r * 0.9 + t * 1.3) * 0.5 + 0.5; k = 0.32 + w * 0.32 + w2 * 0.12 + b.bass * 0.25; this._c.copy(th.a).lerp(th.b, w * 0.7 + w2 * 0.3); }
      for (const rp of this.ripples){ const d = Math.hypot(x - rp.x, z - rp.z), age = now - rp.t0, ring = Math.max(0, 1 - Math.abs(d - age * 5) * 1.3) * Math.max(0, 1 - age / 2.2); if (ring > 0){ this._c.lerp(rp.c, ring); k = Math.max(k, ring * 1.3); } }
      this._c.multiplyScalar(dark ? 0.02 : k);
      this.floorTiles.setColorAt(i, this._c);
    }
    if (this.floorTiles.instanceColor) this.floorTiles.instanceColor.needsUpdate = true;
  }
}
