import { SIM_GIFTS } from '../config/GiftConfig.ts';
import type { GiftEvent, TeamKey } from '../types.ts';

// Gift Simulator: chạy thử không cần TikTok. Sự kiện đi đúng đường của quà thật (chống trùng, combo, hàng đợi).
// Mọi người chơi giả có id bắt đầu bằng sim_ và dùng ảnh đại diện mặc định.
const NAMES = ['Út Mít', 'Hai Lúa', 'Ba Khía', 'Tư Ếch', 'Năm Sen', 'Sáu Dừa', 'Bảy Cò', 'Tám Ổi', 'Chín Mận', 'Mười Đậu', 'Bé Na', 'Cô Thắm', 'Chú Tèo', 'Bà Hai', 'Ông Bảy',
  'Anh Tý', 'Chị Bưởi', 'Cu Tí', 'Bé Bông', 'Cô Ba Lụa', 'Anh Sửu', 'Chị Mơ', 'Út Hiền', 'Dì Năm', 'Cậu Tư', 'Thím Sáu', 'Bé Xoài', 'Anh Lành', 'Chú Tư Rể', 'Cô Út Dâu'];
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').replace(/\W+/g, '').toLowerCase();
export const simUserId = (name: string) => 'sim_' + (fold(name) || 'khach');

export interface SimGift { user?: string; name: string; avatar?: string; team?: TeamKey; value: number; count: number; combo?: boolean; giftId?: string; giftName?: string }

export class GiftSimulator {
  private seq = 0;
  private push: (ev: GiftEvent) => void;
  private later: (fn: () => void, ms: number) => void;
  private rnd: () => number;
  constructor(push: (ev: GiftEvent) => void, later: (fn: () => void, ms: number) => void = (f, ms) => { setTimeout(f, ms); }, rnd: () => number = Math.random){
    this.push = push; this.later = later; this.rnd = rnd;
  }
  private id(){ return `sim-${Date.now().toString(36)}-${(this.seq++).toString(36)}`; }
  private base(g: SimGift): Omit<GiftEvent, 'EventId' | 'RepeatCount' | 'IsComboEnd' | 'Streakable'> {
    const info = SIM_GIFTS.find(x => x.value === g.value);
    return { UserId: g.user || simUserId(g.name), Username: g.user || simUserId(g.name), DisplayName: g.name, AvatarUrl: g.avatar ?? '', GiftId: g.giftId ?? info?.giftId ?? `sim-${g.value}`,
      GiftName: g.giftName ?? info?.name ?? `Quà ${g.value} xu`, GiftValue: g.value, GroupId: '', Timestamp: Date.now(), Sim: true, Team: g.team };
  }

  // Một lần tặng: quà lẻ (count cái trong một tin) hoặc combo (TikTok gửi nhiều tin, số lặp tăng dần, có tin kết thúc).
  // Combo còn cố tình gửi lại vài tin cũ như khi mạng chập chờn, để kiểm tra chống trùng: kết quả vẫn đúng count quân.
  gift(g: SimGift){
    const count = Math.max(1, Math.min(500, Math.floor(g.count) || 1));
    if (!g.combo){ this.push({ ...this.base(g), EventId: this.id(), RepeatCount: count, IsComboEnd: true, Streakable: false }); return; }
    const b = { ...this.base(g), GroupId: 'g' + this.seq }, sent: GiftEvent[] = [];
    for (let n = 1; n <= count; n++){
      const ev: GiftEvent = { ...b, EventId: this.id(), RepeatCount: n, IsComboEnd: n === count, Streakable: true };
      sent.push(ev);
      this.later(() => {
        this.push(ev);
        if (n % 4 === 0) this.push({ ...sent[n - 2] });              // gửi lại tin trước đó (trùng EventId)
        if (n === count) this.push({ ...ev, EventId: this.id(), IsComboEnd: true });   // tin kết thúc lặp lại với EventId mới, cùng số lặp
      }, n * 110);
    }
  }

  test(what: 'trai' | 'gai' | 'u100' | 'u300' | 'combo' | 'boss' | 'mix'){
    const people = (n: number, off = 0) => Array.from({ length: n }, (_, i) => NAMES[(i + off) % NAMES.length] + (i + off >= NAMES.length ? ' ' + (Math.floor((i + off) / NAMES.length) + 1) : ''));
    switch (what){
      case 'trai': case 'gai':
        people(6, what === 'gai' ? 15 : 0).forEach((name, i) => this.later(() => {
          this.gift({ name, team: what, value: 1, count: 2 + (i % 3) });
          this.gift({ name, team: what, value: [5, 10, 5, 30, 10, 5][i], count: 1 });
        }, i * 250));
        break;
      case 'u100': case 'u300': {
        const total = what === 'u100' ? 100 : 300, ppl = people(total / 10);
        ppl.forEach((name, i) => {
          const team: TeamKey = i % 2 ? 'gai' : 'trai';
          // mỗi người 10 quân: 1 quà 1 xu (5 dân binh) + 1 quà 5 xu (5 xạ thủ), dồn dập như lúc live đông
          this.later(() => { this.gift({ name, team, value: 1, count: 1 }); this.gift({ name, team, value: 5, count: 1 }); }, i * 40);
        });
        break;
      }
      case 'combo': this.gift({ name: 'Combo Test', team: 'trai', value: 1, count: 10, combo: true }); break;
      case 'boss':
        this.gift({ name: 'Đại Gia Trai', team: 'trai', value: 500, count: 1 });
        this.later(() => this.gift({ name: 'Đại Gia Gái', team: 'gai', value: 100, count: 1 }), 1500);
        this.later(() => this.gift({ name: 'Đại Gia Gái', team: 'gai', value: 500, count: 1 }), 3500);
        break;
      case 'mix': {
        const ppl = people(12, 3);
        ppl.forEach((name, i) => this.later(() => this.gift({ name, value: SIM_GIFTS[Math.floor(this.rnd() * 4)].value, count: 1 + Math.floor(this.rnd() * 5), combo: this.rnd() < 0.4 }), i * 300));
        break;
      }
    }
  }
}
