# Thiệp cưới đỏ đô

Mở **index.html** bằng Chrome hoặc Edge để xem ngay, không cần cài đặt hay build. Ảnh, trang trí và font đã lưu trong `assets`, nên giao diện chạy khi không có mạng. Nút chỉ đường cần Internet.

Khi vào hoặc tải lại trang, thiệp kem với hoa hai bên xuất hiện trên nền đỏ đậm có tim bay. Nhấn **Mở thiệp** để mở nội dung; có thể dùng phím Tab và Enter. Nếu đã cấu hình nhạc, nhạc bắt đầu khi khách mở thiệp. Chế độ giảm chuyển động của thiết bị sẽ bỏ qua hiệu ứng mở.

Có thể nhấn trực tiếp vào thiệp: thiệp bay lên và các trái tim nhỏ bắn ra, sau đó trang chính hiện dần. Toàn bộ chuyển cảnh kéo dài khoảng 2,15 giây.

Trước khi mở, thiệp xuất hiện mềm mại rồi nổi nhẹ; hoa hai bên đung đưa, trái tim nhịp nhẹ và nút mở có vệt sáng định kỳ. Chuyển động tạm dừng khi chuyển tab và được tắt nếu thiết bị bật giảm chuyển động.

Có thể xem qua máy chủ tại **http://127.0.0.1:8000/**. Nếu máy chủ chưa chạy, mở PowerShell trong thư mục này và chạy:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

## Chỉnh thông tin

Sửa **config.js**, lưu file rồi tải lại trang:

Sau khi điền thông tin thật, đặt `isDemo: false` để ẩn nhãn tài khoản mẫu.

- `groom`, `bride`: tên, vai vế, cha mẹ và địa chỉ gia đình.
- `ceremony`, `reception`: ngày dạng `YYYY-MM-DD`, giờ dạng `HH:MM`, ngày âm lịch, địa điểm và địa chỉ. Ngày âm lịch nhập riêng; thứ và lịch tháng tự tính từ ngày dương lịch.
- `photos`: ảnh bìa và danh sách album. Chép ảnh mới vào `media`, thay đường dẫn thành `media/ten-anh.jpg`.
- `timeline`, `dressCode`: lịch trình và màu trang phục.
- `banks`: ngân hàng, số tài khoản, tên chủ tài khoản và `qrImage`. Chép QR thật vào `media` rồi điền đường dẫn. QR được để trống mặc định vì mẫu gốc có QR của tên khác.
- `music`: điền tệp nhạc trong `media`, đặt `enabled: true`. Nhạc chỉ phát khi khách nhấn nút.
- Đã bật nhạc nền từ mẫu bằng `media/nhac-cuoi.mp3`. Khi khách mở thiệp, nhạc bắt đầu; biểu tượng đĩa nhạc ở góc dưới phải dùng để tắt hoặc bật lại. Có thể đổi bài bằng `music.src`, hoặc tắt tính năng bằng `music.enabled: false`.
- `closing`, `guestbook`: lời cảm ơn và lời chúc mẫu.

Thông tin chính đã cập nhật từ **thong_tin_dam_cuoi.md**: Nguyễn Quyết và Huyền Trang, 08:00 Chủ nhật 11/10/2026 (02/9 năm Bính Ngọ), tại gia đình nhà trai ở Thôn Tân Phát (cũ), Nga An, Thanh Hóa. Hai gia đình cũng đã cập nhật. Ảnh bìa dùng `media/anh/anh8.jpg`; album có 9 ảnh trong `media/anh`. Giờ dùng múi giờ Việt Nam (UTC+7).

Vai vế, giờ đón khách riêng và tài khoản ngân hàng chưa được cung cấp nên để trống; lịch trình hiện chỉ có mốc 08:00 đã xác nhận. Dress code và lời chúc ban đầu vẫn là nội dung mẫu, có thể sửa trong cấu hình. Liên kết chỉ đường tìm theo địa chỉ; chưa có tọa độ hoặc liên kết ghim chính xác.

## Xác nhận và lưu bút

Trang tĩnh không có máy chủ thu thập dữ liệu. Mặc định, xác nhận và lời chúc chỉ lưu trong trình duyệt khách đang dùng, không gửi đến chủ thiệp hoặc đồng bộ giữa các máy. Giao diện ghi rõ điều này.

Nếu có dịch vụ nhận xác nhận, đặt `rsvpEndpoint` thành URL endpoint chấp nhận POST JSON gồm `name`, `attendance` (`yes`/`no`), `count`, `createdAt`. Dịch vụ cần cho phép CORS từ trang thiệp. Lưu bút vẫn lưu cục bộ.

## Cấu trúc

`index.html` là trang chính; `style.css` là giao diện; `app.js` xử lý tương tác; `config.js` chứa nội dung; `assets` chứa tài nguyên. Giữ các tệp này cùng nhau khi chép trang sang máy khác. `ui_mau` giữ nguyên mẫu tham khảo.

Ảnh kiểm tra các kích thước màn hình nằm trong `.impeccable/review`. Công cụ kiểm tra phát triển `verify.py` dùng Playwright trong `.tools`, không cần cho trang hoạt động.
