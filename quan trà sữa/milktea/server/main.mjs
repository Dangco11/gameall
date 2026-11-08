// Milk Tea Live, khởi chạy server.
//   npm start      quán thật, dữ liệu ở data/, chỉ nhận sự kiện TikTok
//   npm run sim    giả lập, dữ liệu ở data-sim/, có nút thử và bot trên bảng điều khiển
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Storage } from './storage/Storage.mjs';
import { Game } from './core/Game.mjs';
import { createWeb } from './net/Web.mjs';
import { SHOP_NAME } from '../shared/brand.mjs';
import { Voice } from './voice/Voice.mjs';
import { lineFor } from './voice/lines.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SIM = process.argv.includes('--sim');
const PORT = +process.env.PORT || 3002;
const HOST = process.env.HOST || '127.0.0.1';
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, SIM ? 'data-sim' : 'data');

const logs = [];
let web = null;
function log(s) {
  const line = `[${new Date().toLocaleTimeString('vi-VN')}] ${s}`;
  logs.push(line);
  if (logs.length > 200) logs.shift();
  console.log(line);
  web?.broadcast({ t: 'log', line }, 'control');
}

const storage = new Storage(DATA_DIR, { log }).open();

/* ---------------------------------------------------- cài đặt âm thanh */
// Lưu trong settings.json cạnh dữ liệu để tắt mở server vẫn giữ. Chỉ nhận đúng khóa, đúng kiểu, trong giới hạn.
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const clampInt = (v, a, b) => Math.max(a, Math.min(b, Math.round(+v || 0)));
const RULES = { voice: Boolean, welcome: Boolean, music: Boolean, ambience: Boolean, voiceVol: v => clampInt(v, 0, 100), musicVol: v => clampInt(v, 0, 100), sfxVol: v => clampInt(v, 0, 100) };
const settings = { voice: true, welcome: true, music: true, ambience: true, voiceVol: 100, musicVol: 45, sfxVol: 70 };
function applySettings(o = {}) { for (const [k, fn] of Object.entries(RULES)) if (k in o) settings[k] = fn(o[k]); }
try { applySettings(JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'))); } catch {}

// Tệp giọng đọc nằm trong thư mục dữ liệu của chính server này, nên hai server (thật và giả lập) không xóa tệp của nhau.
const TTS_DIR = path.join(DATA_DIR, 'tts');
const voice = new Voice({ dir: TTS_DIR, log, broadcast: msg => web?.broadcast(msg, 'overlay') });
// Mọi tin game gửi cho màn hình cũng đi qua đây để tiếp viên đọc câu tương ứng.
function broadcast(msg) {
  web?.broadcast(msg);
  if (!settings.voice) return;
  const line = lineFor(msg, { welcome: settings.welcome, queueLength: voice.length });
  if (line) voice.say(line.text, { priority: line.priority, meta: { kind: msg.t, id: msg.id || '' } });
}
const game = new Game({ storage, log, broadcast });

const { TikTokAdapter } = SIM ? {} : await import('./live/TikTokAdapter.mjs');
const { Simulator } = SIM ? await import('./live/Simulator.mjs') : {};
const connector = SIM ? new Simulator() : new TikTokAdapter({ log });
connector.on('event', e => game.push(e));
connector.on('status', st => { web?.broadcast({ t: 'tiktok', ...st }); if (st.status === 'connected') log(`Đã kết nối live @${st.uniqueId}`); });
connector.on('reconnected', gap => game.shiftQuietClock(gap));
connector.on('streamEnd', () => game.everyoneLeaves('hết live'));

const str = (v, max) => String(v ?? '').slice(0, max);
const int = (v, a, b) => Math.max(a, Math.min(b, Math.round(+v || 0)));
function onControl(m) {
  switch (m.cmd) {
    case 'connect': if (!SIM) connector.connect(str(m.uniqueId, 100)); return;
    case 'disconnect': if (!SIM) connector.disconnect(); return;
    case 'settings':
      applySettings(m.settings);
      try { fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings)); } catch (e) { log('Không lưu được cài đặt: ' + e.message); }
      web.broadcast({ t: 'settings', settings });
      return;
    case 'testVoice': voice.say('Xin chào cả nhà! Mời mọi người vào quán uống trà sữa nha!', { priority: 2 }); return;
  }
  if (!SIM) return;     // production bỏ qua mọi lệnh giả lập
  const name = str(m.name, 24) || undefined;
  switch (m.cmd) {
    case 'simJoin': connector.join(name); break;
    case 'simComment': connector.comment(name, str(m.text, 120)); break;
    case 'simLike': connector.like(name); break;
    case 'simShare': connector.share(name); break;
    case 'simGift': connector.gift(name, int(m.coins, 1, 50000), int(m.count, 1, 99)); break;
    case 'simCrowd': connector.crowd(int(m.n, 1, 500)); break;
    case 'simBots': connector.setBots(!!m.on, int(m.every, 200, 10000) || 1400); web.broadcast({ t: 'bots', on: !!m.on }, 'control'); break;
  }
}

const snapshot = role => ({ t: 'state', mode: SIM ? 'sim' : 'live', tiktok: connector.state, settings, ...game.snapshot(), ...(role === 'control' ? { logs } : {}) });
web = createWeb({ root: ROOT, ttsDir: TTS_DIR, port: PORT, host: HOST, onSnapshot: snapshot, onControl });

storage.start();
const clock = setInterval(() => { try { game.tick(); } catch (e) { log(`Lỗi nhịp game: ${e.message}`); } }, 200);
const sweep = setInterval(() => {
  // Đang mất kết nối thì không ai bị coi là im lặng
  if (['connected', 'simulated'].includes(connector.state.status)) game.sweepQuiet();
}, 15_000);

// Khách vãng lai khi quán vắng, cả lúc đang nối lại cho quán không trống trơn. AMBIENT=0 để tắt.
const AMBIENT = process.env.AMBIENT !== '0';
const ambient = setInterval(() => {
  try { game.ambientTick(Date.now(), AMBIENT && ['connected', 'reconnecting', 'simulated'].includes(connector.state.status)); }
  catch (e) { log(`Lỗi khách vãng lai: ${e.message}`); }
}, 2000);

let closing = false;
function shutdown(code = 0) {
  if (closing) return;
  closing = true;
  clearInterval(clock); clearInterval(sweep); clearInterval(ambient);
  try { game.shutdown(); storage.close(); } catch (e) { console.error('Lỗi khi đóng:', e.message); }
  process.exit(code);
}
process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
process.on('SIGHUP', () => shutdown());
process.on('uncaughtException', e => { log(`Lỗi không mong đợi: ${e.stack || e.message}`); shutdown(1); });

await web.listen().catch(e => {
  console.error(e.code === 'EADDRINUSE' ? `Cổng ${PORT} đang được dùng. Đặt biến PORT khác rồi chạy lại.` : e.message);
  shutdown(1);
});
if (SIM) connector.connect();
log(`${SHOP_NAME}${SIM ? ' (GIẢ LẬP)' : ''}: màn hình http://localhost:${PORT}/  ·  điều khiển http://localhost:${PORT}/control.html  ·  dữ liệu ${DATA_DIR}`);
