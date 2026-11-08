import type { TierKey } from './print.ts';

// Kiểu dữ liệu dùng chung giữa server và màn hình Live Print Studio.

// mc: giọng nữ dẫn chương trình; boy: giọng nam (thợ in hô tên bản in)
export type Speaker = 'mc' | 'boy';

// Sự kiện đã chuẩn hóa: TikTokLiveConnector và bảng thử (mô phỏng) cùng phát ra một dạng này.
interface Who { msgId: string; id: string; name: string; sim: boolean; avatar?: string; follower?: boolean }
export type LiveEvent =
  | Who & { kind: 'join' }
  | Who & { kind: 'comment'; text: string }
  | Who & { kind: 'like'; count: number }
  | Who & { kind: 'share' }
  | Who & { kind: 'follow' }
  | Who & { kind: 'gift'; gift: string; diamonds: number; count: number };

// Tài khoản người xem: tên, tổng xu đã tặng (nhớ qua các buổi live), các mẫu khung đã sưu tập
export interface Player { id: string; name: string; sim: boolean; gifted: number; joinedAt: number; lastSeen: number; follower?: boolean; owned?: number[]; prints?: number }

export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }
// views: số màn hình LIVE (?live=1) đang nối vào server; trang điều khiển ngừng vẽ 3D khi có, cho nhẹ máy
export interface Stats { queue: number; dropped: number; duplicates: number; processed: number; players: number; online: number; realOnline: number; views: number }
export interface Settings { voice: boolean; readChat: boolean }
export interface TopRow { id: string; name: string; xu: number; sim: boolean }

/* ------------------------------------------------------------ máy in */
// Một lượt in. cell: ô trong lưới 2×2 của tờ (0..3), -1 là in nguyên tờ khổ lớn. tpl: số mẫu khung (1..100), chọn lúc bắt đầu in.
export interface PrintJob {
  n: number; id: string; name: string; sim: boolean; avatar: boolean;
  gift: string; count: number; xu: number; tier: TierKey;
  tpl: number; code: string; at: number; edition: number;     // edition: số thứ tự bản in của mẫu (VIP giới hạn: 1..99)
  cell: number; sheet: number; lv: number;                    // lv: cấp độ người tặng (tổng xu mọi buổi)
}
// Bản in đã xong, giữ lại cho phòng trưng bày
export type PrintRecord = Omit<PrintJob, 'cell' | 'sheet'>;
export type PrintPhase = 'idle' | 'prime' | 'print' | 'eject';
export interface PrintState {
  phase: PrintPhase; job: PrintJob | null; leftMs: number; ms: number;
  sheet: { n: number; big: boolean; jobs: PrintJob[] };       // tờ đang nằm trên bàn in (các bản đã in + bản đang in)
  queue: PrintJob[]; waiting: number;                         // hàng đợi (tối đa 12 lượt đầu) và tổng số lượt đang chờ
  printed: number;                                            // tổng số bản đã in
  recent: PrintRecord[];                                      // bản in gần đây (treo tường phòng trưng bày)
  rare: PrintRecord[];                                        // bản in hiếm nhất
  hall: PrintRecord | null;                                   // bản in đẹp nhất của người TOP 1 tháng (đặt giữa phòng trưng bày)
  top: TopRow[]; month: string;                               // top người tặng quà tháng này
}
export type PrintFx =
  | { k: 'print'; ev: 'queued'; id: string; name: string; tier: TierKey; xu: number; gift: string; count: number; pos: number; merged: boolean; text: string }
  | { k: 'print'; ev: 'start' | 'done'; job: PrintJob; text: string }
  | { k: 'print'; ev: 'eject'; sheet: number; big: boolean; text: string }
  | { k: 'print'; ev: 'levelup'; id: string; name: string; lv: number; text: string }
  | { k: 'print'; ev: 'hello'; id: string; name: string; text: string };

export type Fx =
  | PrintFx
  | { k: 'chat'; id: string; name: string; text: string }
  | { k: 'like'; id: string; count: number }
  | { k: 'voice'; url: string; text: string; who?: Speaker; tag?: string };

export interface Snapshot { t: 'hello'; role: 'control' | 'view'; print: PrintState; live: LiveStatus; stats: Stats; settings: Settings }
export interface Delta { t: 'delta'; print?: PrintState; live?: LiveStatus; stats?: Stats; settings?: Settings; fx?: Fx[] }
export type ServerMessage = Snapshot | Delta;

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'clearSim' }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<Settings> };
