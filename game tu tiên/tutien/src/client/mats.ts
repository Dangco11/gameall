import * as THREE from 'three';

// Vật liệu và texture dùng chung (cache theo màu): ít vật liệu thì ít đổi shader, nhiều nhân vật vẫn mượt.
export const clock = { t: 0 };
export const uTime = { value: 0 };
const cache = new Map<string, THREE.Material>();

export function std(color: number, o: { rough?: number; metal?: number; emissive?: number; ei?: number; side?: THREE.Side } = {}) {
  const key = `s${color}-${o.rough ?? 0.6}-${o.metal ?? 0}-${o.emissive ?? 0}-${o.ei ?? 1}-${o.side ?? 0}`;
  let m = cache.get(key) as THREE.MeshStandardMaterial | undefined;
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: o.rough ?? 0.6, metalness: o.metal ?? 0, emissive: o.emissive ?? 0, emissiveIntensity: o.ei ?? 1, side: o.side ?? THREE.FrontSide });
    cache.set(key, m);
  }
  return m;
}
// vải: phần dưới (uv.y lớn) lay động theo gió bằng shader, không tốn CPU
export function cloth(color: number, trim = 0, amp = 0.06) {
  const key = `c${color}-${trim}-${amp}`;
  let m = cache.get(key) as THREE.MeshStandardMaterial | undefined;
  if (!m) {
    m = new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.05, side: THREE.DoubleSide, emissive: trim, emissiveIntensity: trim ? 0.08 : 0 });
    m.onBeforeCompile = sh => {
      sh.uniforms.uTime = uTime;
      sh.vertexShader = 'uniform float uTime;\n' + sh.vertexShader.replace('#include <begin_vertex>', `#include <begin_vertex>
        float wv = uv.y * uv.y;
        transformed.x += sin(uTime * 2.3 + position.y * 4.0 + position.z * 3.0) * ${amp.toFixed(3)} * wv;
        transformed.z += cos(uTime * 1.9 + position.y * 3.0 + position.x * 4.0) * ${(amp * 1.4).toFixed(3)} * wv;`);
    };
    m.customProgramCacheKey = () => 'cloth' + amp;
    cache.set(key, m);
  }
  return m;
}
export function glow(color: number, opacity = 1, depthWrite = false) {
  const key = `g${color}-${opacity}-${depthWrite}`;
  let m = cache.get(key) as THREE.MeshBasicMaterial | undefined;
  if (!m) { m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite, side: THREE.DoubleSide }); cache.set(key, m); }
  return m;
}

/* ------------------------------------------------------------ texture vẽ bằng canvas */
function canvasTex(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return t;
}
let _soft: THREE.Texture | null = null;
export const softTex = () => _soft ??= canvasTex(128, 128, g => {
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.25, 'rgba(255,255,255,.7)'); r.addColorStop(0.6, 'rgba(255,255,255,.15)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, 128, 128);
});
let _rune: THREE.Texture | null = null;
// vòng trận pháp: vòng đồng tâm, chữ cổ, quẻ bát quái
export const runeTex = () => _rune ??= canvasTex(512, 512, g => {
  g.translate(256, 256); g.strokeStyle = '#fff'; g.fillStyle = '#fff'; g.shadowColor = '#fff'; g.shadowBlur = 8;
  for (const [r, w] of [[240, 6], [224, 2], [170, 4], [150, 2], [92, 3]] as const) { g.lineWidth = w; g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke(); }
  const glyphs = '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏乾坤震巽坎离艮兑';
  g.font = 'bold 30px serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  for (let i = 0; i < 24; i++) { g.save(); g.rotate(i / 24 * Math.PI * 2); g.fillText(glyphs[i % glyphs.length], 0, -197); g.restore(); }
  for (let i = 0; i < 8; i++) {
    g.save(); g.rotate(i / 8 * Math.PI * 2);
    for (let k = 0; k < 3; k++) { const broken = (i >> k) & 1; g.lineWidth = 7; g.beginPath(); if (broken) { g.moveTo(-26, -112 - k * 13); g.lineTo(-6, -112 - k * 13); g.moveTo(6, -112 - k * 13); g.lineTo(26, -112 - k * 13); } else { g.moveTo(-26, -112 - k * 13); g.lineTo(26, -112 - k * 13); } g.stroke(); }
    g.restore();
  }
  g.lineWidth = 3; for (let i = 0; i < 6; i++) { g.save(); g.rotate(i / 6 * Math.PI * 2); g.beginPath(); g.moveTo(0, -150); g.lineTo(130, 75); g.stroke(); g.restore(); }
});
let _smoke: THREE.Texture | null = null;
export const smokeTex = () => _smoke ??= canvasTex(128, 128, g => {
  for (let i = 0; i < 14; i++) {
    const x = 30 + Math.random() * 68, y = 30 + Math.random() * 68, r = 18 + Math.random() * 26;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,255,255,.35)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  }
});
// nhãn tên + cảnh giới trên đầu nhân vật
export function labelTex(name: string, sub: string, color: string, npc: boolean) {
  return canvasTex(512, 128, g => {
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = '800 46px "Segoe UI", system-ui, sans-serif';
    g.lineWidth = 9; g.strokeStyle = 'rgba(0,0,0,.85)'; g.strokeText(name, 256, 44); g.fillStyle = npc ? '#c9ced8' : '#fff'; g.fillText(name, 256, 44);
    g.font = '700 32px "Segoe UI", system-ui, sans-serif';
    g.lineWidth = 7; g.strokeText(sub, 256, 98); g.fillStyle = color; g.fillText(sub, 256, 98);
  });
}
export const hex = (c: number) => '#' + c.toString(16).padStart(6, '0');
