# Pramāṇa (प्रमाण) — AICTE Evidence Ledger & Regulatory Compliance Engine

> **SIH-26261 · Technical Education Regulatory Compliance & Document Authentication Engine**  
> *"Proof, not just a verdict."*

---

## 1. How to Run Locally

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation & Launch
```bash
# Clone and enter directory
cd pramana-web

# Install exact pinned dependencies
npm install

# Run Vitest pure logic unit tests
npm test

# Start local development server (Vite)
npm run dev
```

The web application will launch at `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is occupied).

### Running Production Bundle
```bash
npm run build
npm run preview
```

---

## 2. Complete Application Route Map

| Route | View Description | Theme | User Audience |
|---|---|---|---|
| `/` | **Awwwards-Caliber Landing Page** (GSAP pinned preloader, Fraunces headline, three stacked evidence planes, interactive seal, marquee) | Forensic Editorial (`#F3EDE0`) | Public / Statutory Visitors |
| `/precheck` | **Applicant Pre-Check Landing** with interactive intake checklist | Forensic Editorial (`#F3EDE0`) | Prospective Institutions |
| `/portal/a` | **Legacy Government Mock Host Portal** (Ministry of Education navy/saffron layout embedding Pramāṇa widget) | Custom Gov (`#002855`) | Integration Proof (Legacy) |
| `/portal/b` | **Modern Minimal Mock Host Portal** (Dark Tailwind edge architecture embedding Pramāṇa widget) | Modern Dark (`#0A0A0A`) | Integration Proof (Modern) |
| `/embed/precheck` | **Standalone Embeddable Pre-Check Widget** (Style-isolated iframe target; rectifiable gaps only, suppresses vigilance flags) | Sandstone & Teal (`#F3EDE0`) | Multi-portal iframe embed |
| `/applicant/rectify/:id` | **Applicant Rectification Screen** (View approved notice, upload replacement file, animated differential re-check creating Version 2) | Sandstone & Teal (`#F3EDE0`) | Rectifying Institutions |
| `/ui-kit` | **Interactive Design System & Status Vocabulary Showcase** (13 status pills, buttons, themes, typography) | Sandstone & Teal (`#F3EDE0`) | Developers & Designers |
| `/officer` | **Officer Triage Ledger & Dashboard** (Lifecycle state strip, weakest limiting signals, alerts rail, Cmd+K palette, keyboard row nav) | Sandstone & Teal (`#F3EDE0`) | Reviewing Officers |
| `/officer/queue` | **Triage Queue** with statutory category filtering and readiness verdict badges | Sandstone & Teal (`#F3EDE0`) | Scrutiny Reviewers |
| `/officer/cases/:id` | **Case Overview Workstation** (Header v1/v2 selector, ThreeLayerPanel, CoverageStatement "9 of 11 checks ran", gate verdict, 4 tabs) | Sandstone & Teal (`#F3EDE0`) | Case Reviewers |
| `/officer/cases/:id/review` | **1-Finding-at-a-Time Adjudication Workstation** (DocViewer with cited bounding box, ValueCompare, ClauseCard, J/K/C/R/E/X hotkeys) | Sandstone & Teal (`#F3EDE0`) | Adjudicating Officers |
| `/officer/cases/:id/replay` | **Deterministic Decision Replay Engine** (Pin rule version, software build, cutoff date; side-by-side findings scrubber diff) | Sandstone & Teal (`#F3EDE0`) | Regulatory Auditors |
| `/officer/tools` | **Forensic Evidence Toolbox** (Web Crypto SHA-256 duplicate check, PDF structure inspector, PAdES signature panel, Haversine geotag, Canvas Shoelace floorplan measurement, video frame strip, sandbox QR) | Sandstone & Teal (`#F3EDE0`) | Forensic Analysts |
| `/officer/rules` | **Governed Rule Packs & Readiness Profiles** (5-stage lifecycle board, formula definitions with named inputs, senior-only readiness editor) | Sandstone & Teal (`#F3EDE0`) | Bureau Policy Authors |
| `/officer/network` | **Cross-Application Entity Graph** (SVG graph of institution/document/deponent collisions; banner: *"Designed now · built in Phase 4"*) | Sandstone & Teal (`#F3EDE0`) | Vigilance Division |
| `/officer/reports` | **Statutory Verification Gazette & Neutralized CSV Export** (Printable per-case gazette, formula injection defense) | Sandstone & Teal (`#F3EDE0`) | Council Executives |
| `/officer/audit` | **Cryptographic Audit Event Hash-Chain** (Live Web Crypto SHA-256 verification against external published checkpoint, simulate tampering) | Sandstone & Teal (`#F3EDE0`) | Statutory Auditors |

---

## 3. REAL vs. SIMULATED vs. NOT BUILT Matrix

To ensure absolute regulatory transparency and avoid overclaiming, all capabilities in Pramāṇa are explicitly declared under three categories:

