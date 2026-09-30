// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

// El panel del dueño (/keystatic) necesita servidor:
// - en local se incluye con `npm run dev`;
// - en producción, con KEYSTATIC_PRODUCCION=true Y el repositorio de GitHub configurado
//   (sin GitHub el panel no tendría inicio de sesión, así que no se publica).
//   Esto activa además el adaptador de Netlify.
// Sin esas variables, `npm run build` genera la web 100 % estática y sin panel.
const produccionConPanel =
  process.env.KEYSTATIC_PRODUCCION === 'true' && !!process.env.PUBLIC_KEYSTATIC_GITHUB_REPO;
const conPanel = process.argv.includes('dev') || produccionConPanel;

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
    // Las fuentes nunca se incrustan como data: (la CSP de producción solo admite font-src 'self').
    build: { assetsInlineLimit: (archivo) => (/\.(woff2?|ttf|otf)$/.test(archivo) ? false : undefined) },
  },

  integrations: [
    react(),
    sitemap({
      filter: (url) => !url.includes('/404') && !url.includes('/keystatic'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } },
    }),
    ...(conPanel ? [keystatic()] : []),
  ],

  ...(produccionConPanel ? { adapter: netlify() } : {}),
});
