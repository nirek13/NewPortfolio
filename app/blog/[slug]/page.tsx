'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { GlassCard, LiquidFlowButton } from '@/components/ui/glass-components';
import { DynamicBackground } from '@/components/ui/dynamic-background';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  // Get related posts (same tags, excluding current post)
  const allPosts = getBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 2);

  // Format content - simple markdown-like parsing
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        line = line.trim();
        
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{line.substring(2)}</h1>;
        }
        
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{line.substring(3)}</h2>;
        }
        
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={index} className="ml-4 text-gray-700 mb-1">{line.substring(2)}</li>;
        }
        
        if (/^\d+\./.test(line)) {
          const text = line.replace(/^\d+\.\s*/, '');
          return <li key={index} className="ml-4 text-gray-700 mb-1 list-decimal">{text}</li>;
        }
        
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={index} className="font-semibold text-gray-800 my-3">{line.slice(2, -2)}</p>;
        }
        
        if (line === '') {
          return <br key={index} />;
        }
        
        // Regular paragraph with bold text support
        const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-800">$1</strong>');
        
        return (
          <p 
            key={index} 
            className="text-gray-700 leading-relaxed mb-3"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      })
      .filter(Boolean);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="relative min-h-screen">
      <DynamicBackground />
      
      <div className="relative z-[1] min-h-screen p-1.5 lg:p-2">
        <div className="max-w-4xl mx-auto">
          
          {/* Header with macOS dots */}
          <GlassCard className="p-3 mb-4" intensity="subtle">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono">{post.slug}</div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between text-xs">
              <Link href="/blog" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft size={12} />
                Back to Blog
              </Link>
              
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Share2 size={12} />
                Share
              </button>
            </div>
          </GlassCard>

          {/* Article Header */}
          <GlassCard className="p-6 mb-4" intensity="subtle">
            {post.image && (
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-gray-900 mb-2">
                  {post.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </div>
                
                <div className="flex items-center gap-2">
                  <Tag size={14} />
                  <div className="flex gap-1">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 bg-white/60 rounded text-xs font-medium text-gray-700 capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Article Content */}
          <GlassCard className="p-6 mb-6" intensity="subtle">
            <div className="prose prose-gray max-w-none">
              <div className="text-sm leading-relaxed">
                {formatContent(post.content)}
              </div>
            </div>
          </GlassCard>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <GlassCard className="p-4 mb-4" intensity="subtle">
              <h2 className="text-sm font-medium text-gray-800 mb-3 flex items-center gap-1.5">
                <BookOpen size={16} className="text-blue-600" />
                Related Posts
              </h2>
              
              <div className="grid gap-3 md:grid-cols-2">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all cursor-pointer">
                      <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Back to Blog Button */}
          <div className="flex justify-center">
            <Link href="/blog">
              <LiquidFlowButton variant="pastel-blue" className="text-xs">
                <BookOpen size={14} />
                All Blog Posts
              </LiquidFlowButton>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}