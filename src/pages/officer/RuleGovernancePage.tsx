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
    <div className="min-h-screen bg-[#0F0F0E] text-[#EDE7DA] p-6 lg:p-10 space-y-6 font-sans select-none">
      {/* Editorial Header */}
      <div className="border-b border-white/10 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-ochre uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Statutory Rulebook & Readiness Governance · §5</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tight text-white">
            Governed Rule Packs & Readiness Profiles
          </h1>
          <p className="text-xs font-mono text-slate mt-1 max-w-2xl">
            Rules progress through a multi-stage statutory lifecycle. Ambiguous or discretion-heavy clauses
            yield <code className="text-ochre">MANUAL_REVIEW_REQUIRED</code> rather than false certainty.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            onClick={() => setActiveBoardTab('BOARD')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeBoardTab === 'BOARD'
                ? 'bg-paper text-ink font-bold'
                : 'bg-white/5 text-slate hover:text-white'
            }`}
          >
            Rule Lifecycle Board
          </button>
          <button
            onClick={() => setActiveBoardTab('PROFILE')}
            className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
              activeBoardTab === 'PROFILE'
                ? 'bg-paper text-ink font-bold'
                : 'bg-white/5 text-slate hover:text-white'
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {stages.map((stage) => {
              const stageRules = rules.filter((r) => r.lifecycleState === stage);
              return (
                <div key={stage} className="bg-[#141413] border border-white/10 rounded-md p-3 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="font-mono text-[10px] uppercase font-bold text-slate">
                      {stage.replace('_', ' ')}
                    </span>
                    <span className="px-1.5 py-0.5 bg-black/40 text-slate rounded font-mono text-[10px]">
                      {stageRules.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {stageRules.map((rule) => (
                      <button
                        key={rule.id}
                        type="button"
                        onClick={() => setSelectedRule(rule)}
                        className={`w-full text-left p-3 rounded border text-xs font-mono transition-all ${
                          selectedRule?.id === rule.id
                            ? 'bg-[#1F2A38] border-[#385B88]'
                            : 'bg-[#181816] border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className="text-[10px] text-ochre font-bold mb-1">{rule.id}</div>
                        <div className="text-white font-serif font-bold text-xs line-clamp-2">
                          {rule.name}
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate mt-2">
                          <span className="uppercase text-[9px] px-1 bg-white/5 rounded">
                            {rule.ruleType}
                          </span>
                          <span>{rule.effectiveDate}</span>
                        </div>
                      </button>
                    ))}

                    {stageRules.length === 0 && (
                      <div className="p-4 text-center text-slate/40 text-[10px] font-mono italic">
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
            <div className="p-6 bg-[#141413] border border-white/10 rounded-md space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ochre font-bold">{selectedRule.id}</span>
                    <span className="text-slate font-mono text-[10px]">v{selectedRule.version}</span>
                    <span className="px-2 py-0.5 bg-white/10 text-white font-mono text-[10px] rounded uppercase font-bold">
                      {selectedRule.lifecycleState}
                    </span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-white mt-1">
                    {selectedRule.name}
                  </h3>
                </div>

                <div className="text-right font-mono text-xs text-slate">
                  <span>Type: </span>
                  <span className="text-white font-bold uppercase">{selectedRule.ruleType}</span>
                </div>
              </div>

              {/* Description & Legal Clause Reference */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#181816] border border-white/5 rounded space-y-2">
                  <span className="text-[10px] uppercase text-slate">Statutory Clause & Citation:</span>
                  <div className="text-white font-serif text-sm">
                    {selectedRule.authoritativeSource}
                  </div>
                  <div className="text-[#EDE7DA] pt-1">
                    {selectedRule.clauseReference} (Page {selectedRule.pageReference || 'N/A'})
                  </div>
                </div>

                <div className="p-4 bg-[#181816] border border-white/5 rounded space-y-2">
                  <span className="text-[10px] uppercase text-slate">Rule Logic & Description:</span>
                  <p className="text-slate/90 leading-relaxed font-sans text-xs">
                    {selectedRule.description}
                  </p>
                </div>
              </div>

              {/* Formula Rules with Named Inputs and Citations */}
              {selectedRule.ruleType === 'formula' && selectedRule.formulaDefinition && (
                <div className="p-4 bg-[#181816] border border-ochre/30 rounded space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase text-ochre font-bold flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5" />
                      <span>Mathematical Formula Specification</span>
                    </span>
                    <span className="text-[10px] text-slate">Deterministic Evaluation</span>
                  </div>

                  <div className="p-2.5 bg-black/50 border border-white/5 rounded text-white font-bold text-xs">
                    Formula Expression: {selectedRule.formulaDefinition.expression}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-slate text-[10px] block">Named Inputs:</span>
                      <div className="text-white font-bold">
                        {selectedRule.formulaDefinition.inputs.join(', ')}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate text-[10px] block">Parameter Citations:</span>
                      <div className="text-slate/80 text-[11px]">
                        {JSON.stringify(selectedRule.formulaDefinition.parameterCitations)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Senior-Only Readiness Profile Editor */
        <div className="p-6 bg-[#141413] border border-white/10 rounded-md space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-ochre font-bold">{readinessProfile.id}</span>
                <span className="text-slate">v{readinessProfile.version}</span>
              </div>
              <h3 className="text-base font-serif font-bold text-white mt-1">
                {readinessProfile.name}
              </h3>
            </div>

            <div className="text-right">
              {isSenior ? (
                <span className="px-2.5 py-1 bg-verdigris/20 text-verdigris border border-verdigris rounded text-[11px] font-bold">
                  Senior Officer Editing Unlocked
                </span>
              ) : (
                <span className="px-2.5 py-1 bg-white/10 text-slate rounded text-[11px] flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Read-Only (Senior Role Required)</span>
                </span>
              )}
            </div>
          </div>

          {/* Per-field Confidence Floors */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Per-Field Extraction OCR Confidence Floors:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(readinessProfile.perFieldConfidenceFloor).map(([field, floor]) => (
                <div key={field} className="p-3 bg-[#181816] border border-white/5 rounded flex items-center justify-between">
                  <div>
                    <div className="text-white font-bold">{field}</div>
                    <div className="text-[10px] text-slate">Minimum OCR floor threshold</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step={0.05}
                      min={0.5}
                      max={1.0}
                      disabled={!isSenior}
                      value={floor}
                      onChange={(e) => handleUpdateConfidenceFloor(field, Number(e.target.value))}
                      className="w-16 bg-[#141413] border border-white/15 rounded p-1 text-right text-white font-bold disabled:opacity-40"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-black/40 border border-white/5 rounded space-y-2 text-slate text-[11px]">
            <div className="text-white font-bold">Statutory Workflow Invariants (§3.4):</div>
            <div>• Require terminal issuer response: <span className="text-verdigris font-bold">TRUE</span></div>
            <div>• Disallow unreviewed duplicates: <span className="text-verdigris font-bold">TRUE</span></div>
            <div>• Profile effective date: <span className="text-white">{readinessProfile.effectiveDate}</span></div>
          </div>
        </div>
      )}
    </div>
  );
};
