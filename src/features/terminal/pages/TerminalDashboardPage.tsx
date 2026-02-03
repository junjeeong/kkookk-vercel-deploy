/**
 * TerminalDashboardPage
 * Main terminal dashboard for store approval operations
 */

import { useState } from 'react';
import { TerminalSidebar } from '../components/TerminalSidebar';
import { ApprovalQueue } from '../components/ApprovalQueue';
import { ProcessedHistory } from '../components/ProcessedHistory';
import { StoreStatusToggle } from '../components/StoreStatusToggle';
import { OwnerLoginPage } from '@/features/auth/pages/OwnerLoginPage';
import type { TerminalTab } from '../types';
import type { IssuanceRequest, StoreStatus } from '@/types/domain';

interface TerminalDashboardPageProps {
  requests: IssuanceRequest[];
  storeStatus: StoreStatus;
  storeName?: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onToggleStatus: () => void;
  onLogout: () => void;
}

export function TerminalDashboardPage({
  requests,
  storeStatus,
  storeName = '카페 루나',
  onApprove,
  onReject,
  onToggleStatus,
  onLogout,
}: TerminalDashboardPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TerminalTab>('requests');

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  if (!isLoggedIn) {
    return (
      <OwnerLoginPage
        title="매장용 태블릿"
        subtitle="매장 관리자 계정으로 로그인하세요."
        onLoginSuccess={() => setIsLoggedIn(true)}
        onBack={onLogout}
        isTabletMode
      />
    );
  }

  return (
    <div className="min-h-screen bg-kkookk-navy flex items-center justify-center p-8">
      <div className="w-[1024px] h-[768px] bg-kkookk-sand rounded-[32px] overflow-hidden shadow-2xl flex border-8 border-kkookk-navy relative">
        {/* Sidebar */}
        <TerminalSidebar
          storeName={storeName}
          storeStatus={storeStatus}
          activeTab={activeTab}
          pendingCount={pendingCount}
          onTabChange={setActiveTab}
          onLogout={onLogout}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-kkookk-sand">
          {activeTab === 'requests' && (
            <ApprovalQueue
              requests={requests}
              onApprove={onApprove}
              onReject={onReject}
            />
          )}

          {activeTab === 'history' && <ProcessedHistory requests={requests} />}

          {activeTab === 'settings' && (
            <StoreStatusToggle
              status={storeStatus}
              onToggle={onToggleStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalDashboardPage;
