import * as THREE from 'three';

// Chất liệu vẽ bằng canvas cho sân đình: mỗi loại có ảnh màu, ảnh pháp tuyến (độ nổi) và ảnh độ nhám riêng,
// vẽ một lần lúc vào trang rồi dùng chung. Không cần tải file ảnh nào.

export function seeded(seed: number){ return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }
const canvas = (w: number, h = w) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };

// Nhiễu giá trị nhiều tầng, lặp liền mạch theo chu kỳ p (cho ảnh lặp không lộ đường nối)
function valueNoise(seed: number){
  const rnd = seeded(seed), N = 256, perm = new Uint8Array(N * 2), val = new Float32Array(N);
  for (let i = 0; i < N; i++){ perm[i] = i; val[i] = rnd(); }
  for (let i = N - 1; i > 0; i--){ const j = Math.floor(rnd() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
  for (let i = 0; i < N; i++) perm[i + N] = perm[i];
  const at = (x: number, y: number, p: number) => val[perm[(((x % p) + p) % p) + perm[(((y % p) + p) % p)]]];
  const s = (t: number) => t * t * (3 - 2 * t);
  const n2 = (x: number, y: number, p: number) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = s(x - xi), yf = s(y - yi);
    const a = at(xi, yi, p), b = at(xi + 1, yi, p), c = at(xi, yi + 1, p), d = at(xi + 1, yi + 1, p);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
  // u, v trong [0,1); oct tầng, tần số gốc f
  return (u: number, v: number, f = 4, oct = 4) => { let sum = 0, amp = 1, tot = 0, fr = f; for (let o = 0; o < oct; o++){ sum += n2(u * fr, v * fr, fr) * amp; tot += amp; amp *= 0.5; fr *= 2; } return sum / tot; };
}

// Từ ảnh độ cao (0..1) dựng ảnh pháp tuyến kiểu OpenGL, lặp liền mạch
function normalFrom(h: Float32Array, w: number, hh: number, strength: number){
  const c = canvas(w, hh), g = c.getContext('2d')!, img = g.createImageData(w, hh), d = img.data;
  for (let y = 0; y < hh; y++) for (let x = 0; x < w; x++){
    const l = h[y * w + (x - 1 + w) % w], r = h[y * w + (x + 1) % w], u = h[((y - 1 + hh) % hh) * w + x], dn = h[((y + 1) % hh) * w + x];
    let nx = (l - r) * strength, ny = (dn - u) * strength, nz = 1; const len = Math.hypot(nx, ny, nz); nx /= len; ny /= len; nz /= len;
    const i = (y * w + x) * 4; d[i] = (nx * 0.5 + 0.5) * 255; d[i + 1] = (ny * 0.5 + 0.5) * 255; d[i + 2] = (nz * 0.5 + 0.5) * 255; d[i + 3] = 255;
  }
  g.putImageData(img, 0, 0); return c;
}
function toCanvas(rgb: Float32Array, w: number, h: number, alpha?: Float32Array){
  const c = canvas(w, h), g = c.getContext('2d')!, img = g.createImageData(w, h), d = img.data;
  for (let i = 0; i < w * h; i++){ d[i * 4] = rgb[i * 3] * 255; d[i * 4 + 1] = rgb[i * 3 + 1] * 255; d[i * 4 + 2] = rgb[i * 3 + 2] * 255; d[i * 4 + 3] = alpha ? alpha[i] * 255 : 255; }
  g.putImageData(img, 0, 0); return c;
}
function grayCanvas(v: Float32Array, w: number, h: number){ const rgb = new Float32Array(w * h * 3); for (let i = 0; i < w * h; i++) rgb[i * 3] = rgb[i * 3 + 1] = rgb[i * 3 + 2] = v[i]; return toCanvas(rgb, w, h); }

export interface PBR { map: THREE.Texture; normalMap: THREE.Texture; roughnessMap?: THREE.Texture }
function pbr(color: HTMLCanvasElement, normal: HTMLCanvasElement, rough?: HTMLCanvasElement): PBR {
  const t = (c: HTMLCanvasElement, srgb: boolean) => { const x = new THREE.CanvasTexture(c); x.wrapS = x.wrapT = THREE.RepeatWrapping; x.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; x.anisotropy = 8; return x; };
  return { map: t(color, true), normalMap: t(normal, false), roughnessMap: rough ? t(rough, false) : undefined };
}
const cache = new Map<string, unknown>();
function once<T>(k: string, f: () => T): T { if (!cache.has(k)) cache.set(k, f()); return cache.get(k) as T; }

/* ------------------------------------------------------------ gạch sân Bát Tràng */
// Gạch vuông đỏ nung 8x8 viên, mạch vữa xám, mỗi viên màu lệch nhau, sứt mẻ mép, lốm đốm, rêu xanh len trong mạch
export const brick = () => once('brick', () => {
  const W = 1024, n = 8, cell = W / n, noise = valueNoise(3), fine = valueNoise(17), rnd = seeded(5);
  const rgb = new Float32Array(W * W * 3), h = new Float32Array(W * W), r = new Float32Array(W * W);
  const tint = Array.from({ length: n * n }, () => [0.62 + rnd() * 0.16, 0.3 + rnd() * 0.08, 0.2 + rnd() * 0.06, rnd()]);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++){
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), lx = x - cx * cell, ly = y - cy * cell, [tr, tg, tb, ts] = tint[cy * n + cx];
    const u = x / W, v = y / W, wear = noise(u, v, 16, 3), f = fine(u, v, 64, 3);
    const edge = Math.min(lx, ly, cell - lx, cell - ly) - 5 - wear * 6;          // mép viên gạch mòn không đều
    const i = y * W + x;
    if (edge < 0){
      // mạch vữa, có rêu
      const moss = Math.max(0, noise(u + 0.3, v, 8, 3) - 0.45) * 2.4;
      rgb[i * 3] = 0.42 - moss * 0.18; rgb[i * 3 + 1] = 0.4 + moss * 0.05; rgb[i * 3 + 2] = 0.36 - moss * 0.12;
      h[i] = 0.15 + f * 0.1; r[i] = 1;
    } else {
      const bevel = Math.min(1, edge / 6), k = 0.82 + f * 0.25 + (noise(u, v, 32, 2) - 0.5) * 0.25, dark = ts > 0.85 ? 0.82 : 1;
      const speck = fine(u * 3.1, v * 2.7, 128, 1) > 0.78 ? 0.75 : 1;
      rgb[i * 3] = tr * k * dark * speck; rgb[i * 3 + 1] = tg * k * dark * speck; rgb[i * 3 + 2] = tb * k * dark * speck;
      h[i] = 0.55 + bevel * 0.35 + f * 0.1; r[i] = 0.78 + f * 0.2;
    }
  }
  return pbr(toCanvas(rgb, W, W), normalFrom(h, W, W, 6), grayCanvas(r, W, W));
});

