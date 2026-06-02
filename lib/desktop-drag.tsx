'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { cn } from '@/lib/utils';

type ZApi = {
  bringToFront: (id: string) => void;
  getZ: (id: string, fallback: number) => number;
};

const ZContext = createContext<ZApi | null>(null);

export function DesktopDragProvider({ children }: { children: React.ReactNode }) {
  const seq = useRef(24);
  const [zMap, setZMap] = useState<Record<string, number>>({});

  const bringToFront = useCallback((id: string) => {
    seq.current += 1;
    const z = seq.current;
    setZMap((m) => ({ ...m, [id]: z }));
  }, []);

  const getZ = useCallback(
    (id: string, fallback: number) => zMap[id] ?? fallback,
    [zMap],
  );

  const value = useMemo(() => ({ bringToFront, getZ }), [bringToFront, getZ]);

  return <ZContext.Provider value={value}>{children}</ZContext.Provider>;
}

function useZStack() {
  const ctx = useContext(ZContext);
  if (!ctx) {
    throw new Error('DesktopDragProvider is required');
  }
  return ctx;
}

function clampTranslate(el: HTMLElement, x: number, y: number) {
  let cx = x;
  let cy = y;
  const pad = 8;
  const topPad = 52;
  const bottomPad = 28;

  for (let i = 0; i < 8; i++) {
    el.style.transform = `translate(${cx}px, ${cy}px)`;
    const r = el.getBoundingClientRect();
    let dx = 0;
    let dy = 0;
    if (r.left < pad) dx += pad - r.left;
    if (r.right > window.innerWidth - pad) dx += window.innerWidth - pad - r.right;
    if (r.top < topPad) dy += topPad - r.top;
    if (r.bottom > window.innerHeight - bottomPad) dy += window.innerHeight - bottomPad - r.bottom;
    if (dx === 0 && dy === 0) return { x: cx, y: cy };
    cx += dx;
    cy += dy;
  }
  return { x: cx, y: cy };
}

export function DraggableFrame({
  windowId,
  id,
  title,
  subtitle,
  className,
  children,
  defaultZ = 10,
}: {
  windowId: string;
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  defaultZ?: number;
}) {
  const { bringToFront, getZ } = useZStack();
  const rootRef = useRef<HTMLElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      const el = rootRef.current;
      if (!el) return;
      let nx = d.originX + (e.clientX - d.startX);
      let ny = d.originY + (e.clientY - d.startY);
      const c = clampTranslate(el, nx, ny);
      posRef.current = c;
      setPos(c);
    };

    const onUp = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      dragRef.current = null;
      setDragging(false);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const onTitlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('a,button,input,textarea,select,video,audio,[role="slider"]')) return;
    bringToFront(windowId);
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: posRef.current.x,
      originY: posRef.current.y,
    };
    setDragging(true);
    try {
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    e.preventDefault();
  };

  const z = getZ(windowId, defaultZ);

  return (
    <section
      ref={rootRef}
      id={id}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, zIndex: z }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition-[box-shadow,border-color,transform] duration-300 dark:border-white/[0.08] dark:bg-[#1c1c1e] dark:shadow-[0_1px_0_rgba(255,255,255,0.03),0_6px_28px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]',
        dragging &&
          'shadow-[0_2px_0_rgba(0,0,0,0.08),0_16px_48px_rgba(0,0,0,0.14)] ring-1 ring-black/10 dark:shadow-[0_2px_0_rgba(255,255,255,0.05),0_16px_48px_rgba(0,0,0,0.75)] dark:ring-white/10',
        !dragging &&
          'hover:border-black/[0.12] hover:shadow-[0_1px_0_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.09),inset_0_1px_0_rgba(255,255,255,1)] dark:hover:border-white/[0.12] dark:hover:shadow-[0_1px_0_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.7)]',
        'will-change-transform touch-manipulation',
        className,
      )}
    >
      <div
        onPointerDown={onTitlePointerDown}
        className={cn(
          'relative flex cursor-grab select-none items-center gap-2.5 border-b border-black/[0.07] bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] px-3 py-2.5 active:cursor-grabbing dark:border-white/[0.07] dark:from-[#2c2c2e] dark:to-[#242426]',
        )}
      >
        <div className="pointer-events-none flex gap-1.5 pl-0.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-black/15 dark:bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-black/10 dark:bg-white/14" />
          <span className="h-2 w-2 rounded-full bg-black/10 dark:bg-white/14" />
        </div>
        <div className="min-w-0 flex-1 text-center">
          <div className="truncate text-[13px] font-semibold tracking-tight text-black dark:text-white">
            {title}
          </div>
          {subtitle ? (
            <div className="truncate text-[11px] font-medium text-black/40 dark:text-white/40">
              {subtitle}
            </div>
          ) : null}
        </div>
        <div
          className="shrink-0 rounded-md border border-black/[0.07] bg-white/80 px-1.5 py-0.5 text-[9px] font-medium text-black/35 dark:border-white/[0.08] dark:bg-white/5 dark:text-white/35"
          title="Drag from here"
        >
          ⋮⋮
        </div>
      </div>
      <div className="relative p-2.5 md:p-3">{children}</div>
    </section>
  );
}
