import { YC_FOUNDER_URL } from '@/lib/site';

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

/**
 * Founder card that points at the public YC founder profile. It is a real,
 * crawlable link with rel="me", so search engines tie the two profiles together.
 */
export function YCFounderCard() {
  return (
    <a href={YC_FOUNDER_URL} target="_blank" rel="me noopener noreferrer" className="yc-card">
      <YCMark className="yc-card-mark h-9 w-9 shrink-0" />
      <span className="min-w-0 flex-1">
        <span className="block text-[0.9rem] font-medium leading-tight">Nirek Shetty · YC W27</span>
        <span className="block truncate text-[12px] text-muted-foreground">Founder profile on Y Combinator</span>
      </span>
      <span className="yc-card-arrow shrink-0" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
