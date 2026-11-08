import * as THREE from 'three';

// Mặt bằng quán (mét). x: trái (-) phải (+) khi đứng ở cửa nhìn vào; z: sâu vào trong là âm, cửa ra phố ở z = 10; y: lên.
// Nhân vật quay mặt theo yaw: hướng nhìn (sin yaw, cos yaw).
export const ROOM = { x0: -13, x1: 13, z0: -12, z1: 10, h: 7 };
export const STAGE = { x0: -6.5, x1: 6.5, z0: -12, z1: -8.2, y: 0.9 };
export const BOOTH = { x: 0, z: -9.35 };                      // bàn DJ (mặt bàn hướng ra sàn)
export const FLOOR = { x0: -5, x1: 5, z0: -7.6, z1: -1.6 };   // sàn LED 10 x 6 ô 1 m
export const COUNTER = { front: -8.1, back: -8.85, z0: -6, z1: 4, top: 1.1 };   // quầy bar bên trái
export const BACKBAR = { x: -12.65, counter: -12.0, top: 0.95 };
export const VIP = { x0: 6.6, x1: 12.8, z0: -7.6, z1: 4.6, y: 0.3, gateZ: 3.6 };
export const DOOR = { x: 0, z: 10, w: 2.6 };
export const STREET = { walk0: 10, walk1: 15, road0: 15, road1: 23, far: 26 };
export const PORCH = { z: 10.9, steps: 11.6 };
export const WALK_Y = 0.36, ROAD_Y = 0.5;

export interface Spot { x: number; z: number; yaw: number; y: number; sit: boolean; kind: 'stool' | 'table' | 'sofa' | 'vip' | 'stand'; seatH?: number }
const face = (x: number, z: number, tx: number, tz: number) => Math.atan2(tx - x, tz - z);

// ghế quầy: 10 ghế dọc quầy, khách ngồi quay mặt vào quầy
export const STOOLS: Spot[] = Array.from({ length: 10 }, (_, i) => ({ x: COUNTER.front + 0.62, z: COUNTER.z0 + 0.55 + i * 0.98, yaw: -Math.PI / 2, y: 0, sit: true, kind: 'stool', seatH: 0.78 }));
// bàn đứng cao phía trước
export const HIGH_TABLES: [number, number][] = [[-3.6, 1.2], [0, 2.4], [3.6, 1.2], [-2.2, 5.6], [2.2, 5.6]];
export const TABLE_SPOTS: Spot[] = HIGH_TABLES.flatMap(([x, z], k) => [0, 1, 2].map(i => {
  const a = k * 0.9 + i * Math.PI * 2 / 3, px = x + Math.sin(a) * 0.68, pz = z + Math.cos(a) * 0.68;
  return { x: px, z: pz, yaw: face(px, pz, x, z), y: 0, sit: false, kind: 'table' as const };
}));
// sofa lounge hai góc trước (trái cạnh cửa sổ, phải cạnh khu VIP)
export const LOUNGES: { x: number; z: number; yaw: number }[] = [{ x: -10.4, z: 7.4, yaw: Math.PI / 2 }, { x: 10.4, z: 7.4, yaw: -Math.PI / 2 }];
export const SOFA_SPOTS: Spot[] = LOUNGES.flatMap(l => [-0.9, 0, 0.9].map(o => {
  const x = l.x - Math.sin(l.yaw) * 0.35 + Math.cos(l.yaw) * o, z = l.z - Math.cos(l.yaw) * 0.35 - Math.sin(l.yaw) * o;
  return { x, z, yaw: l.yaw, y: 0, sit: true, kind: 'sofa' as const, seatH: 0.46 };
}));
// khu VIP: 3 phòng sofa chữ U dọc tường phải, mỗi phòng 4 chỗ
export const VIP_BOOTHS = [-5.6, -2.0, 1.6];
export const VIP_SPOTS: Spot[] = VIP_BOOTHS.flatMap(z => [
  { x: 11.75, z: z - 0.55, yaw: -Math.PI / 2 }, { x: 11.75, z: z + 0.55, yaw: -Math.PI / 2 },
  { x: 10.55, z: z - 1.25, yaw: 0 }, { x: 10.55, z: z + 1.25, yaw: Math.PI },
].map(s => ({ ...s, y: VIP.y, sit: true, kind: 'vip' as const, seatH: 0.46 })));
// đứng dọc lan can sàn nhảy, quanh cột
export const STAND_SPOTS: Spot[] = [
  ...[-4, -2, 0, 2, 4].map(x => ({ x, z: -0.6, yaw: Math.PI, y: 0, sit: false, kind: 'stand' as const })),
  ...[-6.2, -6.2, 6.0, 6.0].map((x, i) => ({ x, z: i % 2 ? -3.2 : -5.6, yaw: face(x, i % 2 ? -3.2 : -5.6, 0, -4.5), y: 0, sit: false, kind: 'stand' as const })),
  ...[-5.6, -4.6, 4.8, 5.6].map((x, i) => ({ x, z: 4.2 + (i % 2) * 0.7, yaw: face(x, 4.2, 0, -3), y: 0, sit: false, kind: 'stand' as const })),
];
// sàn nhảy: lưới 6 x 5 chỗ, lệch nhẹ cho tự nhiên
export const FLOOR_SPOTS: Spot[] = Array.from({ length: 30 }, (_, i) => {
  const cx = i % 6, cz = Math.floor(i / 6), x = FLOOR.x0 + 0.85 + cx * 1.66 + ((i * 37) % 7 - 3) * 0.06, z = FLOOR.z0 + 0.7 + cz * 1.15 + ((i * 53) % 5 - 2) * 0.07;
  // quay mặt ra phía trước quán (máy quay, khán giả LIVE) để thấy mặt và ảnh đại diện; lệch vài độ cho tự nhiên
  return { x, z, yaw: face(x, z, 0, 9) + ((i * 29) % 9 - 4) * 0.05, y: 0, sit: false, kind: 'stand' as const };
});

