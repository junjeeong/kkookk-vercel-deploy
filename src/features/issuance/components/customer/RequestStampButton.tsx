/**
 * RequestStampButton Component
 * Button to initiate stamp request flow
 */

import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { StampCard } from '@/types/domain';

interface RequestStampButtonProps {
  card: StampCard;
  onRequest: () => void;
  onCancel: () => void;
}

export function RequestStampButton({
  card,
  onRequest,
  onCancel,
}: RequestStampButtonProps) {
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
        <Button onClick={onRequest} variant="primary" size="full" className="shadow-lg">
          요청 보내기
        </Button>
        <Button onClick={onCancel} variant="subtle" size="full">
          취소
        </Button>
      </div>
    </div>
  );
}

export default RequestStampButton;
