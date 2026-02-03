/**
 * TerminalDashboardPage
 * 매장 승인 작업을 위한 메인 터미널 대시보드
 */

import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TerminalSidebar } from '../components/TerminalSidebar';
import { ApprovalQueue } from '../components/ApprovalQueue';
import { ProcessedHistory } from '../components/ProcessedHistory';
import { StoreStatusToggle } from '../components/StoreStatusToggle';
import { OwnerLoginPage } from '@/features/auth/pages/OwnerLoginPage';
import { MOCK_REQUESTS } from '@/lib/constants/mockData';
import type { TerminalTab } from '../types';
import type { IssuanceRequest, StoreStatus } from '@/types/domain';

export function TerminalDashboardPage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TerminalTab>('requests');
  const [requests, setRequests] = useState<IssuanceRequest[]>(MOCK_REQUESTS);
  const [storeStatus, setStoreStatus] = useState<StoreStatus>('OPEN');

  // TODO: storeId로 매장 정보 조회
  const storeName = storeId === 'store-1' ? '카페 루나' : `매장 ${storeId}`;

  const handleApprove = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' as const } : r))
    );
  }, []);

  const handleReject = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' as const } : r))
    );
  }, []);

  const handleToggleStatus = useCallback(() => {
    setStoreStatus((prev) => (prev === 'OPEN' ? 'CLOSED' : 'OPEN'));
  }, []);

  const handleLogout = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const pendingCount = requests.filter((r) => r.status === 'pending').length;

  if (!isLoggedIn) {
    return (
      <OwnerLoginPage
        title="매장용 태블릿"
        subtitle="매장 관리자 계정으로 로그인하세요."
        onLoginSuccess={() => setIsLoggedIn(true)}
        onBack={handleLogout}
        isTabletMode
      />
    );
  }

  return (
    <div className="min-h-screen bg-kkookk-navy flex items-center justify-center p-8">
      <div className="w-[1024px] h-[768px] bg-kkookk-sand rounded-[32px] overflow-hidden shadow-2xl flex border-8 border-kkookk-navy relative">
        {/* 사이드바 */}
        <TerminalSidebar
          storeName={storeName}
          storeStatus={storeStatus}
          activeTab={activeTab}
          pendingCount={pendingCount}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col bg-kkookk-sand">
          {activeTab === 'requests' && (
            <ApprovalQueue
              requests={requests}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {activeTab === 'history' && <ProcessedHistory requests={requests} />}

          {activeTab === 'settings' && (
            <StoreStatusToggle
              status={storeStatus}
              onToggle={handleToggleStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalDashboardPage;
