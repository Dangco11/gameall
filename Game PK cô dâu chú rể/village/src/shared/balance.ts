// Mọi con số cân bằng game nằm ở đây. Sửa một chỗ, cả server lẫn giao diện cùng đổi.
export const MAX_LOTS = 300;              // số lô đất hiển thị; hết lô thì người vắng lâu nhất nhường, dữ liệu vẫn giữ
export const START_MONEY = 120;
export const DAY_SECONDS = 480;           // một ngày trong làng dài 8 phút
export const DAYS_PER_SEASON = 4;
export const ONLINE_TIMEOUT_MS = 10 * 60_000;
export const COMMAND_COOLDOWN_MS = 1200;  // một người tối đa gần 1 lệnh mỗi giây
export const OFFLINE_CATCHUP_MS = 30 * 60_000;

export const SEASONS = ['Xuân', 'Hạ', 'Thu', 'Đông'] as const;
export const SEASON_GROWTH = [1.15, 1, 1.1, 0.8];

export const RICE = {
  seedCost: 5, growSeconds: 300, dryFactor: 0.25, fertFactor: 1.5, fertCost: 8,
  waterLasts: 120, canWaterLasts: 200, baseYield: 6, fertYield: 4, wateredYield: 2, hoeYield: 2,
};
export const FISH = {
  fryCost: 10, fryPack: 3, capacity: 9, feedCost: 3, growSeconds: 420, fedLasts: 150,
  catchCooldownMs: 60_000, catchChance: 0.5, rodChance: 0.7, bridgeChance: 0.05,
};
export const ANIMAL = {
  chickenCost: 20, duckCost: 25, capacity: 6, feedCost: 2, fedLasts: 180, eggSeconds: 120, eggStash: 24,
  matureSeconds: 300, youngSellRatio: 0.6,
};
export const MARKET_ITEMS = {
  rice:    { name: 'Lúa',   base: 5,  unit: 'bao' },
  fish:    { name: 'Cá',    base: 22, unit: 'con' },
  egg:     { name: 'Trứng', base: 3,  unit: 'quả' },
  chicken: { name: 'Gà',    base: 26, unit: 'con' },
  duck:    { name: 'Vịt',   base: 32, unit: 'con' },
} as const;
export type MarketItem = keyof typeof MARKET_ITEMS;
export const MARKET = { saleDrop: 0.004, minRatio: 0.6, maxRatio: 1.4, recover: 0.02, drift: 0.01, roadBonus: 0.05 };

export const HOUSES = [
  { name: 'Chòi lá',           cost: 0,     wood: 0,   brick: 0 },
  { name: 'Nhà tranh',         cost: 120,   wood: 5,   brick: 0 },
  { name: 'Nhà vách đất',      cost: 300,   wood: 10,  brick: 0 },
  { name: 'Nhà gỗ',            cost: 650,   wood: 20,  brick: 5 },
  { name: 'Nhà cấp bốn',       cost: 1300,  wood: 25,  brick: 20 },
  { name: 'Nhà ngói đỏ',       cost: 2400,  wood: 30,  brick: 40 },
  { name: 'Nhà ba gian',       cost: 4200,  wood: 40,  brick: 60 },
  { name: 'Nhà hiên rộng',     cost: 7000,  wood: 60,  brick: 90 },
  { name: 'Nhà lầu',           cost: 11000, wood: 80,  brick: 140 },
  { name: 'Biệt phủ đầu làng', cost: 18000, wood: 120, brick: 200 },
];
export const MATERIAL_PRICE = { wood: 4, brick: 3 };

export const DECOR = {
  codo:    { name: 'Cờ đỏ',    words: 'CO DO',    cost: 40,  score: 1 },
  denlong: { name: 'Đèn lồng', words: 'DEN LONG', cost: 60,  score: 2 },
  chaumai: { name: 'Chậu mai', words: 'CHAU MAI', cost: 90,  score: 3 },
  hangrao: { name: 'Hàng rào', words: 'HANG RAO', cost: 120, score: 4 },
  caycau:  { name: 'Cây cau',  words: 'CAY CAU',  cost: 150, score: 5 },
} as const;
export type DecorKey = keyof typeof DECOR;

