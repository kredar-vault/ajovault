// src/types/auth.types.ts

// --- Signup ---
export interface SignupRequest {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface SignupResponse {
  message: string;
  userId: string;
}

// --- Login ---
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  message: string;
  requiresOtp: boolean;
}

// --- OTP Verification ---
export interface VerifyLoginOtpRequest {
  email: string;
  code: string;
}

export interface VerifyLoginOtpResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface ResendLoginOtpRequest {
  email: string;
}

export interface ResendLoginOtpResponse {
  message: string;
}

// --- Forgot & Reset Password ---
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface VerifyForgotPasswordOtpRequest {
  email: string;
  otp: string;
}

export interface VerifyForgotPasswordOtpResponse {
  resetToken: string;
}

export interface ResendForgotPasswordOtpRequest {
  email: string;
}

export interface ResendForgotPasswordOtpResponse {
  message: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}