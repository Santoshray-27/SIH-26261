export const en = {
  common: {
    appName: "Sakshya‑I5",
    appSubTitle: "Regulatory Compliance & Document Authentication Engine",
    prototypeBanner: "Prototype — synthetic data; external issuer response is simulated.",
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
  },
  roles: {
    applicant: "Applicant (Institution)",
    officer: "Reviewing Officer",
    senior_officer: "Senior Regulatory Officer",
    auditor: "Independent Auditor (Read-Only)",
  },
  statuses: {
    PASS: {
      label: "Pass",
      caveat: "Does NOT prove all factual claims in document are true.",
    },
    DEFICIENCY_FOUND: {
      label: "Deficiency Found",
      caveat: "Document fails explicit handbook criteria; fixable gap.",
    },
    MISMATCH_FOUND: {
      label: "Mismatch Found",
      caveat: "Inconsistency between two records; does not prove forgery.",
    },
    POSSIBLE_DUPLICATE: {
      label: "Possible Duplicate",
      caveat: "SHA-256 match found; requires contextual human review.",
    },
    SIGNATURE_VALID: {
      label: "Signature Valid",
      caveat: "Cryptographic check passed; does NOT certify truth of document claims.",
    },
    SIGNATURE_INVALID_OR_BROKEN: {
      label: "Signature Invalid / Broken",
      caveat: "Certificate or digest verification failed under trust policy.",
    },
    SOURCE_UNAVAILABLE: {
      label: "Source Unavailable",
      caveat: "External issuer API could not be reached; NOT a negative finding.",
    },
    VERIFICATION_PENDING: {
      label: "Verification Pending",
      caveat: "Awaiting asynchronous source response or human review.",
    },
    LOW_CONFIDENCE_EXTRACTION: {
      label: "Low-Confidence Extraction",
      caveat: "OCR confidence below floor; requires human confirmation.",
    },
    MANUAL_REVIEW_REQUIRED: {
      label: "Manual Review Required",
      caveat: "Ambiguous handbook clause or unresolved discrepancy.",
    },
    CHECK_NOT_RUN: {
      label: "Check Not Run",
      caveat: "Mandatory check did not execute; case evidence incomplete.",
    },
    GEOTAG_ABSENT: {
      label: "Geotag Absent",
      caveat: "EXIF location absent; more evidence needed, not an automatic failure.",
    },
    STRUCTURE_INDICATOR: {
      label: "Structure Indicator",
      caveat: "PDF revision or font anomaly detected; indicator, requires review.",
    },
  },
  findingClasses: {
    rectifiable_gap: "Rectifiable Gap",
    integrity_concern: "Integrity Concern",
    unverifiable_item: "Unverifiable Item",
  },
  environments: {
    LIVE: "LIVE",
    SANDBOX: "SANDBOX",
    SIMULATED: "SIMULATED",
  },
  nav: {
    landing: "Overview",
    dashboard: "Officer Queue",
    cases: "Applications",
    precheck: "Applicant Pre-Check",
    rules: "Rule Governance",
    audit: "Audit Ledger",
    uiKit: "UI Kit & Tokens",
  },
  heroCase: {
    title: "Sri Vidya Institute of Technology (synthetic)",
    type: "Extension of Approval (EoA)",
    id: "APP-2026-8801",
    subtitle: "AICTE Approval Process Handbook 2026-27 Compliance Dossier",
  }
};

