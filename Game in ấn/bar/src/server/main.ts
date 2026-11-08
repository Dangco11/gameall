// Live Print Studio: server cho TikTok LIVE.
//   cd bar && npm install && npm start        → http://localhost:3200   (bảng điều khiển + màn hình LIVE 9:16 ở /?live=1)
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import type { ControlMessage, LiveEvent } from '../shared/types.ts';
import { PRINT, isVipTier, templateOf, tierOf } from '../shared/print.ts';
import { levelInfo } from '../shared/levels.ts';
import { StudioCore } from './StudioCore.ts';
import { EventQueue } from './EventQueue.ts';
import { simEvent } from './Simulator.ts';
import { Storage } from './Storage.ts';
import { TikTokLiveConnector } from './TikTokLiveConnector.ts';
import { Voice, spoken, chatLine } from './Voice.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const PORT = +(process.env.PORT ?? 3200);
const HOST = process.env.HOST || '127.0.0.1';

const log = (s: string) => console.log(`[${new Date().toLocaleTimeString('vi-VN')}] ${s}`);
const storage = new Storage(process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data'));
const loaded = storage.load();
const core = new StudioCore(storage, {}, loaded);
core.avatarSaved = id => storage.hasAvatar(id);
core.removeSimPlayers();                                       // dọn khách thử còn lưu từ lần chạy trước
const queue = new EventQueue();
queue.remember(loaded.giftIds);
const enqueue = (ev: LiveEvent) => { queue.push(ev); };
// Rớt kết nối thì nhớ lúc rớt; nối lại được thì cộng khoảng đó cho người xem thật để họ không bị coi là đã rời live.
let droppedAt = 0;
const tiktok = new TikTokLiveConnector(enqueue, s => {
  if (s.status === 'connected'){ if (droppedAt){ core.extendOnline(Date.now() - droppedAt); droppedAt = 0; } }
  else if (s.status === 'reconnecting' && core.live.status === 'connected') droppedAt = Date.now();
  else if (s.status === 'idle') droppedAt = 0;
  core.setLive(s); core.hideSimOnBoards = s.status === 'connected' || s.status === 'reconnecting';
}, log);
const voice = new Voice(path.join(ROOT, 'tts'), (url, text, who, tag) => core.push({ k: 'voice', url, text, who, tag }), log);
voice.enabled = core.settings.voice;

// Đọc bình luận cho live sôi động: mỗi người 15 giây một câu, lời tục và link quảng cáo bị bỏ qua
const chatAt = new Map<string, number>();
core.chatHook = (id, name, text) => {
  if (!core.settings.voice || !core.settings.readChat) return;
  const now = Date.now();
  if (now - (chatAt.get(id) ?? 0) < 15_000) return;
  const line = chatLine(name, text);
  if (!line) return;
  chatAt.set(id, now);
  if (chatAt.size > 2000) chatAt.delete(chatAt.keys().next().value as string);
  voice.chat(line);
};
// MC chào người mới (gộp 8 giây một câu), cảm ơn quà, báo bản in đặc biệt, đọc tên bản in vừa xong
const greet: string[] = [];
let doneCallAt = 0, likeCallAt = 0;
core.printHook = f => {
  if (!core.settings.voice) return;
  switch (f.ev){
    case 'hello': if (greet.length < 50) greet.push(f.name); break;
    case 'levelup': voice.say(`Chúc mừng ${spoken(f.name)} lên cấp ${f.lv}, ${levelInfo(f.lv).name}!`, f.lv >= 5); break;
    case 'queued': {
      if (!f.xu && !f.merged){
        const now = Date.now(); if (now - likeCallAt < 8000) break; likeCallAt = now;
        voice.chat(`Cảm ơn ${spoken(f.name)} đã thả ${PRINT.likesPerPrint} tim! Máy in tặng ${spoken(f.name)} một bản in miễn phí!`);
        break;
      }
      if (f.merged || tierOf(f.tier).no < 2) break;
      voice.say(`Cảm ơn ${spoken(f.name)} đã tặng ${spoken(f.gift)}! Máy in sẽ in ${tierOf(f.tier).name} cho ${spoken(f.name)}${f.pos > 1 ? `, đang chờ lượt ${f.pos}` : ''}.`, tierOf(f.tier).no >= 3);
      break;
    }
    case 'start':
      if (isVipTier(f.job.tier)) voice.say(`Máy in chuyển sang chế độ đặc biệt! Đang in mẫu ${spoken(templateOf(f.job.tpl).name)} cho ${spoken(f.job.name)}!`, true);
      break;
    case 'done': {
      const now = Date.now(), big = tierOf(f.job.tier).big;
      if (!big && now - doneCallAt < 5000) break;          // in dồn dập thì không đọc từng bản nhỏ
      doneCallAt = now;
      voice.chat(`Bản in ${spoken(templateOf(f.job.tpl).title)} của ${spoken(f.job.name)} đã hoàn thành!`, 'boy');
      break;
    }
  }
};
setInterval(() => {
  if (!greet.length) return;
  const names = greet.splice(0), shown = names.slice(0, 3).map(spoken).join(', '), more = names.length - 3;
  if (core.settings.voice) voice.say(`Chào mừng ${shown}${more > 0 ? ` và ${more} người nữa` : ''} đến với Live Print Studio! Tặng quà để máy in in ảnh của bạn nhé!`);
}, 8000);
log(`Đã nạp ${core.players.size} người xem, ${core.prints.length} bản in từ ${storage.dir}`);

/* ------------------------------------------------------------ loops */
// Sự kiện xử lý theo lô nhỏ mỗi 50 ms, máy in tick 1/4 giây, gửi màn hình 4 lần một giây. Không vòng nào chặn lâu.
setInterval(() => { queue.drain(300, ev => core.handle(ev), 10); }, 50);
setInterval(() => core.tick(), 250);            // máy in đổi giai đoạn đúng giờ (sai lệch tối đa 1/4 giây)
let sends = 0;
setInterval(() => {
  core.stats.queue = queue.size; core.stats.dropped = queue.dropped; core.stats.duplicates = queue.duplicates; core.stats.processed = queue.processed;
  let views = 0; for (const c of wss.clients as Set<Client>) if (c.role === 'view' && c.readyState === 1) views++;
  core.stats.views = views;
  const d = core.delta(sends++ % 2 === 0);
  if (d) broadcast(JSON.stringify(d));
}, 250);
setInterval(() => { void core.save(); }, 10_000);
// Lỗi lạ từ thư viện TikTok hay mạng không được làm sập server giữa buổi live.
process.on('unhandledRejection', e => log('Lỗi chưa xử lý: ' + ((e as Error)?.stack ?? e)));
process.on('uncaughtException', e => log('Lỗi chưa bắt: ' + (e?.stack ?? e)));
const shutdown = () => { log('Đang lưu dữ liệu trước khi tắt...'); try { core.saveSync(); } catch (e) { console.error(e); } process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);

/* ---------------------------------------------------------- control */
const clip = (s: unknown, n: number) => String(s ?? '').slice(0, n);
function onControl(m: ControlMessage){
  if (m.t === 'sim'){
    const name = clip(m.name, 24).trim() || 'Khách';
    const id = clip(m.id, 40) || name;
    // đang nối TikTok thật thì không cho quà thử, để livestream không hiện quà giả
    if (tiktok.status.status === 'connected'){ log('Đang live thật: bỏ qua thao tác thử từ bảng mô phỏng'); return; }
    if (m.kind === 'gift') enqueue(simEvent('gift', id, name, { gift: clip(m.gift, 30), diamonds: Math.max(1, Math.min(50_000, +m.diamonds | 0)), count: Math.max(1, Math.min(99, +m.count | 0)) }));
    else if (m.kind === 'comment') enqueue(simEvent('comment', id, name, { text: clip(m.text, 200) }));
    else if (m.kind === 'like') enqueue(simEvent('like', id, name, { count: Math.max(1, Math.min(500, +(m.count ?? 1) | 0)) }));
    else if (m.kind === 'share' || m.kind === 'join') enqueue(simEvent(m.kind, id, name));
    return;
  }
  switch (m.cmd){
    case 'connect': void tiktok.connect(clip(m.user, 80)); break;
    case 'disconnect': void tiktok.disconnect(); break;
    case 'clearSim': core.removeSimPlayers(); log('Đã xoá khách thử'); break;
    case 'settings': core.setSettings(m.settings ?? {}); voice.enabled = core.settings.voice; log(`Cài đặt: giọng đọc ${core.settings.voice ? 'bật' : 'tắt'}, đọc bình luận ${core.settings.readChat ? 'bật' : 'tắt'}`); break;
  }
}

/* ----------------------------------------------------------- server */
// An toàn mặc định giống bộ LIVE: chỉ nghe localhost, kiểm tra Host chống DNS rebinding, WebSocket kiểm tra Origin,
// file tĩnh chỉ lấy trong public/, màn hình LIVE chỉ nhận dữ liệu, không gửi lệnh được.
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.map': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.glb': 'model/gltf-binary', '.json': 'application/json' };
const ALLOWED_HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
if (HOST !== '127.0.0.1' && HOST !== 'localhost') for (const h of (process.env.ALLOW_HOSTS ?? '').split(',').filter(Boolean)) ALLOWED_HOSTS.add(h.toLowerCase());
const okHost = (h: string | undefined) => ALLOWED_HOSTS.has(String(h ?? '').toLowerCase());

