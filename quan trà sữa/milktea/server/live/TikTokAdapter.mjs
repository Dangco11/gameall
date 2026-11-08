// Adapter cho thư viện cộng đồng tiktok-live-connector. Đây là tệp duy nhất biết tên trường của TikTok.
// Phát ra: 'event' (join, comment, gift, like, share đã chuẩn hóa), 'status' và 'streamEnd'.
// Đổi thư viện thì viết lớp mới có connect(), disconnect() và phát cùng các sự kiện này.
import { EventEmitter } from 'node:events';

const STREAM_ENDED = 3;                       // ControlAction.CONTROL_ACTION_STREAM_ENDED; 4 chỉ là tạm dừng
const RETRY_STEPS = [3, 5, 10, 20, 30, 60];   // giây
const SILENCE_LIMIT = 120_000;                // socket mở mà không có dữ liệu chừng này thì coi như đã chết

export const toUniqueId = s => String(s || '').trim().replace(/^.*tiktok\.com\/@?/i, '').replace(/^@/, '').replace(/\/.*$/, '');

// Thư viện dùng schema tiktok-live-proto v3, tên trường khác README của chính nó, nên đọc cả hai kiểu.
export function userOf(u) {
  const username = u?.displayId || u?.uniqueId || '';
  const id = [u?.id, u?.userId].find(x => x && x !== '0') || username;
  return { id: String(id || ''), username: String(username || u?.nickname || ''), nickname: String(u?.nickname || ''), tiktokLevel: tiktokLevelOf(u) };
}

// Cấp người dùng TikTok (huy hiệu cấp tặng quà): badgeList có sceneType 8 (USER_GRADE), số cấp nằm ở privilegeLogExtra.level
// hoặc chữ trên huy hiệu; bản cũ có payGrade.level. Không có thì 0.
export function tiktokLevelOf(u) {
  let level = +u?.payGrade?.level || 0;
  for (const b of u?.badgeList || u?.badges || []) {
    if ((b?.sceneType ?? b?.badgeSceneType) !== 8) continue;
    level = Math.max(level, parseInt(b.privilegeLogExtra?.level, 10) || parseInt(b.combine?.str, 10) || parseInt(b.level, 10) || 0);
  }
  return Math.min(99, level);
}
export function normalizeGift(d) {
  const info = d.gift || d.giftDetails || d.extendedGiftInfo || {};
  return {
    type: 'gift', eventId: d?.common?.msgId && d.common.msgId !== '0' ? String(d.common.msgId) : '', ...userOf(d.user),
    giftId: String(d.giftId ?? info.id ?? ''), giftName: info.name || info.giftName || 'Quà', count: d.repeatCount || d.comboCount || 1,
    diamonds: info.diamondCount ?? info.diamond_count ?? 1, streakable: (info.type ?? info.giftType) === 1, ended: !!d.repeatEnd, groupId: d.groupId || '',
  };
}

export class TikTokAdapter extends EventEmitter {
  // retrySteps, silenceMs, stableMs chỉ đổi khi kiểm thử
  constructor({ log = () => {}, lib = null, retrySteps = RETRY_STEPS, silenceMs = SILENCE_LIMIT, stableMs = 60_000 } = {}) {
    super();
    Object.assign(this, { log, lib, retrySteps, silenceMs, stableMs });
    this.gen = 0; this.retryN = 0; this.conn = null; this.lastFrameAt = 0; this.offlineSince = 0;
    this.state = { status: 'idle', uniqueId: '', error: '' };
  }
  setStatus(state) { this.state = state; this.emit('status', state); process.send?.({ t: 'portal:live', status: state.status, channel: state.uniqueId }); }
  // Báo xu cho portal (chỉ có tác dụng khi portal khởi động game). Quà combo chỉ tính phần mới thêm.
  reportGift(g, channel) {
    if (!process.send) return;
    let n = +g.count || 1;
    if (g.streakable) {
      this.portalStreaks ||= new Map();
      const key = `${g.id}:${g.giftId}:${g.groupId}`, prev = this.portalStreaks.get(key) || 0;
      if (g.ended) this.portalStreaks.delete(key); else this.portalStreaks.set(key, Math.max(n, prev));
      if (this.portalStreaks.size > 2000) this.portalStreaks.delete(this.portalStreaks.keys().next().value);
      n -= prev;
      if (n <= 0) return;
    }
    process.send({ t: 'portal:gift', coins: (+g.diamonds || 1) * n, gift: g.giftName, channel });
  }
  stopTimers() { clearTimeout(this.retryTimer); clearTimeout(this.stableTimer); clearInterval(this.watchdog); }

