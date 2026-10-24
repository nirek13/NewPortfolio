import Link from 'next/link';
import type { ReactNode } from 'react';
import { Stage } from '@/components/site/stage';
import { Signature } from '@/components/site/signature';
import { ThemeToggle } from '@/components/site/theme-toggle';

const LINKS = [
  { href: '/plyxl', label: 'plyxl' },
  { href: '/blog', label: 'blog' },
];

/** Frame for the pages under the dashboard: the same bar, paper and footer, one reading column. */
export function Subpage({ active, children }: { active?: string; children: ReactNode }) {
  return (
    <Stage>
      <header className="sticky top-0 z-50">
        <nav className="dash-bar" aria-label="Site">
          <div className="mx-auto flex h-12 max-w-[72rem] items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center py-1" aria-label="Nirek Shetty — home">
              <Signature data-sig-target className="h-[22px] w-auto" aria-hidden="true" />
            </Link>
            <div className="flex items-center gap-5">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active === link.href ? 'page' : undefined}
                  className="sub-nav-link"
                >
                  {link.label}
                </Link>
              ))}
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-[46rem] px-4 pb-16 pt-5 sm:px-6 sm:pb-20 sm:pt-7">
        {children}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-dotted border-foreground/35 pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span>© {new Date().getFullYear()} Nirek Shetty · Toronto</span>
          <span className="flex gap-4">
            <a href="https://x.com/nirekshetty" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              x
            </a>
            <a href="https://github.com/nirek13" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              github
            </a>
            <a
              href="https://www.linkedin.com/in/nirekshetty/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              linkedin
            </a>
            <a href="/blog/rss.xml" className="hover:text-foreground">
              rss
            </a>
          </span>
        </footer>
      </div>
    </Stage>
  );
}

/** A bracket-cornered panel with the dashboard's index label. */
export function SubPanel({
  index,
  label,
  kanji,
  as: Tag = 'section',
  className = '',
  children,
}: {
  index: number;
  label: string;
  kanji?: string;
  as?: 'section' | 'article' | 'div';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`dash-panel ${className}`}>
      <p className="dash-label">
        <span className="label-index">{String(index).padStart(2, '0')}</span>
        <span>{label}</span>
        <span className="label-rule" aria-hidden />
        {kanji ? (
          <span className="label-kanji" aria-hidden>
            {kanji}
          </span>
        ) : null}
      </p>
      {children}
    </Tag>
  );
}
