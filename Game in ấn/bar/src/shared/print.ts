// Live Print Studio: máy in khổ lớn cho TikTok LIVE. Người xem tặng quà là máy in ra một bản in cá nhân hoá
// (avatar, tên TikTok, danh hiệu, khung trang trí). Mọi con số, bậc quà và 100 mẫu khung nằm ở đây, server lẫn màn hình cùng dùng.
// Chỉ là hiệu ứng trong game, quà không đổi ra tiền hay phần thưởng.

/* ------------------------------------------------------------------ bậc quà */
export type TierKey = 'basic' | 'silver' | 'gold' | 'diamond' | 'legend' | 'vip';
export interface Tier {
  key: TierKey; no: number; name: string; label: string; rarity: string; stars: number; icon: string;
  xu: number;            // tổng xu một lần tặng (xu × số lượng) từ mức này
  ms: number;            // thời gian in (chưa tính nạp giấy, cắt giấy)
  big: boolean;          // in nguyên tờ (khổ lớn); không thì in một ô trong lưới 2×2
  color: string; code: string;
}
export const TIERS: Tier[] = [
  { key: 'basic',   no: 1, name: 'Ảnh in',          label: 'In ảnh đơn giản',            rarity: 'Thường',      stars: 1, icon: '🖨️', xu: 1,    ms: 5_000,  big: false, color: '#d9d2c2', code: 'BS' },
  { key: 'silver',  no: 2, name: 'Khung bạc',       label: 'In khung bạc',               rarity: 'Hiếm',        stars: 2, icon: '🥈', xu: 10,   ms: 6_500,  big: false, color: '#cfd8e6', code: 'SV' },
  { key: 'gold',    no: 3, name: 'Khung vàng',      label: 'In khổ lớn khung vàng',      rarity: 'Quý',         stars: 3, icon: '🥇', xu: 50,   ms: 9_000, big: true,  color: '#ffc85a', code: 'GD' },
  { key: 'diamond', no: 4, name: 'Khung kim cương', label: 'In khung kim cương VIP',     rarity: 'Sử thi',      stars: 4, icon: '💎', xu: 200,  ms: 11_000, big: true,  color: '#7fe3ff', code: 'DM' },
  { key: 'legend',  no: 5, name: 'Huyền thoại',     label: 'Máy in chế độ đặc biệt',     rarity: 'Huyền thoại', stars: 5, icon: '🐉', xu: 500,  ms: 14_000, big: true,  color: '#ff7a3a', code: 'LG' },
  { key: 'vip',     no: 6, name: 'VIP giới hạn',    label: 'Bản in VIP giới hạn có số',  rarity: 'Giới hạn',    stars: 6, icon: '👑', xu: 1000, ms: 17_000, big: true,  color: '#ff5ad0', code: 'VP' },
];
export const tierOf = (k: TierKey) => TIERS.find(t => t.key === k)!;
export const tierFor = (xu: number) => [...TIERS].reverse().find(t => xu >= t.xu) ?? TIERS[0];
export const isVipTier = (k: TierKey) => tierOf(k).no >= 4;        // máy in chuyển chế độ đặc biệt (LED đổi màu, laser, hào quang)

export const PRINT = {
  cells: 4,                    // bản in nhỏ xếp lưới 2×2 trên một tờ
  primeMs: 1_100,              // nạp giấy mới qua trục lăn
  ejectMs: 3_400,              // đẩy giấy ra, dao cắt, rơi xuống khay
  showMs: 6_500,               // bản in khổ lớn: đẩy ra, cắt, khoe thành phẩm
  idleEjectMs: 10_000,         // tờ in dở mà 10 giây không có quà mới thì đẩy ra luôn
  likesPerPrint: 50,           // thả đủ 50 tim (cộng dồn trong buổi live) là được in miễn phí một bản Ảnh in
  perUserQueued: 2,            // mỗi người tối đa 2 lượt đang chờ; quà thêm được cộng dồn vào lượt chờ cuối (không mất quà)
  vipEdition: 99,              // mỗi mẫu VIP giới hạn chỉ in 99 bản (có số thứ tự)
  keepPrints: 400,             // số bản in lưu lại cho phòng trưng bày
  paperW: 1.3, sheetL: 1.6,    // khổ giấy (mét) và chiều dài một tờ trong game
};
// Hàng đợi dài thì máy in nhanh hơn để không ai chờ quá lâu
export const speedFor = (waiting: number) => waiting >= 30 ? 0.35 : waiting >= 12 ? 0.5 : waiting >= 5 ? 0.7 : 1;

