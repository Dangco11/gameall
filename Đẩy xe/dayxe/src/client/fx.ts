import * as THREE from 'three';
import { GlbActor, hasModel } from './glb.ts';

// Bộ hiệu ứng quà: cột sáng từ trời, vòm năng lượng, sóng xung kích, vết nứt / hố cháy trên đường, đá vụn văng có trọng lực,
// vệt sáng bay theo vật thể, cầu lửa nổ, đèn chớp. Mọi hiệu ứng tự huỷ khi hết giờ.
const TAU = Math.PI * 2;
const canvas = (w: number, h: number) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const ctex = (c: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
// ảnh dùng chung
const TEX = {
  // dải sáng dọc: đậm giữa, mờ hai mép và hai đầu (cho cột sáng)
  beam: (() => { const c = canvas(64, 256), g = c.getContext('2d')!; for (let y = 0; y < 256; y++) { const v = Math.sin(y / 255 * Math.PI) ** 0.6; const gr = g.createLinearGradient(0, 0, 64, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, `rgba(255,255,255,${v})`); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, y, 64, 1); } return ctex(c); })(),
  // vòng sáng mềm (sóng xung kích)
  ring: (() => { const c = canvas(256, 256), g = c.getContext('2d')!; const gr = g.createRadialGradient(128, 128, 60, 128, 128, 128); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.7, 'rgba(255,255,255,.9)'); gr.addColorStop(0.82, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); return ctex(c); })(),
  // vết nứt mặt đất toả từ tâm
  crack: (() => { const c = canvas(512, 512), g = c.getContext('2d')!; g.strokeStyle = 'rgba(30,18,10,.95)'; g.lineCap = 'round';
    const br = (x: number, y: number, a: number, len: number, w: number, d: number) => { if (d > 4 || len < 8) return; const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len; g.lineWidth = w; g.beginPath(); g.moveTo(x, y); g.lineTo(x2, y2); g.stroke(); br(x2, y2, a + (Math.random() - 0.5) * 0.9, len * 0.75, w * 0.7, d + 1); if (Math.random() < 0.6) br(x2, y2, a + (Math.random() - 0.5) * 1.8, len * 0.6, w * 0.6, d + 1); };
    for (let i = 0; i < 9; i++) br(256, 256, i / 9 * TAU + Math.random() * 0.4, 50 + Math.random() * 30, 9, 0);
    const gr = g.createRadialGradient(256, 256, 0, 256, 256, 90); gr.addColorStop(0, 'rgba(25,15,8,.8)'); gr.addColorStop(1, 'rgba(25,15,8,0)'); g.fillStyle = gr; g.fillRect(0, 0, 512, 512); return ctex(c); })(),
  // hố cháy: tâm nung đỏ, viền cháy đen
  crater: (() => { const c = canvas(256, 256), g = c.getContext('2d')!; const gr = g.createRadialGradient(128, 128, 0, 128, 128, 128); gr.addColorStop(0, 'rgba(255,200,90,1)'); gr.addColorStop(0.18, 'rgba(255,90,20,.95)'); gr.addColorStop(0.35, 'rgba(60,20,8,.95)'); gr.addColorStop(0.75, 'rgba(20,12,8,.6)'); gr.addColorStop(1, 'rgba(20,12,8,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256); return ctex(c); })(),
  // quả cầu lửa có vân
  fire: (() => { const c = canvas(256, 256), g = c.getContext('2d')!; g.fillStyle = '#ff8a20'; g.fillRect(0, 0, 256, 256); for (let i = 0; i < 400; i++) { const x = Math.random() * 256, y = Math.random() * 256, r = 6 + Math.random() * 26; const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, Math.random() < 0.5 ? 'rgba(255,240,140,.7)' : 'rgba(200,40,10,.6)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2); } const t = ctex(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; return t; })(),
  glow: (() => { const c = canvas(128, 128), g = c.getContext('2d')!; const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.3, 'rgba(255,255,255,.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return ctex(c); })(),
  // tia sao (chớp va chạm)
  star: (() => { const c = canvas(256, 256), g = c.getContext('2d')!; g.translate(128, 128); for (let i = 0; i < 12; i++) { g.rotate(TAU / 12); const gr = g.createLinearGradient(0, 0, 128, 0); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.beginPath(); g.moveTo(0, -6 + (i % 2) * 3); g.lineTo(128 - (i % 2) * 40, 0); g.lineTo(0, 6 - (i % 2) * 3); g.fill(); } return ctex(c); })(),
};
const add = THREE.AdditiveBlending;
interface Live { t: number; dur: number; tick(dt: number, k: number, t: number): void; end(): void }

export class FX {
  private scene: THREE.Scene; private live: Live[] = [];
  private lights: THREE.PointLight[] = [];
  private rockG = new THREE.DodecahedronGeometry(0.35, 0);
  private rockM = new THREE.MeshStandardMaterial({ color: 0x7a5a3c, roughness: 0.95, flatShading: true });
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    // đèn chớp dùng lại (số đèn cố định, không làm biên dịch lại shader)
    for (let i = 0; i < 3; i++) { const l = new THREE.PointLight(0xffffff, 0, 40, 1.5); l.position.set(0, -50, 0); scene.add(l); this.lights.push(l); }
  }
  private push(l: Live) { this.live.push(l); }
  update(dt: number, time: number) { for (let i = this.live.length - 1; i >= 0; i--) { const l = this.live[i]; l.t += dt; l.tick(dt, Math.min(1, l.t / l.dur), time); if (l.t >= l.dur) { l.end(); this.live.splice(i, 1); } } }
  clear() { for (const l of this.live) l.end(); this.live = []; }

  // hiệu ứng mô hình GLB (fx-*.glb): phát động tác của file, vật liệu fx_* hoà sáng cộng màu, nhuộm màu, lớn dần, mờ dần rồi tự huỷ.
  // Trả false khi chưa có file (nơi gọi dùng bản dựng bằng code).
  glb(name: string, o: { at: THREE.Vector3 | (() => THREE.Vector3); dur: number; scale?: number | [number, number]; sx?: number; rotY?: number; rotZ?: number; tint?: THREE.ColorRepresentation; clip?: string; speed?: number; vel?: THREE.Vector3; opacity?: number }) {
    if (!hasModel(name)) return false;
    const a = new GlbActor(name, 0); a.play(o.clip ?? 'spin'); const tint = o.tint !== undefined ? new THREE.Color(o.tint) : null, mats: THREE.MeshStandardMaterial[] = [];
    a.root.traverse(m => { const mesh = m as THREE.Mesh; if (!mesh.isMesh) return; const mat = (mesh.material as THREE.MeshStandardMaterial).clone(); if (mat.name.startsWith('fx_')) { mat.blending = add; mat.depthWrite = false; mat.transparent = true; if (tint) { mat.color.multiply(tint); mat.emissive.multiply(tint); } } mesh.material = mat; mesh.castShadow = false; mesh.renderOrder = 5; mats.push(mat); });
    const g = new THREE.Group(); g.add(a.root); g.rotation.y = o.rotY ?? 0; g.rotation.z = o.rotZ ?? 0; this.scene.add(g);
    const pos = new THREE.Vector3(), [s0, s1] = Array.isArray(o.scale) ? o.scale : [o.scale ?? 1, o.scale ?? 1], op = o.opacity ?? 1;
    this.push({ t: 0, dur: o.dur, tick: (dt, k) => {
      if (typeof o.at === 'function') pos.copy(o.at()); else if (k === 0 || !o.vel) pos.copy(o.at); if (o.vel) pos.addScaledVector(o.vel, dt);
      g.position.copy(pos); const s = s0 + (s1 - s0) * (1 - (1 - k) ** 2); g.scale.set(s * (o.sx ?? 1), s, s);
      const f = Math.min(1, k * 6) * (k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1); for (const m of mats) m.opacity = op * f;
      a.update(dt * (o.speed ?? 1));
    }, end: () => { g.removeFromParent(); a.dispose(); for (const m of mats) m.dispose(); } });
    return true;
  }
  // đèn chớp tại một điểm (màu, cường độ, thời gian)
  light(p: THREE.Vector3, color: THREE.ColorRepresentation, intensity: number, dur: number) {
    const l = this.lights.reduce((a, b) => (a.intensity < b.intensity ? a : b)); l.position.copy(p); l.color.set(color);
    this.push({ t: 0, dur, tick: (_dt, k) => { l.intensity = intensity * (1 - k) * (1 - k); }, end: () => { l.intensity = 0; } });
  }
  // cột sáng từ trời rọi xuống (hai lớp quay ngược chiều + quầng chân cột)
  pillar(x: number, z: number, color: THREE.ColorRepresentation, r: number, dur: number, h = 60) {
    if (this.glb('fx-cot-sang', { at: new THREE.Vector3(x, 0, z), dur, scale: r / 1.4, tint: color, speed: 1.5 })) { this.glb('fx-phap-tran', { at: new THREE.Vector3(x, 0.05, z), dur, scale: [r * 0.6, r * 1.1], tint: color }); return; }
    const g = new THREE.Group(); g.position.set(x, 0, z);
    const mk = (rr: number, op: number) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr, h, 24, 1, true), new THREE.MeshBasicMaterial({ map: TEX.beam, color, transparent: true, opacity: op, blending: add, depthWrite: false, side: THREE.DoubleSide })); m.position.y = h / 2; g.add(m); return m; };
    const outer = mk(r, 0.55), inner = mk(r * 0.45, 0.9);
    const base = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color, transparent: true, blending: add, depthWrite: false })); base.scale.setScalar(r * 5); base.position.y = 0.5; g.add(base);
    this.scene.add(g);
    this.push({ t: 0, dur, tick: (_dt, k, t) => { const a = Math.min(1, k * 6) * (1 - Math.max(0, (k - 0.7) / 0.3)); outer.rotation.y = t * 1.5; inner.rotation.y = -t * 2.5; (outer.material as THREE.MeshBasicMaterial).opacity = 0.55 * a; (inner.material as THREE.MeshBasicMaterial).opacity = 0.9 * a; base.material.opacity = a; const s = 1 + Math.sin(t * 10) * 0.05; outer.scale.set(s, 1, s); },
      end: () => { g.removeFromParent(); g.traverse(o => { const m = o as THREE.Mesh; m.geometry?.dispose(); (m.material as THREE.Material)?.dispose(); }); } });
  }
  // sóng xung kích trên mặt đất
  ring(x: number, z: number, color: THREE.ColorRepresentation, size: number, dur = 0.8) {
    if (this.glb('fx-song', { at: new THREE.Vector3(x, 0.1, z), dur, scale: [0.4, size * 0.55], tint: color })) return;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ map: TEX.ring, color, transparent: true, blending: add, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.12, z); this.scene.add(m);
    this.push({ t: 0, dur, tick: (_dt, k) => { const e = 1 - (1 - k) ** 3; m.scale.setScalar(0.3 + e * size); (m.material as THREE.MeshBasicMaterial).opacity = 1 - k; }, end: () => { m.removeFromParent(); m.geometry.dispose(); (m.material as THREE.Material).dispose(); } });
  }
  // vòm năng lượng nở ra (bán cầu sáng)
  dome(p: THREE.Vector3, color: THREE.ColorRepresentation, size: number, dur = 0.9) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16, 0, TAU, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6, blending: add, depthWrite: false, side: THREE.DoubleSide })); m.position.copy(p); this.scene.add(m);
    const w = new THREE.Mesh(new THREE.SphereGeometry(1.02, 24, 12, 0, TAU, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.35, blending: add, depthWrite: false })); m.add(w);
    this.push({ t: 0, dur, tick: (_dt, k) => { const e = 1 - (1 - k) ** 3; m.scale.setScalar(0.5 + e * size); (m.material as THREE.MeshBasicMaterial).opacity = 0.55 * (1 - k); (w.material as THREE.MeshBasicMaterial).opacity = 0.35 * (1 - k); }, end: () => { m.removeFromParent(); m.geometry.dispose(); w.geometry.dispose(); (m.material as THREE.Material).dispose(); (w.material as THREE.Material).dispose(); } });
  }
  // chớp sao toả tia tại điểm va chạm
  star(p: THREE.Vector3, color: THREE.ColorRepresentation, size: number, dur = 0.35) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.star, color, transparent: true, blending: add, depthWrite: false })); s.position.copy(p); s.material.rotation = Math.random() * TAU; this.scene.add(s);
    const c = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0xffffff, transparent: true, blending: add, depthWrite: false })); c.position.copy(p); this.scene.add(c);
    this.push({ t: 0, dur, tick: (_dt, k) => { s.scale.setScalar(size * (0.4 + k * 0.9)); s.material.opacity = 1 - k; c.scale.setScalar(size * 0.6 * (1 - k * 0.5)); c.material.opacity = 1 - k; }, end: () => { s.removeFromParent(); c.removeFromParent(); s.material.dispose(); c.material.dispose(); } });
  }
  // vết trên mặt đường: nứt toả (crack) hoặc hố cháy đỏ (crater), mờ dần
  decal(x: number, z: number, kind: 'crack' | 'crater', size: number, dur = 6) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshBasicMaterial({ map: kind === 'crack' ? TEX.crack : TEX.crater, transparent: true, depthWrite: false, blending: kind === 'crater' ? THREE.NormalBlending : THREE.NormalBlending }));
    m.rotation.x = -Math.PI / 2; m.rotation.z = Math.random() * TAU; m.position.set(x, 0.03 + Math.random() * 0.01, z); m.renderOrder = 1; this.scene.add(m);
    this.push({ t: 0, dur, tick: (_dt, k) => { const grow = Math.min(1, k * 8); m.scale.setScalar(0.3 + grow * 0.7); (m.material as THREE.MeshBasicMaterial).opacity = k < 0.7 ? 1 : 1 - (k - 0.7) / 0.3; }, end: () => { m.removeFromParent(); m.geometry.dispose(); (m.material as THREE.Material).dispose(); } });
  }
  // đá vụn văng ra rồi rơi nảy trên đường
  debris(p: THREE.Vector3, n: number, speed: number, color: THREE.ColorRepresentation = 0x7a5a3c, dur = 2.4) {
    const im = new THREE.InstancedMesh(this.rockG, this.rockM.clone(), n); (im.material as THREE.MeshStandardMaterial).color.set(color); im.castShadow = true; this.scene.add(im);
    const st = Array.from({ length: n }, () => ({ p: p.clone(), v: new THREE.Vector3((Math.random() - 0.5) * 2, 0.6 + Math.random(), (Math.random() - 0.5) * 2).normalize().multiplyScalar(speed * (0.4 + Math.random() * 0.8)), r: new THREE.Euler(Math.random() * 6, Math.random() * 6, 0), s: 0.4 + Math.random() * 1.1, w: (Math.random() - 0.5) * 12 }));
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3();
    this.push({ t: 0, dur, tick: (dt, k) => { st.forEach((o, i) => { o.v.y -= 22 * dt; o.p.addScaledVector(o.v, dt); if (o.p.y < 0.15) { o.p.y = 0.15; o.v.y *= -0.35; o.v.x *= 0.7; o.v.z *= 0.7; o.w *= 0.7; } o.r.x += o.w * dt; o.r.y += o.w * 0.7 * dt; m4.compose(o.p, q.setFromEuler(o.r), sc.setScalar(o.s * (k > 0.75 ? 1 - (k - 0.75) / 0.25 : 1))); im.setMatrixAt(i, m4); }); im.instanceMatrix.needsUpdate = true; },
      end: () => { im.removeFromParent(); im.dispose(); (im.material as THREE.Material).dispose(); } });
  }
  // cầu lửa nổ nở to (vân lửa trôi) + quầng sáng
  fireball(p: THREE.Vector3, size: number, dur = 1.1) {
    const tex = TEX.fire.clone(); tex.needsUpdate = true;
    const m = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 18), new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: add, depthWrite: false })); m.position.copy(p); this.scene.add(m);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX.glow, color: 0xffa040, transparent: true, blending: add, depthWrite: false })); halo.position.copy(p); this.scene.add(halo);
    this.push({ t: 0, dur, tick: (_dt, k, t) => { const e = 1 - (1 - k) ** 2; m.scale.setScalar(0.4 + e * size); tex.offset.set(t * 0.3, t * 0.5); (m.material as THREE.MeshBasicMaterial).opacity = 1 - k; m.position.y = p.y + e * size * 0.3; halo.scale.setScalar(size * 4 * (0.5 + e)); halo.material.opacity = 1 - k; },
      end: () => { m.removeFromParent(); halo.removeFromParent(); m.geometry.dispose(); (m.material as THREE.Material).dispose(); halo.material.dispose(); tex.dispose(); } });
  }
  // vệt sáng bay theo một vật (dải băng mỏng dần về đuôi), get() trả vị trí hiện tại
  trail(get: () => THREE.Vector3 | null, color: THREE.ColorRepresentation, width: number, dur: number, len = 26) {
    const pts: THREE.Vector3[] = [], geo = new THREE.BufferGeometry(), pos = new Float32Array(len * 2 * 3), alpha = new Float32Array(len * 2);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('a', new THREE.BufferAttribute(alpha, 1));
    const idx: number[] = []; for (let i = 0; i < len - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); } geo.setIndex(idx);
    const mat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: add, side: THREE.DoubleSide, uniforms: { c: { value: new THREE.Color(color) }, o: { value: 1 } },
      vertexShader: 'attribute float a; varying float vA; void main(){ vA = a; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform vec3 c; uniform float o; varying float vA; void main(){ gl_FragColor = vec4(mix(c, vec3(1.0), vA * 0.5), vA * o); }' });
    const mesh = new THREE.Mesh(geo, mat); mesh.frustumCulled = false; this.scene.add(mesh);
    this.push({ t: 0, dur, tick: (_dt, k) => {
      const p = get(); if (p) { pts.unshift(p.clone()); if (pts.length > len) pts.pop(); }
      for (let i = 0; i < len; i++) {
        const a = pts[Math.min(i, pts.length - 1)] ?? new THREE.Vector3(), b = pts[Math.min(i + 1, pts.length - 1)] ?? a, d = new THREE.Vector3().subVectors(a, b), n = new THREE.Vector3(-d.y, d.x, 0).normalize().multiplyScalar(width * (1 - i / len));
        if (!isFinite(n.x)) n.set(0, width, 0);
        pos.set([a.x + n.x, a.y + n.y, a.z, a.x - n.x, a.y - n.y, a.z], i * 6); alpha[i * 2] = alpha[i * 2 + 1] = (1 - i / len) * (i < pts.length ? 1 : 0);
      }
      geo.attributes.position.needsUpdate = true; geo.attributes.a.needsUpdate = true; mat.uniforms.o.value = k > 0.8 ? 1 - (k - 0.8) / 0.2 : 1;
    }, end: () => { mesh.removeFromParent(); geo.dispose(); mat.dispose(); } });
  }
  // cột lửa / phun lửa hình nón từ a tới b (rồng phun)
  breath(get: () => { from: THREE.Vector3; to: THREE.Vector3 } | null, dur: number) {
    const tex = TEX.fire.clone(); tex.needsUpdate = true; tex.repeat.set(1, 2);
    const m = new THREE.Mesh(new THREE.ConeGeometry(1, 1, 20, 1, true), new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: add, depthWrite: false, side: THREE.DoubleSide, opacity: 0.9 })); this.scene.add(m);
    const core = new THREE.Mesh(new THREE.ConeGeometry(0.45, 1, 14, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff0a0, transparent: true, blending: add, depthWrite: false, side: THREE.DoubleSide, opacity: 0.8 })); this.scene.add(core);
    this.push({ t: 0, dur, tick: (_dt, k, t) => {
      const ab = get(); m.visible = core.visible = !!ab; if (!ab) return;
      const d = new THREE.Vector3().subVectors(ab.to, ab.from), L = d.length(), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), d.clone().normalize());
      const w = Math.min(1, k * 5) * (k > 0.85 ? 1 - (k - 0.85) / 0.15 : 1);
      for (const [o, r] of [[m, 2.4], [core, 1]] as const) { o.position.copy(ab.from).addScaledVector(d, 0.5); o.quaternion.copy(q); o.scale.set(r * w * (0.9 + Math.random() * 0.2), L, r * w * (0.9 + Math.random() * 0.2)); }
      tex.offset.y = -t * 2.5; (m.material as THREE.MeshBasicMaterial).opacity = 0.9 * w; (core.material as THREE.MeshBasicMaterial).opacity = 0.8 * w;
    }, end: () => { m.removeFromParent(); core.removeFromParent(); m.geometry.dispose(); core.geometry.dispose(); (m.material as THREE.Material).dispose(); (core.material as THREE.Material).dispose(); tex.dispose(); } });
  }
  // vòng cảnh báo nhấp nháy trên đất (chỗ thiên thạch sắp rơi)
  warn(x: number, z: number, color: THREE.ColorRepresentation, size: number, dur: number) {
    const m = new THREE.Mesh(new THREE.RingGeometry(size * 0.85, size, 48), new THREE.MeshBasicMaterial({ color, transparent: true, blending: add, depthWrite: false })); m.rotation.x = -Math.PI / 2; m.position.set(x, 0.1, z); this.scene.add(m);
    const f = new THREE.Mesh(new THREE.CircleGeometry(size * 0.85, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2, blending: add, depthWrite: false })); f.rotation.x = -Math.PI / 2; f.position.set(x, 0.09, z); this.scene.add(f);
    this.push({ t: 0, dur, tick: (_dt, k, t) => { const b = 0.5 + 0.5 * Math.sin(t * 22); (m.material as THREE.MeshBasicMaterial).opacity = 0.5 + 0.5 * b; (f.material as THREE.MeshBasicMaterial).opacity = 0.12 + 0.18 * b * k; f.scale.setScalar(k); }, end: () => { for (const o of [m, f]) { o.removeFromParent(); o.geometry.dispose(); (o.material as THREE.Material).dispose(); } } });
  }
  // lốc xoáy hạt sáng bay lên quanh một điểm (tụ khí)
  vortex(get: () => THREE.Vector3, color: THREE.ColorRepresentation, r: number, dur: number, emit: (p: THREE.Vector3, v: THREE.Vector3, c: THREE.Color, life: number, g: number) => void) {
    const c = new THREE.Color(color);
    this.push({ t: 0, dur, tick: (_dt, k, t) => { const p = get(); for (let i = 0; i < 6; i++) { const a = t * 6 + i / 6 * TAU, rr = r * (1 - k * 0.3); emit(new THREE.Vector3(p.x + Math.cos(a) * rr, p.y + Math.random() * 0.5, p.z + Math.sin(a) * rr), new THREE.Vector3(-Math.sin(a) * 3, 3 + Math.random() * 4, Math.cos(a) * 3), c, 0.8, 0); } }, end: () => {} });
  }
}
