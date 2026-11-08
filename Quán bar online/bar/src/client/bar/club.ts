import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildBottle, buildShaker } from './drinks.ts';
import { BACKBAR, BAR_STATIONS, COUNTER, DOOR, HIGH_TABLES, LOUNGES, ROOM, STOOLS, VIP, VIP_BOOTHS } from './layout.ts';
import { M, box, cyl, instances, lathe, led, mat4 } from './mats.ts';
import { neonText } from './tex.ts';

// Nội thất quán: sàn đá bóng, tường đá – gỗ – tiêu âm, trần cao có vòng LED, cột ốp gương, quầy bar đá cẩm thạch với kệ chai
// đèn nền, máy pha cà phê, máy làm đá, bồn rửa, thùng đá, dụng cụ pha chế; ghế quầy, bàn đứng, sofa lounge, khu VIP trên bục
// trải thảm có vách kính, dây nhung, sofa da, bàn kính, đèn chùm pha lê, cây cảnh. Vật lặp lại vẽ bằng InstancedMesh.
export interface Theme { a: THREE.Color; b: THREE.Color }

export class Club {
  readonly group = new THREE.Group();
  private strips: { m: THREE.MeshStandardMaterial; side: 0 | 1; k: number }[] = [];
  private candles: THREE.MeshStandardMaterial[] = [];
  private neon: THREE.MeshBasicMaterial[] = [];
  readonly lights: THREE.Light[] = [];
  readonly counterShakers: THREE.Object3D[] = [];

  constructor(){
    const m = M(), g = this.group;
    this.shell(m, g);
    this.bar(m, g);
    this.stools(m, g);
    this.tables(m, g);
    this.lounges(m, g);
    this.vip(m, g);
    this.plants(m, g);
    this.columns(m, g);
  }

  private strip(color: number, side: 0 | 1, k = 3){ const mt = led(color, k); this.strips.push({ m: mt, side, k }); return mt; }

