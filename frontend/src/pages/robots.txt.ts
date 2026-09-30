/**
 * robots.txt: permite explícitamente los rastreadores de búsqueda y de IA
 * (para aparecer en Google, AI Overviews, Gemini, Bing/Copilot, ChatGPT,
 * Claude, Perplexity y Apple) y bloquea solo las rutas privadas.
 */
import type { APIRoute } from 'astro';

const BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
];

const PRIVADAS = ['/admin', '/api/', '/keystatic'];

export const GET: APIRoute = ({ site }) => {
  const bloqueos = PRIVADAS.map((r) => `Disallow: ${r}`).join('\n');
  const grupos = BOTS.map((b) => `User-agent: ${b}\nAllow: /\n${bloqueos}`).join('\n\n');
  const cuerpo = `# Parrilla Príncipe
# Rastreadores de búsqueda y de IA: bienvenidos.

${grupos}

User-agent: *
Allow: /
${bloqueos}

Sitemap: ${new URL('sitemap-index.xml', site).href}
`;
  return new Response(cuerpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