export const TOOLS = {
  hoe: { name: 'Cuốc tốt',    words: 'CUOC',      cost: 150, note: '+2 lúa mỗi vụ' },
  can: { name: 'Bình tưới',   words: 'BINH TUOI', cost: 120, note: 'Ruộng giữ nước lâu hơn' },
  rod: { name: 'Cần câu tre', words: 'CAN CAU',   cost: 180, note: 'Câu dễ dính hơn' },
} as const;
export type ToolKey = keyof typeof TOOLS;

export const PROJECTS = {
  bridge: { name: 'Cầu làng',   stages: [{ name: 'Cầu tre', need: 300 }, { name: 'Cầu gỗ', need: 1500 }, { name: 'Cầu đá', need: 6000 }], perk: 'Câu cá dễ dính hơn' },
  road:   { name: 'Đường làng', stages: [{ name: 'Đường đá dăm', need: 500 }, { name: 'Đường bê tông', need: 3000 }], perk: 'Bán hàng thêm 5% mỗi cấp' },
  school: { name: 'Trường học', stages: [{ name: 'Lớp học tre', need: 800 }, { name: 'Trường ngói', need: 3000 }, { name: 'Trường hai tầng', need: 9000 }], perk: 'Kinh nghiệm thêm 10% mỗi cấp' },
  temple: { name: 'Đình làng',  stages: [{ name: 'Trùng tu đình', need: 1000 }, { name: 'Lợp ngói đình', need: 4000 }, { name: 'Đại đình', need: 12000 }], perk: 'Thưởng hội làng thêm 20% mỗi cấp' },
} as const;
export type ProjectKey = keyof typeof PROJECTS;
export const LIKE_POINTS = { perPoint: 20, hourlyCap: 30 };   // 20 tim = 1 điểm xây dựng, mỗi người tối đa 30 điểm một giờ
export const SHARE = { points: 20, cooldownMs: 5 * 60_000, money: 20 };

// Đám cưới làng quê (cảnh LIVE riêng): bình luận "nam" hoặc "nữ" rồi tặng từ 3 xu (cộng dồn) để vào vai chú rể, cô dâu đang trống.
// Quà từ 50 xu là cướp: nam cướp dâu (làm chú rể), nữ cướp rể (làm cô dâu), chưa chọn nam nữ thì cướp dâu. Vai trống thì vào luôn.
export const WEDDING = {
  ceremonyMs: 210_000,         // cả hôn lễ 3 phút rưỡi
  stealBonusMs: 20_000,        // mỗi lần cướp dâu thêm 20 giây cho kịch tính
  endMs: 25_000,               // rước dâu, pháo hoa rồi mở đám mới
  introMs: 30_000,             // MC giới thiệu mỗi người 30 giây
  ritualMs: 22_500,            // mỗi thủ tục 22,5 giây: lễ gia tiên, trao nhẫn, rượu giao bôi, cắt bánh cưới
  partyMinMs: 30_000,          // tiệc cưới còn ít nhất 30 giây (đủ giờ thì chừng 1 phút)
  mcEveryMs: 9_000,            // MC nói một câu mỗi 9 giây
  timeXu: 40, timeMs: 20_000,  // cứ 40 xu (cộng dồn từng người) thì lễ cưới thêm 20 giây
  timeMaxMs: 60_000,           // một lần tặng thêm tối đa 1 phút, quà lớn không kéo lễ dài mãi
  beerAskMs: 120_000,          // đang có khách mà 2 phút chưa ai gọi bia thì anh phục vụ mời gọi bia
  joinAskMs: 10_000,           // chưa đủ cô dâu chú rể: MC mời tặng 3 xu vào vai hoặc đọc một khổ vè, mỗi lần chừng 10 giây
  joinRestMs: 15_000,          // nói xong nghỉ 15 giây rồi mới tới câu tiếp
  joinRoundRestMs: 30_000,     // đọc hết một lượt (mời + 3 khổ vè) thì nghỉ 30 giây rồi đọc lại
  autoPickMs: 180_000,         // chờ 3 phút chưa đủ cô dâu chú rể thì làng chọn ngẫu nhiên người trong phòng
  joinXu: 3,                   // tặng đúng 3 xu (một lần, hoặc quà liên tiếp cộng dồn vừa đúng 3 xu) thì vào vai cô dâu, chú rể đang trống
  cuop: 50,                    // 50–98 xu là cướp: nam cướp dâu, nữ cướp rể, chưa chọn thì cướp dâu
  comboMs: 10_000,             // quà combo (10 xu x5...) của cùng người cách nhau dưới 10 giây được cộng dồn để xét cướp
  toastXu: 99,                 // từ 99 xu là quà nâng ly, không tính cướp
  tables: 8, seatsPerTable: 6,
  maxGuests: 130,              // khách dự tối đa; sân tự mở rộng khi đông (màn hình đám cưới)
};

