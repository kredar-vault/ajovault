"use client";

// src/hooks/useAuth.ts
// Pattern to copy for every other domain: one hook per mutation/query,
// typed with the matching request/response from src/types.

import { useMutation } from "@tanstack/react-query";
import { post } from "../api/http";
import { ENDPOINTS } from "../api/endpoints";
import type {
  VerifyForgotPasswordOtpRequest,
  VerifyForgotPasswordOtpResponse,
  ResendForgotPasswordOtpRequest,
  ResendForgotPasswordOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LogoutResponse,
} from "../types/auth.types";

export function useVerifyForgotPasswordOtp() {
  return useMutation({
    mutationFn: (body: VerifyForgotPasswordOtpRequest) =>
      post<VerifyForgotPasswordOtpResponse, VerifyForgotPasswordOtpRequest>(
        ENDPOINTS.auth.verifyForgotPasswordOtp,
        body
      ),
  });
}

export function useResendForgotPasswordOtp() {
  return useMutation({
    mutationFn: (body: ResendForgotPasswordOtpRequest) =>
      post<ResendForgotPasswordOtpResponse, ResendForgotPasswordOtpRequest>(
        ENDPOINTS.auth.resendForgotPasswordOtp,
        body
      ),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (body: ResetPasswordRequest) =>
      post<ResetPasswordResponse, ResetPasswordRequest>(
        ENDPOINTS.auth.resetPassword,
        body
      ),
  });
}

// Prefer calling `logout()` from `useSession()` (src/lib/auth.tsx) in
// components — it calls this same endpoint AND clears local session state
// AND redirects. This raw mutation is here only if you need the network
// call in isolation (e.g. a custom flow).
export function useLogout() {
  return useMutation({
    mutationFn: () => post<LogoutResponse>(ENDPOINTS.auth.logout),
  });
}