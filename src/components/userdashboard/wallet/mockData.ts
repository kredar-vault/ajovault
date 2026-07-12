import { WalletSummary, MonthlyPaidStatus, VirtualAccountDetails, ActivityItem, NextGroupPayout } from "@/types";

export const walletSummaryMock: WalletSummary = { availableBalance: 40000, totalContributed: 120000, totalReceived: 0, nextPayout: 400000, activeGroups: 1, totalGroups: 1 };
export const paidStatusMock: MonthlyPaidStatus = { amount: 20000, dueDate: "15 July", nextRecipient: "John Doe" };
export const accountDetailsMock: VirtualAccountDetails = { bank: "Nomba", accountNumber: "1234567890", accountName: "JOHN DOE" };

export const recentActivitiesMock: ActivityItem[] = [
  { id: "a1", title: "July Contribution", timestamp: "Today, 09:45 AM", source: "Tech Founders Ajo", amount: 20000, type: "debit", status: "Completed" },
  { id: "a2", title: "Deposit from Bank", timestamp: "Yesterday, 14:30 PM", source: "Nomba", amount: 50000, type: "credit", status: "Completed" },
  { id: "a3", title: "June Contribution", timestamp: "Jun 15, 10:00 AM", source: "Tech Founders Ajo", amount: 20000, type: "debit", status: "Completed" }
];

export const nextPayoutMock: NextGroupPayout = {
  recipientName: "Sarah Johnson",
  recipientInitials: "SJ",
  groupName: "Tech Founders Ajo",
  targetAmount: 400000,
  dueDate: "30 July",
  paidMembers: 18,
  remainingMembers: 2
};