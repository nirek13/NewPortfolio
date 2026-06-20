'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'intense';
  tilt?: boolean;
}

export function GlassCard({
  children,
  className,
  intensity = 'normal',
  tilt = true,
  ...props
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const hoveringRef = useRef(false);
  const targetRef = useRef({ tx: 0, ty: 0, shineX: 50, shineY: 50, shineOp: 0 });
  const currentRef = useRef({ tx: 0, ty: 0, shineX: 50, shineY: 50, shineOp: 0 });

  const applyTilt = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const cur = currentRef.current;
    const tgt = targetRef.current;
    const ease = hoveringRef.current ? 0.14 : 0.08;

    cur.tx += (tgt.tx - cur.tx) * ease;
    cur.ty += (tgt.ty - cur.ty) * ease;
    cur.shineX += (tgt.shineX - cur.shineX) * ease;
    cur.shineY += (tgt.shineY - cur.shineY) * ease;
    cur.shineOp += (tgt.shineOp - cur.shineOp) * ease;

    el.style.setProperty('--tilt-x', `${cur.tx.toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${cur.ty.toFixed(2)}deg`);
    el.style.setProperty('--shine-x', `${cur.shineX.toFixed(1)}%`);
    el.style.setProperty('--shine-y', `${cur.shineY.toFixed(1)}%`);
    el.style.setProperty('--shine-opacity', cur.shineOp.toFixed(3));

    const settled =
      Math.abs(cur.tx - tgt.tx) < 0.02 &&
      Math.abs(cur.ty - tgt.ty) < 0.02 &&
      Math.abs(cur.shineOp - tgt.shineOp) < 0.02;

    if (!settled || hoveringRef.current) {
      rafRef.current = requestAnimationFrame(applyTilt);
    }
  }, []);

  const startTiltLoop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(applyTilt);
  }, [applyTilt]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    hoveringRef.current = true;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    targetRef.current = {
      tx: (y - 0.5) * 5,
      ty: (0.5 - x) * 5,
      shineX: x * 100,
      shineY: y * 100,
      shineOp: 0.65,
    };

    startTiltLoop();
  }, [startTiltLoop]);

  const handleMouseLeave = useCallback(() => {
    hoveringRef.current = false;
    targetRef.current = { tx: 0, ty: 0, shineX: 50, shineY: 50, shineOp: 0 };
    startTiltLoop();
  }, [startTiltLoop]);

  return (
    <div
      ref={ref}
      className={cn(
        'glass-tinted raised-surface',
        tilt && 'tactile-tilt',
        className
      )}
      onMouseMove={tilt ? handleMouseMove : undefined}
      onMouseLeave={tilt ? handleMouseLeave : undefined}
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
        "glass-tinted backdrop-blur-xl border-b sticky top-0 z-50",
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
    primary: 'glass-tinted hover:scale-105',
    secondary: 'glass-tinted opacity-80 hover:opacity-100',
    ghost: 'glass-tinted bg-opacity-50 hover:bg-opacity-100 border-transparent'
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
      className={cn("glass-tinted p-6 md:p-8", className)} 
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
        "absolute rounded-full glass-tinted opacity-20 pointer-events-none",
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
        "backdrop-blur-md border border-white/20",
        "btn-tactile hover-glow",
        variantClasses[variant],
        speedClasses[flowSpeed],
        className
      )}
      {...props}
    >
      <span className="relative z-10 font-medium tracking-wide text-gray-900 dark:text-white drop-shadow-sm">
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
        "glass-tinted",
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
    subtle: 'glass-tinted opacity-80',
    normal: 'glass-tinted',
    intense: 'glass-tinted'
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

