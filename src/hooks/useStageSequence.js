import { useEffect, useRef, useState } from 'react';

/** Height of the sticky site header — the pinned panel parks just below it. */
const HEADER_OFFSET = 72;

/** Breathing room required above and below the pinned panel. */
const PIN_SLACK = 16;

/**
 * Drives the 7-stage framework.
 *
 * On a large screen the section is taller than the viewport and its inner panel
 * is `position: sticky`, so the page appears to stop while each scrolled slice
 * of that extra height advances one stage. Once the last stage is out, the
 * section scrolls away like anything else.
 *
 * Small screens and `prefers-reduced-motion` never pin — the stages simply
 * cascade in on a timer when the section reaches the viewport.
 *
 * @param {number} count how many stages there are
 * @returns {{ sectionRef, revealed, activeIndex, setActiveIndex, isPinned }}
 */
export default function useStageSequence(count) {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || count < 1) return;

    let disposers = [];
    const dispose = () => {
      disposers.forEach((fn) => fn());
      disposers = [];
    };

    const canPin = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

      // Screen width is irrelevant — what matters is whether the panel fits
      // below the header. On phones the rail lies on its side and the whole
      // thing is shorter, so it usually does.
      const inner = section.querySelector('.csx-stage-sticky > *');
      const needed = inner ? inner.scrollHeight : Infinity;
      return window.innerHeight - HEADER_OFFSET >= needed + PIN_SLACK;
    };

    /* ---- pinned mode: scroll position inside the section picks the stage ---- */
    const startPinned = () => {
      setIsPinned(true);
      let ticking = false;

      const measure = () => {
        const rect = section.getBoundingClientRect();
        // the sticky panel occupies the viewport below the header, so the
        // scrollable slack is whatever height the section has beyond that
        const travel = section.offsetHeight - (window.innerHeight - HEADER_OFFSET);
        if (travel <= 0) return;

        const scrolled = HEADER_OFFSET - rect.top;
        const progress = Math.min(Math.max(scrolled / travel, 0), 1);
        const index = Math.min(count - 1, Math.floor(progress * count));

        setRevealed(index + 1);
        setActiveIndex(index);
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          measure();
          ticking = false;
        });
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      disposers.push(() => window.removeEventListener('scroll', onScroll));
      measure();
    };

    /* ---- fallback: reveal one stage at a time once the section is in view ---- */
    const startCascade = () => {
      setIsPinned(false);

      const run = () => {
        let step = 0;
        const timer = setInterval(() => {
          step += 1;
          setRevealed(step);
          setActiveIndex(step - 1);
          if (step >= count) clearInterval(timer);
        }, 260);
        disposers.push(() => clearInterval(timer));
      };

      if (!('IntersectionObserver' in window)) {
        setRevealed(count);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          run();
        },
        { threshold: 0.15 }
      );
      observer.observe(section);
      disposers.push(() => observer.disconnect());
    };

    const start = () => {
      dispose();
      setRevealed(0);
      setActiveIndex(0);
      if (canPin()) startPinned();
      else startCascade();
    };

    start();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      dispose();
    };
  }, [count]);

  return { sectionRef, revealed, activeIndex, setActiveIndex, isPinned };
}
