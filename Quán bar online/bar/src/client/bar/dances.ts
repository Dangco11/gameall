import { DANCES } from '../../shared/dances.ts';
import type { DanceDef, Face, Groove, HandShape } from '../../shared/dances.ts';
import type { ArmPose, BodyPose, FacePose, FootPose, ProceduralDance } from '../rig/dancerig.ts';

// Biên đạo 100 điệu nhảy: mỗi điệu ghép từ một kiểu bước chân, một kiểu tay (nhiều kiểu là cả chuỗi động tác theo phách),
// nhún hông, thân, đầu, nét mặt riêng. Toàn bộ là hàm thuần theo phách nhạc (không DOM): dancerig.ts nướng thành AnimationClip.
// Bàn chân đặt theo mốc tiếp đất: đứng yên khi đang đỡ người, bay theo đường cong khi bước, trượt thật chỉ ở điệu có trượt
// (running man, toosie slide, twist). Trọng tâm tự dồn về chân trụ, hông hạ khi tiếp đất, đầu giữ thăng bằng, tay trễ nhịp nhẹ.

const TAU = Math.PI * 2;
const frac = (x: number) => x - Math.floor(x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (t: number) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const sinb = (b: number, period: number, ph = 0) => Math.sin(TAU * (b / period + ph));
const cosb = (b: number, period: number, ph = 0) => Math.cos(TAU * (b / period + ph));
// nhấn ngay phách rồi tắt dần (có lực), lặp đúng chu kỳ
// lực vào nhanh trong 0,15 phách (không bật tức thời gây giật khớp), đỉnh rơi đúng phách, rồi tắt dần
const ATT = 0.21;
const hit = (b: number, period = 1, sharp = 4.5) => { const f = frac(b / period + ATT / period); const k = f * period; return ease(k / ATT) * Math.exp(-Math.max(0, f - ATT / period) * sharp); };
// bướu mềm quanh một thời điểm trong chu kỳ
const sq = (b: number, period: number, sharp = 3, ph = 0) => 0.5 + 0.5 * Math.max(-1, Math.min(1, Math.sin(TAU * (b / period + ph)) * sharp));
const bump = (b: number, at: number, w: number, period: number) => { let d = frac((b - at) / period + 0.5) - 0.5; d *= period; return Math.exp(-(d * d) / (2 * w * w)); };

/* ------------------------------------------------------------ bàn chân */
interface FK { t: number; x: number; z: number; y?: number; yaw?: number; pitch?: number; slide?: boolean }
// chuỗi mốc của một bàn chân trong một chu kỳ; bước bay trong `swing` phách cuối mỗi quãng, nhấc cao `lift`
function footTrack(keys: FK[], period: number, swing = 0.45, lift = 0.07){
  const ks = keys.map(k => ({ ...k, t: ((k.t % period) + period) % period })).sort((a, b) => a.t - b.t);
  return (b: number): FootPose => {
    const t = frac(b / period) * period;
    let i = ks.length - 1;
    for (let k = 0; k < ks.length; k++) if (ks[k].t <= t) i = k;
    const k0 = ks[i], k1 = ks[(i + 1) % ks.length];
    const t1 = k1.t > k0.t ? k1.t : k1.t + period, tt = t >= k0.t ? t : t + period, gap = t1 - k0.t;
    const moved = Math.hypot(k1.x - k0.x, k1.z - k0.z) > 0.005 || (k1.y ?? 0) !== (k0.y ?? 0) || (k1.yaw ?? 0) !== (k0.yaw ?? 0) || (k1.pitch ?? 0) !== (k0.pitch ?? 0);
    let s = 0, arc = 0;
    if (moved){
      if (k1.slide){ s = ease((tt - k0.t) / gap); }
      else { const sw = Math.min(swing, gap); s = ease((tt - (t1 - sw)) / sw); const air = Math.hypot(k1.x - k0.x, k1.z - k0.z) > 0.02 || (k1.y ?? 0) > 0.01; arc = air ? 4 * s * (1 - s) * (lift + Math.hypot(k1.x - k0.x, k1.z - k0.z) * 0.12) : 0; }
    }
    return { x: lerp(k0.x, k1.x, s), z: lerp(k0.z, k1.z, s), y: lerp(k0.y ?? 0, k1.y ?? 0, s) + arc, yaw: lerp(k0.yaw ?? 0, k1.yaw ?? 0, s), pitch: lerp(k0.pitch ?? 0, k1.pitch ?? 0, s) + arc * 2.5 };
  };
}
interface FeetPat { L: (b: number) => FootPose; R: (b: number) => FootPose; yaw?: (b: number) => number; drop?: number }
const stance = (w: number) => [{ t: 0, x: w / 2, z: 0 }], stanceR = (w: number) => [{ t: 0, x: -w / 2, z: 0 }];
function feet(name: string, w: number, v: number): FeetPat {
  const h = w / 2, P = (k: FK[], per: number, sw?: number, li?: number) => footTrack(k, per, sw, li);
  switch (name){
    case 'planted': case 'bounce': return { L: P(stance(w), 1), R: P(stanceR(w), 1) };
    case 'sway': return { L: P(stance(w + 0.08), 1), R: P(stanceR(w + 0.08), 1) };
    case 'stepTouch': {
      const o = h + 0.14, near = 0.17;
      if (v === 2) return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0.12, pitch: 0.3 }, { t: 2, x: h, z: 0 }, { t: 3, x: h + 0.12, z: -0.05 }], 4), R: P([{ t: 0, x: -h, z: 0 }, { t: 1.5, x: -h, z: 0 }, { t: 2, x: -h - 0.12, z: -0.05 }, { t: 3, x: -h, z: 0.12, pitch: 0.3 }], 4) };
      return { L: P([{ t: 0, x: -o + near, z: 0, pitch: 0.35 }, { t: 0.99, x: -o + near, z: 0, pitch: 0.35 }, { t: 2, x: o, z: 0 }, { t: 3, x: o, z: 0 }], 4, 0.5), R: P([{ t: 0, x: -o, z: 0 }, { t: 2, x: -o, z: 0 }, { t: 3, x: o - near, z: 0, pitch: 0.35 }], 4, 0.5) };
    }
    case 'twoStep': return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h - 0.08, z: 0.03 }, { t: 1, x: h + 0.12, z: 0 }, { t: 1.5, x: h, z: 0 }], 2, 0.3), R: P([{ t: 0, x: -h - 0.12, z: 0 }, { t: 0.5, x: -h, z: 0 }, { t: 1, x: -h, z: 0 }, { t: 1.5, x: -h + 0.08, z: 0.03 }], 2, 0.3) };
    case 'runningMan': {
      // một chân nhấc gối rồi đạp xuống phía trước, chân kia trượt về sau (trượt thật theo điệu)
      const k = (off: number, x: number): FK[] => [{ t: off, x, z: -0.12 }, { t: off + 0.45, x, z: 0.02, y: 0.16 }, { t: off + 1, x, z: 0.12 }, { t: off + 1.95, x, z: -0.12, slide: true }];
      return { L: P(k(0, h), 2, 0.4, 0.04), R: P(k(1, -h), 2, 0.4, 0.04) };
    }
    case 'tStep': return { L: P([{ t: 0, x: h, z: 0, yaw: 0.5 }, { t: 0.5, x: h - 0.06, z: 0, yaw: -0.4, slide: true }, { t: 1, x: h, z: 0, yaw: 0.5, slide: true }, { t: 1.5, x: h - 0.06, z: 0, yaw: -0.4, slide: true }], 2), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: -h - 0.22, z: 0.05, y: 0.12 }, { t: 1, x: -h, z: 0 }, { t: 1.5, x: -h - 0.22, z: 0.05, y: 0.12 }], 2, 0.4) };
    case 'shuffleSide': return { L: P([{ t: 0, x: h, z: 0, yaw: -0.45 }, { t: 0.5, x: h + 0.08, z: 0, yaw: 0.45, slide: true }, { t: 1, x: h, z: 0, yaw: -0.45, slide: true }, { t: 1.5, x: h, z: 0.15, y: 0.1 }], 2, 0.35), R: P([{ t: 0, x: -h, z: 0, yaw: 0.45 }, { t: 0.5, x: -h, z: 0.15, y: 0.1 }, { t: 1, x: -h, z: 0, yaw: 0.45 }, { t: 1.5, x: -h - 0.08, z: 0, yaw: -0.45, slide: true }], 2, 0.35) };
    case 'charleston': return { L: P([{ t: 0, x: h, z: 0, yaw: 0.3 }, { t: 0.5, x: h, z: 0, yaw: -0.3, slide: true }, { t: 1, x: h, z: 0, yaw: 0.3, slide: true }, { t: 1.5, x: h, z: 0, yaw: -0.3, slide: true }], 2), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: -h + 0.04, z: 0.3, y: 0.14, pitch: 0.4 }, { t: 1, x: -h, z: 0 }, { t: 1.5, x: -h, z: -0.25, y: 0.12, pitch: -0.3 }], 2, 0.42) };
    case 'pogo': { const k = (x: number): FK[] => [{ t: 0, x, z: 0 }, { t: 0.5, x, z: 0, y: 0.11, pitch: 0.4 }, { t: 0.98, x, z: 0 }]; return { L: P(k(h), 1, 0.5, 0), R: P(k(-h), 1, 0.5, 0) }; }
    case 'kick': {
      if (v === 1) return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h, z: 0.34, y: 0.2, pitch: 0.5 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: h, z: -0.2, y: 0.12 }], 2, 0.4), R: P([{ t: 0, x: -h, z: 0, y: 0.05 }, { t: 0.5, x: -h, z: 0 }, { t: 1, x: -h, z: 0, y: 0.05 }, { t: 1.5, x: -h, z: 0 }], 2, 0.4, 0.02) };
      if (v === 2) return { L: P([{ t: 0, x: h, z: 0 }, { t: 1.25, x: h, z: 0 }, { t: 1.5, x: h - 0.02, z: 0.02 }, { t: 2, x: h, z: 0 }], 2, 0.25), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: -h, z: 0.32, y: 0.18, pitch: 0.5 }, { t: 1, x: -h + 0.02, z: -0.14, pitch: 0.4 }, { t: 1.6, x: -h, z: 0 }], 2, 0.3) };
      if (v === 3) return { L: P([{ t: 0, x: h, z: 0 }, { t: 1.5, x: h, z: 0 }, { t: 2, x: h + 0.3, z: 0.08, y: 0.15 }, { t: 3, x: h, z: 0 }], 4, 0.4), R: P([{ t: 0, x: -h - 0.3, z: 0.08, y: 0.15 }, { t: 1, x: -h, z: 0 }, { t: 3.5, x: -h, z: 0 }], 4, 0.4) };
      if (v === 4) return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0.05 }, { t: 2, x: h, z: 0 }, { t: 3, x: h + 0.25, z: 0.1, y: 0.14 }, { t: 3.9, x: h, z: 0 }], 4, 0.4), R: P([{ t: 0, x: -h, z: 0.05 }, { t: 1, x: -h, z: 0 }, { t: 2, x: -h, z: 0.05 }, { t: 3, x: -h, z: 0 }], 4, 0.4) };
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h, z: 0.36, y: 0.24, pitch: 0.6 }, { t: 1, x: h, z: 0 }, { t: 2, x: h, z: 0 }], 2, 0.42), R: P([{ t: 0, x: -h, z: 0 }, { t: 1, x: -h, z: 0 }, { t: 1.5, x: -h, z: 0.36, y: 0.24, pitch: 0.6 }, { t: 2, x: -h, z: 0 }], 2, 0.42) };
    }
    case 'heelToe': {
      if (v === 1) return { L: P([{ t: 0, x: h, z: 0, yaw: 0.4 }, { t: 0.5, x: h + 0.05, z: 0.04, yaw: -0.3, slide: true }, { t: 1, x: h, z: 0, yaw: 0.4, slide: true }, { t: 1.5, x: h, z: 0.18, pitch: -0.4 }], 2, 0.3), R: P([{ t: 0, x: -h, z: 0.18, pitch: -0.4 }, { t: 0.5, x: -h, z: 0, yaw: -0.4 }, { t: 1, x: -h - 0.05, z: 0.04, yaw: 0.3, slide: true }, { t: 1.5, x: -h, z: 0, yaw: -0.4, slide: true }], 2, 0.3) };
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: h + 0.02, z: 0.2, pitch: -0.45 }, { t: 2, x: h, z: 0 }], 2, 0.3), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: -h - 0.02, z: 0.2, pitch: -0.45 }, { t: 1, x: -h, z: 0 }], 2, 0.3) };
    }
    case 'crossStep': {
      const k = v === 1 ? 0.18 : 0.12;
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: -0.04, z: k }, { t: 2, x: h, z: 0 }], 2, 0.4), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: 0.04, z: k }, { t: 1, x: -h, z: 0 }], 2, 0.4) };
    }
    case 'indian': return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: -0.02, z: 0.3, y: 0.06, pitch: 0.3 }, { t: 2, x: h, z: 0 }], 2, 0.42), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: 0.02, z: 0.3, y: 0.06, pitch: 0.3 }, { t: 1, x: -h, z: 0 }], 2, 0.42) };
    case 'spin': {
      // xoay trọn vòng theo từng bước: hông quay liền, bàn chân xoay theo mốc bước (chân trụ không trượt)
      const per = v === 1 ? 2 : v === 2 ? 8 : 4;
      // chân trái bước ở phách chẵn, chân phải ở nửa phách; mỗi bước đặt chân vào đúng góc quay lúc đó
      const at = (side: number) => (b: number): FootPose => {
        const t = frac(b / per) * per, off = side ? 0.5 : 0, tPrev = Math.floor(t - off) + off, tNext = tPrev + 1, sw = 0.4;
        const s = ease((t - (tNext - sw)) / sw), a = lerp(TAU * tPrev / per, TAU * tNext / per, s), x = side ? -h : h;
        return { x: x * Math.cos(a), z: -x * Math.sin(a), y: 0.05 * 4 * s * (1 - s), yaw: a };
      };
      return { L: at(0), R: at(1), yaw: b => TAU * frac(b / per) };
    }
    case 'squat': {
      if (v === 1) return { L: P(stance(w), 1), R: P(stanceR(w), 1), drop: 0.26 };
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h + 0.06, z: 0.12 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: h, z: -0.1 }], 2, 0.25, 0.04), R: P([{ t: 0, x: -h, z: -0.1 }, { t: 0.5, x: -h, z: 0 }, { t: 1, x: -h - 0.06, z: 0.12 }, { t: 1.5, x: -h, z: 0 }], 2, 0.25, 0.04), drop: 0.3 };
    }
    case 'salsa': {
      if (v === 1) return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h + 0.2, z: 0 }, { t: 2, x: h + 0.2, z: 0, pitch: 0.3 }, { t: 3, x: h, z: 0 }, { t: 7, x: h, z: 0 }], 8, 0.4), R: P([{ t: 0, x: -h, z: 0 }, { t: 4, x: -h, z: 0 }, { t: 5, x: -h - 0.2, z: 0 }, { t: 6, x: -h - 0.2, z: 0, pitch: 0.3 }, { t: 7, x: -h, z: 0 }], 8, 0.4) };
      if (v === 2) return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h, z: -0.25 }, { t: 1, x: h, z: 0 }, { t: 2, x: h, z: 0 }], 2, 0.3), R: P([{ t: 0, x: -h, z: 0 }, { t: 1, x: -h, z: 0 }, { t: 1.5, x: -h, z: -0.25 }, { t: 2, x: -h, z: 0 }], 2, 0.3) };
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0.22 }, { t: 2, x: h, z: 0.22, pitch: 0.25 }, { t: 3, x: h, z: 0 }, { t: 7, x: h, z: 0 }], 8, 0.4), R: P([{ t: 0, x: -h, z: 0 }, { t: 4, x: -h, z: 0 }, { t: 5, x: -h, z: -0.22 }, { t: 6, x: -h, z: -0.22, pitch: 0.25 }, { t: 7, x: -h, z: 0 }], 8, 0.4) };
    }
    case 'samba': return { L: P([{ t: 0, x: h, z: 0.12 }, { t: 0.5, x: h, z: 0 }, { t: 0.75, x: h, z: 0.02, pitch: 0.3 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: h, z: 0.12 }], 2, 0.22, 0.04), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.25, x: -h, z: 0.02, pitch: 0.3 }, { t: 0.5, x: -h, z: 0 }, { t: 1, x: -h, z: 0.12 }, { t: 1.5, x: -h, z: 0 }], 2, 0.22, 0.04) };
    case 'grapevine': {
      // bước ngang 4 phách sang phải rồi 4 phách về trái (về đúng chỗ cũ nên lặp vòng không trôi)
      const s = v === 1 ? 0.25 : 0.32;
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: -h + 0.05 - s * 0, z: -0.1 }, { t: 2, x: h - s * 2, z: 0 }, { t: 3, x: h - s * 2, z: 0, pitch: 0.35 }, { t: 4, x: h - s * 1, z: 0 }, { t: 5, x: h - s * 1, z: 0 }, { t: 6, x: h, z: 0 }, { t: 7, x: h, z: 0 }], 8, 0.42), R: P([{ t: 0, x: -h - s, z: 0 }, { t: 1, x: -h - s, z: 0 }, { t: 2, x: -h - s * 2, z: 0 }, { t: 3, x: -h - s * 2, z: 0 }, { t: 4, x: -h - s * 2, z: 0 }, { t: 5, x: -h + 0.05 - s * 1, z: -0.1 }, { t: 6, x: -h, z: 0 }, { t: 7, x: -h, z: 0, pitch: 0.35 }], 8, 0.42) };
    }
    case 'glide': return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0 }, { t: 2, x: h - 0.22, z: 0, slide: true }, { t: 3, x: h + 0.1, z: 0 }, { t: 4, x: h, z: 0 }, { t: 5, x: h, z: -0.25 }, { t: 6, x: h, z: -0.25 }, { t: 7, x: h, z: 0 }], 8, 0.4), R: P([{ t: 0, x: -h - 0.18, z: 0 }, { t: 1, x: -h - 0.18, z: 0 }, { t: 2, x: -h, z: 0 }, { t: 4, x: -h + 0.18, z: 0, slide: true }, { t: 4.5, x: -h, z: -0.25 }, { t: 6, x: -h, z: -0.25 }, { t: 6.5, x: -h, z: 0 }, { t: 7.5, x: -h - 0.18, z: 0 }], 8, 0.4) };
    case 'stomp': return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.55, x: h, z: 0.06, y: 0.26 }, { t: 0.85, x: h, z: 0.04 }, { t: 2, x: h, z: 0.04 }], 2, 0.5, 0), R: P([{ t: 0, x: -h, z: 0.04 }, { t: 1, x: -h, z: 0.04 }, { t: 1.55, x: -h, z: 0.06, y: 0.26 }, { t: 1.85, x: -h, z: 0 }], 2, 0.5, 0) };
    case 'lunge': {
      if (v === 2) return { L: P([{ t: 0, x: h, z: 0.25 }], 1), R: P([{ t: 0, x: -h, z: -0.2 }], 1) };
      const d = v === 1 ? 0.3 : 0.38;
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: d }, { t: 2, x: h, z: 0 }, { t: 3, x: h, z: 0 }], 4, 0.5), R: P([{ t: 0, x: -h, z: 0 }, { t: 2, x: -h, z: 0 }, { t: 3, x: -h, z: d }, { t: 4, x: -h, z: 0 }], 4, 0.5) };
    }
    case 'hop': {
      if (v === 1) return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h, z: 0, y: 0.06 }, { t: 1, x: -0.03, z: 0.15 }, { t: 1.5, x: h, z: 0 }], 2, 0.4), R: P([{ t: 0, x: 0.03, z: 0.15 }, { t: 0.5, x: -h, z: 0 }, { t: 1, x: -h, z: 0 }, { t: 1.5, x: -h, z: 0, y: 0.06 }], 2, 0.4) };
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 0.5, x: h, z: 0, y: 0.05 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: h, z: 0.08, y: 0.22 }], 2, 0.45), R: P([{ t: 0, x: -h, z: 0.08, y: 0.22 }, { t: 0.5, x: -h, z: 0 }, { t: 1.5, x: -h, z: 0, y: 0.05 }], 2, 0.45) };
    }
    case 'twist': { const k = (x: number, s: number): FK[] => [{ t: 0, x, z: 0, yaw: 0.6 * s }, { t: 0.5, x, z: 0, yaw: -0.6 * s, slide: true }]; return { L: P(k(h, 1), 1), R: P(k(-h, 1), 1), yaw: b => 0.45 * cosb(b, 1) }; }
    case 'strut': return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h, z: 0 }, { t: 1.5, x: -0.02, z: 0.16 }, { t: 2, x: h, z: 0 }], 2, 0.45), R: P([{ t: 0, x: -h, z: 0 }, { t: 0.5, x: 0.02, z: 0.16 }, { t: 1, x: -h, z: 0 }], 2, 0.45) };
    case 'boxStep': {
      if (v === 1) return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: h + 0.2, z: 0 }, { t: 2, x: h, z: 0 }, { t: 3, x: h, z: 0.15, pitch: 0.3 }, { t: 4, x: h, z: 0 }], 8, 0.4), R: P([{ t: 0, x: -h, z: 0 }, { t: 4, x: -h, z: 0 }, { t: 5, x: -h - 0.2, z: 0 }, { t: 6, x: -h, z: 0 }, { t: 7, x: -h, z: 0.15, pitch: 0.3 }], 8, 0.4) };
      return { L: P([{ t: 0, x: h, z: 0 }, { t: 1, x: -0.02, z: 0.18 }, { t: 2, x: -0.02, z: 0.18 }, { t: 3, x: h, z: 0 }], 4, 0.42), R: P([{ t: 0, x: -h, z: 0 }, { t: 2, x: -h, z: -0.18 }, { t: 3, x: -h, z: -0.18 }, { t: 3.9, x: -h, z: 0 }], 4, 0.42) };
    }
    default: return { L: P(stance(w), 1), R: P(stanceR(w), 1) };
  }
}

