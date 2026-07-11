export function getApiBaseUrl() {
  const rawBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? process.env.API_BASE_URL ?? "https://api.vault.staging.kredar.xyz";
  return rawBase.endsWith("/api/v1") || rawBase.endsWith("/api/v1/") ? rawBase : `${rawBase.replace(/\/$/, "")}/api/v1`;
}

export function resolveApiUrl(path: string) {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
