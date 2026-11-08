// Hiệu ứng: hạt tính chuyển động trên GPU trong một bộ đệm vòng cố định, vòng sáng, cột đèn rọi, pháo hoa.
// Bộ đệm đầy thì hạt cũ nhất bị thay, nên quà dồn dập không làm tăng tải.
import * as THREE from 'three';

const SHAPES = { dot: 0, heart: 1, star: 2, confetti: 3, pearl: 4 };

class Particles {
  constructor(scene, count, additive) {
    this.count = count; this.head = 0;
    const g = new THREE.BufferGeometry();
    const attr = (name, size) => { const a = new THREE.BufferAttribute(new Float32Array(count * size), size); a.setUsage(THREE.DynamicDrawUsage); g.setAttribute(name, a); return a; };
    this.a = { position: attr('position', 3), vel: attr('aVel', 3), color: attr('aColor', 3), birth: attr('aBirth', 1), life: attr('aLife', 1), size: attr('aSize', 1), shape: attr('aShape', 1), grav: attr('aGrav', 1) };
    this.a.birth.array.fill(-1e6);
    this.mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: { uTime: { value: 0 }, uScale: { value: 600 } },
      vertexShader: `
        attribute vec3 aVel; attribute vec3 aColor; attribute float aBirth, aLife, aSize, aShape, aGrav;
        uniform float uTime, uScale; varying vec3 vColor; varying float vAlpha, vShape, vSpin;
        void main(){
          float t = uTime - aBirth;
          float alive = step(0.0, t) * step(t, aLife);
          vec3 p = position + aVel * t + vec3(0.0, -aGrav * t * t * 0.5, 0.0);
          if (aShape > 2.5 && aShape < 3.5) p.x += sin(t * 6.0 + aBirth * 13.0) * 0.25;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float f = t / aLife;
          gl_PointSize = alive * aSize * uScale / -mv.z * (1.0 - f * 0.3);
          vColor = aColor; vAlpha = alive * (1.0 - smoothstep(0.65, 1.0, f)); vShape = aShape; vSpin = t * 4.0 + aBirth * 7.0;
        }`,
      fragmentShader: `
        varying vec3 vColor; varying float vAlpha, vShape, vSpin;
        void main(){
          vec2 p = gl_PointCoord * 2.0 - 1.0; p.y = -p.y;
          float a = 0.0;
          if (vShape < 0.5) a = smoothstep(1.0, 0.0, length(p));
          else if (vShape < 1.5) { vec2 q = p * 1.25; q.y -= 0.35 * sqrt(abs(q.x)); a = step(length(q), 0.95); }
          else if (vShape < 2.5) { float r = length(p), ang = atan(p.y, p.x); a = step(r, 0.45 + 0.45 * pow(abs(cos(ang * 2.5)), 3.0)); a = max(a, smoothstep(0.6, 0.0, r)); }
          else if (vShape < 3.5) { float c = cos(vSpin), s = sin(vSpin); vec2 q = mat2(c, -s, s, c) * p; a = step(abs(q.x), 0.8) * step(abs(q.y), 0.4 + 0.35 * abs(sin(vSpin * 0.7))); }
          else a = smoothstep(1.0, 0.8, length(p));
          if (a < 0.02) discard;
          gl_FragColor = vec4(vColor, a * vAlpha);
        }`,
    });
    const pts = new THREE.Points(g, this.mat);
    pts.frustumCulled = false;
    scene.add(pts);
  }
  emit(origin, n, { color = ['#ffffff'], speed = 2, up = 1.5, spread = 1, life = 1.6, size = .25, shape = 'dot', gravity = 2, box = 0 }, now) {
    const A = this.a, cols = Array.isArray(color) ? color : [color], c = new THREE.Color();
    for (let k = 0; k < n; k++) {
      const i = this.head; this.head = (this.head + 1) % this.count;
      const th = Math.random() * Math.PI * 2, r = Math.random() * spread;
      A.position.array.set([origin.x + (Math.random() - .5) * box, origin.y, origin.z + (Math.random() - .5) * box], i * 3);
      A.vel.array.set([Math.cos(th) * r * speed, up * (0.5 + Math.random()), Math.sin(th) * r * speed], i * 3);
      c.set(cols[k % cols.length]);
      A.color.array.set([c.r, c.g, c.b], i * 3);
      A.birth.array[i] = now; A.life.array[i] = life * (.7 + Math.random() * .6); A.size.array[i] = size * (.7 + Math.random() * .6);
      A.shape.array[i] = SHAPES[shape] ?? 0; A.grav.array[i] = gravity;
    }
    for (const a of Object.values(A)) a.needsUpdate = true;
  }
}

