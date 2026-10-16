import type { NavItem } from '@/types';

const DEFAULT_SITE_URL = 'https://fidzzcodex.my.id';
const DEFAULT_GITHUB = 'fidzzcodex-me';
const DEFAULT_WHATSAPP = '628976386328';
const EMAIL_PATTERN = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;
const GITHUB_PATTERN = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;

function readEnv(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function normalizeSiteUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      return DEFAULT_SITE_URL;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function normalizeGithub(value: string): string {
  return GITHUB_PATTERN.test(value) ? value : DEFAULT_GITHUB;
}

function normalizeWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15 ? digits : DEFAULT_WHATSAPP;
}

function normalizeEmail(value: string): string {
  return EMAIL_PATTERN.test(value) ? value : '';
}

export const SITE = {
  url: normalizeSiteUrl(readEnv(process.env.NEXT_PUBLIC_SITE_URL, DEFAULT_SITE_URL)),
  name: readEnv(process.env.NEXT_PUBLIC_SITE_NAME, 'fidzzcodex'),
  github: normalizeGithub(
    readEnv(process.env.NEXT_PUBLIC_GITHUB_USERNAME, DEFAULT_GITHUB),
  ),
  whatsapp: normalizeWhatsApp(
    readEnv(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, DEFAULT_WHATSAPP),
  ),
  email: normalizeEmail(readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL, '')),
  title: 'fidzzcodex — Developer Bot WhatsApp, Telegram, dan Web',
  description:
    'Portfolio fidzzcodex, developer bot WhatsApp, bot Telegram, dan web. Menerima project bot, web scraping, automation script, dan integrasi API.',
  tagline: 'Code speaks louder than words.',
} as const;

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'services', label: 'services' },
  { id: 'contact', label: 'contact' },
];

export const GITHUB_URL = `https://github.com/${SITE.github}`;
