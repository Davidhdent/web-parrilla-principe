/**
 * Panel del restaurante (Keystatic) · /keystatic
 *
 * Todo lo que el dueño puede editar vive en src/contenido/*.json.
 * La web lee esos archivos al compilar, así que sigue siendo HTML estático.
 *
 * Almacenamiento:
 *  - En desarrollo: 'local' (guarda directamente en los archivos del proyecto).
 *  - En producción: 'github' (cada guardado es un commit y la web se regenera sola).
 *    Se activa con PUBLIC_KEYSTATIC_GITHUB_REPO="usuario/repositorio" (ver docs/panel.md).
 */
import { config, fields, singleton } from '@keystatic/core';
import { ALERGENOS } from './src/data/alergenos';

const repo = import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}` | undefined;

/** Campo doble español / inglés. */
const bilingue = (label: string, opciones: { multilinea?: boolean; obligatorio?: boolean; ayuda?: string } = {}) =>
  fields.object(
    {
      es: fields.text({
        label: `${label} · español`,
        multiline: opciones.multilinea,
        validation: opciones.obligatorio ? { length: { min: 1 } } : undefined,
      }),
      en: fields.text({ label: `${label} · inglés`, multiline: opciones.multilinea }),
    },
    { label, description: opciones.ayuda, layout: [6, 6] },
  );

const precio = (label: string, ayuda = 'Ej.: 12,50. Déjalo vacío para no mostrar precio.') =>
  fields.text({ label, description: ayuda, validation: { pattern: { regex: /^$|^\d{1,3}([.,]\d{1,2})?$/, message: 'Escribe solo el número, p. ej. 12,50' } } });

const hora = (label: string) =>
  fields.text({ label, description: 'Formato 24 h, p. ej. 13:30', validation: { pattern: { regex: /^$|^([01]\d|2[0-3]):[0-5]\d$/, message: 'Usa el formato HH:MM' } } });

const dia = (nombre: string) =>
  fields.object(
    {
      abierto: fields.checkbox({ label: 'Abierto', defaultValue: true }),
      apertura: hora('Abre'),
      cierre: hora('Cierra'),
      apertura2: hora('Abre de nuevo (opcional, p. ej. para las cenas)'),
      cierre2: hora('Cierra de nuevo (opcional)'),
    },
    { label: nombre, layout: [12, 3, 3, 3, 3] },
  );

const revisado = (label = 'Datos revisados por el restaurante') =>
  fields.checkbox({ label, description: 'Mientras no esté marcado, la web muestra «Por confirmar» y no se envía a Google.' });

/** Foto subida desde el panel (portada, la casa, plato de la casa, Grupos). */
const foto = (label: string, ayuda: string) =>
  fields.image({
    label,
    description: `${ayuda} Déjala vacía para usar la foto actual.`,
    directory: 'src/assets/img/panel',
    publicPath: '../assets/img/panel/',
  });

export default config({
  storage: repo ? { kind: 'github', repo } : { kind: 'local' },
  ui: {
    brand: { name: 'Parrilla Príncipe' },
    navigation: {
      'Cada día': ['menuDelDia', 'horario'],
      'La carta': ['carta'],
      'La web': ['textos', 'general', 'galeria'],
    },
  },
  singletons: {
    menuDelDia: singleton({
      label: 'Menú del día',
      path: 'src/contenido/menu-del-dia',
      format: { data: 'json' },
      schema: {
        precio: precio('Precio entre semana (€)'),
        precioFinde: precio('Precio fin de semana (€)', 'Opcional. Déjalo vacío si no hay menú el fin de semana o cuesta lo mismo.'),
        descripcion: bilingue('Qué incluye y qué días', { multilinea: true }),
        confirmado: revisado(),
      },
    }),

    horario: singleton({
      label: 'Horario',
      path: 'src/contenido/horario',
      format: { data: 'json' },
      schema: {
        lunes: dia('Lunes'),
        martes: dia('Martes'),
        miercoles: dia('Miércoles'),
        jueves: dia('Jueves'),
        viernes: dia('Viernes'),
        sabado: dia('Sábado'),
        domingo: dia('Domingo'),
        confirmado: revisado('Horario revisado por el restaurante'),
      },
    }),

    carta: singleton({
      label: 'Carta',
      path: 'src/contenido/carta',
      format: { data: 'json' },
      schema: {
        categorias: fields.array(
          fields.object({
            id: fields.text({ label: 'Identificador', description: 'Sin espacios ni tildes, p. ej. postres. No cambiarlo una vez publicado.', validation: { length: { min: 1 } } }),
            nombre: bilingue('Nombre de la sección', { obligatorio: true }),
            platos: fields.array(
              fields.object({
                id: fields.text({ label: 'Identificador', description: 'Sin espacios ni tildes, p. ej. huevos-ajillo.', validation: { length: { min: 1 } } }),
                nombre: bilingue('Nombre del plato', { obligatorio: true }),
                descripcion: bilingue('Descripción', { multilinea: true }),
                precio: precio('Precio (€)'),
                alergenosConfirmados: fields.checkbox({
                  label: 'Alérgenos revisados',
                  description: 'Márcalo solo cuando la lista esté comprobada. Si no, la web invita a preguntar al personal.',
                }),
                alergenos: fields.multiselect({
                  label: 'Alérgenos (Reglamento UE 1169/2011)',
                  options: Object.entries(ALERGENOS).map(([value, t]) => ({ value, label: t.es })),
                }),
                maridaje: bilingue('Maridaje recomendado (opcional)'),
                vegetariano: fields.checkbox({ label: 'Vegetariano' }),
                sinGluten: fields.checkbox({ label: 'Sin gluten' }),
                temporada: fields.checkbox({ label: 'De temporada' }),
              }),
              {
                label: 'Platos',
                itemLabel: (p) => p.fields.nombre.fields.es.value || 'Plato nuevo',
              },
            ),
          }),
          {
            label: 'Secciones de la carta',
            itemLabel: (c) => c.fields.nombre.fields.es.value || 'Sección nueva',
          },
        ),
      },
    }),

    textos: singleton({
      label: 'Textos de la web',
      path: 'src/contenido/textos',
      format: { data: 'json' },
      schema: {
        portada: fields.object(
          {
            antetitulo: bilingue('Frase pequeña sobre el titular'),
            titular: bilingue('Titular (parte en letra normal)', { obligatorio: true }),
            titularCursiva: bilingue('Titular (parte final, en cursiva dorada)'),
            entradilla: bilingue('Texto bajo el titular', { multilinea: true }),
            imagen: foto('Foto de fondo de la portada', 'Horizontal y de buena calidad (más de 2000 px de ancho).'),
            imagenAlt: bilingue('Descripción de la foto para personas ciegas'),
          },
          { label: 'Portada (lo primero que se ve)' },
        ),
        casa: fields.object(
          {
            titulo: bilingue('Título', { obligatorio: true }),
            parrafo1: bilingue('Primer párrafo', { multilinea: true }),
            parrafo2: bilingue('Segundo párrafo', { multilinea: true }),
            parrafoHuerta: bilingue('Párrafo de la huerta', { multilinea: true }),
            confirmado: revisado('Textos revisados por el restaurante'),
            foto: foto('Foto de la casa', 'Vertical: el equipo, la fachada o el comedor.'),
            fotoAlt: bilingue('Descripción de la foto para personas ciegas'),
          },
          { label: 'La casa' },
        ),
        carta: fields.object(
          { intro: bilingue('Texto de presentación de la carta', { multilinea: true }) },
          { label: 'La carta' },
        ),
        grupos: fields.object(
          {
            titulo: bilingue('Título', { obligatorio: true }),
            texto: bilingue('Texto', { multilinea: true }),
            salones: bilingue('Frase de los salones'),
            salonesConfirmado: revisado('Salones revisados por el restaurante'),
            foto: foto('Foto de la sección', 'Horizontal: una celebración, el salón o una mesa preparada.'),
          },
          { label: 'Comidas de grupo y celebraciones' },
        ),
        zona: fields.object(
          {
            titulo: bilingue('Título', { obligatorio: true }),
            intro: bilingue('Texto de presentación', { multilinea: true }),
            transporte: bilingue('Cómo llegar en transporte público', { multilinea: true }),
            parking: bilingue('Dónde aparcar', { multilinea: true }),
            confirmado: revisado('Transporte y aparcamiento revisados'),
          },
          { label: 'Cómo llegar' },
        ),
        reserva: fields.object(
          {
            titulo: bilingue('Título', { obligatorio: true }),
            texto: bilingue('Texto', { multilinea: true }),
          },
          { label: 'Bloque «Reserva tu mesa»' },
        ),
        preguntas: fields.array(
          fields.object({
            pregunta: bilingue('Pregunta', { obligatorio: true }),
            respuesta: bilingue('Respuesta', { multilinea: true }),
            confirmada: fields.checkbox({
              label: 'Respuesta revisada por el restaurante',
              description: 'Mientras no esté marcada, la web muestra «Por confirmar» y la pregunta no se envía a Google.',
            }),
          }),
          { label: 'Preguntas frecuentes', itemLabel: (q) => q.fields.pregunta.fields.es.value || 'Pregunta nueva' },
        ),
      },
    }),

    general: singleton({
      label: 'Datos generales',
      path: 'src/contenido/general',
      format: { data: 'json' },
      schema: {
        telefono: fields.text({ label: 'Teléfono de reservas', description: 'Tal como se mostrará, p. ej. 696 63 67 65', validation: { length: { min: 9 } } }),
        telefonoConfirmado: revisado('Teléfono revisado por el restaurante'),
        platoCasa: fields.object(
          {
            nombre: bilingue('Nombre del plato de la casa', { obligatorio: true }),
            texto: bilingue('Texto de la sección', { multilinea: true }),
            foto: foto('Foto del plato', 'Vertical, del plato servido.'),
            confirmado: fields.checkbox({ label: 'Confirmado por el restaurante' }),
          },
          { label: 'Plato de la casa' },
        ),
        facebook: fields.url({ label: 'Facebook (opcional)' }),
        instagram: fields.url({ label: 'Instagram (opcional)' }),
        tripadvisor: fields.url({ label: 'Tripadvisor (opcional)' }),
      },
    }),

    galeria: singleton({
      label: 'Galería de fotos',
      path: 'src/contenido/galeria',
      format: { data: 'json' },
      schema: {
        fotos: fields.array(
          fields.object({
            imagen: fields.image({
              label: 'Foto',
              description: 'JPG o PNG horizontal, idealmente de más de 1600 px de ancho. Sin foto, se muestra un marcador.',
              directory: 'src/assets/img/galeria',
              publicPath: '../assets/img/galeria/',
            }),
            titulo: bilingue('Título', { obligatorio: true }),
            texto: bilingue('Texto al ampliar la foto', { multilinea: true }),
            alt: bilingue('Descripción para personas ciegas', { ayuda: 'Describe lo que se ve en la foto.' }),
            formato: fields.select({
              label: 'Tamaño en el mosaico',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Ancha', value: 'ancha' },
                { label: 'Alta', value: 'alta' },
              ],
              defaultValue: 'normal',
            }),
            credito: fields.text({ label: 'Crédito (solo si la foto no es del restaurante)' }),
          }),
          { label: 'Fotos', itemLabel: (f) => f.fields.titulo.fields.es.value || 'Foto nueva' },
        ),
      },
    }),
  },
});
