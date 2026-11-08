#!/usr/bin/env bash
# Cài đặt bản build lên máy chủ Ubuntu (Oracle Cloud, VPS...). Chạy một lần:  sudo bash setup-server.sh
#  1) cài Node.js 22   2) mở cổng tường lửa trong máy   3) cài lại thư viện cho Linux   4) cài pm2 (chạy nền, tự bật lại)
set -e
cd "$(dirname "$0")"
DIR="$(pwd)"
OWNER="${SUDO_USER:-ubuntu}"
[ "$(id -u)" = 0 ] || { echo "Chạy bằng: sudo bash setup-server.sh"; exit 1; }

echo "== 1/4 Node.js"
if ! node -e "const [a,b]=process.versions.node.split('.').map(Number);process.exit(a>22||(a===22&&b>=18)?0:1)" 2>/dev/null; then
  apt-get update -y
  apt-get install -y curl ca-certificates
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
node -v

echo "== 2/4 Mở cổng 80, 443, 8080, 8081 (Ubuntu của Oracle chặn sẵn bằng iptables)"
for p in 80 443 8080 8081; do
  iptables -C INPUT -p tcp --dport "$p" -j ACCEPT 2>/dev/null || iptables -I INPUT 5 -p tcp --dport "$p" -j ACCEPT
done
DEBIAN_FRONTEND=noninteractive apt-get install -y iptables-persistent >/dev/null 2>&1 || true
netfilter-persistent save >/dev/null 2>&1 || true

echo "== 3/4 Cài thư viện chạy cho từng game (bản cho Linux)"
find "$DIR" -maxdepth 4 -name package.json -not -path '*/node_modules/*' | while read -r f; do
  d="$(dirname "$f")"
  if grep -q '"dependencies"' "$f"; then
    echo "   - $d"
    (cd "$d" && rm -rf node_modules && npm install --omit=dev --ignore-scripts --no-audit --no-fund --loglevel=error)
  fi
done

echo "== 4/4 pm2"
command -v pm2 >/dev/null || npm install -g pm2 --loglevel=error
chown -R "$OWNER": "$DIR"
chmod +x "$DIR/start.sh"

cat <<EOF

✓ Cài xong. Bước tiếp theo (chạy bằng user thường, KHÔNG sudo):
  Chạy thử:   cd "$DIR" && HOST=0.0.0.0 ADMIN_PASSWORD='mat-khau-manh' ./start.sh
              rồi mở http://IP-may-chu:8080   (Ctrl+C để dừng)
  Chạy nền:   sửa ecosystem.config.cjs (HOST: '0.0.0.0', ADMIN_PASSWORD...) rồi
              pm2 start ecosystem.config.cjs && pm2 save && pm2 startup   (làm theo lệnh pm2 in ra)
  Trang admin (từ máy bạn):  ssh -i khoa.key -L 9090:127.0.0.1:9090 ubuntu@IP-may-chu  →  http://localhost:9090
EOF
