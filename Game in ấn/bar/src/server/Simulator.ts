import type { LiveEvent } from '../shared/types.ts';

// Bảng thử (mô phỏng TikTok LIVE): sự kiện đi đúng đường của sự kiện thật (qua hàng đợi, chống trùng).
// Mọi khách thử có id bắt đầu bằng sim_ và được gắn nhãn DEMO trên màn hình.
let seq = 0;
const msgId = () => `sim-${Date.now().toString(36)}-${(seq++).toString(36)}`;
export const simId = (name: string) => 'sim_' + name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').replace(/\W+/g, '').toLowerCase();

export function simEvent(kind: LiveEvent['kind'], id: string, name: string, extra: Record<string, unknown> = {}): LiveEvent {
  return { kind, msgId: msgId(), id: id.startsWith('sim_') ? id : simId(id), name, sim: true, ...extra } as LiveEvent;
}
