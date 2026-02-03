/**
 * RedeemScreen Component
 * Main redemption screen with TTL countdown and staff confirmation
 */

import { useState, useEffect, useCallback } from 'react';
import { TestTube } from 'lucide-react';
import { TTLCountdown } from './TTLCountdown';
import { StaffConfirmModal } from './StaffConfirmModal';
import { Button } from '@/components/ui/Button';
import { REDEEM_TTL_SECONDS } from '../types';
import type { Reward } from '@/types/domain';

interface RedeemScreenProps {
  _reward?: Reward;
  onComplete: (success: boolean) => void;
  showDevControls?: boolean;
}

export function RedeemScreen({
  onComplete,
  showDevControls = true,
}: RedeemScreenProps) {
  const [showStaffConfirm, setShowStaffConfirm] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(REDEEM_TTL_SECONDS);
  const [isExpired, setIsExpired] = useState(false);

  // TTL Countdown
  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  const handleStaffConfirm = useCallback(() => {
    setShowStaffConfirm(false);
    onComplete(true);
  }, [onComplete]);

  const handleStaffCancel = useCallback(() => {
    setShowStaffConfirm(false);
  }, []);

  // Show expired state
  if (isExpired) {
    return (
      <div className="h-full flex flex-col p-6 justify-center text-center bg-white">
        <div className="w-20 h-20 bg-red-100 text-kkookk-red rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⏱️</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-kkookk-navy">
          요청이 만료되었습니다
        </h2>
        <p className="text-kkookk-steel mb-8">
          다시 사용하기를 눌러주세요.
        </p>
        <Button onClick={() => onComplete(false)} variant="subtle" size="full">
          돌아가기
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6 justify-center text-center bg-red-50 relative">
      <div className="flex-1 flex flex-col justify-center w-full">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full">
          <h2 className="text-xl font-bold text-kkookk-red mb-2">
            사장님 확인 중
          </h2>
          <p className="text-kkookk-steel text-sm mb-6">
            화면을 직원에게 보여주세요
          </p>

          {/* TTL Countdown */}
          <div className="mb-6">
            <TTLCountdown seconds={remainingSeconds} />
          </div>

          {/* Staff Action Button */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <Button
              onClick={() => setShowStaffConfirm(true)}
              variant="navy"
              size="full"
              className="animate-pulse text-lg"
            >
              사용 처리 완료 (직원용)
            </Button>
            <p className="text-[10px] text-kkookk-steel mt-3">
              직원이 직접 버튼을 눌러주세요
            </p>
          </div>
        </div>
      </div>

      {/* Developer Simulation Controls */}
      {showDevControls && (
        <div className="bg-white/90 rounded-2xl p-4 mb-8 backdrop-blur-sm border border-slate-200 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-3 text-kkookk-steel text-xs font-medium">
            <TestTube size={14} />
            <span>Developer Simulation Mode</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onComplete(false)}
              className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl border border-red-200 transition-colors"
            >
              거절 시나리오 (테스트용)
            </button>
          </div>
        </div>
      )}

      {/* Staff Confirmation Modal (2-step confirmation per PRD) */}
      <StaffConfirmModal
        isOpen={showStaffConfirm}
        onConfirm={handleStaffConfirm}
        onCancel={handleStaffCancel}
      />
    </div>
  );
}

export default RedeemScreen;
