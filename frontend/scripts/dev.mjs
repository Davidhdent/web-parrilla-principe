/**
 * Arranca `astro dev` desde la carpeta /frontend aunque se lance desde otro sitio.
 * Se fija el directorio de trabajo para que las rutas relativas funcionen siempre;
 * el servidor se lanza desde .claude/launch.json.
 */
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

process.chdir(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
process.argv = [process.argv[0], 'astro', 'dev', ...process.argv.slice(2)];
await import('../node_modules/astro/bin/astro.mjs');
