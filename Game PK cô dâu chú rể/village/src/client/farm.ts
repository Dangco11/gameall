import * as THREE from 'three';
import type { PubPlayer } from '../shared/types.ts';
import { Batch, GEO, mat } from './batch.ts';
import { IN_LOT, LOTS, PASTURE, PLOTS, PLOT_SIZE, POND, POND_R, at, riverZ } from './layout.ts';
import { swayMaterial, waterMaterial } from './materials.ts';

const CLUMPS = 4;                                         // 4x4 khóm lúa mỗi thửa
const SOIL = { fallow: 0x9a8257, plowed: 0x5e4630, wet: 0x55704f, ripe: 0x8c7a3e };
const RICE_GREEN = new THREE.Color(0x7dc04a), RICE_YOUNG = new THREE.Color(0x9fd86a), RICE_GOLD = new THREE.Color(0xe2bd3e);
const _c = new THREE.Color(), _m = new THREE.Matrix4();

// Ruộng, ao, chuồng của từng cư dân, cộng cá và vịt thả tự do cho làng có sức sống.
export class FarmLayer {
  readonly group = new THREE.Group();
  private tiles: Batch;
  private rice: THREE.InstancedMesh;
  private ponds: THREE.InstancedMesh;
  private fish: THREE.InstancedMesh;
  private birds: THREE.InstancedMesh;
  private heads: THREE.InstancedMesh;
  private eggs: Batch;
  private buffalo: THREE.InstancedMesh;
  private tileIds = new Map<number, number>();
  private state = new Map<number, PubPlayer>();
  private eggIds = new Map<number, number[]>();
  private riceKey = new Map<number, string>();

