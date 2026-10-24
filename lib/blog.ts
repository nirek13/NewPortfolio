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
    slug: 'what-is-plyxl',
    title: 'What is Plyxl? The control plane for a business',
    excerpt: "Plyxl (YC W27) connects to the tools a company already runs on, builds one brain out of what's inside them, and lets an agent build the apps and automations the business needs on top.",
    content: `
# What is Plyxl?

People ask me what Plyxl is a lot, and the honest answer used to take five minutes. Here's the short version, then the longer one.

**Plyxl is a business's control plane.** It connects to the tools a company already runs on, builds one brain out of what's inside them, and lets an agent build the software (apps and automations) the business needs on top.

We're in Y Combinator's Winter 2027 batch, and the line on my homepage is still the best summary I have: running a business is hard enough, Plyxl makes it a little easier.

## The problem

A small business doesn't run on one piece of software. It runs on ten: email, a calendar, an accounting tool, a spreadsheet nobody's allowed to touch, a booking page, a payment processor, a few group chats. Each one holds a piece of the truth. None of them talk to each other, and the person stitching them together is usually the owner, late at night.

The usual answer is "move everything into our system." That's the pitch of every ERP, and it's where most of them fail, because migrating a working business is painful, risky and slow. I wrote more about that in [why Plyxl doesn't ask you to switch software](/blog/why-plyxl-doesnt-replace-your-software).

## What Plyxl does instead

Plyxl sits *above* the software you already have. You connect a tool by signing in, and your data stays where it lives. From there:

- **It reads across everything.** Ask "which customers haven't paid?" and the answer comes from your real invoices, email and calendar, not a stale copy of them.
- **It builds apps.** Ask for a screen ("today's jobs, grouped by who's on them") and the agent writes it. You don't get an answer that scrolls away; you get software you open every morning.
- **It builds automations.** "Every morning at 7, text tomorrow's customers their arrival window." It runs on its own, and you can see every message it sent.
- **It keeps a record of everything.** Every read and every change, whether it comes from a person, the agent, an app or an automation, goes through one door. It's attributed, it shows up in Activity, and it can be undone.

## Why "control plane"

The term comes from networking. The control plane decides what happens; the data plane is where the traffic actually flows. That's the shape of Plyxl. Your data keeps living in Gmail, QuickBooks, Stripe and the rest. Plyxl is the layer that sees across them and acts on them.

## Apps and automations are one thing

Under the hood, an app and an automation are the same object: a declared list of what it may read and change, plus generated code. One is started by a person and has a screen; the other is started by an event and doesn't. Building them as one primitive means every safety feature lands on both. More in [apps and automations are the same thing](/blog/apps-and-automations-are-one-thing).

## Why anyone would trust it

"An AI with access to your whole business" should make you nervous. A lot of what we build is the machinery that makes it reasonable: every app shows a plain-language map of what it reads and what it can change, generated code runs in a sealed sandbox that can't step outside that map, and every change can be undone. I go deeper in [how do you let an AI touch your business?](/blog/letting-an-ai-touch-your-business)

## Where to find it

Plyxl lives at [plyxl.com](https://plyxl.com), and there's a summary on [my Plyxl page](/plyxl). If you run a business and the stitching-tools-together part of the week sounds familiar, I'd love to hear from you at [shettynirek@gmail.com](mailto:shettynirek@gmail.com).
    `,
    date: '2026-10-24',
    readTime: '4 min read',
    tags: ['plyxl', 'startups', 'ai'],
    featured: true
  },
  {
    slug: 'why-plyxl-doesnt-replace-your-software',
    title: "Why Plyxl doesn't ask you to switch software",
    excerpt: 'Before Plyxl there was Plyx, a bet that a business would move into one system. Migration is where small-business software goes to die, so Plyxl sits above your tools instead.',
    content: `
# Why Plyxl doesn't ask you to switch software

Before Plyxl, there was Plyx. One letter shorter, a very different bet.

Plyx was "custom ERP in minutes": one system, one schema, replace the stack. It was a good product, and building it forced us to solve genuinely hard problems: a single governed path for every change, an audit trail with real undo, a sealed sandbox for generated code. All of that survived into Plyxl.

What didn't survive was the premise.

## The migration tax

To get any value out of Plyx, a business first had to leave the software it was already using. Move the customers out of the CRM. Move the invoices out of QuickBooks. Rebuild the spreadsheet that only one person understands.

That's a migration, and migrations are where small-business software goes to die. Not because owners are stubborn, but because the math is bad. The cost is paid up front, by the busiest person in the company, while the business still has to run. The payoff arrives weeks later, if everything goes right. Most owners correctly decide it isn't worth it.

## "Replaced, or more likely controlled"

The fix was hiding in one clause of the original concept: every piece of software a business uses should be replaced, *or more likely controlled*. Take "or controlled" seriously and the whole company changes shape.

Plyxl doesn't ask a business to move. It moves in with them, on day one, through a sign-in button. Gmail stays Gmail. QuickBooks stays QuickBooks. The data stays where it lives, and Plyxl becomes the layer above it that can read across all of it and act on it.

The difference, side by side:

- **When it starts being useful.** Plyx: after you migrate your data in. Plyxl: after you sign in to one tool.
- **Where your data lives.** Plyx: in Plyx. Plyxl: wherever it already lives.
- **What makes it hard to copy.** Plyx: feature depth. Plyxl: its connections, and everything it learns about the business over time.

## What this costs us

Sitting above other software is harder in some ways. Every tool has its own sign-in, its own limits, and its own way of breaking quietly. A connection that silently stops working is worse than no connection at all, so connection health has to be something you can see, not something you find out about when an automation didn't run.

We also don't control the shape of anyone's data. A customer in Stripe and the same customer in Gmail are two records in two systems, and the work of knowing they're one person is ours.

## Why it's worth it

Because value starts in minutes instead of months. Because nobody has to bet the business on a migration weekend. And because once Plyxl is connected to the tools a company runs on, it can build the software that company actually needs on top, which is the part I'm most excited about.

If you're new here, start with [what is Plyxl?](/blog/what-is-plyxl)
    `,
    date: '2026-10-24',
    readTime: '4 min read',
    tags: ['plyxl', 'startups', 'product'],
    featured: false
  },
  {
    slug: 'apps-and-automations-are-one-thing',
    title: 'Apps and automations are the same thing',
    excerpt: "An app is started by a person and has a screen. An automation is started by an event and doesn't. Everything else is identical, so in Plyxl they're one primitive, and that one decision keeps paying off.",
    content: `
# Apps and automations are the same thing

When we started on Plyxl, the plan said the two most important things it would build were apps and automations. That part was right. The mistake was thinking they were two things.

## One object, two ways to start

Look at what an app actually is in Plyxl: a declared set of capabilities (what it's allowed to read and change) plus some generated code. Now look at an automation: a declared set of capabilities plus some generated code.

The only difference is what starts it. An app is started by a person and has a screen. An automation is started by an event (a schedule, a new email, a form being filled in) and doesn't.

Everything else is identical:

- the sandbox it runs in
- the map of what it reads and what it can change
- the audit trail
- undo
- version history
- who's allowed to run it

So we built one primitive and called it a **Unit**. An app is a Unit with a screen. An automation is a Unit with a trigger. A Unit can be both at once: a "today's jobs" screen that also texts tomorrow's customers at 7am is one thing, built and governed together, not a page and a workflow that slowly drift apart.

## The payoff: new shapes are cheap

The real win isn't halving the engineering, although it does. It's that the system isn't built for apps or for automations. It's built for the layer underneath, so a new kind of Unit is a small addition instead of a new product.

That bet has been tested twice since:

1. **Published pages.** A Unit that someone outside the business opens with no account: a booking page, an order form, a status page for a customer.
2. **An agent.** Instructions instead of code, with a model deciding each step. One per workspace, named for the business, working as whoever asks it.

Each of those took a database change and a few new pieces, not a rewrite. Every safety feature we'd built for apps (the map, the audit trail, undo) applied to them from day one.

## The general lesson

When two features share most of their machinery, the shared part is usually the actual product. Name it, build it once, and let the features be thin shells around it. It's the closest thing to a free lunch I've found in software.

For the bigger picture, start with [what is Plyxl?](/blog/what-is-plyxl)
    `,
    date: '2026-10-24',
    readTime: '3 min read',
    tags: ['plyxl', 'engineering', 'product'],
    featured: false
  },
  {
    slug: 'letting-an-ai-touch-your-business',
    title: 'How do you let an AI touch your business?',
    excerpt: "Asking a plumbing contractor to let an AI write software that sends messages from their account is a big ask. Here's the machinery Plyxl uses to make it a reasonable one.",
    content: `
# How do you let an AI touch your business?

Here's the pitch for Plyxl, said bluntly: let an AI write software that can read your email, look at your invoices, and send messages on your behalf.

If you run a plumbing company, the right reaction to that sentence is "absolutely not." Most of the engineering in Plyxl exists to change that answer, and almost none of it depends on the AI behaving well.

## 1. A map that can't lie

Everything Plyxl builds carries a plain-language map with three parts: what it **looks at**, what it **does**, and what it **can change**. For a morning dispatch app, something like:

- **Looks at:** today's and tomorrow's jobs, customer names and phone numbers, the crew calendar
- **Does:** groups tomorrow's jobs by tech, works out each arrival window, flags jobs with nobody assigned
- **Can change:** send a text, only to customers on tomorrow's jobs

The important part is where that map comes from. It isn't the AI describing its own work. It's drawn from the same declaration the sandbox enforces. If something isn't on the map, the app can't do it. So the map can't be wrong, even if the model is confused.

Reading and changing also look different everywhere in the product, so one glance tells you whether something only looks at your data or can touch it.

## 2. A sealed room with one narrow door

Generated apps run in a browser sandbox with no network, no cookies, no storage and no access to the page around them. It's a locked room with no windows. The only way out is a small messenger, and every request through it is checked against that app's declared capabilities before it goes anywhere.

For a generated app to do something it shouldn't, two independent things have to fail: the browser's sandbox has to break, *and* the check has to let through something that was never declared. Neither depends on the model.

## 3. One door for every change

Every read and every change in Plyxl goes through the same path, whether it comes from a person clicking a button, the agent, a generated app, or an automation at 3am. There's no back door for "internal" code. That one chokepoint is what makes "an AI with access to your business" something an owner can hear without flinching.

## 4. Undo is the same pipe

Every change is recorded with what things looked like before and after. Undo is just another change, the inverse one, sent through the same door. So undos are logged too, and can themselves be reversed. If the record has changed in the meantime, Plyxl shows you the conflict instead of quietly overwriting it.

## 5. Approve once, then let it work

You approve something when it's built: you see the map, what it can change, and a preview where every change is simulated rather than made. That's the consent. After that, it doesn't nag you on every action, because it can't exceed the map and everything is reversible.

The high-stakes stuff is different. Actions carry an impact level, and people have a ceiling. Anything above someone's ceiling waits for approval instead of just being refused.

## 6. Activity is a main screen

Everything the agent, an app or an automation did shows up in Activity, in the main navigation, not buried in an admin log. Filter it, read it, and undo any row.

## The point

None of this is about trusting the model. Models will get things wrong. The design goal is that when they do, it's visible, contained and fixable in seconds. That's the bar for letting software act on a business's behalf, and it's the bar we hold [Plyxl](/plyxl) to.
    `,
    date: '2026-10-24',
    readTime: '5 min read',
    tags: ['plyxl', 'ai', 'engineering'],
    featured: true
  },
  {
    slug: 'connections-are-the-product',
    title: 'Connections are the product: why Plyxl speaks MCP',
    excerpt: "There are thousands of business tools and you can't hand-build thousands of integrations. So Plyxl's connections are a ladder, where each rung costs less per connection than the one below.",
    content: `
# Connections are the product

The more things Plyxl can connect to, and the easier it is to connect them, the more useful it gets. That sounds obvious, but it's actually a build order.

## The integration trap

Every integration you build by hand is a week you don't get back, and there are thousands of tools a business might use. If your answer to "can it connect to X?" is a list of hand-built integrations, you'll spend the life of the company writing adapters, and a competitor can copy every one of them.

So the answer can't be a list. It has to be a ladder, where each rung costs less per connection than the one below it.

## The ladder

1. **Tables.** Plyxl's own data, for things that don't live anywhere yet. It fills the gaps.
2. **MCP.** Plyxl speaks the Model Context Protocol, the standard the industry is converging on for connecting AI to tools. Any MCP server becomes a connection by pasting its address. Free, forever.
3. **First-party connections.** Polished sign-in connections to the tools almost everyone uses, like Google and Microsoft. Expensive to build, so saved for the handful that matter most.
4. **Any API.** Point Plyxl at a tool's API and it can work with it, with you approving what it's allowed to do.
5. **Inbound.** Things can arrive at a webhook address without anyone integrating anything.

## Everything speaks the same two verbs

Whichever rung a connection comes from, it comes down to the same two things: what can be **read**, and what can be **done**, each action with an impact level. Above that layer, nothing knows or cares where a capability came from. An app reading failed Stripe charges and an app reading your own jobs table are the same code.

That's the real reason this matters. Every connection Plyxl gains makes every app and automation it can build more capable, without anyone rewriting them.

## Why MCP is the big one

Adopting MCP is the highest-leverage decision in the product. Every MCP server anyone writes, for any tool, is a Plyxl connection we didn't have to build. For a small team, that's the difference between chasing the long tail and getting it for free.

New to Plyxl? Start with [what is Plyxl?](/blog/what-is-plyxl)
    `,
    date: '2026-10-24',
    readTime: '3 min read',
    tags: ['plyxl', 'ai', 'engineering'],
    featured: false
  },
  {
    slug: 'starting-a-blog-again',
    title: 'Starting a blog (again)',
    excerpt: "A home for longer thoughts: notes from building Plyxl, things I'm learning, and whatever else is on my mind.",
    content: `
# Starting a blog (again)

This site has had a blog page for a while. Nobody could find it, me included. So, a fresh start.

## Why write

Writing is a good test of whether you actually understand something. A tweet lets you get away with a vibe; a few hundred words doesn't.

It's also a better way to explain what I'm working on. "Plyxl is a control plane for businesses" is accurate and means very little until there are a few paragraphs behind it. Now there are: [what is Plyxl?](/blog/what-is-plyxl)

## What to expect

- **Plyxl.** What we're building, why we made the calls we made, and the ones we got wrong.
- **Building things.** Product, engineering, and the occasional hackathon story.
- **Everything else.** Books, Toronto, whatever I can't stop thinking about that week.

No schedule and no newsletter funnel. If something's worth writing down, it goes here.

## Following along

There's an [RSS feed](/blog/rss.xml) if you use a reader. Otherwise I'm [@nirekshetty](https://x.com/nirekshetty) on X, and I'll post new things there.
    `,
    date: '2026-10-24',
    readTime: '2 min read',
    tags: ['personal'],
    featured: false
  },
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
    image: '/penseum-logo.avif'
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
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
export function formatPostDate(date: string): string {
  // Dates are calendar days; read them in UTC so no time zone shifts them a day back.
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
