'use client';

import type { MouseEventHandler, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { EASE_SOFT } from '@/lib/motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconDefinition;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

type ActionProps = BaseProps & {
  href?: undefined;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = LinkProps | ActionProps;

const BASE =
  'inline-flex select-none items-center justify-center gap-2 rounded-md border font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50';

const VARIANTS: Record<Variant, string> = {
  primary:
    'border-accent bg-accent text-background hover:bg-accent/90 hover:border-accent/90',
  secondary:
    'border-border bg-surface text-text-primary hover:border-accent/60 hover:bg-surface-alt',
  ghost:
    'border-transparent bg-transparent text-text-muted hover:bg-surface-alt hover:text-text-primary',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 min-w-9 px-3 text-sm',
  md: 'h-11 min-w-11 px-5 text-sm',
  lg: 'h-12 min-w-12 px-6 text-base',
};

function isLink(props: ButtonProps): props is LinkProps {
  return typeof props.href === 'string';
}

type ButtonContentProps = {
  icon?: IconDefinition;
  iconPosition: 'left' | 'right';
  loading: boolean;
  children?: ReactNode;
};

function ButtonContent({
  icon,
  iconPosition,
  loading,
  children,
}: ButtonContentProps) {
  const iconKey = loading ? 'spinner' : (icon?.iconName ?? '');
  const iconNode =
    loading || icon ? (
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={iconKey}
          aria-hidden="true"
          className="inline-flex"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18, ease: EASE_SOFT }}
        >
          {loading ? (
            <motion.span
              className="inline-flex"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            >
              <FontAwesomeIcon icon={faSpinner} />
            </motion.span>
          ) : icon ? (
            <FontAwesomeIcon icon={icon} />
          ) : null}
        </motion.span>
      </AnimatePresence>
    ) : null;

  return (
    <>
      {iconPosition === 'left' ? iconNode : null}
      {children !== undefined && children !== null ? <span>{children}</span> : null}
      {iconPosition === 'right' ? iconNode : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    className,
    children,
  } = props;

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);
  const transition = { duration: 0.2, ease: EASE_SOFT };

  const content = (
    <ButtonContent icon={icon} iconPosition={iconPosition} loading={loading}>
      {children}
    </ButtonContent>
  );

  if (isLink(props)) {
    const external = props.external ?? false;
    return (
      <motion.a
        href={props.href}
        className={classes}
        onClick={props.onClick}
        aria-label={props['aria-label']}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={transition}
      >
        {content}
        {external ? <span className="sr-only"> (buka di tab baru)</span> : null}
      </motion.a>
    );
  }

  const disabled = Boolean(props.disabled) || loading;

  return (
    <motion.button
      type={props.type ?? 'button'}
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      aria-label={props['aria-label']}
      onClick={props.onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={transition}
    >
      {content}
    </motion.button>
  );
}
