/**
 * OwnerLayout
 * 사장님 백오피스 라우트용 레이아웃 래퍼
 */

import { Outlet, useNavigate } from 'react-router-dom';

export function OwnerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-kkookk-sand flex flex-col">
      {/* 헤더 */}
      <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg text-kkookk-navy">
          <div className="w-8 h-8 bg-kkookk-navy rounded-lg flex items-center justify-center text-white">
            B
          </div>
          Boss Partners
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-kkookk-steel hover:text-kkookk-navy"
        >
          로그아웃
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
          <div className="space-y-1">
            <button
              onClick={() => navigate('/owner/stores')}
              className="w-full text-left px-4 py-3 rounded-lg cursor-pointer bg-kkookk-orange-50 text-kkookk-orange-500 font-bold"
            >
              스토어 관리
            </button>
          </div>
        </aside>

        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex flex-col min-w-0 bg-kkookk-sand overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OwnerLayout;
