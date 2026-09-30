/**
 * Datos del restaurante.
 * - Lo editable (teléfono, horario, menú del día, plato de la casa, carta, galería)
 *   vive en src/contenido/*.json, preparado para el panel del dueño (Fase 4).
 * - Lo fijo (dirección, coordenadas, valoraciones) está aquí mismo.
 * Para reutilizar la plantilla con otro restaurante, se empieza por aquí.
 *
 * `pendiente: true` hace que la web muestre «Por confirmar»
 * (se oculta con PUBLIC_MOSTRAR_PENDIENTES=false).
 * Fuentes de cada dato: docs/fase1-investigacion.md.
 */
import generalRaw from '../contenido/general.json';
import horarioRaw from '../contenido/horario.json';
import menuRaw from '../contenido/menu-del-dia.json';

export type Lang = 'es' | 'en';
export type Texto = Record<Lang, string>;

/** Texto bilingüe completo aunque falte algún idioma. */
export const texto = (t?: Partial<Texto> | null): Texto => ({
  es: t?.es?.trim() ?? '',
  en: t?.en?.trim() ?? '',
});

// Los campos vacíos pueden omitirse en los JSON: se leen todos como opcionales.
type Dia = { abierto?: boolean; apertura?: string; cierre?: string; apertura2?: string; cierre2?: string };
const general = generalRaw as {
  telefono: string;
  platoCasa?: { nombre?: Partial<Texto>; texto?: Partial<Texto>; confirmado?: boolean };
  facebook?: string | null;
  instagram?: string | null;
  tripadvisor?: string | null;
};
const horarioJson = horarioRaw as Record<string, Dia | boolean | undefined>;
const menuJson = menuRaw as {
  precio?: string;
  precioFinde?: string;
  descripcion?: Partial<Texto>;
  confirmado?: boolean;
};

/** "12,50" → 12.5 ; "" → null */
export const aNumero = (s: string | null | undefined) => {
  if (!s || !s.trim()) return null;
  const n = Number(s.replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

const vacioANull = (t: Texto) => (t.es || t.en ? t : null);

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'] as const;

const dias = DIAS.map((clave, i) => {
  const d = (horarioJson[clave] ?? {}) as Dia;
  const tramos: [string, string][] = [];
  if (d.abierto && d.apertura && d.cierre) tramos.push([d.apertura, d.cierre]);
  if (d.abierto && d.apertura2 && d.cierre2) tramos.push([d.apertura2, d.cierre2]);
  return { dia: i + 1, tramos };
});

const soloDigitos = general.telefono.replace(/\D/g, '');

export const restaurante = {
  nombre: 'Parrilla Príncipe', // [VERIFICAR] también aparece como «La Parrilla del Príncipe»

  direccion: {
    calle: 'Calle Floridablanca, 6',
    cp: '28200',
    localidad: 'San Lorenzo de El Escorial',
    provincia: 'Madrid',
    pais: 'ES',
  },
  // Fuente: ficha de Google Maps (coincide con el punto de OpenStreetMap a 3 m).
  geo: { lat: 40.5906385, lng: -4.1455734 },

  telefono: {
    visible: general.telefono,
    enlace: `tel:${soloDigitos.startsWith('34') ? '+' : '+34'}${soloDigitos}`,
    pendiente: true, // [VERIFICAR] hay tres teléfonos publicados en distintas plataformas
  },

  enlaces: {
    comoLlegar: 'https://www.google.com/maps/dir/?api=1&destination=40.5906385,-4.1455734',
    tripadvisor: general.tripadvisor ?? null,
    facebook: general.facebook ?? null,
    instagram: general.instagram ?? null,
  },

  horario: { pendiente: !horarioJson.confirmado, dias },

  menuDelDia: {
    precio: aNumero(menuJson.precio),
    precioFinde: aNumero(menuJson.precioFinde),
    descripcion: texto(menuJson.descripcion),
    pendiente: !menuJson.confirmado,
  },

  platoCasa: {
    nombre: texto(general.platoCasa?.nombre),
    texto: vacioANull(texto(general.platoCasa?.texto)),
    pendiente: !general.platoCasa?.confirmado,
  },

  /**
   * Valoraciones públicas, siempre con fuente y fecha de consulta.
   * Google: ficha de Google Maps. Tripadvisor: ficha pública del restaurante (d989904).
   */
  valoraciones: {
    consultadas: '2026-09-30',
    plataformas: [
      { nombre: 'Google', nota: '4,8', escala: '5', opiniones: 760, url: null as string | null },
      { nombre: 'Tripadvisor', nota: '4,6', escala: '5', opiniones: 113, url: general.tripadvisor ?? null },
    ],
  },

  /**
   * Reseñas reales: fragmentos breves y literales, con autor, fecha y enlace.
   * Fuente: Tripadvisor, consultado el 30/09/2026.
   */
  resenas: [
    {
      cita: { es: 'Un clásico que es excepción en un pueblo tan turístico.', en: null },
      autor: 'paquito',
      fecha: '2026-09',
      plataforma: 'Tripadvisor',
      url: general.tripadvisor ?? null,
    },
    {
      cita: { es: 'Su recomendación del tomate de la huerta un acierto.', en: null },
      autor: 'Angybritish',
      fecha: '2025-08',
      plataforma: 'Tripadvisor',
      url: general.tripadvisor ?? null,
    },
    {
      cita: { es: 'Nos pareció barato para lo bien que comimos.', en: null },
      autor: 'Isabel V',
      fecha: '2025-08',
      plataforma: 'Tripadvisor',
      url: general.tripadvisor ?? null,
    },
  ],
};

export const diasSemana: Record<Lang, string[]> = {
  es: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};
