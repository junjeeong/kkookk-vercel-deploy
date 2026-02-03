/**
 * CustomerSettingsPage 컴포넌트
 * 고객 앱 설정 페이지
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function CustomerSettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center sticky top-0 bg-white z-10">
        <button
          onClick={() => navigate('/customer/wallet')}
          className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-kkookk-navy">설정</h1>
      </div>

      {/* 설정 목록 */}
      <div className="border-t border-slate-100">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center cursor-pointer hover:bg-slate-50">
          <span className="text-kkookk-navy font-medium">알림 설정</span>
          <div className="w-10 h-6 bg-kkookk-orange-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
          </div>
        </div>
        <div className="p-4 border-b border-slate-50 flex justify-between items-center cursor-pointer hover:bg-slate-50">
          <span className="text-kkookk-navy font-medium">개인정보 처리방침</span>
          <ChevronRight size={16} className="text-kkookk-steel" />
        </div>
        <div className="p-4 flex justify-between items-center">
          <span className="text-kkookk-navy font-medium">버전 정보</span>
          <span className="text-kkookk-steel text-sm">v1.0.0</span>
        </div>
      </div>
    </div>
  );
}

export default CustomerSettingsPage;
