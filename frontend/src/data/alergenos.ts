/** Los 14 alérgenos de declaración obligatoria (Reglamento UE 1169/2011). */
export const ALERGENOS = {
  gluten: { es: 'Gluten', en: 'Gluten' },
  crustaceos: { es: 'Crustáceos', en: 'Crustaceans' },
  huevo: { es: 'Huevo', en: 'Eggs' },
  pescado: { es: 'Pescado', en: 'Fish' },
  cacahuetes: { es: 'Cacahuetes', en: 'Peanuts' },
  soja: { es: 'Soja', en: 'Soy' },
  lacteos: { es: 'Lácteos', en: 'Milk' },
  frutosCascara: { es: 'Frutos de cáscara', en: 'Tree nuts' },
  apio: { es: 'Apio', en: 'Celery' },
  mostaza: { es: 'Mostaza', en: 'Mustard' },
  sesamo: { es: 'Sésamo', en: 'Sesame' },
  sulfitos: { es: 'Sulfitos', en: 'Sulphites' },
  altramuces: { es: 'Altramuces', en: 'Lupin' },
  moluscos: { es: 'Moluscos', en: 'Molluscs' },
} as const;

export type Alergeno = keyof typeof ALERGENOS;
