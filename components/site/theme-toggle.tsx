'use client';

import { useTheme, type ThemeMode } from '@/lib/theme-context';

const SWATCHES: { id: ThemeMode; color: string; label: string }[] = [
  { id: 'light', color: '#eef0f3', label: 'Light' },
  { id: 'dark', color: '#1c1915', label: 'Dark' },
  { id: 'reading', color: '#eadfc8', label: 'Reading' },
  { id: 'matcha', color: '#cdd6c2', label: 'Matcha' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Theme">
      {SWATCHES.map((swatch) => (
        <button
          key={swatch.id}
          type="button"
          className="theme-swatch"
          style={{ background: swatch.color }}
          aria-label={swatch.label}
          aria-current={theme === swatch.id ? 'true' : undefined}
          onClick={() => setTheme(swatch.id)}
        />
      ))}
    </div>
  );
}
