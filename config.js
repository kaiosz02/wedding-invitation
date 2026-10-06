// CHỈ CẦN SỬA FILE NÀY. Giữ dấu ngoặc, dấu phẩy và dấu nháy.
// Thông tin cưới lấy từ thong_tin_dam_cuoi.md và ảnh trong media/anh.
// Vai vế, giờ đón khách riêng và tài khoản ngân hàng chưa được cung cấp.
window.WEDDING_CONFIG = {
  isDemo: false,
  groom: { name: 'Nguyễn Quyết', fullName: 'Nguyễn Quyết', role: '', father: 'Nguyễn Văn Đức', mother: 'Trần Thị Ngát', familyAddress: 'Thôn Tân Phát (cũ), Nga An, Thanh Hóa' },
  bride: { name: 'Huyền Trang', fullName: 'Huyền Trang', role: '', father: 'Trần Văn Hoàn', mother: 'Trần Thị Duyên', familyAddress: 'Thôn Tân Phát (cũ), Nga An, Thanh Hóa' },
  ceremony: { date: '2026-10-11', time: '08:00', lunarDate: '02 tháng 9 năm Bính Ngọ', venue: 'Gia đình nhà trai', address: 'Thôn Tân Phát (cũ), Nga An, Thanh Hóa' },
  reception: {
    date: '2026-10-11', time: '08:00', welcomeTime: '', lunarDate: '02 tháng 9 năm Bính Ngọ',
    venue: 'Gia đình nhà trai',
    address: 'Thôn Tân Phát (cũ), Nga An, Thanh Hóa',
    // Để trống: tự tạo liên kết chỉ đường từ địa chỉ trên.
    mapUrl: 'https://maps.app.goo.gl/Eh5hJvKDQdy52J3v5?g_st=ic',
    mapEmbedUrl: 'https://www.google.com/maps?q=23G6%2B9HV%20Nh%C3%A0%20v%C4%83n%20h%C3%B3a%20T%C3%A2n%20Ph%C3%A1t%2C%20Nga%20An%2C%20Thanh%20H%C3%B3a&ftid=0x313669d5773dd8f3%3A0xceaa671791a016e0&z=17&output=embed',
  },
  photos: {
    cover: 'media/anh/anh8.jpg',
    album: [
      'media/anh/anh1.jpg',
      'media/anh/anh2.jpg',
      'media/anh/anh3.jpg',
      'media/anh/anh4.jpg',
      'media/anh/anh5.jpg',
      'media/anh/anh6.jpg',
      'media/anh/anh7.jpg',
      'media/anh/anh8.jpg',
      'media/anh/anh9.jpg',
    ],
  },
  dressCode: [ { color: '#511419', name: 'Đỏ đô' }, { color: '#8d3c47', name: 'Đỏ hồng' }, { color: '#cba346', name: 'Vàng' }, { color: '#eee5d6', name: 'Kem' } ],
  timeline: [
    { time: '08:00', title: 'Dùng bữa cơm thân mật', icon: 'assets/cook.webp' },
    { time: '13:30', title: 'Rước dâu' },
  ],
  music: { src: 'media/nhac-cuoi.mp3', enabled: true }, // Nhạc nền từ ui_mau; thay đường dẫn nếu muốn đổi bài.
  // URL Apps Script nhận xác nhận tham dự vào tab XacNhanThamDu.
  // Khi để trống, xác nhận chỉ được lưu trên trình duyệt khách đang dùng.
  rsvpEndpoint: 'https://script.google.com/macros/s/AKfycbzFHIEGiQegEYZtOopf8r9nXrzZ9Rsvw4ZRW46v6D4FVS3_kRER20yL78i4vcVSb5J33w/exec',
  rsvpFormat: 'apps-script',
  // URL Apps Script nhận lời chúc (POST biểu mẫu gồm name và message).
  // URL này cũng cung cấp danh sách lời chúc từ Sheet qua GET JSONP.
  guestbookEndpoint: 'https://script.google.com/macros/s/AKfycbzFHIEGiQegEYZtOopf8r9nXrzZ9Rsvw4ZRW46v6D4FVS3_kRER20yL78i4vcVSb5J33w/exec',
  closing: 'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
};
