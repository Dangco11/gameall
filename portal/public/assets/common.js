// Tiện ích dùng chung cho trang người dùng và trang admin
export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const fmt = n => (+n || 0).toLocaleString('vi-VN');

export async function api(path, opts = {}) {
  const init = { method: opts.method || (opts.body ? 'POST' : 'GET'), headers: { 'X-Portal': '1' }, credentials: 'same-origin' };
  if (opts.body) { init.headers['Content-Type'] = 'application/json'; init.body = JSON.stringify(opts.body); }
  const r = await fetch(path, init);
  let data = {};
  try { data = await r.json(); } catch { /* không phải JSON */ }
  if (!r.ok) { const e = new Error(data.error || `Lỗi ${r.status}`); e.status = r.status; throw e; }
  return data;
}

export function toast(msg, bad = false) {
  let box = $('#toast');
  if (!box) { box = document.createElement('div'); box.id = 'toast'; document.body.append(box); }
  const d = document.createElement('div');
  d.textContent = msg; if (bad) d.className = 'bad';
  box.append(d);
  setTimeout(() => d.remove(), bad ? 5000 : 2800);
}

export function ago(t) {
  if (!t) return '—';
  const s = Math.max(0, (Date.now() - new Date(t).getTime()) / 1000);
  if (s < 60) return 'vừa xong';
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
}
export const initials = s => String(s || '?').trim().split(/\s+/).map(w => w[0]).slice(-2).join('').toUpperCase();
export const LIVE_TEXT = { idle: 'Chưa nối TikTok', connecting: 'Đang nối TikTok…', reconnecting: 'Đang nối lại…', connected: 'Đang LIVE', error: 'Lỗi kết nối' };
