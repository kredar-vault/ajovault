"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { get, post } from "@/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
} from "./types";

export function useLogin() {
  return useMutation({
    mutationFn: (body: LoginRequest) =>
      post<LoginResponse, LoginRequest>(API_ENDPOINTS.auth.login, body),
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (body: SignupRequest) =>
      post<SignupResponse, SignupRequest>(API_ENDPOINTS.auth.signup, body),
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => post<LogoutResponse>(API_ENDPOINTS.auth.logout),
  });
}

export function useSessionUser() {
  return useQuery<AuthUser>({
    queryKey: ["session-user"],
    queryFn: () => get<AuthUser>(API_ENDPOINTS.account.me),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