// Thang quà đám cưới: mỗi mức một màn hiệu ứng (lấy mức cao nhất đạt được). Từ 50 xu là cướp dâu, cướp rể (xem stealFor).
// Chỉ là hiệu ứng trong game, không đổi ra tiền hay phần thưởng.
export type ShowKey = 'beer' | 'food' | 'confetti' | 'fireworks' | 'toast' | 'dance' | 'heartRain' | 'lion' | 'lantern' | 'rainbow' | 'grand';
export const GIFT_SHOW: { xu: number; key: ShowKey; icon: string; label: string; act?: string }[] = [
  { xu: 1, key: 'beer', icon: '🍺', label: 'Gọi bia, phục vụ bê ra mâm', act: 'gọi bia' },
  { xu: 5, key: 'food', icon: '🍗', label: 'Gọi thêm món ra mâm', act: 'gọi thêm món' },
  { xu: 10, key: 'confetti', icon: '🎉', label: 'Bắn pháo giấy', act: 'bắn pháo giấy mừng cưới' },
  { xu: 30, key: 'fireworks', icon: '🎆', label: 'Bắn pháo hoa', act: 'bắn pháo hoa mừng cưới' },
  { xu: 99, key: 'toast', icon: '🍻', label: 'Cả tiệc nâng ly, hô DZÔ!', act: 'mời cả đám cưới cùng nâng ly' },
  { xu: 200, key: 'dance', icon: '🕺', label: 'Cả sân cùng nhảy nhạc sàn xưa', act: 'mời cả đám cưới cùng nhảy' },
  { xu: 299, key: 'heartRain', icon: '💖', label: 'Mưa tim khắp sân' },
  { xu: 500, key: 'lion', icon: '🦁', label: 'Múa lân rộn ràng' },
  { xu: 1000, key: 'lantern', icon: '🏮', label: 'Hoàng hôn, thả đèn trời' },
  { xu: 1500, key: 'rainbow', icon: '🌈', label: 'Cầu vồng, mưa hoa vàng' },
  { xu: 2000, key: 'grand', icon: '👑', label: 'Pháo tim, tên bạn lên trời' },
];
export const showFor = (xu: number) => GIFT_SHOW.filter(g => xu >= g.xu);
// 50–59 xu: cướp dâu, người tặng làm chú rể. 60–98 xu: cướp rể, người tặng làm cô dâu.
// Vai kẻ cướp lấy: nữ cướp rể (làm cô dâu), nam hoặc chưa chọn thì cướp dâu (làm chú rể). Dưới 50 hay từ 99 xu thì không cướp.
export const stealFor = (xu: number, gender: '' | 'nam' | 'nu' = ''): 'groom' | 'bride' | null => xu >= WEDDING.toastXu || xu < WEDDING.cuop ? null : gender === 'nu' ? 'bride' : 'groom';

