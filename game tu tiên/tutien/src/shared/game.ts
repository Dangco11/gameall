// Dữ liệu dùng chung cho server và màn hình: cảnh giới, mẫu tu sĩ, kỹ năng, Boss, pháp bảo, tông môn, bảng quà.
// Mọi con số chiến đấu tính ở server; màn hình chỉ vẽ theo kết quả server gửi xuống.

/* ------------------------------------------------------------ cảnh giới */
export const REALMS = ['Phàm Nhân', 'Luyện Khí', 'Trúc Cơ', 'Kim Đan', 'Nguyên Anh', 'Hóa Thần', 'Luyện Hư', 'Hợp Thể', 'Đại Thừa', 'Độ Kiếp',
  'Chân Tiên', 'Kim Tiên', 'Đại La Kim Tiên', 'Tiên Vương', 'Tiên Đế'] as const;
export const STAGES = ['Sơ kỳ', 'Trung kỳ', 'Hậu kỳ', 'Đại viên mãn'] as const;
export const MAX_LEVEL = REALMS.length * STAGES.length - 1;           // 59
// màu hào quang mỗi cảnh giới (cảnh giới càng cao càng rực)
export const REALM_COLORS = [0x9aa4b2, 0x8fd3ff, 0x5ee6a8, 0xffd04a, 0xff9a3c, 0xff5e7e, 0xc07bff, 0x6f8bff, 0x3ff0ff, 0xfff27a,
  0xffffff, 0xffc93c, 0xff7bf2, 0x7bffd1, 0xffe9a8];
export const realmOf = (level: number) => Math.floor(level / 4);
export const stageOf = (level: number) => level % 4;
export const realmName = (level: number) => `${REALMS[realmOf(level)]} ${STAGES[stageOf(level)]}`;
// tu vi cần để lên từ level → level+1 (tăng dần: tu luyện một buổi tới khoảng Trúc Cơ, cảnh giới tiên cần rất nhiều quà)
export const needTuvi = (level: number) => Math.round(40 * Math.pow(1.215, level));

/* ------------------------------------------------------------ hệ kỹ năng */
export type Element = 'kiem' | 'loi' | 'hoa' | 'bang' | 'long' | 'ma' | 'phong' | 'tho' | 'quang';
export const ELEMENT_COLORS: Record<Element, number> = { kiem: 0x9fe8ff, loi: 0xb48cff, hoa: 0xff6a2a, bang: 0x8fe6ff, long: 0xffc94a, ma: 0xc2183f, phong: 0x8dffb4, tho: 0xd8a65a, quang: 0xfff3b0 };
export const ELEMENT_NAMES: Record<Element, string> = { kiem: 'Kiếm', loi: 'Lôi', hoa: 'Hỏa', bang: 'Băng', long: 'Long', ma: 'Ma', phong: 'Phong', tho: 'Thổ', quang: 'Quang' };

// vfx: kiểu hiệu ứng 3D màn hình dựng cho chiêu (mỗi kiểu một cách dựng riêng, không dùng chung một quả cầu)
export type Vfx = 'slash' | 'qiwave' | 'flysword' | 'swordrain' | 'swordarray' | 'bolt' | 'thunder' | 'lightdragon' | 'fireball' | 'firedragon'
  | 'flamepillar' | 'icearrow' | 'icefield' | 'icedragon' | 'claw' | 'roar' | 'dragon' | 'demonpalm' | 'bloodwave' | 'darkbeam' | 'tornado'
  | 'leafstorm' | 'quake' | 'rockfall' | 'holybeam' | 'lotus' | 'heal' | 'shield' | 'phoenix' | 'meteor';
export interface Skill {
  key: string; name: string; el: Element; vfx: Vfx;
  power: number;      // hệ số sát thương (× công kích)
  cd: number;         // hồi chiêu (giây)
  range: number;      // tầm đánh (m)
  aoe: number;        // bán kính diện rộng (0 = đơn mục tiêu)
  minLv: number;      // level tối thiểu để dùng
  heal?: number;      // hồi máu đồng đội (× công kích)
  shield?: number;    // giảm sát thương nhận (0..1) trong 4 giây
}
const S = (key: string, name: string, el: Element, vfx: Vfx, power: number, cd: number, range: number, aoe: number, minLv: number, extra: Partial<Skill> = {}): Skill =>
  ({ key, name, el, vfx, power, cd, range, aoe, minLv, ...extra });
