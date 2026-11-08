// Máy quay tự động: toàn cảnh quán là mặc định, sự kiện quan trọng xin cận cảnh theo độ ưu tiên, lúc rảnh thì đổi góc cho đỡ nhàm.
import * as THREE from 'three';

export class Director {
  constructor(camera) {
    this.camera = camera;
    this.pos = new THREE.Vector3(0, 30, 50); this.look = new THREE.Vector3(0, 0, -2);
    this.wantPos = this.pos.clone(); this.wantLook = this.look.clone();
    this.shot = null; this.idleAt = 0; this.t = 0; this.tour = 0;
    this.target = new THREE.Vector3();
    this.onShot = () => {};
  }

  // Lùi máy quay cho tới khi cả bề ngang quán lọt khung, rồi kiểm tra chiều sâu.
  overview(aspect) {
    const v = THREE.MathUtils.degToRad(this.camera.fov / 2), h = Math.atan(Math.tan(v) * aspect);
    const portrait = aspect < 1;
    const halfWidth = portrait ? 13.6 : 15, halfDepth = portrait ? 15 : 21;
    const el = THREE.MathUtils.degToRad(portrait ? 50 : 46);
    const dist = Math.max(halfWidth / Math.tan(h), halfDepth * Math.sin(el) / Math.tan(v) + 4);
    const look = new THREE.Vector3(0, 0, portrait ? -1.5 : 0.5);
    return { pos: look.clone().add(new THREE.Vector3(0, Math.sin(el), Math.cos(el)).multiplyScalar(dist)), look };
  }

  // priority: 1 bình thường, 2 quà lớn, 3 lên cấp và tiệc. Cảnh đang chiếu chỉ bị thay bởi cảnh ưu tiên bằng hoặc cao hơn.
  // follow: nhân vật để máy quay bám theo suốt cảnh (khách đang đi, đổi bàn, lên cấp chuyển khu)
  request(kind, { at, follow = null, seconds = 5, priority = 1 } = {}) {
    if (this.shot && this.t < this.shot.until && priority < this.shot.priority) return false;
    this.shot = { kind, at: at ? new THREE.Vector3(at.x, at.y ?? 0, at.z) : null, follow, until: this.t + seconds, priority };
    this.onShot(kind);
    return true;
  }

  frame(kind, at, aspect) {
    const portrait = aspect < 1, s = portrait ? 1.35 : 1;
    switch (kind) {
      // Nhìn chéo từ trên xuống cho cây và tường mặt tiền không che khách ngồi hàng gần cửa
      case 'focus': return { pos: at.clone().add(new THREE.Vector3(0, 11 * s, 7.6 * s)), look: at.clone().add(new THREE.Vector3(0, .8, -2.4)) };
      case 'bar': return { pos: new THREE.Vector3(-4.5, 6 * s, -4 + 4 * s), look: new THREE.Vector3(-4.5, 1.3, -14.5) };
      case 'facade': return { pos: new THREE.Vector3(0, 9 * s, 34 * s), look: new THREE.Vector3(0, 2.8, 13) };
      case 'vip': return { pos: new THREE.Vector3(-4, 8 * s, -1 + 4 * s), look: new THREE.Vector3(-4, .8, -10) };
      default: return this.overview(aspect);
    }
  }

  get kind() { return this.shot && this.t < this.shot.until ? this.shot.kind : 'overview'; }

  update(dt, aspect) {
    this.t += dt;
    if (this.shot && this.t >= this.shot.until) { this.shot = null; this.onShot('overview'); this.idleAt = this.t; }
    // Lâu không có sự kiện thì tự chiếu mặt tiền, quầy pha chế hoặc khu VIP vài giây
    if (!this.shot && this.t - this.idleAt > 45) {
      this.request(['facade', 'bar', 'vip'][this.tour++ % 3], { seconds: 7, priority: 0 });
      this.idleAt = this.t;
    }
    const fol = this.kind !== 'overview' && this.shot?.follow;
    const f = this.frame(this.kind, fol ? this.target.set(fol.x, fol.y, fol.z) : this.shot?.at, aspect);
    if (this.kind === 'overview') f.pos.x += Math.sin(this.t * .07) * 2.2;   // trôi nhẹ cho cảnh có hồn
    this.wantPos.copy(f.pos); this.wantLook.copy(f.look);
    const k = 1 - Math.exp(-dt * 2.2);
    this.pos.lerp(this.wantPos, k); this.look.lerp(this.wantLook, k);
    this.camera.position.copy(this.pos);
    this.camera.lookAt(this.look);
  }
  snap() { this.pos.copy(this.wantPos); this.look.copy(this.wantLook); }
}
