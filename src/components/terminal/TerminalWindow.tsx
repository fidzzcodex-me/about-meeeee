import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TerminalWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  actions?: ReactNode;
};

export function TerminalWindow({
  title,
  children,
  className,
  bodyClassName,
  actions,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-terminal border border-border bg-surface shadow-[0_28px_70px_-36px_rgba(0,0,0,0.95)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface-alt/60 px-4 py-3">
        <div aria-hidden="true" className="flex shrink-0 gap-2">
          <span className="h-3 w-3 rounded-full bg-traffic-red" />
          <span className="h-3 w-3 rounded-full bg-traffic-yellow" />
          <span className="h-3 w-3 rounded-full bg-traffic-green" />
        </div>
        <p className="min-w-0 truncate font-mono text-xs text-text-muted">{title}</p>
        {actions ? <div className="ml-auto shrink-0">{actions}</div> : null}
      </div>
      <div className={cn('p-4 sm:p-6', bodyClassName)}>{children}</div>
    </div>
  );
}
