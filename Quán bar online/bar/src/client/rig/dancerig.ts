import * as THREE from 'three';

// Nhảy dựng bằng khung xương (procedural skeletal animation), không cần DOM nên chạy được cả trong kiểm thử Node.
// Mỗi điệu nhảy là một hàm tư thế theo phách nhạc (BodyPose); ở đây "nướng" thành AnimationClip thật cho từng mẫu người:
//   - thân: dời hông, xoay chậu hông, 2 đốt sống ngực, cổ, đầu, hai xương đòn (nhún vai)
//   - tay, chân: IK hai đốt (vai–khuỷu–cổ tay, hông–gối–cổ chân) với hướng khuỷu, gối đúng giải phẫu; bàn chân ghim chặt
//     xuống sàn trong lúc đỡ người nên không trượt; cổ tay, bàn chân, ngón chân, từng đốt ngón tay (nắm, chỉ, chữ V…)
//   - mặt: cười, há miệng, nhướng mày, chớp mắt, liếc mắt (khung xương mặt của Rocketbox / 3ds Max Biped)
// Quy ước hệ thân (body frame): đơn vị mét của người cao 1,7 m (người khác tự co giãn), y lên, z ra trước,
// x sang TRÁI của nhân vật. Xoay: pitch dương = cúi tới, yaw dương = quay sang trái, roll dương = nghiêng sang phải.
// Góc xoay của mỗi khớp tính như khi khớp cha đang ở tư thế gốc (giống cách GlbFigure dựng tư thế bằng code).

export interface V3 { x: number; y: number; z: number }
// tay: điểm cổ tay so với vai, theo hệ ngực; x hướng RA NGOÀI (tay trái +x, tay phải −x tự đổi dấu)
export interface ArmPose { x: number; y: number; z: number; pole?: V3; wrist?: V3; curl?: number[] }
// chân: điểm chạm sàn của bàn chân, so với tâm giữa hai chân lúc đứng gốc; x theo hệ thân (trái +), y nhấc khỏi sàn
export interface FootPose { x: number; y: number; z: number; yaw?: number; pitch?: number }
export interface Rot { yaw: number; pitch: number; roll: number }
export interface FacePose { smile: number; open: number; brow: number; blink: number; lookX: number; lookY: number }
export interface BodyPose {
  root: V3 & Rot;                         // dời hông và xoay chậu hông
  chest: Rot; head: Rot;
  shrug: [number, number]; fwd: [number, number];   // nhún vai, đưa vai tới (trái, phải)
  arm: [ArmPose, ArmPose]; foot: [FootPose, FootPose];
  face: FacePose;
}
export interface ProceduralDance { id: string; beats: number; sample(beat: number): BodyPose }
export const DANCE_BPM = 120;            // clip dựng ở 120 BPM, phát nhanh chậm theo nhịp nhạc thật
export const SAMPLES_PER_BEAT = 12;          // 12 khung khoá mỗi phách: chuyển động tròn, không gãy khúc giữa các khung

/* ------------------------------------------------------------ nhận khung xương */
type Key = 'root' | 'pelvis' | 'spine' | 'spine1' | 'spine2' | 'neck' | 'head' | 'clavL' | 'clavR' | 'upL' | 'upR' | 'foreL' | 'foreR' | 'handL' | 'handR'
  | 'thighL' | 'thighR' | 'calfL' | 'calfR' | 'footL' | 'footR' | 'toeL' | 'toeR' | 'jaw' | 'eyeL' | 'eyeR'
  | 'cornerL' | 'cornerR' | 'cheekL' | 'cheekR' | 'browInL' | 'browInR' | 'browOutL' | 'browOutR' | 'browM' | 'lidTopL' | 'lidTopR' | 'lidBotL' | 'lidBotR';
