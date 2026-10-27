import React from 'react';
import BRAND from '../config/brand';

export const AccessibilityPage: React.FC = () => {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8 font-sans">
      <div className="border-b border-border pb-4 space-y-2">
        <span className="font-mono text-xs uppercase tracking-wider text-accent-2 font-bold">
          WCAG 2.1 Level AA Compliance
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-text">
          Accessibility Statement
        </h1>
        <p className="text-sm text-text-muted">
          Our commitment to barrier-free digital access for officers, applicants, and auditors.
        </p>
      </div>

      <div className="space-y-6 text-sm text-text leading-relaxed">
        <section className="p-6 bg-surface border border-border rounded-md shadow-subtle space-y-3">
          <h2 className="font-serif font-bold text-lg text-text">Supported Accessibility Features</h2>
          <ul className="space-y-2 list-disc pl-5 text-text-muted">
            <li>
              <strong>Skip to Main Content:</strong> An immediate keyboard-accessible skip link is the very first interactive element on all public and console views.
            </li>
            <li>
              <strong>Text Size Scaling (A- A A+ A++):</strong> Persisted root font size adjustments scaling rem layouts from 87.5% to 125% without layout breakage.
            </li>
            <li>
              <strong>High Contrast Mode:</strong> Instant toggle adhering strictly to color token standards without harsh pure black or white.
            </li>
            <li>
              <strong>Keyboard Navigation:</strong> All tabs, mega-menus, drawers, and modal dialogs support Arrow keys, Escape, and visible focus rings.
            </li>
            <li>
              <strong>Bilingual Font Legibility:</strong> Self-hosted Noto Serif and Noto Sans Devanagari fonts with line-height allowances preventing diacritic clipping on complex ligatures.
            </li>
          </ul>
        </section>

        <section className="p-6 bg-surface-2 border border-border rounded-md space-y-3">
          <h2 className="font-serif font-bold text-lg text-text">Feedback & Assistance</h2>
          <p className="text-text-muted">
            If you experience any accessibility hurdles navigating {BRAND.NAME_EN}, please contact the development team at{' '}
            <span className="font-mono font-bold text-text">{BRAND.HELPDESK_PLACEHOLDER}</span>.
          </p>
        </section>
      </div>
    </div>
  );
};
