# Tutorial Groq - Pantallazos

Este modal es 100% funcional sin imágenes, pero se ve **muy intuitivo** con pantallazos reales.

## Archivos esperados (WebP, <150kb, 1280x800):

- `step-01-console.webp` - Página https://console.groq.com/keys vacía/logged out
- `step-02-login.webp` - Modal de login con Google/GitHub
- `step-03-create.webp` - Dashboard con botón azul "Create API Key" destacado
- `step-04-name.webp` - Dialog para nombrar la key (ej: auditor-websd)
- `step-05-copy.webp` - Key generada `gsk_...` con botón Copy visible

## Cómo capturar (2 min):

1. Abre `https://console.groq.com/keys` en ventana incógnito 1280px ancho
2. Captura cada paso con `Win+Shift+S` o Chrome DevTools screenshot
3. Blurea cualquier key real (pon `gsk_2aB7x...9fQ1` ficticia)
4. Exporta a WebP con https://squoosh.app/ o `cwebp -q 80 input.png -o output.webp`
5. Guarda aquí con el nombre exacto arriba

## Fallback intuitivo:

Si no existe el archivo, el componente muestra un placeholder con:
- Icono grande + borde dashed
- Texto `Reemplaza con pantallazo real: /tutorial/groq/step-XX.webp`
- Highlight amarillo "¿Dónde hacer clic?"

No rompe el build. Puedes lanzar así y añadir imágenes después.

## Tip visual:

- Usa cursor visible sobre el botón relevante
- Añade borde rojo suave alrededor del botón si quieres (el modal ya marca con badge azul)
- Mantén la barra de direcciones visible para confianza
