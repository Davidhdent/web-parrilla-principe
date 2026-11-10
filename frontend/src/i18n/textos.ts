/**
 * Todos los textos de la web en español e inglés.
 * - Los textos que edita la dueña desde el panel (portada, la casa, Grupos, Cómo llegar,
 *   reserva, preguntas frecuentes) viven en src/contenido/textos.json.
 * - Aquí quedan los textos de la interfaz (menús, botones, etiquetas) y lo que no conviene
 *   que se toque sin revisión (reseñas, lugares de la zona, avisos legales).
 * Los datos (horario, teléfono, carta…) viven en src/data y src/contenido.
 */
import { texto, type Lang, type Texto } from '../data/restaurante';
import panelJson from '../contenido/textos.json';

// Los campos vacíos pueden faltar en el JSON (el panel los omite al guardar): todo opcional.
type Bi = Partial<Texto> | null | undefined;
const panel = panelJson as {
  portada?: { antetitulo?: Bi; titular?: Bi; titularCursiva?: Bi; entradilla?: Bi; imagen?: string | null; imagenAlt?: Bi };
  casa?: { titulo?: Bi; parrafo1?: Bi; parrafo2?: Bi; parrafoHuerta?: Bi; confirmado?: boolean; foto?: string | null; fotoAlt?: Bi };
  carta?: { intro?: Bi };
  grupos?: { titulo?: Bi; texto?: Bi; salones?: Bi; salonesConfirmado?: boolean; foto?: string | null };
  zona?: { titulo?: Bi; intro?: Bi; transporte?: Bi; parking?: Bi; confirmado?: boolean };
  reserva?: { titulo?: Bi; texto?: Bi };
  preguntas?: { pregunta?: Bi; respuesta?: Bi; confirmada?: boolean }[];
};

/** Rutas de las fotos subidas desde el panel (se resuelven en src/data/imagenes.ts). */
export const fotosPanel = {
  portada: panel.portada?.imagen ?? null,
  casa: panel.casa?.foto ?? null,
  grupos: panel.grupos?.foto ?? null,
};

/** Textos editables desde el panel, en un idioma. */
const editable = (lang: Lang) => {
  const v = (t: Bi) => texto(t)[lang];
  return {
    hero: {
      antetitulo: v(panel.portada?.antetitulo),
      titular: v(panel.portada?.titular),
      titularCursiva: v(panel.portada?.titularCursiva),
      entradilla: v(panel.portada?.entradilla),
      imagenAlt: v(panel.portada?.imagenAlt),
    },
    historia: {
      titulo: v(panel.casa?.titulo),
      p1: v(panel.casa?.parrafo1),
      p2: v(panel.casa?.parrafo2),
      huerta: v(panel.casa?.parrafoHuerta),
      pendiente: !panel.casa?.confirmado,
      fotoAlt: v(panel.casa?.fotoAlt),
    },
    cartaIntro: v(panel.carta?.intro),
    grupos: {
      titulo: v(panel.grupos?.titulo),
      texto: v(panel.grupos?.texto),
      salones: v(panel.grupos?.salones),
      salonesPendiente: !panel.grupos?.salonesConfirmado,
    },
    zona: {
      titulo: v(panel.zona?.titulo),
      intro: v(panel.zona?.intro),
      transporte: v(panel.zona?.transporte),
      parking: v(panel.zona?.parking),
      pendiente: !panel.zona?.confirmado,
    },
    reserva: { titulo: v(panel.reserva?.titulo), texto: v(panel.reserva?.texto) },
    preguntas: (panel.preguntas ?? [])
      .map((q) => ({ p: v(q.pregunta), r: v(q.respuesta), pendiente: !q.confirmada }))
      .filter((q) => q.p && q.r),
  };
};
const E = { es: editable('es'), en: editable('en') };

