import { $, api, esc, fmt, toast, initials, LIVE_TEXT } from './common.js';

let state = { user: null, games: [], playing: null, playOrigin: '' };
let pendingGame = null;          // game người dùng bấm Chơi trước khi đăng nhập

async function load() {
  state = await api('/api/me');
  render();
}

function render() {
  const { user, games, playing } = state;
  $('#guest').classList.toggle('hidden', !!user);
  $('#member').classList.toggle('hidden', !user);
  if (user) {
    $('#meName').textContent = user.name || user.username;
    $('#meAvatar').textContent = initials(user.name || user.username);
    $('#todayCoins').textContent = `🪙 ${fmt(state.today)} xu hôm nay`;
  }
  $('#gameCount').textContent = `${games.length} game`;
  $('#grid').innerHTML = games.map(g => {
    const locked = user && !g.allowed, run = playing?.game === g.id;
    const tag = run ? '<span class="tag run">● Đang chạy</span>' : locked ? '<span class="tag lock">🔒 Chưa được cấp</span>' : !g.enabled ? '<span class="tag lock">Tạm tắt</span>' : '';
    const btn = run ? `<button class="btn" data-open="${esc(g.id)}">Mở bảng điều khiển</button>`
      : locked ? '<button class="btn" disabled>Liên hệ admin để mở khoá</button>'
      : `<button class="btn pri" data-play="${esc(g.id)}">▶ Chơi</button>`;
    return `<article class="game${locked ? ' locked' : ''}">
      <div class="cover" style="background-image:url('/covers/${esc(g.id)}')">${tag}</div>
      <div class="body"><h3>${esc(g.emoji || '')} ${esc(g.name)}</h3><p>${esc(g.desc || '')}</p><div class="row" style="gap:8px;flex-wrap:nowrap">${btn.replace('class="btn', 'style="flex:1" class="btn')}<a class="btn" href="/huong-dan/${esc(g.id)}" title="Hướng dẫn đăng nhập và chơi">📖 Hướng dẫn</a></div></div></article>`;
  }).join('');

  const box = $('#running');
  box.classList.toggle('hidden', !playing);
  if (playing) {
    const g = games.find(x => x.id === playing.game) || {};
    $('#runThumb').style.backgroundImage = `url('/covers/${encodeURIComponent(playing.game)}')`;
    $('#runName').textContent = playing.gameName;
    $('#runLive').textContent = (LIVE_TEXT[playing.live] || playing.live || '') + (playing.channel ? ` · @${playing.channel}` : '');
    $('#runDot').className = 'dot' + (playing.live === 'connected' ? ' on' : /connecting/.test(playing.live) ? ' warn' : '');
    $('#runControl').href = state.playOrigin + (g.control || '/');
    $('#runGuide').href = '/huong-dan/' + encodeURIComponent(playing.game);
  }
}

async function play(id) {
  if (!state.user) { pendingGame = id; openLogin(`Đăng nhập để chơi ${state.games.find(g => g.id === id)?.name || ''}`); return; }
  const btn = document.querySelector(`[data-play="${CSS.escape(id)}"]`);
  if (btn) { btn.disabled = true; btn.textContent = 'Đang khởi động máy chủ game…'; }
  try {
    const r = await api('/api/launch', { body: { game: id } });
    state.playing = r.playing; state.playOrigin = r.playOrigin;
    render();
    toast('Game đã sẵn sàng. Mở bảng điều khiển để nối TikTok.');
    $('#running').scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (e) {
    toast(e.message, true);
    if (e.status === 401) { state.user = null; render(); openLogin(); }
    else render();
  }
}

function openLiveWindow() {
  const g = state.games.find(x => x.id === state.playing?.game);
  if (!g) return;
  const w = window.open(state.playOrigin + g.live, 'live_' + g.id, 'popup,width=540,height=990');
  if (!w) toast('Trình duyệt chặn cửa sổ bật lên, hãy cho phép popup cho trang này', true);
  else toast('Bấm vào cửa sổ LIVE một lần để bật nhạc và giọng đọc');
}

function openLogin(sub) {
  $('#loginSub').textContent = sub || 'Dùng tài khoản quản trị viên đã cấp cho bạn.';
  $('#loginErr').textContent = '';
  $('#dlgLogin').showModal();
  $('#lu').focus();
}

$('#formLogin').addEventListener('submit', async e => {
  e.preventDefault();
  const go = $('#loginGo');
  go.disabled = true; $('#loginErr').textContent = '';
  try {
    await api('/api/login', { body: { username: $('#lu').value, password: $('#lp').value } });
    $('#lp').value = '';
    $('#dlgLogin').close();
    await load();
    toast(`Xin chào ${state.user.name || state.user.username}!`);
    if (pendingGame) { const id = pendingGame; pendingGame = null; const g = state.games.find(x => x.id === id); if (g?.allowed) play(id); else toast('Tài khoản chưa được cấp game này', true); }
  } catch (err) { $('#loginErr').textContent = err.message; }
  finally { go.disabled = false; }
});
document.addEventListener('click', e => {
  const t = e.target.closest('button, a');
  if (!t) return;
  if (t.matches('[data-close]')) t.closest('dialog').close();
  else if (t.dataset.play) play(t.dataset.play);
  else if (t.dataset.open) window.open($('#runControl').href, '_blank', 'noopener');
});
$('#btnLogin').onclick = () => openLogin();
$('#btnLogout').onclick = async () => { await api('/api/logout', { body: {} }).catch(() => {}); await load(); toast('Đã đăng xuất'); };
$('#runLiveWin').onclick = openLiveWindow;
$('#runStop').onclick = async () => {
  if (!confirm('Tắt game đang chạy? Cửa sổ LIVE sẽ ngừng hoạt động.')) return;
  await api('/api/stop', { body: {} }).catch(e => toast(e.message, true));
  await load();
};

load().then(() => {
  const q = new URLSearchParams(location.search), want = q.get('play');
  if (want || q.has('login')) history.replaceState(null, '', '/');
  if (want && state.games.some(g => g.id === want)) { if (state.playing?.game === want) $('#running').scrollIntoView({ block: 'center' }); else play(want); }
  else if (q.has('login') && !state.user) openLogin();
})
  .catch(e => toast('Không tải được: ' + e.message, true));
// cập nhật trạng thái LIVE và xu hôm nay
setInterval(() => { if (state.user && !document.hidden && !document.querySelector('dialog[open]')) load().catch(() => {}); }, 6000);
