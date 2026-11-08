# Cổng Game LIVE

Cổng quản lý cho các game TikTok LIVE trong thư mục `All game`:

- **Trang người dùng** (cổng 8080, gửi link này cho khách): thư viện game có ảnh bìa. Bấm **Chơi** thì phải đăng nhập, xong thì máy chủ khởi động game cho riêng tài khoản đó.
- **Trang admin** (cổng 9090, **chỉ bạn dùng**, tách hẳn khỏi trang người dùng): tạo và khoá tài khoản, cấp game cho từng tài khoản, đặt ngày hết hạn, xem **doanh thu xu** của từng tài khoản theo ngày, xuất Excel, xem game nào đang chạy.
- **Sổ xu theo ngày**: mỗi ngày một file `data/revenue/YYYY-MM-DD.json`, ghi xu từng tài khoản nhận được, chia theo game và theo kênh TikTok.

Không cần cài thư viện nào cho portal, chỉ cần Node.js 22.18 trở lên.

## Chạy thử trên máy

```
cd portal
npm run build-games      # lần đầu, và mỗi khi sửa code game: cài thư viện, build, xoá sourcemap
npm start                # hoặc bấm đúp mo-cong-game.cmd
```

- Trang người dùng: http://localhost:8080 (khách chỉ thấy thư viện game và ô đăng nhập)
- Trang admin: http://localhost:9090 (tạo tài khoản, xem xu). Mặc định chỉ mở được **trên chính máy chạy server**.
- Lần chạy đầu, cửa sổ dòng lệnh in ra mật khẩu tài khoản `admin`. Đăng nhập trang admin xong thì đổi mật khẩu ngay (nút Sửa ở dòng admin), hoặc đặt trước bằng biến `ADMIN_PASSWORD`.

Trang người dùng **không có** đường vào admin: không có `/admin`, không có API admin, tài khoản admin cũng không đăng nhập được ở đó. Ngược lại tài khoản của khách không đăng nhập được trang admin. Muốn tự thử game thì tạo một tài khoản thường cho mình.

## Cách hoạt động

```
Trình duyệt người dùng
   │  cổng 8080: trang chủ, đăng nhập, admin, API
   │  cổng 8081: chơi game (mọi đường dẫn phải có cookie đăng nhập)
   ▼
portal/server.mjs ── kiểm tra đăng nhập, quyền game, hạn dùng
   │  proxy (đổi Host/Origin, bỏ cookie, chặn .map)
   ▼
Tiến trình game riêng của tài khoản (127.0.0.1, cổng ngẫu nhiên)
   └─ kết nối TikTok LIVE → mỗi lần nhận quà báo xu về portal qua IPC → ghi vào sổ ngày
```

- Mỗi tài khoản chạy **một game một lúc**, dữ liệu game riêng ở `data/instances/<tài khoản>/<game>/`.
- Mở game khác thì game cũ tự tắt. Không còn cửa sổ nào mở quá 20 phút thì game tự tắt (`IDLE_MINUTES`).
- **Mỗi tài khoản chỉ đăng nhập ở một nơi**: đăng nhập máy mới thì máy cũ bị đẩy ra và cửa sổ game ở máy cũ bị cắt. Như vậy khó cho mượn tài khoản.
- Khoá, xoá hoặc hết hạn tài khoản thì người đó bị đăng xuất và game tắt ngay. Thu hồi một game thì game đó tắt ngay.
- **Nhạc và giọng đọc:** trình duyệt chặn tự phát tiếng cho tới khi người dùng bấm vào trang. Portal tự chèn vào mỗi trang game (`public/play/sound.js`) một lớp phủ "🔊 Bấm vào đây một lần để bật nhạc". Bấm một lần trong cửa sổ LIVE là có tiếng. Lớp phủ chỉ hiện khi tiếng đang bị chặn, nên đã bấm thì không thấy nữa.
- Xu chỉ tính quà **thật** từ TikTok. Quà thử ở bảng mô phỏng không được tính.

Người dùng chơi thế nào: bấm Chơi → đăng nhập → **Bảng điều khiển** (nhập username TikTok, cài đặt) → **Màn hình LIVE 9:16** (mở cửa sổ riêng) → trong TikTok LIVE Studio chọn *Window capture* cửa sổ đó.

## Chống lấy trộm (cào) game

Bản nguyên tắc: **không đưa game cho khách, chỉ đưa đường link**. Toàn bộ thư mục `All game` chỉ nằm trên máy chủ của bạn.

