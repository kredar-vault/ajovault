"use client";

// src/lib/auth.ts
//
// This is NOT where tokens live — they're in httpOnly cookies the backend
// controls entirely. This module only tracks "am I logged in" client-side
// state (the user object), so components can react to session changes.

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { get, post } from "../api/http";
import { ENDPOINTS } from "../api/endpoints";

// Replace `unknown` with the real Account type once src/types/account.types.ts exists.
type SessionUser = unknown;

interface AuthContextValue {
  user: SessionUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: SessionUser | null) => void;
  logout: () => Promise<void>;
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
      // Backend clears the httpOnly cookies as part of this call.
      clearSession();
      window.location.href = "/login";
    }
  }, [clearSession]);

  // If http.ts's interceptor detects an unrecoverable 401 (refresh failed),
  // it broadcasts this event — we react by dropping local session state.
  useEffect(() => {
    window.addEventListener("auth:logout", clearSession);
    return () => window.removeEventListener("auth:logout", clearSession);
  }, [clearSession]);

  // On mount, ask the backend whether the (httpOnly) session cookie is
  // still valid. We never inspect the cookie itself — just its effect.
  useEffect(() => {
    get(ENDPOINTS.account.root)
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, setUser, logout }}
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