/* ------------------------------------------------------------ đá ong nền đình */
export const stone = () => once('stone', () => {
  const W = 512, noise = valueNoise(21), rows = 4, rgb = new Float32Array(W * W * 3), h = new Float32Array(W * W), r = new Float32Array(W * W);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++){
    const row = Math.floor(y / (W / rows)), off = row % 2 ? W / 4 : 0, bx = ((x + off) % (W / 2)), by = y % (W / rows);
    const u = x / W, v = y / W, n1 = noise(u, v, 8, 5), joint = Math.min(bx, by, W / 2 - bx, W / rows - by) < 3;
    const pit = noise(u, v, 48, 2) > 0.7 ? 0.7 : 1;
    const i = y * W + x, k = joint ? 0.45 : (0.65 + n1 * 0.35) * pit;
    rgb[i * 3] = 0.6 * k; rgb[i * 3 + 1] = 0.53 * k; rgb[i * 3 + 2] = 0.46 * k;
    h[i] = joint ? 0.2 : 0.6 + n1 * 0.3 * pit; r[i] = 0.92;
  }
  return pbr(toCanvas(rgb, W, W), normalFrom(h, W, W, 5), grayCanvas(r, W, W));
});

/* ------------------------------------------------------------ ngói mũi hài */
// Ngói vảy rồng (mũi hài) xếp so le: mép dưới mỗi viên cong tròn, có bóng đổ lên hàng dưới, rêu và vệt nước mưa
export const roofTile = () => once('tile', () => {
  const W = 512, cols = 8, rows = 8, cw = W / cols, ch = W / rows, noise = valueNoise(31), rnd = seeded(8);
  const rgb = new Float32Array(W * W * 3), h = new Float32Array(W * W), r = new Float32Array(W * W);
  const tone = Array.from({ length: cols * rows * 2 }, () => 0.8 + rnd() * 0.3);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++){
    const row = Math.floor(y / ch), off = row % 2 ? cw / 2 : 0, col = Math.floor(((x + off) % W) / cw), lx = ((x + off) % W) - col * cw, ly = y - row * ch;
    // mép dưới cong: đáy viên ngói là nửa vòng tròn
    const dx = (lx - cw / 2) / (cw / 2), bottom = ch * (0.62 + 0.38 * Math.sqrt(Math.max(0, 1 - dx * dx)));
    const u = x / W, v = y / W, n = noise(u, v, 16, 4), streak = noise(u * 4, v * 0.5, 8, 2);
    const i = y * W + x, t = tone[row * cols + col];
    let k: number, hh: number;
    if (ly < bottom){ const sh = ly / bottom; k = t * (0.7 + sh * 0.35); hh = 0.3 + sh * 0.6; }
    else { k = 0.35; hh = 0.15; }                                 // khe giữa hai viên, tối
    const moss = Math.max(0, n - 0.6) * 2.5;
    k *= 0.85 + n * 0.25 - Math.max(0, streak - 0.55) * 0.5;
    rgb[i * 3] = (0.66 - moss * 0.25) * k; rgb[i * 3 + 1] = (0.3 + moss * 0.06) * k; rgb[i * 3 + 2] = (0.19 - moss * 0.05) * k;
    h[i] = hh + n * 0.08; r[i] = 0.75 + n * 0.2;
  }
  return pbr(toCanvas(rgb, W, W), normalFrom(h, W, W, 7), grayCanvas(r, W, W));
});

