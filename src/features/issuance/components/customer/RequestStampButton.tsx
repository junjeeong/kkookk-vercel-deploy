/**
 * RequestStampButton 컴포넌트
 * 스탬프 요청 플로우를 시작하는 버튼
 */

import { useNavigate, useParams } from 'react-router-dom';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_OTHER_CARDS, INITIAL_STAMP_CARD } from '@/lib/constants/mockData';
import type { StampCard } from '@/types/domain';

export function RequestStampButton() {
  const navigate = useNavigate();
  const { cardId } = useParams<{ cardId: string }>();

  // Mock cards - 나중에 API로 대체
  const allCards: StampCard[] = [
    {
      ...INITIAL_STAMP_CARD,
      bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]',
      shadowColor: 'shadow-orange-200',
    },
    ...MOCK_OTHER_CARDS,
  ];

  const card = allCards.find((c) => c.id === cardId) || allCards[0];

  const handleRequest = () => {
    // TODO: API 연동 후 실제 요청 처리
    console.log('Stamp request sent for card:', cardId);
    navigate(`/customer/wallet/${cardId}`);
  };
  return (
    <div className="h-full flex flex-col p-6 justify-center text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-kkookk-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-kkookk-orange-500">
          <QrCode size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-kkookk-navy">
          적립 요청을 보낼까요?
        </h2>
        <p className="text-kkookk-steel">
          현재 {card.current}개 → 적립 후 {card.current + 1}개
        </p>
      </div>

      <div className="space-y-3 w-full">
        <Button onClick={handleRequest} variant="primary" size="full" className="shadow-lg">
          요청 보내기
        </Button>
        <Button onClick={() => navigate(`/customer/wallet/${cardId}`)} variant="subtle" size="full">
          취소
        </Button>
      </div>
    </div>
  );
}

export default RequestStampButton;
