'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BOOKS, type Book } from '@/lib/books';

function BookMesh({ book, active }: { book: Book; active: boolean }) {
  return (
    <button
      type="button"
      aria-label={`${book.title} by ${book.author}`}
      className={`bookshelf-book ${active ? 'is-active' : ''}`}
      style={{ ['--spine' as string]: book.spine }}
    >
      <span className="bookshelf-mesh">
        <span className="bookshelf-spine">
          <span className="bookshelf-spine-rule" />
          <span className="bookshelf-spine-title">{book.spineLabel}</span>
          <span className="bookshelf-spine-rule" />
        </span>

        <span className="bookshelf-cover">
          <Image
            src={book.cover}
            alt=""
            fill
            sizes="160px"
            className="object-cover"
            draggable={false}
          />
        </span>

        <span className="bookshelf-back" aria-hidden />
        <span className="bookshelf-pages" aria-hidden />
        <span className="bookshelf-top" aria-hidden />
        <span className="bookshelf-bottom" aria-hidden />
      </span>
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
          {BOOKS.map((book) => (
            <div
              key={book.id}
              role="listitem"
              className={`bookshelf-slot${activeId === book.id ? ' is-open' : ''}`}
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
