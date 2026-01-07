'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin, Briefcase, Camera, User, Sparkles, Settings } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { GlassCard, LiquidFlowButton, FlowingBorder, LiquidGlassPanel, FloatingGlassCard } from "@/components/ui/glass-components";
import { GitCommitGraph } from "@/components/widgets/GitStatsWidget";
import { useState, useEffect } from "react";


function Logo({ src, alt, size = 18, className = "" }: { src: string; alt: string; size?: number; className?: string }) {
  return (
    <span className="inline-flex items-center align-middle relative -top-[1px]">
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        quality={100}
        priority={false}
        className={`h-[18px] w-[18px] object-contain align-middle ${className}`}
      />
    </span>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="relative -top-[1px] leading-none align-middle">{children}</span>
);

const FallbackLogo = ({ alt }: { alt: string }) => (
  <Logo src="/YClogo.png" alt={alt} />
);

export default function Home() {
  const { shouldBounce } = useNavigationBounce('home');
  const [cursorEnabled, setCursorEnabled] = useState(true);

  // Toggle cursor effect in the DOM
  useEffect(() => {
    const splashCursor = document.getElementById('fluid');
    if (splashCursor) {
      splashCursor.style.display = cursorEnabled ? 'block' : 'none';
    }
  }, [cursorEnabled]);

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-[1] min-h-screen p-1.5 lg:p-2">
        {/* Compact Apple-like Glass Grid Layout */}
        <div className="max-w-5xl mx-auto grid grid-cols-12 gap-2 min-h-screen">
          
          {/* Header Section - Full Width */}
          <div className="col-span-12">
            <GlassCard className="p-3" intensity="subtle">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Cursor Toggle Button */}
                  <button
                    onClick={() => setCursorEnabled(!cursorEnabled)}
                    className="group relative flex items-center justify-center w-7 h-7 rounded-full bg-white/60 backdrop-blur-sm border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
                    title={cursorEnabled ? "Disable cursor effects" : "Enable cursor effects"}
                  >
                    <Settings 
                      size={14} 
                      className={`transition-all duration-200 ${cursorEnabled ? 'text-blue-600 rotate-90' : 'text-gray-500'}`} 
                    />
                    <div className={`absolute inset-0 rounded-full transition-opacity duration-200 ${cursorEnabled ? 'bg-gradient-to-t from-blue-500/10 to-transparent opacity-100' : 'opacity-0'}`}></div>
                  </button>
                  <div className="text-xs text-gray-500 font-mono">nireks-portfolio</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-xl lg:text-2xl font-light tracking-wide text-gray-900">◆ Nirek Shetty</h1>
                  <p className="text-gray-600 text-xs mt-0.5">Founder & Engineer</p>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <a href="mailto:Nirek.Shetty.business@gmail.com" className="p-2 hover:bg-blue-600 hover:text-white rounded-lg transition-all duration-200">
                    <Mail size={16} />
                  </a>
                  <a href="https://github.com/Nirek116" target="_blank" rel="noreferrer" className="p-2 hover:bg-gray-800 hover:text-white rounded-lg transition-all duration-200">
                    <Github size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/Nirek-Shetty/" target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-700 hover:text-white rounded-lg transition-all duration-200">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Navigation Cards */}
          <div className="col-span-12 md:col-span-4">
  {/* Reduced padding from p-3 to p-2.5 for a tighter footprint */}
  <GlassCard className="p-2.5 h-full border-white/20 shadow-lg" intensity="subtle">
    <h3 className="text-[10px] font-bold mb-2.5 flex items-center gap-1.5 text-gray-400 uppercase tracking-widest">
      <User size={12} className="opacity-70" />
      Navigation
    </h3>
    
    <div className="space-y-1.5">
      {[
        { href: "/about", label: "About Me", icon: User, variant: "pastel-blue", bounce: 'about' },
        { href: "/projects", label: "Projects", icon: Briefcase, variant: "pastel-purple", bounce: '' },
        { href: "/photography", label: "Photography", icon: Camera, variant: "pastel-pink", bounce: 'photography' }
      ].map((item) => (
        <Link href={item.href} key={item.label} className="block group">
          <LiquidFlowButton 
            variant={item.variant as "pastel-blue" | "pastel-purple" | "pastel-pink" | "pastel-green"} 
            className={`
              w-full justify-start py-1.5 px-3 text-[11px] font-semibold transition-all duration-300 ease-out
              relative overflow-visible
              /* 1. Base State: Flat-ish with a slight rim light */
              border-t border-white/50 border-l border-white/30
              bg-white/10 backdrop-blur-sm
              shadow-[2px_2px_5px_rgba(0,0,0,0.05)]
              
              /* 2. Popping Effect on Hover */
              hover:-translate-y-1 hover:translate-x-0.5
              hover:shadow-[8px_12px_20px_rgba(0,0,0,0.15),-2px_-2px_10px_rgba(255,255,255,0.8)]
              hover:border-white/80
              
              /* 3. Click compression */
              active:translate-y-0.5 active:translate-x-0 active:shadow-inner
              ${item.bounce && shouldBounce(item.bounce) ? 'nav-bounce' : ''}
            `}
          >
            <item.icon size={13} className="mr-2 group-hover:scale-110 group-hover:rotate-3 transition-transform" />
            {item.label}
          </LiquidFlowButton>
        </Link>
      ))}
    </div>
  </GlassCard>
