/**
 * RedeemScreen 컴포넌트
 * TTL 카운트다운 및 직원 확인 기능이 포함된 메인 리딤 화면
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TestTube } from 'lucide-react';
import { TTLCountdown } from './TTLCountdown';
import { StaffConfirmModal } from './StaffConfirmModal';
import { Button } from '@/components/ui/Button';
import { REDEEM_TTL_SECONDS } from '../types';

interface RedeemScreenProps {
  showDevControls?: boolean;
}

export function RedeemScreen({
  showDevControls = true,
}: RedeemScreenProps) {
  const navigate = useNavigate();
  const { redeemId } = useParams<{ redeemId: string }>();

  const handleComplete = useCallback((success: boolean) => {
    // TODO: API 연동 후 실제 처리
    console.log('Redeem completed:', redeemId, success);
    navigate('/customer/redeems');
  }, [navigate, redeemId]);
  const [showStaffConfirm, setShowStaffConfirm] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(REDEEM_TTL_SECONDS);
  const [isExpired, setIsExpired] = useState(false);

  // TTL 카운트다운
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
    handleComplete(true);
  }, [handleComplete]);

  const handleStaffCancel = useCallback(() => {
    setShowStaffConfirm(false);
  }, []);

  // 만료 상태 표시
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
        <Button onClick={() => handleComplete(false)} variant="subtle" size="full">
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

          {/* TTL 카운트다운 */}
          <div className="mb-6">
            <TTLCountdown seconds={remainingSeconds} />
          </div>

          {/* 직원 액션 버튼 */}
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

      {/* 개발자 시뮬레이션 컨트롤 */}
      {showDevControls && (
        <div className="bg-white/90 rounded-2xl p-4 mb-8 backdrop-blur-sm border border-slate-200 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-3 text-kkookk-steel text-xs font-medium">
            <TestTube size={14} />
            <span>Developer Simulation Mode</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleComplete(false)}
              className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl border border-red-200 transition-colors"
            >
              거절 시나리오 (테스트용)
            </button>
          </div>
        </div>
      )}

      {/* 직원 확인 모달 (PRD에 따른 2단계 확인) */}
      <StaffConfirmModal
        isOpen={showStaffConfirm}
        onConfirm={handleStaffConfirm}
        onCancel={handleStaffCancel}
      />
    </div>
  );
}

export default RedeemScreen;
