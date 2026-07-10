// src/hooks/useAuth.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { post } from "../lib/http";
import { ENDPOINTS } from "../hooks/endpoints";
import type {
  SignupRequest,
  SignupResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LogoutResponse,
} from "../types/auth.types";

export function useSignup() {
  return useMutation({
    mutationFn: (body: SignupRequest) =>
      post<SignupResponse, SignupRequest>(ENDPOINTS.auth.signup, body),
  });
}

export function useVerifyOtp() {
  return useMutation({
    mutationFn: (body: VerifyOtpRequest) =>
      post<VerifyOtpResponse, VerifyOtpRequest>(ENDPOINTS.auth.verifyOtp, body),
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: (body: ResendOtpRequest) =>
      post<ResendOtpResponse, ResendOtpRequest>(ENDPOINTS.auth.resendOtp, body),
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequest) =>
      post<LoginResponse, LoginRequest>(ENDPOINTS.auth.login, body),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (body: ForgotPasswordRequest) =>
      post<ForgotPasswordResponse, ForgotPasswordRequest>(ENDPOINTS.auth.forgotPassword, body),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (body: ResetPasswordRequest) =>
      post<ResetPasswordResponse, ResetPasswordRequest>(ENDPOINTS.auth.resetPassword, body),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => post<LogoutResponse>(ENDPOINTS.auth.logout),
  });
}
