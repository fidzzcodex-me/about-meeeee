import { SITE } from '@/lib/constants';
import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'alight-motion-website',
    hash: 'a1b2c3d',
    title: 'Alight Motion Website',
    commitMessage: 'feat: Alight Motion Website',
    description:
      'Website proyek unggulan yang dibangun dengan JavaScript, HTML, dan CSS. Sudah live dan aktif.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    url: 'https://alightmotion.my-website.eu.cc',
    status: 'active',
    date: '2024',
    author: SITE.name,
    isHead: true,
  },
  {
    id: 'whatsapp-bot',
    hash: 'e4f5a6b',
    title: 'WhatsApp Bot',
    commitMessage: 'feat: WhatsApp Bot',
    description:
      'Bot WhatsApp berbasis Node.js dan Baileys untuk otomasi pesan dan command.',
    stack: ['Node.js', 'Baileys'],
    status: 'active',
    date: '2024',
    author: SITE.name,
  },
  {
    id: 'telegram-bot',
    hash: 'c7d8e9f',
    title: 'Telegram Bot',
    commitMessage: 'feat: Telegram Bot',
    description:
      'Bot Telegram berbasis Node.js dan Telegraf untuk otomasi dan command.',
    stack: ['Node.js', 'Telegraf'],
    status: 'active',
    date: '2024',
    author: SITE.name,
  },
];
