/**
 * StoreHistoryPage 컴포넌트
 * 매장 적립/사용 이력 페이지
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, MapPin } from 'lucide-react';
import { formatDateTime, maskPhone } from '@/lib/utils/format';
import { MOCK_REQUESTS, MOCK_STORES, MOCK_MIGRATIONS } from '@/lib/constants/mockData';
import type { IssuanceRequest } from '@/types/domain';

type HistoryFilter = 'all' | 'stamp' | 'reward';

interface StoreHistoryPageProps {
  requests?: IssuanceRequest[];
}

export function StoreHistoryPage({ requests = MOCK_REQUESTS }: StoreHistoryPageProps) {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');

  const store = MOCK_STORES.find((s) => s.id === Number(storeId));
  const pendingMigrations = MOCK_MIGRATIONS.filter(
    (m) => m.storeName === store?.name && m.status === 'pending'
  );

  if (!store) {
    return (
      <div className="p-8 text-center">
        <p className="text-kkookk-steel">매장을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const filteredRequests = requests
    .filter((req) => req.store === store.name)
    .filter((req) => req.status !== 'pending')
    .filter((req) => {
      if (historyFilter === 'all') return true;
      return req.type === historyFilter;
    })
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

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
          <button className="px-4 py-2 rounded-lg font-bold text-sm transition-colors bg-kkookk-navy text-white">
            적립/사용 내역
          </button>
          <button
            onClick={() => navigate(`/owner/stores/${storeId}/migrations`)}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-colors text-kkookk-steel hover:bg-slate-50"
          >
            전환 신청 관리
            {pendingMigrations.length > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                N
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 컨텐츠 */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-kkookk-navy">적립/사용 내역</h3>
            <div className="flex bg-white border border-slate-200 rounded-lg p-1">
              {(['all', 'stamp', 'reward'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setHistoryFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${
                    historyFilter === filter
                      ? 'bg-kkookk-navy text-white'
                      : 'text-kkookk-steel hover:bg-slate-50'
                  }`}
                >
                  {filter === 'all'
                    ? '전체'
                    : filter === 'stamp'
                      ? '스탬프 적립'
                      : '리워드 사용'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex-1 flex flex-col">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 pl-6 text-xs font-bold text-kkookk-steel">
                    일시
                  </th>
                  <th className="p-4 text-xs font-bold text-kkookk-steel">
                    닉네임
                  </th>
                  <th className="p-4 text-xs font-bold text-kkookk-steel">
                    연락처
                  </th>
                  <th className="p-4 text-xs font-bold text-kkookk-steel">구분</th>
                  <th className="p-4 text-xs font-bold text-kkookk-steel text-right pr-6">
                    내용
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 pl-6 text-sm text-kkookk-steel font-mono">
                      {formatDateTime(req.time)}
                    </td>
                    <td className="p-4 text-sm font-bold text-kkookk-navy">
                      {req.user}
                    </td>
                    <td className="p-4 text-sm text-kkookk-steel font-mono">
                      {maskPhone(req.phone)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded ${
                          req.type === 'stamp'
                            ? 'bg-kkookk-orange-50 text-kkookk-orange-500'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {req.type === 'stamp' ? '적립' : '사용'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-right pr-6 font-bold text-kkookk-navy">
                      {req.type === 'stamp' ? `+${req.count}` : '쿠폰 사용'}
                    </td>
                  </tr>
                ))}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-12 text-center text-kkookk-steel"
                    >
                      해당하는 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreHistoryPage;
