'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BOOKS } from '@/lib/books';

export function Bookshelf() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = BOOKS.find((b) => b.id === activeId);

  return (
    <div className="bookshelf">
      <div className="bookshelf-stage">
        <div className="bookshelf-backboard" aria-hidden />
        <div className="bookshelf-row" role="list">
          {BOOKS.map((book, i) => (
            <div
              key={book.id}
              role="listitem"
              className={`bookshelf-slot${activeId === book.id ? ' is-active' : ''}`}
              style={{
                zIndex: activeId === book.id ? 30 : BOOKS.length - i,
                ['--lean' as string]: `${(i % 3) - 1}deg`,
              }}
              onMouseEnter={() => setActiveId(book.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(book.id)}
              onBlur={() => setActiveId(null)}
            >
              <button
                type="button"
                aria-label={`${book.title} by ${book.author}`}
                className={`bookshelf-book${activeId === book.id ? ' is-active' : ''}`}
                style={{ ['--spine' as string]: book.spine }}
              >
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
                    sizes="140px"
                    className="object-cover"
                    draggable={false}
                    priority={i < 3}
                  />
                </span>
                <span className="bookshelf-pages" aria-hidden />
                <span className="bookshelf-top" aria-hidden />
              </button>
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
