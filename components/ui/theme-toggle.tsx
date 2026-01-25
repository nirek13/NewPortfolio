'use client';

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
        {/* Light mode icon - simple circle */}
        <div 
          className={`absolute w-2 h-2 rounded-full transition-all duration-300 transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-90 scale-0'
                     } ${theme === 'light' 
                       ? 'bg-amber-600 dark:bg-amber-400' 
                       : 'bg-gray-400 dark:bg-gray-300'
                     }`}
        />
        
        {/* Dark mode icon - simple crescent */}
        <div 
          className={`absolute w-2 h-2 rounded-full transition-all duration-300 transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-90 scale-0'
                     } ${theme === 'dark' 
                       ? 'bg-blue-600 dark:bg-blue-400' 
                       : 'bg-gray-400 dark:bg-gray-300'
                     }`}
          style={{
            background: theme === 'dark' 
              ? `radial-gradient(circle at 20% 20%, transparent 35%, #2563eb 35%)`
              : `radial-gradient(circle at 20% 20%, transparent 35%, #6b7280 35%)`
          }}
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
        {/* Light mode icon - simple circle */}
        <div 
          className={`absolute w-2 h-2 rounded-full transition-all duration-300 transform
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-90 scale-0'
                     } ${theme === 'light' 
                       ? 'bg-amber-600 dark:bg-amber-400' 
                       : 'bg-gray-400 dark:bg-gray-300'
                     }`}
        />
        
        {/* Dark mode icon - simple crescent */}
        <div 
          className={`absolute w-2 h-2 rounded-full transition-all duration-300 transform
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-90 scale-0'
                     } ${theme === 'dark' 
                       ? 'bg-blue-600 dark:bg-blue-400' 
                       : 'bg-gray-400 dark:bg-gray-300'
                     }`}
          style={{
            background: theme === 'dark' 
              ? `radial-gradient(circle at 20% 20%, transparent 35%, #2563eb 35%)`
              : `radial-gradient(circle at 20% 20%, transparent 35%, #6b7280 35%)`
          }}
        />
      </div>
    </button>
  );
}