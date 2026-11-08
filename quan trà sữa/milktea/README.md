# Quán Trà Sữa Liên Quân (Milk Tea Live)

Game quán trà sữa 3D cho TikTok LIVE. Người xem bình luận hay vào phòng là thành khách, tự tìm bàn theo cấp VIP. Tặng quà là gọi món: barista pha, phục vụ bưng tới đúng bàn, khách thưởng thức với biểu cảm theo số xu. Dữ liệu khách lưu lâu dài trong tệp text.

## Chạy

Cần Node.js 20 trở lên.

```bash
cd milktea          # hoặc đứng ở thư mục gốc hay thư mục live: npm start cũng chạy quán trà sữa
npm install
npm run sim      # giả lập: thử không cần TikTok, dữ liệu ở data-sim/
npm start        # thật: kết nối TikTok LIVE, dữ liệu ở data/
npm test         # kiểm tra lõi: chống trùng, combo, tắt đột ngột, khôi phục
```

- Màn hình game: `http://localhost:3002/` (thêm `?q=low` cho máy yếu: tắt bóng đổ và bloom)
- Màn hình dọc: `http://localhost:3002/?ratio=9:16` luôn ra khung 9:16 dù cửa sổ nằm ngang (phần thừa màu đen); `?ratio=16:9` cho khung ngang. Bảng điều khiển có nút **Mở màn hình dọc 9:16** và **Mở màn hình ngang 16:9**. Không có tham số thì tự chọn theo hình dạng cửa sổ.
- Bảng điều khiển: `http://localhost:3002/control.html`
- Tivi ở quầy: ô 16:9 trên tường quầy để chiếu mặt chủ live. Trong LIVE Studio thêm nguồn camera rồi kéo đè lên ô tivi. Nếu LIVE Studio không dùng camera thì mở `?cam=1` để tivi tự chiếu webcam (trình duyệt hỏi quyền một lần). `?tv=0` để ẩn tivi.
- Trên Windows: `mo-tra-sua.cmd` mở server, cửa sổ game 9:16 (được tự phát tiếng) và bảng điều khiển. `mo-tra-sua.cmd sim` để giả lập.
- Trong TikTok LIVE Studio: *Add source → Window capture* → chọn cửa sổ game. OBS: *Browser source* trỏ tới `http://localhost:3002/`, 1080×1920 hoặc 1920×1080.

Tên quán đổi ở `shared/brand.mjs`: biển neon, tiêu đề trang và bảng điều khiển đổi theo. `npm start` ở thư mục gốc hoặc trong `live/` cũng chạy quán trà sữa và tự cài thư viện nếu chưa có; quán nhậu cũ chạy bằng `npm run quan-nhau` trong `live/`.

Chế độ thật không nạp bộ giả lập và bỏ qua mọi lệnh giả lập. Chế độ giả lập ghi "GIẢ LẬP · không phải người xem thật" trên màn hình để không ai nhầm.

## Người xem làm gì

| Hành động | Trong game |
|---|---|
| Bình luận, thả tim hoặc tặng quà | Thành khách, đi từ phố vào quán, ngồi đúng khu theo cấp. Khách cũ được nhận lại cấp và chỗ cũ. Chỉ vào phòng hay chia sẻ thì chưa vào quán |
| Bình luận `bàn 5` (hoặc `bàn số 5`, `ngồi bàn 5`, `b5`) | Sang ghế trống ở bàn đó để ngồi cùng bạn, mỗi bàn 2 ghế. Số bàn in trên mặt bàn: 1–4 hàng gần cửa, càng vào trong số càng lớn, bàn vỉa hè đánh sau cùng. Bàn kín thì báo chọn bàn khác; bàn khu VIP cần đủ cấp |
| Bình luận `nam`, `nữ`, `già`, `trẻ` (hoặc ghép: `nữ già`, `trai trẻ`) | Đổi dáng nhân vật: nữ tóc dài, nam tóc ngắn, già tóc bạc đi chậm, trẻ tóc màu. Lưu ở `looks.json`, lần sau vào quán vẫn giữ |
| Bình luận `gọi 12` hoặc `gọi trà sữa matcha` | Chọn món; quà kế tiếp đủ giá sẽ ra món đó thay món mặc định |
| Tặng quà | Gọi món theo tổng xu; máy quay chiếu bàn của khách lúc gọi và lúc món được bưng tới. Quà dồn dập trong 0,8 giây gom thành một đơn |
| Bình luận | 1 điểm VIP mỗi phút. Thả tim 1 điểm mỗi phút, chia sẻ 2 điểm mỗi 5 phút. Mỗi xu là 1 điểm |

