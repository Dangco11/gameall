import type { DecorKey } from '../shared/balance.ts';
import type { PubPlayer } from '../shared/types.ts';
import { IN_LOT, LOTS, LOT_SIZE, at } from './layout.ts';
import type { V2 } from './layout.ts';
import type { Kit, Piece, Shape } from './kit.ts';

export const C = {
  thatch: 0xd1ad62, thatchDark: 0xa9853f, mud: 0xc9a77f, bamboo: 0xbba15d, wood: 0x8c5a34, woodDark: 0x5c3920, plaster: 0xf0e7d3,
  yellow: 0xeccb72, cream: 0xf3e6c4, blue: 0xa9c7cf, brick: 0xb0533a, tile: 0xb8472c, tileDark: 0x8a3322, stone: 0x9d988d,
  door: 0x4b2d19, green: 0x2f6b47, gold: 0xe2b23c, red: 0xc8231d, yard: 0xb99a6a, yardBrick: 0xb9705a, leaf: 0x4f8a3a, leafDark: 0x3a6e2c,
};

export type Put = (s: Shape, c: number, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry?: number, rx?: number, rz?: number) => void;

// Dựng một căn nhà theo cấp, tọa độ tương đối với tâm nhà. Trả về vị trí ống khói để đặt khói bếp.
function house(put: Put, lv: number): { chimney: V2 & { y: number } } {
  const walls = (w: number, h: number, d: number, color: number, y = 0) => put('box', color, 0, y, 0, w, h, d);
  const roof = (w: number, h: number, d: number, color: number, y: number) => put('prism', color, 0, y, 0, w, h, d);
  const door = (x: number, h = 1.2) => put('box', C.door, x, 0, 0, 0.7, h, 0.02);
  const win = (x: number, y: number, d: number) => put('glow', 0, x, y, d, 0.55, 0.5, 0.05);
  const post = (x: number, z: number, h: number, c = C.wood) => put('cyl', c, x, 0, z, 0.16, h, 0.16);

  if (lv <= 1){
    put('box', C.bamboo, 0, 0, 0, 2.8, 0.35, 2.2);
    for (const [x, z] of [[-1.2, -0.9], [1.2, -0.9], [-1.2, 0.9], [1.2, 0.9]]) post(x, z, 1.7, C.bamboo);
    roof(3.4, 1.2, 2.9, C.thatch, 1.6);
    put('glow', 0, 0, 0.6, 0, 0.3, 0.3, 0.3);
    return { chimney: { x: 0.6, y: 2.4, z: 0 } };
  }
  if (lv === 2){
    walls(3.6, 1.6, 2.8, C.mud); roof(4.4, 1.5, 3.6, C.thatch, 1.5);
    put('box', C.door, 0.6, 0, 1.41, 0.7, 1.2, 0.02); win(-0.9, 0.7, 1.42);
    return { chimney: { x: -1, y: 2.6, z: 0 } };
  }
  if (lv === 3){
    walls(4.2, 1.8, 3, C.mud); roof(5, 1.6, 3.9, C.thatch, 1.7);
    put('box', C.door, 0.4, 0, 1.51, 0.75, 1.3, 0.02); win(-1.1, 0.8, 1.52); win(1.4, 0.8, 1.52);
    put('box', C.mud, 2.9, 0, -0.4, 1.4, 1.3, 1.8); put('prism', C.thatchDark, 2.9, 1.3, -0.4, 1.7, 0.8, 2.2);
    put('box', C.stone, 3.3, 1.6, -0.9, 0.3, 0.9, 0.3);
    return { chimney: { x: 3.3, y: 2.6, z: -0.9 } };
  }
  if (lv === 4){
    walls(4.6, 2, 3.2, C.wood); roof(5.6, 1.7, 4.6, C.woodDark, 2);
    for (const x of [-1.9, 0, 1.9]) post(x, 2.1, 2);
    put('box', C.woodDark, 0, 0, 1.9, 4.8, 0.25, 1.2);
    put('box', C.door, 0, 0.2, 1.61, 0.8, 1.4, 0.02); win(-1.4, 0.9, 1.62); win(1.4, 0.9, 1.62);
    put('box', C.stone, -1.8, 2.2, -0.8, 0.35, 1.2, 0.35);
    return { chimney: { x: -1.8, y: 3.4, z: -0.8 } };
  }
  const big = lv >= 7, wide = big ? 6.6 : lv === 6 ? 5.6 : 5.2, wallC = lv >= 9 ? C.cream : lv === 5 ? C.yellow : lv === 8 ? C.plaster : C.yellow;
  const h1 = lv >= 9 ? 2.6 : 2.3;
  walls(wide, h1, 3.4, wallC);
  put('box', C.stone, 0, 0, 0, wide + 0.3, 0.3, 3.7);
  put('box', C.green, 0, 0.3, 1.71, 0.95, 1.6, 0.03);
  for (const x of big ? [-2.3, -1.2, 1.2, 2.3] : [-1.5, 1.5]) win(x, 1, 1.72);
  if (lv >= 6) for (const x of big ? [-3, -1, 1, 3] : [-2.4, 0.9, 2.4]) put('cyl', C.woodDark, x, 0.3, 2.6, 0.22, h1 - 0.3, 0.22);
  if (lv >= 6) put('box', C.brick, 0, 0, 2.4, wide + 0.4, 0.3, 1.6);
  let top = h1;
  if (lv >= 9){
    put('box', C.plaster, 0, h1, 0.2, wide + 0.8, 0.22, 4.4);
    put('box', wallC, 0, h1 + 0.22, -0.2, wide - 0.6, 2.2, 3);
    for (const x of [-1.6, 0, 1.6]) win(x, h1 + 1, 1.32);
    for (let i = 0; i < 9; i++) put('box', C.plaster, -wide / 2 - 0.3 + i * (wide + 0.6) / 8, h1 + 0.22, 2.35, 0.1, 0.7, 0.1);
    put('box', C.plaster, 0, h1 + 0.9, 2.35, wide + 0.7, 0.1, 0.1);
    top = h1 + 2.42;
  }
  const rw = (lv >= 9 ? wide - 0.2 : wide) + 1, rd = lv >= 9 ? 4 : lv >= 6 ? 5.6 : 4.6;
  roof(rw, lv >= 9 ? 1.5 : 1.7, rd, lv === 5 ? C.tileDark : C.tile, top);
  put('box', C.tileDark, 0, top + (lv >= 9 ? 1.45 : 1.65), 0, rw * 0.98, 0.18, 0.25);
  if (big) for (const s of [-1, 1]) put('cone', C.tileDark, s * rw * 0.49, top + 1.6, 0, 0.3, 0.7, 0.3, 0, 0, -s * 0.6);
  if (lv >= 8){
    put('box', wallC, -wide / 2 - 1.6, 0, -0.4, 3, 2.1, 2.8);
    put('prism', C.tile, -wide / 2 - 1.6, 2.1, -0.4, 3.4, 1.3, 3.5);
    win(-wide / 2 - 1.6, 0.9, 1.01);
  }
  if (lv >= 10){
    for (const s of [-1, 1]){ put('box', C.gold, s * rw * 0.45, top + 1.65, 0, 0.5, 0.35, 0.3); put('box', C.red, s * 2.3, 0, 4.8, 0.45, 2.3, 0.45); put('ball', C.gold, s * 2.3, 2.3, 4.8, 0.45, 0.45, 0.45); }
    put('box', C.red, 0, 1.9, 4.8, 4.6, 0.4, 0.3);
  }
  return { chimney: { x: wide / 2 - 0.6, y: top + 0.9, z: -1 } };
}

