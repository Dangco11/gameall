import * as THREE from 'three';
import { PROJECTS } from '../shared/balance.ts';
import type { ProjectKey } from '../shared/balance.ts';
import type { ProjectState } from '../shared/types.ts';
import { Batch, GEO, mat } from './batch.ts';
import { C } from './houses.ts';
import type { Kit, Piece } from './kit.ts';
import { BRIDGE, GATE, LOTS, LOT_SIZE, MARKET, PASTURE, POND, POND_R, RIVER_HALF, ROAD_Z, SCHOOL, SQUARE, TEMPLE, WEDDING, laneZ, riverZ } from './layout.ts';
import { swayMaterial, waterMaterial } from './materials.ts';

const SEASON_GRASS = [0x7fae4e, 0x6fa244, 0x9aa64c, 0x8f9a6a];
const ROAD_COLORS = [0xb79868, 0x9a958a, 0xc9c6bd];

function seeded(seed: number){ return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }

// Cảnh tĩnh của làng và các công trình chung (cầu, đường, trường, đình) đổi hình theo cấp xây.
export class World {
  readonly group = new THREE.Group();
  readonly veg: Record<'cone' | 'ball' | 'box' | 'cyl', Batch>;
  readonly lamps: THREE.Vector3[] = [];
  readonly sites: Record<ProjectKey, THREE.Vector3>;
  private kit: Kit;
  private grass: THREE.MeshStandardMaterial;
  private roadPieces: Piece[] = [];
  private projectPieces = new Map<ProjectKey, { stage: number; active: boolean; list: Piece[] }>();
  private blossoms: number[] = [];

  constructor(kit: Kit){
    this.kit = kit;
    const sway = swayMaterial();
    this.veg = { cone: new Batch(GEO.round, sway, 2500), ball: new Batch(GEO.ball, sway, 2500), box: new Batch(GEO.box, sway, 2500), cyl: new Batch(GEO.cyl, sway, 1500) };
    for (const b of Object.values(this.veg)) this.group.add(b.mesh);
    this.sites = {
      bridge: new THREE.Vector3(0, 0, (BRIDGE.south + BRIDGE.north) / 2), road: new THREE.Vector3(0, 0, ROAD_Z + 6),
      school: new THREE.Vector3(SCHOOL.x, 0, SCHOOL.z), temple: new THREE.Vector3(TEMPLE.x, 0, TEMPLE.z),
    };

    this.grass = new THREE.MeshStandardMaterial({ color: SEASON_GRASS[0], roughness: 1 });
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(520, 520).rotateX(-Math.PI / 2), this.grass);
    ground.position.set(0, -0.02, 30); ground.receiveShadow = true;
    this.group.add(ground);

