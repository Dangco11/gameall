import { MAX_LOTS } from '../shared/balance.ts';

// Bản đồ làng (đơn vị mét, x sang phải, z hướng về phía người xem).
//   bắc sông: cánh đồng lúa   ·   sông, cầu làng ở x = 0
//   giữa sông và đường ngang z = 10: cổng làng, chợ phiên, trường học, khu chăn nuôi, đình làng, sân hội, ao làng
//   nam đường ngang: khu nhà dân, mỗi lô theo mô hình vườn ao chuồng
export interface V2 { x: number; z: number }

export const RIVER_HALF = 5.5;
export const riverZ = (x: number) => -31 + 2.5 * Math.sin(x / 22);
export const ROAD_Z = 10;
export const BRIDGE = { south: -23, north: -39 };
export const GATE: V2 = { x: 0, z: -19 };
export const MARKET: V2 = { x: -26, z: -5 };
export const SCHOOL: V2 = { x: -60, z: -6 };
export const PASTURE: V2 = { x: -94, z: -6 };
export const TEMPLE: V2 = { x: 26, z: -15 };
export const SQUARE: V2 = { x: 26, z: 1 };
export const POND: V2 = { x: 68, z: -5 };
export const POND_R = { x: 18, z: 8 };
export const WEDDING: V2 = { x: 100, z: -8 };          // sân cưới góc đông, cạnh ao làng

const LOT_W = 11, LOT_D = 10, LOT_X0 = 8, LOT_Z0 = 17;
export const LOT_SIZE = { w: LOT_W, d: LOT_D };

// Lô gần trung tâm làng được cấp trước, nên người mới luôn ở chỗ dễ thấy.
export const LOTS: V2[] = (() => {
  const out: V2[] = [];
  for (let row = 0; row < 17; row++) for (const side of [-1, 1]) for (let i = 0; i < 9; i++)
    out.push({ x: side * (LOT_X0 + LOT_W * i + LOT_W / 2), z: LOT_Z0 + LOT_D * row + LOT_D / 2 });
  return out.sort((a, b) => Math.hypot(a.x * 0.8, a.z - 14) - Math.hypot(b.x * 0.8, b.z - 14)).slice(0, MAX_LOTS);
})();
export const laneZ = (lot: V2) => lot.z + LOT_D / 2 - 0.6;

const PLOT_PITCH = 6.5;
export const PLOT_SIZE = 5.5;
export const PLOTS: V2[] = (() => {
  const out: V2[] = [];
  for (let r = 0; r < 10; r++) for (let c = 0; c < 30; c++) out.push({ x: (c - 14.5) * PLOT_PITCH, z: -45.5 - r * PLOT_PITCH });
  return out.sort((a, b) => Math.hypot(a.x, (a.z + 42) * 1.4) - Math.hypot(b.x, (b.z + 42) * 1.4)).slice(0, MAX_LOTS);
})();
export const FIELD_LANE_Z = -42;

// Vị trí trong một lô: nhà ở sau, ao bên trái, chuồng bên phải, sân trước.
export const IN_LOT = {
  house: { x: 0, z: -1.6 }, pond: { x: -3.5, z: 2.6 }, coop: { x: 3.4, z: 2.6 }, yard: { x: 0, z: 2.8 },
};
export const at = (lot: V2, o: V2): V2 => ({ x: lot.x + o.x, z: lot.z + o.z });

// Chỗ ngồi câu dọc bờ nam sông, tránh đầu cầu.
export function fishingSpot(i: number): V2 {
  const k = i % 48, side = k % 2 ? 1 : -1, x = side * (9 + Math.floor(k / 2) * 3.4);
  return { x, z: riverZ(x) + RIVER_HALF + 0.8 };
}

// Đường đi: ra lối đi trước nhà -> đường chính -> đường ngang hoặc qua cầu -> tới nơi.
export function route(from: V2, to: V2): V2[] {
  if (Math.hypot(from.x - to.x, from.z - to.z) < 9) return [to];          // gần thì đi thẳng
  const pts: V2[] = [];
  const outOf = (p: V2): V2[] => {
    if (p.z > ROAD_Z + 4){                                        // khu nhà dân
      const lz = Math.round((p.z - LOT_Z0 - LOT_D / 2) / LOT_D) * LOT_D + LOT_Z0 + LOT_D - 0.6;
      const sx = Math.sign(p.x || 1) * 2.4;
      return [{ x: p.x, z: lz }, { x: sx, z: lz }, { x: sx, z: ROAD_Z }];
    }
    if (p.z < BRIDGE.north + 1) return [{ x: p.x, z: FIELD_LANE_Z }, { x: 0, z: FIELD_LANE_Z }, { x: 0, z: BRIDGE.north }, { x: 0, z: BRIDGE.south }, { x: 0, z: ROAD_Z }];
    return [{ x: p.x, z: ROAD_Z }];
  };
  const a = outOf(from), b = outOf(to).reverse();
  pts.push(...a);
  if (Math.abs(a[a.length - 1].x - b[0].x) > 0.5) pts.push({ x: b[0].x, z: ROAD_Z });
  pts.push(...b, to);
  // bỏ các điểm trùng hoặc đi lùi vô ích
  const out: V2[] = [];
  for (const p of pts) { const q = out[out.length - 1]; if (!q || Math.hypot(q.x - p.x, q.z - p.z) > 0.3) out.push(p); }
  return out;
}
