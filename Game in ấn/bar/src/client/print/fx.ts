import * as THREE from 'three';
import { Confetti } from './confetti.ts';
import { softDot } from './tex.ts';

// Hiệu ứng của studio (dựng sẵn một lần, chỉ bật tắt và đổi vị trí):
//   goldBurst  ánh sáng vàng bùng lên khi in xong (đèn điểm thật + quầng sáng + tia)
//   confetti   pháo giấy hai bên máy in
//   sparkle    kim cương lấp lánh bay quanh bản in VIP
//   halo       vòng hào quang xoay sau bản in đang khoe
//   lasers     chế độ VIP: chùm laser quét từ đầu in xuống giấy và từ trần xuống máy in
const STAR = (() => {
  const S = 128, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d')!, gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.2, 'rgba(255,255,255,0.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, S, S);
  g.fillStyle = 'rgba(255,255,255,0.95)';
  for (const [w, h] of [[4, S], [S, 4]]){ g.beginPath(); g.ellipse(S / 2, S / 2, w / 2, h / 2, 0, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const RING = (() => {
  const S = 512, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d')!;
  for (let i = 0; i < 3; i++){
    const r = S * (0.32 + i * 0.06), gr = g.createRadialGradient(S / 2, S / 2, r - 18, S / 2, S / 2, r + 18);
    gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, `rgba(255,255,255,${0.9 - i * 0.25})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(S / 2, S / 2, r + 18, 0, 7); g.arc(S / 2, S / 2, r - 18, 0, 7, true); g.fill();
  }
  for (let i = 0; i < 48; i++){ const a = i / 48 * Math.PI * 2; g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 3; g.beginPath(); g.moveTo(S / 2 + Math.cos(a) * S * 0.2, S / 2 + Math.sin(a) * S * 0.2); g.lineTo(S / 2 + Math.cos(a) * S * 0.5, S / 2 + Math.sin(a) * S * 0.5); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
})();
const add = (map: THREE.Texture, color: number, opacity = 1) => new THREE.MeshBasicMaterial({ map, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });

export class StudioFx {
  readonly group = new THREE.Group();
  readonly confetti = new Confetti();
  private burstLight = new THREE.PointLight(0xffc860, 0, 7, 1.6);
  private flare: THREE.Mesh; private burstT = 9;
  private halo: THREE.Mesh; private haloOn = 0; private haloTarget = 0;
  private spark: THREE.InstancedMesh; private sparks: { p: THREE.Vector3; v: THREE.Vector3; age: number; life: number; s: number }[] = [];
  private sparkAt = new THREE.Vector3(); private sparkRate = 0; private sparkAcc = 0;
  private beams: THREE.Mesh[] = []; private beamMat: THREE.MeshBasicMaterial; laser = 0; private laserTarget = 0;
  private ceilBeams: THREE.Mesh[] = [];
  private _m = new THREE.Matrix4(); private _q = new THREE.Quaternion(); private _s = new THREE.Vector3();

  constructor(){
    this.group.add(this.confetti.group, this.burstLight);
    this.flare = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), add(softDot(), 0xffd070, 0)); this.flare.renderOrder = 5; this.group.add(this.flare);
    this.halo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), add(RING, 0xffd890, 0)); this.halo.renderOrder = 4; this.group.add(this.halo);
    const sg = new THREE.PlaneGeometry(1, 1);
    this.spark = new THREE.InstancedMesh(sg, add(STAR, 0xffffff, 1), 220); this.spark.count = 0; this.spark.frustumCulled = false; this.spark.renderOrder = 6; this.group.add(this.spark);
    // laser từ đầu in: 5 tia mảnh cộng sáng, bật trong chế độ VIP
    this.beamMat = new THREE.MeshBasicMaterial({ color: 0xff3ad0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    for (let i = 0; i < 5; i++){ const b = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 1, 6).translate(0, -0.5, 0), this.beamMat); this.group.add(b); this.beams.push(b); }
    for (let i = 0; i < 6; i++){ const b = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 1, 6).translate(0, -0.5, 0), this.beamMat); b.position.set(-2.5 + i, 4.1, -2 + (i % 2) * 4); this.group.add(b); this.ceilBeams.push(b); }
  }

  goldBurst(at: THREE.Vector3, big: boolean){
    this.burstLight.position.copy(at).add(new THREE.Vector3(0, 0.6, 0.3)); this.burstT = 0;
    this.flare.position.copy(at).add(new THREE.Vector3(0, 0.15, 0.1)); this.flare.scale.setScalar(big ? 3.2 : 1.8);
    this.burstBig = big;
  }
  private burstBig = false;
  cannons(front: THREE.Vector3, big: boolean){
    for (const sx of [-1, 1]){
      const at = front.clone().add(new THREE.Vector3(sx * 1.2, 0, 0.4));
      this.confetti.fire(at, new THREE.Vector3(-sx * 0.25, 1, 0.35).normalize(), big ? 520 : 220, big ? 1.0 : 0.75);
    }
  }
  showHalo(at: THREE.Vector3, size: number, color: number){ this.halo.position.copy(at); this.halo.scale.setScalar(size); (this.halo.material as THREE.MeshBasicMaterial).color.set(color); this.haloTarget = 1; }
  hideHalo(){ this.haloTarget = 0; }
  sparkle(at: THREE.Vector3, rate: number){ this.sparkAt.copy(at); this.sparkRate = rate; }
  setLaser(on: boolean, color = 0xff3ad0){ this.laserTarget = on ? 1 : 0; this.beamMat.color.set(color); }

  update(dt: number, t: number, camera: THREE.Camera, head: THREE.Vector3, paperY: number){
    this.confetti.update(dt, performance.now());
    // bùng sáng vàng: lên nhanh, tắt dần 1,6 giây
    this.burstT += dt;
    const b = this.burstT < 0.12 ? this.burstT / 0.12 : Math.max(0, 1 - (this.burstT - 0.12) / 1.5);
    this.burstLight.intensity = b * (this.burstBig ? 60 : 25);
    (this.flare.material as THREE.MeshBasicMaterial).opacity = b * 0.9;
    this.flare.quaternion.copy(camera.quaternion);
    // hào quang
    this.haloOn += (this.haloTarget - this.haloOn) * (1 - Math.exp(-dt * 3));
    (this.halo.material as THREE.MeshBasicMaterial).opacity = this.haloOn * 0.85;
    this.halo.visible = this.haloOn > 0.01;
    this.halo.quaternion.copy(camera.quaternion); this.halo.rotateZ(t * 0.4);
    // kim cương lấp lánh
    this.sparkAcc += this.sparkRate * dt;
    while (this.sparkAcc >= 1 && this.sparks.length < 220){
      this.sparkAcc--;
      const a = Math.random() * Math.PI * 2, r = 0.4 + Math.random() * 0.8;
      this.sparks.push({ p: this.sparkAt.clone().add(new THREE.Vector3(Math.cos(a) * r, (Math.random() - 0.5) * 1.2, Math.sin(a) * r * 0.3)), v: new THREE.Vector3((Math.random() - 0.5) * 0.2, 0.25 + Math.random() * 0.35, (Math.random() - 0.5) * 0.2), age: 0, life: 1.2 + Math.random() * 1.4, s: 0.05 + Math.random() * 0.09 });
    }
    if (this.sparkRate === 0) this.sparkAcc = 0;
    this.sparks = this.sparks.filter(s => (s.age += dt) < s.life);
    let n = 0;
    for (const s of this.sparks){
      s.p.addScaledVector(s.v, dt);
      const k = Math.sin(s.age / s.life * Math.PI) * (0.6 + 0.4 * Math.sin(t * 20 + s.life * 9));
      this._q.copy(camera.quaternion); this._s.setScalar(s.s * k);
      this.spark.setMatrixAt(n++, this._m.compose(s.p, this._q, this._s));
    }
    this.spark.count = n; this.spark.instanceMatrix.needsUpdate = true;
    // laser
    this.laser += (this.laserTarget - this.laser) * (1 - Math.exp(-dt * 4));
    this.beamMat.opacity = this.laser * 0.75;
    const show = this.laser > 0.02;
    this.beams.forEach((bm, i) => {
      bm.visible = show;
      if (!show) return;
      const x = head.x + (i - 2) * 0.03, len = Math.max(0.01, head.y - paperY);
      bm.position.set(x, head.y, head.z); bm.scale.set(1, len, 1);
      bm.rotation.set(Math.sin(t * 7 + i) * 0.35, 0, Math.cos(t * 5 + i * 1.7) * 0.5);
    });
    this.ceilBeams.forEach((bm, i) => {
      bm.visible = show;
      if (!show) return;
      bm.scale.set(1, 5.2, 1);
      bm.rotation.set(Math.sin(t * 0.9 + i) * 0.55 + 0.2, 0, Math.cos(t * 1.1 + i * 2) * 0.6);
    });
  }
}
