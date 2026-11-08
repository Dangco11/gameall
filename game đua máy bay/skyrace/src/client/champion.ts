import * as THREE from 'three';
import { F } from '../shared/game.ts';
import type { Podium } from '../shared/types.ts';
import type { Particles } from './fx.ts';
import { PlaneRig } from './glb.ts';

// Màn vinh danh nhà vô địch: chiếc máy bay top 1 (đúng mẫu, màu sơn, số hiệu) đặt trên bệ vàng giữa trời,
// đèn rọi, cột sáng quét chéo, hào quang tia nắng phía sau, pháo hoa, kim tuyến, hạt vàng lấp lánh quanh thân,
// máy quay lao tới rồi lượn vòng quanh. Đặt cao giữa bầu trời để nền thoáng, máy bay nổi bật nhất có thể.
export class Champion {
  readonly group = new THREE.Group();
  readonly center: THREE.Vector3;
  readonly rig: PlaneRig;
  readonly radius: number;
  private beams: THREE.Mesh[] = [];
  private rays: THREE.Sprite;
  private rings: THREE.Mesh[] = [];
  private lights: THREE.SpotLight[] = [];
  private t = 0; private nextFw = 0; private nextRoll = 2.5;
  private fire: Particles; private confetti: Particles;
  private owned: { dispose(): void }[] = [];

