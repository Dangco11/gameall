// Làng Quê Việt Nam: server game cho TikTok LIVE.
//   cd village && npm install && npm start        → http://localhost:3100
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws';
import { GIFT } from '../shared/balance.ts';
import type { ControlMessage, LiveEvent, Weather } from '../shared/types.ts';
import { DataStorage } from './DataStorage.ts';
import { EventQueue } from './EventQueue.ts';
import { Simulator, simEvent } from './Simulator.ts';
import { TikTokLiveConnector } from './TikTokLiveConnector.ts';
import { CROWD_FILE, Voice, beerAskLine, joinAskLine, speakMs, weddingVerses, boyLine, spoken, thanksLine, weddingLine, chatLine } from './Voice.ts';
import { WEDDING, showFor } from '../shared/balance.ts';
import { VillageCore } from './VillageCore.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const PORT = +(process.env.PORT ?? 3100);
const HOST = process.env.HOST || '127.0.0.1';

const log = (s: string) => console.log(`[${new Date().toLocaleTimeString('vi-VN')}] ${s}`);
const storage = new DataStorage(process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT, 'data'));
const loaded = storage.load();
const core = new VillageCore(storage, {}, loaded);
core.setSettings({ scene: 'wedding', idleBots: false });       // bản này chỉ có đám cưới, chỉ khách thật trong live
core.removeSimPlayers();                                       // dọn khách ảo còn lưu từ lần chạy trước
if (Number(process.env.BATTLE_SCALE) > 0) core.battle.scale = Math.min(1, Number(process.env.BATTLE_SCALE));   // chạy thử Đại chiến nhanh
const queue = new EventQueue();
queue.remember(loaded.giftIds);
const enqueue = (ev: LiveEvent) => { queue.push(ev); };
// Rớt kết nối thì nhớ lúc rớt; nối lại được thì cộng khoảng đó cho người xem thật để họ không bị coi là đã rời làng.
let droppedAt = 0;
const tiktok = new TikTokLiveConnector(enqueue, s => {
  if (s.status === 'connected'){
    if (droppedAt){ core.extendOnline(Date.now() - droppedAt); droppedAt = 0; }
    if (sim.count){ sim.setBots(0); log('Đang live thật: đã tắt khách ảo, để không hiện tương tác giả'); }
  }
  else if (s.status === 'reconnecting' && core.live.status === 'connected') droppedAt = Date.now();
  else if (s.status === 'idle') droppedAt = 0;
  core.setLive(s); core.hideSimOnBoards = s.status === 'connected' || s.status === 'reconnecting';
}, log);
const voice = new Voice(path.join(ROOT, 'tts'), (url, text, who, tag) => core.push({ k: 'voice', url, text, who, tag }), log);
voice.enabled = core.settings.voice;
const SFX = path.join(ROOT, 'sfx');
void voice.crowd(SFX).catch(() => {});
// Khách mới vào: MC chào bằng tên, gộp mọi người vào trong 6 giây thành một câu để giọng đọc không bị kín
const greet: string[] = [];
// lần gần nhất có người gọi bia và lần gần nhất anh phục vụ mời gọi bia
let lastBeer = Date.now(), lastAsk = Date.now();
core.weddingHook = f => {
  if (f.k === 'wedding' && f.ev === 'mung' && showFor(f.amount ?? 0).at(-1)?.key === 'beer') lastBeer = Date.now();
  if (f.ev === 'guest'){
    const r = core.weddingTop.top(core.hideSimOnBoards).findIndex(x => x.id === f.id);
    if (r >= 0 && core.settings.voice) voice.say(`Xin chào ${spoken(f.name)}, top ${r + 1} quà cưới tháng này đã tới! Cả sân vỗ tay chào đón nào!`, true);
    else if (greet.length < 50) greet.push(f.name);
    return;
  }
  if (!core.settings.voice) return;
  // PK cướp: MC hô lúc bắt đầu, các chiêu từ 30 xu, mốc giây cuối và kết quả; chiêu nhỏ chỉ có tiếng hiệu ứng
  if (f.k === 'pk'){
    if (f.ev === 'join' || (f.ev === 'hit' && (f.amount ?? 0) < 30)) return;
    const say = f.text.replace(/\p{Extended_Pictographic}|️/gu, '').replace(/\+(\d+)/g, 'cộng $1').trim();
    voice.say(f.ev === 'start' ? 'Có biến rồi bà con ơi! ' + say.replace('PK 2 phút', 'Hai phút quyết định') : f.ev === 'end' && f.win === 'cuop' ? say + '! Bà con ơi, cướp được rồi!' : say, f.ev !== 'hit');
    return;
  }
  // chờ quá 3 phút, làng tự chọn người đã follow vào vai
  if (f.auto && (f.ev === 'bride' || f.ev === 'groom')){
    const role = f.ev === 'bride' ? 'cô dâu' : 'chú rể';
    voice.say(f.other ? `Làng chọn ngẫu nhiên ${spoken(f.name)} làm ${role} của ${spoken(f.other)}! Lễ thành hôn bắt đầu, xin một tràng pháo tay!`
      : `Hết ba phút chưa ai lên, làng chọn ngẫu nhiên ${spoken(f.name)} làm ${role}! Xin một tràng pháo tay!`, true);
    return;
  }
  // 1 xu gọi bia, 5 xu gọi món: anh phục vụ hô to tên người gọi (ưu tiên thấp, gọi dồn dập thì bỏ bớt)
  const top = f.ev === 'mung' ? showFor(f.amount ?? 0).at(-1)?.key : undefined;
  if (top === 'beer' || top === 'food'){ voice.chat(boyLine(top, f.name), 'boy'); return; }
  const line = weddingLine(f);
  if (line) voice.say(line, f.ev !== 'mung' || top === 'toast', top === 'toast' ? 'toast' : undefined);
};
// Chưa đủ cô dâu chú rể (đang chờ, mới có một người): MC mời tặng đúng 3 xu để vào vai, rồi đọc ba khổ vè đám cưới,
// đọc xong mới mời tiếp; cứ thế lặp. Mỗi câu chừng 10 giây (câu dài thì theo độ dài), nói xong nghỉ 15 giây mới tới câu sau.
// Khổ vè gắn nhãn 'verse': có bình luận thì máy LIVE ngắt vè để đọc bình luận trước.
// Không có ai xem, đang Đại chiến, tắt giọng hay MC còn câu khác chưa đọc thì thôi, để không chồng lên nhau.
let joinStep = 0, joinRound = 0, joinNextAt = 0;
setInterval(() => {
  const now = Date.now(), w = core.wedding, phase = w.phase;
  const open = core.settings.scene === 'wedding' && core.settings.voice && !core.battle.active && core.stats.online > 0 && (phase === 'waiting' || phase === 'bride' || phase === 'groom');
  if (!open){ joinStep = 0; return; }                      // đủ đôi hay tạm nghỉ: lần sau bắt đầu lại bằng lời mời
  if (now < joinNextAt || voice.backlog > 0) return;
  const verse = joinStep > 0, text = verse ? weddingVerses(joinRound)[joinStep - 1] : joinAskLine(phase, phase === 'bride' ? w.bride?.name ?? '' : phase === 'groom' ? w.groom?.name ?? '' : '');
  voice.say(text, false, verse ? 'verse' : undefined);
  joinNextAt = now + Math.max(WEDDING.joinAskMs, speakMs(text) + 3000) + WEDDING.joinRestMs;   // thời gian đọc (cộng lúc tạo giọng) rồi nghỉ
  joinStep = (joinStep + 1) % 4;
  if (joinStep === 0){ joinRound++; joinNextAt = now + Math.max(WEDDING.joinAskMs, speakMs(text) + 3000) + WEDDING.joinRoundRestMs; }   // hết lượt: nghỉ 30 giây rồi đọc lại
}, 1000);
// Lâu chưa ai gọi bia (2 phút) mà sân đang có khách: anh phục vụ đi mời, hô bằng giọng nam, màn hình hiện khung anh phục vụ.
// Đang Đại chiến, đang PK hay vừa xong đám (rước dâu) thì không mời.
setInterval(() => {
  const now = Date.now();
  if (core.settings.scene !== 'wedding' || core.battle.active || core.wedding.pk || core.wedding.phase === 'done') return;
  if (now - Math.max(lastBeer, lastAsk) < WEDDING.beerAskMs || core.stats.online === 0) return;
  lastAsk = now;
  const line = beerAskLine();
  core.push({ k: 'wedding', ev: 'ask', id: '', name: '', text: line });
  if (core.settings.voice) voice.chat(line, 'boy');
}, 10_000);
setInterval(() => {
  if (!greet.length) return;
  const names = greet.splice(0), shown = names.slice(0, 3).map(spoken).join(', '), more = names.length - 3;
  if (core.settings.voice) voice.say(`Chào mừng ${shown}${more > 0 ? ` và ${more} người nữa` : ''} đến dự đám cưới! Mời vào mâm ăn cỗ nha!`);
}, 6000);
// Đại chiến: MC đọc lời chuyển phần, 10 giây cuối, công bố phe thắng và các đòn lớn
core.battleHook = f => {
  if (!core.settings.voice) return;
  const big = f.ev === 'start' || f.ev === 'phase' || f.ev === 'climax' || f.ev === 'win' || f.ev === 'ultimate' || f.ev === 'crown' || f.ev === 'dragon' || (f.ev === 'attack' && f.gift === 'ngua');
  if (big) voice.say(f.text.replace(/\p{Extended_Pictographic}|️/gu, '').trim(), f.ev !== 'dragon');
};
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
core.giftHook = (name, gift, count, tier) => { if (core.settings.voice) voice.say(thanksLine(tier, name, gift, count), (GIFT.tiers.find(t => t.key === tier)?.level ?? 0) >= 3); };   // quà lớn được đọc trước
const sim = new Simulator(enqueue, {
  get: id => core.players.get(id), festivalOpen: () => core.festival.open, contest: () => core.festival.phase === 'contest', leave: id => core.goOffline(id),
});
log(`Đã nạp ${core.players.all.size} cư dân từ ${storage.dir} · cảnh ${core.settings.scene === 'wedding' ? 'đám cưới' : 'làng quê'}`);

