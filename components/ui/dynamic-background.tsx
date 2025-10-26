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
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    delay: Math.random() * 15,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Snow white background */}
      <div className="absolute inset-0 bg-white" />
      
      {/* Subtle frosted glass overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-gray-50/20 to-white/80" />
      
      {/* Vibrant liquid blobs - more transparent on white */}
      <LiquidBlob
        className="top-1/6 left-1/5"
        color="rgba(37, 99, 235, 0.08)"
        size={450}
        duration={12}
      />
      <LiquidBlob
        className="top-2/3 right-1/6"
        color="rgba(147, 51, 234, 0.06)"
        size={380}
        duration={15}
      />
      <LiquidBlob
        className="bottom-1/4 left-1/2"
        color="rgba(236, 72, 153, 0.07)"
        size={320}
        duration={18}
      />
      <LiquidBlob
        className="top-1/2 right-1/4"
        color="rgba(34, 197, 94, 0.06)"
        size={350}
        duration={10}
      />
      <LiquidBlob
        className="top-1/3 left-2/3"
        color="rgba(251, 146, 60, 0.05)"
        size={280}
        duration={14}
      />
      <LiquidBlob
        className="bottom-1/6 right-1/3"
        color="rgba(168, 85, 247, 0.06)"
        size={300}
        duration={16}
      />
      
      {/* Enhanced floating glass orbs */}
      <FloatingGlassOrb 
        className="top-1/5 left-1/6 animate-float-gentle" 
        size="lg" 
      />
      <FloatingGlassOrb 
        className="top-1/3 right-1/8 animate-float-delayed-gentle" 
        size="md" 
      />
      <FloatingGlassOrb 
        className="bottom-1/3 left-1/4 animate-float-gentle" 
        size="sm" 
      />
      <FloatingGlassOrb 
        className="bottom-1/4 right-1/5 animate-float-delayed-gentle" 
        size="lg" 
      />
      <FloatingGlassOrb 
        className="top-1/2 left-1/8 animate-float-gentle" 
        size="md" 
      />
      <FloatingGlassOrb 
        className="top-3/4 right-1/3 animate-float-delayed-gentle" 
        size="sm" 
      />
      <FloatingGlassOrb 
        className="top-1/6 right-2/5 animate-float-gentle" 
        size="md" 
      />

      {/* Enhanced flowing particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <FlowingParticle
            key={particle.id}
            delay={particle.delay}
            x={particle.x}
            y={particle.y}
            size={particle.size}
          />
        ))}
      </div>
      
      {/* Subtle frosted glass particles for depth */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <FlowingParticle
            key={particle.id}
            delay={particle.delay}
            x={particle.x}
            y={particle.y}
            size={particle.size}
          />
        ))}
      </div>
      
      {/* Very subtle grid overlay for texture */}
      <div className="absolute inset-0 bg-grid opacity-5" />
      
      {/* Minimal frosted glass overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/15" />
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50/10 via-transparent to-gray-100/10" />
      
      {/* Subtle depth effects */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-50/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-white/15 via-white/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-gray-50/15 via-gray-50/5 to-transparent rounded-full blur-3xl" />
    </div>
  );
}