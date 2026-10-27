import React from 'react';
import { useTranslation } from 'react-i18next';
import BRAND from '../config/brand';

export const LegalPage: React.FC<{ type: 'privacy' | 'terms' | 'disclaimer' | 'sitemap' | 'help' }> = ({ type }) => {
  const { i18n } = useTranslation('common');
  const isHindi = i18n.language && i18n.language.startsWith('hi');

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    disclaimer: 'Statutory Disclaimer',
    sitemap: 'Portal Sitemap',
    help: 'Technical Help & Contact',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-sans">
      <div className="border-b border-border pb-4 space-y-2">
        <span className="font-mono text-xs uppercase tracking-wider text-accent font-bold">
          {BRAND.CONTEXT}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text">
          {titles[type]}
        </h1>
        <p className="text-sm text-text-muted">
          {isHindi ? BRAND.PROPOSED_HI : BRAND.PROPOSED_EN} · {BRAND.NAME_EN}
        </p>
      </div>

      <div className="p-6 bg-surface border border-border rounded-md shadow-subtle space-y-4 text-sm text-text leading-relaxed">
        {type === 'privacy' && (
          <>
            <h2 className="font-serif font-bold text-base text-text">Data Privacy in Prototype Mode</h2>
            <p>
              {BRAND.NAME_EN} is an educational prototype built for Smart India Hackathon 2026. No personal data, real Aadhaar credentials, actual land ownership records, or institutional financial data are collected, stored, or transmitted to any external server.
            </p>
            <p className="text-text-muted">
              All browser cryptographic operations (SHA-256 digests, polygon coordinate area measurements) execute strictly client-side using native Web Crypto APIs.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <h2 className="font-serif font-bold text-base text-text">Terms of Prototype Demonstration</h2>
            <p>
              This website is intended solely for evaluation by the Smart India Hackathon jury, AICTE representatives, and academic stakeholders. The synthetic records and simulated responses must not be utilized for official regulatory filings.
            </p>
          </>
        )}

        {type === 'disclaimer' && (
          <>
            <h2 className="font-serif font-bold text-base text-text">Statutory Regulatory Disclaimer</h2>
            <p className="p-4 bg-tint-clay/70 border border-border rounded-xs text-text font-medium">
              {isHindi ? BRAND.DISCLAIMER_HI : BRAND.DISCLAIMER_EN}
            </p>
            <p className="text-text-muted mt-2">
              The Evidence Sufficiency Gate is not an automatic approval engine. In accordance with statutory guidelines, all final decisions remain solely with authorized AICTE officers.
            </p>
          </>
        )}

        {type === 'sitemap' && (
          <>
            <h2 className="font-serif font-bold text-base text-text">Available Routes in Prototype</h2>
            <ul className="space-y-1.5 list-disc pl-5 font-mono text-xs text-text-muted">
              <li>/ — Main Government Service Portal Landing</li>
              <li>/about — System Concept & Team Background</li>
              <li>/how-it-works — 5-Stage Verification Pipeline</li>
              <li>/embed/precheck — Style-Isolated Applicant Pre-Check Widget</li>
              <li>/officer — Officer Review Queue & Triage Ledger</li>
              <li>/officer/case/APP-2026-8801 — Case Workstation Overview</li>
              <li>/officer/cases/APP-2026-8801/review — Adjudication Finding Review</li>
              <li>/officer/cases/APP-2026-8801/replay — Deterministic Decision Replay</li>
              <li>/officer/tools — Forensic Evidence Toolbox (7 tools)</li>
              <li>/officer/rules — Rule Governance Board</li>
              <li>/officer/audit — Cryptographic Proof Ledger</li>
              <li>/officer/reports — Formal Gazette & Neutralized CSV Export</li>
              <li>/officer/network — Cross-Application Collision Graph</li>
              <li>/portal/a — Mock Ministry of Education Host Portal</li>
              <li>/portal/b — Mock State Higher Education Gateway</li>
              <li>/ui-kit — Forensic Editorial Design System Tokens</li>
              <li>/faq — Frequently Asked Questions</li>
              <li>/accessibility — Accessibility Statement</li>
            </ul>
          </>
        )}

        {type === 'help' && (
          <>
            <h2 className="font-serif font-bold text-base text-text">Technical Assistance & Hackathon Contact</h2>
            <p>
              For technical inquiries regarding the client-side cryptographic hashing, Shoelace area algorithms, or the i18next architecture, contact the development team at:
            </p>
            <div className="p-3 bg-surface-2 border border-border rounded font-mono text-xs text-accent-2 font-bold select-all">
              {BRAND.HELPDESK_PLACEHOLDER}
            </div>
            <p className="text-xs text-text-muted">
              Notice: This is a placeholder address designated for the hackathon evaluation build.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
