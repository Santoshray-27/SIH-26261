// Single source of truth for branding - Sakshya-I5
// U+2011 is non-breaking hyphen so 'Sakshya-I5' never wraps across lines.
export const NON_BREAKING_HYPHEN = '\u2011';

export const BRAND = {
  NAME_RAW: 'Sakshya-I5',
  NAME_EN: `Sakshya${NON_BREAKING_HYPHEN}I5`,
  NAME_HI: `साक्ष्य${NON_BREAKING_HYPHEN}I5`,
  GLYPH: 'सा',
  SLUG: 'sakshya-i5',
  EVENT_PREFIX: 'sakshya-i5:',
  STORAGE_KEY_PREFIX: 'sakshya-i5:',
  TAGLINE_EN: 'Evidence-first application validation',
  TAGLINE_HI: 'साक्ष्य-आधारित आवेदन सत्यापन',
  PROPOSED_EN: 'Proposed solution for AICTE',
  PROPOSED_HI: 'AICTE के लिए प्रस्तावित समाधान',
  CONTEXT: 'Smart India Hackathon 2026 · SIH26261',
  DISCLAIMER_EN:
    'Prototype built for Smart India Hackathon 2026. Proposed solution for AICTE. This is not an official website of AICTE or the Government of India. All data is synthetic.',
  DISCLAIMER_HI:
    'स्मार्ट इंडिया हैकाथॉन 2026 के लिए निर्मित प्रोटोटाइप। AICTE के लिए प्रस्तावित समाधान। यह AICTE या भारत सरकार की आधिकारिक वेबसाइट नहीं है। सभी डेटा कृत्रिम (सिंथेटिक) है।',
  HELPDESK_PLACEHOLDER: 'team-contact@placeholder.invalid',
  FORMER_NAME: 'Sakshya‑I5',
} as const;

export default BRAND;