</div>
          {/* TLDR */}
          <div className="col-span-12 md:col-span-8">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="text-blue-600" size={16} />
                  <h2 className="text-sm font-medium text-gray-800">TL;DR</h2>
                </div>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                  <p>↳ <span className="font-semibold text-blue-700">16</span> years old, working at a startup with <span className="font-semibold text-green-700">1 million users</span> called <span className="inline-flex items-center align-middle gap-1"><Logo src="/stealthlogo.jpg" alt="Penseum" className="rounded-full" /><Label>Penseum</Label></span>.</p>
                  
                  <p>↳ Founded a non-profit <span className="font-semibold text-purple-700">Hackathons Canada</span> which has partnered with <span className="font-semibold text-blue-700">Google</span> and <span className="font-semibold text-blue-700">Microsoft</span> with <span className="font-semibold text-green-700">25 million views</span> across social media and <span className="font-semibold text-green-700">5,000 members</span> in its online community.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Currently Building */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800">
                  <span className="text-green-600">🚀</span>
                  Currently Building
                </h3>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Logo src="/stealthlogo.jpg" alt="Penseum" className="rounded-full" />
                      <span className="font-medium text-gray-800">Penseum</span>
                    </div>
                    <p className="text-xs">Educational platform helping 1M+ users learn.</p>
                  </div>
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-purple-600">💼</span>
                      <span className="font-medium text-purple-700">Contractual</span>
                    </div>
                    <p className="text-xs">AI-powered contract management platform.</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Experience */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800">
                  <Briefcase size={14} className="text-purple-600" />
                  Experience Highlights
                </h3>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700">
                  <p>↳ Programming since <span className="font-semibold text-purple-700">age 5</span>, entrepreneur since <span className="font-semibold text-purple-700">age 11</span>.</p>
                  
                  <p>↳ Product engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/stealthlogo.jpg" alt="Penseum" className="rounded-full" /><Label>Penseum</Label></span>, helping <span className="font-semibold text-green-700">1M+ users learn</span>.</p>
                  
                  <p>↳ Founder and Vice President at <span className="font-semibold text-purple-700">Hackathons Canada</span>.</p>
                  
                  <p>↳ Founder at <span className="font-semibold text-purple-700">Contractual</span>.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column with GitHub and Links */}
          <div className="col-span-12 md:col-span-6 space-y-3">
            {/* GitHub Stats Widget */}
            <div>
              <GitCommitGraph />
            </div>
            
            {/* Quick Links - Apple Style */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-gray-50/40 to-white/60 backdrop-blur-2xl rounded-2xl border border-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.05)]"></div>
              
              <div className="relative z-10 px-6 py-5">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-medium text-gray-900" style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '-0.01em'
                  }}>
                    Connect
                  </h3>
                </div>
                
                <div className="flex justify-center gap-4">
                  <a 
                    href="https://github.com/nirek13" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Github size={20} className="text-gray-900 transition-transform duration-200 group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/nirekshetty/" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Linkedin size={20} className="text-[#0077b5] transition-transform duration-200 group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </a>
                  
                  <a 
                    href="mailto:shettynirek@gmail.com" 
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Mail size={20} className="text-[#ea4335] transition-transform duration-200 group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </a>
                  
                  <a 
                    href="mailto:nirek@penseum.com" 
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-black/8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Briefcase size={20} className="text-[#16a34a] transition-transform duration-200 group-hover:scale-110" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dog Photo */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-4 h-full group hover:shadow-xl transition-all duration-500" intensity="subtle">
              <div className="space-y-3">
                <h3 className="text-xs font-medium flex items-center gap-2 text-gray-800">
                  <span className="text-green-600 text-sm">🐕</span>
                  <span className="tracking-wide">My Doggo</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
                </h3>
                <div className="relative">
                  {/* Decorative frame border */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-xl blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-white/20 to-white/5 rounded-xl backdrop-blur-sm overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/30 group-hover:border-white/50 transition-all duration-500">
                    {/* Inner frame shadow */}
                    <div className="absolute inset-2 rounded-lg shadow-inner bg-gradient-to-br from-black/5 to-transparent"></div>
                    <Image
                      src="/dog-with-collar.jpg"
                      alt="Dog with glowing collar"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Apple-esque Footer */}
          <footer className="col-span-12 mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 via-white/20 to-transparent backdrop-blur-xl rounded-2xl border border-gray-200/30"></div>
            
            <div className="relative z-10 px-5 py-6 text-center">
              {/* Signature */}
              <div className="mb-4">
                <h1 className="text-3xl md:text-4xl tracking-wider font-light" style={{ fontFamily: '"Playfair Display", serif' }}>
                  <div className="flex justify-center items-center gap-1">
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(255,120,150,0.6)',
                      background: 'linear-gradient(135deg, rgba(255,180,200,0.2), rgba(255,120,150,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(255,120,150,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>N</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(255,180,120,0.6)',
                      background: 'linear-gradient(135deg, rgba(255,220,180,0.2), rgba(255,180,120,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(255,180,120,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>i</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(255,200,120,0.6)',
                      background: 'linear-gradient(135deg, rgba(255,240,180,0.2), rgba(255,200,120,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(255,200,120,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>r</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(200,255,120,0.6)',
                      background: 'linear-gradient(135deg, rgba(240,255,180,0.2), rgba(200,255,120,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(200,255,120,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>e</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(150,255,150,0.6)',
                      background: 'linear-gradient(135deg, rgba(200,255,200,0.2), rgba(150,255,150,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(150,255,150,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>k</span>
                    <span className="mx-2"></span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(120,255,200,0.6)',
                      background: 'linear-gradient(135deg, rgba(180,255,240,0.2), rgba(120,255,200,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(120,255,200,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>S</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(120,200,255,0.6)',
                      background: 'linear-gradient(135deg, rgba(180,240,255,0.2), rgba(120,200,255,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(120,200,255,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>h</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(150,150,255,0.6)',
                      background: 'linear-gradient(135deg, rgba(200,200,255,0.2), rgba(150,150,255,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(150,150,255,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>e</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(200,120,255,0.6)',
                      background: 'linear-gradient(135deg, rgba(240,180,255,0.2), rgba(200,120,255,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(200,120,255,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>t</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(255,180,150,0.6)',
                      background: 'linear-gradient(135deg, rgba(255,220,200,0.2), rgba(255,180,150,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(255,180,150,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>t</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(150,220,255,0.6)',
                      background: 'linear-gradient(135deg, rgba(200,240,255,0.2), rgba(150,220,255,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(150,220,255,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>t</span>
                    <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 hover:rotate-2 active:rotate-180 active:scale-90" style={{ 
                      color: 'transparent', 
                      WebkitTextStroke: '1.5px rgba(180,255,180,0.6)',
                      background: 'linear-gradient(135deg, rgba(220,255,220,0.2), rgba(180,255,180,0.1))',
                      WebkitBackgroundClip: 'text',
                      filter: 'drop-shadow(0 0 15px rgba(180,255,180,0.3))',
                      textShadow: '0 0 25px rgba(255,255,255,0.4)'
                    }}>y</span>
                  </div>
                </h1>
              </div>
              
              {/* Apple-style footer content */}
              <div className="border-t border-gray-300/20 pt-3">
                <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-xs text-gray-600 font-light">
                  <p className="flex items-center gap-1">
                    <span>Made with</span>
                    <span className="text-red-500 text-xs animate-pulse">♥</span>
                    <span>in Toronto</span>
                  </p>
                  <span className="hidden md:block text-gray-400">•</span>
                  <p className="flex items-center gap-1">
                    <span>Built with</span>
                    <span className="font-medium text-blue-600">Next.js</span>
                  </p>
                  <span className="hidden md:block text-gray-400">•</span>
                  <p className="text-gray-500">© 2024 Nirek Shetty</p>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </main>
  );
}
