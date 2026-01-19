export interface Essay {
  id: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // in minutes
  tags: string[];
  category: 'tech' | 'entrepreneurship' | 'personal' | 'thoughts' | 'ai';
  featured: boolean;
  status: 'published' | 'draft';
  slug: string;
  image?: string;
  views?: number;
  likes?: number;
}

export const essays: Essay[] = [
  {
    id: '1',
    title: 'Building at 16: Lessons from the Startup Trenches',
    description: 'Reflections on starting a company in high school and what I\'ve learned about entrepreneurship.',
    excerpt: 'At 16, I\'ve already been through the rollercoaster of building multiple companies. Here are the lessons I wish someone had told me when I started.',
    content: `# Building at 16: Lessons from the Startup Trenches

At 16, I've already been through the rollercoaster of building multiple companies. Starting with Hackathons Canada and now working on Penseum and other ventures, I've learned that entrepreneurship at a young age comes with unique challenges and opportunities.

## The Reality of Young Entrepreneurship

People often romanticize the idea of young entrepreneurs, but the reality is much more nuanced. Yes, you have energy and fewer responsibilities, but you also lack experience, network, and often credibility in the eyes of potential partners and investors.

## Key Lessons I've Learned

### 1. Network Early and Authentically
Building genuine relationships is crucial. Don't just reach out when you need something - provide value first.

### 2. Embrace Being Underestimated
Use it as motivation. When people doubt your abilities because of your age, prove them wrong through execution.

### 3. Learn by Doing
No amount of reading can replace hands-on experience. Build things, fail fast, and iterate.

### 4. Find Great Mentors
Having experienced entrepreneurs guide you can save you from costly mistakes.

## What's Next

The journey is far from over. With Penseum reaching 1M+ users and new projects on the horizon, I'm excited to see where this path leads.

The best time to start is now, regardless of your age.`,
    publishedAt: '2024-01-15',
    readTime: 5,
    tags: ['entrepreneurship', 'startup', 'youth', 'lessons'],
    category: 'entrepreneurship',
    featured: true,
    status: 'published',
    slug: 'building-at-16-startup-lessons',
    image: '/essay-placeholder.jpg',
    views: 247,
    likes: 18
  },
  {
    id: '2',
    title: 'The Future of AI in Education',
    description: 'How artificial intelligence is transforming learning and what it means for the next generation.',
    excerpt: 'Working on Penseum has given me a front-row seat to how AI is revolutionizing education. Here\'s what I see coming.',
    content: `# The Future of AI in Education

Working on Penseum, which serves over 1 million users, has given me a unique perspective on how AI is transforming education. We're not just talking about chatbots or automated grading - we're seeing a fundamental shift in how people learn.

## Personalized Learning at Scale

AI enables truly personalized education experiences. Every student learns differently, and AI can adapt in real-time to individual learning styles, pace, and preferences.

## The Role of Human Teachers

Contrary to popular belief, AI won't replace teachers. Instead, it will augment their capabilities, handling routine tasks so educators can focus on higher-level guidance and mentoring.

## Challenges We Face

### Privacy and Ethics
With great power comes great responsibility. How do we ensure student data is protected while still providing personalized experiences?

### The Digital Divide
Not everyone has equal access to AI-powered educational tools. We need to ensure these advances don't widen existing inequalities.

## What We're Building

At Penseum, we're working on solutions that make AI-powered education accessible to everyone. Our goal is to democratize learning and help people achieve their potential regardless of their background.

The future of education is bright, and AI will play a crucial role in making learning more effective, accessible, and engaging for everyone.`,
    publishedAt: '2024-01-08',
    readTime: 7,
    tags: ['ai', 'education', 'technology', 'future'],
    category: 'tech',
    featured: true,
    status: 'published',
    slug: 'future-ai-education',
    image: '/essay-placeholder.jpg',
    views: 189,
    likes: 23
  },
  {
    id: '3',
    title: 'Why I Dropped Out of Traditional School',
    description: 'The decision that changed everything and what I\'ve learned from unconventional education.',
    excerpt: 'Choosing entrepreneurship over traditional education wasn\'t easy, but it\'s been the most valuable learning experience of my life.',
    content: `# Why I Dropped Out of Traditional School

Making the decision to leave traditional education wasn't taken lightly. But sometimes, the best classroom is the real world.

## The Turning Point

When Hackathons Canada started gaining serious traction and Penseum opportunities emerged, I realized I was learning more from building companies than sitting in classrooms.

## What I've Gained

- Real-world business experience
- Network of entrepreneurs and mentors
- Financial independence
- The ability to impact millions of users

## What I've Sacrificed

I won't pretend there haven't been trade-offs. Missing out on the traditional high school experience and the social aspects of school were difficult decisions.

## Alternative Learning

My education didn't stop - it just changed form:
- Online courses and certifications
- Mentorship from industry experts
- Learning by building real products
- Reading extensively on topics I'm passionate about

## Advice for Others

This path isn't for everyone. Traditional education has value, and the decision should be made carefully with consideration of your goals, circumstances, and support system.

For me, it was the right choice. But I encourage anyone considering this path to really think through the implications and have a clear plan for continued learning.`,
    publishedAt: '2024-01-01',
    readTime: 4,
    tags: ['education', 'personal', 'entrepreneurship', 'unconventional'],
    category: 'personal',
    featured: false,
    status: 'published',
    slug: 'why-dropped-out-school',
    image: '/essay-placeholder.jpg',
    views: 156,
    likes: 12
  }
];

export const categories = [
  { id: 'all', label: 'All Essays', icon: '📝' },
  { id: 'tech', label: 'Technology', icon: '💻' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', icon: '🚀' },
  { id: 'personal', label: 'Personal', icon: '🌱' },
  { id: 'thoughts', label: 'Thoughts', icon: '💭' },
  { id: 'ai', label: 'AI & ML', icon: '🤖' }
];

export function getEssayById(id: string): Essay | undefined {
  return essays.find(essay => essay.id === id);
}

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find(essay => essay.slug === slug);
}

export function getEssaysByCategory(category: string): Essay[] {
  if (category === 'all') return essays.filter(essay => essay.status === 'published');
  return essays.filter(essay => essay.category === category && essay.status === 'published');
}

export function getFeaturedEssays(): Essay[] {
  return essays.filter(essay => essay.featured && essay.status === 'published');
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}