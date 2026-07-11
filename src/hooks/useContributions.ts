"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, ContributionItem } from "../types";

export interface CreateContributionPayload {
  amount: number;
  reference?: string;
  pin?: string;
}

// 1. GET /contributions (Fetch all user contributions)
export function useAllContributions() {
  return useQuery<ApiResult<ContributionItem[]>, Error, ContributionItem[]>({
    queryKey: queryKeys.contributions.root,
    queryFn: () => get<ApiResult<ContributionItem[]>>(ENDPOINTS.contributions.root),
    select: (res) => res.data,
  });
}

// 2. GET /groups/{groupId}/contributions (Fetch contributions for a specific group)
export function useGroupContributions(groupId: string) {
  return useQuery<ApiResult<ContributionItem[]>, Error, ContributionItem[]>({
    queryKey: queryKeys.contributions.byGroup(groupId),
    queryFn: () => get<ApiResult<ContributionItem[]>>(ENDPOINTS.contributions.byGroup(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// 3. POST /groups/{groupId}/contributions (Record a new group contribution)
export function useCreateContribution(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<ContributionItem>, Error, CreateContributionPayload>({
    mutationFn: (body: CreateContributionPayload) =>
      post<ApiResult<ContributionItem>, CreateContributionPayload>(
        ENDPOINTS.contributions.byGroup(groupId),
        body
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contributions.byGroup(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.contributions.mine(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.detail(groupId) });
    },
  });
}

// 4. GET /groups/{groupId}/contributions/mine (Fetch current user's contributions in group)
export function useMyGroupContributions(groupId: string) {
  return useQuery<ApiResult<ContributionItem[]>, Error, ContributionItem[]>({
    queryKey: queryKeys.contributions.mine(groupId),
    queryFn: () => get<ApiResult<ContributionItem[]>>(ENDPOINTS.contributions.mine(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}