export const SKILLS: Skill[] = [
  // Kiếm
  S('kiemkhi', 'Kiếm Khí', 'kiem', 'qiwave', 1.2, 2.2, 14, 0, 0),
  S('phikiem', 'Phi Kiếm', 'kiem', 'flysword', 1.6, 3.5, 22, 0, 6),
  S('kiemtran', 'Kiếm Trận', 'kiem', 'swordarray', 2.4, 9, 16, 6, 14),
  S('thienkiemtram', 'Thiên Kiếm Trảm', 'kiem', 'slash', 3.4, 12, 10, 4, 24),
  S('vankiem', 'Vạn Kiếm Quy Tông', 'kiem', 'swordrain', 5.5, 22, 26, 10, 36),
  // Lôi
  S('loidien', 'Lôi Điện', 'loi', 'bolt', 1.3, 2.4, 18, 0, 0),
  S('thienloi', 'Thiên Lôi', 'loi', 'thunder', 2.6, 9, 22, 5, 12),
  S('loilong', 'Lôi Long', 'loi', 'lightdragon', 3.6, 13, 24, 5, 24),
  S('cuuthienthanloi', 'Cửu Thiên Thần Lôi', 'loi', 'thunder', 5.8, 24, 28, 11, 38),
  // Hỏa
  S('hoacau', 'Hỏa Cầu', 'hoa', 'fireball', 1.3, 2.4, 18, 2, 0),
  S('hoalong', 'Hỏa Long', 'hoa', 'firedragon', 3.2, 12, 22, 4, 16),
  S('tammuoi', 'Tam Muội Chân Hỏa', 'hoa', 'flamepillar', 3.0, 10, 18, 4, 22),
  S('phanthien', 'Phần Thiên Liệt Diễm', 'hoa', 'meteor', 5.6, 24, 26, 10, 38),
  // Băng
  S('bangtien', 'Băng Tiễn', 'bang', 'icearrow', 1.25, 2.2, 20, 0, 0),
  S('hanbangtran', 'Hàn Băng Trận', 'bang', 'icefield', 2.2, 10, 16, 7, 12),
  S('banglong', 'Băng Long', 'bang', 'icedragon', 3.4, 13, 22, 5, 24),
  S('tuyetdoibangphong', 'Tuyệt Đối Băng Phong', 'bang', 'icefield', 5.2, 24, 22, 11, 38),
  // Long
  S('longtrao', 'Long Trảo', 'long', 'claw', 1.4, 2.6, 8, 0, 0),
  S('longkhieu', 'Long Khiếu', 'long', 'roar', 2.2, 9, 12, 7, 10),
  S('thanlong', 'Thần Long Giáng Thế', 'long', 'dragon', 4.2, 16, 26, 7, 28),
  S('cuulong', 'Cửu Long Diệt Thế', 'long', 'dragon', 6.2, 26, 30, 12, 42),
  // Ma
  S('matrao', 'Ma Trảo', 'ma', 'claw', 1.4, 2.4, 9, 0, 0),
  S('huyetmachuong', 'Huyết Ma Chưởng', 'ma', 'demonpalm', 2.4, 8, 14, 3, 10),
  S('malong', 'Ma Long', 'ma', 'bloodwave', 3.4, 13, 20, 6, 22),
  S('dietthemaquang', 'Diệt Thế Ma Quang', 'ma', 'darkbeam', 5.8, 24, 30, 6, 38),
  // Phong
  S('phongnhan', 'Phong Nhận', 'phong', 'slash', 1.2, 2.0, 12, 0, 0),
  S('cuongphong', 'Cuồng Phong Lốc', 'phong', 'tornado', 2.4, 9, 18, 6, 12),
  S('vandiep', 'Vạn Diệp Phi Hoa', 'phong', 'leafstorm', 3.2, 12, 20, 6, 24),
  // Thổ
  S('daiquyen', 'Đại Lực Quyền', 'tho', 'claw', 1.5, 2.6, 6, 0, 0),
  S('liasonphat', 'Liệt Sơn Chấn', 'tho', 'quake', 2.6, 10, 10, 7, 12),
  S('thienthach', 'Thiên Thạch Lạc', 'tho', 'rockfall', 3.8, 14, 22, 6, 26),
  // Quang (hỗ trợ)
  S('thanhquang', 'Thánh Quang', 'quang', 'holybeam', 1.1, 2.4, 18, 0, 0),
  S('hoiphuc', 'Hồi Xuân Thuật', 'quang', 'heal', 0, 8, 16, 8, 4, { heal: 2.2 }),
  S('kimcang', 'Kim Cang Hộ Thể', 'quang', 'shield', 0, 14, 14, 9, 10, { shield: 0.4 }),
  S('baolien', 'Bảo Liên Thánh Hoa', 'quang', 'lotus', 3.0, 14, 20, 7, 24, { heal: 1.2 }),
  S('phuonghoang', 'Phượng Hoàng Niết Bàn', 'hoa', 'phoenix', 4.6, 20, 26, 8, 32),
];
export const skillByKey = new Map(SKILLS.map(s => [s.key, s]));

