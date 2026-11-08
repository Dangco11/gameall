// 100 điệu nhảy của Quán Bar Online: tên, nhóm, độ sung, và "công thức" chuyển động (bước chân, tay, nhún hông, đầu, mặt).
// Màn hình dựng mỗi điệu thành một AnimationClip riêng trên khung xương người 3D (bar/dances.ts + glb.ts: bakeDance).
// Server chỉ dùng tên, số, nhóm để hiểu bình luận "nhảy 12", "nhảy floss", "nhảy edm" và để chọn điệu cho Dance Battle.

export type DanceGroup = 'edm' | 'hiphop' | 'tiktok' | 'sexy' | 'break' | 'party' | 'vip';
export const DANCE_GROUPS: Record<DanceGroup, { name: string; icon: string; words: string[] }> = {
  edm: { name: 'EDM', icon: '⚡', words: ['edm', 'rave', 'festival'] },
  hiphop: { name: 'Hip-hop', icon: '🧢', words: ['hiphop', 'hip hop', 'rap'] },
  tiktok: { name: 'TikTok', icon: '📱', words: ['tiktok', 'trend', 'viral'] },
  sexy: { name: 'Gợi cảm', icon: '💋', words: ['sexy', 'goi cam', 'latin', 'quyen ru'] },
  break: { name: 'Breakdance', icon: '🌀', words: ['break', 'breakdance', 'bboy', 'b boy'] },
  party: { name: 'Party', icon: '🎉', words: ['party', 'tiec', 'disco', 'vui'] },
  vip: { name: 'VIP', icon: '👑', words: ['vip', 'sang chanh', 'dai gia'] },
};

// Công thức chuyển động. Mọi số đo theo mét của người cao 1,7 m (người cao thấp khác tự co giãn), thời gian theo phách nhạc.
//   f: kiểu bước chân, fw: độ rộng bước, fv: biến thể;   a: kiểu tay, av: biến thể (độ cao, bên tay, nhịp)
//   g: nhún và thân: bo nhún, bt kiểu nhún (0 nhún xuống, 1 bật nhảy, 2 nhún đôi, 3 nửa nhịp), sw đưa hông ngang, hr lắc hông,
//      hy xoay hông, wi lắc vòng hông, tw xoay ngực, cp ưỡn ngực theo nhịp, br uốn sóng người, ln nghiêng người tới, sk lắc vai,
//      hn gật đầu, hb lắc đầu mạnh, ht quay đầu, tl nghiêng đầu
//   face: nét mặt; hs: thế bàn tay mặc định; sp: tốc độ chuyển động riêng của điệu (0,5 nửa nhịp, 1 bình thường, 2 nhịp đôi)
export interface Groove { bo?: number; bt?: 0 | 1 | 2 | 3; sw?: number; hr?: number; hy?: number; wi?: number; tw?: number; cp?: number; br?: number; ln?: number; sk?: number; hn?: number; hb?: number; ht?: number; tl?: number }
export type Face = 'smile' | 'grin' | 'cool' | 'sexy' | 'shout' | 'focus' | 'joy';
export type HandShape = 'open' | 'relaxed' | 'fist' | 'point' | 'peace' | 'rock' | 'flat';
export interface Recipe { beats: 4 | 8 | 16; f: string; fw?: number; fv?: number; a: string; av?: number; g: Groove; face: Face; hs?: HandShape; sp?: number }
export interface DanceDef { no: number; id: string; name: string; group: DanceGroup; energy: 1 | 2 | 3 | 4 | 5; weight: number; r: Recipe; words: string[] }

type Row = [string, DanceGroup, 1 | 2 | 3 | 4 | 5, Recipe];
const R = (beats: 4 | 8 | 16, f: string, a: string, g: Groove, face: Face, extra: Partial<Recipe> = {}): Recipe => ({ beats, f, a, g, face, ...extra });

