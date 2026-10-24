import { Home } from '@/components/site/home'
import { formatPostDate, getBlogPosts } from '@/lib/blog'

export default function Page() {
  const posts = getBlogPosts()
    .slice(0, 5)
    .map((post) => ({ slug: post.slug, title: post.title, date: post.date, dateLabel: formatPostDate(post.date) }))

  return <Home posts={posts} />
}
