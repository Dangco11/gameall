import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Batch, GEO, mat } from '../batch.ts';
import { buildAltar, buildDinh, lanternGeo, pbrMat } from './dinh.ts';
import { Nature } from './nature.ts';
import { brick, carpet as carpetTex, glowSprite, seeded as seededTex, stone } from './tex.ts';

// Sân cưới làng quê nhìn thẳng từ cuối thảm đỏ: đình mái ngói phía sau, cổng hoa hồng có bảng Lễ Thành Hôn,
// mâm cỗ hai bên thảm (kê thêm theo số khách), ban nhạc và trống đỏ bên phải, cây cối, đèn lồng, cánh hoa rơi.
// Gốc tọa độ ở chân cổng hoa, trục z hướng về phía người xem.
export interface Spot { x: number; z: number; yaw: number }
const FACE = 0;                                                   // quay mặt về phía camera

export const COUPLE = { bride: { x: -0.75, z: 2.2, yaw: FACE }, groom: { x: 0.75, z: 2.2, yaw: FACE } };
export const CAKE_Z = 3.7;                                       // bàn bánh cưới trước sân khấu
export const ENTRANCE = { x: 14, z: 6 };                         // lối vào từ mép phải sân, không đi ngang trước camera
// Mâm cỗ: mỗi mâm 6 ghế, tối đa 20 mâm (120 chỗ). Thứ tự kê: gần sân khấu trước, trái phải xen kẽ,
// nên khách ít thì kê ít mâm ở phía trước, khách đông thì kê thêm ra phía sau và ra ngoài.
export const SEATS_PER = 6;
export const MAM: { x: number; z: number }[] = [[3.6, 7], [3.6, 10.2], [6.4, 7], [6.4, 10.2], [3.6, 13.4], [6.4, 13.4], [3.6, 16.6], [6.4, 16.6], [3.6, 19.8], [6.4, 19.8]]
  .flatMap(([x, z]) => [{ x: -x, z }, { x, z }]);
const SEAT_R = 1.35;
export const tableSeats = (i: number): Spot[] => Array.from({ length: SEATS_PER }, (_, k) => {
  const t = MAM[i], a = (k + 0.5) / SEATS_PER * Math.PI * 2;
  return { x: t.x + Math.cos(a) * SEAT_R, z: t.z + Math.sin(a) * SEAT_R, yaw: Math.atan2(-Math.cos(a), -Math.sin(a)) };
});
export const SEATS: Spot[] = MAM.flatMap((_, i) => tableSeats(i));
// Chỗ đứng chúc mừng khi lễ thành hôn bắt đầu: khoảng trống trước dãy mâm và hai mép thảm đỏ, quay mặt về cô dâu chú rể.
// Bên phải hẹp hơn vì có ban nhạc. Thứ tự: gần cô dâu chú rể trước.
const faceCouple = (x: number, z: number): Spot => ({ x, z, yaw: Math.atan2(-x, 2.6 - z) });
function standSide(sg: number, cols: number){
  const front: Spot[] = [], edge: Spot[] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < cols; c++) front.push(faceCouple(sg * (2.4 + c * 1.0 + (r % 2) * 0.4), 3.0 + r * 0.8));
  for (let r = 0; r < 19; r++) for (const x of [1.6, 2.15]) edge.push(faceCouple(sg * (x + (r % 2) * 0.1), 6.2 + r * 0.8));
  front.sort((a, b) => Math.hypot(a.x, a.z - 2.6) - Math.hypot(b.x, b.z - 2.6));
  return [...front, ...edge];
}
export const STAND_L = standSide(-1, 8), STAND_R = standSide(1, 4);

export const BAND: Spot[] = [{ x: 6.2, z: 2.2, yaw: -0.5 }, { x: 7.6, z: 2.8, yaw: -0.6 }, { x: 8.9, z: 3.6, yaw: -0.7 }];

const HIDE = new THREE.Matrix4().makeScale(0, 0, 0);
const RED = 0xc8231d, GOLD = 0xe8b83a, WHITE = 0xfaf6ee, PINK = 0xf6a9bf, ROSE = 0xe8507a, WOOD = 0x6e4428, WOOD_D = 0x4a2c18;

export class Stage {
  readonly group = new THREE.Group();
  readonly lanterns: THREE.Vector3[] = [];
  readonly sign: THREE.CanvasTexture;
  readonly frames: THREE.CanvasTexture[] = [];
  private petals: THREE.InstancedMesh;
  private petalState: { x: number; y: number; z: number; vx: number; vy: number; rot: number; spin: number }[] = [];
  private drapes: { mesh: THREE.Mesh; base: Float32Array }[] = [];
  private b: Record<'box' | 'cyl' | 'ball' | 'cone' | 'prism', Batch>;
  private flowers: Batch;
  nature!: Nature;
  private lanternList: { x: number; y: number; z: number; s: number }[] = [];
  private lanternMesh!: THREE.InstancedMesh; private lanternGlow!: THREE.InstancedMesh; private silk!: THREE.MeshStandardMaterial;
  private bulbs!: THREE.InstancedMesh; private bulbMat!: THREE.MeshBasicMaterial; private bulbHalo!: THREE.InstancedMesh; private haloMat!: THREE.MeshBasicMaterial;
  private bulbCount = 0;

