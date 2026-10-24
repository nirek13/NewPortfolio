import Link from 'next/link';
import { Subpage, SubPanel } from '@/components/site/subpage';
import { formatPostDate, getBlogPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export default function BlogPage() {
  const posts = getBlogPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME}'s blog`,
    url: `${SITE_URL}/blog`,
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };

  return (
    <Subpage active="/blog">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SubPanel index={1} label="blog" kanji="書">
        <h1 className="font-display text-[1.7rem] font-semibold leading-[0.95] sm:text-[2.2rem]">Blog</h1>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-foreground/85">
          Notes from building{' '}
          <Link href="/plyxl" className="font-medium underline decoration-1 underline-offset-[3px] hover:bg-foreground hover:text-background hover:no-underline">
            Plyxl
          </Link>
          , things I&apos;m learning, and whatever else is on my mind.
        </p>
      </SubPanel>

      <SubPanel index={2} label="all posts" className="mt-3">
        <ul className="list-none">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="post-row">
                <p className="post-meta">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readTime}
                </p>
                <h2 className="mt-1 text-[0.98rem] font-medium leading-snug">{post.title}</h2>
                <p className="mt-1 text-[0.84rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      </SubPanel>
    </Subpage>
  );
}
