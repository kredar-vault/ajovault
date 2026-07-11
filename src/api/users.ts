"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/http";
import { API_ENDPOINTS } from "./api-endpoints";

interface UserSummary {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export function useUsers() {
  return useQuery<UserSummary[]>({
    queryKey: ["users"],
    queryFn: () => get<UserSummary[]>(API_ENDPOINTS.users.root),
    staleTime: 1000 * 60 * 5,
  });
}
