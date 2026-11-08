import * as THREE from 'three';
import { BASES } from '../battle/LaneManager.ts';
import { TEAM_INFO } from '../types.ts';
import type { TeamHud, TeamKey } from '../types.ts';
import type { Fx } from './fx.ts';

// Căn cứ mỗi nhà, dựng theo nhà ba gian làng Bắc Bộ: nền đá xanh có bậc tam cấp, tường vôi vàng ố lộ gạch chân tường,
// cột gỗ lim trên chân tảng đá, cửa bức bàn ba gian, mái ngói âm dương sẫm màu có rêu, bờ nóc và đầu đao cong,
// hoành phi sơn son thếp vàng ghi tên nhà, đèn lồng, chum nước, cột cờ. Cổng làng: hai trụ gạch có mũ, mái ngói nhỏ,
// cánh cửa gỗ dày đóng đinh sắt, tường gạch thấp hai bên.
// Mất máu thì cánh cổng xệ dần, vỡ thì đổ; nhà chính dưới 50% bốc khói, dưới 25% cháy, về 0 thì sập mái.
// Vân bề mặt (vôi, gạch, ngói, gỗ, đá) vẽ bằng canvas một lần, dùng làm cả màu và độ sần (bump) cho bề mặt có chiều sâu.

const rnd = (seed: number) => () => ((seed = (Math.imul(seed, 16807) + 7) % 2147483647) & 0x7fffffff) / 2147483647;
function tex(w: number, h: number, draw: (g: CanvasRenderingContext2D, r: () => number) => void, seed: number){
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d')!; draw(g, rnd(seed));
  const map = new THREE.CanvasTexture(c); map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = 8;
  const bump = new THREE.CanvasTexture(c); bump.wrapS = bump.wrapT = THREE.RepeatWrapping;
  return { map, bump };
}
const noise = (g: CanvasRenderingContext2D, r: () => number, w: number, h: number, n: number, a: number, dark = true) => {
  for (let i = 0; i < n; i++){ const v = dark ? r() * 80 | 0 : 180 + r() * 75 | 0; g.fillStyle = `rgba(${v},${v * 0.95 | 0},${v * 0.85 | 0},${a * r()})`; g.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 3); }
};
// vết loang: nhiều đốm mờ chồng nhau
const stains = (g: CanvasRenderingContext2D, r: () => number, w: number, h: number, n: number, rgb: string, a: number) => {
  for (let i = 0; i < n; i++){ const x = r() * w, y = r() * h, rr = 10 + r() * 60, gr = g.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, `rgba(${rgb},${a * r()})`); gr.addColorStop(1, `rgba(${rgb},0)`); g.fillStyle = gr; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
};

