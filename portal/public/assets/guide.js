import { $, api, esc } from './common.js';

const id = (location.pathname.match(/^\/huong-dan\/([\w-]+)$/) || [])[1];
const img = (src, alt, cls = '') => src ? `<div class="img ${cls}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy"></div>` : '';

async function list() {
  const { games } = await api('/api/guides');
  document.title = 'Hướng dẫn chơi · Cổng Game LIVE';
  $('#main').innerHTML = `<section class="hero"><h1>Hướng dẫn <em>đăng nhập &amp; chơi</em></h1>
    <p>Chọn game để xem từng bước: đăng nhập, nối kênh TikTok, đưa màn hình vào TikTok LIVE Studio và người xem tương tác thế nào.</p></section>
    <section class="grid guide-list">${games.map(g => `<article class="game">
      <div class="cover" style="background-image:url('/covers/${esc(g.id)}')"></div>
      <div class="body"><h3>${esc(g.emoji || '')} ${esc(g.name)}</h3><p>${esc(g.desc || '')}</p>
      <a class="btn pri" href="/huong-dan/${esc(g.id)}">📖 Xem hướng dẫn</a></div></article>`).join('')}</section>`;
}

async function detail() {
  let g;
  try { g = await api('/api/guide/' + id); } catch { $('#main').innerHTML = '<div class="empty">Không có hướng dẫn cho game này. <a href="/huong-dan">Xem tất cả</a></div>'; return; }
  document.title = `Hướng dẫn ${g.name} · Cổng Game LIVE`;
  const s = g.shots, site = location.origin;
  const steps = [
    { h: 'Mở trang Cổng Game LIVE', body: `<p>Vào địa chỉ <a href="/"><b>${esc(site)}</b></a> trên máy tính dùng để phát LIVE (Chrome hoặc Edge).</p>
        <p>Tìm thẻ game <b>${esc(g.emoji || '')} ${esc(g.name)}</b> và bấm <span class="kbd">▶ Chơi</span>.</p>`, media: img(s.home, 'Trang chủ') },
    { h: 'Đăng nhập bằng tài khoản được cấp', body: `<p>Nhập <b>Tên đăng nhập</b> và <b>Mật khẩu</b> mà quản trị viên gửi cho bạn, bấm <span class="kbd">Đăng nhập</span>.</p>
        <ul><li>Mỗi tài khoản chỉ đăng nhập ở <b>một nơi</b>: đăng nhập máy khác thì máy cũ bị thoát.</li><li>Sai 5 lần sẽ bị khoá 10 phút.</li><li>Quên hoặc muốn đổi mật khẩu: liên hệ quản trị viên (chỉ admin đổi mật khẩu và khoá tài khoản).</li></ul>`, media: img(s.login, 'Ô đăng nhập') },
    { h: 'Chờ game khởi động', body: `<p>Sau vài giây, khung <b>Đang chạy</b> màu xanh hiện ra ở đầu trang với hai nút: <span class="kbd">⚙️ Bảng điều khiển</span> và <span class="kbd">📺 Màn hình LIVE 9:16</span>.</p>
        <p>Đăng nhập rồi bấm <b>Chơi</b> lần nữa ở trang chủ cũng được, game không chạy hai lần.</p>`,
      media: `<div class="mock"><div class="running"><div class="thumb" style="background-image:url('/covers/${esc(g.id)}')"></div>
        <div class="info"><div class="mute" style="font-size:12px">Đang chạy</div><b>${esc(g.name)}</b><div class="mute" style="font-size:12px"><span class="dot"></span>Chưa nối TikTok</div></div>
        <div class="acts"><span class="btn pri hl">⚙️ Bảng điều khiển</span><span class="btn">📺 Màn hình LIVE 9:16</span></div></div></div>` },
    { h: 'Nối kênh TikTok ở Bảng điều khiển', body: `<p>Bấm <span class="kbd">⚙️ Bảng điều khiển</span>: một tab mới mở ra.</p>
        <p>Bật LIVE trên TikTok trước, rồi nhập <b>username TikTok</b> của bạn (ví dụ <b>@ten_kenh</b>) vào ô kết nối và bấm <span class="kbd">Kết nối</span>. Không cần mật khẩu TikTok.</p>
        <p>Chưa LIVE vẫn dùng được các nút thử quà để xem trước hiệu ứng.</p>
        <div class="note">Kênh phải <b>đang LIVE</b> mới nối được. Rớt mạng thì game tự nối lại.</div>`, media: img(s.control, 'Bảng điều khiển') },
    { h: 'Mở Màn hình LIVE 9:16', body: `<p>Quay lại trang chủ, bấm <span class="kbd">📺 Màn hình LIVE 9:16</span>: một cửa sổ dọc mở ra. Đây là hình người xem sẽ thấy.</p>
        <ul><li>Bấm vào màn hình <b>một lần</b> để bật âm thanh.</li><li>Trình duyệt báo chặn cửa sổ bật lên thì bấm <b>Cho phép</b>.</li><li>Giữ cửa sổ này mở suốt buổi LIVE, đừng thu nhỏ.</li></ul>`, media: img(s.live, 'Màn hình LIVE', 'tall') },
    { h: 'Đưa vào TikTok LIVE Studio', body: `<p>Trong <b>TikTok LIVE Studio</b>: bấm <span class="kbd">＋ Thêm nguồn</span> → <span class="kbd">Chụp cửa sổ</span> (Window capture) → chọn cửa sổ <b>${esc(g.name)}</b>.</p>
        <p>Kéo khung cho vừa màn hình dọc rồi bấm <b>Phát LIVE</b>.</p>
        <div class="note">OBS: dùng nguồn <b>Window Capture</b> với cửa sổ đó (không dùng Browser source vì cần đăng nhập).</div>`,
      media: `<div class="mock studio"><div class="side"><b style="font-size:12px">Nguồn</b><div class="it">📷 Camera</div><div class="it on hl">🪟 ${esc(g.name)}</div><div class="it">＋ Thêm nguồn</div></div>
        <div class="stage"><div class="row" style="gap:14px;flex-wrap:nowrap"><div class="phone" style="background-image:url('${esc(s.live || '/covers/' + g.id)}')"></div>
        <div class="menu"><span>Camera</span><span class="on">Chụp cửa sổ</span><span>Chụp màn hình</span><span>Hình ảnh</span></div></div></div></div>` },
  ];
  const viewers = g.viewers?.length ? `<div class="panel"><table class="cmd-table"><thead><tr><th>Người xem làm</th><th>Trong game</th></tr></thead>
    <tbody>${g.viewers.map(([a, b]) => `<tr><td>${esc(a)}</td><td class="mute">${esc(b)}</td></tr>`).join('')}</tbody></table></div>` : '';
  const gifts = g.gifts?.length ? `<h3 style="margin:22px 0 12px">🎁 Tặng quà</h3><div class="gift-grid">${g.gifts.map(([x, e]) => `<div class="gift"><span class="xu">${/^\d+$/.test(x) ? esc(x) + ' xu' : esc(x)}</span><span class="ef">${esc(e)}</span></div>`).join('')}</div>` : '';
  const tips = [...(g.tips || []),
    'Không mở cửa sổ game nào quá 20 phút thì game tự tắt. Muốn chơi tiếp chỉ cần bấm Chơi lại.',
    'Xong buổi LIVE nên bấm "Tắt game" ở trang chủ.',
    'Quên mật khẩu, tài khoản hết hạn hoặc chưa được cấp game: liên hệ quản trị viên.'];

  $('#main').innerHTML = `
    <section class="g-hero">
      <div><div class="kicker">Hướng dẫn chơi</div><h1>${esc(g.emoji || '')} ${esc(g.name)}</h1><p>${esc(g.intro || g.desc || '')}</p>
        <div class="row"><a class="btn pri lg" href="/?play=${esc(g.id)}">▶ Đăng nhập &amp; chơi ngay</a><a class="btn lg" href="#nguoi-xem">Người xem chơi thế nào</a></div></div>
      <div class="shot" style="background-image:url('/covers/${esc(g.id)}')"></div>
    </section>
    <nav class="toc"><a href="#bat-dau">1. Đăng nhập &amp; bắt đầu</a><a href="#nguoi-xem">2. Người xem &amp; quà tặng</a><a href="#luu-y">3. Lưu ý</a></nav>
    <section class="g-sec" id="bat-dau"><h2>Đăng nhập &amp; bắt đầu</h2><p class="sub">Làm một lần mỗi buổi LIVE, mất khoảng 2 phút.</p>
      <div class="steps2">${steps.map(x => `<div class="step"><div class="txt"><h3>${x.h}</h3>${x.body}</div><div>${x.media}</div></div>`).join('')}</div></section>
    <section class="g-sec" id="nguoi-xem"><h2>Người xem chơi thế nào</h2><p class="sub">Đọc cho người xem trong buổi LIVE, hoặc ghim bình luận.</p>${viewers}${gifts}</section>
    <section class="g-sec" id="luu-y"><h2>Lưu ý</h2><div class="tips">${tips.map(t => `<div>${esc(t)}</div>`).join('')}</div></section>`;
}

document.addEventListener('click', e => {
  const im = e.target.closest('.img img');
  if (im) { const z = $('#zoom'); z.querySelector('img').src = im.src; z.showModal(); return; }
  if (e.target.closest('#zoom')) $('#zoom').close();
});
(id ? detail() : list()).catch(e => { $('#main').innerHTML = `<div class="empty">Không tải được: ${esc(e.message)}</div>`; });
