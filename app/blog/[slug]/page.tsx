import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Subpage, SubPanel } from '@/components/site/subpage';
import { Markdown } from '@/lib/markdown';
import { formatPostDate, getBlogPost, getBlogPosts } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return { title: 'Post not found', robots: { index: false } };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [SITE_URL],
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image', creator: '@nirekshetty', title: post.title, description: post.excerpt },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const others = getBlogPosts().filter((p) => p.slug !== post.slug);
  const related = [
    ...others.filter((p) => p.tags.some((tag) => post.tags.includes(tag))),
    ...others.filter((p) => !p.tags.some((tag) => post.tags.includes(tag))),
  ].slice(0, 3);

  const url = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(', '),
    image: `${url}/opengraph-image`,
    author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: SITE_NAME, url: SITE_URL },
    ...(post.tags.includes('plyxl')
      ? { about: { '@type': 'Organization', '@id': `${SITE_URL}/plyxl#organization`, name: 'Plyxl' } }
      : {}),
  };

  return (
    <Subpage active="/blog">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <SubPanel index={1} label="post" kanji="文" as="article">
        <nav className="post-meta mb-4" aria-label="Breadcrumb">
          <Link href="/blog" className="hover:text-foreground">
            ← blog
          </Link>
        </nav>
        <h1 className="font-display text-[1.6rem] font-semibold leading-[1.1] sm:text-[2.1rem]">{post.title}</h1>
        <p className="post-meta mt-3">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readTime} · by{' '}
          <Link href="/" className="hover:text-foreground">
            {SITE_NAME}
          </Link>
        </p>
        <div className="mt-6">
          <Markdown source={post.content} skipTitle />
        </div>
        <p className="post-meta mt-8 flex flex-wrap gap-x-3 gap-y-1 border-t border-dotted border-foreground/35 pt-3">
          {post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </p>
      </SubPanel>

      {related.length > 0 ? (
        <SubPanel index={2} label="keep reading" className="mt-3">
          <ul className="list-none">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="post-row">
                  <p className="post-meta">
                    <time dateTime={p.date}>{formatPostDate(p.date)}</time> · {p.readTime}
                  </p>
                  <h2 className="mt-1 text-[0.95rem] font-medium leading-snug">{p.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </SubPanel>
      ) : null}
    </Subpage>
  );
}
