'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type BlinkingCursorProps = {
  variant?: 'block' | 'underscore';
  className?: string;
};

export function BlinkingCursor({
  variant = 'block',
  className,
}: BlinkingCursorProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        'inline-block bg-cursor',
        variant === 'block'
          ? 'h-[1.1em] w-[0.55em] align-text-bottom'
          : 'h-[2px] w-[0.6em] align-baseline',
        className,
      )}
      animate={reduced ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
      transition={
        reduced
          ? undefined
          : { duration: 1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }
      }
    />
  );
}
