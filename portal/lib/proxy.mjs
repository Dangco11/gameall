// Chuyển yêu cầu của người chơi (đã đăng nhập) vào tiến trình game của chính họ.
// Game chỉ nghe 127.0.0.1 và kiểm tra Host/Origin, nên proxy đổi hai header đó thành địa chỉ nội bộ.
import http from 'node:http';
import net from 'node:net';

const HOP = new Set(['connection', 'keep-alive', 'proxy-connection', 'transfer-encoding', 'upgrade', 'te', 'trailer']);

export function proxyHttp(req, res, inst) {
  const headers = {};
  for (const [k, v] of Object.entries(req.headers)) if (!HOP.has(k) && k !== 'cookie' && k !== 'host' && k !== 'origin' && k !== 'referer') headers[k] = v;
  headers.host = `127.0.0.1:${inst.port}`;
  delete headers['accept-encoding'];          // nhận HTML chưa nén để chèn được script bật tiếng
  const up = http.request({ host: '127.0.0.1', port: inst.port, method: req.method, path: req.url, headers }, r => {
    const h = {};
    for (const [k, v] of Object.entries(r.headers)) if (!HOP.has(k) && k !== 'sourcemap' && k !== 'x-sourcemap' && k !== 'set-cookie') h[k] = v;
    if (!/no-store/.test(h['cache-control'] || '')) h['cache-control'] = 'private, no-cache';
    h['x-frame-options'] = 'SAMEORIGIN';
    h['x-content-type-options'] = 'nosniff';
    h['referrer-policy'] = 'no-referrer';
    // Trang HTML: chèn script hiện nút "Bấm để bật nhạc" (trình duyệt chặn tự phát tiếng khi chưa bấm vào trang)
    if (req.method === 'GET' && r.statusCode === 200 && /text\/html/i.test(h['content-type'] || '') && !h['content-encoding']) {
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => {
        let html = Buffer.concat(chunks).toString('utf8');
        const tag = '<script src="/__portal/sound.js"></script>';
        html = /<\/body>/i.test(html) ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, tag + '</body>') : html + tag;
        const buf = Buffer.from(html, 'utf8');
        h['content-length'] = String(buf.length);
        res.writeHead(200, h).end(buf);
      });
      r.on('error', () => res.destroy());
      return;
    }
    res.writeHead(r.statusCode || 502, h);
    r.pipe(res);
  });
  up.on('error', () => { if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('Game chưa sẵn sàng, tải lại trang sau vài giây'); });
  req.pipe(up);
}

export function proxyWs(req, socket, head, inst, sid) {
  const up = net.connect(inst.port, '127.0.0.1');
  socket.sid = sid;
  inst.sockets.add(socket);
  const end = () => { inst.sockets.delete(socket); socket.destroy(); up.destroy(); inst.lastSeen = Date.now(); };
  up.once('connect', () => {
    const lines = [`GET ${req.url} HTTP/1.1`];
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      const k = req.rawHeaders[i], lk = k.toLowerCase();
      if (lk === 'host' || lk === 'origin' || lk === 'cookie' || lk === 'referer' || /[\r\n]/.test(req.rawHeaders[i + 1])) continue;
      lines.push(`${k}: ${req.rawHeaders[i + 1]}`);
    }
    lines.push(`Host: 127.0.0.1:${inst.port}`, `Origin: http://127.0.0.1:${inst.port}`);
    up.write(lines.join('\r\n') + '\r\n\r\n');
    if (head?.length) up.write(head);
    up.pipe(socket); socket.pipe(up);
  });
  up.on('error', end); socket.on('error', end);
  up.on('close', end); socket.on('close', end);
}