    this.water();
    this.field();
    this.roadsAndLanes();
    this.civic();
    this.trees();
    this.meadow(sway);
    this.applyRoad(0);
  }

  private water(){
    const g = new THREE.PlaneGeometry(560, RIVER_HALF * 2, 140, 1).rotateX(-Math.PI / 2);
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, pos.getZ(i) + riverZ(pos.getX(i)));
    const river = new THREE.Mesh(g, waterMaterial());
    river.position.y = 0.02;
    this.group.add(river);
    const bank = new THREE.Mesh(g.clone().scale(1, 1, 1.35), new THREE.MeshStandardMaterial({ color: 0x9c8a5e, roughness: 1 }));
    bank.position.y = 0.0; bank.receiveShadow = true;
    this.group.add(bank);
    const pond = new THREE.Mesh(new THREE.CircleGeometry(1, 40).rotateX(-Math.PI / 2), waterMaterial(0x2c6460, 0x6a9f8f));
    pond.scale.set(POND_R.x, 1, POND_R.z); pond.position.set(POND.x, 0.03, POND.z);
    this.group.add(pond);
    this.kit.put(null, 'cyl', 0x8f7c52, POND.x, 0, POND.z, POND_R.x * 2 + 2, 0.02, POND_R.z * 2 + 2);
    // ao chung khu chăn nuôi
    const duck = pond.clone(); duck.scale.set(9, 1, 5); duck.position.set(PASTURE.x + 4, 0.03, PASTURE.z + 4);
    this.group.add(duck);
  }

  private field(){
    const k = this.kit;
    k.put(null, 'box', 0x8f8a52, 0, -0.01, -74, 200, 0.02, 70);
    // bờ ruộng: lưới bờ đất giữa các thửa
    for (let c = 0; c <= 30; c++) k.put(null, 'box', 0x8a7448, (c - 15) * 6.5, 0, -74.5, 0.7, 0.18, 66);
    for (let r = 0; r <= 10; r++) k.put(null, 'box', 0x8a7448, 0, 0, -42.25 - r * 6.5, 196, 0.18, 0.7);
    k.put(null, 'box', 0xb59d6c, 0, 0.01, -42, 200, 0.05, 1.6);
    // đống rơm, chòi canh ruộng
    const rnd = seeded(11);
    for (let i = 0; i < 10; i++){ const x = -95 + rnd() * 190, z = -108 - rnd() * 6; k.put(null, 'round', C.thatch, x, 0, z, 2.2, 2.6, 2.2); }
    for (const x of [-60, 55]){
      for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) k.put(null, 'cyl', C.bamboo, x + dx, 0, -110 + dz, 0.15, 2.6, 0.15);
      k.put(null, 'box', C.bamboo, x, 1.4, -110, 2.4, 0.15, 2.4); k.put(null, 'prism', C.thatch, x, 2.6, -110, 3, 1.2, 3);
    }
  }

  private roadsAndLanes(){
    const k = this.kit, list = this.roadPieces;
    const road = (x: number, z: number, w: number, d: number) => k.put(list, 'box', ROAD_COLORS[0], x, 0, z, w, 0.06, d);
    road(0, (BRIDGE.south + 190) / 2, 4.4, 190 - BRIDGE.south);
    road(-14.5, ROAD_Z, 201, 4);                         // dừng ở x = 86, góc đông dành cho sân cưới
    const lanes = new Set<number>();
    for (const l of LOTS) lanes.add(Math.round(laneZ(l) * 10) / 10);
    for (const z of lanes) road(0, z, 210, 1.3);
    // đèn đường dọc lối chính
    for (let z = ROAD_Z + 12; z < 190; z += 20) for (const s of [-1, 1]) this.lamp(s * 3.2, z);
    for (let x = -100; x <= 100; x += 20) if (x && x < 84) this.lamp(x, ROAD_Z - 2.6);   // chừa góc đông cho sân cưới
  }

  lamp(x: number, z: number, h = 2.6){
    this.kit.put(null, 'cyl', 0x3d3a36, x, 0, z, 0.12, h, 0.12);
    this.kit.put(null, 'box', 0x3d3a36, x, h, z, 0.5, 0.08, 0.5);
    this.kit.put(null, 'glow', 0, x, h - 0.45, z, 0.32, 0.42, 0.32);
    this.lamps.push(new THREE.Vector3(x, h - 0.25, z));
  }

  private civic(){
    const k = this.kit, put = (s: Parameters<Kit['put']>[1], c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0) => k.put(null, s, c, x, y, z, sx, sy, sz, ry);
    // Cổng làng
    for (const s of [-1, 1]){ put('box', C.cream, GATE.x + s * 3.4, 0, GATE.z, 1.1, 4.4, 1.1); put('prism', C.tile, GATE.x + s * 3.4, 4.4, GATE.z, 1.6, 0.6, 1.6); }
    put('box', C.cream, GATE.x, 3.6, GATE.z, 7.8, 1.2, 0.8); put('prism', C.tile, GATE.x, 4.8, GATE.z, 9, 1, 1.6);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 1), new THREE.MeshBasicMaterial({ map: textTexture('LÀNG QUÊ', '#7a1d12', '#f6e7b6'), toneMapped: false }));
    sign.position.set(GATE.x, 4.2, GATE.z + 0.42);
    this.group.add(sign);

    // Chợ phiên: hai dãy sạp mái bạt màu, hàng hóa trên sạp
    const awn = [0xd2553a, 0x3f7fa5, 0xe2a83a, 0x5a9a58, 0xc8608f];
    const goods = [0xe8c25a, 0x7fb04d, 0xf2efe6, 0xd9773b, 0x9fc4d6];
    for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++){
      const x = MARKET.x - 12 + i * 6, z = MARKET.z - 4 + r * 8;
      put('box', C.wood, x, 0, z, 3.6, 0.9, 1.8);
      for (const [dx, dz] of [[-1.8, -0.9], [1.8, -0.9], [-1.8, 0.9], [1.8, 0.9]]) put('cyl', C.woodDark, x + dx, 0, z + dz, 0.12, 2.4, 0.12);
      put('prism', awn[(i + r * 2) % 5], x, 2.4, z, 4.2, 0.7, 2.6);
      for (let g = 0; g < 3; g++) put('ball', goods[(i + g) % 5], x - 1 + g, 0.9, z, 0.6, 0.45, 0.6);
    }
    put('box', 0xc2a878, MARKET.x, 0.005, MARKET.z, 34, 0.03, 18);
    this.lamp(MARKET.x - 16, MARKET.z + 8); this.lamp(MARKET.x + 16, MARKET.z + 8);

    // Sân hội và cây đa đầu làng
    put('box', 0xc78f6b, SQUARE.x, 0.005, SQUARE.z, 30, 0.04, 14);
    for (let i = 0; i < 12; i++){
      const x = SQUARE.x - 15 + i * (30 / 11);
      put('cyl', C.woodDark, x, 0, SQUARE.z - 7.2, 0.1, 3, 0.1);
      put('box', [C.red, C.gold, 0x3f7fa5, 0x5a9a58][i % 4], x + 0.6, 2.4, SQUARE.z - 7.2, 0.6, 0.6, 0.04);
    }
    put('cyl', 0x6b5236, SQUARE.x + 18, 0, SQUARE.z - 2, 1.6, 4, 1.6);
    for (const [dx, dz, s] of [[0, 0, 7], [-2.5, 1.5, 5], [2.4, -1, 5.5], [0.5, 2.5, 4.5]]) this.veg.ball.add(mat(SQUARE.x + 18 + dx, 3.2, SQUARE.z - 2 + dz, s, s * 0.7, s), C.leafDark);
    this.lamp(SQUARE.x - 15, SQUARE.z + 7.5); this.lamp(SQUARE.x + 15, SQUARE.z + 7.5);

    // Khu chăn nuôi chung: bãi cỏ rào tre, chuồng trâu
    put('box', 0x8fbf5a, PASTURE.x, 0.005, PASTURE.z, 30, 0.03, 22);
    for (let i = 0; i <= 15; i++) for (const z of [PASTURE.z - 11, PASTURE.z + 11]) put('cyl', C.bamboo, PASTURE.x - 15 + i * 2, 0, z, 0.1, 1, 0.1);
    put('box', C.bamboo, PASTURE.x, 0.7, PASTURE.z - 11, 30, 0.08, 0.06); put('box', C.bamboo, PASTURE.x, 0.7, PASTURE.z + 11, 30, 0.08, 0.06);
    put('box', C.wood, PASTURE.x - 9, 0, PASTURE.z - 6, 6, 2.2, 4); put('prism', C.thatch, PASTURE.x - 9, 2.2, PASTURE.z - 6, 7, 1.5, 5);
  }

  private trees(){
    const rnd = seeded(5), v = this.veg;
    const bamboo = (x: number, z: number) => {
      for (let i = 0; i < 6; i++){
        const dx = (rnd() - 0.5) * 2.2, dz = (rnd() - 0.5) * 2.2, h = 6 + rnd() * 3;
        v.cyl.add(mat(x + dx, 0, z + dz, 0.16, h, 0.16, 0, (rnd() - 0.5) * 0.2, (rnd() - 0.5) * 0.25), 0x8fae4a);
      }
      v.cone.add(mat(x, 3.5, z, 4, 6.5, 4), 0x5f9640);
    };
    // lũy tre bao quanh làng
    for (let z = 20; z < 195; z += 7){ bamboo(-112 + rnd() * 2, z); bamboo(112 - rnd() * 2, z); }
    for (let x = -108; x <= 108; x += 7) bamboo(x, 197 + rnd() * 2);
    for (let x = -140; x <= 140; x += 9) if (Math.abs(x) > 12) bamboo(x, riverZ(x) - RIVER_HALF - 2.5);
    // chuối và cau giữa các lô, xen hoa mùa xuân
    for (const l of LOTS){
      if (rnd() < 0.55){
        const x = l.x + (rnd() < 0.5 ? -5.2 : 5.2), z = l.z - 4.4;
        v.cyl.add(mat(x, 0, z, 0.3, 2, 0.3), 0x8e9a5a);
        for (let i = 0; i < 5; i++) v.box.add(mat(x, 2, z, 1.8, 0.06, 0.55, i * 1.25, 0, 0.5), C.leaf);
      }
      if (rnd() < 0.25) this.blossoms.push(v.ball.add(mat(l.x + (rnd() - 0.5) * 8, 0.3, l.z - 4.6, 1.7, 2.6, 1.7), 0x5e9a44));
    }
    // cây dọc đường ngang
    for (let x = -105; x <= 105; x += 10){ if (Math.abs(x) < 6 || x + 5 > 84) continue; v.cyl.add(mat(x + 5, 0, ROAD_Z - 4, 0.35, 2.6, 0.35), 0x6b5236); this.blossoms.push(v.ball.add(mat(x + 5, 2.2, ROAD_Z - 4, 3, 2.6, 3), C.leaf)); }
  }

  // Cỏ và hoa dại rải trên bãi cỏ, tránh đường, sân, ruộng, sông, các khu chung; lay theo gió như lúa.
  private meadow(sway: THREE.Material){
    const rnd = seeded(23);
    const grass = new Batch(new THREE.ConeGeometry(0.16, 1, 5, 1).translate(0, 0.5, 0), sway, 3200, false);
    const flowers = new Batch(new THREE.IcosahedronGeometry(0.5, 0).translate(0, 0.5, 0), sway, 900, false);
    this.group.add(grass.mesh, flowers.mesh);
    const zones: [number, number, number, number][] = [[MARKET.x, MARKET.z, 18, 10], [SCHOOL.x, SCHOOL.z, 12, 9], [PASTURE.x, PASTURE.z, 16, 12], [TEMPLE.x, TEMPLE.z + 6, 16, 16],
      [POND.x, POND.z, POND_R.x + 2, POND_R.z + 2], [WEDDING.x + 2, WEDDING.z + 4, 22, 22], [GATE.x, GATE.z, 6, 3]];
    const blocked = (x: number, z: number) => Math.abs(x) < 3.5 || Math.abs(z - ROAD_Z) < 2.6 || z < riverZ(x) + RIVER_HALF + 1.5
      || zones.some(([cx, cz, rx, rz]) => Math.abs(x - cx) < rx && Math.abs(z - cz) < rz)
      || LOTS.some(l => Math.abs(x - l.x) < LOT_SIZE.w / 2 - 0.2 && Math.abs(z - l.z) < LOT_SIZE.d / 2 - 0.2)
      || LOTS.some(l => Math.abs(z - laneZ(l)) < 0.9 && Math.abs(x) < 105);
    const greens = [0x5f9a3c, 0x6fae48, 0x82b850, 0x4d8a34], petals = [0xffffff, 0xffe14d, 0xff9ec4, 0xc79bff, 0xff7a5a];
    let g = 0, f = 0;
    for (let n = 0; n < 20000 && (g < 3200 || f < 900); n++){
      const x = -125 + rnd() * 250, z = -22 + rnd() * 222;
      if (blocked(x, z)) continue;
      if (g < 3200){
        const h = 0.35 + rnd() * 0.45;
        for (let k = 0; k < 3 && g < 3200; k++, g++)
          grass.add(mat(x + (rnd() - 0.5) * 0.35, 0, z + (rnd() - 0.5) * 0.35, 1, h * (0.8 + rnd() * 0.4), 1, 0, (rnd() - 0.5) * 0.4, (rnd() - 0.5) * 0.4), greens[Math.floor(rnd() * greens.length)]);
      }
      if (f < 900 && rnd() < 0.35){ const s = 0.16 + rnd() * 0.1; flowers.add(mat(x + 0.3, 0.32, z + 0.2, s, s * 0.8, s), petals[Math.floor(rnd() * petals.length)]); f++; }
    }
    grass.flush(); flowers.flush();
  }

  setSeason(season: number){
    this.grass.color.set(SEASON_GRASS[season] ?? SEASON_GRASS[0]);
    const tint = [0xf2a6b8, C.leaf, 0xd99a3a, 0x7d8f63][season] ?? C.leaf;
    this.blossoms.forEach((i, n) => this.veg.ball.color(i, n % 3 === 0 || season === 2 ? tint : season === 3 ? 0x6e865a : C.leaf));
  }

  private applyRoad(stage: number){
    for (const p of this.roadPieces) this.kit.recolor(p, ROAD_COLORS[Math.min(stage, 2)]);
  }

  // Dựng công trình theo cấp đã xây; công trình đang xây có giàn giáo tre.
  updateProjects(list: ProjectState[], active: ProjectKey | null){
    for (const b of list){
      const prev = this.projectPieces.get(b.key), isActive = b.key === active;
      if (prev && prev.stage === b.stage && prev.active === isActive) continue;
      const pieces = prev?.list ?? [];
      this.kit.clear(pieces);
      this.projectPieces.set(b.key, { stage: b.stage, active: isActive, list: pieces });
      const put = (s: Parameters<Kit['put']>[1], c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0, rx = 0, rz = 0) => this.kit.put(pieces, s, c, x, y, z, sx, sy, sz, ry, rx, rz);
      if (b.key === 'bridge') bridge(put, b.stage);
      if (b.key === 'road') this.applyRoad(b.stage);
      if (b.key === 'school') school(put, b.stage);
      if (b.key === 'temple') temple(put, b.stage);
      if (isActive && b.stage < PROJECTS[b.key].stages.length){
        const s = this.sites[b.key];
        for (let i = 0; i < 6; i++){
          const a = i / 6 * Math.PI * 2, x = s.x + Math.cos(a) * 5, z = s.z + Math.sin(a) * 3.5;
          put('cyl', C.bamboo, x, 0, z, 0.12, 5, 0.12);
        }
        put('box', C.bamboo, s.x, 2.5, s.z - 3.5, 10, 0.1, 0.1); put('box', C.bamboo, s.x, 4.2, s.z + 3.5, 10, 0.1, 0.1);
        for (let i = 0; i < 4; i++) put('box', [C.wood, C.brick][i % 2], s.x - 6 + i * 0.8, 0, s.z + 4.5, 0.7, 0.35 + i * 0.1, 1.2);
      }
    }
  }
}

