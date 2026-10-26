import React from 'react';
import { Link } from 'react-router-dom';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, QrCode } from 'lucide-react';
import { useI18n } from '../../../i18n/useI18n';

export const SectionFooterCTA: React.FC = () => {
  const { language } = useI18n();

  return (
    <section className="py-24 px-6 md:px-12 bg-bone/30 text-ink">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
            <span className="font-bold text-ink">12 —</span>
            <span>Inspection & Review Readiness</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
            {language === 'hi'
              ? 'प्रमाण प्रणाली का अन्वेषण करें'
              : 'Inspect the live synthetic ledger.'}
          </h2>

          <p className="font-mono text-xs text-slate leading-relaxed mb-8">
            Experience the 12-step synthetic demonstration. Test the Sri Vidya Institute of Technology
            case dossier with expired accreditation, institutional title mismatch, and byte-duplicate detection.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/officer">
              <MagneticButton className="px-6 py-3.5 bg-ink text-paper hover:bg-black text-xs font-semibold tracking-wider flex items-center gap-2">
                <span>Open Officer Workstation</span>
                <ArrowRight size={14} />
              </MagneticButton>
            </Link>
            <Link to="/ui-kit">
              <MagneticButton className="px-6 py-3.5 border border-ink text-ink hover:bg-bone text-xs font-semibold tracking-wider">
                Inspect UI Kit & Primitives
              </MagneticButton>
            </Link>
          </div>
        </div>

        {/* QR Code Placeholder with Required Label */}
        <div className="border border-hairline bg-paper p-6 shadow-lifted text-center font-mono text-xs space-y-3">
          <div className="w-44 h-44 border border-dashed border-hairline bg-bone/20 flex flex-col items-center justify-center mx-auto relative">
            <QrCode size={110} strokeWidth={1.2} className="text-ink/80" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-paper px-2 py-0.5 border border-hairline text-[9px] font-bold uppercase">
                PRAMĀṆA
              </div>
            </div>
          </div>

          <div className="border-t border-hairline pt-2">
            <span className="text-[10px] uppercase font-bold text-slate block">
              Scan For Mobile Prototype
            </span>
            <span className="text-[9px] text-ochre font-semibold">
              Prototype — synthetic data
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
