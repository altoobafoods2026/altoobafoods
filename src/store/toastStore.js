import { create } from 'zustand';

export const useToastStore = create(() => ({
  toasts: [],
  showToast: () => {},
  removeToast: () => {}
}));