const es = {
  meta: {
    titulo: 'Parrilla Príncipe · Cocina casera junto al Monasterio de El Escorial',
    descripcion:
      'Restaurante de cocina casera en la calle Floridablanca, a unos pasos del Monasterio de San Lorenzo de El Escorial. Menú del día, guisos, carnes y pescados, y terraza a la sombra de los castaños.',
  },
  nav: {
    historia: 'La casa',
    carta: 'Carta',
    galeria: 'Galería',
    grupos: 'Grupos',
    zona: 'Cómo llegar',
    preguntas: 'Preguntas',
    menu: 'Menú',
    cerrar: 'Cerrar',
    idioma: 'English',
    idiomaCorto: 'EN',
    saltar: 'Saltar al contenido',
  },
  acciones: {
    llamar: 'Llamar para reservar',
    llamarCorto: 'Llamar',
    comoLlegar: 'Cómo llegar',
    verCarta: 'Ver la carta',
    carta: 'Carta',
  },
  pendiente: 'Por confirmar',
  hero: E.es.hero,
  historia: {
    ...E.es.historia,
    cita: 'Un trato y un ambiente de otros tiempos.',
    citaAutor: 'paquito, en Tripadvisor (septiembre de 2026)',
    contadorOpiniones: 'opiniones en Google',
    contadorNota: 'de nota media en Google',
  },
  platoCasa: {
    etiqueta: 'El plato de la casa',
    fotoAlt: 'Foto del plato de la casa',
  },
  carta: {
    titulo: 'La carta',
    intro: E.es.cartaIntro,
    provisional:
      'Carta provisional con los platos que más citan los clientes. Precios y alérgenos, pendientes de la carta oficial.',
    filtros: 'Filtrar',
    filtroVegetariano: 'Vegetariano',
    filtroSinGluten: 'Sin gluten',
    filtroTemporada: 'De temporada',
    filtrosPendientes: 'Los filtros se activarán cuando el restaurante confirme esta información.',
    alergenos: 'Alérgenos',
    alergenosPendientes:
      'Alérgenos pendientes de confirmar. Si tienes alguna alergia o intolerancia, pregunta al personal o llama antes de venir.',
    sinAlergenos: 'Sin alérgenos de declaración obligatoria.',
    maridaje: 'Maridaje',
    precio: 'Precio',
    precioPendiente: 'Precio por confirmar',
    menuDia: 'Menú del día',
    menuDiaPrecio: 'Precio por confirmar',
    menuDiaFinde: 'Fines de semana:',
    menuDiaNota: 'IVA incluido',
  },
  galeria: {
    titulo: 'La casa, la terraza y el Monasterio',
    ver: 'Ver',
    cerrar: 'Cerrar',
    anterior: 'Anterior',
    siguiente: 'Siguiente',
    fotoPendiente: 'Foto pendiente',
  },
  grupos: {
    ...E.es.grupos,
    llamar: 'Llamar para organizarlo',
  },
  zona: {
    ...E.es.zona,
    lugares: [
      {
        nombre: 'Real Monasterio de El Escorial',
        texto: 'Patrimonio Mundial de la UNESCO desde 1984. La gran obra de Felipe II, en granito de la sierra de Guadarrama.',
      },
      {
        nombre: 'El centro histórico',
        texto: 'Alrededor del restaurante están las Cocheras del Rey, el Real Coliseo de Carlos III y las casas de oficios del Real Sitio.',
      },
      {
        nombre: 'Carne de la sierra',
        texto: 'La carne de vacuno de la sierra de Guadarrama tiene indicación geográfica protegida, y El Escorial está dentro de su zona.',
      },
    ],
    direccion: 'Dirección',
    telefono: 'Teléfono',
    horario: 'Horario',
    cerrado: 'Cerrado',
    llegar: 'Cómo llegar',
    mapaAlt: 'Mapa con la ubicación de la Parrilla Príncipe',
  },
  opiniones: {
    titulo: 'Lo que dicen quienes han venido',
    intro:
      'Lo que más se repite en las reseñas: el trato, el menú del día y la terraza a la sombra. Estas son las valoraciones públicas y algunas opiniones reales.',
    opinionesLabel: 'opiniones',
    sobre: 'sobre',
    consultadas: 'Datos consultados el 30 de septiembre de 2026.',
    leerMas: 'Leer las opiniones',
    idiomaOriginal: '',
    meses: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
  },
  preguntas: {
    titulo: 'Preguntas frecuentes',
    lista: E.es.preguntas,
  },
  reserva: E.es.reserva,
  pie: {
    avisoLegal: 'Aviso legal',
    privacidad: 'Privacidad',
    cookies: 'Cookies',
    creditos: 'Créditos de las imágenes',
    creditosTexto: 'Fotografías de ambiente de Unsplash. Las fotos del restaurante llegarán pronto.',
    derechos: 'Parrilla Príncipe',
    redes: 'Síguenos',
  },
  error404: {
    titulo: 'Esta página no está en la carta',
    texto: 'La dirección que buscas no existe o ha cambiado. Desde el inicio puedes ver la carta, el horario y cómo llegar.',
    volver: 'Volver al inicio',
  },
};

type Textos = typeof es;

