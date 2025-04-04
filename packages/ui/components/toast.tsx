'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const toastVariants = cva(
  'relative w-full rounded-lg border p-4 pr-8 shadow-lg',
  {
    variants: {
      type: {
        default: 'bg-background text-foreground',
        success: 'bg-green-100 text-green-900 border-green-200',
        error: 'bg-red-100 text-red-900 border-red-200',
        info: 'bg-blue-100 text-blue-900 border-blue-200',
      },
    },
    defaultVariants: {
      type: 'default',
    },
  }
);

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'info' | 'default';
  message: string;
  onClose?: () => void;
}

export function Toast({ 
  className, 
  type = 'default', 
  message,
  onClose,
  ...props 
}: ToastProps) {
  return (
    <div
      className={cn(toastVariants({ type }), className)}
      {...props}
    >
      {message}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
        >
          ×
        </button>
      )}
    </div>
  );
} 