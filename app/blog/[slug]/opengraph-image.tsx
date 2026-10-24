import { ImageResponse } from 'next/og'
import { getBlogPost, getBlogPosts } from '@/lib/blog'

export const alt = 'A post by Nirek Shetty'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }))
}

export default function PostImage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 96px',
          background: '#fafaf9',
          color: '#111',
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888' }}>
          nirekshetty.com / blog
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 }}>
          {post?.title ?? 'Nirek Shetty'}
        </div>
        <div style={{ fontSize: 30, color: '#555' }}>Nirek Shetty · Founder of Plyxl (YC W27)</div>
      </div>
    ),
    size,
  )
}
