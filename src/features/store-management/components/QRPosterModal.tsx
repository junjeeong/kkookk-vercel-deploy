/**
 * QRPosterModal 컴포넌트
 * 매장용 QR 포스터 표시 및 다운로드 모달
 */

import { QrCode, Smartphone, Check, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface QRPosterModalProps {
  isOpen: boolean;
  storeName: string;
  onClose: () => void;
  onDownload: () => void;
}

export function QRPosterModal({
  isOpen,
  storeName,
  onClose,
  onDownload,
}: QRPosterModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        role="button"
        tabIndex={0}
        aria-label="QR 포스터 모달 닫기"
        className="absolute inset-0 bg-kkookk-navy/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClose();
          }
        }}
      />

      {/* 모달 */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
        {/* 헤더 */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-lg text-kkookk-navy">
            QR 포스터 미리보기
          </h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-kkookk-steel hover:text-kkookk-navy rounded-full hover:bg-slate-100"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* 미리보기 */}
        <div className="p-8 bg-slate-50 flex justify-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center w-full aspect-[3/4] flex flex-col items-center justify-center">
            <h4 className="font-bold text-xl text-kkookk-navy mb-1">
              {storeName}
            </h4>
            <p className="text-xs text-kkookk-orange-500 font-bold mb-6">
              스탬프 적립 & 리워드 사용
            </p>

            <div className="bg-kkookk-navy p-4 rounded-xl mb-6">
              <QrCode size={120} className="text-white" />
            </div>

            <div className="flex items-center gap-2 text-kkookk-navy font-bold text-sm bg-slate-100 px-4 py-2 rounded-full">
              <Smartphone size={16} />
              <span>카메라로 스캔하세요</span>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="p-6 bg-white border-t border-slate-100">
          <p className="text-center text-sm text-kkookk-steel mb-4 flex items-center justify-center gap-2">
            <Check size={14} className="text-green-500" /> 프린트 후 매장에
            배치해주세요
          </p>
          <Button
            onClick={onDownload}
            variant="navy"
            size="full"
            className="shadow-lg shadow-kkookk-navy/20"
          >
            <Download size={20} /> 이미지로 저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QRPosterModal;