/* ------------------------------------------------------------ loops */
// Sự kiện xử lý theo lô nhỏ mỗi 50 ms, game tick 1 giây, gửi màn hình 4 lần một giây. Không vòng nào chặn lâu.
setInterval(() => { queue.drain(300, ev => core.handle(ev), 10); }, 50);
setInterval(() => core.tick(), 1000);
let sends = 0;
setInterval(() => {
  core.stats.queue = queue.size; core.stats.dropped = queue.dropped; core.stats.duplicates = queue.duplicates;
  core.stats.processed = queue.processed; core.stats.bots = sim.count;
  const d = core.delta(sends++ % 8 === 0);
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
    case 'festival': if (!core.festival.start(Date.now())) log('Hội làng đang diễn ra'); break;
    case 'newWedding': core.wedding.reset(); log('Mở đám cưới mới'); break;
    case 'battleStart': core.startBattle(); log('Bắt đầu Đại chiến Nhà trai – Nhà gái (12 phút)'); break;
    case 'battleStop': if (core.battle.active) core.battle.stop(); log('Dừng Đại chiến'); break;
    case 'bots': log('Bản đám cưới chỉ nhận khách thật trong live, không bật khách ảo'); break;
    case 'clearSim': sim.stop(); core.removeSimPlayers(); log('Đã xóa cư dân mô phỏng'); break;
    case 'weather': if ((['clear', 'cloudy', 'wind', 'rain'] as Weather[]).includes(m.weather)) core.setWeather(m.weather, 120_000); break;
    case 'clock': if (Number.isFinite(+m.clock)) core.setClock(+m.clock); break;
    case 'settings': core.setSettings({ ...(m.settings ?? {}), idleBots: false }); voice.enabled = core.settings.voice; log(`Cài đặt: cảnh ${core.settings.scene === 'wedding' ? 'đám cưới' : 'làng'}, bot giữ làng ${core.settings.idleBots ? 'bật' : 'tắt'}, giọng đọc ${core.settings.voice ? 'bật' : 'tắt'}`); break;
  }
}