/* ------------------------------------------------------------ mẫu tu sĩ */
// 30 mẫu: lớp (cách đánh) × giới tính × bảng màu. Màn hình dựng thân, tóc, trang phục, vũ khí theo mẫu.
export type ClassKey = 'kiemtu' | 'daotu' | 'phapsu' | 'matu' | 'tiennu' | 'longtoc' | 'yeutoc' | 'thetu' | 'tranphap' | 'luyendan' | 'kiemtien' | 'mavuong' | 'thienton' | 'loitu' | 'banghoa';
export type Weapon = 'sword' | 'saber' | 'staff' | 'fan' | 'claw' | 'fist' | 'ribbon' | 'spear' | 'flag' | 'cauldron' | 'twin';
export interface ClassDef {
  key: ClassKey; name: string; els: Element[]; weapon: Weapon;
  hp: number; atk: number; def: number; spd: number; crit: number;
  role: 'melee' | 'ranged' | 'support';
}
export const CLASSES: ClassDef[] = [
  { key: 'kiemtu', name: 'Kiếm Tu', els: ['kiem', 'phong'], weapon: 'sword', hp: 1.0, atk: 1.15, def: 0.9, spd: 1.1, crit: 0.14, role: 'melee' },
  { key: 'daotu', name: 'Đao Tu', els: ['kiem', 'tho'], weapon: 'saber', hp: 1.15, atk: 1.15, def: 1.0, spd: 0.95, crit: 0.12, role: 'melee' },
  { key: 'phapsu', name: 'Pháp Sư', els: ['hoa', 'loi'], weapon: 'staff', hp: 0.85, atk: 1.25, def: 0.8, spd: 0.95, crit: 0.1, role: 'ranged' },
  { key: 'matu', name: 'Ma Tu', els: ['ma', 'hoa'], weapon: 'claw', hp: 1.05, atk: 1.2, def: 0.9, spd: 1.05, crit: 0.16, role: 'melee' },
  { key: 'tiennu', name: 'Tiên Nữ', els: ['quang', 'bang'], weapon: 'ribbon', hp: 0.9, atk: 1.0, def: 0.9, spd: 1.1, crit: 0.1, role: 'support' },
  { key: 'longtoc', name: 'Long Tộc', els: ['long', 'loi'], weapon: 'spear', hp: 1.25, atk: 1.1, def: 1.1, spd: 1.0, crit: 0.1, role: 'melee' },
  { key: 'yeutoc', name: 'Yêu Tộc', els: ['phong', 'ma'], weapon: 'claw', hp: 1.0, atk: 1.1, def: 0.9, spd: 1.25, crit: 0.18, role: 'melee' },
  { key: 'thetu', name: 'Thể Tu', els: ['tho', 'long'], weapon: 'fist', hp: 1.4, atk: 1.0, def: 1.3, spd: 0.9, crit: 0.08, role: 'melee' },
  { key: 'tranphap', name: 'Trận Pháp Sư', els: ['kiem', 'bang'], weapon: 'flag', hp: 0.9, atk: 1.15, def: 0.95, spd: 0.9, crit: 0.1, role: 'ranged' },
  { key: 'luyendan', name: 'Luyện Đan Sư', els: ['hoa', 'quang'], weapon: 'cauldron', hp: 1.0, atk: 0.95, def: 1.0, spd: 0.95, crit: 0.08, role: 'support' },
  { key: 'kiemtien', name: 'Kiếm Tiên', els: ['kiem', 'quang'], weapon: 'twin', hp: 1.0, atk: 1.3, def: 0.9, spd: 1.15, crit: 0.18, role: 'melee' },
  { key: 'mavuong', name: 'Ma Vương', els: ['ma', 'loi'], weapon: 'saber', hp: 1.25, atk: 1.25, def: 1.05, spd: 0.95, crit: 0.12, role: 'melee' },
  { key: 'thienton', name: 'Thiên Tôn', els: ['quang', 'loi'], weapon: 'fan', hp: 1.1, atk: 1.2, def: 1.1, spd: 1.0, crit: 0.12, role: 'ranged' },
  { key: 'loitu', name: 'Lôi Tu', els: ['loi', 'kiem'], weapon: 'staff', hp: 0.95, atk: 1.25, def: 0.85, spd: 1.05, crit: 0.14, role: 'ranged' },
  { key: 'banghoa', name: 'Băng Hoa Tiên', els: ['bang', 'phong'], weapon: 'fan', hp: 0.9, atk: 1.2, def: 0.9, spd: 1.05, crit: 0.12, role: 'ranged' },
];
export const classByKey = new Map(CLASSES.map(c => [c.key, c]));
export interface Archetype { id: number; cls: ClassKey; female: boolean; name: string; robe: number; trim: number; hair: number; hairStyle: number; skin: number }
// 30 mẫu = 15 lớp × nam/nữ, màu áo, tóc, kiểu tóc khác nhau
const ROBES = [0xcfc8b8, 0x2a3a6e, 0x7a1626, 0x1f1a2e, 0xc9a3b4, 0x16524a, 0x5b2b7a, 0x6b4a2a, 0x23395b, 0xb84a1f, 0xc8bea4, 0x2b0d18, 0xcdb98a, 0x3b2a7a, 0x9fb6c8];
const TRIMS = [0x7fc8ff, 0xd9b15a, 0xffcf6a, 0xb21e4b, 0xff8fc1, 0x6ff0c6, 0xc58bff, 0xe0a35a, 0x9fd0ff, 0xffb347, 0xd4af37, 0xff2d55, 0xffd76a, 0xa58bff, 0x8fe6ff];
const HAIRS = [0x111111, 0x1b1410, 0xe9e6f2, 0x2a1a33, 0x3a2416, 0x0d1b2a, 0xb9c3d1, 0x5a1010];
export const ARCHETYPES: Archetype[] = CLASSES.flatMap((c, i) => [false, true].map(female => ({
  id: i * 2 + (female ? 1 : 0), cls: c.key, female, name: `${c.name} ${female ? 'nữ' : 'nam'}`,
  robe: ROBES[(i + (female ? 7 : 0)) % ROBES.length], trim: TRIMS[(i + (female ? 3 : 0)) % TRIMS.length],
  hair: HAIRS[(i * 3 + (female ? 1 : 0)) % HAIRS.length], hairStyle: (i + (female ? 2 : 0)) % 5,
  skin: [0xf2d2b6, 0xe8c19f, 0xf6dcc6, 0xd9ae8c][(i + (female ? 1 : 0)) % 4],
})));
// từ khoá bình luận đổi lớp
export const CLASS_WORDS: [RegExp, ClassKey][] = [
  [/^(kiem ?tien)$/, 'kiemtien'], [/^(kiem|kiem ?tu)$/, 'kiemtu'], [/^(dao|dao ?tu)$/, 'daotu'], [/^(phap|phap ?su)$/, 'phapsu'],
  [/^(ma ?vuong)$/, 'mavuong'], [/^(ma|ma ?tu)$/, 'matu'], [/^(tien ?nu)$/, 'tiennu'], [/^(long|long ?toc|rong)$/, 'longtoc'],
  [/^(yeu|yeu ?toc)$/, 'yeutoc'], [/^(the ?tu|the)$/, 'thetu'], [/^(tran|tran ?phap)$/, 'tranphap'], [/^(dan|luyen ?dan)$/, 'luyendan'],
  [/^(thien ?ton)$/, 'thienton'], [/^(loi|loi ?tu|set)$/, 'loitu'], [/^(bang|bang ?hoa)$/, 'banghoa'],
];

