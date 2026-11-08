import * as THREE from 'three';

// Đường bay khép kín của bản đồ (shared/maps.ts). Server chỉ biết quãng đường (m); màn hình đổi quãng đường
// thành vị trí theo tỉ lệ trên đường cong này.
export interface Pose { p: THREE.Vector3; t: THREE.Vector3; r: THREE.Vector3; u: THREE.Vector3; turn: number; climb: number }

export class Track {
  readonly curve: THREE.CatmullRomCurve3;
  readonly N = 4000;
  readonly length: number;
  private pos: Float32Array; private tan: Float32Array; private right: Float32Array; private up: Float32Array; private turnA: Float32Array;

  constructor(pts: [number, number, number][]){
    this.curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(...p)), true, 'centripetal');
    const N = this.N;
    this.length = this.curve.getLength();
    this.pos = new Float32Array(N * 3); this.tan = new Float32Array(N * 3); this.right = new Float32Array(N * 3); this.up = new Float32Array(N * 3); this.turnA = new Float32Array(N);
    const p = new THREE.Vector3(), t = new THREE.Vector3(), r = new THREE.Vector3(), u = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i++){
      this.curve.getPointAt(i / N, p); this.curve.getTangentAt(i / N, t).normalize();
      r.crossVectors(t, Y).normalize(); u.crossVectors(r, t).normalize();
      p.toArray(this.pos, i * 3); t.toArray(this.tan, i * 3); r.toArray(this.right, i * 3); u.toArray(this.up, i * 3);
    }
    // độ cua (dương là rẽ phải), làm mượt để máy bay nghiêng cánh êm
    const k = 20, ds = this.length / N * k * 2, raw = new Float32Array(N);
    for (let i = 0; i < N; i++){
      const a = ((i - k) % N + N) % N, b = (i + k) % N;
      raw[i] = ((this.tan[b * 3] - this.tan[a * 3]) * this.right[i * 3] + (this.tan[b * 3 + 2] - this.tan[a * 3 + 2]) * this.right[i * 3 + 2]) / ds;
    }
    for (let i = 0; i < N; i++){ let s = 0; for (let j = -30; j <= 30; j++) s += raw[((i + j) % N + N) % N]; this.turnA[i] = s / 61; }
  }

  // u: phần vòng (0..1, tự quấn). Nội suy giữa hai mẫu để chuyển động mượt.
  pose(u: number, out: Pose){
    const N = this.N, f = (((u % 1) + 1) % 1) * N, i = Math.floor(f) % N, j = (i + 1) % N, a = f - Math.floor(f);
    const L = (arr: Float32Array, v: THREE.Vector3) => v.set(arr[i * 3] + (arr[j * 3] - arr[i * 3]) * a, arr[i * 3 + 1] + (arr[j * 3 + 1] - arr[i * 3 + 1]) * a, arr[i * 3 + 2] + (arr[j * 3 + 2] - arr[i * 3 + 2]) * a);
    L(this.pos, out.p); L(this.tan, out.t).normalize(); L(this.right, out.r).normalize(); L(this.up, out.u).normalize();
    out.turn = this.turnA[i] + (this.turnA[j] - this.turnA[i]) * a;
    out.climb = out.t.y;
    return out;
  }
  static pose(): Pose { return { p: new THREE.Vector3(), t: new THREE.Vector3(), r: new THREE.Vector3(), u: new THREE.Vector3(), turn: 0, climb: 0 }; }

  // Mẫu thưa để dựng địa hình né đường bay
  samples(n: number){ const out: THREE.Vector3[] = []; for (let i = 0; i < n; i++) out.push(this.curve.getPointAt(i / n)); return out; }
}
