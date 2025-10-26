'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ModernArtLoaderProps {
  className?: string;
  variant?: 'minimal' | 'artistic' | 'liquid';
  size?: 'sm' | 'md' | 'lg';
}

export function ModernArtLoader({ 
  className, 
  variant = 'artistic', 
  size = 'md' 
}: ModernArtLoaderProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-2 border-blue-200/30" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-400 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-purple-400 animate-spin animate-reverse" 
             style={{ animationDuration: '1.5s' }} />
      </div>
    );
  }

  if (variant === 'liquid') {
    return (
      <div className={cn('relative', sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="liquid-morph-loader w-full h-full bg-gradient-to-r from-blue-400/60 to-purple-500/60 rounded-2xl" />
        </div>
        <div className="absolute inset-1 rounded-xl bg-white/90 backdrop-blur-sm" />
        <div className="absolute inset-3 rounded-lg overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-pink-300/40 to-orange-300/40 animate-liquid-pulse" />
        </div>
      </div>
    );
  }

  // Artistic variant
  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Outer morphing ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300/40 to-purple-400/40 animate-art-morph" />
      
      {/* Middle flowing ring */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-300/40 to-orange-300/40 animate-art-flow" 
           style={{ animationDelay: '0.5s' }} />
      
      {/* Inner pulsing core */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-r from-green-300/40 to-teal-400/40 animate-art-pulse" 
           style={{ animationDelay: '1s' }} />
      
      {/* Center dot */}
      <div className="absolute inset-6 rounded-full bg-white/80 backdrop-blur-sm animate-art-glow" />
    </div>
  );
}

interface LiquidLoadingBarProps {
  progress?: number;
  className?: string;
  animated?: boolean;
}

export function LiquidLoadingBar({ 
  progress = 0, 
  className, 
  animated = true 
}: LiquidLoadingBarProps) {
  return (
    <div className={cn(
      'relative w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm',
      className
    )}>
      <div 
        className={cn(
          'h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-500',
          animated && 'animate-liquid-flow'
        )}
        style={{ width: `${progress}%` }}
      />
      {animated && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-liquid-sweep" />
      )}
    </div>
  );
}

interface FlowingDotsProps {
  className?: string;
  dotCount?: number;
  colors?: string[];
}

export function FlowingDots({ 
  className, 
  dotCount = 5,
  colors = ['#93c5fd', '#c4b5fd', '#f9a8d4', '#a7f3d0', '#fed7aa']
}: FlowingDotsProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {Array.from({ length: dotCount }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 rounded-full animate-flowing-dot"
          style={{
            backgroundColor: colors[i % colors.length],
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
}

interface MorphingShapeProps {
  className?: string;
  variant?: 'circle' | 'square' | 'triangle';
  size?: number;
}

export function MorphingShape({ 
  className, 
  variant = 'circle',
  size = 60
}: MorphingShapeProps) {
  const [currentShape, setCurrentShape] = useState(0);
  const shapes = ['circle', 'square', 'triangle'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getShapeClass = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      case 'triangle':
        return 'rounded-sm transform rotate-45';
      default:
        return 'rounded-full';
    }
  };

  return (
    <div 
      className={cn(
        'bg-gradient-to-br from-blue-400/60 to-purple-500/60 transition-all duration-1000 ease-in-out',
        getShapeClass(shapes[currentShape]),
        className
      )}
      style={{ 
        width: `${size}px`, 
        height: `${size}px` 
      }}
    />
  );
}

interface ArtisticPageLoaderProps {
  isLoading: boolean;
  onComplete?: () => void;
  className?: string;
}

interface MacOSHelloLoaderProps {
  className?: string;
  onComplete?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function MacOSHelloLoader({ 
  className, 
  onComplete,
  size = 'md'
}: MacOSHelloLoaderProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const text = "hello";
  const colors = [
    '#FF6B35', // Orange-red
    '#F7931E', // Orange
    '#FFD23F', // Yellow
    '#67B26F', // Green
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#9B59B6', // Purple
  ];

  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl lg:text-8xl',
    lg: 'text-8xl lg:text-9xl'
  };

  useEffect(() => {
    if (visibleChars >= text.length) {
      setTimeout(() => {
        setIsComplete(true);
        onComplete?.();
      }, 1000);
      return;
    }

    const timer = setTimeout(() => {
      setVisibleChars(prev => prev + 1);
    }, 300);

    return () => clearTimeout(timer);
  }, [visibleChars, onComplete]);

  if (isComplete) return null;

  return (
    <div className={cn(
      'flex items-center justify-center min-h-[200px]',
      className
    )}>
      <div className={cn(
        'font-light tracking-wider select-none',
        sizeClasses[size]
      )}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={cn(
              'inline-block transition-all duration-500 ease-out',
              index < visibleChars 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-4'
            )}
            style={{
              color: index < visibleChars ? colors[index % colors.length] : 'transparent',
              animationDelay: `${index * 100}ms`,
              textShadow: index < visibleChars 
                ? `0 0 20px ${colors[index % colors.length]}40, 0 0 40px ${colors[index % colors.length]}20`
                : 'none'
            }}
          >
            {char}
          </span>
        ))}
        <span 
          className={cn(
            'inline-block w-1 ml-1 bg-gray-400 animate-pulse',
            size === 'sm' ? 'h-8' : size === 'md' ? 'h-12 lg:h-16' : 'h-16 lg:h-20'
          )}
          style={{
            opacity: visibleChars >= text.length ? 0 : 1,
            transition: 'opacity 0.5s ease-out'
          }}
        />
      </div>
    </div>
  );
}

export function ArtisticPageLoader({ 
  isLoading, 
  onComplete, 
  className 
}: ArtisticPageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'loading' | 'morphing' | 'complete'>('loading');

  useEffect(() => {
    if (!isLoading) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setStage('morphing');
          setTimeout(() => {
            setStage('complete');
            onComplete?.();
          }, 1000);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [isLoading, onComplete]);

  if (!isLoading || stage === 'complete') return null;

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50',
      'backdrop-blur-sm',
      stage === 'morphing' && 'animate-fade-out',
      className
    )}>
      <div className="text-center space-y-8">
        <ModernArtLoader size="lg" variant="artistic" />
        
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            Loading Experience...
          </h2>
          
          <LiquidLoadingBar 
            progress={progress} 
            className="w-64 mx-auto" 
            animated 
          />
          
          <FlowingDots className="justify-center" />
        </div>
      </div>
    </div>
  );
}