'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A small git history that draws itself once, the first time it comes into
 * view: main runs left to right, two branches split off and merge back, and
 * commits appear as the line reaches them.
 */
const DRAW_S = 2.4;
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
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox={`0 0 ${WIDTH} 112`} className={`cgraph ${seen ? 'is-seen' : ''} ${className}`} aria-hidden="true">
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
          <circle cx={c.x} cy={c.y} r="4" />
          {c.label ? (
            <text x={c.x} y={c.y + (c.above ? -10 : 17)} textAnchor="middle">
              {c.label}
            </text>
          ) : null}
        </g>
      ))}

      <g className="cgraph-commit cgraph-head" style={{ animationDelay: `${DRAW_S}s` }}>
        <circle cx="402" cy="62" r="4.5" />
        <text x="402" y="45" textAnchor="middle">
          HEAD
        </text>
      </g>
    </svg>
  );
}
