/**
 * Pen marks in the same hand as the signature: a two-stroke underline and a
 * curly arrow. Both draw themselves in once the intro has handed the page over.
 */
export function PenUnderline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" preserveAspectRatio="none" className={`pen-mark pen-underline ${className}`} aria-hidden="true">
      <path d="M3 10.5c26-4.2 54-5.6 84-4.6 30 1 60 3.4 90 2.2 22-.9 42-3.4 60-4.8" pathLength={1} />
      <path d="M22 14c34-2.2 72-2.8 108-1.6 22 .7 40 .4 56-.6" pathLength={1} />
    </svg>
  );
}

export function PenArrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={`pen-mark pen-arrow ${className}`} aria-hidden="true">
      <path d="M2 10C16 4 34 4 42 12C48 18 46 26 40 32" pathLength={1} />
      <path d="M45.8 30.4 40 32 41.6 26.2" pathLength={1} />
    </svg>
  );
}

/** A check mark that draws itself (used when the email is copied). */
export function DrawnCheck({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`pen-mark pen-check ${className}`} aria-hidden="true">
      <path d="M2.5 8.6 6.2 12 13.5 3.8" pathLength={1} />
    </svg>
  );
}
