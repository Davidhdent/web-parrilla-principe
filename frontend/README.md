# Parrilla Príncipe · Web

Web de la Parrilla Príncipe (C/ Floridablanca, 6 · San Lorenzo de El Escorial).
Astro 7 + Tailwind 4 + GSAP/ScrollTrigger + Lenis + Leaflet. Español (`/`) e inglés (`/en/`).
Dirección de arte A «Brasa y castaño» (ver `../docs/direcciones-arte.md`).

## Arrancar

```bash
npm install
npm run dev        # http://localhost:4321 (desde Claude Code: configuración «parrilla-dev», puerto 4331)
npm run build      # genera /dist (HTML estático)
```

## Pruebas y calidad

```bash
npm run build
npm run test:e2e                                        # ES/EN × escritorio/móvil + capturas en ../docs/capturas
powershell -File tests/lighthouse.ps1 [-Escritorio]     # Lighthouse local (el móvil local es ruidoso: validar con PageSpeed tras publicar)
```

## Estructura

```
src/
  contenido/        ← LO QUE CAMBIA: carta, horario, menú del día, teléfono, plato de la casa, galería (JSON)
  data/
    restaurante.ts  ← datos fijos (nombre, dirección, coordenadas, valoraciones, reseñas) y lectura de contenido/
    carta.ts        ← carta tipada; alérgenos = null → «sin revisar»
    alergenos.ts    ← los 14 alérgenos del Reglamento UE 1169/2011
    imagenes.ts     ← fotos y sus créditos
  i18n/textos.ts    ← todos los textos ES/EN (el relato)
  styles/global.css ← tokens de diseño (paleta, tipografías), motivo «marcas de la parrilla», revelados
  components/       ← una sección por archivo (Hero, Historia, PlatoCasa, Carta, Galeria, Grupos, Zona, Opiniones, Preguntas, Pie…)
  scripts/efectos.ts← revelados, contadores, parallax y scroll suave (GSAP y Lenis se cargan al interactuar)
  pages/            ← /, /en/, /legal/, /en/legal/, 404, robots.txt, llms.txt
tests/              ← e2e (Playwright con el Edge instalado) y Lighthouse
```

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Carta, precios, alérgenos | `src/contenido/carta.json` |
| Horario (y marcarlo confirmado) | `src/contenido/horario.json` (`"confirmado": true`) |
| Menú del día | `src/contenido/menu-del-dia.json` |
| Teléfono, plato de la casa, redes | `src/contenido/general.json` |
| Galería | `src/contenido/galeria.json` + fotos en `src/assets/img/galeria/` |
| Textos de la web | `src/i18n/textos.ts` |
| Colores y tipografías | `src/styles/global.css` (`@theme`) y `src/layouts/Base.astro` |

En la Fase 4 se añadirá el panel del dueño sobre estos mismos JSON.

## Prelanzamiento

- `PUBLIC_MOSTRAR_PENDIENTES` (por defecto activo): muestra «Por confirmar» en los datos sin verificar.
- `PUBLIC_INDEXAR` (por defecto `false`): `noindex` en toda la web. Solo se activa el día del lanzamiento.
- Los datos pendientes **no** se publican en el JSON-LD (horario, teléfono) hasta que se marquen como confirmados.

## Reutilizar para otro restaurante

1. Cambiar `src/contenido/*.json`, `src/data/restaurante.ts` e `src/i18n/textos.ts`.
2. Cambiar la paleta y las fuentes en `global.css` y `Base.astro`, y el motivo decorativo (`.marcas`).
3. Sustituir las fotos de `src/assets/img/` y sus créditos en `imagenes.ts`.
4. Ajustar el teléfono esperado en `tests/e2e.mjs` (`TEL`) y ejecutar las pruebas.
