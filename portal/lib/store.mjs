// Lưu dữ liệu bằng file JSON: ghi ra file tạm rồi đổi tên, nên tắt ngang cũng không hỏng file.
import fs from 'node:fs';
import path from 'node:path';

export function readJson(file, fallback) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch (e) { if (e.code === 'ENOENT') return fallback; throw e; }
  try { return JSON.parse(text.replace(/^﻿/, '')); }
  // File có mà hỏng thì dừng hẳn, không ghi đè lên (tránh mất hết tài khoản vì một lần sửa tay sai)
  catch (e) { throw new Error(`File ${file} bị lỗi JSON, sửa lại hoặc khôi phục bản sao: ${e.message}`); }
}

export function writeJsonAtomic(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, file);
}

export class JsonDoc {
  constructor(file, fallback) {
    this.file = file;
    this.data = readJson(file, structuredClone(fallback));
    this.timer = null;
  }
  save() { if (!this.timer) this.timer = setTimeout(() => this.flush(), 300); }
  flush() {
    clearTimeout(this.timer); this.timer = null;
    try { writeJsonAtomic(this.file, this.data); } catch (e) { console.error(`Lỗi ghi ${this.file}: ${e.message}`); }
  }
}

/* ------------------------------------------------------------- sổ xu */
// Mỗi ngày một file: data/revenue/2026-11-07.json
// { date, accounts: { <username>: { coins, gifts, games: { <gameId>: xu }, channels: { <tiktok>: xu } } } }
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
export const isDay = s => DAY_RE.test(String(s)) && !Number.isNaN(Date.parse(s + 'T00:00:00Z'));
export function addDays(day, n) { return new Date(Date.parse(day + 'T00:00:00Z') + n * 86_400_000).toISOString().slice(0, 10); }

export class Revenue {
  constructor(dir, timeZone) {
    this.dir = dir;
    this.fmt = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' });
    this.open = new Map();          // ngày → JsonDoc (chỉ giữ ngày đang ghi)
    fs.mkdirSync(dir, { recursive: true });
  }
  today() { return this.fmt.format(new Date()); }
  doc(day) {
    let d = this.open.get(day);
    if (!d) {
      d = new JsonDoc(path.join(this.dir, day + '.json'), { date: day, accounts: {} });
      d.data.accounts ||= {};
      this.open.set(day, d);
      // sang ngày mới: ghi nốt và bỏ các ngày cũ khỏi bộ nhớ
      for (const [k, old] of this.open) if (k !== day) { old.flush(); this.open.delete(k); }
    }
    return d;
  }
  read(day) {
    if (this.open.has(day)) return this.open.get(day).data;
    try { return readJson(path.join(this.dir, day + '.json'), null); } catch (e) { console.error(e.message); return null; }
  }
  add(username, gameId, channel, coins) {
    coins = Math.round(+coins);
    if (!username || !Number.isFinite(coins) || coins <= 0 || coins > 10_000_000) return;
    const d = this.doc(this.today());
    const a = d.data.accounts[username] ||= { coins: 0, gifts: 0, games: {}, channels: {} };
    a.coins += coins; a.gifts += 1;
    a.games[gameId] = (a.games[gameId] || 0) + coins;
    if (channel) a.channels[channel] = (a.channels[channel] || 0) + coins;
    d.save();
  }
  todayOf(username, gameId) {
    const a = this.read(this.today())?.accounts?.[username];
    return gameId ? a?.games?.[gameId] || 0 : a?.coins || 0;
  }
  // Bảng tổng hợp từ ngày from tới ngày to (tính cả hai đầu)
  range(from, to) {
    const days = [];
    for (let d = from; d <= to && days.length < 367; d = addDays(d, 1)) days.push(d);
    const rows = new Map();
    let total = 0, gifts = 0;
    const perDay = {};
    for (const day of days) {
      const accounts = this.read(day)?.accounts || {};
      perDay[day] = 0;
      for (const [username, a] of Object.entries(accounts)) {
        const r = rows.get(username) || { username, total: 0, gifts: 0, byDay: {}, games: {}, channels: {} };
        r.total += a.coins || 0; r.gifts += a.gifts || 0;
        r.byDay[day] = (r.byDay[day] || 0) + (a.coins || 0);
        for (const [g, v] of Object.entries(a.games || {})) r.games[g] = (r.games[g] || 0) + v;
        for (const [c, v] of Object.entries(a.channels || {})) r.channels[c] = (r.channels[c] || 0) + v;
        rows.set(username, r);
        total += a.coins || 0; gifts += a.gifts || 0; perDay[day] += a.coins || 0;
      }
    }
    return { from, to, days, perDay, total, gifts, rows: [...rows.values()].sort((a, b) => b.total - a.total) };
  }
  flush() { for (const d of this.open.values()) d.flush(); }
}
