/**
 * Scroll-reveal: pairs with the `.reveal` / `.is-visible` classes in
 * `src/styles/animations.css`. A single shared IntersectionObserver toggles
 * `.is-visible` once per element. Reduced-motion users get content revealed
 * up-front (no transitions, no observer).
 *
 * Re-runs on every Astro view transition via `astro:page-load`.
 */

let observer: IntersectionObserver | null = null;

function initReveal() {
  if (typeof window === 'undefined') return;

  observer?.disconnect();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll<HTMLElement>('.reveal');

  if (reduced) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
  );

  targets.forEach((el) => observer!.observe(el));
}

document.addEventListener('astro:page-load', initReveal);
