import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { cloudSprite, glowSprite } from './tex.ts';

// Trời và ánh sáng sân đình (vòng tự chuyển chỉ gồm chiều và tối): ban ngày nắng vàng trời xanh, buổi chiều hoàng hôn cam tím đèn lồng bắt đầu sáng,
// buổi tối đèn lồng đỏ, dây đèn, đèn sân khấu lung linh dưới trời sao. Bầu trời tán xạ vật lý (Sky), ánh sáng môi trường HDR
// lấy từ chính bầu trời (PMREM) nên vật liệu PBR phản chiếu đúng màu trời từng buổi. Tự chuyển buổi theo vòng, hoặc chốt bằng
// ?troi=ngay | chieu | toi. Quà lớn: cả sân bừng sáng, đèn chớp nhiều màu (celebrate).

export type TimeOfDay = 'ngay' | 'chieu' | 'toi';
interface State {
  elev: number; azim: number; sun: number; sunInt: number; skyC: number; groundC: number; hemiInt: number; fog: number; exposure: number;
  turbidity: number; rayleigh: number; mie: number; night: number; cloud: number; envInt: number;
}
const STATES: Record<TimeOfDay, State> = {
  ngay: { elev: 52, azim: 215, sun: 0xfff1dc, sunInt: 3.1, skyC: 0xcfe4ff, groundC: 0x8a7458, hemiInt: 0.85, fog: 0xc4daee, exposure: 0.95, turbidity: 2.2, rayleigh: 2.2, mie: 0.003, night: 0, cloud: 0xffffff, envInt: 0.9 },
  chieu: { elev: 7, azim: 238, sun: 0xffa05a, sunInt: 2.5, skyC: 0xffc8a0, groundC: 0x6a4a3a, hemiInt: 0.65, fog: 0xe8b08e, exposure: 1.05, turbidity: 9, rayleigh: 2.8, mie: 0.012, night: 0.4, cloud: 0xffb890, envInt: 0.75 },
  toi: { elev: 38, azim: 150, sun: 0x8ea8ff, sunInt: 0.42, skyC: 0x34467a, groundC: 0x1e1610, hemiInt: 0.42, fog: 0x131a30, exposure: 1.15, turbidity: 2, rayleigh: 0.4, mie: 0.002, night: 1, cloud: 0x3a4466, envInt: 0.35 },
};
// chỉ luân phiên chiều và tối (ban ngày nắng gắt lóa quá); muốn xem ban ngày thì ?troi=ngay
const ORDER: TimeOfDay[] = ['chieu', 'toi'];
const HOLD = { ngay: 300, chieu: 300, toi: 360 };          // giây mỗi buổi
const FADE = 45;                                            // giây chuyển buổi

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const _c1 = new THREE.Color(), _c2 = new THREE.Color();
const lerpHex = (a: number, b: number, t: number, out: THREE.Color) => out.copy(_c1.setHex(a)).lerp(_c2.setHex(b), t);

export class Env {
  readonly sunDir = new THREE.Vector3();
  night = 0; day = 1; warm = 0;
  private sky = new Sky(); private envSky = new Sky(); private envScene = new THREE.Scene();
  private pmrem: THREE.PMREMGenerator; private envRT: THREE.WebGLRenderTarget | null = null; private envAt = -1e9; private envKey = '';
  private stars: THREE.Points; private moon: THREE.Sprite; private clouds: THREE.Sprite[] = [];
  private fixed: TimeOfDay | null; private t0 = performance.now();
  private lights: THREE.PointLight[] = [];
  private party = 0;
  private cur = { ...STATES.chieu };

