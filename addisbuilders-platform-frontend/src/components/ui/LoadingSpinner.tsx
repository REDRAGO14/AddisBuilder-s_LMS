import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  label = 'Loading...',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 gap-3', className)} role="status">
      <Loader2 className={cn('animate-spin text-brand-800', sizes[size])} />
      {label && <p className="text-sm font-medium text-neutral-500 animate-pulse">{label}</p>}
      <span className="sr-only">{label}</span>
    </div>
  );
};
