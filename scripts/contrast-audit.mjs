import fs from 'fs';
import path from 'path';

// WCAG relative luminance calculation
function sRGBtoLin(colorChannel) {
  const c = colorChannel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function hexToRgb(hex) {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function luminance(hex) {
  const rgb = hexToRgb(hex);
  return (
    0.2126 * sRGBtoLin(rgb.r) +
    0.7152 * sRGBtoLin(rgb.g) +
    0.0722 * sRGBtoLin(rgb.b)
  );
}

function contrastRatio(hex1, hex2) {
  const lum1 = luminance(hex1);
  const lum2 = luminance(hex2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Key token values defined in the system
const tokens = {
  light: {
    bg: '#F3EEE5',            // Paper background
    surface: '#FFFFFF',       // Card/table surface
    surface2: '#E7E0D2',      // Bone accent surface
    text: '#0C0C0B',          // Ink primary text
    textMuted: '#52524E',     // Muted text (AA: >=4.5:1 on #F3EEE5 and #FFFFFF)
    textSubtle: '#6B6B66',    // Subtle/secondary text
    border: 'rgba(12, 12, 11, 0.14)',
    accentVermilion: '#C42E18', // Primary vermilion deficiency accent
    accentVerdigris: '#195B4E', // Pass verdigris
    accentOchre: '#8C5E03',     // Review ochre (high contrast)
    accentIndigo: '#14213D',    // Structure indigo
    accentSlate: '#4E4E4A',     // Unavailable slate
  },
  dark: {
    bg: '#0F0F0E',            // Dark ink background
    surface: '#171715',       // Dark ink surface
    surface2: '#222220',      // Elevated surface
    text: '#EDE7DA',          // Light text
    textMuted: '#A8A8A2',     // Muted text (AA: >=4.5:1 on #0F0F0E and #171715)
    textSubtle: '#888882',
    border: 'rgba(237, 231, 218, 0.12)',
    accentVermilion: '#F25C46', // Vermilion in dark mode
    accentVerdigris: '#2EB89E', // Verdigris in dark mode
    accentOchre: '#E5A622',     // Ochre in dark mode
    accentIndigo: '#8EA4D2',    // Indigo in dark mode
    accentSlate: '#A2A29C',     // Slate in dark mode
  }
};

const checks = [
  // Light Theme Checks
  { name: 'Light: Text on Paper BG', fg: tokens.light.text, bg: tokens.light.bg, target: 4.5 },
  { name: 'Light: Text on White Surface', fg: tokens.light.text, bg: tokens.light.surface, target: 4.5 },
  { name: 'Light: Muted Text on Paper BG', fg: tokens.light.textMuted, bg: tokens.light.bg, target: 4.5 },
  { name: 'Light: Muted Text on Surface', fg: tokens.light.textMuted, bg: tokens.light.surface, target: 4.5 },
  { name: 'Light: Vermilion Accent on Paper', fg: tokens.light.accentVermilion, bg: tokens.light.bg, target: 4.5 },
  { name: 'Light: Verdigris Accent on Paper', fg: tokens.light.accentVerdigris, bg: tokens.light.bg, target: 4.5 },
  { name: 'Light: Ochre Accent on Paper', fg: tokens.light.accentOchre, bg: tokens.light.bg, target: 4.5 },
  { name: 'Light: Indigo Accent on Paper', fg: tokens.light.accentIndigo, bg: tokens.light.bg, target: 4.5 },

  // Dark Theme Checks
  { name: 'Dark: Text on Ink Dark BG', fg: tokens.dark.text, bg: tokens.dark.bg, target: 4.5 },
  { name: 'Dark: Text on Ink Surface', fg: tokens.dark.text, bg: tokens.dark.surface, target: 4.5 },
  { name: 'Dark: Muted Text on Ink Dark BG', fg: tokens.dark.textMuted, bg: tokens.dark.bg, target: 4.5 },
  { name: 'Dark: Muted Text on Surface', fg: tokens.dark.textMuted, bg: tokens.dark.surface, target: 4.5 },
  { name: 'Dark: Vermilion Accent on BG', fg: tokens.dark.accentVermilion, bg: tokens.dark.bg, target: 4.5 },
  { name: 'Dark: Verdigris Accent on BG', fg: tokens.dark.accentVerdigris, bg: tokens.dark.bg, target: 4.5 },
  { name: 'Dark: Ochre Accent on BG', fg: tokens.dark.accentOchre, bg: tokens.dark.bg, target: 4.5 },
  { name: 'Dark: Indigo Accent on BG', fg: tokens.dark.accentIndigo, bg: tokens.dark.bg, target: 4.5 },
];

console.log('========================================================================');
console.log(' PRAMĀṆA — WCAG AA TOKEN CONTRAST RATIO AUDIT');
console.log('========================================================================');
console.log(
  'Pair Name'.padEnd(38) +
  'FG / BG'.padEnd(20) +
  'Ratio'.padEnd(10) +
  'Min'.padEnd(8) +
  'Status'
);
console.log('------------------------------------------------------------------------');

let allPassed = true;
for (const item of checks) {
  const ratio = contrastRatio(item.fg, item.bg);
  const passed = ratio >= item.target;
  if (!passed) allPassed = false;
  const statusStr = passed ? 'PASS (AA)' : 'FAIL';
  console.log(
    item.name.padEnd(38) +
    `${item.fg}/${item.bg}`.padEnd(20) +
    ratio.toFixed(2).padEnd(10) +
    `${item.target}:1`.padEnd(8) +
    statusStr
  );
}

console.log('========================================================================');
if (!allPassed) {
  console.error('Contrast audit failed! Please adjust token definitions.');
  process.exit(1);
} else {
  console.log('All token pairs satisfy WCAG AA contrast requirements.');
  process.exit(0);
}
