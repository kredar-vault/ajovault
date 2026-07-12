"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, WalletSummary, VirtualAccountDetails } from "../types";

// 1. GET /wallet (Fetch wallet balance summary)
export function useWalletSummary() {
  return useQuery<ApiResult<WalletSummary>, Error, WalletSummary>({
    queryKey: queryKeys.wallet.root,
    queryFn: () => get<ApiResult<WalletSummary>>(ENDPOINTS.wallet.root),
    select: (res) => res.data,
  });
}

// 2. GET /wallet/virtual-account (Fetch user virtual account details)
export function useVirtualAccount() {
  return useQuery<ApiResult<VirtualAccountDetails>, Error, VirtualAccountDetails>({
    queryKey: queryKeys.wallet.virtualAccount,
    queryFn: () => get<ApiResult<VirtualAccountDetails>>(ENDPOINTS.wallet.virtualAccount),
    select: (res) => res.data,
  });
}

// 3. GET /wallet/balance (Fetch current wallet balance)
export function useWalletBalance() {
  return useQuery<ApiResult<{ balance: number }>, Error, { balance: number }>({
    queryKey: queryKeys.wallet.balance,
    queryFn: () => get<ApiResult<{ balance: number }>>(ENDPOINTS.wallet.balance),
    select: (res) => res.data,
  });
}

// 4. GET /wallets/virtual-account (Fetch user virtual account details from wallets domain)
export function useWalletsVirtualAccount() {
  return useQuery<ApiResult<VirtualAccountDetails>, Error, VirtualAccountDetails>({
    queryKey: queryKeys.virtualAccount.root,
    queryFn: () => get<ApiResult<VirtualAccountDetails>>(ENDPOINTS.virtualAccounts.get),
    select: (res) => res.data,
  });
}

// 5. POST /wallet/withdraw
export function useWithdraw() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<unknown>, Error, { amount: number }>({
    mutationFn: (body) => post<ApiResult<unknown>, { amount: number }>(ENDPOINTS.wallet.withdraw, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.root });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.balance });
    },
  });
}

// 6. POST /wallets/create-virtual-account (Trigger creation of a virtual bank account)
export function useCreateVirtualAccount() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<VirtualAccountDetails>, Error, void>({
    mutationFn: () =>
      post<ApiResult<VirtualAccountDetails>>(ENDPOINTS.virtualAccounts.create),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.virtualAccount.root });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.virtualAccount });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.root });
    },
  });
}
