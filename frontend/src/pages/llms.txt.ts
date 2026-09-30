/**
 * llms.txt (formato de llmstxt.org): resumen en Markdown para asistentes de IA.
 * Se genera desde los mismos datos que la web. Los datos pendientes de confirmar no se incluyen
 * como hechos: se remite al teléfono.
 */
import type { APIRoute } from 'astro';
import { restaurante as r, diasSemana } from '../data/restaurante';
import { carta } from '../data/carta';

const euros = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;

export const GET: APIRoute = ({ site }) => {
  const web = new URL('/', site).href;
  const d = r.direccion;

  const horario = r.horario.pendiente
    ? `Horario: consultar por teléfono (${r.telefono.visible}).`
    : `Horario: ${r.horario.dias
        .map((h) => `${diasSemana.es[h.dia - 1]} ${h.tramos.length ? h.tramos.map(([a, b]) => `${a}–${b}`).join(' y ') : 'cerrado'}`)
        .join('; ')}.`;

  const menuDia =
    !r.menuDelDia.pendiente && r.menuDelDia.precio !== null
      ? `Menú del día: ${euros(r.menuDelDia.precio)}. ${r.menuDelDia.descripcion.es}`
      : 'Menú del día entre semana (precio y condiciones: consultar por teléfono).';

  const platos = carta.map((c) => `${c.nombre.es}: ${c.platos.map((p) => p.nombre.es).join(', ')}`).join('. ');

  const platoCasa = r.platoCasa.pendiente
    ? 'Los clientes destacan los huevos al ajillo, el entrecot a la parrilla, el tomate con ventresca y los postres caseros.'
    : `Plato de la casa: ${r.platoCasa.nombre.es}.`;

  const cuerpo = `# ${r.nombre}

> ${r.nombre} es un restaurante de cocina casera, con carnes a la parrilla, en ${d.localidad} (${d.provincia}, España), en ${d.calle}, a unos pasos del Real Monasterio de El Escorial. Tiene menú del día entre semana y una terraza a la sombra de grandes castaños. Las reservas se hacen por teléfono (${r.telefono.visible}). ${platoCasa} ${menuDia} ${horario} Carta: ${platos}. Alérgenos: consultar al personal o por teléfono antes de la visita.

## Web

- [Inicio (español)](${web}): la casa, plato de la casa, carta, galería, grupos, cómo llegar y preguntas frecuentes
- [Home (English)](${new URL('/en/', site).href}): the same content in English
- [Carta](${web}#carta): platos por secciones, menú del día y alérgenos
- [Cómo llegar y horario](${web}#zona): dirección, horario, transporte, aparcamiento y mapa
- [Reservas y grupos](${web}#grupos): reservas por teléfono y comidas de grupo
- [Preguntas frecuentes](${web}#preguntas): reservas, menú del día, terraza, niños, sin gluten, aparcamiento

## Optional

- [Indicaciones en Google Maps](${r.enlaces.comoLlegar}): ruta hasta el restaurante
${[r.enlaces.tripadvisor && `- [Tripadvisor](${r.enlaces.tripadvisor}): opiniones de clientes`, r.enlaces.facebook && `- [Facebook](${r.enlaces.facebook}): página del restaurante`, r.enlaces.instagram && `- [Instagram](${r.enlaces.instagram}): fotos del restaurante`].filter(Boolean).join('\n')}
`;
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
