import type { LiveEvent, LiveStatus } from '../shared/types.ts';

// Đọc sự kiện công khai của một phòng LIVE theo username, chuẩn hóa thành LiveEvent.
// Không dùng tài khoản, mật khẩu hay cookie. Rớt mạng thì tự nối lại, giãn dần tới 60 giây một lần.
const STREAM_ENDED = 3;                       // ControlAction.CONTROL_ACTION_STREAM_ENDED (4 = tạm dừng, chỉ là trục trặc)
const RETRY_STEPS = [3, 5, 10, 20, 30, 60];
const SILENCE_LIMIT = 120_000;                // socket còn mở mà 2 phút không có dữ liệu là đã chết

/* eslint-disable @typescript-eslint/no-explicit-any */
type Raw = any;
const userOf = (u: Raw) => {
  const id = [u?.userId, u?.id, u?.uniqueId, u?.displayId].find(x => x && x !== '0') || u?.nickname || '';
  const pic = u?.avatarThumb ?? u?.avatarMedium ?? u?.profilePicture;
  const avatar = String(pic?.urlList?.[0] ?? pic?.url?.[0] ?? '');
  return { id: String(id), name: String(u?.nickname || u?.displayId || u?.uniqueId || 'Ẩn danh').slice(0, 40), avatar: avatar.startsWith('https://') ? avatar.slice(0, 600) : '' };
};
const msgIdOf = (d: Raw) => { const id = d?.common?.msgId ?? d?.msgId; return id && id !== '0' ? String(id) : ''; };

export class TikTokLiveConnector {
  status: LiveStatus = { status: 'idle', uniqueId: '', error: '', attempt: 0 };
  private emit: (ev: LiveEvent) => void;
  private onStatus: (s: LiveStatus) => void;
  private log: (s: string) => void;
  private gen = 0; private retryN = 0;
  private conn: Raw = null;
  private retryTimer: NodeJS.Timeout | undefined; private stableTimer: NodeJS.Timeout | undefined; private watchdog: NodeJS.Timeout | undefined;
  private lastFrameAt = 0;
  private streaks = new Map<string, number>();
  private lib: Raw = null;

  constructor(emit: (ev: LiveEvent) => void, onStatus: (s: LiveStatus) => void, log: (s: string) => void){
    // sự kiện không rõ người gửi thì bỏ, để không sinh cư dân không tên hay ghi quà nhầm người
    this.emit = ev => { if (ev.id) emit(ev); else if (ev.kind === 'gift') log(`Quà ${ev.gift} không rõ người tặng, bỏ qua`); };
    this.onStatus = onStatus; this.log = log;
  }

  private set(s: Partial<LiveStatus>){ this.status = { ...this.status, ...s }; this.onStatus(this.status); process.send?.({ t: 'portal:live', status: this.status.status, channel: this.status.uniqueId }); }
  private stopTimers(){ clearTimeout(this.retryTimer); clearTimeout(this.stableTimer); clearInterval(this.watchdog); }

