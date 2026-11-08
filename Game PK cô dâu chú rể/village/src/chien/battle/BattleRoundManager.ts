import { phaseAt } from '../config/BattleConfig.ts';
import type { BattleConfig, PhaseDef } from '../config/BattleConfig.ts';
import type { RoundState } from '../types.ts';

// Vòng đấu: đếm ngược → Tập hợp (gatherSec) → giao chiến qua 4 giai đoạn (duration) → kết thúc, hiện kết quả → (tự động) vòng mới.
// Tạm dừng thì đồng hồ đứng, quân đứng yên; tiếp tục thì chạy tiếp từ chỗ cũ. go() bỏ qua đếm ngược và Tập hợp, xuất quân ngay.
export type RoundSignal = 'countdown' | 'started' | 'phase' | 'timeout' | 'next' | 'paused' | 'resumed';

export class BattleRoundManager {
  state: RoundState = 'idle';
  round = 0; elapsed = 0; countdown = 0; resultLeft = 0;
  autoNext: boolean; duration: number; gatherSec: number; countdownSec: number;
  phase: PhaseDef;
  private before: RoundState = 'idle';
  private cfg: BattleConfig;

  constructor(cfg: BattleConfig){ this.cfg = cfg; this.autoNext = cfg.autoNext; this.duration = cfg.roundSec; this.gatherSec = cfg.gatherSec; this.countdownSec = cfg.countdownSec; this.phase = this.phaseNow(); }

  get running(){ return this.state === 'running'; }
  get inGather(){ return this.elapsed < this.gatherSec; }
  get gatherLeft(){ return Math.max(0, this.gatherSec - this.elapsed); }
  get battleTime(){ return Math.max(0, this.elapsed - this.gatherSec); }
  get left(){ return Math.max(0, this.duration - this.battleTime); }
  // quân đã được đi đánh chưa (đang Tập hợp thì đứng trước cổng)
  get marching(){ return this.state === 'running' && this.phase.march; }
  private phaseNow(){ return this.inGather ? this.cfg.gather : phaseAt(this.cfg, this.battleTime, this.duration); }

  // Bắt đầu vòng mới (từ chờ hoặc sau kết quả). Trả về false nếu đang có vòng chạy.
  begin(): boolean {
    if (this.state === 'running' || this.state === 'countdown' || this.state === 'paused') return false;
    this.round++; this.elapsed = 0; this.countdown = this.countdownSec; this.resultLeft = 0;
    this.phase = this.phaseNow(); this.state = 'countdown';
    return true;
  }
  // Host bấm Bắt đầu: bỏ đếm ngược và phần Tập hợp còn lại, xuất quân ngay. Trả về true nếu có thay đổi.
  go(): boolean {
    let changed = false;
    if (this.state === 'paused'){ this.state = this.before; changed = true; }
    if (this.state === 'countdown'){ this.state = 'running'; this.countdown = 0; changed = true; }
    if (this.state !== 'running' || !this.inGather) return changed;
    this.elapsed = this.gatherSec;
    return true;
  }
  end(){ if (this.state === 'idle' || this.state === 'ended') return false; this.state = 'ended'; this.resultLeft = this.cfg.resultSec; return true; }
  pause(){ if (this.state !== 'running' && this.state !== 'countdown') return false; this.before = this.state; this.state = 'paused'; return true; }
  resume(){ if (this.state !== 'paused') return false; this.state = this.before; return true; }
  reset(){ this.state = 'idle'; this.elapsed = 0; this.countdown = 0; this.resultLeft = 0; this.phase = this.phaseNow(); }

  tick(dt: number): RoundSignal[] {
    const out: RoundSignal[] = [];
    if (this.state === 'countdown'){
      this.countdown -= dt;
      if (this.countdown <= 0){ this.state = 'running'; this.countdown = 0; out.push('started'); }
    } else if (this.state === 'running'){
      this.elapsed += dt;
      if (this.battleTime >= this.duration) out.push('timeout');
    } else if (this.state === 'ended' && this.autoNext){
      this.resultLeft -= dt;
      if (this.resultLeft <= 0) out.push('next');
    }
    // đổi giai đoạn (kể cả khi host vừa bấm Bắt đầu hay đổi thời gian Tập hợp)
    if (this.state === 'running' || this.state === 'countdown'){ const p = this.phaseNow(); if (p.key !== this.phase.key){ this.phase = p; out.push('phase'); } }
    return out;
  }
}
