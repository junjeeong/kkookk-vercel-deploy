/**
 * MigrationList Component
 * Customer view of migration request history
 */

import { ChevronLeft, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { formatShortDate } from '@/lib/utils/format';
import type { MigrationRequest } from '@/types/domain';

interface MigrationListProps {
  migrations: MigrationRequest[];
  onBack: () => void;
  onNewRequest: () => void;
}

export function MigrationList({
  migrations,
  onBack,
  onNewRequest,
}: MigrationListProps) {
  const getStatusBadge = (status: MigrationRequest['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">제출됨</Badge>;
      case 'approved':
        return <Badge variant="success">승인됨</Badge>;
      case 'rejected':
        return <Badge variant="destructive">반려됨</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-kkookk-sand flex flex-col pt-12">
      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 -mt-12 pt-12">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg ml-2 text-kkookk-navy">
            종이 스탬프 전환
          </h1>
        </div>
        <button
          onClick={onNewRequest}
          className="w-8 h-8 bg-kkookk-navy text-white rounded-lg flex items-center justify-center hover:bg-slate-800"
          aria-label="새 신청"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* List */}
      <div className="p-6 space-y-4 overflow-y-auto">
        {migrations.length === 0 ? (
          <div className="text-center text-kkookk-steel mt-20">
            <p>신청 내역이 없습니다.</p>
          </div>
        ) : (
          migrations.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-kkookk-navy">{item.storeName}</h3>
                {getStatusBadge(item.status)}
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-kkookk-steel">
                  신청 수량:{' '}
                  <span className="font-bold text-kkookk-navy">
                    {item.count}개
                  </span>
                </p>
                <p className="text-xs text-slate-400">
                  {formatShortDate(item.date)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MigrationList;
