// HTTP và WebSocket. Chỉ nghe trên máy phát, kiểm tra Host và Origin, chỉ bảng điều khiển mới được gửi lệnh.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { WebSocketServer } from 'ws';

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg' };

export function createWeb({ root, ttsDir, port, host = '127.0.0.1', onSnapshot, onControl }) {
  const allowed = new Set([`localhost:${port}`, `127.0.0.1:${port}`, `[::1]:${port}`]);
  const okHost = h => allowed.has(String(h || '').toLowerCase());
  const threeDir = path.join(root, 'node_modules', 'three');
  // Danh sách trắng: giao diện, cấu hình dùng chung, Three.js và tệp mp3 giọng đọc. Dữ liệu người chơi không bao giờ được phục vụ.
  const mounts = [
    ['/vendor/three/addons/', path.join(threeDir, 'examples', 'jsm')],
    ['/vendor/three/', path.join(threeDir, 'build')],
    ['/shared/', path.join(root, 'shared')],
    ['/tts/', ttsDir],
    ['/', path.join(root, 'client')],
  ];
  const resolve = p => {
    if (p.split('/').some(seg => seg.startsWith('.') || seg === 'node_modules')) return null;
    for (const [prefix, dir] of mounts) {
      if (!p.startsWith(prefix)) continue;
      const file = path.normalize(path.join(dir, p.slice(prefix.length)));
      return file.startsWith(dir + path.sep) && MIME[path.extname(file).toLowerCase()] ? file : null;
    }
    return null;
  };
  const server = http.createServer((req, res) => {
    if (!okHost(req.headers.host)) { res.writeHead(421).end('wrong host'); return; }
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405).end(); return; }
    let p;
    try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { res.writeHead(400).end(); return; }
    if (p === '/') p = '/index.html';
    const file = resolve(p);
    if (!file) { res.writeHead(404).end('not found'); return; }
    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) { res.writeHead(404).end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()], 'Cache-Control': p.startsWith('/tts/') ? 'no-store' : 'no-cache', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' });
      if (req.method === 'HEAD') { res.end(); return; }
      fs.createReadStream(file).pipe(res);
    });
  });
  const wss = new WebSocketServer({
    server, path: '/ws', maxPayload: 16 * 1024,
    verifyClient: ({ origin, req }) => {
      if (!okHost(req.headers.host)) return false;
      if (!origin) return true;      // OBS không gửi Origin
      try { return okHost(new URL(origin).host); } catch { return false; }
    },
  });
  const broadcast = (msg, only) => {
    const s = JSON.stringify(msg);
    for (const c of wss.clients) if (c.readyState === 1 && (!only || c.role === only)) c.send(s);
  };
  wss.on('connection', (ws, req) => {
    ws.role = new URL(req.url, 'http://x').searchParams.get('role') === 'control' ? 'control' : 'overlay';
    ws.send(JSON.stringify(onSnapshot(ws.role)));
    ws.on('message', buf => {
      if (ws.role !== 'control') return;
      try { const m = JSON.parse(buf); if (m && typeof m === 'object') onControl(m); } catch {}
    });
  });
  return { server, broadcast, listen: () => new Promise((ok, fail) => { server.once('error', fail); server.listen(port, host, ok); }), close: () => { for (const c of wss.clients) c.terminate(); wss.close(); server.close(); } };
}
