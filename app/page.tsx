'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Signature } from '@/components/site/signature';
import { CommandPalette } from '@/components/site/command-palette';
import { Bookshelf } from '@/components/site/bookshelf';
import { SocialLinks } from '@/components/site/socials';
import { Stage } from '@/components/site/stage';
import { GitHubPanel } from '@/components/site/github-panel';
import { PlyxlFeature, PlyxlMark, YCBadge } from '@/components/site/plyxl';
import { YCMark } from '@/components/site/yc-card';
import { SectionIcon, PanelCorners } from '@/components/site/svg/section-icon';
import { AnalogClock } from '@/components/site/svg/analog-clock';
import { DrawnCheck, PenArrow, PenUnderline } from '@/components/site/svg/pen';
import { GridSpotlight } from '@/components/site/svg/grid-spotlight';
import { BOOKS, EXPERIENCES, NAV_ITEMS, type NavSection } from '@/lib/portfolio-data';

const NOTES = [
  <>
    prev. product engineer at{' '}
    <a href="https://penseum.com" target="_blank" rel="noopener noreferrer" className="link-penseum">
      @Penseum
    </a>
    , 2M+ learners.
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
    5k members.
  </>,
  <>
    <a href="https://ioai-official.org" target="_blank" rel="noopener noreferrer" className="link-ioai">
      IOAI Canada
    </a>{' '}
    silver.{' '}
    <a
      href="https://www.spaceappschallenge.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="link-nasa"
    >
      NASA Space Apps
    </a>{' '}
    global nominee.
  </>,
];

/** Bottom tab bar labels for phones. */
const TAB_LABELS: Record<NavSection, string> = {
  about: 'About',
  experiences: 'Work',
  plyxl: 'Plyxl',
  github: 'Code',
  books: 'Books',
};

/** One-line teasers for the section index on the phone's About card. */
const INDEX_HINTS: Partial<Record<NavSection, string>> = {
  experiences: EXPERIENCES.map((e) => e.org).slice(0, 3).join(', '),
  plyxl: 'pet the sheep',
  github: 'a year of commits',
  books: `${BOOKS.length} books on the shelf`,
};

const SECTION_INDEX = NAV_ITEMS.map((item) => item.id);

/** Phones and tablets get the swipeable card deck; desktop gets the one-screen grid. */
const DECK_QUERY = '(max-width: 1023px)';

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
    const timer = setInterval(tick, 15_000);
    return () => clearInterval(timer);
  }, [hour12]);

  return (
    <button
      type="button"
      onClick={() => setHour12((v) => !v)}
      className="inline-flex items-center gap-1.5 font-mono tabular-nums transition-colors hover:text-foreground"
      aria-label="Toggle 12-hour time"
    >
      <AnalogClock className="h-3.5 w-3.5" />
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
      className="inline-flex items-center gap-1.5 py-2 font-mono text-[12px] text-muted-foreground transition-colors hover:text-foreground"
    >
      {copied ? (
        <>
          <DrawnCheck className="h-3.5 w-3.5 text-foreground" />
          copied
        </>
      ) : (
        'shettynirek@gmail.com'
      )}
    </button>
  );
}

/**
 * One tile of the dashboard: a quiet header (icon, index, title, optional meta
 * on the right) over its content, with bracket corners that draw themselves in.
 * On phones each tile is one card in the swipeable deck.
 */
function Panel({
  id,
  index,
  title,
  meta,
  className = '',
  children,
}: {
  id: NavSection;
  index: number;
  title: string;
  meta?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`deck-slide flex min-h-0 ${className}`} style={{ ['--pi' as string]: index - 1 }}>
      <section id={id} className="dash-panel site-section" aria-labelledby={`${id}-title`}>
        <PanelCorners />
        <header className="panel-head">
          <SectionIcon id={id} className="panel-icon" />
          <span className="panel-index">{String(index).padStart(2, '0')}</span>
          <h2 id={`${id}-title`} className="panel-title">
            {title}
          </h2>
          {meta ? <span className="panel-meta">{meta}</span> : null}
        </header>
        <div className="panel-body">{children}</div>
      </section>
    </div>
  );
}

