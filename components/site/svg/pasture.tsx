'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import { paintSky, torontoSun } from '@/lib/sky';

/**
 * A live window onto Toronto's sky, drawn over the sheep fence.
 *
 * The wash is painted from where the sun actually is over Toronto right now:
 * it climbs an arc through the day and sets behind the hills, the sky warms at
 * sunrise and sunset, and at night it goes to navy with the moon and stars out.
 * The ink drawing (hills, clouds, sun outline) sits on top, like pen over watercolour.
 */
const CLOUD = 'M-20 8H22A8 8 0 0 0 20-7.6A12 12 0 0 0-2-12A9 9 0 0 0-18-6A7 7 0 0 0-20 8Z';
const HILLS = [
  'M0 160C40 136 92 128 142 146S232 170 274 152S356 124 400 140',
  'M0 172C60 158 120 156 180 166S300 182 400 164',
];
const STARS: [number, number, number][] = [
  [52, 46, 0],
  [118, 24, 1.6],
  [176, 62, 0.8],
  [236, 30, 2.4],
  [292, 74, 1.2],
  [374, 52, 3],
];

/** The scene is drawn on a 400×180 ground; taller boxes get extra sky above it. */
const BASE_H = 180;
const MAX_H = 560;
const REPAINT_MS = 60_000;

export function Pasture({ className = '' }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, '');
  const { theme } = useTheme();
  const [height, setHeight] = useState(BASE_H);
  /** sun phase; null until mounted, so the server render is a plain paper sky */
  const [phase, setPhase] = useState<number | null>(null);

  // grow the viewBox upward to fill whatever box the layout gives the sky
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

  useEffect(() => {
    const update = () => setPhase(torontoSun().phase);
    update();
    const timer = window.setInterval(update, REPAINT_MS);
    const onVisible = () => document.visibilityState === 'visible' && update();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  const extra = height - BASE_H;
  const lift = (k: number) => `translate(0 ${-(extra * k).toFixed(1)})`;
  const paint = phase === null ? null : paintSky(phase, theme === 'dark');
  const night = paint ? 1 - paint.light : 0;

  // the sun's arc: rises at the left, peaks mid-sky, sets behind the hills on the right
  const p = phase ?? 0.5;
  const sunUp = phase !== null && p > -0.04 && p < 1.04;
  const sunX = 30 + Math.min(1.04, Math.max(-0.04, p)) * 340;
  const sunY = 158 - Math.sin(Math.PI * Math.min(1, Math.max(0, p))) * (100 + extra * 0.75);

  const top = BASE_H - height;

  return (
    <svg
      ref={ref}
      viewBox={`0 ${top} 400 ${height}`}
      preserveAspectRatio="xMidYMax meet"
      className={`pasture ${paint ? 'is-live' : ''} ${className}`}
      aria-hidden="true"
    >
      {paint ? (
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={paint.top} />
            <stop offset="1" stopColor={paint.horizon} />
          </linearGradient>
          {/* soft, unruled edges so the wash reads as paint, not a picture box */}
          <linearGradient id={`${uid}-fade-y`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.4" stopColor="#fff" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`${uid}-fade-x`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.16" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.84" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`${uid}-fade-x-mask`}>
            <rect x="0" y={top} width="400" height={height} fill={`url(#${uid}-fade-x)`} />
          </mask>
          <mask id={`${uid}-wash`}>
            <g mask={`url(#${uid}-fade-x-mask)`}>
              <rect x="0" y={top} width="400" height={height} fill={`url(#${uid}-fade-y)`} />
            </g>
          </mask>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0" stopColor={paint.sun} stopOpacity="0.55" />
            <stop offset="1" stopColor={paint.sun} stopOpacity="0" />
          </radialGradient>
        </defs>
      ) : null}

      {paint ? (
        <rect
          className="pasture-wash"
          x="0"
          y={top}
          width="400"
          height={height}
          fill={`url(#${uid}-sky)`}
          mask={`url(#${uid}-wash)`}
        />
      ) : null}

      {/* moon and stars come out as the light goes */}
      <g transform={lift(0.6)} style={{ opacity: night }} className="pasture-night">
        <path className="pasture-moon" d="M330 34a19 19 0 1 0 15 30a15 15 0 1 1-15-30Z" />
        {STARS.map(([x, y, d]) => (
          <path key={x} className="pasture-star" d={`M${x} ${y - 3}v6M${x - 3} ${y}h6`} style={{ animationDelay: `${d}s` }} />
        ))}
      </g>

      {sunUp ? (
        <g className="pasture-sun" transform={`translate(${sunX.toFixed(1)} ${sunY.toFixed(1)})`}>
          <circle r="34" fill={`url(#${uid}-glow)`} stroke="none" />
          <circle r="12" style={{ fill: paint?.sun }} />
        </g>
      ) : null}

      {/* two clouds, each on its own slow clock, starting part-way across */}
      <g transform={lift(0.45)}>
        <g className="pasture-cloud" style={{ animationDuration: '90s', animationDelay: '-30s', ['--rest' as string]: '110px' }}>
          <path d={CLOUD} transform="translate(0 58)" style={paint ? { fill: paint.cloud } : undefined} />
        </g>
      </g>
      <g transform={lift(0.2)}>
        <g className="pasture-cloud" style={{ animationDuration: '120s', animationDelay: '-84s', ['--rest' as string]: '230px' }}>
          <path d={CLOUD} transform="translate(0 96) scale(0.75)" style={paint ? { fill: paint.cloud } : undefined} />
        </g>
      </g>

      {/* hills, far then near: a wash fill, then an ink line that draws in */}
      {HILLS.map((d, i) => (
        <g key={d} className={`pasture-hill ${i === 0 ? 'is-far' : 'is-near'}`}>
          <path
            className="pasture-hill-fill"
            d={`${d}V180H0Z`}
            style={paint ? { fill: i === 0 ? paint.hillFar : paint.hillNear } : undefined}
          />
          <path className="pasture-hill-line" d={d} pathLength={1} />
        </g>
      ))}
    </svg>
  );
}

/** "sunset 4:58 pm" / "sunrise 6:59 am": whichever comes next in Toronto. */
export function NextSunEvent() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const { sunrise, sunset } = torontoSun(now);
      const fmt = (d: Date) =>
        d.toLocaleTimeString('en-US', { timeZone: 'America/Toronto', hour: 'numeric', minute: '2-digit' }).toLowerCase();
      if (now < sunrise) setLabel(`sunrise ${fmt(sunrise)}`);
      else if (now < sunset) setLabel(`sunset ${fmt(sunset)}`);
      else setLabel(`sunrise ${fmt(torontoSun(new Date(now.getTime() + 12 * 36e5)).sunrise)}`);
    };
    update();
    const timer = window.setInterval(update, REPAINT_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="font-mono" title="The sky in this tile follows the real sun over Toronto">
      toronto sky · {label ?? '––'}
    </span>
  );
}