function decor(put: Put, keys: DecorKey[]){
  const hw = LOT_SIZE.w / 2 - 0.3, hd = LOT_SIZE.d / 2 - 0.3;
  for (const k of keys){
    if (k === 'codo'){ put('cyl', C.stone, -4.6, 0, -3.8, 0.1, 4, 0.1); put('box', C.red, -4.1, 3.2, -3.8, 1, 0.7, 0.04); put('box', C.gold, -4.1, 3.47, -3.78, 0.22, 0.22, 0.04); }
    if (k === 'denlong') for (const x of [-1.3, 1.3]){ put('ball', C.red, x, 1.7, 1.95, 0.42, 0.5, 0.42); put('glow', 0, x, 1.85, 1.95, 0.18, 0.18, 0.18); }
    if (k === 'chaumai'){ put('cyl', 0x7b4a2a, 1.6, 0, 3, 0.6, 0.45, 0.6); put('ball', C.gold, 1.6, 0.45, 3, 1, 0.9, 1); put('cyl', C.woodDark, 1.6, 0.4, 3, 0.08, 0.5, 0.08); }
    if (k === 'hangrao'){
      for (const z of [-hd, hd]) for (const x of [-hw, -hw / 2, hw / 2, hw]) if (!(z > 0 && Math.abs(x) < 1)) put('cyl', C.bamboo, x, 0, z, 0.1, 0.9, 0.1);
      put('box', C.bamboo, 0, 0.55, -hd, hw * 2, 0.08, 0.06);
      for (const s of [-1, 1]){ put('box', C.bamboo, s * (hw + 1.2) / 2, 0.55, hd, hw - 1.2, 0.08, 0.06); put('box', C.bamboo, s * hw, 0.55, 0, 0.06, 0.08, hd * 2); }
    }
    if (k === 'caycau'){ put('cyl', 0x9a8a6a, 4.6, 0, -3.8, 0.18, 5, 0.18); for (let i = 0; i < 5; i++) put('box', C.leaf, 4.6 + Math.cos(i * 1.26) * 0.7, 4.9, -3.8 + Math.sin(i * 1.26) * 0.7, 1.5, 0.08, 0.3, i * 1.26, 0, -0.35); }
  }
}

