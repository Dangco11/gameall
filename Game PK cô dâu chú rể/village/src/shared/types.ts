import type { ContestKey, CostumeKey, DecorKey, MarketItem, ProjectKey, ToolKey, BattleGiftKey, BattlePhase, Team, PkSkillKey } from './balance.ts';

export type RiceStage = 'fallow' | 'plowed' | 'growing' | 'ripe';
export interface RiceState { stage: RiceStage; progress: number; water: number; fert: boolean; watered: number }
export interface PondState { fish: number; growth: number; fed: number }
export interface CoopState { chickens: number; ducks: number; fed: number; eggs: number; eggProgress: number; matureAt: number }
export interface Inventory { rice: number; fish: number; egg: number; wood: number; brick: number }
export interface PlayerStats { harvests: number; catches: number; contributed: number; festivalWins: number; gifted: number; earned: number }

// Một dòng trong players.txt. Khóa chính là id TikTok.
export interface Player {
  id: string; name: string; sim: boolean;
  joinedAt: number; lastSeen: number; lot: number;
  outfit: { shirt: number; pants: number; hat: number; costume: CostumeKey | '' };
  costumes: CostumeKey[];
  xp: number; level: number; money: number; title: string;
  houseLevel: number; decor: DecorKey[]; tools: ToolKey[];
  rice: RiceState; pond: PondState; coop: CoopState; inv: Inventory; stats: PlayerStats;
  catchAt: number; shareAt: number;
  gender: Gender; look: number;           // giới tính tự chọn (bình luận nam / nữ) và lần đổi trang phục
  follower?: boolean;                     // đã follow kênh (TikTok cho biết khi người này bình luận, thả tim, vào phòng, follow)
  giftDay: string; giftSkip: number; giftMaterials: number; giftHouse: number;
  likeHour: number; likePoints: number; likeBank: number;
}

export interface PubPlayer {
  id: string; name: string; sim: boolean; lot: number; online: boolean;
  outfit: Player['outfit']; level: number; money: number; title: string;
  houseLevel: number; decor: DecorKey[]; tools: ToolKey[];
  rice: { stage: RiceStage; progress: number; water: boolean; fert: boolean };
  pond: { fish: number; growth: number; fed: boolean };
  coop: { chickens: number; ducks: number; fed: boolean; eggs: number };
  inv: Inventory; contributed: number; gifted: number; wins: number; gender: Gender; look: number;
}

export type Weather = 'clear' | 'cloudy' | 'wind' | 'rain';
export interface WorldState { day: number; clock: number; season: number; weather: Weather; wind: number }
export interface ProjectState { key: ProjectKey; stage: number; points: number; total: number }
export interface MarketRow { item: MarketItem; price: number; base: number; sold: number }

export interface FestivalEntrant { id: string; name: string; score: number; team: 0 | 1 }
export interface FestivalState {
  phase: 'idle' | 'lobby' | 'contest' | 'result';
  type: ContestKey; leftMs: number; nextInMs: number;
  entrants: FestivalEntrant[]; count: number; teams: [number, number]; winners: string[];
}

export type ActKind =
  | 'enter' | 'home' | 'plow' | 'sow' | 'water' | 'fert' | 'harvest'
  | 'feedFish' | 'harvestFish' | 'buyFish' | 'catch'
  | 'feedAnimals' | 'collectEggs' | 'buyAnimal'
  | 'market' | 'shop' | 'build' | 'donate' | 'festival' | 'chat';

export type Fx =
  | { k: 'act'; id: string; act: ActKind; ok: boolean; text: string; bubble?: string }
  | { k: 'gift'; id: string; name: string; gift: string; count: number; diamonds: number; tier: string; text: string; targets: string[]; sim: boolean }
  | { k: 'join'; id: string; name: string; known: boolean }
  | { k: 'leave' | 'back'; id: string; name: string }
  | { k: 'like'; id: string; count: number }
  | { k: 'level'; id: string; level: number; title: string }
  | { k: 'built'; project: ProjectKey; stageName: string }
  | { k: 'note'; text: string }
  | { k: 'wedding'; ev: 'bride' | 'groom' | 'steal' | 'mung' | 'guest' | 'end' | 'outfit' | 'mc' | 'time' | 'ask'; id: string; name: string; other?: string; amount?: number; role?: 'bride' | 'groom'; auto?: boolean; text: string }
  | { k: 'voice'; url: string; text: string; who?: Speaker; tag?: string }
  | { k: 'battle'; ev: BattleEv; id: string; name: string; team?: Team; target?: Team; amount?: number; gift?: BattleGiftKey; text: string }
  | { k: 'pk'; ev: 'start' | 'join' | 'hit' | 'tick' | 'end'; id: string; name: string; team?: PkTeam; skill?: PkSkillKey; amount?: number; target?: string; win?: PkTeam; text: string }
  | { k: 'fireworks' };

export type BattleEv = 'start' | 'phase' | 'join' | 'power' | 'drum' | 'shield' | 'attack' | 'blocked' | 'dragon' | 'crown' | 'ultimate' | 'climax' | 'win' | 'end' | 'locked';
export interface BattleTeamState {
  power: number; count: number; shieldMs: number; boostX: number; boostMs: number; drumMs: number;
  leader: { id: string; name: string; gifted: number; avatar?: boolean; crown: boolean } | null;
  top: BoardRow[];
}
export interface BattleState {
  phase: BattlePhase; phaseLeftMs: number; leftMs: number; climax: boolean;
  teams: Record<Team, BattleTeamState>;
  members: [string, Team][];
  winner: Team | ''; titles: { title: string; id: string; name: string; team: Team }[];
}

