import re
from bs4 import BeautifulSoup

with open(r"C:\Users\GACB-\.gemini\antigravity-ide\brain\abe2173b-212f-478d-8169-1fa97707bf2d\.system_generated\steps\245\content.md", "r", encoding="utf-8") as f:
    content = f.read()

# content.md contains metadata at the top. Let's find the first "<!DOCTYPE html>"
idx = content.find("<!DOCTYPE html>")
if idx != -1:
    html_content = content[idx:]
else:
    html_content = content

soup = BeautifulSoup(html_content, 'html.parser')

# Remove header
header = soup.find('header', {'id': 'main-header'})
if header:
    header.decompose()
    
# Remove top header if exists
top_header = soup.find('div', {'id': 'top-header'})
if top_header:
    top_header.decompose()

# Remove footer
footer = soup.find('footer', {'id': 'main-footer'})
if footer:
    footer.decompose()

# The user asked for "without logos". The header is already removed, which usually contains the logo.
# Just to be safe, any image with "logo" in name could be removed, but header is usually enough.

# Write the final HTML to productos.html
with open(r"c:\multidrink\productos.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
