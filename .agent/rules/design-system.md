---
trigger: always_on
---

# Pramāṇa — Design System (always follow)

## Concept: "Forensic editorial"
Government-grade trust x printed gazette x evidence ledger. NOT generic SaaS.
Reference feel: Awwwards editorial sites — oversized type, hairline rules, asymmetric
grids, numbered sections ("01 —"), marginalia annotations, stamps/seals, mono for IDs/hashes.
BANNED: purple gradients, glassmorphism card grids, "3 feature cards" hero, emoji icons,
stock illustrations, lorem ipsum, tricolor-flag clichés.

## Color tokens (CSS variables in src/styles/tokens.css)
--ink #0C0C0B | --paper #F3EEE5 | --bone #E7E0D2
--vermilion #D6361F (deficiency/mismatch/primary accent)
--verdigris #1F6B5C (pass) | --ochre #C48A12 (review/duplicate/geotag-absent)
--indigo #1B2A49 (structure indicators/info) | --slate #6B6B66 (unavailable/pending)
Public site = paper theme. Officer console = dark ink theme (#0F0F0E bg, #171715 surface,
#EDE7DA text), light toggle optional. Hairlines: 1px rgba(12,12,11,.14) / rgba(237,231,218,.12).

## Typography (use @fontsource, self-hosted)
Display: Fraunces (variable, big, tight tracking, italic for emphasis)
Body/UI: Geist | Mono (ids, hashes, clauses): JetBrains Mono
Hindi: Noto Serif Devanagari (display), Noto Sans Devanagari (body)
Fluid type with clamp(); hero display 12–20vw allowed. Hindi must never clip or break layout.

## Motion
GSAP+ScrollTrigger+Lenis for landing; Framer Motion for app UI. Text-split reveals,
pinned scroll scenes, magnetic buttons, custom cursor (landing only), grain overlay.
Easing: cubic-bezier(.22,1,.36,1). Respect prefers-reduced-motion (disable pinning/parallax).

## Status vocabulary (never collapse unknown into pass/fail)
PASS=verdigris solid | DEFICIENCY_FOUND/MISMATCH_FOUND=vermilion solid
POSSIBLE_DUPLICATE/MANUAL_REVIEW_REQUIRED/GEOTAG_ABSENT=ochre (GEOTAG_ABSENT outlined)
STRUCTURE_INDICATOR=indigo | SOURCE_UNAVAILABLE/VERIFICATION_PENDING=slate dashed
CHECK_NOT_RUN=hollow outline with diagonal hatch | SIGNATURE_VALID/INVALID_OR_BROKEN | LOW_CONFIDENCE_EXTRACTION=ochre dotted
Every pill has a tooltip explaining what it does NOT prove.

## Copy rules (from solution §14)
Say "tamper-evident" never "immutable". Say "indicator, requires review" never "forgery".
No accuracy %, no time-saved numbers, no "already integrated with X". Cross-application
analytics is labelled "Designed now · built in Phase 4". Persistent banner:
"Prototype — synthetic data; external issuer response is simulated."
Sources always labelled LIVE / SANDBOX / SIMULATED.