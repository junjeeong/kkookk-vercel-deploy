/**
 * RewardList Component
 * List of rewards in the reward box
 */

import { ChevronLeft } from 'lucide-react';
import { RewardCard } from './RewardCard';
import type { Reward } from '@/types/domain';

interface RewardListProps {
  rewards: Reward[];
  onBack: () => void;
  onRedeem: (reward: Reward) => void;
}

export function RewardList({ rewards, onBack, onRedeem }: RewardListProps) {
  return (
    <div className="h-full bg-kkookk-sand flex flex-col relative pt-12">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center sticky top-0 z-10 -mt-12 pt-12">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-kkookk-navy">리워드 보관함</h1>
      </div>

      {/* Rewards List */}
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
              onRedeem={reward.isUsed ? undefined : () => onRedeem(reward)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default RewardList;
