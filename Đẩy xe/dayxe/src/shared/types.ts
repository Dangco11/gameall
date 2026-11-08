import type { PushFx, Team } from './game.ts';

export interface Row { id: string; name: string; v: number }
export interface Boards { do: Row[]; xanh: Row[]; mvp: Row[] }          // top phe Đỏ / Xanh ván này, top xu mọi thời
export interface Settings { voice: boolean; track: number }
export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }
export interface Round { n: number; pos: number; track: number; phase: 'play' | 'win'; winner: Team | null; until: number; finish: { team: Team; left: number } | null; wins: Record<Team, number>; members: Record<Team, number> }

export type Fx =
  | { k: 'push'; id: string; name: string; team: Team; m: number; dur: number; fx: PushFx; tier: string; icon: string; xu: number; count: number }
  | { k: 'gift'; id: string; name: string; team: Team; gift: string; count: number; xu: number; tier: string; icon: string }
  | { k: 'join'; id: string; name: string; team: Team; switched: boolean }
  | { k: 'win'; team: Team; mvp: { id: string; name: string; m: number } | null; wins: Record<Team, number> }
  | { k: 'reset'; n: number }
  | { k: 'finish'; team: Team; state: 'start' | 'cancel' }
  | { k: 'voice'; url: string; text: string }
  | { k: 'note'; text: string };

export interface State {
  t: 'state'; now: number; fx: Fx[];
  round?: Round; boards?: Boards; live?: LiveStatus; settings?: Settings; viewers?: number;
}
export type ServerMessage = State & { hello?: boolean };

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share' | 'follow'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'reset' | 'clearSim' | 'resetWins' }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<Settings> };

interface Who { msgId: string; id: string; name: string; sim: boolean; avatar?: string; follower?: boolean }
export type LiveEvent =
  | Who & { kind: 'join' }
  | Who & { kind: 'comment'; text: string }
  | Who & { kind: 'like'; count: number }
  | Who & { kind: 'share' }
  | Who & { kind: 'follow' }
  | Who & { kind: 'gift'; gift: string; diamonds: number; count: number };