/* ----------------------------------------------------------- server */
// An toàn mặc định giống bộ LIVE: chỉ nghe localhost, kiểm tra Host chống DNS rebinding, WebSocket kiểm tra Origin,
// file tĩnh chỉ lấy trong public/, màn hình LIVE chỉ nhận dữ liệu, không gửi lệnh được.
const MIME: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.map': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.mp3': 'audio/mpeg' };
const ALLOWED_HOSTS = new Set([`localhost:${PORT}`, `127.0.0.1:${PORT}`, `[::1]:${PORT}`]);
if (HOST !== '127.0.0.1' && HOST !== 'localhost') for (const h of (process.env.ALLOW_HOSTS ?? '').split(',').filter(Boolean)) ALLOWED_HOSTS.add(h.toLowerCase());
const okHost = (h: string | undefined) => ALLOWED_HOSTS.has(String(h ?? '').toLowerCase());

// Ảnh đại diện TikTok của người chơi, tải qua server để trình duyệt vẽ được lên bảng 3D (ảnh khác nguồn không dùng được trong WebGL).
// Chỉ lấy từ máy chủ ảnh của TikTok, tối đa 300 KB, giữ trong bộ nhớ 200 ảnh gần nhất, không ghi xuống đĩa.
const AVATAR_HOST = /(^|\.)(tiktokcdn(-us|-eu)?\.com|ibyteimg\.com|byteimg\.com|muscdn\.com)$/i;
const avatarCache = new Map<string, { type: string; body: Buffer }>();
async function serveAvatar(id: string, res: http.ServerResponse){
  const url = core.avatars.get(id);
  let hit = avatarCache.get(id);
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
      if (avatarCache.size > 200) avatarCache.delete(avatarCache.keys().next().value as string);
    } catch { /* không tải được: màn hình tự vẽ chữ cái đầu */ }
  }
  if (!hit){ res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': hit.type, 'Cache-Control': 'max-age=3600', 'X-Content-Type-Options': 'nosniff' }).end(hit.body);
}

