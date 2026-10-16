import { faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { GITHUB_URL, SITE } from '@/lib/constants';
import { buildWhatsAppUrl, formatPhoneNumber } from '@/lib/utils';
import type { SocialLink } from '@/types';

const baseSocials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: SITE.github,
    href: GITHUB_URL,
    icon: faGithub,
    copyValue: GITHUB_URL,
    external: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: formatPhoneNumber(SITE.whatsapp),
    href: buildWhatsAppUrl(
      SITE.whatsapp,
      `Halo ${SITE.name}, saya lihat portfolio kamu dan mau ngobrol soal project.`,
    ),
    icon: faWhatsapp,
    copyValue: `+${SITE.whatsapp}`,
    external: true,
  },
];

const emailSocial: SocialLink[] = SITE.email
  ? [
      {
        id: 'email',
        label: 'Email',
        handle: SITE.email,
        href: `mailto:${SITE.email}`,
        icon: faEnvelope,
        copyValue: SITE.email,
        external: false,
      },
    ]
  : [];

export const socials: SocialLink[] = [...baseSocials, ...emailSocial];

export const whatsappLink = buildWhatsAppUrl(
  SITE.whatsapp,
  `Halo ${SITE.name}, saya mau ngobrol soal project.`,
);
