# Thiệp cưới đỏ đô

Mở **index.html** bằng Chrome hoặc Edge để xem ngay, không cần cài đặt hay build. Ảnh, trang trí và font đã lưu trong `assets`, nên giao diện chạy khi không có mạng. Nút chỉ đường cần Internet.

Khi vào hoặc tải lại trang, thiệp kem với hoa hai bên xuất hiện trên nền đỏ đậm có tim bay. Nhấn **Mở thiệp** để mở nội dung; có thể dùng phím Tab và Enter. Nếu đã cấu hình nhạc, nhạc bắt đầu khi khách mở thiệp. Chế độ giảm chuyển động của thiết bị sẽ bỏ qua hiệu ứng mở.

Có thể nhấn trực tiếp vào thiệp: thiệp bay lên và các trái tim nhỏ bắn ra, sau đó trang chính hiện dần. Toàn bộ chuyển cảnh kéo dài khoảng 2,15 giây.

Trước khi mở, thiệp xuất hiện mềm mại rồi nổi nhẹ; hoa hai bên đung đưa, trái tim nhịp nhẹ và nút mở có vệt sáng định kỳ. Chuyển động tạm dừng khi chuyển tab và được tắt nếu thiết bị bật giảm chuyển động.

Sau khi mở, các phần thông tin, album, địa điểm, lịch trình, sổ lưu bút và lời cảm ơn hiện dần khi cuộn tới. Mỗi phần chạy một lần trong 1000–1150ms với độ dịch chuyển 14–20px; khi dùng bàn phím để vào phần đó, nội dung hiển thị ngay. Chế độ giảm chuyển động bỏ qua hiệu ứng này. Nội dung không bị ẩn bằng CSS nếu hiệu ứng không chạy.

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
- `closing`: lời cảm ơn. Danh sách lời chúc chỉ đọc từ Google Sheets.

Thông tin chính đã cập nhật từ **thong_tin_dam_cuoi.md**: Nguyễn Quyết và Huyền Trang, 08:00 Chủ nhật 11/10/2026 (02/9 năm Bính Ngọ), tại gia đình nhà trai ở Thôn Tân Phát (cũ), Nga An, Thanh Hóa. Hai gia đình cũng đã cập nhật. Ảnh bìa dùng `media/anh/anh8.jpg`; album có 9 ảnh trong `media/anh`. Giờ dùng múi giờ Việt Nam (UTC+7).

Vai vế, giờ đón khách riêng và tài khoản ngân hàng chưa được cung cấp nên để trống; lịch trình hiện chỉ có mốc 08:00 đã xác nhận. Dress code và lời chúc ban đầu vẫn là nội dung mẫu, có thể sửa trong cấu hình. Liên kết chỉ đường tìm theo địa chỉ; chưa có tọa độ hoặc liên kết ghim chính xác.

## Xác nhận và lưu bút

Sổ lưu bút đã cấu hình `guestbookEndpoint` để gửi lời chúc tới Google Apps Script. Script nhận biểu mẫu POST gồm `name` và `message`, ghi vào tab `LoiChuc` của Google Sheets. Triển khai dưới dạng Web app, thực thi với tư cách chủ file và cho phép Anyone truy cập. ID bắt đầu bằng `AKfy...` là ID triển khai; `SHEET_ID` trong Apps Script phải là ID bảng tính lấy từ link Google Sheets, không phải ID triển khai.

Trang gửi bằng `no-cors` để tương thích Apps Script từ website tĩnh. Trình duyệt không đọc được phản hồi, vì vậy trạng thái “Đã gửi yêu cầu lưu lời chúc” chưa xác nhận ghi Sheet thành công. Kiểm tra bằng cách gửi một lời chúc thử rồi mở tab `LoiChuc`; nếu không có dòng mới, xem Executions trong Apps Script và kiểm tra `SHEET_ID`, quyền truy cập, phiên bản triển khai. Không cần triển khai lại Apps Script nếu đang dùng đúng mã nhận `e.parameter.name` và `e.parameter.message` đã hướng dẫn.

Danh sách chỉ đọc tối đa 50 lời chúc mới nhất từ tab `LoiChuc` qua GET JSONP; không đọc/ghi lời chúc trong localStorage và không hiển thị lời chúc mẫu. Sau khi gửi, trang tải lại danh sách từ Sheet. Dữ liệu cục bộ cũ bị bỏ qua. Nếu tải thất bại, trang hiện thông báo và nút tải lại; Sheet chưa có lời chúc thì hiện lời mời gửi đầu tiên.

Để bật đọc danh sách: sao chép toàn bộ `google-apps-script.gs` vào Code.gs trong Apps Script, giữ giá trị `SHEET_ID` thật đang dùng. Chọn Deploy → Manage deployments → Edit → Version: New version → Deploy để giữ nguyên URL `/exec`. Script cũ chỉ có doGet trả văn bản sẽ chưa đọc được lời chúc. Endpoint đọc công khai tên, nội dung và thời gian lời chúc để khách mời cùng xem. Không công khai các tab khác.

Xác nhận tham dự đã dùng cùng URL Apps Script với `rsvpFormat: 'apps-script'`. Trang gửi biểu mẫu có `action=rsvp`, `name`, `attendance` (`yes`/`no`) và `count`; script ghi tab riêng `XacNhanThamDu` gồm thời gian, tên khách, tham dự Có/Không và số người 1/0 theo lựa chọn. Mỗi lần gửi là một dòng mới. Danh sách xác nhận không được trả công khai qua doGet. Cần cập nhật toàn bộ Code.gs từ `google-apps-script.gs` và triển khai phiên bản mới để bật chức năng này. Trạng thái gửi chưa xác nhận ghi Sheet thành công vì dùng no-cors; kiểm tra tab XacNhanThamDu sau lần gửi thử. Đặt `rsvpEndpoint: ''` để chỉ lưu xác nhận cục bộ; endpoint JSON thông thường dùng `rsvpFormat: 'json'` và phải cho phép CORS.

## Cấu trúc

`index.html` là trang chính; `style.css` là giao diện; `app.js` xử lý tương tác; `config.js` chứa nội dung; `assets` chứa tài nguyên. Giữ các tệp này cùng nhau khi chép trang sang máy khác. `ui_mau` giữ nguyên mẫu tham khảo.

Ảnh kiểm tra các kích thước màn hình nằm trong `.impeccable/review`. Công cụ kiểm tra phát triển `verify.py` dùng Playwright trong `.tools`, không cần cho trang hoạt động.
