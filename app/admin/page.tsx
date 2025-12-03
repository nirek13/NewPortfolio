'use client';

import { useState } from 'react';
import { createHash } from 'crypto';

const ADMIN_PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'; // "password" - change this!

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const hashPassword = (password: string) => {
    return createHash('sha256').update(password).digest('hex');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const hashedInput = hashPassword(password);
    
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your password to manage blog posts
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog Management</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="/admin/create"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors"
              >
                <div className="text-xl mb-2">✏️</div>
                <div>Create New Post</div>
              </a>
              
              <a
                href="/admin/manage"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors"
              >
                <div className="text-xl mb-2">📝</div>
                <div>Manage Posts</div>
              </a>
              
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-center transition-colors"
              >
                <div className="text-xl mb-2">🚪</div>
                <div>Logout</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}