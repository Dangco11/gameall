// Tu Tiên Đại Chiến: server game cho TikTok LIVE.
//   cd tutien && npm install && npm start        → http://localhost:3300  (màn hình LIVE 9:16: /?live=1)
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
import { World } from './World.ts';
import type { WorldSave } from './World.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const DATA = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data');
const TTS = path.join(DATA, 'tts');
const PORT = +(process.env.PORT ?? 3300);
const HOST = process.env.HOST || '127.0.0.1';
const log = (s: string) => console.log(`[${new Date().toLocaleTimeString('vi-VN')}] ${s}`);

/* ------------------------------------------------------------ trạng thái */
fs.mkdirSync(DATA, { recursive: true });
const SETTINGS_FILE = path.join(DATA, 'settings.json'), WORLD_FILE = path.join(DATA, 'world.json');
let settings: Settings = { voice: true, npcs: 6, bossEvery: 0 };
try { settings = { ...settings, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) }; } catch { /* mặc định */ }
let worldSave: Partial<WorldSave> = {};
try { worldSave = JSON.parse(fs.readFileSync(WORLD_FILE, 'utf8')); } catch { /* lần đầu */ }
const world = new World(DATA, worldSave);
world.npcCount = settings.npcs;
world.log = log;
const voice = new Voice(TTS, (url, text) => world.fx({ k: 'voice', url, text }), log);
voice.enabled = settings.voice;
world.say = (text, prio = false) => { if (settings.voice) voice.say(text, prio); };

const queue = new EventQueue();
const tiktok = new TikTokLiveConnector(ev => queue.push(ev), s => { liveDirty = true; if (s.status === 'connected') log('Đang live thật: bảng mô phỏng tạm khóa'); }, log);
let liveDirty = true, settingsDirty = true;

function handle(ev: LiveEvent) {
  const avatar = ev.avatar && /^https:\/\/[^/]*(tiktokcdn|ibyteimg|byteimg|muscdn)[^/]*\//i.test(ev.avatar) ? ev.avatar : '';
  world.handle({ ...ev, avatar });
  if (ev.kind === 'gift') log(`🎁 ${ev.name} tặng ${ev.count}x ${ev.gift} (${ev.diamonds} xu)`);
}

/* -------------------------------------------------------------- vòng lặp */
// sự kiện mỗi 50 ms, mô phỏng 10 lần một giây, gửi màn hình 5 lần một giây
setInterval(() => { queue.drain(300, ev => handle(ev), 10); }, 50);
let last = Date.now();
setInterval(() => { const now = Date.now(); world.tick(Math.min(0.25, (now - last) / 1000), now); last = now; }, 100);
let sends = 0;
setInterval(() => {
  const now = Date.now();
  const msg: State = { t: 'state', now, mode: world.modeState(now), cults: world.cults(), boss: world.boss.pub(), fx: world.takeFx() };
  if (sends++ % 5 === 0) { msg.boards = world.boards(); msg.viewers = world.viewers; msg.total = world.store.map.size; }
  if (liveDirty) { msg.live = tiktok.status; liveDirty = false; }
  if (settingsDirty) { msg.settings = settings; settingsDirty = false; }
  broadcast(JSON.stringify(msg));
}, 200);
const saveAll = () => {
  world.store.save();
  try { fs.writeFileSync(WORLD_FILE, JSON.stringify(world.saveState())); } catch { /* bỏ qua */ }
};
setInterval(saveAll, 15_000);
process.on('unhandledRejection', e => log('Lỗi chưa xử lý: ' + ((e as Error)?.stack ?? e)));
process.on('uncaughtException', e => log('Lỗi chưa bắt: ' + (e?.stack ?? e)));
const shutdown = () => { saveAll(); process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);

