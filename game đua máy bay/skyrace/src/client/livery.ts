import * as THREE from 'three';
import { GOLD } from '../shared/game.ts';

// Vật liệu PBR và nước sơn riêng của từng máy bay: sơn kim loại phủ bóng (clearcoat), kính buồng lái, kim loại trần,
// cao su lốp, đèn tín hiệu. Hoa văn, số hiệu, logo vẽ bằng canvas nên mỗi người chơi một bộ sơn riêng.
export type Slot = 'paint' | 'wing' | 'metal' | 'dark' | 'rubber' | 'glass' | 'cabin' | 'suit' | 'helmet' | 'white' | 'glow' | 'blur';
export type LiveryKind = 'military' | 'airline' | 'bizjet' | 'golden' | 'warbird' | 'stunt' | 'racer' | 'supersonic' | 'transport' | 'future';

/* -------------------------------------------------- vật liệu dùng chung */
let shared: Partial<Record<Slot, THREE.Material>> | null = null;
export function sharedMaterials(){
  return shared ??= {
    metal: new THREE.MeshStandardMaterial({ name: 'metal', color: 0xb9c0c8, metalness: 1, roughness: 0.3 }),
    dark: new THREE.MeshStandardMaterial({ name: 'dark', color: 0x34373d, metalness: 0.85, roughness: 0.42 }),
    rubber: new THREE.MeshStandardMaterial({ name: 'rubber', color: 0x15161a, metalness: 0, roughness: 0.92 }),
    glass: new THREE.MeshPhysicalMaterial({ name: 'glass', color: 0x9ec6ff, metalness: 0.1, roughness: 0.04, transparent: true, opacity: 0.32,
      clearcoat: 1, clearcoatRoughness: 0.02, envMapIntensity: 2.2, depthWrite: false, side: THREE.DoubleSide }),
    cabin: new THREE.MeshStandardMaterial({ name: 'cabin', color: 0x2b2e33, metalness: 0.1, roughness: 0.85 }),
    suit: new THREE.MeshStandardMaterial({ name: 'suit', color: 0x5b6b45, metalness: 0, roughness: 0.9 }),
    helmet: new THREE.MeshPhysicalMaterial({ name: 'helmet', color: 0xf2f2f2, metalness: 0.1, roughness: 0.25, clearcoat: 1 }),
    white: new THREE.MeshPhysicalMaterial({ name: 'white', color: 0xf4f6f8, metalness: 0.15, roughness: 0.3, clearcoat: 0.8, clearcoatRoughness: 0.1 }),
    blur: new THREE.MeshBasicMaterial({ name: 'blur', color: 0x1a1a1a, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }),
  };
}

