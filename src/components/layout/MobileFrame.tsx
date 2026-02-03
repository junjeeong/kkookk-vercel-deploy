/**
 * MobileFrame Component
 * Full-screen web app container for the customer PWA
 * Includes slide-out menu
 */

import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MenuLink } from '@/components/shared/MenuLink';
import {
  History,
  Gift,
  FileText,
  Settings,
  LogOut,
} from 'lucide-react';

interface MobileFrameProps {
  children: ReactNode;
  isMenuOpen?: boolean;
  onMenuClose?: () => void;
  onMenuItemClick?: (screen: string) => void;
  onLogout?: () => void;
  userName?: string;
  className?: string;
}

export function MobileFrame({
  children,
  isMenuOpen = false,
  onMenuClose,
  onMenuItemClick,
  onLogout,
  userName = '김고객님',
  className,
}: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full bg-kkookk-sand flex justify-center">
      <div
        className={cn(
          'w-full max-w-md min-h-screen bg-white flex flex-col relative',
          className
        )}
      >
        {/* Main Content Area - takes full height */}
        <div className="flex-1 flex flex-col no-scrollbar">
          {children}
        </div>

        {/* Slide-out Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
              role="button"
              tabIndex={0}
              aria-label="메뉴 닫기"
              className="absolute inset-0 bg-kkookk-navy/20 backdrop-blur-sm animate-in fade-in"
              onClick={onMenuClose}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onMenuClose?.();
                }
              }}
            />
            {/* Menu Panel */}
            <div className="relative w-[300px] max-w-[80vw] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              {/* Menu Header */}
              <div className="p-6 pt-12 flex justify-between items-center border-b border-slate-100">
                <span className="font-bold text-lg text-kkookk-navy">전체 메뉴</span>
                <button
                  onClick={onMenuClose}
                  className="p-2 -mr-2 text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-50 rounded-full"
                  aria-label="메뉴 닫기"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 overflow-y-auto no-scrollbar py-2">
                {/* User Info */}
                <div className="px-6 py-4 mb-2">
                  <p className="text-xs text-kkookk-steel mb-1">현재 계정</p>
                  <p className="font-bold text-lg text-kkookk-navy">{userName}</p>
                </div>

                {/* Menu Links */}
                <MenuLink
                  icon={<History size={20} />}
                  label="스탬프/리워드 이력"
                  onClick={() => onMenuItemClick?.('history')}
                />
                <MenuLink
                  icon={<Gift size={20} />}
                  label="리워드 보관함"
                  onClick={() => onMenuItemClick?.('rewardBox')}
                />
                <MenuLink
                  icon={<FileText size={20} />}
                  label="종이 스탬프 전환"
                  onClick={() => onMenuItemClick?.('migrationList')}
                />
                <MenuLink
                  icon={<Settings size={20} />}
                  label="설정"
                  onClick={() => onMenuItemClick?.('settings')}
                />
              </div>

              {/* Menu Footer */}
              <div className="p-6 border-t border-slate-100 bg-kkookk-sand/30">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 w-full p-3 text-kkookk-steel hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium text-sm">로그아웃 / 나가기</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileFrame;
