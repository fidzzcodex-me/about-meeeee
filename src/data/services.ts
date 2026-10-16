import { faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faCloud, faDatabase, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { SITE } from '@/lib/constants';
import type { Service } from '@/types';

function inquiry(title: string): string {
  return `Halo ${SITE.name}, saya mau tanya soal ${title}.`;
}

export const services: Service[] = [
  {
    id: 'whatsapp-bot',
    command: 'wa-bot --create',
    title: 'WhatsApp Bot Development',
    description: 'Bot WhatsApp custom berbasis Node.js dan Baileys sesuai kebutuhan.',
    icon: faWhatsapp,
    inquiry: inquiry('WhatsApp Bot Development'),
  },
  {
    id: 'telegram-bot',
    command: 'tg-bot --create',
    title: 'Telegram Bot Development',
    description: 'Bot Telegram berbasis Node.js dan Telegraf dengan command yang rapi.',
    icon: faTelegram,
    inquiry: inquiry('Telegram Bot Development'),
  },
  {
    id: 'web-scraping',
    command: 'scrape --target',
    title: 'Web Scraping',
    description: 'Ambil data dari web secara otomatis, terstruktur, dan siap dipakai.',
    icon: faDatabase,
    inquiry: inquiry('Web Scraping'),
  },
  {
    id: 'automation',
    command: 'automate --run',
    title: 'Automation Script',
    description: 'Script otomasi untuk menggantikan pekerjaan manual yang berulang.',
    icon: faMicrochip,
    inquiry: inquiry('Automation Script'),
  },
  {
    id: 'api-integration',
    command: 'api --integrate',
    title: 'API Integration',
    description: 'Hubungkan layanan satu dengan yang lain lewat REST API.',
    icon: faCloud,
    inquiry: inquiry('API Integration'),
  },
];
