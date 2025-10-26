'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'intense';
}

export function GlassCard({ 
  children, 
  className, 
  intensity = 'normal',
  ...props 
}: GlassCardProps) {
  const intensityClasses = {
    subtle: 'glass-subtle glass-ripple-effect',
    normal: 'glass-card glass-ripple-effect',
    intense: 'glass-intense glass-ripple-effect'
  };

  return (
    <div 
      className={cn(intensityClasses[intensity], className)} 
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassHeader({ children, className, ...props }: GlassHeaderProps) {
  return (
    <header 
      className={cn(
        "glass-subtle backdrop-blur-xl border-b border-white/10 sticky top-0 z-50",
        className
      )} 
      {...props}
    >
      {children}
    </header>
  );
}

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function GlassButton({ 
  children, 
  className, 
  variant = 'primary',
  ...props 
}: GlassButtonProps) {
  const variantClasses = {
    primary: 'glass-card bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 border-violet-500/30',
    secondary: 'glass-subtle hover:glass-card border-white/20',
    ghost: 'glass-subtle hover:bg-white/10 border-transparent'
  };

  return (
    <button 
      className={cn(
        "px-4 py-2 rounded-xl transition-all duration-300 font-medium",
        variantClasses[variant],
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
}

export function GlassSection({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section 
      className={cn("glass-card p-6 md:p-8", className)} 
      {...props}
    >
      {children}
    </section>
  );
}

export function FloatingGlassOrb({ 
  className, 
  size = 'md',
  animated = true,
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { 
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  const animations = animated ? 'animate-float animate-pulse-glow' : 'animate-pulse';

  return (
    <div 
      className={cn(
        "absolute rounded-full glass-subtle opacity-20 pointer-events-none",
        sizeClasses[size],
        animations,
        className
      )} 
      {...props}
    />
  );
}

interface LiquidFlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'pastel-blue' | 'pastel-pink' | 'pastel-green' | 'pastel-purple';
  flowSpeed?: 'slow' | 'normal' | 'fast';
}

export function LiquidFlowButton({ 
  children, 
  className, 
  variant = 'pastel-blue',
  flowSpeed = 'normal',
  ...props 
}: LiquidFlowButtonProps) {
  const variantClasses = {
    'pastel-blue': 'liquid-flow-blue',
    'pastel-pink': 'liquid-flow-pink', 
    'pastel-green': 'liquid-flow-green',
    'pastel-purple': 'liquid-flow-purple'
  };

  const speedClasses = {
    slow: 'liquid-slow',
    normal: 'liquid-normal', 
    fast: 'liquid-fast'
  };

  return (
    <button 
      className={cn(
        "liquid-button liquid-button-enhanced relative overflow-hidden px-6 py-3 rounded-2xl",
        "backdrop-blur-md border border-white/20 transition-all duration-500",
        "hover:scale-105 hover:rotate-1 active:scale-95 hover-glow",
        "shadow-lg hover:shadow-xl",
        variantClasses[variant],
        speedClasses[flowSpeed],
        className
      )} 
      {...props}
    >
      <span className="relative z-10 font-light tracking-wide text-white">
        {children}
      </span>
    </button>
  );
}

interface FlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export function FlowingBorder({ 
  children, 
  className, 
  colors = ['#a7f3d0', '#bfdbfe', '#ddd6fe', '#fecaca'],
  speed = 6
}: FlowingBorderProps) {
  return (
    <div 
      className={cn(
        "flowing-border relative p-[1px] rounded-3xl",
        className
      )}
      style={{
        background: `linear-gradient(45deg, ${colors.join(', ')})`,
        backgroundSize: '300% 300%',
        animation: `liquidFlow ${speed}s ease-in-out infinite`
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6">
        {children}
      </div>
    </div>
  );
}

interface GlassRippleProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
}

export function GlassRipple({ 
  children, 
  className, 
  intensity = 'medium' 
}: GlassRippleProps) {
  return (
    <div className={cn(
      "glass-ripple relative group",
      "before:absolute before:inset-0 before:rounded-2xl",
      "before:bg-gradient-to-br before:from-white/10 before:to-transparent",
      "before:opacity-0 before:transition-opacity before:duration-500",
      "hover:before:opacity-100",
      "after:absolute after:inset-0 after:rounded-2xl after:ring-1 after:ring-white/20",
      "after:transition-all after:duration-300",
      "hover:after:ring-2 hover:after:ring-white/40",
      className
    )}>
      {children}
    </div>
  );
}

interface LiquidGlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animate?: boolean;
}

export function LiquidGlassPanel({ 
  children, 
  className, 
  animate = false,
  ...props 
}: LiquidGlassPanelProps) {
  return (
    <div 
      className={cn(
        "liquid-glass-panel",
        animate && "animate-[liquidFloat_8s_ease-in-out_infinite]",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

interface FloatingGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'intense';
  delay?: number;
}

export function FloatingGlassCard({ 
  children, 
  className, 
  intensity = 'normal',
  delay = 0,
  ...props 
}: FloatingGlassCardProps) {
  const intensityClasses = {
    subtle: 'glass-subtle',
    normal: 'glass-card',
    intense: 'glass-intense'
  };

  return (
    <div 
      className={cn(
        intensityClasses[intensity],
        'glass-ripple-effect',
        'animate-[liquidFloat_12s_ease-in-out_infinite]',
        className
      )}
      style={{ animationDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  );
}