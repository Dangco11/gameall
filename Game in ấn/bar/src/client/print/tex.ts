import * as THREE from 'three';

// Ảnh vật liệu vẽ bằng code (không cần file ảnh): đá cẩm thạch có vân, gỗ óc chó, thảm hoa văn, mặt đường nhựa,
// cửa sổ toà nhà sáng đèn... Mỗi loại vẽ một lần rồi dùng chung, có cả ảnh độ nhám cho ánh phản chiếu loang lổ như thật.

// nhiễu giá trị mượt (value noise) nhiều tầng, đủ để vẽ vân đá, thớ gỗ
function makeNoise(seed = 1){
  const N = 256, perm = new Uint8Array(N * 2), val = new Float32Array(N);
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < N; i++){ perm[i] = i; val[i] = rnd(); }
  for (let i = N - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < N; i++) perm[N + i] = perm[i];
  const sm = (t: number) => t * t * (3 - 2 * t);
  const n2 = (x: number, y: number) => {
    const xi = Math.floor(x) & 255, yi = Math.floor(y) & 255, xf = x - Math.floor(x), yf = y - Math.floor(y);
    const a = val[perm[xi + perm[yi]]], b = val[perm[xi + 1 + perm[yi]]], c = val[perm[xi + perm[yi + 1]]], d = val[perm[xi + 1 + perm[yi + 1]]];
    const u = sm(xf), v = sm(yf);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  // tầng nhiễu lặp khít theo chu kỳ (ảnh dán lặp không thấy đường nối)
  return (x: number, y: number, oct = 5, period = 8) => {
    let f = 0, amp = 0.5, fr = 1;
    for (let o = 0; o < oct; o++){
      const p = period * fr, xx = ((x * fr) % p + p) % p, yy = ((y * fr) % p + p) % p;
      const a = n2(xx, yy), b = n2(xx - p, yy), c = n2(xx, yy - p), d = n2(xx - p, yy - p);
      const wx = xx / p, wy = yy / p;
      f += amp * ((a * (1 - wx) + b * wx) * (1 - wy) + (c * (1 - wx) + d * wx) * wy);
      amp *= 0.5; fr *= 2;
    }
    return f;
  };
}

function canvas(w: number, h = w){ const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c: HTMLCanvasElement, repeat = 1, srgb = true){
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  t.anisotropy = 8;
  return t;
}
const cache = new Map<string, unknown>();
function once<T>(key: string, make: () => T): T { if (!cache.has(key)) cache.set(key, make()); return cache.get(key) as T; }

// Đá cẩm thạch: nền + vân uốn lượn (sin của nhiễu) + đốm; trả ảnh màu và ảnh độ nhám (vân hơi nhám hơn mặt đá)
export function marble(key: string, base: [number, number, number], vein: [number, number, number], opts: { size?: number; scale?: number; sharp?: number; tiles?: number; gold?: boolean } = {}){
  return once('marble:' + key, () => {
    const S = opts.size ?? 512, c = canvas(S), r = canvas(S), g = c.getContext('2d')!, gr = r.getContext('2d')!;
    const img = g.createImageData(S, S), rimg = gr.createImageData(S, S), noise = makeNoise(key.length * 7 + 3);
    const sc = opts.scale ?? 4, sharp = opts.sharp ?? 6;
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++){
      const u = x / S * 8, v = y / S * 8;
      const n = noise(u * sc / 4, v * sc / 4, 6, 8 * sc / 4);
      const w = Math.abs(Math.sin((u + v * 0.6) * 1.4 + n * 9)), vv = Math.pow(1 - w, sharp) + Math.pow(1 - Math.abs(Math.sin(u * 0.5 - v * 1.1 + n * 5)), sharp * 2.5) * 0.6;
      const k = Math.min(1, vv), cl = 0.92 + noise(u * 3, v * 3, 3, 24) * 0.16;
      const i = (y * S + x) * 4;
      let R = (base[0] * (1 - k) + vein[0] * k) * cl, G = (base[1] * (1 - k) + vein[1] * k) * cl, B = (base[2] * (1 - k) + vein[2] * k) * cl;
      if (opts.gold && k > 0.55){ R = 230; G = 180; B = 90; }
      img.data[i] = R; img.data[i + 1] = G; img.data[i + 2] = B; img.data[i + 3] = 255;
      const rough = 40 + k * 70 + noise(u * 6, v * 6, 2, 48) * 30;
      rimg.data[i] = rimg.data[i + 1] = rimg.data[i + 2] = rough; rimg.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0); gr.putImageData(rimg, 0, 0);
    // ron giữa các tấm đá
    if (opts.tiles){
      const n = opts.tiles, step = S / n;
      for (const ctx of [g, gr]){ ctx.strokeStyle = ctx === g ? 'rgba(10,10,14,0.85)' : 'rgb(200,200,200)'; ctx.lineWidth = 3; for (let i = 0; i <= n; i++){ ctx.beginPath(); ctx.moveTo(i * step, 0); ctx.lineTo(i * step, S); ctx.moveTo(0, i * step); ctx.lineTo(S, i * step); ctx.stroke(); } }
    }
    return { map: tex(c), rough: tex(r, 1, false) };
  });
}