  private scene: THREE.Scene; private renderer: THREE.WebGLRenderer; private hemi: THREE.HemisphereLight; private sun: THREE.DirectionalLight;
  private base: { hemi: number; sun: number; fog: THREE.Color };
  constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, hemi: THREE.HemisphereLight, sun: THREE.DirectionalLight, base: { hemi: number; sun: number; fog: THREE.Color }, warmSpots: THREE.Vector3[]){
    this.scene = scene; this.renderer = renderer; this.hemi = hemi; this.sun = sun; this.base = base;
    const q = new URLSearchParams(location.search).get('troi') as TimeOfDay | null;
    this.fixed = q && q in STATES ? q : null;
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.sky.scale.setScalar(100); this.envSky.scale.setScalar(100);
    scene.add(this.sky); this.envScene.add(this.envSky);
    scene.background = null;

    // sao: chấm sáng rải trên vòm trời, chỉ hiện về đêm
    const sp: number[] = [];
    for (let i = 0; i < 900; i++){ const u = Math.random() * Math.PI * 2, v = Math.acos(Math.random() * 0.95), r = 90; sp.push(Math.sin(v) * Math.cos(u) * r, Math.cos(v) * r, Math.sin(v) * Math.sin(u) * r); }
    const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
    this.stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.35, sizeAttenuation: true, transparent: true, opacity: 0, depthWrite: false, fog: false }));
    this.moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowSprite(), color: 0xf4f0ff, transparent: true, opacity: 0, depthWrite: false, fog: false, toneMapped: false }));
    this.moon.scale.setScalar(7); this.moon.position.set(-30, 48, -60);
    scene.add(this.stars, this.moon);
    // mây trôi xa
    for (let i = 0; i < 6; i++){
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: cloudSprite(), transparent: true, opacity: 0.55, depthWrite: false, fog: false }));
      s.scale.set(22 + Math.random() * 14, 7 + Math.random() * 4, 1); s.position.set(-75 + i * 30 + Math.random() * 10, 34 + Math.random() * 14, -80 - Math.random() * 8);
      this.clouds.push(s); scene.add(s);
    }
    // đèn ấm về đêm: dưới hiên đình, cổng hoa, hai dãy mâm
    for (const p of warmSpots){ const l = new THREE.PointLight(0xffa860, 0, 16, 1.6); l.position.copy(p); this.lights.push(l); scene.add(l); }
  }

  get phase(): TimeOfDay { return this.fixed ?? this.cycle().a; }
  // vị trí trong vòng ngày - chiều - tối
  private cycle(){
    const total = ORDER.reduce((s, k) => s + HOLD[k] + FADE, 0);
    let t = ((performance.now() - this.t0) / 1000) % total;
    for (let i = 0; i < ORDER.length; i++){
      const a = ORDER[i], b = ORDER[(i + 1) % ORDER.length];
      if (t < HOLD[a]) return { a, b, k: 0 };
      t -= HOLD[a];
      if (t < FADE) return { a, b, k: smooth(t / FADE) };
      t -= FADE;
    }
    return { a: ORDER[0], b: ORDER[1 % ORDER.length], k: 0 };
  }
  // quà lớn: đèn bừng sáng, chớp màu vài giây
  celebrate(power = 1){ this.party = Math.max(this.party, 4 + power * 3); }
  // đổi buổi ngay (bảng điều khiển hay thử nghiệm)
  set(p: TimeOfDay | null){ this.fixed = p; }

  update(dt: number, now: number){
    const { a, b, k } = this.fixed ? { a: this.fixed, b: this.fixed, k: 0 } : this.cycle();
    const A = STATES[a], B = STATES[b], c = this.cur;
    for (const key of Object.keys(A) as (keyof State)[]) if (!['sun', 'skyC', 'groundC', 'fog', 'cloud'].includes(key)) (c as any)[key] = lerp(A[key], B[key], k);
    // trời đêm: mặt trời lặn dưới chân trời, ánh trăng xanh từ cao
    const skyElev = lerp(a === 'toi' ? -12 : A.elev, b === 'toi' ? -12 : B.elev, k);
    const phi = THREE.MathUtils.degToRad(90 - skyElev), th = THREE.MathUtils.degToRad(c.azim);
    const skySun = new THREE.Vector3().setFromSphericalCoords(1, phi, th);
    for (const s of [this.sky, this.envSky]){
      const u = s.material.uniforms;
      u.turbidity.value = c.turbidity; u.rayleigh.value = c.rayleigh; u.mieCoefficient.value = c.mie; u.mieDirectionalG.value = 0.82; u.sunPosition.value.copy(skySun);
    }
    // nguồn sáng chính: mặt trời (ngày, chiều) hoặc trăng (tối)
    this.sunDir.setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - Math.max(6, c.elev)), th);
    this.sun.position.copy(this.sunDir).multiplyScalar(26).add(new THREE.Vector3(0, 0, 5));
    lerpHex(A.sun, B.sun, k, this.sun.color);
    lerpHex(A.skyC, B.skyC, k, this.hemi.color); lerpHex(A.groundC, B.groundC, k, this.hemi.groundColor);
    lerpHex(A.fog, B.fog, k, this.base.fog);
    this.night = c.night; this.day = 1 - c.night; this.warm = Math.max(0, 1 - Math.abs(c.night - 0.4) / 0.4) * (c.night < 0.95 ? 1 : 0);
    // quà lớn: sáng bừng, đèn chớp màu
    this.party = Math.max(0, this.party - dt);
    const p = Math.min(1, this.party / 2);
    this.base.hemi = c.hemiInt * (1 + p * 0.35); this.base.sun = c.sunInt;
    this.renderer.toneMappingExposure = c.exposure * (1 + p * 0.12);
    const glow = Math.max(this.night, 0.08) * (1 + p * 1.2);
    this.lights.forEach((l, i) => {
      l.intensity = glow * 9 * (0.92 + Math.sin(now / 160 + i * 1.7) * 0.08);
      if (p > 0) l.color.setHSL(((now / 900) + i * 0.17) % 1, 0.8, 0.6); else l.color.set(0xffa860);
    });
    (this.stars.material as THREE.PointsMaterial).opacity = Math.max(0, this.night - 0.5) * 2;
    (this.moon.material as THREE.SpriteMaterial).opacity = Math.max(0, this.night - 0.6) * 2.2;
    lerpHex(A.cloud, B.cloud, k, _c1);
    for (const s of this.clouds){ (s.material as THREE.SpriteMaterial).color.copy(_c1); s.position.x += dt * 0.25; if (s.position.x > 90) s.position.x = -90; }
    // ánh sáng môi trường HDR: dựng lại từ bầu trời khi buổi đổi (tối đa 1 lần / 2 giây khi đang chuyển)
    const key = `${a}${b}${Math.round(k * 20)}`;
    if (key !== this.envKey && now - this.envAt > 2000){
      this.envKey = key; this.envAt = now;
      const rt = this.pmrem.fromScene(this.envScene, 0, 1, 300);
      this.envRT?.dispose(); this.envRT = rt;
      this.scene.environment = rt.texture;
    }
    this.scene.environmentIntensity = c.envInt;
    return glow;
  }
}
const smooth = (t: number) => t * t * (3 - 2 * t);
