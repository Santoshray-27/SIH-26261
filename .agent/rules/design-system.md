---
trigger: always_on
---

# Sakshya‑I5 — Design System (always follow)

## Concept: "Forensic Editorial" (Sandstone & Teal) with Modern Government Service Portal Structure
Government-grade trust x printed gazette x evidence ledger x modern service portal. NOT generic SaaS.
ONE single soft, light, colorful theme across the entire app (landing + officer console +
portals + embed widgets). No dark theme. No pure black (#000000) or pure white (#FFFFFF).
Lightest allowed surface is #FFFCF5.

BANNED: dark console / dark mode, near-black surfaces, pure black (#000) / pure white (#fff),
purple gradients, glassmorphism card grids, "3 feature cards" hero, emoji icons, stock illustrations,
lorem ipsum, tricolor-flag clichés, and dark inverted blocks.
Do NOT use the State Emblem of India, the Ashoka Chakra/tricolour marks, or the AICTE logo.

## Color tokens (CSS variables in src/styles/tokens.css)
--bg: #F3EDE0 (sandstone)          --bg-elevated: #FAF6EC
--surface: #FBF8F0                 --surface-2: #ECE5D4
--tint-teal: #DCEAE5               --tint-clay: #F2DFD0
--tint-indigo: #E1E4F2             --tint-ochre: #F3E7C6
--text: #1F2B3D (ink-navy)         --text-muted: #4A5568      --text-subtle: #5F6B7E
--border: #D8CFB9                  --control-border: #8B8068  --focus-ring: #1C6B6F
--accent: #B5432A (terracotta)     --accent-2: #1C6B6F (teal, links & active nav)
--nav-bg: #1C6B6F                  --nav-fg: #FAF6EC

Status vocabulary (each with -fg, -bg tint, -border):
- PASS: #1B6F4F (teal-green)
- DEFICIENCY_FOUND / MISMATCH_FOUND: #B3341C (terracotta)
- POSSIBLE_DUPLICATE / MANUAL_REVIEW_REQUIRED / GEOTAG_ABSENT: #8A5A00 (ochre amber)
- STRUCTURE_INDICATOR: #3A4A9C (indigo)
- SOURCE_UNAVAILABLE / VERIFICATION_PENDING: #566074 (slate)

Hierarchy is created with tinted surfaces (teal, clay, indigo, ochre) instead of dark inverted panels.
Emphasis sections (such as "What Sakshya‑I5 will NOT claim") use --tint-clay with terracotta rules.

## Typography & Readability (self-hosted fonts)
- Display / Headings: Fraunces (tight tracking, italic for emphasis, padding for diacritics). Calmer scale for portal feel: h1 clamp(1.9rem, 3.2vw, 2.75rem).
- Body / UI / Tables: Geist Sans. Minimum sizes: body 15–16px, table cells 14px, buttons 14px,
  micro-labels 12px (nothing below 12px). Sentence case for navigation, buttons, tabs, table headers.
- Mono: JetBrains Mono ONLY for hashes, IDs, clauses, rule numbers, coordinates.
- Hindi: Noto Serif Devanagari (display), Noto Sans Devanagari (body). Adequate line-height (≥ 1.3)
  ensuring no diacritic clipping on characters like साक्ष्य‑I5.

## Government Portal Layout Chrome (Top to bottom)
1. PrototypeBanner (tinted ochre)
2. UtilityBar (thin --surface-2): Skip to main content, Text Size A- A A+, High-contrast toggle, Accessibility link, Language toggle (English | हिन्दी)
3. SiteHeader: Neutral Logo (सा) + Sakshya‑I5 + Tagline + "Proposed solution for AICTE"
4. MainNav: Teal bar with keyboard-accessible mega-menu
5. NoticeTicker ("What's new") with Play/Pause
6. Breadcrumbs on inner pages
7. SiteFooter (multi-column, tinted --surface-2)

## Copy rules (from solution §14)
Say "tamper-evident" never "immutable". Say "indicator, requires review" never "forgery".
No accuracy %, no time-saved numbers, no "already integrated with X". Cross-application
analytics is labelled "Designed now · built in Phase 4".
Banner & Header: "Proposed solution for AICTE · Not an official website."
Sources always labelled LIVE / SANDBOX / SIMULATED.