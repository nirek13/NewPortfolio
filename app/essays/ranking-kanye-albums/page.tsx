'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, Music, Star } from 'lucide-react';

interface Album {
  rank: number;
  title: string;
  year: number;
  coverArt: string;
  standoutTracks: string[];
  review: string;
  rating: number;
  colorScheme: string;
}

const albums: Album[] = [
  {
    rank: 1,
    title: 'The College Dropout',
    year: 2004,
    coverArt: '/college-dropout-cover.jpg',
    standoutTracks: ['Jesus Walks', 'Through the Wire', 'All Falls Down'],
    review: 'Pure genius.',
    rating: 10,
    colorScheme: 'from-amber-500 to-red-500'
  },
  {
    rank: 2,
    title: 'Graduation',
    year: 2007,
    coverArt: '/pic1.png',
    standoutTracks: ['Good Life', 'Stronger', 'Can\'t Tell Me Nothing'],
    review: 'Perfect evolution.',
    rating: 9.5,
    colorScheme: 'from-purple-500 to-pink-500'
  },
  {
    rank: 3,
    title: 'Watch the Throne',
    year: 2011,
    coverArt: '/pic2.png',
    standoutTracks: ['Murder to Excellence', 'Made in America', 'Lift Off'],
    review: 'Murder to Excellence and Made in America carry. Lift Off pretty good too.',
    rating: 8.8,
    colorScheme: 'from-yellow-600 to-yellow-800'
  },
  {
    rank: 4,
    title: 'The Life of Pablo',
    year: 2016,
    coverArt: '/pic3.png',
    standoutTracks: ['Ultralight Beam', 'Wolves', 'Saint Pablo'],
    review: 'Carried by Ultralight Beam, Wolves, and Saint Pablo.',
    rating: 8.2,
    colorScheme: 'from-orange-500 to-red-600'
  },
  {
    rank: 5,
    title: 'My Beautiful Dark Twisted Fantasy',
    year: 2010,
    coverArt: '/pic4.png',
    standoutTracks: ['Power', 'All of the Lights', 'Runaway'],
    review: 'Good but overhyped.',
    rating: 8.0,
    colorScheme: 'from-red-600 to-black'
  }
];

function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="flex items-center gap-6 mb-8">
      {/* Rank */}
      <div className="text-4xl font-bold text-gray-900 dark:text-white w-12">
        {album.rank}
      </div>

      {/* Album Cover */}
      <div className="w-24 h-24 relative bg-gray-100 dark:bg-gray-800 rounded">
        <Image
          src={album.coverArt}
          alt={album.title}
          fill
          className="object-cover rounded"
          sizes="96px"
        />
      </div>

      {/* Title and Year */}
      <div className="flex-1">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          {album.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {album.year}
        </p>
      </div>
    </div>
  );
}

export default function KanyeAlbumRanking() {
  const averageRating = albums.reduce((sum, album) => sum + album.rating, 0) / albums.length;

  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Header */}
        <header className="mb-12">
          <Link 
            href="/essays" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back
          </Link>
          
          <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-8">
            Kanye Albums
          </h1>
        </header>

        {/* Albums */}
        <section className="mb-12">
          {albums.map((album) => (
            <AlbumCard key={album.rank} album={album} />
          ))}
        </section>

        {/* Navigation */}
        <nav className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
          <div className="text-center">
            <Link 
              href="/essays"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to all essays
            </Link>
          </div>
        </nav>

      </div>
    </main>
  );
}