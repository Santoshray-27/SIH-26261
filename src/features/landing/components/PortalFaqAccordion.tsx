import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export const PortalFaqAccordion: React.FC = () => {
  const { t } = useTranslation('faq');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1']));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      q: t('q1', 'What is Sakshya‑I5?'),
      a: t(
        'a1',
        'Sakshya‑I5 is a prototype regulatory compliance and document authentication engine designed for Smart India Hackathon 2026 (SIH-26261). It connects AICTE Approval Process Handbook criteria to verifiable cryptographic proof.'
      ),
    },
    {
      id: 'faq-2',
      q: t('q2', 'Is Sakshya‑I5 an official Government of India website?'),
      a: t(
        'a2',
        'No. Sakshya‑I5 is a student-built prototype solution proposal for AICTE. It is not affiliated with or endorsed by AICTE or the Government of India.'
      ),
    },
    {
      id: 'faq-3',
      q: t('q3', 'Does Sakshya‑I5 automatically approve or reject applications?'),
      a: t(
        'a3',
        'No. Sakshya‑I5 strictly enforces an Evidence Sufficiency Gate. It verifies whether mandatory checks have run and evidence is present. Final approval or rejection remains solely with authorized AICTE officers.'
      ),
    },
    {
      id: 'faq-4',
      q: t('q4', 'What data does this prototype use?'),
      a: t(
        'a4',
        'All institutional applications, land deeds, NOC certificates, and affidavits displayed in this prototype are 100% synthetic mock fixtures. No real personal records are stored or processed.'
      ),
    },
    {
      id: 'faq-5',
      q: t('q5', 'Which parts are simulated versus real?'),
      a: t(
        'a5',
        'SHA-256 client digesting, Shoelace area calculation, Haversine coordinate math, CSV formula sanitization, and audit hash-chain verification run real code locally. External issuer APIs (such as state land registries) are simulated with synthetic responses.'
      ),
    },
    {
      id: 'faq-6',
      q: t('q6', 'How are compliance rules sourced?'),
      a: t(
        'a6',
        'Rules directly reflect the AICTE Approval Process Handbook (APH 2026-27), with each finding citing exact handbook appendix clauses and formula norms.'
      ),
    },
    {
      id: 'faq-7',
      q: t('q7', 'Does the platform support multiple Indian languages?'),
      a: t(
        'a7',
        'Yes. The interface is available in both English and हिन्दी, with Devanagari typography tuned for readability without diacritic clipping.'
      ),
    },
    {
      id: 'faq-8',
      q: t('q8', 'What accessibility standards does Sakshya‑I5 follow?'),
      a: t(
        'a8',
        'Sakshya‑I5 adheres to WCAG 2.1 AA standards, featuring high contrast, A- A A+ font scaling, skip to main content navigation, and full keyboard operability.'
      ),
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-bg border-b border-border">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-2 font-semibold">
            Common Questions
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-text">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-text-muted font-sans">
            Transparent clarifications regarding the architecture, synthetic test data, and statutory limitations.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-surface border border-border rounded-md overflow-hidden transition-all shadow-subtle"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-desc`}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-text hover:bg-surface-2 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle size={16} className="text-accent-2 shrink-0" aria-hidden="true" />
                    <span>{item.q}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-text-muted shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-accent-2' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`${item.id}-desc`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-text-muted font-sans leading-relaxed border-t border-border/50 animate-fadeIn"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Helpdesk Card */}
        <div className="p-6 bg-surface-2 border border-border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-text">
              Have additional regulatory or technical inquiries?
            </h4>
            <p className="text-xs text-text-muted">
              Contact our hackathon team or inspect the full architectural specification.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/help"
              className="px-4 py-2 bg-surface hover:bg-surface-2 border border-border rounded-xs text-xs font-semibold text-text shadow-subtle transition-colors"
            >
              Helpdesk
            </Link>
            <Link
              to="/officer/rules"
              className="px-4 py-2 bg-accent text-surface rounded-xs text-xs font-semibold shadow-subtle hover:opacity-90 transition-opacity"
            >
              Inspect Rules
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
