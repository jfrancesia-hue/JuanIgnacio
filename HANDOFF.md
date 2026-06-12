# HANDOFF — Juan Ignacio Molina Web

Fecha: 2026-06-12

## Estado
Sitio estático premium para Juan Ignacio Molina, compositor e intérprete catamarqueño.

Stack:
- HTML estático: `index.html`
- CSS: `styles.css`
- JS vanilla: `script.js`
- Assets locales en `assets/`

No hay Git ni `package.json` en este directorio.

## Mejoras aplicadas hoy

### SEO / Social preview
- Nuevo title orientado a búsqueda y contratación.
- Meta description más comercial.
- `theme-color`.
- Open Graph básico.
- Twitter card.
- JSON-LD `MusicGroup` con género, ubicación y contacto.

### Navegación y mobile
- Se agregó `skip-link` accesible.
- Se agregó botón `Menú` para mobile.
- Se agregó panel `mobile-menu` con enlaces principales.
- JS abre/cierra menú y lo cierra al tocar un enlace.

### Conversión
- Se agregó tercer CTA en hero: `Escuchar obra`.
- Se agregó `trust-strip`: Festivales / Teatros / Auditorios / Eventos culturales.
- Se agregó `booking-band` antes de contacto con CTA directo a WhatsApp para contratación 2026.

### Performance / accesibilidad
- Se agregaron `loading="lazy"` y `decoding="async"` en imágenes no críticas.
- Imagen principal hero con `fetchpriority="high"`.
- CSS `prefers-reduced-motion` para reducir animaciones.
- Validación interna de anchors/refs.

## Archivos modificados
- `index.html`
- `styles.css`
- `script.js`
- `HANDOFF.md`
- `site_verify_report.json`

## Verificación ejecutada

```powershell
node tmp_verify.js
```

Resultado:
- `ok: true`
- refs internas: 19
- assets faltantes: 0
- ids duplicados: 0
- anchors faltantes: 0
- JS sintácticamente válido

Servidor local de prueba:

```powershell
node -e "...servidor estático puerto 4177..."
Invoke-WebRequest http://127.0.0.1:4177/
Invoke-WebRequest http://127.0.0.1:4177/styles.css
Invoke-WebRequest http://127.0.0.1:4177/script.js
```

Resultado:
- HTML `200`
- CSS `200`
- JS `200`

## Próximos pasos recomendados
1. Confirmar URL exacta de Facebook y YouTube/canal oficial.
2. Si se publica, definir dominio/canonical y reemplazar `og:image` relativo por URL absoluta.
3. QA visual real en navegador: desktop, tablet y mobile.
4. Si Jorge quiere versión más pro: agregar sección de prensa/testimonios y un bloque de rider técnico descargable.
5. Si se deploya, correr Lighthouse/Pagespeed y optimizar imágenes pesadas si hace falta.

## Mejoras segunda tanda — 2026-06-12 15:50 ART

Se agregaron bloques comerciales y de conversión:

- Sección \Ideal para programadores\: festivales, teatros/auditorios, eventos institucionales y ciclos culturales.
- Sección \Ficha de contratación / rider\: duración, formatos, repertorio y producción.
- Sección \Prensa y validación\: Poncho, gira europea, formación académica y dirección musical.
- CTA fijo mobile \Contratar\ a WhatsApp.
- Favicon local \ssets/favicon.png\.

Verificación:

- \site_verify_report.json\: ok=true, refs=20, sin assets faltantes, sin ids duplicados, sin anchors rotos.
- Servidor local puerto 4177:
  - / 200
  - /styles.css 200
  - /script.js 200
  - /assets/favicon.png 200
  - /assets/Dossier-Juan-Ignacio-Molina.pdf 200


## Ajuste marca menú — 2026-06-12

- Se quitó la imagen/sello del logotipo en el menú superior.
- La marca quedó como texto integrado al nav: \Juan Ignacio Molina\.
- Se removieron sombras/tamaños asociados al ícono cuadrado del menú.
- Verificación: \site_verify_report.json\ ok=true, \logoOk=true\.


## Corrección logo menú — 2026-06-12

Jorge aclaró que no quería quitar el logo, sino quitar el encuadre/sello. Se restauró el logo en el menú usando \ssets/logos/jim-logo-blue.png\ como imagen limpia integrada al nav, sin fondo, sin borde, sin radius y sin sombra. Verificación: \site_verify_report.json\ ok=true, \logoOk=true\.


## Audio ambiente — 2026-06-12

- Fuente original: C:\Users\LENOVO\Downloads\Tu Silencio P3 2448.wav (~54 MB).
- Se convirtió a MP3 web liviano: assets/audio/tu-silencio-fondo.mp3.
- Duración: ~188.5 s.
- Peso: ~3.0 MB.
- Bitrate: 128 kbps.
- Se agregó audio HTML con loop y preload metadata.
- Se agregó control flotante de música.
- JS intenta reproducir automáticamente; si el navegador bloquea autoplay con sonido, arranca en el primer click/toque o con el botón Música.
- Nota de deploy: servir .mp3 con MIME audio/mpeg.

Verificación:
- site_verify_report.json: ok=true, audioOk=true.
- HTTP local: /assets/audio/tu-silencio-fondo.mp3 respondió 200.

## YouTube oficial — 2026-06-12

- En el módulo \Escuchá su música\, el botón de YouTube ahora apunta directo a: https://www.youtube.com/@juanignaciomolinaoficial
- Se corrigió el botón de Audiomack para que mantenga su URL propia.
- Se agregó el canal oficial a JSON-LD \sameAs\.
- Verificación: site_verify_report.json ok=true, youtubeOk=true.


## Deploy Vercel — 2026-06-12

- Proyecto Vercel: jfrancesia-hues-projects/juan-ignacio-molina-web
- URL cliente: https://juan-ignacio-molina-web.vercel.app
- Verificación pública: HTML/CSS/JS/audio respondieron 200; audio con MIME audio/mpeg.
- Reporte: DEPLOY_REPORT.md


## Responsive mobile — 2026-06-12 18:31 ART

Se agregó una capa específica de responsive para celular al final de \styles.css\ bajo el marcador \MOBILE POLISH 2026-06-12\.

Mejoras:
- Nav compacto con logo, menú y CTA ajustados.
- Hero adaptado a mobile, menos ruido visual y mejor lectura.
- Cards/secciones con padding y radios optimizados.
- Galería, rider, agenda, listen, quenas y proof en una columna.
- CTA WhatsApp y botón de audio acomodados para no pisarse.
- Breakpoint extra para pantallas chicas (<390px).

Verificación local:
- site_verify_report.json ok=true, mobileOk=true.
- HTML/CSS/JS/audio respondieron 200 en servidor local.

