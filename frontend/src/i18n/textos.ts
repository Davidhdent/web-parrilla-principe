/**
 * Todos los textos de la web en español e inglés.
 * Los datos (horario, teléfono, carta…) viven en src/data y src/contenido; aquí solo va el relato.
 * Todo sale de la investigación (docs/fase1-investigacion.md); lo dudoso lleva `pendiente: true`.
 */
import type { Lang } from '../data/restaurante';

const es = {
  meta: {
    titulo: 'Parrilla Príncipe · Cocina casera junto al Monasterio de El Escorial',
    descripcion:
      'Restaurante de cocina casera en la calle Floridablanca, a unos pasos del Monasterio de San Lorenzo de El Escorial. Menú del día, carnes a la parrilla y terraza a la sombra de los castaños.',
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
  hero: {
    antetitulo: 'Frente al Monasterio de El Escorial',
    titular: 'La cocina de siempre, a la sombra de los castaños.',
    enfasisDesde: 4, // a partir de esta palabra, el titular va en cursiva ámbar
    entradilla:
      'Cocina casera, menú del día y carnes a la parrilla en la calle Floridablanca, a unos pasos del Monasterio.',
    imagenAlt: 'El Monasterio de El Escorial visto desde lo alto, con árboles en flor en primer plano',
  },
  historia: {
    titulo: 'Una casa de las de siempre',
    p1: 'La Parrilla Príncipe está en la calle Floridablanca, en pleno centro histórico de San Lorenzo, a unos pasos del Real Monasterio. El edificio fue durante años también hotel, con salones para comidas de grupo.',
    p1Pendiente: true,
    p2: 'Quien viene suele volver por lo mismo: la cocina casera, un menú del día con mucho donde elegir, la carne a la parrilla y un trato cercano, pendiente de cada mesa.',
    cita: 'Un trato y un ambiente de otros tiempos.',
    citaAutor: 'paquito, en Tripadvisor (septiembre de 2026)',
    huerta:
      'Parte de lo que llega a la mesa sale de la huerta de la casa: los clientes hablan del tomate de la huerta y de la cosecha propia.',
    contadorOpiniones: 'opiniones en Google',
    contadorNota: 'de nota media en Google',
    fotoAlt: 'El equipo de la Parrilla Príncipe',
  },
  platoCasa: {
    etiqueta: 'El plato de la casa',
    fotoAlt: 'Foto del plato de la casa',
  },
  carta: {
    titulo: 'La carta',
    intro:
      'Cocina casera: guisos, pescados, carnes a la parrilla y postres hechos en casa. Pulsa un plato para ver sus detalles y alérgenos.',
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
    titulo: 'Comidas de grupo y celebraciones',
    texto:
      'Cumpleaños, reuniones de familia, comidas de empresa. Llámanos, cuéntanos cuántos sois y organizamos la comida contigo.',
    salones: 'Salones para grupos de 20, 30 y 50 personas.',
    llamar: 'Llamar para organizarlo',
  },
  zona: {
    titulo: 'A unos pasos del Monasterio',
    intro:
      'Estamos en la calle Floridablanca, en el centro histórico. Un buen sitio para comer antes o después de la visita al Monasterio.',
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
    transporte:
      'Desde Madrid: autobuses 661 y 664 desde el intercambiador de Moncloa, o tren de Cercanías hasta la estación de El Escorial.',
    parking: 'Aparcamiento: el público más cercano al Monasterio es Iberpark Monasterio, en la calle del Rey, 45.',
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
    lista: [
      {
        p: '¿Dónde está la Parrilla Príncipe?',
        r: 'La Parrilla Príncipe es un restaurante de cocina casera y carnes a la parrilla en la calle Floridablanca, 6, en el centro histórico de San Lorenzo de El Escorial (Madrid), a unos pasos del Real Monasterio.',
      },
      {
        p: '¿Hace falta reservar?',
        r: 'Es muy recomendable: el local se llena enseguida, sobre todo los fines de semana. Las reservas se hacen por teléfono, en el 696 63 67 65.',
      },
      {
        p: '¿Tienen menú del día?',
        r: 'Sí, entre semana: cinco primeros y cinco segundos a elegir, con pan, bebida, postre y café, por 20 €.',
        pendiente: true,
      },
      {
        p: '¿Tienen terraza?',
        r: 'Sí. Está a la sombra de unos grandes castaños, frente al Monasterio. Dentro, el comedor está climatizado.',
      },
      {
        p: '¿Qué es lo más recomendado?',
        r: 'Los clientes destacan sobre todo los huevos al ajillo, el entrecot a la parrilla, el tomate con ventresca y los postres caseros.',
      },
      {
        p: '¿Se puede ir con niños?',
        r: 'Sí, vienen muchas familias. Si necesitas trona o un plato especial para los pequeños, avísanos al reservar.',
        pendiente: true,
      },
      {
        p: '¿Hay opciones sin gluten o vegetarianas?',
        r: 'Consulta con el personal o llama antes de venir: te indicarán qué platos puedes tomar.',
        pendiente: true,
      },
      {
        p: '¿Organizan comidas de grupo?',
        r: 'Sí. Cumpleaños, reuniones familiares y comidas de empresa: llama y lo organizamos contigo.',
        pendiente: true,
      },
      {
        p: '¿Dónde se puede aparcar?',
        r: 'El aparcamiento público más cercano al Monasterio es Iberpark Monasterio (calle del Rey, 45). El centro histórico tiene poco aparcamiento en la calle.',
        pendiente: true,
      },
      {
        p: '¿Qué formas de pago aceptan?',
        r: 'Tarjeta (Visa y Mastercard) y efectivo.',
        pendiente: true,
      },
    ],
  },
  reserva: {
    titulo: 'Reserva tu mesa',
    texto:
      'Las reservas se hacen por teléfono. Llama con antelación: el local se llena enseguida, sobre todo los fines de semana.',
  },
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
      'Home-cooking restaurant on Calle Floridablanca, a few steps from the Monastery of San Lorenzo de El Escorial, near Madrid. Set lunch menu, grilled meat and a terrace shaded by chestnut trees.',
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
  hero: {
    antetitulo: 'Facing the Monastery of El Escorial',
    titular: 'Cooking of the old school, in the shade of the chestnut trees.',
    enfasisDesde: 5,
    entradilla:
      'Home cooking, a set lunch menu and grilled meat on Calle Floridablanca, a few steps from the Monastery.',
    imagenAlt: 'The Monastery of El Escorial seen from above, with trees in bloom in the foreground',
  },
  historia: {
    titulo: 'A house of the old school',
    p1: 'Parrilla Príncipe is on Calle Floridablanca, in the historic centre of San Lorenzo, a few steps from the Royal Monastery. For years the building was also a hotel, with rooms for group meals.',
    p1Pendiente: true,
    p2: 'Guests tend to come back for the same things: home cooking, a set menu with plenty of choice, meat from the grill and friendly service that looks after every table.',
    cita: 'Service and an atmosphere from another time.',
    citaAutor: 'paquito, on Tripadvisor (September 2026; translated from Spanish)',
    huerta:
      'Some of what reaches the table comes from the house’s own vegetable garden: guests talk about the garden tomatoes and the home-grown produce.',
    contadorOpiniones: 'Google reviews',
    contadorNota: 'average rating on Google',
    fotoAlt: 'The Parrilla Príncipe team',
  },
  platoCasa: {
    etiqueta: 'The house speciality',
    fotoAlt: 'Photo of the house speciality',
  },
  carta: {
    titulo: 'The menu',
    intro:
      'Home cooking: stews, fish, grilled meat and desserts made in-house. Tap a dish to see its details and allergens.',
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
    titulo: 'Group meals and celebrations',
    texto:
      'Birthdays, family gatherings, work lunches. Call us, tell us how many you are and we will plan the meal with you.',
    salones: 'Private rooms for groups of 20, 30 and 50.',
    llamar: 'Call to plan it',
  },
  zona: {
    titulo: 'A few steps from the Monastery',
    intro:
      'We are on Calle Floridablanca, in the historic centre. A good place to eat before or after visiting the Monastery.',
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
    transporte:
      'From Madrid: buses 661 and 664 from the Moncloa bus station, or the Cercanías commuter train to El Escorial station.',
    parking: 'Parking: the nearest public car park to the Monastery is Iberpark Monasterio, Calle del Rey 45.',
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
    lista: [
      {
        p: 'Where is Parrilla Príncipe?',
        r: 'Parrilla Príncipe is a home-cooking restaurant, also known for its grilled meat, at Calle Floridablanca 6, in the historic centre of San Lorenzo de El Escorial (Madrid), a few steps from the Royal Monastery.',
      },
      {
        p: 'Do I need to book?',
        r: 'It is strongly recommended: the restaurant fills up quickly, especially at weekends. Bookings are taken by phone on +34 696 63 67 65.',
      },
      {
        p: 'Is there a set lunch menu?',
        r: 'Yes, on weekdays: a choice of five starters and five mains, with bread, a drink, dessert and coffee, for €20.',
        pendiente: true,
      },
      {
        p: 'Is there a terrace?',
        r: 'Yes. It is shaded by large chestnut trees, facing the Monastery. Inside, the dining room is air-conditioned.',
      },
      {
        p: 'What do guests recommend most?',
        r: 'Guests especially praise the garlic eggs, the grilled entrecôte, the tomato with tuna belly and the homemade desserts.',
      },
      {
        p: 'Can I come with children?',
        r: 'Yes, many families come. If you need a high chair or a special dish for the little ones, let us know when you book.',
        pendiente: true,
      },
      {
        p: 'Are there gluten-free or vegetarian options?',
        r: 'Ask our staff or call before your visit and they will tell you which dishes suit you.',
        pendiente: true,
      },
      {
        p: 'Do you host group meals?',
        r: 'Yes. Birthdays, family gatherings and work lunches: call us and we will plan it with you.',
        pendiente: true,
      },
      {
        p: 'Where can I park?',
        r: 'The nearest public car park to the Monastery is Iberpark Monasterio (Calle del Rey 45). Street parking in the historic centre is scarce.',
        pendiente: true,
      },
      {
        p: 'Which payment methods do you accept?',
        r: 'Card (Visa and Mastercard) and cash.',
        pendiente: true,
      },
    ],
  },
  reserva: {
    titulo: 'Book your table',
    texto:
      'Bookings are taken by phone. Call ahead: the restaurant fills up quickly, especially at weekends.',
  },
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
