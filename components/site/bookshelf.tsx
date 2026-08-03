'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BOOKS, type Book } from '@/lib/books';

function BookMesh({ book, active }: { book: Book; active: boolean }) {
  return (
    <button
      type="button"
      aria-label={`${book.title} by ${book.author}`}
      className={`bookshelf-book${active ? ' is-active' : ''}`}
      style={{ ['--spine' as string]: book.spine }}
    >
      <span className="bookshelf-spine">
        <span className="bookshelf-spine-title">{book.spineLabel}</span>
      </span>
      <span className="bookshelf-cover">
        <Image
          src={book.cover}
          alt=""
          fill
          sizes="140px"
          className="object-cover"
          draggable={false}
          priority
        />
      </span>
      <span className="bookshelf-pages" aria-hidden />
    </button>
  );
}

export function Bookshelf() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = BOOKS.find((b) => b.id === activeId);

  return (
    <div className="bookshelf">
      <div className="bookshelf-stage">
        <div className="bookshelf-row" role="list">
          {BOOKS.map((book, i) => (
            <div
              key={book.id}
              role="listitem"
              className="bookshelf-slot"
              style={{ zIndex: activeId === book.id ? 20 : i + 1 }}
              onMouseEnter={() => setActiveId(book.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(book.id)}
              onBlur={() => setActiveId(null)}
            >
              <BookMesh book={book} active={activeId === book.id} />
            </div>
          ))}
        </div>
        <div className="bookshelf-plank" aria-hidden>
          <div className="bookshelf-plank-top" />
          <div className="bookshelf-plank-face" />
          <div className="bookshelf-plank-shadow" />
        </div>
      </div>

      <div className="bookshelf-caption" aria-live="polite">
        {active ? (
          <p className="text-sm">
            <span className="font-medium text-foreground">{active.title}</span>
            <span className="text-muted-foreground"> — {active.author}</span>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">&nbsp;</p>
        )}
      </div>
    </div>
  );
}
