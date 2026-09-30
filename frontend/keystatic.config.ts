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

export default config({
  storage: repo ? { kind: 'github', repo } : { kind: 'local' },
  ui: {
    brand: { name: 'Parrilla Príncipe' },
    navigation: {
      'Cada día': ['menuDelDia', 'horario'],
      'La carta': ['carta'],
      'La web': ['general', 'galeria'],
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
