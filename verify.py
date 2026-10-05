import sys, json
from pathlib import Path
sys.path.insert(0, str(Path('.tools').resolve()))
from playwright.sync_api import sync_playwright
out = Path('.impeccable/review'); out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    page = browser.new_page(viewport={'width':390,'height':844}, device_scale_factor=1)
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    from bs4 import BeautifulSoup
    sample = next(Path('ui_mau').glob('*.html'))
    soup = BeautifulSoup(sample.read_text(encoding='utf-8'), 'html.parser')
    root = soup.select_one('[data-showcase-root]')
    for img in root.select('img'):
        img['src'] = 'http://127.0.0.1:8000/assets/' + img['src'].split('/')[-1]
    for tag in root.select('script, iframe'):
        tag.decompose()
    for tag in root.select('[style]'):
        tag['style'] = tag['style'].replace('/images/themes/minimalism-dark-red/paper.webp', 'http://127.0.0.1:8000/assets/paper.webp')
    css = next(Path('ui_mau').rglob('17a*.css'))
    page.set_content('<link rel="stylesheet" href="http://127.0.0.1:8000/' + css.as_posix() + '"><link rel="stylesheet" href="http://127.0.0.1:8000/assets/fonts/fonts.css">' + str(root))
    page.add_style_tag(content='*{animation:none!important}')
    page.locator('[data-showcase-root]').screenshot(path=str(out/'reference.png'))
    errors.clear()
    for width, name in [(390,'mobile'),(1440,'desktop'),(320,'small-mobile')]:
        page.set_viewport_size({'width':width,'height':844 if width<768 else 1000})
        page.goto('http://127.0.0.1:8000/')
        page.evaluate('document.fonts.ready')
        assert page.locator('#opening-screen').is_visible()
        assert page.locator('#opening-screen').evaluate('(e)=>e.scrollWidth <= e.clientWidth'), f'Opening overflow at {width}'
        assert page.locator('#invitation').is_hidden()
        assert page.locator('#invitation').evaluate('(e)=>e.inert')
        page.add_style_tag(content='*{animation:none!important}')
        page.screenshot(path=str(out/f'opening-{name}.png'))
        page.locator('#open-invitation').click()
        page.wait_for_function("document.getElementById('opening-screen').hidden")
        assert not page.locator('#invitation').evaluate('(e)=>e.inert')
        assert page.evaluate("getComputedStyle(document.body).overflow") != 'hidden'
        page.add_style_tag(content='*{animation:none!important;transition:none!important}')
        page.locator('footer').scroll_into_view_if_needed()
        page.evaluate('window.scrollTo(0,0)')
        page.screenshot(path=str(out/f'{name}.png'), full_page=True)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Overflow at {width}'
        assert page.locator('img').evaluate_all('(imgs)=>imgs.filter(i=>!i.complete || i.naturalWidth===0).map(i=>i.src)') == [], 'Image failed'
    page.set_viewport_size({'width':390,'height':844})
    config = page.evaluate('window.WEDDING_CONFIG')
    photo_count = len(config['photos']['album'])
    page.locator('#album-next').click(); assert page.locator('#album-count').inner_text() == f'2 / {photo_count}'
    page.locator('.album-photo').nth(1).click(); assert page.locator('#lightbox').evaluate('(d)=>d.open')
    page.keyboard.press('ArrowRight'); assert page.locator('#lightbox-count').inner_text() == f'3 / {photo_count}'
    page.keyboard.press('Escape'); assert not page.locator('#lightbox').evaluate('(d)=>d.open')
    page.locator('#open-rsvp').click(); page.locator('#guest-name').fill('Khach thu nghiem'); page.locator('.rsvp-choice').first.click(); page.locator('#rsvp-submit').click()
    assert 'trình duyệt' in page.locator('#rsvp-status').inner_text()
    page.locator('.rsvp-choice').nth(1).click(); assert page.locator('input[name=attendance][value=no]').is_checked(); page.locator('#close-rsvp').click()
    page.locator('#wish-name').fill('Khach thu nghiem'); page.locator('#wish-message').fill('Chuc mung ngay vui!'); page.locator('#wish-form button').click()
    assert 'Chuc mung ngay vui!' in page.locator('#wishes').inner_text()
    page.reload(); assert 'Chuc mung ngay vui!' in page.locator('#wishes').inner_text()
    assert page.locator('#opening-screen').is_visible()
    page.emulate_media(reduced_motion='reduce')
    page.locator('#open-invitation').focus(); page.keyboard.press('Enter')
    page.wait_for_function("document.getElementById('opening-screen').hidden")
    page.add_style_tag(content='*{animation:none!important;transition:none!important}')
    page.locator('#open-gift').click(); assert page.locator('#bank-details').is_visible()
    with page.expect_download() as info: page.locator('#add-calendar').click()
    path = info.value.path(); text = Path(path).read_text(encoding='utf-8')
    from datetime import datetime, timezone
    start = datetime.fromisoformat(config['reception']['date'] + 'T' + config['reception']['time'] + ':00+07:00')
    assert 'DTSTART:' + start.astimezone(timezone.utc).strftime('%Y%m%dT%H%M%SZ') in text
    page.goto(Path('index.html').resolve().as_uri())
    assert page.locator('#invitation').is_hidden()
    page.locator('#open-invitation').focus(); page.keyboard.press('Enter')
    page.wait_for_function("document.getElementById('opening-screen').hidden")
    assert config['groom']['name'] in page.locator('h1').inner_text()
    assert config['bride']['name'] in page.locator('h1').inner_text()
    assert errors == [], errors
    print(json.dumps({'viewports':[320,390,1440], 'overflow':False,'brokenImages':False,'errors':errors,'album':'pass','lightbox':'pass','rsvp':'pass','guestbook':'pass','gift':'pass','calendar':'pass','fileProtocol':'pass'}, ensure_ascii=False))
    browser.close()
