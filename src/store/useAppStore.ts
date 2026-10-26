import { create } from 'zustand';
import { Role } from '../types/domain';

interface AppState {
  currentRole: Role;
  setRole: (role: Role) => void;
  theme: 'paper' | 'dark';
  setTheme: (theme: 'paper' | 'dark') => void;
  toggleTheme: () => void;
  toasts: Array<{ id: string; message: string; type: 'info' | 'error' | 'success' }>;
  addToast: (message: string, type?: 'info' | 'error' | 'success') => void;
  removeToast: (id: string) => void;
}

const getInitialTheme = (): 'paper' | 'dark' => {
  const saved = localStorage.getItem('pramana_theme');
  if (saved === 'dark' || saved === 'paper') {
    return saved;
  }
  return 'paper';
};

const initialTheme = getInitialTheme();
if (initialTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: 'officer',
  setRole: (currentRole: Role) => set({ currentRole }),
  theme: initialTheme,
  setTheme: (theme: 'paper' | 'dark') => {
    localStorage.setItem('pramana_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },
  toggleTheme: () => {
    const next = get().theme === 'paper' ? 'dark' : 'paper';
    localStorage.setItem('pramana_theme', next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: next });
  },
  toasts: [],
  addToast: (message: string, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },
  removeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