/* ------------------------------------------------------------ gỗ lim */
// Gỗ lim nâu đỏ sẫm, vân dọc uốn lượn, mắt gỗ, lớp sơn dầu hơi bóng
export const wood = () => once('wood', () => {
  const W = 256, H = 1024, noise = valueNoise(41), rgb = new Float32Array(W * H * 3), h = new Float32Array(W * H), r = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
    const u = x / W, v = y / H, warp = noise(u, v, 4, 3) * 6, ring = Math.sin((u * 18 + warp) * Math.PI * 2) * 0.5 + 0.5, fine = noise(u * 8, v, 32, 2);
    const k = 0.55 + ring * 0.25 + fine * 0.2, i = y * W + x;
    rgb[i * 3] = 0.36 * k; rgb[i * 3 + 1] = 0.17 * k; rgb[i * 3 + 2] = 0.09 * k;
    h[i] = ring * 0.4 + fine * 0.3; r[i] = 0.45 + fine * 0.2;
  }
  return pbr(toCanvas(rgb, W, H), normalFrom(h, W, H, 2), grayCanvas(r, W, H));
});

/* ------------------------------------------------------------ cửa bức bàn chạm khắc */
// Vách gỗ sơn son: các ô cửa chia khung, ô trên chạm song tiện, ô giữa chạm hoa lá, ô dưới chạm hồi văn
export const carvedDoor = () => once('door', () => {
  const W = 512, H = 512, c = canvas(W, H), g = c.getContext('2d')!, hc = canvas(W, H), hg = hc.getContext('2d')!;
  const grad = g.createLinearGradient(0, 0, 0, H); grad.addColorStop(0, '#5a1a0e'); grad.addColorStop(1, '#3e1208');
  g.fillStyle = grad; g.fillRect(0, 0, W, H); hg.fillStyle = '#404040'; hg.fillRect(0, 0, W, H);
  const both = (f: (x: CanvasRenderingContext2D, light: boolean) => void) => { f(g, false); f(hg, true); };
  const cw = W / 2;
  for (let p = 0; p < 2; p++){
    const x0 = p * cw;
    both((x, L) => { x.strokeStyle = L ? '#c0c0c0' : '#7a2a14'; x.lineWidth = 10; x.strokeRect(x0 + 8, 8, cw - 16, H - 16); });
    // song tiện ô trên
    for (let k = 0; k < 9; k++) both((x, L) => { x.fillStyle = L ? '#d0d0d0' : '#7c3318'; x.fillRect(x0 + 24 + k * (cw - 48) / 8.6, 24, 7, H * 0.3); });
    both((x, L) => { x.fillStyle = L ? '#202020' : '#1c0804'; x.fillRect(x0 + 22, H * 0.34, cw - 44, 6); });
    // ô giữa: cành hoa sen và lá cuộn chạm nổi
    both((x, L) => {
      x.strokeStyle = L ? '#e0e0e0' : '#a8562a'; x.fillStyle = L ? '#d8d8d8' : '#9a4a22'; x.lineWidth = 5; x.lineCap = 'round';
      const cx = x0 + cw / 2, cy = H * 0.55;
      x.beginPath(); x.moveTo(cx, cy + 60); x.bezierCurveTo(cx - 40, cy + 20, cx + 40, cy - 10, cx, cy - 50); x.stroke();
      for (const s of [-1, 1]){ x.beginPath(); x.ellipse(cx + s * 38, cy + 10, 30, 12, s * 0.6, 0, Math.PI * 2); x.fill(); }
      for (let i = 0; i < 5; i++){ const a = -Math.PI / 2 + (i - 2) * 0.45; x.beginPath(); x.ellipse(cx + Math.cos(a) * 18, cy - 50 + Math.sin(a) * 18, 9, 22, a + Math.PI / 2, 0, Math.PI * 2); x.fill(); }
    });
    // ô dưới: hồi văn chữ T
    both((x, L) => { x.strokeStyle = L ? '#c8c8c8' : '#7c3318'; x.lineWidth = 5; for (let k = 0; k < 4; k++){ const y = H * 0.76 + k * 22; x.beginPath(); x.moveTo(x0 + 26, y); for (let j = 0; j < 6; j++){ const xx = x0 + 26 + j * (cw - 52) / 6; x.lineTo(xx, y); x.lineTo(xx, y + 12); x.lineTo(xx + 18, y + 12); x.lineTo(xx + 18, y); } x.stroke(); } });
  }
  const hd = hg.getImageData(0, 0, W, H).data, hf = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) hf[i] = hd[i * 4] / 255;
  const t = pbr(c, normalFrom(hf, W, H, 8));
  t.map.wrapS = t.map.wrapT = THREE.ClampToEdgeWrapping;
  return t;
});

