'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-3 rounded-2xl transition-all duration-500 ease-out
                 bg-gradient-to-br from-white/60 via-gray-50/40 to-white/60 
                 dark:from-black/80 dark:via-black/60 dark:to-black/80
                 backdrop-blur-xl border border-black/8 dark:border-cyan-400/30
                 shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(100,200,255,0.3)]
                 hover:scale-105 hover:rotate-3 active:scale-95
                 overflow-hidden"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                      bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10
                      dark:from-blue-400/15 dark:via-purple-400/15 dark:to-pink-400/15 rounded-2xl" />
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-active:opacity-100 transition-opacity duration-200
                      bg-gradient-to-r from-cyan-400/20 to-purple-400/20" />
      
      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        {/* Sun icon */}
        <Sun 
          size={20} 
          className={`absolute transition-all duration-700 ease-out transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-180 scale-0'
                     } text-amber-400 drop-shadow-lg`}
        />
        
        {/* Moon icon */}
        <Moon 
          size={20} 
          className={`absolute transition-all duration-700 ease-out transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-180 scale-0'
                     } text-cyan-300 drop-shadow-lg`}
        />
      </div>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      ring-1 ring-blue-400/50 dark:ring-purple-400/50" />
      
      {/* Premium glass reflection */}
      <div className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300
                      bg-gradient-to-br from-white/40 via-transparent to-transparent" />
    </button>
  );
}

export function CompactThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-2 rounded-xl transition-all duration-300
                 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm
                 border border-white/20 dark:border-gray-600/30
                 hover:bg-white/30 dark:hover:bg-gray-700/40
                 hover:scale-105 active:scale-95"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="w-5 h-5 relative">
        <Sun 
          size={16} 
          className={`absolute inset-0 transition-all duration-500 transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-90 scale-0'
                     } text-amber-500`}
        />
        <Moon 
          size={16} 
          className={`absolute inset-0 transition-all duration-500 transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-90 scale-0'
                     } text-blue-300`}
        />
      </div>
    </button>
  );
}