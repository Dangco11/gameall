import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { brick, carvedDoor, plaque, roofTile, seeded, stone, wood } from './tex.ts';

// Đình làng Bắc Bộ phía sau sân cưới: nền đá ong cao có tam cấp hai bên, hàng cột lim trên chân tảng đá, xà và bẩy gỗ đỡ mái,
// vách cửa bức bàn chạm sen, hai tầng mái cong lợp ngói mũi hài có đầu đao vểnh, cổ diêm giữa hai tầng mái,
// trên nóc lưỡng long chầu nguyệt, hoành phi trên cổ diêm và câu đối trên cột.
// Tâm đình ở (0, 0, Z0); mặt tiền nhìn về +z (về phía khách).
export const Z0 = -4.2;
const PLAT_H = 0.6;

const shadow = <T extends THREE.Object3D>(o: T, cast = true) => { o.traverse(c => { c.castShadow = cast; c.receiveShadow = true; }); return o; };
function pbrMat(t: { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap?: THREE.Texture }, repeat: [number, number], extra: THREE.MeshStandardMaterialParameters = {}){
  const clone = (x?: THREE.Texture) => { if (!x) return undefined; const c = x.clone(); c.repeat.set(...repeat); c.needsUpdate = true; return c; };
  return new THREE.MeshStandardMaterial({ map: clone(t.map), normalMap: clone(t.normalMap), roughnessMap: clone(t.roughnessMap), roughness: 1, ...extra });
}
// ống thuôn dần theo đường cong (thân rồng, đầu đao, bẩy)
export function taperTube(curve: THREE.Curve<THREE.Vector3>, r0: number, r1: number, seg = 48, rad = 10){
  const g = new THREE.TubeGeometry(curve, seg, 1, rad, false), p = g.attributes.position as THREE.BufferAttribute, c = new THREE.Vector3(), v = new THREE.Vector3();
  for (let i = 0; i <= seg; i++){
    const t = i / seg, r = r0 + (r1 - r0) * t; curve.getPointAt(t, c);
    for (let j = 0; j <= rad; j++){ const k = i * (rad + 1) + j; v.fromBufferAttribute(p, k).sub(c).multiplyScalar(r).add(c); p.setXYZ(k, v.x, v.y, v.z); }
  }
  g.computeVertexNormals(); return g;
}