let MATS: ReturnType<typeof makeMaterials> | null = null;
function makeMaterials(){
  // tường vôi vàng ố: loang ẩm, vệt nước chảy, nứt, chân tường lộ gạch
  const plaster = tex(512, 512, (g, r) => {
    g.fillStyle = '#d9c08a'; g.fillRect(0, 0, 512, 512);
    stains(g, r, 512, 512, 90, '160,128,70', 0.35); stains(g, r, 512, 512, 50, '240,225,190', 0.4);
    for (let i = 0; i < 40; i++){ const x = r() * 512, gr = g.createLinearGradient(x, 0, x, 512); gr.addColorStop(0, 'rgba(90,70,40,0.18)'); gr.addColorStop(1, 'rgba(90,70,40,0)'); g.fillStyle = gr; g.fillRect(x, 0, 2 + r() * 6, 120 + r() * 300); }
    for (let i = 0; i < 12; i++){ g.strokeStyle = 'rgba(70,55,35,0.5)'; g.lineWidth = 0.8; g.beginPath(); let x = r() * 512, y = r() * 512; g.moveTo(x, y); for (let k = 0; k < 6; k++){ x += (r() - 0.5) * 30; y += r() * 25; g.lineTo(x, y); } g.stroke(); }
    // chân tường bong vôi lộ gạch
    for (let y = 430; y < 512; y += 18) for (let x = (y / 18 % 2) * 22; x < 512; x += 44){ if (r() < 0.55) continue; g.fillStyle = `rgb(${130 + r() * 40 | 0},${60 + r() * 20 | 0},${40 + r() * 15 | 0})`; g.fillRect(x + 1, y + 1, 41, 15); }
    stains(g, r, 512, 80, 20, '80,90,50', 0.25);
    noise(g, r, 512, 512, 9000, 0.25);
  }, 11);
  // ngói âm dương: hàng ngói cong xếp so le, màu nung không đều, rêu xanh xám lốm đốm
  const tiles = tex(512, 512, (g, r) => {
    g.fillStyle = '#5a2a1a'; g.fillRect(0, 0, 512, 512);
    for (let row = 0; row < 16; row++) for (let col = 0; col < 16; col++){
      const x = col * 32 + (row % 2) * 16, y = row * 32, base = 120 + r() * 50;
      const gr = g.createLinearGradient(x, 0, x + 30, 0);
      gr.addColorStop(0, `rgb(${base * 0.55 | 0},${base * 0.25 | 0},${base * 0.15 | 0})`); gr.addColorStop(0.5, `rgb(${base | 0},${base * 0.48 | 0},${base * 0.3 | 0})`); gr.addColorStop(1, `rgb(${base * 0.5 | 0},${base * 0.22 | 0},${base * 0.14 | 0})`);
      g.fillStyle = gr; g.beginPath(); g.ellipse(x + 15, y + 18, 15, 19, 0, Math.PI, 0); g.lineTo(x + 30, y + 34); g.lineTo(x, y + 34); g.fill();
      g.fillStyle = 'rgba(20,8,4,0.55)'; g.fillRect(x, y + 30, 30, 4);
    }
    stains(g, r, 512, 512, 70, '70,80,55', 0.45); stains(g, r, 512, 512, 30, '30,25,20', 0.35);
    noise(g, r, 512, 512, 7000, 0.3);
  }, 21);
  // gỗ lim già: thớ dọc, mắt gỗ, sẫm màu
  const wood = tex(256, 512, (g, r) => {
    g.fillStyle = '#5a3820'; g.fillRect(0, 0, 256, 512);
    for (let i = 0; i < 160; i++){ const x = r() * 256, v = r(); g.strokeStyle = v < 0.5 ? `rgba(30,16,8,${0.25 + r() * 0.3})` : `rgba(140,95,55,${0.15 + r() * 0.2})`; g.lineWidth = 0.6 + r() * 2; g.beginPath(); g.moveTo(x, 0); for (let y = 0; y <= 512; y += 32) g.lineTo(x + Math.sin(y * 0.02 + i) * 4 + (r() - 0.5) * 2, y); g.stroke(); }
    for (let i = 0; i < 6; i++){ const x = r() * 256, y = r() * 512; g.strokeStyle = 'rgba(25,12,6,0.6)'; for (let k = 1; k < 5; k++){ g.lineWidth = 1; g.beginPath(); g.ellipse(x, y, k * 3, k * 7, 0, 0, 7); g.stroke(); } }
    noise(g, r, 256, 512, 3000, 0.25);
  }, 31);
  // đá xanh: khối đá xẻ, mạch vữa, rêu chân
  const stone = tex(512, 256, (g, r) => {
    g.fillStyle = '#4e4a44'; g.fillRect(0, 0, 512, 256);
    for (let y = 0; y < 256; y += 64) for (let x = (y / 64 % 2) * 48; x < 560; x += 96){ const v = 105 + r() * 45 | 0; g.fillStyle = `rgb(${v},${v - 2},${v - 8})`; g.fillRect(x - 48 + 3, y + 3, 90, 58); }
    stains(g, r, 512, 256, 40, '60,70,45', 0.35); noise(g, r, 512, 256, 6000, 0.35); noise(g, r, 512, 256, 2000, 0.25, false);
  }, 41);
  // gạch nung trần: hàng gạch so le, mạch vữa xám
  const brick = tex(512, 512, (g, r) => {
    g.fillStyle = '#8a8070'; g.fillRect(0, 0, 512, 512);
    for (let y = 0; y < 512; y += 24) for (let x = (y / 24 % 2) * 32; x < 560; x += 64){ const b = 120 + r() * 50; g.fillStyle = `rgb(${b | 0},${b * 0.45 | 0},${b * 0.3 | 0})`; g.fillRect(x - 32 + 2, y + 2, 60, 20); }
    stains(g, r, 512, 512, 50, '40,35,30', 0.3); stains(g, r, 512, 512, 25, '70,85,50', 0.3); noise(g, r, 512, 512, 8000, 0.3);
  }, 51);
  const M = (t: { map: THREE.Texture; bump: THREE.Texture }, rough: number, bump: number, color = 0xffffff) => new THREE.MeshStandardMaterial({ map: t.map, bumpMap: t.bump, bumpScale: bump, roughness: rough, color });
  return { plaster, tiles, wood, stone, brick,
    plasterM: M(plaster, 0.95, 1.2), tilesM: M(tiles, 0.85, 2.5), woodM: M(wood, 0.75, 1.5), stoneM: M(stone, 0.9, 2), brickM: M(brick, 0.9, 2),
    lacquer: new THREE.MeshStandardMaterial({ color: 0x7a1410, roughness: 0.35, metalness: 0.1 }), gold: new THREE.MeshStandardMaterial({ color: 0xc8962a, roughness: 0.3, metalness: 0.85 }),
    iron: new THREE.MeshStandardMaterial({ color: 0x2a2826, roughness: 0.5, metalness: 0.7 }), glaze: new THREE.MeshStandardMaterial({ color: 0x5a3a24, roughness: 0.25, metalness: 0.05 }) };
}