### Âm thanh

Chỉnh trong mục **Âm thanh** trên bảng điều khiển (lưu vào `settings.json` trong thư mục dữ liệu):

- **Giọng tiếp viên** (Edge Read Aloud, cần Internet): chào khách mới, cảm ơn quà kèm tên món, chúc mừng lên cấp, hô đại tiệc. Tên tục, đường link hay số điện thoại được đọc là "bạn". Câu chào chỉ đọc khi giọng đang rảnh; câu chờ quá 30 giây bị bỏ để không đọc trễ. Sửa lời trong `server/voice/lines.mjs`.
- **Nhạc nền lo-fi** tự tạo bằng WebAudio, không dùng bài hát nên không lo bản quyền; tự nhỏ lại khi giọng đọc.
- **Tiếng quán và hiệu ứng**: chuông cửa, rót trà, lắc bình, trân châu, dập nắp, hút trà sữa, ly leng keng, xu, vỗ tay, kèn tiệc, pháo hoa; tiếng nền dày lên khi quán đông.

Trình duyệt thường chặn tự phát tiếng: màn hình hiện nút **Bấm để bật tiếng** cho tới khi bấm một lần. Mở bằng `mo-tra-sua.cmd` thì không cần bấm.

### Khách vãng lai khi quán vắng

Đang live (hoặc đang nối lại) mà quá 20 giây không có người xem nào trong quán thì khách vãng lai lần lượt ra vào: tối đa 3 người, cứ 6 đến 18 giây có người vào, mỗi người ngồi nhâm nhi trà đá 30 đến 70 giây, nên màn hình luôn có chuyển động. Họ không có tên trên đầu, không có hồ sơ trong `players.txt`, không xu, không lên bảng VIP, không gọi món và không tính vào số khách. Có người xem thật vào là họ nhường chỗ ngay. Tắt bằng cách chạy với biến `AMBIENT=0`.

Khách vãng lai chỉ để quán bớt trống. Họ không giữ kết nối TikTok: việc đó do cơ chế tự nối lại lo (rớt mạng hoặc 2 phút không có dữ liệu thì nối lại, giãn dần 3 đến 60 giây, khách trong quán ngồi nguyên trong lúc chờ).

### Top tháng và đón khách VIP

- Bảng bên trái là **Top 10 tháng**: điểm VIP kiếm trong tháng (mỗi xu 1 điểm, cộng điểm bình luận, thả tim, chia sẻ). Lưu ở `month.json` suốt tháng; sang tháng mới bảng cũ được cất vào `months/YYYY-MM.json` rồi bắt đầu lại từ 0. Cấp VIP trọn đời không bị reset.
- Top 1 đến 3 có khung vàng, bạc, đồng lấp lánh. Ai trong top 10 có huy hiệu 🏆 và hạng trên tên, hào quang dưới chân.
- Người xem có **cấp TikTok từ 20** trở lên (huy hiệu cấp tặng quà của TikTok) chỉ cần vào phòng là được mời vào quán và đón như khách VIP, kể cả chưa bình luận. Đổi mức bằng biến `TIKTOK_VIP_LEVEL`, ví dụ `set TIKTOK_VIP_LEVEL=15` trước khi chạy. Mỗi lần chào, bảng điều khiển ghi một dòng "Chào khách cấp … TikTok".
- Khách top 10 tháng hoặc cấp 5 trở lên khi vào quán được đón long trọng: tiếp viên cúi chào mời vào, cột sáng và vòng sáng ở cửa, vệt sáng theo bước chân, máy quay chiếu lối vào, thông báo lớn và giọng đọc giới thiệu. Top 1 đến 3 thêm pháo hoa, pháo giấy. Mỗi người được đón như vậy tối đa một lần trong 20 phút.

