'use client';

import { useEffect, useRef, useState } from 'react';

const RADIUS = 190;

/**
 * Desktop only: a lens that follows the cursor and brings the paper's dot grid
 * forward — bigger, darker dots, fading out at the edge of the lens. It sits
 * behind the tiles, so it lights the gutters between them.
 */
export function GridSpotlight() {
  const [enabled, setEnabled] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const lensRef = useRef<SVGCircleElement>(null);
  const patternRef = useRef<SVGPatternElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const svg = svgRef.current;
    const lens = lensRef.current;
    const pattern = patternRef.current;
    if (!svg || !lens || !pattern) return;

    let frame = 0;
    let x = -999;
    let y = -999;

    const paint = () => {
      frame = 0;
      lens.setAttribute('cx', String(x));
      lens.setAttribute('cy', String(y));
      // keep the bright dots locked to the page's dot grid while it scrolls
      pattern.setAttribute('y', String(-(window.scrollY % 20)));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      svg.classList.add('is-on');
      queue();
    };
    const onLeave = () => svg.classList.remove('is-on');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', queue);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <svg ref={svgRef} className="grid-spot" aria-hidden="true">
      <defs>
        <pattern ref={patternRef} id="grid-spot-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1.25" />
          <circle cx="20" cy="0" r="1.25" />
          <circle cx="0" cy="20" r="1.25" />
          <circle cx="20" cy="20" r="1.25" />
        </pattern>
        <radialGradient id="grid-spot-fade">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-spot-mask">
          <circle ref={lensRef} cx="-999" cy="-999" r={RADIUS} fill="url(#grid-spot-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-spot-dots)" mask="url(#grid-spot-mask)" />
    </svg>
  );
}
