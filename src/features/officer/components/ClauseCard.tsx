import React from 'react';
import { RuleDefinition, Finding } from '../../../types/domain';
import { BookOpen, Shield, Calendar, AlertCircle, Scale, Tag } from 'lucide-react';

interface ClauseCardProps {
  rule: RuleDefinition | null;
  finding: Finding;
}

export const ClauseCard: React.FC<ClauseCardProps> = ({ rule, finding }) => {
  return (
    <div className="h-full flex flex-col bg-surface border border-border rounded overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-surface-2 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono tracking-wider text-slate">
            STATUTORY CITATION & GOVERNANCE
          </div>
          <h4 className="text-sm font-serif font-bold text-text mt-0.5">
            Rule Clause & Legal Basis
          </h4>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-st-structure text-text font-mono text-[10px] rounded border border-border">
          <Scale className="w-3 h-3" />
          <span>{rule?.ruleType || 'CROSS-CHECK'}</span>
        </div>
      </div>

      <div className="flex-1 p-5 overflow-auto space-y-5">
        {/* Rule Identifier and Title */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-ochre bg-ochre/10 border border-ochre/30 px-2 py-0.5 rounded">
              {rule?.id || finding.ruleId}
            </span>
            <span className="text-[10px] font-mono text-slate">
              v{rule?.version || '2026.1'}
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-text leading-snug">
            {rule?.name || finding.ruleId}
          </h3>
          <p className="text-xs text-slate leading-relaxed">
            {rule?.description || finding.explanation}
          </p>
        </div>

        {/* Authoritative Source Box */}
        <div className="p-3.5 bg-surface-2 border border-border rounded space-y-2.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-ochre" />
            <span>Authoritative Regulatory Source</span>
          </div>
          <div className="text-xs text-text font-serif">
            {rule?.authoritativeSource || 'AICTE Approval Process Handbook (APH) 2026-27'}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-[11px] font-mono">
            <div>
              <span className="text-slate block text-[10px]">Clause Reference:</span>
              <span className="text-text font-bold">{rule?.clauseReference || 'Chapter II, Clause 2.4'}</span>
            </div>
            <div>
              <span className="text-slate block text-[10px]">Page in Gazette:</span>
              <span className="text-text">Page {rule?.pageReference || '48'}</span>
            </div>
          </div>
        </div>

        {/* Governance & Effective Date */}
        <div className="p-3.5 bg-surface-2 border border-border rounded space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate" />
              Effective Date:
            </span>
            <span className="text-text font-mono">{rule?.effectiveDate || '2026-01-01'}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate flex items-center gap-1">
              <Shield className="w-3 h-3 text-slate" />
              Bureau Owner:
            </span>
            <span className="text-text">{rule?.ownerReviewer || 'AICTE Legal Bureau'}</span>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate flex items-center gap-1">
              <Tag className="w-3 h-3 text-slate" />
              Finding Class:
            </span>
            <span className="text-text uppercase font-bold text-[10px] px-1.5 py-0.5 bg-surface-2 rounded">
              {finding.findingClass.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Confidence & Evidentiary Limitations disclaimer */}
        <div className="p-3.5 bg-surface-2 border border-border rounded space-y-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-ochre" />
            <span>Evidentiary Boundary (§14 Copy Rule)</span>
          </div>
          <p className="text-[11px] text-slate leading-relaxed">
            Automated evaluation results indicate structural concordance or deficiency against statutory thresholds.
            This check does not independently certify physical authenticity or factual veracity beyond the presented evidence.
          </p>
        </div>
      </div>
    </div>
  );
};