/* ------------------------------------------------------------ vỏ cây */
// vỏ đa xám nâu thớ dọc sần sùi; vỏ cau vòng đốt; thân chuối xanh sọc nâu
export const bark = (kind: 'banyan' | 'areca' | 'banana' = 'banyan') => once('bark' + kind, () => {
  const W = 256, H = 512, noise = valueNoise(kind === 'banyan' ? 51 : kind === 'areca' ? 52 : 53), rgb = new Float32Array(W * H * 3), h = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
    const u = x / W, v = y / H, i = y * W + x;
    if (kind === 'banyan'){
      const fib = noise(u * 1, v * 0.15, 32, 4), n = noise(u, v, 8, 4);
      const k = 0.45 + fib * 0.45 + n * 0.2;
      rgb[i * 3] = 0.42 * k; rgb[i * 3 + 1] = 0.38 * k; rgb[i * 3 + 2] = 0.32 * k; h[i] = fib * 0.8 + n * 0.2;
    } else if (kind === 'areca'){
      const ring = Math.pow(Math.abs(Math.sin(v * Math.PI * 14)), 12), n = noise(u, v, 16, 3);
      const k = 0.7 + n * 0.25 - ring * 0.35;
      rgb[i * 3] = 0.56 * k; rgb[i * 3 + 1] = 0.53 * k; rgb[i * 3 + 2] = 0.45 * k; h[i] = 0.6 - ring * 0.5 + n * 0.1;
    } else {
      const st = noise(u * 2, v * 0.1, 16, 3), n = noise(u, v, 8, 3);
      const k = 0.65 + n * 0.3, brown = Math.max(0, st - 0.55) * 2;
      rgb[i * 3] = (0.36 + brown * 0.2) * k; rgb[i * 3 + 1] = (0.5 - brown * 0.15) * k; rgb[i * 3 + 2] = (0.22 - brown * 0.05) * k; h[i] = st * 0.5;
    }
  }
  return pbr(toCanvas(rgb, W, H), normalFrom(h, W, H, 5));
});

