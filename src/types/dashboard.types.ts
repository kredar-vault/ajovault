export interface DashboardStats {
  totalContribution: number;
  totalMembers: number;
  pendingContributions: number;
  upcomingPayouts: number;
}

export interface ContributionProgress {
  month: string;
  receivedCount: number;
  pendingCount: number;
  missedCount: number;
  totalCount: number;
}

export interface PayoutSchedule {
  recipientName: string;
  avatarUrl?: string;
  amount: number;
  daysRemaining: number;
}

export interface ActivityRow {
  id: string;
  member: string;
  group: string;
  dueDate: string;
  amount: number | string; // Keeps currency symbols flexible
  status: "Received" | "Pending" | "Missed";
}