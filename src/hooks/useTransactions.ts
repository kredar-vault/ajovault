"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type { ApiResult, Transaction } from "../types";

// 1. GET /transactions (Fetch all transactions with optional filters)
export function useAllTransactions(filters?: Record<string, unknown>) {
  return useQuery<ApiResult<Transaction[]>, Error, Transaction[]>({
    queryKey: queryKeys.transactions.list(filters),
    queryFn: () => get<ApiResult<Transaction[]>>(ENDPOINTS.transactions.list),
    select: (res) => res.data,
  });
}

// 2. GET /transactions/{id} (Fetch transaction details by ID)
export function useTransactionDetails(id: string) {
  return useQuery<ApiResult<Transaction>, Error, Transaction>({
    queryKey: queryKeys.transactions.detail(id),
    queryFn: () => get<ApiResult<Transaction>>(ENDPOINTS.transactions.byId(id)),
    select: (res) => res.data,
    enabled: !!id,
  });
}
