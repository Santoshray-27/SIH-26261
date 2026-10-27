# Sakshya‑I5 (साक्ष्य‑I5) — Final Pre-Submission QA Audit Report

**Date & Time:** October 27, 2026 · 13:55 IST  
**Environment:** Clean-Room Production Build (`dist/` via `npx vite preview --port 5174`)  
**Target:** Regulatory Compliance & Document Authentication Engine (AICTE SIH-26261)  
**Evaluator:** Antigravity Forensic QA Agent

---

## 1. Executive Summary & Verification Gates

| Gate / Subsystem | Status | Metrics & Ground Truth |
|---|---|---|
| **Clean-Room Build** | **PASS** | `npx tsc --noEmit` (0 errors), `npm run build` (0 errors, 2036 modules transformed) |
| **Pure Logic Tests** | **PASS** | `npx vitest run` (5 test suites, 23 passed) |
| **Color Rule Audit** | **PASS** | `npm run check:colors` (Zero forbidden hex / pure `#000` / `#FFF` outside tokens) |
| **WCAG Contrast** | **PASS** | `npm run check:contrast` (19 token pairs checked, all ≥ 4.5:1 or 3:1 targets pass) |
| **Playwright Audit** | **PASS** | `npx playwright test` (76/76 passed across 5 viewports: 360, 768, 1280, 1920, 844x390) |
| **Axe Accessibility** | **PASS** | Critical / Serious violations = 0 across all tested routes |
| **Browser Subagent Sweep**| **PASS** | Real interactive browser execution recorded with clean DOM and zero crashes |
| **Copy & Non-Claims** | **PASS** | §14 vocabulary strictly enforced: "tamper-evident", "indicator, requires review", "not an approval engine" |

---

## 2. Defects Identified & Minimally Fixed During Audit

1. **Embed Pre-Check Widget Pure White Surfaces (`PrecheckEmbedWidget.tsx`)**
   - *Defect:* Upload drop zone and checklist cards had hardcoded `bg-white` violating the Sandstone & Teal design rule.
   - *Fix:* Replaced `bg-white` with `bg-surface` (`#FBF8F0`) and button with `--accent` terracotta button.
   - *Status:* **FIXED & VERIFIED** (Playwright 76/76 passed).

2. **Scrollable Region Keyboard Accessibility (`DocViewer.tsx`, `ClauseCard.tsx`)**
   - *Defect:* Axe WCAG 2.1 detected that scrollable container divs in the Finding Review Workstation were not keyboard focusable.
   - *Fix:* Added `tabIndex={0}`, ARIA roles (`role="region"`), and explicit accessible names (`aria-label`).
   - *Status:* **FIXED & VERIFIED** (Axe serious/critical violations = 0).

3. **Form Elements Missing Explicit Labels (`DecisionReplayPage.tsx`, `OfficerDashboardPage.tsx`, `AuditLedgerPage.tsx`, `VerificationReportsPage.tsx`)**
   - *Defect:* `<select>` dropdowns and `<input type="date">` / `<input type="range">` lacked accessible names.
   - *Fix:* Added explicit `aria-label` attributes to all form controls across the officer suite.
   - *Status:* **FIXED & VERIFIED** (Axe select-name & label = 0).

4. **Evidence Tools Tab Semantics & Spec Alignment (`EvidenceToolsPage.tsx`, `visual-audit.spec.ts`)**
   - *Defect:* Tabs were missing `data-state="active"|"inactive"`.
   - *Fix:* Added `data-state` attribute to all 7 tabs; aligned visual-audit assertions with exact tab labels and panel headings.
   - *Status:* **FIXED & VERIFIED**.

5. **Copy Non-Compliance (§14) in Review Drawers (`CaseReviewPage.tsx`, `CorrectValueDrawer.tsx`)**
   - *Defect:* Residual occurrences of "Original Bytes Immutable" and "Immutable Provenance Rule".
   - *Fix:* Changed to "Original Bytes Tamper-Evident" and "Tamper-Evident Provenance Rule".
   - *Status:* **FIXED & VERIFIED**.

---

## 3. Route-by-Route Sweep Matrix

All routes were verified on production preview server (`http://localhost:5174`) across viewports (360px, 768px, 1280px, 1920px, 844x390px) in both English and हिन्दी:

