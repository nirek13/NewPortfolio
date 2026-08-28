'use client';

import { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '@/lib/theme-context';
import { FEATURED_REPOS } from '@/lib/portfolio-data';

const USER = 'nirek13';

const CAL_THEME = {
  light: ['#e6e4de', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#2a2622', '#0e4429', '#006d32', '#26a641', '#39d353'],
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
        <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
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

      <div className="mt-4 border-y border-foreground/20">
        {FEATURED_REPOS.map((repo) => (
          <a
            key={repo.name}
            href={repo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="exp-row is-link"
          >
            <p className="min-w-0 text-[0.88rem] leading-snug">
              <span className="font-medium">{repo.name}</span>
              <span className="text-muted-foreground"> — {repo.blurb}</span>
            </p>
            <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {repo.lang}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
