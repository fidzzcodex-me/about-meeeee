'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { SocialLinks } from '@/components/common/SocialLinks';
import { HighlightedLine } from '@/components/code-view/SyntaxHighlight';
import { Container } from '@/components/layout/Container';
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { TerminalLine } from '@/components/terminal/TerminalLine';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TypingEffect } from '@/components/terminal/TypingEffect';
import { Button } from '@/components/ui/Button';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { profile, terminalSteps } from '@/data/profile';
import { whatsappLink } from '@/data/socials';
import { SITE } from '@/lib/constants';
import { EASE_SOFT, fadeUpItem, staggerContainer } from '@/lib/motion';

type Stage = 'typing' | 'output' | 'done';

function TerminalSession() {
  const reduced = useReducedMotion();
  const lastIndex = terminalSteps.length - 1;
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState<Stage>('typing');

  useEffect(() => {
    if (reduced) {
      setStep(lastIndex);
      setStage('done');
    }
  }, [reduced, lastIndex]);

  useEffect(() => {
    if (stage !== 'output') {
      return;
    }
    const timer = setTimeout(() => {
      if (step >= lastIndex) {
        setStage('done');
      } else {
        setStep((current) => current + 1);
        setStage('typing');
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [stage, step, lastIndex]);

  const handleTyped = useCallback(() => {
    setStage((current) => (current === 'typing' ? 'output' : current));
  }, []);

  return (
    <div className="space-y-3">
      {terminalSteps.map((item, index) => {
        const started = index <= step;
        const typingNow = index === step && stage === 'typing';
        const showOutput = index < step || (index === step && stage !== 'typing');

        return (
          <div key={item.command}>
            <TerminalLine kind="command">
              <TypingEffect
                text={item.command}
                enabled={started}
                showCursor={typingNow}
                onDone={index === step ? handleTyped : undefined}
              />
            </TerminalLine>
            <motion.div
              initial={false}
              animate={{ opacity: showOutput ? 1 : 0, y: showOutput ? 0 : 6 }}
              transition={{ duration: 0.35, ease: EASE_SOFT }}
            >
              {item.output.map((line, lineIndex) => (
                <TerminalLine key={`${item.command}-${lineIndex}`} kind="output">
                  {item.highlight === 'json' ? <HighlightedLine line={line} /> : line}
                </TerminalLine>
              ))}
            </motion.div>
          </div>
        );
      })}
      <TerminalLine kind="command">
        <span className={stage === 'done' ? undefined : 'invisible'}>
          <BlinkingCursor />
        </span>
      </TerminalLine>
    </div>
  );
}

function Ambient() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-1/2 top-[22%] -translate-x-1/2 lg:left-[72%] lg:top-1/2 lg:-translate-y-1/2">
        <motion.div
          className="h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.14)_0%,rgba(74,222,128,0)_68%)] will-change-transform"
          animate={
            reduced
              ? undefined
              : { x: [0, 36, -24, 0], y: [0, -28, 22, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pt-32"
    >
      <Ambient />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={fadeUpItem}
              className="font-mono text-sm text-accent"
            >
              {SITE.name}@portfolio:~$
            </motion.p>
            <motion.h1
              id="hero-title"
              variants={fadeUpItem}
              className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-5xl lg:text-6xl"
            >
              Bot dan web yang <span className="text-accent">jalan.</span>
            </motion.h1>
            <motion.p
              variants={fadeUpItem}
              className="mt-5 max-w-xl text-base leading-7 text-text-muted sm:text-lg"
            >
              {profile.summary}
            </motion.p>
            <motion.p
              variants={fadeUpItem}
              className="mt-3 font-mono text-sm text-text-muted"
            >
              {profile.philosophy}
            </motion.p>
            <motion.div variants={fadeUpItem} className="mt-8 flex flex-wrap gap-3">
              <Button href="#projects" size="lg" icon={faArrowRight} iconPosition="right">
                Lihat Project
              </Button>
              <Button
                href={whatsappLink}
                external
                size="lg"
                variant="secondary"
                icon={faWhatsapp}
              >
                Hubungi Saya
              </Button>
            </motion.div>
            <motion.div variants={fadeUpItem} className="mt-8">
              <SocialLinks />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE_SOFT }}
          >
            <p className="sr-only">
              {SITE.name}, {profile.role}. Spesialisasi: {profile.specialties.join(', ')}.
              Bahasa: {profile.languages.join(', ')}.
            </p>
            <div aria-hidden="true">
              <TerminalWindow title={`terminal — ${SITE.name}`} bodyClassName="p-5 sm:p-6">
                <TerminalSession />
              </TerminalWindow>
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <ScrollIndicator variant="hint" targetId="about" />
      </div>
    </section>
  );
}
