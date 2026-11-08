// Mặt bằng quán, dùng chung cho server (cấp chỗ) và trình duyệt (vẽ, tìm đường). Đơn vị: mét trong cảnh 3D.
// Trục x sang phải, trục z hướng về máy quay. Khách ngồi sau bàn, mặt quay về máy quay.

export const SHOP = { x: 12.5, back: -17, front: 15, wallH: 7, street: 24 };

export const ZONES = {
  0: 'Khu mang đi', 1: 'Vỉa hè', 2: 'Hàng cửa', 3: 'Góc cửa sổ', 4: 'Khu Bạc', 5: 'Khu Vàng',
  6: 'Khu Bạch Kim', 7: 'Khu Kim Cương', 8: 'Phòng Đại Gia', 9: 'Sảnh Chủ Tịch', 10: 'Ngai Huyền Thoại',
};

const TABLE_X = [-9.2, -4.2, 4.2, 9.2];
const ROWS = [
  { z: -9.5, zones: [10, 10, 9, 9] }, { z: -6.1, zones: [8, 8, 7, 7] }, { z: -2.7, zones: [6, 6, 6, 6] },
  { z: 0.7, zones: [5, 5, 5, 5] }, { z: 4.1, zones: [4, 4, 4, 4] }, { z: 7.5, zones: [3, 3, 3, 3] }, { z: 10.9, zones: [2, 2, 2, 2] },
];
const OUTDOOR = [{ x: 3, z: 18.2 }, { x: 7.4, z: 18.2 }, { x: 11.8, z: 18.2 }, { x: 3, z: 21.6 }, { x: 7.4, z: 21.6 }, { x: 11.8, z: 21.6 }];

// Bục của các khu riêng: [x0, x1, z0, z1, độ cao, kiểu]. Người đi trên đó được nâng theo floorY.
export const PLATFORMS = [
  [-12.2, -1.2, -12.3, -8.1, 0.4, 'gold'], [1.2, 12.2, -12.3, -8.1, 0.2, 'marble'],
  [-12.2, -1.2, -8.4, -5.2, 0.2, 'marble'], [1.2, 12.2, -8.4, -5.2, 0.2, 'marble'],
];
export function floorY(x, z) {
  let y = 0;
  for (const [x0, x1, z0, z1, h] of PLATFORMS) if (x >= x0 && x <= x1 && z >= z0 && z <= z1) y = Math.max(y, h);
  return y;
}

export const TABLES = [];
export const SEATS = [];
const seatCount = {};
function addTable(x, z, zone) {
  const y = zone === 10 ? 0.4 : zone >= 7 ? 0.2 : 0;   // khu riêng nằm trên bục
  const table = { x, z, zone, y, no: 0 };
  TABLES.push(table);
  for (const dx of [-0.72, 0.72]) {
    seatCount[zone] = (seatCount[zone] || 0) + 1;
    SEATS.push({ id: `Z${zone}-${String(seatCount[zone]).padStart(2, '0')}`, zone, x: x + dx, y, z: z - 1.15, ry: 0, table, stand: false });
  }
}
for (const row of ROWS) TABLE_X.forEach((x, i) => addTable(x, row.z, row.zones[i]));
for (const t of OUTDOOR) addTable(t.x, t.z, 1);
for (let i = 0; i < 8; i++) {
  const id = `TK-${String(i + 1).padStart(2, '0')}`;
  SEATS.push({ id, zone: 0, x: -11.5 + i * 1.15, y: 0, z: 17.6 + (i % 2) * 0.5, ry: 0, table: { x: -11.5 + i * 1.15, z: 16.5, y: 0 }, stand: true });
}
export const SEAT_BY_ID = new Map(SEATS.map(s => [s.id, s]));

// Số bàn in trên mặt bàn: đánh từ hàng gần cửa vào trong, trái sang phải, bàn vỉa hè đánh sau cùng.
// Người xem bình luận "bàn 5" để sang ngồi bàn đó cùng bạn.
[...TABLES.filter(t => t.zone !== 1).sort((a, b) => b.z - a.z || a.x - b.x), ...TABLES.filter(t => t.zone === 1)].forEach((t, i) => { t.no = i + 1; });
export const TABLE_BY_NO = new Map(TABLES.map(t => [t.no, t]));
export const seatsAt = no => SEATS.filter(s => s.table.no === no);

// Thứ tự tìm chỗ: khu của cấp mình, xuống dần các khu thấp hơn, rồi tới các khu thường. Khu từ 7 trở lên dành riêng, khách cấp thấp không vào.
// Vỉa hè nằm sát mép dưới khung hình, bị menu che, nên chỉ dùng khi trong quán đã kín.
export function zoneSearchOrder(level) {
  const order = [];
  for (let z = level; z >= 2; z--) order.push(z);
  for (let z = Math.max(level + 1, 2); z <= 6; z++) order.push(z);
  order.push(1, 0);
  return order;
}

export const POINTS = {
  street: { x: -18, z: 23 }, door: { x: 0, z: 15 }, greeter: { x: -2.6, z: 13.2 },
  baristas: [{ x: -9.5, z: -15.2 }, { x: -5.5, z: -15.2 }, { x: -1.5, z: -15.2 }],
  waiters: [{ x: -7.5, z: -12 }, { x: -3.5, z: -12 }, { x: 0.5, z: -12 }],
  pickups: [{ x: -9.5, z: -13.1 }, { x: -5.5, z: -13.1 }, { x: -1.5, z: -13.1 }],
  cashier: { x: 3.6, z: -15.2 },
};

const lane = seat => seat.table.z - 1.85;
const outdoors = z => z > SHOP.front;

// Đường đi của khách từ cửa tới chỗ: đi dọc lối giữa rồi rẽ theo hàng ghế để không xuyên qua bàn.
export function pathToSeat(seat) {
  const end = { x: seat.x, y: seat.y, z: seat.z };
  if (seat.stand) return [{ x: POINTS.street.x + 3, y: 0, z: 19 }, end];
  if (outdoors(seat.z)) return [{ x: 0, y: 0, z: 23 }, { x: 0, y: 0, z: lane(seat) }, { x: seat.x, y: 0, z: lane(seat) }, end];
  return [{ x: 0, y: 0, z: 23 }, { x: 0, y: 0, z: 15 }, { x: 0, y: 0, z: lane(seat) }, { x: seat.x, y: 0, z: lane(seat) }, end];
}
export function pathOut(seat) {
  if (seat.stand) return [{ x: POINTS.street.x, y: 0, z: 19 }];
  if (outdoors(seat.z)) return [{ x: seat.x, y: 0, z: lane(seat) }, { x: 0, y: 0, z: 23 }, { x: POINTS.street.x, y: 0, z: 23 }];
  return [{ x: seat.x, y: 0, z: lane(seat) }, { x: 0, y: 0, z: lane(seat) }, { x: 0, y: 0, z: 15 }, { x: 0, y: 0, z: 23 }, { x: POINTS.street.x, y: 0, z: 23 }];
}
// Đường của phục vụ từ quầy tới trước bàn. Nhân viên đứng phía trước bàn, quay lưng về máy quay.
export function pathForWaiter(seat, from) {
  const t = seat.table, front = t.z + 1.2;
  const path = [{ x: from.x, y: 0, z: -12 }, { x: 0, y: 0, z: -12 }];
  if (outdoors(seat.z)) path.push({ x: 0, y: 0, z: 15 });
  path.push({ x: 0, y: 0, z: front }, { x: t.x, y: 0, z: front });
  return path;
}
