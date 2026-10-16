'use client';

import { motion } from 'framer-motion';
import { CommitItem } from '@/components/git-log/CommitItem';
import { EASE_SOFT } from '@/lib/motion';
import type { Project } from '@/types';

type GitLogProps = {
  projects: Project[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function GitLog({ projects, selectedId, onSelect }: GitLogProps) {
  return (
    <div className="relative">
      <motion.span
        aria-hidden="true"
        className="absolute bottom-8 left-3 top-8 w-px origin-top bg-border"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: EASE_SOFT }}
      />
      <ol className="space-y-4" aria-label="Riwayat commit project">
        {projects.map((project, index) => (
          <motion.li
            key={project.id}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 * index, ease: EASE_SOFT }}
          >
            <CommitItem
              project={project}
              selected={project.id === selectedId}
              onSelect={onSelect}
            />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
