// @/types/group.ts

export type GroupFrequency = "weekly" | "bi-weekly" | "monthly";

export interface CreateGroupPayload {
  name: string;
  purpose: string;
  maxMembers: number;
  frequency: GroupFrequency;
  contributionAmount: number;
  firstPayoutRecipient: string;
  contactEmail: string;
  contactPhone: string;
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

export interface Group {
  id: string;
  name: string;
  purpose: string;
  creatorId: string;
  expectedMembers: number;
  frequency: GroupFrequency;
  contributionAmount: number;
  firstPayoutRecipient: string;
  inviteCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupSettings {
  groupId: string;
  groupName?: string;
  purpose?: string;
  frequency?: GroupFrequency;
  contributionAmount?: number;
  firstPayoutRecipient?: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  joinedAt: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
  };
}