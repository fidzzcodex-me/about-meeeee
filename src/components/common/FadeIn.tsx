'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_SOFT } from '@/lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  once?: boolean;
  amount?: number;
};

function offsetFor(direction: Direction, distance: number): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 24,
  once = true,
  amount = 0.2,
}: FadeInProps) {
  const offset = offsetFor(direction, distance);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE_SOFT }}
    >
      {children}
    </motion.div>
  );
}
