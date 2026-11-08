import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { Water } from 'three/examples/jsm/objects/Water.js';
import { RACE } from '../shared/game.ts';
import type { MapDef, MapKey } from '../shared/maps.ts';
import type { Pose, Track } from './track.ts';
import { TrackField, buildTerrain, colored, detailTextures, fbm, hash2, ridged, rng, rockGeo, smooth, vnoise, waterNormals } from './terrain.ts';
import type { Terrain, TerrainSpec } from './terrain.ts';

// 5 bản đồ đua dựng hoàn toàn bằng code: đảo nhiệt đới, núi tuyết, thành phố hiện đại, hẻm núi rừng rậm, sa mạc.
// Mỗi bản đồ: bầu trời vật lý có chiều sâu, mây khối, địa hình chi tiết né đường bay, cây cối, nước phản chiếu,
// nắng và bóng đổ, vật trang trí ven đường, vòng checkpoint lớn, cổng tăng tốc, bãi mìn, cổng đường tắt mạo hiểm,
// đường băng có sân bay, cổng xuất phát / về đích. Vật lặp lại (cây, đá, nhà, mìn, đèn) dùng InstancedMesh.

type Veg = 'palm' | 'pine' | 'jungle' | 'cactus' | 'broadleaf';
interface Theme {
  sky: { turbidity: number; rayleigh: number; mie: number; mieG: number; elev: number; azim: number };
  exposure: number; fog: number; fogNear: number; fogFar: number;
  sun: [number, number]; hemi: [number, number, number];
  water: 'sea' | 'river' | 'ice' | 'none'; waterY: number; waterColor: number;
  veg: [Veg, number][];
  clouds: number; weather?: 'snow' | 'dust' | 'mist';
}
const THEMES: Record<MapKey, Theme> = {
  tropical: { sky: { turbidity: 2.4, rayleigh: 1.1, mie: 0.004, mieG: 0.8, elev: 52, azim: 150 }, exposure: 0.5, fog: 0xb4d2ea, fogNear: 500, fogFar: 3400,
    sun: [0xfff1dc, 3.4], hemi: [0xcfe6ff, 0x5f7f5a, 1.15], water: 'sea', waterY: 0, waterColor: 0x0a5f80, veg: [['palm', 1700], ['broadleaf', 500]], clouds: 70 },
  snow: { sky: { turbidity: 1.4, rayleigh: 0.55, mie: 0.003, mieG: 0.75, elev: 30, azim: 205 }, exposure: 0.5, fog: 0xd6e2ee, fogNear: 400, fogFar: 2700,
    sun: [0xfff4e8, 3.0], hemi: [0xe6f0ff, 0x8a96a6, 1.3], water: 'ice', waterY: 3, waterColor: 0xbfe2f2, veg: [['pine', 2600]], clouds: 60, weather: 'snow' },
  city: { sky: { turbidity: 5.5, rayleigh: 2.6, mie: 0.007, mieG: 0.88, elev: 5, azim: 245 }, exposure: 0.62, fog: 0xd8a080, fogNear: 500, fogFar: 3000,
    sun: [0xffa66a, 2.8], hemi: [0x9fb2e0, 0x4a3a40, 0.95], water: 'sea', waterY: 0, waterColor: 0x1a3a55, veg: [['broadleaf', 500]], clouds: 45 },
  jungle: { sky: { turbidity: 7, rayleigh: 1.6, mie: 0.006, mieG: 0.82, elev: 42, azim: 115 }, exposure: 0.5, fog: 0xb6cdb4, fogNear: 300, fogFar: 2300,
    sun: [0xfff0c8, 3.1], hemi: [0xd8f0d0, 0x3a5a2a, 1.2], water: 'river', waterY: 4, waterColor: 0x2a5a48, veg: [['jungle', 3200], ['palm', 500]], clouds: 60, weather: 'mist' },
  desert: { sky: { turbidity: 9, rayleigh: 0.9, mie: 0.006, mieG: 0.8, elev: 58, azim: 100 }, exposure: 0.48, fog: 0xe9d1a8, fogNear: 600, fogFar: 3300,
    sun: [0xfff0d0, 3.7], hemi: [0xffe6c0, 0xb08a5a, 1.05], water: 'none', waterY: -50, waterColor: 0x2a6a7a, veg: [['cactus', 900]], clouds: 25, weather: 'dust' },
};

// Dùng chung giữa các bản đồ (không tạo lại khi đổi cảnh): bầu trời, mặt nước phản chiếu, texture chi tiết
let shared: { sky: Sky; water: Water; detail: { detail: THREE.Texture; normal: THREE.Texture } } | null = null;
function sharedRes(lite: boolean){
  if (shared) return shared;
  const sky = new Sky(); sky.scale.setScalar(9000);
  const water = new Water(new THREE.PlaneGeometry(12000, 12000).rotateX(-Math.PI / 2), {
    textureWidth: lite ? 256 : 512, textureHeight: lite ? 256 : 512, waterNormals: waterNormals(), sunDirection: new THREE.Vector3(0, 1, 0),
    sunColor: 0xffffff, waterColor: 0x0a5f80, distortionScale: 3.2, fog: true,
  });
  (water.material as THREE.ShaderMaterial).uniforms.size.value = 6;
  shared = { sky, water, detail: detailTextures(3) };
  return shared;
}

export interface Ring { u: number; group: THREE.Group; mat: THREE.MeshBasicMaterial; base: THREE.Color; flash: number }

export class World {
  readonly group = new THREE.Group();
  readonly def: MapDef; readonly theme: Theme;
  readonly sunDir = new THREE.Vector3();
  readonly runwayY = 6;
  readonly rings: Ring[] = [];
  readonly blockers: THREE.Object3D[] = [];   // vật to có thể che máy quay (vòm đá, nhà cao tầng, núi bàn, vách thác...)
  terrain!: Terrain;
  private track: Track; private field: TrackField; private lite: boolean; private rnd: () => number;
  private anims: ((dt: number, t: number, cam: THREE.Camera) => void)[] = [];
  private env: THREE.Texture | null = null;
  private owned: THREE.Object3D[] = [];
  private pose: Pose;

  constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer, track: Track, def: MapDef, lights: { sun: THREE.DirectionalLight; hemi: THREE.HemisphereLight }, lite: boolean){
    this.track = track; this.def = def; this.theme = THEMES[def.key]; this.lite = lite; this.rnd = rng(def.key.length * 7919 + 13);
    this.pose = { p: new THREE.Vector3(), t: new THREE.Vector3(), r: new THREE.Vector3(), u: new THREE.Vector3(), turn: 0, climb: 0 };
    const th = this.theme, res = sharedRes(lite);
    scene.add(this.group);
    // trời + ánh sáng
    const su = res.sky.material.uniforms;
    su.turbidity.value = th.sky.turbidity; su.rayleigh.value = th.sky.rayleigh; su.mieCoefficient.value = th.sky.mie; su.mieDirectionalG.value = th.sky.mieG;
    this.sunDir.setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - th.sky.elev), THREE.MathUtils.degToRad(th.sky.azim));
    su.sunPosition.value.copy(this.sunDir);
    this.group.add(res.sky);
    renderer.toneMappingExposure = th.exposure;
    const pm = new THREE.PMREMGenerator(renderer), envScene = new THREE.Scene();
    envScene.add(res.sky.clone());
    this.env = pm.fromScene(envScene, 0.04).texture; pm.dispose();
    scene.environment = this.env; scene.environmentIntensity = 0.45;
    scene.fog = new THREE.Fog(th.fog, th.fogNear, th.fogFar);
    lights.sun.color.setHex(th.sun[0]); lights.sun.intensity = th.sun[1];
    lights.hemi.color.setHex(th.hemi[0]); lights.hemi.groundColor.setHex(th.hemi[1]); lights.hemi.intensity = th.hemi[2];
    // đường bay và đường băng để địa hình né
    const runway: THREE.Vector3[] = [];
    // đường băng đủ dài cho cả hàng xuất phát
    for (let d = -(Math.ceil(RACE.maxRacers / RACE.gridCols) * RACE.gridGap + 120); d <= 640; d += 20){ track.pose(d / RACE.lapLen, this.pose); runway.push(this.pose.p.clone().setY(this.runwayY)); }
    this.field = new TrackField(track.samples(Math.ceil(track.length / 12)), runway, this.runwayY);
    this.terrain = buildTerrain(this.terrainSpec(), this.field, res.detail.detail, res.detail.normal);
    this.add(this.terrain.mesh);
    this.waterSetup(res.water);
    const dens = Math.max(1, track.length / 7500) * 0.65;   // đường dài thì cây, đá, mây dày lên theo
    for (const [k, n] of th.veg) this.vegetation(k, Math.round(n * dens * (lite ? 0.5 : 1)));
    this.rocks();
    this.clouds(Math.round(th.clouds * dens * (lite ? 0.6 : 1)));
    this.airport(runway);
    this.startGate();
    this.checkpoints();
    this.speedGates();
    this.mines();
    this.shortcutArch();
    this.balloons();
    this.themeProps();
    if (th.weather) this.weather(th.weather);
  }

  private add(...o: THREE.Object3D[]){ this.group.add(...o); this.owned.push(...o); }
  // điểm cạnh đường bay: u phần vòng, lat lệch ngang (m, dương là bên phải), up lệch đứng
  private side(u: number, lat: number, up = 0){ const p = this.track.pose(u, this.pose); return p.p.clone().addScaledVector(p.r, lat).addScaledVector(p.u, up); }
  private ground(x: number, z: number){ return this.terrain.at(x, z); }
  private bounds(){ const pts = this.track.samples(200), b = new THREE.Box3().setFromPoints(pts); return { c: b.getCenter(new THREE.Vector3()), r: Math.max(b.max.x - b.min.x, b.max.z - b.min.z) / 2 }; }

  /* ------------------------------------------------------------ địa hình */
  private terrainSpec(): TerrainSpec {
    const { c, r } = this.bounds(), size = r * 2 + 2600, seg = this.lite ? 260 : 420, k = this.def.key;
    const col = new THREE.Color(), C = (hex: number) => col.setHex(hex);
    const pts = this.track.samples(60), rnd = rng(77);
    // các đảo quanh đường bay (đảo nhiệt đới, thành phố)
    const islands: { x: number; z: number; r: number; h: number; flat?: boolean }[] = [];
    if (k === 'tropical' || k === 'city'){
      for (let i = 0; i < 18 * Math.max(1, this.track.length / 7500); i++){
        const p = pts[Math.floor(rnd() * pts.length)], a = rnd() * Math.PI * 2, d = 90 + rnd() * 260;
        islands.push({ x: p.x + Math.cos(a) * d, z: p.z + Math.sin(a) * d, r: 90 + rnd() * 180, h: 40 + rnd() * (k === 'city' ? 120 : 220) });
      }
      for (let i = 0; i < 7; i++){ const a = i / 7 * Math.PI * 2 + rnd(); islands.push({ x: c.x + Math.cos(a) * (r + 600), z: c.z + Math.sin(a) * (r + 600), r: 320 + rnd() * 200, h: 260 + rnd() * 200 }); }
      if (k === 'city'){ const p = this.side(0.5, 0); islands.push({ x: p.x, z: p.z, r: 420, h: 9, flat: true }); }
    }
    const isl = (x: number, z: number) => {
      let h = -16;
      for (const s of islands){
        const d = Math.hypot(x - s.x, z - s.z) / s.r;
        if (d >= 1.15) continue;
        const fall = Math.max(0, 1 - d * d);
        const v = s.flat ? (d < 1 ? Math.min(s.h, s.h * fall * 5) + fbm(x / 40, z / 40, 2) * 1.5 : -6)
          : s.h * fall ** 1.4 * (0.35 + 0.55 * ridged(x / 160 + s.r, z / 160, 4) + 0.3 * fbm(x / 90, z / 90, 3));
        h = Math.max(h, v - 6 * (1 - fall));
      }
      return h;
    };
    const height: Record<MapKey, (x: number, z: number) => number> = {
      tropical: isl, city: isl,
      snow: (x, z) => 18 + 340 * ridged(x / 760, z / 760, 6) ** 1.6 * (0.45 + 0.75 * fbm(x / 1600 + 3, z / 1600, 3)) + 18 * fbm(x / 120, z / 120, 3),
      jungle: (x, z) => {
        const base = 12 + 34 * fbm(x / 320, z / 320, 4), t = vnoise(x / 115, z / 115);
        const pillar = smooth(0.6, 0.78, t) * (120 + 120 * vnoise(x / 57 + 4, z / 57));
        const river = smooth(0.46, 0.38, fbm(x / 420 + 7, z / 420, 3)) * 30;
        return base + pillar + 70 * ridged(x / 700, z / 700, 4) ** 2 - river;
      },
      desert: (x, z) => {
        const w = 2 * fbm(x / 320, z / 320, 3);
        const dunes = 16 + 15 * (1 - Math.abs(Math.sin(x / 95 + z / 260 + w))) ** 2 + 8 * fbm(x / 60, z / 60, 3);
        const m = fbm(x / 540 + 9, z / 540, 4), plateau = smooth(0.55, 0.585, m) * (90 + 50 * fbm(x / 200, z / 200, 2));
        return dunes + plateau;
      },
    };
    const color: Record<MapKey, TerrainSpec['color']> = {
      tropical: (h, s, x, z, o) => {
        if (h < -2) o.copy(C(0x3fb7b0)).lerp(C(0x1d6f88), Math.min(1, -h / 14));
        else if (h < 3.5) o.copy(C(0xf0dca4));
        else if (s > 0.5) o.copy(C(0x8b7f70)).lerp(C(0x6a6458), hash2(x, z) * 0.5);
        else o.copy(C(0x4f9f3c)).lerp(C(0x2f7a32), fbm(x / 60, z / 60, 3));
      },
      city: (h, s, x, z, o) => {
        if (h < -2) o.copy(C(0x2a6a7a)); else if (h < 3) o.copy(C(0xc8b890));
        else if (h < 12 && s < 0.2) o.copy(C(0x7a7e82)).lerp(C(0x5f9a4a), fbm(x / 50, z / 50, 2) * 0.4);
        else if (s > 0.5) o.copy(C(0x857a6c)); else o.copy(C(0x4a8a3c)).lerp(C(0x356e30), fbm(x / 60, z / 60, 3));
      },
      snow: (h, s, x, z, o) => {
        const snowy = h > 40 + fbm(x / 80, z / 80, 3) * 60 && s < 0.55;
        if (snowy) o.copy(C(0xf6f9fc)).lerp(C(0xdbe6f0), hash2(x, z) * 0.4);
        else if (s > 0.42) o.copy(C(0x5c5f66)).lerp(C(0x7b7f86), fbm(x / 30, z / 30, 2));
        else o.copy(C(0x6f7a68)).lerp(C(0xe8eef4), 0.55);
      },
      jungle: (h, s, x, z, o) => {
        if (h < 9) o.copy(C(0x6a5a3a));
        else if (s > 0.6) o.copy(C(0x6e6a5c)).lerp(C(0x4a5a3a), fbm(x / 20, z / 20, 2) * 0.7);
        else o.copy(C(0x2f6a26)).lerp(C(0x1c4f1c), fbm(x / 50, z / 50, 3));
      },
      desert: (h, s, x, z, o) => {
        if (s > 0.38){ const band = (Math.sin(h / 5.5) + 1) / 2; o.copy(C(0xb2552e)).lerp(C(0xd88a52), band).lerp(C(0x8a4a2e), fbm(x / 25, z / 25, 2) * 0.3); }
        else if (h > 70) o.copy(C(0xc9864e)); else o.copy(C(0xe3bd7e)).lerp(C(0xd4a464), fbm(x / 40, z / 40, 3));
      },
    };
    return { size, seg, cx: c.x, cz: c.z, height: height[k], color: color[k] };
  }

  /* ---------------------------------------------------------------- nước */
  private waterSetup(water: Water){
    const th = this.theme;
    if (th.water === 'sea' || th.water === 'river'){
      const u = (water.material as THREE.ShaderMaterial).uniforms;
      u.waterColor.value.setHex(th.waterColor); u.sunDirection.value.copy(this.sunDir); u.sunColor.value.setHex(th.sun[0]);
      water.position.y = th.waterY;
      this.group.add(water);
      this.anims.push(dt => { u.time.value += dt * 0.6; });
    } else if (th.water === 'ice'){
      const ice = new THREE.Mesh(new THREE.PlaneGeometry(12000, 12000).rotateX(-Math.PI / 2),
        new THREE.MeshPhysicalMaterial({ color: th.waterColor, roughness: 0.12, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.3 }));
      ice.position.y = th.waterY; ice.receiveShadow = true; this.add(ice);
      this.anims.push((_, __, cam) => { ice.position.x = cam.position.x; ice.position.z = cam.position.z; });
    }
  }

  /* --------------------------------------------------------------- cây */
  private vegGeo(k: Veg){
    switch (k){
      case 'palm': {
        const parts: [THREE.BufferGeometry, number][] = [];
        for (let i = 0; i < 6; i++) parts.push([new THREE.CylinderGeometry(0.32 - i * 0.03, 0.38 - i * 0.03, 2.2, 7).translate(i * i * 0.05, 1.1 + i * 2.1, 0), i % 2 ? 0x7a5a3a : 0x8a6a46]);
        for (let i = 0; i < 9; i++){
          const leaf = new THREE.BoxGeometry(0.9, 0.06, 6.5).translate(0, 0, 3.1);
          leaf.rotateX(0.55 + (i % 2) * 0.2); leaf.rotateY(i / 9 * Math.PI * 2); leaf.translate(1.25, 12.6, 0);
          parts.push([leaf, i % 2 ? 0x3f8f2a : 0x2f7a22]);
        }
        parts.push([new THREE.SphereGeometry(0.7, 8, 6).translate(1.25, 12.4, 0), 0x6a4a20]);
        return colored(parts);
      }
      case 'pine': {
        const parts: [THREE.BufferGeometry, number][] = [[new THREE.CylinderGeometry(0.4, 0.55, 3, 6).translate(0, 1.5, 0), 0x5a3f28]];
        for (let i = 0; i < 4; i++){
          const r = 4.4 - i * 0.95, y = 3 + i * 3.4;
          parts.push([new THREE.ConeGeometry(r, 5, 9).translate(0, y + 2.5, 0), 0x1f4a32]);
          parts.push([new THREE.ConeGeometry(r * 0.78, 2.2, 9).translate(0, y + 3.9, 0), 0xf2f6fa]);   // tuyết đọng
        }
        return colored(parts);
      }
      case 'jungle': case 'broadleaf': {
        const big = k === 'jungle';
        const parts: [THREE.BufferGeometry, number][] = [[new THREE.CylinderGeometry(0.5, 0.8, big ? 12 : 6, 7).translate(0, big ? 6 : 3, 0), 0x5a4630]];
        const n = big ? 6 : 4;
        for (let i = 0; i < n; i++){
          const a = i / n * Math.PI * 2, r = big ? 3.2 : 2;
          parts.push([new THREE.IcosahedronGeometry(big ? 4.2 : 2.8, 1).scale(1, 0.7, 1).translate(Math.cos(a) * r, (big ? 13 : 6.5) + (i % 2) * 1.6, Math.sin(a) * r), [0x2f6a22, 0x3d7d2a, 0x24581c][i % 3]]);
        }
        parts.push([new THREE.IcosahedronGeometry(big ? 4.6 : 3, 1).scale(1, 0.8, 1).translate(0, big ? 16 : 8.5, 0), 0x46892e]);
        return colored(parts);
      }
      case 'cactus': {
        const g = 0x4a7a3a;
        return colored([
          [new THREE.CapsuleGeometry(0.7, 8, 4, 9).translate(0, 4.4, 0), g],
          [new THREE.CapsuleGeometry(0.45, 2.6, 4, 8).translate(1.6, 6.2, 0), g], [new THREE.CylinderGeometry(0.45, 0.45, 1.4, 8).rotateZ(Math.PI / 2).translate(0.9, 4.9, 0), g],
          [new THREE.CapsuleGeometry(0.42, 2.2, 4, 8).translate(-1.5, 5.2, 0), 0x557f40], [new THREE.CylinderGeometry(0.42, 0.42, 1.3, 8).rotateZ(Math.PI / 2).translate(-0.8, 4.1, 0), 0x557f40],
        ]);
      }
    }
  }
  private vegetation(k: Veg, n: number){
    const geo = this.vegGeo(k), mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), n);
    const pts = this.track.samples(120), o = new THREE.Object3D(), wy = this.theme.waterY;
    let made = 0;
    for (let tries = 0; made < n && tries < n * 8; tries++){
      const p = pts[Math.floor(this.rnd() * pts.length)], a = this.rnd() * Math.PI * 2, d = 20 + this.rnd() ** 0.7 * 900;
      const x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d, h = this.ground(x, z), s = this.terrain.slope(x, z);
      if (this.field.runwayDist(x, z) < 90) continue;
      const ok = k === 'palm' ? h > 1.5 && h < 40 && s < 0.5 : k === 'pine' ? h > wy + 2 && s < 0.7 && h < 260 : k === 'cactus' ? s < 0.35 && h < 60 : h > Math.max(2.5, wy + 1) && s < 0.9;
      if (!ok) continue;
      const near = this.field.near(x, z);
      if (near.dist < 30 && h + 25 > near.y - 10) continue;     // không mọc chạm đường bay
      o.position.set(x, h - 0.3, z); o.rotation.set((this.rnd() - 0.5) * 0.12, this.rnd() * 6.3, (this.rnd() - 0.5) * 0.12);
      o.scale.setScalar(0.8 + this.rnd() * 0.7); o.updateMatrix();
      mesh.setMatrixAt(made++, o.matrix);
    }
    mesh.count = made; mesh.instanceMatrix.needsUpdate = true;
    this.add(mesh);
  }

  private rocks(){
    const k = this.def.key, n = Math.round((this.lite ? 120 : 260) * Math.max(1, this.track.length / 7500) * 0.7);
    const col = { tropical: 0x8a8070, snow: 0x6a6e76, city: 0x7d756a, jungle: 0x6a6a5a, desert: 0xa65a34 }[k];
    const mesh = new THREE.InstancedMesh(rockGeo(5), new THREE.MeshStandardMaterial({ color: col, roughness: 0.95, flatShading: true }), n);
    const pts = this.track.samples(80), o = new THREE.Object3D();
    let made = 0;
    for (let t = 0; made < n && t < n * 6; t++){
      const p = pts[Math.floor(this.rnd() * pts.length)], a = this.rnd() * 6.3, d = 40 + this.rnd() * 700, x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d;
      if (this.field.runwayDist(x, z) < 100) continue;
      const h = this.ground(x, z), s = 3 + this.rnd() ** 2 * 14;
      o.position.set(x, h + s * 0.2, z); o.rotation.set(this.rnd() * 3, this.rnd() * 3, this.rnd() * 3); o.scale.set(s, s * (0.5 + this.rnd() * 0.6), s * (0.7 + this.rnd() * 0.5)); o.updateMatrix();
      mesh.setMatrixAt(made++, o.matrix);
    }
    mesh.count = made; mesh.receiveShadow = true; this.add(mesh);
  }

  /* ------------------------------------------------------------- mây */
  // Mây khối: các mảng mây mềm luôn quay về máy quay, vẽ hết bằng MỘT lệnh vẽ (instancing), mờ dần theo sương
  private clouds(n: number){
    const S = 128, cv = document.createElement('canvas'); cv.width = cv.height = S;
    const g = cv.getContext('2d')!, img = g.createImageData(S, S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++){
      const dx = x / S - 0.5, dy = y / S - 0.5, r = Math.sqrt(dx * dx + dy * dy) * 2;
      const v = Math.max(0, 1 - r) ** 1.4 * (0.55 + 0.6 * fbm(x / 18, y / 18, 4)), i = (y * S + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255; img.data[i + 3] = Math.min(255, v * 255);
    }
    g.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(cv);
    const puffs: number[] = [], shades: number[] = [];
    let made = 0;
    for (let tries = 0; made < n && tries < n * 8; tries++){
      const { c, r } = this.bounds(), a = this.rnd() * 6.3, d = this.rnd() ** 0.6 * (r + 1400);
      const x = c.x + Math.cos(a) * d, z = c.z + Math.sin(a) * d, y = 170 + this.rnd() * 220;
      const near = this.field.near(x, z, 2);
      if (near.dist < 120 && Math.abs(near.y - y) < 90) continue;      // không che đường bay
      made++;
      const k = 6 + Math.floor(this.rnd() * 9), s = 40 + this.rnd() * 50;
      for (let j = 0; j < k; j++){
        const py = y + (this.rnd() - 0.4) * s * 0.5;
        puffs.push(x + (this.rnd() - 0.5) * s * 3.2, py, z + (this.rnd() - 0.5) * s * 2.2, s * (1.2 + this.rnd() * 1.1));
        shades.push(0.72 + 0.28 * Math.min(1, (py - y + s * 0.3) / (s * 0.6)));   // đáy mây sẫm hơn đỉnh
      }
    }
    const quad = new THREE.InstancedBufferGeometry();
    quad.setAttribute('position', new THREE.Float32BufferAttribute([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], 3));
    quad.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 1, 1, 0, 1], 2));
    quad.setIndex([0, 1, 2, 0, 2, 3]);
    quad.setAttribute('puff', new THREE.InstancedBufferAttribute(new Float32Array(puffs), 4));
    quad.setAttribute('shade', new THREE.InstancedBufferAttribute(new Float32Array(shades), 1));
    quad.instanceCount = shades.length;
    const th = this.theme, fogC = new THREE.Color(th.fog), sunC = new THREE.Color(th.sun[0]);
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { map: { value: tex }, fogColor: { value: fogC }, sunColor: { value: sunC }, fogFar: { value: th.fogFar * 1.4 } },
      vertexShader: `attribute vec4 puff; attribute float shade; varying vec2 vUv; varying float vShade; varying float vDist;
        void main(){ vUv = uv; vShade = shade; vec4 mv = viewMatrix * vec4(puff.xyz, 1.0); mv.xy += position.xy * puff.w; vDist = -mv.z; gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform sampler2D map; uniform vec3 fogColor; uniform vec3 sunColor; uniform float fogFar; varying vec2 vUv; varying float vShade; varying float vDist;
        void main(){ vec4 t = texture2D(map, vUv); vec3 c = mix(vec3(0.62, 0.68, 0.78), vec3(1.0), vShade) * mix(vec3(1.0), sunColor, 0.25);
          float f = clamp(vDist / fogFar, 0.0, 1.0); c = mix(c, fogColor, f * 0.8);
          float a = t.a * 0.85 * (1.0 - smoothstep(fogFar * 0.85, fogFar, vDist)) * smoothstep(20.0, 120.0, vDist);
          if (a < 0.01) discard; gl_FragColor = vec4(c, a); }`,
    });
    const m = new THREE.Mesh(quad, mat); m.frustumCulled = false; m.renderOrder = 1;
    this.add(m);
  }

  /* ------------------------------------------------------------ sân bay */
  private airport(runway: THREE.Vector3[]){
    // đường băng: dải nhựa theo đường bay, có vạch tim, vạch hai bên, vạch đầu đường băng
    const W = 64, cv = document.createElement('canvas'); cv.width = 256; cv.height = 1024;
    const g = cv.getContext('2d')!;
    g.fillStyle = '#3b3e43'; g.fillRect(0, 0, 256, 1024);
    for (let i = 0; i < 4000; i++){ g.fillStyle = `rgba(${Math.random() < 0.5 ? '255,255,255' : '0,0,0'},0.05)`; g.fillRect(Math.random() * 256, Math.random() * 1024, 2, 2); }
    g.fillStyle = '#f2f2f2'; g.fillRect(8, 0, 6, 1024); g.fillRect(242, 0, 6, 1024);
    for (let y = 0; y < 1024; y += 64) g.fillRect(125, y, 6, 36);
    const rt = new THREE.CanvasTexture(cv); rt.colorSpace = THREE.SRGBColorSpace; rt.wrapT = THREE.RepeatWrapping; rt.anisotropy = 8;
    const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    let len = 0;
    runway.forEach((p, i) => {
      const nx = runway[Math.min(i + 1, runway.length - 1)], pv = runway[Math.max(i - 1, 0)], t = nx.clone().sub(pv).setY(0).normalize(), r = new THREE.Vector3(-t.z, 0, t.x);
      if (i) len += p.distanceTo(runway[i - 1]);
      const a = p.clone().addScaledVector(r, W / 2), b = p.clone().addScaledVector(r, -W / 2);
      pos.push(a.x, this.runwayY + 0.05, a.z, b.x, this.runwayY + 0.05, b.z); uv.push(1, len / 60, 0, len / 60);
      if (i) { const k = i * 2; idx.push(k - 2, k - 1, k, k - 1, k + 1, k); }
    });
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
    const strip = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: rt, roughness: 0.85, metalness: 0, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }));
    strip.receiveShadow = true; this.add(strip);
    // đèn hai bên đường băng
    const lamp = new THREE.InstancedMesh(new THREE.SphereGeometry(0.45, 8, 6), new THREE.MeshBasicMaterial({ color: hot(0xfff2c0), toneMapped: false }), runway.length * 2);
    const o = new THREE.Object3D();
    runway.forEach((p, i) => {
      const nx = runway[Math.min(i + 1, runway.length - 1)], pv = runway[Math.max(i - 1, 0)], t = nx.clone().sub(pv).setY(0).normalize(), r = new THREE.Vector3(-t.z, 0, t.x);
      for (const s of [1, -1]){ o.position.copy(p).addScaledVector(r, s * (W / 2 + 1.5)).setY(this.runwayY + 0.5); o.updateMatrix(); lamp.setMatrixAt(i * 2 + (s > 0 ? 0 : 1), o.matrix); }
    });
    this.add(lamp);
    // tháp điều khiển, nhà ga, nhà chứa máy bay bên trái đường băng
    const mid = runway[Math.floor(runway.length * 0.45)], nx = runway[Math.floor(runway.length * 0.45) + 1], t = nx.clone().sub(mid).setY(0).normalize(), r = new THREE.Vector3(-t.z, 0, t.x);
    const yaw = Math.atan2(t.x, t.z), at = (lat: number, fwd: number) => mid.clone().addScaledVector(r, lat).addScaledVector(t, fwd).setY(this.runwayY);
    const concrete = new THREE.MeshStandardMaterial({ color: 0xd8d6d0, roughness: 0.8 }), glassM = new THREE.MeshPhysicalMaterial({ color: 0x2a4a6a, metalness: 0.6, roughness: 0.08, envMapIntensity: 1.5 });
    const tower = new THREE.Group();
    tower.add(mesh(new THREE.CylinderGeometry(2.6, 3.4, 34, 16).translate(0, 17, 0), concrete));
    tower.add(mesh(new THREE.CylinderGeometry(6.2, 4.4, 6, 12).translate(0, 37, 0), glassM));
    tower.add(mesh(new THREE.CylinderGeometry(6.8, 6.8, 1.2, 12).translate(0, 40.6, 0), concrete));
    tower.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 8, 6).translate(0, 45, 0), concrete));
    tower.position.copy(at(-95, 40)); this.add(tower);
    const term = mesh(new THREE.BoxGeometry(110, 16, 34).translate(0, 8, 0), concrete); term.position.copy(at(-120, -90)); term.rotation.y = yaw; this.add(term);
    const termG = mesh(new THREE.BoxGeometry(111, 7, 35).translate(0, 9, 0), glassM); termG.position.copy(term.position); termG.rotation.y = yaw; this.add(termG);
    for (let i = 0; i < 3; i++){
      const hg = new THREE.Group();
      hg.add(mesh(new THREE.CylinderGeometry(18, 18, 44, 24, 1, false, -Math.PI / 2, Math.PI).rotateX(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xa9b0b8, metalness: 0.7, roughness: 0.4 })));
      hg.add(mesh(new THREE.PlaneGeometry(30, 14).translate(0, 7, 22.1), new THREE.MeshStandardMaterial({ color: 0x3a3f46, roughness: 0.6 })));
      hg.position.copy(at(-100, 150 + i * 46)); hg.rotation.y = yaw + Math.PI / 2; this.add(hg);
    }
  }

  // Cổng xuất phát / về đích bắc ngang đường băng: hai tháp đèn LED, băng rôn ca rô, chữ hai mặt
  private startGate(){
    const p = this.track.pose(0, this.pose), base = p.p.clone().setY(this.runwayY), t = p.t.clone().setY(0).normalize(), r = new THREE.Vector3(-t.z, 0, t.x);
    const g = new THREE.Group(), H = 58, W = 92;
    const metal = new THREE.MeshStandardMaterial({ color: 0xe8ebf0, metalness: 0.8, roughness: 0.3 });
    const led = new THREE.MeshBasicMaterial({ color: hot(0x37e6ff), toneMapped: false });
    for (const s of [1, -1]){
      g.add(mesh(new THREE.BoxGeometry(5, H + 8, 5).translate(s * W / 2, (H + 8) / 2, 0), metal));
      for (let k = 0; k < 8; k++) g.add(mesh(new THREE.BoxGeometry(5.2, 1.2, 5.2).translate(s * W / 2, 6 + k * 7.5, 0), k % 2 ? led : new THREE.MeshBasicMaterial({ color: hot(0xff3366), toneMapped: false })));
    }
    const make = (title: string) => {
      const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 128;
      const x = cv.getContext('2d')!;
      for (let i = 0; i < 64; i++) for (let j = 0; j < 8; j++){ x.fillStyle = (i + j) % 2 ? '#111' : '#fff'; x.fillRect(i * 16, j * 16, 16, 16); }
      x.fillStyle = 'rgba(220,20,50,0.95)'; x.fillRect(150, 12, 724, 104);
      x.font = 'italic 900 70px "Segoe UI", Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText(title, 512, 66);
      const tx = new THREE.CanvasTexture(cv); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return tx;
    };
    const front = new THREE.MeshBasicMaterial({ map: make('✈ XUẤT PHÁT ✈'), toneMapped: false }), back = new THREE.MeshBasicMaterial({ map: make('🏁 VỀ ĐÍCH 🏁'), toneMapped: false });
    g.add(new THREE.Mesh(new THREE.BoxGeometry(W + 5, 10, 2).translate(0, H + 3, 0), [metal, metal, metal, metal, back, front]));
    // vạch ca rô trên mặt đường băng
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 32; const x = cv.getContext('2d')!;
    for (let i = 0; i < 16; i++) for (let j = 0; j < 2; j++){ x.fillStyle = (i + j) % 2 ? '#111' : '#fff'; x.fillRect(i * 16, j * 16, 16, 16); }
    const ct = new THREE.CanvasTexture(cv); ct.colorSpace = THREE.SRGBColorSpace;
    g.add(mesh(new THREE.PlaneGeometry(64, 8).rotateX(-Math.PI / 2).translate(0, 0.08, 0), new THREE.MeshStandardMaterial({ map: ct, roughness: 0.8 })));
    g.position.copy(base); g.rotation.y = Math.atan2(t.x, t.z);
    void r;
    this.add(g);
  }

  /* ------------------------------------------------------ đường đua trên không */
  // Vòng checkpoint lớn phát sáng, có vành mũi tên quay. Máy bay bay qua thì vòng loé sáng.
  private checkpoints(){
    // vòng checkpoint 380 m một vòng; vành mũi tên gộp thành một khối (3 lệnh vẽ mỗi vòng)
    const len = this.track.length, n = Math.floor(len / 380), torus = new THREE.TorusGeometry(26, 1.3, 12, 64), inner = new THREE.TorusGeometry(23.5, 0.35, 6, 64);
    const chevs: [THREE.BufferGeometry, number][] = [];
    for (let k = 0; k < 12; k++){ const a = k / 12 * Math.PI * 2; chevs.push([new THREE.ConeGeometry(0.9, 2.4, 4).rotateX(Math.PI / 2).translate(Math.cos(a) * 24.8, Math.sin(a) * 24.8, 0), 0xffffff]); }
    const chev = colored(chevs);
    const palette = [0x37e6ff, 0xff4fd8, 0xffd23a];
    for (let i = 0; i < n; i++){
      const u = (i + 0.35) / n;
      if (u * len < 700 || u * len > len - 300) continue;     // đoạn cất cánh / hạ cánh không đặt vòng
      const p = this.track.pose(u, this.pose), g = new THREE.Group();
      const base = hot(palette[i % 3]), mat = new THREE.MeshBasicMaterial({ color: base.clone(), toneMapped: false, transparent: true, opacity: 0.95 });
      g.add(new THREE.Mesh(torus, mat), new THREE.Mesh(inner, mat));
      const spin = new THREE.Mesh(chev, mat);
      g.add(spin);
      g.position.copy(p.p); g.lookAt(p.p.clone().add(p.t));
      this.add(g);
      this.rings.push({ u, group: g, mat, base, flash: 0 });
      this.anims.push(dt => { spin.rotation.z += dt * 0.8; });
    }
  }
  flashRing(i: number){ const r = this.rings[i]; if (r) r.flash = 1; }

  // Cổng tăng tốc: 5 khung neon xanh lá có mũi tên, bay qua được đẩy tốc độ
  private speedGates(){
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128; const x = cv.getContext('2d')!;
    x.clearRect(0, 0, 256, 128); x.fillStyle = '#b8ff3a';
    for (let k = 0; k < 3; k++){ x.beginPath(); const ox = 30 + k * 70; x.moveTo(ox, 20); x.lineTo(ox + 40, 64); x.lineTo(ox, 108); x.lineTo(ox + 18, 108); x.lineTo(ox + 58, 64); x.lineTo(ox + 18, 20); x.fill(); }
    const arrow = new THREE.CanvasTexture(cv);
    const frameM = new THREE.MeshBasicMaterial({ color: hot(0x9dff3a), toneMapped: false });
    const arrowM = new THREE.MeshBasicMaterial({ map: arrow, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false });
    for (const pad of this.def.pads) for (let k = 0; k < 5; k++){
      const u = pad.at + pad.len * k / 4, p = this.track.pose(u, this.pose), g = new THREE.Group();
      for (const [w, h, px, py] of [[44, 1.2, 0, 13], [44, 1.2, 0, -13], [1.2, 27, 22, 0], [1.2, 27, -22, 0]] as const) g.add(mesh(new THREE.BoxGeometry(w, h, 1.2).translate(px, py, 0), frameM));
      const a = new THREE.Mesh(new THREE.PlaneGeometry(14, 7).rotateZ(-Math.PI / 2), arrowM); a.position.y = 16.5; a.rotation.x = 0; g.add(a);
      g.position.copy(p.p); g.lookAt(p.p.clone().add(p.t));
      this.add(g);
    }
    this.anims.push((_, t) => { frameM.color.setHSL(0.24, 1, 0.5 + 0.15 * Math.sin(t * 8)).multiplyScalar(3); });
  }

  // Chướng ngại vật: bãi mìn bay lơ lửng, chừa khe giữa, đèn đỏ nhấp nháy (nhỏ, không che tầm nhìn)
  private mines(){
    const spike: THREE.BufferGeometry[] = [new THREE.IcosahedronGeometry(1.4, 1)];
    for (let k = 0; k < 12; k++){ const d = new THREE.Vector3().randomDirection(); spike.push(new THREE.ConeGeometry(0.28, 1.2, 6).translate(0, 1.6, 0).applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d))); }
    const geo = colored(spike.map((g, i) => [g, i ? 0x4a4e56 : 0x2a2d33] as [THREE.BufferGeometry, number]));
    const n = this.def.obstacles.length * 8, inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.8, roughness: 0.35 }), n);
    const lamp = new THREE.InstancedMesh(new THREE.SphereGeometry(0.55, 8, 6), new THREE.MeshBasicMaterial({ color: hot(0xff2020), toneMapped: false }), n);
    const o = new THREE.Object3D(), spots: THREE.Vector3[] = [];
    let i = 0;
    for (const at of this.def.obstacles) for (let k = 0; k < 8; k++){
      const lat = (k % 2 ? 1 : -1) * (24 + this.rnd() * 12), up = (this.rnd() - 0.5) * 16, du = (this.rnd() - 0.5) * 40 / this.track.length;
      const p = this.side(at + du, lat, up); spots.push(p);
      o.position.copy(p); o.rotation.set(this.rnd() * 3, this.rnd() * 3, 0); o.scale.setScalar(1); o.updateMatrix(); inst.setMatrixAt(i, o.matrix);
      o.position.y += 1.6; o.updateMatrix(); lamp.setMatrixAt(i, o.matrix); i++;
    }
    this.add(inst, lamp);
    const lm = lamp.material as THREE.MeshBasicMaterial;
    this.anims.push((_, t) => { lm.color.setRGB(Math.sin(t * 6) > 0 ? 4 : 0.3, 0.1, 0.1); inst.rotation.y = 0; });
  }

  // Cổng đường tắt mạo hiểm bên phải đường bay: vòm đá / vòm băng / khung thép hẹp, có biển cảnh báo
  private shortcutArch(){
    const s = this.def.shortcut, k = this.def.key;
    const mat = k === 'snow' ? new THREE.MeshPhysicalMaterial({ color: 0xa8dcf0, roughness: 0.15, transmission: 0, clearcoat: 1, emissive: 0x2a6a8a, emissiveIntensity: 0.3 })
      : k === 'city' ? new THREE.MeshStandardMaterial({ color: 0x9aa0a8, metalness: 0.9, roughness: 0.3 })
      : new THREE.MeshStandardMaterial({ color: k === 'desert' ? 0xb0603a : 0x7a7466, roughness: 0.95, flatShading: true });
    for (const f of [0.15, 0.5, 0.85]){
      const u = s.at + s.len * f, p = this.track.pose(u, this.pose), c = p.p.clone().addScaledVector(p.r, 34).addScaledVector(p.u, -6);
      const geo = new THREE.TorusGeometry(12, k === 'city' ? 1.2 : 3.6, 10, 40);
      if (k !== 'city'){ const ps = geo.attributes.position as THREE.BufferAttribute, v = new THREE.Vector3(); for (let j = 0; j < ps.count; j++){ v.fromBufferAttribute(ps, j); v.multiplyScalar(1 + (fbm(v.x * 0.3 + f * 9, v.y * 0.3 + v.z * 0.3, 3) - 0.5) * 0.25); ps.setXYZ(j, v.x, v.y, v.z); } geo.computeVertexNormals(); }
      const m = new THREE.Mesh(geo, mat); m.position.copy(c); m.lookAt(c.clone().add(p.t)); m.castShadow = true; this.blockers.push(m);
      this.add(m);
    }
    const cv = document.createElement('canvas'); cv.width = 256; cv.height = 128; const x = cv.getContext('2d')!;
    x.fillStyle = '#ffd21a'; x.fillRect(0, 0, 256, 128); x.fillStyle = '#111'; x.fillRect(6, 6, 244, 116); x.fillStyle = '#ffd21a';
    x.font = '900 34px "Segoe UI"'; x.textAlign = 'center'; x.fillText('⚠ ĐƯỜNG TẮT', 128, 56); x.font = '800 22px "Segoe UI"'; x.fillText('nhanh mà dễ đâm!', 128, 94);
    const sign = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(cv), depthWrite: false }));
    sign.position.copy(this.side(s.at - 0.004, 40, 14)); sign.scale.set(20, 10, 1); this.add(sign);
  }

  // Khinh khí cầu và khí cầu quảng cáo ven đường bay
  private balloons(){
    const stripes = [0xe8322f, 0xffd23a, 0x2f7cf6, 0x34c759, 0xff5fa8, 0xff8a1f];
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 16; i++){ const t = i / 16; pts.push(new THREE.Vector2(Math.sin(t * Math.PI) ** 0.85 * 9 * (t < 0.3 ? 0.45 + t * 1.8 : 1) + 0.6, t * 20 - 10)); }
    const parts: [THREE.BufferGeometry, number][] = [];
    for (let k = 0; k < 12; k++) parts.push([new THREE.LatheGeometry(pts, 2, k / 12 * Math.PI * 2, Math.PI * 2 / 12), stripes[k % stripes.length]]);
    parts.push([new THREE.BoxGeometry(2.4, 1.8, 2.4).translate(0, -13, 0), 0x7a5a32]);
    for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) parts.push([new THREE.CylinderGeometry(0.05, 0.05, 3.2, 4).translate(sx * 1.1, -11, sz * 1.1), 0x333333]);
    const geo = colored(parts), n = Math.round(10 * Math.max(1, this.track.length / 7500)), inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6 }), n);
    const spots: { p: THREE.Vector3; ph: number; s: number }[] = [];
    for (let i = 0; i < n; i++){
      const u = 0.18 + i / n * 0.78, lat = (i % 2 ? 1 : -1) * (75 + this.rnd() * 90);
      const p = this.side(u, lat, 10 + this.rnd() * 30);
      p.y = Math.max(p.y, this.ground(p.x, p.z) + 30);
      spots.push({ p, ph: this.rnd() * 6, s: 1 + this.rnd() * 0.6 });
    }
    const o = new THREE.Object3D();
    const place = (t: number) => { spots.forEach((s, i) => { o.position.copy(s.p); o.position.y += Math.sin(t * 0.4 + s.ph) * 3; o.rotation.y = t * 0.05 + s.ph; o.scale.setScalar(s.s); o.updateMatrix(); inst.setMatrixAt(i, o.matrix); }); inst.instanceMatrix.needsUpdate = true; };
    place(0); this.add(inst);
    this.anims.push((_, t) => place(t));
    // khí cầu quảng cáo
    const cv = document.createElement('canvas'); cv.width = 512; cv.height = 128; const x = cv.getContext('2d')!;
    x.fillStyle = '#e8eaee'; x.fillRect(0, 0, 512, 128); x.fillStyle = '#d8262b'; x.fillRect(0, 40, 512, 48);
    x.font = 'italic 900 40px "Segoe UI"'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('✈ ĐUA MÁY BAY ✈', 256, 66);
    const bt = new THREE.CanvasTexture(cv); bt.colorSpace = THREE.SRGBColorSpace;
    const blimp = new THREE.Group();
    blimp.add(mesh(new THREE.SphereGeometry(1, 32, 16).scale(9, 9, 32), new THREE.MeshStandardMaterial({ map: bt, roughness: 0.5 })));
    blimp.add(mesh(new THREE.BoxGeometry(3, 2.5, 8).translate(0, -9.5, 4), new THREE.MeshStandardMaterial({ color: 0x3a3f46 })));
    for (const [rx, rz] of [[0, 0], [Math.PI / 2, 0]]) blimp.add(mesh(new THREE.BoxGeometry(0.4, 16, 7).rotateZ(rx).translate(0, 0, -27).rotateZ(rz), new THREE.MeshStandardMaterial({ color: 0xd8262b })));
    const bp = this.side(0.35, -130, 60); blimp.position.copy(bp); this.add(blimp);
    this.anims.push((dt, t) => { blimp.rotation.y = t * 0.03; blimp.position.x = bp.x + Math.sin(t * 0.03) * 80; blimp.position.z = bp.z + Math.cos(t * 0.03) * 80; });
  }

  /* --------------------------------------------------- vật riêng từng bản đồ */
  private themeProps(){
    switch (this.def.key){
      case 'tropical': this.seaStacks(); this.boats(); this.lighthouse(); break;
      case 'snow': for (const u of [0.33, 0.62]) this.waterfall(u, 150, true); this.iceSpikes(); break;
      case 'city': this.city(); this.bridge(); break;
      case 'jungle': for (const u of [0.3, 0.48, 0.74]) this.waterfall(u, 130, false); this.temple(); break;
      case 'desert': this.mesas(); this.oasis(); break;
    }
  }

  private seaStacks(){
    const n = 26, inst = new THREE.InstancedMesh(rockGeo(9, 2), new THREE.MeshStandardMaterial({ color: 0x8a7c66, roughness: 0.95, flatShading: true }), n);
    const o = new THREE.Object3D(); let made = 0;
    for (let i = 0; i < n * 5 && made < n; i++){
      const u = this.rnd(), lat = (this.rnd() < 0.5 ? -1 : 1) * (45 + this.rnd() * 160), p = this.side(u, lat);
      if (this.ground(p.x, p.z) > -2 || this.field.runwayDist(p.x, p.z) < 120) continue;
      const near = this.field.near(p.x, p.z), h = Math.max(20, Math.min(near.y - 18 + Math.max(0, near.dist - 40), 30 + this.rnd() * 70));
      o.position.set(p.x, h * 0.45 - 6, p.z); o.scale.set(8 + this.rnd() * 8, h * 0.55, 8 + this.rnd() * 8); o.rotation.y = this.rnd() * 6; o.updateMatrix();
      inst.setMatrixAt(made++, o.matrix);
    }
    inst.count = made; this.add(inst); this.blockers.push(inst);
  }
  private boats(){
    const geo = colored([
      [new THREE.BoxGeometry(3, 1.4, 10).translate(0, 0.4, 0), 0xf4f4f4], [new THREE.ConeGeometry(1.5, 3, 4).rotateX(Math.PI / 2).rotateZ(Math.PI / 4).translate(0, 0.4, 6.4), 0xf4f4f4],
      [new THREE.CylinderGeometry(0.12, 0.12, 12, 5).translate(0, 7, 0), 0x6a5a40], [new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 1.5, 0.3, 0, 12.5, 0.3, 0, 1.5, -5.5, 0, 1.5, 0.3, 0, 1.5, -5.5, 0, 12.5, 0.3], 3)), 0xfffbea],
    ]);
    const n = 14, inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.6, side: THREE.DoubleSide }), n), o = new THREE.Object3D();
    const spots: THREE.Vector3[] = [];
    let made = 0;
    for (let i = 0; i < 100 && made < n; i++){ const p = this.side(this.rnd(), (this.rnd() - 0.5) * 600); if (this.ground(p.x, p.z) > -3) continue; spots.push(p.setY(0.3)); made++; }
    inst.count = made;
    this.anims.push((_, t) => { spots.forEach((p, i) => { o.position.copy(p); o.rotation.set(Math.sin(t + i) * 0.05, i, Math.sin(t * 1.3 + i) * 0.06); o.updateMatrix(); inst.setMatrixAt(i, o.matrix); }); inst.instanceMatrix.needsUpdate = true; });
    this.add(inst);
  }
  private lighthouse(){
    let p = this.side(0.08, -150);
    for (let i = 0; i < 30 && this.ground(p.x, p.z) < 3; i++) p = this.side(this.rnd(), (this.rnd() < 0.5 ? -1 : 1) * (100 + this.rnd() * 200));
    const g = new THREE.Group(), white = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.6 }), red = new THREE.MeshStandardMaterial({ color: 0xd22f2f, roughness: 0.6 });
    for (let i = 0; i < 6; i++) g.add(mesh(new THREE.CylinderGeometry(3.2 - i * 0.25, 3.45 - i * 0.25, 5, 16).translate(0, 2.5 + i * 5, 0), i % 2 ? red : white));
    const lamp = mesh(new THREE.SphereGeometry(2.2, 12, 10).translate(0, 32, 0), new THREE.MeshBasicMaterial({ color: hot(0xfff2a0), toneMapped: false }));
    g.add(lamp); g.position.set(p.x, this.ground(p.x, p.z), p.z); this.add(g);
  }

  // Thác nước: vách đá, dòng nước chảy (texture trôi), hơi nước bốc lên ở chân thác. frozen: thác băng có nhũ băng.
  private waterfall(u: number, lat: number, frozen: boolean){
    const p = this.side(u, lat), gy = this.ground(p.x, p.z), near = this.field.near(p.x, p.z);
    const top = Math.max(gy + 50, Math.min(near.y + 30, gy + 110)), H = top - gy;
    const t = this.track.pose(u, this.pose).p.clone().sub(p).setY(0).normalize();   // mặt thác quay về đường bay
    const yaw = Math.atan2(t.x, t.z), g = new THREE.Group();
    const cliff = mesh(rockGeo(u * 50, 2).scale(60, H * 0.62, 18).translate(0, H * 0.5, -14), new THREE.MeshStandardMaterial({ color: frozen ? 0x6a7078 : 0x5e5a4e, roughness: 0.95, flatShading: true }));
    cliff.castShadow = true; cliff.receiveShadow = true; g.add(cliff);
    const cv = document.createElement('canvas'); cv.width = 64; cv.height = 256; const x = cv.getContext('2d')!;
    for (let i = 0; i < 260; i++){ x.fillStyle = `rgba(255,255,255,${0.25 + Math.random() * 0.6})`; x.fillRect(Math.random() * 64, Math.random() * 256, 1 + Math.random() * 3, 8 + Math.random() * 40); }
    const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(2, 2);
    const fallGeo = new THREE.PlaneGeometry(22, H, 4, 12), fp = fallGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < fp.count; i++){ const yy = fp.getY(i) / H + 0.5; fp.setZ(i, Math.sin((1 - yy) * Math.PI * 0.5) * 3 - 3 + (1 - yy) * 4); }
    fallGeo.translate(0, H / 2, 0); fallGeo.computeVertexNormals();
    const fallMat = frozen ? new THREE.MeshPhysicalMaterial({ color: 0xbfe8ff, roughness: 0.1, metalness: 0, clearcoat: 1, transparent: true, opacity: 0.88, emissive: 0x5aa8d8, emissiveIntensity: 0.35, map: tex })
      : new THREE.MeshBasicMaterial({ color: 0xdff4ff, map: tex, transparent: true, opacity: 0.85, depthWrite: false });
    g.add(new THREE.Mesh(fallGeo, fallMat));
    if (frozen){
      const ic = new THREE.InstancedMesh(new THREE.ConeGeometry(0.6, 5, 6).rotateX(Math.PI), fallMat, 40), o = new THREE.Object3D();
      for (let i = 0; i < 40; i++){ o.position.set((Math.random() - 0.5) * 40, H * (0.3 + Math.random() * 0.7), -2 + Math.random() * 2); o.scale.set(1, 0.6 + Math.random() * 1.6, 1); o.updateMatrix(); ic.setMatrixAt(i, o.matrix); }
      g.add(ic);
    } else {
      this.anims.push(dt => { tex.offset.y += dt * 1.4; });
      const pool = new THREE.Mesh(new THREE.CircleGeometry(20, 24).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: 0x3a7a6a, roughness: 0.05, clearcoat: 1 }));
      pool.position.set(0, 0.6, 8); g.add(pool);
      // hơi nước
      const mist = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex(), color: 0xffffff, transparent: true, opacity: 0.55, depthWrite: false }));
      mist.scale.set(40, 22, 1); mist.position.set(0, 8, 6); g.add(mist);
      this.anims.push((_, tt) => { mist.material.opacity = 0.45 + Math.sin(tt * 2 + u) * 0.1; });
    }
    g.position.set(p.x, gy, p.z); g.rotation.y = yaw; this.add(g); this.blockers.push(cliff);
  }
  private iceSpikes(){
    const n = 60, inst = new THREE.InstancedMesh(new THREE.ConeGeometry(3, 18, 5), new THREE.MeshPhysicalMaterial({ color: 0xcdeffa, roughness: 0.1, clearcoat: 1, emissive: 0x3a7a9a, emissiveIntensity: 0.25, flatShading: true }), n);
    const o = new THREE.Object3D(); let made = 0;
    for (let i = 0; i < 400 && made < n; i++){
      const p = this.side(this.rnd(), (this.rnd() - 0.5) * 500), h = this.ground(p.x, p.z);
      if (h > this.theme.waterY + 6 || this.field.runwayDist(p.x, p.z) < 120) continue;
      o.position.set(p.x, this.theme.waterY + 6, p.z); o.rotation.set((this.rnd() - 0.5) * 0.5, this.rnd() * 6, (this.rnd() - 0.5) * 0.5); o.scale.setScalar(0.6 + this.rnd()); o.updateMatrix();
      inst.setMatrixAt(made++, o.matrix);
    }
    inst.count = made; this.add(inst);
  }

  // Thành phố lúc hoàng hôn: nhà chọc trời cửa sổ sáng đèn, tháp kính, tháp nhọn, biển quảng cáo neon
  private city(){
    const c = this.side(0.5, 0), cv = document.createElement('canvas'); cv.width = 64; cv.height = 128;
    const x = cv.getContext('2d')!, ev = document.createElement('canvas'); ev.width = 64; ev.height = 128; const e = ev.getContext('2d')!;
    x.fillStyle = '#9aa3ad'; x.fillRect(0, 0, 64, 128); e.fillStyle = '#000'; e.fillRect(0, 0, 64, 128);
    for (let yy = 3; yy < 128; yy += 8) for (let xx = 3; xx < 64; xx += 8){
      const lit = Math.random() < 0.45;
      x.fillStyle = lit ? '#ffe7a8' : '#2a3a4e'; x.fillRect(xx, yy, 5, 5);
      if (lit){ e.fillStyle = Math.random() < 0.7 ? '#ffcf70' : '#bfe4ff'; e.fillRect(xx, yy, 5, 5); }
    }
    const map = new THREE.CanvasTexture(cv), emap = new THREE.CanvasTexture(ev);
    for (const t of [map, emap]){ t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; }
    const box = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
    const uv = box.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 3, uv.getY(i) * 6);
    const list: THREE.Matrix4[] = [], o = new THREE.Object3D(), cols: THREE.Color[] = [];
    for (let gx = -9; gx <= 9; gx++) for (let gz = -9; gz <= 9; gz++){
      const px = c.x + gx * 40 + (this.rnd() - 0.5) * 8, pz = c.z + gz * 40 + (this.rnd() - 0.5) * 8, d = Math.hypot(gx, gz) / 9;
      if (d > 1 || this.rnd() < 0.12) continue;
      const gy = this.ground(px, pz); if (gy < 4) continue;
      const near = this.field.near(px, pz), want = (1 - d) ** 1.2 * (60 + this.rnd() * 140) + 14;
      const h = Math.min(want, near.y - 22 + Math.max(0, near.dist - 34) * 1.6 - gy);
      if (h < 10) continue;
      o.position.set(px, gy - 1, pz); o.scale.set(16 + this.rnd() * 14, h, 16 + this.rnd() * 14); o.rotation.y = 0; o.updateMatrix();
      list.push(o.matrix.clone()); cols.push(new THREE.Color().setHSL(0.58 + this.rnd() * 0.08, 0.1, 0.75 + this.rnd() * 0.25));
    }
    const inst = new THREE.InstancedMesh(box, new THREE.MeshStandardMaterial({ map, emissiveMap: emap, emissive: 0xffffff, emissiveIntensity: 1.4, roughness: 0.4, metalness: 0.5 }), list.length);
    list.forEach((m, i) => { inst.setMatrixAt(i, m); inst.setColorAt(i, cols[i]); });
    inst.castShadow = true; inst.receiveShadow = true; this.add(inst); this.blockers.push(inst);
    // tháp kính tròn và tháp có chóp nhọn ở xa đường bay
    const glassM = new THREE.MeshPhysicalMaterial({ color: 0x5a8ab8, metalness: 0.9, roughness: 0.06, envMapIntensity: 1.8 });
    for (let i = 0; i < 6; i++){
      const p = this.side(0.42 + i * 0.03, (i % 2 ? 1 : -1) * (150 + this.rnd() * 80)), gy = this.ground(p.x, p.z);
      if (gy < 4) continue;
      const near = this.field.near(p.x, p.z), h = Math.min(180 + this.rnd() * 80, near.y - 20 + (near.dist - 34) * 1.6 - gy);
      if (h < 40) continue;
      const tw = new THREE.Group();
      tw.add(mesh(new THREE.CylinderGeometry(10, 13, h, 20).translate(0, h / 2, 0), glassM));
      tw.add(mesh(new THREE.ConeGeometry(4, 30, 8).translate(0, h + 15, 0), new THREE.MeshStandardMaterial({ color: 0xd8dce2, metalness: 0.9, roughness: 0.2 })));
      tw.add(mesh(new THREE.SphereGeometry(1, 8, 6).translate(0, h + 31, 0), new THREE.MeshBasicMaterial({ color: hot(0xff2a2a), toneMapped: false })));
      tw.position.set(p.x, gy, p.z); this.add(tw); this.blockers.push(tw);
    }
    // biển quảng cáo neon
    for (const [u, lat, txt] of [[0.44, 60, 'ĐUA MÁY BAY'], [0.56, -60, 'SKY RACE'], [0.64, 70, 'TẶNG QUÀ = BOOST']] as const){
      const bc = document.createElement('canvas'); bc.width = 512; bc.height = 128; const b = bc.getContext('2d')!;
      b.fillStyle = '#0a0a14'; b.fillRect(0, 0, 512, 128); b.strokeStyle = '#ff3ad8'; b.lineWidth = 8; b.strokeRect(6, 6, 500, 116);
      b.font = 'italic 900 58px "Segoe UI"'; b.textAlign = 'center'; b.textBaseline = 'middle'; b.fillStyle = '#37e6ff'; b.shadowColor = '#37e6ff'; b.shadowBlur = 18; b.fillText(txt, 256, 66);
      const bt = new THREE.CanvasTexture(bc); bt.colorSpace = THREE.SRGBColorSpace;
      const p = this.side(u, lat), gy = this.ground(p.x, p.z), near = this.field.near(p.x, p.z), top = Math.min(near.y - 8, gy + 60);
      const bb = new THREE.Group();
      bb.add(mesh(new THREE.PlaneGeometry(40, 10), new THREE.MeshBasicMaterial({ map: bt, color: hot(0xffffff, 2.4), toneMapped: false, side: THREE.DoubleSide })));
      bb.add(mesh(new THREE.CylinderGeometry(0.6, 0.6, top - gy, 6).translate(0, -(top - gy) / 2, 0), new THREE.MeshStandardMaterial({ color: 0x555a60 })));
      bb.position.set(p.x, top, p.z); bb.lookAt(this.side(u, 0).setY(top)); this.add(bb);
    }
  }
  // Cầu treo bắc qua mặt nước dưới đường bay: hai tháp cao, dây võng, mặt cầu có đèn
  private bridge(){
    let best = 0.4, low = Infinity;
    for (let u = 0.3; u < 0.75; u += 0.01){ const p = this.track.pose(u, this.pose).p; if (this.ground(p.x, p.z) < -4 && p.y < low){ low = p.y; best = u; } }
    const p = this.track.pose(best, this.pose), c = p.p.clone().setY(0), r = p.r.clone().setY(0).normalize();
    const g = new THREE.Group(), steel = new THREE.MeshStandardMaterial({ color: 0xc23a2a, metalness: 0.6, roughness: 0.4 }), deckM = new THREE.MeshStandardMaterial({ color: 0x6a6e74, roughness: 0.8 });
    const L = 520, towerX = 115, towerH = Math.min(78, p.p.y + 30);
    g.add(mesh(new THREE.BoxGeometry(L, 2, 22).translate(0, 16, 0), deckM));
    for (const s of [1, -1]) for (const z of [-9, 9]) g.add(mesh(new THREE.BoxGeometry(4, towerH, 3).translate(s * towerX, towerH / 2, z), steel));
    for (const s of [1, -1]) g.add(mesh(new THREE.BoxGeometry(4, 3, 21).translate(s * towerX, towerH - 6, 0), steel));
    for (const z of [-9, 9]){
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 40; i++){ const xx = -L / 2 + L * i / 40, k = Math.abs(xx) <= towerX ? 1 - (xx / towerX) ** 2 : 0; pts.push(new THREE.Vector3(xx, Math.abs(xx) <= towerX ? towerH - (towerH - 22) * k : towerH - (Math.abs(xx) - towerX) / (L / 2 - towerX) * (towerH - 17), z)); }
      g.add(mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.5, 6), steel));
      for (let i = 2; i < 39; i += 2){ const q = pts[i]; g.add(mesh(new THREE.CylinderGeometry(0.12, 0.12, q.y - 17, 4).translate(q.x, 17 + (q.y - 17) / 2, z), steel)); }
      for (let i = 0; i < 26; i++) g.add(mesh(new THREE.SphereGeometry(0.4, 6, 4).translate(-L / 2 + i * L / 25, 18, z * 1.1), new THREE.MeshBasicMaterial({ color: hot(0xffe2a0), toneMapped: false })));
    }
    for (const s of [1, -1]) g.add(mesh(new THREE.CylinderGeometry(6, 7, 16, 12).translate(s * towerX, 0, 0), deckM));
    g.position.copy(c); g.rotation.y = Math.atan2(-r.z, r.x);
    this.add(g);
  }
  // Đền đá cổ bậc thang trên đồi rừng rậm
  private temple(){
    let p = this.side(0.4, -170);
    for (let i = 0; i < 40; i++){ const q = this.side(0.25 + this.rnd() * 0.6, (this.rnd() < 0.5 ? -1 : 1) * (140 + this.rnd() * 140)); if (this.ground(q.x, q.z) > 14 && this.terrain.slope(q.x, q.z) < 0.25){ p = q; break; } }
    const g = new THREE.Group(), stone = new THREE.MeshStandardMaterial({ color: 0x8a8572, roughness: 0.95 }), moss = new THREE.MeshStandardMaterial({ color: 0x4a6a3a, roughness: 1 });
    for (let i = 0; i < 6; i++){ const s = 40 - i * 6; g.add(mesh(new THREE.BoxGeometry(s, 5, s).translate(0, 2.5 + i * 5, 0), i % 2 ? stone : moss)); }
    g.add(mesh(new THREE.BoxGeometry(8, 8, 8).translate(0, 34, 0), stone));
    g.add(mesh(new THREE.BoxGeometry(5, 30, 2).translate(0, 15, 20), stone));
    g.position.set(p.x, this.ground(p.x, p.z) - 1, p.z); this.add(g);
  }
  // Sa mạc: núi bàn và cột đá có vân tầng
  private mesas(){
    const geo = new THREE.CylinderGeometry(0.85, 1, 1, 9, 6).translate(0, 0.5, 0), ps = geo.attributes.position as THREE.BufferAttribute, col = new Float32Array(ps.count * 3), c = new THREE.Color();
    for (let i = 0; i < ps.count; i++){
      const y = ps.getY(i), x = ps.getX(i), z = ps.getZ(i), k = 1 + (vnoise(x * 3 + y * 5, z * 3) - 0.5) * 0.25;
      ps.setXYZ(i, x * k, y, z * k);
      c.setHex(0xb2552e).lerp(new THREE.Color(0xe09a62), (Math.sin(y * 18) + 1) / 2 * 0.8);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3)); geo.computeVertexNormals();
    const n = 40, inst = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true }), n), o = new THREE.Object3D();
    let made = 0;
    for (let i = 0; i < 400 && made < n; i++){
      const p = this.side(this.rnd(), (this.rnd() < 0.5 ? -1 : 1) * (70 + this.rnd() * 500)), gy = this.ground(p.x, p.z), near = this.field.near(p.x, p.z);
      if (this.field.runwayDist(p.x, p.z) < 140) continue;
      const tall = this.rnd() < 0.5, h = Math.min(tall ? 60 + this.rnd() * 80 : 25 + this.rnd() * 30, near.y - 20 + Math.max(0, near.dist - 40) * 1.3 - gy);
      if (h < 14) continue;
      const w = tall ? 6 + this.rnd() * 8 : 30 + this.rnd() * 50;
      o.position.set(p.x, gy - 2, p.z); o.scale.set(w, h, w * (0.7 + this.rnd() * 0.5)); o.rotation.y = this.rnd() * 6; o.updateMatrix();
      inst.setMatrixAt(made++, o.matrix);
    }
    inst.count = made; inst.castShadow = true; inst.receiveShadow = true; this.add(inst); this.blockers.push(inst);
  }
  private oasis(){
    let p = this.side(0.45, 160);
    for (let i = 0; i < 30; i++){ const q = this.side(0.2 + this.rnd() * 0.7, (this.rnd() < 0.5 ? -1 : 1) * (110 + this.rnd() * 150)); if (this.terrain.slope(q.x, q.z) < 0.15 && this.ground(q.x, q.z) < 40){ p = q; break; } }
    const gy = this.ground(p.x, p.z);
    const pond = new THREE.Mesh(new THREE.CircleGeometry(38, 40).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: 0x2a7a8a, roughness: 0.04, clearcoat: 1, envMapIntensity: 1.6 }));
    pond.position.set(p.x, gy + 1.2, p.z); this.add(pond);
    const palm = this.vegGeo('palm'), n = 14, inst = new THREE.InstancedMesh(palm, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }), n), o = new THREE.Object3D();
    for (let i = 0; i < n; i++){ const a = i / n * Math.PI * 2, d = 42 + this.rnd() * 14, x = p.x + Math.cos(a) * d, z = p.z + Math.sin(a) * d; o.position.set(x, this.ground(x, z), z); o.rotation.y = this.rnd() * 6; o.scale.setScalar(0.9 + this.rnd() * 0.4); o.updateMatrix(); inst.setMatrixAt(i, o.matrix); }
    this.add(inst);
  }

  /* ------------------------------------------------------- thời tiết */
  // Tuyết rơi / bụi cát / sương mù quanh máy quay
  private weather(kind: 'snow' | 'dust' | 'mist'){
    const n = this.lite ? 1200 : 2600, R = 160, pos = new Float32Array(n * 3);
    for (let i = 0; i < n * 3; i++) pos[i] = (Math.random() - 0.5) * R * 2;
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ map: softTex(), size: kind === 'snow' ? 1.1 : kind === 'dust' ? 0.9 : 6, color: kind === 'snow' ? 0xffffff : kind === 'dust' ? 0xe8c890 : 0xe8f4ee,
      transparent: true, opacity: kind === 'mist' ? 0.12 : 0.85, depthWrite: false, sizeAttenuation: true });
    const pts = new THREE.Points(g, mat); pts.frustumCulled = false; this.add(pts);
    const fall = kind === 'snow' ? 6 : kind === 'dust' ? 0.5 : 0.2, drift = kind === 'dust' ? 14 : 2;
    this.anims.push((dt, t, cam) => {
      for (let i = 0; i < n; i++){
        const j = i * 3;
        pos[j] += (Math.sin(t * 0.7 + i) * 0.5 + drift * 0.3) * dt; pos[j + 1] -= fall * dt; pos[j + 2] += Math.cos(t * 0.5 + i) * 0.5 * dt;
        for (let a = 0; a < 3; a++){ const rel = pos[j + a] - cam.position.getComponent(a); if (rel > R) pos[j + a] -= R * 2; else if (rel < -R) pos[j + a] += R * 2; }
      }
      (g.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    });
  }

  /* --------------------------------------------------------- vòng lặp */
  follow(cam: THREE.Camera){ if (shared){ shared.sky.position.copy(cam.position); shared.water.position.x = cam.position.x; shared.water.position.z = cam.position.z; } }
  update(dt: number, t: number, cam: THREE.Camera){
    // Bầu trời và mặt nước luôn đi theo máy quay: đường đua dài 30 km, đứng yên ở gốc toạ độ thì bay ra khỏi trời (nền đen)
    // và hết biển. Sóng nước tính theo toạ độ thật nên dời mặt nước không làm sóng trượt theo.
    this.follow(cam);
    for (const a of this.anims) a(dt, t, cam);
    for (const r of this.rings){
      if (r.flash > 0){ r.flash = Math.max(0, r.flash - dt * 1.8); r.mat.color.copy(r.base).lerp(WHITE, r.flash); r.group.scale.setScalar(1 + r.flash * 0.12); }
    }
  }

  dispose(scene: THREE.Scene){
    const res = shared;
    if (res){ this.group.remove(res.sky, res.water); }
    scene.remove(this.group);
    const seen = new Set<unknown>();
    for (const root of this.owned) root.traverse(o => {
      const m = o as THREE.Mesh;
      if (m.geometry && !seen.has(m.geometry)){ seen.add(m.geometry); m.geometry.dispose(); }
      const mats = m.material ? (Array.isArray(m.material) ? m.material : [m.material]) : [];
      for (const mat of mats){
        if (seen.has(mat)) continue; seen.add(mat);
        for (const v of Object.values(mat)) if (v instanceof THREE.Texture && v !== res?.detail.detail && v !== res?.detail.normal && v !== soft && !seen.has(v)){ seen.add(v); v.dispose(); }
        mat.dispose();
      }
    });
    this.env?.dispose();
  }
}

const WHITE = new THREE.Color(5, 5, 5);
// màu phát sáng mạnh hơn ngưỡng bloom (chỉ đèn neon, lửa, đèn tín hiệu mới loé sáng; bề mặt được nắng chiếu thì không)
const hot = (hex: number, k = 3.2) => new THREE.Color(hex).multiplyScalar(k);
const mesh = (g: THREE.BufferGeometry, m: THREE.Material) => { const x = new THREE.Mesh(g, m); x.castShadow = true; x.receiveShadow = true; return x; };
let soft: THREE.Texture | null = null;
function softTex(){
  if (soft) return soft;
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d')!, gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return soft = new THREE.CanvasTexture(cv);
}