const en: Textos = {
  meta: {
    titulo: 'Parrilla Príncipe · Home cooking by the Monastery of El Escorial',
    descripcion:
      'Home-cooking restaurant on Calle Floridablanca, a few steps from the Monastery of San Lorenzo de El Escorial, near Madrid. Set lunch menu, stews, meat and fish, and a terrace shaded by chestnut trees.',
  },
  nav: {
    historia: 'The house',
    carta: 'Food',
    galeria: 'Gallery',
    grupos: 'Groups',
    zona: 'Getting here',
    preguntas: 'FAQ',
    menu: 'Menu',
    cerrar: 'Close',
    idioma: 'Español',
    idiomaCorto: 'ES',
    saltar: 'Skip to content',
  },
  acciones: {
    llamar: 'Call to book',
    llamarCorto: 'Call',
    comoLlegar: 'Directions',
    verCarta: 'See the menu',
    carta: 'Menu',
  },
  pendiente: 'To be confirmed',
  hero: E.en.hero,
  historia: {
    ...E.en.historia,
    cita: 'Service and an atmosphere from another time.',
    citaAutor: 'paquito, on Tripadvisor (September 2026; translated from Spanish)',
    contadorOpiniones: 'Google reviews',
    contadorNota: 'average rating on Google',
  },
  platoCasa: {
    etiqueta: 'The house speciality',
    fotoAlt: 'Photo of the house speciality',
  },
  carta: {
    titulo: 'The menu',
    intro: E.en.cartaIntro,
    provisional:
      'Provisional menu with the dishes guests mention most. Prices and allergens will follow with the official menu.',
    filtros: 'Filter',
    filtroVegetariano: 'Vegetarian',
    filtroSinGluten: 'Gluten-free',
    filtroTemporada: 'Seasonal',
    filtrosPendientes: 'Filters will be enabled once the restaurant confirms this information.',
    alergenos: 'Allergens',
    alergenosPendientes:
      'Allergens to be confirmed. If you have an allergy or intolerance, ask our staff or call before your visit.',
    sinAlergenos: 'No allergens requiring declaration.',
    maridaje: 'Pairing',
    precio: 'Price',
    precioPendiente: 'Price to be confirmed',
    menuDia: 'Set lunch menu',
    menuDiaPrecio: 'Price to be confirmed',
    menuDiaFinde: 'Weekends:',
    menuDiaNota: 'VAT included',
  },
  galeria: {
    titulo: 'The house, the terrace and the Monastery',
    ver: 'View',
    cerrar: 'Close',
    anterior: 'Previous',
    siguiente: 'Next',
    fotoPendiente: 'Photo coming soon',
  },
  grupos: {
    ...E.en.grupos,
    llamar: 'Call to plan it',
  },
  zona: {
    ...E.en.zona,
    lugares: [
      {
        nombre: 'Royal Monastery of El Escorial',
        texto: 'A UNESCO World Heritage Site since 1984. Philip II’s great work, built in granite from the Guadarrama mountains.',
      },
      {
        nombre: 'The historic centre',
        texto: 'Around the restaurant stand the Royal Coach Houses, the Royal Coliseum of Charles III and the old service buildings of the Royal Site.',
      },
      {
        nombre: 'Mountain beef',
        texto: 'Beef from the Guadarrama mountains has its own Protected Geographical Indication, and El Escorial lies within its area.',
      },
    ],
    direccion: 'Address',
    telefono: 'Phone',
    horario: 'Opening hours',
    cerrado: 'Closed',
    llegar: 'Getting here',
    mapaAlt: 'Map showing the location of Parrilla Príncipe',
  },
  opiniones: {
    titulo: 'What our guests say',
    intro:
      'What comes up again and again: the service, the set lunch menu and the shady terrace. These are the public ratings and a few real reviews.',
    opinionesLabel: 'reviews',
    sobre: 'out of',
    consultadas: 'Figures checked on 30 September 2026.',
    leerMas: 'Read the reviews',
    idiomaOriginal: 'Original review in Spanish.',
    meses: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  },
  preguntas: {
    titulo: 'Frequently asked questions',
    lista: E.en.preguntas,
  },
  reserva: E.en.reserva,
  pie: {
    avisoLegal: 'Legal notice',
    privacidad: 'Privacy',
    cookies: 'Cookies',
    creditos: 'Image credits',
    creditosTexto: 'Mood photographs from Unsplash. Photos of the restaurant are coming soon.',
    derechos: 'Parrilla Príncipe',
    redes: 'Follow us',
  },
  error404: {
    titulo: 'This page is not on the menu',
    texto: 'The address you are looking for does not exist or has changed. From the home page you can see the menu, opening hours and directions.',
    volver: 'Back to home',
  },
};

export const textos: Record<Lang, Textos> = { es, en };
export const t = (lang: Lang) => textos[lang];

/** Rutas de cada idioma (para el selector y hreflang). */
export const rutaIdioma: Record<Lang, string> = { es: '/', en: '/en/' };