/* ------------------------------------------------------------ mái cong */
interface RoofSpec { L: number; D: number; Lr: number; eaveY: number; ridgeY: number; up: number; flare: number; vMax?: number }
// Mặt mái lợp ngói: bốn mặt (trước, sau, hai đầu hồi), mép mái võng xuống giữa rồi vểnh lên ở bốn góc thành đầu đao
function roofGeo(s: RoofSpec, under: boolean){
  const { L, D, Lr, eaveY, ridgeY, up, flare } = s, vMax = s.vMax ?? 1, NU = 48, NV = 16, TILE = 2.4;
  const prof = (v: number) => v - 0.16 * Math.sin(Math.PI * v);           // mặt mái lõm cong
  const parts: THREE.BufferGeometry[] = [];
  const surf = (eave: (a: number) => THREE.Vector3, ridge: (a: number) => THREE.Vector3, uvX: (p: THREE.Vector3) => number, slopeLen: number) => {
    const pos: number[] = [], uv: number[] = [], idx: number[] = [];
    for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++){
      const a = i / NU * 2 - 1, v = j / NV * vMax, e = eave(a), r = ridge(a);
      const p = new THREE.Vector3(e.x + (r.x - e.x) * v, e.y + (ridgeY - e.y) * prof(v), e.z + (r.z - e.z) * v);
      if (under) p.y -= 0.12;
      pos.push(p.x, p.y, p.z); uv.push(uvX(p) / TILE, v * slopeLen / TILE);
    }
    for (let j = 0; j < NV; j++) for (let i = 0; i < NU; i++){
      const a = j * (NU + 1) + i, b = a + 1, c = a + NU + 1, d = c + 1;
      idx.push(a, b, c, b, d, c);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(idx);
    return g;
  };
  const k6 = (a: number) => Math.pow(Math.abs(a), 6);
  const slope = Math.hypot(D / 2, ridgeY - eaveY);
  for (const sz of [1, -1]){
    // mặt trước / sau
    let g = surf(a => new THREE.Vector3(a * L / 2 + Math.sign(a) * flare * k6(a), eaveY + up * k6(a), Z0 + sz * (D / 2 + flare * k6(a))),
      a => new THREE.Vector3(a * Lr / 2, ridgeY, Z0), p => p.x, slope);
    if (sz * (under ? -1 : 1) < 0) g = flip(g);
    parts.push(g);
  }
  for (const sx of [-1, 1]){
    // đầu hồi
    let g = surf(a => new THREE.Vector3(sx * (L / 2 + flare * k6(a)), eaveY + up * k6(a), Z0 + a * (D / 2 + flare * k6(a))),
      () => new THREE.Vector3(sx * Lr / 2, ridgeY, Z0), p => p.z, Math.hypot((L - Lr) / 2, ridgeY - eaveY));
    if (sx * (under ? -1 : 1) > 0) g = flip(g);
    parts.push(g);
  }
  const g = mergeGeometries(parts);
  g.computeVertexNormals();
  return g;
}
function flip(g: THREE.BufferGeometry){ const i = g.getIndex()!.array as unknown as number[]; const n: number[] = []; for (let k = 0; k < i.length; k += 3) n.push(i[k], i[k + 2], i[k + 1]); g.setIndex(n); return g; }
// đường mép mái (để gắn diềm gỗ, đầu đao)
function eavePoint(s: RoofSpec, side: 'front' | 'back' | 'left' | 'right', a: number){
  const k = Math.pow(Math.abs(a), 6), { L, D, eaveY, up, flare } = s;
  if (side === 'front' || side === 'back'){ const sz = side === 'front' ? 1 : -1; return new THREE.Vector3(a * L / 2 + Math.sign(a) * flare * k, eaveY + up * k, Z0 + sz * (D / 2 + flare * k)); }
  const sx = side === 'left' ? -1 : 1; return new THREE.Vector3(sx * (L / 2 + flare * k), eaveY + up * k, Z0 + a * (D / 2 + flare * k));
}

