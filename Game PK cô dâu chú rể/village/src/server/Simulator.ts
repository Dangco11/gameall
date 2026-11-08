import type { LiveEvent, Player } from '../shared/types.ts';

// TikTok LIVE giả lập: sự kiện đi đúng đường của sự kiện thật (qua hàng đợi, chống trùng).
// Mọi cư dân giả có id bắt đầu bằng sim_ và được gắn nhãn DEMO trên màn hình.
const NAMES = ['Út Mít', 'Hai Lúa', 'Ba Khía', 'Tư Ếch', 'Năm Sen', 'Sáu Dừa', 'Bảy Cò', 'Tám Ổi', 'Chín Mận', 'Mười Đậu', 'Bé Na', 'Cô Thắm', 'Chú Tèo',
  'Bà Hai', 'Ông Bảy', 'Anh Tý', 'Chị Bưởi', 'Thằng Cu', 'Bé Bông', 'Cô Ba Lụa', 'Anh Sửu', 'Chị Mơ', 'Út Hiền', 'Dì Năm', 'Cậu Tư', 'Thím Sáu', 'Bé Xoài', 'Anh Lành'];
const CHAT = ['Chúc mừng hạnh phúc!', 'Trăm năm hạnh phúc nha', 'Cô dâu đẹp quá trời', 'Chú rể bảnh ghê', 'ĂN CỖ', 'Dô dô!', 'Sớm sinh quý tử nha', 'Đẹp đôi quá', 'Cỗ ngon quá bà con ơi', 'Chúc hai bạn hạnh phúc'];
const GIFTS: [string, number][] = [['Hoa hồng', 1], ['Hoa hồng', 1], ['Kẹo bông', 5], ['Mũ', 30], ['Nhẫn', 100], ['Pháo hoa', 500]];

let seq = 0;
const msgId = () => `sim-${Date.now().toString(36)}-${(seq++).toString(36)}`;
export const simId = (name: string) => 'sim_' + name.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').replace(/\W+/g, '').toLowerCase();

export function simEvent(kind: LiveEvent['kind'], id: string, name: string, extra: Record<string, unknown> = {}): LiveEvent {
  return { kind, msgId: msgId(), id: id.startsWith('sim_') ? id : simId(id), name, sim: true, ...extra } as LiveEvent;
}

// Bot chọn lệnh theo tình trạng nhà mình, như người chơi thật hay làm.
// Khách ảo ở đám cưới: chúc mừng, khen cô dâu chú rể, rủ nhau ăn cỗ.
function pick(_p: Player | undefined, _festivalOpen: boolean, _contest: boolean, rng: () => number): string {
  return CHAT[Math.floor(rng() * CHAT.length)];
}

export interface SimContext { get(id: string): Player | undefined; festivalOpen(): boolean; contest(): boolean; leave(id: string): void }

export class Simulator {
  count = 0;
  private timer: NodeJS.Timeout | undefined;
  private push: (ev: LiveEvent) => void;
  private ctx: SimContext;
  private rng: () => number;

  constructor(push: (ev: LiveEvent) => void, ctx: SimContext, rng: () => number = Math.random){ this.push = push; this.ctx = ctx; this.rng = rng; }

  names(n: number){
    const out: string[] = [];
    for (let i = 0; i < n; i++) out.push(i < NAMES.length ? NAMES[i] : `${NAMES[i % NAMES.length]} ${Math.floor(i / NAMES.length) + 1}`);
    return out;
  }

