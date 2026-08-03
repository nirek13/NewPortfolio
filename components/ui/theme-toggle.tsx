'use client';

import { useTheme } from '@/lib/theme-context';

export function ThemeIndicator() {
  const { toggleDark, theme } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
      title="Toggle theme"
    >
      {theme}
    </button>
  );
}

export const ThemeToggle = ThemeIndicator;
export const CompactThemeToggle = ThemeIndicator;
