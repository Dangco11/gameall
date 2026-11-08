import * as THREE from 'three';
import type { DanceGroup } from '../../shared/dances.ts';
import { Confetti } from './confetti.ts';
import { Particles } from './particles.ts';
import type { People } from './people.ts';
import type { Stage } from './stage.ts';
import { neonText, smoke, softDot } from './tex.ts';

// Hiệu ứng theo nhóm điệu nhảy, đặt quanh người đang được chú ý (người tới lượt battle, người vừa tặng quà, người vừa
// bình luận chọn điệu, và một "ngôi sao sàn nhảy" đổi lượt mỗi lúc). Mỗi nhóm một kiểu riêng:
//   EDM: laser quét, sóng sáng trên sàn theo phách, hạt sáng bay vòng quanh người
//   Hip-hop: khói mặt sàn mỗi phách, vệt sáng theo tay, chữ graffiti neon trên sàn
//   TikTok: tim, ngôi sao, bong bóng bay lên, vòng sáng dưới chân
//   Gợi cảm: đèn rọi ấm dịu, hạt sáng mềm, vệt tay mảnh
//   Breakdance: vòng năng lượng quay dưới chân, bụi sân khấu khi giậm, xoáy tốc độ
//   Party: pháo giấy, bong bóng, đèn sàn nhấp nháy nhiều màu
//   VIP: hạt vàng, vòng hào quang trên đầu, pháo hoa nhỏ, laser nhiều tầng
const GROUP_COLORS: Record<DanceGroup, number[]> = {
  edm: [0x3ad8ff, 0xff3ac8, 0x9a5aff], hiphop: [0xffa020, 0xff4a2a, 0xfff07a], tiktok: [0xff4f8f, 0x5af0ff, 0xffffff],
  sexy: [0xff6aa0, 0xffb08a, 0xd08aff], break: [0x5aff8a, 0x3ad8ff, 0xffffff], party: [0xff3a5c, 0xffd23a, 0x3ad0ff], vip: [0xffd060, 0xfff0b0, 0xffb020],
};
const TAGS = ['HIP HOP', 'YO!', 'FRESH', 'DOPE', 'BOOM', 'SWAG'];

