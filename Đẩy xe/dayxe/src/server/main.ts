// Đẩy Xe 2 Phe: server game cho TikTok LIVE.
//   cd dayxe && npm install && npm start        → http://localhost:3450  (màn hình LIVE 9:16: /?live=1)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import type { ControlMessage, LiveEvent, Settings, State } from '../shared/types.ts';
import { EventQueue } from './EventQueue.ts';
import { TikTokLiveConnector } from './TikTokLiveConnector.ts';
import { Voice } from './Voice.ts';
import { Game } from './Game.ts';
import { DEFAULT_TRACK, TRACK_OPTIONS } from '../shared/game.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const DATA = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data');
const TTS = path.join(DATA, 'tts');
const MODELS = fs.existsSync(path.join(ROOT, 'models')) ? path.join(ROOT, 'models') : path.join(ROOT, '..', 'models');
const PORT = +(process.env.PORT ?? 3450);
const HOST = process.env.HOST || '127.0.0.1';
const log = (s: string) => console.log(`[${new Date().toLocaleTimeString('vi-VN')}] ${s}`);

fs.mkdirSync(DATA, { recursive: true });
const SETTINGS_FILE = path.join(DATA, 'settings.json');
let settings: Settings = { voice: true, track: DEFAULT_TRACK };
try { settings = { ...settings, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) }; } catch { /* mặc định */ }
const game = new Game(DATA, TRACK_OPTIONS.includes(settings.track) ? settings.track : DEFAULT_TRACK);
const voice = new Voice(TTS, (url, text) => game.fx({ k: 'voice', url, text }), log);
voice.enabled = settings.voice;
game.say = (text, prio = false) => { if (settings.voice) voice.say(text, prio); };

const queue = new EventQueue();
const tiktok = new TikTokLiveConnector(ev => queue.push(ev), s => { liveDirty = true; if (s.status === 'connected') log('Đang live thật: bảng mô phỏng tạm khóa'); }, log);
let liveDirty = true, settingsDirty = true;
const viewers = new Map<string, number>();

function handle(ev: LiveEvent) {
  const avatar = ev.avatar && /^https:\/\/[^/]*(tiktokcdn|ibyteimg|byteimg|muscdn)[^/]*\//i.test(ev.avatar) ? ev.avatar : '';
  viewers.set(ev.id, Date.now());
  game.handle({ ...ev, avatar });
  if (ev.kind === 'gift') log(`🎁 ${ev.name} tặng ${ev.count}x ${ev.gift} (${ev.diamonds} xu)`);
}
setInterval(() => { queue.drain(300, ev => handle(ev), 10); }, 50);
let sends = 0;
setInterval(() => {
  const now = Date.now();
  game.tick(now);
  const fx = game.takeFx();
  const msg: State = { t: 'state', now, fx };
  if (game.pushing || fx.some(f => f.k === 'push' || f.k === 'win' || f.k === 'reset' || f.k === 'join')) msg.round = game.round;
  if (sends++ % 5 === 0) { msg.boards = game.boards(); msg.round = game.round; for (const [id, t] of viewers) if (now - t > 5 * 60_000) viewers.delete(id); msg.viewers = viewers.size; }
  if (liveDirty) { msg.live = tiktok.status; liveDirty = false; }
  if (settingsDirty) { msg.settings = settings; settingsDirty = false; }
  if (msg.fx.length || msg.round || msg.boards || msg.live || msg.settings) broadcast(JSON.stringify(msg));
}, 200);
setInterval(() => game.save(), 10_000);
setInterval(() => game.tick(), 100);
process.on('unhandledRejection', e => log('Lỗi chưa xử lý: ' + ((e as Error)?.stack ?? e)));
process.on('uncaughtException', e => log('Lỗi chưa bắt: ' + (e?.stack ?? e)));
const shutdown = () => { game.save(); process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);

