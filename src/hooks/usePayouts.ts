"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, RotationMember } from "../types";

export interface PayoutSummaryData {
  currentCycle: string;
  currentRecipientName: string;
  nextRecipientName: string;
  totalMembers: number;
  payoutsDone: number;
}

// 1. GET /groups/{groupId}/payouts (Fetch full rotation list)
export function useGroupPayouts(groupId: string) {
  return useQuery<ApiResult<RotationMember[]>, Error, RotationMember[]>({
    queryKey: queryKeys.payouts.list(groupId),
    queryFn: () => get<ApiResult<RotationMember[]>>(ENDPOINTS.payouts.list(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// 2. GET /groups/{groupId}/payouts/current (Fetch current payout summary metrics)
export function useCurrentPayout(groupId: string) {
  return useQuery<ApiResult<PayoutSummaryData>, Error, PayoutSummaryData>({
    queryKey: queryKeys.payouts.current(groupId),
    queryFn: () => get<ApiResult<PayoutSummaryData>>(ENDPOINTS.payouts.current(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// 3. GET /groups/{groupId}/payouts/upcoming (Fetch upcoming payouts list)
export function useUpcomingPayouts(groupId: string) {
  return useQuery<ApiResult<RotationMember[]>, Error, RotationMember[]>({
    queryKey: queryKeys.payouts.upcoming(groupId),
    queryFn: () => get<ApiResult<RotationMember[]>>(ENDPOINTS.payouts.upcoming(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// 4. GET /payouts/upcoming (Fetch all upcoming payouts across circles)
export function useAllUpcomingPayouts() {
  return useQuery<ApiResult<RotationMember[]>, Error, RotationMember[]>({
    queryKey: queryKeys.payouts.allUpcoming,
    queryFn: () => get<ApiResult<RotationMember[]>>(ENDPOINTS.payouts.allUpcoming),
    select: (res) => res.data,
  });
}

// 5. POST /groups/{groupId}/payouts/{payoutId}/disburse (Trigger a payout disburse event)
export function useDisbursePayout(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<void>, Error, string>({
    mutationFn: (payoutId: string) =>
      post<ApiResult<void>>(ENDPOINTS.payouts.disburse(groupId, payoutId)),
    onSuccess: (_, payoutId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payouts.list(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.payouts.current(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.detail(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.root });
    },
  });
}
