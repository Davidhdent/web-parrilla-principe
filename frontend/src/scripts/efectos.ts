/**
 * Efectos de movimiento de toda la web.
 *
 * Principio: un único momento protagonista (el titular del hero, animado solo
 * con CSS en Hero.astro para no retrasar el LCP) y revelados discretos al hacer
 * scroll. Por rendimiento:
 *  - los revelados usan un solo IntersectionObserver + transiciones CSS;
 *  - GSAP (parallax) y Lenis (scroll suave) se cargan con la primera interacción.
 * Con «reducir movimiento» no se ejecuta nada y todo el contenido se ve.
 */

const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducido) {
  // 1. Revelados (texto, máscaras, capas del plato de la casa)
  document.documentElement.classList.add('anim');
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('visible');
        observador.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  document
    .querySelectorAll('[data-revelar], [data-revelar-mascara], [data-capas]')
    .forEach((el) => observador.observe(el));

  // 2. Contadores (solo cifras reales, definidas en los datos)
  const contadores = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      contadores.unobserve(e.target);
      const el = e.target as HTMLElement;
      const final = Number(el.dataset.contador);
      const fmt = new Intl.NumberFormat(el.dataset.formato === 'en' ? 'en-GB' : 'es-ES');
      const inicio = performance.now();
      const paso = (t: number) => {
        const p = Math.min(1, (t - inicio) / 2000);
        el.textContent = fmt.format(Math.round(final * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    }
  });
  document.querySelectorAll('[data-contador]').forEach((el) => contadores.observe(el));

  // 3. Parallax y scroll suave: solo sirven al desplazarse, así que se cargan
  //    con la primera interacción (no compiten con la carga inicial).
  const alInteractar = (fn: () => void) => {
    const eventos = ['wheel', 'touchstart', 'keydown', 'scroll', 'pointerdown'] as const;
    const una = () => {
      eventos.forEach((e) => window.removeEventListener(e, una));
      fn();
    };
    eventos.forEach((e) => window.addEventListener(e, una, { passive: true, once: true }));
  };

  alInteractar(async () => {
    const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('lenis'),
    ]);
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
      a.addEventListener('click', (e) => {
        const destino = a.getAttribute('href')!;
        if (destino.length < 2) return;
        e.preventDefault();
        lenis.scrollTo(destino, { offset: -40 });
        history.replaceState(null, '', destino);
      }),
    );

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });
}
