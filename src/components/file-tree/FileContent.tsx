'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FILE_PANEL_ID, getFileTabId } from '@/components/file-tree/FileTreeItem';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { ContentBlock, FileEntry, LogLevel } from '@/types';

const LEVEL_CLASS: Record<LogLevel, string> = {
  INFO: 'text-accent-alt',
  OK: 'text-accent',
  WARN: 'text-warning',
};

function Block({ block }: { block: ContentBlock }) {
  switch (block.kind) {
    case 'heading':
      return (
        <h3 className="font-mono text-lg font-bold text-accent">
          <span aria-hidden="true"># </span>
          {block.text}
        </h3>
      );
    case 'text':
      return <p className="leading-7 text-text-primary">{block.text}</p>;
    case 'quote':
      return (
        <blockquote className="border-l-2 border-accent pl-4 font-mono text-sm italic text-text-muted">
          {block.text}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-7 text-text-primary">
              <span aria-hidden="true" className="select-none font-mono text-accent">
                -
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'log':
      return (
        <p className="flex flex-wrap gap-x-3 font-mono text-sm leading-7">
          <span className="text-text-muted">{block.time}</span>
          <span className={LEVEL_CLASS[block.level]}>[{block.level}]</span>
          <span className="min-w-0 text-text-primary">{block.text}</span>
        </p>
      );
    default:
      return null;
  }
}

type FileContentProps = {
  file: FileEntry;
  className?: string;
};

export function FileContent({ file, className }: FileContentProps) {
  return (
    <div className={cn('flex min-w-0 flex-col', className)}>
      <div className="flex items-center gap-2 border-b border-border bg-surface-alt/50 px-4 py-2.5 font-mono text-xs text-text-muted">
        <FontAwesomeIcon icon={file.icon} className="text-accent" fixedWidth />
        <span className="truncate text-text-primary">{file.name}</span>
        <span className="ml-auto shrink-0">{file.language} · UTF-8</span>
      </div>

      <div
        id={FILE_PANEL_ID}
        role="tabpanel"
        aria-labelledby={getFileTabId(file.id)}
        tabIndex={0}
        className="min-h-[22rem] p-5 sm:p-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={file.id}
            className="space-y-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: EASE_SOFT }}
          >
            {file.blocks.map((block, index) => (
              <motion.div
                key={`${file.id}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * index, ease: EASE_SOFT }}
              >
                <Block block={block} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
