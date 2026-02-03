/**
 * Terminal Feature Types
 */

import type { StoreStatus } from '@/types/domain';

export type TerminalTab = 'requests' | 'history' | 'settings';

export interface TerminalState {
  isLoggedIn: boolean;
  activeTab: TerminalTab;
  storeStatus: StoreStatus;
  isPolling: boolean;
}

export interface TerminalConfig {
  storeName: string;
  pollingIntervalMs: number;
}
