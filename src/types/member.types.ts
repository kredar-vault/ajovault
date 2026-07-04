export interface CycleInfo {
  name: string;
  status: "ACTIVE" | "COMPLETED" | "PAUSED";
  type: string;
  memberCount: number;
  contribution: number;
  totalPool: number;
}

export interface NextPayout {
  recipientName: string;
  avatarUrl?: string;
  daysRemaining: number;
  dateString: string;
}

export interface ProgressStats {
  currentMonth: number;
  totalMonths: number;
  collected: number;
  pending: number;
}

export interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
  joinedDate: string;
  status: "Paid" | "Pending" | "Missed";
  isNextPayout?: boolean;
  streakMonths?: number;
}