"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, patch } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type {
  ApiResult,
  UpdateAccountRequest,
  UpdateAccountResponse,
  UpdatePasswordRequest,
  UpdatePinRequest,
  Transaction,
} from "../types";

// 1. PATCH /account (Update general profile details)
export function useUpdateAccount() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<UpdateAccountResponse>, Error, UpdateAccountRequest>({
    mutationFn: (body: UpdateAccountRequest) =>
      patch<ApiResult<UpdateAccountResponse>, UpdateAccountRequest>(ENDPOINTS.account.root, body),
    onSuccess: () => {
      // Invalidate both local account state and session query caches
      queryClient.invalidateQueries({ queryKey: queryKeys.account.root });
      queryClient.invalidateQueries({ queryKey: ["session-user"] });
    },
  });
}

// 2. PATCH /account/password (Change user account password)
export function useUpdatePassword() {
  return useMutation<ApiResult<void>, Error, UpdatePasswordRequest>({
    mutationFn: (body: UpdatePasswordRequest) =>
      patch<ApiResult<void>, UpdatePasswordRequest>(ENDPOINTS.account.password, body),
  });
}

// 3. PATCH /account/pin (Set or update security transaction PIN)
export function useUpdatePin() {
  return useMutation<ApiResult<void>, Error, UpdatePinRequest>({
    mutationFn: (body: UpdatePinRequest) =>
      patch<ApiResult<void>, UpdatePinRequest>(ENDPOINTS.account.pin, body),
  });
}

// 4. GET /account/transactions (Fetch logged-in user transactions list)
export function useAccountTransactions() {
  return useQuery<ApiResult<Transaction[]>, Error, Transaction[]>({
    queryKey: queryKeys.account.transactions,
    queryFn: () => get<ApiResult<Transaction[]>>(ENDPOINTS.account.transactions),
    select: (res) => res.data,
  });
}

// 5. GET /account (Fetch general user profile details)
export function useAccount() {
  return useQuery<ApiResult<any>, Error, any>({
    queryKey: queryKeys.account.root,
    queryFn: () => get<ApiResult<any>>(ENDPOINTS.account.root),
    select: (res) => res.data,
  });
}
