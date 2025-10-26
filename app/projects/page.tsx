'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Calendar, Users, Code, Sparkles, ArrowLeft } from 'lucide-react';
import { GlassCard, LiquidFlowButton } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { MacOSHelloLoader } from '@/components/ui/loading-animation';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  category: 'startup' | 'tool' | 'experiment' | 'ai';
  featured: boolean;
  status: 'completed' | 'in-progress' | 'launched';
  date: string;
  teamSize?: number;
  achievements?: string[];
}

const projects: Project[] = [
  {
    id: 'clice',
    title: 'Clice',
    description: 'Revolutionary stealth startup project changing how we interact with technology',
    longDescription: 'Clice represents a paradigm shift in user experience design, built from the ground up with cutting-edge technologies. This stealth project combines AI, modern web technologies, and innovative design patterns to create something truly unique.',
    tech: ['Next.js', 'TypeScript', 'AI/ML', 'WebGL', 'Tailwind CSS'],
    image: '/stealthlogo.jpg',
    category: 'startup',
    featured: true,
    status: 'in-progress',
    date: '2024',
    teamSize: 3,
    achievements: ['$7M valuation offers', 'San Francisco investor meetings', 'Stealth mode development']
  },
  {
    id: 'rate-my-internship',
    title: 'RateMyInternship',
    description: 'RateMyProfessors but for tech internships - helping students make informed decisions',
    longDescription: 'A comprehensive platform where students can rate and review their internship experiences at tech companies. Features detailed analytics, company insights, and peer recommendations.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript'],
    image: '/waterloo-logo.png',
    category: 'tool',
    featured: true,
    status: 'in-progress',
    date: '2024',
    teamSize: 2,
    achievements: ['Coming soon launch', 'Student beta testing', 'University partnerships']
  },
  {
    id: 'cursor-mortgage',
    title: 'Cursor for Mortgage Brokers',
    description: 'AI-powered tool revolutionizing the mortgage broker workflow and client management',
    longDescription: 'Advanced AI assistant designed specifically for mortgage brokers, featuring automated document processing, client communication management, and intelligent workflow optimization.',
    tech: ['AI/ML', 'Python', 'React', 'FastAPI', 'PostgreSQL'],
    image: '/symbal_logo.jpeg',
    category: 'ai',
    featured: true,
    status: 'completed',
    date: '2023',
    teamSize: 4,
    achievements: ['$7M valuation offers', 'Industry recognition', 'Production deployment']
  },
  {
    id: 'portfolio-v2',
    title: 'Liquid Glass Portfolio',
    description: 'This very website - showcasing modern liquid glass design with flowing animations',
    longDescription: 'A reimagined portfolio website featuring liquid glass morphism, flowing animations, and modern art-inspired design. Built with cutting-edge web technologies and thoughtful UX patterns.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebGL'],
    image: '/logo_L.png',
    category: 'experiment',
    featured: false,
    status: 'completed',
    date: '2024',
    teamSize: 1,
    achievements: ['Modern design system', 'Liquid animations', 'Performance optimized']
  }
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Sparkles },
  { id: 'startup', label: 'Startups', icon: Users },
  { id: 'ai', label: 'AI/ML', icon: Code },
  { id: 'tool', label: 'Tools', icon: ExternalLink },
  { id: 'experiment', label: 'Experiments', icon: Github }
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsLoading(false);
    }, 2000); // Duration for the hello animation
  };

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-[1] min-h-screen p-1.5 lg:p-2">
        <div className="max-w-5xl mx-auto">
          
          {/* Header with macOS dots */}
          <GlassCard className="p-3 mb-4" intensity="subtle">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">projects</div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-gray-900">◆ Projects</h1>
              <p className="text-gray-600 text-xs mt-1">A curated collection of my work</p>
            </div>
          </GlassCard>

          {/* Filter Tabs */}
          <GlassCard className="p-2 mb-4" intensity="subtle">
            <div className="flex gap-1 overflow-x-auto">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    disabled={isLoading}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap disabled:opacity-50 ${
                      selectedCategory === category.id
                        ? 'bg-blue-500/20 text-blue-700 backdrop-blur-sm'
                        : 'text-gray-600 hover:bg-white/30'
                    }`}
                  >
                    <IconComponent size={14} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </GlassCard>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <MacOSHelloLoader 
                size="md"
                onComplete={() => setIsLoading(false)}
              />
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <GlassCard className="group cursor-pointer h-full transition-all duration-300 hover:scale-[1.02] p-0 overflow-hidden" intensity="subtle">
                  
                  {/* Cover Image */}
                  <div className="relative h-32 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === 'completed' ? 'bg-green-500/80 text-white' :
                        project.status === 'in-progress' ? 'bg-blue-500/80 text-white' :
                        'bg-purple-500/80 text-white'
                      }`}>
                        {project.status === 'in-progress' ? 'Building' : project.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-500">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {project.date}
                        </span>
                        {project.teamSize && (
                          <span className="flex items-center gap-1">
                            <Users size={10} />
                            {project.teamSize}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-1">
                        {project.github && (
                          <Github size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        )}
                        {project.demo && (
                          <ExternalLink size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
              ))}
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center mt-8">
            <Link href="/">
              <LiquidFlowButton variant="pastel-blue" className="text-xs">
                <ArrowLeft size={14} />
                Back to Home
              </LiquidFlowButton>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}