  async connect(input: string){
    const uniqueId = String(input || '').trim().replace(/^.*tiktok\.com\/@?/i, '').replace(/^@/, '').replace(/[/?#].*$/, '');
    if (!/^[\w.]{2,40}$/.test(uniqueId)){ this.set({ status: 'error', uniqueId, error: 'Username không hợp lệ' }); return; }
    await this.disconnect();
    this.retryN = 0;
    void this.open(uniqueId);
  }

  private async open(uniqueId: string){
    const gen = ++this.gen, current = () => gen === this.gen;   // kết nối đã bị thay thì không được đụng gì nữa
    this.stopTimers();
    this.set({ status: this.retryN ? 'reconnecting' : 'connecting', uniqueId, error: '', attempt: this.retryN });
    try {
      this.lib ??= await import('tiktok-live-connector');
      const { TikTokLiveConnection, WebcastEvent, ControlEvent } = this.lib;
      const conn = new TikTokLiveConnection(uniqueId, { enableExtendedGiftInfo: false, processInitialData: false });
      // followStatus của người xem với kênh: 1 là đã follow, 2 là bạn bè (follow nhau)
      const who = (d: Raw) => ({ msgId: msgIdOf(d), ...userOf(d.user), sim: false as const, follower: +(d.user?.followInfo?.followStatus ?? 0) >= 1 });
      conn.on(WebcastEvent.CHAT, (d: Raw) => { if (current()) this.emit({ kind: 'comment', ...who(d), text: String(d.content ?? d.comment ?? '').slice(0, 200) }); });
      conn.on(WebcastEvent.MEMBER, (d: Raw) => { if (current()) this.emit({ kind: 'join', ...who(d) }); });
      conn.on(WebcastEvent.LIKE, (d: Raw) => { if (current()) this.emit({ kind: 'like', ...who(d), count: +(d.count ?? d.likeCount) || 1 }); });
      conn.on(WebcastEvent.SHARE, (d: Raw) => { if (current()) this.emit({ kind: 'share', ...who(d) }); });
      conn.on(WebcastEvent.FOLLOW, (d: Raw) => { if (current()) this.emit({ kind: 'follow', ...who(d), follower: true }); });
      conn.on(WebcastEvent.GIFT, (d: Raw) => { if (current()) this.onGift(d, who(d)); });
      conn.on(WebcastEvent.STREAM_END, ({ action }: Raw = {}) => { if (current() && action === STREAM_ENDED) this.log('📴 Phiên live đã kết thúc, vẫn chờ để tự nối lại khi bạn live tiếp'); });
      conn.on(ControlEvent.DECODED_DATA, () => { if (current()) this.lastFrameAt = Date.now(); });
      conn.on(ControlEvent.DISCONNECTED, () => { if (current()) this.retry(uniqueId, 'mất kết nối'); });
      conn.on(ControlEvent.ERROR, (e: Raw) => { if (current()) this.log('TikTok lỗi: ' + (e?.exception?.message || e?.info || e?.message || e)); });
      // thư viện đôi khi treo không trả lời: quá 30 giây thì coi như lỗi và thử lại
      let timer: NodeJS.Timeout | undefined;
      const st = await Promise.race([conn.connect(), new Promise((_, rej) => { timer = setTimeout(() => { conn.disconnect().catch(() => {}); rej(new Error('kết nối quá 30 giây')); }, 30_000); })]).finally(() => clearTimeout(timer));
      if (!current()){ conn.disconnect().catch(() => {}); return; }
      this.conn = conn; this.lastFrameAt = Date.now();
      this.set({ status: 'connected', uniqueId, error: '', attempt: 0 });
      this.log(`✅ Đã kết nối live @${uniqueId}${st?.roomId ? ' (phòng ' + st.roomId + ')' : ''}`);
      this.stableTimer = setTimeout(() => { this.retryN = 0; }, 60_000);   // chỉ kết nối giữ được mới đặt lại nhịp chờ
      this.watchdog = setInterval(() => {
        if (Date.now() - this.lastFrameAt < SILENCE_LIMIT) return;
        const dead = conn; this.retry(uniqueId, 'không nhận được dữ liệu'); dead.disconnect().catch(() => {});
      }, 20_000);
    } catch (e: Raw) {
      if (!current()) return;
      if (e?.name === 'InvalidUniqueIdError'){ this.set({ status: 'error', uniqueId, error: String(e.message) }); this.log('❌ Username không hợp lệ: ' + e.message); return; }
      this.retry(uniqueId, e?.name === 'UserOfflineError' ? 'kênh chưa live' : String(e?.message || e), e);
    }
  }

  // Quà combo (type 1) tới nhiều lần với repeatCount tăng dần: chỉ tính phần mới thêm, nên vừa nhấn là làng phản ứng ngay.
  private onGift(d: Raw, who: { msgId: string; id: string; name: string; sim: false }){
    const info = d.gift || d.giftDetails || d.extendedGiftInfo || {};
    const type = info.type ?? info.giftType, name = String(info.name || info.giftName || 'quà').slice(0, 30);
    const diamonds = +(info.diamondCount ?? info.diamond_count) || 1, n = +(d.repeatCount || d.comboCount) || 1;
    let count = n;
    if (type === 1){
      const key = `${who.id}:${d.giftId}:${d.groupId || ''}`, prev = this.streaks.get(key) || 0;
      count = n - prev;
      if (d.repeatEnd) this.streaks.delete(key); else this.streaks.set(key, Math.max(n, prev));
      if (this.streaks.size > 2000) this.streaks.delete(this.streaks.keys().next().value as string);
      if (count <= 0) return;
    }
    process.send?.({ t: 'portal:gift', coins: diamonds * count, gift: name, channel: this.status.uniqueId });   // báo xu cho portal (chỉ khi portal khởi động game)
    this.emit({ kind: 'gift', ...who, gift: name, diamonds, count });
  }

  private retry(uniqueId: string, why: string, err?: Raw){
    const gen = ++this.gen;
    this.stopTimers();
    this.conn = null;
    let secs = RETRY_STEPS[Math.min(this.retryN, RETRY_STEPS.length - 1)];
    if (err?.name === 'SignatureRateLimitError' || /rate.?limit|429/i.test(String(err?.message))) secs = Math.max(secs, 120);
    this.retryN++;
    this.set({ status: 'reconnecting', uniqueId, error: why, attempt: this.retryN });
    this.log(`🔄 @${uniqueId}: ${why}. Tự kết nối lại sau ${secs} giây (lần ${this.retryN})`);
    this.retryTimer = setTimeout(() => { if (gen === this.gen) void this.open(uniqueId); }, secs * 1000);
  }

  async disconnect(){
    this.gen++; this.stopTimers(); this.retryN = 0;
    if (this.conn){ try { await this.conn.disconnect(); } catch { /* đã đóng */ } this.conn = null; }
    this.set({ status: 'idle', uniqueId: '', error: '', attempt: 0 });
  }
}
