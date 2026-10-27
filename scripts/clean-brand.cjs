const fs = require('fs');

if (fs.existsSync('package-lock.json')) {
  let content = fs.readFileSync('package-lock.json', 'utf8');
  content = content.replace(/"name": "pramana-web"/g, '"name": "sakshya-i5-web"');
  fs.writeFileSync('package-lock.json', content, 'utf8');
}

let doc = fs.readFileSync('docs/final-solution.md', 'utf8');
doc = doc.replace('**Sakshya‑I5** (प्रमाण — evidence/proof)', '**Sakshya‑I5** (साक्ष्य = evidence)');
fs.writeFileSync('docs/final-solution.md', doc, 'utf8');

let pre = fs.readFileSync('src/features/precheck-embed/PrecheckEmbedWidget.tsx', 'utf8');
pre = pre.replace("'प्रमाण आवेदक पूर्व-सत्यापन'", "'साक्ष्य\u2011I5 आवेदक पूर्व-सत्यापन'");
fs.writeFileSync('src/features/precheck-embed/PrecheckEmbedWidget.tsx', pre, 'utf8');

let rep = fs.readFileSync('src/pages/officer/VerificationReportsPage.tsx', 'utf8');
rep = rep.replace('pramana-findings-', 'sakshya-i5-findings-');
fs.writeFileSync('src/pages/officer/VerificationReportsPage.tsx', rep, 'utf8');

let ui = fs.readFileSync('src/pages/UiKitPage.tsx', 'utf8');
ui = ui.replace('प्रमाण — Evidence & Authenticity Ledger', 'साक्ष्य\u2011I5 — Evidence & Authenticity Ledger');
fs.writeFileSync('src/pages/UiKitPage.tsx', ui, 'utf8');

console.log('Specific brand occurrences cleaned up successfully!');
