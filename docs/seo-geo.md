# SEO local y GEO · Parrilla Príncipe

**Objetivo:** que el restaurante aparezca, y bien descrito, cuando alguien pregunte a Google o a una IA (AI Overviews, Gemini, ChatGPT, Perplexity, Claude, Copilot) cosas como:
- «dónde comer cerca del Monasterio de El Escorial»;
- «menú del día en San Lorenzo de El Escorial»;
- «parrilla en El Escorial»;
- o directamente por la Parrilla Príncipe.

> **Honestidad:** ninguna técnica garantiza el primer puesto en buscadores ni en IA.
> Se maximizan las probabilidades y se mide cada mes; no se promete una posición.

---

## 1. Ya está hecho en la web

| Qué | Dónde |
|---|---|
| HTML estático con todo el contenido (carta, horario, dirección), sin depender de JavaScript | Toda la web |
| Carta en texto HTML, nunca en imagen ni PDF | Sección «La carta» |
| Datos estructurados `Restaurant`, `Menu` y `FAQPage`, en español e inglés | `src/components/DatosEstructurados.astro` |
| En el JSON-LD solo van los datos **confirmados**: el horario y el teléfono se añaden solos cuando se marcan como revisados en el panel. No hay `aggregateRating` | Ídem |
| `robots.txt` que admite de forma explícita Googlebot, Google-Extended, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot y Applebot-Extended. Bloquea solo `/admin`, `/api/` y `/keystatic`, e incluye la ruta del sitemap | `/robots.txt` |
| `llms.txt` con el formato de llmstxt.org, generado a partir de los mismos datos que la web | `/llms.txt` |
| `sitemap-index.xml` con `hreflang` es/en | `/sitemap-index.xml` |
| **Frase citable** en la primera pregunta frecuente y en `llms.txt`: «La Parrilla Príncipe es un restaurante de carnes a la parrilla y cocina casera en la calle Floridablanca, 6 […], a unos pasos del Real Monasterio» | Preguntas frecuentes |
| 10 preguntas frecuentes en lenguaje natural (reservas, menú, terraza, niños, sin gluten, grupos, aparcamiento, pago) | Sección «Preguntas frecuentes» |
| Títulos y descripciones con la localidad y el tipo de cocina; Open Graph con imagen de 1200×630 | `src/i18n/textos.ts` y `Base.astro` |
| `noindex` hasta el lanzamiento (`PUBLIC_INDEXAR`) y siempre en las vistas previas de Netlify | `Base.astro` y `netlify.toml` |

---

## 2. NAP: nombre, dirección y teléfono idénticos en todas partes

Hoy es **el punto más débil** del restaurante en internet. Las IA cruzan fuentes y cada incoherencia resta confianza. Esto es lo que se encontró en la investigación:

- **Nombre:** «Parrilla Príncipe», «Rte. Parrilla Principe», «La Parrilla del Príncipe», «La parrila del principe» y «Parrilla Príncipe Hotel».
- **Teléfonos:** 696 63 67 65, 918 90 16 11 y 918 90 15 48.
- **Horarios:** de 11:00 a 17:00 en Google, frente a comidas y cenas en Tripadvisor.
- **Web y email:** Tripadvisor enlaza a `parrillaprincipe.es`, que ya no existe.

Una vez confirmados con el dueño, se usarán **exactamente** estos datos:

```
Parrilla Príncipe                                   ← [VERIFICAR] nombre oficial
Calle Floridablanca, 6, 28200 San Lorenzo de El Escorial, Madrid
696 63 67 65                                        ← [VERIFICAR] teléfono de reservas
https://<dominio definitivo>                        ← [VERIFICAR]
```

Revisar y corregir en:

- [ ] **Google Business Profile.** Reclamar la ficha si no está reclamada, añadir la web y quitar la parte de «hotel» si ya no lo es.
- [ ] **Tripadvisor, ficha del restaurante** (d989904). Actualizar la web (ahora apunta a un dominio muerto), el teléfono, el horario y el email.
- [ ] **Tripadvisor, ficha antigua del «hotel»** (d631636, nota de 3,3). Pedir que se fusione o se cierre. Google la muestra junto a la ficha buena.
- [ ] **Gastroranking.** Ficha antigua «La parrila del principe» en la calle Mariano Benavente, 12: pedir que se fusione.
- [ ] Facebook.
- [ ] Apple Maps (Apple Business Connect).
- [ ] Bing Places.
- [ ] OpenStreetMap: el punto se llama «La Parrilla del Príncipe». Corregirlo si el nombre oficial es otro.
- [ ] Restaurant Guru, Sluurpy y guías que copian fichas: no se pueden controlar. Se corrigen solas cuando Google y Tripadvisor tienen bien los datos.

