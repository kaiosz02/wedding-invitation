// CHỈ CẦN SỬA FILE NÀY. Giữ dấu ngoặc, dấu phẩy và dấu nháy.
// Tất cả thông tin dưới đây là nội dung mẫu, chưa phải thông tin cưới thật.
window.WEDDING_CONFIG = {
  isDemo: true, // Đặt false sau khi thay bằng thông tin thật để ẩn nhãn tài khoản mẫu.
  groom: { name: 'Hoàng Long', fullName: 'Đặng Hoàng Long', role: 'Trưởng Nam', father: 'Đặng Văn Thắng', mother: 'Bùi Thị Mai', familyAddress: 'Quận 1, TP. Hồ Chí Minh' },
  bride: { name: 'Bảo Ngọc', fullName: 'Vũ Bảo Ngọc', role: 'Út Nữ', father: 'Vũ Đức Trung', mother: 'Ngô Thị Hạnh', familyAddress: 'Quận 3, TP. Hồ Chí Minh' },
  ceremony: { date: '2026-01-03', time: '09:00', lunarDate: '15 tháng 11 năm Ất Tỵ', venue: 'Tư gia', address: 'Quận 1, TP. Hồ Chí Minh' },
  reception: {
    date: '2026-01-03', time: '18:00', welcomeTime: '17:30', lunarDate: '15 tháng 11 năm Ất Tỵ',
    venue: 'Trung Tâm Hội Nghị White Palace',
    address: '194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh',
    // Để trống: tự tạo liên kết chỉ đường từ địa chỉ trên.
    mapUrl: '',
  },
  photos: {
    cover: 'assets/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp',
    album: [
      'assets/abd329aeb24dfdb5db34be2cd39ccbe4b5b0f943f66a89f8c855b2d615cc4e24.webp',
      'assets/09c78712bd94460430a8a633a8e72a0576016ea56e183d89d97c551649ee9ece.webp',
      'assets/d7695e2fed94d3347e78455624c26164a088b3a365bce422de1ef752fdcab2c1.webp',
      'assets/07db56b959aa4410010132a54bfbedd0518e911389a0c6623b946096377bbb97.webp',
      'assets/a054d52f9d4d1ed606a4226463f555e359dee874ba7138eab94e10a18b39ddda.webp',
      'assets/1cfc881768c6a5c42054d40c4239f4f56b59a159692734f3deb8e79fc55499d2.webp',
      'assets/e13655d0de07f307824d9dd1ad5a399434ebc0c016d86aaa4c1bde7452a4abb1.webp',
    ],
  },
  dressCode: [ { color: '#511419', name: 'Đỏ đô' }, { color: '#8d3c47', name: 'Đỏ hồng' }, { color: '#cba346', name: 'Vàng' }, { color: '#eee5d6', name: 'Kem' } ],
  timeline: [
    { time: '17:30', title: 'Đón khách', icon: 'assets/camera.webp' },
    { time: '18:00', title: 'Khai tiệc', icon: 'assets/cake.webp' },
    { time: '18:30', title: 'Nghi thức cưới', icon: 'assets/cook.webp' },
    { time: '19:00', title: 'Cắt bánh & nâng ly' },
    { time: '20:30', title: 'Kết thúc tiệc' },
  ],
  banks: [
    // Số tài khoản mẫu. Thay qrImage bằng ảnh QR của chính tài khoản sau khi sửa.
    // Để trống qrImage thì không hiển thị QR, tránh dùng QR sai tài khoản.
    { label: 'Chú rể', bank: 'Vietcombank', accountNumber: '1023456789', accountName: 'DANG HOANG LONG', qrImage: '' },
    { label: 'Cô dâu', bank: 'Techcombank', accountNumber: '9988776655', accountName: 'VU BAO NGOC', qrImage: '' },
  ],
  music: { src: '', enabled: false }, // Ví dụ: src: 'media/nhac-cuoi.mp3', enabled: true
  // Nếu có dịch vụ nhận RSVP, điền URL endpoint POST JSON tại đây.
  // Khi để trống, xác nhận và lưu bút chỉ được lưu trên trình duyệt khách đang dùng.
  rsvpEndpoint: '',
  guestbook: [
    { name: 'Duy Khang', message: 'Chúc mừng ngày vui của hai bạn, trăm năm hạnh phúc bền lâu!' },
    { name: 'Lan Chi', message: 'Đẹp đôi quá! Chúc hai bạn bên nhau đầu bạc răng long.' },
    { name: 'Tuấn Anh', message: 'Chúc gia đình nhỏ luôn đầy ắp tiếng cười.' },
  ],
  closing: 'Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!',
};
