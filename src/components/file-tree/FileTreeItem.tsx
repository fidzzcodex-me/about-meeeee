'use client';

import type { KeyboardEventHandler } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cn } from '@/lib/utils';
import type { FileEntry } from '@/types';

export const FILE_PANEL_ID = 'about-file-panel';

export function getFileTabId(id: string): string {
  return `about-file-tab-${id}`;
}

type FileTreeItemProps = {
  file: FileEntry;
  active: boolean;
  onSelect: (id: string) => void;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
};

export function FileTreeItem({ file, active, onSelect, onKeyDown }: FileTreeItemProps) {
  return (
    <button
      type="button"
      role="tab"
      id={getFileTabId(file.id)}
      aria-selected={active}
      aria-controls={FILE_PANEL_ID}
      tabIndex={active ? 0 : -1}
      onClick={() => onSelect(file.id)}
      onKeyDown={onKeyDown}
      className={cn(
        'relative flex min-h-11 w-full items-center gap-3 rounded-md px-3 text-left font-mono text-sm transition-colors duration-200',
        active
          ? 'text-text-primary'
          : 'text-text-muted hover:bg-surface-alt/60 hover:text-text-primary',
      )}
    >
      {active ? (
        <motion.span
          layoutId="file-tree-active"
          aria-hidden="true"
          className="absolute inset-0 rounded-md border border-border bg-surface-alt"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      ) : null}
      {active ? (
        <motion.span
          layoutId="file-tree-bar"
          aria-hidden="true"
          className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent"
          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        />
      ) : null}
      <FontAwesomeIcon
        icon={file.icon}
        className={cn('relative shrink-0', active ? 'text-accent' : 'text-text-muted')}
        fixedWidth
      />
      <span className="relative truncate">{file.name}</span>
    </button>
  );
}