---

## 3. Google Business Profile (lo que más pesa en las búsquedas locales)

- **Categorías:** la principal, «Restaurante de parrilla» o «Asador» (la que exista en el perfil); como secundarias, «Restaurante de cocina española» y «Restaurante».
- **Horario:** el real, festivos incluidos, **igual que en la web**.
- **Enlaces:** la web y, en «Menú», el enlace a `/#carta`.
- **Atributos:** terraza, admite reservas, y las opciones vegetarianas, sin gluten, apto para niños y perros en la terraza solo si son ciertas.
- **Fotos:** subir 20 o más reales. La terraza bajo los castaños, los huevos al ajillo, el entrecot, el comedor, la vista al Monasterio y el equipo.
- **Reseñas:** responder a todas, también a las negativas, de forma breve y cordial.
- **Publicaciones:** una a la semana, con el menú del día o el plato de temporada.

---

## 4. Alta en buscadores (tras el lanzamiento)

1. **Google Search Console:** verificar el dominio y enviar `sitemap-index.xml`.
2. **Bing Webmaster Tools:** importar desde Search Console. Alimenta a Bing, a Copilot y a parte de ChatGPT.
3. **IndexNow:** generar una clave, publicarla en `/<clave>.txt` y avisar a IndexNow en cada despliegue. Así los cambios de carta u horario se indexan en horas y no en semanas.

---

## 5. Autoridad externa y reseñas

- **Reseñas reales:** QR en la mesa y en la cuenta, con enlace directo a «Escribir reseña» de Google. Nunca incentivar ni comprar reseñas.
- **Turismo del ayuntamiento:** pedir el alta en la sección de restaurantes de `sanlorenzoturismo.es`, con enlace a la web. Asador del Rey ya tiene ficha y la Parrilla no.
- **Prensa y guías locales:** proponer el restaurante a guías de escapadas desde Madrid, como la gastroguía de El Escorial de Directo al Paladar (octubre de 2025), que no lo incluye. La historia de la huerta propia, si se confirma, es un buen gancho.
- **Comercio local:** ficha en «En San Lorenzo lo tienes» si existe para hostelería.

---

## 6. Medición mensual (batería de preguntas)

Lanzar cada mes en **Google, ChatGPT, Gemini, Perplexity, Claude y Copilot**, en sesión privada. Anotar si aparece, en qué posición y con qué datos, para corregir los erróneos.

| # | Pregunta |
|---|---|
| 1 | Dónde comer en San Lorenzo de El Escorial |
| 2 | Restaurante cerca del Monasterio de El Escorial |
| 3 | Menú del día en San Lorenzo de El Escorial |
| 4 | Parrilla o asador en El Escorial |
| 5 | Dónde comer carne a la brasa en San Lorenzo de El Escorial |
| 6 | Restaurante con terraza a la sombra en El Escorial |
| 7 | Dónde comer barato y bien cerca del Monasterio de El Escorial |
| 8 | Restaurante para comidas de grupo en San Lorenzo de El Escorial |
| 9 | Parrilla Príncipe: horario y teléfono |
| 10 | ¿La Parrilla Príncipe tiene menú del día? ¿Cuánto cuesta? |
| 11 | Where to eat near El Escorial Monastery |
| 12 | Set lunch menu in San Lorenzo de El Escorial |
| 13 | Grilled meat restaurant El Escorial |

Plantilla de registro:

| Mes | Motor | Pregunta | ¿Aparece? | Posición | Datos correctos | Qué corregir |
|---|---|---|---|---|---|---|
| | | | | | | |

Al terminar cada medición, revisar Search Console (consultas, clics y posición media) y las estadísticas de Google Business Profile (llamadas y peticiones de «Cómo llegar»).

---

## 7. Checklist de lanzamiento (cuando el dueño confirme los datos)

1. [ ] Todos los `[VERIFICAR]` resueltos, las casillas «revisado» marcadas en el panel y `PUBLIC_MOSTRAR_PENDIENTES=false`.
2. [ ] `PUBLIC_INDEXAR=true`, dominio propio con HTTPS y correo configurado.
3. [ ] PageSpeed Insights ≥ 90 en móvil y escritorio sobre la URL definitiva.
4. [ ] Pruebas e2e contra producción.
5. [ ] Alta en Google Search Console y Bing Webmaster Tools, sitemap enviado e IndexNow activo.
6. [ ] Google Business Profile actualizado con el enlace a la web y NAP coherente (sección 2).
7. [ ] Primera batería de preguntas a las IA como punto de partida (sección 6).
