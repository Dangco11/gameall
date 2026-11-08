import type { BarShowKey, DrinkKey } from './bar.ts';
import type { DanceGroup } from './dances.ts';

// Kiểu dữ liệu dùng chung giữa server và màn hình Quán Bar Online.

export type Gender = '' | 'nam' | 'nu';
// mc: giọng nữ dẫn chương trình; boy: giọng nam của anh phục vụ hô tên món
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

// Tài khoản người xem: tên, giới tính tự chọn, tổng xu đã tặng (để nhớ qua các buổi live)
export interface Player { id: string; name: string; sim: boolean; gender: Gender; gifted: number; joinedAt: number; lastSeen: number; follower?: boolean }

export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }
// views: số màn hình LIVE (?live=1) đang nối vào server; trang điều khiển ngừng vẽ 3D khi có, cho nhẹ máy
export interface Stats { queue: number; dropped: number; duplicates: number; processed: number; players: number; online: number; realOnline: number; views: number }
export interface Settings { voice: boolean; readChat: boolean }
export interface TopRow { id: string; name: string; xu: number; sim: boolean }

// Quán Bar Online
export interface BarGuest { id: string; name: string; gender: Gender; xu: number; vip: boolean; drink: DrinkKey | ''; avatar?: boolean; sim?: boolean; glam?: boolean; lvl?: number }   // lvl: cấp độ (tổng xu đã tặng mọi buổi)
export type BarOrderStatus = 'queued' | 'making' | 'serving';
export interface BarOrder { n: number; id: string; name: string; drink: DrinkKey; status: BarOrderStatus; leftMs: number; paid: boolean }
// vs / vsName: đối thủ của màn đối đầu (top 2 quà tháng, vắng thì vũ công nhà Bar)
export interface BarShow { key: BarShowKey; id: string; name: string; xu: number; leftMs: number; ms: number; vs?: string; vsName?: string }
// Dance Battle: vài người thi nhảy luân phiên; khán giả bình luận, thả tim, tặng quà để cộng năng lượng cho người đang nhảy
export interface BarBattle {
  n: number; phase: 'intro' | 'perform' | 'victory'; round: number; rounds: number; turn: number; dance: number; leftMs: number;
  performers: { id: string; name: string; energy: number; avatar?: boolean }[]; winner: string; by: string;
}
export interface BarState {
  guests: BarGuest[]; orders: BarOrder[]; served: number;
  show: BarShow | null; next: BarShow[];         // màn đang diễn trên sân khấu và các màn đang chờ
  top: TopRow[]; month: string;                  // top 3 quà của quán tháng này
  battle: BarBattle | null;                      // Dance Battle đang diễn
}
export type BarFx =
  | { k: 'bar'; ev: 'arrive' | 'leave' | 'vip' | 'gender'; id: string; name: string; text: string }
  | { k: 'bar'; ev: 'order'; id: string; name: string; drink: DrinkKey; n: number; paid: boolean; text: string }
  | { k: 'bar'; ev: 'make' | 'serve' | 'served'; id: string; name: string; drink: DrinkKey; n: number; text: string }
  | { k: 'bar'; ev: 'gift'; id: string; name: string; xu: number; show: BarShowKey; level: number; gift: string; count: number; text: string }
  | { k: 'bar'; ev: 'show' | 'showEnd'; id: string; name: string; show: BarShowKey; xu: number; text: string; vs?: string; vsName?: string }
  | { k: 'bar'; ev: 'deny'; id: string; name: string; text: string }
  | { k: 'bar'; ev: 'levelup'; id: string; name: string; lv: number; text: string }
  | { k: 'bar'; ev: 'dance'; id: string; name: string; dance?: number; group?: DanceGroup; text: string }
  | { k: 'bar'; ev: 'battle'; phase: 'start' | 'turn' | 'end'; id: string; name: string; dance?: number; text: string };

export type Fx =
  | BarFx
  | { k: 'chat'; id: string; text: string }                        // bình luận thường: bong bóng chữ trên đầu
  | { k: 'like'; id: string; count: number }
  | { k: 'voice'; url: string; text: string; who?: Speaker; tag?: string };

export interface Snapshot { t: 'hello'; role: 'control' | 'view'; bar: BarState; live: LiveStatus; stats: Stats; settings: Settings }
export interface Delta { t: 'delta'; bar?: BarState; live?: LiveStatus; stats?: Stats; settings?: Settings; fx?: Fx[] }
export type ServerMessage = Snapshot | Delta;

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'clearSim' }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<Settings> };
