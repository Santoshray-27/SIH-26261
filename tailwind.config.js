/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg)',
          elevated: 'var(--bg-elevated)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
        },
        tint: {
          teal: 'var(--tint-teal)',
          clay: 'var(--tint-clay)',
          indigo: 'var(--tint-indigo)',
          ochre: 'var(--tint-ochre)',
        },
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          subtle: 'var(--text-subtle)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
          control: 'var(--control-border)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          contrast: 'var(--accent-contrast)',
          2: 'var(--accent-2)',
          '2-contrast': 'var(--accent-2-contrast)',
        },
        st: {
          pass: 'var(--st-pass)',
          'pass-bg': 'var(--st-pass-bg)',
          'pass-border': 'var(--st-pass-border)',
          'pass-fg': 'var(--st-pass-fg)',
          deficiency: 'var(--st-deficiency)',
          'deficiency-bg': 'var(--st-deficiency-bg)',
          'deficiency-border': 'var(--st-deficiency-border)',
          'deficiency-fg': 'var(--st-deficiency-fg)',
          review: 'var(--st-review)',
          'review-bg': 'var(--st-review-bg)',
          'review-border': 'var(--st-review-border)',
          'review-fg': 'var(--st-review-fg)',
          structure: 'var(--st-structure)',
          'structure-bg': 'var(--st-structure-bg)',
          'structure-border': 'var(--st-structure-border)',
          'structure-fg': 'var(--st-structure-fg)',
          unavailable: 'var(--st-unavailable)',
          'unavailable-bg': 'var(--st-unavailable-bg)',
          'unavailable-border': 'var(--st-unavailable-border)',
          'unavailable-fg': 'var(--st-unavailable-fg)',
        },
        // Backwards compatibility mappings to semantic tokens
        ink: {
          DEFAULT: 'var(--text)',
          dark: 'var(--bg)',
          surface: 'var(--surface)',
        },
        paper: {
          DEFAULT: 'var(--bg)',
          bone: 'var(--surface-2)',
        },
        bone: 'var(--surface-2)',
        vermilion: {
          DEFAULT: 'var(--st-deficiency)',
          light: 'var(--st-deficiency-bg)',
        },
        verdigris: {
          DEFAULT: 'var(--st-pass)',
          light: 'var(--st-pass-bg)',
        },
        ochre: {
          DEFAULT: 'var(--st-review)',
          light: 'var(--st-review-bg)',
        },
        indigo: {
          DEFAULT: 'var(--st-structure)',
          light: 'var(--st-structure-bg)',
        },
        slate: {
          DEFAULT: 'var(--text-muted)',
          light: 'var(--bg-elevated)',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        serif: ['var(--font-heading)'],
        display: ['var(--font-heading)'],
        mono: ['var(--font-mono)'],
        devanagariDisplay: ['Noto Serif Devanagari', 'var(--font-heading)'],
        devanagariSans: ['Noto Sans Devanagari', 'var(--font-body)'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(31, 43, 61, 0.05)',
        'lifted': '0 4px 12px 0 rgba(31, 43, 61, 0.08)',
        'floating': '0 12px 28px 0 rgba(31, 43, 61, 0.12)',
      },
      borderColor: {
        hairline: 'var(--border)',
      }
    },
  },
  plugins: [],
}