  constructor(signCanvas: HTMLCanvasElement, frameCanvases: HTMLCanvasElement[] = []){
    const smooth = new THREE.MeshStandardMaterial({ roughness: 0.8 });
    this.b = {
      box: new Batch(GEO.box, smooth, 1500), cyl: new Batch(new THREE.CylinderGeometry(0.5, 0.5, 1, 18).translate(0, 0.5, 0), smooth, 600),
      ball: new Batch(new THREE.SphereGeometry(0.5, 18, 12).translate(0, 0.5, 0), smooth, 800), cone: new Batch(GEO.round, smooth, 200), prism: new Batch(GEO.prism, smooth, 80),
    };
    this.flowers = new Batch(new THREE.IcosahedronGeometry(0.5, 1), new THREE.MeshStandardMaterial({ roughness: 0.6 }), 2600, false);
    for (const x of Object.values(this.b)) this.group.add(x.mesh);
    this.group.add(this.flowers.mesh);

    this.ground();
    this.group.add(buildAltar(-1.1));
    this.group.add(buildDinh());
    for (const x of [-6, -3, 3, 6]) this.lantern(x, 3.75, 0.05, 1);
    for (const x of [-4.6, 4.6]) this.lantern(x, 5.55, -1.45, 0.75);
    this.arch();
    this.buildTables();
    this.band();
    this.nature = new Nature(); this.group.add(this.nature.group);
    this.decor();
    this.buildCake();
    this.buildLanterns();
    this.sign = new THREE.CanvasTexture(signCanvas); this.sign.colorSpace = THREE.SRGBColorSpace;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 2.31), new THREE.MeshBasicMaterial({ map: this.sign, transparent: true, toneMapped: false }));
    sign.position.set(0, 4.45, 0.45);
    this.group.add(sign);
    this.portraits(frameCanvases);

    // cánh hoa rơi khắp sân
    const petal = new THREE.CircleGeometry(0.07, 6).scale(1, 0.7, 1);
    this.petals = new THREE.InstancedMesh(petal, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.95 }), 220);
    this.petals.frustumCulled = false;
    const cols = [0xffb3c8, 0xff7a9a, 0xffffff, 0xf9d0dc];
    for (let i = 0; i < 220; i++){ this.petalState.push(this.newPetal(true)); this.petals.setColorAt(i, new THREE.Color(cols[i % cols.length])); }
    this.group.add(this.petals);
    for (const x of Object.values(this.b)) x.flush();
    this.flowers.flush();
  }

  private put(s: keyof Stage['b'], c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0, rx = 0, rz = 0){
    return this.b[s].add(mat(x, y, z, sx, sy, sz, ry, rx, rz), c);
  }
  private flower(x: number, y: number, z: number, s: number, c: number){ this.flowers.add(mat(x, y, z, s, s, s), c); }

  // Sân đình lát gạch đỏ Bát Tràng có rêu trong mạch, viền đá ong bao quanh; ngoài sân là đất cỏ; thảm nhung đỏ viền vàng
  private ground(){
    const court = new THREE.Mesh(new THREE.PlaneGeometry(23.6, 26.5).rotateX(-Math.PI / 2), pbrMat(brick(), [6.6, 7.4]));
    court.position.set(0, 0, 12.25); court.receiveShadow = true;
    const soilC = document.createElement('canvas'); soilC.width = soilC.height = 256;
    const sg = soilC.getContext('2d')!, r = seeded(13);
    sg.fillStyle = '#5f7a34'; sg.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 2600; i++){ const g = 90 + Math.floor(r() * 60); sg.fillStyle = r() < 0.12 ? `rgba(110,86,52,${0.3 + r() * 0.4})` : `rgba(${g - 40},${g + 20},${g - 60},0.5)`; sg.fillRect(r() * 256, r() * 256, 2 + r() * 6, 2 + r() * 6); }
    const soilT = new THREE.CanvasTexture(soilC); soilT.colorSpace = THREE.SRGBColorSpace; soilT.wrapS = soilT.wrapT = THREE.RepeatWrapping; soilT.repeat.set(40, 40);
    const grass = new THREE.Mesh(new THREE.PlaneGeometry(200, 200).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ map: soilT, roughness: 1 }));
    grass.position.set(0, -0.02, 0); grass.receiveShadow = true;
    // viền đá quanh sân gạch
    const curbM = pbrMat(stone(), [4, 0.3]);
    for (const [x, z, w, d] of [[0, 25.6, 24, 0.3], [-11.95, 12.3, 0.3, 26.6], [11.95, 12.3, 0.3, 26.6]] as const){
      const c = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), curbM); c.position.set(x, 0.06, z); c.castShadow = c.receiveShadow = true; this.group.add(c);
    }
    const ct = carpetTex(), cm = new THREE.MeshStandardMaterial({ map: ct.map.clone(), normalMap: ct.normalMap.clone(), roughness: 0.95, color: 0xffffff });
    for (const t of [cm.map!, cm.normalMap!]){ t.repeat.set(1, 4); t.needsUpdate = true; }
    const carpet = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.025, 16), [cm, cm, cm, cm, cm, cm]);
    carpet.position.set(0, 0.012, 9.2); carpet.receiveShadow = true;
    this.group.add(grass, court, carpet);
    // cánh hoa đã rơi trên thảm
    const rnd = seeded(3);
    for (let i = 0; i < 240; i++) this.flower((rnd() - 0.5) * 3.6, 0.03, 1.5 + rnd() * 15, 0.08, [0xffb3c8, 0xff7a9a, 0xffffff][i % 3]);
  }

  // Hai khung ảnh cưới to dựng trên mái đình hai bên bảng Lễ Thành Hôn: trái cô dâu, phải chú rể.
  // Khung gỗ dày phía sau, chân đứng trên diềm mái, hơi ngả ra sau; ảnh vẽ trên canvas (sign.ts), tự cập nhật khi đổi người.
  private portraits(canvases: HTMLCanvasElement[]){
    canvases.forEach((c, i) => {
      const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
      this.frames.push(tex);
      const g = new THREE.Group(), w = 2.7, h = w * 1.25;
      const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
      pic.position.z = 0.07;
      const back = new THREE.Mesh(new THREE.BoxGeometry(w * 0.97, h * 0.97, 0.12), new THREE.MeshStandardMaterial({ color: WOOD_D, roughness: 0.7 }));
      back.castShadow = true;
      for (const sx of [-1, 1]){ const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.2, 0.1), new THREE.MeshStandardMaterial({ color: WOOD_D })); leg.position.set(sx * w * 0.32, -h / 2 - 0.3, -0.12); g.add(leg); }
      g.add(back, pic);
      g.position.set(i === 0 ? -3.4 : 3.4, 6.15, -0.9); g.rotation.x = -0.12; g.rotation.y = i === 0 ? 0.12 : -0.12;
      this.group.add(g);
      // dây hoa đỏ hồng vắt ngang đỉnh khung
      for (let k = 0; k <= 10; k++){ const u = k / 10; this.flower(g.position.x + (u - 0.5) * w, g.position.y + h / 2 + 0.05 - Math.sin(u * Math.PI) * 0.18, g.position.z + 0.15, 0.2, [PINK, ROSE, WHITE][k % 3]); }
    });
  }

  lantern(x: number, y: number, z: number, s: number){
    this.lanternList.push({ x, y, z, s });
    this.lanterns.push(new THREE.Vector3(x, y, z));
  }
  // Đèn lồng lụa đỏ có gân, chóp đáy thếp vàng, tua đỏ; về đêm sáng rực (vượt ngưỡng cho bloom tỏa quầng)
  private buildLanterns(){
    const n = this.lanternList.length, silk = lanternGeo();
    this.silk = new THREE.MeshStandardMaterial({ color: 0xc8141a, emissive: 0xff3a1a, emissiveIntensity: 0.2, roughness: 0.55, side: THREE.DoubleSide });
    const caps = new THREE.CylinderGeometry(0.14, 0.18, 0.1, 12), tassel = new THREE.ConeGeometry(0.06, 0.32, 8);
    const capM = new THREE.MeshStandardMaterial({ color: 0xd8a640, metalness: 0.8, roughness: 0.35 });
    this.lanternMesh = new THREE.InstancedMesh(silk, this.silk, n);
    const capMesh = new THREE.InstancedMesh(caps, capM, n * 2), tasMesh = new THREE.InstancedMesh(tassel, new THREE.MeshStandardMaterial({ color: 0xd01818, roughness: 0.8 }), n);
    this.lanternGlow = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: glowSprite(), color: 0xff6a2a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false }), n);
    const m = new THREE.Matrix4();
    this.lanternList.forEach((l, i) => {
      this.lanternMesh.setMatrixAt(i, mat(l.x, l.y - 0.45 * l.s, l.z, l.s, l.s, l.s, 0, 0, 0, m));
      capMesh.setMatrixAt(i * 2, mat(l.x, l.y - 0.02 * l.s, l.z, l.s, l.s, l.s, 0, 0, 0, m));
      capMesh.setMatrixAt(i * 2 + 1, mat(l.x, l.y - 0.9 * l.s, l.z, l.s, l.s, l.s, 0, 0, 0, m));
      tasMesh.setMatrixAt(i, mat(l.x, l.y - 1.12 * l.s, l.z, l.s, l.s, l.s, 0, Math.PI, 0, m));
      this.lanternGlow.setMatrixAt(i, mat(l.x, l.y - 0.45 * l.s, l.z + 0.4, 2.4 * l.s, 2.4 * l.s, 1, 0, 0, 0, m));
    });
    for (const x of [this.lanternMesh, capMesh, tasMesh]){ x.castShadow = true; this.group.add(x); }
    this.lanternGlow.frustumCulled = false; this.group.add(this.lanternGlow);
  }

  // Trang trí cưới: dây đèn vàng giăng ngang sân trên cọc tre, trụ hoa hai đầu thảm, viền hoa thấp dọc thảm đỏ
  private decor(){
    const bulbs: THREE.Matrix4[] = [], wires: THREE.BufferGeometry[] = [], poles: THREE.BufferGeometry[] = [];
    const m = new THREE.Matrix4();
    for (const z of [6.2, 11.2, 16.2, 21.2]){
      const a = new THREE.Vector3(-11.6, 5.4, z), b = new THREE.Vector3(11.6, 5.4, z), pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++){ const t = i / 64; pts.push(new THREE.Vector3(a.x + (b.x - a.x) * t, a.y - Math.sin(t * Math.PI) * 1.0, z)); }
      wires.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.012, 4));
      for (let i = 1; i < 64; i++) bulbs.push(mat(pts[i].x, pts[i].y - 0.06, z, 1, 1, 1, 0, 0, 0, new THREE.Matrix4()));
      for (const p of [a, b]) poles.push(new THREE.CylinderGeometry(0.06, 0.08, 5.5, 8).translate(p.x, 2.75, z));
    }
    // dây đèn thả từ hiên đình xuống hai trụ cổng hoa
    for (const sx of [-1, 1]){
      const a = new THREE.Vector3(sx * 7, 4.1, 0.2), b = new THREE.Vector3(sx * 2.3, 4.6, 0.3), pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 24; i++){ const t = i / 24; pts.push(new THREE.Vector3(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t - Math.sin(t * Math.PI) * 0.5, a.z + (b.z - a.z) * t)); }
      wires.push(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 24, 0.012, 4));
      for (let i = 1; i < 24; i++) bulbs.push(mat(pts[i].x, pts[i].y - 0.06, pts[i].z, 1, 1, 1, 0, 0, 0, new THREE.Matrix4()));
    }
    const wire = new THREE.Mesh(mergeGeometries(wires), new THREE.MeshStandardMaterial({ color: 0x2a2018, roughness: 0.8 }));
    const pole = new THREE.Mesh(mergeGeometries(poles), new THREE.MeshStandardMaterial({ color: 0x9a8a4a, roughness: 0.7 }));
    pole.castShadow = true; this.group.add(wire, pole);
    this.bulbCount = bulbs.length;
    this.bulbMat = new THREE.MeshBasicMaterial({ color: 0xffd890, toneMapped: false });
    this.bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 8, 6), this.bulbMat, bulbs.length);
    this.haloMat = new THREE.MeshBasicMaterial({ map: glowSprite(), color: 0xffb860, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, fog: false });
    this.bulbHalo = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.55, 0.55), this.haloMat, bulbs.length);
    bulbs.forEach((b, i) => { this.bulbs.setMatrixAt(i, b); this.bulbHalo.setMatrixAt(i, b); });
    this.bulbs.frustumCulled = this.bulbHalo.frustumCulled = false;
    this.group.add(this.bulbs, this.bulbHalo);
    // trụ hoa hai đầu thảm đỏ: chân sứ trắng, cầu hoa hồng trắng hồng
    const rnd = seeded(21), cols = [0xffffff, 0xf8d7e0, 0xf2b8c8, 0xffffff, 0xfff4e8];
    for (const [x, z] of [[-1.75, 3.2], [1.75, 3.2], [-1.75, 17.6], [1.75, 17.6]]){
      this.put('cyl', 0xf4f0e8, x, 0, z, 0.36, 0.12, 0.36); this.put('cyl', 0xf4f0e8, x, 0.12, z, 0.1, 1.0, 0.1); this.put('cyl', 0xf4f0e8, x, 1.1, z, 0.26, 0.1, 0.26);
      for (let k = 0; k < 46; k++){ const u = rnd() * Math.PI * 2, v = Math.acos(2 * rnd() - 1), r = 0.34; this.flower(x + Math.sin(v) * Math.cos(u) * r, 1.45 + Math.cos(v) * r * 0.8, z + Math.sin(v) * Math.sin(u) * r, 0.13 + rnd() * 0.05, cols[k % cols.length]); }
      for (let k = 0; k < 8; k++){ const a = k / 8 * Math.PI * 2; this.flower(x + Math.cos(a) * 0.36, 1.18 - rnd() * 0.4, z + Math.sin(a) * 0.36, 0.1, 0x4f8a3a); }
    }
    // viền hoa thấp dọc hai mép thảm
    for (let z = 2.2; z < 17; z += 0.32) for (const sx of [-1, 1]) this.flower(sx * (1.47 + rnd() * 0.06), 0.03 + rnd() * 0.05, z + rnd() * 0.1, 0.1 + rnd() * 0.04, [0xffffff, 0xf8c8d4, 0x5a9a48, 0xf2b8c8][Math.floor(rnd() * 4)]);
    // chậu cúc vàng men lam trước nền đình
    for (let x = 3.4; x <= 8.6; x += 1.3) for (const sx of [-1, 1]){
      this.put('cyl', 0x3a5a8a, sx * x, 0, -0.35, 0.42, 0.42, 0.42); this.put('cyl', 0x2a3a5a, sx * x, 0.42, -0.35, 0.46, 0.05, 0.46);
      for (let k = 0; k < 9; k++) this.flower(sx * x + (rnd() - 0.5) * 0.36, 0.55 + rnd() * 0.2, -0.35 + (rnd() - 0.5) * 0.36, 0.14, k % 4 ? 0xffc21a : 0x4f8a3a);
    }
  }

  // Cổng hoa: hai trụ quấn vải trắng, hoa hồng phủ dày theo trụ và vòm, rèm voan hồng buông hai bên
  private arch(){
    const rnd = seeded(9), cols = [PINK, ROSE, WHITE, 0xffd6e0, PINK, WHITE];
    for (const s of [-1, 1]){
      this.put('cyl', WHITE, s * 2.1, 0, 0, 0.32, 3.8, 0.32);
      for (let y = 0; y < 3.8; y += 0.16) for (let k = 0; k < 3; k++){
        const a = rnd() * Math.PI * 2;
        this.flower(s * 2.1 + Math.cos(a) * 0.22, y, Math.sin(a) * 0.22, 0.18 + rnd() * 0.12, cols[Math.floor(rnd() * cols.length)]);
      }
      // chậu hoa dưới chân trụ
      this.put('cyl', 0xe9e2d6, s * 2.6, 0, 0.9, 0.7, 0.5, 0.7);
      for (let k = 0; k < 22; k++) this.flower(s * 2.6 + (rnd() - 0.5) * 0.7, 0.55 + rnd() * 0.4, 0.9 + (rnd() - 0.5) * 0.7, 0.2, cols[Math.floor(rnd() * cols.length)]);
    }
    for (let i = 0; i <= 60; i++){
      const a = i / 60 * Math.PI, x = -Math.cos(a) * 2.1, y = 3.8 + Math.sin(a) * 1.0;
      for (let k = 0; k < 4; k++) this.flower(x + (rnd() - 0.5) * 0.35, y + (rnd() - 0.5) * 0.3, (rnd() - 0.5) * 0.4, 0.2 + rnd() * 0.12, cols[Math.floor(rnd() * cols.length)]);
      if (i % 6 === 0) this.flower(x, y, 0.2, 0.18, 0x5a9a48);
    }
    // rèm voan hồng: tấm vải mềm từ đỉnh vòm buông xuống hai bên, gợn sóng theo gió
    for (const s of [-1, 1]){
      const g = new THREE.PlaneGeometry(1.6, 4.4, 10, 24), pos = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++){
        const u = pos.getX(i) / 1.6 + 0.5, v = pos.getY(i) / 4.4 + 0.5;
        pos.setXYZ(i, s * (2.1 - u * 1.3 * v), 0.3 + v * 4.0 - Math.sin(u * Math.PI) * 0.25 * v, 0.25 + Math.sin(u * 8) * 0.06);
      }
      g.computeVertexNormals();
      const mesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ color: 0xffb6cc, transparent: true, opacity: 0.82, side: THREE.DoubleSide, roughness: 0.6 }));
      this.drapes.push({ mesh, base: Float32Array.from(pos.array as Float32Array) });
      this.group.add(mesh);
    }
  }

  // Bánh cưới 3 tầng trên bàn nhỏ giữa sân khấu, chỉ hiện từ lúc cắt bánh
  readonly cake = new THREE.Group();
  private buildCake(){
    const m = new THREE.MeshStandardMaterial({ color: 0xfffaf2, roughness: 0.5 }), pink = new THREE.MeshStandardMaterial({ color: 0xffa6c8, roughness: 0.5 });
    const add = (g: THREE.BufferGeometry, mat: THREE.Material, y: number) => { const x = new THREE.Mesh(g, mat); x.position.y = y; x.castShadow = true; this.cake.add(x); };
    add(new THREE.CylinderGeometry(0.42, 0.42, 0.75, 20), new THREE.MeshStandardMaterial({ color: 0xc8231d }), 0.375);
    add(new THREE.CylinderGeometry(0.5, 0.5, 0.04, 24), new THREE.MeshStandardMaterial({ color: 0xf2e8d8 }), 0.77);
    [[0.36, 0.3], [0.27, 0.26], [0.18, 0.22]].reduce((y, [r, h]) => { add(new THREE.CylinderGeometry(r, r, h, 22), m, y + h / 2); add(new THREE.TorusGeometry(r, 0.025, 6, 22).rotateX(Math.PI / 2), pink, y + 0.02); return y + h; }, 0.79);
    add(new THREE.SphereGeometry(0.07, 10, 8), pink, 1.65);
    this.cake.position.set(0, 0, CAKE_Z); this.cake.visible = false;
    this.group.add(this.cake);
  }

  // Mâm cỗ làng: bàn tròn phủ khăn đỏ, mâm nhôm giữa bàn có gà luộc, xôi gấc, giò chả, nem rán, bát canh, đĩa rau,
  // hoa quả; mỗi chỗ ngồi có bát, đũa, chén; ghế nhựa đỏ. Mỗi mâm có sẵn 8 chai bia và 4 món thêm ẩn, gọi bia, gọi món thì hiện dần.
  private tables: { parts: [Batch, number, THREE.Matrix4][]; bottles: [Batch, number, THREE.Matrix4][]; dishes: [Batch, number, THREE.Matrix4][][]; on: boolean; beer: number; food: number }[] = [];
  private shown = 0;
  private buildTables(){
    const m = new THREE.MeshStandardMaterial({ roughness: 0.75 });
    const tb = { cyl: new Batch(new THREE.CylinderGeometry(0.5, 0.5, 1, 18).translate(0, 0.5, 0), m, 900), ball: new Batch(new THREE.SphereGeometry(0.5, 14, 10).translate(0, 0.5, 0), m, 320), box: new Batch(GEO.box, m, 420),
      cloth: new Batch(clothGeo(), new THREE.MeshPhysicalMaterial({ roughness: 0.7, sheen: 0.6, sheenColor: new THREE.Color(0xffffff) }), 24), chair: new Batch(chairGeo(), new THREE.MeshStandardMaterial({ roughness: 0.45, metalness: 0.35 }), 140) };
    const glass = new Batch(new THREE.CylinderGeometry(0.5, 0.5, 1, 12).translate(0, 0.5, 0), new THREE.MeshStandardMaterial({ roughness: 0.15, metalness: 0.1 }), 340);
    for (const b of [...Object.values(tb), glass]) this.group.add(b.mesh);
    MAM.forEach((t, i) => {
      const parts: [Batch, number, THREE.Matrix4][] = [], bottles: [Batch, number, THREE.Matrix4][] = [];
      const P = (k: keyof typeof tb, c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0) => { const mm = mat(t.x + x, y, t.z + z, sx, sy, sz, ry); parts.push([tb[k], tb[k].add(mm, c), mm]); };
      P('cloth', 0xfbf8f2, 0, 0, 0, 1, 1, 1);                         // khăn trải trắng phủ chấm đất, xếp nếp
      P('box', RED, 0, 0.765, 0, 2.06, 0.006, 0.5);                    // khăn chạy bàn đỏ viền vàng
      P('box', GOLD, 0, 0.764, 0, 2.08, 0.005, 0.56);
      P('cyl', 0xc9ccd2, 0, 0.75, 0, 1.15, 0.03, 1.15);              // mâm nhôm
      P('cyl', 0xffffff, -0.22, 0.78, -0.12, 0.46, 0.02, 0.46);      // đĩa gà
      P('ball', 0xe9b84a, -0.22, 0.79, -0.12, 0.36, 0.24, 0.3);      // gà luộc vàng
      P('ball', 0xd8342a, 0.24, 0.78, -0.16, 0.32, 0.22, 0.32);      // xôi gấc đỏ
      for (let k = 0; k < 3; k++) P('cyl', 0xf3c6b8, 0.08 + k * 0.1, 0.78, 0.22, 0.12, 0.04, 0.12);   // giò chả
      for (let k = 0; k < 4; k++) P('box', 0xc87a2a, -0.3 + k * 0.08, 0.8, 0.26, 0.06, 0.05, 0.2, 0.3);  // nem rán
      P('cyl', 0xffffff, 0.34, 0.78, 0.12, 0.26, 0.11, 0.26);        // bát canh
      P('ball', 0x7cc06a, 0.34, 0.85, 0.12, 0.2, 0.06, 0.2);         // nước canh rau
      P('ball', 0x5aa848, -0.02, 0.78, 0.02, 0.26, 0.1, 0.26);       // đĩa rau thơm
      P('ball', 0xf2a03a, 0.02, 0.78, -0.36, 0.14, 0.14, 0.14);      // cam
      P('ball', 0xd8342a, 0.13, 0.78, -0.33, 0.12, 0.12, 0.12);      // táo
      for (let k = 0; k < SEATS_PER; k++){
        const a = (k + 0.5) / SEATS_PER * Math.PI * 2, cx = Math.cos(a), cz = Math.sin(a);
        P('cyl', 0xffffff, cx * 0.72, 0.75, cz * 0.72, 0.17, 0.07, 0.17);               // bát cơm
        P('box', 0x8a5a2a, cx * 0.62 - cz * 0.1, 0.77, cz * 0.62 + cx * 0.1, 0.02, 0.02, 0.26, -a);   // đũa
        P('chair', 0xd8ac5a, cx * SEAT_R, 0, cz * SEAT_R, 1, 1, 1, Math.atan2(-cx, -cz));   // ghế gỗ thếp vàng, đệm đỏ
      }
      for (let k = 0; k < 8; k++){                                   // chai bia xanh nắp vàng, ẩn tới khi có người gọi
        const a = k / 8 * Math.PI * 2 + 0.2, x = t.x + Math.cos(a) * 0.5, z = t.z + Math.sin(a) * 0.5;
        for (const [c, y, w, h] of [[0x2f7a3a, 0.75, 0.1, 0.24], [0x2f7a3a, 0.99, 0.045, 0.1], [0xe8b83a, 1.09, 0.05, 0.02]] as const){
          const mm = mat(x, y, z, w, h, w); bottles.push([glass, glass.add(HIDE, c), mm]);
        }
      }
      // món gọi thêm: tôm hùm, cá hấp, nồi lẩu, bò xào; mỗi món một đĩa, đặt quanh mâm
      const dishes: [Batch, number, THREE.Matrix4][][] = [];
      const D = (out: [Batch, number, THREE.Matrix4][], k: keyof typeof tb, c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number) => { const mm = mat(t.x + x, y, t.z + z, sx, sy, sz); out.push([tb[k], tb[k].add(HIDE, c), mm]); };
      for (let k = 0; k < 4; k++){
        const a = Math.PI / 4 + k * Math.PI / 2, x = Math.cos(a) * 0.42, z = Math.sin(a) * 0.42, d: [Batch, number, THREE.Matrix4][] = [];
        D(d, 'cyl', 0xffffff, x, 0.78, z, 0.32, 0.02, 0.32);
        if (k === 0){ D(d, 'ball', 0xff5a24, x, 0.79, z, 0.26, 0.12, 0.15); D(d, 'ball', 0xffc04a, x + 0.06, 0.82, z, 0.08, 0.06, 0.08); }
        if (k === 1) D(d, 'ball', 0xd9b27a, x, 0.79, z, 0.3, 0.09, 0.13);
        if (k === 2){ D(d, 'cyl', 0x3a3a40, x, 0.79, z, 0.3, 0.15, 0.3); D(d, 'ball', 0xd8402a, x, 0.9, z, 0.27, 0.05, 0.27); D(d, 'ball', 0x7cc06a, x + 0.05, 0.93, z, 0.1, 0.03, 0.1); }
        if (k === 3){ D(d, 'ball', 0x8a3a22, x, 0.79, z, 0.24, 0.09, 0.24); D(d, 'ball', 0x5aa848, x - 0.04, 0.84, z + 0.03, 0.09, 0.05, 0.09); }
        dishes.push(d);
      }
      for (const [b, idx] of parts) b.set(idx, HIDE);                 // mâm chưa kê thì ẩn
      this.tables.push({ parts, bottles, dishes, on: false, beer: 0, food: 0 });
    });
    this.tableBatches = [...Object.values(tb), glass];
    this.setTables(2);
  }
  private tableBatches: Batch[] = [];

  // Kê đủ n mâm đầu tiên, các mâm sau dọn đi
  setTables(n: number){
    this.shown = n;
    this.tables.forEach((t, i) => {
      const on = i < n;
      if (on !== t.on){ t.on = on; for (const [b, idx, m] of t.parts) b.set(idx, on ? m : HIDE); }
      this.bottlesOf(i);
    });
    for (const b of this.tableBatches) b.flush();
  }
  get tableCount(){ return this.shown; }
  // Gọi bia: thêm một chai lên mâm (tối đa 8 chai một mâm). Trả về vị trí mâm để bắn hiệu ứng.
  addBeer(i: number){
    const t = this.tables[i];
    if (!t) return null;
    t.beer = Math.min(8, t.beer + 1); this.bottlesOf(i);
    for (const b of this.tableBatches) b.flush();
    return MAM[i];
  }
  // Gọi món: bưng thêm một món ra mâm (tối đa 4 món)
  addFood(i: number){
    const t = this.tables[i];
    if (!t) return null;
    t.food = Math.min(4, t.food + 1); this.bottlesOf(i);
    for (const b of this.tableBatches) b.flush();
    return MAM[i];
  }
  // đám mới: dọn bia và món gọi thêm
  clearOrders(){ this.tables.forEach((t, i) => { t.beer = 0; t.food = 0; this.bottlesOf(i); }); for (const b of this.tableBatches) b.flush(); }
  private bottlesOf(i: number){
    const t = this.tables[i];
    t.bottles.forEach(([b, idx, m], k) => b.set(idx, t.on && Math.floor(k / 3) < t.beer ? m : HIDE));
    t.dishes.forEach((d, k) => { for (const [b, idx, m] of d) b.set(idx, t.on && k < t.food ? m : HIDE); });
  }

  // Trống cái sơn đỏ trên giá gỗ cạnh ban nhạc
  private band(){
    this.put('box', WOOD_D, 8.6, 0, 4.2, 1.6, 0.5, 1.2);
    const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.78, 1.1, 28), new THREE.MeshStandardMaterial({ color: 0xc81e24, roughness: 0.5 }));
    drum.position.set(8.6, 1.25, 4.2); drum.rotation.z = Math.PI / 2; drum.rotation.y = -0.4; drum.castShadow = true;
    const skin = new THREE.Mesh(new THREE.CircleGeometry(0.72, 28), new THREE.MeshStandardMaterial({ color: 0xf0d9a8, roughness: 0.8 }));
    skin.position.set(8.6 + 0.52 * Math.cos(0.4), 1.25, 4.2 + 0.52 * Math.sin(0.4)); skin.rotation.y = Math.PI / 2 - 0.4;
    this.group.add(drum, skin);
    this.put('cyl', GOLD, 8.6, 0.5, 4.2, 1.65, 0.04, 1.65);
  }

  private newPetal(anyHeight: boolean){
    return { x: (Math.random() - 0.5) * 22, y: anyHeight ? Math.random() * 9 : 9 + Math.random() * 2, z: -2 + Math.random() * 18,
      vx: 0.2 + Math.random() * 0.3, vy: -(0.5 + Math.random() * 0.5), rot: Math.random() * 6, spin: 1 + Math.random() * 3 };
  }

  // glow: 0 ban ngày .. 1 đêm (lớn hơn 1 khi ăn mừng quà lớn)
  setGlow(glow: number, t: number, party: boolean){
    this.silk.emissiveIntensity = 0.15 + glow * 2.4;
    this.haloMat.opacity = Math.min(0.5, glow * 0.45); (this.lanternGlow.material as THREE.MeshBasicMaterial).opacity = Math.min(0.6, glow * 0.55);
    const k = 0.5 + glow * 1.3;
    this.bulbMat.color.setRGB(1.0 * k, 0.82 * k, 0.5 * k);
    if (party) this.bulbMat.color.setHSL((t * 0.6) % 1, 0.9, 0.5 + glow * 0.2).multiplyScalar(2);
  }
  update(dt: number, t: number, burst = 0){
    const m = new THREE.Matrix4();
    for (let i = 0; i < this.petalState.length; i++){
      const p = this.petalState[i];
      p.x += (p.vx + Math.sin(t * 1.3 + i) * 0.3) * dt; p.y += p.vy * dt * (1 + burst); p.rot += p.spin * dt;
      if (p.y < 0.02) this.petalState[i] = this.newPetal(false);
      this.petals.setMatrixAt(i, mat(p.x, Math.max(0.02, p.y), p.z, 1, 1, 1, p.rot, p.rot * 0.7, p.rot * 0.4, m));
    }
    this.petals.instanceMatrix.needsUpdate = true;
    for (const d of this.drapes){
      const pos = d.mesh.geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++){ const by = d.base[i * 3 + 1]; pos.setZ(i, d.base[i * 3 + 2] + Math.sin(t * 1.6 + by * 1.4) * 0.06 * (4.3 - by) / 4); }
      pos.needsUpdate = true;
    }
  }
}