/* ------------------------------------------------------------ thẻ lá (có độ trong) */
// Một chùm lá vẽ trên nền trong suốt, dán lên tấm phẳng; nhiều tấm chồng nhau thành tán cây
type LeafKind = 'banyan' | 'bamboo' | 'longan' | 'bush' | 'bougain' | 'grass' | 'frond' | 'banana';
export const leafCard = (kind: LeafKind) => once('leaf' + kind, () => {
  const W = kind === 'banana' ? 256 : 512, H = kind === 'banana' ? 1024 : 512;
  const c = canvas(W, H), g = c.getContext('2d')!, rnd = seeded(kind.length * 31 + 7);
  const green = (l = 0) => { const hue = 85 + rnd() * 35, s = 45 + rnd() * 25, li = 18 + rnd() * 22 + l; return `hsl(${hue},${s}%,${li}%)`; };
  const leaf = (x: number, y: number, len: number, wid: number, a: number, col: string, rib = true) => {
    g.save(); g.translate(x, y); g.rotate(a);
    const gr = g.createLinearGradient(0, -wid, 0, wid); gr.addColorStop(0, col); gr.addColorStop(0.5, col); gr.addColorStop(1, 'rgba(0,0,0,0.35)');
    g.fillStyle = col; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(len * 0.45, -wid, len, 0); g.quadraticCurveTo(len * 0.45, wid, 0, 0); g.fill();
    g.fillStyle = 'rgba(0,0,0,0.18)'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(len * 0.45, wid, len, 0); g.quadraticCurveTo(len * 0.45, wid * 0.2, 0, 0); g.fill();
    if (rib){ g.strokeStyle = 'rgba(220,240,180,0.35)'; g.lineWidth = Math.max(1, wid * 0.08); g.beginPath(); g.moveTo(0, 0); g.lineTo(len * 0.95, 0); g.stroke(); }
    g.restore();
  };
  if (kind === 'banyan' || kind === 'longan' || kind === 'bush' || kind === 'bougain'){
    // cành con mảnh rồi lá bầu dục dày (đa: to, bóng; nhãn: nhỏ thuôn; bụi: nhỏ, dày)
    const n = kind === 'bush' ? 260 : kind === 'bougain' ? 160 : 150, L = kind === 'banyan' ? 46 : kind === 'longan' ? 36 : 24;
    g.strokeStyle = '#4a3a24'; g.lineWidth = 3;
    for (let b = 0; b < 6; b++){ g.beginPath(); g.moveTo(W / 2, H); g.quadraticCurveTo(W * (0.2 + rnd() * 0.6), H * 0.6, W * (0.1 + rnd() * 0.8), H * (0.1 + rnd() * 0.3)); g.stroke(); }
    for (let i = 0; i < n; i++){
      const r = Math.sqrt(rnd()) * W * 0.46, a = rnd() * Math.PI * 2, x = W / 2 + Math.cos(a) * r, y = H * 0.48 + Math.sin(a) * r * 0.9;
      leaf(x, y, L * (0.7 + rnd() * 0.6), L * (kind === 'longan' ? 0.22 : 0.32), rnd() * Math.PI * 2, green(r / W * 18));
    }
    if (kind === 'bougain') for (let i = 0; i < 120; i++){                 // hoa giấy hồng sen thành chùm
      const r = Math.sqrt(rnd()) * W * 0.42, a = rnd() * Math.PI * 2, x = W / 2 + Math.cos(a) * r, y = H * 0.48 + Math.sin(a) * r * 0.9;
      for (let k = 0; k < 3; k++){ g.fillStyle = `hsl(${318 + rnd() * 20},${70 + rnd() * 20}%,${48 + rnd() * 16}%)`; g.beginPath(); g.ellipse(x + (rnd() - 0.5) * 14, y + (rnd() - 0.5) * 14, 9, 7, rnd() * 3, 0, Math.PI * 2); g.fill(); }
    }
  } else if (kind === 'bamboo'){
    // nhánh tre mảnh, lá thuôn dài rủ xuống
    for (let b = 0; b < 7; b++){
      const x0 = W * (0.15 + rnd() * 0.7), y0 = H * (0.05 + rnd() * 0.3);
      g.strokeStyle = '#6a7a3a'; g.lineWidth = 2; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + (rnd() - 0.5) * 120, y0 + 240); g.stroke();
      for (let i = 0; i < 16; i++){ const t = i / 16; leaf(x0 + (rnd() - 0.5) * 60 * t, y0 + t * 240, 70 + rnd() * 40, 7 + rnd() * 3, Math.PI / 2 + (rnd() - 0.5) * 1.6, green(4), false); }
    }
  } else if (kind === 'grass'){
    for (let i = 0; i < 90; i++){
      const x = rnd() * W, hgt = H * (0.4 + rnd() * 0.55), bend = (rnd() - 0.5) * 80;
      g.strokeStyle = green(rnd() * 10); g.lineWidth = 3 + rnd() * 4; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, H); g.quadraticCurveTo(x + bend * 0.3, H - hgt * 0.6, x + bend, H - hgt); g.stroke();
    }
    for (let i = 0; i < 10; i++){ g.fillStyle = ['#ffffff', '#ffe060', '#f0a0d0'][i % 3]; g.beginPath(); g.arc(rnd() * W, H * (0.3 + rnd() * 0.4), 5, 0, Math.PI * 2); g.fill(); }   // hoa dại
  } else if (kind === 'frond'){
    // tàu lá cau: cuống giữa cong, lá chét hai bên
    g.strokeStyle = '#6a7a3a'; g.lineWidth = 6; g.beginPath(); g.moveTo(0, H / 2); g.quadraticCurveTo(W / 2, H * 0.38, W, H * 0.55); g.stroke();
    for (let i = 0; i < 46; i++){ const t = i / 46, x = t * W, y = H / 2 - Math.sin(t * Math.PI) * H * 0.1 + t * H * 0.05; for (const s of [-1, 1]) leaf(x, y, 150 * (1 - t * 0.6), 9, s * (Math.PI / 2 - 0.5) + 0.3, green(6), false); }
  } else {
    // lá chuối to: gân giữa, vết rách dọc theo gân phụ
    const col = '#4f8a2e';
    g.fillStyle = col; g.beginPath(); g.moveTo(W / 2, 0); g.bezierCurveTo(W * 1.05, H * 0.2, W * 1.05, H * 0.8, W / 2, H); g.bezierCurveTo(-W * 0.05, H * 0.8, -W * 0.05, H * 0.2, W / 2, 0); g.fill();
    for (let y = 8; y < H; y += 6){ g.strokeStyle = `rgba(30,60,10,${0.15 + rnd() * 0.15})`; g.lineWidth = 1.5; g.beginPath(); g.moveTo(W / 2, y); g.lineTo(0, y - 40); g.moveTo(W / 2, y); g.lineTo(W, y - 40); g.stroke(); }
    g.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < 14; i++){ const y = rnd() * H, s = rnd() < 0.5 ? -1 : 1; g.lineWidth = 3; g.beginPath(); g.moveTo(W / 2 + s * W * (0.15 + rnd() * 0.2), y); g.lineTo(W / 2 + s * W * 0.55, y - 46); g.stroke(); }
    g.globalCompositeOperation = 'source-over';
    g.strokeStyle = '#9ab85a'; g.lineWidth = 8; g.beginPath(); g.moveTo(W / 2, 0); g.lineTo(W / 2, H); g.stroke();
    g.fillStyle = 'rgba(160,120,40,0.5)'; for (let i = 0; i < 6; i++){ g.beginPath(); g.arc(W * (0.1 + rnd() * 0.8), H * rnd(), 6 + rnd() * 10, 0, Math.PI * 2); g.fill(); }   // vết úa
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
});

