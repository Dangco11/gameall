// TikTok LIVE Simulator. Cùng giao diện với TikTokAdapter và chỉ được tạo khi chạy với --sim, ghi vào thư mục data-sim riêng.
// Chạy production không bao giờ nạp tệp này nên không thể có dữ liệu giả lẫn vào quán thật.
import { EventEmitter } from 'node:events';
import { MENU } from '../../shared/menu.mjs';

const NAMES = ['Bống', 'Tí Nị', 'Mây Xanh', 'Gấu Bông', 'Linh Chi', 'Bo Bo', 'Thỏ Trắng', 'Hải Đăng', 'Mèo Mun', 'Nắng Hạ', 'Cún Con', 'Minh Anh', 'Sóc Nâu', 'Khoai Tây', 'Trà My', 'Đậu Đỏ', 'Kem Dâu', 'Ngọc Hân', 'Tuấn Kiệt', 'Mít Ướt', 'Gia Hân', 'Bắp Rang', 'Hoàng Long', 'Bánh Bèo', 'Na Na', 'Vy Vy'];
const LINES = ['Quán xinh quá', 'Trà sữa ngon không shop?', 'Cho mình ghé với', 'Hello cả nhà', 'Thả tim cho quán nè', 'Hôm nay đông ghê', 'Thèm trà đào quá', 'gọi 11', 'gọi trà đào', 'Nhạc hay quá', 'Bạn nào sinh nhật thế?', 'Chúc quán đông khách'];
const GIFTS = [...new Set(MENU.map(x => x.coins))];
const pick = list => list[Math.floor(Math.random() * list.length)];

export class Simulator extends EventEmitter {
  constructor() {
    super();
    this.state = { status: 'simulated', uniqueId: 'simulator', error: '' };
    this.seq = 0; this.timer = null;
  }
  async connect() { this.emit('status', this.state); }
  async disconnect() { this.setBots(false); }

  person(name) {
    const clean = String(name || pick(NAMES)).slice(0, 24);
    const username = clean.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '_');
    return { id: `sim_${username}`, username, nickname: clean };
  }
  eventId() { return `sim-${Date.now()}-${++this.seq}`; }
  join(name) { this.emit('event', { type: 'join', eventId: this.eventId(), ...this.person(name) }); }
  comment(name, text) { this.emit('event', { type: 'comment', eventId: this.eventId(), ...this.person(name), text: text || pick(LINES) }); }
  like(name) { this.emit('event', { type: 'like', eventId: this.eventId(), ...this.person(name), count: 5 }); }
  share(name) { this.emit('event', { type: 'share', eventId: this.eventId(), ...this.person(name) }); }
  gift(name, coins, count = 1) {
    this.emit('event', { type: 'gift', eventId: this.eventId(), ...this.person(name), giftId: `g${coins}`, giftName: `Quà ${coins} xu`, count, diamonds: coins, streakable: false });
  }
  crowd(n) { for (let i = 0; i < n; i++) this.join(`${pick(NAMES)} ${Math.floor(Math.random() * 900) + 100}`); }

  setBots(on, every = 1400) {
    clearInterval(this.timer); this.timer = null;
    if (!on) return;
    const regulars = NAMES.slice();
    this.timer = setInterval(() => {
      const name = pick(regulars), r = Math.random();
      if (r < .25) this.join(name);
      else if (r < .6) this.comment(name);
      else if (r < .75) this.like(name);
      else if (r < .8) this.share(name);
      // Quà nhỏ thường xuyên, quà lớn hiếm dần
      else this.gift(name, GIFTS[Math.min(GIFTS.length - 1, Math.floor(Math.pow(Math.random(), 2.4) * GIFTS.length))]);
    }, every);
  }
}
