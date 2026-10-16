import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types';

type Tone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'error';

type BadgeProps = {
  children: ReactNode;
  tone?: Tone;
  icon?: IconDefinition;
  className?: string;
};

const TONES: Record<Tone, string> = {
  neutral: 'border-border bg-surface-alt text-text-muted',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  info: 'border-accent-alt/30 bg-accent-alt/10 text-accent-alt',
  success: 'border-accent/30 bg-accent/10 text-accent',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  error: 'border-error/30 bg-error/10 text-error',
};

export function Badge({ children, tone = 'neutral', icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-xs',
        TONES[tone],
        className,
      )}
    >
      {icon ? <FontAwesomeIcon icon={icon} className="text-[0.7rem]" /> : null}
      {children}
    </span>
  );
}

const STATUS_META: Record<
  ProjectStatus,
  { label: string; tone: Tone; icon: IconDefinition }
> = {
  active: { label: 'Active', tone: 'success', icon: faCircleCheck },
  wip: { label: 'In progress', tone: 'warning', icon: faCircleInfo },
  archived: { label: 'Archived', tone: 'neutral', icon: faCircleXmark },
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <Badge tone={meta.tone} icon={meta.icon}>
      {meta.label}
    </Badge>
  );
}