/* ------------------------------------------------------------ pháp bảo */
export type ArtifactKey = 'phikiem' | 'thanhlong' | 'thandinh' | 'huyetma' | 'longchau' | 'kimchung' | 'cankhon' | 'phuongtruong' | 'baolien' | 'hondon';
export interface ArtifactDef { key: ArtifactKey; name: string; icon: string; color: number; shape: 'sword' | 'saber' | 'cauldron' | 'pearl' | 'bell' | 'tower' | 'staff' | 'lotus'; atk: number; def: number; hp: number }
export const ARTIFACTS: ArtifactDef[] = [
  { key: 'phikiem', name: 'Phi Kiếm', icon: '🗡️', color: 0x9fe8ff, shape: 'sword', atk: 0.04, def: 0, hp: 0 },
  { key: 'thanhlong', name: 'Thanh Long Kiếm', icon: '🐉', color: 0x4dffb0, shape: 'sword', atk: 0.06, def: 0, hp: 0.01 },
  { key: 'thandinh', name: 'Thần Đỉnh', icon: '🏺', color: 0xe0a35a, shape: 'cauldron', atk: 0.01, def: 0.03, hp: 0.05 },
  { key: 'huyetma', name: 'Huyết Ma Đao', icon: '🔪', color: 0xff2d55, shape: 'saber', atk: 0.08, def: 0, hp: 0 },
  { key: 'longchau', name: 'Long Châu', icon: '🔮', color: 0xffd04a, shape: 'pearl', atk: 0.05, def: 0.02, hp: 0.03 },
  { key: 'kimchung', name: 'Kim Chung', icon: '🔔', color: 0xffc93c, shape: 'bell', atk: 0, def: 0.08, hp: 0.04 },
  { key: 'cankhon', name: 'Càn Khôn Tháp', icon: '🗼', color: 0xb98bff, shape: 'tower', atk: 0.05, def: 0.06, hp: 0.04 },
  { key: 'phuongtruong', name: 'Phượng Hoàng Trượng', icon: '🔥', color: 0xff7a2a, shape: 'staff', atk: 0.09, def: 0.02, hp: 0.03 },
  { key: 'baolien', name: 'Bảo Liên Đăng', icon: '🪷', color: 0xff9ad5, shape: 'lotus', atk: 0.06, def: 0.06, hp: 0.08 },
  { key: 'hondon', name: 'Hỗn Độn Chung', icon: '🌌', color: 0x7bffd1, shape: 'bell', atk: 0.12, def: 0.1, hp: 0.1 },
];
export const artifactByKey = new Map(ARTIFACTS.map(a => [a.key, a]));
export const ARTIFACT_MAX = 30;
// cấp pháp bảo theo số lần nhận: lần 1 → cấp 1, 3 lần → cấp 2, 6 lần → cấp 3, 10 lần → cấp 4… (cộng dồn 1+2+3…)
export const artifactLevel = (n: number) => Math.min(ARTIFACT_MAX, Math.floor((Math.sqrt(8 * Math.max(0, n) + 1) - 1) / 2));

