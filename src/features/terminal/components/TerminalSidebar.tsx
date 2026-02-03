/**
 * TerminalSidebar 컴포넌트
 * 터미널 대시보드용 사이드 네비게이션
 */

import { Bell, History, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TerminalTab } from '../types';
import type { StoreStatus } from '@/types/domain';

interface TerminalSidebarProps {
  storeName: string;
  storeStatus: StoreStatus;
  activeTab: TerminalTab;
  pendingCount: number;
  onTabChange: (tab: TerminalTab) => void;
  onLogout: () => void;
}

export function TerminalSidebar({
  storeName,
  storeStatus,
  activeTab,
  pendingCount,
  onTabChange,
  onLogout,
}: TerminalSidebarProps) {
  const tabs: { id: TerminalTab; label: string; icon: React.ReactNode }[] = [
    { id: 'requests', label: '승인 대기', icon: <Bell size={20} /> },
    { id: 'history', label: '처리 내역', icon: <History size={20} /> },
    { id: 'settings', label: '설정', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      {/* 매장 정보 */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="font-bold text-xl text-kkookk-navy">{storeName}</h1>
        <div
          className={cn(
            'text-xs font-medium flex items-center gap-1 mt-1',
            storeStatus === 'OPEN' ? 'text-green-600' : 'text-slate-400'
          )}
        >
          <span
            className={cn(
              'w-2 h-2 rounded-full',
              storeStatus === 'OPEN'
                ? 'bg-green-500 animate-pulse'
                : 'bg-slate-400'
            )}
          />
          {storeStatus === 'OPEN' ? '영업중 · 온라인' : '영업 종료'}
        </div>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left',
              activeTab === tab.id
                ? 'bg-kkookk-navy text-white shadow-lg shadow-slate-200'
                : 'text-kkookk-steel hover:bg-slate-50'
            )}
          >
            {tab.icon}
            <span className="font-bold">{tab.label}</span>
            {tab.id === 'requests' && pendingCount > 0 && (
              <span className="ml-auto bg-kkookk-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* 로그아웃 */}
      <div className="p-4">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-kkookk-steel hover:text-kkookk-navy p-2"
        >
          <LogOut size={16} /> 앱 종료
        </button>
      </div>
    </div>
  );
}

export default TerminalSidebar;
