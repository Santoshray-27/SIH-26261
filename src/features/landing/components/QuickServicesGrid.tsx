import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileCheck2,
  Shield,
  Copy,
  Ruler,
  Sliders,
  History,
  FileSpreadsheet,
  Network,
  ArrowRight,
} from 'lucide-react';

export const QuickServicesGrid: React.FC = () => {

  const services = [
    {
      to: '/embed/precheck',
      title: 'Applicant Pre-Check',
      desc: 'Self-evaluate institutional dossier against mandatory checklist before submission.',
      icon: FileCheck2,
    },
    {
      to: '/officer',
      title: 'Officer Review Console',
      desc: 'Triage applications with Evidence Sufficiency Gate and weakest-signal indicators.',
      icon: Shield,
    },
    {
      to: '/officer/tools?tool=duplicate',
      title: 'Duplicate Check (SHA-256)',
      desc: 'Instant in-browser Web Crypto byte duplicate detection across cross-cycle dossiers.',
      icon: Copy,
    },
    {
      to: '/officer/tools?tool=floorplan',
      title: 'Floor-Plan Measurement',
      desc: 'Scale-calibrated Canvas Shoelace polygon area calculation against AICTE Appendix 4 norms.',
      icon: Ruler,
    },
    {
      to: '/officer/rules',
      title: 'Rule Governance & Profiles',
      desc: 'Version-controlled Approval Process Handbook rulesets with formula dependencies.',
      icon: Sliders,
    },
    {
      to: '/officer/audit',
      title: 'Cryptographic Audit Ledger',
      desc: 'Verifiable SHA-256 hash-chain timeline logging all officer actions and evaluations.',
      icon: History,
    },
    {
      to: '/officer/reports',
      title: 'Reports & Neutralized CSV',
      desc: 'Print-ready statutory gazette and formula injection-safe spreadsheet exports.',
      icon: FileSpreadsheet,
    },
    {
      to: '/officer/network',
      title: 'Cross-Application Graph',
      desc: 'Entity relationship visualizer detecting deponent and land deed collisions.',
      badge: 'Designed now · built in Phase 4',
      icon: Network,
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-bg border-b border-border">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent-2 font-semibold">
              Comprehensive Service Suite
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-text mt-1">
              Statutory Compliance & Verification Services
            </h2>
          </div>
          <p className="text-xs text-text-muted font-sans max-w-md">
            Eight specialized verification capabilities designed for AICTE scrutiny officers and applicant institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.to}
                to={s.to}
                className="p-5 bg-surface hover:bg-surface-2 border border-border hover:border-accent-2/50 rounded-md transition-all shadow-subtle group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 bg-tint-teal/70 border border-accent-2/20 rounded-xs flex items-center justify-center text-accent-2 group-hover:bg-accent-2 group-hover:text-surface transition-colors">
                      <Icon size={18} />
                    </div>
                    {s.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 bg-tint-ochre text-ochre border border-ochre/40 rounded-xs font-semibold">
                        Phase 4
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-sm text-text group-hover:text-accent-2 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed mt-1">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-1.5 text-xs font-mono text-accent-2 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Open Service</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