/* ------------------------------------------------------------ rồng chầu */
function dragon(sx: number, x0: number, x1: number, y: number, z: number, m: THREE.Material){
  const g = new THREE.Group();
  // thân uốn khúc nhấp nhô dọc bờ nóc, đuôi ở đầu nóc, đầu ngẩng cao nhìn vào ngọc giữa
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 14; i++){ const t = i / 14, x = x0 + (x1 - x0) * t; pts.push(new THREE.Vector3(x, y + 0.15 + Math.sin(t * Math.PI * 3) * 0.22 * (1 - t * 0.4) + t * t * 0.55, z + Math.cos(t * Math.PI * 3) * 0.08)); }
  const body = new THREE.CatmullRomCurve3(pts);
  g.add(new THREE.Mesh(taperTube(body, 0.05, 0.13, 80, 10), m));
  // vây lưng
  const spikes: THREE.BufferGeometry[] = [];
  for (let i = 1; i < 26; i++){ const t = i / 26, p = body.getPointAt(t), s = 0.06 + t * 0.08; spikes.push(new THREE.ConeGeometry(s * 0.45, s * 1.6, 5).translate(0, s * 0.9, 0).rotateZ(-sx * 0.35).translate(p.x, p.y + 0.04 + t * 0.08, p.z)); }
  g.add(new THREE.Mesh(mergeGeometries(spikes), m));
  // đầu: sọ, mõm, sừng, râu cuộn
  const hp = body.getPointAt(1), head = new THREE.Group(); head.position.copy(hp);
  head.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12).scale(1.2, 1, 0.9), m));
  head.add(new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.38, 10).rotateZ(sx * Math.PI / 2).translate(sx * 0.3, -0.03, 0), m));
  for (const dz of [-0.08, 0.08]){
    const horn = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.1, dz), new THREE.Vector3(-sx * 0.12, 0.32, dz * 1.6), new THREE.Vector3(-sx * 0.32, 0.38, dz * 2)]);
    head.add(new THREE.Mesh(taperTube(horn, 0.035, 0.008, 12, 6), m));
    const whisker = new THREE.CatmullRomCurve3([new THREE.Vector3(sx * 0.35, -0.08, dz), new THREE.Vector3(sx * 0.5, -0.2, dz * 2.2), new THREE.Vector3(sx * 0.42, -0.34, dz * 2.5), new THREE.Vector3(sx * 0.3, -0.3, dz * 2.2)]);
    head.add(new THREE.Mesh(taperTube(whisker, 0.02, 0.006, 16, 5), m));
  }
  g.add(head);
  return g;
}
// đầu đao: lưỡi đao cong vút lên, cuộn đầu như ngọn lửa
function dao(p: THREE.Vector3, out: THREE.Vector3, m: THREE.Material, s = 1){
  const o = out.clone().setY(0).normalize();
  const pts = [p.clone(), p.clone().addScaledVector(o, 0.45 * s).add(new THREE.Vector3(0, 0.25 * s, 0)), p.clone().addScaledVector(o, 0.7 * s).add(new THREE.Vector3(0, 0.85 * s, 0)),
    p.clone().addScaledVector(o, 0.5 * s).add(new THREE.Vector3(0, 1.25 * s, 0)), p.clone().addScaledVector(o, 0.32 * s).add(new THREE.Vector3(0, 1.1 * s, 0))];
  return new THREE.Mesh(taperTube(new THREE.CatmullRomCurve3(pts), 0.13 * s, 0.03 * s, 40, 8), m);
}