type P = (s: Parameters<Kit['put']>[1], c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry?: number, rx?: number, rz?: number) => void;

function bridge(put: P, stage: number){
  const z0 = BRIDGE.south, z1 = BRIDGE.north, len = z0 - z1, mid = (z0 + z1) / 2;
  if (stage === 0){
    // cầu khỉ: một cây tre và tay vịn
    put('box', C.bamboo, 0, 1, mid, 0.35, 0.12, len);
    put('box', C.bamboo, 0.5, 1.9, mid, 0.08, 0.08, len);
    for (let i = 0; i <= 4; i++) put('cyl', C.bamboo, 0, 0, z1 + i * len / 4, 0.1, 2, 0.1, 0, 0, 0.3);
    return;
  }
  const deck = stage === 1 ? C.bamboo : stage === 2 ? C.wood : C.stone, w = stage === 3 ? 6 : 4;
  for (let i = 0; i < 8; i++){
    const t = (i + 0.5) / 8, y = 0.6 + Math.sin(t * Math.PI) * (stage === 3 ? 1.6 : 0.8);
    put('box', deck, 0, y, z1 + t * len, w, 0.3, len / 8 + 0.05, 0, Math.cos(t * Math.PI) * (stage === 3 ? 0.35 : 0.18));
    for (const s of [-1, 1]) put('box', stage === 3 ? C.plaster : C.woodDark, s * (w / 2 - 0.1), y + 0.2, z1 + t * len, 0.15, 0.8, len / 8, 0, Math.cos(t * Math.PI) * (stage === 3 ? 0.35 : 0.18));
  }
  for (let i = 1; i < 4; i++) for (const s of [-1, 1]) put(stage === 3 ? 'box' : 'cyl', stage === 3 ? C.stone : C.woodDark, s * (w / 2 - 0.4), -0.5, z1 + i * len / 4, 0.5, 1.4, 0.5);
}

