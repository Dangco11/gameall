// pm2 start ecosystem.config.cjs  → chạy nền, tự khởi động lại khi lỗi / khởi động máy (pm2 save && pm2 startup)
module.exports = { apps: [{
  name: 'cong-game', cwd: __dirname + '/portal', script: 'server.mjs', node_args: '', max_memory_restart: '3G',
  env: {
    // Sửa theo tên miền của bạn (xem HUONG-DAN-TRIEN-KHAI.txt)
    // PORTAL_ORIGIN: 'https://game.ten-mien.vn', PLAY_ORIGIN: 'https://play.ten-mien.vn', COOKIE_DOMAIN: '.ten-mien.vn', TRUST_PROXY: '1',
    // ADMIN_PASSWORD: 'mat-khau-manh',
    TZ_NAME: 'Asia/Ho_Chi_Minh',
  },
}] };
