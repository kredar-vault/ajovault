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
  // DVA provisioned by Kredar at group creation
  dvaAccountNumber?: string;
  dvaBankName?: string;
  dvaAccountName?: string;
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