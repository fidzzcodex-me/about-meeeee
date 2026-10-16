'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CodeBlock } from '@/components/code-view/CodeBlock';
import { FadeIn } from '@/components/common/FadeIn';
import { SectionTitle } from '@/components/common/SectionTitle';
import { Section } from '@/components/layout/Section';
import { skillBlocks, skillsCode } from '@/data/skills';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';
import type { SkillKey } from '@/types';

export function Skills() {
  const [activeKey, setActiveKey] = useState<SkillKey | null>(null);
  const activeBlock = skillBlocks.find((block) => block.key === activeKey) ?? null;

  return (
    <Section id="skills">
      <FadeIn>
        <SectionTitle
          id="skills"
          index="02"
          path="skills"
          title="Yang saya pakai"
          description="Klik salah satu di outline untuk menyorot bagian terkait di skills.json."
        />
      </FadeIn>

      <div className="mt-12 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
        <FadeIn direction="right">
          <nav aria-label="Outline skills.json">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Outline
            </p>
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {skillBlocks.map((block) => {
                const active = block.key === activeKey;
                return (
                  <li key={block.key} className="lg:w-full">
                    <motion.button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setActiveKey(active ? null : block.key)}
                      className={cn(
                        'flex min-h-11 w-full items-center gap-3 rounded-md border px-3 font-mono text-sm transition-colors duration-200',
                        active
                          ? 'border-accent/60 bg-accent/10 text-accent'
                          : 'border-border bg-surface text-text-muted hover:border-accent/40 hover:text-text-primary',
                      )}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2, ease: EASE_SOFT }}
                    >
                      <FontAwesomeIcon icon={block.icon} fixedWidth />
                      <span>{block.label}</span>
                      <span className="ml-auto text-xs text-text-muted">{block.count}</span>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </FadeIn>

        <FadeIn delay={0.1}>
          <CodeBlock
            fileName="skills.json"
            code={skillsCode}
            highlight={activeBlock ? { start: activeBlock.start, end: activeBlock.end } : null}
          />
        </FadeIn>
      </div>
    </Section>
  );
}
