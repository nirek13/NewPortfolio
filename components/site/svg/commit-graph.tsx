'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A git history that draws itself: main runs left to right, two feature
 * branches split off and merge back, and HEAD keeps pulsing at the tip.
 * Each cycle is a fresh mount (new `key`), so every stroke and commit replays
 * from a single shared clock. It only loops while it is on screen.
 */
const DRAW_S = 2.6; // time for main to reach the right edge
const CYCLE_MS = 10_000;
const WIDTH = 440;

type Commit = { x: number; y: number; label?: string; above?: boolean };

const COMMITS: Commit[] = [
  { x: 22, y: 62, label: 'init' },
  { x: 74, y: 62 },
  { x: 120, y: 28, label: 'feat: sheep', above: true },
  { x: 164, y: 28 },
  { x: 214, y: 62, label: 'merge' },
  { x: 258, y: 62 },
  { x: 304, y: 92, label: 'fix: fence' },
  { x: 352, y: 62, label: 'ship' },
];

/** when main's stroke (x 22 → 402) reaches `x` */
const at = (x: number) => (Math.max(0, x - 22) / 380) * DRAW_S;

export function CommitGraph({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (!entry.isIntersecting) return;
      // replay from the start whenever it comes back into view (e.g. swiping to the card)
      setCycle((c) => c + 1);
      timer = window.setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return (
    <svg ref={ref} viewBox={`0 0 ${WIDTH} 112`} className={`cgraph ${className}`} aria-hidden="true">
      <g key={cycle} className="cgraph-run" style={{ ['--cycle' as string]: `${CYCLE_MS}ms` }}>
        <path className="cgraph-line is-main" d="M22 62H402" pathLength={1} style={{ animationDuration: `${DRAW_S}s` }} />
        <path
          className="cgraph-line is-branch"
          d="M74 62C96 62 96 28 120 28H164C188 28 190 62 214 62"
          pathLength={1}
          style={{ animationDelay: `${at(74)}s`, animationDuration: `${at(214) - at(74)}s` }}
        />
        <path
          className="cgraph-line is-branch"
          d="M258 62C280 62 280 92 304 92C328 92 330 62 352 62"
          pathLength={1}
          style={{ animationDelay: `${at(258)}s`, animationDuration: `${at(352) - at(258)}s` }}
        />

        {COMMITS.map((c) => (
          <g key={`${c.x}-${c.y}`} className="cgraph-commit" style={{ animationDelay: `${at(c.x)}s` }}>
            <circle cx={c.x} cy={c.y} r="4.2" />
            {c.label ? (
              <text x={c.x} y={c.y + (c.above ? -10 : 17)} textAnchor="middle">
                {c.label}
              </text>
            ) : null}
          </g>
        ))}

        <g className="cgraph-head" style={{ animationDelay: `${DRAW_S}s` }}>
          <circle className="cgraph-pulse" cx="402" cy="62" r="5" />
          <circle cx="402" cy="62" r="5" />
          <text x="402" y="44" textAnchor="middle">
            HEAD
          </text>
        </g>
      </g>
    </svg>
  );
}
