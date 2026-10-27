import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import BRAND from '../config/brand';

export const AboutPage: React.FC = () => {
  const { i18n } = useTranslation('common');
  const isHindi = i18n.language && i18n.language.startsWith('hi');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-sans">
      <div className="border-b border-border pb-4 space-y-2">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-2 font-bold">
          {BRAND.CONTEXT}
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text">
          About {isHindi ? BRAND.NAME_HI : BRAND.NAME_EN}
        </h1>
        <p className="text-sm text-text-muted leading-relaxed">
          {isHindi ? BRAND.TAGLINE_HI : BRAND.TAGLINE_EN} — {isHindi ? BRAND.PROPOSED_HI : BRAND.PROPOSED_EN}.
        </p>
      </div>

      <div className="space-y-6 text-sm text-text leading-relaxed">
        <section className="p-6 bg-surface border border-border rounded-md shadow-subtle space-y-3">
          <h2 className="font-serif font-bold text-lg text-text">System Concept & Problem Space</h2>
          <p>
            Technical education regulatory compliance review requires scrutinizing tens of thousands of complex institutional filings across India annually. Currently, officers navigate disparate PDF affidavits, state NOCs, land title deeds, building completion certificates, and accreditation records.
          </p>
          <p>
            <strong>{BRAND.NAME_EN}</strong> bridges handbook compliance criteria to cryptographic document proof, mathematical floor-plan derivations, and tamper-evident audit trails, ensuring that officers have verifiable, tamper-evident evidence before statutory decisions are made.
          </p>
        </section>

        <section className="p-6 bg-surface-2 border border-border rounded-md space-y-3">
          <h2 className="font-serif font-bold text-lg text-text">Prototype Status & Transparency</h2>
          <p className="text-text-muted leading-relaxed">
            {isHindi ? BRAND.DISCLAIMER_HI : BRAND.DISCLAIMER_EN}
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-2 font-semibold">
            <CheckCircle2 size={15} />
            <span>Built for Smart India Hackathon 2026 (SIH-26261)</span>
          </div>
        </section>
      </div>
    </div>
  );
};
