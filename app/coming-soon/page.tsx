'use client';

import Link from 'next/link';

export default function ComingSoon() {
  return (
    <main className="min-h-screen bg-textured-3d flex items-center justify-center p-6">
      <div className="glass-tinted raised-surface rounded-[2rem] px-12 py-14 max-w-sm w-full text-center">

        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-8">Nirek Shetty</p>

        <h1 className="text-3xl font-light text-gray-800 dark:text-white tracking-tight mb-3">
          Coming soon.
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-10">
          Working on it.
        </p>

        <Link
          href="/"
          className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200 tracking-widest uppercase"
        >
          ← Back home
        </Link>

      </div>
    </main>
  );
}
