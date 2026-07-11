"use client";

import { ENDPOINTS } from "@/hooks/endpoints";
// src/api/http.ts
//
// SECURITY MODEL:
// This app never stores tokens in localStorage/sessionStorage — both are
// readable by any injected script (XSS), which makes them a bad place to
// keep access/refresh tokens in a financial app.
// Instead, the backend sets tokens as httpOnly, Secure, SameSite cookies.
// JS never reads or writes them directly — the browser attaches them
// automatically as long as every request goes out with `withCredentials: true`.
// This file has no token storage code at all, by design.

import axios, { AxiosError, AxiosRequestConfig } from "axios";


// Always use the Next.js rewrite proxy — requests stay same-origin so CORS
// never applies. The rewrite in next.config.ts forwards /api/* → upstream.
const BASE_URL = "/api/v1";

const TOKEN_KEY = "ajovault_token";

export const setToken = (token: string) => {
  if (typeof window !== "undefined") sessionStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  if (typeof window !== "undefined") sessionStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
};

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Bearer token to every request
http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- 401 Unauthorized Session Expiration flow ----
http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
      window.dispatchEvent(new Event("auth:logout"));
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const guestPaths = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-otp"];
        const isJoinPage = path.startsWith("/join/");
        if (!guestPaths.includes(path) && !isJoinPage) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// ---- thin generic wrappers used by every hook ----
export const get = <TResponse>(url: string, config?: AxiosRequestConfig) =>
  http.get<TResponse>(url, config).then((res) => res.data);

export const post = <TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig
) => http.post<TResponse>(url, body, config).then((res) => res.data);

export const patch = <TResponse, TBody = unknown>(
  url: string,
  body?: TBody,
  config?: AxiosRequestConfig
) => http.patch<TResponse>(url, body, config).then((res) => res.data);

export const del = <TResponse>(url: string, config?: AxiosRequestConfig) =>
  http.delete<TResponse>(url, config).then((res) => res.data);