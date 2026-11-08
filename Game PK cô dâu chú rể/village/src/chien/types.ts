import type { PhaseKey } from './config/BattleConfig.ts';
import type { SkillKey, UnitKind } from './config/UnitConfig.ts';

export type TeamKey = 'trai' | 'gai';
export const TEAM_KEYS: TeamKey[] = ['trai', 'gai'];
export const enemyOf = (t: TeamKey): TeamKey => t === 'trai' ? 'gai' : 'trai';
export const TEAM_INFO: Record<TeamKey, { name: string; icon: string; color: number; css: string; dir: 1 | -1 }> = {
  trai: { name: 'Nhà Trai', icon: '🤵', color: 0x2f7bff, css: '#2f7bff', dir: 1 },     // bên trái, tiến sang phải
  gai: { name: 'Nhà Gái', icon: '👰', color: 0xff3d7f, css: '#ff3d7f', dir: -1 },      // bên phải, tiến sang trái
};
// LANE_1 đường chính (giữa sân), LANE_2 đường phụ (trước sân khấu), LANE_3 vòng ngoài (gần camera)
export type LaneId = 0 | 1 | 2;
export const LANE_NAMES = ['LANE_1 · Đường chính', 'LANE_2 · Đường phụ', 'LANE_3 · Vòng ngoài'];

/* ------------------------------------------------------------------ quà */
// Sự kiện quà đã chuẩn hóa, không phụ thuộc thư viện TikTok nào.
// RepeatCount là số lặp LŨY KẾ của combo (1, 2, 3...), IsComboEnd là lần gửi cuối của combo đó.
export interface GiftEvent {
  EventId: string; UserId: string; Username: string; DisplayName: string; AvatarUrl: string;
  GiftId: string; GiftName: string; GiftValue: number;          // GiftValue: đơn giá xu của MỘT quà
  RepeatCount: number; IsComboEnd: boolean; Streakable: boolean; // Streakable: quà combo (TikTok gửi nhiều lần, số lặp tăng dần)
  GroupId: string; Timestamp: number; Sim: boolean;
  Team?: TeamKey;                                                // chỉ Gift Simulator / host dùng: ép phe
}

/* ------------------------------------------------------------- người chơi */
export interface RoundStats { gift: number; units: number; damage: number; kills: number; bosses: number; deaths: number; baseDamage: number; power: number; likes: number }   // power: lực chiến góp vào quỹ trận
export interface PlayerIdentity {
  UserId: string; Username: string; DisplayName: string; AvatarUrl: string; Team: TeamKey | null;
  TotalGiftValue: number; TotalUnitsSpawned: number; TotalDamage: number; TotalKills: number; TotalBossSummoned: number;
  teamSource: 'chat' | 'host' | 'auto' | 'sim' | '';
  nextTeam: TeamKey | null;     // đổi phe bị khóa giữa trận thì áp dụng từ vòng sau
  round: RoundStats; sim: boolean; lastSeen: number;
  likeBank?: number;            // tim đã thả chưa đủ đổi ra quân
}

/* ---------------------------------------------------------------- vòng đấu */
export type RoundState = 'countdown' | 'running' | 'paused' | 'ended' | 'idle';
export interface PlayerRow { id: string; name: string; avatar: string; team: TeamKey; gift: number; units: number; damage: number; kills: number; bosses: number; score: number }
export interface TeamHud {
  gift: number; units: number; pending: number; kills: number; damage: number; bosses: number; power: number;
  gateHp: number; gateMax: number; houseHp: number; houseMax: number; threat: boolean; top: PlayerRow[];
  lanes: [number, number, number];                              // số quân mỗi làn
}
export interface RoundResult {
  round: number; winner: TeamKey | 'draw'; reason: 'destroyed' | 'timeout-hp' | 'timeout-damage' | 'timeout-army' | 'timeout-kills' | 'draw';
  mvp: PlayerRow | null;
  pot: number;                                                    // quỹ lực chiến của trận
  payouts: { id: string; name: string; avatar: string; team: TeamKey; gain: number }[];   // lực chiến chia cho đội thắng (hòa: trả lại phần đã góp)
  teams: Record<TeamKey, { gift: number; damage: number; units: number; bosses: number; kills: number; baseHp: number; baseDamage: number }>;
  top: PlayerRow[];
}
export interface RoundHud {
  state: RoundState; round: number; elapsed: number; duration: number; left: number; countdown: number; gatherLeft: number; gatherSec: number;
  phase: PhaseKey; phaseName: string; phaseText: string; progress: number; autoNext: boolean; resultLeft: number; pot: number;
}
export interface LiveStatusView { status: string; uniqueId: string; error: string; attempt: number }
export interface QueueStats { queued: number; processed: number; duplicates: number; combosMerged: number; retried: number; failed: number; unmapped: number }
export interface Hud {
  round: RoundHud; teams: Record<TeamKey, TeamHud>; result: RoundResult | null;
  gifts: { min: number; unit: UnitKind; count: number }[];   // bảng quy đổi quà đang dùng (hiện dưới bảng hai phe)
  board: { month: string; top: { id: string; name: string; avatar: string; power: number; wins: number; rank: number }[] };   // BXH lực chiến tháng (top 20)
  live: LiveStatusView; queue: QueueStats; units: number; settings: ChienSettings; tickMs: number;
}
export interface ChienSettings { allowDualTeam: boolean; autoNext: boolean; roundSec: number; gatherSec: number; countdownSec: number; gateHp: number; houseHp: number; showBoard: boolean; simLocked: boolean; likesPerUnit: number; likeUnitsMax: number }

