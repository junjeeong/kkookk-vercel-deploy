/**
 * RewardList 컴포넌트
 * 리워드 보관함의 리워드 목록 (API 연동)
 */

import { useStepUpModal } from "@/app/providers/StepUpModalProvider";
import { useWalletRewards } from "@/features/wallet/hooks/useWallet";
import { useCustomerNavigate } from "@/hooks/useCustomerNavigate";
import { formatShortDate } from "@/lib/utils/format";
import type { WalletRewardItem } from "@/types/api";
import type { Reward } from "@/types/domain";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Gift, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RewardCard } from "./RewardCard";

function mapReward(item: WalletRewardItem): Reward {
  const isUsed = item.status === "REDEEMED" || item.status === "EXPIRED";
  return {
    id: String(item.id),
    storeName: item.store.storeName,
    stampCardTitle: item.stampCardTitle,
    name: item.rewardName,
    expiry: formatShortDate(new Date(item.expiresAt)),
    isUsed,
    designJson: item.designJson,
  };
}

export function RewardList() {
  const { customerNavigate, customerPath } = useCustomerNavigate();
  const navigate = useNavigate();
  const { isVerified, openStepUpModal } = useStepUpModal();
  const queryClient = useQueryClient();
  const { data, isLoading } = useWalletRewards();

  // 본인인증 체크 및 모달 트리거
  useEffect(() => {
    if (!isVerified) {
      // 인증 안 되어 있으면 지갑 페이지로 돌아가고 모달 열기
      navigate(customerPath("/wallet"), { replace: true });
      openStepUpModal(() => {
        // 인증 완료 후 쿼리 무효화 및 페이지 이동
        queryClient.invalidateQueries({ queryKey: ["walletRewards"] });
        navigate(customerPath("/redeems"));
      });
    }
  }, [isVerified, openStepUpModal, queryClient, navigate, customerPath]);

  const rewards: Reward[] = data?.rewards?.map((item) => mapReward(item)) ?? [];

  const handleRedeem = (reward: Reward) => {
    customerNavigate(`/redeems/${reward.id}/use`);
  };

  return (
    <div className="relative flex flex-col h-full pt-12">
      {/* 헤더 */}
      <div className="px-6 py-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center sticky top-0 z-10 -mt-12 ">
        <button
          onClick={() => customerNavigate("/wallet")}
          className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="ml-2 text-lg font-bold text-kkookk-navy">
          리워드 보관함
        </h1>
      </div>

      {/* 리워드 목록 */}
      <div className="p-6 space-y-4 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-kkookk-steel">
            <Loader2 size={32} className="mb-4 animate-spin opacity-40" />
            <p>리워드를 불러오는 중...</p>
          </div>
        ) : rewards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-kkookk-steel">
            <Gift size={48} className="mb-4 opacity-20" />
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
