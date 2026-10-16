'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faFolder } from '@fortawesome/free-solid-svg-icons';
import { Badge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GITHUB_URL } from '@/lib/constants';
import { EASE_SOFT } from '@/lib/motion';
import { isSafeExternalUrl } from '@/lib/utils';
import type { Project } from '@/types';

type CommitDetailProps = {
  project: Project;
};

export function CommitDetail({ project }: CommitDetailProps) {
  const liveUrl = project.url && isSafeExternalUrl(project.url) ? project.url : null;

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: EASE_SOFT }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent"
          >
            <FontAwesomeIcon icon={faFolder} />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-text-primary">{project.title}</h3>
            <p className="font-mono text-xs text-text-muted">
              {project.hash} · {project.date}
            </p>
          </div>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="leading-7 text-text-muted">{project.description}</p>

      <div>
        <p className="mb-2 font-mono text-xs text-text-muted">stack</p>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge tone="info">{item}</Badge>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-3">
        {liveUrl ? (
          <Button href={liveUrl} external icon={faArrowUpRightFromSquare}>
            Buka website
          </Button>
        ) : null}
        <Button href={GITHUB_URL} external variant="secondary" icon={faGithub}>
          GitHub
        </Button>
      </div>
    </motion.div>
  );
}
