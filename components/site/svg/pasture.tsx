'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The sky over the sheep fence: rolling hills that draw themselves in, clouds
 * drifting across, a pair of birds, and a sun that swaps for a moon and
 * twinkling stars in dark mode. All motion is CSS (see `.pasture` in motion.css).
 */
const CLOUD = 'M-20 8H22A8 8 0 0 0 20-7.6A12 12 0 0 0-2-12A9 9 0 0 0-18-6A7 7 0 0 0-20 8Z';
const HILLS = [
  'M0 160C40 136 92 128 142 146S232 170 274 152S356 124 400 140',
  'M0 172C60 158 120 156 180 166S300 182 400 164',
];

const STARS: [number, number, number][] = [
  [52, 34, 0],
  [118, 18, 1.4],
  [196, 46, 0.6],
  [248, 22, 2.2],
  [376, 30, 1],
  [88, 70, 2.8],
];

/** The scene is drawn on a 400×180 ground; taller boxes get extra sky above it. */
const BASE_H = 180;
const MAX_H = 560;

export function Pasture({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [height, setHeight] = useState(BASE_H);

  // grow the viewBox upward to fill whatever box the layout gives the sky,
  // so a tall phone card gets a big open sky instead of letterboxing
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
      {/* sun (light) */}
      <g transform={lift(0.62)}>
      <g className="pasture-sun">
        <g className="pasture-rays">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="324" y1="24" x2="324" y2="30" transform={`rotate(${i * 30} 324 52)`} />
          ))}
        </g>
        <circle cx="324" cy="52" r="14" />
      </g>

      </g>

      {/* moon and stars (dark) */}
      <g transform={lift(0.62)}>
      <g className="pasture-night">
        <path className="pasture-moon" d="M330 34a19 19 0 1 0 15 30a15 15 0 1 1-15-30Z" />
        {STARS.map(([x, y, d]) => (
          <path key={`${x}-${y}`} className="pasture-star" d={`M${x} ${y - 3.5}v7M${x - 3.5} ${y}h7`} style={{ animationDelay: `${d}s` }} />
        ))}
        {height > 260
          ? STARS.map(([x, y, d]) => (
              <path
                key={`hi-${x}`}
                className="pasture-star"
                d={`M${400 - x} ${y - 70}v7M${400 - x - 3.5} ${y - 66.5}h7`}
                style={{ animationDelay: `${d + 0.7}s` }}
              />
            ))
          : null}
      </g>
      </g>

      {/* clouds: each drifts on its own clock, starting part-way through so the sky is never empty */}
      <g transform={lift(0.5)}>
      <g className="pasture-cloud" style={{ animationDuration: '62s', animationDelay: '-18s', ['--rest' as string]: '96px' }}>
        <path d={CLOUD} transform="translate(0 54) scale(1.1)" />
      </g>
      </g>
      <g transform={lift(0.25)}>
      <g className="pasture-cloud" style={{ animationDuration: '88s', animationDelay: '-60s', ['--rest' as string]: '250px' }}>
        <path d={CLOUD} transform="translate(0 92) scale(0.8)" />
      </g>
      </g>
      <g transform={lift(0.8)}>
      <g className="pasture-cloud" style={{ animationDuration: '74s', animationDelay: '-41s', ['--rest' as string]: '186px' }}>
        <path d={CLOUD} transform="translate(0 30) scale(0.62)" />
      </g>
      </g>

      {/* birds: the group crosses the sky, each bird flaps on its own */}
      <g transform={lift(0.35)}>
      <g className="pasture-birds">
        <g transform="translate(0 64)">
          <path className="pasture-bird" d="M0 0q4-4.5 8 0q4-4.5 8 0" />
        </g>
        <g transform="translate(20 56)">
          <path className="pasture-bird is-late" d="M0 0q3-3.5 6 0q3-3.5 6 0" />
        </g>
      </g>
      </g>

      {/* hills, far then near: a paper fill to hide what is behind, then an ink line that draws in */}
      {HILLS.map((d, i) => (
        <g key={d} className={`pasture-hill ${i === 0 ? 'is-far' : 'is-near'}`}>
          <path className="pasture-hill-fill" d={`${d}V180H0Z`} />
          <path className="pasture-hill-line" d={d} pathLength={1} />
        </g>
      ))}
      <g className="pasture-tufts">
        <path d="M48 170l2-6 2 6M54 169l1.6-4.5 1.6 4.5" />
        <path d="M232 174l2-6 2 6M238 174l1.6-4.5 1.6 4.5" />
        <path d="M352 168l2-6 2 6" />
      </g>
    </svg>
  );
}