// Gỗ óc chó sẫm: thớ dọc dài, vòng gỗ nhẹ
export function wood(key = 'walnut', base: [number, number, number] = [72, 44, 28]){
  return once('wood:' + key, () => {
    const W = 512, H = 1024, c = canvas(W, H), g = c.getContext('2d')!, img = g.createImageData(W, H), noise = makeNoise(11);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
      const u = x / W * 8, v = y / H * 8;
      const n = noise(u * 2, v * 0.25, 5, 16);
      const ring = 0.5 + 0.5 * Math.sin((u * 6 + n * 14) * 1.3), fine = noise(u * 40, v * 2, 2, 320);
      const k = 0.72 + ring * 0.25 + fine * 0.12, i = (y * W + x) * 4;
      img.data[i] = base[0] * k; img.data[i + 1] = base[1] * k; img.data[i + 2] = base[2] * k; img.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    return tex(c);
  });
}

// Thảm khu VIP: nền đỏ rượu vang với hoa văn hình thoi viền vàng
export function carpet(){
  return once('carpet', () => {
    const S = 512, c = canvas(S), g = c.getContext('2d')!, noise = makeNoise(5);
    g.fillStyle = '#3a0a16'; g.fillRect(0, 0, S, S);
    const img = g.getImageData(0, 0, S, S);
    for (let i = 0; i < S * S; i++){ const n = noise((i % S) / S * 64, Math.floor(i / S) / S * 64, 2, 64) * 30 - 15; img.data[i * 4] += n; img.data[i * 4 + 1] += n * 0.3; img.data[i * 4 + 2] += n * 0.4; }
    g.putImageData(img, 0, 0);
    g.strokeStyle = 'rgba(214,170,90,0.55)'; g.lineWidth = 3;
    const st = S / 4;
    for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++){
      const cx = x * st + st / 2, cy = y * st + st / 2;
      g.beginPath(); g.moveTo(cx, cy - st * 0.42); g.lineTo(cx + st * 0.42, cy); g.lineTo(cx, cy + st * 0.42); g.lineTo(cx - st * 0.42, cy); g.closePath(); g.stroke();
      g.beginPath(); g.arc(cx, cy, st * 0.08, 0, Math.PI * 2); g.stroke();
    }
    return tex(c, 3);
  });
}

// Tấm tiêu âm / ốp tường: các khe dọc sâu, xen dải kim loại
export function panels(key: string, color: string, groove: string, n = 16){
  return once('panels:' + key, () => {
    const S = 512, c = canvas(S), g = c.getContext('2d')!, noise = makeNoise(17);
    g.fillStyle = color; g.fillRect(0, 0, S, S);
    const img = g.getImageData(0, 0, S, S);
    for (let i = 0; i < S * S; i++){ const n2 = noise((i % S) / S * 32, Math.floor(i / S) / S * 4, 3, 32) * 26 - 13; for (let k = 0; k < 3; k++) img.data[i * 4 + k] += n2; }
    g.putImageData(img, 0, 0);
    g.fillStyle = groove;
    for (let i = 0; i < n; i++) g.fillRect(i * S / n, 0, 4, S);
    return tex(c);
  });
}

// Cửa sổ toà nhà ban đêm: lưới ô kính, ô sáng vàng ấm, trắng lạnh, tối; dùng làm ảnh phát sáng (emissive)
export function windows(key: string, cols: number, rows: number, lit = 0.45){
  return once('win:' + key, () => {
    const W = 256, H = 512, c = canvas(W, H), g = c.getContext('2d')!;
    g.fillStyle = '#05060a'; g.fillRect(0, 0, W, H);
    const cw = W / cols, rh = H / rows;
    let s = key.length * 31 + cols * 7 + rows;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++){
      const r = rnd();
      if (r > lit){ g.fillStyle = `rgb(${10 + r * 14},${12 + r * 14},${20 + r * 20})`; }
      else { const warm = rnd() < 0.7, v = 0.55 + rnd() * 0.45; g.fillStyle = warm ? `rgb(${255 * v},${190 * v},${110 * v})` : `rgb(${170 * v},${205 * v},${255 * v})`; }
      g.fillRect(x * cw + cw * 0.14, y * rh + rh * 0.18, cw * 0.72, rh * 0.62);
    }
    const t = tex(c);
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  });
}

