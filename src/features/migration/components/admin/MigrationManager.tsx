/**
 * MigrationManager Component
 * Admin view for managing migration requests
 */

import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatShortDate } from '@/lib/utils/format';
import type { MigrationRequest, MigrationStatus } from '@/types/domain';

interface MigrationManagerProps {
  migrations: MigrationRequest[];
  storeName: string;
  onAction: (id: string, newStatus: MigrationStatus) => void;
}

export function MigrationManager({
  migrations,
  storeName,
  onAction,
}: MigrationManagerProps) {
  const [viewImage, setViewImage] = useState<string | null>(null);

  const storeMigrations = migrations.filter((m) => m.storeName === storeName);

  const getStatusBadge = (status: MigrationStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">대기중</Badge>;
      case 'approved':
        return <Badge variant="success">승인됨</Badge>;
      case 'rejected':
        return <Badge variant="destructive">반려됨</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-kkookk-navy">전환 신청 관리</h3>
        <span className="text-sm text-kkookk-steel">
          총 {storeMigrations.length}건
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex-1 flex flex-col">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 pl-6 text-xs font-bold text-kkookk-steel">
                신청일
              </th>
              <th className="p-4 text-xs font-bold text-kkookk-steel">
                신청자
              </th>
              <th className="p-4 text-xs font-bold text-kkookk-steel">수량</th>
              <th className="p-4 text-xs font-bold text-kkookk-steel">
                증빙 사진
              </th>
              <th className="p-4 text-xs font-bold text-kkookk-steel">상태</th>
              <th className="p-4 text-xs font-bold text-kkookk-steel text-right pr-6">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {storeMigrations.map((mig) => (
              <tr key={mig.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 pl-6 text-sm text-kkookk-steel font-mono">
                  {formatShortDate(mig.date)}
                </td>
                <td className="p-4 text-sm font-bold text-kkookk-navy">
                  익명 사용자
                </td>
                <td className="p-4 text-sm font-bold text-kkookk-navy">
                  {mig.count}개
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setViewImage(mig.id)}
                    className="flex items-center gap-1 text-xs font-bold text-kkookk-orange-500 hover:underline"
                  >
                    <ImageIcon size={14} /> 확인하기
                  </button>
                </td>
                <td className="p-4">{getStatusBadge(mig.status)}</td>
                <td className="p-4 text-right pr-6">
                  {mig.status === 'pending' && (
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => onAction(mig.id, 'rejected')}
                        variant="subtle"
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        반려
                      </Button>
                      <Button
                        onClick={() => onAction(mig.id, 'approved')}
                        variant="navy"
                        size="sm"
                      >
                        승인
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {storeMigrations.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-12 text-center text-kkookk-steel"
                >
                  신청 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Image Preview Modal */}
      {viewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-kkookk-navy/80 backdrop-blur-sm"
          role="presentation"
        >
          {/* Backdrop button */}
          <button
            type="button"
            aria-label="이미지 미리보기 닫기"
            className="absolute inset-0 w-full h-full cursor-default"
            onClick={() => setViewImage(null)}
          />
          {/* Dialog panel */}
          <div
            role="dialog"
            aria-label="이미지 미리보기"
            aria-modal="true"
            className="relative bg-white rounded-2xl p-2 max-w-sm w-full animate-in zoom-in-95"
          >
            <div className="aspect-[3/4] bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400">
              <ImageIcon size={48} className="mb-2" />
              <p className="text-sm">이미지 미리보기 (시뮬레이션)</p>
            </div>
            <button
              type="button"
              onClick={() => setViewImage(null)}
              className="w-full py-3 mt-2 font-bold text-kkookk-navy hover:bg-slate-50 rounded-xl"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MigrationManager;
