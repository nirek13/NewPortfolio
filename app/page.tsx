'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Signature } from '@/components/site/signature';
import { CommandPalette } from '@/components/site/command-palette';
import { Bookshelf } from '@/components/site/bookshelf';
import { SocialLinks } from '@/components/site/socials';
import { Stage } from '@/components/site/stage';
import { GitHubPanel } from '@/components/site/github-panel';
import { PlyxlFeature, PlyxlMark, YCBadge } from '@/components/site/plyxl';
import { YCFounderCard, YCMark } from '@/components/site/yc-card';
import { EXPERIENCES, NAV_ITEMS, type NavSection } from '@/lib/portfolio-data';

const NOTES = [
  <>
    prev. product engineer at{' '}
    <a href="https://penseum.com" target="_blank" rel="noopener noreferrer" className="link-penseum">
      @Penseum
    </a>
    , providing world-class education to over 2 million people worldwide.
  </>,
  <>
    started{' '}
    <a
      href="https://hna.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="link-hackathons"
    >
      Hackathons Canada
    </a>{' '}
    — <span className="link-google">Google</span>, <span className="link-microsoft">Microsoft</span>,
    25M views, 5k members.
  </>,
  <>
    <a href="https://ioai-official.org" target="_blank" rel="noopener noreferrer" className="link-ioai">
      IOAI Canada
    </a>{' '}
    silver medalist.{' '}
    <a
      href="https://www.spaceappschallenge.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="link-nasa"
    >
      NASA Space Apps
    </a>{' '}
    global nominee. winner of Canada&apos;s largest AI hackathon.
  </>,
  <>
    national finalist in{' '}
    <a href="https://dmz.torontomu.ca/" target="_blank" rel="noopener noreferrer" className="link-dmz">
      DMZ&apos;s
    </a>{' '}
    100k pitch competition. 3× <span className="link-ingenious">Ingenious+</span> Ontario winner.
  </>,
];

function scrollToSection(id: NavSection) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

function TorontoTime() {
  const [time, setTime] = useState<string | null>(null);
  const [hour12, setHour12] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: 'America/Toronto',
          hour12,
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, [hour12]);

  return (
    <button
      type="button"
      onClick={() => setHour12((v) => !v)}
      className="font-mono tabular-nums transition-colors hover:text-foreground"
      aria-label="Toggle 12-hour time"
    >
      Toronto {time ?? '––:––'}
    </button>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('shettynirek@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = 'mailto:shettynirek@gmail.com';
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="py-2 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? 'copied' : 'shettynirek@gmail.com'}
    </button>
  );
}

/**
 * One tile of the dashboard: a quiet header (index, title, optional meta on the
 * right) over its content. On phones only the active tab's tile is shown.
 */