/* ------------------------------------------------------------------ 100 mẫu khung */
export type Shape = 'circle' | 'rounded' | 'hex' | 'oct' | 'shield' | 'rhombus' | 'arch' | 'oval' | 'scallop' | 'heart';
export type Layout = 'portrait' | 'card' | 'badge' | 'poster' | 'ticket' | 'stamp';
export type Border = 'line' | 'double' | 'dashed' | 'corners' | 'deco' | 'rope' | 'laurel' | 'filigree' | 'rays' | 'crystals'
  | 'flames' | 'petals' | 'wings' | 'circuit' | 'waves' | 'stars' | 'chain' | 'scales';
export type Ornament = 'none' | 'ribbon' | 'star' | 'crown' | 'tiara' | 'wings' | 'gem' | 'rose' | 'laurel' | 'flame' | 'trophy'
  | 'halo' | 'bolt' | 'moon' | 'sun' | 'lotus' | 'feather' | 'shield';
export type Pattern = 'plain' | 'dots' | 'lines' | 'grid' | 'sunburst' | 'damask' | 'hexgrid' | 'stars' | 'marble' | 'waves' | 'diagonal' | 'confetti';
export type Finish = 'ink' | 'silver' | 'gold' | 'rose' | 'holo' | 'obsidian' | 'crystal' | 'platinum';
export type Glow = 'none' | 'shine' | 'glow' | 'sparkle' | 'aura' | 'rainbow';
export type Sig = 'top1' | 'supervip' | 'legendary' | 'bigprint' | 'rosemaster' | 'king' | 'queen' | 'champion' | 'diamond' | 'immortal';
export interface Palette { bg: string; bg2: string; ink: string; accent: string; metal: string }
export interface Template {
  no: number; id: string; tier: TierKey; idx: number;          // idx: thứ tự trong bậc
  name: string; title: string;
  shape: Shape; layout: Layout; border: Border; ornament: Ornament; pattern: Pattern; finish: Finish; glow: Glow;
  pal: Palette; unlock: number;                                 // tổng xu đã tặng (mọi buổi) để mở khoá mẫu
  sig?: Sig;
}

const SHAPES: Shape[] = ['circle', 'rounded', 'hex', 'oct', 'shield', 'rhombus', 'arch', 'oval', 'scallop', 'heart'];
const LAYOUTS: Layout[] = ['portrait', 'card', 'badge', 'poster', 'ticket', 'stamp'];
const PATTERNS: Pattern[] = ['plain', 'dots', 'lines', 'grid', 'sunburst', 'damask', 'hexgrid', 'stars', 'marble', 'waves', 'diagonal', 'confetti'];
const P = (bg: string, bg2: string, ink: string, accent: string, metal: string): Palette => ({ bg, bg2, ink, accent, metal });

