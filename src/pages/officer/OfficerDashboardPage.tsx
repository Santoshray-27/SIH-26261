import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useI18n } from '../../i18n/useI18n';
import { api } from '../../services/mockApi';
import { Application, LifecycleState, SufficiencyAssessment } from '../../types/domain';
import { LifecycleStrip } from '../../features/officer/components/LifecycleStrip';
import { CommandPalette } from '../../features/officer/components/CommandPalette';
import { StatusPill } from '../../components/ui/StatusPill';
import { Button } from '../../components/ui/Button';
import { Kbd } from '../../components/ui/Kbd';
import { IdText } from '../../components/ui/MonoText';
import {
  Search,
  Filter,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Command,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const OfficerDashboardPage: React.FC = () => {
  const { addToast } = useAppStore();
  const { language } = useI18n();
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);
  const [assessments, setAssessments] = useState<Record<string, SufficiencyAssessment>>({});
  const [selectedState, setSelectedState] = useState<LifecycleState | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(0);
  const [alertsRailExpanded, setAlertsRailExpanded] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const [apps, assessMap] = await Promise.all([
        api.getApplications(),
        api.getAllSufficiencyAssessments(),
      ]);
      setApplications(apps);
      setAssessments(assessMap);
    }
    loadData();
  }, []);

  const stateCounts = useMemo(() => {
    const counts = {} as Record<LifecycleState, number>;
    for (const app of applications) {
      counts[app.currentState] = (counts[app.currentState] || 0) + 1;
    }
    return counts;
  }, [applications]);

  const summaryMetrics = useMemo(() => {
    return {
      total: applications.length,
      readyForReview: applications.filter((a) => a.currentState === 'READY_FOR_OFFICER_REVIEW').length,
      escalated: applications.filter((a) => a.currentState === 'ESCALATED').length,
      incomplete: applications.filter((a) => a.currentState === 'EVIDENCE_INCOMPLETE').length,
      decided: applications.filter((a) => a.currentState === 'DECISION_RECORDED').length,
    };
  }, [applications]);

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchState = selectedState === 'ALL' || app.currentState === selectedState;
      const matchCategory = selectedCategory === 'ALL' || app.category === selectedCategory;
      const matchSearch =
        app.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchCategory && matchSearch;
    });
  }, [applications, selectedState, selectedCategory, searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedRowIndex((prev) => Math.min(prev + 1, filteredApps.length - 1));
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedRowIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        const current = filteredApps[selectedRowIndex];
        if (current) navigate(`/officer/case/${current.id}`);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredApps, selectedRowIndex, navigate]);

  return (
    <div className="space-y-6 text-text font-sans">
      {/* Editorial Header */}
      <div className="border-b border-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-sans font-semibold text-[13px] text-accent-2 mb-2 tracking-[0.02em]">
            <span>Regulatory workstation</span>
            <span>·</span>
            <span>AICTE Approval Process Handbook 2026-27</span>
          </div>
          <h1 className="font-serif font-bold text-2xl md:text-3xl tracking-normal text-text">
            Officer verification ledger
          </h1>
          <p className="font-sans text-sm text-text-muted mt-2 max-w-[66ch] leading-relaxed">
            Deterministic triage ledger. Evaluates evidence sufficiency and surfaces weakest limiting signals without automated verdict generation.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="px-3 py-2 border border-border bg-surface hover:bg-surface-2 font-sans text-xs text-text-muted hover:text-text flex items-center gap-2 transition-colors rounded-xs shadow-subtle"
            title="Open Command Palette (Ctrl/Cmd+K)"
          >
            <Command size={14} />
            <span>Search...</span>
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
            Batch re-evaluate
          </Button>
        </div>
      </div>

      {/* Row of 4 Summary Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-surface border border-border rounded-xs shadow-subtle">
          <span className="text-xs text-text-muted font-semibold block">Total applications</span>
          <p className="text-3xl font-serif font-bold text-text mt-1 tabular-nums">{summaryMetrics.total}</p>
          <span className="text-xs text-text-muted">Dossiers in queue</span>
        </div>

        <div className="p-4 bg-tint-teal border border-border rounded-xs shadow-subtle">
          <span className="text-xs text-accent-2 font-semibold block">Ready for review</span>
          <p className="text-3xl font-serif font-bold text-accent-2 mt-1 tabular-nums">{summaryMetrics.readyForReview}</p>
          <span className="text-xs text-text-muted">Sufficiency passed</span>
        </div>

        <div className="p-4 bg-tint-clay border border-border rounded-xs shadow-subtle">
          <span className="text-xs text-st-deficiency font-semibold block">Escalated to vigilance</span>
          <p className="text-3xl font-serif font-bold text-st-deficiency mt-1 tabular-nums">{summaryMetrics.escalated}</p>
          <span className="text-xs text-text-muted">Integrity alerts flagged</span>
        </div>

        <div className="p-4 bg-tint-ochre border border-border rounded-xs shadow-subtle">
          <span className="text-xs text-st-review font-semibold block">Evidence incomplete</span>
          <p className="text-3xl font-serif font-bold text-st-review mt-1 tabular-nums">{summaryMetrics.incomplete}</p>
          <span className="text-xs text-text-muted">Mandatory checks missing</span>
        </div>
      </div>

      {/* Lifecycle State Stepper */}
      <LifecycleStrip
        stateCounts={stateCounts}
        selectedState={selectedState}
        onSelectState={(state) => {
          setSelectedState(state);
          setSelectedRowIndex(0);
        }}
      />

      {/* Collapsible Alerts Section (Collapsible bar on mobile/desktop, auto-rail at 2xl) */}
      <div className="border border-border bg-surface rounded-xs overflow-hidden shadow-subtle">
        <button
          onClick={() => setAlertsRailExpanded(!alertsRailExpanded)}
          className="w-full px-4 py-3 bg-bg-elevated flex items-center justify-between text-left font-sans text-sm font-semibold hover:bg-surface-2 transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-st-review" />
            <span>Active Vigilance Alerts & Expired Credentials ({applications.filter(a => a.currentState === 'ESCALATED').length})</span>
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${alertsRailExpanded ? 'rotate-180' : ''}`}
          />
        </button>

        {alertsRailExpanded && (
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-t border-border font-sans text-xs bg-surface">
            <div className="p-3 bg-st-deficiency-bg border border-st-deficiency rounded-xs space-y-1">
              <div className="font-bold text-st-deficiency flex items-center gap-1.5">
                <ShieldAlert size={14} />
                <span>Byte-Identical Duplicate Collision</span>
              </div>
              <p className="text-text-muted">Sri Vidya Institute shares SHA-256 land deed with Thar Institute (APP-8808).</p>
            </div>

            <div className="p-3 bg-st-review-bg border border-st-review rounded-xs space-y-1">
              <div className="font-bold text-st-review flex items-center gap-1.5">
                <AlertTriangle size={14} />
                <span>Expired Accreditation</span>
              </div>
              <p className="text-text-muted">NBA accreditation expired on 2024-06-30. Affidavit claims current status.</p>
            </div>

            <div className="p-3 bg-st-unavailable-bg border border-st-unavailable rounded-xs space-y-1">
              <div className="font-bold text-st-unavailable flex items-center gap-1.5">
                <AlertTriangle size={14} />
                <span>External Source Unavailable</span>
              </div>
              <p className="text-text-muted">Telangana Land Registry returned 503 gateway timeout. Verification pending.</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border border-border bg-surface rounded-xs shadow-subtle font-sans text-sm">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search size={16} className="text-text-muted" />
          <input
            type="text"
            placeholder="Search by institution name or application ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedRowIndex(0);
            }}
            className="w-full bg-transparent text-text placeholder-text-muted text-sm focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Filter size={14} />
            <span>Category:</span>
            <select
              id="category-filter"
              aria-label="Filter by Category"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedRowIndex(0);
              }}
              className="bg-bg-elevated border border-border text-text text-xs px-2.5 py-1 rounded-xs cursor-pointer focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="ENGINEERING_UG">Engineering UG</option>
              <option value="MANAGEMENT_PG">Management PG</option>
              <option value="PHARMACY_UG">Pharmacy UG</option>
              <option value="POLYTECHNIC_DIPLOMA">Polytechnic Diploma</option>
            </select>
          </div>

          <span className="text-xs text-text-muted font-sans tabular-nums">
            Showing {filteredApps.length} of {applications.length}
          </span>
        </div>
      </div>

      {/* Main Case Ledger Table (Desktop) & Stacked Cards (Mobile) */}
      <div className="border border-border bg-surface rounded-xs overflow-hidden shadow-subtle">
        {/* Mobile View: Stacked Cards */}
        <div className="md:hidden divide-y divide-border">
          {filteredApps.map((app) => {
            const assess = assessments[app.id];
            return (
              <div key={app.id} className="p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/officer/case/${app.id}`} className="font-bold text-accent-2 text-base hover:underline">
                      {language === 'hi' && app.institutionNameHi ? app.institutionNameHi : app.institutionName}
                    </Link>
                    <div className="text-xs text-text-muted font-sans"><IdText>{app.id}</IdText> · <span className="capitalize">{app.category.replace(/_/g, ' ').toLowerCase()}</span></div>
                  </div>
                  <span className="px-2 py-0.5 bg-surface-2 border border-border text-[11px] font-sans font-medium rounded-xs capitalize">
                    {app.currentState.replace(/_/g, ' ').toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {assess && <StatusPill status={assess.sufficiencyStatus as any} size="sm" />}
                  <span className="text-xs text-text-muted font-sans tabular-nums">
                    Coverage: {assess?.mandatoryChecksCompleted ?? 0}/{assess?.mandatoryChecksTotal ?? 11}
                  </span>
                </div>

                {assess && (
                  <div className="text-xs text-text-muted bg-bg-elevated p-2 rounded-xs border border-border font-sans">
                    <span className="font-semibold text-text">Limiting signal: </span>
                    {assess.limitingSignal}
                  </div>
                )}

                <Link
                  to={`/officer/case/${app.id}`}
                  className="inline-flex items-center gap-1.5 text-xs text-accent-2 font-bold hover:underline pt-1"
                >
                  <span>Open Dossier</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Desktop View: Formatted Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-bg-elevated text-text-muted font-sans text-xs font-semibold border-b border-border">
              <tr>
                <th className="p-3.5 min-w-[280px]">Institution & application ID</th>
                <th className="p-3.5 min-w-[150px]">Lifecycle state</th>
                <th className="p-3.5 min-w-[170px]">Sufficiency gate</th>
                <th className="p-3.5 min-w-[280px]">
                  <span>{language === 'hi' ? 'मुख्य रुकावट (सबसे कमजोर बिंदु)' : 'Primary blocking reason'}</span>
                  <span className="block text-[11px] font-sans font-normal text-text-muted">
                    {language === 'hi' ? 'निर्णय रोकने वाला मुख्य कारण' : 'weakest limiting signal'}
                  </span>
                </th>
                <th className="p-3.5 min-w-[120px]">Check coverage</th>
                <th className="p-3.5 text-right min-w-[110px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence>
                {filteredApps.map((app, index) => {
                  const isSelected = index === selectedRowIndex;
                  const assess = assessments[app.id];

                  return (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => setSelectedRowIndex(index)}
                      className={`transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-tint-teal/40 border-l-4 border-l-accent-2'
                          : 'hover:bg-bg-elevated/60'
                      }`}
                    >
                      <td className="p-3.5">
                        <Link
                          to={`/officer/case/${app.id}`}
                          className="font-bold text-text hover:text-accent-2 block leading-snug"
                        >
                          {language === 'hi' && app.institutionNameHi
                            ? app.institutionNameHi
                            : app.institutionName}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-text-muted font-sans">
                          <IdText>{app.id}</IdText>
                          <span>·</span>
                          <span className="capitalize">{app.category.replace(/_/g, ' ').toLowerCase()}</span>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-mono rounded-xs border ${
                            app.currentState === 'ESCALATED'
                              ? 'bg-st-deficiency-bg border-st-deficiency text-st-deficiency font-bold'
                              : app.currentState === 'EVIDENCE_INCOMPLETE'
                              ? 'bg-st-review-bg border-st-review text-st-review font-bold'
                              : 'bg-surface-2 border-border text-text-muted'
                          }`}
                        >
                          {app.currentState.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="p-3.5">
                        {assess ? (
                          <StatusPill status={assess.sufficiencyStatus as any} size="sm" />
                        ) : (
                          <span className="text-text-muted">Pending</span>
                        )}
                      </td>

                      <td className="p-3.5 max-w-sm">
                        {assess ? (
                          <div className="text-xs text-text-muted font-sans line-clamp-2" title={assess.limitingSignal}>
                            <span className="font-semibold text-text">
                              {assess.limitingSignal}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-text-muted">—</span>
                        )}
                      </td>

                      <td className="p-3.5">
                        {assess && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-mono text-text-muted">
                              <span>{assess.mandatoryChecksCompleted}/{assess.mandatoryChecksTotal || 11} mandatory</span>
                            </div>
                            <div className="h-1.5 w-24 bg-surface-2 border border-border rounded-xs overflow-hidden flex">
                              <div
                                className="h-full bg-accent-2"
                                style={{
                                  width: `${(assess.mandatoryChecksCompleted / (assess.mandatoryChecksTotal || 11)) * 100}%`,
                                }}
                              />
                              {(assess.mandatoryChecksTotal - assess.mandatoryChecksCompleted) > 0 && (
                                <div className="h-full flex-1 hatch-pattern bg-text-muted" />
                              )}
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="p-3.5 text-right">
                        <Link
                          to={`/officer/case/${app.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 hover:bg-surface border border-border text-text text-xs rounded-xs font-medium transition-colors"
                        >
                          <span>Review</span>
                          <ArrowRight size={13} />
                        </Link>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        applications={applications}
      />
    </div>
  );
};
