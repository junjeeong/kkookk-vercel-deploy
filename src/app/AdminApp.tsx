/**
 * AdminApp Component
 * Owner backoffice application (simplified version)
 */

import { useState } from 'react';
import {
  Plus,
  ChevronLeft,
  Coffee,
  Edit,
  BarChart3,
  Trash2,
} from 'lucide-react';
import { OwnerLoginPage } from '@/features/auth/pages/OwnerLoginPage';
import { StoreCard } from '@/features/store-management/components/StoreCard';
import { QRPosterModal } from '@/features/store-management/components/QRPosterModal';
import { StampCardCreateForm } from '@/features/store-management/components/StampCardCreateForm';
import { StampCardStats } from '@/features/store-management/components/StampCardStats';
import { MigrationManager } from '@/features/migration/components/admin/MigrationManager';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  MOCK_STORES,
  MOCK_ADMIN_CARDS,
  MOCK_MIGRATIONS,
  MOCK_REQUESTS,
} from '@/lib/constants/mockData';
import { formatDateTime, maskPhone } from '@/lib/utils/format';
import type { Store, MigrationStatus, MigrationRequest, AdminStampCard } from '@/types/domain';

interface AdminAppProps {
  goBack: () => void;
}

type StoreDetailTab = 'cards' | 'history' | 'migrations';
type HistoryFilter = 'all' | 'stamp' | 'reward';
type CardViewMode = 'list' | 'create' | 'stats';

