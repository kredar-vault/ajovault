// src/api/queryKeys.ts
// Central key factory so invalidation stays consistent across hooks.

export const queryKeys = {
  account: {
    root: ["account"] as const,
    transactions: ["account", "transactions"] as const,
  },
  groups: {
    list: ["groups"] as const,
    mine: ["groups", "mine"] as const,
    detail: (id: string) => ["groups", id] as const,
    invite: (id: string) => ["groups", id, "invite"] as const,
    settings: (groupId: string) => ["groups", groupId, "settings"] as const,
  },
  members: {
    list: (groupId: string) => ["groups", groupId, "members"] as const,
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
    allUpcoming: ["payouts", "upcoming"] as const,
  },
  notifications: {
    list: ["notifications"] as const,
  },
  dashboard: {
    root: ["dashboard"] as const,
    detail: (groupId: string) => ["dashboard", groupId] as const,
  },
  contributions: {
    root: ["contributions"] as const,
    byGroup: (groupId: string) => ["contributions", groupId] as const,
    mine: (groupId: string) => ["contributions", groupId, "mine"] as const,
  },
  activity: {
    list: (groupId: string) => ["activity", groupId] as const,
  },
};