  constructor(scene: THREE.Scene, at: THREE.Vector3, p: Podium, num: string, fire: Particles, confetti: Particles){
    this.fire = fire; this.confetti = confetti;
    this.center = at.clone();
    this.rig = new PlaneRig(p.plane, p.color, num);
    // mọi mẫu hiện cùng cỡ lớn (máy bay nhỏ được phóng to)
    const k = 15 / this.rig.size;
    this.rig.root.scale.setScalar(k);
    this.radius = 15;
    this.rig.root.position.copy(at);
    this.group.add(this.rig.root);
    const own = <T extends { dispose(): void }>(x: T) => { this.owned.push(x); return x; };

    // bệ vàng nhiều tầng có chữ VÔ ĐỊCH, vành sáng quay quanh
    const gold = own(new THREE.MeshStandardMaterial({ color: 0xd4a63a, metalness: 1, roughness: 0.18, envMapIntensity: 1.6 }));
    const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 128;
    const g = cv.getContext('2d')!;
    const gr = g.createLinearGradient(0, 0, 0, 128); gr.addColorStop(0, '#fff1b8'); gr.addColorStop(0.5, '#e8b844'); gr.addColorStop(1, '#8a6418');
    g.fillStyle = gr; g.fillRect(0, 0, 1024, 128);
    g.font = 'italic 900 70px "Segoe UI", Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#4a2c00';
    for (let i = 0; i < 4; i++) g.fillText('🏆 VÔ ĐỊCH #1', 128 + i * 256, 66);
    const band = own(new THREE.CanvasTexture(cv)); band.colorSpace = THREE.SRGBColorSpace; band.wrapS = THREE.RepeatWrapping;
    const bandM = own(new THREE.MeshStandardMaterial({ map: band, metalness: 0.9, roughness: 0.25, emissive: 0x3a2400, emissiveMap: band, emissiveIntensity: 0.6 }));
    const base = new THREE.Group();
    base.add(new THREE.Mesh(own(new THREE.CylinderGeometry(10, 11.5, 2.2, 48)), gold));
    base.add(new THREE.Mesh(own(new THREE.CylinderGeometry(8.6, 9.6, 3.2, 48, 1, true)), bandM).translateY(2.6));
    base.add(new THREE.Mesh(own(new THREE.CylinderGeometry(9.2, 8.8, 0.8, 48)), gold).translateY(4.5));
    base.position.copy(at).add(new THREE.Vector3(0, -9.5, 0));
    this.group.add(base);
    const glow = own(new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffd23a).multiplyScalar(4), toneMapped: false, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
    for (const [r, y] of [[11, -4.6], [13.5, -3.2], [16, -1.6]] as const){
      const ring = new THREE.Mesh(own(new THREE.TorusGeometry(r, 0.18, 8, 80)), glow);
      ring.rotation.x = Math.PI / 2; ring.position.copy(at).add(new THREE.Vector3(0, y, 0));
      this.group.add(ring); this.rings.push(ring);
    }

    // cột sáng sân khấu quét chéo lên máy bay
    const bc = document.createElement('canvas'); bc.width = 4; bc.height = 256;
    const bg = bc.getContext('2d')!, bgr = bg.createLinearGradient(0, 0, 0, 256);
    bgr.addColorStop(0, 'rgba(255,255,255,0)'); bgr.addColorStop(0.6, 'rgba(255,255,255,0.35)'); bgr.addColorStop(1, 'rgba(255,255,255,0.9)');
    bg.fillStyle = bgr; bg.fillRect(0, 0, 4, 256);
    const beamTex = own(new THREE.CanvasTexture(bc));
    const beamGeo = own(new THREE.CylinderGeometry(7, 0.6, 90, 24, 1, true).translate(0, -45, 0));
    for (let i = 0; i < 6; i++){
      const m = new THREE.Mesh(beamGeo, own(new THREE.MeshBasicMaterial({ map: beamTex, color: new THREE.Color().setHSL(0.12 + i * 0.09, 0.9, 0.6), transparent: true, opacity: 0.12,
        blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })));
      m.position.copy(at); this.group.add(m); this.beams.push(m);
    }

    // hào quang tia nắng phía sau máy bay
    const rc = document.createElement('canvas'); rc.width = rc.height = 512;
    const rg = rc.getContext('2d')!;
    rg.translate(256, 256);
    for (let i = 0; i < 32; i++){
      rg.rotate(Math.PI * 2 / 32);
      const gl = rg.createLinearGradient(0, 0, 256, 0); gl.addColorStop(0, 'rgba(255,230,140,0)'); gl.addColorStop(0.25, 'rgba(255,230,140,0.7)'); gl.addColorStop(1, 'rgba(255,200,60,0)');
      rg.fillStyle = gl; rg.beginPath(); rg.moveTo(0, 0); rg.lineTo(256, i % 2 ? -14 : -26); rg.lineTo(256, i % 2 ? 14 : 26); rg.fill();
    }
    const rayTex = own(new THREE.CanvasTexture(rc));
    this.rays = new THREE.Sprite(own(new THREE.SpriteMaterial({ map: rayTex, color: new THREE.Color(0.5, 0.36, 0.12), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, toneMapped: false })));
    this.rays.scale.setScalar(46);
    this.group.add(this.rays);

    // đèn rọi thật chiếu lên thân cho nước sơn bóng loáng
    for (const [x, y, z, c] of [[25, 30, 25, 0xfff2d0], [-25, 18, -10, 0xffd890], [0, -20, 25, 0xbfe0ff]] as const){
      const s = new THREE.SpotLight(c, 5, 120, 0.5, 0.5, 0);
      s.position.copy(at).add(new THREE.Vector3(x, y, z)); s.target.position.copy(at);
      this.group.add(s, s.target); this.lights.push(s);
    }
    scene.add(this.group);
  }

