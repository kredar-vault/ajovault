export interface BankAccount {
  accountNumber: string;
  accountName: string;
  bankCode: string;
  isSet: boolean;
}

export interface WalletSummary {
  availableBalance: number;
  totalContributed: number;
  totalReceived: number;
  nextPayout: number;
  activeGroups: number;
  totalGroups: number;
  bankAccount?: BankAccount;
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