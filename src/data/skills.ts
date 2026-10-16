import {
  faCloud,
  faCode,
  faMicrochip,
  faTerminal,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { SITE } from '@/lib/constants';
import type { SkillBlock, SkillKey, SkillsData } from '@/types';

export const skillsData: SkillsData = {
  languages: ['JavaScript', 'Python', 'Golang'],
  specialties: [
    'WhatsApp Bot',
    'Telegram Bot',
    'Web Scraping',
    'Automation',
    'API Integration',
  ],
  tools: ['Node.js', 'Baileys', 'Telegraf', 'Next.js', 'GitHub Actions', 'Vercel'],
  learning: ['Golang'],
};

const SKILL_META: Record<SkillKey, { label: string; icon: IconDefinition }> = {
  languages: { label: 'languages', icon: faCode },
  specialties: { label: 'specialties', icon: faMicrochip },
  tools: { label: 'tools', icon: faTerminal },
  learning: { label: 'learning', icon: faCloud },
};

const SKILL_KEYS: SkillKey[] = ['languages', 'specialties', 'tools', 'learning'];

export const skillsCode = JSON.stringify(
  { name: SITE.name, role: 'developer', ...skillsData },
  null,
  2,
);

function computeSkillBlocks(code: string): SkillBlock[] {
  const lines = code.split('\n');
  const keyLines = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => /^ {2}"[^"]+":/.test(line));

  const blocks: SkillBlock[] = [];

  for (const key of SKILL_KEYS) {
    const position = keyLines.findIndex(({ line }) =>
      line.startsWith(`  "${key}":`),
    );
    const current = keyLines[position];
    if (!current) {
      continue;
    }
    const next = keyLines[position + 1];
    const end = next ? next.index - 1 : lines.length - 2;
    blocks.push({
      key,
      label: SKILL_META[key].label,
      icon: SKILL_META[key].icon,
      count: skillsData[key].length,
      start: current.index,
      end,
    });
  }

  return blocks;
}

export const skillBlocks: SkillBlock[] = computeSkillBlocks(skillsCode);
