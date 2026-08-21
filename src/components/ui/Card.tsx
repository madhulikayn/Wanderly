import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-md overflow-hidden ${
        hoverEffect
          ? 'transition-all duration-300 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-950/20 hover:-translate-y-1'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
