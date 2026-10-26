import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../services/mockApi';
import {
  Application,
  SufficiencyAssessment,
  AlertItem,
  LifecycleState,
} from '../../types/domain';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
import { Kbd } from '../../components/ui/Kbd';
import { useI18n } from '../../i18n/useI18n';
import { useAppStore } from '../../store/useAppStore';

import { LifecycleStrip } from '../../features/officer/components/LifecycleStrip';
import { AlertsRail } from '../../features/officer/components/AlertsRail';
import { CoverageMiniBar } from '../../features/officer/components/CoverageMiniBar';
import { CommandPalette } from '../../features/officer/components/CommandPalette';

import {
  Search,
  Filter,
  ArrowRight,
  Command,
} from 'lucide-react';

export const OfficerDashboardPage: React.FC = () => {
  const { t, language } = useI18n();
  const { currentRole, addToast } = useAppStore();
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);
  const [assessments, setAssessments] = useState<Record<string, SufficiencyAssessment>>({});
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  // Filters & State selection
  const [selectedState, setSelectedState] = useState<LifecycleState | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getApplications(),
      api.getAllSufficiencyAssessments(),
      api.getAlerts(),
    ]).then(([apps, assess, alts]) => {
      setApplications(apps);
      setAssessments(assess);
      setAlerts(alts);
    });
  }, []);

  // Filtered dataset
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesState = selectedState === 'ALL' || app.currentState === selectedState;
      const matchesCategory =
        selectedCategory === 'ALL' || app.category === selectedCategory;
      const matchesQuery =
        app.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.institutionId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesCategory && matchesQuery;
    });
  }, [applications, selectedState, selectedCategory, searchQuery]);

  // Derived state machine counts (§6/§7)
  const stateCounts = useMemo(() => {
    const counts: Record<LifecycleState, number> = {
      DRAFT: 0,
      SUBMITTED: 0,
      PROCESSING: 0,
      EVIDENCE_REVIEW: 0,
      READY_FOR_OFFICER_REVIEW: 0,
      UNDER_OFFICER_REVIEW: 0,
      NEEDS_CLARIFICATION: 0,
      RESUBMITTED: 0,
      ESCALATED: 0,
      DECISION_RECORDED: 0,
      CLOSED: 0,
      WITHDRAWN: 0,
      PROCESSING_FAILED: 0,
      EVIDENCE_INCOMPLETE: 0,
    };
    applications.forEach((app) => {
      if (counts[app.currentState] !== undefined) {
        counts[app.currentState]++;
      }
    });
    return counts;
  }, [applications]);

  // Derived summary metrics from real synthetic data (NO invented statistics)
  const summaryMetrics = useMemo(() => {
    const total = applications.length;
    const readyForReview = applications.filter(
      (a) => a.currentState === 'READY_FOR_OFFICER_REVIEW' || a.currentState === 'UNDER_OFFICER_REVIEW'
    ).length;
    const escalated = applications.filter((a) => a.currentState === 'ESCALATED').length;
    const incomplete = applications.filter(
      (a) => a.currentState === 'EVIDENCE_INCOMPLETE' || a.currentState === 'PROCESSING'
    ).length;
    const decided = applications.filter(
      (a) => a.currentState === 'DECISION_RECORDED' || a.currentState === 'CLOSED'
    ).length;
    return { total, readyForReview, escalated, incomplete, decided };
  }, [applications]);

  // Keyboard navigation for rows (J/K or Up/Down, Enter to open)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (commandPaletteOpen) return;
      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedRowIndex((prev) => Math.min(filteredApps.length - 1, prev + 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedRowIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Enter') {
        const target = filteredApps[selectedRowIndex];
        if (target) {
          navigate(`/officer/case/${target.id}`);
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredApps, selectedRowIndex, commandPaletteOpen, navigate]);

  return (
    <div className="space-y-6 text-paper">
      {/* Editorial Header & Top Ledger Bar */}
      <div className="border-b border-hairline pb-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-slate mb-1">
            <span>Regulatory Workstation</span>
            <span>·</span>
            <span>AICTE Approval Process Handbook 2026-27</span>
          </div>
          <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight text-paper">
            Officer Verification Ledger
          </h1>
          <p className="font-mono text-xs text-slate mt-1 max-w-2xl">
            Live regulatory triage workstation in dark console theme. All counts derived strictly
            from verifiable synthetic seed cases. Evidence Sufficiency Gate enforced.
          </p>
        </div>

        {/* Action Controls & Command Palette trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="px-3 py-2 border border-hairline bg-ink-surface hover:border-paper font-mono text-xs text-slate hover:text-paper flex items-center gap-2 transition-colors rounded-xs"
            title="Open Command Palette (Ctrl/Cmd+K)"
          >
            <Command size={14} />
            <span>Search or Jump...</span>
            <Kbd>⌘K</Kbd>
          </button>

          <Button
            variant="primary"
            size="sm"
            isWritingAction
            onClick={() => {
              addToast('Initiating case batch sync...', 'info');
            }}
          >
            Batch Re-Evaluate
          </Button>
        </div>
      </div>

      {/* Lifecycle State Machine Strip (§6 / §7) */}
      <LifecycleStrip
        stateCounts={stateCounts}
        selectedState={selectedState}
        onSelectState={(state: LifecycleState | 'ALL') => {
          setSelectedState(state);
          setSelectedRowIndex(0);
        }}
      />

      {/* Main Ledger Layout: Left Typographic Summary + Center Table + Right Alerts Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Big Typographic Summary (Derived from Seed Data Only) */}
        <div className="lg:col-span-3 space-y-4 font-mono text-xs">
          <div className="border border-hairline bg-ink-surface p-5 space-y-4">
            <div className="text-[10px] text-slate uppercase tracking-widest border-b border-hairline/60 pb-2 flex justify-between">
              <span>Ledger Summary</span>
              <span>8 Seed Cases</span>
            </div>

            <div>
              <span className="text-[10px] text-slate uppercase block">Total Applications</span>
              <p className="text-4xl font-display font-black text-paper mt-0.5">
                {summaryMetrics.total}
              </p>
              <span className="text-[10px] text-slate">Dossiers in queue</span>
            </div>

            <div className="pt-2 border-t border-hairline/60 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-slate">Active in Review</span>
                <span className="font-bold text-lg text-paper">{summaryMetrics.readyForReview}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate">Escalated to Vigilance</span>
                <span className="font-bold text-lg text-vermilion">{summaryMetrics.escalated}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate">Evidence Incomplete</span>
                <span className="font-bold text-lg text-ochre">{summaryMetrics.incomplete}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-slate">Decisions Finalized</span>
                <span className="font-bold text-lg text-verdigris">{summaryMetrics.decided}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-hairline/60 text-[10px] text-slate leading-tight font-sans">
              <strong>Role Mode:</strong> Currently operating as{' '}
              <span className="text-paper font-mono uppercase font-bold">
                {t.roles[currentRole]}
              </span>
              . {currentRole === 'auditor' && 'Mutating actions will trigger 403 status.'}
            </div>
          </div>

          {/* Quick Keyboard Reference */}
          <div className="p-3 border border-hairline/60 bg-ink-dark text-[11px] text-slate space-y-1">
            <div className="font-bold uppercase text-[10px] text-paper mb-1 flex items-center gap-1">
              <span>Navigation Keys</span>
            </div>
            <div className="flex justify-between">
              <span>Next row:</span>
              <div className="flex gap-1"><Kbd>J</Kbd> / <Kbd>↓</Kbd></div>
            </div>
            <div className="flex justify-between">
              <span>Prev row:</span>
              <div className="flex gap-1"><Kbd>K</Kbd> / <Kbd>↑</Kbd></div>
            </div>
            <div className="flex justify-between">
              <span>Open dossier:</span>
              <Kbd>Enter</Kbd>
            </div>
          </div>
        </div>

        {/* Center Main: Case Table with Limiting Signal and Coverage Mini-bar */}
        <div className="lg:col-span-6 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 border border-hairline bg-ink-surface font-mono text-xs">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <Search size={14} className="text-slate" />
              <input
                type="text"
                placeholder="Filter by institution, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-paper placeholder:text-slate/60 focus:outline-none text-xs"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-slate">
                <Filter size={13} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-ink-dark border border-hairline/60 text-paper text-xs px-2 py-1 rounded-xs cursor-pointer focus:outline-none"
                  aria-label="Filter by Category"
                >
                  <option value="ALL">All Categories</option>
                  <option value="EXTENSION_OF_APPROVAL">Extension of Approval</option>
                  <option value="NEW_INSTITUTION">New Institution</option>
                  <option value="INTAKE_INCREASE">Intake Increase</option>
                  <option value="CLOSURE_OR_MERGER">Closure / Merger</option>
                </select>
              </div>

              <span className="text-slate text-[11px]">
                Showing {filteredApps.length} of {applications.length}
              </span>
            </div>
          </div>

          {/* Main Case Ledger Table */}
          <div className="border border-hairline bg-ink-surface overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-ink-dark text-slate uppercase text-[10px] tracking-wider border-b border-hairline">
                <tr>
                  <th className="p-3">Institution & ID</th>
                  <th className="p-3">State Chip</th>
                  <th className="p-3">Sufficiency</th>
                  <th className="p-3">Limiting Signal (§3.4)</th>
                  <th className="p-3">Coverage</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                <AnimatePresence>
                  {filteredApps.map((app, index) => {
                    const isSelected = index === selectedRowIndex;
                    const assess = assessments[app.id];

                    return (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15, delay: index * 0.03 }}
                        onClick={() => setSelectedRowIndex(index)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-paper/10 border-l-4 border-l-paper'
                            : 'hover:bg-ink-dark/60'
                        }`}
                      >
                        <td className="p-3">
                          <Link
                            to={`/officer/case/${app.id}`}
                            className="font-bold text-paper hover:underline block"
                          >
                            {language === 'hi' && app.institutionNameHi
                              ? app.institutionNameHi
                              : app.institutionName}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate">
                            <span>{app.id}</span>
                            <span>·</span>
                            <span>{app.category.replace(/_/g, ' ')}</span>
                          </div>
                        </td>

                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase border rounded-xs ${
                              app.currentState === 'ESCALATED'
                                ? 'bg-vermilion/20 border-vermilion text-vermilion font-bold'
                                : app.currentState === 'EVIDENCE_INCOMPLETE'
                                ? 'bg-ochre/20 border-ochre text-ochre font-bold'
                                : 'bg-ink-dark border-hairline text-slate'
                            }`}
                          >
                            {app.currentState.replace(/_/g, ' ')}
                          </span>
                        </td>

                        <td className="p-3">
                          {assess ? (
                            <StatusPill status={assess.sufficiencyStatus as any} size="sm" />
                          ) : (
                            <span className="text-slate">Pending</span>
                          )}
                        </td>

                        <td className="p-3 max-w-xs">
                          {assess ? (
                            <div className="text-[11px] text-slate truncate font-sans" title={assess.limitingSignal}>
                              <span className="font-bold text-paper/90">
                                {assess.limitingSignal}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate text-[10px]">Calculating...</span>
                          )}
                        </td>

                        <td className="p-3">
                          {assess ? (
                            <CoverageMiniBar ratioStr={assess.mandatoryChecksRunRatio} />
                          ) : (
                            <span className="text-slate text-[10px]">N/A</span>
                          )}
                        </td>

                        <td className="p-3 text-right">
                          <Link
                            to={`/officer/case/${app.id}`}
                            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-slate hover:text-paper font-semibold"
                          >
                            <span>Inspect</span>
                            <ArrowRight size={11} />
                          </Link>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>

            {filteredApps.length === 0 && (
              <div className="p-12 text-center text-slate font-mono text-xs">
                No institutional dossiers match the selected state or filter query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Alerts Rail */}
        <div className="lg:col-span-3 space-y-4">
          <AlertsRail alerts={alerts} />
        </div>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        applications={applications}
      />
    </div>
  );
};
