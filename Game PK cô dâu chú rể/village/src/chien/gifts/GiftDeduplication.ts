import type { GiftEvent } from '../types.ts';

// Chống trùng hai tầng:
//  1. EventId đã xử lý thì bỏ (TikTok phát lại tin cũ khi nối lại mạng, server khởi động lại thì nạp lại từ nhật ký).
//  2. Combo: TikTok gửi cùng một combo nhiều lần với số lặp lũy kế 1, 2, 3... Chỉ tính phần MỚI tăng thêm.
//     Gửi lại đúng số lặp cũ (trùng, đến muộn, sai thứ tự) thì ra 0 quân. Combo 10 lần → đúng 10 quân.
export class GiftDeduplication {
  duplicates = 0; combosMerged = 0;
  private seen = new Set<string>();
  private streaks = new Map<string, { n: number; at: number; ended: boolean }>();
  private limit: number;
  constructor(limit = 50_000){ this.limit = limit; }

  remember(ids: Iterable<string>){ for (const id of ids) this.mark(id); }
  private mark(id: string){ this.seen.add(id); if (this.seen.size > this.limit) this.seen.delete(this.seen.values().next().value as string); }
  hasSeen(id: string){ return this.seen.has(id); }

  static comboKey(e: GiftEvent){ return `${e.UserId}|${e.GiftId}|${e.GroupId}`; }
  // khóa chống trùng; tin combo kèm số lặp, phòng khi nguồn sự kiện dùng chung EventId cho cả combo
  static key(e: GiftEvent){ return e.EventId ? (e.Streakable ? `${e.EventId}#${Math.max(1, Math.floor(e.RepeatCount) || 1)}` : e.EventId) : ''; }

  // Trả về số quà MỚI cần tính cho sự kiện này (0 = bỏ qua)
  accept(e: GiftEvent, now = Date.now()): number {
    const rep = Math.max(1, Math.floor(e.RepeatCount) || 1), key = GiftDeduplication.key(e);
    if (key && this.seen.has(key)){ this.duplicates++; return 0; }
    let fresh = rep;
    if (e.Streakable){
      const ck = GiftDeduplication.comboKey(e), prev = this.streaks.get(ck);
      // combo đã kết thúc mà số lặp quay về nhỏ hơn (hoặc đã quá 60 giây): đây là combo mới cùng loại quà
      const restart = !prev || (prev.ended && (rep < prev.n || now - prev.at > 60_000));
      fresh = restart ? rep : Math.max(0, rep - prev.n);
      if (!restart && fresh > 0) this.combosMerged++;
      // giữ lại cả khi đã kết thúc, để tin kết thúc gửi lặp (kể cả khác EventId) không bị tính thêm lần nữa
      this.streaks.set(ck, { n: restart ? rep : Math.max(rep, prev.n), at: now, ended: e.IsComboEnd });
      if (this.streaks.size > 5000) this.sweep(now);
    }
    if (key) this.mark(key);
    if (!fresh) this.duplicates++;
    return fresh;
  }
  // combo xong hoặc bỏ dở quá 2 phút thì quên
  private sweep(now: number){ for (const [k, v] of this.streaks) if (now - v.at > 120_000) this.streaks.delete(k); }
  tick(now = Date.now()){ if (this.streaks.size > 200) this.sweep(now); }
}
