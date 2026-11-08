import * as THREE from 'three';
import { ARCHETYPES, artifactByKey, classByKey, ELEMENT_COLORS, REALM_COLORS, realmName, realmOf, sectByKey, VIP_COLORS, VIP_NAMES } from '../shared/game.ts';
import type { ArtifactKey, Archetype, Weapon } from '../shared/game.ts';
import type { Pose } from '../shared/types.ts';
import { GlbActor, hasModel, modelsWith } from './glb.ts';
import { cloth, glow, hex, labelTex, softTex, std } from './mats.ts';

// Tu sĩ 3D dựng bằng code: khung xương khớp (hông, thân, vai, khuỷu, đùi, gối), áo bào và tay áo rộng lay theo gió,
// tóc / mũ quan theo kiểu, vũ khí theo lớp, hào quang theo cảnh giới, pháp bảo bay quanh người.
// Có model GLB cùng tên lớp trong models/ thì dùng model đó (glb.ts).

/* ------------------------------------------------------------ hình học dùng chung */
const G = {
  capsule: new THREE.CapsuleGeometry(1, 1, 6, 12),
  sphere: new THREE.SphereGeometry(1, 20, 16),
  cone: new THREE.ConeGeometry(1, 1, 14),
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 14),
  ring: new THREE.RingGeometry(0.62, 1, 48),
  torus: new THREE.TorusGeometry(1, 0.04, 8, 48),
  disc: new THREE.CircleGeometry(1, 32),
};
// áo bào: hình chuông từ eo xuống mắt cá, vạt áo xoè
const robeGeo = (flare: number) => new THREE.LatheGeometry([0.19, 0.21, 0.235, 0.26, 0.29, 0.325, 0.355].map((r, i) => new THREE.Vector2(r * (1 + (flare - 1) * i / 6), -i * 0.158)), 28);
const ROBE = robeGeo(1), ROBE_W = robeGeo(1.18);
const SLEEVE = new THREE.LatheGeometry([0.065, 0.08, 0.1, 0.12, 0.13].map((r, i) => new THREE.Vector2(r, -i * 0.085)), 14);
// lưỡi kiếm: hình thoi dài, mũi nhọn
function bladeGeo(len: number, w: number, curve = 0) {
  const sh = new THREE.Shape();
  sh.moveTo(0, 0); sh.lineTo(w, 0.06); sh.quadraticCurveTo(w + curve, len * 0.6, w * 0.3, len); sh.lineTo(0, len + 0.08); sh.lineTo(-w * 0.3, len); sh.quadraticCurveTo(-w + curve * 0.4, len * 0.6, -w, 0.06); sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: 0.012, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 1 });
  g.translate(0, 0, -0.006);
  return g;
}
const BLADE = bladeGeo(0.95, 0.035), SABER = bladeGeo(0.9, 0.06, 0.08), SPEAR_TIP = bladeGeo(0.28, 0.05);

const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, sx = 1, sy = sx, sz = sx) => { const m = new THREE.Mesh(geo, mat); m.scale.set(sx, sy, sz); m.castShadow = true; return m; };

export function buildWeapon(w: Weapon, color: number, el: number): THREE.Group {
  const g = new THREE.Group();
  const metal = std(0xdfe6ef, { metal: 0.9, rough: 0.25, emissive: el, ei: 0.25 }), gold = std(0xd4af37, { metal: 1, rough: 0.3 }), wood = std(0x4a2e1a, { rough: 0.7 });
  const grip = mesh(G.cyl, std(0x2a1a14), 0.022, 0.2, 0.022); grip.position.y = -0.05; g.add(grip);
  if (w === 'sword' || w === 'twin') {
    const guard = mesh(G.box, gold, 0.18, 0.03, 0.05); guard.position.y = 0.06; g.add(guard);
    const b = mesh(BLADE, metal); b.position.y = 0.07; g.add(b);
    const tassel = mesh(G.cone, std(color), 0.03, 0.18, 0.03); tassel.position.y = -0.24; tassel.rotation.x = Math.PI; g.add(tassel);
  } else if (w === 'saber') {
    const guard = mesh(G.cyl, gold, 0.07, 0.03, 0.07); guard.position.y = 0.06; g.add(guard);
    const b = mesh(SABER, metal); b.position.y = 0.07; g.add(b);
  } else if (w === 'staff' || w === 'spear' || w === 'flag') {
    const pole = mesh(G.cyl, w === 'staff' ? wood : std(0x3a2a20), 0.025, 1.7, 0.025); pole.position.y = 0.45; g.add(pole);
    if (w === 'staff') { const orb = mesh(G.sphere, glow(el, 0.9), 0.09); orb.position.y = 1.36; g.add(orb); const crown = mesh(G.torus, gold, 0.12, 0.12, 0.12); crown.position.y = 1.36; g.add(crown); }
    if (w === 'spear') { const tip = mesh(SPEAR_TIP, metal); tip.position.y = 1.28; g.add(tip); const tuft = mesh(G.cone, std(0xb01c2e), 0.06, 0.14, 0.06); tuft.position.y = 1.22; tuft.rotation.x = Math.PI; g.add(tuft); }
    if (w === 'flag') { const f = mesh(new THREE.PlaneGeometry(0.42, 0.6, 4, 4), cloth(color, el, 0.05)); f.position.set(0.22, 1.05, 0); g.add(f); }
  } else if (w === 'fan') {
    const fan = mesh(new THREE.CircleGeometry(0.32, 16, 0, Math.PI * 0.8), std(color, { side: THREE.DoubleSide, emissive: el, ei: 0.2 })); fan.rotation.z = Math.PI * 0.1; fan.position.y = 0.05; g.add(fan);
  } else if (w === 'claw') {
    for (let i = -1; i <= 1; i++) { const c = mesh(G.cone, std(0x1a1a1a, { metal: 0.8, rough: 0.3, emissive: el, ei: 0.4 }), 0.015, 0.28, 0.015); c.position.set(i * 0.035, 0.18, 0.04); g.add(c); }
  } else if (w === 'ribbon') {
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.4, 0.2), new THREE.Vector3(-0.2, 0.9, -0.1), new THREE.Vector3(0.25, 1.3, 0.1)]);
    const rib = mesh(new THREE.TubeGeometry(curve, 30, 0.025, 5, false), glow(color, 0.7)); g.add(rib);
  } else if (w === 'cauldron') {
    const c = mesh(G.sphere, std(0x8a6a2a, { metal: 0.8, rough: 0.35 }), 0.14, 0.12, 0.14); c.position.y = 0.12; g.add(c);
    const fire = mesh(G.sphere, glow(0xff7a2a, 0.8), 0.07); fire.position.y = 0.24; g.add(fire);
  }
  // fist: chỉ có băng tay (vẽ ở tay)
  return g;
}