/* ---------------------------------------------------------- tiện ích */
const css = (n: number) => '#' + (n & 0xffffff).toString(16).padStart(6, '0');
const shade = (n: number, k: number) => { const c = new THREE.Color(n); const h = { h: 0, s: 0, l: 0 }; c.getHSL(h); c.setHSL(h.h, h.s, Math.max(0, Math.min(1, h.l * k))); return css(c.getHex()); };
const mix = (a: number, b: number, t: number) => css(new THREE.Color(a).lerp(new THREE.Color(b), t).getHex());
function canvas(w: number, h: number){ const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')!] as const; }
function tex(c: HTMLCanvasElement, srgb = true){
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
  return t;
}
// Đường ghép tấm vỏ máy bay: nét mảnh, mờ, làm thân bớt "nhựa"
function panelLines(g: CanvasRenderingContext2D, w: number, h: number, step: number, alpha = 0.16){
  g.save(); g.strokeStyle = `rgba(0,0,0,${alpha})`; g.lineWidth = 1;
  for (let y = step * 0.5; y < h; y += step){ g.beginPath(); g.moveTo(0, y); g.lineTo(w, y); g.stroke(); }
  for (let x = 0; x < w; x += w / 8){ g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
  g.fillStyle = `rgba(0,0,0,${alpha * 0.8})`;
  for (let y = step * 0.5; y < h; y += step) for (let x = 3; x < w; x += 9) g.fillRect(x, y - 2.5, 1.2, 1.2);   // đinh tán
  g.restore();
}
// Chữ chạy dọc thân: canvas x = vòng quanh thân (u), canvas y = dọc thân (y = 0 ở mũi). side 1: sườn trái (+X), -1: sườn phải.
function sideText(g: CanvasRenderingContext2D, text: string, u: number, y: number, size: number, color: string, side: 1 | -1, W: number, font = '900'){
  g.save(); g.translate(u * W, y); g.rotate(side === 1 ? Math.PI / 2 : -Math.PI / 2);
  g.font = `italic ${font} ${size}px "Segoe UI", Arial`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = color;
  g.fillText(text, 0, 0); g.restore();
}
// Hàng cửa sổ khoang khách dọc thân
function windows(g: CanvasRenderingContext2D, u: number, y0: number, y1: number, W: number, gap: number, oval = false){
  g.fillStyle = '#1b2433';
  for (let y = y0; y < y1; y += gap){
    g.beginPath();
    if (oval) g.ellipse(u * W, y, 3.4, 5, 0, 0, Math.PI * 2); else g.roundRect(u * W - 2.6, y - 3.2, 5.2, 6.4, 2.2);
    g.fill();
  }
}

/* --------------------------------------------------------- sơn thân */
// Thân: canvas 256 (vòng quanh, u: 0 bụng, 0.25 sườn trái, 0.5 lưng, 0.75 sườn phải) × 1024 (dọc thân, mũi ở trên)
function bodyLivery(kind: LiveryKind, color: number, num: string){
  const W = 256, H = 1024, [c, g] = canvas(W, H);
  const fillU = (u0: number, u1: number, style: string) => { g.fillStyle = style; g.fillRect(u0 * W, 0, (u1 - u0) * W, H); };
  let glow: HTMLCanvasElement | null = null;
  switch (kind){
    case 'military': {
      fillU(0, 1, css(color));
      fillU(0, 0.18, shade(color, 1.35)); fillU(0.82, 1, shade(color, 1.35));          // bụng sáng hơn
      g.fillStyle = '#3d4047'; g.fillRect(0, 0, W, H * 0.07);                            // chóp radar sẫm màu
      panelLines(g, W, H, 46, 0.22);
      sideText(g, `AF ${num}`, 0.3, H * 0.62, 26, 'rgba(20,20,20,0.75)', 1, W, '800');
      sideText(g, `AF ${num}`, 0.7, H * 0.62, 26, 'rgba(20,20,20,0.75)', -1, W, '800');
      g.fillStyle = 'rgba(255,240,0,0.8)'; g.fillRect(0.2 * W, H * 0.25, 10, 10); g.fillRect(0.75 * W, H * 0.25, 10, 10);   // ký hiệu cứu hộ
      break;
    }
    case 'airline': case 'bizjet': case 'supersonic': {
      fillU(0, 1, '#f3f5f8');
      fillU(0, 0.2, css(color)); fillU(0.8, 1, css(color));
      // vạch dài uốn lượn hai bên sườn
      for (const [u0, s] of [[0.21, 1], [0.79, -1]] as const){
        g.beginPath(); g.moveTo(u0 * W, 0);
        for (let y = 0; y <= H; y += 16) g.lineTo((u0 + s * (0.05 + 0.04 * Math.sin(y / H * Math.PI))) * W, y);
        g.lineTo(u0 * W - s * 2, H); g.closePath(); g.fillStyle = css(color); g.fill();
        g.strokeStyle = '#d9b44a'; g.lineWidth = 3; g.stroke();
      }
      if (kind === 'airline'){ windows(g, 0.335, H * 0.16, H * 0.82, W, 13); windows(g, 0.665, H * 0.16, H * 0.82, W, 13); }
      if (kind === 'bizjet'){ windows(g, 0.34, H * 0.22, H * 0.6, W, 34, true); windows(g, 0.66, H * 0.22, H * 0.6, W, 34, true); }
      if (kind !== 'supersonic'){
        sideText(g, 'SKY RACE', 0.4, H * 0.48, 34, css(color), 1, W); sideText(g, 'SKY RACE', 0.6, H * 0.48, 34, css(color), -1, W);
      }
      sideText(g, `VN-${num}`, 0.3, H * 0.9, 18, '#2a2e36', 1, W, '700'); sideText(g, `VN-${num}`, 0.7, H * 0.9, 18, '#2a2e36', -1, W, '700');
      // cửa ra vào
      g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 1.5;
      for (const u of [0.32, 0.68]){ g.strokeRect(u * W - 7, H * 0.1, 14, 30); g.strokeRect(u * W - 7, H * 0.84, 14, 28); }
      panelLines(g, W, H, 64, 0.06);
      break;
    }
    case 'golden': {
      const gr = g.createLinearGradient(0, 0, W, 0);
      gr.addColorStop(0, '#8a6418'); gr.addColorStop(0.35, '#f6d77a'); gr.addColorStop(0.5, '#fff1b8'); gr.addColorStop(0.65, '#f6d77a'); gr.addColorStop(1, '#8a6418');
      g.fillStyle = gr; g.fillRect(0, 0, W, H);
      g.strokeStyle = 'rgba(60,35,0,0.55)'; g.lineWidth = 2;
      for (const u of [0.2, 0.8]){ g.beginPath(); for (let y = 0; y <= H; y += 8) g.lineTo((u + 0.02 * Math.sin(y / 30)) * W, y); g.stroke(); }
      windows(g, 0.34, H * 0.22, H * 0.62, W, 34, true); windows(g, 0.66, H * 0.22, H * 0.62, W, 34, true);
      sideText(g, '♛ VIP ♛', 0.4, H * 0.75, 30, '#4a2c00', 1, W); sideText(g, '♛ VIP ♛', 0.6, H * 0.75, 30, '#4a2c00', -1, W);
      break;
    }
    case 'warbird': {
      fillU(0, 1, css(color)); fillU(0, 0.22, shade(color, 1.5)); fillU(0.78, 1, shade(color, 1.5));
      g.fillStyle = '#f5c518'; g.fillRect(0, 0, W, H * 0.06);                      // vòng mũi vàng
      for (let i = 0; i < 5; i++){ g.fillStyle = i % 2 ? '#111' : '#f4f4f4'; g.fillRect(0, H * (0.78 + i * 0.03), W, H * 0.03); }   // sọc trắng đen
      for (const u of [0.27, 0.73]){                                               // huy hiệu tròn
        const y = H * 0.55;
        for (const [r, col] of [[26, '#1a3d8f'], [18, '#fff'], [9, '#c8102e']] as const){ g.beginPath(); g.ellipse(u * W, y, r * 0.55, r, 0, 0, Math.PI * 2); g.fillStyle = col; g.fill(); }
      }
      panelLines(g, W, H, 52, 0.2);
      break;
    }
    case 'stunt': {
      fillU(0, 1, css(color));
      const s = 22;                                                                 // bàn cờ dưới bụng
      for (let y = 0; y < H; y += s) for (let x = 0; x < W; x += s){
        const u = (x + s / 2) / W;
        if (u > 0.22 && u < 0.78) continue;
        g.fillStyle = ((x + y) / s) % 2 ? '#111' : '#fff'; g.fillRect(x, y, s, s);
      }
      // tia nắng từ mũi
      g.save(); g.translate(W / 2, 0);
      for (let i = -6; i <= 6; i++){ g.beginPath(); g.moveTo(0, 0); g.lineTo(i * 26 - 10, H * 0.42); g.lineTo(i * 26 + 4, H * 0.42); g.closePath(); g.fillStyle = i % 2 ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.0)'; g.fill(); }
      g.restore();
      sideText(g, `SKY ${num}`, 0.38, H * 0.6, 34, '#fff', 1, W); sideText(g, `SKY ${num}`, 0.62, H * 0.6, 34, '#fff', -1, W);
      break;
    }
    case 'racer': {
      fillU(0, 1, '#30333b');
      g.fillStyle = '#f4f5f7'; g.beginPath(); g.moveTo(0, 0); g.lineTo(W, 0); g.lineTo(W, H * 0.3); g.bezierCurveTo(W * 0.7, H * 0.5, W * 0.3, H * 0.5, 0, H * 0.3); g.fill();
      g.strokeStyle = css(color); g.lineWidth = 10; g.beginPath(); g.moveTo(0, H * 0.3); g.bezierCurveTo(W * 0.3, H * 0.5, W * 0.7, H * 0.5, W, H * 0.3); g.stroke();
      g.fillStyle = css(color); g.fillRect(0, H * 0.82, W, H * 0.18);
      for (let i = 0; i < 6; i++){ g.fillStyle = '#f4f5f7'; g.fillRect(W * 0.4 + i * 10, H * 0.62, 5, 40); g.fillRect(W * 0.6 - i * 10 - 5, H * 0.62, 5, 40); }
      sideText(g, num, 0.27, H * 0.56, 70, '#f4f5f7', 1, W); sideText(g, num, 0.73, H * 0.56, 70, '#f4f5f7', -1, W);
      break;
    }
    case 'transport': {
      fillU(0, 1, mix(color, 0x6f7a6a, 0.6));
      for (let i = 0; i < 70; i++){                                                // vằn ngụy trang
        g.fillStyle = i % 2 ? mix(color, 0x3f4a3a, 0.55) : mix(color, 0x9aa08a, 0.5);
        g.beginPath(); g.ellipse(Math.random() * W, Math.random() * H, 10 + Math.random() * 26, 20 + Math.random() * 60, Math.random() * 3, 0, Math.PI * 2); g.fill();
      }
      fillU(0, 0.14, '#8f968c'); fillU(0.86, 1, '#8f968c');
      sideText(g, `AIR FORCE ${num}`, 0.38, H * 0.5, 22, '#1d1f22', 1, W, '800'); sideText(g, `AIR FORCE ${num}`, 0.62, H * 0.5, 22, '#1d1f22', -1, W, '800');
      panelLines(g, W, H, 40, 0.2);
      break;
    }
    case 'future': {
      fillU(0, 1, '#1d2129');
      const [gc, gg] = canvas(W, H); glow = gc;
      gg.fillStyle = '#000'; gg.fillRect(0, 0, W, H);
      for (const t of [g, gg]){
        t.strokeStyle = css(color); t.lineWidth = 4;
        for (const u of [0.24, 0.76, 0.5]){ t.beginPath(); for (let y = 0; y <= H; y += 8) t.lineTo((u + 0.03 * Math.sin(y / 70)) * W, y); t.stroke(); }
        t.lineWidth = 2; for (let y = 120; y < H; y += 150){ t.beginPath(); t.moveTo(0, y); t.lineTo(W, y + 40); t.stroke(); }
      }
      g.fillStyle = shade(color, 0.45); g.fillRect(0, H * 0.85, W, H * 0.15);
      sideText(g, `X-${num}`, 0.33, H * 0.62, 40, css(color), 1, W); sideText(g, `X-${num}`, 0.67, H * 0.62, 40, css(color), -1, W);
      panelLines(g, W, H, 70, 0.3);
      break;
    }
  }
  // kính buồng lái của máy bay lớn: các ô kính tối có khung, nằm đúng chỗ vòm kính trên thân (t: phần trăm dọc thân)
  const WS: Partial<Record<LiveryKind, [number, number]>> = { airline: [0.89, 0.955], bizjet: [0.835, 0.915], golden: [0.835, 0.915], transport: [0.847, 0.93], supersonic: [0.79, 0.84] };
  const ws = WS[kind];
  if (ws){
    const y0 = (1 - ws[1]) * H, y1 = (1 - ws[0]) * H;
    for (const [u0, u1] of [[0.29, 0.47], [0.53, 0.71]] as const){
      const n = 3, step = (u1 - u0) / n;
      for (let k = 0; k < n; k++){
        g.beginPath(); g.roundRect((u0 + k * step) * W + 1.5, y0, step * W - 3, y1 - y0, 3);
        g.fillStyle = '#121a26'; g.fill(); g.strokeStyle = 'rgba(255,255,255,0.35)'; g.lineWidth = 1; g.stroke();
      }
    }
  }
  return { map: tex(c), glow: glow ? tex(glow) : null };
}

/* ---------------------------------------------------------- sơn cánh */
// Cánh: canvas x = dọc dây cung (0 mép trước), canvas y = dọc sải cánh (y = 0 ở đầu cánh)
function wingLivery(kind: LiveryKind, color: number, num: string){
  const W = 256, H = 256, [c, g] = canvas(W, H);
  let glow: HTMLCanvasElement | null = null;
  const base = kind === 'airline' || kind === 'bizjet' || kind === 'supersonic' ? '#d9dee5' : kind === 'golden' ? '#e8c45a' : kind === 'racer' ? '#f1f2f4' : kind === 'future' ? '#1d2129' : kind === 'transport' ? mix(color, 0x6f7a6a, 0.6) : css(color);
  g.fillStyle = base; g.fillRect(0, 0, W, H);
  switch (kind){
    case 'airline': case 'bizjet': g.fillStyle = css(color); g.fillRect(0, 0, W, H * 0.12); g.fillStyle = '#9aa3ad'; g.fillRect(0, 0, W * 0.08, H); break;   // đầu cánh màu, mép trước kim loại
    case 'stunt': {
      const s = 32;
      for (let y = 0; y < H * 0.4; y += s) for (let x = 0; x < W; x += s){ g.fillStyle = ((x + y) / s) % 2 ? '#111' : '#fff'; g.fillRect(x, y, s, s); }
      g.fillStyle = 'rgba(255,255,255,0.85)'; g.fillRect(0, H * 0.55, W, 18);
      break;
    }
    case 'racer':
      g.fillStyle = css(color); g.fillRect(0, 0, W * 0.12, H); g.fillRect(0, 0, W, 10);
      g.save(); g.translate(W * 0.5, H * 0.35); g.rotate(Math.PI / 2); g.font = 'italic 900 90px "Segoe UI"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#30333b'; g.fillText(num, 0, 0); g.restore();
      break;
    case 'warbird':
      for (const [r, col] of [[60, '#1a3d8f'], [42, '#fff'], [22, '#c8102e']] as const){ g.beginPath(); g.arc(W * 0.45, H * 0.3, r * 0.8, 0, Math.PI * 2); g.fillStyle = col; g.fill(); }
      panelLines(g, W, H, 40, 0.2);
      break;
    case 'military': g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, 0, W * 0.06, H); panelLines(g, W, H, 36, 0.22); break;
    case 'golden': g.strokeStyle = 'rgba(80,50,0,0.5)'; g.lineWidth = 3; g.strokeRect(10, 10, W - 20, H - 20); break;
    case 'transport': g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, 0, W * 0.05, H); panelLines(g, W, H, 40, 0.2); break;
    case 'future': {
      const [gc, gg] = canvas(W, H); glow = gc; gg.fillStyle = '#000'; gg.fillRect(0, 0, W, H);
      for (const t of [g, gg]){ t.fillStyle = css(color); t.fillRect(0, 0, W * 0.05, H); t.fillRect(0, 0, W, 8); t.fillRect(W * 0.6, 0, 4, H); }
      break;
    }
    case 'supersonic': g.fillStyle = css(color); g.fillRect(0, 0, W * 0.05, H); break;
  }
  return { map: tex(c), glow: glow ? tex(glow) : null };
}

