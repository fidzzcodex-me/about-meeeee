import { faFile, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { SITE } from '@/lib/constants';
import { formatPhoneNumber } from '@/lib/utils';
import type { FileEntry, Profile, TerminalStep } from '@/types';

export const profile: Profile = {
  name: SITE.name,
  role: 'Developer',
  headline: 'Bot dan web yang jalan.',
  summary:
    'Developer bot WhatsApp, bot Telegram, dan web. Saya mengerjakan otomasi, scraping, dan integrasi API dari terminal sampai deploy.',
  philosophy: SITE.tagline,
  specialties: ['Bot WhatsApp', 'Telegram', 'Web'],
  languages: ['javascript', 'python', 'golang'],
};

const contactRecord = {
  github: SITE.github,
  whatsapp: formatPhoneNumber(SITE.whatsapp),
  ...(SITE.email ? { email: SITE.email } : {}),
};

export const terminalSteps: TerminalStep[] = [
  { command: 'whoami', output: [SITE.name] },
  {
    command: 'cat role.txt',
    output: ['Developer • Bot WhatsApp • Telegram'],
  },
  {
    command: 'ls skills/',
    output: [profile.languages.join('  ')],
  },
  {
    command: 'cat contact.json',
    output: JSON.stringify(contactRecord, null, 2).split('\n'),
    highlight: 'json',
  },
];

export const aboutFiles: FileEntry[] = [
  {
    id: 'whoami',
    name: 'whoami.md',
    language: 'markdown',
    icon: faFile,
    blocks: [
      { kind: 'heading', text: SITE.name },
      {
        kind: 'text',
        text: 'Developer yang fokus ke bot WhatsApp, bot Telegram, dan web.',
      },
      {
        kind: 'text',
        text: 'Saya mengerjakan otomasi dan integrasi yang jalan stabil: dari bot dengan banyak command, scraping data, sampai script yang menggantikan kerjaan berulang.',
      },
      {
        kind: 'list',
        items: [
          'Bahasa utama: JavaScript, Python, Golang',
          'Bot: Node.js dengan Baileys dan Telegraf',
          'Kerja dari terminal, kode disimpan di GitHub, web di-deploy ke Vercel',
        ],
      },
      { kind: 'quote', text: SITE.tagline },
    ],
  },
  {
    id: 'journey',
    name: 'journey.log',
    language: 'log',
    icon: faFileCode,
    blocks: [
      {
        kind: 'log',
        time: '2024',
        level: 'OK',
        text: 'Telegram Bot dirilis dengan Node.js dan Telegraf',
      },
      {
        kind: 'log',
        time: '2024',
        level: 'OK',
        text: 'WhatsApp Bot dirilis dengan Node.js dan Baileys',
      },
      {
        kind: 'log',
        time: '2024',
        level: 'OK',
        text: 'Alight Motion Website live',
      },
      {
        kind: 'log',
        time: 'now',
        level: 'INFO',
        text: 'Menerima project bot, web scraping, automation, dan integrasi API',
      },
    ],
  },
  {
    id: 'interests',
    name: 'interests.txt',
    language: 'text',
    icon: faFile,
    blocks: [
      { kind: 'heading', text: 'interests' },
      {
        kind: 'list',
        items: [
          'Bot WhatsApp dan Telegram',
          'Otomasi dan web scraping',
          'Integrasi API antar layanan',
          'Tooling command line',
          'Web yang cepat dan ringan',
        ],
      },
    ],
  },
];
