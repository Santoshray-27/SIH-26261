import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
} from 'lucide-react';

export interface TourStep {
  stepNumber: number;
  titleEn: string;
  titleHi: string;
  route: string;
  descriptionEn: string;
  descriptionHi: string;
  targetFocusLabel: string;
  solutionSection: string;
}

export const DEMO_TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    titleEn: 'Synthetic EoA Application Intake',
    titleHi: 'कृत्रिम ईओए आवेदन प्रस्तुतीकरण',
    route: '/officer/cases/APP-2026-8801',
    descriptionEn: 'Submit and inspect Sri Vidya Institute of Technology (synthetic) with Affidavit, NOC, and Accreditation certificates.',
    descriptionHi: 'शपथ पत्र, अनापत्ति प्रमाणपत्र और प्रत्यायन प्रमाणपत्र के साथ श्री विद्या प्रौद्योगिकी संस्थान के आवेदन का निरीक्षण करें।',
    targetFocusLabel: 'Case Header & Version v1',
    solutionSection: '§8.1',
  },
  {
    stepNumber: 2,
    titleEn: 'Checklist & Extracted Field Provenance',
    titleHi: 'चेकलिस्ट एवं निष्कर्षित फ़ील्ड स्रोत',
    route: '/officer/cases/APP-2026-8801',
    descriptionEn: 'View OCR extracted fields (raw, normalized, confidence, page/region, and correction provenance) under the Documents tab.',
    descriptionHi: 'दस्तावेज़ टैब के तहत ओसीआर फ़ील्ड (कच्चा मान, सामान्यीकृत, सटीकता एवं सुधार स्रोत) देखें।',
    targetFocusLabel: 'Documents & Field Provenance Tab',
    solutionSection: '§8.2',
  },
  {
    stepNumber: 3,
    titleEn: 'Expired Accreditation Certificate Detection',
    titleHi: 'समाप्त प्रत्यायन प्रमाणपत्र की पहचान',
    route: '/officer/cases/APP-2026-8801/review',
    descriptionEn: 'Trigger RULE-APH-2.4-EXPIRY. Shows expiry date 2025-12-31 versus reference cutoff 2026-06-30 with bounding box overlay.',
    descriptionHi: 'समाप्ति तिथि 2025-12-31 बनाम संदर्भ कटऑफ 2026-06-30 की तुलना और बाउंडिंग बॉक्स ओवरले देखें।',
    targetFocusLabel: 'Finding FIND-8801-01 · Expiry Rule',
    solutionSection: '§8.3',
  },
  {
    stepNumber: 4,
    titleEn: 'Institution Legal Name Mismatch',
    titleHi: 'संस्थान के कानूनी नाम में विसंगति',
    route: '/officer/cases/APP-2026-8801/review',
    descriptionEn: 'RULE-APH-1.2-NAME-MATCH detects string mismatch between Affidavit ("Sri Vidya Inst of Technology") and State NOC.',
    descriptionHi: 'शपथ पत्र और राज्य अनापत्ति प्रमाणपत्र के बीच नाम की विसंगति का स्वतः पता लगाना।',
    targetFocusLabel: 'Finding FIND-8801-02 · Name Mismatch',
    solutionSection: '§8.4',
  },
  {
    stepNumber: 5,
    titleEn: 'Byte-Identical Document Duplicate Detection',
    titleHi: 'सटीक बाइट-समान दस्तावेज़ डुप्लिकेट पहचान',
    route: '/officer/tools',
    descriptionEn: 'Client-side Web Crypto SHA-256 matches Land Deed against Thar Institute (APP-2026-8808) yielding POSSIBLE_DUPLICATE.',
    descriptionHi: 'क्लाइंट-साइड वेब क्रिप्टो SHA-256 थार संस्थान के भूमि विलेख से मिलान कर डुप्लिकेट घोषित करता है।',
    targetFocusLabel: 'Duplicate Check Tool (Local Web Crypto)',
    solutionSection: '§8.5',
  },
  {
    stepNumber: 6,
    titleEn: 'PAdES Digital Signature Validation & Limitations',
    titleHi: 'डिजिटल हस्ताक्षर सत्यापन एवं सीमाएं',
    route: '/officer/tools',
    descriptionEn: 'Shows SIGNATURE_VALID with explicit statutory limitation: "valid signature does not mean every claim is true".',
    descriptionHi: 'वैध हस्ताक्षर का अर्थ यह नहीं कि प्रत्येक दावा सत्य है - कानूनी सीमाओं का स्पष्ट प्रदर्शन।',
    targetFocusLabel: 'Digital Signature Panel',
    solutionSection: '§8.6',
  },
  {
    stepNumber: 7,
    titleEn: 'Simulated External Issuer Adapter Call',
    titleHi: 'सिम्युलेटेड बाहरी जारीकर्ता एडेप्टर कॉल',
    route: '/officer/cases/APP-2026-8801',
    descriptionEn: 'Inspect the Source Results tab: NBA Central Registry adapter response with SIMULATED environment badge and timestamp.',
    descriptionHi: 'स्रोत परिणाम टैब में एनबीए केंद्रीय रजिस्ट्री एडेप्टर का सिम्युलेटेड बैज और समय-मुहर देखें।',
    targetFocusLabel: 'Source Results Tab (SIMULATED)',
    solutionSection: '§8.7',
  },
  {
    stepNumber: 8,
    titleEn: 'External Source Unavailable State',
    titleHi: 'बाहरी स्रोत अनुपलब्ध स्थिति',
    route: '/officer/cases/APP-2026-8801',
    descriptionEn: 'State Land Registry HTTP 503 returns SOURCE_UNAVAILABLE / VERIFICATION_PENDING, strictly avoiding false failures.',
    descriptionHi: 'राज्य भूमि रजिस्ट्री 503 टाइमआउट पर विफलता के बजाय स्रोत अनुपलब्ध दर्शाता है।',
    targetFocusLabel: 'Status Pill: SOURCE_UNAVAILABLE',
    solutionSection: '§8.8',
  },
  {
    stepNumber: 9,
    titleEn: 'Keyboard-Driven Finding-by-Finding Workstation',
    titleHi: 'कीबोर्ड-चालित फ़ाइंडिंग समीक्षा कार्यस्थान',
    route: '/officer/cases/APP-2026-8801/review',
    descriptionEn: 'Press J/K to step through findings, C to correct values, R for clarification notice, and E to escalate.',
    descriptionHi: 'जे/के से फ़ाइंडिंग नेविगेट करें, सी से मान सुधारें, आर से स्पष्टीकरण नोटिस बनाएं।',
    targetFocusLabel: 'Finding Review Workstation',
    solutionSection: '§8.9',
  },
  {
    stepNumber: 10,
    titleEn: 'Draft Clarification Notice vs. Senior Escalation',
    titleHi: 'सुधार नोटिस बनाम वरिष्ठ समीक्षा प्रेषण',
    route: '/officer/cases/APP-2026-8801/review',
    descriptionEn: 'Rectifiable gaps open NoticeDraft with configurable days; integrity concerns route to senior review without applicant notice.',
    descriptionHi: 'सुधार योग्य कमियों पर द्वैभाषिक नोटिस बनता है; अखंडता संबंधी चिंताओं को सीधे वरिष्ठ समीक्षा हेतु भेजा जाता है।',
    targetFocusLabel: 'Notice Draft & Escalate Modals',
    solutionSection: '§8.10',
  },
  {
    stepNumber: 11,
    titleEn: 'Tamper-Evident Audit Event Hash Chain',
    titleHi: 'छेड़छाड़-प्रमाणित ऑडिट हैश-श्रृंखला',
    route: '/officer/audit',
    descriptionEn: 'Inspect sequential SHA-256 block chain. Click "Verify Chain" to run in-browser verification against the external checkpoint.',
    descriptionHi: 'अनुक्रमिक ब्लॉक श्रृंखला का वेब क्रिप्टो से सत्यापन और बाहरी चेकपॉइंट मिलान।',
    targetFocusLabel: 'Audit Event Hash-Chain & Verifier',
    solutionSection: '§8.11',
  },
  {
    stepNumber: 12,
    titleEn: 'Statutory Reports & Neutralized CSV Export',
    titleHi: 'सांविधिक रिपोर्ट एवं सुरक्षित सीएसवी निर्यात',
    route: '/officer/reports',
    descriptionEn: 'Printable formal compliance gazette and CSV export with automated formula-injection neutralization.',
    descriptionHi: 'मुद्रण योग्य सांविधिक राजपत्र और स्प्रेडशीट फॉर्मूला इंजेक्शन से सुरक्षित सीएसवी निर्यात।',
    targetFocusLabel: 'Reports & CSV Export',
    solutionSection: '§8.12',
  },
  {
    stepNumber: 13,
    titleEn: 'Embeddable Pre-Check & Portal Autonomy',
    titleHi: 'एंबेडेबल प्री-चेक एवं पोर्टल स्वायत्तता',
    route: '/portal/a',
    descriptionEn: 'Inspect Portal A (legacy government style) and Portal B (modern dark); both embed the identical widget via style-isolated iframe.',
    descriptionHi: 'विरासत पोर्टल ए और आधुनिक पोर्टल बी दोनों बिना किसी स्टाइल टकराव के समान विजेट एम्बेड करते हैं।',
    targetFocusLabel: 'Dual Host Portals (A vs B)',
    solutionSection: '§8.13',
  },
  {
    stepNumber: 14,
    titleEn: 'PDF Structure Inspection & Font-Mix Anomaly',
    titleHi: 'पीडीएफ संरचना एवं फ़ॉन्ट-मिश्रण विसंगति',
    route: '/officer/tools',
    descriptionEn: 'Inspect incremental save count, hidden text layers, and font-mix on numeric fields. Tagged as "indicator, requires review".',
    descriptionHi: 'वृद्धि-सहेज गणना, छिपे टेक्स्ट स्तर एवं संख्यात्मक फ़ॉन्ट-मिश्रण का बाइट-स्तरीय निरीक्षण।',
    targetFocusLabel: 'PDF Structure Inspector',
    solutionSection: '§8.14',
  },
  {
    stepNumber: 15,
    titleEn: 'Floor-Plan Scale Calibration & Shoelace Area',
    titleHi: 'फ्लोर-प्लान पैमाना एवं शूलेस क्षेत्रफल',
    route: '/officer/tools',
    descriptionEn: 'Interactive canvas tool: calibrate scale bar (2 points), trace polygon room, compute shoelace area, and evaluate tolerance.',
    descriptionHi: 'कैनवास पर पैमाना अंशांकन, कमरा बहुभुज अनुरेखण, शूलेस क्षेत्रफल एवं सहनशीलता मूल्यांकन।',
    targetFocusLabel: 'Floor-Plan Measurement Tool',
    solutionSection: '§8.15',
  },
  {
    stepNumber: 16,
    titleEn: 'Deterministic Decision Replay Diff',
    titleHi: 'सटीक निर्णय पुनरावृत्ति एवं अंतर',
    route: '/officer/cases/APP-2026-8801/replay',
    descriptionEn: 'Pin rule version and reference cutoff. Observe side-by-side split findings diff with scrubber without touching original records.',
    descriptionHi: 'नियम संस्करण पिन करें और मूल रिकॉर्ड में कोई बदलाव किए बिना पुनरावृत्ति अंतर देखें।',
    targetFocusLabel: 'Decision Replay & Scrubber',
    solutionSection: '§8.16',
  },
  {
    stepNumber: 17,
    titleEn: 'Evidence Sufficiency Gate & Coverage Statement',
    titleHi: 'साक्ष्य पर्याप्तता द्वार एवं कवरेज विवरण',
    route: '/officer/cases/APP-2026-8801',
    descriptionEn: 'Coverage Statement shows "9 of 11 mandatory checks ran". Sufficiency Gate outputs limiting signal and workflow control verdict.',
    descriptionHi: 'कवरेज विवरण "11 में से 9 अनिवार्य जांचें चलीं" और पर्याप्तता द्वार सीमित करने वाला संकेत दर्शाता है।',
    targetFocusLabel: 'Coverage Statement & Gate',
    solutionSection: '§8.17',
  },
];

