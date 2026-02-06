/**
 * Store Management Hooks for KKOOKK Owner
 * TanStack Query hooks for store operations
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
  getStoreQR,
  getStoreStatistics,
  getRedeemEvents,
  type GetStoreStatisticsParams,
  type GetRedeemEventsParams,
} from '../api/storeApi';
import { QUERY_KEYS } from '@/lib/api/endpoints';
import type { StoreCreateRequest, StoreUpdateRequest } from '@/types/api';

// =============================================================================
// Store List Hook
// =============================================================================

export function useStores() {
  return useQuery({
    queryKey: QUERY_KEYS.stores(),
    queryFn: () => getStores(),
  });
}

// =============================================================================
// Single Store Hook
// =============================================================================

export function useStore(storeId: number | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.store(storeId ?? 0),
    queryFn: () => getStore(storeId!),
    enabled: !!storeId,
  });
}

// =============================================================================
// Create Store Hook
// =============================================================================

export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: StoreCreateRequest) => createStore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stores() });
    },
  });
}

// =============================================================================
// Update Store Hook
// =============================================================================

export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, data }: { storeId: number; data: StoreUpdateRequest }) =>
      updateStore(storeId, data),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stores() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.store(storeId) });
    },
  });
}

// =============================================================================
// Delete Store Hook
// =============================================================================

export function useDeleteStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storeId: number) => deleteStore(storeId),
    onSuccess: (_, storeId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stores() });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.store(storeId) });
    },
  });
}

// =============================================================================
// Store QR Hook
// =============================================================================

export function useStoreQR(storeId: number | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.storeQr(storeId ?? 0),
    queryFn: () => getStoreQR(storeId!),
    enabled: !!storeId,
    staleTime: Infinity, // QR codes don't change
  });
}

// =============================================================================
// Store Statistics Hook
// =============================================================================

export function useStoreStatistics(
  params: Omit<GetStoreStatisticsParams, 'storeId'> & { storeId?: number }
) {
  return useQuery({
    queryKey: QUERY_KEYS.storeStatistics(
      params.storeId ?? 0,
      params.startDate,
      params.endDate
    ),
    queryFn: () =>
      getStoreStatistics({
        storeId: params.storeId!,
        startDate: params.startDate,
        endDate: params.endDate,
      }),
    enabled: !!params.storeId,
  });
}

// =============================================================================
// Redeem Events Hook
// =============================================================================

export function useRedeemEvents(
  params: Omit<GetRedeemEventsParams, 'storeId'> & { storeId?: number }
) {
  return useQuery({
    queryKey: QUERY_KEYS.storeRedeemEvents(params.storeId ?? 0),
    queryFn: () =>
      getRedeemEvents({
        storeId: params.storeId!,
        page: params.page,
        size: params.size,
      }),
    enabled: !!params.storeId,
  });
}

export function useRedeemEventsInfinite(storeId: number | undefined, pageSize = 20) {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.storeRedeemEvents(storeId ?? 0), 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      getRedeemEvents({
        storeId: storeId!,
        page: pageParam,
        size: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) {
        return lastPage.pageNumber + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!storeId,
  });
}
