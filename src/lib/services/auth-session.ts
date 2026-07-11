import { apiGetData } from "@/lib/http/server";

export interface SessionUserPayload {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function authenticatedFetch<T>(path: string) {
  return apiGetData<T>(path);
}

export async function getAuthenticatedSession() {
  return authenticatedFetch<SessionUserPayload>("/account");
}
