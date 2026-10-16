'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

type CardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
};

export function Card({
  children,
  className,
  interactive = false,
  selected = false,
}: CardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-terminal border bg-surface p-5 transition-colors duration-300 sm:p-6',
        selected ? 'border-accent/60 bg-surface-alt' : 'border-border',
        interactive && !selected && 'hover:border-accent/40',
        className,
      )}
      whileHover={interactive ? { scale: 1.02, y: -4 } : undefined}
      transition={{ duration: 0.28, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}
