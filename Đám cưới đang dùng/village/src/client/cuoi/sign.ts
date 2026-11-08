import type { WeddingRole, WeddingState } from '../../shared/types.ts';

// Bảng trên cổng hoa: khung oval đỏ viền vàng "Lễ Thành Hôn" và chữ Song Hỷ, dưới là dải lụa ghi tên hai người
// kèm ảnh đại diện tròn (ảnh TikTok qua /avatar/<id>, không có thì chữ cái đầu). Vẽ lại khi đổi cô dâu chú rể.
export class Sign {
  readonly canvas = document.createElement('canvas');
  // hai khung ảnh cưới to trên mái đình: [cô dâu, chú rể]
  readonly frames = [document.createElement('canvas'), document.createElement('canvas')];
  onChange: () => void = () => {};
  private g: CanvasRenderingContext2D;
  private key = '';
  private last: WeddingState | null = null;
  private imgs = new Map<string, HTMLImageElement | null>();

  constructor(){
    // vẽ gấp đôi độ phân giải (toạ độ vẫn tính theo 1024 x 640) cho chữ trên bảng nét khi quay cận
    this.canvas.width = 2048; this.canvas.height = 1280;
    this.g = this.canvas.getContext('2d')!;
    for (const c of this.frames){ c.width = 1024; c.height = 1280; }
    this.draw(null);
  }

  private image(r: WeddingRole){
    if (!r.avatar) return null;
    if (!this.imgs.has(r.id)){
      this.imgs.set(r.id, null);
      const img = new Image();
      img.onload = () => { this.imgs.set(r.id, img); this.key = ''; this.draw(this.last); };
      img.src = '/avatar/' + encodeURIComponent(r.id);
      if (this.imgs.size > 30) this.imgs.delete(this.imgs.keys().next().value as string);
    }
    return this.imgs.get(r.id) ?? null;
  }

  draw(w: WeddingState | null){
    this.last = w;
    const bride = w?.bride ?? null, groom = w?.groom ?? null;
    const key = JSON.stringify([bride?.id, bride?.name, groom?.id, groom?.name]);
    if (key === this.key) return;
    this.key = key;
    const g = this.g, W = 1024, H = 640;
    g.setTransform(2, 0, 0, 2, 0, 0);
    g.clearRect(0, 0, W, H);
    // oval đỏ viền vàng
    g.save();
    g.beginPath(); g.ellipse(W / 2, 220, 420, 200, 0, 0, Math.PI * 2);
    const bg = g.createRadialGradient(W / 2, 180, 40, W / 2, 220, 420); bg.addColorStop(0, '#e2283a'); bg.addColorStop(1, '#a50f1c');
    g.fillStyle = bg; g.fill();
    g.lineWidth = 22; g.strokeStyle = '#f2c94c'; g.stroke();
    g.lineWidth = 5; g.strokeStyle = '#fff1b8'; g.beginPath(); g.ellipse(W / 2, 220, 392, 174, 0, 0, Math.PI * 2); g.stroke();
    g.restore();
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = '#ffe08a'; g.shadowColor = 'rgba(80,0,0,.5)'; g.shadowBlur = 8;
    g.font = 'italic bold 92px "Dancing Script", "Brush Script MT", "Segoe Script", Georgia, serif';
    g.fillText('Lễ Thành Hôn', W / 2, 160);
    g.font = 'bold 130px "Noto Serif CJK SC", "Microsoft YaHei", "SimSun", serif';
    g.fillText('囍', W / 2, 300);
    g.shadowBlur = 0;
    // dải lụa tên hai người
    g.fillStyle = '#fff4f6';
    g.beginPath(); g.moveTo(90, 470); g.lineTo(934, 470); g.lineTo(900, 520); g.lineTo(934, 570); g.lineTo(90, 570); g.lineTo(124, 520); g.closePath();
    g.fill(); g.lineWidth = 6; g.strokeStyle = '#f2c94c'; g.stroke();
    const names = `${bride ? bride.name : 'Chờ cô dâu…'}   ♥   ${groom ? groom.name : bride ? 'Chờ chú rể…' : '…'}`;
    g.fillStyle = '#b3141f'; g.font = 'bold 40px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
    g.fillText(fit(g, names, 600), W / 2, 522);
    this.portrait(150, 520, bride);
    this.portrait(874, 520, groom);
    this.frame(this.frames[0], bride, 'CÔ DÂU', 'Chờ cô dâu…');
    this.frame(this.frames[1], groom, 'CHÚ RỂ', 'Chờ chú rể…');
    this.onChange();
  }

