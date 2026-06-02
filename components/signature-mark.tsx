'use client';

import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

const LETTERS = 'Nirek Shetty'.split('');

export function SignatureMark({ className = '' }: { className?: string }) {
  return (
    <h2
      className={cn('font-signature text-2xl font-medium tracking-[0.25em] md:text-3xl', className)}
      aria-label="Nirek Shetty"
    >
      <span className="flex flex-wrap items-center justify-center gap-0.5 md:gap-1">
        {LETTERS.map((letter, i) =>
          letter === ' ' ? (
            <span key={`sp-${i}`} className="w-2 md:w-3" />
          ) : (
            <span
              key={`${letter}-${i}`}
              className="signature-letter inline-block cursor-pointer select-none transition duration-400 ease-out hover:-translate-y-1 hover:scale-105 hover:rotate-1 active:scale-95"
              style={
                {
                  ['--sig-stroke' as string]: 'rgba(0,0,0,0.7)',
                  ['--sig-grad' as string]: 'linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.02))',
                } as CSSProperties
              }
            >
              {letter}
            </span>
          ),
        )}
      </span>
    </h2>
  );
}
