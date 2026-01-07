'use client';

import Image from "next/image";
import Link from "next/link";
import { Mail, Github, Twitter, Linkedin, Briefcase, Camera, User, Sparkles } from "lucide-react";
import { useNavigationBounce } from "../lib/useNavigationBounce";
import { DynamicBackground } from "@/components/ui/dynamic-background";
import { GlassCard, LiquidFlowButton, FlowingBorder, LiquidGlassPanel, FloatingGlassCard } from "@/components/ui/glass-components";
import { GitCommitGraph } from "@/components/widgets/GitStatsWidget";


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
                <div className="text-xs text-gray-500 font-mono">nireks-portfolio</div>
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
            
            {/* Quick Links */}
            <GlassCard className="p-4 text-center group hover:shadow-xl transition-all duration-500" intensity="subtle">
              <div className="space-y-3">
                <h3 className="text-xs font-medium flex items-center gap-2 text-gray-800 justify-center">
                  <span className="text-blue-600 text-sm">🔗</span>
                  <span className="tracking-wide">Quick Links</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent max-w-16"></div>
                </h3>
                <div className="flex justify-center gap-6">
                  <a href="https://github.com/nirek13" target="_blank" rel="noreferrer" className="group/link transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-12">
                    <Github size={32} style={{ color: '#000000' }} className="transition-transform duration-300" />
                  </a>
                  <a href="https://www.linkedin.com/in/nirekshetty/" target="_blank" rel="noreferrer" className="group/link transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-12">
                    <Linkedin size={32} style={{ color: '#0077b5' }} className="transition-transform duration-300" />
                  </a>
                  <a href="mailto:shettynirek@gmail.com" className="group/link transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-12">
                    <Mail size={32} style={{ color: '#ea4335' }} className="transition-transform duration-300" />
                  </a>
                  <a href="mailto:nirek@penseum.com" className="group/link transition-all duration-300 hover:scale-125 hover:-translate-y-2 hover:rotate-12">
                    <Briefcase size={32} style={{ color: '#16a34a' }} className="transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </GlassCard>
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

          {/* Clean Glassy Text Signature */}
          <div className="col-span-12 mt-8">
            <GlassCard className="p-6 text-center group hover:shadow-xl transition-all duration-500" intensity="subtle">
              <div className="relative inline-block">
                <h1 className="relative font-light italic tracking-wide transform-gpu whitespace-nowrap" style={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 8vw, 6rem)',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}>
                  {/* Interactive transparent glassy letter tints */}
                  <div className="relative transition-all duration-700 transform group-hover:scale-[1.02] origin-center">
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(255,150,150,0.6)',
                    background: 'linear-gradient(135deg, rgba(255,200,200,0.2), rgba(255,150,150,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,150,150,0.4))',
                    textShadow: '0 0 30px rgba(255,150,150,0.6)'
                  }}>N</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(255,200,150,0.6)',
                    background: 'linear-gradient(135deg, rgba(255,230,200,0.2), rgba(255,200,150,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,200,150,0.4))',
                    textShadow: '0 0 30px rgba(255,200,150,0.6)'
                  }}>i</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(255,255,150,0.6)',
                    background: 'linear-gradient(135deg, rgba(255,255,200,0.2), rgba(255,255,150,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,255,150,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>r</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(150,255,150,0.6)',
                    background: 'linear-gradient(135deg, rgba(200,255,200,0.2), rgba(150,255,150,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(150,255,150,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>e</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(150,255,255,0.6)',
                    background: 'linear-gradient(135deg, rgba(200,255,255,0.2), rgba(150,255,255,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(150,255,255,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>k</span>
                  <span className="inline-block" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(255,255,255,0.4)',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)',
                    marginLeft: '0.5em',
                    marginRight: '0.5em'
                  }}> </span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(150,150,255,0.6)',
                    background: 'linear-gradient(135deg, rgba(200,200,255,0.2), rgba(150,150,255,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(150,150,255,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>S</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(200,150,255,0.6)',
                    background: 'linear-gradient(135deg, rgba(230,200,255,0.2), rgba(200,150,255,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(200,150,255,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>h</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(255,150,200,0.6)',
                    background: 'linear-gradient(135deg, rgba(255,200,230,0.2), rgba(255,150,200,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,150,200,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>e</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(255,180,150,0.6)',
                    background: 'linear-gradient(135deg, rgba(255,220,200,0.2), rgba(255,180,150,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(255,180,150,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>t</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(150,220,255,0.6)',
                    background: 'linear-gradient(135deg, rgba(200,240,255,0.2), rgba(150,220,255,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(150,220,255,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>t</span>
                  <span className="inline-block cursor-pointer transition-all duration-500 ease-out hover:-translate-y-4 hover:scale-125 hover:rotate-6 active:rotate-180 active:scale-90" style={{ 
                    color: 'transparent', 
                    WebkitTextStroke: '1.5px rgba(180,255,180,0.6)',
                    background: 'linear-gradient(135deg, rgba(220,255,220,0.2), rgba(180,255,180,0.1))',
                    WebkitBackgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(180,255,180,0.3))',
                    textShadow: '0 0 30px rgba(255,255,255,0.4)'
                  }}>y</span>
                </div>
              </h1>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </main>
  );
}