  // Khung ảnh cưới: viền vàng chạm hoa, nền đỏ, ảnh đại diện TikTok cắt vừa khung (không có ảnh thì chữ cái đầu),
  // nhãn CÔ DÂU / CHÚ RỂ trên đầu, bảng tên dưới chân, tim và hoa ở bốn góc
  private frame(c: HTMLCanvasElement, r: WeddingRole | null, label: string, empty: string){
    const g = c.getContext('2d')!, W = 512, H = 640;
    g.setTransform(2, 0, 0, 2, 0, 0);
    g.clearRect(0, 0, W, H);
    const gold = g.createLinearGradient(0, 0, W, H); gold.addColorStop(0, '#fff1b0'); gold.addColorStop(0.3, '#e8b83a'); gold.addColorStop(0.55, '#fff6c8'); gold.addColorStop(0.8, '#c8901e'); gold.addColorStop(1, '#f6d26a');
    g.fillStyle = gold; g.beginPath(); g.roundRect(0, 0, W, H, 40); g.fill();
    g.fillStyle = '#a50f1c'; g.beginPath(); g.roundRect(26, 26, W - 52, H - 52, 26); g.fill();
    g.strokeStyle = '#fff1b8'; g.lineWidth = 4; g.beginPath(); g.roundRect(40, 40, W - 80, H - 80, 20); g.stroke();
    // ảnh
    const x = 62, y = 96, w = W - 124, h = 420;
    g.save(); g.beginPath(); g.roundRect(x, y, w, h, 16); g.clip();
    const img = r ? this.image(r) : null;
    if (img){
      const k = Math.max(w / img.width, h / img.height), iw = img.width * k, ih = img.height * k;
      g.drawImage(img, x + (w - iw) / 2, y + (h - ih) / 2, iw, ih);
    } else {
      const bg = g.createLinearGradient(0, y, 0, y + h); bg.addColorStop(0, r ? hueOf(r.id) : '#f6c4d2'); bg.addColorStop(1, '#ffe6ee');
      g.fillStyle = bg; g.fillRect(x, y, w, h);
      g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff';
      g.font = 'bold 150px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
      g.fillText(r ? initials(r.name) : '?', W / 2, y + h / 2 + 6);
    }
    g.restore();
    g.strokeStyle = '#f2c94c'; g.lineWidth = 8; g.beginPath(); g.roundRect(x, y, w, h, 16); g.stroke();
    // nhãn trên đầu
    g.fillStyle = '#f2c94c'; g.beginPath(); g.roundRect(W / 2 - 120, 40, 240, 52, 26); g.fill();
    g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#8a0f18';
    g.font = 'bold 34px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif'; g.fillText('💗 ' + label + ' 💗', W / 2, 67);
    // bảng tên
    g.fillStyle = '#fff4f6'; g.beginPath(); g.roundRect(54, 530, W - 108, 66, 33); g.fill();
    g.strokeStyle = '#f2c94c'; g.lineWidth = 5; g.stroke();
    g.fillStyle = '#b3141f'; g.font = 'bold 36px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif';
    g.fillText(fit(g, r ? r.name : empty, W - 150), W / 2, 564);
    // hoa bốn góc
    g.font = '40px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    for (const [cx, cy] of [[34, 34], [W - 34, 34], [34, H - 34], [W - 34, H - 34]]) g.fillText('🌸', cx, cy);
  }

  private portrait(cx: number, cy: number, r: WeddingRole | null){
    const g = this.g, R = 74;
    g.save();
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.closePath();
    g.fillStyle = r ? hueOf(r.id) : '#e8b6c2'; g.fill();
    const img = r ? this.image(r) : null;
    if (img){ g.clip(); g.drawImage(img, cx - R, cy - R, R * 2, R * 2); }
    else { g.fillStyle = '#fff'; g.font = 'bold 64px "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif'; g.fillText(r ? initials(r.name) : '?', cx, cy + 4); }
    g.restore();
    g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.lineWidth = 9; g.strokeStyle = '#f2c94c'; g.stroke();
  }
}

function initials(name: string){
  const w = name.replace(/[^\p{L}\p{N}\s]/gu, '').trim().split(/\s+/).filter(Boolean);
  return ((w[0]?.[0] ?? '?') + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase();
}
function hueOf(id: string){ let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 360; return `hsl(${h}, 55%, 48%)`; }
function fit(g: CanvasRenderingContext2D, text: string, max: number){
  if (g.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && g.measureText(t + '…').width > max) t = t.slice(0, -1);
  return t + '…';
}
