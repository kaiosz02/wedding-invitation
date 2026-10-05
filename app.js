(() => {
  'use strict';
  const c = window.WEDDING_CONFIG;
  const $ = id => document.getElementById(id);
  if (!c) return;
  if (!c.isDemo) $('bank-details').querySelector('.quiet').hidden = true;
  document.title = `Thiệp cưới · ${c.groom.name} & ${c.bride.name}`;
  document.querySelectorAll('[data-text]').forEach(el => {
    el.textContent = el.dataset.text.split('.').reduce((v, k) => v?.[k], c) ?? '';
  });
  const element = (tag, text, className) => { const e = document.createElement(tag); if (text != null) e.textContent = text; if (className) e.className = className; return e; };
  const dateParts = event => {
    const [year, month, day] = event.date.split('-').map(Number);
    const date = new Date(year, month - 1, day, 12);
    return { year, month, day, date, weekday: new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(date) };
  };
  for (const key of ['ceremony', 'reception']) {
    const event = c[key], d = dateParts(event), target = $(`${key}-date`);
    const time = element('div', null, 'time-row');
    time.append(element('span', ` ${key === 'ceremony' ? 'Vào lúc ' : ''}${event.time}`), element('span', d.weekday));
    const row = element('div', null, 'date-row'), month = element('div', null, 'date-month');
    month.append(element('div', `Tháng ${String(d.month).padStart(2, '0')}`), element('div', d.year));
    row.append(element('span', String(d.day).padStart(2, '0'), 'date-day'), month); target.append(time, row);
    $(`${key}-lunar`).textContent = event.lunarDate ? `(Tức ngày ${event.lunarDate})` : '';
  }
  $('cover').src = c.photos.cover;
  const d = dateParts(c.reception);
  $('footer-date').textContent = `${String(d.day).padStart(2, '0')} . ${String(d.month).padStart(2, '0')} . ${d.year}`;
  $('opening-date').textContent = `${d.day} tháng ${d.month}, ${d.year}`;
  const heartPositions = [[31,4],[26,19],[19,27],[10,35],[35,37],[83,30],[92,42],[70,54],[18,65],[71,71],[27,89],[59,13],[43,76],[6,77],[87,85],[55,58]];
  heartPositions.forEach(([x, y], i) => {
    const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heart.setAttribute('viewBox', '0 0 24 24');
    heart.style.cssText = `left:${x}%;top:${y}%;width:${9 + i % 3 * 3}px;--heart-delay:${-i * 1.3}s;--heart-duration:${12 + i % 5}s;--heart-color:${['#b84a50', '#e7d9c8', '#c5a052'][i % 3]}`;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 21S2 14.7 2 7.8C2 1.8 9.2 1 12 5.5 14.8 1 22 1.8 22 7.8 22 14.7 12 21 12 21Z');
    heart.append(path); $('opening-hearts').append(heart);
  });
  const cal = $('calendar'), grid = element('div', null, 'calendar-grid');
  cal.append(element('h3', `Tháng ${d.month} / ${d.year}`), grid);
  ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].forEach(day => grid.append(element('span', day, 'weekday')));
  const offset = (new Date(d.year, d.month - 1, 1).getDay() + 6) % 7;
  for (let i = 0; i < offset; i++) grid.append(element('span', ''));
  for (let i = 1; i <= new Date(d.year, d.month, 0).getDate(); i++) {
    const cell = element('span', i, i === d.day ? 'selected' : '');
    if (i === d.day) cell.setAttribute('aria-label', `Ngày cưới: ${i} tháng ${d.month}`);
    grid.append(cell);
  }
  $('directions').href = c.reception.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.reception.venue + ', ' + c.reception.address)}`;
  c.dressCode.forEach(item => { const wrap = element('div'), swatch = element('span', null, 'swatch'); swatch.style.backgroundColor = item.color; wrap.append(swatch, element('span', item.name)); $('dress-code').append(wrap); });
  c.timeline.forEach(item => { const li = element('li'); li.append(element('time', item.time), element('span', item.title)); if (item.icon) { const img = element('img'); img.src = item.icon; img.alt = ''; img.loading = 'lazy'; li.append(img); } $('timeline').append(li); });

  let index = 0;
  const photos = c.photos.album, cards = [];
  photos.forEach((src, i) => {
    const button = element('button', null, 'album-photo'), img = element('img');
    button.type = 'button'; button.setAttribute('aria-label', `Mở ảnh cưới ${i + 1}`);
    img.src = src; img.alt = `Ảnh cưới ${i + 1} của ${c.groom.name} và ${c.bride.name}`; img.loading = 'lazy';
    button.append(img); $('album-stage').append(button); cards.push(button);
    button.addEventListener('click', () => { if (i !== index) { index = i; renderAlbum(); } else { renderLightbox(); $('lightbox').showModal(); } });
  });
  function renderAlbum() {
    const n = photos.length;
    cards.forEach((card, i) => {
      let diff = (i - index + n) % n; if (diff > n / 2) diff -= n;
      card.style.transform = `translateX(calc(-50% + ${diff * 60}%)) translateZ(${-Math.abs(diff) * 150}px) rotateY(${diff * 45}deg) scale(${Math.abs(diff) ? Math.max(.7, 1 - Math.abs(diff) * .15) : 1})`;
      card.style.opacity = Math.abs(diff) > 2 ? '0' : String(1 - Math.abs(diff) * .25);
      card.style.zIndex = String(100 - Math.abs(diff)); card.tabIndex = diff === 0 ? 0 : -1;
      card.style.pointerEvents = Math.abs(diff) > 1 ? 'none' : 'auto';
    });
    $('album-count').textContent = `${n ? index + 1 : 0} / ${n}`;
    $('album-prev').disabled = $('album-next').disabled = n < 2;
    renderLightbox();
  }
  function renderLightbox() { if (photos.length) $('lightbox-photo').src = photos[index]; $('lightbox-count').textContent = `${index + 1} / ${photos.length}`; }
  function step(delta) { if (!photos.length) return; index = (index + delta + photos.length) % photos.length; renderAlbum(); }
  $('album-prev').onclick = $('lightbox-prev').onclick = () => step(-1);
  $('album-next').onclick = $('lightbox-next').onclick = () => step(1);
  $('close-lightbox').onclick = () => $('lightbox').close();
  $('lightbox').addEventListener('keydown', e => { if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); });
  $('lightbox').addEventListener('click', e => { if (e.target === $('lightbox')) $('lightbox').close(); });
  let touchStart;
  $('album-stage').addEventListener('touchstart', e => { touchStart = e.changedTouches[0].clientX; }, { passive: true });
  $('album-stage').addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - touchStart; if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1); }, { passive: true });
  renderAlbum();

  const namespace = `wedding:${c.groom.fullName}:${c.bride.fullName}:${c.reception.date}`;
  function read(key) { try { return JSON.parse(localStorage.getItem(`${namespace}:${key}`)) || []; } catch { return []; } }
  function save(key, value) { localStorage.setItem(`${namespace}:${key}`, JSON.stringify(value)); }
  $('rsvp-note').textContent = c.rsvpEndpoint ? 'Xác nhận sẽ được gửi đến cô dâu và chú rể.' : 'Bản xem thử: xác nhận chỉ lưu trên trình duyệt này, chưa gửi đến cô dâu chú rể.';
  $('attendance').onchange = () => { const absent = $('attendance').value === 'no'; $('guest-count').disabled = absent; $('guest-count').required = !absent; };
  $('rsvp-form').onsubmit = async e => {
    e.preventDefault(); const btn = e.target.querySelector('button'), name = $('guest-name').value.trim();
    if (!name) { $('rsvp-status').textContent = 'Vui lòng nhập tên của bạn.'; return; }
    const record = { name, attendance: $('attendance').value, count: $('attendance').value === 'no' ? 0 : Number($('guest-count').value), createdAt: new Date().toISOString() };
    btn.disabled = true; $('rsvp-status').textContent = 'Đang lưu xác nhận…';
    try {
      if (c.rsvpEndpoint) { const res = await fetch(c.rsvpEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }); if (!res.ok) throw new Error('network'); }
      else save('rsvp', [...read('rsvp'), record]);
      $('rsvp-status').textContent = c.rsvpEndpoint ? 'Cảm ơn bạn! Xác nhận đã được gửi.' : 'Đã lưu xác nhận trên trình duyệt này. Cảm ơn bạn!';
    } catch { $('rsvp-status').textContent = 'Chưa lưu được xác nhận. Vui lòng thử lại hoặc liên hệ trực tiếp cô dâu chú rể.'; }
    finally { btn.disabled = false; }
  };
  function renderWishes() {
    $('wishes').replaceChildren(); [...read('wishes').reverse(), ...c.guestbook].slice(0, 50).forEach(w => { const item = element('article', null, 'wish'); item.append(element('strong', w.name), element('p', w.message)); $('wishes').append(item); });
  }
  $('wish-form').onsubmit = e => {
    e.preventDefault(); const name = $('wish-name').value.trim(), message = $('wish-message').value.trim();
    if (!name || !message) { $('wish-status').textContent = 'Vui lòng nhập tên và lời chúc.'; return; }
    try { save('wishes', [...read('wishes'), { name, message }]); renderWishes(); $('wish-message').value = ''; $('wish-status').textContent = 'Cảm ơn lời chúc của bạn! Đã lưu trên trình duyệt này.'; }
    catch { $('wish-status').textContent = 'Trình duyệt chưa cho phép lưu. Vui lòng thử lại.'; }
  };
  renderWishes();
  c.banks.forEach(bank => {
    const item = element('article', null, 'bank'); item.append(element('h3', bank.label), element('p', bank.bank), element('strong', bank.accountNumber, 'account-number'), element('p', bank.accountName));
    if (bank.qrImage) { const img = element('img'); img.src = bank.qrImage; img.alt = `Mã QR tài khoản ${bank.label}`; const link = element('a', 'Lưu ảnh QR'); link.href = bank.qrImage; link.download = `QR-${bank.label}.png`; item.append(img, link); }
    const copy = element('button', 'Sao chép số tài khoản', 'button'); copy.type = 'button';
    copy.onclick = async () => { try { await navigator.clipboard.writeText(bank.accountNumber); copy.textContent = 'Đã sao chép'; } catch { const input = element('input'); input.value = bank.accountNumber; item.append(input); input.select(); copy.textContent = 'Chọn số và sao chép'; } };
    item.append(copy); $('banks').append(item);
  });
  $('open-gift').onclick = () => { const open = $('bank-details').hidden; $('bank-details').hidden = !open; $('open-gift').setAttribute('aria-expanded', String(open)); $('open-gift').querySelector('span').textContent = open ? 'Nhấn để thu gọn' : 'Nhấn để mở'; };
  const icsEscape = s => String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  $('add-calendar').onclick = () => {
    const start = new Date(`${c.reception.date}T${c.reception.time}:00+07:00`), end = new Date(start.getTime() + 3 * 3600000);
    const stamp = dt => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const content = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Thiep Cuoi//VI', 'BEGIN:VEVENT', `UID:${c.reception.date}-${encodeURIComponent(c.groom.name)}@thiep-cuoi.local`, `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${icsEscape(`Lễ cưới ${c.groom.name} & ${c.bride.name}`)}`, `LOCATION:${icsEscape(c.reception.venue + ', ' + c.reception.address)}`, 'END:VEVENT', 'END:VCALENDAR', ''].join('\r\n');
    const url = URL.createObjectURL(new Blob([content], { type: 'text/calendar;charset=utf-8' })), link = element('a'); link.href = url; link.download = 'lich-tiec-cuoi.ics'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  if (c.music.enabled && c.music.src) { const audio = new Audio(c.music.src); audio.loop = true; $('music').hidden = false; $('music').onclick = async () => { if (!audio.paused) { audio.pause(); $('music').setAttribute('aria-label', 'Bật nhạc'); } else { try { await audio.play(); $('music').setAttribute('aria-label', 'Tắt nhạc'); } catch { $('music').setAttribute('aria-label', 'Không mở được nhạc, nhấn để thử lại'); } } }; }
  const opening = $('opening-screen'), openButton = $('open-invitation');
  const openingCard = opening.querySelector('.opening-content');
  openingCard.addEventListener('click', async () => {
    if (openButton.disabled) return;
    openButton.disabled = true;
    openButton.setAttribute('aria-expanded', 'true');
    window.scrollTo(0, 0);
    // Nhấn mở thiệp là thao tác của khách, cho phép phát nhạc đã cấu hình.
    if (c.music.enabled && c.music.src) $('music').click();
    let finished = false;
    function finishOpening() {
      if (finished) return;
      finished = true;
      opening.hidden = true;
      $('invitation').hidden = false;
      $('invitation').inert = false;
      document.body.classList.remove('awaiting-open');
      $('invitation').focus({ preventScroll: true });
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishOpening();
      return;
    }
    const animations = [], particles = document.createElement('div');
    particles.className = 'opening-burst'; particles.setAttribute('aria-hidden', 'true');
    const settled = animation => animation.finished.catch(() => {});
    try {
      const rect = openingCard.getBoundingClientRect();
      opening.append(particles);
      opening.classList.add('is-opening');
      const flight = openingCard.animate([
        { transform: 'translateY(0) rotate(0deg) scale(1)', opacity: 1 },
        { transform: 'translateY(-22px) rotate(-2deg) scale(1.025)', opacity: 1, offset: .22 },
        { transform: `translateY(-${rect.bottom + 100}px) rotate(-9deg) scale(.82)`, opacity: 0 },
      ], { duration: 850, easing: 'cubic-bezier(.55,.06,.68,.19)', fill: 'forwards' });
      animations.push(flight);
      const count = window.innerWidth < 600 ? 36 : 48;
      for (let i = 0; i < count; i++) {
        const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        heart.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M12 21S2 14.7 2 7.8C2 1.8 9.2 1 12 5.5 14.8 1 22 1.8 22 7.8 22 14.7 12 21 12 21Z');
        heart.append(path);
        const size = 7 + Math.random() * 12;
        heart.style.cssText = `left:${rect.left + rect.width / 2}px;top:${rect.top + rect.height * .35}px;width:${size}px;fill:${['#fff0de','#e8b8b9','#cba55c','#d76c80'][i % 4]}`;
        particles.append(heart);
        const angle = (i / count) * Math.PI * 2;
        const distance = 85 + Math.random() * Math.min(window.innerWidth * .45, 330);
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance - 110;
        const turn = Math.random() * 160 - 80;
        animations.push(heart.animate([
          { transform: 'translate(-50%,-50%) scale(.2)', opacity: 0 },
          { transform: `translate(calc(-50% + ${x * .55}px),calc(-50% + ${y * .55}px)) rotate(${turn * .5}deg) scale(1)`, opacity: 1, offset: .23 },
          { transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y - 50}px)) rotate(${turn}deg) scale(.9)`, opacity: .85, offset: .66 },
          { transform: `translate(calc(-50% + ${x * 1.1}px),calc(-50% + ${y - 130}px)) rotate(${turn * 1.3}deg) scale(.5)`, opacity: 0 },
        ], { duration: 1350 + Math.random() * 350, delay: 90 + Math.random() * 130, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' }));
      }
      await settled(flight);
      await new Promise(resolve => setTimeout(resolve, 200));
      $('invitation').hidden = false;
      const reveal = $('invitation').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1100, easing: 'ease-out', fill: 'both' });
      const fade = opening.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1100, easing: 'ease-in-out', fill: 'forwards' });
      animations.push(reveal, fade);
      await Promise.all([settled(reveal), settled(fade)]);
    } catch {
      // Nếu trình duyệt không hỗ trợ animation, khách vẫn mở được nội dung.
    } finally {
      finishOpening();
      particles.remove();
      animations.forEach(animation => animation.cancel());
      opening.classList.remove('is-opening');
    }
  });
})();