function Panel({
  id,
  index,
  title,
  meta,
  className = '',
  children,
}: {
  id?: NavSection;
  index: number;
  title: string;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-h-0 ${className}`}>
      <section id={id} className="dash-panel site-section">
        <header className="panel-head">
          <span className="panel-index">{String(index).padStart(2, '0')}</span>
          <h2 className="panel-title">{title}</h2>
          {meta ? <span className="panel-meta">{meta}</span> : null}
        </header>
        <div className="panel-body">{children}</div>
      </section>
    </div>
  );
}

/** Bottom tab bar labels for phones. */
const TAB_LABELS: Record<NavSection, string> = {
  about: 'About',
  experiences: 'Work',
  plyxl: 'Plyxl',
  github: 'Code',
  books: 'Books',
};

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [tab, setTab] = useState<NavSection>('about');

  const goTo = useCallback((id: NavSection) => {
    setTab(id);
    requestAnimationFrame(() => scrollToSection(id));
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as NavSection;
    if (NAV_ITEMS.some((item) => item.id === hash)) goTo(hash);
  }, [goTo]);

  /** hides a tile on phones unless its tab is open; desktop always shows every tile */
  const onTab = (id: NavSection) => (tab === id ? '' : 'max-lg:hidden');

  return (
    <Stage>
      <header className="sticky top-0 z-50">
        <nav className="dash-bar" aria-label="Site">
          <div className="mx-auto flex h-12 max-w-[80rem] items-center justify-between px-4 sm:px-6">
            <button
              type="button"
              onClick={() => goTo('about')}
              className="-ml-1 flex items-center p-1"
              aria-label="Nirek Shetty — back to top"
            >
              <Signature data-sig-target className="h-[22px] w-auto" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <button
                type="button"
                onClick={() => setCmdOpen(true)}
                className="hidden font-mono transition-colors hover:text-foreground lg:inline"
              >
                ⌘K
              </button>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="dash-main relative z-10 mx-auto max-w-[80rem] px-3 pt-3 sm:px-5">
        <div className="dash-grid">
          <Panel id="about" index={1} title="About" meta={<TorontoTime />} className={`lg:col-span-5 ${onTab('about')}`}>
            <h1 className="font-display text-[2.3rem] font-medium leading-[0.95] sm:text-[2.6rem]">
              Nirek Shetty
            </h1>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-foreground/90">
              Co-founder &amp; CTO of{' '}
              <a href="https://plyxl.com" target="_blank" rel="noopener noreferrer" className="link-plyxl plyxl-inline">
                <PlyxlMark />
                Plyxl
              </a>{' '}
              <YCBadge batch="W27" className="is-small align-[0.12em]" />
              <span className="text-muted-foreground"> — the workspace that does the work.</span>
            </p>

            <ul className="mt-4 list-none space-y-1.5 text-[0.86rem] leading-relaxed text-foreground/75 lg:text-[0.82rem]">
              {NOTES.map((item, i) => (
                <li key={i} className="tight-list-item">
                  {item}
                </li>
              ))}
            </ul>

            <div className="panel-foot">
              <CopyEmail />
              <SocialLinks className="-mr-2 flex items-center" />
            </div>
          </Panel>

          <div className={`flex min-h-0 flex-col gap-3 lg:col-span-3 ${onTab('experiences')}`}>
            <Panel id="experiences" index={2} title="Experience" meta={`${EXPERIENCES.length} roles`}>
              {EXPERIENCES.map((exp) => {
                const body = (
                  <>
                    <p className="flex min-w-0 items-center gap-2 text-[0.88rem] leading-snug">
                      {exp.logo ? (
                        <Image src={exp.logo} alt="" width={16} height={16} className="h-4 w-4 shrink-0 rounded-[22%]" />
                      ) : null}
                      <span className="font-medium">{exp.org}</span>
                      <span className="truncate text-muted-foreground">{exp.role}</span>
                    </p>
                    {exp.yc ? (
                      <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground">
                        <YCMark className="h-3 w-3" />
                        {exp.yc.toLowerCase()}
                      </span>
                    ) : exp.period ? (
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{exp.period}</span>
                    ) : null}
                  </>
                );

                return exp.href ? (
                  <a key={exp.org} href={exp.href} target="_blank" rel="noopener noreferrer" className="exp-row is-link">
                    {body}
                  </a>
                ) : (
                  <div key={exp.org} className="exp-row">
                    {body}
                  </div>
                );
              })}
            </Panel>

            <Panel index={3} title="Backed by" meta="YC W27" className="flex-1">
              <YCFounderCard />
            </Panel>
          </div>

          <Panel id="plyxl" index={4} title="Plyxl" meta="plyxl.com" className={`lg:col-span-4 lg:col-start-6 lg:row-start-1 ${onTab('plyxl')}`}>
            <PlyxlFeature />
          </Panel>

          <Panel id="github" index={5} title="Code" meta="last 12 months" className={`lg:col-span-7 ${onTab('github')}`}>
            <GitHubPanel />
          </Panel>

          <Panel id="books" index={6} title="Reading" meta="hover a spine" className={`lg:col-span-5 ${onTab('books')}`}>
            <Bookshelf compact />
          </Panel>
        </div>
      </main>

      <nav className="mob-tabs lg:hidden" aria-label="Sections">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(item.id)}
            aria-current={tab === item.id ? 'page' : undefined}
            className="mob-tab"
          >
            {TAB_LABELS[item.id]}
          </button>
        ))}
      </nav>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={goTo} />
    </Stage>
  );
}
