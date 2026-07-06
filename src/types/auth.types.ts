// src/types/auth.types.ts

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

export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// TODO: LoginRequest / LoginResponse, VerifyLoginOtpRequest/Response,
// ResendLoginOtpRequest/Response — add once those endpoints are confirmed.