import dynamic from 'next/dynamic';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { GITHUB_URL, SITE } from '@/lib/constants';
import { escapeJsonLd } from '@/lib/utils';

const About = dynamic(() => import('@/components/sections/About').then((mod) => mod.About));
const Skills = dynamic(() => import('@/components/sections/Skills').then((mod) => mod.Skills));
const Projects = dynamic(() =>
  import('@/components/sections/Projects').then((mod) => mod.Projects),
);
const Services = dynamic(() =>
  import('@/components/sections/Services').then((mod) => mod.Services),
);
const Contact = dynamic(() => import('@/components/sections/Contact').then((mod) => mod.Contact));

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  jobTitle: 'Developer',
  description: SITE.description,
  sameAs: [GITHUB_URL],
  knowsAbout: [
    'JavaScript',
    'Python',
    'Golang',
    'WhatsApp bot',
    'Telegram bot',
    'Web scraping',
    'Automation',
    'API integration',
  ],
  ...(SITE.email ? { email: SITE.email } : {}),
};

export default function HomePage() {
  return (
    <>
      <ScrollIndicator />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(personJsonLd) }}
      />
    </>
  );
}
