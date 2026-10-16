import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TerminalLineProps = {
  kind?: 'command' | 'output' | 'comment';
  children: ReactNode;
  className?: string;
};

const PREFIX: Record<NonNullable<TerminalLineProps['kind']>, string> = {
  command: '$',
  output: '>',
  comment: '#',
};

const PREFIX_COLOR: Record<NonNullable<TerminalLineProps['kind']>, string> = {
  command: 'text-accent',
  output: 'text-text-primary',
  comment: 'text-text-muted',
};

const BODY_COLOR: Record<NonNullable<TerminalLineProps['kind']>, string> = {
  command: 'text-text-primary',
  output: 'text-text-primary',
  comment: 'text-text-muted italic',
};

export function TerminalLine({
  kind = 'output',
  children,
  className,
}: TerminalLineProps) {
  return (
    <div
      className={cn(
        'flex gap-2 font-mono text-[13px] leading-7 sm:text-sm',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('shrink-0 select-none', PREFIX_COLOR[kind])}
      >
        {PREFIX[kind]}
      </span>
      <div className={cn('min-w-0 whitespace-pre-wrap break-words', BODY_COLOR[kind])}>
        {children}
      </div>
    </div>
  );
}