/* ------------------------------------------------------------ tay */
const SHAPES: Record<HandShape, number[]> = {
  open: [0.15, 0.1, 0.1, 0.15, 0.2], relaxed: [0.4, 0.35, 0.45, 0.5, 0.6], fist: [1.1, 1.5, 1.55, 1.55, 1.5], point: [1.0, 0, 1.5, 1.5, 1.5],
  peace: [1.0, 0, 0, 1.5, 1.5], rock: [0.9, 0, 1.5, 1.5, 0], flat: [0.05, 0, 0, 0, 0],
};
type Pole = 'down' | 'out' | 'up' | 'back' | 'front';
const POLES: Record<Pole, { x: number; y: number; z: number }> = {
  down: { x: 0.35, y: -0.55, z: -0.5 }, out: { x: 1, y: -0.2, z: -0.4 }, up: { x: 0.4, y: 0.8, z: -0.3 }, back: { x: 0.2, y: -0.3, z: -1 }, front: { x: 0.3, y: -0.6, z: 0.4 },
};
// tư thế tay gọn: [ra ngoài, lên, tới, thế bàn tay?, hướng khuỷu?, gập cổ tay?]
type HP = [number, number, number, HandShape?, Pole?, number?];
const DOWN: HP = [0.05, -0.5, 0.06], HIP: HP = [0.1, -0.32, -0.02, 'flat', 'out', 0.5], CHEST: HP = [-0.06, -0.13, 0.25, 'fist', 'down'];
const UP: HP = [0.08, 0.5, 0.08, 'open', 'out'], UPV: HP = [0.26, 0.44, 0.06, 'open', 'out'], OUT: HP = [0.5, 0.02, 0.06, 'open', 'back'], FRONT: HP = [-0.06, 0.02, 0.5, 'fist', 'down'];
const FACE: HP = [-0.12, 0.22, 0.22, 'open', 'down'], HEAD: HP = [-0.06, 0.36, -0.02, 'flat', 'up'], NAPE: HP = [-0.08, 0.28, -0.12, 'flat', 'up'];
const toArm = (p: HP, def: HandShape): ArmPose => ({ x: p[0], y: p[1], z: p[2], curl: SHAPES[p[3] ?? def], pole: POLES[p[4] ?? 'down'], wrist: { x: p[5] ?? 0, y: 0, z: 0 } });
const mixP = (a: HP, b: HP, k: number): HP => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k), k < 0.5 ? a[3] : b[3], k < 0.5 ? a[4] : b[4], lerp(a[5] ?? 0, b[5] ?? 0, k)];
const blendArm = (a: ArmPose, b: ArmPose, k: number): ArmPose => ({ x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), z: lerp(a.z, b.z, k), pole: { x: lerp(a.pole!.x, b.pole!.x, k), y: lerp(a.pole!.y, b.pole!.y, k), z: lerp(a.pole!.z, b.pole!.z, k) }, wrist: { x: lerp(a.wrist!.x, b.wrist!.x, k), y: 0, z: 0 }, curl: a.curl!.map((c, i) => lerp(c, b.curl![i], k)) });
// chuỗi tư thế theo phách (biên đạo): [phách, tay trái, tay phải]; snap < 1 thì vào thế nhanh rồi giữ (kiểu popping)
type Seq = [number, HP, HP][];
function seqArms(keys: Seq, period: number, snap = 0.7){
  return (b: number, side: 0 | 1, hs: HandShape): ArmPose => {
    const t = frac(b / period) * period;
    let i = keys.length - 1; for (let k = 0; k < keys.length; k++) if (keys[k][0] <= t) i = k;
    const k0 = keys[i], k1 = keys[(i + 1) % keys.length], t1 = k1[0] > k0[0] ? k1[0] : k1[0] + period, gap = t1 - k0[0];
    const s = ease(((t >= k0[0] ? t : t + period) - k0[0]) / (gap * snap));
    return toArm(mixP(k0[1 + side] as HP, k1[1 + side] as HP, s), hs);
  };
}
type ArmFn = (b: number, side: 0 | 1, hs: HandShape, v: number) => ArmPose;
interface ArmPat { fn: ArmFn; body?: (b: number) => { chestPitch?: number; chestYaw?: number; headPitch?: number; headYaw?: number; headRoll?: number } }
// vị trí theo hệ thân (x sang trái) đổi sang hệ "ra ngoài" của từng tay
const bodyX = (X: number, side: 0 | 1) => (side === 0 ? X - 0.18 : -X - 0.18);

