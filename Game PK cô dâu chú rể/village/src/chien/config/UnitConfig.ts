// Sáu cấp quân của Đại Chiến Nhà Trai – Nhà Gái. Mọi chỉ số chiến đấu nằm ở đây, logic không ghi số cứng.
// Tầm đánh, bán kính tính bằng mét trong cảnh cưới (người chibi cao khoảng 1,5 m). Thời gian tính bằng giây.
export type UnitKind = 'danbinh' | 'xathu' | 'dausi' | 'xechien' | 'trau' | 'voi';
export const UNIT_KINDS: UnitKind[] = ['danbinh', 'xathu', 'dausi', 'xechien', 'trau', 'voi'];
// swarm: quân số đông · ranged: bắn tuyến sau · tank: tuyến đầu · raider: đột kích cụm quân · breaker: phá đội hình · boss
export type UnitRole = 'swarm' | 'ranged' | 'tank' | 'raider' | 'breaker' | 'boss';
export type SkillKey = 'volley' | 'slam' | 'boost' | 'charge' | 'trample' | 'stomp' | 'roar';

export interface SkillDef {
  key: SkillKey; name: string; cd: number;
  windup: number;          // giây từ lúc ra chiêu tới lúc trúng (khớp hoạt ảnh)
  radius: number;          // bán kính vùng ảnh hưởng
  dmgMult: number;         // nhân với sát thương gốc
  stun: number;            // giây choáng
  knock: number;           // lực đẩy lùi
  lift: number;            // lực hất tung
  duration: number;        // thời gian hiệu lực (tăng tốc, húc, bắn liên tục)
  speedMult: number;       // nhân tốc độ khi hiệu lực
  range: number;           // tầm kích hoạt / quãng đường húc
  minTargets: number;      // tối thiểu bao nhiêu địch trong vùng mới ra chiêu
}
export interface UnitDef {
  key: UnitKind; tier: number; label: string; name: string; icon: string; role: UnitRole;
  hp: number; damage: number; speed: number;
  range: number;           // tầm đánh tính từ mép thân hai bên
  detect: number;          // tầm phát hiện địch
  attackCd: number; windup: number;
  radius: number; mass: number;
  armor: number;           // giảm sát thương 0..1
  crit: number; critMult: number;
  knock: number;           // đẩy lùi của đòn thường
  siege: number;           // nhân sát thương lên cổng và nhà chính
  boss: boolean; stackable: boolean;
  projectile: { speed: number; minRange: number } | null;
  block: { chance: number; reduce: number } | null;   // khiên chắn đòn từ phía trước
  skills: SkillDef[];
  giftValue: number;       // giá trị tham chiếu (xu) để tính sức mạnh làn
}

const skill = (s: Partial<SkillDef> & Pick<SkillDef, 'key' | 'name' | 'cd'>): SkillDef =>
  ({ windup: 0.3, radius: 0, dmgMult: 1, stun: 0, knock: 0, lift: 0, duration: 0, speedMult: 1, range: 0, minTargets: 1, ...s });

