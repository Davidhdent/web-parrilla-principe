/**
 * Mide el CLS del primer pantallazo retrasando las fuentes web (simula una conexión lenta).
 *   npm run build && node tests/cls-fuentes.mjs
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUERTO = 4334;
const srv = spawn(process.execPath, ['node_modules/astro/bin/astro.mjs', 'preview', '--port', String(PUERTO)], { cwd: raiz });
await new Promise((r) => srv.stdout.on('data', (d) => String(d).includes(String(PUERTO)) && r()));
const nav = await chromium.launch({ channel: 'msedge', headless: true });
let peor = 0;
try {
  for (const viewport of [{ width: 1350, height: 940 }, { width: 412, height: 823 }]) {
    const page = await (await nav.newContext({ viewport })).newPage();
    await page.route('**/*.woff2', async (r) => { await new Promise((s) => setTimeout(s, 1500)); r.continue(); });
    await page.addInitScript(() => {
      window.__cls = 0;
      window.__causas = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          if (e.hadRecentInput) continue;
          window.__cls += e.value;
          const nodos = e.sources.map((s) => {
            const n = s.node?.nodeType === 1 ? s.node : s.node?.parentElement;
            return n ? `${n.tagName.toLowerCase()}.${[...n.classList].join('.')}` : '?';
          });
          window.__causas.push(`${e.value.toFixed(3)} ← ${nodos.slice(0, 3).join(', ')}`);
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(`http://localhost:${PUERTO}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const { cls, causas } = await page.evaluate(() => ({ cls: window.__cls, causas: window.__causas }));
    peor = Math.max(peor, cls);
    console.log(`${viewport.width}px: CLS ${cls.toFixed(3)}`);
    causas.forEach((c) => console.log(`   ${c}`));
  }
} finally { await nav.close(); srv.kill(); }
process.exit(peor < 0.1 ? 0 : 1);
