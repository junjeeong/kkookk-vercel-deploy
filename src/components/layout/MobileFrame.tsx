/**
 * MobileFrame 컴포넌트
 * 고객 PWA를 위한 풀스크린 웹앱 컨테이너
 * 하단 네비게이션 바 및 설정 사이드바 지원
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileFrameProps {
  children: ReactNode;
  bottomNav?: ReactNode;
  settingsSidebar?: ReactNode;
  className?: string;
}

export function MobileFrame({
  children,
  bottomNav,
  settingsSidebar,
  className,
}: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full flex justify-center">
      <div
        className={cn(
          'w-full max-w-md min-h-screen bg-white flex flex-col relative overflow-hidden',
          className
        )}
      >
        {/* 메인 콘텐츠 영역 - 하단 네비게이션 공간 확보 */}
        <main className="flex-1 flex flex-col no-scrollbar bg-white pb-16">
          {children}
        </main>

        {/* 하단 네비게이션 바 */}
        {bottomNav}

        {/* 설정 사이드바 */}
        {settingsSidebar}
      </div>
    </div>
  );
}

export default MobileFrame;
