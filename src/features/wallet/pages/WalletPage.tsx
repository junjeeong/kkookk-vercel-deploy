/**
 * WalletPage Component
 * Main wallet view with stamp card carousel
 */

import { WalletHeader } from '../components/WalletHeader';
import { StampCardCarousel } from '../components/StampCardCarousel';
import type { StampCard } from '@/types/domain';

interface WalletPageProps {
  cards: StampCard[];
  onCardSelect: (card: StampCard) => void;
  onMenuOpen: () => void;
}

export function WalletPage({
  cards,
  onCardSelect,
  onMenuOpen,
}: WalletPageProps) {
  return (
    <div className="flex-1 bg-kkookk-sand flex flex-col min-h-screen">
      <WalletHeader onMenuClick={onMenuOpen} />

      <div className="flex-1 flex flex-col justify-center">
        <StampCardCarousel cards={cards} onCardSelect={onCardSelect} />
      </div>
    </div>
  );
}

export default WalletPage;
