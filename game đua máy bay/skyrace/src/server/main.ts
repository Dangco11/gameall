// Đua Máy Bay: server game cho TikTok LIVE.
//   cd skyrace && npm install && npm start        → http://localhost:3200  (màn hình LIVE 9:16: /?live=1)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import { RACE } from '../shared/game.ts';
import { MAPS } from '../shared/maps.ts';
import type { ControlMessage, Fx, LiveEvent, Settings, State } from '../shared/types.ts';
import { EventQueue } from './EventQueue.ts';
import { Race } from './Race.ts';
import { Records } from './Records.ts';
import { TikTokLiveConnector } from './TikTokLiveConnector.ts';
import { Voice, commentary, inviteLine, spoken } from './Voice.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const DATA = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data');
const PORT = +(process.env.PORT ?? 3200);
const HOST = process.env.HOST || '127.0.0.1';
const log = (s: string) => console.log(`[${new Date().toLocaleTimeString('vi-VN')}] ${s}`);

/* ------------------------------------------------------------ trạng thái */
const SETTINGS_FILE = path.join(DATA, 'settings.json');
fs.mkdirSync(DATA, { recursive: true });
let settings: Settings = { voice: true, bots: 4, laps: RACE.laps, map: 'auto' };
try { settings = { ...settings, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) }; } catch { /* mặc định */ }
if (settings.map !== 'auto' && !MAPS.some(m => m.key === settings.map)) settings.map = 'auto';
settings.laps = 1;                                      // luôn đua 1 vòng
const records = new Records(DATA);
const race = new Race();
race.bots = settings.bots; race.laps = settings.laps; race.setMap(settings.map); race.fitBots();
// kỷ lục: nhanh hơn người nhanh nhất từ trước tới giờ (tính cả người vừa về trong cuộc đua này)
let fastest = Infinity;
race.isRecord = ms => { const b = Math.min(fastest, records.boards().best[0]?.ms ?? Infinity); if (ms < b){ fastest = ms; return true; } return false; };
race.onRaceEnd = results => {
  records.race(results);
  const champ = results.find(r => r.place === 1 && r.ms);
  if (champ && settings.voice) setTimeout(() => voice.say(`Xin chúc mừng nhà vô địch ${spoken(champ.name)}! Một tràng pháo tay thật lớn nào bà con ơi!`, true), 2500);
  const real = results.filter(r => !r.bot).length;
  log(`🏁 Kết thúc cuộc đua #${race.raceNo}: ${results.length} máy bay (${real} người xem)${results[0]?.ms ? `, nhất: ${results[0].name}` : ''}`);
};
const voice = new Voice(path.join(ROOT, 'tts'), (url, text) => extra.push({ k: 'voice', url, text }), log);
voice.enabled = settings.voice;
const extra: Fx[] = [];          // fx sinh ngoài cuộc đua (giọng đọc, ghi chú)
const viewers = new Map<string, number>();

const queue = new EventQueue();
const tiktok = new TikTokLiveConnector(ev => queue.push(ev), s => { liveDirty = true; if (s.status === 'connected') log('Đang live thật: bảng mô phỏng tạm khóa'); }, log);
let liveDirty = true, settingsDirty = true;

function handle(ev: LiveEvent){
  const avatar = ev.avatar && /^https:\/\/[^/]*(tiktokcdn|ibyteimg|byteimg|muscdn)[^/]*\//i.test(ev.avatar) ? ev.avatar : '';
  const who = { id: ev.id, name: ev.name, avatar, sim: ev.sim };
  viewers.set(ev.id, Date.now());
  switch (ev.kind){
    case 'comment': race.comment(who, ev.text); break;
    case 'like': race.like(who, ev.count); break;
    case 'gift': {
      const s = race.gift(who, ev.gift, ev.diamonds, ev.count);
      records.gift(ev.id, ev.name, ev.diamonds * ev.count, ev.sim);
      if (s) log(`🎁 ${ev.name} tặng ${ev.count}x ${ev.gift} (${ev.diamonds} xu) → ${s.icon} ${s.name}`);
      break;
    }
    case 'follow': race.follow(who); break;                               // follow kênh: tự vào đua
    case 'share': race.like(who, RACE.likesPerBoost * 10); break;         // chia sẻ live = 1 hoa hồng (tăng tốc nhẹ 3 giây)
    default: break;
  }
}