interface TierStyle { names: [string, string][]; borders: Border[]; ornaments: Ornament[]; finishes: Finish[]; glows: Glow[]; pals: Palette[] }
const STYLE: Record<TierKey, TierStyle> = {
  basic: {
    names: [['Polaroid Kem', 'FAN CỨNG'], ['Tem Thư Xanh', 'BẠN THÂN'], ['Vé Xem Phim', 'THÀNH VIÊN'], ['Sổ Tay Kẻ Ô', 'CẢM ƠN BẠN'], ['Giấy Kraft', 'NGƯỜI ỦNG HỘ'],
      ['Nhãn Dán Tròn', 'KHÁCH QUEN'], ['Bưu Thiếp Hồng', 'TÂN BINH'], ['Ảnh Thẻ Học Trò', 'BẠN MỚI'], ['Báo Cũ', 'CHIẾN HỮU'], ['Ghi Chú Vàng', 'ĐỒNG ĐỘI'],
      ['Mây Pastel', 'NGÔI SAO NHỎ'], ['Kẹo Ngọt', 'TIM HỒNG'], ['Lá Mùa Thu', 'BẠN ĐỒNG HÀNH'], ['Biển Xanh', 'FAN TRUNG THÀNH'], ['Bạc Hà', 'MẦM XANH'],
      ['Chấm Bi', 'HẠT GIỐNG'], ['Caro Đỏ', 'NGƯỜI TRUYỀN LỬA'], ['Giấy Than', 'ÁNH SÁNG NHỎ'], ['Bầu Trời Đêm', 'FAN NHÍ'], ['Cỏ Bốn Lá', 'MAY MẮN']],
    borders: ['line', 'dashed', 'double', 'corners', 'waves', 'stars', 'rope', 'circuit', 'chain'],
    ornaments: ['none', 'ribbon', 'star', 'feather', 'moon', 'sun', 'lotus', 'bolt'],
    finishes: ['ink'], glows: ['none'],
    pals: [P('#f4ecd8', '#e8dcc0', '#3a2a1a', '#c0392b', '#8a6a40'), P('#e7f2f7', '#cfe4ee', '#18384a', '#2a7fb8', '#5a8aa8'), P('#fbe9ee', '#f3d0da', '#5a1e30', '#e0507a', '#b06a80'),
      P('#eef5e6', '#d8e9c8', '#24401a', '#4c9a2a', '#6a8a50'), P('#fff6d8', '#f6e6a8', '#4a3a10', '#e0a020', '#a08030'), P('#ece8f6', '#d8d0ee', '#2a2050', '#6a50c8', '#7a70a8'),
      P('#f2efe9', '#dedad2', '#1a1a1a', '#222222', '#555555'), P('#e9f4f1', '#cde8e0', '#103a32', '#17a589', '#4a8a7a')],
  },
  silver: {
    names: [['Ánh Trăng Bạc', 'SILVER STAR'], ['Sóng Bạc', 'HIỆP SĨ BẠC'], ['Gương Bạc', 'NGÔI SAO BẠC'], ['Bạch Kim Lạnh', 'CHIẾN BINH'], ['Pha Lê Băng', 'VỆ THẦN'],
      ['Thép Xước', 'ĐẠI SỨ'], ['Ngôi Sao Bạc', 'SILVER FAN'], ['Lông Vũ Bạc', 'HỘ VỆ'], ['Huy Hiệu Bạc', 'NGƯỜI TIÊN PHONG'], ['Tuyết Trắng', 'KỴ SĨ'],
      ['Xích Bạc', 'THỦ LĨNH'], ['Mạch Điện Bạc', 'SILVER VIP'], ['Hoa Văn Bạc', 'ÁNH TRĂNG'], ['Khiên Bạc', 'BĂNG TUYẾT'], ['Nguyệt Quế Bạc', 'THIỆN XẠ'],
      ['Sương Mai', 'CAO THỦ'], ['Bạc Cổ Điển', 'NGHỆ SĨ'], ['Sấm Bạc', 'SAO MAI'], ['Bông Sen Bạc', 'KIẾM KHÁCH'], ['Hào Quang Bạc', 'TINH ANH']],
    borders: ['double', 'rope', 'laurel', 'corners', 'deco', 'crystals', 'circuit', 'chain', 'waves', 'stars'],
    ornaments: ['star', 'shield', 'feather', 'moon', 'laurel', 'gem', 'bolt', 'lotus', 'halo', 'ribbon'],
    finishes: ['silver', 'platinum', 'silver', 'crystal'], glows: ['shine', 'none', 'shine'],
    pals: [P('#1c2230', '#2c3548', '#f2f6ff', '#9fc4ff', '#dfe6f2'), P('#f3f5f8', '#dde3ea', '#26303c', '#5a7aa0', '#c8d0da'), P('#232a2f', '#3a454d', '#eef6f8', '#7ad8e8', '#d0dde2'),
      P('#eaf0f6', '#c8d6e6', '#1a2a3e', '#3a6aa8', '#b8c6d8'), P('#2a2438', '#3c3452', '#f4f0ff', '#b49cff', '#ddd8ea'), P('#f6f6f6', '#e2e2e2', '#202020', '#707070', '#cfcfcf')],
  },
  gold: {
    names: [['BIG PRINT', 'ĐẠI GIA'], ['ROSE MASTER', 'BẬC THẦY HOA HỒNG'], ['CHAMPION', 'NHÀ VÔ ĐỊCH'], ['Hoàng Kim', 'GOLD VIP'], ['Mặt Trời Vàng', 'HOÀNG KIM'],
      ['Kim Tuyến', 'QUÝ TỘC'], ['Huy Chương Vàng', 'TRÙM CUỐI'], ['Cúp Vàng', 'ĐẠI SỨ VÀNG'], ['Lá Vàng', 'KIM BÀI'], ['Cung Đình', 'NHÀ TÀI TRỢ'],
      ['Phượng Vàng', 'QUÝ NHÂN'], ['Kim Long Lân', 'KIM LONG'], ['Vương Miện Vàng', 'THẦN TÀI'], ['Ruy Băng Vàng', 'ÁNH DƯƠNG'], ['Đế Chế', 'HOÀNG TỘC'],
      ['Art Deco Vàng', 'BÁ TƯỚC'], ['Hổ Phách', 'TƯỚNG QUÂN'], ['Ngọn Lửa Vàng', 'HỎA THẦN'], ['Sao Hoàng Gia', 'NGÔI SAO VÀNG'], ['Lụa Vàng', 'ĐẠI GIA VÀNG']],
    borders: ['filigree', 'laurel', 'rays', 'deco', 'wings', 'rope', 'flames', 'petals', 'scales', 'chain'],
    ornaments: ['crown', 'trophy', 'sun', 'laurel', 'ribbon', 'star', 'tiara', 'flame', 'wings', 'gem'],
    finishes: ['gold', 'gold', 'rose', 'gold', 'obsidian'], glows: ['shine', 'glow', 'shine', 'sparkle'],
    pals: [P('#2a0a0e', '#4a1018', '#fff2d0', '#e0283a', '#ffc85a'), P('#fff8e6', '#f2dfa8', '#3a2408', '#b8862a', '#e8b54a'), P('#101010', '#262018', '#fff0c8', '#ffcf5a', '#e8b84a'),
      P('#3a0f2a', '#5a1a40', '#ffe8f2', '#ff6aa8', '#f0c080'), P('#0e1f2e', '#183048', '#fff4d8', '#ffd070', '#e8bc5a'), P('#f8efe0', '#ead2a8', '#2a1a08', '#c03020', '#d8a040')],
  },
  diamond: {
    names: [['SUPER VIP', 'SUPER VIP'], ['DIAMOND', 'KIM CƯƠNG'], ['KING', 'NHÀ VUA'], ['QUEEN', 'NỮ HOÀNG'], ['Kim Cương Xanh', 'DIAMOND VIP'],
      ['Pha Lê Tím', 'THIÊN TÀI'], ['Ngọc Lục Bảo', 'HOÀNG TỬ'], ['Ruby Đỏ', 'CÔNG CHÚA'], ['Sapphire', 'ĐẠI CÔNG TƯỚC'], ['Kim Cương Hồng', 'SIÊU SAO'],
      ['Băng Tinh', 'TINH TÚ'], ['Lăng Kính', 'NGỌC HOÀNG'], ['Thiên Hà', 'HUYỀN BĂNG'], ['Cực Quang', 'LĂNG KÍNH'], ['Sao Băng', 'THIÊN HÀ'],
      ['Hoàng Hậu Pha Lê', 'CỰC QUANG'], ['Ngai Kim Cương', 'SAO BĂNG'], ['Hồng Ngọc', 'HỒNG NGỌC'], ['Thạch Anh', 'BẢO VẬT'], ['Kim Cương Đen', 'HẮC KIM']],
    borders: ['crystals', 'filigree', 'rays', 'wings', 'deco', 'stars', 'petals', 'scales'],
    ornaments: ['gem', 'crown', 'tiara', 'halo', 'star', 'wings', 'moon', 'lotus'],
    finishes: ['holo', 'crystal', 'platinum', 'holo', 'obsidian'], glows: ['sparkle', 'glow', 'rainbow', 'sparkle'],
    pals: [P('#060818', '#141a3a', '#f0f8ff', '#6ae0ff', '#cfe8ff'), P('#14061e', '#2a0e3a', '#fff0ff', '#e070ff', '#f0d8ff'), P('#03140e', '#0a2a1e', '#effff6', '#3affa8', '#c8ffe8'),
      P('#1a0408', '#3a0a14', '#fff0f0', '#ff3a5a', '#ffd0d8'), P('#04101e', '#0a2440', '#eef6ff', '#4a9aff', '#d0e4ff'), P('#0a0a0e', '#1a1a24', '#ffffff', '#ff7ad8', '#e8e8ff')],
  },
  legend: {
    names: [['LEGENDARY', 'HUYỀN THOẠI'], ['IMMORTAL', 'BẤT TỬ'], ['Phượng Hoàng Lửa', 'PHƯỢNG HOÀNG'], ['Long Vương', 'LONG VƯƠNG'], ['Thần Sấm', 'THẦN SẤM'],
      ['Nữ Thần Ánh Trăng', 'NGUYỆT THẦN'], ['Thiên Sứ', 'THIÊN SỨ'], ['Hắc Long', 'HẮC LONG'], ['Mặt Trời Bất Diệt', 'THÁI DƯƠNG'], ['Thần Thoại', 'THẦN THOẠI']],
    borders: ['flames', 'wings', 'scales', 'rays', 'crystals', 'filigree'],
    ornaments: ['flame', 'wings', 'bolt', 'moon', 'halo', 'sun', 'crown', 'gem'],
    finishes: ['obsidian', 'gold', 'holo', 'rose'], glows: ['aura', 'glow', 'sparkle'],
    pals: [P('#120402', '#2e0a04', '#fff0d8', '#ff6a1a', '#ffc04a'), P('#06020e', '#180a2e', '#f4eaff', '#a05aff', '#e8d0ff'), P('#020a10', '#06202e', '#e8fbff', '#2ad8ff', '#bff0ff'),
      P('#0e0e0e', '#22201a', '#fff4d0', '#ffd24a', '#ffe08a')],
  },
  vip: {
    names: [['TOP 1', 'TOP 1'], ['Hoàng Đế', 'HOÀNG ĐẾ'], ['Thiên Hạ Đệ Nhất', 'ĐỆ NHẤT'], ['Ngân Hà VIP', 'NGÂN HÀ'], ['Kim Cương Hoàng Gia', 'HOÀNG GIA'],
      ['Vương Triều', 'VƯƠNG TRIỀU'], ['Đỉnh Cao', 'ĐỈNH CAO'], ['Huyền Thoại Sống', 'HUYỀN THOẠI SỐNG'], ['Bá Chủ', 'BÁ CHỦ'], ['Chí Tôn', 'CHÍ TÔN']],
    borders: ['wings', 'filigree', 'rays', 'crystals', 'flames', 'laurel'],
    ornaments: ['crown', 'wings', 'halo', 'gem', 'sun', 'trophy'],
    finishes: ['gold', 'holo', 'platinum', 'obsidian', 'rose'], glows: ['aura', 'rainbow', 'glow'],
    pals: [P('#2a0608', '#5a0a14', '#fff4d8', '#ff2a3a', '#ffcf5a'), P('#08041a', '#1c0e44', '#fff8ff', '#ff5ad0', '#ffe0f4'), P('#020812', '#0a1c38', '#f0fbff', '#5af0ff', '#e0f6ff'),
      P('#0c0a06', '#2a2010', '#fff8e0', '#ffd860', '#fff0b0')],
  },
};

