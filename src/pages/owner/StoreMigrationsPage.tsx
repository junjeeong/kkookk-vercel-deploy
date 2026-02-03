/**
 * StoreMigrationsPage 컴포넌트
 * 매장 전환 신청 관리 페이지
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin } from 'lucide-react';
import { MigrationManager } from '@/features/migration/components/admin';
import { MOCK_MIGRATIONS, MOCK_STORES } from '@/lib/constants/mockData';
import type { MigrationRequest, MigrationStatus } from '@/types/domain';

interface StoreMigrationsPageProps {
  migrations?: MigrationRequest[];
}

export function StoreMigrationsPage({
  migrations: initialMigrations = MOCK_MIGRATIONS,
}: StoreMigrationsPageProps) {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [migrations, setMigrations] = useState(initialMigrations);

  const store = MOCK_STORES.find((s) => s.id === Number(storeId));
  const pendingMigrations = migrations.filter(
    (m) => m.storeName === store?.name && m.status === 'pending'
  );

  if (!store) {
    return (
      <div className="p-8 text-center">
        <p className="text-kkookk-steel">매장을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleAction = (id: string, newStatus: MigrationStatus) => {
    setMigrations((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
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
              <MapPin size={12} /> {store.address}
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
        />
      </div>
    </div>
  );
}

export default StoreMigrationsPage;