  update(dt: number, cam: THREE.Camera){
    this.t += dt;
    const t = this.t, c = this.center;
    // máy bay xoay chậm như trên bàn xoay, nhấp nhô nhẹ, thỉnh thoảng xoay thùng khoe dáng
    this.rig.root.position.set(c.x, c.y + Math.sin(t * 1.4) * 0.6, c.z);
    this.rig.root.rotation.set(-0.08, t * 0.45, Math.sin(t * 0.9) * 0.18);
    if (t > this.nextRoll){ this.rig.maneuver(Math.random() < 0.5 ? 'barrel' : 'roll'); this.nextRoll = t + 4.5; }
    this.rig.update({ dt, t, speed: 60, throttle: 1, roll: Math.sin(t) * 0.5, pitch: Math.sin(t * 0.7) * 0.4, yaw: 0, gear: 0, ground: false, mode: 'fly', flags: F.NITRO | F.SHIELD });
    this.beams.forEach((b, i) => {
      const a = t * 0.6 + i / this.beams.length * Math.PI * 2;
      b.rotation.set(Math.PI + Math.sin(a) * 0.55, 0, Math.cos(a * 1.3) * 0.55);
      (b.material as THREE.MeshBasicMaterial).opacity = 0.08 + 0.05 * Math.sin(t * 3 + i);
    });
    this.rings.forEach((r, i) => { r.rotation.z = t * (0.4 + i * 0.25) * (i % 2 ? -1 : 1); r.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.04); });
    // hào quang luôn nằm sau máy bay so với máy quay
    this.rays.position.copy(c).addScaledVector(c.clone().sub(cam.position).normalize(), 45);
    (this.rays.material as THREE.SpriteMaterial).rotation = t * 0.15;
    this.rays.scale.setScalar(52 + Math.sin(t * 2) * 4);
    // hạt vàng lấp lánh quanh thân
    for (let i = 0; i < 2; i++){
      const p = c.clone().add(new THREE.Vector3((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 26));
      this.fire.emit(p, new THREE.Vector3(0, 1.5, 0), Math.random() < 0.5 ? 0xffd23a : 0xfff4c0, 0.25 + Math.random() * 0.3, 0.9);
    }
    // kim tuyến rơi
    for (let i = 0; i < 8; i++){
      const p = c.clone().add(new THREE.Vector3((Math.random() - 0.5) * 60, 30 + Math.random() * 10, (Math.random() - 0.5) * 60));
      this.confetti.emit(p, new THREE.Vector3((Math.random() - 0.5) * 3, -4, (Math.random() - 0.5) * 3), [0xffd23a, 0xff4fd8, 0x37e6ff, 0x34c759, 0xffffff, 0xff8a1f][i % 6], 0.9, 4, { drag: 0.4, grav: 2 });
    }
    // pháo hoa nổ quanh sân khấu
    if (t > this.nextFw){
      this.nextFw = t + 0.45 + Math.random() * 0.4;
      const p = c.clone().add(new THREE.Vector3((Math.random() - 0.5) * 90, 18 + Math.random() * 30, (Math.random() - 0.5) * 90));
      const hue = Math.random();
      const cols = [new THREE.Color().setHSL(hue, 1, 0.6).getHex(), new THREE.Color().setHSL((hue + 0.1) % 1, 1, 0.7).getHex(), 0xffffff];
      this.fire.burst(p, cols, 90, 34, 2.2, 1.6, { grav: 7, drag: 1.1 });
    }
  }

  // máy quay: lao tới trong 1,2 giây đầu rồi lượn vòng quanh, hơi ngước lên cho máy bay hùng vĩ
  camera(out: THREE.Vector3, look: THREE.Vector3){
    // lao vào: 2 giây đầu khoảng cách thu từ 4,2 xuống 2,1 lần cỡ máy bay, rồi từ từ áp sát thêm
    const e = Math.min(1, this.t / 2), zoom = 1 - (1 - e) ** 3;
    const a = this.t * 0.32 + 0.6, R = this.radius * (4.2 - 2.1 * zoom - 0.3 * Math.min(1, Math.max(0, this.t - 2) / 6));
    out.set(this.center.x + Math.cos(a) * R, this.center.y + 3 + Math.sin(this.t * 0.5) * 3, this.center.z + Math.sin(a) * R);
    look.copy(this.center).add(new THREE.Vector3(0, 2.5, 0));
  }
  get age(){ return this.t; }

  dispose(scene: THREE.Scene){
    scene.remove(this.group);
    this.rig.dispose();
    for (const o of this.owned) o.dispose();
    for (const s of this.lights) s.dispose();
  }
}
