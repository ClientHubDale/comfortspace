import React, { useState, useEffect, useRef } from 'react';

/* --------------------------------------------------------------------------
   Animated counter — counts up the first time the number scrolls into view
   -------------------------------------------------------------------------- */
const CountUp = ({ end, prefix = '', suffix = '', duration = 1700 }) => {
  const [value, setValue] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    let frame;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const startedAt = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [end, duration]);

  return (
    <span ref={nodeRef}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};

export default CountUp;
