import type { ReactNode } from 'react';
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

type TerminalPromptProps = {
  command: string;
  path?: string;
  cursor?: boolean;
  className?: string;
  children?: ReactNode;
};

export function TerminalPrompt({
  command,
  path = '~',
  cursor = false,
  className,
  children,
}: TerminalPromptProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 font-mono text-[13px] leading-7 sm:text-sm',
        className,
      )}
    >
      <span className="text-accent">{SITE.name}@portfolio</span>
      <span className="text-accent-alt">:{path}</span>
      <span aria-hidden="true" className="text-text-muted">
        $
      </span>
      <span className="text-text-primary">{command}</span>
      {cursor ? <BlinkingCursor /> : null}
      {children}
    </div>
  );
}
