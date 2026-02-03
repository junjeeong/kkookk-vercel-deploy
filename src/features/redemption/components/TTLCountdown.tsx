/**
 * TTLCountdown Component
 * Countdown timer for redemption session TTL (30-60 seconds)
 */

import { formatCountdown } from '@/lib/utils/format';

interface TTLCountdownProps {
  seconds: number;
  className?: string;
}

export function TTLCountdown({ seconds, className }: TTLCountdownProps) {
  const isUrgent = seconds <= 10;

  return (
    <div
      className={`text-4xl font-mono font-bold text-kkookk-navy tracking-wider ${
        isUrgent ? 'text-kkookk-red animate-pulse' : ''
      } ${className || ''}`}
    >
      {formatCountdown(seconds)}
    </div>
  );
}

export default TTLCountdown;
