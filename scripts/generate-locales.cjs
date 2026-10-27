const fs = require('fs');
const path = require('path');

const en = {
  common: {
    appName: "Sakshya‑I5",
    appNamePlain: "Sakshya-I5",
    appSubTitle: "AICTE Regulatory Compliance & Document Authentication Engine",
    tagline: "Evidence-first application validation",
    proposedFor: "Proposed solution for AICTE",
    notOfficial: "Not an official website of AICTE or Govt. of India. All data is synthetic.",
    disclaimer: "Prototype built for Smart India Hackathon 2026. Proposed solution for AICTE. This is not an official website of AICTE or the Government of India. All data is synthetic.",
    prototypeBanner: "Prototype — synthetic data; external issuer response is simulated. · Proposed solution for AICTE · Not an official website.",
    designedNow: "Designed now · built in Phase 4",
    role: "Role",
    language: "Language",
    search: "Search...",
    filter: "Filter",
    status: "Status",
    actions: "Actions",
    viewDetails: "View Details",
    back: "Back",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    submit: "Submit",
    loading: "Loading synthetic evidence...",
    readOnlyAlert: "Read-only role (403): Auditors have strictly read-only observation rights.",
    coverageRatio: "Mandatory Checks Coverage",
    limitingSignal: "Primary Blocking Reason (Limiting Signal)",
    evidenceGate: "Evidence Sufficiency Gate",
    auditTrail: "Tamper-Evident Audit Trail",
    replayNotice: "Decision Replay executes case under historical rule version.",
    phaseTag: "SIH-26261 · AICTE",
    lastUpdated: "Last Updated",
    skipToMain: "Skip to main content",
    textSize: "Text Size",
    contrast: "High Contrast",
    accessibility: "Accessibility",
    helpdesk: "team-contact@placeholder.invalid",
    quickServices: "Quick Services",
    howItWorks: "How It Works",
    everyFindingLinked: "Every finding is evidence-linked",
    threeLayers: "Three Separate Architecture Layers",
    whatNotClaim: "What Sakshya‑I5 Will NOT Claim",
    roadmap: "Development Roadmap",
    faq: "Frequently Asked Questions",
    helpAndContact: "Help & Contact"
  },
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    howItWorks: "How It Works",
    resources: "Resources",
    help: "Help",
    precheck: "Applicant Pre-Check",
    officer: "Officer Console",
    evidenceTools: "Evidence Tools",
    rules: "Rule Governance",
    audit: "Audit Ledger",
    reports: "Reports & CSV",
    network: "Network Graph",
    uiKit: "UI Kit & Tokens",
    faq: "FAQ",
    docs: "Documentation",
    accessibility: "Accessibility Statement",
    guidedDemo: "Guided Demo",
    dashboard: "Officer Queue",
    cases: "Applications"
  },
  landing: {
    heroTitle: "Sakshya‑I5 — evidence-first application validation for AICTE",
    heroDesc: "A tamper-evident compliance assessment platform linking AICTE handbook criteria to cryptographic document proof, deterministic calculations, and officer-first adjudication.",
    openPrecheck: "Open Applicant Pre-Check",
    officerConsole: "Officer Review Console",
    searchPlaceholder: "Search a service or case ID (e.g. APP-2026-8801)...",
    trustChip1: "Rule-linked evidentiary findings",
    trustChip2: "Human decision stays with the officer",
    trustChip3: "Tamper-evident hash-chain audit",
    quickTiles: {
      precheck: "Self-Check Dossier",
      duplicate: "SHA-256 Duplication",
      geotag: "Campus Geotag Audit",
      floorplan: "Shoelace Area Measure"
    },
    stepper: {
      step1Title: "1. Intake & Pre-Check",
      step1Desc: "Applicants run deterministic offline checks catching fixable deficiencies prior to statutory filing.",
      step2Title: "2. Formal Submission",
      step2Desc: "Institutions submit affidavits, land deeds, and NOCs with preserved immutable SHA-256 digests.",
      step3Title: "3. Automated Checks",
      step3Desc: "Document layout analysis, signature chain parsing, Haversine geotag math, and mock issuer queries execute.",
      step4Title: "4. Sufficiency Gate",
      step4Desc: "Evaluates the weakest limiting signal. No case proceeds to decision if mandatory checks are incomplete.",
      step5Title: "5. Officer Adjudication",
      step5Desc: "Officer reviews evidence bounding boxes, issues clarification notices, or supersedes values with audit logs."
    }
  },
  status: {
    PASS: {
      label: "Pass",
      caveat: "Does NOT prove all factual claims in document are true."
    },
    DEFICIENCY_FOUND: {
      label: "Deficiency Found",
      caveat: "Document fails explicit handbook criteria; fixable gap."
    },
    MISMATCH_FOUND: {
      label: "Mismatch Found",
      caveat: "Inconsistency between two records; does not prove forgery."
    },
    POSSIBLE_DUPLICATE: {
      label: "Possible Duplicate",
      caveat: "SHA-256 match found; requires contextual human review."
    },
    SIGNATURE_VALID: {
      label: "Signature Valid",
      caveat: "Cryptographic check passed; does NOT certify truth of document claims."
    },
    SIGNATURE_INVALID_OR_BROKEN: {
      label: "Signature Invalid / Broken",
      caveat: "Certificate or digest verification failed under trust policy."
    },
    SOURCE_UNAVAILABLE: {
      label: "Source Unavailable",
      caveat: "External issuer API could not be reached; NOT a negative finding."
    },
    VERIFICATION_PENDING: {
      label: "Verification Pending",
      caveat: "Awaiting asynchronous source response or human review."
    },
    LOW_CONFIDENCE_EXTRACTION: {
      label: "Low-Confidence Extraction",
      caveat: "OCR confidence below floor; requires human confirmation."
    },
    MANUAL_REVIEW_REQUIRED: {
      label: "Manual Review Required",
      caveat: "Ambiguous handbook clause or unresolved discrepancy."
    },
    CHECK_NOT_RUN: {
      label: "Check Not Run",
      caveat: "Mandatory check did not execute; case evidence incomplete."
    },
    GEOTAG_ABSENT: {
      label: "Geotag Absent",
      caveat: "EXIF location absent; more evidence needed, not an automatic failure."
    },
    STRUCTURE_INDICATOR: {
      label: "Structure Indicator",
      caveat: "PDF revision or font anomaly detected; indicator, requires review."
    }
  },
  officer: {
    queueTitle: "Institutional Verification Ledger",
    queueSubTitle: "AICTE Approval Process Handbook (APH 2026-27) Case Review Queue",
    categoryFilter: "Category Filter",
    allCategories: "All Categories",
    totalApplications: "Total Applications",
    reviewAction: "Review Dossier",
    findingReview: "Adjudication Workstation",
    correctField: "Correct Extracted Value",
    draftNotice: "Draft Clarification Notice",
    escalateCase: "Escalate to Senior Officer",
    resolveFinding: "Mark Finding Resolved"
  },
  evidence: {
    duplicateTitle: "SHA-256 Document Duplicate Check",
    structureTitle: "PDF Structure & Byte-Level Inspection",
    signatureTitle: "Digital Signature Verification",
    geotagTitle: "Campus Photo Geotag Verification",
    floorplanTitle: "Architectural Floor-Plan Area Measurement",
    videoTitle: "Video Frame Strip & Tamper Analysis",
    qrTitle: "Official QR Code Sandbox"
  },
  rules: {
    governanceTitle: "Regulatory Rule Governance & Readiness Profiles",
    activePack: "Active Rulepack Specification",
    lifecycleBoard: "Rule Lifecycle Stages",
    formulaViewer: "APH Formula Definitions"
  },
  audit: {
    ledgerTitle: "Cryptographic Proof Ledger",
    ledgerSubTitle: "Sequential SHA-256 block hash-chain linking all officer actions and system evaluations",
    verifyChain: "Verify Audit Chain",
    simulateTamper: "Simulate Tampering",
    checkpointStatus: "Published Checkpoint Verification"
  },
  portals: {
    portalATitle: "Ministry of Education Affiliation Portal (Mock Host A)",
    portalBTitle: "State Higher Education Technical Gateway (Mock Host B)",
    isolatedNote: "Demonstrates style-isolated iframe embed without CSS leakage"
  },
  widget: {
    widgetTitle: "Sakshya‑I5 Applicant Pre-Check",
    widgetSubtitle: "Deterministic compliance scan before official submission",
    dropzoneTitle: "Select or Drop Compliance Dossier",
    runPrecheck: "Run Instant Pre-Check",
    mandatoryChecklist: "Mandatory Verification Checklist"
  },
  notices: {
    noticeDraftTitle: "Draft Clarification Notice",
    statutoryRef: "Statutory Reference",
    applicantDeadline: "Rectification Window: 7 Working Days"
  },
  legal: {
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Use",
    accessibilityTitle: "Accessibility Statement",
    disclaimerTitle: "Disclaimer",
    sitemapTitle: "Sitemap",
    helpTitle: "Help & Technical Contact"
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Understanding Sakshya‑I5 purpose, scope, and technical design",
    q1: "What is Sakshya‑I5?",
    a1: "Sakshya‑I5 is a prototype regulatory compliance and document authentication engine designed for Smart India Hackathon 2026 (SIH-26261). It connects AICTE Approval Process Handbook criteria to verifiable cryptographic proof.",
    q2: "Is Sakshya‑I5 an official Government of India website?",
    a2: "No. Sakshya‑I5 is a student-built prototype solution proposal for AICTE. It is not affiliated with or endorsed by AICTE or the Government of India.",
    q3: "Does Sakshya‑I5 automatically approve or reject applications?",
    a3: "No. Sakshya‑I5 strictly enforces an Evidence Sufficiency Gate. It verifies whether mandatory checks have run and evidence is present. Final approval or rejection remains solely with authorized AICTE officers.",
    q4: "What data does this prototype use?",
    a4: "All institutional applications, land deeds, NOC certificates, and affidavits displayed in this prototype are 100% synthetic mock fixtures. No real personal records are stored or processed.",
    q5: "Which parts are simulated versus real?",
    a5: "SHA-256 client digesting, Shoelace area calculation, Haversine coordinate math, CSV formula sanitization, and audit hash-chain verification run real code locally. External issuer APIs (such as state land registries) are simulated with synthetic responses.",
    q6: "How are compliance rules sourced?",
    a6: "Rules directly reflect the AICTE Approval Process Handbook (APH 2026-27), with each finding citing exact handbook appendix clauses and formula norms.",
    q7: "Does the platform support multiple Indian languages?",
    a7: "Yes. The interface is available in both English and हिन्दी, with Devanagari typography tuned for readability without diacritic clipping.",
    q8: "What accessibility standards does Sakshya‑I5 follow?",
    a8: "Sakshya‑I5 adheres to WCAG 2.1 AA standards, featuring high contrast, A- A A+ font scaling, skip to main content navigation, and full keyboard operability."
  }
};

