import re
from bs4 import BeautifulSoup

with open(r"c:\multidrink\productos.html", "r", encoding="utf-8") as f:
    content = f.read()

soup = BeautifulSoup(content, 'html.parser')

# 1. Update buttons
buttons = soup.find_all('a', class_=lambda c: c and 'et_pb_button' in c)
for btn in buttons:
    btn['href'] = "https://wa.me/573115893220"

# 2. Add style.css
head = soup.find('head')
if head and not head.find('link', href=re.compile(r'style\.css')):
    style_link = soup.new_tag('link', rel='stylesheet', href='style.css?v=3')
    head.append(style_link)

# 3. Add Navigation Menu
body = soup.find('body')
if body:
    nav_html = """
    <nav class="main-nav">
        <div class="nav-brand">MULTYHEALTH</div>
        <button class="hamburger" id="menuToggle">☰</button>
        <ul class="nav-links" id="navLinks">
            <li><a href="index.html#anclaje">Inicio</a></li>
            <li><a href="index.html#disparador">El Desafío Actual</a></li>
            <li><a href="index.html#credibilidad">Nuestra Trayectoria</a></li>
            <li><a href="index.html#solucion">Ecosistema de Valor</a></li>
            <li><a href="index.html#dossier">Dossier Técnico</a></li>
            <li><a href="unete.html" style="color: var(--color-gold); font-weight: bold;">Obtener ingresos</a></li>
        </ul>
    </nav>
    """
    # Insert nav right after <body>
    nav_soup = BeautifulSoup(nav_html, 'html.parser')
    body.insert(0, nav_soup)
    
    # Add script for menu toggle just before </body>
    script_html = """
    <script>
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        if(menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }
    </script>
    """
    body.append(BeautifulSoup(script_html, 'html.parser'))

with open(r"c:\multidrink\productos.html", "w", encoding="utf-8") as f:
    f.write(str(soup))