// PK cướp dâu, cướp rể (đang làm lễ mà có người tặng từ 50 xu): 2 phút hai đội đấu điểm.
// Mỗi quà cộng điểm bằng số xu cho đội mình và tung một chiêu theo mức xu. Chỉ là trò vui trong game.
export const PK = { ms: 120_000 };
export type PkSkillKey = 'kick' | 'dep' | 'chao' | 'gay' | 'tai' | 'hoidong';
export type PkSkill = { xu: number; key: PkSkillKey; icon: string; name: string; verb: string };
export const PK_SKILLS: PkSkill[] = [
  { xu: 1, key: 'kick', icon: '👢', name: 'Đá vào mông', verb: 'đá vào mông' },
  { xu: 5, key: 'dep', icon: '👡', name: 'Ném dép tổ ong', verb: 'ném dép tổ ong vào' },
  { xu: 10, key: 'chao', icon: '🍳', name: 'Dùng chảo đập đầu', verb: 'cầm chảo đập đầu' },
  { xu: 30, key: 'gay', icon: '🏏', name: 'Cầm gậy đuổi đánh', verb: 'cầm gậy đuổi đánh' },
  { xu: 52, key: 'tai', icon: '👂', name: 'Kéo tai chú rể', verb: 'kéo tai' },
  { xu: 100, key: 'hoidong', icon: '👊', name: 'Hai người lao vào đánh hội đồng', verb: 'rủ người lao vào đánh hội đồng' },
];
export const pkSkillFor = (xu: number) => [...PK_SKILLS].reverse().find(s => xu >= s.xu) ?? PK_SKILLS[0];