  async connect(raw) {
    const uniqueId = toUniqueId(raw);
    if (!uniqueId) return;
    await this.disconnect();
    this.open(uniqueId);
  }

  async open(uniqueId) {
    const gen = ++this.gen, live = () => gen === this.gen;   // kết nối đã bị thay thế thì không được làm gì nữa
    this.stopTimers();
    this.setStatus({ status: this.retryN ? 'reconnecting' : 'connecting', uniqueId, error: '', attempt: this.retryN });
    try {
      this.lib ||= await import('tiktok-live-connector');
      const { TikTokLiveConnection, WebcastEvent, ControlEvent } = this.lib;
      const conn = new TikTokLiveConnection(uniqueId, { enableExtendedGiftInfo: false, processInitialData: false });
      const push = e => { if (live()) this.emit('event', e); };
      const base = d => ({ eventId: d?.common?.msgId && d.common.msgId !== '0' ? String(d.common.msgId) : '', ...userOf(d.user) });
      conn.on(WebcastEvent.MEMBER, d => push({ type: 'join', ...base(d) }));
      conn.on(WebcastEvent.CHAT, d => push({ type: 'comment', ...base(d), text: d.content ?? d.comment ?? '' }));
      conn.on(WebcastEvent.GIFT, d => { const g = normalizeGift(d); if (live()) this.reportGift(g, uniqueId); push(g); });
      conn.on(WebcastEvent.LIKE, d => push({ type: 'like', ...base(d), count: d.count || d.likeCount || 1 }));
      conn.on(WebcastEvent.SHARE, d => push({ type: 'share', ...base(d) }));
      conn.on(WebcastEvent.STREAM_END, ({ action } = {}) => { if (live() && action === STREAM_ENDED) { this.log('Live đã kết thúc, vẫn chờ để tự nối lại'); this.emit('streamEnd'); } });
      conn.on(ControlEvent.DECODED_DATA, () => { if (live()) this.lastFrameAt = Date.now(); });
      conn.on(ControlEvent.DISCONNECTED, () => { if (live()) this.retry(uniqueId, 'mất kết nối'); });
      conn.on(ControlEvent.ERROR, e => { if (live()) this.log('TikTok lỗi: ' + (e?.exception?.message || e?.info || e?.message || e)); });
      const st = await conn.connect();
      if (!live()) { conn.disconnect().catch(() => {}); return; }
      this.conn = conn; this.lastFrameAt = Date.now();
      if (this.offlineSince) { this.emit('reconnected', Date.now() - this.offlineSince); this.offlineSince = 0; }
      this.setStatus({ status: 'connected', uniqueId, error: '', roomId: st?.roomId || '' });
      this.stableTimer = setTimeout(() => { this.retryN = 0; }, this.stableMs);    // chỉ kết nối giữ được mới xóa thời gian chờ
      this.watchdog = setInterval(() => {
        if (Date.now() - this.lastFrameAt < this.silenceMs) return;
        const dead = conn;
        this.retry(uniqueId, 'không nhận được dữ liệu');
        dead.disconnect().catch(() => {});
      }, Math.min(20_000, this.silenceMs / 2));
    } catch (e) {
      if (!live()) return;
      if (e?.name === 'InvalidUniqueIdError') { this.setStatus({ status: 'error', uniqueId, error: String(e.message) }); return; }
      this.retry(uniqueId, e?.name === 'UserOfflineError' ? 'kênh chưa live' : String(e?.message || e), e);
    }
  }

  retry(uniqueId, why, err) {
    const gen = ++this.gen;
    this.stopTimers();
    this.conn = null;
    this.offlineSince ||= Date.now();
    let secs = this.retrySteps[Math.min(this.retryN, this.retrySteps.length - 1)];
    if (err?.name === 'SignatureRateLimitError' || /rate.?limit|429|plan|pricing/i.test(String(err?.message))) secs = Math.max(secs, 120);
    this.retryN++;
    this.setStatus({ status: 'reconnecting', uniqueId, error: why, attempt: this.retryN, retryIn: secs });
    this.log(`@${uniqueId}: ${why}. Tự kết nối lại sau ${secs} giây (lần ${this.retryN})`);
    this.retryTimer = setTimeout(() => { if (gen === this.gen) this.open(uniqueId); }, secs * 1000);
  }

  async disconnect() {
    this.gen++; this.stopTimers(); this.retryN = 0; this.offlineSince = 0;
    if (this.conn) { try { await this.conn.disconnect(); } catch {} this.conn = null; }
    this.setStatus({ status: 'idle', uniqueId: '', error: '' });
  }
}
