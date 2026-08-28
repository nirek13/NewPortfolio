'use client';

import { useCallback, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import type { PortfolioItem } from '@/lib/portfolio-data';

export function PolaroidCard({
  item,
  tilt,
  priority,
}: {
  item: PortfolioItem;
  tilt: string;
  priority?: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState(false);
  const fit = item.fit ?? 'cover';

  const resetTilt = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--lift', '0px');
    el.classList.remove('is-hot');
  }, []);

  const onMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      if (flipped) return;
      const el = cardRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--rx', `${(-y * 14).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * 16).toFixed(2)}deg`);
      el.style.setProperty('--lift', '-8px');
      el.classList.add('is-hot');
    },
    [flipped]
  );

  const flip = () => {
    setFlipped((v) => !v);
    resetTilt();
  };

  return (
    <div className="polaroid-scene">
      <article
        ref={cardRef}
        className={`polaroid${flipped ? ' is-flipped is-hot' : ''}`}
        style={{ ['--tilt' as string]: flipped ? '0deg' : tilt }}
        onMouseMove={onMove}
        onMouseLeave={resetTilt}
        onClick={flip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flip();
          }
        }}
        tabIndex={0}
        aria-label={`${item.title}. ${flipped ? 'Flip back' : 'Flip for details'}`}
      >
        <div className="polaroid-inner">
          <div className="polaroid-face polaroid-front">
            <div
              className="polaroid-window relative"
              style={{ backgroundColor: item.frame || '#161616' }}
            >
              <Image
                src={item.image}
                alt=""
                fill
                className={`polaroid-photo ${
                  fit === 'contain' ? 'object-contain p-2.5 sm:p-4' : 'object-cover'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw"
                priority={priority}
              />
            </div>
            <p className="polaroid-caption font-hand">{item.title}</p>
          </div>
          <div className="polaroid-face polaroid-back" aria-hidden={!flipped}>
            <p className="polaroid-note">{item.description}</p>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="polaroid-visit"
                tabIndex={flipped ? 0 : -1}
                onClick={(e) => e.stopPropagation()}
              >
                visit
              </a>
            ) : (
              <span className="polaroid-visit" aria-hidden>
                flip back
              </span>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
