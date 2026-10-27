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
import { Info, ShieldAlert } from 'lucide-react';

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
  const { addToast } = useAppStore();
  const [activeTab, setActiveTab] = useState('pills');
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 space-y-6 font-sans text-text">
      {/* Editorial Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-text-muted">
            Design Specifications · Sandstone & Teal Theme (§3.3)
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight text-text mt-1 leading-[1.18] pt-1">
            Pramāṇa UI Primitives & Status Taxonomy
          </h1>
          <p className="text-sm font-sans text-text-muted mt-1 max-w-2xl leading-relaxed">
            Strict verification vocabulary for statutory AICTE evidence adjudication. Never collapses unknown or unavailable status into binary pass/fail.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <span>Language: {language.toUpperCase()}</span>
          </Button>
        </div>
      </div>

      <Tabs
        tabs={[
          { id: 'pills', label: 'All 13 Status Pills', badge: '13' },
          { id: 'buttons', label: 'Buttons & Auditor Intercept' },
          { id: 'cards', label: 'Editorial Cards & Drawers' },
          { id: 'typography', label: 'Typography & Readability' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />

      {/* TAB 1: ALL STATUS PILLS */}
      {activeTab === 'pills' && (
        <div className="space-y-6">
          <Card variant="editorial">
            <div className="flex items-center gap-3 mb-4">
              <Info size={18} className="text-accent-2 shrink-0" />
              <div>
                <h3 className="font-display font-bold text-lg text-text">
                  Verification Status Taxonomy (§3.3)
                </h3>
                <p className="text-xs text-text-muted">
                  Every pill displays its required caveat tooltip on hover or keyboard focus explaining what the check does NOT prove.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border border-border">
                <thead className="bg-surface-2 text-text-muted font-mono uppercase text-[11px] border-b border-border">
                  <tr>
                    <th className="p-3">Raw Enum Status</th>
                    <th className="p-3 min-w-[200px]">Visual Status Pill (English / हिन्दी)</th>
                    <th className="p-3">Styling & Non-Color Cue</th>
                    <th className="p-3 min-w-[260px]">Evidence Caveat (Tooltip Content)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {allStatuses.map((status) => (
                    <tr
                      key={status}
                      className="hover:bg-bg-elevated/60 transition-colors"
                    >
                      <td className="p-3 font-semibold font-mono text-text">
                        <code>{status}</code>
                      </td>
                      <td className="p-3">
                        <StatusPill status={status} size="md" />
                      </td>
                      <td className="p-3 text-text-muted text-[11px]">
                        {status === 'PASS' && 'Teal tint solid + Check icon'}
                        {(status === 'DEFICIENCY_FOUND' || status === 'MISMATCH_FOUND') && 'Terracotta tint solid + Alert icon'}
                        {status === 'SIGNATURE_INVALID_OR_BROKEN' && 'Terracotta tint + double border'}
                        {(status === 'POSSIBLE_DUPLICATE' || status === 'MANUAL_REVIEW_REQUIRED') && 'Ochre tint solid + Triangle icon'}
                        {status === 'GEOTAG_ABSENT' && 'Ochre outlined + Triangle icon'}
                        {status === 'LOW_CONFIDENCE_EXTRACTION' && 'Ochre dotted border + Triangle icon'}
                        {status === 'STRUCTURE_INDICATOR' && 'Indigo tint solid + File icon'}
                        {(status === 'SOURCE_UNAVAILABLE' || status === 'VERIFICATION_PENDING') && 'Slate dashed outline + Clock icon'}
                        {status === 'CHECK_NOT_RUN' && 'Hollow outline w/ diagonal hatch pattern'}
                        {status === 'SIGNATURE_VALID' && 'Teal tint solid + Check icon'}
                      </td>
                      <td className="p-3 text-text-muted leading-relaxed">
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
            <h3 className="font-display font-bold text-xl mb-1 text-text">
              Action Primitives & Auditor Intercept
            </h3>
            <p className="text-xs text-text-muted mb-6">
              Auditor role is strictly read-only. Clicking mutating actions under "auditor" role automatically triggers a 403 Toast.
            </p>

            <div className="flex flex-wrap gap-3 items-center mb-8">
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

            <div className="p-4 bg-tint-clay border border-border rounded-xs text-xs text-text-muted">
              <div className="flex items-center gap-2 text-st-deficiency font-semibold mb-1">
                <ShieldAlert size={15} />
                <span>Auditor Access Test</span>
              </div>
              <p>
                Switch role above to <strong>Auditor (Read-Only)</strong> and click any mutating action button above.
                It will trigger the required 403 toast without executing mutations.
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* TAB 3: CARDS & DRAWERS */}
      {activeTab === 'cards' && (
        <div className="space-y-6">
          <Card variant="editorial" sectionNumber="02">
            <h3 className="font-display font-bold text-xl mb-1 text-text">Evidence Drawer Primitive</h3>
            <p className="text-xs text-text-muted mb-4">
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
            <div className="space-y-4 font-sans text-xs">
              <div className="p-3.5 border border-st-deficiency bg-st-deficiency-bg rounded-xs">
                <div className="font-bold text-st-deficiency mb-1">Mismatch Found (§3.3)</div>
                <p className="text-text-muted">
                  String similarity score 0.81. Institutional identity discordance detected between legal affidavit and state register.
                </p>
              </div>

              <div className="border border-border p-3 rounded-xs bg-bg-elevated">
                <span className="text-text-muted block text-[11px] uppercase tracking-wider">Declared in Affidavit</span>
                <p className="font-bold text-sm mt-0.5 text-text">Sri Vidya Inst of Technology</p>
              </div>

              <div className="border border-border p-3 rounded-xs bg-bg-elevated">
                <span className="text-text-muted block text-[11px] uppercase tracking-wider">State Government NOC Record</span>
                <p className="font-bold text-sm mt-0.5 text-text">Sri Vidya College of Engineering & Tech</p>
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

      {/* TAB 4: TYPOGRAPHY & READABILITY */}
      {activeTab === 'typography' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="editorial">
            <h3 className="font-display font-bold text-xl mb-4 text-text">Editorial Font Hierarchy</h3>
            <div className="space-y-4">
              <div>
                <span className="font-mono text-xs text-text-muted">Display / Headings: Fraunces & Noto Serif Devanagari</span>
                <p className="font-display font-bold text-2xl tracking-tight mt-1 text-text leading-[1.25]">
                  प्रमाण — Evidence & Authenticity Ledger
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-text-muted">Body & UI: Geist Sans (15–16px baseline)</span>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                  Clear, accessible editorial typography with strict WCAG AA contrast against all sandstone and tinted surfaces.
                </p>
              </div>
              <div>
                <span className="font-mono text-xs text-text-muted">Mono: JetBrains Mono (IDs & Hashes only)</span>
                <p className="font-mono text-xs text-text mt-1 break-all bg-surface-2 p-2 rounded-xs border border-border">
                  SHA-256: d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592
                </p>
              </div>
            </div>
          </Card>

          <Card variant="editorial">
            <h3 className="font-display font-bold text-xl mb-4 text-text">Keyboard Shortcuts</h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span>Navigate findings</span>
                <div className="flex gap-1">
                  <Kbd>J</Kbd>
                  <Kbd>K</Kbd>
                </div>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span>Simulate Dev Overrides Drawer</span>
                <Kbd>Shift+D</Kbd>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-border">
                <span>Command Palette</span>
                <Kbd>⌘K</Kbd>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
