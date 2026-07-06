// src/api/queryKeys.ts
// Central key factory so invalidation stays consistent across hooks.

export const queryKeys = {
  account: {
    root: ["account"] as const,
  },
  circleSettings: {
    detail: (groupId: string) => ["circle-settings", groupId] as const,
  },
  members: {
    list: (groupId: string) => ["members", groupId] as const,
  },
  virtualAccount: {
    root: ["virtual-account"] as const,
  },
  wallet: {
    root: ["wallet"] as const,
    balance: ["wallet", "balance"] as const,
    virtualAccount: ["wallet", "virtual-account"] as const,
  },
  transactions: {
    list: (filters?: Record<string, unknown>) => ["transactions", filters] as const,
    detail: (id: string) => ["transactions", id] as const,
  },
  payouts: {
    list: (groupId: string) => ["payouts", groupId] as const,
    current: (groupId: string) => ["payouts", groupId, "current"] as const,
    upcoming: (groupId: string) => ["payouts", groupId, "upcoming"] as const,
  },
  notifications: {
    list: ["notifications"] as const,
  },
  dashboard: {
    detail: (groupId: string) => ["dashboard", groupId] as const,
  },
  activity: {
    list: (groupId: string) => ["activity", groupId] as const,
  },
};