/* ------------------------------------------------------------ pháp bảo bay quanh người */
export function artifactMesh(key: ArtifactKey): THREE.Object3D {
  const d = artifactByKey.get(key)!, g = new THREE.Group();
  const body = std(d.color, { metal: 0.85, rough: 0.25, emissive: d.color, ei: 0.55 }), aura = glow(d.color, 0.5);
  switch (d.shape) {
    case 'sword': { const b = mesh(BLADE, body, 0.7, 0.7, 0.7); b.rotation.z = Math.PI; g.add(b); break; }
    case 'saber': { const b = mesh(SABER, body, 0.7); b.rotation.z = Math.PI; g.add(b); break; }
    case 'cauldron': { const c = mesh(G.sphere, body, 0.16, 0.13, 0.16); g.add(c); for (let i = 0; i < 3; i++) { const l = mesh(G.cyl, body, 0.02, 0.12, 0.02); l.position.set(Math.sin(i * 2.1) * 0.1, -0.14, Math.cos(i * 2.1) * 0.1); g.add(l); } break; }
    case 'pearl': g.add(mesh(G.sphere, body, 0.13)); break;
    case 'bell': { const b = mesh(new THREE.LatheGeometry([0.02, 0.08, 0.12, 0.15, 0.16].map((r, i) => new THREE.Vector2(r, -i * 0.06)), 20), body); g.add(b); break; }
    case 'tower': for (let i = 0; i < 4; i++) { const t = mesh(G.cone, body, 0.16 - i * 0.03, 0.1, 0.16 - i * 0.03); t.position.y = i * 0.1; g.add(t); } break;
    case 'staff': { const s = mesh(G.cyl, body, 0.02, 0.6, 0.02); g.add(s); const o = mesh(G.sphere, glow(d.color, 0.9), 0.07); o.position.y = 0.32; g.add(o); break; }
    case 'lotus': for (let i = 0; i < 8; i++) { const p = mesh(G.sphere, body, 0.05, 0.02, 0.12); p.rotation.y = i / 8 * Math.PI * 2; p.rotation.x = -0.5; p.position.set(Math.sin(i / 8 * Math.PI * 2) * 0.08, 0, Math.cos(i / 8 * Math.PI * 2) * 0.08); g.add(p); } break;
  }
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex(), color: d.color, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }));
  halo.scale.setScalar(0.6); g.add(halo);
  void aura;
  return g;
}

/* ------------------------------------------------------------ tu sĩ */
export const CHAR_SCALE = 3;
interface Limb { root: THREE.Group; low: THREE.Group }
export class Cultivator {
  root = new THREE.Group();
  body = new THREE.Group();          // nghiêng, ngã cả người
  hips = new THREE.Group(); torso = new THREE.Group(); head = new THREE.Group();
  armL!: Limb; armR!: Limb; legL!: Limb; legR!: Limb;
  weapon: THREE.Group; weapon2: THREE.Group | null = null;
  arch: Archetype;
  private label: THREE.Sprite; private labelKey = '';
  private hpBar: THREE.Group; private hpFill: THREE.Mesh;
  private auraRing: THREE.Mesh; private auraGlow: THREE.Sprite; private halo: THREE.Mesh | null = null; private pillar: THREE.Mesh | null = null;
  private orbit = new THREE.Group(); private artKey = '';
  private flashMats: THREE.MeshStandardMaterial[] = [];
  private hitT = 0; private poseT = 0; private pose: Pose = 'idle'; private phase = Math.random() * 10;
  glb: GlbActor | null = null;
  private lv = -1;
  x = 0; z = 0; ry = 0; tx = 0; tz = 0; tRy = 0;
  scale = 1;
  vip = 0;
  private wings: { g: THREE.Group; s: number }[] = [];

