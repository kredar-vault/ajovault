import { DashboardStats, ContributionProgress, PayoutSchedule, ActivityRow }  from "@/types";


export const mockStats: DashboardStats = {
  totalContribution: 380000,
  circleBalance: 380000,
  totalMembers: 25,
  pendingContributions: 25,
  upcomingPayouts: 2,
};

export const mockProgress: ContributionProgress = {
  month: "February",
  receivedCount: 17,
  pendingCount: 2,
  missedCount: 1,
  totalCount: 20,
};

export const mockPayout: PayoutSchedule = {
  recipientName: "Esther Adebayo",
  amount: 400000,
  daysRemaining: 5,
};

export const mockActivity: ActivityRow[] = [
  { id: "1", member: "Ukeme Ikot", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Received" },
  { id: "2", member: "Ukeme Ikot", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Received" },
  { id: "3", member: "Mmesoma Gospel", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Received" },
  { id: "4", member: "Mmesoma Gospel", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Received" },
  { id: "5", member: "Mmesoma Gospel", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Received" },
  { id: "6", member: "Mmesoma Gospel", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Missed" },
  { id: "7", member: "Mmesoma Gospel", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Missed" },
  { id: "8", member: "Mmesoma Gospel", group: "Lagos Tech Circle", dueDate: "2026-02-23", amount: "$48,000", status: "Missed" },
  { id: "9", member: "Rio west", group: "Lagos Tech Circle", dueDate: "2026-02-17", amount: "₦45,750", status: "Pending" },
  { id: "10", member: "Rio west", group: "Lagos Tech Circle", dueDate: "2026-02-17", amount: "₦45,750", status: "Pending" },
];