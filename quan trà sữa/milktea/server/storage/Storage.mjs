// Lưu dữ liệu bằng tệp text, một tiến trình ghi duy nhất.
//
//   players.txt      trạng thái mới nhất, mỗi người một dòng, ghi nguyên tử: tệp tạm, fsync, rename
//   journal.txt      nhật ký ghi trước: mỗi thay đổi được fsync ở đây trước, kể cả khi máy tắt đột ngột vẫn còn
//   orders.txt, gift_logs.txt, events.txt   lịch sử, chỉ ghi thêm
//   backups/         bản sao players.txt định kỳ
//   .lock            ngăn hai tiến trình cùng ghi một thư mục dữ liệu
//
// Dòng người chơi trong nhật ký là nguyên dòng, nên đọc lại nhiều lần vẫn ra đúng một kết quả. Nếu máy tắt giữa lúc đã rename
// mà chưa xóa nhật ký, lần chạy sau đọc lại nhật ký vẫn an toàn.
import fs from 'node:fs';
import path from 'node:path';

export const PLAYER_FIELDS = 7;
const LOGS = { orders: 'orders.txt', gifts: 'gift_logs.txt', events: 'events.txt' };
const TAIL_BYTES = 4 * 1024 * 1024;
const EVENTS_MAX_BYTES = 20 * 1024 * 1024;

const sleepSync = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const pidAlive = pid => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };
const stamp = () => new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, '');

