/**
 * Pruebas de extremo a extremo + capturas (escritorio y móvil, ES y EN).
 * Usa el Edge/Chrome instalado en el equipo (playwright-core, sin descargas).
 *
 *   npm run build && npm run test:e2e
 *   E2E_BASE=https://parrilla-principe.netlify.app npm run test:e2e   ← contra producción
 *
 * Las capturas se guardan en ../docs/capturas/ (solo en local).
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const capturas = resolve(raiz, '../docs/capturas');
const PUERTO = 4332;
const REMOTO = process.env.E2E_BASE?.replace(/\/$/, '');
const BASE = REMOTO ?? `http://localhost:${PUERTO}`;
const TEL = 'tel:+34696636765';

let fallos = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? '✔' : '✘'} ${msg}`);
  if (!cond) fallos++;
};

// 1. Servidor de la versión compilada (salvo si se prueba una URL publicada)
const servidor = REMOTO
  ? null
  : spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--port', String(PUERTO)], { cwd: raiz, stdio: 'pipe' });
if (servidor) {
  await new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('El servidor no arrancó')), 30000);
    servidor.stdout.on('data', (d) => {
      if (String(d).includes(String(PUERTO))) { clearTimeout(t); res(); }
    });
  });
}
console.log(`Probando ${BASE}\n`);

const navegador = await chromium.launch({ channel: process.env.PW_CHANNEL ?? 'msedge', headless: true });
await mkdir(capturas, { recursive: true });

try {
  // 2. Archivos para buscadores e IA
  for (const ruta of ['/robots.txt', '/llms.txt', '/sitemap-index.xml', '/legal/', '/en/legal/']) {
    const r = await fetch(BASE + ruta);
    ok(r.status === 200, `${ruta} responde 200`);
  }
  const robots = await (await fetch(BASE + '/robots.txt')).text();
  ok(['ClaudeBot', 'OAI-SearchBot', 'PerplexityBot', 'Google-Extended'].every((b) => robots.includes(b)), 'robots.txt permite los rastreadores de IA');
  ok(robots.includes('Disallow: /admin') && robots.includes('Sitemap:'), 'robots.txt bloquea /admin e indica el sitemap');
  const llms = await (await fetch(BASE + '/llms.txt')).text();
  ok(llms.startsWith('# Parrilla Príncipe') && llms.includes('\n> ') && llms.includes('## Web'), 'llms.txt con el formato de llmstxt.org');

  const dispositivos = {
    escritorio: { viewport: { width: 1440, height: 900 } },
    movil: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  };

  for (const [nombre, opciones] of Object.entries(dispositivos)) {
    for (const lang of ['es', 'en']) {
      const ctx = await navegador.newContext({ ...opciones, reducedMotion: 'reduce' });
      const page = await ctx.newPage();
      const errores = [];
      page.on('pageerror', (e) => errores.push(e.message));
      page.on('console', (m) => m.type() === 'error' && !m.text().includes('tile.openstreetmap') && errores.push(m.text()));

      const url = BASE + (lang === 'es' ? '/' : '/en/');
      const resp = await page.goto(url, { waitUntil: 'networkidle' });
      const et = `[${nombre} · ${lang}]`;
      ok(resp.status() === 200, `${et} la página carga`);
      ok((await page.getAttribute('html', 'lang')) === lang, `${et} atributo lang correcto`);
      ok((await page.locator('h1').count()) === 1, `${et} un único h1`);
      ok((await page.locator('link[rel="alternate"][hreflang]').count()) === 3, `${et} hreflang es/en/x-default`);
      ok((await page.locator('meta[name="robots"][content*="noindex"]').count()) === 1, `${et} noindex en vista previa`);

      // Se compara con el ancho del dispositivo: en móvil el viewport de maquetación crece con el contenido
      const ancho = opciones.viewport.width;
      const desborde = await page.evaluate((w) => Math.max(document.documentElement.scrollWidth, window.innerWidth) - w, ancho);
      ok(desborde <= 0, `${et} sin scroll horizontal (${desborde}px)`);

      // Carta: pestañas y despliegue de platos
      const pestanas = page.locator('[role="tab"]');
      await pestanas.nth(1).click();
      ok((await page.locator('[role="tabpanel"]:not([hidden])').count()) === 1, `${et} las pestañas muestran un solo panel`);
      await pestanas.nth(1).press('ArrowRight');
      ok((await pestanas.nth(2).getAttribute('aria-selected')) === 'true', `${et} las pestañas se manejan con el teclado`);
      const boton = page.locator('[role="tabpanel"]:not([hidden]) .plato-fila__boton').first();
      await boton.click();
      ok((await boton.getAttribute('aria-expanded')) === 'true', `${et} un plato se despliega al pulsarlo`);
      await page.waitForTimeout(700); // fin de la transición de despliegue
      ok(await page.locator('[role="tabpanel"]:not([hidden]) .plato-fila__detalle').first().isVisible(), `${et} el detalle del plato (alérgenos) es visible`);

      // Galería: vista ampliada
      await page.locator('[data-abrir-foto="1"]').click();
      ok(await page.locator('[data-visor]').isVisible(), `${et} la galería abre la vista ampliada`);
      ok(((await page.locator('[data-visor-titulo]').textContent()) ?? '').length > 0, `${et} la vista ampliada muestra su texto`);
      await page.keyboard.press('Escape');
      ok(!(await page.locator('[data-visor]').isVisible()), `${et} Escape cierra la vista ampliada`);

      // Llamar: enlace tel correcto
      ok((await page.locator(`a[href="${TEL}"]`).count()) > 0, `${et} hay enlace para llamar`);

      // Cambio de idioma
      const otro = page.locator(`a.idioma[hreflang="${lang === 'es' ? 'en' : 'es'}"]`);
      ok((await otro.getAttribute('href')) === (lang === 'es' ? '/en/' : '/'), `${et} el selector de idioma apunta a la otra versión`);

      if (nombre === 'movil') {
        const barra = page.locator('.barra-movil');
        ok(await barra.isVisible(), `${et} barra inferior visible`);
        ok((await barra.locator('a').count()) === 3, `${et} barra inferior con Llamar, Carta y Cómo llegar`);
        // Nada tapa la barra: el elemento en su centro pertenece a la barra
        const tapada = await page.evaluate(() => {
          const b = document.querySelector('.barra-movil').getBoundingClientRect();
          return [...document.querySelectorAll('.barra-movil a')].some((a) => {
            const r = a.getBoundingClientRect();
            const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return !el || !a.contains(el);
          }) || b.bottom > window.innerHeight + 1;
        });
        ok(!tapada, `${et} nada tapa la barra inferior`);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);
        await page.locator('[data-abrir-menu]').click();
        ok(await page.locator('[data-menu]').isVisible(), `${et} el menú a pantalla completa se abre`);
        await page.keyboard.press('Escape');
        ok(!(await page.locator('[data-menu]').isVisible()), `${et} Escape cierra el menú`);
      }

      // Con movimiento reducido todo el contenido debe verse
      const ocultos = await page.evaluate(() =>
        [...document.querySelectorAll('[data-revelar], .letra')].filter((e) => getComputedStyle(e).opacity === '0').length,
      );
      ok(ocultos === 0, `${et} nada queda oculto con «reducir movimiento»`);

      // JSON-LD presente y válido
      const ld = await page.$$eval('script[type="application/ld+json"]', (s) => s.map((x) => JSON.parse(x.textContent)['@type']));
      ok(ld.includes('Restaurant') && ld.includes('FAQPage'), `${et} datos estructurados Restaurant + FAQPage`);

      // Mapa: debe cargar Leaflet con su CSS y pintar teselas
      await page.evaluate(() => document.querySelector('[data-mapa]')?.scrollIntoView());
      await page.waitForTimeout(2500);
      const teselas = await page.locator('[data-mapa] .leaflet-tile-loaded').count();
      const cssLeaflet = await page.evaluate(() => getComputedStyle(document.querySelector('[data-mapa]')).overflow === 'hidden');
      ok(teselas > 0 && cssLeaflet, `${et} el mapa se pinta (${teselas} teselas, CSS de Leaflet ${cssLeaflet ? 'ok' : 'NO cargado'})`);

      ok(errores.length === 0, `${et} sin errores de JavaScript${errores.length ? ': ' + errores.join(' | ') : ''}`);

      // Captura de página completa (se fuerza el pintado de las secciones con content-visibility)
      await page.addStyleTag({ content: 'main > section, body > footer, body > section { content-visibility: visible !important; }' });
      // Recorre la página para que carguen las imágenes diferidas (loading="lazy")
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
      });
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => window.scrollTo(0, 0));
      if (nombre === 'escritorio') {
        if (!REMOTO) await page.screenshot({ path: resolve(capturas, `${nombre}-${lang}.png`), fullPage: true });
      } else {
        // En móvil la captura de página completa sale corrupta (elementos fijos + 100svh):
        // se captura pantalla a pantalla cada sección clave.
        for (const sel of ['#historia', '#carta', '#galeria', '#zona', '#preguntas']) {
          await page.evaluate((s) => document.querySelector(s).scrollIntoView(), sel);
          await page.waitForTimeout(300);
          if (!REMOTO) await page.screenshot({ path: resolve(capturas, `${nombre}-${lang}-${sel.slice(1)}.png`) });
        }
      }
      // Captura del primer pantallazo (volviendo arriba: en móvil el bucle anterior deja la página abajo)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      if (!REMOTO) await page.screenshot({ path: resolve(capturas, `${nombre}-${lang}-hero.png`) });
      await ctx.close();
    }
  }

  // 404 con el diseño de la web
  {
    const ctx = await navegador.newContext();
    const page = await ctx.newPage();
    const r = await page.goto(BASE + '/no-existe/');
    ok(r.status() === 404, 'una ruta inexistente devuelve 404');
    ok((await page.locator('a[href="/"]').count()) > 0 && (await page.locator('h1').count()) === 1, 'la 404 tiene el diseño y enlace al inicio');
    await ctx.close();
  }

  // Sin JavaScript la carta sigue completa (buscadores e IA)
  const ctx = await navegador.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(BASE + '/');
  const platos = await page.locator('.plato-fila').count();
  ok(platos >= 10, `sin JavaScript se ven los ${platos} platos de la carta`);
  const titular = await page.locator('h1').innerText();
  ok(titular.includes('La cocina de siempre'), 'sin JavaScript el titular está en el HTML');
  await ctx.close();
} finally {
  await navegador.close();
  servidor?.kill();
}

console.log(fallos ? `\n${fallos} prueba(s) fallida(s)` : '\nTodas las pruebas superadas');
process.exit(fallos ? 1 : 0);
