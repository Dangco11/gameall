import type { LaneId, TeamKey } from '../types.ts';

// Chiến trường là cả cánh đồng quanh sân cưới (gốc tọa độ ở chân cổng hoa, trục z hướng về camera).
// Sân cưới và đình làng nằm giữa bản đồ; Nhà Trai ở đầu trái (x âm), Nhà Gái ở đầu phải (x dương), cách nhau khoảng 90 m.
// Ba làn ra từ cổng mỗi nhà rồi chạy thẳng ngang đồng (chỉ để chia quân lúc xuất trận; gặp địch là quân tự xông vào đánh):
//   LANE_1 đường chính giữa, đi qua thảm đỏ (z 10,3)
//   LANE_2 phía trong, gần sân khấu (z 5,8)
//   LANE_3 phía ngoài, gần camera (z 15,5)
export interface P { x: number; z: number }
export interface Circle { x: number; z: number; r: number; enemyOf?: TeamKey }   // enemyOf: chỉ chặn quân địch của phe này (cổng)

const BASE_Z = 10.3;
export const BASES: Record<TeamKey, { house: P; gate: P; spawn: P }> = {
  trai: { house: { x: -47.5, z: BASE_Z }, gate: { x: -42.5, z: BASE_Z }, spawn: { x: -44, z: BASE_Z } },
  gai: { house: { x: 47.5, z: BASE_Z }, gate: { x: 42.5, z: BASE_Z }, spawn: { x: 44, z: BASE_Z } },
};
export const FIELD = { minX: -49, maxX: 49, minZ: -10.5, maxZ: 31.5 };
export const HOUSE_HALF = 3.1;                                   // nửa bề ngang nhà chính (để camera căn trọn)
export const LANE_Z: [number, number, number] = [10.3, 5.8, 15.5];  // độ sâu mỗi làn (camera Làn bám theo)
export const LANE_NAMES_SHORT = ['🛣️ Làn 1', '🛣️ Làn 2', '🛣️ Làn 3'];
// sân lát đá quanh đình (phần còn lại là đồng cỏ)
export const COURTYARD = { minX: -17, maxX: 17, minZ: -8, maxZ: 22 };
// hồ nước phía trước bên trái, ngoài chiến trường
export const LAKE = { x: -24, z: 50, r: 14 };

// Đường đi theo chiều Nhà Trai → Nhà Gái; Nhà Gái đi ngược lại cùng đường. Cả ba làn đều ra vào qua cổng căn cứ.
const half: P[][] = [
  [{ x: 44, z: BASE_Z }, { x: 41, z: BASE_Z }],
  [{ x: 44, z: BASE_Z }, { x: 41, z: BASE_Z }, { x: 37, z: 5.8 }],
  [{ x: 44, z: BASE_Z }, { x: 41, z: BASE_Z }, { x: 37, z: 15.5 }],
];
const PATHS: P[][] = half.map(h => [...h.map(p => ({ x: -p.x, z: p.z })), ...[...h].reverse()]);
// Trong trận dọn hết mâm cỗ cho sân thoáng (chỉ số trong MAM của stage.ts); còn lại là vật cản cố định của sân cưới
export const BATTLE_TABLES: number[] = [];
export const OBSTACLES: Circle[] = [
  { x: 8.6, z: 4.2, r: 0.9 }, { x: 7.6, z: 2.8, r: 1.3 }, { x: 0, z: 2.2, r: 1.25 },   // trống cái, ban nhạc, cô dâu chú rể
  { x: -2.1, z: 0, r: 0.5 }, { x: 2.1, z: 0, r: 0.5 },                                   // trụ cổng hoa
  { x: -6, z: -4.2, r: 3.4 }, { x: 0, z: -4.2, r: 3.4 }, { x: 6, z: -4.2, r: 3.4 },     // đình
  { x: -9.2, z: -1.6, r: 2.2 }, { x: 13, z: -3.5, r: 2.6 }, { x: 11, z: 0.3, r: 1.8 },   // cây đa, chòi lá, bụi chuối
  { x: BASES.trai.house.x, z: BASE_Z, r: 3.0 }, { x: BASES.gai.house.x, z: BASE_Z, r: 3.0 },
  { x: BASES.trai.gate.x, z: BASE_Z, r: 1.6, enemyOf: 'trai' }, { x: BASES.gai.gate.x, z: BASE_Z, r: 1.6, enemyOf: 'gai' },
  // tường gạch thấp hai bên cổng
  ...([-1, 1] as const).flatMap(sx => [-1, 1].flatMap(sz => [{ x: sx * BASES.gai.gate.x, z: BASE_Z + sz * 2.0, r: 0.55 }, { x: sx * BASES.gai.gate.x, z: BASE_Z + sz * 2.9, r: 0.55 }])),
];
// Thứ tự làn từ trên xuống dưới màn hình: LANE_2, LANE_1, LANE_3. Hai làn kề nhau mới đổi qua lại.
export const LANE_ORDER: LaneId[] = [1, 0, 2];
export const adjacentLanes = (l: LaneId): LaneId[] => { const i = LANE_ORDER.indexOf(l); return [LANE_ORDER[i - 1], LANE_ORDER[i + 1]].filter((x): x is LaneId => x !== undefined); };

