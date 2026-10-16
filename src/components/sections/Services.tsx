'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FadeIn } from '@/components/common/FadeIn';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Section } from '@/components/layout/Section';
import { TerminalLine } from '@/components/terminal/TerminalLine';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { Button } from '@/components/ui/Button';
import { services } from '@/data/services';
import { SITE } from '@/lib/constants';
import { EASE_SOFT } from '@/lib/motion';
import { buildWhatsAppUrl } from '@/lib/utils';

export function Services() {
  return (
    <Section id="services">
      <FadeIn>
        <SectionTitle
          id="services"
          index="04"
          path="services"
          title="Yang bisa saya kerjakan"
          description="Pilih salah satu untuk langsung tanya lewat WhatsApp dengan pesan yang sudah terisi."
        />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <TerminalWindow title={`services — ~/${SITE.name}`}>
          <TerminalPrompt command="ls services/ --long" path="~/services" className="mb-4" />
          <ul className="space-y-1">
            {services.map((service, index) => (
              <motion.li
                key={service.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: 0.07 * index, ease: EASE_SOFT }}
              >
                <motion.a
                  href={buildWhatsAppUrl(SITE.whatsapp, service.inquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tanya soal ${service.title} lewat WhatsApp (buka di tab baru)`}
                  className="group flex items-start gap-4 rounded-md border border-transparent px-3 py-4 transition-colors duration-200 hover:border-border hover:bg-surface-alt/60"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: EASE_SOFT }}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-accent transition-colors duration-200 group-hover:border-accent/60"
                  >
                    <FontAwesomeIcon icon={service.icon} className="text-lg" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs text-accent">
                      <span aria-hidden="true">$ </span>
                      {service.command}
                    </span>
                    <span className="mt-1 block font-semibold text-text-primary">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-text-muted">
                      {service.description}
                    </span>
                  </span>
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-text-muted transition-colors duration-200 group-hover:text-accent"
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <TerminalLine kind="comment">Nggak ada di daftar? Tanya aja.</TerminalLine>
            <Button href="#contact" variant="secondary">
              Lihat kontak
            </Button>
          </div>
        </TerminalWindow>
      </FadeIn>
    </Section>
  );
}