// Hộp có vân lặp theo kích thước thật (không bị kéo giãn): mỗi mét một ô vân
function tbox(w: number, h: number, d: number, mat: THREE.MeshStandardMaterial, per = 1.6){
  const g = new THREE.BoxGeometry(w, h, d), uv = g.attributes.uv as THREE.BufferAttribute;
  // 6 mặt × 4 đỉnh: +x, -x, +y, -y, +z, -z
  const dims = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) for (let k = 0; k < 4; k++){ const i = f * 4 + k; uv.setXY(i, uv.getX(i) * dims[f][0] / per, uv.getY(i) * dims[f][1] / per); }
  const m = new THREE.Mesh(g, mat); m.castShadow = true; m.receiveShadow = true;
  return m;
}

export class BaseView {
  readonly group = new THREE.Group();
  readonly team: TeamKey;
  private doors: THREE.Object3D[] = [];
  private gate = new THREE.Group();
  private roof = new THREE.Group();
  private house = new THREE.Group();
  private flags: THREE.Mesh[] = [];
  private spawnRing: THREE.Mesh;
  private gateFrac = 1; private houseFrac = 1; private gateDown = false; private houseDown = false;
  private fallT = 0; private gateFallT = 0;

  constructor(team: TeamKey){
    this.team = team;
    const T = (MATS ??= makeMaterials()), tc = TEAM_INFO[team].color, dir = TEAM_INFO[team].dir;
    const H = BASES[team].house, G = BASES[team].gate, S = BASES[team].spawn;
    const add = (o: THREE.Object3D, p: THREE.Object3D, x: number, y: number, z: number) => { o.position.set(x, y, z); p.add(o); return o; };
    const cyl = (r0: number, r1: number, h: number, mat: THREE.Material, seg = 16) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(r0, r1, h, seg), mat); m.castShadow = true; m.receiveShadow = true; return m; };

    /* ----------------------------------------------- nhà ba gian (dựng theo trục z, mặt tiền +z) */
    this.house.position.set(H.x, 0, H.z); this.house.rotation.y = dir * Math.PI / 2;
    this.group.add(this.house);
    const hs = this.house;
    add(tbox(6.2, 0.55, 5.2, T.stoneM, 1.2), hs, 0, 0.27, 0);                                             // nền đá
    for (let i = 0; i < 2; i++) add(tbox(2.2 - i * 0.3, 0.18, 0.4, T.stoneM, 1.2), hs, 0, 0.09 + i * 0.18 - 0.0, 2.75 - i * 0.3 + 0.2);   // bậc tam cấp
    add(tbox(5.2, 2.6, 3.4, T.plasterM, 2.2), hs, 0, 1.85, -0.35);                                        // tường hậu, hồi
    // cửa bức bàn ba gian ở mặt tiền (lùi vào trong hiên)
    for (let b = -1; b <= 1; b++){
      add(tbox(1.5, 2.25, 0.08, T.woodM, 1), hs, b * 1.62, 1.68, 1.36);
      for (let k = 0; k < 4; k++) add(tbox(0.05, 2.25, 0.1, T.woodM, 1), hs, b * 1.62 - 0.56 + k * 0.37, 1.68, 1.41);
      add(tbox(1.5, 0.07, 0.11, T.woodM, 1), hs, b * 1.62, 2.1, 1.41);
      add(tbox(1.5, 0.07, 0.11, T.woodM, 1), hs, b * 1.62, 1.05, 1.41);
    }
    // cột gỗ trên chân tảng đá, xà hiên
    for (const x of [-2.5, -0.82, 0.82, 2.5]){ add(cyl(0.17, 0.19, 2.75, T.woodM), hs, x, 1.95, 2.15); add(cyl(0.3, 0.34, 0.22, T.stoneM, 12), hs, x, 0.66, 2.15); }
    add(tbox(5.8, 0.24, 0.28, T.woodM, 1.4), hs, 0, 3.3, 2.15);
    add(tbox(5.8, 0.16, 0.2, T.woodM, 1.4), hs, 0, 2.95, 2.15);
    // mái ngói: hai mái dốc vươn ra thành hiên, diềm gỗ, bờ nóc, đầu đao cong
    this.roof.position.y = 3.35; hs.add(this.roof);
    for (const s of [-1, 1]){
      const slope = tbox(6.8, 0.16, 3.25, T.tilesM, 1.1); slope.position.set(0, 0.88, s * 1.36 - 0.1); slope.rotation.x = s * 0.56; this.roof.add(slope);
      const fascia = tbox(6.8, 0.14, 0.08, T.woodM, 1); fascia.position.set(0, 0.03, s * 2.8 - 0.1); fascia.rotation.x = s * 0.56; this.roof.add(fascia);
    }
    // hồi nhà tam giác trát vôi
    for (const sx of [-1, 1]){
      const tri = new THREE.Shape(); tri.moveTo(-1.75, 0); tri.lineTo(1.75, 0); tri.lineTo(0, 1.45); tri.closePath();
      const gm = new THREE.Mesh(new THREE.ExtrudeGeometry(tri, { depth: 0.2, bevelEnabled: false }), T.plasterM); gm.rotation.y = Math.PI / 2; gm.position.set(sx * 2.5 - 0.1, 0, -0.35); gm.castShadow = true; this.roof.add(gm);
      const uv = gm.geometry.attributes.uv as THREE.BufferAttribute; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 2, uv.getY(i) / 2);
    }
    const ridge = tbox(7.0, 0.32, 0.34, T.tilesM, 0.8); ridge.position.set(0, 1.78, -0.1); this.roof.add(ridge);
    const ridgeTop = tbox(6.6, 0.12, 0.2, T.plasterM, 1); ridgeTop.position.set(0, 1.98, -0.1); this.roof.add(ridgeTop);
    for (const s of [-1, 1]){
      // đầu đao: khúc cong vút lên ở hai đầu bờ nóc và bốn góc mái
      const curl = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.1, 8, 14, Math.PI * 0.6), T.tilesM); curl.position.set(s * 3.55, 1.85, -0.1); curl.rotation.set(0, s > 0 ? 0 : Math.PI, 0.25); curl.castShadow = true; this.roof.add(curl);
      for (const sz of [-1, 1]){ const c2 = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.08, 8, 12, Math.PI * 0.55), T.tilesM); c2.position.set(s * 3.45, 0.05, sz * 2.75 - 0.1); c2.rotation.set(0, s > 0 ? 0 : Math.PI, 0.3); this.roof.add(c2); }
    }
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 12), T.gold); pearl.position.set(0, 2.18, -0.1); this.roof.add(pearl);
    // hoành phi sơn son thếp vàng treo dưới hiên
    const board = new THREE.Group(); board.position.set(0, 2.62, 2.32); hs.add(board);
    board.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.78, 0.08), T.lacquer), { castShadow: true }));
    const frame = new THREE.Mesh(new THREE.BoxGeometry(3.04, 0.9, 0.05), T.gold); frame.position.z = -0.02; board.add(frame);
    const text = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 0.66), new THREE.MeshStandardMaterial({ map: signTexture(team), transparent: true, roughness: 0.35, metalness: 0.6 })); text.position.z = 0.045; board.add(text);
    for (const x of [-2.5, 2.5]){
      const l = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), new THREE.MeshStandardMaterial({ color: 0xb81a14, emissive: 0x701008, roughness: 0.5 })); l.scale.y = 1.25; add(l, hs, x, 2.62, 2.35);
      add(cyl(0.12, 0.12, 0.06, T.gold, 12), hs, x, 2.95, 2.35); add(cyl(0.012, 0.012, 0.3, T.iron, 6), hs, x, 3.1, 2.35);
    }
    // chum nước sành bên hiên, chõng tre
    const jar = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 14), T.glaze); jar.scale.set(1, 1.15, 1); jar.castShadow = true; add(jar, hs, -2.85, 1.0, 1.6);
    add(cyl(0.3, 0.32, 0.06, T.woodM, 16), hs, -2.85, 1.48, 1.6);
    add(tbox(1.6, 0.06, 0.7, T.woodM, 0.6), hs, 2.4, 0.95, 1.55);
    for (const [x, z] of [[1.7, 1.3], [3.1, 1.3], [1.7, 1.8], [3.1, 1.8]]) add(cyl(0.035, 0.035, 0.4, T.woodM, 6), hs, x, 0.75, z);

    // cột cờ hai bên nhà, cờ màu phe
    for (const z of [-3.7, 3.7]){
      add(cyl(0.06, 0.08, 6, T.woodM, 10), this.group, H.x + dir * 1.2, 3, H.z + z);
      add(cyl(0.18, 0.22, 0.3, T.stoneM, 10), this.group, H.x + dir * 1.2, 0.15, H.z + z);
      const f = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.9, 10, 4), new THREE.MeshStandardMaterial({ color: tc, side: THREE.DoubleSide, roughness: 0.8 }));
      f.position.set(H.x + dir * 1.2 - dir * 0.7, 5.5, H.z + z); f.castShadow = true; this.group.add(f); this.flags.push(f);
    }
    // trống trận trên giá gỗ
    const drum = cyl(0.55, 0.55, 0.8, new THREE.MeshStandardMaterial({ color: 0xa8201a, roughness: 0.4 }), 24); drum.rotation.z = Math.PI / 2; add(drum, this.group, H.x + dir * 1.8, 0.95, H.z + 4.1);
    for (const sx of [-0.42, 0.42]){ const skin = new THREE.Mesh(new THREE.CircleGeometry(0.5, 24), new THREE.MeshStandardMaterial({ color: 0xdcc8a0, roughness: 0.9 })); skin.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2; add(skin, this.group, H.x + dir * 1.8 + sx, 0.95, H.z + 4.1); }
    add(tbox(1.1, 0.55, 0.8, T.woodM, 0.8), this.group, H.x + dir * 1.8, 0.27, H.z + 4.1);

    /* ----------------------------------------------- cổng làng */
    this.gate.position.set(G.x, 0, G.z); this.gate.rotation.y = dir * Math.PI / 2; this.group.add(this.gate);
    for (const x of [-1.45, 1.45]){
      add(tbox(0.62, 3.4, 0.62, T.brickM, 1), this.gate, x, 1.7, 0);
      add(tbox(0.8, 0.22, 0.8, T.plasterM, 0.8), this.gate, x, 3.5, 0);
      add(tbox(0.75, 0.3, 0.75, T.stoneM, 0.8), this.gate, x, 0.15, 0);
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), T.plasterM); add(cap, this.gate, x, 3.75, 0);
    }
    add(tbox(3.6, 0.3, 0.55, T.woodM, 1), this.gate, 0, 3.25, 0);
    for (const s of [-1, 1]){ const r = tbox(4.2, 0.12, 0.85, T.tilesM, 0.9); r.position.set(0, 3.62, s * 0.33); r.rotation.x = s * 0.6; this.gate.add(r); }
    add(tbox(4.3, 0.18, 0.2, T.tilesM, 0.8), this.gate, 0, 3.88, 0);
    for (const s of [-1, 1]){ const c = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.07, 8, 12, Math.PI * 0.6), T.tilesM); c.position.set(s * 2.2, 3.95, 0); c.rotation.set(0, s > 0 ? 0 : Math.PI, 0.25); this.gate.add(c); }
    const plaque = new THREE.Group(); plaque.position.set(0, 2.85, 0.32); this.gate.add(plaque);
    plaque.add(new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.42, 0.06), T.lacquer));
    const pt = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.34), new THREE.MeshStandardMaterial({ map: signTexture(team), transparent: true, roughness: 0.35, metalness: 0.6 })); pt.position.z = 0.035; plaque.add(pt);
    for (const s of [-1, 1]){
      const hinge = new THREE.Group(); hinge.position.set(s * 1.13, 0, 0); this.gate.add(hinge);
      add(tbox(1.12, 2.55, 0.14, T.woodM, 1), hinge, -s * 0.57, 1.3, 0);
      for (const y of [0.5, 1.3, 2.1]) add(tbox(1.12, 0.12, 0.18, T.woodM, 1), hinge, -s * 0.57, y, 0.02);
      for (const y of [0.5, 1.3, 2.1]) for (let k = 0; k < 4; k++){ const st = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), T.iron); add(st, hinge, -s * (0.15 + k * 0.27), y, 0.12); }
      this.doors.push(hinge);
    }
    // tường gạch thấp hai bên cổng, có mũ trát vữa
    for (const sz of [-1, 1]){ add(tbox(0.5, 1.2, 2.2, T.brickM, 1), this.group, G.x, 0.6, G.z + sz * 2.45); add(tbox(0.62, 0.14, 2.3, T.plasterM, 1), this.group, G.x, 1.27, G.z + sz * 2.45); }
    // vòng sinh quân
    this.spawnRing = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.5, 36).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: tc, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    this.spawnRing.position.set(S.x, 0.04, S.z); this.group.add(this.spawnRing);
  }

  set(h: TeamHud){
    this.gateFrac = h.gateMax ? h.gateHp / h.gateMax : 1; this.houseFrac = h.houseMax ? h.houseHp / h.houseMax : 1;
    const gd = h.gateHp <= 0, hd = h.houseHp <= 0;
    if (gd !== this.gateDown){ this.gateDown = gd; this.gateFallT = 0; }
    if (hd !== this.houseDown){ this.houseDown = hd; this.fallT = 0; }
  }

  update(dt: number, t: number, fx: Fx, spawning: number){
    const H = BASES[this.team].house, G = BASES[this.team].gate;
    // cờ bay: gợn sóng theo gió
    this.flags.forEach((f, i) => {
      const p = f.geometry.attributes.position as THREE.BufferAttribute;
      for (let k = 0; k < p.count; k++){ const x = p.getX(k) + 0.7; p.setZ(k, Math.sin(t * 4 + x * 3 + i) * 0.12 * x); }
      p.needsUpdate = true;
    });
    (this.spawnRing.material as THREE.MeshBasicMaterial).opacity = 0.45 + 0.3 * Math.sin(t * 3) + Math.min(0.4, spawning * 0.1);
    // cổng: cánh xệ theo máu, vỡ thì đổ rạp
    this.gateFallT += dt;
    const sag = (1 - this.gateFrac) * 0.35;
    this.doors.forEach((d, i) => {
      const s = i ? 1 : -1;
      if (this.gateDown){ const k = Math.min(1, this.gateFallT / 0.6); d.rotation.set(-k * 1.45, 0, 0); d.position.y = -k * 0.05; }
      else { d.rotation.set(0, s * sag * 0.6, s * sag * 0.15); d.position.y = 0; }
    });
    this.gate.rotation.z = this.gateDown ? Math.min(1, this.gateFallT / 0.8) * 0.12 : 0;
    if (this.gateFrac < 0.4 && !this.gateDown && Math.random() < dt * 4) fx.smoke(G.x, 2.5, G.z, 0x5a5450);
    // nhà chính: khói, lửa, sập mái
    if (this.houseFrac < 0.5 && Math.random() < dt * (this.houseFrac < 0.25 ? 14 : 6)) fx.smoke(H.x, 4.6, H.z, this.houseFrac < 0.25 ? 0x2a2624 : 0x5a5450);
    if (this.houseFrac < 0.25 && Math.random() < dt * 30) fx.fire(H.x, 3.5, H.z);
    this.fallT += dt;
    if (this.houseDown){
      const k = Math.min(1, this.fallT / 1.2);
      this.roof.position.y = 3.35 - k * 2.2; this.roof.rotation.z = k * 0.35; this.roof.rotation.x = k * 0.12;
      if (Math.random() < dt * 20) fx.fire(H.x, 1.2, H.z);
    } else { this.roof.position.y = 3.35; this.roof.rotation.set(0, 0, 0); }
  }
}

