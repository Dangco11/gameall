// Chánh Điện Tịnh Tâm — live server
// Runs on the streaming PC. Serves the overlay + control panel, listens to a TikTok LIVE room,
// keeps the list of seated viewers, generates Vietnamese voice lines with Edge TTS and pushes
// everything to the overlay over WebSocket.
//
//   cd live && npm install && node server.mjs        → http://localhost:3001/live/control.html
//
import http from 'node:http';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');            // repo root: serves /assets, /live
const TTS_SUB = String(process.env.INSTANCE_ID || '').replace(/[^\w-]/g, '');   // portal chạy nhiều quán cùng lúc: mỗi quán một thư mục giọng đọc
const TTS_DIR = path.join(__dirname, 'tts', TTS_SUB);
fs.mkdirSync(TTS_DIR, { recursive: true });
for (const f of fs.readdirSync(TTS_DIR)) { try { fs.unlinkSync(path.join(TTS_DIR, f)); } catch {} }
const PORT = +process.env.PORT || 3001;

/* ------------------------------------------------------------------ state */
const settings = {
  theme: 'quan',                     // quan: nhà hàng ăn đêm (seafood/live.html) | chanh-dien: chánh điện (live/overlay.html)
  quanName: 'Nhà Hàng Ăn Đêm Thế',
  ambience: true, ambVol: 60,        // tiếng nền quán nhậu trên overlay
  readVipChat: true,                 // đọc bình luận của khách từ VIP_SEAT_XU xu trở lên
  idleGuests: true,                  // đang live mà quán vắng thì có vài khách vãng lai vào ngồi rồi về
  goldenHour: true,                  // mỗi 15 phút có 3 phút giờ vàng: thả mức thấp được màn của mức cao hơn
  title: 'Chánh Điện Tịnh Tâm',
  subtitle: 'Nam Mô A Di Đà Phật',
  voice: 'vi-VN-NamMinhNeural',      // or vi-VN-HoaiMyNeural
  pitch: -18,                        // Hz
  rate: -20,                         // %
  music: true, mo: true, moBpm: 52,
  autoChant: true, chantEveryMin: 3,
  seatMode: 'auto',                  // auto | 24 | 36 | 64 | 100
  joinOnEnter: false,                // also seat viewers who only enter the room
  leaveAfterMin: 5,                  // quiet this long = treated as gone from the live (0 = never); donors get twice as long
  gifts: { readAll: true, minDiamonds: 1 },
};
// Bảng món trên overlay nhà hàng: quà đáng bao nhiêu xu thì gọi món tương ứng. Tên món phải có trong seafood/data/menu.json.
const LIVE_MENU = [
  { coins: 1, dish: 'Bia lạnh' }, { coins: 5, dish: 'Mực khô xé sợi' }, { coins: 20, dish: 'Ốc len xào dừa' }, { coins: 50, dish: 'Sò lông nướng mỡ hành' },
  { coins: 100, dish: 'Cả quán cùng zô', cheerAll: true }, { coins: 200, dish: 'Bạch tuộc nướng than' }, { coins: 300, dish: 'Tiếp viên quán hát rót bia', companion: true }, { coins: 400, dish: 'Hát tặng cả quán', song: true }, { coins: 500, dish: 'Tôm hùm baby nướng tỏi' },
  // vip: mức phục vụ, càng cao càng hoành tráng
  { coins: 1000, dish: 'Tôm hùm xanh hấp bia', vip: 1 }, { coins: 2000, dish: 'Tháp hải sản hai tầng', vip: 2 },
  { coins: 5000, dish: 'Cua Hoàng Đế dát vàng', vip: 3 }, { coins: 10000, dish: 'Đại Tiệc Đế Vương Đại Dương', vip: 4 },
];
const QUAN_SEATS = 86;               // 20 bàn thường 4 ghế (10 sẵn, hết chỗ xếp thêm 2 đợt, mỗi đợt 5 bàn) và 3 bàn VIP 2 ghế
const VIP_TABLES = [11, 10, 12];     // bàn riêng cho khách sộp, mỗi bàn hai người
const VIP_SEATS = [0, 2];            // ghế sau và ghế phải; ghế trái để tiếp viên ngồi
function freeVipSeat(){
  for (const table of VIP_TABLES) for (const seat of VIP_SEATS)
    if (![...viewers.values()].some(x => x.table === table && x.seat === seat)) return { table, seat };
  return null;
}
const VIP_SEAT_XU = 200;             // tổng xu từ mức này được mời vào bàn riêng; hết bàn thì người thả ít nhất nhường
// Bàn được cấp ở server để câu mời đọc đúng số bàn khách sẽ ngồi. Thứ tự: giữa quán, gần máy quay trước.
const TABLE_ORDER = [6, 7, 9, 13, 5, 8, 2, 3, 1, 4, 16, 15, 17, 14, 18, 21, 20, 22, 19, 23];
const BASE_TABLES = 13, MAX_TABLES = 23;
let tablesOpen = BASE_TABLES;
function setTables(n){ tablesOpen = n; broadcast({ t:'tables', n }); }
// Mời khách sộp vào bàn riêng. Trả về true nếu vừa đổi bàn cho người này.
function promoteVip(v){
  if (settings.theme !== 'quan' || v.demo || v.coins < VIP_SEAT_XU || VIP_TABLES.includes(v.table)) return false;
  const holders = [...viewers.values()].filter(x => VIP_TABLES.includes(x.table));
  let spot = freeVipSeat();
  if (!spot){
    const lowest = holders.sort((a, b) => a.coins - b.coins)[0];
    if (lowest.coins >= v.coins) return false;
    spot = { table: lowest.table, seat: lowest.seat };
    Object.assign(lowest, allocSeat());
    broadcast({ t:'move', id: lowest.id, table: lowest.table, seat: lowest.seat, vip: false, name: lowest.name });
  }
  Object.assign(v, spot);
  broadcast({ t:'move', id: v.id, table: v.table, seat: v.seat, vip: true, name: v.name });
  addLog(`👑 ${v.name} vào bàn riêng số ${v.table}`);
  return true;
}
const CHEER_ALL_LINES = [
  n => `${n} chơi lớn, bao cả quán một ly! Cả nhà cảm ơn ${n} nào!`,
  n => `Ly này ${n} mời! Uống rồi là phải nhớ ơn ${n} nha cả quán!`,
  n => `Cả quán cảm ơn ${n}! Có ${n} ở đây là quán vui hẳn lên!`,
];
const COMPANION_LINES = [
  n => `${n} gọi tiếp viên quán hát rót bia! Xuống bàn ${n} liền, cụng ly cho vui nha!`,
  n => `Có ngay! Tiếp viên quán hát ra rót bia cho ${n}, cả bàn cùng dô nào!`,
];
const SONG_LINES = [
  n => `Micro cho ${n}! ${n} hát tặng cả quán nè!`,
  n => `Cả quán im lặng nào! ${n} hát tặng mọi người!`,
  n => `${n} lên hát rồi! Cả nhà vỗ tay nào!`,
];
const VIP_INVITES = [n => `Khách sộp ${n}, mời lên bàn riêng! Thảm đỏ đã trải sẵn!`, n => `Ai cho ${n} ngồi đó! Khách sộp phải ngồi bàn riêng, mời lên liền!`, n => `Dọn bàn riêng cho ${n} ngay! Khách sộp của quán đây rồi!`];
function allocSeat(){
  const used = new Map(TABLE_ORDER.map(t => [t, new Set()]));
  for (const v of viewers.values()) if (v.table) used.get(v.table)?.add(v.seat);
  const open = TABLE_ORDER.filter(t => t <= tablesOpen);   // bàn VIP không nằm trong danh sách này
  const table = open.find(t => used.get(t).size < 4);      // ngồi kín từng bàn rồi mới sang bàn kế
  if (!table){
    if (tablesOpen >= MAX_TABLES) return {};
    setTables(tablesOpen + 5);
    addLog(`🪑 Hết bàn, xếp thêm: giờ có ${tablesOpen} bàn`);
    if (settings.theme === 'quan') say('Quán đông quá! Bê thêm bàn thêm ghế ra cho khách nè!', { tag:'tables', first: true });
    return allocSeat();
  }
  return { table, seat: [0, 1, 2, 3].find(i => !used.get(table).has(i)) };
}
// Khách về bớt thì dọn đợt bàn thêm, chỉ khi không còn ai ngồi ở đó và chỗ còn dư nhiều.
function shrinkTables(){
  while (tablesOpen > BASE_TABLES){
    const lastBatch = tablesOpen - 5;
    if ([...viewers.values()].some(v => v.table > lastBatch) || viewers.size > lastBatch * 4 * .6) return;
    setTables(lastBatch);
  }
}
const INVITES = [
  (n, b) => `Mời ${n} vào bàn số ${b}, mồi vừa ra, bia vừa lạnh!`,
  (n, b) => `A, ${n} tới rồi! Bàn số ${b} còn trống, mời vô liền!`,
  (n, b) => `${n} ơi, bàn số ${b} chừa riêng cho mình nè, vô ngồi cho mát!`,
  (n, b) => `Khách quý ${n} tới chơi! Mời vô bàn số ${b}, có gì vui kể cả quán nghe với!`,
  (n, b) => `Bàn số ${b} có khách! Mời ${n} vô ngồi, ốc đang nóng, bia đang lạnh!`,
  (n, b) => `Nghe tiếng ${n} từ đầu hẻm rồi! Bàn số ${b} nha, ngồi xuống là có mồi liền!`,
  (n, b) => `Mời ${n} vô bàn số ${b}! Đêm còn dài, mình cứ thong thả!`,
  (n, b) => `Ui, ${n} đây rồi! Mời vô bàn số ${b}, anh em đang đợi cụng ly!`,
];
// Câu đọc khi thả xu, theo giá trị quà. n: tên khách, d: món
const GIFT_LINES = [
  [5, [
    n => `Bia lạnh cho ${n}! Cụng ly cái nào, dô!`,
    n => `${n} khui bia! Lạnh ngắt, sủi bọt, dô dô!`,
    n => `Có bia cho ${n} liền! Một, hai, ba, dô!`,
  ]],
  [20, [
    (n, d) => `Có liền! ${n} gọi ${d}, ăn chơi mà cuốn lắm nha!`,
    (n, d) => `${d} cho ${n}! Món nhỏ mà tấm lòng lớn, cảm ơn nha!`,
    (n, d) => `${n} gọi ${d}! Nhâm nhi cho vui, đêm còn dài mà!`,
    (n, d) => `Dạ có! ${d} cho ${n}, vừa ngon vừa rẻ, ai cũng khen!`,
  ]],
  [100, [
    (n, d) => `Bàn của ${n} lên ${d}! Nóng hổi vừa thổi vừa ăn, cảm ơn nha!`,
    (n, d) => `${d} ra cho ${n} đây! Mùi thơm bay tới đầu đường luôn!`,
    (n, d) => `${n} biết ăn quá! ${d} này thêm ly bia là hết nước chấm!`,
    (n, d) => `Có ngay ${d} cho ${n}! Cả quán ngửi mùi là đòi gọi theo liền!`,
  ]],
  [500, [
    (n, d) => `Ngon rồi! ${n} chơi ${d}! Cả quán nhìn mà thèm, cảm ơn ${n} nhiều nha!`,
    (n, d) => `${d} lên bàn ${n}! Khách sành là biết món này đỉnh cỡ nào, cụng ly cái, dô!`,
    (n, d) => `${n} gọi ${d}! Bếp trưởng vừa nghe là xắn tay áo liền, đợi chút xíu thôi!`,
  ]],
  [Infinity, [
    (n, d) => `Trời đất! ${n} làm nguyên ${d}! Đêm nay bàn này sáng nhất quán rồi!`,
    (n, d) => `Sộp quá ${n} ơi! ${d} ra liền! Cả quán xin một tràng vỗ tay nào!`,
  ]],
];
const lastLine = new Map();
// chọn ngẫu nhiên nhưng không đọc trùng đúng câu vừa rồi trong cùng một nhóm
function pickLine(list){
  let i = Math.floor(Math.random() * list.length);
  if (list.length > 1 && lastLine.get(list) === i) i = (i + 1) % list.length;
  lastLine.set(list, i);
  return list[i];
}
const rowForCoins = c => [...LIVE_MENU].reverse().find(m => c >= m.coins) || LIVE_MENU[0];
const VIP_LINES = {
  1: [(n, d) => `Cả quán chú ý! ${n} vừa gọi ${d}! Món VIP đây rồi, phục vụ đâu, rước món ra liền!`,
      (n, d) => `Ê ê, có biến lớn! ${n} chốt ${d}! Cả quán dạt đường cho món đi qua nè!`],
  2: [(n, d) => `Trời ơi, ${n} chơi lớn quá! ${d}! Đội phục vụ rước món ra bàn, cả quán cụng ly chúc mừng ${n}!`,
      (n, d) => `Không tin nổi luôn! ${n} gọi nguyên ${d}! Bàn này hôm nay là nhất quán rồi, dô một cái!`],
  3: [(n, d) => `Kính thưa cả quán! Đại gia ${n} vừa gọi ${d}! Xin mời bếp trưởng đích thân bưng món ra bàn!`,
      (n, d) => `Tắt đèn, bật đèn rọi! Đại gia ${n} đã gọi ${d}! Bếp trưởng ra chào khách, cả quán đứng dậy vỗ tay nào!`],
  4: [(n, d) => `Kính thưa toàn thể quý vị! ${n} đã mở ${d}! Cả quán xin nâng ly, chúc mừng vị khách sộp nhất đêm nay! Một, hai, ba, dô!`,
      (n, d) => `Lịch sử của quán đã sang trang! ${n} khai màn ${d}! Đêm nay ${n} là vua của con phố này! Tất cả nâng ly, một, hai, ba, dô!`],
};
let lastRealAt = Date.now();          // lần cuối có người xem thật vào, ra, bình luận hay tặng quà
const viewers = new Map();           // id -> { id, name, skin, avatar, coins, joinedAt, lastAt, lastText, lastTextAt, demo }
const past = new Map();              // id -> { skin, coins } of viewers who walked out, restored when they come back
const merit = new Map();             // id -> { name, coins }: the merit board outlives a viewer leaving
const startedAt = Date.now();
let tiktok = null, tiktokState = { status: 'idle', uniqueId: '', error: '' };
const log = [];
function addLog(s){ const line = `[${new Date().toLocaleTimeString('vi-VN')}] ${s}`; log.push(line); if (log.length > 300) log.shift(); broadcast({ t:'log', line }, 'control'); console.log(line); }

