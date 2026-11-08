// Tài khoản (data/users.json) và phiên đăng nhập (data/sessions.json).
// Mật khẩu băm scrypt; file phiên chỉ lưu SHA-256 của mã phiên, lộ file cũng không đăng nhập được.
import crypto from 'node:crypto';

const SCRYPT = { N: 16384, r: 8, p: 1 };
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const h = crypto.scryptSync(String(pw), salt, 64, SCRYPT);
  return `scrypt$${salt.toString('hex')}$${h.toString('hex')}`;
}
export function verifyPassword(pw, stored) {
  const [kind, salt, hash] = String(stored || '').split('$');
  if (kind !== 'scrypt' || !salt || !hash) return false;
  const h = crypto.scryptSync(String(pw), Buffer.from(salt, 'hex'), 64, SCRYPT);
  const want = Buffer.from(hash, 'hex');
  return want.length === h.length && crypto.timingSafeEqual(h, want);
}
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
export const randomPassword = () => crypto.randomBytes(9).toString('base64url').replace(/[-_]/g, '').slice(0, 10);
export const USERNAME_RE = /^[a-z0-9_.]{3,32}$/;

export function parseCookies(header) {
  const out = {};
  for (const part of String(header || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

export class Auth {
  constructor({ users, sessions, cookieName = 'gp_sid', sessionDays = 30, today }) {
    this.users = users;           // JsonDoc { users: [] }
    this.sessions = sessions;     // JsonDoc { sessions: { <sha>: { userId, createdAt, lastSeen, ip, ua } } }
    this.cookieName = cookieName;
    this.ttl = sessionDays * 86_400_000;
    this.today = today;
    this.onRevoke = () => {};     // (tokenHash, userId) → cắt các kết nối game của phiên đó
    this.users.data.users ||= [];
    this.sessions.data.sessions ||= {};
  }
  list() { return this.users.data.users; }
  byId(id) { return this.list().find(u => u.id === id); }
  byName(name) { return this.list().find(u => u.username === String(name || '').toLowerCase()); }

  // Lý do tài khoản không vào được, hoặc '' nếu dùng được
  blocked(u) {
    if (!u) return 'Tài khoản không tồn tại';
    if (!u.active) return 'Tài khoản đã bị khoá';
    if (u.expiresAt && this.today() > u.expiresAt) return `Tài khoản đã hết hạn ngày ${u.expiresAt}`;
    return '';
  }
  canPlay(u, gameId) { return u.role === 'admin' || u.games === '*' || (Array.isArray(u.games) && u.games.includes(gameId)); }

  createUser({ username, password, name = '', role = 'user', games = [], expiresAt = null, note = '', tiktok = '' }) {
    username = String(username || '').trim().toLowerCase();
    if (!USERNAME_RE.test(username)) throw new Error('Tên đăng nhập 3–32 ký tự: chữ thường không dấu, số, dấu chấm, gạch dưới');
    if (this.byName(username)) throw new Error('Tên đăng nhập đã có');
    if (String(password || '').length < 6) throw new Error('Mật khẩu tối thiểu 6 ký tự');
    const u = { id: crypto.randomUUID(), username, name: String(name).slice(0, 60), role: role === 'admin' ? 'admin' : 'user',
      pass: hashPassword(password), active: true, games, expiresAt, note: String(note).slice(0, 300), tiktok: String(tiktok).slice(0, 80),
      createdAt: new Date().toISOString(), lastLoginAt: null, lastLoginIp: '' };
    this.list().push(u); this.users.save();
    return u;
  }
  deleteUser(id) {
    this.revokeUser(id);
    this.users.data.users = this.list().filter(u => u.id !== id);
    this.users.save();
  }

  /* ----------------------------------------------------------- phiên */
  login(u, ip, ua) {
    if (u.role !== 'admin') this.revokeUser(u.id);   // mỗi tài khoản chỉ một nơi đăng nhập: đăng nhập máy mới thì máy cũ bị đẩy ra
    const token = crypto.randomBytes(32).toString('base64url');
    const now = Date.now();
    this.sessions.data.sessions[sha(token)] = { userId: u.id, createdAt: now, lastSeen: now, ip, ua: String(ua || '').slice(0, 200) };
    u.lastLoginAt = new Date(now).toISOString(); u.lastLoginIp = ip;
    this.sessions.save(); this.users.save();
    return token;
  }
  // Trả { user, sid } nếu cookie hợp lệ, tài khoản còn dùng được
  check(req, cookieName = this.cookieName) {
    const token = parseCookies(req.headers.cookie)[cookieName];
    if (!token || token.length > 100) return null;
    const sid = sha(token), s = this.sessions.data.sessions[sid];
    if (!s) return null;
    const now = Date.now();
    const user = this.byId(s.userId);
    if (now - s.lastSeen > this.ttl || this.blocked(user)) { this.revoke(sid); return null; }
    if (now - s.lastSeen > 60_000) { s.lastSeen = now; this.sessions.save(); }
    return { user, sid };
  }
  revoke(sid) {
    const s = this.sessions.data.sessions[sid];
    if (!s) return;
    delete this.sessions.data.sessions[sid];
    this.sessions.save();
    this.onRevoke(sid, s.userId);
  }
  revokeUser(userId) {
    for (const [sid, s] of Object.entries(this.sessions.data.sessions)) if (s.userId === userId) this.revoke(sid);
  }
  sweep() {
    const now = Date.now();
    for (const [sid, s] of Object.entries(this.sessions.data.sessions)) if (now - s.lastSeen > this.ttl || this.blocked(this.byId(s.userId))) this.revoke(sid);
  }
  online(userId) { return Object.values(this.sessions.data.sessions).some(s => s.userId === userId && Date.now() - s.lastSeen < 10 * 60_000); }
}

// Chống dò mật khẩu: sai 5 lần trong 10 phút thì khoá IP + tên đó 10 phút
export class LoginLimiter {
  constructor() { this.map = new Map(); }
  key(ip, name) { return `${ip}|${String(name).toLowerCase()}`; }
  locked(ip, name) {
    const r = this.map.get(this.key(ip, name)) || this.map.get(this.key(ip, '*'));
    return r && r.until > Date.now() ? Math.ceil((r.until - Date.now()) / 60_000) : 0;
  }
  fail(ip, name) {
    for (const k of [this.key(ip, name), this.key(ip, '*')]) {
      const r = this.map.get(k) || { n: 0, first: Date.now(), until: 0 };
      if (Date.now() - r.first > 10 * 60_000) { r.n = 0; r.first = Date.now(); }
      r.n++;
      if (r.n >= (k.endsWith('|*') ? 20 : 5)) r.until = Date.now() + 10 * 60_000;
      this.map.set(k, r);
    }
    if (this.map.size > 5000) this.map.clear();
  }
  ok(ip, name) { this.map.delete(this.key(ip, name)); }
}
