'use client';

import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode } from '@fortawesome/free-solid-svg-icons';
import { HighlightedLine } from '@/components/code-view/SyntaxHighlight';
import { LineNumbers } from '@/components/code-view/LineNumbers';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
  fileName: string;
  code: string;
  language?: string;
  highlight?: { start: number; end: number } | null;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_SOFT } },
};

export function CodeBlock({
  fileName,
  code,
  language = 'JSON',
  highlight = null,
}: CodeBlockProps) {
  const lines = useMemo(() => code.split('\n'), [code]);

  return (
    <figure className="overflow-hidden rounded-terminal border border-border bg-surface shadow-[0_28px_70px_-36px_rgba(0,0,0,0.95)]">
      <figcaption className="flex items-end border-b border-border bg-surface-alt/60">
        <div className="flex items-center gap-2 border-r border-t-2 border-border border-t-accent bg-surface px-4 py-2.5 font-mono text-xs text-text-primary">
          <FontAwesomeIcon icon={faFileCode} className="text-accent" />
          {fileName}
        </div>
      </figcaption>

      <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 overflow-x-auto p-4 sm:gap-5 sm:p-5">
        <LineNumbers count={lines.length} highlight={highlight} />
        <motion.pre
          className="m-0 overflow-x-auto font-mono text-[13px] leading-7 sm:text-sm"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <code className="block">
            {lines.map((line, index) => {
              const inRange =
                highlight !== null && index >= highlight.start && index <= highlight.end;
              const dimmed = highlight !== null && !inRange;
              return (
                <motion.span key={index} variants={lineVariants} className="block">
                  <motion.span
                    className={cn(
                      '-mx-2 block rounded-sm px-2 transition-colors duration-300',
                      inRange && 'bg-accent/10',
                    )}
                    initial={false}
                    animate={{ opacity: dimmed ? 0.35 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HighlightedLine line={line} />
                  </motion.span>
                </motion.span>
              );
            })}
          </code>
        </motion.pre>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-surface-alt/40 px-4 py-2 font-mono text-xs text-text-muted">
        <span>{language}</span>
        <span>
          UTF-8 · {lines.length} baris
        </span>
      </div>
    </figure>
  );
}
