'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { ThemeProvider } from '@/lib/theme-context';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  preview: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'ranking-kanye-albums',
    title: 'Ranking Kanye Albums',
    date: '2024-01-20',
    readTime: '10 min',
    preview: 'My definitive ranking of Kanye West\'s discography. From The College Dropout to My Beautiful Dark Twisted Fantasy, breaking down what makes each album legendary (or not).'
  }
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-6 py-16">
        
        {/* Header */}
        <header className="mb-16">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
            Essays
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Random thoughts.
          </p>
        </header>

        {/* Blog Posts */}
        <div className="space-y-12">
          {blogPosts.map((post, index) => (
            <article key={post.id} className="group">
              <Link href={`/essays/${post.id}`}>
                <div className="space-y-3 py-6 border-b border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                  
                  {/* Date and read time */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <time className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(post.date)}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} read
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  {/* Preview */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.preview}
                  </p>

                  {/* Read more link */}
                  <div className="text-sm text-blue-600 dark:text-blue-400 group-hover:underline">
                    Read more →
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>


      </div>
    </main>
  );
}