// Đại chiến Nhà trai – Nhà gái: trận 12 phút, ba phe góp sức mạnh bằng quà, bình luận và thả tim.
export type Team = 'trai' | 'gai' | 'cuop';
export type BattlePhase = 'idle' | 'recruit' | 'sinhle' | 'cuop' | 'phancong' | 'final';
export const TEAMS: Record<Team, { name: string; icon: string; leader: string }> = {
  trai: { name: 'Nhà trai', icon: '🤵', leader: 'Chú rể' },
  gai: { name: 'Nhà gái', icon: '👰', leader: 'Cô dâu' },
  cuop: { name: 'Cướp dâu', icon: '🎭', leader: 'Trùm cướp' },
};
export const BATTLE = {
  phases: [
    { key: 'recruit', ms: 120_000, name: 'Tuyển quân', when: 'Phút 0–2' },
    { key: 'sinhle', ms: 180_000, name: 'Đại chiến sính lễ', when: 'Phút 2–5' },
    { key: 'cuop', ms: 180_000, name: 'Cướp dâu', when: 'Phút 5–8' },
    { key: 'phancong', ms: 120_000, name: 'Phản công', when: 'Phút 8–10' },
    { key: 'final', ms: 120_000, name: 'Chung kết', when: 'Phút 10–12' },
  ] as { key: Exclude<BattlePhase, 'idle'>; ms: number; name: string; when: string }[],
  climaxMs: 10_000,              // 10 giây cuối phần Phản công: mọi điểm nhân đôi
  joinPts: 3,                    // vào phe được góp 3 sức mạnh
  cheerPts: 2, cheerCooldownMs: 5_000,   // bình luận cổ vũ: +2, mỗi người 5 giây một lần
  likesPerPt: 15,                // thả 15 tim = +1 sức mạnh
  drumMs: 15_000, drumX: 3,      // Trống: bình luận cổ vũ của phe x3
  shieldMs: 10_000,
  dragonMs: 20_000, dragonX: 1.5,
  crownMs: 30_000, crownX: 2,
  swordHit: 200, horseHit: 800, ultimatePct: 0.25,
  cuopX: 1.5,                    // phút 5–8 đội Cướp dâu tấn công: sức mạnh x1.5
};
export type BattleGiftKey = 'hoa' | 'phongbi' | 'trong' | 'ga' | 'khien' | 'kiem' | 'rong' | 'ngua' | 'vuongmien' | 'songlong';
export const BATTLE_GIFTS: { xu: number; key: BattleGiftKey; icon: string; name: string; label: string }[] = [
  { xu: 1, key: 'hoa', icon: '🌹', name: 'Hoa', label: '+1 sức mạnh' },
  { xu: 5, key: 'phongbi', icon: '🧧', name: 'Phong bì', label: '+5 sức mạnh' },
  { xu: 20, key: 'trong', icon: '🥁', name: 'Trống', label: 'Cổ vũ phe x3 (15 giây)' },
  { xu: 30, key: 'ga', icon: '🐔', name: 'Gà', label: '+30 sức mạnh' },
  { xu: 100, key: 'khien', icon: '🛡️', name: 'Khiên', label: 'Phòng thủ 10 giây' },
  { xu: 200, key: 'kiem', icon: '⚔️', name: 'Kiếm', label: 'Đánh phe dẫn đầu −200' },
  { xu: 500, key: 'rong', icon: '🐉', name: 'Rồng', label: 'Cả đội x1.5 (20 giây)' },
  { xu: 1000, key: 'ngua', icon: '🏇', name: 'Ngựa chiến', label: 'Tấn công đặc biệt −800' },
  { xu: 5000, key: 'vuongmien', icon: '👑', name: 'Vương miện', label: 'Làm Chủ soái, đội x2 (30 giây)' },
  { xu: 10000, key: 'songlong', icon: '🐲', name: 'Song long', label: 'Đại chiêu: phe khác −25%' },
];
export const battleGiftFor = (xu: number) => [...BATTLE_GIFTS].reverse().find(g => xu >= g.xu) ?? BATTLE_GIFTS[0];

export const FESTIVAL = {
  everyMs: 12 * 60_000, lobbyMs: 45_000, contestMs: 60_000, resultMs: 15_000, scoreGapMs: 1000,
  rewards: [150, 80, 40], participation: 10,
};
export const CONTESTS = {
  keoco:     { name: 'Kéo co',     how: 'Bình luận KÉO hoặc thả tim để kéo cho đội mình' },
  batvit:    { name: 'Bắt vịt',    how: 'Bình luận BẮT để vồ vịt' },
  cauca:     { name: 'Thi câu cá', how: 'Bình luận CÂU để giật cần' },
  duathuyen: { name: 'Đua thuyền', how: 'Bình luận CHÈO để bơi thuyền' },
  trangtri:  { name: 'Nhà đẹp',    how: 'Giám khảo chấm theo cấp nhà và đồ trang trí' },
} as const;
export type ContestKey = keyof typeof CONTESTS;

