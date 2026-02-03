/**
 * WalletPage 컴포넌트
 * 스탬프 카드 캐러셀이 포함된 메인 지갑 뷰
 */

import { useNavigate, useOutletContext } from 'react-router-dom';
import { WalletHeader } from '../components/WalletHeader';
import { StampCardCarousel } from '../components/StampCardCarousel';
import { MOCK_OTHER_CARDS, INITIAL_STAMP_CARD } from '@/lib/constants/mockData';
import type { StampCard } from '@/types/domain';

interface CustomerLayoutContext {
  setIsMenuOpen: (open: boolean) => void;
}

export function WalletPage() {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useOutletContext<CustomerLayoutContext>();

  // Mock cards - 나중에 API로 대체
  const cards: StampCard[] = [
    {
      ...INITIAL_STAMP_CARD,
      bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]',
      shadowColor: 'shadow-orange-200',
    },
    ...MOCK_OTHER_CARDS,
  ];

  const handleCardSelect = (card: StampCard) => {
    navigate(`/customer/wallet/${card.id}`);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <WalletHeader onMenuClick={() => setIsMenuOpen(true)} />

      <div className="flex-1 flex flex-col justify-center">
        <StampCardCarousel cards={cards} onCardSelect={handleCardSelect} />
      </div>
    </div>
  );
}

export default WalletPage;