const ROWS: Row[] = [
  // ---------------------------------------------------------------- EDM (16)
  ['Running Man Shuffle', 'edm', 5, R(4, 'runningMan', 'pump', { bo: 0.03, bt: 0, hn: 0.12 }, 'grin', { av: 2, hs: 'fist' })],
  ['T-Step', 'edm', 4, R(8, 'tStep', 'shapes', { bo: 0.025, tw: 0.15, hn: 0.08 }, 'cool', { fw: 0.32 })],
  ['Melbourne Shuffle', 'edm', 5, R(8, 'shuffleSide', 'glowstick', { bo: 0.03, sw: 0.04, hn: 0.1 }, 'focus', { fw: 0.28 })],
  ['Fist Pump', 'edm', 4, R(4, 'planted', 'pump', { bo: 0.06, bt: 0, cp: 0.08, hn: 0.18 }, 'shout', { av: 0, hs: 'fist' })],
  ['Jumpstyle', 'edm', 5, R(8, 'kick', 'boxer', { bo: 0.08, bt: 1, ln: 0.08 }, 'focus', { fv: 1, hs: 'fist' })],
  ['Hands Up Rave', 'edm', 4, R(8, 'pogo', 'handsUp', { bo: 0.12, bt: 1, hn: 0.1 }, 'joy', { fw: 0.16 })],
  ['Laser Arms', 'edm', 3, R(8, 'sway', 'point', { bo: 0.03, sw: 0.05, tw: 0.25, ht: 0.25 }, 'cool', { av: 1, hs: 'point' })],
  ['Cutting Shapes', 'edm', 4, R(8, 'charleston', 'shapes', { bo: 0.03, tw: 0.2, hn: 0.06 }, 'focus', { fv: 1 })],
  ['Charleston Shuffle', 'edm', 4, R(4, 'charleston', 'pump', { bo: 0.03, tw: 0.25 }, 'grin', { av: 1, hs: 'open' })],
  ['Festival Bounce', 'edm', 3, R(4, 'bounce', 'clap', { bo: 0.07, bt: 2, hn: 0.14 }, 'joy', { av: 1 })],
  ['Drop Jump', 'edm', 5, R(4, 'pogo', 'victory', { bo: 0.16, bt: 1, hb: 0.15 }, 'shout', { fw: 0.22 })],
  ['Hardstyle Kick', 'edm', 5, R(8, 'kick', 'punch', { bo: 0.05, ln: 0.1, cp: 0.06 }, 'shout', { fv: 0, hs: 'fist' })],
  ['Glowstick Wave', 'edm', 2, R(8, 'sway', 'glowstick', { bo: 0.02, sw: 0.06, br: 0.04 }, 'smile', { av: 1 })],
  ['Raver Sway', 'edm', 2, R(16, 'stepTouch', 'wave', { bo: 0.03, sw: 0.05, tl: 0.12 }, 'joy', { fw: 0.28 })],
  ['Pogo', 'edm', 5, R(4, 'pogo', 'boxer', { bo: 0.14, bt: 1, hb: 0.1 }, 'shout', { fw: 0.12, hs: 'fist', av: 1 })],
  ['Big Room Clap', 'edm', 3, R(8, 'stomp', 'clap', { bo: 0.05, cp: 0.05, hn: 0.12 }, 'grin', { av: 2 })],
  // ---------------------------------------------------------------- HIP-HOP (18)
  ['Two Step', 'hiphop', 2, R(4, 'twoStep', 'boxer', { bo: 0.04, bt: 3, hn: 0.12, sk: 0.04 }, 'cool', { av: 2, fw: 0.3 })],
  ['Bounce Rock', 'hiphop', 2, R(4, 'bounce', 'raiseRoof', { bo: 0.06, bt: 0, hn: 0.16, cp: 0.04 }, 'cool', { av: 1 })],
  ['Harlem Shake', 'hiphop', 4, R(4, 'planted', 'shimmy', { bo: 0.03, sk: 0.09, tw: 0.2, hb: 0.12 }, 'grin', { fw: 0.2 })],
  ['Dougie', 'hiphop', 3, R(8, 'sway', 'dougie', { bo: 0.04, sw: 0.07, hr: 0.12, tl: 0.15 }, 'cool', { fw: 0.24 })],
  ['Milly Rock', 'hiphop', 3, R(4, 'twoStep', 'milly', { bo: 0.03, tw: 0.2, sw: 0.03 }, 'cool', { fw: 0.34 })],
  ['Woah', 'hiphop', 3, R(4, 'bounce', 'woah', { bo: 0.05, bt: 3, ln: 0.06, tl: 0.15 }, 'focus', { hs: 'fist' })],
  ['Shoot', 'hiphop', 4, R(4, 'hop', 'shoot', { bo: 0.04, tw: 0.15 }, 'grin', { hs: 'point' })],
  ['C-Walk Steps', 'hiphop', 4, R(8, 'heelToe', 'chicken', { bo: 0.02, sw: 0.04, hn: 0.08 }, 'cool', { fw: 0.2, fv: 1 })],
  ['Kick Ball Change', 'hiphop', 3, R(4, 'kick', 'boxer', { bo: 0.03, tw: 0.1, hn: 0.1 }, 'smile', { fv: 2, av: 0 })],
  ['Chest Pop', 'hiphop', 3, R(4, 'planted', 'popping', { bo: 0.02, cp: 0.16, hn: 0.06 }, 'focus', { fw: 0.24, av: 0 })],
  ['Krump Stomp', 'hiphop', 5, R(4, 'stomp', 'punch', { bo: 0.06, cp: 0.14, ln: 0.12, hb: 0.12 }, 'shout', { hs: 'fist', fw: 0.3 })],
  ['Popping Arms', 'hiphop', 3, R(8, 'planted', 'popping', { bo: 0.015, hn: 0.05 }, 'focus', { av: 1, hs: 'flat' })],
  ['Locking Point', 'hiphop', 4, R(8, 'kick', 'locking', { bo: 0.04, ln: 0.05 }, 'grin', { fv: 2, hs: 'point' })],
  ['Wop', 'hiphop', 3, R(4, 'twist', 'shapes', { bo: 0.04, tw: 0.18, hr: 0.08 }, 'smile', { av: 1 })],
  ['Nae Nae', 'hiphop', 3, R(8, 'sway', 'naenae', { bo: 0.04, sw: 0.06, hr: 0.1, tl: 0.1 }, 'cool', { fw: 0.26 })],
  ['Heel Toe', 'hiphop', 3, R(4, 'heelToe', 'boxer', { bo: 0.025, sw: 0.02, hn: 0.1 }, 'cool', { av: 1 })],
  ['Cabbage Patch', 'hiphop', 2, R(4, 'bounce', 'stir', { bo: 0.05, bt: 0, hy: 0.12, hn: 0.08 }, 'joy', { hs: 'fist' })],
  ['Running Man Classic', 'hiphop', 4, R(4, 'runningMan', 'boxer', { bo: 0.03, hn: 0.1 }, 'grin', { fv: 1, hs: 'fist', av: 2 })],
  // ---------------------------------------------------------------- TIKTOK (18)
  ['Renegade', 'tiktok', 4, R(16, 'sway', 'renegade', { bo: 0.03, sw: 0.04, hr: 0.08 }, 'grin', { fw: 0.24 })],
  ['Savage Arms', 'tiktok', 3, R(8, 'planted', 'savage', { bo: 0.03, hr: 0.12, tl: 0.12 }, 'sexy', { fw: 0.22 })],
  ['Say So Groove', 'tiktok', 2, R(8, 'stepTouch', 'saySo', { bo: 0.025, hr: 0.1, tl: 0.1 }, 'smile', { fw: 0.22 })],
  ['Floss', 'tiktok', 4, R(4, 'planted', 'floss', { bo: 0.02, hy: 0.25, sw: 0.06 }, 'grin', { hs: 'fist', fw: 0.2 })],
  ['Dab Combo', 'tiktok', 3, R(8, 'bounce', 'dab', { bo: 0.04, hn: 0.08 }, 'cool', { av: 0 })],
  ['Blinding Lights Step', 'tiktok', 3, R(8, 'grapevine', 'boxer', { bo: 0.03, sw: 0.02, hn: 0.08 }, 'smile', { fw: 0.35, av: 2 })],
  ['Hip Roll Trend', 'tiktok', 2, R(8, 'sway', 'hips', { bo: 0.02, wi: 0.06, hr: 0.14 }, 'sexy', { fw: 0.24 })],
  ['Heart Hands', 'tiktok', 1, R(8, 'stepTouch', 'heart', { bo: 0.03, tl: 0.15, sw: 0.03 }, 'joy', { fw: 0.18 })],
  ['Viral Wave', 'tiktok', 3, R(8, 'planted', 'roll', { bo: 0.02, br: 0.06 }, 'smile', { fw: 0.22, av: 1 })],
  ['Shoulder Shimmy', 'tiktok', 2, R(4, 'bounce', 'shimmy', { bo: 0.02, sk: 0.07, tl: 0.1 }, 'joy', { av: 1 })],
  ['Bounce Clap', 'tiktok', 2, R(4, 'stepTouch', 'clap', { bo: 0.05, bt: 2, hn: 0.1 }, 'grin', { fw: 0.2, av: 0 })],
  ['Point and Spin', 'tiktok', 4, R(8, 'spin', 'point', { bo: 0.03, ht: 0.2 }, 'grin', { av: 2, hs: 'point' })],
  ['Toosie Slide', 'tiktok', 3, R(8, 'glide', 'toosie', { bo: 0.02, sw: 0.03, hn: 0.06 }, 'cool', { fw: 0.3 })],
  ['Hand Jive', 'tiktok', 2, R(4, 'bounce', 'jive', { bo: 0.03, bt: 3, hn: 0.08 }, 'smile', {})],
  ['Finger Point Groove', 'tiktok', 2, R(4, 'heelToe', 'point', { bo: 0.03, sw: 0.03, tl: 0.1 }, 'grin', { av: 3, hs: 'point' })],
  ['Hair Flip', 'tiktok', 2, R(8, 'sway', 'hair', { bo: 0.02, hr: 0.12, tl: 0.2 }, 'sexy', { fw: 0.2 })],
  ['Peace Sign Bop', 'tiktok', 1, R(4, 'bounce', 'peace', { bo: 0.04, bt: 2, tl: 0.15 }, 'joy', { hs: 'peace' })],
  ['Mic Drop Pose', 'tiktok', 3, R(8, 'strut', 'micdrop', { bo: 0.03, sw: 0.03, ht: 0.15 }, 'cool', { fw: 0.2 })],
  // ---------------------------------------------------------------- SEXY (14)
  ['Body Roll', 'sexy', 2, R(8, 'planted', 'roll', { bo: 0.01, br: 0.12, hr: 0.06 }, 'sexy', { fw: 0.24, av: 0, sp: 0.5 })],
  ['Hip Sway', 'sexy', 1, R(4, 'sway', 'hips', { bo: 0.015, sw: 0.08, hr: 0.16 }, 'sexy', { fw: 0.22, sp: 0.5 })],
  ['Slow Wine', 'sexy', 2, R(8, 'planted', 'flourish', { bo: 0.02, wi: 0.09, hr: 0.1 }, 'sexy', { fw: 0.3, av: 1, sp: 0.5 })],
  ['Salsa Basic', 'sexy', 3, R(8, 'salsa', 'salsa', { bo: 0.015, hr: 0.14, tw: 0.08 }, 'smile', { fw: 0.24 })],
  ['Bachata Step', 'sexy', 2, R(8, 'stepTouch', 'salsa', { bo: 0.02, hr: 0.18, sw: 0.04 }, 'sexy', { fw: 0.24, fv: 1, av: 1 })],
  ['Cha Cha Hips', 'sexy', 3, R(8, 'boxStep', 'flourish', { bo: 0.015, hr: 0.14, hy: 0.1 }, 'smile', { fw: 0.22, av: 0 })],
  ['Belly Wave', 'sexy', 2, R(8, 'planted', 'handsUp', { bo: 0.01, br: 0.08, wi: 0.06 }, 'sexy', { fw: 0.26, av: 2, sp: 0.5 })],
  ['Shoulder Roll', 'sexy', 1, R(4, 'sway', 'hips', { bo: 0.01, sk: 0.06, sw: 0.04, tl: 0.1 }, 'sexy', { fw: 0.22, av: 1, sp: 0.5 })],
  ['Hair Whip Slow', 'sexy', 2, R(8, 'planted', 'hair', { bo: 0.01, br: 0.06, tl: 0.25 }, 'sexy', { fw: 0.24, av: 1, sp: 0.5 })],
  ['Samba Sway', 'sexy', 4, R(4, 'samba', 'salsa', { bo: 0.025, hr: 0.12, tw: 0.1 }, 'joy', { fw: 0.2, av: 2 })],
  ['Hip Pop', 'sexy', 3, R(4, 'planted', 'hips', { bo: 0.015, hr: 0.2, bt: 3 }, 'sexy', { fw: 0.26, av: 2 })],
  ['Tango Lean', 'sexy', 3, R(8, 'lunge', 'tango', { bo: 0.01, ln: 0.08, ht: 0.3 }, 'focus', { fw: 0.3, sp: 0.5 })],
  ['Latin Arms', 'sexy', 2, R(8, 'salsa', 'flourish', { bo: 0.015, hr: 0.12, tw: 0.12 }, 'smile', { fw: 0.2, fv: 1, av: 2 })],
  ['Catwalk Strut', 'sexy', 2, R(8, 'strut', 'hips', { bo: 0.015, hr: 0.16, ht: 0.12 }, 'cool', { fw: 0.18, av: 3 })],
  // ---------------------------------------------------------------- BREAKDANCE (12)
  ['Toprock Basic', 'break', 3, R(4, 'crossStep', 'burn', { bo: 0.03, tw: 0.2, ln: 0.06 }, 'focus', { fw: 0.28, av: 0, hs: 'fist' })],
  ['Indian Step', 'break', 4, R(4, 'indian', 'burn', { bo: 0.03, tw: 0.25, ln: 0.08 }, 'focus', { fw: 0.3, av: 1, hs: 'fist' })],
  ['Salsa Rock', 'break', 4, R(4, 'salsa', 'boxer', { bo: 0.03, tw: 0.22, ln: 0.06 }, 'grin', { fw: 0.3, fv: 2, hs: 'fist', av: 2 })],
  ['Cross Step Rock', 'break', 3, R(8, 'crossStep', 'shapes', { bo: 0.03, tw: 0.15 }, 'cool', { fw: 0.32, fv: 1 })],
  ['Kick Out', 'break', 4, R(4, 'kick', 'burn', { bo: 0.04, ln: 0.1, tw: 0.12 }, 'focus', { fv: 3, av: 2, hs: 'fist' })],
  ['Crouch Footwork', 'break', 5, R(4, 'squat', 'boxer', { bo: 0.02, ln: 0.22, hn: 0.08 }, 'focus', { fw: 0.34, av: 3, hs: 'fist' })],
  ['Pivot Spin', 'break', 5, R(4, 'spin', 'victory', { bo: 0.03, ln: 0.04 }, 'grin', { fv: 1 })],
  ['Uprock Jerk', 'break', 4, R(4, 'lunge', 'punch', { bo: 0.04, cp: 0.12, ln: 0.12 }, 'shout', { fw: 0.34, fv: 1, hs: 'fist' })],
  ['Burn Arm', 'break', 4, R(8, 'crossStep', 'burn', { bo: 0.03, ln: 0.1, ht: 0.2 }, 'cool', { fw: 0.26, av: 3 })],
  ['Freeze Pose Hits', 'break', 3, R(8, 'squat', 'popping', { bo: 0.02, ln: 0.1, cp: 0.08 }, 'focus', { fw: 0.4, fv: 1, av: 2, hs: 'fist' })],
  ['Brooklyn Rock', 'break', 4, R(4, 'hop', 'burn', { bo: 0.04, tw: 0.2, ln: 0.08 }, 'cool', { fv: 1, av: 1, hs: 'fist' })],
  ['Battle Stance', 'break', 3, R(8, 'lunge', 'boxer', { bo: 0.03, ln: 0.1, hb: 0.06 }, 'focus', { fw: 0.4, fv: 2, av: 0, hs: 'fist' })],
  // ---------------------------------------------------------------- PARTY (12)
  ['Macarena', 'party', 2, R(16, 'bounce', 'macarena', { bo: 0.03, hr: 0.12, hn: 0.06 }, 'joy', {})],
  ['YMCA', 'party', 2, R(16, 'stepTouch', 'ymca', { bo: 0.03, sw: 0.03 }, 'joy', { fw: 0.2 })],
  ['Chicken Dance', 'party', 2, R(8, 'bounce', 'chicken', { bo: 0.05, bt: 0, hn: 0.12 }, 'grin', { av: 1 })],
  ['Conga Step', 'party', 2, R(8, 'kick', 'hips', { bo: 0.03, hr: 0.1 }, 'joy', { fv: 4, av: 2 })],
  ['The Twist', 'party', 3, R(4, 'twist', 'salsa', { bo: 0.04, hy: 0.3, tw: -0.2 }, 'grin', { av: 3, hs: 'fist' })],
  ['Disco Point', 'party', 3, R(8, 'stepTouch', 'point', { bo: 0.03, hr: 0.1, sw: 0.03 }, 'grin', { fw: 0.24, av: 0, hs: 'point' })],
  ['Hustle', 'party', 3, R(8, 'grapevine', 'stir', { bo: 0.03, hr: 0.06 }, 'smile', { fw: 0.3, fv: 1, av: 1 })],
  ['Bus Stop', 'party', 2, R(8, 'boxStep', 'clap', { bo: 0.03, sw: 0.02 }, 'smile', { fw: 0.24, fv: 1, av: 1 })],
  ['Electric Slide', 'party', 2, R(16, 'grapevine', 'roll', { bo: 0.03, sw: 0.03 }, 'smile', { fw: 0.32, av: 2 })],
  ['Sprinkler', 'party', 3, R(8, 'planted', 'sprinkler', { bo: 0.03, hy: 0.35, hn: 0.04 }, 'grin', { fw: 0.24 })],
  ['Lawnmower', 'party', 3, R(4, 'lunge', 'lawnmower', { bo: 0.03, ln: 0.08 }, 'grin', { fw: 0.32, fv: 2, hs: 'fist' })],
  ['Shopping Cart', 'party', 2, R(8, 'stepTouch', 'cart', { bo: 0.03, ln: 0.05, ht: 0.25 }, 'joy', { fw: 0.2, fv: 2 })],
  // ---------------------------------------------------------------- VIP (10)
  ['Victory Dance', 'vip', 5, R(8, 'pogo', 'victory', { bo: 0.1, bt: 1, hn: 0.12 }, 'joy', { fw: 0.2, av: 1 })],
  ['Champagne Pop', 'vip', 4, R(8, 'bounce', 'champagne', { bo: 0.04, cp: 0.06, tl: 0.1 }, 'joy', {})],
  ['Money Rain', 'vip', 4, R(4, 'twoStep', 'money', { bo: 0.04, tw: 0.12, ht: 0.15 }, 'cool', { fw: 0.28, hs: 'flat' })],
  ['Boss Sway', 'vip', 2, R(8, 'sway', 'boss', { bo: 0.025, sw: 0.05, tl: 0.08 }, 'cool', { fw: 0.28 })],
  ['Crown Wave', 'vip', 2, R(8, 'stepTouch', 'royal', { bo: 0.02, sw: 0.03, ht: 0.25 }, 'smile', { fw: 0.2, fv: 2 })],
  ['Royal Bow Groove', 'vip', 3, R(16, 'planted', 'bow', { bo: 0.03, hn: 0.06 }, 'smile', { fw: 0.22 })],
  ['Golden Spin', 'vip', 5, R(8, 'spin', 'handsUp', { bo: 0.03 }, 'joy', { fv: 2, av: 1 })],
  ['Superstar Pose', 'vip', 3, R(8, 'strut', 'superstar', { bo: 0.02, hr: 0.08, ht: 0.2 }, 'cool', { fw: 0.22, hs: 'point' })],
  ['Grand Finale', 'vip', 5, R(8, 'stomp', 'raiseRoof', { bo: 0.06, cp: 0.1, hb: 0.12 }, 'shout', { fw: 0.32, av: 2 })],
  ['Celebrity Strut', 'vip', 3, R(8, 'strut', 'royal', { bo: 0.02, hr: 0.12, ht: 0.2 }, 'cool', { fw: 0.2, av: 1 })],
];