## Bảng giá và biểu cảm

Mức giá trùng với các mức quà TikTok hay gặp. Quà không đúng mức nào thì ra món cao nhất không vượt quá số xu. Sửa bảng ở `shared/menu.mjs`, server và màn hình cùng đọc tệp này.

| Xu | Món (mặc định · món khác cùng giá) | Nhóm | Biểu cảm khi nhận món |
|---:|---|---|---|
| 1 | Trân châu đen · Thạch dừa | Topping | 😋 Chép miệng gật gù |
| 5 | Trà đá chanh · Pudding trứng | Trà nguyên chất, Topping | 😊 Cười tít mắt |
| 10 | Trà ô long lạnh · Trà lài | Trà nguyên chất | 😌 Nhắm mắt thư giãn |
| 20 | Trà đào cam sả · Trà chanh dây | Trà trái cây | 👋 Vẫy tay chào cả quán |
| 30 | Trà vải hoa hồng · Trà dâu tây | Trà trái cây | 😍 Mắt trái tim |
| 50 | Trà sữa truyền thống · Trà sữa matcha | Trà sữa | 👏 Vỗ tay khen ngon |
| 99 | **Bao Cả Quán Trà Đá** · Trà sữa đường đen · Trà sữa khoai môn | Combo, Trà sữa | 🧊 Mỗi khách trong quán cầm một ly trà đá, cả quán cụng ly |
| 100 | Bánh su kem | Bánh ngọt | 🥰 Thả tim bay |
| 150 | Tiramisu ly | Bánh ngọt | 💃 Lắc lư theo nhạc |
| 199 | Bánh crepe sầu riêng | Bánh ngọt | 🤩 Đứng dậy trầm trồ |
| 200 | Cheesecake dâu | Bánh ngọt | 🥳 Nâng ly chúc mừng |
| 299 | Combo Bạn Thân | Combo | 🍻 Cụng ly với bàn bên |
| 300 | Combo Hẹn Hò | Combo | 😳 Ngại ngùng thả tim |
| 399 | Combo Cả Bàn | Combo | 🕺 Cả bàn nhún nhảy |
| 400 | Combo Sinh Nhật | Combo | 🎂 Nhảy mừng sinh nhật |
| 500 | Kem Cheese Vảy Vàng | Món VIP | 😎 Đeo kính sành điệu |
| 699 | Trà Sữa Hoàng Kim | Món VIP | 🤑 Xoay vòng ăn mừng |
| 899 | Tháp Trà Sữa | Món VIP | 🏆 Giơ cúp vô địch |
| 1.000 | Trà Sữa Kim Cương | Món VIP | 👑 Đội vương miện vẫy tay |
| 1.500 | Trà Hoa Đăng (5 ly mỗi phiên) | Món giới hạn | 🌟 Xoay tròn tỏa sáng |
| 2.000 | Siêu Ly Khổng Lồ (3 ly mỗi phiên) | Món giới hạn | 🚀 Bay lên giữa quán |
| 3.000 | Tiệc Một Khu | Món VIP | 🎉 Cả khu nhảy, pháo giấy |
| 5.000 | Đại Tiệc Toàn Quán | Món VIP | 🎆 Cả quán nhảy, pháo hoa, đèn đổi màu |

Món giới hạn bán hết thì quà ra món thấp hơn liền kề, khách không bao giờ mất món. Số ly đếm lại từ đầu khi khởi động lại server.