export function AdminApp({ goBack }: AdminAppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [cardViewMode, setCardViewMode] = useState<CardViewMode>('list');
  const [storeDetailTab, setStoreDetailTab] = useState<StoreDetailTab>('cards');
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('all');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrStoreName, setQrStoreName] = useState('');
  const [adminMigrations, setAdminMigrations] =
    useState<MigrationRequest[]>(MOCK_MIGRATIONS);
  const [adminCards, setAdminCards] = useState<AdminStampCard[]>(MOCK_ADMIN_CARDS);

  const handleCreateCard = (cardData: Omit<AdminStampCard, 'id'>) => {
    const newCard: AdminStampCard = {
      ...cardData,
      id: Date.now(),
    };
    setAdminCards((prev) => [newCard, ...prev]);
    setCardViewMode('list');
  };

  const handleOpenQRModal = (e: React.MouseEvent, storeName: string) => {
    e.stopPropagation();
    setQrStoreName(storeName);
    setShowQRModal(true);
  };

  const handleMigrationAction = (id: string, newStatus: MigrationStatus) => {
    setAdminMigrations((prev) =>
      prev.map((mig) => (mig.id === id ? { ...mig, status: newStatus } : mig))
    );
  };

  const getFilteredHistory = () => {
    let filtered = MOCK_REQUESTS.filter((r) => r.status !== 'pending').sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    if (historyFilter === 'stamp')
      filtered = filtered.filter((r) => r.type === 'stamp');
    if (historyFilter === 'reward')
      filtered = filtered.filter((r) => r.type === 'reward');
    return filtered;
  };

  if (!isLoggedIn) {
    return (
      <OwnerLoginPage
        title="사장님 백오피스"
        subtitle="통합 관리자 계정으로 로그인하세요."
        onLoginSuccess={() => setIsLoggedIn(true)}
        onBack={goBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-kkookk-sand flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg text-kkookk-navy">
          <div className="w-8 h-8 bg-kkookk-navy rounded-lg flex items-center justify-center text-white">
            B
          </div>
          Boss Partners
        </div>
        <button
          onClick={goBack}
          className="text-sm text-kkookk-steel hover:text-kkookk-navy"
        >
          로그아웃
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
          <div className="space-y-1">
            <button
              onClick={() => {
                setSelectedStore(null);
                setIsCreatingStore(false);
              }}
              className="w-full text-left px-4 py-3 rounded-lg cursor-pointer bg-kkookk-orange-50 text-kkookk-orange-500 font-bold"
            >
              스토어 관리
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-kkookk-sand overflow-y-auto">
          {/* Store List View */}
          {!isCreatingStore && !selectedStore && (
            <div className="p-8 max-w-6xl mx-auto w-full">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-kkookk-navy">
                    스토어 관리
                  </h2>
                  <p className="text-kkookk-steel text-sm mt-1">
                    등록된 매장을 확인하고 관리하세요.
                  </p>
                </div>
                <Button
                  onClick={() => setIsCreatingStore(true)}
                  variant="navy"
                  className="flex items-center gap-2"
                >
                  <Plus size={20} /> 매장 추가
                </Button>
              </div>

              <div className="grid gap-4">
                {MOCK_STORES.map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    onClick={() => setSelectedStore(store)}
                    onQRClick={(e) => handleOpenQRModal(e, store.name)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Store Detail View */}
          {!isCreatingStore && selectedStore && (
            <div className="flex flex-col h-full">
              {/* Detail Header */}
              <div className="bg-white border-b border-slate-200 px-8 py-6">
                <div className="flex items-center gap-4 mb-6">
                  <button
                    onClick={() => setSelectedStore(null)}
                    className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-50 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-kkookk-navy">
                      {selectedStore.name}
                    </h2>
                    <p className="text-kkookk-steel text-sm">
                      {selectedStore.address}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {(['cards', 'history', 'migrations'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStoreDetailTab(tab)}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                        storeDetailTab === tab
                          ? 'bg-kkookk-navy text-white'
                          : 'text-kkookk-steel hover:bg-slate-50'
                      }`}
                    >
                      {tab === 'cards'
                        ? '스탬프 카드 관리'
                        : tab === 'history'
                          ? '적립/사용 내역'
                          : '전환 신청 관리'}
                      {tab === 'migrations' &&
                        adminMigrations.filter(
                          (m) =>
                            m.storeName === selectedStore.name &&
                            m.status === 'pending'
                        ).length > 0 && (
                          <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            N
                          </span>
                        )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Stamp Card Creation Form */}
                {cardViewMode === 'create' && (
                  <StampCardCreateForm
                    storeName={selectedStore.name}
                    onSubmit={handleCreateCard}
                    onCancel={() => setCardViewMode('list')}
                  />
                )}

                {/* Stamp Card Statistics View */}
                {cardViewMode === 'stats' && (
                  <StampCardStats
                    cardName="단골 스탬프"
                    onBack={() => setCardViewMode('list')}
                  />
                )}

                {storeDetailTab === 'cards' && cardViewMode === 'list' && (
                  <div className="p-8 max-w-6xl mx-auto w-full">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-kkookk-navy">
                          보유 스탬프 카드
                        </h3>
                        <p className="text-kkookk-steel text-sm mt-1">
                          고객에게 발급할 적립 카드를 관리합니다.
                        </p>
                      </div>
                      <Button
                        variant="navy"
                        className="flex items-center gap-2"
                        onClick={() => setCardViewMode('create')}
                      >
                        <Plus size={20} /> 새 스탬프 카드 만들기
                      </Button>
                    </div>

                    {/* Active Card */}
                    <div className="mb-10">
                      <h4 className="font-bold text-kkookk-navy mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        현재 진행 중 (Active)
                      </h4>
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-8 items-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-80 h-48 bg-gradient-to-br from-kkookk-orange-500 to-[#E04F00] rounded-xl shadow-lg relative flex flex-col p-6 text-white overflow-hidden shrink-0">
                          <div className="flex justify-between items-start mb-4">
                            <span className="font-bold text-lg opacity-90">
                              {selectedStore.name}
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
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-xl font-bold text-kkookk-navy">
                              단골 스탬프
                            </h4>
                            <Badge variant="success">게시 중</Badge>
                          </div>
                          <p className="text-kkookk-steel text-sm mb-6">
                            10개 적립 시 아메리카노 1잔 제공
                          </p>
                          <div className="flex gap-8 text-sm">
                            <div>
                              <p className="text-kkookk-steel mb-1">누적 적립</p>
                              <p className="font-bold text-kkookk-navy text-lg">
                                1,240회
                              </p>
                            </div>
                            <div>
                              <p className="text-kkookk-steel mb-1">쿠폰 발급</p>
                              <p className="font-bold text-kkookk-navy text-lg">
                                128장
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="subtle"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <Edit size={16} /> 수정
                          </Button>
                          <Button
                            onClick={() => setCardViewMode('stats')}
                            variant="subtle"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <BarChart3 size={16} /> 통계
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Draft Cards Table */}
                    <div>
                      <h4 className="font-bold text-kkookk-steel mb-4">
                        보관함 / 초안
                      </h4>
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
                            {adminCards.map((card) => (
                              <tr
                                key={card.id}
                                className="hover:bg-slate-50 transition-colors group"
                              >
                                <td className="p-4 pl-6">
                                  <Badge
                                    variant={
                                      card.status === 'draft'
                                        ? 'default'
                                        : 'destructive'
                                    }
                                  >
                                    {card.status === 'draft'
                                      ? '작성 중'
                                      : '종료됨'}
                                  </Badge>
                                </td>
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
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {storeDetailTab === 'history' && cardViewMode === 'list' && (
                  <div className="p-8 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-kkookk-navy">
                        적립/사용 내역
                      </h3>
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
                            <th className="p-4 text-xs font-bold text-kkookk-steel">
                              구분
                            </th>
                            <th className="p-4 text-xs font-bold text-kkookk-steel text-right pr-6">
                              내용
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {getFilteredHistory().map((req) => (
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
                                <Badge
                                  variant={
                                    req.type === 'stamp'
                                      ? 'primary'
                                      : 'secondary'
                                  }
                                >
                                  {req.type === 'stamp' ? '적립' : '사용'}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm text-right pr-6 font-bold text-kkookk-navy">
                                {req.type === 'stamp'
                                  ? `+${req.count}`
                                  : '쿠폰 사용'}
                              </td>
                            </tr>
                          ))}
                          {getFilteredHistory().length === 0 && (
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
                )}

                {storeDetailTab === 'migrations' && cardViewMode === 'list' && (
                  <MigrationManager
                    migrations={adminMigrations}
                    storeName={selectedStore.name}
                    onAction={handleMigrationAction}
                  />
                )}
              </div>
            </div>
          )}

          {/* Store Create View */}
          {isCreatingStore && (
            <div className="p-8 max-w-4xl mx-auto w-full">
              <div className="mb-8">
                <button
                  onClick={() => setIsCreatingStore(false)}
                  className="flex items-center gap-2 text-kkookk-steel hover:text-kkookk-navy mb-4 transition-colors"
                >
                  <ChevronLeft size={20} /> 돌아가기
                </button>
                <h2 className="text-2xl font-bold text-kkookk-navy">
                  새 매장 추가하기
                </h2>
                <p className="text-kkookk-steel text-sm mt-1">
                  매장 정보를 입력하여 서비스를 시작하세요.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label
                      htmlFor="store-name"
                      className="block text-sm font-bold text-kkookk-navy mb-2"
                    >
                      매장 이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="store-name"
                      type="text"
                      placeholder="예: 카페 루나 강남점"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:border-kkookk-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="store-address"
                      className="block text-sm font-bold text-kkookk-navy mb-2"
                    >
                      매장 주소 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="store-address"
                      type="text"
                      placeholder="주소를 입력해주세요"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:border-kkookk-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="store-phone"
                      className="block text-sm font-bold text-kkookk-navy mb-2"
                    >
                      매장 전화번호
                    </label>
                    <input
                      id="store-phone"
                      type="tel"
                      placeholder="02-0000-0000"
                      className="w-full p-3 border border-slate-200 rounded-xl focus:border-kkookk-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
                  <Button
                    onClick={() => setIsCreatingStore(false)}
                    variant="subtle"
                  >
                    취소
                  </Button>
                  <Button
                    onClick={() => {
                      alert('매장이 성공적으로 등록되었습니다.');
                      setIsCreatingStore(false);
                    }}
                    variant="navy"
                  >
                    매장 등록하기
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* QR Modal */}
      <QRPosterModal
        isOpen={showQRModal}
        storeName={qrStoreName}
        onClose={() => setShowQRModal(false)}
        onDownload={() => {
          alert('이미지가 저장되었습니다.');
          setShowQRModal(false);
        }}
      />
    </div>
  );
}

export default AdminApp;
