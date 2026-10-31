'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Signature } from '@/components/site/signature';
import { CommandPalette } from '@/components/site/command-palette';
import { Bookshelf } from '@/components/site/bookshelf';
import { SocialLinks } from '@/components/site/socials';
import { Stage, Reveal } from '@/components/site/stage';
import { GitHubPanel } from '@/components/site/github-panel';
import { PlyxlFeature, PlyxlMark, YCBadge } from '@/components/site/plyxl';
import { YCFounderCard } from '@/components/site/yc-card';
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

/** A section of the single column: a small label in the margin, content beside it. */
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
    <section id={id} className="site-section min-section">
      <h2 className="section-label">{label}</h2>
      <div className="min-w-0">{children}</div>
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
      <header className="sticky top-0 z-50">
        <nav className="min-bar" aria-label="Site">
          <div className="mx-auto flex h-14 max-w-[46rem] items-center justify-between px-5 sm:px-6">
            <button
              type="button"
              onClick={() => goTo('about')}
              className="-ml-1 flex items-center p-1"
              aria-label="Nirek Shetty — back to top"
            >
              <Signature data-sig-target className="h-[22px] w-auto" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
              <span className="hidden sm:inline">
                <TorontoTime />
              </span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-[46rem] px-5 pb-20 sm:px-6 sm:pb-28">
        <section id="about" className="site-section pb-12 pt-12 sm:pb-16 sm:pt-20">
          <h1 className="font-display text-[2.6rem] font-medium leading-[0.95] sm:text-[3.4rem]">
            Nirek Shetty
          </h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-foreground/90 sm:text-[1.05rem]">
            Co-founder &amp; CTO of{' '}
            <a href="https://plyxl.com" target="_blank" rel="noopener noreferrer" className="link-plyxl plyxl-inline">
              <PlyxlMark />
              Plyxl
            </a>{' '}
            <YCBadge batch="W27" className="is-small align-[0.12em]" />
            <span className="text-muted-foreground"> — the workspace that does the work. Toronto.</span>
          </p>

          <ul className="mt-7 list-none space-y-2 text-[0.92rem] leading-relaxed text-foreground/75">
            {NOTES.map((item, i) => (
              <li key={i} className="tight-list-item">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <YCFounderCard />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <CopyEmail />
            <SocialLinks className="-mr-2 flex items-center" />
          </div>
        </section>

        <Section id="experiences" label="Experience" reveal={false}>
          {EXPERIENCES.map((exp) => {
            const body = (
              <>
                <p className="flex min-w-0 items-center gap-2 text-[0.92rem] leading-snug">
                  {exp.logo ? (
                    <Image src={exp.logo} alt="" width={16} height={16} className="h-4 w-4 shrink-0 rounded-[22%]" />
                  ) : null}
                  <span className="font-medium">{exp.org}</span>
                  <span className="truncate text-muted-foreground">{exp.role}</span>
                </p>
                {exp.yc ? (
                  <YCBadge batch={exp.yc} asLink={false} className="is-small shrink-0" />
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
        </Section>

        <Section id="plyxl" label="Plyxl">
          <PlyxlFeature />
        </Section>

        <Section id="github" label="Code">
          <GitHubPanel />
        </Section>

        <Section id="books" label="Reading">
          <Bookshelf compact />
        </Section>
      </main>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={goTo} />
    </Stage>
  );
}
