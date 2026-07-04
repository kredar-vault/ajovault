import React from "react";
import { Check } from "lucide-react";
import { PayoutStatus } from "@/types";

// 1. Top Summary Metric Block Card
export function SummaryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[10px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[96px]">
      <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">{title}</span>
      <div className="mt-2 flex items-center gap-2">{children}</div>
    </div>
  );
}

// 2. Status Stamp Indicator Pill
export function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  if (status === 'CURRENT') return <span className="text-[9px] font-bold bg-[#006C49] text-white px-1.5 py-0.5 rounded uppercase tracking-wide">Current</span>;
  
  const styles: Record<Extract<PayoutStatus, 'PAID' | 'WAITING'>, string> = {
    PAID: "text-[#166534] bg-[#DCFCE7]",
    WAITING: "text-[#6B7280] bg-[#F3F4F6]"
  };

  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${styles[status]}`}>
      {status}
    </span>
  );
}

// 3. User Avatar Block
export function MemberAvatar({ name, avatarUrl, initials, size = "md" }: { name: string; avatarUrl?: string; initials?: string; size?: "sm" | "md" | "lg" }) {
  const dimensions = size === "sm" ? "h-6 w-6 text-[10px]" : size === "lg" ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs";
  return (
    <div className={`${dimensions} rounded-full bg-slate-100 border border-gray-50 flex items-center justify-center shrink-0 overflow-hidden`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="font-bold text-slate-600 tracking-tight">{initials || name.charAt(0)}</span>
      )}
    </div>
  );
}

// 4. Status Dot marker on the timeline row axis
export function TimelineDot({ status }: { status: PayoutStatus }) {
  if (status === 'PAID') {
    return (
      <div className="h-5 w-5 rounded-full bg-[#006C49] flex items-center justify-center text-white shrink-0 z-10 shadow-sm">
        <Check className="h-3 w-3 stroke-[3]" />
      </div>
    );
  }
  if (status === 'CURRENT') {
    return (
      <div className="h-5 w-5 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0 z-10 border border-[#006C49]">
        <div className="h-2.5 w-2.5 rounded-full bg-[#006C49]" />
      </div>
    );
  }
  return (
    <div className="h-5 w-5 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shrink-0 z-10">
      <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
    </div>
  );
}