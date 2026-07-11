"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, patch } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult } from "../types";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type?: "transaction" | "contribution" | "payout" | "system";
}

// 1. GET /notifications (Fetch all user notifications)
export function useNotifications() {
  return useQuery<ApiResult<NotificationItem[]>, Error, NotificationItem[]>({
    queryKey: queryKeys.notifications.list,
    queryFn: () => get<ApiResult<NotificationItem[]>>(ENDPOINTS.notifications.list),
    select: (res) => res.data,
  });
}

// 2. PATCH /notifications/read (Mark notifications as read)
export function useMarkNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<void>, Error, { notificationIds?: string[]; all?: boolean }>({
    mutationFn: (body: { notificationIds?: string[]; all?: boolean }) =>
      patch<ApiResult<void>, { notificationIds?: string[]; all?: boolean }>(
        ENDPOINTS.notifications.markRead,
        body
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list });
    },
  });
}