const CAPS = [24, 36, 64, 100];
let autoCap = CAPS[0];
function capacity(){
  if (settings.seatMode !== 'auto') return +settings.seatMode;
  const n = viewers.size, need = CAPS.find(c => n <= c) || 100;
  if (need > autoCap) autoCap = need;
  // shrink late, otherwise people coming and going around a boundary would reshuffle the whole hall each time
  else if (need < autoCap && n <= CAPS[CAPS.indexOf(autoCap) - 1] * .7) autoCap = need;
  return autoCap;
}
const seatLimit = () => Math.min(settings.seatMode === 'auto' ? 100 : +settings.seatMode, settings.theme === 'quan' ? QUAN_SEATS : 100);

/* skins: sprites that exist in /assets. Walking strips exist for man / woman / granny. */
// A comment changes the outfit only when it IS the keyword (≤ 3 words), so "Nam mô A Di Đà Phật" never reads as "nam".
const SKIN_WORDS = [
  ['master', ['cao tăng','cao tang']], ['monk', ['sư','su','sư thầy','su thay','thầy','thay']], ['nun', ['ni','ni cô','ni co','sư cô','su co']],
  ['child', ['tiểu','tieu','chú tiểu','chu tieu','bé','be']], ['granny', ['bà','ba','áo nâu','ao nau','cụ','cu']],
  ['woman', ['nữ','nu','chị','chi','gái','gai']], ['man', ['nam','anh','trai']],
];
function skinFromText(t){
  const w = String(t).toLowerCase().normalize('NFC').replace(/[^\p{L}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  if (!w || w.split(' ').length > 3 || /^nam m[oô]( |$)/.test(w)) return null;   // "Nam mô" is a greeting, not the keyword "nam"
  for (const [skin, words] of SKIN_WORDS) if (words.some(k => w === k || w.startsWith(k + ' '))) return skin;
  return null;
}
const DEFAULT_SKINS = ['man', 'woman', 'woman', 'man', 'granny'];

function pub(v){ return { id:v.id, name:v.name, skin:v.skin, avatar:v.avatar||'', coins:v.coins, demo:!!v.demo, table:v.table, seat:v.seat }; }
const meritTop = () => [...merit.values()].sort((a,b) => b.coins - a.coins).slice(0, 5);
function snapshot(){ return { t:'state', settings, viewers:[...viewers.values()].map(pub), cap: capacity(), merit: meritTop(), liveMenu: LIVE_MENU, tables: tablesOpen, startedAt, bootId: startedAt, tiktok: tiktokState, golden: goldenPub() }; }

let seatCounter = 0;
// Who gives up a seat when the hall is full: sample crowd, then the quietest non-donor, then the quietest donor.
function yieldingViewer(){
  const rank = x => x.demo ? 0 : x.coins === 0 ? 1 : 2;
  return [...viewers.values()].sort((a,b) => rank(a) - rank(b) || a.lastAt - b.lastAt)[0] || null;
}
// Stand up and walk out. delay (seconds) spreads a crowd leaving together.
function sendOff(id, why, delay = 0){
  const v = viewers.get(id); if (!v) return;
  viewers.delete(id);
  if (!v.demo){
    lastRealAt = Date.now();
    past.set(id, { skin: v.skin, coins: v.coins });
    if (past.size > 1000) past.delete(past.keys().next().value);
    addLog(`🚶 ${v.name} ra về (${why})`);
  }
  broadcast({ t:'leave', id, delay });
  shrinkTables();
}
const touch = id => { const v = viewers.get(id); if (v) v.lastAt = Date.now(); };

function seat(id, name, opts = {}){
  if (!opts.demo && !id.startsWith('bot_')) lastRealAt = Date.now();
  let v = viewers.get(id);
  if (v){ v.lastAt = Date.now(); if (opts.avatar) v.avatar = opts.avatar; return { v, isNew:false }; }
  if (viewers.size >= seatLimit()){             // full: a real viewer always gets in, sample crowd never pushes anyone out
    if (opts.demo) return { v:null, isNew:false };
    const quiet = yieldingViewer();
    if (!quiet) return { v:null, isNew:false };
    sendOff(quiet.id, 'nhường chỗ');
  }
  const old = past.get(id); past.delete(id);
  v = { id, name: (name||id).slice(0, 18), skin: opts.skin || old?.skin || DEFAULT_SKINS[seatCounter++ % DEFAULT_SKINS.length],
        avatar: opts.avatar || '', coins: old?.coins || 0, joinedAt: Date.now(), lastAt: Date.now(), demo: !!opts.demo,
        ...(settings.theme === 'quan' ? allocSeat() : {}) };
  viewers.set(id, v);
  if (settings.theme === 'quan' && !v.demo && v.coins >= VIP_SEAT_XU){
    const free = freeVipSeat();
    if (free) Object.assign(v, free);
  }
  broadcast({ t:'join', v: pub(v), cap: capacity() });
  return { v, isNew:true };
}

/* ------------------------------------------------------------- events in */
// Giọng đọc phát thẳng lên live nên không đọc link, số điện thoại, chửi tục; câu đổi hình (nam, nữ...) cũng bỏ qua.
const SWEAR = new Set(['đm', 'dm', 'đcm', 'dcm', 'đmm', 'dmm', 'đkm', 'dkm', 'đéo', 'địt', 'đụ', 'lồn', 'cặc', 'buồi', 'đĩ', 'clm', 'clgt', 'vcl', 'vkl', 'vl', 'cmm', 'ccc', 'fuck', 'shit']);
function speakableChat(text){
  const raw = String(text).normalize('NFC');
  if (/https?:|www\.|\.(com|net|vn|me|io)\b/i.test(raw) || /\d[\d\s.-]{6,}\d/.test(raw)) return '';
  const clean = raw.replace(/@\S+/g, ' ').replace(/[^\p{L}\p{N}\s,.!?]/gu, ' ').replace(/(.)\1{3,}/gu, '$1').replace(/\s+/g, ' ').trim();
  if ((clean.match(/\p{L}/gu) || []).length < 2) return '';
  if (clean.toLowerCase().split(/[^\p{L}\p{N}]+/u).some(w => SWEAR.has(w))) return '';
  return clean.slice(0, 100);
}
const VIP_CHAT_GAP = 15_000;         // mỗi khách cách nhau ít nhất 15 giây, tránh một người chiếm giọng đọc
function readVipChat(v, text, isSkin){
  if (!settings.readVipChat || settings.theme !== 'quan' || v.demo || v.coins < VIP_SEAT_XU || isSkin) return;
  const line = speakableChat(text), now = Date.now();
  if (!line || line === v.lastRead || now - (v.lastReadAt || 0) < VIP_CHAT_GAP || ttsQueue.length >= 6) return;
  v.lastRead = line; v.lastReadAt = now;
  say(`${spoken(v.name)} nói: ${line}`, { tag:'vipchat', show: `★ ${v.name}: ${line}` });
}
function onChat(id, name, text, avatar){
  if (!id) return;
  text = String(text || '').slice(0, 120);
  const want = skinFromText(text);
  const { v, isNew } = seat(id, name, { avatar, skin: want || undefined });
  if (!v) return;
  if (!isNew && want && want !== v.skin){ v.skin = want; broadcast({ t:'skin', id, skin: want }); }
  // bình luận đông thì bỏ qua giọng để không dồn hàng đợi; chữ mời trên màn hình vẫn hiện
  if (isNew && v.table && !v.demo && ttsQueue.length < 2) say(pickLine(INVITES)(spoken(v.name), v.table), { tag:'invite' });
  v.lastText = text; v.lastTextAt = Date.now();
  broadcast({ t:'chat', id, name: v.name, text });
  readVipChat(v, text, !!want);
}

/* Đua Khách Sộp: vượt lên hạng 1 thì màn hình báo ngay, giọng đọc hô sau câu cảm ơn quà. Dưới 50 xu chưa tính để đầu live khỏi
   hô liên tục; hai người giành nhau thì giọng cách nhau ít nhất 20 giây. */
const USURP_MIN_XU = 50, USURP_VOICE_GAP = 20_000;
const USURP_LINES = [
  (a, b) => `${a} vừa soán ngôi ${b}! ${a} lên đầu bảng Khách Sộp rồi!`,
  (a, b) => `Biến căng rồi! ${a} vượt mặt ${b}, giành luôn ngôi số một!`,
  (a, b) => `${b} ơi, mất ngôi rồi! ${a} vừa lên hạng nhất, có đòi lại không nè?`,
];
let usurpVoiceAt = 0;
function meritLeader(){
  let top = null;
  for (const [id, m] of merit) if (!top || m.coins > top.coins) top = { id, ...m };
  return top;
}
function announceUsurp(v, loser){
  broadcast({ t:'usurp', id: v.id, name: v.name, loser: loser.name });
  addLog(`👑 ${v.name} soán ngôi ${loser.name}`);
  if (Date.now() - usurpVoiceAt < USURP_VOICE_GAP) return;
  usurpVoiceAt = Date.now();
  const at = ttsQueue[0]?.meta?.id === v.id ? 1 : 0;   // đứng ngay sau câu cảm ơn quà của chính người đó
  ttsQueue.splice(at, 0, { text: pickLine(USURP_LINES)(spoken(v.name), spoken(loser.name)), meta: { tag:'usurp' } });
  pumpTTS();
}

function onGift(id, name, giftName, count, diamonds, avatar, streak){
  if (!id) return;
  giftName = String(giftName || 'quà').slice(0, 30); count = Math.max(1, Math.min(9999, +count || 1));
  const { v } = seat(id, name, { avatar });
  if (!v) return;
  const coins = Math.max(1, (diamonds || 1) * (count || 1));
  const leader = meritLeader();
  v.coins += coins;
  merit.set(id, { name: v.name, coins: v.coins });
  const loser = settings.theme === 'quan' && !v.demo && leader && leader.id !== id && v.coins > leader.coins && v.coins >= USURP_MIN_XU ? leader : null;
  if (promoteVip(v)) say(pickLine(VIP_INVITES)(spoken(v.name)), { tag:'gift', first: true });
  // đang nhấn combo: chỉ công bố lại khi tổng xu lên mức món cao hơn, còn lại cộng điểm âm thầm
  if (streak && streak.prev > 0 && rowForCoins(streak.cum) === rowForCoins(streak.prev)) { broadcast({ t:'merit', merit: meritTop() }); if (loser) announceUsurp(v, loser); return; }
  const prayer = (v.lastText && Date.now() - v.lastTextAt < 90_000 && v.lastText.length > 6) ? v.lastText : pickPrayer();
  const tier = coins >= 99 ? 3 : coins >= 10 ? 2 : 1;
  const shown = streak ? streak.cum : coins, paidRow = rowForCoins(shown), isGolden = !!golden && paidRow.coins === golden.from, row = isGolden ? rowForCoins(golden.to) : paidRow, dish = row.dish, vip = row.vip || 0;
  const line = settings.theme === 'quan' && row.cheerAll ? pickLine(CHEER_ALL_LINES)(spoken(v.name))
    : settings.theme === 'quan' && row.song ? pickLine(SONG_LINES)(spoken(v.name))
    : settings.theme === 'quan' && row.companion ? pickLine(COMPANION_LINES)(spoken(v.name))
    : settings.theme === 'quan' && vip ? pickLine(VIP_LINES[vip])(spoken(v.name), dish)
    : settings.theme === 'quan'
    ? pickLine(GIFT_LINES.find(([limit]) => shown < limit)[1])(spoken(v.name), dish)
    : `Nam mô A Di Đà Phật. Phật tử ${spoken(v.name)} thành tâm dâng ${giftName}${count > 1 ? ', ' + count + ' lần' : ''}. ${prayer}.`;
  broadcast({ t:'gift', id, name: v.name, giftName, count: streak ? 1 : count, coins: shown, total: v.coins, tier, prayer, dish, vip, fx: LIVE_MENU.indexOf(row) + 1, companion: !!row.companion, cheerAll: !!row.cheerAll, song: row.song ? { file: pickSongFile() } : null, golden: isGolden, merit: meritTop() });
  if (settings.gifts.readAll || coins >= settings.gifts.minDiamonds) say((isGolden ? 'Giờ vàng! ' : '') + line, { tag:'gift', id, dish, mc: vip >= 3, first: true });   // quà luôn được đọc trước câu mời
  if (loser) announceUsurp(v, loser);
}

// Màn 400 xu: có MP3 trong seafood/audio/songs thì chọn ngẫu nhiên, không lặp bài vừa hát; không có thì overlay hát bài của quán.
const SONGS_DIR = path.join(ROOT, 'seafood', 'audio', 'songs');
let lastSongFile = '';
function pickSongFile(){
  let files = [];
  try { files = fs.readdirSync(SONGS_DIR).filter(f => /\.mp3$/i.test(f)); } catch {}
  if (files.length > 1) files = files.filter(f => f !== lastSongFile);
  return lastSongFile = files[Math.floor(Math.random() * files.length)] || '';
}

function pickPrayer(){
  const P = ['Nguyện cầu gia đạo bình an, vạn sự cát tường', 'Nguyện cầu cha mẹ mạnh khỏe, sống lâu', 'Nguyện hồi hướng công đức cho khắp pháp giới chúng sinh',
             'Nguyện cầu thân tâm an lạc, phiền não tiêu trừ', 'Nguyện cầu công việc hanh thông, gia đình hạnh phúc'];
  return P[Math.floor(Math.random() * P.length)];
}
const spoken = s => String(s).replace(/[_@.]+/g, ' ').replace(/[^\p{L}\p{N}\s]/gu, '').trim() || 'ẩn danh';

/* ------------------------------------------------------------------ TTS */
const ttsQueue = []; let ttsBusy = false, ttsSeq = 0;
function esc(s){ return String(s).replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c])); }
function say(text, meta = {}){
  if (meta.first) { ttsQueue.unshift({ text: String(text).slice(0, 500), meta }); pumpTTS(); return; }   // khách VIP được đọc trước hàng đợi
  if (ttsQueue.length >= 15) { addLog('Hàng đợi giọng đọc đầy, bỏ qua 1 câu'); return; }
  ttsQueue.push({ text: String(text).slice(0, 500), meta }); pumpTTS();
}
async function synth(text, mc){
  const tts = new MsEdgeTTS();
  const q = mc ? { voice: 'vi-VN-NamMinhNeural', pitch: -4, rate: 10 } : settings.theme === 'quan' ? { voice: 'vi-VN-HoaiMyNeural', pitch: 5, rate: 24 } : settings;   // tiếp viên tươi vui, không phải giọng tụng kinh
  await tts.setMetadata(q.voice, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(esc(text), { pitch: `${q.pitch >= 0 ? '+' : ''}${q.pitch}Hz`, rate: `${q.rate >= 0 ? '+' : ''}${q.rate}%` });
  const chunks = [];
  await new Promise((res, rej) => { audioStream.on('data', c => chunks.push(c)); audioStream.on('close', res); audioStream.on('error', rej); });
  try { tts.close(); } catch {}
  return Buffer.concat(chunks);
}
// The Read Aloud service sometimes drops the socket mid-sentence; without a retry a donor would not hear their name.
async function synthRetry(text, mc, tries = 4){
  for (let n = 1; ; n++){
    try { return await synth(text, mc); }
    catch (e) { if (n >= tries) throw e; await new Promise(r => setTimeout(r, 300 * n)); }
  }
}
async function pumpTTS(){
  if (ttsBusy || !ttsQueue.length) return; ttsBusy = true;
  const { text, meta } = ttsQueue.shift();
  try {
    const file = `tts_${Date.now()}_${++ttsSeq}.mp3`;
    fs.writeFileSync(path.join(TTS_DIR, file), await synthRetry(text, meta.mc));
    broadcast({ t:'tts', url: `/live/tts/${TTS_SUB ? TTS_SUB + "/" : ""}${file}`, text, ...meta });
    const old = fs.readdirSync(TTS_DIR).sort(); while (old.length > 40) { try { fs.unlinkSync(path.join(TTS_DIR, old.shift())); } catch {} }
  } catch (e) {
    addLog('TTS lỗi: ' + (e?.message || e));
    if (meta.dish && settings.theme === 'quan') broadcast({ t:'ttsfail', dish: meta.dish });   // overlay falls back to the dish's recorded clip
  }
  ttsBusy = false; setTimeout(pumpTTS, 50);
}

const CHANTS = [
  'Nam mô Bổn Sư Thích Ca Mâu Ni Phật. Nguyện đem công đức này, hướng về khắp tất cả, đệ tử và chúng sinh, đều trọn thành Phật đạo.',
  'Nam mô A Di Đà Phật. Nguyện sanh Tây Phương Tịnh Độ trung, cửu phẩm liên hoa vi phụ mẫu.',
  'Nam mô Đại Bi Quán Thế Âm Bồ Tát. Nguyện cho tất cả chúng sinh thân tâm an lạc, tai qua nạn khỏi.',
  'Quán Tự Tại Bồ Tát hành thâm Bát Nhã Ba La Mật Đa thời, chiếu kiến ngũ uẩn giai không, độ nhất thiết khổ ách.',
];
let chantIdx = 0, chantTimer = null;
function chant(){ const text = CHANTS[chantIdx++ % CHANTS.length]; broadcast({ t:'chant', text }); say(text, { tag:'chant' }); }
function scheduleChant(){ clearInterval(chantTimer); if (settings.autoChant && settings.theme !== 'quan') chantTimer = setInterval(chant, Math.max(1, settings.chantEveryMin) * 60_000); }
scheduleChant();

/* --------------------------------------------------------------- TikTok */
let TikTokLib = null;
// Field names follow tiktok-live-proto v3, the schema this connector version decodes with. Its README still shows the
// older names (uniqueId, comment, giftDetails, likeCount), so both are read in case a future version changes again.
const userOf = u => {
  const id = [u?.id, u?.userId, u?.displayId, u?.uniqueId].find(x => x && x !== '0') || u?.nickname || '';
  const pic = u?.avatarThumb || u?.profilePicture;
  return { id: String(id), name: u?.nickname || u?.displayId || u?.uniqueId || 'ẩn danh', avatar: pic?.urlList?.[0] || pic?.url?.[0] || '' };
};
// TikTok replays recent messages after a reconnect: remember ids so a gift is never counted twice.
const seenMsgs = new Set();
const streaks = new Map();             // combo đang nhấn: số lần đã tính
function isRepeat(d){
  const id = d?.common?.msgId;
  if (!id || id === '0') return false;
  if (seenMsgs.has(id)) return true;
  seenMsgs.add(id);
  if (seenMsgs.size > 5000) seenMsgs.delete(seenMsgs.values().next().value);
  return false;
}
const STREAM_ENDED = 3;                       // ControlAction.CONTROL_ACTION_STREAM_ENDED (4 = suspended: only a hiccup)
const RETRY_STEPS = [3, 5, 10, 20, 30, 60];   // seconds
const SILENCE_LIMIT = 120_000;                // an open socket with no data this long is dead
let tiktokGen = 0, retryN = 0, retryTimer = null, stableTimer = null, watchdog = null, offlineSince = 0, lastFrameAt = 0, roomViewers = 0, roomViewersAt = 0;
function setTikTok(st){ tiktokState = st; broadcast({ t:'tiktok', ...st }); process.send?.({ t:'portal:live', status: st.status, channel: st.uniqueId }); }
const portalGift = (coins, gift) => process.send?.({ t:'portal:gift', coins, gift, channel: tiktokState?.uniqueId || '' });   // báo xu cho portal
function stopTimers(){ clearTimeout(retryTimer); clearTimeout(stableTimer); clearInterval(watchdog); }

async function connectTikTok(uniqueId){
  uniqueId = String(uniqueId || '').trim().replace(/^.*tiktok\.com\/@?/i, '').replace(/^@/, '').replace(/\/.*$/, '');
  if (!uniqueId) return;
  await disconnectTikTok();
  retryN = 0;
  openTikTok(uniqueId);
}

async function openTikTok(uniqueId){
  const gen = ++tiktokGen, live = () => gen === tiktokGen;   // a replaced connection must not touch anything any more
  stopTimers();
  setTikTok({ status: retryN ? 'reconnecting' : 'connecting', uniqueId, error: '', attempt: retryN });
  let conn = null;
  try {
    TikTokLib ||= await import('tiktok-live-connector');
    const { TikTokLiveConnection, WebcastEvent, ControlEvent } = TikTokLib;
    conn = new TikTokLiveConnection(uniqueId, { enableExtendedGiftInfo: false, processInitialData: false });
    conn.on(WebcastEvent.CHAT, d => { if (!live() || isRepeat(d)) return; const u = userOf(d.user); onChat(u.id, u.name, d.content ?? d.comment, u.avatar); });
    conn.on(WebcastEvent.GIFT, d => {
      if (!live()) return;
      const info = d.gift || d.giftDetails || d.extendedGiftInfo || {};
      const type = info.type ?? info.giftType;
      if (isRepeat(d)) return;
      const u = userOf(d.user), gname = info.name || info.giftName || 'quà', dia = info.diamondCount ?? info.diamond_count ?? 1, n = d.repeatCount || d.comboCount || 1;
      if (type === 1 && settings.theme === 'quan'){   // combo: ra món ngay từ cú nhấn đầu, không chờ người tặng nhấn xong
        const key = `${u.id}:${d.giftId}:${d.groupId || ''}`, prev = streaks.get(key) || 0, more = n - prev;
        if (d.repeatEnd) streaks.delete(key); else streaks.set(key, Math.max(n, prev));
        if (streaks.size > 2000) streaks.delete(streaks.keys().next().value);
        if (more > 0){ portalGift(more * dia, gname); onGift(u.id, u.name, gname, more, dia, u.avatar, { cum: n * dia, prev: prev * dia }); }
        if (d.repeatEnd) addLog(`🎁 ${u.name} tặng ${gname} x${n}`);
        return;
      }
      if (type === 1 && !d.repeatEnd) return;                       // chánh điện: đọc một lần khi combo kết thúc
      portalGift(n * dia, gname);
      onGift(u.id, u.name, gname, n, dia, u.avatar);
      addLog(`🎁 ${u.name} tặng ${gname} x${n}`);
    });
    conn.on(WebcastEvent.MEMBER, d => { if (!live()) return; const u = userOf(d.user); if (settings.joinOnEnter) seat(u.id, u.name, { avatar: u.avatar }); else touch(u.id); });
    conn.on(WebcastEvent.LIKE, d => { if (!live()) return; const { id } = userOf(d.user); touch(id); broadcast({ t:'like', id, n: d.count || d.likeCount || 1 }); });
    for (const ev of [WebcastEvent.SOCIAL, WebcastEvent.FOLLOW, WebcastEvent.SHARE]) conn.on(ev, d => { if (live()) touch(userOf(d.user).id); });
    conn.on(WebcastEvent.ROOM_USER, d => {
      if (!live()) return;
      const total = +(d.total ?? d.viewerCount);
      if (total > 0){ roomViewers = total; roomViewersAt = Date.now(); }
      for (const r of d.ranks || d.topViewers || []) touch(userOf(r.user).id);   // listed by TikTok as in the room right now
    });
    conn.on(WebcastEvent.STREAM_END, ({ action } = {}) => {
      if (!live() || action !== STREAM_ENDED) return;
      addLog('📴 Live đã kết thúc: mọi người ra về. Vẫn chờ để tự nối lại khi bạn live tiếp.');
      for (const v of [...viewers.values()]) if (!v.demo && !v.id.startsWith('sim_')) sendOff(v.id, 'hết live', Math.random() * 6);
    });
    conn.on(ControlEvent.DECODED_DATA, () => { if (live()) lastFrameAt = Date.now(); });
    conn.on(ControlEvent.DISCONNECTED, () => { if (live()) retryTikTok(uniqueId, 'mất kết nối'); });
    conn.on(ControlEvent.ERROR, e => { if (live()) addLog('TikTok lỗi: ' + (e?.exception?.message || e?.info || e?.message || e)); });
    const st = await conn.connect();
    if (!live()) { conn.disconnect().catch(() => {}); return; }
    tiktok = conn; lastFrameAt = lastRealAt = Date.now();   // vừa nối xong: chờ người xem thật vào trước khi có khách vãng lai
    // the time spent offline must not count as these viewers being quiet
    if (offlineSince){ const gap = Date.now() - offlineSince; for (const v of viewers.values()) v.lastAt += gap; offlineSince = 0; }
    setTikTok({ status: 'connected', uniqueId, error: '', roomId: st?.roomId || '' });
    addLog(`✅ Đã kết nối live @${uniqueId}`);
    stableTimer = setTimeout(() => { retryN = 0; }, 60_000);     // only a connection that holds resets the back-off
    watchdog = setInterval(() => {
      if (Date.now() - lastFrameAt < SILENCE_LIMIT) return;
      const dead = conn; retryTikTok(uniqueId, 'không nhận được dữ liệu'); dead.disconnect().catch(() => {});
    }, 20_000);
  } catch (e) {
    if (!live()) return;
    if (e?.name === 'InvalidUniqueIdError'){ setTikTok({ status: 'error', uniqueId, error: String(e.message) }); addLog('❌ Username không hợp lệ: ' + e.message); return; }
    retryTikTok(uniqueId, e?.name === 'UserOfflineError' ? 'kênh chưa live' : String(e?.message || e), e);
  }
}

// Keeps trying until it connects or "Ngắt" is pressed. Everyone stays seated meanwhile.
function retryTikTok(uniqueId, why, err){
  const gen = ++tiktokGen;
  stopTimers();
  tiktok = null; offlineSince ||= Date.now();
  let secs = RETRY_STEPS[Math.min(retryN, RETRY_STEPS.length - 1)];
  if (err?.name === 'SignatureRateLimitError' || /rate.?limit|429|plan|pricing/i.test(String(err?.message))) secs = Math.max(secs, 120);
  retryN++;
  setTikTok({ status: 'reconnecting', uniqueId, error: why, attempt: retryN, retryIn: secs });
  addLog(`🔄 @${uniqueId}: ${why}. Tự kết nối lại sau ${secs} giây (lần ${retryN})`);
  retryTimer = setTimeout(() => { if (gen === tiktokGen) openTikTok(uniqueId); }, secs * 1000);
}

async function disconnectTikTok(){
  tiktokGen++; stopTimers(); retryN = 0; offlineSince = 0; roomViewers = 0;
  if (tiktok){ try { await tiktok.disconnect(); } catch {} tiktok = null; }
  setTikTok({ status:'idle', uniqueId:'', error:'' });
}

/* ------------------------------------------------- viewers leaving the live */
// TikTok does not announce individual viewers leaving, so this is inferred from two signals:
// a long silence, and more people seated than the room's own viewer count says are watching.
function sweepLeavers(){
  const now = Date.now(), connected = tiktokState.status === 'connected';
  const all = [...viewers.values()].filter(v => !v.demo);
  const isReal = v => !v.id.startsWith('sim_');
  if (settings.leaveAfterMin > 0){
    for (const v of all){
      if (isReal(v) && !connected) continue;
      if (now - v.lastAt > settings.leaveAfterMin * 60_000 * (v.coins > 0 ? 2 : 1)) sendOff(v.id, 'lâu không tương tác');
    }
    if (connected && roomViewers > 0 && now - roomViewersAt < 60_000){
      const real = [...viewers.values()].filter(v => !v.demo && isReal(v));
      real.filter(v => now - v.lastAt > 60_000).sort((a,b) => (a.coins > 0) - (b.coins > 0) || a.lastAt - b.lastAt)
        .slice(0, Math.min(3, real.length - roomViewers)).forEach(v => sendOff(v.id, 'phòng live đã vắng hơn'));
    }
  }
}
setInterval(sweepLeavers, 15_000);

/* ------------------------------------------------- khách vãng lai khi quán vắng */
// Chỉ chạy khi đang nối live: quá 1 phút không có người xem nào vào, ra, bình luận hay tặng quà thì 2 đến 3 khách
// lần lượt vào ngồi một lúc rồi về, nghỉ một quãng rồi đợt khác. Đây là khách demo: không đọc tên, không có xu, không lên
// Khách Sộp, và nhường chỗ ngay khi người xem thật vào. Người xem thật quay lại thì không mở đợt mới.
const IDLE_AFTER = 60_000;
const WALKIN_NAMES = ['Anh Tuấn', 'Chị Hoa', 'Chú Bảy', 'Anh Long', 'Cô Năm', 'Anh Hùng', 'Chị Thảo', 'Bác Tư', 'Anh Dũng', 'Chị Mai', 'Anh Phong', 'Chú Sáu', 'Chị Vy', 'Anh Khoa', 'Cô Lan', 'Anh Nam'];
const WALKIN_LINES = ['Cho chai bia nha!', 'Mồi ngon ghê', 'Quán này mát thiệt', 'Dô cái nào!', 'Ốc hôm nay ngọt ghê', 'Thêm dĩa mực nha em', 'Ngồi đây là nhất', 'Trăm phần trăm nha!'];
const pickOf = list => list[Math.floor(Math.random() * list.length)];
const between = (a, b) => a + Math.random() * (b - a);
let walkInSeq = 0, walkInQueue = [], nextWaveAt = 0;
function idleGuestsTick(){
  const now = Date.now(), walkIns = [...viewers.values()].filter(v => v.id.startsWith('walk_'));
  for (const v of walkIns){
    if (now >= v.leaveAt) sendOff(v.id, 'khách vãng lai về', Math.random() * 3);
    else if (v.sayAt && now >= v.sayAt){ v.sayAt = 0; broadcast({ t:'chat', id: v.id, name: v.name, text: pickOf(WALKIN_LINES) }); }
  }
  const on = settings.idleGuests && settings.theme === 'quan' && ['connected', 'reconnecting'].includes(tiktokState.status);
  if (!on || now - lastRealAt < IDLE_AFTER){ walkInQueue = []; return; }
  while (walkInQueue.length && walkInQueue[0].at <= now){
    const g = walkInQueue.shift(), { v } = seat(`walk_${++walkInSeq}`, g.name, { demo: true });
    if (v){ v.leaveAt = g.leaveAt; v.sayAt = now + between(13_000, 28_000); }
  }
  if (walkInQueue.length || walkIns.length || now < nextWaveAt) return;
  const names = WALKIN_NAMES.slice().sort(() => Math.random() - .5), count = 2 + Math.floor(Math.random() * 2);
  let at = now, lastLeave = now;
  for (let i = 0; i < count; i++){
    const leaveAt = at + between(35_000, 75_000);
    walkInQueue.push({ name: names[i], at, leaveAt });
    lastLeave = Math.max(lastLeave, leaveAt); at += between(3000, 8000);
  }
  nextWaveAt = lastLeave + between(15_000, 45_000);
}
setInterval(idleGuestsTick, 2000);

/* ------------------------------------------------------------- giờ vàng */
// Mỗi 15 phút khi đang live: trong 3 phút, thả đúng mức "from" được màn của mức "to". Xu tính điểm vẫn là xu thật đã thả.
const GOLDEN_EVERY = 15 * 60_000, GOLDEN_LASTS = 3 * 60_000;
const GOLDEN_DEALS = [[50, 100], [200, 300], [500, 1000], [1000, 2000]];
let golden = null, goldenNextAt = 0, goldenIdx = 0;
function goldenPub(){ return golden && { from: golden.from, to: golden.to, dish: golden.dish, left: Math.max(0, golden.endsAt - Date.now()) }; }
function startGolden(){
  const [from, to] = GOLDEN_DEALS[goldenIdx++ % GOLDEN_DEALS.length], dish = rowForCoins(to).dish, now = Date.now();
  golden = { from, to, dish, endsAt: now + GOLDEN_LASTS }; goldenNextAt = now + GOLDEN_EVERY;
  broadcast({ t:'golden', golden: goldenPub() });
  say(`Giờ vàng tới rồi! Trong ba phút, thả ${from} xu là được luôn ${dish}! Nhanh tay nha cả quán!`, { tag:'tables', first: true });
  addLog(`⏰ Giờ vàng: ${from} xu được ${dish}`);
}
function endGolden(){ golden = null; broadcast({ t:'golden', golden: null }); addLog('⏰ Hết giờ vàng'); }
setInterval(() => {
  const now = Date.now();
  if (golden && now >= golden.endsAt) endGolden();
  const on = settings.goldenHour && settings.theme === 'quan' && ['connected', 'reconnecting'].includes(tiktokState.status);
  if (!on){ if (tiktokState.status !== 'reconnecting') goldenNextAt = 0; return; }   // rớt mạng giữa chừng không tính lại từ đầu
  goldenNextAt ||= now + GOLDEN_EVERY;
  if (!golden && now >= goldenNextAt) startGolden();
}, 1000);

/* ------------------------------------------------------------- test data */
const DEMO_NAMES = ['Diệu Hạnh','Minh Tâm','Thiện Đức','Huệ An','Tịnh Nhã','Quảng Trí','Chơn Như','Pháp Hỷ','Nguyên Thanh','Tâm Đăng','Diệu Liên','Trí Hải','Phước Lộc','Hạnh Nguyện','Như Ý','Bảo Châu','Thanh Lương','Từ Tâm','An Lạc','Giác Hoa','Tuệ Minh','Liên Hương','Thu Hà','Ngọc Lan','Đức Anh','Hải Đăng','Mai Anh','Phương Thảo','Trung Kiên','Quang Huy','Bảo Ngọc','Diệu Linh'];
function fillDemo(n){
  const have = [...viewers.values()].filter(v => v.demo).length;
  for (let i = have; i < n && viewers.size < 100; i++){
    const name = DEMO_NAMES[i % DEMO_NAMES.length] + (i >= DEMO_NAMES.length ? ' ' + (Math.floor(i / DEMO_NAMES.length) + 1) : '');
    seat('demo_' + i, name, { demo: true, skin: ['man','woman','woman','man','granny','monk','nun','child'][i % 8] });
  }
}
function clearSeats(){ viewers.clear(); past.clear(); merit.clear(); tablesOpen = BASE_TABLES; broadcast(snapshot()); addLog('Đã làm trống bồ đoàn'); }

/* ------------------------------------------------------------- control */
function onControl(m){
  switch (m.cmd){
    case 'connect': connectTikTok(m.uniqueId); break;
    case 'disconnect': disconnectTikTok(); addLog('Đã ngắt kết nối TikTok'); break;
    case 'chat': { const n = String(m.name || 'Khách').slice(0, 18); onChat('sim_' + n, n, String(m.text || 'Nam mô A Di Đà Phật').slice(0, 120)); break; }
    case 'gift': { const n = String(m.name || 'Khách').slice(0, 18); onGift('sim_' + n, n, String(m.gift || 'Hoa hồng').slice(0, 30), clamp(m.count, 1, 99), clamp(m.diamonds, 1, 50000)); break; }
    case 'leave': sendOff('sim_' + String(m.name || 'Khách').slice(0, 18), 'bấm thử'); break;
    case 'fill': fillDemo(clamp(m.n, 1, 100)); addLog(`Đổ người mẫu: ${viewers.size} người`); break;
    case 'clear': clearSeats(); break;
    case 'bell': broadcast({ t:'bell' }); break;
    case 'mo': broadcast({ t:'mo1' }); break;
    case 'chant': chant(); break;
    case 'say': if (m.text) say(String(m.text).slice(0, 400), { tag:'say' }); break;
    case 'settings':
      applySettings(m.settings || {});
      scheduleChant(); broadcast({ t:'settings', settings, cap: capacity() });
      if (golden && !settings.goldenHour) endGolden();
      break;
    case 'golden': if (settings.theme === 'quan') startGolden(); break;
    case 'bots': setBots(!!m.on, +m.n || 12, m.pace); break;
  }
}

// Only known keys, right types, sane ranges: the panel is local, but nothing from the socket is trusted blindly.
const SETTING_RULES = {
  theme: v => v === 'chanh-dien' ? v : 'quan', quanName: v => String(v).slice(0, 40),
  title: v => String(v).slice(0, 40), subtitle: v => String(v).slice(0, 60),
  voice: v => ['vi-VN-NamMinhNeural', 'vi-VN-HoaiMyNeural'].includes(v) ? v : settings.voice,
  pitch: v => clamp(v, -50, 50), rate: v => clamp(v, -50, 50), moBpm: v => clamp(v, 20, 120), chantEveryMin: v => clamp(v, 1, 60),
  readVipChat: Boolean, idleGuests: Boolean, goldenHour: Boolean, ambience: Boolean, ambVol: v => clamp(v, 0, 100), music: Boolean, mo: Boolean, autoChant: Boolean, joinOnEnter: Boolean, leaveAfterMin: v => clamp(v, 0, 120),
  seatMode: v => ['auto', '24', '36', '64', '100'].includes(String(v)) ? String(v) : 'auto',
};
const clamp = (v, a, b) => Math.max(a, Math.min(b, Math.round(+v || 0)));
function applySettings(o){
  for (const [k, fn] of Object.entries(SETTING_RULES)) if (k in o) settings[k] = fn(o[k]);
  while (viewers.size > seatLimit()) sendOff(yieldingViewer().id, 'giảm số chỗ');
}

/* ----------------------------------------------------------------- bots */
let botTimer = null;
const BOT_LINES = ['Nam mô A Di Đà Phật', 'Nam mô Bổn Sư Thích Ca Mâu Ni Phật', 'Cầu cho gia đình bình an', 'Con xin thành tâm sám hối', 'nữ', 'nam', 'bà',
  'Nguyện cầu cha mẹ mạnh khỏe', 'Mô Phật, an lạc quá', 'Chúc mọi người một ngày bình an', 'sư', 'Cầu công việc hanh thông'];
function setBots(on, n, pace){
  clearInterval(botTimer); botTimer = null;
  if (on){
    n = clamp(n, 1, 100);
    for (let i = 0; i < n; i++) seat('bot_' + i, DEMO_NAMES[(i + 7) % DEMO_NAMES.length] + ' ·bot', { demo: true });
    const every = { slow: 4000, mid: 1800, fast: 700 }[pace] || 1800;
    botTimer = setInterval(() => {
      const ids = [...viewers.keys()].filter(id => id.startsWith('bot_')); if (!ids.length) return;
      const id = ids[Math.floor(Math.random() * ids.length)], v = viewers.get(id), r = Math.random();
      if (r < .62) onChat(id, v.name, BOT_LINES[Math.floor(Math.random() * BOT_LINES.length)]);
      else if (r < .9) broadcast({ t:'like', id, n: 1 + Math.floor(Math.random() * 4) });
      else if (r < .985) onGift(id, v.name, 'Hoa hồng', 1 + Math.floor(Math.random() * 3), 1);
      else onGift(id, v.name, 'Đèn hoa sen', 1, 99);
    }, every);
    addLog(`🤖 Bật ${n} bot, nhịp ${pace}`);
  } else {
    for (const id of [...viewers.keys()]) if (id.startsWith('bot_')) { viewers.delete(id); broadcast({ t:'leave', id }); }
    addLog('🤖 Tắt bot');
  }
  broadcast({ t:'bots', on }, 'control');
}

/* -------------------------------------------------------------- server */
// Security notes (this file is meant to be shared publicly):
//  • listens on 127.0.0.1 only; nothing is reachable from the LAN or internet unless HOST is changed on purpose
//  • Host header must be localhost/127.0.0.1 (blocks DNS-rebinding pages from talking to the server)
//  • WebSocket only accepts pages served by this server (Origin check), so other sites open in the
//    same browser cannot send control commands
//  • static files: only /assets, /live and /seafood, no dot-files, no node_modules, no server source, no path escapes
//  • no TikTok password, cookie or session is ever used or stored; only public room events are read
const HOST = process.env.HOST || '127.0.0.1';
const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.json':'application/json',
  '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp', '.mp3':'audio/mpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon' };
