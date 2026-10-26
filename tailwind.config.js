/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'var(--ink)',
          dark: 'var(--ink-dark)',
          surface: 'var(--ink-surface)',
        },
        theme: {
          bg: 'var(--theme-bg)',
          surface: 'var(--theme-surface)',
          'surface-subtle': 'var(--theme-surface-subtle)',
          text: 'var(--theme-text)',
          'text-muted': 'var(--theme-text-muted)',
        },
        paper: {
          DEFAULT: 'var(--paper)',
          bone: 'var(--bone)',
        },
        vermilion: {
          DEFAULT: 'var(--vermilion)',
          light: 'var(--vermilion-light)',
        },
        verdigris: {
          DEFAULT: 'var(--verdigris)',
          light: 'var(--verdigris-light)',
        },
        ochre: {
          DEFAULT: 'var(--ochre)',
          light: 'var(--ochre-light)',
        },
        indigo: {
          DEFAULT: 'var(--indigo)',
          light: 'var(--indigo-light)',
        },
        slate: {
          DEFAULT: 'var(--slate)',
          light: 'var(--slate-light)',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Noto Serif Devanagari', 'serif'],
        sans: ['Geist Sans', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        devanagariDisplay: ['Noto Serif Devanagari', 'serif'],
        devanagariSans: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(12, 12, 11, 0.05)',
        'lifted': '0 4px 12px 0 rgba(12, 12, 11, 0.08)',
        'floating': '0 12px 32px 0 rgba(12, 12, 11, 0.12)',
      },
      borderColor: {
        hairline: 'var(--hairline)',
      }
    },
  },
  plugins: [],
}
