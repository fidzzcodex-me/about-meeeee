'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/common/FadeIn';
import { SectionTitle } from '@/components/common/SectionTitle';
import { CommitDetail } from '@/components/git-log/CommitDetail';
import { GitLog } from '@/components/git-log/GitLog';
import { Section } from '@/components/layout/Section';
import { TerminalPrompt } from '@/components/terminal/TerminalPrompt';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { Modal } from '@/components/ui/Modal';
import { projects } from '@/data/projects';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Projects() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [selectedId, setSelectedId] = useState<string>(projects[0]?.id ?? '');
  const [modalOpen, setModalOpen] = useState(false);
  const selected = projects.find((project) => project.id === selectedId) ?? projects[0];

  if (!selected) {
    return null;
  }

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (!isDesktop) {
      setModalOpen(true);
    }
  };

  return (
    <Section id="projects">
      <FadeIn>
        <SectionTitle
          id="projects"
          index="03"
          path="projects"
          title="Yang sudah saya kirim"
          description="Riwayat project dalam format git log. Klik commit untuk lihat detailnya."
        />
      </FadeIn>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        <div>
          <FadeIn>
            <TerminalPrompt command="git log --oneline" className="mb-5" />
          </FadeIn>
          <GitLog projects={projects} selectedId={selected.id} onSelect={handleSelect} />
        </div>

        <div className="hidden lg:block">
          <FadeIn direction="left" className="sticky top-24">
            <TerminalWindow title={`git show ${selected.hash}`} bodyClassName="min-h-[22rem] p-6">
              <AnimatePresence mode="wait" initial={false}>
                <CommitDetail key={selected.id} project={selected} />
              </AnimatePresence>
            </TerminalWindow>
          </FadeIn>
        </div>
      </div>

      <Modal
        open={modalOpen && !isDesktop}
        onClose={() => setModalOpen(false)}
        title={`git show ${selected.hash}`}
      >
        <CommitDetail project={selected} />
      </Modal>
    </Section>
  );
}
