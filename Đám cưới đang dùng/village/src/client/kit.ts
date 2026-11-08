import * as THREE from 'three';
import { Batch, GEO, mat } from './batch.ts';

// Bộ khối dựng chung cho cảnh tĩnh, nhà cửa, công trình. Một vật thể = danh sách ô trong các batch,
// xóa vật thể là trả các ô đó lại.
export type Shape = keyof typeof GEO | 'glow';
export interface Piece { s: Shape; i: number }

export class Kit {
  readonly batches: Record<Shape, Batch>;
  readonly glowMat: THREE.MeshBasicMaterial;
  readonly group = new THREE.Group();

  constructor(){
    const solid = new THREE.MeshStandardMaterial({ roughness: 0.92, metalness: 0, flatShading: true });
    this.glowMat = new THREE.MeshBasicMaterial({ color: 0x3a2c1c });
    this.batches = {
      box: new Batch(GEO.box, solid, 26000), prism: new Batch(GEO.prism, solid, 3000), cone: new Batch(GEO.cone, solid, 3000),
      round: new Batch(GEO.round, solid, 5000), cyl: new Batch(GEO.cyl, solid, 6000), ball: new Batch(GEO.ball, solid, 5000),
      glow: new Batch(GEO.box, this.glowMat, 3000, false),
    };
    for (const b of Object.values(this.batches)) this.group.add(b.mesh);
  }

  put(out: Piece[] | null, s: Shape, color: THREE.ColorRepresentation, x: number, y: number, z: number, sx: number, sy: number, sz: number, ry = 0, rx = 0, rz = 0){
    const i = this.batches[s].add(mat(x, y, z, sx, sy, sz, ry, rx, rz), s === 'glow' ? 0xffffff : color);   // đèn lấy màu từ glowMat theo giờ
    if (out && i >= 0) out.push({ s, i });
    return i;
  }

  clear(list: Piece[]){ for (const p of list) this.batches[p.s].remove(p.i); list.length = 0; }
  recolor(p: Piece, c: THREE.ColorRepresentation){ this.batches[p.s].color(p.i, c); }
  flush(){ for (const b of Object.values(this.batches)) b.flush(); }

  // Đèn cửa sổ: ban ngày tối màu gỗ, chiều tối sáng vàng ấm.
  setNight(n: number){ this.glowMat.color.setRGB(0.23 + 0.77 * n, 0.17 + 0.6 * n, 0.11 + 0.2 * n); }
}

// Một cái hộp xoay quanh tâm (x, z), tiện cho đồ vật đặt nghiêng.
export function rotXZ(cx: number, cz: number, dx: number, dz: number, ry: number){
  const c = Math.cos(ry), s = Math.sin(ry);
  return { x: cx + dx * c + dz * s, z: cz - dx * s + dz * c };
}
