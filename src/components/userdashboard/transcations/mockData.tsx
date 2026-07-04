import { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  {
    id: "tx-1",
    title: "Monthly Contribution",
    type: "Incoming",
    status: "Completed",
    amount: 20000,
    date: "Oct 24, 2024",
    timestamp: "Oct 24, 2024, 14:32",
    reference: "9824X",
    sender: "John Doe",
    bank: "GTBank",
    narration: "Monthly Contribution - October Cycle"
  },
  {
    id: "tx-2",
    title: "Payout Released",
    type: "Outgoing",
    status: "Completed",
    amount: 400000,
    date: "Oct 22, 2024",
    timestamp: "Oct 22, 2024, 09:15",
    reference: "7721Y",
    sender: "Ajo Vault System",
    bank: "Access Bank",
    narration: "Group Rotational Payout Settlement"
  },
  {
    id: "tx-3",
    title: "Withdrawal",
    type: "Outgoing",
    status: "Pending",
    amount: 10000,
    date: "Oct 20, 2024",
    timestamp: "Oct 20, 2024, 18:45",
    reference: "1149B",
    sender: "Self Account",
    bank: "Nomba",
    narration: "Wallet Balance Settlement to Main Bank Account"
  }
];