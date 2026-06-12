# Deploy Report — Juan Ignacio Molina Web

Fecha: 2026-06-12

## Proveedor
Vercel

## Proyecto
`jfrancesia-hues-projects/juan-ignacio-molina-web`

## URL pública para cliente
https://juan-ignacio-molina-web.vercel.app

## URL deployment generado
https://juan-ignacio-molina-3wu7un83n-jfrancesia-hues-projects.vercel.app

## Inspect
https://vercel.com/jfrancesia-hues-projects/juan-ignacio-molina-web/D8znh74DCT98E2BL9GUn4xzjdLv1

## Comando ejecutado

```powershell
vercel deploy --yes --name juan-ignacio-molina-web
```

Nota: Vercel indicó que `--name` y `name` en `vercel.json` están deprecados. Después del deploy se limpió `vercel.json` para evitar ese warning en próximos deploys.

## Verificación pública

- `/` → 200, `text/html`, 26700 bytes
- `/styles.css` → 200, `text/css`, 31539 bytes
- `/script.js` → 200, `application/javascript`, 4840 bytes
- `/assets/audio/tu-silencio-fondo.mp3` → 200, `audio/mpeg`, 3016579 bytes

`web_fetch` confirmó status 200 y título correcto:

`Juan Ignacio Molina — Música andina, folklore argentino y contratación artística`

## Estado
Deploy público funcional para mostrar al cliente.

## Update responsive mobile — 2026-06-12 19:00 ART

Commit GitHub: bd1849b Improve mobile responsive layout

Deploy Vercel production:
- Deployment: https://juan-ignacio-molina-dlyd9riyl-jfrancesia-hues-projects.vercel.app
- Alias cliente: https://juan-ignacio-molina-web.vercel.app
- Inspect: https://vercel.com/jfrancesia-hues-projects/juan-ignacio-molina-web/CFnKb5oq42QtV65YHdbgSwNASqXy

Verificación pública:
- / 200
- /styles.css 200, contiene MOBILE POLISH 2026-06-12
- /script.js 200
- /assets/audio/tu-silencio-fondo.mp3 200 audio/mpeg

