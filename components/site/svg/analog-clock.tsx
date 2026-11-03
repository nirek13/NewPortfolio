'use client';

import { useEffect, useState } from 'react';

const ZONE = 'America/Toronto';

/** Seconds since local midnight in `ZONE`, including milliseconds. */
function zoneSeconds(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONE,
    hourCycle: 'h23',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get('hour') * 3600 + get('minute') * 60 + get('second') + now.getMilliseconds() / 1000;
}

/**
 * A tiny analog clock set to Toronto. The hands are plain CSS rotations with a
 * negative animation-delay equal to the current time, so once mounted they keep
 * perfect time without any JavaScript ticking. The second hand sweeps; it is
 * dropped for visitors who prefer reduced motion.
 */
export function AnalogClock({ className = '' }: { className?: string }) {
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    setOffset(zoneSeconds());
    // re-sync after the tab sleeps or the machine wakes from standby
    const onVisible = () => document.visibilityState === 'visible' && setOffset(zoneSeconds());
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  const hand = (period: number) =>
    offset === null
      ? undefined
      : ({ animationDuration: `${period}s`, animationDelay: `-${offset % period}s` } as const);

  return (
    <svg viewBox="0 0 24 24" className={`aclock ${offset === null ? '' : 'is-set'} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" className="aclock-face" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="12" y1="2.8" x2="12" y2="4.4" className="aclock-tick" transform={`rotate(${a} 12 12)`} />
      ))}
      <line x1="12" y1="12" x2="12" y2="7" className="aclock-hand is-hour" style={hand(43200)} />
      <line x1="12" y1="12" x2="12" y2="4.8" className="aclock-hand is-minute" style={hand(3600)} />
      <line x1="12" y1="13.6" x2="12" y2="4" className="aclock-hand is-second" style={hand(60)} />
      <circle cx="12" cy="12" r="1.1" className="aclock-pin" />
    </svg>
  );
}