const norm = (s: string) => s.toLowerCase().replace(/^mixamorig\d*/, '').replace(/[^a-z0-9]/g, '');
const NAMES: Record<Key, string[]> = {
  root: ['bip01', 'hips'], pelvis: ['bip01pelvis', 'hips'], spine: ['bip01spine', 'spine'], spine1: ['bip01spine1', 'spine1'], spine2: ['bip01spine2', 'spine2'],
  neck: ['bip01neck', 'neck'], head: ['bip01head', 'head'],
  clavL: ['bip01lclavicle', 'leftshoulder'], clavR: ['bip01rclavicle', 'rightshoulder'],
  upL: ['bip01lupperarm', 'leftarm'], upR: ['bip01rupperarm', 'rightarm'], foreL: ['bip01lforearm', 'leftforearm'], foreR: ['bip01rforearm', 'rightforearm'],
  handL: ['bip01lhand', 'lefthand'], handR: ['bip01rhand', 'righthand'],
  thighL: ['bip01lthigh', 'leftupleg'], thighR: ['bip01rthigh', 'rightupleg'], calfL: ['bip01lcalf', 'leftleg'], calfR: ['bip01rcalf', 'rightleg'],
  footL: ['bip01lfoot', 'leftfoot'], footR: ['bip01rfoot', 'rightfoot'], toeL: ['bip01ltoe0', 'lefttoebase'], toeR: ['bip01rtoe0', 'righttoebase'],
  jaw: ['bip01mjaw'], eyeL: ['bip01leye'], eyeR: ['bip01reye'],
  cornerL: ['bip01lmouthcorner'], cornerR: ['bip01rmouthcorner'], cheekL: ['bip01lcheek'], cheekR: ['bip01rcheek'],
  browInL: ['bip01linnereyebrow'], browInR: ['bip01rinnereyebrow'], browOutL: ['bip01loutereyebrow'], browOutR: ['bip01routereyebrow'], browM: ['bip01mmiddleeyebrow'],
  lidTopL: ['bip01leyeblinktop'], lidTopR: ['bip01reyeblinktop'], lidBotL: ['bip01leyeblinkbottom'], lidBotR: ['bip01reyeblinkbottom'],
};
// ngón tay: [cái, trỏ, giữa, áp út, út], mỗi ngón 3 đốt
const FINGERS = {
  L: [['bip01lfinger0', 'bip01lfinger01', 'bip01lfinger02'], ['bip01lfinger1', 'bip01lfinger11', 'bip01lfinger12'], ['bip01lfinger2', 'bip01lfinger21', 'bip01lfinger22'], ['bip01lfinger3', 'bip01lfinger31', 'bip01lfinger32'], ['bip01lfinger4', 'bip01lfinger41', 'bip01lfinger42']],
  R: [['bip01rfinger0', 'bip01rfinger01', 'bip01rfinger02'], ['bip01rfinger1', 'bip01rfinger11', 'bip01rfinger12'], ['bip01rfinger2', 'bip01rfinger21', 'bip01rfinger22'], ['bip01rfinger3', 'bip01rfinger31', 'bip01rfinger32'], ['bip01rfinger4', 'bip01rfinger41', 'bip01rfinger42']],
  mixL: ['thumb', 'index', 'middle', 'ring', 'pinky'].map(f => [1, 2, 3].map(i => `lefthand${f}${i}`)),
  mixR: ['thumb', 'index', 'middle', 'ring', 'pinky'].map(f => [1, 2, 3].map(i => `righthand${f}${i}`)),
};

interface RB { b: THREE.Object3D; par: number; parObj: THREE.Object3D; Wr: THREE.Quaternion; WrParInv: THREE.Quaternion; pB: THREE.Vector3; parInvMat: THREE.Matrix4; worldRest: THREE.Vector3; restLocalP: THREE.Vector3 }
interface Limb { a: number; b: number; c: number; L1: number; L2: number; u0: THREE.Vector3; f0: THREE.Vector3; h0: THREE.Vector3 }
export interface Rig {
  bones: RB[]; idx: Partial<Record<Key, number>>;
  fingers: [number[][], number[][]]; curlAxis: [THREE.Vector3[], THREE.Vector3[]];
  arm: [Limb, Limb] | null; leg: [Limb, Limb] | null; ankleH: number; ground: THREE.Vector3;
  F: THREE.Quaternion; Fi: THREE.Quaternion; u: number; samePelvis: boolean;
}

const _a = new THREE.Vector3(), _q = new THREE.Quaternion(), _q2 = new THREE.Quaternion(), _m = new THREE.Matrix4(), _m2 = new THREE.Matrix4(), _e = new THREE.Euler();

