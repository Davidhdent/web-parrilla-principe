# Retrospectiva · Web Parrilla Príncipe (30/09/2026)

## Resultado
- **Web:** publicada en https://parrilla-principe.netlify.app con `noindex` y etiquetas «Por confirmar» hasta el lanzamiento.
- **PageSpeed sobre la URL publicada:**
  - móvil: **97** / 100 / 100 (LCP 2,1 s, CLS 0, TBT 0);
  - escritorio: **100** / 100 / 100 (LCP 0,4 s, CLS 0,002).
  - SEO 69 solo por el `noindex`.
- **Pruebas e2e:** 98 de 98, en local y contra producción.
- **Tiempo:** una sola sesión, reutilizando la plantilla de la Taberna del Viajero.

## Qué falló y cómo se resolvió

| Problema | Por qué pasó | Solución | Guardado en |
|---|---|---|---|
| **Desborde en la carta:** en móvil, la barra inferior se salía de la pantalla | La rejilla de la carta tenía la columna `auto` y la fila de pestañas la ensanchaba. El test comparaba con `innerWidth`, que en móvil crece con el contenido | `minmax(0, 1fr)`, y el test compara con el ancho del dispositivo | Skill `efectos-premium-hosteleria`. Tarea aparte para la Taberna |
| **CLS de 0,41 en PageSpeed escritorio** (0 en local) | `max-width: 15ch` en el titular, y Fraunces cambia de ancho según el tamaño (eje `opsz`) | `em` en lugar de `ch`, titular con `font-display: optional` sobre los mismos woff2 precargados, reserva calibrada y prueba `tests/cls-fuentes.mjs` | Skill `efectos-premium-hosteleria` |
| **Insignia de Netlify:** tapaba «Carta» y «Cómo llegar» en la barra móvil | Netlify la inserta en el plan gratuito | Se sube con CSS por encima de la barra (sin ocultarla) | Skill `seo-local-restaurante` |
| **Fuente pequeña en `data:`:** la bloqueaba la CSP | Vite incrusta como `data:` los recursos de menos de 4 KB | `assetsInlineLimit` que excluye las fuentes | Skill `seo-local-restaurante` |
| **CSP en todas las rutas:** habría roto el panel en producción | Al rehacer `netlify.toml` se generalizó la CSP a `/*` | CSP solo en las rutas públicas | Skill `seo-local-restaurante` |
| **Captura de página completa en móvil:** salía corrupta | Elementos fijos + `100svh` en Playwright | En móvil, capturas sección a sección | Skill `efectos-premium-hosteleria` |
| **`preview_start`:** leía el `launch.json` de otra carpeta | La sesión se abrió en la carpeta de la Taberna | Entrada temporal que luego se revierte. Mejor: abrir la sesión en la carpeta del proyecto | Memoria |

## Qué funcionó bien
- **Reutilizar la plantilla** ahorró la mayor parte del trabajo: cambiando contenido y tokens, la web nueva no se parece a la de la Taberna.
- **Web antigua en Wayback Machine** (`parrillaprincipe.com`, 2005): dio datos que no estaban en ningún otro sitio, como los salones para 20, 30 y 50 personas y el edificio del antiguo hotel.
- **Google Maps y Tripadvisor en el navegador integrado** (rechazando cookies): reseñas y datos reales que las búsquedas no devolvían.
- **Contraste medido** con un script desde la Fase 1: ningún problema de accesibilidad después.

## Cambios propuestos para el prompt maestro (v3)
1. **Fase 0:** «Abre Claude Code en la carpeta del proyecto (no en la de otro restaurante)», porque `preview_start` y la memoria dependen de ello.
2. **Fase 3.4:** añadir «CLS < 0,1 también **con las fuentes retrasadas** (simular una red lenta): el Lighthouse local no lo detecta. Titulares con `max-width` en `em`, no en `ch`».
3. **Fase 3, pruebas:** «el desborde horizontal se mide contra el ancho del dispositivo, no contra `innerWidth`».
4. **Fase 5.2:** añadir «pruebas e2e también **contra la URL publicada**: aparecen la insignia del hosting, la CSP real y la carga real de fuentes». Y «la CSP no debe romper el panel del dueño».
5. **Fase 1:** añadir la **Wayback Machine** como fuente de historia cuando haya una web antigua, y que se señale en rojo cuando **el mismo negocio tenga varias fichas** (duplicados de nombre o de dirección): suele ser el mayor problema de SEO local.
6. **Fase 1:** si el usuario ya hizo la web de un vecino, pedir de forma explícita que la nueva dirección de arte se diferencie de la suya.
