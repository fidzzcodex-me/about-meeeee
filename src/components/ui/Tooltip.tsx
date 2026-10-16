'use client';

import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TooltipProps = {
  label: string;
  children: ReactNode;
  side?: 'top' | 'bottom';
  className?: string;
};

export function Tooltip({ label, children, side = 'top', className }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
        }
      }}
    >
      {children}
      <AnimatePresence>
        {open ? (
          <span
            className={cn(
              'pointer-events-none absolute inset-x-0 z-30 flex justify-center',
              side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2',
            )}
          >
            <motion.span
              role="tooltip"
              initial={{ opacity: 0, y: side === 'top' ? 4 : -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="whitespace-nowrap rounded-md border border-border bg-surface-alt px-2.5 py-1 font-mono text-xs text-text-primary shadow-lg"
            >
              {label}
            </motion.span>
          </span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
