/**
 * Migration API Service for KKOOKK
 * Handles both Customer and Owner migration operations
 */

import { postRaw, getRaw } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  CreateMigrationRequest,
  MigrationRequestResponse,
  MigrationListItemResponse,
  MigrationApproveRequest,
  MigrationRejectRequest,
} from '@/types/api';

// =============================================================================
// Customer Migration API (StepUp Required)
// =============================================================================

export async function createMigration(
  data: CreateMigrationRequest
): Promise<MigrationRequestResponse> {
  return postRaw<MigrationRequestResponse, CreateMigrationRequest>(
    API_ENDPOINTS.CUSTOMER.MIGRATIONS,
    data
  );
}

export async function getMigration(
  migrationId: number
): Promise<MigrationRequestResponse> {
  return getRaw<MigrationRequestResponse>(
    API_ENDPOINTS.CUSTOMER.MIGRATION(migrationId)
  );
}

export async function getMigrationList(): Promise<MigrationListItemResponse[]> {
  return getRaw<MigrationListItemResponse[]>(API_ENDPOINTS.CUSTOMER.MIGRATIONS);
}

// =============================================================================
// Owner Migration API
// =============================================================================

export async function getStoreMigrations(
  storeId: number
): Promise<MigrationRequestResponse[]> {
  const response = await getRaw<{ migrations: MigrationRequestResponse[] }>(
    API_ENDPOINTS.OWNER.STORE_MIGRATIONS(storeId)
  );
  return response.migrations;
}

export async function getStoreMigration(
  storeId: number,
  migrationId: number
): Promise<MigrationRequestResponse> {
  return getRaw<MigrationRequestResponse>(
    API_ENDPOINTS.OWNER.STORE_MIGRATION(storeId, migrationId)
  );
}

export async function approveMigration(
  storeId: number,
  migrationId: number,
  data: MigrationApproveRequest
): Promise<MigrationRequestResponse> {
  return postRaw<MigrationRequestResponse, MigrationApproveRequest>(
    API_ENDPOINTS.OWNER.STORE_MIGRATION_APPROVE(storeId, migrationId),
    data
  );
}

export async function rejectMigration(
  storeId: number,
  migrationId: number,
  data: MigrationRejectRequest
): Promise<MigrationRequestResponse> {
  return postRaw<MigrationRequestResponse, MigrationRejectRequest>(
    API_ENDPOINTS.OWNER.STORE_MIGRATION_REJECT(storeId, migrationId),
    data
  );
}
