import { $, $$, api, esc, fmt, toast, ago, LIVE_TEXT } from './common.js';

let portalUrl = '', me = null, today = '', games = [], users = [], rev = null, tab = 'revenue', editing = null, logUser = '';
const addDays = (d, n) => new Date(Date.parse(d + 'T00:00:00Z') + n * 86_400_000).toISOString().slice(0, 10);
const dm = d => `${d.slice(8, 10)}/${d.slice(5, 7)}`;
const gameName = id => games.find(g => g.id === id)?.name || id;

/* ------------------------------------------------------------ đăng nhập */
async function boot() {
  const r = await api('/api/me');
  me = r.user; today = r.todayDate; portalUrl = r.portalOrigin; $('#portalLink').href = portalUrl;
  const ok = me?.role === 'admin';
  $('#loginBox').classList.toggle('hidden', ok);
  for (const id of ['#app', '#tabs', '#who']) $(id).classList.toggle('hidden', !ok);
  if (me && !ok) $('#loginErr').textContent = 'Tài khoản này không có quyền quản trị.';
  if (!ok) { $('#lu').focus(); return; }
  if (!$('#from').value) setRange(6);
  const u = await api('/api/admin/users'); games = u.games; users = u.users;
  show(location.hash.slice(1) || 'revenue');
}
$('#formLogin').addEventListener('submit', async e => {
  e.preventDefault();
  $('#loginErr').textContent = '';
  try { await api('/api/login', { body: { username: $('#lu').value, password: $('#lp').value } }); $('#lp').value = ''; await boot(); }
  catch (err) { $('#loginErr').textContent = err.message; }
});
$('#btnLogout').onclick = async () => { await api('/api/logout', { body: {} }).catch(() => {}); location.reload(); };

