import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { useI18n } from '../i18n/useI18n';
import { Role } from '../types/domain';
import { UserCheck } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole, addToast } = useAppStore();
  const { t } = useI18n();

  const roles: Role[] = ['applicant', 'officer', 'senior_officer', 'auditor'];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextRole = e.target.value as Role;
    setRole(nextRole);
    if (nextRole === 'auditor') {
      addToast('Switched to Auditor role (Read-only observation mode enabled).', 'info');
    } else {
      addToast(`Role changed to: ${t.roles[nextRole]}`, 'info');
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 border border-hairline px-2 py-1 rounded-xs bg-paper dark:bg-ink-surface">
      <UserCheck size={14} strokeWidth={1.25} className="text-slate" />
      <select
        value={currentRole}
        onChange={handleChange}
        className="bg-transparent font-mono text-xs text-ink dark:text-paper focus:outline-none cursor-pointer pr-1"
        aria-label="Switch User Role"
      >
        {roles.map((r) => (
          <option key={r} value={r} className="bg-paper text-ink dark:bg-ink dark:text-paper">
            {t.roles[r]}
          </option>
        ))}
      </select>
    </div>
  );
};
