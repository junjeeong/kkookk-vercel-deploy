/**
 * CustomerLayout
 * 고객 PWA 라우트용 레이아웃 래퍼
 *
 * Pre-login: /stores/:storeId/customer/* (URL storeId)
 * Post-login: /customer/* (sessionStorage storeId)
 */

import { useState } from 'react';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { MobileFrame } from '@/components/layout/MobileFrame';
import { BottomNavigationBar } from '@/components/layout/BottomNavigationBar';
import { SettingsSidebar } from '@/components/layout/SettingsSidebar';
import { useAuth } from '@/app/providers/AuthProvider';
import { StepUpModalProvider } from '@/app/providers/StepUpModalProvider';
import { StepUpVerifyModal } from '@/components/shared/StepUpVerifyModal';
import { clearOriginStoreId } from '@/hooks/useCustomerNavigate';
import { ScrollToTop } from '@/components/shared/ScrollToTop';
import { SplashScreen } from '@/components/shared/SplashScreen';

export function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { storeId: urlStoreId } = useParams<{ storeId: string }>();
  const { logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentStoreId, setCurrentStoreId] = useState<number | undefined>(undefined);

  // Pre-login: /stores/:storeId/customer, Post-login: /customer
  const base = urlStoreId ? `/stores/${urlStoreId}/customer` : '/customer';

  // 현재 활성화된 네비게이션 키 파악
  const getActiveNavKey = (): string => {
    const path = location.pathname;
    if (path.includes('/history')) return 'history';
    if (path.includes('/redeems')) return 'redeems';
    if (path.includes('/migrations')) return 'migrations';
    return 'wallet';
  };

  const handleBottomNavClick = (key: string) => {
    switch (key) {
      case 'history': {
        const query = currentStoreId ? `?storeId=${currentStoreId}` : '';
        navigate(`${base}/history${query}`);
        break;
      }
      case 'redeems':
        navigate(`${base}/redeems`);
        break;
      case 'migrations':
        navigate(`${base}/migrations`);
        break;
      case 'wallet':
      default:
        navigate(`${base}/wallet`);
        break;
    }
  };

  const handleLogout = () => {
    clearOriginStoreId();
    logout();
    navigate('/');
  };

  // 로그인/회원가입 페이지에서는 BottomNavigationBar를 숨김
  const isPreLoginPage = location.pathname.includes('/stores/') && (
    location.pathname.endsWith('/customer') ||
    location.pathname.endsWith('/login') ||
    location.pathname.endsWith('/signup')
  );

  // 적립 요청 페이지에서도 BottomNavigationBar를 숨김
  const hideBottomNav = isPreLoginPage || location.pathname.endsWith('/stamp');

  // 랜딩 페이지에서만 스플래시 화면 표시
  const isLandingPage = location.pathname.includes('/stores/') &&
    location.pathname.endsWith('/customer') &&
    urlStoreId !== undefined;

  return (
    <StepUpModalProvider>
      {/* Splash Screen - only on landing page */}
      {isLandingPage && (
        <SplashScreen
          imageSrc="/image/customer_init_splash.png"
        />
      )}

      <MobileFrame
        bottomNav={
          !hideBottomNav ? (
            <BottomNavigationBar
              activeKey={getActiveNavKey()}
              onItemClick={handleBottomNavClick}
            />
          ) : undefined
        }
        settingsSidebar={
          <SettingsSidebar
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onLogout={handleLogout}
          />
        }
      >
        <ScrollToTop />
        <Outlet context={{ setIsSettingsOpen, setCurrentStoreId }} />
      </MobileFrame>
      <StepUpVerifyModal />
    </StepUpModalProvider>
  );
}

export default CustomerLayout;