// Ảnh đại diện TikTok của người chơi, tải qua server để trình duyệt vẽ được lên bảng 3D (ảnh khác nguồn không dùng được trong WebGL).
// Chỉ lấy từ máy chủ ảnh của TikTok, tối đa 300 KB, giữ trong bộ nhớ 200 ảnh gần nhất. Ảnh của người đã được in thì lưu
// xuống data/avatars/ để phòng trưng bày vẫn có ảnh sau khi link TikTok hết hạn. Ảnh lỗi: màn hình tự vẽ chữ cái đầu.
const AVATAR_HOST = /(^|\.)(tiktokcdn(-us|-eu)?\.com|ibyteimg\.com|byteimg\.com|muscdn\.com)$/i;
const avatarCache = new Map<string, { type: string; body: Buffer }>();
async function serveAvatar(id: string, res: http.ServerResponse){
  const url = core.avatars.get(id);
  let hit = avatarCache.get(id) ?? storage.readAvatar(id) ?? undefined;
  if (!hit && url){
    try {
      const u = new URL(url);
      if (u.protocol !== 'https:' || !AVATAR_HOST.test(u.hostname)) throw new Error('host');
      const r = await fetch(u, { redirect: 'error', signal: AbortSignal.timeout(5000) });
      const type = r.headers.get('content-type') ?? '';
      if (!r.ok || !/^image\/(jpeg|png|webp|gif)/.test(type)) throw new Error('type');
      const body = Buffer.from(await r.arrayBuffer());
      if (body.length > 300_000) throw new Error('size');
      hit = { type, body };
      avatarCache.set(id, hit);
      storage.writeAvatar(id, type, body);
      if (avatarCache.size > 200) avatarCache.delete(avatarCache.keys().next().value as string);
    } catch { /* không tải được: màn hình tự vẽ chữ cái đầu */ }
  } else if (hit && !avatarCache.has(id)){ avatarCache.set(id, hit); if (avatarCache.size > 200) avatarCache.delete(avatarCache.keys().next().value as string); }
  if (!hit){ res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': hit.type, 'Cache-Control': 'max-age=3600', 'X-Content-Type-Options': 'nosniff' }).end(hit.body);
}

// Nhạc nền studio: file mp3, m4a, ogg, mp4 trong assets/music/ (thư mục gốc dự án) và bar/music/. Chỉ đúng tên file trong thư mục đó.
const MUSIC = path.join(ROOT, 'music'), CLUB_MUSIC = path.join(ROOT, '..', 'assets', 'music');
const AUDIO_TYPES: Record<string, string> = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.mp4': 'video/mp4' };   // mp4: chỉ phát phần tiếng
const musicFile = (name: string) => !/[\\/]/.test(name) && !name.startsWith('.') && AUDIO_TYPES[path.extname(name).toLowerCase()] ? name : null;
function serveMusic(name: string, req: http.IncomingMessage, res: http.ServerResponse, dir = MUSIC, prefix = '/music/'){
  if (name === 'list.json'){
    let files: string[] = [];
    try { files = fs.readdirSync(dir).filter(n => musicFile(n)); } catch { /* chưa có thư mục */ }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }).end(JSON.stringify(files.map(n => prefix + encodeURIComponent(n))));
    return;
  }
  const ok = musicFile(name);
  if (!ok){ res.writeHead(404).end(); return; }
  const file = path.join(dir, ok);
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()){ res.writeHead(404).end(); return; }
    const type = AUDIO_TYPES[path.extname(file).toLowerCase()];
    // hỗ trợ Range để trình duyệt tua và phát file dài mượt hơn
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

