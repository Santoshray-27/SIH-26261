---
trigger: always_on
---

# Engineering rules
- Name: Sakshya‑I5 (साक्ष्य‑I5). Single source of truth in src/config/brand.ts.
- Vite + React 18 + TypeScript (strict) + Tailwind CSS 3.4 + react-router-dom + zustand
  + framer-motion + gsap (+ScrollTrigger) + lenis + lucide-react (stroke 1.25) + vitest
  + i18next + react-i18next + i18next-browser-languagedetector + i18next-resources-to-backend.
- NO backend. All data is synthetic, typed in src/types/domain.ts.
- UI talks ONLY to src/services/api.ts (interface). mockApi.ts implements it.
- Pure logic (gate, replay, geometry, hash, auditChain, csv) lives in services/ with vitest tests.
- Every user-visible string goes through i18next (English + Hindi) across modular namespaces.
- Roles: applicant | officer | senior_officer | auditor. Auditor is read-only: every write
  action shows a 403 toast "Read-only role (403)".
- A11y: WCAG AA contrast, visible focus, full keyboard nav, aria labels. Responsive from 360px.
- Government-portal chrome with UtilityBar (A- A A+ font resize, high contrast, skip link, language switch).
- Lazy-load routes. No heavy 3D. Landing Lighthouse perf target ≥ 90 on desktop.