export const hi = {
  common: {
    appName: "साक्ष्य‑I5 (Sakshya‑I5)",
    appSubTitle: "नियामक अनुपालन एवं दस्तावेज़ साक्ष्य‑I5ीकरण प्रणाली",
    prototypeBanner: "प्रोटोटाइप — कृत्रिम डेटा; बाहरी जारीकर्ता अनुक्रिया सिम्युलेटेड है।",
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
    auditTrail: "छेड़छाड़-साक्ष्य‑I5ित ऑडिट ट्रेल",
    replayNotice: "निर्णय पुनरावृत्ति ऐतिहासिक नियम संस्करण के तहत मामला निष्पादित करती है।",
    phaseTag: "एसआईएच-26261 · एआईसीटीई",
  },
  roles: {
    applicant: "आवेदक (संस्थान)",
    officer: "समीक्षा अधिकारी",
    senior_officer: "वरिष्ठ नियामक अधिकारी",
    auditor: "स्वतंत्र लेखा परीक्षक (केवल-पठन)",
  },
  statuses: {
    PASS: {
      label: "उत्तीर्ण (Pass)",
      caveat: "यह सिद्ध नहीं करता कि दस्तावेज़ के सभी दावे सत्य हैं।",
    },
    DEFICIENCY_FOUND: {
      label: "कमी पाई गई (Deficiency Found)",
      caveat: "दस्तावेज़ पुस्तिका मानदंड पूरा नहीं करता; सुधरने योग्य अंतर।",
    },
    MISMATCH_FOUND: {
      label: "विसंगति पाई गई (Mismatch Found)",
      caveat: "दो रिकॉर्डों के बीच अंतर; यह जालसाज़ी साबित नहीं करता।",
    },
    POSSIBLE_DUPLICATE: {
      label: "संभावित प्रतिलिपि (Possible Duplicate)",
      caveat: "सटीक SHA-256 मिलान मिला; प्रासंगिक मानवीय समीक्षा आवश्यक है।",
    },
    SIGNATURE_VALID: {
      label: "हस्ताक्षर मान्य (Signature Valid)",
      caveat: "क्रिप्टोग्राफ़िक जांच सफल; यह सभी दावों की सत्यता साक्ष्य‑I5ित नहीं करता।",
    },
    SIGNATURE_INVALID_OR_BROKEN: {
      label: "अमान्य या टूटा हुआ हस्ताक्षर",
      caveat: "साक्ष्य‑I5पत्र या डाइजेस्ट सत्यापन नीति के तहत विफल हुआ।",
    },
    SOURCE_UNAVAILABLE: {
      label: "स्रोत अनुपलब्ध (Source Unavailable)",
      caveat: "बाहरी एपीआई तक नहीं पहुँचा जा सका; यह विफलता नहीं है।",
    },
    VERIFICATION_PENDING: {
      label: "सत्यापन लंबित (Verification Pending)",
      caveat: "अतुल्यकालिक बाहरी प्रतिक्रिया या मानव समीक्षा की प्रतीक्षा।",
    },
    LOW_CONFIDENCE_EXTRACTION: {
      label: "कम विश्वास निष्कर्षण",
      caveat: "ओसीआर विश्वास सीमा से नीचे; मानवीय पुष्टि आवश्यक है।",
    },
    MANUAL_REVIEW_REQUIRED: {
      label: "मैन्युअल समीक्षा आवश्यक",
      caveat: "अस्पष्ट नियम या अनसुलझी विसंगति; स्वचालित निर्णय नहीं।",
    },
    CHECK_NOT_RUN: {
      label: "जांच नहीं चली (Check Not Run)",
      caveat: "अनिवार्य जांच नहीं चली; मामले का साक्ष्य अपूर्ण है।",
    },
    GEOTAG_ABSENT: {
      label: "जियोटैग अनुपस्थित (Geotag Absent)",
      caveat: "स्थान मेटाडेटा अनुपस्थित; अधिक साक्ष्य चाहिए, विफलता नहीं।",
    },
    STRUCTURE_INDICATOR: {
      label: "संरचना संकेतक (Structure Indicator)",
      caveat: "पीडीएफ संशोधन या फ़ॉन्ट विसंगति; संकेतक है, समीक्षा आवश्यक।",
    },
  },
  findingClasses: {
    rectifiable_gap: "सुधार योग्य कमी",
    integrity_concern: "सत्यनिष्ठा चिंता",
    unverifiable_item: "असत्यापनीय वस्तु",
  },
  environments: {
    LIVE: "प्रत्यक्ष (LIVE)",
    SANDBOX: "सैंडबॉक्स (SANDBOX)",
    SIMULATED: "सिम्युलेटेड (SIMULATED)",
  },
  nav: {
    landing: "अवलोकन",
    dashboard: "अधिकारी कतार",
    cases: "आवेदन सूची",
    precheck: "आवेदक पूर्व-जांच",
    rules: "नियम शासन",
    audit: "ऑडिट बही",
    uiKit: "यूआई किट और टोकन",
  },
  heroCase: {
    title: "श्री विद्या प्रौद्योगिकी संस्थान (कृत्रिम)",
    type: "अनुमोदन का विस्तार (EoA)",
    id: "APP-2026-8801",
    subtitle: "एआईसीटीई अनुमोदन प्रक्रिया पुस्तिका 2026-27 अनुपालन",
  }
};