// Model 3D: file .glb trong bar/models/ (vd. may-in.glb thay thân máy in dựng sẵn, xem models/DOC-TRUOC.txt)
const MODELS = path.join(ROOT, 'models');
const MODEL_TYPES: Record<string, string> = { '.glb': 'model/gltf-binary', '.vrm': 'model/gltf-binary' };
const modelFile = (name: string) => !/[\\/]/.test(name) && !name.startsWith('.') && MODEL_TYPES[path.extname(name).toLowerCase()] ? name : null;
function serveModel(name: string, res: http.ServerResponse){
  if (name === 'list.json'){
    let files: string[] = [];
    try { files = fs.readdirSync(MODELS).filter(n => modelFile(n)); } catch { /* chưa có thư mục */ }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }).end(JSON.stringify(files));
    return;
  }
  const ok = modelFile(name), file = ok ? path.join(MODELS, ok) : '';
  fs.stat(file, (err, st) => {
    if (!ok || err || !st.isFile()){ res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': MODEL_TYPES[path.extname(file).toLowerCase()], 'Content-Length': st.size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (!okHost(req.headers.host)){ res.writeHead(421).end('wrong host'); return; }
  if (req.method !== 'GET' && req.method !== 'HEAD'){ res.writeHead(405).end(); return; }
  let p: string;
  try { p = decodeURIComponent(new URL(req.url ?? '/', 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  if (p.startsWith('/avatar/')){ void serveAvatar(p.slice(8, 80), res); return; }
  if (p.startsWith('/models/')){ serveModel(p.slice(8), res); return; }
  if (p.startsWith('/music/bar/')){ serveMusic(p.slice(11), req, res, CLUB_MUSIC, '/music/bar/'); return; }
  if (p.startsWith('/music/')){ serveMusic(p.slice(7), req, res); return; }
  if (p === '/') p = '/index.html';
  const tts = /^\/tts\/(v\d+_\d+\.mp3)$/.exec(p);              // giọng đọc vừa tạo, chỉ đúng dạng tên này
  const base = tts ? path.join(ROOT, 'tts') : PUBLIC;
  if (tts) p = '/' + tts[1];
  if (p.split('/').some(seg => seg.startsWith('.'))){ res.writeHead(404).end('not found'); return; }
  const file = path.normalize(path.join(base, p));
  if (!file.startsWith(base + path.sep)){ res.writeHead(404).end('not found'); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()){ res.writeHead(404).end(p === '/print.js' ? 'chưa build: chạy npm start' : 'not found'); return; }
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
    if (!origin) return true;                                   // OBS và trình không phải trình duyệt không gửi Origin
    try { return okHost(new URL(origin).host); } catch { return false; }
  } });
function broadcast(s: string){ for (const c of wss.clients) if (c.readyState === 1 && c.bufferedAmount < 4 * 1024 * 1024) c.send(s); }
wss.on('connection', (ws: Client, req) => {
  ws.role = new URL(req.url ?? '/', 'http://x').searchParams.get('role') === 'control' ? 'control' : 'view';
  ws.send(JSON.stringify(core.snapshot(ws.role)));
  let budget = 20, last = Date.now();
  ws.on('message', buf => {
    if (ws.role !== 'control') return;
    const t = Date.now(); budget = Math.min(20, budget + (t - last) / 100); last = t;   // tối đa khoảng 10 lệnh một giây
    if (budget < 1) return;
    budget--;
    try { const m = JSON.parse(String(buf)) as ControlMessage; if (m && (m.t === 'sim' || m.t === 'ctl')) onControl(m); }
    catch (e) { log('Lệnh lỗi: ' + (e as Error).message); }
  });
});
// Không mở được cổng thì báo rõ rồi thoát hẳn, không chạy ngầm (vẫn ghi dữ liệu) mà không ai vào được.
// WebSocketServer chuyển lỗi của server sang chính nó, nên phải nghe ở cả hai.
let listenFailed = false;
async function onListenError(e: NodeJS.ErrnoException){
  if (listenFailed) return;
  listenFailed = true;
  if (e.code === 'EADDRINUSE'){
    const page = await fetch(`http://localhost:${PORT}/`).then(r => r.text()).catch(() => '');
    if (page.includes('Live Print Studio')){ log(`ℹ️ Live Print Studio đã chạy sẵn ở cửa sổ khác, mở luôn http://localhost:${PORT} cho bạn. Muốn khởi động lại thì tắt cửa sổ cũ (Ctrl+C) rồi chạy lại.`); openBrowser(`http://localhost:${PORT}/`); }
    else log(`❌ Cổng ${PORT} đang bị chương trình khác dùng. Tắt chương trình đó, hoặc chạy với cổng khác: $env:PORT=3201; npm start`);
  } else log('❌ Không mở được server: ' + e.message);
  process.exit(1);
}
server.on('error', onListenError);
wss.on('error', onListenError);
// Chạy xong tự mở trang điều khiển trong trình duyệt. Đặt NO_OPEN=1 nếu không muốn.
function openBrowser(url: string){
  if (process.env.NO_OPEN || process.env.CI) return;
  const [cmd, args] = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', url]] : process.platform === 'darwin' ? ['open', [url]] : ['xdg-open', [url]];
  try { spawn(cmd as string, args as string[], { stdio: 'ignore', detached: true }).on('error', () => {}).unref(); } catch { /* không có trình duyệt: vẫn chạy bình thường */ }
}
server.listen(PORT, HOST, () => {
  log(`Live Print Studio chạy tại http://localhost:${PORT}  ·  Màn hình LIVE 9:16: http://localhost:${PORT}/?live=1`);
  openBrowser(`http://localhost:${PORT}/`);
});
