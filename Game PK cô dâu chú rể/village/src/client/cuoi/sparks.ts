import * as THREE from 'three';

const MAX = 2400;

// Tim, lấp lánh, phong bì đỏ và pháo hoa bằng các hạt nhỏ cộng sáng
export class SparkSystem {
  readonly mesh = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.09, 0), new THREE.MeshBasicMaterial({ blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, toneMapped: false }), MAX);
  private list: { p: THREE.Vector3; v: THREE.Vector3; age: number; life: number; color: number; g: number; size: number }[] = [];
  private m = new THREE.Matrix4(); private c = new THREE.Color(); private q = new THREE.Quaternion(); private s = new THREE.Vector3();
  constructor(){ this.mesh.frustumCulled = false; this.mesh.count = 0; }
  private add(p: THREE.Vector3, v: THREE.Vector3, life: number, color: number, g = 9, size = 1, delay = 0){ if (this.list.length < MAX) this.list.push({ p: p.clone(), v, age: -delay, life, color, g, size }); }
  hearts(at: THREE.Vector3){ for (let i = 0; i < 70; i++){ const a = Math.random() * Math.PI * 2; this.add(at.clone().add(new THREE.Vector3(Math.cos(a) * 0.8, 0, Math.sin(a) * 0.5)), new THREE.Vector3(Math.cos(a) * 0.8, 1.6 + Math.random() * 1.5, Math.sin(a) * 0.4), 2.4, [0xff5a8a, 0xffa6c8, 0xffffff, 0xffd34d][i % 4], -0.3, 1.2); } }
  burst(at: THREE.Vector3, cols: number[], n: number, sp: number){ for (let i = 0; i < n; i++){ const d = new THREE.Vector3().randomDirection().multiplyScalar(sp * (0.6 + Math.random() * 0.4)); d.y = Math.abs(d.y) + 1; this.add(at, d, 1.4, cols[i % cols.length], 9, 1.3); } }
  envelope(from: THREE.Vector3, to: THREE.Vector3){ const T = 1.3; for (let i = 0; i < 6; i++) this.add(from, new THREE.Vector3((to.x - from.x) / T, 6, (to.z - from.z) / T), T, i % 2 ? 0xd61f2c : 0xffd34d, 9, 1.8, i * 0.08); }
  fireworks(){ for (let k = 0; k < 6; k++){ const at = new THREE.Vector3((Math.random() - 0.5) * 16, 8 + Math.random() * 3, -2 + Math.random() * 4); const col = [0xffd45a, 0xff5a7a, 0x7ad0ff, 0xb0ff7a][k % 4]; for (let i = 0; i < 60; i++) this.add(at, new THREE.Vector3().randomDirection().multiplyScalar(4 + Math.random() * 2), 1.6, col, 3, 1.2, k * 0.35); } }
  // pháo hoa nổ thành hình trái tim trên trời
  heart(at: THREE.Vector3, col: number, scale = 0.32, delay = 0){
    for (let i = 0; i < 160; i++){
      const t = i / 160 * Math.PI * 2, x = 16 * Math.sin(t) ** 3, y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      this.add(at, new THREE.Vector3(x * scale, y * scale, (Math.random() - 0.5) * 0.4), 2.6, i % 9 ? col : 0xffffff, 0.6, 1.5, delay);
    }
    for (let i = 0; i < 30; i++) this.add(at, new THREE.Vector3(0, -2, 0).add(new THREE.Vector3().randomDirection().multiplyScalar(0.6)), 1.2, 0xfff3b0, 0, 1, delay);   // tia sáng giữa tim
  }
  // mưa hạt rơi chậm khắp sân (hoa vàng, kim tuyến)
  rain(cols: number[], n: number, seconds = 6){
    for (let i = 0; i < n; i++) this.add(new THREE.Vector3((Math.random() - 0.5) * 22, 9 + Math.random() * 4, -2 + Math.random() * 16), new THREE.Vector3((Math.random() - 0.5) * 0.6, -1.4 - Math.random(), 0), 7, cols[i % cols.length], 0.05, 1.4, Math.random() * seconds);
  }
  // chùm hạt bay vòng cung từ from tới to trong T giây (đòn tấn công, quà bay về phe)
  arc(from: THREE.Vector3, to: THREE.Vector3, cols: number[], n: number, T = 0.9, spread = 0.5){
    // trọng lực 9: vận tốc đứng đủ để rơi đúng chỗ to sau T giây
    const v = new THREE.Vector3((to.x - from.x) / T, (to.y - from.y) / T + 4.5 * T, (to.z - from.z) / T);
    for (let i = 0; i < n; i++){
      const p = from.clone().add(new THREE.Vector3((Math.random() - 0.5) * spread, 0, (Math.random() - 0.5) * spread));
      this.add(p, v.clone(), T, cols[i % cols.length], 9, 1.6, i * 0.02);
    }
  }
  // lấp lánh nhẹ quanh một người (hào quang VIP)
  glow(at: THREE.Vector3){
    const a = Math.random() * Math.PI * 2;
    this.add(at.clone().add(new THREE.Vector3(Math.cos(a) * 0.45, Math.random() * 1.6 - 0.8, Math.sin(a) * 0.3)), new THREE.Vector3(0, 0.7, 0), 1.1, Math.random() < 0.7 ? 0xffd45a : 0xffffff, 0, 0.9);
  }
  update(dt: number){
    let n = 0;
    this.list = this.list.filter(s => (s.age += dt) < s.life);
    for (const s of this.list){
      if (s.age < 0) continue;
      s.v.y -= s.g * dt; s.p.addScaledVector(s.v, dt);
      const k = (1 - s.age / s.life) * s.size;
      this.mesh.setMatrixAt(n, this.m.compose(s.p, this.q, this.s.set(k, k, k))); this.mesh.setColorAt(n++, this.c.set(s.color));
    }
    this.mesh.count = n; this.mesh.instanceMatrix.needsUpdate = true; if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }
}

