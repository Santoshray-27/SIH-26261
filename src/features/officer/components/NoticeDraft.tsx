import React, { useState } from 'react';
import { Finding, RectificationNotice } from '../../../types/domain';
import { Button } from '../../../components/ui/Button';
import { Mail, Clock, ShieldAlert, Info, Send, X } from 'lucide-react';

interface NoticeDraftProps {
  finding: Finding;
  applicationId: string;
  onClose: () => void;
  onSubmit: (notice: Omit<RectificationNotice, 'id' | 'sentTimestamp'>) => Promise<void>;
  readOnly?: boolean;
}

export const NoticeDraft: React.FC<NoticeDraftProps> = ({
  finding,
  applicationId,
  onClose,
  onSubmit,
  readOnly = false,
}) => {
  const [responsePeriodDays, setResponsePeriodDays] = useState<number>(7);
  const [language, setLanguage] = useState<'both' | 'en' | 'hi'>('both');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Source of the configurable parameter
  const responsePeriodSource = 'AICTE Approval Process Handbook 2026-27, Chapter II, Clause 2.8 (Deficiency Notice Timeline)';

  const subjectEn = `Statutory Deficiency Rectification Notice: ${finding.ruleId} (${applicationId})`;
  const subjectHi = `सांविधिक कमी सुधार सूचना: ${finding.ruleId} (${applicationId})`;

  const bodyEn = `To the Head of the Institution / Registrar,

Reference: Extension of Approval Application ${applicationId} for Academic Year 2026-27.

During evidence sufficiency verification, the following rectifiable gap was identified under ${finding.ruleId}:

"${finding.explanation}"

CITED EVIDENCE:
- Document: ${finding.evidenceReferences.documentName || 'Uploaded Annexure'}
- Claimed Value: ${finding.evidenceReferences.rawValue || 'N/A'}
- Statutory Criterion: ${finding.evidenceReferences.comparedValue || 'Valid accreditation certificate through reference cutoff 2026-06-30'}

You are hereby requested to provide a valid renewal acknowledgment receipt, superseding affidavit, or certified certificate within ${responsePeriodDays} working days from the receipt of this notice, failing which the application shall be determined solely upon the existing record.

By Order of the Competent Authority,
Approval Bureau, All India Council for Technical Education`;

  const bodyHi = `संस्थान के प्रमुख / कुलसचिव को,

संदर्भ: शैक्षणिक वर्ष 2026-27 के लिए अनुमोदन विस्तार आवेदन ${applicationId}।

साक्ष्य पर्याप्तता सत्यापन के दौरान, ${finding.ruleId} के तहत निम्नलिखित सुधार योग्य अंतर की पहचान की गई:

"${finding.explanationHi || finding.explanation}"

उद्धृत साक्ष्य:
- दस्तावेज़: ${finding.evidenceReferences.documentName || 'अपलोड किया गया अनुबंध'}
- प्रस्तुत मान: ${finding.evidenceReferences.rawValue || 'लागू नहीं'}
- सांविधिक मानदंड: ${finding.evidenceReferences.comparedValue || 'संदर्भ तिथि 2026-06-30 तक वैध प्रत्यायन प्रमाण पत्र'}

आपको एतद्द्वारा इस सूचना की प्राप्ति से ${responsePeriodDays} कार्य दिवसों के भीतर एक वैध नवीनीकरण पावती रसीद, अतिरिक्त शपथ पत्र या प्रमाणित प्रमाण पत्र प्रस्तुत करने का निर्देश दिया जाता है।

सक्षम प्राधिकारी के आदेशानुसार,
अनुमोदन ब्यूरो, अखिल भारतीय तकनीकी शिक्षा परिषद`;

  const handleSendNotice = async () => {
    if (readOnly) return;
    setIsSubmitting(true);
    try {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + responsePeriodDays);

      await onSubmit({
        applicationId,
        versionId: 'VER-8801-1',
        linkedFindingIds: [finding.id],
        language,
        templateVersion: '2026.1-RECT',
        subject: subjectEn,
        subjectHi,
        bodyContent: bodyEn,
        bodyContentHi: bodyHi,
        responsePeriodDays,
        responsePeriodSource,
        approvingOfficerId: 'OFF-AICTE-042',
        approvingOfficerName: 'Dr. R. K. Sharma (Reviewer)',
        deadlineDate: deadline.toISOString(),
        status: 'DISPATCHED',
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#141413] border border-white/15 rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#171715] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-ochre" />
            <div>
              <h3 className="text-base font-serif font-bold text-[#EDE7DA]">
                Draft Rectification Notice
              </h3>
              <p className="text-[11px] font-mono text-slate">
                Statutory Notice for Rectifiable Gap · Clause 2.8
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="flex-1 p-6 overflow-auto space-y-5">
          {/* Configurable Parameter Section */}
          <div className="p-4 bg-[#1A1A18] border border-white/10 rounded space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-ochre" />
                Response Period (Days)
              </span>
              <div className="flex items-center gap-2">
                {[5, 7, 10, 14].map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setResponsePeriodDays(days)}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                      responsePeriodDays === days
                        ? 'bg-ochre text-white border-ochre font-bold'
                        : 'bg-black/30 text-slate border-white/10 hover:border-white/30'
                    }`}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate/80 bg-black/30 p-2.5 rounded border border-white/5 flex items-start gap-2">
              <Info className="w-4 h-4 text-slate flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[#EDE7DA] font-semibold">Configurable statutory source:</span> {responsePeriodSource}
              </div>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate">Notice Dispatch Language:</span>
            <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded p-0.5">
              {(['both', 'en', 'hi'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded text-xs transition-colors ${
                    language === lang
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-slate hover:text-white'
                  }`}
                >
                  {lang === 'both' ? 'Bilingual (EN + HI)' : lang === 'en' ? 'English Only' : 'Hindi Only'}
                </button>
              ))}
            </div>
          </div>

          {/* Notice Preview */}
          <div className="space-y-4">
            {(language === 'both' || language === 'en') && (
              <div className="p-4 bg-black/50 border border-white/10 rounded font-mono text-xs text-[#EDE7DA] space-y-2">
                <div className="text-[10px] uppercase text-slate border-b border-white/10 pb-1 font-bold">
                  English Draft Notice
                </div>
                <div className="text-white font-bold">{subjectEn}</div>
                <div className="text-slate/90 whitespace-pre-line text-[11.5px] leading-relaxed">
                  {bodyEn}
                </div>
              </div>
            )}

            {(language === 'both' || language === 'hi') && (
              <div className="p-4 bg-black/50 border border-white/10 rounded font-serif text-xs text-[#EDE7DA] space-y-2">
                <div className="text-[10px] uppercase text-slate border-b border-white/10 pb-1 font-mono font-bold">
                  हिंदी मसौदा सूचना (Hindi Draft Notice)
                </div>
                <div className="text-white font-bold font-serif">{subjectHi}</div>
                <div className="text-slate/90 whitespace-pre-line text-[12px] leading-relaxed">
                  {bodyHi}
                </div>
              </div>
            )}
          </div>

          {/* Officer Approval Disclaimer */}
          <div className="p-3 bg-ochre/10 border border-ochre/20 rounded text-[11px] text-ochre flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>
              Officer approval is required before dispatch. This notice will be appended to the applicant’s portal
              and logged in the audit ledger with your officer credentials.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#171715] border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-slate hover:text-white transition-colors"
          >
            Cancel
          </button>

          <Button
            onClick={handleSendNotice}
            disabled={readOnly || isSubmitting}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Dispatching...' : 'Approve & Dispatch Notice'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
