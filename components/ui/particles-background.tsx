'use client';

import { useEffect, useState } from 'react';

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="particles-container">
      {/* Floating Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
      
      {/* Morphing Background Blobs */}
      <div 
        className="absolute top-20 left-10 w-64 h-64 morph-blob opacity-30 parallax-slow"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-20 right-20 w-80 h-80 morph-blob opacity-20 parallax-fast"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 morph-blob opacity-10"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          animationDelay: '5s',
        }}
      />
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e5e7eb%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>
      
      {/* Cinematic Lens Flares */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gradient-radial from-white/60 to-transparent rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-gradient-radial from-blue-400/80 to-transparent rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-2/3 right-1/2 w-1.5 h-1.5 bg-gradient-radial from-purple-400/70 to-transparent rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
    </div>
  );
}