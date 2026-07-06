// src/api/endpoints.ts
// Single source of truth for every API path.
// When backend base URL is ready, only http.ts needs to change (baseURL), not this file.

export const ENDPOINTS = {
  auth: {
    // signup OTP removed — signup is verified via email link, not OTP
    verifyForgotPasswordOtp: "/auth/verify-forgot-password-otp",
    resendForgotPasswordOtp: "/auth/resend-forgot-password-otp",
    resetPassword: "/auth/reset-password",
    logout: "/auth/logout",
    refreshToken: "/auth/refresh-token",
    // TODO: add once confirmed — login, verify-login-otp, resend-login-otp
  },

  account: {
    root: "/account",
    password: "/account/password",
    pin: "/account/pin",
  },

  circleSettings: {
    get: (groupId: string) => `/groups/${groupId}/settings`,
    update: (groupId: string) => `/groups/${groupId}/settings`,
  },

  members: {
    list: (groupId: string) => `/groups/${groupId}/members`,
    remove: (groupId: string, memberId: string) =>
      `/groups/${groupId}/members/${memberId}`,
    updateRole: (groupId: string, memberId: string) =>
      `/groups/${groupId}/members/${memberId}/role`,
    invite: (groupId: string) => `/groups/${groupId}/invite`,
  },

  virtualAccounts: {
    create: "/wallets/create-virtual-account",
    get: "/wallets/virtual-account",
  },

  wallet: {
    root: "/wallet",
    balance: "/wallet/balance",
    virtualAccount: "/wallet/virtual-account",
  },

  transactions: {
    list: "/transactions",
    byId: (id: string) => `/transactions/${id}`,
  },

  payouts: {
    list: (groupId: string) => `/groups/${groupId}/payouts`,
    current: (groupId: string) => `/groups/${groupId}/payouts/current`,
    upcoming: (groupId: string) => `/groups/${groupId}/payouts/upcoming`,
  },

  notifications: {
    list: "/notifications",
    markRead: "/notifications/read",
  },

  dashboard: {
    get: (groupId: string) => `/dashboard/${groupId}`,
  },

  activity: {
    list: (groupId: string) => `/groups/${groupId}/activity`,
  },
} as const;