| Capability / Feature | Status | Architectural Implementation & Location |
|---|---|---|
| **Client-Side SHA-256 Digesting** | **REAL** | Computed directly in-browser using `window.crypto.subtle.digest('SHA-256', buffer)`. Works on any real dragged-and-dropped file. ([DuplicateCheckTool.tsx](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/features/evidence-tools/DuplicateCheckTool.tsx)) |
| **Audit Hash-Chain Verification** | **REAL** | Real in-browser sequential block digest accumulation $\text{SHA-256}(H_{n-1} + \text{Payload})$ verified against published checkpoint with real-time tampering detection. ([AuditLedgerPage.tsx](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/pages/officer/AuditLedgerPage.tsx)) |
| **Canvas Shoelace Floor-Plan Area** | **REAL** | Gauss Shoelace area algorithm $\frac{1}{2}\vert\sum (x_i y_{j} - x_j y_i)\vert$ and 2-point scale bar calibration calculated in pure geometry code. Tested in Vitest. ([geometry.ts](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/services/geometry.ts)) |
| **Geospatial Haversine Distance** | **REAL** | Great-circle spherical distance $2R \arcsin(\sqrt{a})$ calculated between EXIF GPS coordinates and campus coordinates. Tested in Vitest. ([geometry.ts](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/services/geometry.ts)) |
| **CSV Formula Injection Neutralization** | **REAL** | Automated sanitization neutralizing dangerous leading spreadsheet characters (`=`, `+`, `-`, `@`, `\t`, `\r`) with single-quote escaping. Tested in Vitest. ([csv.ts](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/services/csv.ts)) |
| **Sufficiency Gate & Limiting Signal** | **REAL** | Pure deterministic evaluation function reading versioned readiness profiles, checking mandatory check completeness, per-field confidence floors, and terminal responses. Tested in Vitest. ([gate.ts](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/services/gate.ts)) |
| **Decision Replay Divergence Engine** | **REAL** | Pure logic evaluating historical findings against shifted rule versions or reference dates, outputting split difference diffs. Tested in Vitest. ([replay.ts](file:///c:/Users/asus/OneDrive/Desktop/pramana-web/src/services/replay.ts)) |
| **Auditor 403 Role Guarding** | **REAL** | Read-only observation role blocking every write/mutation action with an immediate `403 Read-only role (403)` toast. Enforced across all drawers and buttons. |
| **Style-Isolated Multi-Portal Embedding** | **REAL** | Dual host portals (`/portal/a` and `/portal/b`) embedding `/embed/precheck` via native `<iframe>` with style and font isolation. |
| **External Issuer Adapters (NBA / Land)** | **SIMULATED** | Seeded deterministic mock adapters badged as `SIMULATED` or `SANDBOX`. Return realistic HTTP responses (including HTTP 503 gateway timeouts) to verify non-pass handling. |
| **OCR Text & Bounding Box Extraction** | **SIMULATED** | Pre-computed bounding box coordinates `[ymin, xmin, ymax, xmax]` representing Tesseract OCR v5.3 extractions on synthetic affidavits and certificates. |
| **PDF Byte Structure Discrepancies** | **SIMULATED** | Pre-parsed low-level PDF dictionary objects (incremental revision xrefs, `/Producer` tags, font-mix `/F7` in `/F1` stream, Mode 3 invisible text). Tagged as `"indicator, requires review"`. |
| **Cross-Application Entity Network** | **SIMULATED / DESIGNED NOW** | SVG relationship graph showing multi-cycle document collisions. Explicitly badged: *"Designed now · built in Phase 4"*. |
| **Persistent Production Backend / DB** | **NOT BUILT** | No live SQL/PostgreSQL database or live backend server is deployed in this prototype. All client interactions use the in-memory typed mock services layer (`src/services/mockApi.ts`). |
| **Biometric Face / Fingerprint Recognition** | **NOT BUILT / BANNED** | **Strictly prohibited by design.** Pramāṇa relies entirely on deterministic document provenance, cryptographic trust anchors, and human statutory review. |

---

## 4. Key Design System & Solution Copy Principles (§14)

1. **"Tamper-Evident" never "Immutable"**: The cryptographic hash-chain detects unauthorized alteration; we do not claim theoretical physical immutability.
2. **"Indicator, requires review" never "Forgery"**: Structural anomalies in PDFs are mechanical observations for officer adjudication, never pre-judged fraud verdicts.
3. **"Not an approval engine"**: The Evidence Sufficiency Gate is a strict workflow gatekeeper ensuring all required checks have run; human statutory approval remains solely with AICTE officers.
4. **Weakest Signal Rule**: The sufficiency gate never averages confidence scores to mask a missing mandatory check.
5. **No Blind Auto-Merges**: Cross-application fuzzy identity candidates are presented for manual scrutiny and never auto-merged.

---

## 5. Automated Verification Status
```
Test Files  5 passed (5)
     Tests  23 passed (23)
  Duration  1.89s
```
- `src/mock/mockData.test.ts` (Domain model & hero case seeds)
- `src/services/gate.test.ts` (Sufficiency gate & weakest limiting signal)
- `src/services/geometry.test.ts` (Euclidean distance, scale derivation, Shoelace formula, Haversine)
- `src/services/csv.test.ts` (Formula injection neutralization)
- `src/services/replay.test.ts` (Deterministic decision replay)
