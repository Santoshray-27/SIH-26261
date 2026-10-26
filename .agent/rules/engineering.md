---
trigger: always_on
---

# Engineering rules
- Vite + React 18 + TypeScript (strict) + Tailwind CSS 3.4 + react-router-dom + zustand
  + framer-motion + gsap (+ScrollTrigger) + lenis + lucide-react (stroke 1.25) + vitest.
- NO backend. All data is synthetic, typed in src/types/domain.ts mirroring docs/solution.md §6.
- UI talks ONLY to src/services/api.ts (interface). mockApi.ts implements it.
- Pure logic (gate, replay, geometry, hash, auditChain, csv) lives in services/ with vitest tests.
- Every user-visible string goes through i18n (English + Hindi). No hardcoded strings.
- Roles: applicant | officer | senior_officer | auditor. Auditor is read-only: every write
  action shows a 403 toast "Read-only role (403)".
- A11y: WCAG AA contrast, visible focus, full keyboard nav, aria labels. Responsive from 360px.
- Lazy-load routes. No heavy 3D. Landing Lighthouse perf target ≥ 90 on desktop.
- Do not add libraries beyond the list without asking.