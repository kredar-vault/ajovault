"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, DashboardStats, ContributionProgress, PayoutSchedule, ActivityRow } from "../types";

export interface DashboardData {
  stats: DashboardStats;
  progress: ContributionProgress;
  payout: PayoutSchedule;
  activity: ActivityRow[];
}

// GET /dashboard/{groupId}
export function useDashboardData(groupId: string) {
  return useQuery<ApiResult<DashboardData>, Error, DashboardData>({
    queryKey: queryKeys.dashboard.detail(groupId),
    queryFn: () => get<ApiResult<DashboardData>>(ENDPOINTS.dashboard.get(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// GET /dashboard (Fetch aggregated global dashboard stats)
export function useGlobalDashboard() {
  return useQuery<ApiResult<DashboardData>, Error, DashboardData>({
    queryKey: queryKeys.dashboard.root,
    queryFn: () => get<ApiResult<DashboardData>>(ENDPOINTS.dashboard.root),
    select: (res) => res.data,
  });
}
