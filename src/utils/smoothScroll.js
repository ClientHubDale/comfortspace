import Lenis from 'lenis';

/**
 * Site-wide inertia scrolling (Lenis). It still moves the real window scroll
 * position, so sticky sections, scroll listeners and IntersectionObservers keep
 * working unchanged. Skipped entirely for visitors who prefer reduced motion.
 */
let lenis = null;

export function initSmoothScroll() {
  if (lenis || typeof window === 'undefined') return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    // each frame the page closes 7% of the gap to its target — a slow,
    // weighted glide rather than a quick snap
    lerp: 0.07,
    smoothWheel: true,
    // one wheel notch travels ~70% of the browser's native distance
    wheelMultiplier: 0.7,
    touchMultiplier: 1,
    // scrollable panels (modals, the mobile drawer, horizontal rails) keep
    // their own native scrolling
    allowNestedScroll: true,
  });

  const raf = (time) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return lenis;
}

/** Freeze / release page scrolling, e.g. while a modal is open. */
export function setScrollLocked(locked) {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
}

/**
 * Where an element really sits in the page, minus its scroll-margin-top.
 * A sticky element that is currently stuck reports its pinned on-screen spot,
 * not its place in the flow — so the browser (and scrollIntoView) think it is
 * already in view. Sticky offsets never affect layout, so switching it to
 * `static` for the measurement moves nothing else on the page. (Not
 * `relative`: that would still apply its `top` and skew the result.)
 */
function pageTopOf(el) {
  const sticky = getComputedStyle(el).position === 'sticky';
  const previous = el.style.position;
  if (sticky) el.style.position = 'static';
  const top = el.getBoundingClientRect().top + window.scrollY;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (sticky) el.style.position = previous;
  return top - margin;
}

/** Scroll to a y position, an element, or an element id. */
export function smoothScrollTo(target, { immediate = false } = {}) {
  let top = target;
  if (typeof target === 'string') target = document.getElementById(target);
  if (target instanceof Element) top = pageTopOf(target);
  if (typeof top !== 'number' || Number.isNaN(top)) return;

  if (lenis) {
    // menu jumps and buttons glide at a calm, fixed pace
    lenis.scrollTo(top, {
      immediate,
      force: true,
      duration: immediate ? 0 : 1.6,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // ease-in-out
    });
  } else {
    window.scrollTo({ top, behavior: immediate ? 'instant' : 'smooth' });
  }
}