function iconTex(kind: 'heart' | 'star'){
  const S = 128, c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d')!; g.fillStyle = '#fff'; g.shadowColor = '#fff'; g.shadowBlur = 16;
  g.beginPath();
  if (kind === 'heart'){ g.moveTo(64, 108); g.bezierCurveTo(10, 70, 18, 22, 64, 44); g.bezierCurveTo(110, 22, 118, 70, 64, 108); }
  else for (let i = 0; i < 10; i++){ const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 22 : 54; g.lineTo(64 + Math.cos(a) * r, 64 + Math.sin(a) * r); }
  g.closePath(); g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

interface Featured { id: string; until: number; group: DanceGroup; reason: string; ring: THREE.Mesh; halo: THREE.Mesh; lastBar: number; spin: number }

export class DanceFx {
  readonly group = new THREE.Group();
  private glow = new Particles(1600, softDot(), true);
  private dust = new Particles(260, smoke(), false);
  private hearts = new Particles(160, iconTex('heart'), true);
  private stars = new Particles(160, iconTex('star'), true);
  private confetti = new Confetti();
  private feat = new Map<string, Featured>();
  private tags: { m: THREE.Mesh; until: number }[] = [];
  private stage: Stage; private people: People;
  private spot: (id: string, ms: number) => void;
  private starAt = 0;
  private _v = new THREE.Vector3(); private _h = new THREE.Vector3();

  constructor(stage: Stage, people: People, spotlight: (id: string, ms: number) => void){
    this.stage = stage; this.people = people; this.spot = spotlight;
    this.group.add(this.glow.points, this.dust.points, this.hearts.points, this.stars.points, this.confetti.group);
  }

  // chú ý tới một người trong `sec` giây (hiệu ứng theo nhóm điệu người đó đang nhảy)
  feature(id: string, sec: number, reason = ''){
    let f = this.feat.get(id);
    if (!f){
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.6, 64).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.012, 8, 48).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.2, 0.8), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
      this.group.add(ring, halo);
      f = { id, until: 0, group: 'edm', reason, ring, halo, lastBar: -1, spin: 0 };
      this.feat.set(id, f);
    }
    f.until = Math.max(f.until, performance.now() + sec * 1000); f.reason = reason || f.reason;
    if (this.people.danceOf(id)?.group === 'sexy') this.spot(id, sec * 1000);
  }
  featured(id: string){ return this.feat.has(id); }

  private tag(x: number, z: number, color: string){
    const n = neonText(TAGS[Math.floor(Math.random() * TAGS.length)], color, '900 120px "Segoe UI", Arial, sans-serif');
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.55 * n.aspect, 0.55).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: n.tex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, color: new THREE.Color(1.6, 1.6, 1.6) }));
    m.position.set(x, 0.06, z); m.rotation.y = (Math.random() - 0.5) * 0.6;
    this.group.add(m); this.tags.push({ m, until: performance.now() + 4500 });
  }

  update(dt: number, beat: { beat: boolean; phase: number }, viewH: number, fov: number){
    const now = performance.now(), P = this.people, bar = Math.floor(beat.phase / 4);
    // không ai được chú ý thì chọn một "ngôi sao sàn nhảy" mỗi 12 giây
    if (now > this.starAt){
      this.starAt = now + 12_000;
      const ds = P.dancers().filter(p => p.kind !== 'staff');
      const pick = ds[Math.floor(Math.random() * ds.length)];
      if (pick && ![...this.feat.values()].some(f => f.reason !== 'star' && f.until > now)) this.feature(pick.id, 11, 'star');
    }
    for (const f of [...this.feat.values()]){
      const d = P.danceOf(f.id), feet = P.feet(f.id);
      const alive = now < f.until && !!feet;
      const k = alive ? Math.min(1, (f.until - now) / 600) : 0;
      (f.ring.material as THREE.MeshBasicMaterial).opacity += ((alive && d ? 0.8 : 0) * k - (f.ring.material as THREE.MeshBasicMaterial).opacity) * Math.min(1, dt * 6);
      (f.halo.material as THREE.MeshBasicMaterial).opacity += ((alive && d?.group === 'vip' ? 0.9 : 0) - (f.halo.material as THREE.MeshBasicMaterial).opacity) * Math.min(1, dt * 6);
      if (!alive){ if ((f.ring.material as THREE.MeshBasicMaterial).opacity < 0.01){ f.ring.removeFromParent(); f.halo.removeFromParent(); f.ring.geometry.dispose(); f.halo.geometry.dispose(); (f.ring.material as THREE.Material).dispose(); (f.halo.material as THREE.Material).dispose(); this.feat.delete(f.id); } continue; }
      if (!d) continue;
      f.group = d.group;
      const cols = GROUP_COLORS[d.group], col = cols[Math.floor(Math.random() * cols.length)];
      const head = P.head(f.id, this._h)!, hl = P.hand(f.id, false, new THREE.Vector3())!, hr = P.hand(f.id, true, new THREE.Vector3())!;
      f.ring.position.set(feet.x, feet.y + 0.03, feet.z);
      (f.ring.material as THREE.MeshBasicMaterial).color.set(cols[0]).multiplyScalar(2.2);
      f.spin += dt * (d.group === 'break' ? 6 : 1.2);
      f.ring.rotation.y = f.spin;
      const pulse = 1 + 0.25 * Math.exp(-((beat.phase % 1)) * 5);
      f.ring.scale.setScalar(d.group === 'tiktok' || d.group === 'break' ? pulse : 1);
      f.halo.position.set(head.x, head.y + 0.28, head.z); f.halo.rotation.z = Math.sin(now / 500) * 0.15;
      const newBar = bar !== f.lastBar; f.lastBar = bar;
      const n = (r: number) => Math.random() < r * dt * 60;
      switch (d.group){
        case 'edm':
          if (beat.beat){ this.stage.ripple(feet.x, feet.z, cols[Math.floor(beat.phase) % 2]); this.stage.laserPulse(900, 'fan'); }
          if (n(2)){ const a = Math.random() * Math.PI * 2, y = 0.4 + Math.random() * 1.4; this.glow.emit({ at: this._v.set(feet.x + Math.cos(a) * 0.6, y, feet.z + Math.sin(a) * 0.6), v: new THREE.Vector3(-Math.sin(a) * 1.2, 0.3, Math.cos(a) * 1.2), life: 0.9, color: col, size: 0.06, drag: 0.5, fade: 0.6 }); }
          break;
        case 'hiphop':
          if (beat.beat) for (let i = 0; i < 4; i++){ const a = Math.random() * Math.PI * 2; this.dust.emit({ at: this._v.set(feet.x, 0.12, feet.z), v: new THREE.Vector3(Math.cos(a) * 0.8, 0.12, Math.sin(a) * 0.8), life: 1.6, color: 0x4a4458, size: 0.5, grow: 2.6, alpha: 0.32, drag: 1.4, fade: 0.6 }); }
          for (const h of [hl, hr]) if (n(1.5)) this.glow.emit({ at: h, v: new THREE.Vector3(), life: 0.35, color: col, size: 0.05, fade: 0.8 });
          if (newBar && bar % 2 === 0) this.tag(feet.x + (Math.random() - 0.5) * 1.6, feet.z + 0.6 + Math.random() * 0.6, ['#ff9a20', '#5af0ff', '#ff4fb8'][bar % 3]);
          break;
        case 'tiktok':
          if (beat.beat){ const h = Math.random() < 0.5 ? hl : hr; this.hearts.emit({ at: h, v: new THREE.Vector3((Math.random() - 0.5) * 0.4, 0.9, (Math.random() - 0.5) * 0.4), life: 1.8, color: 0xff4f8f, size: 0.16, grow: 1.4, drag: 0.3, fade: 0.5 }); }
          if (n(0.6)) this.stars.emit({ at: this._v.set(head.x + (Math.random() - 0.5) * 0.8, head.y + (Math.random() - 0.3) * 0.6, head.z + (Math.random() - 0.5) * 0.6), v: new THREE.Vector3(0, 0.15, 0), life: 0.8, color: Math.random() < 0.5 ? 0xffffff : 0x5af0ff, size: 0.1, fade: 0.6 });
          if (n(0.4)) this.glow.emit({ at: this._v.set(feet.x + (Math.random() - 0.5) * 0.8, 0.3, feet.z + (Math.random() - 0.5) * 0.8), v: new THREE.Vector3(0, 0.6, 0), life: 2, color: 0xbfe8ff, size: 0.09, drag: 0.2, fade: 0.4 });
          break;
        case 'sexy':
          if (n(0.8)) this.glow.emit({ at: this._v.set(feet.x + (Math.random() - 0.5), 0.3 + Math.random() * 1.6, feet.z + (Math.random() - 0.5)), v: new THREE.Vector3(0, 0.12, 0), life: 2.4, color: col, size: 0.05, alpha: 0.6, fade: 0.5 });
          for (const h of [hl, hr]) if (n(0.7)) this.glow.emit({ at: h, v: new THREE.Vector3(), life: 0.5, color: 0xffa0c0, size: 0.035, alpha: 0.6, fade: 0.8 });
          break;
        case 'break':
          if (beat.beat) for (let i = 0; i < 5; i++){ const a = Math.random() * Math.PI * 2; this.dust.emit({ at: this._v.set(feet.x, 0.08, feet.z), v: new THREE.Vector3(Math.cos(a) * 1.1, 0.25, Math.sin(a) * 1.1), life: 1.2, color: 0x6a5a48, size: 0.35, grow: 2.2, alpha: 0.35, drag: 1.6, fade: 0.6 }); }
          if (n(3)){ const a = f.spin * 2 + Math.random() * 0.4, r = 0.5; this.glow.emit({ at: this._v.set(feet.x + Math.cos(a) * r, 0.15 + Math.random() * 0.5, feet.z + Math.sin(a) * r), v: new THREE.Vector3(-Math.sin(a) * 2.4, 0.5, Math.cos(a) * 2.4), life: 0.45, color: col, size: 0.045, fade: 0.7 }); }
          break;
        case 'party':
          if (newBar) this.confetti.fire(this._v.set(feet.x, 2.2, feet.z), new THREE.Vector3(0, 1, 0), 60, 0.35);
          if (beat.beat) this.stage.ripple(feet.x, feet.z, cols[Math.floor(beat.phase) % cols.length]);
          if (n(0.5)) this.glow.emit({ at: this._v.set(feet.x + (Math.random() - 0.5), 0.5, feet.z + (Math.random() - 0.5)), v: new THREE.Vector3(0, 0.7, 0), life: 2, color: 0xe0f4ff, size: 0.1, alpha: 0.5, drag: 0.2, fade: 0.4 });
          break;
        case 'vip':
          if (n(2)) this.glow.emit({ at: this._v.set(feet.x + (Math.random() - 0.5) * 0.9, 0.1 + Math.random() * 0.5, feet.z + (Math.random() - 0.5) * 0.9), v: new THREE.Vector3((Math.random() - 0.5) * 0.2, 1.1 + Math.random() * 0.6, (Math.random() - 0.5) * 0.2), life: 1.6, color: col, size: 0.045, drag: 0.4, fade: 0.5 });
          if (newBar){ this.stage.laserPulse(3000, 'show'); for (let i = 0; i < 70; i++) this.glow.emit({ at: this._v.set(feet.x, 3.4, feet.z - 0.5), v: new THREE.Vector3().randomDirection().multiplyScalar(2.4), life: 1.2, color: i % 3 ? 0xffd060 : 0xffffff, size: 0.05, gravity: 2.5, drag: 0.8, fade: 0.5 }); }
          break;
      }
    }
    for (const t of this.tags){ const left = t.until - now, m = t.m.material as THREE.MeshBasicMaterial; m.opacity = Math.min(1, (4500 - left) / 400) * Math.min(1, left / 1200); }
    for (const t of this.tags.filter(x => now > x.until)){ t.m.removeFromParent(); t.m.geometry.dispose(); (t.m.material as THREE.Material).dispose(); }
    this.tags = this.tags.filter(x => now <= x.until);
    for (const p of [this.glow, this.dust, this.hearts, this.stars]) p.update(dt, viewH, fov);
    this.confetti.update(dt, now);
  }
}
