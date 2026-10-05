from pathlib import Path
import urllib.request, re
fonts = Path('assets/fonts')
fonts.mkdir(parents=True, exist_ok=True)
url = 'https://fonts.googleapis.com/css2?family=Viaoda+Libre&family=The+Nautigal:wght@400;700&family=Cormorant+Garamond:wght@400;600&display=swap'
css = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30).read().decode()
for i, url in enumerate(dict.fromkeys(re.findall(r'url\((https:[^)]+)\)', css))):
    name = f'font-{i}.woff2' if '.woff2' in url else f'font-{i}.ttf'
    (fonts / name).write_bytes(urllib.request.urlopen(url, timeout=30).read())
    css = css.replace(url, name)
(fonts / 'fonts.css').write_text(css, encoding='utf-8')
print('Saved local fonts.')
