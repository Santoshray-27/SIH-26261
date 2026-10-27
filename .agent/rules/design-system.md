---
trigger: always_on
---

# Pramāṇa — Design System (always follow)

## Concept: "Forensic Editorial" (Sandstone & Teal)
Government-grade trust x printed gazette x evidence ledger. NOT generic SaaS.
ONE single soft, light, colorful theme across the entire app (landing + officer console +
portals + embed widgets). No dark theme. No pure black (#000000) or pure white (#FFFFFF).
Lightest allowed surface is #FFFCF5.

BANNED: dark console / dark mode, near-black surfaces, pure black (#000) / pure white (#fff),
purple gradients, glassmorphism card grids, "3 feature cards" hero, emoji icons, stock illustrations,
lorem ipsum, tricolor-flag clichés, and dark inverted blocks.

## Color tokens (CSS variables in src/styles/tokens.css)
--bg: #F3EDE0 (sandstone)          --bg-elevated: #FAF6EC
--surface: #FBF8F0                 --surface-2: #ECE5D4
--tint-teal: #DCEAE5               --tint-clay: #F2DFD0
--tint-indigo: #E1E4F2             --tint-ochre: #F3E7C6
--text: #1F2B3D (ink-navy)         --text-muted: #4A5568      --text-subtle: #5F6B7E
--border: #D8CFB9                  --control-border: #8B8068  --focus-ring: #1C6B6F
--accent: #B5432A (terracotta)     --accent-2: #1C6B6F (teal, links & active nav)

Status vocabulary (each with -fg, -bg tint, -border):
- PASS: #1B6F4F (teal-green)
- DEFICIENCY_FOUND / MISMATCH_FOUND: #B3341C (terracotta)
- POSSIBLE_DUPLICATE / MANUAL_REVIEW_REQUIRED / GEOTAG_ABSENT: #8A5A00 (ochre amber)
- STRUCTURE_INDICATOR: #3A4A9C (indigo)
- SOURCE_UNAVAILABLE / VERIFICATION_PENDING: #566074 (slate)

Hierarchy is created with tinted surfaces (teal, clay, indigo, ochre) instead of dark inverted panels.
Emphasis sections (such as "What Pramāṇa will NOT claim") use --tint-clay with terracotta rules.

## Typography & Readability (self-hosted fonts)
- Display / Headings: Fraunces (tight tracking, italic for emphasis, padding for diacritics).
- Body / UI / Tables: Geist Sans. Minimum sizes: body 15–16px, table cells 14px, buttons 14px,
  micro-labels 12px (nothing below 12px). Sentence case for navigation, buttons, tabs, table headers.
- Mono: JetBrains Mono ONLY for hashes, IDs, clauses, rule numbers, coordinates.
- Hindi: Noto Serif Devanagari (display), Noto Sans Devanagari (body). Adequate line-height (≥ 1.3)
  ensuring no diacritic clipping on characters like प्रमाण.

## Motion & Chrome
GSAP+ScrollTrigger+Lenis for landing (simplified/disabled below md or for prefers-reduced-motion);
Framer Motion for app UI.
Fixed-height app frame (100dvh) with sticky header (--chrome-h) and independent scrolling main/sidebar.
Dev Overrides panel lives in a discreet header action and opens an off-canvas drawer (no intrusive floating pills).

## Copy rules (from solution §14)
Say "tamper-evident" never "immutable". Say "indicator, requires review" never "forgery".
No accuracy %, no time-saved numbers, no "already integrated with X". Cross-application
analytics is labelled "Designed now · built in Phase 4". Persistent banner:
"Prototype — synthetic data; external issuer response is simulated."
Sources always labelled LIVE / SANDBOX / SIMULATED.