/* ------------------------------------------------------------ tông môn */
export interface SectDef { key: string; name: string; color: number; icon: string; words: RegExp }
export const SECTS: SectDef[] = [
  { key: 'thienkiem', name: 'Thiên Kiếm Tông', color: 0x7fc8ff, icon: '⚔️', words: /^(tong ?1|thien ?kiem( tong)?)$/ },
  { key: 'huyetma', name: 'Huyết Ma Điện', color: 0xff2d55, icon: '🩸', words: /^(tong ?2|huyet ?ma( dien)?)$/ },
  { key: 'thuylong', name: 'Thủy Long Cung', color: 0x3ff0ff, icon: '🌊', words: /^(tong ?3|thuy ?long( cung)?)$/ },
  { key: 'phuonghoa', name: 'Phượng Hỏa Các', color: 0xffa23a, icon: '🔥', words: /^(tong ?4|phuong ?hoa( cac)?)$/ },
];
export const sectByKey = new Map(SECTS.map(s => [s.key, s]));

/* ------------------------------------------------------------ Boss */
export type BossBody = 'dragon' | 'beast' | 'bird' | 'giant' | 'fox' | 'turtle';
export interface BossDef { key: string; name: string; body: BossBody; el: Element; color: number; color2: number; hp: number; atk: number; tails?: number; horns?: number; skills: string[] }
export const BOSSES: BossDef[] = [
  { key: 'haclong', name: 'Hắc Long', body: 'dragon', el: 'ma', color: 0x1a1426, color2: 0x8a3dff, hp: 1.0, atk: 1.0, horns: 2, skills: ['Long Tức Hắc Diễm', 'Vĩ Quét', 'Hắc Long Diệt Thế'] },
  { key: 'cuuvihi', name: 'Cửu Vĩ Hồ', body: 'fox', el: 'hoa', color: 0xfff0e0, color2: 0xff7ab8, hp: 0.9, atk: 1.05, tails: 9, skills: ['Hồ Hỏa', 'Mị Hoặc', 'Cửu Vĩ Phần Thiên'] },
  { key: 'maton', name: 'Ma Tôn', body: 'giant', el: 'ma', color: 0x2a0d18, color2: 0xff2d55, hp: 1.0, atk: 1.1, horns: 2, skills: ['Ma Chưởng', 'Huyết Hải', 'Vạn Ma Triều Tông'] },
  { key: 'thienma', name: 'Thiên Ma', body: 'giant', el: 'loi', color: 0x14102a, color2: 0xb48cff, hp: 1.05, atk: 1.1, horns: 4, skills: ['Ma Lôi', 'Thiên Ma Giải Thể', 'Ma Diệt Càn Khôn'] },
  { key: 'huyetma', name: 'Huyết Ma', body: 'giant', el: 'ma', color: 0x5a0a14, color2: 0xff3b3b, hp: 1.0, atk: 1.15, horns: 1, skills: ['Huyết Trảo', 'Huyết Vũ', 'Huyết Ma Đại Pháp'] },
  { key: 'kimsidaibang', name: 'Kim Sí Đại Bằng', body: 'bird', el: 'phong', color: 0xd4a017, color2: 0xfff1a8, hp: 0.95, atk: 1.1, skills: ['Kim Vũ', 'Cuồng Phong', 'Bằng Trình Vạn Lý'] },
  { key: 'bachho', name: 'Bạch Hổ', body: 'beast', el: 'kiem', color: 0xf4f4f4, color2: 0x7fc8ff, hp: 1.0, atk: 1.15, skills: ['Hổ Trảo', 'Hổ Khiếu', 'Bạch Hổ Sát Trận'] },
  { key: 'huyenvu', name: 'Huyền Vũ', body: 'turtle', el: 'bang', color: 0x1f4a4a, color2: 0x8fe6ff, hp: 1.4, atk: 0.85, skills: ['Huyền Thủy', 'Quy Giáp', 'Bắc Minh Hàn Băng'] },
  { key: 'chutuoc', name: 'Chu Tước', body: 'bird', el: 'hoa', color: 0xff4a1a, color2: 0xffd04a, hp: 0.95, atk: 1.15, skills: ['Chu Tước Hỏa Vũ', 'Liệt Diễm', 'Nam Minh Ly Hỏa'] },
  { key: 'kylan', name: 'Kỳ Lân', body: 'beast', el: 'quang', color: 0xffd76a, color2: 0x6ff0c6, hp: 1.1, atk: 1.0, horns: 1, skills: ['Kỳ Lân Đạp', 'Thánh Quang', 'Kỳ Lân Giáng Thế'] },
  { key: 'thaothiet', name: 'Thao Thiết', body: 'beast', el: 'ma', color: 0x3a2a1a, color2: 0xff8a2a, hp: 1.2, atk: 1.05, horns: 2, skills: ['Thôn Phệ', 'Ma Khiếu', 'Thao Thiết Nuốt Trời'] },
  { key: 'hondoncuthu', name: 'Hỗn Độn Cự Thú', body: 'beast', el: 'tho', color: 0x2b2b3a, color2: 0x7bffd1, hp: 1.35, atk: 1.0, horns: 3, skills: ['Hỗn Độn Va', 'Địa Chấn', 'Hỗn Độn Khai Thiên'] },
  { key: 'thienloithan', name: 'Thiên Lôi Thần', body: 'giant', el: 'loi', color: 0x22325a, color2: 0x9fd0ff, hp: 1.05, atk: 1.2, skills: ['Lôi Chùy', 'Lôi Vực', 'Cửu Tiêu Thần Lôi'] },
  { key: 'cuuthienhuyennu', name: 'Cửu Thiên Huyền Nữ', body: 'giant', el: 'quang', color: 0xf5f0ff, color2: 0xff9ad5, hp: 1.0, atk: 1.15, skills: ['Thiên Nữ Tán Hoa', 'Huyền Quang', 'Cửu Thiên Huyền Diệu'] },
  { key: 'thuongcothanlong', name: 'Thượng Cổ Thần Long', body: 'dragon', el: 'long', color: 0x3a2266, color2: 0xffd04a, hp: 1.6, atk: 1.25, horns: 2, skills: ['Thần Long Tức', 'Long Vĩ Phá Thiên', 'Thượng Cổ Long Uy'] },
];
export const bossByKey = new Map(BOSSES.map(b => [b.key, b]));

