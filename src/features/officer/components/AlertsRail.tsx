import React from 'react';
import { AlertItem } from '../../../types/domain';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlertsRailProps {
  alerts: AlertItem[];
}

export const AlertsRail: React.FC<AlertsRailProps> = ({ alerts }) => {
  return (
    <div className="border border-hairline bg-ink-surface p-4 font-mono text-xs flex flex-col gap-3">
      <div className="flex items-center justify-between pb-2 border-b border-hairline/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-vermilion animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-paper">
            Alerts Rail ({alerts.length})
          </span>
        </div>
        <span className="text-[10px] text-slate uppercase">Critical Exceptions</span>
      </div>

      <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
        {alerts.map((alt) => {
          const isCritical = alt.severity === 'critical';

          return (
            <div
              key={alt.id}
              className={`p-3 border text-xs leading-snug space-y-1.5 transition-colors ${
                isCritical
                  ? 'border-vermilion/50 bg-vermilion/10 text-paper'
                  : 'border-ochre/40 bg-ochre/10 text-paper'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold flex items-center gap-1.5">
                  {isCritical ? (
                    <AlertTriangle size={12} className="text-vermilion" />
                  ) : (
                    <Clock size={12} className="text-ochre" />
                  )}
                  <span className="uppercase">{alt.alertType.replace(/_/g, ' ')}</span>
                </span>
                <span className="text-slate">{alt.assignedRole}</span>
              </div>

              <p className="font-sans text-xs text-paper/90 leading-tight">
                {alt.message}
              </p>

              <div className="flex justify-between items-center pt-1 border-t border-hairline/40 text-[10px]">
                <span className="text-slate">{alt.applicationId}</span>
                <Link
                  to={`/officer/case/${alt.applicationId}`}
                  className="font-bold text-paper hover:text-ochre flex items-center gap-0.5 underline"
                >
                  <span>Resolve</span>
                  <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
