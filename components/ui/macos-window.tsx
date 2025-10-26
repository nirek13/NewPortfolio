'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Minus, Square, X } from 'lucide-react';

interface MacOSWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  showTrafficLights?: boolean;
  variant?: 'main' | 'utility' | 'panel';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function MacOSWindow({ 
  children, 
  className, 
  title,
  subtitle,
  showTrafficLights = true,
  variant = 'main',
  size = 'md',
  ...props 
}: MacOSWindowProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  const variantClasses = {
    main: 'macos-window',
    utility: 'macos-window border-gray-200',
    panel: 'macos-window bg-gray-50/90'
  };

  const handleClose = () => {
    setShowCloseModal(true);
    setTimeout(() => setShowCloseModal(false), 2000);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <>
      <div 
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          'mx-auto transition-all duration-300',
          isMinimized && 'scale-75 opacity-50 pointer-events-none',
          isMaximized && 'max-w-[95vw] scale-105',
          className
        )} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {(showTrafficLights || title) && (
          <div className="macos-titlebar">
            {showTrafficLights && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleClose}
                  className={cn(
                    "macos-traffic-light close transition-all duration-200 group relative",
                    "hover:bg-red-600 active:scale-95",
                    isHovered && "opacity-100"
                  )}
                >
                  {isHovered && (
                    <X size={8} className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
                <button 
                  onClick={handleMinimize}
                  className={cn(
                    "macos-traffic-light minimize transition-all duration-200 group relative",
                    "hover:bg-yellow-500 active:scale-95",
                    isHovered && "opacity-100"
                  )}
                >
                  {isHovered && (
                    <Minus size={8} className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
                <button 
                  onClick={handleMaximize}
                  className={cn(
                    "macos-traffic-light maximize transition-all duration-200 group relative",
                    "hover:bg-green-500 active:scale-95",
                    isHovered && "opacity-100"
                  )}
                >
                  {isHovered && (
                    <Square size={6} className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </div>
            )}
            
            {title && (
              <div className="flex-1 text-center">
                <div className="text-sm font-medium text-gray-800">{title}</div>
                {subtitle && (
                  <div className="text-xs text-gray-500">{subtitle}</div>
                )}
              </div>
            )}
            
            {showTrafficLights && title && <div className="w-16" />}
          </div>
        )}
        
        <div className="macos-content p-6">
          {children}
        </div>
      </div>

      {/* macOS-style Modal for close confirmation */}
      {showCloseModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="macos-window bg-white/95 backdrop-blur-md max-w-sm mx-4 animate-in zoom-in-95 duration-200">
            <div className="macos-titlebar">
              <div className="flex items-center gap-2">
                <div className="macos-traffic-light close" />
                <div className="macos-traffic-light minimize" />
                <div className="macos-traffic-light maximize" />
              </div>
              <div className="flex-1 text-center">
                <div className="text-sm font-medium text-gray-800">System Notification</div>
              </div>
              <div className="w-16" />
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-3">💻</div>
                <div className="text-sm text-gray-700 mb-4">
                  Just kidding! This is a portfolio website, not a real macOS window. 
                  <br />
                  <span className="text-xs text-gray-500 mt-2 block">
                    Pretty convincing though, right? 😉
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface MacOSToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MacOSToolbar({ children, className, ...props }: MacOSToolbarProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-2 bg-gray-50/50 border-b border-gray-200/50",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

interface MacOSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'toolbar';
  size?: 'sm' | 'md' | 'lg';
}

export function MacOSButton({ 
  children, 
  className, 
  variant = 'secondary',
  size = 'md',
  ...props 
}: MacOSButtonProps) {
  const variantClasses = {
    primary: 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600 shadow-sm',
    secondary: 'bg-white/80 text-gray-700 border-gray-300 hover:bg-gray-50 shadow-sm',
    toolbar: 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100 rounded-md'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button 
      className={cn(
        "border rounded-lg font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
}

interface MacOSSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function MacOSSidebar({ children, className, ...props }: MacOSSidebarProps) {
  return (
    <div 
      className={cn(
        "macos-sidebar w-64 p-4",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

interface MacOSMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}

export function MacOSMenuItem({ 
  children, 
  className, 
  active = false,
  icon,
  ...props 
}: MacOSMenuItemProps) {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors",
        active 
          ? "bg-blue-500 text-white" 
          : "text-gray-700 hover:bg-gray-100",
        className
      )} 
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </div>
  );
}

export function MacOSSegmentedControl({ 
  options, 
  value, 
  onChange, 
  className 
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex bg-gray-100 rounded-lg p-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all",
            value === option.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}