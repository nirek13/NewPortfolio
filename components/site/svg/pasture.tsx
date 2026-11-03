'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The sky over the sheep fence: two hills that draw themselves in, a pair of
 * slow clouds, and a sun that becomes a moon with a few stars in dark mode.
 * All motion is CSS (see `.pasture` in motion.css).
 */
const CLOUD = 'M-20 8H22A8 8 0 0 0 20-7.6A12 12 0 0 0-2-12A9 9 0 0 0-18-6A7 7 0 0 0-20 8Z';
const HILLS = [
  'M0 160C40 136 92 128 142 146S232 170 274 152S356 124 400 140',
  'M0 172C60 158 120 156 180 166S300 182 400 164',
];
const STARS: [number, number, number][] = [
  [64, 40, 0],
  [178, 22, 1.6],
  [252, 54, 0.8],
  [384, 28, 2.4],
];

/** The scene is drawn on a 400×180 ground; taller boxes get extra sky above it. */
const BASE_H = 180;
const MAX_H = 560;

export function Pasture({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [height, setHeight] = useState(BASE_H);

  // grow the viewBox upward to fill whatever box the layout gives the sky,
  // so a tall phone card gets open sky instead of letterboxing
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height: h } = entry.contentRect;
      if (width < 1 || h < 1) return;
      setHeight(Math.round(Math.min(MAX_H, Math.max(BASE_H, (400 * h) / width))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /** how far the sky's contents rise, so they spread through the extra room */
  const lift = (k: number) => `translate(0 ${-((height - BASE_H) * k).toFixed(1)})`;

  return (
    <svg
      ref={ref}
      viewBox={`0 ${BASE_H - height} 400 ${height}`}
      preserveAspectRatio="xMidYMax meet"
      className={`pasture ${className}`}
      aria-hidden="true"
    >
      <g transform={lift(0.6)}>
        {/* sun (light) */}
        <g className="pasture-sun">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="324" y1="27" x2="324" y2="32" transform={`rotate(${i * 45} 324 52)`} />
          ))}
          <circle cx="324" cy="52" r="13" />
        </g>

        {/* moon and stars (dark) */}
        <g className="pasture-night">
          <path className="pasture-moon" d="M330 34a19 19 0 1 0 15 30a15 15 0 1 1-15-30Z" />
          {STARS.map(([x, y, d]) => (
            <path
              key={x}
              className="pasture-star"
              d={`M${x} ${y - 3}v6M${x - 3} ${y}h6`}
              style={{ animationDelay: `${d}s` }}
            />
          ))}
        </g>
      </g>

      {/* two clouds, each on its own slow clock, starting part-way across */}
      <g transform={lift(0.45)}>
        <g className="pasture-cloud" style={{ animationDuration: '90s', animationDelay: '-30s', ['--rest' as string]: '110px' }}>
          <path d={CLOUD} transform="translate(0 58)" />
        </g>
      </g>
      <g transform={lift(0.2)}>
        <g className="pasture-cloud" style={{ animationDuration: '120s', animationDelay: '-84s', ['--rest' as string]: '230px' }}>
          <path d={CLOUD} transform="translate(0 96) scale(0.75)" />
        </g>
      </g>

      {/* hills, far then near: a paper fill to hide what is behind, then an ink line that draws in */}
      {HILLS.map((d, i) => (
        <g key={d} className={`pasture-hill ${i === 0 ? 'is-far' : 'is-near'}`}>
          <path className="pasture-hill-fill" d={`${d}V180H0Z`} />
          <path className="pasture-hill-line" d={d} pathLength={1} />
        </g>
      ))}
    </svg>
  );
}