/* ------------------------------------------------------------ dựng đình */
export function buildDinh(){
  const g = new THREE.Group();
  const stoneM = pbrMat(stone(), [6, 1]), floorM = pbrMat(brick(), [9, 4]), woodM = pbrMat(wood(), [1, 2], { roughness: 0.8 });
  const tileM = pbrMat(roofTile(), [1, 1], { side: THREE.DoubleSide }), underM = pbrMat(wood(), [6, 3], { roughness: 0.9, color: 0xb08870, side: THREE.DoubleSide });
  const goldM = new THREE.MeshStandardMaterial({ color: 0xc9a050, metalness: 0.75, roughness: 0.38 });
  const glazeM = new THREE.MeshStandardMaterial({ color: 0x8a4a2a, roughness: 0.55, metalness: 0.1 });

  // nền đình đá ong, mặt lát gạch, tam cấp hai bên
  const plat = new THREE.Mesh(new THREE.BoxGeometry(18, PLAT_H, 7), [stoneM, stoneM, floorM, stoneM, stoneM, stoneM]);
  plat.position.set(0, PLAT_H / 2, Z0); g.add(plat);
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++){
    const st = new THREE.Mesh(new THREE.BoxGeometry(2.4, PLAT_H / 3 * (3 - i), 0.42), stoneM);
    st.position.set(sx * 6.2, PLAT_H / 6 * (3 - i), Z0 + 3.5 + 0.21 + i * 0.42); g.add(st);
    // thành bậc đá cuốn
    if (i === 0) for (const e of [-1, 1]){ const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.55, 1.4).translate(0, 0.27, 0), stoneM); rail.position.set(sx * 6.2 + e * 1.3, PLAT_H * 0.5, Z0 + 3.5 + 0.6); rail.rotation.x = -0.32; g.add(rail); }
  }

  // hàng cột lim trước hiên trên chân tảng đá, cột hậu sau vách
  const colGeo = new THREE.LatheGeometry([[0, 0], [0.22, 0], [0.22, 0.1], [0.2, 0.18], [0.19, 3.5], [0.21, 3.62], [0, 3.62]].map(([r, y]) => new THREE.Vector2(r, y)), 24);
  const baseGeo = new THREE.LatheGeometry([[0, 0], [0.38, 0], [0.38, 0.08], [0.3, 0.2], [0.24, 0.24], [0, 0.24]].map(([r, y]) => new THREE.Vector2(r, y)), 20);
  const colZ = Z0 + 2.6, top = PLAT_H + 3.62;
  for (let i = 0; i < 8; i++){
    const x = -7 + i * 2;
    const b = new THREE.Mesh(baseGeo, stoneM); b.position.set(x, PLAT_H, colZ); g.add(b);
    const c = new THREE.Mesh(colGeo, woodM); c.position.set(x, PLAT_H + 0.2, colZ); g.add(c);
    // bẩy: thanh gỗ cong từ đầu cột vươn ra đỡ mép mái
    const bay = new THREE.CatmullRomCurve3([new THREE.Vector3(x, top - 0.5, colZ), new THREE.Vector3(x, top - 0.1, colZ + 0.9), new THREE.Vector3(x, top + 0.05, colZ + 1.9)]);
    g.add(new THREE.Mesh(taperTube(bay, 0.1, 0.07, 16, 8), woodM));
  }
  for (const y of [top - 0.25, top + 0.15]){ const beam = new THREE.Mesh(new THREE.BoxGeometry(15, 0.26, 0.3), woodM); beam.position.set(0, y, colZ); g.add(beam); }   // xà ngang

  // vách cửa bức bàn chạm khắc, hai đầu hồi tường gạch
  const door = carvedDoor(), doorM = new THREE.MeshStandardMaterial({ map: door.map.clone(), normalMap: door.normalMap.clone(), roughness: 0.6 });
  for (const t of [doorM.map!, doorM.normalMap!]){ t.wrapS = THREE.RepeatWrapping; t.repeat.set(7, 1); t.needsUpdate = true; }
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(14.6, 3.7), doorM); wall.position.set(0, PLAT_H + 1.85, Z0 + 0.9); g.add(wall);
  const hoiM = pbrMat(stone(), [2, 1], { color: 0xd8c8b0 });
  for (const sx of [-1, 1]){ const w = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.9, 5.5), hoiM); w.position.set(sx * 7.5, PLAT_H + 1.95, Z0 - 1.2); g.add(w); }
  const back = new THREE.Mesh(new THREE.BoxGeometry(15.4, 3.9, 0.3), hoiM); back.position.set(0, PLAT_H + 1.95, Z0 - 3.4); g.add(back);

  // câu đối trên hai cột giữa hai bên cổng hoa
  ([['Trăm Năm Hạnh Phúc', -3], ['Bạc Đầu Nghĩa Phu Thê', 3]] as const).forEach(([t, x]) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 2.5), new THREE.MeshStandardMaterial({ map: plaque(t, 128, 940, true, true), roughness: 0.45, metalness: 0.1 }));
    p.position.set(x, PLAT_H + 2.0, colZ + 0.215); g.add(p);
  });

  // hai tầng mái: tầng dưới rộng, tầng trên nhỏ hơn, cổ diêm chạm song gỗ ở giữa
  const lower: RoofSpec = { L: 19.2, D: 9.4, Lr: 12, eaveY: 4.3, ridgeY: 6.1, up: 0.9, flare: 0.55, vMax: 0.62 };
  const upper: RoofSpec = { L: 13.6, D: 5.6, Lr: 7.6, eaveY: 5.95, ridgeY: 7.25, up: 0.6, flare: 0.35 };
  for (const s of [lower, upper]){
    g.add(new THREE.Mesh(roofGeo(s, false), tileM));
    g.add(shadow(new THREE.Mesh(roofGeo(s, true), underM), false));
    // diềm gỗ dưới mép mái và đầu đao ở bốn góc
    for (const side of ['front', 'back', 'left', 'right'] as const){
      const pts = Array.from({ length: 33 }, (_, i) => eavePoint(s, side, i / 16 - 1).add(new THREE.Vector3(0, -0.08, 0)));
      g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 64, 0.07, 6), woodM));
    }
    for (const [sx, sz] of [[-1, 1], [1, 1], [-1, -1], [1, -1]]){
      const p = eavePoint(s, sz > 0 ? 'front' : 'back', sx);
      g.add(dao(p, new THREE.Vector3(sx, 0, sz), glazeM, s === lower ? 1 : 0.75));
    }
  }
  // cổ diêm: dải song gỗ giữa hai tầng mái
  const band = carvedDoor(), bandM = new THREE.MeshStandardMaterial({ map: band.map.clone(), normalMap: band.normalMap.clone(), roughness: 0.6, color: 0xc89070 });
  for (const t of [bandM.map!, bandM.normalMap!]){ t.wrapS = THREE.RepeatWrapping; t.repeat.set(10, 0.35); t.offset.y = 0.62; t.needsUpdate = true; }
  const bandBox = new THREE.Mesh(new THREE.BoxGeometry(12.6, 1.0, 3.6), bandM); bandBox.position.set(0, 5.45, Z0); g.add(bandBox);
  const hp = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.8), new THREE.MeshStandardMaterial({ map: plaque('Song Hỷ Lâm Môn', 1024, 240, false), roughness: 0.4, metalness: 0.15 }));
  hp.position.set(0, 5.45, Z0 + 1.81); g.add(hp);                                    // hoành phi

  // bờ nóc: sống nóc ngói ống, đầu kìm hai đầu, lưỡng long chầu nguyệt
  const ridgeL = upper.Lr + 0.6;
  const ridge = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, ridgeL, 14).rotateZ(Math.PI / 2), tileM); ridge.position.set(0, upper.ridgeY + 0.1, Z0); g.add(ridge);
  const ridgeBox = new THREE.Mesh(new THREE.BoxGeometry(ridgeL, 0.3, 0.32), glazeM); ridgeBox.position.set(0, upper.ridgeY + 0.02, Z0); g.add(ridgeBox);
  for (const sx of [-1, 1]){
    const kim = new THREE.CatmullRomCurve3([new THREE.Vector3(sx * ridgeL / 2, upper.ridgeY + 0.1, Z0), new THREE.Vector3(sx * (ridgeL / 2 + 0.35), upper.ridgeY + 0.5, Z0), new THREE.Vector3(sx * (ridgeL / 2 + 0.15), upper.ridgeY + 1.0, Z0), new THREE.Vector3(sx * (ridgeL / 2 - 0.15), upper.ridgeY + 0.82, Z0)]);
    g.add(new THREE.Mesh(taperTube(kim, 0.2, 0.05, 30, 8), glazeM));
    g.add(dragon(-sx, sx * (ridgeL / 2 - 0.4), sx * 0.75, upper.ridgeY + 0.15, Z0, goldM));
  }
  // ngọc giữa có lửa
  const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.26, 20, 14), new THREE.MeshStandardMaterial({ color: 0xffd27a, emissive: 0x7a3a00, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.25 }));
  pearl.position.set(0, upper.ridgeY + 0.85, Z0); g.add(pearl);
  const flames: THREE.BufferGeometry[] = [];
  for (let i = 0; i < 9; i++){ const a = i / 9 * Math.PI * 2; flames.push(new THREE.ConeGeometry(0.06, 0.32, 6).translate(0, 0.16, 0).rotateZ(Math.cos(a) * 0.9).rotateX(Math.sin(a) * 0.9).translate(0, upper.ridgeY + 0.85, Z0)); }
  g.add(new THREE.Mesh(mergeGeometries(flames), goldM));
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.12, 0.5, 8), glazeM); stand.position.set(0, upper.ridgeY + 0.4, Z0); g.add(stand);

  shadow(g);
  return g;
}