export const UNITS: Record<UnitKind, UnitDef> = {
  danbinh: {
    key: 'danbinh', tier: 1, label: '1X', name: 'Dân binh', icon: '🥢', role: 'swarm',
    hp: 100, damage: 5, speed: 3.5, range: 0.45, detect: 7, attackCd: 0.9, windup: 0.3,
    radius: 0.34, mass: 1, armor: 0, crit: 0.08, critMult: 1.8, knock: 0.4, siege: 1,
    boss: false, stackable: true, projectile: null, block: null, skills: [], giftValue: 1,
  },
  xathu: {
    key: 'xathu', tier: 2, label: '5X', name: 'Xạ thủ', icon: '🏹', role: 'ranged',
    hp: 180, damage: 15, speed: 3.2, range: 7, detect: 9.5, attackCd: 1.2, windup: 0.35,
    radius: 0.36, mass: 1, armor: 0.05, crit: 0.12, critMult: 2, knock: 0, siege: 0.6,
    boss: false, stackable: true, projectile: { speed: 18, minRange: 2.6 }, block: null,
    skills: [skill({ key: 'volley', name: 'Bắn liên tục', cd: 7, duration: 1.6, speedMult: 3.2, minTargets: 1 })], giftValue: 5,
  },
  dausi: {
    key: 'dausi', tier: 3, label: '10X', name: 'Đấu sĩ', icon: '🛡️', role: 'tank',
    hp: 500, damage: 35, speed: 2.8, range: 0.6, detect: 7.5, attackCd: 1.3, windup: 0.45,
    radius: 0.5, mass: 3, armor: 0.3, crit: 0.1, critMult: 1.8, knock: 0.8, siege: 1.2,
    boss: false, stackable: true, projectile: null, block: { chance: 0.35, reduce: 0.7 },
    skills: [skill({ key: 'slam', name: 'Đập búa', cd: 7, windup: 0.55, radius: 2.2, dmgMult: 2, stun: 1, knock: 2, lift: 0.6, minTargets: 2 })], giftValue: 10,
  },
  xechien: {
    key: 'xechien', tier: 4, label: '30X', name: 'Xe chiến', icon: '🚜', role: 'raider',
    hp: 1500, damage: 100, speed: 5.5, range: 0.7, detect: 10, attackCd: 1.5, windup: 0.2,
    radius: 0.9, mass: 8, armor: 0.35, crit: 0.1, critMult: 1.6, knock: 2, siege: 1.6,
    boss: false, stackable: false, projectile: null, block: null,
    skills: [skill({ key: 'boost', name: 'Tăng tốc tông', cd: 6, windup: 0, radius: 1.9, dmgMult: 1.6, stun: 0.6, knock: 4, lift: 2.2, duration: 1.8, speedMult: 2.1, range: 11, minTargets: 1 })], giftValue: 30,
  },
  trau: {
    key: 'trau', tier: 5, label: '100X', name: 'Kỵ binh trâu', icon: '🐃', role: 'breaker',
    hp: 5000, damage: 300, speed: 4, range: 0.9, detect: 10.5, attackCd: 1.6, windup: 0.35,
    radius: 1.1, mass: 20, armor: 0.25, crit: 0.12, critMult: 1.7, knock: 3, siege: 1.5,
    boss: true, stackable: false, projectile: null, block: null,
    skills: [
      skill({ key: 'charge', name: 'Húc xuyên hàng', cd: 8, windup: 0.35, radius: 1.4, dmgMult: 1.5, stun: 0.8, knock: 4, lift: 1.6, duration: 0.75, speedMult: 3, range: 8, minTargets: 2 }),
      skill({ key: 'trample', name: 'Giẫm đạp', cd: 1, windup: 0, radius: 1.5, dmgMult: 0.12, minTargets: 1 }),
    ], giftValue: 100,
  },
  voi: {
    key: 'voi', tier: 6, label: '500X', name: 'Tượng binh voi', icon: '🐘', role: 'boss',
    hp: 25000, damage: 1000, speed: 2.5, range: 1.5, detect: 12, attackCd: 2.2, windup: 0.6,
    radius: 1.8, mass: 100, armor: 0.4, crit: 0.1, critMult: 1.5, knock: 4, siege: 2,
    boss: true, stackable: false, projectile: null, block: null,
    skills: [
      skill({ key: 'stomp', name: 'Giẫm đất', cd: 6, windup: 0.8, radius: 3.6, dmgMult: 1.2, stun: 0.8, knock: 4, lift: 2.5, minTargets: 2 }),
      skill({ key: 'roar', name: 'Gầm vang', cd: 14, windup: 0.6, radius: 6.5, dmgMult: 0.3, stun: 2.2, knock: 1.2, minTargets: 5 }),
    ], giftValue: 500,
  },
};
