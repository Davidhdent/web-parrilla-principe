/**
 * La carta, leída de src/contenido/carta.json (preparada para el panel del dueño, Fase 4).
 *
 * `alergenos: null` significa «sin revisar» y la web invita a preguntar al personal.
 * `[]` significa «revisado: sin alérgenos declarables».
 */
import cartaJson from '../contenido/carta.json';
import { aNumero, texto, type Texto } from './restaurante';
import type { Alergeno } from './alergenos';

export { ALERGENOS, type Alergeno } from './alergenos';

export interface Plato {
  id: string;
  nombre: Texto;
  descripcion: Texto;
  precio: number | null;
  alergenos: Alergeno[] | null;
  maridaje: Texto | null;
  etiquetas: { vegetariano: boolean; sinGluten: boolean; temporada: boolean } | null;
}

export interface Categoria {
  id: string;
  nombre: Texto;
  platos: Plato[];
}

/** Forma del JSON tal como lo guarda Keystatic (omite los campos vacíos). */
interface PlatoJson {
  id: string;
  nombre?: Partial<Texto>;
  descripcion?: Partial<Texto>;
  precio?: string;
  alergenosConfirmados?: boolean;
  alergenos?: string[];
  maridaje?: Partial<Texto>;
  vegetariano?: boolean;
  sinGluten?: boolean;
  temporada?: boolean;
}
interface CategoriaJson {
  id: string;
  nombre?: Partial<Texto>;
  platos?: PlatoJson[];
}

export const carta: Categoria[] = (cartaJson.categorias as CategoriaJson[]).map((c) => ({
  id: c.id,
  nombre: texto(c.nombre),
  platos: (c.platos ?? []).map((p) => {
    const etiquetas = {
      vegetariano: !!p.vegetariano,
      sinGluten: !!p.sinGluten,
      temporada: !!p.temporada,
    };
    const maridaje = texto(p.maridaje);
    return {
      id: p.id,
      nombre: texto(p.nombre),
      descripcion: texto(p.descripcion),
      precio: aNumero(p.precio),
      alergenos: p.alergenosConfirmados ? ((p.alergenos ?? []) as Alergeno[]) : null,
      maridaje: maridaje.es || maridaje.en ? maridaje : null,
      etiquetas: Object.values(etiquetas).some(Boolean) ? etiquetas : null,
    };
  }),
}));
