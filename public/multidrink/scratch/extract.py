import re
from bs4 import BeautifulSoup

with open("C:\\Users\\GACB-\\.gemini\\antigravity-ide\\brain\\abe2173b-212f-478d-8169-1fa97707bf2d\\.system_generated\\steps\\245\\content.md", "r", encoding="utf-8") as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')
text = soup.get_text(separator='\n')
# remove extra blank lines
text = re.sub(r'\n\s*\n', '\n', text)
with open("c:\\multidrink\\scratch\\page_text.txt", "w", encoding="utf-8") as f:
    f.write(text)