export class Fx {
  constructor(scene, lights) {
    this.scene = scene; this.lights = lights; this.t = 0;
    this.glow = new Particles(scene, 5000, true);
    this.paper = new Particles(scene, 5000, false);
    this.rings = [];
    const ringGeo = new THREE.RingGeometry(.7, 1, 48); ringGeo.rotateX(-Math.PI / 2);
    for (let i = 0; i < 16; i++) {
      const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: '#fff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      m.visible = false; scene.add(m); this.rings.push({ m, t: 0, dur: 1, s: 1 });
    }
    const beamGeo = new THREE.CylinderGeometry(.6, 1.5, 9, 24, 1, true); beamGeo.translate(0, 4.5, 0);
    this.beams = Array.from({ length: 4 }, () => {
      const m = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ color: '#fff3c4', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }));
      m.visible = false; scene.add(m); return { m, t: 0, dur: 1 };
    });
    this.partyUntil = 0;
    this.baseColors = lights.party.map(l => l.color.clone());
    this.budget = 0;   // giới hạn số đợt hiệu ứng mỗi giây khi quà về dồn dập
  }
  allow(cost = 1) { if (this.budget > 12) return false; this.budget += cost; return true; }

  sparkle(p, n = 24, color = ['#fff6c8', '#ffd76a', '#ffffff']) { this.glow.emit(p, n, { color, speed: 1.2, up: 1.8, life: 1.2, size: .22, shape: 'star', gravity: .6 }, this.t); }
  hearts(p, n = 6) { this.glow.emit(p, n, { color: ['#ff5f8f', '#ff8fab', '#ffb3c7'], speed: .4, up: 1.4, life: 2, size: .35, shape: 'heart', gravity: -.15 }, this.t); }
  pearls(p, n = 12) { this.paper.emit(p, n, { color: ['#2b1a12', '#3a2416'], speed: .15, up: .3, life: .9, size: .12, shape: 'pearl', gravity: 6, spread: .3 }, this.t); }
  steam(p) { this.glow.emit(p, 3, { color: ['#fff'], speed: .1, up: .6, life: 1.6, size: .3, gravity: -.2, spread: .2 }, this.t); }
  confetti(p, n = 120, box = 3) { this.paper.emit(p, n, { color: ['#ff5f8f', '#5ff5d0', '#ffd76a', '#7fb3ff', '#c79bff', '#ffffff'], speed: 2.2, up: 4, life: 3.4, size: .32, shape: 'confetti', gravity: 3.2, box }, this.t); }
  ring(p, color = '#ffd76a', s = 2.5, dur = 1.1) {
    const r = this.rings.find(x => !x.m.visible) || this.rings[0];
    r.m.position.set(p.x, p.y + .05, p.z); r.m.material.color.set(color); r.t = 0; r.dur = dur; r.s = s; r.m.visible = true;
  }
  beam(p, dur = 5, color = '#fff3c4') {
    const b = this.beams.find(x => !x.m.visible) || this.beams[0];
    b.m.position.set(p.x, p.y, p.z); b.m.material.color.set(color); b.t = 0; b.dur = dur; b.m.visible = true;
  }
  firework(p) {
    const colors = [['#ff5f8f', '#ffd1dc'], ['#5ff5d0', '#d6fff5'], ['#ffd76a', '#fff3c4'], ['#9fb8ff', '#e6ecff']][Math.floor(Math.random() * 4)];
    this.glow.emit(p, 90, { color: colors, speed: 5, up: 0, life: 1.6, size: .3, shape: 'star', gravity: 2.5, spread: 1 }, this.t);
  }
  // Món theo mức hiệu ứng trong bảng giá: 1 lấp lánh, 2 vòng sáng, 3 pháo giấy, 4 và 5 là tiệc.
  serve(p, level) {
    if (!this.allow(level)) { this.sparkle(p, 10); return; }
    this.sparkle(p, 14 + level * 10);
    if (level >= 2) this.ring(p, '#ffd76a', 2 + level * .4);
    if (level >= 3) this.confetti({ x: p.x, y: p.y + 2, z: p.z }, 60 + level * 20, 1.5);
  }
  levelUp(p, color) {
    this.ring(p, color, 3.2, 1.4); this.ring(p, '#ffffff', 2.2, 1.0);
    this.glow.emit(p, 80, { color: [color, '#ffffff'], speed: .8, up: 3.2, life: 1.8, size: .26, shape: 'star', gravity: .4, spread: .8 }, this.t);
    this.beam(p, 2.6, color);
  }
  party(seconds = 14) { this.partyUntil = this.t + seconds; }

  update(dt, camera, height) {
    this.t += dt;
    this.budget = Math.max(0, this.budget - dt * 12);
    this.glow.mat.uniforms.uTime.value = this.paper.mat.uniforms.uTime.value = this.t;
    this.glow.mat.uniforms.uScale.value = this.paper.mat.uniforms.uScale.value = height * .9 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    for (const r of this.rings) {
      if (!r.m.visible) continue;
      r.t += dt; const f = r.t / r.dur;
      r.m.scale.setScalar(.3 + f * r.s); r.m.material.opacity = (1 - f) * .9;
      if (f >= 1) r.m.visible = false;
    }
    for (const b of this.beams) {
      if (!b.m.visible) continue;
      b.t += dt; const f = b.t / b.dur;
      b.m.material.opacity = Math.min(1, b.t * 3) * Math.min(1, (b.dur - b.t) * 2) * .28;
      b.m.rotation.y += dt * .5;
      if (f >= 1) b.m.visible = false;
    }
    const partying = this.t < this.partyUntil;
    this.lights.party.forEach((l, i) => {
      if (partying) l.color.setHSL((this.t * .35 + i / 3) % 1, .9, .6);
      else l.color.lerp(this.baseColors[i], Math.min(1, dt * 3));
    });
    return partying;
  }
}
