'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBlogPosts, BlogPost } from '@/lib/blog';

export default function ManagePostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load posts
    const blogPosts = getBlogPosts();
    setPosts(blogPosts);
    setLoading(false);
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blog?slug=${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the post from the local state
        setPosts(posts.filter(post => post.slug !== slug));
        alert('Post deleted successfully!');
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/admin/edit/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Manage Blog Posts</h1>
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to Admin
            </button>
          </div>
          
          <div className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 text-lg">No blog posts found</div>
                <button
                  onClick={() => router.push('/admin/create')}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                          {post.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(post.slug)}
                          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(post.slug)}
                          className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}