/* ---------------------------------------------------------- điều khiển */
const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);
let simSeq = 0;
function onControl(m: ControlMessage) {
  if (m.t === 'sim') {
    if (tiktok.status.status === 'connected') { log('Đang live thật: bỏ qua thao tác thử từ bảng mô phỏng'); return; }
    const name = clip(m.name, 24).trim() || 'Khách', id = 'sim:' + (clip(m.id, 40) || name);
    const base = { msgId: `sim${++simSeq}`, id, name, sim: true };
    if (m.kind === 'gift') queue.push({ ...base, kind: 'gift', gift: clip(m.gift, 30), diamonds: Math.max(1, Math.min(50_000, +m.diamonds | 0)), count: Math.max(1, Math.min(99, +m.count | 0)) });
    else if (m.kind === 'comment') queue.push({ ...base, kind: 'comment', text: clip(m.text, 200) });
    else if (m.kind === 'like') queue.push({ ...base, kind: 'like', count: Math.max(1, Math.min(500, +(m.count ?? 1) | 0)) });
    else queue.push({ ...base, kind: m.kind });
    return;
  }
  switch (m.cmd) {
    case 'connect': void tiktok.connect(clip(m.user, 80)); break;
    case 'disconnect': void tiktok.disconnect(); break;
    case 'reset': game.newRoundNow(); log('🔄 Bắt đầu ván mới'); break;
    case 'resetWins': game.resetWins(); log('Đã đặt lại số ván thắng'); break;
    case 'clearSim': game.removeSim(); log('Đã xoá người thử'); break;
    case 'settings': {
      const s = m.settings ?? {};
      if (typeof s.voice === 'boolean') settings.voice = s.voice;
      if (typeof s.track === 'number' && TRACK_OPTIONS.includes(s.track)) { settings.track = s.track; game.setTrack(s.track); }
      voice.enabled = settings.voice; settingsDirty = true;
      try { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings)); } catch { /* bỏ qua */ }
      break;
    }
  }
}

/* -------------------------------------------------------------- server */
// Chỉ nghe localhost, kiểm tra Host chống DNS rebinding, WebSocket kiểm tra Origin, file tĩnh chỉ trong public/.
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.map': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.ogg': 'audio/ogg', '.jpg': 'image/jpeg' };
const ALLOWED_HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
if (HOST !== '127.0.0.1' && HOST !== 'localhost') for (const h of (process.env.ALLOW_HOSTS ?? '').split(',').filter(Boolean)) ALLOWED_HOSTS.add(h.toLowerCase());
const okHost = (h: string | undefined) => ALLOWED_HOSTS.has(String(h ?? '').toLowerCase());