function ExperienceList() {
  return (
    <ol className="exp-list">
      {EXPERIENCES.map((exp, i) => {
        const current = Boolean(exp.yc);
        const body = (
          <>
            <svg viewBox="0 0 12 12" className={`exp-node${current ? ' is-current' : ''}`} aria-hidden="true">
              {current ? <circle className="exp-node-pulse" cx="6" cy="6" r="3.6" /> : null}
              <path className="exp-node-dot" d="M6 2.4a3.6 3.6 0 1 1 0 7.2a3.6 3.6 0 1 1 0-7.2Z" pathLength={1} />
            </svg>
            <p className="flex min-w-0 items-center gap-2 text-[0.88rem] leading-snug">
              {exp.logo ? (
                <Image src={exp.logo} alt="" width={16} height={16} className="h-4 w-4 shrink-0 rounded-[22%]" />
              ) : null}
              <span className="whitespace-nowrap font-medium">{exp.org}</span>
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

        return (
          <li key={exp.org} style={{ ['--ei' as string]: i }}>
            {exp.href ? (
              <a href={exp.href} target="_blank" rel="noopener noreferrer" className="exp-row is-link">
                {body}
              </a>
            ) : (
              <div className="exp-row">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Phones only: the About card doubles as a table of contents for the deck. */
function SectionIndex({ onNavigate }: { onNavigate: (id: NavSection) => void }) {
  return (
    <div className="m-index lg:hidden">
      <p className="m-index-head">
        <span>Index</span>
        <span className="m-swipe" aria-hidden="true">
          swipe
          <svg viewBox="0 0 28 10">
            <path d="M1 5h24M21 1.5 25.5 5 21 8.5" />
          </svg>
        </span>
      </p>
      <ul>
        {NAV_ITEMS.filter((item) => item.id !== 'about').map((item, i) => (
          <li key={item.id}>
            <button type="button" className="m-index-row" onClick={() => onNavigate(item.id)}>
              <SectionIcon id={item.id} className="m-index-icon" />
              <span className="font-mono text-[11px] text-muted-foreground">{String(i + 2).padStart(2, '0')}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.95rem] font-medium leading-tight">{TAB_LABELS[item.id]}</span>
                <span className="block truncate text-[0.78rem] text-muted-foreground">{INDEX_HINTS[item.id]}</span>
              </span>
              <svg viewBox="0 0 16 16" className="m-index-arrow" aria-hidden="true">
                <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Drives the phone deck: tracks swipe progress continuously (for the tab pill
 * and the card depth effect) and reports which card has settled in the middle.
 */
function useDeck(onSettle: (id: NavSection) => void) {
  const deckRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLElement>(null);
  const settleRef = useRef(onSettle);
  settleRef.current = onSettle;

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const mq = window.matchMedia(DECK_QUERY);
    let frame = 0;
    let last = -1;

    const stride = () => {
      const [a, b] = deck.children as unknown as HTMLElement[];
      return a && b ? b.offsetLeft - a.offsetLeft : deck.clientWidth;
    };

    const paint = () => {
      frame = 0;
      if (!mq.matches) return;
      const p = deck.scrollLeft / Math.max(1, stride());
      tabsRef.current?.style.setProperty('--deck-p', p.toFixed(4));
      Array.from(deck.children).forEach((slide, i) => {
        (slide as HTMLElement).style.setProperty('--d', Math.min(1, Math.abs(i - p)).toFixed(3));
      });
      const idx = Math.round(p);
      if (idx !== last && SECTION_INDEX[idx]) {
        last = idx;
        settleRef.current(SECTION_INDEX[idx]);
      }
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    deck.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    mq.addEventListener('change', queue);
    return () => {
      cancelAnimationFrame(frame);
      deck.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      mq.removeEventListener('change', queue);
    };
  }, []);

  /** Brings a card to the middle of the deck. Returns false on desktop (no deck). */
  const show = useCallback((id: NavSection, smooth = true) => {
    const deck = deckRef.current;
    if (!deck || !window.matchMedia(DECK_QUERY).matches) return false;
    const slide = deck.children[SECTION_INDEX.indexOf(id)] as HTMLElement | undefined;
    if (!slide) return false;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    deck.scrollTo({
      left: slide.offsetLeft - (deck.clientWidth - slide.offsetWidth) / 2,
      behavior: smooth && !reduce ? 'smooth' : 'auto',
    });
    return true;
  }, []);

  return { deckRef, tabsRef, show };
}

export default function Home() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [tab, setTab] = useState<NavSection>('about');
  const { deckRef, tabsRef, show } = useDeck(setTab);

  const goTo = useCallback(
    (id: NavSection, smooth = true) => {
      setTab(id);
      window.history.replaceState(null, '', id === 'about' ? window.location.pathname : `#${id}`);
      if (show(id, smooth)) return;
      document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    },
    [show]
  );

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as NavSection;
    if (SECTION_INDEX.includes(hash)) goTo(hash, false);
  }, [goTo]);

  return (
    <Stage>
      <GridSpotlight />
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

      <main className="dash-main relative z-10 mx-auto max-w-[80rem] sm:px-5 lg:px-3 lg:pt-3">
        <div ref={deckRef} className="dash-grid">
          <Panel id="about" index={1} title="About" meta={<TorontoTime />} className="lg:col-span-5">
            <h1 className="hero-name font-display text-[2.6rem] font-medium leading-[0.95] lg:text-[2.6rem]">
              <span className="relative inline-block">
                Nirek Shetty
                <PenUnderline />
              </span>
            </h1>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-foreground/90 lg:mt-3 lg:text-[0.98rem]">
              Co-founder &amp; CTO of{' '}
              <a href="https://plyxl.com" target="_blank" rel="noopener noreferrer" className="link-plyxl plyxl-inline">
                <PlyxlMark />
                Plyxl
              </a>{' '}
              <YCBadge batch="W27" className="is-small align-[0.12em]" />
            </p>

            <ul className="mt-4 list-none space-y-1.5 text-[0.9rem] leading-relaxed text-foreground/75 lg:text-[0.82rem]">
              {NOTES.map((item, i) => (
                <li key={i} className="tight-list-item">
                  {item}
                </li>
              ))}
            </ul>

            <SectionIndex onNavigate={goTo} />

            <div className="panel-foot">
              <span className="say-hi" aria-hidden="true">
                <span className="font-hand">say hi</span>
                <PenArrow />
              </span>
              <CopyEmail />
              <SocialLinks className="-mr-2 flex items-center" />
            </div>
          </Panel>

          <Panel id="experiences" index={2} title="Experience" className="lg:col-span-3">
            <ExperienceList />
          </Panel>

          <Panel id="plyxl" index={3} title="Plyxl" className="lg:col-span-4 lg:col-start-6 lg:row-start-1">
            <PlyxlFeature />
          </Panel>

          <Panel id="github" index={4} title="Code" className="lg:col-span-7">
            <GitHubPanel />
          </Panel>

          <Panel id="books" index={5} title="Reading" className="lg:col-span-5">
            <Bookshelf compact />
          </Panel>
        </div>
      </main>

      <nav ref={tabsRef} className="mob-tabs lg:hidden" aria-label="Sections">
        <span className="mob-pill" aria-hidden="true" />
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(item.id)}
            aria-current={tab === item.id ? 'page' : undefined}
            className="mob-tab"
          >
            <SectionIcon id={item.id} className="mob-tab-icon" />
            <span>{TAB_LABELS[item.id]}</span>
          </button>
        ))}
      </nav>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} onNavigate={goTo} />
    </Stage>
  );
}
