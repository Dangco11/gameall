// Cấp độ người chơi: tính theo tổng xu đã tặng qua mọi buổi live (lưu trong players.txt), nên buổi sau vào vẫn giữ cấp.
// Mỗi cấp một hào quang riêng (vẽ ở client/bar/aura.ts), cấp càng cao càng đẹp: cấp 8 mọc cánh thiên thần,
// cấp 9 cánh phượng hoàng lửa, cấp 10 có rồng thần cuộn quanh người.
export interface Level { lv: number; xu: number; name: string; icon: string; color: number }
export const LEVELS: Level[] = [
  { lv: 1,  xu: 1,    name: 'Tân Binh',     icon: '✨', color: 0xffffff },
  { lv: 2,  xu: 10,   name: 'Đồng',         icon: '🥉', color: 0xe0904a },
  { lv: 3,  xu: 30,   name: 'Bạc',          icon: '🥈', color: 0xcfdcff },
  { lv: 4,  xu: 60,   name: 'Ngọc Bích',    icon: '💠', color: 0x3ae0ff },
  { lv: 5,  xu: 100,  name: 'Hoàng Kim',    icon: '🥇', color: 0xffc23a },
  { lv: 6,  xu: 200,  name: 'Hỏa Thần',     icon: '🔥', color: 0xff6a20 },
  { lv: 7,  xu: 350,  name: 'Pha Lê',       icon: '🔮', color: 0xd050ff },
  { lv: 8,  xu: 500,  name: 'Thiên Thần',   icon: '👼', color: 0xfff0c0 },
  { lv: 9,  xu: 1000, name: 'Phượng Hoàng', icon: '🦅', color: 0xff5a1a },
  { lv: 10, xu: 2000, name: 'Long Vương',   icon: '🐉', color: 0x40ffd0 },
];
export const MAX_LEVEL = LEVELS.length;
// 0: chưa tặng gì
export function levelOf(xu: number){ let lv = 0; for (const l of LEVELS) if (xu >= l.xu) lv = l.lv; return lv; }
export const levelInfo = (lv: number) => LEVELS[Math.max(1, Math.min(MAX_LEVEL, lv)) - 1];
