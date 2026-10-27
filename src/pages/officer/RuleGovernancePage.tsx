import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { RuleDefinition, RuleLifecycleState } from '../../types/domain';
import { defaultReadinessProfile } from '../../data/readinessProfile';
import { useAppStore } from '../../store/useAppStore';
import {
  Scale,
  Lock,
} from 'lucide-react';

export const RuleGovernancePage: React.FC = () => {
  const { currentRole, addToast } = useAppStore();
  const isSenior = currentRole === 'senior_officer';

  const [rules, setRules] = useState<RuleDefinition[]>([]);
  const [selectedRule, setSelectedRule] = useState<RuleDefinition | null>(null);
  const [readinessProfile, setReadinessProfile] = useState(defaultReadinessProfile);
  const [activeBoardTab, setActiveBoardTab] = useState<'BOARD' | 'PROFILE'>('BOARD');

  useEffect(() => {
    async function load() {
      const data = await api.getRules();
      setRules(data);
      if (data.length > 0) setSelectedRule(data[0]);
    }
    load();
  }, []);

  const stages: RuleLifecycleState[] = ['DRAFT', 'SOURCE_VERIFIED', 'REVIEWED', 'ACTIVE', 'RETIRED'];

  const handleUpdateConfidenceFloor = (fieldName: string, newFloor: number) => {
    if (!isSenior) {
      addToast('Readiness profile editing requires Senior Officer role (403)', 'error');
      return;
    }
    setReadinessProfile((prev) => ({
      ...prev,
      perFieldConfidenceFloor: {
        ...prev.perFieldConfidenceFloor,
        [fieldName]: newFloor,
      },
    }));
    addToast(`Confidence floor for ${fieldName} updated to ${newFloor}`, 'success');
  };

  return (
    <div className="space-y-6 text-text font-sans">
      {/* Editorial Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-st-review uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Statutory Rulebook & Readiness Governance · §5</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-display font-black tracking-tight text-text">
            Governed Rule Packs & Readiness Profiles
          </h1>
          <p className="text-sm font-sans text-text-muted mt-1 max-w-2xl">
            Rules progress through a multi-stage statutory lifecycle. Ambiguous or discretion-heavy clauses
            yield <code className="text-st-review font-semibold">MANUAL_REVIEW_REQUIRED</code> rather than false certainty.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 font-sans text-xs shrink-0">
          <button
            onClick={() => setActiveBoardTab('BOARD')}
            className={`px-3.5 py-2 rounded-xs transition-colors border font-medium ${
              activeBoardTab === 'BOARD'
                ? 'bg-tint-teal text-accent-2 border-accent-2 font-bold shadow-subtle'
                : 'bg-surface border-border text-text-muted hover:text-text hover:bg-surface-2'
            }`}
          >
            Rule Lifecycle Board
          </button>
          <button
            onClick={() => setActiveBoardTab('PROFILE')}
            title={isSenior ? 'Edit Readiness Profile' : 'Senior officer only'}
            className={`px-3.5 py-2 rounded-xs transition-colors flex items-center gap-1.5 border font-medium ${
              activeBoardTab === 'PROFILE'
                ? 'bg-tint-teal text-accent-2 border-accent-2 font-bold shadow-subtle'
                : 'bg-surface border-border text-text-muted hover:text-text hover:bg-surface-2'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Readiness Profile ({isSenior ? 'Senior Editor' : 'Locked'})</span>
          </button>
        </div>
      </div>

      {activeBoardTab === 'BOARD' ? (
        <div className="space-y-6">
          {/* 5-Column Lifecycle Board: DRAFT -> SOURCE_VERIFIED -> REVIEWED -> ACTIVE -> RETIRED */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
            {stages.map((stage) => {
              const stageRules = rules.filter((r) => r.lifecycleState === stage);
              return (
                <div key={stage} className="bg-surface border border-border rounded-xs p-3.5 space-y-3 shadow-subtle flex flex-col">
                  <div className="flex items-center justify-between border-b border-border pb-2 bg-bg-elevated -mx-3.5 -mt-3.5 p-3 rounded-t-xs">
                    <span className="font-mono text-[11px] uppercase font-bold text-text">
                      {stage.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 bg-surface-2 text-text rounded-xs font-mono text-[11px] font-bold border border-border">
                      {stageRules.length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {stageRules.map((rule) => {
                      const isSelected = selectedRule?.id === rule.id;
                      return (
                        <button
                          key={rule.id}
                          type="button"
                          onClick={() => setSelectedRule(rule)}
                          className={`w-full text-left p-3 rounded-xs border text-xs font-sans transition-all ${
                            isSelected
                              ? 'bg-tint-teal border-2 border-accent-2 shadow-subtle'
                              : 'bg-bg-elevated border-border hover:border-border-strong hover:bg-surface-2'
                          }`}
                        >
                          <div className="text-[11px] text-accent-2 font-mono font-bold mb-1">{rule.id}</div>
                          <div className="text-text font-bold text-xs line-clamp-2 leading-snug">
                            {rule.name}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-text-muted mt-2 font-mono">
                            <span className="uppercase text-[10px] px-1.5 py-0.5 bg-surface-2 border border-border rounded-xs">
                              {rule.ruleType}
                            </span>
                            <span>{rule.effectiveDate}</span>
                          </div>
                        </button>
                      );
                    })}

                    {stageRules.length === 0 && (
                      <div className="py-6 text-center text-text-muted text-xs font-sans italic border border-dashed border-border rounded-xs">
                        No rules in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Selected Rule Inspector */}
          {selectedRule && (
            <div className="p-6 bg-surface border border-border rounded-xs space-y-4 shadow-subtle font-sans">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent-2 font-bold">{selectedRule.id}</span>
                    <span className="text-text-muted font-mono text-[11px]">v{selectedRule.version}</span>
                    <span className="px-2 py-0.5 bg-tint-teal text-accent-2 border border-accent-2 font-mono text-[10px] rounded-xs uppercase font-bold">
                      {selectedRule.lifecycleState}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text mt-1">
                    {selectedRule.name}
                  </h3>
                </div>

                <div className="text-right font-mono text-xs text-text-muted">
                  <span>Type: </span>
                  <span className="text-text font-bold uppercase">{selectedRule.ruleType}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <span className="text-text-muted font-mono uppercase text-[11px] font-bold block">Statutory Source Clause:</span>
                  <div className="p-3 bg-bg-elevated border border-border rounded-xs text-text font-mono leading-relaxed">
                    {selectedRule.clauseReference} ({selectedRule.authoritativeSource})
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-text-muted font-mono uppercase text-[11px] font-bold block">Evaluation Logic:</span>
                  <div className="p-3 bg-bg-elevated border border-border rounded-xs text-text font-mono leading-relaxed">
                    {selectedRule.description}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Readiness Profile Editor Tab */
        <div className="p-6 bg-surface border border-border rounded-xs space-y-6 shadow-subtle font-sans">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-lg font-bold text-text">Readiness Profile: {readinessProfile.name}</h3>
              <p className="text-xs text-text-muted mt-0.5">
                Version {readinessProfile.version} · Effective: {readinessProfile.effectiveDate}
              </p>
            </div>
            {!isSenior && (
              <span className="px-2.5 py-1 bg-tint-ochre text-st-review border border-st-review rounded-xs text-xs font-mono font-bold flex items-center gap-1.5">
                <Lock size={13} />
                <span>Read-Only (Requires Senior Officer Role)</span>
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-text font-bold">
              Per-Field Confidence Floors:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(readinessProfile.perFieldConfidenceFloor).map(([field, floor]) => (
                <div key={field} className="p-3 bg-bg-elevated border border-border rounded-xs flex items-center justify-between">
                  <span className="font-mono text-xs text-text font-medium">{field}</span>
                  <input
                    type="number"
                    step="0.05"
                    min="0.5"
                    max="1.0"
                    disabled={!isSenior}
                    value={floor}
                    onChange={(e) => handleUpdateConfidenceFloor(field, parseFloat(e.target.value))}
                    className="w-16 px-2 py-1 bg-surface border border-control text-right font-mono text-xs rounded-xs text-text disabled:opacity-60 focus:outline-none focus:ring-1 focus:ring-focus-ring"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
