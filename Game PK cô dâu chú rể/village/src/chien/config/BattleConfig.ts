// Vòng đấu, căn cứ và nhịp mô phỏng.
// Mỗi vòng: đếm ngược → Tập hợp (gatherSec giây, hai nhà xếp quân trước cổng, không đánh nhau) → giao chiến (roundSec giây).
// Thời gian Tập hợp chỉnh riêng, không ăn vào thời gian đánh; host bấm Bắt đầu để xuất quân ngay.
export type PhaseKey = 'taphop' | 'giaotranh' | 'tongtancong' | 'boss' | 'quyetchien';
export interface PhaseDef { key: PhaseKey; name: string; from: number; to: number; march: boolean; dmg: number; speed: number; bossDmg: number; text: string }

export interface BattleConfig {
  gatherSec: number;       // giây Tập hợp
  roundSec: number;        // giây giao chiến sau Tập hợp
  countdownSec: number; resultSec: number; autoNext: boolean;
  tickMs: number;
  gather: PhaseDef;
  phases: PhaseDef[];      // các giai đoạn giao chiến, mốc tính trên khung 270 giây rồi co giãn theo roundSec
  base: { gateHp: number; houseHp: number; gateArmor: number; houseArmor: number; gateRadius: number; houseRadius: number };
}

export const BATTLE: BattleConfig = {
  gatherSec: 30, roundSec: 270, countdownSec: 5, resultSec: 15, autoNext: true,
  tickMs: 100,                                                   // mô phỏng 10 nhịp mỗi giây, màn hình nội suy giữa hai nhịp
  gather: { key: 'taphop', name: 'Tập hợp', from: 0, to: 0, march: false, dmg: 1, speed: 1, bossDmg: 1, text: 'Hai nhà tập hợp quân trước cổng' },
  phases: [
    { key: 'giaotranh', name: 'Giao tranh', from: 0, to: 60, march: true, dmg: 1, speed: 1, bossDmg: 1, text: 'Ba làn cùng xuất quân!' },
    { key: 'tongtancong', name: 'Tổng tấn công', from: 60, to: 150, march: true, dmg: 1.1, speed: 1.1, bossDmg: 1, text: 'Toàn quân tăng tốc, sát thương +10%' },
    { key: 'boss', name: 'Boss Battle', from: 150, to: 240, march: true, dmg: 1.1, speed: 1.1, bossDmg: 1.25, text: 'Trâu, voi mạnh thêm 25%' },
    { key: 'quyetchien', name: 'Quyết chiến', from: 240, to: 270, march: true, dmg: 1.5, speed: 1.15, bossDmg: 1.5, text: '30 giây cuối, sát thương x1,5!' },
  ],
  base: { gateHp: 15000, houseHp: 40000, gateArmor: 0.2, houseArmor: 0.1, gateRadius: 1.6, houseRadius: 3.0 },
};

// Giai đoạn giao chiến tại giây thứ t (tính từ lúc hết Tập hợp)
export function phaseAt(cfg: BattleConfig, t: number, duration = cfg.roundSec): PhaseDef {
  const k = t / Math.max(1, duration) * 270;
  return cfg.phases.find(p => k >= p.from && k < p.to) ?? cfg.phases[cfg.phases.length - 1];
}