export interface BoardRow { id: string; name: string; value: number; sim: boolean }
export interface Boards { level: BoardRow[]; wealth: BoardRow[]; builders: BoardRow[]; donors: BoardRow[] }
export interface LiveStatus { status: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'error'; uniqueId: string; error: string; attempt: number }
export interface Stats { queue: number; dropped: number; duplicates: number; processed: number; residents: number; online: number; realOnline: number; tickMs: number; bots: number }

export interface Snapshot {
  t: 'hello'; role: 'control' | 'view'; players: PubPlayer[]; world: WorldState; projects: ProjectState[];
  market: MarketRow[]; festival: FestivalState; boards: Boards; live: LiveStatus; stats: Stats; reserve: number; settings: Settings; wedding: WeddingState; battle: BattleState;
}
export interface Delta {
  t: 'delta'; players?: PubPlayer[]; removed?: string[]; world?: WorldState; projects?: ProjectState[];
  market?: MarketRow[]; festival?: FestivalState; boards?: Boards; live?: LiveStatus; stats?: Stats; reserve?: number; settings?: Settings; wedding?: WeddingState; battle?: BattleState; fx?: Fx[];
}
export type ServerMessage = Snapshot | Delta;

export type ControlMessage =
  | { t: 'sim'; kind: 'join' | 'comment' | 'like' | 'share'; id: string; name: string; text?: string; count?: number }
  | { t: 'sim'; kind: 'gift'; id: string; name: string; gift: string; diamonds: number; count: number }
  | { t: 'ctl'; cmd: 'connect'; user: string }
  | { t: 'ctl'; cmd: 'disconnect' | 'festival' | 'clearSim' | 'newWedding' | 'battleStart' | 'battleStop' }
  | { t: 'ctl'; cmd: 'bots'; count: number }
  | { t: 'ctl'; cmd: 'weather'; weather: Weather }
  | { t: 'ctl'; cmd: 'clock'; clock: number }
  | { t: 'ctl'; cmd: 'settings'; settings: Partial<Settings> };

// Tùy chọn bật tắt trên bảng điều khiển
export type Gender = '' | 'nam' | 'nu';
// Chương trình lễ: giới thiệu cô dâu 1 phút, giới thiệu chú rể 1 phút, trao nhẫn, rồi tiệc cưới
export type WeddingStep = '' | 'introBride' | 'introGroom' | 'giaTien' | 'rings' | 'ruou' | 'banh' | 'party';
// mc: giọng nữ dẫn chương trình; boy: giọng nam của anh phục vụ hô gọi bia, gọi món
export type Speaker = 'mc' | 'boy';
export interface Settings { idleBots: boolean; voice: boolean; readChat: boolean; scene: 'village' | 'wedding' }

export interface WeddingRole { id: string; name: string; gifted: number; avatar?: boolean }
// Bảng xếp hạng quà cưới tháng: tổng xu từng người tặng trong cảnh đám cưới
export interface TopRow { id: string; name: string; xu: number; sim: boolean }
// PK cướp: def là đội bảo vệ (Đội Dâu khi cướp dâu, Đội Rể khi cướp rể), cuop là Đội Cướp
export type PkTeam = 'def' | 'cuop';
export interface PkState {
  kind: 'dau' | 're'; thief: { id: string; name: string }; holder: { id: string; name: string }; stolen: { id: string; name: string };
  leftMs: number; score: Record<PkTeam, number>; count: Record<PkTeam, number>; top: Record<PkTeam, string>; members: [string, PkTeam][];
}
export interface WeddingState {
  phase: 'waiting' | 'bride' | 'groom' | 'married' | 'done';   // bride: mới có cô dâu, groom: mới có chú rể
  bride: WeddingRole | null; groom: WeddingRole | null; stealPrice: number; stealBride: number; leftMs: number; steals: number;
  step: WeddingStep; stepLeftMs: number;
  guests: string[]; gifts: BoardRow[];
  pk: PkState | null;
  autoLeftMs: number;           // còn bao lâu thì làng tự chọn cô dâu chú rể (0: không đếm)
  top: TopRow[];                // top 3 quà cưới tháng này
  month: string;
}

// Sự kiện đã chuẩn hóa: TikTokLiveConnector và Simulator cùng phát ra một dạng này.
interface Who { msgId: string; id: string; name: string; sim: boolean; avatar?: string; follower?: boolean }   // follower: người này đã follow kênh
export type LiveEvent =
  | Who & { kind: 'join' }
  | Who & { kind: 'comment'; text: string }
  | Who & { kind: 'like'; count: number }
  | Who & { kind: 'share' }
  | Who & { kind: 'follow' }
  // giftId, repeat (số lặp lũy kế của combo), streak (quà combo), comboEnd, groupId: thông tin gốc cho Đại Chiến tự chống trùng combo
  | Who & { kind: 'gift'; gift: string; diamonds: number; count: number; giftId?: string; repeat?: number; streak?: boolean; comboEnd?: boolean; groupId?: string; uniqueId?: string };