/* -------------------------------------------------------------- vòng lặp */
// sự kiện mỗi 50 ms, mô phỏng 10 lần một giây, gửi màn hình 5 lần một giây
setInterval(() => { queue.drain(300, ev => handle(ev), 10); }, 50);
setInterval(() => race.tick(), 100);
let sends = 0, lastInvite = Date.now();
setInterval(() => {
  const fx = race.takeFx();
  if (settings.voice) for (const f of fx){
    const c = commentary(f, race.laps);
    if (c) voice.say(c[0], c[1]);
  }
  fx.push(...extra.splice(0));
  const now = Date.now();
  if (sends % 25 === 0) for (const [id, t] of viewers) if (now - t > 5 * 60_000) viewers.delete(id);
  const msg: State = { t: 'state', now, race: race.state(), racers: race.pub(), fx };
  if (sends++ % 10 === 0 || records.dirty){ msg.boards = records.boards(); records.dirty = false; msg.viewers = viewers.size; }
  if (liveDirty){ msg.live = tiktok.status; liveDirty = false; }
  if (settingsDirty){ msg.settings = settings; settingsDirty = false; }
  broadcast(JSON.stringify(msg));
}, 200);
// Đang chờ xuất phát mà vắng người thật: bình luận viên mời vào đua (45 giây một lần)
setInterval(() => {
  if (!settings.voice || voice.backlog) return;
  if (race.phase === 'lobby' && Date.now() - lastInvite > 45_000){ lastInvite = Date.now(); voice.say(inviteLine()); }
}, 5000);
setInterval(() => { records.save(); }, 30_000);
process.on('unhandledRejection', e => log('Lỗi chưa xử lý: ' + ((e as Error)?.stack ?? e)));
process.on('uncaughtException', e => log('Lỗi chưa bắt: ' + (e?.stack ?? e)));
const shutdown = () => { records.save(); process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);

/* ---------------------------------------------------------- điều khiển */
const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);
let simSeq = 0;
function onControl(m: ControlMessage){
  if (m.t === 'sim'){
    // đang nối TikTok thật thì không cho quà thử, để livestream không hiện quà giả
    if (tiktok.status.status === 'connected'){ log('Đang live thật: bỏ qua thao tác thử từ bảng mô phỏng'); return; }
    const name = clip(m.name, 24).trim() || 'Khách', id = 'sim:' + (clip(m.id, 40) || name);
    const base = { msgId: `sim${++simSeq}`, id, name, sim: true };
    if (m.kind === 'gift') queue.push({ ...base, kind: 'gift', gift: clip(m.gift, 30), diamonds: Math.max(1, Math.min(50_000, +m.diamonds | 0)), count: Math.max(1, Math.min(99, +m.count | 0)) });
    else if (m.kind === 'comment') queue.push({ ...base, kind: 'comment', text: clip(m.text, 200) });
    else if (m.kind === 'like') queue.push({ ...base, kind: 'like', count: Math.max(1, Math.min(500, +(m.count ?? 1) | 0)) });
    else queue.push({ ...base, kind: m.kind });
    return;
  }
  switch (m.cmd){
    case 'connect': void tiktok.connect(clip(m.user, 80)); break;
    case 'disconnect': void tiktok.disconnect(); break;
    case 'newRace': race.newRace(); log('Mở cuộc đua mới'); break;
    case 'startNow': race.startNow(); log('Xuất phát ngay'); break;
    case 'clearSim': race.removeSim(); log('Đã xóa máy bay mô phỏng'); break;
    case 'settings': {
      const s = m.settings ?? {};
      if (typeof s.voice === 'boolean') settings.voice = s.voice;
      if (Number.isFinite(s.bots)) settings.bots = Math.max(0, Math.min(20, s.bots! | 0));
      if (s.map === 'auto' || MAPS.some(m => m.key === s.map)){ settings.map = s.map!; race.setMap(settings.map); }
      voice.enabled = settings.voice; race.bots = settings.bots;
      if (race.phase === 'lobby'){ race.laps = settings.laps; race.fitBots(); }
      else log('Số vòng mới áp dụng từ cuộc đua sau');
      settingsDirty = true;
      try { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings)); } catch { /* bỏ qua */ }
      break;
    }
  }
}
// số vòng mới: áp dụng khi mở sảnh chờ của cuộc sau
setInterval(() => { if (race.phase === 'lobby' && race.laps !== settings.laps) race.laps = settings.laps; }, 1000);

