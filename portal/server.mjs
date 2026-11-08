// Cổng Game LIVE
//   Cổng 8080: trang người dùng: thư viện game + đăng nhập bằng tài khoản admin cấp. KHÔNG có trang admin ở đây.
//   Cổng 8081: nơi chơi game. Mọi đường dẫn đều chuyển vào tiến trình game của tài khoản đang đăng nhập.
//   Cổng 9090: trang admin riêng (tạo tài khoản, doanh thu xu). Mặc định chỉ mở được trên chính máy chủ (127.0.0.1).
// 8080 và 8081 cùng tên miền nên dùng chung cookie đăng nhập. Lên mạng thật thì đặt nginx + HTTPS trước, xem README.md.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Auth, LoginLimiter, randomPassword, verifyPassword, hashPassword } from './lib/auth.mjs';
import { Instances } from './lib/instances.mjs';
import { proxyHttp, proxyWs } from './lib/proxy.mjs';
import { JsonDoc, Revenue, addDays, isDay, readJson } from './lib/store.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const env = process.env;
const DATA = env.DATA_DIR ? path.resolve(env.DATA_DIR) : path.join(ROOT, 'data');
const PORTAL_PORT = +(env.PORTAL_PORT || 8080), PLAY_PORT = +(env.PLAY_PORT || 8081);
const HOST = env.HOST || '127.0.0.1';
const PORTAL_ORIGIN = (env.PORTAL_ORIGIN || '').replace(/\/$/, ''), PLAY_ORIGIN = (env.PLAY_ORIGIN || '').replace(/\/$/, '');
const COOKIE_DOMAIN = env.COOKIE_DOMAIN || '';
const SECURE = env.COOKIE_SECURE === '1' || PORTAL_ORIGIN.startsWith('https:');
const TRUST_PROXY = env.TRUST_PROXY === '1';
const TZ = env.TZ_NAME || 'Asia/Ho_Chi_Minh';
const COOKIE = 'gp_sid', ADMIN_COOKIE = 'gp_admin';
const ADMIN_PORT = +(env.ADMIN_PORT || 9090);
const ADMIN_HOST = env.ADMIN_HOST || '127.0.0.1';      // chỉ máy chủ tự vào được; muốn vào từ xa dùng SSH tunnel (xem README)
const log = s => console.log(`[${new Date().toLocaleString('vi-VN', { timeZone: TZ })}] ${s}`);

fs.mkdirSync(DATA, { recursive: true });
const GAMES = readJson(path.join(ROOT, 'games.json'), []);
const gameById = id => GAMES.find(g => g.id === id);
const gameState = new JsonDoc(path.join(DATA, 'games-state.json'), { disabled: [] });
const gameOn = g => g && !gameState.data.disabled.includes(g.id);
const GUIDES = readJson(path.join(ROOT, 'guides.json'), {});
// Trang hướng dẫn công khai: nội dung + ảnh chụp có sẵn trong public/guide/
const shotUrl = name => fs.existsSync(path.join(ROOT, 'public', 'guide', name)) ? '/guide/' + name : null;
function guideOf(g) {
  return { id: g.id, name: g.name, desc: g.desc, emoji: g.emoji, accent: g.accent, enabled: gameOn(g), ...(GUIDES[g.id] || {}),
    shots: { home: shotUrl('portal-home.png'), login: shotUrl('portal-login.png'), control: shotUrl(g.id + '-control.png'), live: shotUrl(g.id + '-live.png') } };
}

const revenue = new Revenue(path.join(DATA, 'revenue'), TZ);
const auth = new Auth({
  users: new JsonDoc(path.join(DATA, 'users.json'), { users: [] }),
  sessions: new JsonDoc(path.join(DATA, 'sessions.json'), { sessions: {} }),
  cookieName: COOKIE, sessionDays: +(env.SESSION_DAYS || 30), today: () => revenue.today(),
});
const limiter = new LoginLimiter();
const instances = new Instances({
  games: GAMES, root: ROOT, dataDir: path.join(DATA, 'instances'), log,
  idleMinutes: +(env.IDLE_MINUTES || 20), maxInstances: +(env.MAX_INSTANCES || 50),
  onGift: (inst, channel, coins) => revenue.add(inst.username, inst.game.id, channel, coins),
});
auth.onRevoke = sid => instances.dropSession(sid);

