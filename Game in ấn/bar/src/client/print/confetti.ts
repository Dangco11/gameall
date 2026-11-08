import * as THREE from 'three';

// Pháo giấy như thật: ống pháo giấy hiện lên hai bên sân khấu, giật nảy khi bắn. Giấy kim tuyến bay vọt lên như một khối,
// tới cao thì tản ra, lật lượn chao qua chao lại rơi chậm xuống, đáp xuống sân nằm phẳng một lúc rồi mới tan.
// Kèm ruy băng xoắn dài rơi chậm hơn. Giấy hai mặt có ánh kim nên lật tới đâu lấp lánh tới đó.
const PAPER = 2600, RIBBON = 260;
const COLS = [0xff3b5c, 0xffd23a, 0x3ad0ff, 0x7dff6a, 0xff8ae0, 0xffffff, 0xffa53a, 0xb07aff, 0xf2c94c, 0xe8e8f0];
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _c = new THREE.Color();

interface Bit { p: THREE.Vector3; v: THREE.Vector3; rx: number; ry: number; rz: number; sx: number; sy: number; sz: number; age: number; life: number; ph: number; k: number; landed: boolean; color: number }
interface Tube { g: THREE.Group; t: number; side: number }

export class Confetti {
  readonly group = new THREE.Group();
  private paper: THREE.InstancedMesh; private ribbon: THREE.InstancedMesh;
  private bits: Bit[] = []; private ribs: Bit[] = [];
  private tubes: Tube[] = [];

