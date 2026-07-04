export interface ContributionItem {
  id: string;
  memberName: string;
  memberInitials?: string;
  avatarUrl?: string;
  groupName: string;
  amount: number;
  reference: string;
  status: "Received" | "Pending" | "Failed";
  time: string;
}

export interface ContributionGroup {
  dateLabel: string;
  items: ContributionItem[];
}