// Lần chạy đầu: tạo tài khoản admin
if (!auth.list().some(u => u.role === 'admin')) {
  const pw = env.ADMIN_PASSWORD || randomPassword();
  auth.createUser({ username: 'admin', password: pw, name: 'Quản trị', role: 'admin', games: '*' });
  auth.users.flush();
  console.log(`\n  ★ Đã tạo tài khoản quản trị:  admin / ${pw}\n    Đăng nhập ở trang admin http://localhost:${ADMIN_PORT} rồi đổi mật khẩu ngay.\n`);
}

/* ------------------------------------------------------------ tiện ích */
const ipOf = req => (TRUST_PROXY && String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || req.socket.remoteAddress || '';
const protoOf = req => (TRUST_PROXY && String(req.headers['x-forwarded-proto'] || '').split(',')[0]) || (req.socket.encrypted ? 'https' : 'http');
const hostnameOf = req => String(req.headers.host || 'localhost').replace(/:\d+$/, '');
const portalOrigin = req => PORTAL_ORIGIN || `${protoOf(req)}://${hostnameOf(req)}:${PORTAL_PORT}`;
const playOrigin = req => PLAY_ORIGIN || `${protoOf(req)}://${hostnameOf(req)}:${PLAY_PORT}`;
const cookie = (value, maxAge) => [`${COOKIE}=${value}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${maxAge}`,
  COOKIE_DOMAIN && `Domain=${COOKIE_DOMAIN}`, SECURE && 'Secure'].filter(Boolean).join('; ');
const adminCookie = (value, maxAge) => `${ADMIN_COOKIE}=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}`;
// Phiên phía người dùng: tài khoản admin không dùng được ở trang người dùng / cổng game
const userAuth = req => { const a = auth.check(req, COOKIE); return a && a.user.role !== 'admin' ? a : null; };
const adminAuth = req => { const a = auth.check(req, ADMIN_COOKIE); return a && a.user.role === 'admin' ? a : null; };

const SEC = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin', 'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'" };
function json(res, code, obj, extra = {}) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...SEC, ...extra }).end(JSON.stringify(obj));
}
const fail = (res, code, error) => json(res, code, { error });
function body(req) {
  return new Promise((ok, no) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > 64 * 1024) { no(new Error('Dữ liệu quá lớn')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => { try { ok(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch { no(new Error('JSON không hợp lệ')); } });
    req.on('error', no);
  });
}
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
function sendFile(res, file, req) {
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, SEC).end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Content-Length': st.size, 'Cache-Control': 'no-cache', ...SEC });
    if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
  });
}
const PUBLIC = path.join(ROOT, 'public');
function servePublic(res, rel, req) {
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC + path.sep) || rel.split('/').some(s => s.startsWith('.'))) { res.writeHead(404, SEC).end(); return; }
  sendFile(res, file, req);
}
// Ảnh bìa: đặt public/covers/<id>.jpg|png|webp để thay ảnh vẽ sẵn
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
function serveCover(res, id, req) {
  const g = gameById(id);
  if (!g) { res.writeHead(404, SEC).end(); return; }
  for (const ext of ['.webp', '.jpg', '.png', '.svg']) {
    const f = path.join(PUBLIC, 'covers', g.id + ext);
    if (fs.existsSync(f)) { sendFile(res, f, req); return; }
  }
  // chưa có ảnh bìa riêng: dùng ảnh chụp game (npm run shoot-guides)
  const shot = path.join(PUBLIC, 'guide', g.id + '-control.png');
  if (fs.existsSync(shot)) { sendFile(res, shot, req); return; }
  const a = /^#[0-9a-f]{6}$/i.test(g.accent) ? g.accent : '#6366f1';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs>
<radialGradient id="g" cx="30%" cy="20%" r="95%"><stop offset="0" stop-color="${a}" stop-opacity=".95"/><stop offset=".55" stop-color="${a}" stop-opacity=".28"/><stop offset="1" stop-color="#0b0d14"/></radialGradient>
<pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="#fff" fill-opacity=".09"/></pattern></defs>
<rect width="640" height="400" fill="#0b0d14"/><rect width="640" height="400" fill="url(#g)"/><rect width="640" height="400" fill="url(#p)"/>
<circle cx="500" cy="300" r="190" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="40"/>
<text x="320" y="235" font-size="150" text-anchor="middle" font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji, sans-serif">${esc(g.emoji || '🎮')}</text></svg>`;
  res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache', ...SEC }).end(svg);
}

