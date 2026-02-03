/**
 * RewardList 컴포넌트
 * 리워드 보관함의 리워드 목록
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { RewardCard } from './RewardCard';
import { MOCK_REWARDS } from '@/lib/constants/mockData';
import type { Reward } from '@/types/domain';

interface RewardListProps {
  rewards?: Reward[];
}

export function RewardList({ rewards = MOCK_REWARDS }: RewardListProps) {
  const navigate = useNavigate();

  const handleRedeem = (reward: Reward) => {
    navigate(`/customer/redeems/${reward.id}/use`);
  };

  return (
    <div className="h-full flex flex-col relative pt-12">
      {/* 헤더 */}
      <div className="px-6 py-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center sticky top-0 z-10 -mt-12 pt-12">
        <button
          onClick={() => navigate('/customer/wallet')}
          className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-kkookk-navy">리워드 보관함</h1>
      </div>

      {/* 리워드 목록 */}
      <div className="p-6 space-y-4 overflow-y-auto">
        {rewards.length === 0 ? (
          <div className="text-center text-kkookk-steel py-20">
            <p>보관함이 비어있습니다.</p>
          </div>
        ) : (
          rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              onRedeem={reward.isUsed ? undefined : () => handleRedeem(reward)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RewardList;