/* ------------------------------------------------------------ thảm nhung đỏ */
// Nhung đỏ thẫm, viền vàng hoa văn hồi văn hai mép, thớ vải mịn
export const carpet = () => once('carpet', () => {
  const W = 256, H = 1024, noise = valueNoise(61), rgb = new Float32Array(W * H * 3), h = new Float32Array(W * H);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++){
    const u = x / W, v = y / H, i = y * W + x, n = noise(u, v, 32, 3), edge = Math.min(u, 1 - u);
    let r = 0.5, g = 0.04, b = 0.05, hh = 0.5 + n * 0.1;
    if (edge < 0.07){
      // viền vàng: hai chỉ và hồi văn ở giữa
      const e = edge / 0.07, meander = ((Math.floor(v * 80) + Math.floor(e * 4)) % 2) === 0;
      const gold = e < 0.15 || e > 0.85 || (e > 0.35 && e < 0.65 && meander);
      if (gold){ r = 0.85; g = 0.6; b = 0.2; hh = 0.8; } else { r = 0.42; g = 0.03; b = 0.04; }
    }
    const k = 0.85 + n * 0.3;
    rgb[i * 3] = r * k; rgb[i * 3 + 1] = g * k; rgb[i * 3 + 2] = b * k; h[i] = hh;
  }
  return pbr(toCanvas(rgb, W, H), normalFrom(h, W, H, 3));
});

