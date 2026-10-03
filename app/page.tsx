'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Signature } from '@/components/site/signature';
import { CommandPalette } from '@/components/site/command-palette';
import { Bookshelf } from '@/components/site/bookshelf';
import { SocialLinks } from '@/components/site/socials';
import { Stage, Reveal } from '@/components/site/stage';
import { GitHubPanel } from '@/components/site/github-panel';
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
  <>
    71/75 on the CCC. 9× <span className="link-waterloo">Waterloo</span> math.
  </>,
  <>
    <span className="link-toronto">Toronto</span> / Waterloo.
  </>,
];

/** Kanji numerals used as the panel index marks. */
const KANJI = ['一', '二', '三', '四', '五', '六'];

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
      className="font-mono tabular-nums uppercase tracking-[0.14em] transition-colors hover:text-foreground"
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
      className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? 'copied' : 'shettynirek@gmail.com'}
    </button>
  );
}

function Panel({
  id,
  index,
  label,
  span,
  reveal = true,
  children,
}: {
  id: NavSection;
  index: number;
  label: string;
  span: string;
  reveal?: boolean;
  children: ReactNode;
}) {
  const inner = (
    <section id={id} className="dash-panel site-section h-full">
      <p className="dash-label">
        <span className="label-index">{String(index).padStart(2, '0')}</span>
        <span>{label}</span>
        <span className="label-rule" aria-hidden />
        <span className="label-kanji" aria-hidden>
          {KANJI[index - 1]}
        </span>
      </p>
      {children}
    </section>
  );

  if (!reveal) return <div className={`${span} h-full`}>{inner}</div>;

  return <Reveal className={`${span} h-full`}>{inner}</Reveal>;
}

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);

  const goTo = useCallback((id: NavSection) => scrollToSection(id), []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as NavSection;
    if (NAV_ITEMS.some((item) => item.id === hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, []);

  return (
    <Stage>
      <header className="sticky top-0 z-50">
        <nav className="dash-bar" aria-label="Site">
          <div className="mx-auto flex h-12 max-w-[72rem] items-center justify-between px-4 sm:px-6">
            <button
              type="button"
              onClick={() => goTo('about')}
              className="flex items-center py-1"
              aria-label="Nirek Shetty — back to top"
            >
              <Signature data-sig-target className="h-[22px] w-auto" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-5 text-[10px] text-muted-foreground">
              <span className="hidden sm:inline">
                <TorontoTime />
              </span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-[72rem] px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-7">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
          <Panel id="about" index={1} label="about" span="lg:col-span-7" reveal={false}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <h1 className="font-display text-[1.7rem] font-semibold leading-[0.95] sm:text-[2.2rem]">
                Nirek Shetty
              </h1>
              <SocialLinks className="flex shrink-0 items-center gap-1.5" />
            </div>
            <ul className="mt-4 list-none space-y-1.5 text-[0.86rem] leading-relaxed text-foreground/85">
              {NOTES.map((item, i) => (
                <li key={i} className="tight-list-item">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <CopyEmail />
            </div>
          </Panel>

          <Panel id="experiences" index={2} label="experience" span="lg:col-span-5" reveal={false}>
            <div>
              {EXPERIENCES.map((exp) => {
                const body = (
                  <>
                    <p className="min-w-0 text-[0.88rem] leading-snug">
                      <span className="font-medium">{exp.org}</span>
                      <span className="text-muted-foreground"> — {exp.role}</span>
                    </p>
                    {exp.period ? (
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
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

          <Panel id="github" index={3} label="code" span="lg:col-span-7">
            <GitHubPanel />
          </Panel>

          <Panel id="books" index={4} label="books" span="lg:col-span-5">
            <Bookshelf compact />
          </Panel>
        </div>
      </div>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={goTo} />
    </Stage>
  );
}