const ARMS: Record<string, (v: number) => ArmPat> = {
  pump: v => ({ fn: (b, s, hs) => {
    const w = v === 2 ? 1 : v === 1 ? (s === 1 ? sq(b + 0.5, 2) : 1 - sq(b + 0.5, 2)) : s === 1 ? 1 : 0;
    const rest: HP = [CHEST[0], CHEST[1] - 0.04 * hit(b), CHEST[2], 'fist', 'down'];
    return toArm(mixP(rest, mixP(rest, [0.08, 0.5, 0.14, 'fist', 'out'], hit(b, 1, 5)), w), hs);
  } }),
  handsUp: v => ({ fn: (b, s, hs) => {
    const sway = v === 2 ? sinb(b, 4) : sinb(b, 2), X = 0.12 * sway * (s === 0 ? 1 : -1);
    const lift = v === 1 ? 0.04 * sinb(b, 1) : 0.03 * hit(b);
    return toArm([0.1 + X + (v === 2 ? 0.06 * sinb(b, 2, s * 0.25) : 0), 0.46 + lift, 0.06, hs === 'fist' ? 'fist' : 'open', 'out', 0.3 * sinb(b, 1, s * 0.5)], hs);
  } }),
  clap: v => ({ fn: (b, s, hs) => {
    const hw = v === 1 ? 1 : v === 2 ? sq(b - 1, 4) : 0, k = hit(b, 1, 7);
    const apart = mixP([0.14, -0.1, 0.26, 'open', 'down'], [0.18, 0.42, 0.12, 'open', 'out'], hw);
    const shut = mixP([-0.17, -0.06, 0.3, 'flat', 'down', 0.2], [-0.16, 0.46, 0.16, 'flat', 'out', 0.2], hw);
    return toArm(mixP(apart, shut, k), hs);
  } }),
  point: v => ({ fn: (b, s, hs) => {
    if (v === 1){ const k = ease(frac(b / 2) * 2 > 1 ? 2 - frac(b / 2) * 2 : frac(b / 2) * 2), X = s === 0 ? k : 1 - k; return toArm([0.4 + 0.08 * X, -0.1 + 0.4 * X, 0.22, 'point', 'back'], hs); }
    if (v === 2) return s === 1 ? toArm([-0.02, 0.12, 0.5, 'point', 'down'], hs) : toArm(HIP, hs);
    if (v === 3){ const w = s === 1 ? sq(b + 0.5, 2) : 1 - sq(b + 0.5, 2), rest: HP = [0.02, -0.38, 0.1, 'relaxed']; return toArm(mixP(rest, mixP(rest, [0.02, 0.05, 0.5, 'point'], hit(b, 1, 5)), w), hs); }
    // điệu disco: chỉ chéo lên trời rồi chéo xuống đất, tay kia chống hông
    if (s === 0) return toArm(HIP, hs);
    const up = Math.floor(b) % 2 === 0, k = ease(frac(b) * 2.5);
    // phách chẵn: từ chéo dưới vút lên chéo trời; phách lẻ: từ trời chéo xuống đất (vòng khép kín, không giật)
    const low: HP = [-0.25, -0.38, 0.22, 'point'], high: HP = [0.3, 0.46, 0.15, 'point', 'out'];
    return toArm(mixP(up ? low : high, up ? high : low, k), hs);
  } }),
  wave: () => ({ fn: (b, s, hs) => { const X = 0.22 * sinb(b, 4); return toArm([bodyX((s === 0 ? 0.32 : -0.32) + X, s), 0.4 - 0.05 * Math.abs(X), 0.05, 'open', 'out', 0.25 * sinb(b, 4, 0.25)], hs); } }),
  punch: () => ({ fn: (b, s, hs) => { const on = (Math.floor(b) % 2 === 0) === (s === 1), k = hit(b, 1, 8); return toArm(on ? mixP(CHEST, FRONT, k) : CHEST, hs); } }),
  boxer: v => ({ fn: (b, s, hs) => {
    if (v === 1){ const k = sinb(b, 2, s * 0.5); return toArm([0.06, -0.42, 0.05 + 0.14 * k, 'relaxed', 'down'], hs); }
    if (v === 2){ const k = sinb(b, 2, s * 0.5); return toArm([0.02, -0.25 + 0.06 * k, 0.12 + 0.2 * k, 'fist', 'down'], hs); }
    if (v === 3) return toArm([-0.02, -0.28, 0.32, 'fist', 'down'], hs);
    return toArm([CHEST[0] + 0.02 * sinb(b, 2, s * 0.5), CHEST[1] - 0.04 * hit(b), CHEST[2], 'fist', 'down'], hs);
  } }),
  floss: () => ({ fn: (b, s, hs) => { const X = 0.26 * sinb(b, 1), Z = 0.2 * cosb(b, 2) * (s === 0 ? 1 : -1); return toArm([bodyX((s === 0 ? 0.22 : -0.22) + X, s), -0.42, Z, 'fist', 'out'], hs); } }),
  dab: () => ({
    fn: (b, s, hs) => { const on = sq(b - 0.25, 4, 2.5), right = sq(b - 1, 8, 4), ext: HP = [0.46, 0.24, 0.12, 'open', 'out'], bent: HP = [-0.34, 0.2, 0.2, 'fist', 'up']; const pose = mixP(bent, ext, s === 1 ? right : 1 - right); return toArm(mixP(CHEST, pose, on), hs); },
    body: b => { const on = sq(b - 0.25, 4, 2.5), right = sq(b - 1, 8, 4); return { headPitch: 0.35 * on, headYaw: (right - 0.5) * on }; },
  }),
  raiseRoof: v => ({ fn: (b, s, hs) => { const k = hit(b, v === 2 ? 0.5 : 1, 6); return toArm(mixP([0.12, 0.22, 0.1, 'flat', 'out', -1.2], [0.12, 0.46, 0.08, 'flat', 'out', -1.4], k), hs); } }),
  shimmy: v => ({ fn: (b, s, hs) => toArm(v === 1 ? [-0.02, 0.0, 0.18, 'open', 'out', 0.6] : [0.02, -0.18, 0.28, 'open', 'down', 0.4 * sinb(b, 0.5)], hs) }),
  dougie: () => ({ fn: (b, s, hs) => { const t = frac(b / 4) * 4; if (s === 1){ const k = ease(t / 2), back = ease((t - 2) / 2); return toArm(t < 2 ? mixP([-0.05, 0.2, 0.18, 'open'], HEAD, k) : mixP(HEAD, [-0.05, 0.2, 0.18, 'open'], back), hs); } return toArm([0.14 + 0.08 * sinb(b, 2), -0.38, 0.05, 'relaxed'], hs); } }),
  milly: () => ({ fn: (b, s, hs) => { const k = sinb(b, 2, s * 0.5); return toArm([bodyX(0.1 * k + (s === 0 ? 0.06 : -0.06), s), -0.15 + 0.08 * Math.abs(k), 0.28, 'fist', 'down'], hs); } }),
  woah: () => ({ fn: (b, s, hs) => { const k = hit(b, 2, 9); return toArm(mixP([0.0, -0.05, 0.25, 'fist', 'down'], [0.15, -0.4, 0.15, 'fist', 'out'], 1 - k), hs); }, body: b => ({ chestPitch: 0.12 * hit(b, 2, 9) }) }),
  shoot: () => ({ fn: (b, s, hs) => { const w = s === 1 ? 1 - sq(b + 0.5, 2) : sq(b + 0.5, 2), rest: HP = [0.06, -0.3, 0.1, 'fist', 'out']; return toArm(mixP(rest, mixP(rest, [-0.05, -0.32, 0.46, 'point'], hit(b, 1, 6)), w), hs); } }),
  chicken: v => ({ fn: (b, s, hs) => {
    if (v === 1){ const wing = sq(b - 2, 8, 4), beak = mixP([-0.12, -0.02, 0.32, 'flat'], [-0.1, -0.02, 0.36, 'fist'], hit(b, 0.5, 8)), k = sinb(b, 0.5); return toArm(mixP(beak, [0.0 + 0.12 * Math.max(0, k), -0.14, -0.05, 'fist', 'up'], wing), hs); }
    const k = sinb(b, 1); return toArm([0.0, -0.12 - 0.04 * k, -0.04, 'fist', k > 0 ? 'up' : 'out'], hs);
  } }),
  popping: v => {
    const sets: HP[][] = [[[0.3, 0.0, 0.2, 'flat', 'out'], [0.0, -0.1, 0.3, 'fist'], [0.45, 0.25, 0.1, 'flat', 'back'], [0.1, -0.4, 0.12, 'fist']],
      [[0.42, 0.02, 0.05, 'flat', 'back'], [0.12, 0.3, 0.12, 'flat', 'up'], [-0.05, -0.05, 0.42, 'flat'], [0.2, -0.3, -0.05, 'flat', 'out']],
      [[0.0, -0.1, 0.3, 'fist'], [0.3, 0.3, 0.2, 'fist', 'up'], [0.35, -0.2, 0.1, 'fist', 'out'], [-0.1, 0.15, 0.25, 'fist']]];
    const set = sets[v % sets.length];
    const seq: Seq = set.map((p, i) => [i, p, set[(i + 2) % set.length]]);
    return { fn: seqArms(seq, set.length, 0.25) };
  },
  locking: () => ({ fn: seqArms([[0, [0.32, 0.12, 0.28, 'point'], DOWN], [1, [0.1, -0.1, 0.2, 'fist'], [0.32, 0.12, 0.28, 'point']], [2, [0.4, 0.38, 0.12, 'point', 'out'], HIP], [3, HIP, [0.4, 0.38, 0.12, 'point', 'out']], [4, [0.0, 0.05, 0.3, 'open', 'down', 1.2], [0.0, 0.05, 0.3, 'open', 'down', 1.2]], [6, [0.15, -0.35, 0.18, 'point'], [0.15, -0.35, 0.18, 'point']]], 8, 0.35) }),
  stir: () => ({ fn: (b, s, hs) => { const a = TAU * b / 2; return toArm([bodyX(0.12 * Math.cos(a) + (s === 0 ? 0.08 : -0.08), s), -0.12, 0.3 + 0.1 * Math.sin(a), 'fist', 'out'], hs); } }),
  salsa: v => ({ fn: (b, s, hs) => {
    if (v === 1) return s === 0 ? toArm([0.25, 0.08, 0.26, 'relaxed', 'down'], hs) : toArm([-0.12, -0.1, 0.2, 'relaxed', 'out'], hs);
    if (v === 2){ const k = sinb(b, 1, s * 0.5); return toArm([0.25 + 0.08 * k, -0.1 + 0.12 * k, 0.15, 'open', 'out', 0.5], hs); }
    if (v === 3){ const k = cosb(b, 1) * (s === 0 ? 1 : -1); return toArm([0.04 + 0.04 * k, -0.24, 0.18 + 0.12 * k, 'fist', 'down'], hs); }
    const k = sinb(b, 2, s * 0.5); return toArm([0.12, -0.25 + 0.04 * k, 0.18 + 0.06 * k, 'relaxed', 'down', 0.3], hs);
  } }),
  flourish: v => ({ fn: (b, s, hs) => {
    const w = v === 1 ? 1 : s === 1 ? sq(b + 1, 8, 4) : 1 - sq(b + 1, 8, 4), a = TAU * b / 2;
    return toArm(mixP(v === 2 ? [0.4, -0.12, 0.12, 'open', 'back'] : HIP, [0.06 + 0.12 * Math.cos(a), 0.38 + 0.08 * Math.sin(a), 0.05, 'open', 'out', 0.5 * Math.sin(a)], w), hs);
  } }),
  victory: v => ({ fn: (b, s, hs) => { const k = hit(b, v === 1 ? 0.5 : 1, 5); return toArm(mixP([0.22, 0.3, 0.12, 'fist', 'out'], [0.3, 0.46, 0.04, 'fist', 'out'], k), hs); } }),
  royal: v => ({ fn: (b, s, hs) => (s === 1 || v === 1) && !(v === 1 && s === 0) ? toArm([0.06, 0.12, 0.2, 'flat', 'down', 0.6 * sinb(b, 1)], hs) : toArm(v === 1 ? [0.14, -0.4, 0.08, 'relaxed'] : HIP, hs) }),
  glowstick: v => ({ fn: (b, s, hs) => { const a = TAU * (b / (v === 1 ? 2 : 1) + s * 0.5); return toArm([0.1 + 0.15 * Math.cos(a), 0.08 + 0.18 * Math.sin(a), 0.32, 'fist', 'down'], hs); } }),
  shapes: v => ({ fn: (b, s, hs) => { const u = ease(0.5 - 0.5 * cosb(b, v === 1 ? 1 : 2)), X = (s === 0 ? 1 : -1); return toArm(mixP([bodyX(-0.12 * X, s), -0.35, 0.2, 'open'], [0.42, 0.28, 0.1, 'open', 'out'], s === 0 ? u : 1 - u), hs); } }),
  burn: v => ({ fn: (b, s, hs) => {
    const w = v === 1 ? (s === 1 ? sq(b + 1, 4) : 1 - sq(b + 1, 4)) : s === 1 ? 1 : 0, guard: HP = v === 3 ? [-0.02, -0.12, 0.28, 'fist'] : [0.0, -0.08, 0.22, 'fist'];
    const burn = mixP([0.05, -0.2, 0.15, 'fist'], [-0.02, -0.05, 0.5, 'open', 'down'], hit(b, v === 2 ? 1 : 2, 5)); return toArm(mixP(guard, burn, w), hs);
  } }),
  naenae: () => ({ fn: (b, s, hs) => s === 1 ? toArm([0.12 + 0.1 * sinb(b, 2), 0.46, 0.06, 'open', 'out', 0.4 * sinb(b, 2)], hs) : toArm([0.04, -0.4, 0.12, 'relaxed'], hs) }),
  hips: v => ({ fn: (b, s, hs) => {
    if (v === 1 && s === 1){ const t = frac(b / 4) * 4, low: HP = [0.06, -0.38, 0.08, 'relaxed']; return toArm(t < 2 ? mixP(FACE, NAPE, ease(t / 2)) : t < 3.2 ? mixP(NAPE, low, ease((t - 2) / 1.2)) : mixP(low, FACE, ease((t - 3.2) / 0.8)), hs); }
    if (v === 2){ const k = sinb(b, 2, s * 0.5); return toArm([0.08, -0.18 - 0.16 * (0.5 + 0.5 * k), 0.06, 'flat', 'out', 0.3], hs); }
    if (v === 3){ const k = sinb(b, 2, s * 0.5); return toArm([0.08, -0.45, 0.02 + 0.1 * k, 'relaxed'], hs); }
    return toArm(HIP, hs);
  } }),
  hair: v => ({ fn: (b, s, hs) => {
    if (s === 0 && v === 0) return toArm(HIP, hs);
    const t = frac(b / 4) * 4, k = ease(t / 3);
    return toArm(t < 3 ? mixP(FACE, NAPE, k) : mixP(NAPE, FACE, ease(t - 3)), hs);
  } }),
  roll: v => ({ fn: (b, s, hs) => {
    if (v === 1){ const ph = b / 2 + s * 0.25, X = sinb(ph, 1); return toArm([0.38, 0.12 + 0.14 * X, 0.08, 'open', 'back', -0.6 * X], hs); }
    if (v === 2){ const k = sinb(b, 2, s * 0.5); return toArm([0.1, -0.38, 0.06 + 0.14 * k, 'relaxed'], hs); }
    const a = TAU * (b / 2 + s * 0.25); return toArm([0.12 + 0.1 * Math.cos(a), 0.1 + 0.25 * Math.sin(a), 0.22, 'open', 'out', 0.4 * Math.cos(a)], hs);
  } }),
  heart: () => ({ fn: (b, s, hs) => { const t = frac(b / 2) * 2, k = ease(t < 1 ? t * 2 : 2 - t * 1.4); return toArm(mixP([0.35, 0.0, 0.15, 'open', 'out'], [-0.15, 0.02, 0.28, 'relaxed', 'down', 0.4], k), hs); } }),
  peace: () => ({ fn: (b, s, hs) => { const w = s === 1 ? sq(b + 0.5, 2) : 1 - sq(b + 0.5, 2), rest: HP = [0.06, -0.36, 0.08, 'relaxed']; return toArm(mixP(rest, mixP([0.0, 0.05, 0.2, 'peace'], [-0.08, 0.24, 0.2, 'peace'], hit(b, 1, 4)), w), hs); } }),
  money: () => ({ fn: (b, s, hs) => s === 0 ? toArm([-0.05, -0.12, 0.24, 'relaxed', 'down'], hs) : toArm(mixP([0.05, -0.05, 0.22, 'flat', 'down', 0.4], [0.15, 0.0, 0.42, 'flat', 'down', -0.6], hit(b, 0.5, 7)), hs) }),
  champagne: () => ({ fn: (b, s, hs) => {
    if (s === 0) return toArm(HIP, hs);
    const t = frac(b / 4) * 4, up: HP = [0.1 + 0.02 * sinb(b, 0.25), 0.44, 0.12, 'fist', 'out'], spray: HP = [0.0, 0.18, 0.45, 'fist'];
    return toArm(t < 3 ? up : t < 3.5 ? mixP(up, spray, ease((t - 3) * 2)) : mixP(spray, up, ease((t - 3.5) * 2)), hs);
  } }),
  renegade: () => ({ fn: seqArms([
    [0, [0.3, 0.0, 0.1, 'open', 'back'], [0.3, 0.0, 0.1, 'open', 'back']], [1, [0.1, -0.1, 0.25, 'flat'], [0.4, 0.15, 0.05, 'open', 'back']],
    [2, [-0.05, -0.12, 0.25, 'flat'], [-0.05, -0.12, 0.25, 'flat']], [3, HIP, [0.2, 0.4, 0.1, 'point', 'out']],
    [4, [-0.1, 0.0, 0.25, 'fist'], [0.45, 0.05, 0.1, 'open', 'back']], [5, [0.45, 0.05, 0.1, 'open', 'back'], [-0.1, 0.0, 0.25, 'fist']],
    [6, FACE, HIP], [7, [0.0, -0.3, 0.3, 'flat'], [0.0, -0.3, 0.3, 'flat']],
    [8, [0.25, 0.3, 0.15, 'open', 'out'], [0.25, 0.3, 0.15, 'open', 'out']], [9, [-0.15, 0.05, 0.3, 'flat'], [0.35, -0.1, 0.15, 'open']],
    [10, [0.35, -0.1, 0.15, 'open'], [-0.15, 0.05, 0.3, 'flat']], [11, HEAD, HIP], [12, [-0.3, 0.2, 0.2, 'fist', 'up'], [0.46, 0.24, 0.12, 'open', 'out']],
    [13, [0.05, -0.2, 0.3, 'fist'], [0.05, -0.2, 0.3, 'fist']], [14, [0.42, 0.3, 0.1, 'open', 'out'], [0.1, -0.4, 0.1, 'relaxed']], [15, HIP, HIP]], 16, 0.55) }),
  savage: () => ({ fn: seqArms([[0, HIP, HIP], [1, [0.12, -0.42, 0.1, 'flat'], [0.12, -0.42, 0.1, 'flat']], [2, [-0.25, 0.0, 0.22, 'flat', 'out'], [-0.25, 0.05, 0.25, 'flat', 'out']], [3, [0.0, 0.1, 0.4, 'point'], HIP], [4, NAPE, NAPE], [5, [0.2, 0.0, 0.2, 'open', 'out'], [0.2, 0.0, 0.2, 'open', 'out']], [6, HIP, [0.15, 0.3, 0.2, 'peace', 'out']], [7, [0.1, -0.35, 0.15, 'flat'], HIP]], 8, 0.6) }),
  saySo: () => ({ fn: seqArms([[0, [0.1, -0.35, 0.1, 'relaxed'], [0.2, 0.0, 0.3, 'point']], [2, [0.2, 0.0, 0.3, 'point'], [0.1, -0.35, 0.1, 'relaxed']], [4, [0.0, 0.1, 0.2, 'open', 'down', 0.5], [0.0, 0.1, 0.2, 'open', 'down', 0.5]], [5, FACE, HIP], [6, [0.3, -0.25, 0.15, 'open'], [0.3, -0.25, 0.15, 'open']]], 8, 0.7) }),
  toosie: () => ({ fn: seqArms([[0, [0.42, 0.0, 0.1, 'point', 'back'], [0.05, -0.3, 0.12, 'relaxed']], [2, [0.05, -0.3, 0.12, 'relaxed'], [0.42, 0.0, 0.1, 'point', 'back']], [4, [0.02, 0.0, 0.3, 'open', 'down', 0.8], [0.02, 0.0, 0.3, 'open', 'down', 0.8]], [5, [0.1, -0.3, 0.2, 'point'], [0.1, -0.3, 0.2, 'point']], [6, [0.02, 0.15, 0.3, 'point'], [0.02, 0.15, 0.3, 'point']]], 8, 0.6) }),
  jive: () => ({ fn: seqArms([[0, [0.05, -0.42, 0.18, 'flat'], [0.05, -0.42, 0.18, 'flat']], [1, [-0.16, -0.06, 0.3, 'flat'], [-0.16, -0.06, 0.3, 'flat']], [2, [-0.12, -0.18, 0.3, 'flat', 'down', 0.8], [-0.24, -0.15, 0.32, 'flat', 'down', 0.8]], [3, [-0.1, -0.1, 0.35, 'fist'], [-0.1, -0.06, 0.38, 'fist']]], 4, 0.5) }),
  macarena: () => ({ fn: seqArms([
    [0, DOWN, [0.0, 0.0, 0.5, 'flat', 'down', 0]], [1, [0.0, 0.0, 0.5, 'flat', 'down', 0], [0.0, 0.0, 0.5, 'flat', 'down', 0]], [2, [0.0, 0.0, 0.5, 'flat', 'down', 0], [0.0, 0.02, 0.5, 'open', 'down', -1.4]],
    [3, [0.0, 0.02, 0.5, 'open', 'down', -1.4], [0.0, 0.02, 0.5, 'open', 'down', -1.4]], [4, [0.0, 0.02, 0.5, 'open', 'down', -1.4], [-0.3, -0.02, 0.18, 'flat']], [5, [-0.3, -0.02, 0.18, 'flat'], [-0.3, -0.02, 0.18, 'flat']],
    [6, [-0.3, -0.02, 0.18, 'flat'], NAPE], [7, NAPE, NAPE], [8, NAPE, [-0.28, -0.35, 0.12, 'flat']], [9, [-0.28, -0.35, 0.12, 'flat'], [-0.28, -0.35, 0.12, 'flat']],
    [10, [-0.28, -0.35, 0.12, 'flat'], [0.08, -0.35, -0.12, 'flat', 'out']], [11, [0.08, -0.35, -0.12, 'flat', 'out'], [0.08, -0.35, -0.12, 'flat', 'out']], [12, [0.08, -0.35, -0.12, 'flat', 'out'], [0.08, -0.35, -0.12, 'flat', 'out']], [15, UP, UP]], 16, 0.55) }),
  ymca: () => ({ fn: seqArms([[0, UPV, UPV], [3.5, UPV, UPV], [4, [-0.02, 0.3, -0.02, 'flat', 'up'], [-0.02, 0.3, -0.02, 'flat', 'up']], [7.5, [-0.02, 0.3, -0.02, 'flat', 'up'], [-0.02, 0.3, -0.02, 'flat', 'up']], [8, [0.05, 0.4, 0.1, 'open', 'out'], [-0.05, 0.0, 0.25, 'open']], [11.5, [0.05, 0.4, 0.1, 'open', 'out'], [-0.05, 0.0, 0.25, 'open']], [12, [-0.12, 0.48, 0.1, 'flat', 'out'], [-0.12, 0.48, 0.1, 'flat', 'out']], [15.5, [-0.12, 0.48, 0.1, 'flat', 'out'], [-0.12, 0.48, 0.1, 'flat', 'out']]], 16, 0.25) }),
  sprinkler: () => ({ fn: (b, s, hs) => { if (s === 0) return toArm(NAPE, hs); const t = frac(b / 4) * 4, step = (Math.floor(t * 2) + ease(frac(t * 2) * 3)) / 8, k = t < 3 ? Math.min(1, step / 0.375) : 1 - ease(t - 3); return toArm([bodyX(-0.4 + 0.75 * Math.min(1, k), 1), 0.05, 0.3, 'flat', 'down'], hs); } }),
  lawnmower: () => ({ fn: (b, s, hs) => { if (s === 0) return toArm([0.05, -0.38, 0.22, 'fist'], hs); const t = frac(b / 2) * 2, k = t < 0.6 ? ease(t / 0.6) : 1 - ease((t - 0.6) / 1.4); return toArm(mixP([-0.2, -0.42, 0.3, 'fist'], [0.15, 0.1, -0.05, 'fist', 'out'], k), hs); } }),
  cart: () => ({ fn: seqArms([[0, [0.3, 0.1, 0.35, 'open', 'out'], [-0.05, -0.25, 0.35, 'fist']], [1, [-0.05, -0.25, 0.35, 'fist'], [-0.05, -0.25, 0.35, 'fist']], [2, [-0.05, -0.25, 0.35, 'fist'], [0.3, 0.1, 0.35, 'open', 'out']], [3, [-0.05, -0.25, 0.35, 'fist'], [-0.05, -0.25, 0.35, 'fist']]], 4, 0.6) }),
  micdrop: () => ({ fn: (b, s, hs) => { if (s === 0) return toArm(HIP, hs); const t = frac(b / 8) * 8, mic: HP = [-0.1, 0.12, 0.18, 'fist', 'down'], drop: HP = [0.3, -0.25, 0.25, 'open', 'out']; return toArm(t < 6 ? mic : t < 7 ? mixP(mic, drop, ease((t - 6) * 3)) : mixP(drop, mic, ease((t - 7) * 1.25)), hs); } }),
  boss: () => ({ fn: seqArms([[0, [-0.3, 0.02, 0.12, 'flat', 'up'], DOWN], [1, DOWN, DOWN], [2, DOWN, [-0.3, 0.02, 0.12, 'flat', 'up']], [3, DOWN, DOWN], [4, [-0.12, 0.1, 0.08, 'fist', 'out'], [-0.12, 0.1, 0.08, 'fist', 'out']], [6, [0.2, -0.3, 0.2, 'open'], [0.2, -0.3, 0.2, 'open']]], 8, 0.6) }),
  superstar: () => ({ fn: seqArms([[0, HIP, [0.25, 0.46, 0.12, 'point', 'out']], [2, HIP, [0.0, 0.05, 0.5, 'point']], [4, [-0.1, 0.25, 0.18, 'peace'], [-0.1, 0.25, 0.18, 'peace']], [6, OUT, OUT]], 8, 0.4) }),
  bow: () => ({
    fn: seqArms([[0, UPV, UPV], [2, [0.35, 0.1, 0.1, 'open', 'back'], [-0.2, -0.15, 0.25, 'flat']], [4, DOWN, [-0.2, -0.15, 0.25, 'flat']], [6, OUT, OUT], [8, UPV, UPV], [10, [-0.2, -0.15, 0.25, 'flat'], [0.35, 0.1, 0.1, 'open', 'back']], [12, [-0.2, -0.15, 0.25, 'flat'], DOWN], [14, OUT, OUT]], 16, 0.6),
    body: b => { const t = frac(b / 8) * 8; return { chestPitch: 0.45 * Math.max(0, Math.sin(Math.PI * clamp01((t - 2) / 3))), headPitch: 0.2 * Math.max(0, Math.sin(Math.PI * clamp01((t - 2) / 3))) }; },
  }),
  tango: () => ({ fn: (b, s, hs) => s === 0 ? toArm([0.32, 0.08, 0.22, 'relaxed', 'down'], hs) : toArm([-0.15, -0.05, 0.28, 'flat', 'out'], hs), body: b => ({ headYaw: 0.5 * (2 * sq(b - 0.5, 4, 2.5) - 1) }) }),
};

