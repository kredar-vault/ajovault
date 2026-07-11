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
  password: string;
}

export interface LoginResponse {
  message: string;
}

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

// --- Login (2-step: password → OTP → token) ---
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  message: string;
}

export type LoginResponse = ApiResult<LoginData>;

export interface VerifyLoginOtpRequest {
  email: string;
  otp: string;
}

export type VerifyLoginOtpResponse = ApiResult<AuthData>;

export interface ResendLoginOtpRequest {
  email: string;
}

export type ResendLoginOtpResponse = ApiResult<object>;

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

export interface LogoutResponse {
  message: string;
}

// --- Account Settings & Profile ---
export interface UpdateAccountRequest {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  preferences?: {
    defaultCurrency?: string;
  };
}

export interface UpdateAccountResponse {
  message: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  };
}

export interface UpdatePasswordRequest {
  currentPassword?: string;
  oldPassword?: string;
  newPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UpdatePinRequest {
  pin: string;
  confirmPin: string;
  oldPin?: string;
}