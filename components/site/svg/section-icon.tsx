import type { NavSection } from '@/lib/portfolio-data';

/**
 * Line icons for each section, hand-built on a 24px grid. Every stroke has
 * pathLength="1" so CSS can draw it in with a single stroke-dashoffset
 * animation, whatever its real length (see `.sicon` in motion.css).
 */
const PATHS: Record<NavSection, string[]> = {
  // a bust: head, then shoulders
  about: ['M12 4.2a3.6 3.6 0 1 1 0 7.2a3.6 3.6 0 1 1 0-7.2Z', 'M4.8 20c.6-4 3.4-6.4 7.2-6.4s6.6 2.4 7.2 6.4'],
  // a briefcase: body, handle, clasp line
  experiences: ['M3.5 8h17v11.5h-17Z', 'M9 8V5.2h6V8', 'M3.5 13h17'],
  // a sheep: fleece, then two legs, then an eye
  plyxl: [
    'M7.2 15.5a3 3 0 0 1-.6-5.9a3.6 3.6 0 0 1 5.4-3.1a3.6 3.6 0 0 1 5.6 2.6a3.2 3.2 0 0 1-.8 6.4Z',
    'M9.5 15.5V19.5M14.5 15.5V19.5',
    'M14.6 10.8h.01',
  ],
  // angle brackets around a slash
  github: ['M8 7.5 3.5 12 8 16.5', 'M16 7.5 20.5 12 16 16.5', 'M13.6 5.2 10.4 18.8'],
  // an open book: both pages, then the spine
  books: ['M12 6.8C10 5.2 7 4.7 3.5 5.1v13c3.5-.4 6.5.1 8.5 1.6', 'M12 6.8c2-1.6 5-2.1 8.5-1.7v13c-3.5-.4-6.5.1-8.5 1.6', 'M12 6.8v12.9'],
};

export function SectionIcon({ id, className = '' }: { id: NavSection; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`sicon ${className}`} aria-hidden="true">
      {PATHS[id].map((d, i) => (
        <path key={i} d={d} pathLength={1} style={{ ['--i' as string]: i }} />
      ))}
    </svg>
  );
}

/** Four bracket corners that draw themselves onto a tile. */
export function PanelCorners() {
  return (
    <span className="pcorners" aria-hidden="true">
      {(['tl', 'tr', 'br', 'bl'] as const).map((c) => (
        <svg key={c} viewBox="0 0 10 10" className={`pcorner is-${c}`}>
          <path d="M1 9V1h8" pathLength={1} />
        </svg>
      ))}
    </span>
  );
}
