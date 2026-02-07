/**
 * BottomNavigationBar 컴포넌트
 * 고객 PWA 하단 고정 네비게이션 바
 * 4개 주요 탭 제공: 내 지갑, 이력, 리워드, 전환
 */

import { Wallet, History, Gift, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BottomNavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavigationBarProps {
  activeKey: string;
  onItemClick: (key: string) => void;
}

const NAV_ITEMS: BottomNavItem[] = [
  {
    key: 'wallet',
    label: '내 지갑',
    icon: <Wallet size={24} />,
  },
  {
    key: 'history',
    label: '이력',
    icon: <History size={24} />,
  },
  {
    key: 'redeems',
    label: '리워드',
    icon: <Gift size={24} />,
  },
  {
    key: 'migrations',
    label: '전환',
    icon: <FileText size={24} />,
  },
];

export function BottomNavigationBar({
  activeKey,
  onItemClick,
}: BottomNavigationBarProps) {
  return (
    <nav
      role="navigation"
      aria-label="하단 네비게이션"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white rounded-t-2xl border-t border-r border-l border-slate-200 z-40 pb-safe overflow-hidden"
    >
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onItemClick(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center justify-center gap-1 min-w-[64px] h-full transition-colors',
                'hover:bg-slate-50 active:bg-slate-100',
                isActive
                  ? 'text-kkookk-orange-500'
                  : 'text-kkookk-steel hover:text-kkookk-navy'
              )}
            >
              <span
                className={cn(
                  'transition-transform',
                  isActive && 'scale-110'
                )}
              >
                {item.icon}
              </span>
              <span
                className={cn(
                  'text-xs transition-all',
                  isActive ? 'font-bold' : 'font-medium'
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigationBar;