// nhân viên
export const BAR_STATIONS = [{ x: -9.45, z: -2.6 }, { x: -9.45, z: 1.4 }];
export const SHELF_SPOT = (z: number) => ({ x: -11.6, z, yaw: -Math.PI / 2 });
export const PICKUP = { x: -7.55, z: 4.75, counterX: -8.4, counterZ: 3.55 };   // chỗ phục vụ lấy ly ở cuối quầy
export const DJ_SPOTS = [{ x: -0.8, z: -10.05 }, { x: 0.8, z: -10.05 }];
export const GUARD_SPOTS = [{ x: 1.95, z: 10.55, yaw: 0.15 }, { x: VIP.x0 - 0.75, z: VIP.gateZ + 1.25, yaw: -0.4 }];
export const HOST_SPOT = { x: -2.2, z: 10.5, yaw: -0.2 };
export const WAITER_HOME = [{ x: -6.9, z: 5.3, yaw: 0.3 }, { x: 5.2, z: 6.4, yaw: -0.6 }];

// đường đi: thẳng nếu thông, không thì đi vòng qua các điểm nối (cửa, giữa sảnh, cổng VIP, đầu quầy)
export const NODES = {
  street: new THREE.Vector2(0, 14), door: new THREE.Vector2(0, 10.6), foyer: new THREE.Vector2(0, 8.4), hall: new THREE.Vector2(0, 0.4),
  vipGate: new THREE.Vector2(VIP.x0 - 0.5, VIP.gateZ + 0.5), vipIn: new THREE.Vector2(VIP.x0 + 0.9, VIP.gateZ + 0.3),
  barEnd: new THREE.Vector2(-6.2, 4.6), barIn: new THREE.Vector2(-9.6, 4.9),
};
export const inVip = (x: number, z: number) => x > VIP.x0 && z < VIP.z1;
export const behindBar = (x: number) => x < COUNTER.back;
export const outside = (z: number) => z > ROOM.z1;
// các điểm phải đi qua để từ (x0,z0) tới (x1,z1)
export function route(x0: number, z0: number, x1: number, z1: number): THREE.Vector2[] {
  const pts: THREE.Vector2[] = [];
  const zone = (x: number, z: number) => outside(z) ? 'out' : inVip(x, z) ? 'vip' : behindBar(x) ? 'bar' : 'hall';
  const a = zone(x0, z0), b = zone(x1, z1);
  if (a === b) return [new THREE.Vector2(x1, z1)];
  // ra tới sảnh trước
  if (a === 'out'){ pts.push(NODES.door, NODES.foyer); }
  if (a === 'vip') pts.push(NODES.vipIn, NODES.vipGate);
  if (a === 'bar') pts.push(NODES.barIn, NODES.barEnd);
  if (b === 'out') pts.push(NODES.foyer, NODES.door);
  if (b === 'vip') pts.push(NODES.vipGate, NODES.vipIn);
  if (b === 'bar') pts.push(NODES.barEnd, NODES.barIn);
  pts.push(new THREE.Vector2(x1, z1));
  return pts.map(p => p.clone());
}
// độ cao sàn tại chỗ đứng (bục VIP, sân khấu)
export function floorY(x: number, z: number){
  if (inVip(x, z) && z > VIP.z0) return VIP.y;
  if (z < STAGE.z1 && x > STAGE.x0 && x < STAGE.x1) return STAGE.y;
  // ngoài phố: thềm cửa ngang sàn quán, hai bậc xuống vỉa hè (thấp hơn 36 cm)
  if (outside(z)) return z < PORCH.z ? 0 : z < PORCH.steps ? -WALK_Y * (z - PORCH.z) / (PORCH.steps - PORCH.z) : -WALK_Y;
  return 0;
}
