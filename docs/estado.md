# Estado del proyecto · Web Parrilla Príncipe

Se sigue el prompt maestro `C:\Users\Vinchy\PROYECTOS CLAUDE\Prompt creación web restaurante\prompt-webs-restaurantes_2.md`, fase por fase y con validación en cada ⏸️.

## Fase actual
**Fase 3 validada por el usuario el 30/09/2026.** Supuestos confirmados: reservas solo por teléfono, español e inglés, y hosting en Netlify por ahora. **Fase 4:** el usuario eligió **solo el panel del dueño** (Keystatic, gratis). Descartados: formulario de grupos, reservas online, chat con IA y newsletter. El panel se entregó el 30/09/2026 y **está pendiente de validación**:
- funciona en local y se probó guardar → JSON → web;
- tiene casilla de «teléfono revisado»;
- la CSP de Netlify solo se aplica a las páginas públicas;
- guía para el dueño en `docs/panel.md`.

En producción irá en modo GitHub + Netlify (Fase 5).

## Historial
- **Fase 0:** restaurante Parrilla Príncipe, C/ Floridablanca 6, 28200 San Lorenzo de El Escorial. El usuario pidió investigarlo todo.
- **Fase 1 (30/09):** investigación, cuestionario y tres direcciones de arte. **Elegida la A «Brasa y castaño».**
- **Fases 2 y 3 (30/09):** stack y frontend.
  - **Supuestos no confirmados por el usuario** (se pidió confirmarlos y no hubo respuesta): objetivo = reservas por teléfono y menú del día; idiomas ES + EN; hosting Netlify gratis.
  - **Skills usadas:** frontend-design, efectos-premium-hosteleria, webapp-testing (con playwright-core y el Edge instalado). theme-factory no hizo falta porque los tokens ya estaban definidos en la Fase 1.
  - **Plantilla:** se reutilizó el frontend de la Taberna del Viajero, sin el panel Keystatic (eso es de la Fase 4). Cambian la paleta, las tipografías (Fraunces + Manrope), el motivo (marcas de la parrilla), el hero (brasa, ascuas y titular letra a letra) y todos los textos. Se añaden la sección Grupos, las reseñas reales, la página 404 y el apartado de cookies.

## Decisiones de la Fase 3
- **Secciones:** hero, la casa, plato de la casa (huevos al ajillo `[VERIFICAR]`), carta interactiva (18 platos de las reseñas, sin precios y con los alérgenos «sin revisar»), menú del día a 20 € (primero en móvil), galería, grupos y celebraciones, cómo llegar con mapa, opiniones (notas y 3 reseñas literales de Tripadvisor), preguntas frecuentes, reserva por teléfono, pie, legal (aviso, privacidad y cookies) y 404.
- **Sin preloader:** no aportaba nada y retrasaba el LCP.
- **Barra móvil:** Llamar, Carta y Cómo llegar.
- **Fotos:** de Unsplash solo para ambiente (brasas, Monasterio), con crédito en el pie. Todo lo propio del restaurante va con el marcador «Foto pendiente».
- **JSON-LD:** no publica ni el horario ni el teléfono mientras sigan pendientes.

## Calidad comprobada (30/09/2026)
- Pruebas e2e: **98 de 98** (ES/EN × escritorio/móvil, carta, teclado, galería, idioma, mapa, barra móvil, 404, sin JS). Capturas en `docs/capturas/`.
- Lighthouse local:
  - **escritorio:** 100 / 100 / 100 / SEO 69;
  - **móvil:** rendimiento 97–98, LCP 2,4–2,5 s, TBT 0, CLS 0.
  - El SEO sale bajo solo por el `noindex` de la vista previa. Hay que validar con PageSpeed una vez publicada.

## Datos pendientes del dueño (lista completa en `docs/cuestionario-dueno.md`)
Nombre oficial · teléfono que se publica (hay tres) · horario (¿cenas?) · precio e inclusiones del menú del día · carta con precios · plato de la casa · alérgenos · **huerta propia** · historia · si el hotel sigue abierto · salones y grupos · terraza · niños · formas de pago · aparcamiento recomendado · fotos y logo · datos fiscales para el aviso legal.

## Próximos pasos
1. El usuario valida la Fase 4 (el panel).
2. Fase 5: SEO local y GEO, repositorio privado en GitHub, Netlify con el panel en modo GitHub, PageSpeed sobre la URL publicada y checklist de lanzamiento.
3. Recomendado: abrir una sesión nueva de Claude Code en esta carpeta, porque `preview_start` lee el `.claude/launch.json` de la carpeta de la sesión.
