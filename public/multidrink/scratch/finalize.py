import re
import urllib.request
import os
from bs4 import BeautifulSoup

# 1. Update style.css
css_path = r"c:\multidrink\style.css"
with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Change flex-start to center
css = re.sub(r'(\.hero-buttons\s*\{[^}]*justify-content:\s*)flex-start(;[^}]*\})', r'\1center\2', css)

# Add btn-gold-hero if not exists
if '.btn-gold-hero' not in css:
    css += """
/* Botón Hero Dorado */
.btn-gold-hero {
    background-color: var(--color-gold) !important;
    color: #000 !important;
    border: 2px solid var(--color-gold) !important;
}
.btn-gold-hero:hover {
    background-color: transparent !important;
    color: var(--color-gold) !important;
}
"""
with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)


# 2. Update index.html
idx_path = r"c:\multidrink\index.html"
with open(idx_path, "r", encoding="utf-8") as f:
    idx_content = f.read()

idx_content = idx_content.replace('class="btn-unete"', 'class="btn-unete btn-gold-hero"')
with open(idx_path, "w", encoding="utf-8") as f:
    f.write(idx_content)


# 3. Update productos.html
prod_path = r"c:\multidrink\productos.html"
with open(prod_path, "r", encoding="utf-8") as f:
    prod_content = f.read()

soup = BeautifulSoup(prod_content, 'html.parser')

# Add smooth scroll
head = soup.find('head')
if head and not head.find('style', string=re.compile(r'scroll-behavior')):
    smooth_style = soup.new_tag('style')
    smooth_style.string = "html { scroll-behavior: smooth !important; }"
    head.append(smooth_style)

# Remove external scripts
for script in soup.find_all('script'):
    src = script.get('src')
    if src and ('multyhealth.com' in src or 'googletagmanager' in src or 'cloudflare' in src or 'google' in src):
        script.decompose()

# Download and replace image
img_url = 'https://multyhealth.com/wp-content/uploads/2025/10/botella-e-ingredientes1.png'
local_img = 'botella-e-ingredientes1.png'
local_img_path = os.path.join(r"c:\multidrink", local_img)

if not os.path.exists(local_img_path):
    try:
        urllib.request.urlretrieve(img_url, local_img_path)
    except Exception as e:
        print(f"Failed to download image: {e}")

for img in soup.find_all('img'):
    src = img.get('src')
    if src and 'botella-e-ingredientes1.png' in src:
        img['src'] = local_img
        if img.has_attr('srcset'):
            del img['srcset'] # Remove srcset to avoid loading remote smaller versions

# Remove dns-prefetch and pingback
for link in soup.find_all('link'):
    rel = link.get('rel', [])
    if 'dns-prefetch' in rel or 'pingback' in rel:
        link.decompose()

with open(prod_path, "w", encoding="utf-8") as f:
    f.write(str(soup))
