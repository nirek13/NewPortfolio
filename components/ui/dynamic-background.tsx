'use client';

import React, { useEffect, useRef } from 'react';
import { FloatingGlassOrb } from './glass-components';

interface LiquidBlobProps {
  className?: string;
  color: string;
  size: number;
  duration: number;
}

function LiquidBlob({ className, color, size, duration }: LiquidBlobProps) {
  return (
    <div 
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        animation: `liquidMorph ${duration}s ease-in-out infinite alternate`
      }}
    />
  );
}

interface FlowingParticleProps {
  delay: number;
  x: number;
  y: number;
  size: number;
}

function FlowingParticle({ delay, x, y, size }: FlowingParticleProps) {
  return (
    <div
      className="absolute rounded-full bg-white/10 animate-float-particle"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${20 + Math.random() * 10}s`
      }}
    />
  );
}

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Pure white background */}
      <div className="absolute inset-0 bg-white" />
    </div>
  );
}