/* -------------------------------------------------------------- server */
// Chỉ nghe localhost, kiểm tra Host chống DNS rebinding, WebSocket kiểm tra Origin, file tĩnh chỉ trong public/.
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.map': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.jpg': 'image/jpeg' };
const ALLOWED_HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
if (HOST !== '127.0.0.1' && HOST !== 'localhost') for (const h of (process.env.ALLOW_HOSTS ?? '').split(',').filter(Boolean)) ALLOWED_HOSTS.add(h.toLowerCase());
const okHost = (h: string | undefined) => ALLOWED_HOSTS.has(String(h ?? '').toLowerCase());

// Nhạc nền tùy chọn: file mp3/m4a/ogg/mp4 trong skyrace/music/
const MUSIC = path.join(ROOT, 'music');
const AUDIO_TYPES: Record<string, string> = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.mp4': 'video/mp4' };
const musicFile = (name: string) => !/[\\/]/.test(name) && !name.startsWith('.') && AUDIO_TYPES[path.extname(name).toLowerCase()] ? name : null;
function serveMusic(name: string, req: http.IncomingMessage, res: http.ServerResponse){
  if (name === 'list.json'){
    let files: string[] = [];
    try { files = fs.readdirSync(MUSIC).filter(n => musicFile(n)); } catch { /* chưa có thư mục */ }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }).end(JSON.stringify(files.map(n => '/music/' + encodeURIComponent(n))));
    return;
  }
  const ok = musicFile(name), file = ok ? path.join(MUSIC, ok) : '';
  fs.stat(file, (err, st) => {
    if (!ok || err || !st.isFile()){ res.writeHead(404).end(); return; }
    const type = AUDIO_TYPES[path.extname(file).toLowerCase()];
    const m = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range ?? ''));
    if (m){
      const start = m[1] ? +m[1] : 0, end = m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      if (start > end || start >= st.size){ res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }).end(); return; }
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': st.size });
    fs.createReadStream(file).pipe(res);
  });
}