// scene: cảnh gốc của mẫu (tư thế gốc). flip: mẫu quay mặt về −z. heightUnits: chiều cao mẫu theo đơn vị của file. ground: điểm mặt sàn dưới tâm hông.
export function buildRig(scene: THREE.Object3D, flip: boolean, heightUnits: number, ground: THREE.Vector3): Rig | null {
  scene.updateMatrixWorld(true);
  // xương gốc (Bip01) của 3ds Max Biped không phải là khớp da nên là Object3D thường: tìm mọi nút, ưu tiên xương
  const byName = new Map<string, THREE.Object3D>();
  scene.traverse(o => { const k = norm(o.name); if (!k) return; const cur = byName.get(k); if (!cur || (!(cur as THREE.Bone).isBone && (o as THREE.Bone).isBone)) byName.set(k, o); });
  const find = (names: string[]) => { for (const n of names){ const b = byName.get(n); if (b) return b; } return undefined; };
  const need: Key[] = ['root', 'pelvis', 'spine', 'neck', 'head', 'upL', 'upR', 'foreL', 'foreR', 'handL', 'handR', 'thighL', 'thighR', 'calfL', 'calfR', 'footL', 'footR'];
  const found = new Map<Key, THREE.Object3D>();
  for (const k of Object.keys(NAMES) as Key[]){ const b = find(NAMES[k]); if (b) found.set(k, b); }
  if (need.some(k => !found.has(k))) return null;
  const F = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), flip ? Math.PI : 0), Fi = F.clone().invert();
  const u = heightUnits / 1.7;
  const fingerBones = (L: boolean) => {
    const bip = L ? FINGERS.L : FINGERS.R, mix = L ? FINGERS.mixL : FINGERS.mixR;
    return bip.map((ch, i) => { const a = ch.map(n => byName.get(n)), b2 = mix[i].map(n => byName.get(n)); return (a.every(Boolean) ? a : b2.every(Boolean) ? b2 : []) as THREE.Object3D[]; });
  };
  const fL = fingerBones(true), fR = fingerBones(false);
  // danh sách xương điều khiển, cha trước con (theo thứ tự duyệt cây)
  const set = new Set<THREE.Object3D>([...found.values(), ...fL.flat(), ...fR.flat()]);
  const order: THREE.Object3D[] = [];
  scene.traverse(o => { if (set.has(o)) order.push(o); });
  const index = new Map(order.map((b, i) => [b, i]));
  const toBody = (w: THREE.Vector3) => w.clone().sub(ground).applyQuaternion(Fi).divideScalar(u);
  const bones: RB[] = order.map(b => {
    let p: THREE.Object3D | null = b.parent; while (p && !set.has(p)) p = p.parent;
    const parObj = b.parent!;
    const worldRest = b.getWorldPosition(new THREE.Vector3());
    return { b, par: p ? index.get(p)! : -1, parObj, Wr: b.getWorldQuaternion(new THREE.Quaternion()), WrParInv: parObj.getWorldQuaternion(new THREE.Quaternion()).invert(),
      pB: toBody(worldRest), parInvMat: parObj.matrixWorld.clone().invert(), worldRest, restLocalP: b.position.clone() };
  });
  const idx: Partial<Record<Key, number>> = {};
  for (const [k, b] of found) idx[k] = index.get(b);
  const P = (k: Key) => bones[idx[k]!].pB;
  // chi hai đốt; trục gập (bản lề) lấy từ chính tư thế gốc nếu khớp đã hơi gập, không thì theo hướng mặc định (khuỷu ra sau, gối ra trước)
  const limb = (a: Key, b: Key, c: Key, n0: THREE.Vector3): Limb => {
    const A = P(a), B = P(b), C = P(c), L1 = A.distanceTo(B), L2 = B.distanceTo(C);
    const u0 = B.clone().sub(A).normalize(), f0 = C.clone().sub(B).normalize(), d0 = C.clone().sub(A).normalize();
    const cr = new THREE.Vector3().crossVectors(u0, f0);
    const h0 = cr.length() > 0.05 ? cr.normalize() : new THREE.Vector3().crossVectors(n0, d0).normalize();
    return { a: idx[a]!, b: idx[b]!, c: idx[c]!, L1, L2, u0, f0, h0 };
  };
  const back = new THREE.Vector3(0, 0, -1), front = new THREE.Vector3(0, 0, 1);
  // trục cuộn ngón tay: vuông góc hướng ngón và pháp tuyến lòng bàn tay (lòng bàn tay là phía có ngón cái)
  const curlAxes = (fing: THREE.Object3D[][], hand: Key) => {
    if (fing.some(c => !c.length)) return [];
    const H = P(hand), base = (i: number) => bones[index.get(fing[i][0])!].pB;
    const d = base(2).clone().sub(H).normalize(), s = base(4).clone().sub(base(1)).normalize();
    const n = new THREE.Vector3().crossVectors(d, s).normalize();
    if (n.dot(base(0).clone().sub(H)) < 0) n.negate();
    return fing.map((ch, i) => {
      const dir = (ch.length > 1 ? bones[index.get(ch[1])!].pB : base(i)).clone().sub(base(i)).normalize();
      const ax = new THREE.Vector3().crossVectors(i === 0 ? dir : d, n).normalize();
      return ax.lengthSq() > 0.5 ? ax : new THREE.Vector3().crossVectors(d, n).normalize();
    });
  };
  const rig: Rig = {
    bones, idx, fingers: [fL.map(c => c.map(b => index.get(b)!)), fR.map(c => c.map(b => index.get(b)!))], curlAxis: [curlAxes(fL, 'handL'), curlAxes(fR, 'handR')],
    arm: [limb('upL', 'foreL', 'handL', back), limb('upR', 'foreR', 'handR', back)], leg: [limb('thighL', 'calfL', 'footL', front), limb('thighR', 'calfR', 'footR', front)],
    ankleH: (P('footL').y + P('footR').y) / 2, ground: ground.clone(), F, Fi, u, samePelvis: found.get('root') === found.get('pelvis'),
  };
  return rig;
}

