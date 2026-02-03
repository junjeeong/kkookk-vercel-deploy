/**
 * ProcessedHistory Component
 * History table of processed requests
 */

import { formatTime, maskPhone } from '@/lib/utils/format';
import { Badge } from '@/components/ui/Badge';
import type { IssuanceRequest } from '@/types/domain';

interface ProcessedHistoryProps {
  requests: IssuanceRequest[];
}

export function ProcessedHistory({ requests }: ProcessedHistoryProps) {
  const historyRequests = requests
    .filter((r) => r.status !== 'pending')
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return (
    <>
      <div className="p-6 pb-2">
        <h2 className="text-2xl font-bold text-kkookk-navy">최근 처리 내역</h2>
      </div>
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-kkookk-steel">시간</th>
                <th className="p-4 text-xs font-bold text-kkookk-steel">
                  닉네임
                </th>
                <th className="p-4 text-xs font-bold text-kkookk-steel">
                  전화번호
                </th>
                <th className="p-4 text-xs font-bold text-kkookk-steel">내용</th>
                <th className="p-4 text-xs font-bold text-kkookk-steel">결과</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {historyRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-kkookk-steel text-sm"
                  >
                    처리된 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                historyRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-kkookk-navy font-mono">
                      {formatTime(req.time)}
                    </td>
                    <td className="p-4 text-sm text-kkookk-navy font-bold">
                      {req.user}
                    </td>
                    <td className="p-4 text-sm text-kkookk-steel font-mono">
                      {maskPhone(req.phone)}
                    </td>
                    <td className="p-4 text-sm text-kkookk-navy">
                      {req.type === 'stamp'
                        ? `스탬프 +${req.count}개`
                        : '리워드 사용'}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          req.status === 'approved' ? 'success' : 'destructive'
                        }
                      >
                        {req.status === 'approved' ? '승인됨' : '거절됨'}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProcessedHistory;
