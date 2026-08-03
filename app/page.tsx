'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  User,
  Code,
  Heart,
  BookOpen,
  Mail,
} from 'lucide-react';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { CommandPalette } from '@/components/site/command-palette';
import { Bookshelf } from '@/components/site/bookshelf';
import { photos } from '@/lib/photos';
import {
  BADGE_CLASS,
  EXPERIENCES,
  NAV_ITEMS,
  PHILOSOPHY,
  PORTFOLIO_ITEMS,
  type NavSection,
  type ProjectFilter,
} from '@/lib/portfolio-data';

function XIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function LinkedInIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const MOBILE_NAV: { id: NavSection; icon: React.ElementType | 'photos' }[] = [
  { id: 'about', icon: User },
  { id: 'experiences', icon: Code },
  { id: 'philosophy', icon: Heart },
  { id: 'books', icon: BookOpen },
  { id: 'photos', icon: 'photos' },
];

function AboutSection({
  filter,
  setFilter,
  expanded,
  setExpanded,
  onSearch,
}: {
  filter: ProjectFilter;
  setFilter: (f: ProjectFilter) => void;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  onSearch: () => void;
}) {
  const items = PORTFOLIO_ITEMS.filter((item) => item.category.includes(filter));
  const highlights = expanded
    ? [
        <>
          product engineer at{' '}
          <a href="https://penseum.com" target="_blank" rel="noopener noreferrer" className="link-penseum">
            @Penseum
          </a>
          , helping 1M+ users learn
        </>,
        <>
          founded{' '}
          <a
            href="https://hackathonscanada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hackathons"
          >
            Hackathons Canada
          </a>
          , partnered with{' '}
          <span className="link-google">Google</span> and{' '}
          <span className="link-microsoft">Microsoft</span> — 25M views, 5k members
        </>,
        <>
          building <span className="link-contractual">Contractual</span>, shipping{' '}
          <span className="link-voyager">Voyager-0</span>, and running Canadian builder communities
        </>,
        <>
          silver medalist / national finalist at <span className="link-ioai">IOAI</span> and got nominated for{' '}
          <span className="link-nasa">NASA Space Apps</span> out of 93k people
        </>,
        <>scored 71/75 on the Canadian Computing Competition and came 3rd in a national math contest</>,
        <>
          got <span className="link-waterloo">Waterloo</span> distinctions on Pascal, Gauss, and a
          few other contests
        </>,
        <>
          born and raised in <span className="link-toronto">Toronto</span>, spend a lot of time in
          Waterloo — started coding around age 7, 30+ hackathons deep
        </>,
        <>getting flown out to Ottawa for a week at the House of Commons for a provincial legislation award</>,
      ]
    : [
        <>
          product engineer at{' '}
          <a href="https://penseum.com" target="_blank" rel="noopener noreferrer" className="link-penseum">
            @Penseum
          </a>
          , helping 1M+ users learn
        </>,
        <>
          founded{' '}
          <a
            href="https://hackathonscanada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hackathons"
          >
            Hackathons Canada
          </a>
          , partnered with Google and Microsoft — 25M views, 5k members
        </>,
        <>
          building <span className="link-contractual">Contractual</span>, shipping{' '}
          <span className="link-voyager">Voyager-0</span>, and running Canadian builder communities
        </>,
        <>
          silver medalist / national finalist at <span className="link-ioai">IOAI</span> and got nominated for{' '}
          <span className="link-nasa">NASA Space Apps</span> out of 93k people
        </>,
      ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold group cursor-default grid [grid-template-areas:'name'] w-fit">
          <span className="[grid-area:name] transition-opacity duration-300 ease-in-out group-hover:opacity-0">
            Nirek Shetty
          </span>
          <span
            aria-hidden="true"
            className="[grid-area:name] transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
          >
            निरेक शेट्टी
          </span>
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/nirekshetty/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <XIcon />
          </a>
          <a
            href="https://github.com/nirek13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/nirekshetty/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:shettynirek@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <p className="mb-6 text-muted-foreground">
        <span>
          i&apos;m an engineer at{' '}
          <a
            href="https://penseum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-penseum"
          >
            @Penseum
          </a>{' '}
          and founder of{' '}
          <a
            href="https://hackathonscanada.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-hackathons"
          >
            @HackathonsCanada
          </a>
          .
        </span>
      </p>

      <div className="mb-4">
        <h2 className="mb-2 font-bold text-sm">some cool things i&apos;ve done in the past:</h2>
        <ul className="list-none space-y-1 text-sm">
          {highlights.map((item, i) => (
            <li key={i} className="tight-list-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="text-sm underline hover:no-underline mb-4"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>

      <div className="mt-8">
        <div className="hidden md:flex justify-between items-center mb-6">
          <div className="flex flex-wrap gap-4">
            {(
              [
                ['everything', 'Everything'],
                ['projects', 'Projects'],
                ['communities', 'Communities'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`px-4 py-1 text-sm transition-colors duration-200 rounded ${
                  filter === id
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <button
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
            aria-label="Search"
            onClick={onSearch}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        <div className="md:hidden flex gap-2 mb-6 overflow-x-auto pb-1">
          {(
            [
              ['everything', 'Everything'],
              ['projects', 'Projects'],
              ['communities', 'Communities'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              className={`px-3 py-1 text-sm whitespace-nowrap transition-colors duration-200 rounded ${
                filter === id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={filter}>
          {items.map((item, index) => {
            const fit = item.fit ?? 'cover';
            const Card = (
              <div
                className="flex flex-col group project-card fade-up"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div
                  className="relative mb-4 aspect-[16/10] cursor-pointer project-frame"
                  style={{ backgroundColor: item.frame || 'hsl(var(--muted))' }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`${
                      fit === 'contain' ? 'object-contain p-6 md:p-8' : 'object-cover'
                    } transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority={index < 2}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium leading-tight group-hover:underline underline-offset-4 decoration-foreground/30">
                      {item.title}
                    </h3>
                    <span
                      className={
                        BADGE_CLASS[item.badgeStyle || 'muted'] || BADGE_CLASS.muted
                      }
                    >
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {Card}
              </a>
            ) : (
              <div key={item.id}>{Card}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ExperiencesSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">experiences</h1>
      <div className="space-y-8">
        {EXPERIENCES.map((exp) => (
          <div key={exp.org} className="flex flex-col gap-1">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-lg font-medium leading-tight">{exp.org}</h3>
              <span className="text-sm text-muted-foreground shrink-0">{exp.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{exp.role}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mt-1">{exp.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhilosophySection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">my philosophy</h1>
      <ul className="list-none space-y-3 text-sm">
        {PHILOSOPHY.map((line, i) => (
          <li key={i} className="tight-list-item text-muted-foreground leading-relaxed">
            <span className="text-foreground">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BooksSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">books</h1>
      <Bookshelf />
    </div>
  );
}

function PhotosSection() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">photos</h1>
      <p className="text-sm text-muted-foreground mb-8">places i&apos;ve been.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <a
            key={photo.id}
            href={`/photography/${photo.id}`}
            className="group relative overflow-hidden aspect-[16/10] bg-muted"
          >
            <Image
              src={`/${photo.filename}`}
              alt={photo.caption}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [section, setSection] = useState<NavSection>('about');
  const [filter, setFilter] = useState<ProjectFilter>('everything');
  const [expanded, setExpanded] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative dotted-bg">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="w-full flex flex-col items-center relative z-10">
        {/* Mobile top bar */}
        <div className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 backdrop-blur-sm">
            <button
              onClick={() => setCmdOpen(true)}
              className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
            <div className="w-px h-4 bg-border" />
            {MOBILE_NAV.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`inline-flex items-center justify-center h-8 w-8 p-0 rounded-full transition-colors ${
                  section === id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {Icon === 'photos' ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </button>
            ))}
            <div className="w-px h-4 bg-border" />
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop top-right controls */}
        <div className="hidden md:flex absolute top-4 right-4 items-center gap-3">
          <button
            onClick={() => setCmdOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground border border-border rounded-md hover:bg-muted/50 transition-colors"
          >
            <span className="text-[10px]">⌘</span>
            <span>K</span>
          </button>
          <ThemeToggle />
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[120px_1fr_120px] gap-8 md:gap-12">
          <nav className="hidden md:block md:text-right space-y-8 md:space-y-12 text-sm text-muted-foreground sticky top-12 self-start">
            {NAV_ITEMS.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => setSection(item.id)}
                  className={`block w-full text-right transition-colors duration-200 ${
                    section === item.id
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground/70 hover:text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </nav>

          <div className="text-base leading-relaxed pt-12 md:pt-0">
            {section === 'about' && (
              <AboutSection
                filter={filter}
                setFilter={setFilter}
                expanded={expanded}
                setExpanded={setExpanded}
                onSearch={() => setCmdOpen(true)}
              />
            )}
            {section === 'experiences' && <ExperiencesSection />}
            {section === 'philosophy' && <PhilosophySection />}
            {section === 'books' && <BooksSection />}
            {section === 'photos' && <PhotosSection />}

            <div className="mt-12 pt-8 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                made by nirek · inspired by form
              </p>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>

      <CommandPalette
        open={cmdOpen}
        onOpenChange={setCmdOpen}
        onNavigate={setSection}
      />
    </div>
  );
}