export const plainText = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
export const DANCES: DanceDef[] = ROWS.map(([name, group, energy, r], i) => {
  const p = plainText(name);
  return { no: i + 1, id: p.replace(/\s+/g, '-'), name, group, energy, weight: group === 'vip' ? 0.6 : 1, r, words: [p, p.replace(/\s+/g, '')] };
});
export const danceByNo = (n: number) => DANCES[n - 1];
export const danceById = (id: string) => DANCES.find(d => d.id === id);
export const dancesOf = (g: DanceGroup) => DANCES.filter(d => d.group === g);

// Bình luận chọn điệu: "nhảy 12", "nhay floss", "dance renegade", "nhảy edm" (cả nhóm)
export function parseDance(text: string): { dance?: number; group?: DanceGroup } | null {
  const s = plainText(text);
  const m = /^(?:nhay|dance|mua|quay)\s+(.{1,40})$/.exec(s);
  if (!m) return null;
  const arg = m[1].trim(), n = /^(?:so\s+)?(\d{1,3})$/.exec(arg);
  if (n){ const k = +n[1]; return k >= 1 && k <= DANCES.length ? { dance: k } : null; }
  for (const [g, v] of Object.entries(DANCE_GROUPS)) if (v.words.includes(arg) || v.words.includes(arg.replace(/\s+/g, ''))) return { group: g as DanceGroup };
  const flat = arg.replace(/\s+/g, '');
  const d = DANCES.find(x => x.words.includes(arg) || x.words[1] === flat) ?? DANCES.find(x => x.words[1].startsWith(flat) && flat.length >= 4);
  return d ? { dance: d.no } : null;
}
