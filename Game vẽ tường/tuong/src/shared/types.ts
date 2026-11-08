import type { ArtKind } from './game.ts';

// Một bức tranh trên tường. seg: số thứ tự mảng tường (tăng dần sang phải). x, y: điểm neo trong mảng (0..1, y = 0 là chân tường). seed: để vẽ lại giống hệt.
export interface Art {
  id: number; seg: number; kind: ArtKind; uid: string; name: string; av: string; color: string;
  x: number; y: number; size: number; t: number; seed: number; count: number;
}
export interface Row { id: string; name: string; av: string; v: number }
export interface Boards { painters: Row[]; hall: Row[]; recent: { name: string; label: string }[] }
export interface Settings { voice: boolean }
export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }

export type Fx =
  | { k: 'art'; art: Art; fresh: boolean }
  | { k: 'gift'; id: string; name: string; av: string; gift: string; count: number; xu: number; tier: string; icon: string }
  | { k: 'likes'; id: string; name: string; n: number; need: number }
  | { k: 'color'; name: string; color: string }
  | { k: 'wipe' }
  | { k: 'voice'; url: string; text: string }
  | { k: 'note'; text: string }
  | { k: 'join'; name: string }
  | { k: 'thanks'; kind: 'follow' | 'share'; id: string; name: string }
  | { k: 'goal'; id: string; name: string; level: number }
  | { k: 'lucky'; phase: 'open' | 'win'; names?: string[]; n?: number };
export interface Goal { n: number; need: number; level: number }
export interface Lucky { open: boolean; left: number; n: number }     // left: giây còn lại (đang mở) / giây tới lượt sau

export interface State {
  t: 'state'; now: number; fx: Fx[];
  arts?: Art[];            // gửi đủ khi mới vào (hello) hoặc sau khi xoá tường
  boards?: Boards; live?: LiveStatus; settings?: Settings; viewers?: number; likes?: number;
  nextSeg?: number;                    // mảng tường sẽ vẽ bức tiếp theo: nhân vật đứng chờ sẵn trước mảng đó
  goal?: Goal; lucky?: Lucky;
}
export type ServerMessage = State & { hello?: boolean };

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share' | 'follow'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'wipe' | 'clearSim' }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<Settings> };

interface Who { msgId: string; id: string; name: string; sim: boolean; avatar?: string; follower?: boolean }
export type LiveEvent =
  | Who & { kind: 'join' }
  | Who & { kind: 'comment'; text: string }
  | Who & { kind: 'like'; count: number }
  | Who & { kind: 'share' }
  | Who & { kind: 'follow' }
  | Who & { kind: 'gift'; gift: string; diamonds: number; count: number };
