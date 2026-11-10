/**
 * Imágenes de la web y sus créditos.
 * Mientras no lleguen las fotos del restaurante se usan fotos de Unsplash
 * (licencia Unsplash: uso libre; se cita al autor en el pie) solo para
 * ambiente (Monasterio, un brindis en Grupos), nunca para hacer pasar un plato o el local por suyos.
 * El restaurante ya no tiene parrilla: no usar fotos de brasas ni de parrilla.
 * Lo propio del restaurante (platos, terraza, comedor) va como marcador «Foto pendiente».
 * La galería se lee de src/contenido/galeria.json; sus fotos van en src/assets/img/galeria/.
 */
import type { ImageMetadata } from 'astro';
import { texto, type Texto } from './restaurante';
import galeriaJson from '../contenido/galeria.json';
import brindis from '../assets/img/brindis.jpg';
import monasterioCupula from '../assets/img/monasterio-cupula.jpg';
// Portada: el Monasterio desde el estanque del Jardín de los Frailes (2400×1350).
// Sustituye a la foto del Facebook del restaurante, que solo medía 604 px.
import monasterioEstanque from '../assets/img/monasterio-estanque.jpg';
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
  monasterioEstanque: { src: monasterioEstanque, credito: unsplash('Tiplister', 'HsBrRGGrQ0U') },
  brindis: { src: brindis, credito: unsplash('Micaela Peduzi', 'ch4Fc1cGTq4') },
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