| Lớp | Đã làm |
|---|---|
| Mã server (luật chơi, xử lý quà, giọng đọc, kết nối TikTok) | Chạy trên máy chủ, không bao giờ gửi cho trình duyệt. Không có đường dẫn nào đọc được `.ts`, `.mjs` của server, `package.json`, `data/`. |
| Chưa đăng nhập | Cổng game trả về trang đăng nhập cho mọi đường dẫn, kể cả ảnh, model 3D, nhạc, WebSocket. |
| Mã client | Build bản nén (minify), **xoá hết sourcemap** (`npm run build-games`), proxy chặn thêm mọi yêu cầu `.map`. |
| WebSocket | Chỉ nhận từ trang của chính cổng game (kiểm tra Origin) và phải có cookie hợp lệ. |
| Tài khoản | Mật khẩu băm scrypt, khoá 10 phút sau 5 lần sai, một nơi đăng nhập, có hạn dùng. |

Giới hạn cần biết: thứ gì trình duyệt đã hiển thị (file JS client đã nén, model 3D, nhạc) thì người **đã đăng nhập** vẫn có thể lưu lại bằng DevTools. Không có cách nào chặn tuyệt đối việc này. Nhưng lấy được phần đó cũng không chạy được game, vì luật chơi và kết nối TikTok nằm ở server mà họ không có.

Muốn chặt hơn nữa:
- **Quán Trà Sữa** hiện phát thẳng mã client chưa nén (`milktea/client/`, `milktea/shared/`). Nên thêm bước build bằng esbuild như các game khác.
- Có thể làm rối mã client (javascript-obfuscator) sau bước build. Game sẽ chạy chậm hơn một chút.

## Đóng gói bản chạy trên máy chủ

```
npm run build-games              # build client mới nhất
node tools/make-release.mjs      # → thư mục "Bản build" cạnh portal: portal + mọi game + thư viện chạy, không có dữ liệu cũ
```

Chép nguyên thư mục "Bản build" lên máy chủ, đọc HUONG-DAN-TRIEN-KHAI.txt trong đó (start.sh / start.cmd / pm2 / mẫu nginx).

## Đưa lên mạng (VPS)

1. Copy cả thư mục `All game` lên VPS (Linux, Node 22.18+). Chạy `npm run build-games` trong `portal`.
2. Trỏ hai tên miền về VPS, ví dụ `game.ten-mien.vn` (portal) và `play.ten-mien.vn` (chơi game).
3. Chạy portal với biến môi trường (dùng pm2 hoặc systemd để tự chạy lại):

```
PORTAL_ORIGIN=https://game.ten-mien.vn
PLAY_ORIGIN=https://play.ten-mien.vn
COOKIE_DOMAIN=.ten-mien.vn
TRUST_PROXY=1
ADMIN_PASSWORD=mat-khau-manh
node server.mjs
```

