import * as THREE from 'three';
import type { FestivalState, WorldState } from '../shared/types.ts';
import { DAY_SECONDS } from '../shared/balance.ts';
import { mat } from './batch.ts';
import { SQUARE, riverZ } from './layout.ts';
import { shared } from './materials.ts';

// Màu trời theo giờ: [giờ trong ngày 0..1, màu trời, màu nắng, độ sáng nắng, độ sáng trời]
const SKY: [number, number, number, number, number][] = [
  [0.00, 0x14204a, 0x7a8ac0, 0.35, 0.5],
  [0.21, 0x1f2a55, 0x7a80b0, 0.35, 0.5],
  [0.25, 0xf2a46b, 0xffb070, 0.9, 0.62],    // bình minh
  [0.32, 0xa9d3ec, 0xfff1d6, 2.2, 0.9],
  [0.50, 0x8fc8ee, 0xffffff, 2.6, 1.0],
  [0.68, 0xa8cde4, 0xffeccc, 2.2, 0.9],
  [0.74, 0xf08a5a, 0xff9a5a, 1.0, 0.62],    // hoàng hôn
  [0.79, 0x3a2f5a, 0x7a6aa8, 0.35, 0.5],
  [1.00, 0x14204a, 0x7a8ac0, 0.35, 0.5],
];
const _a = new THREE.Color(), _b = new THREE.Color(), _m = new THREE.Matrix4(), _c = new THREE.Color();

export function nightFactor(clock: number){ return clock < 0.23 || clock > 0.79 ? 1 : clock < 0.3 ? (0.3 - clock) / 0.07 : clock > 0.72 ? (clock - 0.72) / 0.07 : 0; }

interface Puff { x: number; y: number; z: number; age: number; life: number; vx: number }
interface Spark { x: number; y: number; z: number; vx: number; vy: number; vz: number; age: number; life: number; color: number; g?: number; size?: number }
interface Cloudlet { x: number; z: number; age: number; life: number }
interface Lantern { x: number; z: number; y: number; age: number; phase: number }

export class Effects {
  readonly group = new THREE.Group();
  readonly sun: THREE.DirectionalLight;
  readonly hemi: THREE.HemisphereLight;
  clock = 0.3;
  night = 0;
  private scene: THREE.Scene;
  private world: WorldState | null = null;
  private rain: THREE.LineSegments;
  private rainPos: Float32Array;
  private rainAmount = 0;
  private stars: THREE.Points;
  private clouds: THREE.InstancedMesh;
  private smoke: THREE.InstancedMesh;
  private puffs: Puff[] = [];
  private sparks: THREE.InstancedMesh;
  private sparkList: Spark[] = [];
  private halos: THREE.Sprite[] = [];
  private boats: THREE.InstancedMesh;
  private rope: THREE.Mesh;
  private ducks: THREE.InstancedMesh;
  private fest: FestivalState | null = null;