  setBots(n: number){
    this.count = Math.max(0, Math.min(500, n | 0));
    clearInterval(this.timer);
    if (!this.count) return;
    const bots = this.names(this.count);
    for (const name of bots.slice(0, 40)) this.push(simEvent('comment', name, name, { text: 'VÀO LÀNG' }));
    let joined = 40;
    this.timer = setInterval(() => {
      if (joined < bots.length){ for (const name of bots.slice(joined, joined + 10)) this.push(simEvent('comment', name, name, { text: 'VÀO LÀNG' })); joined += 10; }
      // mỗi 0,5 giây khoảng 1/30 số bot lên tiếng, nên 100 bot là chừng 6 bình luận một giây
      const speak = Math.max(1, Math.round(this.count / 30 * this.rng() * 2));
      for (let i = 0; i < speak; i++){
        const name = bots[Math.floor(this.rng() * Math.min(joined, bots.length))];
        const p = this.ctx.get(simId(name)), r = this.rng();
        if (r < 0.06) this.push(simEvent('like', name, name, { count: 5 + Math.floor(this.rng() * 40) }));
        else if (r < 0.065){ const [gift, diamonds] = GIFTS[Math.floor(this.rng() * GIFTS.length)]; this.push(simEvent('gift', name, name, { gift, diamonds, count: 1 })); }
        else if (r < 0.068) this.push(simEvent('share', name, name));
        else this.push(simEvent('comment', name, name, { text: pick(p, this.ctx.festivalOpen(), this.ctx.contest(), this.rng) }));
      }
    }, 500);
  }

  stop(){ this.setBots(0); }

  // Cư dân giữ làng: chỉ chạy khi không có người xem thật nào đang chơi, để màn hình LIVE luôn có người ra vào, làm việc.
  // Một nhóm 10 người thay phiên: lúc nào cũng 2 đến 4 người trong làng, cứ chừng 1 đến 2 phút có người về, người khác đến.
  // Họ vẫn là cư dân mô phỏng, có nhãn DEMO, không lên bảng xếp hạng khi đang live thật.
  idle = false;
  private idleTimer: NodeJS.Timeout | undefined;
  private present: string[] = [];
  private nextSwap = 0;
  static readonly KEEPERS = ['Bà Hai', 'Chú Tư', 'Cô Năm', 'Anh Sáu', 'Út Mận', 'Bác Bảy', 'Chị Tám', 'Cậu Út', 'Dì Mười', 'Ông Chín'].map(n => n + ' (khách)');

  private arrive(){
    const free = Simulator.KEEPERS.filter(n => !this.present.includes(n));
    if (!free.length) return;
    const name = free[Math.floor(this.rng() * free.length)];
    this.present.push(name);
    this.push(simEvent('comment', name, name, { text: 'VÀO LÀNG' }));
  }

  private leave(){
    if (this.present.length <= 2) return;
    const name = this.present.splice(Math.floor(this.rng() * this.present.length), 1)[0];
    this.push(simEvent('comment', name, name, { text: ['Về nấu cơm đây bà con ơi', 'Tui về nghỉ chút nha', 'Hẹn mai gặp lại cả làng'][Math.floor(this.rng() * 3)] }));
    setTimeout(() => this.ctx.leave(simId(name)), 2500);
  }

  setIdle(on: boolean){
    if (on === this.idle) return;
    this.idle = on;
    clearInterval(this.idleTimer);
    if (!on){
      // người thật vào: cư dân giữ làng lần lượt về nhà
      this.present.forEach((name, i) => setTimeout(() => this.ctx.leave(simId(name)), 3000 + i * 4000));
      this.present = [];
      return;
    }
    this.arrive(); this.arrive();
    setTimeout(() => this.idle && this.arrive(), 8000);
    this.nextSwap = Date.now() + 60_000;
    let turn = 0;
    this.idleTimer = setInterval(() => {
      if (Date.now() > this.nextSwap){
        this.nextSwap = Date.now() + (60 + this.rng() * 60) * 1000;
        if (this.present.length >= 4 || (this.present.length > 2 && this.rng() < 0.5)) this.leave();
        else this.arrive();
        return;
      }
      if (!this.present.length) return;
      const name = this.present[turn++ % this.present.length];
      this.push(simEvent('comment', name, name, { text: pick(this.ctx.get(simId(name)), this.ctx.festivalOpen(), this.ctx.contest(), this.rng) }));
    }, 5000);
  }
}