function show(t) {
  if (!['revenue', 'users', 'games', 'running'].includes(t)) t = 'revenue';
  tab = t; history.replaceState(null, '', '#' + t);
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
  $$('[data-page]').forEach(s => s.classList.toggle('hidden', s.dataset.page !== t));
  refresh();
}
$('#tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.tab); });
function refresh() {
  if (tab === 'revenue') return loadRevenue();
  if (tab === 'users') return loadUsers();
  if (tab === 'games') return loadGames();
  if (tab === 'running') return loadRunning();
}

/* ------------------------------------------------------------ doanh thu */
function setRange(k) {
  let from, to = today;
  if (k === 'month') from = today.slice(0, 8) + '01';
  else if (k === 1) from = to = addDays(today, -1);
  else from = addDays(today, -(+k));
  if (k === 7) from = addDays(today, -6);
  if (k === 30) from = addDays(today, -29);
  $('#from').value = from; $('#to').value = to;
}
$$('[data-range]').forEach(b => b.onclick = () => { const v = b.dataset.range; setRange(v === 'month' ? 'month' : +v); loadRevenue(); });
$('#from').onchange = $('#to').onchange = () => loadRevenue();
$('#revSearch').oninput = () => renderRevenue();

async function loadRevenue() {
  const q = `from=${$('#from').value}&to=${$('#to').value}`;
  $('#csv').href = '/api/admin/revenue.csv?' + q;
  try { rev = await api('/api/admin/revenue?' + q); renderRevenue(); } catch (e) { toast(e.message, true); }
}
function renderRevenue() {
  const r = rev; if (!r) return;
  const active = r.rows.filter(x => x.total > 0).length;
  $('#tTotal').innerHTML = `${fmt(r.total)}<small>xu</small>`;
  $('#tGifts').textContent = fmt(r.gifts);
  $('#tAcc').textContent = fmt(active);
  $('#tAvg').innerHTML = `${fmt(Math.round(r.total / r.days.length))}<small>xu</small>`;
  $('#rangeText').textContent = r.from === r.to ? dm(r.from) : `${dm(r.from)} → ${dm(r.to)} · ${r.days.length} ngày`;
  const max = Math.max(1, ...r.days.map(d => r.perDay[d]));
  $('#chart').innerHTML = r.days.map(d => `<div style="height:${Math.max(1.5, r.perDay[d] / max * 100)}%" title="${dm(d)}: ${fmt(r.perDay[d])} xu"></div>`).join('');
  const step = Math.ceil(r.days.length / 16);
  $('#chartX').innerHTML = r.days.map((d, i) => `<span>${i % step === 0 ? dm(d) : ''}</span>`).join('');

  const s = $('#revSearch').value.trim().toLowerCase();
  const rows = r.rows.filter(x => !s || x.username.includes(s) || (x.name || '').toLowerCase().includes(s));
  const showDays = r.days.length <= 31;
  const cellMax = Math.max(1, ...rows.flatMap(x => Object.values(x.byDay)));
  if (!rows.length) { $('#revTable').innerHTML = `<tr><td class="empty">Chưa có xu nào trong khoảng ngày này.</td></tr>`; return; }
  $('#revTable').innerHTML = `<thead><tr><th>Tài khoản</th>${showDays ? r.days.map(d => `<th class="r">${dm(d)}</th>`).join('') : ''}<th class="r">Lượt quà</th><th class="r">Tổng xu</th></tr></thead>
    <tbody>${rows.map(x => `<tr class="click" data-acc="${esc(x.username)}"><td><b>${esc(x.username)}</b> <span class="mute">${esc(x.name)}</span>${x.deleted ? ' <span class="pill bad">đã xoá</span>' : ''}</td>
      ${showDays ? r.days.map(d => { const v = x.byDay[d] || 0; return `<td class="r num heat" style="--a:${v ? (0.08 + v / cellMax * 0.42).toFixed(2) : 0}"><span>${v ? fmt(v) : '<span class="dim">·</span>'}</span></td>`; }).join('') : ''}
      <td class="r num">${fmt(x.gifts)}</td><td class="r num"><b>${fmt(x.total)}</b></td></tr>`).join('')}</tbody>
    <tfoot><tr><td>Tổng</td>${showDays ? r.days.map(d => `<td class="r num">${fmt(r.perDay[d])}</td>`).join('') : ''}<td class="r num">${fmt(r.gifts)}</td><td class="r num">${fmt(r.total)}</td></tr></tfoot>`;
}
$('#revTable').addEventListener('click', e => {
  const tr = e.target.closest('[data-acc]'); if (!tr) return;
  const x = rev.rows.find(r => r.username === tr.dataset.acc); if (!x) return;
  const list = (o, label) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<tr><td>${esc(label(k))}</td><td class="r num">${fmt(v)}</td><td class="r num mute">${x.total ? Math.round(v / x.total * 100) : 0}%</td></tr>`).join('') || '<tr><td class="mute">—</td></tr>';
  $('#detailBody').innerHTML = `<h3>${esc(x.username)} <span class="mute" style="font-weight:500">${esc(x.name)}</span></h3>
    <p class="sub">${dm(rev.from)} → ${dm(rev.to)} · <b>${fmt(x.total)}</b> xu · ${fmt(x.gifts)} lượt quà</p>
    <div class="panel"><div class="panel-h"><h3>Theo game</h3></div><table>${list(x.games, gameName)}</table></div>
    <div class="panel"><div class="panel-h"><h3>Theo kênh TikTok</h3></div><table>${list(x.channels, k => '@' + k)}</table></div>
    <div class="panel"><div class="panel-h"><h3>Theo ngày</h3></div><div class="scroll" style="max-height:240px"><table>${Object.entries(x.byDay).sort().reverse().map(([d, v]) => `<tr><td>${d}</td><td class="r num">${fmt(v)}</td></tr>`).join('')}</table></div></div>
    <div class="row end"><button class="btn pri" data-close>Đóng</button></div>`;
  $('#dlgDetail').showModal();
});

/* ------------------------------------------------------------ tài khoản */
async function loadUsers() {
  try { const r = await api('/api/admin/users'); users = r.users; games = r.games; renderUsers(); } catch (e) { toast(e.message, true); }
}
$('#userSearch').oninput = () => renderUsers();
function statusPill(u) {
  if (!u.active) return '<span class="pill bad">Đã khoá</span>';
  if (u.blocked) return '<span class="pill warn">Hết hạn</span>';
  return '<span class="pill ok">Hoạt động</span>';
}
function renderUsers() {
  const s = $('#userSearch').value.trim().toLowerCase();
  const list = users.filter(u => !s || [u.username, u.name, u.note, u.tiktok].some(v => String(v || '').toLowerCase().includes(s)));
  $('#userCount').textContent = `· ${users.length}`;
  $('#userTable').innerHTML = `<thead><tr><th>Tài khoản</th><th>Trạng thái</th><th>Game</th><th>Hết hạn</th><th>Đang chơi</th><th class="r">Xu hôm nay</th><th>Đăng nhập</th><th></th></tr></thead>
  <tbody>${list.map(u => {
    const g = u.role === 'admin' ? '<span class="pill info">Admin</span>' : u.games === '*' ? 'Tất cả' : `${u.games.length}/${games.length}`;
    const exp = u.role === 'admin' || !u.expiresAt ? '<span class="dim">Không</span>' : `${u.expiresAt.split('-').reverse().join('/')}`;
    const play = u.playing ? `<span class="dot ${u.playing.live === 'connected' ? 'on' : ''}"></span>${esc(u.playing.gameName)}${u.playing.channel ? ` <span class="mute">@${esc(u.playing.channel)}</span>` : ''}` : '<span class="dim">—</span>';
    return `<tr data-id="${u.id}"><td><span class="dot ${u.online ? 'on' : ''}" title="${u.online ? 'Đang trực tuyến' : ''}"></span><b>${esc(u.username)}</b> <span class="mute">${esc(u.name)}</span>
      ${u.tiktok ? `<div class="mute" style="font-size:12px;margin-left:14px">${esc(u.tiktok)}${u.note ? ' · ' + esc(u.note) : ''}</div>` : u.note ? `<div class="mute" style="font-size:12px;margin-left:14px">${esc(u.note)}</div>` : ''}</td>
      <td>${statusPill(u)}</td><td>${g}</td><td>${exp}</td><td>${play}</td><td class="r num">${fmt(u.today)}</td>
      <td class="mute" title="${esc(u.lastLoginIp || '')}">${ago(u.lastLoginAt)}</td>
      <td class="r"><div class="row" style="gap:4px;flex-wrap:nowrap;justify-content:flex-end">
        <button class="btn sm" data-act="edit">Sửa</button>
        <button class="btn sm" data-act="reset" title="Tạo mật khẩu mới">🔑</button>
        ${u.id === me.id ? '' : `<button class="btn sm" data-act="toggle">${u.active ? 'Khoá' : 'Mở khoá'}</button>
        <button class="btn sm" data-act="kick" title="Đăng xuất khỏi mọi nơi, tắt game">⏏</button>
        <button class="btn sm danger" data-act="del" title="Xoá">✕</button>`}
      </div></td></tr>`;
  }).join('')}</tbody>`;
}
$('#userTable').addEventListener('click', async e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const u = users.find(x => x.id === b.closest('tr').dataset.id); if (!u) return;
  const act = b.dataset.act;
  try {
    if (act === 'edit') return openUser(u);
    if (act === 'reset') {
      if (!confirm(`Tạo mật khẩu mới cho ${u.username}? Phiên đăng nhập cũ sẽ bị đẩy ra.`)) return;
      const r = await api(`/api/admin/users/${u.id}`, { method: 'PATCH', body: { resetPassword: true } });
      showPass(u.username, r.password);
    }
    if (act === 'toggle') await api(`/api/admin/users/${u.id}`, { method: 'PATCH', body: { active: !u.active } });
    if (act === 'kick') { await api(`/api/admin/users/${u.id}/kick`, { body: {} }); toast(`Đã đăng xuất ${u.username}`); }
    if (act === 'del') {
      if (prompt(`Xoá vĩnh viễn tài khoản "${u.username}"? Sổ xu cũ vẫn giữ. Gõ lại tên đăng nhập để xác nhận:`) !== u.username) return;
      await api(`/api/admin/users/${u.id}`, { method: 'DELETE' });
      toast('Đã xoá');
    }
    loadUsers();
  } catch (err) { toast(err.message, true); }
});

function openUser(u) {
  editing = u || null;
  $('#uTitle').textContent = u ? `Sửa tài khoản ${u.username}` : 'Tạo tài khoản';
  $('#uName').value = u?.username || ''; $('#uName').disabled = !!u;
  $('#uDisplay').value = u?.name || ''; $('#uPw').value = '';
  $('#uPwField').querySelector('label').innerHTML = u ? 'Mật khẩu mới <span class="dim">(để trống: giữ nguyên)</span>' : 'Mật khẩu <span class="dim">(để trống: tự tạo)</span>';
  $('#uExp').value = u?.expiresAt || ''; $('#uTiktok').value = u?.tiktok || ''; $('#uNote').value = u?.note || '';
  const isAdmin = u?.role === 'admin';
  $('#uExp').disabled = isAdmin;
  $('#uAll').checked = isAdmin || u?.games === '*';
  $('#uGames').innerHTML = games.map(g => `<label class="check"><input type="checkbox" value="${esc(g.id)}" ${isAdmin || u?.games === '*' || u?.games?.includes?.(g.id) ? 'checked' : ''}> ${esc(g.emoji || '')} ${esc(g.name)}</label>`).join('');
  syncAll();
  $('#uErr').textContent = '';
  $('#dlgUser').showModal();
  (u ? $('#uDisplay') : $('#uName')).focus();
}
function syncAll() { const all = $('#uAll').checked; $$('#uGames input').forEach(i => { i.disabled = all || editing?.role === 'admin'; if (all) i.checked = true; }); }
$('#uAll').onchange = syncAll;
$('#btnNew').onclick = () => openUser(null);
$('#uName').oninput = e => { e.target.value = e.target.value.toLowerCase().replace(/\s/g, ''); };
$('#formUser').addEventListener('submit', async e => {
  e.preventDefault();
  const body = { name: $('#uDisplay').value.trim(), expiresAt: $('#uExp').value || null, tiktok: $('#uTiktok').value.trim(), note: $('#uNote').value.trim(),
    games: $('#uAll').checked ? '*' : $$('#uGames input:checked').map(i => i.value) };
  if ($('#uPw').value) body.password = $('#uPw').value;
  $('#uSave').disabled = true;
  try {
    if (editing) {
      await api(`/api/admin/users/${editing.id}`, { method: 'PATCH', body });
      $('#dlgUser').close(); toast('Đã lưu');
      if (body.password) showPass(editing.username, body.password);
    } else {
      body.username = $('#uName').value.trim();
      const r = await api('/api/admin/users', { body });
      $('#dlgUser').close();
      showPass(r.user.username, r.password);
    }
    loadUsers();
  } catch (err) { $('#uErr').textContent = err.message; }
  finally { $('#uSave').disabled = false; }
});
function showPass(username, pw) {
  $('#passSub').innerHTML = `Tài khoản: <b>${esc(username)}</b> · Trang đăng nhập: <b>${esc(portalUrl)}</b>`;
  $('#passText').textContent = pw;
  $('#dlgPass').showModal();
}
$('#passCopy').onclick = async () => {
  const text = `Tài khoản: ${$('#passSub b').textContent}\nMật khẩu: ${$('#passText').textContent}\nĐăng nhập tại: ${portalUrl}\nHướng dẫn đăng nhập & chơi: ${portalUrl}/huong-dan`;
  try { await navigator.clipboard.writeText(text); toast('Đã sao chép'); } catch { toast('Không sao chép được, hãy bôi đen để copy', true); }
};

/* ------------------------------------------------------------ game */
async function loadGames() {
  try {
    const r = await api('/api/admin/games');
    $('#gameGrid').innerHTML = r.games.map(g => `<article class="game${g.enabled ? '' : ' locked'}">
      <div class="cover" style="background-image:url('/covers/${esc(g.id)}')">${g.running ? `<span class="tag run">● ${g.running} đang chạy</span>` : ''}</div>
      <div class="body"><h3>${esc(g.emoji || '')} ${esc(g.name)}</h3>
        <p><span class="num">${g.users}</span> tài khoản được cấp · hôm nay <b class="num">${fmt(g.today)}</b> xu</p>
        <div class="row" style="gap:6px"><a class="btn sm" href="${esc(portalUrl)}/huong-dan/${esc(g.id)}" target="_blank" rel="noopener">📖 Trang hướng dẫn</a><button class="btn sm" data-copy="${esc(portalUrl)}/huong-dan/${esc(g.id)}">Sao chép link</button></div>
        <label class="check"><input type="checkbox" data-game="${esc(g.id)}" ${g.enabled ? 'checked' : ''}> ${g.enabled ? 'Đang mở cho người dùng' : 'Đang tạm tắt'}</label>
      </div></article>`).join('');
  } catch (e) { toast(e.message, true); }
}
$('#gameGrid').addEventListener('change', async e => {
  const i = e.target.closest('[data-game]'); if (!i) return;
  if (!i.checked && !confirm('Tạm tắt game này? Người đang chơi sẽ bị tắt game.')) { i.checked = true; return; }
  try { await api(`/api/admin/games/${i.dataset.game}`, { body: { enabled: i.checked } }); } catch (err) { toast(err.message, true); }
  loadGames();
});

/* ------------------------------------------------------------ đang chạy */
async function loadRunning() {
  try {
    const r = await api('/api/admin/instances' + (logUser ? `?logs=${logUser}` : ''));
    $('#runCount').textContent = r.instances.length ? `(${r.instances.length})` : '';
    if (!r.instances.length) $('#instTable').innerHTML = '<tr><td class="empty">Chưa có game nào đang chạy.</td></tr>';
    else $('#instTable').innerHTML = `<thead><tr><th>Tài khoản</th><th>Game</th><th>TikTok</th><th class="r">Cửa sổ mở</th><th>Bắt đầu</th><th class="r">Xu hôm nay</th><th></th></tr></thead>
      <tbody>${r.instances.map(i => `<tr data-user="${i.userId}"><td><b>${esc(i.username)}</b></td><td>${esc(i.gameName)} ${i.status !== 'ready' ? '<span class="pill warn">đang mở</span>' : ''}</td>
        <td><span class="dot ${i.live === 'connected' ? 'on' : /connecting/.test(i.live) ? 'warn' : ''}"></span>${esc(LIVE_TEXT[i.live] || i.live)}${i.channel ? ` <span class="mute">@${esc(i.channel)}</span>` : ''}</td>
        <td class="r num">${i.windows}</td><td class="mute">${ago(i.startedAt)}</td><td class="r num"><b>${fmt(i.today)}</b></td>
        <td class="r"><button class="btn sm" data-log>Nhật ký</button> <button class="btn sm danger" data-stop>Tắt</button></td></tr>`).join('')}</tbody>`;
    const cur = r.instances.find(i => i.userId === logUser);
    $('#logPanel').classList.toggle('hidden', !cur);
    if (cur) {
      $('#logTitle').textContent = `Nhật ký · ${cur.username} · ${cur.gameName}`;
      const box = $('#logBox'), atEnd = box.scrollTop + box.clientHeight >= box.scrollHeight - 20;
      box.textContent = (cur.logs || []).join('\n') || '(trống)';
      if (atEnd) box.scrollTop = box.scrollHeight;
    }
  } catch (e) { toast(e.message, true); }
}
$('#instTable').addEventListener('click', async e => {
  const tr = e.target.closest('tr[data-user]'); if (!tr) return;
  if (e.target.closest('[data-log]')) { logUser = tr.dataset.user; loadRunning(); }
  if (e.target.closest('[data-stop]') && confirm('Tắt game này? Cửa sổ LIVE của người dùng sẽ ngừng.')) {
    await api(`/api/admin/users/${tr.dataset.user}/stop`, { body: {} }).catch(err => toast(err.message, true));
    loadRunning();
  }
});
$('#logClose').onclick = () => { logUser = ''; $('#logPanel').classList.add('hidden'); };

/* ------------------------------------------------------------ chung */
document.addEventListener('click', async e => {
  const c = e.target.closest('[data-close]'); if (c) c.closest('dialog').close();
  const cp = e.target.closest('[data-copy]');
  if (cp) { try { await navigator.clipboard.writeText(cp.dataset.copy); toast('Đã sao chép link'); } catch { prompt('Copy link:', cp.dataset.copy); } }
});
setInterval(() => {
  if (!me || me.role !== 'admin' || document.hidden || document.querySelector('dialog[open]')) return;
  if (tab === 'running') loadRunning();
  else if (tab === 'users') loadUsers();
  else if (tab === 'revenue' && $('#to').value >= today) loadRevenue();
}, 5000);
boot().catch(e => toast('Không tải được: ' + e.message, true));