/* ------------------------------------------------------------ IK, xoay theo hai trục */
// xoay đưa cặp hướng (a0, h0) về (a1, h1): hướng xương và trục bản lề cùng khớp, không xoắn lung tung
function alignPair(a0: THREE.Vector3, h0: THREE.Vector3, a1: THREE.Vector3, h1: THREE.Vector3, out: THREE.Quaternion){
  const basis = (a: THREE.Vector3, h: THREE.Vector3, m: THREE.Matrix4) => {
    const x = a.clone().normalize(), y = h.clone().addScaledVector(x, -h.dot(x)).normalize(), z = new THREE.Vector3().crossVectors(x, y);
    return m.makeBasis(x, y, z);
  };
  basis(a0, h0, _m); basis(a1, h1, _m2);
  _q2.setFromRotationMatrix(_m).invert();
  return out.setFromRotationMatrix(_m2).multiply(_q2);
}
// IK hai đốt: từ gốc S tới đích T, khuỷu/gối lệch về phía pole. Trả hướng đốt trên, đốt dưới và trục bản lề.
function solve2(S: THREE.Vector3, T: THREE.Vector3, L1: number, L2: number, pole: THREE.Vector3){
  const dv = T.clone().sub(S); let d = dv.length();
  const dir = d > 1e-5 ? dv.divideScalar(d) : new THREE.Vector3(0, -1, 0);
  d = Math.min(Math.max(d, Math.abs(L1 - L2) + 1e-3), (L1 + L2) * 0.999);
  const n = pole.clone().addScaledVector(dir, -pole.dot(dir));
  if (n.lengthSq() < 1e-8) n.set(0, 0, 1).addScaledVector(dir, -dir.z); n.normalize();
  const cosA = THREE.MathUtils.clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1), sinA = Math.sqrt(1 - cosA * cosA);
  const E = S.clone().addScaledVector(dir, L1 * cosA).addScaledVector(n, L1 * sinA);
  const Tc = S.clone().addScaledVector(dir, d);
  return { u: E.clone().sub(S).normalize(), f: Tc.sub(E).normalize(), h: new THREE.Vector3().crossVectors(n, dir).normalize(), E };
}
const eul = (pitch: number, yaw: number, roll: number, out = new THREE.Quaternion()) => out.setFromEuler(_e.set(pitch, yaw, roll, 'YXZ'));
const axisQ = (ax: THREE.Vector3, ang: number, out = new THREE.Quaternion()) => out.setFromAxisAngle(ax, ang);