/* ------------------------------------------------------------ bàn thờ gia tiên */
// Án thư gỗ chạm, khăn điều thêu viền kim tuyến, bát hương đồng ba chân, đôi chân nến, đôi lọ hoa, mâm ngũ quả;
// hai bên là mâm quả cưới sơn son (tráp) có nắp và lụa đỏ.
export function buildAltar(z: number){
  const g = new THREE.Group(), woodM = pbrMat(wood(), [1, 1], { roughness: 0.55, color: 0x9a5a3a });
  const brass = new THREE.MeshStandardMaterial({ color: 0xc8963a, metalness: 0.9, roughness: 0.3 }), bronze = new THREE.MeshStandardMaterial({ color: 0x8a6a3a, metalness: 0.85, roughness: 0.4 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.95), woodM); top.position.set(0, 1.02, z); g.add(top);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]){ const l = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.0, 0.09), woodM); l.position.set(sx * 1.05, 0.5, z + sz * 0.38); g.add(l); }
  // khăn điều đỏ thêu viền vàng phủ mặt trước
  const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d')!;
  x.fillStyle = '#9a0c10'; x.fillRect(0, 0, 512, 256); x.strokeStyle = '#e8b440'; x.lineWidth = 10; x.strokeRect(14, 14, 484, 228);
  x.fillStyle = '#e8b440'; x.font = '700 120px "Noto Serif", serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('囍', 256, 132);
  for (let i = 0; i < 24; i++){ x.beginPath(); x.arc(30 + i * 19.5, 238, 5, 0, Math.PI * 2); x.fill(); }
  const ct = new THREE.CanvasTexture(c); ct.colorSpace = THREE.SRGBColorSpace;
  const cloth = new THREE.Mesh(new THREE.PlaneGeometry(2.25, 0.78, 12, 4), new THREE.MeshStandardMaterial({ map: ct, roughness: 0.75, side: THREE.DoubleSide }));
  cloth.position.set(0, 0.62, z + 0.49); g.add(cloth);
  // bát hương đồng ba chân có quai
  const urn = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.16, 0.02], [0.22, 0.1], [0.21, 0.2], [0.17, 0.24], [0.19, 0.26], [0, 0.26]].map(([r, y]) => new THREE.Vector2(r, y)), 24), bronze);
  urn.position.set(0, 1.12, z - 0.05); g.add(urn);
  for (let i = 0; i < 3; i++){ const a = i / 3 * Math.PI * 2, leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.1, 6), bronze); leg.position.set(Math.cos(a) * 0.14, 1.1, z - 0.05 + Math.sin(a) * 0.14); g.add(leg); }
  for (const sx of [-1, 1]){ const h = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 6, 12, Math.PI), bronze); h.position.set(sx * 0.2, 1.4, z - 0.05); h.rotation.y = Math.PI / 2; g.add(h); }
  for (let i = 0; i < 3; i++){ const st = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.34, 4), new THREE.MeshStandardMaterial({ color: 0xa02a1a })); st.position.set(-0.05 + i * 0.05, 1.53, z - 0.05); g.add(st); }
  // đôi chân nến đồng, nến đỏ
  for (const sx of [-1, 1]){
    const cs = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.1, 0], [0.1, 0.02], [0.03, 0.06], [0.025, 0.3], [0.07, 0.33], [0, 0.34]].map(([r, y]) => new THREE.Vector2(r, y)), 16), brass);
    cs.position.set(sx * 0.62, 1.06, z - 0.1); g.add(cs);
    const candle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.26, 12), new THREE.MeshStandardMaterial({ color: 0xc81e1e, roughness: 0.5 })); candle.position.set(sx * 0.62, 1.53, z - 0.1); g.add(candle);
    const flame = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6).scale(1, 1.8, 1), new THREE.MeshBasicMaterial({ color: 0xffc860, toneMapped: false })); flame.position.set(sx * 0.62, 1.7, z - 0.1); g.add(flame);
    // lọ hoa sứ men lam có hoa lay ơn, cúc
    const vase = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [0.07, 0], [0.11, 0.1], [0.1, 0.2], [0.05, 0.3], [0.07, 0.36], [0, 0.36]].map(([r, y]) => new THREE.Vector2(r, y)), 16), new THREE.MeshStandardMaterial({ color: 0xe8eef6, roughness: 0.2 }));
    vase.position.set(sx * 0.95, 1.06, z - 0.15); g.add(vase);
    for (let k = 0; k < 7; k++){ const fl = new THREE.Mesh(new THREE.IcosahedronGeometry(0.06, 1), new THREE.MeshStandardMaterial({ color: [0xffffff, 0xffd84a, 0xff6a8a][k % 3], roughness: 0.6 })); fl.position.set(sx * 0.95 + (Math.random() - 0.5) * 0.18, 1.5 + Math.random() * 0.25, z - 0.15 + (Math.random() - 0.5) * 0.12); g.add(fl); }
  }
  // mâm ngũ quả
  const tray = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.18, 0.05, 20), brass); tray.position.set(0.34, 1.09, z + 0.18); g.add(tray);
  for (const [dx, dz, c2, r] of [[0, 0, 0x7fbf4a, 0.09], [-0.1, 0.06, 0xf2a03a, 0.07], [0.1, 0.05, 0xd8342a, 0.07], [0.02, -0.1, 0xffd84a, 0.07], [-0.08, -0.08, 0xff8a3a, 0.06]] as const){
    const f = new THREE.Mesh(new THREE.SphereGeometry(r, 14, 10), new THREE.MeshStandardMaterial({ color: c2, roughness: 0.45 })); f.position.set(0.34 + dx, 1.17 + r * 0.6, z + 0.18 + dz); g.add(f);
  }
  // mâm quả cưới: tráp sơn son thếp vàng, phủ khăn đỏ, trên hai án nhỏ hai bên
  const lacq = new THREE.MeshStandardMaterial({ color: 0xb01418, roughness: 0.3, metalness: 0.1 });
  for (const sx of [-1, 1]){
    const t = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.62, 0.62), woodM); t.position.set(sx * 1.62, 0.31, z - 0.1); g.add(t);
    for (let k = 0; k < 2; k++){
      const tr = new THREE.Group(), body = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.2, 0.16, 8), lacq), lid = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.23, 0.08, 8), lacq);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.012, 6, 8), brass); rim.rotation.x = Math.PI / 2; rim.position.y = 0.08;
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), brass); knob.position.y = 0.24; lid.position.y = 0.16;
      tr.add(body, lid, rim, knob); tr.position.set(sx * 1.62 + (k - 0.5) * 0.12, 0.7 + k * 0.27, z - 0.1 + (k - 0.5) * 0.04); tr.scale.setScalar(1 - k * 0.2); g.add(tr);
    }
  }
  shadow(g);
  return g;
}

/* ------------------------------------------------------------ đèn lồng lụa */
export function lanternGeo(){
  // thân lụa bầu tròn có gân, chóp và đáy gỗ thếp vàng, tua đỏ
  const silk = new THREE.LatheGeometry(Array.from({ length: 13 }, (_, i) => { const t = i / 12; return new THREE.Vector2(0.1 + Math.sin(t * Math.PI) * 0.32, -0.42 + t * 0.84); }), 16);
  const p = silk.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++){ const x = p.getX(i), z = p.getZ(i), a = Math.atan2(z, x), k = 1 + Math.cos(a * 8) * 0.03; p.setX(i, x * k); p.setZ(i, z * k); }
  silk.computeVertexNormals();
  return silk;
}
export { pbrMat };
export const rnd = seeded;
