import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_FILE_PATH = path.join(process.cwd(), 'lib', 'blog.ts');

// Read the current blog file
function readBlogFile() {
  return fs.readFileSync(BLOG_FILE_PATH, 'utf8');
}

// Write to the blog file
function writeBlogFile(content: string) {
  fs.writeFileSync(BLOG_FILE_PATH, content);
}

// Extract blogPosts array from the file content
function extractBlogPosts(fileContent: string) {
  const match = fileContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error('Could not find blogPosts array in file');
  }
  return JSON.parse(match[1]);
}

// Update blogPosts array in the file content
function updateBlogPosts(fileContent: string, newPosts: any[]) {
  const newPostsString = JSON.stringify(newPosts, null, 2);
  return fileContent.replace(
    /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
    `export const blogPosts: BlogPost[] = ${newPostsString};`
  );
}

export async function POST(request: NextRequest) {
  try {
    const newPost = await request.json();
    
    // Read current blog file
    const fileContent = readBlogFile();
    const currentPosts = extractBlogPosts(fileContent);
    
    // Add new post to the beginning of the array
    const updatedPosts = [newPost, ...currentPosts];
    
    // Update the file
    const updatedContent = updateBlogPosts(fileContent, updatedPosts);
    writeBlogFile(updatedContent);
    
    return NextResponse.json({ success: true, message: 'Blog post created successfully' });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, message: 'Failed to create blog post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { slug, updatedPost } = await request.json();
    
    // Read current blog file
    const fileContent = readBlogFile();
    const currentPosts = extractBlogPosts(fileContent);
    
    // Find and update the post
    const postIndex = currentPosts.findIndex((post: any) => post.slug === slug);
    if (postIndex === -1) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }
    
    currentPosts[postIndex] = { ...currentPosts[postIndex], ...updatedPost };
    
    // Update the file
    const updatedContent = updateBlogPosts(fileContent, currentPosts);
    writeBlogFile(updatedContent);
    
    return NextResponse.json({ success: true, message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ success: false, message: 'Failed to update blog post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    
    if (!slug) {
      return NextResponse.json({ success: false, message: 'Slug is required' }, { status: 400 });
    }
    
    // Read current blog file
    const fileContent = readBlogFile();
    const currentPosts = extractBlogPosts(fileContent);
    
    // Filter out the post to delete
    const updatedPosts = currentPosts.filter((post: any) => post.slug !== slug);
    
    if (updatedPosts.length === currentPosts.length) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }
    
    // Update the file
    const updatedContent = updateBlogPosts(fileContent, updatedPosts);
    writeBlogFile(updatedContent);
    
    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog post' }, { status: 500 });
  }
}