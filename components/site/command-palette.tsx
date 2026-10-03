'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
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
    <div className="cmd-overlay fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[18vh]">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="cmd-panel relative w-full max-w-lg overflow-hidden text-foreground">
        <div className="flex items-center gap-2 border-b border-foreground/20 px-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden border border-foreground/30 px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <div className="max-h-72 overflow-y-auto p-2">
          {items.length === 0 && (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">
              No results.
            </p>
          )}
          {items.map((item) => (
            <button
              key={item.id}
              onClick={item.run}
              className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              <span className="capitalize">{item.label}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {item.group}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
