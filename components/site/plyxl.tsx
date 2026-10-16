'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type Ref } from 'react';

const INK = '#1b1815';
const WOOL = '#f7f4ec';
const BLUSH = '#f4a3a3';

/** Overlapping wool puffs: [cx, cy, r]. Drawn twice (ink then wool) so only the outer edge gets a line. */
const BODY_PUFFS: [number, number, number][] = [
  [84, 78, 26],
  [106, 58, 26],
  [134, 54, 27],
  [162, 64, 25],
  [180, 86, 22],
  [196, 80, 9],
  [168, 112, 24],
  [138, 120, 26],
  [108, 120, 25],
  [86, 104, 24],
  [130, 88, 40],
];

const TUFT_PUFFS: [number, number, number][] = [
  [52, 66, 9],
  [64, 61, 10],
  [76, 66, 9],
];

const LEGS = [96, 116, 146, 166];

const BAAS = ['baa!', 'baaa~', 'b2baa', 'ship it', 'hi :)', 'mehh'];

function Puffs({ puffs, stroke }: { puffs: [number, number, number][]; stroke: number }) {
  return (
    <>
      <g fill={INK} stroke={INK} strokeWidth={stroke}>
        {puffs.map(([cx, cy, r]) => (
          <circle key={`o${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g fill={WOOL}>
        {puffs.map(([cx, cy, r]) => (
          <circle key={`f${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </>
  );
}

/** The Plyxl sheep. `pupilsRef` lets a parent nudge the pupils toward the cursor. */
function SheepArt({ pupilsRef, className = '' }: { pupilsRef?: Ref<SVGGElement>; className?: string }) {
  return (
    <svg viewBox="0 0 220 170" className={className} aria-hidden="true">
      <ellipse cx="128" cy="158" rx="74" ry="6" fill="currentColor" opacity="0.12" />

      <g className="sheep-legs" fill={INK}>
        {LEGS.map((x) => (
          <rect key={x} x={x} y={116} width={10} height={38} rx={5} />
        ))}
      </g>

      <Puffs puffs={BODY_PUFFS} stroke={5} />

      <g className="sheep-head">
        <g fill={INK}>
          <ellipse cx="40" cy="84" rx="14" ry="6.5" transform="rotate(-22 40 84)" />
          <ellipse cx="90" cy="82" rx="14" ry="6.5" transform="rotate(22 90 82)" />
          <ellipse cx="64" cy="92" rx="23" ry="27" />
        </g>
        <Puffs puffs={TUFT_PUFFS} stroke={5} />
        <g fill={WOOL}>
          <circle cx="56" cy="70" r="6" />
          <circle cx="64" cy="67" r="7" />
          <circle cx="72" cy="70" r="6" />
        </g>

        <g className="sheep-eyes">
          <circle cx="55" cy="91" r="7" fill="#fff" />
          <circle className="sheep-eye-r" cx="73" cy="91" r="7" fill="#fff" />
          <path
            className="sheep-eye-wink"
            d="M66 92q7-6.5 14 0"
            fill="none"
            stroke="#fff"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          <g ref={pupilsRef} className="sheep-pupils" fill={INK}>
            <circle cx="55.5" cy="92" r="3.6" />
            <circle className="sheep-eye-r" cx="73.5" cy="92" r="3.6" />
          </g>
        </g>

        <ellipse cx="49" cy="104" rx="4" ry="2.3" fill={BLUSH} opacity="0.8" />
        <ellipse cx="79" cy="104" rx="4" ry="2.3" fill={BLUSH} opacity="0.8" />
        <path d="M60 108q4 3.6 8 0" fill="none" stroke={WOOL} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** The small Plyxl sheep head, for inline use next to the name. */
export function PlyxlMark({ className = 'h-4 w-4' }: { className?: string }) {
  return <Image src="/plyxl-mark.svg" alt="" width={64} height={64} className={className} aria-hidden="true" />;
}

/** Y Combinator chip. Pass `asLink={false}` when it sits inside another link. */
export function YCBadge({
  batch,
  className = '',
  asLink = true,
}: {
  batch: string;
  className?: string;
  asLink?: boolean;
}) {
  const inner = (
    <>
      <Image src="/YClogo.png" alt="" width={32} height={32} className="h-4 w-4" aria-hidden="true" />
      <span>Combinator</span>
      <span className="yc-chip-batch">{batch}</span>
    </>
  );

  if (!asLink) {
    return (
      <span className={`yc-chip ${className}`} aria-label={`Y Combinator ${batch}`}>
        {inner}
      </span>
    );
  }

  return (
    <a
      href="https://www.ycombinator.com/companies"
      target="_blank"
      rel="noopener noreferrer"
      className={`yc-chip ${className}`}
      aria-label={`Y Combinator ${batch}`}
    >
      {inner}
    </a>
  );
}

const COUNT_KEY = 'plyxl-sheep-count';
const RUN_MS = 2600;
const MAX_RUNNERS = 8;

/**
 * Featured Plyxl block: a sheep that watches the cursor, blinks, winks on hover
 * and says something when you pet it. Every pet sends a little sheep over the fence.
 */
export function PlyxlFeature() {
  const sheepRef = useRef<HTMLButtonElement>(null);
  const pupilsRef = useRef<SVGGElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const [baa, setBaa] = useState<{ key: number; text: string } | null>(null);
  const [runners, setRunners] = useState<number[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(COUNT_KEY));
      if (Number.isFinite(stored) && stored > 0) setCount(stored);
    } catch {}
  }, []);

  const bump = useCallback(() => {
    setCount((c) => {
      const next = c + 1;
      try {
        localStorage.setItem(COUNT_KEY, String(next));
      } catch {}
      return next;
    });
  }, []);

  const sendSheep = useCallback(() => {
    if (prefersReducedMotion()) {
      bump();
      return;
    }
    setRunners((r) => (r.length >= MAX_RUNNERS ? r : [...r, nextId.current++]));
    // count it the moment it clears the fence
    window.setTimeout(bump, RUN_MS / 2);
  }, [bump]);

  // pupils follow the pointer
  useEffect(() => {
    const sheep = sheepRef.current;
    const pupils = pupilsRef.current;
    if (!sheep || !pupils) return;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = sheep.getBoundingClientRect();
        // the eyes sit roughly 29% across and 54% down the art
        const ex = box.left + box.width * 0.29;
        const ey = box.top + box.height * 0.54;
        const dx = e.clientX - ex;
        const dy = e.clientY - ey;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(2.6, dist / 40);
        pupils.style.transform = `translate(${(dx / dist) * reach}px, ${(dy / dist) * reach}px)`;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  // one sheep trots by on its own the first time the block scrolls into view
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || prefersReducedMotion()) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => setRunners((r) => [...r, nextId.current++]), 900);
      },
      { threshold: 0.5 }
    );
    io.observe(strip);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!baa) return;
    const timer = window.setTimeout(() => setBaa(null), 1300);
    return () => window.clearTimeout(timer);
  }, [baa]);

  const pet = () => {
    setBaa((prev) => {
      const options = BAAS.filter((b) => b !== prev?.text);
      return { key: Date.now(), text: options[Math.floor(Math.random() * options.length)] };
    });
    sendSheep();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 max-w-[30rem]">
          <a
            href="https://plyxl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="plyxl-wordmark inline-flex items-center gap-2"
          >
            <PlyxlMark className="h-8 w-8" />
            <span className="font-display text-[2rem] font-semibold leading-none">plyxl</span>
          </a>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <YCBadge batch="W27" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              founder
            </span>
          </div>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground/90">
            running a business is hard enough.{' '}
            <span className="font-medium text-foreground">plyxl makes it a little easier.</span>
          </p>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
            one place to run your company — your tables, the tools you already use, docs and team
            rooms, with every change on the record.
          </p>
          <a
            href="https://plyxl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-badge mt-4 inline-block"
          >
            plyxl.com ↗
          </a>
        </div>

        <div className="relative mx-auto shrink-0 sm:mx-0">
          {baa ? (
            <span key={baa.key} className="sheep-bubble font-hand" role="status">
              {baa.text}
            </span>
          ) : null}
          <button
            ref={sheepRef}
            type="button"
            onClick={pet}
            className={`plyxl-sheep ${baa ? 'is-baa' : ''}`}
            aria-label="Pet the Plyxl sheep"
          >
            <SheepArt pupilsRef={pupilsRef} className="h-auto w-44 sm:w-56" />
          </button>
        </div>
      </div>

      <div ref={stripRef} className="sheep-strip" aria-hidden="true">
        <svg className="sheep-fence" viewBox="0 0 40 30">
          <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 29V4M20 29V2M34 29V4M2 11h36M2 21h36" />
          </g>
        </svg>
        {runners.map((id) => (
          <div
            key={id}
            className="sheep-runner"
            style={{ animationDuration: `${RUN_MS}ms` }}
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget) setRunners((r) => r.filter((x) => x !== id));
            }}
          >
            <div className="sheep-hop" style={{ animationDuration: `${RUN_MS}ms` }}>
              <SheepArt className="sheep-mini" />
            </div>
          </div>
        ))}
      </div>
      <p className="-mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>pet the sheep</span>
        <span className="tabular-nums" aria-live="polite">
          {String(count).padStart(3, '0')} sheep counted
        </span>
      </p>
    </div>
  );
}
