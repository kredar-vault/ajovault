"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, ActivityRow } from "../types";

// 1. GET /groups/{groupId}/activity (Fetch activity logs for a savings circle)
export function useGroupActivity(groupId: string) {
  return useQuery<ApiResult<ActivityRow[]>, Error, ActivityRow[]>({
    queryKey: queryKeys.activity.list(groupId),
    queryFn: () => get<ApiResult<ActivityRow[]>>(ENDPOINTS.activity.list(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}
