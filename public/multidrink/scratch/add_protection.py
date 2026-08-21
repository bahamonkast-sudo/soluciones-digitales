import os

# 1. Update style.css
css_path = r"c:\multidrink\style.css"
with open(css_path, "a", encoding="utf-8") as f:
    f.write("\n\n/* PROTECCION ANTI-COPIA */\n")
    f.write("body {\n")
    f.write("    -webkit-user-select: none;\n")
    f.write("    -moz-user-select: none;\n")
    f.write("    -ms-user-select: none;\n")
    f.write("    user-select: none;\n")
    f.write("}\n")

# 2. Add JS to HTML files
js_code = """
    <!-- Escudo Anti-Copia -->
    <script>
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && (e.key === 'u' || e.key === 'c' || e.key === 's' || e.key === 'p' || e.key === 'U' || e.key === 'C' || e.key === 'S' || e.key === 'P')) {
                e.preventDefault();
            }
            if (e.key === 'F12') {
                e.preventDefault();
            }
        });
    </script>
"""

html_files = [r"c:\multidrink\index.html", r"c:\multidrink\productos.html", r"c:\multidrink\unete.html"]

for html_file in html_files:
    if os.path.exists(html_file):
        with open(html_file, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Insert just before </body>
        if "<!-- Escudo Anti-Copia -->" not in content:
            content = content.replace("</body>", f"{js_code}\n</body>")
            with open(html_file, "w", encoding="utf-8") as f:
                f.write(content)
