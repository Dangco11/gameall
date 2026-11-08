// Đại Chiến Nhà Trai – Nhà Gái: server game cho TikTok LIVE, chạy riêng với cảnh đám cưới (cổng 3100).
//   cd village && npm run chien        → http://localhost:3200  (màn hình LIVE 9:16: /?live=1)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import type { LiveEvent } from '../../shared/types.ts';
import { TikTokLiveConnector } from '../../server/TikTokLiveConnector.ts';
import { BattleManager } from '../battle/BattleManager.ts';
import { GiftDeduplication } from '../gifts/GiftDeduplication.ts';
import { GiftEventAdapter, GiftEventHandler } from '../gifts/GiftEventAdapter.ts';
import { GiftMapping } from '../gifts/GiftMapping.ts';
import { GiftSimulator, simUserId } from '../gifts/GiftSimulator.ts';
import { cleanName } from '../players/PlayerRegistry.ts';
import { PowerBoard } from '../players/PowerBoard.ts';
import { TEAM_KEYS } from '../types.ts';
import type { ChienControl, ChienSettings, ChienServerMsg, PlayerIdentity, TeamKey } from '../types.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const DATA = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data');
const PORT = +(process.env.PORT_CHIEN ?? process.env.PORT ?? 3200);
const HOST = process.env.HOST || '127.0.0.1';
fs.mkdirSync(DATA, { recursive: true });

const stamp = () => new Date().toLocaleTimeString('vi-VN');
const recent: string[] = [];
type Client = WebSocket & { role?: 'control' | 'view' };
let clients: Set<Client> | null = null;                        // có sau khi mở WebSocket; log() lúc khởi động chỉ in ra console
const log = (s: string) => { const line = `[${stamp()}] ${s}`; console.log(line); recent.push(line); if (recent.length > 60) recent.shift(); send({ t: 'log', text: line }, 'control'); };

/* ------------------------------------------------------------ cấu hình */
// Bảng ánh xạ quà có thể sửa trong data/chien-gifts.json (GiftId thật của TikTok → loại quân)
const MAP_FILE = path.join(DATA, 'chien-gifts.json');
let mapping = new GiftMapping();
try { if (fs.existsSync(MAP_FILE)){ mapping = new GiftMapping(JSON.parse(fs.readFileSync(MAP_FILE, 'utf8'))); log(`Đã nạp bảng ánh xạ quà từ ${MAP_FILE}`); } }
catch (e) { log(`⚠️ File ${MAP_FILE} lỗi, dùng bảng mặc định: ${(e as Error).message}`); }

