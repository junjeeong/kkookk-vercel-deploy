/**
 * PwaBanner 컴포넌트
 * PWA 설치 안내 배너
 */

export function PwaBanner() {
  const handleInstall = () => {
    // TODO: PWA 설치 로직 추가
    alert("PWA는 사실 개발중이다냥!");
  };

  return (
    <div className="w-full h-13.5 bg-kkookk-orange-50 px-4 flex items-center gap-2">
        {/* 왼쪽: 로고 */}
        <div className="shrink-0">
          <img
            src="/logo/only_cat.png"
            alt="KKOOKK Logo"
            className="w-10.5 h-10.5 object-contain"
          />
        </div>

        {/* 중앙: 안내 텍스트 */}
        <div className="shrink-0">
          <p className="text-[13px] font-bold text-kkookk-navy">
            PWA 연동으로 편하게 사용하라냥
          </p>
        </div>

        {/* 오른쪽: 연동 버튼 */}
        <button
          onClick={handleInstall}
          className="px-4 py-2 ml-auto text-xs font-bold text-white transition-colors rounded-full shrink-0 bg-kkookk-navy hover:bg-kkookk-navy/90 whitespace-nowrap"
        >
          PWA 연동
        </button>
    </div>
  );
}

export default PwaBanner;