// Trang phục: chỉ để đẹp, không cộng chỉ số, nên quà mở trang phục thoải mái mà không lệch kinh tế.
// hat: 0 nón lá, 1 khăn rằn, 2 đầu trần, 3 nón quai thao, 4 khăn đóng. long: áo dài xuống gối.
export const COSTUMES = {
  baba:      { name: 'Áo bà ba nâu',    words: 'AO BA BA',       shirt: 0x7a4e2c, pants: 0x2a2420, hat: 1, hatColor: 0x2e4f7d, long: false, cost: 80,  rare: false },
  babatrang: { name: 'Áo bà ba trắng',  words: 'AO BA BA TRANG', shirt: 0xf3efe4, pants: 0x26221e, hat: 0, hatColor: 0xe6cf8f, long: false, cost: 90,  rare: false },
  aodai:     { name: 'Áo dài đỏ',       words: 'AO DAI',         shirt: 0xc8231d, pants: 0xf3efe4, hat: 4, hatColor: 0xc8231d, long: true,  cost: 250, rare: false },
  aodaixanh: { name: 'Áo dài xanh',     words: 'AO DAI XANH',    shirt: 0x2f6fae, pants: 0xf3efe4, hat: 4, hatColor: 0x2f6fae, long: true,  cost: 250, rare: false },
  tuthan:    { name: 'Áo tứ thân',      words: 'AO TU THAN',     shirt: 0x8a5a2b, pants: 0x3a2a1a, hat: 3, hatColor: 0xd9c07a, long: true,  cost: 450, rare: true },
  aothe:     { name: 'Áo the khăn xếp', words: 'AO THE',         shirt: 0x1f2a3a, pants: 0xf3efe4, hat: 4, hatColor: 0x1a1a1a, long: true,  cost: 600, rare: true },
  aogam:     { name: 'Áo gấm vàng',     words: 'AO GAM',         shirt: 0xe2b23c, pants: 0x7a1d12, hat: 4, hatColor: 0xe2b23c, long: true,  cost: 900, rare: true },
} as const;
export type CostumeKey = keyof typeof COSTUMES;

// Quà chỉ tăng tốc, góp xây làng, cho vật liệu, nâng nhà có hạn mức và mở trang phục.
// Quà không bao giờ đổi thẳng thành đồng hay thứ hạng giàu có.
// fx: kiểu hiệu ứng trên màn hình, level 0..4: độ rộn ràng của nhạc và bảng cảm ơn.
// outfit: 1 tặng áo thường, 2 tặng áo quý. house: số cấp nhà được nâng ngay.
const T = { skip: 0, neighbors: 0, wood: 0, brick: 0, rain: false, festival: false, decor: false, outfit: 0, house: 0 };
export const GIFT = {
  tiers: [
    { ...T, min: 1,    key: 'mua',    icon: '💧', fx: 'rain',    level: 0, name: 'Mưa rào',          skip: 60,  neighbors: 5,  desc: 'Tưới, cho ăn, tăng tốc 1 phút cho bạn và 5 nhà xóm' },
    { ...T, min: 5,    key: 'phan',   icon: '🌱', fx: 'leaf',    level: 1, name: 'Phân bón',         skip: 180, neighbors: 10, wood: 2, brick: 2, desc: 'Tăng tốc 3 phút, thêm vật liệu' },
    { ...T, min: 10,   key: 'may',    icon: '👕', fx: 'outfit',  level: 1, name: 'Tiệm may',         skip: 60,  neighbors: 3,  outfit: 1, desc: 'May tặng một bộ áo mới: áo bà ba, áo dài' },
    { ...T, min: 30,   key: 'mua2',   icon: '🌈', fx: 'rainbow', level: 2, name: 'Được mùa',         skip: 300, neighbors: 20, wood: 8, brick: 8, rain: true, desc: 'Mưa khắp làng, tăng tốc 5 phút' },
    { ...T, min: 50,   key: 'xe',     icon: '🧱', fx: 'bricks',  level: 2, name: 'Xe gỗ gạch',       skip: 120, neighbors: 5,  wood: 25, brick: 25, desc: 'Chở 50 gỗ gạch về nhà để xây nhà' },
    { ...T, min: 100,  key: 'tho',    icon: '🔨', fx: 'coins',   level: 3, name: 'Thợ về làng',      skip: 300, neighbors: 40, wood: 20, brick: 20, rain: true, decor: true, desc: 'Xây nhanh công trình, tặng một món trang trí' },
    { ...T, min: 199,  key: 'xaynha', icon: '🏠', fx: 'house',   level: 3, name: 'Thợ xây nhà',      skip: 300, neighbors: 10, wood: 20, brick: 20, house: 1, desc: 'Nâng nhà bạn lên 1 cấp ngay' },
    { ...T, min: 299,  key: 'aoquy',  icon: '👘', fx: 'outfit2', level: 3, name: 'Áo quý',           skip: 300, neighbors: 20, outfit: 2, decor: true, desc: 'Áo tứ thân, áo the, áo gấm và một món trang trí' },
    { ...T, min: 500,  key: 'hoi',    icon: '🏮', fx: 'lantern', level: 4, name: 'Mở hội cả làng',   skip: 300, neighbors: 80, wood: 40, brick: 40, rain: true, festival: true, decor: true, desc: 'Mở hội làng ngay, đèn trời, pháo hoa' },
    { ...T, min: 1000, key: 'daigia', icon: '👑', fx: 'grand',   level: 4, name: 'Đại gia làng',     skip: 300, neighbors: 120, wood: 40, brick: 40, rain: true, festival: true, decor: true, outfit: 2, house: 1, desc: 'Nâng nhà, áo quý, mở hội, pháo hoa khắp làng' },
  ],
  dailySkipSeconds: 1800,      // mỗi người được tăng tốc tối đa 30 phút một ngày, phần dư chuyển sang xây làng
  dailyMaterials: 160,         // vật liệu nhận từ quà tối đa mỗi ngày
  dailyHouseLevels: 2,         // quà nâng nhà tối đa 2 cấp mỗi ngày; quá mức thì đổi thành vật liệu
  pointsPerDiamond: 1,
  maxStageShare: 0.25,         // một lần tặng góp tối đa 25% hạng mục đang xây
};

