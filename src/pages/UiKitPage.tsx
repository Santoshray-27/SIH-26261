import React, { useState } from 'react';
import { StatusPill } from '../components/ui/StatusPill';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Drawer } from '../components/ui/Drawer';
import { Kbd } from '../components/ui/Kbd';
import { useI18n } from '../i18n/useI18n';
import { useAppStore } from '../store/useAppStore';
import { VerificationStatus } from '../types/domain';
import { Sun, Moon, Info, ShieldAlert } from 'lucide-react';

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

export const UiKitPage: React.FC = () => {
  const { t, language, toggleLanguage } = useI18n();
  const { theme, toggleTheme, addToast } = useAppStore();
  const [activeTab, setActiveTab] = useState('pills');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Editorial Header */}
      <div className="border-b border-hairline pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-slate">
            System Design Specification · §3.3
          </span>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight mt-1">
            Pramāṇa UI Primitives & Status Vocabulary
          </h1>
          <p className="font-mono text-xs text-slate mt-2 max-w-2xl">
            Strict verification vocabulary derived from AICTE regulatory compliance design.
            Never collapse unknown states into a binary pass/fail verdict.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="flex items-center gap-2"
          >
            {theme === 'paper' ? <Moon size={13} /> : <Sun size={13} />}
            <span>Theme: {theme}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <span>Lang: {language.toUpperCase()}</span>
          </Button>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'pills', label: 'All 13 Status Pills', badge: '13' },
          { id: 'buttons', label: 'Buttons & Auditor Intercept' },
          { id: 'cards', label: 'Editorial Cards & Drawers' },
          { id: 'typography', label: 'Editorial Typography & Tokens' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-8"
      />

      {/* TAB 1: ALL STATUS PILLS */}
      {activeTab === 'pills' && (
        <div className="space-y-6">
          <Card variant="editorial">
            <div className="flex items-center gap-3 mb-4">
              <Info size={18} className="text-slate" />
              <div>
                <h3 className="font-display font-bold text-lg">
                  Verification Status Taxonomy (§3.3)
                </h3>
                <p className="font-mono text-xs text-slate">
                  Hover or focus each pill to view its required caveat tooltip (what it does NOT prove).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-hairline">
                <thead className="bg-bone/40 dark:bg-ink-dark/60 text-slate uppercase text-[11px] border-b border-hairline">
                  <tr>
                    <th className="p-3">Raw Enum Status</th>
                    <th className="p-3">Visual Status Pill (English / हिन्दी)</th>
                    <th className="p-3">Styling Rule</th>
                    <th className="p-3">Evidence Caveat (Tooltip Content)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {allStatuses.map((status) => (
                    <tr
                      key={status}
                      className="hover:bg-bone/20 dark:hover:bg-ink-dark/20 transition-colors"
                    >
                      <td className="p-3 font-semibold text-ink dark:text-paper">
                        <code>{status}</code>
                      </td>
                      <td className="p-3">
                        <StatusPill status={status} size="md" />
                      </td>
                      <td className="p-3 text-slate text-[11px]">
                        {status === 'PASS' && 'Verdigris solid'}
                        {(status === 'DEFICIENCY_FOUND' || status === 'MISMATCH_FOUND' || status === 'SIGNATURE_INVALID_OR_BROKEN') && 'Vermilion solid'}
                        {(status === 'POSSIBLE_DUPLICATE' || status === 'MANUAL_REVIEW_REQUIRED') && 'Ochre solid'}
                        {status === 'GEOTAG_ABSENT' && 'Ochre outline'}
                        {status === 'LOW_CONFIDENCE_EXTRACTION' && 'Ochre dotted'}
                        {status === 'STRUCTURE_INDICATOR' && 'Indigo solid'}
                        {(status === 'SOURCE_UNAVAILABLE' || status === 'VERIFICATION_PENDING') && 'Slate dashed'}
                        {status === 'CHECK_NOT_RUN' && 'Hollow outline w/ diagonal hatch'}
                        {status === 'SIGNATURE_VALID' && 'Verdigris solid'}
                      </td>
                      <td className="p-3 text-slate leading-relaxed">
                        {t.statuses[status]?.caveat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 2: BUTTONS & AUDITOR ROLE */}
      {activeTab === 'buttons' && (
        <div className="space-y-6">
          <Card variant="ledger" sectionNumber="01">
            <h3 className="font-display font-bold text-xl mb-2">
              Action Primitives & Auditor Intercept
            </h3>
            <p className="font-mono text-xs text-slate mb-6">
              Auditor role is strictly read-only. Clicking mutating actions under "auditor" role automatically fires a 403 Toast.
            </p>

            <div className="flex flex-wrap gap-4 items-center mb-8">
              <Button
                variant="primary"
                isWritingAction
                onClick={() => addToast('Mutating action successful (Officer role)', 'success')}
              >
                Approve Rectification (Mutating)
              </Button>
              <Button
                variant="secondary"
                isWritingAction
                onClick={() => addToast('Notice generated (Officer role)', 'info')}
              >
                Draft Notice (Mutating)
              </Button>
              <Button variant="outline">
                Inspect Document (Read-Only)
              </Button>
              <Button
                variant="danger"
                isWritingAction
                onClick={() => addToast('Escalated to Vigilance Bureau', 'error')}
              >
                Escalate Suspected Duplicate
              </Button>
            </div>

            <div className="p-4 bg-bone/30 dark:bg-ink-dark border border-hairline font-mono text-xs text-slate">
              <div className="flex items-center gap-2 text-ink dark:text-paper font-semibold mb-1">
                <ShieldAlert size={15} className="text-vermilion" />
                <span>Auditor Access Test</span>
              </div>
              <p>
                Switch role above to <strong>Auditor (Read-Only)</strong> and click any red/black mutating button above.
                It will trigger the required 403 toast without executing state modifications.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: CARDS & DRAWERS */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          <Card variant="editorial" sectionNumber="02">
            <h3 className="font-display font-bold text-xl mb-2">Evidence Drawer Primitive</h3>
            <p className="font-mono text-xs text-slate mb-4">
              Slide-over inspector for deep-dive evidence, side-by-side verification and OCR provenance.
            </p>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>
              Open Evidence Inspection Drawer
            </Button>
          </Card>

          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Evidence Inspector · Finding FIND-8801-02"
            subtitle="Affidavit vs State NOC Institutional Title Mismatch"
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3 border border-vermilion bg-vermilion-light/30 dark:bg-[#2b1210]">
                <div className="font-bold text-vermilion mb-1">Mismatch Found (§3.3)</div>
                <p className="text-slate">
                  String similarity score 0.81. Institutional identity discordance detected.
                </p>
              </div>

              <div className="border border-hairline p-3">
                <span className="text-slate block text-[10px] uppercase">Declared in Affidavit</span>
                <p className="font-semibold text-sm mt-1">Sri Vidya Inst of Technology</p>
              </div>

              <div className="border border-hairline p-3">
                <span className="text-slate block text-[10px] uppercase">State Government NOC Record</span>
                <p className="font-semibold text-sm mt-1">Sri Vidya College of Engineering & Tech</p>
              </div>

              <div className="pt-4 flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  isWritingAction
                  onClick={() => {
                    addToast('Clarification request registered', 'success');
                    setDrawerOpen(false);
                  }}
                >
                  Request Clarification
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDrawerOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      )}

      {/* TAB 4: TYPOGRAPHY & KEYBOARD */}
      {activeTab === 'typography' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="editorial">
            <h3 className="font-display font-bold text-xl mb-4">Editorial Font Hierarchy</h3>
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs text-slate">Display: Fraunces / Noto Serif Devanagari</span>
                <p className="font-display font-bold text-2xl tracking-tight mt-1">
                  प्रमाण — Evidence & Authenticity Ledger
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-slate">Mono: JetBrains Mono (IDs & Hashes)</span>
                <p className="font-mono text-xs text-ink dark:text-paper mt-1 break-all">
                  SHA-256: d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592
                </p>
              </div>
            </div>
          </Card>

          <Card variant="editorial">
            <h3 className="font-display font-bold text-xl mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-hairline">
                <span>Navigate findings</span>
                <div className="flex gap-1">
                  <Kbd>J</Kbd>
                  <Kbd>K</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-hairline">
                <span>Approve finding</span>
                <Kbd>A</Kbd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-hairline">
                <span>Escalate duplicate</span>
                <Kbd>E</Kbd>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
