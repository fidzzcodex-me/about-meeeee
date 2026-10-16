import type { ReactNode } from 'react';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/utils';

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('relative scroll-mt-20 py-section', className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
