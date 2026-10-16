'use client';

import { useState } from 'react';
import { FadeIn } from '@/components/common/FadeIn';
import { SectionTitle } from '@/components/common/SectionTitle';
import { FileContent } from '@/components/file-tree/FileContent';
import { FileTree } from '@/components/file-tree/FileTree';
import { Section } from '@/components/layout/Section';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { aboutFiles } from '@/data/profile';
import { SITE } from '@/lib/constants';

export function About() {
  const [activeId, setActiveId] = useState<string>(aboutFiles[0]?.id ?? '');
  const activeFile = aboutFiles.find((file) => file.id === activeId) ?? aboutFiles[0];

  if (!activeFile) {
    return null;
  }

  return (
    <Section id="about">
      <FadeIn>
        <SectionTitle
          id="about"
          index="01"
          path="about"
          title="Sedikit tentang saya"
          description="Buka file di explorer untuk lihat siapa saya, perjalanannya, dan apa yang saya suka."
        />
      </FadeIn>

      <FadeIn delay={0.1} className="mt-12">
        <TerminalWindow title={`explorer — ~/${SITE.name}`} bodyClassName="p-0">
          <div className="grid lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="border-b border-border bg-background/40 p-3 lg:border-b-0 lg:border-r">
              <FileTree files={aboutFiles} activeId={activeFile.id} onSelect={setActiveId} />
            </aside>
            <FileContent file={activeFile} />
          </div>
        </TerminalWindow>
      </FadeIn>
    </Section>
  );
}