  constructor(){
    const mat = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, roughness: 0.35, metalness: 0.35 });
    this.paper = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.075, 0.11), mat, PAPER);
    // ruy băng: dải hẹp xoắn lò xo
    const rg = new THREE.PlaneGeometry(0.035, 0.7, 1, 16), pos = rg.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++){ const y = pos.getY(i), a = y * 11; pos.setXYZ(i, pos.getX(i) + Math.sin(a) * 0.06, y, Math.cos(a) * 0.06); }
    rg.computeVertexNormals();
    this.ribbon = new THREE.InstancedMesh(rg, mat, RIBBON);
    for (const m of [this.paper, this.ribbon]){ m.count = 0; m.frustumCulled = false; this.group.add(m); }
  }

  // Bắn từ một điểm theo hướng dir (đã chuẩn hóa). n mảnh giấy.
  fire(at: THREE.Vector3, dir: THREE.Vector3, n = 360, power = 1){
    const side = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 0, 1)).normalize(), up2 = new THREE.Vector3().crossVectors(side, dir).normalize();
    const shoot = (list: Bit[], cap: number, count: number, ribbon: boolean) => {
      for (let i = 0; i < count; i++){
        if (list.length >= cap) list.shift();
        const a = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), 0.6) * 0.32;   // nón phun hẹp, đặc ở giữa
        const v = dir.clone().addScaledVector(side, Math.cos(a) * r).addScaledVector(up2, Math.sin(a) * r).normalize().multiplyScalar((10 + Math.random() * 5) * power * (ribbon ? 0.85 : 1));
        list.push({ p: at.clone(), v, rx: Math.random() * 6, ry: Math.random() * 6, rz: Math.random() * 6, sx: (Math.random() - 0.5) * 16, sy: (Math.random() - 0.5) * 10, sz: (Math.random() - 0.5) * 16,
          age: -Math.random() * 0.06, life: (ribbon ? 9 : 8) + Math.random() * 3, ph: Math.random() * 6, k: ribbon ? 2.2 + Math.random() : 3 + Math.random() * 2.5, landed: false, color: COLS[Math.floor(Math.random() * COLS.length)] });
      }
    };
    shoot(this.bits, PAPER, n, false);
    shoot(this.ribs, RIBBON, Math.round(n / 9), true);
  }

  // Hai ống pháo giấy hai bên sân khấu bắn chéo lên phía trước; có thêm một ống ở chỗ người tặng
  cannons(center: THREE.Vector3, giver: THREE.Vector3 | null){
    for (const side of [-1, 1]){
      const at = new THREE.Vector3(center.x + side * 2.4, 0.95, center.z + 1.2);
      this.tube(at, side);
      this.fire(at, new THREE.Vector3(-side * 0.22, 1, 0.42).normalize(), 520, 1.05);
    }
    if (giver) this.fire(new THREE.Vector3(giver.x, 1.4, giver.z), new THREE.Vector3(0, 1, 0.15).normalize(), 240, 0.8);
  }

  private tube(at: THREE.Vector3, side: number){
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.9, 16), new THREE.MeshStandardMaterial({ color: 0xffd23a, metalness: 0.6, roughness: 0.3 }));
    body.position.y = -0.2;
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.135, 0.135, 0.12, 16), new THREE.MeshStandardMaterial({ color: 0xd61f2c, roughness: 0.5 }));
    band.position.y = -0.1;
    const band2 = band.clone(); band2.position.y = -0.45;
    g.add(body, band, band2);
    g.position.copy(at).setY(0.45); g.rotation.z = side * 0.22; g.rotation.x = 0.4;
    this.group.add(g);
    this.tubes.push({ g, t: 0, side });
  }

  update(dt: number, now: number){
    const step = (list: Bit[], mesh: THREE.InstancedMesh, ribbon: boolean) => {
      let n = 0;
      for (const b of list){
        b.age += dt;
        if (b.age < 0 || b.age > b.life) continue;
        if (!b.landed){
          // lúc đầu bay vọt như một khối, sau đó sức cản tăng dần: giấy tản ra và lượn rơi chậm
          const k = 0.25 + b.k * THREE.MathUtils.smoothstep(b.age, 0.12, 0.9), f = Math.exp(-k * dt);
          b.v.x *= f; b.v.z *= f; b.v.y = b.v.y * f - 9.8 * dt;
          const sway = THREE.MathUtils.smoothstep(b.age, 0.5, 1.5);
          b.p.x += (b.v.x + Math.sin(now / 260 + b.ph) * 0.9 * sway) * dt;
          b.p.y += b.v.y * dt;
          b.p.z += (b.v.z + Math.cos(now / 340 + b.ph * 1.3) * 0.6 * sway) * dt;
          b.rx += b.sx * dt; b.ry += b.sy * dt; b.rz += b.sz * dt;
          if (b.p.y <= 0.02){ b.p.y = 0.02 + Math.random() * 0.01; b.landed = true; b.rx = -Math.PI / 2; b.rz = 0; b.life = Math.max(b.life, b.age + 3); }
        }
        const fade = Math.min(1, (b.life - b.age) / 0.8);
        _q.setFromEuler(_e.set(b.rx, b.ry, b.rz));
        mesh.setMatrixAt(n, _m.compose(b.p, _q, _s.setScalar(fade)));
        mesh.setColorAt(n++, _c.set(b.color));
      }
      mesh.count = n; mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };
    this.bits = this.bits.filter(b => b.age <= b.life);
    this.ribs = this.ribs.filter(b => b.age <= b.life);
    step(this.bits, this.paper, false);
    step(this.ribs, this.ribbon, true);
    // ống pháo: trồi lên, giật nảy lúc bắn, đứng một lúc rồi thụt xuống
    for (const t of this.tubes){
      t.t += dt;
      const up = t.t < 0.15 ? t.t / 0.15 : t.t > 3 ? Math.max(0, 1 - (t.t - 3) / 0.4) : 1, kick = t.t < 0.4 ? Math.sin(t.t / 0.4 * Math.PI) * 0.12 : 0;
      t.g.scale.setScalar(Math.max(0.001, up)); t.g.position.y = 0.45 - kick;
    }
    for (const t of this.tubes.filter(t => t.t > 3.4)){ this.group.remove(t.g); t.g.traverse(o => { if (o instanceof THREE.Mesh){ o.geometry.dispose(); (o.material as THREE.Material).dispose(); } }); }
    this.tubes = this.tubes.filter(t => t.t <= 3.4);
  }
}
