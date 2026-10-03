'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '@/lib/theme-context';

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

/** Five-step grayscale ramps: empty cell first, busiest cell last. */
const CAL_THEME = {
  light: ['#ececec', '#c4c4c4', '#8a8a8a', '#4a4a4a', '#0a0a0a'],
  dark: ['#1c1c1c', '#3b3b3b', '#6a6a6a', '#a6a6a6', '#f5f5f5'],
};

export function GitHubPanel() {
  const { theme } = useTheme();
  const scheme = theme === 'dark' ? 'dark' : 'light';
  const [stats, setStats] = useState({ repos: 94, followers: 16 });

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
    <div>
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

      <div className="github-cal mt-3 overflow-x-auto pb-1">
        <GitHubCalendar
          username={USER}
          colorScheme={scheme}
          theme={CAL_THEME}
          blockSize={9}
          blockMargin={2}
          blockRadius={0}
          fontSize={10}
          year="last"
          showColorLegend={false}
          showTotalCount={false}
        />
      </div>
    </div>
  );
}
