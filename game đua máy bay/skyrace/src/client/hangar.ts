import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky.js';
import { COLORS, F, PLANES } from '../shared/game.ts';
import { PlaneRig, blueprint, loadPlaneModels } from './glb.ts';
import type { Maneuver, RigInput } from './glb.ts';

// Xưởng máy bay: xem từng mẫu xoay tròn dưới nắng, bấm thử hoạt ảnh, bánh đáp, lửa phản lực.
//   /hangar.html            cả 10 mẫu xếp hàng
//   /hangar.html?p=fighter  một mẫu, máy quay cận
const params = new URLSearchParams(location.search);
const one = params.get('p');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.append(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 0.3, 5000);
const sky = new Sky(); sky.scale.setScalar(4000);
const sunDir = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(62), THREE.MathUtils.degToRad(200));
Object.assign(sky.material.uniforms, {}); sky.material.uniforms.sunPosition.value.copy(sunDir);
sky.material.uniforms.turbidity.value = 4; sky.material.uniforms.rayleigh.value = 1.2;
scene.add(sky);
const pm = new THREE.PMREMGenerator(renderer), env = new THREE.Scene(); env.add(sky.clone());
scene.environment = pm.fromScene(env).texture;
scene.add(new THREE.HemisphereLight(0xdfefff, 0x555a60, 0.6));
const sun = new THREE.DirectionalLight(0xfff2e0, 3); sun.position.copy(sunDir).multiplyScalar(80); sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096); Object.assign(sun.shadow.camera, { left: -90, right: 90, top: 90, bottom: -90, far: 300 }); sun.shadow.bias = -0.0004;
scene.add(sun);
const floor = new THREE.Mesh(new THREE.CircleGeometry(400, 64).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x5a6068, roughness: 0.7, metalness: 0.1 }));
floor.receiveShadow = true; scene.add(floor);

await loadPlaneModels();
const list = one ? PLANES.filter(p => p.key === one) : PLANES;
const rigs = list.map((p, i) => {
  const rig = new PlaneRig(p.key, COLORS[(i * 3 + 1) % COLORS.length].hex, String(10 + i * 7));
  const cols = 5, x = one ? 0 : (i % cols - 2) * 28, z = one ? 0 : (Math.floor(i / cols) - 0.5) * -30;
  rig.root.position.set(x, rig.gearH, z);
  scene.add(rig.root);
  const tag = document.createElement('div'); tag.className = 'tag'; tag.textContent = `${p.name} · ${Math.round(blueprint(p.key).tris / 1000)}k tam giác`; document.body.append(tag);
  return { rig, tag, base: rig.root.position.clone() };
});
const ui = document.createElement('div'); ui.className = 'bar'; document.body.append(ui);
let gear = 1, boost = 0, fly = false;
const btn = (t: string, fn: () => void) => { const b = document.createElement('button'); b.textContent = t; b.onclick = fn; ui.append(b); };
for (const m of ['roll', 'barrel', 'loop', 'crash', 'victory'] as Maneuver[]) btn(m, () => { fly = true; gear = 0; for (const r of rigs) r.rig.maneuver(m); });
btn('bánh đáp', () => { gear = gear ? 0 : 1; });
btn('boost', () => { boost = (boost + 1) % 5; });
btn('bay / đỗ', () => { fly = !fly; gear = fly ? 0 : 1; });
const flagFor = [0, F.BOOST, F.ENGINE, F.NITRO, F.SUPER | F.JET];
let last = performance.now(), ang = 0;
renderer.setAnimationLoop(() => {
  const now = performance.now(), dt = Math.min(0.05, (now - last) / 1000); last = now; ang += dt * 0.25;
  const sz = one ? blueprint(list[0].key).size : 0, R = one ? sz * 1.25 : 95;
  camera.position.set(Math.cos(ang) * R, one ? sz * 0.32 + (fly ? 12 : 0) : 38, Math.sin(ang) * R); camera.lookAt(0, one ? 2 + (fly ? 12 : 0) : 4, 0);
  for (const { rig, tag, base } of rigs){
    rig.root.position.y = base.y + (fly ? 12 : 0);
    const inp: RigInput = { dt, t: now / 1000, speed: fly ? 60 : 0, throttle: fly ? 1 : 0.1, roll: Math.sin(now / 900) * 0.8, pitch: Math.sin(now / 700) * 0.6, yaw: Math.sin(now / 1100) * 0.6,
      gear, ground: !fly, mode: fly ? 'fly' : 'grid', flags: flagFor[boost] };
    rig.update(inp);
    const p = rig.root.position.clone().add(new THREE.Vector3(0, rig.size * 0.45, 0)).project(camera);
    tag.style.transform = `translate(${(p.x * 0.5 + 0.5) * innerWidth}px, ${(-p.y * 0.5 + 0.5) * innerHeight}px) translate(-50%, -100%)`;
  }
  renderer.render(scene, camera);
});
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