/* ------------------------------------------------------------ bảng quà */
// Tính theo giá MỘT món quà (combo x5 = làm 5 lần). Mọi quà đều cộng tu vi (60 tu vi / xu) và nâng cấp một pháp bảo.
// Đang đánh Boss: quà là đòn đánh Boss. Đang PK: quà là chiêu bùng nổ cho tu sĩ đang đấu (người tặng hoặc phe của họ).
export interface GiftTier { xu: number; key: string; name: string; icon: string; skill: string; vfx: Vfx; artifact?: ArtifactKey; bossMul: number; desc: string; global?: boolean }
export const TUVI_PER_XU = 60;
export const GIFT_TIERS: GiftTier[] = [
  { xu: 1, key: 'linhkhi', name: 'Linh Khí', icon: '✨', skill: 'kiemkhi', vfx: 'qiwave', bossMul: 1, desc: 'Hấp thu linh khí, tu luyện nhanh' },
  { xu: 5, key: 'kiemkhi', name: 'Kiếm Khí', icon: '🌀', skill: 'kiemkhi', vfx: 'qiwave', artifact: 'phikiem', bossMul: 1.2, desc: 'Phóng kiếm khí · nâng Phi Kiếm' },
  { xu: 10, key: 'phikiem', name: 'Phi Kiếm', icon: '🗡️', skill: 'phikiem', vfx: 'flysword', artifact: 'thanhlong', bossMul: 1.3, desc: 'Gọi phi kiếm · nâng Thanh Long Kiếm' },
  { xu: 30, key: 'linhdan', name: 'Linh Đan', icon: '💊', skill: 'hoiphuc', vfx: 'heal', artifact: 'thandinh', bossMul: 1.3, desc: 'Luyện đan hồi máu, tu vi lớn · nâng Thần Đỉnh' },
  { xu: 50, key: 'kiemtran', name: 'Kiếm Trận', icon: '⚔️', skill: 'kiemtran', vfx: 'swordarray', artifact: 'huyetma', bossMul: 1.4, desc: 'Triệu hồi kiếm trận diện rộng · nâng Huyết Ma Đao' },
  { xu: 99, key: 'hoalong', name: 'Hỏa Long', icon: '🐲', skill: 'hoalong', vfx: 'firedragon', artifact: 'longchau', bossMul: 1.5, desc: 'Triệu hồi Hỏa Long · nâng Long Châu' },
  { xu: 199, key: 'thienloi', name: 'Thiên Lôi Giáng Thế', icon: '⚡', skill: 'cuuthienthanloi', vfx: 'thunder', artifact: 'kimchung', bossMul: 1.6, desc: 'Sấm sét giáng xuống chiến trường · nâng Kim Chung' },
  { xu: 299, key: 'cankhon', name: 'Càn Khôn Tháp', icon: '🗼', skill: 'liasonphat', vfx: 'quake', artifact: 'cankhon', bossMul: 1.7, desc: 'Tháp trấn áp đối thủ · nâng Càn Khôn Tháp' },
  { xu: 500, key: 'thanthu', name: 'Triệu Hồi Thần Thú', icon: '🦅', skill: 'phuonghoang', vfx: 'phoenix', artifact: 'phuongtruong', bossMul: 1.9, desc: 'Phượng Hoàng lửa xuất thế · nâng Phượng Hoàng Trượng' },
  { xu: 999, key: 'vankiem', name: 'Vạn Kiếm Quy Tông', icon: '🌟', skill: 'vankiem', vfx: 'swordrain', artifact: 'baolien', bossMul: 2.1, desc: 'Mưa kiếm khắp trời · nâng Bảo Liên Đăng', global: true },
  { xu: 2999, key: 'thanlong', name: 'Thần Long Giáng Thế', icon: '👑', skill: 'cuulong', vfx: 'dragon', artifact: 'hondon', bossMul: 2.5, desc: 'VIP: Thần Long toàn bản đồ, tên bạn rực sáng · nâng Hỗn Độn Chung', global: true },
];
export const tierFor = (diamonds: number) => { let t = GIFT_TIERS[0]; for (const g of GIFT_TIERS) if (diamonds >= g.xu) t = g; return t; };

