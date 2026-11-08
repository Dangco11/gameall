import * as THREE from 'three';

// Một InstancedMesh dùng chung cho mọi khối cùng dạng (hộp, mái, nón...). Mỗi khối là một ô có thể cấp và trả lại,
// nên cả làng hàng trăm nhà chỉ tốn vài lượt vẽ.
const HIDDEN = new THREE.Matrix4().makeScale(0, 0, 0);

export class Batch {
  readonly mesh: THREE.InstancedMesh;
  private free: number[] = [];
  private used = 0;
  private dirty = false;

  constructor(geo: THREE.BufferGeometry, mat: THREE.Material, capacity: number, shadows = true){
    this.mesh = new THREE.InstancedMesh(geo, mat, capacity);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.castShadow = shadows; this.mesh.receiveShadow = true;
    this.mesh.frustumCulled = false;
    this.mesh.setColorAt(0, new THREE.Color(1, 1, 1));
    for (let i = 0; i < capacity; i++) this.mesh.setMatrixAt(i, HIDDEN);
    this.mesh.count = 0;
  }

  add(m: THREE.Matrix4, color: THREE.ColorRepresentation): number {
    const i = this.free.length ? this.free.pop()! : this.used < this.mesh.instanceMatrix.count ? this.used++ : -1;
    if (i < 0) return -1;
    this.mesh.count = Math.max(this.mesh.count, i + 1);
    this.set(i, m, color);
    return i;
  }

  set(i: number, m: THREE.Matrix4, color?: THREE.ColorRepresentation){
    if (i < 0) return;
    this.mesh.setMatrixAt(i, m);
    if (color !== undefined) this.mesh.setColorAt(i, tmpColor.set(color));
    this.dirty = true;
  }

  color(i: number, color: THREE.ColorRepresentation){
    if (i < 0) return;
    this.mesh.setColorAt(i, tmpColor.set(color));
    this.dirty = true;
  }

  remove(i: number){
    if (i < 0) return;
    this.mesh.setMatrixAt(i, HIDDEN);
    this.free.push(i);
    this.dirty = true;
  }

  flush(){
    if (!this.dirty) return;
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.dirty = false;
  }
}
const tmpColor = new THREE.Color();

const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _e = new THREE.Euler();
export function mat(x: number, y: number, z: number, sx = 1, sy = 1, sz = 1, ry = 0, rx = 0, rz = 0, out = new THREE.Matrix4()){
  return out.compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz)), _s.set(sx, sy, sz));
}

// Các khối dựng hình: đáy nằm ở y = 0 để đặt lên mặt đất cho dễ.
export const GEO = {
  box: new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0),
  // mái hai mái: lăng trụ tam giác, nóc chạy theo trục x
  prism: (() => {
    const s = new THREE.Shape(); s.moveTo(-0.5, 0); s.lineTo(0.5, 0); s.lineTo(0, 1); s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }); g.translate(0, 0, -0.5); g.rotateY(Math.PI / 2);
    g.computeVertexNormals(); return g;
  })(),
  cone: new THREE.ConeGeometry(0.5, 1, 4, 1).rotateY(Math.PI / 4).translate(0, 0.5, 0),
  round: new THREE.ConeGeometry(0.5, 1, 12, 1).translate(0, 0.5, 0),
  cyl: new THREE.CylinderGeometry(0.5, 0.5, 1, 8).translate(0, 0.5, 0),
  ball: new THREE.IcosahedronGeometry(0.5, 1).translate(0, 0.5, 0),
};