// ảnh đại diện TikTok qua server (cùng nguồn nên vẽ lên lớp sơn được), chỉ nhận ảnh từ CDN của TikTok; lưu data/avatars/ để link hết hạn vẫn còn
const AVATAR_HOST = /(^|\.)(tiktokcdn(-us|-eu)?\.com|ibyteimg\.com|byteimg\.com|muscdn\.com)$/i;
const AV_DIR = path.join(DATA, 'avatars');
const avatarCache = new Map<string, { type: string; body: Buffer }>();
const avFile = (id: string) => path.join(AV_DIR, id.replace(/[^\w-]/g, '_').slice(0, 60));
async function serveAvatar(id: string, res: http.ServerResponse) {
  let hit = avatarCache.get(id);
  if (!hit) { try { const raw = fs.readFileSync(avFile(id)); const i = raw.indexOf(10); hit = { type: raw.subarray(0, i).toString(), body: raw.subarray(i + 1) }; } catch { /* chưa có */ } }
  const url = game.avatarUrl(id);
  if (!hit && url) {
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:' || !AVATAR_HOST.test(u.hostname)) throw new Error('host');
      const r = await fetch(u, { redirect: 'error', signal: AbortSignal.timeout(5000) });
      const type = r.headers.get('content-type') ?? '';
      if (!r.ok || !/^image\/(jpeg|png|webp|gif)/.test(type)) throw new Error('type');
      const body = Buffer.from(await r.arrayBuffer());
      if (body.length > 400_000) throw new Error('size');
      hit = { type, body };
      try { fs.mkdirSync(AV_DIR, { recursive: true }); fs.writeFileSync(avFile(id), Buffer.concat([Buffer.from(type + '\n'), body])); } catch { /* bỏ qua */ }
    } catch { /* không tải được: màn hình tự vẽ chữ cái đầu */ }
  }
  if (hit) { avatarCache.set(id, hit); if (avatarCache.size > 300) avatarCache.delete(avatarCache.keys().next().value as string); }
  if (!hit) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': hit.type, 'Cache-Control': 'max-age=3600', 'X-Content-Type-Options': 'nosniff' }).end(hit.body);
}
const AUDIO_TYPES: Record<string, string> = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.mp4': 'video/mp4' };
const DIRS: Record<string, { dir: string; ok: (n: string) => boolean; type: (n: string) => string }> = {
  music: { dir: path.join(ROOT, 'music'), ok: n => !!AUDIO_TYPES[path.extname(n).toLowerCase()], type: n => AUDIO_TYPES[path.extname(n).toLowerCase()] },
  models: { dir: MODELS, ok: n => /\.glb$/i.test(n), type: () => 'model/gltf-binary' },
  tts: { dir: TTS, ok: n => /^v\d+_\d+\.mp3$/.test(n), type: () => 'audio/mpeg' },
};
function serveDir(kind: string, name: string, req: http.IncomingMessage, res: http.ServerResponse) {
  const d = DIRS[kind];
  if (name === 'list.json' && kind !== 'tts') {
    let files: string[] = [];
    try { files = fs.readdirSync(d.dir).filter(n => d.ok(n)); } catch { /* chưa có thư mục */ }
    const list = kind === 'music' ? files.map(n => '/music/' + encodeURIComponent(n)) : files;
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }).end(JSON.stringify(list));
    return;
  }
  const ok = !/[\\/]/.test(name) && !name.startsWith('.') && d.ok(name), file = ok ? path.join(d.dir, name) : '';
  fs.stat(file, (err, st) => {
    if (!ok || err || !st.isFile()) { res.writeHead(404).end(); return; }
    const type = d.type(name);
    const m = /^bytes=(\d*)-(\d*)$/.exec(String(req.headers.range ?? ''));
    if (m) {
      const start = m[1] ? +m[1] : 0, end = m[2] ? Math.min(+m[2], st.size - 1) : st.size - 1;
      if (start > end || start >= st.size) { res.writeHead(416, { 'Content-Range': `bytes */${st.size}` }).end(); return; }
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${start}-${end}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
      fs.createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': st.size, 'Cache-Control': kind === 'tts' ? 'no-store' : 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (!okHost(req.headers.host)) { res.writeHead(421).end('wrong host'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
  let p: string;
  try { p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (p.startsWith('/avatar/')) { void serveAvatar(p.slice(8, 90), res); return; }
  const dm = /^\/(music|models|tts)\/([^/]+)$/.exec(p);
  if (dm) { serveDir(dm[1], dm[2], req, res); return; }
  if (p === '/') p = '/index.html';
  if (p.split('/').some(seg => seg.startsWith('.'))) { res.writeHead(404).end('not found'); return; }
  const file = path.normalize(path.join(PUBLIC, p));
  if (!file.startsWith(PUBLIC + path.sep)) { res.writeHead(404).end('not found'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end(p === '/app.js' ? 'chưa build: chạy npm start' : 'not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
    if (req.method === 'HEAD') { res.end(); return; }
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
function broadcast(s: string) { for (const c of wss.clients) if (c.readyState === 1 && c.bufferedAmount < 4 * 1024 * 1024) c.send(s); }
wss.on('connection', (ws: Client, req) => {
  ws.role = new URL(req.url ?? '/', 'http://x').searchParams.get('role') === 'control' ? 'control' : 'view';
  const hello: State & { hello: true } = { t: 'state', hello: true, now: Date.now(), fx: [], round: game.round, boards: game.boards(), live: tiktok.status, settings, viewers: viewers.size };
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
async function onListenError(e: NodeJS.ErrnoException) {
  if (listenFailed) return;
  listenFailed = true;
  if (e.code === 'EADDRINUSE') {
    const page = await fetch(`http://localhost:${PORT}/`).then(r => r.text()).catch(() => '');
    if (page.includes('Đẩy Xe')) { log(`ℹ️ Đẩy Xe 2 Phe đã chạy sẵn, mở luôn http://localhost:${PORT}`); openBrowser(`http://localhost:${PORT}/`); }
    else log(`❌ Cổng ${PORT} đang bị chương trình khác dùng. Chạy với cổng khác: $env:PORT=3401; npm start`);
  } else log('❌ Không mở được server: ' + e.message);
  setTimeout(() => process.exit(1), 300);
}
server.on('error', onListenError);
wss.on('error', onListenError);
function openBrowser(url: string) {
  if (process.env.NO_OPEN || process.env.CI) return;
  const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try { spawn(cmd as string, args as string[], { stdio: 'ignore', detached: true }).on('error', () => {}).unref(); } catch { /* không có trình duyệt */ }
}
server.listen(PORT, HOST, () => {
  log(`🚗 Đẩy Xe 2 Phe chạy tại http://localhost:${PORT}  ·  Màn hình LIVE 9:16: http://localhost:${PORT}/?live=1  ·  Đỏ ${game.round.wins.do} – ${game.round.wins.xanh} Xanh`);
  openBrowser(`http://localhost:${PORT}/`);
});
