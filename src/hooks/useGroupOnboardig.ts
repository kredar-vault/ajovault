// @/hooks/useGroupOnboarding.ts
import { useState } from "react";
import { http } from "@/lib/http";

// Localized Types for full reliability
export type GroupFrequency = "weekly" | "bi-weekly" | "monthly";

export interface CreateGroupPayload {
  groupName: string;
  purpose: string;
  expectedMembers: number;
  frequency: GroupFrequency;
  contributionAmount: number;
  firstPayoutRecipient: string;
}

export interface CreateGroupResponse {
  groupId: string;
  status: string;
}

export interface SendInvitePayload {
  type: "email" | "phone";
  value: string;
}

export interface InviteLinkResponse {
  link: string;
}

export function useGroupOnboarding() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // POST /groups
  const createGroup = async (payload: CreateGroupPayload): Promise<CreateGroupResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await http.post<CreateGroupResponse>("/groups", payload);
      return response.data;
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to create savings group.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // POST /groups/{groupId}/invites
  const sendIndividualInvite = async (groupId: string, payload: SendInvitePayload): Promise<void> => {
    setError(null);
    try {
      await http.post(`/groups/${groupId}/invites`, payload);
    } catch (err: any) {
      const msg = err?.response?.data?.message || `Failed to send ${payload.type} invitation.`;
      setError(msg);
      throw err;
    }
  };

  // POST /groups/{groupId}/invite-link
  const generateInviteLink = async (groupId: string): Promise<string> => {
    setError(null);
    try {
      const response = await http.post<InviteLinkResponse>(`/groups/${groupId}/invite-link`);
      return response.data.link;
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Failed to generate your invite shortcut link.";
      setError(msg);
      throw err;
    }
  };

  return { 
    createGroup, 
    sendIndividualInvite, 
    generateInviteLink, 
    isLoading, 
    error 
  };
}