// @/types/group.ts

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