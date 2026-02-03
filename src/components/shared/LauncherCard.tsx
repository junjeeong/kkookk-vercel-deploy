/**
 * LauncherCard Component
 * Card component for the launcher page to select different app modes
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LauncherCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
  color: string;
  className?: string;
}

export function LauncherCard({
  icon,
  title,
  desc,
  onClick,
  color,
  className,
}: LauncherCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm',
        'hover:shadow-xl transition-all border border-slate-100 hover:border-slate-200 group',
        className
      )}
    >
      <div
        className={cn(
          'p-4 rounded-full text-white mb-4 group-hover:scale-110 transition-transform',
          color
        )}
      >
        {icon}
      </div>
      <h2 className="text-xl font-bold text-kkookk-navy mb-2">{title}</h2>
      <p className="text-kkookk-steel text-center text-sm">{desc}</p>
    </button>
  );
}

export default LauncherCard;