function school(put: P, stage: number){
  const { x, z } = SCHOOL;
  put('box', 0xd8c9a0, x, 0.005, z + 1, 22, 0.03, 16);
  put('cyl', C.stone, x + 8, 0, z + 6, 0.12, 6, 0.12); put('box', C.red, x + 8.8, 5, z + 6, 1.4, 0.9, 0.04);
  if (stage === 0){ for (let i = 0; i < 4; i++) put('box', C.stone, x - 6 + i * 4, 0, z - 2, 3, 0.4, 0.4); return; }
  const wall = stage === 1 ? C.bamboo : C.yellow, roofC = stage === 1 ? C.thatch : C.tile;
  put('box', wall, x, 0, z - 2, 16, 2.6, 5);
  for (let i = 0; i < 5; i++) put('glow', 0, x - 6 + i * 3, 1, z + 0.52, 1, 0.9, 0.05);
  put('box', C.woodDark, x, 0, z + 0.55, 16, 0.25, 1.2);
  if (stage >= 3){
    put('box', C.plaster, x, 2.6, z - 1.6, 17, 0.25, 6.2);
    put('box', wall, x, 2.85, z - 2, 16, 2.6, 5);
    for (let i = 0; i < 5; i++) put('glow', 0, x - 6 + i * 3, 3.85, z + 0.52, 1, 0.9, 0.05);
    put('prism', roofC, x, 5.45, z - 2, 17.4, 2, 6.6);
  } else put('prism', roofC, x, 2.6, z - 2, 17.4, 2, 6.6);
}

