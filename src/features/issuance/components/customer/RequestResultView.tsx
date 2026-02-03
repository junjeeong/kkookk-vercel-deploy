/**
 * RequestResultView Component
 * Result view after stamp request is processed
 */

import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RequestResultViewProps {
  success: boolean;
  stampCount: number;
  onConfirm: () => void;
}

export function RequestResultView({
  success,
  stampCount,
  onConfirm,
}: RequestResultViewProps) {
  return (
    <div className="h-full flex flex-col p-6 justify-center text-center">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-kkookk-red'
        }`}
      >
        {success ? <Check size={40} /> : <X size={40} />}
      </div>

      <h2 className="text-2xl font-bold mb-2 text-kkookk-navy">
        {success ? '적립 완료!' : '승인되지 않았어요'}
      </h2>

      <p className="text-kkookk-steel mb-8">
        {success ? `지금 ${stampCount}개예요` : '매장에 문의해주세요'}
      </p>

      <Button onClick={onConfirm} variant="subtle" size="full">
        {success ? '확인' : '다시 시도하기'}
      </Button>
    </div>
  );
}

export default RequestResultView;
