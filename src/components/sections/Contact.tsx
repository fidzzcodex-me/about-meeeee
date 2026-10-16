'use client';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faCheck,
  faCircleXmark,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import { FadeIn } from '@/components/common/FadeIn';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Section } from '@/components/layout/Section';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import { socials, whatsappLink } from '@/data/socials';
import { useClipboard } from '@/hooks/useClipboard';
import { SITE } from '@/lib/constants';
import type { SocialLink } from '@/types';

function ContactRow({ social, index }: { social: SocialLink; index: number }) {
  const { copy, copied, failed } = useClipboard();
  const tooltip = failed ? 'Gagal menyalin' : copied ? 'Tersalin' : `Salin ${social.label}`;

  return (
    <li>
      <FadeIn delay={0.08 * index} amount={0.5}>
        <Card interactive className="p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent"
            >
              <FontAwesomeIcon icon={social.icon} className="text-lg" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-xs text-text-muted">{social.label}</p>
              <p className="truncate font-mono text-sm text-text-primary">{social.handle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Tooltip label={tooltip}>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={failed ? faCircleXmark : copied ? faCheck : faCopy}
                  aria-label={`Salin ${social.label}`}
                  onClick={() => {
                    void copy(social.copyValue);
                  }}
                />
              </Tooltip>
              <Button
                size="sm"
                variant="ghost"
                href={social.href}
                external={social.external}
                icon={faArrowUpRightFromSquare}
                aria-label={`Buka ${social.label}`}
              />
            </div>
          </div>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? `${social.label} tersalin` : failed ? 'Gagal menyalin' : ''}
          </span>
        </Card>
      </FadeIn>
    </li>
  );
}

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
        <FadeIn>
          <SectionTitle
            id="contact"
            index="05"
            path="contact"
            title="Ayo bikin sesuatu yang jalan."
            description="Punya ide bot, scraping, atau integrasi API? Kirim pesan, ceritakan kebutuhannya, dan kita bahas dari sana."
          />
          <div className="mt-8">
            <Button href={whatsappLink} external size="lg" icon={faWhatsapp}>
              Chat via WhatsApp
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.1} direction="left">
          <TerminalWindow title={`contact — ~/${SITE.name}`}>
            <TerminalPrompt command="contact --all" path="~/contact" cursor className="mb-4" />
            <ul className="space-y-3">
              {socials.map((social, index) => (
                <ContactRow key={social.id} social={social} index={index} />
              ))}
            </ul>
          </TerminalWindow>
        </FadeIn>
      </div>
    </Section>
  );
}
