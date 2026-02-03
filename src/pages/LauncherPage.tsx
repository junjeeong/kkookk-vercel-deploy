/**
 * LauncherPage Component
 * Development launcher page for selecting app mode
 */

import { Smartphone, Tablet, Monitor } from 'lucide-react';
import { LauncherCard } from '@/components/shared/LauncherCard';

type ViewMode = 'launcher' | 'customer' | 'store' | 'admin';

interface LauncherPageProps {
  onSelectMode: (mode: ViewMode) => void;
}

export function LauncherPage({ onSelectMode }: LauncherPageProps) {
  return (
    <div className="min-h-screen bg-kkookk-sand flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-kkookk-navy mb-2">
        통합 로열티 시스템
      </h1>
      <p className="text-kkookk-steel mb-10 text-center">
        각 디바이스 환경을 선택하여 시뮬레이션을 시작하세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <LauncherCard
          icon={<Smartphone size={40} />}
          title="고객용 PWA"
          desc="스탬프 적립, 리워드 확인, 적립 요청"
          onClick={() => onSelectMode('customer')}
          color="bg-kkookk-orange-500"
        />
        <LauncherCard
          icon={<Tablet size={40} />}
          title="매장용 태블릿"
          desc="적립/사용 요청 실시간 승인, 영업 관리"
          onClick={() => onSelectMode('store')}
          color="bg-kkookk-navy"
        />
        <LauncherCard
          icon={<Monitor size={40} />}
          title="사장님 백오피스"
          desc="스탬프 카드 설계, 스토어 관리"
          onClick={() => onSelectMode('admin')}
          color="bg-kkookk-steel"
        />
      </div>

      <p className="mt-12 text-sm text-kkookk-steel">
        Tip: 고객 앱에서 적립 요청 후 매장 태블릿에서 승인해보세요.
      </p>
    </div>
  );
}

export default LauncherPage;
