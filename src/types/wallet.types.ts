export interface WalletSummary {
  availableBalance: number;
  totalContributed: number;
  nextPayout: number;
}

export interface MonthlyPaidStatus {
  amount: number;
  dueDate: string;
  nextRecipient: string;
}

export interface VirtualAccountDetails {
  bank: string;
  accountNumber: string;
  accountName: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  source: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface NextGroupPayout {
  recipientName: string;
  recipientInitials?: string;
  groupName: string;
  targetAmount: number;
  dueDate: string;
  paidMembers: number;
  remainingMembers: number;
}