/* ------------------------------------------------------------ bảng chữ: hoành phi, câu đối */
// Nền sơn then đen hoặc son đỏ, viền vàng chạm, chữ thếp vàng
export function plaque(text: string, w: number, h: number, vertical: boolean, red = false){
  const c = canvas(w, h), g = c.getContext('2d')!;
  const bg = g.createLinearGradient(0, 0, w, h); bg.addColorStop(0, red ? '#8a1010' : '#1a0c08'); bg.addColorStop(1, red ? '#5a0808' : '#2a140a');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.strokeStyle = '#e0b24a'; g.lineWidth = Math.min(w, h) * 0.05; g.strokeRect(g.lineWidth, g.lineWidth, w - g.lineWidth * 2, h - g.lineWidth * 2);
  g.lineWidth = Math.min(w, h) * 0.015; g.strokeRect(Math.min(w, h) * 0.11, Math.min(w, h) * 0.11, w - Math.min(w, h) * 0.22, h - Math.min(w, h) * 0.22);
  const gold = g.createLinearGradient(0, 0, 0, h); gold.addColorStop(0, '#fff0b0'); gold.addColorStop(0.5, '#e8b440'); gold.addColorStop(1, '#b07a20');
  g.fillStyle = gold; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = 'rgba(0,0,0,0.6)'; g.shadowBlur = 6; g.shadowOffsetY = 3;
  if (vertical){
    const words = text.split(' '), fs = Math.min(w * 0.5, h / (words.length + 0.6) * 0.82);
    g.font = `700 ${fs}px "Noto Serif", Georgia, serif`;
    words.forEach((wd, i) => g.fillText(wd, w / 2, h * (i + 0.8) / (words.length + 0.6)));
  } else {
    const fs = Math.min(h * 0.55, w / text.length * 1.6);
    g.font = `700 ${fs}px "Noto Serif", Georgia, serif`; g.fillText(text, w / 2, h / 2);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

/* ------------------------------------------------------------ mây */
export const cloudSprite = () => once('cloud', () => {
  const W = 256, noise = valueNoise(71), c = canvas(W, W / 2), g = c.getContext('2d')!, img = g.createImageData(W, W / 2), d = img.data;
  for (let y = 0; y < W / 2; y++) for (let x = 0; x < W; x++){
    const u = x / W, v = y / (W / 2), r = Math.hypot((u - 0.5) * 2, (v - 0.55) * 2.2), n = noise(u, v * 0.5, 4, 5);
    const a = Math.max(0, Math.min(1, (n * 1.4 - r * 0.9) * 2.2)), i = (y * W + x) * 4;
    const shade = 0.82 + (1 - v) * 0.18; d[i] = d[i + 1] = d[i + 2] = 255 * shade; d[i + 3] = a * 255;
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
});

// Vầng sáng tròn mềm cho bóng đèn, đèn lồng, tia nắng
export const glowSprite = () => once('glow', () => {
  const c = canvas(128), g = c.getContext('2d')!, gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.25, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
});
// Tia nắng: dải sáng mờ dần hai đầu, dùng cho tấm phẳng cộng sáng
export const shaftTexture = () => once('shaft', () => {
  const c = canvas(64, 256), g = c.getContext('2d')!, gr = g.createLinearGradient(0, 0, 64, 0);
  gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 256);
  g.globalCompositeOperation = 'destination-in'; const v = g.createLinearGradient(0, 0, 0, 256); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(0.25, 'rgba(0,0,0,1)'); v.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = v; g.fillRect(0, 0, 64, 256);
  return new THREE.CanvasTexture(c);
});