/* ------------------------------------------------------------- khung hình */
// Thông tin tĩnh của một quân: gửi một lần lúc xuất hiện
export interface UnitInfo { id: number; kind: UnitKind; team: TeamKey; owner: string; name: string; avatar: string; maxHp: number; stack: number; lane: LaneId }
// Mỗi quân 8 số trong mảng phẳng: id, x*100, z*100, y*100, yaw*100, hp, state, flags
export const UNIT_STRIDE = 8;
export const STATE_CODES = ['spawn', 'gather', 'move', 'approach', 'attack', 'skill', 'stun', 'dead', 'cheer'] as const;
export type UnitState = typeof STATE_CODES[number];
export const FLAG = { stun: 1, boost: 2, charge: 4, block: 8, air: 16, defend: 32, volley: 64 } as const;
// mục tiêu là công trình: -1 cổng, -2 nhà chính (kèm phe trong trường team)
export type TargetRef = number;

export type SimEvent =
  | { e: 'spawn'; u: UnitInfo; x: number; z: number }
  | { e: 'merge'; id: number; stack: number; maxHp: number }
  | { e: 'atk'; id: number; t: TargetRef; tt?: TeamKey; v: number }
  | { e: 'shot'; id: number; t: TargetRef; tt?: TeamKey; x: number; z: number; tx: number; tz: number; ms: number }
  | { e: 'hit'; id: TargetRef; tt?: TeamKey; dmg: number; crit: boolean; block: boolean; x: number; z: number; big: boolean }
  | { e: 'skill'; id: number; k: SkillKey; x: number; z: number; r: number; phase: 'start' | 'hit' | 'end' }
  | { e: 'die'; id: number; by: number; x: number; z: number }
  | { e: 'kill'; killer: string; killerName: string; team: TeamKey; victim: string; victimName: string; kind: UnitKind; vkind: UnitKind }
  | { e: 'base'; team: TeamKey; part: 'gate' | 'house'; hp: number; max: number; destroyed: boolean }
  | { e: 'boss'; id: number; kind: UnitKind; team: TeamKey; owner: string; name: string; avatar: string }
  | { e: 'gift'; user: string; name: string; avatar: string; team: TeamKey; kind: UnitKind; count: number; units: number; giftName: string; value: number; merged: number; queued: number }   // count: số quà, units: số quân ra
  | { e: 'like'; user: string; name: string; team: TeamKey; likes: number; units: number }   // thả tim ra Dân binh
  | { e: 'lane'; id: number; lane: LaneId }
  | { e: 'threat'; team: TeamKey }
  | { e: 'round'; state: RoundState; round: number; winner?: TeamKey | 'draw' }
  | { e: 'phase'; key: PhaseKey; name: string; text: string }
  | { e: 'honor'; user: string; name: string; avatar: string; rank: number; power: number }   // người trong top lực chiến tháng vừa vào phòng
  | { e: 'team'; user: string; name: string; team: TeamKey; source: string; locked: boolean };

export interface HelloMsg { t: 'hello'; role: 'control' | 'view'; units: UnitInfo[]; hud: Hud; frame: FrameMsg }
export interface FrameMsg { t: 'f'; tick: number; u: number[]; ev: SimEvent[] }
export interface HudMsg { t: 'h'; hud: Hud }
export interface LogMsg { t: 'log'; text: string }
export type ChienServerMsg = HelloMsg | FrameMsg | HudMsg | LogMsg;

export type ChienControl =
  | { t: 'sim'; kind: 'gift'; user: string; name: string; avatar: string; team: TeamKey | 'auto'; value: number; count: number; combo: boolean }
  | { t: 'sim'; kind: 'chat'; user: string; name: string; text: string }
  | { t: 'sim'; kind: 'like'; user: string; name: string; team: TeamKey | 'auto'; count: number }
  | { t: 'test'; what: 'trai' | 'gai' | 'u100' | 'u300' | 'combo' | 'boss' | 'mix' }
  | { t: 'ctl'; cmd: 'start' | 'go' | 'end' | 'reset' | 'pause' | 'resume' | 'disconnect' | 'boardClearSim' }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'assign'; user: string; team: TeamKey }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<ChienSettings> };
