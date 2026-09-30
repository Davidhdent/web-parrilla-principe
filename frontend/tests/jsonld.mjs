/**
 * Comprueba los datos estructurados de la web compilada (dist/).
 *   npm run build && node tests/jsonld.mjs
 * - Cada bloque application/ld+json es JSON válido.
 * - Restaurant con los campos clave; Menu con secciones; FAQPage con preguntas.
 * - Los datos pendientes (teléfono, horario) NO aparecen mientras no estén confirmados.
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const general = JSON.parse(await readFile(resolve(dist, '../src/contenido/general.json'), 'utf8'));
const horario = JSON.parse(await readFile(resolve(dist, '../src/contenido/horario.json'), 'utf8'));
let fallos = 0;
const ok = (c, m) => { console.log(`${c ? '✔' : '✘'} ${m}`); if (!c) fallos++; };

for (const pagina of ['index.html', 'en/index.html']) {
  const html = await readFile(resolve(dist, pagina), 'utf8');
  const bloques = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]);
  let datos = [];
  try { datos = bloques.map((b) => JSON.parse(b)); ok(true, `${pagina}: ${bloques.length} bloques JSON-LD válidos`); }
  catch (e) { ok(false, `${pagina}: JSON-LD inválido (${e.message})`); continue; }

  const r = datos.find((d) => d['@type'] === 'Restaurant');
  ok(!!r, `${pagina}: hay Restaurant`);
  if (r) {
    for (const campo of ['name', 'address', 'geo', 'servesCuisine', 'priceRange', 'acceptsReservations', 'hasMap', 'hasMenu', 'sameAs', 'image', 'url']) {
      ok(r[campo] !== undefined, `${pagina}: Restaurant.${campo}`);
    }
    ok(r.hasMenu?.hasMenuSection?.length >= 3, `${pagina}: Menu con ${r.hasMenu?.hasMenuSection?.length} secciones`);
    ok(!('aggregateRating' in r), `${pagina}: sin aggregateRating autodeclarado`);
    ok(general.telefonoConfirmado ? !!r.telephone : !r.telephone, `${pagina}: teléfono solo si está confirmado`);
    ok(horario.confirmado ? !!r.openingHoursSpecification : !r.openingHoursSpecification, `${pagina}: horario solo si está confirmado`);
  }
  const faq = datos.find((d) => d['@type'] === 'FAQPage');
  ok(faq?.mainEntity?.length >= 3, `${pagina}: FAQPage con ${faq?.mainEntity?.length} preguntas confirmadas`);
}

console.log(fallos ? `\n${fallos} comprobación(es) fallida(s)` : '\nJSON-LD correcto');
process.exit(fallos ? 1 : 0);
