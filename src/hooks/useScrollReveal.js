import { useEffect } from 'react';

/**
 * Adds `.is-revealed` to every [data-reveal] element once it scrolls into view.
 * Re-runs when `deps` change so newly mounted cards get observed too.
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]:not(.is-revealed)'));
    if (!nodes.length) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -70px 0px' }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
