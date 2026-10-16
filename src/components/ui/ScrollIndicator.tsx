'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';

type ScrollIndicatorProps = {
  variant?: 'progress' | 'hint';
  targetId?: string;
  className?: string;
};

export function ScrollIndicator({
  variant = 'progress',
  targetId = 'about',
  className,
}: ScrollIndicatorProps) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  if (variant === 'hint') {
    return (
      <a
        href={`#${targetId}`}
        aria-label="Scroll ke bagian berikutnya"
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/70 text-text-muted transition-colors hover:border-accent/60 hover:text-accent',
          className,
        )}
      >
        <motion.span
          className="inline-flex"
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </motion.span>
      </a>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-accent',
        className,
      )}
    />
  );
}
