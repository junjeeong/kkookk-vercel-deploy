/**
 * StepUpVerifyModal
 * Full-screen blurred modal wrapper for step-up verification
 */

import { useEffect } from 'react';
import { useStepUpModal } from '@/app/providers/StepUpModalProvider';
import { StepUpVerify } from '@/components/shared/StepUpVerify';

export function StepUpVerifyModal() {
  const { isOpen, closeStepUpModal, handleVerificationSuccess } = useStepUpModal();

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeStepUpModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeStepUpModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in duration-300"
      aria-modal="true"
      role="dialog"
      aria-labelledby="stepup-modal-title"
    >
      {/* Blurred Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-lg"
        onClick={closeStepUpModal}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-[85vw] max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-in zoom-in-95 duration-300">
        <StepUpVerify onVerified={handleVerificationSuccess} />
      </div>
    </div>
  );
}

export default StepUpVerifyModal;
