import React from "react";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { TransactionStatus, TransactionType } from "@/types";

// 1. Status Badge
export function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    Completed: "text-[#166534] bg-[#DCFCE7]",
    Pending: "text-[#9A3412] bg-[#FFEDD5]",
    Failed: "text-[#991B1B] bg-[#FEE2E2]",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
}

// 2. Transaction Flow Indicator Icon
export function TransactionIcon({ type }: { type: TransactionType }) {
  const isIncoming = type === 'Incoming';
  return (
    <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
      isIncoming ? "bg-[#DCFCE7] text-[#006C49]" : "bg-[#FEE2E2] text-[#991B1B]"
    }`}>
      {isIncoming ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
    </div>
  );
}

// 3. Metric Card Display (Top Row Grid blocks)
export function MetricCard({ label, value, subtext, type }: { label: string; value: number; subtext: string; type?: string }) {
  const isTotal = type === 'total';
  const formattedValue = isTotal ? value.toString() : `₦${value.toLocaleString()}`;
  
  // Custom text color mapping per image metrics
  const valueColors: Record<string, string> = {
    incoming: "text-[#006C49]",
    outgoing: "text-[#111827]",
    pending: "text-[#D97706]",
    total: "text-[#111827]"
  };

  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-2">
      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{label}</span>
      <h3 className={`text-xl font-bold ${valueColors[type || 'total']}`}>{formattedValue}</h3>
      <p className="text-[11px] text-[#9CA3AF] font-medium">{subtext}</p>
    </div>
  );
}

// 4. Sidebar Detail Key-Value Line Entry
export function DetailRow({ label, value, isBold = false }: { label: string; value: string; isBold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs py-3.5 border-b border-gray-100 last:border-0">
      <span className="text-[#6B7280] font-medium">{label}</span>
      <span className={`text-[#111827] tracking-tight ${isBold ? "font-bold" : "font-medium"}`}>{value}</span>
    </div>
  );
}