class Path {
  readonly pts: P[]; readonly cum: number[] = [0]; readonly length: number;
  constructor(pts: P[]){
    this.pts = pts;
    for (let i = 1; i < pts.length; i++) this.cum.push(this.cum[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z));
    this.length = this.cum[this.cum.length - 1];
  }
  seg(s: number){ let i = 1; while (i < this.cum.length - 1 && this.cum[i] < s) i++; return i; }
  at(s: number, out: P & { nx: number; nz: number }){
    s = Math.max(0, Math.min(this.length, s));
    const i = this.seg(s), a = this.pts[i - 1], b = this.pts[i], L = this.cum[i] - this.cum[i - 1] || 1, k = (s - this.cum[i - 1]) / L;
    out.x = a.x + (b.x - a.x) * k; out.z = a.z + (b.z - a.z) * k;
    out.nx = -(b.z - a.z) / L; out.nz = (b.x - a.x) / L;          // pháp tuyến bên trái hướng đi
    return out;
  }
  project(x: number, z: number){
    let best = 0, bd = Infinity;
    for (let i = 1; i < this.pts.length; i++){
      const a = this.pts[i - 1], b = this.pts[i], dx = b.x - a.x, dz = b.z - a.z, L2 = dx * dx + dz * dz || 1;
      const k = Math.max(0, Math.min(1, ((x - a.x) * dx + (z - a.z) * dz) / L2));
      const px = a.x + dx * k, pz = a.z + dz * k, d = (x - px) ** 2 + (z - pz) ** 2;
      if (d < bd){ bd = d; best = this.cum[i - 1] + Math.sqrt(L2) * k; }
    }
    return best;
  }
}
const paths = PATHS.map(p => new Path(p));

// s là quãng đường đã đi từ điểm sinh quân của phe mình theo làn
export class LaneManager {
  static length(l: LaneId){ return paths[l].length; }
  static point(l: LaneId, team: TeamKey, s: number, out: P & { nx: number; nz: number } = { x: 0, z: 0, nx: 0, nz: 0 }){
    const p = paths[l];
    if (team === 'trai') return p.at(s, out);
    p.at(p.length - s, out); out.nx = -out.nx; out.nz = -out.nz;
    return out;
  }
  static project(l: LaneId, team: TeamKey, x: number, z: number){ const s = paths[l].project(x, z); return team === 'trai' ? s : paths[l].length - s; }
  static path(l: LaneId){ return PATHS[l]; }
}

/* ----------------------------------------------------- lưới không gian */
// Lưới đều 2,5 m phủ cả sân: tìm địch gần và tách quân chồng nhau chỉ xét các ô lân cận, không quét cả 300 quân.
export class SpatialGrid<T extends { x: number; z: number }> {
  readonly cell: number; readonly minX: number; readonly minZ: number; readonly cols: number; readonly rows: number;
  private cells: T[][];
  constructor(cell = 2.5, minX = FIELD.minX - 4, minZ = FIELD.minZ - 4, maxX = FIELD.maxX + 4, maxZ = FIELD.maxZ + 4){
    this.cell = cell; this.minX = minX; this.minZ = minZ;
    this.cols = Math.ceil((maxX - minX) / cell); this.rows = Math.ceil((maxZ - minZ) / cell);
    this.cells = Array.from({ length: this.cols * this.rows }, () => []);
  }
  private ix(x: number){ return Math.max(0, Math.min(this.cols - 1, Math.floor((x - this.minX) / this.cell))); }
  private iz(z: number){ return Math.max(0, Math.min(this.rows - 1, Math.floor((z - this.minZ) / this.cell))); }
  clear(){ for (const c of this.cells) c.length = 0; }
  insert(o: T){ this.cells[this.iz(o.z) * this.cols + this.ix(o.x)].push(o); }
  // gọi fn với mọi phần tử trong các ô chạm hình vuông bán kính r; fn trả true để dừng sớm
  query(x: number, z: number, r: number, fn: (o: T) => boolean | void){
    const x0 = this.ix(x - r), x1 = this.ix(x + r), z0 = this.iz(z - r), z1 = this.iz(z + r);
    for (let j = z0; j <= z1; j++) for (let i = x0; i <= x1; i++){
      const c = this.cells[j * this.cols + i];
      for (let k = 0; k < c.length; k++) if (fn(c[k])) return;
    }
  }
}
