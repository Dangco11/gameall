// Mỗi tài khoản đang chơi có một tiến trình game riêng, chạy trên máy chủ, chỉ nghe 127.0.0.1 ở một cổng ngẫu nhiên.
// Người dùng không bao giờ chạm trực tiếp vào game: mọi yêu cầu đi qua proxy có kiểm tra đăng nhập.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';

const freePort = () => new Promise((ok, fail) => {
  const s = net.createServer();
  s.unref();
  s.on('error', fail);
  s.listen(0, '127.0.0.1', () => { const { port } = s.address(); s.close(() => ok(port)); });
});
const canConnect = port => new Promise(ok => {
  const c = net.connect(port, '127.0.0.1');
  c.once('connect', () => { c.destroy(); ok(true); });
  c.once('error', () => ok(false));
});
const safe = s => String(s).replace(/[^\w.-]/g, '_');

export class Instances {
  constructor({ games, root, dataDir, log, onGift, idleMinutes = 20, maxInstances = 50 }) {
    this.games = games; this.root = root; this.dataDir = dataDir; this.log = log; this.onGift = onGift;
    this.idleMs = idleMinutes * 60_000; this.max = maxInstances;
    this.map = new Map();                // userId → inst
    setInterval(() => this.reap(), 60_000).unref();
  }
  get(userId) { const i = this.map.get(userId); return i && i.status !== 'stopped' ? i : null; }
  list() { return [...this.map.values()].filter(i => i.status !== 'stopped'); }
  touch(inst) { inst.lastSeen = Date.now(); }

  async start(user, game) {
    const cur = this.get(user.id);
    if (cur && cur.game.id === game.id) return cur.ready;
    if (cur) this.stop(user.id, 'mở game khác');
    if (this.list().length >= this.max) throw new Error('Máy chủ đang đủ người chơi, thử lại sau ít phút');
    const dir = path.resolve(this.root, game.dir), entry = path.join(dir, game.entry);
    if (!fs.existsSync(entry)) throw new Error(`Thiếu file game ${game.entry}`);
    if (game.public && game.build && !fs.readdirSync(path.join(dir, game.public)).some(f => f.endsWith('.js')))
      throw new Error('Game chưa được build, admin chạy: npm run build-games');

    const port = await freePort();
    const id = `${safe(user.username)}-${safe(game.id)}`;
    const dataDir = path.join(this.dataDir, safe(user.username), safe(game.id));
    fs.mkdirSync(dataDir, { recursive: true });
    const env = { ...process.env, PORT: String(port), HOST: '127.0.0.1', DATA_DIR: dataDir, NO_OPEN: '1', INSTANCE_ID: id };
    for (const k of ['ADMIN_PASSWORD', 'PORT_CHIEN', 'ALLOW_HOSTS']) delete env[k];

    const inst = { id, userId: user.id, username: user.username, game, port, status: 'starting', startedAt: Date.now(), lastSeen: Date.now(),
      channel: '', live: 'idle', logs: [], sockets: new Set(), proc: null, ready: null };
    this.map.set(user.id, inst);
    const proc = spawn(process.execPath, [entry], { cwd: dir, env, stdio: ['ignore', 'pipe', 'pipe', 'ipc'], windowsHide: true });
    inst.proc = proc;
    const addLog = buf => {
      for (const line of String(buf).split(/\r?\n/)) if (line.trim()) { inst.logs.push(line.slice(0, 400)); if (inst.logs.length > 200) inst.logs.shift(); }
    };
    proc.stdout.on('data', addLog); proc.stderr.on('data', addLog);
    proc.on('message', m => {
      if (!m || typeof m !== 'object') return;
      if (m.t === 'portal:gift') this.onGift(inst, String(m.channel || inst.channel || '').slice(0, 60), +m.coins, String(m.gift || '').slice(0, 40));
      else if (m.t === 'portal:live') { inst.live = String(m.status || ''); if (m.channel) inst.channel = String(m.channel).slice(0, 60); }
    });
    proc.on('exit', code => {
      if (inst.status !== 'stopped') this.log(`⚠️ Game ${game.name} của ${user.username} tự tắt (mã ${code})`);
      inst.status = 'stopped';
      for (const s of inst.sockets) s.destroy();
      if (this.map.get(user.id) === inst) this.map.delete(user.id);
    });
    inst.ready = (async () => {
      for (let t = 0; t < 120; t++) {
        if (inst.status === 'stopped') throw new Error('Game tắt khi đang mở: ' + (inst.logs.slice(-3).join(' | ') || 'không rõ lỗi'));
        if (await canConnect(port)) { inst.status = 'ready'; this.log(`▶️ ${user.username} mở ${game.name} (cổng ${port})`); return inst; }
        await new Promise(r => setTimeout(r, 250));
      }
      this.stop(user.id, 'mở quá 30 giây');
      throw new Error('Game mở quá lâu, thử lại');
    })();
    inst.ready.catch(() => {});
    return inst.ready;
  }

  stop(userId, why = '') {
    const inst = this.map.get(userId);
    if (!inst) return false;
    this.map.delete(userId);
    if (inst.status === 'stopped') return false;
    inst.status = 'stopped';
    for (const s of inst.sockets) s.destroy();
    try { inst.proc.kill(); } catch { /* đã tắt */ }
    this.log(`⏹️ Tắt ${inst.game.name} của ${inst.username}${why ? ' (' + why + ')' : ''}`);
    return true;
  }
  // cắt các kết nối màn hình game của một phiên đăng nhập (khi phiên bị đăng xuất / bị đẩy ra)
  dropSession(sid) { for (const i of this.map.values()) for (const s of i.sockets) if (s.sid === sid) s.destroy(); }

  // Không còn cửa sổ game nào mở và lâu không có yêu cầu thì tắt cho đỡ tốn máy chủ
  reap() {
    const now = Date.now();
    for (const i of this.list()) if (i.status === 'ready' && i.sockets.size === 0 && now - i.lastSeen > this.idleMs) this.stop(i.userId, 'không dùng');
  }
  stopAll() { for (const i of [...this.map.values()]) this.stop(i.userId, 'tắt máy chủ'); }
}
