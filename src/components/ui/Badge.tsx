import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'slate' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = ''
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    slate: 'bg-slate-800/80 text-slate-300 border border-slate-700/50',
    outline: 'bg-transparent text-slate-300 border border-slate-700'
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
