import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type NavItem = {
  id: string;
  label: string;
};

export type SocialId = 'github' | 'whatsapp' | 'email';

export type SocialLink = {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
  icon: IconDefinition;
  copyValue: string;
  external: boolean;
};

export type ProjectStatus = 'active' | 'wip' | 'archived';

export type Project = {
  id: string;
  hash: string;
  title: string;
  commitMessage: string;
  description: string;
  stack: string[];
  url?: string;
  status: ProjectStatus;
  date: string;
  author: string;
  isHead?: boolean;
};

export type Service = {
  id: string;
  command: string;
  title: string;
  description: string;
  icon: IconDefinition;
  inquiry: string;
};

export type SkillsData = {
  languages: string[];
  specialties: string[];
  tools: string[];
  learning: string[];
};

export type SkillKey = keyof SkillsData;

export type SkillBlock = {
  key: SkillKey;
  label: string;
  icon: IconDefinition;
  count: number;
  start: number;
  end: number;
};

export type LogLevel = 'INFO' | 'OK' | 'WARN';

export type ContentBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'text'; text: string }
  | { kind: 'quote'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'log'; time: string; level: LogLevel; text: string };

export type FileEntry = {
  id: string;
  name: string;
  language: string;
  icon: IconDefinition;
  blocks: ContentBlock[];
};

export type TerminalStep = {
  command: string;
  output: string[];
  highlight?: 'json';
};

export type Profile = {
  name: string;
  role: string;
  headline: string;
  summary: string;
  philosophy: string;
  specialties: string[];
  languages: string[];
};
