import type { LiveEvent } from '../../shared/types.ts';
import { UNITS } from '../config/UnitConfig.ts';
import type { UnitKind } from '../config/UnitConfig.ts';
import type { BattleManager } from '../battle/BattleManager.ts';
import { parseTeamCommand } from '../battle/TeamManager.ts';
import { cleanId, cleanName } from '../players/PlayerRegistry.ts';
import type { GiftEvent, QueueStats, TeamKey } from '../types.ts';
import { GiftDeduplication } from './GiftDeduplication.ts';
import { GiftMapping } from './GiftMapping.ts';
import { GiftQueue } from './GiftQueue.ts';

// GiftEventAdapter: biến sự kiện từ bất kỳ nguồn LIVE nào thành GiftEvent chuẩn, không phụ thuộc thư viện TikTok cụ thể.
// Nguồn hiện có: TikTokLiveConnector của dự án (qua LiveEvent) và Gift Simulator. Thêm nguồn khác chỉ cần viết một hàm from...().
export const GiftEventAdapter = {
  fromLive(ev: Extract<LiveEvent, { kind: 'gift' }>): GiftEvent {
    const x = ev as typeof ev & { giftId?: string; repeat?: number; comboEnd?: boolean; streak?: boolean; groupId?: string; uniqueId?: string };
    return {
      EventId: ev.msgId || '', UserId: cleanId(ev.id), Username: x.uniqueId || ev.id, DisplayName: ev.name, AvatarUrl: ev.avatar ?? '',
      GiftId: String(x.giftId || ev.gift), GiftName: ev.gift, GiftValue: Math.max(0, +ev.diamonds || 0),
      // TikTokLiveConnector đã tự trừ phần combo đã tính (count là số quà MỚI) và bỏ các tin không có quà mới,
      // nên ở đây coi là quà lẻ count cái; EventId (msgId) vẫn chống trùng khi TikTok phát lại tin cũ.
      RepeatCount: ev.count, IsComboEnd: true, Streakable: false,
      GroupId: String(x.groupId ?? ''), Timestamp: Date.now(), Sim: ev.sim,
    };
  },
};

// Một đơn quà đã qua chống trùng: count quà MỚI cùng loại, chờ ra quân
export interface GiftOrder { ev: GiftEvent; count: number }

export interface GiftLogger { gift(o: GiftOrder, unit: UnitKind, team: TeamKey, units: number): void; log(s: string): void }

// GiftEventHandler: nhận → chống trùng → xếp hàng → ánh xạ loại quân → gắn người chơi, phe → triệu hồi
export class GiftEventHandler {
  readonly dedup = new GiftDeduplication();
  readonly queue: GiftQueue<GiftOrder>;
  mapping: GiftMapping;
  unmapped = 0;
  private bm: BattleManager;
  private out: GiftLogger;
  constructor(bm: BattleManager, mapping = new GiftMapping(), out: GiftLogger = { gift(){}, log(){} }, now: () => number = Date.now){
    this.bm = bm; this.mapping = mapping; this.out = out;
    this.queue = new GiftQueue<GiftOrder>(now, s => out.log(s));
  }

  // Nhận sự kiện quà (có thể trùng, có thể là một phần của combo). Trả về số quà mới được xếp hàng.
  ingest(ev: GiftEvent): number {
    if (!ev.UserId){ this.out.log(`Quà ${ev.GiftName} không rõ người tặng, bỏ qua`); return 0; }
    const fresh = Math.min(this.dedup.accept(ev), this.mapping.cfg.maxRepeatPerEvent);
    if (fresh > 0) this.queue.push({ ev, count: fresh }, ev.EventId);
    return fresh;
  }
  // Bình luận: chọn phe bằng lệnh chat
  chat(userId: string, name: string, text: string, avatar = '', sim = false){
    const team = parseTeamCommand(text);
    if (!team) return null;
    const p = this.bm.players.ensure({ UserId: userId, DisplayName: name, AvatarUrl: avatar, Sim: sim });
    const r = this.bm.teams.choose(p, team, 'chat');
    if (r.ok && !r.changed) return r;
    this.bm.emit({ e: 'team', user: p.UserId, name: p.DisplayName, team: r.ok ? team : r.team, source: 'chat', locked: !r.ok });
    return r;
  }
  drain(max = 300, budgetMs = 6){ return this.queue.drain(o => this.handle(o), max, budgetMs); }

  private handle(o: GiftOrder){
    const ev = o.ev, m = this.mapping.unitFor(ev.GiftId, ev.GiftName, ev.GiftValue);
    if (!m){ this.unmapped++; this.out.log(`Quà "${ev.GiftName}" (${ev.GiftValue} xu) chưa có trong bảng ánh xạ, bỏ qua`); return; }
    const p = this.bm.players.ensure({ UserId: ev.UserId, Username: ev.Username, DisplayName: cleanName(ev.DisplayName || ev.Username), AvatarUrl: ev.AvatarUrl, Sim: ev.Sim });
    // số quà × số quân mỗi quà (ví dụ 10 bông hồng 1 xu = 50 dân binh); xu tính theo số quà thật
    const units = o.count * m.count;
    const r = this.bm.summon(p, m.unit, units, ev.GiftValue * o.count, ev.Team);
    this.bm.emit({ e: 'gift', user: p.UserId, name: p.DisplayName, avatar: this.bm.players.avatarView(p), team: r.team, kind: m.unit, count: o.count, units, giftName: cleanName(ev.GiftName, 24), value: ev.GiftValue, merged: 0, queued: r.queued });
    this.out.gift(o, m.unit, r.team, units);
  }

  stats(): QueueStats {
    return { queued: this.queue.size, processed: this.queue.processed, duplicates: this.dedup.duplicates, combosMerged: this.dedup.combosMerged, retried: this.queue.retried, failed: this.queue.failed, unmapped: this.unmapped };
  }
}

export const unitLabel = (k: UnitKind) => `${UNITS[k].icon} ${UNITS[k].name}`;
