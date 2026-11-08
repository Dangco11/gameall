import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { PORCH, ROAD_Y, ROOM, STREET, WALK_Y } from './layout.ts';
import { M, box, cyl, instances, led, mat4 } from './mats.ts';
import { asphalt, nightSky, neonText, pavers, softDot, windows } from './tex.ts';

// Cảnh phố đêm quanh quán: mặt tiền đá đen có chữ BAR nổi 3D phát sáng, mái hiên kính, cửa kính, bậc thềm, thảm đỏ, dây nhung;
// vỉa hè lát gạch, cây xanh, đèn đường; mặt đường nhựa ướt phản chiếu đèn, vạch kẻ, xe chạy; bãi đỗ xe bên hông;
// dãy nhà phố, khách sạn, biển hiệu neon bên kia đường; xa xa là các toà cao tầng sáng đèn và bầu trời đêm.

// Chữ khối B, A, R vẽ bằng đường nét (không cần file phông): cao 1, đùn sâu thành chữ nổi
function letterShape(ch: 'B' | 'A' | 'R'){
  const s = new THREE.Shape(), h = (pts: [number, number][], arc?: [number, number, number, number, number]) => { const p = new THREE.Path(); p.moveTo(...pts[0]); for (const q of pts.slice(1)) p.lineTo(...q); if (arc) p.absarc(...arc, false); p.closePath(); s.holes.push(p); };
  if (ch === 'B'){
    s.moveTo(0, 0); s.lineTo(0.44, 0); s.absarc(0.44, 0.255, 0.255, -Math.PI / 2, Math.PI / 2, false); s.lineTo(0.4, 0.51); s.absarc(0.4, 0.755, 0.245, -Math.PI / 2, Math.PI / 2, false); s.lineTo(0, 1); s.closePath();
    h([[0.17, 0.62], [0.4, 0.62]], [0.4, 0.755, 0.135, -Math.PI / 2, Math.PI / 2]);
    h([[0.17, 0.13], [0.44, 0.13]], [0.44, 0.255, 0.125, -Math.PI / 2, Math.PI / 2]);
  } else if (ch === 'A'){
    s.moveTo(0, 0); s.lineTo(0.18, 0); s.lineTo(0.245, 0.22); s.lineTo(0.535, 0.22); s.lineTo(0.6, 0); s.lineTo(0.78, 0); s.lineTo(0.48, 1); s.lineTo(0.3, 1); s.closePath();
    h([[0.29, 0.37], [0.49, 0.37], [0.39, 0.72]]);
  } else {
    s.moveTo(0, 0); s.lineTo(0.17, 0); s.lineTo(0.17, 0.4); s.lineTo(0.3, 0.4); s.lineTo(0.54, 0); s.lineTo(0.74, 0); s.lineTo(0.48, 0.43);
    s.absarc(0.42, 0.7, 0.3, -Math.PI / 2 + 0.3, Math.PI / 2, false); s.lineTo(0, 1); s.closePath();
    h([[0.17, 0.55], [0.42, 0.55]], [0.42, 0.7, 0.15, -Math.PI / 2, Math.PI / 2]);
  }
  return s;
}

interface Car { g: THREE.Group; lane: number; speed: number; x: number }

export class City {
  readonly group = new THREE.Group();
  readonly sky: THREE.Mesh;
  private signs: { m: THREE.MeshBasicMaterial; k: number; ph: number }[] = [];
  private letters: THREE.MeshStandardMaterial[] = [];
  private cars: Car[] = [];
  private glow: THREE.Light[] = [];

