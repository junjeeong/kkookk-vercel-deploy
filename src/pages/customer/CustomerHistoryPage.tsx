/**
 * CustomerHistoryPage Component
 * Activity history page for customer
 */

import { useState } from 'react';
import { ChevronLeft, History, Check, X, Gift } from 'lucide-react';
import { formatFullDateTime } from '@/lib/utils/format';
import type { IssuanceRequest } from '@/types/domain';

interface CustomerHistoryPageProps {
  requests: IssuanceRequest[];
  onBack: () => void;
}

type HistoryFilter = 'all' | 'stamp' | 'reward';

export function CustomerHistoryPage({
  requests,
  onBack,
}: CustomerHistoryPageProps) {
  const [filter, setFilter] = useState<HistoryFilter>('all');

  const filteredRequests = requests
    .filter((req) => req.status !== 'pending')
    .filter((req) => {
      if (filter === 'all') return true;
      return req.type === filter;
    })
    .sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center sticky top-0 bg-white z-10 justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg ml-2 text-kkookk-navy">활동 이력</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-slate-50 flex gap-2">
        {(['all', 'stamp', 'reward'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              filter === f
                ? 'bg-kkookk-navy text-white shadow-md shadow-slate-200'
                : 'bg-slate-100 text-kkookk-steel hover:bg-slate-200'
            }`}
          >
            {f === 'all'
              ? '전체'
              : f === 'stamp'
                ? '스탬프 적립'
                : '리워드 사용'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6">
        {filteredRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-kkookk-steel">
            <History size={48} className="opacity-20 mb-4" />
            <p>내역이 없습니다.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 animate-in fade-in slide-in-from-bottom-2"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    req.status === 'rejected'
                      ? 'bg-red-50 text-red-500'
                      : req.type === 'stamp'
                        ? 'bg-orange-50 text-kkookk-orange-500'
                        : 'bg-purple-50 text-purple-600'
                  }`}
                >
                  {req.status === 'rejected' ? (
                    <X size={20} />
                  ) : req.type === 'stamp' ? (
                    <Check size={20} />
                  ) : (
                    <Gift size={20} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-kkookk-navy">
                      {req.store}
                    </p>
                    {req.status === 'rejected' && (
                      <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">
                        거절됨
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-kkookk-steel mt-0.5">
                    {formatFullDateTime(req.time)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`font-bold text-base ${
                    req.status === 'rejected'
                      ? 'text-kkookk-steel line-through opacity-50'
                      : req.type === 'stamp'
                        ? 'text-kkookk-orange-500'
                        : 'text-kkookk-navy'
                  }`}
                >
                  {req.type === 'stamp' ? `+${req.count}` : '사용'}
                </span>
                <p className="text-[10px] text-kkookk-steel mt-0.5">
                  {req.type === 'stamp' ? '스탬프' : '리워드'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CustomerHistoryPage;
