#!/usr/bin/env bash
# Chạy cổng game (trang người dùng :8080, cổng chơi :8081, trang admin :9090 chỉ trên máy chủ). Cần Node.js 22.18 trở lên.
cd "$(dirname "$0")/portal"
node -e "const [a,b]=process.versions.node.split('.').map(Number); if (a<22||(a===22&&b<18)) { console.error('Cần Node.js 22.18 trở lên, đang có ' + process.versions.node); process.exit(1) }" || exit 1
exec node server.mjs
