import re
from bs4 import BeautifulSoup

with open(r"c:\multidrink\productos.html", "r", encoding="utf-8") as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')
text = soup.get_text(separator='\n')
text = re.sub(r'\n\s*\n', '\n', text)

with open(r"c:\multidrink\scratch\page_text2.txt", "w", encoding="utf-8") as f:
    f.write(text)