/* ------------------------------------------------------------ một tư thế → góc khớp */
// A[i]: xoay tích luỹ (hệ thân) của từng xương; P[i]: vị trí (hệ thân); trả về quaternion cục bộ cho mọi xương và vị trí gốc, mặt
export interface Solved { q: THREE.Quaternion[]; root: THREE.Vector3; face: Map<number, THREE.Vector3>; P: THREE.Vector3[] }
export function solvePose(rig: Rig, pose: BodyPose): Solved {
  const n = rig.bones.length, A: THREE.Quaternion[] = new Array(n), D: THREE.Quaternion[] = new Array(n), P: THREE.Vector3[] = new Array(n);
  const I = rig.idx, B = rig.bones;
  const set = (i: number | undefined, d: THREE.Quaternion) => { if (i !== undefined) D[i] = d; };
  // thân
  const r = pose.root;
  if (rig.samePelvis) set(I.root, eul(r.pitch, r.yaw, r.roll)); else set(I.pelvis, eul(r.pitch, r.yaw, r.roll));
  // ngực chia cho các đốt sống có trong khung xương; cổ gánh một phần đầu
  const spines = [I.spine1, I.spine2].filter(i => i !== undefined) as number[];
  const c = pose.chest, k = spines.length ? 1 / spines.length : 0;
  for (const i of spines) D[i] = eul(c.pitch * k, c.yaw * k, c.roll * k);
  if (!spines.length && I.spine !== undefined) D[I.spine] = eul(c.pitch, c.yaw, c.roll);
  const h = pose.head;
  set(I.neck, eul(h.pitch * 0.35, h.yaw * 0.35, h.roll * 0.35));
  set(I.head, eul(h.pitch * 0.65, h.yaw * 0.65, h.roll * 0.65));
  set(I.clavL, eul(0, -pose.fwd[0], pose.shrug[0]));
  set(I.clavR, eul(0, pose.fwd[1], -pose.shrug[1]));
  // mặt: hàm há, mắt liếc
  set(I.jaw, axisQ(new THREE.Vector3(1, 0, 0), THREE.MathUtils.clamp(pose.face.open, 0, 1) * 0.2));
  const look = eul(pose.face.lookY * 0.2, pose.face.lookX * 0.3, 0);
  set(I.eyeL, look); set(I.eyeR, look.clone());
  // xuôi chuỗi cho tới tay chân (FK), các chi giải IK khi tới lượt
  const ID = new THREE.Quaternion();
  const fk = (i: number) => {
    const b = B[i];
    const pa = b.par >= 0 ? A[b.par] : ID;
    A[i] = pa.clone().multiply(D[i] ?? ID);
    P[i] = b.par >= 0 ? P[b.par].clone().add(b.pB.clone().sub(B[b.par].pB).applyQuaternion(pa)) : b.pB.clone().add(_a.set(r.x, r.y, r.z));
  };
  const limbs: { L: Limb; side: 0 | 1; arm: boolean }[] = [];
  if (rig.arm) limbs.push({ L: rig.arm[0], side: 0, arm: true }, { L: rig.arm[1], side: 1, arm: true });
  if (rig.leg) limbs.push({ L: rig.leg[0], side: 0, arm: false }, { L: rig.leg[1], side: 1, arm: false });
  const limbAt = new Map(limbs.map(l => [l.L.a, l]));
  const chestI = I.spine2 ?? I.spine1 ?? I.spine;
  for (let i = 0; i < n; i++){
    const l = limbAt.get(i);
    if (!l){ if (A[i] === undefined) fk(i); continue; }
    // gốc chi đã có vị trí (vai/hông) nhờ cha của nó
    fk(i);
    const L = l.L, S = P[i], mir = l.side === 0 ? 1 : -1;
    let T: THREE.Vector3, pole: THREE.Vector3;
    if (l.arm){
      const ap = pose.arm[l.side], chestA = chestI !== undefined ? A[chestI] : ID;
      const v = new THREE.Vector3(ap.x * mir, ap.y, ap.z);
      // tay không xuyên vào thân: điểm cổ tay rơi vào khối ngực, bụng thì đẩy ra trước
      const fromMid = 0.18 + ap.x;              // cách đường giữa thân bao nhiêu (vai cách tâm ~0,18 m)
      if (ap.y < 0.05 && ap.y > -0.62 && fromMid < 0.17 && ap.z < 0.16) v.z = Math.max(v.z, 0.16 + (ap.y < -0.3 ? 0.02 : 0));
      T = S.clone().add(v.applyQuaternion(chestA));
      const pl = ap.pole ?? { x: 0.35, y: -0.55, z: -0.5 };
      pole = new THREE.Vector3(pl.x * mir, pl.y, pl.z).applyQuaternion(chestA);
    } else {
      const fp = pose.foot[l.side];
      T = new THREE.Vector3(fp.x, fp.y + rig.ankleH, fp.z);
      pole = new THREE.Vector3(0.12 * mir, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), fp.yaw ?? 0);
    }
    const s = solve2(S, T, L.L1, L.L2, pole);
    const Aup = alignPair(L.u0, L.h0, s.u, s.h, new THREE.Quaternion());
    const Afo = alignPair(L.f0, L.h0, s.f, s.h, new THREE.Quaternion());
    const pa = B[i].par >= 0 ? A[B[i].par] : ID;
    D[i] = pa.clone().invert().multiply(Aup); A[i] = Aup;
    // đốt dưới (cẳng tay / cẳng chân) có thể không là con trực tiếp trong danh sách (vd. có xương xoắn ở giữa): tìm theo chỉ số
    const j = L.b;
    D[j] = Aup.clone().invert().multiply(Afo); A[j] = Afo; P[j] = S.clone().addScaledVector(s.u, L.L1);
    // điểm cuối: cổ tay theo cẳng tay (+ gập cổ tay), cổ chân giữ bàn chân phẳng trên sàn (+ xoay, kiễng)
    const e = L.c;
    if (l.arm){
      const w = pose.arm[l.side].wrist;
      D[e] = w ? eul(w.x, w.y * mir, w.z * mir) : ID.clone();
    } else {
      const fp = pose.foot[l.side];
      const Af = eul(fp.pitch ?? 0, fp.yaw ?? 0, 0);
      D[e] = Afo.clone().invert().multiply(Af);
    }
  }
  // mũi chân gập lại khi kiễng gót, giữ đầu ngón chạm sàn
  for (const [toe, side] of [[I.toeL, 0], [I.toeR, 1]] as const){
    if (toe === undefined) continue;
    const pitch = pose.foot[side].pitch ?? 0;
    D[toe] = axisQ(new THREE.Vector3(1, 0, 0), -Math.max(0, pitch) * 0.85);
  }
  // ngón tay
  for (const side of [0, 1] as const){
    const curl = pose.arm[side].curl; if (!curl) continue;
    rig.fingers[side].forEach((ch, f) => ch.forEach((bi, s) => { const ax = rig.curlAxis[side][f]; if (ax) D[bi] = axisQ(ax, (curl[f] ?? 0) * (f === 0 ? [0.35, 0.5, 0.45][s] : [0.9, 1.1, 0.75][s])); }));
  }
  // tính lại toàn bộ A theo đúng thứ tự cha → con (gồm cả ngón tay, mặt nằm sau chi)
  for (let i = 0; i < n; i++){ const b = B[i]; A[i] = (b.par >= 0 ? A[b.par] : ID).clone().multiply(D[i] ?? ID); }
  // đổi sang quaternion cục bộ của từng xương: local = Wr[cha]⁻¹ · F·D·F⁻¹ · Wr
  const q: THREE.Quaternion[] = B.map((b, i) => {
    const d = (D[i] ?? ID);
    return b.WrParInv.clone().multiply(_q.copy(rig.F).multiply(d).multiply(rig.Fi)).multiply(b.Wr);
  });
  // gốc: dời hông; mặt: dời các điểm xương mặt (cười, mày, chớp mắt) theo hệ của đầu lúc gốc
  const root = (() => {
    const b = B[I.root!];
    const w = b.worldRest.clone().add(_a.set(r.x, r.y, r.z).multiplyScalar(rig.u).applyQuaternion(rig.F));
    return w.applyMatrix4(b.parInvMat);
  })();
  const face = new Map<number, THREE.Vector3>();
  const f = pose.face, sm = f.smile, br = f.brow, bl = THREE.MathUtils.clamp(f.blink, 0, 1);
  const off = (k: Key, x: number, y: number, z: number) => {
    const i = I[k]; if (i === undefined) return;
    const b = B[i];
    face.set(i, b.worldRest.clone().add(_a.set(x, y, z).multiplyScalar(rig.u).applyQuaternion(rig.F)).applyMatrix4(b.parInvMat));
  };
  off('cornerL', 0.003 * sm, 0.0035 * sm - 0.002 * f.open, 0); off('cornerR', -0.003 * sm, 0.0035 * sm - 0.002 * f.open, 0);
  off('cheekL', 0.001 * sm, 0.0028 * sm, 0.001 * sm); off('cheekR', -0.001 * sm, 0.0028 * sm, 0.001 * sm);
  for (const k of ['browInL', 'browInR', 'browM'] as Key[]) off(k, 0, 0.004 * br, 0);
  off('browOutL', 0, 0.003 * br, 0); off('browOutR', 0, 0.003 * br, 0);
  off('lidTopL', 0, -0.0075 * bl, 0.0005 * bl); off('lidTopR', 0, -0.0075 * bl, 0.0005 * bl);
  off('lidBotL', 0, 0.0018 * bl, 0); off('lidBotR', 0, 0.0018 * bl, 0);
  // vị trí cuối cùng (hệ thân) để kiểm thử: chân có trượt không, tay có xuyên thân không
  for (let i = 0; i < n; i++){ const b = B[i]; P[i] = b.par >= 0 ? P[b.par].clone().add(b.pB.clone().sub(B[b.par].pB).applyQuaternion(A[b.par])) : b.pB.clone().add(_a.set(r.x, r.y, r.z)); }
  return { q, root, face, P };
}

