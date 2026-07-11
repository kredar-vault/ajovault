"use server";

import { cookies } from "next/headers";

export interface AuthCookiePayload {
  accessToken: string;
  refreshToken?: string;
}

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

export async function writeAuthCookies(payload: AuthCookiePayload) {
  const cookieStore = await cookies();

  cookieStore.set(ACCESS_TOKEN_COOKIE, payload.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  if (payload.refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, payload.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export async function readAuthCookies() {
  const cookieStore = await cookies();

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null,
  };
}
