/**
 * StoreMigrationsPage 컴포넌트
 * 매장 전환 신청 관리 페이지
 */

import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { MigrationManager } from '@/features/migration/components/admin';
import { useStore } from '@/features/store-management/hooks/useStore';
import {
  useStoreMigrations,
  useApproveMigration,
  useRejectMigration,
} from '@/features/migration/hooks/useOwnerMigration';
import type { MigrationStatus } from '@/types/domain';

export function StoreMigrationsPage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const storeIdNum = Number(storeId);

  // API Hooks
  const { data: store, isLoading: storeLoading, error: storeError } = useStore(storeIdNum);
  const {
    data: apiMigrations,
    isLoading: migrationsLoading,
    refetch: refetchMigrations,
    isFetching: isRefreshing,
  } = useStoreMigrations(storeIdNum);
  const approveMigration = useApproveMigration();
  const rejectMigration = useRejectMigration();

  const handleRefresh = () => {
    refetchMigrations();
  };

  // Transform API data to component format
  // Safely handle migrations data (could be array, paginated response, or undefined)
  const migrations = (Array.isArray(apiMigrations) ? apiMigrations : []).map((m) => ({
    id: String(m.id),
    storeName: store?.name ?? '',
    count: m.claimedStampCount,
    status: m.status.toLowerCase() as MigrationStatus,
    date: new Date(m.requestedAt),
    imageUrl: m.imageData,
    rejectReason: m.rejectReason ?? undefined,
  }));

  const pendingMigrations = migrations.filter((m) => m.status === 'pending');

  // Loading state
  if (storeLoading || migrationsLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-kkookk-indigo" />
        <p className="mt-4 text-kkookk-steel">불러오는 중...</p>
      </div>
    );
  }

  // Error or not found state
  if (storeError || !store) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
        <p className="mt-4 text-kkookk-steel">매장을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleAction = (id: string, newStatus: MigrationStatus, approvedCount?: number, rejectReason?: string) => {
    const migrationId = Number(id);

    if (newStatus === 'approved' && approvedCount !== undefined) {
      approveMigration.mutate({
        storeId: storeIdNum,
        migrationId,
        data: { approvedStampCount: approvedCount },
      });
    } else if (newStatus === 'rejected' && rejectReason) {
      rejectMigration.mutate({
        storeId: storeIdNum,
        migrationId,
        data: { rejectReason },
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(`/owner/stores/${storeId}`)}
            className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-kkookk-navy">{store.name}</h2>
            <p className="text-kkookk-steel text-sm flex items-center gap-1">
              <MapPin size={12} /> {store.address || '주소 미등록'}
            </p>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-1">
          <button
            onClick={() => navigate(`/owner/stores/${storeId}`)}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-colors text-kkookk-steel hover:bg-slate-50"
          >
            스탬프 카드 관리
          </button>
          <button
            onClick={() => navigate(`/owner/stores/${storeId}/history`)}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-colors text-kkookk-steel hover:bg-slate-50"
          >
            적립/사용 내역
          </button>
          <button className="px-4 py-2 rounded-lg font-bold text-sm transition-colors bg-kkookk-navy text-white">
            전환 신청 관리
            {pendingMigrations.length > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                N
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 마이그레이션 매니저 */}
      <div className="flex-1 overflow-y-auto">
        <MigrationManager
          migrations={migrations}
          storeName={store.name}
          onAction={handleAction}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />
      </div>
    </div>
  );
}

export default StoreMigrationsPage;
