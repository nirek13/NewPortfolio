'use client';

import { useTheme } from '@/lib/theme-context';
import { Palette } from 'lucide-react';

export function ThemeIndicator() {
  const { glassTint, cycleTheme, currentTintConfig } = useTheme();

  return (
    <button
      onClick={cycleTheme}
      className="group relative p-1.5 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        background: `linear-gradient(135deg, ${currentTintConfig.color}15, ${currentTintConfig.color}25)`,
        border: `1px solid ${currentTintConfig.color}40`
      }}
      title={`Current theme: ${currentTintConfig.name} - Click to cycle`}
    >
      <div className="relative w-[14px] h-[14px] flex items-center justify-center">
        {/* Animated color indicator */}
        <div 
          className="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle, ${currentTintConfig.color}80 20%, ${currentTintConfig.color}40 70%, transparent 100%)`,
            boxShadow: `0 0 8px ${currentTintConfig.color}30, inset 0 1px 1px ${currentTintConfig.color}50`
          }}
        />
        
        {/* Palette icon overlay */}
        <Palette 
          size={8} 
          className="relative z-10 transition-all duration-300 group-hover:rotate-12" 
          style={{ color: currentTintConfig.color }}
        />
        
        {/* Subtle glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
          style={{
            background: `radial-gradient(circle, ${currentTintConfig.color}60, transparent 70%)`
          }}
        />
      </div>
    </button>
  );
}

// Keep the original exports for backward compatibility
export const ThemeToggle = ThemeIndicator;
export const CompactThemeToggle = ThemeIndicator;