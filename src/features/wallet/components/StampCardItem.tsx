/**
 * StampCardItem Component
 * Individual stamp card display in the wallet carousel
 */

import { Coffee, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StampCard } from '@/types/domain';

interface StampCardItemProps {
  card: StampCard;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function StampCardItem({
  card,
  isActive = true,
  onClick,
  className,
}: StampCardItemProps) {
  const bgGradient =
    card.bgGradient || 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]';
  const shadowColor = card.shadowColor || 'shadow-orange-200';

  return (
    <div
      onClick={onClick}
      className={cn(
        'w-full aspect-[1.58/1] bg-gradient-to-br rounded-2xl p-6 text-white',
        'shadow-xl cursor-pointer flex flex-col justify-between relative overflow-hidden',
        'transition-all duration-300',
        bgGradient,
        shadowColor,
        !isActive && 'opacity-70 scale-95',
        className
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      {/* Header */}
      <div className="flex justify-between items-start z-10">
        <span className="font-bold text-lg opacity-90 text-white drop-shadow-md tracking-tight">
          {card.storeName}
        </span>
        <span className="bg-white/20 px-2 py-1 rounded text-xs backdrop-blur-sm font-medium">
          D-{card.expiryDays || 15}
        </span>
      </div>

      {/* Background Icon */}
      <Coffee
        className="absolute -right-2 -bottom-4 text-white/10 w-32 h-32 transform rotate-12"
        strokeWidth={1}
      />

      {/* Footer */}
      <div className="flex justify-between items-end z-10">
        <div>
          <p className="text-white/80 text-[10px] font-medium mb-0.5 ml-0.5">
            현재 스탬프
          </p>
          <p className="text-3xl font-bold text-white drop-shadow-sm leading-none">
            {card.current}개
          </p>
        </div>
        <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
          <ChevronRight size={20} />
        </div>
      </div>
    </div>
  );
}

export default StampCardItem;
