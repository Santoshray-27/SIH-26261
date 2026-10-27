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
      addToast(`Role changed to: ${t(`common:role_${nextRole}`, { defaultValue: nextRole })}`, 'info');
    }
  };

  return (
    <div className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 rounded-xs bg-surface text-text shadow-xs">
      <UserCheck size={14} strokeWidth={1.5} className="text-accent-2 shrink-0" />
      <select
        value={currentRole}
        onChange={handleChange}
        className="bg-transparent font-sans text-xs text-text focus:outline-none cursor-pointer pr-1 font-medium"
        aria-label="Switch User Role"
      >
        {roles.map((r) => (
          <option key={r} value={r} className="bg-surface text-text font-sans">
            {t(`common:role_${r}`, { defaultValue: r })}
          </option>
        ))}
      </select>
    </div>
  );
};
