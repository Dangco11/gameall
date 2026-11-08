import type { ArtifactKey, Vfx } from './game.ts';

export type Mode = 'tuluyen' | 'boss' | 'pk1' | 'pk3' | 'sect' | 'treasure';
export type Pose = 'idle' | 'med' | 'move' | 'atk' | 'cast' | 'hit' | 'down' | 'win';

// Một tu sĩ đang hiện trên màn hình (bản gửi xuống)
export interface CultPub {
  id: string; name: string; av: string;
  a: number;              // mẫu nhân vật (ARCHETYPES)
  lv: number;             // level 0..59 (cảnh giới × 4 + kỳ)
  sect: string;           // khoá tông môn, '' nếu chưa có
  arts: string;           // pháp bảo đang có: "phikiem:3,longchau:1"
  pw: number;             // chiến lực
  hp: number; mhp: number;
  x: number; z: number; ry: number;
  p: Pose;
  side: number;           // -1 đứng xem/tu luyện, 0/1 phe khi PK / tông môn chiến, 2 = đánh Boss
  npc: boolean;
  sh: number;             // còn khiên (0/1)
  vip: number;            // bậc ngoại hình VIP 0..5
}
export interface BossPub { key: string; name: string; hp: number; mhp: number; phase: number; x: number; z: number; ry: number; p: 'idle' | 'move' | 'atk' | 'roar' | 'cast' | 'hit' | 'rage' | 'die'; tgt: string }
export interface SideInfo { name: string; color: number; score: number; alive: number }
export interface ModeState { mode: Mode; title: string; leftMs: number; round: number; sides: SideInfo[]; next: string }

export interface Row { id: string; name: string; av: string; v: number; sub?: string }
export interface Boards { power: Row[]; tuvi: Row[]; bossDmg: Row[]; bossNow: Row[]; pk: Row[]; donors: Row[]; sects: Row[] }
export interface Settings { voice: boolean; npcs: number; bossEvery: number }
export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }

export type Fx =
  | { k: 'cast'; id: string; vfx: Vfx; skill: string; el: string; to?: string; x: number; z: number; tx: number; tz: number; r: number; big?: boolean }
  | { k: 'dmg'; id: string; v: number; crit?: boolean; dodge?: boolean; by: string; boss?: boolean }
  | { k: 'heal'; id: string; v: number }
  | { k: 'down'; id: string }
  | { k: 'up'; id: string }
  | { k: 'gift'; id: string; name: string; av: string; gift: string; count: number; xu: number; tier: string; tierName: string; icon: string; global: boolean }
  | { k: 'break'; id: string; name: string; lv: number; realm: boolean }
  | { k: 'artifact'; id: string; name: string; art: ArtifactKey; lv: number; loot?: boolean }
  | { k: 'boss'; ev: 'spawn' | 'phase' | 'skill' | 'roar' | 'die' | 'flee'; key: string; name: string; phase?: number; skill?: string; x?: number; z?: number; r?: number; ult?: boolean; killer?: string }
  | { k: 'mode'; mode: Mode; title: string }
  | { k: 'pkwin'; id: string; name: string; loser: string; pts: number; side?: number }
  | { k: 'join'; id: string; name: string; sect: string; cls: string }
  | { k: 'sect'; id: string; name: string; sect: string }
  | { k: 'treasure'; ev: 'spawn' | 'win'; id?: string; name?: string; art?: ArtifactKey; lv?: number }
  | { k: 'vip'; id: string; name: string; tier: number }
  | { k: 'reward'; id: string; name: string; stages: number; why: string }
  | { k: 'voice'; url: string; text: string }
  | { k: 'note'; text: string };

export interface State {
  t: 'state'; now: number; mode: ModeState; cults: CultPub[]; boss: BossPub | null; fx: Fx[];
  boards?: Boards; live?: LiveStatus; settings?: Settings; viewers?: number; total?: number;
}
export type ServerMessage = State & { hello?: boolean };

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share' | 'follow'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'next' | 'boss' | 'pk1' | 'pk3' | 'sect' | 'treasure' | 'clearSim' }
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
