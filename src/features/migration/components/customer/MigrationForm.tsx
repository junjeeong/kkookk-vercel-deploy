/**
 * MigrationForm 컴포넌트
 * 고객이 종이 스탬프 전환 요청을 제출하기 위한 폼
 */

import { useState } from 'react';
import { ChevronLeft, ChevronDown, Camera, Check, Info, AlertCircle } from 'lucide-react';
import { useCustomerNavigate } from '@/hooks/useCustomerNavigate';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MOCK_OTHER_CARDS, INITIAL_STAMP_CARD, MOCK_MIGRATIONS } from '@/lib/constants/mockData';
import type { StampCard, MigrationRequest } from '@/types/domain';

interface MigrationFormProps {
  cards?: StampCard[];
  existingMigrations?: MigrationRequest[];
}

export function MigrationForm({
  cards = [INITIAL_STAMP_CARD, ...MOCK_OTHER_CARDS],
  existingMigrations = MOCK_MIGRATIONS,
}: MigrationFormProps) {
  const { customerNavigate } = useCustomerNavigate();
  const [count, setCount] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // 아직 전환 요청을 받을 수 있는 매장 확인
  const availableStores = cards.map((card) => {
    const isAlreadyApproved = existingMigrations.some(
      (m) => m.storeName === card.storeName && m.status === 'approved'
    );
    const isPending = existingMigrations.some(
      (m) => m.storeName === card.storeName && m.status === 'pending'
    );

    return {
      ...card,
      isDisabled: isAlreadyApproved || isPending,
      statusText: isAlreadyApproved
        ? '(전환 완료)'
        : isPending
          ? '(심사 중)'
          : '',
    };
  });

  const initialStore = availableStores.find((s) => !s.isDisabled);
  const [selectedStoreName, setSelectedStoreName] = useState(
    initialStore?.storeName || ''
  );

  const allStoresUsed = availableStores.every((s) => s.isDisabled);

  // 폼 유효성 검사
  const isFormValid = selectedStoreName.trim() !== '' && count.trim() !== '' && file !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStoreName) {
      alert('매장을 선택해주세요.');
      return;
    }

    const selectedStore = availableStores.find(
      (s) => s.storeName === selectedStoreName
    );
    if (selectedStore?.isDisabled) {
      alert('이미 전환 신청이 완료되었거나 진행 중인 매장입니다.');
      return;
    }

    if (!count || !file) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    // TODO: API 연동 후 실제 제출 처리
    console.log('Migration submitted:', selectedStoreName, parseInt(count), file);
    customerNavigate('/migrations');
  };

  return (
    <div className="h-full bg-white flex flex-col pt-12">
      {/* 헤더 */}
      <div className="px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center sticky top-0 bg-white z-10 -mt-12 pt-12">
        <button
          onClick={() => customerNavigate('/migrations')}
          className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-kkookk-navy">전환 신청하기</h1>
      </div>

      {/* 폼 콘텐츠 */}
      <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto">
        {/* 안내 배너 */}
        <div className="bg-blue-50 p-4 rounded-xl flex gap-3 mb-8 text-blue-800 text-xs leading-relaxed">
          <Info size={20} className="shrink-0" />
          <div>
            <p className="font-bold mb-1">안내사항</p>
            <p>• 매장별로 1회만 전환 신청이 가능합니다.</p>
            <p>• 신청 후 승인까지 약 24~48시간 소요됩니다.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 매장 선택 */}
          <div>
            <label
              htmlFor="store-select"
              className="block text-sm font-bold text-kkookk-navy mb-2"
            >
              매장 선택 <span className="text-kkookk-orange-500">*</span>
            </label>
            <div className="relative">
              <select
                id="store-select"
                value={selectedStoreName}
                onChange={(e) => setSelectedStoreName(e.target.value)}
                className="w-full p-4 bg-kkookk-sand rounded-xl border border-slate-200 focus:outline-none appearance-none pr-10 text-kkookk-navy font-medium disabled:bg-slate-100 disabled:text-slate-400"
                disabled={allStoresUsed}
              >
                {availableStores.map((store) => (
                  <option
                    key={store.id}
                    value={store.storeName}
                    disabled={store.isDisabled}
                  >
                    {store.storeName} {store.statusText}
                  </option>
                ))}
                {availableStores.length === 0 && (
                  <option disabled>보유한 스탬프 카드가 없습니다</option>
                )}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-kkookk-steel pointer-events-none"
                size={20}
              />
            </div>
            {allStoresUsed && (
              <p className="text-xs text-kkookk-red mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> 모든 매장의 전환 신청이 완료되었습니다.
              </p>
            )}
          </div>

          {/* 스탬프 개수 */}
          <div>
            <label htmlFor="count-input" className="block text-xs font-bold text-kkookk-navy mb-2">
              보유 스탬프 개수 <span className="text-kkookk-orange-500">*</span>
            </label>
            <Input
              id="count-input"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="0"
              min={1}
            />
          </div>

          {/* 사진 업로드 */}
          <div>
            <label
              htmlFor="photo-upload"
              className="block text-sm font-bold text-kkookk-navy mb-2"
            >
              종이 쿠폰 사진 첨부 <span className="text-kkookk-orange-500">*</span>
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-kkookk-sand/30 hover:bg-kkookk-sand cursor-pointer transition-colors relative">
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="flex flex-col items-center text-kkookk-steel">
                {file ? (
                  <>
                    <Check size={32} className="text-green-500 mb-2" />
                    <p className="text-sm font-bold text-kkookk-navy">
                      {file.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Camera size={32} className="mb-2" />
                    <p className="text-sm">터치하여 사진 촬영 또는 업로드</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* 제출 버튼 */}
      <div className="p-6 border-t border-slate-100">
        <Button
          onClick={handleSubmit}
          disabled={allStoresUsed || !isFormValid}
          variant="primary"
          size="full"
          className="shadow-lg"
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}

export default MigrationForm;