// Mẫu chữ ký: 10 phong cách có thiết kế riêng (đặt tay, không sinh tự động)
const SIGS: Record<string, Partial<Template> & { sig: Sig }> = {
  'TOP 1':       { sig: 'top1',       shape: 'circle',  layout: 'portrait', border: 'filigree', ornament: 'crown',  pattern: 'sunburst', finish: 'gold',     glow: 'aura',    pal: P('#fbf3e2', '#efd9a6', '#5a0a10', '#d8142a', '#ffc24a') },
  'SUPER VIP':   { sig: 'supervip',   shape: 'circle',  layout: 'portrait', border: 'crystals', ornament: 'gem',    pattern: 'damask',   finish: 'gold',     glow: 'sparkle', pal: P('#0c0a14', '#1e1830', '#fff4d8', '#ff3a8a', '#ffd06a') },
  'LEGENDARY':   { sig: 'legendary',  shape: 'shield',  layout: 'poster',   border: 'flames',   ornament: 'wings',  pattern: 'sunburst', finish: 'obsidian', glow: 'aura',    pal: P('#100402', '#2a0c04', '#fff0d0', '#ff6a1a', '#ffc04a') },
  'BIG PRINT':   { sig: 'bigprint',   shape: 'rounded', layout: 'poster',   border: 'deco',     ornament: 'sun',    pattern: 'diagonal', finish: 'gold',     glow: 'shine',   pal: P('#101010', '#20201c', '#fff2c8', '#ffcf3a', '#f0c050') },
  'ROSE MASTER': { sig: 'rosemaster', shape: 'heart',   layout: 'portrait', border: 'petals',   ornament: 'rose',   pattern: 'damask',   finish: 'rose',     glow: 'glow',    pal: P('#fff0f2', '#f7c8d2', '#5a0a20', '#e0204a', '#f0a0a8') },
  'KING':        { sig: 'king',       shape: 'shield',  layout: 'card',     border: 'laurel',   ornament: 'crown',  pattern: 'damask',   finish: 'gold',     glow: 'glow',    pal: P('#0a1030', '#18245a', '#fff4d8', '#ffcf4a', '#ffd060') },
  'QUEEN':       { sig: 'queen',      shape: 'oval',    layout: 'portrait', border: 'filigree', ornament: 'tiara',  pattern: 'stars',    finish: 'platinum', glow: 'sparkle', pal: P('#2a0a30', '#4a1458', '#fff0ff', '#ff7ae0', '#f4e0ff') },
  'CHAMPION':    { sig: 'champion',   shape: 'oct',     layout: 'badge',    border: 'laurel',   ornament: 'trophy', pattern: 'sunburst', finish: 'gold',     glow: 'shine',   pal: P('#0a1a30', '#12305a', '#fff8e0', '#3aa8ff', '#ffcc4a') },
  'DIAMOND':     { sig: 'diamond',    shape: 'rhombus', layout: 'card',     border: 'crystals', ornament: 'gem',    pattern: 'hexgrid',  finish: 'holo',     glow: 'rainbow', pal: P('#040a18', '#0c1c3a', '#f0fbff', '#6ae8ff', '#dff6ff') },
  'IMMORTAL':    { sig: 'immortal',   shape: 'hex',     layout: 'badge',    border: 'wings',    ornament: 'halo',   pattern: 'stars',    finish: 'holo',     glow: 'aura',    pal: P('#04020c', '#140a2a', '#f8f0ff', '#b070ff', '#efe0ff') },
};

