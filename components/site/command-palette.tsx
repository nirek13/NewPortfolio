'use client';

import { useEffect, useMemo, useState } from 'react';
import { NAV_ITEMS, type NavSection } from '@/lib/portfolio-data';
import { useTheme, type ThemeMode } from '@/lib/theme-context';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: NavSection) => void;
}

const THEME_OPTIONS: { id: ThemeMode; label: string }[] = [
  { id: 'light', label: 'Light theme' },
  { id: 'dark', label: 'Dark theme' },
  { id: 'reading', label: 'Reading theme' },
  { id: 'matcha', label: 'Matcha theme' },
];

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const { setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const items = useMemo(() => {
    const q = query.toLowerCase().trim();
    const nav = NAV_ITEMS.filter((n) => n.label.includes(q) || n.id.includes(q)).map(
      (n) => ({
        id: `nav-${n.id}`,
        label: n.label,
        group: 'Navigate',
        run: () => {
          onNavigate(n.id);
          onOpenChange(false);
        },
      })
    );
    const themes = THEME_OPTIONS.filter((t) =>
      t.label.toLowerCase().includes(q)
    ).map((t) => ({
      id: `theme-${t.id}`,
      label: t.label,
      group: 'Theme',
      run: () => {
        setTheme(t.id);
        onOpenChange(false);
      },
    }));
    return [...nav, ...themes];
  }, [query, onNavigate, onOpenChange, setTheme]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search..."
          className="w-full border-b border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <div className="max-h-72 overflow-y-auto p-2">
          {items.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              No results.
            </p>
          )}
          {items.map((item) => (
            <button
              key={item.id}
              onClick={item.run}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <span>{item.label}</span>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {item.group}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
