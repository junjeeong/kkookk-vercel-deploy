/**
 * SplashScreen Component
 * Displays full-screen splash animation on customer app entry
 *
 * Features:
 * - Auto-dismiss after specified duration
 * - Smooth fade-in/fade-out animations
 * - Shows on every page load/refresh
 * - Responsive image scaling for all mobile devices
 * - Covers loading spinner completely
 */

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  imageSrc: string;
  duration?: number; // default 2000ms
}

export function SplashScreen({ imageSrc, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true); // Start as visible immediately
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Schedule fade-out animation (duration - 500ms for fade animation)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, duration - 500);

    // Schedule complete removal
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60] bg-white flex items-center justify-center',
        isFadingOut ? 'animate-splash-fade-out' : 'opacity-100'
      )}
      aria-hidden="true"
    >
      <div className="w-full max-w-md h-full">
        <img
          src={imageSrc}
          alt="KKOOKK Loading"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
