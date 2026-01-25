'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin, Briefcase, Camera, User, Sparkles, Settings } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { GlassCard, LiquidFlowButton, FlowingBorder, LiquidGlassPanel, FloatingGlassCard } from "@/components/ui/glass-components";
import { GitCommitGraph } from "@/components/widgets/GitStatsWidget";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Toggle cursor effect in the DOM
  useEffect(() => {
    const splashCursor = document.getElementById('fluid');
    if (splashCursor) {
      splashCursor.style.display = cursorEnabled ? 'block' : 'none';
    }
  }, [cursorEnabled]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-textured-3d">
      <DynamicBackground />
      
      <div className="relative z-[1] min-h-screen p-1.5 lg:p-2">
        {/* Compact Apple-like Glass Grid Layout */}
        <div className="max-w-5xl lg:max-w-none lg:w-[90%] mx-auto grid grid-cols-12 gap-2 min-h-screen">
          
          {/* Zen Header - Compact Design with Rainbow Theme */}
          <div className="col-span-12">
            <GlassCard className="p-3" intensity="subtle">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-xs text-gray-600 dark:text-gray-100 font-mono">
                    {currentTime.toLocaleTimeString('en-US', { 
                      timeZone: 'America/Toronto',
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit'
                    })} YYZ
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCursorEnabled(!cursorEnabled)}
                      className={`p-1.5 rounded transition-all duration-200 ${cursorEnabled ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30' : ''}`}
                      title={cursorEnabled ? "Disable cursor effects" : "Enable cursor effects"}
                    >
                      <Settings size={14} className={`${cursorEnabled ? 'text-purple-600 dark:text-cyan-400' : 'text-gray-400 dark:text-gray-300'}`} />
                    </button>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-normal mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 leading-tight tracking-wider transform scale-x-110 origin-left" style={{ fontFamily: 'Kapakana, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Nirek Shetty</h1>
                  <p className="text-gray-600 dark:text-gray-200 text-sm">Founder & Engineer</p>
                </div>
                
                <div className="flex gap-2">
                  <a href="mailto:Nirek.Shetty.business@gmail.com" className="p-2 text-gray-500 dark:text-gray-200 hover:text-blue-500 dark:hover:text-cyan-300 transition-colors">
                    <Mail size={16} />
                  </a>
                  <a href="https://github.com/Nirek116" target="_blank" rel="noreferrer" className="p-2 text-gray-500 dark:text-gray-200 hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                    <Github size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/Nirek-Shetty/" target="_blank" rel="noreferrer" className="p-2 text-gray-500 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
              </GlassCard>
          </div>

          {/* Navigation Cards */}
          <div className="col-span-12 md:col-span-4">
            <GlassCard className="p-2.5 h-full" intensity="subtle">
              <h3 className="text-[10px] font-bold mb-2.5 flex items-center gap-1.5 text-gray-400 dark:text-gray-200 uppercase tracking-widest">
                <User size={12} className="opacity-70" />
                Navigation
              </h3>
              
              <div className="space-y-1.5">
                {[
                  { href: "/about", label: "About Me", icon: User, variant: "pastel-blue", bounce: 'about' },
                  { href: "/essays", label: "Essays", icon: Briefcase, variant: "pastel-purple", bounce: '' },
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
                  <Sparkles className="text-blue-600 dark:text-cyan-400" size={16} />
                  <h2 className="text-sm font-medium text-gray-800 dark:text-white">TL;DR</h2>
                </div>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700 dark:text-gray-100">
                  <p>↳ <span className="font-semibold text-blue-700 dark:text-cyan-300">16</span> years old, working at a startup with <span className="font-semibold text-green-700 dark:text-green-300">1 million users</span> called <span className="inline-flex items-center align-middle gap-1"><Logo src="/penseum-logo.avif" alt="Penseum" className="rounded-full" /><Label>Penseum</Label></span>.</p>
                  
                  <p>↳ Founded a non-profit <span className="font-semibold text-purple-700 dark:text-purple-300">Hackathons Canada</span> which has partnered with <span className="font-semibold text-blue-700 dark:text-cyan-300">Google</span> and <span className="font-semibold text-blue-700 dark:text-cyan-300">Microsoft</span> with <span className="font-semibold text-green-700 dark:text-green-300">25 million views</span> across social media and <span className="font-semibold text-green-700 dark:text-green-300">5,000 members</span> in its online community.</p>
                </div>
                </div>
              </GlassCard>
          </div>

          {/* Currently Building */}
          <div className="col-span-12 md:col-span-6">
            <GlassCard className="p-3 h-full" intensity="subtle">
              <div className="space-y-2">
                <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800 dark:text-white">
                  <span className="text-green-600 dark:text-green-300">•</span>
                  Currently Building
                </h3>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700 dark:text-gray-100">
                  <div className="p-2 bg-white/10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Logo src="/penseum-logo.avif" alt="Penseum" className="rounded-full" />
                      <span className="font-medium text-gray-800 dark:text-white">Penseum</span>
                    </div>
                    <p className="text-xs">Educational platform helping 1M+ users learn.</p>
                  </div>
                  <div className="p-2 bg-white/10 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-purple-600 dark:text-purple-300">💼</span>
                      <span className="font-medium text-purple-700 dark:text-purple-300">Contractual</span>
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
                <h3 className="text-xs font-medium flex items-center gap-1.5 text-gray-800 dark:text-white">
                  <Briefcase size={14} className="text-purple-600 dark:text-purple-300" />
                  Experience Highlights
                </h3>
                <div className="space-y-1.5 text-xs leading-relaxed text-gray-700 dark:text-gray-100">
                  
                  <p>↳ Product engineer at <span className="inline-flex items-center align-middle gap-1"><Logo src="/penseum-logo.avif" alt="Penseum" className="rounded-full" /><Label>Penseum</Label></span>, helping <span className="font-semibold text-green-700 dark:text-green-300">1M+ users learn</span>.</p>
                  
                  <p>↳ Founder and Vice President at <span className="font-semibold text-purple-700 dark:text-purple-300">Hackathons Canada</span>.</p>
                  
                  <p>↳ Founder at <span className="font-semibold text-purple-700 dark:text-purple-300">Contractual</span>.</p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Right Column with GitHub and Side-by-Side Widgets */}
          <div className="col-span-12 md:col-span-6 flex flex-col">
            {/* GitHub Stats Widget */}
            <div className="mb-3">
              <GitCommitGraph />
            </div>
            
            {/* Side-by-Side Connect & Time Display */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              {/* Connect Section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-gray-50/40 to-white/60 dark:from-black/80 dark:via-black/60 dark:to-black/80 backdrop-blur-2xl rounded-2xl border border-black/5 dark:border-cyan-400/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(100,200,255,0.3),0_4px_16px_rgba(0,0,0,0.8)]"></div>
                
                <div className="relative z-10 px-4 py-4 h-full flex flex-col justify-center min-h-[120px]">
                  <div className="text-center mb-3">
                    <h3 className="text-xs font-medium text-gray-900 dark:text-white" style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      fontWeight: 500,
                      letterSpacing: '-0.01em'
                    }}>
                      Connect
                    </h3>
                  </div>
                  
                  {/* 2x2 Grid of Connect Buttons */}
                  <div className="grid grid-cols-2 gap-2 max-w-[96px] mx-auto">
                    <a 
                      href="https://github.com/nirek13" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Github size={14} className="text-gray-800 transition-transform duration-200 group-hover:scale-105" />
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/nirekshetty/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Linkedin size={14} className="text-[#0077b5] transition-transform duration-200 group-hover:scale-105" />
                    </a>
                    
                    <a 
                      href="mailto:shettynirek@gmail.com" 
                      className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Mail size={14} className="text-[#ea4335] transition-transform duration-200 group-hover:scale-105" />
                    </a>
                    
                    <a 
                      href="mailto:nirek@penseum.com" 
                      className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm border border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_3px_12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Briefcase size={14} className="text-[#16a34a] transition-transform duration-200 group-hover:scale-105" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Word Search Time Display */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-gray-50/50 to-white/70 dark:from-black/90 dark:via-black/70 dark:to-black/90 backdrop-blur-2xl rounded-2xl border border-black/[0.06] dark:border-purple-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(200,100,255,0.4)]"></div>
                
                <div className="relative z-10 px-0.5 py-0.5 h-full flex flex-col items-center justify-center min-h-[80px]">
                  {/* Word Search Grid */}
                  <div className="grid grid-rows-6 grid-flow-col gap-0 font-mono leading-none w-full h-full">
                    {/* Column 1 */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${true ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${true ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">L</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${true ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${true ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>S</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">A</span>

                    {/* Column 2 */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 20 && currentTime.getMinutes() < 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 20 && currentTime.getMinutes() < 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>W</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 20 && currentTime.getMinutes() < 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 20 && currentTime.getMinutes() < 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 20 && currentTime.getMinutes() < 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 20 && currentTime.getMinutes() < 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>Y</span>

                    {/* Column 3 */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 5 && currentTime.getMinutes() < 10 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>F</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 5 && currentTime.getMinutes() < 10 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 5 && currentTime.getMinutes() < 10 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>V</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 5 && currentTime.getMinutes() < 10 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">X</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 10 && currentTime.getMinutes() < 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>

                    {/* Column 4 */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 10 && currentTime.getMinutes() < 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 10 && currentTime.getMinutes() < 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">Q</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">U</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">A</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">R</span>

                    {/* Column 5 */}
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">T</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">E</span>
                    <span className="w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500">R</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 && currentTime.getMinutes() < 35 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>H</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 && currentTime.getMinutes() < 35 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>A</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 && currentTime.getMinutes() < 35 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>L</span>

                    {/* Column 6 */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 && currentTime.getMinutes() < 35 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>F</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>P</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>A</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>S</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() >= 30 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>O</span>

                    {/* Column 7 - Hours */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 1 || currentTime.getHours() === 13 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>O</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 1 || currentTime.getHours() === 13 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 1 || currentTime.getHours() === 13 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 2 || currentTime.getHours() === 14 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 2 || currentTime.getHours() === 14 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>W</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 2 || currentTime.getHours() === 14 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>O</span>

                    {/* Remaining columns 8-20 */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 3 || currentTime.getHours() === 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 3 || currentTime.getHours() === 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>H</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 3 || currentTime.getHours() === 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>R</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 3 || currentTime.getHours() === 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 3 || currentTime.getHours() === 15 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 4 || currentTime.getHours() === 16 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>F</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 4 || currentTime.getHours() === 16 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>O</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 4 || currentTime.getHours() === 16 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>U</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 4 || currentTime.getHours() === 16 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>R</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 5 || currentTime.getHours() === 17 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>F</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 5 || currentTime.getHours() === 17 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 5 || currentTime.getHours() === 17 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>V</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 5 || currentTime.getHours() === 17 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>

                    {/* Continue remaining columns for other hours and minutes... */}
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 6 || currentTime.getHours() === 18 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>S</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 6 || currentTime.getHours() === 18 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 6 || currentTime.getHours() === 18 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>X</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 7 || currentTime.getHours() === 19 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>S</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 7 || currentTime.getHours() === 19 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 7 || currentTime.getHours() === 19 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>V</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 7 || currentTime.getHours() === 19 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 7 || currentTime.getHours() === 19 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 8 || currentTime.getHours() === 20 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 8 || currentTime.getHours() === 20 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 8 || currentTime.getHours() === 20 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>G</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 8 || currentTime.getHours() === 20 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>H</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 8 || currentTime.getHours() === 20 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 9 || currentTime.getHours() === 21 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 9 || currentTime.getHours() === 21 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>I</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 9 || currentTime.getHours() === 21 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 9 || currentTime.getHours() === 21 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 10 || currentTime.getHours() === 22 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 10 || currentTime.getHours() === 22 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 10 || currentTime.getHours() === 22 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>N</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 11 || currentTime.getHours() === 23 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 11 || currentTime.getHours() === 23 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>L</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 11 || currentTime.getHours() === 23 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 11 || currentTime.getHours() === 23 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>V</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 12 || currentTime.getHours() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>T</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 12 || currentTime.getHours() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>W</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 12 || currentTime.getHours() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 12 || currentTime.getHours() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>L</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 12 || currentTime.getHours() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>V</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getHours() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>E</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>C</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>L</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>O</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>C</span>
                    <span className={`w-2 h-2 sm:w-3 sm:h-3 flex items-center justify-center text-[8px] sm:text-[10px] ${currentTime.getMinutes() === 0 ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`}>K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ULTRA Epic Dog Photo */}
          <div className="col-span-12 md:col-span-6">
              <div className="relative h-full bg-gradient-to-br from-white/70 via-gray-50/50 to-white/70 dark:from-black/80 dark:via-black/60 dark:to-black/80 backdrop-blur-xl border-0 shadow-none overflow-hidden rounded-none">
                
                <div className="relative p-4 h-full">
                  {/* Enhanced header with status indicators */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-300 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.9)] dark:shadow-[0_0_16px_rgba(34,197,94,1)] group-hover:shadow-[0_0_20px_rgba(34,197,94,1)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 dark:bg-cyan-300 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.9)] dark:shadow-[0_0_16px_rgba(6,182,212,1)] animation-delay-150 group-hover:shadow-[0_0_20px_rgba(6,182,212,1)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-purple-400 dark:bg-purple-300 animate-pulse shadow-[0_0_12px_rgba(168,85,247,0.9)] dark:shadow-[0_0_16px_rgba(168,85,247,1)] animation-delay-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,1)]"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-400 dark:bg-pink-300 animate-pulse shadow-[0_0_12px_rgba(236,72,153,0.9)] dark:shadow-[0_0_16px_rgba(236,72,153,1)] animation-delay-450 group-hover:shadow-[0_0_20px_rgba(236,72,153,1)]"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/60 via-purple-400/40 via-pink-400/30 to-transparent dark:from-cyan-300/80 dark:via-purple-300/60 dark:via-pink-300/50 dark:to-transparent animate-[shimmer_2s_ease-in-out_infinite]"></div>
                  </div>
                  
                  {/* Photo container with INSANE effects */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Multiple animated borders */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 via-pink-500/50 to-emerald-500/50 dark:from-cyan-400/70 dark:via-purple-400/70 dark:via-pink-400/70 dark:to-emerald-400/70 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[rotate_8s_linear_infinite]"></div>
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-500/40 via-red-500/40 to-yellow-500/40 dark:from-blue-400/60 dark:via-red-400/60 dark:to-yellow-400/60 rounded-2xl blur-sm opacity-0 group-hover:opacity-80 transition-opacity duration-500 animate-[rotate_6s_linear_infinite_reverse]"></div>
                    <div className="absolute -inset-1 bg-gradient-to-br from-white/70 to-gray-100/50 dark:from-black/80 dark:to-black/60 rounded-xl"></div>
                    
                    {/* Main photo frame with matrix effect */}
                    <div className="relative h-full bg-gradient-to-br from-gray-900/8 to-black/15 dark:from-black/40 dark:to-black/60 rounded-xl overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_3px_12px_rgba(0,0,0,0.8)] border border-white/50 dark:border-cyan-400/40 group-hover:border-cyan-400/50 dark:group-hover:border-cyan-300/70 transition-colors duration-500">
                      
                      {/* Matrix rain effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000">
                        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-green-400/0 via-green-400/60 to-green-400/0 animate-[matrix_3s_linear_infinite]"></div>
                        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-cyan-400/0 via-cyan-400/60 to-cyan-400/0 animate-[matrix_2.5s_linear_infinite] animation-delay-500"></div>
                        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-purple-400/0 via-purple-400/60 to-purple-400/0 animate-[matrix_3.5s_linear_infinite] animation-delay-1000"></div>
                      </div>
                      
                      {/* Holographic rainbow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-500/15 via-yellow-500/10 via-green-500/10 via-cyan-500/15 via-blue-500/10 via-purple-500/15 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay animate-[rainbow_4s_ease-in-out_infinite]"></div>
                      
                      {/* Multiple scanline effects */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/8 to-transparent animate-[scan_2s_ease-in-out_infinite] pointer-events-none"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/6 to-transparent animate-[scan-horizontal_3s_ease-in-out_infinite] pointer-events-none animation-delay-1000"></div>
                      </div>
                      
                      {/* Main image with advanced filters */}
                      <Image
                        src="/dog-with-collar.jpg"
                        alt="Neural-enhanced cyberpunk companion with quantum collar"
                        width={400}
                        height={300}
                        className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110 group-hover:contrast-125 group-hover:brightness-110 group-hover:saturate-125 group-hover:hue-rotate-15"
                      />
                      
                      {/* Enhanced glitch effects */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                        <div className="absolute top-1/6 left-0 right-0 h-1.5 bg-cyan-400/90 transform skew-x-12 animate-glitch-1 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                        <div className="absolute top-2/5 left-0 right-0 h-0.5 bg-purple-400/80 transform -skew-x-6 animate-glitch-2 shadow-[0_0_6px_rgba(168,85,247,0.8)]"></div>
                        <div className="absolute top-3/4 left-0 right-0 h-1 bg-pink-400/70 transform skew-x-3 animate-glitch-3 shadow-[0_0_4px_rgba(236,72,153,0.8)]"></div>
                      </div>
                      
                      {/* Animated corner brackets with circuit patterns */}
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-8 h-8 border-t-2 border-l-2 border-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                        <div className="absolute top-2 left-2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animation-delay-100">
                        <div className="w-8 h-8 border-t-2 border-r-2 border-purple-400/80 shadow-[0_0_8px_rgba(168,85,247,0.6)]"></div>
                        <div className="absolute top-2 right-2 w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-300"></div>
                      </div>
                      <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animation-delay-200">
                        <div className="w-8 h-8 border-b-2 border-l-2 border-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                        <div className="absolute bottom-2 left-2 w-1 h-1 bg-emerald-400 rounded-full animate-pulse animation-delay-600"></div>
                      </div>
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animation-delay-300">
                        <div className="w-8 h-8 border-b-2 border-r-2 border-pink-400/80 shadow-[0_0_8px_rgba(236,72,153,0.6)]"></div>
                        <div className="absolute bottom-2 right-2 w-1 h-1 bg-pink-400 rounded-full animate-pulse animation-delay-900"></div>
                      </div>
                      
                      {/* Enhanced status indicators */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="flex flex-col gap-1 bg-black/40 backdrop-blur-sm rounded p-2 border border-cyan-400/30">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_4px_rgba(34,197,94,0.8)]"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse animation-delay-200 shadow-[0_0_4px_rgba(6,182,212,0.8)]"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse animation-delay-400 shadow-[0_0_4px_rgba(168,85,247,0.8)]"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse animation-delay-600 shadow-[0_0_4px_rgba(236,72,153,0.8)]"></div>
                        </div>
                      </div>
                      
                      {/* Side data panels */}
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-black/50 backdrop-blur-sm rounded p-1 border border-cyan-400/30">
                          <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse mb-1"></div>
                          <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse mb-1 animation-delay-200"></div>
                          <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
                        </div>
                      </div>
                      
                      {/* Enhanced bottom info bar */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-200"></div>
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse animation-delay-400"></div>
                            </div>
                            <div className="flex gap-2">
                              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse"></div>
                              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse animation-delay-300"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* DNA helix animation overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none">
                        <div className="absolute left-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-green-400/60 to-transparent animate-[dna_4s_ease-in-out_infinite] transform rotate-45"></div>
                        <div className="absolute right-1/4 top-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400/60 to-transparent animate-[dna_4s_ease-in-out_infinite] animation-delay-500 transform -rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Music Player - Liquid Glass Style */}
          <div className="col-span-12 mt-4">
            <div className="relative group">
              {/* Multi-layer glass glow effects */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/15 via-purple-500/10 to-pink-500/15 dark:from-cyan-400/25 dark:via-purple-400/20 dark:to-pink-400/25 rounded-2xl blur-lg opacity-40 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-br from-white/20 via-gray-50/10 to-white/20 dark:from-black/40 dark:via-black/20 dark:to-black/40 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Main glass container */}
              <div className="relative bg-gradient-to-br from-white/60 via-gray-50/40 to-white/60 dark:from-black/80 dark:via-black/60 dark:to-black/80 backdrop-blur-2xl rounded-2xl border border-black/8 dark:border-cyan-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[inset_0_1px_0_rgba(100,200,255,0.4),0_12px_48px_rgba(0,0,0,0.9)] overflow-hidden">
                
                <div className="flex items-center p-4 gap-4">
                  {/* Album Art with glass effects */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/40 via-purple-400/30 to-pink-400/40 dark:from-cyan-300/60 dark:via-purple-300/50 dark:to-pink-300/60 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/40 dark:border-cyan-400/40 shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.8)] bg-gradient-to-br from-white/20 to-gray-100/10 dark:from-black/40 dark:to-black/20">
                      <Image
                        src="/college-dropout-cover.jpg"
                        alt="The College Dropout Album Art"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Glass overlay on album art */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/10 dark:from-cyan-400/20 dark:via-transparent dark:to-purple-400/10 opacity-40"></div>
                      {/* Corner glass accents */}
                      <div className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-br from-white/60 to-transparent dark:from-cyan-300/80 dark:to-transparent rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Track Info & Controls */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Family Business</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-200 truncate">Kanye West • The College Dropout</p>
                      </div>
                      
                      {/* Glass audio visualizer */}
                      <div className="flex items-end gap-1 ml-4 h-6">
                        <div className="w-1 bg-gradient-to-t from-cyan-500/80 to-cyan-300/60 rounded-full animate-[wave1_1s_ease-in-out_infinite] h-3 shadow-[0_0_4px_rgba(6,182,212,0.5)]"></div>
                        <div className="w-1 bg-gradient-to-t from-purple-500/80 to-purple-300/60 rounded-full animate-[wave2_1.2s_ease-in-out_infinite] h-4 shadow-[0_0_4px_rgba(168,85,247,0.5)]"></div>
                        <div className="w-1 bg-gradient-to-t from-pink-500/80 to-pink-300/60 rounded-full animate-[wave3_0.8s_ease-in-out_infinite] h-2 shadow-[0_0_4px_rgba(236,72,153,0.5)]"></div>
                        <div className="w-1 bg-gradient-to-t from-cyan-500/80 to-cyan-300/60 rounded-full animate-[wave4_1.1s_ease-in-out_infinite] h-5 shadow-[0_0_4px_rgba(168,85,247,0.5)]"></div>
                        <div className="w-1 bg-gradient-to-t from-purple-500/80 to-purple-300/60 rounded-full animate-[wave5_0.9s_ease-in-out_infinite] h-3 shadow-[0_0_4px_rgba(168,85,247,0.5)]"></div>
                      </div>
                    </div>
                    
                    {/* Glass Audio Player */}
                    <div className="mt-3">
                      <audio 
                        controls 
                        className="w-full h-8 glass-audio-player"
                        preload="metadata"
                      >
                        <source src="/family-business.m4a" type="audio/mp4" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </div>
                  
                  {/* Glass status indicator */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.6)]"></div>
                      <div className="absolute inset-0.5 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra Advanced CSS Animations */}
          <style jsx>{`
            .audio-player {
              background: rgba(0, 0, 0, 0.3);
              border-radius: 6px;
              border: 1px solid rgba(251, 146, 60, 0.2);
            }
            .audio-player::-webkit-media-controls-panel {
              background: rgba(0, 0, 0, 0.3);
            }
            .audio-player::-webkit-media-controls-play-button,
            .audio-player::-webkit-media-controls-pause-button {
              background: rgba(251, 146, 60, 0.8);
              border-radius: 50%;
            }
            .audio-player::-webkit-media-controls-timeline {
              background: rgba(251, 146, 60, 0.3);
              border-radius: 3px;
            }
            .audio-player::-webkit-media-controls-current-time-display,
            .audio-player::-webkit-media-controls-time-remaining-display {
              color: rgba(251, 146, 60, 0.9);
              font-size: 11px;
            }
            @keyframes scan {
              0%, 100% { transform: translateY(-100%); }
              50% { transform: translateY(300%); }
            }
            @keyframes scan-horizontal {
              0%, 100% { transform: translateX(-100%); }
              50% { transform: translateX(300%); }
            }
            @keyframes glitch-1 {
              0%, 100% { transform: translateX(0) skewX(12deg); }
              25% { transform: translateX(-3px) skewX(12deg); }
              75% { transform: translateX(3px) skewX(12deg); }
            }
            @keyframes glitch-2 {
              0%, 100% { transform: translateX(0) skewX(-6deg); }
              33% { transform: translateX(2px) skewX(-6deg); }
              66% { transform: translateX(-2px) skewX(-6deg); }
            }
            @keyframes glitch-3 {
              0%, 100% { transform: translateX(0) skewX(3deg); }
              20% { transform: translateX(-1px) skewX(3deg); }
              40% { transform: translateX(1px) skewX(3deg); }
              60% { transform: translateX(-2px) skewX(3deg); }
              80% { transform: translateX(2px) skewX(3deg); }
            }
            @keyframes matrix {
              0% { transform: translateY(-100%); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(100vh); opacity: 0; }
            }
            @keyframes rainbow {
              0%, 100% { filter: hue-rotate(0deg); }
              25% { filter: hue-rotate(90deg); }
              50% { filter: hue-rotate(180deg); }
              75% { filter: hue-rotate(270deg); }
            }
            @keyframes rotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes shimmer {
              0%, 100% { opacity: 0.6; transform: translateX(-100%); }
              50% { opacity: 1; transform: translateX(100%); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes dna {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              25% { transform: translateY(-5px) rotate(90deg); }
              50% { transform: translateY(0px) rotate(180deg); }
              75% { transform: translateY(5px) rotate(270deg); }
            }
            @keyframes wave1 {
              0%, 100% { height: 0.75rem; }
              50% { height: 1.25rem; }
            }
            @keyframes wave2 {
              0%, 100% { height: 1rem; }
              50% { height: 1.5rem; }
            }
            @keyframes wave3 {
              0%, 100% { height: 0.5rem; }
              50% { height: 1rem; }
            }
            @keyframes wave4 {
              0%, 100% { height: 1.25rem; }
              50% { height: 1.5rem; }
            }
            @keyframes wave5 {
              0%, 100% { height: 0.75rem; }
              50% { height: 1.25rem; }
            }
            .animation-delay-150 { animation-delay: 150ms; }
            .animation-delay-200 { animation-delay: 200ms; }
            .animation-delay-300 { animation-delay: 300ms; }
            .animation-delay-450 { animation-delay: 450ms; }
            .animation-delay-500 { animation-delay: 500ms; }
            .animation-delay-600 { animation-delay: 600ms; }
            .animation-delay-750 { animation-delay: 750ms; }
            .animation-delay-900 { animation-delay: 900ms; }
            .animation-delay-1000 { animation-delay: 1000ms; }
          `}</style>

          {/* Apple-esque Footer */}
          <footer className="col-span-12 mt-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 via-white/20 to-transparent dark:from-black/80 dark:via-black/40 backdrop-blur-xl rounded-2xl border border-gray-200/30 dark:border-cyan-400/20"></div>
            
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
              <div className="border-t border-gray-300/20 dark:border-cyan-400/30 pt-3">
                <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4 text-xs text-gray-600 dark:text-gray-100 font-light">
                  <p className="flex items-center gap-1">
                    <span>Made with</span>
                    <span className="text-red-500 text-xs animate-pulse">♥</span>
                    <span>in Toronto</span>
                  </p>
                  <span className="hidden md:block text-gray-400 dark:text-gray-200">•</span>
                  <p className="flex items-center gap-1">
                    <span>Built with</span>
                    <span className="font-medium text-blue-600 dark:text-cyan-300">Next.js</span>
                  </p>
                  <span className="hidden md:block text-gray-400 dark:text-gray-200">•</span>
                  <p className="text-gray-500 dark:text-gray-200">© 2024 Nirek Shetty</p>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </main>
  );
}
