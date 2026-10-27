import { create } from 'zustand';
import { Role } from '../types/domain';

interface AppState {
  currentRole: Role;
  setRole: (role: Role) => void;
  devOverridesOpen: boolean;
  setDevOverridesOpen: (open: boolean) => void;
  toggleDevOverrides: () => void;
  toasts: Array<{ id: string; message: string; type: 'info' | 'error' | 'success' }>;
  addToast: (message: string, type?: 'info' | 'error' | 'success') => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: 'officer',
  setRole: (currentRole: Role) => set({ currentRole }),
  devOverridesOpen: false,
  setDevOverridesOpen: (devOverridesOpen: boolean) => set({ devOverridesOpen }),
  toggleDevOverrides: () => set((state) => ({ devOverridesOpen: !state.devOverridesOpen })),
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