  constructor(){
    const solid = new THREE.MeshStandardMaterial({ roughness: 0.9, flatShading: true });
    this.tiles = new Batch(GEO.box, solid, PLOTS.length, false);
    // khóm lúa: chùm lá nhọn, gốc ở y = 0
    const blade = new THREE.ConeGeometry(0.28, 1, 5, 1).translate(0, 0.5, 0);
    this.rice = new THREE.InstancedMesh(blade, swayMaterial(), PLOTS.length * CLUMPS * CLUMPS);
    this.rice.frustumCulled = false; this.rice.castShadow = false; this.rice.receiveShadow = true;
    this.rice.setColorAt(0, RICE_GREEN);
    for (let i = 0; i < this.rice.count; i++) this.rice.setMatrixAt(i, _m.makeScale(0, 0, 0));

    this.ponds = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 20).rotateX(-Math.PI / 2), waterMaterial(0x46807c, 0x8cc0ae), LOTS.length);
    this.ponds.count = 0; this.ponds.frustumCulled = false;

    const fishGeo = new THREE.BoxGeometry(0.42, 0.1, 0.16);
    this.fish = new THREE.InstancedMesh(fishGeo, new THREE.MeshBasicMaterial(), 9 * LOTS.length + 120);
    this.fish.frustumCulled = false;
    const birdGeo = new THREE.IcosahedronGeometry(0.22, 0).scale(1.25, 0.95, 1).translate(0, 0.2, 0);
    this.birds = new THREE.InstancedMesh(birdGeo, solid, 6 * LOTS.length + 80);
    this.heads = new THREE.InstancedMesh(new THREE.BoxGeometry(0.14, 0.16, 0.14), solid, 6 * LOTS.length + 80);
    for (const m of [this.birds, this.heads]){ m.frustumCulled = false; m.castShadow = true; }
    this.eggs = new Batch(new THREE.SphereGeometry(0.07, 6, 4).scale(1, 1.3, 1), solid, LOTS.length * 6, false);
    const buffaloGeo = new THREE.BoxGeometry(2, 1.1, 0.9).translate(0, 1, 0);
    this.buffalo = new THREE.InstancedMesh(buffaloGeo, new THREE.MeshStandardMaterial({ color: 0x4a4440, roughness: 1, flatShading: true }), 5);
    this.buffalo.castShadow = true;
    this.group.add(this.tiles.mesh, this.rice, this.ponds, this.fish, this.birds, this.heads, this.eggs.mesh, this.buffalo);
    for (let i = 0; i < PLOTS.length; i++) this.tileIds.set(i, -1);
  }

  update(lots: Map<number, PubPlayer>){
    this.state = lots;
    let n = 0;
    for (const lot of lots.keys()){
      const p = at(LOTS[lot], IN_LOT.pond);
      this.ponds.setMatrixAt(n++, mat(p.x, 0.06, p.z, 1.6, 1, 1.15, 0, 0, 0, _m));
    }
    this.ponds.count = n; this.ponds.instanceMatrix.needsUpdate = true;
    for (let lot = 0; lot < PLOTS.length; lot++) this.updatePlot(lot, lots.get(lot));
    this.tiles.flush(); this.eggs.flush();
    this.rice.instanceMatrix.needsUpdate = true;
    if (this.rice.instanceColor) this.rice.instanceColor.needsUpdate = true;
  }

  private updatePlot(lot: number, p: PubPlayer | undefined){
    const plot = PLOTS[lot];
    const r = p?.rice, key = p ? `${r!.stage}|${Math.round(r!.progress * 20)}|${r!.water}` : '';
    if (this.riceKey.get(lot) !== key){
      this.riceKey.set(lot, key);
      let tid = this.tileIds.get(lot)!;
      if (!p){ if (tid >= 0){ this.tiles.remove(tid); this.tileIds.set(lot, -1); } }
      else {
        const soil = r!.stage === 'fallow' ? SOIL.fallow : r!.stage === 'plowed' ? (r!.water ? SOIL.wet : SOIL.plowed) : r!.stage === 'ripe' ? SOIL.ripe : r!.water ? SOIL.wet : SOIL.plowed;
        if (tid < 0){ tid = this.tiles.add(mat(plot.x, 0, plot.z, PLOT_SIZE, 0.08, PLOT_SIZE), soil); this.tileIds.set(lot, tid); }
        else this.tiles.color(tid, soil);
      }
      const show = !!p && (r!.stage === 'growing' || r!.stage === 'ripe');
      const g = show ? (r!.stage === 'ripe' ? 1 : r!.progress) : 0;
      const h = 0.25 + g * 1.05, w = 0.6 + g * 0.6;
      _c.copy(RICE_YOUNG).lerp(RICE_GREEN, Math.min(1, g * 1.6));
      if (g > 0.75) _c.lerp(RICE_GOLD, (g - 0.75) * 4);
      for (let i = 0; i < CLUMPS * CLUMPS; i++){
        const idx = lot * CLUMPS * CLUMPS + i, cx = (i % CLUMPS + 0.5) / CLUMPS - 0.5, cz = (Math.floor(i / CLUMPS) + 0.5) / CLUMPS - 0.5;
        this.rice.setMatrixAt(idx, show ? mat(plot.x + cx * PLOT_SIZE * 0.92, 0.06, plot.z + cz * PLOT_SIZE * 0.92, w, h * (0.9 + ((i * 7) % 5) * 0.05), w, i, 0, 0, _m) : _m.makeScale(0, 0, 0));
        this.rice.setColorAt(idx, _c);
      }
      this.rice.count = Math.max(this.rice.count, (lot + 1) * CLUMPS * CLUMPS);
    }
    // trứng trong chuồng
    const want = p ? Math.min(6, p.coop.eggs) : 0, ids = this.eggIds.get(lot) ?? [];
    while (ids.length > want) this.eggs.remove(ids.pop()!);
    if (p) while (ids.length < want){ const c = at(LOTS[lot], IN_LOT.coop), k = ids.length; ids.push(this.eggs.add(mat(c.x + 0.5 + (k % 3) * 0.18, 0.08, c.z - 0.05 + Math.floor(k / 3) * 0.2), 0xf6efe0)); }
    this.eggIds.set(lot, ids);
  }

  // Cá bơi vòng trong ao, gà vịt đi loanh quanh mổ thóc, trâu gặm cỏ. Chỉ tính toán, không tạo vật mới mỗi khung hình.
  animate(t: number){
    let f = 0, b = 0;
    const fishAt = (x: number, z: number, rx: number, rz: number, k: number, color: number) => {
      const a = t * (0.4 + (k % 5) * 0.08) + k * 2.4, wob = Math.sin(t * 3 + k) * 0.15;
      this.fish.setMatrixAt(f, mat(x + Math.cos(a) * rx * (0.5 + (k % 3) * 0.2), 0.04, z + Math.sin(a) * rz * (0.5 + (k % 4) * 0.12), 1, 1, 1, -a - Math.PI / 2 + wob, 0, 0, _m));
      this.fish.setColorAt(f++, _c.set(color));
    };
    const bird = (x: number, z: number, k: number, duck: boolean, range: number) => {
      const a = t * 0.3 + k * 1.7, wx = Math.sin(a + k) * range, wz = Math.sin(a * 1.3 + k * 0.7) * range * 0.6;
      const peck = Math.max(0, Math.sin(t * 4 + k * 3)) > 0.85 ? 0.12 : 0, dir = Math.atan2(Math.cos(a * 1.3 + k * 0.7) * 0.78, Math.cos(a + k));
      const body = duck ? 0xf2f0e8 : [0xb5652d, 0xf3efe2, 0x8a4a22][k % 3];
      this.birds.setMatrixAt(b, mat(x + wx, 0, z + wz, 1, 1, 1, -dir, 0, 0, _m)); this.birds.setColorAt(b, _c.set(body));
      const hx = Math.cos(-dir) * 0.24, hz = -Math.sin(-dir) * 0.24;
      this.heads.setMatrixAt(b, mat(x + wx + hx, 0.42 - peck, z + wz + hz, 1, 1, 1, -dir, 0, 0, _m)); this.heads.setColorAt(b++, _c.set(duck ? 0x3f8f5a : 0xd23a26));
    };
    for (const [lot, p] of this.state){
      const pond = at(LOTS[lot], IN_LOT.pond), coop = at(LOTS[lot], IN_LOT.coop);
      for (let k = 0; k < p.pond.fish; k++) fishAt(pond.x, pond.z, 1.2, 0.8, lot * 9 + k, p.pond.growth > 0.6 ? 0x6b7770 : 0xe28a3a);
      for (let k = 0; k < p.coop.chickens + p.coop.ducks; k++) bird(coop.x - 0.3, coop.z + 0.2, lot * 6 + k, k >= p.coop.chickens, 0.8);
    }
    for (let k = 0; k < 40; k++) fishAt(POND.x, POND.z, POND_R.x * 0.8, POND_R.z * 0.7, k, k % 4 ? 0x6b7770 : 0xe9b04a);
    for (let k = 0; k < 40; k++){ const x = -130 + (k * 6.7 + t * 1.5 * (k % 2 ? 1 : -1)) % 260; fishAt(x, riverZ(x), 2, 1.5, k + 1000, 0x5f6b66); }
    // đàn vịt trên sông và ao chăn nuôi
    for (let k = 0; k < 14; k++){ const x = ((k * 4 + t * 0.8) % 80) - 70; bird(x, riverZ(x) + (k % 3) - 1, k + 3000, true, 0.3); }
    for (let k = 0; k < 12; k++) bird(PASTURE.x + 4, PASTURE.z + 4, k + 4000, true, 3.5);
    for (let k = 0; k < 20; k++) bird(PASTURE.x - 4, PASTURE.z - 2, k + 5000, false, 4);
    this.fish.count = f; this.birds.count = b; this.heads.count = b;
    for (const m of [this.fish, this.birds, this.heads]){ m.instanceMatrix.needsUpdate = true; if (m.instanceColor) m.instanceColor.needsUpdate = true; }
    for (let k = 0; k < 4; k++){
      const a = t * 0.05 + k * 1.6;
      this.buffalo.setMatrixAt(k, mat(PASTURE.x + Math.sin(a) * 8, 0, PASTURE.z + Math.cos(a * 0.7) * 5 - 1, 1, 1, 1, a, 0, 0, _m));
    }
    this.buffalo.instanceMatrix.needsUpdate = true;
  }
}
