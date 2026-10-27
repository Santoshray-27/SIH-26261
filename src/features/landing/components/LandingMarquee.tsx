import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, CheckCircle2, FileCheck2, Cpu, Lock } from 'lucide-react';
import BRAND from '../../../config/brand';

export const LandingMarquee: React.FC = () => {
  const { i18n } = useTranslation();
  const isHindi = Boolean(i18n.language && i18n.language.startsWith('hi'));

  const items = isHindi
    ? [
        { icon: ShieldCheck, text: `${BRAND.NAME_HI} — साक्ष्य-आधारित सत्यापन मंच` },
        { icon: CheckCircle2, text: 'APH 2026-27 सांविधिक नियमों का स्वचालित मूल्यांकन' },
        { icon: FileCheck2, text: 'दस्तावेज़ अखंडता व डिजिटल हस्ताक्षर सत्यापन' },
        { icon: Lock, text: 'छेड़छाड़-साक्ष्य ऑडिट हैश-श्रृंखला' },
        { icon: Cpu, text: 'सटीक निर्णय पुनरावृत्ति एवं कवरेज विवरण' },
      ]
    : [
        { icon: ShieldCheck, text: `${BRAND.NAME_EN} — Evidence-First Application Validation` },
        { icon: CheckCircle2, text: 'AICTE Approval Process Handbook (APH 2026-27) Statutory Rule Evaluation' },
        { icon: FileCheck2, text: 'Cryptographic SHA-256 Digest Verification & Document Integrity' },
        { icon: Lock, text: 'Tamper-Evident Sequential Event Hash-Chain' },
        { icon: Cpu, text: 'Deterministic Decision Replay Engine & Sufficiency Gate' },
      ];

  return (
    <div
      aria-label="Portal Highlights Marquee"
      className="bg-accent-2 text-surface py-2.5 overflow-hidden border-y border-border select-none relative shadow-xs"
    >
      <div className="flex w-max items-center gap-8 animate-marquee text-xs font-sans font-medium tracking-wide">
        {/* Double array for seamless continuous loop */}
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="inline-flex items-center gap-2 shrink-0">
              <Icon size={14} className="text-tint-ochre shrink-0" />
              <span>{item.text}</span>
              <span className="text-surface/40 mx-2" aria-hidden="true">★</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
