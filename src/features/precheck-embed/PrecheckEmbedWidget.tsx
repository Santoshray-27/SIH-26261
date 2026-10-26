import React, { useState } from 'react';
import { StatusPill } from '../../components/ui/StatusPill';
import {
  UploadCloud,
  FileText,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Info,
  Sparkles,
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  nameEn: string;
  nameHi: string;
  docType: string;
  isMandatory: boolean;
  status: 'PENDING' | 'ANALYZING' | 'PASS' | 'RECTIFIABLE_GAP';
  explanationEn?: string;
  explanationHi?: string;
  fileName?: string;
}

export const PrecheckEmbedWidget: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);

  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 'DOC-REQ-01',
      nameEn: 'Annual Statutory Affidavit (Form 1)',
      nameHi: 'वार्षिक सांविधिक शपथ पत्र (प्रारूप 1)',
      docType: 'AFFIDAVIT',
      isMandatory: true,
      status: 'PENDING',
    },
    {
      id: 'DOC-REQ-02',
      nameEn: 'State Government NOC / Permission Letter',
      nameHi: 'राज्य सरकार अनापत्ति प्रमाणपत्र / अनुमति पत्र',
      docType: 'STATE_GOVT_NOC',
      isMandatory: true,
      status: 'PENDING',
    },
    {
      id: 'DOC-REQ-03',
      nameEn: 'NBA Accreditation Certificate',
      nameHi: 'एनबीए प्रत्यायन प्रमाणपत्र',
      docType: 'ACCREDITATION_CERT',
      isMandatory: true,
      status: 'PENDING',
    },
    {
      id: 'DOC-REQ-04',
      nameEn: 'Land Title Deed & Registry Extract',
      nameHi: 'भूमि स्वामित्व विलेख एवं रजिस्ट्री उद्धरण',
      docType: 'LAND_REGISTRY_RECORD',
      isMandatory: true,
      status: 'PENDING',
    },
  ]);

  // Simulate instant applicant pre-check
  // CRITICAL RULE: Applicants ONLY see rectifiable gaps — NEVER integrity concerns!
  const runPrecheckSimulation = () => {
    setIsEvaluating(true);
    setHasRun(false);

    setTimeout(() => {
      setItems([
        {
          id: 'DOC-REQ-01',
          nameEn: 'Annual Statutory Affidavit (Form 1)',
          nameHi: 'वार्षिक सांविधिक शपथ पत्र (प्रारूप 1)',
          docType: 'AFFIDAVIT',
          isMandatory: true,
          status: 'PASS',
          fileName: 'Affidavit_Form_1_SriVidya_signed.pdf',
          explanationEn: 'Valid format and digital signature structure detected.',
          explanationHi: 'वैध प्रारूप और डिजिटल हस्ताक्षर संरचना पाई गई।',
        },
        {
          id: 'DOC-REQ-02',
          nameEn: 'State Government NOC / Permission Letter',
          nameHi: 'राज्य सरकार अनापत्ति प्रमाणपत्र / अनुमति पत्र',
          docType: 'STATE_GOVT_NOC',
          isMandatory: true,
          status: 'PASS',
          fileName: 'State_NOC_Telangana_2025.pdf',
          explanationEn: 'State approval letter verified through 2026-27.',
          explanationHi: 'राज्य अनुमोदन पत्र शैक्षणिक वर्ष 2026-27 के लिए सत्यापित।',
        },
        {
          id: 'DOC-REQ-03',
          nameEn: 'NBA Accreditation Certificate',
          nameHi: 'एनबीए प्रत्यायन प्रमाणपत्र',
          docType: 'ACCREDITATION_CERT',
          isMandatory: true,
          status: 'RECTIFIABLE_GAP',
          fileName: 'NBA_Tier_II_Accreditation_2023.pdf',
          explanationEn:
            'Validity cutoff gap: Certificate expired on 31-12-2025. Council norms require validity through 30-06-2026. Fix: Upload renewal acknowledgment receipt or renewal certificate.',
          explanationHi:
            'वैधता समाप्ति अंतर: प्रमाणपत्र 31-12-2025 को समाप्त हो गया। परिषद नियमों के तहत 30-06-2026 तक वैधता आवश्यक है। समाधान: नवीनीकरण पावती रसीद या नवीनीकरण प्रमाणपत्र अपलोड करें।',
        },
        {
          id: 'DOC-REQ-04',
          nameEn: 'Land Title Deed & Registry Extract',
          nameHi: 'भूमि स्वामित्व विलेख एवं रजिस्ट्री उद्धरण',
          docType: 'LAND_REGISTRY_RECORD',
          isMandatory: true,
          status: 'PASS',
          fileName: 'Land_Title_Deed_Copy.pdf',
          explanationEn: 'Document byte structure parsed without errors.',
          explanationHi: 'दस्तावेज़ संरचना त्रुटिरहित पाई गई।',
        },
      ]);

      setIsEvaluating(false);
      setHasRun(true);
    }, 1200);
  };

  const gapCount = items.filter((i) => i.status === 'RECTIFIABLE_GAP').length;
  const passCount = items.filter((i) => i.status === 'PASS').length;

  return (
    <div className="w-full bg-[#FAF7F2] text-[#0C0C0B] p-6 rounded border border-neutral-300 font-sans shadow-sm select-none">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-300 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#0C0C0B] text-[#FAF7F2] flex items-center justify-center font-serif font-black text-sm rounded-xs">
            प्र
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#0C0C0B]">
              {lang === 'en' ? 'Pramāṇa Applicant Pre-Check' : 'प्रमाण आवेदक पूर्व-सत्यापन'}
            </h3>
            <p className="text-[11px] font-mono text-neutral-600">
              {lang === 'en'
                ? 'Pre-Submission Deficiency Catchment Engine'
                : 'आवेदन प्रस्तुत करने से पूर्व कमी पकड़ने वाला इंजन'}
            </p>
          </div>
        </div>

        {/* Language switch */}
        <div className="flex items-center gap-1 bg-neutral-200/80 p-0.5 rounded text-xs font-mono">
          <button
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded transition-colors ${
              lang === 'en' ? 'bg-[#0C0C0B] text-white font-bold' : 'text-neutral-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`px-2.5 py-1 rounded transition-colors ${
              lang === 'hi' ? 'bg-[#0C0C0B] text-white font-bold' : 'text-neutral-700'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Security & Scope Banner */}
      <div className="my-4 p-3 bg-neutral-100 border border-neutral-200 rounded text-[11px] text-neutral-700 flex items-start gap-2">
        <Info className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
        <span>
          {lang === 'en'
            ? 'Deterministic pre-check catches fixable deficiencies before official submission. Integrity investigations and internal vigilance records are restricted to officer review.'
            : 'यह पूर्व-जांच आधिकारिक प्रस्तुतीकरण से पहले सुधार योग्य कमियों को पकड़ती है। आंतरिक सतर्कता रिकॉर्ड केवल अधिकारी समीक्षा के लिए आरक्षित हैं।'}
        </span>
      </div>

      {/* Upload Drop Zone Simulation */}
      <div className="space-y-4">
        <div
          onClick={runPrecheckSimulation}
          className="p-6 border-2 border-dashed border-neutral-300 hover:border-neutral-600 bg-white rounded cursor-pointer transition-colors text-center"
        >
          <UploadCloud className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
          <div className="font-serif font-bold text-sm text-neutral-900">
            {lang === 'en'
              ? 'Select or Drop Institutional Compliance Dossier'
              : 'संस्थान का अनुपालन दस्तावेज़ चुनें या यहाँ खींचें'}
          </div>
          <div className="text-[11px] font-mono text-neutral-500 mt-1">
            {lang === 'en'
              ? 'Supported: PDF Affidavits, NOCs, Accreditation Certificates (Max 50MB)'
              : 'समर्थित: शपथ पत्र, एनओसी, प्रत्यायन प्रमाणपत्र (अधिकतम 50MB)'}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={runPrecheckSimulation}
            disabled={isEvaluating}
            className="px-6 py-2.5 bg-[#0C0C0B] hover:bg-neutral-800 text-white font-mono text-xs rounded transition-colors flex items-center gap-2 shadow"
          >
            {isEvaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{lang === 'en' ? 'Scanning Dossier...' : 'दस्तावेज़ स्कैन हो रहे हैं...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Run Instant Pre-Check' : 'तुरंत पूर्व-जांच चलाएं'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Checklist & Results */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono uppercase text-neutral-600 tracking-wider">
          <span>{lang === 'en' ? 'Mandatory Checklist' : 'अनिवार्य चेकलिस्ट'}</span>
          {hasRun && (
            <span className="font-bold">
              {passCount} {lang === 'en' ? 'Clear' : 'सत्यापित'} ·{' '}
              <span className="text-[#D6361F]">
                {gapCount} {lang === 'en' ? 'Fixable Gap' : 'सुधार योग्य अंतर'}
              </span>
            </span>
          )}
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 bg-white border rounded transition-all ${
                item.status === 'RECTIFIABLE_GAP'
                  ? 'border-[#D6361F] bg-red-50/20 shadow-sm'
                  : 'border-neutral-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-neutral-500" />
                    <span className="font-serif font-bold text-xs text-neutral-900">
                      {lang === 'en' ? item.nameEn : item.nameHi}
                    </span>
                    {item.isMandatory && (
                      <span className="px-1.5 py-0.5 bg-neutral-200 text-neutral-700 font-mono text-[9px] rounded font-bold">
                        {lang === 'en' ? 'MANDATORY' : 'अनिवार्य'}
                      </span>
                    )}
                  </div>

                  {item.fileName && (
                    <div className="text-[11px] font-mono text-neutral-500 pl-6">
                      File: {item.fileName}
                    </div>
                  )}

                  {item.status === 'RECTIFIABLE_GAP' && (
                    <div className="mt-2 pl-6 pt-2 border-t border-red-200 text-xs text-[#D6361F] flex items-start gap-1.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>{lang === 'en' ? 'Rectifiable Gap Found:' : 'सुधार योग्य अंतर मिला:'}</strong>{' '}
                        {lang === 'en' ? item.explanationEn : item.explanationHi}
                      </div>
                    </div>
                  )}

                  {item.status === 'PASS' && (
                    <div className="mt-1 pl-6 text-[11px] text-[#1F6B5C] font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? item.explanationEn : item.explanationHi}</span>
                    </div>
                  )}
                </div>

                <div>
                  {item.status === 'RECTIFIABLE_GAP' ? (
                    <StatusPill status="DEFICIENCY_FOUND" label={lang === 'en' ? 'GAP FOUND' : 'कमी मिली'} />
                  ) : item.status === 'PASS' ? (
                    <StatusPill status="PASS" label={lang === 'en' ? 'VERIFIED' : 'सत्यापित'} />
                  ) : (
                    <StatusPill status="VERIFICATION_PENDING" label={lang === 'en' ? 'AWAITING SCAN' : 'प्रतीक्षारत'} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
