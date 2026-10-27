import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/mockApi';
import { Finding } from '../../types/domain';
import { executeDecisionReplay, ReplayedFindingResult } from '../../services/replay';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
import { useAppStore } from '../../store/useAppStore';
import {
  RotateCcw,
  Sliders,
  ArrowLeft,
  GitCompare,
} from 'lucide-react';

export const DecisionReplayPage: React.FC = () => {
  const { id = 'APP-2026-8801' } = useParams<{ id: string }>();
  const { currentRole, addToast } = useAppStore();

  const [originalFindings, setOriginalFindings] = useState<Finding[]>([]);
  const [pinnedRuleVersion, setPinnedRuleVersion] = useState<string>('2026.1');
  const [pinnedSoftwareVersion, setPinnedSoftwareVersion] = useState<string>('2.1.0');
  const [pinnedReferenceDate, setPinnedReferenceDate] = useState<string>('2026-06-30');
  const [splitPosition, setSplitPosition] = useState<number>(50); // Split slider 0-100%

  const [replayOutput, setReplayOutput] = useState<{
    matchRatio: number;
    results: ReplayedFindingResult[];
    differencesCount: number;
    replayId: string;
  } | null>(null);

  useEffect(() => {
    async function load() {
      const findings = await api.getFindingsByApplicationId(id, 'VER-8801-1');
      setOriginalFindings(findings);

      // Run initial replay with default pinned params
      const { replayRun, results } = executeDecisionReplay(findings, {
        applicationId: id,
        versionId: 'VER-8801-1',
        pinnedRuleVersion: '2026.1',
        pinnedSoftwareVersion: '2.1.0',
        pinnedReferenceDate: '2026-06-30',
        actorId: 'OFF-AICTE-042',
        actorRole: currentRole,
      });

      setReplayOutput({
        matchRatio: replayRun.matchRatio,
        results,
        differencesCount: replayRun.differencesFound.length,
        replayId: replayRun.id,
      });
    }
    load();
  }, [id, currentRole]);

  const handleRunReplay = () => {
    if (originalFindings.length === 0) return;

    const { replayRun, results } = executeDecisionReplay(originalFindings, {
      applicationId: id,
      versionId: 'VER-8801-1',
      pinnedRuleVersion,
      pinnedSoftwareVersion,
      pinnedReferenceDate,
      actorId: 'OFF-AICTE-042',
      actorRole: currentRole,
    });

    setReplayOutput({
      matchRatio: replayRun.matchRatio,
      results,
      differencesCount: replayRun.differencesFound.length,
      replayId: replayRun.id,
    });

    addToast(
      `Decision Replay ${replayRun.id} executed. Pinned rule: v${pinnedRuleVersion}, match ratio: ${Math.round(replayRun.matchRatio * 100)}%`,
      'info'
    );
  };

  return (
    <div className="space-y-6 font-sans text-text">
      {/* Header Bar */}
      <div className="border-b border-border pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
            <Link to={`/officer/cases/${id}`} className="hover:text-text flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Case {id}</span>
            </Link>
            <span>·</span>
            <span className="text-accent font-bold">Decision Replay (§3.4)</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-display font-black tracking-tight text-text">
            Deterministic Decision Replay Engine
          </h1>
          <p className="text-xs font-mono text-text-muted mt-1 max-w-2xl">
            Reproduces evidentiary outcomes under explicit rule versions, software builds, and pinned reference dates.
            Original records are never mutated; every execution is logged to <code className="text-text">replay_runs</code>.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 bg-surface-2 border border-border rounded-xs text-text-muted">
            Target Version: <strong>v1 (VER-8801-1)</strong>
          </span>
        </div>
      </div>

      {/* Pinned Environment Control Matrix */}
      <div className="p-5 bg-surface border border-border rounded-xs space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-1.5 font-bold">
            <Sliders className="w-4 h-4 text-accent" />
            <span>Pinned Environment Parameters</span>
          </span>
          <span className="text-[10px] font-mono text-text-muted">
            Change parameters below to observe deterministic divergence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Parameter 1: Pinned Rulebook Version */}
          <div className="p-3 bg-surface-2 border border-border rounded-xs space-y-2">
            <label className="block text-[11px] text-text-muted">
              Rulebook Specification Version:
            </label>
            <select
              id="replay-rulebook-select"
              aria-label="Rulebook Specification Version"
              value={pinnedRuleVersion}
              onChange={(e) => setPinnedRuleVersion(e.target.value)}
              className="w-full bg-surface border border-border rounded-xs p-2 text-text font-bold outline-none focus:border-accent-2"
            >
              <option value="2026.1">v2026.1 (Active AICTE Handbook 2026-27)</option>
              <option value="2025.1">v2025.1 (Prior AY 2025-26 Ruleset)</option>
              <option value="2024.1">v2024.1 (Historical Lenient Token Overlap)</option>
            </select>
            <div className="text-[10px] text-text-muted">
              Determines applicable threshold & formula clauses
            </div>
          </div>

          {/* Parameter 2: Pinned Software Build */}
          <div className="p-3 bg-surface-2 border border-border rounded-xs space-y-2">
            <label className="block text-[11px] text-text-muted">
              Software Engine Build Version:
            </label>
            <select
              id="replay-software-select"
              aria-label="Software Engine Build Version"
              value={pinnedSoftwareVersion}
              onChange={(e) => setPinnedSoftwareVersion(e.target.value)}
              className="w-full bg-surface border border-border rounded-xs p-2 text-text font-bold outline-none focus:border-accent-2"
            >
              <option value="2.1.0">Build 2.1.0 (Production Core)</option>
              <option value="2.0.0">Build 2.0.0 (Legacy Hash Adapter)</option>
            </select>
            <div className="text-[10px] text-text-muted">
              Cryptographic parser and geometry build version
            </div>
          </div>

          {/* Parameter 3: Pinned Reference Date */}
          <div className="p-3 bg-surface-2 border border-border rounded-xs space-y-2">
            <label className="block text-[11px] text-text-muted">
              Pinned Statutory Reference Cutoff Date:
            </label>
            <input
              type="date"
              aria-label="Pinned Statutory Reference Cutoff Date"
              value={pinnedReferenceDate}
              onChange={(e) => setPinnedReferenceDate(e.target.value)}
              className="w-full bg-surface border border-border rounded-xs p-2 text-text font-bold outline-none focus:border-accent-2"
            />
            <div className="text-[10px] text-text-muted">
              Simulate earlier reference date (e.g. 2025-06-30 vs 2026-06-30)
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleRunReplay}
            variant="primary"
            className="flex items-center gap-2 text-xs font-mono"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Execute Replay Under Pinned Environment</span>
          </Button>
        </div>
      </div>

      {/* Split-View Diff with Scrubber */}
      {replayOutput && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-surface border border-border rounded">
            <div className="flex items-center gap-4">
              <GitCompare className="w-5 h-5 text-ochre" />
              <div>
                <h3 className="text-sm font-serif font-bold text-text">
                  Recorded vs. Replayed Finding Comparator
                </h3>
                <div className="text-[11px] font-mono text-slate">
                  Replay ID: <span className="text-text">{replayOutput.replayId}</span> · Concordance Match: <span className="text-verdigris font-bold">{Math.round(replayOutput.matchRatio * 100)}%</span> · Divergences: <span className={replayOutput.differencesCount > 0 ? 'text-vermilion font-bold' : 'text-slate'}>{replayOutput.differencesCount}</span>
                </div>
              </div>
            </div>

            {/* Scrubber slider */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-slate">Left (Recorded)</span>
              <input
                type="range"
                aria-label="Diff Split Position"
                min={20}
                max={80}
                value={splitPosition}
                onChange={(e) => setSplitPosition(Number(e.target.value))}
                className="w-32 accent-ochre cursor-ew-resize"
              />
              <span className="text-slate">Right (Replayed)</span>
            </div>
          </div>

          {/* Split Findings Column */}
          <div className="space-y-3">
            {replayOutput.results.map((res) => (
              <div
                key={res.findingId}
                className={`border rounded overflow-hidden transition-all ${
                  res.hasDifference
                    ? 'border-vermilion/50 bg-vermilion/5'
                    : 'border-border bg-surface'
                }`}
              >
                {/* Header row */}
                <div className="px-4 py-2.5 bg-surface-2 border-b border-border flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-text font-bold">{res.findingId}</span>
                    <span className="text-slate">·</span>
                    <span className="text-ochre">{res.ruleId}</span>
                  </div>

                  {res.hasDifference ? (
                    <span className="px-2 py-0.5 bg-vermilion text-text rounded text-[10px] font-bold">
                      DIVERGENCE FOUND UNDER PINNED RULES
                    </span>
                  ) : (
                    <span className="text-slate text-[10px]">CONCORDANT (100% IDENTICAL)</span>
                  )}
                </div>

                {/* Split columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 p-4 gap-4 font-mono text-xs">
                  {/* Left Column: Recorded Historical Determination */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase text-slate">
                      Original Recorded Finding (v1 Archive)
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusPill status={res.originalStatus} />
                    </div>
                  </div>

                  {/* Right Column: Replayed Evaluation */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase text-slate flex items-center justify-between">
                      <span>Replayed Determination (Rule {pinnedRuleVersion})</span>
                      {res.hasDifference && (
                        <span className="text-ochre">Status Modified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusPill status={res.replayedStatus} />
                    </div>
                    <div className="text-[11px] text-slate/90 pt-1 leading-relaxed">
                      {res.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
