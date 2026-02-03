/**
 * StampCardCreatePage 컴포넌트
 * 새 스탬프 카드 생성 페이지
 */

import { useNavigate, useParams } from 'react-router-dom';
import { StampCardCreateForm } from '@/features/store-management/components';
import { MOCK_STORES } from '@/lib/constants/mockData';
import type { AdminStampCard } from '@/types/domain';

export function StampCardCreatePage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const store = MOCK_STORES.find((s) => s.id === Number(storeId));

  if (!store) {
    return (
      <div className="p-8 text-center">
        <p className="text-kkookk-steel">매장을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleSubmit = (card: Omit<AdminStampCard, 'id'>) => {
    // TODO: API 연동
    console.log('New card created:', card);
    alert('스탬프 카드가 생성되었습니다.');
    navigate(`/owner/stores/${storeId}`);
  };

  const handleCancel = () => {
    navigate(`/owner/stores/${storeId}`);
  };

  return (
    <div className="h-full">
      <StampCardCreateForm
        storeName={store.name}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default StampCardCreatePage;