export const DemoTourModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);

  if (!isOpen) return null;

  const currentStep = DEMO_TOUR_STEPS[currentStepIdx];

  const handleGoToStep = (index: number) => {
    setCurrentStepIdx(index);
    navigate(DEMO_TOUR_STEPS[index].route);
  };

  const handleNext = () => {
    if (currentStepIdx < DEMO_TOUR_STEPS.length - 1) {
      handleGoToStep(currentStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      handleGoToStep(currentStepIdx - 1);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-lg bg-surface border-2 border-st-review rounded-lg shadow-2xl overflow-hidden font-sans select-none animate-in fade-in slide-in-from-bottom-4 duration-200 text-text">
      {/* Top Banner */}
      <div className="px-4 py-2.5 bg-st-review-bg border-b border-st-review/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-st-review animate-spin-slow" />
          <span className="font-mono text-xs font-bold text-st-review tracking-wider uppercase">
            Pramāṇa Guided Tour · Step {currentStep.stepNumber} of 17 ({currentStep.solutionSection})
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-1 text-text-muted hover:text-text transition-colors"
          title="Close Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Step Content */}
      <div className="p-5 space-y-3.5 bg-surface">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif font-black text-base text-text">
            {currentStep.titleEn}
          </h3>
          <span className="font-mono text-[10px] text-st-review px-2 py-0.5 bg-st-review-bg border border-st-review/20 rounded">
            {currentStep.targetFocusLabel}
          </span>
        </div>

        <p className="text-xs text-text leading-relaxed">
          {currentStep.descriptionEn}
        </p>

        <p className="text-xs font-serif text-text-muted leading-relaxed border-t border-border pt-2">
          {currentStep.descriptionHi}
        </p>

        {/* Route info */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-text-muted">
          <span>Active Route: <code className="text-text font-bold">{currentStep.route}</code></span>
          <button
            onClick={() => navigate(currentStep.route)}
            className="text-st-review hover:underline flex items-center gap-1"
          >
            <span>Jump to View</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Footer Nav Controls */}
      <div className="px-5 py-3 bg-surface-2 border-t border-border flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStepIdx === 0}
          className="px-3 py-1.5 bg-surface hover:bg-surface-2 disabled:opacity-30 rounded text-xs font-mono text-text-muted hover:text-text transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous</span>
        </button>

        {/* Step Selector Pills */}
        <div className="flex items-center gap-1 max-w-[200px] overflow-x-auto py-1">
          {DEMO_TOUR_STEPS.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => handleGoToStep(idx)}
              className={`w-5 h-5 rounded text-[10px] font-mono transition-colors flex items-center justify-center ${
                currentStepIdx === idx
                  ? 'bg-ochre text-text font-bold'
                  : 'bg-surface-2 text-slate hover:text-text'
              }`}
              title={`Step ${s.stepNumber}: ${s.titleEn}`}
            >
              {s.stepNumber}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentStepIdx === DEMO_TOUR_STEPS.length - 1}
          className="px-3.5 py-1.5 bg-ochre hover:bg-ochre/90 disabled:opacity-30 text-text font-mono text-xs font-bold rounded transition-colors flex items-center gap-1"
        >
          <span>Next Step</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
