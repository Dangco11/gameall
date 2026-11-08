import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { carpet, marble, panels, wood } from './tex.ts';

// Thư viện chất liệu PBR dùng chung cả quán (mỗi chất liệu tạo một lần)
const P = (o: THREE.MeshPhysicalMaterialParameters) => new THREE.MeshPhysicalMaterial(o);
let made: ReturnType<typeof build> | null = null;
export const M = () => made ??= build();

function build(){
  const floor = marble('floor', [20, 20, 26], [120, 110, 130], { scale: 3, sharp: 9, tiles: 4 });
  const white = marble('white', [236, 232, 226], [120, 116, 120], { scale: 5, sharp: 7 });
  const onyx = marble('onyx', [250, 190, 100], [150, 70, 20], { scale: 3, sharp: 3 });
  const black = marble('nero', [16, 15, 18], [180, 160, 120], { scale: 4, sharp: 10, gold: true });
  return {
    floor: P({ name: 'floor', map: floor.map, roughnessMap: floor.rough, roughness: 0.55, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.12, envMapIntensity: 0.9 }),
    marbleWhite: P({ name: 'marble', map: white.map, roughnessMap: white.rough, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.06, envMapIntensity: 1 }),
    marbleBlack: P({ name: 'marbleBlack', map: black.map, roughnessMap: black.rough, roughness: 0.5, clearcoat: 1, clearcoatRoughness: 0.05 }),
    onyx: P({ name: 'onyx', map: onyx.map, emissiveMap: onyx.map, emissive: 0xffffff, emissiveIntensity: 0.38, roughness: 0.2, clearcoat: 1 }),
    lacquer: P({ name: 'lacquer', color: 0x08080b, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08 }),
    matteBlack: P({ name: 'matteBlack', color: 0x0d0d10, roughness: 0.85 }),
    acoustic: P({ name: 'acoustic', map: panels('acoustic', '#16141c', '#060509', 24), roughness: 0.9 }),
    stoneWall: P({ name: 'stone', map: panels('stone', '#2a2630', '#0b0a0e', 6), roughness: 0.7, clearcoat: 0.2 }),
    walnut: P({ name: 'walnut', map: wood(), roughness: 0.45, clearcoat: 0.7, clearcoatRoughness: 0.2 }),
    walnutSlat: P({ name: 'walnutSlat', map: wood('slat', [90, 56, 34]), roughness: 0.5, clearcoat: 0.4 }),
    brass: P({ name: 'brass', color: 0xd9a75a, metalness: 1, roughness: 0.26 }),
    gold: P({ name: 'gold', color: 0xffc860, metalness: 1, roughness: 0.18 }),
    chrome: P({ name: 'chrome', color: 0xffffff, metalness: 1, roughness: 0.06 }),
    steel: P({ name: 'steel', color: 0xc9ced3, metalness: 1, roughness: 0.32 }),
    darkSteel: P({ name: 'darkSteel', color: 0x2a2c30, metalness: 1, roughness: 0.4 }),
    leather: P({ name: 'leather', color: 0x151214, roughness: 0.42, sheen: 0.5, sheenRoughness: 0.4, sheenColor: new THREE.Color(0x504048), clearcoat: 0.3, clearcoatRoughness: 0.4 }),
    leatherWine: P({ name: 'leatherWine', color: 0x4a0a18, roughness: 0.4, sheen: 0.6, sheenRoughness: 0.35, sheenColor: new THREE.Color(0xa03050), clearcoat: 0.35, clearcoatRoughness: 0.35 }),
    velvet: P({ name: 'velvet', color: 0x2a0d44, roughness: 0.9, sheen: 1, sheenRoughness: 0.3, sheenColor: new THREE.Color(0xb070ff) }),
    velvetGold: P({ name: 'velvetGold', color: 0x5a3a10, roughness: 0.85, sheen: 1, sheenRoughness: 0.3, sheenColor: new THREE.Color(0xffd080) }),
    carpet: P({ name: 'carpet', map: carpet(), roughness: 0.95, sheen: 0.6, sheenColor: new THREE.Color(0x8a2040) }),
    glass: P({ name: 'glassPanel', color: 0xffffff, roughness: 0.03, metalness: 0, transparent: true, opacity: 0.14, clearcoat: 1, depthWrite: false, side: THREE.DoubleSide, envMapIntensity: 1.5 }),
    smoked: P({ name: 'smoked', color: 0x22262c, roughness: 0.05, transparent: true, opacity: 0.42, clearcoat: 1, depthWrite: false, side: THREE.DoubleSide }),
    rubber: P({ name: 'rubber', color: 0x0a0a0a, roughness: 0.75 }),
    plastic: P({ name: 'plastic', color: 0x1a1a1e, roughness: 0.4, clearcoat: 0.4 }),
    leaf: P({ name: 'leaf', color: 0x2e6a2a, roughness: 0.55, side: THREE.DoubleSide, sheen: 0.5, sheenColor: new THREE.Color(0x7fc070) }),
    soil: P({ name: 'soil', color: 0x1c140e, roughness: 1 }),
    ceramic: P({ name: 'ceramic', color: 0xf0ede8, roughness: 0.25, clearcoat: 0.8 }),
    concrete: P({ name: 'concrete', color: 0x3a3a3e, roughness: 0.9 }),
    fabric: P({ name: 'fabric', color: 0xd8cfc0, roughness: 0.9, sheen: 0.4 }),
  };
}

// Đèn LED: chất liệu phát sáng (màu đổi theo màn diễn được), cường độ trên 1 để bloom tỏa quầng
export function led(color: number, intensity = 3){ return new THREE.MeshStandardMaterial({ color: 0x000000, emissive: color, emissiveIntensity: intensity, roughness: 0.4 }); }

// hình khối nhanh
export function box(w: number, h: number, d: number, m: THREE.Material, x = 0, y = 0, z = 0, parent?: THREE.Object3D, r = 0){
  const g = r > 0 ? new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2.01, h / 2.01, d / 2.01)) : new THREE.BoxGeometry(w, h, d);
  const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true;
  parent?.add(o);
  return o;
}
export function cyl(rt: number, rb: number, h: number, m: THREE.Material, x = 0, y = 0, z = 0, parent?: THREE.Object3D, seg = 24){
  const o = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true;
  parent?.add(o);
  return o;
}
export function lathe(pts: [number, number][], m: THREE.Material, seg = 32){
  const o = new THREE.Mesh(new THREE.LatheGeometry(pts.map(([r, y]) => new THREE.Vector2(r, y)), seg), m); o.castShadow = true; o.receiveShadow = true;
  return o;
}
// nhiều bản sao một hình (ghế, đèn âm trần, chai...) trong một lệnh vẽ
export function instances(geo: THREE.BufferGeometry, mat: THREE.Material, mats: THREE.Matrix4[], colors?: THREE.Color[], parent?: THREE.Object3D){
  const im = new THREE.InstancedMesh(geo, mat, mats.length);
  mats.forEach((m, i) => im.setMatrixAt(i, m));
  if (colors) colors.forEach((c, i) => im.setColorAt(i, c));
  im.castShadow = true; im.receiveShadow = true;
  im.computeBoundingSphere();
  parent?.add(im);
  return im;
}
const _o = new THREE.Object3D();
export function mat4(x: number, y: number, z: number, ry = 0, s = 1, rx = 0, rz = 0){ _o.position.set(x, y, z); _o.rotation.set(rx, ry, rz); _o.scale.setScalar(s); _o.updateMatrix(); return _o.matrix.clone(); }
