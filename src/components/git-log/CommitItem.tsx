'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeCommit } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

type CommitItemProps = {
  project: Project;
  selected: boolean;
  onSelect: (id: string) => void;
};

export function CommitItem({ project, selected, onSelect }: CommitItemProps) {
  return (
    <div className="relative pl-10">
      <motion.span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-xs transition-colors duration-300',
          selected
            ? 'border-accent text-accent'
            : 'border-border text-text-muted',
        )}
        animate={{ scale: selected ? 1.12 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      >
        <FontAwesomeIcon icon={faCodeCommit} />
      </motion.span>

      <Card interactive selected={selected} className="p-0 sm:p-0">
        <button
          type="button"
          onClick={() => onSelect(project.id)}
          aria-pressed={selected}
          className="block w-full rounded-terminal p-4 text-left"
        >
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
            <span className="text-warning">commit {project.hash}</span>
            {project.isHead ? <Badge tone="accent">HEAD -&gt; main</Badge> : null}
          </span>
          <span className="mt-2 block font-semibold text-text-primary">
            {project.commitMessage}
          </span>
          <span className="mt-1 block font-mono text-xs text-text-muted">
            Author: {project.author} · Date: {project.date}
          </span>
          <span className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <Badge key={item} tone="neutral">
                {item}
              </Badge>
            ))}
          </span>
        </button>
      </Card>
    </div>
  );
}
