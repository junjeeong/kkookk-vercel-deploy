/**
 * ApprovalQueue Component
 * Real-time queue of pending requests for terminal approval
 */

import { Loader2 } from 'lucide-react';
import { PendingRequestsList } from '@/features/issuance/components/terminal/PendingRequestsList';
import type { IssuanceRequest } from '@/types/domain';

interface ApprovalQueueProps {
  requests: IssuanceRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ApprovalQueue({
  requests,
  onApprove,
  onReject,
}: ApprovalQueueProps) {
  const pendingRequests = requests.filter((r) => r.status === 'pending');

  return (
    <>
      <div className="p-6 pb-2 flex justify-between items-end">
        <h2 className="text-2xl font-bold text-kkookk-navy">
          승인 요청{' '}
          <span className="text-kkookk-orange-500">{pendingRequests.length}</span>
          건
        </h2>
        <span className="text-sm text-kkookk-steel flex items-center gap-2">
          <Loader2 className="animate-spin" size={12} /> 실시간 갱신 중
        </span>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto content-start flex-1">
        <PendingRequestsList
          requests={pendingRequests}
          onApprove={onApprove}
          onReject={onReject}
        />
      </div>
    </>
  );
}

export default ApprovalQueue;
