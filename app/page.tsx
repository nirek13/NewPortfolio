'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Signature } from '@/components/site/signature';
import { CommandPalette } from '@/components/site/command-palette';
import { Bookshelf } from '@/components/site/bookshelf';
import { SocialLinks } from '@/components/site/socials';
import { Stage, Reveal } from '@/components/site/stage';
import { GitHubPanel } from '@/components/site/github-panel';
import {
  EXPERIENCES,
  NAV_ITEMS,
  type NavSection,
} from '@/lib/portfolio-data';

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
  <>
    71/75 on the CCC. 9× <span className="link-waterloo">Waterloo</span> math.
  </>,
  <>
    <span className="link-toronto">Toronto</span> / Waterloo.
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
      className="tabular-nums uppercase tracking-[0.14em] transition-colors hover:text-foreground"
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
      className="text-[12px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? 'copied' : 'shettynirek@gmail.com'}
    </button>
  );
}

function Panel({
  id,
  label,
  span,
  reveal = true,
  children,
}: {
  id: NavSection;
  label: string;
  span: string;
  reveal?: boolean;
  children: ReactNode;
}) {
  const inner = (
    <section id={id} className="dash-panel site-section h-full">
      <p className="dash-label">{label}</p>
      {children}
    </section>
  );

  if (!reveal) return <div className={`${span} h-full`}>{inner}</div>;

  return <Reveal className={`${span} h-full`}>{inner}</Reveal>;
}

export default function Home() {
  const [section, setSection] = useState<NavSection>('about');
  const [cmdOpen, setCmdOpen] = useState(false);
  const quietUntil = useRef(0);

  const goTo = useCallback((id: NavSection) => {
    setSection(id);
    quietUntil.current = Date.now() + 900;
    scrollToSection(id);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as NavSection;
    if (NAV_ITEMS.some((item) => item.id === hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
      setSection(hash);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (Date.now() < quietUntil.current) return;
      const marker = 88;
      const positions = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        return { id: item.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const visible = positions.filter((p) => p.top <= marker);
      if (visible.length === 0) return;
      const bestTop = Math.max(...visible.map((p) => p.top));
      const row = visible.filter((p) => bestTop - p.top < 36);

      setSection((prev) => (row.some((p) => p.id === prev) ? prev : row[0].id));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Stage>
      <header className="sticky top-0 z-50">
        <nav className="dash-bar" aria-label="Sections">
          <div className="mx-auto flex h-10 max-w-[72rem] items-center gap-1 px-3 sm:h-11 sm:px-5">
            <button
              type="button"
              onClick={() => goTo('about')}
              className="flex shrink-0 items-center py-1 pr-1"
              aria-label="Nirek Shetty — back to top"
            >
              <Signature data-sig-target className="h-[22px] w-auto" aria-hidden="true" />
            </button>
            <span className="mx-1.5 hidden h-3.5 w-px bg-foreground/20 sm:block" aria-hidden />
            <div className="flex min-w-0 items-center overflow-x-auto">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  aria-current={section === item.id ? 'true' : undefined}
                  className={`shrink-0 border-b px-1.5 py-2.5 text-[10px] uppercase tracking-[0.1em] transition-colors sm:px-2.5 sm:py-3 sm:tracking-[0.14em] ${
                    section === item.id
                      ? 'border-foreground text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2.5 text-[10px] text-muted-foreground">
              <span className="hidden sm:inline">
                <TorontoTime />
              </span>
              <button
                type="button"
                onClick={() => setCmdOpen(true)}
                className="hidden border border-foreground/25 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.14em] transition-colors hover:border-foreground hover:text-foreground sm:inline"
                aria-label="Open command palette"
              >
                ⌘K
              </button>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-[72rem] px-3 pb-8 pt-2.5 sm:px-5 sm:pb-10 sm:pt-3">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-2.5">
          <Panel id="about" label="about" span="lg:col-span-7" reveal={false}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="font-display text-[1.55rem] font-semibold leading-[0.95] sm:text-[2.05rem]">
                Nirek Shetty
              </h1>
              <SocialLinks className="flex shrink-0 items-center gap-1" />
            </div>
            <ul className="mt-3 list-none space-y-1 text-[0.84rem] leading-snug text-foreground/85">
              {NOTES.map((item, i) => (
                <li key={i} className="tight-list-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <CopyEmail />
            </div>
          </Panel>

          <Panel id="experiences" label="experience" span="lg:col-span-5" reveal={false}>
            <div className="border-y border-foreground/20">
              {EXPERIENCES.map((exp) => {
                const body = (
                  <>
                    <p className="min-w-0 text-[0.88rem] leading-snug">
                      <span className="font-medium">{exp.org}</span>
                      <span className="text-muted-foreground"> — {exp.role}</span>
                    </p>
                    {exp.period ? (
                      <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {exp.period}
                      </span>
                    ) : null}
                  </>
                );

                return exp.href ? (
                  <a
                    key={exp.org}
                    href={exp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-row is-link"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={exp.org} className="exp-row">
                    {body}
                  </div>
                );
              })}
            </div>
          </Panel>


          <Panel id="github" label="code" span="lg:col-span-7">
            <GitHubPanel />
          </Panel>

          <Panel id="books" label="books" span="lg:col-span-5">
            <Bookshelf compact />
          </Panel>
        </div>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={goTo} />
    </Stage>
  );
}
