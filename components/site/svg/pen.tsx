/**
 * Pen marks in the same hand as the signature. The underline draws itself in
 * once, after the intro has handed the page over.
 */
export function PenUnderline({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" preserveAspectRatio="none" className={`pen-mark pen-underline ${className}`} aria-hidden="true">
      <path d="M3 10.5c26-4.2 54-5.6 84-4.6 30 1 60 3.4 90 2.2 22-.9 42-3.4 60-4.8" pathLength={1} />
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