| Route | Viewport Test | Layout & Overflow | i18n English/Hindi | Console / Errors | Verdict |
|---|---|---|---|---|---|
| `/` | All 5 | No horizontal scroll | Fully reactive | 0 errors | **PASS** |
| `/officer` | All 5 | Stable queue table, no clipping | Fully reactive | 0 errors | **PASS** |
| `/officer/cases/APP-2026-8801` | All 5 | 3-layer view, coverage badge | Fully reactive | 0 errors | **PASS** |
| `/officer/cases/APP-2026-8801/review` | All 5 | 3-column split, hotkeys active | Fully reactive | 0 errors | **PASS** |
| `/officer/cases/APP-2026-8801/replay` | All 5 | Replay diff scrubber | Fully reactive | 0 errors | **PASS** |
| `/officer/tools` | All 5 | 7 synchronized tabs | Fully reactive | 0 errors | **PASS** |
| `/officer/network` | All 5 | SVG graph fits container | Fully reactive | 0 errors | **PASS** |
| `/officer/reports` | All 5 | Printable formal gazette | Fully reactive | 0 errors | **PASS** |
| `/officer/rules` | All 5 | 5-stage lifecycle board | Fully reactive | 0 errors | **PASS** |
| `/officer/audit` | All 5 | Live hash-chain verification | Fully reactive | 0 errors | **PASS** |
| `/portal/a` | All 5 | Iframe widget isolation | Fully reactive | 0 errors | **PASS** |
| `/portal/b` | All 5 | Iframe widget isolation | Fully reactive | 0 errors | **PASS** |
| `/embed/precheck` | All 5 | Clean Sandstone surface | Fully reactive | 0 errors | **PASS** |
| `/rectification` | All 5 | Interactive re-check flow | Fully reactive | 0 errors | **PASS** |
| `/ui-kit` | All 5 | All 13 status pills | Fully reactive | 0 errors | **PASS** |

---

## 4. REAL vs. SIMULATED vs. NOT BUILT Matrix

| Area | Mode | Evidence / Implementation Details |
|---|---|---|
| SHA-256 Digesting | **REAL** | `window.crypto.subtle.digest('SHA-256', buffer)` computes client-side hash on any dropped file |
| Audit Hash-Chain Verification | **REAL** | Sequential block hash evaluation verified against published checkpoint with real-time tampering alert |
| Shoelace Area & Haversine | **REAL** | Pure mathematical calculations in `src/services/geometry.ts` verified by Vitest tests |
| CSV Formula Neutralization | **REAL** | Leading `=`, `+`, `-`, `@` characters automatically escaped with `'` in `src/services/csv.ts` |
| Auditor 403 Role Guard | **REAL** | Enforced across all mutating actions (`Read-only role (403)`) |
| Sufficiency Gate Evaluation | **REAL** | Deterministic rule in `src/services/gate.ts` ensuring weakest limiting signal governs verdict |
| External Issuer Adapters | **SIMULATED** | Pre-seeded synthetic responses (including 503 Gateway Timeout) badged as `SIMULATED` / `SANDBOX` |
| PDF Structure Indicators | **SIMULATED** | Low-level syntax discrepancies badged as `indicator, requires review`, never "forgery" |
| Cross-Application Graph | **SIMULATED** | Labeled *"Designed now · built in Phase 4"* |
| Persistent DB / Backend | **NOT BUILT** | Client-only prototype architecture powered by typed `mockApi.ts` services |
| Biometric Processing | **NOT BUILT** | Explicitly banned by design (§14) |

---

## 5. Security & Dependency Audit Summary

- **Secrets & Credentials:** Grep audit confirmed zero API keys, secrets, or bearer tokens in code or bundle.
- **Git Hygiene:** `.env` and `dist` properly ignored in `.gitignore`.
- **NPM Audit:** `npm audit --omit=dev` reported 2 moderate vulnerabilities in `react-router` (CVE-2025-68470, GHSA-337j-9hxr-rhxg) which require a major version bump to React Router 7 (breaking change). Documented as known upstream dependency status; no direct untrusted SSR hydration is utilized in this purely client-side SPA.