const bm = new BattleManager(undefined, Date.now() & 0xffff);
const settings: ChienSettings = { allowDualTeam: false, autoNext: true, roundSec: bm.round.duration, gatherSec: bm.round.gatherSec, countdownSec: bm.round.countdownSec, gateHp: bm.cfg.base.gateHp, houseHp: bm.cfg.base.houseHp, showBoard: false, simLocked: false, likesPerUnit: bm.likesPerUnit, likeUnitsMax: bm.likeUnitsMax };
// BXH lực chiến tháng: data/chien-luc-chien.json (tháng cũ cất sang chien-luc-chien-YYYY-MM.json)
const board = new PowerBoard(path.join(DATA, 'chien-luc-chien.json'));
const boardView = () => {
  const live = tiktok?.status.status === 'connected';
  // đang LIVE thật thì ẩn người chơi thử (sim_) khỏi bảng
  const rows = board.sorted().filter(r => !(live && r.id.startsWith('sim_'))).slice(0, 20);
  return { month: board.month, top: rows.map((r, i) => ({ id: r.id, name: r.name, avatar: tiktokAvatar(r.avatar) ? '/avatar/' + encodeURIComponent(r.id) : r.id.startsWith('sim_') && /^https?:\/\//.test(r.avatar) ? r.avatar : '', power: r.power, wins: r.wins, rank: i + 1 })) };
};
// Hết trận: cộng lực chiến được chia cho đội thắng; người đội thua vẫn được tính một trận đã chơi
function applyPayouts(){
  const r = bm.result; if (!r) return;
  const got = new Map(r.payouts.map(p => [p.id, p.gain]));
  for (const p of bm.players.active()){
    if (p.round.units <= 0 && p.round.gift <= 0) continue;
    board.add(p.UserId, p.DisplayName, p.AvatarUrl, got.get(p.UserId) ?? 0, r.winner === p.Team);
  }
  board.save();
  if (r.pot) log(`🏆 Chia ${r.pot} lực chiến cho ${r.winner === 'draw' ? 'mọi người (hòa, trả lại phần đã góp)' : (r.winner === 'trai' ? 'Nhà Trai' : 'Nhà Gái')}: ${r.payouts.slice(0, 5).map(p => p.name + ' +' + p.gain).join(', ')}`);
}
// Người trong top 20 tháng vào phòng: vinh danh (mỗi người tối đa 10 phút một lần)
const greeted = new Map<string, number>();
function greet(id: string, name: string){
  const t = Date.now(); if (t - (greeted.get(id) ?? 0) < 600_000) return;
  const view = boardView(), row = view.top.find(r => r.id === id); if (!row) return;
  greeted.set(id, t);
  bm.emit({ e: 'honor', user: id, name: cleanName(name || row.name), avatar: row.avatar, rank: row.rank, power: row.power });
  log(`🏆 Top ${row.rank} lực chiến tháng ${cleanName(name || row.name)} đã vào phòng`);
}
// Cài đặt trận (thời gian, máu căn cứ...) lưu vào data/chien-settings.json, khởi động lại vẫn giữ
const SETTINGS_FILE = path.join(DATA, 'chien-settings.json');
const LIMITS = { roundSec: [30, 3600], gatherSec: [0, 600], countdownSec: [0, 120], gateHp: [1000, 5_000_000], houseHp: [1000, 20_000_000], likesPerUnit: [0, 10_000], likeUnitsMax: [0, 500] } as const;
const clampSet = (k: keyof typeof LIMITS, v: unknown) => Math.max(LIMITS[k][0], Math.min(LIMITS[k][1], Math.round(+(v as number))));
function applySettings(s: Partial<ChienSettings>){
  if (typeof s.allowDualTeam === 'boolean') bm.teams.allowDualTeam = s.allowDualTeam;
  if (typeof s.autoNext === 'boolean') bm.round.autoNext = s.autoNext;
  if (typeof s.showBoard === 'boolean') settings.showBoard = s.showBoard;
  // giao chiến, tập hợp, đếm ngược đổi được cả khi đang chạy (giao chiến rút ngắn quá thời gian đã đánh thì trận kết thúc ngay)
  if (Number.isFinite(+s.roundSec!)) bm.round.duration = clampSet('roundSec', s.roundSec);
  if (Number.isFinite(+s.gatherSec!)) bm.round.gatherSec = clampSet('gatherSec', s.gatherSec);
  if (Number.isFinite(+s.countdownSec!)) bm.round.countdownSec = clampSet('countdownSec', s.countdownSec);
  if (s.likesPerUnit !== undefined && Number.isFinite(+s.likesPerUnit)) bm.likesPerUnit = clampSet('likesPerUnit', s.likesPerUnit);
  if (s.likeUnitsMax !== undefined && Number.isFinite(+s.likeUnitsMax)) bm.likeUnitsMax = clampSet('likeUnitsMax', s.likeUnitsMax);
  // máu cổng, nhà chính hai bên: áp dụng ngay, giữ tỉ lệ máu đang còn
  if (Number.isFinite(+s.gateHp!) || Number.isFinite(+s.houseHp!)){
    const g = Number.isFinite(+s.gateHp!) ? clampSet('gateHp', s.gateHp) : bm.bases.trai.gateMax, h = Number.isFinite(+s.houseHp!) ? clampSet('houseHp', s.houseHp) : bm.bases.trai.houseMax;
    for (const t of TEAM_KEYS) bm.bases[t].setMax(g, h);
  }
}
const currentSettings = () => ({ allowDualTeam: bm.teams.allowDualTeam, autoNext: bm.round.autoNext, roundSec: bm.round.duration, gatherSec: bm.round.gatherSec, countdownSec: bm.round.countdownSec, gateHp: bm.bases.trai.gateMax, houseHp: bm.bases.trai.houseMax, likesPerUnit: bm.likesPerUnit, likeUnitsMax: bm.likeUnitsMax });
try { if (fs.existsSync(SETTINGS_FILE)){ applySettings(JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'))); log(`Đã nạp cài đặt trận từ ${SETTINGS_FILE}`); } } catch (e) { log('⚠️ File cài đặt lỗi, dùng mặc định: ' + (e as Error).message); }

// Ảnh đại diện: ảnh TikTok đi qua proxy /avatar/<id> (đã kiểm tra máy chủ ảnh), người chơi thử nhập link thì dùng thẳng,
// còn lại màn hình tự vẽ ảnh mặc định theo chữ cái đầu và màu phe.
const AVATAR_HOST = /(^|\.)(tiktokcdn(-us|-eu)?\.com|ibyteimg\.com|byteimg\.com|muscdn\.com)$/i;
const tiktokAvatar = (url: string) => { try { const u = new URL(url); return u.protocol === 'https:' && AVATAR_HOST.test(u.hostname); } catch { return false; } };
bm.players.avatarView = (p: PlayerIdentity) => !p.AvatarUrl ? '' : tiktokAvatar(p.AvatarUrl) ? '/avatar/' + encodeURIComponent(p.UserId) : p.sim && /^https?:\/\//i.test(p.AvatarUrl) ? p.AvatarUrl : '';

/* ------------------------------------------------------------ nhật ký quà */
// Mỗi quà đã nhận ghi một dòng JSON. Khởi động lại thì nạp khóa chống trùng, để TikTok phát lại tin cũ không ra quân lần hai.
const GIFT_LOG = path.join(DATA, 'chien-gifts.log.jsonl');
const handler = new GiftEventHandler(bm, mapping, {
  gift(o, unit, team, units){
    const e = o.ev;
    fs.appendFile(GIFT_LOG, JSON.stringify({ at: new Date().toISOString(), key: GiftDeduplication.key(e), user: e.UserId, name: e.DisplayName, gift: e.GiftName, giftId: e.GiftId, value: e.GiftValue, count: o.count, units, unit, team, sim: e.Sim }) + '\n', () => {});
    if (!e.Sim || o.count >= 5 || e.GiftValue >= 30) log(`🎁 ${cleanName(e.DisplayName)} tặng ${o.count} x ${e.GiftName} (${e.GiftValue} xu) → ${units} ${unit} cho ${team === 'trai' ? 'Nhà Trai' : 'Nhà Gái'}`);
  },
  log,
});
try {
  const lines = fs.existsSync(GIFT_LOG) ? fs.readFileSync(GIFT_LOG, 'utf8').trim().split('\n').slice(-30_000) : [];
  const keys: string[] = [];
  for (const l of lines){ try { const k = JSON.parse(l).key; if (k && !String(k).startsWith('sim-')) keys.push(k); } catch { /* dòng hỏng */ } }
  handler.dedup.remember(keys);
  if (keys.length) log(`Đã nạp ${keys.length} mã quà đã xử lý (chống trùng sau khi khởi động lại)`);
} catch { /* chưa có nhật ký */ }

/* ------------------------------------------------------------ nguồn sự kiện */
const tiktok = new TikTokLiveConnector((ev: LiveEvent) => {
  if (ev.id) greet(ev.id, ev.name);
  if (ev.kind === 'gift') handler.ingest(GiftEventAdapter.fromLive(ev));
  else if (ev.kind === 'comment') handler.chat(ev.id, ev.name, ev.text, ev.avatar ?? '', ev.sim);
  else if (ev.kind === 'like') onLike(ev.id, ev.name, ev.avatar ?? '', ev.count, ev.sim);
}, s => {
  settings.simLocked = s.status === 'connected';
  if (s.status === 'reconnecting') log(`🔄 Mất kết nối LIVE, đang nối lại (lần ${s.attempt}). Trận vẫn chạy, quà đã nhận không mất.`);
}, log);
const sim = new GiftSimulator(ev => handler.ingest(ev));
// thả tim → Dân binh (miễn phí, có giới hạn; xem BALANCE.likesPerUnit)
function onLike(id: string, name: string, avatar: string, count: number, simUser: boolean, team?: TeamKey){
  if (!id) return;
  const p = bm.players.ensure({ UserId: id, DisplayName: name, AvatarUrl: avatar, Sim: simUser });
  const n = Math.max(1, Math.min(1000, count | 0));
  const r = bm.like(p, n, team);
  if (r.units > 0) bm.emit({ e: 'like', user: p.UserId, name: p.DisplayName, team: r.team, likes: n, units: r.units });
}

/* ------------------------------------------------------------ vòng mô phỏng */
// Mô phỏng 10 nhịp/giây, có bù trễ (máy bận thì chạy bù tối đa 3 nhịp). Màn hình nhận khung mỗi nhịp và tự nội suy.
let lastTick = performance.now(), acc = 0, tickMs = 0, hudAt = 0;
setInterval(() => {
  const now = performance.now();
  acc += now - lastTick; lastTick = now;
  let steps = 0;
  while (acc >= bm.cfg.tickMs && steps < 3){
    const t0 = performance.now();
    handler.drain(300, 6);
    bm.tick();
    tickMs += (performance.now() - t0 - tickMs) * 0.1;
    acc -= bm.cfg.tickMs; steps++;
    const ev = bm.takeEvents();
    if (ev.some(e => e.e === 'round' && e.state === 'ended')) applyPayouts();
    send({ t: 'f', tick: bm.tickN, u: bm.frame(), ev });
  }
  if (acc > bm.cfg.tickMs * 3) acc = 0;                         // treo lâu (máy ngủ): bỏ qua, không chạy dồn
  if (now - hudAt > 500){ hudAt = now; send({ t: 'h', hud: hud() }); handler.dedup.tick(); }
}, 20);
const hud = () => bm.hud({ live: tiktok.status, queue: handler.stats(), settings: { ...settings, ...currentSettings() }, board: boardView(), gifts: handler.mapping.cfg.byValue });

process.on('unhandledRejection', e => log('Lỗi chưa xử lý: ' + ((e as Error)?.stack ?? e)));
process.on('uncaughtException', e => log('Lỗi chưa bắt: ' + (e?.stack ?? e)));

/* ------------------------------------------------------------ điều khiển */
const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);
function onControl(m: ChienControl){
  if (m.t === 'sim' || m.t === 'test'){
    // đang nối TikTok thật thì khóa quà thử, để livestream không hiện quà giả
    if (settings.simLocked){ log('Đang LIVE thật: Gift Simulator bị khóa'); return; }
    if (m.t === 'test'){ if (['trai', 'gai', 'u100', 'u300', 'combo', 'boss', 'mix'].includes(m.what)){ log(`🧪 Chạy thử: ${m.what}`); sim.test(m.what); } return; }
    const name = cleanName(m.name || 'Khách thử'), user = clip(m.user, 40) || simUserId(name);
    greet(user.startsWith('sim_') ? user : simUserId(user), name);
    if (m.kind === 'chat'){ handler.chat(user.startsWith('sim_') ? user : simUserId(user), name, clip(m.text, 120), '', true); return; }
    if (m.kind === 'like'){ onLike(user.startsWith('sim_') ? user : simUserId(user), name, '', Math.max(1, Math.min(1000, +m.count | 0)), true, m.team === 'trai' || m.team === 'gai' ? m.team : undefined); return; }
    const avatar = /^https?:\/\//i.test(String(m.avatar ?? '')) ? clip(m.avatar, 600) : '';
    const team = m.team === 'trai' || m.team === 'gai' ? m.team : undefined;
    sim.gift({ user: user.startsWith('sim_') ? user : simUserId(user), name, avatar, team, value: Math.max(1, Math.min(50_000, +m.value | 0)), count: Math.max(1, Math.min(100, +m.count | 0)), combo: !!m.combo });
    return;
  }
  switch (m.cmd){
    case 'start': if (bm.start()) log(`▶️ Bắt đầu vòng ${bm.round.round}`); break;
    case 'go': if (bm.go()) log('⚔️ Host bấm Bắt đầu: bỏ qua Tập hợp, xuất quân ngay'); break;
    case 'end': if (bm.endNow()) log('⏹ Kết thúc vòng sớm'); break;
    case 'boardClearSim': log(`🧹 Đã xóa ${board.removeWhere(r => r.id.startsWith('sim_'))} người chơi thử khỏi BXH lực chiến`); break;
    case 'reset': bm.resetRound(true); log('🔄 Đặt lại trận (xóa quân, điểm, hàng viện binh)'); break;
    case 'pause': if (bm.pause()) log('⏸ Tạm dừng'); break;
    case 'resume': if (bm.resume()) log('▶️ Tiếp tục'); break;
    case 'connect': void tiktok.connect(clip(m.user, 80)); break;
    case 'disconnect': void tiktok.disconnect(); break;
    case 'assign': {
      const team = m.team === 'gai' ? 'gai' : 'trai', id = clip(m.user, 64).replace(/^@/, '');
      const p = bm.players.get(id) ?? [...bm.players.all.values()].find(q => q.Username === id || q.DisplayName === id) ?? bm.players.ensure({ UserId: id, Username: id, DisplayName: id });
      const r = bm.teams.choose(p, team, 'host');
      bm.emit({ e: 'team', user: p.UserId, name: p.DisplayName, team: r.team, source: 'host', locked: !r.ok });
      log(r.ok ? `👥 Host gán ${p.DisplayName} vào ${team === 'trai' ? 'Nhà Trai' : 'Nhà Gái'}` : `🔒 ${p.DisplayName} đang có quân bên kia, sẽ đổi phe từ vòng sau`);
      break;
    }
    case 'settings': {
      applySettings(m.settings ?? {});
      fs.writeFile(SETTINGS_FILE, JSON.stringify(currentSettings(), null, 2), () => {});
      log(`⚙️ Cài đặt: đếm ngược ${bm.round.countdownSec}s · tập hợp ${bm.round.gatherSec}s · giao chiến ${bm.round.duration}s · máu cổng ${bm.bases.trai.gateMax} · máu nhà ${bm.bases.trai.houseMax} · ${bm.likesPerUnit ? `${bm.likesPerUnit} tim = 1 Dân binh (tối đa ${bm.likeUnitsMax}/người/vòng)` : 'tim không ra quân'} · tự sang vòng mới ${bm.round.autoNext ? 'bật' : 'tắt'} · cho phép hai phe ${bm.teams.allowDualTeam ? 'bật' : 'tắt'}`);
      break;
    }
  }
}

/* ------------------------------------------------------------ http + ws */
// An toàn như server đám cưới: chỉ nghe localhost, kiểm tra Host, WebSocket kiểm tra Origin, màn hình LIVE không gửi lệnh được.
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.map': 'application/json', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json', '.bin': 'application/octet-stream', '.ktx2': 'image/ktx2' };   // model 3D trong public/models/
const ALLOWED = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
if (HOST !== '127.0.0.1' && HOST !== 'localhost') for (const h of (process.env.ALLOW_HOSTS ?? '').split(',').filter(Boolean)) ALLOWED.add(h.toLowerCase());
const okHost = (h: string | undefined) => ALLOWED.has(String(h ?? '').toLowerCase());

const avatarCache = new Map<string, { type: string; body: Buffer } | null>();
async function serveAvatar(id: string, res: http.ServerResponse){
  const url = bm.players.get(id)?.AvatarUrl || board.rows.get(id)?.avatar || '';
  let hit = avatarCache.get(id);
  if (hit === undefined && tiktokAvatar(url)){
    try {
      const r = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(5000) });
      const type = r.headers.get('content-type') ?? '';
      if (!r.ok || !/^image\/(jpeg|png|webp|gif)/.test(type)) throw new Error('type');
      const body = Buffer.from(await r.arrayBuffer());
      if (body.length > 300_000) throw new Error('size');
      hit = { type, body };
    } catch { hit = null; }                                      // lỗi cũng nhớ, không tải lại liên tục; màn hình dùng ảnh mặc định
    avatarCache.set(id, hit);
    if (avatarCache.size > 400) avatarCache.delete(avatarCache.keys().next().value as string);
  }
  if (!hit){ res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': hit.type, 'Cache-Control': 'max-age=3600', 'X-Content-Type-Options': 'nosniff' }).end(hit.body);
}

const server = http.createServer((req, res) => {
  if (!okHost(req.headers.host)){ res.writeHead(421).end('wrong host'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD'){ res.writeHead(405).end(); return; }
  let p: string;
  try { p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (p.startsWith('/avatar/')){ void serveAvatar(p.slice(8, 80), res); return; }
  if (p === '/' || p === '/index.html') p = '/chien.html';
  if (p.split('/').some(seg => seg.startsWith('.'))){ res.writeHead(404).end(); return; }
  const file = path.normalize(path.join(PUBLIC, p));
  if (!file.startsWith(PUBLIC + path.sep)){ res.writeHead(404).end(); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()){ res.writeHead(404).end(p === '/chien.js' ? 'chưa build: chạy npm run chien' : 'not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
    if (req.method === 'HEAD'){ res.end(); return; }
    fs.createReadStream(file).pipe(res);
  });
});

const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 16 * 1024,
  verifyClient: ({ origin, req }: { origin: string; req: http.IncomingMessage }) => {
    if (!okHost(req.headers.host)) return false;
    if (!origin) return true;
    try { return okHost(new URL(origin).host); } catch { return false; }
  } });
clients = wss.clients as Set<Client>;
const helloFor = (ws: Client): ChienServerMsg => ({ t: 'hello', role: ws.role ?? 'view', units: bm.unitInfos(), hud: hud(), frame: { t: 'f', tick: bm.tickN, u: bm.frame(), ev: [] } });
function send(m: ChienServerMsg, only?: 'control' | 'view'){
  if (!clients || !clients.size) return;
  const s = JSON.stringify(m);
  for (const c of clients){
    if (only && c.role !== only) continue;
    // máy xem bị chậm (đệm quá 2 MB) thì bỏ khung hình đó, khung sau tự bắt kịp; HUD và nhật ký vẫn gửi
    if (c.readyState === 1 && (m.t !== 'f' || c.bufferedAmount < 2 * 1024 * 1024)) c.send(s);
  }
}
wss.on('connection', (ws: Client, req) => {
  ws.role = new URL(req.url ?? '/', 'http://x').searchParams.get('role') === 'control' ? 'control' : 'view';
  ws.send(JSON.stringify(helloFor(ws)));
  if (ws.role === 'control') for (const line of recent) ws.send(JSON.stringify({ t: 'log', text: line }));
  let budget = 30, last = Date.now();
  let resyncAt = 0;
  ws.on('message', buf => {
    const t = Date.now();
    // màn hình (kể cả màn LIVE) lỡ mất tin xuất hiện quân thì xin ảnh chụp đầy đủ, tối đa 3 giây một lần
    if (String(buf).startsWith('{"t":"resync"')){ if (t - resyncAt > 3000){ resyncAt = t; ws.send(JSON.stringify(helloFor(ws))); } return; }
    if (ws.role !== 'control') return;
    budget = Math.min(30, budget + (t - last) / 80); last = t;
    if (budget < 1) return;
    budget--;
    try { const m = JSON.parse(String(buf)) as ChienControl; if (m && (m.t === 'sim' || m.t === 'ctl' || m.t === 'test')) onControl(m); }
    catch (e) { log('Lệnh lỗi: ' + (e as Error).message); }
  });
});

let failed = false;
const onListenError = (e: NodeJS.ErrnoException) => {
  if (failed) return; failed = true;
  log(e.code === 'EADDRINUSE' ? `❌ Cổng ${PORT} đang bận. Đại Chiến có thể đã chạy ở cửa sổ khác, hoặc chạy với cổng khác: $env:PORT_CHIEN=3201; npm run chien` : '❌ Không mở được server: ' + e.message);
  process.exit(1);
};
server.on('error', onListenError); wss.on('error', onListenError);
function openBrowser(url: string){
  if (process.env.NO_OPEN || process.env.CI) return;
  const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try { spawn(cmd as string, args as string[], { stdio: 'ignore', detached: true }).on('error', () => {}).unref(); } catch { /* không có trình duyệt */ }
}
server.listen(PORT, HOST, () => {
  log(`⚔️ Đại Chiến Nhà Trai – Nhà Gái chạy tại http://localhost:${PORT}  ·  Màn hình LIVE 9:16: http://localhost:${PORT}/?live=1`);
  log(`Phe: ${TEAM_KEYS.join(' / ')} · bình luận "1" vào Nhà Trai, "2" vào Nhà Gái · quà 1/5/10/30/100/500 xu ra 6 cấp quân`);
  openBrowser(`http://localhost:${PORT}/`);
});
