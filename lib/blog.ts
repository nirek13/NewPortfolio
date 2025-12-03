export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-hackathons-canada',
    title: 'Building Hackathons Canada: From Idea to 3,500+ Students',
    excerpt: 'The journey of creating Canada\'s largest hackathon community, raising $45,000+, and connecting thousands of brilliant minds across the country.',
    content: `
# Building Hackathons Canada: From Idea to 3,500+ Students

When I first started Hackathons Canada, I had no idea it would grow into a community of over 3,500 students across Canada. What began as a simple idea to connect hackathon enthusiasts has become one of the most impactful projects I've ever worked on.

## The Beginning

It all started when I noticed that Canadian students were scattered across different platforms, struggling to find hackathons and connect with like-minded peers. There was no central hub for the Canadian hackathon community.

## Building the Platform

The technical challenge was creating a platform that could:
- Handle thousands of users
- Manage event registrations
- Process payments for event fees
- Create a sense of community

We built the platform using Next.js and TypeScript, ensuring it was fast, scalable, and user-friendly.

## The Impact

Today, Hackathons Canada has:
- **3,500+ active community members**
- **$45,000+ raised** for tech events
- **Dozens of successful events** hosted
- **Partnerships** with major universities

## Lessons Learned

Building Hackathons Canada taught me:
1. The importance of community-first thinking
2. How to scale technical infrastructure
3. The power of connecting passionate people
4. How to manage large-scale events

## What's Next

We're continuing to grow the platform and exploring new ways to support the Canadian tech community. The future is bright for hackathons in Canada!
    `,
    date: '2024-10-15',
    readTime: '5 min read',
    tags: ['startup', 'community', 'hackathons'],
    featured: true,
    image: '/waterloo-logo.png'
  },
  {
    slug: 'nasa-space-apps-journey',
    title: 'From 93,500 Participants to Global Nominee: My NASA Space Apps Journey',
    excerpt: 'How Voyager-O became a NASA Space Apps Global Nominee among 93,500 participants worldwide, and what I learned about space technology.',
    content: `
# From 93,500 Participants to Global Nominee: My NASA Space Apps Journey

Being nominated as a NASA Space Apps Global Nominee among 93,500 participants worldwide was one of the most surreal experiences of my life. Here's the story of how Voyager-O came to life.

## The Challenge

The NASA Space Apps Challenge presented us with the opportunity to solve real problems faced by NASA. Our team chose to work on making space exploration more accessible to the general public.

## Building Voyager-O

Voyager-O was designed to "Bring The Stars Of The Universe To You." We created an immersive platform that:
- Visualizes real NASA data
- Makes space exploration interactive
- Educates users about our universe
- Uses cutting-edge web technologies

## The Technology

We built Voyager-O using:
- **React** for the frontend
- **Three.js** for 3D visualizations
- **WebGL** for performance
- **NASA APIs** for real data
- **TypeScript** for reliability

## The Global Stage

Out of 93,500 participants worldwide, being selected as a Global Nominee was incredible. It validated our approach to making space technology accessible.

## What I Learned

This experience taught me:
1. The importance of user experience in educational tools
2. How to work with complex datasets
3. The value of visualization in learning
4. How to perform under pressure

## Impact

Voyager-O continues to inspire people about space exploration and demonstrates how technology can make complex topics accessible to everyone.
    `,
    date: '2024-09-28',
    readTime: '4 min read',
    tags: ['nasa', 'space', 'innovation'],
    featured: true,
    image: '/stealthlogo.jpg'
  },
  {
    slug: 'young-entrepreneur-mindset',
    title: 'The Young Entrepreneur Mindset: Lessons from Age 15',
    excerpt: 'Reflections on building startups, raising funds, and creating impact as a 15-year-old entrepreneur in the Canadian tech scene.',
    content: `
# The Young Entrepreneur Mindset: Lessons from Age 15

Being 15 and working in the startup world has given me a unique perspective on entrepreneurship. Here are the key lessons I've learned along the way.

## Starting Early

I've been programming since age 5 and building businesses since age 11. Starting early has given me:
- Time to make mistakes and learn
- A fresh perspective on problems
- Energy to tackle big challenges
- Ability to think differently

## The Advantages of Youth

Being young in the startup world has unexpected advantages:
- **Fearlessness**: Less aware of what "can't" be done
- **Energy**: Ability to work long hours and stay motivated
- **Fresh perspective**: Not constrained by industry "rules"
- **Adaptability**: Quick to learn new technologies

## Building Credibility

The biggest challenge has been building credibility. I've learned to:
- Let my work speak for itself
- Focus on delivering value
- Build strong relationships
- Continuously learn and improve

## Key Projects

Some highlights from my journey:
- Raising $45,000+ for tech events
- Building a community of 3,500+ students
- Getting nominated for NASA Space Apps
- Working with startups and investors

## Advice for Young Entrepreneurs

1. **Start building immediately** - don't wait for permission
2. **Focus on solving real problems** - not just cool tech
3. **Build a strong network** - relationships matter
4. **Learn continuously** - the tech world moves fast
5. **Don't let age define you** - let your work do the talking

## What's Next

I'm continuing to build, learn, and create impact. Age is just a number when you're passionate about solving problems and building the future.
    `,
    date: '2024-10-01',
    readTime: '6 min read',
    tags: ['entrepreneurship', 'youth', 'mindset'],
    featured: false
  },
  {
    slug: 'penseum-product-insights',
    title: 'Product Lessons from Working at Penseum',
    excerpt: 'What I\'ve learned about product development, user experience, and building educational technology at Penseum.',
    content: `
# Product Lessons from Working at Penseum

Working in product at Penseum has been an incredible learning experience. Here are the key insights I've gained about building educational technology.

## Understanding Users

The most important lesson has been truly understanding our users:
- **Students** have different needs than we initially thought
- **Teachers** want tools that actually save them time
- **Parents** care about measurable progress
- **Administrators** need data and insights

## Product Development Process

Our approach to product development:
1. **Research first** - talk to users before building
2. **Iterate quickly** - fail fast and learn
3. **Measure everything** - data drives decisions
4. **Focus on core value** - don't get distracted by features

## Key Challenges

Building educational technology comes with unique challenges:
- Balancing engagement with learning outcomes
- Making complex concepts accessible
- Ensuring privacy and safety for young users
- Integrating with existing educational systems

## What Works

Through testing and iteration, we've learned what works:
- **Immediate feedback** keeps users engaged
- **Personalization** improves learning outcomes
- **Social features** increase motivation
- **Simple interfaces** reduce cognitive load

## The Future of EdTech

I believe the future of educational technology will be:
- More personalized and adaptive
- Integrated into daily learning workflows
- Focused on developing critical thinking
- Powered by AI but human-centered

## My Role

As a product team member, I focus on:
- User research and interviews
- Feature prioritization
- Interface design and testing
- Data analysis and insights

Working at Penseum has taught me that great products start with understanding real user problems and obsessing over solving them elegantly.
    `,
    date: '2024-10-20',
    readTime: '4 min read',
    tags: ['product', 'edtech', 'penseum'],
    featured: false
  }
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => post.tags.includes(tag));
}