// Sân, ao nhỏ (nước vẽ ở farm.ts) và chuồng gà: phần cố định của mỗi lô.
function yard(put: Put){
  put('box', C.yard, 0, 0, 0, LOT_SIZE.w - 0.6, 0.04, LOT_SIZE.d - 0.6);
  const { pond, coop } = IN_LOT;
  put('cyl', 0x7c6a45, pond.x, 0, pond.z, 3.5, 0.05, 2.6);
  put('box', C.bamboo, coop.x, 0.04, coop.z - 0.9, 2.6, 0.04, 0.1);
  for (const [dx, dz] of [[-1.3, -0.9], [1.3, -0.9], [-1.3, 0.9], [1.3, 0.9]]) put('cyl', C.bamboo, coop.x + dx, 0, coop.z + dz, 0.08, 0.6, 0.08);
  put('box', C.bamboo, coop.x, 0.45, coop.z + 0.9, 2.6, 0.06, 0.04); put('box', C.bamboo, coop.x - 1.3, 0.45, coop.z, 0.04, 0.06, 1.8); put('box', C.bamboo, coop.x + 1.3, 0.45, coop.z, 0.04, 0.06, 1.8);
  put('box', C.wood, coop.x + 0.7, 0, coop.z - 0.5, 1, 0.7, 0.7); put('prism', C.thatch, coop.x + 0.7, 0.7, coop.z - 0.5, 1.2, 0.45, 0.9);
  put('round', C.thatch, -4.4, 0, -3.5, 1.3, 1.6, 1.3);   // đống rơm
}

export class HouseLayer {
  private kit: Kit;
  private pieces = new Map<number, { key: string; list: Piece[] }>();
  readonly chimneys = new Map<number, { x: number; y: number; z: number }>();

  constructor(kit: Kit){ this.kit = kit; }

  // Dựng lại lô khi cấp nhà hoặc đồ trang trí đổi, hoặc lô đổi chủ.
  update(lots: Map<number, PubPlayer>){
    for (const [lot, rec] of this.pieces) if (!lots.has(lot)){ this.kit.clear(rec.list); this.pieces.delete(lot); this.chimneys.delete(lot); }
    for (const [lot, p] of lots){
      const key = `${p.houseLevel}|${p.decor.join(',')}`, rec = this.pieces.get(lot);
      if (rec?.key === key) continue;
      const list = rec?.list ?? [];
      this.kit.clear(list);
      const c = LOTS[lot], h = at(c, IN_LOT.house);
      const putAt = (ox: number, oz: number): Put => (s, col, x, y, z, sx, sy, sz, ry = 0, rx = 0, rz = 0) => { this.kit.put(list, s, col, ox + x, y, oz + z, sx, sy, sz, ry, rx, rz); };
      yard(putAt(c.x, c.z));
      decor(putAt(c.x, c.z), p.decor);
      const { chimney } = house(putAt(h.x, h.z), p.houseLevel);
      this.chimneys.set(lot, { x: h.x + chimney.x, y: chimney.y, z: h.z + chimney.z });
      this.pieces.set(lot, { key, list });
    }
  }
}