const ascii = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function build(): Template[] {
  const out: Template[] = [];
  for (const tier of TIERS){
    const st = STYLE[tier.key];
    st.names.forEach(([name, title], i) => {
      // hình ô ảnh chu kỳ 10, bố cục chu kỳ 6: cặp (hình, bố cục) lặp sau 30 mẫu nên 20 mẫu trong một bậc luôn khác nhau
      const base: Template = {
        no: out.length + 1, id: `${tier.code.toLowerCase()}-${String(i + 1).padStart(2, '0')}-${ascii(name)}`, tier: tier.key, idx: i, name, title,
        shape: SHAPES[(i * 3 + tier.no) % SHAPES.length], layout: LAYOUTS[(i + tier.no) % LAYOUTS.length],
        border: st.borders[(i * 3 + tier.no) % st.borders.length], ornament: st.ornaments[(i * 5 + 1) % st.ornaments.length],
        pattern: PATTERNS[(i * 5 + tier.no * 2) % PATTERNS.length], finish: st.finishes[i % st.finishes.length], glow: st.glows[i % st.glows.length],
        pal: st.pals[(i * 7 + tier.no) % st.pals.length],
        // 5 mẫu đầu mỗi bậc mở sẵn; sau đó mở dần theo tổng xu người đó đã tặng
        unlock: i < 5 ? 0 : tier.xu * [0, 2, 6, 15][Math.min(3, Math.floor(i / 5))],
      };
      const sig = SIGS[name];
      out.push(sig ? { ...base, ...sig, unlock: 0 } : base);
    });
  }
  return out;
}
export const TEMPLATES: Template[] = build();
export const templateOf = (no: number) => TEMPLATES[Math.max(1, Math.min(TEMPLATES.length, no | 0)) - 1];
export const templatesOf = (k: TierKey) => TEMPLATES.filter(t => t.tier === k);
export const TOP1_NO = TEMPLATES.find(t => t.sig === 'top1')!.no;

