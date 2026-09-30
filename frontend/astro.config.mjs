// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dirección pública: Netlify la da en la variable URL (su .netlify.app o el dominio propio
  // cuando se configure). Se usa en canonical, hreflang, sitemap, llms.txt y JSON-LD.
  site: process.env.URL ?? 'https://parrilla-principe.netlify.app',
  trailingSlash: 'ignore',
  // Sin la barra de desarrollo de Astro: la vista local se ve como la web final
  devToolbar: { enabled: false },
  // CSS incrustado en el HTML: evita una petición que bloquea el renderizado (mejor LCP en móvil).
  build: { inlineStylesheets: 'always' },

  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter: (url) => !url.includes('/404'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } },
    }),
  ],
});