const pubUser = u => ({ id: u.id, username: u.username, name: u.name, role: u.role, games: u.games, expiresAt: u.expiresAt });
const instView = i => i && { game: i.game.id, gameName: i.game.name, status: i.status, startedAt: i.startedAt, channel: i.channel, live: i.live, windows: i.sockets.size };
function gamesFor(u) {
  return GAMES.filter(g => gameOn(g) || u?.role === 'admin').map(g => ({ id: g.id, name: g.name, desc: g.desc, emoji: g.emoji, accent: g.accent,
    control: g.control, live: g.live, enabled: gameOn(g), allowed: u ? auth.canPlay(u, g.id) : null }));
}
function adminUserView(u) {
  return { ...pubUser(u), active: u.active, note: u.note, tiktok: u.tiktok, createdAt: u.createdAt, lastLoginAt: u.lastLoginAt, lastLoginIp: u.lastLoginIp,
    blocked: auth.blocked(u), online: auth.online(u.id), playing: instView(instances.get(u.id)), today: revenue.todayOf(u.username) };
}
function cleanGames(v) {
  if (v === '*') return '*';
  return Array.isArray(v) ? [...new Set(v.map(String))].filter(id => gameById(id)) : [];
}
function cleanDay(v) {
  if (v === null || v === '' || v === undefined) return null;
  if (!isDay(v)) throw new Error('Ngày hết hạn không hợp lệ (YYYY-MM-DD)');
  return v;
}
// Sau khi đổi tài khoản / tắt game: đá ra nếu không còn quyền
function enforce(u) {
  if (!u || auth.blocked(u)) { if (u) { auth.revokeUser(u.id); instances.stop(u.id, 'tài khoản bị khoá/hết hạn'); } return; }
  const i = instances.get(u.id);
  if (i && (!auth.canPlay(u, i.game.id) || !gameOn(i.game))) instances.stop(u.id, 'không còn quyền chơi game này');
}