// Máy bay 3D từ file .glb trong skyrace/models/ (đặt tên theo loại máy bay, xem models/DOC-TRUOC.txt).
// Chỉ đúng tên file .glb trong thư mục đó, không đi ra ngoài.
const MODELS = path.join(ROOT, 'models');
const modelFile = (name: string) => !/[\\/]/.test(name) && !name.startsWith('.') && (/\.glb$/i.test(name) || name === 'models.json') ? name : null;
function serveModel(name: string, res: http.ServerResponse){
  if (name === 'list.json'){
    let files: string[] = [];
    try { files = fs.readdirSync(MODELS).filter(n => modelFile(n) && /\.glb$/i.test(n)); } catch { /* chưa có thư mục */ }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }).end(JSON.stringify(files));
    return;
  }
  const ok = modelFile(name), file = ok ? path.join(MODELS, ok) : '';
  fs.stat(file, (err, st) => {
    if (!ok || err || !st.isFile()){ res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': ok.endsWith('.json') ? 'application/json' : 'model/gltf-binary', 'Content-Length': st.size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (!okHost(req.headers.host)){ res.writeHead(421).end('wrong host'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD'){ res.writeHead(405).end(); return; }
  let p: string;
  try { p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (p.startsWith('/music/')){ serveMusic(p.slice(7), req, res); return; }
  if (p.startsWith('/models/')){ serveModel(p.slice(8), res); return; }
  if (p === '/') p = '/index.html';
  const tts = /^\/tts\/(v\d+_\d+\.mp3)$/.exec(p);
  const base = tts ? path.join(ROOT, 'tts') : PUBLIC;
  if (tts) p = '/' + tts[1];
  if (p.split('/').some(seg => seg.startsWith('.'))){ res.writeHead(404).end('not found'); return; }
  const file = path.normalize(path.join(base, p));
  if (!file.startsWith(base + path.sep)){ res.writeHead(404).end('not found'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()){ res.writeHead(404).end(p === '/app.js' ? 'chưa build: chạy npm start' : 'not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
    if (req.method === 'HEAD'){ res.end(); return; }
    fs.createReadStream(file).pipe(res);
  });
});

type Client = WebSocket & { role?: 'control' | 'view' };
const wss = new WebSocketServer({ server, path: '/ws', maxPayload: 16 * 1024,
  verifyClient: ({ origin, req }: { origin: string; req: http.IncomingMessage }) => {
    if (!okHost(req.headers.host)) return false;
    if (!origin) return true;
    try { return okHost(new URL(origin).host); } catch { return false; }
  } });
function broadcast(s: string){ for (const c of wss.clients) if (c.readyState === 1 && c.bufferedAmount < 4 * 1024 * 1024) c.send(s); }
wss.on('connection', (ws: Client, req) => {
  ws.role = new URL(req.url ?? '/', 'http://x').searchParams.get('role') === 'control' ? 'control' : 'view';
  const hello: State & { hello: true } = { t: 'state', hello: true, now: Date.now(), race: race.state(), racers: race.pub(), fx: [], boards: records.boards(), live: tiktok.status, settings, viewers: viewers.size };
  ws.send(JSON.stringify(hello));
  let budget = 20, last = Date.now();
  ws.on('message', buf => {
    if (ws.role !== 'control') return;
    const t = Date.now(); budget = Math.min(20, budget + (t - last) / 100); last = t;
    if (budget < 1) return;
    budget--;
    try { const m = JSON.parse(String(buf)) as ControlMessage; if (m && (m.t === 'sim' || m.t === 'ctl')) onControl(m); }
    catch (e) { log('Lệnh lỗi: ' + (e as Error).message); }
  });
});
let listenFailed = false;
async function onListenError(e: NodeJS.ErrnoException){
  if (listenFailed) return;
  listenFailed = true;
  if (e.code === 'EADDRINUSE'){
    const page = await fetch(`http://localhost:${PORT}/`).then(r => r.text()).catch(() => '');
    if (page.includes('Đua Máy Bay')){ log(`ℹ️ Đua Máy Bay đã chạy sẵn ở cửa sổ khác, mở luôn http://localhost:${PORT}`); openBrowser(`http://localhost:${PORT}/`); }
    else log(`❌ Cổng ${PORT} đang bị chương trình khác dùng. Chạy với cổng khác: $env:PORT=3201; npm start`);
  } else log('❌ Không mở được server: ' + e.message);
  process.exit(1);
}
server.on('error', onListenError);
wss.on('error', onListenError);
function openBrowser(url: string){
  if (process.env.NO_OPEN || process.env.CI) return;
  const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try { spawn(cmd as string, args as string[], { stdio: 'ignore', detached: true }).on('error', () => {}).unref(); } catch { /* không có trình duyệt */ }
}
server.listen(PORT, HOST, () => {
  log(`✈️ Đua Máy Bay chạy tại http://localhost:${PORT}  ·  Màn hình LIVE 9:16: http://localhost:${PORT}/?live=1`);
  openBrowser(`http://localhost:${PORT}/`);
});
