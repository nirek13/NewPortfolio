'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-1.5 rounded transition-all duration-200 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30' 
          : 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
      }`}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-[14px] h-[14px] flex items-center justify-center">
        <Sun 
          size={14} 
          className={`absolute transition-all duration-300 transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-90 scale-0'
                     } ${theme === 'light' 
                       ? 'text-amber-600 dark:text-amber-400' 
                       : 'text-gray-400 dark:text-gray-300'
                     }`}
        />
        
        <Moon 
          size={14} 
          className={`absolute transition-all duration-300 transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-90 scale-0'
                     } ${theme === 'dark' 
                       ? 'text-blue-600 dark:text-blue-400' 
                       : 'text-gray-400 dark:text-gray-300'
                     }`}
        />
      </div>
    </button>
  );
}

export function CompactThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-1.5 rounded transition-all duration-200 ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30' 
          : 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
      }`}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <div className="relative w-[14px] h-[14px] flex items-center justify-center">
        <Sun 
          size={14} 
          className={`absolute transition-all duration-300 transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-90 scale-0'
                     } ${theme === 'light' 
                       ? 'text-amber-600 dark:text-amber-400' 
                       : 'text-gray-400 dark:text-gray-300'
                     }`}
        />
        <Moon 
          size={14} 
          className={`absolute transition-all duration-300 transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-90 scale-0'
                     } ${theme === 'dark' 
                       ? 'text-blue-600 dark:text-blue-400' 
                       : 'text-gray-400 dark:text-gray-300'
                     }`}
        />
      </div>
    </button>
  );
}