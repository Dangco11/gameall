// Tên, khung tên theo cấp, biểu cảm và bóng bình luận trên đầu nhân vật. Vẽ bằng canvas 2D nên bình luận chứa mã chỉ hiện như chữ.
import * as THREE from 'three';
import { vipOf } from '/shared/menu.mjs';

const FONT = '"Baloo 2", "Be Vietnam Pro", system-ui, sans-serif';
const v = new THREE.Vector3();
const cut = (s, n) => [...String(s)].length > n ? [...String(s)].slice(0, n - 1).join('') + '…' : String(s);

export class Labels {
  constructor(canvas) { this.canvas = canvas; this.g = canvas.getContext('2d'); this.dpr = 1; }
  resize(w, h, dpr) { this.dpr = dpr; this.canvas.width = w * dpr; this.canvas.height = h * dpr; this.w = w; this.h = h; }

  project(camera, x, y, z) {
    v.set(x, y, z).project(camera);
    if (v.z > 1 || v.x < -1.2 || v.x > 1.2 || v.y < -1.2 || v.y > 1.2) return null;
    const d = camera.position.distanceTo(v.set(x, y, z));
    const px = this.h / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / d;
    v.set(x, y, z).project(camera);
    return { x: (v.x + 1) / 2 * this.w, y: (1 - v.y) / 2 * this.h, px, d };
  }

  draw(camera, chars, captions, now) {
    const g = this.g, dpr = this.dpr;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, this.canvas.width, this.canvas.height);
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const items = [];
    for (const c of chars) {
      // Nhân viên không có tên trên đầu nhưng vẫn hiện biểu cảm và lời mời khách
      if (!c.label && !(c.emoji && now < c.emojiUntil) && !(c.chat && now < c.chatUntil)) continue;
      const p = this.project(camera, c.x, c.headY + .12, c.z);
      if (p) items.push([c, p]);
    }
    items.sort((a, b) => b[1].d - a[1].d);
    for (const [c, p] of items) {
      const size = Math.max(9, Math.min(26, p.px * .34));
      // Hai khách cùng bàn ngồi sát nhau: tên người ghế phải đặt cao hơn một nấc để không đè nhau
      const stagger = c.seat && !c.seat.stand && c.seat.x > c.seat.table.x ? size * 1.6 : 0;
      let top = p.y - stagger;
      if (c.kind === 'guest' && c.label) top = this.nameTag(c, p.x, top, size);
      if (c.emoji && now < c.emojiUntil) {
        const es = size * 2.1, bounce = Math.abs(Math.sin(now / 160)) * size * .3;
        g.font = `${es}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        g.textAlign = 'center'; g.textBaseline = 'bottom';
        g.fillText(c.emoji, p.x, top - 2 - bounce);
        top -= es + 2;
      }
      if (c.chat && now < c.chatUntil) this.bubble(c.chat, p.x, top - 4, size * .95);
    }
    for (const cap of captions) {
      const p = this.project(camera, cap.x, cap.y, cap.z);
      if (p) this.pill(cap.text, p.x, p.y, Math.max(11, Math.min(24, p.px * .36)), '#2f4a43', '#fff8e8', '#5ff5d0');
    }
  }

  nameTag(c, x, y, size) {
    const g = this.g, vip = vipOf(c.level);
    g.font = `700 ${size}px ${FONT}`;
    const name = cut(c.name, 12), badge = c.rank ? `🏆${c.rank}` : c.level >= 4 ? (c.level >= 9 ? '👑' : '★') : '';
    const text = `${badge ? badge + ' ' : ''}${name}`;
    const w = g.measureText(text).width + size * 1.1 + (c.level > 1 ? size * 1.4 : 0), h = size * 1.45;
    const left = x - w / 2, topY = y - h;
    g.fillStyle = vip.frame;
    g.strokeStyle = c.rank ? '#ffd23f' : c.level >= 5 ? '#b8860b' : 'rgba(0,0,0,.18)';
    g.lineWidth = c.rank ? 3 : c.level >= 5 ? 2 : 1;
    g.beginPath(); g.roundRect(left, topY, w, h, h / 2); g.fill(); g.stroke();
    if (c.level >= 7 || c.rank) { g.shadowColor = c.rank ? '#ffd23f' : vip.aura; g.shadowBlur = c.rank && c.rank <= 3 ? 16 : 10; g.stroke(); g.shadowBlur = 0; }
    g.fillStyle = vip.text; g.textAlign = 'left'; g.textBaseline = 'middle';
    g.fillText(text, left + size * .55, topY + h / 2 + 1);
    if (c.level > 1) {
      const bx = left + w - size * 1.25;
      g.fillStyle = vip.text; g.beginPath(); g.roundRect(bx, topY + h * .18, size * 1.05, h * .64, h * .3); g.fill();
      g.fillStyle = vip.frame; g.font = `800 ${size * .62}px ${FONT}`; g.textAlign = 'center';
      g.fillText(String(c.level), bx + size * .52, topY + h / 2 + 1);
    }
    return topY;
  }

  bubble(text, x, bottom, size) {
    const g = this.g;
    g.font = `600 ${size}px ${FONT}`;
    const t = cut(text, 26), w = g.measureText(t).width + size * 1.2, h = size * 1.6;
    g.fillStyle = 'rgba(255,255,255,.96)'; g.strokeStyle = 'rgba(60,40,30,.25)'; g.lineWidth = 1;
    g.beginPath(); g.roundRect(x - w / 2, bottom - h - size * .4, w, h, size * .6);
    g.moveTo(x - size * .3, bottom - size * .4); g.lineTo(x, bottom); g.lineTo(x + size * .3, bottom - size * .4);
    g.fill(); g.stroke();
    g.fillStyle = '#3b2a20'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(t, x, bottom - h / 2 - size * .4 + 1);
  }

  pill(text, x, y, size, bg, fg, border) {
    const g = this.g;
    g.font = `700 ${size}px ${FONT}`;
    const w = g.measureText(text).width + size * 1.2, h = size * 1.5;
    g.fillStyle = bg; g.strokeStyle = border; g.lineWidth = 2;
    g.beginPath(); g.roundRect(x - w / 2, y - h, w, h, h / 2); g.fill(); g.stroke();
    g.fillStyle = fg; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(text, x, y - h / 2 + 1);
  }
}
