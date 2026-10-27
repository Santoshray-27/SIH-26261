import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Crumb {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  customCrumbs?: Crumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ customCrumbs }) => {
  const location = useLocation();
  const { t } = useTranslation('nav');

  const pathSegments = location.pathname.split('/').filter(Boolean);

  const buildCrumbs = (): Crumb[] => {
    if (customCrumbs) return customCrumbs;

    const crumbs: Crumb[] = [{ label: t('home', 'Home'), to: '/' }];
    let currentPath = '';

    for (let i = 0; i < pathSegments.length; i++) {
      const seg = pathSegments[i];
      currentPath += `/${seg}`;

      let label = seg;
      if (seg === 'officer') label = t('officer', 'Officer Console');
      else if (seg === 'tools') label = t('evidenceTools', 'Evidence Tools');
      else if (seg === 'rules') label = t('rules', 'Rule Governance');
      else if (seg === 'audit') label = t('audit', 'Audit Ledger');
      else if (seg === 'reports') label = t('reports', 'Reports & CSV');
      else if (seg === 'network') label = t('network', 'Network Graph');
      else if (seg === 'cases' || seg === 'case') label = t('cases', 'Applications');
      else if (seg === 'review') label = 'Adjudication Review';
      else if (seg === 'replay') label = 'Decision Replay';
      else if (seg === 'faq') label = t('faq', 'FAQ');
      else if (seg === 'accessibility') label = t('accessibility', 'Accessibility');
      else if (seg === 'about') label = 'About';
      else if (seg === 'help') label = 'Help';

      crumbs.push({
        label,
        to: i === pathSegments.length - 1 ? undefined : currentPath,
      });
    }

    return crumbs;
  };

  const crumbs = buildCrumbs();

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-2 px-4 sm:px-6 md:px-10 font-sans text-xs text-text-muted bg-surface/50 border-b border-border/60">
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0">
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx === 0 && <Home size={12} className="text-text-muted mr-0.5" aria-hidden="true" />}
              {crumb.to && !isLast ? (
                <Link to={crumb.to} className="hover:text-accent-2 hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text font-semibold truncate max-w-[200px]" aria-current={isLast ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
              {!isLast && <ChevronRight size={11} className="text-border" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
