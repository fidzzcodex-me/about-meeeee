'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@/components/ui/Tooltip';
import { socials } from '@/data/socials';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

type SocialLinksProps = {
  className?: string;
};

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-3', className)} aria-label="Tautan sosial">
      {socials.map((social) => (
        <li key={social.id}>
          <Tooltip label={`${social.label}: ${social.handle}`}>
            <motion.a
              href={social.href}
              target={social.external ? '_blank' : undefined}
              rel={social.external ? 'noopener noreferrer' : undefined}
              aria-label={
                social.external ? `${social.label} (buka di tab baru)` : social.label
              }
              className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-text-muted transition-colors duration-200 hover:border-accent/60 hover:text-accent"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2, ease: EASE_SOFT }}
            >
              <FontAwesomeIcon icon={social.icon} className="text-lg" />
            </motion.a>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