/* ------------------------------------------------------------ mặt */
const FACES: Record<Face, Omit<FacePose, 'blink' | 'lookX' | 'lookY'>> = {
  smile: { smile: 0.6, open: 0.05, brow: 0.1 }, grin: { smile: 1, open: 0.15, brow: 0.2 }, cool: { smile: 0.2, open: 0, brow: -0.15 },
  sexy: { smile: 0.35, open: 0.08, brow: 0.15 }, shout: { smile: 0.3, open: 0.55, brow: 0.5 }, focus: { smile: 0.05, open: 0.02, brow: -0.25 }, joy: { smile: 0.9, open: 0.3, brow: 0.35 },
};

/* ------------------------------------------------------------ ghép thành điệu nhảy */
export function makeDance(d: DanceDef): ProceduralDance {
  const r = d.r, g: Groove = r.g, sp = r.sp ?? 1, en = d.energy / 5;
  const ft = feet(r.f, r.fw ?? 0.24, r.fv ?? 0);
  const arms = (ARMS[r.a] ?? ARMS.boxer)(r.av ?? 0);
  const hs: HandShape = r.hs ?? 'relaxed', face = FACES[r.face];
  const beats = r.beats;
  // chớp mắt hai lần mỗi vòng, thời điểm riêng từng điệu
  const blinkAt = [((d.no * 0.37) % 1) * beats, ((d.no * 0.71 + 0.5) % 1) * beats];
  const raw = (beat: number): BodyPose => {
    {
      const b = beat, gb = b * sp;
      const L = ft.L(b), R = ft.R(b);
      // trọng tâm dồn về chân đang đỡ người (chân kia nhấc lên thì hông lệch sang chân trụ)
      const wl = 1 - clamp01(L.y / 0.05), wr = 1 - clamp01(R.y / 0.05), ws = Math.max(0.2, wl + wr);
      let rx = ((L.x * wl + R.x * wr) / ws) * 0.55, rz = ((L.z * wl + R.z * wr) / ws) * 0.55;
      const footYaw = ((L.yaw ?? 0) + (R.yaw ?? 0)) / 2;
      // nhún: xuống đúng phách (có lực, xuống nhanh lên chậm), bật nhảy theo chân, nhún đôi, nửa nhịp
      const bo = (g.bo ?? 0.02) * (0.7 + en * 0.6);
      let ry = 0;
      switch (g.bt ?? 0){
        case 1: ry = -bo * 0.5 * hit(gb, 1, 4) + Math.min(L.y, R.y) * 0.95; break;
        case 2: ry = -bo * Math.pow(0.5 + 0.5 * cosb(gb, 0.5), 1.4); break;
        case 3: ry = -bo * Math.pow(0.5 + 0.5 * cosb(gb, 2), 1.4); break;
        default: ry = -bo * Math.pow(0.5 + 0.5 * cosb(gb, 1), 1.6);
      }
      ry -= ft.drop ?? 0;
      ry -= 0.012 * (1 - Math.min(wl, wr));          // hạ hông chút khi đứng một chân
      ry += 0.004 * sinb(b, 4);                         // thở
      // hông: đưa ngang, lắc, xoay, lắc vòng; uốn sóng người
      rx += (g.sw ?? 0) * sinb(gb, 2);
      let pitch = 0, yaw = (ft.yaw ? ft.yaw(b) : footYaw * 0.6), roll = 0;
      roll += (g.hr ?? 0) * sinb(gb, 2, 0.05);
      yaw += (g.hy ?? 0) * sinb(gb, 2);
      if (g.wi){ rx += g.wi * cosb(gb, 2); rz += g.wi * sinb(gb, 2); roll += g.wi * 1.6 * cosb(gb, 2); pitch += g.wi * 1.4 * sinb(gb, 2); }
      // mềm người: hông đưa nhẹ hình số 8 theo hai phách, ngực đưa ngược chiều và trễ, đầu trễ hơn nữa (như người thật thả lỏng)
      const soft = 0.6 + en * 0.4;
      rx += 0.014 * soft * sinb(gb, 2, 0.08); rz += 0.006 * soft * sinb(gb, 1, 0.2);
      roll += 0.04 * soft * sinb(gb, 2, 0.08);
      const br = g.br ?? 0;
      pitch += br * sinb(gb, 2); rz += br * 0.35 * sinb(gb, 2, -0.1);
      // ngực: xoay ngược hông (giữ thân cân bằng), ưỡn ngực theo phách, nghiêng tới, sóng người đi lên trễ nhịp
      const body = arms.body?.(b) ?? {};
      const chest = {
        yaw: (g.tw ?? 0) * sinb(gb, 2, 0.12) - Math.sin(yaw) * 0.55 + (body.chestYaw ?? 0),
        pitch: -(g.cp ?? 0) * hit(gb, 1, 7) + (g.ln ?? 0) - br * 1.5 * sinb(gb, 2, -0.18) - pitch * 0.6 + (g.hb ?? 0) * 0.4 * sinb(gb, 1, -0.05) + (body.chestPitch ?? 0),
        roll: -roll * 0.7 - (g.sw ?? 0) * 1.5 * sinb(gb, 2, -0.08) - 0.05 * soft * sinb(gb, 2, -0.04),
      };
      chest.yaw += 0.05 * soft * sinb(gb, 4, 0.1); chest.pitch += 0.025 * soft * sinb(gb, 1, -0.1);
      rz -= (g.ln ?? 0) * 0.18;                         // nghiêng tới thì hông lùi lại cho khỏi ngã
      // đầu: gật theo phách, lắc mạnh, quay, nghiêng; luôn bù một phần xoay thân để mắt nhìn ổn định
      const head = {
        pitch: (g.hn ?? 0) * (hit(gb, 1, 5) - 0.35) + (g.hb ?? 0) * sinb(gb, 1, -0.12) + br * sinb(gb, 2, -0.32) - chest.pitch * 0.3 + (body.headPitch ?? 0),
        yaw: (g.ht ?? 0) * sinb(gb, 4) - chest.yaw * 0.45 - Math.sin(yaw) * 0.3 + (body.headYaw ?? 0),
        roll: (g.tl ?? 0) * sinb(gb, 2, 0.15) - chest.roll * 0.5 - roll * 0.4 + (body.headRoll ?? 0) + 0.045 * soft * sinb(gb, 2, -0.18),
      };
      // vai: lắc vai (shimmy) xen kẽ, nhún vai nhẹ theo phách
      const sk = g.sk ?? 0;
      const shrug: [number, number] = [sk * 2.2 * Math.max(0, sinb(gb, 0.5)) + 0.04 * hit(gb) * en, sk * 2.2 * Math.max(0, -sinb(gb, 0.5)) + 0.04 * hit(gb) * en];
      const fwd: [number, number] = [sk * 1.5 * sinb(gb, 0.5), -sk * 1.5 * sinb(gb, 0.5)];
      // tay trễ nhịp một chút sau thân (quán tính)
      const ab = (((b - 0.08) % beats) + beats) % beats;   // giữ trong vòng lặp (số âm % trong JS cho kết quả âm)
      const aL = arms.fn(ab, 0, hs, r.av ?? 0), aR = arms.fn(ab, 1, hs, r.av ?? 0);
      // mặt: nét riêng của điệu, hô to khi nhấn phách, chớp mắt
      const blink = Math.max(bump(b, blinkAt[0], 0.07, beats), bump(b, blinkAt[1], 0.07, beats));
      const shout = r.face === 'shout' ? 0.35 * hit(gb, 1, 5) : 0;
      return {
        root: { x: rx, y: ry, z: rz, yaw, pitch, roll }, chest, head, shrug, fwd,
        arm: [aL, aR], foot: [L, R],
        face: { smile: face.smile, open: Math.min(1, face.open + shout), brow: face.brow + 0.25 * shout, blink, lookX: 0.25 * sinb(b, beats, 0.3) * (r.face === 'cool' ? 1.5 : 1), lookY: 0 },
      };
    }
  };
  const wrap = (x: number) => ((x % beats) + beats) % beats, W = [1, 2, 3, 2, 1], SW = 9;
  const avg = (vals: number[]) => vals.reduce((s2, v, i) => s2 + v * W[i], 0) / SW;
  return {
    id: d.id, beats,
    sample(beat: number): BodyPose {
      const c = raw(wrap(beat));
      const ps = [-2, -1, 0, 1, 2].map(k => k === 0 ? c : raw(wrap(beat + k * 0.065)));
      const rs = [-2, -1, 0, 1, 2].map(k => k === 0 ? c : raw(wrap(beat + k * 0.1)));
      const arm = (side: 0 | 1): ArmPose => {
        const a = ps.map(p => p.arm[side]);
        return { x: avg(a.map(v => v.x)), y: avg(a.map(v => v.y)), z: avg(a.map(v => v.z)),
          pole: { x: avg(a.map(v => v.pole!.x)), y: avg(a.map(v => v.pole!.y)), z: avg(a.map(v => v.pole!.z)) },
          wrist: { x: avg(a.map(v => v.wrist!.x)), y: 0, z: 0 }, curl: a[2].curl!.map((_, i) => avg(a.map(v => v.curl![i]))) };
      };
      const rot = (g: (p: BodyPose) => { yaw: number; pitch: number; roll: number }) => ({ yaw: avg(ps.map(p => g(p).yaw)), pitch: avg(ps.map(p => g(p).pitch)), roll: avg(ps.map(p => g(p).roll)) });
      return {
        root: { x: avg(rs.map(p => p.root.x)), y: avg(ps.map(p => p.root.y)), z: avg(rs.map(p => p.root.z)), yaw: avg(ps.map(p => p.root.yaw)), pitch: avg(ps.map(p => p.root.pitch)), roll: avg(ps.map(p => p.root.roll)) },
        chest: rot(p => p.chest), head: rot(p => p.head),
        shrug: [avg(ps.map(p => p.shrug[0])), avg(ps.map(p => p.shrug[1]))], fwd: [avg(ps.map(p => p.fwd[0])), avg(ps.map(p => p.fwd[1]))],
        arm: [arm(0), arm(1)], foot: c.foot,
        face: { ...c.face, smile: avg(ps.map(p => p.face.smile)), open: avg(ps.map(p => p.face.open)), brow: avg(ps.map(p => p.face.brow)) },
      };
    },
  };
}

export const PROCEDURAL_DANCES: ProceduralDance[] = DANCES.map(makeDance);
export { blendArm };
// các kiểu bước chân, kiểu tay đã biên đạo (kiểm thử dùng để chắc mọi công thức đều trỏ tới kiểu có thật)
export const FEET_PATTERNS = ['planted', 'bounce', 'sway', 'stepTouch', 'twoStep', 'runningMan', 'tStep', 'shuffleSide', 'charleston', 'pogo', 'kick', 'heelToe', 'crossStep', 'indian', 'spin', 'squat', 'salsa', 'samba', 'grapevine', 'glide', 'stomp', 'lunge', 'hop', 'twist', 'strut', 'boxStep'];
export const ARM_PATTERNS = Object.keys(ARMS);