// Nhạc cưới tùy chọn: file trong village/music/ (mp3, m4a, ogg, mp4). Chỉ đúng tên file trong thư mục đó, không đi ra ngoài.
const MUSIC = path.join(ROOT, 'music');
const AUDIO_TYPES: Record<string, string> = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.mp4': 'video/mp4' };   // mp4: chỉ phát phần tiếng
const musicFile = (name: string) => !/[\\/]/.test(name) && !name.startsWith('.') && AUDIO_TYPES[path.extname(name).toLowerCase()] ? name : null;
// Nhạc nhảy riêng cho sàn nhảy: file trong village/music/nhay/ (không lẫn vào nhạc nền)
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

// Nhân vật 3D như thật: file .glb / .vrm trong village/models/ (cô dâu: codau.glb, chú rể: chure.glb)
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
  if (p.startsWith('/music/nhay/')){ serveMusic(p.slice(12), req, res, path.join(MUSIC, 'nhay'), '/music/nhay/'); return; }
  if (p.startsWith('/music/')){ serveMusic(p.slice(7), req, res); return; }
  if (p === '/') p = '/index.html';
  const tts = /^\/tts\/(v\d+_\d+\.mp3)$/.exec(p);              // giọng đọc vừa tạo, chỉ đúng dạng tên này
  const sfx = p.startsWith('/sfx/') && CROWD_FILE.test(p.slice(5));   // tiếng đám đông hô thu sẵn
  const base = tts ? path.join(ROOT, 'tts') : sfx ? SFX : PUBLIC;
  if (tts) p = '/' + tts[1];
  if (sfx) p = p.slice(4);
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
    if (page.includes('Làng Quê')){ log(`ℹ️ Làng Quê đã chạy sẵn ở cửa sổ khác, mở luôn http://localhost:${PORT} cho bạn. Muốn khởi động lại thì tắt cửa sổ cũ (Ctrl+C) rồi chạy lại.`); openBrowser(`http://localhost:${PORT}/`); }
    else log(`❌ Cổng ${PORT} đang bị chương trình khác dùng. Tắt chương trình đó, hoặc chạy với cổng khác: $env:PORT=3101; npm start`);
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
  log(`Làng Quê chạy tại http://localhost:${PORT}  ·  Màn hình LIVE 9:16: http://localhost:${PORT}/?live=1`);
  openBrowser(`http://localhost:${PORT}/`);
});
