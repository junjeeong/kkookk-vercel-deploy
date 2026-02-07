/**
 * SettingsSidebar 컴포넌트
 * 설정 및 계정 관리를 위한 슬라이드아웃 사이드바
 */

import { MenuLink } from "@/components/shared/MenuLink";
import { cn } from "@/lib/utils";
import { FileText, Info, LogOut, Shield, X } from "lucide-react";
import { useStepUpModal } from "@/app/providers/StepUpModalProvider";

interface SettingsSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onLogout?: () => void;
  userName?: string;
}

export function SettingsSidebar({
  isOpen = false,
  onClose,
  onLogout,
  userName = "김고객님",
}: SettingsSidebarProps) {
  const { openStepUpModal } = useStepUpModal();

  // ESC 키로 닫기
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose?.();
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex justify-end transition-opacity duration-200",
        isOpen ? "pointer-events-auto" : "opacity-0 pointer-events-none",
      )}
      onKeyDown={handleKeyDown}
    >
      {/* 배경 오버레이 */}
      <div
        role="button"
        tabIndex={0}
        aria-label="설정 닫기"
        className={cn(
          "absolute inset-0 transition-all duration-200",
          isOpen ? "bg-kkookk-navy/20 backdrop-blur-sm" : "bg-transparent",
        )}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose?.();
          }
        }}
      />

      {/* 사이드바 패널 */}
      <div
        className={cn(
          "relative w-[280px] max-w-[80vw] h-full bg-white shadow-2xl flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 pt-12 border-b border-slate-100">
          <span className="text-lg font-bold text-kkookk-navy">{userName}</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 transition-colors rounded-full text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-50"
            aria-label="설정 닫기"
          >
            <X size={24} />
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* 메뉴 링크들 */}
          <MenuLink
            icon={<Shield size={20} />}
            label="본인 인증"
            onClick={() => {
              openStepUpModal();
              onClose?.();
            }}
          />
          <MenuLink
            icon={<FileText size={20} />}
            label="개인정보처리방침"
            onClick={() => {
              // TODO: 개인정보처리방침 페이지로 이동
              console.log("개인정보처리방침");
            }}
          />

          {/* 버전 정보 (정적 정보) */}
          <div className="flex items-center gap-4 px-6 py-4 text-kkookk-steel">
            <Info size={20} />
            <div className="flex-1">
              <span className="text-sm font-medium">버전 정보</span>
              <span className="ml-2 text-xs text-kkookk-steel/70">v1.0.0</span>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-6 border-t border-slate-100 bg-kkookk-sand/30">
          <button
            onClick={onLogout}
            className="flex items-center w-full gap-3 p-3 transition-colors text-kkookk-steel hover:text-red-600 hover:bg-red-50 rounded-xl"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">로그아웃 / 나가기</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsSidebar;
