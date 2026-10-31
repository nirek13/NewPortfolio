/** A hand-built Y Combinator mark: the orange tile with a three-stroke Y. */
export function YCMark({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="3" fill="#f26625" />
      <path
        d="M10 8.5 16 18.2 22 8.5M16 18.2V24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.9"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
