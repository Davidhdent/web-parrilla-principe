/**
 * Imágenes de la web y sus créditos.
 * Mientras no lleguen las fotos del restaurante se usan fotos de Unsplash
 * (licencia Unsplash: uso libre; se cita al autor en el pie) solo para
 * ambiente (Monasterio, la parrilla en Grupos), nunca para hacer pasar un plato por suyo.
 * Lo propio del restaurante (platos, terraza, comedor) va como marcador «Foto pendiente».
 * La galería se lee de src/contenido/galeria.json; sus fotos van en src/assets/img/galeria/.
 */
import type { ImageMetadata } from 'astro';
import { texto, type Texto } from './restaurante';
import galeriaJson from '../contenido/galeria.json';
import pinzasParrilla from '../assets/img/pinzas-parrilla.jpg';
import monasterioCupula from '../assets/img/monasterio-cupula.jpg';
// Foto del propio restaurante, publicada en su Facebook (604×453). No está hecha desde el local:
// no presentarla como «vista desde la terraza». Pedir al dueño el archivo original en más resolución.
import monasterioVista from '../assets/img/monasterio-vista.jpg';
import monasterioTorre from '../assets/img/galeria/monasterio-torre.jpg';
import monasterioFachada from '../assets/img/galeria/monasterio-fachada.jpg';

export interface Credito {
  autor: string;
  licencia: string;
  licenciaUrl: string;
  origen: string;
}

const unsplash = (autor: string, id: string): Credito => ({
  autor,
  licencia: 'Licencia Unsplash',
  licenciaUrl: 'https://unsplash.com/license',
  origen: `https://unsplash.com/photos/${id}`,
});

export const fotos = {
  monasterioVista: {
    src: monasterioVista,
    credito: {
      autor: 'Parrilla Príncipe (foto del Monasterio publicada en su Facebook)',
      licencia: 'Foto propia del restaurante',
      licenciaUrl: '',
      origen: 'https://www.facebook.com/p/Restaurante-PARRILLA-PRINCIPE-100070293513731/',
    },
  },
  pinzasParrilla: { src: pinzasParrilla, credito: unsplash('Paul Hermann', 'jeiqzOgwwKU') },
  monasterioCupula: { src: monasterioCupula, credito: unsplash('Hernan Gonzalez', '2jBlzNmelIw') },
  monasterioTorre: { src: monasterioTorre, credito: unsplash('Fernando Mola-Davis', 'Z939vzXyUvU') },
  monasterioFachada: { src: monasterioFachada, credito: unsplash('Alejandro Pohlenz', 'h99RwnB0Sso') },
} satisfies Record<string, { src: ImageMetadata; credito: Credito }>;

export interface FotoGaleria {
  id: string;
  src: ImageMetadata | null; // null = marcador de posición
  alt: Texto;
  titulo: Texto;
  texto: Texto;
  formato: 'alta' | 'ancha' | 'normal';
  credito: string;
}

const subidas = import.meta.glob<ImageMetadata>('../assets/img/galeria/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

type FotoJson = {
  imagen?: string | null;
  titulo?: Partial<Texto>;
  texto?: Partial<Texto>;
  alt?: Partial<Texto>;
  formato?: string;
  credito?: string;
};

export const galeria: FotoGaleria[] = ((galeriaJson.fotos ?? []) as FotoJson[]).map((f, i) => ({
  id: `foto-${i}`,
  src: (f.imagen && subidas[f.imagen]) || null,
  alt: texto(f.alt),
  titulo: texto(f.titulo),
  texto: texto(f.texto),
  formato: (['alta', 'ancha'].includes(f.formato ?? '') ? f.formato : 'normal') as FotoGaleria['formato'],
  credito: f.credito?.trim() ?? '',
}));