const hi = {
  common: {
    appName: "साक्ष्य‑I5",
    appNamePlain: "साक्ष्य-I5",
    appSubTitle: "AICTE नियामक अनुपालन एवं दस्तावेज़ साक्ष्य सत्यापन प्रणाली",
    tagline: "साक्ष्य-आधारित आवेदन सत्यापन",
    proposedFor: "AICTE के लिए प्रस्तावित समाधान",
    notOfficial: "यह AICTE या भारत सरकार की आधिकारिक वेबसाइट नहीं है। सभी डेटा कृत्रिम (सिंथेटिक) है।",
    disclaimer: "स्मार्ट इंडिया हैकाथॉन 2026 के लिए निर्मित प्रोटोटाइप। AICTE के लिए प्रस्तावित समाधान। यह AICTE या भारत सरकार की आधिकारिक वेबसाइट नहीं है। सभी डेटा कृत्रिम है।",
    prototypeBanner: "प्रोटोटाइप — कृत्रिम डेटा; बाहरी जारीकर्ता अनुक्रिया सिम्युलेटेड है। · AICTE के लिए प्रस्तावित समाधान · आधिकारिक वेबसाइट नहीं।",
    designedNow: "अब डिज़ाइन किया गया · चरण 4 में निर्मित",
    role: "भूमिका",
    language: "भाषा",
    search: "खोजें...",
    filter: "फ़िल्टर",
    status: "स्थिति",
    actions: "कार्रवाई",
    viewDetails: "विवरण देखें",
    back: "वापस",
    cancel: "रद्द करें",
    confirm: "पुष्टि करें",
    save: "सहेजें",
    submit: "जमा करें",
    loading: "कृत्रिम साक्ष्य लोड हो रहा है...",
    readOnlyAlert: "केवल-पठन भूमिका (403): लेखा परीक्षकों के पास केवल अवलोकन अधिकार हैं।",
    coverageRatio: "अनिवार्य जांच कवरेज",
    limitingSignal: "मुख्य रुकावट (निर्णय रोकने वाला कारण)",
    evidenceGate: "साक्ष्य पर्याप्तता द्वार",
    auditTrail: "छेड़छाड़-प्रमाणित ऑडिट ट्रेल",
    replayNotice: "निर्णय पुनरावृत्ति ऐतिहासिक नियम संस्करण के तहत मामला निष्पादित करती है।",
    phaseTag: "एसआईएच-26261 · एआईसीटीई",
    lastUpdated: "अंतिम अद्यतन",
    skipToMain: "मुख्य सामग्री पर जाएं",
    textSize: "फ़ॉन्ट आकार",
    contrast: "उच्च कंट्रास्ट",
    accessibility: "अभिगम्यता (एक्सेसिबिलिटी)",
    helpdesk: "team-contact@placeholder.invalid",
    quickServices: "त्वरित सेवाएं",
    howItWorks: "यह कैसे काम करता है",
    everyFindingLinked: "प्रत्येक निष्कर्ष साक्ष्य से जुड़ा है",
    threeLayers: "तीन अलग-अलग संरचनात्मक परतें",
    whatNotClaim: "साक्ष्य‑I5 क्या दावा नहीं करेगा",
    roadmap: "विकास रोडमैप",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    helpAndContact: "सहायता एवं संपर्क"
  },
  nav: {
    home: "होम",
    about: "परिचय",
    services: "सेवाएं",
    howItWorks: "कार्यप्रणाली",
    resources: "संसाधन",
    help: "सहायता",
    precheck: "आवेदक पूर्व-जांच",
    officer: "अधिकारी कंसोल",
    evidenceTools: "फोरेंसिक उपकरण",
    rules: "नियम शासन",
    audit: "ऑडिट बहीखाता",
    reports: "रिपोर्ट्स और सीएसवी",
    network: "संबद्धता ग्राफ",
    uiKit: "यूआई किट और टोकन",
    faq: "अक्सर पूछे जाने वाले प्रश्न",
    docs: "दस्तावेज़ीकरण",
    accessibility: "अभिगम्यता विवरण",
    guidedDemo: "मार्गदर्शित डेमो",
    dashboard: "अधिकारी कतार",
    cases: "आवेदन सूची"
  },
  landing: {
    heroTitle: "साक्ष्य‑I5 — AICTE के लिए साक्ष्य-आधारित आवेदन सत्यापन",
    heroDesc: "एक छेड़छाड़-प्रमाणित नियामक अनुपालन मंच जो AICTE पुस्तिका के नियमों को क्रिप्टोग्राफ़िक दस्तावेज़ साक्ष्य, गणितीय गणनाओं और अधिकारी-प्रथम समीक्षा से जोड़ता है।",
    openPrecheck: "आवेदक पूर्व-जांच खोलें",
    officerConsole: "अधिकारी समीक्षा कंसोल",
    searchPlaceholder: "सेवा या आवेदन संख्या खोजें (उदा. APP-2026-8801)...",
    trustChip1: "नियम-संबद्ध साक्ष्य निष्कर्ष",
    trustChip2: "अंतिम निर्णय अधिकारी के पास",
    trustChip3: "छेड़छाड़-प्रमाणित ऑडिट ट्रेल",
    quickTiles: {
      precheck: "स्वयं-जांच दस्तावेज़",
      duplicate: "SHA-256 नकल जांच",
      geotag: "परिसर जियोटैग ऑडिट",
      floorplan: "कमरा क्षेत्रफल मापन"
    },
    stepper: {
      step1Title: "1. दस्तावेज़ और पूर्व-जांच",
      step1Desc: "आवेदक औपचारिक प्रस्तुतीकरण से पहले सुधार योग्य कमियों को स्वयं जांचते हैं।",
      step2Title: "2. औपचारिक प्रस्तुतीकरण",
      step2Desc: "संस्थान हलफनामे, भूमि अभिलेख और एनओसी सुरक्षित SHA-256 डाइजेस्ट के साथ जमा करते हैं।",
      step3Title: "3. स्वचालित जांच",
      step3Desc: "दस्तावेज़ संरचना विश्लेषण, डिजिटल हस्ताक्षर सत्यापन और जियोटैग दूरी की जांच होती है।",
      step4Title: "4. पर्याप्तता द्वार",
      step4Desc: "यदि कोई भी अनिवार्य जांच अधूरी है, तो मामला निर्णय के लिए आगे नहीं बढ़ता।",
      step5Title: "5. अधिकारी निर्णय",
      step5Desc: "अधिकारी साक्ष्य का अवलोकन करते हैं, स्पष्टीकरण मांगते हैं या रिकॉर्ड सुरक्षित रखते हैं।"
    }
  },
  status: {
    PASS: {
      label: "उत्तीर्ण (Pass)",
      caveat: "यह सिद्ध नहीं करता कि दस्तावेज़ के सभी दावे सत्य हैं।"
    },
    DEFICIENCY_FOUND: {
      label: "कमी पाई गई (Deficiency Found)",
      caveat: "दस्तावेज़ पुस्तिका मानदंड पूरा नहीं करता; सुधरने योग्य अंतर।"
    },
    MISMATCH_FOUND: {
      label: "विसंगति पाई गई (Mismatch Found)",
      caveat: "दो रिकॉर्डों के बीच अंतर; यह जालसाज़ी साबित नहीं करता।"
    },
    POSSIBLE_DUPLICATE: {
      label: "संभावित प्रतिलिपि (Duplicate)",
      caveat: "समान फ़ाइल पाई गई; मानवीय समीक्षा आवश्यक है।"
    },
    SIGNATURE_VALID: {
      label: "हस्ताक्षर वैध",
      caveat: "क्रिप्टोग्राफिक जांच सफल; दावों की सत्यता प्रमाणित नहीं करता।"
    },
    SIGNATURE_INVALID_OR_BROKEN: {
      label: "हस्ताक्षर अमान्य या खंडित",
      caveat: "प्रमाणपत्र या डाइजेस्ट सत्यापन विफल रहा।"
    },
    SOURCE_UNAVAILABLE: {
      label: "स्रोत अनुपलब्ध",
      caveat: "बाहरी एपीआई से संपर्क नहीं हो सका; यह नकारात्मक परिणाम नहीं है।"
    },
    VERIFICATION_PENDING: {
      label: "सत्यापन लंबित",
      caveat: "बाहरी प्रतिक्रिया या मानवीय समीक्षा की प्रतीक्षा है।"
    },
    LOW_CONFIDENCE_EXTRACTION: {
      label: "अस्पष्ट निष्कर्षण",
      caveat: "अस्पष्ट स्कैन; मानवीय पुष्टि की आवश्यकता है।"
    },
    MANUAL_REVIEW_REQUIRED: {
      label: "समीक्षा आवश्यक",
      caveat: "अस्पष्ट खंड या अनसुलझी विसंगति।"
    },
    CHECK_NOT_RUN: {
      label: "जांच नहीं चली",
      caveat: "अनिवार्य जांच नहीं चली; साक्ष्य अधूरा है।"
    },
    GEOTAG_ABSENT: {
      label: "जियोटैग अनुपस्थित",
      caveat: "स्थान डेटा अनुपस्थित; अतिरिक्त साक्ष्य आवश्यक है।"
    },
    STRUCTURE_INDICATOR: {
      label: "संरचना संकेतक",
      caveat: "संशोधन या फ़ॉन्ट विसंगति पाई गई; समीक्षा योग्य संकेतक।"
    }
  },
  officer: {
    queueTitle: "संस्थागत सत्यापन बहीखाता",
    queueSubTitle: "AICTE अनुमोदन प्रक्रिया पुस्तिका (APH 2026-27) समीक्षा कतार",
    categoryFilter: "श्रेणी फ़िल्टर",
    allCategories: "सभी श्रेणियां",
    totalApplications: "कुल आवेदन",
    reviewAction: "दस्तावेज़ समीक्षा करें",
    findingReview: "निर्णय कार्यस्थल",
    correctField: "मान सही करें",
    draftNotice: "स्पष्टीकरण सूचना तैयार करें",
    escalateCase: "वरिष्ठ अधिकारी को भेजें",
    resolveFinding: "समस्या का समाधान चिह्नित करें"
  },
  evidence: {
    duplicateTitle: "SHA-256 दस्तावेज़ प्रतिलिपि जांच",
    structureTitle: "पीडीएफ संरचना एवं बाइट-स्तरीय निरीक्षण",
    signatureTitle: "डिजिटल हस्ताक्षर सत्यापन",
    geotagTitle: "परिसर फोटो जियोटैग सत्यापन",
    floorplanTitle: "भवन तल-योजना क्षेत्रफल मापन",
    videoTitle: "वीडियो फ्रेम एवं अखंडता विश्लेषण",
    qrTitle: "आधिकारिक क्यूआर कोड सैंडबॉक्स"
  },
  rules: {
    governanceTitle: "नियामक नियम शासन और तत्परता प्रोफाइल",
    activePack: "सक्रिय नियमपुस्तिका विनिर्देश",
    lifecycleBoard: "नियम जीवन-चक्र चरण",
    formulaViewer: "APH सूत्र परिभाषाएं"
  },
  audit: {
    ledgerTitle: "क्रिप्टोग्राफ़िक साक्ष्य बहीखाता",
    ledgerSubTitle: "सभी अधिकारी कार्रवाइयों और स्वचालित जांचों को जोड़ने वाली SHA-256 ब्लॉक हैश-श्रृंखला",
    verifyChain: "ऑडिट श्रृंखला सत्यापित करें",
    simulateTamper: "छेड़छाड़ का अनुकरण करें",
    checkpointStatus: "सार्वजनिक चेकपॉइंट सत्यापन"
  },
  portals: {
    portalATitle: "शिक्षा मंत्रालय संबद्धता पोर्टल (मॉक होस्ट ए)",
    portalBTitle: "राज्य उच्च शिक्षा तकनीकी पोर्टल (मॉक होस्ट बी)",
    isolatedNote: "बिना किसी स्टाइल हस्तक्षेप के सुरक्षित आईफ्रेम एम्बेड प्रदर्शित करता है"
  },
  widget: {
    widgetTitle: "साक्ष्य‑I5 आवेदक पूर्व-जांच",
    widgetSubtitle: "औपचारिक आवेदन से पूर्व सुधारात्मक कमियों की जांच",
    dropzoneTitle: "अनुपालन दस्तावेज़ चुनें या खींचें",
    runPrecheck: "तुरंत पूर्व-जांच चलाएं",
    mandatoryChecklist: "अनिवार्य सत्यापन चेकलिस्ट"
  },
  notices: {
    noticeDraftTitle: "स्पष्टीकरण सूचना प्रारूप",
    statutoryRef: "सांविधिक संदर्भ",
    applicantDeadline: "सुधार समय सीमा: 7 कार्य दिवस"
  },
  legal: {
    privacyTitle: "गोपनीयता नीति",
    termsTitle: "उपयोग की शर्तें",
    accessibilityTitle: "अभिगम्यता विवरण",
    disclaimerTitle: "अस्वीकरण (डिसक्लेमर)",
    sitemapTitle: "साइटमैप",
    helpTitle: "सहायता एवं तकनीकी संपर्क"
  },
  faq: {
    title: "अक्सर पूछे जाने वाले प्रश्न",
    subtitle: "साक्ष्य‑I5 के उद्देश्य, कार्यक्षेत्र और तकनीकी संरचना की जानकारी",
    q1: "साक्ष्य‑I5 क्या है?",
    a1: "साक्ष्य‑I5 स्मार्ट इंडिया हैकाथॉन 2026 (SIH-26261) के लिए तैयार किया गया एक नियामक अनुपालन और दस्तावेज़ सत्यापन प्रोटोटाइप है।",
    q2: "क्या साक्ष्य‑I5 भारत सरकार की आधिकारिक वेबसाइट है?",
    a2: "नहीं। यह छात्रों द्वारा बनाया गया एक प्रोटोटाइप प्रस्ताव है। यह AICTE या भारत सरकार द्वारा आधिकारिक रूप से संचालित नहीं है।",
    q3: "क्या साक्ष्य‑I5 स्वतः आवेदन स्वीकृत या अस्वीकृत करता है?",
    a3: "नहीं। यह केवल साक्ष्य पर्याप्तता द्वार का पालन करता है। अंतिम अनुमोदन का निर्णय केवल प्राधिकृत अधिकारी लेते हैं।",
    q4: "इस प्रोटोटाइप में किस डेटा का उपयोग किया गया है?",
    a4: "इस प्रोटोटाइप में प्रदर्शित सभी संस्थागत आवेदन, भूमि रिकॉर्ड और एनओसी 100% कृत्रिम (सिंथेटिक) हैं।",
    q5: "कौन से भाग वास्तविक हैं और कौन से सिम्युलेटेड?",
    a5: "SHA-256 हैशिंग, शूलेस क्षेत्रफल गणना, हावरसाइन दूरी और ऑडिट हैश-चेन सत्यापन ब्राउज़र में वास्तविक रूप से चलते हैं। बाहरी जारीकर्ता सर्वर सिम्युलेटेड हैं।",
    q6: "नियम कहां से लिए गए हैं?",
    a6: "नियम सीधे AICTE अनुमोदन प्रक्रिया पुस्तिका (APH 2026-27) से लिए गए हैं।",
    q7: "क्या यह प्रणाली हिंदी भाषा का समर्थन करती है?",
    a7: "हाँ। इंटरफ़ेस अंग्रेजी और हिंदी दोनों भाषाओं में पूरी तरह उपलब्ध है।",
    q8: "साक्ष्य‑I5 किन अभिगम्यता (एक्सेसिबिलिटी) मानकों का पालन करता है?",
    a8: "यह WCAG 2.1 AA मानकों का पालन करता है, जिसमें उच्च कंट्रास्ट, फ़ॉन्ट स्केलिंग और पूर्ण कीबोर्ड संचालन शामिल हैं।"
  }
};

const namespaces = Object.keys(en);

namespaces.forEach(ns => {
  fs.writeFileSync(path.join('src', 'i18n', 'locales', 'en', `${ns}.json`), JSON.stringify(en[ns], null, 2), 'utf8');
  fs.writeFileSync(path.join('src', 'i18n', 'locales', 'hi', `${ns}.json`), JSON.stringify(hi[ns], null, 2), 'utf8');
});

console.log('Successfully generated all locale JSON files!');