function temple(put: P, stage: number){
  const { x, z } = TEMPLE;
  const old = stage === 0, roofC = stage <= 1 ? 0x7a6a5a : C.tile, wood = old ? 0x6a5a4a : C.woodDark;
  put('box', C.stone, x, 0, z, 18, 0.6, 9);
  put('box', stage >= 3 ? C.yellow : old ? 0xb9ad94 : C.cream, x, 0.6, z - 0.5, 14, 3.2, 6);
  for (let i = 0; i < 7; i++) put('cyl', wood, x - 7.2 + i * 2.4, 0.6, z + 3.1, 0.4, 3.4, 0.4);
  for (let i = 0; i < 3; i++) put('box', C.red, x - 3 + i * 3, 0.6, z + 2.52, 1.6, 2.4, 0.05);
  put('prism', roofC, x, 3.8, z, 19, 3, 10);
  put('box', stage >= 2 ? C.tileDark : 0x5e5246, x, 6.7, z, 18, 0.4, 0.5);
  for (const s of [-1, 1]) put('cone', stage >= 2 ? C.tileDark : 0x5e5246, x + s * 9.4, 6.2, z, 0.5, 1.6, 0.5, 0, 0, -s * 0.7);
  if (stage >= 3){
    for (const s of [-1, 1]) put('box', C.gold, x + s * 3, 7, z, 2.4, 0.5, 0.3, 0, 0, s * 0.3);
    put('ball', C.red, x, 6.9, z, 1, 1, 1);
  }
  if (stage >= 1) for (const s of [-1, 1]) put('box', C.cream, x + s * 6, 0, z + 7.6, 1, 3.2, 1);
}

export function textTexture(text: string, bg: string, fg: string){
  const c = document.createElement('canvas'); c.width = 512; c.height = 96;
  const g = c.getContext('2d')!;
  g.fillStyle = bg; g.fillRect(0, 0, 512, 96);
  g.strokeStyle = fg; g.lineWidth = 4; g.strokeRect(8, 8, 496, 80);
  g.fillStyle = fg; g.font = 'bold 56px "Be Vietnam Pro", system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 256, 52);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
