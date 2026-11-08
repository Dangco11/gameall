// Cấp chỗ ngồi. Số nhân vật hiển thị bị giới hạn bằng số ghế, ai chưa có ghế sẽ ở hàng chờ và không tốn tài nguyên vẽ.
import { SEATS, SEAT_BY_ID, zoneSearchOrder } from '../../shared/layout.mjs';

export class Seating {
  constructor() {
    this.occupant = new Map();   // SeatID -> TikTokID
    this.byZone = new Map();
    for (const seat of SEATS) {
      if (!this.byZone.has(seat.zone)) this.byZone.set(seat.zone, []);
      this.byZone.get(seat.zone).push(seat);
    }
  }
  isFree(id) { return SEAT_BY_ID.has(id) && !this.occupant.has(id); }
  allowed(seat, level) { return zoneSearchOrder(level).includes(seat.zone); }

  // preferred: chỗ cũ của khách quay lại, được ưu tiên nếu còn trống và vẫn đúng hạng.
  findFree(level, preferred) {
    const old = preferred && SEAT_BY_ID.get(preferred);
    const best = zoneSearchOrder(level)[0];
    if (old && this.isFree(preferred) && old.zone === best) return old;
    for (const zone of zoneSearchOrder(level)) {
      const free = (this.byZone.get(zone) || []).find(s => !this.occupant.has(s.id));
      if (free) return free;
    }
    return null;
  }
  take(seatId, playerId) { this.occupant.set(seatId, playerId); }
  release(seatId) { this.occupant.delete(seatId); }
  get used() { return this.occupant.size; }
}
