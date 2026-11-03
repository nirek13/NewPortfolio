'use client';

import { useId } from 'react';
import { useTheme } from '@/lib/theme-context';

/**
 * Sun in light mode, moon in dark. The rays fold away and a masked "bite"
 * slides across the disc, so the sun becomes a crescent instead of swapping icons.
 */
export function ThemeToggle() {
  const { theme, toggleDark } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  const maskId = `tt-mask-${useId().replace(/:/g, '')}`;

  return (
    <button
      type="button"
      onClick={toggleDark}
      className="theme-toggle"
      aria-label={`Switch to ${next} theme`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${next} theme`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <mask id={maskId}>
          <rect width="24" height="24" fill="#fff" />
          <circle className="tt-bite" cx="25" cy="3" r="7" fill="#000" />
        </mask>
        <circle className="tt-core" cx="12" cy="12" r="5" mask={`url(#${maskId})`} />
        <g className="tt-rays">
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="12" y1="2.2" x2="12" y2="4.4" transform={`rotate(${i * 45} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  );
}