function seeded(seed: number){ return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }



// Khăn trải bàn tròn: mặt bàn phẳng, mép bo tròn, rủ thẳng xuống sát đất thành nếp gợn
function clothGeo(){
  const prof: [number, number][] = [[0, 0.76], [0.92, 0.76], [0.99, 0.745], [1.02, 0.7], [1.04, 0.4], [1.07, 0.02], [1.08, 0]];
  const g = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 72), p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++){
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z);
    if (r < 0.98) continue;
    const a = Math.atan2(z, x), k = 1 + Math.sin(a * 22) * 0.025 * (1 - y / 0.76);
    p.setX(i, x * k); p.setZ(i, z * k);
  }
  g.computeVertexNormals(); return g;
}
// Ghế gỗ tựa lưng song tiện, mặt trước hướng +z
function chairGeo(){
  const parts: THREE.BufferGeometry[] = [new THREE.BoxGeometry(0.44, 0.05, 0.42).translate(0, 0.46, 0)];
  for (const [x, z] of [[-0.19, -0.18], [0.19, -0.18], [-0.19, 0.18], [0.19, 0.18]]) parts.push(new THREE.CylinderGeometry(0.018, 0.016, 0.46, 8).translate(x, 0.23, z));
  for (const x of [-0.19, 0.19]) parts.push(new THREE.CylinderGeometry(0.018, 0.018, 0.52, 8).translate(x, 0.74, -0.19));
  for (const y of [0.62, 0.78, 0.96]) parts.push(new THREE.CylinderGeometry(0.012, 0.012, 0.38, 6).rotateZ(Math.PI / 2).translate(0, y, -0.19));
  for (const x of [-0.12, -0.04, 0.04, 0.12]) parts.push(new THREE.CylinderGeometry(0.008, 0.008, 0.34, 5).translate(x, 0.79, -0.19));
  parts.push(new THREE.BoxGeometry(0.4, 0.04, 0.38).translate(0, 0.505, 0.005));      // đệm ngồi
  return mergeGeometries(parts.map(g => g.toNonIndexed()));
}
