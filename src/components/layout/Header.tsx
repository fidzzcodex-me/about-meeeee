'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Container } from '@/components/layout/Container';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function LogoMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-7 w-7 shrink-0"
      fill="none"
    >
      <rect width="64" height="64" rx="14" fill="#1A1A1A" />
      <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" stroke="#2E2E2E" strokeWidth="3" />
      <path
        d="M19 22l14 10-14 10"
        stroke="#4ADE80"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M38 44h10" stroke="#4ADE80" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300',
        scrolled || menuOpen
          ? 'border-border bg-background/90 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#home"
          onClick={closeMenu}
          aria-label={`${SITE.name}, kembali ke atas`}
          className="flex items-center gap-2.5 rounded-md font-mono text-sm font-bold text-text-primary"
        >
          <LogoMark />
          <span>{SITE.name}</span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'relative block rounded-md px-3 py-2 font-mono text-sm transition-colors duration-200',
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-muted hover:text-text-primary',
                    )}
                  >
                    <span aria-hidden="true" className="text-accent/70">
                      ./
                    </span>
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition-colors hover:border-accent/60 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={menuOpen ? 'close' : 'open'}
              className="inline-flex"
              initial={{ opacity: 0, rotate: -80, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 80, scale: 0.7 }}
              transition={{ duration: 0.18, ease: EASE_SOFT }}
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </motion.span>
          </AnimatePresence>
        </button>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              key="menu-backdrop"
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="fixed inset-0 top-16 -z-10 bg-background/70 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
            />
            <motion.div
              key="menu-panel"
              id="mobile-menu"
              className="border-t border-border bg-background md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: EASE_SOFT }}
            >
              <nav aria-label="Navigasi mobile">
                <Container>
                  <ul className="py-3">
                    {NAV_ITEMS.map((item, index) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.04 * index, ease: EASE_SOFT }}
                      >
                        <a
                          href={`#${item.id}`}
                          onClick={closeMenu}
                          aria-current={activeId === item.id ? 'location' : undefined}
                          className={cn(
                            'flex min-h-12 items-center rounded-md px-3 font-mono text-base transition-colors',
                            activeId === item.id
                              ? 'bg-surface text-accent'
                              : 'text-text-muted hover:bg-surface hover:text-text-primary',
                          )}
                        >
                          <span aria-hidden="true" className="mr-2 text-accent/70">
                            $
                          </span>
                          {item.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </Container>
              </nav>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
