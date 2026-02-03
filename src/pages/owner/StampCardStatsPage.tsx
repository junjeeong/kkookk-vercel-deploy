/**
 * StampCardStatsPage 컴포넌트
 * 스탬프 카드 통계 페이지
 */

import { useNavigate, useParams } from 'react-router-dom';
import { StampCardStats } from '@/features/store-management/components';
import { MOCK_STORES, MOCK_ADMIN_CARDS } from '@/lib/constants/mockData';

export function StampCardStatsPage() {
  const navigate = useNavigate();
  const { storeId, cardId } = useParams<{ storeId: string; cardId: string }>();

  const store = MOCK_STORES.find((s) => s.id === Number(storeId));
  const card = MOCK_ADMIN_CARDS.find((c) => c.id === Number(cardId));

  if (!store) {
    return (
      <div className="p-8 text-center">
        <p className="text-kkookk-steel">매장을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const cardName = card?.name || '스탬프 카드';

  const handleBack = () => {
    navigate(`/owner/stores/${storeId}`);
  };

  return (
    <div className="h-full">
      <StampCardStats cardName={cardName} onBack={handleBack} />
    </div>
  );
}

export default StampCardStatsPage;
