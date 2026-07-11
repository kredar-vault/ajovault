import { cookies } from "next/headers";
import { resolveApiUrl } from "@/lib/api/config";
import { ApiError, UnauthorizedError } from "./errors";

async function getAuthHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseJson<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const authHeaders = await getAuthHeader();

  Object.entries(authHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });

  const response = await fetch(resolveApiUrl(path), {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    const data = await parseJson<unknown>(response);

    if (response.status === 401) {
      throw new UnauthorizedError("Unauthorized", data);
    }

    throw new ApiError(`Request failed with ${response.status}`, response.status, data);
  }

  return parseJson<T>(response);
}

export async function apiGetData<T>(path: string, init?: RequestInit) {
  return request<T>(path, { ...init, method: "GET" });
}

export async function apiPostData<T, TBody = unknown>(path: string, body?: TBody, init?: RequestInit) {
  return request<T>(path, {
    ...init,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
