'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, ExternalLink, Calendar, Users, Code, ArrowLeft, Star, Award, Zap } from 'lucide-react';
import { GlassCard, GlassSection, LiquidFlowButton, FlowingBorder, GlassRipple } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';

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
  challenges?: string[];
  learnings?: string[];
  metrics?: { label: string; value: string }[];
}

const projects: { [key: string]: Project } = {
  'clice': {
    id: 'clice',
    title: 'Clice',
    description: 'Revolutionary stealth startup project changing how we interact with technology',
    longDescription: 'Clice represents a paradigm shift in user experience design, built from the ground up with cutting-edge technologies. This stealth project combines AI, modern web technologies, and innovative design patterns to create something truly unique. While details remain confidential, the project has already attracted significant investor interest and represents the future of human-computer interaction.',
    tech: ['Next.js', 'TypeScript', 'AI/ML', 'WebGL', 'Tailwind CSS', 'Python', 'PostgreSQL', 'Redis'],
    image: '/stealthlogo.jpg',
    category: 'startup',
    featured: true,
    status: 'in-progress',
    date: '2024',
    teamSize: 3,
    achievements: ['$7M valuation offers', 'San Francisco investor meetings', 'Stealth mode development'],
    challenges: ['Maintaining stealth while building', 'Scaling AI infrastructure', 'User experience optimization'],
    learnings: ['Importance of product-market fit', 'Building for scale from day one', 'Team coordination in stealth mode'],
    metrics: [
      { label: 'Valuation Offers', value: '$7M+' },
      { label: 'Team Size', value: '3 People' },
      { label: 'Development Time', value: '8+ Months' }
    ]
  },
  'rate-my-internship': {
    id: 'rate-my-internship',
    title: 'RateMyInternship',
    description: 'RateMyProfessors but for tech internships - helping students make informed decisions',
    longDescription: 'A comprehensive platform where students can rate and review their internship experiences at tech companies. The platform features detailed analytics, company insights, peer recommendations, and salary transparency. Built with a focus on helping students make informed decisions about their career paths and providing companies with valuable feedback about their internship programs.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'AWS', 'Stripe', 'SendGrid'],
    image: '/project-placeholder.jpg',
    category: 'tool',
    featured: true,
    status: 'in-progress',
    date: '2024',
    teamSize: 2,
    achievements: ['Coming soon launch', 'Student beta testing', 'University partnerships'],
    challenges: ['User acquisition strategy', 'Content moderation', 'Building trust with companies'],
    learnings: ['Community building essentials', 'Data privacy importance', 'User feedback integration'],
    metrics: [
      { label: 'Beta Users', value: '150+' },
      { label: 'Universities', value: '5 Partners' },
      { label: 'Reviews', value: '300+' }
    ]
  },
  'cursor-mortgage': {
    id: 'cursor-mortgage',
    title: 'Cursor for Mortgage Brokers',
    description: 'AI-powered tool revolutionizing the mortgage broker workflow and client management',
    longDescription: 'Advanced AI assistant designed specifically for mortgage brokers, featuring automated document processing, client communication management, and intelligent workflow optimization. The platform reduces processing time by 60% and increases broker efficiency through smart automation and predictive analytics.',
    tech: ['AI/ML', 'Python', 'React', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    image: '/project-placeholder.jpg',
    category: 'ai',
    featured: true,
    status: 'completed',
    date: '2023',
    teamSize: 4,
    achievements: ['$7M valuation offers', 'Industry recognition', 'Production deployment'],
    challenges: ['Regulatory compliance', 'Document processing accuracy', 'Real-time data integration'],
    learnings: ['Enterprise sales process', 'Industry-specific AI requirements', 'Security compliance'],
    metrics: [
      { label: 'Processing Time Reduction', value: '60%' },
      { label: 'Active Brokers', value: '200+' },
      { label: 'Documents Processed', value: '10K+' }
    ]
  },
  'portfolio-v2': {
    id: 'portfolio-v2',
    title: 'Liquid Glass Portfolio',
    description: 'This very website - showcasing modern liquid glass design with flowing animations',
    longDescription: 'A reimagined portfolio website featuring liquid glass morphism, flowing animations, and modern art-inspired design. Built with cutting-edge web technologies and thoughtful UX patterns, this project showcases the intersection of aesthetic design and technical excellence.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebGL', 'CSS Animations'],
    image: '/project-placeholder.jpg',
    category: 'experiment',
    featured: false,
    status: 'completed',
    date: '2024',
    teamSize: 1,
    achievements: ['Modern design system', 'Liquid animations', 'Performance optimized'],
    challenges: ['Animation performance', 'Cross-browser compatibility', 'Mobile responsiveness'],
    learnings: ['Advanced CSS techniques', 'Animation optimization', 'Design system architecture'],
    metrics: [
      { label: 'Performance Score', value: '95+' },
      { label: 'Components Built', value: '20+' },
      { label: 'Animations', value: '15+' }
    ]
  }
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects[params.id];

  if (!project) {
    return (
      <main className="relative min-h-screen">
        <DynamicBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <GlassCard className="p-8 text-center">
            <h1 className="text-2xl font-light mb-4">Project Not Found</h1>
            <Link href="/projects">
              <LiquidFlowButton variant="pastel-blue">
                Back to Projects
              </LiquidFlowButton>
            </Link>
          </GlassCard>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 sm:pt-24" />

        {/* macOS-style window */}
        <div className="macos-window w-full">
          <div className="macos-titlebar">
            <div className="macos-traffic-light close"></div>
            <div className="macos-traffic-light minimize"></div>
            <div className="macos-traffic-light maximize"></div>
            <div className="flex-1 text-center">
              <span className="text-sm font-light text-gray-600">{project.title} - Project Details</span>
            </div>
          </div>

          <div className="p-8">
            {/* Back Button */}
            <div className="mb-8">
              <Link href="/projects">
                <LiquidFlowButton variant="pastel-purple" className="group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </LiquidFlowButton>
              </Link>
            </div>

        {/* Hero Section */}
        <FlowingBorder colors={['#93c5fd', '#c4b5fd', '#f9a8d4', '#a7f3d0']} speed={12}>
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-extralight tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-3xl mx-auto">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                project.status === 'completed' ? 'bg-green-200/50 text-green-800' :
                project.status === 'in-progress' ? 'bg-blue-200/50 text-blue-800' :
                'bg-purple-200/50 text-purple-800'
              }`}>
                {project.status}
              </span>
              <span className="px-4 py-2 bg-white/30 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="flex items-center gap-1 px-4 py-2 bg-white/30 rounded-full text-sm">
                <Calendar size={14} />
                {project.date}
              </span>
              {project.teamSize && (
                <span className="flex items-center gap-1 px-4 py-2 bg-white/30 rounded-full text-sm">
                  <Users size={14} />
                  {project.teamSize} people
                </span>
              )}
            </div>

            <div className="flex justify-center gap-4">
              {project.github && (
                <LiquidFlowButton variant="pastel-blue">
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <Github size={16} />
                    GitHub
                  </a>
                </LiquidFlowButton>
              )}
              {project.demo && (
                <LiquidFlowButton variant="pastel-green">
                  <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </LiquidFlowButton>
              )}
            </div>
          </div>
        </FlowingBorder>

        <div className="my-12" />

        {/* Project Image */}
        <GlassRipple className="mb-12">
          <GlassCard className="p-0 overflow-hidden">
            <div className="relative h-64 sm:h-96 bg-gradient-to-br from-blue-100 to-purple-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl sm:text-8xl opacity-50">
                  {project.category === 'startup' ? '🚀' :
                   project.category === 'ai' ? '🤖' :
                   project.category === 'tool' ? '🛠️' : '⚡'}
                </span>
              </div>
            </div>
          </GlassCard>
        </GlassRipple>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <GlassRipple>
              <GlassSection>
                <h2 className="text-2xl font-light mb-4 flex items-center gap-2">
                  <Code size={20} />
                  About This Project
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  {project.longDescription}
                </p>
              </GlassSection>
            </GlassRipple>

            {/* Technology Stack */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-light mb-4">Technology Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg text-sm font-medium border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>

            {/* Challenges & Learnings */}
            {(project.challenges || project.learnings) && (
              <div className="grid gap-6 sm:grid-cols-2">
                {project.challenges && (
                  <GlassCard className="p-6" intensity="subtle">
                    <h3 className="text-lg font-light mb-3 flex items-center gap-2">
                      <Zap size={16} />
                      Challenges
                    </h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                )}

                {project.learnings && (
                  <GlassCard className="p-6" intensity="subtle">
                    <h3 className="text-lg font-light mb-3 flex items-center gap-2">
                      <Star size={16} />
                      Key Learnings
                    </h3>
                    <ul className="space-y-2">
                      {project.learnings.map((learning, index) => (
                        <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {learning}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metrics */}
            {project.metrics && (
              <FlowingBorder colors={['#fecaca', '#ddd6fe', '#a7f3d0']} speed={8}>
                <div className="space-y-4">
                  <h3 className="text-lg font-light flex items-center gap-2">
                    <Award size={16} />
                    Key Metrics
                  </h3>
                  <div className="space-y-3">
                    {project.metrics.map((metric, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-neutral-600">{metric.label}</span>
                        <span className="font-medium">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FlowingBorder>
            )}

            {/* Achievements */}
            {project.achievements && (
              <GlassCard className="p-6" intensity="normal">
                <h3 className="text-lg font-light mb-3 flex items-center gap-2">
                  <Award size={16} />
                  Achievements
                </h3>
                <ul className="space-y-2">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">★</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Project Links */}
            <div className="space-y-3">
              {project.github && (
                <LiquidFlowButton variant="pastel-purple" className="w-full justify-center">
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <Github size={16} />
                    View Source Code
                  </a>
                </LiquidFlowButton>
              )}
              {project.demo && (
                <LiquidFlowButton variant="pastel-green" className="w-full justify-center">
                  <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink size={16} />
                    Try Live Demo
                  </a>
                </LiquidFlowButton>
              )}
            </div>
          </div>
        </div>

            {/* Navigation */}
            <div className="flex justify-center pt-16 pb-8">
              <Link href="/projects">
                <LiquidFlowButton variant="pastel-blue" className="group">
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to All Projects
                </LiquidFlowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}