// Dữ liệu ghi vào tệp không được chứa dấu phân cách.
export const clean = (s, max = 40) => String(s ?? '').normalize('NFC').replace(/[|\r\n\t\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);

export function isValidPlayerLine(line) {
  const f = line.split('|');
  return f.length === PLAYER_FIELDS && !!f[0] && /^\d+$/.test(f[2]) && /^\d+$/.test(f[3]) && /^\d+$/.test(f[4]);
}

export class Storage {
  constructor(dir, { flushEveryMs = 100, snapshotEveryMs = 30_000, backupEveryMs = 10 * 60_000, keepBackups = 48, log = () => {} } = {}) {
    Object.assign(this, { dir, flushEveryMs, snapshotEveryMs, backupEveryMs, keepBackups, log });
    this.rows = new Map();    // TikTokID -> dòng trong players.txt
    this.dirty = new Set();
    this.pending = [];        // dòng lịch sử chờ flush: [loại, nội dung]
    this.fds = {};
    this.timers = [];
    this.changedSinceSnapshot = false;
    this.lockHeld = false;
  }
  file(name) { return path.join(this.dir, name); }

  open() {
    fs.mkdirSync(path.join(this.dir, 'backups'), { recursive: true });
    this.acquireLock();
    const had = this.loadPlayers();
    if (!had) this.restoreLatestBackup();
    const replayed = this.replayJournal();
    for (const [kind, name] of Object.entries(LOGS)) {
      const file = this.file(name);
      if (fs.existsSync(file)) {
        const size = fs.statSync(file).size;
        if (size) {
          const fd = fs.openSync(file, 'r'), last = Buffer.alloc(1);
          fs.readSync(fd, last, 0, 1, size - 1); fs.closeSync(fd);
          if (last[0] !== 10) fs.appendFileSync(file, '\n');   // dòng cuối bị cắt dở
        }
      }
      this.fds[kind] = fs.openSync(file, 'a');
    }
    this.appendMissing(replayed);
    this.fds.journal = fs.openSync(this.file('journal.txt'), 'a');
    this.snapshot();
    this.backup();
    return this;
  }

  start() {
    const every = (ms, fn) => { const t = setInterval(fn, ms); t.unref?.(); this.timers.push(t); };
    every(this.flushEveryMs, () => this.guard(() => this.flush()));
    every(this.snapshotEveryMs, () => this.guard(() => { if (this.changedSinceSnapshot) this.snapshot(); }));
    every(this.backupEveryMs, () => this.guard(() => this.backup()));
  }
  guard(fn) { try { fn(); } catch (e) { this.log(`Lỗi lưu dữ liệu: ${e.message}`); } }

  acquireLock() {
    const lock = this.file('.lock');
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        fs.writeFileSync(lock, String(process.pid), { flag: 'wx' });
        this.lockHeld = true;
        return;
      } catch (e) {
        if (e.code !== 'EEXIST') throw e;
        const pid = +fs.readFileSync(lock, 'utf8');
        if (pid && pid !== process.pid && pidAlive(pid)) throw new Error(`Thư mục dữ liệu ${this.dir} đang được tiến trình ${pid} sử dụng`);
        fs.rmSync(lock, { force: true });   // tiến trình trước đã chết, khóa bị bỏ lại
      }
    }
    throw new Error('Không lấy được khóa ghi dữ liệu');
  }

  loadPlayers() {
    const file = this.file('players.txt');
    if (!fs.existsSync(file) || !fs.statSync(file).size) return false;
    const rejected = [];
    for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
      if (!line.trim()) continue;
      if (isValidPlayerLine(line)) this.rows.set(line.split('|')[0], line);
      else rejected.push(line);
    }
    // Dòng hỏng được giữ lại riêng, nếu không lần ghi kế tiếp sẽ xóa mất chúng.
    if (rejected.length) {
      fs.appendFileSync(this.file('players.rejected.txt'), rejected.join('\n') + '\n');
      this.log(`Có ${rejected.length} dòng hỏng trong players.txt, đã chuyển sang players.rejected.txt`);
    }
    return true;
  }

  restoreLatestBackup() {
    const dir = path.join(this.dir, 'backups');
    const latest = fs.readdirSync(dir).filter(f => /^players-.*\.txt$/.test(f)).sort().pop();
    if (!latest) return;
    fs.copyFileSync(path.join(dir, latest), this.file('players.txt'));
    this.log(`players.txt bị thiếu, đã khôi phục từ ${latest}`);
    this.loadPlayers();
  }

  replayJournal() {
    const file = this.file('journal.txt'), lines = { orders: [], gifts: [], events: [] };
    if (!fs.existsSync(file)) return lines;
    const text = fs.readFileSync(file, 'utf8');
    // Dòng cuối không có ký tự xuống dòng là dòng ghi dở lúc máy tắt, bỏ qua.
    const complete = text.endsWith('\n') ? text : text.slice(0, text.lastIndexOf('\n') + 1);
    for (const line of complete.split('\n')) {
      const tab = line.indexOf('\t');
      if (tab < 0) continue;
      const kind = line.slice(0, tab), body = line.slice(tab + 1);
      if (kind === 'players') { if (isValidPlayerLine(body)) { this.rows.set(body.split('|')[0], body); this.changedSinceSnapshot = true; } }
      else if (lines[kind]) lines[kind].push(body);
    }
    return lines;
  }

  appendMissing(replayed) {
    for (const [kind, name] of Object.entries(LOGS)) {
      if (!replayed[kind].length) continue;
      const present = new Set(this.tail(name));
      const missing = replayed[kind].filter(l => !present.has(l));
      if (missing.length) fs.writeSync(this.fds[kind], missing.join('\n') + '\n');
    }
  }

  // Các dòng cuối của một tệp lịch sử; đọc tối đa 4 MB nên khởi động không chậm dần theo thời gian.
  tail(name) {
    const file = this.file(name);
    if (!fs.existsSync(file)) return [];
    const size = fs.statSync(file).size, take = Math.min(size, TAIL_BYTES), buf = Buffer.alloc(take);
    const fd = fs.openSync(file, 'r');
    fs.readSync(fd, buf, 0, take, size - take);
    fs.closeSync(fd);
    const lines = buf.toString('utf8').split(/\r?\n/).filter(Boolean);
    if (take < size) lines.shift();
    return lines;
  }
  readAll(name) {
    const file = this.file(name);
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean) : [];
  }

  savePlayer(id, line) {
    this.rows.set(id, line);
    this.dirty.add(id);
  }
  append(kind, line) { this.pending.push([kind, line]); }

  // Gom thay đổi: fsync nhật ký trước, sau đó mới ghi tệp lịch sử. Mất điện giữa hai bước thì lần chạy sau tự bù.
  flush() {
    if (!this.dirty.size && !this.pending.length) return;
    const chunks = [];
    for (const id of this.dirty) chunks.push(`players\t${this.rows.get(id)}`);
    for (const [kind, line] of this.pending) chunks.push(`${kind}\t${line}`);
    fs.writeSync(this.fds.journal, chunks.join('\n') + '\n');
    fs.fsyncSync(this.fds.journal);
    const grouped = {};
    for (const [kind, line] of this.pending) (grouped[kind] ||= []).push(line);
    for (const [kind, lines] of Object.entries(grouped)) fs.writeSync(this.fds[kind], lines.join('\n') + '\n');
    this.dirty.clear();
    this.pending = [];
    this.changedSinceSnapshot = true;
  }

  // Ghi nguyên tử: chỉ xóa nhật ký khi players.txt mới đã nằm an toàn trên đĩa.
  snapshot() {
    this.flush();
    for (const kind of Object.keys(LOGS)) fs.fsyncSync(this.fds[kind]);
    const file = this.file('players.txt'), tmp = file + '.tmp';
    const body = [...this.rows.values()].join('\n') + (this.rows.size ? '\n' : '');
    const fd = fs.openSync(tmp, 'w');
    fs.writeSync(fd, body); fs.fsyncSync(fd); fs.closeSync(fd);
    for (let attempt = 1; ; attempt++) {
      try { fs.renameSync(tmp, file); break; }
      // Windows trả EPERM khi trình diệt virus đang giữ tệp; giữ nguyên nhật ký nếu vẫn lỗi.
      catch (e) { if (attempt >= 6) throw e; sleepSync(50 * attempt); }
    }
    // Windows không cho cắt tệp đang mở ở chế độ append, nên đóng rồi mở lại ở chế độ ghi mới.
    fs.closeSync(this.fds.journal);
    this.fds.journal = fs.openSync(this.file('journal.txt'), 'w');
    fs.fsyncSync(this.fds.journal);
    this.changedSinceSnapshot = false;
    this.rotateEvents();
  }

  rotateEvents() {
    const file = this.file(LOGS.events);
    if (fs.statSync(file).size < EVENTS_MAX_BYTES) return;
    fs.closeSync(this.fds.events);
    fs.renameSync(file, this.file(`events.${stamp()}.txt`));
    this.fds.events = fs.openSync(file, 'a');
  }

  backup() {
    const file = this.file('players.txt');
    if (!fs.existsSync(file) || !this.rows.size) return;
    const dir = path.join(this.dir, 'backups');
    fs.copyFileSync(file, path.join(dir, `players-${stamp()}.txt`));
    const all = fs.readdirSync(dir).filter(f => /^players-.*\.txt$/.test(f)).sort();
    while (all.length > this.keepBackups) fs.rmSync(path.join(dir, all.shift()), { force: true });
  }

  close() {
    this.timers.forEach(clearInterval);
    this.timers = [];
    if (this.fds.journal !== undefined) {
      try { this.snapshot(); } finally {
        for (const fd of Object.values(this.fds)) { try { fs.closeSync(fd); } catch {} }
        this.fds = {};
      }
    }
    if (this.lockHeld) { fs.rmSync(this.file('.lock'), { force: true }); this.lockHeld = false; }
  }
}
