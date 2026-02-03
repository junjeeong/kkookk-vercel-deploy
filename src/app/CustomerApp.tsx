/**
 * CustomerApp Component
 * Main customer application with screen navigation
 */

import { useState, useEffect } from 'react';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { CustomerLandingPage } from '@/pages/customer/CustomerLandingPage';
import { CustomerLoginForm, CustomerSignupForm } from '@/features/auth';
import { WalletPage, CardDetailView } from '@/features/wallet';
import {
  RequestStampButton,
  RequestingView,
  RequestResultView,
} from '@/features/issuance';
import { RewardList, RedeemScreen, RedeemResultView } from '@/features/redemption';
import { MigrationList, MigrationForm } from '@/features/migration';
import { CustomerHistoryPage, CustomerSettingsPage } from '@/pages/customer';
import { MOCK_REWARDS, MOCK_MIGRATIONS } from '@/lib/constants/mockData';
import type {
  IssuanceRequest,
  StampCard,
  Reward,
  MigrationRequest,
} from '@/types/domain';
import type { CustomerScreen } from '@/features/wallet/types';

interface CustomerAppProps {
  requests: IssuanceRequest[];
  addRequest: (req: IssuanceRequest) => void;
  updateRequestStatus: (id: string, status: 'approved' | 'rejected') => void;
  stampCard: StampCard;
  allCards: StampCard[];
  goBack: () => void;
}

export function CustomerApp({
  requests,
  addRequest,
  updateRequestStatus,
  stampCard,
  allCards,
  goBack,
}: CustomerAppProps) {
  const [screen, setScreen] = useState<CustomerScreen>('landing');
  const [requestData, setRequestData] = useState<IssuanceRequest | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>(MOCK_REWARDS);
  const [redeemTarget, setRedeemTarget] = useState<Reward | null>(null);
  const [redeemResult, setRedeemResult] = useState<'success' | 'fail' | null>(null);
  const [migrations, setMigrations] = useState<MigrationRequest[]>(MOCK_MIGRATIONS);
  const [activeCard, setActiveCard] = useState<StampCard>(allCards[0]);

  // Derive active card with styling - using useMemo instead of useEffect+setState
  const derivedActiveCard = activeCard.id === stampCard.id
    ? {
        ...stampCard,
        bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]',
        shadowColor: 'shadow-orange-200',
      }
    : activeCard;

  // Polling effect for stamp request
  useEffect(() => {
    if (screen === 'requesting' && requestData) {
      const interval = setInterval(() => {
        const currentReq = requests.find((r) => r.id === requestData.id);
        if (currentReq) {
          if (currentReq.status === 'approved') setScreen('success');
          if (currentReq.status === 'rejected') setScreen('rejected');
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [screen, requestData, requests]);

  const handleRequestStamp = () => {
    const newReq: IssuanceRequest = {
      id: `req_${Date.now()}`,
      type: 'stamp',
      user: '김고객',
      phone: '010-1234-5678',
      count: 1,
      time: new Date(),
      status: 'pending',
      store: activeCard.storeName,
    };
    addRequest(newReq);
    setRequestData(newReq);
    setScreen('requesting');
  };

  const startRedeemProcess = (reward: Reward) => {
    setRedeemTarget(reward);
    setScreen('redeem');
  };

  const completeRedeem = (isSuccess: boolean) => {
    if (isSuccess && redeemTarget) {
      setRewards((prev) =>
        prev.map((r) => (r.id === redeemTarget.id ? { ...r, isUsed: true } : r))
      );
      setRedeemResult('success');
    } else {
      setRedeemResult('fail');
    }
    setScreen('redeemResult');
  };

  const submitMigration = (storeName: string, count: number, _file: File) => {
    const newMigration: MigrationRequest = {
      id: `mig_${Date.now()}`,
      storeName,
      count,
      status: 'pending',
      date: new Date(),
    };
    setMigrations([newMigration, ...migrations]);
    setScreen('migrationList');
  };

  const handleMenuItemClick = (screenName: string) => {
    setScreen(screenName as CustomerScreen);
    setIsMenuOpen(false);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'landing':
        return (
          <CustomerLandingPage
            storeName={stampCard.storeName}
            onLogin={() => setScreen('login')}
            onSignup={() => setScreen('signup')}
          />
        );
      case 'login':
        return (
          <CustomerLoginForm
            onSubmit={() => setScreen('wallet')}
            onBack={() => setScreen('landing')}
          />
        );
      case 'signup':
        return (
          <CustomerSignupForm
            onComplete={() => setScreen('wallet')}
            onBack={() => setScreen('landing')}
            storeName={stampCard.storeName}
          />
        );
      case 'wallet':
        return (
          <WalletPage
            cards={allCards}
            onCardSelect={(card) => {
              setActiveCard(card);
              setScreen('detail');
            }}
            onMenuOpen={() => setIsMenuOpen(true)}
          />
        );
      case 'detail':
        return (
          <CardDetailView
            card={derivedActiveCard}
            onBack={() => setScreen('wallet')}
            onRequestStamp={() => setScreen('request')}
            onViewRewards={() => setScreen('rewardBox')}
          />
        );
      case 'request':
        return (
          <RequestStampButton
            card={derivedActiveCard}
            onRequest={handleRequestStamp}
            onCancel={() => setScreen('detail')}
          />
        );
      case 'requesting':
        return requestData ? (
          <RequestingView
            requestId={requestData.id}
            onSimulateApprove={() =>
              updateRequestStatus(requestData.id, 'approved')
            }
            onSimulateReject={() =>
              updateRequestStatus(requestData.id, 'rejected')
            }
          />
        ) : null;
      case 'success':
        return (
          <RequestResultView
            success
            stampCount={derivedActiveCard.current}
            onConfirm={() => setScreen('detail')}
          />
        );
      case 'rejected':
        return (
          <RequestResultView
            success={false}
            stampCount={derivedActiveCard.current}
            onConfirm={() => setScreen('detail')}
          />
        );
      case 'rewardBox':
        return (
          <RewardList
            rewards={rewards}
            onBack={() => setScreen('wallet')}
            onRedeem={startRedeemProcess}
          />
        );
      case 'redeem':
        return redeemTarget ? (
          <RedeemScreen reward={redeemTarget} onComplete={completeRedeem} />
        ) : null;
      case 'redeemResult':
        return (
          <RedeemResultView
            success={redeemResult === 'success'}
            onConfirm={() => setScreen('rewardBox')}
          />
        );
      case 'history':
        return (
          <CustomerHistoryPage
            requests={requests}
            onBack={() => setScreen('wallet')}
          />
        );
      case 'settings':
        return <CustomerSettingsPage onBack={() => setScreen('wallet')} />;
      case 'migrationList':
        return (
          <MigrationList
            migrations={migrations}
            onBack={() => setScreen('wallet')}
            onNewRequest={() => setScreen('migrationForm')}
          />
        );
      case 'migrationForm':
        return (
          <MigrationForm
            cards={allCards}
            existingMigrations={migrations}
            onBack={() => setScreen('migrationList')}
            onSubmit={submitMigration}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MobileFrame
      isMenuOpen={isMenuOpen}
      onMenuClose={() => setIsMenuOpen(false)}
      onMenuItemClick={handleMenuItemClick}
      onLogout={goBack}
    >
      {renderScreen()}
    </MobileFrame>
  );
}

export default CustomerApp;