/* ------------------------------------------------- logo + số trên đuôi */
function finDecal(kind: LiveryKind, color: number, num: string){
  const W = 256, H = 256, [c, g] = canvas(W, H);
  g.clearRect(0, 0, W, H);
  const ink = kind === 'golden' ? '#4a2c00' : kind === 'military' || kind === 'transport' ? 'rgba(25,25,25,0.85)' : '#ffffff';
  // logo: vòng tròn cánh chim
  g.save(); g.translate(W * 0.5, H * 0.33);
  g.beginPath(); g.arc(0, 0, 50, 0, Math.PI * 2);
  g.fillStyle = kind === 'golden' ? '#fff3c4' : kind === 'airline' || kind === 'bizjet' || kind === 'supersonic' ? css(color) : 'rgba(255,255,255,0.15)'; g.fill();
  g.lineWidth = 5; g.strokeStyle = ink; g.stroke();
  g.fillStyle = ink; g.beginPath(); g.moveTo(-36, 10); g.quadraticCurveTo(0, -38, 36, 10); g.quadraticCurveTo(0, -12, -36, 10); g.fill();
  g.beginPath(); g.moveTo(-20, 22); g.lineTo(0, 6); g.lineTo(20, 22); g.lineTo(0, 14); g.closePath(); g.fill();
  if (kind === 'golden'){ g.font = '900 34px "Segoe UI"'; g.textAlign = 'center'; g.fillText('♛', 0, -10); }
  g.restore();
  g.font = 'italic 900 64px "Segoe UI", Arial'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = ink;
  g.fillText(num, W * 0.5, H * 0.75);
  g.font = '800 22px "Segoe UI"'; g.fillText(kind === 'military' || kind === 'transport' ? 'AF' : 'SKY RACE', W * 0.5, H * 0.94);
  return tex(c);
}

