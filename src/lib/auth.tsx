"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { get, post } from "../lib/http";
import { ENDPOINTS } from "../hooks/endpoints";
import type { ApiResult } from "../types/auth.types";

export interface SessionUser {
  userId: string;
  fullName: string;
  email?: string;
  accountNumber: string;
  maskedAccountNumber: string;
  balance: number;
  monthlySummary: {
    totalIn: number;
    totalOut: number;
    points: Array<{ month: string; in: number; out: number }>;
  };
}

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: SessionUser | null) => void;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setUser(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await post(ENDPOINTS.auth.logout);
    } finally {
      clearSession();
      window.location.href = "/login";
    }
  }, [clearSession]);

  const refreshSession = useCallback(async () => {
    try {
      // Backend wraps this (like every other endpoint) in { isSuccess, message, data }.
      // get() only unwraps axios's response.data — it does NOT unwrap this envelope,
      // so the actual user record is one level deeper, at result.data.
      const result = await get<ApiResult<SessionUser>>(ENDPOINTS.account.root);
      setUser(result?.data ?? null);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // If http.ts's interceptor detects an unrecoverable 401 (refresh failed),
  // it broadcasts this event — we react by dropping local session state.
  useEffect(() => {
    window.addEventListener("auth:logout", clearSession);
    return () => window.removeEventListener("auth:logout", clearSession);
  }, [clearSession]);

  // On mount, ask the backend whether the (httpOnly) session cookie is
  // still valid. We never inspect the cookie itself — just its effect.
  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useSession must be used within an <AuthProvider>");
  }
  return ctx;
}