/* ------------------------------------------------------------ nướng thành AnimationClip */
// Mỗi phách lấy 8 mẫu; khung cuối trùng khung đầu nên lặp vòng liền mạch. Quaternion giữ cùng bán cầu để nội suy không quay vòng ngược.
export function bakeDance(rig: Rig, d: ProceduralDance, perBeat = SAMPLES_PER_BEAT): THREE.AnimationClip {
  const N = Math.round(d.beats * perBeat), spb = 60 / DANCE_BPM, times = new Float32Array(N + 1);
  const qv = rig.bones.map(() => new Float32Array((N + 1) * 4));
  const rootV = new Float32Array((N + 1) * 3);
  const faceV = new Map<number, Float32Array>();
  for (let s = 0; s <= N; s++){
    const beat = (s % N) / perBeat;                 // khung cuối dùng đúng tư thế khung đầu
    times[s] = s / perBeat * spb;
    const r = solvePose(rig, d.sample(beat));
    r.q.forEach((q, i) => {
      const arr = qv[i];
      if (s > 0 && q.x * arr[s * 4 - 4] + q.y * arr[s * 4 - 3] + q.z * arr[s * 4 - 2] + q.w * arr[s * 4 - 1] < 0){ q.x = -q.x; q.y = -q.y; q.z = -q.z; q.w = -q.w; }
      arr.set([q.x, q.y, q.z, q.w], s * 4);
    });
    rootV.set([r.root.x, r.root.y, r.root.z], s * 3);
    for (const [i, p] of r.face){ let a = faceV.get(i); if (!a){ a = new Float32Array((N + 1) * 3); faceV.set(i, a); } a.set([p.x, p.y, p.z], s * 3); }
  }
  // khung cuối: đúng bằng khung đầu (cùng dấu)
  const tracks: THREE.KeyframeTrack[] = [];
  rig.bones.forEach((b, i) => { const a = qv[i]; a.set(a.subarray(0, 4), N * 4); if (a[N * 4] * a[N * 4 - 4] + a[N * 4 + 1] * a[N * 4 - 3] + a[N * 4 + 2] * a[N * 4 - 2] + a[N * 4 + 3] * a[N * 4 - 1] < 0) for (let k = 0; k < 4; k++) a[N * 4 + k] = -a[N * 4 + k]; tracks.push(new THREE.QuaternionKeyframeTrack(b.b.name + '.quaternion', times, a)); });
  tracks.push(new THREE.VectorKeyframeTrack(rig.bones[rig.idx.root!].b.name + '.position', times, rootV));
  for (const [i, a] of faceV) tracks.push(new THREE.VectorKeyframeTrack(rig.bones[i].b.name + '.position', times, a));
  const clip = new THREE.AnimationClip('dance:' + d.id, N / perBeat * spb, tracks);
  return clip;
}
export const clipBeats = (c: THREE.AnimationClip) => Math.round(c.duration * DANCE_BPM / 60);