// Mặt đường nhựa ướt: đá dăm li ti, vệt loang; ảnh độ nhám cho vũng nước phản chiếu đèn đường
export function asphalt(){
  return once('asphalt', () => {
    const S = 512, c = canvas(S), r = canvas(S), g = c.getContext('2d')!, gr = r.getContext('2d')!, img = g.createImageData(S, S), rimg = gr.createImageData(S, S), noise = makeNoise(23);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++){
      const i = (y * S + x) * 4, n = noise(x / S * 64, y / S * 64, 3, 64), big = noise(x / S * 4, y / S * 4, 4, 4);
      const v = 28 + n * 30 + (Math.random() < 0.04 ? 25 : 0);
      img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v * 1.08; img.data[i + 3] = 255;
      const wet = big > 0.55 ? 30 : 150 + n * 60;
      rimg.data[i] = rimg.data[i + 1] = rimg.data[i + 2] = wet; rimg.data[i + 3] = 255;
    }
    g.putImageData(img, 0, 0); gr.putImageData(rimg, 0, 0);
    return { map: tex(c, 6), rough: tex(r, 6, false) };
  });
}

// Gạch lát vỉa hè
export function pavers(){
  return once('pavers', () => {
    const S = 512, c = canvas(S), g = c.getContext('2d')!, noise = makeNoise(29);
    g.fillStyle = '#4a4a4e'; g.fillRect(0, 0, S, S);
    const n = 8, st = S / n;
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){ const v = 70 + noise(x, y, 1, 8) * 40; g.fillStyle = `rgb(${v},${v},${v + 4})`; g.fillRect(x * st + 2, y * st + 2, st - 4, st - 4); }
    return tex(c, 8);
  });
}

// Chữ neon cho biển hiệu phố: viết bằng canvas nên có đủ dấu tiếng Việt; trả về ảnh phát sáng và tỉ lệ ngang/dọc
export function neonText(text: string, color: string, font = '700 120px "Segoe UI", Arial, sans-serif'){
  return once('neon:' + text + color, () => {
    const m = canvas(8).getContext('2d')!; m.font = font;
    const w = Math.ceil(m.measureText(text).width + 120), h = 220, c = canvas(w, h), g = c.getContext('2d')!;
    g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.shadowColor = color; g.shadowBlur = 40; g.fillStyle = color; g.fillText(text, w / 2, h / 2);
    g.shadowBlur = 12; g.fillStyle = '#ffffff'; g.globalAlpha = 0.85; g.fillText(text, w / 2, h / 2);
    const t = tex(c); t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    return { tex: t, aspect: w / h };
  });
}

// Đốm sáng mềm (khói, quầng đèn, bong bóng)
export function softDot(){
  return once('dot', () => {
    const S = 128, c = canvas(S), g = c.getContext('2d')!, gr = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,0.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}
// Khói: đám mây mờ không đều
export function smoke(){
  return once('smoke', () => {
    const S = 256, c = canvas(S), g = c.getContext('2d')!, img = g.createImageData(S, S), noise = makeNoise(41);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++){
      const dx = x / S - 0.5, dy = y / S - 0.5, d = Math.sqrt(dx * dx + dy * dy) * 2, n = noise(x / S * 6, y / S * 6, 5, 6);
      const a = Math.max(0, 1 - d) ** 1.5 * (0.35 + n * 0.9), i = (y * S + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = 255; img.data[i + 3] = Math.min(255, a * 255);
    }
    g.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
    return t;
  });
}
// Bầu trời đêm thành phố: xanh tím thẫm trên cao, ánh đèn cam hắt lên ở chân trời, sao lấm tấm
export function nightSky(){
  return once('sky', () => {
    const W = 1024, H = 512, c = canvas(W, H), g = c.getContext('2d')!, gr = g.createLinearGradient(0, 0, 0, H);
    gr.addColorStop(0, '#04040c'); gr.addColorStop(0.45, '#0b0b24'); gr.addColorStop(0.72, '#24163a'); gr.addColorStop(0.86, '#4a2a3a'); gr.addColorStop(1, '#2a1a22');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 500; i++){ const y = Math.random() * H * 0.6, a = Math.random() * (1 - y / (H * 0.6)); g.fillStyle = `rgba(255,255,255,${a * 0.8})`; g.fillRect(Math.random() * W, y, 1.2, 1.2); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.mapping = THREE.EquirectangularReflectionMapping;
    return t;
  });
}
