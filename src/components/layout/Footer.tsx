'use client';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@/components/layout/Container';
import { SocialLinks } from '@/components/common/SocialLinks';
import { Button } from '@/components/ui/Button';
import { SITE } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-10">
      <Container className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm text-text-primary">
            <span suppressHydrationWarning>© {year}</span> {SITE.name}
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Dibangun dengan Next.js, Tailwind CSS, dan Framer Motion.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <SocialLinks />
          <Button href="#home" variant="ghost" icon={faArrowUp} aria-label="Kembali ke atas" />
        </div>
      </Container>
    </footer>
  );
}