export type GiftTier = (typeof GIFT.tiers)[number];
export const TITLES: [number, string][] = [
  [1, 'Dân mới về làng'], [3, 'Người làm ruộng'], [6, 'Nông dân chăm chỉ'], [10, 'Lão nông'],
  [15, 'Phú hộ'], [22, 'Hương lý'], [30, 'Bô lão'],
];
export const xpForLevel = (lv: number) => Math.round(40 * Math.pow(lv - 1, 1.6));
export function levelFromXp(xp: number){ let lv = 1; while (lv < 60 && xp >= xpForLevel(lv + 1)) lv++; return lv; }
export function titleForLevel(lv: number){ let t = TITLES[0][1]; for (const [m, n] of TITLES) if (lv >= m) t = n; return t; }
export const XP = { rice: 3, harvest: 15, fishFeed: 2, fishHarvest: 12, catch: 6, animal: 2, eggs: 4, sell: 3, house: 40, festival: 10 };

export const OUTFIT = {
  shirts: [0xc2452d, 0x2f6f8f, 0x3e8e5a, 0xd29a2e, 0x8a4f9e, 0xe07b53, 0x4a4e8c, 0xf2ede0, 0x2d3a3a, 0xb8324f],
  pants:  [0x2c2a26, 0x3b3f4a, 0x5b4632, 0x20323a, 0x4b5b3a],
  hats:   3,                 // 0 nón lá, 1 khăn rằn, 2 đầu trần
};

// Lệnh hiện trên màn hình LIVE
export const COMMAND_HELP = ['VÀO LÀNG', 'XEM NHÀ', 'TRỒNG LÚA', 'TƯỚI NƯỚC', 'CHO GÀ ĂN', 'CHO CÁ ĂN', 'CÂU CÁ', 'RA CHỢ', 'THAM GIA HỘI LÀNG'];
export const COMMAND_MORE = ['THU HOẠCH', 'BÓN PHÂN', 'MUA CÁ', 'THU CÁ', 'MUA GÀ', 'MUA VỊT', 'THU TRỨNG', 'BÁN LÚA', 'XÂY NHÀ', 'GÓP 50', 'MUA ĐÈN LỒNG', 'MUA ÁO BÀ BA', 'MUA ÁO DÀI', 'ĐỔI ÁO'];