## Cấp VIP

| Cấp | Danh hiệu | Điểm | Khu ngồi | Trang phục |
|---:|---|---:|---|---|
| 1 | Khách Mới | 0 | Vỉa hè | Áo xanh |
| 2 | Khách Quen | 10 | Hàng cửa | Mũ lưỡi trai |
| 3 | Bạn Của Quán | 50 | Góc cửa sổ | Nơ hồng |
| 4 | Thành Viên Bạc | 150 | Khu Bạc | Mũ nồi, hào quang bạc |
| 5 | Thành Viên Vàng | 400 | Khu Vàng | Mũ nồi vàng, hào quang vàng |
| 6 | Bạch Kim | 1.000 | Khu Bạch Kim | Kính râm, áo choàng ngọc |
| 7 | Kim Cương | 2.500 | Khu Kim Cương (bục đá) | Áo choàng xanh, khung tên phát sáng |
| 8 | Đại Gia Trà Sữa | 6.000 | Phòng Đại Gia | Áo choàng tím |
| 9 | Chủ Tịch Topping | 15.000 | Sảnh Chủ Tịch | Vương miện, kính, áo choàng đỏ |
| 10 | Huyền Thoại Quán | 40.000 | Ngai Huyền Thoại (bục vàng) | Vương miện, ngai vàng |

Khu 7 trở lên dành riêng, khách cấp thấp không vào. Khu của mình kín thì ngồi khu thấp hơn. Lên cấp thì được mời sang khu mới nếu còn chỗ. Quán có 76 chỗ (68 ghế và 8 chỗ đứng ở quầy mang đi). Hết chỗ thì khách mới vào hàng chờ và không được vẽ. Người tặng quà hoặc bình luận được ưu tiên: người im lặng lâu nhất, chưa có đơn và cấp không cao hơn sẽ nhường ghế.

## Dữ liệu

Tất cả nằm trong `data/` (giả lập: `data-sim/`). Hai thư mục này không đưa lên git.

| Tệp | Nội dung |
|---|---|
| `players.txt` | `TikTokID\|Username\|Level\|VIPPoint\|TotalCoins\|FavoriteDrink\|SeatID`, mỗi người một dòng |
| `orders.txt` | `OrderID\|thời gian\|trạng thái\|TikTokID\|Username\|ItemID\|tên món\|số lượng\|xu`, ghi một dòng mỗi lần đơn đổi trạng thái |
| `gift_logs.txt` | `thời gian\|EventID\|TikTokID\|Username\|GiftID\|tên quà\|số lượng\|xu mỗi quà\|tổng xu\|khóa combo\|số combo cộng dồn` |
| `events.txt` | Vào, quay lại, bình luận, chọn món, quà, lên cấp, phục vụ, ra về. Quá 20 MB thì đổi tên và mở tệp mới |
| `journal.txt` | Nhật ký ghi trước, tự xóa sau mỗi lần lưu players.txt |
| `backups/` | Bản sao players.txt mỗi 10 phút, giữ 48 bản |
| `settings.json` | Cài đặt âm thanh |
| `tts/` | Tệp mp3 giọng đọc tạm, giữ 40 tệp mới nhất, xóa khi khởi động |

Cách ghi an toàn:

- **Một tiến trình ghi:** tệp `.lock` chặn chạy hai server trên cùng thư mục dữ liệu.
- **Không mất khi tắt đột ngột:** mỗi 0,1 giây, thay đổi được ghi và `fsync` vào `journal.txt` trước. Mỗi 30 giây, `players.txt` được ghi lại kiểu nguyên tử: tệp tạm, `fsync`, rồi đổi tên. Bài kiểm tra kill -9 xác nhận không mất số xu đã ghi và không có dòng trùng.
- **Không trùng:** mỗi người chỉ một dòng, tìm theo TikTokID rồi theo username. Mã sự kiện quà được nạp lại từ `gift_logs.txt` khi khởi động, nên TikTok gửi lại tin cũ sau khi kết nối lại cũng không bị cộng hai lần. Combo chỉ tính phần tăng thêm.
- **Khôi phục:** dòng hỏng chuyển sang `players.rejected.txt` thay vì bị xóa. Mất `players.txt` thì lấy bản sao lưu mới nhất. Đơn đang pha dở lúc tắt được pha lại từ đầu, khách của đơn đó được mời lại vào quán.

