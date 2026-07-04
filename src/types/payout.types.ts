export type PayoutStatus = 'PAID' | 'CURRENT' | 'WAITING';

export interface RotationMember {
  id: string;
  name: string;
  avatarUrl?: string;
  initials?: string;
  position: number;
  amount: number;
  status: PayoutStatus;
  dateInfo?: string; // e.g., "August", "Receiving in 4 days"
}

export interface PayoutSummary {
  currentCycle: string;
  currentRecipient: { name: string; avatarUrl?: string };
  nextRecipient: { name: string; avatarUrl?: string };
  totalMembers: number;
  payoutsDone: number;
}