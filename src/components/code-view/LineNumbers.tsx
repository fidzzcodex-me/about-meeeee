import { cn } from '@/lib/utils';

type LineNumbersProps = {
  count: number;
  highlight?: { start: number; end: number } | null;
  className?: string;
};

export function LineNumbers({ count, highlight = null, className }: LineNumbersProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'select-none text-right font-mono text-[13px] leading-7 sm:text-sm',
        className,
      )}
    >
      {Array.from({ length: count }, (_, index) => {
        const active = highlight !== null && index >= highlight.start && index <= highlight.end;
        return (
          <span
            key={index}
            className={cn(
              'block transition-colors duration-300',
              active ? 'text-accent' : 'text-text-dim',
            )}
          >
            {index + 1}
          </span>
        );
      })}
    </div>
  );
}
