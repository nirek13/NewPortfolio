'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Calendar, Users, Code, Sparkles } from 'lucide-react';
import { GlassCard, GlassSection, LiquidFlowButton, FlowingBorder, GlassRipple } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { ModernArtLoader } from '@/components/ui/loading-animation';

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
    image: '/project-placeholder.jpg',
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
    image: '/project-placeholder.jpg',
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
    image: '/project-placeholder.jpg',
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

  const featuredProjects = projects.filter(project => project.featured);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCategory(category);
      setIsLoading(false);
    }, 300);
  };

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 sm:pt-24" />

        {/* macOS-style window header */}
        <div className="macos-window w-full max-w-7xl mx-auto">
          <div className="macos-titlebar">
            <div className="macos-traffic-light close"></div>
            <div className="macos-traffic-light minimize"></div>
            <div className="macos-traffic-light maximize"></div>
            <div className="flex-1 text-center">
              <span className="text-sm font-light text-gray-600">Projects Portfolio</span>
            </div>
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-16">
              <FlowingBorder colors={['#2563eb', '#9333ea', '#ec4899', '#059669']} className="inline-block">
                <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight">
                  ◆ Projects
                </h1>
              </FlowingBorder>
              <p className="text-lg sm:text-xl text-gray-700 font-light max-w-3xl mx-auto mt-6">
                A curated collection of projects showcasing innovation, technical excellence, and creative problem-solving
              </p>
            </div>

        {/* Navigation */}
        <div className="mb-12">
          <GlassCard className="p-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <LiquidFlowButton
                    key={category.id}
                    variant={selectedCategory === category.id ? 'pastel-blue' : 'pastel-pink'}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex items-center gap-2 ${
                      selectedCategory === category.id ? 'scale-105' : ''
                    }`}
                  >
                    <IconComponent size={16} />
                    {category.label}
                  </LiquidFlowButton>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center mb-12">
            <ModernArtLoader variant="liquid" size="md" />
          </div>
        )}

        {/* Featured Projects */}
        {selectedCategory === 'all' && !isLoading && (
          <section className="mb-16">
            <h2 className="text-2xl font-light mb-8 text-center">Featured Projects</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <GlassRipple key={project.id}>
                  <Link href={`/projects/${project.id}`}>
                    <GlassCard className="group cursor-pointer h-full transition-all duration-300 hover:scale-105" intensity="normal">
                      <div className="space-y-4">
                        <div className="relative h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform duration-300">🚀</span>
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              project.status === 'completed' ? 'bg-green-200/50 text-green-800' :
                              project.status === 'in-progress' ? 'bg-blue-200/50 text-blue-800' :
                              'bg-purple-200/50 text-purple-800'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                        </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-xl font-medium group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span 
                              key={tech}
                              className="px-2 py-1 bg-white/50 rounded-lg text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-1 bg-white/50 rounded-lg text-xs font-medium">
                              +{project.tech.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-4 text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {project.date}
                            </span>
                            {project.teamSize && (
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                {project.teamSize} people
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            {project.github && (
                              <a 
                                href={project.github}
                                className="p-1 hover:text-blue-600 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Github size={16} />
                              </a>
                            )}
                            {project.demo && (
                              <a 
                                href={project.demo}
                                className="p-1 hover:text-blue-600 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    </GlassCard>
                  </Link>
                </GlassRipple>
              ))}
            </div>
          </section>
        )}

        {/* All Projects Grid */}
        {!isLoading && (
          <section>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <GlassRipple key={project.id}>
                  <Link href={`/projects/${project.id}`}>
                    <GlassCard className="group cursor-pointer h-full transition-all duration-300 hover:scale-105" intensity="subtle">
                    <div className="space-y-4">
                      <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl opacity-40">
                            {project.category === 'startup' ? '🚀' :
                             project.category === 'ai' ? '🤖' :
                             project.category === 'tool' ? '🛠️' : '⚡'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium group-hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-neutral-600 text-sm">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 2).map((tech) => (
                            <span 
                              key={tech}
                              className="px-2 py-1 bg-white/30 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    </GlassCard>
                  </Link>
                </GlassRipple>
              ))}
            </div>
          </section>
        )}

            {/* Back to Home */}
            <div className="flex justify-center pt-16 pb-8">
              <Link href="/">
                <LiquidFlowButton variant="pastel-purple" className="group">
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  Back to Home
                </LiquidFlowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}