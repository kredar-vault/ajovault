"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, WalletSummary, VirtualAccountDetails, BankAccount } from "../types";

// 1. GET /wallet (Fetch wallet balance summary)
export function useWalletSummary() {
  return useQuery<ApiResult<any>, Error, WalletSummary>({
    queryKey: queryKeys.wallet.root,
    queryFn: () => get<ApiResult<any>>(ENDPOINTS.wallet.root),
    select: (res) => ({
      availableBalance: res.data?.balance ?? 0,
      totalContributed: res.data?.totalOut ?? 0,
      totalReceived: res.data?.totalIn ?? 0,
      nextPayout: 0,
      activeGroups: res.data?.activeGroups ?? 0,
      totalGroups: res.data?.totalGroups ?? 0,
      bankAccount: res.data?.virtualAccount ? {
        accountNumber: res.data.virtualAccount.accountNumber ?? "",
        accountName: res.data.virtualAccount.accountName ?? "",
        bankCode: res.data.virtualAccount.bankCode ?? "",
        isSet: res.data.virtualAccount.isSet ?? false,
      } as BankAccount : undefined,
    }),
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

// 6. POST /wallets/create-virtual-account (Save user's withdrawal bank account)
export function useSetBankAccount() {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResult<VirtualAccountDetails>,
    Error,
    { accountNumber: string; accountName: string; bankCode: string }
  >({
    mutationFn: (body) =>
      post<ApiResult<VirtualAccountDetails>, typeof body>(ENDPOINTS.virtualAccounts.create, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.root });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.virtualAccount });
      queryClient.invalidateQueries({ queryKey: queryKeys.virtualAccount.root });
    },
  });
}

// 7. POST /auth/provision-dva (Trigger DVA creation for the current user)
export function useProvisionDva() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<unknown>, Error, void>({
    mutationFn: () => post<ApiResult<unknown>, Record<string, never>>(ENDPOINTS.auth.provisionDva, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.root });
      queryClient.invalidateQueries({ queryKey: queryKeys.wallet.virtualAccount });
      queryClient.invalidateQueries({ queryKey: queryKeys.virtualAccount.root });
    },
  });
}

// 8. POST /wallet/bank/lookup (Resolve account name from account number + bank code)
export function useLookupBank() {
  return useMutation<
    ApiResult<{ accountName: string; accountNumber: string; bankCode: string }>,
    Error,
    { accountNumber: string; bankCode: string }
  >({
    mutationFn: (body) =>
      post<ApiResult<{ accountName: string; accountNumber: string; bankCode: string }>, typeof body>(
        ENDPOINTS.wallet.bankLookup,
        body
      ),
  });
}
