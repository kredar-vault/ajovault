// src/api/endpoints.ts
// Single source of truth for every API path.
// When backend base URL is ready, only http.ts needs to change (baseURL), not this file.

export const ENDPOINTS = {
  auth: {
    signup: "/auth/register",
    login: "/auth/login",
    verifyLoginOtp: "/auth/verify-login-otp",
    resendLoginOtp: "/auth/resend-login-otp",
    verifyOtp: "/auth/verify-otp",
    resendOtp: "/auth/resend-otp",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
    provisionDva: "/auth/provision-dva",
  },

  account: {
    root: "/account",
    password: "/account/password",
    pin: "/account/pin",
    transactions: "/account/transactions",
  },

  groups: {
    root: "/groups",
    mine: "/groups/mine",
    byId: (id: string) => `/groups/${id}`,
    join: (id: string) => `/groups/${id}/join`,
    leave: (id: string) => `/groups/${id}/leave`,
    delete: (id: string) => `/groups/${id}`,
    joinWithCode: (inviteCode: string) => `/groups/join/${inviteCode}`,
    invite: (id: string) => `/groups/${id}/invite`,
    settings: (groupId: string) => `/groups/${groupId}/settings`,
  },
  members: {
    list: (groupId: string) => `/groups/${groupId}/members`,
    remove: (groupId: string, memberId: string) =>
      `/groups/${groupId}/members/${memberId}`,
    updateRole: (groupId: string, memberId: string) =>
      `/groups/${groupId}/members/${memberId}/role`,
  },

  wallet: {
    root: "/wallet",
    balance: "/wallet/balance",
    dva: "/wallet/dva",                              // Your Nomba deposit account (receive money)
    payoutAccount: "/wallet/payout-account",         // Your bank account for withdrawals (Opay, GTBank etc.)
    payoutAccountLookup: "/wallet/payout-account/lookup", // Verify bank account before saving
    withdraw: "/wallet/withdraw",
  },

  transactions: {
    list: "/transactions",
    byId: (id: string) => `/transactions/${id}`,
  },

  payouts: {
    list: (groupId: string) => `/groups/${groupId}/payouts`,
    current: (groupId: string) => `/groups/${groupId}/payouts/current`,
    upcoming: (groupId: string) => `/groups/${groupId}/payouts/upcoming`,
    allUpcoming: "/payouts/upcoming",
    disburse: (groupId: string, payoutId: string) => `/groups/${groupId}/payouts/${payoutId}/disburse`,
  },

  notifications: {
    list: "/notifications",
    markRead: "/notifications/read",
  },

  dashboard: {
    root: "/dashboard",
    get: (groupId: string) => `/dashboard/${groupId}`,
  },

  contributions: {
    root: "/contributions",
    byGroup: (groupId: string) => `/groups/${groupId}/contributions`,
    mine: (groupId: string) => `/groups/${groupId}/contributions/mine`,
  },

  activity: {
    list: (groupId: string) => `/groups/${groupId}/activity`,
  },

  webhooks: {
    kredar: "/webhooks/kredar",
  },
} as const;