'use client';

import { useEffect, useRef, useState } from 'react';
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from '@/lib/signature-path';

/**
 * First-visit intro: the signature is traced as a hairline, inks in from left
 * to right, then flies into its slot in the nav bar.
 *
 * The trace + ink stages are pure CSS and start before hydration (the
 * `data-sig-loading` attribute is set by an inline script in the layout).
 * JS only handles the exit, so a slow bundle never freezes the drawing.
 */
const SESSION_KEY = 'sig-intro-seen';
const INTRO_MS = 1900;
const EXIT_MS = 780;

export function SignatureLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (!html.hasAttribute('data-sig-loading')) {
      setDone(true);
      return;
    }

    const root = rootRef.current;
    const started = Number(html.dataset.sigStart) || performance.now();
    let leaving = false;
    let exitTimer: number | undefined;
    let finishTimer: number | undefined;

    const finish = () => {
      html.removeAttribute('data-sig-loading');
      delete html.dataset.sigStart;
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* storage unavailable */
      }
      setDone(true);
    };

    const leave = () => {
      if (leaving) return;
      leaving = true;
      window.clearTimeout(exitTimer);

      const mark = markRef.current;
      const target = document.querySelector<HTMLElement>('[data-sig-target]');
      if (mark && target) {
        const from = mark.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        if (from.width > 0 && to.width > 0) {
          const scale = to.width / from.width;
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          mark.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        }
      }
      root?.classList.add('is-leaving');
      finishTimer = window.setTimeout(finish, EXIT_MS);
    };

    const remaining = Math.max(0, INTRO_MS - (performance.now() - started));
    exitTimer = window.setTimeout(leave, remaining);
    root?.addEventListener('click', leave);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
      root?.removeEventListener('click', leave);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="sig-loader" aria-hidden="true">
      <div ref={markRef} className="sig-loader-mark">
        <svg className="sig-fill-svg" viewBox={SIGNATURE_VIEWBOX}>
          <path d={SIGNATURE_PATH} fill="currentColor" fillRule="evenodd" />
        </svg>
        <svg className="sig-trace-svg" viewBox={SIGNATURE_VIEWBOX}>
          <path className="sig-trace" d={SIGNATURE_PATH} />
        </svg>
      </div>
    </div>
  );
}