/* ------------------------------------------------------------ chỉ số */
export interface Stats { hp: number; atk: number; def: number; spd: number; crit: number; power: number }
export function statsOf(level: number, cls: ClassKey, arts: Partial<Record<ArtifactKey, number>> = {}): Stats {
  const c = classByKey.get(cls) ?? CLASSES[0];
  const g = Math.pow(1.16, level);
  let atkB = 1, defB = 1, hpB = 1, artPower = 0;
  for (const a of ARTIFACTS) {
    const lv = arts[a.key] || 0;
    if (!lv) continue;
    atkB += a.atk * lv; defB += a.def * lv; hpB += a.hp * lv;
    artPower += lv * 25 * (1 + ARTIFACTS.indexOf(a) * 0.6);
  }
  const hp = Math.round(120 * g * c.hp * hpB), atk = Math.round(14 * g * c.atk * atkB), def = Math.round(6 * g * c.def * defB);
  const spd = +(4.2 * c.spd).toFixed(2), crit = +Math.min(0.5, c.crit + level * 0.003).toFixed(3);
  const power = Math.round(atk * 6 + hp * 0.6 + def * 4 + artPower + level * 12);
  return { hp, atk, def, spd, crit, power };
}
// kỹ năng dùng được theo lớp và cảnh giới
export function skillsFor(cls: ClassKey, level: number): Skill[] {
  const c = classByKey.get(cls) ?? CLASSES[0];
  const list = SKILLS.filter(s => c.els.includes(s.el) && s.minLv <= level);
  if (c.role === 'support') for (const k of ['hoiphuc', 'kimcang', 'baolien']) { const s = skillByKey.get(k)!; if (s.minLv <= level && !list.includes(s)) list.push(s); }
  return list.length ? list : [SKILLS[0]];
}
export const norm = (s: string) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();

