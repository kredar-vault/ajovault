export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';
export type TransactionType = 'Incoming' | 'Outgoing';

export interface Transaction {
  id: string;
  title: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  date: string;
  timestamp: string;
  reference: string;
  sender: string;
  bank: string;
  narration: string;
}

export interface MetricCardData {
  label: string;
  value: number;
  subtext: string;
  type?: 'incoming' | 'outgoing' | 'pending' | 'total';
}