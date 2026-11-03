'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Activity } from 'react-github-calendar';
import { useTheme } from '@/lib/theme-context';
import { CommitGraph } from '@/components/site/svg/commit-graph';

/**
 * Client-only: the calendar lays out "the last year" from today's date, so a
 * page prerendered on the server (UTC, at build time) can disagree with the
 * visitor's browser and trip a hydration mismatch. Rendering it after mount
 * sidesteps that entirely; the placeholder keeps the panel from jumping.
 */
const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then((m) => m.GitHubCalendar),
  { ssr: false, loading: () => <div className="github-cal-placeholder" aria-hidden /> }
);

const USER = 'nirek13';
const BLOCK = 9;
const GAP = 2;

/** Five-step grayscale ramps: empty cell first, busiest cell last. */
const CAL_THEME = {
  light: ['#ececec', '#c4c4c4', '#8a8a8a', '#4a4a4a', '#0a0a0a'],
  dark: ['#1c1c1c', '#3b3b3b', '#6a6a6a', '#a6a6a6', '#f5f5f5'],
};

/**
 * Tags every cell with its week column (`--w`) so CSS can sweep the year in
 * from left to right, like a wave, once the calendar has data.
 */
function useCalendarWave(root: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    // the wave waits until the calendar is actually on screen (a phone card may load off to the side)
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      el.classList.add('is-waving');
      io.disconnect();
    });
    const tag = () => {
      const cells = el.querySelectorAll<SVGRectElement>('svg rect');
      if (cells.length < 30) return false;
      cells.forEach((cell) => {
        const x = Number(cell.getAttribute('x')) || 0;
        cell.style.setProperty('--w', String(Math.round(x / (BLOCK + GAP))));
      });
      el.classList.add('is-tagged');
      io.observe(el);
      return true;
    };
    const mo = new MutationObserver(() => {
      if (tag()) mo.disconnect();
    });
    if (!tag()) mo.observe(el, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [root]);
}

export function GitHubPanel() {
  const { theme } = useTheme();
  const scheme = theme === 'dark' ? 'dark' : 'light';
  const [stats, setStats] = useState({ repos: 94, followers: 16 });
  const calRef = useRef<HTMLDivElement>(null);
  /** how many week columns fit the panel; null until measured (and on desktop, the full year) */
  const [weeks, setWeeks] = useState<number | null>(null);

  useCalendarWave(calRef);

  useEffect(() => {
    const el = calRef.current;
    if (!el) return;
    // phones get the most recent weeks that fit, instead of a sideways-scrolling year
    const fit = Math.floor((el.clientWidth + GAP) / (BLOCK + GAP));
    setWeeks(fit >= 53 ? null : Math.max(12, fit));
  }, []);

  const trim = useCallback(
    (data: Array<Activity>) => {
      if (!weeks || data.length === 0) return data;
      const lastDay = new Date(`${data[data.length - 1].date}T00:00:00`).getDay();
      return data.slice(-((weeks - 1) * 7 + lastDay + 1));
    },
    [weeks]
  );

  useEffect(() => {
    fetch(`https://api.github.com/users/${USER}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        setStats({
          repos: data.public_repos ?? 94,
          followers: data.followers ?? 16,
        });
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <a
          href={`https://github.com/${USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.88rem] font-medium transition-colors hover:text-foreground"
        >
          github.com/{USER}
        </a>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {stats.repos} repos · {stats.followers} followers · since 2020
        </p>
      </div>

      <div ref={calRef} className="github-cal mt-3 overflow-x-auto pb-1">
        <GitHubCalendar
          username={USER}
          colorScheme={scheme}
          theme={CAL_THEME}
          blockSize={BLOCK}
          blockMargin={GAP}
          blockRadius={0}
          fontSize={10}
          year="last"
          showColorLegend={false}
          showTotalCount={false}
          transformData={weeks ? trim : undefined}
        />
      </div>

      <div className="code-graph">
        <CommitGraph />
      </div>
    </div>
  );
}