export interface PickOpts { lifetime: number; owned: Iterable<number>; seed: number; top1?: boolean; editions?: (no: number) => number }
// Chọn mẫu cho một lượt in: người đứng TOP 1 tháng tặng từ quà lớn trở lên thì in mẫu TOP 1; còn lại ưu tiên mẫu đã mở khoá mà người đó chưa có.
// Mẫu VIP giới hạn in đủ số bản thì hết; bậc VIP hết mẫu thì in mẫu Huyền thoại.
export function pickTemplate(tier: TierKey, o: PickOpts): Template {
  const top1 = templateOf(TOP1_NO);
  if (o.top1 && tierOf(tier).no >= 3 && (o.editions?.(top1.no) ?? 0) < PRINT.vipEdition) return top1;
  const owned = new Set(o.owned);
  for (const k of [tier, 'legend' as TierKey]){
    const all = templatesOf(k).filter(t => t.sig !== 'top1' && t.unlock <= o.lifetime && (t.tier !== 'vip' || (o.editions?.(t.no) ?? 0) < PRINT.vipEdition));
    if (!all.length) continue;
    const fresh = all.filter(t => !owned.has(t.no)), list = fresh.length ? fresh : all;
    return list[Math.abs(o.seed | 0) % list.length];
  }
  return templatesOf(tier)[0];
}

// Mã sản phẩm: GD-261107-0042 (bậc, ngày giờ Việt Nam, số thứ tự bản in)
export function productCode(tier: TierKey, n: number, at: number){
  const d = new Date(at + 7 * 3600_000).toISOString();
  return `${tierOf(tier).code}-${d.slice(2, 4)}${d.slice(5, 7)}${d.slice(8, 10)}-${String(n).padStart(4, '0')}`;
}
export const PRINT_HELP = ['Tặng quà là máy in ảnh của bạn', 'Quà càng lớn khung càng hiếm', '100 mẫu khung để sưu tập'];
