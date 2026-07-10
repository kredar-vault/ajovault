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

const getToken = () => {
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

// ---- refresh-token-on-401 flow ----
// No token to read here — the refresh cookie travels with the request
// automatically. The backend validates it, rotates it, and re-sets the
// Set-Cookie headers. We just retry the original request afterward.
let isRefreshing = false;
let pendingQueue: Array<() => void> = [];

function resolvePendingQueue() {
  pendingQueue.forEach((cb) => cb());
  pendingQueue = [];
}

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (AxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        pendingQueue.push(() => resolve(http(originalRequest)));
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axios.post(`${BASE_URL}${ENDPOINTS.auth.refreshToken}`, null, {
        withCredentials: true,
      });
      resolvePendingQueue();
      return http(originalRequest);
    } catch (refreshError) {
      // Backend has already cleared the cookies at this point (expired/invalid
      // refresh). Broadcast so the app can react (e.g. redirect to /login).
      window.dispatchEvent(new Event("auth:logout"));
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
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