/* ---------------------------------------------------------- điều khiển */
const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);
let simSeq = 0;
function onControl(m: ControlMessage) {
  if (m.t === 'sim') {
    // đang nối TikTok thật thì không cho quà thử, để livestream không hiện quà giả
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
    case 'next': world.force('next'); break;
    case 'boss': case 'pk1': case 'pk3': case 'sect': case 'treasure': world.force(m.cmd); break;
    case 'clearSim': world.removeSim(); log('Đã xóa người thử'); break;
    case 'settings': {
      const s = m.settings ?? {};
      if (typeof s.voice === 'boolean') settings.voice = s.voice;
      if (Number.isFinite(s.npcs)) settings.npcs = Math.max(0, Math.min(16, s.npcs! | 0));
      voice.enabled = settings.voice; world.npcCount = settings.npcs;
      settingsDirty = true;
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

// thư mục phát file theo tên: nhạc (music/), model GLB (models/), giọng đọc (data/tts/)
const AUDIO_TYPES: Record<string, string> = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.mp4': 'video/mp4' };
const DIRS: Record<string, { dir: string; ok: (n: string) => boolean; type: (n: string) => string }> = {
  music: { dir: path.join(ROOT, 'music'), ok: n => !!AUDIO_TYPES[path.extname(n).toLowerCase()], type: n => AUDIO_TYPES[path.extname(n).toLowerCase()] },
  models: { dir: path.join(ROOT, 'models'), ok: n => /\.glb$/i.test(n) || n === 'models.json', type: n => n.endsWith('.json') ? 'application/json' : 'model/gltf-binary' },
  tts: { dir: TTS, ok: n => /^v\d+_\d+\.mp3$/.test(n), type: () => 'audio/mpeg' },
};
function serveDir(kind: string, name: string, req: http.IncomingMessage, res: http.ServerResponse) {
  const d = DIRS[kind];
  if (name === 'list.json' && kind !== 'tts') {
    let files: string[] = [];
    try { files = fs.readdirSync(d.dir).filter(n => d.ok(n) && n !== 'models.json'); } catch { /* chưa có thư mục */ }
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
  const dm = /^\/(music|models|tts)\/([^/]+)$/.exec(p);
  if (dm) { serveDir(dm[1], dm[2], req, res); return; }
  if (p === '/') p = '/index.html';
  if (p.split('/').some(seg => seg.startsWith('.'))) { res.writeHead(404).end('not found'); return; }
  const file = path.normalize(path.join(PUBLIC, p));
  if (!file.startsWith(PUBLIC + path.sep)) { res.writeHead(404).end('not found'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404).end(p === '/app.js' ? 'chưa build: chạy npm start' : 'not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream', 'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
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
  const now = Date.now();
  const hello: State & { hello: true } = { t: 'state', hello: true, now, mode: world.modeState(now), cults: world.cults(), boss: world.boss.pub(), fx: [], boards: world.boards(), live: tiktok.status, settings, viewers: world.viewers, total: world.store.map.size };
  ws.send(JSON.stringify(hello));
  let budget = 20, lastMsg = Date.now();
  ws.on('message', buf => {
    if (ws.role !== 'control') return;
    const t = Date.now(); budget = Math.min(20, budget + (t - lastMsg) / 100); lastMsg = t;
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
    if (page.includes('Tu Tiên')) { log(`ℹ️ Tu Tiên Đại Chiến đã chạy sẵn ở cửa sổ khác, mở luôn http://localhost:${PORT}`); openBrowser(`http://localhost:${PORT}/`); }
    else log(`❌ Cổng ${PORT} đang bị chương trình khác dùng. Chạy với cổng khác: $env:PORT=3301; npm start`);
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
  log(`☯️ Tu Tiên Đại Chiến chạy tại http://localhost:${PORT}  ·  Màn hình LIVE 9:16: http://localhost:${PORT}/?live=1  ·  ${world.store.map.size} tu sĩ đã lưu`);
  openBrowser(`http://localhost:${PORT}/`);
});
