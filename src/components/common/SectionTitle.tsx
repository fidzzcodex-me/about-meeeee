'use client';

import { motion } from 'framer-motion';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

type SectionTitleProps = {
  id: string;
  index: string;
  path: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionTitle({
  id,
  index,
  path,
  title,
  description,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <p className="flex items-center gap-3 font-mono text-sm text-accent">
        <span aria-hidden="true" className="text-text-muted">
          {index}
        </span>
        <span>
          <span aria-hidden="true">$ </span>cd ~/{path}
        </span>
      </p>
      <h2
        id={`${id}-title`}
        className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
      >
        {title}
      </h2>
      <motion.span
        aria-hidden="true"
        className="mt-4 block h-px w-16 origin-left bg-accent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE_SOFT }}
      />
      {description ? (
        <p className="mt-4 text-base leading-7 text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}
