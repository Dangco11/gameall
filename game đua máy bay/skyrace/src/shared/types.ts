import type { PlaneKey, SkillKey } from './game.ts';
import type { MapKey } from './maps.ts';

// Một máy bay trên đường đua (bản gửi xuống màn hình)
export interface RacerPub {
  id: string; name: string; plane: PlaneKey; color: number;
  d: number;        // quãng đường đã bay (m), có thể âm khi đang xếp hàng xuất phát
  v: number;        // tốc độ (m/s)
  place: number; lap: number; lane: number;   // lane: cột trong hàng xuất phát
  f: number;        // cờ F.* (tăng tốc, khiên, choáng...)
  bot: boolean; late: boolean;   // bot: máy bay AI cho đông vui; late: vào giữa chừng, không tính kỷ lục
  fin: number;      // thời gian về đích (ms), 0 là chưa
  gifted: number;   // xu đã tặng trong cuộc đua này
  avatar: string;
}
export type Phase = 'lobby' | 'countdown' | 'race' | 'finish' | 'result';
export interface Podium { id: string; name: string; plane: PlaneKey; color: number; ms: number; bot: boolean }
export interface RaceState { phase: Phase; leftMs: number; raceNo: number; raceMs: number; laps: number; lapLen: number; podium: Podium[]; map: MapKey }
export interface BestRow { name: string; ms: number; plane: PlaneKey }
export interface WinRow { name: string; wins: number }
export interface Boards { best: BestRow[]; wins: WinRow[]; donors: { name: string; xu: number }[] }
export interface Settings { voice: boolean; bots: number; laps: number; map: MapKey | 'auto' }
export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }

export type Fx =
  | { k: 'join'; id: string; name: string; plane: PlaneKey; late: boolean }
  | { k: 'plane'; id: string; name: string; plane: PlaneKey; color: number }
  | { k: 'gift'; id: string; name: string; avatar: string; gift: string; count: number; xu: number; skill: SkillKey; banked: boolean }
  | { k: 'skill'; skill: SkillKey; id: string; name: string; target?: string; targetName?: string; n?: number }
  | { k: 'hit'; skill: SkillKey; id: string; name: string; by: string; byName: string; blocked: boolean }
  | { k: 'like'; id: string; name: string }
  | { k: 'watch'; id: string; name: string }        // bình luận "xem": máy quay soi máy bay người này
  // pad: qua cổng tăng tốc; obstacle: va chướng ngại vật; shortcut: vào đường tắt; shortcrash: đâm trên đường tắt; shortok: thoát đường tắt
  | { k: 'event'; ev: 'pad' | 'obstacle' | 'shortcut' | 'shortcrash' | 'shortok'; id: string; name: string }
  | { k: 'lap'; id: string; name: string; lap: number }
  | { k: 'lead'; id: string; name: string }
  | { k: 'finish'; id: string; name: string; place: number; ms: number; record: boolean }
  | { k: 'phase'; phase: Phase }
  | { k: 'voice'; url: string; text: string }
  | { k: 'note'; text: string };

export interface State {
  t: 'state'; now: number; race: RaceState; racers: RacerPub[]; fx: Fx[];
  boards?: Boards; live?: LiveStatus; settings?: Settings; viewers?: number;
}
export type ServerMessage = State & { hello?: boolean };

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'newRace' | 'startNow' | 'clearSim' }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<Settings> };

// Sự kiện đã chuẩn hóa: TikTokLiveConnector và bảng mô phỏng cùng phát ra một dạng này.
interface Who { msgId: string; id: string; name: string; sim: boolean; avatar?: string; follower?: boolean }
export type LiveEvent =
  | Who & { kind: 'join' }
  | Who & { kind: 'comment'; text: string }
  | Who & { kind: 'like'; count: number }
  | Who & { kind: 'share' }
  | Who & { kind: 'follow' }
  | Who & { kind: 'gift'; gift: string; diamonds: number; count: number };
