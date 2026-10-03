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
    <button type="button" onClick={copy} className="text-link">
      {copied ? 'copied' : 'shettynirek@gmail.com'}
    </button>
  );
}

function Section({
  id,
  label,
  reveal = true,
  children,
}: {
  id: NavSection;
  label: string;
  reveal?: boolean;
  children: ReactNode;
}) {
  const inner = (
    <section id={id} className="site-section section">
      <h2 className="section-label">{label}</h2>
      {children}
    </section>
  );

  return reveal ? <Reveal>{inner}</Reveal> : inner;
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
      <header className="site-nav sticky top-0 z-50">
        <div className="site-wrap flex h-14 items-center justify-between">
          <button
            type="button"
            onClick={() => goTo('about')}
            className="flex items-center"
            aria-label="Nirek Shetty — back to top"
          >
            <Signature data-sig-target className="h-[22px] w-auto" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-5 text-[11px] text-muted-foreground">
            <span className="hidden sm:inline">
              <TorontoTime />
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="site-wrap pb-24 pt-12 sm:pt-20">
        <section id="about" className="site-section">
          <h1 className="font-display text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.5rem]">
            Nirek Shetty
          </h1>
          <ul className="mt-7 space-y-2.5 text-[0.95rem] leading-relaxed text-foreground/85">
            {NOTES.map((item, i) => (
              <li key={i} className="tight-list-item">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
            <SocialLinks className="flex flex-wrap items-center gap-x-5 gap-y-2" />
            <CopyEmail />
          </div>
        </section>

        <Section id="experiences" label="Experience" reveal={false}>
          <div>
            {EXPERIENCES.map((exp) => {
              const body = (
                <>
                  <p className="min-w-0 text-[0.95rem] leading-snug">
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
        </Section>

        <Section id="github" label="Code">
          <GitHubPanel />
        </Section>

        <Section id="books" label="Books">
          <Bookshelf compact />
        </Section>
      </main>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={goTo} />
    </Stage>
  );
}
