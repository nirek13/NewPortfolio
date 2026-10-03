'use client';

import { useEffect, useRef, useState } from 'react';
import { SIGNATURE_PATH, SIGNATURE_VIEWBOX } from '@/lib/signature-path';
import {
  INTRO_EXIT_MS,
  INTRO_HOLD_AFTER_INK_MS,
  INTRO_MAX_WAIT_MS,
  INTRO_MIN_VISIBLE_MS,
  INTRO_ONCE_PER_SESSION,
  INTRO_SESSION_KEY,
} from '@/lib/signature-intro';

/**
 * Intro: the signature is traced as a hairline, inks in from left to right,
 * holds, then flies into its slot in the nav bar.
 *
 * The trace + ink stages are pure CSS and start before hydration (the
 * `data-sig-loading` attribute is set by an inline script in the layout, and
 * `data-sig-start` records the first painted frame). JS only decides when to
 * leave: after the ink animation has really finished AND the mark has been on
 * screen for at least INTRO_MIN_VISIBLE_MS, whichever is later.
 */
export function SignatureLoader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const mark = (name: string) => {
      try {
        performance.mark(`sig-intro:${name}`);
      } catch {
        /* older browsers */
      }
    };

    // The boot script decides whether the intro runs at all.
    const boot = (window as Window & { __sigIntro?: { start: number } }).__sigIntro;
    if (!boot) {
      setDone(true);
      return;
    }

    // If React had to client-render the root (hydration mismatch) it resets
    // the <html> attributes, which hides the overlay and restarts its CSS
    // animations. Put the flag back and restart the clock from now.
    if (!html.hasAttribute('data-sig-loading')) {
      mark('restarted');
      boot.start = performance.now();
      html.dataset.sigStart = String(boot.start);
      html.setAttribute('data-sig-loading', '');
    }

    const root = rootRef.current;
    const started = Number(html.dataset.sigStart) || boot.start || performance.now();
    mark('hydrated');
    const timers: number[] = [];
    const after = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, Math.max(0, ms)));
    };

    let leaving = false;
    let inkDone = false;
    let clockDone = false;

    const finish = () => {
      mark('finish');
      html.removeAttribute('data-sig-loading');
      delete html.dataset.sigStart;
      delete (window as Window & { __sigIntro?: unknown }).__sigIntro;
      if (INTRO_ONCE_PER_SESSION) {
        try {
          sessionStorage.setItem(INTRO_SESSION_KEY, '1');
        } catch {
          /* storage unavailable */
        }
      }
      setDone(true);
    };

    const leave = () => {
      if (leaving) return;
      leaving = true;
      mark('leave');

      const el = markRef.current;
      const target = document.querySelector<HTMLElement>('[data-sig-target]');
      if (el && target) {
        const from = el.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        if (from.width > 0 && to.width > 0) {
          const scale = to.width / from.width;
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px) scale(${scale.toFixed(4)})`;
        }
      }
      root?.classList.add('is-leaving');
      after(INTRO_EXIT_MS, finish);
    };

    const tryLeave = () => {
      if (inkDone && clockDone) leave();
    };

    // 1. the ink animation must have actually played out
    const inkAnim = fillRef.current
      ?.getAnimations()
      .find((a) => (a as CSSAnimation).animationName === 'sig-ink');
    if (!inkAnim || inkAnim.playState === 'finished') {
      inkDone = true;
    } else {
      inkAnim.finished
        .then(() => {
          mark('ink-done');
          after(INTRO_HOLD_AFTER_INK_MS, () => {
            inkDone = true;
            tryLeave();
          });
        })
        .catch(() => {
          inkDone = true;
          tryLeave();
        });
    }

    // 2. ...and the mark must have been visible for the minimum time.
    //    The clock starts on the first painted frame: a background tab paints
    //    nothing (and keeps its CSS animations at frame zero) until it is
    //    shown, so the intro waits for the visitor instead of running blind.
    const arm = () => {
      const base = Number(html.dataset.sigStart) || boot.start || started;
      mark('armed');
      after(base + INTRO_MIN_VISIBLE_MS - performance.now(), () => {
        clockDone = true;
        tryLeave();
      });
      // 3. never hold the page hostage
      after(base + INTRO_MAX_WAIT_MS - performance.now(), leave);
    };
    // double rAF: the boot script's own rAF (which stamps data-sig-start) runs first
    const raf = requestAnimationFrame(() => requestAnimationFrame(arm));

    root?.addEventListener('click', leave);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
      root?.removeEventListener('click', leave);
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="sig-loader" aria-hidden="true">
      <div ref={markRef} className="sig-loader-mark">
        <svg ref={fillRef} className="sig-fill-svg" viewBox={SIGNATURE_VIEWBOX}>
          <path d={SIGNATURE_PATH} fill="currentColor" fillRule="evenodd" />
        </svg>
        <svg className="sig-trace-svg" viewBox={SIGNATURE_VIEWBOX}>
          <path className="sig-trace" d={SIGNATURE_PATH} />
        </svg>
      </div>
    </div>
  );
}
