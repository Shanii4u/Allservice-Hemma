import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createToastManager() {
  let toasts: Array<{
    id: string;
    message: string;
    variant: 'default' | 'success' | 'error' | 'warning';
  }> = [];
  let listeners: Array<() => void> = [];

  function notify() {
    listeners.forEach(listener => listener());
  }

  return {
    subscribe(listener: () => void) {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    },
    getToasts() {
      return toasts;
    },
    addToast(message: string, variant: 'default' | 'success' | 'error' | 'warning' = 'default') {
      const id = Math.random().toString(36).substring(2);
      toasts.push({ id, message, variant });
      notify();
      return id;
    },
    removeToast(id: string) {
      toasts = toasts.filter(toast => toast.id !== id);
      notify();
    },
  };
} 