/**
 * StepUpModalProvider - Step-Up Verification Modal Context
 * Manages global modal state for step-up authentication
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { isStepUpValid } from '@/lib/api/tokenManager';

// =============================================================================
// Types
// =============================================================================

interface StepUpModalContextValue {
  isOpen: boolean;
  isVerified: boolean;
  openStepUpModal: (onSuccess?: () => void) => void;
  closeStepUpModal: () => void;
  handleVerificationSuccess: () => void;
}

// =============================================================================
// Context
// =============================================================================

const StepUpModalContext = createContext<StepUpModalContextValue | null>(null);

// =============================================================================
// Provider
// =============================================================================

interface StepUpModalProviderProps {
  children: ReactNode;
}

export function StepUpModalProvider({ children }: StepUpModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | null>(null);
  const [isVerified, setIsVerified] = useState(isStepUpValid());

  // Open modal with optional success callback
  const openStepUpModal = useCallback((onSuccess?: () => void) => {
    setIsOpen(true);
    if (onSuccess) {
      // Wrap callback in a function to prevent React state issues
      setOnSuccessCallback(() => onSuccess);
    }
  }, []);

  // Close modal
  const closeStepUpModal = useCallback(() => {
    setIsOpen(false);
    setOnSuccessCallback(null);
  }, []);

  // Handle verification success
  const handleVerificationSuccess = useCallback(() => {
    setIsVerified(true);
    setIsOpen(false);

    // Execute success callback if provided
    if (onSuccessCallback) {
      onSuccessCallback();
      setOnSuccessCallback(null);
    }
  }, [onSuccessCallback]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo<StepUpModalContextValue>(
    () => ({
      isOpen,
      isVerified,
      openStepUpModal,
      closeStepUpModal,
      handleVerificationSuccess,
    }),
    [isOpen, isVerified, openStepUpModal, closeStepUpModal, handleVerificationSuccess]
  );

  return (
    <StepUpModalContext.Provider value={value}>
      {children}
    </StepUpModalContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

export function useStepUpModal(): StepUpModalContextValue {
  const context = useContext(StepUpModalContext);
  if (!context) {
    throw new Error('useStepUpModal must be used within a StepUpModalProvider');
  }
  return context;
}

// =============================================================================
// Exports
// =============================================================================

export default StepUpModalProvider;