4. nginx + HTTPS (Let's Encrypt), chuyển tiếp cả WebSocket:

```nginx
server {
  server_name game.ten-mien.vn;
  location / { proxy_pass http://127.0.0.1:8080; proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr; proxy_set_header X-Forwarded-Proto $scheme; }
}
server {
  server_name play.ten-mien.vn;
  location / { proxy_pass http://127.0.0.1:8081; proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade";
    proxy_set_header Host $host; proxy_set_header X-Forwarded-For $remote_addr; proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 1d; }
}
```

Portal mặc định chỉ nghe `127.0.0.1`, nên ngoài nginx không ai gọi thẳng được cổng 8080/8081.

**Vào trang admin trên VPS:** không đưa cổng 9090 ra nginx. Từ máy của bạn mở đường hầm SSH:

```
ssh -L 9090:127.0.0.1:9090 user@ip-vps
```

rồi mở http://localhost:9090 trên máy bạn. Chỉ ai có quyền SSH vào VPS mới vào được trang admin.

**Lưu ý TikTok:** nhiều khách cùng nối TikTok từ một IP máy chủ có thể bị TikTok giới hạn (lỗi *rate limit*, game tự thử lại sau 2 phút). Đông khách thì cần khoá API ký của EulerStream cho `tiktok-live-connector`, hoặc chia ra nhiều VPS.

## Biến môi trường

| Biến | Mặc định | Ý nghĩa |
|---|---|---|
| `PORTAL_PORT` / `PLAY_PORT` | 8080 / 8081 | Cổng trang chủ / cổng chơi game |
| `HOST` | 127.0.0.1 | Địa chỉ nghe của trang người dùng và cổng game |
| `ADMIN_PORT` | 9090 | Cổng trang admin |
| `ADMIN_HOST` | 127.0.0.1 | Địa chỉ nghe của trang admin. Giữ 127.0.0.1 để chỉ máy chủ vào được |
| `PORTAL_ORIGIN` / `PLAY_ORIGIN` | tự suy ra | Địa chỉ công khai khi chạy sau nginx |
| `COOKIE_DOMAIN` | trống | Đặt `.ten-mien.vn` khi dùng hai tên miền con |
| `COOKIE_SECURE` | tự bật khi https | Cookie chỉ gửi qua HTTPS |
| `TRUST_PROXY` | 0 | Đặt 1 khi đứng sau nginx để lấy đúng IP |
| `ADMIN_PASSWORD` | ngẫu nhiên | Mật khẩu admin tạo ở lần chạy đầu |
| `TZ_NAME` | Asia/Ho_Chi_Minh | Múi giờ để chia ngày trong sổ xu |
| `IDLE_MINUTES` | 20 | Tắt game sau bao nhiêu phút không có cửa sổ nào mở |
| `MAX_INSTANCES` | 50 | Số game chạy cùng lúc tối đa trên máy chủ |
| `SESSION_DAYS` | 30 | Đăng nhập giữ bao nhiêu ngày |
| `DATA_DIR` | portal/data | Nơi lưu dữ liệu |

## Dữ liệu (thư mục `data/`)

| File | Nội dung |
|---|---|
| `users.json` | Tài khoản (mật khẩu đã băm), game được cấp, hạn dùng, ghi chú |
| `sessions.json` | Phiên đăng nhập (chỉ lưu mã băm) |
| `revenue/YYYY-MM-DD.json` | Sổ xu từng ngày: `accounts.<tài khoản>.coins`, `gifts`, `games`, `channels` |
| `games-state.json` | Game đang tạm tắt |
| `instances/` | Dữ liệu riêng của từng game cho từng tài khoản |

Nên sao lưu thư mục `data/` hằng ngày. Xoá tài khoản không xoá sổ xu cũ của tài khoản đó.

## Trang hướng dẫn

- Tất cả hướng dẫn: `http://<trang người dùng>/huong-dan`. Từng game: `/huong-dan/<id-game>`, ví dụ `/huong-dan/dua-may-bay`.
- Trang công khai, không cần đăng nhập, nên gửi link cho khách trước được. Nút **Đăng nhập & chơi ngay** đưa khách về trang chủ, đăng nhập xong là mở luôn game đó.
- Mỗi trang có các bước có ảnh (mở trang, đăng nhập, nối TikTok, mở màn hình LIVE 9:16, đưa vào TikTok LIVE Studio), bảng lệnh người xem, bảng quà theo xu và lưu ý.
- Nội dung chữ của từng game nằm trong `guides.json` (`intro`, `viewers`, `gifts`, `tips`), sửa trực tiếp được.
- Ảnh chụp nằm trong `public/guide/`. Chụp lại tự động bằng `npm run shoot-guides` (cần Edge hoặc Chrome). Chụp một game: `npm run shoot-guides dua-may-bay`, chụp lại trang chủ: `npm run shoot-guides portal`. Ảnh bảng điều khiển cũng được dùng làm ảnh bìa nếu không có ảnh trong `public/covers/`.
- Trang admin, tab **Game**: mỗi game có nút mở và sao chép link hướng dẫn. Khi tạo tài khoản, nút **Sao chép** đã kèm link hướng dẫn.

## Thêm game mới

1. Trong file kết nối TikTok của game, mỗi lần nhận quà gọi
   `process.send?.({ t: 'portal:gift', coins: xu * số_lượng, gift: tên_quà, channel: username_tiktok })`
   (chạy riêng không qua portal thì dòng này không làm gì).
2. Game phải đọc cổng từ `PORT`, nghe `127.0.0.1`, lưu dữ liệu vào `DATA_DIR`.
3. Thêm một mục vào `games.json` (`dir`, `entry`, `build`, đường dẫn `control` và `live`).
4. Ảnh bìa: đặt `public/covers/<id>.jpg` (hoặc .png/.webp), tỉ lệ 16:10. Không có ảnh thì portal tự vẽ ảnh bìa từ emoji và màu của game.
