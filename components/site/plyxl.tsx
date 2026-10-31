'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type Ref } from 'react';
import { YC_FOUNDER_URL } from '@/lib/site';
import { YCMark } from '@/components/site/yc-card';

/** Official Plyxl sheep parts (from plyxl.com), drawn with <use> so they follow the theme. */
const SPRITE = '/plyxl-sheep.svg';

const BAAS = ['baa!', 'baaa~', 'b2baa', 'ship it', 'hi :)', 'mehh'];

/**
 * The Plyxl sheep, as drawn on plyxl.com. Fleece and features take the ink colour,
 * the face takes the paper colour. `withWord` adds the plyxl wordmark beside it.
 * `pupilsRef` lets a parent nudge the eyes toward the cursor.
 */
function SheepArt({
  pupilsRef,
  withWord = false,
  className = '',
}: {
  pupilsRef?: Ref<SVGGElement>;
  withWord?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox={withWord ? '416 218 1148 362' : '416 218 350 362'}
      className={`plyxl-art ${className}`}
      aria-hidden="true"
    >
      <g className="sheep-legs">
        <use href={`${SPRITE}#legL`} />
        <use href={`${SPRITE}#legR`} />
      </g>
      <use href={`${SPRITE}#fleece`} />
      <g className="sheep-head">
        <g transform="translate(0 -14)">
          <use className="sheep-face" href={`${SPRITE}#face`} />
          <g ref={pupilsRef} className="sheep-pupils">
            <path
              className="sheep-eyes"
              d="M 531 393.5 A 14.1 14.1 0 1 0 559.2 393.5 A 14.1 14.1 0 1 0 531 393.5 Z"
            />
            <use href={`${SPRITE}#wink`} />
            <use href={`${SPRITE}#mouth`} />
            <use className="sheep-face" href={`${SPRITE}#tongue`} />
          </g>
        </g>
      </g>
      {withWord ? <use href={`${SPRITE}#word`} /> : null}
    </svg>
  );
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** The official Plyxl app icon, for inline use next to the name. */
export function PlyxlMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <Image src="/plyxl-icon.png" alt="" width={64} height={64} className={`rounded-[22%] ${className}`} aria-hidden="true" />
  );
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
      <YCMark className="h-4 w-4" />
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
      href={YC_FOUNDER_URL}
      target="_blank"
      rel="me noopener noreferrer"
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
        // the eyes sit roughly 45% across and 47% down the art
        const ex = box.left + box.width * 0.45;
        const ey = box.top + box.height * 0.47;
        const dx = e.clientX - ex;
        const dy = e.clientY - ey;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = Math.min(8, dist / 15);
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
            className="plyxl-wordmark inline-flex items-center"
            aria-label="Plyxl"
          >
            <SheepArt withWord className="h-9 w-auto" />
          </a>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <YCBadge batch="W27" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              co-founder &amp; cto
            </span>
          </div>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-foreground/90">
            <span className="font-medium text-foreground">the workspace that does the work.</span>
          </p>
          <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
            ask for anything and plyxl&apos;s agent gets it done across your entire business — email,
            calendar, books, CRM and 200+ more tools, all in one workspace.
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
            <SheepArt pupilsRef={pupilsRef} className="h-auto w-32 sm:w-40" />
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
