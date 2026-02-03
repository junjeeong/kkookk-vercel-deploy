/**
 * StoreDetailPage 컴포넌트
 * 매장 상세 페이지 (탭: 카드 / 히스토리 / 전환신청)
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Plus,
  Edit,
  BarChart3,
  Trash2,
  Coffee,
} from 'lucide-react';
import { MOCK_STORES, MOCK_ADMIN_CARDS, MOCK_MIGRATIONS } from '@/lib/constants/mockData';
import type { AdminStampCard } from '@/types/domain';

type TabType = 'cards' | 'history' | 'migrations';

export function StoreDetailPage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [storeDetailTab, setStoreDetailTab] = useState<TabType>('cards');

  const store = MOCK_STORES.find((s) => s.id === Number(storeId));
  const pendingMigrations = MOCK_MIGRATIONS.filter(
    (m) => m.storeName === store?.name && m.status === 'pending'
  );

  if (!store) {
    return (
      <div className="p-8 text-center">
        <p className="text-kkookk-steel">매장을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/owner/stores')}
          className="mt-4 px-4 py-2 border border-slate-200 rounded-lg text-kkookk-navy font-bold hover:bg-slate-50"
        >
          매장 목록으로
        </button>
      </div>
    );
  }

  const handleTabClick = (tab: TabType) => {
    if (tab === 'history') {
      navigate(`/owner/stores/${storeId}/history`);
    } else if (tab === 'migrations') {
      navigate(`/owner/stores/${storeId}/migrations`);
    } else {
      setStoreDetailTab(tab);
    }
  };

  const getStatusBadge = (status: AdminStampCard['status']) => {
    switch (status) {
      case 'draft':
        return (
          <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">
            작성 중
          </span>
        );
      case 'inactive':
        return (
          <span className="text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-500">
            종료됨
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/owner/stores')}
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
            onClick={() => handleTabClick('cards')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              storeDetailTab === 'cards'
                ? 'bg-kkookk-navy text-white'
                : 'text-kkookk-steel hover:bg-slate-50'
            }`}
          >
            스탬프 카드 관리
          </button>
          <button
            onClick={() => handleTabClick('history')}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-colors text-kkookk-steel hover:bg-slate-50"
          >
            적립/사용 내역
          </button>
          <button
            onClick={() => handleTabClick('migrations')}
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

      {/* 카드 관리 탭 컨텐츠 */}
      <div className="flex-1 overflow-y-auto">
        {storeDetailTab === 'cards' && (
          <div className="p-8 max-w-6xl mx-auto w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-kkookk-navy">
                  보유 스탬프 카드
                </h3>
                <p className="text-kkookk-steel text-sm mt-1">
                  고객에게 발급할 적립 카드를 관리합니다.
                </p>
              </div>
              <button
                onClick={() => navigate(`/owner/stores/${storeId}/stamp-cards/new`)}
                className="px-6 py-3 bg-kkookk-navy text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Plus size={20} /> 새 스탬프 카드 만들기
              </button>
            </div>

            {/* 현재 진행 중 (Active) */}
            <div className="mb-10">
              <h4 className="font-bold text-kkookk-navy mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                현재 진행 중 (Active)
              </h4>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-8 items-center shadow-sm hover:shadow-md transition-shadow">
                {/* 카드 미리보기 */}
                <div className="w-80 h-48 bg-gradient-to-br from-kkookk-orange-500 to-[#E04F00] rounded-xl shadow-lg relative flex flex-col p-6 text-white overflow-hidden shrink-0">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-bold text-lg opacity-90">
                      {store.name}
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      D-365
                    </span>
                  </div>
                  <div className="mt-auto flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80 mb-1">진행률</p>
                      <p className="text-2xl font-bold">3 / 10</p>
                    </div>
                    <Coffee className="text-white/20 w-16 h-16 absolute -right-4 -bottom-4" />
                  </div>
                </div>

                {/* 카드 정보 */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-xl font-bold text-kkookk-navy">
                      단골 스탬프
                    </h4>
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                      게시 중
                    </span>
                  </div>
                  <p className="text-kkookk-steel text-sm mb-6">
                    10개 적립 시 아메리카노 1잔 제공
                  </p>
                  <div className="flex gap-8 text-sm">
                    <div>
                      <p className="text-kkookk-steel mb-1">누적 적립</p>
                      <p className="font-bold text-kkookk-navy text-lg">1,240회</p>
                    </div>
                    <div>
                      <p className="text-kkookk-steel mb-1">쿠폰 발급</p>
                      <p className="font-bold text-kkookk-navy text-lg">128장</p>
                    </div>
                  </div>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-kkookk-navy hover:bg-slate-50 flex items-center gap-2">
                    <Edit size={16} /> 수정
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/owner/stores/${storeId}/stamp-cards/1/stats`)
                    }
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-kkookk-navy hover:bg-slate-50 flex items-center gap-2"
                  >
                    <BarChart3 size={16} /> 통계
                  </button>
                </div>
              </div>
            </div>

            {/* 보관함 / 초안 */}
            <div>
              <h4 className="font-bold text-kkookk-steel mb-4">보관함 / 초안</h4>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-xs font-bold text-kkookk-steel pl-6">
                        상태
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel">
                        카드명
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel">
                        혜택
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel">
                        생성일
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel text-right pr-6">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_ADMIN_CARDS.map((card) => (
                      <tr
                        key={card.id}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        <td className="p-4 pl-6">{getStatusBadge(card.status)}</td>
                        <td className="p-4 text-sm font-bold text-kkookk-navy">
                          {card.name}
                        </td>
                        <td className="p-4 text-sm text-kkookk-steel">
                          {card.benefit}
                        </td>
                        <td className="p-4 text-sm text-kkookk-steel font-mono">
                          {card.created}
                        </td>
                        <td className="p-4 text-right pr-6">
                          <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-200 rounded-lg">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-kkookk-steel hover:text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {MOCK_ADMIN_CARDS.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-12 text-center text-kkookk-steel"
                        >
                          보관함에 카드가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreDetailPage;
