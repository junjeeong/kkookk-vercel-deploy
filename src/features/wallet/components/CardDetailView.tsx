/**
 * CardDetailView 컴포넌트
 * 진행 상황 및 액션이 포함된 스탬프 카드 상세 뷰
 */

import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Check, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_OTHER_CARDS, INITIAL_STAMP_CARD } from '@/lib/constants/mockData';
import type { StampCard } from '@/types/domain';

export function CardDetailView() {
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
  const isComplete = card.current >= card.max;

  return (
    <div className="h-full bg-white flex flex-col pt-12">
      {/* 헤더 */}
      <div className="px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center">
        <button
          onClick={() => navigate('/customer/wallet')}
          className="p-2 -ml-2 text-kkookk-steel"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-kkookk-navy">
          {card.storeName}
        </h1>
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-32">
        {/* 리워드 정보 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1 text-kkookk-navy">
            {card.reward}
          </h2>
          <p className="text-kkookk-steel text-sm">
            {card.max}개를 모으면 무료로 드려요
          </p>
        </div>

        {/* 진행 상황 그리드 */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {Array.from({ length: card.max }).map((_, i) => {
            const isActive = i < card.current;
            return (
              <div
                key={i}
                className={`aspect-square rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                  isActive
                    ? 'bg-kkookk-orange-500 text-white shadow-md scale-100'
                    : 'bg-kkookk-sand text-kkookk-steel opacity-50 scale-90'
                }`}
              >
                {isActive ? <Check size={14} strokeWidth={4} /> : i + 1}
              </div>
            );
          })}
        </div>

        {/* 안내 박스 */}
        <div className="bg-kkookk-sand p-4 rounded-xl text-xs text-kkookk-steel leading-relaxed">
          <p>• 스탬프 유효기간은 적립일로부터 6개월입니다.</p>
          <p>• 1일 최대 5개까지 적립 가능합니다.</p>
          <p>• 리워드 사용 시 사장님 확인이 필요합니다.</p>
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {isComplete ? (
          <Button
            onClick={() => navigate('/customer/redeems')}
            variant="navy"
            size="full"
          >
            <Smartphone size={18} /> 사용 가능한 리워드 보기
          </Button>
        ) : (
          <Button
            onClick={() => navigate(`/customer/wallet/${cardId}/stamp`)}
            variant="primary"
            size="full"
            className="shadow-lg shadow-orange-200"
          >
            스탬프 적립하기
          </Button>
        )}
      </div>
    </div>
  );
}

export default CardDetailView;
