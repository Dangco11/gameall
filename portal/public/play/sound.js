// Portal chèn file này vào mọi trang game. Trình duyệt chặn tự phát tiếng cho tới khi người dùng bấm vào trang:
// hiện lớp phủ lớn "Bấm để bật nhạc", cú bấm đi tiếp xuống game (game tự bật âm thanh trong sự kiện đó) rồi lớp phủ biến mất.
(() => {
  if (window.__portalSound) return;
  window.__portalSound = true;
  let blocked = true;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) { const c = new AC(); blocked = c.state === 'suspended'; c.close?.(); }
    if (navigator.userActivation?.hasBeenActive) blocked = false;
  } catch { /* coi như bị chặn */ }
  if (!blocked) return;

  const show = () => {
    if (document.getElementById('__portal_sound')) return;
    const el = document.createElement('div');
    el.id = '__portal_sound';
    el.setAttribute('role', 'button');
    el.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;cursor:pointer;' +
      'background:rgba(5,6,10,.55);backdrop-filter:blur(2px);font:700 22px/1.35 "Segoe UI",system-ui,sans-serif;color:#fff;text-align:center;';
    el.innerHTML = '<div style="padding:22px 28px;border-radius:18px;background:linear-gradient(135deg,#ff3d6e,#ff8a3d);box-shadow:0 20px 60px -10px rgba(255,61,110,.6);max-width:80vw">' +
      '🔊 Bấm vào đây một lần<br>để bật nhạc &amp; giọng đọc<div style="font:500 14px system-ui,sans-serif;opacity:.9;margin-top:8px">Trình duyệt chặn tự phát tiếng cho tới khi bạn bấm</div></div>';
    document.body.appendChild(el);
  };
  // Lượt bấm/gõ phím đầu tiên ở bất cứ đâu: bấm hộ nút bật tiếng riêng của game (vẫn trong lượt bấm nên được phép phát).
  // Không chặn sự kiện: pointerdown/click vẫn lan xuống window/document để game tự mở khoá âm thanh.
  const unlock = () => {
    blocked = false;
    for (const b of document.querySelectorAll('#sound, #unmute, #unlock, #btnSound, [data-unmute], .sound-btn')) { try { if (!b.hidden) b.click(); } catch {} }
  };
  // gỡ lớp phủ sau khi cú bấm kết thúc, để cú bấm vào lớp phủ không lỡ bấm trúng nút của game bên dưới
  const remove = () => setTimeout(() => document.getElementById('__portal_sound')?.remove(), 0);
  addEventListener('pointerdown', unlock, { once: true, capture: true });
  addEventListener('keydown', () => { unlock(); remove(); }, { once: true, capture: true });
  addEventListener('click', remove, { once: true, capture: true });
  addEventListener('touchend', remove, { once: true, capture: true });
  if (document.body) show(); else addEventListener('DOMContentLoaded', show);
})();