  constructor(archId: number, opts: { scale?: number; colors?: { robe: number; trim: number }; noLabel?: boolean; vip?: number } = {}) {
    const a = ARCHETYPES[archId] ?? ARCHETYPES[0];
    this.arch = a;
    const cls = classByKey.get(a.cls)!, el = ELEMENT_COLORS[cls.els[0]];
    const vip = this.vip = Math.max(0, Math.min(5, opts.vip ?? 0));
    // bậc 4: hoàng bào tím viền vàng · bậc 5: bạch kim viền vàng
    const robe = opts.colors?.robe ?? (vip >= 5 ? 0xf3e6c4 : vip >= 4 ? 0x3b1d6e : a.robe), trim = opts.colors?.trim ?? (vip >= 4 ? 0xffc93c : a.trim);
    this.scale = (opts.scale ?? 1) * (a.female ? 0.94 : 1) * (vip >= 5 ? 1.1 : vip >= 3 ? 1.04 : 1);
    this.root.add(this.body);
    // model GLB: file riêng của lớp (kiemtu.glb…) nếu có, không thì người tu sĩ chung (tusi-nam-N / tusi-nu-N, dựng bằng tools/make-characters.ts)
    const modelName = `${a.cls}${a.female ? '_nu' : ''}`, pool = modelsWith(`tusi-${a.female ? 'nu' : 'nam'}-`);
    const glbName = hasModel(modelName) ? modelName : hasModel(a.cls) ? a.cls : pool.length ? pool[(archId * 7 + 3) % pool.length] : '';
    if (glbName) {
      this.glb = new GlbActor(glbName, 1.8);
      this.body.add(this.glb.root);
      this.armL = this.armR = this.legL = this.legR = { root: new THREE.Group(), low: new THREE.Group() };
      this.weapon = new THREE.Group();
    } else {
      this.weapon = this.buildBody(a, robe, trim, el, cls.weapon);
      if (vip) this.addVip(vip, robe);
    }
    this.body.scale.setScalar(this.scale);
    // tu sĩ to gấp đôi người thật cho dễ nhìn trên màn hình LIVE (Boss ma thần tự đặt cỡ riêng)
    if (opts.scale === undefined) this.root.scale.setScalar(CHAR_SCALE);
    if (this.glb) this.dressGlb(a, robe, trim, el, cls.weapon, vip);

    // hào quang dưới chân + quầng sáng
    this.auraRing = new THREE.Mesh(G.ring, glow(0xffffff, 0.2)); this.auraRing.rotation.x = -Math.PI / 2; this.auraRing.position.y = 0.03; this.root.add(this.auraRing);
    this.auraGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex(), color: 0xffffff, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.35 }));
    this.auraGlow.position.y = 1.0; this.auraGlow.scale.set(2.2, 2.8, 1); this.root.add(this.auraGlow);
    this.orbit.position.y = 1.5; this.root.add(this.orbit);
    // nhãn tên, thanh máu
    this.label = new THREE.Sprite(new THREE.SpriteMaterial({ depthWrite: false, transparent: true }));
    this.label.center.set(0.5, 0); this.label.position.y = 2.1 * this.scale; this.label.scale.set(opts.scale === undefined ? 1.6 : 3.0, opts.scale === undefined ? 0.4 : 0.75, 1); this.label.renderOrder = 10;
    if (!opts.noLabel) this.root.add(this.label);
    this.hpBar = new THREE.Group(); this.hpBar.position.y = 2.0 * this.scale;
    const bg = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.09), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.6, depthWrite: false }));
    this.hpFill = new THREE.Mesh(new THREE.PlaneGeometry(1.16, 0.06), new THREE.MeshBasicMaterial({ color: 0x4dff88, depthWrite: false }));
    this.hpFill.position.z = 0.001; this.hpBar.add(bg, this.hpFill); this.hpBar.visible = false; this.root.add(this.hpBar);
  }

  private limb(len1: number, len2: number, r: number, mat1: THREE.Material, mat2: THREE.Material, foot?: THREE.Material): Limb {
    const root = new THREE.Group(), low = new THREE.Group();
    const up = mesh(G.capsule, mat1, r, len1 / 2, r); up.position.y = -len1 / 2; root.add(up);
    low.position.y = -len1; root.add(low);
    const lo = mesh(G.capsule, mat2, r * 0.85, len2 / 2, r * 0.85); lo.position.y = -len2 / 2; low.add(lo);
    if (foot) { const f = mesh(G.box, foot, r * 2.1, r * 1.2, r * 3.4); f.position.set(0, -len2 - r * 0.5, r * 0.7); low.add(f); }
    return { root, low };
  }

  private buildBody(a: Archetype, robe: number, trim: number, el: number, weapon: Weapon) {
    const skin = std(a.skin, { rough: 0.55 }), robeM = cloth(robe, 0, 0.05), trimM = std(trim, { metal: 0.6, rough: 0.35, emissive: trim, ei: 0.12 });
    const inner = std(new THREE.Color(robe).multiplyScalar(0.55).getHex(), { rough: 0.8 }), hairM = std(a.hair, { rough: 0.45 }), boot = std(0x1c1716, { rough: 0.6 });
    const gold = std(0xd4af37, { metal: 1, rough: 0.3 });
    const f = a.female;
    this.flashMats.push(skin as THREE.MeshStandardMaterial);
    this.hips.position.y = 1.0; this.body.add(this.hips);
    // thân trên: ngực + vai + đai lưng
    this.hips.add(this.torso);
    const chest = mesh(G.capsule, inner, f ? 0.17 : 0.2, 0.22, f ? 0.13 : 0.15); chest.position.y = 0.3; this.torso.add(chest);
    const robeTop = mesh(G.capsule, cloth(robe, 0, 0.01), f ? 0.185 : 0.215, 0.2, f ? 0.145 : 0.165); robeTop.position.y = 0.3; this.torso.add(robeTop);
    const collar = mesh(G.torus, trimM, 0.14, 0.14, 0.5); collar.rotation.x = Math.PI / 2 - 0.3; collar.position.set(0, 0.52, 0.03); this.torso.add(collar);
    const belt = mesh(G.cyl, trimM, f ? 0.18 : 0.21, 0.07, f ? 0.14 : 0.16); belt.position.y = 0.08; this.torso.add(belt);
    const jade = mesh(G.sphere, glow(el, 0.9), 0.03); jade.position.set(0, 0.08, f ? 0.15 : 0.17); this.torso.add(jade);
    if (!f || a.cls === 'longtoc' || a.cls === 'mavuong') {
      for (const s of [-1, 1]) { const pad = mesh(G.sphere, a.cls === 'thetu' ? skin : trimM, 0.1, 0.07, 0.1); pad.position.set(s * 0.24, 0.47, 0); this.torso.add(pad); }
    }
    // áo bào dưới
    const skirt = mesh(a.cls === 'thetu' ? ROBE : ROBE_W, robeM); skirt.position.y = 0.04; this.hips.add(skirt);
    const hr = 0.355 * (a.cls === 'thetu' ? 1 : 1.18); const hem = mesh(G.torus, trimM, hr, hr, 0.6); hem.rotation.x = Math.PI / 2; hem.position.y = 0.04 - 0.948; this.hips.add(hem);
    // áo choàng sau lưng
    if (['kiemtien', 'mavuong', 'thienton', 'longtoc', 'kiemtu'].includes(a.cls)) {
      const cape = mesh(new THREE.PlaneGeometry(0.62, 1.45, 4, 10), cloth(new THREE.Color(robe).multiplyScalar(0.8).getHex(), 0, 0.1));
      cape.geometry.translate(0, -0.72, 0); cape.position.set(0, 0.5, -0.17); cape.rotation.x = 0.12; this.torso.add(cape);
    }
    // đầu
    this.head.position.y = 0.62; this.torso.add(this.head);
    const neck = mesh(G.cyl, skin, 0.055, 0.12, 0.055); neck.position.y = -0.06; this.head.add(neck);
    const face = mesh(G.sphere, skin, f ? 0.112 : 0.12, f ? 0.14 : 0.145, f ? 0.12 : 0.13); face.position.y = 0.1; this.head.add(face);
    const eyeM = std(a.cls === 'matu' || a.cls === 'mavuong' ? 0xff2040 : 0x161018, { emissive: a.cls === 'matu' || a.cls === 'mavuong' ? 0xff2040 : 0, ei: 1.5 });
    for (const s of [-1, 1]) { const w = mesh(G.sphere, std(0xf4f1ea), 0.026, 0.016, 0.01); w.position.set(s * 0.046, 0.112, 0.113); this.head.add(w); const e = mesh(G.sphere, eyeM, 0.014, 0.014, 0.01); e.position.set(s * 0.046, 0.112, 0.119); this.head.add(e); const br = mesh(G.box, hairM, 0.05, 0.01, 0.012); br.position.set(s * 0.046, 0.14, 0.116); br.rotation.z = -s * 0.15; this.head.add(br); }
    // tóc theo kiểu
    const cap = mesh(G.sphere, hairM, 0.128, 0.115, 0.135); cap.position.set(0, 0.15, -0.012); this.head.add(cap);
    const back = mesh(G.capsule, hairM, 0.11, f ? 0.32 : 0.2, 0.06); back.position.set(0, f ? -0.12 : 0.0, -0.09); back.rotation.x = 0.12; this.head.add(back);
    const style = a.hairStyle;
    if (style === 1) { const tail = mesh(G.capsule, hairM, 0.045, 0.3, 0.045); tail.position.set(0, 0.08, -0.16); tail.rotation.x = 0.5; this.head.add(tail); }
    if (style === 2 || style === 3) { const bun = mesh(G.sphere, hairM, 0.07); bun.position.set(0, 0.28, -0.03); this.head.add(bun); const pin = mesh(G.cyl, gold, 0.008, 0.26, 0.008); pin.rotation.z = Math.PI / 2; pin.position.set(0, 0.28, -0.03); this.head.add(pin); }
    if (style === 3 || a.cls === 'thienton') { const guan = mesh(G.box, gold, 0.1, 0.07, 0.12); guan.position.set(0, 0.29, -0.01); this.head.add(guan); }
    if (style === 4) for (let i = 0; i < 6; i++) { const sp = mesh(G.cone, hairM, 0.035, 0.16, 0.035); sp.position.set(Math.sin(i) * 0.08, 0.23, -0.05 + Math.cos(i * 1.3) * 0.05); sp.rotation.set(-0.6 + i * 0.1, 0, Math.sin(i) * 0.6); this.head.add(sp); }
    if (f) for (const s of [-1, 1]) { const side = mesh(G.capsule, hairM, 0.035, 0.22, 0.03); side.position.set(s * 0.11, -0.02, 0.03); this.head.add(side); }
    // đặc trưng tộc / lớp
    if (a.cls === 'longtoc' || a.cls === 'matu' || a.cls === 'mavuong') for (const s of [-1, 1]) {
      const horn = mesh(G.cone, a.cls === 'longtoc' ? gold : std(0x1a0a0f, { metal: 0.5, rough: 0.3 }), 0.025, 0.2, 0.025); horn.position.set(s * 0.08, 0.28, -0.02); horn.rotation.set(-0.5, 0, -s * 0.4); this.head.add(horn);
    }
    if (a.cls === 'yeutoc') {
      for (const s of [-1, 1]) { const ear = mesh(G.cone, hairM, 0.05, 0.14, 0.03); ear.position.set(s * 0.09, 0.28, -0.02); ear.rotation.z = -s * 0.3; this.head.add(ear); }
      const tail = mesh(G.capsule, cloth(a.hair, 0, 0.08), 0.09, 0.6, 0.09); tail.position.set(0, -0.15, -0.3); tail.rotation.x = -0.9; this.hips.add(tail);
    }
    if (a.cls === 'thienton' || a.cls === 'kiemtien') { const h = mesh(G.torus, glow(0xffe9a8, 0.8), 0.24, 0.24, 0.24); h.position.set(0, 0.16, -0.18); this.head.add(h); }
    if (a.cls === 'tiennu' || a.cls === 'banghoa') {
      // dải lụa tiên bay quanh người
      const curve = new THREE.CatmullRomCurve3(Array.from({ length: 9 }, (_, i) => new THREE.Vector3(Math.sin(i * 0.8) * 0.55, 0.2 + i * 0.12, Math.cos(i * 0.8) * 0.45)));
      const rib = mesh(new THREE.TubeGeometry(curve, 48, 0.018, 5, false), cloth(trim, trim, 0.08)); rib.position.y = -0.5; this.torso.add(rib);
    }
    if (a.cls === 'kiemtien') for (const s of [-1, 1]) { const sw = buildWeapon('sword', trim, el); sw.position.set(s * 0.12, 0.35, -0.2); sw.rotation.set(0, 0, Math.PI + s * 0.35); sw.scale.setScalar(0.8); this.torso.add(sw); }
    if (a.cls === 'tranphap') for (const s of [-1, 1]) { const fl = buildWeapon('flag', trim, el); fl.position.set(s * 0.15, -0.1, -0.2); fl.scale.setScalar(0.55); fl.rotation.z = s * 0.2; this.torso.add(fl); }

    // tay áo rộng, tay, chân
    const armMat = a.cls === 'thetu' ? skin : cloth(robe, 0, 0.015);
    const mkArm = (s: number) => {
      const l = this.limb(0.3, 0.28, 0.05, armMat, skin);
      l.root.position.set(s * 0.25, 0.47, 0); this.torso.add(l.root);
      if (a.cls !== 'thetu') { const sl = mesh(SLEEVE, cloth(robe, 0, 0.05)); sl.position.y = -0.02; l.low.add(sl); const cuff = mesh(G.torus, trimM, 0.13, 0.13, 0.4); cuff.rotation.x = Math.PI / 2; cuff.position.y = -0.34; l.low.add(cuff); }
      else { const br = mesh(G.cyl, gold, 0.055, 0.1, 0.055); br.position.y = -0.2; l.low.add(br); }
      const hand = mesh(G.sphere, skin, 0.045, 0.055, 0.04); hand.position.y = -0.32; l.low.add(hand);
      return l;
    };
    this.armL = mkArm(1); this.armR = mkArm(-1);
    const legMat = inner;
    this.legL = this.limb(0.46, 0.44, 0.07, legMat, legMat, boot); this.legL.root.position.set(0.11, 0, 0); this.hips.add(this.legL.root);
    this.legR = this.limb(0.46, 0.44, 0.07, legMat, legMat, boot); this.legR.root.position.set(-0.11, 0, 0); this.hips.add(this.legR.root);
    // vũ khí ở tay phải (song kiếm: cả tay trái)
    const wpn = buildWeapon(weapon, trim, el);
    wpn.position.y = -0.33; wpn.rotation.x = Math.PI / 2; this.armR.low.add(wpn);
    if (weapon === 'twin') { this.weapon2 = buildWeapon('sword', trim, el); this.weapon2.position.y = -0.33; this.weapon2.rotation.x = Math.PI / 2; this.armL.low.add(this.weapon2); }
    return wpn;
  }

  // Người GLB: đổi màu áo theo lớp, gắn vũ khí vào xương bàn tay, sừng / tai / vòng sáng theo lớp và đồ VIP vào xương đầu, ngực.
  // Đặt theo toạ độ thế giới lúc tư thế gốc rồi attach vào xương, nên đi theo đúng động tác.
  private ownMats: THREE.Material[] = [];
  private dressGlb(a: Archetype, robe: number, trim: number, el: number, weapon: Weapon, vip: number) {
    const root = this.glb!.root;
    root.traverse(o => {
      const m = o as THREE.Mesh; if (!m.isMesh) return;
      m.castShadow = true; m.frustumCulled = false;
      const list = (Array.isArray(m.material) ? m.material : [m.material]).map(mt => {
        if (!/^(robe_|hair_extra)/.test(mt.name)) return mt;
        const c2 = (mt as THREE.MeshStandardMaterial).clone();
        if (mt.name === 'robe_main') c2.color.setHex(robe);
        else if (mt.name === 'robe_inner') c2.color.copy(new THREE.Color(robe).multiplyScalar(0.55));
        else if (mt.name === 'robe_trim') { c2.color.setHex(trim); c2.emissive.setHex(trim); c2.emissiveIntensity = 0.06; }
        else c2.color.setHex(a.hair);
        this.ownMats.push(c2); return c2;
      });
      m.material = Array.isArray(m.material) ? list : list[0];
    });
    this.root.updateMatrixWorld(true);
    const bone = (n: string) => root.getObjectByName(n);
    const wp = (o: THREE.Object3D) => o.getWorldPosition(new THREE.Vector3());
    const ws = this.root.scale.x * this.scale;                  // 1 m của người cao 1,8 m theo toạ độ thế giới
    const UP = new THREE.Vector3(0, 1, 0), FW = new THREE.Vector3(0, 0, 1);
    const put = (b: THREE.Object3D | undefined, obj: THREE.Object3D, pos: THREE.Vector3, dir?: THREE.Vector3, s = 1) => {
      if (!b) return;
      obj.position.copy(pos); if (dir) obj.quaternion.setFromUnitVectors(UP, dir.clone().normalize()); obj.scale.multiplyScalar(ws * s);
      obj.updateMatrixWorld(true); b.attach(obj);
      obj.traverse(o => { if ((o as THREE.Mesh).isMesh) o.castShadow = true; });
    };
    // vũ khí: chuôi trong lòng bàn tay, lưỡi chĩa về trước (vuông góc cẳng tay)
    const hold = (side: 'R' | 'L', w: THREE.Group) => {
      const hand = bone(`Bip01_${side}_Hand`), fore = bone(`Bip01_${side}_Forearm`); if (!hand || !fore) return;
      const arm = wp(hand).sub(wp(fore)).normalize();
      const dir = FW.clone().addScaledVector(arm, -FW.dot(arm)).normalize();
      put(hand, w, wp(hand).addScaledVector(arm, 0.075 * ws), dir);
    };
    if (weapon !== 'fist') { const w = buildWeapon(weapon === 'twin' ? 'sword' : weapon, trim, el); hold('R', w); this.weapon = w; }
    if (weapon === 'twin') { this.weapon2 = buildWeapon('sword', trim, el); hold('L', this.weapon2); }
    const head = bone('Bip01_Head'), spine2 = bone('Bip01_Spine2');
    const top = head ? wp(head).addScaledVector(UP, 0.17 * ws) : new THREE.Vector3();
    const gold = std(0xffd04a, { metal: 1, rough: 0.22, emissive: 0x7a4a00, ei: 0.35 });
    if (a.cls === 'longtoc' || a.cls === 'matu' || a.cls === 'mavuong') for (const s of [-1, 1]) {
      const horn = mesh(G.cone, a.cls === 'longtoc' ? gold : std(0x1a0a0f, { metal: 0.5, rough: 0.3 }), 0.025, 0.2, 0.025);
      put(head, horn, top.clone().add(new THREE.Vector3(s * 0.08 * ws, -0.02 * ws, -0.03 * ws)), new THREE.Vector3(s * 0.35, 1, -0.5));
    }
    if (a.cls === 'yeutoc') for (const s of [-1, 1]) put(head, mesh(G.cone, std(a.hair, { rough: 0.45 }), 0.05, 0.14, 0.03), top.clone().add(new THREE.Vector3(s * 0.09 * ws, -0.03 * ws, 0)), new THREE.Vector3(s * 0.3, 1, 0));
    if (a.cls === 'thienton' || a.cls === 'kiemtien') put(head, mesh(G.torus, glow(0xffe9a8, 0.8), 0.26, 0.26, 0.26), top.clone().add(new THREE.Vector3(0, -0.08 * ws, -0.2 * ws)), FW);
    if (!vip) return;
    // VIP: vũ khí phát sáng → giáp vai vàng → mũ miện + vòng sáng → cánh linh quang → cánh lớn, hào quang vàng
    const col = VIP_COLORS[vip];
    if (this.weapon.children.length) { const s2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex(), color: col, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.7 })); s2.position.y = 0.5; s2.scale.set(0.35, 1.3, 1); this.weapon.add(s2); }
    if (vip >= 2) for (const s of ['L', 'R'] as const) { const ua = bone(`Bip01_${s}_UpperArm`); if (ua) put(ua, mesh(G.sphere, gold, 0.11, 0.08, 0.11), wp(ua).addScaledVector(UP, 0.05 * ws)); }
    if (vip >= 3 && head) {
      const cr = new THREE.Group(); const band = mesh(G.torus, gold, 0.1, 0.1, 0.6); band.rotation.x = Math.PI / 2; cr.add(band);
      for (let i = 0; i < 5; i++) { const sp = mesh(G.cone, gold, 0.02, 0.09 + (i === 2 ? 0.05 : 0), 0.02); const an = (i - 2) * 0.45; sp.position.set(Math.sin(an) * 0.1, 0.05, Math.cos(an) * 0.1); cr.add(sp); }
      put(head, cr, top.clone().addScaledVector(UP, -0.02 * ws));
      if (spine2) put(spine2, mesh(G.torus, glow(col, 0.85), 0.42, 0.42, 0.42), wp(spine2).add(new THREE.Vector3(0, 0.12 * ws, -0.3 * ws)), FW);
    }
    if (vip >= 4 && spine2) {
      const wm = glow(col, 0.55), big = vip >= 5 ? 1.55 : 1;
      for (const sd of [-1, 1]) {
        const gw = new THREE.Group();
        for (let i = 0; i < 6; i++) { const fe = mesh(new THREE.PlaneGeometry(0.16, 1, 1, 1), wm); fe.geometry.translate(0, 0.5, 0); fe.scale.set(big, (0.75 + (i < 3 ? i : 5 - i) * 0.18) * big, 1); fe.position.x = sd * (0.12 + i * 0.13) * big; fe.rotation.z = -sd * (0.25 + i * 0.22); gw.add(fe); }
        put(spine2, gw, wp(spine2).add(new THREE.Vector3(sd * 0.08 * ws, 0.05 * ws, -0.2 * ws)));
        this.wings.push({ g: gw, s: sd });
      }
    }
    if (vip >= 5 && spine2) put(spine2, mesh(G.torus, glow(0xffd04a, 0.6), 0.75, 0.75, 0.75), wp(spine2).add(new THREE.Vector3(0, 0.1 * ws, -0.36 * ws)), FW);
  }

  // ngoại hình VIP theo bậc: mỗi bậc thêm chi tiết, giữ lại chi tiết bậc dưới
  private addVip(t: number, robe: number) {
    const c = VIP_COLORS[t], gold = std(0xffd04a, { metal: 1, rough: 0.22, emissive: 0x7a4a00, ei: 0.35 });
    // bậc 1: vũ khí phát sáng, vòng tay vàng
    const wg = new THREE.Sprite(new THREE.SpriteMaterial({ map: softTex(), color: c, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.7 }));
    wg.position.y = 0.5; wg.scale.set(0.35, 1.3, 1); this.weapon.add(wg);
    for (const arm of [this.armL, this.armR]) { const br = mesh(G.cyl, gold, 0.06, 0.08, 0.06); br.position.y = -0.24; arm.low.add(br); }
    if (t >= 2) {
      // giáp vai vàng có gai, áo choàng
      for (const sd of [-1, 1]) {
        const pad = mesh(G.sphere, gold, 0.13, 0.09, 0.13); pad.position.set(sd * 0.26, 0.5, 0); this.torso.add(pad);
        const sp = mesh(G.cone, gold, 0.03, 0.14, 0.03); sp.position.set(sd * 0.32, 0.58, 0); sp.rotation.z = -sd * 0.6; this.torso.add(sp);
      }
      const cape = mesh(new THREE.PlaneGeometry(0.7, 1.55, 4, 10), cloth(t >= 4 ? 0xb8122e : new THREE.Color(robe).multiplyScalar(0.7).getHex(), c, 0.11));
      cape.geometry.translate(0, -0.77, 0); cape.position.set(0, 0.52, -0.19); cape.rotation.x = 0.14; this.torso.add(cape);
    }
    if (t >= 3) {
      // mũ miện vàng, vòng sáng sau lưng
      const crown = mesh(G.torus, gold, 0.11, 0.11, 0.6); crown.rotation.x = Math.PI / 2; crown.position.y = 0.24; this.head.add(crown);
      for (let i = 0; i < 5; i++) { const sp = mesh(G.cone, gold, 0.02, 0.09 + (i === 2 ? 0.05 : 0), 0.02); const a = (i - 2) * 0.45; sp.position.set(Math.sin(a) * 0.11, 0.29, Math.cos(a) * 0.11); this.head.add(sp); }
      const gem = mesh(G.sphere, glow(c, 1), 0.025); gem.position.set(0, 0.26, 0.115); this.head.add(gem);
      const ring = mesh(G.torus, glow(c, 0.85), 0.42, 0.42, 0.42); ring.position.set(0, 0.42, -0.32); this.torso.add(ring);
    }
    if (t >= 4) {
      // cánh linh quang (bậc 5 cánh lớn hơn), vỗ chậm
      const wm = glow(c, 0.55), big = t >= 5 ? 1.55 : 1;
      for (const sd of [-1, 1]) {
        const g = new THREE.Group(); g.position.set(sd * 0.1, 0.45, -0.2); this.torso.add(g);
        for (let i = 0; i < 6; i++) {
          const fe = mesh(new THREE.PlaneGeometry(0.16, 1, 1, 1), wm); fe.geometry.translate(0, 0.5, 0);
          fe.scale.set(big, (0.75 + (i < 3 ? i : 5 - i) * 0.18) * big, 1); fe.position.x = sd * (0.12 + i * 0.13) * big;
          fe.rotation.z = -sd * (0.25 + i * 0.22); g.add(fe);
        }
        this.wings.push({ g, s: sd });
      }
    }
    if (t >= 5) {
      // giáp ngực vàng toàn thân, vòng hào quang đứng
      const plate = mesh(G.capsule, gold, 0.215, 0.16, 0.17); plate.position.y = 0.33; this.torso.add(plate);
      const belt = mesh(G.cyl, gold, 0.24, 0.1, 0.19); belt.position.y = 0.06; this.torso.add(belt);
      for (const leg of [this.legL, this.legR]) { const g2 = mesh(G.cyl, gold, 0.085, 0.22, 0.085); g2.position.y = -0.2; leg.low.add(g2); }
      const halo = mesh(G.torus, glow(0xffd04a, 0.6), 0.75, 0.75, 0.75); halo.position.set(0, 0.35, -0.36); this.torso.add(halo);
    }
  }

  /* ---------------------------------------------------------- dữ liệu */
  setInfo(name: string, lv: number, sect: string, npc: boolean) {
    const sub = realmName(lv) + (this.vip ? ' · ' + VIP_NAMES[this.vip] : sect ? ' · ' + (sectByKey.get(sect)?.name ?? '') : '');
    const key = name + sub + npc;
    if (key !== this.labelKey) {
      this.labelKey = key;
      const m = this.label.material as THREE.SpriteMaterial; m.map?.dispose();
      m.map = labelTex(name.slice(0, 18), sub, hex(REALM_COLORS[realmOf(lv)]), npc); m.needsUpdate = true;
    }
    if (lv === this.lv) return;
    this.lv = lv;
    const r = realmOf(lv), c = REALM_COLORS[r];
    this.auraRing.material = glow(c, 0.12 + Math.min(0.28, r * 0.022));
    this.auraRing.scale.setScalar(0.7 + r * 0.08);
    const gm = this.auraGlow.material as THREE.SpriteMaterial; gm.color.setHex(c); gm.opacity = r < 3 ? 0 : 0.04 + r * 0.01;
    this.auraGlow.scale.set(1.8 + r * 0.12, 2.6 + r * 0.12, 1);
    // tiên giới: vòng hào quang sau đầu; từ Kim Tiên: cột sáng mờ
    if (r >= 10 && !this.halo) { this.halo = new THREE.Mesh(G.torus, glow(c, 0.9)); this.halo.scale.setScalar(0.32); this.halo.position.set(0, 0.17, -0.2); this.head.add(this.halo); }
    if (r >= 11 && !this.pillar) { this.pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.7, 5, 20, 1, true), glow(c, 0.05)); this.pillar.position.y = 2.5; this.root.add(this.pillar); }
  }
  setArtifacts(s: string) {
    if (s === this.artKey) return;
    this.artKey = s;
    for (const c of [...this.orbit.children]) this.orbit.remove(c);
    const list = s ? s.split(',').map(x => x.split(':')).map(([k, v]) => [k as ArtifactKey, +v] as const).sort((a, b) => b[1] - a[1]).slice(0, 4) : [];
    list.forEach(([k, lv], i) => { const m = artifactMesh(k); m.scale.setScalar(0.8 + Math.min(1.2, lv * 0.06)); m.userData.i = i; m.userData.n = list.length; this.orbit.add(m); });
  }
  setHp(hp: number, mhp: number, show: boolean) {
    this.hpBar.visible = show;
    if (!show) return;
    const r = Math.max(0, Math.min(1, hp / Math.max(1, mhp)));
    this.hpFill.scale.x = Math.max(0.001, r); this.hpFill.position.x = -(1 - r) * 0.58;
    (this.hpFill.material as THREE.MeshBasicMaterial).color.setHex(r > 0.5 ? 0x4dff88 : r > 0.25 ? 0xffd04a : 0xff4d4d);
  }
  setPose(p: Pose) { if (p !== this.pose) { this.pose = p; this.poseT = 0; } }
  flash() { this.hitT = 0.25; }

  /* ---------------------------------------------------------- hoạt ảnh */
  update(dt: number, t: number, cam: THREE.Camera) {
    // trượt tới vị trí server gửi
    const k = 1 - Math.exp(-dt * 6);
    this.x += (this.tx - this.x) * k; this.z += (this.tz - this.z) * k;
    let d = this.tRy - this.ry; d = Math.atan2(Math.sin(d), Math.cos(d)); this.ry += d * Math.min(1, dt * 8);
    this.root.position.set(this.x, 0, this.z);
    this.body.rotation.y = this.ry;
    this.poseT += dt; this.hitT = Math.max(0, this.hitT - dt);
    const ph = t * 1.0 + this.phase;
    // pháp bảo xoay quanh người
    this.orbit.children.forEach((m, i) => { const a = t * 1.2 + (i / Math.max(1, m.userData.n)) * Math.PI * 2; m.position.set(Math.sin(a) * 0.95, Math.sin(t * 2 + i) * 0.15, Math.cos(a) * 0.95); m.rotation.y = -a; });
    this.auraRing.rotation.z = t * 0.6;
    if (this.halo) this.halo.rotation.z = t;
    for (const w of this.wings) { w.g.rotation.y = w.s * (0.35 + Math.sin(t * 2.2 + this.phase) * 0.25); w.g.rotation.x = 0.1; }
    this.label.material.rotation = 0;
    this.hpBar.quaternion.copy(cam.quaternion);
    for (const m of this.flashMats) m.emissive.setRGB(this.hitT * 3, this.hitT * 0.6, this.hitT * 0.6);
    if (this.glb) { this.glb.play(this.pose); this.glb.update(dt); this.body.position.y = this.pose === 'med' ? 0.3 + Math.sin(ph) * 0.05 : 0; this.body.rotation.x = 0; return; }
    this.animate(dt, t, ph);
  }

  private animate(_dt: number, t: number, ph: number) {
    const L = this.legL, R = this.legR, AL = this.armL, AR = this.armR;
    const p = this.pose, pt = this.poseT;
    let hipY = 1.0, bodyY = 0, bodyX = 0, torsoX = 0, torsoY = 0, headX = 0;
    let lUp = 0, lLo = 0, rUp = 0, rLo = 0, lSpread = 0, rSpread = 0;
    let aLx = 0.1, aLz = 0.12, aLlo = -0.3, aRx = 0.1, aRz = -0.12, aRlo = -0.3;
    const breathe = Math.sin(ph * 1.6) * 0.02;
    if (p === 'med') {
      // ngồi thiền lơ lửng: xếp bằng, tay đặt trên gối
      bodyY = 0.35 + Math.sin(ph * 0.9) * 0.08; hipY = 0.45;
      lUp = -1.45; rUp = -1.45; lSpread = 0.75; rSpread = -0.75; lLo = 2.3; rLo = 2.3;
      aLx = -0.5; aLz = 0.35; aLlo = -1.0; aRx = -0.5; aRz = -0.35; aRlo = -1.0; headX = 0.08;
    } else if (p === 'move') {
      const s = Math.sin(t * 9 + this.phase);
      lUp = s * 0.7; rUp = -s * 0.7; lLo = Math.max(0, -s) * 1.1 + 0.15; rLo = Math.max(0, s) * 1.1 + 0.15;
      aLx = -s * 0.6; aRx = 0.2; aRlo = -0.8; torsoX = 0.18; bodyY = Math.abs(Math.cos(t * 9 + this.phase)) * 0.06;
    } else if (p === 'atk') {
      // chém: vung tay phải từ trên vai xuống chéo
      const k = Math.min(1, pt / 0.45), sw = k < 0.35 ? k / 0.35 : 1 - (k - 0.35) / 0.65 * 0.3;
      aRx = -2.6 * (k < 0.35 ? k / 0.35 : 1) + (k >= 0.35 ? 3.4 * Math.min(1, (k - 0.35) / 0.2) : 0); aRz = -0.4 + sw * 0.2; aRlo = -0.2;
      torsoY = k < 0.35 ? 0.5 * k / 0.35 : 0.5 - 1.0 * Math.min(1, (k - 0.35) / 0.25); torsoX = 0.15;
      lUp = -0.5; lLo = 0.6; rUp = 0.4; rLo = 0.2; aLx = -0.4; aLz = 0.5;
    } else if (p === 'cast') {
      // thi pháp: hai tay đẩy về trước, người hơi bay lên
      const k = Math.min(1, pt / 0.3);
      aLx = -1.4 * k; aRx = -1.4 * k; aLz = 0.15; aRz = -0.15; aLlo = -0.15; aRlo = -0.15; torsoX = -0.08; bodyY = 0.15 * k;
      lUp = -0.2; rUp = 0.25; lLo = 0.3;
    } else if (p === 'hit') {
      torsoX = -0.35; headX = -0.3; aLx = 0.4; aRx = 0.4; aLz = 0.6; aRz = -0.6;
    } else if (p === 'down') {
      const k = Math.min(1, pt / 0.6);
      bodyX = -k * Math.PI / 2 * 0.95; bodyY = k * 0.15; aLz = 1.2; aRz = -1.2; lUp = 0.2; rUp = -0.1;
    } else if (p === 'win') {
      aRx = -2.9; aRz = -0.2; aRlo = -0.1; aLx = 0; aLz = 0.5; bodyY = Math.abs(Math.sin(t * 4)) * 0.1;
    } else {
      // đứng thủ thế, thở nhẹ
      aRx = -0.5 + Math.sin(ph) * 0.05; aRlo = -0.9; aLx = 0.15 + Math.sin(ph + 1) * 0.04; aLz = 0.18;
      lUp = 0.08; rUp = -0.08; lLo = 0.1; rLo = 0.1; torsoX = breathe;
    }
    this.hips.position.y = hipY + (p === 'med' ? 0 : breathe * 0.3);
    this.body.position.y = bodyY; this.body.rotation.x = bodyX;
    this.torso.rotation.set(torsoX, torsoY, 0); this.head.rotation.x = headX;
    L.root.rotation.set(lUp, 0, lSpread); L.low.rotation.x = lLo;
    R.root.rotation.set(rUp, 0, rSpread); R.low.rotation.x = rLo;
    AL.root.rotation.set(aLx, 0, aLz); AL.low.rotation.x = aLlo;
    AR.root.rotation.set(aRx, 0, aRz); AR.low.rotation.x = aRlo;
  }
  dispose() {
    (this.label.material as THREE.SpriteMaterial).map?.dispose(); this.label.material.dispose();
    this.glb?.dispose();
    for (const m of this.ownMats) m.dispose();
    this.root.removeFromParent();
  }
  // tâm ngực theo toạ độ thế giới (điểm xuất chiêu)
  chest(out = new THREE.Vector3()) { return out.set(this.x, (this.pose === 'med' ? 1.0 : 1.35) * this.scale * this.root.scale.y, this.z); }
}