/* ------------------------------------------------------------ API */
async function api(req, res, p, url, side) {
  const m = req.method, isAdmin = side === 'admin';
  if (m !== 'GET' && m !== 'HEAD') {
    // chống CSRF: chỉ nhận yêu cầu gửi từ chính trang này (fetch có header riêng, Origin khớp)
    const origin = req.headers.origin;
    if (req.headers['x-portal'] !== '1') return fail(res, 403, 'Yêu cầu không hợp lệ');
    if (origin && new URL(origin).host !== req.headers.host) return fail(res, 403, 'Sai nguồn gửi');
  }
  const a = isAdmin ? adminAuth(req) : userAuth(req);
  const me = a?.user;
  const setCookie = isAdmin ? adminCookie : cookie;

  if (p === '/api/login' && m === 'POST') {
    const b = await body(req), ip = ipOf(req), name = String(b.username || '').trim().toLowerCase();
    const wait = limiter.locked(ip, name);
    if (wait) return fail(res, 429, `Sai quá nhiều lần, thử lại sau ${wait} phút`);
    const u = auth.byName(name);
    if (!u || !verifyPassword(String(b.password || ''), u.pass)) { limiter.fail(ip, name); return fail(res, 401, 'Sai tên đăng nhập hoặc mật khẩu'); }
    // trang người dùng không nhận tài khoản admin, trang admin chỉ nhận tài khoản admin (báo chung một lỗi, không lộ loại tài khoản)
    if ((u.role === 'admin') !== isAdmin) { limiter.fail(ip, name); return fail(res, 401, 'Sai tên đăng nhập hoặc mật khẩu'); }
    const why = auth.blocked(u);
    if (why) return fail(res, 403, why);
    limiter.ok(ip, name);
    const token = auth.login(u, ip, req.headers['user-agent']);
    log(`🔑 ${u.username} đăng nhập ${isAdmin ? 'trang admin' : ''} từ ${ip}`);
    return json(res, 200, { user: pubUser(u) }, { 'Set-Cookie': setCookie(token, 30 * 86400) });
  }
  if (p === '/api/logout' && m === 'POST') {
    if (a) auth.revoke(a.sid);
    return json(res, 200, { ok: true }, { 'Set-Cookie': setCookie('', 0) });
  }
  if (p === '/api/me' && m === 'GET') {
    if (isAdmin) return json(res, 200, { user: me ? pubUser(me) : null, todayDate: revenue.today(), portalOrigin: PORTAL_ORIGIN || `http://${hostnameOf(req)}:${PORTAL_PORT}` });
    return json(res, 200, { user: me ? pubUser(me) : null, games: gamesFor(me), playing: me ? instView(instances.get(me.id)) : null,
      playOrigin: playOrigin(req), today: me ? revenue.todayOf(me.username) : 0, todayDate: revenue.today() });
  }
  if (!me) return fail(res, 401, 'Cần đăng nhập');

  if (isAdmin && !p.startsWith('/api/admin/') && p !== '/api/password') return fail(res, 404, 'Không có');
  if (!isAdmin && p.startsWith('/api/admin/')) return fail(res, 404, 'Không có');

  // đổi mật khẩu chỉ trên trang admin (admin tự đổi của mình; mật khẩu người chơi do admin đặt / cấp lại ở mục tài khoản)
  if (p === '/api/password' && m === 'POST') {
    if (!isAdmin) return fail(res, 403, 'Liên hệ admin để đổi mật khẩu');
    const b = await body(req);
    if (!verifyPassword(String(b.old || ''), me.pass)) return fail(res, 400, 'Mật khẩu cũ không đúng');
    if (String(b.password || '').length < 6) return fail(res, 400, 'Mật khẩu mới tối thiểu 6 ký tự');
    me.pass = hashPassword(b.password); auth.users.save();
    return json(res, 200, { ok: true });
  }
  if (p === '/api/launch' && m === 'POST') {
    const b = await body(req), g = gameById(String(b.game || ''));
    if (!g || !gameOn(g)) return fail(res, 404, 'Game không có hoặc đang tạm tắt');
    if (!auth.canPlay(me, g.id)) return fail(res, 403, 'Tài khoản chưa được cấp game này, liên hệ admin');
    try { await instances.start(me, g); }
    catch (e) { log(`❌ ${me.username} mở ${g.name} lỗi: ${e.message}`); return fail(res, 500, e.message); }
    return json(res, 200, { playing: instView(instances.get(me.id)), playOrigin: playOrigin(req) });
  }
  if (p === '/api/stop' && m === 'POST') { instances.stop(me.id, 'người dùng tắt'); return json(res, 200, { ok: true }); }

  /* ---------------------------------------------------------- admin */
  if (!p.startsWith('/api/admin/')) return fail(res, 404, 'Không có');
  if (me.role !== 'admin') return fail(res, 403, 'Chỉ admin');
  const seg = p.split('/').slice(3);         // ['users', id, ...]

  if (seg[0] === 'users' && !seg[1] && m === 'GET') return json(res, 200, { users: auth.list().map(adminUserView), games: GAMES.map(g => ({ id: g.id, name: g.name, emoji: g.emoji })) });
  if (seg[0] === 'users' && !seg[1] && m === 'POST') {
    const b = await body(req);
    const password = String(b.password || '') || randomPassword();
    try {
      const u = auth.createUser({ username: b.username, password, name: b.name, games: cleanGames(b.games), expiresAt: cleanDay(b.expiresAt), note: b.note || '', tiktok: b.tiktok || '' });
      log(`👤 ${me.username} tạo tài khoản ${u.username}`);
      return json(res, 200, { user: adminUserView(u), password });
    } catch (e) { return fail(res, 400, e.message); }
  }
  if (seg[0] === 'users' && seg[1]) {
    const u = auth.byId(seg[1]);
    if (!u) return fail(res, 404, 'Không có tài khoản');
    if (m === 'PATCH') {
      const b = await body(req);
      try {
        if ('name' in b) u.name = String(b.name).slice(0, 60);
        if ('note' in b) u.note = String(b.note).slice(0, 300);
        if ('tiktok' in b) u.tiktok = String(b.tiktok).slice(0, 80);
        if ('games' in b && u.role !== 'admin') u.games = cleanGames(b.games);
        if ('expiresAt' in b && u.role !== 'admin') u.expiresAt = cleanDay(b.expiresAt);
        if ('active' in b) { if (u.id === me.id && !b.active) throw new Error('Không tự khoá chính mình'); u.active = !!b.active; }
        let password;
        if (b.resetPassword) { password = randomPassword(); u.pass = hashPassword(password); auth.revokeUser(u.id); }
        else if (b.password) { if (String(b.password).length < 6) throw new Error('Mật khẩu tối thiểu 6 ký tự'); password = String(b.password); u.pass = hashPassword(password); if (u.id !== me.id) auth.revokeUser(u.id); }
        auth.users.save(); enforce(u);
        return json(res, 200, { user: adminUserView(u), password });
      } catch (e) { return fail(res, 400, e.message); }
    }
    if (m === 'DELETE') {
      if (u.id === me.id) return fail(res, 400, 'Không tự xoá chính mình');
      instances.stop(u.id, 'tài khoản bị xoá'); auth.deleteUser(u.id);
      log(`🗑️ ${me.username} xoá tài khoản ${u.username} (sổ xu cũ vẫn giữ)`);
      return json(res, 200, { ok: true });
    }
    if (seg[2] === 'kick' && m === 'POST') { auth.revokeUser(u.id); instances.stop(u.id, 'admin đăng xuất'); return json(res, 200, { ok: true }); }
    if (seg[2] === 'stop' && m === 'POST') { instances.stop(u.id, 'admin tắt'); return json(res, 200, { ok: true }); }
  }
  if (seg[0] === 'instances' && m === 'GET') {
    return json(res, 200, { instances: instances.list().map(i => ({ ...instView(i), userId: i.userId, username: i.username, port: i.port, lastSeen: i.lastSeen,
      today: revenue.todayOf(i.username, i.game.id), logs: url.searchParams.get('logs') === i.userId ? i.logs.slice(-80) : undefined })) });
  }
  if (seg[0] === 'games' && seg[1] && m === 'POST') {
    const g = gameById(seg[1]), b = await body(req);
    if (!g) return fail(res, 404, 'Không có game');
    const set = new Set(gameState.data.disabled);
    if (b.enabled) set.delete(g.id); else set.add(g.id);
    gameState.data.disabled = [...set]; gameState.save();
    if (!b.enabled) for (const i of instances.list()) if (i.game.id === g.id) instances.stop(i.userId, 'admin tạm tắt game');
    return json(res, 200, { ok: true });
  }
  if (seg[0] === 'games' && m === 'GET') {
    return json(res, 200, { games: GAMES.map(g => ({ id: g.id, name: g.name, emoji: g.emoji, accent: g.accent, enabled: gameOn(g),
      running: instances.list().filter(i => i.game.id === g.id).length, today: Object.values(revenue.read(revenue.today())?.accounts || {}).reduce((s, a) => s + (a.games?.[g.id] || 0), 0),
      users: auth.list().filter(u => u.role !== 'admin' && auth.canPlay(u, g.id)).length })) });
  }
  if (seg[0] === 'revenue' || seg[0] === 'revenue.csv') {
    const today = revenue.today();
    let from = url.searchParams.get('from') || addDays(today, -6), to = url.searchParams.get('to') || today;
    if (!isDay(from) || !isDay(to)) return fail(res, 400, 'Ngày không hợp lệ');
    if (from > to) [from, to] = [to, from];
    if (addDays(from, 366) < to) from = addDays(to, -366);
    const r = revenue.range(from, to);
    const names = Object.fromEntries(auth.list().map(u => [u.username, u.name]));
    for (const row of r.rows) { row.name = names[row.username] ?? ''; row.deleted = !(row.username in names); }
    if (seg[0] === 'revenue') return json(res, 200, { ...r, today, games: Object.fromEntries(GAMES.map(g => [g.id, g.name])) });
    const q = v => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [['Tài khoản', 'Tên', 'Tổng xu', 'Lượt quà', ...r.days].map(q).join(',')];
    for (const row of r.rows) lines.push([row.username, row.name, row.total, row.gifts, ...r.days.map(d => row.byDay[d] || 0)].map(q).join(','));
    lines.push(['TỔNG', '', r.total, r.gifts, ...r.days.map(d => r.perDay[d])].map(q).join(','));
    res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="doanh-thu-xu_${from}_${to}.csv"`, 'Cache-Control': 'no-store', ...SEC });
    return res.end('﻿' + lines.join('\r\n'));
  }
  return fail(res, 404, 'Không có');
}

/* ------------------------------------------------------------ cổng 8080: portal */
const portal = http.createServer(async (req, res) => {
  let url, p;
  try { url = new URL(req.url || '/', 'http://x'); p = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
  try {
    if (p === '/api/guides' && req.method === 'GET') return json(res, 200, { games: GAMES.filter(gameOn).map(guideOf) });
    const gd = /^\/api\/guide\/([\w-]+)$/.exec(p);
    if (gd && req.method === 'GET') { const g = gameById(gd[1]); return g && gameOn(g) ? json(res, 200, guideOf(g)) : fail(res, 404, 'Không có game này'); }
    if (p.startsWith('/api/')) return await api(req, res, p, url, 'user');
    if (p === '/huong-dan' || p === '/huong-dan/' || /^\/huong-dan\/[\w-]+$/.test(p)) return servePublic(res, 'guide.html', req);
    if (/^\/guide\/[\w-]+\.png$/.test(p)) return servePublic(res, p.slice(1), req);
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, SEC).end(); return; }
    if (p === '/' || p === '/index.html') return servePublic(res, 'index.html', req);
    if (p.startsWith('/assets/') && !p.startsWith('/assets/admin')) return servePublic(res, p.slice(1), req);
    const cv = /^\/covers\/([\w-]+)$/.exec(p);
    if (cv) return serveCover(res, cv[1], req);
    if (p === '/favicon.ico') return servePublic(res, 'assets/favicon.svg', req);
    res.writeHead(404, SEC).end('not found');
  } catch (e) {
    log('Lỗi: ' + (e?.stack || e));
    if (!res.headersSent) fail(res, 400, e.message || 'Lỗi');
  }
});

/* ------------------------------------------------------------ cổng 9090: admin riêng */
const admin = http.createServer(async (req, res) => {
  let url, p;
  try { url = new URL(req.url || '/', 'http://x'); p = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
  try {
    if (p.startsWith('/api/')) return await api(req, res, p, url, 'admin');
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, SEC).end(); return; }
    if (p === '/' || p === '/index.html') return servePublic(res, 'admin.html', req);
    if (p.startsWith('/assets/') || /^\/guide\/[\w-]+\.png$/.test(p)) return servePublic(res, p.slice(1), req);
    const cv = /^\/covers\/([\w-]+)$/.exec(p);
    if (cv) return serveCover(res, cv[1], req);
    if (p === '/favicon.ico') return servePublic(res, 'assets/favicon.svg', req);
    res.writeHead(404, SEC).end('not found');
  } catch (e) {
    log('Lỗi: ' + (e?.stack || e));
    if (!res.headersSent) fail(res, 400, e.message || 'Lỗi');
  }
});

/* ------------------------------------------------------------ cổng 8081: chơi game */
const play = http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url || '/', 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
  const back = where => { res.writeHead(302, { Location: portalOrigin(req) + where, 'Cache-Control': 'no-store' }).end(); };
  if (p === '/__portal/sound.js') return servePublic(res, 'play/sound.js', req);   // nút bật nhạc chèn vào trang game
  if (p.startsWith('/__portal')) return back('/');
  const a = userAuth(req);
  if (!a) return back('/?login=1');
  const inst = instances.get(a.user.id);
  if (!inst || inst.status !== 'ready') return back('/');
  if (/\.map$/i.test(p)) { res.writeHead(404).end(); return; }      // không phát sourcemap: không lộ mã nguồn gốc
  instances.touch(inst);
  proxyHttp(req, res, inst);
});
play.on('upgrade', (req, socket, head) => {
  socket.on('error', () => {});
  const deny = code => { socket.end(`HTTP/1.1 ${code} No\r\nConnection: close\r\n\r\n`); };
  // chỉ trang game của chính cổng này được mở WebSocket (chặn trang lạ dùng cookie người chơi)
  const origin = req.headers.origin;
  try { if (origin && new URL(origin).host !== req.headers.host) return deny(403); } catch { return deny(403); }
  const a = userAuth(req);
  if (!a) return deny(401);
  const inst = instances.get(a.user.id);
  if (!inst || inst.status !== 'ready') return deny(404);
  instances.touch(inst);
  proxyWs(req, socket, head, inst, a.sid);
});

setInterval(() => { auth.sweep(); for (const u of auth.list()) enforce(u); }, 60_000).unref();
const shutdown = () => { log('Tắt máy chủ...'); instances.stopAll(); revenue.flush(); auth.users.flush(); auth.sessions.flush(); gameState.flush(); process.exit(0); };
process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
process.on('uncaughtException', e => log('Lỗi chưa bắt: ' + (e?.stack || e)));
process.on('unhandledRejection', e => log('Lỗi chưa xử lý: ' + (e?.stack || e)));

portal.listen(PORTAL_PORT, HOST, () => log(`🌐 Trang người dùng (gửi link này cho khách): http://localhost:${PORTAL_PORT}`));
admin.listen(ADMIN_PORT, ADMIN_HOST, () => log(`🛠️  Trang admin (chỉ bạn dùng): http://localhost:${ADMIN_PORT}${ADMIN_HOST === '127.0.0.1' ? '  (chỉ mở được trên máy này)' : ''}`));
play.listen(PLAY_PORT, HOST, () => log(`🎮 Cổng chơi game: http://localhost:${PLAY_PORT} (chỉ vào được sau khi đăng nhập)`));

// "localhost" trên Windows có thể là ::1 (IPv6): nghe thêm ::1 để trình duyệt nào cũng vào được
function alsoIPv6(server, port, host) {
  if (host !== '127.0.0.1') return;
  const extra = http.createServer();
  for (const ev of ['request', 'upgrade']) for (const fn of server.listeners(ev)) extra.on(ev, fn);
  extra.on('error', () => {});                  // máy không có IPv6 thì thôi
  extra.listen(port, '::1');
}
for (const [s, port, host] of [[portal, PORTAL_PORT, HOST], [admin, ADMIN_PORT, ADMIN_HOST], [play, PLAY_PORT, HOST]]) {
  s.on('error', e => { log(e.code === 'EADDRINUSE' ? `❌ Cổng ${port} đang bị chương trình khác dùng (có thể portal đã chạy sẵn ở cửa sổ khác)` : `❌ ${e.message}`); process.exit(1); });
  alsoIPv6(s, port, host);
}
