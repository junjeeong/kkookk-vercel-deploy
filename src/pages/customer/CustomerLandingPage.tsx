/**
 * CustomerLandingPage Component
 * Landing page for customer app when scanning QR
 */

import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CustomerLandingPageProps {
  storeName: string;
  onLogin: () => void;
  onSignup: () => void;
}

export function CustomerLandingPage({
  storeName,
  onLogin,
  onSignup,
}: CustomerLandingPageProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white text-center">
      <div className="flex flex-col items-center flex-1 justify-center -mt-10">
        <div className="w-20 h-20 bg-kkookk-orange-500 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-orange-200">
          <QrCode size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-kkookk-navy leading-tight mb-3">
          {storeName}에
          <br />
          오신 것을 환영해요!
        </h2>
        <p className="text-kkookk-steel text-sm mb-8">
          스탬프를 모아 특별한 혜택을 받아보세요.
        </p>
        <div className="bg-kkookk-navy text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-kkookk-navy/20 animate-pulse">
          현재 34명이 적립 중
        </div>
      </div>
      <div className="w-full mt-auto pb-8">
        <Button
          onClick={onLogin}
          variant="primary"
          size="full"
          className="shadow-lg shadow-orange-200"
        >
          내 지갑 열기
        </Button>
        <button
          onClick={onSignup}
          className="mt-4 text-sm text-kkookk-steel/60 hover:text-kkookk-steel underline decoration-kkookk-steel/30 underline-offset-4"
        >
          처음이신가요?
        </button>
      </div>
    </div>
  );
}

export default CustomerLandingPage;