// Chữ thếp vàng trên nền trong suốt (đặt lên hoành phi sơn son)
function signTexture(team: TeamKey){
  const c = document.createElement('canvas'); c.width = 512; c.height = 128;
  const g = c.getContext('2d')!, T = TEAM_INFO[team];
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = 'bold 76px "Noto Serif", "Times New Roman", Georgia, serif';
  const gr = g.createLinearGradient(0, 20, 0, 108); gr.addColorStop(0, '#fff0b0'); gr.addColorStop(0.5, '#e0b040'); gr.addColorStop(1, '#a87818');
  g.shadowColor = 'rgba(40,0,0,0.6)'; g.shadowBlur = 4; g.shadowOffsetY = 2;
  g.fillStyle = gr; g.fillText(T.name.toUpperCase(), 256, 68);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

// Có tài nguyên HD: thay vân vẽ tay bằng vân PBR thật (màu, pháp tuyến, độ nhám) cho vôi, ngói, gỗ, đá, gạch của mọi căn cứ
export function applyBaseHD(hd: { tex: Map<string, { map: THREE.Texture; normal?: THREE.Texture; rough?: THREE.Texture }> }){
  const T = (MATS ??= makeMaterials());
  const set = (m: THREE.MeshStandardMaterial, key: string, color = 0xffffff, rough = 1) => {
    const t = hd.tex.get(key); if (!t) return;
    m.map = t.map; m.normalMap = t.normal ?? null; m.roughnessMap = t.rough ?? null; m.bumpMap = null; m.color.setHex(color); m.roughness = rough; m.needsUpdate = true;
  };
  set(T.plasterM, 'plaster', 0xf2e2bc); set(T.tilesM, 'roof', 0xd8a088, 0.9); set(T.woodM, 'wood', 0xc89a70, 0.85);
  set(T.stoneM, 'stone', 0xc8c4bc); set(T.brickM, 'brick', 0xffffff);
}
