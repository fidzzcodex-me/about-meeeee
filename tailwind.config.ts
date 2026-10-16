import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/hooks/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        DEFAULT: '1200px',
      },
    },
    extend: {
      colors: {
        background: '#0D0D0D',
        surface: '#1A1A1A',
        'surface-alt': '#242424',
        border: '#2E2E2E',
        text: {
          primary: '#E8E8E8',
          muted: '#888888',
          dim: '#555555',
        },
        accent: {
          DEFAULT: '#4ADE80',
          alt: '#4A90E2',
        },
        warning: '#FBBF24',
        error: '#EF4444',
        cursor: '#4ADE80',
        traffic: {
          red: '#FF5F56',
          yellow: '#FFBD2E',
          green: '#27C93F',
        },
        syntax: {
          keyword: '#4ADE80',
          string: '#4A90E2',
          number: '#FBBF24',
          comment: '#555555',
          fn: '#E8E8E8',
        },
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: [
          'var(--font-jetbrains)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      borderRadius: {
        terminal: '8px',
      },
      spacing: {
        section: '80px',
        gutter: '24px',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
