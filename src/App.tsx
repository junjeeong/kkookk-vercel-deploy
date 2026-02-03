/**
 * Main App Component
 * Root application with view mode switching for Customer, Store, and Admin modes
 */

import { useState, useCallback } from 'react';
import { LauncherPage } from '@/pages/LauncherPage';
import { CustomerApp } from '@/app/CustomerApp';
import { TerminalDashboardPage } from '@/features/terminal/pages/TerminalDashboardPage';
import { AdminApp } from '@/app/AdminApp';
import {
  INITIAL_STAMP_CARD,
  MOCK_REQUESTS,
  MOCK_OTHER_CARDS,
} from '@/lib/constants/mockData';
import type { IssuanceRequest, StampCard, StoreStatus } from '@/types/domain';

type ViewMode = 'launcher' | 'customer' | 'store' | 'admin';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('launcher');

  // Shared State for Cross-App Interaction
  const [requests, setRequests] = useState<IssuanceRequest[]>(MOCK_REQUESTS);
  const [stampCard, setStampCard] = useState<StampCard>(INITIAL_STAMP_CARD);
  const [storeStatus, setStoreStatus] = useState<StoreStatus>('OPEN');

  // All cards for wallet
  const allCards: StampCard[] = [
    {
      ...stampCard,
      bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]',
      shadowColor: 'shadow-orange-200',
    },
    ...MOCK_OTHER_CARDS,
  ];

  // Functions to modify shared state
  const addRequest = useCallback((req: IssuanceRequest) => {
    setRequests((prev) => [req, ...prev]);
  }, []);

  const updateRequestStatus = useCallback(
    (id: string, status: 'approved' | 'rejected') => {
      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
      // If approved, update stamp count simulation
      if (status === 'approved') {
        setStampCard((prev) => ({
          ...prev,
          current: Math.min(prev.current + 1, prev.max),
        }));
      }
    },
    []
  );

  const toggleStoreStatus = useCallback(() => {
    setStoreStatus((prev) => (prev === 'OPEN' ? 'CLOSED' : 'OPEN'));
  }, []);

  const goBack = useCallback(() => {
    setViewMode('launcher');
  }, []);

  const renderView = () => {
    switch (viewMode) {
      case 'customer':
        return (
          <CustomerApp
            requests={requests}
            addRequest={addRequest}
            updateRequestStatus={updateRequestStatus}
            stampCard={stampCard}
            allCards={allCards}
            goBack={goBack}
          />
        );
      case 'store':
        return (
          <TerminalDashboardPage
            requests={requests}
            storeStatus={storeStatus}
            onApprove={(id) => updateRequestStatus(id, 'approved')}
            onReject={(id) => updateRequestStatus(id, 'rejected')}
            onToggleStatus={toggleStoreStatus}
            onLogout={goBack}
          />
        );
      case 'admin':
        return <AdminApp goBack={goBack} />;
      default:
        return <LauncherPage onSelectMode={setViewMode} />;
    }
  };

  return renderView();
}
