'use client';

import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { useTypingEffect } from '@/hooks/useTypingEffect';
import { cn } from '@/lib/utils';

type TypingEffectProps = {
  text: string;
  speed?: number;
  enabled?: boolean;
  showCursor?: boolean;
  onDone?: () => void;
  className?: string;
};

export function TypingEffect({
  text,
  speed = 50,
  enabled = true,
  showCursor = false,
  onDone,
  className,
}: TypingEffectProps) {
  const { displayed } = useTypingEffect(text, { speed, enabled, onDone });
  const rest = text.slice(displayed.length);

  return (
    <span className={cn('whitespace-pre', className)}>
      <span>{displayed}</span>
      {showCursor ? <BlinkingCursor className="ml-px" /> : null}
      <span aria-hidden="true" className="invisible">
        {rest}
      </span>
    </span>
  );
}