  /* ---------------------------------------------------------- vỏ phòng */
  private shell(m: ReturnType<typeof M>, g: THREE.Group){
    const W = ROOM.x1 - ROOM.x0, D = ROOM.z1 - ROOM.z0, H = ROOM.h, cx = (ROOM.x0 + ROOM.x1) / 2, cz = (ROOM.z0 + ROOM.z1) / 2;
    // sàn đá bóng (lặp ảnh 3 x 3 tấm mỗi 4 m)
    const fm = m.floor.clone(); for (const t of [fm.map, fm.roughnessMap]) if (t){ t.repeat.set(W / 4, D / 4); }
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D).rotateX(-Math.PI / 2), fm); floor.position.set(cx, 0, cz); floor.receiveShadow = true; floor.name = 'floor'; g.add(floor);
    // trần đen nhám
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D).rotateX(Math.PI / 2), m.matteBlack); ceil.position.set(cx, H, cz); g.add(ceil);
    // tường sau sân khấu: tấm tiêu âm; tường trái: đá; tường phải: lam gỗ óc chó có nẹp đồng
    const ac = m.acoustic.clone(); ac.map = ac.map!.clone(); ac.map.repeat.set(4, 1); ac.map.needsUpdate = true;
    box(W, H, 0.2, ac, cx, H / 2, ROOM.z0 - 0.1, g);
    const st = m.stoneWall.clone(); st.map = st.map!.clone(); st.map.repeat.set(5, 1); st.map.needsUpdate = true;
    box(0.2, H, D, st, ROOM.x0 - 0.1, H / 2, cz, g);
    const wd = m.walnutSlat.clone(); wd.map = wd.map!.clone(); wd.map.repeat.set(6, 1); wd.map.needsUpdate = true;
    box(0.2, H, D, wd, ROOM.x1 + 0.1, H / 2, cz, g);
    for (let z = ROOM.z0 + 1.5; z < ROOM.z1; z += 2.2) box(0.04, H - 0.4, 0.05, m.brass, ROOM.x1 - 0.02, H / 2, z, g);
    // tường trước: khung đen, kính lớn hai bên cửa, ô cửa ra phố có hai cánh kính mở
    const fz = ROOM.z1, half = DOOR.w / 2;
    box(W, 1.2, 0.3, m.lacquer, cx, H - 0.6, fz, g);                                   // dầm trên
    box(W, 0.5, 0.3, m.lacquer, cx, 0.25, fz, g).scale.x = 1;                          // bệ dưới cửa sổ
    for (const s of [-1, 1]){
      const x0 = s * half, x1 = s * (W / 2), w = Math.abs(x1 - x0), mid = (x0 + x1) / 2;
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(w, H - 1.7), m.glass); glass.position.set(mid, 0.5 + (H - 1.7) / 2, fz); g.add(glass);
      for (let k = 0; k <= 5; k++) box(0.12, H - 1.7, 0.14, m.lacquer, x0 + s * k * w / 5, 0.5 + (H - 1.7) / 2, fz, g);   // song cửa
      box(w, 0.1, 0.16, m.brass, mid, 0.52, fz + 0.02, g);
    }
    box(0.3, H, 0.4, m.lacquer, -half - 0.15, H / 2, fz, g); box(0.3, H, 0.4, m.lacquer, half + 0.15, H / 2, fz, g);
    box(DOOR.w + 0.6, 1.0, 0.4, m.lacquer, 0, 3.4, fz, g);                              // lanh tô cửa
    box(DOOR.w + 0.6, 3.0, 0.3, m.lacquer, 0, 5.4, fz, g);
    for (const s of [-1, 1]){
      // cánh cửa kính khung đồng, mở hé ra ngoài
      const leaf = new THREE.Group(); leaf.position.set(s * half, 0, fz + 0.05); leaf.rotation.y = s * 1.15; g.add(leaf);
      const pane = new THREE.Mesh(new THREE.PlaneGeometry(half - 0.05, 2.85), m.smoked); pane.position.set(-s * half / 2, 1.45, 0); leaf.add(pane);
      box(half, 0.06, 0.05, m.brass, -s * half / 2, 2.88, 0, leaf); box(half, 0.06, 0.05, m.brass, -s * half / 2, 0.03, 0, leaf); box(0.05, 2.9, 0.05, m.brass, -s * (half - 0.03), 1.45, 0, leaf);
      cyl(0.016, 0.016, 1.2, m.brass, -s * (half - 0.16), 1.2, 0.07, leaf);              // tay nắm dài
    }
    // thảm chùi chân ở cửa
    box(2.4, 0.015, 1.6, m.carpet, 0, 0.008, fz - 1.0, g);
    // dải LED hắt trần và chân tường (màu theo màn diễn)
    const run = (x: number, z: number, len: number, alongX: boolean, y: number, side: 0 | 1) => box(alongX ? len : 0.05, 0.04, alongX ? 0.05 : len, this.strip(side ? 0xff2fd0 : 0x3a6bff, side, 2.6), x, y, z, g);
    run(cx, ROOM.z0 + 0.06, W, true, H - 0.1, 0); run(ROOM.x0 + 0.06, cz, D, false, H - 0.1, 1); run(ROOM.x1 - 0.06, cz, D, false, H - 0.1, 0);
    run(ROOM.x0 + 0.06, cz, D, false, 0.06, 0); run(ROOM.x1 - 0.06, cz - 6, D - 12, false, 0.06, 1);
    // vòng LED treo trần trên sàn nhảy (giống trần câu lạc bộ cao cấp) và vòm trần tròn
    const fcz = -4.6;
    for (const [r, side, y] of [[3.6, 0, 6.35], [2.5, 1, 6.6], [1.4, 0, 6.8]] as const){
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 10, 96).rotateX(Math.PI / 2), this.strip(side ? 0xff3ac8 : 0x3ad8ff, side as 0 | 1, 3.2));
      ring.position.set(0, y, fcz); g.add(ring);
      for (let k = 0; k < 4; k++){ const a = k * Math.PI / 2 + 0.4; cyl(0.006, 0.006, H - y, m.steel, Math.cos(a) * r, y + (H - y) / 2, fcz + Math.sin(a) * r, g, 4); }
    }
    const dome = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 0.3, 64, 1, true), m.lacquer); dome.position.set(0, H - 0.15, fcz); g.add(dome);
    // đèn âm trần: đĩa sáng ấm nhỏ (một lệnh vẽ)
    const dl: THREE.Matrix4[] = [];
    for (let x = -11; x <= 11; x += 2.2) for (let z = -1; z <= 9; z += 2.2) if (Math.hypot(x, z - fcz) > 4.4) dl.push(mat4(x, H - 0.01, z));
    const disc = new THREE.CircleGeometry(0.07, 20).rotateX(Math.PI / 2);
    instances(disc, led(0xffd8a0, 5), dl, undefined, g).castShadow = false;
    instances(new THREE.RingGeometry(0.07, 0.1, 24).rotateX(Math.PI / 2), m.brass, dl, undefined, g).castShadow = false;
  }

  /* ---------------------------------------------------------- quầy bar */
  private bar(m: ReturnType<typeof M>, g: THREE.Group){
    const L = COUNTER.z1 - COUNTER.z0, cz = (COUNTER.z0 + COUNTER.z1) / 2, dx = COUNTER.front - COUNTER.back, cx = (COUNTER.front + COUNTER.back) / 2;
    // thân quầy: mặt trước lam gỗ, khe LED hắt chân, gác chân bằng đồng
    box(dx, 1.02, L, m.lacquer, cx, 0.51, cz, g);
    const front = m.walnutSlat.clone(); front.map = front.map!.clone(); front.map.repeat.set(L / 1.2, 1); front.map.needsUpdate = true;
    const face = new THREE.Mesh(new THREE.PlaneGeometry(L, 0.86).rotateY(Math.PI / 2), front); face.position.set(COUNTER.front + 0.003, 0.6, cz); g.add(face);
    for (let z = COUNTER.z0 + 0.5; z < COUNTER.z1; z += 1) box(0.02, 0.86, 0.03, m.brass, COUNTER.front + 0.012, 0.6, z, g);
    box(0.03, 0.03, L, this.strip(0xffa040, 1, 3), COUNTER.front + 0.03, 0.12, cz, g);
    box(0.03, 0.03, L, this.strip(0xffc060, 1, 2.2), COUNTER.front + 0.03, 1.02, cz, g);
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, L - 0.2, 20).rotateX(Math.PI / 2), m.brass); rail.position.set(COUNTER.front + 0.22, 0.24, cz); g.add(rail);
    for (let z = COUNTER.z0 + 0.4; z < COUNTER.z1; z += 1.6) box(0.2, 0.025, 0.025, m.brass, COUNTER.front + 0.11, 0.24, z, g);
    // mặt đá cẩm thạch trắng bo cạnh, đầu quầy bo tròn
    const top = m.marbleWhite.clone(); top.map = top.map!.clone(); top.map.repeat.set(1, L / 2); top.map.needsUpdate = true;
    box(dx + 0.22, 0.06, L + 0.1, top, cx + 0.08, COUNTER.top - 0.03, cz, g, 0.025).name = 'countertop';
    // bàn làm việc phía trong (inox) với các trạm pha chế
    box(0.55, 0.04, L - 0.4, m.steel, COUNTER.back - 0.27, 0.88, cz, g);
    for (const s of BAR_STATIONS) this.station(m, g, s.z);
    // vòi bia ba vòi giữa quầy
    const tap = new THREE.Group(); tap.position.set(COUNTER.back + 0.2, COUNTER.top, -4.6); g.add(tap);
    cyl(0.05, 0.06, 0.38, m.chrome, 0, 0.19, 0, tap);
    for (let i = -1; i <= 1; i++){ const h = cyl(0.012, 0.012, 0.1, m.chrome, 0, 0.32, i * 0.08, tap); h.rotation.x = 0; box(0.025, 0.12, 0.025, m.lacquer, -0.02, 0.44, i * 0.08, tap); }
    // tủ sau quầy: mặt đá đen chỉ vàng
    const bd = ROOM.x0 + 0.05;
    box(BACKBAR.counter - bd, BACKBAR.top, L + 1.5, m.lacquer, (BACKBAR.counter + bd) / 2, BACKBAR.top / 2, cz, g);
    box(BACKBAR.counter - bd + 0.05, 0.05, L + 1.55, m.marbleBlack, (BACKBAR.counter + bd) / 2 + 0.025, BACKBAR.top + 0.025, cz, g, 0.02);
    // mảng đá onyx phát sáng sau kệ, kệ kính có viền LED, chai thuỷ tinh nhiều màu
    const wallX = ROOM.x0 + 0.02, shelf0 = BACKBAR.top + 0.35;
    const onyx = m.onyx.clone(); onyx.map = onyx.map!.clone(); onyx.map.repeat.set(L / 3, 1); onyx.emissiveMap = onyx.map; onyx.map.needsUpdate = true;
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(L + 1, 2.6).rotateY(Math.PI / 2), onyx); panel.position.set(wallX + 0.04, BACKBAR.top + 1.4, cz); g.add(panel);
    const levels = [0, 0.46, 0.92, 1.38, 1.84].map(y => shelf0 + y);
    for (const y of levels){
      box(0.34, 0.02, L + 1, m.glass, wallX + 0.2, y, cz, g);
      box(0.012, 0.012, L + 1, this.strip(0xffe0b0, 1, 2.4), wallX + 0.37, y - 0.012, cz, g);
    }
    this.bottles(g, wallX + 0.2, levels, COUNTER.z0 - 0.6, COUNTER.z1 + 0.6);
    // vòm đồng ở giữa kệ (điểm nhấn như quầy khách sạn sang)
    const arch = new THREE.Group(); arch.position.set(wallX + 0.38, 0, -0.9); arch.rotation.y = Math.PI / 2; g.add(arch);
    const ar = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.05, 12, 64, Math.PI), m.gold); ar.position.y = 3.35; arch.add(ar);
    box(0.1, 2.4, 0.1, m.gold, -1.15, 2.15, 0, arch); box(0.1, 2.4, 0.1, m.gold, 1.15, 2.15, 0, arch);
    const archLed = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.015, 8, 64, Math.PI), this.strip(0xffd080, 1, 4)); archLed.position.y = 3.35; arch.add(archLed);
    // trên kệ: chữ neon viết tay
    const n = neonText('Cocktail Bar', '#ff4fb8', 'italic 700 120px "Brush Script MT", "Segoe Script", cursive');
    const nm = new THREE.MeshBasicMaterial({ map: n.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2.2, 2.2, 2.2) });
    this.neon.push(nm);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.62 * n.aspect, 0.62).rotateY(Math.PI / 2), nm); sign.position.set(wallX + 0.06, BACKBAR.top + 3.0, cz + 2.9); g.add(sign);
    // lam gỗ phía trên đến trần
    const up = m.walnutSlat.clone(); up.map = up.map!.clone(); up.map.repeat.set(L / 1.2, 2); up.map.needsUpdate = true;
    const upper = new THREE.Mesh(new THREE.PlaneGeometry(L + 1.5, ROOM.h - 4.3).rotateY(Math.PI / 2), up); upper.position.set(wallX + 0.03, 4.3 + (ROOM.h - 4.3) / 2, cz); g.add(upper);
    // máy móc trên tủ sau: máy pha cà phê, máy xay sinh tố, giá ly; dưới quầy: máy làm đá, bồn rửa
    this.espresso(m, g, BACKBAR.counter - 0.35, -4.6);
    this.iceMachine(m, g, BACKBAR.counter - 0.4, 3.6);
    this.sink(m, g, COUNTER.back - 0.27, -0.6);
    this.glassRack(m, g, BACKBAR.counter - 0.3, -3.0);
    this.glassRack(m, g, BACKBAR.counter - 0.3, 2.3);
    const blender = new THREE.Group(); blender.position.set(BACKBAR.counter - 0.3, BACKBAR.top, 1.0); g.add(blender);
    box(0.16, 0.16, 0.18, m.darkSteel, 0, 0.08, 0, blender, 0.02);
    const jar = lathe([[0.05, 0.17], [0.07, 0.42], [0.072, 0.44]], m.glass); blender.add(jar);
    // giá treo ly ngược trên đầu bartender
    const rackZ0 = COUNTER.z0 + 0.6, rackZ1 = COUNTER.z1 - 0.6, rackX = COUNTER.back - 0.6;
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, rackZ1 - rackZ0, 8).rotateX(Math.PI / 2), m.steel); rod.position.set(rackX, 2.45, cz); g.add(rod);
    for (const z of [rackZ0 + 0.3, cz, rackZ1 - 0.3]) cyl(0.006, 0.006, ROOM.h - 2.45, m.steel, rackX, 2.45 + (ROOM.h - 2.45) / 2, z, g, 4);
    const wine = new THREE.LatheGeometry([[0.03, 0], [0.03, 0.003], [0.004, 0.008], [0.0035, 0.09], [0.012, 0.1], [0.04, 0.15], [0.042, 0.2], [0.038, 0.24]].map(([r, y]) => new THREE.Vector2(r, y)), 20).rotateX(Math.PI).translate(0, 0, 0);
    const wm: THREE.Matrix4[] = [];
    for (let z = rackZ0; z <= rackZ1; z += 0.16) for (const o of [-0.07, 0.07]) wm.push(mat4(rackX + o, 2.43, z));
    instances(wine, new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.03, transparent: true, opacity: 0.32, clearcoat: 1, depthWrite: false }), wm, undefined, g).castShadow = false;
    // đèn thả trên quầy: cầu kính khói, bóng ấm bên trong
    const pz = Array.from({ length: 6 }, (_, i) => COUNTER.z0 + 0.8 + i * (L - 1.6) / 5);
    const px = (COUNTER.front + COUNTER.back) / 2;
    instances(new THREE.CylinderGeometry(0.004, 0.004, ROOM.h - 2.7, 4), m.darkSteel, pz.map(z => mat4(px, 2.7 + (ROOM.h - 2.7) / 2, z)), undefined, g);
    instances(new THREE.SphereGeometry(0.17, 28, 18), new THREE.MeshPhysicalMaterial({ color: 0x3a2a20, roughness: 0.05, transparent: true, opacity: 0.5, clearcoat: 1, emissive: 0xff9a40, emissiveIntensity: 0.25, depthWrite: false }), pz.map(z => mat4(px, 2.55, z)), undefined, g).castShadow = false;
    instances(new THREE.SphereGeometry(0.035, 12, 8), led(0xffb060, 8), pz.map(z => mat4(px, 2.55, z)), undefined, g).castShadow = false;
    instances(new THREE.CylinderGeometry(0.04, 0.06, 0.06, 20), m.brass, pz.map(z => mat4(px, 2.73, z)), undefined, g);
    // ánh sáng: mảng đèn sau kệ hắt ra, dải sáng trên quầy rọi xuống mặt đá
    const back = new THREE.PointLight(0xffa860, 9, 7, 1.8); back.position.set(wallX + 0.9, BACKBAR.top + 1.5, cz); g.add(back);
    // đèn rọi từ phía khách vào mặt bartender (không để mặt người tối thui vì chỉ có đèn kệ phía sau), góc rộng, dịu
    const over = new THREE.SpotLight(0xffd6b0, 16, 10, 0.95, 0.9, 1.5); over.position.set(COUNTER.front + 2.2, 3.6, cz); over.target.position.set(COUNTER.back - 0.7, 1.3, cz); g.add(over, over.target);
    this.lights.push(back, over);
  }

  // trạm pha chế: thùng đá đầy đá viên, hàng chai rót nhanh, shaker, jigger, khay trái cây, khay phục vụ
  private station(m: ReturnType<typeof M>, g: THREE.Group, z: number){
    const x = COUNTER.back - 0.27, y = 0.9;
    const well = new THREE.Group(); well.position.set(x, y, z); g.add(well);
    box(0.42, 0.14, 0.6, m.steel, 0, 0.0, 0, well);
    box(0.38, 0.02, 0.56, new THREE.MeshPhysicalMaterial({ color: 0x0a0a0a, roughness: 0.4 }), 0, 0.06, 0, well);
    const cube = new RoundedBoxGeometry(0.03, 0.028, 0.03, 2, 0.006), ice: THREE.Matrix4[] = [];
    for (let i = 0; i < 120; i++) ice.push(mat4((Math.random() - 0.5) * 0.36, 0.07 + Math.random() * 0.03, (Math.random() - 0.5) * 0.52, Math.random() * 6, 1, Math.random() * 6, Math.random() * 6));
    const im = instances(cube, new THREE.MeshPhysicalMaterial({ color: 0xe8f6ff, roughness: 0.1, transparent: true, opacity: 0.7, clearcoat: 1 }), ice, undefined, well);
    im.castShadow = false;
    // hàng chai rót nhanh trước thùng đá
    const cols = [0xd8e8f0, 0x8a4a1a, 0x2a6a2a, 0xc8a040, 0xe0e0e0, 0x6a1a2a];
    for (let i = 0; i < 6; i++){ const b = buildBottle(cols[i], 'spirit'); b.scale.setScalar(0.9); b.position.set(x + 0.28, y - 0.12, z - 0.3 + i * 0.12); g.add(b); }
    // shaker, jigger, chày dầm, khay chanh cam
    const sh = buildShaker(); sh.position.set(x - 0.05, y + 0.02, z + 0.42); g.add(sh); this.counterShakers.push(sh);
    const jig = lathe([[0.02, 0], [0.012, 0.025], [0.02, 0.05]], m.steel); jig.position.set(x - 0.12, y + 0.02, z + 0.38); g.add(jig);
    const tray = new THREE.Group(); tray.position.set(x - 0.05, y + 0.02, z - 0.46); g.add(tray);
    box(0.24, 0.03, 0.16, m.steel, 0, 0.015, 0, tray);
    const fruits = [0xf2e020, 0x4aa020, 0xf07a10];
    for (let i = 0; i < 9; i++) cyl(0.022, 0.022, 0.006, new THREE.MeshPhysicalMaterial({ color: fruits[i % 3], roughness: 0.35, clearcoat: 0.6 }), -0.08 + (i % 3) * 0.08, 0.035, -0.04 + Math.floor(i / 3) * 0.04, tray, 16).rotation.x = 0.3;
  }

  private espresso(m: ReturnType<typeof M>, g: THREE.Group, x: number, z: number){
    const e = new THREE.Group(); e.position.set(x, BACKBAR.top, z); e.rotation.y = Math.PI / 2; g.add(e);
    box(0.75, 0.42, 0.5, m.steel, 0, 0.21, 0, e, 0.04);
    box(0.76, 0.06, 0.52, m.lacquer, 0, 0.45, 0, e, 0.02);
    for (const s of [-0.18, 0.18]){ cyl(0.04, 0.04, 0.05, m.chrome, s, 0.28, 0.27, e).rotation.x = Math.PI / 2; box(0.03, 0.03, 0.18, m.lacquer, s, 0.24, 0.36, e); }
    box(0.6, 0.02, 0.18, m.darkSteel, 0, 0.02, 0.28, e);
    const cups = new THREE.Group(); e.add(cups);
    for (let i = 0; i < 5; i++){ const c = lathe([[0, 0], [0.026, 0], [0.032, 0.055], [0.033, 0.058]], m.ceramic); c.position.set(-0.3 + i * 0.15, 0.48, -0.1); cups.add(c); }
    box(0.08, 0.02, 0.01, led(0x40ff90, 3), 0.25, 0.38, 0.251, e);
  }
  private iceMachine(m: ReturnType<typeof M>, g: THREE.Group, x: number, z: number){
    const e = new THREE.Group(); e.position.set(x + 0.15, 0, z); g.add(e);
    box(0.7, 0.9, 0.62, m.steel, 0, 0.45, 0, e, 0.02);
    box(0.02, 0.36, 0.5, m.smoked, 0.36, 0.55, 0, e);
    box(0.03, 0.03, 0.3, m.chrome, 0.37, 0.78, 0, e);
    const g2 = new THREE.Group(); e.add(g2);
    const cube = new RoundedBoxGeometry(0.03, 0.028, 0.03, 2, 0.006), ice: THREE.Matrix4[] = [];
    for (let i = 0; i < 60; i++) ice.push(mat4(0.3 + Math.random() * 0.03, 0.4 + Math.random() * 0.12, (Math.random() - 0.5) * 0.42, Math.random() * 6, 1, Math.random() * 6));
    instances(cube, new THREE.MeshPhysicalMaterial({ color: 0xe8f6ff, roughness: 0.1, transparent: true, opacity: 0.75 }), ice, undefined, g2).castShadow = false;
    box(0.06, 0.012, 0.012, led(0x4ab0ff, 4), 0.36, 0.86, 0.15, e);
  }
  private sink(m: ReturnType<typeof M>, g: THREE.Group, x: number, z: number){
    const s = new THREE.Group(); s.position.set(x, 0.9, z); g.add(s);
    box(0.46, 0.05, 0.6, m.steel, 0, 0, 0, s);
    box(0.36, 0.04, 0.48, new THREE.MeshPhysicalMaterial({ color: 0x8a9096, metalness: 1, roughness: 0.25 }), 0, 0.012, 0, s);
    const neck = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(-0.2, 0.02, 0), new THREE.Vector3(-0.2, 0.38, 0), new THREE.Vector3(-0.08, 0.42, 0), new THREE.Vector3(0, 0.3, 0)]), 20, 0.012, 10);
    s.add(new THREE.Mesh(neck, m.chrome));
    box(0.04, 0.02, 0.06, m.chrome, -0.2, 0.08, 0.06, s);
  }
  private glassRack(m: ReturnType<typeof M>, g: THREE.Group, x: number, z: number){
    const r = new THREE.Group(); r.position.set(x, BACKBAR.top, z); g.add(r);
    box(0.4, 0.06, 0.5, m.rubber, 0, 0.03, 0, r);
    const hb = new THREE.LatheGeometry([[0, 0], [0.031, 0], [0.033, 0.012], [0.035, 0.15], [0.033, 0.15], [0.03, 0.012], [0, 0.012]].map(([a, b]) => new THREE.Vector2(a, b)), 20);
    const ms: THREE.Matrix4[] = [];
    for (let i = 0; i < 4; i++) for (let k = 0; k < 5; k++) ms.push(mat4(-0.14 + i * 0.09, 0.06, -0.18 + k * 0.09));
    instances(hb, new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.03, transparent: true, opacity: 0.3, clearcoat: 1, depthWrite: false }), ms, undefined, r).castShadow = false;
  }

  // chai trên kệ: ba dáng chai (rượu vang, rượu mạnh, chai vuông) x nhiều màu, mỗi phần một lệnh vẽ
  private bottles(g: THREE.Group, x: number, levels: number[], z0: number, z1: number){
    const kinds = ['spirit', 'wine', 'square'] as const;
    const COLS = [0x6a2a0a, 0x2a6a3a, 0xd8e8f0, 0x9a1a2a, 0x203a8a, 0xc89030, 0x3a1a4a, 0xe0b060, 0x1a1a1a, 0x7ad0c0, 0xb05010];
    const byKind = kinds.map(k => {
      const b = buildBottle(0xffffff, k);
      const parts = b.children as THREE.Mesh[];
      return { parts: parts.map(p => ({ geo: p.geometry, mat: p.material as THREE.MeshPhysicalMaterial, name: p.name })), list: [] as THREE.Matrix4[], colors: [] as THREE.Color[] };
    });
    let n = 0;
    for (let li = 0; li < levels.length - 1; li++){
      const y = levels[li] + 0.012;
      for (let z = z0 + 0.1; z < z1 - 0.05; z += 0.125 + ((n * 7) % 5) * 0.008){
        if (Math.abs(z + 0.9) < 1.05 && li > 2) continue;         // chừa khoảng trong vòm
        const k = (n * 5 + li) % 3, s = k === 1 ? 0.95 : 0.85 + ((n * 3) % 4) * 0.05;
        byKind[k].list.push(mat4(x + ((n % 2) ? 0.06 : -0.04), y, z, n * 0.7, s));
        byKind[k].colors.push(new THREE.Color(COLS[(n * 7 + li * 3) % COLS.length]));
        n++;
      }
    }
    for (const k of byKind){
      if (!k.list.length) continue;
      for (const p of k.parts){
        const mat = p.mat.clone();
        if (p.name === 'bottle'){ mat.color.set(0xffffff); mat.emissive.set(0x000000); mat.depthWrite = false; }
        const im = instances(p.geo, mat, k.list, p.name === 'bottle' ? k.colors : p.name === 'label' ? k.colors.map((c, i) => new THREE.Color(i % 3 ? 0xf2ead8 : 0x1a1a1a).lerp(c, 0.15)) : undefined, g);
        im.castShadow = false;
      }
    }
  }

  /* ---------------------------------------------------------- ghế quầy */
  private stools(m: ReturnType<typeof M>, g: THREE.Group){
    const at = STOOLS.map(s => [s.x, s.z] as const);
    const mk = (geo: THREE.BufferGeometry, mat: THREE.Material, y: number) => instances(geo, mat, at.map(([x, z]) => mat4(x, y, z)), undefined, g);
    mk(new THREE.CylinderGeometry(0.22, 0.24, 0.03, 32), m.chrome, 0.015);
    mk(new THREE.CylinderGeometry(0.03, 0.03, 0.72, 12), m.chrome, 0.38);
    mk(new THREE.TorusGeometry(0.18, 0.012, 8, 32).rotateX(Math.PI / 2), m.chrome, 0.3);
    mk(new THREE.LatheGeometry([[0, 0], [0.16, 0], [0.2, 0.02], [0.205, 0.06], [0.19, 0.08], [0, 0.085]].map(([a, b]) => new THREE.Vector2(a, b)), 32), m.leather, 0.72);
    // tựa lưng thấp hướng ra ngoài sảnh (khách ngồi quay mặt vào quầy)
    const back = new THREE.TorusGeometry(0.19, 0.022, 10, 24, Math.PI).rotateZ(Math.PI / 2).rotateY(0).translate(0, 0.0, 0);
    instances(back, m.leather, at.map(([x, z]) => mat4(x + 0.04, 0.86, z, 0, 1, 0, 0)), undefined, g);
  }

  /* ---------------------------------------------------------- bàn đứng, nến */
  private tables(m: ReturnType<typeof M>, g: THREE.Group){
    const at = HIGH_TABLES;
    instances(new THREE.LatheGeometry([[0, 0], [0.3, 0], [0.3, 0.02], [0.05, 0.06], [0.035, 0.1], [0.035, 1.02], [0.06, 1.05], [0, 1.05]].map(([a, b]) => new THREE.Vector2(a, b)), 32), m.chrome, at.map(([x, z]) => mat4(x, 0, z)), undefined, g);
    const top = m.marbleBlack;
    instances(new RoundedBoxGeometry(0.8, 0.04, 0.8, 4, 0.02).scale(1, 1, 1), top, at.map(([x, z]) => mat4(x, 1.07, z, Math.PI / 4)), undefined, g);
    // nến trong cốc thuỷ tinh
    const glass = lathe([[0.03, 0], [0.034, 0.08]], new THREE.MeshPhysicalMaterial({ color: 0xffa060, transparent: true, opacity: 0.35, roughness: 0.05, depthWrite: false }));
    for (const [x, z] of at){
      const c = glass.clone(); c.position.set(x, 1.09, z); g.add(c);
      const fm = led(0xffb040, 6); this.candles.push(fm);
      const flame = new THREE.Mesh(new THREE.SphereGeometry(0.008, 8, 6).scale(1, 2.2, 1), fm); flame.position.set(x, 1.13, z); g.add(flame);
    }
  }

  /* ---------------------------------------------------------- sofa lounge */
  private sofa(m: ReturnType<typeof M>, parent: THREE.Object3D, len: number, mat: THREE.Material){
    const s = new THREE.Group(); parent.add(s);
    box(len, 0.22, 0.85, m.lacquer, 0, 0.11, 0, s, 0.03);
    // ba nệm ngồi chần, tựa lưng, tay vịn
    const n = Math.max(1, Math.round(len / 0.9)), w = (len - 0.3) / n;
    for (let i = 0; i < n; i++){ box(w - 0.02, 0.18, 0.66, mat, -len / 2 + 0.15 + w * (i + 0.5), 0.31, 0.06, s, 0.06); box(w - 0.02, 0.48, 0.2, mat, -len / 2 + 0.15 + w * (i + 0.5), 0.58, -0.3, s, 0.08); }
    for (const sx of [-1, 1]) box(0.16, 0.42, 0.85, mat, sx * (len / 2 - 0.08), 0.42, 0, s, 0.06);
    return s;
  }
  private lounges(m: ReturnType<typeof M>, g: THREE.Group){
    for (const l of LOUNGES){
      const grp = new THREE.Group(); grp.position.set(l.x, 0, l.z); grp.rotation.y = l.yaw; g.add(grp);
      const s = this.sofa(m, grp, 2.9, m.leatherWine); s.position.z = -0.35;
      // bàn thấp mặt đá, chân đồng; đèn cây cạnh sofa
      box(1.3, 0.04, 0.6, m.marbleBlack, 0, 0.42, 0.75, grp, 0.02);
      for (const sx of [-1, 1]) box(0.03, 0.4, 0.5, m.brass, sx * 0.55, 0.2, 0.75, grp);
      const lamp = new THREE.Group(); lamp.position.set(1.75, 0, -0.4); grp.add(lamp);
      cyl(0.15, 0.17, 0.03, m.brass, 0, 0.015, 0, lamp); cyl(0.012, 0.012, 1.5, m.brass, 0, 0.77, 0, lamp);
      const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.22, 0.3, 32, 1, true), new THREE.MeshStandardMaterial({ color: 0xf2e6d0, emissive: 0xffc080, emissiveIntensity: 0.9, side: THREE.DoubleSide, roughness: 0.9 }));
      shade.position.y = 1.55; lamp.add(shade);
      const warm = new THREE.PointLight(0xffb070, 7, 6, 1.6); warm.position.y = 1.5; lamp.add(warm); this.lights.push(warm);
    }
  }

  /* ---------------------------------------------------------- khu VIP */
  private vip(m: ReturnType<typeof M>, g: THREE.Group){
    const w = VIP.x1 - VIP.x0, d = VIP.z1 - VIP.z0, cx = (VIP.x0 + VIP.x1) / 2, cz = (VIP.z0 + VIP.z1) / 2;
    box(w, VIP.y, d, m.lacquer, cx, VIP.y / 2, cz, g);
    const cp = m.carpet.clone(); cp.map = cp.map!.clone(); cp.map.repeat.set(w / 2, d / 2); cp.map.needsUpdate = true;
    const top = new THREE.Mesh(new THREE.PlaneGeometry(w, d).rotateX(-Math.PI / 2), cp); top.position.set(cx, VIP.y + 0.002, cz); top.receiveShadow = true; g.add(top);
    box(0.04, 0.04, d, m.brass, VIP.x0 + 0.02, VIP.y, cz, g); box(w, 0.04, 0.04, m.brass, cx, VIP.y, VIP.z1 - 0.02, g);
    box(0.02, 0.03, d, this.strip(0xffc060, 1, 3), VIP.x0 - 0.01, 0.06, cz, g);
    // bậc lên ở cổng
    box(0.5, VIP.y / 2, 1.3, m.marbleBlack, VIP.x0 - 0.25, VIP.y / 4, VIP.gateZ + 0.35, g);
    // vách kính khung đồng (chừa cổng)
    const pane = (x0: number, z0: number, x1: number, z1: number) => {
      const len = Math.hypot(x1 - x0, z1 - z0), mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, ry = Math.atan2(x1 - x0, z1 - z0);
      const gl = new THREE.Mesh(new THREE.PlaneGeometry(len, 1.05).rotateY(ry + Math.PI / 2), m.glass); gl.position.set(mx, VIP.y + 0.6, mz); g.add(gl);
      const rail = box(0.05, 0.05, len, m.brass, mx, VIP.y + 1.14, mz, g); rail.rotation.y = ry;
      for (let k = 0; k <= Math.ceil(len / 1.5); k++){ const f = k / Math.ceil(len / 1.5); box(0.05, 1.12, 0.05, m.brass, x0 + (x1 - x0) * f, VIP.y + 0.56, z0 + (z1 - z0) * f, g); }
    };
    pane(VIP.x0 + 0.04, VIP.z0, VIP.x0 + 0.04, VIP.gateZ - 0.25);
    pane(VIP.x0 + 1.4, VIP.z1 - 0.04, VIP.x1 - 0.2, VIP.z1 - 0.04);
    // dây nhung đỏ giữa hai trụ đồng ở cổng
    const posts = [new THREE.Vector3(VIP.x0 - 0.55, 0, VIP.gateZ - 0.25), new THREE.Vector3(VIP.x0 - 0.55, 0, VIP.gateZ + 1.0)];
    for (const p of posts){ cyl(0.16, 0.18, 0.04, m.gold, p.x, 0.02, p.z, g); cyl(0.025, 0.025, 0.95, m.gold, p.x, 0.5, p.z, g); const k = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 12), m.gold); k.position.set(p.x, 1.0, p.z); g.add(k); }
    const rope = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([posts[0].clone().setY(0.93), new THREE.Vector3(posts[0].x, 0.72, (posts[0].z + posts[1].z) / 2), posts[1].clone().setY(0.93)]), 24, 0.022, 10);
    g.add(new THREE.Mesh(rope, new THREE.MeshPhysicalMaterial({ color: 0x8a0a1a, roughness: 0.8, sheen: 1, sheenColor: new THREE.Color(0xff5060) })));
    // ba phòng sofa chữ U, bàn kính, xô đá champagne, đèn bàn, bình hoa; vách gỗ giữa các phòng
    for (const z of VIP_BOOTHS){
      const b = new THREE.Group(); b.position.set(0, VIP.y, z); g.add(b);
      const back = this.sofa(m, b, 2.6, m.velvet); back.position.set(12.15, 0, 0); back.rotation.y = -Math.PI / 2;
      const s1 = this.sofa(m, b, 1.4, m.velvet); s1.position.set(10.95, 0, -1.55); s1.rotation.y = 0;
      const s2 = this.sofa(m, b, 1.4, m.velvet); s2.position.set(10.95, 0, 1.55); s2.rotation.y = Math.PI;
      const tg = new THREE.Group(); tg.position.set(10.75, 0, 0); b.add(tg);
      cyl(0.42, 0.42, 0.025, m.smoked, 0, 0.47, 0, tg, 48); cyl(0.43, 0.43, 0.012, m.gold, 0, 0.455, 0, tg, 48);
      cyl(0.05, 0.16, 0.44, m.gold, 0, 0.22, 0, tg);
      const bucket = lathe([[0, 0], [0.08, 0], [0.11, 0.2], [0.115, 0.21]], m.steel); bucket.position.set(0.15, 0.48, 0.12); tg.add(bucket);
      const bottle = buildBottle(0x10301a, 'wine', 0xd8b050); bottle.position.set(0.15, 0.53, 0.12); bottle.rotation.z = 0.25; tg.add(bottle);
      const vase = lathe([[0, 0], [0.04, 0], [0.05, 0.08], [0.025, 0.16], [0.03, 0.2]], m.glass); vase.position.set(-0.15, 0.48, -0.1); tg.add(vase);
      const fl = [0xff3a6a, 0xffffff, 0xff8fb0, 0xd01a40];
      for (let i = 0; i < 7; i++){ const f = new THREE.Mesh(new THREE.IcosahedronGeometry(0.03, 1), new THREE.MeshPhysicalMaterial({ color: fl[i % 4], roughness: 0.6, sheen: 1 })); f.position.set(-0.15 + Math.cos(i * 2.4) * 0.04 * (i ? 1 : 0), 0.7 + (i % 2) * 0.03, -0.1 + Math.sin(i * 2.4) * 0.04 * (i ? 1 : 0)); tg.add(f); }
      const lamp = new THREE.Group(); lamp.position.set(12.45, 0.62, 1.45); b.add(lamp);
      cyl(0.05, 0.08, 0.3, m.gold, 0, 0.15, 0, lamp);
      const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.16, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0xf2e6d0, emissive: 0xffb060, emissiveIntensity: 1.2, side: THREE.DoubleSide }));
      shade.position.y = 0.38; lamp.add(shade);
      box(1.4, 2.0, 0.08, m.walnut, 12.1, 1.0, 1.85, b);
      box(1.42, 0.03, 0.1, m.gold, 12.1, 2.0, 1.85, b);
    }
    // chữ VIP neon vàng trên tường
    const n = neonText('VIP LOUNGE', '#ffcf5a', '800 120px "Segoe UI", Arial, sans-serif');
    const nm = new THREE.MeshBasicMaterial({ map: n.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(2, 2, 2) });
    this.neon.push(nm);
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.9 * n.aspect, 0.9).rotateY(-Math.PI / 2), nm); sign.position.set(ROOM.x1 - 0.06, 3.6, -2.0); g.add(sign);
    // đèn chùm pha lê giữa khu VIP
    const ch = new THREE.Group(); ch.position.set(10.6, 4.6, -2.0); g.add(ch);
    for (const [r, y] of [[0.9, 0], [0.6, -0.35], [0.3, -0.65]]){ const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.025, 8, 64).rotateX(Math.PI / 2), m.gold); ring.position.y = y; ch.add(ring); }
    const cr: THREE.Matrix4[] = [];
    for (const [r, y, n2] of [[0.9, 0, 36], [0.6, -0.35, 26], [0.3, -0.65, 14]]) for (let i = 0; i < n2; i++){ const a = i / n2 * Math.PI * 2; for (let k = 0; k < 3; k++) cr.push(mat4(Math.cos(a) * r, y - 0.08 - k * 0.09, Math.sin(a) * r, a, 1 - k * 0.15)); }
    instances(new THREE.OctahedronGeometry(0.03, 0).scale(0.7, 1.4, 0.7), new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0, metalness: 0, transparent: true, opacity: 0.7, clearcoat: 1, emissive: 0xffe0b0, emissiveIntensity: 0.5, envMapIntensity: 3 }), cr, undefined, ch).castShadow = false;
    cyl(0.01, 0.01, ROOM.h - 4.6, m.gold, 0, (ROOM.h - 4.6) / 2, 0, ch, 6);
    const glow = new THREE.PointLight(0xffc080, 6, 9, 1.6); glow.position.set(0, -0.4, 0); ch.add(glow);
    glow.distance = 12; glow.intensity = 9;
    this.lights.push(glow);
    void cx; void cz;
  }

  /* ---------------------------------------------------------- cây cảnh */
  private plants(m: ReturnType<typeof M>, g: THREE.Group){
    const spots: [number, number, number][] = [[-2.3, 8.9, 1.2], [2.3, 8.9, 1.2], [-9.6, -10.9, 1.5], [9.6, -10.9, 1.5], [12.2, -8.4, 1.3], [-12.2, 9.2, 1.1], [12.2, 9.2, 1.1], [7.2, 5.4, 0.9]];
    const leafGeo = (() => {
      const sh = new THREE.Shape(), L = 0.42; sh.moveTo(0, 0); sh.quadraticCurveTo(L * 0.5, L * 0.22, L, 0); sh.quadraticCurveTo(L * 0.5, -L * 0.22, 0, 0);
      const ge = new THREE.ShapeGeometry(sh, 8), p = ge.attributes.position;
      for (let i = 0; i < p.count; i++){ const x = p.getX(i), y = p.getY(i); p.setZ(i, -((x / L) ** 2) * 0.18 + Math.abs(y) * 0.5); }
      ge.computeVertexNormals();
      return ge;
    })();
    const leaves: THREE.Matrix4[] = [], stems: THREE.BufferGeometry[] = [];
    const _o = new THREE.Object3D();
    for (const [x, z, h] of spots){
      const pot = lathe([[0, 0], [0.2, 0], [0.26, 0.05], [0.3, 0.55], [0.32, 0.6], [0.28, 0.6], [0, 0.56]], m.lacquer); pot.position.set(x, 0, z); g.add(pot);
      cyl(0.3, 0.3, 0.02, m.brass, x, 0.6, z, g, 32);
      for (let i = 0; i < 70; i++){
        const a = i * 2.39996, t = i / 70, y = 0.6 + h * (0.25 + t * 0.75), r = 0.05 + Math.sin(t * Math.PI) * 0.35 * h;
        _o.position.set(x + Math.cos(a) * r * 0.5, y, z + Math.sin(a) * r * 0.5);
        _o.rotation.set(0, -a, -0.5 + t * 0.9 + Math.sin(i) * 0.3);
        _o.scale.setScalar(0.7 + Math.random() * 0.5);
        _o.updateMatrix(); leaves.push(_o.matrix.clone());
      }
      stems.push(new THREE.CylinderGeometry(0.015, 0.025, h, 6).translate(x, 0.6 + h / 2, z));
    }
    instances(leafGeo, m.leaf, leaves, undefined, g);
    g.add(new THREE.Mesh(mergeGeometries(stems), new THREE.MeshStandardMaterial({ color: 0x4a3a22, roughness: 0.9 })));
  }

  /* ---------------------------------------------------------- cột ốp gương */
  private columns(m: ReturnType<typeof M>, g: THREE.Group){
    for (const [x, z] of [[-7.0, -8.6], [6.3, -8.6], [-6.4, 6.4], [6.3, 6.6]]){
      const c = new THREE.Group(); c.position.set(x, 0, z); g.add(c);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, ROOM.h, 8), m.smoked); body.position.y = ROOM.h / 2; c.add(body);
      cyl(0.3, 0.3, ROOM.h, m.lacquer, 0, ROOM.h / 2, 0, c, 8);
      for (const y of [0.1, ROOM.h - 0.12]) cyl(0.4, 0.4, 0.2, m.brass, 0, y, 0, c, 8);
      for (let k = 0; k < 4; k++){ const a = k * Math.PI / 2 + Math.PI / 8; box(0.025, ROOM.h - 0.5, 0.025, this.strip(k % 2 ? 0xff2fd0 : 0x2fd0ff, (k % 2) as 0 | 1, 2.4), Math.cos(a) * 0.35, ROOM.h / 2, Math.sin(a) * 0.35, c); }
    }
  }

  // Màu đèn LED theo màn diễn; beat (0..1) làm dải LED đập nhẹ theo nhạc; nến lung linh, chữ neon thỉnh thoảng chớp
  update(t: number, beat: number, theme: Theme){
    for (const s of this.strips){
      const c = s.side ? theme.b : theme.a;
      s.m.emissive.copy(c);
      s.m.emissiveIntensity = s.k * (0.75 + beat * 0.45);
    }
    for (let i = 0; i < this.candles.length; i++) this.candles[i].emissiveIntensity = 5 + Math.sin(t * 13 + i * 3) * 1.2 + Math.sin(t * 31 + i) * 0.8;
    for (let i = 0; i < this.neon.length; i++){ const f = Math.sin(t * 0.7 + i * 5) > 0.995 ? 0.3 : 1; this.neon[i].color.setScalar(2.1 * f); }
  }
}
