/**
 * WalletHeader 컴포넌트
 * 설정 버튼이 있는 지갑 페이지 헤더
 */

import { Settings } from "lucide-react";

interface WalletHeaderProps {
  title?: string;
  onSettingsClick: () => void;
}

export function WalletHeader({
  title = "내 지갑",
  onSettingsClick,
}: WalletHeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h1 className="text-2xl font-bold text-kkookk-navy">{title}</h1>
      <button
        onClick={onSettingsClick}
        className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg text-kkookk-navy hover:bg-slate-50"
        title="설정 열기"
        aria-label="설정 열기"
      >
        <Settings size={20} />
      </button>
    </div>
  );
}

export default WalletHeader;
