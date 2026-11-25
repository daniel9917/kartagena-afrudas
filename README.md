# Kartagena Afrudas — sitio local

Sitio responsive construido con Next.js (App Router), TypeScript y Tailwind CSS v4.

Para continuar el trabajo, consulta la guía completa en [`docs/README.md`](docs/README.md): qué se ha hecho, guías de estilo, pipelines de arte, pasos de QA y tareas pendientes antes de desplegar.

## Ejecutar en local

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

Para comprobar la versión de producción en local:

```bash
npm run build
npm start
```

Verificación responsive automatizada (360×740 y 390×844, con Chrome instalado en `C:/Program Files/Google/Chrome/Application/chrome.exe`):

```bash
npm run check:mobile
```

Comprueba ancho sin desbordamiento, una sola columna en móvil, menú, targets ≥44px, errores JS y cierre del drawer con Escape. Si Chrome está en otra ruta, cámbiala en `scripts/check-mobile.mjs`.

## Arte de marca

El arte original está en `logo/logo.png` (894×959, fondo sage liso `#C8D2C0`). No se modificó el archivo original.

`npm run prepare:assets` genera, en `public/assets/brand/`:

- `ka-primary-on-sage_v1.webp` / `.png` — lockup completo sobre el sage original (hero y piezas editoriales).
- `ka-primary-transparent_v1.webp` / `.png` — recorte con el fondo sage eliminado (sobre cream, sage o espresso).
- `ka-isotype-transparent_v2.webp` / `.png` — emblema trenzado completo con espacio libre, para header, avatares y marcas de agua.
- `ka-primary_mono-espresso_v1.*`, `ka-primary_mono-cream_v1.*`, `ka-isotype_mono-espresso_v2.*`, `ka-isotype_mono-cream_v2.*` — versiones de una sola tinta para bordado, sellos y overlays.
- `favicon-16.png`, `favicon-32.png`, `og-image-1200x630.jpg`.
- También genera `src/app/icon.png` y `src/app/apple-icon.png`, que Next.js usa automáticamente.

Si vuelves a recibir arte nuevo, reemplaza `logo/logo.png` y ejecuta de nuevo el comando. El script está preparado para un fondo sage plano; si el nuevo arte tiene otro fondo, hay que ajustar `BG` en `scripts/prepare-assets.mjs`.

Los patrones geométricos de las tarjetas están en `public/assets/patterns/`. Cuando haya fotografía real, se pueden sustituir por imágenes en `src/components/Catalog.tsx` y `src/components/LineCard.tsx`.

## Copy y decisiones aplicadas

- Se corrigió la ortografía española solicitada: `raíz`, `diseño`, `conexión`, `técnicas`, `Macramé`, `Asesorías`, `Envíos`, `dedicación`, `Escríbenos`, `Línea`, `Creación`, `Memoria y Raíz`.
- El nombre oficial `Kartagena Afrudas` se mantiene en todo el texto y los metadatos. `AFRUDOS` solo aparece dentro del arte del logo.
- La etiqueta legacy de TikTok (`Kartagina_afrudas`) se conserva porque formaba parte del copy final; el enlace apunta a `https://www.tiktok.com/@kartagena_afrudas?lang=en`. Si quieres que la etiqueta mostrada coincida con el enlace, cámbiala en `src/lib/content.ts`.
- Se aplicaron **ambas** correcciones de contraste:
  1. Token `--terracotta-deep: #8c3f1c` (5.88:1 sobre cream; 4.57:1 sobre sage) para chips, texto pequeño y estados hover.
  2. Los CTA primarios mantienen el terracota de marca `#B55A2A` con etiqueta cream de **19px / 700**, que cumple AA para texto grande (3.75:1).
- Ningún texto pequeño usa terracota de marca o ochre directamente; el ochre se usa para badges, líneas y números con texto espresso.

## Enlaces de WhatsApp

Todos los enlaces se construyen en `src/lib/whatsapp.ts` con `https://wa.me/573003230109` y `encodeURIComponent`. Los mensajes prellenados están en `WA_MESSAGES` (`src/lib/content.ts`) y son microcopy funcional: revisarlos antes de publicar si quieres una redacción distinta.

## Estructura

```
src/app/                 páginas: /, /linea-creacion, /linea-cuidado, /memoria-y-raiz, /contacto
src/components/          header, footer, tarjetas, filtros, booking, formulario
src/lib/content.ts       todo el copy en un solo lugar
src/app/globals.css      tokens, tipografía, estados UI, responsive
scripts/prepare-assets.mjs
```

## Antes de desplegar

1. Definir `NEXT_PUBLIC_SITE_URL` con el dominio final (sitemap, robots, canonical y OG).
2. Sustituir el catálogo de ejemplo por piezas reales; ahora se muestran las seis categorías exactas como tarjetas filtrables.
3. Añadir fotografía real y revisar textos alternativos.
4. Ejecutar Lighthouse y el checklist de QA (320/360/390/768/1024/1440 px, teclado, lectores de pantalla, enlaces WA en móvil). Estado actual: las cinco páginas tienen 1.00 en accesibilidad, buenas prácticas y SEO en el audit de Lighthouse sin emular dispositivo; `npm run check:mobile` pasa sin problemas en 360 y 390 px.
5. Desplegar con `npm run build` en Vercel/Netlify o cualquier host con Node 20+.
