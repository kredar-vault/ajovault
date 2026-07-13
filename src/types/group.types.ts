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
  status?: string;
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
  name?: string;
  purpose?: string;
  description?: string;
  frequency?: GroupFrequency;
  contributionAmount?: number;
  firstPayoutRecipient?: string;
  inviteCode?: string;
  createdAt?: string;
  startDate?: string;
  status?: string;
  currentMembers?: number;
  maxMembers?: number;
  createdByUserId?: string;
  dvaAccountNumber?: string;
  dvaBankName?: string;
  dvaAccountName?: string;
}

export interface GroupMember {
  // Supports both flat backend properties and standard database IDs
  id?: string;
  memberId: string;
  userId: string;
  fullName?: string;
  email: string;
  payoutPosition?: number;
  role: "OWNER" | "ADMIN" | "MEMBER" | "Admin" | "Member";
  joinedAt: string;
  
  // Keep this optional as a fallback in case other endpoints use it
  user?: {
    id: string;
    email: string;
    fullName: string;
  };

  // Optional status field for the UI badges
  status?: "Paid" | "Pending" | "Missed";
  isNextPayout?: boolean;
}