/* --------------------------------------------------- bộ vật liệu một chiếc */
export interface PlaneMaterials { slots: Partial<Record<Slot, THREE.Material>>; decal: THREE.MeshBasicMaterial; glow: THREE.MeshBasicMaterial; own: THREE.Material[]; textures: THREE.Texture[] }
export function planeMaterials(kind: LiveryKind, color: number, num: string): PlaneMaterials {
  const gold = kind === 'golden';
  const body = bodyLivery(kind, color, num), wing = wingLivery(kind, color, num), decalT = finDecal(kind, color, num);
  const paintOpts = (map: THREE.Texture, glowMap: THREE.Texture | null): THREE.MeshPhysicalMaterialParameters => ({
    map, color: 0xffffff,
    metalness: gold ? 1 : kind === 'military' || kind === 'transport' ? 0.35 : 0.55,
    roughness: gold ? 0.16 : kind === 'military' || kind === 'transport' ? 0.55 : 0.32,
    clearcoat: kind === 'military' || kind === 'transport' ? 0.2 : 1, clearcoatRoughness: 0.06, envMapIntensity: gold ? 1.6 : 1.1,
    ...(glowMap ? { emissiveMap: glowMap, emissive: 0xffffff, emissiveIntensity: 1.6 } : {}),
  });
  const paint = new THREE.MeshPhysicalMaterial({ name: 'paint', ...paintOpts(body.map, body.glow) });
  const wingM = new THREE.MeshPhysicalMaterial({ name: 'wing', ...paintOpts(wing.map, wing.glow) });
  const decal = new THREE.MeshBasicMaterial({ map: decalT, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, side: THREE.FrontSide });
  // lửa đốt sau bên trong miệng phản lực, sáng lên khi tăng tốc
  const glow = new THREE.MeshBasicMaterial({ color: 0xff8a2a, toneMapped: false });
  const s = sharedMaterials();
  const accent = gold ? new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.2 }) : null;
  return {
    slots: { ...s, paint, wing: wingM, glow, ...(accent ? { metal: accent } : {}) },
    decal, glow, own: [paint, wingM, decal, glow, ...(accent ? [accent] : [])], textures: [body.map, wing.map, decalT, ...(body.glow ? [body.glow] : []), ...(wing.glow ? [wing.glow] : [])],
  };
}
export function disposeMaterials(m: PlaneMaterials){ for (const x of m.own) x.dispose(); for (const t of m.textures) t.dispose(); }

// Đốm sáng tròn mềm cho đèn tín hiệu
let glowTex: THREE.Texture | null = null;
export function lightSprite(){
  if (glowTex) return glowTex;
  const [c, g] = canvas(64, 64), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return glowTex = tex(c, false);
}
