'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export function ThemeToggle() {
  const { theme, toggleDark } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleDark}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 w-8 relative"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          isDark ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          isDark ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