const ALLOWED_HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
const okHost = h => ALLOWED_HOSTS.has(String(h || '').toLowerCase());
const SEP = path.sep;
function resolveStatic(urlPath){
  const p = urlPath;
  if (!/^\/(assets|live|seafood)\//.test(p)) return null;
  if (p.split('/').some(seg => seg.startsWith('.') || seg === 'node_modules')) return null;
  if (/\.(mjs|json|md|log)$/i.test(p) && !p.startsWith('/assets/')) return null;      // never serve server code / package files
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT + SEP)) return null;
  return file;
}
const server = http.createServer((req, res) => {
  if (!okHost(req.headers.host)) { res.writeHead(421).end('wrong host'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
  let p; try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (p === '/' || p === '/seafood' || p === '/seafood/') { res.writeHead(302, { Location: '/seafood/live.html' }).end(); return; }
  const file = resolveStatic(p);
  if (!file) { res.writeHead(404).end('not found'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': p.startsWith('/live/tts/') ? 'no-store' : 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
    if (req.method === 'HEAD') { res.end(); return; }
    fs.createReadStream(file).pipe(res);
  });
});
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 64 * 1024,
  verifyClient: ({ origin, req }) => {
    if (!okHost(req.headers.host)) return false;
    if (!origin) return true;                                   // OBS / non-browser clients send no Origin
    try { return okHost(new URL(origin).host); } catch { return false; }
  } });
