// src/hooks/useAuth.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import { post } from "../lib/http";
import { ENDPOINTS } from "../hooks/endpoints";
import type {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  LoginResponse,
  VerifyLoginOtpRequest,
  VerifyLoginOtpResponse,
  ResendLoginOtpRequest,
  ResendLoginOtpResponse,
  ForgotPasswordRequest,        // <-- Added this payload type
  ForgotPasswordResponse,       // <-- Added this response type
  VerifyForgotPasswordOtpRequest,
  VerifyForgotPasswordOtpResponse,
  ResendForgotPasswordOtpRequest,
  ResendForgotPasswordOtpResponse,
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

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequest) =>
      post<LoginResponse, LoginRequest>(ENDPOINTS.auth.login, body),
  });
}

export function useVerifyLoginOtp() {
  return useMutation({
    mutationFn: (body: VerifyLoginOtpRequest) =>
      post<VerifyLoginOtpResponse, VerifyLoginOtpRequest>(ENDPOINTS.auth.verifyLoginOtp, body),
  });
}

export function useResendLoginOtp() {
  return useMutation({
    mutationFn: (body: ResendLoginOtpRequest) =>
      post<ResendLoginOtpResponse, ResendLoginOtpRequest>(ENDPOINTS.auth.resendLoginOtp, body),
  });
}

/**
 * Sends the email to the backend to trigger/generate the password reset OTP code
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: (body: ForgotPasswordRequest) =>
      post<ForgotPasswordResponse, ForgotPasswordRequest>(ENDPOINTS.auth.forgotPassword, body),
  });
}

export function useVerifyForgotPasswordOtp() {
  return useMutation({
    mutationFn: (body: VerifyForgotPasswordOtpRequest) =>
      post<VerifyForgotPasswordOtpResponse, VerifyForgotPasswordOtpRequest>(ENDPOINTS.auth.verifyForgotPasswordOtp, body),
  });
}

export function useResendForgotPasswordOtp() {
  return useMutation({
    mutationFn: (body: ResendForgotPasswordOtpRequest) =>
      post<ResendForgotPasswordOtpResponse, ResendForgotPasswordOtpRequest>(ENDPOINTS.auth.resendForgotPasswordOtp, body),
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