/* ------------------------------------------------------------ ngoại hình VIP */
// Bậc ngoại hình 0..5: lấy bậc cao nhất trong 3 đường (cảnh giới, tổng xu đã tặng, số lần lập công đánh Boss).
// Bậc càng cao nhân vật càng "víp": viền vàng → giáp vai vàng + áo choàng → mũ vàng + vòng sáng → cánh linh quang + hoàng bào
// → giáp vàng toàn thân, cánh lớn, người to hơn.
export const VIP_NAMES = ['Tu Sĩ', 'Tinh Anh', 'Chân Truyền', 'Thánh Tử', 'Tiên Quân', 'Chí Tôn'] as const;
export const VIP_COLORS = [0xffffff, 0x9fe8ff, 0x6dff9a, 0xffd04a, 0xff7bf2, 0xff4a2a];
export function vipTier(lv: number, xu: number, bossTop: number) {
  const r = realmOf(lv);
  const byRealm = r >= 13 ? 5 : r >= 11 ? 4 : r >= 9 ? 3 : r >= 6 ? 2 : r >= 3 ? 1 : 0;
  const byXu = xu >= 50_000 ? 5 : xu >= 10_000 ? 4 : xu >= 2000 ? 3 : xu >= 500 ? 2 : xu >= 100 ? 1 : 0;
  const byBoss = bossTop >= 30 ? 5 : bossTop >= 15 ? 4 : bossTop >= 8 ? 3 : bossTop >= 3 ? 2 : bossTop >= 1 ? 1 : 0;
  return Math.max(byRealm, byXu, byBoss);
}
