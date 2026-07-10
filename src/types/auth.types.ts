// src/types/auth.types.ts

// Backend wraps every response in ApiResponse<T>
export interface ApiResult<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

// Token + user data returned after verify-otp and login
export interface AuthData {
  token: string;
  userId: string;
  fullName: string;
  email: string;
}

// --- Signup ---
export interface SignupRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SignupData {
  userId: string;
  email: string;
  message: string;
}

export type SignupResponse = ApiResult<SignupData>;

// --- OTP Verification (after signup) ---
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export type VerifyOtpResponse = ApiResult<AuthData>;

export interface ResendOtpRequest {
  email: string;
}

export type ResendOtpResponse = ApiResult<object>;

// --- Login ---
export interface LoginRequest {
  email: string;
  password: string;
}

export type LoginResponse = ApiResult<AuthData>;

// --- Forgot & Reset Password ---
export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = ApiResult<object>;

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export type ResetPasswordResponse = ApiResult<object>;

export type LogoutResponse = ApiResult<object>;