function broadcast(msg, only){ const s = JSON.stringify(msg); for (const c of wss.clients) if (c.readyState === 1 && (!only || c.role === only)) c.send(s); }
wss.on('connection', (ws, req) => {
  ws.role = new URL(req.url, 'http://x').searchParams.get('role') === 'control' ? 'control' : 'overlay';
  ws.send(JSON.stringify(snapshot()));
  if (ws.role === 'control') ws.send(JSON.stringify({ t:'logs', lines: log }));
  ws.on('message', buf => {
    if (ws.role !== 'control') return;                          // overlays only listen
    try { const m = JSON.parse(buf); if (m && m.t === 'ctl') onControl(m); } catch (e) { addLog('Lệnh lỗi: ' + e.message); }
  });
});
// npm start (cờ --open): in rõ đường dẫn, mở cửa sổ quán được tự phát tiếng và bảng điều khiển. Quán đã mở sẵn thì chỉ mở lại cửa sổ.
const QUAN_URL = `http://localhost:${PORT}/seafood/live.html`, CONTROL_URL = `http://localhost:${PORT}/live/control.html`;
function openWindows(){
  if (!process.argv.includes('--open') || process.platform !== 'win32') return;
  const flags = `--app=${QUAN_URL} --window-size=540,990 --autoplay-policy=no-user-gesture-required --user-data-dir="%TEMP%\\quan-overlay"`;
  exec(`start "" chrome ${flags} || start "" msedge ${flags}`);
  exec(`start "" "${CONTROL_URL}"`);
}
function printLinks(head){
  console.log(`\n  ${head}\n  Màn hình quán (đưa vào TikTok LIVE Studio): ${QUAN_URL}\n  Bảng điều khiển:                            ${CONTROL_URL}\n`);
}
wss.on('error', () => {});                                      // lỗi cổng đã xử lý ở server bên dưới
server.on('error', e => {
  if (e.code !== 'EADDRINUSE') throw e;
  printLinks(`Quán đã mở sẵn ở cổng ${PORT}, không cần mở thêm. Dùng các đường dẫn này:`);
  openWindows();
  setTimeout(() => process.exit(0), 500);
});
server.listen(PORT, HOST, () => {
  addLog(`Server chạy tại http://localhost:${PORT}  ·  Bảng điều khiển: ${CONTROL_URL}  ·  Overlay: ${QUAN_URL}`);
  printLinks('Quán đã mở. Giữ cửa sổ này, đóng lại là tắt quán.');
  openWindows();
});
