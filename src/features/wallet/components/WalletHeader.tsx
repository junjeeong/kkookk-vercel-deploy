/**
 * WalletHeader Component
 * Header for the wallet page with menu toggle
 */

import { Menu } from 'lucide-react';

interface WalletHeaderProps {
  title?: string;
  onMenuClick: () => void;
}

export function WalletHeader({
  title = '내 지갑',
  onMenuClick,
}: WalletHeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 pt-12 pb-4">
      <h1 className="text-2xl font-bold text-kkookk-navy">{title}</h1>
      <button
        onClick={onMenuClick}
        className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-kkookk-navy hover:bg-slate-50 transition-colors"
        title="메뉴 열기"
        aria-label="메뉴 열기"
      >
        <Menu size={20} />
      </button>
    </div>
  );
}

export default WalletHeader;