Tắt máy đột ngột chỉ có thể mất những gì chưa kịp ghi trong 0,1 giây cuối. Riêng đơn của quà vừa tới trong 0,8 giây cuối có thể không được tạo, còn xu và điểm của quà đó vẫn được lưu.

## Mã nguồn

```
shared/menu.mjs       bảng giá, biểu cảm, 10 cấp VIP (server và màn hình dùng chung)
shared/layout.mjs     mặt bằng quán, ghế, khu, đường đi
server/main.mjs       khởi chạy, chọn connector thật hoặc giả lập
server/core/          Game (điều phối), Players, Seating, Kitchen (dây chuyền đơn), Gifts (chống trùng, gom quà), EventQueue
server/storage/       Storage: tệp text, nhật ký ghi trước, ghi nguyên tử, khóa, sao lưu
server/live/          TikTokAdapter (thư viện tiktok-live-connector), Simulator
server/net/Web.mjs    HTTP và WebSocket
client/js/            shop (quán 3D), crowd (nhân vật), items (món 3D), fx, director (máy quay), labels, ui, sfx, main
test/                 kiểm tra lõi
```

Đơn hàng do server quyết định từng bước: chờ, đang pha, pha xong, đang mang ra, đã phục vụ. Màn hình chỉ diễn lại nên tải lại trang giữa chừng vẫn khớp. Mỗi đơn gắn với TikTokID từ lúc tạo nên món chỉ tới đúng người.

Đổi thư viện TikTok: viết lớp mới giống `server/live/TikTokAdapter.mjs`, có `connect()` và `disconnect()`, phát sự kiện `event` dạng `{ type: 'join' | 'comment' | 'gift' | 'like' | 'share', eventId, id, username, nickname, ... }`. Phần game không cần sửa.

Hiệu năng: mỗi bộ phận cơ thể là một InstancedMesh dùng chung cho 120 nhân vật, đồ tĩnh của quán gộp theo vật liệu, hạt hiệu ứng nằm trong bộ đệm vòng cố định, món ăn lấy từ kho dùng lại. Tối đa 12 khách cùng đi bộ, ai thêm thì hiện thẳng ở ghế. Hiệu ứng có hạn mức mỗi giây.

## Bảo mật và lưu ý

- Server chỉ nghe `127.0.0.1`, kiểm tra `Host` và `Origin`. Chỉ trang điều khiển gửi được lệnh. Thư mục dữ liệu không bao giờ được phục vụ qua web.
- Không dùng tài khoản TikTok, chỉ đọc sự kiện công khai của phòng live.
- Tên và bình luận được cắt độ dài, bỏ ký tự `|` và xuống dòng trước khi ghi tệp, và vẽ bằng canvas hoặc `textContent`. Bình luận có đường dẫn, số điện thoại hoặc từ tục không hiện trên màn hình.
- `tiktok-live-connector` là thư viện cộng đồng, không phải API chính thức, có thể ngừng chạy khi TikTok đổi hệ thống. Kiểm tra điều khoản TikTok trước khi dùng.
- Phông chữ tải từ Google Fonts; máy không có Internet sẽ dùng phông hệ thống. Âm thanh tổng hợp bằng WebAudio, không có nhạc nền và không có giọng đọc.
- Giao diện TikTok trên điện thoại người xem phủ lên phần dưới khung hình (bình luận, nút quà), nên phần menu dưới cùng có thể bị che một phần.
