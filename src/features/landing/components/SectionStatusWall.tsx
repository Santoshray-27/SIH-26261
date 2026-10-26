import React from 'react';
import { StatusPill } from '../../../components/ui/StatusPill';
import { VerificationStatus } from '../../../types/domain';
import { useI18n } from '../../../i18n/useI18n';

const allStatuses: VerificationStatus[] = [
  'PASS',
  'DEFICIENCY_FOUND',
  'MISMATCH_FOUND',
  'POSSIBLE_DUPLICATE',
  'SIGNATURE_VALID',
  'SIGNATURE_INVALID_OR_BROKEN',
  'SOURCE_UNAVAILABLE',
  'VERIFICATION_PENDING',
  'LOW_CONFIDENCE_EXTRACTION',
  'MANUAL_REVIEW_REQUIRED',
  'CHECK_NOT_RUN',
  'GEOTAG_ABSENT',
  'STRUCTURE_INDICATOR',
];

export const SectionStatusWall: React.FC = () => {
  const { language } = useI18n();

  return (
    <section className="py-24 px-6 md:px-12 border-b border-hairline bg-bone/20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-slate mb-4">
          <span className="font-bold text-ink">07 —</span>
          <span>Status Vocabulary · §3.3</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink uppercase mb-4">
          {language === 'hi'
            ? 'सटीक स्थिति शब्दावली: अस्पष्टता का कोई स्थान नहीं'
            : 'Honest status vocabulary.'}
        </h2>

        <p className="font-mono text-xs text-slate max-w-2xl mb-12">
          Never collapse unknown into pass or fail. Hover or focus any pill on the wall to view
          the statutory disclaimer detailing what the status does NOT prove.
        </p>

        {/* Wall of All 13 Status Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allStatuses.map((status) => (
            <div
              key={status}
              className="p-4 bg-paper border border-hairline flex flex-col justify-between h-32 hover:border-ink transition-colors"
            >
              <div className="font-mono text-[10px] text-slate uppercase truncate mb-2">
                <code>{status}</code>
              </div>

              <div className="my-auto">
                <StatusPill status={status} size="md" />
              </div>

              <div className="text-[10px] text-slate font-mono uppercase mt-2">
                Hover for limitation note ↗
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
