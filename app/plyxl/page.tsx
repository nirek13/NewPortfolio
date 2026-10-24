import type { Metadata } from 'next';
import Link from 'next/link';
import { Subpage, SubPanel } from '@/components/site/subpage';
import { PlyxlMark, YCBadge } from '@/components/site/plyxl';
import { formatPostDate, getBlogPosts } from '@/lib/blog';
import { PLYXL_DESCRIPTION, PLYXL_JSON_LD, PLYXL_URL, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Plyxl (YC W27)',
  description: `${PLYXL_DESCRIPTION} Founded by ${SITE_NAME}.`,
  alternates: { canonical: '/plyxl' },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/plyxl`,
    title: 'Plyxl (YC W27) — founded by Nirek Shetty',
    description: PLYXL_DESCRIPTION,
  },
};

const HOW = [
  {
    term: 'Connect what you already use',
    body: 'Sign in to Gmail, your calendar, your accounting tool, Stripe, or any MCP server. Nothing moves; your data stays where it lives.',
  },
  {
    term: 'Ask across all of it',
    body: '“Which customers haven’t paid?” is answered from your real invoices, email and calendar, with the sources shown.',
  },
  {
    term: 'Get software, not just answers',
    body: 'Ask for a screen and the agent builds an app you open every morning. Ask for something to happen on a schedule and it builds an automation.',
  },
  {
    term: 'Every change on the record',
    body: 'People, the agent, apps and automations all change things through one door. Every change is attributed, shows up in Activity, and can be undone.',
  },
];

const FAQ = [
  {
    q: 'What is Plyxl?',
    a: 'A control plane for a business. Plyxl connects to the tools a company already runs on, builds one brain out of what’s inside them, and lets an agent build the apps and automations the business needs on top.',
  },
  {
    q: 'Who founded Plyxl?',
    a: `${SITE_NAME}, a founder and product engineer from Toronto, previously a product engineer at Penseum and the founder of Hackathons Canada.`,
  },
  {
    q: 'Is Plyxl backed by Y Combinator?',
    a: 'Yes. Plyxl is part of Y Combinator’s Winter 2027 (W27) batch.',
  },
  {
    q: 'Do I have to move my data into Plyxl?',
    a: 'No. Plyxl sits above the software you already use and works with your data where it lives. It has its own tables for the things that don’t live anywhere yet.',
  },
  {
    q: 'How does Plyxl keep an AI from doing something it shouldn’t?',
    a: 'Everything it builds shows a plain-language map of what it reads and what it can change, generated code runs in a sealed sandbox that can’t go past that map, high-impact actions wait for approval, and every change can be undone.',
  },
];

export default function PlyxlPage() {
  const posts = getBlogPosts().filter((post) => post.tags.includes('plyxl'));

  return (
    <Subpage active="/plyxl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PLYXL_JSON_LD) }} />

      <SubPanel index={1} label="plyxl · yc w27" kanji="羊">
        <h1 className="flex items-center gap-2.5 font-display text-[1.9rem] font-semibold leading-none sm:text-[2.4rem]">
          <PlyxlMark className="h-8 w-8 sm:h-9 sm:w-9" />
          Plyxl
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <YCBadge batch="W27" />
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            founded by {SITE_NAME}
          </span>
        </div>
        <p className="mt-4 text-[1rem] leading-relaxed text-foreground/90">
          Running a business is hard enough.{' '}
          <span className="font-medium text-foreground">Plyxl makes it a little easier.</span>
        </p>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">{PLYXL_DESCRIPTION}</p>
        <p className="mt-4 flex flex-wrap gap-4">
          <a href={PLYXL_URL} target="_blank" rel="noopener noreferrer" className="link-badge">
            plyxl.com ↗
          </a>
          <Link href="/blog/what-is-plyxl" className="link-badge">
            what is plyxl? →
          </Link>
        </p>
      </SubPanel>

      <SubPanel index={2} label="how it works" className="mt-3">
        <dl>
          {HOW.map((item) => (
            <div key={item.term} className="exp-row !block">
              <dt className="text-[0.92rem] font-medium">{item.term}</dt>
              <dd className="mt-1 text-[0.86rem] leading-relaxed text-muted-foreground">{item.body}</dd>
            </div>
          ))}
        </dl>
      </SubPanel>

      <SubPanel index={3} label="questions" className="mt-3">
        <dl>
          {FAQ.map((item) => (
            <div key={item.q} className="exp-row !block">
              <dt className="text-[0.92rem] font-medium">{item.q}</dt>
              <dd className="mt-1 text-[0.86rem] leading-relaxed text-muted-foreground">{item.a}</dd>
            </div>
          ))}
        </dl>
      </SubPanel>

      {posts.length > 0 ? (
        <SubPanel index={4} label="writing on plyxl" className="mt-3">
          <ul className="list-none">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="post-row">
                  <p className="post-meta">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readTime}
                  </p>
                  <h2 className="mt-1 text-[0.95rem] font-medium leading-snug">{post.title}</h2>
                  <p className="mt-1 text-[0.84rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </SubPanel>
      ) : null}
    </Subpage>
  );
}