  constructor(scene: THREE.Scene, lamps: THREE.Vector3[]){
    this.scene = scene;
    this.hemi = new THREE.HemisphereLight(0xcfe6ff, 0x6b5a3a, 1);
    this.sun = new THREE.DirectionalLight(0xffffff, 2.4);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const s = this.sun.shadow.camera; s.left = -70; s.right = 70; s.top = 70; s.bottom = -70; s.near = 1; s.far = 400;
    this.sun.shadow.bias = -0.0008; this.sun.shadow.normalBias = 0.04;
    this.group.add(this.hemi, this.sun, this.sun.target);

    const n = 1600;
    this.rainPos = new Float32Array(n * 6);
    const rg = new THREE.BufferGeometry(); rg.setAttribute('position', new THREE.BufferAttribute(this.rainPos, 3));
    this.rain = new THREE.LineSegments(rg, new THREE.LineBasicMaterial({ color: 0xbfd4e6, transparent: true, opacity: 0.55 }));
    this.rain.frustumCulled = false; this.rain.visible = false;
    for (let i = 0; i < n; i++) this.resetDrop(i, new THREE.Vector3(), true);

    const sg = new THREE.BufferGeometry(), sp: number[] = [];
    for (let i = 0; i < 500; i++){ const a = Math.random() * Math.PI * 2, r = 160 + Math.random() * 60; sp.push(Math.cos(a) * r, 60 + Math.random() * 120, Math.sin(a) * r - 80); }
    sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
    this.stars = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 2, sizeAttenuation: false, transparent: true, opacity: 0 }));

    this.clouds = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: false }), 40);   // mây chỉ đổ bóng trôi trên mặt đất, không che camera
    this.clouds.castShadow = true; this.clouds.frustumCulled = false;

    this.smoke = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.5, 0), new THREE.MeshBasicMaterial({ color: 0xd8d4cc, transparent: true, opacity: 0.32, depthWrite: false }), 260);
    this.smoke.frustumCulled = false; this.smoke.count = 0;
    this.sparks = new THREE.InstancedMesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }), 2000);
    this.sparks.frustumCulled = false; this.sparks.count = 0;

    const halo = haloTexture();
    for (const l of lamps){
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: halo, color: 0xffc46b, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 }));
      sp.position.copy(l); sp.scale.set(3.6, 3.6, 1);
      this.halos.push(sp); this.group.add(sp);
    }

    // đạo cụ hội làng: thuyền đua, dây kéo co, vịt để bắt
    this.boats = new THREE.InstancedMesh(new THREE.BoxGeometry(4.2, 0.5, 1.1).translate(0, 0.25, 0), new THREE.MeshStandardMaterial({ roughness: 0.8, flatShading: true }), 8);
    this.boats.count = 0; this.boats.castShadow = true;
    this.rope = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 26, 6).rotateZ(Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0xd8c08a }));
    this.rope.position.set(SQUARE.x, 1.05, SQUARE.z); this.rope.visible = false;
    this.ducks = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.3, 0).scale(1.3, 1, 1), new THREE.MeshStandardMaterial({ color: 0xf6f4ec, flatShading: true }), 16);
    this.ducks.count = 0;
    this.group.add(this.rain, this.stars, this.clouds, this.smoke, this.sparks, this.boats, this.rope, this.ducks);

    // hiệu ứng quà: mây mưa nhỏ, cầu vồng, đèn trời, vòng sáng lan trên mặt đất
    this.puffCloud = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.75, 2), new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x8a96a8, roughness: 1, transparent: true, opacity: 0.92 }), 6 * 24);
    this.puffCloud.count = 0; this.puffCloud.frustumCulled = false;
    const rb = new THREE.TorusGeometry(16, 0.9, 6, 48, Math.PI), cols: number[] = [], pos = rb.attributes.position;
    for (let i = 0; i < pos.count; i++){
      const v = new THREE.Vector3().fromBufferAttribute(pos, i), r = Math.hypot(v.x, v.y);
      _c.setHSL(Math.max(0, Math.min(0.8, (r - 15.1) / 1.8 * 0.8)), 0.9, 0.62); cols.push(_c.r, _c.g, _c.b);
    }
    rb.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    this.rainbow = new THREE.Mesh(rb, new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
    this.rainbow.visible = false;
    this.lanternMesh = new THREE.InstancedMesh(new THREE.BoxGeometry(0.7, 0.9, 0.7), new THREE.MeshBasicMaterial({ color: 0xffa040, toneMapped: false }), 60);
    this.lanternMesh.count = 0; this.lanternMesh.frustumCulled = false;
    this.ringMesh = new THREE.InstancedMesh(new THREE.RingGeometry(0.85, 1, 40).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }), 20);
    this.ringMesh.count = 0; this.ringMesh.frustumCulled = false;
    this.group.add(this.puffCloud, this.rainbow, this.lanternMesh, this.ringMesh);
  }

  private puffCloud: THREE.InstancedMesh;
  private rainbow: THREE.Mesh;
  private rainbowAge = Infinity;
  private lanternMesh: THREE.InstancedMesh;
  private ringMesh: THREE.InstancedMesh;
  private cloudlets: Cloudlet[] = [];
  private lanterns: Lantern[] = [];
  private rings: { x: number; z: number; age: number; color: number; size: number }[] = [];

  private spark(s: Spark){ if (this.sparkList.length < 2000) this.sparkList.push(s); }

  // Hiệu ứng riêng cho từng kiểu quà, đặt ở người tặng, nhà xóm được hưởng và ngôi nhà của người tặng.
  // rain mây nhỏ đổ mưa · leaf lá xanh bay lên · outfit vải màu xoay quanh người · rainbow cầu vồng · bricks gỗ gạch rơi xuống sân
  // coins mưa xu vàng · house bụi và búa sáng ở nhà vừa lên cấp · outfit2 áo quý lấp lánh · lantern đèn trời · grand tất cả
  giftFx(style: string, level: number, at: { x: number; z: number }, targets: { x: number; z: number }[], home: { x: number; z: number } | null){
    const has = (...s: string[]) => s.includes(style) || style === 'grand';
    const ring = (x: number, z: number, color: number, size: number) => { if (this.rings.length < 20) this.rings.push({ x, z, age: 0, color, size }); };
    ring(at.x, at.z, ({ rain: 0x7ad0ff, leaf: 0x8be07a, outfit: 0xff8ad0, rainbow: 0xffe07a, bricks: 0xd08a5a, coins: 0xffc040, house: 0xffc040, outfit2: 0xffd0f0, lantern: 0xff8a40, grand: 0xffe07a } as Record<string, number>)[style] ?? 0xffe07a, 6 + level * 3);
    if (has('rain', 'rainbow')){
      for (const p of [at, ...targets].slice(0, 24)) if (this.cloudlets.length < 24) this.cloudlets.push({ x: p.x, z: p.z, age: 0, life: 4.5 });
    }
    if (has('leaf', 'rainbow', 'coins', 'house', 'lantern')){
      for (const p of [at, ...targets].slice(0, 30)) for (let i = 0; i < 10; i++){
        const a = Math.random() * Math.PI * 2;
        this.spark({ x: p.x + Math.cos(a) * 0.8, y: 0.3, z: p.z + Math.sin(a) * 0.8, vx: Math.cos(a) * 0.6, vy: 2 + Math.random() * 2, vz: Math.sin(a) * 0.6, age: 0, life: 1.8, color: [0x7ed957, 0xa8e86a, 0xffe07a][i % 3], g: -0.6, size: 0.8 });
      }
    }
    if (has('outfit', 'outfit2')){
      // dải vải nhiều màu xoáy quanh người rồi bay lên
      const colors = style === 'outfit' ? [0xff6a8a, 0x6ab0ff, 0xffd060, 0x8be07a] : [0xffd040, 0xfff3b0, 0xff8ad0, 0xc8a0ff];
      for (let i = 0; i < 70; i++){
        const a = i / 70 * Math.PI * 8, r = 1.6;
        this.spark({ x: at.x + Math.cos(a) * r, y: 0.4 + i * 0.03, z: at.z + Math.sin(a) * r, vx: -Math.sin(a) * 2.5, vy: 1.6, vz: Math.cos(a) * 2.5, age: 0, life: 2.2, color: colors[i % colors.length], g: -0.4, size: style === 'outfit2' ? 1.1 : 0.85 });
      }
    }
    if (has('rainbow')){ this.rainbow.position.set(at.x, 0, at.z - 6); this.rainbowAge = 0; }
    if (has('bricks', 'house')){
      // gỗ gạch từ trên trời rơi xuống sân nhà
      const p = home ?? at;
      for (let i = 0; i < 40; i++) this.spark({ x: p.x + (Math.random() - 0.5) * 6, y: 12 + Math.random() * 8, z: p.z + 3 + (Math.random() - 0.5) * 3, vx: 0, vy: -2, vz: 0, age: 0, life: 1.6, color: i % 2 ? 0xb0533a : 0x8c5a34, g: 9, size: 1.0 });
    }
    if (has('house') && home){
      ring(home.x, home.z, 0xffd040, 12);
      // bụi xây dựng và tia sáng búa gõ quanh nhà
      for (let i = 0; i < 60; i++){
        const a = Math.random() * Math.PI * 2;
        this.spark({ x: home.x + Math.cos(a) * 3.5, y: 0.5 + Math.random() * 3, z: home.z + Math.sin(a) * 3, vx: Math.cos(a) * 1.5, vy: 1 + Math.random() * 2, vz: Math.sin(a) * 1.5, age: 0, life: 1.6, color: i % 3 ? 0xd8c8a8 : 0xffe07a, g: 1, size: 0.9 });
      }
      for (let k = 0; k < 4; k++) setTimeout(() => this.burst(home.x, 6 + k, home.z, 30, [0xffd45a, 0xfff3b0]), 300 + k * 450);
    }
    if (has('coins', 'outfit2')){
      // vòi xu vàng phun lên rồi rơi lấp lánh quanh người tặng
      for (let i = 0; i < (style === 'outfit2' ? 60 : level >= 4 ? 140 : 90); i++){
        const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 4;
        this.spark({ x: at.x, y: 1.5, z: at.z, vx: Math.cos(a) * sp, vy: 8 + Math.random() * 6, vz: Math.sin(a) * sp, age: 0, life: 2.4, color: i % 4 ? 0xffd040 : 0xfff3b0, g: 9, size: 1.1 });
      }
    }
    if (has('lantern')){
      for (let i = 0; i < (style === 'grand' ? 60 : 40) && this.lanterns.length < 60; i++)
        this.lanterns.push({ x: at.x + (Math.random() - 0.5) * 36, z: at.z + (Math.random() - 0.5) * 24, y: 0.5 + Math.random() * 2, age: -i * 0.12, phase: Math.random() * 6 });
    }
  }

  // Đám cưới: hearts tim hồng và cánh hoa quanh cô dâu chú rể · envelope phong bì đỏ bay từ khách lên sân khấu · steal vòng đỏ chớp
  weddingFx(kind: 'hearts' | 'envelope' | 'steal', at: { x: number; z: number }, from?: { x: number; z: number }){
    if (kind === 'hearts'){
      for (let i = 0; i < 80; i++){
        const a = Math.random() * Math.PI * 2, sp = 0.8 + Math.random() * 1.5;
        this.spark({ x: at.x + Math.cos(a) * 1.5, y: 1 + Math.random() * 1.5, z: at.z + Math.sin(a), vx: Math.cos(a) * sp, vy: 1.5 + Math.random() * 2, vz: Math.sin(a) * sp, age: 0, life: 2.6, color: [0xff5a8a, 0xffa6c8, 0xffffff, 0xffd34d][i % 4], g: -0.3, size: 0.8 });
      }
    }
    if (kind === 'envelope' && from){
      // phong bì bay vòng lên rồi rơi xuống sân khấu
      for (let i = 0; i < 6; i++){
        const T = 1.4, vx = (at.x - from.x) / T, vz = (at.z - from.z) / T;
        this.spark({ x: from.x, y: 1.5 + i * 0.1, z: from.z, vx: vx + (Math.random() - 0.5), vy: 6.5, vz: vz + (Math.random() - 0.5), age: -i * 0.08, life: T, color: i % 2 ? 0xd61f2c : 0xffd34d, g: 9, size: 1.2 });
      }
    }
    if (kind === 'steal'){
      if (this.rings.length < 20) this.rings.push({ x: at.x, z: at.z, age: 0, color: 0xff3a3a, size: 14 });
      for (let i = 0; i < 70; i++){
        const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 4;
        this.spark({ x: at.x, y: 1.5, z: at.z, vx: Math.cos(a) * sp, vy: 3 + Math.random() * 4, vz: Math.sin(a) * sp, age: 0, life: 1.4, color: i % 3 ? 0xff4a4a : 0xffe07a, g: 9, size: 0.9 });
      }
    }
  }

  private giftProps(dt: number, t: number){
    // mây mưa nhỏ: bông mây trắng, mưa rơi từ đáy mây
    let n = 0;
    this.cloudlets = this.cloudlets.filter(c => (c.age += dt) < c.life);
    for (const c of this.cloudlets){
      const grow = Math.min(1, c.age * 3) * Math.min(1, (c.life - c.age) * 2), y = 8 + Math.sin(t * 2 + c.x) * 0.2;
      for (let k = 0; k < 6; k++){
        const s = (1 + (k % 3) * 0.35) * grow;
        this.puffCloud.setMatrixAt(n++, mat(c.x + (k - 2.5) * 0.8, y + (k % 2) * 0.5, c.z + ((k * 7) % 3 - 1) * 0.5, s, s * 0.75, s, 0, 0, 0, _m));
      }
      if (c.age > 0.3 && c.age < c.life - 0.4) for (let k = 0; k < 2; k++)
        this.spark({ x: c.x + (Math.random() - 0.5) * 3.5, y: y - 0.6, z: c.z + (Math.random() - 0.5) * 1.5, vx: 0, vy: -9, vz: 0, age: 0, life: 0.7, color: 0x8fd0ff, g: 6, size: 0.45 });
    }
    this.puffCloud.count = n; this.puffCloud.instanceMatrix.needsUpdate = true;

    // cầu vồng hiện dần rồi tan
    this.rainbowAge += dt;
    const ra = this.rainbowAge < 1.5 ? this.rainbowAge / 1.5 : this.rainbowAge < 8 ? 1 : Math.max(0, 1 - (this.rainbowAge - 8) / 2);
    this.rainbow.visible = ra > 0;
    (this.rainbow.material as THREE.MeshBasicMaterial).opacity = ra * 0.75;

    // đèn trời bay lên chầm chậm, đung đưa theo gió
    let l = 0;
    this.lanterns = this.lanterns.filter(o => (o.age += dt) < 14);
    for (const o of this.lanterns){
      if (o.age < 0) continue;
      const y = o.y + o.age * 2.4, sw = Math.sin(t * 1.3 + o.phase) * 0.6 + o.age * (this.world?.wind ?? 0.3) * 0.8;
      const s = Math.min(1, o.age * 2) * (o.age > 12 ? (14 - o.age) / 2 : 1);
      this.lanternMesh.setMatrixAt(l, mat(o.x + sw, y, o.z, s, s, s, t * 0.3 + o.phase, 0, 0, _m));
      this.lanternMesh.setColorAt(l++, _c.setHSL(0.07 + 0.03 * Math.sin(t * 6 + o.phase), 1, 0.55 + 0.1 * Math.sin(t * 9 + o.phase)));
    }
    this.lanternMesh.count = l; this.lanternMesh.instanceMatrix.needsUpdate = true; if (this.lanternMesh.instanceColor) this.lanternMesh.instanceColor.needsUpdate = true;

    // vòng sáng lan ra trên mặt đất
    let r = 0;
    this.rings = this.rings.filter(o => (o.age += dt) < 1.4);
    for (const o of this.rings){
      const k = o.age / 1.4, s = 0.5 + k * o.size;
      this.ringMesh.setMatrixAt(r, mat(o.x, 0.15, o.z, s, 1, s, 0, 0, 0, _m));
      this.ringMesh.setColorAt(r++, _c.set(o.color).multiplyScalar(1 - k));
    }
    this.ringMesh.count = r; this.ringMesh.instanceMatrix.needsUpdate = true; if (this.ringMesh.instanceColor) this.ringMesh.instanceColor.needsUpdate = true;
  }

  setWorld(w: WorldState){ this.world = w; if (Math.abs(w.clock - this.clock) > 0.02) this.clock = w.clock; }
  setFestival(f: FestivalState){ this.fest = f; }

  private resetDrop(i: number, c: THREE.Vector3, anyHeight = false){
    const x = c.x + (Math.random() - 0.5) * 150, z = c.z + (Math.random() - 0.5) * 150, y = anyHeight ? Math.random() * 40 : 40;
    this.rainPos.set([x, y, z, x - 0.3, y - 1.6, z - 0.15], i * 6);
  }

  puff(x: number, y: number, z: number){
    if (this.puffs.length >= 260) return;
    this.puffs.push({ x, y, z, age: 0, life: 4 + Math.random() * 2, vx: (Math.random() - 0.5) * 0.3 });
  }

  burst(x: number, y: number, z: number, n = 120, colors = [0xffd45a, 0xff5a5a, 0x7ad0ff, 0xb0ff7a, 0xff8ae0]){
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < n && this.sparkList.length < 2000; i++){
      const u = Math.random() * 2 - 1, a = Math.random() * Math.PI * 2, r = Math.sqrt(1 - u * u), sp = 9 + Math.random() * 4;
      this.sparkList.push({ x, y, z, vx: r * Math.cos(a) * sp, vy: u * sp + 3, vz: r * Math.sin(a) * sp, age: 0, life: 1.4 + Math.random() * 0.8, color });
    }
  }

  fireworks(cx: number, cz: number){
    for (let k = 0; k < 6; k++) setTimeout(() => this.burst(cx + (Math.random() - 0.5) * 50, 22 + Math.random() * 12, cz + (Math.random() - 0.5) * 30), k * 380);
  }

  sparkle(x: number, z: number, color = 0xffe08a){ for (let i = 0; i < 18 && this.sparkList.length < 2000; i++) this.sparkList.push({ x, y: 1, z, vx: (Math.random() - 0.5) * 3, vy: 3 + Math.random() * 3, vz: (Math.random() - 0.5) * 3, age: 0, life: 0.9, color }); }

  update(dt: number, t: number, target: THREE.Vector3, chimneys: Iterable<{ x: number; y: number; z: number }>, smokeChance: number){
    // giờ trong ngày chạy mượt giữa hai lần server báo
    this.clock = (this.clock + dt / DAY_SECONDS) % 1;
    const w = this.world, raining = w?.weather === 'rain', cloudy = raining || w?.weather === 'cloudy';
    let i = 0;
    while (i < SKY.length - 2 && SKY[i + 1][0] <= this.clock) i++;
    const [t0, s0, l0, i0, h0] = SKY[i], [t1, s1, l1, i1, h1] = SKY[i + 1], k = (this.clock - t0) / Math.max(1e-6, t1 - t0);
    const dim = raining ? 0.55 : cloudy ? 0.78 : 1;
    _a.set(s0).lerp(_b.set(s1), k);
    if (cloudy) _a.lerp(_b.set(0x8a95a0), raining ? 0.55 : 0.3);
    (this.scene.background as THREE.Color).copy(_a);
    this.sun.color.set(l0).lerp(_b.set(l1), k);
    this.sun.intensity = (i0 + (i1 - i0) * k) * dim;
    this.hemi.intensity = (h0 + (h1 - h0) * k) * (raining ? 0.8 : 1);
    this.hemi.color.copy(_a).lerp(_b.set(0xffffff), 0.5);
    this.night = nightFactor(this.clock);
    shared.light.value.setRGB(1, 1, 1).lerp(_b.set(0x52608a), this.night * 0.8).multiplyScalar(dim * 0.25 + 0.75);
    shared.wind.value += ((w?.wind ?? 0.3) - shared.wind.value) * Math.min(1, dt);
    // mặt trời đi theo giờ, bóng ngắn buổi trưa, dài lúc sáng chiều; ban đêm là ánh trăng
    const sunA = ((this.clock - 0.25) / 0.5) * Math.PI, day = this.clock > 0.24 && this.clock < 0.76;
    const ang = day ? sunA : sunA - Math.PI;
    this.sun.position.set(target.x + Math.cos(ang) * 90, 30 + Math.max(0.15, Math.sin(ang)) * 110, target.z + 60);
    this.sun.target.position.copy(target);
    for (const h of this.halos) h.material.opacity = this.night * (0.5 + Math.sin(t * 3 + h.position.x) * 0.05);
    (this.stars.material as THREE.PointsMaterial).opacity = cloudy ? 0 : this.night;

    // mưa
    this.rainAmount += ((raining ? 1 : 0) - this.rainAmount) * Math.min(1, dt * 0.8);
    this.rain.visible = this.rainAmount > 0.02;
    if (this.rain.visible){
      const fall = 38 * dt, slant = (w?.wind ?? 0.3) * 6 * dt, n = Math.floor(this.rainPos.length / 6 * this.rainAmount);
      for (let d = 0; d < this.rainPos.length / 6; d++){
        const o = d * 6;
        if (d >= n){ this.rainPos[o + 1] = this.rainPos[o + 4] = -50; continue; }
        this.rainPos[o + 1] -= fall; this.rainPos[o + 4] -= fall; this.rainPos[o] += slant; this.rainPos[o + 3] += slant;
        if (this.rainPos[o + 4] < 0 || this.rainPos[o + 1] < -40) this.resetDrop(d, target);
      }
      this.rain.geometry.attributes.position.needsUpdate = true;
    }
    // mây trôi theo gió
    const cn = cloudy ? 40 : 14, drift = t * (1 + (w?.wind ?? 0.3) * 4);
    for (let c = 0; c < cn; c++){
      const x = ((c * 47 + drift) % 360) - 180, z = -140 + (c * 61) % 300, s = 5 + (c % 5) * 2;
      this.clouds.setMatrixAt(c, mat(x, 42 + (c % 4) * 3, z, s * 1.8, s * 0.6, s, 0, 0, 0, _m));
      this.clouds.setColorAt(c, _c.set(raining ? 0x8d949c : cloudy ? 0xc9ced3 : 0xffffff));
    }
    this.clouds.count = cn; this.clouds.instanceMatrix.needsUpdate = true; if (this.clouds.instanceColor) this.clouds.instanceColor.needsUpdate = true;

    // khói bếp: rõ nhất giờ nấu cơm sáng và chiều
    const cooking = (this.clock > 0.24 && this.clock < 0.34) || (this.clock > 0.68 && this.clock < 0.8) ? 1 : 0.15;
    for (const ch of chimneys) if (Math.random() < smokeChance * cooking * dt) this.puff(ch.x, ch.y, ch.z);
    const windX = (w?.wind ?? 0.3) * 1.6;
    let p = 0;
    this.puffs = this.puffs.filter(f => (f.age += dt) < f.life);
    for (const f of this.puffs){
      const a = f.age / f.life, s = 0.35 + a * 1.4;
      this.smoke.setMatrixAt(p++, mat(f.x + (f.vx + windX) * f.age, f.y + f.age * 1.1, f.z, s * (1 - a * 0.4), s * (1 - a * 0.4), s * (1 - a * 0.4), 0, 0, 0, _m));
    }
    this.smoke.count = p; this.smoke.instanceMatrix.needsUpdate = true;
    (this.smoke.material as THREE.MeshBasicMaterial).color.set(0xd8d4cc).lerp(_b.set(0x50566a), this.night * 0.7);

    // pháo hoa và lấp lánh
    let q = 0;
    this.sparkList = this.sparkList.filter(s => (s.age += dt) < s.life);
    for (const s of this.sparkList){
      if (s.age < 0) continue;                    // hạt hẹn giờ: chưa tới lượt bay
      s.vy -= (s.g ?? 9) * dt; s.vx *= 0.985; s.vz *= 0.985;
      s.x += s.vx * dt; s.y += s.vy * dt; s.z += s.vz * dt;
      const sc = (1 - s.age / s.life) * (s.size ?? 1);
      this.sparks.setMatrixAt(q, mat(s.x, s.y, s.z, sc, sc, sc, 0, 0, 0, _m)); this.sparks.setColorAt(q++, _c.set(s.color));
    }
    this.sparks.count = q; this.sparks.instanceMatrix.needsUpdate = true; if (this.sparks.instanceColor) this.sparks.instanceColor.needsUpdate = true;

    this.giftProps(dt, t);
    this.festivalProps(t);
  }

  private festivalProps(t: number){
    const f = this.fest, on = f && (f.phase === 'contest' || f.phase === 'lobby');
    this.rope.visible = !!on && f!.type === 'keoco';
    if (this.rope.visible){
      const [a, b] = f!.teams, shift = Math.max(-3, Math.min(3, (b - a) * 0.15));
      this.rope.position.x = SQUARE.x + shift + Math.sin(t * 8) * 0.05;
    }
    const boats = on && f!.type === 'duathuyen' ? Math.min(8, f!.entrants.length) : 0;
    for (let i = 0; i < boats; i++){
      const x = -40 + i * 10, z = riverZ(x);
      this.boats.setMatrixAt(i, mat(x, 0.05 + Math.sin(t * 3 + i) * 0.05, z, 1, 1, 1, 0, 0, Math.sin(t * 2 + i) * 0.04, _m));
      this.boats.setColorAt(i, _c.set([0xc8231d, 0x2f6f8f, 0xe2b23c, 0x3e8e5a][i % 4]));
    }
    this.boats.count = boats; this.boats.instanceMatrix.needsUpdate = true; if (this.boats.instanceColor) this.boats.instanceColor.needsUpdate = true;
    const ducks = on && f!.type === 'batvit' ? 14 : 0;
    for (let i = 0; i < ducks; i++){
      const a = t * (1.2 + (i % 3) * 0.4) + i;
      this.ducks.setMatrixAt(i, mat(SQUARE.x + Math.sin(a) * 11, 0.3 + Math.abs(Math.sin(t * 9 + i)) * 0.2, SQUARE.z + Math.sin(a * 1.7 + i) * 5, 1, 1, 1, a, 0, 0, _m));
    }
    this.ducks.count = ducks; this.ducks.instanceMatrix.needsUpdate = true;
  }
}

function haloTexture(){
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d')!, gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,230,170,1)'); gr.addColorStop(0.3, 'rgba(255,190,90,0.45)'); gr.addColorStop(1, 'rgba(255,160,60,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