  constructor(){
    const m = M(), g = this.group;
    // bầu trời
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(400, 48, 24), new THREE.MeshBasicMaterial({ map: nightSky(), side: THREE.BackSide, depthWrite: false, fog: false }));
    this.sky.renderOrder = -10; g.add(this.sky);
    const moon = new THREE.Mesh(new THREE.CircleGeometry(6, 40), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 1.55, 1.4), fog: false })); moon.position.set(-120, 140, 260); moon.lookAt(0, 0, 0); g.add(moon);
    this.facade(m, g);
    this.street(m, g);
    this.parking(m, g);
    this.blocks(m, g);
    this.skyline(g);
  }

  /* ---------------------------------------------------------- mặt tiền quán */
  private facade(m: ReturnType<typeof M>, g: THREE.Group){
    const fz = ROOM.z1 + 0.16, W = ROOM.x1 - ROOM.x0;
    // khối nhà hai tầng: tầng trên ốp đá đen kẻ chỉ LED dọc, cửa sổ kính tối
    box(W + 0.6, 6, 0.3, m.stoneWall, 0, ROOM.h + 3, fz, g);
    for (let x = -12; x <= 12; x += 3) box(0.04, 5.6, 0.04, led(0xffc070, 2.2), x, ROOM.h + 3, fz + 0.17, g).castShadow = false;
    box(W + 0.8, 0.25, 0.5, m.brass, 0, ROOM.h + 6, fz, g);
    // hai bên hông và mái
    for (const s of [-1, 1]) box(0.3, 13, 22.4, m.stoneWall, s * (W / 2 + 0.3), 6.5, -1, g);
    box(W + 0.9, 0.4, 22.6, m.concrete, 0, 13.2, -1, g);
    // ốp đá quanh cửa, mái hiên kính khung thép, đèn hắt
    box(6.4, 3.4, 0.2, m.marbleBlack, 0, 1.7 + 3.5 - 1.7, fz + 0.05, g).position.y = 5.1;
    const can = new THREE.Group(); can.position.set(0, 3.35, fz); g.add(can);
    box(6.0, 0.1, 2.6, m.darkSteel, 0, 0, 1.3, can);
    const pane = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.03, 2.5), m.smoked); pane.position.set(0, 0.07, 1.3); can.add(pane);
    box(6.0, 0.04, 0.04, led(0xffd080, 4), 0, -0.07, 2.58, can).castShadow = false;
    for (const s of [-1, 1]){ const rod = cyl(0.02, 0.02, 3.0, m.chrome, s * 2.8, 1.25, 1.4, can, 8); rod.rotation.x = -0.75; }
    // đèn âm dưới mái hiên rọi xuống thảm
    const dn = new THREE.SpotLight(0xffd8b0, 40, 9, 0.7, 0.6, 1.3); dn.position.set(0, 3.25, fz + 1.4); dn.target.position.set(0, 0, fz + 1.6); g.add(dn, dn.target); this.glow.push(dn);
    // chữ BAR nổi khối: mặt chữ phát sáng hồng, thành chữ mạ vàng, đặt trên ốp đá phía trên cửa
    const face = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xff2fa8, emissiveIntensity: 4.5, roughness: 0.3 });
    const side = new THREE.MeshPhysicalMaterial({ color: 0xffc860, metalness: 1, roughness: 0.25, emissive: 0x401000, emissiveIntensity: 0.3 });
    this.letters.push(face);
    const H = 1.55, xs = [-1.85, -0.55, 0.85];
    (['B', 'A', 'R'] as const).forEach((ch, i) => {
      const geo = new THREE.ExtrudeGeometry(letterShape(ch), { depth: 0.22, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.02, bevelSegments: 3, curveSegments: 18 });
      const mesh = new THREE.Mesh(geo, [face, side]); mesh.scale.set(H, H, 1); mesh.position.set(xs[i], 4.15, fz + 0.18); mesh.castShadow = true; g.add(mesh);
    });
    // quầng sáng sau chữ và đèn hắt màu hồng lên tường
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 3.2), new THREE.MeshBasicMaterial({ map: softDot(), color: new THREE.Color(1.2, 0.2, 0.7), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
    halo.position.set(-0.1, 4.9, fz + 0.17); g.add(halo);
    const pink = new THREE.PointLight(0xff3ab0, 25, 12, 1.6); pink.position.set(0, 4.9, fz + 1.2); g.add(pink); this.glow.push(pink);
    // chữ ONLINE neon nhỏ bên dưới, dòng giờ mở cửa
    const on = neonText('ONLINE', '#5ad8ff', '800 120px "Segoe UI", Arial, sans-serif');
    const om = new THREE.MeshBasicMaterial({ map: on.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2, 2, 2) });
    const ol = new THREE.Mesh(new THREE.PlaneGeometry(0.55 * on.aspect, 0.55), om); ol.position.set(0, 3.73, fz + 0.2); g.add(ol);
    this.signs.push({ m: om, k: 2, ph: 1 });
    // bậc thềm đá, thảm đỏ, dây nhung, chậu cây hai bên cửa, đèn tường
    box(8.4, 0.5, PORCH.z - ROOM.z1 + 0.1, m.marbleBlack, 0, -0.25, (ROOM.z1 + PORCH.z) / 2, g);
    const steps = 2, sd = (PORCH.steps - PORCH.z) / steps;
    for (let k = 0; k < steps; k++){ const top = -WALK_Y * (k + 1) / steps; box(8.4, 0.5, sd + 0.02, m.marbleBlack, 0, top - 0.25 + WALK_Y / steps, PORCH.z + sd * (k + 0.5), g); }
    const red = new THREE.MeshPhysicalMaterial({ color: 0x8a0c18, roughness: 0.9, sheen: 1, sheenColor: new THREE.Color(0xff4050) });
    box(2.0, 0.012, PORCH.z - ROOM.z1 - 0.1, red, 0, 0.006, (ROOM.z1 + PORCH.z) / 2 + 0.05, g);
    box(2.0, 0.012, 3.2, red, 0, -WALK_Y + 0.006, PORCH.steps + 1.6, g);
    for (const s of [-1, 1]){
      for (const z of [PORCH.steps + 0.3, PORCH.steps + 3.0]){
        cyl(0.14, 0.16, 0.04, m.gold, s * 1.4, -WALK_Y + 0.02, z, g); cyl(0.022, 0.022, 0.9, m.gold, s * 1.4, -WALK_Y + 0.46, z, g);
        const k = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 8), m.gold); k.position.set(s * 1.4, -WALK_Y + 0.93, z); g.add(k);
      }
      const rope = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(s * 1.4, -WALK_Y + 0.88, PORCH.steps + 0.3), new THREE.Vector3(s * 1.4, -WALK_Y + 0.66, PORCH.steps + 1.65), new THREE.Vector3(s * 1.4, -WALK_Y + 0.88, PORCH.steps + 3.0)]), 20, 0.02, 8);
      g.add(new THREE.Mesh(rope, red));
      // đèn tường hai bên cửa
      const sc = new THREE.Group(); sc.position.set(s * 2.0, 2.4, fz + 0.12); g.add(sc);
      box(0.12, 0.5, 0.12, m.brass, 0, 0, 0.06, sc); box(0.08, 0.36, 0.02, led(0xffc080, 5), 0, 0, 0.13, sc).castShadow = false;
      // chậu cây lớn trên thềm
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.3, 0.8, 24), m.lacquer); pot.position.set(s * 3.4, 0.4, ROOM.z1 + 0.5); g.add(pot);
      for (let i = 0; i < 5; i++){ const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.45 - i * 0.05, 1), m.leaf); b.position.set(s * 3.4 + Math.sin(i * 2) * 0.12, 1.1 + i * 0.35, ROOM.z1 + 0.5 + Math.cos(i * 2) * 0.12); b.castShadow = true; g.add(b); }
    }
    // bục lễ tân ngoài cửa
    const pod = new THREE.Group(); pod.position.set(-2.9, 0, ROOM.z1 + 0.45); pod.rotation.y = 0.35; g.add(pod);
    box(0.6, 1.1, 0.4, m.lacquer, 0, 0.55, 0, pod, 0.02); box(0.64, 0.03, 0.44, m.brass, 0, 1.11, 0, pod);
    box(0.25, 0.01, 0.18, led(0x9ac0ff, 1.5), 0, 1.13, 0, pod).rotation.x = -0.2;
  }

  /* ---------------------------------------------------------- vỉa hè, đường, đèn đường, cây */
  private street(m: ReturnType<typeof M>, g: THREE.Group){
    const pv = pavers(), pm = new THREE.MeshPhysicalMaterial({ map: pv, roughness: 0.6, clearcoat: 0.3, clearcoatRoughness: 0.4 });
    pv.repeat.set(60, 3);
    const walk = new THREE.Mesh(new THREE.BoxGeometry(160, 0.3, STREET.walk1 - PORCH.steps + 0.2), pm); walk.position.set(0, -WALK_Y - 0.15, (PORCH.steps + STREET.walk1) / 2); walk.receiveShadow = true; g.add(walk);
    const walk2 = walk.clone(); walk2.position.z = (STREET.road1 + STREET.far) / 2; walk2.scale.z = (STREET.far - STREET.road1) / (STREET.walk1 - PORCH.steps + 0.2); g.add(walk2);
    // vỉa hè hai bên thềm (ngang thềm thì là bậc)
    for (const s of [-1, 1]){ const w = new THREE.Mesh(new THREE.BoxGeometry(76, 0.3, PORCH.steps - ROOM.z1 - 0.2), pm); w.position.set(s * 42.2, -WALK_Y - 0.15, (ROOM.z1 + PORCH.steps) / 2 + 0.1); g.add(w); }
    // bó vỉa
    for (const z of [STREET.road0, STREET.road1]) box(160, 0.2, 0.25, m.concrete, 0, -ROAD_Y + 0.07, z, g);
    // mặt đường nhựa ướt
    const as = asphalt();
    as.map.repeat.set(30, 2); as.rough.repeat.set(30, 2);
    const road = new THREE.Mesh(new THREE.PlaneGeometry(160, STREET.road1 - STREET.road0).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({ map: as.map, roughnessMap: as.rough, roughness: 1, metalness: 0.0, clearcoat: 0.45, clearcoatRoughness: 0.2 }));
    road.position.set(0, -ROAD_Y, (STREET.road0 + STREET.road1) / 2); road.receiveShadow = true; g.add(road);
    // vạch kẻ: vạch giữa nét đứt, vạch biên, vạch qua đường
    const paint = new THREE.MeshStandardMaterial({ color: 0xe8e4d8, roughness: 0.6 });
    const mid = (STREET.road0 + STREET.road1) / 2, dash: THREE.Matrix4[] = [];
    for (let x = -78; x < 78; x += 4) dash.push(mat4(x, -ROAD_Y + 0.005, mid));
    instances(new THREE.PlaneGeometry(2, 0.14).rotateX(-Math.PI / 2), paint, dash, undefined, g).castShadow = false;
    for (const z of [STREET.road0 + 0.4, STREET.road1 - 0.4]){ const l = new THREE.Mesh(new THREE.PlaneGeometry(160, 0.12).rotateX(-Math.PI / 2), paint); l.position.set(0, -ROAD_Y + 0.005, z); g.add(l); }
    const zebra: THREE.Matrix4[] = [];
    for (let i = 0; i < 9; i++) zebra.push(mat4(-9 - 1.6 + i * 0.4, -ROAD_Y + 0.006, mid));
    instances(new THREE.PlaneGeometry(0.22, STREET.road1 - STREET.road0 - 1.2).rotateX(-Math.PI / 2), paint, zebra, undefined, g).castShadow = false;
    // đèn đường: cột thép, đầu đèn sáng, quầng sáng mềm; ba cột gần quán có đèn chiếu thật
    const lamps: [number, number, number][] = [];
    for (let x = -54; x <= 54; x += 12){ lamps.push([x, STREET.walk1 - 0.5, Math.PI]); lamps.push([x + 6, STREET.road1 + 0.5, 0]); }
    instances(new THREE.CylinderGeometry(0.07, 0.1, 6.5, 10), m.darkSteel, lamps.map(([x, z]) => mat4(x, -WALK_Y + 3.25, z)), undefined, g);
    instances(new THREE.BoxGeometry(0.08, 0.08, 1.6), m.darkSteel, lamps.map(([x, z, r]) => mat4(x, -WALK_Y + 6.45, z + (r ? 0.75 : -0.75))), undefined, g);
    instances(new THREE.BoxGeometry(0.42, 0.06, 0.24), led(0xffd9a0, 9), lamps.map(([x, z, r]) => mat4(x, -WALK_Y + 6.38, z + (r ? 1.45 : -1.45))), undefined, g).castShadow = false;
    const halo = new THREE.SpriteMaterial({ map: softDot(), color: new THREE.Color(1.0, 0.75, 0.45), transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
    for (const [x, z, r] of lamps){ const s = new THREE.Sprite(halo); s.position.set(x, -WALK_Y + 6.2, z + (r ? 1.45 : -1.45)); s.scale.setScalar(2.6); g.add(s); }
    for (const x of [-6]){ const l = new THREE.SpotLight(0xffc890, 90, 20, 1.0, 0.5, 1.5); l.position.set(x, -WALK_Y + 6.3, STREET.walk1 + 0.95); l.target.position.set(x, -ROAD_Y, STREET.walk1 + 1.5); g.add(l, l.target); this.glow.push(l); }
    // hàng cây vỉa hè: thân gỗ, tán lá nhiều khối
    const trees: [number, number][] = [];
    for (let x = -60; x <= 60; x += 12) if (Math.abs(x) > 4) trees.push([x + 6, STREET.walk1 - 1.0]);
    for (let x = -60; x <= 60; x += 12) trees.push([x, STREET.road1 + 1.6]);
    instances(new THREE.CylinderGeometry(0.12, 0.18, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x3a2a1c, roughness: 0.9 }), trees.map(([x, z]) => mat4(x, -WALK_Y + 1.6, z)), undefined, g);
    const blob: THREE.Matrix4[] = [];
    trees.forEach(([x, z], i) => { for (let k = 0; k < 7; k++){ const a = k * 2.4 + i; blob.push(mat4(x + Math.cos(a) * 0.8, -WALK_Y + 3.6 + (k % 3) * 0.55, z + Math.sin(a) * 0.8, a, 0.8 + (k % 2) * 0.35)); } });
    // tán lá: gộp đỉnh trùng để pháp tuyến mượt (không lộ mặt đa giác), rồi đẩy lồi lõm như chùm lá
    const ico = new THREE.IcosahedronGeometry(1, 5); ico.deleteAttribute('normal'); ico.deleteAttribute('uv');
    const crown = mergeVertices(ico), cp = crown.attributes.position as THREE.BufferAttribute, q = new THREE.Vector3();
    for (let i = 0; i < cp.count; i++){ q.fromBufferAttribute(cp, i); const n = 1 + Math.sin(q.x * 7.1) * Math.cos(q.y * 6.3) * Math.sin(q.z * 5.7) * 0.16 + Math.sin(q.x * 17 + q.z * 13) * 0.05; cp.setXYZ(i, q.x * n, q.y * n * 0.85, q.z * n); }
    crown.computeVertexNormals();
    instances(crown, new THREE.MeshPhysicalMaterial({ color: 0x1c3a1c, roughness: 0.8, sheen: 0.6, sheenColor: new THREE.Color(0x5a9050) }), blob, undefined, g);
    // xe chạy trên đường: hai làn ngược chiều
    const paints = [0x101014, 0xe8e8ea, 0x8a0c14, 0x1a3a7a, 0x5a5a60, 0x2a2a2e];
    for (let i = 0; i < 4; i++){
      const lane = i % 2, car = this.car(m, paints[(i * 3 + 1) % paints.length]);
      car.position.set(0, -ROAD_Y, lane ? STREET.road0 + 2.2 : STREET.road1 - 2.2); car.rotation.y = lane ? Math.PI / 2 : -Math.PI / 2; g.add(car);
      this.cars.push({ g: car, lane, speed: 9 + i * 1.7, x: -70 + i * 37 });
    }
  }

  // xe hơi: thân bo tròn sơn bóng, cabin kính, bánh xe, đèn pha, đèn hậu
  car(m: ReturnType<typeof M>, color: number){
    const c = new THREE.Group();
    const paint = new THREE.MeshPhysicalMaterial({ color, metalness: 0.6, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05 });
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.86, 0.62, 4.5, 4, 0.18), paint); body.position.y = 0.58; c.add(body);
    const cab = new THREE.Mesh(new RoundedBoxGeometry(1.66, 0.58, 2.3, 4, 0.22), m.smoked); cab.position.set(0, 1.12, -0.25); c.add(cab);
    const roof = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.06, 1.7, 2, 0.03), paint); roof.position.set(0, 1.42, -0.3); c.add(roof);
    const wheel = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 24).rotateZ(Math.PI / 2), rim = new THREE.CylinderGeometry(0.22, 0.22, 0.27, 16).rotateZ(Math.PI / 2);
    for (const [x, z] of [[-0.86, 1.45], [0.86, 1.45], [-0.86, -1.45], [0.86, -1.45]]){ const w = new THREE.Mesh(wheel, m.rubber); w.position.set(x, 0.36, z); c.add(w); const r = new THREE.Mesh(rim, m.chrome); r.position.set(x, 0.36, z); c.add(r); }
    for (const s of [-1, 1]){
      box(0.4, 0.1, 0.05, led(0xf0f4ff, 6), s * 0.6, 0.7, 2.25, c).castShadow = false;
      box(0.42, 0.08, 0.05, led(0xff1020, 4), s * 0.6, 0.72, -2.25, c).castShadow = false;
    }
    c.traverse(o => { (o as THREE.Mesh).castShadow = true; });
    return c;
  }

  /* ---------------------------------------------------------- bãi đỗ xe bên hông quán */
  private parking(m: ReturnType<typeof M>, g: THREE.Group){
    const x0 = ROOM.x1 + 0.8, x1 = 34, z0 = -10, z1 = PORCH.steps;
    const lot = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0).rotateX(-Math.PI / 2), new THREE.MeshPhysicalMaterial({ color: 0x2a2a2e, roughness: 0.75, clearcoat: 0.25 }));
    lot.position.set((x0 + x1) / 2, -WALK_Y + 0.01, (z0 + z1) / 2); lot.receiveShadow = true; g.add(lot);
    const paint = new THREE.MeshStandardMaterial({ color: 0xf2f2f2, roughness: 0.6 }), lines: THREE.Matrix4[] = [];
    for (let x = x0 + 1; x <= x1 - 1; x += 2.8) lines.push(mat4(x, -WALK_Y + 0.02, z0 + 3));
    instances(new THREE.PlaneGeometry(0.1, 5).rotateX(-Math.PI / 2), paint, lines, undefined, g).castShadow = false;
    const paints = [0x101014, 0xf0f0f2, 0x7a0a12, 0x1a3a7a, 0x8a8a90, 0x203020, 0xc8a050];
    for (let i = 0; i < 6; i++){
      const car = this.car(m, paints[i]); car.position.set(x0 + 2.4 + i * 2.8, -WALK_Y, z0 + 3); car.rotation.y = i % 2 ? 0 : Math.PI; g.add(car);
    }
    const sign = neonText('P  PARKING', '#4ab0ff', '800 100px "Segoe UI", Arial');
    const sm = new THREE.MeshBasicMaterial({ map: sign.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(1.6, 1.6, 1.6) });
    const s = new THREE.Mesh(new THREE.PlaneGeometry(0.7 * sign.aspect, 0.7), sm); s.position.set(x0 + 2.5, 3.2, z1 - 0.2); g.add(s);
    cyl(0.05, 0.05, 3.2, m.darkSteel, x0 + 2.5, 1.4, z1 - 0.25, g);
    this.signs.push({ m: sm, k: 1.6, ph: 3 });
  }

  /* ---------------------------------------------------------- nhà phố hai bên và bên kia đường */
  private blocks(m: ReturnType<typeof M>, g: THREE.Group){
    const wallM = (key: string, cols: number, rows: number, lit: number) => new THREE.MeshStandardMaterial({ color: 0x15161c, roughness: 0.8, emissive: 0xffffff, emissiveMap: windows(key, cols, rows, lit), emissiveIntensity: 1.6 });
    const bld = (x: number, z: number, w: number, d: number, h: number, key: string, face: 'n' | 's') => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [m.concrete, m.concrete, m.concrete, m.concrete, face === 's' ? wallM(key, Math.round(w / 1.6), Math.round(h / 3), 0.42) : m.concrete, face === 'n' ? wallM(key, Math.round(w / 1.6), Math.round(h / 3), 0.42) : m.concrete]);
      b.position.set(x, -WALK_Y + h / 2, z); g.add(b);
      return b;
    };
    // bên trái quán (cùng dãy) và sau bãi đỗ xe
    bld(-24, -2, 21, 24, 18, 'L1', 's');
    bld(-44, -2, 18, 24, 32, 'L2', 's');
    bld(42, -4, 16, 28, 24, 'R1', 's');
    bld(58, -4, 16, 28, 40, 'R2', 's');
    // bên kia đường: khách sạn, nhà hàng, karaoke, cửa hàng tiện lợi với biển neon
    const across: [number, number, number, string][] = [[-48, 14, 46, 'A1'], [-30, 16, 22, 'A2'], [-12, 18, 34, 'A3'], [8, 16, 58, 'A4'], [26, 18, 26, 'A5'], [46, 20, 40, 'A6']];
    for (const [x, w, h, k] of across) bld(x, STREET.far + 8, w, 14, h, k, 'n');
    // tầng trệt sáng đèn cửa hàng
    const shop = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, emissive: 0xffe6c0, emissiveIntensity: 1.2 });
    for (const [x, w] of across) box(w - 1, 3, 0.1, shop, x, -WALK_Y + 1.6, STREET.far + 0.95, g).castShadow = false;
    const SIGNS: [string, string, number, number, number][] = [['HOTEL', '#ffd060', -12, 12, 1.4], ['KARAOKE', '#ff3ab0', -30, 7, 1.0], ['PHỞ 24H', '#ff6a3a', 26, 5.2, 1.0], ['CAFÉ', '#5ad8ff', -48, 6, 1.0], ['MINI MART', '#40ff90', 46, 4.6, 0.8], ['SKY LOUNGE', '#c070ff', 8, 20, 1.4]];
    SIGNS.forEach(([t, c, x, y, s], i) => {
      const n = neonText(t, c);
      const nm = new THREE.MeshBasicMaterial({ map: n.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(1.8, 1.8, 1.8) });
      const p = new THREE.Mesh(new THREE.PlaneGeometry(s * n.aspect, s), nm); p.position.set(x, -WALK_Y + y, STREET.far + 0.9); p.rotation.y = Math.PI; g.add(p);
      this.signs.push({ m: nm, k: 1.8, ph: i * 1.7 });
    });
    // biển neon dọc trên toà nhà bên trái
    const v = neonText('BEER', '#ffb020');
    const vm = new THREE.MeshBasicMaterial({ map: v.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(1.8, 1.8, 1.8) });
    const vp = new THREE.Mesh(new THREE.PlaneGeometry(1.2 * v.aspect, 1.2), vm); vp.position.set(-20, 5, ROOM.z1 + 0.15); g.add(vp);
    this.signs.push({ m: vm, k: 1.8, ph: 5 });
  }

  // các toà cao tầng xa xa: hộp kính sáng đèn, một lệnh vẽ
  private skyline(g: THREE.Group){
    const ms: THREE.Matrix4[] = [], cols: THREE.Color[] = [], o = new THREE.Object3D();
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 160; i++){
      const a = rnd() * Math.PI * 2, r = 80 + rnd() * 140, h = 20 + rnd() * rnd() * 110, w = 8 + rnd() * 16;
      const x = Math.cos(a) * r, z = Math.sin(a) * r;
      if (z > -20 && z < 40 && Math.abs(x) < 70) continue;
      o.position.set(x, h / 2 - WALK_Y, z); o.rotation.set(0, rnd() * Math.PI, 0); o.scale.set(w, h, w * (0.7 + rnd() * 0.6)); o.updateMatrix();
      ms.push(o.matrix.clone()); cols.push(new THREE.Color().setHSL(0.6 + rnd() * 0.1, 0.2, 0.5 + rnd() * 0.5));
    }
    const mat = new THREE.MeshStandardMaterial({ color: 0x0c0d12, roughness: 0.6, emissive: 0xffffff, emissiveMap: windows('far', 10, 30, 0.35), emissiveIntensity: 1.3 });
    const im = instances(new THREE.BoxGeometry(1, 1, 1), mat, ms, cols, g);
    im.castShadow = false; im.receiveShadow = false;
    // đèn đỏ báo máy bay trên đỉnh toà cao
    const tips: THREE.Matrix4[] = [];
    ms.forEach(mm => { const p = new THREE.Vector3(), q = new THREE.Quaternion(), sc = new THREE.Vector3(); mm.decompose(p, q, sc); if (sc.y > 70) tips.push(mat4(p.x, p.y + sc.y / 2 + 0.6, p.z)); });
    if (tips.length) instances(new THREE.SphereGeometry(0.6, 8, 6), led(0xff2020, 8), tips, undefined, g).castShadow = false;
  }

  update(dt: number, t: number, beat: number){
    for (const c of this.cars){
      c.x += c.speed * dt * (c.lane ? 1 : -1);
      if (c.x > 80) c.x = -80; if (c.x < -80) c.x = 80;
      c.g.position.x = c.x;
    }
    for (const s of this.signs){ const f = Math.sin(t * 0.9 + s.ph) > 0.992 ? 0.25 : 1; s.m.color.setScalar(s.k * f); }
    for (const l of this.letters) l.emissiveIntensity = 4.2 + Math.sin(t * 2) * 0.3 + beat * 0.6;
  }
  // chỉ bật đèn ngoài phố khi máy quay ra ngoài (trong quán không cần, đỡ nặng máy)
  private base = new Map<THREE.Light, number>();
  setOutside(on: boolean){ for (const l of this.glow){ if (!this.base.has(l)) this.base.set(l, l.intensity); l.intensity = on ? this.base.get(l)! : 0; } }
}
